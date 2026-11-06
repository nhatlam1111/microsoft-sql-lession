import { Fragment, useState } from 'react';
import { groupLevelLessons, type NavEntry } from '../../lib/catalog';
import type { AppendixNavEntry } from '../../lib/appendices';
import { presentationsForLevel, type PresentationNavEntry } from '../../lib/presentations';
import type { LevelDef } from '../../data/curriculum';
import { iconOf } from '../../lib/progress';
import { levelSummaries, menuOpenLevel } from '../../lib/roadmap';
import { appendixUrl, lessonUrl, presentationUrl, withBase } from '../../lib/paths';
import { useProgress } from './use-progress';
import StatusIcon from './StatusIcon';

interface Props {
  catalog: NavEntry[];
  levels: LevelDef[];
  /** The lesson on screen; the mindmap's menu has none. */
  currentNum?: string;
  appendices?: AppendixNavEntry[];
  presentations?: PresentationNavEntry[];
  currentAppendixNum?: string;
  appendixActive?: boolean;
}

export default function SidebarNav({ catalog, levels, currentNum, appendices = [], presentations = [], currentAppendixNum, appendixActive = false }: Props) {
  const { state } = useProgress(catalog.map(e => e.num));
  const currentLevel = menuOpenLevel(state, catalog, currentNum);
  const [open, setOpen] = useState<Set<number>>(() => new Set([currentLevel]));
  const [appendixOpen, setAppendixOpen] = useState(appendixActive || Boolean(currentAppendixNum));
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
        const groups = isOpen ? groupLevelLessons(catalog, level) : [];
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
            {groups.map(({ title, lessons }, index) => (
              <Fragment key={title ?? level.name}>
                {title && <h3 className="side-subheading">{title}</h3>}
                <ol className="side-lessons" aria-label={title}>
                  {lessons.map(e => (
                    <li key={e.num}>
                      <a href={lessonUrl(e.slug)} aria-current={e.num === currentNum ? 'page' : undefined}>
                        <StatusIcon icon={iconOf(state, e.num)} />
                        <span className="side-num">{e.num}</span>
                        <span className="side-lesson">{e.shortTitle}</span>
                      </a>
                    </li>
                  ))}
                  {index === groups.length - 1 && presentationsForLevel(presentations, level.no).map(entry => (
                    <li key={`presentation:${entry.slug}`}>
                      <a href={presentationUrl(entry.slug)} aria-label={`Slide tổng hợp: ${entry.title}`}>
                        <span className="side-lesson">Slide tổng hợp</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </Fragment>
            ))}
          </section>
        );
      })}
      {appendices.length > 0 && (
        <section className="side-group side-appendices">
          <button type="button" className={`side-level${appendixActive ? ' is-current' : ''}`}
            aria-expanded={appendixOpen} aria-controls="side-appendices" onClick={() => setAppendixOpen(value => !value)}>
            <span className="side-badge">PL</span>
            <span className="side-name">Phụ lục</span>
            <span className="side-count">Tra cứu</span>
          </button>
          {appendixOpen && (
            <ol className="side-lessons" id="side-appendices">
              <li><a href={withBase('/phu-luc/')} aria-current={appendixActive && !currentAppendixNum ? 'page' : undefined}>Mục lục Phụ lục</a></li>
              {appendices.map(entry => (
                <li key={entry.num}>
                  <a href={appendixUrl(entry.slug)} aria-current={entry.num === currentAppendixNum ? 'page' : undefined}>
                    <span className="side-num">{entry.num}</span>
                    <span className="side-lesson">{entry.shortTitle}</span>
                  </a>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}
    </nav>
  );
}
