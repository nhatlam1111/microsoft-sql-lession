import { useEffect, useRef, useState } from 'react';
import type { CatalogEntry } from '../../lib/catalog';
import type { LevelDef, LevelNo } from '../../data/curriculum';
import { getSnapshot, initProgressStore } from '../../lib/progress-store';
import { iconOf } from '../../lib/progress';
import { popupModel } from '../../lib/popup-model';
import { shouldAutoOpen } from '../../lib/roadmap';
import { EVENTS } from '../../lib/events';
import { lessonUrl, withBase } from '../../lib/paths';
import { useProgress } from './use-progress';
import StatusIcon, { ICON_LABEL } from './StatusIcon';

interface Props {
  catalog: CatalogEntry[];
  levels: LevelDef[];
}

export default function RoadmapPopup({ catalog, levels }: Props) {
  const nums = catalog.map(e => e.num);
  const [open, setOpen] = useState(() => {
    initProgressStore(nums);
    return shouldAutoOpen(getSnapshot().previousActiveAt, Date.now());
  });
  const [shownLevel, setShownLevel] = useState<LevelNo | null>(null);
  const { state, previousActiveAt } = useProgress(nums);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => { setShownLevel(null); setOpen(true); };
    window.addEventListener(EVENTS.openRoadmap, onOpen);
    return () => window.removeEventListener(EVENTS.openRoadmap, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const before = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); before?.focus?.(); };
  }, [open]);

  if (!open) return null;

  const model = popupModel(state, previousActiveAt, catalog, Date.now());
  const level = shownLevel ?? model.expandedLevel;
  const levelDef = levels.find(l => l.no === level)!;
  const lessons = catalog.filter(e => e.level === level);
  const currentIndex = Math.max(0, levels.findIndex(l => l.no === model.expandedLevel));
  const lineFrac = model.cta ? currentIndex / (levels.length - 1) : 1;
  const rows = Math.ceil(lessons.length / 2);

  return (
    <div className="rp-backdrop" onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="rp-modal" role="dialog" aria-modal="true" aria-labelledby="rp-title" tabIndex={-1} ref={dialogRef}>
        <div className="rp-head">
          <div>
            <p className="rp-kicker">Lộ trình của bạn</p>
            <h2 className="rp-title" id="rp-title">{model.title}</h2>
            <p className="rp-sub">{model.sub}</p>
            {model.introLink && <a className="rp-intro" href={withBase('/gioi-thieu/')}>Đọc giới thiệu khóa học</a>}
          </div>
          <div className="rp-cta">
            {model.cta && (
              <a className="rp-btn" href={lessonUrl(model.cta.slug)}>
                {model.cta.label}<span>{model.cta.sublabel}</span>
              </a>
            )}
            {model.flag && <a className="rp-flag" href={lessonUrl(model.flag.slug)}>{model.flag.label}</a>}
          </div>
        </div>

        <ol className="rp-track" style={{ ['--done-frac' as string]: lineFrac }}>
          {model.levels.map(sum => {
            const def = levels.find(l => l.no === sum.level)!;
            return (
              <li key={sum.level} className={`rp-station is-${sum.state}${sum.level === level ? ' is-shown' : ''}`}>
                <button type="button" onClick={() => setShownLevel(sum.level)} aria-pressed={sum.level === level}>
                  <span className="rp-node">{sum.level}</span>
                  <span className="rp-st-name">{def.name}</span>
                  <span className="rp-st-count">
                    {sum.done}/{sum.total}{sum.flags > 0 && <span className="rp-st-flags"> · {sum.flags} cờ</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <section className="rp-level">
          <div className="rp-level-head">
            <h3>Level {levelDef.no} · {levelDef.name}</h3>
            <p>Học xong level này: {levelDef.outcome}</p>
          </div>
          <ol className="rp-lessons" style={{ gridTemplateRows: `repeat(${rows}, auto)` }}>
            {lessons.map(e => (
              <li key={e.num} className={model.cta?.slug === e.slug ? 'is-next' : undefined}>
                <a href={lessonUrl(e.slug)}>
                  <StatusIcon icon={iconOf(state, e.num)} />
                  <span className="rp-num">{e.num}</span>
                  <span className="rp-lesson">{e.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
        <p className="rp-hint">Bấm vào một trạm để xem các bài trong level đó</p>

        <div className="rp-foot">
          {(['todo', 'seen', 'done', 'flag'] as const).map(icon => (
            <span key={icon} className="rp-legend"><StatusIcon icon={icon} />{ICON_LABEL[icon]}</span>
          ))}
          <span className="rp-spacer" />
          <a className="rp-ghost" href={withBase('/')}>Mở mindmap</a>
          <button type="button" className="rp-ghost" onClick={() => setOpen(false)}>Đóng</button>
        </div>
      </div>
    </div>
  );
}
