import { describe, it, expect } from 'vitest';
import { withBase, lessonUrl } from '../src/lib/paths';

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
