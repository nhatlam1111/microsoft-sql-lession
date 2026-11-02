import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { createArcadeClient } from '../../lib/arcade-client';
import type { ChallengeState, PublicChallenge, SubmitResponse, TestResult } from '../../lib/arcade-types';
import { arcadeUrl, testRows } from '../../lib/arcade-view';
import { editorKeyAction } from '../../lib/editor-keys';
import { ASK_CODE, MESSAGES, WAITING } from '../../lib/exercise-messages';
import { loadAccessCode, loadArcadeDraft, saveAccessCode, saveArcadeDraft } from '../../lib/exercise-storage';
import type { ApiFailure } from '../../lib/exercise-types';
import ArcadeTests from './ArcadeTests';
import SqlEditor from './SqlEditor';

interface Props {
  challenge: PublicChallenge;
  apiBase: string;
  nextId: string | null;
}

type Action = 'run' | 'submit';

const outcomeText = ({ accepted, reward, tests }: SubmitResponse) => {
  if (!accepted) return `Chưa đạt: qua ${tests.filter(t => t.passed).length}/${tests.length} test.`;
  return reward ? `Đạt toàn bộ test. Bạn nhận ${reward} coin.` : 'Đạt toàn bộ test. Bài này đã nhận thưởng trước đó.';
};

export default function ArcadeWorkspace({ challenge, apiBase, nextId }: Props) {
  const { id } = challenge;
  const client = useMemo(() => createArcadeClient(apiBase), [apiBase]);
  const [sql, setSql] = useState(() => loadArcadeDraft(id) ?? '');
  const hadDraft = useRef(loadArcadeDraft(id) !== null);
  const [code, setCode] = useState<string | null>(() => loadAccessCode());
  const [codeInput, setCodeInput] = useState('');
  const codeField = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<ChallengeState | null>(null);
  const [busy, setBusy] = useState<Action | null>(null);
  const [slow, setSlow] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [submitted, setSubmitted] = useState<SubmitResponse | null>(null);
  const [selected, setSelected] = useState(challenge.tests[0]?.id ?? 1);
  const [opening, setOpening] = useState(false);

  const refuse = (r: ApiFailure) => {
    if (r.kind === 'bad-code') { saveAccessCode(null); setCode(null); setState(null); }
    setFailure(r.kind === 'blocked' ? r.reason ?? '' : MESSAGES[r.kind]);
  };

  // Also wakes the database while the learner reads the brief.
  useEffect(() => {
    if (!code) return;
    let live = true;
    void (async () => {
      const r = await client.challenge(id, code, () => { if (live) setSlow(true); });
      if (!live) return;
      setSlow(false);
      if (!r.ok) { refuse(r); return; }
      setState(r);
      if (r.lastSql !== null && !hadDraft.current) setSql(r.lastSql);
    })();
    return () => { live = false; };
  }, [client, id, code]);

  const change = (text: string) => { setSql(text); saveArcadeDraft(id, text); };

  async function go(action: Action) {
    if (busy) return;
    if (!code) { codeField.current?.focus(); return; }
    setBusy(action); setSlow(false); setFailure(null); setSubmitted(null);
    const onSlow = () => setSlow(true);
    const r = action === 'run' ? await client.run(id, sql, code, onSlow) : await client.submit(id, sql, code, onSlow);
    setBusy(null); setSlow(false);
    if (!r.ok) { refuse(r); return; }
    setResults(r.tests);
    const wrong = r.tests.find(t => !t.passed);
    if (wrong) setSelected(wrong.id);
    if (action === 'submit') {
      const s = r as SubmitResponse;
      setSubmitted(s);
      setState(old => old && {
        ...old, coins: s.coins, completed: old.completed || s.accepted, lastSql: sql, lastFailed: s.tests.filter(t => !t.passed).map(t => t.id),
      });
    }
  }

  async function open(test: number) {
    if (!code || opening) return;
    setOpening(true); setFailure(null);
    const r = await client.open(id, test, code);
    setOpening(false);
    if (!r.ok) { refuse(r); return; }
    setState(old => old && { ...old, coins: r.coins, opened: [...old.opened, r.test] });
    setSelected(test);
  }

  const submitCode = (e: FormEvent) => {
    e.preventDefault();
    const c = codeInput.trim();
    if (!c) return;
    saveAccessCode(c); setCode(c); setCodeInput(''); setFailure(null);
  };

  // F5 or Ctrl+Enter anywhere in the workspace runs, like in SSMS.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (editorKeyAction(e) === 'run' && e.key !== 'Tab') { e.preventDefault(); void go('run'); }
  };

  const locked = state !== null && !state.unlocked;
  const rows = testRows(challenge, state?.opened ?? [], state?.lastFailed ?? null, results);

  return (
    <div className="ws" onKeyDown={onKeyDown}>
      {!code && (
        <form className="ws-code" onSubmit={submitCode} noValidate>
          <label htmlFor="ac-code">{ASK_CODE}</label>
          <input id="ac-code" ref={codeField} value={codeInput} onChange={e => setCodeInput(e.target.value)} autoComplete="off" spellCheck={false} />
          <button type="submit" className="ws-btn">Lưu mã</button>
        </form>
      )}
      {locked && <p className="ws-wait" role="status">{MESSAGES.locked}</p>}
      <SqlEditor value={sql} onChange={change} onRun={() => void go('run')} />
      <div className="ws-bar">
        <button type="button" className="ws-btn" onClick={() => void go('run')} disabled={busy !== null || locked}>{busy === 'run' ? 'Đang chạy…' : 'Chạy thử (F5)'}</button>
        <button type="button" className="ws-btn is-primary" onClick={() => void go('submit')} disabled={busy !== null || locked}>{busy === 'submit' ? 'Đang chấm…' : 'Nộp bài'}</button>
        <span className="ws-spacer" />
        {state?.completed && <span className="ac-finished">Đã xong</span>}
        {state && <span className="ac-coin">{state.coins} coin</span>}
      </div>
      {slow && <p className="ws-wait" role="status">{WAITING}</p>}
      {failure && <p className="ws-fail" role="alert">{failure}</p>}
      {submitted && (
        <p className={`ws-verdict ${submitted.accepted ? 'is-right' : 'is-wrong'}`} role="status">
          {outcomeText(submitted)}
          {submitted.accepted && <>{' '}<a href={arcadeUrl(nextId ?? undefined)}>{nextId ? 'Sang bài kế' : 'Về trang Luyện SQL'}</a></>}
        </p>
      )}
      <ArcadeTests
        challenge={challenge} rows={rows} selected={selected} onSelect={setSelected}
        coins={state?.coins ?? null} opening={opening} onOpen={id => void open(id)}
      />
    </div>
  );
}
