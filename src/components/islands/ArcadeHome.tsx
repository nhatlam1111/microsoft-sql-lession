import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import type { ArcadeChapter } from '../../data/arcade';
import { createArcadeClient } from '../../lib/arcade-client';
import type { MeResponse } from '../../lib/arcade-types';
import {
  STATUS_LABEL, arcadeUrl, chapterView, linePath, mapPoints, nextItem, stationPercent, type ChallengeCard, type ChapterItem, type ChapterView,
} from '../../lib/arcade-view';
import { ASK_CODE, MESSAGES, WAITING } from '../../lib/exercise-messages';
import { loadAccessCode, saveAccessCode } from '../../lib/exercise-storage';

interface Props {
  chapters: ArcadeChapter[];
  cards: ChallengeCard[];
  apiBase: string;
}

function Station({ item, flip, count, i }: { item: ChapterItem; flip: boolean; count: number; i: number }) {
  const body = (
    <>
      <span className="ac-dot">{item.n}</span>
      <strong>{item.title}</strong>
      <small>{STATUS_LABEL[item.status]}</small>
    </>
  );
  const className = `ac-stop is-${item.status}`;
  const style = { left: `${stationPercent(i, count, flip)}%` };
  return item.status === 'locked'
    ? <span className={className} style={style}>{body}</span>
    : <a className={className} style={style} href={arcadeUrl(item.id)}>{body}</a>;
}

function Line({ view, width }: { view: ChapterView[]; width: number }) {
  const points = mapPoints(view.map(c => c.items.length), width);
  const items = view.flatMap(c => c.items);
  const reached = items.filter(i => i.status !== 'locked').length;
  return (
    <svg className="ac-line" aria-hidden="true">
      <path d={linePath(points, width)} />
      <path className="is-done" d={linePath(points.slice(0, reached), width)} />
    </svg>
  );
}

function RouteMap({ view }: { view: ChapterView[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const element = box.current;
    if (!element) return;
    const measure = () => setWidth(element.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ac-map" ref={box}>
      {width > 0 && <Line view={view} width={width} />}
      {view.map((chapter, row) => (
        <section className={`ac-row${row % 2 ? ' is-flip' : ''}`} key={chapter.id}>
          <h2>Chương {chapter.number}: {chapter.title}<span>{chapter.done}/{chapter.total}</span></h2>
          {chapter.items.map((item, i) => <Station key={item.id} item={item} i={i} count={chapter.items.length} flip={row % 2 === 1} />)}
        </section>
      ))}
    </div>
  );
}

function RouteList({ view }: { view: ChapterView[] }) {
  return (
    <div className="ac-list">
      {view.map(chapter => (
        <section key={chapter.id}>
          <h2>Chương {chapter.number}: {chapter.title}<span>{chapter.done}/{chapter.total}</span></h2>
          <ol>
            {chapter.items.map(item => {
              const body = <><b>{item.n}</b><span>{item.title}</span><small>{STATUS_LABEL[item.status]}</small></>;
              return (
                <li key={item.id} className={`is-${item.status}`}>
                  {item.status === 'locked' ? <div>{body}</div> : <a href={arcadeUrl(item.id)}>{body}</a>}
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}

export default function ArcadeHome({ chapters, cards, apiBase }: Props) {
  const client = useMemo(() => createArcadeClient(apiBase), [apiBase]);
  const [code, setCode] = useState<string | null>(() => loadAccessCode());
  const [codeInput, setCodeInput] = useState('');
  const [me, setMe] = useState<MeResponse | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!code) return;
    let live = true;
    void (async () => {
      setFailure(null);
      const r = await client.me(code, () => { if (live) setSlow(true); });
      if (!live) return;
      setSlow(false);
      if (r.ok) { setMe(r); return; }
      if (r.kind === 'bad-code') { saveAccessCode(null); setCode(null); }
      setFailure(r.kind === 'blocked' ? r.reason ?? '' : MESSAGES[r.kind]);
    })();
    return () => { live = false; };
  }, [client, code]);

  const submitCode = (e: FormEvent) => {
    e.preventDefault();
    const c = codeInput.trim();
    if (!c) return;
    saveAccessCode(c); setCode(c); setCodeInput('');
  };

  const view = chapterView(chapters, cards, new Set(me?.completed ?? []));
  const next = nextItem(view);

  return (
    <>
      <div className="ac-head">
        <div>
          <h1>Luyện SQL</h1>
          <p>{cards.length} bài nối tiếp nhau. Xong bài trước mới mở bài sau.</p>
        </div>
        {me && (
          <div className="ac-stats">
            <span>{me.completed.length}/{cards.length} bài</span>
            <span className="ac-coin">{me.coins} coin</span>
            {next && <a className="ws-btn is-primary ac-go" href={arcadeUrl(next.id)}>Làm tiếp bài {next.n}</a>}
          </div>
        )}
      </div>
      {!code && (
        <form className="ws-code" onSubmit={submitCode} noValidate>
          <label htmlFor="ac-code-input">{ASK_CODE}</label>
          <input id="ac-code-input" value={codeInput} onChange={e => setCodeInput(e.target.value)} autoComplete="off" spellCheck={false} />
          <button type="submit" className="ws-btn">Lưu mã</button>
        </form>
      )}
      {slow && <p className="ws-wait" role="status">{WAITING}</p>}
      {failure && <p className="ws-fail" role="alert">{failure}</p>}
      <RouteMap view={view} />
      <RouteList view={view} />
    </>
  );
}
