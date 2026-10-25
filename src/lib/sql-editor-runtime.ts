import { defaultKeymap, history, historyKeymap, insertNewlineKeepIndent } from '@codemirror/commands';
import { bracketMatching } from '@codemirror/language';
import { Compartment, EditorSelection, EditorState, Prec } from '@codemirror/state';
import { EditorView, drawSelection, dropCursor, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, keymap, lineNumbers, placeholder } from '@codemirror/view';
import type { DbTable } from './db-schema';
import { editorKeyAction } from './editor-keys';
import { indentSqlSelection, isLocalSqlChange, outdentSqlSelection, sqlEditorExtensions, sqlLineSeparator, sqlRunKeyBindings, syncSqlValue } from './sql-editor-state';

export interface SqlEditorHandle {
  sync(value: string): void;
  setTables(tables: readonly DbTable[]): void;
  setDescribedBy(value: string): void;
  measure(): void;
  focus(): void;
  destroy(): void;
}

interface MountOptions {
  parent: HTMLElement;
  value: string;
  tables: readonly DbTable[];
  describedBy: string;
  selection?: { start: number; end: number; backward: boolean };
  onChange(value: string): void;
  onRun(): void;
}

/** Loaded only in a client effect; initial component rendering and a failed chunk retain the textarea. */
export function mountSqlEditor(options: MountOptions): SqlEditorHandle {
  const language = new Compartment();
  const accessibility = new Compartment();
  const newlines = new Compartment();
  const attributes = (describedBy: string) => EditorView.contentAttributes.of({
    'aria-label': 'Câu lệnh SQL', 'aria-describedby': describedBy,
    'aria-multiline': 'true', spellcheck: 'false', autocorrect: 'off', autocapitalize: 'off',
  });
  let controlledValue = options.value;
  let view: EditorView | undefined;
  try {
    view = new EditorView({
      parent: options.parent,
      state: EditorState.create({
        doc: options.value,
        selection: options.selection ? EditorSelection.range(
          options.selection.backward ? options.selection.end : options.selection.start,
          options.selection.backward ? options.selection.start : options.selection.end,
        ) : undefined,
        extensions: [
          lineNumbers(), highlightActiveLineGutter(), highlightSpecialChars(),
          history(), drawSelection(), dropCursor(), bracketMatching(), highlightActiveLine(),
          // Enter keeps the learner's existing indent; input never triggers SQL reformatting.
          keymap.of([...defaultKeymap.map(binding => binding.key === 'Enter' ? { ...binding, run: insertNewlineKeepIndent } : binding), ...historyKeymap]),
          language.of(sqlEditorExtensions(options.tables)),
          accessibility.of(attributes(options.describedBy)),
          newlines.of(EditorState.lineSeparator.of(sqlLineSeparator(options.value))),
          placeholder('Viết câu lệnh SQL của bạn ở đây'),
          EditorView.domEventHandlers({
            keydown(event, editor) {
              if (editorKeyAction(event) === 'run' && (editor.composing || event.isComposing)) {
                event.preventDefault(); event.stopPropagation(); return true;
              }
              return false;
            },
          }),
          Prec.high(keymap.of([
            ...sqlRunKeyBindings(options.onRun),
            { key: 'Tab', run: indentSqlSelection, shift: outdentSqlSelection },
          ])),
          EditorView.updateListener.of(update => {
            if (update.transactions.some(isLocalSqlChange)) {
              controlledValue = update.state.sliceDoc();
              options.onChange(controlledValue);
            }
          }),
        ],
      }),
    });
  } catch (error) {
    view?.destroy();
    options.parent.replaceChildren();
    throw error;
  }
  const editor = view;
  return {
    sync(value) {
      if (value === controlledValue) return;
      controlledValue = value;
      const separator = sqlLineSeparator(value);
      if (editor.state.facet(EditorState.lineSeparator) !== separator) {
        editor.dispatch({ effects: newlines.reconfigure(EditorState.lineSeparator.of(separator)) });
      }
      const transaction = syncSqlValue(editor.state, value);
      if (transaction) editor.dispatch(transaction);
    },
    setTables(tables) { editor.dispatch({ effects: language.reconfigure(sqlEditorExtensions(tables)) }); },
    setDescribedBy(value) { editor.dispatch({ effects: accessibility.reconfigure(attributes(value)) }); },
    measure() { editor.requestMeasure(); },
    focus() { editor.focus(); },
    destroy() { editor.destroy(); },
  };
}
