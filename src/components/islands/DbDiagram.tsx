import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { nextFocusIndex } from '../../lib/focus-trap';
import type { DbTable } from '../../lib/db-schema';
import { BOX, DIAGRAM_POSITIONS, DIAGRAM_SIZE, diagramLinks, diagramPath } from '../../lib/db-diagram';

interface Props {
  tables: DbTable[];
  open: boolean;
  onClose: () => void;
}

/** The HRM_Demo diagram in a popup: every table with its columns, keys and links. */
export function DbDiagramDialog({ tables, open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // The page hands a new onClose on every render; reading it through a ref keeps focus where the learner put it.
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    if (!open) return;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close.current(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  const keepTabInside = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button, [tabindex="0"]'));
    const next = items[nextFocusIndex(items.length, items.indexOf(document.activeElement as HTMLElement), e.shiftKey)];
    e.preventDefault();
    next?.focus();
  };

  return (
    <div className="dbd-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dbd" role="dialog" aria-modal="true" aria-labelledby="dbd-title" tabIndex={-1} ref={ref} onKeyDown={keepTabInside}>
        <div className="dbd-head">
          <h2 id="dbd-title">Sơ đồ HRM_Demo</h2>
          <p>PK là khóa chính, FK là khóa ngoại; đường nối đi từ khóa ngoại tới bảng nó trỏ tới.</p>
          <button type="button" className="dbd-close" aria-label="Đóng" onClick={onClose}>×</button>
        </div>
        <div className="dbd-scroll" tabIndex={0} role="group" aria-label="Sơ đồ các bảng, dùng phím mũi tên để cuộn">
          <DbDiagram tables={tables} />
        </div>
      </div>
    </div>
  );
}

/**
 * The diagram itself: every table with its columns, keys and links. Used in the popup and, rendered without JavaScript, in lesson 1.5.
 * path lights up the tables a lesson walks through, in order, with the columns and links that join them.
 */
export function DbDiagram({ tables, path = [] }: { tables: DbTable[]; path?: string[] }) {
  const links = diagramLinks(tables);
  const lit = diagramPath(tables, path);
  const on = (base: string, yes: boolean) => (yes ? `${base} is-on` : base);
  return (
    <div className="er" style={{ width: DIAGRAM_SIZE.width, height: DIAGRAM_SIZE.height }}>
      <svg width={DIAGRAM_SIZE.width} height={DIAGRAM_SIZE.height} aria-hidden="true">
        {/* SVG paints in document order: lit links go last so the grey ones never cover them. */}
        {links.map((l, i) => ({ l, i })).sort((a, b) => Number(lit.links.has(a.i)) - Number(lit.links.has(b.i))).map(({ l, i }) => (
          <g key={i}>
            <path d={l.d} className={on('er-link', lit.links.has(i))} />
            {l.dot && <circle cx={l.dot.x} cy={l.dot.y} r={3} className={on('er-dot', lit.links.has(i))} />}
          </g>
        ))}
      </svg>
      {tables.map(t => {
        const at = DIAGRAM_POSITIONS[t.name];
        if (!at) return null;
        const fks = new Set(t.foreignKeys.map(f => f.column));
        return (
          <div key={t.name} className={on('er-box', lit.tables.has(t.name))} style={{ left: at.x, top: at.y, width: BOX.width }}>
            <div className="er-head" style={{ height: BOX.head }}>{t.name}</div>
            {t.columns.map(c => (
              <div key={c.name} className={on('er-row', lit.columns.has(`${t.name}.${c.name}`))} style={{ height: BOX.row }}>
                <span className="er-col">{c.name}</span>
                {t.primaryKey.includes(c.name) && <span className="er-key is-pk">PK</span>}
                {fks.has(c.name) && <span className="er-key is-fk">FK</span>}
                <span className="er-type">{c.type}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
