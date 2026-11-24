// Render an authored local HTML scene by seeking explicitly, independent of wall-clock speed.
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readdir, readFile, writeFile, rename, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const { values: opt } = parseArgs({ options: Object.fromEntries(
  ['scene', 'out', 'lesson', 'unit', 'data'].map(key => [key, { type: 'string' }])) });
if (!opt.scene || !opt.out?.toLowerCase().endsWith('.gif') || !!opt.lesson === !!opt.data || (opt.unit && !opt.lesson)) {
  throw Error('Dùng --scene file.html --out file.gif và một trong --lesson 2.2 [--unit id] hoặc --data file.json.');
}
const root = process.cwd();
const { chromium } = createRequire(join(root, 'package.json'))('playwright');
let data;
if (opt.lesson) {
  const { loadLessonUnits, readLessonUnits } = await import('./lesson-units.mts');
  let units = loadLessonUnits(opt.lesson, opt.unit);
  if (!units.length && !opt.unit) {
    // Resolve by the same frontmatter identity even for older filenames.
    const folder = resolve('src/content/lessons');
    for (const file of await readdir(folder)) {
      if (!file.endsWith('.mdx')) continue;
      const slug = file.slice(0, -4);
      const source = await readFile(join(folder, file), 'utf8');
      const lesson = readLessonUnits(slug, source);
      if (lesson.num === opt.lesson || lesson.slug === opt.lesson) {
        units = readLessonUnits(slug, source, 'run-flow-preview').units;
        break;
      }
    }
  }
  if (units.length !== 1) throw Error(`Bài ${opt.lesson} có ${units.length} unit. Chọn --unit nếu có AnimatedFlow có ID riêng, hoặc chuẩn bị --data từ nguồn bài.`);
  [data] = units;
} else {
  data = JSON.parse(await readFile(opt.data, 'utf8'));
}
const out = resolve(opt.out);
await mkdir(dirname(out), { recursive: true });
const stage = await mkdtemp(join(dirname(out), '.gif-preview-'));
let browser;
try {
  browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL || 'chrome' });
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(resolve(opt.scene)).href);
  const {width, height, scenes} = await page.evaluate(d => window.prepare(d), data);
  if (![width,height].every(v=>Number.isSafeInteger(v) && v>0) || !Array.isArray(scenes) || !scenes.length)
    throw Error('prepare() cần width, height dương và scenes có ít nhất một cảnh.');
  await page.setViewportSize({width,height});
  const delays = [];
  for (const [index, scene] of scenes.entries()) {
    const {positions, leadMs, holdMs} = scene;
    if (!Number.isSafeInteger(positions) || positions<2 || ![leadMs,holdMs].every(v=>Number.isSafeInteger(v) && v>=10 && v%10===0))
      throw Error(`Cảnh ${index+1}: cần positions >= 2 và thời gian đầu/cuối theo bội 10 ms.`);
    for (let n=0; n<positions; n++) {
      await page.evaluate(async ([s,p]) => {
        await window.draw(s,p);
        await document.fonts.ready;
        await Promise.all([...document.images].map(img=>img.decode()));
        if (document.documentElement.scrollWidth>innerWidth || document.documentElement.scrollHeight>innerHeight)
          throw Error('Nội dung tràn khỏi khung. Kiểm lại kích thước hoặc các cột hiển thị.');
      }, [index, n/(positions-1)]);
      await page.screenshot({ path: join(stage, delays.length+'.png'), animations:'disabled' });
      delays.push(n===0 ? leadMs : n===positions-1 ? holdMs : 100);
    }
  }
  await writeFile(join(stage,'frames.json'), JSON.stringify(delays));
  const gif = join(stage,'preview.gif');
  const encoder = fileURLToPath(new URL('./encode-frames.py', import.meta.url));
  execFileSync(process.env.PYTHON || 'python', [encoder, stage, gif], {stdio:'inherit'});
  await rename(gif,out);
  console.log(`${out} · ${scenes.length} cảnh · ${delays.length} ảnh nguồn · ${delays.reduce((a,b)=>a+b,0)} ms`);
} finally {
  try { await browser?.close(); } finally {
    if (dirname(stage)===dirname(out) && basename(stage).startsWith('.gif-preview-'))
      await rm(stage,{recursive:true,force:true});
  }
}
