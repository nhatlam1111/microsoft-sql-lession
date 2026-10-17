// Checks the built site in dist/: every internal link must carry the GitHub Pages
// base and point to a file that exists, and every lesson must have a page.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

export const BASE = '/microsoft-sql-lession';

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const ATTR = /\s(?:href|src)\s*=\s*["']([^"']+)["']/gi;

function candidates(rel) {
  if (rel === '' || rel.endsWith('/')) return [`${rel}index.html`];
  const last = rel.split('/').pop() ?? '';
  return last.includes('.') ? [rel] : [`${rel}/index.html`, rel];
}

/**
 * @param {string} html
 * @param {(distPath: string) => boolean} fileExists path relative to dist/, with forward slashes
 * @param {string} base
 * @returns {string[]}
 */
export function findLinkProblems(html, fileExists, base) {
  const head = base.replace(/\/+$/, '');
  const problems = new Set();
  for (const [, url] of html.matchAll(ATTR)) {
    if (url.startsWith('#') || EXTERNAL.test(url) || !url.startsWith('/')) continue;
    const path = url.split(/[?#]/)[0];
    if (path !== head && !path.startsWith(`${head}/`)) {
      problems.add(`thiếu base: ${url}`);
      continue;
    }
    let rel = path.slice(head.length).replace(/^\/+/, '');
    try { rel = decodeURIComponent(rel); } catch { /* keep the raw path */ }
    if (!candidates(rel).some(fileExists)) problems.add(`không tồn tại: ${url}`);
  }
  return [...problems];
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

function main() {
  const dist = 'dist';
  const errors = [];
  for (const f of ['index.html', '404.html', 'gioi-thieu/index.html', 'HRM_Demo.sql']) {
    if (!existsSync(join(dist, f))) errors.push(`thiếu dist/${f}`);
  }
  const sqlSrc = join('database', 'HRM_Demo.sql');
  if (existsSync(join(dist, 'HRM_Demo.sql')) && existsSync(sqlSrc)
    && readFileSync(join(dist, 'HRM_Demo.sql'), 'utf8') !== readFileSync(sqlSrc, 'utf8')) {
    errors.push('dist/HRM_Demo.sql khác database/HRM_Demo.sql');
  }
  const isFile = p => existsSync(join(dist, p)) && statSync(join(dist, p)).isFile();
  const pages = existsSync(dist) ? walk(dist).filter(f => f.endsWith('.html')) : [];
  let links = 0;
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    links += [...html.matchAll(ATTR)].length;
    for (const p of findLinkProblems(html, isFile, BASE)) errors.push(`${relative(dist, page).split(sep).join('/')}: ${p}`);
  }
  const lessonDir = join('src', 'content', 'lessons');
  const lessons = existsSync(lessonDir) ? readdirSync(lessonDir).filter(f => f.endsWith('.mdx')).length : 0;
  const baiDir = join(dist, 'bai');
  const lessonPages = existsSync(baiDir)
    ? readdirSync(baiDir).filter(d => existsSync(join(baiDir, d, 'index.html'))).length
    : 0;
  if (lessonPages !== lessons) errors.push(`có ${lessonPages} trang bài nhưng ${lessons} file bài`);
  if (errors.length) {
    for (const e of errors) console.error(e);
    process.exit(1);
  }
  console.log(`check-dist: OK (${pages.length} trang, ${links} link)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
