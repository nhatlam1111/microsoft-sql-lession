import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseSchema, ssmsColumnLabel } from '../src/lib/db-schema';
import { DIAGRAM_POSITIONS, diagramLinks, diagramPath } from '../src/lib/db-diagram';

const tables = parseSchema(readFileSync('database/HRM_Demo.sql', 'utf8'));

it('reads the 7 tables of HRM_Demo with their keys', () => {
  expect(tables.map(t => t.name)).toEqual(['PhongBan', 'ChucDanh', 'NhanVien', 'HopDong', 'ChamCong', 'DonNghiPhep', 'BangLuong']);
  expect(tables.find(t => t.name === 'NhanVien')!.columns).toHaveLength(12);
  expect(tables.find(t => t.name === 'NhanVien')!.columns[0]).toEqual({ name: 'MaNV', type: 'varchar(10)', nullable: false });
  expect(tables.find(t => t.name === 'ChamCong')!.primaryKey).toEqual(['MaNV', 'Ngay']);
  expect(tables.find(t => t.name === 'BangLuong')!.primaryKey).toEqual(['KyLuong', 'MaNV']);
  expect(tables.flatMap(t => t.foreignKeys.map(f => `${t.name}.${f.column}>${f.refTable}`)).sort()).toEqual([
    'BangLuong.MaNV>NhanVien', 'ChamCong.MaNV>NhanVien', 'DonNghiPhep.MaNV>NhanVien', 'HopDong.MaNV>NhanVien',
    'NhanVien.MaCD>ChucDanh', 'NhanVien.MaPB>PhongBan', 'NhanVien.MaQuanLy>NhanVien']);
});

it('places every table and draws one link per foreign key', () => {
  for (const t of tables) expect(DIAGRAM_POSITIONS[t.name], t.name).toBeDefined();
  expect(diagramLinks(tables)).toHaveLength(7);
});

it('a path through the diagram names its tables, the joining columns and the links, and refuses tables with no link', () => {
  const links = diagramLinks(tables);
  const p = diagramPath(tables, ['BangLuong', 'NhanVien', 'PhongBan']);
  expect([...p.tables]).toEqual(['BangLuong', 'NhanVien', 'PhongBan']);
  expect([...p.columns].sort()).toEqual(['BangLuong.MaNV', 'NhanVien.MaNV', 'NhanVien.MaPB', 'PhongBan.MaPB']);
  expect([...p.links].map(i => `${links[i].from}>${links[i].to}`).sort()).toEqual(['BangLuong.MaNV>NhanVien.MaNV', 'NhanVien.MaPB>PhongBan.MaPB']);
  expect(diagramPath(tables, []).links.size).toBe(0);
  expect(() => diagramPath(tables, ['BangLuong', 'PhongBan'])).toThrow('BangLuong');
});

it('the sample script starts with a UTF-8 BOM, so SSMS and sqlcmd read its Vietnamese text as UTF-8', () => {
  expect([...readFileSync('database/HRM_Demo.sql').subarray(0, 3)]).toEqual([0xEF, 0xBB, 0xBF]);
});

it('labels columns as SSMS Object Explorer does', () => {
  const nv = tables.find(t => t.name === 'NhanVien')!;
  const cc = tables.find(t => t.name === 'ChamCong')!;
  const col = (t: typeof nv, name: string) => t.columns.find(c => c.name === name)!;
  expect(ssmsColumnLabel(nv, col(nv, 'MaNV'))).toBe('MaNV (PK, varchar(10), not null)');
  expect(ssmsColumnLabel(nv, col(nv, 'MaPB'))).toBe('MaPB (FK, varchar(10), not null)');
  expect(ssmsColumnLabel(nv, col(nv, 'Email'))).toBe('Email (varchar(100), null)');
  expect(ssmsColumnLabel(cc, col(cc, 'MaNV'))).toBe('MaNV (PK, FK, varchar(10), not null)');
});
