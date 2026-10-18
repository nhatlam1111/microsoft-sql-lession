import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseSchema } from '../src/lib/db-schema';
import { DIAGRAM_POSITIONS, diagramLinks } from '../src/lib/db-diagram';

const tables = parseSchema(readFileSync('database/HRM_Demo.sql', 'utf8'));

it('reads the 7 tables of HRM_Demo with their keys', () => {
  expect(tables.map(t => t.name)).toEqual(['PhongBan', 'ChucDanh', 'NhanVien', 'HopDong', 'ChamCong', 'DonNghiPhep', 'BangLuong']);
  expect(tables.find(t => t.name === 'NhanVien')!.columns).toHaveLength(12);
  expect(tables.find(t => t.name === 'NhanVien')!.columns[0]).toEqual({ name: 'MaNV', type: 'varchar(10)' });
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
