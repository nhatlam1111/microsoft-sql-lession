import { it, expect } from 'vitest';
import * as P from '../src/lib/progress';
import { ALL_NUMS } from './helpers/expected';

const NOW = new Date(2026, 9, 17, 9, 0).getTime();

it('markSeen turns a todo lesson into seen and remembers it as the last lesson', () => {
  const s = P.markSeen(P.emptyState(), '3.5', NOW);
  expect([P.statusOf(P.emptyState(), '3.5'), P.statusOf(s, '3.5'), s.lastLessonNum]).toEqual(['todo', 'seen', '3.5']);
});
it('markSeen never downgrades a done lesson', () => {
  const s = P.markSeen(P.toggleDone(P.markSeen(P.emptyState(), '1.1', NOW), '1.1', NOW), '1.1', NOW + 1);
  expect(P.statusOf(s, '1.1')).toBe('done');
});
it('toggleDone switches seen and done, and only done is counted', () => {
  let s = P.markSeen(P.markSeen(P.emptyState(), '3.5', NOW), '3.6', NOW);
  s = P.toggleDone(s, '3.5', NOW);
  expect(P.countDone(s, ALL_NUMS)).toBe(1);
  expect(P.statusOf(P.toggleDone(s, '3.5', NOW), '3.5')).toBe('seen');
});
it('the flag is independent of the status and wins the icon', () => {
  const s = P.toggleFlag(P.toggleDone(P.markSeen(P.emptyState(), '2.8', NOW), '2.8', NOW), '2.8', NOW);
  expect([P.statusOf(s, '2.8'), P.isFlagged(s, '2.8'), P.iconOf(s, '2.8'), P.countDone(s, ALL_NUMS)]).toEqual(['done', true, 'flag', 1]);
  expect(P.statusOf(P.toggleFlag(P.emptyState(), '4.1', NOW), '4.1')).toBe('seen');
});
it('does not mutate its input', () => {
  const s = P.emptyState();
  P.markSeen(s, '1.1', NOW);
  expect(s).toEqual(P.emptyState());
});
it('serialize then parse gives the same state', () => {
  const s = P.demoState(NOW);
  expect(P.parseProgress(P.serializeProgress(s), ALL_NUMS)).toEqual({ ok: true, state: s, ignored: 0 });
});
it('rejects text that is not JSON', () => {
  expect(P.parseProgress('abc', ALL_NUMS)).toEqual({ ok: false, error: 'File không phải JSON hợp lệ.' });
});
it('rejects JSON of the wrong shape', () => {
  for (const t of ['{}', '[]', '{"version":2,"lessons":{}}', '{"version":1,"lessons":{"1.1":{"status":"great","flagged":false,"seenAt":1}}}']) {
    expect(P.parseProgress(t, ALL_NUMS)).toEqual({ ok: false, error: 'File không đúng định dạng tiến độ của khóa học.' });
  }
});
it('ignores lessons that are no longer in the course and counts them', () => {
  const text = JSON.stringify({ version: 1, lastLessonNum: '9.9', lastActiveAt: 5,
    lessons: { '1.1': { status: 'done', flagged: false, seenAt: 1 }, '9.9': { status: 'seen', flagged: false, seenAt: 2 } } });
  const r = P.parseProgress(text, ALL_NUMS);
  expect(r.ok && [Object.keys(r.state.lessons), r.state.lastLessonNum, r.ignored]).toEqual([['1.1'], null, 1]);
});
it('the demo state matches the mockup', () => {
  const s = P.demoState(NOW);
  expect(P.countDone(s, ALL_NUMS)).toBe(17);
  expect([P.iconOf(s, '2.8'), P.statusOf(s, '3.5'), P.statusOf(s, '3.7'), s.lastLessonNum]).toEqual(['flag', 'seen', 'seen', '3.5']);
  expect(s.lastActiveAt).toBe(NOW - 14 * 86_400_000);
});
it('names the export file by local date', () => {
  expect(P.exportFileName(NOW)).toBe('tien-do-sql-server-2026-10-17.json');
});

it('remembers solved exercises and still imports files without them', () => {
  const s = P.markExerciseDone(P.emptyState(), '3-5-1', 1000);
  expect(P.isExerciseDone(s, '3-5-1')).toBe(true);
  expect(P.isExerciseDone(s, '3-5-2')).toBe(false);
  const back = P.parseProgress(P.serializeProgress(s), ALL_NUMS);
  expect(back.ok && P.isExerciseDone(back.state, '3-5-1')).toBe(true);
  expect(P.parseProgress(P.serializeProgress(P.emptyState()), ALL_NUMS).ok).toBe(true);
  expect(P.parseProgress(JSON.stringify({ ...P.emptyState(), exercises: 5 }), ALL_NUMS)).toEqual({ ok: false, error: P.IMPORT_ERRORS.badShape });
});
