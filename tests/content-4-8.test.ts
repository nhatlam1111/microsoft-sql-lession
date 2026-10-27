import { it, expect } from 'vitest';
import { runInNewContext } from 'node:vm';
import { attendanceFixture, attendanceQuery } from './helpers/attendance-fixture';
import { lessonExamples } from './helpers/window-fixture';
import { guardExercise } from '../src/lib/sql-guard';
const slug='4-8-doc-hieu-stored-procedure';
function modelBody(code='NV043') {
  const source=lessonExamples(slug).body.match(/<Sql\b[^>]*code=\{`(CREATE PROCEDURE[^`]+)`\}/)?.[1];
  const sql=source ? runInNewContext('`'+source+'`') as string : '';
  const body=sql.match(/BEGIN\s+(SELECT[\s\S]*?;)\s+END;/)?.[1];
  if (!body) expect.fail('Missing readable procedure body');
  return body.replaceAll('@MaNV',`'${code}'`).replaceAll('@TuNgay',"'20260901'").replaceAll('@DenNgay',"'20261001'");
}
it('the independent SELECTs show the filtered dates before counting eighteen rows',()=>{
  const l=lessonExamples(slug);expect(l.pairs.length).toBeGreaterThanOrEqual(2);
  for(const p of l.pairs){const q=attendanceQuery(p.sql);expect(q.columns).toEqual(p.columns);expect(q.rows).toHaveLength(p.total);expect(q.rows.slice(0,p.rows.length)).toEqual(p.rows);expect(guardExercise(p.sql)).toEqual({ok:true});}
  const detail=l.pairs.find(p=>p.columns.includes('Ngay'));
  const count=l.pairs.find(p=>p.columns.includes('SoNgayChamCong'));
  if(!detail||!count)expect.fail('Missing detail/count Result');
  expect(attendanceQuery(detail.sql).rows).toHaveLength(18);
  expect(count.rows).toEqual([['NV043',18]]);
  expect(attendanceQuery(detail.sql).rows.slice(0,3)).toEqual([['NV043','2026-09-07'],['NV043','2026-09-08'],['NV043','2026-09-09']]);
});
it('the displayed procedure body binds the employee and both dates rather than returning a fixed count',()=>{
  expect(attendanceQuery(modelBody()).rows).toEqual([['NV043',18]]);
  expect(attendanceQuery(modelBody('NV013')).rows).toEqual([['NV013',17]]);
});
it('the same body excludes the previous day, upper boundary and another employee',()=>{
  const f=attendanceFixture(),row=f.ChamCong.find(r=>r.MaNV==='NV043')!;
  const extra=[{...row,Ngay:'2026-08-31'},{...row,Ngay:'2026-10-01'},{...row,MaNV:'NV013',Ngay:'2026-09-20'}];
  expect(attendanceQuery(modelBody(),{ChamCong:[...f.ChamCong,...extra]}).rows).toEqual([['NV043',18]]);
});
