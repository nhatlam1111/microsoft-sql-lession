import { readFileSync } from 'node:fs';
import type { Exercise } from '../../src/lib/exercise-types';

/** The exercises with their answers, written next to the bundle by build.mjs. */
export function loadExercises(): Record<string, Exercise> {
  return JSON.parse(readFileSync(new URL('./exercises.json', import.meta.url), 'utf8'));
}
