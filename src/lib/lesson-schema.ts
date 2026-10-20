import { z } from 'astro/zod';

/** Frontmatter of one lesson file; shared by the content collection and the tests. */
export const lessonSchema = z.object({
  num: z.string().regex(/^[1-6]\.(10|[1-9])$/),
  title: z.string().min(1),
  shortTitle: z.string().min(1).max(28),
  level: z.number().int().min(1).max(6),
  area: z.enum(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8']),
  kind: z.enum(['full', 'summary']),
  minutes: z.number().int().positive(),
  prerequisites: z.array(z.string()).default([]),
  goal: z.string().min(1).refine(g => !g.startsWith('Học xong'), 'goal must not start with "Học xong"'),
  excel: z.string().min(1),
  summary: z.string().min(1),
  /** The lesson has no "Bài tập" section at all, not even the placeholder (lessons before SELECT is taught). */
  noExercises: z.boolean().optional(),
});

export type LessonFrontmatter = z.infer<typeof lessonSchema>;

/** Legacy full-lesson headings and unchanged summary headings; new full lessons merge Excel and SQL. */
export const SECTION_HEADINGS = {
  full: ['Tình huống', 'Với Excel', 'Làm bằng SQL', 'Hay nhầm ở đâu', 'Ứng dụng', 'Ghi nhớ', 'Bài tập'],
  summary: ['Nội dung chính', 'Liên hệ Excel', 'Tình huống ví dụ', 'Bài tập'],
} as const;

/** Pass the descriptive main-section title for the narrative format; omission preserves existing lessons. */
export function sectionHeadings(kind: 'full' | 'summary', noExercises = false, mainSectionTitle?: string): string[] {
  const headings = kind === 'full' && mainSectionTitle !== undefined
    ? ['Tình huống', mainSectionTitle, ...SECTION_HEADINGS.full.slice(3)]
    : SECTION_HEADINGS[kind];
  return headings.filter(h => !(noExercises && h === 'Bài tập'));
}

/** Phrases that make the text read machine-written or tie it to one reader's job (matched in lower case). */
export const BANNED_PHRASES = [
  'hãy cùng', 'khám phá', 'trong thế giới', 'hành trình', 'chinh phục', 'bí kíp', 'tuyệt vời', 'tóm lại',
  'consultant', 'ba/pm', 'bên khách hàng', 'bàn với dev', 'nối bảng', 'nối nhiều bảng',
];
