import { it, expect } from 'vitest';
import { clauseRank, checkFlow, snakeLayout, previewOf, splitFocus, inlineCode } from '../src/lib/run-flow';
import { sampleFlow, sampleQuery } from './helpers/flows';

it('ranks clauses in SQL Server run order', () => {
  expect(['FROM', 'LEFT JOIN', 'INNER JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'SET', 'DELETE', 'DISTINCT', 'ORDER BY', 'TOP', 'OFFSET', 'Messages', 'FOO'].map(clauseRank))
    .toEqual([1, 2, 2, 3, 4, 5, 6, 6, 6, 7, 8, 9, 9, 10, null]);
});
it('accepts the sample flow', () => expect(checkFlow(sampleFlow(), sampleQuery())).toEqual([]));
it('reports every broken rule with its step number', () => {
  const f = sampleFlow(); const q = sampleQuery();
  expect(checkFlow(f.slice(0, 1), q)).toEqual(['sơ đồ cần ít nhất 2 bước']);
  expect(checkFlow([f[0], { ...f[1], clause: 'FOO' }], q)[0]).toMatch(/^bước 2: .*FOO/);
  expect(checkFlow([f[0], f[2], f[1]], q)[0]).toMatch(/^bước 3: .*LEFT JOIN.*WHERE/);
  expect(checkFlow([f[0], { ...f[1], rows: [['NV001']] }], q)[0]).toMatch(/^bước 2: dòng 1/);
  expect(checkFlow([f[0], { ...f[1], total: 3 }], q)[0]).toMatch(/^bước 2: .*total/);
  expect(checkFlow([f[0], { ...f[1], rows: Array(11).fill(f[1].rows[0]), total: 57 }], q)[0]).toMatch(/^bước 2: .*10 dòng/);
  expect(checkFlow([f[0], { ...f[1], detail: '' }], q)[0]).toMatch(/^bước 2: thiếu detail/);
  expect(checkFlow([f[0], { ...f[1], meaning: '' }], q)[0]).toMatch(/^bước 2: thiếu meaning/);
  expect(checkFlow([f[0], { ...f[1], focus: 'GROUP BY nv.MaPB' }], q)[0]).toMatch(/^bước 2: không tìm thấy/);
});
it('lays cards out in a snake, three per row', () => {
  expect(snakeLayout(5)).toEqual([
    { row: 0, col: 0, arrow: 'right' }, { row: 0, col: 1, arrow: 'right' }, { row: 0, col: 2, arrow: 'down' },
    { row: 1, col: 2, arrow: 'left' }, { row: 1, col: 1, arrow: null },
  ]);
  expect(snakeLayout(7).slice(5)).toEqual([{ row: 1, col: 0, arrow: 'down' }, { row: 2, col: 0, arrow: null }]);
});
it('previews at most 3 rows and 3 columns and counts the rest', () => {
  const p = previewOf(sampleFlow()[0]);
  expect([p.columns.length, p.rows.length, p.moreRows, p.moreCols]).toEqual([3, 3, 45, 9]);
  expect(previewOf({ ...sampleFlow()[2], rows: [], total: 0 })).toMatchObject({ rows: [], moreRows: 0 });
});
it('widens the highlighted part of the query to whole lines', () => {
  const q = 'SELECT a\nFROM T\nWHERE x IS NULL   -- note\nORDER BY a;';
  expect(splitFocus(q, 'WHERE x IS NULL')).toEqual({ before: 'SELECT a\nFROM T\n', focus: 'WHERE x IS NULL   -- note', after: '\nORDER BY a;' });
  expect(splitFocus(q, 'GROUP BY a')).toBeNull();
});
it('splits backtick code out of the explanation text', () => {
  expect(inlineCode('`LEFT JOIN` giữ dòng, để `NULL`.')).toEqual([
    { code: true, text: 'LEFT JOIN' }, { code: false, text: ' giữ dòng, để ' }, { code: true, text: 'NULL' }, { code: false, text: '.' },
  ]);
  expect(inlineCode('lẻ ` một dấu')).toEqual([{ code: false, text: 'lẻ ` một dấu' }]);
});
