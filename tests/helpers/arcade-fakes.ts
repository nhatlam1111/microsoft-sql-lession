import { ARCADE_RULES } from '../../src/data/arcade';
import type { Challenge, ChallengeTest } from '../../src/lib/arcade-types';
import type { ArcadeRun } from '../../api/src/arcade-check';
import { buildSetup } from '../../api/src/arcade-sql';
import type { LearnerState, Store, SubmissionRecord } from '../../api/src/arcade-store';
import type { RunOutcome } from '../../api/src/core';

const unit = (id: number): ChallengeTest => ({ id, visible: true, rows: { T: [[`mo${id}`]] }, expected: [[`mo${id}`]] });
const hidden = (id: number): ChallengeTest =>
  ({ id, visible: false, rows: { T: [[`BAT-MAT-${id}`]] }, expected: [[`BAT-MAT-${id}`]], catches: 'SELECT TOP 0 a FROM T' });

/** Two unit tests and three hidden tests; the text BAT-MAT sits only in the hidden ones. */
export const fakeChallenge = (id: string, order: number): Challenge => ({
  id, chapter: '2-1', order, title: id, difficulty: 'de', lessons: ['2-1-chon-cot-dat-ten-cot'], prompt: 'p',
  columns: ['a'], resultTypes: ['varchar'], ordered: false, tables: { T: { a: 'varchar(20) NOT NULL' } },
  answer: 'SELECT a FROM T', tests: [unit(1), unit(2), hidden(3), hidden(4), hidden(5)],
});

/** Keeps one learner in memory and remembers every learner id it was given. */
export function fakeStore(initial: Partial<LearnerState> = {}) {
  const state: LearnerState = { coins: ARCADE_RULES.startCoins, completed: [], opened: [], ...initial };
  const submissions: SubmissionRecord[] = [];
  const learners: string[] = [];
  const store: Store = {
    async load(learner) {
      learners.push(learner);
      return { coins: state.coins, completed: [...state.completed], opened: [...state.opened] };
    },
    async lastSubmission(learner, challenge) {
      learners.push(learner);
      const last = submissions.filter(s => s.challenge === challenge).at(-1);
      return last ? { sql: last.sql, failed: last.failed } : null;
    },
    async submit(learner, s, reward) {
      learners.push(learner);
      submissions.push(s);
      if (!s.accepted || state.completed.includes(s.challenge)) return { paid: 0, coins: state.coins };
      state.completed.push(s.challenge);
      state.coins += reward;
      return { paid: reward, coins: state.coins };
    },
    async open(learner, challenge, test, cost) {
      learners.push(learner);
      if (state.opened.some(o => o.challenge === challenge && o.test === test)) return 'already';
      if (state.coins < cost) return 'not-enough-coins';
      state.opened.push({ challenge, test });
      state.coins -= cost;
      return 'opened';
    },
  };
  return { store, state, submissions, learners };
}

/** A database that answers every test correctly unless `script` says otherwise for that test id. */
export function fakeRun(challenge: Challenge, script: Record<number, Partial<RunOutcome>> = {}) {
  const calls: number[] = [];
  const run: ArcadeRun = async (_text, _check, setup = '') => {
    const test = challenge.tests.find(t => setup === buildSetup(challenge.tables, t.rows));
    if (!test) throw new Error('a test ran on data no test has');
    calls.push(test.id);
    return {
      shape: { columns: [{ name: 'a', type: 'varchar' }], rows: test.expected },
      affected: [test.expected.length], check: null, error: null, errorKind: null, ms: 3, ...script[test.id],
    };
  };
  return { run, calls };
}
