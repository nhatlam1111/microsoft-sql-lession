import { legacyExerciseId, legacyLessonNum } from './curriculum-version';
import { mergedFromNum, migrateLessonNumToV3, migrateLessonNumToV4, migrateLessonNumToV5, qualityOutlineNum } from '../data/lesson-moves.mjs';

export type MainStatus = 'todo' | 'seen' | 'done';
export type Icon = MainStatus | 'flag';

export interface LessonProgress { status: 'seen' | 'done'; flagged: boolean; seenAt: number; doneAt?: number }

export interface ProgressState {
  version: 5;
  lessons: Record<string, LessonProgress>;
  lastLessonNum: string | null;
  lastActiveAt: number | null;
  /** Exercises solved on the exercise page, by exercise id; older progress files have none. */
  exercises?: Record<string, { doneAt: number }>;
}

export const STORAGE_KEY = 'sqlserver-course:progress:v5';
export const PREVIOUS_STORAGE_KEYS = [
  'sqlserver-course:progress:v4', 'sqlserver-course:progress:v3', 'sqlserver-course:progress:v2', 'sqlserver-course:progress:v1',
];

export const IMPORT_ERRORS = {
  notJson: 'File không phải JSON hợp lệ.',
  badShape: 'File không đúng định dạng tiến độ của khóa học.',
};

const DAY_MS = 86_400_000;

export function emptyState(): ProgressState {
  return { version: 5, lessons: {}, lastLessonNum: null, lastActiveAt: null };
}

export function statusOf(s: ProgressState, num: string): MainStatus {
  return s.lessons[num]?.status ?? 'todo';
}

export function isFlagged(s: ProgressState, num: string): boolean {
  return s.lessons[num]?.flagged ?? false;
}

export function iconOf(s: ProgressState, num: string): Icon {
  return isFlagged(s, num) ? 'flag' : statusOf(s, num);
}

const withLesson = (s: ProgressState, num: string, lesson: LessonProgress): ProgressState =>
  ({ ...s, lessons: { ...s.lessons, [num]: lesson } });

export function markSeen(s: ProgressState, num: string, now: number): ProgressState {
  const current = s.lessons[num];
  const next = current ? s : withLesson(s, num, { status: 'seen', flagged: false, seenAt: now });
  return { ...next, lastLessonNum: num };
}

export function toggleDone(s: ProgressState, num: string, now: number): ProgressState {
  const current = s.lessons[num];
  if (current?.status === 'done') {
    const { doneAt: _drop, ...rest } = current;
    return withLesson(s, num, { ...rest, status: 'seen' });
  }
  return withLesson(s, num, { ...(current ?? { flagged: false, seenAt: now }), status: 'done', doneAt: now });
}

export function toggleFlag(s: ProgressState, num: string, now: number): ProgressState {
  const current = s.lessons[num] ?? { status: 'seen' as const, flagged: false, seenAt: now };
  return withLesson(s, num, { ...current, flagged: !current.flagged });
}

export function markExerciseDone(s: ProgressState, id: string, now: number): ProgressState {
  if (s.exercises?.[id]) return s;
  return { ...s, exercises: { ...s.exercises, [id]: { doneAt: now } } };
}

export function isExerciseDone(s: ProgressState, id: string): boolean {
  return Boolean(s.exercises?.[id]);
}

export function touch(s: ProgressState, now: number): ProgressState {
  return { ...s, lastActiveAt: now };
}

export function countDone(s: ProgressState, nums: string[]): number {
  return nums.filter(n => statusOf(s, n) === 'done').length;
}

export function serializeProgress(s: ProgressState): string {
  return JSON.stringify(s, null, 2);
}

export type ImportResult = { ok: true; state: ProgressState; ignored: number } | { ok: false; error: string };

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

function parseLesson(v: unknown): LessonProgress | null {
  if (!isObject(v)) return null;
  if (v.status !== 'seen' && v.status !== 'done') return null;
  if (typeof v.flagged !== 'boolean' || !isNum(v.seenAt)) return null;
  if (v.doneAt !== undefined && !isNum(v.doneAt)) return null;
  const lesson: LessonProgress = { status: v.status, flagged: v.flagged, seenAt: v.seenAt };
  if (v.doneAt !== undefined) lesson.doneAt = v.doneAt;
  return lesson;
}

