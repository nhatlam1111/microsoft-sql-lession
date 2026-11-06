/** Course v2 inserts SELECT/FROM subqueries before the former 3.10 COUNT lesson. */
export const COURSE_EXERCISE_PREFIX = 'course-v2:';
export const legacyLessonNum = (num: string): string => num === '3.10' ? '3.12' : num;
export const legacyExerciseId = (id: string): string => /^3-10-[1-3]$/.test(id) ? id.replace('3-10-', '3-12-') : id;

/** Unversioned requests came from the old curriculum; new IDs must never reuse that meaning. */
export function resolveCourseExerciseId(wireId: string): string | null {
  if (wireId.startsWith(COURSE_EXERCISE_PREFIX)) return wireId.slice(COURSE_EXERCISE_PREFIX.length);
  if (wireId.includes(':') || /^3-(?:11|12)-/.test(wireId)) return null;
  return legacyExerciseId(wireId);
}

/** A new SELECT/FROM exercise has no legacy draft. Other exercises keep their identity. */
export function legacyDraftId(id: string): string | null {
  if (/^3-(?:10|11)-/.test(id)) return null;
  return /^3-12-[1-3]$/.test(id) ? id.replace('3-12-', '3-10-') : id;
}
