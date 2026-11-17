import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { chromium, type Page } from 'playwright';
import { animationFingerprint } from '../../src/lib/animation-assets.ts';
import { checkFlow, type FlowStep } from '../../src/lib/run-flow.ts';
import { storyboard, type Move, type Scene, type SortKey, type Table, type Target } from './storyboard.mts';

const width = 1080;
const height = 720;
const fps = 10;
const renderer = 'scripts/animations/render-flow.mts';
const theme = 'scripts/animations/select.css';
const encoder = 'scripts/animations/sheet_to_gif.py';
const fonts = ['be-vietnam-pro', 'jetbrains-mono'].flatMap(family =>
  ['latin', 'vietnamese'].map(subset => `node_modules/@fontsource/${family}/files/${family}-${subset}-400-normal.woff`));
const vietnamese = 'U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB';
const fontCss = fonts.map((file, i) => `@font-face{font-family:${i < 2 ? 'UI' : 'Code'};src:url(data:font/woff;base64,${readFileSync(file).toString('base64')});${i % 2 ? `unicode-range:${vietnamese};` : ''}}`).join('');
const escape = (value: unknown) => String(value ?? 'NULL').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function tableHtml(table: Table | undefined, aliases?: string[], sortKeys: SortKey[] = []) {
  if (!table) return '<p class="waiting">Chờ bước tiếp theo</p>';
  const { rows, columns } = table;
  const weights = columns.map((label, i) => Math.max(7, (aliases?.[i] ?? label).length * 0.6, ...rows.map(row => {
    const value = String(row[i] ?? 'NULL');
    return /^\d{4}-\d{2}-\d{2}$/.test(value) ? 12 : value.length;
  })));
  const total = weights.reduce((a, b) => a + b, 0);
  const colgroup = weights.map(weight => `<col style="width:${100 * weight / total}%">`).join('');
  const keyClass = (column: number) => {
    const priority = sortKeys.findIndex(key => key.column === column);
    return priority < 0 ? '' : ` class="${priority === 0 ? 'sort-primary' : 'sort-secondary'}"`;
  };
  const header = columns.map((label, column) => {
    const key = sortKeys.find(key => key.column === column);
    const arrow = key ? `<span class="sort-direction">${key.direction === 'ASC' ? '↑' : '↓'}</span>` : '';
    return `<th${keyClass(column)}><span>${escape(label).replace(/([a-z])([A-Z])/g, '$1<wbr>$2')}</span>${arrow}</th>`;
  }).join('');
  const body = rows.map((row, index) => `<tr data-row="${index}">${row.map((value, column) => `<td${keyClass(column)}><span>${escape(value)}</span></td>`).join('')}</tr>`).join('');
  return `<table${columns.length >= 5 ? ' class="dense"' : ''}><colgroup>${colgroup}</colgroup><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`;
}

function queryHtml(query: string, scene: Scene, alias = false) {
  const format = (sql: string) => sql.replace(/, (?=\w+ AS \[)/g, ',\n  ');
  if (alias) return format(query).split(/(\bAS \[[^\]\n]+\])/g).map((part, i) => i % 2 ? `<mark class="alias">${escape(part)}</mark>` : escape(part)).join('');
  const start = query.indexOf(scene.focus);
  assert(start >= 0, `${scene.clause}: không thấy đoạn SQL ${scene.focus}`);
  const selected = scene.clause === 'SELECT' ? scene.focus.split(/(TOP \(5\))/g) : [scene.focus];
  const focus = selected.map((part, i) => i % 2 ? escape(part) : `<mark>${escape(format(part))}</mark>`).join('');
  return escape(format(query.slice(0, start))) + focus + escape(format(query.slice(start + scene.focus.length)));
}

interface Frame {
  completed: number;
  active?: number;
  progress?: number;
  note: string;
  alias?: boolean;
}

