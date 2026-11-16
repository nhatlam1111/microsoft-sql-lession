import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { animationFingerprint } from '../../src/lib/animation-assets.ts';
import { checkFlow, type FlowStep } from '../../src/lib/run-flow.ts';

const lesson = readFileSync('src/content/lessons/2-7-ham-chuoi-tieng-viet.mdx', 'utf8').replace(/\r\n?/g, '\n');
const match = lesson.match(/<AnimatedFlow query=\{(`[^]*?`)\} steps=\{([^]*?)\} animation="2-7-strings"/);
if (!match) throw new Error('Không tìm thấy AnimatedFlow bài 2.7');
const query: string = runInNewContext(match[1]);
const steps: FlowStep[] = JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
const issues = checkFlow(steps, query);
if (issues.length) throw new Error(issues.join('\n'));
const displayed = lesson.match(/<Sql code=\{(`[^]*?`)\}\s*\/>\s*[^]*?<AnimatedFlow query=/);
if (!displayed || runInNewContext(displayed[1]) !== query) throw new Error('SQL hiển thị không khớp');
const expected = `SELECT MaNV AS [Mã nhân viên],\n\tCONCAT(RIGHT(MaNV, 3), N' - ', UPPER(HoTen)) AS [Nhãn ký nhận],\n\tLEN(HoTen) AS [Số ký tự họ tên]\nFROM NhanVien\nWHERE MaPB = 'IT'\nORDER BY MaNV ASC;`;
if (query !== expected) throw new Error('Cần cập nhật kịch bản SQL');
const [source, filtered, selected, ordered] = steps;
const names = ['MaNV', 'HoTen', 'MaPB'];
const extract = (step: FlowStep) => step.rows.map(row => names.map(name => row[step.columns.indexOf(name)]));
const rows = extract(source);
const find = (step: FlowStep, id: string) => step.rows.find(row => row[0] === id);
const input = find(filtered, 'NV007');
if (steps.map(s => `${s.clause}:${s.total}`).join(',') !== 'FROM:48,WHERE:10,SELECT:10,ORDER BY:10' ||
    names.some(n => !source.columns.includes(n) || !filtered.columns.includes(n)) ||
    JSON.stringify(rows) !== JSON.stringify([['NV003','Nguyễn Thu Hà','KD'],['NV007','Bùi Thanh Sơn','IT'],['NV011','Lý Minh Khoa','IT']]) ||
    JSON.stringify(input?.slice(0,2)) !== JSON.stringify(['NV007','Bùi Thanh Sơn']) ||
    JSON.stringify(find(selected,'NV007')) !== JSON.stringify(['NV007','007 - BÙI THANH SƠN',13]) ||
    JSON.stringify(find(selected,'NV011')) !== JSON.stringify(['NV011','011 - LÝ MINH KHOA',12]) ||
    selected.rows[0][0] !== 'NV011' || selected.rows[1][0] !== 'NV007' ||
    ordered.rows[0][0] !== 'NV007' || ordered.rows[1][0] !== 'NV011') throw new Error('Kịch bản không khớp dữ liệu bước');

