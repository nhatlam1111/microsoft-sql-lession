import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { animationFingerprint } from '../../src/lib/animation-assets.ts';
import { checkFlow, type FlowStep } from '../../src/lib/run-flow.ts';

const lesson = readFileSync('src/content/lessons/2-5-null-o-trong.mdx', 'utf8').replace(/\r\n?/g, '\n');
const match = lesson.match(/<AnimatedFlow query=\{(`[^]*?`)\} steps=\{([^]*?)\} animation="2-5-null"/);
if (!match) throw new Error('Không tìm thấy dữ liệu AnimatedFlow 2.5');
const query: string = runInNewContext(match[1]);
const steps: FlowStep[] = JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
const issues = checkFlow(steps, query);
if (issues.length) throw new Error(issues.join('\n'));
const displayed = lesson.match(/<Sql code=\{(`[^]*?`)\}\s*\/>\s*[^]*?<AnimatedFlow query=/);
if (!displayed || runInNewContext(displayed[1]) !== query) throw new Error('SQL hiển thị không khớp');
const expected = `SELECT MaNV AS [Mã nhân viên], HoTen AS [Họ tên],\n\tCOALESCE(Email, N'(chưa có)') AS [Email]\nFROM NhanVien\nWHERE MaPB = 'VH'\n\tAND NgayNghiViec IS NULL\nORDER BY MaNV ASC;`;
if (query !== expected) throw new Error('Cần cập nhật kịch bản SQL');
const [source, filtered, selected, ordered] = steps;
const names = ['MaNV','HoTen','Email','NgayNghiViec','MaPB'];
const preview = (s: FlowStep) => s.rows.map(row => names.map(name => row[s.columns.indexOf(name)]));
const rows = preview(source);
const ids = ['NV044','NV008'];
const find = (step:FlowStep, id:string) => step.rows.find(row => row[0] === id);
if (steps.map(s=>`${s.clause}:${s.total}`).join(',') !== 'FROM:48,WHERE:8,SELECT:8,ORDER BY:8' ||
    names.some(n=>!source.columns.includes(n) || !filtered.columns.includes(n)) ||
    JSON.stringify(rows.map(r=>r[0])) !== JSON.stringify(['NV008','NV033','NV044','NV045']) ||
    JSON.stringify(rows.map(r=>[r[4] === 'VH',r[3] === null])) !== JSON.stringify([[true,true],[true,false],[true,true],[false,true]]) ||
    ids.some(id=>!find(filtered,id) || !find(selected,id) || !find(ordered,id)) ||
    find(filtered,'NV044')![filtered.columns.indexOf('Email')] !== null ||
    find(selected,'NV044')![2] !== '(chưa có)' || find(selected,'NV008')![2] !== rows[0][2] ||
    JSON.stringify(selected.rows.map(r=>r[0])) !== JSON.stringify(['NV044','NV008','NV037']) ||
    ordered.rows[0][0] !== 'NV008' || ordered.rows.at(-1)![0] !== 'NV044') throw new Error('Kịch bản không khớp dữ liệu bước');

