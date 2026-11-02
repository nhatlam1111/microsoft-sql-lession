import { it, expect } from 'vitest';
import { guardArcade, guardExercise } from '../src/lib/sql-guard';

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

it('takes SELECT and WITH for Arcade, nothing that changes data', () => {
  expect(guardArcade('SELECT MaNV FROM NhanVien').ok).toBe(true);
  expect(guardArcade('WITH t AS (SELECT 1 AS a) SELECT a FROM t').ok).toBe(true);
  expect(guardArcade("SELECT N'update' AS a").ok).toBe(true);
  expect(guardArcade('UPDATE NhanVien SET HoTen = 1')).toEqual({ ok: false, reason: 'Bài luyện chỉ nhận câu bắt đầu bằng SELECT hoặc WITH.' });
  expect(guardArcade('WITH t AS (SELECT 1 AS a) DELETE FROM t')).toEqual({ ok: false, reason: 'Bài luyện chỉ nhận câu truy vấn.' });
});

it('keeps the shared Arcade refusals of the exercise guard', () => {
  expect(guardArcade('')).toEqual({ ok: false, reason: 'Chưa có câu lệnh nào.' });
  expect(guardArcade('SELECT 1; SELECT 2')).toEqual({ ok: false, reason: 'Mỗi lần chỉ chạy một câu lệnh.' });
  expect(guardArcade('SELECT 1 COMMIT')).toEqual({ ok: false, reason: 'Lệnh COMMIT không dùng được trong bài tập.' });
  expect(guardArcade('SELECT MaNV INTO X FROM NhanVien').ok).toBe(false);
});
