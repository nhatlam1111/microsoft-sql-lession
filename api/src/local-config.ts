/** Connection for runs on this machine: SQL_* if set, else the url/user/password the SQL connector uses in ../.env. */
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { configFromEnv } from './runner';

export function localEnv(): Record<string, string | undefined> {
  dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)), quiet: true });
  const env: Record<string, string | undefined> = { ...process.env };
  if (!env.SQL_SERVER && env.url) {
    const parts = Object.fromEntries(env.url.replace(/^jdbc:sqlserver:\/\//i, '').split(';').filter(Boolean)
      .map(p => { const i = p.indexOf('='); return [p.slice(0, i).trim().toLowerCase(), p.slice(i + 1).trim()]; }));
    env.SQL_SERVER = parts.servername ?? parts.server;
    env.SQL_DATABASE = parts.databasename ?? parts.database;
    env.SQL_USER = env.user;
    env.SQL_PASSWORD = env.password;
  }
  return env;
}

export const localConfig = () => configFromEnv(localEnv());
