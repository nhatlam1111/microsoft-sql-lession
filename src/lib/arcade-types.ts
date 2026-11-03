/** Arcade shapes shared by the site, the API and the tests; no Astro imports here. */
import type { Difficulty } from '../data/arcade';
import type { Cell } from './grade';

/** Table name → column name → the column's SQL declaration, such as `nvarchar(100) NOT NULL`. */
export type TableDefs = Record<string, Record<string, string>>;
/** Table name → its rows, each value in column order. */
export type TableRows = Record<string, Cell[][]>;

export interface ChallengeTest {
  id: number;
  visible: boolean;
  rows: TableRows;
  expected: Cell[][];
  /** Hidden tests only: a wrong statement that passes the unit tests and must fail this test. */
  catches?: string;
}

export interface Challenge {
  id: string;
  chapter: string;
  order: number;
  title: string;
  difficulty: Difficulty;
  lessons: string[];
  prompt: string;
  /** The columns the result must have, in order. */
  columns: string[];
  /** SQL type of each result column, written by check:arcade --write. */
  resultTypes: string[];
  ordered: boolean;
  tables: TableDefs;
  answer: string;
  tests: ChallengeTest[];
}

export interface PublicTest { id: number; rows: TableRows; expected: Cell[][] }

/** What the site may show: unit tests in full, hidden tests by id only. */
export type PublicChallenge = Omit<Challenge, 'answer' | 'tests'> & { tests: PublicTest[]; hiddenTests: number[] };

export type TestResult =
  | { id: number; shown: true; passed: boolean; reason: string | null; columns: string[]; rows: Cell[][]; truncated: boolean; error: string | null; ms: number }
  | { id: number; shown: false; passed: boolean };

export interface MeResponse { ok: true; coins: number; completed: string[] }

export interface ChallengeState {
  ok: true;
  unlocked: boolean;
  completed: boolean;
  coins: number;
  lastSql: string | null;
  lastFailed: number[] | null;
  opened: PublicTest[];
}

export interface ArcadeRunResponse { ok: true; tests: TestResult[] }

export interface SubmitResponse { ok: true; tests: TestResult[]; accepted: boolean; reward: number; coins: number }

export interface OpenResponse { ok: true; coins: number; test: PublicTest }
