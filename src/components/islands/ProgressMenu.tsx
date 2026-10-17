import { useEffect, useRef, useState } from 'react';
import { actions } from '../../lib/progress-store';
import { exportFileName } from '../../lib/progress';
import { EVENTS, emit } from '../../lib/events';
import { useProgress } from './use-progress';

const PROBLEM_TEXT = {
  unavailable: 'Trình duyệt đang chặn lưu dữ liệu, nên tiến độ không được giữ lại khi chuyển trang hay đóng trang. Hãy dùng trình duyệt khác hoặc tắt chế độ ẩn danh.',
  corrupt: 'Không đọc được tiến độ đã lưu. Bản cũ vẫn được giữ lại trong trình duyệt; nếu có file đã xuất, hãy nhập lại.',
};

export default function ProgressMenu({ nums }: { nums: string[] }) {
  const { problem } = useProgress(nums);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!rootRef.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); window.removeEventListener('keydown', onKey); };
  }, [open]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(t);
  }, [message]);

  const exportFile = () => {
    setOpen(false);
    const url = URL.createObjectURL(new Blob([actions.exportText()], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = exportFileName(Date.now());
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFile = async (file: File | undefined) => {
    if (!file) return;
    if (!window.confirm('Tiến độ hiện tại sẽ bị thay bằng nội dung trong file. Tiếp tục?')) return;
    const result = actions.importText(await file.text());
    if (result.ok) {
      setMessage(`Đã nhập tiến độ.${result.ignored > 0 ? ` Bỏ qua ${result.ignored} bài không còn trong khóa học.` : ''}`);
    } else {
      setMessage(result.error);
    }
  };

  const loadDemo = () => {
    setOpen(false);
    if (!window.confirm('Tiến độ mẫu sẽ thay tiến độ hiện tại. Nếu đang học thật, hãy xuất tiến độ ra file trước. Tiếp tục?')) return;
    actions.loadDemo();
    emit(EVENTS.openRoadmap);
  };

  const reset = () => {
    setOpen(false);
    if (!window.confirm('Xóa toàn bộ tiến độ? Thao tác này không hoàn tác được.')) return;
    actions.reset();
  };

  return (
    <div className="pm" ref={rootRef}>
      <button type="button" className="top-btn pm-toggle" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen(o => !o)}>
        Tiến độ
      </button>
      {open && (
        <ul className="pm-menu" role="menu">
          <li><button type="button" role="menuitem" onClick={exportFile}>Xuất tiến độ ra file</button></li>
          <li><button type="button" role="menuitem" onClick={() => { setOpen(false); fileRef.current?.click(); }}>Nhập tiến độ từ file</button></li>
          <li><button type="button" role="menuitem" onClick={loadDemo}>Xem thử với tiến độ mẫu</button></li>
          <li><button type="button" role="menuitem" className="pm-danger" onClick={reset}>Xóa toàn bộ tiến độ</button></li>
        </ul>
      )}
      <input ref={fileRef} type="file" accept=".json,application/json" hidden
        onChange={e => { void importFile(e.target.files?.[0]); e.target.value = ''; }} />
      {message && <p className="pm-message" role="status">{message}</p>}
      {problem && <p className="pm-problem" role="alert">{PROBLEM_TEXT[problem]}</p>}
    </div>
  );
}
