import { it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { handleArcadeRun, handleChallenge, handleMe, handleOpen, handleSubmit, learnerId, type ArcadeDeps } from '../api/src/arcade';
import type { RunOutcome } from '../api/src/core';
import type { ArcadeRunResponse, ChallengeState, MeResponse, OpenResponse, SubmitResponse, TestResult } from '../src/lib/arcade-types';
import type { LearnerState } from '../api/src/arcade-store';
import { fakeChallenge, fakeRun, fakeStore } from './helpers/arcade-fakes';

const first = fakeChallenge('a', 1);
const second = fakeChallenge('b', 2);

function world(state: Partial<LearnerState> = {}, script: Record<number, Partial<RunOutcome>> = {}) {
  const s = fakeStore(state);
  const r = fakeRun(first, script);
  const deps: ArcadeDeps = {
    codes: ['abc'], allow: () => true, challenges: [first, second],
    services: () => ({ store: s.store, run: r.run }),
  };
  return { ...s, ...r, deps };
}
const asked = (over = {}) => ({ challenge: 'a', sql: 'SELECT a FROM T', ...over });
const wrong: Partial<RunOutcome> = { shape: { columns: [{ name: 'a', type: 'varchar' }], rows: [] }, affected: [0] };

it('gives a new learner 20 coins', async () => {
  const { deps } = world();
  expect((await handleMe('abc', deps)).body).toEqual({ ok: true, coins: 20, completed: [] } satisfies MeResponse);
});

it('refuses a wrong code and a blocked statement', async () => {
  const { deps } = world();
  expect(await handleMe('nope', deps)).toEqual({ status: 401, body: { ok: false, kind: 'bad-code' } });
  expect(await handleArcadeRun(asked(), null, deps)).toEqual({ status: 401, body: { ok: false, kind: 'bad-code' } });
  const blocked = await handleSubmit(asked({ sql: 'DROP TABLE T' }), 'abc', deps);
  expect(blocked).toEqual({ status: 422, body: { ok: false, kind: 'blocked', reason: 'Bài luyện chỉ nhận câu bắt đầu bằng SELECT hoặc WITH.' } });
});

it('refuses a request of the wrong shape and an unknown challenge', async () => {
  const { deps } = world();
  expect((await handleArcadeRun(null, 'abc', deps)).status).toBe(400);
  expect((await handleOpen({ challenge: 'a', test: '3' }, 'abc', deps)).status).toBe(400);
  expect((await handleSubmit(asked({ challenge: 'zz' }), 'abc', deps)).status).toBe(404);
  expect((await handleChallenge('zz', 'abc', deps)).status).toBe(404);
});

it('refuses a locked challenge everywhere', async () => {
  const { deps, calls, state } = world();
  const locked = { status: 403, body: { ok: false, kind: 'locked' } };
  expect(await handleArcadeRun(asked({ challenge: 'b' }), 'abc', deps)).toEqual(locked);
  expect(await handleSubmit(asked({ challenge: 'b' }), 'abc', deps)).toEqual(locked);
  expect(await handleOpen({ challenge: 'b', test: 3 }, 'abc', deps)).toEqual(locked);
  expect(calls).toEqual([]);
  expect(state.coins).toBe(20);
});

it('tells a locked challenge apart when read', async () => {
  const { deps } = world();
  expect((await handleChallenge('b', 'abc', deps)).body).toEqual({
    ok: true, unlocked: false, completed: false, coins: 20, lastSql: null, lastFailed: null, opened: [],
  } satisfies ChallengeState);
});

it('opens the next challenge once the one before is done', async () => {
  const { deps } = world({ completed: ['a'] });
  expect((await handleChallenge('b', 'abc', deps)).body).toMatchObject({ unlocked: true, completed: false });
});

it('runs visible and opened tests only', async () => {
  const { deps, calls } = world({ opened: [{ challenge: 'a', test: 4 }] });
  const r = (await handleArcadeRun(asked(), 'abc', deps)).body as ArcadeRunResponse;
  expect(calls).toEqual([1, 2, 4]);
  expect(r.tests.map(t => t.shown)).toEqual([true, true, true]);
});

it('shows nothing of an unopened hidden test', async () => {
  const { deps } = world();
  const body = (await handleSubmit(asked(), 'abc', deps)).body as SubmitResponse;
  const locked = body.tests.find(t => t.id === 3) as TestResult;
  expect(Object.keys(locked).sort()).toEqual(['id', 'passed', 'shown']);
  expect(JSON.stringify(body)).not.toContain('BAT-MAT');
});

it('keeps a SQL error of a hidden test out of the reply', async () => {
  const { deps } = world({}, { 3: { shape: null, error: "Conversion failed: 'BAT-MAT-3'" } });
  const body = (await handleSubmit(asked(), 'abc', deps)).body as SubmitResponse;
  expect(body.tests.find(t => t.id === 3)).toEqual({ id: 3, shown: false, passed: false });
  expect(JSON.stringify(body)).not.toContain('BAT-MAT');
});

it('shows a unit test what the learner got and why it is wrong', async () => {
  const { deps } = world({}, { 1: wrong });
  const body = (await handleArcadeRun(asked(), 'abc', deps)).body as ArcadeRunResponse;
  expect(body.tests[0]).toMatchObject({ id: 1, shown: true, passed: false, rows: [], columns: ['a'], error: null });
  expect((body.tests[0] as { reason: string }).reason).toContain('khác số dòng');
});

it('names a SQL error on a unit test in full', async () => {
  const { deps } = world({}, { 1: { shape: null, error: "Invalid column name 'x'." } });
  const body = (await handleArcadeRun(asked(), 'abc', deps)).body as ArcadeRunResponse;
  expect(body.tests[0]).toMatchObject({ passed: false, reason: 'câu lệnh bị lỗi', error: "Invalid column name 'x'." });
});

it('caps the rows a test shows at 200', async () => {
  const rows = Array.from({ length: 250 }, (_, i) => [String(i)]);
  const { deps } = world({}, { 1: { shape: { columns: [{ name: 'a', type: 'varchar' }], rows } } });
  const body = (await handleArcadeRun(asked(), 'abc', deps)).body as ArcadeRunResponse;
  expect(body.tests[0]).toMatchObject({ truncated: true });
  expect((body.tests[0] as { rows: unknown[] }).rows).toHaveLength(200);
});

it('pays once for a first pass', async () => {
  const { deps, state } = world();
  const once = (await handleSubmit(asked(), 'abc', deps)).body as SubmitResponse;
  expect(once).toMatchObject({ accepted: true, reward: 10, coins: 30 });
  const again = (await handleSubmit(asked(), 'abc', deps)).body as SubmitResponse;
  expect(again).toMatchObject({ accepted: true, reward: 0, coins: 30 });
  expect(state.completed).toEqual(['a']);
});

it('keeps a challenge done after a wrong resubmission', async () => {
  const { deps, state } = world({ completed: ['a'] }, { 3: wrong });
  const body = (await handleSubmit(asked(), 'abc', deps)).body as SubmitResponse;
  expect(body).toMatchObject({ accepted: false, reward: 0 });
  expect(state.completed).toEqual(['a']);
});

it('records every submission with the failed tests', async () => {
  const { deps, submissions } = world({}, { 3: wrong, 5: wrong });
  await handleSubmit(asked(), 'abc', deps);
  expect(submissions).toEqual([{ challenge: 'a', sql: 'SELECT a FROM T', passed: 3, total: 5, accepted: false, failed: [3, 5] }]);
});

it('gives back the last submission and the opened tests', async () => {
  const { deps } = world({ opened: [{ challenge: 'a', test: 4 }] }, { 3: wrong });
  await handleSubmit(asked(), 'abc', deps);
  const state = (await handleChallenge('a', 'abc', deps)).body as ChallengeState;
  expect(state).toMatchObject({ unlocked: true, completed: false, lastSql: 'SELECT a FROM T', lastFailed: [3] });
  expect(state.opened.map(t => t.id)).toEqual([4]);
  expect(state.opened[0].expected).toEqual([['BAT-MAT-4']]);
});

it('charges 10 once to open a test', async () => {
  const { deps, state } = world();
  const once = (await handleOpen({ challenge: 'a', test: 3 }, 'abc', deps)).body as OpenResponse;
  expect(once.coins).toBe(10);
  expect(once.test).toEqual({ id: 3, rows: { T: [['BAT-MAT-3']] }, expected: [['BAT-MAT-3']] });
  const again = (await handleOpen({ challenge: 'a', test: 3 }, 'abc', deps)).body as OpenResponse;
  expect(again.coins).toBe(10);
  expect(again.test.id).toBe(3);
  expect(state.coins).toBe(10);
});

it('refuses to open without enough coins', async () => {
  const { deps, state } = world({ coins: 5 });
  expect(await handleOpen({ challenge: 'a', test: 3 }, 'abc', deps)).toEqual({ status: 409, body: { ok: false, kind: 'not-enough-coins' } });
  expect(state.coins).toBe(5);
});

it('refuses to open a visible test or one the challenge does not have', async () => {
  const { deps } = world();
  expect((await handleOpen({ challenge: 'a', test: 1 }, 'abc', deps)).status).toBe(400);
  expect((await handleOpen({ challenge: 'a', test: 99 }, 'abc', deps)).status).toBe(400);
});

it('stops a submit when the service fails midway', async () => {
  const { deps, submissions, state, calls } = world({}, { 3: { shape: null, errorKind: 'unavailable' } });
  expect(await handleSubmit(asked(), 'abc', deps)).toEqual({ status: 503, body: { ok: false, kind: 'unavailable' } });
  expect(calls).toEqual([1, 2, 3]);
  expect(submissions).toEqual([]);
  expect(state.coins).toBe(20);
});

it('refuses two statements in one batch', async () => {
  const { deps, submissions } = world({}, { 1: { affected: [1, 1] } });
  expect(await handleSubmit(asked({ sql: 'SELECT 1 SELECT 2' }), 'abc', deps)).toEqual({ status: 422, body: { ok: false, kind: 'multi' } });
  expect(submissions).toEqual([]);
});

it('fails only the slow test on a timeout', async () => {
  const { deps, calls } = world({}, { 2: { shape: null, errorKind: 'timeout' } });
  const body = (await handleSubmit(asked(), 'abc', deps)).body as SubmitResponse;
  expect(calls).toEqual([1, 2, 3, 4, 5]);
  expect(body.tests[1]).toMatchObject({ passed: false, reason: 'chạy quá 5 giây' });
  expect(body.tests.filter(t => t.passed)).toHaveLength(4);
  expect(body.accepted).toBe(false);
});

it('refuses a result too big to grade', async () => {
  const rows = Array.from({ length: 5001 }, () => ['x']);
  const { deps } = world({}, { 1: { shape: { columns: [{ name: 'a', type: 'varchar' }], rows } } });
  expect((await handleSubmit(asked(), 'abc', deps)).body).toEqual({ ok: false, kind: 'too-big' });
});

it('answers unavailable when Arcade is not configured', async () => {
  const { deps } = world();
  const broken: ArcadeDeps = { ...deps, services: () => { throw new Error('ARCADE_SQL_DATABASE must be set.'); } };
  expect(await handleMe('abc', broken)).toEqual({ status: 503, body: { ok: false, kind: 'unavailable' } });
  expect((await handleSubmit(asked(), 'abc', broken)).status).toBe(503);
});

it('says the free allowance ran out when the store says so', async () => {
  const { deps, store } = world();
  const paused = { ...store, load: async () => { throw new Error('Database is paused: free amount limit reached'); } };
  const broken: ArcadeDeps = { ...deps, services: () => ({ store: paused, run: deps.services().run }) };
  expect(await handleMe('abc', broken)).toEqual({ status: 503, body: { ok: false, kind: 'quota' } });
});

it('stores a hash, never the code', async () => {
  const { deps, learners } = world();
  await handleSubmit(asked(), 'abc', deps);
  expect(learnerId('abc')).toBe(createHash('sha256').update('abc').digest('hex'));
  expect(new Set(learners)).toEqual(new Set([learnerId('abc')]));
});

it('refuses when the rate limit is reached', async () => {
  const { deps } = world();
  expect((await handleMe('abc', { ...deps, allow: () => false })).status).toBe(429);
});
