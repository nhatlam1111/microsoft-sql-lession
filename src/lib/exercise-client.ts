/** Calls the exercise API from the browser. Every failure comes back as an ApiFailure, never as a thrown error. */
import type { ApiFailure, GradeResponse, RunResponse } from './exercise-types';

const NETWORK: ApiFailure = { ok: false, kind: 'network' };
const UNAVAILABLE: ApiFailure = { ok: false, kind: 'unavailable' };

/** A reply the page can show: a success, or a failure that names its kind. Anything else is the service misbehaving. */
function isReply(body: unknown): boolean {
  if (typeof body !== 'object' || body === null) return false;
  const b = body as { ok?: unknown; kind?: unknown };
  return b.ok === true || (b.ok === false && typeof b.kind === 'string');
}

export function createExerciseClient(
  base: string,
  fetchImpl: typeof fetch = (input, init) => fetch(input, init),
  opts = { slowMs: 3000, timeoutMs: 120_000 },
) {
  async function call<T>(path: string, body: unknown, code: string | null, onSlow?: () => void): Promise<T | ApiFailure> {
    if (!base) return NETWORK;
    const controller = new AbortController();
    // A sleeping database can take about a minute to wake; say so instead of looking stuck.
    const slow = onSlow ? setTimeout(onSlow, opts.slowMs) : undefined;
    const timeout = setTimeout(() => controller.abort(), opts.timeoutMs);
    try {
      const headers: Record<string, string> = { 'content-type': 'application/json' };
      if (code) headers['x-access-code'] = code;
      const res = await fetchImpl(`${base}/${path}`, {
        method: body === undefined ? 'GET' : 'POST',
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: controller.signal,
      });
      const reply: unknown = await res.json();
      return isReply(reply) ? reply as T | ApiFailure : UNAVAILABLE;
    } catch {
      return NETWORK;
    } finally {
      clearTimeout(slow);
      clearTimeout(timeout);
    }
  }

  return {
    /** Wakes the database early; skipped without a code, so visitors who cannot run anything do not wake it. */
    async ping(code: string | null): Promise<boolean> {
      if (!code) return false;
      const r = await call<{ ok: true }>('ping', undefined, code);
      return r.ok === true;
    },
    run: (id: string, sql: string, code: string, onSlow?: () => void) =>
      call<RunResponse>('run', { exercise: id, sql }, code, onSlow),
    grade: (id: string, sql: string, code: string, onSlow?: () => void) =>
      call<GradeResponse>('grade', { exercise: id, sql }, code, onSlow),
  };
}
