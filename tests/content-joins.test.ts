import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {parse} from 'yaml';
import {lessonBlocks} from './helpers/lesson-blocks';
import {seedRows,type SeedRow} from './helpers/hrm-seed';
import {checkFlow} from '../src/lib/run-flow';
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
  expect(l.steps.at(-1)!.rows).toEqual(expected.slice(0,10));
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
  expect(l.steps.at(-1)!.rows).toEqual(managers.slice(0,10).map(n=>[n.MaNV,n.HoTen,n.MaQuanLy,managers.find(q=>q.MaNV===n.MaQuanLy)?.HoTen??null]));
  expect(l.query).toMatch(/LEFT JOIN NhanVien AS ql ON ql\.MaNV = nv\.MaQuanLy/);
  expect(managers.filter(n=>n.MaQuanLy===null).map(n=>n.MaNV)).toEqual(['NV004']);
  const es=parse(readFileSync(`src/content/exercises/${slugs[3]}.yaml`,'utf8')).exercises;
  expect(es[2].answer).toMatch(/COUNT\(nv\.MaNV\)/); expect(es[2].answer).not.toMatch(/COUNT\(\*\)/);
});
