export type FlowCell = string | number | null;

/** One step of a run-order diagram, as written in a lesson file. */
export interface FlowStep {
  clause: string;
  /** One sentence on the card and at the top of the drawer. */
  title: string;
  /** The part of the full query this step runs; the drawer highlights its lines. */
  focus: string;
  /** What the keyword does in general. Text between backticks is code. */
  meaning: string;
  /** What happens to the data at this step. Text between backticks is code. */
  detail: string;
  /** A query that returns exactly this step's result. */
  sql: string;
  columns: string[];
  rows: FlowCell[][];
  /** Full row count when `rows` is an excerpt. */
  total?: number;
  excel?: string;
}

const MAX_ROWS = 10;

// SQL Server's logical processing order; steps that update data reuse the SELECT slot for SET and DELETE.
const RANKS: [RegExp, number][] = [
  [/^FROM$/, 1],
  [/\bJOIN$/, 2],
  [/^WHERE$/, 3],
  [/^GROUP BY$/, 4],
  [/^HAVING$/, 5],
  [/^(SELECT|SET|DELETE)$/, 6],
  [/^DISTINCT$/, 7],
  [/^ORDER BY$/, 8],
  [/^(TOP|OFFSET)$/, 9],
  [/^Messages$/, 10],
];

export function clauseRank(clause: string): number | null {
  return RANKS.find(([re]) => re.test(clause))?.[1] ?? null;
}

export function rowCount(step: FlowStep): number {
  return step.total ?? step.rows.length;
}

/** Every broken rule in a flow, as readable messages; empty when all is well. */
export function checkFlow(steps: FlowStep[], query: string): string[] {
  if (steps.length < 2) return ['sơ đồ cần ít nhất 2 bước'];
  const problems: string[] = [];
  let previous: FlowStep | null = null;
  steps.forEach((step, i) => {
    const at = `bước ${i + 1}:`;
    for (const field of ['title', 'focus', 'meaning', 'detail', 'sql'] as const) {
      if (!step[field].trim()) problems.push(`${at} thiếu ${field}`);
    }
    if (step.focus.trim() && !splitFocus(query, step.focus)) problems.push(`${at} không tìm thấy "${step.focus}" trong câu lệnh`);
    const rank = clauseRank(step.clause);
    if (rank === null) problems.push(`${at} không rõ mệnh đề "${step.clause}"`);
    else if (previous && rank < (clauseRank(previous.clause) ?? 0)) {
      problems.push(`${at} "${step.clause}" không thể chạy sau "${previous.clause}"`);
    }
    step.rows.forEach((row, r) => {
      if (row.length !== step.columns.length) problems.push(`${at} dòng ${r + 1} có ${row.length} ô, cần ${step.columns.length}`);
    });
    if (step.total !== undefined && step.total < step.rows.length) problems.push(`${at} total nhỏ hơn số dòng đã ghi`);
    if (step.rows.length > MAX_ROWS) problems.push(`${at} ghi tối đa ${MAX_ROWS} dòng, phần còn lại dùng total`);
    previous = step;
  });
  return problems;
}

export interface SnakeCell { row: number; col: number; arrow: 'right' | 'left' | 'down' | null }

/** Grid places for the cards: even rows run left to right, odd rows right to left. */
export function snakeLayout(count: number, perRow = 3): SnakeCell[] {
  return Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / perRow);
    const step = i % perRow;
    const forward = row % 2 === 0;
    const col = forward ? step : perRow - 1 - step;
    let arrow: SnakeCell['arrow'] = null;
    if (i < count - 1) arrow = step === perRow - 1 ? 'down' : forward ? 'right' : 'left';
    return { row, col, arrow };
  });
}

export interface Preview { columns: string[]; rows: FlowCell[][]; moreRows: number; moreCols: number }

export function previewOf(step: FlowStep, maxRows = 3, maxCols = 3): Preview {
  const columns = step.columns.slice(0, maxCols);
  const rows = step.rows.slice(0, maxRows).map(r => r.slice(0, maxCols));
  return { columns, rows, moreRows: rowCount(step) - rows.length, moreCols: step.columns.length - columns.length };
}

/** The query cut around the whole lines that hold `focus`; null when `focus` is not in the query. */
export function splitFocus(query: string, focus: string): { before: string; focus: string; after: string } | null {
  const at = query.indexOf(focus);
  if (at < 0) return null;
  const start = query.lastIndexOf('\n', at - 1) + 1;
  const newline = query.indexOf('\n', at + focus.length);
  const end = newline < 0 ? query.length : newline;
  return { before: query.slice(0, start), focus: query.slice(start, end), after: query.slice(end) };
}

/** Explanation text split into plain and backtick code parts; an odd number of backticks keeps it all plain. */
export function inlineCode(text: string): { code: boolean; text: string }[] {
  const parts = text.split('`');
  if (parts.length % 2 === 0) return [{ code: false, text }];
  return parts.map((part, i) => ({ code: i % 2 === 1, text: part })).filter(p => p.text !== '');
}
