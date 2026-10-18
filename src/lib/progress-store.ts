// One progress store per page, shared by every island through this module.
import {
  demoState, emptyState, parseProgress, serializeProgress, STORAGE_KEY, touch,
  markSeen, toggleDone, toggleFlag, markExerciseDone, type ImportResult, type ProgressState,
} from './progress';
import { loadProgress, saveProgress, type LoadProblem, type StorageLike } from './progress-storage';

export interface StoreSnapshot {
  state: ProgressState;
  /** When the learner was last here, captured before this page marked its visit. */
  previousActiveAt: number | null;
  /** The last lesson as it was when this page opened, before a lesson page marks itself seen. */
  previousLastLessonNum: string | null;
  problem: LoadProblem;
}

const SERVER_SNAPSHOT: StoreSnapshot = { state: emptyState(), previousActiveAt: null, previousLastLessonNum: null, problem: null };

let initialized = false;
let storage: StorageLike | null = null;
let knownNums: string[] = [];
let snapshot: StoreSnapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();
let removeStorageListener: (() => void) | null = null;

function safeLocalStorage(): StorageLike | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

function publish(next: Partial<StoreSnapshot>): void {
  snapshot = { ...snapshot, ...next };
  for (const l of listeners) l();
}

function commit(state: ProgressState, extra: Partial<StoreSnapshot> = {}): void {
  const saved = saveProgress(storage, state);
  const problem = !saved && snapshot.problem === null ? 'unavailable' : snapshot.problem;
  publish({ state, problem, ...extra });
}

/** Load saved progress once per page: remember when the learner was here last, then mark this visit. */
export function initProgressStore(nums: string[], store: StorageLike | null = safeLocalStorage(), now: number = Date.now()): void {
  if (initialized) return;
  initialized = true;
  storage = store;
  knownNums = nums;
  const loaded = loadProgress(storage, knownNums);
  const state = touch(loaded.state, now);
  const saved = loaded.problem !== 'unavailable' && saveProgress(storage, state);
  publish({
    state,
    previousActiveAt: loaded.state.lastActiveAt,
    previousLastLessonNum: loaded.state.lastLessonNum,
    problem: loaded.problem ?? (saved ? null : 'unavailable'),
  });
  if (typeof window !== 'undefined') {
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) handleExternalChange(e.newValue); };
    // A page restored from the back/forward cache holds old progress in memory; read the saved copy again.
    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) refreshFromStorage(); };
    window.addEventListener('storage', onStorage);
    window.addEventListener('pageshow', onPageShow);
    removeStorageListener = () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('pageshow', onPageShow);
    };
  }
}

/** Replace the in-memory progress with what is saved, e.g. after another page changed it. */
export function refreshFromStorage(): void {
  let raw: string | null = null;
  try { raw = storage?.getItem(STORAGE_KEY) ?? null; } catch { return; }
  if (raw !== null) handleExternalChange(raw);
}

export function getSnapshot(): StoreSnapshot {
  return snapshot;
}

export function getServerSnapshot(): StoreSnapshot {
  return SERVER_SNAPSHOT;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Another tab saved progress: take its version instead of writing ours over it. */
export function handleExternalChange(newValue: string | null): void {
  if (newValue === null) {
    publish({ state: emptyState() });
    return;
  }
  const parsed = parseProgress(newValue, knownNums);
  if (parsed.ok) publish({ state: parsed.state });
}

export const actions = {
  markSeen(num: string): void { commit(markSeen(snapshot.state, num, Date.now())); },
  toggleDone(num: string): void { commit(toggleDone(snapshot.state, num, Date.now())); },
  toggleFlag(num: string): void { commit(toggleFlag(snapshot.state, num, Date.now())); },
  markExerciseDone(id: string): void { commit(markExerciseDone(snapshot.state, id, Date.now())); },
  importText(text: string): ImportResult {
    const result = parseProgress(text, knownNums);
    if (result.ok) commit(result.state, { previousLastLessonNum: result.state.lastLessonNum });
    return result;
  },
  exportText(): string { return serializeProgress(snapshot.state); },
  reset(): void { commit(touch(emptyState(), Date.now()), { previousLastLessonNum: null }); },
  loadDemo(): void {
    const state = demoState(Date.now());
    commit(state, { previousActiveAt: state.lastActiveAt, previousLastLessonNum: state.lastLessonNum });
  },
};

export function __resetStoreForTests(): void {
  removeStorageListener?.();
  removeStorageListener = null;
  initialized = false;
  storage = null;
  knownNums = [];
  snapshot = SERVER_SNAPSHOT;
  listeners.clear();
}
