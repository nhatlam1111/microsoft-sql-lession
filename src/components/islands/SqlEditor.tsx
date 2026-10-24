import { useRef, type KeyboardEvent } from 'react';
import { highlightTsql } from '../../lib/tsql-highlight';
import { editorKeyAction, indentEdit } from '../../lib/editor-keys';

interface Props {
  value: string;
  onChange: (text: string) => void;
  onRun: () => void;
}

/**
 * A plain textarea laid over the same SSMS colouring the lessons use: the textarea text is transparent,
 * the highlighted copy underneath shows through and scrolls with it.
 */
export default function SqlEditor({ value, onChange, onRun }: Props) {
  const highlight = useRef<HTMLPreElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const action = editorKeyAction(e);
    if (action === 'run') {
      e.preventDefault();
      e.stopPropagation();
      onRun();
    } else if (action === 'indent') {
      e.preventDefault();
      const ta = e.currentTarget;
      const edit = indentEdit(value, ta.selectionStart, ta.selectionEnd);
      ta.setSelectionRange(edit.from, edit.to);
      // insertText goes through the browser's own editing, so Ctrl+Z can undo it; it also fires the change.
      if (document.execCommand('insertText', false, edit.insert)) {
        ta.setSelectionRange(edit.selStart, edit.selEnd);
      } else {
        onChange(value.slice(0, edit.from) + edit.insert + value.slice(edit.to));
        requestAnimationFrame(() => ta.setSelectionRange(edit.selStart, edit.selEnd));
      }
    }
  };

  const syncScroll = (e: { currentTarget: HTMLTextAreaElement }) => {
    if (!highlight.current) return;
    highlight.current.scrollTop = e.currentTarget.scrollTop;
    highlight.current.scrollLeft = e.currentTarget.scrollLeft;
  };

  // The extra newline keeps the last line of the copy as tall as the textarea's.
  const tokens = highlightTsql(`${value}\n`);

  return (
    <div className="ed">
      <pre className="ed-highlight" ref={highlight} aria-hidden="true">
        <code>{tokens.map((t, i) => (t.kind === 'plain' ? t.text : <span key={i} className={`t-${t.kind}`}>{t.text}</span>))}</code>
      </pre>
      <textarea
        className="ed-input"
        value={value}
        placeholder="Viết câu lệnh SQL của bạn ở đây"
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onScroll={syncScroll}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        wrap="off"
        aria-label="Câu lệnh SQL"
      />
    </div>
  );
}
