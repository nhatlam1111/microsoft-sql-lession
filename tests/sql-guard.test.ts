import { it, expect } from 'vitest';
import { guardExercise, isBlockedCompletionKeyword, normalizeSql, sanitize } from '../src/lib/sql-guard';

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
  for (const [s, word] of [['COMMIT', 'COMMIT'], ['/* x */ DROP TABLE NhanVien', 'DROP'], ['EXEC sp_who', 'EXEC'], ["WAITFOR DELAY '00:00:05'", 'WAITFOR']])
    expect(blocked(s), s).toContain(`Lệnh ${word}`);
  expect(blocked("SELECT 1 WAITFOR DELAY '00:00:01'")).toBe('Lệnh WAITFOR không dùng được trong bài tập.');
  expect(blocked('SELECT 1 COMMIT')).toContain('Lệnh COMMIT');
  expect(blocked('UPDATE NhanVien SET HoTen = HoTen BEGIN TRAN')).toContain('Lệnh BEGIN TRAN');
  expect(blocked('SELECT * INTO X FROM NhanVien')).toBe('SELECT … INTO tạo bảng mới nên không dùng được trong bài tập.');
});

it('sees a keyword glued to a number and a comment ended by a bare CR', () => {
  expect(blocked('UPDATE BangLuong SET PhuCap = 0 WHERE 1=1COMMIT')).toContain('Lệnh COMMIT');
  expect(blocked('SELECT 1ROLLBACK')).toContain('Lệnh ROLLBACK');
  expect(blocked('SELECT 1 --x\rCOMMIT')).toContain('Lệnh COMMIT');
});

it('names transaction control commands even as the first token and explains who owns the transaction', () => {
  for (const [sql, word] of [
    ['cOmMiT TRANSACTION', 'COMMIT'], ['ROLLBACK TRAN', 'ROLLBACK'],
    ['BEGIN\tTRANSACTION', 'BEGIN TRAN'], ['BEGIN/*nested /*ok*/ comment*/ TRAN', 'BEGIN TRAN'],
    ['SAVE TRANSACTION checkpoint', 'SAVE'], ['SELECT 1e1COMMIT', 'COMMIT'],
    ['SELECT 1 -- comment\rROLLBACK', 'ROLLBACK'],
  ]) {
    expect(blocked(sql), sql).toContain(`Lệnh ${word}`);
    expect(blocked(sql), sql).toContain('hệ thống tự mở và hoàn tác giao dịch');
  }
});

it('does not confuse literals, comments, quoted names or identifier digits with transaction commands', () => {
  for (const sql of [
    "SELECT N'COMMIT; ROLLBACK; BEGIN TRAN; SAVE TRAN; it''s fine' AS x",
    'SELECT [COMMIT], [ROLLBACK]],still name], "BEGIN TRAN", "SAVE" FROM [CREATE]',
    'SELECT 1 /* COMMIT /* BEGIN TRAN */ SAVE */ -- ROLLBACK\r\n',
    'SELECT Ma1COMMIT, commit2, @commit, Ma$rollback FROM [NhanVien]',
    'SELECT CASE WHEN 1 = 1 THEN 1 ELSE 0 END AS x;',
  ]) expect(blocked(sql), sql).toBeNull();
  expect(sanitize(normalizeSql('SELECT 1 -- end\rCOMMIT'))).toContain('COMMIT');
});

it('does not let punctuation hide a transaction command', () => {
  for (const sql of ['SELECT 1$COMMIT', 'SELECT $ROLLBACK', 'SELECT 1.0COMMIT', 'SELECT .5ROLLBACK'])
    expect(blocked(sql) ?? '', sql).toMatch(/Lệnh (COMMIT|ROLLBACK)/);
});

it('preserves Unicode identifiers that contain command text', () => {
  expect(blocked('SELECT éCOMMIT, ĐROLLBACK, MãSAVE FROM [NhanVien]')).toBeNull();
});

it('recognizes command boundaries after binary literals instead of treating the x prefix as an identifier', () => {
  for (const [sql, word] of [
    ['SELECT 0x1ROLLBACK UPDATE BangLuong SET PhuCap = PhuCap + 1', 'ROLLBACK'],
    ['SELECT 0XAb12rOlLbAcK TRAN', 'ROLLBACK'],
    ['SELECT 0xROLLBACK', 'ROLLBACK'],
    ['SELECT 0x01SAVE TRAN checkpoint', 'SAVE'],
    ['SELECT 0x1/* boundary */BEGIN TRAN', 'BEGIN TRAN'],
    ['SELECT 0x1 -- boundary\rBEGIN TRANSACTION', 'BEGIN TRAN'],
    ["SELECT 0xA0WAITFOR DELAY '00:00:01'", 'WAITFOR'],
  ]) expect(blocked(sql) ?? '', sql).toContain(`Lệnh ${word}`);
});

it('preserves complete binary and decimal literals, identifiers, strings and quoted names', () => {
  for (const sql of [
    'SELECT 0x, 0x0123456789ABCDEF, 0XdeadBEEF, 1e-2, .5e+2, 10.0;',
    'SELECT Binary0x1ROLLBACK, é0x1COMMIT, @hex0x1SAVE FROM [NhanVien]',
    "SELECT N'0x1ROLLBACK; 0x1SAVE', [0x1ROLLBACK], \"0x1COMMIT\" /* 0x1ROLLBACK */;",
  ]) expect(blocked(sql), sql).toBeNull();
});

it('shares the unconditional blocked keywords with completion without hiding SELECT or CASE', () => {
  expect(isBlockedCompletionKeyword, 'the shared completion keyword predicate is exported').toBeTypeOf('function');
  for (const keyword of ['BEGIN', 'COMMIT', 'ROLLBACK', 'SAVE', 'EXEC', 'EXECUTE', 'CREATE', 'ALTER', 'DROP', 'TRUNCATE', 'MERGE', 'USE', 'GO', 'WAITFOR', 'OPENROWSET', 'GRANT'])
    expect(isBlockedCompletionKeyword(keyword.toLowerCase()), keyword).toBe(true);
  for (const keyword of ['SELECT', 'CASE', 'WHEN', 'FROM', 'UPDATE', 'SET', 'INSERT', 'INTO', 'commit2', '@commit', ''])
    expect(isBlockedCompletionKeyword(keyword), keyword).toBe(false);
});

it('refuses a SET that is not part of an UPDATE', () => {
  expect(blocked('SELECT 1 AS a SET ROWCOUNT 1')).toBe('Lệnh SET không dùng được trong bài tập.');
  expect(blocked('UPDATE BangLuong SET PhuCap = 1 SET NOCOUNT ON')).toBe('Lệnh SET không dùng được trong bài tập.');
  expect(blocked('UPDATE BangLuong SET PhuCap = 1, ThueTNCN = 0 WHERE KyLuong = N\'2026-09\'')).toBeNull();
});
