export interface KeyInfo { key: string; ctrlKey: boolean; metaKey: boolean; shiftKey: boolean; altKey: boolean }

/** What a key does in the SQL editor: F5 or Ctrl/Cmd+Enter runs like SSMS, Tab indents. */
export function editorKeyAction(e: KeyInfo): 'run' | 'indent' | null {
  const plain = !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
  if (e.key === 'F5' && plain) return 'run';
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !e.altKey) return 'run';
  if (e.key === 'Tab' && plain) return 'indent';
  return null;
}
