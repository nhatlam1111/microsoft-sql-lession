import { z } from 'astro/zod';

export const APPENDIX_SLUGS = {
  'PL.1': 'pl-1-chi-tiet-kieu-du-lieu',
  'PL.2': 'pl-2-chuyen-doi-kieu-du-lieu',
  'PL.3': 'pl-3-ham-xu-ly-chuoi',
  'PL.4': 'pl-4-tinh-toan-va-lam-tron',
  'PL.5': 'pl-5-ham-ngay-gio',
  'PL.6': 'pl-6-null-va-dieu-kien',
} as const;

export const appendixSchema = z.object({
  num: z.enum(['PL.1', 'PL.2', 'PL.3', 'PL.4', 'PL.5', 'PL.6']),
  title: z.string().min(1),
  shortTitle: z.string().min(1).max(28),
  summary: z.string().min(1),
  keywords: z.array(z.string().min(1)).min(1),
  relatedLessons: z.array(z.string()).default([]),
}).strict();

export interface AppendixEntry extends z.infer<typeof appendixSchema> { slug: string }
export type AppendixNavEntry = Pick<AppendixEntry, 'num' | 'slug' | 'title' | 'shortTitle'>;

export function sortAppendices<T extends { num: string }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => Number(a.num.slice(3)) - Number(b.num.slice(3)));
}

/** The reference chapter is bounded and independent of the numbered learning path. */
export function validateAppendices(entries: AppendixEntry[], lessonNums: string[]): string[] {
  const errors: string[] = [];
  const nums = new Set<string>();
  const slugs = new Set<string>();
  const knownLessons = new Set(lessonNums);
  for (const entry of entries) {
    if (nums.has(entry.num)) errors.push(`duplicate appendix num ${entry.num}`);
    if (slugs.has(entry.slug)) errors.push(`duplicate appendix slug ${entry.slug}`);
    nums.add(entry.num);
    slugs.add(entry.slug);
    if (APPENDIX_SLUGS[entry.num] !== entry.slug) errors.push(`${entry.num}: unexpected slug ${entry.slug}`);
    for (const related of entry.relatedLessons) {
      if (!knownLessons.has(related)) errors.push(`${entry.num}: unknown related lesson ${related}`);
    }
  }
  for (const num of Object.keys(APPENDIX_SLUGS)) {
    if (!nums.has(num)) errors.push(`missing appendix ${num}`);
  }
  return errors;
}

export function appendixNavEntries(entries: AppendixEntry[]): AppendixNavEntry[] {
  return sortAppendices(entries).map(({ num, slug, title, shortTitle }) => ({ num, slug, title, shortTitle }));
}

export function appendixNeighbors(entries: AppendixEntry[], num: string): { prev?: AppendixEntry; next?: AppendixEntry } {
  const sorted = sortAppendices(entries);
  const index = sorted.findIndex(e => e.num === num);
  return index < 0 ? {} : { prev: sorted[index - 1], next: sorted[index + 1] };
}
