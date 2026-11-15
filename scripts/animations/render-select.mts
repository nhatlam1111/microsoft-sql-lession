import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { animationFingerprint } from '../../src/lib/animation-assets.ts';
import type { FlowStep } from '../../src/lib/run-flow.ts';
import { selectStory } from './select-story.ts';

const lesson = readFileSync('src/content/lessons/2-1-chon-cot-dat-ten-cot.mdx', 'utf8').replace(/\r\n?/g, '\n');
const match = lesson.match(/<AnimatedFlow query=\{(`[^]*?`)\} steps=\{([^]*?)\} animation="2-1-select"/)!;
const query: string = runInNewContext(match[1]);
const steps: FlowStep[] = JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
const { source, result, names } = selectStory(query, steps);
const folder = 'public/lesson-animations/2-1-select';
mkdirSync(folder, { recursive: true });
const scratch = mkdtempSync(join(tmpdir(), 'lesson-select-'));
const fonts = [
  'node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-latin-400-normal.woff',
  'node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-400-normal.woff',
  'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff',
  'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-vietnamese-400-normal.woff',
];
const fontCss = fonts.map((path, i) => `@font-face{font-family:${i<2?'UI':'Code'};src:url(data:font/woff;base64,${readFileSync(path).toString('base64')});${i%2===1?'unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;':''}}`).join('');
const theme = readFileSync('scripts/animations/select.css', 'utf8');
const escape = (s: unknown) => String(s ?? 'NULL').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const cols = ['MaNV', 'HoTen', 'GioiTinh', 'NgayVaoLam'];
const rows = source.rows.map(row => cols.map(c => row[source.columns.indexOf(c)]));
const pulse = readFileSync('src/assets/animations/select-pulse.png').toString('base64');
const html = `<!doctype html><meta charset="utf-8"><style>${fontCss}${theme}
#pulse { background-image: url(data:image/png;base64,${pulse}); }
</style>
<div class="eyebrow">SQL SERVER / BÀI 2.1</div>
<div class="purpose">DANH SÁCH GỬI KẾ TOÁN</div>
<h1>Câu SELECT đầu tiên</h1><div class="logic">MINH HỌA XỬ LÝ LOGIC</div>
<div class="stages"><span id="from-stage">01 FROM · Bảng nguồn</span><span id="select-stage">02 SELECT · Chọn cột</span><span id="alias-stage">AS trong SELECT</span></div>
<div class="query"><pre><span id="select-code">${names.map((name, i) => `${i === 0 ? 'SELECT ' : '       '}<span class="sql-name">${escape(name)}</span> <span class="sql-alias">AS [${escape(result.columns[i])}]</span>${i < 2 ? ',' : ''}`).join('\n')}</span>
<span id="from-code">${escape(query.slice(query.lastIndexOf('FROM')))}</span></pre>
<div class="explanation"><h2 id="action"></h2><p id="explain"></p></div></div>
<div class="card source-card"><h2>Bảng nguồn / NhanVien</h2><div class="meta">${source.total} dòng · ${source.columns.length} cột</div><table id="source"><colgroup><col style="width:17%"><col style="width:34%"><col style="width:21%"><col style="width:28%"></colgroup><thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${escape(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
<div id="bridge">→<span id="pulse"></span></div>
<div class="card result-card"><h2>Kết quả truy vấn</h2><div class="meta" id="result-count"></div><table id="destination"><colgroup><col style="width:32%"><col style="width:36%"><col style="width:32%"></colgroup><thead><tr>${names.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${result.rows.map(row=>`<tr>${row.map(v=>`<td>${escape(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
<div class="footer"><strong id="badge"></strong><p id="conclusion"></p></div><p class="excerpt">Minh họa trích ${source.rows.length}/${source.total} hồ sơ và ${cols.length}/${source.columns.length} cột nguồn · Thứ tự dòng có thể khác khi chạy SQL.</p><div id="copy" hidden></div>`;
const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL || 'chrome', headless: true });
try {
  const page = await browser.newPage({viewport:{width:1080,height:824},deviceScaleFactor:1});
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  for(let frame=0;frame<150;frame++) {
    const t=frame/10;
    await page.evaluate(({t, names, aliases, total, colCount, sourceColumnCount}) => {
      const get=(id:string)=>document.getElementById(id)!;
      const selecting=t>=3, alias=t>=9;
      get('from-stage').className=selecting?'':'active'; get('select-stage').className=selecting?'active':'';
      get('from-code').className=selecting?'':'focus';
      get('alias-stage').className=alias?'active':'';
      document.querySelector('.source-card')!.className = `card source-card ${selecting ? '' : 'active'}`;
      document.querySelector('.result-card')!.className = `card result-card ${selecting ? 'active' : ''} ${alias ? 'alias' : ''}`;
      document.querySelectorAll('.sql-name').forEach(el => el.className = selecting && !alias ? 'sql-name focus' : 'sql-name');
      document.querySelectorAll('.sql-alias').forEach(el => el.className = alias ? 'sql-alias alias-focus' : 'sql-alias');
      get('result-count').textContent=selecting?`${total} dòng · ${colCount} cột`:'Chờ chọn cột';
      get('action').textContent=alias?'Đặt tiêu đề tiếng Việt':selecting?'Chọn ba cột cần gửi':'Lấy bảng làm nguồn';
      get('explain').innerHTML=alias?'Trong SELECT, AS đặt tiêu đề.<br>Các giá trị bên dưới giữ nguyên.':selecting?'Lấy các cột theo thứ tự<br>viết trong SELECT.':`FROM chọn bảng NhanVien.<br>Bảng có ${total} dòng và ${sourceColumnCount} cột.`;
      get('badge').textContent=alias?`${total} → ${total} DÒNG`:selecting?`${sourceColumnCount} → ${colCount} CỘT`:'YÊU CẦU';
      get('conclusion').textContent=alias?'NV033 đã nghỉ vẫn có trong danh sách.':selecting?'Ví dụ, GioiTinh chỉ xuất hiện ở bảng nguồn.':'Lấy mã, họ tên và ngày vào làm của toàn bộ hồ sơ nhân viên.';
      get('pulse').style.visibility=selecting&&!alias?'visible':'hidden';
      const pulseFrame=Math.floor((t*10)%16);get('pulse').style.backgroundPosition=`${-(pulseFrame%4)*32}px ${-Math.floor(pulseFrame/4)*14}px`;
      const sourceRows=Array.from(document.querySelectorAll<HTMLTableRowElement>('#source tr'));
      const destRows=Array.from(document.querySelectorAll<HTMLTableRowElement>('#destination tr'));
      sourceRows.forEach(row=>Array.from(row.cells).forEach((cell,c)=>cell.className=selecting?(c===2?'dim':'picked'):''));
      names.forEach((name,c)=>{
        const arrived=t>=4.2+c*1.5;
        destRows.forEach(row=>{row.cells[c].style.visibility=arrived?'visible':'hidden';row.cells[c].className=arrived?'picked':'';});
        destRows[0].cells[c].textContent=alias?aliases[c]:name;
        if(alias)destRows[0].cells[c].classList.add('alias');
      });
      sourceRows[4].className=alias?'marked':'';
      destRows[4].className=alias?'marked':'';
      const copy=get('copy');copy.hidden=true;
      for(let c=0;c<3;c++){
        const progress=(t-(3+c*1.5))/1.2;
        if(progress<0||progress>=1)continue;
        const col=c===2?3:c;
        const from=sourceRows[0].cells[col].getBoundingClientRect(),to=destRows[0].cells[c].getBoundingClientRect();
        const smooth=progress*progress*(3-2*progress);
        copy.replaceChildren(...sourceRows.map(row=>{const div=document.createElement('div');div.textContent=row.cells[col].textContent;return div;}));
        copy.hidden=false;copy.style.left=`${from.x+(to.x-from.x)*smooth}px`;copy.style.top=`${from.y+(to.y-from.y)*smooth}px`;copy.style.width=`${from.width+(to.width-from.width)*smooth}px`;
      }
    },{t,names,aliases:result.columns,total:result.total,colCount:result.columns.length,sourceColumnCount:source.columns.length});
    await page.screenshot({path:join(scratch,`${frame}.png`)});
    for(const [at,name] of [[20,'poster'],[29,'from'],[85,'select'],[125,'aliases']] as const)
      if(frame===at)await page.screenshot({path:`${folder}/${name}.png`});
  }
} finally { await browser.close(); }
// Authored grid has known geometry. The plugin auto-detector supports only up to six cells per axis.
const python=process.env.PYTHON || 'python';
function run(args:string[]) { const r=spawnSync(python,args,{stdio:'inherit'});if(r.status!==0)throw new Error(`Python failed (${r.status})`); }
run(['-c',`from PIL import Image\nfrom pathlib import Path\np=Path(${JSON.stringify(scratch)})\nsheet=Image.new('RGB',(11480,13140),'#0c0b1d')\nfor i in range(150):\n im=Image.open(p/f'{i}.png')\n sheet.paste(im,((i%10)*1148+34,(i//10)*876+26))\nsheet.save(p/'sheet.png')`]);
run(['scripts/animations/sheet_to_gif.py',join(scratch,'sheet.png'),'--grid','10x15','--fps','10','--size','1080','--no-dither','--out',`${folder}/animation.gif`]);
const sources=['scripts/animations/select.css','scripts/animations/render-select.mts','scripts/animations/select-story.ts','scripts/animations/sheet_to_gif.py','src/assets/animations/select-pulse.png',...fonts];
const files=Object.fromEntries(['animation.gif','poster.png','from.png','select.png','aliases.png'].map(file=>[file,createHash('sha256').update(readFileSync(`${folder}/${file}`)).digest('hex')]));
writeFileSync(`${folder}/manifest.json`,JSON.stringify({fingerprint:animationFingerprint(query,steps,sources),sources,width:1080,height:824,files,
  caption:`Minh họa xử lý logic. Trích ${source.rows.length} trong ${source.total} hồ sơ, ${cols.length} trong ${source.columns.length} cột nguồn. Thứ tự dòng có thể khác khi chạy SQL.`,
  alt:`FROM lấy bảng NhanVien; SELECT lấy ba cột và AS đặt tiêu đề tiếng Việt. Kết quả vẫn đủ ${result.total} hồ sơ.`,
  scenes:[{step:0,file:'from.png',alt:'FROM chọn bảng NhanVien làm nguồn.'},{step:1,file:'select.png',alt:'SELECT lấy MaNV, HoTen và NgayVaoLam theo đúng thứ tự.'},{step:1,file:'aliases.png',alt:'Trong SELECT, AS đặt tiêu đề Mã nhân viên, Họ tên và Ngày vào làm.'}],
},null,2)+'\n');
console.log(`Rendered ${folder}; temporary frames in ${scratch}`);
