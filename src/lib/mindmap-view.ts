export interface Viewport { x: number; y: number; zoom: number }
export interface Box { x: number; y: number; width: number; height: number }

/**
 * The smallest pan that brings `box` (in map coordinates) fully into a pane of `pane` size, keeping
 * `margin` pixels clear of the edges. Returns `vp` itself when nothing has to move; when the box is
 * larger than the pane, its left and top edges win.
 */
export function revealBox(box: Box, vp: Viewport, pane: { width: number; height: number }, margin = 24): Viewport {
  const shift = (start: number, size: number, room: number) => {
    const end = start + size;
    let d = 0;
    if (end > room - margin) d = room - margin - end;
    if (start + d < margin) d = margin - start;
    return d;
  };
  const dx = shift(box.x * vp.zoom + vp.x, box.width * vp.zoom, pane.width);
  const dy = shift(box.y * vp.zoom + vp.y, box.height * vp.zoom, pane.height);
  return dx === 0 && dy === 0 ? vp : { x: vp.x + dx, y: vp.y + dy, zoom: vp.zoom };
}
