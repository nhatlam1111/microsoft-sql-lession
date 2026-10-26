import { it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { fixtureQuery, lessonExamples } from './helpers/window-fixture';
import { pivotFixtureQuery } from './helpers/pivot-fixture';
import { guardExercise } from '../src/lib/sql-guard';
const slug='4-4-pivot-xoay-bang';
const run=(s:string)=>/\bPIVOT\b/i.test(s)?pivotFixtureQuery(s):fixtureQuery(s);
it('the restricted PIVOT arithmetic model retains groups and COUNT zeroes with a non-null key',()=>{
  const result=pivotFixtureQuery(`WITH Nguon AS (
SELECT LoaiNghi, TrangThai, MaDon FROM DonNghiPhep
)
SELECT p.LoaiNghi, p.[Đã duyệt] AS DaDuyet, p.[Chờ duyệt] AS ChoDuyet, p.[Từ chối] AS TuChoi
FROM Nguon
PIVOT (COUNT(MaDon) FOR TrangThai IN ([Đã duyệt], [Chờ duyệt], [Từ chối])) AS p
ORDER BY p.LoaiNghi;`);
  expect(result.rows).toEqual([['Nghỉ ốm',4,0,0],['Phép năm',8,3,1],['Việc riêng',2,1,1]]);
});
it('4.4 day totals preserve missing combinations and the CASE alternative has identical values',()=>{
  const l=lessonExamples(slug);
  expect(l.pairs.length).toBeGreaterThanOrEqual(3);
  const main=l.pairs.find(p=>/\bPIVOT\b/.test(p.sql))!;
  const expected=[['2026-08-31',12,2,null],['2026-09-30',12,5,3],['2026-10-31',10,null,1]];
  expect(main.rows).toEqual(expected);
  expect(pivotFixtureQuery(main.sql).rows).toEqual(expected);
  expect(pivotFixtureQuery(main.sql).sourceColumns).toEqual(['Thang','LoaiNghi','SoNgay']);
  for(const p of l.pairs){
    const result=run(p.sql);expect(result.columns).toEqual(p.columns);expect(result.rows).toHaveLength(p.total);
    expect(result.rows.slice(0,p.rows.length)).toEqual(p.rows);expect(guardExercise(p.sql)).toEqual({ok:true});
  }
  const caseQuery=l.pairs.find(p=>/SUM\(CASE/.test(p.sql))!;
  expect(fixtureQuery(caseQuery.sql).rows).toEqual(expected);
  const extra=main.sql.replace('SELECT EOMONTH(TuNgay)', 'SELECT MaDon, EOMONTH(TuNgay)');
  expect(pivotFixtureQuery(extra).rows).toHaveLength(20);
});
it('4.4 practice changes the population, COUNT measure and monthly axis without copying an illustration',()=>{
  const path=`src/content/exercises/${slug}.yaml`;expect(existsSync(path)).toBe(true);if(!existsSync(path))return;
  const es=parse(readFileSync(path,'utf8')).exercises;expect(es).toHaveLength(3);
  for(const e of es){expect(guardExercise(e.answer)).toEqual({ok:true});expect(run(e.answer).columns).toEqual(e.columns);}
  expect(run(es[0].answer).rows).toEqual([['2026-08-31',12,2,null],['2026-09-30',9,5,2]]);
  expect(run(es[1].answer).rows).toEqual([['Nghỉ ốm',4,0,0],['Phép năm',8,3,1],['Việc riêng',2,1,1]]);
  expect(run(es[2].answer).rows).toEqual([['Nghỉ ốm',2,5],['Phép năm',12,12],['Việc riêng',null,3]]);
  for(const p of lessonExamples(slug).pairs)for(const e of es){
    const a=run(p.sql).rows,b=run(e.answer).rows;
    if(a.length===b.length&&a[0]?.length===b[0]?.length)expect(a).not.toEqual(b);
  }
});
