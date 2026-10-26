import type { SeedRow } from './hrm-seed';
import { fixtureQuery } from './window-fixture';

// Arithmetic model of ONLY the single-CTE SUM/COUNT PIVOT forms in lesson 4.4.
// Converts the pivot to conditional aggregation for SQLite; NOT SQL Server
// execution, a T-SQL syntax/typing/collation validator, or a general transpiler.
export function pivotFixtureQuery(sql: string, overrides: Partial<Record<'NhanVien' | 'DonNghiPhep' | 'HopDong', SeedRow[]>> = {}) {
  const m=sql.match(/\bFROM\s+(\w+)\s+PIVOT\s*\(\s*(SUM|COUNT)\s*\((\w+)\)\s+FOR\s+(\w+)\s+IN\s*\(((?:\s*\[[^\]]+\]\s*,?)+)\)\s*\)\s+AS\s+(\w+)/i);
  const boundary=sql.lastIndexOf('\nSELECT ');
  if(!m||boundary<0||!/^WITH\s+\w+\s+AS\s*\(/i.test(sql))throw new Error('Outside the supported lesson PIVOT fixture subset');
  const [,source,aggregate,value,axis,list,alias]=m;
  const keys=[...list.matchAll(/\[([^\]]+)\]/g)].map(x=>x[1]);
  if(list.replace(/\[[^\]]+\]|[\s,]/g,'')||new Set(keys).size!==keys.length)throw new Error('Invalid fixture pivot list');
  const prefix=sql.slice(0,boundary+1);
  const input=fixtureQuery(prefix+`SELECT * FROM ${source};`,overrides);
  if(!input.columns.includes(value)||!input.columns.includes(axis))throw new Error('Pivot input columns are absent');
  const groups=input.columns.filter(c=>c!==value&&c!==axis);
  if(!groups.length)throw new Error('This fixture expects a grouping column');
  const measures=keys.map(k=>{
    const literal=/^\d+$/.test(k)?k:"'"+k.replaceAll("'","''")+"'";
    return `${aggregate}(CASE WHEN [${axis}] = ${literal} THEN [${value}] END) AS [${k}]`;
  });
  const groupList=groups.map(g=>`[${g}]`).join(', ');
  const modeled=sql.replace(m[0],`FROM (SELECT ${groupList}, ${measures.join(', ')} FROM ${source} GROUP BY ${groupList}) AS ${alias}`);
  return {...fixtureQuery(modeled,overrides),sourceColumns:input.columns};
}
