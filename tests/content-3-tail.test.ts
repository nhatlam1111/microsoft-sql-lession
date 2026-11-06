import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { lessonBlocks } from './helpers/lesson-blocks';
import { seedRows } from './helpers/hrm-seed';
import { checkFlow } from '../src/lib/run-flow';
import { inputPreview } from '../src/lib/run-flow';

const slugs = ['3-8-union-gop-danh-sach', '3-9-subquery'];
describe('lessons 3.8 and 3.9: full lessons and supported practice', () => {
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

});
