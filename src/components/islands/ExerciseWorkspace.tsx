import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import type { GradeResponse, PublicExercise, RunResponse } from '../../lib/exercise-types';
import type { DbTable } from '../../lib/db-schema';
import { createExerciseClient } from '../../lib/exercise-client';
import { ASK_CODE, MESSAGES, WAITING, verdictText } from '../../lib/exercise-messages';
import { loadAccessCode, loadDraft, saveAccessCode, saveDraft } from '../../lib/exercise-storage';
import { editorKeyAction } from '../../lib/editor-keys';
import { actions } from '../../lib/progress-store';
import { useProgress } from './use-progress';
import SqlEditor from './SqlEditor';
import { DbDiagramDialog } from './DbDiagram';

interface Props {
  exercise: PublicExercise;
  apiBase: string;
  tables: DbTable[];
  nums: string[];
}

type Action = 'run' | 'grade';
const START = '-- Viết câu lệnh của bạn ở đây\n';
const SHOWN_ROWS = 200;

export default function ExerciseWorkspace({ exercise, apiBase, tables, nums }: Props) {
  useProgress(nums);
  const client = useMemo(() => createExerciseClient(apiBase), [apiBase]);
  const [sql, setSql] = useState(() => loadDraft(exercise.id) ?? START);
  const [code, setCode] = useState<string | null>(() => loadAccessCode());
  const [askCode, setAskCode] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [busy, setBusy] = useState<Action | null>(null);
  const [slow, setSlow] = useState(false);
  const [result, setResult] = useState<RunResponse | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<{ correct: boolean; text: string } | null>(null);
  const [tab, setTab] = useState<'results' | 'messages'>('results');
  const [diagramOpen, setDiagramOpen] = useState(false);
  const diagramButton = useRef<HTMLButtonElement>(null);
  const codeField = useRef<HTMLInputElement>(null);
  const pending = useRef<Action>('run');

  // Wake the database while the learner reads the brief, but only for someone who has a code.
  useEffect(() => { void client.ping(code); }, [client, code]);
  useEffect(() => { if (askCode) codeField.current?.focus(); }, [askCode]);

  const change = (text: string) => { setSql(text); saveDraft(exercise.id, text); };

  async function go(action: Action, withCode: string | null = code) {
    if (busy) return;
    if (!withCode) { pending.current = action; setAskCode(true); return; }
    setBusy(action); setSlow(false); setFailure(null); setVerdict(null);
    const onSlow = () => setSlow(true);
    const r = action === 'run'
      ? await client.run(exercise.id, sql, withCode, onSlow)
      : await client.grade(exercise.id, sql, withCode, onSlow);
    setBusy(null); setSlow(false);
    if (!r.ok) {
      if (r.kind === 'bad-code') { saveAccessCode(null); setCode(null); pending.current = action; setAskCode(true); }
      setFailure(r.kind === 'blocked' ? r.reason ?? '' : MESSAGES[r.kind]);
      setResult(null);
      return;
    }
    setResult(r);
    setTab(r.error || r.columns.length === 0 ? 'messages' : 'results');
    if (action === 'grade') {
      const g = r as GradeResponse;
      setVerdict({ correct: g.correct, text: verdictText(g.correct, g.reason) });
      if (g.correct) actions.markExerciseDone(exercise.id);
    }
  }

  const submitCode = (e: FormEvent) => {
    e.preventDefault();
    const c = codeInput.trim();
    if (!c) return;
    saveAccessCode(c); setCode(c); setAskCode(false); setCodeInput('');
    void go(pending.current, c);
  };

  // F5 or Ctrl+Enter anywhere in the workspace runs, like in SSMS.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (editorKeyAction(e) === 'run' && e.key !== 'Tab') { e.preventDefault(); void go('run'); }
  };

  const closeDiagram = () => { setDiagramOpen(false); diagramButton.current?.focus(); };

  return (
    <div className="ws" onKeyDown={onKeyDown}>
      {askCode && (
        <form className="ws-code" onSubmit={submitCode}>
          <label htmlFor="ws-code-input">{ASK_CODE}</label>
          <input id="ws-code-input" ref={codeField} value={codeInput} onChange={e => setCodeInput(e.target.value)} autoComplete="off" spellCheck={false} />
          <button type="submit" className="ws-btn">Lưu mã</button>
        </form>
      )}
      <SqlEditor value={sql} onChange={change} onRun={() => void go('run')} />
      <div className="ws-bar">
        <button type="button" className="ws-btn" onClick={() => void go('run')} disabled={busy !== null}>{busy === 'run' ? 'Đang chạy…' : 'Chạy (F5)'}</button>
        <button type="button" className="ws-btn is-primary" onClick={() => void go('grade')} disabled={busy !== null}>{busy === 'grade' ? 'Đang chấm…' : 'Nộp bài'}</button>
        <span className="ws-spacer" />
        <button type="button" className="ws-btn is-ghost" ref={diagramButton} onClick={() => setDiagramOpen(true)}>Sơ đồ database</button>
      </div>
      {slow && <p className="ws-wait" role="status">{WAITING}</p>}
      {failure && <p className="ws-fail" role="alert">{failure}</p>}
      {verdict && <p className={`ws-verdict ${verdict.correct ? 'is-right' : 'is-wrong'}`} role="status">{verdict.text}</p>}
      {result && (
        <figure className="res ws-res">
          <div className="res-tabs" role="tablist">
            <button type="button" role="tab" aria-selected={tab === 'results'} className={`res-tab${tab === 'results' ? ' is-active' : ''}`} onClick={() => setTab('results')}>Results</button>
            <button type="button" role="tab" aria-selected={tab === 'messages'} className={`res-tab${tab === 'messages' ? ' is-active' : ''}`} onClick={() => setTab('messages')}>Messages</button>
          </div>
          {tab === 'results' ? (
            <div className="res-scroll">
              {result.columns.length > 0 && (
                <table className="res-grid">
                  <thead><tr><th className="res-rn"></th>{result.columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
                  <tbody>
                    {result.rows.map((row, r) => (
                      <tr key={r}>
                        <td className="res-rn">{r + 1}</td>
                        {row.map((v, i) => (v === null ? <td key={i} className="res-null">NULL</td> : <td key={i}>{String(v)}</td>))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <pre className={`res-messages${result.error ? ' is-error' : ''}`}>{result.error ?? `(${result.affected ?? 0} rows affected)`}</pre>
          )}
          <div className="res-status">
            {result.error ? <span className="ws-status-bad">Query completed with errors.</span> : <span className="res-ok">✓ Query executed successfully.</span>}
            <span>HRM_Demo</span>
            <span>{result.columns.length ? `${result.truncated ? `${SHOWN_ROWS}+` : result.rows.length} rows` : ''}</span>
          </div>
          {result.truncated && <figcaption className="res-trim">Đã cắt, chỉ hiện {SHOWN_ROWS} dòng đầu.</figcaption>}
        </figure>
      )}
      <DbDiagramDialog tables={tables} open={diagramOpen} onClose={closeDiagram} />
    </div>
  );
}
