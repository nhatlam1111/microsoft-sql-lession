import type { ApiFailure, GradeResponse, RunResponse, TablePreviewResponse } from './exercise-types';
import type { createExerciseClient } from './exercise-client';
import { MESSAGES, verdictText } from './exercise-messages';
import { guardExercise } from './sql-guard';

export type WorkspaceTab = 'results' | 'messages' | 'data' | 'structure';
type OperationKind = 'run' | 'grade' | 'preview';
type Pending = { kind: 'run' } | { kind: 'preview'; table: string; page: number } | null;
export interface WorkspaceState {
  sql: string;
  revision: number;
  code: string | null;
  askCode: boolean;
  canSubmit: boolean;
  busy: OperationKind | null;
  slow: boolean;
  result: RunResponse | null;
  messageResult: RunResponse | null;
  resultRevision: number | null;
  failure: string | null;
  verdict: { correct: boolean; text: string } | null;
  tab: WorkspaceTab;
  selectedTable: string | null;
  page: number;
  preview: TablePreviewResponse | null;
  previewFailure: string | null;
  draftSaved: boolean;
  codeSaved: boolean;
  codeRemoved: boolean;
}
interface Options {
  exerciseId: string;
  sql: string;
  code: string | null;
  client: Pick<ReturnType<typeof createExerciseClient>, 'run' | 'grade' | 'preview'>;
  onDraft: (text: string) => boolean;
  onCode: (code: string | null) => boolean;
  onDone: () => void;
}
const failureText = (r: ApiFailure) => r.kind === 'blocked' ? r.reason || 'Câu lệnh này không dùng được trong bài tập.' : MESSAGES[r.kind];
const RUN_AGAIN = 'Chạy thử câu lệnh hiện tại trước khi nộp bài.';

