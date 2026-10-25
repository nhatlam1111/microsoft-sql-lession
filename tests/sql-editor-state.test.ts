import { describe, expect, it, vi } from 'vitest';
import { EditorSelection, EditorState, type StateCommand, type Transaction } from '@codemirror/state';
import { history, redo, undo } from '@codemirror/commands';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SqlEditor from '../src/components/islands/SqlEditor';
import { indentSqlSelection, outdentEdit, outdentSqlSelection, sqlEditorExtensions, sqlLineSeparator, syncSqlValue, isLocalSqlChange, sqlRunKeyBindings } from '../src/lib/sql-editor-state';

function model(doc: string, anchor = doc.length, head = anchor) {
  let state = EditorState.create({ doc, selection: EditorSelection.range(anchor, head), extensions: [history(), sqlEditorExtensions([])] });
  const changes: Transaction[] = [];
  return {
    get state() { return state; }, changes,
    run(command: StateCommand) {
      return command({ state, dispatch(transaction) { changes.push(transaction); state = transaction.state; } });
    },
    apply(transaction: Transaction) { changes.push(transaction); state = transaction.state; },
  };
}

describe('SQL document and shortcuts', () => {
  it.each(['', '-- chỉ ghi chú\n', '-- Ghi chú\nSELECT MaNV\nFROM NhanVien;'])('mount and unchanged controlled sync preserve the exact draft: %j', draft => {
    const editor = model(draft);
    expect(editor.state.doc.toString()).toBe(draft);
    expect(syncSqlValue(editor.state, draft)).toBeNull();
    expect(editor.changes).toEqual([]);
  });

  it('keeps edits, selections and undo history through an unchanged controlled rerender', () => {
    const editor = model('SELECT', 6);
    editor.run(indentSqlSelection);
    const afterEdit = editor.state;
    expect(afterEdit.doc.toString()).toBe('SELECT    ');
    expect(afterEdit.selection.main.head).toBe(10);
    expect(syncSqlValue(afterEdit, 'SELECT    ')).toBeNull();
    expect(editor.state).toBe(afterEdit);
    editor.run(undo);
    expect(editor.state.doc.toString()).toBe('SELECT');
    expect(isLocalSqlChange(editor.changes.at(-1)!)).toBe(true);
    editor.run(redo);
    expect(editor.state.doc.toString()).toBe('SELECT    ');
  });

  it('syncs external values without reporting a user edit and clamps the cursor', () => {
    const editor = model('SELECT * FROM NhanVien');
    const transaction = syncSqlValue(editor.state, '-- nháp');
    expect(transaction).not.toBeNull();
    expect(isLocalSqlChange(transaction!)).toBe(false);
    editor.apply(transaction!);
    expect(editor.state.doc.toString()).toBe('-- nháp');
    expect(editor.state.selection.main.head).toBe(7);
  });

  it.each(['\r\n', '\r', '\n'])('keeps an existing %j newline convention through normal edits', separator => {
    const draft = `-- Ghi chú${separator}SELECT MaNV${separator}FROM NhanVien;`;
    let state = EditorState.create({ doc: draft, extensions: [sqlEditorExtensions([]), EditorState.lineSeparator.of(sqlLineSeparator(draft))] });
    expect(state.sliceDoc()).toBe(draft);
    expect(syncSqlValue(state, draft)).toBeNull();
    state = state.update({ changes: { from: state.doc.length, insert: ' ' } }).state;
    expect(state.sliceDoc()).toBe(draft + ' ');
  });

  it.each(['\r\n', '\r'])('indents every selected line with %j line breaks', separator => {
    const state = EditorState.create({ doc: `SELECT MaNV${separator}FROM NhanVien`, selection: EditorSelection.range(2, 17), extensions: [sqlEditorExtensions([]), EditorState.lineSeparator.of(separator)] });
    let result: EditorState | undefined;
    indentSqlSelection({ state, dispatch(transaction) { result = transaction.state; } });
    expect(result?.sliceDoc()).toBe(`    SELECT MaNV${separator}    FROM NhanVien`);
  });

  it('indents multi-line selections by four spaces, and Shift+Tab restores them', () => {
    const editor = model('SELECT MaNV\nFROM NhanVien', 2, 17);
    editor.run(indentSqlSelection);
    expect(editor.state.doc.toString()).toBe('    SELECT MaNV\n    FROM NhanVien');
    editor.run(outdentSqlSelection);
    expect(editor.state.doc.toString()).toBe('SELECT MaNV\nFROM NhanVien');
    expect(editor.state.selection.main.anchor).toBe(2);
    expect(editor.state.selection.main.head).toBe(17);
  });

  it('fallback outdent removes up to four leading spaces or a tab without rewriting SQL', () => {
    const draft = '    SELECT MaNV\n  FROM NhanVien\n\tWHERE MaPB = 1';
    const edit = outdentEdit(draft, 4, draft.length);
    expect(draft.slice(0, edit.from) + edit.insert + draft.slice(edit.to)).toBe('SELECT MaNV\nFROM NhanVien\nWHERE MaPB = 1');
    expect(edit.selStart).toBe(0);
    expect(edit.selEnd).toBe(draft.length - 7);
  });

  it('run shortcuts call the full-editor action once and ignore composing Enter', () => {
    const onRun = vi.fn();
    const bindings = sqlRunKeyBindings(onRun);
    for (const key of ['F5', 'Ctrl-Enter', 'Meta-Enter']) {
      const binding = bindings.find(binding => binding.key === key)!;
      expect(binding.stopPropagation).toBe(true);
      expect(binding.run!({ composing: false } as never)).toBe(true);
    }
    expect(onRun).toHaveBeenCalledTimes(3);
    bindings.find(binding => binding.key === 'Ctrl-Enter')!.run!({ composing: true } as never);
    expect(onRun).toHaveBeenCalledTimes(3);
  });

  it('component static render contains the labelled textarea without calling draft callbacks', () => {
    const onChange = vi.fn();
    const value = '-- Ghi chú\nSELECT MaNV\nFROM NhanVien;';
    const html = renderToStaticMarkup(createElement(SqlEditor, { value, onChange, onRun: vi.fn(), describedBy: 'practice-help' }));
    expect(html).toContain('aria-label="Câu lệnh SQL"');
    expect(html).toContain('placeholder="Viết câu lệnh SQL của bạn ở đây"');
    expect(html).toContain('practice-help');
    expect(html).toContain(value);
    expect(onChange).not.toHaveBeenCalled();
  });
});
