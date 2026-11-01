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
    expect(outline).toHaveLength(20);
    expect(outline.reduce((sum, slide) => sum + slide.minutes, 0)).toBe(48);
    expect(new Set(outline.map(slide => slide.source))).toEqual(new Set(['1.1','1.2','1.3','1.4','1.5']));
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
