import { useEffect, useRef, useState } from 'react';
import type { CatalogEntry } from '../../lib/catalog';
import type { AreaDef, LevelDef } from '../../data/curriculum';
import { searchLessons } from '../../lib/search';
import { EVENTS } from '../../lib/events';
import { lessonUrl } from '../../lib/paths';

interface Props {
  catalog: CatalogEntry[];
  areas: AreaDef[];
  levels: LevelDef[];
}

export default function SearchDialog({ catalog, areas }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener(EVENTS.openSearch, onOpen);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener(EVENTS.openSearch, onOpen); window.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => {
    if (open) { setQuery(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 0); }
  }, [open]);

  if (!open) return null;

  const results = searchLessons(catalog, query, areas);
  const areaName = (id: string) => areas.find(a => a.id === id)?.name ?? '';
  const go = (entry: CatalogEntry | undefined) => { if (entry) window.location.href = lessonUrl(entry.slug); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[active]); }
  };

  return (
    <div className="sd-backdrop" onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="sd-box" role="dialog" aria-modal="true" aria-label="Tìm bài">
        <input
          ref={inputRef}
          className="sd-input"
          type="search"
          value={query}
          placeholder="Gõ tên bài, mã bài hoặc tính năng Excel…"
          onChange={e => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKeyDown}
          aria-controls="sd-results"
          aria-activedescendant={results[active] ? `sd-${results[active].slug}` : undefined}
        />
        {!query.trim() && <p className="sd-empty">Gõ không dấu cũng được, ví dụ: ket bang, vlookup, 3.5</p>}
        {query.trim() !== '' && results.length === 0 && <p className="sd-empty">Không tìm thấy bài nào khớp.</p>}
        {results.length > 0 && (
          <ul className="sd-results" id="sd-results" role="listbox">
            {results.map((e, i) => (
              <li key={e.slug} id={`sd-${e.slug}`} role="option" aria-selected={i === active}
                className={i === active ? 'is-active' : undefined}
                onMouseEnter={() => setActive(i)} onClick={() => go(e)}>
                <span className="sd-num">{e.num}</span>
                <span className="sd-title">{e.title}</span>
                <span className={`lvb lv${e.level}`}>L{e.level}</span>
                <span className="sd-area">{areaName(e.area)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
