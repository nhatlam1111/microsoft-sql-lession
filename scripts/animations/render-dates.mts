import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { animationFingerprint } from '../../src/lib/animation-assets.ts';
import { checkFlow, type FlowStep } from '../../src/lib/run-flow.ts';

const lesson = readFileSync('src/content/lessons/2-8-ham-ngay-tham-nien.mdx', 'utf8').replace(/\r\n?/g, '\n');
const match = lesson.match(/<AnimatedFlow query=\{(`[^]*?`)\} steps=\{([^]*?)\} animation="2-8-dates"/);
if (!match) throw new Error('Không tìm thấy AnimatedFlow 2.8');
const query: string = runInNewContext(match[1]);
const steps: FlowStep[] = JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
const issues = checkFlow(steps, query);
if (issues.length) throw new Error(issues.join('\n'));
const displayed = lesson.match(/<Sql code=\{(`[^]*?`)\}\s*\/>\s*[^]*?<AnimatedFlow query=/);
if (!displayed || runInNewContext(displayed[1]) !== query) throw new Error('SQL hiển thị không khớp');
const expected = `SELECT MaHD, MaNV, NgayBatDau, NgayKetThuc,\n\tDATEDIFF(day, CAST('20261021' AS date), NgayKetThuc) AS [SoNgayConLai]\nFROM HopDong\nWHERE NgayKetThuc >= CAST('20261021' AS date)\n\tAND NgayKetThuc <= DATEADD(day, 30, CAST('20261021' AS date))\nORDER BY NgayKetThuc ASC, MaHD ASC;`;
if (query !== expected) throw new Error('Cần cập nhật kịch bản SQL');
const [source, filtered, selected, ordered] = steps;
const get = (step: FlowStep, id: string, column: string) => step.rows.find(row => row[0] === id)?.[step.columns.indexOf(column)];
const ids = ['HD2024-008', 'HD2025-014'];
if (steps.map(s => `${s.clause}:${s.total}`).join(',') !== 'FROM:55,WHERE:3,SELECT:3,ORDER BY:3' ||
  JSON.stringify(source.rows.map(r => r[0])) !== JSON.stringify(['HD2015-001','HD2023-003','HD2024-008','HD2025-014','HD2026-002']) ||
  JSON.stringify(ids.map(id => get(source,id,'NgayKetThuc'))) !== JSON.stringify(['2026-11-14','2026-10-31']) ||
  ids.some(id => !filtered.rows.some(row => row[0] === id)) ||
  JSON.stringify(ids.map(id => get(selected,id,'SoNgayConLai'))) !== '[24,10]' ||
  JSON.stringify(ordered.rows.map(row => row[0])) !== JSON.stringify(['HD2025-014','HD2026-004','HD2024-008']))
  throw new Error('Kịch bản không khớp dữ liệu bước');

