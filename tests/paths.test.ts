import { describe, it, expect } from 'vitest';
import { withBase, lessonUrl, isCurrentPage } from '../src/lib/paths';

describe('withBase', () => {
  for (const base of ['/microsoft-sql-lession', '/microsoft-sql-lession/']) {
    it(`joins with exactly one slash (base ${base})`, () => {
      expect(withBase('/', base)).toBe('/microsoft-sql-lession/');
      expect(withBase('bai/3-5-left-join/', base)).toBe('/microsoft-sql-lession/bai/3-5-left-join/');
      expect(withBase('/gioi-thieu/', base)).toBe('/microsoft-sql-lession/gioi-thieu/');
    });
  }
  it('uses the Astro base by default', () => {
    expect(lessonUrl('3-5-left-join')).toBe('/microsoft-sql-lession/bai/3-5-left-join/');
  });
});

describe('isCurrentPage', () => {
  const base = '/microsoft-sql-lession';
  it('matches the page with or without the trailing slash', () => {
    expect(isCurrentPage('/microsoft-sql-lession/', '/', base)).toBe(true);
    expect(isCurrentPage('/microsoft-sql-lession', '/', base)).toBe(true);
    expect(isCurrentPage('/microsoft-sql-lession/gioi-thieu', '/gioi-thieu/', base)).toBe(true);
  });
  it('does not match another page', () => {
    expect(isCurrentPage('/microsoft-sql-lession/gioi-thieu/', '/', base)).toBe(false);
    expect(isCurrentPage('/microsoft-sql-lession/bai/1-1-database-la-gi/', '/', base)).toBe(false);
  });
});
