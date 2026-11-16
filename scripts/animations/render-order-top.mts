import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { animationFingerprint } from '../../src/lib/animation-assets.ts';
import { checkFlow, type FlowStep } from '../../src/lib/run-flow.ts';

const lesson = readFileSync('src/content/lessons/2-4-sap-xep-va-top.mdx', 'utf8').replace(/\r\n?/g, '\n');
const match = lesson.match(/<AnimatedFlow query=\{(`[^]*?`)\} steps=\{([^]*?)\} animation="2-4-order-top"/);
if (!match) throw new Error('Không tìm thấy AnimatedFlow bài 2.4');
const query: string = runInNewContext(match[1]);
const steps: FlowStep[] = JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
const errors = checkFlow(steps, query);
if (errors.length) throw new Error(errors.join('\n'));
const displayed = lesson.match(/<Sql code=\{(`[^]*?`)\}\s*\/>\s*[^]*?<AnimatedFlow query=/);
if (!displayed || runInNewContext(displayed[1]) !== query) throw new Error('SQL hiển thị không khớp');
const expected = `SELECT TOP (5) MaNV AS [Mã nhân viên], HoTen AS [Họ tên],
\tMaPB AS [Mã phòng], NgayVaoLam AS [Ngày vào làm]
FROM NhanVien
WHERE TrangThai = N'Đang làm'
ORDER BY NgayVaoLam DESC, MaNV ASC;`;
const [source, filtered, selected, ordered, top] = steps;
if (query !== expected || steps.map(s => s.clause).join(',') !== 'FROM,WHERE,SELECT,ORDER BY,TOP' ||
    steps.map(s => s.total).join(',') !== '48,45,45,45,5' ||
    JSON.stringify(ordered.rows.slice(0,5)) !== JSON.stringify(top.rows) ||
    ordered.rows.slice(0,6).map(row => row[0]).join(',') !== 'NV048,NV047,NV046,NV045,NV044,NV040')
  throw new Error('SQL hoặc dữ liệu đã đổi, cần cập nhật kịch bản');
const names = ['MaNV','NgayVaoLam','TrangThai'];
const excerpt = (step: FlowStep) => step.rows.map(row => names.map(name => row[step.columns.indexOf(name)]));
const src = excerpt(source), kept = excerpt(filtered);
const selectNames = ['MaNV','HoTen','MaPB','NgayVaoLam'];
const selectSource = filtered.rows.map(row => selectNames.map(name => row[filtered.columns.indexOf(name)]));
const sorted = ordered.rows.slice(0,6).map(row => [row[0],row[3]]);
const unsorted = [...sorted].reverse();
if (src.some(row => row.some(cell => cell === undefined)) || kept.some(row => row.some(cell => cell === undefined)) ||
    src.map(row => row[0]).join(',') !== 'NV001,NV020,NV047,NV048' ||
    selected.rows.map(row => row[0]).join(',') !== 'NV001,NV047,NV048' ||
    JSON.stringify(selectSource) !== JSON.stringify(selected.rows))
  throw new Error('Trích đoạn đầu đã đổi, cần cập nhật kịch bản');

