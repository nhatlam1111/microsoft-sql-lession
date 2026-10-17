import { it, expect } from 'vitest';
import { compareNum, validateCatalog, neighbors } from '../src/lib/catalog';
import { fakeCatalog } from './helpers/expected';

it('sorts lesson numbers numerically', () => {
  expect(['3.10', '3.9', '1.2', '3.1'].sort(compareNum)).toEqual(['1.2', '3.1', '3.9', '3.10']);
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
  const n = neighbors(fakeCatalog(), '1.6');
  expect([n.prev?.num, n.next?.num]).toEqual(['1.5', '2.1']);
  expect(neighbors(fakeCatalog(), '1.1').prev).toBeUndefined();
});
