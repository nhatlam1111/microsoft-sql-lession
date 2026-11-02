import { it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ArcadeTable from '../src/components/islands/ArcadeTable';
import { arcadeUrl, chapterView, linePath, mapPoints, nextItem, stationPercent, type ChallengeCard } from '../src/lib/arcade-view';
import type { ArcadeChapter } from '../src/data/arcade';

const chapters: ArcadeChapter[] = [
  { id: '2-1', title: 'Một', lesson: 'l', size: 2 },
  { id: '2-2', title: 'Hai', lesson: 'l', size: 1 },
];
const challenges: ChallengeCard[] = [
  { id: 'a', chapter: '2-1', order: 1, title: 'A', difficulty: 'de' },
  { id: 'b', chapter: '2-1', order: 2, title: 'B', difficulty: 'vua' },
  { id: 'c', chapter: '2-2', order: 1, title: 'C', difficulty: 'kho' },
];

it('marks done, current and locked in play order', () => {
  const v = chapterView(chapters, challenges, new Set(['a']));
  expect(v.flatMap(c => c.items.map(i => i.status))).toEqual(['done', 'current', 'locked']);
  expect(v[0]).toMatchObject({ done: 1, total: 2 });
  expect(v[1]).toMatchObject({ done: 0, total: 1 });
});

it('numbers challenges across chapters and shows what each pays', () => {
  const v = chapterView(chapters, challenges, new Set());
  expect(v.flatMap(c => c.items.map(i => [i.n, i.reward]))).toEqual([[1, 10], [2, 20], [3, 30]]);
});

it('points at the challenge to do next, and at nothing once all are done', () => {
  expect(nextItem(chapterView(chapters, challenges, new Set(['a'])))?.id).toBe('b');
  expect(nextItem(chapterView(chapters, challenges, new Set(['a', 'b', 'c'])))).toBeNull();
});

it('leaves out chapters that have no challenges yet', () => {
  expect(chapterView(chapters, challenges.slice(0, 2), new Set()).map(c => c.id)).toEqual(['2-1']);
});

it('keeps chapter numbers when an earlier chapter has no challenges yet', () => {
  expect(chapterView(chapters, challenges.slice(2), new Set())[0].number).toBe(2);
});

it('builds the Arcade urls', () => {
  expect(arcadeUrl(undefined, '/base/')).toBe('/base/luyen-sql/');
  expect(arcadeUrl('a', '/base/')).toBe('/base/luyen-sql/a/');
});

it('spreads stations over a row, right to left on flipped rows', () => {
  expect(stationPercent(0, 5, false)).toBe(9);
  expect(stationPercent(4, 5, false)).toBe(91);
  expect(stationPercent(0, 5, true)).toBe(91);
  expect(stationPercent(4, 5, true)).toBe(9);
  expect(stationPercent(0, 1, false)).toBe(50);
});

it('places stations in pixels, one row under the other', () => {
  const p = mapPoints([2, 2], 1056);
  expect(p).toEqual([[118, 84], [938, 84], [938, 256], [118, 256]]);
});

it('draws straight along a row and curves outwards between rows', () => {
  const p = mapPoints([2, 2], 1056);
  const d = linePath(p, 1056);
  expect(d.startsWith('M118 84 L938 84 C')).toBe(true);
  const [, x] = d.match(/C(\d+)/)!;
  expect(Number(x)).toBeGreaterThan(938);
  expect(d.endsWith('L118 256')).toBe(true);
});

it('draws a curve to the left when the row ends on the left', () => {
  const left = linePath([[118, 256], [118, 428]], 1056);
  expect(Number(left.match(/C(-?\d+)/)![1])).toBeLessThan(118);
});

it('draws nothing without stations', () => {
  expect(linePath([], 1056)).toBe('');
});

it('shows NULL the way the course result tables do', () => {
  const html = renderToStaticMarkup(createElement(ArcadeTable, { columns: ['a', 'b'], rows: [['x', null], [1, 'y']] }));
  expect(html).toContain('<th>a</th>');
  expect(html).toContain('<td class="res-null">NULL</td>');
  expect(html).toContain('<td>1</td>');
  expect(html).toContain('res-grid');
});
