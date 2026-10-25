import { describe, expect, it, vi } from 'vitest';
import { createExerciseWorkflow } from '../src/lib/exercise-workflow';
import type { ApiFailure, GradeResponse, RunResponse, TablePreviewResponse } from '../src/lib/exercise-types';
import { loadAccessCode, saveAccessCode } from '../src/lib/exercise-storage';

const answer: RunResponse = { ok: true, columns: ['MaNV'], rows: [], error: null, affected: null, truncated: false, ms: 5 };
const preview: TablePreviewResponse = { ok: true, table: 'NhanVien', columns: ['MaNV'], rows: [['NV001']], page: 0, pageSize: 50, hasMore: true, ms: 3 };
function deferred<T>() { let resolve!: (value: T) => void; const promise = new Promise<T>(r => { resolve = r; }); return { promise, resolve }; }
function setup(code: string | null = 'test-code', sql = 'SELECT MaNV FROM NhanVien;') {
  const client = {
    run: vi.fn(async (): Promise<RunResponse | ApiFailure> => answer),
    grade: vi.fn(async (): Promise<GradeResponse | ApiFailure> => ({ ...answer, correct: true, reason: null })),
    preview: vi.fn(async (): Promise<TablePreviewResponse | ApiFailure> => preview),
  };
  const onDone = vi.fn(); const onDraft = vi.fn(() => true); const onCode = vi.fn((_code: string | null) => true);
  const flow = createExerciseWorkflow({ exerciseId: '1-6-1', sql, code, client, onDone, onDraft, onCode });
  return { flow, client, onDone, onDraft, onCode };
}

