import { it, expect } from 'vitest';
import { highlightTsql } from '../src/lib/tsql-highlight';

const kinds = (code: string) => highlightTsql(code).filter(t => t.text.trim()).map(t => `${t.text}|${t.kind}`);

it('colours a LEFT JOIN query like SSMS', () => {
  expect(kinds('SELECT nv.MaNV FROM NhanVien AS nv LEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV WHERE hd.MaHD IS NULL; -- dò không ra')).toEqual([
    'SELECT|keyword', 'nv|plain', '.|plain', 'MaNV|plain', 'FROM|keyword', 'NhanVien|plain', 'AS|keyword', 'nv|plain',
    'LEFT|gray', 'JOIN|gray', 'HopDong|plain', 'AS|keyword', 'hd|plain', 'ON|keyword', 'hd|plain', '.|plain', 'MaNV|plain',
    '=|gray', 'nv|plain', '.|plain', 'MaNV|plain', 'WHERE|keyword', 'hd|plain', '.|plain', 'MaHD|plain', 'IS|gray', 'NULL|gray',
    ';|gray', '-- dò không ra|comment',
  ]);
});
it('treats LEFT( as a function', () => {
  expect(kinds('LEFT(HoTen, 3)')).toEqual(['LEFT|function', '(|gray', 'HoTen|plain', ',|gray', '3|plain', ')|gray']);
});
it('colours strings, aggregates, system variables and block comments', () => {
  expect(kinds("SELECT N'Kế toán', 'it''s'")).toEqual(['SELECT|keyword', "N'Kế toán'|string", ',|gray', "'it''s'|string"]);
  expect(kinds('SELECT COUNT(*) FROM BangLuong')).toEqual(['SELECT|keyword', 'COUNT|function', '(|gray', '*|gray', ')|gray', 'FROM|keyword', 'BangLuong|plain']);
  expect(kinds('SELECT @@ROWCOUNT /* số dòng */')).toEqual(['SELECT|keyword', '@@ROWCOUNT|function', '/* số dòng */|comment']);
});
it('keeps every character', () => {
  const code = 'SELECT TOP (5) *\r\nFROM NhanVien\r\nORDER BY MaNV;';
  expect(highlightTsql(code).map(t => t.text).join('')).toBe(code);
});
