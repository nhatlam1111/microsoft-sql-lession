import { it, expect } from 'vitest';
import { checkOne, expectedShape, fillExpected, type ArcadeRun } from '../api/src/arcade-check';
import type { RunOutcome } from '../api/src/core';
import type { Challenge, ChallengeTest } from '../src/lib/arcade-types';

type Rows = string[][];
const outcome = (rows: Rows): RunOutcome => ({
  shape: { columns: [{ name: 'a', type: 'varchar' }], rows }, affected: [rows.length], check: null, error: null, errorKind: null, ms: 1,
});
const failed = (error: string): RunOutcome => ({ shape: null, affected: [], check: null, error, errorKind: null, ms: 1 });

/** A pretend database: the rows come from the test's own INSERT, in insert order. */
const STATEMENTS: Record<string, (rows: Rows) => RunOutcome> = {
  'SELECT a FROM T': rows => outcome(rows),
  'SELECT TOP 1 a FROM T': rows => outcome(rows.slice(0, 1)),
  'SELECT a FROM T ORDER BY a': rows => outcome([...rows].sort()),
  'SELECT TOP 0 a FROM T': () => outcome([]),
  'SELECT bad FROM T': () => failed("Invalid column name 'bad'."),
};
const run: ArcadeRun = async (text, _check, setup = '') => {
  const rows = [...setup.matchAll(/\('([^']*)'\)/g)].map(m => [m[1]]);
  return STATEMENTS[text](rows);
};

const unit = (id: number, value: string): ChallengeTest => ({ id, visible: true, rows: { T: [[value]] }, expected: [[value]] });
const hidden = (id: number, x: string, y: string, catches = 'SELECT TOP 1 a FROM T'): ChallengeTest =>
  ({ id, visible: false, rows: { T: [[x], [y]] }, expected: [[x], [y]], catches });
const challenge = (over: Partial<Challenge> = {}): Challenge => ({
  id: 'x', chapter: '2-1', order: 1, title: 't', difficulty: 'de', lessons: ['l'], prompt: 'p',
  columns: ['a'], resultTypes: ['varchar'], ordered: false, tables: { T: { a: 'varchar(10) NOT NULL' } },
  answer: 'SELECT a FROM T',
  tests: [unit(1, 'mot'), unit(2, 'hai'), hidden(3, 'ba', 'bon'), hidden(4, 'nam', 'sau'), hidden(5, 'bay', 'tam')],
  ...over,
});
const mentions = (problems: string[], ...words: string[]) => problems.some(p => words.every(w => p.includes(w)));

it('passes a sound challenge', async () => {
  expect(await checkOne(challenge(), run)).toEqual([]);
});

it('reports an answer that differs from expected', async () => {
  const c = challenge();
  c.tests[1].expected = [['khac']];
  expect(mentions(await checkOne(c, run), 'test 2', 'khác expected')).toBe(true);
});

it('reports an answer that fails on a test', async () => {
  expect(mentions(await checkOne(challenge({ answer: 'SELECT bad FROM T' }), run), 'test 1', "Invalid column name 'bad'.")).toBe(true);
});

it('reports a wrong statement that already fails a unit test', async () => {
  const c = challenge();
  c.tests[2].catches = 'SELECT TOP 0 a FROM T';
  expect(mentions(await checkOne(c, run), 'catches của test 3', 'trượt unit test 1')).toBe(true);
});

it('reports a hidden test that does not catch its wrong statement', async () => {
  const c = challenge();
  c.tests[2].catches = 'SELECT a FROM T';
  expect(mentions(await checkOne(c, run), 'không bắt được test 3')).toBe(true);
});

it('wants at least one unit test that returns rows', async () => {
  const c = challenge({ answer: 'SELECT TOP 0 a FROM T' });
  c.tests = c.tests.map(t => ({ ...t, expected: [] }));
  expect(mentions(await checkOne(c, run), 'không unit test nào ra dữ liệu')).toBe(true);
});

it('reports an ordered result that hangs on the insert order', async () => {
  const c = challenge({ ordered: true });
  expect(mentions(await checkOne(c, run), 'test 3', 'phụ thuộc thứ tự chèn')).toBe(true);
});

it('accepts an ordered result that a real sort settles', async () => {
  const c = challenge({ ordered: true, answer: 'SELECT a FROM T ORDER BY a' });
  c.tests[2].expected = [['ba'], ['bon']];
  c.tests[3].expected = [['nam'], ['sau']];
  c.tests[4].expected = [['bay'], ['tam']];
  expect(await checkOne(c, run)).toEqual([]);
});

it('reports what the guard refuses', async () => {
  expect(mentions(await checkOne(challenge({ answer: 'DELETE FROM T' }), run), 'bộ chặn')).toBe(true);
  const c = challenge();
  c.tests[2].catches = 'DROP TABLE T';
  expect(mentions(await checkOne(c, run), 'catches của test 3', 'bộ chặn')).toBe(true);
});

it('fills expected and result types from the answer', async () => {
  const c = challenge({ resultTypes: [] });
  c.tests = c.tests.map(t => ({ ...t, expected: [] }));
  const filled = await fillExpected(c, run);
  expect(filled.resultTypes).toEqual(['varchar']);
  expect(filled.expected[1]).toEqual([['mot']]);
  expect(filled.expected[3]).toEqual([['ba'], ['bon']]);
});

it('stops filling when the answer fails', async () => {
  await expect(fillExpected(challenge({ answer: 'SELECT bad FROM T' }), run)).rejects.toThrow(/test 1.*Invalid column/);
});

it('gives a test its expected result in the shape the grader compares', () => {
  const c = challenge();
  expect(expectedShape(c, c.tests[0])).toEqual({ columns: [{ name: 'a', type: 'varchar' }], rows: [['mot']] });
});
