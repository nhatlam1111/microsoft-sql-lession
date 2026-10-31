import { it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { parse } from 'yaml';
import { readLessonFiles } from './helpers/lessons';

const lesson = () => readLessonFiles().find(f => f.slug === '2-9-case-when-ham-if')!.body;
const literal = (s: string) => JSON.parse(JSON.stringify(runInNewContext(`(${s})`)));
const labels = ['Dưới 1 năm', 'Từ 1 đến dưới 3 năm', 'Từ 3 năm trở lên'];

// These are source-fixture checks of the displayed lesson data, not a T-SQL interpreter.
// Removing the active filter, computing before filtering, or mislabelling a profile must fail.
it('2.9 filters current active profiles before computing the anniversary groups', () => {
  const body = lesson();
  const flow = body.match(/<RunFlow query=\{`([\s\S]*?)`\} steps=\{([\s\S]*?)\} \/>/);
  expect(flow).not.toBeNull();
  const steps = literal(flow![2]);
  expect(steps.map((s: { clause: string; total: number }) => [s.clause, s.total])).toEqual([
    ['FROM', 48], ['WHERE', 45], ['SELECT', 45], ['ORDER BY', 45],
  ]);
  for (const step of steps.slice(0, 2)) {
    expect(step.columns).toEqual(['MaNV', 'HoTen', 'GioiTinh', 'NgaySinh', 'SoCCCD', 'Email', 'NgayVaoLam', 'NgayNghiViec', 'MaPB', 'MaCD', 'MaQuanLy', 'TrangThai']);
  }
  expect(steps[0].rows.filter((r: string[]) => r[11] === 'Đã nghỉ').map((r: string[]) => r[0])).toEqual(['NV020', 'NV033', 'NV041']);
  expect(steps[1].rows.every((r: string[]) => r[11] === 'Đang làm' && r[6] <= '2026-10-21')).toBe(true);
  expect(steps[1].rows.map((r: string[]) => r[0])).toEqual(['NV001', 'NV003', 'NV025', 'NV044', 'NV045', 'NV047', 'NV048']);
  const expected = [
    ['NV001', 'Trần Thị Mai', '2024-03-01', labels[1]],
    ['NV002', 'Lê Văn Hùng', '2024-04-01', labels[1]],
    ['NV003', 'Nguyễn Thu Hà', '2023-06-01', labels[2]],
    ['NV004', 'Hoàng Minh Tuấn', '2015-01-05', labels[2]],
    ['NV005', 'Vũ Thị Lan', '2016-03-14', labels[2]],
    ['NV006', 'Đặng Quốc Bảo', '2016-08-01', labels[2]],
    ['NV007', 'Bùi Thanh Sơn', '2017-02-13', labels[2]],
    ['NV008', 'Phan Văn Lợi', '2015-09-01', labels[2]],
    ['NV009', 'Ngô Thị Thu Trang', '2019-05-06', labels[2]],
    ['NV010', 'Đỗ Thị Hồng', '2016-06-01', labels[2]],
  ];
  expect(steps[2].rows).toEqual([expected[0], expected[2],
    ['NV025', 'Huỳnh Văn Tài', '2023-11-01', labels[1]],
    ['NV044', 'Lã Thị Oanh', '2025-08-04', labels[1]],
    ['NV045', 'Ung Văn Lực', '2026-07-01', labels[0]],
    ['NV047', 'Phạm Ngọc Ánh', '2026-10-01', labels[0]],
    ['NV048', 'Đỗ Minh Quân', '2026-10-05', labels[0]],
  ]);
  expect(steps[3].rows).toEqual(expected);
  const results = [...body.matchAll(/<Result columns=\{(\[[\s\S]*?\])\} rows=\{(\[[\s\S]*?\])\}[^>]*\/>/g)];
  expect(results.some(m => JSON.stringify(literal(m[2])) === JSON.stringify(expected) && /total=\{45\}/.test(m[0]))).toBe(true);
  // The overlapping scalar conditions must test the three-year anniversary first.
  const query = flow![1].replace(/\s+/g, ' ');
  expect(query).toMatch(/WHEN DATEADD\(year, 3, NgayVaoLam\) <= '20261021' THEN N'Từ 3 năm trở lên'.*WHEN DATEADD\(year, 1, NgayVaoLam\) <= '20261021' THEN N'Từ 1 đến dưới 3 năm'.*ELSE N'Dưới 1 năm'/);
  expect(query).toMatch(/WHERE TrangThai = N'Đang làm' AND NgayVaoLam <= '20261021'/);
  expect(query).toMatch(/ORDER BY MaNV ASC;/);
  expect(query).not.toMatch(/\bDATEDIFF\b|\bTOP\b/);
});

it('2.9 keeps the three distinct exercise scopes, column order and ordered grading', () => {
  const path = 'src/content/exercises/2-9-case-when-ham-if.yaml';
  expect(existsSync(path)).toBe(true);
  const file = parse(readFileSync(path, 'utf8'));
  expect(file.exercises.map((e: { id: string; kind: string; ordered: boolean; columns: string[] }) => [e.id, e.kind, e.ordered, e.columns])).toEqual([
    ['2-9-1', 'query', true, ['MaNV', 'NgayVaoLam', 'MocMotNam']],
    ['2-9-2', 'query', true, ['MaNV', 'TrangThai', 'NgayVaoLam', 'NhomThamNien']],
    ['2-9-3', 'query', true, ['MaNV', 'NgayVaoLam', 'MocBaNam']],
  ]);
  const [first, second, third] = file.exercises.map((e: { answer: string }) => e.answer);
  expect(first).toMatch(/MaPB = 'IT'/);
  expect(first).toContain("N'Đã đủ 1 năm'");
  expect(first).toContain("N'Chưa đủ 1 năm'");
  expect(second).toMatch(/MaPB = 'KD'/);
  expect(second).not.toMatch(/WHERE[^;]*TrangThai =/);
  for (const label of labels) expect(second).toContain(`N'${label}'`);
  expect(third).toMatch(/MaPB = 'NS'/);
  expect(third).toContain("N'Đủ 3 năm'");
  expect(third).not.toMatch(/\bELSE\b/);
  for (const [index, answer] of [first, second, third].entries()) {
    expect(answer).toContain(`NgayVaoLam <= '${index === 1 ? '20260814' : '20261021'}'`);
    expect(answer).toMatch(/ORDER BY MaNV ASC;/);
    expect(answer).not.toMatch(/\bDATEDIFF\b/);
    expect(lesson().replace(/\s+/g, ' ')).not.toContain(answer.replace(/\s+/g, ' ').trim());
  }
});

