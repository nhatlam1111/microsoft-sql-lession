import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { animationFingerprint } from '../../src/lib/animation-assets.ts';
import { checkFlow, type FlowStep } from '../../src/lib/run-flow.ts';

const lesson = readFileSync('src/content/lessons/2-3-and-or-in-between-like.mdx', 'utf8').replace(/\r\n?/g, '\n');
const match = lesson.match(/<AnimatedFlow query=\{(`[^]*?`)\} steps=\{([^]*?)\} animation="2-3-conditions"/);
if (!match) throw new Error('Không tìm thấy dữ liệu AnimatedFlow');
const query: string = runInNewContext(match[1]);
const steps: FlowStep[] = JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
const problems = checkFlow(steps, query);
if (problems.length) throw new Error(problems.join('\n'));
const displayed = lesson.match(/<Sql code=\{(`[^]*?`)\}\s*\/>\s*[^]*?<AnimatedFlow query=/);
if (!displayed || runInNewContext(displayed[1]) !== query) throw new Error('SQL hiển thị và SQL minh họa không khớp');
const expected = `SELECT MaNV AS [Mã nhân viên], HoTen AS [Họ tên],
\tMaPB AS [Mã phòng], NgayVaoLam AS [Ngày vào làm]
FROM NhanVien
WHERE MaPB IN ('KD', 'IT')
\tAND NgayVaoLam BETWEEN '20230101' AND '20230630';`;
if (query !== expected) throw new Error('Cần cập nhật kịch bản SQL trước khi dựng');
const [source, filtered, result] = steps;
const names = ['MaNV', 'HoTen', 'MaPB', 'NgayVaoLam', 'GioiTinh'];
const preview = (step: FlowStep) => step.rows.map(row => names.map(name => row[step.columns.indexOf(name)]));
const rows = preview(source), kept = preview(filtered);
const indexes = kept.map(row => rows.findIndex(candidate => candidate[0] === row[0]));
const pass = rows.map(row => [row[2] === 'KD' || row[2] === 'IT', String(row[3]) >= '2023-01-01' && String(row[3]) <= '2023-06-30']);
if (steps.length !== 3 || steps.map(s => s.clause).join(',') !== 'FROM,WHERE,SELECT' ||
    source.total !== 48 || filtered.total !== 2 || result.total !== 2 || source.columns.length !== 12 || filtered.columns.length !== 12 ||
    names.some(name => !source.columns.includes(name) || !filtered.columns.includes(name)) ||
    JSON.stringify(rows.map(row => row[0])) !== JSON.stringify(['NV002','NV003','NV030','NV043']) ||
    JSON.stringify(pass) !== JSON.stringify([[true,false],[true,true],[false,true],[true,true]]) ||
    JSON.stringify(indexes) !== JSON.stringify([1,3]) ||
    JSON.stringify(result.rows) !== JSON.stringify(kept.map(row => row.slice(0, 4))) ||
    JSON.stringify(result.columns) !== JSON.stringify(['Mã nhân viên','Họ tên','Mã phòng','Ngày vào làm']))
  throw new Error('Kịch bản cần cập nhật theo SQL hoặc dữ liệu mới');

