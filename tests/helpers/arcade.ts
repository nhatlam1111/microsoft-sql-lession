import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import type { Challenge } from '../../src/lib/arcade-types';

const DIR = join('src', 'content', 'arcade');

/** Every challenge file with the folder it sits in. */
export function readChallengeEntries(): { folder: string; challenge: Challenge }[] {
  if (!existsSync(DIR)) return [];
  return (readdirSync(DIR, { recursive: true }) as string[])
    .filter(f => f.endsWith('.yaml'))
    .sort()
    .map(f => ({ folder: f.split(/[\\/]/)[0], challenge: parse(readFileSync(join(DIR, f), 'utf8')) as Challenge }));
}

export const readChallengeFiles = (): Challenge[] => readChallengeEntries().map(e => e.challenge);
