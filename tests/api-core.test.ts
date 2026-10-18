import { it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { handleRun, handleGrade, handlePing, type Deps, type RunOutcome } from '../api/src/core';
import { createLimiter } from '../api/src/limiter';
import { shapeOf } from '../api/src/shape';
import type { RunResponse } from '../src/lib/exercise-types';
import type { Exercise } from '../src/lib/exercise-types';

const base = { title: 't', summary: 's', prompt: 'p', columns: ['a'], ordered: false };
const exercises: Record<string, Exercise> = {
  q1: { ...base, id: 'q1', kind: 'query', answer: 'SELECT 1 AS a' },
  c1: { ...base, id: 'c1', kind: 'change', answer: 'DELETE FROM T WHERE x = 1', check: 'SELECT a FROM T ORDER BY a' },
};
const outcome = (o: Partial<RunOutcome & { rowCount: number }> = {}): RunOutcome => {
  const rows = Array.from({ length: o.rowCount ?? 1 }, (_, i) => [String(i)]);
  return {
    shape: { columns: [{ name: 'a', type: 'varchar' }], rows },
    affected: o.affected ?? [rows.length], check: o.check ?? null,
    error: o.error ?? null, errorKind: o.errorKind ?? null, ms: 5,
  };
};
const depsReturning = (o: Partial<RunOutcome & { rowCount: number }> = {}): Deps => ({
  codes: ['abc'], exercises, allow: () => true, run: async () => outcome(o),
});
const deps = depsReturning();

it('refuses a missing body, a wrong code, an unknown exercise and a blocked statement', async () => {
  expect((await handleRun(null, 'abc', deps)).status).toBe(400);
  expect((await handleRun({ exercise: 'q1', sql: 'SELECT 1' }, 'nope', deps)).body).toEqual({ ok: false, kind: 'bad-code' });
  expect((await handleRun({ exercise: 'zz', sql: 'SELECT 1' }, 'abc', deps)).status).toBe(404);
  expect((await handleRun({ exercise: 'q1', sql: 'DROP TABLE NhanVien' }, 'abc', deps)).body)
    .toEqual({ ok: false, kind: 'blocked', reason: 'Bài tập chỉ nhận câu bắt đầu bằng SELECT, WITH, INSERT, UPDATE hoặc DELETE.' });
});

it('caps shown rows at 200 and reports several statements as one error', async () => {
  const big = await handleRun({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', depsReturning({ rowCount: 250 }));
  expect([big.status, (big.body as RunResponse).rows.length, (big.body as RunResponse).truncated]).toEqual([200, 200, true]);
  expect((await handleRun({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', depsReturning({ affected: [2, 3] }))).body).toEqual({ ok: false, kind: 'multi' });
});

it('maps a timeout and a paused database to their own errors', async () => {
  expect((await handleRun({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', depsReturning({ errorKind: 'timeout' }))).status).toBe(504);
  expect((await handleRun({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', depsReturning({ errorKind: 'quota' }))).body).toEqual({ ok: false, kind: 'quota' });
});

it('grades with the answer, and says a SQL error is not correct', async () => {
  expect((await handleGrade({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', deps)).body).toMatchObject({ ok: true, correct: true, reason: null });
  expect((await handleGrade({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', depsReturning({ error: "Invalid column name 'X'." }))).body)
    .toMatchObject({ correct: false, reason: 'câu lệnh bị lỗi, xem tab Messages', error: "Invalid column name 'X'." });
});

it('lets 30 calls a minute through per code', () => {
  let t = 0;
  const allow = createLimiter(30, 60_000, () => t);
  expect(Array.from({ length: 31 }, () => allow('a')).filter(Boolean).length).toBe(30);
  expect(allow('b')).toBe(true);
  t = 60_001;
  expect(allow('a')).toBe(true);
});

it('wakes the database only for a valid access code', async () => {
  const ping = vi.fn(async () => 42);
  expect(await handlePing(null, { codes: ['abc'], ping })).toEqual({ status: 401, body: { ok: false, kind: 'bad-code' } });
  expect(await handlePing('nope', { codes: ['abc'], ping })).toEqual({ status: 401, body: { ok: false, kind: 'bad-code' } });
  expect(ping).not.toHaveBeenCalled();
  expect(await handlePing('abc', { codes: ['abc'], ping })).toEqual({ status: 200, body: { ok: true, ms: 42 } });
  const down = async () => { throw new Error('Database is paused: free amount limit reached'); };
  expect(await handlePing('abc', { codes: ['abc'], ping: down })).toEqual({ status: 503, body: { ok: false, kind: 'quota' } });
});

it('sends the database the same line breaks the guard read', async () => {
  const run = vi.fn(async () => outcome());
  await handleRun({ exercise: 'q1', sql: 'SELECT a\r\nFROM T\rWHERE 1 = 1' }, 'abc', { ...deps, run });
  expect(run).toHaveBeenCalledWith('SELECT a\nFROM T\nWHERE 1 = 1');
});

it('reads a FOR JSON result, which the driver hands back as one object row', () => {
  const id = 'JSON_F52E2B61-18A1-11d1-B105-00805F49916B';
  const set = Object.assign([{ 0: '[{"MaNV":"NV001"}]' }], { columns: [{ name: id, type: { declaration: 'nvarchar' } }] });
  expect(shapeOf(set)).toEqual({ columns: [{ name: id, type: 'nvarchar', scale: undefined }], rows: [['[{"MaNV":"NV001"}]']] });
});

it('api/.funcignore anchors every rule to api/, so packages in node_modules keep their own src folders', () => {
  // The deploy action reads it with gitignore rules: a bare "src" also strips node_modules/debug/src and the API cannot load.
  const rules = readFileSync('api/.funcignore', 'utf8').split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  expect(rules.length).toBeGreaterThan(0);
  expect(rules.filter(r => !r.startsWith('/'))).toEqual([]);
});
