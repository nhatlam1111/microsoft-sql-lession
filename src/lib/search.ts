import type { AreaDef } from '../data/curriculum';
import { sortCatalog, type CatalogEntry } from './catalog';
import { sortAppendices, type AppendixEntry } from './appendices';
import { appendixUrl, lessonUrl } from './paths';

/** Search is the only place where course lessons and reference articles share an index. */
export interface SearchItem {
  num: string;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  keywords: string[];
  href: string;
  section: 'lesson' | 'appendix';
  groupLabel: string;
  level?: number;
}

export function createSearchItems(catalog: CatalogEntry[], appendices: AppendixEntry[], areas: AreaDef[]): SearchItem[] {
  const areaName = new Map(areas.map(a => [a.id, a.name]));
  return [
    ...sortCatalog(catalog).map(entry => ({
      num: entry.num, slug: entry.slug, title: entry.title, shortTitle: entry.shortTitle,
      summary: entry.summary, keywords: [entry.excel], href: lessonUrl(entry.slug),
      section: 'lesson' as const, groupLabel: areaName.get(entry.area) ?? '', level: entry.level,
    })),
    ...sortAppendices(appendices).map(entry => ({
      num: entry.num, slug: entry.slug, title: entry.title, shortTitle: entry.shortTitle,
      summary: entry.summary, keywords: entry.keywords, href: appendixUrl(entry.slug),
      section: 'appendix' as const, groupLabel: 'Phụ lục · Tra cứu',
    })),
  ];
}

/** Lower case, no diacritics, đ → d, single spaces: "Kết bảng ĐỒNG" → "ket bang dong". */
export function normalizeVi(s: string): string {
  return s
    .normalize('NFC')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Lessons matching every word of the query, ranked: exact lesson number, then words found in the
 * title, then words found anywhere (summary, Excel feature, area name). Ties keep roadmap order.
 */
export function searchItems(items: SearchItem[], query: string, limit = 8): SearchItem[] {
  const q = normalizeVi(query);
  if (!q) return [];
  const words = q.split(' ');
  const hasAll = (text: string) => { const t = normalizeVi(text); return words.every(w => t.includes(w)); };

  const ranked: { entry: SearchItem; rank: number }[] = [];
  for (const entry of items) {
    let rank = 0;
    if (normalizeVi(entry.num) === q) rank = 3;
    else if (hasAll(`${entry.title} ${entry.shortTitle}`)) rank = 2;
    else if (hasAll(`${entry.num} ${entry.title} ${entry.shortTitle} ${entry.summary} ${entry.keywords.join(' ')} ${entry.groupLabel}`)) rank = 1;
    if (rank > 0) ranked.push({ entry, rank });
  }
  return ranked
    .map((r, i) => ({ ...r, i }))
    .sort((a, b) => b.rank - a.rank || a.i - b.i)
    .slice(0, limit)
    .map(r => r.entry);
}

/** Main-course searches retain their public result type and ranking. */
export function searchLessons(catalog: CatalogEntry[], query: string, areas: AreaDef[], limit = 8): CatalogEntry[] {
  const bySlug = new Map(catalog.map(entry => [entry.slug, entry]));
  return searchItems(createSearchItems(catalog, [], areas), query, limit).map(entry => bySlug.get(entry.slug)!);
}
