import { STORAGE_KEY, emptyState, parseProgress, serializeProgress, type ProgressState } from './progress';

export interface StorageLike { getItem(k: string): string | null; setItem(k: string, v: string): void }
export type LoadProblem = null | 'unavailable' | 'corrupt';
export interface LoadResult { state: ProgressState; problem: LoadProblem }

/** Where unreadable saved progress is copied before the course starts over. */
export const BACKUP_KEY = 'sqlserver-course:progress:corrupt-backup';

export function loadProgress(storage: StorageLike | null, knownNums: string[]): LoadResult {
  if (!storage) return { state: emptyState(), problem: 'unavailable' };
  let raw: string | null;
  try { raw = storage.getItem(STORAGE_KEY); } catch { return { state: emptyState(), problem: 'unavailable' }; }
  if (raw === null) return { state: emptyState(), problem: null };
  const parsed = parseProgress(raw, knownNums);
  if (parsed.ok) return { state: parsed.state, problem: null };
  try { storage.setItem(BACKUP_KEY, raw); } catch { /* nothing more we can keep */ }
  return { state: emptyState(), problem: 'corrupt' };
}

export function saveProgress(storage: StorageLike | null, s: ProgressState): boolean {
  if (!storage) return false;
  try {
    storage.setItem(STORAGE_KEY, serializeProgress(s));
    return true;
  } catch {
    return false;
  }
}
