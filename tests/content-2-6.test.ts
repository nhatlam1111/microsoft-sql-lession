import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { readLessonFiles } from './helpers/lessons';

// A premature deduplication at SELECT, a missing department, or retaining MaNV
// in the DISTINCT projection would misrepresent the question this lesson answers.
// This is a source-data/rendered-content contract, not SQL Server execution.
const seed = readFileSync('database/HRM_Demo.sql', 'utf8');
const insert = seed.match(/INSERT INTO dbo\.NhanVien \(([^)]+)\) VALUES\s*([\s\S]*?);/)!;
const fields = insert[1].split(',').map(s => s.trim());
const people = [...insert[2].matchAll(/^\((.+)\)[,;]?$/gm)].map(m => {
  const values = [...m[1].matchAll(/N?'((?:''|[^'])*)'|\bNULL\b/g)]
    .map(t => t[1] === undefined ? null : t[1].replace(/''/g, "'"));
  if (values.length !== fields.length) throw new Error('NhanVien seed row shape changed');
  return Object.fromEntries(fields.map((field, i) => [field, values[i]]));
});
const value = <T>(s: string): T => JSON.parse(JSON.stringify(runInNewContext(`(${s})`))) as T;
const body = () => readLessonFiles().find(f => f.slug === '2-6-distinct-bo-dong-trung')!.body;
const project = (keys: string[]) => people.map(p => keys.map(k => p[k]));
const uniqueSorted = (rows: (string | null)[][]) =>
  [...new Set(rows.map(r => JSON.stringify(r)))].sort().map(s => JSON.parse(s));

it('2.6 projects every profile before DISTINCT and sorts the six department codes afterward', () => {
  const flow = body().match(/<RunFlow query=\{`([\s\S]*?)`\} steps=\{([\s\S]*?)\} \/>/);
  expect(flow).not.toBeNull();
  const steps = value<{ clause: string; columns: string[]; rows: (string | null)[][]; total: number }[]>(flow![2]);
  expect(steps.map(s => [s.clause, s.total])).toEqual([
    ['FROM', people.length], ['SELECT', people.length], ['DISTINCT', 6], ['ORDER BY', 6],
  ]);
  expect(steps[1].columns).toEqual(['MaPB']);
  expect(steps[1].rows.length).toBeGreaterThan(new Set(steps[1].rows.map(r => r[0])).size);
  expect(steps[1].rows.every(r => project(['MaPB']).some(p => JSON.stringify(p) === JSON.stringify(r)))).toBe(true);
  const departments = uniqueSorted(project(['MaPB']));
  expect(steps[2].columns).toEqual(['MaPB']);
  expect([...steps[2].rows].sort()).toEqual(departments);
  expect(steps[3].rows).toEqual(departments);
  expect(flow![1]).toMatch(/^SELECT DISTINCT MaPB\s+FROM NhanVien\s+ORDER BY MaPB ASC;$/);
});

it('2.6 says adding a column changes what DISTINCT compares, with counts that match the seed', () => {
  expect(uniqueSorted(project(['MaPB', 'MaCD']))).toHaveLength(19);
  expect(uniqueSorted(project(['MaPB', 'MaCD', 'MaNV']))).toHaveLength(48);
  expect(body()).toContain('`19` cặp');
  expect(body()).toContain('ra `48` dòng');
  // Exercises 2-6-2 and 2-6-3 need both of these from the main section.
  expect(body()).toContain('cả dòng kết quả');
  expect(body()).toContain('Câu có `WHERE` thì `DISTINCT` chỉ xét các dòng đã lọc');
});
