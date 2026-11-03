import { it, expect } from 'vitest';
import { challengeSchema, checkChallenge } from '../src/lib/arcade-schema';
import type { Challenge } from '../src/lib/arcade-types';

const good = (): Challenge => ({
  id: 'chon-hai-cot', chapter: '2-1', order: 1, title: 't', difficulty: 'de', lessons: ['2-1-chon-cot-dat-ten-cot'],
  prompt: 'p', columns: ['a'], resultTypes: ['varchar'], ordered: false,
  tables: { T: { a: 'varchar(10) NOT NULL' } }, answer: 'SELECT a FROM T',
  tests: [
    { id: 1, visible: true, rows: { T: [['x']] }, expected: [['x']] },
    { id: 2, visible: true, rows: { T: [['y']] }, expected: [['y']] },
    { id: 3, visible: false, rows: { T: [['z']] }, expected: [['z']], catches: 'SELECT TOP 1 a FROM T' },
    { id: 4, visible: false, rows: { T: [['u']] }, expected: [['u']], catches: 'SELECT TOP 2 a FROM T' },
    { id: 5, visible: false, rows: { T: [] }, expected: [], catches: 'SELECT TOP 3 a FROM T' },
  ],
});
const ctx = { lessons: ['2-1-chon-cot-dat-ten-cot'], folder: '2-1' };
const problems = (change: (c: Challenge) => void) => {
  const c = good();
  change(c);
  return checkChallenge(c, ctx);
};
const only = (text: string) => [expect.stringContaining(text)];

it('finds nothing wrong with a sound challenge', () => {
  expect(checkChallenge(good(), ctx)).toEqual([]);
});

it('counts unit and hidden tests', () => {
  expect(problems(c => { c.tests.splice(1, 1); })).toEqual(only('ít nhất 2 unit test'));
  expect(problems(c => { c.tests.splice(4, 1); })).toEqual(only('ít nhất 3 hidden test'));
});

it('wants a wrong statement on each hidden test and none on a unit test', () => {
  expect(problems(c => { delete c.tests[2].catches; })).toEqual(only('thiếu catches'));
  expect(problems(c => { c.tests[0].catches = 'SELECT 1'; })).toEqual(only('unit test không có catches'));
});

it('refuses duplicate test ids', () => {
  expect(problems(c => { c.tests[1].id = 1; })).toEqual(only('trùng test'));
});

it('checks rows against the declared tables', () => {
  expect(problems(c => { c.tests[0].rows = { X: [['a']] }; })).toEqual(only('chưa khai bảng'));
  expect(problems(c => { c.tests[0].rows = { T: [['a', 'b']] }; })).toEqual(only('sai số cột'));
});

it('wants one result type per column', () => {
  expect(problems(c => { c.resultTypes = []; })).toEqual(only('resultTypes'));
});

it('refuses answers that depend on today', () => {
  for (const fn of ['GETDATE()', 'SYSDATETIME()', 'GETUTCDATE()', 'CURRENT_TIMESTAMP']) {
    expect(problems(c => { c.answer = `SELECT ${fn} AS a`; }), fn).toEqual(only('ngày hiện tại'));
  }
});

it('wants N before Vietnamese text in the answer and the wrong statements', () => {
  expect(problems(c => { c.answer = "SELECT a FROM T WHERE a = 'Hà'"; })).toEqual(only('thiếu N'));
  expect(problems(c => { c.tests[2].catches = "SELECT a FROM T WHERE a = 'Hà'"; })).toEqual(only('thiếu N'));
});

it('checks the lessons and the folder', () => {
  expect(problems(c => { c.lessons = ['9-9-khong-co']; })).toEqual(only('không có trong khóa học'));
  expect(problems(c => { c.chapter = '2-2'; })).toEqual(only('thư mục'));
});

it('accepts a sound challenge in the schema, with hidden as the default for tests', () => {
  const raw = good() as unknown as { tests: { visible?: boolean }[] };
  delete raw.tests[2].visible;
  const parsed = challengeSchema.safeParse(raw);
  expect(parsed.success).toBe(true);
  expect(parsed.data?.tests[2].visible).toBe(false);
});

it('refuses a date that YAML read as a Date object', () => {
  const raw = good() as unknown as { tests: { rows: Record<string, unknown[][]> }[] };
  raw.tests[0].rows.T = [[new Date('2026-10-21')]];
  expect(challengeSchema.safeParse(raw).success).toBe(false);
});