async function drawFrame(page: Page, scene: Scene, frame: Frame) {
  await page.evaluate(({ scene, frame }) => {
    const root = document.querySelector('main')!;
    const current = frame.active === undefined ? undefined : scene.moves[frame.active];
    const arrived = scene.moves.slice(0, frame.completed);
    root.querySelector('#normal-sql')!.classList.toggle('hidden', !!frame.alias);
    root.querySelector('#alias-sql')!.classList.toggle('hidden', !frame.alias);
    root.querySelector('#note')!.textContent = frame.note;

    if (scene.sortKeys) {
      const body = root.querySelector<HTMLTableSectionElement>('#result tbody')!;
      const rows = [...body.rows].sort((a, b) => Number(a.dataset.row) - Number(b.dataset.row));
      for (const row of rows) {
        row.classList.remove('sort-picked');
        row.style.transform = '';
      }
      const relocate = (move: Move) => {
        if (!('row' in move.from) || !move.to || !('row' in move.to)) throw new Error('ORDER BY cần hai vị trí dòng');
        const [picked] = rows.splice(move.from.row, 1);
        rows.splice(move.to.row, 0, picked);
        return picked;
      };
      arrived.forEach(relocate);
      body.replaceChildren(...rows);

      if (current && 'row' in current.from) {
        rows[current.from.row].classList.add('sort-picked');
        if (frame.progress !== undefined) {
          // Take measurements before the move, then animate the rows from those positions.
          const tops = new Map(rows.map(row => [row, row.getBoundingClientRect().top]));
          const picked = relocate(current);
          body.replaceChildren(...rows);
          const t = frame.progress;
          const progress = t * t * (3 - 2 * t);
          for (const row of rows) {
            const offset = (tops.get(row)! - row.getBoundingClientRect().top) * (1 - progress);
            const lift = row === picked ? 10 * Math.sin(Math.PI * progress) : 0;
            if (offset || lift) row.style.transform = `translate(${lift}px, ${offset}px)`;
          }
        }
      }
      root.querySelector('#result h2')!.textContent = frame.completed === scene.moves.length ? scene.rightTitle : 'Kết quả đang sắp xếp';
      return;
    }

    const left = [...root.querySelectorAll<HTMLTableRowElement>('#source tr')];
    const right = [...root.querySelectorAll<HTMLTableRowElement>('#result tr')];
    const floating = root.querySelector('#floating')!;
    floating.replaceChildren();
    const cells = (table: HTMLTableRowElement[], target: Target): HTMLTableCellElement[] => {
      if ('rows' in target) return target.rows.flatMap(row => [...table[row + 1].cells]);
      if ('row' in target && 'column' in target) return [table[target.row + 1].cells[target.column]];
      if ('row' in target) return [...table[target.row + 1].cells];
      return table.map(row => row.cells[target.column]);
    };
    const visible = new Set(arrived.flatMap(move => move.to ? cells(right, move.to) : []));
    const last = arrived.at(-1)?.to;
    const landed = new Set(last ? cells(right, last) : []);
    const excluded = new Set(arrived.flatMap(move => move.to ? [] : cells(left, move.from)));
    const active = new Set(current ? [current.from, ...(current.related ?? [])].flatMap(target => cells(left, target)) : []);
    // A computed column header is present from the start; each result cell has its own transfer.
    scene.moves.forEach(move => {
      if (move.computed && move.to && 'column' in move.to) visible.add(right[0].cells[move.to.column]);
    });
    if (scene.moves.some(move => move.to && ('rows' in move.to || ('row' in move.to && !('column' in move.to))))) {
      [...right[0].cells].forEach(cell => visible.add(cell));
    }
    for (const row of left) for (const cell of row.cells) {
      cell.classList.toggle('marked', active.has(cell));
      cell.classList.toggle('excluded', excluded.has(cell) || (active.has(cell) && !current?.to));
    }
    for (const [index, row] of right.entries()) for (const cell of row.cells) {
      const span = cell.firstElementChild!;
      span.classList.toggle('pending', !visible.has(cell));
      cell.classList.toggle('landed', landed.has(cell));
      if (index === 0 && scene.aliases) {
        span.textContent = (frame.alias ? scene.aliases : scene.right!.columns)[cell.cellIndex];
        cell.classList.toggle('renamed', !!frame.alias && scene.right!.columns[cell.cellIndex] !== scene.aliases[cell.cellIndex]);
      }
    }
    if (current?.to && frame.progress !== undefined) {
      const start = cells(left, current.from);
      const end = cells(right, current.to);
      const t = frame.progress;
      const p = t * t * (3 - 2 * t);
      const mix = (a: number, b: number) => a + (b - a) * p;
      start.forEach((cell, i) => {
        const a = cell.getBoundingClientRect();
        const b = end[i].getBoundingClientRect();
        const copy = document.createElement('span');
        copy.className = `moving${current.computed ? ' computed' : ''}${cell.tagName === 'TH' ? ' column-heading' : ''}`;
        copy.textContent = (current.computed ? end[i] : cell).textContent;
        copy.style.fontSize = getComputedStyle(cell).fontSize;
        copy.style.left = `${mix(a.x, b.x)}px`;
        copy.style.top = `${mix(a.y, b.y)}px`;
        copy.style.width = `${mix(a.width, b.width)}px`;
        copy.style.height = `${mix(a.height, b.height)}px`;
        floating.append(copy);
      });
    }
  }, { scene, frame });
}

