import type { AreaDef } from '../data/curriculum';
import { sortCatalog, type CatalogEntry } from './catalog';

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
export function searchLessons(catalog: CatalogEntry[], query: string, areas: AreaDef[], limit = 8): CatalogEntry[] {
  const q = normalizeVi(query);
  if (!q) return [];
  const words = q.split(' ');
  const areaName = new Map(areas.map(a => [a.id, a.name]));
  const hasAll = (text: string) => { const t = normalizeVi(text); return words.every(w => t.includes(w)); };

  const ranked: { entry: CatalogEntry; rank: number }[] = [];
  for (const entry of sortCatalog(catalog)) {
    let rank = 0;
    if (entry.num === q) rank = 3;
    else if (hasAll(`${entry.title} ${entry.shortTitle}`)) rank = 2;
    else if (hasAll(`${entry.num} ${entry.title} ${entry.shortTitle} ${entry.summary} ${entry.excel} ${areaName.get(entry.area) ?? ''}`)) rank = 1;
    if (rank > 0) ranked.push({ entry, rank });
  }
  return ranked
    .map((r, i) => ({ ...r, i }))
    .sort((a, b) => b.rank - a.rank || a.i - b.i)
    .slice(0, limit)
    .map(r => r.entry);
}
