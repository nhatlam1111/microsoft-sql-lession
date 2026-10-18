/** How exercise results are formatted and compared; shared by the API and the tests. */

export type Cell = string | number | boolean | null;

/** A result column; `type` is the SQL type name in lower case (decimal, date, nvarchar…). */
export interface ResultColumn { name: string; type: string; scale?: number }

export interface Shape { columns: ResultColumn[]; rows: Cell[][] }

export interface Verdict { correct: boolean; reason: string | null }

const pad = (n: number) => String(n).padStart(2, '0');
const isoDate = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
const isoTime = (d: Date) => `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;

/** One value as text the grader can compare: exact decimals, dates without a time zone. */
export function formatCell(value: unknown, column: ResultColumn): Cell {
  if (value === null || value === undefined) return null;
  const type = column.type.toLowerCase();
  if ((type === 'decimal' || type === 'numeric' || type === 'money' || type === 'smallmoney') && typeof value === 'number') {
    // The driver reports no scale for money; SQL Server always keeps four decimals there, as SSMS shows.
    const scale = column.scale ?? (type === 'money' || type === 'smallmoney' ? 4 : undefined);
    return scale === undefined ? String(value) : value.toFixed(scale);
  }
  if (value instanceof Date) {
    if (type === 'date') return isoDate(value);
    if (type === 'time') return isoTime(value);
    return `${isoDate(value)} ${isoTime(value)}`;
  }
  // Node's Buffer is a Uint8Array, so binary columns land here.
  if (value instanceof Uint8Array) {
    return '0x' + Array.from(value, b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  return String(value);
}

const NUMERIC = new Set(['tinyint', 'smallint', 'int', 'bigint', 'decimal', 'numeric', 'money', 'smallmoney', 'float', 'real']);

/** A number as plain text without trailing zeros, so 9610000, '9610000.0' and '9610000' all match. */
function canonicalNumber(cell: Cell): Cell {
  if (cell === null) return null;
  const s = String(cell);
  if (!/^-?\d+(\.\d+)?$/.test(s)) return cell;
  const trimmed = s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s;
  return trimmed === '-0' ? '0' : trimmed;
}

/** Rows ready to compare: numeric columns (numeric on either side) in canonical form; display keeps formatCell's text. */
function comparable(shape: Shape, numeric: boolean[]): Cell[][] {
  return shape.rows.map(row => row.map((cell, i) => (numeric[i] ? canonicalNumber(cell) : cell)));
}

const key = (row: Cell[]) => JSON.stringify(row);
const same = (a: Cell, b: Cell) => key([a]) === key([b]);
const CORRECT: Verdict = { correct: true, reason: null };
const wrong = (reason: string): Verdict => ({ correct: false, reason });

/** Which columns compare as numbers: numeric on either side. */
const numericColumns = (mine: Shape, answer: Shape) =>
  answer.columns.map((c, i) => NUMERIC.has(c.type.toLowerCase()) || NUMERIC.has((mine.columns[i]?.type ?? '').toLowerCase()));

/** Positions of the rows in `rows` that `others` has no match for, in order; each row of `others` matches once. */
function unmatched(rows: Cell[][], others: Cell[][]): number[] {
  const left = new Map<string, number>();
  for (const r of others) left.set(key(r), (left.get(key(r)) ?? 0) + 1);
  return rows.flatMap((r, i) => {
    const n = left.get(key(r)) ?? 0;
    if (n === 0) return [i];
    left.set(key(r), n - 1);
    return [];
  });
}

const columnNames = (shape: Shape, cols: number[]) => cols.map(i => shape.columns[i].name).join(', ');
const rowValues = (shape: Shape, row: number, cols: number[]) =>
  cols.map(i => `${shape.columns[i].name} = ${shape.rows[row][i] ?? 'NULL'}`).join(', ');

/**
 * Compares a learner's result with the answer by value; column names never count, row order only when `ordered`.
 * The reason points at the learner's own row in Results and the columns that differ, never at the answer's values.
 */
export function compareResults(mine: Shape, answer: Shape, ordered: boolean): Verdict {
  if (mine.columns.length !== answer.columns.length) {
    return wrong(`khác số cột (bạn ra ${mine.columns.length}, đề cần ${answer.columns.length})`);
  }
  if (mine.rows.length !== answer.rows.length) {
    return wrong(`khác số dòng (bạn ra ${mine.rows.length}, đáp án ${answer.rows.length})`);
  }
  const numeric = numericColumns(mine, answer);
  const mineRows = comparable(mine, numeric);
  const answerRows = comparable(answer, numeric);
  if (!ordered) {
    const extra = unmatched(mineRows, answerRows);
    return extra.length ? wrong(`dòng ${extra[0] + 1} không có trong đáp án`) : CORRECT;
  }
  const i = mineRows.findIndex((row, k) => key(row) !== key(answerRows[k]));
  if (i < 0) return CORRECT;
  const differ = mineRows[i].flatMap((cell, c) => (same(cell, answerRows[i][c]) ? [] : [c]));
  return wrong(`dòng ${i + 1} khác ở cột ${columnNames(mine, differ)}`);
}

/**
 * Compares a data change: the number of rows it touched first, then the table as the check query sees it.
 * The learner never sees the check result, so a wrong row is named by its own values, with the columns that differ.
 */
export function compareChanges(mine: { affected: number; check: Shape }, answer: { affected: number; check: Shape }): Verdict {
  if (mine.affected !== answer.affected) {
    return wrong(`khác số dòng bị ảnh hưởng (bạn ${mine.affected}, đáp án ${answer.affected})`);
  }
  const m = mine.check;
  const a = answer.check;
  if (m.columns.length !== a.columns.length) return wrong('dữ liệu sau khi sửa khác đáp án');
  if (m.rows.length !== a.rows.length) return wrong(`sau khi sửa, bảng còn ${m.rows.length} dòng, đáp án còn ${a.rows.length} dòng`);
  const numeric = numericColumns(m, a);
  const mineRows = comparable(m, numeric);
  const answerRows = comparable(a, numeric);
  const extra = unmatched(mineRows, answerRows);
  if (extra.length === 0) return CORRECT;
  const row = mineRows[extra[0]];
  const all = row.map((_, c) => c);
  // The answer row most like it shares its key columns; the other columns are the ones the change got wrong.
  let keyColumns: number[] = [];
  for (const r of unmatched(answerRows, mineRows)) {
    const shared = all.filter(c => same(row[c], answerRows[r][c]));
    if (shared.length > keyColumns.length) keyColumns = shared;
  }
  if (keyColumns.length === 0) return wrong(`sau khi sửa vẫn còn dòng ${rowValues(m, extra[0], all)} mà đáp án không có`);
  const differ = all.filter(c => !keyColumns.includes(c));
  return wrong(`sau khi sửa, dòng ${rowValues(m, extra[0], keyColumns)} khác đáp án ở cột ${columnNames(m, differ)}`);
}