const folder = 'public/lesson-animations/2-8-dates'; mkdirSync(folder, { recursive: true });
const scratch = mkdtempSync(join(tmpdir(), 'lesson-dates-'));
const fonts = ['node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-latin-400-normal.woff','node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-vietnamese-400-normal.woff'];
const fontCss = fonts.map((path,i) => `@font-face{font-family:${i<2?'UI':'Code'};src:url(data:font/woff;base64,${readFileSync(path).toString('base64')});${i%2?'unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;':''}}`).join('');
const esc = (value: unknown) => String(value ?? 'NULL').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const cells = (step: FlowStep, columns: string[], rows = step.rows) => rows.map(row => `<tr>${columns.map(col => `<td>${esc(row[step.columns.indexOf(col)])}</td>`).join('')}</tr>`).join('');
const names = ['MaHD','NgayKetThuc'];
const filteredRows = ids.map(id => filtered.rows.find(row => row[0] === id)!);
const selectedRows = ids.map(id => selected.rows.find(row => row[0] === id)!);
const table = (id: string, headers: string[], body: string) => `<table id="${id}"><thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table>`;
const lines = query.split('\n');
const pulse = readFileSync('src/assets/animations/select-pulse.png').toString('base64');
const html = `<!doctype html><meta charset="utf-8"><style>${fontCss}${readFileSync('scripts/animations/select.css','utf8')}
.stages{grid-template-columns:repeat(4,1fr);gap:10px}.stages span{font:14px Code;padding:16px 10px}.query pre{font-size:12px;line-height:1.8;top:10px}.explanation{left:680px;padding-left:15px}.explanation h2{font-size:18px;margin-bottom:8px}.explanation p{font-size:15px;line-height:1.4}.card{height:298px;padding:14px}.card h2{font-size:18px}.meta{font-size:13px;margin-bottom:10px}table,th{font-size:13px}th,td{padding:4px 7px;height:35px}th{height:42px;white-space:normal;overflow-wrap:anywhere;line-height:14px}.excluded td{color:#817e9b;text-decoration:line-through}.kept td{background:#29244e}.tested td{outline:1px solid #b8a4ff;outline-offset:-1px}#result tbody tr{position:relative}#result tbody td{background:var(--animation-grid)}#result td:last-child{color:var(--animation-pink)}#travel{position:absolute;z-index:3;display:grid;pointer-events:none}#travel span{font:13px/35px UI;background:#342957;border:1px solid #524277;overflow:hidden;white-space:nowrap}#number{position:absolute;z-index:4;background:#49305b;border:1px solid #ffaee6;border-radius:4px;padding:5px;color:#ffaee6;font:17px Code}#pulse{background-image:url(data:image/png;base64,${pulse})}.footer p{font-size:14px}
</style><div class="eyebrow">SQL SERVER / BÀI 2.8</div><div class="purpose">NHÂN SỰ · RÀ HỢP ĐỒNG</div><h1>Ngày kết thúc và số ngày còn lại</h1><div class="logic">MINH HỌA XỬ LÝ LOGIC</div>
<div class="stages"><span id="s0">01 FROM · Nguồn</span><span id="s1">02 WHERE · Lọc</span><span id="s2">03 SELECT · Tính</span><span id="s3">04 ORDER BY · Xếp</span></div>
<div class="query"><pre><span id="q2">${esc(lines[0])}\n${esc(lines[1])}</span>\n<span id="q0">${esc(lines[2])}</span>\n<span id="q1">${esc(lines[3])}\n${esc(lines[4])}</span>\n<span id="q3">${esc(lines[5])}</span></pre><div class="explanation"><h2 id="action"></h2><p id="explain"></p></div></div>
<div class="card source-card"><h2>Nguồn / HopDong</h2><div class="meta">Trích 5/55 hợp đồng · 2/6 cột</div>${table('source',names,cells(source,names))}</div><div id="bridge">→<span id="pulse"></span></div><div class="card result-card"><h2 id="result-title"></h2><div class="meta" id="count"></div>${table('filtered',names,cells(filtered,names,filteredRows))}${table('result',[...names,'SoNgayConLai'],cells(selected,[...names,'SoNgayConLai'],selectedRows))}</div><div id="travel"><span></span><span></span></div><div id="number"></div><div class="footer"><strong id="badge"></strong><p id="conclusion"></p></div><p class="excerpt">Trích 2/3 kết quả; hợp đồng thứ ba không hiện. Thứ tự trước ORDER BY là minh họa.</p>`;

