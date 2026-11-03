import { readFileSync } from 'node:fs';
import { sortChallenges } from '../../src/lib/arcade-play';
import type { Challenge } from '../../src/lib/arcade-types';

/** The challenges with their answers and hidden tests, in play order, written next to the bundle by build.mjs. */
export function loadChallenges(): Challenge[] {
  return sortChallenges(JSON.parse(readFileSync(new URL('./arcade.json', import.meta.url), 'utf8')) as Challenge[]);
}
