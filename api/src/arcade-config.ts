/** Connections of Arcade. Nothing here runs until the first Arcade call, so a missing setting cannot stop the exercise API. */
import { ARCADE_RULES } from '../../src/data/arcade';
import { createStore } from './arcade-store';
import { configFromEnv, createRunner } from './runner';

type Env = Record<string, string | undefined>;

export function arcadeServices(env: Env) {
  let made: ReturnType<typeof connect> | undefined;

  function connect() {
    const { SQL_SERVER, ARCADE_SQL_DATABASE, ARCADE_RUNNER_USER, ARCADE_RUNNER_PASSWORD, ARCADE_STORE_USER, ARCADE_STORE_PASSWORD } = env;
    if (!ARCADE_SQL_DATABASE || !ARCADE_RUNNER_USER || !ARCADE_RUNNER_PASSWORD || !ARCADE_STORE_USER || !ARCADE_STORE_PASSWORD) {
      throw new Error('ARCADE_SQL_DATABASE, ARCADE_RUNNER_USER, ARCADE_RUNNER_PASSWORD, ARCADE_STORE_USER and ARCADE_STORE_PASSWORD must be set.');
    }
    const runner = createRunner({
      ...configFromEnv({ SQL_SERVER, SQL_DATABASE: ARCADE_SQL_DATABASE, SQL_USER: ARCADE_RUNNER_USER, SQL_PASSWORD: ARCADE_RUNNER_PASSWORD }),
      requestTimeout: ARCADE_RULES.testTimeoutMs,
    });
    const store = createStore(configFromEnv({ SQL_SERVER, SQL_DATABASE: ARCADE_SQL_DATABASE, SQL_USER: ARCADE_STORE_USER, SQL_PASSWORD: ARCADE_STORE_PASSWORD }));
    return {
      run: runner.run,
      store,
      pool: runner.getPool,
      close: async () => { await runner.close(); await store.close(); },
    };
  }

  return () => (made ??= connect());
}
