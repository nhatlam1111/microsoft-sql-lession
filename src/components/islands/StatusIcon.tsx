import type { Icon } from '../../lib/progress';

export const ICON_LABEL: Record<Icon, string> = {
  todo: 'Chưa học',
  seen: 'Đã xem',
  done: 'Đã học',
  flag: 'Cần xem lại',
};

export default function StatusIcon({ icon }: { icon: Icon }) {
  return <span className={`st st-${icon}`} role="img" aria-label={ICON_LABEL[icon]} title={ICON_LABEL[icon]} />;
}
