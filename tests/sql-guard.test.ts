import { it, expect } from 'vitest';
import { guardExercise } from '../src/lib/sql-guard';

const blocked = (s: string) => { const g = guardExercise(s); return g.ok ? null : g.reason; };

it('accepts one statement that starts with SELECT, WITH, INSERT, UPDATE or DELETE', () => {
  for (const s of ["SELECT N'COMMIT' AS x", 'SELECT 1;', 'UPDATE BangLuong SET PhuCap = 1 WHERE MaNV IN (SELECT MaNV FROM NhanVien)',
    "WITH x AS (SELECT 1 AS a) INSERT INTO PhongBan (MaPB, TenPB) SELECT 'X', N'Y' FROM x", "INSERT INTO PhongBan (MaPB, TenPB) VALUES ('X', N'Y')"])
    expect(blocked(s), s).toBeNull();
});

it('explains every refusal', () => {
  expect(blocked('')).toBe('Chưa có câu lệnh nào.');
  expect(blocked('SELECT ' + 'a'.repeat(4000))).toBe('Câu lệnh dài quá 4.000 ký tự.');
  expect(blocked("SELECT 'abc")).toBe('Có chuỗi hoặc chú thích chưa đóng.');
  expect(blocked('SELECT 1; COMMIT')).toBe('Mỗi lần chỉ chạy một câu lệnh.');
  for (const s of ['COMMIT', '/* x */ DROP TABLE NhanVien', 'EXEC sp_who', "WAITFOR DELAY '00:00:05'"])
    expect(blocked(s), s).toBe('Bài tập chỉ nhận câu bắt đầu bằng SELECT, WITH, INSERT, UPDATE hoặc DELETE.');
  expect(blocked("SELECT 1 WAITFOR DELAY '00:00:01'")).toBe('Lệnh WAITFOR không dùng được trong bài tập.');
  expect(blocked('SELECT 1 COMMIT')).toBe('Lệnh COMMIT không dùng được trong bài tập.');
  expect(blocked('UPDATE NhanVien SET HoTen = HoTen BEGIN TRAN')).toBe('Lệnh BEGIN TRAN không dùng được trong bài tập.');
  expect(blocked('SELECT * INTO X FROM NhanVien')).toBe('SELECT … INTO tạo bảng mới nên không dùng được trong bài tập.');
});

it('sees a keyword glued to a number and a comment ended by a bare CR', () => {
  expect(blocked('UPDATE BangLuong SET PhuCap = 0 WHERE 1=1COMMIT')).toBe('Lệnh COMMIT không dùng được trong bài tập.');
  expect(blocked('SELECT 1ROLLBACK')).toBe('Lệnh ROLLBACK không dùng được trong bài tập.');
  expect(blocked('SELECT 1 --x\rCOMMIT')).toBe('Lệnh COMMIT không dùng được trong bài tập.');
});

it('refuses a SET that is not part of an UPDATE', () => {
  expect(blocked('SELECT 1 AS a SET ROWCOUNT 1')).toBe('Lệnh SET không dùng được trong bài tập.');
  expect(blocked('UPDATE BangLuong SET PhuCap = 1 SET NOCOUNT ON')).toBe('Lệnh SET không dùng được trong bài tập.');
  expect(blocked('UPDATE BangLuong SET PhuCap = 1, ThueTNCN = 0 WHERE KyLuong = N\'2026-09\'')).toBeNull();
});
