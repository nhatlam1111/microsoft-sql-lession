/**
 * Runs every challenge on the real arcade database, rolled back. A chapter id (2-3) limits the run;
 * --write fills resultTypes and expected from the answers first, so read them over before you trust them.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { parse, parseDocument, visit, type Document, type Node } from 'yaml';
import { sortChallenges } from '../../src/lib/arcade-play';
import type { Challenge } from '../../src/lib/arcade-types';
import { checkOne, fillExpected } from './arcade-check';
import { arcadeServices } from './arcade-config';
import { retryWhileWaking } from './arcade-store';
import { localEnv } from './local-config';

const DIR = new URL('../../src/content/arcade/', import.meta.url);
const args = process.argv.slice(2);
const write = args.includes('--write');
const chapter = args.find(a => !a.startsWith('--'));

const files = (readdirSync(DIR, { recursive: true }) as string[])
  .filter(f => f.endsWith('.yaml'))
  .map(f => {
    const url = new URL(f.replaceAll('\\', '/'), DIR);
    return { url, challenge: parse(readFileSync(url, 'utf8')) as Challenge };
  })
  .filter(f => !chapter || f.challenge.chapter === chapter);

const services = arcadeServices(localEnv())();

async function tablesLeft(): Promise<number> {
  const pool = await retryWhileWaking(() => services.pool());
  const r = await pool.request().query("SELECT COUNT(*) AS n FROM sys.tables WHERE schema_id = SCHEMA_ID('dbo')");
  return (r.recordset[0] as { n: number }).n;
}

/** Quoted, because Astro's YAML reader would turn a bare 2026-10-21 into a Date, which the schema refuses. */
function quotedNode(doc: Document, value: unknown): Node {
  const node = doc.createNode(value, { flow: true });
  visit(node, { Scalar(_, scalar) { if (typeof scalar.value === 'string') scalar.type = 'QUOTE_DOUBLE'; } });
  return node;
}

async function fill(url: URL, challenge: Challenge): Promise<Challenge> {
  const { resultTypes, expected } = await fillExpected(challenge, services.run);
  const doc = parseDocument(readFileSync(url, 'utf8'));
  doc.set('resultTypes', quotedNode(doc, resultTypes));
  challenge.tests.forEach((t, i) => doc.setIn(['tests', i, 'expected'], quotedNode(doc, expected[t.id])));
  writeFileSync(url, doc.toString({ lineWidth: 0 }));
  return parse(readFileSync(url, 'utf8')) as Challenge;
}

let failed = 0;
const before = await tablesLeft();
if (before) { failed++; console.log(`dữ liệu test còn sót trong dbo: ${before} bảng trước khi chạy`); }

for (const { url, challenge } of sortChallenges(files.map(f => ({ ...f, chapter: f.challenge.chapter, order: f.challenge.order })))) {
  const current = write ? await fill(url, challenge) : challenge;
  const problems = await checkOne(current, services.run);
  failed += problems.length;
  console.log(problems.length ? problems.map(p => `${current.id}: ${p}`).join('\n') : `${current.id}: đạt`);
}

const after = await tablesLeft();
if (after) { failed++; console.log(`dữ liệu test còn sót trong dbo: ${after} bảng sau khi chạy`); }
await services.close();
process.exit(failed ? 1 : 0);
