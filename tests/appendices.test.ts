import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  APPENDIX_SLUGS, appendixSchema, appendixNavEntries, appendixNeighbors,
  sortAppendices, validateAppendices, type AppendixEntry,
} from '../src/lib/appendices';
import { createSearchItems, searchItems, searchLessons } from '../src/lib/search';
import { appendixUrl } from '../src/lib/paths';
import { neighbors } from '../src/lib/catalog';
import { AREAS, LEVELS } from '../src/data/curriculum';
import SidebarNav from '../src/components/islands/SidebarNav';
import { readCatalog } from './helpers/lessons';
import { readAppendices } from './helpers/appendices';

const main = readCatalog();
const references = (): AppendixEntry[] => Object.entries(APPENDIX_SLUGS).map(([num, slug]) => ({
  slug,
  ...appendixSchema.parse({ num, title: `Tra cứu ${num}`, shortTitle: `Mục ${num}`, summary: 'Giải thích cách dùng.', keywords: ['tra cứu'] }),
}));

describe('independent reference catalog', () => {
  it('accepts the reference shape and rejects main-course metadata', () => {
    const { slug: _slug, ...data } = references()[0];
    expect(appendixSchema.safeParse(data).success).toBe(true);
    for (const extra of [{ level: 7 }, { area: 'A9' }, { minutes: 10 }, { num: '1.1' }, { num: 'PL.7' }, { keywords: [] }]) {
      expect(appendixSchema.safeParse({ ...data, ...extra }).success, JSON.stringify(extra)).toBe(false);
    }
  });

  it('requires six distinct articles and real related lesson targets', () => {
    expect(validateAppendices(references(), main.map(e => e.num))).toEqual([]);
    const entries = references();
    entries[0].relatedLessons = ['1.3', '99.1'];
    entries[1].slug = entries[0].slug;
    const errors = validateAppendices([...entries.slice(0, 5), entries[0]], main.map(e => e.num));
    expect(errors).toEqual(expect.arrayContaining([
      'PL.1: unknown related lesson 99.1', `duplicate appendix slug ${entries[0].slug}`,
      'duplicate appendix num PL.1', 'missing appendix PL.6',
    ]));
  });

  it('orders references without mutating input and confines neighbors to this chapter', () => {
    const entries = references().reverse();
    const before = entries.map(e => e.num);
    expect(sortAppendices(entries).map(e => e.num)).toEqual(Object.keys(APPENDIX_SLUGS));
    expect(entries.map(e => e.num)).toEqual(before);
    expect(appendixNeighbors(entries, 'PL.1').prev).toBeUndefined();
    expect(appendixNeighbors(entries, 'PL.1').next?.num).toBe('PL.2');
    expect(appendixNeighbors(entries, 'PL.6').next).toBeUndefined();
    expect(neighbors(main, '6.7').next).toBeUndefined();
    expect(main).toHaveLength(52);
    expect(LEVELS).toHaveLength(6);
  });

  it('generates reference links under the deployment base', () => {
    expect(appendixUrl(APPENDIX_SLUGS['PL.1'])).toBe('/microsoft-sql-lession/phu-luc/pl-1-chi-tiet-kieu-du-lieu/');
    expect(appendixUrl(APPENDIX_SLUGS['PL.1'], '/')).toBe('/phu-luc/pl-1-chi-tiet-kieu-du-lieu/');
  });

  it('shows references as their own current sidebar chapter without progress icons or level counts', () => {
    const html = renderToStaticMarkup(createElement(SidebarNav, {
      catalog: main, levels: LEVELS, appendices: appendixNavEntries(references()), currentAppendixNum: 'PL.3', appendixActive: true,
    }));
    const chapter = html.slice(html.indexOf('class="side-group side-appendices"'));
    expect(chapter).toContain(`href="${appendixUrl(APPENDIX_SLUGS['PL.3'])}" aria-current="page"`);
    expect(chapter.match(/class="side-num"/g)).toHaveLength(6);
    expect(chapter).not.toMatch(/class="st |\b0\/6\b|Level 7/);
    expect(appendixNavEntries(references()).every(e => !('level' in e) && !('area' in e))).toBe(true);
  });
});

describe('combined lookup without changing the learning path', () => {
  it('finds taught aliases and function sections using the actual published metadata', () => {
    const items = createSearchItems(main, readAppendices(), AREAS);
    for (const [query, num] of [
      ['integer', 'PL.1'], ['double precision', 'PL.1'], ['character varying', 'PL.1'],
      ['national character varying', 'PL.1'], ['SUM', 'PL.4'], ['SQL_VARIANT_PROPERTY', 'PL.5'],
    ]) {
      expect(searchItems(items, query).some(entry => entry.num === num), `${query} → ${num}`).toBe(true);
    }
  });
  it('finds normalized PL numbers and keywords absent from title or summary', () => {
    const entries = references();
    entries[1].keywords = ['TRY_CONVERT', 'chuyển đổi kiểu'];
    entries[4].keywords = ['DATE_BUCKET', 'DATETRUNC'];
    const items = createSearchItems(main, entries, AREAS);
    expect(items).toHaveLength(58);
    for (const query of ['PL.2', 'pl.2', 'TRY_CONVERT', 'chuyen doi kieu']) {
      const found = searchItems(items, query)[0];
      expect(found.num, query).toBe('PL.2');
      expect(found.href).toBe(appendixUrl(entries[1].slug));
      expect(found.section).toBe('appendix');
      expect(found.level).toBeUndefined();
    }
    expect(searchItems(items, 'date_bucket')[0].num).toBe('PL.5');
    expect(searchItems(items, 'missing_function_xyz')).toEqual([]);
  });

  it('retains existing lesson ranking, deterministic chapter ordering and input data', () => {
    const before = JSON.stringify(main);
    const items = createSearchItems(main, references().reverse(), AREAS);
    for (const query of ['3.5', 'vlookup', 'ket bang']) {
      expect(searchItems(items, query).filter(e => e.section === 'lesson').map(e => e.num))
        .toEqual(searchLessons(main, query, AREAS).map(e => e.num));
    }
    expect(items.slice(52).map(e => e.num)).toEqual(Object.keys(APPENDIX_SLUGS));
    expect(JSON.stringify(main)).toBe(before);
    expect(searchItems(items, '')).toEqual([]);
    expect(searchItems(items, 'tra cuu', 2)).toHaveLength(2);
  });
});
