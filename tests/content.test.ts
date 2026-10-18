import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { lessonSchema, SECTION_HEADINGS, BANNED_PHRASES, sectionHeadings } from '../src/lib/lesson-schema';
import { validateCatalog } from '../src/lib/catalog';
import { findUnprefixedUnicodeStrings } from '../src/lib/tsql-lexer';
import { EXPECTED } from './helpers/expected';
import { readLessonFiles, readCatalog, sqlSubheadings } from './helpers/lessons';

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
      const { kind, noExercises } = f.data as { kind: 'full' | 'summary'; noExercises?: boolean };
      const h2 = [...f.body.matchAll(/^## (.+?)\s*$/gm)].map(m => m[1]);
      expect(h2, f.slug).toEqual(sectionHeadings(kind, noExercises));
    }
  });
  it('Làm bằng SQL starts with the theory and ends with the query and its run order', () => {
    for (const f of files) {
      const { kind, num } = f.data as { kind: string; num: string };
      if (kind !== 'full' || num === '6.5') continue;
      const h3 = sqlSubheadings(f.body);
      expect(h3[0], f.slug).toBe('Lý thuyết cơ bản');
      expect(h3.filter(h => h.startsWith('Bước')), f.slug).toEqual([]);
      if (f.body.includes('<RunFlow')) expect(h3.slice(-2), f.slug).toEqual(['Câu lệnh cho tình huống', 'SQL Server chạy câu này thế nào']);
    }
  });
  it('sectionHeadings drops Bài tập only when asked', () => {
    expect(sectionHeadings('full', true)).toEqual(SECTION_HEADINGS.full.slice(0, 6));
    expect(sectionHeadings('summary').at(-1)).toBe('Bài tập');
    expect(sectionHeadings('full', false)).toEqual([...SECTION_HEADINGS.full]);
  });
  it('lessons 1.1 to 1.5 have no exercises section', () => {
    for (const f of files) {
      const data = f.data as { num: string; noExercises?: boolean };
      if (!['1.1', '1.2', '1.3', '1.4', '1.5'].includes(data.num)) continue;
      expect(data.noExercises, f.slug).toBe(true);
      expect(f.body.includes('<Exercises'), f.slug).toBe(false);
    }
  });
  it('a lesson with an exercise file is not marked noExercises and lists its exercises', () => {
    const lessons = readdirSync(join('src', 'content', 'exercises')).filter(n => n.endsWith('.yaml'))
      .map(n => (parseYaml(readFileSync(join('src', 'content', 'exercises', n), 'utf8')) as { lesson: string }).lesson);
    expect(lessons.length).toBeGreaterThan(0);
    for (const lesson of lessons) {
      const f = files.find(x => x.slug === lesson)!;
      expect((f.data as { noExercises?: boolean }).noExercises, lesson).not.toBe(true);
      expect(f.body.includes('<Exercises />'), lesson).toBe(true);
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
  it('the intro page follows the writing rules and has its five sections', () => {
    const page = readFileSync('src/pages/gioi-thieu.astro', 'utf8');
    const text = page.toLowerCase();
    for (const p of BANNED_PHRASES) expect(text.includes(p), p).toBe(false);
    expect(/\p{Extended_Pictographic}/u.test(page)).toBe(false);
    const h2 = [...page.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].map(m => m[1].trim());
    expect(h2).toEqual(['Khóa học này dạy gì', 'Cách dùng trang', '6 level', 'Database mẫu HRM_Demo', 'Tiến độ của bạn được lưu ở đâu']);
  });
  it('lesson SQL does not start lines with spaces, which MDX strips', () => {
    for (const f of files) for (const m of f.body.matchAll(/<Sql[^>]*code=\{`([\s\S]*?)`\}/g)) {
      expect(m[1].split(/\r?\n/).filter(l => /^\s+\S/.test(l)), f.slug).toEqual([]);
    }
  });
  it('SQL inside run-flow steps keeps the N prefix and has no leading spaces', () => {
    for (const f of files) for (const m of f.body.matchAll(/(?:\bsql:\s*|\bquery=\{)`([\s\S]*?)`/g)) {
      expect(findUnprefixedUnicodeStrings(m[1]), f.slug).toEqual([]);
      expect(m[1].split(/\r?\n/).filter(l => /^\s+\S/.test(l)), f.slug).toEqual([]);
    }
  });
  it('no lesson still has TODO-CONTENT', () => {
    for (const f of files) expect(f.body.includes('TODO-CONTENT'), f.slug).toBe(false);
  });
  it('summary lessons have no SQL, result or message blocks', () => {
    for (const f of files) {
      if ((f.data as { kind: string }).kind === 'summary') expect(/<(Sql|Result|Messages|RunFlow)\b/.test(f.body), f.slug).toBe(false);
    }
  });
});

describe('fixes from the final review', () => {
  const body = (slug: string) => readLessonFiles().find(f => f.slug === slug)!.body;
  it('3.5 shows the full "still valid" condition, open-ended contracts included', () => {
    expect(body('3-5-left-join')).toContain('hd.NgayKetThuc IS NULL OR hd.NgayKetThuc >=');
  });
  it('6.5 says to check @@TRANCOUNT in the same query window and not to commit on close', () => {
    expect(body('6-5-update-quen-where')).toContain('cùng cửa sổ');
    expect(body('6-5-update-quen-where')).toContain('chọn No');
  });
  it('6.5 links the related lessons', () => {
    for (const slug of ['6-3-backup-restore', '6-4-point-in-time-restore', '6-6-temporal-table']) {
      expect(body('6-5-update-quen-where')).toContain(`/microsoft-sql-lession/bai/${slug}/`);
    }
  });
  it('2.5 replaces a varchar NULL with COALESCE so Vietnamese text keeps its accents', () => {
    expect(body('2-5-null-o-trong')).not.toContain('ISNULL(Email');
    expect(body('2-5-null-o-trong')).toContain("COALESCE(Email, N'(chưa có)')");
  });
  it('3.5 run-order text gets the row arithmetic and the general rules right', () => {
    const b = body('3-5-left-join');
    expect(b).toContain('Ai có nhiều hợp đồng thì có nhiều dòng');
    expect(b).not.toContain('Tôn Thất Long có ba hợp đồng nên có ba dòng, vì vậy');
    expect(b).not.toContain('là bước cuối cùng');
    expect(b).not.toContain('ở dòng thứ hai');
  });
  it('3.5 run-order text says "kết bảng" for JOIN, like the rest of the course', () => {
    expect(body('3-5-left-join')).not.toMatch(/ghép/i);
    expect(body('3-5-left-join')).toContain("title: 'Kết bảng nhân viên với bảng hợp đồng");
  });
  it('3.5 shows the run order of its final query', () => {
    expect(body('3-5-left-join')).toContain('### SQL Server chạy câu này thế nào');
    expect(body('3-5-left-join')).toContain('<RunFlow');
  });
  it('summaries state the corrected facts', () => {
    expect(body('1-5-doc-so-do-erd')).toContain('`MaPB`, `MaCD`');
    expect(body('1-5-doc-so-do-erd')).toContain('Azure SQL Database không có');
    expect(body('5-2-rang-buoc-du-lieu')).toContain('BULK INSERT');
    expect(body('6-6-temporal-table')).toContain('UTC');
  });
});
