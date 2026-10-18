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

it('compares by value, ignores column names, and checks order only when asked', () => {
  const answer = shape([['NV047', null], ['NV048', null]]);
  expect(compareResults({ ...shape([['NV048', null], ['NV047', null]]), columns: [{ name: 'Ma', type: 'varchar' }, { name: 'X', type: 'varchar' }] }, answer, false)).toEqual({ correct: true, reason: null });
  expect(compareResults(shape([['NV048', null], ['NV047', null]]), answer, true)).toEqual({ correct: false, reason: 'dòng 1 khác' });
  expect(compareResults(shape([['NV047', null, 'x']], 3), answer, false).reason).toBe('khác số cột (bạn ra 3, đề cần 2)');
  expect(compareResults(shape([['NV047', null]]), answer, false).reason).toBe('khác số dòng (bạn ra 1, đáp án 2)');
});

it('compares data changes by rows affected first, then by the check query', () => {
  const check = shape([['NV001', '2026-09', '500']]);
  expect(compareChanges({ affected: 17, check }, { affected: 9, check }).reason).toBe('khác số dòng bị ảnh hưởng (bạn 17, đáp án 9)');
  expect(compareChanges({ affected: 9, check }, { affected: 9, check })).toEqual({ correct: true, reason: null });
});

it('grades numbers by value, whatever their type or trailing zeros', () => {
  const one = (type: string, scale: number | undefined, v: Cell): Shape => ({ columns: [{ name: 'c', type, scale }], rows: [[v]] });
  expect(compareResults(one('decimal', 0, '9610000'), one('decimal', 1, '9610000.0'), false).correct).toBe(true);
  expect(compareResults(one('decimal', 1, '0.5'), one('decimal', 2, '0.50'), false).correct).toBe(true);
  expect(compareResults(one('int', undefined, 9610000), one('decimal', 0, '9610000'), false).correct).toBe(true);
  expect(compareResults(one('bigint', undefined, '12'), one('int', undefined, 12), false).correct).toBe(true);
  expect(compareResults(one('decimal', 1, '0.5'), one('decimal', 1, '0.6'), false).correct).toBe(false);
});
