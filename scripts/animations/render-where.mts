import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { animationFingerprint } from '../../src/lib/animation-assets.ts';
import { checkFlow, type FlowStep } from '../../src/lib/run-flow.ts';

const lesson = readFileSync('src/content/lessons/2-2-where-loc-nhu-autofilter.mdx', 'utf8').replace(/\r\n?/g, '\n');
const match = lesson.match(/<AnimatedFlow query=\{(`[^]*?`)\} steps=\{([^]*?)\} animation="2-2-where"/);
if (!match) throw new Error('Không tìm thấy dữ liệu AnimatedFlow');
const query = runInNewContext(match[1]);
const steps: FlowStep[] = JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
const problems = checkFlow(steps, query);
if (problems.length) throw new Error(problems.join('\n'));
const lessonSql = lesson.match(/<Sql code=\{(`[^]*?`)\}\s*\/>\s*[^]*?<AnimatedFlow query=/);
if (!lessonSql || runInNewContext(lessonSql[1]) !== query) throw new Error('SQL hiển thị và SQL minh họa không khớp');
const expected = `SELECT MaNV AS [Mã nhân viên], HoTen AS [Họ tên],
\tMaPB AS [Mã phòng], TrangThai AS [Trạng thái]
FROM NhanVien
WHERE MaPB = 'KD';`;
if (query !== expected) throw new Error('Cần cập nhật SQL trên ảnh trước khi dựng');
const [source, filtered, result] = steps;
const outputColumns = ['MaNV', 'HoTen', 'MaPB', 'TrangThai'];
const sampleColumns = [...outputColumns, 'GioiTinh'];
const preview = (step: FlowStep) => step.rows.map(row => sampleColumns.map(name => row[step.columns.indexOf(name)]));
const rows = preview(source);
const filteredRows = preview(filtered);
const sourceIndexes = filteredRows.map(row => rows.findIndex(candidate => candidate[0] === row[0]));
const kept = rows.filter(row => row[2] === 'KD').map(row => row.slice(0, outputColumns.length));
if (steps.length !== 3 || steps.map(s => s.clause).join(',') !== 'FROM,WHERE,SELECT' ||
    source.total !== 48 || filtered.total !== 14 || result.total !== filtered.total ||
    sampleColumns.some(name => !source.columns.includes(name) || !filtered.columns.includes(name)) ||
    filteredRows.length !== 3 || sourceIndexes.some((index, i) => index !== i + 1) ||
    JSON.stringify(kept) !== JSON.stringify(result.rows) || JSON.stringify(filtered.rows) !== JSON.stringify(source.rows.filter(row => row[source.columns.indexOf('MaPB')] === 'KD')) ||
    JSON.stringify(result.columns) !== JSON.stringify(['Mã nhân viên', 'Họ tên', 'Mã phòng', 'Trạng thái']) ||
    source.columns.length !== 12 || filtered.columns.length !== 12 || rows.length !== 4 || rows[0][0] !== 'NV001' || rows[0][2] !== 'KT' || rows[3][0] !== 'NV020' || rows[3][3] !== 'Đã nghỉ')
  throw new Error('Kịch bản WHERE cần cập nhật theo SQL hoặc dữ liệu mới');