const folder = 'public/lesson-animations/2-3-conditions';
mkdirSync(folder, { recursive: true });
const scratch = mkdtempSync(join(tmpdir(), 'lesson-conditions-'));
const fonts = ['node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-latin-400-normal.woff','node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-vietnamese-400-normal.woff'];
const fontCss = fonts.map((path,i)=>`@font-face{font-family:${i<2?'UI':'Code'};src:url(data:font/woff;base64,${readFileSync(path).toString('base64')});${i%2?'unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;':''}}`).join('');
const esc = (value: unknown) => String(value ?? 'NULL').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const widths = [15, 27, 12, 29, 17], finalWidths = [17, 31, 15, 37, 0];
const table = (data: FlowStep['rows'], id: string) => `<table id="${id}"><colgroup>${widths.map(w=>`<col style="width:${w}%">`).join('')}</colgroup><thead><tr>${names.map(n=>`<th><span>${esc(n)}</span></th>`).join('')}</tr></thead><tbody>${data.map(row=>`<tr>${row.map(v=>`<td><span>${esc(v)}</span></td>`).join('')}</tr>`).join('')}</tbody></table>`;
const lines = query.split('\n');
const pulse = readFileSync('src/assets/animations/select-pulse.png').toString('base64');
const html = `<!doctype html><meta charset="utf-8"><style>${fontCss}${readFileSync('scripts/animations/select.css','utf8')}
.stages{grid-template-columns:repeat(3,1fr);gap:16px}.query pre{font-size:14px;line-height:1.65}.explanation{left:650px;padding-left:18px}.explanation h2{font-size:21px;margin-bottom:12px}.explanation p{font-size:16px}.card{height:290px}table,th{font-size:12px}th,td{padding:0;overflow:hidden}th span,td span{display:block;padding:0 3px}th span{white-space:normal;line-height:15px;overflow-wrap:anywhere}#destination th.alias{color:var(--animation-pink);font:12px UI}#destination .unselected{background:#1b1831;color:var(--animation-muted)}#source .excluded td{color:#817e9b;text-decoration:line-through}#source .tested td:nth-child(3),#source .tested td:nth-child(4){color:var(--animation-ink);background:#463864;text-decoration:none}#source .kept td,#destination .kept td{background:#29244e}#travel{position:absolute;z-index:2;pointer-events:none}#travel:not([hidden]){display:grid}#travel span{padding:0 3px;overflow:hidden;white-space:nowrap;font:12px/35px UI;background:#342957;border:1px solid #524277;box-shadow:0 0 10px #b8a4ff33}#pulse{background-image:url(data:image/png;base64,${pulse})}.footer p{font-size:16px}
</style><div class="eyebrow">SQL SERVER / BÀI 2.3</div><div class="purpose">PHÒNG KD HOẶC IT · SÁU THÁNG ĐẦU 2023</div><h1>Hai điều kiện cùng đúng</h1><div class="logic">MINH HỌA XỬ LÝ LOGIC</div>
<div class="stages"><span id="s0">01 FROM · Nguồn</span><span id="s1">02 WHERE · Lọc dòng</span><span id="s2">03 SELECT · Chọn cột</span></div>
<div class="query"><pre><span id="q2">${esc(lines[0])}\n${esc(lines[1])}</span>\n<span id="q0">${esc(lines[2])}</span>\n<span id="q1">${esc(lines[3])}\n${esc(lines[4])}</span></pre><div class="explanation"><h2 id="action"></h2><p id="explain"></p></div></div>
<div class="card source-card"><h2>Bảng nguồn / NhanVien</h2><div class="meta">Trích ${rows.length}/${source.total} dòng · ${names.length}/${source.columns.length} cột</div>${table(rows,'source')}</div>
<div id="bridge">→<span id="pulse"></span></div><div class="card result-card"><h2 id="result-title"></h2><div class="meta" id="count"></div>${table(kept,'destination')}</div>
<div id="travel" hidden>${names.map(()=>'<span></span>').join('')}</div><div class="footer"><strong id="badge"></strong><p id="conclusion"></p></div><p class="excerpt">Bảng chỉ hiện dữ liệu trích · Thứ tự dòng có thể khác khi chạy SQL.</p>`;

