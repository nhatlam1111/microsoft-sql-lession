import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { animationFingerprint } from '../../src/lib/animation-assets.ts';
import { checkFlow, type FlowStep } from '../../src/lib/run-flow.ts';

const lesson=readFileSync('src/content/lessons/2-9-case-when-ham-if.mdx','utf8').replace(/\r\n?/g,'\n');
const match=lesson.match(/<AnimatedFlow query=\{(`[^]*?`)\} steps=\{([^]*?)\} animation="2-9-case"/);
if(!match)throw new Error('Không tìm thấy dữ liệu AnimatedFlow 2.9');
const query:string=runInNewContext(match[1]);
const steps:FlowStep[]=JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
const issues=checkFlow(steps,query);if(issues.length)throw new Error(issues.join('\n'));
const displayed=lesson.match(/<Sql code=\{(`[^]*?`)\}\s*\/>\s*[^]*?<AnimatedFlow query=/);
const expected=`SELECT MaNV AS [Mã nhân viên], HoTen AS [Họ tên],
\tNgayVaoLam AS [Ngày vào làm],
\tCASE
\t\tWHEN DATEADD(year, 3, NgayVaoLam) <= '20261021' THEN N'Từ 3 năm trở lên'
\t\tWHEN DATEADD(year, 1, NgayVaoLam) <= '20261021' THEN N'Từ 1 đến dưới 3 năm'
\t\tELSE N'Dưới 1 năm'
\tEND AS [Nhóm thâm niên]
FROM NhanVien
WHERE TrangThai = N'Đang làm' AND NgayVaoLam <= '20261021'
ORDER BY MaNV ASC;`;
if(!displayed||runInNewContext(displayed[1])!==query||query!==expected||steps.map(s=>`${s.clause}:${s.total}`).join(',')!=='FROM:48,WHERE:45,SELECT:45,ORDER BY:45')throw new Error('SQL hoặc dữ liệu bước đã đổi');
const [source,filtered,selected,ordered]=steps;
const pick=(step:FlowStep,id:string,names:string[])=>{const row=step.rows.find(r=>r[0]===id);if(!row)throw new Error(`Thiếu ${id}`);return names.map(n=>row[step.columns.indexOf(n)]);};
const ids=['NV003','NV025','NV045'];
const src=['NV003','NV020','NV025','NV045'].map(id=>pick(source,id,['MaNV','NgayVaoLam','TrangThai']));
const kept=ids.map(id=>pick(filtered,id,['MaNV','NgayVaoLam','TrangThai']));
const branchRows=ids.map(id=>pick(filtered,id,['MaNV','NgayVaoLam']));
const results=ids.map(id=>pick(selected,id,['Mã nhân viên','Nhóm thâm niên']));
const anniversaries=[['2026-06-01','2024-06-01'],['2026-11-01','2024-11-01'],['2029-07-01','2027-07-01']];
const expectedLabels=['Từ 3 năm trở lên','Từ 1 đến dưới 3 năm','Dưới 1 năm'];
const actualChecks=selected.checks;
if(JSON.stringify(src.map(r=>r[0]))!==JSON.stringify(['NV003','NV020','NV025','NV045'])||src[1][2]!=='Đã nghỉ'||kept.some(r=>r[2]!=='Đang làm'||String(r[1])>'2026-10-21')||JSON.stringify(results.map(r=>r[1]))!==JSON.stringify(expectedLabels)||JSON.stringify(branchRows.map(r=>r[1]))!==JSON.stringify(['2023-06-01','2023-11-01','2026-07-01'])||JSON.stringify(actualChecks?.rows)!==JSON.stringify([['NV003',true,null],['NV025',false,true],['NV045',false,false]])||!ordered.rows.some(r=>r[0]==='NV003'))throw new Error('Mẫu CASE đã đổi, cần cập nhật kịch bản');
const folder='public/lesson-animations/2-9-case';mkdirSync(folder,{recursive:true});
const scratch=mkdtempSync(join(tmpdir(),'lesson-case-'));
const fonts=['node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-latin-400-normal.woff','node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-vietnamese-400-normal.woff'];
const fontCss=fonts.map((path,i)=>`@font-face{font-family:${i<2?'UI':'Code'};src:url(data:font/woff;base64,${readFileSync(path).toString('base64')});${i%2?'unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;':''}}`).join('');
const esc=(v:unknown)=>String(v??'NULL').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const pulse=readFileSync('src/assets/animations/select-pulse.png').toString('base64');
const lines=query.split('\n');
const queryHtml=lines.map((line,i)=>`<span id="line${i}">${esc(line.trim().replace(', HoTen', ',\nHoTen').replace(' THEN ', '\nTHEN ').replace(' AND ', '\nAND '))}</span>`).join('\n');
const html=`<!doctype html><meta charset="utf-8"><style>${fontCss}${readFileSync('scripts/animations/select.css','utf8')}
.stages{grid-template-columns:repeat(4,1fr);gap:10px}.stages span{font:15px Code;padding:16px 9px;text-align:center}.query{height:210px}.query pre{font-size:13px;line-height:1.05;top:9px;left:16px}.explanation{left:565px;top:16px;height:175px;padding:8px 0 0 16px}.explanation h2{font-size:18px;margin-bottom:8px}.explanation p{font-size:14px;line-height:1.5}.card{top:430px;height:270px;padding:14px}.card h2{font-size:19px}.meta{font-size:14px;margin-bottom:8px}table,th{font-size:14px}th,td{height:36px;padding:4px 8px}th{height:38px}#source tr.excluded td{color:#817e9b;text-decoration:line-through}#source tr.active-row td{background:#463864}#destination td:last-child{color:#ffaee6}#travel{position:absolute;z-index:3;pointer-events:none;background:#342957;border:1px solid #b8a4ff;box-shadow:0 0 10px #b8a4ff55;font:14px/34px UI;display:flex;height:36px}#travel span{padding-left:8px;white-space:nowrap;overflow:hidden}#travel span:first-child{width:24%}#travel span:last-child{width:76%}#travel[hidden]{display:none}#pulse{background-image:url(data:image/png;base64,${pulse})}.footer p{font-size:15px}
</style><div class="eyebrow">SQL SERVER / BÀI 2.9</div><div class="purpose">NGÀY CHỐT · 21/10/2026</div><h1>CASE: chọn nhãn thâm niên</h1><div class="logic">MINH HỌA XỬ LÝ LOGIC</div><div class="stages">${['FROM','WHERE','SELECT · CASE','ORDER BY'].map((s,i)=>`<span id="s${i}">0${i+1} ${s}</span>`).join('')}</div>
<div class="query"><pre>${queryHtml}</pre><div class="explanation"><h2 id="action"></h2><p id="explain"></p></div></div><div class="card source-card"><h2 id="left-title"></h2><div class="meta" id="left-meta"></div><table id="source"></table></div><div id="bridge">→<span id="pulse"></span></div><div class="card result-card"><h2 id="right-title"></h2><div class="meta" id="right-meta"></div><table id="destination"></table></div><div id="travel" hidden><span></span><span></span></div><div class="footer"><strong id="badge"></strong><p id="conclusion"></p></div><p class="excerpt" id="excerpt"></p>`;
const frames=168,scenes=new Map([[4,'poster'],[9,'from'],[43,'where'],[130,'select'],[165,'order']]);
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1080,height:824},deviceScaleFactor:1});await page.setContent(html);await page.evaluate(()=>document.fonts.ready);
 for(let frame=0;frame<frames;frame++){
  await page.evaluate(({frame,src,kept,branchRows,results,anniversaries})=>{
   const get=(id:string)=>document.getElementById(id)!;
   const escape=(v:unknown)=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
   const table=(headers:string[],rows:unknown[][])=>`<thead><tr>${headers.map(x=>`<th>${escape(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${escape(v)}</td>`).join('')}</tr>`).join('')}</tbody>`;
   const stage=frame<19?0:frame<50?1:frame<144?2:3;
   for(let i=0;i<4;i++)get(`s${i}`).classList.toggle('active',i===stage);
   for(let i=0;i<10;i++)get(`line${i}`).classList.toggle('focus',stage===0?i===7:stage===1?i===8:stage===2?i<=6:i===9);
   const source=get('source'),dest=get('destination'),travel=get('travel');travel.hidden=true;get('pulse').style.visibility='hidden';
   get('badge').textContent=['48 HỒ SƠ','48 → 45','45 HỒ SƠ','45 HỒ SƠ'][stage];
   get('excerpt').textContent='Dữ liệu trích · Thứ tự trước ORDER BY chỉ là minh họa.';
   if(stage<2){
    source.innerHTML=table(['MaNV','NgayVaoLam','TrangThai'],src);dest.innerHTML=stage===0?'':table(['MaNV','NgayVaoLam','TrangThai'],kept);
    get('left-title').textContent='Bảng nguồn / NhanVien';get('left-meta').textContent='Trích 4/48 hồ sơ · 3/12 cột';get('right-title').textContent=stage===0?'Chờ lọc':'Sau WHERE';get('right-meta').textContent=stage===0?'Chưa lọc':'Trích 3/45 hồ sơ · 3/12 cột';
    get('action').textContent=stage===0?'Chọn bảng nguồn':'Giữ đúng phạm vi';get('explain').innerHTML=stage===0?'FROM chọn NhanVien.<br>Chưa lọc hoặc chọn cột.':'Đang làm và vào làm<br>không sau 21/10/2026.';
    get('conclusion').textContent=stage===0?'Nguồn có 48 hồ sơ, 12 cột.':'NV020 đã nghỉ nên bị loại; tổng 45 hồ sơ được giữ.';
    if(stage===1){
     const sr=Array.from(source.querySelectorAll<HTMLTableRowElement>('tbody tr')),dr=Array.from(dest.querySelectorAll<HTMLTableRowElement>('tbody tr'));sr[1].classList.add('excluded');
     const starts=[24,32,40],n=starts.filter(s=>frame>=s+7).length;dr.forEach((row,i)=>row.style.visibility=i<n?'visible':'hidden');
     const i=starts.findIndex(s=>frame>=s&&frame<s+7);if(i>=0){const a=sr[[0,2,3][i]].getBoundingClientRect(),b=dr[i].getBoundingClientRect(),t=(frame-starts[i])/7,p=t*t*(3-2*t);travel.hidden=false;travel.style.left=`${a.x+(b.x-a.x)*p}px`;travel.style.top=`${a.y+(b.y-a.y)*p}px`;travel.style.width=`${a.width+(b.width-a.width)*p}px`;travel.children[0].textContent=String(kept[i][0]);travel.children[1].textContent=`${kept[i][1]}   ·   ${kept[i][2]}`;get('pulse').style.visibility='visible';}
    }
   }else if(stage===2){
    source.innerHTML=table(['MaNV','NgayVaoLam'],branchRows);dest.innerHTML=table(['MaNV','Nhóm thâm niên'],results);get('left-title').textContent='Sau WHERE';get('left-meta').textContent='Trích 3/45 hồ sơ · 2/12 cột';get('right-title').textContent='Sau SELECT · CASE';get('right-meta').textContent='Trích 3/45 dòng · 2/4 cột';
    const sr=Array.from(source.querySelectorAll<HTMLTableRowElement>('tbody tr')),dr=Array.from(dest.querySelectorAll<HTMLTableRowElement>('tbody tr'));
    const i=Math.min(2,Math.floor((frame-50)/30)),phase=(frame-50)-i*30;sr[i].classList.add('active-row');dr.forEach((row,j)=>row.style.visibility=(j<i||(j===i&&phase>=26))?'visible':'hidden');
    get('action').textContent=`${branchRows[i][0]} · xét từ trên xuống`;
    const three=anniversaries[i][0],one=anniversaries[i][1];
    if(i===0)get('explain').innerHTML=phase<9?`Mốc 3 năm: ${three}<br>≤ 2026-10-21 → ĐÚNG`:'Nhánh 3 năm đúng → DỪNG.<br>Không xét nhánh 1 năm.';
    if(i===1)get('explain').innerHTML=phase<9?`Mốc 3 năm: ${three}<br>&gt; 2026-10-21 → SAI`:`Mốc 1 năm: ${one}<br>≤ 2026-10-21 → ĐÚNG, DỪNG.`;
    if(i===2)get('explain').innerHTML=phase<9?`Mốc 3 năm: ${three}<br>&gt; 2026-10-21 → SAI`:phase<18?`Mốc 1 năm: ${one}<br>&gt; 2026-10-21 → SAI`:'Cả hai WHEN sai → ELSE.';
    get('conclusion').textContent=i===0?'NV003 nhận Từ 3 năm trở lên.':i===1?'NV025 nhận Từ 1 đến dưới 3 năm.':'NV045 nhận Dưới 1 năm từ ELSE.';
    if(phase>=19&&phase<26){const a=sr[i].getBoundingClientRect(),b=dr[i].getBoundingClientRect(),t=(phase-19)/7,p=t*t*(3-2*t);travel.hidden=false;travel.style.left=`${a.x+(b.x-a.x)*p}px`;travel.style.top=`${a.y+(b.y-a.y)*p}px`;travel.style.width=`${a.width+(b.width-a.width)*p}px`;travel.children[0].textContent=String(results[i][0]);travel.children[1].textContent=String(results[i][1]);get('pulse').style.visibility='visible';}
   }else{
    const unsorted=[results[2],results[1],results[0]];source.innerHTML=table(['MaNV','Nhóm thâm niên'],unsorted);dest.innerHTML=table(['MaNV','Nhóm thâm niên'],results);get('left-title').textContent='Trước ORDER BY';get('left-meta').textContent='Trích 3/45 dòng · thứ tự minh họa';get('right-title').textContent='Sau ORDER BY';get('right-meta').textContent='Trích 3/45 dòng · 2/4 cột';get('action').textContent='Xếp mã tăng dần';get('explain').innerHTML='ORDER BY MaNV ASC<br>xếp các dòng theo mã.';get('conclusion').textContent='NV003 trước NV025, sau đó NV045.';get('excerpt').textContent='Ba hồ sơ được trích để so thứ tự; không phải ba dòng đầu kết quả.';
    const sr=Array.from(source.querySelectorAll<HTMLTableRowElement>('tbody tr')),dr=Array.from(dest.querySelectorAll<HTMLTableRowElement>('tbody tr'));const n=Math.min(3,Math.max(0,Math.floor((frame-150)/8)));dr.forEach((row,i)=>row.style.visibility=i<n?'visible':'hidden');
    if(frame>=150&&frame<174){const i=Math.floor((frame-150)/8),a=sr[2-i].getBoundingClientRect(),b=dr[i].getBoundingClientRect(),t=((frame-150)%8)/8,p=t*t*(3-2*t);travel.hidden=false;travel.style.left=`${a.x+(b.x-a.x)*p}px`;travel.style.top=`${a.y+(b.y-a.y)*p}px`;travel.style.width=`${a.width+(b.width-a.width)*p}px`;travel.children[0].textContent=String(results[i][0]);travel.children[1].textContent=String(results[i][1]);get('pulse').style.visibility='visible';}
   }
  },{frame:Math.round(frame*179/(frames-1)),src,kept,branchRows,results,anniversaries});
  const png=await page.screenshot({path:join(scratch,`${frame}.png`)});const name=scenes.get(frame);if(name)writeFileSync(`${folder}/${name}.png`,png);
 }
}finally{await browser.close();}
const python=process.env.PYTHON||'python';function run(args:string[]){const r=spawnSync(python,args,{stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)throw new Error(`Python failed: ${r.status}`);}
run(['-c',`from PIL import Image\nfrom pathlib import Path\np=Path(${JSON.stringify(scratch)})\nsheet=Image.new('RGB',(13776,12264),'#0c0b1d')\nfor i in range(${frames}):\n    with Image.open(p / f'{i}.png') as frame:\n        sheet.paste(frame,((i % 12)*1148+34,(i // 12)*876+26))\nsheet.save(p / 'sheet.png')`]);
run(['scripts/animations/sheet_to_gif.py',join(scratch,'sheet.png'),'--grid','12x14','--fps','7','--size','1080','--no-dither','--out',`${folder}/animation.gif`]);
const sources=['scripts/animations/select.css','scripts/animations/render-case.mts','scripts/animations/sheet_to_gif.py','src/assets/animations/select-pulse.png',...fonts];
const files=Object.fromEntries(['animation.gif',...Array.from(scenes.values(),s=>`${s}.png`)].map(file=>[file,createHash('sha256').update(readFileSync(`${folder}/${file}`)).digest('hex')]));
writeFileSync(`${folder}/manifest.json`,JSON.stringify({fingerprint:animationFingerprint(query,steps,sources),sources,width:1080,height:824,files,
 caption:'Minh họa xử lý logic. Nguồn 48 hồ sơ, lọc còn 45; trích ba hồ sơ để xét CASE và xếp theo mã. Thứ tự trước ORDER BY chỉ là minh họa.',
 alt:'WHERE loại NV020 đã nghỉ. CASE cho NV003 dừng ở nhánh ba năm, NV025 ở nhánh một năm, NV045 nhận ELSE; ORDER BY xếp ba mã trích tăng dần.',
 scenes:[{step:0,file:'from.png',alt:'FROM chọn bảng NhanVien, trích bốn trong 48 hồ sơ.'},{step:1,file:'where.png',alt:'WHERE loại NV020 đã nghỉ và giữ ba hồ sơ mẫu; tổng 45 hồ sơ.'},{step:2,file:'select.png',alt:'CASE xét lần lượt NV003, NV025, NV045 và trả ba nhãn thâm niên.'},{step:3,file:'order.png',alt:'ORDER BY xếp ba hồ sơ trích NV003, NV025, NV045 theo mã; không phải ba dòng đầu kết quả.'}]
},null,2)+'\n');console.log(`Rendered ${folder}; temporary frames: ${scratch}`);
