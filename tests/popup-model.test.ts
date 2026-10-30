import { it, expect } from 'vitest';
import { popupModel } from '../src/lib/popup-model';
import { emptyState, demoState, markSeen, parseProgress, toggleDone } from '../src/lib/progress';
import { fakeCatalog, ALL_NUMS } from './helpers/expected';

const NOW = new Date(2026, 9, 17, 9, 0).getTime();
const CAT = fakeCatalog();

it('greets a first-time visitor', () => {
  const m = popupModel(emptyState(), null, CAT, NOW);
  expect([m.title, m.sub, m.cta?.label, m.cta?.sublabel, m.introLink, m.expandedLevel, m.flag])
    .toEqual(['Chào bạn', 'Khóa học có 6 level, 50 bài. Cứ học lần lượt từ bài 1.1.', 'Bắt đầu bài 1.1 →', '1.1', true, 1, null]);
});
it('welcomes back with the mockup texts', () => {
  const s = demoState(NOW);
  const m = popupModel(s, s.lastActiveAt, CAT, NOW);
  expect([m.title, m.sub, m.cta?.label, m.flag?.label, m.introLink, m.expandedLevel]).toEqual([
    'Lần trước bạn dừng ở bài 3.5', 'Cách đây 14 ngày (thứ Bảy, 3/10). Đã học 17/50 bài.',
    'Học tiếp bài 3.5 →', 'Xem lại bài 2.8 bạn đã cắm cờ', false, 3,
  ]);
  expect(m.levels[2].state).toBe('current');
});
it('omits the date when the previous visit is unknown', () => {
  expect(popupModel(demoState(NOW), null, CAT, NOW).sub).toBe('Đã học 17/50 bài.');
});
it('congratulates when everything is done', () => {
  const s = ALL_NUMS.reduce((acc, n) => toggleDone(markSeen(acc, n, NOW), n, NOW), emptyState());
  const m = popupModel(s, NOW - 3 * 86_400_000, CAT, NOW);
  expect([m.title, m.sub, m.cta, m.expandedLevel]).toEqual(['Bạn đã học xong cả 50 bài', 'Muốn ôn lại bài nào thì bấm vào trạm của level đó.', null, 6]);
});
it('a first visit that lands on a lesson page still gets the greeting', () => {
  const s = markSeen(emptyState(), '4.2', NOW);
  const m = popupModel(s, null, CAT, NOW, null);
  expect([m.title, m.cta?.label, m.introLink]).toEqual(['Chào bạn', 'Bắt đầu bài 1.1 →', true]);
});
it('a return that lands on another lesson resumes where the learner stopped', () => {
  const before = demoState(NOW);
  const s = markSeen(before, '4.2', NOW);
  const m = popupModel(s, before.lastActiveAt, CAT, NOW, '3.5');
  expect([m.title, m.cta?.label]).toEqual(['Lần trước bạn dừng ở bài 3.5', 'Học tiếp bài 3.5 →']);
});

it('saved progress on the removed lesson 1.6 keeps the popup working', () => {
  const saved = JSON.stringify({ version: 1, lessons: { '1.6': { status: 'done', flagged: false, seenAt: NOW, doneAt: NOW } }, lastLessonNum: '1.6', lastActiveAt: NOW });
  const parsed = parseProgress(saved, CAT.map(e => e.num), true);
  if (!parsed.ok) throw new Error(parsed.error);
  expect(parsed.state.lastLessonNum).toBeNull();
  expect(parsed.state.lessons['1.6'].status).toBe('done');
  expect(popupModel(parsed.state, null, CAT, NOW).cta?.label).toBe('Bắt đầu bài 1.1 →');
});
