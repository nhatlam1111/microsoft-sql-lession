import { it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { attendanceFixture, attendanceQuery } from './helpers/attendance-fixture';
import { lessonExamples } from './helpers/window-fixture';
import { guardExercise } from '../src/lib/sql-guard';
const slug = '4-7-doi-soat-cham-cong-luong';
function main() {
  const p = lessonExamples(slug).pairs.find(p => p.columns.includes('ChenhLech'));
  if (!p) expect.fail('Missing reconciliation query/Result');
  return p;
}
function exercises() {
  const path = `src/content/exercises/${slug}.yaml`;
  expect(existsSync(path)).toBe(true);
  return parse(readFileSync(path, 'utf8')).exercises;
}
it('models the source attendance population and the day totals needed for reconciliation', () => {
  const f = attendanceFixture();
  expect(f.ChamCong).toHaveLength(806);
  expect(new Set(f.ChamCong.map(r => r.MaNV)).size).toBe(43);
  expect(f.BangLuong).toHaveLength(43);
  expect(attendanceQuery("SELECT MaNV, COUNT(*) AS n FROM ChamCong WHERE MaNV IN ('NV013', 'NV032', 'NV043') GROUP BY MaNV ORDER BY MaNV").rows).toEqual([['NV013',17],['NV032',18],['NV043',18]]);
});
it('the illustrated queries retain their source counts and flag only the two normalized differences', () => {
  const l = lessonExamples(slug);
  expect(l.pairs.length).toBeGreaterThanOrEqual(5);
  for (const p of l.pairs) {
    const q = attendanceQuery(p.sql);
    expect(q.columns).toEqual(p.columns); expect(q.rows).toHaveLength(p.total);
    expect(q.rows.slice(0,p.rows.length)).toEqual(p.rows);
    expect(guardExercise(p.sql)).toEqual({ok:true});
  }
  expect(main().rows).toEqual([['NV013',17,2,19,20,1],['NV032',18,0,18,19,1]]);
});
it('the three exercises return all keys and the values from the correct EXCEPT side', () => {
  const es = exercises(); expect(es).toHaveLength(3);
  const all = attendanceQuery(es[0].answer);
  expect(all.rows).toHaveLength(43);
  expect(all.rows.reduce((n,r)=>n+Number(r[1]),0)).toBe(806);
  expect(all.rows.reduce((n,r)=>n+Number(r[2]),0)).toBe(11);
  expect(all.rows.reduce((n,r)=>n+Number(r[3]),0)).toBe(817);
  expect(all.rows.reduce((n,r)=>n+Number(r[4]),0)).toBe(819);
  expect(all.rows.find(r=>r[0]==='NV043')).toEqual(['NV043',18,2,20,20,0]);
  expect(attendanceQuery(es[1].answer).rows).toEqual([['NV013',20],['NV032',19]]);
  expect(attendanceQuery(es[2].answer).rows).toEqual([['NV013',19],['NV032',18]]);
  for (const e of es) {
    expect(guardExercise(e.answer)).toEqual({ok:true});
    expect(attendanceQuery(e.answer).columns).toEqual(e.columns);
    for (const p of lessonExamples(slug).pairs) expect(attendanceQuery(p.sql).rows).not.toEqual(attendanceQuery(e.answer).rows);
  }
});
it('FULL JOIN keeps absent sides as NULL and does not turn a present zero into absence', () => {
  const f = attendanceFixture(), sql = main().sql;
  expect(attendanceQuery(sql,{BangLuong:f.BangLuong.filter(r=>r.MaNV!=='NV013')}).rows.find(r=>r[0]==='NV013')).toEqual(['NV013',17,2,19,null,null]);
  expect(attendanceQuery(sql,{ChamCong:f.ChamCong.filter(r=>r.MaNV!=='NV043'),DonNghiPhep:f.DonNghiPhep.filter(r=>r.MaNV!=='NV043')}).rows.find(r=>r[0]==='NV043')).toEqual(['NV043',null,null,null,20,null]);
  const demo = lessonExamples(slug).pairs.find(p=>p.columns.includes('CongA'));
  if (!demo) expect.fail('Missing FULL JOIN illustration');
  expect(attendanceQuery(demo.sql.replace("'NV046', 12", "'NV046', 0")).rows.find(r=>r[0]==='NV046')).toEqual(['NV046',null,0]);
  const otherMonth = {...f.BangLuong.find(r=>r.MaNV==='NV013')!,KyLuong:'2026-08',NgayCongThucTe:99};
  expect(attendanceQuery(sql,{BangLuong:[...f.BangLuong,otherMonth]}).rows).toEqual(main().rows);
});
it('the calendar counts approved paid dates inside September once, including the cross-month form', () => {
  const f = attendanceFixture(), sql = main().sql;
  const pending = f.DonNghiPhep.map(r=>r.MaDon==='DP018'?{...r,TrangThai:'Chờ duyệt'}:r);
  expect(attendanceQuery(sql,{DonNghiPhep:pending}).rows.find(r=>r[0]==='NV043')).toEqual(['NV043',18,0,18,20,2]);
  const overlap = {...f.DonNghiPhep.find(r=>r.MaDon==='DP018')!,MaDon:'DP999',TuNgay:'2026-09-03',DenNgay:'2026-09-04',SoNgay:2};
  expect(attendanceQuery(sql,{DonNghiPhep:[...f.DonNghiPhep,overlap]}).rows).toEqual(main().rows);
  const outside = {...overlap,MaDon:'DP998',TuNgay:'2026-10-01',DenNgay:'2026-10-02'};
  expect(attendanceQuery(sql,{DonNghiPhep:[...f.DonNghiPhep,outside]}).rows).toEqual(main().rows);
});
it('the actual EXCEPT illustration removes duplicate pairs and matching NULL pairs', () => {
  const p = lessonExamples(slug).pairs.find(p=>p.columns.length===2 && /FROM A\s+EXCEPT/.test(p.sql));
  if (!p) expect.fail('Missing EXCEPT illustration');
  const mutated = p.sql.replace("UNION ALL SELECT 'NV043', 20", "UNION ALL SELECT 'NV043', 20\n UNION ALL SELECT 'NV013', 19\n UNION ALL SELECT 'NV099', NULL").replace("UNION ALL SELECT 'NV046', 12", "UNION ALL SELECT 'NV046', 12\n UNION ALL SELECT 'NV099', NULL");
  expect(attendanceQuery(mutated).rows).toEqual([['NV013',19],['NV043',20]]);
});
