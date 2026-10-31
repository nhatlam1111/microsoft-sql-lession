import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parse as parseYaml } from 'yaml';
import { readLessonFiles } from './helpers/lessons';
import { lessonBlocks } from './helpers/lesson-blocks';

const exercises = (slug: string) =>
  (parseYaml(readFileSync(`src/content/exercises/${slug}.yaml`, 'utf8')) as { exercises: { id: string; prompt: string; columns: string[]; answer: string }[] }).exercises;

describe('fixes from the independent reviews of 2026-10-20', () => {
  const check = (slug: string, present: string[], absent: string[]) => {
    const f = readLessonFiles().find(x => x.slug === slug)!;
    // Knowledge checks should survive changing emphasis between bold and inline code.
    const plain = (s: string) => s.replace(/`|\*\*/g, '');
    const text = plain(JSON.stringify(f.data) + f.body);
    for (const s of absent) expect(text, `${slug} still says: ${s}`).not.toContain(plain(s));
    for (const s of present) expect(text, `${slug} lacks: ${s}`).toContain(plain(s));
  };

  it('2.1 preserves column selection, alias scope, source data and copying/grading limits in the shorter narrative', () => check('2-1-chon-cot-dat-ten-cot',
    ['ORDER BY', 'Copy with Headers', 'NV020', 'NV033', 'NV041', 'bài 6.1', 'không kiểm nghĩa',
      'không so tên tiêu đề', 'không phải chuỗi giá trị', 'kiểu dữ liệu không đổi', 'không được lưu thành tên mới', '48 hồ sơ',
      'không yêu cầu thứ tự dòng',
      'SELECT MaNV HoTen FROM NhanVien;', "SELECT 'HoTen' AS [Họ tên] FROM NhanVien;", '"1.3"'],
    ['giúp bảng nguồn thêm cột mà', 'hiện chưa kiểm tra tên tiêu đề', 'người nhận cần trường nào', 'Kể cả khi nhiều người có cùng ngày vào làm', 'NhanVien;: kết quả',
      'như `N\'Đang làm\'`, đã gặp ở bài 1.3', 'vì sao câu lệnh tiếp theo']));

  it('2.2 keeps the scenario scope, real figures and the Unicode/date prerequisites for its exercises', () => check('2-2-where-loc-nhu-autofilter',
    ['Đặt tiêu đề tiếng Việt', "Invalid column name 'Mã phòng'", 'yyyymmdd', 'date', 'chuyển kiểu ngầm',
      'năm–tháng–ngày', 'bài 2.7', 'rowNumbers={[1, 3, 4, 21]}', "preview: ['MaNV', 'MaPB', 'TrangThai']", '13 hồ sơ',
      'NULL', 'bài 2.5', '14 hồ sơ', 'chỉ giữ dòng khi điều kiện', '>=', "N'Đã nghỉ'", 'gồm ngày mốc', 'không đặt ngày kết thúc'],
    ['sau khi lọc MaPB = KD"', "WHERE MaPB = N'Kinh doanh'", 'SQL không tự suy ra yêu cầu đó từ tên phòng', 'WHERE giữ TRUE; FALSE',
      'Số dòng nhảy cóc vì', 'tương ứng mục **(Blanks)**']));

  it('2.2 filters only the current department code and keeps the real row totals and departed profile', () => {
    const lesson = lessonBlocks('2-2-where-loc-nhu-autofilter');
    expect(lesson.steps.map(step => [step.clause, step.total])).toEqual([['FROM', 48], ['WHERE', 14], ['SELECT', 14]]);
    expect(lesson.query).toMatch(/WHERE MaPB = 'KD';$/);
    expect(lesson.query).not.toMatch(/\bAND\b|\bOR\b|\bORDER BY\b/);
    expect(lesson.results).toHaveLength(1);
    expect(lesson.results[0].total).toBe(14);
    expect(lesson.results[0].columns).toEqual(['Mã nhân viên', 'Họ tên', 'Mã phòng', 'Trạng thái']);
    expect(lesson.results[0].rows).toContainEqual(['NV020', 'Kiều Thị Hạnh', 'KD', 'Đã nghỉ']);
    expect(lesson.steps.at(-1)?.columns).toEqual(lesson.results[0].columns);
    expect(lesson.body).not.toMatch(/FROM (?:PhongBan|HopDong)/);
  });

  it('2.1 exercise 4 cannot be passed by a query printed in the lesson', () => {
    const ex = exercises('2-1-chon-cot-dat-ten-cot');
    const fourth = ex.find(e => e.id === '2-1-4')!;
    expect(fourth.answer).toContain('ChucDanh');
    expect(fourth.columns).toEqual(['Chức danh', 'Mã chức danh']);
    expect(fourth.prompt).not.toContain('hiện chưa kiểm tra');
    expect(ex.find(e => e.id === '2-1-2')!.prompt).toContain('thiếu email');
    const lesson = readLessonFiles().find(f => f.slug === '2-1-chon-cot-dat-ten-cot')!.body;
    expect(lesson).not.toContain('FROM ChucDanh;');
  });
});
