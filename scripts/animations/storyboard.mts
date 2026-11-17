import assert from 'node:assert/strict';
import { checkCellText, checkKept, rowCount, type FlowCell, type FlowStep } from '../../src/lib/run-flow.ts';
import { selectStory } from './select-story.ts';

export interface Table {
  columns: string[];
  rows: FlowCell[][];
  total: number;
  totalColumns: number;
}

export type Target = { row: number } | { rows: number[] } | { column: number } | { row: number; column: number };

export interface SortKey {
  column: number;
  direction: 'ASC' | 'DESC';
}

export interface Move {
  from: Target;
  to?: Target;
  cues: string[];
  related?: Target[];
  computed?: boolean;
}

export interface Scene {
  step: number;
  file: string;
  clause: string;
  focus: string;
  title: string;
  intro: string;
  conclusion: string;
  leftTitle: string;
  rightTitle: string;
  left: Table;
  right?: Table;
  moves: Move[];
  aliases?: string[];
  scopeNote?: string;
  sortKeys?: SortKey[];
}

type Calculation = (row: FlowCell[], result: FlowCell, key: FlowCell) => string[];
type Projection = string | { input: string[]; calculate: Calculation };

const same = (a: FlowCell[], b: FlowCell[]) => a.length === b.length && a.every((v, i) => v === b[i]);
const cell = (row: number, column: number): Target => ({ row, column });
const text = (value: FlowCell) => String(value ?? 'NULL');
const compare = (a: FlowCell, b: FlowCell) => text(a).localeCompare(text(b), 'en');

function excerpt(step: FlowStep, columns = step.columns, rows = step.rows, totalColumns = step.columns.length): Table {
  const indexes = columns.map(column => {
    const index = step.columns.indexOf(column);
    assert(index >= 0, `${step.clause}: không có cột ${column}`);
    return index;
  });
  return { columns, rows: rows.map(row => indexes.map(index => row[index])), total: rowCount(step), totalColumns };
}

function findRows(step: FlowStep, keys: FlowCell[]): FlowCell[][] {
  return keys.map(key => {
    const row = step.rows.find(item => item[0] === key);
    assert(row, `${step.clause}: không có dòng ${key}`);
    return row;
  });
}

const keysOf = (table: Table) => table.rows.map(row => row[0]);

// The samples below illustrate these specific queries. Revisit the story if SQL changes.
const illustratedQueries: Record<string, string> = {
  '2-2-where': `SELECT MaNV AS [Mã nhân viên], HoTen AS [Họ tên],
\tMaPB AS [Mã phòng], TrangThai AS [Trạng thái]
FROM NhanVien
WHERE MaPB = 'KD';`,
  '2-3-conditions': `SELECT MaNV AS [Mã nhân viên], HoTen AS [Họ tên],
\tMaPB AS [Mã phòng], NgayVaoLam AS [Ngày vào làm]
FROM NhanVien
WHERE MaPB IN ('KD', 'IT')
\tAND NgayVaoLam BETWEEN '20230101' AND '20230630';`,
  '2-4-order-top': `SELECT TOP (5) MaNV AS [Mã nhân viên], HoTen AS [Họ tên],
\tMaPB AS [Mã phòng], NgayVaoLam AS [Ngày vào làm]
FROM NhanVien
WHERE TrangThai = N'Đang làm'
ORDER BY NgayVaoLam DESC, MaNV ASC;`,
  '2-5-null': `SELECT MaNV AS [Mã nhân viên], HoTen AS [Họ tên],\n\tCOALESCE(Email, N'(chưa có)') AS [Email]\nFROM NhanVien\nWHERE MaPB = 'VH'\n\tAND NgayNghiViec IS NULL\nORDER BY MaNV ASC;`,
  '2-6-distinct': `SELECT DISTINCT MaPB, MaCD\nFROM NhanVien\nORDER BY MaPB ASC, MaCD ASC;`,
  '2-7-strings': `SELECT MaNV AS [Mã nhân viên],\n\tCONCAT(RIGHT(MaNV, 3), N' - ', UPPER(HoTen)) AS [Nhãn ký nhận],\n\tLEN(HoTen) AS [Số ký tự họ tên]\nFROM NhanVien\nWHERE MaPB = 'IT'\nORDER BY MaNV ASC;`,
  '2-8-dates': `SELECT MaHD, MaNV, NgayBatDau, NgayKetThuc,\n\tDATEDIFF(day, CAST('20261021' AS date), NgayKetThuc) AS [SoNgayConLai]\nFROM HopDong\nWHERE NgayKetThuc >= CAST('20261021' AS date)\n\tAND NgayKetThuc <= DATEADD(day, 30, CAST('20261021' AS date))\nORDER BY NgayKetThuc ASC, MaHD ASC;`,
  '2-9-case': `SELECT MaNV AS [Mã nhân viên], HoTen AS [Họ tên],
\tNgayVaoLam AS [Ngày vào làm],
\tCASE
\t\tWHEN DATEADD(year, 3, NgayVaoLam) <= '20261021' THEN N'Từ 3 năm trở lên'
\t\tWHEN DATEADD(year, 1, NgayVaoLam) <= '20261021' THEN N'Từ 1 đến dưới 3 năm'
\t\tELSE N'Dưới 1 năm'
\tEND AS [Nhóm thâm niên]
FROM NhanVien
WHERE TrangThai = N'Đang làm' AND NgayVaoLam <= '20261021'
ORDER BY MaNV ASC;`,
};

