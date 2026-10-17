import { countDone } from '../../lib/progress';
import { useProgress } from './use-progress';

export default function TopProgress({ nums }: { nums: string[] }) {
  const { state } = useProgress(nums);
  const done = countDone(state, nums);
  const pct = nums.length ? Math.round((100 * done) / nums.length) : 0;
  return (
    <div className="top-progress" title={`Đã học ${done}/${nums.length} bài`}>
      <span className="top-progress-count">{done}/{nums.length}</span>
      <span className="top-progress-bar" aria-hidden="true"><span style={{ width: `${pct}%` }} /></span>
    </div>
  );
}
