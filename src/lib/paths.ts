/** Prefix a site path with the GitHub Pages base, joined by exactly one slash. */
export function withBase(path: string, base: string = import.meta.env.BASE_URL): string {
  const head = base.replace(/\/+$/, '');
  const tail = path.replace(/^\/+/, '');
  return `${head}/${tail}`;
}

/** URL of a lesson page, always with a trailing slash. */
export function lessonUrl(slug: string, base?: string): string {
  return withBase(`bai/${slug}/`, base);
}
