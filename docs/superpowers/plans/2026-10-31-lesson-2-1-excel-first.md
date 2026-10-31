# Bài 2.1 đi từ Excel sang SQL — Implementation Plan

> **For agentic workers:** dùng superpowers:executing-plans; tác giả thực hiện trong phiên (Native), theo quy trình repo ở `docs/lesson-template.md`.

**Goal:** sắp lại phần chính của bài 2.1 để mỗi khái niệm SQL đứng sau việc tương ứng trong Excel, người học chỉ chạy một lần ở mục câu lệnh.

**Architecture:** chỉ đổi file bài và test của nó; bài tập, slug, trang Giới thiệu giữ nguyên.

**Tech Stack:** Astro MDX, Vitest.

**Spec:** [thiết kế đã duyệt](../specs/2026-10-31-lesson-2-1-excel-first-design.md)

## Global Constraints

- Lời văn theo `docs/quy-uoc.md`, bài mẫu 2.2. Mục áp dụng tên là "Ứng dụng", không nhắc vai trò người đọc.
- Database dùng chung: MCP chỉ `SELECT`. Giá trị in trong bài lấy từ database thật.
- Nhánh `feat/lesson-2-1-excel-first`; không push khi chưa được đồng ý.

## Review Focus

1. Câu lệnh xuất hiện trước hình Excel đầu tiên; test `2.1 leads from Excel to SQL like the lessons after it`.
2. Người học tới bài tập mà chưa biết bấm chạy ở đâu; cùng test, kiểm mục câu lệnh có `Chạy (F5)`, Results, Messages.
3. Dạy lỗi ở Messages trước khi giải thích tab Messages; cùng test, `Invalid column name` nằm sau mục câu lệnh.
4. `TOP` thành câu chạy được hoặc có kết quả kèm theo; cùng test, chỉ một `Result`, một `Messages`, khối `TOP` có `copy={false}`.
5. Mất kiến thức khi sắp lại; các test hiện có của bài 2.1 giữ nguyên, trừ chỗ đổi `5` thành `48`.

---

### Task 1: Thiết kế và kế hoạch

- [x] Đổi trạng thái spec thành đã duyệt, commit spec và plan: `docs: design the Excel-first lesson 2.1`.

### Task 2: Sắp lại bài 2.1

**Files:**
- Modify: `src/content/lessons/2-1-chon-cot-dat-ten-cot.mdx`
- Test: `tests/content.test.ts`

- [x] **Bước 1: thêm test.**

```ts
it('2.1 leads from Excel to SQL like the lessons after it', () => {
  const b = body('2-1-chon-cot-dat-ten-cot');
  const main = lessonMainSection(b);
  const [first, second, third] = main.split(/^### /m).slice(1);
  expect(sqlSubheadings(b)).toHaveLength(4);
  for (const part of [first, second]) {
    expect(part).toMatch(/^Từ .+\r?\n\r?\nTrong Excel, /);
    expect(part.indexOf('<Excel')).toBeLessThan(part.indexOf('Trong SQL'));
  }
  expect(main.indexOf('<Excel')).toBeLessThan(main.indexOf('<Sql'));
  expect(main.match(/<Result\b/g)).toHaveLength(1);
  expect(main.match(/<Messages\b/g)).toHaveLength(1);
  expect(first).toMatch(/<Sql copy=\{false\}[^>]*code=\{`SELECT TOP \(5\) \*/);
  for (const s of ['Chạy (F5)', 'Results', 'Messages', "Invalid column name 'TenNV'"]) expect(third, s).toContain(s);
  for (const part of [first, second]) expect(part).not.toContain('Invalid column name');
});
```

Test `2.1 calls the run order logical…` đổi `không phải 5 dòng đã bị sửa` thành ``không phải `48` dòng đã bị sửa``.

- [x] **Bước 2:** `npm test`, xác nhận test mới FAIL.
- [x] **Bước 3:** viết lại theo mục Phần chính mới của spec, sửa `goal`, `summary`, `Key`. Đoạn tên cột chuyển lên tiểu mục đầu; lỗi `TenNV` chuyển vào ý Messages; bỏ ý `NULL` ở ý Results vì câu cuối không có ô `NULL`.
- [x] **Bước 4:** `npm test`, toàn bộ PASS.
- [x] **Bước 5:** commit `docs: lead lesson 2.1 from Excel to SQL`.

### Task 3: Kiểm chứng, review, hồ sơ

- [x] Đối chiếu hình Excel mới bằng MCP `SELECT` (`NgaySinh`, `Email`, `NgayVaoLam` của `NV001` đến `NV003`).
- [x] `npm run check`, `npm run build`, `npm run check:dist`; xem build ở 1280×800 và 1024×720.
- [x] Một review độc lập bằng Claude Sonnet, effort high, theo mục 4.5.
- [x] Xử lý theo mục 4.6, ghi `docs/reviews/2026-10-31-bai-2-1-excel-truoc/`; cập nhật spec, plan, memory; commit trên nhánh, không push.

## Kết quả

Hoàn tất theo Native. Review độc lập xử lý ở commit sau. [Hồ sơ xử lý](../../reviews/2026-10-31-bai-2-1-excel-truoc/verification.md). Commit trên nhánh `feat/lesson-2-1-excel-first`, không push.
