/** The API on this machine for trying the site: http://localhost:7071/api/…, access code "dev" unless ACCESS_CODES is set. */
import { createServer } from 'node:http';
import { createRunner, configFromEnv } from './runner';
import { createLimiter } from './limiter';
import { handleGrade, handlePing, handleRun, handleTablePreview, type Deps } from './core';
import { loadExercises } from './exercises-data';
import { localEnv } from './local-config';
import { devOptions } from './dev-options';

const env = localEnv();
const options = devOptions(env);
const runner = createRunner(configFromEnv(env));
const deps: Deps = {
  codes: (env.ACCESS_CODES ?? 'dev').split(',').map(s => s.trim()).filter(Boolean),
  exercises: loadExercises(),
  allow: createLimiter(),
  run: runner.run,
};

const CORS = {
  'Access-Control-Allow-Origin': options.origin,
  'Access-Control-Allow-Headers': 'content-type, x-access-code',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

createServer(async (req, res) => {
  const send = (status: number, body: unknown) => {
    res.writeHead(status, { ...CORS, 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(body));
  };
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); res.end(); return; }
  let url: URL;
  try { url = new URL(req.url ?? '/', 'http://127.0.0.1'); }
  catch { send(400, { ok: false, kind: 'bad-request' }); return; }
  if (req.method === 'GET' && url.pathname === '/api/table-preview') {
    const r = await handleTablePreview(url.searchParams, (req.headers['x-access-code'] as string | undefined) ?? null, deps);
    send(r.status, r.body);
    return;
  }
  if (req.method === 'GET' && req.url === '/api/ping') {
    const r = await handlePing((req.headers['x-access-code'] as string | undefined) ?? null, { codes: deps.codes, ping: runner.ping });
    send(r.status, r.body);
    return;
  }
  if (req.method === 'POST' && (req.url === '/api/run' || req.url === '/api/grade')) {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    let body: unknown = null;
    try { body = JSON.parse(raw); } catch { /* answered as bad-request */ }
    const code = (req.headers['x-access-code'] as string | undefined) ?? null;
    const r = req.url === '/api/run' ? await handleRun(body, code, deps) : await handleGrade(body, code, deps);
    send(r.status, r.body);
    return;
  }
  send(404, { ok: false, kind: 'bad-request' });
// Loopback only: this server may hold the admin login from ../.env and its default code is public.
}).listen(options.port, '127.0.0.1', () => console.log(`Exercise API on http://127.0.0.1:${options.port}/api`));