describe('execute before submit', () => {
  it('requires a successful current revision, including a successful zero-row result', async () => {
    const { flow, client, onDone } = setup();
    await flow.grade();
    expect(client.grade).not.toHaveBeenCalled();
    await flow.run();
    expect(flow.getSnapshot().canSubmit).toBe(true);
    await flow.grade();
    expect(client.grade.mock.calls[0]?.slice(0, 3)).toEqual(['1-6-1', 'SELECT MaNV FROM NhanVien;', 'test-code']);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('invalidates the permit on edits and undo back to identical SQL', async () => {
    const { flow } = setup(); await flow.run();
    flow.changeSql('SELECT 2'); flow.changeSql('SELECT MaNV FROM NhanVien;');
    expect(flow.getSnapshot()).toMatchObject({ revision: 2, canSubmit: false, resultRevision: 0 });
  });

  it('keeps edits while running and labels the response with its captured revision', async () => {
    const { flow, client } = setup(); const pending = deferred<RunResponse>();
    client.run.mockReturnValueOnce(pending.promise);
    const run = flow.run(); flow.changeSql('SELECT 2'); pending.resolve(answer); await run;
    expect(flow.getSnapshot()).toMatchObject({ sql: 'SELECT 2', revision: 1, resultRevision: 0, result: answer, canSubmit: false });
  });

  it('blocks same-tick double activation and clears the permit at the next run start', async () => {
    const { flow, client } = setup(); await flow.run();
    const pending = deferred<RunResponse>(); client.run.mockReturnValueOnce(pending.promise);
    const run = flow.run(); void flow.run(); void flow.grade(); void flow.showData('NhanVien');
    expect(flow.getSnapshot()).toMatchObject({ busy: 'run', canSubmit: false });
    expect(client.run).toHaveBeenCalledTimes(2); expect(client.grade).not.toHaveBeenCalled(); expect(client.preview).not.toHaveBeenCalled();
    pending.resolve({ ...answer, error: 'Syntax error' }); await run;
    expect(flow.getSnapshot()).toMatchObject({ canSubmit: false, tab: 'messages' });
  });

  it('never records progress for an incorrect, failed or obsolete grade', async () => {
    const { flow, client, onDone } = setup(); await flow.run();
    client.grade.mockResolvedValueOnce({ ...answer, correct: false, reason: 'columns' }); await flow.grade();
    const pending = deferred<GradeResponse>(); client.grade.mockReturnValueOnce(pending.promise);
    const grade = flow.grade(); flow.changeSql('SELECT 2'); pending.resolve({ ...answer, correct: true, reason: null }); await grade;
    expect(onDone).not.toHaveBeenCalled();
  });

  it('shows the latest SQL error in Messages while retaining the executed result grid', async () => {
    const { flow, client } = setup(); await flow.run();
    client.grade.mockResolvedValueOnce({ ...answer, error: 'Invalid column name.', correct: false, reason: null });
    await flow.grade();
    expect(flow.getSnapshot()).toMatchObject({ result: answer, messageResult: { error: 'Invalid column name.' }, tab: 'messages', canSubmit: false });
  });

  it.each(['SELECT 1; COMMIT;', '-- comment only', 'SELECT 1; SELECT 2;', 'SELECT ' + '1'.repeat(4000)])('preflights before auth or network: %s', async sql => {
    const { flow, client } = setup(null, sql); await flow.run();
    expect(flow.getSnapshot()).toMatchObject({ askCode: false, canSubmit: false });
    expect(flow.getSnapshot().failure).toBeTruthy(); expect(client.run).not.toHaveBeenCalled();
  });

  it('does not block strings, comments or quoted identifiers containing transaction words', async () => {
    const { flow, client } = setup('test-code', "SELECT N'COMMIT', [ROLLBACK] -- BEGIN TRAN\nFROM NhanVien;");
    await flow.run(); expect(client.run).toHaveBeenCalledTimes(1);
  });
});

describe('authentication and draft recovery', () => {
  it.each(['change-code', 'bad-code'] as const)('reports a failed code removal after %s while clearing in-memory auth and cached data', async trigger => {
    const values = new Map([['sqlserver-course:access-code', 'old-test-code']]);
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value), removeItem() { throw new Error('Removal blocked'); } } as unknown as Storage;
    const sql = '-- Draft stays exact\nSELECT MaNV FROM NhanVien;';
    const { flow, client, onCode } = setup(loadAccessCode(storage), sql);
    onCode.mockImplementation(code => saveAccessCode(code, storage));
    await flow.run(); await flow.showData('NhanVien');
    expect(flow.getSnapshot()).toMatchObject({ canSubmit: true, preview });
    if (trigger === 'change-code') flow.beginCodeChange();
    else { client.grade.mockResolvedValueOnce({ ok: false, kind: 'bad-code' }); await flow.grade(); }
    expect(flow.getSnapshot()).toMatchObject({ sql, code: null, canSubmit: false, preview: null, askCode: true, codeRemoved: false, codeSaved: true });
    expect(loadAccessCode(storage)).toBe('old-test-code');
    await flow.submitCode('new-test-code');
    expect(flow.getSnapshot()).toMatchObject({ codeRemoved: true, canSubmit: false });
    await flow.showData('NhanVien');
    expect(client.preview).toHaveBeenCalledTimes(2);
  });

  it('retries a pending run with the current draft after entering a code', async () => {
    const { flow, client } = setup(null); await flow.run();
    flow.changeSql('SELECT 2'); await flow.submitCode('new-code');
    expect(client.run.mock.calls[0]?.slice(0, 3)).toEqual(['1-6-1', 'SELECT 2', 'new-code']);
    expect(flow.getSnapshot().canSubmit).toBe(true);
  });

  it('rechecks the guard after auth and does not run a newly blocked draft', async () => {
    const { flow, client } = setup(null); await flow.run(); flow.changeSql('SELECT 1; COMMIT;'); await flow.submitCode('new-code');
    expect(client.run).not.toHaveBeenCalled(); expect(flow.getSnapshot().failure).toBeTruthy();
  });

  it('requires Execute after a grade rejects the code and retains the draft', async () => {
    const { flow, client } = setup(); await flow.run();
    client.grade.mockResolvedValueOnce({ ok: false, kind: 'bad-code' }); await flow.grade();
    expect(flow.getSnapshot()).toMatchObject({ askCode: true, code: null, canSubmit: false });
    await flow.submitCode('new-code');
    expect(client.run).toHaveBeenCalledTimes(1); expect(client.grade).toHaveBeenCalledTimes(1);
    expect(flow.getSnapshot().sql).toBe('SELECT MaNV FROM NhanVien;');
    expect(flow.getSnapshot().canSubmit).toBe(false);
  });

  it('keeps exact draft text in memory and exposes persistence failure without autosaving on mount', () => {
    const { flow, onDraft } = setup(null, '-- exact\n\n'); expect(onDraft).not.toHaveBeenCalled();
    onDraft.mockReturnValue(false); flow.changeSql('');
    expect(flow.getSnapshot()).toMatchObject({ sql: '', draftSaved: false });
    expect(onDraft).toHaveBeenCalledWith('');
  });
});

