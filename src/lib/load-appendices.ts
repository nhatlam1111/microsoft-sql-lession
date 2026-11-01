import { getCollection } from 'astro:content';
import { sortAppendices, validateAppendices, type AppendixEntry } from './appendices';
import { loadCatalog } from './load-catalog';

export async function loadAppendices(): Promise<AppendixEntry[]> {
  const [entries, catalog] = await Promise.all([getCollection('appendices'), loadCatalog()]);
  const appendices = sortAppendices(entries.map(e => ({ slug: e.id, ...e.data })));
  const errors = validateAppendices(appendices, catalog.map(e => e.num));
  if (errors.length) throw new Error(`Danh mục phụ lục có lỗi:\n${errors.join('\n')}`);
  return appendices;
}
