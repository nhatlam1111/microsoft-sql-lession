import { LEVELS, type LevelNo } from '../data/curriculum';
import { sortCatalog, type CatalogEntry } from './catalog';
import { countDone, type ProgressState } from './progress';
import { firstFlagged, formatLastVisit, levelSummaries, resumeTarget, type LevelSummary } from './roadmap';

export interface PopupModel {
  title: string;
  sub: string;
  cta: { label: string; sublabel: string; slug: string } | null;
  flag: { label: string; slug: string } | null;
  introLink: boolean;
  levels: LevelSummary[];
  expandedLevel: LevelNo;
}

/**
 * Everything the roadmap popup says, for a first visit, a return, or a finished course.
 * `startLastLessonNum` is the last lesson as it was when the page opened: a lesson page marks
 * itself seen on load, which must not turn a first visit into a "return" or move the resume point.
 */
export function popupModel(
  live: ProgressState,
  previousActiveAt: number | null,
  catalog: CatalogEntry[],
  now: number,
  startLastLessonNum: string | null = live.lastLessonNum,
): PopupModel {
  const s: ProgressState = { ...live, lastLessonNum: startLastLessonNum };
  const sorted = sortCatalog(catalog);
  const total = sorted.length;
  const done = countDone(s, sorted.map(e => e.num));
  const target = resumeTarget(s, sorted);

  if (s.lastLessonNum === null && done === 0 && sorted.length > 0) {
    const first = sorted[0];
    return {
      title: 'Chào bạn',
      sub: `Khóa học có ${LEVELS.length} level, ${total} bài. Cứ học lần lượt từ bài ${first.num}.`,
      cta: { label: `Bắt đầu bài ${first.num} →`, sublabel: first.title, slug: first.slug },
      flag: null,
      introLink: true,
      levels: levelSummaries(s, sorted, first.level as LevelNo),
      expandedLevel: first.level as LevelNo,
    };
  }

  if (!target) {
    return {
      title: `Bạn đã học xong cả ${total} bài`,
      sub: 'Muốn ôn lại bài nào thì bấm vào trạm của level đó.',
      cta: null,
      flag: null,
      introLink: false,
      levels: levelSummaries(s, sorted, null),
      expandedLevel: LEVELS[LEVELS.length - 1].no,
    };
  }

  const flagged = firstFlagged(s, sorted);
  const count = `Đã học ${done}/${total} bài.`;
  return {
    title: `Lần trước bạn dừng ở bài ${s.lastLessonNum ?? target.num}`,
    sub: previousActiveAt === null ? count : `${formatLastVisit(previousActiveAt, now)}. ${count}`,
    cta: { label: `Học tiếp bài ${target.num} →`, sublabel: target.title, slug: target.slug },
    flag: flagged && flagged.num !== target.num ? { label: `Xem lại bài ${flagged.num} bạn đã cắm cờ`, slug: flagged.slug } : null,
    introLink: false,
    levels: levelSummaries(s, sorted, target.level as LevelNo),
    expandedLevel: target.level as LevelNo,
  };
}
