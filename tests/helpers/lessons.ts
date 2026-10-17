import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { lessonSchema } from '../../src/lib/lesson-schema';
import { sortCatalog, type CatalogEntry } from '../../src/lib/catalog';

const DIR = join('src', 'content', 'lessons');

/** Every lesson file with its raw frontmatter and body. */
export function readLessonFiles(): { slug: string; data: unknown; body: string }[] {
  return readdirSync(DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      const raw = readFileSync(join(DIR, f), 'utf8');
      const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      if (!m) throw new Error(`${f}: no frontmatter`);
      return { slug: f.replace(/\.mdx$/, ''), data: parse(m[1]), body: m[2] };
    });
}

/** The catalog as the site builds it: parsed by the shared schema and sorted. */
export function readCatalog(): CatalogEntry[] {
  return sortCatalog(readLessonFiles().map(f => ({ slug: f.slug, ...lessonSchema.parse(f.data) })));
}
