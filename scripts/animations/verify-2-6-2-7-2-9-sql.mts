/** Compare the lesson's read-only queries and every illustrated row with SQL Server. */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { createRunner } from '../../api/src/runner';
import { localConfig } from '../../api/src/local-config';

const lessons = [
  ['2-6-distinct-bo-dong-trung', '2-6-distinct'],
  ['2-7-ham-chuoi-tieng-viet', '2-7-strings'],
  ['2-9-case-when-ham-if', '2-9-case'],
];
const runner = createRunner(localConfig());
try {
  const pool = await runner.getPool();
  for (const [slug, id] of lessons) {
    const body = readFileSync(`src/content/lessons/${slug}.mdx`, 'utf8').replace(/\r\n?/g, '\n');
    const match = body.match(new RegExp(`<AnimatedFlow query=\\{(\u0060[^]*?\u0060)\\} steps=\\{([^]*?)\\} animation="${id}"`));
    assert(match, `Missing flow ${id}`);
    const query: string = runInNewContext(match[1]);
    const steps = JSON.parse(JSON.stringify(runInNewContext(`(${match[2]})`)));
    const evidence = [];
    for (const step of steps) {
      assert.match(step.sql, /^SELECT\s/i);
      assert.equal(step.sql.split(';').filter((s: string) => s.trim()).length, 1);
      const result = await pool.request().query(step.sql);
      const columns = Object.keys(result.recordset.columns);
      const rows = result.recordset.map((row: Record<string, unknown>) => columns.map(column => {
        const value = row[column];
        return value instanceof Date ? value.toISOString().slice(0, 10) : value;
      }));
      assert.deepEqual(columns, step.columns);
      assert.equal(rows.length, step.total);
      const indices = step.rows.map((excerpt: unknown[]) => rows.findIndex((row: unknown[]) => JSON.stringify(row) === JSON.stringify(excerpt)));
      assert(indices.every((index: number) => index >= 0));
      if (step.clause === 'ORDER BY') assert(indices.every((index: number, i: number) => i === 0 || index > indices[i - 1]));
      evidence.push({ clause: step.clause, sql: step.sql, columns, count: rows.length, excerpt: step.rows });
    }
    assert.equal(steps.at(-1).sql, query);
    writeFileSync(`docs/verification/2026-11-16-${id}-animation-sql.json`, JSON.stringify({
      checkedAt: new Date().toISOString(),
      inputHash: createHash('sha256').update(JSON.stringify({ query, steps })).digest('hex'),
      statements: evidence,
    }, null, 2) + '\n');
    console.log(`${id}: verified ${steps.length} read-only queries and illustrated rows.`);
  }
} catch (error) {
  const safe = error as { name?: string; code?: string };
  console.error(`SQL verification failed (${safe.name ?? 'Error'}, ${safe.code ?? 'no code'}). No credentials logged.`);
  process.exitCode = 1;
} finally {
  await runner.close();
}
