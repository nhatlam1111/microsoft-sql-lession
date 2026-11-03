/** What the Arcade pages show, worked out from the challenges and the learner's progress. */
import { ARCADE_RULES, type ArcadeChapter, type Difficulty } from '../data/arcade';
import { isUnlocked, sortChallenges } from './arcade-play';
import type { PublicChallenge, PublicTest, TestResult } from './arcade-types';
import { withBase } from './paths';

export type ChallengeCard = { id: string; chapter: string; order: number; title: string; difficulty: Difficulty };
export type ItemStatus = 'done' | 'current' | 'locked';

export interface ChapterItem extends ChallengeCard { n: number; reward: number; status: ItemStatus }
export interface ChapterView { id: string; number: number; title: string; done: number; total: number; items: ChapterItem[] }

export const STATUS_LABEL: Record<ItemStatus, string> = { done: 'Đã xong', current: 'Đang làm', locked: 'Khóa' };

export const arcadeUrl = (id?: string, base?: string) => withBase(id ? `luyen-sql/${id}/` : 'luyen-sql/', base);

export function chapterView(chapters: ArcadeChapter[], challenges: ChallengeCard[], completed: ReadonlySet<string>): ChapterView[] {
  const ordered = sortChallenges(challenges);
  const ids = ordered.map(c => c.id);
  const statusOf = (id: string): ItemStatus => (completed.has(id) ? 'done' : isUnlocked(ids, completed, id) ? 'current' : 'locked');
  return chapters.flatMap((chapter, c) => {
    const items = ordered.filter(x => x.chapter === chapter.id).map(x => ({
      ...x, n: ids.indexOf(x.id) + 1, reward: ARCADE_RULES.reward[x.difficulty], status: statusOf(x.id),
    }));
    if (!items.length) return [];
    return [{ id: chapter.id, number: c + 1, title: chapter.title, done: items.filter(i => i.status === 'done').length, total: items.length, items }];
  });
}

export const nextItem = (view: ChapterView[]): ChapterItem | null =>
  view.flatMap(c => c.items).find(i => i.status === 'current') ?? null;

export type TestStatus = 'passed' | 'failed' | 'idle';

export interface TestRow {
  id: number;
  kind: 'unit' | 'opened' | 'hidden';
  status: TestStatus;
  /** null for a hidden test that is still locked: the page has no data for it. */
  test: PublicTest | null;
  result: TestResult | null;
}

export const TEST_STATUS_LABEL: Record<TestStatus, string> = { passed: 'Đạt', failed: 'Chưa đạt', idle: 'Chưa chạy' };

/** The latest results win; a test they did not cover keeps what the last submission said about it. */
export function testRows(challenge: PublicChallenge, opened: PublicTest[], lastFailed: number[] | null, results: TestResult[] | null): TestRow[] {
  const known = new Map<number, Pick<TestRow, 'kind' | 'test'>>();
  for (const id of challenge.hiddenTests) known.set(id, { kind: 'hidden', test: null });
  for (const test of opened) known.set(test.id, { kind: 'opened', test });
  for (const test of challenge.tests) known.set(test.id, { kind: 'unit', test });
  return [...known].sort(([a], [b]) => a - b).map(([id, row]) => {
    const result = results?.find(r => r.id === id) ?? null;
    const failed = result ? !result.passed : lastFailed?.includes(id);
    const status: TestStatus = failed === undefined ? 'idle' : failed ? 'failed' : 'passed';
    return { id, ...row, status, result };
  });
}

/** The map's geometry; arcade.css has the same padding, row height and station position. */
const MAP = { padX: 28, padTop: 12, rowHeight: 172, stationY: 72, edge: 9, span: 82 };

export type Point = [x: number, y: number];

/** Where a station sits along its row, in percent; every second row runs right to left. */
export function stationPercent(i: number, count: number, flip: boolean): number {
  const x = count < 2 ? 50 : MAP.edge + (i / (count - 1)) * MAP.span;
  return flip ? 100 - x : x;
}

const tidy = (n: number) => Math.round(n * 10) / 10;

export function mapPoints(sizes: number[], width: number): Point[] {
  const inner = width - 2 * MAP.padX;
  return sizes.flatMap((size, row) => Array.from({ length: size }, (_, i): Point => [
    tidy(MAP.padX + (inner * stationPercent(i, size, row % 2 === 1)) / 100),
    MAP.padTop + row * MAP.rowHeight + MAP.stationY,
  ]));
}

/** SVG path through the stations: straight along a row, a curve out past the edge down to the next row. */
export function linePath(points: Point[], width: number): string {
  if (!points.length) return '';
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    if (y0 === y1) {
      d += ` L${x1} ${y1}`;
    } else {
      const out = tidy((x0 > width / 2 ? 1 : -1) * ((y1 - y0) / 2) * 1.5);
      d += ` C${tidy(x0 + out)} ${y0} ${tidy(x1 + out)} ${y1} ${x1} ${y1}`;
    }
  }
  return d;
}
