import { it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { exerciseFileSchema, publicExercises, exerciseUrl, checkExerciseFile } from '../src/lib/exercises';
import type { ExerciseFile } from '../src/lib/exercise-types';
import { readCatalog } from './helpers/lessons';

const DIR = join('src', 'content', 'exercises');
const readExerciseFiles = (): ExerciseFile[] =>
  readdirSync(DIR).filter(f => f.endsWith('.yaml')).sort().map(f => parse(readFileSync(join(DIR, f), 'utf8')) as ExerciseFile);

it('every exercise file passes the schema and the course rules', () => {
  for (const f of readExerciseFiles()) {
    expect(exerciseFileSchema.safeParse(f).success, f.lesson).toBe(true);
    expect(checkExerciseFile(f, readCatalog()), f.lesson).toEqual([]);
  }
});

it('ships 3 exercises for 3.5 and 2 data-change exercises for 6.5', () => {
  const byLesson = Object.fromEntries(readExerciseFiles().map(f => [f.lesson, f.exercises]));
  expect(byLesson['3-5-left-join'].map(e => [e.id, e.kind])).toEqual([['3-5-1', 'query'], ['3-5-2', 'query'], ['3-5-3', 'query']]);
  expect(byLesson['6-5-update-quen-where'].map(e => [e.id, e.kind])).toEqual([['6-5-1', 'change'], ['6-5-2', 'change']]);
});

it('ships 3 SELECT * exercises for 1.6, with no order, filter or TOP', () => {
  const byLesson = Object.fromEntries(readExerciseFiles().map(f => [f.lesson, f.exercises]));
  const l16 = byLesson['1-6-cau-select-dau-tien'];
  expect(l16.map(e => [e.id, e.kind])).toEqual([['1-6-1', 'query'], ['1-6-2', 'query'], ['1-6-3', 'query']]);
  for (const e of l16) {
    expect(e.ordered, e.id).toBe(false);
    expect(/\b(TOP|WHERE|ORDER\s+BY)\b/i.test(e.answer), e.id).toBe(false);
  }
});

it('public exercises carry no answer or check query', () => {
  const pub = publicExercises(readExerciseFiles()[0]);
  expect(pub.every(e => !('answer' in e) && !('check' in e))).toBe(true);
  expect(pub.map(e => e.n)).toEqual([1, 2, 3]);
});

it('reports broken exercise files', () => {
  const lessons = [{ slug: '3-5-left-join', num: '3.5' }];
  const ex = { id: '3-5-1', title: 't', summary: 's', prompt: 'p', columns: ['MaNV'], ordered: false, kind: 'query' as const, answer: 'SELECT 1' };
  expect(checkExerciseFile({ lesson: 'x', exercises: [ex] }, lessons)[0]).toMatch(/bài học/);
  expect(checkExerciseFile({ lesson: '3-5-left-join', exercises: [{ ...ex, id: '3-5-2' }] }, lessons)[0]).toMatch(/3-5-1/);
  expect(checkExerciseFile({ lesson: '3-5-left-join', exercises: [{ ...ex, kind: 'change' }] }, lessons)[0]).toMatch(/check/);
  expect(checkExerciseFile({ lesson: '3-5-left-join', exercises: [{ ...ex, answer: "SELECT 'Từ chối'" }] }, lessons)[0]).toMatch(/N/);
});

it('builds the exercise page URL under the base path', () => {
  expect(exerciseUrl('3-5-left-join', 2)).toBe('/microsoft-sql-lession/bai/3-5-left-join/bai-tap/2/');
});
