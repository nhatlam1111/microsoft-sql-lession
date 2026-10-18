import { useEffect, useRef } from 'react';
import type { DbTable } from '../../lib/db-schema';
import { BOX, DIAGRAM_POSITIONS, DIAGRAM_SIZE, diagramLinks } from '../../lib/db-diagram';

interface Props {
  tables: DbTable[];
  open: boolean;
  onClose: () => void;
}

/** The HRM_Demo diagram in a popup: every table with its columns, keys and links. */
export function DbDiagramDialog({ tables, open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const links = diagramLinks(tables);

  return (
    <div className="dbd-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dbd" role="dialog" aria-modal="true" aria-labelledby="dbd-title" tabIndex={-1} ref={ref}>
        <div className="dbd-head">
          <h2 id="dbd-title">Sơ đồ HRM_Demo</h2>
          <p>PK là khóa chính, FK là khóa ngoại; đường nối đi từ khóa ngoại tới bảng nó trỏ tới.</p>
          <button type="button" className="dbd-close" aria-label="Đóng" onClick={onClose}>×</button>
        </div>
        <div className="dbd-scroll">
          <div className="er" style={{ width: DIAGRAM_SIZE.width, height: DIAGRAM_SIZE.height }}>
            <svg width={DIAGRAM_SIZE.width} height={DIAGRAM_SIZE.height} aria-hidden="true">
              {links.map((l, i) => (
                <g key={i}>
                  <path d={l.d} className="er-link" />
                  {l.dot && <circle cx={l.dot.x} cy={l.dot.y} r={3} className="er-dot" />}
                </g>
              ))}
            </svg>
            {tables.map(t => {
              const at = DIAGRAM_POSITIONS[t.name];
              if (!at) return null;
              const fks = new Set(t.foreignKeys.map(f => f.column));
              return (
                <div key={t.name} className="er-box" style={{ left: at.x, top: at.y, width: BOX.width }}>
                  <div className="er-head" style={{ height: BOX.head }}>{t.name}</div>
                  {t.columns.map(c => (
                    <div key={c.name} className="er-row" style={{ height: BOX.row }}>
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
        </div>
      </div>
    </div>
  );
}
