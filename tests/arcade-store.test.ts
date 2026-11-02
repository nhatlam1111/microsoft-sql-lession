import { it, expect, vi } from 'vitest';
import { retryWhileWaking } from '../api/src/arcade-store';

const waking = () => Object.assign(new Error("Database 'arcade' on server 's' is not currently available. Please retry the connection later."), { code: 'ELOGIN' });

it('keeps trying while the database wakes up', async () => {
  const wait = vi.fn(async () => {});
  let calls = 0;
  const connect = async () => { calls++; if (calls < 3) throw waking(); return 'pool'; };
  expect(await retryWhileWaking(connect, { tries: 5, wait })).toBe('pool');
  expect(calls).toBe(3);
  expect(wait).toHaveBeenCalledTimes(2);
});

it('gives up after the last try and passes the error on', async () => {
  let calls = 0;
  const connect = async () => { calls++; throw waking(); };
  await expect(retryWhileWaking(connect, { tries: 3, wait: async () => {} })).rejects.toThrow(/not currently available/);
  expect(calls).toBe(3);
});

it('does not retry a wrong password or any other failure', async () => {
  let calls = 0;
  const connect = async () => { calls++; throw Object.assign(new Error("Login failed for user 'arcade_store'."), { code: 'ELOGIN' }); };
  await expect(retryWhileWaking(connect, { tries: 5, wait: async () => {} })).rejects.toThrow(/Login failed/);
  expect(calls).toBe(1);
});
