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
      ['so-sanh-cac-dang-database', 2],
      ['tu-excel-den-database-quan-he', 2],
      ['bang-dong-cot', 2],
      ['thong-tin-o-nhieu-bang', 2],
      ['sql-server-la-gi', 2],
      ['bon-ten-can-phan-biet', 2],
      ['uu-diem-va-dieu-kien', 2],
      ['edition-va-azure-sql', 2],
      ['kieu-du-lieu-cua-cot', 2],
      ['decimal-va-float', 2],
      ['varchar-va-nvarchar', 2],
      ['ngay-va-gio', 2],
      ['chuyen-kieu-du-lieu', 2],
      ['rang-buoc-du-lieu', 1],
      ['null-va-not-null', 2],
      ['khoa-chinh', 2],
      ['khoa-ghep-va-unique', 2],
      ['khoa-ngoai', 2],
      ['so-do-quan-he-erd', 2],
      ['quan-he-mot-mot', 2],
      ['quan-he-mot-nhieu', 2],
      ['quan-he-nhieu-nhieu', 2],
      ['quan-he-bat-buoc-tuy-chon', 2],
      ['lan-duong-va-tu-tham-chieu', 3],
    ]);
    expect(outline.reduce((sum, slide) => sum + slide.minutes, 0)).toBe(50);
    expect(outline.map(s => s.source)).toEqual(['1.1','1.1','1.1','1.1','1.1','1.2','1.2','1.2','1.2','1.3','1.3','1.3','1.3','1.3','1.4','1.4','1.4','1.4','1.4','1.5','1.5','1.5','1.5','1.5','1.5']);
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
