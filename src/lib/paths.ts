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

/** True when `pathname` is the site page at `path`, ignoring a trailing slash. */
export function isCurrentPage(pathname: string, path: string, base?: string): boolean {
  const trim = (p: string) => p.replace(/\/+$/, '');
  return trim(pathname) === trim(withBase(path, base));
}
