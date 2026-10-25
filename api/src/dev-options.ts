/** Only used by the loopback dev server; production authorization and CORS are unchanged. */
export function devOptions(env: Record<string, string | undefined>): { port: number; origin: string } {
  const rawPort = env.DEV_API_PORT ?? '7071';
  const port = Number(rawPort);
  if (!/^\d+$/.test(rawPort) || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('DEV_API_PORT must be an integer from 1 to 65535.');
  }
  let url: URL;
  try { url = new URL(env.DEV_UI_ORIGIN ?? 'http://localhost:4321'); }
  catch { throw new Error('DEV_UI_ORIGIN must be a localhost or 127.0.0.1 HTTP(S) origin.'); }
  if (!['http:', 'https:'].includes(url.protocol) || !['localhost', '127.0.0.1'].includes(url.hostname)
    || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('DEV_UI_ORIGIN must be a localhost or 127.0.0.1 HTTP(S) origin.');
  }
  return { port, origin: url.origin };
}
