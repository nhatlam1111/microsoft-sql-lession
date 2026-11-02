/** Order and visibility of Arcade challenges; shared by the site and the API, so no Astro imports here. */
import type { Challenge, ChallengeTest, PublicChallenge, PublicTest } from './arcade-types';

/** Play order: chapter by chapter, then the order inside the chapter. */
export function sortChallenges<T extends { chapter: string; order: number }>(list: T[]): T[] {
  return [...list].sort((a, b) => a.chapter.localeCompare(b.chapter, undefined, { numeric: true }) || a.order - b.order);
}

/** `ids` is the play order. A completed challenge stays open even if one before it was added later. */
export function isUnlocked(ids: string[], completed: ReadonlySet<string>, id: string): boolean {
  const i = ids.indexOf(id);
  if (i < 0) return false;
  return i === 0 || completed.has(id) || completed.has(ids[i - 1]);
}

export function publicTest({ id, rows, expected }: ChallengeTest): PublicTest {
  return { id, rows, expected };
}

export function publicChallenge({ answer: _answer, tests, ...rest }: Challenge): PublicChallenge {
  return {
    ...rest,
    tests: tests.filter(t => t.visible).map(publicTest),
    hiddenTests: tests.filter(t => !t.visible).map(t => t.id),
  };
}
