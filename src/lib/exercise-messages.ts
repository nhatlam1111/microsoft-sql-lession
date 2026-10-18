/** What the exercise page says, word for word as in spec B section 3. */
import type { FailureKind } from './exercise-types';

const UNREACHABLE = 'Không kết nối được máy chủ bài tập. Thử lại sau ít phút; nếu vẫn lỗi, nhắn người phụ trách khóa học.';
const MISSING = 'Bài tập này chưa có trên máy chủ bài tập. Nhắn người phụ trách khóa học.';

export const MESSAGES: Record<Exclude<FailureKind, 'blocked'>, string> = {
  'bad-code': 'Mã truy cập không đúng. Hỏi người phụ trách khóa học để lấy mã.',
  timeout: 'Câu lệnh chạy quá 10 giây nên đã dừng. Kiểm tra lại điều kiện lọc hoặc kết bảng.',
  quota: 'Phần chạy bài tập tạm nghỉ đến đầu tháng sau. Bài học vẫn đọc được bình thường.',
  unavailable: UNREACHABLE,
  network: UNREACHABLE,
  multi: 'Mỗi lần chỉ chạy một câu lệnh.',
  'too-big': 'Kết quả quá lớn để chấm, hãy lọc bớt.',
  rate: 'Bạn chạy hơi nhanh, chờ vài giây rồi thử lại.',
  'unknown-exercise': MISSING,
  'bad-request': MISSING,
};

export const WAITING = 'Đang khởi động database, lần đầu có thể mất tới 1 phút…';
export const ASK_CODE = 'Nhập mã truy cập để chạy bài tập';

export function verdictText(correct: boolean, reason: string | null): string {
  return correct ? 'Đúng rồi.' : `Chưa đúng: ${reason}`;
}
