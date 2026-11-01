import {describe,it,expect} from 'vitest';
import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {parse} from 'yaml';
import {BANNED_PHRASES} from '../src/lib/lesson-schema';
import {findUnprefixedUnicodeStrings} from '../src/lib/tsql-lexer';
import {proseParagraphs} from './helpers/lessons';

const dir='src/content/appendices';
function files(){
 return (existsSync(dir)?readdirSync(dir):[]).filter(f=>f.endsWith('.mdx')).map(name=>{
  const raw=readFileSync(join(dir,name),'utf8');
  const m=raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if(!m)throw new Error(`${name}: missing frontmatter`);
  return {name,data:parse(m[1]),body:m[2]};
 });
}
const sqlBlocks=(body:string)=>[...body.matchAll(/<Sql\b([^>]*?)code=\{("(?:[^"\\]|\\.)*")\}([^>]*?)\/>/g)]
 .map(m=>({code:JSON.parse(m[2]) as string,attrs:m[1]+m[3]}));

describe('appendix teaching contract',()=>{
 it('ships six standalone reference articles with the fixed first two topics',()=>{
  const nums=files().map(f=>f.data.num).sort();
  expect(nums).toEqual(['PL.1','PL.2','PL.3','PL.4','PL.5','PL.6']);
  expect(files().find(f=>f.data.num==='PL.1')?.name).toBe('pl-1-chi-tiet-kieu-du-lieu.mdx');
  expect(files().find(f=>f.data.num==='PL.2')?.name).toBe('pl-2-chuyen-doi-kieu-du-lieu.mdx');
 });
 it('keeps lookup and explanations visible before three optional self-checks',()=>{
  for(const f of files()){
   const check=f.body.indexOf('## Tự kiểm tra');
   expect(check,f.name).toBeGreaterThan(f.body.indexOf('## Tra nhanh'));
   expect(f.body.slice(0,check),f.name).not.toContain('<details');
   expect(f.body.slice(check).match(/<details>/g),f.name).toHaveLength(3);
   expect(f.body.match(/<summary>[\s\S]*?<\/summary>/g),f.name).toHaveLength(3);
   expect(f.body,f.name).not.toMatch(/<Exercises\b|<LessonStatus\b|<RunFlow\b/);
   expect(f.body,f.name).toContain('learn.microsoft.com/');
   expect(f.body,f.name).toMatch(/\]\(#[^)]+\)/);
  }
 });
 it('preserves short paragraphs, terminology and Unicode SQL',()=>{
  for(const f of files()){
   expect(proseParagraphs(f.body).filter(p=>p.words>120).map(p=>p.words),f.name).toEqual([]);
   for(const phrase of BANNED_PHRASES)expect(f.body.toLowerCase(),f.name).not.toContain(phrase);
   const blocks=sqlBlocks(f.body);
   expect(blocks.length,f.name).toBeGreaterThan(0);
   expect(blocks.length,f.name).toBe((f.body.match(/<Sql\b/g)??[]).length);
   for(const b of blocks){
    expect(findUnprefixedUnicodeStrings(b.code),`${f.name}: ${b.code}`).toEqual([]);
    if(!b.attrs.includes('copy={false}')){
     expect(b.code.trim(),f.name).toMatch(/^SELECT\b/i);
     expect(b.code,f.name).not.toMatch(/\b(INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|EXEC|SET|INTO)\b/i);
    }
   }
  }
 });
 it('shows the SQL needed for prediction and repair before revealing answers',()=>{
  const visiblePrompt=(num:string)=>{
   const body=files().find(f=>f.data.num===num)!.body.split('## Tự kiểm tra')[1];
   return body.replace(/<details>\s*(<summary>[\s\S]*?<\/summary>)[\s\S]*?<\/details>/g,'$1');
  };
  // These questions need the target type/expression, not just a source number or “the query below”.
  expect(sqlBlocks(visiblePrompt('PL.1')).some(b=>/CAST\(12\.345 AS decimal\(5,2\)\)/.test(b.code))).toBe(true);
  const conversion=sqlBlocks(visiblePrompt('PL.2'));
  expect(conversion.some(b=>b.code.includes("TRY_CAST(N'123.456'"))).toBe(true);
  expect(conversion.some(b=>b.code.includes("N'NV' + 1"))).toBe(true);
 });
 it('catalogs every built-in data type rather than only common column types',()=>{
  const body=files().find(f=>f.data.num==='PL.1')?.body??'';
  for(const type of ['bigint','int','smallint','tinyint','bit','decimal','numeric','money','smallmoney','float','real','date','time','datetime2','datetimeoffset','datetime','smalldatetime','char','varchar','text','nchar','nvarchar','ntext','binary','varbinary','image','cursor','geography','geometry','hierarchyid','json','vector','rowversion','sql_variant','table','uniqueidentifier','xml','sysname','timestamp']){
   expect(body,type).toMatch(new RegExp('`'+type+'(?:`|\\(|\\b)','i'));
  }
  expect(body).toMatch(/byte/i);
  expect(body).toMatch(/precision|độ chính xác/i);
  expect(body).toMatch(/scale|số chữ số.*(?:lẻ|thập phân)/i);
  expect(body).toMatch(/preview/i);
 });
 it('covers all six conversion functions and the limits of TRY',()=>{
  const body=files().find(f=>f.data.num==='PL.2')?.body??'';
  for(const fn of ['CAST','CONVERT','TRY_CAST','TRY_CONVERT','PARSE','TRY_PARSE'])expect(body,fn).toContain(fn);
  expect(body).toMatch(/ưu tiên/);
  expect(body).toMatch(/ngầm/);
  expect(body).toMatch(/culture/);
  expect(body).toMatch(/style/);
  expect(body).toMatch(/TRY[\s\S]*(?:vẫn|không)[\s\S]*(?:lỗi|cắt|tràn)/);
 });
 it('includes practical modern function families, not just a name list',()=>{
  const required:{[key:string]:string[]}={
   'PL.3':['LEN','DATALENGTH','TRIM','SUBSTRING','CHARINDEX','REPLACE','CONCAT','STRING_SPLIT','STRING_AGG'],
   'PL.4':['ROUND','CEILING','FLOOR','ABS','NULLIF'],
   'PL.5':['DATEFROMPARTS','DATEADD','DATEDIFF','EOMONTH','DATETRUNC','DATE_BUCKET','SYSUTCDATETIME','AT TIME ZONE'],
   'PL.6':['UNKNOWN','IS NULL','ISNULL','COALESCE','NULLIF','CASE','IIF','CHOOSE'],
  };
  for(const [num,names]of Object.entries(required)){
   const body=files().find(f=>f.data.num===num)?.body??'';
   for(const name of names)expect(body,`${num}: ${name}`).toContain(name);
   expect(sqlBlocks(body).length,num).toBeGreaterThanOrEqual(3);
   expect(body,num).toMatch(/kiểu trả về|trả về.*(?:int|kiểu|nvarchar|varchar|decimal|datetime)/i);
  }
 });
});
