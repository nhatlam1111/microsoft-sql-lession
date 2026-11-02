/** The quality gate of a challenge: its answer and its wrong statements run on the data of every test. */
import { guardArcade } from '../../src/lib/sql-guard';
import { compareResults, type Cell, type Shape, type Verdict } from '../../src/lib/grade';
import type { Challenge, ChallengeTest } from '../../src/lib/arcade-types';
import { buildSetup } from './arcade-sql';
import type { RunOutcome } from './core';

export type ArcadeRun = (text: string, check?: string, setup?: string) => Promise<RunOutcome>;

const NOTHING: Shape = { columns: [], rows: [] };

/** A test's expected result in the form the grader compares; the column types let numbers compare as numbers. */
export function expectedShape(c: Challenge, t: ChallengeTest): Shape {
  return { columns: c.columns.map((name, i) => ({ name, type: c.resultTypes[i] ?? '' })), rows: t.expected };
}

const runOn = (c: Challenge, t: ChallengeTest, sql: string, run: ArcadeRun, reverse = false) =>
  run(sql, undefined, buildSetup(c.tables, t.rows, { reverse }));

const failureOf = (o: RunOutcome) => o.errorKind ?? o.error;
const compare = (c: Challenge, t: ChallengeTest, o: RunOutcome): Verdict => compareResults(o.shape ?? NOTHING, expectedShape(c, t), c.ordered);
const passes = (c: Challenge, t: ChallengeTest, o: RunOutcome) => !failureOf(o) && compare(c, t, o).correct;

async function checkAnswer(c: Challenge, run: ArcadeRun): Promise<string[]> {
  const problems: string[] = [];
  let unitRows = 0;
  for (const t of c.tests) {
    const o = await runOn(c, t, c.answer, run);
    const failure = failureOf(o);
    if (failure) {
      problems.push(`test ${t.id}: đáp án lỗi: ${failure}`);
      continue;
    }
    const verdict = compare(c, t, o);
    if (!verdict.correct) problems.push(`test ${t.id}: đáp án khác expected (${verdict.reason})`);
    if (t.visible) unitRows += o.shape?.rows.length ?? 0;
    if (c.ordered && !passes(c, t, await runOn(c, t, c.answer, run, true))) problems.push(`test ${t.id}: kết quả phụ thuộc thứ tự chèn`);
  }
  if (unitRows === 0) problems.push('không unit test nào ra dữ liệu');
  return problems;
}

async function checkCatches(c: Challenge, t: ChallengeTest, run: ArcadeRun): Promise<string[]> {
  const at = `catches của test ${t.id}`;
  const guard = guardArcade(t.catches ?? '');
  if (!guard.ok) return [`${at}: bộ chặn từ chối: ${guard.reason}`];
  const problems: string[] = [];
  for (const unit of c.tests.filter(u => u.visible)) {
    if (!passes(c, unit, await runOn(c, unit, t.catches!, run))) problems.push(`${at} trượt unit test ${unit.id}`);
  }
  if (passes(c, t, await runOn(c, t, t.catches!, run))) problems.push(`${at} không bắt được test ${t.id}`);
  return problems;
}

/** Everything wrong with one challenge; empty when it may ship. */
export async function checkOne(c: Challenge, run: ArcadeRun): Promise<string[]> {
  const guard = guardArcade(c.answer);
  if (!guard.ok) return [`bộ chặn từ chối đáp án: ${guard.reason}`];
  const problems = await checkAnswer(c, run);
  for (const t of c.tests.filter(h => !h.visible)) problems.push(...await checkCatches(c, t, run));
  return problems;
}

/** What the answer returns on each test; throws when it fails, so a broken answer never becomes an expected result. */
export async function fillExpected(c: Challenge, run: ArcadeRun): Promise<{ resultTypes: string[]; expected: Record<number, Cell[][]> }> {
  const expected: Record<number, Cell[][]> = {};
  let resultTypes: string[] = [];
  for (const t of c.tests) {
    const o = await runOn(c, t, c.answer, run);
    const failure = failureOf(o);
    if (failure || !o.shape) throw new Error(`${c.id} test ${t.id}: ${failure ?? 'không có kết quả'}`);
    expected[t.id] = o.shape.rows;
    resultTypes = o.shape.columns.map(column => column.type);
  }
  return { resultTypes, expected };
}
