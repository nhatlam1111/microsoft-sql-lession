// Slug moves from v2 to v3, with the number of existing exercise URLs to redirect.
export const lessonMoves = [
  ['4-1-cte-tung-buoc', '3-13-cte-tung-buoc', 3],
  ['4-2-xep-hang-row-number-rank', '3-14-xep-hang-row-number-rank', 3],
  ['4-3-luy-ke-so-thang-truoc', '3-15-luy-ke-so-thang-truoc', 3],
  ['4-4-pivot-xoay-bang', '3-16-pivot-xoay-bang', 3],
  ['4-5-view-bao-cao-luu-san', '4-8-view-bao-cao-luu-san', 0],
  ['4-6-soi-chat-luong-du-lieu', '3-17-soi-chat-luong-du-lieu', 3],
  ['4-7-doi-soat-cham-cong-luong', '3-18-doi-soat-cham-cong-luong', 0],
  ['4-8-doc-hieu-stored-procedure', '4-9-doc-hieu-stored-procedure', 0],
  ['5-1-thiet-ke-bang-chuan-hoa', '4-1-thiet-ke-bang-chuan-hoa', 0],
  ['5-2-rang-buoc-du-lieu', '4-2-rang-buoc-du-lieu', 0],
  ['5-3-insert-update-delete-an-toan', '4-3-insert-update-delete-an-toan', 0],
  ['5-4-transaction', '4-4-transaction', 0],
  ['5-5-import-du-lieu-tu-excel', '4-5-import-du-lieu-tu-excel', 0],
  ['5-6-index-truy-van-cham', '4-6-index-truy-van-cham', 0],
  ['5-7-execution-plan', '4-7-execution-plan', 0],
  ['5-8-lock-blocking-deadlock', '5-3-lock-blocking-deadlock', 0],
  ['5-9-trigger-nhat-ky', '4-11-trigger-nhat-ky', 0],
  ['6-1-du-lieu-nhay-cam-phan-quyen', '5-1-du-lieu-nhay-cam-phan-quyen', 0],
  ['6-2-dev-uat-production', '5-2-dev-uat-production', 0],
  ['6-3-backup-restore', '5-4-backup-restore', 0],
  ['6-4-point-in-time-restore', '5-5-point-in-time-restore', 0],
  ['6-5-update-quen-where', '5-6-update-quen-where', 2],
  ['6-6-temporal-table', '5-7-temporal-table', 0],
  ['6-7-checklist-production', '5-8-checklist-production', 0],
];

export const renumberedLessons = [
  ['3-13-cte-tung-buoc', '3-12-cte-tung-buoc', 3],
  ['3-14-xep-hang-row-number-rank', '3-13-xep-hang-row-number-rank', 3],
  ['3-15-luy-ke-so-thang-truoc', '3-14-luy-ke-so-thang-truoc', 3],
  ['3-16-pivot-xoay-bang', '3-15-pivot-xoay-bang', 3],
  ['3-17-soi-chat-luong-du-lieu', '3-16-soi-chat-luong-du-lieu', 3],
  ['3-18-doi-soat-cham-cong-luong', '3-17-doi-soat-cham-cong-luong', 0],
  ['3-19-nhan-biet-du-lieu-co-van-de', '3-18-nhan-biet-du-lieu-co-van-de', 0],
];

export const conditionalCountMerge = {
  from: ['3-10-dem-co-dieu-kien', '3-12-dem-co-dieu-kien'],
  to: '3-1-count-sum-avg',
  exerciseCount: 3,
  firstExercise: 4,
};

export const windowLessonMoves = [
  ['3-14-luy-ke-so-thang-truoc', '3-16-luy-ke-so-thang-truoc', 3],
  ['3-15-pivot-xoay-bang', '3-18-pivot-xoay-bang', 3],
  ['3-16-soi-chat-luong-du-lieu', '3-19-soi-chat-luong-du-lieu', 3],
  ['3-18-nhan-biet-du-lieu-co-van-de', '3-19-soi-chat-luong-du-lieu', 0],
];

const removedReconciliation = '3-17-doi-soat-cham-cong-luong';

const lessonNum = slug => slug.split('-').slice(0, 2).join('.');
const movedNums = new Map(lessonMoves.map(([from, to]) => [lessonNum(from), lessonNum(to)]));
const renumberedNums = new Map(renumberedLessons.map(([from, to]) => [lessonNum(from), lessonNum(to)]));
const renumberedSlugs = new Map(renumberedLessons.map(([from, to]) => [from, to]));
const windowNums = new Map(windowLessonMoves.map(([from, to]) => [lessonNum(from), lessonNum(to)]));
const windowSlugs = new Map(windowLessonMoves.map(([from, to]) => [from, to]));

export const mergedFromNum = lessonNum(conditionalCountMerge.from[1]);
export const mergedToNum = lessonNum(conditionalCountMerge.to);
export const qualityOutlineNum = '3.18';
export function currentLessonSlug(slug) {
  const previous = renumberedSlugs.get(slug) ?? slug;
  return previous === removedReconciliation ? null : windowSlugs.get(previous) ?? previous;
}

export function migrateLessonNumToV3(num) {
  if (num === '4.9' || num === '4.10') return null;
  return movedNums.get(num) ?? num;
}

export function migrateLessonNumToV4(num) {
  if (num === mergedFromNum) return mergedToNum;
  return renumberedNums.get(num) ?? num;
}

export function migrateLessonNumToV5(num) {
  if (num === lessonNum(removedReconciliation)) return null;
  return windowNums.get(num) ?? num;
}

// Exercise IDs also identify saved drafts, solved exercises, and API requests.
export function exerciseLessonNum(slug, num) {
  const moved = [...lessonMoves, ...renumberedLessons, ...windowLessonMoves]
    .find(([, to, exerciseCount]) => exerciseCount > 0 && currentLessonSlug(to) === slug);
  return moved ? lessonNum(moved[0]) : num;
}
