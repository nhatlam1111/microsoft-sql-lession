import { it, expect } from 'vitest';
import { clauseRank, checkFlow, snakeLayout, previewOf, splitFocus, inlineCode, arrowMove, inputSteps, isUnionFlow, excerptNote, checkKept } from '../src/lib/run-flow';
import { sampleFlow, sampleQuery } from './helpers/flows';
import { unionFlow, unionQuery } from './helpers/union-flow';

it('combines two independent SELECT results before sorting a UNION result', () => {
  expect(clauseRank('UNION')).toBe(7);
  expect(clauseRank('UNION ALL')).toBe(7);
  const steps = unionFlow();
  expect(checkFlow(steps, unionQuery)).toEqual([]);
  expect(checkFlow([steps[0], steps[1], steps[3], steps[2]], unionQuery)).toContain('bước 4: "UNION" không thể chạy sau "ORDER BY"');
  expect(checkFlow([steps[0], steps[2], steps[1], steps[3]], unionQuery)).toContain('bước 3: "SELECT" không thể chạy sau "UNION"');
});

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
it('a step can choose which columns its card previews, and they must be its own', () => {
  const step = { ...sampleFlow()[0], preview: ['MaPB', 'MaNV'] };
  const p = previewOf(step);
  expect(p.columns).toEqual(['MaPB', 'MaNV']);
  expect(p.rows[0]).toEqual([step.rows[0][step.columns.indexOf('MaPB')], step.rows[0][step.columns.indexOf('MaNV')]]);
  expect(p.moreCols).toBe(step.columns.length - 2);
  const f = sampleFlow();
  expect(checkFlow([{ ...f[0], preview: ['KhongCo'] }, f[1]], sampleQuery())[0]).toMatch(/^bước 1: .*KhongCo/);
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
it('moves a step with a bare arrow key on the drawer or a card, and leaves every other key alone', () => {
  const key = (k: string, mods: Partial<Record<'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey', boolean>> = {}) =>
    ({ key: k, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...mods });
  expect([arrowMove(key('ArrowLeft'), true), arrowMove(key('ArrowRight'), true), arrowMove(key('Enter'), true)]).toEqual([-1, 1, 0]);
  expect(arrowMove(key('ArrowLeft', { altKey: true }), true)).toBe(0);
  expect(arrowMove(key('ArrowRight', { ctrlKey: true }), true)).toBe(0);
  expect(arrowMove(key('ArrowRight'), false)).toBe(0);
});
it('an empty step previews no columns either', () => {
  expect(previewOf({ ...sampleFlow()[0], rows: [], total: 0 })).toMatchObject({ rows: [], moreRows: 0, moreCols: 0 });
});
it('feeds each step from the one before it, and a set operation from both branches', () => {
  const f = sampleFlow();
  expect(isUnionFlow(f)).toBe(false);
  expect(inputSteps(f).map(i => i.map(s => s.clause))).toEqual([[], ['FROM'], ['LEFT JOIN'], ['WHERE'], ['SELECT']]);
  const u = unionFlow();
  expect(isUnionFlow(u)).toBe(true);
  expect(inputSteps(u).map(i => i.length)).toEqual([0, 0, 2, 1]);
});
it('says how much of a table an excerpt shows, and nothing when it shows all of it', () => {
  const note = (rows: number, moreRows: number, columns: number, moreCols: number) => excerptNote({
    columns: Array(columns).fill('c'), rows: Array(rows).fill([]), moreRows, moreCols,
  });
  expect(note(4, 44, 3, 9)).toBe('Trích 4 trong 48 dòng, 3 trong 12 cột');
  expect(note(4, 0, 3, 9)).toBe('Trích 3 trong 12 cột');
  expect(note(4, 44, 3, 0)).toBe('Trích 4 trong 48 dòng');
  expect(note(4, 0, 3, 0)).toBe('');
});
it('keeps a row in the check table only when every condition holds', () => {
  expect(checkKept(['NV003', true, true])).toBe(true);
  expect(checkKept(['NV002', true, false])).toBe(false);
});
it('stops a check table whose rows or totals do not match the step', () => {
  const f = sampleFlow();
  const [kept, dropped] = ['NV001', 'NV003'];
  const step = { ...f[2], rows: [[kept, 'Người 1', null], ['NV002', 'Người 2', null]] };
  const flow = (checks: typeof step.checks) => checkFlow([f[0], f[1], { ...step, checks }], sampleQuery());
  const good = { conditions: ['IS NULL'], rows: [[kept, true], [dropped, false]] as [string, boolean][], totals: [step.total!, step.total!] };
  expect(flow(good)).toEqual([]);
  expect(flow({ ...good, rows: [[kept, true, false]] })[0]).toMatch(/^bước 3: bảng soi dòng 1/);
  expect(flow({ ...good, totals: [step.total!] })[0]).toMatch(/^bước 3: bảng soi cần 2 số tổng/);
  expect(flow({ ...good, totals: [step.total!, step.total! + 1] })[0]).toMatch(/^bước 3: bảng soi giữ/);
  expect(flow({ ...good, rows: [['KHONGCO', true]] })[0]).toMatch(/^bước 3: .*KHONGCO.*đầu vào/);
  expect(flow({ ...good, rows: [[dropped, true]] })[0]).toMatch(/^bước 3: .*được giữ nhưng không có/);
  expect(flow({ ...good, rows: [[kept, false]] })[0]).toMatch(/^bước 3: .*bị loại nhưng vẫn có/);
});
it('an empty step must say its total is 0', () => {
  const f = sampleFlow();
  expect(checkFlow([f[0], { ...f[1], rows: [] }], sampleQuery())[0]).toMatch(/^bước 2: .*total/);
});
