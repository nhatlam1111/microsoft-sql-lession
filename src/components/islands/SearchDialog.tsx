import { useEffect, useRef, useState } from 'react';
import { searchItems, type SearchItem } from '../../lib/search';
import { EVENTS } from '../../lib/events';
import { nextFocusIndex } from '../../lib/focus-trap';

interface Props { items: SearchItem[] }

export default function SearchDialog({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (event: KeyboardEvent) => {
      if (!event.isComposing && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener(EVENTS.openSearch, onOpen);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener(EVENTS.openSearch, onOpen); window.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const before = document.activeElement as HTMLElement | null;
    const host = dialogRef.current?.closest('astro-island') ?? dialogRef.current?.parentElement;
    const siblings = [...document.body.children].filter((element): element is HTMLElement => element instanceof HTMLElement && element !== host && !element.contains(dialogRef.current));
    const inertStates = siblings.map(element => element.inert);
    siblings.forEach(element => { element.inert = true; });
    setQuery('');
    setActive(0);
    inputRef.current?.focus();
    return () => {
      siblings.forEach((element, index) => { element.inert = inertStates[index]; });
      before?.focus();
    };
  }, [open]);

  const results = searchItems(items, query);
  const activeKey = results[active]?.key;
  useEffect(() => {
    if (open && activeKey) document.getElementById(`sd-${activeKey}`)?.scrollIntoView({ block: 'nearest' });
  }, [open, activeKey]);

  if (!open) return null;

  const go = (entry: SearchItem | undefined) => { if (entry) window.location.href = entry.href; };
  const clear = () => { setQuery(''); setActive(0); inputRef.current?.focus(); };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Escape') { event.stopPropagation(); setOpen(false); }
    else if (event.key === 'Tab') {
      const controls = [...dialogRef.current!.querySelectorAll<HTMLElement>('input, button, a[href]:not([tabindex="-1"])')];
      event.preventDefault();
      controls[nextFocusIndex(controls.length, controls.indexOf(document.activeElement as HTMLElement), event.shiftKey)]?.focus();
    }
    else if (event.target === inputRef.current && event.key === 'ArrowDown') { event.preventDefault(); setActive(value => Math.min(value + 1, Math.max(0, results.length - 1))); }
    else if (event.target === inputRef.current && event.key === 'ArrowUp') { event.preventDefault(); setActive(value => Math.max(value - 1, 0)); }
    else if (event.target === inputRef.current && event.key === 'Enter') { event.preventDefault(); go(results[active]); }
  };

  return (
    <div className="sd-backdrop" onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div ref={dialogRef} className="sd-box" role="dialog" aria-modal="true" aria-label="Tìm bài, phụ lục và slide" onKeyDown={onKeyDown}>
        <div className="sd-search-row">
          <input ref={inputRef} className="sd-input" type="search" role="combobox" value={query}
            aria-label="Tên bài, mã bài hoặc từ khóa" aria-autocomplete="list" aria-expanded="true"
            placeholder="Gõ tên bài, mã bài, kiểu dữ liệu hoặc hàm…"
            onChange={event => { setQuery(event.target.value); setActive(0); }}
            aria-controls="sd-results" aria-activedescendant={results[active] ? `sd-${results[active].key}` : undefined} />
          {query !== '' && <button type="button" className="sd-clear" aria-label="Xóa tìm kiếm" onClick={clear}>×</button>}
        </div>
        {!query.trim() && <p className="sd-empty">Gõ không dấu cũng được, ví dụ: ket bang, TRY_CONVERT, PL.1</p>}
        {query.trim() !== '' && results.length === 0 && <p className="sd-empty" role="status">Không tìm thấy bài nào khớp. Hãy thử từ khóa khác hoặc xóa tìm kiếm.</p>}
        {query.trim() !== '' && results.length > 0 && <p className="visually-hidden" role="status">{results.length} kết quả tìm kiếm</p>}
        <ul className="sd-results" id="sd-results" role="listbox" aria-label="Kết quả tìm kiếm">
          {results.map((entry, index) => (
            <li key={entry.key} role="presentation">
              <a id={`sd-${entry.key}`} href={entry.href} role="option" tabIndex={-1} aria-selected={index === active}
                className={`sd-result${index === active ? ' is-active' : ''}`} onMouseEnter={() => setActive(index)}>
                <span className="sd-num">{entry.num}</span>
                <span className="sd-title">{entry.title}</span>
                {entry.section === 'lesson' && <span className={`lvb lv${entry.level}`}>L{entry.level}</span>}
                {entry.section === 'appendix' && <span className="sd-reference">Phụ lục</span>}
                {entry.section === 'presentation' && <span className="sd-reference">Slide</span>}
                <span className="sd-area">{entry.groupLabel}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="sd-footer"><span>↑ ↓ chọn · Enter mở</span><button type="button" className="sd-close" onClick={() => setOpen(false)}>Đóng</button></div>
      </div>
    </div>
  );
}
