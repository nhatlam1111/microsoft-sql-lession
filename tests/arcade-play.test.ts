import { it, expect } from 'vitest';
import { ARCADE_CHAPTERS, ARCADE_RULES } from '../src/data/arcade';
import { isUnlocked, publicChallenge, publicTest, sortChallenges } from '../src/lib/arcade-play';
import type { Challenge, ChallengeTest } from '../src/lib/arcade-types';

const test = (id: number, visible: boolean, value: string): ChallengeTest => ({
  id, visible, rows: { T: [[value]] }, expected: [[value]],
  ...(visible ? {} : { catches: 'SELECT TOP 1 a FROM T' }),
});
const challenge: Challenge = {
  id: 'x', chapter: '2-1', order: 1, title: 't', difficulty: 'de', lessons: ['2-1-chon-cot-dat-ten-cot'],
  prompt: 'p', columns: ['a'], resultTypes: ['varchar'], ordered: false, tables: { T: { a: 'varchar(10) NOT NULL' } },
  answer: 'SELECT a FROM T WHERE a IS NOT NULL',
  tests: [test(1, true, 'mo'), test(2, true, 'hai'), test(3, false, 'BAT-MAT'), test(4, false, 'BAT-MAT'), test(5, false, 'BAT-MAT')],
};

it('sorts by chapter, then by order inside a chapter', () => {
  expect(sortChallenges([{ chapter: '2-2', order: 1 }, { chapter: '2-1', order: 2 }, { chapter: '2-1', order: 1 }]))
    .toEqual([{ chapter: '2-1', order: 1 }, { chapter: '2-1', order: 2 }, { chapter: '2-2', order: 1 }]);
});

it('sorts chapters by number, not by text', () => {
  expect(sortChallenges([{ chapter: '2-10', order: 1 }, { chapter: '2-9', order: 1 }]).map(c => c.chapter)).toEqual(['2-9', '2-10']);
});

it('leaves the list it was given as it was', () => {
  const list = [{ chapter: '2-2', order: 1 }, { chapter: '2-1', order: 1 }];
  sortChallenges(list);
  expect(list[0].chapter).toBe('2-2');
});

it('opens the first challenge, the one after a completed challenge, and any completed one', () => {
  const ids = ['a', 'b', 'c'];
  expect(isUnlocked(ids, new Set(), 'a')).toBe(true);
  expect(isUnlocked(ids, new Set(), 'b')).toBe(false);
  expect(isUnlocked(ids, new Set(['a']), 'b')).toBe(true);
  expect(isUnlocked(ids, new Set(['c']), 'c')).toBe(true);
  expect(isUnlocked(ids, new Set(['a']), 'c')).toBe(false);
});

it('does not open a challenge that is not in the list', () => {
  expect(isUnlocked(['a'], new Set(['a']), 'zz')).toBe(false);
});

it('keeps only public data', () => {
  const p = publicChallenge(challenge);
  expect(p.tests.map(t => t.id)).toEqual([1, 2]);
  expect(p.hiddenTests).toEqual([3, 4, 5]);
  expect(JSON.stringify(p)).not.toContain('BAT-MAT');
  expect(JSON.stringify(p)).not.toContain(challenge.answer);
  expect(JSON.stringify(p)).not.toContain('catches');
});

it('a public test carries its data and nothing about the mistake it catches', () => {
  expect(publicTest(test(3, false, 'v'))).toEqual({ id: 3, rows: { T: [['v']] }, expected: [['v']] });
});

it('the rules and chapters match the approved design', () => {
  expect(ARCADE_RULES).toEqual({ startCoins: 20, openCost: 10, reward: { de: 10, vua: 20, kho: 30 }, testTimeoutMs: 5000 });
  expect(ARCADE_CHAPTERS.map(c => c.size)).toEqual([5, 6, 7, 5, 5, 4, 6, 6, 6]);
  expect(ARCADE_CHAPTERS.map(c => c.id)).toEqual(['2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7', '2-8', '2-9']);
});
