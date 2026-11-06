/** Drafts and the access code, kept in the browser. Storage may be blocked; then nothing is remembered and nothing breaks. */

import { legacyDraftId } from './curriculum-version';

const draftKey = (id: string) => `sqlserver-course:draft:v2:${id}`;
const arcadeDraftKey = (id: string) => `sqlserver-course:arcade:draft:${id}`;
const CODE_KEY = 'sqlserver-course:access-code';

function storageOrNull(given?: Storage): Storage | null {
  if (given) return given;
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

function read(key: string, given?: Storage): string | null {
  try {
    return storageOrNull(given)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function write(key: string, value: string | null, given?: Storage): void {
  try {
    const s = storageOrNull(given);
    if (value === null) s?.removeItem(key); else s?.setItem(key, value);
  } catch { /* blocked storage: forget quietly */ }
}

export function loadDraft(id: string, storage?: Storage): string | null {
  const current = read(draftKey(id), storage);
  if (current !== null) return current;
  const legacy = legacyDraftId(id);
  return legacy === null ? null : read(`sqlserver-course:draft:${legacy}`, storage);
}
export const saveDraft = (id: string, text: string, storage?: Storage) => write(draftKey(id), text, storage);
export const loadArcadeDraft = (id: string, storage?: Storage) => read(arcadeDraftKey(id), storage);
export const saveArcadeDraft = (id: string, text: string, storage?: Storage) => write(arcadeDraftKey(id), text, storage);
export const loadAccessCode = (storage?: Storage) => read(CODE_KEY, storage);
/** null forgets the code, for example after the API said it is wrong. */
export const saveAccessCode = (code: string | null, storage?: Storage) => write(CODE_KEY, code, storage);
