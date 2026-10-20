import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parse as parseYaml } from 'yaml';
import { readLessonFiles } from './helpers/lessons';

const exercises = (slug: string) =>
  (parseYaml(readFileSync(`src/content/exercises/${slug}.yaml`, 'utf8')) as { exercises: { id: string; prompt: string; columns: string[]; answer: string }[] }).exercises;

describe('fixes from the independent reviews of 2026-10-20', () => {
  const check = (slug: string, present: string[], absent: string[]) => {
    const f = readLessonFiles().find(x => x.slug === slug)!;
    const text = JSON.stringify(f.data) + f.body;
    for (const s of absent) expect(text, `${slug} still says: ${s}`).not.toContain(s);
    for (const s of present) expect(text, `${slug} lacks: ${s}`).toContain(s);
  };

  it('2.1 says where an alias can be used, why brackets need no N, how to copy the headers out, and what the grader checks', () => check('2-1-chon-cot-dat-ten-cot',
    ["Invalid column name 'Họ tên'", 'ORDER BY', 'sysname', 'Copy with Headers', "Incorrect syntax near 'ban'", "Invalid column name 'TenNV'", '(No column name)',
      "AS 'Họ tên'", 'BangLuong AS bl', 'NV020, NV033, NV041', 'KD lặp lại 14 lần', 'bài 6.1', 'bài 4.5', 'Power Query', 'không kiểm nghĩa', 'Nói gọn lại',
      'không so tên tiêu đề', 'quy ước của khóa học', '"1.3"'],
    ['giúp bảng nguồn thêm cột mà', 'hiện chưa kiểm tra tên tiêu đề', 'người nhận cần trường nào', 'Kể cả khi nhiều người có cùng ngày vào làm', 'NhanVien;: kết quả',
      'như `N\'Đang làm\'`, đã gặp ở bài 1.3', 'vì sao câu lệnh tiếp theo']));

  it('2.1 exercise 3 cannot be passed by a query printed in the lesson', () => {
    const ex = exercises('2-1-chon-cot-dat-ten-cot');
    const third = ex.find(e => e.id === '2-1-3')!;
    expect(third.answer).toContain('ChucDanh');
    expect(third.columns).toEqual(['Chức danh', 'Mã chức danh']);
    expect(third.prompt).not.toContain('hiện chưa kiểm tra');
    expect(ex.find(e => e.id === '2-1-1')!.prompt).toContain('thiếu email');
    const lesson = readLessonFiles().find(f => f.slug === '2-1-chon-cot-dat-ten-cot')!.body;
    expect(lesson).not.toContain('FROM ChucDanh;');
  });
});