const folder = 'public/lesson-animations/2-4-order-top';
mkdirSync(folder, {recursive:true});
const scratch = mkdtempSync(join(tmpdir(), 'lesson-order-top-'));
const fonts = ['node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-latin-400-normal.woff','node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-vietnamese-400-normal.woff'];
const fontCss = fonts.map((path,i)=>`@font-face{font-family:${i<2?'UI':'Code'};src:url(data:font/woff;base64,${readFileSync(path).toString('base64')});${i%2?'unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;':''}}`).join('');
const escape = (v: unknown) => String(v ?? 'NULL').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const pulse = readFileSync('src/assets/animations/select-pulse.png').toString('base64');
const lines=query.split('\n');
const html = `<!doctype html><meta charset="utf-8"><style>${fontCss}${readFileSync('scripts/animations/select.css','utf8')}
.stages{grid-template-columns:repeat(5,1fr);gap:8px}.stages span{font:14px Code;padding:15px 8px;text-align:center}.query pre{font-size:13px;line-height:1.7}.explanation{left:625px;padding-left:18px}.explanation h2{font-size:19px;margin-bottom:12px}.explanation p{font-size:15px}.card{height:300px;padding:14px}.card h2{font-size:19px}.meta{font-size:14px;margin-bottom:8px}table,th{font-size:14px}th,td{height:30px;padding:4px 8px}th{height:34px}table.selected th,table.selected td{font-size:11px;padding:4px 3px}table.selected th{white-space:normal;line-height:13px}table.selected th:nth-child(1){width:18%}table.selected th:nth-child(2){width:35%}table.selected th:nth-child(3){width:15%}table.selected th:nth-child(4){width:32%}#source tr.excluded td{color:#817e9b;text-decoration:line-through}#destination tr.cut td{color:#817e9b;text-decoration:line-through}#travel{position:absolute;z-index:3;pointer-events:none;width:410px;height:30px;display:flex;font:14px/30px UI;background:#342957;border:1px solid #b8a4ff;box-shadow:0 0 10px #b8a4ff55}#travel[hidden],#column-travel[hidden]{display:none}#travel span{padding-left:8px;width:50%}#column-travel{position:absolute;z-index:3;pointer-events:none;background:#342957;border:1px solid #b8a4ff;box-shadow:0 0 10px #b8a4ff55;font:11px UI}#column-travel div{height:30px;line-height:30px;padding-left:3px;white-space:nowrap;overflow:hidden}#column-travel div:first-child{height:34px;line-height:34px;background:#463864}#pulse{background-image:url(data:image/png;base64,${pulse})}.footer p{font-size:15px}
</style><div class="eyebrow">SQL SERVER / BÀI 2.4</div><div class="purpose">HỒ SƠ ĐANG LÀM · MỌI PHÒNG</div><h1>Sắp xếp rồi lấy TOP</h1><div class="logic">MINH HỌA XỬ LÝ LOGIC</div>
<div class="stages">${['FROM','WHERE','SELECT','ORDER BY','TOP'].map((s,i)=>`<span id="s${i}">0${i+1} ${s}</span>`).join('')}</div>
<div class="query"><pre><span id="q2">${escape(lines[0])}\n${escape(lines[1])}</span>\n<span id="q0">${escape(lines[2])}</span>\n<span id="q1">${escape(lines[3])}</span>\n<span id="q3">${escape(lines[4])}</span></pre><div class="explanation"><h2 id="action"></h2><p id="explain"></p></div></div>
<div class="card source-card"><h2 id="left-title"></h2><div class="meta" id="left-meta"></div><table id="source"></table></div><div id="bridge">→<span id="pulse"></span></div>
<div class="card result-card"><h2 id="right-title"></h2><div class="meta" id="right-meta"></div><table id="destination"></table></div><div id="travel" hidden><span></span><span></span></div><div id="column-travel" hidden><div></div><div></div><div></div><div></div></div>
<div class="footer"><strong id="badge"></strong><p id="conclusion"></p></div><p class="excerpt" id="excerpt"></p>`;

