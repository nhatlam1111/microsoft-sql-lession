import { afterEach, expect, it, vi } from 'vitest';

const harness = vi.hoisted(() => ({
  azure: new Map<string, { methods: string[]; route: string; handler: (request: unknown) => Promise<unknown> }>(),
  devHandler: null as null | ((req: unknown, res: unknown) => Promise<void>),
  env: {} as Record<string, string | undefined>,
  listen: vi.fn(),
  createRunner: vi.fn(),
  run: vi.fn(async () => ({ shape: { columns: [{ name: 'MaPB', type: 'varchar' }], rows: [['IT']] }, affected: [1], check: null, error: null, errorKind: null, ms: 2 })),
}));
// This package is installed under api/, so target its actual resolved entry rather than the root package namespace.
vi.mock('../api/node_modules/@azure/functions/dist/azure-functions.js', () => ({ app: { http: (name: string, options: typeof harness.azure extends Map<string, infer V> ? V : never) => harness.azure.set(name, options) } }));
vi.mock('node:http', () => ({ createServer: (handler: typeof harness.devHandler) => {
  harness.devHandler = handler;
  return { listen: (port: number, host: string, ready: () => void) => { harness.listen(port, host); ready(); } };
} }));
vi.mock('../api/src/runner', () => ({
  configFromEnv: () => ({}),
  createRunner: () => { harness.createRunner(); return { run: harness.run, ping: async () => 1 }; },
}));
vi.mock('../api/src/exercises-data', () => ({ loadExercises: () => ({}) }));
vi.mock('../api/src/local-config', () => ({ localConfig: () => ({}), localEnv: () => harness.env }));

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllEnvs(); });

async function bootDev(env: Record<string, string | undefined> = {}) {
  vi.resetModules();
  harness.env = { ACCESS_CODES: 'unit-test-code', ...env };
  harness.listen.mockClear();
  harness.createRunner.mockClear();
  return import('../api/src/dev-server');
}

async function devGet(url: string) {
  let status: number | undefined;
  let headers: Record<string, string> | undefined;
  let body: unknown;
  const response = { writeHead: (n: number, h: Record<string, string>) => { status = n; headers = h; }, end: (text: string) => { body = text ? JSON.parse(text) : undefined; } };
  expect(harness.devHandler).toBeTypeOf('function');
  await harness.devHandler!({ method: 'GET', url, headers: { 'x-access-code': 'unit-test-code' } }, response);
  return { status, headers, body };
}

it('registers authenticated GET table-preview in Azure with the same fixed-query handler', async () => {
  vi.stubEnv('ACCESS_CODES', 'unit-test-code');
  await import('../api/src/index');
  const route = harness.azure.get('table-preview');
  expect(route, 'the additive Azure route is registered').toBeDefined();
  expect(route!.methods).toEqual(['GET']);
  expect(route!.route).toBe('table-preview');
  expect(await route!.handler({ headers: new Headers(), query: new URLSearchParams('table=PhongBan&page=0') })).toEqual({ status: 401, jsonBody: { ok: false, kind: 'bad-code' } });
  expect(await route!.handler({ headers: new Headers({ 'x-access-code': 'unit-test-code' }), query: new URLSearchParams('table=PhongBan&page=0') })).toMatchObject({ status: 200, jsonBody: { ok: true, table: 'PhongBan', page: 0, pageSize: 50 } });
});

it('serves preview on the dev route with an isolated loopback port and origin', async () => {
  const log = vi.spyOn(console, 'log').mockImplementation(() => {});
  await bootDev({ DEV_API_PORT: '7073', DEV_UI_ORIGIN: 'http://127.0.0.1:4322' });
  expect(harness.listen).toHaveBeenCalledExactlyOnceWith(7073, '127.0.0.1');
  const response = await devGet('/api/table-preview?table=PhongBan&page=0');
  expect(response.status).toBe(200);
  expect(response.headers).toMatchObject({ 'Access-Control-Allow-Origin': 'http://127.0.0.1:4322' });
  expect(response.body).toMatchObject({ ok: true, table: 'PhongBan', rows: [['IT']], page: 0, pageSize: 50 });
  expect(log.mock.calls.flat().join(' ')).not.toContain('unit-test-code');
  expect((await devGet('/api/table-preview?table=PhongBan&page=0&sql=SELECT+1')).body).toEqual({ ok: false, kind: 'bad-request' });
});

it('keeps dev defaults and never logs access codes at startup', async () => {
  const log = vi.spyOn(console, 'log').mockImplementation(() => {});
  await bootDev();
  expect(harness.listen).toHaveBeenCalledExactlyOnceWith(7071, '127.0.0.1');
  expect((await devGet('/api/table-preview?table=PhongBan&page=0')).headers).toMatchObject({ 'Access-Control-Allow-Origin': 'http://localhost:4321' });
  expect(log.mock.calls.flat().join(' ')).not.toContain('unit-test-code');
});

it('answers malformed raw targets with CORS and keeps the next dev request usable without running SQL', async () => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
  await bootDev();
  harness.run.mockClear();
  for (const target of ['//[', '//%']) {
    await expect(devGet(target), target).resolves.toMatchObject({
      status: 400,
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:4321' },
      body: { ok: false, kind: 'bad-request' },
    });
    expect(harness.run).not.toHaveBeenCalled();
  }
  expect(await devGet('/api/table-preview?table=PhongBan&page=0')).toMatchObject({
    status: 200, body: { ok: true, table: 'PhongBan', page: 0 },
  });
  expect(harness.run).toHaveBeenCalledTimes(1);
});

it('refuses non-loopback origins or invalid ports before starting the runner', async () => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
  for (const env of [
    { DEV_API_PORT: '0' }, { DEV_API_PORT: '65536' }, { DEV_API_PORT: '7e3' }, { DEV_API_PORT: '-1' },
    { DEV_UI_ORIGIN: 'https://example.com' }, { DEV_UI_ORIGIN: 'http://localhost.evil:4321' },
    { DEV_UI_ORIGIN: 'http://0.0.0.0:4321' }, { DEV_UI_ORIGIN: 'http://localhost:4321/path' },
    { DEV_UI_ORIGIN: 'http://user:pass@localhost:4321' }, { DEV_UI_ORIGIN: 'http://localhost:4321?x=1' },
    { DEV_UI_ORIGIN: 'file:///localhost' },
  ]) {
    await expect(bootDev(env), JSON.stringify(env)).rejects.toThrow(/DEV_API_PORT|DEV_UI_ORIGIN/);
    expect(harness.listen).not.toHaveBeenCalled();
    expect(harness.createRunner).not.toHaveBeenCalled();
  }
});
