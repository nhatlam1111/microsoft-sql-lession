/** Runs statements on the database: one transaction per run, always rolled back. */
import sql from 'mssql';
import type { RunOutcome } from './core';
import { shapeOf, type RecordsetLike } from './shape';

type Env = Record<string, string | undefined>;

export function configFromEnv(env: Env): sql.config {
  const { SQL_SERVER: server, SQL_DATABASE: database, SQL_USER: user, SQL_PASSWORD: password } = env;
  if (!server || !database || !user || !password) throw new Error('SQL_SERVER, SQL_DATABASE, SQL_USER and SQL_PASSWORD must be set.');
  return {
    server, database, user, password,
    options: { encrypt: true, trustServerCertificate: false },
    connectionTimeout: 90_000,
    requestTimeout: 10_000,
    // No idle connections: they would keep the serverless database awake and burn the free allowance.
    pool: { max: 4, min: 0, idleTimeoutMillis: 30_000 },
  };
}

const empty = (ms: number, extra: Partial<RunOutcome>): RunOutcome =>
  ({ shape: null, affected: [], check: null, error: null, errorKind: null, ms, ...extra });

function connectionKind(e: unknown): 'quota' | 'unavailable' {
  return /free|limit/i.test(String((e as Error)?.message ?? '')) ? 'quota' : 'unavailable';
}

export function createRunner(config: sql.config) {
  let poolPromise: Promise<sql.ConnectionPool> | undefined;
  const getPool = () => {
    poolPromise ??= new sql.ConnectionPool(config).connect().catch(e => { poolPromise = undefined; throw e; });
    return poolPromise;
  };

  async function run(text: string, check?: string): Promise<RunOutcome> {
    const started = Date.now();
    let tx: sql.Transaction;
    try {
      tx = new sql.Transaction(await getPool());
      await tx.begin();
    } catch (e) {
      return empty(Date.now() - started, { errorKind: connectionKind(e) });
    }
    const request = () => { const r = new sql.Request(tx); r.arrayRowMode = true; return r; };
    try {
      // Every run starts from a clean session, whatever an earlier run on this pooled connection set.
      // ROWCOUNT 5001 stops a runaway SELECT (or a cross join) in the database instead of in this instance's memory;
      // no HRM_Demo table has more than about 800 rows, and the grader refuses anything above 5,000 anyway.
      await request().batch(
        'SET XACT_ABORT ON; SET LOCK_TIMEOUT 3000; SET ROWCOUNT 5001; SET NOCOUNT OFF; SET NOEXEC OFF;'
        + ' SET PARSEONLY OFF; SET FMTONLY OFF; SET IMPLICIT_TRANSACTIONS OFF;',
      );
      const main = await request().batch(text);
      // The guard should make this impossible; if the learner's statement still ended the transaction, say so loudly.
      const open = await request().query('SELECT @@TRANCOUNT AS n');
      if ((open.recordset as unknown as number[][])[0]?.[0] !== 1) {
        console.error(`ALERT: a learner statement ended the transaction: ${text.slice(0, 200)}`);
        return empty(Date.now() - started, { errorKind: 'unavailable' });
      }
      const checked = check ? await request().query(check) : null;
      const sets = main.recordsets as unknown as RecordsetLike[];
      return {
        shape: sets.length ? shapeOf(sets[0]) : null,
        affected: main.rowsAffected,
        check: checked ? shapeOf(checked.recordset as unknown as RecordsetLike) : null,
        error: null, errorKind: null, ms: Date.now() - started,
      };
    } catch (e) {
      const err = e as { code?: string; message?: string; number?: number };
      if (err.code === 'ETIMEOUT') return empty(Date.now() - started, { errorKind: 'timeout' });
      if (err.number === undefined && (err.code === 'ESOCKET' || err.code === 'ECONNCLOSED')) {
        return empty(Date.now() - started, { errorKind: connectionKind(e) });
      }
      return empty(Date.now() - started, { error: err.message ?? String(e) });
    } finally {
      // With XACT_ABORT an error has already rolled the transaction back; rollback then throws and is ignored.
      try { await tx.rollback(); } catch { /* already rolled back */ }
    }
  }

  async function ping(): Promise<number> {
    const started = Date.now();
    await (await getPool()).request().query('SELECT 1 AS ok');
    return Date.now() - started;
  }

  async function close() {
    if (poolPromise) await (await poolPromise).close();
  }

  return { run, ping, close, getPool };
}
