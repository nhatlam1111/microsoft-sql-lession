export type FlowCell = string | number | null;

/** Whether a condition holds; null is UNKNOWN on a filter and a branch not reached in a CASE. */
export type CheckCell = boolean | null;

/**
 * How a step treated some rows of its input, one condition per column.
 * On a filter, conditions join by AND: all true means kept. With `labels` it is a CASE: each row stops at its first true branch.
 */
export interface FlowChecks {
  /** Header per condition, naming its column. */
  conditions: string[];
  /** One row per record: its key from the input's first column, then each condition. */
  rows: [string, ...CheckCell[]][];
  /** Input rows meeting each condition, then the rows kept; with `labels`, rows stopping at each branch, then at ELSE. */
  totals: number[];
  /** The label each row ends with, in row order. */
  labels?: string[];
}

/** One step of a run-order diagram, as written in a lesson file. */
export interface FlowStep {
  clause: string;
  /** One sentence on the card and at the top of the drawer. */
  title: string;
  /** The part of the full query this step runs; the drawer highlights its lines. */
  focus: string;
  /** Shown under "Thực hiện": what the step does to the rows. Text between backticks is code. */
  meaning: string;
  /** Shown under "Kết quả": what comes out of the step. Text between backticks is code. */
  detail: string;
  /** A query that returns exactly this step's result. Not shown; it is the evidence to re-run the step. */
  sql: string;
  columns: string[];
  rows: FlowCell[][];
  /** Full row count when `rows` is an excerpt. */
  total?: number;
  /** Words for "Đầu vào": the source of a first step, or the other table of a join. Text between backticks is code. */
  input?: string;
  /** Columns of the step before shown under "Đầu vào"; by default the ones its card previews. Use it when this step needs other columns. */
  inputColumns?: string[];
  checks?: FlowChecks;
  /** Columns the card previews, in this order; by default the first three. Use it when the step is about a column further right. */
  preview?: string[];
}

const MAX_ROWS = 10;
const INPUT_ROWS = 5;

