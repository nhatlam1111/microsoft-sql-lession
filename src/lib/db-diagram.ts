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
export interface DiagramLink { d: string; dot: { x: number; y: number } | null; from: string; to: string }

function rowY(table: DbTable, column: string): number {
  const at = DIAGRAM_POSITIONS[table.name];
  const i = table.columns.findIndex(c => c.name === column);
  return at.y + BOX.head + i * BOX.row + BOX.row / 2;
}

/** One elbow line per foreign key, from the edge of its table to the edge of the table it points to. */
export function diagramLinks(tables: DbTable[]): DiagramLink[] {
  const byName = new Map(tables.map(t => [t.name, t]));
  const links: DiagramLink[] = [];
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
        links.push({ d: `M${x} ${y1} H${x + 22} V${y2} H${x}`, dot: null, ...ends });
        continue;
      }
      const [x1, x2] = from < to ? [from + BOX.width, to] : [from, to + BOX.width];
      const mid = (x1 + x2) / 2;
      links.push({ d: `M${x1} ${y1} H${mid} V${y2} H${x2}`, dot: { x: x1, y: y1 }, ...ends });
    }
  }
  return links;
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
