import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

// Source-backed checks of whether a common wrong approach changes the result.
// Live T-SQL/API verification is recorded separately; this does not emulate SQL Server.
const seed = readFileSync('database/HRM_Demo.sql', 'utf8')
  .match(/INSERT INTO dbo\.NhanVien[\s\S]*?VALUES\s*([\s\S]*?);/)![1];
const people = [...seed.matchAll(/^\((.+)\)[,;]?$/gm)].map(m => {
  const cells = [...m[1].matchAll(/N?'((?:''|[^'])*)'|\bNULL\b/g)]
    .map(x => x[1] === undefined ? null : x[1].replace(/''/g, "'"));
  return { id: cells[0], name: cells[1]!, email: cells[5], hired: cells[6]!, department: cells[8] };
});
const exercise = (slug: string, id: string) => parse(readFileSync(`src/content/exercises/${slug}.yaml`, 'utf8'))
  .exercises.find((e: { id: string }) => e.id === id);

it('2.3 wildcard practice distinguishes exactly one character from any suffix', () => {
  const e = exercise('2-3-and-or-in-between-like', '2-3-4');
  const pattern = e.answer.match(/HoTen LIKE N'([^']+)'/)?.[1];
  expect(pattern, 'use names with different lengths so _ is observable').toBeDefined();
  const matches = (p: string) => people.filter(person =>
    new RegExp('^' + p.replaceAll('%', '.*').replaceAll('_', '.') + '$', 'iu').test(person.name))
    .map(p => p.id);
  expect(pattern).toContain('_');
  expect(matches(pattern!)).not.toEqual(matches(pattern!.replaceAll('_', '%')));
});

it('2.5 non-NULL practice selects a scope containing both present and missing email', () => {
  const e = exercise('2-5-null-o-trong', '2-5-2');
  const department = e.answer.match(/MaPB = '([^']+)'/)![1];
  const scoped = people.filter(p => p.department === department);
  expect(scoped.some(p => p.email === null), 'omitting IS NOT NULL must lose correctness').toBe(true);
  expect(scoped.some(p => p.email !== null)).toBe(true);
  expect(e.answer).toContain('Email IS NOT NULL');
});

it('2.5 label practice selects a scope containing both present and missing email', () => {
  const e = exercise('2-5-null-o-trong', '2-5-3');
  const department = e.answer.match(/MaPB = '([^']+)'/)![1];
  const scoped = people.filter(p => p.department === department);
  expect(department, 'the lesson statement already covers VH').not.toBe('VH');
  expect(scoped.some(p => p.email === null), 'omitting COALESCE must lose correctness').toBe(true);
  expect(scoped.some(p => p.email !== null), 'a fixed label must lose correctness').toBe(true);
  expect(e.answer).toContain('COALESCE(Email');
});

it('2.9 anniversary practice includes a profile exactly on the three-year boundary', () => {
  const e = exercise('2-9-case-when-ham-if', '2-9-2');
  const cutoff = e.answer.match(/DATEADD\(year, 3, NgayVaoLam\) <= '(\d{8})'/)![1];
  const department = e.answer.match(/MaPB = '([^']+)'/)![1];
  const anniversary = (p: typeof people[number]) =>
    String(Number(p.hired.slice(0, 4)) + 3) + p.hired.slice(5).replaceAll('-', '');
  expect(people.some(p => p.department === department && anniversary(p) === cutoff),
    'using < instead of <= must change a label on the sample').toBe(true);
});