const scenes = new Map([[3,'poster'],[13,'from'],[105,'where'],[140,'select']]);
const frameCount = 150, starts = [70,130], transferFrames = 12;
const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL || 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width:1080, height:824 }, deviceScaleFactor:1 });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  for (let frame=0; frame<frameCount; frame++) {
    await page.evaluate(({frame,starts,transferFrames,indexes,names,aliases,widths,finalWidths}) => {
      const get = (id:string) => document.getElementById(id)!;
      const smooth = (x:number) => x*x*(3-2*x), mix=(a:number,b:number,x:number)=>a+(b-a)*x;
      const stage = frame < 25 ? 0 : frame < 162 ? 1 : 2;
      const current = frame < 25 || frame >= 144 ? -1 : frame < 48 ? 0 : frame < 84 ? 1 : frame < 108 ? 2 : 3;
      const moving = starts.findIndex(start => frame >= start && frame < start+transferFrames);
      const landed = starts.filter(start=>frame>=start+transferFrames).length;
      const remove = smooth(Math.max(0,Math.min(1,(frame-165)/16))), alias = frame>=190;
      const src = Array.from(document.querySelectorAll<HTMLTableRowElement>('#source tbody tr'));
      const dst = Array.from(document.querySelectorAll<HTMLTableRowElement>('#destination tbody tr'));
      for(let i=0;i<3;i++){get(`s${i}`).classList.toggle('active',i===stage);get(`q${i}`).classList.toggle('focus',i===stage);}
      src.forEach((row,i)=>{row.classList.toggle('tested',i===current);row.classList.toggle('excluded',(i===0&&frame>=48)||(i===2&&frame>=108));row.classList.toggle('kept',indexes.includes(i)&&indexes.indexOf(i)<landed);});
      const table=get('destination') as HTMLTableElement;
      table.style.visibility=stage===0?'hidden':'visible';
      dst.forEach((row,i)=>{row.style.visibility=i<landed?'visible':'hidden';row.classList.toggle('kept',i<landed);});
      table.querySelectorAll('col').forEach((col,i)=>col.style.width=`${mix(widths[i],finalWidths[i],remove)}%`);
      table.querySelectorAll<HTMLElement>('tr > :last-child, col:last-child').forEach(cell=>{cell.style.display=remove===1?'none':'';cell.classList.toggle('unselected',stage===2);const value=cell.firstElementChild as HTMLElement|null;if(value)value.style.opacity=String(1-remove);});
      table.tHead!.rows[0].querySelectorAll('th').forEach((th,i)=>{th.firstElementChild!.textContent=alias&&i<aliases.length?aliases[i]:names[i];th.classList.toggle('alias',alias&&i<aliases.length);});
      get('action').textContent=alias?'Đặt tiêu đề tiếng Việt':['Chọn bảng nguồn','Kiểm tra cả hai điều kiện','Chọn bốn cột'][stage];
      get('explain').innerHTML=stage===0?'FROM xác định NhanVien.<br>Chưa lọc dòng hay chọn cột.':stage===1?'IN chọn KD hoặc IT.<br>AND cần ngày cũng đạt.':alias?'AS đặt tiêu đề trong SELECT.<br>Các giá trị giữ nguyên.':'SELECT giữ bốn cột cần gửi.<br>Ví dụ: bỏ cột GioiTinh.';
      get('result-title').textContent=remove===1?'Kết quả truy vấn':'Sau bước lọc';
      get('count').textContent=stage===0?'Chờ lọc':landed<2?`Đã hiện ${landed}/2 dòng mẫu đạt`:remove===1?'Đủ 2 dòng · 4 cột':'Đủ 2 dòng · trích 5/12 cột';
      get('badge').textContent=['48 DÒNG NGUỒN','48 → 2 DÒNG','12 → 4 CỘT'][stage];
      const messages=['NV002: phòng đạt, ngày không đạt → loại.','NV003: phòng đạt, ngày đạt → giữ.','NV030: phòng không đạt, ngày đạt → loại.','NV043: phòng đạt, ngày đạt → giữ.'];
      get('conclusion').textContent=stage===0?'Bảng trích bốn hồ sơ để đối chiếu.':stage===2?'Giữ nguyên 2 dòng đã lọc; SELECT chọn cột.':current>=0?messages[current]:'Cả hai điều kiện phải đúng; còn 2 hồ sơ.';
      const travel=get('travel');travel.hidden=moving<0;const pulse=get('pulse');pulse.style.visibility=moving<0?'hidden':'visible';
      if(moving>=0){const from=src[indexes[moving]],to=dst[moving],p=smooth((frame-starts[moving])/transferFrames),a=from.getBoundingClientRect(),b=to.getBoundingClientRect();travel.style.left=`${mix(a.x,b.x,p)}px`;travel.style.top=`${mix(a.y,b.y,p)}px`;travel.style.gridTemplateColumns=Array.from(from.cells).map((cell,i)=>`${mix(cell.getBoundingClientRect().width,to.cells[i].getBoundingClientRect().width,p)}px`).join(' ');Array.from(travel.children).forEach((cell,i)=>cell.textContent=from.cells[i].textContent);const n=frame%16;pulse.style.backgroundPosition=`${-(n%4)*32}px ${-Math.floor(n/4)*14}px`;}
    },{frame: Math.round(frame * 219 / (frameCount - 1)),starts,transferFrames,indexes,names,aliases:result.columns,widths,finalWidths});
    const png=await page.screenshot({path:join(scratch,`${frame}.png`)});
    const name=scenes.get(frame);if(name)writeFileSync(`${folder}/${name}.png`,png);
  }
} finally { await browser.close(); }
const python=process.env.PYTHON||'python';
function run(args:string[]){const r=spawnSync(python,args,{stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)throw new Error(`Python failed: ${r.status}`);}
run(['-c',`from PIL import Image\nfrom pathlib import Path\np=Path(${JSON.stringify(scratch)})\nsheet=Image.new('RGB',(11480,13140),'#0c0b1d')\nfor i in range(${frameCount}):\n    with Image.open(p / f'{i}.png') as frame:\n        sheet.paste(frame,((i % 10)*1148+34,(i // 10)*876+26))\nsheet.save(p / 'sheet.png')`]);
run(['scripts/animations/sheet_to_gif.py',join(scratch,'sheet.png'),'--grid','10x15','--fps','7','--size','1080','--no-dither','--out',`${folder}/animation.gif`]);
const sources=['scripts/animations/select.css','scripts/animations/render-conditions.mts','scripts/animations/sheet_to_gif.py','src/assets/animations/select-pulse.png',...fonts];
const files=Object.fromEntries(['animation.gif',...Array.from(scenes.values(),s=>`${s}.png`)].map(file=>[file,createHash('sha256').update(readFileSync(`${folder}/${file}`)).digest('hex')]));
writeFileSync(`${folder}/manifest.json`,JSON.stringify({fingerprint:animationFingerprint(query,steps,sources),sources,width:1080,height:824,files,
 caption:'Minh họa xử lý logic. Bảng nguồn trích 4 trong 48 hồ sơ và 5 trong 12 cột; kết quả có đủ 2 hồ sơ. Thứ tự dòng có thể khác khi chạy SQL.',
 alt:'FROM chọn bảng nguồn. WHERE loại NV002 sai ngày và NV030 sai phòng, chuyển NV003 và NV043 đạt cả hai điều kiện sang bảng kết quả. SELECT giữ hai dòng, chọn bốn cột và đặt tiêu đề.',
 scenes:[{step:0,file:'from.png',alt:'FROM chọn bảng NhanVien, trích bốn hồ sơ và năm cột.'},{step:1,file:'where.png',alt:'WHERE giữ NV003 và NV043; loại NV002 sai ngày và NV030 sai phòng. Bước lọc vẫn giữ 12 cột.'},{step:2,file:'select.png',alt:'SELECT giữ hai hồ sơ, chọn bốn cột và đặt tiêu đề tiếng Việt.'}]
},null,2)+'\n');
console.log(`Rendered ${folder}; temporary frames in ${scratch}`);
