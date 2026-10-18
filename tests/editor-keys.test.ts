import { it, expect } from 'vitest';
import { editorKeyAction } from '../src/lib/editor-keys';

const k = (key: string, m: Partial<Record<'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey', boolean>> = {}) =>
  ({ key, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false, ...m });

it('runs on F5 or Ctrl+Enter, indents on Tab, and leaves the rest alone', () => {
  expect([editorKeyAction(k('F5')), editorKeyAction(k('Enter', { ctrlKey: true })), editorKeyAction(k('Enter', { metaKey: true }))]).toEqual(['run', 'run', 'run']);
  expect(editorKeyAction(k('Tab'))).toBe('indent');
  expect([editorKeyAction(k('Tab', { shiftKey: true })), editorKeyAction(k('F5', { ctrlKey: true })), editorKeyAction(k('Enter'))]).toEqual([null, null, null]);
});
