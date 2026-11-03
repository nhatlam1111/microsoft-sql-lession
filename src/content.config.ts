import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { lessonSchema } from './lib/lesson-schema';
import { exerciseFileSchema } from './lib/exercises';
import { challengeSchema } from './lib/arcade-schema';
import { appendixSchema } from './lib/appendices';
import { presentationSchema } from './lib/presentations';

const lessons = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/lessons' }),
  schema: lessonSchema,
});

const exercises = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/exercises' }),
  schema: exerciseFileSchema,
});

const arcade = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/arcade' }),
  schema: challengeSchema,
});

const appendices = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/appendices' }),
  schema: appendixSchema,
});

const presentations = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/presentations' }),
  schema: presentationSchema,
});

export const collections = { lessons, exercises, arcade, appendices, presentations };
