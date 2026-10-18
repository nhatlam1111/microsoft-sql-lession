import { useState } from 'react';
import type { NavEntry } from '../../lib/catalog';
import type { LevelDef } from '../../data/curriculum';
import { iconOf } from '../../lib/progress';
import { levelSummaries, menuOpenLevel } from '../../lib/roadmap';
import { lessonUrl } from '../../lib/paths';
import { useProgress } from './use-progress';
import StatusIcon from './StatusIcon';

interface Props {
  catalog: NavEntry[];
  levels: LevelDef[];
  /** The lesson on screen; the mindmap's menu has none. */
  currentNum?: string;
}

export default function SidebarNav({ catalog, levels, currentNum }: Props) {
  const { state } = useProgress(catalog.map(e => e.num));
  const currentLevel = menuOpenLevel(state, catalog, currentNum);
  const [open, setOpen] = useState<Set<number>>(() => new Set([currentLevel]));
  const summaries = levelSummaries(state, catalog, currentLevel);

  const toggle = (no: number) => setOpen(prev => {
    const next = new Set(prev);
    if (next.has(no)) next.delete(no); else next.add(no);
    return next;
  });

  return (
    <nav className="side" aria-label="Danh sách bài">
      <p className="side-title">Khóa học</p>
      {levels.map(level => {
        const sum = summaries.find(s => s.level === level.no)!;
        const isOpen = open.has(level.no);
        return (
          <section key={level.no} className="side-group">
            <button type="button" className={`side-level is-${sum.state}`} aria-expanded={isOpen}
              style={{ ['--lv' as string]: level.color }} onClick={() => toggle(level.no)}>
              <span className="side-badge">{level.no}</span>
              <span className="side-name">{level.name}</span>
              <span className="side-count">
                {sum.done}/{sum.total}
                {sum.flags > 0 && <span className="side-flags"> · {sum.flags} cờ</span>}
              </span>
            </button>
            {isOpen && (
              <ol className="side-lessons">
                {catalog.filter(e => e.level === level.no).map(e => (
                  <li key={e.num}>
                    <a href={lessonUrl(e.slug)} aria-current={e.num === currentNum ? 'page' : undefined}>
                      <StatusIcon icon={iconOf(state, e.num)} />
                      <span className="side-num">{e.num}</span>
                      <span className="side-lesson">{e.shortTitle}</span>
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </section>
        );
      })}
    </nav>
  );
}
