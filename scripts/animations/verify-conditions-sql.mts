/** Read-only verification of the exact queries used by the SELECT animation. */
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { createHash } from 'node:crypto';
import { createRunner } from '../../api/src/runner';
import { localConfig } from '../../api/src/local-config';

const body = readFileSync('src/content/lessons/2-3-and-or-in-between-like.mdx', 'utf8').replace(/\r\n?/g, '\n');
const match = body.match(/<AnimatedFlow query=\{(`[^]*?`)\} steps=\{([^]*?)\} animation="2-3-conditions"/)!;
const query = runInNewContext(match[1]);
const steps = JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
const runner = createRunner(localConfig());
const evidence = [];
try {
  const pool = await runner.getPool();
  for (const step of steps) {
    assert.match(step.sql, /^SELECT\s/);
    assert.equal(step.sql.split(';').filter((s: string) => s.trim()).length, 1);
    const result = await pool.request().query(step.sql);
    const columns = Object.keys(result.recordset.columns);
    const rows = result.recordset.map((row: Record<string, unknown>) => columns.map(column => {
      const value = row[column];
      return value instanceof Date ? value.toISOString().slice(0, 10) : value;
    }));
    assert.deepEqual(columns, step.columns);
    assert.equal(rows.length, step.total);
    for (const excerpt of step.rows) assert(rows.some((row: unknown[]) => JSON.stringify(row) === JSON.stringify(excerpt)));
    evidence.push({clause: step.clause, sql: step.sql, columns, count: rows.length, excerpt: step.rows});
  }
  const conditions = [
    {sql: "SELECT MaNV FROM NhanVien WHERE MaPB IN ('KD', 'IT');", expected: steps[1].checks.totals[0]},
    {sql: "SELECT MaNV FROM NhanVien WHERE NgayVaoLam BETWEEN '20230101' AND '20230630';", expected: steps[1].checks.totals[1]},
  ];
  const conditionCounts = [];
  for (const condition of conditions) {
    const result = await pool.request().query(condition.sql);
    assert.equal(result.recordset.length, condition.expected);
    conditionCounts.push({sql: condition.sql, count: result.recordset.length});
  }
  assert.equal(steps.at(-1).sql, query);
  writeFileSync('docs/verification/2026-11-15-conditions-animation-sql.json', JSON.stringify({
    checkedAt: new Date().toISOString(),
    inputHash: createHash('sha256').update(JSON.stringify({query,steps})).digest('hex'),
    statements: evidence, conditionCounts,
  }, null, 2) + '\n');
  console.log('SQL live verified for FROM, WHERE and SELECT excerpts.');
} catch (error) {
  const safe = error as { name?: string; code?: string };
  console.error(`SQL verification failed (${safe.name ?? 'Error'}, ${safe.code ?? 'no code'}). No credentials logged.`);
  process.exitCode = 1;
} finally {
  await runner.close();
}

