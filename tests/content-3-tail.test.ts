import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { lessonBlocks } from './helpers/lesson-blocks';
import { seedRows } from './helpers/hrm-seed';
import { checkFlow } from '../src/lib/run-flow';
import { inputPreview } from '../src/lib/run-flow';

const slugs = ['3-8-union-gop-danh-sach', '3-9-subquery', '3-12-dem-co-dieu-kien'];
describe('lessons 3.8, 3.9 and 3.12: full lessons and supported practice', () => {
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
    const flow = lessonBlocks(slugs[0]).steps;
    expect(flow[0].rows).toContainEqual(['NV005']);
    expect(flow[1].rows).toContainEqual(['NV005']);
    expect(body).toMatch(/49/);
    expect(body).toMatch(/85/);
  });
  it('3.8 walks the exact situation query through two independent branches, UNION and shared ordering', () => {
    const { body, query, steps } = lessonBlocks(slugs[0]);
    expect(body).toContain('### SQL Server chạy câu này thế nào');
    expect(steps.map(s => [s.clause, s.total])).toEqual([['SELECT', 9], ['SELECT', 76], ['UNION', 41], ['ORDER BY', 41]]);
    expect(checkFlow(steps, query)).toEqual([]);
    expect(steps[0].focus).toContain('FROM DonNghiPhep');
    expect(steps[1].focus).toContain('FROM ChamCong');
    expect(steps[0].sql).toContain("TrangThai = N'Đã duyệt'");
    expect(steps[0].sql).toContain("TuNgay >= '20260901' AND TuNgay < '20261001'");
    expect(steps[1].sql).toContain("Ngay >= '20260901' AND Ngay < '20261001'");
    expect(steps[1].sql).toContain("GioVao > '08:00'");
    expect(steps[2].sql).toContain('\nUNION\n');
    expect(steps[2].sql).not.toContain('ORDER BY');
    expect(steps[3].sql).toBe(query);
    // Same statement in the teaching block and the diagram, independent of subsection wording.
    expect(body.match(/<Sql code=\{`([\s\S]*?)`\} \/>/)?.[1]).toBe(body.match(/<RunFlow query=\{`([\s\S]*?)`/ )?.[1]);
    const actualLeave = seedRows('DonNghiPhep').filter(r => r.TrangThai === 'Đã duyệt' && String(r.TuNgay).startsWith('2026-09')).map(r => [r.MaNV]);
    expect(steps[0].rows.map(row => JSON.stringify(row)).sort()).toEqual(actualLeave.map(row => JSON.stringify(row)).sort());
    expect(steps[0].rows).toContainEqual(['NV005']);
    expect(steps[1].rows).toContainEqual(['NV005']);
    expect(steps[2].rows.filter(r => r[0] === 'NV005')).toHaveLength(1);
    expect(body).toMatch(/nhánh độc lập/);
    expect(body).toMatch(/không (?:phải|mô tả)[^.]*thực thi vật lý/);
  });
  it('3.9 shows a correlated existence test and its inverse without multiplying employee rows', () => {
    const { body, results, steps } = lessonBlocks(slugs[1]);
    expect(body).toMatch(/IN \(/);
    expect(body).toMatch(/EXISTS \(/);
    expect(body).toMatch(/dp\.MaNV = nv\.MaNV/);
    expect(body).toMatch(/NOT EXISTS/);
    expect(body).toMatch(/SELECT 1/);
    expect(results.some(r => r.total === 9 && r.columns.includes('HoTen'))).toBe(true);
    expect(steps.length).toBeGreaterThanOrEqual(2);
  });
  it('3.12 contrasts conditional sum with COUNT of a nullable expression on the active population', () => {
    const { body, results, query } = lessonBlocks(slugs[2]);
    const normalized = query.replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
    expect(normalized).toMatch(/WHERE TrangThai = N'Đang làm'/);
    expect(normalized).toMatch(/SUM\(CASE WHEN GioiTinh = N'Nữ' THEN 1 ELSE 0 END\)/);
    expect(body).toMatch(/COUNT\(CASE WHEN GioiTinh = N'Nữ' THEN 1 END\)/);
    const report = results.find(r => r.columns.join(',') === 'MaPB,SoNam,SoNu,TongSo');
    expect(report?.total).toBe(6);
    expect(report?.rows.reduce((sum, row) => sum + Number(row[3]), 0)).toBe(45);
    expect(report?.rows.every(row => Number(row[1]) + Number(row[2]) === row[3])).toBe(true);
  });
  it('3.9 preserves nine approved-September profiles and shows the complement within the same leave scope', () => {
    const {results, steps, query} = lessonBlocks(slugs[1]);
    const ids = new Set(seedRows('DonNghiPhep').filter(r => r.TrangThai === 'Đã duyệt' && String(r.TuNgay).startsWith('2026-09')).map(r => r.MaNV));
    const employees = seedRows('NhanVien');
    const expected = employees.filter(r => ids.has(r.MaNV)).map(r => [r.MaNV,r.HoTen,r.MaPB]);
    expect(results.find(r => r.columns.join(',') === 'MaNV,HoTen,MaPB')?.rows).toEqual(expected);
    expect(employees.filter(r => !ids.has(r.MaNV))).toHaveLength(39);
    expect(steps.map(s => [s.clause,s.total])).toEqual([['FROM',48],['WHERE',9],['SELECT',9],['ORDER BY',9]]);
    expect(checkFlow(steps,query)).toEqual([]);
    const beforeOrder = steps[2].rows.map(r => String(r[0]));
    expect(beforeOrder).not.toEqual([...beforeOrder].sort());
    const finalOrder = steps[3].rows.map(r => String(r[0]));
    expect(finalOrder).toEqual([...finalOrder].sort());
    expect(steps[1].sql).toMatch(/\nWHERE nv\.MaNV IN \(\n\tSELECT dp.MaNV\n\tFROM DonNghiPhep AS dp\n\tWHERE/);
    expect(steps[1].sql).toMatch(/\n\t\tAND dp.TuNgay/);
    expect(steps[1].checks?.totals).toEqual([9,9]);
    expect(steps[1].checks?.rows.some(r => r[1] === false)).toBe(true);
    expect(inputPreview(steps[2],steps[1]).columns).toEqual(expect.arrayContaining(['MaNV','HoTen','MaPB']));
    expect(steps[1].examples?.[0].table?.rows).toEqual([...ids].sort().slice(0,5).map(id => [id]));
  });
  it('3.12 report and flow retain active profiles and conditional gender totals from the source fixture', () => {
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
  it('3.12 traces conditional contributions from two complete groups to the output cells', () => {
    const {body, steps} = lessonBlocks(slugs[2]);
    expect(body.match(/<details>/g)).toHaveLength(4);
    const select=steps.find(s=>s.clause==='SELECT')!;
    expect(select.checks).toBeUndefined(); // These are aggregates over groups, not CASE labels for individual output rows.
    expect(select.examples).toHaveLength(2);
    const employees=seedRows('NhanVien').filter(r=>r.TrangThai==='Đang làm');
    for(const code of ['BGD','NS']){
      const example=select.examples!.find(e=>e.calculations?.some(c=>c.column==='MaPB'&&c.value===code))!;
      expect(example,code).toBeDefined();
      const members=employees.filter(r=>r.MaPB===code);
      expect(example.table?.columns).toEqual(['MaNV','MaPB','GioiTinh','Cờ nam','Cờ nữ']);
      expect(example.table?.rows).toEqual(members.map(r=>[r.MaNV,r.MaPB,r.GioiTinh,Number(r.GioiTinh==='Nam'),Number(r.GioiTinh==='Nữ')]));
      expect(example.calculations?.map(c=>[c.column,c.value])).toEqual([
        ['MaPB',code],['SoNam',members.filter(r=>r.GioiTinh==='Nam').length],
        ['SoNu',members.filter(r=>r.GioiTinh==='Nữ').length],['TongSo',members.length],
      ]);
    }
    const unsorted=steps[3].rows.map(r=>String(r[0]));
    expect(unsorted).not.toEqual([...unsorted].sort());
    expect(steps[4].rows.map(r=>String(r[0]))).toEqual([...unsorted].sort());
  });
});
