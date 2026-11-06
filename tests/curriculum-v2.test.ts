import { describe, expect, it, vi } from 'vitest';
import { emptyState, parseProgress, serializeProgress, STORAGE_KEY } from '../src/lib/progress';
import { loadProgress, saveProgress } from '../src/lib/progress-storage';
import { loadDraft, saveDraft } from '../src/lib/exercise-storage';
import { createExerciseClient } from '../src/lib/exercise-client';
import { handleGrade, handleRun, type Deps } from '../api/src/core';

const nums = ['3.1', '3.9', '3.10', '3.11', '3.12'];
const legacy = { version: 1, lessons: { '3.10': {status: 'done', flagged: true, seenAt: 10, doneAt: 20} }, lastLessonNum: '3.10', lastActiveAt: 30, exercises: {'3-10-1': {doneAt: 25}, '3-9-1': {doneAt: 15}} };
const mem = () => {const data = new Map<string,string>(); return {getItem: (k:string)=>data.get(k)??null, setItem: (k:string,v:string)=>void data.set(k,v), removeItem:(k:string)=>void data.delete(k)} as Storage;};

describe('compatibility with the original conditional-count lesson', () => {
  it('imports the old v1 lesson as seen in 3.1 and leaves the newer 3.10 alone on round trip', () => {
    const parsed = parseProgress(JSON.stringify(legacy), nums);
    expect(parsed.ok).toBe(true); if (!parsed.ok) return;
    expect(parsed.state).toEqual({ ...legacy, version: 5, lessons:{'3.1':{status:'seen', flagged:true, seenAt:10}}, lastLessonNum:'3.1', exercises:{'3-12-1':{doneAt:25},'3-9-1':{doneAt:15}} });
    const current = {...parsed.state, lessons:{...parsed.state.lessons, '3.10':{status:'seen' as const, flagged:false,seenAt:40}},lastLessonNum:'3.10'};
    expect(parseProgress(serializeProgress(current), nums)).toEqual({ok:true,state:current,ignored:0});
  });
  it('loads legacy storage without changing it; v5 wins even if an old tab later writes v1', () => {
    const st=mem(), old=JSON.stringify(legacy); st.setItem('sqlserver-course:progress:v1',old);
    const migrated=loadProgress(st,nums); expect(migrated.state.lastLessonNum).toBe('3.1');
    expect(STORAGE_KEY).toBe('sqlserver-course:progress:v5');
    expect(saveProgress(st,migrated.state)).toBe(true);
    st.setItem('sqlserver-course:progress:v1',JSON.stringify({...legacy,lastLessonNum:'3.9'}));
    expect(loadProgress(st,nums).state).toEqual(migrated.state);
    expect(loadProgress(st,nums).state.version).toBe(5);
    expect(st.getItem('sqlserver-course:progress:v1')).not.toBeNull();
  });
  it('keeps legacy progress when saving is blocked', () => {
    const old=JSON.stringify(legacy); const st={getItem:(k:string)=>k.endsWith(':v1')?old:null,setItem:()=>{throw Error('full');}};
    const result=loadProgress(st,nums); expect(result.state.lastLessonNum).toBe('3.1');
    expect(saveProgress(st,result.state)).toBe(false); expect(st.getItem('sqlserver-course:progress:v1')).toBe(old);
    expect(emptyState().version).toBe(5);
  });
  it('backs up corrupt v5 without silently restoring a stale v1 copy', () => {
    const st=mem(); st.setItem('sqlserver-course:progress:v1',JSON.stringify(legacy));
    st.setItem(STORAGE_KEY,'{broken v5');
    expect(loadProgress(st,nums)).toEqual({state:emptyState(),problem:'corrupt'});
    expect(st.getItem('sqlserver-course:progress:corrupt-backup')).toBe('{broken v5');
    expect(st.getItem('sqlserver-course:progress:v1')).toBe(JSON.stringify(legacy));
  });
  it('moves legacy count drafts only to 3.12; new lessons never inherit them and v2 drafts win', () => {
    const st=mem(); st.setItem('sqlserver-course:draft:3-10-1','old count'); st.setItem('sqlserver-course:draft:3-9-1','old where');
    expect(loadDraft('3-10-1',st)).toBeNull(); expect(loadDraft('3-11-1',st)).toBeNull();
    expect(loadDraft('3-12-1',st)).toBe('old count'); expect(loadDraft('3-9-1',st)).toBe('old where');
    saveDraft('3-12-1','new count',st); saveDraft('3-10-1','new scalar',st);
    expect(loadDraft('3-12-1',st)).toBe('new count'); expect(loadDraft('3-10-1',st)).toBe('new scalar');
    expect(loadDraft('3-1-4',st)).toBeNull();
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

it('moves v2 progress by lesson identity and clears removed lessons before reusing their numbers', () => {
  const st = mem();
  const done = { status: 'done', flagged: true, seenAt: 10, doneAt: 20 };
  const seen = { status: 'seen', flagged: false, seenAt: 21 };
  const old = {
    version: 2,
    lessons: { '4.1': done, '4.9': done, '4.10': done, '5.1': seen, '6.5': seen },
    lastLessonNum: '6.5',
    lastActiveAt: 30,
    exercises: { '6-5-1': { doneAt: 25 } },
  };
  const known = ['3.12', '4.1', '4.9', '4.10', '5.6'];
  st.setItem('sqlserver-course:progress:v2', JSON.stringify(old));
  st.setItem('sqlserver-course:progress:v1', JSON.stringify(legacy));
  const migrated = loadProgress(st, known).state;
  expect(migrated).toEqual({
    ...old, version: 5, lessons: { '3.12': done, '4.1': seen, '5.6': seen }, lastLessonNum: '5.6',
  });
  expect(parseProgress(JSON.stringify({ ...old, lastLessonNum: '4.10' }), known)).toMatchObject({
    ok: true, ignored: 2, state: { lastLessonNum: null },
  });
  expect(parseProgress(serializeProgress(migrated), known)).toEqual({ ok: true, ignored: 0, state: migrated });
});

it('keeps completed 3.1 and moves CTE separately when importing v3', () => {
  const st = mem();
  const completed = { status: 'done', flagged: false, seenAt: 10, doneAt: 20 };
  const retired = { status: 'done', flagged: true, seenAt: 30, doneAt: 40 };
  const cte = { status: 'seen', flagged: false, seenAt: 50 };
  const old = {
    version: 3,
    lessons: { '3.1': completed, '3.12': retired, '3.13': cte },
    lastLessonNum: '3.13',
    lastActiveAt: 60,
    exercises: { '3-12-1': { doneAt: 40 }, '4-1-1': { doneAt: 55 } },
  };
  st.setItem('sqlserver-course:progress:v3', JSON.stringify(old));
  const migrated = loadProgress(st, nums).state;
  expect(migrated).toEqual({
    ...old, version: 5, lessons: { '3.1': { ...completed, flagged: true }, '3.12': cte }, lastLessonNum: '3.12',
  });
  expect(parseProgress(serializeProgress(migrated), nums)).toEqual({ ok: true, state: migrated, ignored: 0 });
  expect(st.getItem('sqlserver-course:progress:v3')).toBe(JSON.stringify(old));
});

it.each([
  [1, '4.3', '4.4', '4.6', '4.7', null],
  [2, '4.3', '4.4', '4.6', '4.7', null],
  [3, '3.15', '3.16', '3.17', '3.18', '3.19'],
  [4, '3.14', '3.15', '3.16', '3.17', '3.18'],
] as const)('v%s follows lesson identities through the window-function expansion', (version, frames, pivot, quality, removed, outline) => {
  const done = { status: 'done', flagged: false, seenAt: 10, doneAt: 20 };
  const seen = { status: 'seen', flagged: false, seenAt: 30 };
  const old = {
    version,
    lessons: { [frames]: done, [pivot]: seen, [quality]: done, [removed]: done, ...(outline ? { [outline]: { ...seen, flagged: true } } : {}) },
    lastLessonNum: removed,
    exercises: { '4-6-1': { doneAt: 25 } },
  };
  const known = ['3.14', '3.15', '3.16', '3.17', '3.18', '3.19'];
  const result = parseProgress(JSON.stringify(old), known, true);
  expect(result).toMatchObject({
    ok: true, ignored: 1, state: { version: 5, lastLessonNum: null, exercises: old.exercises },
  });
  if (!result.ok) throw Error(result.error);
  expect(result.state.lessons).toEqual({ '3.16': done, '3.18': seen, '3.19': { ...done, flagged: Boolean(outline) } });
  expect(parseProgress(serializeProgress(result.state), known)).toEqual({ ok: true, state: result.state, ignored: 0 });
});

it('loads outline-only v4 progress as seen in 3.19 and preserves the old snapshot', () => {
  const storage = mem();
  const saved = JSON.stringify({
    version: 4, lastLessonNum: '3.18',
    lessons: { '3.18': { status: 'done', flagged: true, seenAt: 10, doneAt: 20 } },
  });
  storage.setItem('sqlserver-course:progress:v4', saved);
  const { state } = loadProgress(storage, ['3.18', '3.19']);
  expect(state).toMatchObject({
    version: 5, lastLessonNum: '3.19', lessons: { '3.19': { status: 'seen', flagged: true, seenAt: 10 } },
  });
  expect(state.lessons['3.18']).toBeUndefined();
  expect(state.lessons['3.19'].doneAt).toBeUndefined();
  expect(saveProgress(storage, state)).toBe(true);
  expect(storage.getItem('sqlserver-course:progress:v4')).toBe(saved);
});
