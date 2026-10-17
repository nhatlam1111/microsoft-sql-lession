import { useEffect, useRef } from 'react';
import type { CatalogEntry } from '../../lib/catalog';
import type { LevelDef } from '../../data/curriculum';
import { iconOf, type ProgressState } from '../../lib/progress';
import { lessonUrl } from '../../lib/paths';
import StatusIcon, { ICON_LABEL } from './StatusIcon';

interface Props {
  entry: CatalogEntry;
  level: LevelDef;
  prerequisites: CatalogEntry[];
  state: ProgressState;
  onClose: () => void;
  /** Shows another lesson in the drawer. */
  onSelect: (num: string) => void;
}

/** The mindmap's side panel: what a lesson covers, before opening it. */
export default function LessonDrawer({ entry, level, prerequisites, state, onClose, onSelect }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { ref.current?.focus({ preventScroll: true }); }, [entry.num]);
  const icon = iconOf(state, entry.num);

  return (
    <aside id="mm-drawer" className="ld" ref={ref} tabIndex={-1} aria-labelledby="ld-title"
      style={{ ['--lv' as string]: `var(--lv${level.no})`, ['--lv-soft' as string]: `var(--lv${level.no}-soft)` }}
      onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); } }}>
      <div className="ld-head">
        <p className="lesson-crumbs">
          <span className="level-tag">{`Level ${level.no} · ${level.name}`}</span>
          <span>{`Bài ${entry.num}`}</span>
        </p>
        <button type="button" className="ld-close" aria-label="Đóng" onClick={onClose}>×</button>
      </div>
      <div className="ld-body">
        <h2 className="ld-title" id="ld-title">{entry.title}</h2>
        <p className="ld-meta">
          <span className="ld-status"><StatusIcon icon={icon} /><span aria-hidden="true">{ICON_LABEL[icon]}</span></span>
          {entry.kind === 'full' ? <span>{`Khoảng ${entry.minutes} phút`}</span> : <span className="chip-summary">Bản tóm tắt</span>}
        </p>
        <p className="ld-summary">{entry.summary}</p>
        <p className="lesson-goal"><strong>Học xong bài này:</strong> {entry.goal}</p>
        <p className="ld-excel">
          <span className="ld-excel-mark" aria-hidden="true">X</span>
          <span>Liên hệ Excel: <strong>{entry.excel}</strong></span>
        </p>
        {prerequisites.length > 0 && (
          <>
            <h3 className="ld-sub">Cần biết trước</h3>
            <ul className="ld-pre">
              {prerequisites.map(p => (
                <li key={p.num}>
                  <button type="button" onClick={() => onSelect(p.num)}>
                    <StatusIcon icon={iconOf(state, p.num)} /><span className="ld-pre-num">{p.num}</span><span>{p.shortTitle}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="ld-foot">
        <a className="ld-go" href={lessonUrl(entry.slug)}>Vào bài học</a>
      </div>
    </aside>
  );
}