/** Owns the revision gate and request lifetimes independently of React render timing. */
export function createExerciseWorkflow(options: Options) {
  let state: WorkspaceState = {
    sql: options.sql, revision: 0, code: options.code, askCode: false, canSubmit: false,
    busy: null, slow: false, result: null, messageResult: null, resultRevision: null, failure: null, verdict: null,
    tab: 'results', selectedTable: null, page: 0, preview: null, previewFailure: null,
    draftSaved: true, codeSaved: true, codeRemoved: true,
  };
  const listeners = new Set<() => void>();
  const cache = new Map<string, TablePreviewResponse>();
  let permit: number | null = null;
  let epoch = 0;
  let alive = true;
  let pending: Pending = null;
  let active: { kind: OperationKind; controller: AbortController; done: Promise<void>; previewKey?: string } | null = null;
  const update = (patch: Partial<WorkspaceState>) => {
    if (!alive) return;
    state = { ...state, ...patch };
    state.canSubmit = permit === state.revision && !!state.code && state.busy === null;
    listeners.forEach(fn => fn());
  };
  const resetIdentity = (code: string | null) => {
    epoch++; permit = null; cache.clear(); active?.controller.abort();
    update({ code, preview: null, previewFailure: null, verdict: null, slow: false });
  };
  const invalidateCode = () => {
    resetIdentity(null);
    update({ codeRemoved: options.onCode(null) });
  };
  const badCode = (retry: Pending) => {
    invalidateCode(); pending = retry;
    update({ askCode: true });
  };
  const preflight = () => {
    const checked = guardExercise(state.sql);
    if (!checked.ok) {
      permit = null;
      update({ failure: checked.reason, tab: 'messages' });
      return false;
    }
    return true;
  };

  async function execute(kind: 'run' | 'grade') {
    if (active || !alive) return;
    if (!preflight()) return;
    if (kind === 'grade' && !state.canSubmit) { update({ failure: RUN_AGAIN, tab: 'messages' }); return; }
    if (!state.code) { pending = kind === 'run' ? { kind: 'run' } : null; update({ askCode: true }); return; }
    const sql = state.sql, revision = state.revision, code = state.code, requestEpoch = epoch;
    if (kind === 'run') permit = null;
    const operation = { kind, controller: new AbortController(), done: Promise.resolve() };
    active = operation;
    update({ busy: kind, slow: false, failure: null, verdict: null });
    const current = () => alive && requestEpoch === epoch && !operation.controller.signal.aborted;
    operation.done = (async () => {
      try {
        const r = await options.client[kind](options.exerciseId, sql, code, () => { if (current()) update({ slow: true }); }, operation.controller.signal);
        if (!current()) return;
        if (!r.ok) {
          permit = null;
          if (r.kind === 'bad-code') badCode(kind === 'run' ? { kind: 'run' } : null);
          update({ failure: r.kind === 'bad-code' && kind === 'grade' ? `${failureText(r)} ${RUN_AGAIN}` : failureText(r), tab: 'messages' });
          return;
        }
        if (kind === 'run') {
          permit = !r.error && revision === state.revision ? revision : null;
          update({ result: r, messageResult: r, resultRevision: revision, tab: r.error || !r.columns.length ? 'messages' : 'results' });
        } else {
          const grade = r as GradeResponse;
          const stillCurrent = revision === state.revision;
          if (grade.error) permit = null;
          update({ messageResult: grade, verdict: stillCurrent ? { correct: grade.correct && !grade.error, text: grade.error || verdictText(grade.correct, grade.reason) } : null,
            failure: stillCurrent ? null : RUN_AGAIN, tab: grade.error || !stillCurrent ? 'messages' : state.tab });
          if (grade.correct && !grade.error && stillCurrent) options.onDone();
        }
      } catch {
        if (current()) { permit = null; update({ failure: MESSAGES.network, tab: 'messages' }); }
      } finally {
        if (active === operation) { active = null; update({ busy: null, slow: false }); }
      }
    })();
    await operation.done;
  }

  async function showData(table: string, page = 0, refresh = false): Promise<void> {
    if (!alive) return;
    const key = `${table}:${page}`;
    update({ selectedTable: table, page, tab: 'data', preview: cache.get(key) ?? null, previewFailure: null });
    if (active?.kind === 'preview') {
      if (active.previewKey === key && !active.controller.signal.aborted) { await active.done; return; }
      // Stop waiting for the old HTTP reply. This does not claim to cancel SQL on the server.
      active.controller.abort();
      await active.done;
      if (!alive || state.selectedTable !== table || state.page !== page || state.tab !== 'data') return;
    }
    if (active) return;
    if (!state.code) { pending = { kind: 'preview', table, page }; update({ askCode: true }); return; }
    if (!refresh && cache.has(key)) return;
    const code = state.code, requestEpoch = epoch;
    const operation = { kind: 'preview' as const, controller: new AbortController(), done: Promise.resolve(), previewKey: key };
    active = operation;
    update({ busy: 'preview', slow: false });
    const current = () => alive && requestEpoch === epoch && !operation.controller.signal.aborted && state.selectedTable === table && state.page === page;
    operation.done = (async () => {
      try {
        const r = await options.client.preview(table, page, code, () => { if (current()) update({ slow: true }); }, operation.controller.signal);
        if (!current()) return;
        if (!r.ok) {
          if (r.kind === 'bad-code') badCode({ kind: 'preview', table, page });
          update({ previewFailure: failureText(r), preview: null });
          return;
        }
        cache.set(key, r);
        update({ preview: r, previewFailure: null });
      } catch {
        if (current()) update({ previewFailure: MESSAGES.network, preview: null });
      } finally {
        if (active === operation) { active = null; update({ busy: null, slow: false }); }
      }
    })();
    await operation.done;
  }

  return {
    getSnapshot: () => state,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    activate: () => { alive = true; },
    dispose: () => { alive = false; epoch++; active?.controller.abort(); },
    changeSql(text: string) {
      permit = null;
      update({ sql: text, revision: state.revision + 1, verdict: null, draftSaved: options.onDraft(text) });
    },
    run: () => execute('run'),
    grade: () => execute('grade'),
    showData,
    showStructure(table: string) {
      if (state.selectedTable !== table) {
        if (active?.kind === 'preview') active.controller.abort();
        update({ selectedTable: table, page: 0, preview: cache.get(`${table}:0`) ?? null, previewFailure: null, tab: 'structure' });
      } else update({ tab: 'structure' });
    },
    setTab(tab: WorkspaceTab) { update({ tab }); },
    beginCodeChange() { pending = null; invalidateCode(); update({ askCode: true }); },
    async submitCode(code: string) {
      if (!code.trim()) return;
      const retry = pending; pending = null;
      resetIdentity(code.trim());
      const codeSaved = options.onCode(code.trim());
      update({ askCode: false, codeSaved, codeRemoved: codeSaved || state.codeRemoved, failure: null });
      // A rejected grade never replays automatically; a run rechecks the current editor and guard.
      if (active) await active.done;
      if (retry?.kind === 'run') await execute('run');
      else if (retry?.kind === 'preview' && state.selectedTable === retry.table && state.page === retry.page) await showData(retry.table, retry.page);
    },
  };
}
