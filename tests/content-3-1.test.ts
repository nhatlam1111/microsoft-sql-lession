import { it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { parse } from 'yaml';
import { lessonBlocks } from './helpers/lesson-blocks';
import { leaveStartingIn, seedRows } from './helpers/hrm-seed';
import { checkFlow, inputPreview } from '../src/lib/run-flow';

const slug = '3-1-count-sum-avg';
const exercisePath = `src/content/exercises/${slug}.yaml`;
const exercises = () => parse(readFileSync(exercisePath, 'utf8')).exercises;

it('3.1 derives every SELECT cell from a compact illustration of all nine forms, not five excerpt rows', () => {
  const { steps } = lessonBlocks(slug);
  const [example] = steps[2].examples ?? [];
  expect(example).toBeDefined();
  expect(steps[2].examples).toHaveLength(1);
  const frequency = new Map<string, number>();
  for (const form of leaveStartingIn('2026-09')) {
    const days = Number(form.SoNgay).toFixed(1);
    frequency.set(days, (frequency.get(days) ?? 0) + 1);
  }
  expect(example.table?.rows).toEqual([...frequency.entries()].sort());
  expect(example.table?.rows.reduce((n, row) => n + Number(row[1]), 0)).toBe(9);
  expect(example.calculations?.map(c => [c.column, c.value])).toEqual([
    ['SoDon', 9], ['TongNgay', '16.0'], ['BinhQuan', '1.78'], ['ItNhat', '1.0'], ['NhieuNhat', '3.0'],
  ]);
  expect(example.calculations?.map(c => c.expression)).toEqual([
    'COUNT(*)', 'SUM(SoNgay)', 'CAST(AVG(SoNgay) AS decimal(10,2))', 'MIN(SoNgay)', 'MAX(SoNgay)',
  ]);
  expect(inputPreview(steps[2], steps[1]).rows).toHaveLength(5);
});

it('3.1 filters approved forms by start month, then aggregates all nine rows into one', () => {
  const lesson = lessonBlocks(slug);
  const source = seedRows('DonNghiPhep');
  const selected = leaveStartingIn('2026-09');
  expect(selected.map(r => r.MaDon)).toEqual(['DP001', 'DP002', 'DP003', 'DP004', 'DP011', 'DP013', 'DP016', 'DP017', 'DP019']);
  expect(source.find(r => r.MaDon === 'DP018')!.DenNgay).toBe('2026-09-04');
  const days = selected.map(r => Number(r.SoNgay));
  const sum = days.reduce((a, b) => a + b, 0);
  const expected = [[days.length, sum.toFixed(1), (sum / days.length).toFixed(2), Math.min(...days).toFixed(1), Math.max(...days).toFixed(1)]];
  expect(lesson.steps.map(s => [s.clause, s.total])).toEqual([['FROM', 20], ['WHERE', 9], ['SELECT', 1]]);
  expect(checkFlow(lesson.steps, lesson.query)).toEqual([]);
  expect(lesson.steps[0].columns).toEqual(['MaDon', 'TuNgay', 'SoNgay', 'TrangThai']);
  for (const [i, rows] of [source, selected].entries()) {
    const step = lesson.steps[i];
    expect(step.rows.length).toBeGreaterThan(0);
    for (const row of step.rows) expect(rows.some(r => step.columns.every((c, j) =>
      typeof r[c] === 'number' ? Number(row[j]) === r[c] : row[j] === r[c]))).toBe(true);
  }
  expect(lesson.steps[2].rows).toEqual(expected);
  expect(lesson.results.some(r => JSON.stringify(r.rows) === JSON.stringify(expected))).toBe(true);
  expect(lesson.query).toMatch(/WHERE TrangThai = N'Đã duyệt'\s+AND TuNgay >= '20260901' AND TuNgay < '20261001'/);
  expect(lesson.query).toMatch(/CAST\(AVG\(SoNgay\) AS decimal\(10,2\)\)/);
  expect(lesson.query).not.toMatch(/GROUP BY|\bJOIN\b|\bDenNgay\b/);
});

it('3.1 teaches non-NULL counts and the empty aggregate on its own scenario before the recap', () => {
  const lesson = lessonBlocks(slug);
  const teaching = lesson.body.split('## Hay nhầm ở đâu')[0];
  expect(teaching).toContain('COUNT(SoNgay)');
  expect(teaching).toContain('NOT NULL');
  expect(teaching).toMatch(/giả định/);
  expect(teaching).toContain('NULL');
  expect(teaching).toMatch(/không có dòng|không giữ dòng/);
  expect(teaching).toMatch(/mẫu số/);
  expect(teaching.match(/<Sql\b/g)).toHaveLength(1);
  expect(teaching).not.toContain('FROM NhanVien');
  // Cross-table transfer still needs to distinguish the two counts in exercise 1.
  const active = seedRows('NhanVien').filter(r => r.TrangThai === 'Đang làm');
  expect([active.length, active.filter(r => r.Email !== null).length]).toEqual([45, 43]);
});

it('3.1 checks each date bound and status on visible source rows, then aggregates all nine rows', () => {
  const { steps, query } = lessonBlocks(slug);
  const [from, where, select] = steps;
  const source = seedRows('DonNghiPhep');
  expect(from.input).toContain('`DonNghiPhep`');
  expect(where.checks?.conditions).toHaveLength(3);
  expect(where.checks?.totals).toEqual([
    source.filter(r => r.TrangThai === 'Đã duyệt').length,
    source.filter(r => String(r.TuNgay) >= '2026-09-01').length,
    source.filter(r => String(r.TuNgay) < '2026-10-01').length,
    9,
  ]);
  const input = inputPreview(where, from);
  expect(input.columns).toEqual(expect.arrayContaining(['MaDon', 'TrangThai', 'TuNgay']));
  expect(where.checks?.rows.some(r => r.slice(1).every(v => v === true))).toBe(true);
  expect(where.checks?.rows.some(r => r.slice(1).some(v => v === false))).toBe(true);
  for (const row of where.checks?.rows ?? []) {
    const record = source.find(r => r.MaDon === row[0])!;
    expect(row.slice(1)).toEqual([record.TrangThai === 'Đã duyệt', String(record.TuNgay) >= '2026-09-01', String(record.TuNgay) < '2026-10-01']);
  }
  expect(inputPreview(select, where).columns).toContain('SoNgay');
  expect(where.total).toBe(9);
  expect(select.total).toBe(1);
  expect(checkFlow(steps, query)).toEqual([]);
});

it('3.1 exercises cover a different scope, decimal average and a genuine empty aggregate', () => {
  expect(existsSync(exercisePath)).toBe(true);
  const es = exercises();
  expect(es.map((e: { id: string; kind: string; ordered: boolean; columns: string[] }) => [e.id, e.kind, e.ordered, e.columns])).toEqual([
    ['3-1-1', 'query', false, ['SoHoSo', 'SoEmail']],
    ['3-1-2', 'query', false, ['SoDon', 'TongNgay', 'BinhQuan', 'ItNhat', 'NhieuNhat']],
    ['3-1-3', 'query', false, ['SoDon', 'TongNgay', 'BinhQuan', 'ItNhat', 'NhieuNhat']],
  ]);
  const active = seedRows('NhanVien').filter(r => r.TrangThai === 'Đang làm');
  expect([active.length, active.filter(r => r.Email !== null).length]).toEqual([45, 43]);
  expect(es[0].answer).toContain("WHERE TrangThai = N'Đang làm'");
  const august = leaveStartingIn('2026-08');
  expect(august).toHaveLength(5);
  expect(august.reduce((n, r) => n + Number(r.SoNgay), 0)).toBe(14);
  expect(es[1].answer).toMatch(/TuNgay >= '20260801' AND TuNgay < '20260901'/);
  expect(es[2].answer).toMatch(/TuNgay >= '20261101' AND TuNgay < '20261201'/);
  expect(leaveStartingIn('2026-11', false)).toHaveLength(0);
  for (const e of es.slice(1)) {
    for (const fn of ['COUNT(*)', 'SUM(SoNgay)', 'AVG(SoNgay)', 'MIN(SoNgay)', 'MAX(SoNgay)']) expect(e.answer).toContain(fn);
    expect(e.answer).not.toMatch(/GROUP BY|ISNULL|COALESCE|N?'NULL'/);
  }
  for (const e of es) expect(lessonBlocks(slug).body.replace(/\s+/g, ' ')).not.toContain(e.answer.replace(/\s+/g, ' ').trim());
});
