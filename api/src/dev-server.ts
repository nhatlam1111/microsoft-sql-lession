/** The API on this machine for trying the site: http://localhost:7071/api/…, access code "dev" unless ACCESS_CODES is set. */
import { createServer } from 'node:http';
import { createRunner } from './runner';
import { createLimiter } from './limiter';
import { handleGrade, handleRun, type Deps } from './core';
import { loadExercises } from './exercises-data';
import { localConfig, localEnv } from './local-config';

const runner = createRunner(localConfig());
const deps: Deps = {
  codes: (localEnv().ACCESS_CODES ?? 'dev').split(',').map(s => s.trim()).filter(Boolean),
  exercises: loadExercises(),
  allow: createLimiter(),
  run: runner.run,
};

const CORS = {
  'Access-Control-Allow-Origin': 'http://localhost:4321',
  'Access-Control-Allow-Headers': 'content-type, x-access-code',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

createServer(async (req, res) => {
  const send = (status: number, body: unknown) => {
    res.writeHead(status, { ...CORS, 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(body));
  };
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); res.end(); return; }
  if (req.method === 'GET' && req.url === '/api/ping') {
    try { send(200, { ok: true, ms: await runner.ping() }); } catch { send(503, { ok: false, kind: 'unavailable' }); }
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
}).listen(7071, () => console.log(`Exercise API on http://localhost:7071/api (access code: ${deps.codes.join(', ')})`));
