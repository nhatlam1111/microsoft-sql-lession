import { expect, it } from 'vitest';
import { readLessonFiles } from './helpers/lessons';

const lessons = readLessonFiles();
it.each(['2.7', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7'])('%s lets learners check understanding before opening exercises', num => {
  const text = lessons.find(l => (l.data as { num: string }).num === num)!.body;
  const memo = text.indexOf('<Memo');
  const exercises = text.indexOf('## Bài tập');
  const checks = [...text.matchAll(/<details>/g)].map(m => m.index!);
  expect(checks.length).toBeGreaterThan(0);
  for (const at of checks) {
    expect(at).toBeGreaterThan(memo);
    expect(at).toBeLessThan(exercises);
  }
});

it.each(['2.3', '2.7', '2.8'])('%s has a self-check for its separate learning steps', num => {
  const text = lessons.find(l => (l.data as { num: string }).num === num)!.body;
  expect([...text.matchAll(/<summary>/g)].length).toBeGreaterThanOrEqual(3);
});
