/** Runs every answer (and check query) against the real database the way the API does, rolled back. */
import { guardExercise } from '../../src/lib/sql-guard';
import { createRunner } from './runner';
import { loadExercises } from './exercises-data';
import { localConfig } from './local-config';

const runner = createRunner(localConfig());
let failed = 0;
for (const e of Object.values(loadExercises())) {
  const guard = guardExercise(e.answer);
  if (!guard.ok) {
    failed++;
    console.log(`${e.id}: bộ chặn từ chối đáp án: ${guard.reason}`);
    continue;
  }
  const o = await runner.run(e.answer, e.check);
  const count = e.kind === 'query' ? o.shape?.rows.length ?? 0 : o.affected[0] ?? 0;
  let problem = o.errorKind ?? o.error;
  if (!problem && count === 0) problem = e.kind === 'query' ? 'ra 0 dòng' : '0 dòng bị ảnh hưởng';
  if (!problem && e.kind === 'change' && !o.check?.rows.length) problem = 'câu kiểm tra ra 0 dòng';
  if (problem) failed++;
  const ok = e.kind === 'query' ? `${count} dòng` : `${count} dòng bị ảnh hưởng, câu kiểm tra ra ${o.check?.rows.length} dòng`;
  console.log(`${e.id}: ${problem ?? ok}`);
}
await runner.close();
process.exit(failed ? 1 : 0);
