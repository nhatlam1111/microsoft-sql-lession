/** Arcade's request handling, free of Azure and of the database driver so it can be tested with fakes. */
import { createHash } from 'node:crypto';
import { ARCADE_RULES } from '../../src/data/arcade';
import { isUnlocked, publicTest } from '../../src/lib/arcade-play';
import type {
  ArcadeRunResponse, Challenge, ChallengeState, ChallengeTest, MeResponse, OpenResponse, SubmitResponse, TestResult,
} from '../../src/lib/arcade-types';
import type { ApiFailure } from '../../src/lib/exercise-types';
import { compareResults, type Verdict } from '../../src/lib/grade';
import { guardArcade, normalizeSql } from '../../src/lib/sql-guard';
import { expectedShape, type ArcadeRun } from './arcade-check';
import { buildSetup } from './arcade-sql';
import type { LearnerState, Store } from './arcade-store';
import { GRADED_ROWS, SHOWN_ROWS, fail, type Reply, type RunOutcome } from './core';

export interface ArcadeDeps {
  codes: string[];
  allow: (code: string) => boolean;
  /** In play order. */
  challenges: Challenge[];
  /** Throws when Arcade is not configured. */
  services(): { store: Store; run: ArcadeRun };
}

type Failure = { status: number; body: ApiFailure };

const isFailure = (x: object): x is Failure => 'status' in x;

/** The learner in the database: an access code must not sit there in clear. */
export const learnerId = (code: string) => createHash('sha256').update(code).digest('hex');

function admit(code: string | null, deps: ArcadeDeps): Failure | null {
  if (!code || !deps.codes.includes(code)) return fail('bad-code');
  return deps.allow(code) ? null : fail('rate');
}

/** Anything unforeseen is the service's fault, never the learner's. */
async function guarded<T>(work: () => Promise<Reply<T>>): Promise<Reply<T>> {
  try {
    return await work();
  } catch (e) {
    const message = String((e as Error)?.message ?? '');
    console.error(`Arcade call failed: ${message}`);
    return fail(/free/i.test(message) ? 'quota' : 'unavailable');
  }
}

const unlocked = (deps: ArcadeDeps, state: LearnerState, id: string) =>
  isUnlocked(deps.challenges.map(c => c.id), new Set(state.completed), id);

const openedIn = (state: LearnerState, challenge: string) =>
  new Set(state.opened.filter(o => o.challenge === challenge).map(o => o.test));

function readStatement(body: unknown, code: string | null, deps: ArcadeDeps): Failure | { challenge: Challenge; sql: string } {
  const b = body as { challenge?: unknown; sql?: unknown } | null;
  if (!b || typeof b !== 'object' || typeof b.challenge !== 'string' || typeof b.sql !== 'string') return fail('bad-request');
  const refused = admit(code, deps);
  if (refused) return refused;
  const challenge = deps.challenges.find(c => c.id === b.challenge);
  if (!challenge) return fail('unknown-exercise');
  const guard = guardArcade(b.sql);
  if (!guard.ok) return fail('blocked', guard.reason);
  // The database gets exactly the text the guard read.
  return { challenge, sql: normalizeSql(b.sql) };
}

function verdictOf(c: Challenge, t: ChallengeTest, o: RunOutcome): Verdict {
  if (o.errorKind === 'timeout') return { correct: false, reason: `chạy quá ${ARCADE_RULES.testTimeoutMs / 1000} giây` };
  if (o.error) return { correct: false, reason: 'câu lệnh bị lỗi' };
  return compareResults(o.shape ?? { columns: [], rows: [] }, expectedShape(c, t), c.ordered);
}

/** `shown` false keeps everything but the outcome back: an error text can quote the test's data. */
function resultOf(c: Challenge, t: ChallengeTest, o: RunOutcome, shown: boolean): TestResult {
  const verdict = verdictOf(c, t, o);
  if (!shown) return { id: t.id, shown: false, passed: verdict.correct };
  const rows = o.shape?.rows ?? [];
  return {
    id: t.id, shown: true, passed: verdict.correct, reason: verdict.reason,
    columns: o.shape?.columns.map(column => column.name) ?? [],
    rows: rows.slice(0, SHOWN_ROWS), truncated: rows.length > SHOWN_ROWS, error: o.error, ms: o.ms,
  };
}

/** A failure of the service stops the whole run, so that it is never counted as a wrong answer. */
async function runTests(c: Challenge, tests: ChallengeTest[], sql: string, run: ArcadeRun, shown: (t: ChallengeTest) => boolean): Promise<TestResult[] | Failure> {
  const results: TestResult[] = [];
  for (const t of tests) {
    const o = await run(sql, undefined, buildSetup(c.tables, t.rows));
    if (o.errorKind && o.errorKind !== 'timeout') return fail(o.errorKind);
    if (o.affected.length > 1) return fail('multi');
    if ((o.shape?.rows.length ?? 0) > GRADED_ROWS) return fail('too-big');
    results.push(resultOf(c, t, o, shown(t)));
  }
  return results;
}

