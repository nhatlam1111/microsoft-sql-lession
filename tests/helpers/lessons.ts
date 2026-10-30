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

/** The merged main section, or the SQL section of a lesson that still uses the old layout. */
export function lessonMainSection(body: string): string {
  const sections = body.split(/^## /m).slice(1);
  const opening = sections[0]?.split(/\r?\n/, 1)[0];
  const main = opening === 'Tình huống' || opening === 'Nội dung chính' ? sections[1] : sections[0];
  return sections.find(s => s.split(/\r?\n/, 1)[0] === 'Làm bằng SQL') ?? main ?? '';
}

/** Level-3 headings inside the main teaching section, in order, for both layouts. */
export function sqlSubheadings(body: string): string[] {
  const section = lessonMainSection(body);
  return [...section.matchAll(/^### (.+?)\s*$/gm)].map(m => m[1]);
}

/**
 * The prose paragraphs of a lesson body, list items counted one by one: text outside components,
 * tables, headings and code. Words are counted the way a Vietnamese reader counts them, one per syllable.
 */
export function proseParagraphs(body: string): { text: string; words: number }[] {
  const out: { text: string; words: number }[] = [];
  let cur: string[] = [];
  let inComponent = false;
  const flush = () => {
    if (cur.length) {
      const text = cur.join(' ');
      out.push({ text, words: text.replace(/^(\d+\.|-)\s+/, '').replace(/[`*_]/g, '').split(/\s+/).filter(Boolean).length });
    }
    cur = [];
  };
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (inComponent) {
      if (line.endsWith('/>')) inComponent = false;
      continue;
    }
    if (line.startsWith('<')) {
      flush();
      // A component whose attributes run over several lines, like <LineMap rows={[ … ]} />.
      if (/^<[A-Z]/.test(line) && !line.endsWith('>')) inComponent = true;
      continue;
    }
    if (!line || /^(#|\||```|---|import\s)/.test(line)) { flush(); continue; }
    if (/^(\d+\.|-)\s/.test(line)) flush();
    cur.push(line);
  }
  flush();
  return out;
}
