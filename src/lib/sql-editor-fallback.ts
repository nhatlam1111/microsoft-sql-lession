import type { TextEdit } from './editor-keys';

/** Textarea fallback uses the same four-column outdent without formatting the SQL. */
export function outdentEdit(value: string, start: number, end: number): TextEdit {
  const from = value.lastIndexOf('\n', start - 1) + 1;
  const lastTouched = end > start && value[end - 1] === '\n' ? end - 1 : end;
  const lineEnd = value.indexOf('\n', lastTouched);
  const to = lineEnd === -1 ? value.length : lineEnd;
  const removed: { from: number; count: number }[] = [];
  let offset = from;
  const insert = value.slice(from, to).split('\n').map(line => {
    const count = line.match(/^(?: {1,4}|\t)/)?.[0].length ?? 0;
    removed.push({ from: offset, count });
    offset += line.length + 1;
    return line.slice(count);
  }).join('\n');
  const map = (position: number) => position - removed.reduce((sum, removal) => sum + Math.min(removal.count, Math.max(0, position - removal.from)), 0);
  return { from, to, insert, selStart: map(start), selEnd: map(end) };
}
