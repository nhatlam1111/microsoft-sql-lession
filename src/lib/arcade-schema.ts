/** The rules a challenge file must follow. The API bundle has no astro/zod, so only the site and the tests load this. */
import { z } from 'astro/zod';
import { findUnprefixedUnicodeStrings } from './tsql-lexer';
import type { Challenge } from './arcade-types';

const cell = z.union([z.string(), z.number(), z.boolean(), z.null()]);

const testSchema = z.object({
  id: z.number().int().positive(),
  visible: z.boolean().default(false),
  rows: z.record(z.array(z.array(cell))),
  expected: z.array(z.array(cell)),
  catches: z.string().min(1).optional(),
});

export const challengeSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  chapter: z.string().min(1),
  order: z.number().int().positive(),
  title: z.string().min(1),
  difficulty: z.enum(['de', 'vua', 'kho']),
  lessons: z.array(z.string().min(1)).min(1),
  prompt: z.string().min(1),
  columns: z.array(z.string().min(1)).min(1),
  resultTypes: z.array(z.string().min(1)),
  ordered: z.boolean(),
  tables: z.record(z.record(z.string().min(1))),
  answer: z.string().min(1),
  tests: z.array(testSchema),
});

const TODAY = /\b(getdate|sysdatetime|getutcdate|sysutcdatetime|current_timestamp)\b/i;

function checkTest(c: Challenge, t: Challenge['tests'][number]): string[] {
  const at = `test ${t.id}:`;
  const problems: string[] = [];
  if (!t.visible && !t.catches) problems.push(`${at} hidden test thiếu catches`);
  if (t.visible && t.catches) problems.push(`${at} unit test không có catches`);
  for (const [table, rows] of Object.entries(t.rows)) {
    const columns = c.tables[table];
    if (!columns) problems.push(`${at} chưa khai bảng ${table}`);
    else if (rows.some(row => row.length !== Object.keys(columns).length)) problems.push(`${at} bảng ${table} có dòng sai số cột`);
  }
  return problems;
}

/** Every broken rule in a challenge, as readable messages; empty when all is well. */
export function checkChallenge(c: Challenge, ctx: { lessons: string[]; folder: string }): string[] {
  const unit = c.tests.filter(t => t.visible).length;
  const problems: string[] = [];
  if (unit < 2) problems.push('cần ít nhất 2 unit test');
  if (c.tests.length - unit < 3) problems.push('cần ít nhất 3 hidden test');
  if (new Set(c.tests.map(t => t.id)).size !== c.tests.length) problems.push('trùng test id');
  if (c.chapter !== ctx.folder) problems.push(`chương ${c.chapter} nằm sai thư mục ${ctx.folder}`);
  if (c.resultTypes.length !== c.columns.length) problems.push('resultTypes phải khớp số cột; chạy check:arcade -- --write');
  for (const lesson of c.lessons) {
    if (!ctx.lessons.includes(lesson)) problems.push(`bài "${lesson}" không có trong khóa học`);
  }
  problems.push(...c.tests.flatMap(t => checkTest(c, t)));
  if (TODAY.test(c.answer)) problems.push('đáp án không được dùng ngày hiện tại');
  for (const sql of [c.answer, ...c.tests.map(t => t.catches ?? '')]) {
    const bad = findUnprefixedUnicodeStrings(sql);
    if (bad.length) problems.push(`chuỗi tiếng Việt thiếu N: ${bad.join(', ')}`);
  }
  return problems;
}
