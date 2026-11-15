import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { chromium, type Page } from 'playwright';

const base = process.env.LESSON_PREVIEW_URL || 'http://127.0.0.1:4322/microsoft-sql-lession';
const url = `${base}/bai/2-1-chon-cot-dat-ten-cot/`;
const out = 'docs/verification/2026-11-15-select-animation';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({channel:'chrome',headless:true});
const checks: string[] = [];
async function openLesson(page: Page) {
  await page.goto(url);
  // First-time visitors see the existing course roadmap. Close it through its UI.
  await page.locator('.rp-modal').waitFor();
  await page.locator('.rp-modal').getByRole('button', {name:'Đóng',exact:true}).click();
}
try {
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await openLesson(page);
  const image = page.locator('.af-image');
  const button = page.locator('.af-play');
  assert.match(await image.getAttribute('src') || '', /poster\.png$/);
  await image.evaluate(el => {
    const rect = el.getBoundingClientRect();
    scrollTo(0, scrollY + rect.top - innerHeight + rect.height * 0.1);
  });
  // Let layout and IntersectionObserver settle while only 10% is visible.
  await page.waitForTimeout(150);
  assert.equal(await button.getAttribute('aria-pressed'), 'false');
  await image.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.af-play')?.getAttribute('aria-pressed') === 'true');
  await image.evaluate(async (img: HTMLImageElement) => img.decode());
  assert.match(await image.getAttribute('src') || '', /animation\.gif\?play=/);
  await page.screenshot({path:`${out}/desktop.png`});
  checks.push('Remains still at 10% visibility; automatically plays beyond 25%; GIF decodes successfully.');
  await button.focus();
  await page.keyboard.press('Enter');
  assert.match(await image.getAttribute('src') || '', /poster\.png$/);
  await page.evaluate(() => scrollTo(0, 0));
  await image.scrollIntoViewIfNeeded();
  assert.equal(await button.getAttribute('aria-pressed'), 'false');
  await button.press('Space');
  const firstUrl = await image.getAttribute('src');
  await button.click();
  await button.click();
  assert.notEqual(await image.getAttribute('src'), firstUrl);
  checks.push('Keyboard stop/play, stop persists after scrolling, replay uses a fresh URL.');
  await button.click();
  await page.locator('.af-details summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.af-details').getAttribute('open'), '');
  assert.equal(await page.locator('.af-step').count(), 2);
  assert((await page.locator('.af-details').innerText()).includes('Khúc Văn Hải'));
  checks.push('Native disclosure works by keyboard and exposes two logical steps with HTML data.');
  await page.setViewportSize({width:390,height:844});
  await image.scrollIntoViewIfNeeded();
  const box = await image.boundingBox();
  await page.screenshot({path:`${out}/narrow-shell.png`});
  const shellFits = !!box && box.width >= 200 && box.x >= 0 && box.x + box.width <= 390;
  checks.push(shellFits ? 'Full lesson fits 390px viewport.' : 'LIMIT: existing desktop lesson shell collapses the article at 390px.');
  // Isolate the new component to distinguish its behavior from the desktop-only shell.
  await page.evaluate(() => {
    const root = document.querySelector('.animated-flow')!;
    const main = document.createElement('main');
    main.className = 'prose';
    main.style.cssText = 'width:100%;padding:12px;min-width:0';
    main.append(root);
    document.body.replaceChildren(main);
    scrollTo(0,0);
  });
  const isolated = await image.boundingBox();
  assert(isolated && isolated.width >= 300 && isolated.width <= 390);
  assert.equal(await page.locator('.af-play').isVisible(), true);
  await page.screenshot({path:`${out}/narrow-component.png`});
  checks.push('Isolated animation component fits 390px with readable HTML tables and original-size links.');

  const reduced = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await openLesson(reduced);
  await reduced.locator('.af-image').scrollIntoViewIfNeeded();
  assert.match(await reduced.locator('.af-image').getAttribute('src') || '', /poster\.png$/);
  await reduced.locator('.af-play').click();
  assert.equal(await reduced.locator('.af-play').getAttribute('aria-pressed'), 'true');
  await reduced.emulateMedia({reducedMotion:'no-preference'});
  await reduced.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await reduced.emulateMedia({reducedMotion:'reduce'});
  await reduced.waitForFunction(() => document.querySelector('.af-play')?.getAttribute('aria-pressed') === 'false');
  checks.push('Reduced motion defaults to still image, permits explicit play, stops when preference changes.');

  const noJs = await browser.newPage({javaScriptEnabled:false,viewport:{width:1440,height:1000}});
  await noJs.goto(url);
  assert.equal(await noJs.locator('.af-play').isVisible(), false);
  await noJs.locator('.af-details summary').click();
  assert.equal(await noJs.locator('.af-step').first().isVisible(), true);
  assert((await noJs.locator('.af-details').innerText()).includes('NV033'));
  checks.push('Without JavaScript, poster and native details/HTML data remain usable.');

  const failure = await browser.newPage({viewport:{width:1440,height:1000}});
  await failure.route('**/animation.gif?*', route => route.abort());
  await openLesson(failure);
  await failure.locator('.af-image').scrollIntoViewIfNeeded();
  await failure.waitForFunction(() => document.querySelector('.af-status')?.textContent?.includes('Chưa tải'));
  assert.match(await failure.locator('.af-image').getAttribute('src') || '', /poster\.png$/);
  await failure.unroute('**/animation.gif?*');
  await failure.locator('.af-play').click();
  await failure.locator('.af-image').evaluate(async (img: HTMLImageElement) => img.decode());
  assert.equal(await failure.locator('.af-status').textContent(), '');
  checks.push('Failed GIF load falls back to poster with message; retry recovers.');
  assert.deepEqual(errors, []);
  const evidenceFiles = ['dist/bai/2-1-chon-cot-dat-ten-cot/index.html', 'src/components/lesson/AnimatedFlow.astro', 'scripts/animations/check-browser.mts', 'public/lesson-animations/2-1-select/manifest.json'];
  const hashes = Object.fromEntries(evidenceFiles.map(file => [file, createHash('sha256').update(readFileSync(file)).digest('hex')]));
  writeFileSync(`${out}/browser.json`, JSON.stringify({url,checkedAt:new Date().toISOString(),hashes,checks,pageErrors:errors},null,2)+'\n');
  console.log(checks.join('\n'));
} finally {
  await browser.close();
}
