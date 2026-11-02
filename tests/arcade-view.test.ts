import { it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ArcadeTable from '../src/components/islands/ArcadeTable';
import { arcadeUrl, chapterView, linePath, mapPoints, nextItem, stationPercent, testRows, type ChallengeCard } from '../src/lib/arcade-view';
import type { PublicChallenge, PublicTest, TestResult } from '../src/lib/arcade-types';
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

const unitTest = (id: number): PublicTest => ({ id, rows: { T: [['x']] }, expected: [['x']] });
const challenge: PublicChallenge = {
  id: 'c', chapter: '2-1', order: 1, title: 't', difficulty: 'de', lessons: ['l'], prompt: 'p', columns: ['a'], resultTypes: ['varchar'],
  ordered: false, tables: { T: { a: 'varchar(10)' } }, tests: [unitTest(1), unitTest(2)], hiddenTests: [3, 4, 5],
};
const passed = (id: number, ok: boolean): TestResult => ({ id, shown: false, passed: ok });

it('lists unit, opened and locked tests in id order', () => {
  expect(testRows(challenge, [unitTest(3)], null, null).map(r => [r.id, r.kind])).toEqual([[1, 'unit'], [2, 'unit'], [3, 'opened'], [4, 'hidden'], [5, 'hidden']]);
});

it('takes status from the last submission when nothing ran yet', () => {
  expect(testRows(challenge, [], [3], null).find(r => r.id === 3)?.status).toBe('failed');
  expect(testRows(challenge, [], [3], null).find(r => r.id === 4)?.status).toBe('passed');
  expect(testRows(challenge, [], null, null).find(r => r.id === 3)?.status).toBe('idle');
});

it('lets the latest results win over the last submission', () => {
  const rows = testRows(challenge, [], [3], [passed(3, true), passed(1, false)]);
  expect(rows.find(r => r.id === 3)?.status).toBe('passed');
  expect(rows.find(r => r.id === 1)?.status).toBe('failed');
  expect(rows.find(r => r.id === 1)?.result).toEqual(passed(1, false));
});

it('keeps the last submission for tests a run did not cover', () => {
  expect(testRows(challenge, [], [5], [passed(1, true)]).find(r => r.id === 5)?.status).toBe('failed');
});

it('gives a locked test no data', () => {
  expect(testRows(challenge, [], null, null).find(r => r.id === 4)?.test).toBeNull();
  expect(testRows(challenge, [unitTest(4)], null, null).find(r => r.id === 4)?.test?.id).toBe(4);
});

it('does not list an opened test twice when it is also a unit test id', () => {
  expect(testRows(challenge, [unitTest(1)], null, null).filter(r => r.id === 1)).toHaveLength(1);
});

it('marks spaces at the ends of a text, which a table would swallow', () => {
  const html = renderToStaticMarkup(createElement(ArcadeTable, { columns: ['a'], rows: [['  An '], ['B C']] }));
  expect(html).toContain('<td><span class="ac-space" title="dấu cách">··</span>An<span class="ac-space" title="dấu cách">·</span></td>');
  expect(html).toContain('<td>B C</td>');
});

it('shows an empty string apart from an empty cell', () => {
  const html = renderToStaticMarkup(createElement(ArcadeTable, { columns: ['a'], rows: [['']] }));
  expect(html).toContain('<td><span class="ac-space">(chuỗi rỗng)</span></td>');
});
