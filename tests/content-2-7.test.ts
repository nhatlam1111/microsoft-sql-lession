import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { parse } from 'yaml';
import { readLessonFiles } from './helpers/lessons';

const slug = '2-7-ham-chuoi-tieng-viet';
const value = <T>(source: string): T => JSON.parse(JSON.stringify(runInNewContext(`(${source})`)));
const lesson = () => readLessonFiles().find(f => f.slug === slug)!;

// The seed is an independent source for displayed rows. This is not T-SQL execution.
function people() {
  const seed = readFileSync('database/HRM_Demo.sql', 'utf8');
  const insert = seed.match(/INSERT INTO dbo\.NhanVien \(([^)]+)\) VALUES\s*([\s\S]*?);/)!;
  const columns = insert[1].split(',').map(c => c.trim());
  return [...insert[2].matchAll(/^\((.+)\)[,;]?$/gm)].map(m => {
    const values = [...m[1].matchAll(/N?'((?:''|[^'])*)'|\bNULL\b/g)]
      .map(t => t[1] === undefined ? null : t[1].replace(/''/g, "'"));
    expect(values).toHaveLength(columns.length);
    return Object.fromEntries(columns.map((c, i) => [c, values[i]]));
  }).sort((a, b) => a.MaNV!.localeCompare(b.MaNV!));
}

describe('2.7 string projections preserve identity and source values', () => {
  it('shows every current IT record as a code + full-name signing label', () => {
    const body = lesson().body;
    const flow = body.match(/<RunFlow query=\{`([\s\S]*?)`\} steps=\{([\s\S]*?)\} \/>/);
    expect(flow).not.toBeNull();
    const steps = value<{ clause: string; columns: string[]; rows: unknown[][]; total: number }[]>(flow![2]);
    const source = people();
    const itPeople = source.filter(p => p.MaPB === 'IT');
    const expected = itPeople.map(p => [p.MaNV, `${p.MaNV} - ${p.HoTen}`]);
    expect(itPeople.map(p => p.MaNV)).toEqual([
      'NV007', 'NV011', 'NV017', 'NV021', 'NV029', 'NV035', 'NV039', 'NV043', 'NV046', 'NV048',
    ]);
    expect(steps.map(s => [s.clause, s.total])).toEqual([
      ['FROM', 48], ['WHERE', 10], ['SELECT', 10], ['ORDER BY', 10],
    ]);
    for (const step of steps.slice(0, 2)) {
      const id = step.columns.indexOf('MaNV');
      const name = step.columns.indexOf('HoTen');
      const department = step.columns.indexOf('MaPB');
      expect(Math.min(id, name, department)).toBeGreaterThanOrEqual(0);
      for (const row of step.rows) {
        const p = source.find(p => p.MaNV === row[id])!;
        expect([row[name], row[department]]).toEqual([p.HoTen, p.MaPB]);
        if (step.clause === 'WHERE') expect(p.MaPB).toBe('IT');
      }
    }
    expect(steps[2].rows).toEqual(expected);
    expect(steps[3].rows).toEqual(expected);
    const results = [...body.matchAll(/<Result columns=\{(\[[\s\S]*?\])\} rows=\{(\[[\s\S]*?\])\}[^>]*\/>/g)];
    expect(results.some(m => JSON.stringify(value(m[2])) === JSON.stringify(expected))).toBe(true);
  });

  it('keeps illustrative slicing, trailing-space length and NULL concatenation outputs exact', () => {
    const results = [...lesson().body.matchAll(/<Result columns=\{(\[[\s\S]*?\])\} rows=\{(\[[\s\S]*?\])\}[^>]*\/>/g)]
      .map(m => value<unknown[][]>(m[2]));
    expect(results).toContainEqual([['NV', '007', '007', 5, 5]]);
    expect(results).toContainEqual([['Kế  toán', 8, 'KẾ TOÁN', 'it', '[]']]);
    expect(results).toContainEqual([['NV003', 'Nguyễn Thu Hà']]);
  });

  it('provides three distinct ordered query exercises, including a preserved source NULL', () => {
    const file = parse(readFileSync(`src/content/exercises/${slug}.yaml`, 'utf8')) as {
      lesson: string; exercises: { id: string; kind: string; ordered: boolean; columns: string[]; answer: string }[];
    };
    expect(file.lesson).toBe(slug);
    expect(file.exercises.map(e => [e.id, e.kind, e.ordered])).toEqual([
      ['2-7-1', 'query', true], ['2-7-2', 'query', true], ['2-7-3', 'query', true],
    ]);
    expect(file.exercises.map(e => e.columns)).toEqual([
      ['MaNV', 'DauMa', 'PhanSo'], ['MaNV', 'HoTen', 'DoDai'], ['MaNV', 'Email', 'NhanEmail'],
    ]);
    for (const e of file.exercises) {
      expect(e.answer).toMatch(/^SELECT\b/);
      expect(e.answer).toMatch(/ORDER BY MaNV ASC;/);
      expect(e.answer).not.toMatch(/\b(INSERT|UPDATE|DELETE|INTO)\b/i);
      expect(lesson().body.replace(/\s+/g, ' ')).not.toContain(e.answer.replace(/\s+/g, ' ').trim());
    }
    expect(file.exercises[0].answer).toMatch(/LEFT\(MaNV, 2\)[\s\S]*SUBSTRING\(MaNV, 3, 3\)[\s\S]*MaPB = 'KT'/);
    expect(file.exercises[1].answer).toMatch(/LEN\(HoTen\)[\s\S]*HoTen COLLATE Vietnamese_CI_AI LIKE N'ho%'/);
    expect(file.exercises[2].answer).toMatch(/MaNV, Email, CONCAT\(N'\[', UPPER\(Email\), N'\]'\)[\s\S]*MaPB = 'VH'/);
    const source = people();
    expect(source.filter(p => p.MaPB === 'KT')).toHaveLength(7);
    const matches = source.filter(p => p.HoTen!.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().startsWith('ho'));
    expect(matches.map(p => [p.MaNV, p.HoTen, p.HoTen!.length])).toEqual([
      ['NV004', 'Hoàng Minh Tuấn', 15], ['NV014', 'Hồ Thị Bích', 11],
    ]);
    const labels = source.filter(p => p.MaPB === 'VH').map(p => [p.MaNV, p.Email, `[${p.Email?.toUpperCase() ?? ''}]`]);
    expect(labels).toHaveLength(10);
    expect(labels.find(r => r[0] === 'NV044')).toEqual(['NV044', null, '[]']);
    expect(labels.filter(r => r[1] === null)).toHaveLength(1);
    expect(labels.some(r => r[1] !== null && r[2] !== `[${r[1]}]`)).toBe(true);
  });
});
