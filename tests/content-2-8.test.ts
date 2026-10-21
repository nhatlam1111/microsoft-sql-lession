import { it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { parse } from 'yaml';
import { readLessonFiles } from './helpers/lessons';
import { checkFlow, type FlowStep } from '../src/lib/run-flow';

// INSERT values are tokenized as data, never evaluated as JavaScript or SQL.
function seedRows(table: string): Record<string, string | number | null>[] {
  const seed = readFileSync('database/HRM_Demo.sql', 'utf8');
  const insert = seed.match(new RegExp(`INSERT INTO dbo\\.${table} \\(([^)]+)\\) VALUES\\s*([\\s\\S]*?);`))!;
  const columns = insert[1].split(',').map(c => c.trim());
  return [...insert[2].matchAll(/^\((.*)\)[,;]?$/gm)].map(row => {
    const values = [...row[1].matchAll(/N?'((?:''|[^'])*)'|\bNULL\b|-?\d+(?:\.\d+)?/g)]
      .map(v => v[1] !== undefined ? v[1].replace(/''/g, "'") : v[0] === 'NULL' ? null : Number(v[0]));
    expect(values.length).toBe(columns.length);
    return Object.fromEntries(columns.map((c, i) => [c, values[i]]));
  });
}

const literal = <T>(source: string): T => JSON.parse(JSON.stringify(runInNewContext(`(${source})`)));
const dayDistance = (start: string, end: string) => (Date.parse(end) - Date.parse(start)) / 86_400_000;

// Removing a date bound, calculating days from the wrong date, or sorting by ID first
// must change this source-backed result contract. It does not claim T-SQL execution.
it('2.8 filters contract rows at the fixed inclusive horizon before calculating and sorting dates', () => {
  const contracts = seedRows('HopDong');
  const body = readLessonFiles().find(f => f.slug === '2-8-ham-ngay-tham-nien')!.body;
  const flow = body.match(/<RunFlow query=\{`([\s\S]*?)`\} steps=\{([\s\S]*?)\} \/>/);
  expect(flow).not.toBeNull();
  const steps = literal<FlowStep[]>(flow![2]);
  expect(checkFlow(steps, flow![1])).toEqual([]);
  expect(contracts).toHaveLength(55);
  const chosen = contracts.filter(c => typeof c.NgayKetThuc === 'string'
    && c.NgayKetThuc >= '2026-10-21' && c.NgayKetThuc <= '2026-11-20');
  const project = (c: Record<string, string | number | null>) => [c.MaHD, c.MaNV, c.NgayBatDau, c.NgayKetThuc];
  const expected = chosen.map(c => [...project(c), dayDistance('2026-10-21', c.NgayKetThuc as string)])
    .sort((a, b) => String(a[3]).localeCompare(String(b[3])) || String(a[0]).localeCompare(String(b[0])));
  expect(expected).toEqual([
    ['HD2025-014', 'NV025', '2025-11-01', '2026-10-31', 10],
    ['HD2026-004', 'NV046', '2026-09-14', '2026-11-13', 23],
    ['HD2024-008', 'NV036', '2024-11-15', '2026-11-14', 24],
  ]);
  expect(steps.map(s => [s.clause, s.total])).toEqual([
    ['FROM', 55], ['WHERE', 3], ['SELECT', 3], ['ORDER BY', 3],
  ]);
  expect(steps[0].columns).toEqual(['MaHD', 'MaNV', 'NgayBatDau', 'NgayKetThuc']);
  expect(steps[1].columns).toEqual(steps[0].columns);
  expect(steps[2].columns).toEqual([...steps[0].columns, 'SoNgayConLai']);
  expect(steps[3].columns).toEqual(steps[2].columns);
  for (const row of steps[0].rows) expect(row).toEqual(project(contracts.find(c => c.MaHD === row[0])!));
  expect(steps[1].rows).toEqual(chosen.map(project));
  expect(steps[2].rows).toEqual(chosen.map(c => [...project(c), dayDistance('2026-10-21', c.NgayKetThuc as string)]));
  expect(steps[3].rows).toEqual(expected);
  const results = [...body.matchAll(/<Result columns=\{(\[[\s\S]*?\])\} rows=\{(\[[\s\S]*?\])\}[^>]*\/>/g)];
  expect(results.some(r => JSON.stringify(literal(r[1])) === JSON.stringify(steps[3].columns)
    && JSON.stringify(literal(r[2])) === JSON.stringify(expected))).toBe(true);
  expect(flow![1]).toMatch(/NgayKetThuc >= CAST\('20261021' AS date\)/);
  expect(flow![1]).toMatch(/NgayKetThuc <= DATEADD\(day, 30, CAST\('20261021' AS date\)\)/);
  expect(flow![1]).toMatch(/DATEDIFF\(day, CAST\('20261021' AS date\), NgayKetThuc\)/);
  expect(flow![1]).toMatch(/ORDER BY NgayKetThuc ASC, MaHD ASC;/);
  expect(flow![1]).not.toMatch(/GETDATE|JOIN|Luong|SELECT\s+\*/i);
});

it('2.8 provides three reproducible ordered practice queries with distinct result contracts', () => {
  expect(existsSync('src/content/exercises/2-8-ham-ngay-tham-nien.yaml')).toBe(true);
  const file = parse(readFileSync('src/content/exercises/2-8-ham-ngay-tham-nien.yaml', 'utf8'));
  expect(file.exercises.map((e: { id: string; ordered: boolean; columns: string[] }) => [e.id, e.ordered, e.columns])).toEqual([
    ['2-8-1', true, ['MaNV', 'HoTen', 'NgaySinh']],
    ['2-8-2', true, ['MaNV', 'NgayVaoLam', 'MocMotNam']],
    ['2-8-3', true, ['MaHD', 'MaNV', 'NgayKetThuc', 'SoNgayConLai']],
  ]);
  for (const e of file.exercises) {
    expect(e.kind).toBe('query');
    expect(e.answer).not.toMatch(/GETDATE|JOIN|Luong|SELECT\s+\*/i);
    expect(e.answer).toMatch(/ORDER BY/);
  }
  const people = seedRows('NhanVien');
  expect(people.filter(p => String(p.NgaySinh).slice(5, 7) === '11').map(p => p.MaNV)).toEqual(['NV005', 'NV019', 'NV032', 'NV043']);
  expect(people.filter(p => p.TrangThai === 'Đang làm' && String(p.NgayVaoLam) > '2025-10-21' && String(p.NgayVaoLam) <= '2026-10-21').map(p => p.MaNV))
    .toEqual(['NV045', 'NV046', 'NV047', 'NV048']);
  expect(seedRows('HopDong').filter(c => typeof c.NgayKetThuc === 'string' && c.NgayKetThuc > '2026-10-21' && c.NgayKetThuc <= '2026-10-31').map(c => c.MaHD))
    .toEqual(['HD2025-014']);
});
