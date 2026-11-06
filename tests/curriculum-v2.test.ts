import { describe, expect, it, vi } from 'vitest';
import { emptyState, parseProgress, serializeProgress, STORAGE_KEY } from '../src/lib/progress';
import { loadProgress, saveProgress } from '../src/lib/progress-storage';
import { loadDraft, saveDraft } from '../src/lib/exercise-storage';
import { createExerciseClient } from '../src/lib/exercise-client';
import { handleGrade, handleRun, type Deps } from '../api/src/core';

const nums = ['3.9', '3.10', '3.11', '3.12'];
const legacy = { version: 1, lessons: { '3.10': {status: 'done', flagged: true, seenAt: 10, doneAt: 20} }, lastLessonNum: '3.10', lastActiveAt: 30, exercises: {'3-10-1': {doneAt: 25}, '3-9-1': {doneAt: 15}} };
const mem = () => {const data = new Map<string,string>(); return {getItem: (k:string)=>data.get(k)??null, setItem: (k:string,v:string)=>void data.set(k,v), removeItem:(k:string)=>void data.delete(k)} as Storage;};

describe('curriculum v2 preserves the identity of the conditional-count lesson', () => {
  it('imports v1 into 3.12, including last visit, flags and solved exercises; round trips v2 without moving new 3.10', () => {
    const parsed = parseProgress(JSON.stringify(legacy), nums);
    expect(parsed.ok).toBe(true); if (!parsed.ok) return;
    expect(parsed.state).toEqual({ ...legacy, version:2, lessons:{'3.12':legacy.lessons['3.10']}, lastLessonNum:'3.12', exercises:{'3-12-1':{doneAt:25},'3-9-1':{doneAt:15}} });
    const current = {...parsed.state, lessons:{...parsed.state.lessons, '3.10':{status:'seen' as const, flagged:false,seenAt:40}},lastLessonNum:'3.10'};
    expect(parseProgress(serializeProgress(current), nums)).toEqual({ok:true,state:current,ignored:0});
  });
  it('loads legacy storage without changing it; v2 wins even if an old tab later writes v1', () => {
    const st=mem(), old=JSON.stringify(legacy); st.setItem('sqlserver-course:progress:v1',old);
    const migrated=loadProgress(st,nums); expect(migrated.state.lastLessonNum).toBe('3.12');
    expect(STORAGE_KEY).toBe('sqlserver-course:progress:v2');
    expect(saveProgress(st,migrated.state)).toBe(true);
    st.setItem('sqlserver-course:progress:v1',JSON.stringify({...legacy,lastLessonNum:'3.9'}));
    expect(loadProgress(st,nums).state).toEqual(migrated.state);
    expect(loadProgress(st,nums).state.version).toBe(2);
    expect(st.getItem('sqlserver-course:progress:v1')).not.toBeNull();
  });
  it('keeps legacy progress when saving is blocked', () => {
    const old=JSON.stringify(legacy); const st={getItem:(k:string)=>k.endsWith(':v1')?old:null,setItem:()=>{throw Error('full');}};
    const result=loadProgress(st,nums); expect(result.state.lastLessonNum).toBe('3.12');
    expect(saveProgress(st,result.state)).toBe(false); expect(st.getItem('sqlserver-course:progress:v1')).toBe(old);
    expect(emptyState().version).toBe(2);
  });
  it('backs up corrupt v2 without silently restoring a stale v1 copy', () => {
    const st=mem(); st.setItem('sqlserver-course:progress:v1',JSON.stringify(legacy));
    st.setItem(STORAGE_KEY,'{broken v2');
    expect(loadProgress(st,nums)).toEqual({state:emptyState(),problem:'corrupt'});
    expect(st.getItem('sqlserver-course:progress:corrupt-backup')).toBe('{broken v2');
    expect(st.getItem('sqlserver-course:progress:v1')).toBe(JSON.stringify(legacy));
  });
  it('moves legacy count drafts only to 3.12; new lessons never inherit them and v2 drafts win', () => {
    const st=mem(); st.setItem('sqlserver-course:draft:3-10-1','old count'); st.setItem('sqlserver-course:draft:3-9-1','old where');
    expect(loadDraft('3-10-1',st)).toBeNull(); expect(loadDraft('3-11-1',st)).toBeNull();
    expect(loadDraft('3-12-1',st)).toBe('old count'); expect(loadDraft('3-9-1',st)).toBe('old where');
    saveDraft('3-12-1','new count',st); saveDraft('3-10-1','new scalar',st);
    expect(loadDraft('3-12-1',st)).toBe('new count'); expect(loadDraft('3-10-1',st)).toBe('new scalar');
    expect(st.getItem('sqlserver-course:draft:3-10-1')).toBe('old count');
    saveDraft('3-12-1','',st); expect(loadDraft('3-12-1',st)).toBe('');
  });
  it('namespaces both run and grade requests so an old API cannot grade a reused ID', async () => {
    const fetcher=vi.fn(async()=>new Response(JSON.stringify({ok:false,kind:'unknown-exercise'})));
    const client=createExerciseClient('https://test/api',fetcher);
    await client.run('3-10-1','SELECT 1','code'); await client.grade('3-12-1','SELECT 1','code');
    expect(fetcher.mock.calls.map(c=>JSON.parse(String((c as unknown as [unknown,RequestInit])[1].body)).exercise)).toEqual(['course-v2:3-10-1','course-v2:3-12-1']);
  });
  it('resolves cached v1 requests to COUNT and v2 requests to the new SELECT, without changing auth or guard', async () => {
    const base={title:'t',summary:'s',prompt:'p',columns:['n'],ordered:false,kind:'query' as const};
    const calls:string[]=[];
    const deps:Deps={codes:['code'],allow:()=>true,exercises:{'3-10-1':{...base,id:'3-10-1',answer:'SELECT 10'},'3-12-1':{...base,id:'3-12-1',answer:'SELECT 12'}},run:async(sql)=>{calls.push(sql);return {shape:{columns:[{name:'n',type:'int'}],rows:[[1]]},affected:[1],check:null,error:null,errorKind:null,ms:1};}};
    await handleGrade({exercise:'3-10-1',sql:'SELECT 1'},'code',deps); expect(calls.at(-1)).toBe('SELECT 12');
    await handleGrade({exercise:'course-v2:3-10-1',sql:'SELECT 1'},'code',deps); expect(calls.at(-1)).toBe('SELECT 10');
    for(const id of ['course-v3:3-10-1','3-11-1','3-12-1']) expect((await handleRun({exercise:id,sql:'SELECT 1'},'code',deps)).status).toBe(404);
    expect((await handleRun({exercise:'course-v2:3-10-1',sql:'SELECT 1'},'wrong',deps)).status).toBe(401);
    expect((await handleRun({exercise:'course-v2:3-10-1',sql:'DROP TABLE X'},'code',deps)).status).toBe(422);
  });
});
