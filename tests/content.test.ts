import { describe, it, expect } from 'vitest';
import { lessonSchema, SECTION_HEADINGS, BANNED_PHRASES } from '../src/lib/lesson-schema';
import { validateCatalog } from '../src/lib/catalog';
import { findUnprefixedUnicodeStrings } from '../src/lib/tsql-lexer';
import { EXPECTED } from './helpers/expected';
import { readLessonFiles, readCatalog } from './helpers/lessons';

describe('lesson files', () => {
  const files = readLessonFiles();
  it('every frontmatter passes the schema', () => {
    for (const f of files) expect(lessonSchema.safeParse(f.data).success, f.slug).toBe(true);
  });
  it('matches the 51 lessons of the design (num, area, kind)', () => {
    expect(readCatalog().map(e => `${e.num} ${e.area}${e.kind === 'full' ? ' full' : ''}`)).toEqual(EXPECTED);
  });
  it('passes the catalog rules', () => expect(validateCatalog(readCatalog())).toEqual([]));
  it('has 7, 7, 3, 6, 9, 6, 6, 7 lessons in areas A1..A8', () => {
    const count = (a: string) => readCatalog().filter(e => e.area === a).length;
    expect(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'].map(count)).toEqual([7, 7, 3, 6, 9, 6, 6, 7]);
  });
  it('uses exactly the section headings of its kind, in order', () => {
    for (const f of files) {
      const kind = (f.data as { kind: 'full' | 'summary' }).kind;
      const h2 = [...f.body.matchAll(/^## (.+?)\s*$/gm)].map(m => m[1]);
      expect(h2, f.slug).toEqual(SECTION_HEADINGS[kind]);
    }
  });
  it('contains no banned phrase and no emoji', () => {
    for (const f of files) {
      const text = (JSON.stringify(f.data) + f.body).toLowerCase();
      for (const p of BANNED_PHRASES) expect(text.includes(p), `${f.slug}: ${p}`).toBe(false);
      expect(/\p{Extended_Pictographic}/u.test(text), f.slug).toBe(false);
    }
  });
  it('every Vietnamese string in lesson SQL has the N prefix', () => {
    for (const f of files) for (const m of f.body.matchAll(/<Sql[^>]*code=\{`([\s\S]*?)`\}/g)) {
      expect(findUnprefixedUnicodeStrings(m[1]), f.slug).toEqual([]);
    }
  });
  it('summary lessons have no SQL, result or message blocks', () => {
    for (const f of files) {
      if ((f.data as { kind: string }).kind === 'summary') expect(/<(Sql|Result|Messages)\b/.test(f.body), f.slug).toBe(false);
    }
  });
});
