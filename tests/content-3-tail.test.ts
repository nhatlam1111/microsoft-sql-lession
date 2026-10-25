import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { lessonBlocks } from './helpers/lesson-blocks';
import { seedRows } from './helpers/hrm-seed';
import { checkFlow } from '../src/lib/run-flow';

const slugs = ['3-8-union-gop-danh-sach', '3-9-subquery', '3-10-dem-co-dieu-kien'];
describe('lessons 3.8–3.10: full lessons and supported practice', () => {
  it.each(slugs)('%s has full narrative, three self-checks before practice and three query exercises', slug => {
    const lesson = lessonBlocks(slug);
    expect((lesson.data as {kind: string}).kind).toBe('full');
    expect(lesson.body.match(/<details>/g)?.length).toBeGreaterThanOrEqual(3);
    expect(lesson.body.lastIndexOf('</details>')).toBeLessThan(lesson.body.indexOf('## Bài tập'));
    const file = parse(readFileSync(`src/content/exercises/${slug}.yaml`, 'utf8'));
    expect(file.exercises).toHaveLength(3);
    expect(file.exercises.every((e: {kind: string}) => e.kind === 'query')).toBe(true);
  });
  it('3.8 demonstrates deduplicating one-column rows and retaining repeated occurrences', () => {
    const { body, results } = lessonBlocks(slugs[0]);
    expect(body).toMatch(/UNION ALL/);
    expect(body).toMatch(/UNION\nSELECT/);
    expect(body).toMatch(/ORDER BY MaNV/);
    expect(results.some(r => r.columns.length === 1 && new Set(r.rows.map(x => x[0])).size === r.rows.length)).toBe(true);
    expect(body).not.toMatch(/luôn (nhanh|chạy nhanh)/);
    expect(body).toMatch(/total=\{9\} mark=\{\[1\]\}/);
    expect(body).toMatch(/total=\{76\} mark=\{\[5\]\}/);
    expect(body).toMatch(/total=\{49\} mark=\{\[5,6\]\}/);
  });
  it('3.9 shows a correlated existence test and its inverse without multiplying employee rows', () => {
    const { body, results, steps } = lessonBlocks(slugs[1]);
    expect(body).toMatch(/IN \(/);
    expect(body).toMatch(/WHERE EXISTS/);
    expect(body).toMatch(/dp\.MaNV = nv\.MaNV/);
    expect(body).toMatch(/WHERE NOT EXISTS/);
    expect(body).toMatch(/hd\.MaNV = nv\.MaNV/);
    expect(results.some(r => r.total === 9 && r.columns.includes('HoTen'))).toBe(true);
    expect(steps.length).toBeGreaterThanOrEqual(2);
  });
  it('3.10 contrasts conditional sum with COUNT of a nullable expression on the active population', () => {
    const { body, results, query } = lessonBlocks(slugs[2]);
    expect(query).toMatch(/WHERE TrangThai = N'Đang làm'/);
    expect(query).toMatch(/SUM\(CASE WHEN GioiTinh = N'Nữ' THEN 1 ELSE 0 END\)/);
    expect(body).toMatch(/COUNT\(CASE WHEN GioiTinh = N'Nữ' THEN 1 END\)/);
    const report = results.find(r => r.columns.join(',') === 'MaPB,SoNam,SoNu,TongSo');
    expect(report?.total).toBe(6);
    expect(report?.rows.reduce((sum, row) => sum + Number(row[3]), 0)).toBe(45);
    expect(report?.rows.every(row => Number(row[1]) + Number(row[2]) === row[3])).toBe(true);
  });
  it('3.9 preserves the nine approved-September employee profiles and the two profiles without any contract', () => {
    const {results, steps, query} = lessonBlocks(slugs[1]);
    const ids = new Set(seedRows('DonNghiPhep').filter(r => r.TrangThai === 'Đã duyệt' && String(r.TuNgay).startsWith('2026-09')).map(r => r.MaNV));
    const employees = seedRows('NhanVien');
    const expected = employees.filter(r => ids.has(r.MaNV)).map(r => [r.MaNV,r.HoTen,r.MaPB]);
    expect(results.find(r => r.columns.join(',') === 'MaNV,HoTen,MaPB')?.rows).toEqual(expected);
    const contracted = new Set(seedRows('HopDong').map(r => r.MaNV));
    expect(results.find(r => r.columns.join(',') === 'MaNV,HoTen')?.rows).toEqual(employees.filter(r => !contracted.has(r.MaNV)).map(r => [r.MaNV,r.HoTen]));
    expect(steps.map(s => [s.clause,s.total])).toEqual([['FROM',48],['WHERE',9],['SELECT',9],['ORDER BY',9]]);
    expect(checkFlow(steps,query)).toEqual([]);
    expect(steps[1].sql).toMatch(/\nWHERE nv\.MaNV IN \(\n\tSELECT MaNV\n\tFROM DonNghiPhep\n\tWHERE/);
    expect(steps[1].sql).toMatch(/\n\t\tAND TuNgay/);
  });
  it('3.10 report and flow retain active profiles and conditional gender totals from the source fixture', () => {
    const {results,steps,query} = lessonBlocks(slugs[2]);
    const active = seedRows('NhanVien').filter(r => r.TrangThai === 'Đang làm');
    const expected = [...new Set(active.map(r => String(r.MaPB)))].sort().map(code => {
      const rows = active.filter(r => r.MaPB === code);
      return [code,rows.filter(r => r.GioiTinh === 'Nam').length,rows.filter(r => r.GioiTinh === 'Nữ').length,rows.length];
    });
    expect(results.find(r => r.columns.join(',') === 'MaPB,SoNam,SoNu,TongSo')?.rows).toEqual(expected);
    expect(steps.map(s => [s.clause,s.total])).toEqual([['FROM',48],['WHERE',45],['GROUP BY',6],['SELECT',6],['ORDER BY',6]]);
    expect(checkFlow(steps,query)).toEqual([]);
  });
});
