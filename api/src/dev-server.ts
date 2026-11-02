/** The API on this machine for trying the site: http://localhost:7071/api/…, access code "dev" unless ACCESS_CODES is set. */
import { createServer, type IncomingMessage } from 'node:http';
import { createRunner } from './runner';
import { createLimiter } from './limiter';
import { handleGrade, handlePing, handleRun, type Deps } from './core';
import { loadExercises } from './exercises-data';
import { handleArcadeRun, handleChallenge, handleMe, handleOpen, handleSubmit, type ArcadeDeps } from './arcade';
import { arcadeServices } from './arcade-config';
import { loadChallenges } from './arcade-data';
import { localConfig, localEnv } from './local-config';

const runner = createRunner(localConfig());
const deps: Deps = {
  codes: (localEnv().ACCESS_CODES ?? 'dev').split(',').map(s => s.trim()).filter(Boolean),
  exercises: loadExercises(),
  allow: createLimiter(),
  run: runner.run,
};
const arcade: ArcadeDeps = { codes: deps.codes, allow: deps.allow, challenges: loadChallenges(), services: arcadeServices(localEnv()) };

const CORS = {
  'Access-Control-Allow-Origin': 'http://localhost:4321',
  'Access-Control-Allow-Headers': 'content-type, x-access-code',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

async function bodyOf(req: IncomingMessage): Promise<unknown> {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  try { return JSON.parse(raw); } catch { return null; /* answered as bad-request */ }
}

const ARCADE_POSTS = { '/api/arcade/run': handleArcadeRun, '/api/arcade/submit': handleSubmit, '/api/arcade/open': handleOpen };

createServer(async (req, res) => {
  const send = (status: number, body: unknown) => {
    res.writeHead(status, { ...CORS, 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(body));
  };
  const code = (req.headers['x-access-code'] as string | undefined) ?? null;
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); res.end(); return; }
  if (req.method === 'GET' && req.url === '/api/ping') {
    const r = await handlePing(code, { codes: deps.codes, ping: runner.ping });
    send(r.status, r.body);
    return;
  }
  if (req.method === 'POST' && (req.url === '/api/run' || req.url === '/api/grade')) {
    const body = await bodyOf(req);
    const r = req.url === '/api/run' ? await handleRun(body, code, deps) : await handleGrade(body, code, deps);
    send(r.status, r.body);
    return;
  }
  if (req.method === 'GET' && req.url === '/api/arcade/me') {
    const r = await handleMe(code, arcade);
    send(r.status, r.body);
    return;
  }
  const challenge = req.method === 'GET' ? req.url?.match(/^\/api\/arcade\/challenges\/([^/?]+)$/) : null;
  if (challenge) {
    const r = await handleChallenge(decodeURIComponent(challenge[1]), code, arcade);
    send(r.status, r.body);
    return;
  }
  const arcadePost = req.method === 'POST' ? ARCADE_POSTS[req.url as keyof typeof ARCADE_POSTS] : undefined;
  if (arcadePost) {
    const r = await arcadePost(await bodyOf(req), code, arcade);
    send(r.status, r.body);
    return;
  }
  send(404, { ok: false, kind: 'bad-request' });
// Loopback only: this server may hold the admin login from ../.env and its default code is public.
}).listen(7071, '127.0.0.1', () => console.log(`Exercise API on http://localhost:7071/api (access code: ${deps.codes.join(', ')})`));
