import { it, expect } from 'vitest';
import { editorKeyAction, indentEdit } from '../src/lib/editor-keys';

const k = (key: string, m: Partial<Record<'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey', boolean>> = {}) =>
  ({ key, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false, ...m });

it('runs on F5 or Ctrl+Enter, indents on Tab, and leaves the rest alone', () => {
  expect([editorKeyAction(k('F5')), editorKeyAction(k('Enter', { ctrlKey: true })), editorKeyAction(k('Enter', { metaKey: true }))]).toEqual(['run', 'run', 'run']);
  expect(editorKeyAction(k('Tab'))).toBe('indent');
  expect([editorKeyAction(k('Tab', { shiftKey: true })), editorKeyAction(k('F5', { ctrlKey: true })), editorKeyAction(k('Enter'))]).toEqual([null, null, null]);
});

it('Tab puts four spaces at the caret, or in front of every line a multi-line selection touches', () => {
  expect(indentEdit('SELECT 1', 6, 6)).toEqual({ from: 6, to: 6, insert: '    ', selStart: 10, selEnd: 10 });
  expect(indentEdit('SELECT abc', 7, 10)).toEqual({ from: 7, to: 10, insert: '    ', selStart: 11, selEnd: 11 });
  // "LECT 1 / FR" is selected: both lines move right and stay selected.
  expect(indentEdit('SELECT 1\nFROM T', 2, 11)).toEqual({ from: 0, to: 11, insert: '    SELECT 1\n    FR', selStart: 6, selEnd: 19 });
  // A selection that ends at the start of a line leaves that line alone.
  expect(indentEdit('a\nb\nc', 0, 4)).toEqual({ from: 0, to: 3, insert: '    a\n    b', selStart: 0, selEnd: 12 });
});
