import { z } from 'astro/zod';

/** Lecture decks reference lessons without becoming progress-bearing lessons themselves. */
export const presentationSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  sourceLessons: z.array(z.string().regex(/^[1-6]\.(10|[1-9])$/)).min(1),
  keywords: z.array(z.string().min(1)).min(1),
  minutes: z.number().int().positive(),
}).strict();

export interface PresentationEntry extends z.infer<typeof presentationSchema> { slug: string }
export type PresentationNavEntry = Pick<PresentationEntry, 'slug' | 'title' | 'sourceLessons'>;

export function sortPresentations<T extends { slug: string }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => a.slug.localeCompare(b.slug, 'vi'));
}

export function validatePresentations(entries: PresentationEntry[], lessonNums: string[]): string[] {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const knownLessons = new Set(lessonNums);
  for (const entry of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) errors.push(`invalid presentation slug ${entry.slug}`);
    if (slugs.has(entry.slug)) errors.push(`duplicate presentation slug ${entry.slug}`);
    slugs.add(entry.slug);
    const sources = new Set<string>();
    for (const num of entry.sourceLessons) {
      if (!knownLessons.has(num)) errors.push(`${entry.slug}: unknown source lesson ${num}`);
      if (sources.has(num)) errors.push(`${entry.slug}: duplicate source lesson ${num}`);
      sources.add(num);
    }
  }
  return errors;
}

export function presentationNavEntries(entries: PresentationEntry[]): PresentationNavEntry[] {
  return sortPresentations(entries).map(({ slug, title, sourceLessons }) => ({ slug, title, sourceLessons }));
}

export function presentationsForLesson<T extends PresentationNavEntry>(entries: T[], num: string): T[] {
  return entries.filter(entry => entry.sourceLessons.includes(num));
}

export function presentationsForLevel<T extends PresentationNavEntry>(entries: T[], level: number): T[] {
  return entries.filter(entry => entry.sourceLessons.some(num => Number(num.split('.')[0]) === level));
}
