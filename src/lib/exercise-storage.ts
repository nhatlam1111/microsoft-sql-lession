/** Drafts and the access code, kept in the browser. Storage may be blocked; then nothing is remembered and nothing breaks. */

const draftKey = (id: string) => `sqlserver-course:draft:${id}`;
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

function write(key: string, value: string | null, given?: Storage): boolean {
  try {
    const s = storageOrNull(given);
    if (!s) return false;
    if (value === null) s.removeItem(key); else s.setItem(key, value);
    return true;
  } catch { return false; }
}

export const loadDraft = (id: string, storage?: Storage) => read(draftKey(id), storage);
export const saveDraft = (id: string, text: string, storage?: Storage) => write(draftKey(id), text, storage);
export const loadAccessCode = (storage?: Storage) => read(CODE_KEY, storage);
/** null forgets the code, for example after the API said it is wrong. */
export const saveAccessCode = (code: string | null, storage?: Storage) => write(CODE_KEY, code, storage);
