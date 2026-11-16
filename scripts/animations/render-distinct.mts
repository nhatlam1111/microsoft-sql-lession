import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { animationFingerprint } from '../../src/lib/animation-assets.ts';
import { checkFlow, type FlowStep } from '../../src/lib/run-flow.ts';

const lesson = readFileSync('src/content/lessons/2-6-distinct-bo-dong-trung.mdx','utf8').replace(/\r\n?/g,'\n');
const match = lesson.match(/<AnimatedFlow query=\{(`[^]*?`)\} steps=\{([^]*?)\} animation="2-6-distinct"/);
if (!match) throw new Error('Không tìm thấy dữ liệu AnimatedFlow bài 2.6');
const query: string = runInNewContext(match[1]);
const steps: FlowStep[] = JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
const issues = checkFlow(steps, query);
if (issues.length) throw new Error(issues.join('\n'));
const displayed = lesson.match(/<Sql code=\{(`[^]*?`)\}\s*\/>\s*[^]*?<AnimatedFlow query=/);
const expected = `SELECT DISTINCT MaPB, MaCD\nFROM NhanVien\nORDER BY MaPB ASC, MaCD ASC;`;
if (!displayed || runInNewContext(displayed[1]) !== query || query !== expected || steps.map(s=>`${s.clause}:${s.total}`).join(',') !== 'FROM:48,SELECT:48,DISTINCT:19,ORDER BY:19') throw new Error('SQL hoặc các bước đã đổi');
const [source,selected,distinct,ordered]=steps;
const pick=(step:FlowStep,names:string[])=>step.rows.map(row=>names.map(name=>row[step.columns.indexOf(name)]));
const src=pick(source,['MaNV','MaPB','MaCD']);
const pairs=pick(source,['MaPB','MaCD']);
const unique=pairs.filter((row,i)=>pairs.findIndex(r=>JSON.stringify(r)===JSON.stringify(row))===i);
const sorted=[unique[3],unique[2],unique[1],unique[0]];
if (JSON.stringify(pairs)!==JSON.stringify(selected.rows) || JSON.stringify(src.map(r=>r[0]))!==JSON.stringify(['NV001','NV002','NV003','NV004','NV013']) || JSON.stringify(unique)!==JSON.stringify([['KT','CV'],['KD','CVC'],['KD','CV'],['BGD','GD']]) || unique.some(row=>!distinct.rows.some(r=>JSON.stringify(r)===JSON.stringify(row))) || sorted.some((row,i)=>i>0 && sorted[i-1].join('|') >= row.join('|')) || sorted.slice(0,3).some(row=>!ordered.rows.some(r=>JSON.stringify(r)===JSON.stringify(row)))) throw new Error('Dữ liệu trích đã đổi, cần cập nhật kịch bản');
const folder='public/lesson-animations/2-6-distinct'; mkdirSync(folder,{recursive:true});
const scratch=mkdtempSync(join(tmpdir(),'lesson-distinct-'));
const fonts=['node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-latin-400-normal.woff','node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff','node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-vietnamese-400-normal.woff'];
const fontCss=fonts.map((path,i)=>`@font-face{font-family:${i<2?'UI':'Code'};src:url(data:font/woff;base64,${readFileSync(path).toString('base64')});${i%2?'unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;':''}}`).join('');
const esc=(v:unknown)=>String(v??'NULL').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const pulse=readFileSync('src/assets/animations/select-pulse.png').toString('base64');
const lines=query.split('\n');
const html=`<!doctype html><meta charset="utf-8"><style>${fontCss}${readFileSync('scripts/animations/select.css','utf8')}
.stages{grid-template-columns:repeat(4,1fr);gap:10px}.stages span{font:15px Code;padding:16px 9px;text-align:center}.query pre{font-size:16px;line-height:1.9}.explanation{left:600px;padding-left:20px}.explanation h2{font-size:20px;margin-bottom:12px}.explanation p{font-size:16px;line-height:1.6}.card{height:290px;padding:14px}.card h2{font-size:19px}.meta{font-size:14px;margin-bottom:8px}table,th{font-size:16px}th,td{height:29px;padding:3px 8px}th{height:32px}.highlight td{background:#463864}.merged td{background:#392345;color:#ffaee6}#travel,#column-travel{position:absolute;z-index:3;pointer-events:none;background:#342957;border:1px solid #b8a4ff;box-shadow:0 0 10px #b8a4ff55;font:16px UI}#travel{display:flex;height:29px;line-height:27px}#travel span{width:50%;padding-left:8px}#column-travel div{height:29px;padding:3px 8px}#column-travel div:first-child{height:32px;background:#463864}#travel[hidden],#column-travel[hidden]{display:none}#pulse{background-image:url(data:image/png;base64,${pulse})}.footer p{font-size:15px}
</style><div class="eyebrow">SQL SERVER / BÀI 2.6</div><div class="purpose">CẶP PHÒNG · CHỨC DANH</div><h1>DISTINCT: bỏ dòng trùng</h1><div class="logic">MINH HỌA XỬ LÝ LOGIC</div>
<div class="stages">${['FROM','SELECT','DISTINCT','ORDER BY'].map((s,i)=>`<span id="s${i}">0${i+1} ${s}</span>`).join('')}</div>
<div class="query"><pre><span id="q1">SELECT </span><span id="q2">DISTINCT</span><span id="q1b"> MaPB, MaCD</span>\n<span id="q0">${esc(lines[1])}</span>\n<span id="q3">${esc(lines[2])}</span></pre><div class="explanation"><h2 id="action"></h2><p id="explain"></p></div></div>
<div class="card source-card"><h2 id="left-title"></h2><div class="meta" id="left-meta"></div><table id="source"></table></div><div id="bridge">→<span id="pulse"></span></div><div class="card result-card"><h2 id="right-title"></h2><div class="meta" id="right-meta"></div><table id="destination"></table></div><div id="travel" hidden><span></span><span></span></div><div id="column-travel" hidden><div></div><div></div><div></div><div></div><div></div><div></div></div><div class="footer"><strong id="badge"></strong><p id="conclusion"></p></div><p class="excerpt" id="excerpt"></p>`;
// Story coordinates: FROM 0–19, SELECT 20–54, DISTINCT 55–119, ORDER 120–167.
const frames=168, scenes=new Map([[4,'poster'],[12,'from'],[50,'select'],[116,'distinct'],[165,'order']]);
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1080,height:824},deviceScaleFactor:1});
 await page.setContent(html); await page.evaluate(()=>document.fonts.ready);
 for(let frame=0;frame<frames;frame++){
  await page.evaluate(({frame,src,pairs,unique,sorted})=>{
   const get=(id:string)=>document.getElementById(id)!;
   const esc=(v:unknown)=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
   const table=(headers:string[],rows:unknown[][])=>`<thead><tr>${headers.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody>`;
   const stage=frame<20?0:frame<55?1:frame<120?2:3;
   for(let i=0;i<4;i++){get(`s${i}`).classList.toggle('active',i===stage);get(`q${i}`).classList.toggle('focus',i===stage)}get('q1b').classList.toggle('focus',stage===1);
   get('action').textContent=['Chọn bảng nguồn','Chọn hai cột','Gộp dòng trùng','Sắp hai mã'][stage];
   get('explain').innerHTML=['FROM chọn bảng NhanVien.<br>Chưa chọn cột, chưa lọc dòng.','SELECT lấy MaPB và MaCD<br>từ mỗi hồ sơ.','DISTINCT so cả hai mã.<br>Chỉ gộp khi cả cặp trùng.','MaPB tăng dần; trong cùng phòng,<br>MaCD tăng dần.'][stage];
   get('badge').textContent=['48 HỒ SƠ','48 DÒNG','48 → 19 DÒNG','19 CẶP'][stage];
   get('conclusion').textContent=['Nguồn có 48 hồ sơ, 12 cột.','NV003 và NV013 cùng cho cặp KD, CV.','KD, CV được giữ một lần; KD, CVC vẫn riêng.','Trong phòng KD, CV đứng trước CVC.'][stage];
   const source=get('source'),dest=get('destination'),travel=get('travel'),column=get('column-travel'); travel.hidden=true;column.hidden=true;get('pulse').style.visibility='hidden';
   get('excerpt').textContent='Bảng trích minh họa · Thứ tự trước ORDER BY không được bảo đảm.';
   if(stage<2){
    source.innerHTML=table(['MaNV','MaPB','MaCD'],src);dest.innerHTML=stage===0?'':table(['MaPB','MaCD'],pairs);
    get('left-title').textContent='Bảng nguồn / NhanVien';get('left-meta').textContent='Trích 5/48 hồ sơ · 3/12 cột';
    get('right-title').textContent=stage===0?'Chờ chọn cột':'Sau SELECT';get('right-meta').textContent=stage===0?'Chưa chọn cột':'Trích 5/48 dòng · đủ 2 cột';
    if(stage===1){
     const sourceRows=Array.from(source.querySelectorAll<HTMLTableRowElement>('tr')), destRows=Array.from(dest.querySelectorAll<HTMLTableRowElement>('tr'));
     const done=frame<38?0:frame<49?1:2;destRows.forEach(row=>Array.from(row.cells).forEach((cell,i)=>cell.style.visibility=i<done?'visible':'hidden'));
     const index=frame>=27&&frame<38?0:frame>=38&&frame<49?1:-1;
     if(index>=0){const a=sourceRows[0].cells[index+1].getBoundingClientRect(),b=destRows[0].cells[index].getBoundingClientRect(),t=((frame-(index===0?27:38))/11),p=t*t*(3-2*t);column.hidden=false;column.style.left=`${a.x+(b.x-a.x)*p}px`;column.style.top=`${a.y+(b.y-a.y)*p}px`;column.style.width=`${a.width+(b.width-a.width)*p}px`;Array.from(column.children).forEach((cell,i)=>cell.textContent=sourceRows[i].cells[index+1].textContent);get('pulse').style.visibility='visible';}
    }
   }else{
    const sorting=stage===3;const left=sorting?unique:pairs,right=sorting?sorted:unique;
    source.innerHTML=table(['MaPB','MaCD'],left);dest.innerHTML=table(['MaPB','MaCD'],right);
    get('left-title').textContent=sorting?'Trước ORDER BY':'Sau SELECT';get('left-meta').textContent=sorting?'Trích 4/19 cặp · thứ tự minh họa':'Trích 5/48 dòng · đủ 2 cột';
    get('right-title').textContent=sorting?'Sau ORDER BY':'Sau DISTINCT';get('right-meta').textContent=sorting?'Trích 4/19 cặp đã xếp':'Trích 4/19 cặp';
    const sr=Array.from(source.querySelectorAll<HTMLTableRowElement>('tbody tr')),dr=Array.from(dest.querySelectorAll<HTMLTableRowElement>('tbody tr'));
    if(!sorting){
      const n=Math.min(5,Math.max(0,Math.floor((frame-61)/9)));dr.forEach((row,i)=>row.style.visibility=i<Math.min(n,4)?'visible':'hidden');
      if(frame>=61&&frame<106){const i=Math.floor((frame-61)/9),t=((frame-61)%9)/9;sr[i].classList.add('highlight');move(sr[i],dr[i===4?2:i],t);if(i===4)dr[2].classList.add('merged');}
      if(frame>=106){sr[2].classList.add('highlight');sr[4].classList.add('highlight');dr[2].classList.add('merged');}
    }else{
      const n=Math.min(4,Math.max(0,Math.floor((frame-126)/8)));dr.forEach((row,i)=>row.style.visibility=i<n?'visible':'hidden');
      if(frame>=126&&frame<158){const i=Math.floor((frame-126)/8),t=((frame-126)%8)/8;move(sr[3-i],dr[i],t);}
      get('excerpt').textContent='Bốn cặp được trích để so thứ tự; không phải bốn dòng đầu của kết quả.';
    }
    function move(from:HTMLTableRowElement,to:HTMLTableRowElement,t:number){const a=from.getBoundingClientRect(),b=to.getBoundingClientRect(),p=t*t*(3-2*t);travel.hidden=false;travel.style.left=`${a.x+(b.x-a.x)*p}px`;travel.style.top=`${a.y+(b.y-a.y)*p}px`;travel.style.width=`${a.width+(b.width-a.width)*p}px`;Array.from(travel.children).forEach((cell,i)=>cell.textContent=from.cells[i].textContent);get('pulse').style.visibility='visible';get('pulse').style.backgroundPosition=`${-(frame%4)*32}px ${-Math.floor(frame%16/4)*14}px`;}
   }
  },{frame,src,pairs,unique,sorted});
  const png=await page.screenshot({path:join(scratch,`${frame}.png`)});const name=scenes.get(frame);if(name)writeFileSync(`${folder}/${name}.png`,png);
 }
}finally{await browser.close();}
const python=process.env.PYTHON||'python';
function run(args:string[]){const r=spawnSync(python,args,{stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)throw new Error(`Python failed: ${r.status}`);}
run(['-c',`from PIL import Image\nfrom pathlib import Path\np=Path(${JSON.stringify(scratch)})\nsheet=Image.new('RGB',(13776,12264),'#0c0b1d')\nfor i in range(${frames}):\n    with Image.open(p / f'{i}.png') as frame:\n        sheet.paste(frame,((i % 12)*1148+34,(i // 12)*876+26))\nsheet.save(p / 'sheet.png')`]);
run(['scripts/animations/sheet_to_gif.py',join(scratch,'sheet.png'),'--grid','12x14','--fps','7','--size','1080','--no-dither','--out',`${folder}/animation.gif`]);
const sources=['scripts/animations/select.css','scripts/animations/render-distinct.mts','scripts/animations/sheet_to_gif.py','src/assets/animations/select-pulse.png',...fonts];
const files=Object.fromEntries(['animation.gif',...Array.from(scenes.values(),s=>`${s}.png`)].map(file=>[file,createHash('sha256').update(readFileSync(`${folder}/${file}`)).digest('hex')]));
writeFileSync(`${folder}/manifest.json`,JSON.stringify({fingerprint:animationFingerprint(query,steps,sources),sources,width:1080,height:824,files,
 caption:'Minh họa xử lý logic: nguồn 48 hồ sơ; chọn hai cột, bỏ trùng còn 19 cặp. Các bảng chỉ trích dữ liệu; thứ tự trước ORDER BY là minh họa.',
 alt:'SELECT lấy mã phòng và mã chức danh của năm hồ sơ. DISTINCT gộp hai dòng KD, CV, vẫn giữ KD, CVC. ORDER BY xếp bốn cặp được trích theo hai mã.',
 scenes:[{step:0,file:'from.png',alt:'FROM chọn bảng NhanVien, trích năm trong 48 hồ sơ.'},{step:1,file:'select.png',alt:'SELECT chọn MaPB và MaCD; NV003 và NV013 cùng cho cặp KD, CV.'},{step:2,file:'distinct.png',alt:'DISTINCT gộp hai dòng KD, CV; KD, CVC còn riêng. Tổng 19 cặp.'},{step:3,file:'order.png',alt:'ORDER BY xếp bốn cặp được trích theo mã phòng rồi mã chức danh; không phải bốn dòng đầu kết quả.'}]
},null,2)+'\n');
console.log(`Rendered ${folder}; temporary frames: ${scratch}`);
