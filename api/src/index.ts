/** Azure Functions entry: GET /api/ping, POST /api/run, POST /api/grade. */
import { app, type HttpRequest } from '@azure/functions';
import { createRunner, configFromEnv } from './runner';
import { createLimiter } from './limiter';
import { handleGrade, handlePing, handleRun, type Deps } from './core';
import { loadExercises } from './exercises-data';

const runner = createRunner(configFromEnv(process.env));
const deps: Deps = {
  codes: (process.env.ACCESS_CODES ?? '').split(',').map(s => s.trim()).filter(Boolean),
  exercises: loadExercises(),
  allow: createLimiter(),
  run: runner.run,
};

const bodyOf = async (req: HttpRequest) => {
  try { return await req.json(); } catch { return null; }
};

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
