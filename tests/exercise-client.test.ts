import { it, expect, vi, afterEach } from 'vitest';
import { createExerciseClient } from '../src/lib/exercise-client';
import { verdictText } from '../src/lib/exercise-messages';
import { loadDraft, saveDraft, loadAccessCode, saveAccessCode } from '../src/lib/exercise-storage';

afterEach(() => { vi.useRealTimers(); });

const okBody = { ok: true, columns: [], rows: [], truncated: false, affected: 0, error: null, ms: 5 };

it('calls onSlow after 3 s and still returns the late answer', async () => {
  vi.useFakeTimers();
  const fetchImpl = vi.fn(() => new Promise<Response>(r => setTimeout(() => r(new Response(JSON.stringify(okBody))), 60_000)));
  const onSlow = vi.fn();
  const p = createExerciseClient('https://x/api', fetchImpl as unknown as typeof fetch).run('3-5-1', 'SELECT 1', 'abc', onSlow);
  await vi.advanceTimersByTimeAsync(3000);
  expect(onSlow).toHaveBeenCalledTimes(1);
  await vi.advanceTimersByTimeAsync(57_000);
  expect(await p).toMatchObject({ ok: true });
});

it('turns a failed fetch, a timeout and a missing API address into a network failure', async () => {
  const net = { ok: false, kind: 'network' };
  expect(await createExerciseClient('https://x/api', (() => Promise.reject(new TypeError('x'))) as unknown as typeof fetch).run('3-5-1', 'SELECT 1', 'abc')).toEqual(net);
  vi.useFakeTimers();
  const p = createExerciseClient('https://x/api', ((_: unknown, init: RequestInit) => new Promise<Response>((_r, reject) => {
    init.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
  })) as unknown as typeof fetch).run('3-5-1', 'SELECT 1', 'abc');
  await vi.advanceTimersByTimeAsync(120_000);
  expect(await p).toEqual(net);
  expect(await createExerciseClient('').run('3-5-1', 'SELECT 1', 'abc')).toEqual(net);
});

it('sends the access code header and the exercise body', async () => {
  const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ ok: false, kind: 'bad-code' }), { status: 401 }));
  expect(await createExerciseClient('https://x/api', fetchImpl as unknown as typeof fetch).grade('3-5-1', 'SELECT 1', 'abc')).toEqual({ ok: false, kind: 'bad-code' });
  const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
  expect(url).toBe('https://x/api/grade');
  expect(new Headers(init.headers).get('x-access-code')).toBe('abc');
  expect(JSON.parse(init.body as string)).toEqual({ exercise: '3-5-1', sql: 'SELECT 1' });
});

it('storage helpers survive a storage that throws', () => {
  const broken = { getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); }, removeItem() { throw new Error('x'); } } as unknown as Storage;
  expect(() => saveDraft('3-5-1', 'SELECT 1', broken)).not.toThrow();
  expect(loadDraft('3-5-1', broken)).toBeNull();
  expect(() => saveAccessCode('abc', broken)).not.toThrow();
  expect(loadAccessCode(broken)).toBeNull();
});

it('keeps one draft per exercise and the access code', () => {
  const m = new Map<string, string>();
  const mem = { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k) } as unknown as Storage;
  saveDraft('3-5-1', 'SELECT 1', mem);
  saveDraft('3-5-2', 'SELECT 2', mem);
  saveAccessCode('abc', mem);
  expect([loadDraft('3-5-1', mem), loadDraft('3-5-2', mem), loadAccessCode(mem)]).toEqual(['SELECT 1', 'SELECT 2', 'abc']);
  saveAccessCode(null, mem);
  expect(loadAccessCode(mem)).toBeNull();
});

it('verdict text matches the spec', () => {
  expect([verdictText(true, null), verdictText(false, 'dòng 2 khác')]).toEqual(['Đúng rồi.', 'Chưa đúng: dòng 2 khác']);
});

it('pings with the access code, and does not ping without one', async () => {
  const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ ok: true, ms: 3 })));
  const client = createExerciseClient('https://x/api', fetchImpl as unknown as typeof fetch);
  expect(await client.ping(null)).toBe(false);
  expect(fetchImpl).not.toHaveBeenCalled();
  expect(await client.ping('abc')).toBe(true);
  const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
  expect([url, new Headers(init.headers).get('x-access-code')]).toEqual(['https://x/api/ping', 'abc']);
});
