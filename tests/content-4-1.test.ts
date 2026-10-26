import { it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { fixtureQuery, lessonExamples } from './helpers/window-fixture';
import { checkFlow, splitFocus } from '../src/lib/run-flow';
import { guardExercise } from '../src/lib/sql-guard';

const slug = '4-1-cte-tung-buoc';
it('4.1 keeps the exact-threshold type after aggregation, and returns only the requested two columns', () => {
  const l = lessonExamples(slug);
  expect(l.results.find(r => r.columns.join(',') === 'LoaiNghi,TongNgay')?.rows).toEqual([['Phép năm',9],['Nghỉ ốm',5]]);
  expect(l.steps.map(s => [s.clause,s.total])).toEqual([['FROM',3],['WHERE',2],['SELECT',2],['ORDER BY',2]]);
  expect(checkFlow(l.steps,l.query)).toEqual([]);
  expect(l.pairs.length).toBeGreaterThanOrEqual(2);
  for (const p of [...l.pairs,...l.steps]) {
    const actual = fixtureQuery(p.sql);
    expect(actual.columns).toEqual(p.columns);
    expect(actual.rows).toHaveLength(p.total!);
    expect(actual.rows.slice(0,p.rows.length)).toEqual(p.rows);
    expect(guardExercise(p.sql)).toEqual({ok:true});
  }
  const focus = splitFocus(l.query,l.steps[2].focus)!;
  expect(focus.before).toContain('TongTheoLoai AS');
  expect(focus.focus).toContain('SELECT tl.');
});
it('4.1 exercises distinguish a sum of days, active profile counts, and repeated contracts', () => {
  const path = `src/content/exercises/${slug}.yaml`;
  expect(existsSync(path)).toBe(true);
  if (!existsSync(path)) return;
  const es = parse(readFileSync(path,'utf8')).exercises;
  expect(es).toHaveLength(3);
  const rows = es.map((e: {answer:string, columns:string[]}) => {
    expect(guardExercise(e.answer)).toEqual({ok:true});
    const result=fixtureQuery(e.answer); expect(result.columns).toEqual(e.columns); return result.rows;
  });
  expect(rows[0]).toEqual([['Phép năm',12],['Nghỉ ốm',2]]);
  expect(rows[1]).toEqual([['IT',10],['KD',13],['VH',8]]);
  expect(rows[2]).toHaveLength(7);
  expect(rows[2]).toContainEqual(['NV021',3]);
  expect(rows[2]).toContainEqual(['NV030',3]);
});
