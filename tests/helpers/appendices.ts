import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {parse} from 'yaml';
import {appendixSchema,sortAppendices} from '../../src/lib/appendices';

const dir='src/content/appendices';
export function readAppendixFiles(){
 return (existsSync(dir)?readdirSync(dir):[]).filter(f=>f.endsWith('.mdx')).map(name=>{
  const raw=readFileSync(join(dir,name),'utf8');
  const m=raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if(!m)throw new Error(`${name}: missing frontmatter`);
  return {name,slug:name.replace(/\.mdx$/,''),data:appendixSchema.parse(parse(m[1])),body:m[2]};
 });
}
export function readAppendices(){
 return sortAppendices(readAppendixFiles().map(f=>({slug:f.slug,...f.data})));
}
