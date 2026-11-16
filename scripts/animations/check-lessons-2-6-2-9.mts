import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const base = process.env.LESSON_PREVIEW_URL || 'http://127.0.0.1:4322/microsoft-sql-lession';
const out = 'docs/verification/2026-11-16-animations-2-6-2-9';
const lessons = [
  ['2-6-distinct-bo-dong-trung', '2-6-distinct'],
  ['2-7-ham-chuoi-tieng-viet', '2-7-strings'],
  ['2-8-ham-ngay-tham-nien', '2-8-dates'],
  ['2-9-case-when-ham-if', '2-9-case'],
];
mkdirSync(out, { recursive: true });
console.log('Starting browser verification');
const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL || 'chrome', headless: true, timeout: 15000 });
const results = [];
try {
  for (const [slug, id] of lessons) {
    console.log(`Checking ${id}`);
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.setDefaultTimeout(10000);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/bai/${slug}/`);
    const popup = page.locator('.rp-modal');
    await popup.waitFor();
    await popup.getByRole('button', { name: 'Đóng', exact: true }).click();
    const image = page.locator('.af-image');
    const button = page.locator('.af-play');
    await image.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('.af-play')?.getAttribute('aria-pressed') === 'true');
    await image.evaluate(async (img: HTMLImageElement) => img.decode());
    assert.match(await image.getAttribute('src') || '', new RegExp(`${id}/animation\\.gif\\?play=`));
    await button.focus();
    await page.keyboard.press('Enter');
    assert.match(await image.getAttribute('src') || '', /poster\.png$/);
    await page.evaluate(() => scrollTo(0, 0));
    await image.scrollIntoViewIfNeeded();
    assert.equal(await button.getAttribute('aria-pressed'), 'false');
    await button.press('Space');
    await image.evaluate(async (img: HTMLImageElement) => img.decode());
    await page.locator('.af-details summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.af-step').count(), 4);
    assert.equal(await page.locator('.af-step table').count() >= 4, true);
    for (const img of await page.locator('.af-step img').all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(async (el: HTMLImageElement) => el.decode());
    }
    await image.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${out}/${id}-desktop.png` });
    await page.setViewportSize({ width: 390, height: 844 });
    await image.scrollIntoViewIfNeeded();
    const box = await image.boundingBox();
    const shellFits = !!box && box.width >= 200 && box.x >= 0 && box.x + box.width <= 390;
    await page.screenshot({ path: `${out}/${id}-narrow-shell.png` });
    await page.evaluate(() => {
      const root = document.querySelector('.animated-flow')!;
      const main = document.createElement('main');
      main.className = 'prose';
      main.style.cssText = 'width:100%;padding:12px;min-width:0';
      main.append(root);
      document.body.replaceChildren(main);
      scrollTo(0, 0);
    });
    const isolated = await image.boundingBox();
    assert(isolated && isolated.width >= 300 && isolated.width <= 390);
    assert(await page.locator('.af-step table').first().isVisible());
    assert.match(await page.locator('.af-step a').first().getAttribute('href') || '', new RegExp(`${id}/.*\\.png$`));
    await page.screenshot({ path: `${out}/${id}-narrow-component.png` });
    const reduced = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await reduced.goto(`${base}/bai/${slug}/`);
    await reduced.locator('.rp-modal').waitFor();
    await reduced.locator('.rp-modal').getByRole('button', { name: 'Đóng', exact: true }).click();
    await reduced.locator('.af-image').scrollIntoViewIfNeeded();
    assert.match(await reduced.locator('.af-image').getAttribute('src') || '', /poster\.png$/);
    await reduced.locator('.af-play').click();
    assert.equal(await reduced.locator('.af-play').getAttribute('aria-pressed'), 'true');
    await reduced.close();
    const noJs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
    await noJs.goto(`${base}/bai/${slug}/`);
    assert.equal(await noJs.locator('.af-play').isVisible(), false);
    await noJs.locator('.af-details summary').click();
    assert(await noJs.locator('.af-step table').first().isVisible());
    await noJs.close();
    assert.deepEqual(errors, []);
    const files = [`dist/bai/${slug}/index.html`, `public/lesson-animations/${id}/manifest.json`, 'src/components/lesson/AnimatedFlow.astro'];
    results.push({ slug, id, shellFits390: shellFits, checks: ['GIF tự chạy và giải mã', 'dừng/phát bằng bàn phím, dừng được giữ khi cuộn', 'bốn bước và hình tĩnh', 'giảm chuyển động', 'HTML khi tắt JavaScript', 'component cô lập 390px'], hashes: Object.fromEntries(files.map(file => [file, createHash('sha256').update(readFileSync(file)).digest('hex')])) });
    await page.close();
  }
  writeFileSync(`${out}/browser.json`, JSON.stringify({ checkedAt: new Date().toISOString(), base, results }, null, 2) + '\n');
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