describe('table preview isolation', () => {
  it('does not fetch at creation or for schema, and cannot replace SQL/result/progress', async () => {
    const { flow, client, onDone } = setup();
    flow.showStructure('NhanVien'); expect(client.preview).not.toHaveBeenCalled();
    await flow.run(); const sql = flow.getSnapshot().sql; await flow.showData('NhanVien');
    expect(flow.getSnapshot()).toMatchObject({ sql, result: answer, preview, canSubmit: true, tab: 'data' });
    expect(onDone).not.toHaveBeenCalled();
  });

  it('caches table/page in the session, refreshes explicitly and clears cache after a code change', async () => {
    const { flow, client } = setup(); await flow.showData('NhanVien'); await flow.showData('NhanVien');
    expect(client.preview).toHaveBeenCalledTimes(1);
    await flow.showData('NhanVien', 0, true); expect(client.preview).toHaveBeenCalledTimes(2);
    flow.beginCodeChange(); await flow.submitCode('different-code'); await flow.showData('NhanVien');
    expect(client.preview).toHaveBeenCalledTimes(3); expect(flow.getSnapshot().canSubmit).toBe(false);
  });

  it('ignores a superseded preview while switching table and keeps only one request in flight', async () => {
    const { flow, client } = setup(); const pending = deferred<TablePreviewResponse>(); client.preview.mockReturnValueOnce(pending.promise);
    const first = flow.showData('NhanVien'); const second = flow.showData('PhongBan');
    expect(client.preview).toHaveBeenCalledTimes(1); expect(flow.getSnapshot().selectedTable).toBe('PhongBan');
    client.preview.mockResolvedValueOnce({ ...preview, table: 'PhongBan' }); pending.resolve(preview);
    await first; await second;
    expect(flow.getSnapshot()).toMatchObject({ selectedTable: 'PhongBan', preview: { table: 'PhongBan' }, busy: null });
    expect(client.preview).toHaveBeenCalledTimes(2);
  });

  it('ignores stale responses on credential change or unmount', async () => {
    const { flow, client } = setup(); const pending = deferred<RunResponse>(); client.run.mockReturnValueOnce(pending.promise);
    const run = flow.run(); flow.beginCodeChange(); pending.resolve(answer); await run;
    expect(flow.getSnapshot()).toMatchObject({ canSubmit: false, result: null });
    const late = deferred<TablePreviewResponse>(); client.preview.mockReturnValueOnce(late.promise);
    await flow.submitCode('new-code'); const work = flow.showData('NhanVien'); flow.dispose(); late.resolve(preview); await work;
    expect(flow.getSnapshot().preview).toBeNull();
  });

  it('does not show a different table\'s cached rows after selecting its structure', async () => {
    const { flow } = setup(); await flow.showData('NhanVien');
    flow.showStructure('PhongBan'); flow.setTab('data');
    expect(flow.getSnapshot()).toMatchObject({ selectedTable: 'PhongBan', page: 0, preview: null });
  });

  it('ignores duplicate preview activation for the same table and page', async () => {
    const { flow, client } = setup(); const pending = deferred<TablePreviewResponse>(); client.preview.mockReturnValueOnce(pending.promise);
    const first = flow.showData('NhanVien'); const duplicate = flow.showData('NhanVien');
    pending.resolve(preview); await first; await duplicate;
    expect(client.preview).toHaveBeenCalledTimes(1);
    expect(flow.getSnapshot().preview).toEqual(preview);
  });
});
