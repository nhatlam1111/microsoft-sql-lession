/** The API's request handling, free of Azure and of the database driver so it can be tested with fakes. */
import { guardExercise } from '../../src/lib/sql-guard';
import { compareChanges, compareResults, type Shape } from '../../src/lib/grade';
import type { ApiFailure, Exercise, FailureKind, GradeResponse, RunResponse } from '../../src/lib/exercise-types';

export interface RunOutcome {
  shape: Shape | null;
  /** Row counts of the statement that ran, one per statement; the check query is not counted. */
  affected: number[];
  check: Shape | null;
  error: string | null;
  errorKind: 'timeout' | 'quota' | 'unavailable' | null;
  ms: number;
}

export interface Deps {
  codes: string[];
  exercises: Record<string, Exercise>;
  allow: (code: string) => boolean;
  run(sql: string, check?: string): Promise<RunOutcome>;
}

type Reply<T> = { status: number; body: T | ApiFailure };

const SHOWN_ROWS = 200;
const GRADED_ROWS = 5000;
const STATUS: Record<FailureKind, number> = {
  'bad-request': 400, 'bad-code': 401, 'unknown-exercise': 404, rate: 429,
  blocked: 422, multi: 422, 'too-big': 422, timeout: 408, quota: 503, unavailable: 503, network: 503,
};

const fail = (kind: FailureKind, reason?: string): { status: number; body: ApiFailure } =>
  ({ status: STATUS[kind], body: reason === undefined ? { ok: false, kind } : { ok: false, kind, reason } });

function prepare(body: unknown, code: string | null, deps: Deps): { exercise: Exercise; sql: string } | { status: number; body: ApiFailure } {
  const b = body as { exercise?: unknown; sql?: unknown } | null;
  if (!b || typeof b !== 'object' || typeof b.exercise !== 'string' || typeof b.sql !== 'string') return fail('bad-request');
  if (!code || !deps.codes.includes(code)) return fail('bad-code');
  if (!deps.allow(code)) return fail('rate');
  const exercise = deps.exercises[b.exercise];
  if (!exercise) return fail('unknown-exercise');
  const guard = guardExercise(b.sql);
  if (!guard.ok) return fail('blocked', guard.reason);
  return { exercise, sql: b.sql };
}

/** A database-side failure or several statements; null when the outcome can be shown. */
function outcomeFailure(o: RunOutcome): { status: number; body: ApiFailure } | null {
  if (o.errorKind) return fail(o.errorKind);
  if (o.affected.length > 1) return fail('multi');
  return null;
}

function toRun(o: RunOutcome): RunResponse {
  const rows = o.shape?.rows ?? [];
  return {
    ok: true,
    columns: o.shape?.columns.map(c => c.name) ?? [],
    rows: rows.slice(0, SHOWN_ROWS),
    truncated: rows.length > SHOWN_ROWS,
    affected: o.affected[0] ?? null,
    error: o.error,
    ms: o.ms,
  };
}

export async function handleRun(body: unknown, code: string | null, deps: Deps): Promise<Reply<RunResponse>> {
  const p = prepare(body, code, deps);
  if ('status' in p) return p;
  const outcome = await deps.run(p.sql);
  return outcomeFailure(outcome) ?? { status: 200, body: toRun(outcome) };
}

export async function handleGrade(body: unknown, code: string | null, deps: Deps): Promise<Reply<GradeResponse>> {
  const p = prepare(body, code, deps);
  if ('status' in p) return p;
  const { exercise } = p;
  const mine = await deps.run(p.sql, exercise.check);
  const failure = outcomeFailure(mine);
  if (failure) return failure;
  if (mine.error) return { status: 200, body: { ...toRun(mine), correct: false, reason: 'câu lệnh bị lỗi, xem tab Messages' } };
  if ((mine.shape?.rows.length ?? 0) > GRADED_ROWS) return fail('too-big');
  const answer = await deps.run(exercise.answer, exercise.check);
  // The answer is checked before every deploy; if it still fails here the server, not the learner, is at fault.
  if (answer.error || answer.errorKind) return fail(answer.errorKind ?? 'unavailable');
  const verdict = exercise.kind === 'query'
    ? compareResults(mine.shape ?? { columns: [], rows: [] }, answer.shape ?? { columns: [], rows: [] }, exercise.ordered)
    : compareChanges(
      { affected: mine.affected[0] ?? 0, check: mine.check ?? { columns: [], rows: [] } },
      { affected: answer.affected[0] ?? 0, check: answer.check ?? { columns: [], rows: [] } },
    );
  return { status: 200, body: { ...toRun(mine), ...verdict } };
}
