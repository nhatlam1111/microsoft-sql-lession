import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  presentationSchema, presentationNavEntries, presentationsForLesson, presentationsForLevel,
  sortPresentations, validatePresentations, type PresentationEntry,
} from '../src/lib/presentations';
import { presentationUrl, presenterUrl } from '../src/lib/paths';
import { createSearchItems, searchItems, searchLessons } from '../src/lib/search';
import { AREAS, LEVELS } from '../src/data/curriculum';
import SidebarNav from '../src/components/islands/SidebarNav';
import { readCatalog } from './helpers/lessons';
import { readAppendices } from './helpers/appendices';
import { readPresentations } from './helpers/presentations';

const main = readCatalog();
const deck: PresentationEntry = {
  slug: 'lam-quen', title: 'Làm quen SQL Server', summary: 'Ôn lại phần Làm quen trong một buổi.',
  sourceLessons: ['1.1', '1.2', '1.3', '1.4', '1.5'], keywords: ['slide', 'ôn tập'], minutes: 55,
};

describe('presentation metadata stays outside course progress', () => {
  it('accepts deck metadata and rejects numbered-lesson metadata', () => {
    const { slug: _slug, ...data } = deck;
    expect(presentationSchema.safeParse(data).success).toBe(true);
    for (const extra of [{ num: '1.1' }, { level: 1 }, { sourceLessons: [] }, { sourceLessons: ['PL.1'] }, { minutes: 0 }, { keywords: [] }]) {
      expect(presentationSchema.safeParse({ ...data, ...extra }).success, JSON.stringify(extra)).toBe(false);
    }
  });

  it('checks source lesson targets, unique slugs and unique source references', () => {
    expect(validatePresentations([deck], main.map(entry => entry.num))).toEqual([]);
    expect(validatePresentations([
      { ...deck, sourceLessons: ['1.1', '1.1', '6.9'] }, deck,
      { ...deck, slug: '../bad' },
    ], main.map(entry => entry.num))).toEqual(expect.arrayContaining([
      'lam-quen: duplicate source lesson 1.1', 'lam-quen: unknown source lesson 6.9',
      'duplicate presentation slug lam-quen', 'invalid presentation slug ../bad',
    ]));
  });

  it('derives links from sources and leaves the numbered learning path intact', () => {
    const entries = [{ ...deck, slug: 'z-last' }, deck];
    expect(sortPresentations(entries).map(entry => entry.slug)).toEqual(['lam-quen', 'z-last']);
    expect(entries[0].slug).toBe('z-last');
    expect(presentationsForLesson(entries, '1.3')).toHaveLength(2);
    expect(presentationsForLesson(entries, '2.1')).toEqual([]);
    expect(presentationsForLevel(entries, 1)).toHaveLength(2);
    expect(presentationsForLevel(entries, 2)).toEqual([]);
    expect(presentationNavEntries([deck])).toEqual([{ slug: deck.slug, title: deck.title, sourceLessons: deck.sourceLessons }]);
    expect(main).toHaveLength(52);
    expect(LEVELS).toHaveLength(6);
  });

  it('creates deployment-safe audience and presenter links', () => {
    expect(presentationUrl('lam-quen')).toBe('/microsoft-sql-lession/bai-giang/lam-quen/');
    expect(presenterUrl('lam-quen')).toBe('/microsoft-sql-lession/bai-giang/lam-quen/nguoi-giang/');
    expect(presentationUrl('lam-quen', '/')).toBe('/bai-giang/lam-quen/');
    expect(presenterUrl('lam-quen', '/preview/')).toBe('/preview/bai-giang/lam-quen/nguoi-giang/');
  });

  it('adds a slide link under its source level without an extra status or progress count', () => {
    const html = renderToStaticMarkup(createElement(SidebarNav, {
      catalog: main, levels: LEVELS, currentNum: '1.1', presentations: presentationNavEntries([deck]),
    }));
    expect(html).toContain(`href="${presentationUrl(deck.slug)}" aria-label="Slide tổng hợp: ${deck.title}"`);
    const link = html.match(/<li><a href="[^"]*bai-giang\/lam-quen\/[\s\S]*?<\/li>/)?.[0];
    expect(link).toBeDefined();
    expect(link).not.toContain('st ');
    expect(html).toContain('0/5');
    expect(html).not.toContain('0/6');
  });
});

describe('presentation search', () => {
  it('finds the actual deck by its taught keywords with an explicit Slide type', () => {
    const entries = readPresentations();
    expect(entries.map(entry => entry.slug)).toContain('lam-quen');
    const items = createSearchItems(main, readAppendices(), AREAS, entries);
    const result = searchItems(items, 'slide lam quen').find(entry => entry.section === 'presentation');
    expect(result?.slug).toBe('lam-quen');
    expect(result?.num).toBe('');
    expect(result?.href).toBe(presentationUrl('lam-quen'));
    expect(result?.level).toBeUndefined();
    expect(validatePresentations(entries, main.map(entry => entry.num))).toEqual([]);
  });

  it('uses type plus slug for identity and preserves exact lesson-number ranking', () => {
    const sameSlug = { ...deck, slug: main[0].slug };
    const items = createSearchItems(main, readAppendices(), AREAS, [sameSlug]);
    expect(new Set(items.map(entry => entry.key)).size).toBe(items.length);
    expect(items.filter(entry => entry.slug === sameSlug.slug).map(entry => entry.key)).toEqual([
      `lesson:${sameSlug.slug}`, `presentation:${sameSlug.slug}`,
    ]);
    expect(searchItems(items, '1.1')[0].section).toBe('lesson');
    expect(searchItems(items, '3.5')[0].num).toBe('3.5');
    expect(searchItems(items, 'vlookup').filter(entry => entry.section === 'lesson').map(entry => entry.num))
      .toEqual(searchLessons(main, 'vlookup', AREAS).map(entry => entry.num));
  });
});
