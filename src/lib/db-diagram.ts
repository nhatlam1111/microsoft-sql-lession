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

export interface DiagramLink { d: string; dot: { x: number; y: number } | null }

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
      if (table === target) {
        // A table pointing at itself (NhanVien.MaQuanLy): loop out on the right.
        const x = from + BOX.width;
        links.push({ d: `M${x} ${y1} H${x + 22} V${y2} H${x}`, dot: null });
        continue;
      }
      const [x1, x2] = from < to ? [from + BOX.width, to] : [from, to + BOX.width];
      const mid = (x1 + x2) / 2;
      links.push({ d: `M${x1} ${y1} H${mid} V${y2} H${x2}`, dot: { x: x1, y: y1 } });
    }
  }
  return links;
}