export function storyboard(id: string, query: string, steps: FlowStep[]): Scene[] {
  if (id === '2-1-select') selectStory(query, steps);
  else assert.equal(query, illustratedQueries[id], 'SQL đã đổi, cần cập nhật kịch bản trước khi dựng');
  const [source, where] = steps;
  const select = steps.find(step => step.clause === 'SELECT')!;
  const clauses = ['FROM', ...(where.clause === 'WHERE' ? ['WHERE'] : []), 'SELECT'];
  if (id === '2-6-distinct') clauses.push('DISTINCT');
  if (['2-4-order-top', '2-5-null', '2-6-distinct', '2-7-strings', '2-8-dates', '2-9-case'].includes(id)) clauses.push('ORDER BY');
  if (id === '2-4-order-top') clauses.push('TOP');
  assert.deepEqual(steps.map(step => step.clause), clauses);
  const tableName = id === '2-8-dates' ? 'HopDong' : 'NhanVien';
  assert.equal(source.focus, `FROM ${tableName}`);

  const sourceColumns: Record<string, string[]> = {
    '2-1-select': ['MaNV', 'HoTen', 'GioiTinh', 'NgayVaoLam'],
    '2-2-where': ['MaNV', 'HoTen', 'MaPB', 'TrangThai', 'GioiTinh'],
    '2-3-conditions': ['MaNV', 'HoTen', 'MaPB', 'NgayVaoLam', 'GioiTinh'],
    '2-4-order-top': ['MaNV', 'HoTen', 'MaPB', 'NgayVaoLam', 'TrangThai'],
    '2-5-null': ['MaNV', 'HoTen', 'Email', 'NgayNghiViec', 'MaPB'],
    '2-6-distinct': ['MaNV', 'MaPB', 'MaCD'],
    '2-7-strings': ['MaNV', 'HoTen', 'MaPB'],
    '2-8-dates': ['MaHD', 'NgayKetThuc'],
    '2-9-case': ['MaNV', 'NgayVaoLam', 'TrangThai'],
  };
  const sourceKeys: Record<string, string[]> = {
    '2-5-null': ['NV033', 'NV044', 'NV008', 'NV045'],
    '2-7-strings': ['NV003', 'NV011', 'NV007'],
    '2-9-case': ['NV003', 'NV020', 'NV045', 'NV025'],
  };
  const sourceRows = sourceKeys[id] ? findRows(source, sourceKeys[id]) : source.rows;
  const sourceTable = excerpt(source, sourceColumns[id], sourceRows, id === '2-8-dates' ? 6 : source.columns.length);
  const scenes: Scene[] = [];

  function scene(file: string, step: FlowStep, left: Table, right: Table | undefined, intro: string, conclusion: string, moves: Move[] = []): Scene {
    const previous = scenes.at(-1);
    const result = {
      file, step: scenes.length, clause: step.clause, title: step.title.replaceAll('`', ''),
      focus: step.focus, leftTitle: previous ? `Đầu vào · Sau ${previous.clause}` : `Bảng nguồn · ${tableName}`,
      rightTitle: right ? `Sau ${step.clause}` : 'Kết quả bước sau',
      left, right, intro, conclusion, moves,
    };
    scenes.push(result);
    return result;
  }

  scene('from', source, sourceTable, undefined, `FROM xác định bảng ${tableName} làm nguồn.`, 'Bảng nguồn còn đầy đủ dòng và cột.');
  let input = sourceTable;
  if (where.clause === 'WHERE') {
    const matching = new Map(where.rows.map(row => [row[0], row]));
    const rows = sourceRows.flatMap(row => matching.has(row[0]) ? [matching.get(row[0])!] : []);
    const output = excerpt(where, input.columns, rows, input.totalColumns);
    const checks = new Map(where.checks?.rows.map(row => [row[0], row]));
    const moves = input.rows.map((row, index) => {
      const key = row[0];
      const to = output.rows.findIndex(kept => kept[0] === key);
      const check = checks.get(text(key));
      if (check) assert.equal(checkKept(check), to >= 0, `WHERE: ${key} không khớp bảng soi`);
      if (to >= 0) assert(same(row, output.rows[to]), `WHERE: giá trị của ${key} thay đổi`);
      const conditions = check?.slice(1).map((value, i) => `${where.checks!.conditions[i]} → ${checkCellText(value as boolean | null, false)}`);
      const decision = to >= 0 ? 'giữ dòng' : 'loại dòng';
      return { from: { row: index }, to: to >= 0 ? { row: to } : undefined, cues: [`${key}: ${conditions?.join(' · ') || decision}${conditions ? ` → ${decision}` : ''}.`] };
    });
    const conditions = id === '2-8-dates' ? 'ngày kết thúc từ 21/10/2026 đến 20/11/2026, gồm cả hai mốc' : where.checks?.conditions.join(' và ');
    scene('where', where, input, output, conditions ? `Điều kiện lọc: ${conditions}.` : 'Đối chiếu điều kiện với từng dòng.', `Giữ ${output.total} trong ${input.total} dòng. Các cột giữ nguyên.`, moves);
    input = output;
  }

  const projection: Record<string, Projection[]> = {
    '2-1-select': ['MaNV', 'HoTen', 'NgayVaoLam'],
    '2-2-where': ['MaNV', 'HoTen', 'MaPB', 'TrangThai'],
    '2-3-conditions': ['MaNV', 'HoTen', 'MaPB', 'NgayVaoLam'],
    '2-4-order-top': ['MaNV', 'HoTen', 'MaPB', 'NgayVaoLam'],
    '2-5-null': ['MaNV', 'HoTen', { input: ['Email'], calculate: ([email], result) => {
      assert.equal(result, email ?? '(chưa có)');
      return [`COALESCE(${text(email)}, N'(chưa có)') → ${text(result)}.`];
    } }],
    '2-6-distinct': ['MaPB', 'MaCD'],
    '2-7-strings': ['MaNV', { input: ['MaNV', 'HoTen'], calculate: ([code, name], result) => {
      const tail = text(code).slice(-3);
      const upper = text(name).toLocaleUpperCase('vi');
      assert.equal(result, `${tail} - ${upper}`);
      return [`RIGHT(${code}, 3) → ${tail} · UPPER(${name}) → ${upper}`, `CONCAT ghép thành ${result}.`];
    } }, { input: ['HoTen'], calculate: ([name], result) => {
      assert.equal(result, text(name).trimEnd().length);
      return [`LEN(${name}) → ${result} ký tự, tính cả dấu cách giữa các từ.`];
    } }],
    '2-8-dates': ['MaHD', 'NgayKetThuc', { input: ['NgayKetThuc'], calculate: ([end], result) => {
      assert.equal(result, (Date.parse(text(end)) - Date.parse('2026-10-21')) / 86400000);
      return [`DATEDIFF: từ 21/10/2026 đến ${end} → ${result} ngày.`];
    } }],
    '2-9-case': ['MaNV', { input: ['NgayVaoLam'], calculate: ([start], result, key) => {
      const checks = select.checks!;
      const index = checks.rows.findIndex(([id]) => id === key);
      assert(index >= 0 && checks.labels?.[index] === result);
      const [, three, one] = checks.rows[index];
      const anniversary = (years: number) => `${Number(text(start).slice(0, 4)) + years}${text(start).slice(4)}`;
      assert.equal(three, anniversary(3) <= '2026-10-21');
      if (three) return [`${key} · Mốc 3 năm ${anniversary(3)} đạt → dừng ở WHEN này.`];
      assert.equal(one, anniversary(1) <= '2026-10-21');
      return [`${key} · Mốc 3 năm ${anniversary(3)} chưa đạt.`, one
        ? `Mốc 1 năm ${anniversary(1)} đạt → dừng ở WHEN này.`
        : `Mốc 1 năm ${anniversary(1)} cũng chưa đạt → lấy ELSE.`];
    } }],
  };
  const resultColumns = id === '2-8-dates' ? ['MaHD', 'NgayKetThuc', 'SoNgayConLai']
    : id === '2-9-case' ? ['Mã nhân viên', 'Nhóm thâm niên'] : select.columns;
  const selected = excerpt(select, resultColumns, id === '2-6-distinct' ? select.rows : findRows(select, keysOf(input)));
  assert.equal(input.rows.length, selected.rows.length);
  assert.equal(input.total, selected.total);
  const outputNames = [...selected.columns];
  const moves: Move[] = [];
  assert.equal(projection[id].length, selected.columns.length);
  for (const [column, expression] of projection[id].entries()) {
    const inputNames = typeof expression === 'string' ? [expression] : expression.input;
    const columns = inputNames.map(name => {
      const index = input.columns.indexOf(name);
      assert(index >= 0, `SELECT: không có cột nguồn ${name}`);
      return index;
    });
    if (typeof expression === 'string') {
      const [from] = columns;
      outputNames[column] = expression;
      assert(input.rows.every((row, i) => row[from] === selected.rows[i][column]), `SELECT: giá trị ${expression} đã đổi`);
      moves.push({ from: { column: from }, to: { column }, cues: [`Chọn cột ${expression}.`] });
    } else {
      const [first, ...others] = columns;
      selected.rows.forEach((row, index) => moves.push({
        from: cell(index, first), related: others.map(col => cell(index, col)), to: cell(index, column), computed: true,
        cues: expression.calculate(columns.map(col => input.rows[index][col]), row[column], input.rows[index][0]),
      }));
    }
  }
  const selectScene = scene('select', select, input, { ...selected, columns: outputNames }, 'Lấy các cột và tạo giá trị theo biểu thức trong SELECT.',
    `Giữ ${selected.total} dòng · Kết quả SELECT có ${selected.totalColumns} cột.`, moves);
  if (outputNames.some((name, i) => name !== selected.columns[i])) {
    selectScene.aliases = selected.columns;
  }

  input = selected;
  if (id === '2-6-distinct') {
    const distinct = steps.find(step => step.clause === 'DISTINCT')!;
    const unique = input.rows.filter((row, i, rows) => rows.findIndex(candidate => same(candidate, row)) === i);
    assert(unique.every(row => distinct.rows.some(expected => same(row, expected))));
    const output = excerpt(distinct, distinct.columns, unique);
    const seen = new Set<number>();
    const transfers = input.rows.map((row, index) => {
      const to = unique.findIndex(candidate => same(candidate, row));
      const duplicate = seen.has(to);
      seen.add(to);
      return { from: { row: index }, to: { row: to }, cues: [`${row.join(', ')} → ${duplicate ? 'trùng cả hai cột, giữ một dòng ở kết quả' : 'cặp chưa có trong phần trích'}.`] };
    });
    scene('distinct', distinct, input, output, 'So cả cặp MaPB và MaCD.', `Toàn bộ kết quả có ${output.total} cặp khác nhau.`, transfers);
    input = output;
  }

  const order = steps.find(step => step.clause === 'ORDER BY');
  if (order) {
    let scopeNote: string | undefined;
    if (id === '2-4-order-top') {
      input = excerpt(order, order.preview, order.rows.slice(0, 6).reverse());
      assert.equal(input.rows.length, 6);
      scopeNote = 'Đổi mẫu từ 3 sang 6 dòng để thấy ranh giới TOP (5). Mẫu vẫn có NV047 và NV048.';
    }
    const byDate = id === '2-4-order-top' || id === '2-8-dates';
    const sortKeys: SortKey[] = [{ column: byDate ? 1 : 0, direction: id === '2-4-order-top' ? 'DESC' : 'ASC' }];
    if (byDate || id === '2-6-distinct') sortKeys.push({ column: byDate ? 0 : 1, direction: 'ASC' });
    const sorted = [...input.rows].sort((a, b) => {
      for (const { column, direction } of sortKeys) {
        const delta = compare(a[column], b[column]);
        if (delta) return direction === 'ASC' ? delta : -delta;
      }
      return 0;
    });
    const checked = excerpt(order, input.columns).rows.filter(row => sorted.some(r => same(r, row)));
    assert.deepEqual(sorted.filter(row => checked.some(r => same(r, row))), checked, 'ORDER BY: thứ tự không khớp dữ liệu bước');
    const output = { ...input, rows: sorted, total: rowCount(order) };
    assert.equal(output.total, input.total);
    const currentOrder = [...input.rows];
    const moves: Move[] = [];
    for (const [index, row] of sorted.entries()) {
      const from = currentOrder.indexOf(row);
      if (from === index) continue;
      currentOrder.splice(from, 1);
      currentOrder.splice(index, 0, row);
      moves.push({ from: { row: from }, to: { row: index },
        cues: [`${id === '2-6-distinct' ? row.join(', ') : row[0]} lên vị trí ${index + 1} trong bảng kết quả.`] });
    }
    const [primary, secondary] = sortKeys.map(({ column, direction }) => `${input.columns[column]} ${direction === 'ASC' ? 'tăng dần' : 'giảm dần'}`);
    const note = `Xếp tại chỗ theo ${primary}${secondary ? `. Nếu bằng nhau, xếp theo ${secondary}` : ''}.`;
    const orderScene = scene('order', order, input, output, note, `Vẫn ${output.total} dòng. Chỉ thứ tự dòng thay đổi.`, moves);
    orderScene.sortKeys = sortKeys;
    orderScene.scopeNote = scopeNote;
    input = output;
  }

  const top = steps.find(step => step.clause === 'TOP');
  if (top) {
    const output = excerpt(top, input.columns);
    assert.deepEqual(output.rows, input.rows.slice(0, output.total));
    const rows = output.rows.map((_, index) => index);
    const transfers: Move[] = [{ from: { rows }, to: { rows }, cues: [`Lấy cùng lúc ${output.total} dòng đầu của bảng đã xếp.`] }];
    input.rows.slice(output.total).forEach((row, index) => {
      const position = output.total + index;
      transfers.push({ from: { row: position }, cues: [`${row[0]} đứng thứ ${position + 1} → ngoài TOP (${output.total}).`] });
    });
    scene('top', top, input, output, 'Xét danh sách đã sắp xếp từ dòng đầu.', `Kết quả có ${output.total} dòng.`, transfers);
  }
  return scenes;
}
