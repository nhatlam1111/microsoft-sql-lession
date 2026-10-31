import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { parse } from 'yaml';
import { readLessonFiles, lessonMainSection, sqlSubheadings } from './helpers/lessons';
import { compareResults, type Shape } from '../src/lib/grade';
import { guardExercise } from '../src/lib/sql-guard';
import type { ExerciseFile } from '../src/lib/exercise-types';

const slug = '2-4-sap-xep-va-top';
const lesson = () => readLessonFiles().find(f => f.slug === slug)!;

// Checks source fixtures, not SQL Server execution or collation behavior.
function latestActive() {
  const seed = readFileSync('database/HRM_Demo.sql', 'utf8');
  const tuples = seed.match(/INSERT INTO dbo\.NhanVien[\s\S]*?VALUES\s*([\s\S]*?);/)![1];
  return [...tuples.matchAll(/^\((.+)\)[,;]?$/gm)]
    .map(m => [...m[1].matchAll(/N?'((?:''|[^'])*)'|\bNULL\b/g)].map(x => x[1] ?? null))
    .filter(r => r[10] === 'Đang làm')
    .sort((a, b) => b[6]!.localeCompare(a[6]!) || a[0]!.localeCompare(b[0]!))
    .map(r => [r[0], r[1], r[8], r[6]]);
}

describe('lesson 2.4 orders the filtered rows before applying TOP', () => {
  it('uses the scenario once, after Excel and before LineMap, then steps, result and answer', () => {
    const body=lesson().body,main=lessonMainSection(body);
    expect(sqlSubheadings(body)).toHaveLength(2);
    const [first,second]=main.split(/^### /m).slice(1);
    expect(main.match(/<Sql\b/g)).toHaveLength(1);
    expect(main.match(/<Result\b/g)).toHaveLength(1);
    expect(first.indexOf('<Excel')).toBeLessThan(first.indexOf('<Sql'));
    expect(first.indexOf('<Sql')).toBeLessThan(first.indexOf('<LineMap'));
    expect(second.indexOf('<RunFlow')).toBeLessThan(second.indexOf('<Result'));
    expect(second.slice(second.indexOf('<Result'))).toContain('chị Hạnh');
    const plain=main.replace(/`|\*\*/g,'');
    expect(plain).toContain('tối đa');
    expect(plain).toMatch(/mặc định.{0,30}ASC/);
    expect(plain).toContain('trái sang phải');
    expect(main).not.toContain('A02');
  });

  it('shows the latest five active profiles and the correct logical totals', () => {
    const f = lesson();
    expect((f.data as { kind: string }).kind).toBe('full');
    const flow = f.body.match(/<RunFlow query=\{`([\s\S]*?)`\} steps=\{([\s\S]*?)\} \/>/);
    expect(flow).not.toBeNull();
    expect(flow![1]).toMatch(/^SELECT TOP \(5\)/);
    expect(flow![1]).toContain("WHERE TrangThai = N'Đang làm'");
    expect(flow![1]).toContain('ORDER BY NgayVaoLam DESC, MaNV ASC');
    const steps = runInNewContext(`(${flow![2]})`) as { clause: string; rows: unknown[][]; total: number }[];
    expect(steps.map(s => [s.clause, s.total])).toEqual([
      ['FROM', 48], ['WHERE', 45], ['SELECT', 45], ['ORDER BY', 45], ['TOP', 5],
    ]);
    const expected = latestActive();
    expect(expected).toHaveLength(45);
    expect(steps[3].rows).toEqual(expected.slice(0, 10));
    expect(steps[4].rows).toEqual(expected.slice(0, 5));
    expect(expected.slice(0, 5).map(r => r[0])).toEqual(['NV048', 'NV047', 'NV046', 'NV045', 'NV044']);
    const result = f.body.match(/<Result columns=\{\[[\s\S]*?\]\} rows=\{(\[[\s\S]*?\])\}[^>]*\/>/);
    expect(result).not.toBeNull();
    expect(runInNewContext(`(${result![1]})`)).toEqual(expected.slice(0, 5));
  });

  it('makes all three exercises grade row order without publishing an answer in the lesson', () => {
    const path = `src/content/exercises/${slug}.yaml`;
    expect(existsSync(path)).toBe(true);
    const f = parse(readFileSync(path, 'utf8')) as ExerciseFile;
    expect(f.exercises.map(e => e.id)).toEqual(['2-4-1', '2-4-2', '2-4-3']);
    const correct: Shape = { columns: [{ name: 'MaNV', type: 'varchar' }], rows: [['NV048'], ['NV047']] };
    const reversed = { ...correct, rows: [...correct.rows].reverse() };
    for (const e of f.exercises) {
      expect(e.ordered, e.id).toBe(true);
      expect(e.kind).toBe('query');
      expect(guardExercise(e.answer).ok, e.id).toBe(true);
      expect(e.answer, e.id).toMatch(/ORDER BY/);
      expect(compareResults(correct, correct, e.ordered).correct).toBe(true);
      expect(compareResults(reversed, correct, e.ordered).correct).toBe(false);
      expect(lesson().body.replace(/\s+/g, ' '), e.id).not.toContain(e.answer.replace(/\s+/g, ' ').trim());
    }
  });
});
