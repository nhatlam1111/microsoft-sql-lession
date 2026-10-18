export interface KeyInfo { key: string; ctrlKey: boolean; metaKey: boolean; shiftKey: boolean; altKey: boolean }

/** What a key does in the SQL editor: F5 or Ctrl/Cmd+Enter runs like SSMS, Tab indents. */
export function editorKeyAction(e: KeyInfo): 'run' | 'indent' | null {
  const plain = !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
  if (e.key === 'F5' && plain) return 'run';
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !e.altKey) return 'run';
  if (e.key === 'Tab' && plain) return 'indent';
  return null;
}

export interface TextEdit { from: number; to: number; insert: string; selStart: number; selEnd: number }

const INDENT = '    ';

/** What Tab changes: four spaces at the caret, or, like SSMS, four spaces in front of each line a multi-line selection touches. */
export function indentEdit(value: string, start: number, end: number): TextEdit {
  if (!value.slice(start, end).includes('\n')) {
    return { from: start, to: end, insert: INDENT, selStart: start + INDENT.length, selEnd: start + INDENT.length };
  }
  const from = value.lastIndexOf('\n', start - 1) + 1;
  // A selection that ends right after a line break does not touch the next line.
  const to = value[end - 1] === '\n' ? end - 1 : end;
  const lines = value.slice(from, to).split('\n');
  return {
    from, to,
    insert: lines.map(l => INDENT + l).join('\n'),
    selStart: start === from ? from : start + INDENT.length,
    selEnd: end + INDENT.length * lines.length,
  };
}
