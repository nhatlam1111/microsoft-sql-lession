export interface PresentationSlide { id: string; title: string; source: string; minutes: number }

/** Literal Slide attributes are the deck's single outline, checked at build time. */
export function presentationOutline(body: string): PresentationSlide[] {
  const slides = [...body.matchAll(/<Slide\s+([^>]+)>/g)].map(([, attributes]) => {
    const value = (key: string) => attributes.match(new RegExp(`\\b${key}="([^"]+)"`))?.[1] ?? '';
    const minutes = Number(attributes.match(/\bminutes=\{(\d+)\}/)?.[1]);
    return { id: value('id'), title: value('title'), source: value('source'), minutes };
  });
  const ids = new Set<string>();
  for (const slide of slides) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slide.id) || ids.has(slide.id) || !slide.title || !slide.source || !slide.minutes) {
      throw new Error(`Slide metadata không hợp lệ: ${JSON.stringify(slide)}`);
    }
    ids.add(slide.id);
  }
  if (!slides.length) throw new Error('Bài giảng phải có ít nhất một Slide.');
  return slides;
}
