import { it, expect } from 'vitest';
import * as R from '../src/lib/roadmap';
import { emptyState, demoState, markSeen, toggleDone } from '../src/lib/progress';
import { fakeCatalog, ALL_NUMS } from './helpers/expected';

const NOW = new Date(2026, 9, 17, 9, 0).getTime();
const CAT = fakeCatalog();
const doneAll = (nums: string[]) => nums.reduce((s, n) => toggleDone(markSeen(s, n, NOW), n, NOW), emptyState());

it('auto-opens on the first visit and after 24 hours, not before', () => {
  expect([R.shouldAutoOpen(null, NOW), R.shouldAutoOpen(NOW - R.DAY_MS, NOW), R.shouldAutoOpen(NOW - R.DAY_MS + 1, NOW)]).toEqual([true, true, false]);
});
it('picks the lesson to resume', () => {
  expect(R.resumeTarget(emptyState(), CAT)?.num).toBe('1.1');
  expect(R.resumeTarget(demoState(NOW), CAT)?.num).toBe('3.5');
  expect(R.resumeTarget(doneAll(['3.4']), CAT)?.num).toBe('3.5');
  expect(R.resumeTarget(doneAll(['6.7']), CAT)?.num).toBe('1.1');
  expect(R.resumeTarget(doneAll(ALL_NUMS), CAT)).toBeNull();
});
it('summarises levels like the mockup', () => {
  expect(R.levelSummaries(demoState(NOW), CAT, 3)).toEqual([
    { level: 1, done: 6, total: 6, flags: 0, state: 'done' },
    { level: 2, done: 8, total: 9, flags: 1, state: 'partial' },
    { level: 3, done: 4, total: 10, flags: 0, state: 'current' },
    { level: 4, done: 0, total: 10, flags: 0, state: 'todo' },
    { level: 5, done: 0, total: 9, flags: 0, state: 'todo' },
    { level: 6, done: 0, total: 7, flags: 0, state: 'todo' },
  ]);
});
it('finds the earliest flagged lesson', () => expect(R.firstFlagged(demoState(NOW), CAT)?.num).toBe('2.8'));
it('formats the last visit in Vietnamese', () => {
  expect(R.formatLastVisit(new Date(2026, 9, 3, 20, 0).getTime(), NOW)).toBe('Cách đây 14 ngày (thứ Bảy, 3/10)');
  expect(R.formatLastVisit(new Date(2026, 9, 16, 23, 30).getTime(), NOW)).toBe('Hôm qua (thứ Sáu, 16/10)');
  expect(R.formatLastVisit(new Date(2026, 9, 17, 7, 0).getTime(), NOW)).toBe('Hôm nay');
});
it('opens the course menu on the level of the lesson being read, else of the lesson to continue', () => {
  const started = markSeen(emptyState(), '3.2', NOW);
  expect([R.menuOpenLevel(started, CAT, '1.4'), R.menuOpenLevel(started, CAT), R.menuOpenLevel(doneAll(ALL_NUMS), CAT)]).toEqual([1, 3, 1]);
});
