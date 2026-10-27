import { it, expect } from 'vitest';
import { fixtureQuery, lessonExamples } from './helpers/window-fixture';
import { seedRows } from './helpers/hrm-seed';
import { guardExercise } from '../src/lib/sql-guard';

const slug = '4-9-power-query-excel';
const ids = ['NV007','NV011','NV017','NV021','NV029','NV035','NV039','NV043','NV046','NV048'];
function example() {
  const pairs = lessonExamples(slug).pairs;
  if (pairs.length !== 1) expect.fail('Expected the complete SELECT and its displayed result');
  return pairs[0];
}

it('the SQL sent to Excel returns the ten current IT records with the displayed columns and rows', () => {
  const p = example(), result = fixtureQuery(p.sql);
  expect(result.columns).toEqual(['Mã NV','Họ tên','Mã phòng']);
  expect(result.rows).toEqual([
    ['NV007','Bùi Thanh Sơn','IT'], ['NV011','Lý Minh Khoa','IT'],
    ['NV017','Cao Minh Trí','IT'], ['NV021','Tôn Thất Long','IT'],
    ['NV029','Mạc Văn Đông','IT'], ['NV035','Thái Minh Hiếu','IT'],
    ['NV039','Âu Văn Kiên','IT'], ['NV043','Đàm Văn Khánh','IT'],
    ['NV046','Hứa Thị Phương','IT'], ['NV048','Đỗ Minh Quân','IT'],
  ]);
  expect(p.columns).toEqual(result.columns);
  expect(p.rows).toEqual(result.rows);
  expect(p.total).toBe(10);
  expect(guardExercise(p.sql)).toEqual({ ok: true });
});

it('a departed IT record is excluded when the saved SQL is rerun', () => {
  const employees = seedRows('NhanVien').map(r => r.MaNV === 'NV007' ? { ...r, TrangThai: 'Đã nghỉ' } : r);
  expect(fixtureQuery(example().sql, { NhanVien: employees }).rows.map(r => r[0])).toEqual(ids.slice(1));
});

it('a record moved out of IT is excluded when the saved SQL is rerun', () => {
  const employees = seedRows('NhanVien').map(r => r.MaNV === 'NV048' ? { ...r, MaPB: 'NS' } : r);
  expect(fixtureQuery(example().sql, { NhanVien: employees }).rows.map(r => r[0])).toEqual(ids.slice(0,-1));
});
