/** Where the HRM_Demo diagram draws its tables and links, as in the approved mockup (erd-popup.html, option A). */
import type { DbTable } from './db-schema';

export const BOX = { width: 210, head: 26, row: 18 };
export const DIAGRAM_SIZE = { width: 820, height: 490 };

export const DIAGRAM_POSITIONS: Record<string, { x: number; y: number }> = {
  PhongBan: { x: 20, y: 20 },
  ChucDanh: { x: 20, y: 120 },
  DonNghiPhep: { x: 20, y: 225 },
  NhanVien: { x: 300, y: 20 },
  HopDong: { x: 590, y: 20 },
  ChamCong: { x: 590, y: 175 },
  BangLuong: { x: 590, y: 300 },
};

/** from and to are "Table.Column": the foreign key and the key it points to. */
export interface DiagramLink {
  d: string;
  dot: { x: number; y: number } | null;
  from: string;
  to: string;
  /** Both ends sit just outside their table; all seven HRM_Demo foreign keys are many-to-one. */
  markers: { x: number; y: number; symbol: '1' | '∞'; column: string }[];
}

export const DIAGRAM_LEGEND = '1 là phía "một", ∞ là phía "nhiều". PK là khóa chính, FK là khóa ngoại; đầu có chấm tròn là cột FK.';

function rowY(table: DbTable, column: string): number {
  const at = DIAGRAM_POSITIONS[table.name];
  const i = table.columns.findIndex(c => c.name === column);
  return at.y + BOX.head + i * BOX.row + BOX.row / 2;
}

/** Gap between two vertical lanes that share the space between the same two columns of boxes. */
const LANE = 12;

/**
 * One elbow line per foreign key, from the edge of its table to the edge of the table it points to.
 * Links that end at the same key may share their vertical stretch; links that end at different keys get
 * their own lane, so two lines never merge into one that seems to join the wrong columns.
 */
export function diagramLinks(tables: DbTable[]): DiagramLink[] {
  const byName = new Map(tables.map(t => [t.name, t]));
  type Elbow = { x1: number; y1: number; mid: number; y2: number; x2: number; from: string; to: string };
  const elbows: Elbow[] = [];
  const links: (DiagramLink | Elbow)[] = [];
  for (const table of tables) {
    for (const fk of table.foreignKeys) {
      const target = byName.get(fk.refTable);
      if (!target || !DIAGRAM_POSITIONS[table.name] || !DIAGRAM_POSITIONS[target.name]) continue;
      const y1 = rowY(table, fk.column);
      const y2 = rowY(target, fk.refColumn);
      const from = DIAGRAM_POSITIONS[table.name].x;
      const to = DIAGRAM_POSITIONS[target.name].x;
      const ends = { from: `${table.name}.${fk.column}`, to: `${target.name}.${fk.refColumn}` };
      if (table === target) {
        // A table pointing at itself (NhanVien.MaQuanLy): loop out on the right.
        const x = from + BOX.width;
        links.push({ d: `M${x} ${y1} H${x + 22} V${y2} H${x}`, dot: null, ...ends, markers: [
          { x: x + 12, y: y1, symbol: '∞', column: ends.from },
          { x: x + 12, y: y2, symbol: '1', column: ends.to },
        ] });
        continue;
      }
      const [x1, x2] = from < to ? [from + BOX.width, to] : [from, to + BOX.width];
      const elbow = { x1, y1, mid: (x1 + x2) / 2, y2, x2, ...ends };
      elbows.push(elbow);
      links.push(elbow);
    }
  }
  // Spread the elbows that share a gap over one lane per target key, in the order the keys first appear.
  const lanes = new Map<number, string[]>();
  for (const e of elbows) {
    const keys = lanes.get(e.mid) ?? [];
    if (!keys.includes(e.to)) keys.push(e.to);
    lanes.set(e.mid, keys);
  }
  return links.map(l => {
    if ('d' in l) return l;
    const keys = lanes.get(l.mid)!;
    const x = l.mid + (keys.indexOf(l.to) - (keys.length - 1) / 2) * LANE;
    const direction = Math.sign(l.x2 - l.x1);
    return { d: `M${l.x1} ${l.y1} H${x} V${l.y2} H${l.x2}`, dot: { x: l.x1, y: l.y1 }, from: l.from, to: l.to, markers: [
      { x: l.x1 + direction * 12, y: l.y1, symbol: '∞', column: l.from },
      { x: l.x2 - direction * 12, y: l.y2, symbol: '1', column: l.to },
    ] };
  });
}

export interface DiagramPath { tables: Set<string>; columns: Set<string>; links: Set<number> }

/**
 * What to light up when a lesson follows a path such as BangLuong → NhanVien → PhongBan:
 * the tables, the columns that join each pair ("Table.Column") and the indexes of those links in diagramLinks().
 * Throws when two tables next to each other in the path have no foreign key between them.
 */
export function diagramPath(tables: DbTable[], path: string[]): DiagramPath {
  const links = diagramLinks(tables);
  const result: DiagramPath = { tables: new Set(path), columns: new Set(), links: new Set() };
  const tableOf = (end: string) => end.split('.')[0];
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]];
    const found = links.findIndex(l => [tableOf(l.from), tableOf(l.to)].sort().join() === [a, b].sort().join());
    if (found < 0) throw new Error(`Sơ đồ: không có khóa ngoại nối ${a} với ${b}`);
    result.links.add(found);
    result.columns.add(links[found].from).add(links[found].to);
  }
  return result;
}
