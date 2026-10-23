import { it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { parse } from 'yaml';
import { lessonBlocks } from './helpers/lesson-blocks';
import { countsBy, seedRows } from './helpers/hrm-seed';
import { checkFlow } from '../src/lib/run-flow';

const slug = '3-2-group-by-pivottable';
const active = seedRows('NhanVien').filter(r => r.TrangThai === 'Đang làm');
const departments = countsBy(active, ['MaPB']).sort((a, b) => Number(b[1]) - Number(a[1]) || String(a[0]).localeCompare(String(b[0])));

it('3.2 groups the 45 active profiles before selecting and ordering the six results', () => {
  const lesson = lessonBlocks(slug);
  expect(departments).toEqual([['KD', 13], ['IT', 10], ['VH', 8], ['KT', 7], ['NS', 5], ['BGD', 2]]);
  expect(lesson.steps.map(s => [s.clause, s.total])).toEqual([
    ['FROM', 48], ['WHERE', 45], ['GROUP BY', 6], ['SELECT', 6], ['ORDER BY', 6],
  ]);
  expect(checkFlow(lesson.steps, lesson.query)).toEqual([]);
  for (const [i, source] of [seedRows('NhanVien'), active].entries()) {
    const step = lesson.steps[i];
    expect(step.columns).toEqual(['MaNV', 'MaPB', 'TrangThai']);
    expect(step.rows.every(row => source.some(r => step.columns.every((c, j) => row[j] === r[c])))).toBe(true);
  }
  for (const step of lesson.steps.slice(2, 4)) expect([...step.rows].sort()).toEqual([...departments].sort());
  expect(lesson.steps[4].rows).toEqual(departments);
  expect(lesson.results.some(r => JSON.stringify(r.rows) === JSON.stringify(departments))).toBe(true);
  expect(lesson.query).toMatch(/WHERE TrangThai = N'Đang làm'\s+GROUP BY MaPB\s+ORDER BY \[?SoHoSo\]? DESC, MaPB ASC;/);
  expect(departments.reduce((n, r) => n + Number(r[1]), 0)).toBe(45);
});

it('3.2 changes the grain when the current KD profiles are split by status', () => {
  const lesson = lessonBlocks(slug);
  const kd = seedRows('NhanVien').filter(r => r.MaPB === 'KD');
  const groups = countsBy(kd, ['MaPB', 'TrangThai']).sort((a, b) => Number(b[2]) - Number(a[2]));
  expect(groups).toEqual([['KD', 'Đang làm', 13], ['KD', 'Đã nghỉ', 1]]);
  expect(lesson.results.some(r => JSON.stringify(r.rows) === JSON.stringify(groups))).toBe(true);
  expect(lesson.body).toMatch(/WHERE MaPB = 'KD'\s+GROUP BY MaPB, TrangThai\s+ORDER BY \[?SoHoSo\]? DESC;/);
});

it('3.2 exercises distinguish title groups, department/status groups and leave-day sums', () => {
  const path = `src/content/exercises/${slug}.yaml`;
  expect(existsSync(path)).toBe(true);
  const es = parse(readFileSync(path, 'utf8')).exercises;
  expect(es.map((e: { id: string; columns: string[]; ordered: boolean }) => [e.id, e.columns, e.ordered])).toEqual([
    ['3-2-1', ['MaCD', 'SoHoSo'], true],
    ['3-2-2', ['MaPB', 'TrangThai', 'SoHoSo'], true],
    ['3-2-3', ['LoaiNghi', 'SoDon', 'TongNgay'], true],
  ]);
  expect(es[0].answer).toMatch(/WHERE TrangThai = N'Đang làm'\s+GROUP BY MaCD\s+ORDER BY \[?SoHoSo\]? DESC, MaCD ASC;/);
  const titles = countsBy(active, ['MaCD']);
  expect(titles).toContainEqual(['CV', 20]);
  expect(titles).toContainEqual(['NV', 14]);
  expect(es[1].answer).toMatch(/GROUP BY MaPB, TrangThai\s+ORDER BY MaPB ASC, \[?SoHoSo\]? DESC;/);
  expect(es[1].answer).not.toMatch(/\bWHERE\b/);
  const pairs = countsBy(seedRows('NhanVien'), ['MaPB', 'TrangThai']);
  expect(pairs).toHaveLength(8);
  expect(pairs.reduce((n, r) => n + Number(r[2]), 0)).toBe(48);
  expect(es[2].answer).toMatch(/WHERE TrangThai = N'Đã duyệt'\s+GROUP BY LoaiNghi\s+ORDER BY LoaiNghi ASC;/);
  expect(es[2].answer).toContain('COUNT(*)');
  expect(es[2].answer).toContain('SUM(SoNgay)');
  for (const e of es) expect(lessonBlocks(slug).body.replace(/\s+/g, ' ')).not.toContain(e.answer.replace(/\s+/g, ' ').trim());
});
