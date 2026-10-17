import type { CatalogEntry } from '../../src/lib/catalog';

/** The 51 lessons of the design: "<num> <area>[ full]". */
export const EXPECTED = [
  '1.1 A1 full', '1.2 A1', '1.3 A1', '1.4 A1', '1.5 A1', '1.6 A2',
  '2.1 A2', '2.2 A2', '2.3 A2', '2.4 A2', '2.5 A2', '2.6 A2', '2.7 A3', '2.8 A3', '2.9 A3',
  '3.1 A5', '3.2 A5', '3.3 A5', '3.4 A4', '3.5 A4 full', '3.6 A4', '3.7 A4', '3.8 A4', '3.9 A4', '3.10 A5',
  '4.1 A5', '4.2 A5', '4.3 A5', '4.4 A5', '4.5 A5', '4.6 A6', '4.7 A6', '4.8 A6', '4.9 A6', '4.10 A6',
  '5.1 A1', '5.2 A1', '5.3 A7', '5.4 A7', '5.5 A6', '5.6 A7', '5.7 A7', '5.8 A7', '5.9 A7',
  '6.1 A8', '6.2 A8', '6.3 A8', '6.4 A8', '6.5 A8 full', '6.6 A8', '6.7 A8',
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