const folder='public/lesson-animations/2-5-null'; mkdirSync(folder,{recursive:true});
const scratch=mkdtempSync(join(tmpdir(),'lesson-null-'));
const fonts=['node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-latin-400-normal.woff','node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-vietnamese-400-normal.woff'];
const fontCss=fonts.map((path,i)=>`@font-face{font-family:${i<2?'UI':'Code'};src:url(data:font/woff;base64,${readFileSync(path).toString('base64')});${i%2?'unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;':''}}`).join('');
const esc=(v:unknown)=>String(v??'NULL').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const sourceTable=`<table id="source"><colgroup>${[14,22,28,23,13].map(w=>`<col style="width:${w}%">`).join('')}</colgroup><thead><tr>${names.map(n=>`<th>${esc(n)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const sample=ids.map(id=>find(filtered,id)!).map(row=>names.map(n=>row[filtered.columns.indexOf(n)]));
const filteredTable=`<table id="filtered"><colgroup>${[14,22,28,23,13].map(w=>`<col style="width:${w}%">`).join('')}</colgroup><thead><tr>${names.map(n=>`<th>${esc(n)}</th>`).join('')}</tr></thead><tbody>${sample.map(row=>`<tr>${row.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const selectedRows=['NV044','NV008'].map(id=>find(selected,id)!);
const resultTable=`<table id="result"><colgroup><col style="width:20%"><col style="width:30%"><col style="width:50%"></colgroup><thead><tr>${selected.columns.map(n=>`<th>${esc(n)}</th>`).join('')}</tr></thead><tbody>${selectedRows.map(row=>`<tr>${row.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const lines=query.split('\n');
const pulse=readFileSync('src/assets/animations/select-pulse.png').toString('base64');
const html=`<!doctype html><meta charset="utf-8"><style>${fontCss}${readFileSync('scripts/animations/select.css','utf8')}
.stages{grid-template-columns:repeat(4,1fr);gap:10px}.stages span{font-size:14px;padding:16px 10px}.query pre{font-size:13px;line-height:1.75;top:12px}.explanation{left:640px;padding-left:16px}.explanation h2{font-size:20px;margin-bottom:8px}.explanation p{font-size:15px;line-height:1.5}.card{height:290px;padding:14px}.card h2{font-size:19px}.meta{font-size:13px;margin-bottom:10px}table,th{font-size:11px}th,td{padding:2px;overflow:hidden;text-overflow:clip}th{white-space:normal;overflow-wrap:anywhere;line-height:13px}td{line-height:15px}#source .tested td:nth-child(4),#source .tested td:nth-child(5){background:#463864}#source .excluded td{color:#817e9b;text-decoration:line-through}#source .kept td{background:#29244e}#result tbody tr{position:relative}#result tbody tr:first-child{z-index:2}#result tbody td{background:var(--animation-grid)}#result td:nth-child(3){color:var(--animation-pink)}#travel{position:absolute;z-index:2;display:grid;pointer-events:none}#travel span{font:11px/35px UI;background:#342957;border:1px solid #524277;overflow:hidden;white-space:nowrap}#pulse{background-image:url(data:image/png;base64,${pulse})}.footer p{font-size:15px}
</style><div class="eyebrow">SQL SERVER / BÀI 2.5</div><div class="purpose">PHÒNG VẬN HÀNH · DANH SÁCH LIÊN HỆ</div><h1>NULL: lọc và ghi nhãn</h1><div class="logic">MINH HỌA XỬ LÝ LOGIC</div>
<div class="stages"><span id="s0">01 FROM · Nguồn</span><span id="s1">02 WHERE · Lọc</span><span id="s2">03 SELECT · Ghi nhãn</span><span id="s3">04 ORDER BY · Xếp</span></div>
<div class="query"><pre><span id="q2">${esc(lines[0])}\n${esc(lines[1])}</span>\n<span id="q0">${esc(lines[2])}</span>\n<span id="q1">${esc(lines[3])}\n${esc(lines[4])}</span>\n<span id="q3">${esc(lines[5])}</span></pre><div class="explanation"><h2 id="action"></h2><p id="explain"></p></div></div>
<div class="card source-card"><h2>Bảng nguồn / NhanVien</h2><div class="meta">Trích 4/48 hồ sơ · 5/12 cột</div>${sourceTable}</div><div id="bridge">→<span id="pulse"></span></div><div class="card result-card"><h2 id="result-title"></h2><div class="meta" id="count"></div>${filteredTable}${resultTable}</div><div id="travel">${names.map(()=>'<span></span>').join('')}</div><div class="footer"><strong id="badge"></strong><p id="conclusion"></p></div><p class="excerpt">Minh họa trích dữ liệu · Trước ORDER BY, thứ tự dòng có thể khác khi chạy.</p>`;
const scenes=new Map([[3,'poster'],[13,'from'],[107,'where'],[128,'select'],[164,'order']]);
const frameCount=168, starts=[60,105], transfer=12;
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1080,height:824},deviceScaleFactor:1}); await page.setContent(html); await page.evaluate(()=>document.fonts.ready);
 for(let frame=0;frame<frameCount;frame++){
  await page.evaluate(({frame,starts,transfer})=>{
   const get=(id:string)=>document.getElementById(id)!; const smooth=(v:number)=>{const x=Math.max(0,Math.min(1,v));return x*x*(3-2*x)}; const mix=(a:number,b:number,p:number)=>a+(b-a)*p;
   const stage=frame<25?0:frame<135?1:frame<180?2:3;
   for(let i=0;i<4;i++){get(`s${i}`).classList.toggle('active',i===stage);get(`q${i}`).classList.toggle('focus',i===stage)}
   const src=Array.from(document.querySelectorAll<HTMLTableRowElement>('#source tbody tr')); const dst=Array.from(document.querySelectorAll<HTMLTableRowElement>('#filtered tbody tr'));
   const current=frame<25||frame>=135?-1:frame<72?0:frame<99?1:frame<120?2:3;
   const moving=starts.findIndex(start=>frame>=start&&frame<start+transfer); const landed=starts.filter(start=>frame>=start+transfer).length;
   src.forEach((row,i)=>{row.classList.toggle('tested',i===current);row.classList.toggle('excluded',(i===1&&frame>=99)||(i===3&&frame>=120));row.classList.toggle('kept',(i===0&&landed>=1)||(i===2&&landed>=2));});
   get('filtered').style.display=stage===1?'table':'none'; get('result').style.display=stage>=2?'table':'none'; dst.forEach((row,i)=>row.style.visibility=((i===1&&landed>=1)||(i===0&&landed>=2))?'visible':'hidden');
   const result=Array.from(document.querySelectorAll<HTMLTableRowElement>('#result tbody tr'));
   const sort=smooth((frame-186)/14); result[0].style.transform=`translateY(${35*sort}px)`; result[1].style.transform=`translateY(${-35*sort}px)`;
   const email=result[0].cells[2]; const change=smooth((frame-148)/12); email.innerHTML=`<span style="opacity:${1-change}">NULL</span><span style="opacity:${change};margin-left:-27px">(chưa có)</span>`; email.style.background=frame>=148&&frame<164?'#463864':'';
   get('action').textContent=['Chọn bảng nguồn','Kiểm tra cả hai điều kiện','Ghi nhãn email thiếu','Xếp mã tăng dần'][stage];
   get('explain').innerHTML=['FROM xác định NhanVien.<br>Chưa lọc dòng hay chọn cột.','VH và ngày nghỉ là NULL<br>đều phải đúng.','COALESCE lấy email có sẵn;<br>NULL nhận nhãn dự phòng.','ORDER BY MaNV ASC:<br>NV008 đứng trước NV044.'][stage];
   get('result-title').textContent=stage<2?'Sau bước lọc':'Cột kết quả'; get('count').textContent=stage===0?'Chờ lọc':stage===1?`Đã hiện ${landed}/2 dòng mẫu · tổng 8`:stage===2?'Trích 2/8 dòng · đủ 3 cột':sort===1?'Trích 2/8 dòng đã sắp xếp':'Trích 2/8 dòng · đang xếp';
   get('badge').textContent=['48 DÒNG NGUỒN','48 → 8 DÒNG','12 → 3 CỘT','8 DÒNG · 3 CỘT'][stage];
   get('conclusion').textContent=stage===0?'Bảng nguồn: trích bốn hồ sơ để đối chiếu.':stage===1?(frame<60?'NV008: VH và ngày nghỉ NULL → giữ.':frame<72?'NV008 chuyển sang bảng lọc.':frame<99?'NV033 đã có ngày nghỉ → loại.':frame<120?'NV044: VH và ngày nghỉ NULL → giữ.':'NV045 không thuộc VH → loại.'):stage===2?'NV044 nhận nhãn; email nguồn vẫn NULL. NV008 giữ email.':'Trong tám hồ sơ, NV008 đứng đầu và NV044 đứng cuối.';
   const travel=get('travel');travel.style.display=moving<0?'none':'grid'; get('pulse').style.visibility=moving<0?'hidden':'visible';
   if(moving>=0){const from=src[moving===0?0:2],to=dst[moving===0?1:0],p=smooth((frame-starts[moving])/transfer),a=from.getBoundingClientRect(),b=to.getBoundingClientRect();travel.style.left=`${mix(a.x,b.x,p)}px`;travel.style.top=`${mix(a.y,b.y,p)}px`;travel.style.gridTemplateColumns=Array.from(from.cells).map((cell,i)=>`${mix(cell.getBoundingClientRect().width,to.cells[i].getBoundingClientRect().width,p)}px`).join(' ');Array.from(travel.children).forEach((cell,i)=>cell.textContent=from.cells[i].textContent);const n=frame%16;get('pulse').style.backgroundPosition=`${-(n%4)*32}px ${-Math.floor(n/4)*14}px`;}
  },{frame:Math.round(frame*209/(frameCount-1)),starts,transfer});
  const png=await page.screenshot({path:join(scratch,`${frame}.png`)});const name=scenes.get(frame);if(name)writeFileSync(`${folder}/${name}.png`,png);
 }
} finally {await browser.close()}
const python=process.env.PYTHON||'python';function run(args:string[]){const r=spawnSync(python,args,{stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)throw new Error(`Python failed: ${r.status}`)}
run(['-c',`from PIL import Image\nfrom pathlib import Path\np=Path(${JSON.stringify(scratch)})\nsheet=Image.new('RGB',(13776,12264),'#0c0b1d')\nfor i in range(${frameCount}):\n    with Image.open(p / f'{i}.png') as frame:\n        sheet.paste(frame,((i % 12)*1148+34,(i // 12)*876+26))\nsheet.save(p / 'sheet.png')`]);
run(['scripts/animations/sheet_to_gif.py',join(scratch,'sheet.png'),'--grid','12x14','--fps','7','--size','1080','--no-dither','--out',`${folder}/animation.gif`]);
const sources=['scripts/animations/select.css','scripts/animations/render-null.mts','scripts/animations/sheet_to_gif.py','src/assets/animations/select-pulse.png',...fonts];
const files=Object.fromEntries(['animation.gif',...Array.from(scenes.values(),s=>`${s}.png`)].map(file=>[file,createHash('sha256').update(readFileSync(`${folder}/${file}`)).digest('hex')]));
writeFileSync(`${folder}/manifest.json`,JSON.stringify({fingerprint:animationFingerprint(query,steps,sources),sources,width:1080,height:824,files,
 caption:'Minh họa xử lý logic. Nguồn trích 4/48 hồ sơ và 5/12 cột; các bảng sau trích 2/8 hồ sơ. Thứ tự trước ORDER BY chỉ là minh họa.',
 alt:'WHERE giữ NV008 và NV044, loại NV033 và NV045. SELECT giữ email NV008 và ghi nhãn cho email NULL của NV044. ORDER BY xếp NV008 trước NV044; nguồn không đổi.',
 scenes:[{step:0,file:'from.png',alt:'FROM chọn bảng NhanVien, trích bốn hồ sơ.'},{step:1,file:'where.png',alt:'WHERE giữ NV008 và NV044, loại NV033 và NV045; tổng tám hồ sơ đạt.'},{step:2,file:'select.png',alt:'SELECT giữ email NV008, đổi NULL thành nhãn ở cột kết quả của NV044.'},{step:3,file:'order.png',alt:'ORDER BY xếp NV008 trước NV044, trích hai trong tám hồ sơ.'}]
},null,2)+'\n');
console.log(`Rendered ${folder}; temporary frames in ${scratch}`);
