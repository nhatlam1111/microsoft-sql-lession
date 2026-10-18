/** Exercise and API shapes shared by the site, the API and the tests; no Astro imports here. */
import type { Cell } from './grade';

export interface Exercise {
  id: string;
  title: string;
  /** One sentence for the lesson's exercise list. */
  summary: string;
  prompt: string;
  /** The columns the result must have, in order (for a data change: the check query's columns). */
  columns: string[];
  ordered: boolean;
  kind: 'query' | 'change';
  answer: string;
  /** For a data change: a SELECT on the changed table, with ORDER BY. */
  check?: string;
}

export interface ExerciseFile { lesson: string; exercises: Exercise[] }

export type PublicExercise = Omit<Exercise, 'answer' | 'check'> & { lesson: string; n: number };

export type FailureKind =
  | 'bad-request' | 'bad-code' | 'rate' | 'unknown-exercise' | 'blocked' | 'multi'
  | 'timeout' | 'too-big' | 'quota' | 'unavailable' | 'network';

export interface ApiFailure { ok: false; kind: FailureKind; reason?: string }

export interface RunResponse {
  ok: true;
  columns: string[];
  rows: Cell[][];
  truncated: boolean;
  affected: number | null;
  error: string | null;
  ms: number;
}

export interface GradeResponse extends RunResponse { correct: boolean; reason: string | null }
