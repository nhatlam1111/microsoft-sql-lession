import { it, expect } from 'vitest';
import { loadProgress, saveProgress, BACKUP_KEY } from '../src/lib/progress-storage';
import { STORAGE_KEY, emptyState, serializeProgress, demoState } from '../src/lib/progress';
import { ALL_NUMS } from './helpers/expected';

const mem = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }; };

it('starts empty without a problem when nothing is stored', () => {
  expect(loadProgress(mem(), ALL_NUMS)).toEqual({ state: emptyState(), problem: null });
});
it('loads what was saved', () => {
  const st = mem(); const s = demoState(1_000_000_000);
  expect(saveProgress(st, s)).toBe(true);
  expect(loadProgress(st, ALL_NUMS)).toEqual({ state: s, problem: null });
});
it('keeps a copy of corrupt data instead of silently losing it', () => {
  const st = mem(); st.setItem(STORAGE_KEY, '{not json');
  expect(loadProgress(st, ALL_NUMS)).toEqual({ state: emptyState(), problem: 'corrupt' });
  expect(st.getItem(BACKUP_KEY)).toBe('{not json');
});
it('leaves corrupt data where it is when its copy cannot be written', () => {
  const m = new Map([[STORAGE_KEY, '{not json']]);
  const st = { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => { if (k === BACKUP_KEY) throw new Error('full'); m.set(k, v); } };
  expect(loadProgress(st, ALL_NUMS)).toEqual({ state: emptyState(), problem: 'unavailable' });
});
it('keeps lessons it does not know when loading, so the next save does not erase them', () => {
  const st = mem();
  st.setItem(STORAGE_KEY, serializeProgress({ ...emptyState(), lessons: { '1.1': { status: 'done', flagged: false, seenAt: 1, doneAt: 1 }, '9.9': { status: 'seen', flagged: true, seenAt: 2 } } }));
  expect(Object.keys(loadProgress(st, ALL_NUMS).state.lessons)).toEqual(['1.1', '9.9']);
});
it('reports blocked or missing storage', () => {
  const blocked = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); } };
  expect(loadProgress(blocked, ALL_NUMS).problem).toBe('unavailable');
  expect(loadProgress(null, ALL_NUMS).problem).toBe('unavailable');
  expect(saveProgress(blocked, emptyState())).toBe(false);
  expect(saveProgress(null, emptyState())).toBe(false);
});
it('round-trips through serializeProgress', () => {
  const st = mem(); st.setItem(STORAGE_KEY, serializeProgress(demoState(5)));
  expect(loadProgress(st, ALL_NUMS).state).toEqual(demoState(5));
});