/**
 * Read an exported progress file; lessons that are no longer in the course are dropped and counted.
 * `keepUnknown` keeps them instead: the browser's own copy must not shrink because one page has an older lesson list.
 */
export function parseProgress(text: string, knownNums: string[], keepUnknown = false): ImportResult {
  let raw: unknown;
  try { raw = JSON.parse(text); } catch { return { ok: false, error: IMPORT_ERRORS.notJson }; }
  const bad = { ok: false as const, error: IMPORT_ERRORS.badShape };
  if (!isObject(raw) || (raw.version !== 1 && raw.version !== 2 && raw.version !== 3 && raw.version !== 4 && raw.version !== 5) || !isObject(raw.lessons)) return bad;
  const version = raw.version;
  const numAtV3 = (num: string) => version >= 3 ? num : migrateLessonNumToV3(version === 1 ? legacyLessonNum(num) : num);
  const numAtV4 = (num: string | null) => num === null || version >= 4 ? num : migrateLessonNumToV4(num);
  const numAtV5 = (num: string | null) => num === null || version === 5 ? num : migrateLessonNumToV5(num);
  const rawLast = raw.lastLessonNum ?? null;
  const last = typeof rawLast === 'string' ? numAtV5(numAtV4(numAtV3(rawLast))) : rawLast;
  const active = raw.lastActiveAt ?? null;
  if (last !== null && typeof last !== 'string') return bad;
  if (active !== null && !isNum(active)) return bad;
  let exercises: Record<string, { doneAt: number }> | undefined;
  if (raw.exercises !== undefined) {
    if (!isObject(raw.exercises)) return bad;
    exercises = {};
    for (const [id, value] of Object.entries(raw.exercises)) {
      if (!isObject(value) || !isNum(value.doneAt)) return bad;
      exercises[version === 1 ? legacyExerciseId(id) : id] = { doneAt: value.doneAt };
    }
  }

  const known = new Set(knownNums);
  const lessons: Record<string, LessonProgress> = {};
  const mergedLessons = new Map<string, LessonProgress>();
  let ignored = 0;
  for (const [rawNum, value] of Object.entries(raw.lessons)) {
    const v3Num = numAtV3(rawNum);
    const v4Num = numAtV4(v3Num);
    const num = numAtV5(v4Num);
    const lesson = parseLesson(value);
    if (!lesson) return bad;
    if (num === null || (!known.has(num) && !keepUnknown)) {
      ignored++;
    } else if ((version < 4 && v3Num === mergedFromNum) || (version < 5 && v4Num === qualityOutlineNum)) {
      mergedLessons.set(num, lesson);
    } else {
      lessons[num] = lesson;
    }
  }
  for (const [num, mergedLesson] of mergedLessons) {
    const existing = lessons[num];
    lessons[num] = existing
      ? { ...existing, flagged: existing.flagged || mergedLesson.flagged }
      : { status: 'seen', flagged: mergedLesson.flagged, seenAt: mergedLesson.seenAt };
  }
  return {
    ok: true,
    state: { version: 5, lessons, lastLessonNum: last !== null && known.has(last) ? last : null, lastActiveAt: active, ...(exercises ? { exercises } : {}) },
    ignored,
  };
}

const DEMO_DONE = ['1.1', '1.2', '1.3', '1.4', '1.5', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.9', '3.1', '3.2', '3.3', '3.4'];

/** Progress like the mockup: 17 lessons done, 2.8 flagged, stopped at 3.5 fourteen days ago. */
export function demoState(now: number): ProgressState {
  const last = now - 14 * DAY_MS;
  const earlier = last - 7 * DAY_MS;
  const lessons: Record<string, LessonProgress> = {};
  for (const n of DEMO_DONE) lessons[n] = { status: 'done', flagged: false, seenAt: earlier, doneAt: earlier };
  lessons['2.8'] = { status: 'seen', flagged: true, seenAt: earlier };
  lessons['3.7'] = { status: 'seen', flagged: false, seenAt: last };
  lessons['3.5'] = { status: 'seen', flagged: false, seenAt: last };
  return { version: 5, lessons, lastLessonNum: '3.5', lastActiveAt: last };
}

export function exportFileName(now: number): string {
  const d = new Date(now);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `tien-do-sql-server-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.json`;
}
