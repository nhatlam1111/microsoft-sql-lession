import { autocompletion } from '@codemirror/autocomplete';
import { indentLess, indentMore } from '@codemirror/commands';
import { indentUnit, syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { MSSQL } from '@codemirror/lang-sql';
import { Annotation, EditorSelection, EditorState, Transaction, type Extension, type StateCommand } from '@codemirror/state';
import type { KeyBinding } from '@codemirror/view';
import { tags } from '@lezer/highlight';
import type { DbTable } from './db-schema';
import { createSqlCompletionSources } from './sql-editor-completion';

export { outdentEdit } from './sql-editor-fallback';

const externalValue = Annotation.define<boolean>();
const fourSpaces = '    ';

const sqlColors = HighlightStyle.define([
  { tag: [tags.keyword, tags.typeName], color: 'var(--ssms-keyword)' },
  { tag: [tags.operator, tags.punctuation, tags.paren, tags.brace, tags.squareBracket, tags.null, tags.bool], color: 'var(--ssms-gray)' },
  { tag: [tags.standard(tags.name), tags.special(tags.name)], color: 'var(--ssms-function)' },
  { tag: tags.string, color: 'var(--ssms-string)' },
  { tag: tags.special(tags.string), color: 'var(--ink)' },
  { tag: tags.comment, color: 'var(--ssms-comment)' },
]);

export function sqlEditorExtensions(tables: readonly DbTable[]): Extension {
  return [
    MSSQL.extension,
    indentUnit.of(fourSpaces),
    EditorState.tabSize.of(4),
    syntaxHighlighting(sqlColors),
    autocompletion({ override: createSqlCompletionSources(tables), maxRenderedOptions: 40 }),
    EditorState.phrases.of({
      'No completions': 'Không có gợi ý',
      'Completions': 'Gợi ý SQL',
    }),
  ];
}

/** Tab inserts spaces at the caret; a selection spanning lines moves each touched line. */
export const indentSqlSelection: StateCommand = ({ state, dispatch }) => {
  if (state.selection.ranges.some(range => state.doc.sliceString(range.from, range.to).includes('\n'))) {
    return indentMore({ state, dispatch });
  }
  dispatch(state.update(state.replaceSelection(fourSpaces), { scrollIntoView: true, userEvent: 'input' }));
  return true;
};

export const outdentSqlSelection = indentLess;

export function sqlRunKeyBindings(onRun: () => void): KeyBinding[] {
  return ['F5', 'Ctrl-Enter', 'Meta-Enter'].map(key => ({
    key,
    run(view) { if (!view.composing) onRun(); return true; },
    stopPropagation: true,
  }));
}

/** Controlled echoes are no-ops: they must not reset selection or append an undo event. */
export function syncSqlValue(state: EditorState, value: string): Transaction | null {
  if (state.sliceDoc() === value) return null;
  const length = state.toText(value).length;
  const ranges = state.selection.ranges.map(range => EditorSelection.range(
    Math.min(range.anchor, length), Math.min(range.head, length),
  ));
  return state.update({
    changes: { from: 0, to: state.doc.length, insert: value },
    selection: EditorSelection.create(ranges, state.selection.mainIndex),
    annotations: [externalValue.of(true), Transaction.addToHistory.of(false)],
  });
}

export function sqlLineSeparator(value: string): string {
  return value.match(/\r\n?|\n/)?.[0] ?? '\n';
}

export function isLocalSqlChange(transaction: Transaction): boolean {
  return transaction.docChanged && !transaction.annotation(externalValue);
}
