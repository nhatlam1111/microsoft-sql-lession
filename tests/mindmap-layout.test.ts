import { it, expect } from 'vitest';
import { layoutMindmap, SIZES } from '../src/lib/mindmap-layout';
import { AREAS, type AreaId } from '../src/data/curriculum';
import { fakeCatalog } from './helpers/expected';

const CAT = fakeCatalog();
const areasOf = (nodes: ReturnType<typeof layoutMindmap>['nodes'], side: 'left' | 'right') =>
  nodes.filter(n => n.kind === 'area' && n.side === side).sort((a, b) => a.y - b.y);

it('puts the root at the centre and four areas on each side without overlap', () => {
  const { nodes, edges } = layoutMindmap(AREAS, CAT, new Set<AreaId>());
  const root = nodes.find(n => n.id === 'root')!;
  expect([root.x + root.width / 2, root.y + root.height / 2]).toEqual([0, 0]);
  expect([nodes.length, edges.length]).toEqual([9, 8]);
  const right = areasOf(nodes, 'right'), left = areasOf(nodes, 'left');
  expect(right.map(n => n.areaId)).toEqual(['A1', 'A2', 'A3', 'A4']);
  expect(left.map(n => n.areaId)).toEqual(['A5', 'A6', 'A7', 'A8']);
  for (const n of right) expect(n.x).toBe(SIZES.rootW / 2 + SIZES.gapRootArea);
  for (const n of left) expect(n.x + n.width).toBe(-(SIZES.rootW / 2 + SIZES.gapRootArea));
  for (const side of [right, left]) for (let i = 1; i < side.length; i++) {
    expect(side[i].y).toBeGreaterThanOrEqual(side[i - 1].y + side[i - 1].height + SIZES.groupGap);
  }
});
it('opens A4 with its six lessons beside it, centred on the area', () => {
  const { nodes, edges } = layoutMindmap(AREAS, CAT, new Set<AreaId>(['A4']));
  const leaves = nodes.filter(n => n.kind === 'lesson');
  const area = nodes.find(n => n.id === 'area:A4')!;
  expect(leaves.map(n => n.num)).toEqual(['3.4', '3.5', '3.6', '3.7', '3.8', '3.9']);
  for (const l of leaves) expect(l.x).toBe(area.x + SIZES.areaW + SIZES.gapAreaLeaf);
  expect(area.y + area.height / 2).toBeCloseTo((leaves[0].y + leaves.at(-1)!.y + SIZES.leafH) / 2, 5);
  expect(edges.filter(e => e.source === 'area:A4')).toHaveLength(6);
});
it('opens a left area to the left, in roadmap order', () => {
  const { nodes } = layoutMindmap(AREAS, CAT, new Set<AreaId>(['A5']));
  const leaves = nodes.filter(n => n.kind === 'lesson');
  const area = nodes.find(n => n.id === 'area:A5')!;
  expect(leaves.map(n => n.num)).toEqual(['3.1', '3.2', '3.3', '3.10', '4.1', '4.2', '4.3', '4.4', '4.5']);
  for (const l of leaves) expect(l.x + SIZES.leafW).toBe(area.x - SIZES.gapAreaLeaf);
});
it('keeps each side vertically centred on the root', () => {
  const { nodes } = layoutMindmap(AREAS, CAT, new Set<AreaId>(['A1', 'A5']));
  for (const side of ['left', 'right'] as const) {
    const ns = nodes.filter(n => n.side === side);
    expect(Math.min(...ns.map(n => n.y)) + Math.max(...ns.map(n => n.y + n.height))).toBeCloseTo(0, 5);
  }
});