const folder = 'public/lesson-animations/2-2-where';
mkdirSync(folder, { recursive: true });
const scratch = mkdtempSync(join(tmpdir(), 'lesson-where-'));
const fonts = ['node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-latin-400-normal.woff','node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-vietnamese-400-normal.woff'];
const fontCss = fonts.map((path,i)=>`@font-face{font-family:${i<2?'UI':'Code'};src:url(data:font/woff;base64,${readFileSync(path).toString('base64')});${i%2?'unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;':''}}`).join('');
const esc = (s: unknown) => String(s ?? 'NULL').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const table = (data: FlowStep['rows'], id: string, widths: number[]) => `
<table id="${id}">
  <colgroup>${widths.map(width => `<col style="width:${width}%">`).join('')}</colgroup>
  <thead><tr>${sampleColumns.map(name => `<th><span>${esc(name)}</span></th>`).join('')}</tr></thead>
  <tbody>${data.map(row => `<tr>${row.map(value => `<td><span>${esc(value)}</span></td>`).join('')}</tr>`).join('')}</tbody>
</table>`;
const filteredWidths = [16, 29, 13, 22, 20];
const resultWidths = [21, 32, 18, 29, 0];
const pulse = readFileSync('src/assets/animations/select-pulse.png').toString('base64');
const html = `<!doctype html><meta charset="utf-8"><style>${fontCss}${readFileSync('scripts/animations/select.css','utf8')}
.stages { grid-template-columns: repeat(3, 1fr); gap: 16px; }
.query pre { font-size: 16px; line-height: 1.65; }
.explanation { left: 610px; }
.card { height: 290px; }
table, th { font-size: 14px; }
th, td { padding: 0; overflow: hidden; }
th span, td span { display: block; padding: 0 6px; }
th span { white-space: normal; line-height: 17px; }
#destination th.alias { color: var(--animation-pink); font: 14px UI; }
#destination .unselected { background: #1b1831; color: var(--animation-muted); }
#source .excluded td { color: #817e9b; text-decoration: line-through; }
#source .tested td:nth-child(3) { color: var(--animation-ink); background: #463864; }
#source .excluded.tested td:nth-child(3) { color: var(--animation-pink); background: #482541; text-decoration: none; }
#source .kept td, #destination .kept td { background: #29244e; }
#source .kept.tested td:nth-child(3) { background: #463864; }
#travel { position: absolute; z-index: 2; pointer-events: none; }
#travel:not([hidden]) { display: grid; }
#travel span {
  padding: 0 6px; overflow: hidden; white-space: nowrap;
  font: 14px/35px UI; background: #342957; border: 1px solid #524277;
  box-shadow: 0 0 10px #b8a4ff33;
}
#travel span:nth-child(3) { color: var(--animation-pink); }
#pulse { background-image: url(data:image/png;base64,${pulse}); }
.footer p { font-size: 17px; }
</style><div class="eyebrow">SQL SERVER / BÀI 2.2</div><div class="purpose">ĐỐI CHIẾU HỒ SƠ PHÒNG KD</div><h1>WHERE lọc từng dòng</h1><div class="logic">MINH HỌA XỬ LÝ LOGIC</div>
<div class="stages"><span id="s0">01 FROM · Nguồn</span><span id="s1">02 WHERE · Lọc dòng</span><span id="s2">03 SELECT · Chọn cột</span></div>
<div class="query"><pre><span id="q2">SELECT MaNV <span class="sql-alias">AS [Mã nhân viên]</span>, HoTen <span class="sql-alias">AS [Họ tên]</span>,
       MaPB <span class="sql-alias">AS [Mã phòng]</span>, TrangThai <span class="sql-alias">AS [Trạng thái]</span></span>
<span id="q0">FROM NhanVien</span>
<span id="q1">WHERE MaPB = 'KD';</span></pre><div class="explanation"><h2 id="action"></h2><p id="explain"></p></div></div>
<div class="card source-card"><h2>Bảng nguồn / NhanVien</h2><div class="meta">Trích ${rows.length}/${source.total} dòng · ${sampleColumns.length}/${source.columns.length} cột</div>${table(rows, 'source', filteredWidths)}</div>
<div id="bridge">→<span id="pulse"></span></div>
<div class="card result-card"><h2 id="result-title"></h2><div class="meta" id="count"></div>${table(filteredRows, 'destination', filteredWidths)}</div>
<div id="travel" hidden>${sampleColumns.map(() => '<span></span>').join('')}</div>
<div class="footer"><strong id="badge"></strong><p id="conclusion"></p></div>
<p class="excerpt">Bảng chỉ hiện dữ liệu trích · Thứ tự dòng có thể khác khi chạy SQL.</p>`;
const scenes = new Map([[5, 'poster'], [19, 'from'], [83, 'where'], [132, 'select']]);
const firstTransfers = [35, 47, 59];
const transferFrames = 11;
const frameCount = 150;
const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL || 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 824 }, deviceScaleFactor: 1 });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  for (let frame = 0; frame < frameCount; frame++) {
    await page.evaluate(({
      frame, firstTransfers, transferFrames, sourceIndexes, sampleColumns, aliases, filteredWidths, resultWidths,
      sourceTotal, filteredTotal, sourceColumnCount,
    }) => {
      const get = (id: string) => document.getElementById(id)!;
      const smooth = (progress: number) => progress * progress * (3 - 2 * progress);
      const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
      const stage = frame < 28 ? 0 : frame < 95 ? 1 : 2;
      const alias = frame >= 115;
      const remove = smooth(Math.max(0, Math.min(1, (frame - 100) / 13)));
      const moving = firstTransfers.findIndex(start => frame >= start && frame < start + transferFrames);
      const landed = firstTransfers.filter(start => frame >= start + transferFrames).length;
      const sourceRows = Array.from(document.querySelectorAll<HTMLTableRowElement>('#source tbody tr'));
      const destinationRows = Array.from(document.querySelectorAll<HTMLTableRowElement>('#destination tbody tr'));
      const testedRow = moving < 0 ? -1 : sourceIndexes[moving];
      const filteredReady = landed === firstTransfers.length;
      const sampleCount = `Trích ${destinationRows.length}/${filteredTotal} dòng`;

      for (let i = 0; i < 3; i++) {
        get(`s${i}`).classList.toggle('active', i === stage);
        get(`q${i}`).classList.toggle('focus', i === stage && !alias);
      }
      document.querySelectorAll('.sql-alias').forEach(part => part.classList.toggle('alias-focus', alias));
      sourceRows.forEach((row, i) => {
        const keptIndex = sourceIndexes.indexOf(i);
        row.classList.toggle('excluded', stage > 0 && keptIndex < 0);
        row.classList.toggle('kept', keptIndex >= 0 && (keptIndex < landed || i === testedRow));
        row.classList.toggle('tested', i === testedRow || (i === 0 && stage === 1 && frame < firstTransfers[0]));
      });

      const destination = get('destination') as HTMLTableElement;
      destination.style.visibility = stage === 0 ? 'hidden' : 'visible';
      destinationRows.forEach((row, index) => {
        row.style.visibility = index < landed ? 'visible' : 'hidden';
        row.classList.toggle('kept', index < landed);
      });
      destination.querySelectorAll('col').forEach((col, i) => {
        col.style.width = `${mix(filteredWidths[i], resultWidths[i], remove)}%`;
      });
      destination.querySelectorAll<HTMLElement>('tr > :last-child, col:last-child').forEach(cell => {
        cell.style.display = remove === 1 ? 'none' : '';
        cell.classList.toggle('unselected', stage === 2);
        const value = cell.firstElementChild as HTMLElement | null;
        if (value) value.style.opacity = String(1 - remove);
      });
      destination.tHead!.rows[0].querySelectorAll('th').forEach((header, i) => {
        header.firstElementChild!.textContent = alias && i < aliases.length ? aliases[i] : sampleColumns[i];
        header.classList.toggle('alias', alias && i < aliases.length);
      });

      get('action').textContent = alias ? 'Đặt tiêu đề tiếng Việt'
        : ['Chọn bảng nguồn', 'Giữ dòng có mã KD', 'Chọn bốn cột'][stage];
      get('explain').innerHTML = alias ? 'AS đặt tiêu đề trong SELECT.<br>Các giá trị giữ nguyên.'
        : [
          'FROM xác định NhanVien.<br>Chưa lọc dòng hay chọn cột.',
          'WHERE xét MaPB từng dòng.<br>Chỉ dòng có mã KD được giữ.',
          'SELECT giữ bốn cột cần gửi.<br>Ví dụ: bỏ cột GioiTinh khỏi kết quả.',
        ][stage];
      get('result-title').textContent = remove === 1 ? 'Kết quả truy vấn' : 'Sau bước lọc';
      get('count').textContent = stage === 0 ? 'Chờ lọc'
        : !filteredReady ? `Đã hiện ${landed}/${destinationRows.length} dòng mẫu đạt`
        : remove === 1 ? `${sampleCount} · đủ ${aliases.length} cột`
        : `${sampleCount} · ${sampleColumns.length}/${sourceColumnCount} cột`;
      get('badge').textContent = [
        `${sourceTotal} DÒNG NGUỒN`, `${sourceTotal} → ${filteredTotal} DÒNG`, `${sourceColumnCount} → ${aliases.length} CỘT`,
      ][stage];
      get('conclusion').textContent = stage === 0 ? 'Bảng trích có cả mã KT và KD.'
        : stage === 2 ? `Giữ nguyên ${filteredTotal} dòng đã lọc. SELECT chỉ chọn cột.`
        : filteredReady ? `Còn ${filteredTotal} dòng và đủ ${sourceColumnCount} cột. NV020 đã nghỉ vẫn được giữ.`
        : moving >= 0 || landed > 0
          ? `${sourceRows[moving >= 0 ? testedRow : sourceIndexes[landed - 1]].cells[0].textContent}: KD bằng KD, giữ dòng.`
        : 'NV001: KT khác KD, loại khỏi kết quả.';

      const travel = get('travel');
      travel.hidden = moving < 0;
      const pulse = get('pulse');
      pulse.style.visibility = moving < 0 ? 'hidden' : 'visible';
      if (moving >= 0) {
        const from = sourceRows[testedRow];
        const to = destinationRows[moving];
        const progress = smooth((frame - firstTransfers[moving]) / transferFrames);
        const fromRect = from.getBoundingClientRect();
        const toRect = to.getBoundingClientRect();
        travel.style.left = `${mix(fromRect.x, toRect.x, progress)}px`;
        travel.style.top = `${mix(fromRect.y, toRect.y, progress)}px`;
        travel.style.gridTemplateColumns = Array.from(from.cells).map((cell, i) =>
          `${mix(cell.getBoundingClientRect().width, to.cells[i].getBoundingClientRect().width, progress)}px`).join(' ');
        Array.from(travel.children).forEach((cell, i) => cell.textContent = from.cells[i].textContent);
        const spriteFrame = frame % 16;
        pulse.style.backgroundPosition = `${-(spriteFrame % 4) * 32}px ${-Math.floor(spriteFrame / 4) * 14}px`;
      }
    }, {
      frame, firstTransfers, transferFrames, sourceIndexes, sampleColumns, aliases: result.columns, filteredWidths,
      resultWidths, sourceTotal: source.total, filteredTotal: filtered.total, sourceColumnCount: source.columns.length,
    });
    const png = await page.screenshot({ path: join(scratch, `${frame}.png`) });
    const name = scenes.get(frame);
    if (name) writeFileSync(`${folder}/${name}.png`, png);
  }
} finally {
  await browser.close();
}
const python = process.env.PYTHON || 'python';
function run(args: string[]) {
  const result = spawnSync(python, args, { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Python failed: ${result.status}`);
}
// Match the SELECT sheet geometry. The margins are removed by the encoder's 3% crop.
run(['-c', `from PIL import Image
from pathlib import Path
p = Path(${JSON.stringify(scratch)})
sheet = Image.new('RGB', (11480, 13140), '#0c0b1d')
for i in range(${frameCount}):
    with Image.open(p / f'{i}.png') as frame:
        sheet.paste(frame, ((i % 10) * 1148 + 34, (i // 10) * 876 + 26))
sheet.save(p / 'sheet.png')`]);
run(['scripts/animations/sheet_to_gif.py', join(scratch, 'sheet.png'),
  '--grid', '10x15', '--fps', '10', '--size', '1080', '--no-dither', '--out', `${folder}/animation.gif`]);
const sources = [
  'scripts/animations/select.css', 'scripts/animations/render-where.mts', 'scripts/animations/sheet_to_gif.py',
  'src/assets/animations/select-pulse.png', ...fonts,
];
const files = Object.fromEntries(['animation.gif', ...Array.from(scenes.values(), scene => `${scene}.png`)]
  .map(file => [file, createHash('sha256').update(readFileSync(`${folder}/${file}`)).digest('hex')]));
writeFileSync(`${folder}/manifest.json`, JSON.stringify({
  fingerprint: animationFingerprint(query, steps, sources), sources, width: 1080, height: 824, files,
  caption: `Minh họa xử lý logic. Bảng nguồn trích ${rows.length} trong ${source.total} hồ sơ và ${sampleColumns.length} trong ${source.columns.length} cột. Thứ tự dòng có thể khác khi chạy SQL.`,
  alt: 'FROM chọn bảng nguồn. WHERE loại NV001 mã KT và chuyển lần lượt ba hồ sơ mẫu mã KD sang bảng bên phải, gồm NV020 đã nghỉ. SELECT giữ các dòng, chọn bốn cột và đặt tiêu đề tiếng Việt.',
  scenes: [
    { step: 0, file: 'from.png', alt: 'FROM chọn bảng NhanVien làm nguồn. Bảng trái trích bốn hồ sơ và năm cột.' },
    { step: 1, file: 'where.png', alt: 'WHERE loại NV001 mã KT. Bảng phải trích ba trong 14 hồ sơ mã KD. Bước lọc vẫn giữ 12 cột, trong đó có GioiTinh.' },
    { step: 2, file: 'select.png', alt: 'SELECT giữ 14 hồ sơ, bỏ GioiTinh khỏi kết quả và hiển thị bốn cột với tiêu đề tiếng Việt.' },
  ],
}, null, 2) + '\n');
console.log(`Rendered ${folder}; temporary frames in ${scratch}`);
