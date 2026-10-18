import { it, expect } from 'vitest';
import { nextFocusIndex } from '../src/lib/focus-trap';

it('Tab goes round the items of a popup and never leaves it', () => {
  expect([nextFocusIndex(3, 0, false), nextFocusIndex(3, 2, false), nextFocusIndex(3, 0, true)]).toEqual([1, 0, 2]);
  expect(nextFocusIndex(1, 0, false)).toBe(0);
  // Focus on the popup itself: Tab takes the first item, Shift+Tab the last.
  expect([nextFocusIndex(3, -1, false), nextFocusIndex(3, -1, true)]).toEqual([0, 2]);
  expect(nextFocusIndex(0, -1, false)).toBe(-1);
});
