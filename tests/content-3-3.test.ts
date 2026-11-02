import { it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { lessonBlocks } from './helpers/lesson-blocks';
import { countsBy, leaveStartingIn, seedRows } from './helpers/hrm-seed';
import { checkFlow, inputPreview } from '../src/lib/run-flow';

const slug = '3-3-having-loc-sau-khi-gop';
const active = seedRows('NhanVien').filter(r => r.TrangThai === 'Đang làm');
const grouped = countsBy(active, ['MaPB']);

it('3.3 filters visible profiles first, then checks group counts without using the SELECT alias early', () => {
  const { steps, query } = lessonBlocks(slug);
  const [from, where, group, having, select] = steps;
  expect(from.input).toContain('`NhanVien`');
  expect(where.checks?.totals).toEqual([45, 45]);
  for (const row of where.checks?.rows ?? []) {
    expect(row[1]).toBe(seedRows('NhanVien').find(r => r.MaNV === row[0])!.TrangThai === 'Đang làm');
  }
  expect(where.checks?.rows.some(r => r[1] === false)).toBe(true);
  expect(group.columns).toEqual(['MaPB', 'Số hồ sơ trong nhóm']);
  expect(having.columns).toEqual(group.columns);
  expect(inputPreview(having, group)).toMatchObject({ columns: group.columns, moreRows: 1 });
  expect(having.checks?.conditions).toEqual(['COUNT(*) > 10']);
  expect(having.checks?.totals).toEqual([1, 1]);
  expect(having.checks?.rows).toContainEqual(['KD', true]);
  expect(having.checks?.rows).toContainEqual(['IT', false]);
  const counts = new Map(grouped.map(r => [r[0], Number(r[1])]));
  for (const row of having.checks?.rows ?? []) expect(row[1]).toBe(counts.get(row[0])! > 10);
  expect(having.rows).toEqual([['KD', 13]]);
  expect(inputPreview(select, having).columns).toEqual(group.columns);
  expect(select.columns).toEqual(['MaPB', 'SoHoSo']);
  expect(checkFlow(steps, query)).toEqual([]);
});

it('3.3 uses bounded KD and IT excerpts and maps the retained group to its two SELECT cells', () => {
  const { steps } = lessonBlocks(slug);
  const groupExamples = steps[2].examples ?? [];
  expect(groupExamples).toHaveLength(2);
  expect(groupExamples.map(e => e.table?.rows[0][1])).toEqual(['KD', 'IT']);
  for (const e of [...groupExamples, ...(steps[4].examples ?? [])]) {
    const department = e.table!.rows[0][1];
    const members = active.filter(r => r.MaPB === department);
    expect(e.table?.columns).toEqual(['MaNV', 'MaPB']);
    expect(e.table!.rows.length).toBeGreaterThan(0);
    expect(e.table!.rows.length).toBeLessThanOrEqual(5);
    expect(e.table!.rows.length).toBeLessThan(members.length);
    for (const row of e.table!.rows) expect(members.some(m => m.MaNV === row[0] && m.MaPB === row[1])).toBe(true);
    expect(e.note).toMatch(/trích/i);
    expect(e.note).toContain(String(members.length));
  }
  const select = steps[4];
  expect(select.examples).toHaveLength(1);
  expect(select.examples?.[0].calculations?.map(c => [c.expression, c.column, c.value])).toEqual([
    ['MaPB', 'MaPB', 'KD'], ['COUNT(*)', 'SoHoSo', 13],
  ]);
  expect(select.mark?.map(n => select.rows[n - 1])).toEqual([['KD', 13]]);
});

it('3.3 filters rows before grouping, and groups before assigning the SELECT alias', () => {
  const lesson = lessonBlocks(slug);
  expect(lesson.steps.map(s => [s.clause, s.total])).toEqual([
    ['FROM', 48], ['WHERE', 45], ['GROUP BY', 6], ['HAVING', 1], ['SELECT', 1], ['ORDER BY', 1],
  ]);
  expect(checkFlow(lesson.steps, lesson.query)).toEqual([]);
  expect([...lesson.steps[2].rows].sort()).toEqual([...grouped].sort());
  for (const step of lesson.steps.slice(3)) expect(step.rows).toEqual([['KD', 13]]);
  expect(lesson.results.some(r => JSON.stringify(r.rows) === JSON.stringify([['KD', 13]]))).toBe(true);
  expect(lesson.query).toMatch(/WHERE TrangThai = N'Đang làm'\s+GROUP BY MaPB\s+HAVING COUNT\(\*\) > 10\s+ORDER BY \[?SoHoSo\]? DESC, MaPB ASC;/);
  expect(lesson.query).not.toMatch(/HAVING \[?SoHoSo\]?/);
});

it('3.3 uses a strict threshold that excludes the group of exactly ten', () => {
  const kept = grouped.filter(r => Number(r[1]) > 10);
  const inclusive = grouped.filter(r => Number(r[1]) >= 10);
  expect(kept).toEqual([['KD', 13]]);
  expect(inclusive).toContainEqual(['IT', 10]);
  expect(inclusive).not.toEqual(kept);
  expect(countsBy(seedRows('NhanVien'), ['MaPB']).find(r => r[0] === 'KD')).toEqual(['KD', 14]);
});

it('3.3 exercises expose both count boundaries, sum boundaries and composite keys', () => {
  const path = `src/content/exercises/${slug}.yaml`;
  expect(existsSync(path)).toBe(true);
  const es = parse(readFileSync(path, 'utf8')).exercises;
  expect(es.map((e: { id: string; columns: string[]; ordered: boolean }) => [e.id, e.columns, e.ordered])).toEqual([
    ['3-3-1', ['MaPB', 'SoHoSo'], true],
    ['3-3-2', ['LoaiNghi', 'SoDon', 'TongNgay'], true],
    ['3-3-3', ['MaPB', 'MaCD', 'SoHoSo'], true],
  ]);
  expect(es[0].answer).toMatch(/HAVING COUNT\(\*\) > 5 AND COUNT\(\*\) <= 10/);
  const mids = grouped.filter(r => Number(r[1]) > 5 && Number(r[1]) <= 10);
  expect(mids.map(r => r[0]).sort()).toEqual(['IT', 'KT', 'VH']);
  expect(grouped).toContainEqual(['NS', 5]);
  expect(grouped).toContainEqual(['IT', 10]);
  expect(es[1].answer).toMatch(/WHERE TrangThai = N'Đã duyệt'\s+AND TuNgay >= '20260901' AND TuNgay < '20261001'\s+GROUP BY LoaiNghi\s+HAVING SUM\(SoNgay\) >= 5/);
  const byType = new Map<string, number>();
  for (const r of leaveStartingIn('2026-09')) byType.set(String(r.LoaiNghi), (byType.get(String(r.LoaiNghi)) ?? 0) + Number(r.SoNgay));
  expect([...byType].sort()).toEqual([['Nghỉ ốm', 5], ['Phép năm', 9], ['Việc riêng', 2]]);
  expect([...byType.values()].filter(n => n >= 5)).toHaveLength(2);
  expect([...byType.values()].filter(n => n > 5)).toHaveLength(1);
  expect(es[2].answer).toMatch(/GROUP BY MaPB, MaCD\s+HAVING COUNT\(\*\) >= 3\s+ORDER BY MaPB ASC, MaCD ASC;/);
  const pairs = countsBy(active, ['MaPB', 'MaCD']).filter(r => Number(r[2]) >= 3);
  expect(pairs).toHaveLength(6);
  expect(pairs.filter(r => r[2] === 3)).toHaveLength(3);
  for (const e of [es[0], es[2]]) expect(e.answer).toContain("WHERE TrangThai = N'Đang làm'");
  for (const e of es) expect(lessonBlocks(slug).body.replace(/\s+/g, ' ')).not.toContain(e.answer.replace(/\s+/g, ' ').trim());
});
