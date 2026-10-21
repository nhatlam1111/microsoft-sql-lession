import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { parse } from 'yaml';
import { readLessonFiles } from './helpers/lessons';
import { guardExercise } from '../src/lib/sql-guard';
import type { ExerciseFile } from '../src/lib/exercise-types';

const slug = '2-3-and-or-in-between-like';
const lesson = () => readLessonFiles().find(f => f.slug === slug)!;

// Source-fixture check only: this does not execute or certify T-SQL.
function seedPeople() {
  const seed = readFileSync('database/HRM_Demo.sql', 'utf8');
  const section = seed.match(/INSERT INTO dbo\.NhanVien[\s\S]*?VALUES\s*([\s\S]*?);/)![1];
  return [...section.matchAll(/^\((.+)\)[,;]?$/gm)].map(m => {
    const cells = [...m[1].matchAll(/N?'((?:''|[^'])*)'|\bNULL\b/g)].map(x => x[1] ?? null);
    return { MaNV: cells[0], HoTen: cells[1], NgayVaoLam: cells[6]!, MaPB: cells[8] };
  });
}

describe('lesson 2.3 combines conditions without changing their scope', () => {
  it('is a full lesson whose main example keeps both departments inside the date range', () => {
    expect((lesson().data as { kind: string }).kind).toBe('full');
    const blocks = [...lesson().body.matchAll(/<Sql[^>]*code=\{`([\s\S]*?)`\}/g)].map(m => m[1]);
    expect(blocks.some(sql => /MaPB IN \('KD', 'IT'\)\s+AND NgayVaoLam BETWEEN '20230101' AND '20230630'/.test(sql))).toBe(true);
    const text = lesson().body.replace(/`|\*\*/g, '');
    for (const pattern of [/AND.{0,35}trước OR/, /cả hai (?:đầu mút|mốc)/, /không.{0,30}thứ tự.{0,30}(?:vật lý|đọc dữ liệu)/s]) {
      expect(text).toMatch(pattern);
    }
  });

  it('keeps displayed results and run-flow totals consistent with the SQL seed', () => {
    const people = seedPeople();
    expect(people).toHaveLength(48);
    const matches = people.filter(p => ['KD', 'IT'].includes(p.MaPB!) && p.NgayVaoLam >= '2023-01-01' && p.NgayVaoLam <= '2023-06-30');
    expect(matches.map(p => p.MaNV)).toEqual(['NV003', 'NV043']);
    const body = lesson().body;
    const arrays = [...body.matchAll(/<Result columns=\{(\[[\s\S]*?\])\} rows=\{(\[[\s\S]*?\])\}[^>]*\/>/g)]
      .map(m => runInNewContext(`(${m[2]})`) as unknown[][]);
    expect(arrays).toContainEqual(matches.map(p => [p.MaNV, p.HoTen, p.MaPB, p.NgayVaoLam]));
    const flow = body.match(/<RunFlow query=\{`[\s\S]*?`\} steps=\{([\s\S]*?)\} \/>/);
    expect(flow).not.toBeNull();
    const steps = runInNewContext(`(${flow![1]})`) as { clause: string; rows: unknown[][]; total: number }[];
    expect(steps.map(s => [s.clause, s.total])).toEqual([['FROM', 48], ['WHERE', 2], ['SELECT', 2]]);
    expect(steps.at(-1)!.rows).toEqual(matches.map(p => [p.MaNV, p.HoTen, p.MaPB, p.NgayVaoLam]));
  });

  it('ships four read-only exercises without exposing their answers in the lesson', () => {
    const path = `src/content/exercises/${slug}.yaml`;
    expect(existsSync(path)).toBe(true);
    const file = parse(readFileSync(path, 'utf8')) as ExerciseFile;
    expect(file.exercises.map(e => e.id)).toEqual(['2-3-1', '2-3-2', '2-3-3', '2-3-4']);
    for (const e of file.exercises) {
      expect(e.kind).toBe('query');
      expect(e.ordered).toBe(false);
      expect(guardExercise(e.answer).ok, e.id).toBe(true);
      expect(lesson().body.replace(/\s+/g, ' '), e.id).not.toContain(e.answer.replace(/\s+/g, ' ').trim());
    }
  });
});
