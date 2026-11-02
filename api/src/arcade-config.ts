/** Connections of Arcade. Nothing here runs until the first Arcade call, so a missing setting cannot stop the exercise API. */
import { ARCADE_RULES } from '../../src/data/arcade';
import { configFromEnv, createRunner } from './runner';

type Env = Record<string, string | undefined>;

export function arcadeServices(env: Env) {
  let made: ReturnType<typeof connect> | undefined;

  function connect() {
    const { SQL_SERVER, ARCADE_SQL_DATABASE, ARCADE_RUNNER_USER, ARCADE_RUNNER_PASSWORD } = env;
    if (!ARCADE_SQL_DATABASE || !ARCADE_RUNNER_USER || !ARCADE_RUNNER_PASSWORD) {
      throw new Error('ARCADE_SQL_DATABASE, ARCADE_RUNNER_USER and ARCADE_RUNNER_PASSWORD must be set.');
    }
    const runner = createRunner({
      ...configFromEnv({ SQL_SERVER, SQL_DATABASE: ARCADE_SQL_DATABASE, SQL_USER: ARCADE_RUNNER_USER, SQL_PASSWORD: ARCADE_RUNNER_PASSWORD }),
      requestTimeout: ARCADE_RULES.testTimeoutMs,
    });
    return { run: runner.run, pool: runner.getPool, close: runner.close };
  }

  return () => (made ??= connect());
}
