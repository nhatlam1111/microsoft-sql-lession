import { it, expect } from 'vitest';
import { challengeSchema, checkChallenge } from '../src/lib/arcade-schema';
import { readChallengeEntries, readChallengeFiles } from './helpers/arcade';
import { readLessonFiles } from './helpers/lessons';

const lessons = readLessonFiles().map(l => l.slug);

it('every challenge file passes the schema and the course rules', () => {
  for (const { folder, challenge } of readChallengeEntries()) {
    const parsed = challengeSchema.safeParse(challenge);
    expect(parsed.success, `${challenge.id}: ${parsed.error?.message}`).toBe(true);
    expect(checkChallenge(challenge, { lessons, folder }), challenge.id).toEqual([]);
  }
});

it('challenge ids are unique', () => {
  const ids = readChallengeFiles().map(c => c.id);
  expect(new Set(ids).size).toBe(ids.length);
});

it('orders are unique inside a chapter', () => {
  const keys = readChallengeFiles().map(c => `${c.chapter}/${c.order}`);
  expect(new Set(keys).size).toBe(keys.length);
});
