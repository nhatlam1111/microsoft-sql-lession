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
    return value.toFixed(column.scale ?? 0);
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
const sorted = (rows: Cell[][]) => [...rows].sort((a, b) => (key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0));

/** Compares a learner's result with the answer by value; column names never count, row order only when `ordered`. */
export function compareResults(mine: Shape, answer: Shape, ordered: boolean): Verdict {
  if (mine.columns.length !== answer.columns.length) {
    return { correct: false, reason: `khác số cột (bạn ra ${mine.columns.length}, đề cần ${answer.columns.length})` };
  }
  if (mine.rows.length !== answer.rows.length) {
    return { correct: false, reason: `khác số dòng (bạn ra ${mine.rows.length}, đáp án ${answer.rows.length})` };
  }
  const numeric = answer.columns.map((c, i) => NUMERIC.has(c.type.toLowerCase()) || NUMERIC.has((mine.columns[i]?.type ?? '').toLowerCase()));
  const mineRows = comparable(mine, numeric);
  const answerRows = comparable(answer, numeric);
  const a = ordered ? mineRows : sorted(mineRows);
  const b = ordered ? answerRows : sorted(answerRows);
  const i = a.findIndex((row, k) => key(row) !== key(b[k]));
  return i < 0 ? { correct: true, reason: null } : { correct: false, reason: `dòng ${i + 1} khác` };
}

/** Compares a data change: the number of rows it touched first, then what the check query sees. */
export function compareChanges(mine: { affected: number; check: Shape }, answer: { affected: number; check: Shape }): Verdict {
  if (mine.affected !== answer.affected) {
    return { correct: false, reason: `khác số dòng bị ảnh hưởng (bạn ${mine.affected}, đáp án ${answer.affected})` };
  }
  return compareResults(mine.check, answer.check, true);
}
