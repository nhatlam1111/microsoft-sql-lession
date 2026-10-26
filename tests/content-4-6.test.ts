import { it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { seedRows, type SeedRow } from './helpers/hrm-seed';
import { fixtureQuery, lessonExamples } from './helpers/window-fixture';
import { guardExercise } from '../src/lib/sql-guard';
const slug='4-6-soi-chat-luong-du-lieu';
const exercises=()=>{const path=`src/content/exercises/${slug}.yaml`;expect(existsSync(path)).toBe(true);return existsSync(path)?parse(readFileSync(path,'utf8')).exercises:[];};
it('4.6 flags duplicate groups, missing contacts and reversed contract dates in the source fixture',()=>{
  const l=lessonExamples(slug);expect(l.pairs).toHaveLength(3);
  for(const p of l.pairs){const q=fixtureQuery(p.sql);expect(q.columns).toEqual(p.columns);expect(q.rows).toEqual(p.rows);expect(q.rows).toHaveLength(p.total);expect(guardExercise(p.sql)).toEqual({ok:true});}
  const [dup,email,dates]=l.pairs;if(!dup)return;
  const groups=new Map<string,number>();for(const r of seedRows('NhanVien'))groups.set(String(r.SoCCCD),(groups.get(String(r.SoCCCD))??0)+1);
  expect(dup.rows).toEqual([...groups].filter(([,n])=>n>1));expect(dup.rows[0][1]).toBe(2);
  expect(email.rows).toEqual([['NV044','VH',null],['NV045','KD',null]]);
  expect(dates.rows).toEqual([['HD2025-003','NV029','2025-03-01','2025-02-28']]);
});
it('4.6 exercises distinguish profiles from groups, keep departments with zero and count rules separately',()=>{
  const es=exercises();expect(es).toHaveLength(3);if(es.length!==3)return;
  const goldens=[[['NV015','VH'],['NV038','KD']],[['BGD',0],['IT',0],['KD',1],['KT',0],['NS',0],['VH',1]],[['CCCD_TRUNG',2],['EMAIL_THIEU',2],['NGAY_HD',1]]];
  for(const [i,e] of es.entries()){expect(guardExercise(e.answer)).toEqual({ok:true});const q=fixtureQuery(e.answer);expect(q.columns).toEqual(e.columns);expect(q.rows).toEqual(goldens[i]);for(const p of lessonExamples(slug).pairs)if(p.rows.length===q.rows.length&&p.columns.length===q.columns.length)expect(q.rows).not.toEqual(p.rows);}
});
it('4.6 boundary fixtures include NULL, empty and space-only emails, strict dates and overlapping flags',()=>{
  const es=exercises(),l=lessonExamples(slug);if(es.length!==3||l.pairs.length!==3){expect.fail('Missing lesson/exercises');}
  const nv: SeedRow[]=seedRows('NhanVien').map(r=>({...r,Email:'ok@example.test'}));
  for(const [code,value] of [['NV015',null],['NV038',''],['NV044','   '],['NV045',' x@example.test ']] as const)nv.find(r=>r.MaNV===code)!.Email=value;
  const hd: SeedRow[]=seedRows('HopDong').slice(0,3).map((r,i)=>({...r,NgayBatDau:'2026-09-01',NgayKetThuc:[null,'2026-09-01','2026-08-31'][i]}));
  const overrides={NhanVien:nv,HopDong:hd};
  expect(fixtureQuery(l.pairs[1].sql,overrides).rows.map(r=>r[0])).toEqual(['NV015','NV038','NV044']);
  expect(fixtureQuery(l.pairs[2].sql,overrides).rows.map(r=>r[0])).toEqual([hd[2].MaHD]);
  expect(fixtureQuery(es[1].answer,overrides).rows).toEqual([['BGD',0],['IT',0],['KD',1],['KT',0],['NS',0],['VH',2]]);
  expect(fixtureQuery(es[2].answer,overrides).rows).toEqual([['CCCD_TRUNG',2],['EMAIL_THIEU',3],['NGAY_HD',1]]);
  // NV015 and NV038 occur in both profile rules: 2+3+1 is NOT a unique-person count.
});

it('4.6 independent COUNT branches still return all three zeroes when no rule matches',()=>{
  const es=exercises();if(es.length!==3){expect.fail('Missing exercises');}
  const nv=seedRows('NhanVien').map((r,i)=>({...r,SoCCCD:String(i),Email:'ok@example.test'}));
  const hd=seedRows('HopDong').map(r=>({...r,NgayKetThuc:null}));
  expect(fixtureQuery(es[2].answer,{NhanVien:nv,HopDong:hd}).rows).toEqual([['CCCD_TRUNG',0],['EMAIL_THIEU',0],['NGAY_HD',0]]);
});