export function handleMe(code: string | null, deps: ArcadeDeps): Promise<Reply<MeResponse>> {
  return guarded<MeResponse>(async () => {
    const refused = admit(code, deps);
    if (refused) return refused;
    const { coins, completed } = await deps.services().store.load(learnerId(code!));
    return { status: 200, body: { ok: true, coins, completed } };
  });
}

export function handleChallenge(id: string, code: string | null, deps: ArcadeDeps): Promise<Reply<ChallengeState>> {
  return guarded<ChallengeState>(async () => {
    const refused = admit(code, deps);
    if (refused) return refused;
    const challenge = deps.challenges.find(c => c.id === id);
    if (!challenge) return fail('unknown-exercise');
    const { store } = deps.services();
    const learner = learnerId(code!);
    const state = await store.load(learner);
    if (!unlocked(deps, state, id)) {
      return { status: 200, body: { ok: true, unlocked: false, completed: false, coins: state.coins, lastSql: null, lastFailed: null, opened: [] } };
    }
    const last = await store.lastSubmission(learner, id);
    const opened = openedIn(state, id);
    return {
      status: 200,
      body: {
        ok: true, unlocked: true, completed: state.completed.includes(id), coins: state.coins,
        lastSql: last?.sql ?? null, lastFailed: last?.failed ?? null,
        opened: challenge.tests.filter(t => opened.has(t.id)).map(publicTest),
      },
    };
  });
}

export function handleArcadeRun(body: unknown, code: string | null, deps: ArcadeDeps): Promise<Reply<ArcadeRunResponse>> {
  return guarded<ArcadeRunResponse>(async () => {
    const p = readStatement(body, code, deps);
    if (isFailure(p)) return p;
    const { challenge } = p;
    const { store, run } = deps.services();
    const state = await store.load(learnerId(code!));
    if (!unlocked(deps, state, challenge.id)) return fail('locked');
    const opened = openedIn(state, challenge.id);
    const tests = challenge.tests.filter(t => t.visible || opened.has(t.id));
    const results = await runTests(challenge, tests, p.sql, run, () => true);
    return Array.isArray(results) ? { status: 200, body: { ok: true, tests: results } } : results;
  });
}

export function handleSubmit(body: unknown, code: string | null, deps: ArcadeDeps): Promise<Reply<SubmitResponse>> {
  return guarded<SubmitResponse>(async () => {
    const p = readStatement(body, code, deps);
    if (isFailure(p)) return p;
    const { challenge, sql } = p;
    const { store, run } = deps.services();
    const learner = learnerId(code!);
    const state = await store.load(learner);
    if (!unlocked(deps, state, challenge.id)) return fail('locked');
    const opened = openedIn(state, challenge.id);
    const results = await runTests(challenge, challenge.tests, sql, run, t => t.visible || opened.has(t.id));
    if (!Array.isArray(results)) return results;
    const failed = results.filter(r => !r.passed).map(r => r.id);
    const accepted = failed.length === 0;
    const record = { challenge: challenge.id, sql, passed: results.length - failed.length, total: results.length, accepted, failed };
    const { paid, coins } = await store.submit(learner, record, ARCADE_RULES.reward[challenge.difficulty]);
    return { status: 200, body: { ok: true, tests: results, accepted, reward: paid, coins } };
  });
}

export function handleOpen(body: unknown, code: string | null, deps: ArcadeDeps): Promise<Reply<OpenResponse>> {
  return guarded<OpenResponse>(async () => {
    const b = body as { challenge?: unknown; test?: unknown } | null;
    if (!b || typeof b !== 'object' || typeof b.challenge !== 'string' || typeof b.test !== 'number') return fail('bad-request');
    const refused = admit(code, deps);
    if (refused) return refused;
    const challenge = deps.challenges.find(c => c.id === b.challenge);
    if (!challenge) return fail('unknown-exercise');
    const test = challenge.tests.find(t => t.id === b.test && !t.visible);
    if (!test) return fail('bad-request');
    const { store } = deps.services();
    const learner = learnerId(code!);
    const state = await store.load(learner);
    if (!unlocked(deps, state, challenge.id)) return fail('locked');
    const outcome = await store.open(learner, challenge.id, test.id, ARCADE_RULES.openCost);
    if (outcome === 'not-enough-coins') return fail('not-enough-coins');
    // Read again: another tab may have opened this test or spent coins since the first read.
    const { coins } = await store.load(learner);
    return { status: 200, body: { ok: true, coins, test: publicTest(test) } };
  });
}
