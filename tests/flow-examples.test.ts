import { expect, it } from 'vitest';
import { checkFlow, inputPreview, type FlowCell, type FlowStep } from '../src/lib/run-flow';

type Example = {
  title: string; note: string;
  table?: { columns: string[]; rows: FlowCell[][] };
  calculations?: { expression: string; explanation: string; column: string; value: FlowCell }[];
  conclusion?: string;
};
const query = 'SELECT MaPB, SoHoSo\nFROM T;';
const source: FlowStep = {
  clause: 'FROM', title: 'Nguồn', focus: 'FROM T', meaning: 'Nguồn', detail: 'Nguồn', sql: 'SELECT * FROM T;',
  columns: ['MaPB', 'SoHoSo'], rows: [['BGD', 2], ['NS', 5], ['KT', 7], ['KD', 13], ['IT', 10], ['VH', 8]],
};
const selected: FlowStep = { ...source, clause: 'SELECT', focus: 'SELECT MaPB, SoHoSo' };
const example = (): Example => ({
  title: 'Nhóm BGD', note: 'Đủ hai hồ sơ của nhóm mẫu.',
  table: { columns: ['MaNV', 'MaPB'], rows: [['NV004', 'BGD'], ['NV009', 'BGD']] },
  calculations: [
    { expression: 'MaPB', explanation: 'Lấy mã chung.', column: 'MaPB', value: 'BGD' },
    { expression: 'COUNT(*)', explanation: 'Đếm hai hồ sơ.', column: 'SoHoSo', value: 2 },
  ],
});
const problems = (examples: Example[], mark?: number[]) => checkFlow([source, { ...selected, examples, mark }], query);

it('accepts a worked example whose calculated cells belong to one result row, keeping input excerpts bounded', () => {
  expect(problems([example()], [1])).toEqual([]);
  expect(inputPreview({ ...selected, examples: [example()] }, source).rows).toHaveLength(5);
  expect(checkFlow([source, selected], query)).toEqual([]);
});

it.each([
  ['empty examples', []],
  ['more than two examples', [example(), example(), example()]],
  ['missing scope note', [{ ...example(), note: '' }]],
  ['missing title', [{ ...example(), title: '' }]],
  ['no table or calculations', [{ title: 'Nhóm', note: 'Phạm vi' }]],
  ['table with more than five rows', [{ ...example(), table: { columns: ['MaNV'], rows: Array.from({ length: 6 }, (_, i) => [i]) } }]],
  ['table with wrong width', [{ ...example(), table: { columns: ['MaNV', 'MaPB'], rows: [['NV004']] } }]],
  ['table without columns', [{ ...example(), table: { columns: [], rows: [[]] } }]],
  ['empty table', [{ ...example(), table: { columns: ['MaNV'], rows: [] } }]],
  ['more than five calculations', [{ ...example(), calculations: Array.from({ length: 6 }, () => example().calculations![0]) }]],
  ['empty calculations', [{ ...example(), calculations: [] }]],
  ['missing expression', [{ ...example(), calculations: [{ ...example().calculations![0], expression: '' }] }]],
  ['missing explanation', [{ ...example(), calculations: [{ ...example().calculations![0], explanation: '' }] }]],
  ['unknown result column', [{ ...example(), calculations: [{ ...example().calculations![0], column: 'Missing' }] }]],
  ['wrong result value', [{ ...example(), calculations: [{ ...example().calculations![1], value: 45 }] }]],
  ['cells from different groups', [{ ...example(), calculations: [example().calculations![0], { ...example().calculations![1], value: 5 }] }]],
] as [string, Example[]][])('rejects misleading or unbounded examples: %s', (_name, examples) => {
  expect(problems(examples).some(p => p.startsWith('bước 2: minh họa'))).toBe(true);
});

it.each([0, -1, 7, 1.5])('rejects a result highlight outside the shown rows: %s', row => {
  expect(problems([example()], [row]).some(p => p.startsWith('bước 2:') && p.includes('đánh dấu'))).toBe(true);
});

it('accepts a data-only grouping illustration without inventing an aggregate result', () => {
  const { calculations: _calculations, ...dataOnly } = example();
  expect(problems([dataOnly])).toEqual([]);
});
