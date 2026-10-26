import { it, expect } from 'vitest';
import { existsSync,readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { fixtureQuery,lessonExamples } from './helpers/window-fixture';
import { seedRows } from './helpers/hrm-seed';
import { checkFlow,splitFocus } from '../src/lib/run-flow';
import { guardExercise } from '../src/lib/sql-guard';
const slug='4-3-luy-ke-so-thang-truoc';
it('4.3 aggregates months before windows and preserves first-row NULLs and negative change',()=>{
  const l=lessonExamples(slug);
  expect(l.pairs.length).toBeGreaterThanOrEqual(2);
  expect(l.steps.map(s=>[s.clause,s.total])).toEqual([['FROM',3],['SELECT',3],['ORDER BY',3]]);
  expect(checkFlow(l.steps,l.query)).toEqual([]);
  for(const p of [...l.pairs,...l.steps]){
    expect(guardExercise(p.sql)).toEqual({ok:true});const got=fixtureQuery(p.sql);
    expect(got.columns).toEqual(p.columns);expect(got.rows).toHaveLength(p.total!);
    expect(got.rows.slice(0,p.rows.length)).toEqual(p.rows);
  }
  expect(fixtureQuery(l.query).rows).toEqual([
    ['2026-08-31',14,14,null,null],['2026-09-30',20,34,14,6],['2026-10-31',11,45,20,-9],
  ]);
  expect(splitFocus(l.query,l.steps[2].focus)?.focus).toBe('ORDER BY ss.Thang ASC;');
});
it('4.3 LAG uses the preceding available row without inventing a missing calendar month',()=>{
  const l=lessonExamples(slug);expect(l.query.length).toBeGreaterThan(0);
  const withoutSeptember=seedRows('DonNghiPhep').filter(r=>!String(r.TuNgay).startsWith('2026-09'));
  expect(fixtureQuery(l.query,{DonNghiPhep:withoutSeptember}).rows).toEqual([
    ['2026-08-31',14,14,null,null],['2026-10-31',11,25,14,-3],
  ]);
});
it('4.3 exercises reset cumulative sums per type and filter the displayed month after window calculation',()=>{
  const path=`src/content/exercises/${slug}.yaml`;expect(existsSync(path)).toBe(true);if(!existsSync(path))return;
  const es=parse(readFileSync(path,'utf8')).exercises;expect(es).toHaveLength(3);
  for(const e of es){expect(guardExercise(e.answer)).toEqual({ok:true});expect(fixtureQuery(e.answer).columns).toEqual(e.columns);}
  expect(fixtureQuery(es[0].answer).rows).toEqual([
    ['2026-08-31',12,12],['2026-09-30',12,24],['2026-10-31',10,34],
  ]);
  expect(fixtureQuery(es[1].answer).rows).toEqual([
    ['Nghỉ ốm','2026-08-31',2,2],['Nghỉ ốm','2026-09-30',5,7],
    ['Phép năm','2026-08-31',12,12],['Phép năm','2026-09-30',12,24],['Phép năm','2026-10-31',10,34],
    ['Việc riêng','2026-09-30',3,3],['Việc riêng','2026-10-31',1,4],
  ]);
  expect(fixtureQuery(es[2].answer).rows).toEqual([['2026-10-31',11,45,20,-9]]);
});
