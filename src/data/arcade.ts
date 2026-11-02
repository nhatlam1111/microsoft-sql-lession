/** The game rules and chapters of SQL Arcade (spec 2026-11-03-sql-arcade-mvp-design, sections 6 and 8.1). */

export type Difficulty = 'de' | 'vua' | 'kho';

export interface ArcadeChapter { id: string; title: string; lesson: string; size: number }

export const ARCADE_RULES = {
  startCoins: 20,
  openCost: 10,
  reward: { de: 10, vua: 20, kho: 30 } as Record<Difficulty, number>,
  testTimeoutMs: 5000,
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = { de: 'Dễ', vua: 'Vừa', kho: 'Khó' };

export const ARCADE_CHAPTERS: ArcadeChapter[] = [
  { id: '2-1', title: 'Chọn cột', lesson: '2-1-chon-cot-dat-ten-cot', size: 5 },
  { id: '2-2', title: 'Lọc dòng', lesson: '2-2-where-loc-nhu-autofilter', size: 6 },
  { id: '2-3', title: 'Nhiều điều kiện', lesson: '2-3-and-or-in-between-like', size: 7 },
  { id: '2-4', title: 'Sắp xếp và lấy đầu danh sách', lesson: '2-4-sap-xep-va-top', size: 5 },
  { id: '2-5', title: 'Ô trống', lesson: '2-5-null-o-trong', size: 5 },
  { id: '2-6', title: 'Bỏ dòng trùng', lesson: '2-6-distinct-bo-dong-trung', size: 4 },
  { id: '2-7', title: 'Xử lý chuỗi', lesson: '2-7-ham-chuoi-tieng-viet', size: 6 },
  { id: '2-8', title: 'Xử lý ngày', lesson: '2-8-ham-ngay-tham-nien', size: 6 },
  { id: '2-9', title: 'Chia nhóm theo điều kiện', lesson: '2-9-case-when-ham-if', size: 6 },
];
