import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {parse} from 'yaml';
import {lessonBlocks} from './helpers/lesson-blocks';
import {seedRows,type SeedRow} from './helpers/hrm-seed';
import {checkFlow,inputPreview} from '../src/lib/run-flow';
import {guardExercise} from '../src/lib/sql-guard';

const slugs=['3-4-inner-join-vlookup','3-5-left-join','3-6-ket-nhieu-bang','3-7-self-join-quan-ly'];
const people=seedRows('NhanVien'), contracts=seedRows('HopDong'), departments=seedRows('PhongBan');
it.each(slugs)('%s has a narrative lesson, consistent flow and three independent read-only exercises',slug=>{
  const l=lessonBlocks(slug);
  expect((l.data as {kind:string}).kind).toBe('full');
  expect(l.body).not.toMatch(/^## (Với Excel|Làm bằng SQL)/m);
  expect(checkFlow(l.steps,l.query)).toEqual([]);
  expect(l.steps.length).toBeGreaterThanOrEqual(4);
  expect((l.body.match(/<summary>/g)??[]).length).toBeGreaterThanOrEqual(3);
  const es=parse(readFileSync(`src/content/exercises/${slug}.yaml`,'utf8')).exercises;
  expect(es).toHaveLength(3);
  for(const e of es){expect(e.kind).toBe('query'); expect(guardExercise(e.answer).ok).toBe(true); expect(e.answer.replace(/\s+/g,' ').trim()).not.toBe(l.query.replace(/\s+/g,' ').trim());}
});
it('3.4 joins every profile to a unique department by its stored code',()=>{
  const l=lessonBlocks(slugs[0]);
  expect(new Set(departments.map(p=>p.MaPB)).size).toBe(6);
  expect(l.steps.map(s=>s.total)).toEqual([48,48,48,48]);
  const expected=people.map(n=>[n.MaNV,n.HoTen,n.MaPB,departments.find(p=>p.MaPB===n.MaPB)!.TenPB]);
  const shown=l.steps.at(-1)!.rows;
  expect(shown.length).toBeGreaterThan(0);
  expect(shown).toEqual(expected.slice(0,shown.length));
  expect(l.query).toMatch(/ON pb\.MaPB = nv\.MaPB/);
  expect(l.query).not.toMatch(/\bDISTINCT\b|\bWHERE\b/);
});
it('3.5 tests a NOT NULL right-hand key and preserves every unmatched profile',()=>{
  const l=lessonBlocks(slugs[1]);
  const missing=people.filter(n=>!contracts.some(h=>h.MaNV===n.MaNV));
  expect(missing.map(n=>n.MaNV)).toEqual(['NV047','NV048']);
  expect(l.steps.map(s=>s.total)).toEqual([48,57,2,2,2]);
  expect(l.steps.at(-1)!.rows).toEqual(missing.map(n=>[n.MaNV,n.HoTen,n.MaPB,n.NgayVaoLam]));
  expect(l.query).toMatch(/LEFT JOIN HopDong/); expect(l.query).toMatch(/WHERE hd\.MaHD IS NULL/);
  // Nullable contract end dates would retain matched unlimited contracts, not just missing ones.
  expect(contracts.filter(h=>h.NgayKetThuc===null).length+missing.length).toBe(27);
  expect(contracts.filter(h=>h.MaNV==='NV021')).toHaveLength(3);
});
it('3.4 shows the lookup codes and names needed to trace each displayed profile through ON',()=>{
  const l=lessonBlocks(slugs[0]);
  const catalog=l.steps[1].examples?.find(e=>e.table?.columns.includes('MaPB')&&e.table.columns.includes('TenPB'))?.table;
  expect(catalog,'the JOIN drawer needs values from the right-hand lookup').toBeDefined();
  const codes=new Set(l.steps[0].rows.slice(0,5).map(r=>r[l.steps[0].columns.indexOf('MaPB')]));
  for(const code of codes){
    const department=departments.find(p=>p.MaPB===code)!;
    expect(catalog!.rows).toContainEqual([code,department.TenPB]);
  }
});
it('3.6 constrains contract candidates before repeating a salary and does not promise date uniqueness',()=>{
  const l=lessonBlocks(slugs[2]);
  const at=contracts.filter(h=>String(h.NgayBatDau)<='2026-09-30'&&(h.NgayKetThuc===null||String(h.NgayKetThuc)>='2026-09-30'));
  expect(at).toHaveLength(45); expect(new Set(at.map(h=>h.MaNV)).size).toBe(45);
  expect(l.steps.map(s=>s.total)).toEqual([48,45,43,43,43]);
  expect(l.query).toMatch(/hd\.NgayBatDau <= '20260930'/);
  expect(l.query).toMatch(/hd\.NgayKetThuc IS NULL OR hd\.NgayKetThuc >= '20260930'/);
  expect(l.query).toMatch(/bl\.KyLuong = '2026-09'/); expect(l.query).not.toMatch(/\bDISTINCT\b/);
  for(const row of l.steps.at(-1)!.rows){expect(people.some(n=>n.MaNV===row[0]&&n.HoTen===row[1])).toBe(true);expect(at.some(h=>h.MaHD===row[2]&&h.MaNV===row[0]&&h.LoaiHD===row[3])).toBe(true);}
  // An overlapping candidate remains a second match; date tests are not a uniqueness constraint.
  const overlap=[...at,{...at[0],MaHD:'overlap'}];
  expect(overlap.filter(h=>h.MaNV===at[0].MaNV)).toHaveLength(2);
});
it('3.7 uses two roles and retains the director whose manager code is NULL',()=>{
  const l=lessonBlocks(slugs[3]);
  const managers:SeedRow[]=people.map(n=>({...n,MaQuanLy:n.MaCD==='GD'?null:n.MaCD==='TP'||n.MaPB==='BGD'?'NV004':people.find(p=>p.MaPB===n.MaPB&&p.MaCD==='TP')!.MaNV}));
  expect(l.steps.map(s=>s.total)).toEqual([48,48,48,48]);
  const shown=l.steps.at(-1)!.rows;
  expect(shown.length).toBeGreaterThanOrEqual(4);
  expect(shown).toEqual(managers.slice(0,shown.length).map(n=>[n.MaNV,n.HoTen,n.MaQuanLy,managers.find(q=>q.MaNV===n.MaQuanLy)?.HoTen??null]));
  expect(l.query).toMatch(/LEFT JOIN NhanVien AS ql ON ql\.MaNV = nv\.MaQuanLy/);
  expect(managers.filter(n=>n.MaQuanLy===null).map(n=>n.MaNV)).toEqual(['NV004']);
  const es=parse(readFileSync(`src/content/exercises/${slugs[3]}.yaml`,'utf8')).exercises;
  expect(es[2].answer).toMatch(/COUNT\(nv\.MaNV\)/); expect(es[2].answer).not.toMatch(/COUNT\(\*\)/);
});

it('3.6 lets the learner trace date candidates and salary-period matches without losing SELECT columns',()=>{
  const {steps}=lessonBlocks(slugs[2]);
  const contractTable=steps[1].examples?.find(e=>e.table?.columns.includes('NgayBatDau'))?.table;
  expect(contractTable,'contract ON needs actual codes and date values').toBeDefined();
  for(const col of ['MaNV','MaHD','NgayBatDau','NgayKetThuc'])expect(contractTable!.columns).toContain(col);
  const contractCode=contractTable!.columns.indexOf('MaNV');
  expect(new Set(contractTable!.rows.map(r=>r[contractCode])).size).toBeLessThan(contractTable!.rows.length);
  const salaryTable=steps[2].examples?.find(e=>e.table?.columns.includes('KyLuong'))?.table;
  expect(salaryTable,'salary ON needs period values from the right side').toBeDefined();
  expect(salaryTable!.rows.some(r=>r[salaryTable!.columns.indexOf('KyLuong')]==='2026-08')).toBe(true);
  expect(salaryTable!.rows.some(r=>r[salaryTable!.columns.indexOf('KyLuong')]==='2026-09')).toBe(true);
  expect(steps[0].rows.some(r=>r[0]==='NV047')).toBe(true);
  expect(steps[1].rows.some(r=>r[0]==='NV047')).toBe(false);
  expect(steps[1].rows.some(r=>r[0]==='NV041')).toBe(true);
  expect(steps[2].rows.some(r=>r[0]==='NV041')).toBe(false);
  expect(inputPreview(steps[3],steps[2]).columns).toEqual(expect.arrayContaining(['MaNV','HoTen','MaHD','LoaiHD','ThucLinh']));
});

it('3.7 shows the right-role lookup and a NULL manager in the displayed flow',()=>{
  const {steps}=lessonBlocks(slugs[3]);
  const lookup=steps[1].examples?.find(e=>e.table?.columns.includes('MaNV')&&e.table.columns.includes('HoTen'))?.table;
  expect(lookup,'self join needs values for the second role').toBeDefined();
  expect(lookup!.rows).toContainEqual(['NV005','Vũ Thị Lan']);
  expect(lookup!.rows).toContainEqual(['NV004','Hoàng Minh Tuấn']);
  for(const step of steps){
    const row=step.rows.find(r=>r[0]==='NV004');
    expect(row,step.clause+' retains the director in its excerpt').toBeDefined();
    expect(row![step.columns.indexOf('MaQuanLy')]).toBe(null);
  }
  const selectInput=inputPreview(steps[2],steps[1]);
  expect(selectInput.columns).toContain('HoTenPhiaQL');
  expect(selectInput.columns).toContain('MaQuanLy');
});
