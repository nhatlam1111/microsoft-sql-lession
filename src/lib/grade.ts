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
  const a = ordered ? mine.rows : sorted(mine.rows);
  const b = ordered ? answer.rows : sorted(answer.rows);
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
