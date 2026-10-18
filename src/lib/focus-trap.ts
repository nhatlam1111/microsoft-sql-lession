/** Where Tab moves inside a popup: round its items and never out of it. `current` is -1 when no item has focus. */
export function nextFocusIndex(count: number, current: number, back: boolean): number {
  if (count === 0) return -1;
  if (current < 0) return back ? count - 1 : 0;
  return (current + (back ? count - 1 : 1)) % count;
}
