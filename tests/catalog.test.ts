import { it, expect } from 'vitest';
import { compareNum, groupLevelLessons, validateCatalog, neighbors, navEntries } from '../src/lib/catalog';
import { LEVELS } from '../src/data/curriculum';
import { fakeCatalog } from './helpers/expected';

it('sorts lesson numbers numerically', () => {
  expect(['3.12', '3.10', '3.9', '3.11', '1.2', '3.1'].sort(compareNum)).toEqual(['1.2', '3.1', '3.9', '3.10', '3.11', '3.12']);
});
it('reports every rule violation', () => {
  const base = { title: 't', shortTitle: 't', area: 'A1', kind: 'summary', minutes: 5, goal: 'g', excel: 'e', summary: 's' } as const;
  const errors = validateCatalog([
    { ...base, slug: '1-1-a', num: '1.1', level: 1, prerequisites: [] },
    { ...base, slug: '1-1-b', num: '1.1', level: 1, prerequisites: [] },
    { ...base, slug: '2-1-c', num: '2.1', level: 3, prerequisites: ['9.9'] },
    { ...base, slug: '2-2-d', num: '2.2', level: 2, prerequisites: ['2.3'] },
    { ...base, slug: 'x-2-3', num: '2.3', level: 2, prerequisites: [] },
  ]);
  expect(errors).toEqual(expect.arrayContaining([
    'duplicate num 1.1',
    '2.1: level 3 does not match',
    '2.1: unknown prerequisite 9.9',
    '2.2: prerequisite 2.3 is not earlier',
    '2.3: slug x-2-3 must start with 2-3-',
  ]));
});
it('accepts the expected catalog shape', () => expect(validateCatalog(fakeCatalog())).toEqual([]));
it('finds neighbours across levels', () => {
  const n = neighbors(fakeCatalog(), '1.5');
  expect([n.prev?.num, n.next?.num]).toEqual(['1.4', '2.1']);
  expect(neighbors(fakeCatalog(), '1.1').prev).toBeUndefined();
});

it('gives the course menu and the roadmap popup only the lesson fields they show', () => {
  const nav = navEntries(fakeCatalog());
  expect(nav).toHaveLength(fakeCatalog().length);
  expect(Object.keys(nav[0]).sort()).toEqual(['level', 'num', 'shortTitle', 'slug', 'title']);
});

it('groups lessons 5.4 through 5.8 under data rescue within Administrator', () => {
  const groups = groupLevelLessons(navEntries(fakeCatalog()), LEVELS[4]);
  expect(groups.map(({ title, lessons }) => [title, lessons.map(lesson => lesson.num)])).toEqual([
    [undefined, ['5.1', '5.2', '5.3']],
    ['Cấp cứu dữ liệu', ['5.4', '5.5', '5.6', '5.7', '5.8']],
  ]);
});
