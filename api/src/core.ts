/** The API's request handling, free of Azure and of the database driver so it can be tested with fakes. */
import { guardExercise, normalizeSql } from '../../src/lib/sql-guard';
import { compareChanges, compareResults, type Shape } from '../../src/lib/grade';
import type { ApiFailure, Exercise, FailureKind, GradeResponse, RunResponse, TablePreviewResponse } from '../../src/lib/exercise-types';
import { prepareTablePreview, PREVIEW_PAGE_SIZE } from './table-preview';

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
// A timeout is 504, not 408: a browser may silently send a request again after a 408.
const STATUS: Record<FailureKind, number> = {
  'bad-request': 400, 'bad-code': 401, 'unknown-exercise': 404, rate: 429,
  blocked: 422, multi: 422, 'too-big': 422, timeout: 504, quota: 503, unavailable: 503, network: 503,
};

const fail = (kind: FailureKind, reason?: string): { status: number; body: ApiFailure } =>
  ({ status: STATUS[kind], body: reason === undefined ? { ok: false, kind } : { ok: false, kind, reason } });

function authorize(code: string | null, deps: Pick<Deps, 'codes' | 'allow'>): { status: number; body: ApiFailure } | null {
  if (!code || !deps.codes.includes(code)) return fail('bad-code');
  if (!deps.allow(code)) return fail('rate');
  return null;
}

function prepare(body: unknown, code: string | null, deps: Deps): { exercise: Exercise; sql: string } | { status: number; body: ApiFailure } {
  const b = body as { exercise?: unknown; sql?: unknown } | null;
  if (!b || typeof b !== 'object' || typeof b.exercise !== 'string' || typeof b.sql !== 'string') return fail('bad-request');
  const denied = authorize(code, deps);
  if (denied) return denied;
  const exercise = deps.exercises[b.exercise];
  if (!exercise) return fail('unknown-exercise');
  const guard = guardExercise(b.sql);
  if (!guard.ok) return fail('blocked', guard.reason);
  // The database gets exactly the text the guard read.
  return { exercise, sql: normalizeSql(b.sql) };
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

/** Wakes the database; needs a valid code so strangers cannot keep it awake and use up the free allowance. */
export async function handlePing(
  code: string | null,
  deps: { codes: string[]; ping(): Promise<number> },
): Promise<{ status: number; body: { ok: true; ms: number } | ApiFailure }> {
  if (!code || !deps.codes.includes(code)) return fail('bad-code');
  try {
    return { status: 200, body: { ok: true, ms: await deps.ping() } };
  } catch (e) {
    return fail(/free|limit/i.test(String((e as Error)?.message)) ? 'quota' : 'unavailable');
  }
}

export async function handleRun(body: unknown, code: string | null, deps: Deps): Promise<Reply<RunResponse>> {
  const p = prepare(body, code, deps);
  if ('status' in p) return p;
  const outcome = await deps.run(p.sql);
  return outcomeFailure(outcome) ?? { status: 200, body: toRun(outcome) };
}

/** Fixed read-only SELECT through the normal runner, including its timeout, cell conversion and finally rollback. */
export async function handleTablePreview(query: URLSearchParams, code: string | null, deps: Deps): Promise<Reply<TablePreviewResponse>> {
  const denied = authorize(code, deps);
  if (denied) return denied;
  const prepared = prepareTablePreview(query);
  if (!prepared) return fail('bad-request');
  try {
    const outcome = await deps.run(prepared.sql);
    if (outcome.errorKind) return fail(outcome.errorKind);
    if (outcome.error || !outcome.shape || outcome.affected.length > 1) return fail('unavailable');
    return {
      status: 200,
      body: {
        ok: true, table: prepared.table,
        columns: outcome.shape.columns.map(column => column.name),
        rows: outcome.shape.rows.slice(0, PREVIEW_PAGE_SIZE),
        page: prepared.page, pageSize: PREVIEW_PAGE_SIZE,
        hasMore: outcome.shape.rows.length > PREVIEW_PAGE_SIZE, ms: outcome.ms,
      },
    };
  } catch {
    return fail('unavailable');
  }
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
