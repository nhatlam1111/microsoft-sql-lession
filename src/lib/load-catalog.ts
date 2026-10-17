import { getCollection } from 'astro:content';
import { sortCatalog, validateCatalog, type CatalogEntry } from './catalog';

/** All lessons in roadmap order; stops the build when the catalog breaks a rule. */
export async function loadCatalog(): Promise<CatalogEntry[]> {
  const entries = await getCollection('lessons');
  const catalog = sortCatalog(entries.map(e => ({ slug: e.id, ...e.data })));
  const errors = validateCatalog(catalog);
  if (errors.length) throw new Error(`Danh mục bài có lỗi:\n${errors.join('\n')}`);
  return catalog;
}
