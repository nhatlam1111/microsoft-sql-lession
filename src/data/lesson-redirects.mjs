import { conditionalCountMerge, currentLessonSlug, lessonMoves, renumberedLessons, windowLessonMoves } from './lesson-moves.mjs';

/** Bookmarks continue to point to the same lesson or exercise after renumbering. */
export function lessonRedirectRoutes(base) {
  const prefix = base.replace(/\/$/, '');
  const moves = [
    ...lessonMoves,
    ...renumberedLessons,
    ...windowLessonMoves,
    ...conditionalCountMerge.from.map(from => [
      from, conditionalCountMerge.to, conditionalCountMerge.exerciseCount, conditionalCountMerge.firstExercise,
    ]),
  ];
  return Object.fromEntries(moves.flatMap(([from, previous, count, firstExercise = 1]) => {
    const to = currentLessonSlug(previous);
    if (!to) return [];
    return [
      [`/bai/${from}/`, `${prefix}/bai/${to}/`],
      ...Array.from({ length: count }, (_, i) => [
        `/bai/${from}/bai-tap/${i + 1}/`,
        `${prefix}/bai/${to}/bai-tap/${i + firstExercise}/`,
      ]),
    ];
  }));
}
