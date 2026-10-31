import { it, expect } from 'vitest';
import { lessonBlocks } from './helpers/lesson-blocks';

// The counts come from live SELECTs on the course database; checkFlow only ties them to their step.
it.each([
  ['2-2-where-loc-nhu-autofilter', [14, 14]],
  ['2-3-and-or-in-between-like', [24, 3, 2]],
  ['2-4-sap-xep-va-top', [45, 45]],
  ['2-5-null-o-trong', [10, 45, 8]],
])('%s checks each record against each condition', (slug, totals) => {
  const where = lessonBlocks(slug).steps.find(s => s.clause === 'WHERE')!;
  expect(where.checks?.totals).toEqual(totals);
  expect(where.checks?.rows.some(r => r.slice(1).every(Boolean))).toBe(true);
  expect(where.checks?.rows.some(r => !r.slice(1).every(Boolean))).toBe(true);
});

it.each([
  '2-1-chon-cot-dat-ten-cot', '2-2-where-loc-nhu-autofilter', '2-3-and-or-in-between-like', '2-4-sap-xep-va-top', '2-5-null-o-trong',
])('%s explains every step in its own words and names the source table', slug => {
  const { steps } = lessonBlocks(slug);
  expect(steps[0].input).toContain('`NhanVien`');
  for (const step of steps) expect(step.meaning.startsWith(`\`${step.clause === 'TOP' ? 'TOP (5)' : step.clause}\``), step.clause).toBe(true);
});

it('2.4 shows the sorted column in the input of its ORDER BY step', () => {
  const steps = lessonBlocks('2-4-sap-xep-va-top').steps;
  expect(steps[2].preview).toContain('Ngày vào làm');
});
