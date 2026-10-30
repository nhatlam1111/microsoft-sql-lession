import { it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { parse } from 'yaml';
import { lessonBlocks } from './helpers/lesson-blocks';
import { leaveStartingIn, seedRows } from './helpers/hrm-seed';
import { checkFlow } from '../src/lib/run-flow';

const slug = '3-1-count-sum-avg';
const exercisePath = `src/content/exercises/${slug}.yaml`;
const exercises = () => parse(readFileSync(exercisePath, 'utf8')).exercises;

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

it('3.1 contrasts profile count with non-NULL email count without filtering away missing values', () => {
  const lesson = lessonBlocks(slug);
  const people = seedRows('NhanVien');
  const expected = [[people.length, people.filter(r => r.Email !== null).length]];
  expect(expected).toEqual([[48, 46]]);
  expect(lesson.results.some(r => JSON.stringify(r.rows) === JSON.stringify(expected))).toBe(true);
  expect(lesson.body).toMatch(/COUNT\(\*\) AS \[?SoHoSo\]?, COUNT\(Email\) AS \[?SoEmail\]?\s+FROM NhanVien;/);
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
