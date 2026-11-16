import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { lessonMainSection, readLessonFiles } from './helpers/lessons';

// Both chosen columns determine whether a projected row is a duplicate.
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

it('2.6 projects every profile before DISTINCT and sorts the unique department and job pairs afterward', () => {
  const flow = body().match(/<AnimatedFlow query=\{`([\s\S]*?)`\} steps=\{([\s\S]*?)\} animation="2-6-distinct" \/>/);
  expect(flow).not.toBeNull();
  const steps = value<{ clause: string; columns: string[]; rows: (string | null)[][]; total: number }[]>(flow![2]);
  const columns = ['MaPB', 'MaCD'];
  const projected = project(columns);
  const pairs = uniqueSorted(projected);
  expect(steps.map(s => [s.clause, s.total])).toEqual([
    ['FROM', people.length], ['SELECT', people.length], ['DISTINCT', pairs.length], ['ORDER BY', pairs.length],
  ]);
  expect(steps.slice(1).map(step => step.columns)).toEqual([columns, columns, columns]);
  const profileColumns = steps[0].columns;
  expect(steps[1].rows).toEqual(steps[0].rows.map(row => columns.map(c => row[profileColumns.indexOf(c)])));
  expect(steps[2].rows).toEqual(expect.arrayContaining([['KD', 'CV'], ['KD', 'CVC']]));
  expect(steps[2].rows).toHaveLength(uniqueSorted(steps[2].rows).length);
  expect(pairs).toEqual(expect.arrayContaining(steps[2].rows));
  expect(steps[3].rows).toEqual(pairs.slice(0, steps[3].rows.length));
  const results = body().match(/<Result columns=\{(\[[^\n]+\])\} rows=\{(\[[\s\S]*?\])\} total=\{(\d+)\}/);
  expect(results).not.toBeNull();
  expect(value(results![1])).toEqual(columns);
  expect(value(results![2])).toEqual(steps[3].rows);
  expect(Number(results![3])).toBe(pairs.length);
  expect(flow![1]).toMatch(/^SELECT DISTINCT MaPB, MaCD\s+FROM NhanVien\s+ORDER BY MaPB ASC, MaCD ASC;$/);
});

it('2.6 shows how choosing fewer or more columns changes the result', () => {
  const departmentCount = uniqueSorted(project(['MaPB'])).length;
  const profileCount = uniqueSorted(project(['MaPB', 'MaCD', 'MaNV'])).length;
  expect(body()).toContain('`' + departmentCount + '` mã phòng');
  expect(body()).toContain('`' + profileCount + '` dòng');

  // Keep the exercise prerequisites visible in the lesson's application section.
  const application = lessonMainSection(body()).split('### Vận dụng trên cùng tình huống')[1];
  expect(application).toBeDefined();
  expect(application).toContain('`MaPB`');
  expect(application).toMatch(/`WHERE`[^\n]*`IN`[^\n]*`IS NOT NULL`/);
  expect(application).toMatch(/`ORDER BY`[^\n]*`ASC`[^\n]*`DESC`/);
});
