import { it, expect } from 'vitest';
import { runInNewContext } from 'node:vm';
import { readLessonFiles, lessonMainSection } from './helpers/lessons';

const body = () => readLessonFiles().find(f => f.slug === '2-5-null-o-trong')!.body;
const LABEL = '(chưa có)';

// A lost filter or an early replacement would make the diagram keep the wrong profiles.
// This checks the lesson's rendered data contract, not SQL Server execution.
it('2.5 keeps VH profiles with no leave date and labels only the missing email', () => {
  const lesson = body();
  const flow = lesson.match(/<RunFlow query=\{`([\s\S]*?)`\} steps=\{([\s\S]*?)\} \/>/);
  expect(flow).not.toBeNull();
  const steps = runInNewContext(`(${flow![2]})`) as {
    clause: string; columns: string[]; rows: unknown[][]; total: number;
  }[];
  expect(steps.map(s => [s.clause, s.total])).toEqual([
    ['FROM', 48], ['WHERE', 8], ['SELECT', 8], ['ORDER BY', 8],
  ]);
  const email = steps[1].columns.indexOf('Email');
  const id = steps[1].columns.indexOf('MaNV');
  expect(email).toBeGreaterThanOrEqual(0);
  expect(steps[1].rows.map(r => r[id])).not.toContain('NV033');
  expect(steps[1].rows.filter(r => r[email] === null).map(r => r[id])).toEqual(['NV044']);
  expect(steps[1].rows.flat()).not.toContain(LABEL);
  // The cards preview three rows, so the point of each step has to be among them.
  expect(steps[1].rows.slice(0, 3).map(r => r[id])).toContain('NV044');
  expect(steps[2].rows.slice(0, 3).flat()).toContain(LABEL);
  const expected = steps[3].rows;
  expect(expected.map(r => r[0])).toEqual(['NV008', 'NV015', 'NV019', 'NV024', 'NV027', 'NV031', 'NV037', 'NV044']);
  expect(expected.filter(r => r[2] === LABEL).map(r => r[0])).toEqual(['NV044']);
  expect(expected[0][2]).toBe('loi.pv@hrmdemo.vn');
  const results = [...lesson.matchAll(/<Result columns=\{(\[[\s\S]*?\])\} rows=\{(\[[\s\S]*?\])\}[^>]*\/>/g)];
  expect(results.some(m => JSON.stringify(runInNewContext(`(${m[2]})`)) === JSON.stringify(expected))).toBe(true);
});

// Later lessons point back here, and two exercises need IS NOT NULL.
it('2.5 teaches what the exercises and later lessons rely on in its main section', () => {
  const main = lessonMainSection(body());
  for (const term of ['IS NULL', 'IS NOT NULL', 'UNKNOWN', 'COALESCE', '= NULL']) expect(main).toContain(term);
});

it('2.5 shows the wrong statements only as mistakes, with their real results', () => {
  const lesson = body();
  const mistakes = lesson.slice(lesson.indexOf('<Mistakes>'), lesson.indexOf('</Mistakes>'));
  expect(mistakes).toContain('NgayNghiViec = NULL');
  expect(mistakes).toContain('(chua có)');
  expect(lessonMainSection(lesson)).not.toContain('ISNULL');
});
