/** Azure Functions entry: GET /api/ping, POST /api/run, POST /api/grade, and the /api/arcade/… calls. */
import { app, type HttpRequest } from '@azure/functions';
import { createRunner, configFromEnv } from './runner';
import { createLimiter } from './limiter';
import { handleGrade, handlePing, handleRun, type Deps } from './core';
import { loadExercises } from './exercises-data';
import { handleArcadeRun, handleChallenge, handleMe, handleOpen, handleSubmit, type ArcadeDeps } from './arcade';
import { arcadeServices } from './arcade-config';
import { loadChallenges } from './arcade-data';

const runner = createRunner(configFromEnv(process.env));
const deps: Deps = {
  codes: (process.env.ACCESS_CODES ?? '').split(',').map(s => s.trim()).filter(Boolean),
  exercises: loadExercises(),
  allow: createLimiter(),
  run: runner.run,
};
const arcade: ArcadeDeps = {
  codes: deps.codes,
  allow: deps.allow,
  challenges: loadChallenges(),
  services: arcadeServices(process.env),
};

const bodyOf = async (req: HttpRequest) => {
  try { return await req.json(); } catch { return null; }
};
const codeOf = (req: HttpRequest) => req.headers.get('x-access-code');

app.http('ping', {
  methods: ['GET'], authLevel: 'anonymous', route: 'ping',
  handler: async req => {
    const r = await handlePing(req.headers.get('x-access-code'), { codes: deps.codes, ping: runner.ping });
    return { status: r.status, jsonBody: r.body };
  },
});

app.http('run', {
  methods: ['POST'], authLevel: 'anonymous', route: 'run',
  handler: async req => {
    const r = await handleRun(await bodyOf(req), req.headers.get('x-access-code'), deps);
    return { status: r.status, jsonBody: r.body };
  },
});

app.http('grade', {
  methods: ['POST'], authLevel: 'anonymous', route: 'grade',
  handler: async req => {
    const r = await handleGrade(await bodyOf(req), req.headers.get('x-access-code'), deps);
    return { status: r.status, jsonBody: r.body };
  },
});

app.http('arcadeMe', {
  methods: ['GET'], authLevel: 'anonymous', route: 'arcade/me',
  handler: async req => {
    const r = await handleMe(codeOf(req), arcade);
    return { status: r.status, jsonBody: r.body };
  },
});

app.http('arcadeChallenge', {
  methods: ['GET'], authLevel: 'anonymous', route: 'arcade/challenges/{id}',
  handler: async req => {
    const r = await handleChallenge(req.params.id, codeOf(req), arcade);
    return { status: r.status, jsonBody: r.body };
  },
});

app.http('arcadeRun', {
  methods: ['POST'], authLevel: 'anonymous', route: 'arcade/run',
  handler: async req => {
    const r = await handleArcadeRun(await bodyOf(req), codeOf(req), arcade);
    return { status: r.status, jsonBody: r.body };
  },
});

app.http('arcadeSubmit', {
  methods: ['POST'], authLevel: 'anonymous', route: 'arcade/submit',
  handler: async req => {
    const r = await handleSubmit(await bodyOf(req), codeOf(req), arcade);
    return { status: r.status, jsonBody: r.body };
  },
});

app.http('arcadeOpen', {
  methods: ['POST'], authLevel: 'anonymous', route: 'arcade/open',
  handler: async req => {
    const r = await handleOpen(await bodyOf(req), codeOf(req), arcade);
    return { status: r.status, jsonBody: r.body };
  },
});
