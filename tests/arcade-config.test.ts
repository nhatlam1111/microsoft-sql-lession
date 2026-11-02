import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { arcadeServices } from '../api/src/arcade-config';

it('needs no Arcade settings until an Arcade call arrives', () => {
  const services = arcadeServices({});
  expect(() => services()).toThrow(/ARCADE_/);
});

it('connects only once', () => {
  const services = arcadeServices({
    SQL_SERVER: 's', ARCADE_SQL_DATABASE: 'arcade', ARCADE_RUNNER_USER: 'r', ARCADE_RUNNER_PASSWORD: 'p',
    ARCADE_STORE_USER: 'u', ARCADE_STORE_PASSWORD: 'q',
  });
  expect(services()).toBe(services());
});

it('the Function App and the local server both offer every Arcade route', () => {
  for (const file of ['api/src/index.ts', 'api/src/dev-server.ts']) {
    const source = readFileSync(file, 'utf8');
    for (const handler of ['handleMe', 'handleChallenge', 'handleArcadeRun', 'handleSubmit', 'handleOpen']) {
      expect(source, `${file} ${handler}`).toContain(handler);
    }
  }
});
