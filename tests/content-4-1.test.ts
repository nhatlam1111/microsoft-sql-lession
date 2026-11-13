import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { parse } from 'yaml';
import { fixtureQuery } from './helpers/window-fixture';
import { lessonBlocks } from './helpers/lesson-blocks';
import { checkFlow, splitFocus } from '../src/lib/run-flow';
import { guardExercise } from '../src/lib/sql-guard';

const slug = '3-12-cte-tung-buoc';
it('3.12 keeps the exact-threshold type after aggregation, and returns only the requested two columns', () => {
  const { body, query, results, steps } = lessonBlocks(slug);
  const [main, inspection] = [...body.matchAll(/<Sql code=\{(`[^`]*`)\} (?:copy=\{false\} )?\/>/g)];
  const statement = runInNewContext(main[1]) as string;
  expect(statement).toBe(query);
  expect(results).toEqual([{
    columns: ['LoaiNghi', 'TongNgay'],
    rows: [['Phép năm', 9], ['Nghỉ ốm', 5]],
    total: 2,
  }]);
  expect(steps.map(s => [s.clause, s.total])).toEqual([
    ['CTE', 9], ['CTE', 3], ['FROM', 3], ['WHERE', 2], ['SELECT', 2], ['ORDER BY', 2],
  ]);
  expect(checkFlow(steps, query)).toEqual([]);
  for (const stage of [{ sql: statement, ...results[0] }, ...steps]) {
    const actual = fixtureQuery(stage.sql);
    expect(actual.columns).toEqual(stage.columns);
    expect(actual.rows).toHaveLength(stage.total!);
    expect(actual.rows).toEqual(stage.rows);
    expect(guardExercise(stage.sql)).toEqual({ ok: true });
  }
  const [orders, totals, from, , select] = steps;
  expect(splitFocus(query, orders.focus)?.focus).toContain('FROM DonNghiPhep');
  expect(splitFocus(query, totals.focus)?.focus).toContain('FROM DonDaDuyetThang9');
  expect(from.rows).toEqual(totals.rows);
  expect(checkFlow([from, orders], query)).toContain('bước 2: "CTE" không thể chạy sau "FROM"');
  const focus = splitFocus(query, select.focus)!;
  expect(focus.before).toContain('TongTheoLoai AS');
  expect(focus.focus).toContain('SELECT tl.');

  const definition = statement.slice(0, statement.indexOf(', TongTheoLoai AS'));
  const inspectionSql = definition + '\n' + runInNewContext(inspection[1]);
  expect(orders.sql).toBe(inspectionSql);
  const { columns, rows } = fixtureQuery(inspectionSql);
  expect(guardExercise(inspectionSql)).toEqual({ ok: true });
  expect(columns).toEqual(['MaDon', 'LoaiNghi', 'SoNgay']);
  expect(rows).toHaveLength(9);
  const exampleRows = runInNewContext(body.match(/<Excel\b[^>]*?rows=\{(\[[\s\S]*?\])\}/)![1]);
  const sickLeave = rows.filter(row => row[1] === 'Nghỉ ốm');
  expect(exampleRows).toEqual([columns, ...sickLeave]);
  expect(totals.examples?.[0].table?.rows).toEqual(sickLeave.map(([id, , days]) => [id, days]));
});

it('3.12 exercises distinguish a sum of days, active profile counts, and repeated contracts', () => {
  const { exercises } = parse(readFileSync(`src/content/exercises/${slug}.yaml`, 'utf8'));
  expect(exercises.map((exercise: { id: string }) => exercise.id)).toEqual(['4-1-1', '4-1-2', '4-1-3']);
  const rows = exercises.map((exercise: { answer: string, columns: string[] }) => {
    expect(guardExercise(exercise.answer)).toEqual({ ok: true });
    const result = fixtureQuery(exercise.answer);
    expect(result.columns).toEqual(exercise.columns);
    return result.rows;
  });
  expect(rows[0]).toEqual([['Phép năm', 12], ['Nghỉ ốm', 2]]);
  expect(rows[1]).toEqual([['IT', 10], ['KD', 13], ['VH', 8]]);
  expect(rows[2]).toEqual([
    ['NV021', 3], ['NV025', 2], ['NV029', 2], ['NV030', 3],
    ['NV040', 2], ['NV044', 2], ['NV045', 2],
  ]);
  const definition = exercises[2].answer.split(', NhieuHopDong AS')[0];
  const inspection = fixtureQuery(definition + "\nSELECT MaNV, SoHopDong FROM DemHopDong WHERE MaNV IN ('NV004', 'NV021') ORDER BY MaNV;");
  expect(inspection.rows).toEqual([['NV004', 1], ['NV021', 3]]);
});
