import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { presentationOutline } from '../src/lib/presentation-outline';

describe('presentation outline', () => {
  it('rejects duplicate IDs and missing teaching metadata at build time', () => {
    const slide = '<Slide id="mot" title="Một" source="1.1" minutes={2}>';
    expect(() => presentationOutline(slide + slide)).toThrow();
    expect(() => presentationOutline('<Slide id="mot" title="Một">')).toThrow();
    expect(() => presentationOutline('')).toThrow();
    expect(() => presentationOutline(slide, ['1.2'])).toThrow(/sourceLessons/);
    expect(presentationOutline(slide, ['1.1'])).toHaveLength(1);
  });
  it('uses the authored deck as the single outline', () => {
    const body = readFileSync('src/content/presentations/lam-quen.mdx', 'utf8');
    const outline = presentationOutline(body);
    expect(outline.map(({ id, minutes }) => [id, minutes])).toEqual([
      ['database-la-gi', 2],
      ['cac-mo-hinh-luu-tru', 2],
      ['so-sanh-cac-dang-database', 3],
      ['tu-excel-den-database-quan-he', 3],
      ['sql-server-la-gi', 2],
      ['sql-la-gi', 2],
      ['bon-ten-can-phan-biet', 2],
      ['du-lieu-trong-database', 2],
      ['so-do-quan-he-erd', 2],
      ['bang-trong-database', 2],
      ['bang-dong-cot', 2],
      ['thong-tin-o-nhieu-bang', 2],
      ['nhan-dien-mot-ho-so', 1],
      ['khoa-chinh', 3],
      ['bang-khong-co-khoa-chinh', 2],
      ['ma-phong-trong-ho-so', 2],
      ['khoa-ngoai', 3],
      ['bang-khong-co-khoa-ngoai', 2],
      ['ky-hieu-erd', 3],
      ['ten-phong-cua-nv001', 3],
      ['hop-dong-kem-ten-phong', 3],
    ]);
    expect(outline.reduce((sum, slide) => sum + slide.minutes, 0)).toBe(48);
    expect(new Set(outline.map(slide => slide.source))).toEqual(new Set(['1.1','1.2','1.4','1.5']));
  });
  it('keeps the new layouts free of progress side effects', () => {
    for (const path of ['src/layouts/PresentationLayout.astro','src/components/presentations/PresentationShell.astro','src/scripts/presentation.ts']) {
      const source = readFileSync(path, 'utf8');
      expect(source).not.toMatch(/BaseLayout|SidebarNav|TopProgress|ProgressMenu|LessonStatus|useProgress|localStorage|sessionStorage|progress-store/);
    }
    const notes = readFileSync('src/components/presentations/PresenterNotes.astro','utf8');
    expect(notes).toContain("mode === 'presenter'");
  });
});
