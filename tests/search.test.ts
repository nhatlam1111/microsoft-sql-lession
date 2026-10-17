import { it, expect } from 'vitest';
import { normalizeVi, searchLessons } from '../src/lib/search';
import { AREAS } from '../src/data/curriculum';
import { readCatalog } from './helpers/lessons';

const CAT = readCatalog();
const nums = (q: string, limit?: number) => searchLessons(CAT, q, AREAS, limit).map(e => e.num);

it('normalises Vietnamese text, including đ and NFD input', () => {
  expect(normalizeVi('  Kết bảng ĐỒNG   Đỗ ')).toBe('ket bang dong do');
  expect(normalizeVi('Kết bảng'.normalize('NFD'))).toBe('ket bang');
});
it('puts an exact lesson number first', () => expect(nums('3.5')[0]).toBe('3.5'));
it('finds lessons without diacritics', () => {
  expect(nums('hop dong')).toContain('3.5');
  expect(nums('ket bang')).toContain('3.6');
});
it('finds Excel feature names and ranks title matches first', () => {
  const r = nums('vlookup');
  expect(r[0]).toBe('3.4');
  expect(r).toContain('3.5');
});
it('gives the same results for NFD and NFC queries', () => {
  expect(nums('Kết bảng'.normalize('NFD'))).toEqual(nums('Kết bảng'));
});
it('returns nothing for a blank query and respects the limit', () => {
  expect(nums('   ')).toEqual([]);
  expect(nums('a', 3).length).toBeLessThanOrEqual(3);
});
