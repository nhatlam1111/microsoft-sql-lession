import { expect, it, vi } from 'vitest';
import * as core from '../api/src/core';
import { createLimiter } from '../api/src/limiter';
import type { Deps, RunOutcome } from '../api/src/core';
import type { TablePreviewResponse } from '../src/lib/exercise-types';

const result = (n = 1, extra: Partial<RunOutcome> = {}): RunOutcome => ({
  shape: { columns: [{ name: 'MaPB', type: 'varchar' }, { name: 'TenPB', type: 'nvarchar' }], rows: Array.from({ length: n }, (_, i) => [`PB${i}`, i ? null : 'Phòng ban']) },
  affected: [n], check: null, error: null, errorKind: null, ms: 17, ...extra,
});
const fake = (o = result()): Deps => ({ codes: ['abc'], exercises: {}, allow: () => true, run: vi.fn(async () => o) });
const preview = (query: string, deps: Deps, code: string | null = 'abc') => {
  expect(core.handleTablePreview, 'the authenticated preview handler is exported').toBeTypeOf('function');
  return core.handleTablePreview(new URLSearchParams(query), code, deps);
};

it('returns 50 rows, the cursor page and hasMore after fetching one look-ahead row', async () => {
  const deps = fake(result(51));
  const response = await preview('table=PhongBan&page=0', deps);
  const body = response.body as TablePreviewResponse;
  expect(response.status).toBe(200);
  expect(body).toEqual({ ok: true, table: 'PhongBan', columns: ['MaPB', 'TenPB'], rows: result(50).shape!.rows, page: 0, pageSize: 50, hasMore: true, ms: 17 });
  expect(deps.run).toHaveBeenCalledExactlyOnceWith('SELECT [MaPB], [TenPB]\nFROM [dbo].[PhongBan]\nORDER BY [MaPB]\nOFFSET 0 ROWS FETCH NEXT 51 ROWS ONLY;');
});

it('orders a later page by the complete composite primary key and accepts the largest legal offset', async () => {
  const deps = fake();
  await preview('table=BangLuong&page=2', deps);
  expect(deps.run).toHaveBeenCalledExactlyOnceWith('SELECT [KyLuong], [MaNV], [NgayCongChuan], [NgayCongThucTe], [LuongCoBan], [PhuCap], [TienTangCa], [KhauTruBaoHiem], [ThueTNCN], [ThucLinh]\nFROM [dbo].[BangLuong]\nORDER BY [KyLuong], [MaNV]\nOFFSET 100 ROWS FETCH NEXT 51 ROWS ONLY;');
  const max = fake();
  expect((await preview('table=ChamCong&page=42949672', max)).status).toBe(200);
  expect(max.run).toHaveBeenCalledWith(expect.stringContaining('ORDER BY [MaNV], [Ngay]\nOFFSET 2147483600 ROWS'));
});

it('handles a final page, an exactly full page and an empty page without inventing more rows', async () => {
  for (const count of [0, 1, 49, 50]) {
    const response = await preview('table=PhongBan&page=3', fake(result(count)));
    expect(response.body).toMatchObject({ ok: true, rows: result(count).shape!.rows, page: 3, hasMore: false });
  }
});

it('requires a valid access code before any database or limiter call', async () => {
  const deps = { ...fake(), allow: vi.fn(() => true) };
  for (const code of [null, '', 'wrong']) {
    expect(await preview('table=PhongBan&page=0', deps, code)).toEqual({ status: 401, body: { ok: false, kind: 'bad-code' } });
  }
  expect(deps.run).not.toHaveBeenCalled();
  expect(deps.allow).not.toHaveBeenCalled();
});

it('shares the existing 30 calls per minute limit with running SQL', async () => {
  const deps = fake();
  deps.allow = createLimiter(30, 60_000, () => 1);
  deps.exercises = { q: { id: 'q', title: 'q', summary: 's', prompt: 'p', columns: ['a'], ordered: false, kind: 'query', answer: 'SELECT 1' } };
  for (let i = 0; i < 29; i++) expect((await core.handleRun({ exercise: 'q', sql: 'SELECT 1' }, 'abc', deps)).status).toBe(200);
  expect((await preview('table=PhongBan&page=0', deps)).status).toBe(200);
  expect(await preview('table=PhongBan&page=0', deps)).toEqual({ status: 429, body: { ok: false, kind: 'rate' } });
  expect(deps.run).toHaveBeenCalledTimes(30);
});

it('accepts only the seven exact canonical table names, with columns fixed by the shared schema', async () => {
  for (const table of ['PhongBan', 'ChucDanh', 'NhanVien', 'HopDong', 'ChamCong', 'DonNghiPhep', 'BangLuong']) {
    const deps = fake();
    expect((await preview(`table=${table}&page=0`, deps)).status, table).toBe(200);
    expect(deps.run).toHaveBeenCalledWith(expect.stringContaining(`FROM [dbo].[${table}]`));
    expect(deps.run).not.toHaveBeenCalledWith(expect.stringContaining('SELECT *'));
  }
  for (const table of ['phongban', 'dbo.PhongBan', '[PhongBan]', '__proto__', 'constructor', 'NhanVien; DROP TABLE NhanVien', 'NhanVien ORDER BY MaNV', '', 'Other']) {
    const deps = fake();
    expect(await preview(`table=${encodeURIComponent(table)}&page=0`, deps), table).toEqual({ status: 400, body: { ok: false, kind: 'bad-request' } });
    expect(deps.run).not.toHaveBeenCalled();
  }
});

it('rejects malformed or overflowing pages before any database call', async () => {
  for (const page of ['', '-1', '1.5', '+1', ' 1', '1 ', '1e2', '0x10', 'NaN', 'Infinity', '42949673', '9007199254740993', '1; SELECT 1']) {
    const deps = fake();
    expect(await preview(`table=PhongBan&page=${encodeURIComponent(page)}`, deps), page).toEqual({ status: 400, body: { ok: false, kind: 'bad-request' } });
    expect(deps.run).not.toHaveBeenCalled();
  }
});

it('refuses missing, repeated or arbitrary query fields instead of letting them shape SQL', async () => {
  for (const query of ['page=0', 'table=PhongBan', 'table=PhongBan&page=0&table=NhanVien', 'table=PhongBan&page=0&page=1', 'table=PhongBan&page=0&sql=SELECT+1', 'table=PhongBan&page=0&columns=MaPB', 'table=PhongBan&page=0&order=MaPB', 'table=PhongBan&page=0&query=x']) {
    const deps = fake();
    expect(await preview(query, deps), query).toEqual({ status: 400, body: { ok: false, kind: 'bad-request' } });
    expect(deps.run).not.toHaveBeenCalled();
  }
});

it('preserves timeout and quota failures but never exposes generated query errors as learner mistakes', async () => {
  for (const [extra, status, kind] of [
    [{ errorKind: 'timeout' }, 504, 'timeout'], [{ errorKind: 'quota' }, 503, 'quota'], [{ errorKind: 'unavailable' }, 503, 'unavailable'],
    [{ error: 'Invalid object name or private diagnostic' }, 503, 'unavailable'], [{ shape: null }, 503, 'unavailable'],
  ] as const) {
    expect(await preview('table=PhongBan&page=0', fake(result(0, extra)))).toEqual({ status, body: { ok: false, kind } });
  }
  const deps = { ...fake(), run: vi.fn(async () => { throw new Error('internal diagnostic'); }) };
  expect(await preview('table=PhongBan&page=0', deps)).toEqual({ status: 503, body: { ok: false, kind: 'unavailable' } });
});
