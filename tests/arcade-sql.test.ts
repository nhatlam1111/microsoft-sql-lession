import { it, expect } from 'vitest';
import { buildSetup, sqlLiteral } from '../api/src/arcade-sql';

it('writes values the way their column needs', () => {
  expect(sqlLiteral(null, 'int NULL')).toBe('NULL');
  expect(sqlLiteral("O'Brien", 'nvarchar(50) NOT NULL')).toBe("N'O''Brien'");
  expect(sqlLiteral('Hà', 'nvarchar(50)')).toBe("N'Hà'");
  expect(sqlLiteral('Hà', 'nchar(5)')).toBe("N'Hà'");
  expect(sqlLiteral('NV1', 'varchar(10)')).toBe("'NV1'");
  expect(sqlLiteral('2026-10-21', 'date NOT NULL')).toBe("'2026-10-21'");
  expect(sqlLiteral('2026-10-21T08:30:00', 'datetime2(0) NULL')).toBe("'2026-10-21T08:30:00'");
  expect(sqlLiteral(12.5, 'decimal(10,2)')).toBe('12.5');
  expect(sqlLiteral(0, 'int')).toBe('0');
  expect(sqlLiteral(true, 'bit')).toBe('1');
  expect(sqlLiteral(false, 'bit')).toBe('0');
  expect(sqlLiteral('', 'nvarchar(10)')).toBe("N''");
  expect(sqlLiteral('NULL', 'varchar(10)')).toBe("'NULL'");
});

it('creates every table and inserts its rows', () => {
  const tables = { NhanVien: { MaNV: 'varchar(10) NOT NULL', Email: 'varchar(50) NULL' }, PhongBan: { MaPB: 'varchar(10) NOT NULL' } };
  const sql = buildSetup(tables, { NhanVien: [['A', 'a@x'], ['B', null]] });
  expect(sql).toContain('CREATE TABLE dbo.[NhanVien] ([MaNV] varchar(10) NOT NULL, [Email] varchar(50) NULL);');
  expect(sql).toContain("INSERT INTO dbo.[NhanVien] VALUES ('A', 'a@x'), ('B', NULL);");
  expect(sql).toContain('CREATE TABLE dbo.[PhongBan]');
  expect(sql).not.toContain('INSERT INTO dbo.[PhongBan]');
});

it('leaves a table empty when the test gives it no rows or an empty list', () => {
  expect(buildSetup({ T: { a: 'int' } }, { T: [] })).toBe('CREATE TABLE dbo.[T] ([a] int);');
});

it('reverses the rows on request', () => {
  const sql = buildSetup({ T: { a: 'int' } }, { T: [[1], [2]] }, { reverse: true });
  expect(sql).toContain('VALUES (2), (1);');
});

it('splits inserts above the 1000 rows one VALUES list may hold', () => {
  const rows = Array.from({ length: 1001 }, (_, i) => [i]);
  expect(buildSetup({ T: { a: 'int' } }, { T: rows }).match(/INSERT INTO/g)).toHaveLength(2);
});