const folder = 'public/lesson-animations/2-7-strings'; mkdirSync(folder, { recursive: true });
const scratch = mkdtempSync(join(tmpdir(), 'lesson-strings-'));
const fonts = ['node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-latin-400-normal.woff','node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-vietnamese-400-normal.woff'];
const fontCss = fonts.map((path,i) => `@font-face{font-family:${i<2?'UI':'Code'};src:url(data:font/woff;base64,${readFileSync(path).toString('base64')});${i%2?'unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;':''}}`).join('');
const esc = (v: unknown) => String(v ?? 'NULL').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const table = (id: string, headers: string[], values: unknown[][]) => `<table id="${id}"><thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${values.map(row=>`<tr>${row.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const kept = ['NV007','NV011'].map(id => extract(filtered)[filtered.rows.findIndex(row=>row[0]===id)]);
const result = ['NV011','NV007'].map(id => find(selected,id)!);
const lines = query.split('\n');
const pulse = readFileSync('src/assets/animations/select-pulse.png').toString('base64');
const html = `<!doctype html><meta charset="utf-8"><style>${fontCss}${readFileSync('scripts/animations/select.css','utf8')}
.stages{grid-template-columns:repeat(4,1fr);gap:10px}.stages span{font-size:14px;padding:16px 10px}.query pre{font-size:12px;line-height:1.75;top:12px}.explanation{left:650px;padding-left:16px}.explanation h2{font-size:20px;margin-bottom:8px}.explanation p{font-size:15px;line-height:1.5}.card{height:290px;padding:14px}.card h2{font-size:19px}.meta{font-size:13px;margin-bottom:10px}table,th{font-size:14px}th,td{padding:4px;overflow:hidden;text-overflow:clip}th{white-space:normal;overflow-wrap:anywhere;line-height:16px}td{line-height:17px}#source th:nth-child(1),#source th:nth-child(3),#filtered th:nth-child(1),#filtered th:nth-child(3){width:22%}#source .excluded td{color:#817e9b;text-decoration:line-through}#source .tested td{background:#463864}#result th:nth-child(1){width:19%}#result th:nth-child(2){width:57%}#result th:nth-child(3){width:24%}#result th{font:13px UI}#result td{font-size:12px}#result tbody tr{position:relative}#result tbody td{background:var(--animation-grid)}#result tbody tr:first-child{z-index:2}#sort-cards{display:none;position:relative;height:180px}#sort-cards div{position:absolute;width:calc(50% - 6px);height:72px;padding:8px;background:#252046;border:1px solid var(--animation-accent);border-radius:6px;font:13px/1.5 UI}#sort-cards div:first-child{left:0}#sort-cards div:last-child{right:0}#sort-cards strong{display:block;color:var(--animation-pink)}#work{font-size:16px;line-height:1.5}#work div{height:39px;padding:5px 8px;border:1px solid var(--animation-rule);background:var(--animation-grid)}#work strong{color:var(--animation-pink)}#travel{position:absolute;z-index:3;pointer-events:none;display:none;padding:6px;background:#463864;border:1px solid #b8a4ff;border-radius:5px;font:14px UI;white-space:nowrap}#pulse{background-image:url(data:image/png;base64,${pulse})}.footer p{font-size:14px}
</style><div class="eyebrow">SQL SERVER / BÀI 2.7</div><div class="purpose">PHÒNG NHÂN SỰ · PHIẾU KÝ NHẬN</div><h1>Chuỗi: tạo nhãn có dấu</h1><div class="logic">MINH HỌA XỬ LÝ LOGIC</div>
<div class="stages"><span id="s0">01 FROM · Nguồn</span><span id="s1">02 WHERE · Lọc</span><span id="s2">03 SELECT · Tạo nhãn</span><span id="s3">04 ORDER BY · Xếp</span></div>
<div class="query"><pre><span id="q2">${esc(lines[0])}\n${esc(lines[1])}\n${esc(lines[2])}</span>\n<span id="q0">${esc(lines[3])}</span>\n<span id="q1">${esc(lines[4])}</span>\n<span id="q3">${esc(lines[5])}</span></pre><div class="explanation"><h2 id="action"></h2><p id="explain"></p></div></div>
<div class="card source-card"><h2>Bảng nguồn / NhanVien</h2><div class="meta">Trích 3/48 hồ sơ · 3/12 cột</div>${table('source',names,rows)}</div>
<div id="bridge">→<span id="pulse"></span></div><div class="card result-card"><h2 id="result-title"></h2><div class="meta" id="count"></div>${table('filtered',names,kept)}<div id="work"><div id="right">RIGHT(MaNV, 3) → <strong>007</strong></div><div id="upper">UPPER(HoTen) → <strong>BÙI THANH SƠN</strong></div><div id="concat">CONCAT → <strong>007 - BÙI THANH SƠN</strong></div><div id="length">LEN(HoTen) → <strong>13</strong></div></div>${table('result', selected.columns, result)}<div id="sort-cards">${result.map(row=>`<div><strong>${esc(row[0])} · ${esc(row[2])} ký tự</strong>${esc(row[1])}</div>`).join('')}</div></div><div id="travel"></div><div class="footer"><strong id="badge"></strong><p id="conclusion"></p></div><p class="excerpt">Dữ liệu trích để minh họa · Trước ORDER BY, thứ tự dòng có thể khác khi chạy.</p>`;
const scenes = new Map([[2,'poster'],[12,'from'],[49,'where'],[111,'select'],[163,'order']]);
const frames = 168;
const browser = await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome',headless:true});
try {
 const page = await browser.newPage({viewport:{width:1080,height:824},deviceScaleFactor:1});
 await page.setContent(html); await page.evaluate(()=>document.fonts.ready);
 for (let frame=0; frame<frames; frame++) {
  await page.evaluate((frame) => {
   const get=(id:string)=>document.getElementById(id)!;
   const stage=frame<16?0:frame<53?1:frame<114?2:3;
   for(let i=0;i<4;i++){get(`s${i}`).classList.toggle('active',i===stage);get(`q${i}`).classList.toggle('focus',i===stage);}
   const source=Array.from(document.querySelectorAll<HTMLTableRowElement>('#source tbody tr'));
   const filtered=Array.from(document.querySelectorAll<HTMLTableRowElement>('#filtered tbody tr'));
   source.forEach((row,i)=>{row.classList.toggle('excluded',i===0&&frame>=20);row.classList.toggle('tested',stage===1 && ((i===0&&frame<21)||(i===1&&frame>=21&&frame<34)||(i===2&&frame>=34)));});
   const sorting=stage===3&&frame>=121&&frame<135;
   get('filtered').style.display=stage===1?'table':'none'; get('work').style.display=stage===2?'block':'none'; get('result').style.display=stage===3&&!sorting?'table':'none'; get('sort-cards').style.display=sorting?'block':'none';
   filtered.forEach((row,i)=>row.style.visibility=frame >= (i===0?32:45)?'visible':'hidden');
   const result=Array.from(document.querySelectorAll<HTMLTableRowElement>('#result tbody tr'));
   const sort=Math.min(1,Math.max(0,(frame-121)/14)); const smooth=sort*sort*(3-2*sort);
   result[0].style.transform=`translateY(${sort===1?35:0}px)`;result[1].style.transform=`translateY(${sort===1?-35:0}px)`;
   const cards=Array.from(get('sort-cards').children) as HTMLElement[];
   cards[0].style.top=`${84*smooth}px`;cards[1].style.top=`${84*(1-smooth)}px`;
   for (const [id,start] of [['right',69],['upper',82],['concat',101],['length',111]] as [string,number][]) get(id).style.visibility=frame>=start?'visible':'hidden';
   get('action').textContent=['Chọn bảng nguồn','Giữ phòng IT','Tạo nhãn từ NV007','Xếp mã tăng dần'][stage];
   get('explain').innerHTML=['FROM chọn NhanVien.<br>Chưa lọc hay chọn cột.','MaPB = IT: giữ NV007,<br>NV011; loại NV003.','RIGHT và UPPER trước,<br>CONCAT ghép, LEN đếm.','ORDER BY MaNV ASC:<br>NV007 lên trước NV011.'][stage];
   get('result-title').textContent=['Đang chờ lọc','Sau bước lọc','Lần một hồ sơ: NV007','Kết quả đã chọn'][stage];
   get('count').textContent=['Nguồn chưa lọc',`Hiện ${frame>=45?2:frame>=32?1:0}/2 dòng mẫu · tổng 10`,'Tạo giá trị từ MaNV và HoTen',`Trích 2/10 dòng · ${sort===1?'đã xếp':sorting?'đang xếp':'trước khi xếp'}`][stage];
   get('badge').textContent=['48 DÒNG NGUỒN','48 → 10 DÒNG','12 → 3 CỘT','10 DÒNG · 3 CỘT'][stage];
   get('conclusion').textContent=stage===0?'Trích ba hồ sơ, giữ nguyên dữ liệu nguồn.':stage===1?'NV003 thuộc KD; NV007 và NV011 thuộc IT.':stage===2?(frame<83?'Cắt ba ký tự cuối và đổi họ tên sang chữ hoa.':frame<111?'Ghép 007, dấu phân cách và họ tên in hoa.':'LEN đếm cả hai dấu cách giữa các từ: 13 ký tự.'):sorting?'Vị trí cao hơn là dòng đứng trước.':'Thứ tự trước khi xếp chỉ là minh họa.';
   const travel=get('travel'); travel.style.display='none'; get('pulse').style.visibility='hidden';
   function move(from: Element,to: Element,start:number,end:number,value:string){if(frame<start||frame>=end)return;const a=from.getBoundingClientRect(),b=to.getBoundingClientRect();let p=(frame-start)/(end-start);p=p*p*(3-2*p);travel.style.display='block';travel.textContent=value;travel.style.left=`${a.x+(b.x-a.x)*p}px`;travel.style.top=`${a.y+(b.y-a.y)*p}px`;get('pulse').style.visibility='visible';const n=frame%16;get('pulse').style.backgroundPosition=`${-(n%4)*32}px ${-Math.floor(n/4)*14}px`;}
   move(source[1],filtered[0],21,32,'NV007 · Bùi Thanh Sơn · IT');
   move(source[2],filtered[1],34,45,'NV011 · Lý Minh Khoa · IT');
   move(source[1].cells[0],get('right'),58,69,'NV007 → 007');
   move(source[1].cells[1],get('upper'),71,82,'Bùi Thanh Sơn → BÙI THANH SƠN');
   move(get('upper'),get('concat'),90,101,'007 + “ - ” + BÙI THANH SƠN');
   move(source[1].cells[1],get('length'),102,111,'Bùi Thanh Sơn → 13');
  // Hold the complete SELECT scene for three seconds before ORDER BY.
  }, frame < 114 ? frame : frame < 132 ? 111 : frame - 18);
  const png=await page.screenshot({path:join(scratch,`${frame}.png`)}); const scene=scenes.get(frame); if(scene)writeFileSync(`${folder}/${scene}.png`,png);
 }
} finally { await browser.close(); }
const python=process.env.PYTHON||'python';
function run(args:string[]){const r=spawnSync(python,args,{stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)throw new Error(`Python failed: ${r.status}`);}
run(['-c',`from PIL import Image\nfrom pathlib import Path\np=Path(${JSON.stringify(scratch)})\nsheet=Image.new('RGB',(13776,12264),'#0c0b1d')\nfor i in range(${frames}):\n    with Image.open(p / f'{i}.png') as frame:\n        sheet.paste(frame,((i % 12)*1148+34,(i // 12)*876+26))\nsheet.save(p / 'sheet.png')`]);
run(['scripts/animations/sheet_to_gif.py',join(scratch,'sheet.png'),'--grid','12x14','--fps','7','--size','1080','--no-dither','--out',`${folder}/animation.gif`]);
const sources=['scripts/animations/select.css','scripts/animations/render-strings.mts','scripts/animations/sheet_to_gif.py','src/assets/animations/select-pulse.png',...fonts];
const files=Object.fromEntries(['animation.gif',...Array.from(scenes.values(),s=>`${s}.png`)].map(file=>[file,createHash('sha256').update(readFileSync(`${folder}/${file}`)).digest('hex')]));
writeFileSync(`${folder}/manifest.json`,JSON.stringify({fingerprint:animationFingerprint(query,steps,sources),sources,width:1080,height:824,files,
 caption:'Minh họa xử lý logic: nguồn trích 3/48 hồ sơ; hai hồ sơ trích qua lọc trong tổng 10. SELECT lần NV007; cảnh xếp trích 2/10 hồ sơ. Thứ tự trước ORDER BY chỉ là minh họa.',
 alt:'WHERE loại NV003 và giữ NV007, NV011. Với NV007, RIGHT lấy 007, UPPER đổi tên thành BÙI THANH SƠN, CONCAT ghép nhãn và LEN đếm 13 ký tự. ORDER BY xếp NV007 trước NV011.',
 scenes:[{step:0,file:'from.png',alt:'FROM chọn bảng NhanVien, trích ba trong 48 hồ sơ.'},{step:1,file:'where.png',alt:'WHERE loại NV003, giữ NV007 và NV011; tổng 10 hồ sơ đạt.'},{step:2,file:'select.png',alt:'Với NV007, RIGHT cho 007, UPPER cho BÙI THANH SƠN, CONCAT ghép nhãn, LEN đếm 13 ký tự.'},{step:3,file:'order.png',alt:'ORDER BY xếp NV007 trước NV011, trích hai trong 10 hồ sơ.'}]
},null,2)+'\n');
console.log(`Rendered ${folder}; temporary frames: ${scratch}`);
