import { it, expect } from 'vitest';
import { runInNewContext } from 'node:vm';
import { readLessonFiles } from './helpers/lessons';

// A lost filter or an early replacement would make the diagram keep the wrong profiles.
// This checks the lesson's rendered data contract, not SQL Server execution.
it('2.5 filters the two NULL emails before replacing their display values', () => {
  const body = readLessonFiles().find(f => f.slug === '2-5-null-o-trong')!.body;
  const flow = body.match(/<RunFlow query=\{`([\s\S]*?)`\} steps=\{([\s\S]*?)\} \/>/);
  expect(flow).not.toBeNull();
  const steps = runInNewContext(`(${flow![2]})`) as {
    clause: string; columns: string[]; rows: unknown[][]; total: number;
  }[];
  expect(steps.map(s => [s.clause, s.total])).toEqual([
    ['FROM', 48], ['WHERE', 2], ['SELECT', 2], ['ORDER BY', 2],
  ]);
  const email = steps[1].columns.indexOf('Email');
  const id = steps[1].columns.indexOf('MaNV');
  expect(email).toBeGreaterThanOrEqual(0);
  expect(steps[1].rows.map(r => [r[id], r[email]]).sort()).toEqual([
    ['NV044', null], ['NV045', null],
  ]);
  const expected = [
    ['NV044', 'Lã Thị Oanh', 'VH', '(chưa có)'],
    ['NV045', 'Ung Văn Lực', 'KD', '(chưa có)'],
  ];
  expect(steps[2].rows).toEqual(expected);
  expect(steps[3].rows).toEqual(expected);
  const results = [...body.matchAll(/<Result columns=\{(\[[\s\S]*?\])\} rows=\{(\[[\s\S]*?\])\}[^>]*\/>/g)];
  expect(results.some(m => JSON.stringify(runInNewContext(`(${m[2]})`)) === JSON.stringify(expected))).toBe(true);
});
