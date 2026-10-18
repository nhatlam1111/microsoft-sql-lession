// Checks the built site in dist/: every internal link must carry the GitHub Pages
// base and point to a file that exists, and every lesson must have a page.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse as parseYaml } from 'yaml';

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

// Built text is read back the way it was written: island props are HTML-escaped (sometimes twice),
// bundles escape quotes and line breaks. Then spacing is squeezed so line breaks never hide a match.
const ENTITIES = { '&#39;': "'", '&quot;': '"', '&lt;': '<', '&gt;': '>', '&amp;': '&' };
function unescape(text) {
  let out = text.replace(/\\u0027/g, "'").replace(/\\u0022/g, '"').replace(/\\"/g, '"').replace(/\\'/g, "'");
  for (let pass = 0; pass < 2; pass++) out = out.replace(/&(#39|quot|lt|gt|amp);/g, m => ENTITIES[m]);
  return out;
}
const squeeze = text => unescape(text).replace(/\\[nrt]/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Built files that contain an exercise answer or check query, which must only ever ship with the API.
 * @param {{ path: string; text: string }[]} files
 * @param {string[]} answers
 * @returns {string[]}
 */
export function findAnswerLeaks(files, answers) {
  const needles = answers.map(a => squeeze(a).replace(/;$/, '')).filter(Boolean);
  return files.filter(f => {
    const hay = squeeze(f.text);
    return needles.some(n => hay.includes(n));
  }).map(f => f.path);
}

/**
 * Exercise pages a lesson page does not link to; the lesson's "Bài tập" list must point at every one.
 * @param {string} html @param {string} lesson @param {number} count @param {string} base
 * @returns {string[]}
 */
export function missingExerciseLinks(html, lesson, count, base) {
  const head = base.replace(/\/+$/, '');
  return Array.from({ length: count }, (_, i) => `${head}/bai/${lesson}/bai-tap/${i + 1}/`)
    .filter(href => !html.includes(`href="${href}"`));
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

  const exerciseDir = join('src', 'content', 'exercises');
  const exerciseFiles = existsSync(exerciseDir)
    ? readdirSync(exerciseDir).filter(f => f.endsWith('.yaml')).map(f => parseYaml(readFileSync(join(exerciseDir, f), 'utf8')))
    : [];
  const answers = [];
  for (const file of exerciseFiles) {
    const lessonPage = join(dist, 'bai', file.lesson, 'index.html');
    if (existsSync(lessonPage)) {
      for (const href of missingExerciseLinks(readFileSync(lessonPage, 'utf8'), file.lesson, file.exercises.length, BASE)) {
        errors.push(`dist/bai/${file.lesson}/ không có link tới ${href}`);
      }
    }
    file.exercises.forEach((e, i) => {
      const page = join(dist, 'bai', file.lesson, 'bai-tap', String(i + 1), 'index.html');
      if (!existsSync(page)) errors.push(`thiếu trang bài tập ${e.id}: dist/bai/${file.lesson}/bai-tap/${i + 1}/`);
      answers.push(e.answer, ...(e.check ? [e.check] : []));
    });
  }
  const shipped = existsSync(dist)
    ? walk(dist).filter(f => /\.(html|js|json)$/.test(f)).map(f => ({ path: relative(dist, f).split(sep).join('/'), text: readFileSync(f, 'utf8') }))
    : [];
  for (const leak of findAnswerLeaks(shipped, answers)) errors.push(`dist/${leak} có chứa câu đáp án hoặc câu kiểm tra của bài tập`);

  if (errors.length) {
    for (const e of errors) console.error(e);
    process.exit(1);
  }
  console.log(`check-dist: OK (${pages.length} trang, ${links} link)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
