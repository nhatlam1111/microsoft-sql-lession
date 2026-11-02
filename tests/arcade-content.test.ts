import { it, expect } from 'vitest';
import { ARCADE_CHAPTERS } from '../src/data/arcade';
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

it('has the approved number of challenges in every chapter', () => {
  const files = readChallengeFiles();
  for (const c of ARCADE_CHAPTERS) expect(files.filter(f => f.chapter === c.id).length, c.id).toBe(c.size);
  expect(files.filter(f => f.difficulty === 'de').length).toBe(20);
  expect(files.filter(f => f.difficulty === 'vua').length).toBe(20);
  expect(files.filter(f => f.difficulty === 'kho').length).toBe(10);
  expect(files.length).toBe(50);
});

it('every challenge links at least the lesson of its own chapter', () => {
  for (const c of readChallengeFiles()) {
    const lesson = ARCADE_CHAPTERS.find(ch => ch.id === c.chapter)?.lesson;
    expect(c.lessons, c.id).toContain(lesson);
  }
});