// Story positions 0–55 cover the first three steps, 56–111 sorting, and 112–167 TOP.
const frames=150, scenes=new Map([[4,'poster'],[7,'from'],[22,'where'],[48,'select'],[95,'order'],[148,'top']]);
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome',headless:true});
try {
  const page=await browser.newPage({viewport:{width:1080,height:824},deviceScaleFactor:1});
  await page.setContent(html); await page.evaluate(()=>document.fonts.ready);
  for(let frame=0;frame<frames;frame++) {
    await page.evaluate(({frame,src,kept,unsorted,sorted,selectedRows,selectSource,selectNames})=>{
      const get=(id:string)=>document.getElementById(id)!;
      const esc=(v:unknown)=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
      const table=(headers:string[],rows:unknown[][])=>`<thead><tr>${headers.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody>`;
      const stage=frame<19?0:frame<38?1:frame<56?2:frame<112?3:4;
      for(let i=0;i<5;i++){get(`s${i}`).classList.toggle('active',i===stage);if(i<4)get(`q${i}`).classList.toggle('focus',i===stage || (stage===4&&i===2));}
      const labels=['Chọn bảng nguồn','Lọc trạng thái','Chọn cột và đặt tên','Xếp ngày mới nhất trước','Lấy năm dòng đầu'];
      const descriptions=['FROM chọn NhanVien.<br>Chưa lọc dòng hay chọn cột.','WHERE chỉ giữ Đang làm.<br>NV020 đã nghỉ nên bị loại.','SELECT chọn 4 cột và đặt tên.<br>TOP chưa giới hạn ở bước này.','NgayVaoLam DESC; nếu cùng ngày,<br>MaNV ASC quyết định thứ tự.','TOP (5) xét sau ORDER BY.<br>Giữ tối đa 5 dòng đầu.'];
      get('action').textContent=labels[stage];get('explain').innerHTML=descriptions[stage];
      get('badge').textContent=['48 HỒ SƠ','48 → 45','45 HỒ SƠ','45 HỒ SƠ','45 → 5'][stage];
      get('conclusion').textContent=['Nguồn có 48 hồ sơ và 12 cột.','NV020 đã nghỉ; còn 45 hồ sơ đang làm.','Chọn 4 cột; vẫn còn 45 hồ sơ.','NV048 ngày mới nhất; NV044 đứng thứ 5.','NV044 được giữ; NV040 đứng thứ 6 nên không vào TOP.'][stage];
      const source=get('source'), dest=get('destination'), travel=get('travel'), columnTravel=get('column-travel');travel.hidden=true;columnTravel.hidden=true;get('pulse').style.visibility='hidden';dest.classList.toggle('selected',stage===2);source.classList.toggle('selected',stage===2);
      if(stage<3){
        source.innerHTML=table(['MaNV','NgayVaoLam','TrangThai'],src);
        source.querySelectorAll('tbody tr')[1]?.classList.toggle('excluded',stage>=1);
        dest.innerHTML=stage===0?'':table(['MaNV','NgayVaoLam','TrangThai'],kept);
        get('left-title').textContent='Bảng nguồn / NhanVien';get('left-meta').textContent='Trích 4/48 dòng · 3/12 cột';
        get('right-title').textContent=stage===0?'Chờ lọc':stage===1?'Sau WHERE':'Sau SELECT';
        get('right-meta').textContent=stage===0?'Chưa lọc':stage===1?'Trích 3/45 dòng · 3/12 cột':'Trích 3/45 dòng · đủ 4 cột';
        if(stage===2) {
          source.innerHTML=table(selectNames,selectSource);
          dest.innerHTML=table(['Mã nhân viên','Họ tên','Mã phòng','Ngày vào làm'],selectedRows);
          get('left-title').textContent='Sau WHERE';get('left-meta').textContent='Trích 3/45 dòng · 4/12 cột';
          const completed=Math.min(4,Math.max(0,Math.floor((frame-40)/3)));
          const srcRows=Array.from(source.querySelectorAll<HTMLTableRowElement>('tr'));
          const dstRows=Array.from(dest.querySelectorAll<HTMLTableRowElement>('tr'));
          dstRows.forEach(row=>Array.from(row.cells).forEach((cell,i)=>cell.style.visibility=i<completed?'visible':'hidden'));
          if(frame>=40&&frame<52){
            const index=Math.floor((frame-40)/3),t=((frame-40)%3)/3,p=t*t*(3-2*t);
            const a=srcRows[0].cells[index].getBoundingClientRect(),b=dstRows[0].cells[index].getBoundingClientRect();
            columnTravel.hidden=false;columnTravel.style.left=`${a.x+(b.x-a.x)*p}px`;columnTravel.style.top=`${a.y+(b.y-a.y)*p}px`;columnTravel.style.width=`${a.width+(b.width-a.width)*p}px`;
            Array.from(columnTravel.children).forEach((cell,i)=>cell.textContent=srcRows[i].cells[index].textContent);
          }
        }
        get('excerpt').textContent='Các bảng chỉ hiện dữ liệu trích · Thứ tự trước ORDER BY không được bảo đảm.';
      }else{
        const sorting=stage===3, headers=['Mã nhân viên','Ngày vào làm'];
        const left=sorting?unsorted:sorted;
        source.innerHTML=table(headers,left);dest.innerHTML=table(headers,sorted);
        get('left-title').textContent=sorting?'Trước ORDER BY':'Sau ORDER BY';get('left-meta').textContent=sorting?'Trích 6/45 dòng · thứ tự minh họa':'Trích 6/45 dòng đầu đã xếp';
        get('right-title').textContent=sorting?'Sau ORDER BY':'Sau TOP (5)';get('right-meta').textContent=sorting?'Trích 6/45 dòng đầu':'Kết quả đủ 5 dòng · trích 2/4 cột';
        get('excerpt').textContent='Minh họa trích 2 cột; số tổng và bảng trích đầy đủ hơn nằm trong từng bước bên dưới.';
        const dst=Array.from(dest.querySelectorAll<HTMLTableRowElement>('tbody tr'));
        const sourceRows=Array.from(source.querySelectorAll<HTMLTableRowElement>('tbody tr'));
        if(sorting){
          // One row at a time, from the unsorted excerpt to its sorted position.
          const n=Math.min(6,Math.max(0,Math.floor((frame-63)/7)));
          dst.forEach((row,i)=>{row.style.visibility=i<n?'visible':'hidden';});
          if(frame>=63&&frame<105){const i=Math.floor((frame-63)/7), t=((frame-63)%7)/7;move(sourceRows[5-i],dst[i],t);}
        }else{
          const n=Math.min(5,Math.max(0,Math.floor((frame-119)/7)));
          dst.forEach((row,i)=>{row.style.visibility=i<n?'visible':'hidden';});
          sourceRows[5].classList.toggle('cut',frame>=155);
          if(frame>=119&&frame<154){const i=Math.floor((frame-119)/7),t=((frame-119)%7)/7;move(sourceRows[i],dst[i],t);}
        }
        function move(from:HTMLTableRowElement,to:HTMLTableRowElement,t:number){const a=from.getBoundingClientRect(),b=to.getBoundingClientRect();const p=t*t*(3-2*t);travel.hidden=false;travel.style.left=`${a.x+(b.x-a.x)*p}px`;travel.style.top=`${a.y+(b.y-a.y)*p}px`;travel.style.width=`${a.width+(b.width-a.width)*p}px`;Array.from(travel.children).forEach((cell,i)=>cell.textContent=from.cells[i].textContent);get('pulse').style.visibility='visible';get('pulse').style.backgroundPosition=`${-(frame%4)*32}px ${-Math.floor(frame%16/4)*14}px`;}
      }
    },{frame:Math.round(frame*167/(frames-1)),src,kept,unsorted,sorted,selectedRows:selected.rows,selectSource,selectNames});
    const png=await page.screenshot({path:join(scratch,`${frame}.png`)});const scene=scenes.get(frame);if(scene)writeFileSync(`${folder}/${scene}.png`,png);
  }
} finally {await browser.close();}
const python=process.env.PYTHON||'python';
function run(args:string[]){const result=spawnSync(python,args,{stdio:'inherit'});if(result.error)throw result.error;if(result.status!==0)throw new Error(`Python failed: ${result.status}`);}
run(['-c',`from PIL import Image\nfrom pathlib import Path\np=Path(${JSON.stringify(scratch)})\nsheet=Image.new('RGB',(11480,13140),'#0c0b1d')\nfor i in range(${frames}):\n    with Image.open(p / f'{i}.png') as frame:\n        sheet.paste(frame,((i % 10)*1148+34,(i // 10)*876+26))\nsheet.save(p / 'sheet.png')`]);
run(['scripts/animations/sheet_to_gif.py',join(scratch,'sheet.png'),'--grid','10x15','--fps','7','--size','1080','--no-dither','--out',`${folder}/animation.gif`]);
const sources=['scripts/animations/select.css','scripts/animations/render-order-top.mts','scripts/animations/sheet_to_gif.py','src/assets/animations/select-pulse.png',...fonts];
const files=Object.fromEntries(['animation.gif',...Array.from(scenes.values(),s=>`${s}.png`)].map(file=>[file,createHash('sha256').update(readFileSync(`${folder}/${file}`)).digest('hex')]));
writeFileSync(`${folder}/manifest.json`,JSON.stringify({fingerprint:animationFingerprint(query,steps,sources),sources,width:1080,height:824,files,
 caption:'Minh họa xử lý logic: nguồn 48 hồ sơ, lọc còn 45, chọn 4 cột, xếp rồi lấy 5 dòng. Cảnh xếp trích 6 dòng và 2 cột; thứ tự trước ORDER BY chỉ là minh họa.',
 alt:'Lọc hồ sơ đang làm, chọn cột, lần lượt xếp sáu hồ sơ trích theo ngày mới nhất trước, rồi chuyển năm hồ sơ đầu sang kết quả; NV040 đứng thứ sáu không được lấy.',
 scenes:[{step:0,file:'from.png',alt:'FROM chọn bảng nguồn, trích bốn trong 48 hồ sơ.'},{step:1,file:'where.png',alt:'WHERE loại NV020 đã nghỉ; còn 45 hồ sơ đang làm.'},{step:2,file:'select.png',alt:'SELECT chọn bốn cột và đặt tiêu đề; còn 45 hồ sơ.'},{step:3,file:'order.png',alt:'ORDER BY xếp ngày mới trước, trích sáu trong 45 hồ sơ, NV044 đứng thứ năm.'},{step:4,file:'top.png',alt:'TOP giữ năm hồ sơ đầu, NV040 đứng thứ sáu không được lấy.'}]
},null,2)+'\n');
console.log(`Rendered ${folder}; temporary frames: ${scratch}`);