function mdx(id: string) {
  const folder = 'src/content/lessons';
  const filename = readdirSync(folder).find(name => name.startsWith(`${id.slice(0, 3)}-`) && name.endsWith('.mdx'));
  assert(filename, `Không tìm thấy bài ${id}`);
  const lesson = readFileSync(`${folder}/${filename}`, 'utf8').replace(/\r\n?/g, '\n');
  const match = lesson.match(/<AnimatedFlow query=\{(`[^]*?`)\} steps=\{([^]*?)\} animation="([a-z0-9-]+)"/);
  assert(match?.[3] === id, `Không tìm thấy AnimatedFlow ${id}`);
  const query: string = runInNewContext(match[1]);
  const steps: FlowStep[] = JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
  const displayed = [...lesson.slice(0, match.index).matchAll(/<Sql code=\{(`[^]*?`)\}\s*\/>/g)].at(-1);
  assert(displayed && runInNewContext(displayed[1]) === query, 'SQL hiển thị và SQL của AnimatedFlow không khớp');
  const problems = checkFlow(steps, query);
  assert.equal(problems.length, 0, problems.join('\n'));
  return { query, steps };
}

const meta = (table: Table | undefined) => table
  ? `${table.rows.length < table.total ? `Trích ${table.rows.length}/${table.total}` : table.total} dòng · ${table.columns.length < table.totalColumns ? `${table.columns.length}/${table.totalColumns}` : table.totalColumns} cột`
  : '';

