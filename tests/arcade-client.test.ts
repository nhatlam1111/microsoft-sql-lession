import { it, expect } from 'vitest';
import { createArcadeClient } from '../src/lib/arcade-client';
import { loadArcadeDraft, loadDraft, saveArcadeDraft, saveDraft } from '../src/lib/exercise-storage';

function recording(body: unknown = { ok: true }) {
  const calls: { url: string; method?: string; headers: Record<string, string>; body: unknown }[] = [];
  const fetchImpl = (async (url: string, init: RequestInit) => {
    calls.push({ url, method: init.method, headers: init.headers as Record<string, string>, body: init.body ? JSON.parse(init.body as string) : undefined });
    return new Response(JSON.stringify(body));
  }) as unknown as typeof fetch;
  return { calls, client: createArcadeClient('http://x/api', fetchImpl) };
}

function memoryStorage(): Storage {
  const values = new Map<string, string>();
  return {
    getItem: k => values.get(k) ?? null, setItem: (k, v) => void values.set(k, v), removeItem: k => void values.delete(k),
    clear: () => values.clear(), key: () => null, get length() { return values.size; },
  };
}

it('sends each Arcade call to its own path with the code', async () => {
  const { calls, client } = recording();
  await client.me('c');
  await client.challenge('bai-1', 'c');
  await client.run('bai-1', 'SELECT 1', 'c');
  await client.submit('bai-1', 'SELECT 2', 'c');
  await client.open('bai-1', 3, 'c');
  expect(calls.map(c => [c.method, c.url])).toEqual([
    ['GET', 'http://x/api/arcade/me'],
    ['GET', 'http://x/api/arcade/challenges/bai-1'],
    ['POST', 'http://x/api/arcade/run'],
    ['POST', 'http://x/api/arcade/submit'],
    ['POST', 'http://x/api/arcade/open'],
  ]);
  expect(calls.map(c => c.headers['x-access-code'])).toEqual(['c', 'c', 'c', 'c', 'c']);
  expect(calls[2].body).toEqual({ challenge: 'bai-1', sql: 'SELECT 1' });
  expect(calls[3].body).toEqual({ challenge: 'bai-1', sql: 'SELECT 2' });
  expect(calls[4].body).toEqual({ challenge: 'bai-1', test: 3 });
});

it('escapes the challenge id in the path', async () => {
  const { calls, client } = recording();
  await client.challenge('a/b', 'c');
  expect(calls[0].url).toBe('http://x/api/arcade/challenges/a%2Fb');
});

it('turns a network failure into a failure reply', async () => {
  const client = createArcadeClient('http://x/api', (async () => { throw new Error('offline'); }) as unknown as typeof fetch);
  expect(await client.me('c')).toEqual({ ok: false, kind: 'network' });
});

it('keeps Arcade drafts apart from exercise drafts', () => {
  const storage = memoryStorage();
  saveArcadeDraft('x', 'A', storage);
  saveDraft('x', 'B', storage);
  expect([loadArcadeDraft('x', storage), loadDraft('x', storage)]).toEqual(['A', 'B']);
});
