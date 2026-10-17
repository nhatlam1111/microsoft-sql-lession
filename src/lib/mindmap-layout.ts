import type { AreaDef, AreaId } from '../data/curriculum';
import { compareNum, type CatalogEntry } from './catalog';

export const SIZES = {
  rootW: 190, rootH: 58,
  areaW: 214, areaH: 52,
  leafW: 236, leafH: 30, leafGap: 6,
  groupGap: 18, gapRootArea: 90, gapAreaLeaf: 44,
};

export interface MapNode {
  id: string;
  kind: 'root' | 'area' | 'lesson';
  x: number;
  y: number;
  width: number;
  height: number;
  side?: 'left' | 'right';
  areaId?: AreaId;
  num?: string;
}
export interface MapEdge { id: string; source: string; target: string }

/**
 * Two-sided mind map: the root sits at (0, 0), right-side areas grow to the right, left-side areas to
 * the left. An open area is centred on its column of lessons; each side is centred on the root.
 */
export function layoutMindmap(areas: AreaDef[], catalog: CatalogEntry[], expanded: ReadonlySet<AreaId>): { nodes: MapNode[]; edges: MapEdge[] } {
  const S = SIZES;
  const nodes: MapNode[] = [{ id: 'root', kind: 'root', x: -S.rootW / 2, y: -S.rootH / 2, width: S.rootW, height: S.rootH }];
  const edges: MapEdge[] = [];

  for (const side of ['right', 'left'] as const) {
    const group = areas.filter(a => a.side === side).sort((a, b) => a.order - b.order);
    const areaX = side === 'right' ? S.rootW / 2 + S.gapRootArea : -(S.rootW / 2 + S.gapRootArea + S.areaW);
    const leafX = side === 'right' ? areaX + S.areaW + S.gapAreaLeaf : areaX - S.gapAreaLeaf - S.leafW;

    // Lay the side out from y = 0 downwards, then shift it so it is centred on the root.
    const placed: MapNode[] = [];
    let y = 0;
    group.forEach((area, i) => {
      if (i > 0) y += S.groupGap;
      const lessons = expanded.has(area.id)
        ? catalog.filter(e => e.area === area.id).sort((a, b) => compareNum(a.num, b.num))
        : [];
      const areaId = `area:${area.id}`;
      edges.push({ id: `e:root-${area.id}`, source: 'root', target: areaId });
      if (lessons.length === 0) {
        placed.push({ id: areaId, kind: 'area', x: areaX, y, width: S.areaW, height: S.areaH, side, areaId: area.id });
        y += S.areaH;
        return;
      }
      const top = y;
      for (const [j, e] of lessons.entries()) {
        if (j > 0) y += S.leafGap;
        placed.push({ id: `lesson:${e.num}`, kind: 'lesson', x: leafX, y, width: S.leafW, height: S.leafH, side, areaId: area.id, num: e.num });
        edges.push({ id: `e:${area.id}-${e.num}`, source: areaId, target: `lesson:${e.num}` });
        y += S.leafH;
      }
      const centre = (top + y) / 2;
      placed.push({ id: areaId, kind: 'area', x: areaX, y: centre - S.areaH / 2, width: S.areaW, height: S.areaH, side, areaId: area.id });
    });

    const minY = Math.min(...placed.map(n => n.y));
    const maxY = Math.max(...placed.map(n => n.y + n.height));
    const shift = -(minY + maxY) / 2;
    for (const n of placed) nodes.push({ ...n, y: n.y + shift });
  }
  return { nodes, edges };
}

/**
 * The React Flow fields every node shares. React Flow sets `pointer-events: none` on a node it can
 * neither select nor drag, so area and lesson nodes (a button and a link) switch it back on.
 */
export function flowNodeBase(n: MapNode) {
  const size = { width: n.width, height: n.height };
  return {
    id: n.id, position: { x: n.x, y: n.y }, ...size,
    style: n.kind === 'root' ? size : { ...size, pointerEvents: 'all' as const },
    draggable: false, selectable: false,
  };
}