export async function renderFlow(id: string) {
  const { query, steps } = mdx(id);
  const scenes = storyboard(id, query, steps);
  const folder = `public/lesson-animations/${id}`;
  const scratch = mkdtempSync(join(tmpdir(), `lesson-${id}-`));
  const staticScenes: { step: number; file: string; alt: string }[] = [];
  const timeline: number[] = [];
  let count = 0;
  const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL || 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width, height } });
    const css = readFileSync(theme, 'utf8');
    const save = async (scene: Scene, frame: Frame, hold = 1, file?: string) => {
      await drawFrame(page, scene, frame);
      const png = await page.screenshot({ path: join(scratch, `${count}.png`) });
      if (file) {
        const problems = await page.evaluate(() => {
          const pairs = [['.query-box', 'pre:not(.hidden)'], ['.query-box', '.explanation'], ['.tables', '#source'], ['.tables', '#result'], ['#source', 'table'], ['#result', 'table']];
          return pairs.flatMap(([parent, child]) => {
            const container = document.querySelector(parent)!;
            const outer = container.getBoundingClientRect();
            const inner = container.querySelector(child)?.getBoundingClientRect();
            return inner && (inner.top < outer.top || inner.bottom > outer.bottom || inner.right > outer.right) ? [`${parent} ${child}`] : [];
          });
        });
        assert.equal(problems.length, 0, `${id}/${file}: nội dung vượt khung ${problems.join(', ')} (${join(scratch, `${count}.png`)})`);
        assert.equal(await page.locator('#result .pending, .moving').count(), 0, `${id}/${file}: ảnh tĩnh còn ô đang chờ`);
        if (scene.sortKeys) {
          const shown = await page.locator('#result tbody tr').evaluateAll(rows => rows.map(row =>
            [...row.querySelectorAll('td')].map(cell => cell.textContent)));
          assert.deepEqual(shown, scene.right!.rows.map(row => row.map(value => String(value ?? 'NULL'))), `${id}/${file}: sai thứ tự kết quả`);
        }
      }
      for (let i = 0; i < hold; i++) timeline.push(count);
      count++;
      if (file) writeFileSync(join(scratch, file), png);
    };

    for (const scene of scenes) {
      const stages = scenes.map(step => `<span${step === scene ? ' class="active"' : ''}>${escape(step.clause)}</span>`).join('');
      const layout = query.split('\n').length > 8 ? 'long-query' : '';
      await page.setContent(`<!doctype html><meta charset="utf-8"><style>${fontCss}${css}</style><main class="${layout}">
        <nav class="stages">${stages}</nav>
        <section class="query-box"><pre id="normal-sql">${queryHtml(query, scene)}</pre><pre id="alias-sql" class="hidden">${scene.aliases ? queryHtml(query, scene, true) : ''}</pre>
          <div class="explanation"><h2>${escape(scene.title)}</h2><p id="note"></p></div></section>
        <div class="tables"><section class="card" id="source"><h2>${escape(scene.leftTitle)}</h2><p class="meta">${meta(scene.left)}</p>${tableHtml(scene.left)}</section>
          <span class="bridge">${scene.sortKeys ? '' : '→'}</span><section class="card" id="result"><h2>${escape(scene.rightTitle)}</h2><p class="meta">${meta(scene.right)}</p>${tableHtml(scene.sortKeys ? scene.left : scene.right, scene.aliases, scene.sortKeys)}</section></div>
        <div class="footer">${escape(scene.conclusion)}</div>
        <p class="excerpt">${escape(scene.scopeNote ?? 'Minh họa xử lý logic · Thứ tự trước ORDER BY chỉ là minh họa.')}</p><div id="floating"></div></main>`);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        const sql = document.querySelector('#normal-sql')!;
        // Reserve the same SQL space throughout a scene, including wrapped statements.
        const box = document.querySelector<HTMLElement>('.query-box')!;
        box.style.height = `${Math.max(174, Math.ceil(sql.getBoundingClientRect().height) + 28)}px`;
      });
      const file = `${scene.file}.png`;
      await save(scene, { completed: 0, note: scene.intro }, scene.step === 0 ? 24 : 15, scene.step === 0 ? 'poster.png' : undefined);
      for (const [index, move] of scene.moves.entries()) {
        for (const cue of move.cues) {
          await save(scene, { completed: index, active: index, note: cue }, move.computed || !move.to ? 13 : 3);
        }
        if (move.to) for (let tick = 0; tick < 9; tick++) {
          await save(scene, { completed: index, active: index, progress: tick / 9, note: move.cues.at(-1)! });
        }
      }
      const lastComputed = scene.moves.findLast(move => move.computed);
      const finalNote = lastComputed?.cues.at(-1) ?? scene.conclusion;
      const separateAlias = scene.aliases && id === '2-1-select';
      if (!scene.aliases || separateAlias) {
        await save(scene, { completed: scene.moves.length, note: finalNote }, scene.step === 0 ? 1 : 24, file);
        staticScenes.push({ step: scene.step, file, alt: [scene.title, scene.sortKeys ? scene.intro : undefined, scene.conclusion, scene.scopeNote].filter(Boolean).join(' ') });
      } else {
        await save(scene, { completed: scene.moves.length, note: finalNote }, lastComputed ? 22 : 9);
      }
      if (scene.aliases) {
        const note = 'AS đặt tiêu đề cột. Các giá trị giữ nguyên.';
        const aliasFile = separateAlias ? 'aliases.png' : file;
        await save(scene, { completed: scene.moves.length, note: lastComputed ? `${finalNote} ${note}` : note, alias: true }, 23, aliasFile);
        staticScenes.push({ step: scene.step, file: aliasFile, alt: `${scene.title} ${note}` });
      }
      console.log(`${id}: ${scene.clause} · ${scene.moves.length} thao tác`);
    }
  } finally {
    await browser.close();
  }

  const python = process.env.PYTHON || 'python';
  const columns = 10;
  const rows = Math.ceil(count / columns);
  const sheet = join(scratch, 'sheet.png');
  execFileSync(python, ['-c', `
from pathlib import Path
from PIL import Image
import sys
folder = Path(sys.argv[1])
width, height, cols, rows, count = map(int, sys.argv[2:])
sheet = Image.new('RGB', (width * cols, height * rows), '#0c0b1d')
for i in range(count):
    with Image.open(folder / f'{i}.png') as frame:
        sheet.paste(frame, (i % cols * width, i // cols * height))
sheet.save(folder / 'sheet.png')
`, scratch, ...[width, height, columns, rows, count].map(String)], { stdio: 'inherit' });
  execFileSync(python, [encoder, sheet, '--grid', `${columns}x${rows}`, '--crop', '0', '--fps', String(fps), '--size', String(width),
    '--no-dither', '--order', timeline.join(','), '--out', join(scratch, 'animation.gif')], { stdio: 'inherit' });

  const sources = [theme, renderer, 'scripts/animations/storyboard.mts', 'scripts/animations/select-story.ts', 'src/lib/run-flow.ts', encoder, ...fonts];
  const files: Record<string, string> = {};
  mkdirSync(folder, { recursive: true });
  for (const file of ['animation.gif', 'poster.png', ...staticScenes.map(scene => scene.file)]) {
    const bytes = readFileSync(join(scratch, file));
    files[file] = createHash('sha256').update(bytes).digest('hex');
    writeFileSync(`${folder}/${file}`, bytes);
  }
  const filter = scenes.find(scene => scene.clause === 'WHERE');
  const shown = filter ? ` WHERE giữ các dòng minh họa ${filter.right!.rows.map(row => row[0]).join(', ')}.` : '';
  const last = scenes.at(-1)!;
  const alt = `Minh họa ${scenes.map(scene => scene.clause).join(' → ')}.${shown} Kết quả có ${last.right!.total} ${id === '2-1-select' ? 'hồ sơ' : 'dòng'}.`;
  const caption = 'Minh họa xử lý logic. Bảng trái là đầu vào của bước đang xem. Số dòng và cột trích được ghi ở mỗi bảng.';
  writeFileSync(`${folder}/manifest.json`, JSON.stringify({ fingerprint: animationFingerprint(query, steps, sources), sources, width, height, files, caption, alt, scenes: staticScenes }, null, 2) + '\n');
  console.log(`Đã xuất ${folder}; khung gốc nằm tại ${scratch}`);
}
