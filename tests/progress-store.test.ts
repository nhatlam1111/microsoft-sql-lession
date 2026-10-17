import { it, expect, beforeEach, vi } from 'vitest';
import * as S from '../src/lib/progress-store';
import { STORAGE_KEY, emptyState, serializeProgress, markSeen, statusOf } from '../src/lib/progress';
import { ALL_NUMS } from './helpers/expected';

const mem = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }; };
let st: ReturnType<typeof mem>;
beforeEach(() => { S.__resetStoreForTests(); st = mem(); vi.useFakeTimers(); vi.setSystemTime(10_000); });

it('captures the previous visit time before touching it', () => {
  st.setItem(STORAGE_KEY, serializeProgress({ ...emptyState(), lastActiveAt: 1000 }));
  S.initProgressStore(ALL_NUMS, st, 5000);
  expect([S.getSnapshot().previousActiveAt, S.getSnapshot().state.lastActiveAt]).toEqual([1000, 5000]);
  expect(JSON.parse(st.getItem(STORAGE_KEY)!).lastActiveAt).toBe(5000);
});
it('initialises only once per page', () => {
  S.initProgressStore(ALL_NUMS, st, 5000); S.initProgressStore(ALL_NUMS, st, 9000);
  expect(S.getSnapshot().state.lastActiveAt).toBe(5000);
});
it('persists actions and notifies subscribers with a new snapshot', () => {
  S.initProgressStore(ALL_NUMS, st, 5000);
  const before = S.getSnapshot(); const listener = vi.fn(); S.subscribe(listener);
  S.actions.markSeen('1.1');
  expect(listener).toHaveBeenCalled();
  expect(S.getSnapshot()).not.toBe(before);
  expect(JSON.parse(st.getItem(STORAGE_KEY)!).lessons['1.1'].status).toBe('seen');
});
it('takes the state another tab wrote instead of overwriting it', () => {
  S.initProgressStore(ALL_NUMS, st, 5000);
  S.actions.markSeen('1.1');
  S.handleExternalChange(serializeProgress(markSeen(emptyState(), '2.2', 7000)));
  expect([statusOf(S.getSnapshot().state, '2.2'), statusOf(S.getSnapshot().state, '1.1')]).toEqual(['seen', 'todo']);
});
it('loadDemo shows the demo as a return after 14 days', () => {
  S.initProgressStore(ALL_NUMS, st, 5000);
  S.actions.loadDemo();
  expect(S.getSnapshot().previousActiveAt).toBe(10_000 - 14 * 86_400_000);
});
it('a failed import leaves the state alone', () => {
  S.initProgressStore(ALL_NUMS, st, 5000); S.actions.markSeen('1.1');
  expect(S.actions.importText('abc').ok).toBe(false);
  expect(statusOf(S.getSnapshot().state, '1.1')).toBe('seen');
});
it('reset empties progress; the server snapshot is empty and stable', () => {
  S.initProgressStore(ALL_NUMS, st, 5000); S.actions.markSeen('1.1'); S.actions.reset();
  expect(S.getSnapshot().state.lessons).toEqual({});
  expect(S.getServerSnapshot()).toBe(S.getServerSnapshot());
  expect(S.getServerSnapshot().state).toEqual(emptyState());
});
it('remembers the last lesson as it was when the page opened', () => {
  st.setItem(STORAGE_KEY, serializeProgress({ ...markSeen(emptyState(), '3.5', 1000), lastActiveAt: 1000 }));
  S.initProgressStore(ALL_NUMS, st, 5000);
  S.actions.markSeen('4.2');
  expect([S.getSnapshot().previousLastLessonNum, S.getSnapshot().state.lastLessonNum]).toEqual(['3.5', '4.2']);
});
it('re-reads storage when a page comes back from the back/forward cache', () => {
  S.initProgressStore(ALL_NUMS, st, 5000);
  st.setItem(STORAGE_KEY, serializeProgress(markSeen(emptyState(), '2.2', 7000)));
  S.refreshFromStorage();
  S.actions.markSeen('1.1');
  expect([statusOf(S.getSnapshot().state, '2.2'), statusOf(S.getSnapshot().state, '1.1')]).toEqual(['seen', 'seen']);
});
it('flags storage as unavailable when the first save fails', () => {
  const readOnly = { getItem: () => null, setItem: () => { throw new Error('quota'); } };
  S.initProgressStore(ALL_NUMS, readOnly, 5000);
  expect(S.getSnapshot().problem).toBe('unavailable');
});