const scenes = new Map([[2,'poster'],[10,'from'],[70,'where'],[106,'select'],[149,'order']]);
const frameCount = 154;
const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL || 'chrome', headless: true });
try {
  const page = await browser.newPage({viewport:{width:1080,height:824},deviceScaleFactor:1});
  await page.setContent(html); await page.evaluate(() => document.fonts.ready);
  for (let frame=0; frame<frameCount; frame++) {
    await page.evaluate((frame) => {
      const el = (id:string) => document.getElementById(id)!;
      const smooth = (v:number) => {const x=Math.max(0,Math.min(1,v));return x*x*(3-2*x)};
      const mix = (a:number,b:number,p:number) => a+(b-a)*p;
      const stage = frame<18?0:frame<74?1:frame<112?2:3;
      for (let i=0;i<4;i++){el(`s${i}`).classList.toggle('active', i===stage);el(`q${i}`).classList.toggle('focus', i===stage)}
      const src=Array.from(document.querySelectorAll<HTMLTableRowElement>('#source tbody tr'));
      const dst=Array.from(document.querySelectorAll<HTMLTableRowElement>('#filtered tbody tr'));
      const starts=[39,53], duration=10;
      const moving=starts.findIndex(start=>frame>=start&&frame<start+duration);
      const landed=starts.filter(start=>frame>=start+duration).length;
      src.forEach((row,i)=>{row.classList.toggle('tested',stage===1 && ((frame<26&&i===0)||(frame>=26&&frame<34&&i===1)||(frame>=34&&frame<49&&i===2)||(frame>=49&&frame<63&&i===3)||(frame>=63&&i===4)));row.classList.toggle('excluded',stage===1&&((i===0&&frame>=26)||(i===1&&frame>=34)||(i===4&&frame>=68)));row.classList.toggle('kept',stage===1&&((i===2&&landed>=1)||(i===3&&landed>=2)))});
      el('filtered').style.display=stage===1?'table':'none'; el('result').style.display=stage>=2?'table':'none';
      dst.forEach((row,i)=>row.style.visibility=i<landed?'visible':'hidden');
      const result=Array.from(document.querySelectorAll<HTMLTableRowElement>('#result tbody tr'));
      const calculationStarts=[81,94];
      result.forEach((row,i)=>row.cells[2].style.visibility=frame>=calculationStarts[i]+9?'visible':'hidden');
      // Move the first row aside before swapping, so the two readable rows do not overlap.
      const aside=smooth((frame-115)/8), swap=smooth((frame-124)/8), back=smooth((frame-133)/8);
      result[0].style.zIndex='4'; result[1].style.zIndex='3';
      result[0].style.transform=`translate(${-440*(aside-back)}px, ${35*swap}px)`;
      result[1].style.transform=`translateY(${-35*swap}px)`;
      Array.from(result[0].cells).forEach(cell => {cell.style.background=frame>=116&&frame<141?'#4b3265':'';cell.style.outline=frame>=116&&frame<141?'1px solid #ffaee6':''});
      el('action').textContent=['Chọn bảng nguồn','Giữ ngày trong khoảng','Tính số ngày còn lại','Xếp ngày kết thúc'][stage];
      el('explain').innerHTML=['FROM chọn HopDong.<br>Chưa lọc hợp đồng.','Ngày chốt: 21/10/2026.<br>Mốc trên: 20/11/2026.<br>Hai đầu được lấy.','DATEDIFF đếm ranh giới ngày<br>từ ngày chốt tới ngày kết thúc.','ORDER BY ngày tăng dần;<br>cùng ngày xét mã hợp đồng.'][stage];
      el('result-title').textContent=stage<2?'Sau bước lọc':'Cột kết quả';
      el('count').textContent=stage===0?'Chờ lọc':stage===1?`Đã hiện ${landed}/2 dòng trích · tổng 3`:stage===2?'Trích 2/3 dòng · 3/5 cột':'Trích 2/3 dòng · 3/5 cột';
      el('badge').textContent=['55 HỢP ĐỒNG','55 → 3 DÒNG','3 DÒNG · 5 CỘT','3 DÒNG ĐÃ XẾP'][stage];
      el('conclusion').textContent=stage===0?'Chọn nguồn; hình chỉ trích năm hợp đồng.':stage===1?(frame<26?'Ngày kết thúc NULL → không qua lọc.':frame<34?'31/12/2026 sau mốc 20/11 → loại.':frame<49?'14/11/2026 nằm trong khoảng → giữ.':frame<63?'31/10/2026 nằm trong khoảng → giữ.':'31/08/2026 trước ngày chốt → loại.'):stage===2?'21/10 → 14/11: 24 ngày; 21/10 → 31/10: 10 ngày.':frame<141?'Di chuyển hai dòng theo ngày kết thúc tăng dần.':'31/10 đứng trước 14/11; còn một hợp đồng không hiện.';
      const travel=el('travel');travel.style.display=moving<0?'none':'grid';el('pulse').style.visibility=moving<0?'hidden':'visible';
      if(moving>=0){const from=src[moving+2],to=dst[moving],p=smooth((frame-starts[moving])/duration),a=from.getBoundingClientRect(),b=to.getBoundingClientRect();travel.style.left=`${mix(a.x,b.x,p)}px`;travel.style.top=`${mix(a.y,b.y,p)}px`;travel.style.gridTemplateColumns=Array.from(from.cells).map((cell,i)=>`${mix(cell.getBoundingClientRect().width,to.cells[i].getBoundingClientRect().width,p)}px`).join(' ');Array.from(travel.children).forEach((cell,i)=>cell.textContent=from.cells[i].textContent);const n=frame%16;el('pulse').style.backgroundPosition=`${-(n%4)*32}px ${-Math.floor(n/4)*14}px`}
      const calc=calculationStarts.findIndex(start=>frame>=start&&frame<start+9), number=el('number'); number.style.display=calc<0?'none':'block';
      if(calc>=0){const from=el('explain').getBoundingClientRect(),to=result[calc].cells[2].getBoundingClientRect(),p=smooth((frame-calculationStarts[calc])/9);number.textContent=calc===0?'24':'10';number.style.left=`${mix(from.x+60,to.x+12,p)}px`;number.style.top=`${mix(from.bottom,to.y+2,p)}px`}
    },frame);
    const png=await page.screenshot({path:join(scratch,`${frame}.png`)});const name=scenes.get(frame);if(name)writeFileSync(`${folder}/${name}.png`,png);
  }
} finally { await browser.close(); }
const python=process.env.PYTHON||'python';
function run(args:string[]){const r=spawnSync(python,args,{stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)throw new Error(`Python failed: ${r.status}`)}
run(['-c',`from PIL import Image\nfrom pathlib import Path\np=Path(${JSON.stringify(scratch)})\nsheet=Image.new('RGB',(13776,11388),'#0c0b1d')\nfor i in range(${frameCount}):\n    with Image.open(p / f'{i}.png') as frame:\n        sheet.paste(frame,((i % 12)*1148+34,(i // 12)*876+26))\nsheet.save(p / 'sheet.png')`]);
run(['scripts/animations/sheet_to_gif.py',join(scratch,'sheet.png'),'--grid','12x13','--fps','7','--size','1080','--no-dither','--skip','154,155','--out',`${folder}/animation.gif`]);
const sources=['scripts/animations/select.css','scripts/animations/render-dates.mts','scripts/animations/sheet_to_gif.py','src/assets/animations/select-pulse.png',...fonts];
const files=Object.fromEntries(['animation.gif',...Array.from(scenes.values(),s=>`${s}.png`)].map(file=>[file,createHash('sha256').update(readFileSync(`${folder}/${file}`)).digest('hex')]));
writeFileSync(`${folder}/manifest.json`,JSON.stringify({fingerprint:animationFingerprint(query,steps,sources),sources,width:1080,height:824,files,
  caption:'Minh họa xử lý logic: nguồn trích 5/55 hợp đồng và 2/6 cột; kết quả trích 2/3 hợp đồng và 3/5 cột. Thứ tự trước ORDER BY là minh họa.',
  alt:'Từ năm hợp đồng trích, hai hợp đồng nằm trong khoảng được đưa qua lọc. DATEDIFF tính 24 và 10 ngày; ORDER BY đặt ngày 31/10 trước ngày 14/11.',
  scenes:[{step:0,file:'from.png',alt:'FROM chọn HopDong, trích năm trong 55 hợp đồng.'},{step:1,file:'where.png',alt:'WHERE trích hai trong ba hợp đồng thỏa khoảng ngày.'},{step:2,file:'select.png',alt:'DATEDIFF tính 24 và 10 ngày còn lại từ ngày chốt.'},{step:3,file:'order.png',alt:'ORDER BY đặt hợp đồng kết thúc ngày 31/10 trước hợp đồng kết thúc ngày 14/11.'}]
},null,2)+'\n');
console.log(`Rendered ${folder}; temporary frames in ${scratch}`);
