import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { lexTsql, findUnprefixedUnicodeStrings } from '../src/lib/tsql-lexer';

const types = (code: string) => lexTsql(code).filter(t => t.type !== 'space').map(t => `${t.text}|${t.type}`);

it('is lossless, including CRLF line ends', () => {
  const code = "SELECT nv.MaNV\r\nFROM NhanVien AS nv -- chú thích\r\nWHERE HoTen = N'Đỗ Minh Quân';";
  expect(lexTsql(code).map(t => t.text).join('')).toBe(code);
});
it('splits identifiers, strings, comments, variables and operators', () => {
  expect(types("SELECT nv.MaNV, N'Kế toán', 'it''s', @@ROWCOUNT FROM [Bảng 1] WHERE a <> 2.5 /* x */"))
    .toEqual(['SELECT|word', 'nv|word', '.|symbol', 'MaNV|word', ',|symbol', "N'Kế toán'|string", ',|symbol',
      "'it''s'|string", ',|symbol', '@@ROWCOUNT|variable', 'FROM|word', '[Bảng 1]|word', 'WHERE|word',
      'a|word', '<>|symbol', '2.5|number', '/* x */|comment']);
});
it('finds Vietnamese strings without the N prefix, ignoring comments', () => {
  expect(findUnprefixedUnicodeStrings(
    "-- 'Nguyễn' trong chú thích\nSELECT * FROM NhanVien WHERE HoTen = 'Nguyễn Văn A' AND MaPB = N'Kế toán' AND MaNV = 'NV001'",
  )).toEqual(["'Nguyễn Văn A'"]);
});
it('HRM_Demo.sql has no Vietnamese string without N and no GO, USE or CREATE DATABASE', () => {
  const sql = readFileSync('database/HRM_Demo.sql', 'utf8');
  expect(findUnprefixedUnicodeStrings(sql)).toEqual([]);
  const words = lexTsql(sql).filter(t => t.type === 'word').map(t => t.text.toUpperCase());
  expect(words).not.toContain('GO');
  expect(words).not.toContain('USE');
  const code = lexTsql(sql).filter(t => t.type !== 'comment').map(t => t.text).join('');
  expect(/CREATE\s+DATABASE/i.test(code)).toBe(false);
});
