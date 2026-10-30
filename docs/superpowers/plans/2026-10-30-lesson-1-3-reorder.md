# Bài 1.3: sắp xếp lại mạch từ ô Excel đến kiểu cột — Implementation Plan

> **For agentic workers:** dùng superpowers:executing-plans; tác giả thực hiện trong phiên (Native), một reviewer mới ở cuối theo mục 4.5 của quy ước. Steps dùng checkbox (`- [ ]`).

**Goal:** phần chính bài 1.3 đi đúng tiêu đề, từ file Excel tới câu trả lời, không đứt mạch.

**Architecture:** chỉ sắp xếp lại và biên tập một file MDX; hình, component, dữ liệu và kết quả chuyển kiểu giữ nguyên. Test khóa thứ tự ý và phần đã rút trước khi sửa bài.

**Tech Stack:** Astro MDX, Vitest.

**Spec:** [2026-10-30-lesson-1-3-reorder-design.md](../specs/2026-10-30-lesson-1-3-reorder-design.md)

## Global Constraints

- Ba tiểu mục đúng tên: `Cùng một cột nhưng các ô đang khác kiểu`, `Trong database, mỗi cột có một kiểu`, `Đối chiếu từng ô để trả lời chị Hạnh`.
- Giữ nguyên props của `Excel`, `Ssms` và ảnh; giữ sáu ô, mọi giá trị và URL, `noExercises`, tổng năm câu ôn.
- Không thêm SQL, giá trị dữ liệu mới, đoạn quá 120 chữ hay câu hỏi trong lý thuyết.
- Giữ ý bài sau trỏ về: chuyển kiểu ngầm, `decimal(p,s)`, `N'…'`, chuỗi rỗng với `NOT NULL`, xem Columns, chọn kiểu theo ý nghĩa.
- Không commit, push hay deploy.

## Review Focus

- Người mới gặp `chuỗi` hoặc `Unicode` lần đầu ở bảng kiểu: phải có nghĩa tại chỗ.
- Bỏ khái niệm byte: dòng `varchar(n)` vẫn phải đúng nhờ điều kiện mã không dấu.
- Bỏ `char`, `time` khỏi bảng: người mở SSMS thấy kiểu lạ vẫn biết cách đọc.
- Thiết lập phiên chuyển khỏi Tình huống: đoạn `DATEFORMAT` phải tự đủ nghĩa.
- Bài trước và bài sau vẫn khớp: 1.1 trỏ "cách đọc chuỗi ngày" và 1.5 trỏ xem `NULL` về 1.3.

---

### Task 1: Khóa thứ tự bằng test rồi viết lại bài

**Files:**
- Modify: `tests/content.test.ts`
- Modify: `src/content/lessons/1-3-bang-cot-kieu-du-lieu.mdx`

**Interfaces:**
- Consumes: `lessonMainSection`, `sqlSubheadings`, `readLessonFiles` từ `tests/helpers/lessons.ts`.
- Produces: bài đã xếp lại cho Task 2 và 3.

- [x] **Step 1: Sửa test cũ và thêm test thứ tự**

Bỏ `'byte (đơn vị lưu trữ)'`, `'dấu cách ở cuối'` khỏi test `1.3 separates a rejected value…`. Thêm `describe('lesson 1.3 goes from the Excel cell to the column type (2026-10-30)')` kiểm: ba tiêu đề đúng thứ tự và không có chữ trước tiêu đề đầu; `<Excel` trước `<figure` trước `<Ssms`; `chuyển kiểu ngầm` chỉ xuất hiện sau tiêu đề thứ ba; `NgayVaoLam` kèm `không nhận` nằm trước bảng `Database làm gì`; lời đáp chị Hạnh sau bảng đó và sau `Kiểu dữ liệu chỉ kiểm được một phần`; `Ở bài này chỉ cần` là đoạn cuối phần chính; toàn bài không có `\bchar\(`, `time(0)`, `byte`.

- [x] **Step 2: Chạy test, xác nhận hỏng đúng chỗ**

Run: `npx vitest run tests/content.test.ts`
Expected: các test của describe mới FAIL vì bài chưa xếp lại; test khác PASS.

- [x] **Step 3: Viết lại MDX theo cấu trúc trong spec**

Áp dụng phần rút/thêm và sáu đề xuất biên tập; lời đáp chị Hạnh nêu ô bị từ chối, ô lưu được nhưng phải xác nhận và cách gửi lại.

- [x] **Step 4: Chạy lại test**

Run: `npx vitest run tests/content.test.ts`
Expected: PASS toàn bộ.

### Task 2: Kiểm bằng máy và bản build

**Files:**
- Test: toàn bộ bộ test, bản build `dist/`

- [x] **Step 1: Chạy tuần tự bốn kiểm tra**

Run: `npm test`, `npm run check`, `npm run build`, `npm run check:dist`
Expected: test đạt hết; check 0 lỗi; build và `check:dist` đạt.

- [x] **Step 2: Xem bản build**

Mở trang bài 1.3 trên bản build ở desktop và khổ hẹp. Expected: hình bảng đứng sau hình Excel, cả hai hình tải đúng, không tràn ngang, không lộ backtick, câu ôn 1 hiện đúng nhãn và mở bằng bàn phím.

### Task 3: Review độc lập và đồng bộ tài liệu

**Files:**
- Create: `docs/reviews/2026-10-30-lesson-1-3-reorder/review.md`, `docs/reviews/2026-10-30-lesson-1-3-reorder/verification.md`
- Modify: spec và plan này; `tests/content.test.ts`, MDX nếu review có mục cần sửa

- [x] **Step 1: Giao reviewer mới**

Model Sonnet, effort high, chạy nền, đúng lời dặn mục 4.5; report ở `temp/review/2026-10-30-lesson-1-3-reorder/`; không đọc report cũ.

- [x] **Step 2: Xử lý từng nhận xét theo mục 4.6**

Đọc hết report, kiểm từng mục, ghi Làm theo / Làm một phần / Không làm theo cùng căn cứ; chạy lại Task 2 nếu có sửa.

- [x] **Step 3: Đồng bộ hồ sơ**

Lưu bản sao report, ghi kết quả thật và giới hạn vào spec, plan, `verification.md`.

## Kết quả

Hoàn tất cả ba task theo Native. Sau review, bản cuối đạt 326/326 test, check 0 lỗi/0 cảnh báo/3 hint nền, build 132 trang, dist 1998 liên kết; đã xem build ở 1280×800 (trước khi sửa theo review) và 1024×720 (bản cuối). [Report và ma trận](../../reviews/2026-10-30-lesson-1-3-reorder/verification.md) ghi đủ quyết định, hai sai khác so với thiết kế và giới hạn. Không commit, push hay deploy.
