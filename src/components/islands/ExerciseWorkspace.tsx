import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type SubmitEvent, type KeyboardEvent, type PointerEvent, type CSSProperties } from 'react';
import type { PublicExercise } from '../../lib/exercise-types';
import { ssmsColumnLabel, type DbTable } from '../../lib/db-schema';
import { createExerciseClient } from '../../lib/exercise-client';
import { ASK_CODE, WAITING } from '../../lib/exercise-messages';
import { loadAccessCode, loadDraft, saveAccessCode, saveDraft } from '../../lib/exercise-storage';
import { createExerciseWorkflow, type WorkspaceTab } from '../../lib/exercise-workflow';
import { clampEditorHeight, splitterKeyHeight, WORKSPACE_TABS, workspaceTabFromKey } from '../../lib/exercise-layout';
import { actions } from '../../lib/progress-store';
import { useProgress } from './use-progress';
import SqlEditor from './SqlEditor';
import ExerciseGrid from './ExerciseGrid';
import { COURSE_SERVER } from '../../lib/course-server';
import { lessonUrl } from '../../lib/paths';
import { DbDiagramDialog } from './DbDiagram';

interface Props { exercise: PublicExercise; apiBase: string; tables: DbTable[]; nums: string[] }
const TAB_LABELS: Record<WorkspaceTab, string> = { results: 'Kết quả', messages: 'Thông báo', data: 'Dữ liệu bảng', structure: 'Cấu trúc bảng' };