// SQL Server's logical processing order; steps that update data reuse the SELECT slot for SET and DELETE.
const RANKS: [RegExp, number][] = [
  [/^FROM$/, 1],
  [/\bJOIN$/, 2],
  [/^WHERE$/, 3],
  [/^GROUP BY$/, 4],
  [/^HAVING$/, 5],
  [/^(SELECT|SET|DELETE)$/, 6],
  [/^(DISTINCT|UNION(?: ALL)?)$/, 7],
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

/** Two completed SELECT branches feed one set operation, rather than feeding each other. */
export function isUnionFlow(steps: FlowStep[]): boolean {
  return steps.length === 4
    && steps[0].clause === 'SELECT' && steps[1].clause === 'SELECT'
    && /^UNION(?: ALL)?$/.test(steps[2].clause) && steps[3].clause === 'ORDER BY';
}

/** The steps whose rows go into each step: none for a first step or a UNION branch, both branches for the UNION. */
export function inputSteps(steps: FlowStep[]): FlowStep[][] {
  const union = isUnionFlow(steps);
  return steps.map((_, i) => {
    if (i === 0 || (union && i === 1)) return [];
    return union && i === 2 ? [steps[0], steps[1]] : [steps[i - 1]];
  });
}

export const checkKept = ([, ...results]: [string, ...CheckCell[]]): boolean => results.every(r => r === true);

export function checkCellText(cell: CheckCell, branches: boolean): string {
  if (cell === null) return branches ? 'Không xét' : 'UNKNOWN';
  return cell ? 'Đúng' : 'Sai';
}

/** Says the check table is an excerpt and what its last row counts. */
export function checkNote(checks: FlowChecks, source: number): string {
  const excerpt = `Trích ${checks.rows.length} trong ${source} dòng`;
  if (checks.labels) return `${excerpt}; hàng cuối đếm số dòng dừng ở từng nhánh.`;
  const counted = checks.conditions.length > 1 ? 'đếm riêng từng điều kiện' : 'đếm';
  return `${excerpt}; hàng cuối ${counted} trên cả ${source} dòng.`;
}

function checkTable(step: FlowStep, inputs: FlowStep[]): string[] {
  if (inputs.length === 0) return ['bảng soi cần bước trước'];
  const { conditions, rows, totals, labels } = step.checks!;
  const problems: string[] = [];
  const width = conditions.length + 1;
  const count = rowCount(step);
  if (totals.length !== width) problems.push(`bảng soi cần ${width} số tổng, đang có ${totals.length}`);
  else if (labels) {
    const counted = totals.reduce((sum, n) => sum + n, 0);
    if (counted !== count) problems.push(`bảng nhánh đếm ${counted} dòng, bước có ${count} dòng`);
  } else if (totals[width - 1] !== count) problems.push(`bảng soi giữ ${totals[width - 1]} dòng, bước có ${count} dòng`);
  else if (totals.slice(0, -1).some(n => n < count)) problems.push('bảng soi có số đúng nhỏ hơn số giữ');
  if (labels && labels.length !== rows.length) problems.push(`bảng nhánh có ${labels.length} nhãn cho ${rows.length} hàng`);
  const inInput = new Set(inputs.flatMap(s => s.rows.slice(0, INPUT_ROWS).map(r => r[0])));
  const inResult = new Set(step.rows.map(r => r[0]));
  rows.forEach((row, r) => {
    if (row.length !== width) { problems.push(`bảng soi dòng ${r + 1} có ${row.length} ô, cần ${width}`); return; }
    const [key, ...cells] = row;
    if (!inInput.has(key)) problems.push(`bảng soi có ${key} nhưng ${key} không nằm trong đầu vào`);
    else if (labels) {
      const stop = cells.indexOf(true);
      const reached = stop < 0 ? cells.length : stop;
      if (cells.some((c, i) => (i < reached ? c !== false : i > reached && c !== null))) problems.push(`${key}: nhánh trước nhánh đúng phải là false, sau nhánh đúng phải là null`);
      const shown = step.rows.find(s => s[0] === key);
      if (shown && labels[r] !== undefined && !shown.includes(labels[r])) problems.push(`${key} có nhãn ${labels[r]} khác kết quả của bước`);
    } else if (checkKept(row) && !inResult.has(key)) problems.push(`${key} được giữ nhưng không có trong kết quả của bước`);
    else if (!checkKept(row) && inResult.has(key)) problems.push(`${key} bị loại nhưng vẫn có trong kết quả của bước`);
  });
  return problems;
}

/** Every broken rule in a flow, as readable messages; empty when all is well. */
export function checkFlow(steps: FlowStep[], query: string): string[] {
  if (steps.length < 2) return ['sơ đồ cần ít nhất 2 bước'];
  const problems: string[] = [];
  const inputs = inputSteps(steps);
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
    if (step.rows.length === 0 && rowCount(step) !== 0) problems.push(`${at} không ghi dòng nào thì total phải là 0`);
    if (step.rows.length > MAX_ROWS) problems.push(`${at} ghi tối đa ${MAX_ROWS} dòng, phần còn lại dùng total`);
    for (const c of step.preview ?? []) if (!step.columns.includes(c)) problems.push(`${at} preview có cột ${c} không nằm trong columns`);
    for (const c of step.inputColumns ?? []) if (!inputs[i].some(s => s.columns.includes(c))) problems.push(`${at} inputColumns có cột ${c} không nằm trong bước trước`);
    if (step.checks) for (const p of checkTable(step, inputs[i])) problems.push(`${at} ${p}`);
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
  const picked = (step.preview ?? step.columns.slice(0, maxCols)).map(c => step.columns.indexOf(c)).filter(i => i >= 0);
  const columns = picked.map(i => step.columns[i]);
  const rows = step.rows.slice(0, maxRows).map(r => picked.map(i => r[i]));
  // With no rows the card shows no table, so there are no hidden columns to count either.
  const moreCols = rows.length === 0 ? 0 : step.columns.length - columns.length;
  return { columns, rows, moreRows: rowCount(step) - rows.length, moreCols };
}

/** The excerpt of an earlier step shown as this step's input. */
export function inputPreview(step: FlowStep, from: FlowStep): Preview {
  return previewOf({ ...from, preview: step.inputColumns ?? from.preview }, INPUT_ROWS);
}

/** How much of the table a preview shows, in words; empty when it shows all of it. */
export function excerptNote(p: Preview): string {
  const parts = [
    p.moreRows > 0 && `${p.rows.length} trong ${p.rows.length + p.moreRows} dòng`,
    p.moreCols > 0 && `${p.columns.length} trong ${p.columns.length + p.moreCols} cột`,
  ].filter(Boolean);
  return parts.length ? `Trích ${parts.join(', ')}` : '';
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

let flowCount = 0;

/** A drawer id that differs for every diagram rendered in this build. */
export function nextFlowId(): string {
  flowCount += 1;
  return `rf-${flowCount}`;
}

export interface KeyLike { key: string; altKey: boolean; ctrlKey: boolean; metaKey: boolean; shiftKey: boolean }

/**
 * Which way a key moves the open drawer: only a bare ← or → while focus is on the drawer or a card,
 * so Alt+← still goes back and arrows still scroll a wide result table.
 */
export function arrowMove(e: KeyLike, onDrawerOrCard: boolean): -1 | 0 | 1 {
  if (!onDrawerOrCard || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return 0;
  return e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0;
}
