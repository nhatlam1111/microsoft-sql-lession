import { getCollection } from 'astro:content';
import { sortPresentations, validatePresentations, type PresentationEntry } from './presentations';
import { loadCatalog } from './load-catalog';

export async function loadPresentations(): Promise<PresentationEntry[]> {
  const [entries, catalog] = await Promise.all([getCollection('presentations'), loadCatalog()]);
  const presentations = sortPresentations(entries.map(entry => ({ slug: entry.id, ...entry.data })));
  const errors = validatePresentations(presentations, catalog.map(entry => entry.num));
  if (errors.length) throw new Error(`Danh mục slide có lỗi:\n${errors.join('\n')}`);
  return presentations;
}
