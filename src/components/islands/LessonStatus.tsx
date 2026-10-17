import { useEffect } from 'react';
import { actions, initProgressStore } from '../../lib/progress-store';
import { iconOf, isFlagged, statusOf } from '../../lib/progress';
import { useProgress } from './use-progress';
import StatusIcon, { ICON_LABEL } from './StatusIcon';

interface Props {
  num: string;
  nums: string[];
  variant: 'rail' | 'footer';
}

export default function LessonStatus({ num, nums, variant }: Props) {
  const { state } = useProgress(nums);
  useEffect(() => {
    if (variant !== 'rail') return;
    initProgressStore(nums);
    actions.markSeen(num);
  }, [num, variant]);

  const status = statusOf(state, num);
  const flagged = isFlagged(state, num);
  const doneButton = status === 'done'
    ? (
      <span className="done-state">
        <span className="done-badge">Đã học xong</span>
        <button type="button" className="btn-link" onClick={() => actions.toggleDone(num)}>Bỏ đánh dấu</button>
      </span>
    )
    : <button type="button" className="btn-done" onClick={() => actions.toggleDone(num)}>Đã học xong bài này</button>;
  const flagButton = (
    <button type="button" className="btn-flag" aria-pressed={flagged} onClick={() => actions.toggleFlag(num)}>
      {flagged ? 'Bỏ cờ' : 'Cắm cờ xem lại'}
    </button>
  );

  if (variant === 'rail') {
    return (
      <div className="rail-status">
        <p className="rail-title">Trạng thái bài</p>
        <p className="rail-state"><StatusIcon icon={iconOf(state, num)} /><strong>{ICON_LABEL[status]}</strong>{flagged && <span className="rail-flag">Cần xem lại</span>}</p>
        {status === 'seen' && <p className="rail-hint">Tự đánh dấu khi bạn mở bài.</p>}
        <div className="rail-actions">{doneButton}{flagButton}</div>
      </div>
    );
  }
  return (
    <div className="lesson-done">
      <div className="lesson-done-actions">{doneButton}{flagButton}</div>
      <p className="lesson-done-hint">Bấm khi bạn tự viết lại được câu lệnh mà không nhìn bài.</p>
    </div>
  );
}
