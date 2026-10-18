import type { LessonFrontmatter } from './lesson-schema';

export interface CatalogEntry extends LessonFrontmatter { slug: string }

/** What the course menu and the roadmap popup show of a lesson; every island carries its own copy in the page, so it stays small. */
export type NavEntry = Pick<CatalogEntry, 'num' | 'slug' | 'title' | 'shortTitle' | 'level'>;

export function navEntries(catalog: CatalogEntry[]): NavEntry[] {
  return catalog.map(({ num, slug, title, shortTitle, level }) => ({ num, slug, title, shortTitle, level }));
}

const parts = (num: string) => num.split('.').map(Number);

/** Roadmap order of lesson numbers: 3.9 comes before 3.10. */
export function compareNum(a: string, b: string): number {
  const [a1, a2] = parts(a);
  const [b1, b2] = parts(b);
  return a1 - b1 || a2 - b2;
}

export function sortCatalog<T extends { num: string }>(entries: T[]): T[] {
  return [...entries].sort((x, y) => compareNum(x.num, y.num));
}

/** Every broken rule in the catalog, as readable messages; empty when all is well. */
export function validateCatalog(entries: CatalogEntry[]): string[] {
  const errors: string[] = [];
  const nums = new Set<string>();
  const slugs = new Set<string>();
  for (const e of entries) {
    if (nums.has(e.num)) errors.push(`duplicate num ${e.num}`);
    nums.add(e.num);
    if (slugs.has(e.slug)) errors.push(`duplicate slug ${e.slug}`);
    slugs.add(e.slug);
  }
  for (const e of entries) {
    const [major, minor] = parts(e.num);
    if (e.level !== major) errors.push(`${e.num}: level ${e.level} does not match`);
    for (const p of e.prerequisites) {
      if (!nums.has(p)) errors.push(`${e.num}: unknown prerequisite ${p}`);
      else if (compareNum(p, e.num) >= 0) errors.push(`${e.num}: prerequisite ${p} is not earlier`);
    }
    const prefix = `${major}-${minor}-`;
    if (!e.slug.startsWith(prefix)) errors.push(`${e.num}: slug ${e.slug} must start with ${prefix}`);
  }
  return errors;
}

/** Previous and next lesson in roadmap order. */
export function neighbors(entries: CatalogEntry[], num: string): { prev?: CatalogEntry; next?: CatalogEntry } {
  const sorted = sortCatalog(entries);
  const i = sorted.findIndex(e => e.num === num);
  if (i < 0) return {};
  return { prev: sorted[i - 1], next: sorted[i + 1] };
}
