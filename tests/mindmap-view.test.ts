import { it, expect } from 'vitest';
import { revealBox } from '../src/lib/mindmap-view';

const pane = { width: 800, height: 600 };
const vp = { x: 100, y: 50, zoom: 2 };

it('leaves the view alone when the box is already in sight', () => {
  expect(revealBox({ x: 10, y: 10, width: 50, height: 20 }, vp, pane)).toBe(vp);
});
it('pans left just enough to show a box cut off on the right', () => {
  // screen left = 300 * 2 + 100 = 700, right = 700 + 100 = 800; it must end at 800 - 24
  expect(revealBox({ x: 300, y: 10, width: 50, height: 20 }, vp, pane)).toEqual({ x: 76, y: 50, zoom: 2 });
});
it('pans right and down for a box off the left and top edges', () => {
  expect(revealBox({ x: -60, y: -40, width: 20, height: 10 }, vp, pane)).toEqual({ x: 144, y: 104, zoom: 2 });
});
it('shows the left edge first when the box is wider than the pane', () => {
  expect(revealBox({ x: 0, y: 10, width: 500, height: 20 }, vp, pane).x).toBe(24);
});
