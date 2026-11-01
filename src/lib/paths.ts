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

/** URL of a reference article, outside the numbered learning path. */
export function appendixUrl(slug: string, base?: string): string {
  return withBase(`phu-luc/${slug}/`, base);
}

/** Lecture and presenter routes are separate from the numbered learning path. */
export function presentationUrl(slug: string, base?: string): string {
  return withBase(`bai-giang/${slug}/`, base);
}

export function presenterUrl(slug: string, base?: string): string {
  return withBase(`bai-giang/${slug}/nguoi-giang/`, base);
}

/** True when `pathname` is the site page at `path`, ignoring a trailing slash. */
export function isCurrentPage(pathname: string, path: string, base?: string): boolean {
  const trim = (p: string) => p.replace(/\/+$/, '');
  return trim(pathname) === trim(withBase(path, base));
}
