import { z } from 'astro/zod';
import { withBase } from './paths';
import { findUnprefixedUnicodeStrings } from './tsql-lexer';
import type { ExerciseFile, PublicExercise } from './exercise-types';

const exerciseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  prompt: z.string().min(1),
  columns: z.array(z.string().min(1)).min(1),
  ordered: z.boolean(),
  kind: z.enum(['query', 'change']),
  answer: z.string().min(1),
  check: z.string().min(1).optional(),
});

/** One file in src/content/exercises: the exercises of one lesson. */
export const exerciseFileSchema = z.object({
  lesson: z.string().min(1),
  exercises: z.array(exerciseSchema).min(1),
});

/** What the site may show: everything but the answer and the check query. */
export function publicExercises(file: ExerciseFile): PublicExercise[] {
  return file.exercises.map(({ answer: _answer, check: _check, ...rest }, i) => ({ ...rest, lesson: file.lesson, n: i + 1 }));
}

export function exerciseUrl(lessonSlug: string, n: number, base?: string): string {
  return withBase(`bai/${lessonSlug}/bai-tap/${n}/`, base);
}

/** Every broken rule in an exercise file, as readable messages; empty when all is well. */
export function checkExerciseFile(file: ExerciseFile, lessons: { slug: string; num: string }[]): string[] {
  const lesson = lessons.find(l => l.slug === file.lesson);
  if (!lesson) return [`bài học "${file.lesson}" không có trong khóa học`];
  const problems: string[] = [];
  file.exercises.forEach((e, i) => {
    const at = `bài tập ${i + 1}:`;
    const expected = `${lesson.num.replace('.', '-')}-${i + 1}`;
    if (e.id !== expected) problems.push(`${at} mã phải là ${expected}, đang là ${e.id}`);
    if (e.kind === 'change' && !e.check) problems.push(`${at} bài sửa dữ liệu cần check`);
    if (e.kind === 'query' && e.check) problems.push(`${at} bài truy vấn không có check`);
    for (const sql of [e.answer, e.check ?? '']) {
      const bad = findUnprefixedUnicodeStrings(sql);
      if (bad.length) problems.push(`${at} chuỗi tiếng Việt thiếu N: ${bad.join(', ')}`);
    }
  });
  return problems;
}
