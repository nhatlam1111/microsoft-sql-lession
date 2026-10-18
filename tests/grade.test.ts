import { it, expect } from 'vitest';
import { formatCell, compareResults, compareChanges, type Cell, type ResultColumn, type Shape } from '../src/lib/grade';

const col = (type: string, scale?: number): ResultColumn => ({ name: 'c', type, scale });

it('formats values so equal data compares equal', () => {
  expect(formatCell(9610000, col('decimal', 0))).toBe('9610000');
  expect(formatCell(0.5, col('decimal', 1))).toBe('0.5');
  expect(formatCell(new Date('2026-10-01T00:00:00Z'), col('date'))).toBe('2026-10-01');
  expect(formatCell(new Date('1970-01-01T08:05:00Z'), col('time', 0))).toBe('08:05:00');
  expect(formatCell(null, col('nvarchar'))).toBeNull();
});

const shape = (rows: Cell[][], n = rows[0]?.length ?? 2): Shape => ({ columns: Array.from({ length: n }, (_, i) => ({ name: `c${i}`, type: 'nvarchar' })), rows });

it('shows money with its four decimals, as SSMS does, though the driver gives no scale', () => {
  expect(formatCell(1234.56, col('money'))).toBe('1234.5600');
  expect(formatCell(12.5, col('smallmoney'))).toBe('12.5000');
  expect(formatCell(0.125, col('decimal'))).toBe('0.125');
});

it('compares by value, ignores column names, and checks order only when asked', () => {
  const answer = shape([['NV047', null], ['NV048', null]]);
  expect(compareResults({ ...shape([['NV048', null], ['NV047', null]]), columns: [{ name: 'Ma', type: 'varchar' }, { name: 'X', type: 'varchar' }] }, answer, false)).toEqual({ correct: true, reason: null });
  expect(compareResults(shape([['NV048', null], ['NV047', null]]), answer, true)).toEqual({ correct: false, reason: 'dòng 1 khác ở cột c0' });
  expect(compareResults(shape([['NV047', null, 'x']], 3), answer, false).reason).toBe('khác số cột (bạn ra 3, đề cần 2)');
  expect(compareResults(shape([['NV047', null]]), answer, false).reason).toBe('khác số dòng (bạn ra 1, đáp án 2)');
});

it('compares data changes by rows affected first, then by the check query', () => {
  const check = shape([['NV001', '2026-09', '500']]);
  expect(compareChanges({ affected: 17, check }, { affected: 9, check }).reason).toBe('khác số dòng bị ảnh hưởng (bạn 17, đáp án 9)');
  expect(compareChanges({ affected: 9, check }, { affected: 9, check })).toEqual({ correct: true, reason: null });
});

it('names the columns that differ in a sorted result, and otherwise the learner row that has no match', () => {
  const cols = (names: string[]): ResultColumn[] => names.map(name => ({ name, type: 'nvarchar' }));
  const answer: Shape = { columns: cols(['MaNV', 'HoTen']), rows: [['NV001', 'An'], ['NV002', 'Bình']] };
  const mine = (rows: Cell[][]): Shape => ({ columns: cols(['Ma', 'Ten']), rows });
  expect(compareResults(mine([['NV001', 'An'], ['NV002', 'Binh']]), answer, true).reason).toBe('dòng 2 khác ở cột Ten');
  expect(compareResults(mine([['NV002', 'Bình'], ['NV001', 'An']]), answer, true).reason).toBe('dòng 1 khác ở cột Ma, Ten');
  // Without a required order, the number is the row the learner sees in Results.
  expect(compareResults(mine([['NV002', 'Bình'], ['NV009', 'An']]), answer, false).reason).toBe('dòng 2 không có trong đáp án');
});

it('points at a changed row by its own key values and the columns that differ, never by the answer values', () => {
  const columns: ResultColumn[] = [{ name: 'MaNV', type: 'varchar' }, { name: 'KyLuong', type: 'varchar' }, { name: 'PhuCap', type: 'decimal', scale: 0 }];
  const table = (rows: Cell[][]): Shape => ({ columns, rows });
  const answer = { affected: 1, check: table([['NV001', '2026-09', '730000'], ['NV002', '2026-09', '2000000']]) };
  const mine = { affected: 1, check: table([['NV001', '2026-09', '730000'], ['NV002', '2026-09', '500000']]) };
  const { reason } = compareChanges(mine, answer);
  expect(reason).toBe('sau khi sửa, dòng MaNV = NV002, KyLuong = 2026-09 khác đáp án ở cột PhuCap');
  expect(reason).not.toContain('2000000');
});

it('names the row a wrong delete left behind, and compares how many rows the table keeps', () => {
  const ids = (...v: string[]): Shape => ({ columns: [{ name: 'MaDon', type: 'varchar' }], rows: v.map(x => [x]) });
  expect(compareChanges({ affected: 1, check: ids('DP001', 'DP003') }, { affected: 1, check: ids('DP001', 'DP002') }).reason)
    .toBe('sau khi sửa vẫn còn dòng MaDon = DP003 mà đáp án không có');
  expect(compareChanges({ affected: 1, check: ids('DP001') }, { affected: 1, check: ids('DP001', 'DP002') }).reason)
    .toBe('sau khi sửa, bảng còn 1 dòng, đáp án còn 2 dòng');
});

it('grades numbers by value, whatever their type or trailing zeros', () => {
  const one = (type: string, scale: number | undefined, v: Cell): Shape => ({ columns: [{ name: 'c', type, scale }], rows: [[v]] });
  expect(compareResults(one('decimal', 0, '9610000'), one('decimal', 1, '9610000.0'), false).correct).toBe(true);
  expect(compareResults(one('decimal', 1, '0.5'), one('decimal', 2, '0.50'), false).correct).toBe(true);
  expect(compareResults(one('int', undefined, 9610000), one('decimal', 0, '9610000'), false).correct).toBe(true);
  expect(compareResults(one('bigint', undefined, '12'), one('int', undefined, 12), false).correct).toBe(true);
  expect(compareResults(one('decimal', 1, '0.5'), one('decimal', 1, '0.6'), false).correct).toBe(false);
});
