import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import type { DbTable } from '../../lib/db-schema';
import { editorKeyAction, indentEdit } from '../../lib/editor-keys';
import { outdentEdit } from '../../lib/sql-editor-fallback';
import type { SqlEditorHandle } from '../../lib/sql-editor-runtime';
import '../../styles/sql-editor.css';

interface Props {
  value: string;
  onChange: (text: string) => void;
  onRun: () => void;
  tables?: DbTable[];
  describedBy?: string;
}

const noTables: DbTable[] = [];

export default function SqlEditor({ value, onChange, onRun, tables = noTables, describedBy }: Props) {
  const hintId = useId();
  const description = [describedBy, hintId].filter(Boolean).join(' ');
  const host = useRef<HTMLDivElement>(null);
  const fallback = useRef<HTMLTextAreaElement>(null);
  const handle = useRef<SqlEditorHandle | null>(null);
  const latest = useRef({ value, onChange, onRun, tables, description });
  latest.current = { value, onChange, onRun, tables, description };
  const focusAfterLoad = useRef(false);
  const composing = useRef(false);
  const keepFallback = useRef(false);
  const escapedAt = useRef(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [keptBasic, setKeptBasic] = useState(false);

  const keepFallbackForSession = () => {
    // Replacing a used textarea would discard native undo and could interrupt an IME commit.
    keepFallback.current = true;
    setKeptBasic(true);
    if (handle.current) {
      handle.current.destroy();
      handle.current = null;
      setReady(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    void import('../../lib/sql-editor-runtime').then(({ mountSqlEditor }) => {
      if (cancelled || !host.current || keepFallback.current) return;
      const textarea = fallback.current;
      focusAfterLoad.current = document.activeElement === textarea;
      handle.current = mountSqlEditor({
        parent: host.current,
        value: latest.current.value,
        tables: latest.current.tables,
        describedBy: latest.current.description,
        selection: textarea ? {
          start: textarea.selectionStart, end: textarea.selectionEnd,
          backward: textarea.selectionDirection === 'backward',
        } : undefined,
        onChange: text => latest.current.onChange(text),
        onRun: () => latest.current.onRun(),
      });
      setReady(true);
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; handle.current?.destroy(); handle.current = null; };
  }, []);

  useEffect(() => { handle.current?.sync(value); }, [value]);
  useEffect(() => { handle.current?.setTables(tables); }, [tables]);
  useEffect(() => { handle.current?.setDescribedBy(description); }, [description]);
  useEffect(() => {
    if (ready) {
      handle.current?.measure();
      if (focusAfterLoad.current) handle.current?.focus();
    }
  }, [ready]);

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (composing.current || event.nativeEvent.isComposing) {
      if (editorKeyAction(event) === 'run') { event.preventDefault(); event.stopPropagation(); }
      return;
    }
    if (event.key === 'Escape') { escapedAt.current = Date.now(); return; }
    const escapesFocus = event.key === 'Tab' && Date.now() - escapedAt.current < 2000;
    escapedAt.current = 0;
    if (escapesFocus) return;
    const action = editorKeyAction(event);
    if (action === 'run') {
      event.preventDefault(); event.stopPropagation(); latest.current.onRun();
    } else if (action === 'indent' || (event.key === 'Tab' && event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey)) {
      event.preventDefault();
      const textarea = event.currentTarget;
      const draft = textarea.value;
      const edit = event.shiftKey
        ? outdentEdit(draft, textarea.selectionStart, textarea.selectionEnd)
        : indentEdit(draft, textarea.selectionStart, textarea.selectionEnd);
      const nextValue = draft.slice(0, edit.from) + edit.insert + draft.slice(edit.to);
      if (nextValue === draft) return;
      keepFallbackForSession();
      textarea.setSelectionRange(edit.from, edit.to);
      // Native insertText preserves the textarea undo stack where supported.
      if (document.execCommand?.('insertText', false, edit.insert)) {
        textarea.setSelectionRange(edit.selStart, edit.selEnd);
      } else {
        latest.current.onChange(nextValue);
        requestAnimationFrame(() => textarea.setSelectionRange(edit.selStart, edit.selEnd));
      }
    }
  };

  return (
    <div className="sql-editor">
      <div className="sql-editor-surface">
        <div className="sql-editor-cm" ref={host} hidden={!ready} />
        {!ready && <textarea
          className="sql-editor-fallback sql-editor-resize-none"
          ref={fallback}
          value={value}
          placeholder="Viết câu lệnh SQL của bạn ở đây"
          onChange={event => { keepFallbackForSession(); latest.current.onChange(event.target.value); }}
          onKeyDown={onKeyDown}
          onCompositionStart={() => { keepFallbackForSession(); composing.current = true; }}
          onCompositionEnd={() => { composing.current = false; }}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          wrap="off"
          aria-label="Câu lệnh SQL"
          aria-describedby={description}
        />}
      </div>
      <p className="sql-editor-hint" id={hintId}>
        {failed
          ? <span role="status">Không tải được gợi ý SQL. Ô nhập cơ bản vẫn dùng được. </span>
          : keptBasic && <span role="status">Giữ ô nhập cơ bản để giữ thao tác. Tải lại trang để dùng gợi ý. </span>}
        Tab: 4 dấu cách · Shift+Tab: giảm thụt · Esc rồi Tab: rời ô nhập
        {ready && ' · Ctrl+Space: gợi ý'}
      </p>
    </div>
  );
}
