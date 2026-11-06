import type { CatalogEntry } from '../../src/lib/catalog';

/** The 52 course entries: "<num> <area>[ full]". */
export const EXPECTED = [
  '1.1 A1 full', '1.2 A1 full', '1.3 A1 full', '1.4 A1 full', '1.5 A1 full',
  '2.1 A2 full', '2.2 A2 full', '2.3 A2 full', '2.4 A2 full', '2.5 A2 full', '2.6 A2 full', '2.7 A3 full', '2.8 A3 full', '2.9 A3 full',
  '3.1 A5 full', '3.2 A5 full', '3.3 A5 full', '3.4 A4 full', '3.5 A4 full', '3.6 A4 full', '3.7 A4 full', '3.8 A4 full', '3.9 A4 full', '3.10 A4 full', '3.11 A4 full',
  '3.12 A5 full', '3.13 A5 full', '3.14 A5', '3.15 A5', '3.16 A5 full', '3.17 A5', '3.18 A5 full', '3.19 A6 full',
  '4.1 A1', '4.2 A1', '4.3 A7', '4.4 A7', '4.5 A6', '4.6 A7', '4.7 A7', '4.8 A5 full', '4.9 A6', '4.10 A6', '4.11 A7',
  '5.1 A8', '5.2 A8', '5.3 A8', '5.4 A8', '5.5 A8', '5.6 A8 full', '5.7 A8', '5.8 A8',
];

export const ALL_NUMS = EXPECTED.map(e => e.split(' ')[0]);

/** A valid catalog shaped like the real one; titles are the lesson numbers. */
export function fakeCatalog(): CatalogEntry[] {
  return EXPECTED.map(e => {
    const [num, area, full] = e.split(' ');
    return {
      num,
      slug: `${num.replace('.', '-')}-x`,
      title: num,
      shortTitle: num,
      level: Number(num.split('.')[0]) as CatalogEntry['level'],
      area: area as CatalogEntry['area'],
      kind: full ? 'full' : 'summary',
      minutes: 10,
      prerequisites: [],
      goal: 'g',
      excel: 'e',
      summary: 's',
    };
  });
}