export default function ExerciseWorkspace({ exercise, apiBase, tables, nums }: Props) {
  useProgress(nums);
  const flow = useMemo(() => createExerciseWorkflow({
    exerciseId: exercise.id, sql: loadDraft(exercise.id) ?? '', code: loadAccessCode(), client: createExerciseClient(apiBase),
    onDraft: text => saveDraft(exercise.id, text), onCode: saveAccessCode, onDone: () => actions.markExerciseDone(exercise.id),
  }), [exercise.id, apiBase]);
  const state = useSyncExternalStore(flow.subscribe, flow.getSnapshot, flow.getSnapshot);
  const [codeInput, setCodeInput] = useState('');
  const [revealCode, setRevealCode] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [diagramOpen, setDiagramOpen] = useState(false);
  const [editorHeight, setEditorHeight] = useState<number | null>(null);
  const [availableHeight, setAvailableHeight] = useState(560);
  const diagramButton = useRef<HTMLButtonElement>(null);
  const codeField = useRef<HTMLInputElement>(null);
  const splitBody = useRef<HTMLDivElement>(null);
  const editorPane = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ y: number; height: number } | null>(null);
  const tabButtons = useRef<Partial<Record<WorkspaceTab, HTMLButtonElement | null>>>({});
  const table = tables.find(t => t.name === state.selectedTable);
  const stale = state.result !== null && state.resultRevision !== state.revision;
  const busy = state.busy !== null;

  useEffect(() => { flow.activate(); return flow.dispose; }, [flow]);
  useEffect(() => { if (state.askCode) codeField.current?.focus(); }, [state.askCode]);
  useEffect(() => {
    const element = splitBody.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const height = element.clientHeight;
      setAvailableHeight(height);
      setEditorHeight(current => current === null ? null : clampEditorHeight(current, height));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const submitCode = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!codeInput.trim()) { setCodeError(true); codeField.current?.focus(); return; }
    const code = codeInput;
    setCodeInput(''); setRevealCode(false); setCodeError(false);
    void flow.submitCode(code);
  };
  const shortcut = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.nativeEvent.isComposing || diagramOpen || state.askCode) return;
    if (event.key === 'F5' || (event.key === 'Enter' && (event.ctrlKey || event.metaKey))) {
      event.preventDefault(); void flow.run();
    }
  };
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault(); event.currentTarget.focus(); event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { y: event.clientY, height: editorPane.current?.clientHeight ?? 180 };
  };
  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    setEditorHeight(clampEditorHeight(dragStart.current.height + event.clientY - dragStart.current.y, splitBody.current?.clientHeight ?? availableHeight));
  };
  const keySplit = (event: KeyboardEvent<HTMLDivElement>) => {
    const height = splitterKeyHeight(event.key, editorPane.current?.clientHeight ?? 180, splitBody.current?.clientHeight ?? availableHeight);
    if (height !== null) { event.preventDefault(); setEditorHeight(height); }
  };
  const keyTab = (event: KeyboardEvent<HTMLButtonElement>, tab: WorkspaceTab) => {
    const next = workspaceTabFromKey(event.key, tab);
    if (next) { event.preventDefault(); flow.setTab(next); tabButtons.current[next]?.focus(); }
  };
  const closeDiagram = () => { setDiagramOpen(false); diagramButton.current?.focus(); };
  const splitStyle = editorHeight === null ? undefined : { gridTemplateRows: `${editorHeight}px 8px minmax(160px, 1fr)` } as CSSProperties;

  return <div className={`ws${state.askCode ? ' is-auth' : ''}`} onKeyDown={shortcut}>
    <div className="ws-frame">
      <div className="ws-bar" role="toolbar" aria-label="Chạy và nộp bài">
        <button type="button" className="ws-btn is-primary ws-run" onClick={() => void flow.run()} disabled={busy} aria-keyshortcuts="F5 Control+Enter">Chạy thử <span className="ws-shortcut">(F5)</span></button>
        <button type="button" className="ws-btn ws-submit" onClick={() => void flow.grade()} disabled={!state.canSubmit} aria-describedby="ws-submit-help">Nộp bài</button>
        <span className="ws-spacer" />
        <button type="button" className="ws-btn is-ghost ws-diagram" ref={diagramButton} onClick={() => setDiagramOpen(true)}>Sơ đồ database</button>
      </div>
      <div className="ws-guidance">
        <p className="ws-help" id="ws-practice-help">Chạy và nộp bài trên web cần mã truy cập từ người phụ trách khóa học. Chưa có mã: <a href={lessonUrl('1-2-sql-server-ssms-hrm-demo')}>tạo database riêng ở bài 1.2</a> để thực hành trong SSMS; bản riêng không có chấm tự động.</p>
        <p className="ws-submit-help" id="ws-submit-help">{state.canSubmit ? 'Có thể nộp câu lệnh vừa chạy.' : 'Chạy thử thành công câu lệnh hiện tại để mở Nộp bài.'}</p>
        {state.askCode && <form className="ws-code" onSubmit={submitCode} noValidate>
          <label htmlFor="ws-code-input">{ASK_CODE}</label>
          <div className="ws-code-field">
            <input id="ws-code-input" type={revealCode ? 'text' : 'password'} ref={codeField} value={codeInput} onChange={event => { setCodeInput(event.target.value); setCodeError(false); }} aria-invalid={codeError} aria-describedby={`ws-practice-help${codeError ? ' ws-code-error' : ''}`} autoComplete="off" spellCheck={false} />
            <button type="button" className="ws-btn" aria-label={revealCode ? 'Ẩn mã truy cập' : 'Hiện mã truy cập'} aria-pressed={revealCode} onClick={() => setRevealCode(value => !value)}>{revealCode ? 'Ẩn mã' : 'Hiện mã'}</button>
          </div>
          {codeError && <p id="ws-code-error" className="ws-field-error" role="alert">Nhập mã truy cập để tiếp tục.</p>}
          <button type="submit" className="ws-btn">Lưu mã và tiếp tục</button>
        </form>}
        {!state.draftSaved && <p className="ws-field-error" role="status">Chưa lưu được bản nháp trên trình duyệt. Câu lệnh vẫn được giữ trong trang này; sao chép trước khi rời trang.</p>}
        {!state.codeSaved && <p className="ws-field-error" role="status">Chưa lưu được mã trên trình duyệt. Mã chỉ dùng trong trang này.</p>}
        {!state.codeRemoved && <p className="ws-field-error" role="status">Không xóa được mã đã lưu trên trình duyệt. Trang này đã bỏ mã cũ; khi tải lại, mã cũ có thể xuất hiện lại.</p>}
      </div>
      <div className="ws-file-tab"><span>{exercise.id}.sql</span><span className="ws-file-context">{COURSE_SERVER.database}</span></div>
      <div className="ws-split" ref={splitBody} style={splitStyle}>
        <div className="ws-editor-pane" id="ws-editor-pane" ref={editorPane}>
          <SqlEditor value={state.sql} onChange={flow.changeSql} onRun={() => { if (!diagramOpen && !state.askCode) void flow.run(); }} tables={tables} describedBy="ws-practice-help ws-submit-help" />
        </div>
        <div className="ws-splitter" role="separator" tabIndex={0} aria-label="Chia chiều cao editor và kết quả" aria-orientation="horizontal" aria-controls="ws-editor-pane ws-results-pane" aria-valuemin={180} aria-valuemax={Math.max(180, availableHeight - 168)} aria-valuenow={Math.round(editorHeight ?? Math.max(180, (availableHeight - 8) * .58))} aria-valuetext="Dùng phím lên xuống, Home hoặc End để đổi chiều cao" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { dragStart.current = null; }} onPointerCancel={() => { dragStart.current = null; }} onLostPointerCapture={() => { dragStart.current = null; }} onKeyDown={keySplit}><span /></div>
        <section className="ws-results-pane" id="ws-results-pane" aria-label="Kết quả và dữ liệu">
          <div className="ws-tabs" role="tablist" aria-label="Kết quả, thông báo và thông tin bảng">
            {WORKSPACE_TABS.map(tab => <button key={tab} type="button" role="tab" id={`ws-tab-${tab}`} aria-controls={`ws-panel-${tab}`} aria-selected={state.tab === tab} tabIndex={state.tab === tab ? 0 : -1} ref={element => { tabButtons.current[tab] = element; }} className={`ws-tab${state.tab === tab ? ' is-active' : ''}`} onClick={() => flow.setTab(tab)} onKeyDown={event => keyTab(event, tab)}>{TAB_LABELS[tab]}</button>)}
          </div>
          <div className="ws-feedback" aria-live="polite">
            {state.slow && <p className="ws-wait" role="status">{WAITING}</p>}
            {state.busy && !state.slow && <p className="ws-loading" role="status">{state.busy === 'run' ? 'Đang chạy câu lệnh…' : state.busy === 'grade' ? 'Đang chấm bài…' : 'Đang đọc dữ liệu bảng…'}</p>}
            {state.failure && <p className="ws-fail" role="alert">{state.failure}</p>}
            {state.verdict && <p className={`ws-verdict ${state.verdict.correct ? 'is-right' : 'is-wrong'}`} role="status">{state.verdict.text}</p>}
            {stale && (state.tab === 'results' || state.tab === 'messages') && <p className="ws-previous">Kết quả của phiên bản SQL trước. Chạy thử lại để xem câu lệnh hiện tại.</p>}
          </div>
          {WORKSPACE_TABS.map(tab => <div key={tab} role="tabpanel" id={`ws-panel-${tab}`} aria-labelledby={`ws-tab-${tab}`} tabIndex={0} hidden={state.tab !== tab} className={`ws-panel ws-panel-${tab}`}>
            {tab === 'results' && (state.result ? <>
              <ExerciseGrid columns={state.result.columns} rows={state.result.rows} label="Kết quả câu lệnh" empty={state.result.error ? 'Câu lệnh có lỗi. Xem thẻ Thông báo.' : state.result.columns.length ? 'Câu lệnh chạy thành công, không có dòng kết quả.' : 'Câu lệnh không trả bảng kết quả. Xem thẻ Thông báo.'} />
              {state.result.truncated && <p className="ws-grid-note">Chỉ hiển thị 200 dòng đầu.</p>}
            </> : <p className="ws-empty">Chạy thử câu lệnh để xem kết quả tại đây.</p>)}
            {tab === 'messages' && <pre className={`ws-messages${state.messageResult?.error ? ' is-error' : ''}`}>{state.messageResult ? state.messageResult.error ?? `Câu lệnh chạy thành công.\n${state.messageResult.affected === null ? `${state.messageResult.rows.length}${state.messageResult.truncated ? '+' : ''} dòng kết quả.` : `${state.messageResult.affected} dòng bị ảnh hưởng (đã hoàn tác).`}\nThời gian: ${state.messageResult.ms} ms.` : 'Chưa có thông báo chạy SQL.'}</pre>}
            {tab === 'data' && <>
              <div className="ws-data-bar">
                <strong>{table ? `dbo.${table.name}` : 'Chọn bảng ở Object Explorer'}</strong>
                {table && <button type="button" className="ws-btn" disabled={busy} onClick={() => void flow.showData(table.name, state.page, true)}>Làm mới</button>}
              </div>
              {state.previewFailure && <p className="ws-fail" role="alert">{state.previewFailure}</p>}
              {state.preview ? <ExerciseGrid columns={state.preview.columns} rows={state.preview.rows} offset={state.page * 50} label={`Dữ liệu bảng ${table?.name ?? ''}`} empty="Trang này không có dòng dữ liệu." /> : <div className="ws-preview-empty"><p className="ws-empty">{state.busy === 'preview' ? 'Đang tải trang dữ liệu…' : table ? 'Dữ liệu bảng chỉ được đọc khi bạn bấm Xem dữ liệu hoặc Làm mới.' : 'Bấm Xem dữ liệu bên một bảng để đọc dữ liệu mẫu.'}</p></div>}
              {table && <div className="ws-pagination" aria-label="Trang dữ liệu bảng">
                <button type="button" className="ws-btn" disabled={busy || state.page === 0} onClick={() => void flow.showData(table.name, state.page - 1)}>Trước</button>
                <span>{state.preview ? state.preview.rows.length ? `Dòng ${state.page * 50 + 1}–${state.page * 50 + state.preview.rows.length}` : '0 dòng trên trang này' : `Trang ${state.page + 1}`} · 50 dòng/trang</span>
                <button type="button" className="ws-btn" disabled={busy || !state.preview?.hasMore} onClick={() => void flow.showData(table.name, state.page + 1)}>Sau</button>
              </div>}
            </>}
            {tab === 'structure' && (table ? <div className="ws-structure-scroll"><h2>dbo.{table.name}</h2>
              <table className="ws-schema-grid"><caption className="ws-sr-only">Cấu trúc bảng {table.name}</caption><thead><tr><th scope="col">Cột</th><th scope="col">Kiểu dữ liệu</th><th scope="col">NULL</th><th scope="col">Khóa</th></tr></thead><tbody>{table.columns.map(column => <tr key={column.name}><th scope="row">{column.name}</th><td>{column.type}</td><td>{column.nullable ? 'Cho phép' : 'Không'}</td><td>{table.primaryKey.includes(column.name) && <span>PK </span>}{table.foreignKeys.filter(key => key.column === column.name).map(key => <span key={key.refTable + key.refColumn}>FK → {key.refTable}.{key.refColumn}</span>)}</td></tr>)}</tbody></table>
              <p className="ws-grid-note">PK: khóa chính · FK: khóa ngoại. Cấu trúc lấy từ bộ mẫu khóa học.</p>
            </div> : <p className="ws-empty">Bấm Xem cấu trúc bên một bảng. Không cần mã truy cập.</p>)}
          </div>)}
        </section>
      </div>
      <div className="ws-status" role="status"><span>{state.busy ? 'Đang xử lý' : state.result?.error ? 'Câu lệnh có lỗi' : state.result ? 'Đã chạy câu lệnh' : 'Sẵn sàng'}</span><span>{state.sql.split(/\r\n?|\n/).length} dòng · {state.sql.length}/4.000 ký tự</span><button type="button" onClick={() => flow.beginCodeChange()} disabled={busy}>{state.code ? 'Đổi mã truy cập' : 'Nhập mã truy cập'}</button></div>
    </div>
    <aside className="ws-explorer" aria-label="Object Explorer">
      <h2>Object Explorer</h2>
      <div className="ws-explorer-scroll">
        <p className="ws-server" title={COURSE_SERVER.server}>{COURSE_SERVER.server}</p>
        <p className="ws-database">{COURSE_SERVER.database}</p>
        <p className="ws-schema-source">Cấu trúc bộ mẫu HRM_Demo · {tables.length} bảng</p>
        <div className="ws-tree">{tables.map(item => <details key={item.name} className={`ws-table${item.name === state.selectedTable ? ' is-selected' : ''}`}>
          <summary>dbo.{item.name}</summary>
          <div className="ws-table-actions"><button type="button" className="ws-btn" disabled={busy && state.busy !== 'preview'} onClick={() => void flow.showData(item.name)}>Xem dữ liệu</button><button type="button" className="ws-btn" onClick={() => flow.showStructure(item.name)}>Xem cấu trúc</button></div>
          <ul>{item.columns.map(column => <li key={column.name}>{ssmsColumnLabel(item, column)}</li>)}</ul>
        </details>)}</div>
      </div>
    </aside>
    <DbDiagramDialog tables={tables} open={diagramOpen} onClose={closeDiagram} />
  </div>;
}
