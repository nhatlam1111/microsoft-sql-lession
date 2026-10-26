import { it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { fixtureQuery, lessonExamples } from './helpers/window-fixture';
import { seedRows } from './helpers/hrm-seed';
import { checkFlow, splitFocus } from '../src/lib/run-flow';
import { guardExercise } from '../src/lib/sql-guard';
const slug='4-2-xep-hang-row-number-rank';
it('4.2 picks one whole contract per employee and preserves scoped, runnable flow queries',()=>{
  const l=lessonExamples(slug);
  expect(l.pairs.length).toBe(3);
  expect(l.steps.map(s=>[s.clause,s.total])).toEqual([['FROM',55],['WHERE',46],['SELECT',46],['ORDER BY',46]]);
  expect(checkFlow(l.steps,l.query)).toEqual([]);
  for (const p of [...l.pairs,...l.steps]) {
    expect(guardExercise(p.sql)).toEqual({ok:true});
    const got=fixtureQuery(p.sql);
    expect(got.columns).toEqual(p.columns);expect(got.rows).toHaveLength(p.total!);
    expect(got.rows.slice(0,p.rows.length)).toEqual(p.rows);
  }
  const rows=fixtureQuery(l.query).rows;
  expect(rows).toContainEqual(['NV021','HD2024-005','2024-09-01']);
  expect(rows.some(r=>r[0]==='NV047'||r[0]==='NV048')).toBe(false);
  expect(splitFocus(l.query,l.steps[3].focus)?.focus).toBe('ORDER BY xh.MaNV ASC;');
});
it('4.2 excludes future starts before numbering and resolves equal-date contracts by unique code',()=>{
  const l=lessonExamples(slug);
  expect(l.query.length).toBeGreaterThan(0);
  const template=seedRows('HopDong')[0];
  const contracts=[
    {...template,MaNV:'NVX',MaHD:'HD-A',NgayBatDau:'2026-10-21'},
    {...template,MaNV:'NVX',MaHD:'HD-B',NgayBatDau:'2026-10-21'},
    {...template,MaNV:'NVX',MaHD:'HD-Z',NgayBatDau:'2026-10-22'},
  ];
  expect(fixtureQuery(l.query,{HopDong:contracts}).rows).toEqual([['NVX','HD-B','2026-10-21']]);
});
it('4.2 practice resets numbering and keeps ties; row/rank/dense cutoffs yield distinct populations',()=>{
  const path=`src/content/exercises/${slug}.yaml`;
  expect(existsSync(path)).toBe(true);if(!existsSync(path))return;
  const es=parse(readFileSync(path,'utf8')).exercises;
  expect(es).toHaveLength(3);
  for(const e of es){expect(guardExercise(e.answer)).toEqual({ok:true});expect(fixtureQuery(e.answer).columns).toEqual(e.columns);}
  expect(fixtureQuery(es[0].answer).rows).toEqual([
    ['DP015','Phép năm',5,1],['DP020','Phép năm',3,2],['DP008','Phép năm',2,3],['DP009','Việc riêng',1,1],
  ]);
  const ties=fixtureQuery(es[1].answer).rows;
  expect(ties).toHaveLength(12);
  expect(ties.slice(0,2)).toEqual([['DP005',5,1,1],['DP015',5,1,1]]);
  expect(ties.slice(2,7).every(r=>r[1]===3&&r[2]===3&&r[3]===2)).toBe(true);
  expect(ties.at(-1)).toEqual(['DP016',1,12,4]);
  expect(fixtureQuery(es[2].answer).rows).toHaveLength(9);
  const rank=es[2].answer.replace('ROW_NUMBER()','RANK()').replace('ORDER BY SoNgay DESC, MaDon ASC','ORDER BY SoNgay DESC');
  const dense=rank.replace('RANK()','DENSE_RANK()');
  expect(fixtureQuery(rank).rows).toHaveLength(14);
  expect(fixtureQuery(dense).rows).toHaveLength(19);
});
