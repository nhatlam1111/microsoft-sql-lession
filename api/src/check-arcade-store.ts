/** Checks the coin rules on the real arcade database with a throwaway learner; its rows stay behind, tied to no access code. */
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { arcadeServices } from './arcade-config';
import { localEnv } from './local-config';

const services = arcadeServices(localEnv())();
const s = services.store;
const id = randomBytes(32).toString('hex');

assert.equal((await s.load(id)).coins, 20);
assert.equal((await s.load(id)).coins, 20, 'a second load grants nothing');

const raced = await Promise.all([s.open(id, 'x', 3, 10), s.open(id, 'x', 3, 10)]);
assert.equal(raced.filter(r => r === 'opened').length, 1, 'two tabs open one test once');
assert.equal((await s.load(id)).coins, 10);

assert.equal(await s.open(id, 'x', 3, 10), 'already');
assert.equal((await s.load(id)).coins, 10, 'opening again costs nothing');

assert.equal(await s.open(id, 'x', 4, 10), 'opened');
assert.equal(await s.open(id, 'x', 5, 10), 'not-enough-coins');
assert.equal((await s.load(id)).coins, 0, 'a refused open charges nothing');
assert.equal(await s.open(id, 'x', 3, 10), 'already', 'a test already opened stays open with no coins left');

assert.equal(await s.lastSubmission(id, 'x'), null);
const pass = { challenge: 'x', sql: 'SELECT 1', passed: 5, total: 5, accepted: true, failed: [] };
const paid = await Promise.all([s.submit(id, pass, 20), s.submit(id, pass, 20)]);
assert.equal(paid[0].paid + paid[1].paid, 20, 'two tabs are paid once');
assert.equal((await s.load(id)).coins, 20);
assert.deepEqual(await s.submit(id, pass, 20), { paid: 0, coins: 20 }, 'a later pass pays nothing');

const wrong = { challenge: 'x', sql: "SELECT N'Hà'", passed: 3, total: 5, accepted: false, failed: [3, 5] };
assert.deepEqual(await s.submit(id, wrong, 20), { paid: 0, coins: 20 });
assert.deepEqual(await s.lastSubmission(id, 'x'), { sql: "SELECT N'Hà'", failed: [3, 5] });
assert.deepEqual(await s.submit(id, { ...wrong, challenge: 'y' }, 20), { paid: 0, coins: 20 }, 'a wrong answer pays nothing');

const state = await s.load(id);
assert.deepEqual(state.completed, ['x']);
assert.deepEqual(state.opened.map(o => o.test).sort(), [3, 4]);

await services.close();
console.log('store: đạt');
