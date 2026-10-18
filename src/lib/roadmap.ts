import type { LevelNo } from '../data/curriculum';
import { LEVELS } from '../data/curriculum';
import { sortCatalog, type NavEntry } from './catalog';
import { isFlagged, statusOf, type ProgressState } from './progress';

export const DAY_MS = 86_400_000;

/** The roadmap opens by itself on the first visit and after a break of a day or more. */
export function shouldAutoOpen(previousActiveAt: number | null, now: number): boolean {
  return previousActiveAt === null || now - previousActiveAt >= DAY_MS;
}

/** The lesson the "continue" button points to; null once every lesson is done. */
export function resumeTarget<T extends NavEntry>(s: ProgressState, catalog: T[]): T | null {
  const sorted = sortCatalog(catalog);
  const notDone = (e: T) => statusOf(s, e.num) !== 'done';
  const i = s.lastLessonNum === null ? -1 : sorted.findIndex(e => e.num === s.lastLessonNum);
  if (i < 0) return sorted.find(notDone) ?? null;
  if (notDone(sorted[i])) return sorted[i];
  return sorted.slice(i + 1).find(notDone) ?? sorted.find(notDone) ?? null;
}

/** The level the course menu opens on: the lesson being read, else the lesson to continue, else level 1. */
export function menuOpenLevel(s: ProgressState, catalog: NavEntry[], currentNum?: string): LevelNo {
  const entry = currentNum ? catalog.find(e => e.num === currentNum) : resumeTarget(s, catalog);
  return (entry?.level ?? 1) as LevelNo;
}

export interface LevelSummary {
  level: LevelNo;
  done: number;
  total: number;
  flags: number;
  state: 'done' | 'current' | 'partial' | 'todo';
}

export function levelSummaries(s: ProgressState, catalog: NavEntry[], currentLevel: LevelNo | null): LevelSummary[] {
  return LEVELS.map(({ no }) => {
    const lessons = catalog.filter(e => e.level === no);
    const done = lessons.filter(e => statusOf(s, e.num) === 'done').length;
    const flags = lessons.filter(e => isFlagged(s, e.num)).length;
    const state = no === currentLevel ? 'current' : done === lessons.length ? 'done' : done > 0 ? 'partial' : 'todo';
    return { level: no, done, total: lessons.length, flags, state };
  });
}

export function firstFlagged<T extends NavEntry>(s: ProgressState, catalog: T[]): T | null {
  return sortCatalog(catalog).find(e => isFlagged(s, e.num)) ?? null;
}

const WEEKDAYS = ['Chủ nhật', 'thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm', 'thứ Sáu', 'thứ Bảy'];

/** "Hôm nay", "Hôm qua (thứ Sáu, 16/10)" or "Cách đây 14 ngày (thứ Bảy, 3/10)", by calendar day. */
export function formatLastVisit(prev: number, now: number): string {
  const day = (t: number) => { const d = new Date(t); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); };
  const days = Math.round((day(now) - day(prev)) / DAY_MS);
  if (days <= 0) return 'Hôm nay';
  const d = new Date(prev);
  const when = `${WEEKDAYS[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}`;
  return days === 1 ? `Hôm qua (${when})` : `Cách đây ${days} ngày (${when})`;
}
