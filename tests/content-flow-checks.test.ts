import { it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { inputPreview } from '../src/lib/run-flow';
import { lessonBlocks } from './helpers/lesson-blocks';

// The counts come from live SELECTs on the course database; checkFlow only ties them to their step.
it.each([
  ['2-2-where-loc-nhu-autofilter', [14, 14], ['MaPB']],
  ['2-3-and-or-in-between-like', [24, 3, 2], ['MaPB', 'NgayVaoLam']],
  ['2-4-sap-xep-va-top', [45, 45], ['TrangThai']],
  ['2-5-null-o-trong', [10, 45, 8], ['MaPB', 'NgayNghiViec']],
])('%s checks each record against each condition, on columns its input shows', (slug, totals, columns) => {
  const { steps } = lessonBlocks(slug);
  const at = steps.findIndex(s => s.clause === 'WHERE');
  const where = steps[at];
  expect(where.checks?.totals).toEqual(totals);
  expect(where.checks?.rows.some(r => r.slice(1).every(Boolean))).toBe(true);
  expect(where.checks?.rows.some(r => !r.slice(1).every(Boolean))).toBe(true);
  expect(inputPreview(where, steps[at - 1]).columns).toEqual(expect.arrayContaining(columns));
  // Each header names its column, so "IS NULL: Đúng" cannot be read against the wrong column.
  columns.forEach((column, i) => expect(where.checks?.conditions[i]).toContain(column));
});

it.each([
  '2-1-chon-cot-dat-ten-cot', '2-2-where-loc-nhu-autofilter', '2-3-and-or-in-between-like', '2-4-sap-xep-va-top', '2-5-null-o-trong',
])('%s explains every step in its own words and shows where SELECT takes its columns from', slug => {
  const { steps } = lessonBlocks(slug);
  expect(steps[0].input).toContain('`NhanVien`');
  for (const step of steps) expect(step.meaning.startsWith(`\`${step.clause === 'TOP' ? 'TOP (5)' : step.clause}\``), step.clause).toBe(true);
  const at = steps.findIndex(s => s.clause === 'SELECT');
  expect(inputPreview(steps[at], steps[at - 1]).columns).toContain('HoTen');
});

it('2.4 shows the sorted column in the input of its ORDER BY step', () => {
  const { steps } = lessonBlocks('2-4-sap-xep-va-top');
  const at = steps.findIndex(s => s.clause === 'ORDER BY');
  expect(inputPreview(steps[at], steps[at - 1]).columns).toContain('Ngày vào làm');
});

it('no lesson promises a check query the drawer no longer shows', () => {
  const dir = 'src/content/lessons';
  for (const file of readdirSync(dir)) {
    const text = readFileSync(`${dir}/${file}`, 'utf8');
    expect(text, file).not.toMatch(/câu `SELECT` riêng|drawer[^.\n]*câu kiểm|từng câu kiểm/);
  }
});
