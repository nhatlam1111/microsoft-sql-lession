import { it, expect } from 'vitest';
import { fixtureQuery, lessonExamples } from './helpers/window-fixture';
import { seedRows } from './helpers/hrm-seed';
import { guardExercise } from '../src/lib/sql-guard';

const slug = '4-10-viet-yeu-cau-bao-cao';
function example() {
  const pairs = lessonExamples(slug).pairs;
  if (pairs.length !== 1) expect.fail('Expected the report SELECT and its displayed result');
  return pairs[0];
}
const expected = [
  ['NV047','Phạm Ngọc Ánh','NS','2026-10-01'],
  ['NV048','Đỗ Minh Quân','IT','2026-10-05'],
];

it('the report returns one employee per row with the four agreed columns and displayed values', () => {
  const p = example(), result = fixtureQuery(p.sql);
  expect(result.columns).toEqual(['Mã NV','Họ tên','Mã phòng hiện lưu','Ngày vào làm']);
  expect(result.rows).toEqual(expected);
  expect(p.columns).toEqual(result.columns);
  expect(p.rows).toEqual(result.rows);
  expect(p.total).toBe(2);
  expect(guardExercise(p.sql)).toEqual({ ok: true });
});

it('the report includes both agreed days and sorts dates before breaking ties by code', () => {
  const row = seedRows('NhanVien').find(r => r.MaNV === 'NV047')!;
  const employees = [
    { ...row, MaNV: 'T100', NgayVaoLam: '2026-10-21' },
    { ...row, MaNV: 'T200', NgayVaoLam: '2026-10-22' },
    { ...row, MaNV: 'T050', NgayVaoLam: '2026-10-21' },
    { ...row, MaNV: 'T800', NgayVaoLam: '2026-10-01' },
    { ...row, MaNV: 'T900', NgayVaoLam: '2026-09-30' },
  ];
  expect(fixtureQuery(example().sql, { NhanVien: employees }).rows.map(r => [r[0],r[3]]))
    .toEqual([['T800','2026-10-01'],['T050','2026-10-21'],['T100','2026-10-21']]);
});

it('status and contract multiplicity do not exclude or duplicate a qualifying employee', () => {
  const employees = seedRows('NhanVien').map(r => r.MaNV === 'NV047'
    ? { ...r, TrangThai: 'Đã nghỉ', NgayNghiViec: '2026-10-21' } : r);
  const contracts = seedRows('HopDong'), row = contracts[0];
  const multiple = [...contracts,
    { ...row, MaHD: 'TEST-047-A', MaNV: 'NV047' },
    { ...row, MaHD: 'TEST-047-B', MaNV: 'NV047' },
  ];
  expect(fixtureQuery(example().sql, { NhanVien: employees, HopDong: multiple }).rows).toEqual(expected);
});
