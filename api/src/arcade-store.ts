/** Progress and coins of each access code, in the arcade schema. check-arcade-store runs these rules on the real database. */
import sql from 'mssql';
import { ARCADE_RULES } from '../../src/data/arcade';

export interface LearnerState { coins: number; completed: string[]; opened: { challenge: string; test: number }[] }

export interface SubmissionRecord { challenge: string; sql: string; passed: number; total: number; accepted: boolean; failed: number[] }

export interface Store {
  /** Creates the learner on the first call. */
  load(learner: string): Promise<LearnerState>;
  lastSubmission(learner: string, challenge: string): Promise<{ sql: string; failed: number[] } | null>;
  recordSubmission(learner: string, s: SubmissionRecord): Promise<void>;
  /** The coins actually paid: 0 when the challenge was done before. */
  complete(learner: string, challenge: string, reward: number, sql: string): Promise<number>;
  open(learner: string, challenge: string, test: number, cost: number): Promise<'opened' | 'already' | 'not-enough-coins'>;
}

// A second tab waits on the primary key, then gets this error instead of paying or charging twice.
const isDuplicate = (e: unknown) => (e as { number?: number })?.number === 2627;

export function createStore(config: sql.config): Store & { close(): Promise<void> } {
  let poolPromise: Promise<sql.ConnectionPool> | undefined;
  const getPool = () => {
    poolPromise ??= new sql.ConnectionPool(config).connect().catch(e => { poolPromise = undefined; throw e; });
    return poolPromise;
  };

  /** Runs `work` in a transaction; a primary key clash rolls it back and answers `onDuplicate`. */
  async function inTransaction<T>(onDuplicate: T, work: (tx: sql.Transaction) => Promise<T>, keep: (result: T) => boolean = () => true): Promise<T> {
    const tx = new sql.Transaction(await getPool());
    await tx.begin();
    try {
      const result = await work(tx);
      if (keep(result)) await tx.commit(); else await tx.rollback();
      return result;
    } catch (e) {
      try { await tx.rollback(); } catch { /* already rolled back */ }
      if (isDuplicate(e)) return onDuplicate;
      throw e;
    }
  }

  async function load(learner: string): Promise<LearnerState> {
    const request = (await getPool()).request().input('id', sql.Char(64), learner).input('coins', sql.Int, ARCADE_RULES.startCoins);
    try {
      const r = await request.query(`
        IF NOT EXISTS (SELECT 1 FROM arcade.Learner WHERE LearnerId = @id)
          INSERT INTO arcade.Learner (LearnerId, Coins) VALUES (@id, @coins);
        SELECT Coins FROM arcade.Learner WHERE LearnerId = @id;
        SELECT ChallengeId FROM arcade.Completion WHERE LearnerId = @id;
        SELECT ChallengeId, TestId FROM arcade.OpenedTest WHERE LearnerId = @id;`);
      const [learnerRows, done, opened] = r.recordsets as unknown as [{ Coins: number }[], { ChallengeId: string }[], { ChallengeId: string; TestId: number }[]];
      return {
        coins: learnerRows[0].Coins,
        completed: done.map(d => d.ChallengeId),
        opened: opened.map(o => ({ challenge: o.ChallengeId, test: o.TestId })),
      };
    } catch (e) {
      // Two first calls raced to create the learner; the other one won, so read what it made.
      if (isDuplicate(e)) return load(learner);
      throw e;
    }
  }

  async function lastSubmission(learner: string, challenge: string) {
    const r = await (await getPool()).request()
      .input('id', sql.Char(64), learner).input('challenge', sql.VarChar(100), challenge)
      .query('SELECT TOP (1) Sql, FailedTests FROM arcade.Submission WHERE LearnerId = @id AND ChallengeId = @challenge ORDER BY Id DESC');
    const row = r.recordset[0] as { Sql: string; FailedTests: string } | undefined;
    return row ? { sql: row.Sql, failed: row.FailedTests.split(',').filter(Boolean).map(Number) } : null;
  }

  async function recordSubmission(learner: string, s: SubmissionRecord) {
    await (await getPool()).request()
      .input('id', sql.Char(64), learner).input('challenge', sql.VarChar(100), s.challenge)
      .input('sql', sql.NVarChar(sql.MAX), s.sql).input('passed', sql.Int, s.passed).input('total', sql.Int, s.total)
      .input('accepted', sql.Bit, s.accepted).input('failed', sql.VarChar(100), s.failed.join(','))
      .query(`INSERT INTO arcade.Submission (LearnerId, ChallengeId, Sql, Passed, Total, Accepted, FailedTests)
              VALUES (@id, @challenge, @sql, @passed, @total, @accepted, @failed)`);
  }

  function complete(learner: string, challenge: string, reward: number, text: string) {
    return inTransaction(0, async tx => {
      await new sql.Request(tx)
        .input('id', sql.Char(64), learner).input('challenge', sql.VarChar(100), challenge)
        .input('reward', sql.Int, reward).input('sql', sql.NVarChar(sql.MAX), text)
        .query(`INSERT INTO arcade.Completion (LearnerId, ChallengeId, Reward, Sql) VALUES (@id, @challenge, @reward, @sql);
                UPDATE arcade.Learner SET Coins = Coins + @reward WHERE LearnerId = @id;`);
      return reward;
    });
  }

  function open(learner: string, challenge: string, test: number, cost: number) {
    return inTransaction<'opened' | 'already' | 'not-enough-coins'>('already', async tx => {
      const r = await new sql.Request(tx)
        .input('id', sql.Char(64), learner).input('challenge', sql.VarChar(100), challenge)
        .input('test', sql.Int, test).input('cost', sql.Int, cost)
        .query(`INSERT INTO arcade.OpenedTest (LearnerId, ChallengeId, TestId, Cost) VALUES (@id, @challenge, @test, @cost);
                UPDATE arcade.Learner SET Coins = Coins - @cost WHERE LearnerId = @id AND Coins >= @cost;`);
      return r.rowsAffected[1] === 1 ? 'opened' : 'not-enough-coins';
    }, result => result === 'opened');
  }

  async function close() {
    if (poolPromise) await (await poolPromise).close();
  }

  return { load, lastSubmission, recordSubmission, complete, open, close };
}
