import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Serves the sample database script so learners can download it from the site. */
export function GET(): Response {
  const sql = readFileSync(join(process.cwd(), 'database', 'HRM_Demo.sql'), 'utf8');
  return new Response(sql, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
