import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { lessonSchema } from './lib/lesson-schema';
import { exerciseFileSchema } from './lib/exercises';

const lessons = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/lessons' }),
  schema: lessonSchema,
});

const exercises = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/exercises' }),
  schema: exerciseFileSchema,
});

export const collections = { lessons, exercises };
