import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { lessonBlocks } from './helpers/lesson-blocks';
import { readCatalog } from './helpers/lessons';
import { seedRows } from './helpers/hrm-seed';
import { checkFlow, inputPreview } from '../src/lib/run-flow';

const select='3-10-subquery-trong-select', from='3-11-subquery-trong-from';
const normalize=(sql:string)=>sql.replace(/\s+/g,' ').trim();
describe('subqueries in SELECT and FROM',()=>{
  it('inserts two A4 lessons before the preserved COUNT lesson',()=>{
    expect(readCatalog().filter(l=>l.num.startsWith('3.')).slice(-4).map(l=>[l.num,l.slug,l.area])).toEqual([
      ['3.9','3-9-subquery','A4'],['3.10',select,'A4'],['3.11',from,'A4'],['3.12','3-12-dem-co-dieu-kien','A5'],
    ]);
  });
  it.each([select,from])('%s is a full 25-minute lesson with four checks and three supported query exercises',slug=>{
    const l=lessonBlocks(slug), data=l.data as {kind:string;minutes:number};
    expect([data.kind,data.minutes]).toEqual(['full',25]);
    expect(l.body.match(/<details>/g)).toHaveLength(4);
    expect(l.body.lastIndexOf('</details>')).toBeLessThan(l.body.indexOf('## Bài tập'));
    expect(checkFlow(l.steps,l.query)).toEqual([]);
    const exercises=parse(readFileSync(`src/content/exercises/${slug}.yaml`,'utf8')).exercises;
    expect(exercises).toHaveLength(3); expect(exercises.every((e:{kind:string})=>e.kind==='query')).toBe(true);
    expect(l.body).toContain('copy={false}'); expect(l.body).toContain('<Messages');
  });
  it('SELECT keeps all employees, including zero matches, and traces two complete correlation examples',()=>{
    const l=lessonBlocks(select), contracts=seedRows('HopDong'), people=seedRows('NhanVien');
    expect(l.steps.map(s=>[s.clause,s.total])).toEqual([['FROM',48],['SELECT',48],['ORDER BY',48]]);
    expect(normalize(l.query)).toMatch(/WHERE hd.MaNV = nv.MaNV/);
    expect(normalize(l.query)).not.toMatch(/GROUP BY/);
    const result=l.results.find(r=>r.columns.join(',')==='MaNV,HoTen,SoHopDong')!;
    expect(result.total).toBe(48);
    for(const row of result.rows){const p=people.find(p=>p.MaNV===row[0])!;expect(row).toEqual([p.MaNV,p.HoTen,contracts.filter(c=>c.MaNV===p.MaNV).length]);}
    expect(result.rows.find(r=>r[0]==='NV047')?.[2]).toBe(0);
    expect(l.steps[1].examples?.map(e=>e.calculations?.find(c=>c.column==='SoHopDong')?.value)).toEqual([3,0]);
    expect(l.steps[1].examples?.[0].table?.rows).toHaveLength(3);
    expect(l.steps[1].examples?.[1].table).toBeUndefined(); // No invented contract row for an empty match set.
    expect(l.body).toMatch(/NULL/); expect(l.body).toMatch(/55/);
    expect(l.body).toMatch(/Subquery returned more than 1 value/);
    expect(l.body).toMatch(/Only one expression can be specified/);
  });
  it('FROM groups contracts before the outer filter and sorts only the final report',()=>{
    const l=lessonBlocks(from), counts=new Map<string,number>();
    for(const c of seedRows('HopDong')) counts.set(String(c.MaNV),(counts.get(String(c.MaNV))??0)+1);
    const expected=[...counts].filter(([,n])=>n>=2).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));
    expect(l.steps.map(s=>[s.clause,s.total])).toEqual([['FROM',46],['WHERE',7],['SELECT',7],['ORDER BY',7]]);
    expect(l.results.find(r=>r.columns.join(',')==='MaNV,SoHopDong')?.rows).toEqual(expected);
    expect(l.steps[1].checks?.totals).toEqual([7,7]);
    expect(l.steps[1].checks?.rows.some(r=>r[1]===false)).toBe(true);
    expect(inputPreview(l.steps[1],l.steps[0]).columns).toContain('SoHopDong');
    const before=l.steps[2].rows; expect(before).not.toEqual(expected); expect(l.steps[3].rows).toEqual(expected);
    expect(normalize(l.query)).toMatch(/\) AS t WHERE t.SoHopDong >= 2 ORDER BY t.SoHopDong DESC, t.MaNV ASC/);
    expect(l.body).toMatch(/No column name was specified/);
    expect(l.body).toMatch(/Invalid column name/);
    expect(l.body).toMatch(/ORDER BY clause is invalid/);
  });
});
