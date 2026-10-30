# Bài 1.1: một câu chuyện từ hai bản Excel — Implementation Plan

> **For agentic workers:** dùng superpowers:executing-plans; tác giả thực hiện trong phiên (Native), một reviewer mới ở cuối theo mục 4.5 của quy ước. Steps dùng checkbox (`- [ ]`).

**Goal:** bài 1.1 bám chuyện của Quân từ đầu tới cuối, ba khái niệm chính đứng liền nhau, luật dữ liệu chỉ nêu ý chính.

**Architecture:** sửa một file MDX và hồ sơ công ty; dùng lại `Excel`, ba ảnh và mọi khối cuối bài. Test khóa thứ tự và phần đã rút trước khi sửa bài.

**Tech Stack:** Astro MDX, Vitest.

**Spec:** [2026-10-30-lesson-1-1-one-story-design.md](../specs/2026-10-30-lesson-1-1-one-story-design.md)

## Global Constraints

- Bốn tiểu mục: `Một lần chuyển phòng, hai bản khác nhau`, `Đưa hồ sơ về một nguồn chung`, `Đọc nguồn chung bằng SQL Server và SQL`, `Căn cứ để xác định bản đúng`.
- Hai hình Excel ba cột, ô `C4` được tô và chọn; `NV052`, `Trương Anh Quân`, `IT` và `Kinh doanh`.
- Giữ `minutes: 12`, frontmatter, ba ảnh, bốn câu ôn; không có khối `Sql`, `Result`, bảng Markdown.
- Phần giảng không dùng `khóa chính`, `khóa ngoại`, `ràng buộc`, `constraint`, `câu ghi` trước đoạn "Ở bài này chỉ cần…".
- Không commit, push hay deploy.

## Review Focus

- Người mới đọc tiêu đề "Từ hai bản Excel…": phải thấy đúng hai bản đó ngay tiểu mục đầu.
- Đoạn luật dữ liệu không được hứa database tự biết dữ liệu đúng.
- `Kinh doanh` trong hình và `KD` trong dữ liệu mẫu: lời văn không được khiến người đọc nghĩ `NV052` có trong bộ mẫu.
- Bài 1.2 và 1.3 vẫn có điểm tựa: database, SQL Server, T-SQL, bảng `NhanVien`.
- Câu ôn 3 trả lời được từ phần đã dạy, không cần tên khóa.

---

### Task 1: Khóa thứ tự bằng test rồi viết lại bài

**Files:**
- Modify: `tests/content.test.ts`
- Modify: `src/content/lessons/1-1-database-la-gi.mdx`
- Modify: `docs/ho-so-cong-ty.md`

**Interfaces:**
- Consumes: `lessonMainSection`, `sqlSubheadings`, `readLessonFiles` từ `tests/helpers/lessons.ts`.
- Produces: bài đã viết lại cho Task 2 và 3.

- [x] **Step 1: Sửa test cũ và thêm test thứ tự**

Test `1.1 scopes constraints…` đổi danh sách phải có thành `Khi luật đang bật`, `chỉ đọc dữ liệu`, `hợp lệ chưa chắc đã đúng`, `T-SQL`, `thống nhất chưa chắc đã đúng`. Bỏ `1-1-database-la-gi` khỏi test ngày căn phải. Thêm `describe('lesson 1.1 follows one story from two Excel copies to the answer (2026-10-30)')` kiểm: bốn tiêu đề; hai `<Excel` ở tiểu mục đầu, mỗi hình có `mark={['C4']}` và `NV052`, hình đầu `IT`, hình sau `Kinh doanh`; `**database**` trước `**SQL Server**` trước `**SQL**` trước `**luật dữ liệu**`; không có từ cấm trước `Ở bài này chỉ cần`; đoạn đó là đoạn cuối phần chính.

- [x] **Step 2: Chạy test, xác nhận hỏng đúng chỗ**

Run: `npx vitest run tests/content.test.ts`
Expected: test mới và test `1.1 scopes…` FAIL; test khác PASS.

- [x] **Step 3: Viết lại MDX và cập nhật hồ sơ công ty**

Theo mục cấu trúc, hình Excel, đoạn luật dữ liệu và phần sửa kèm trong spec. Hồ sơ công ty: dòng Quân ở mục 5 và dòng 1.1 ở mục 7 ghi dữ liệu minh họa.

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

Mở trang bài 1.1 ở 1280px và 1024px. Expected: hai hình Excel tô đúng ô, ba ảnh tải đúng, không tràn ngang, không lộ backtick, câu ôn 3 mở bằng bàn phím.

### Task 3: Review độc lập và đồng bộ tài liệu

**Files:**
- Create: `docs/reviews/2026-10-30-lesson-1-1-one-story/review.md`, `docs/reviews/2026-10-30-lesson-1-1-one-story/verification.md`
- Modify: spec và plan này; `tests/content.test.ts`, MDX nếu review có mục cần sửa

- [x] **Step 1: Giao reviewer mới**

Model Sonnet, effort high, chạy nền, đúng lời dặn mục 4.5; report ở `temp/review/2026-10-30-lesson-1-1-one-story/`; không đọc report cũ.

- [x] **Step 2: Xử lý từng nhận xét theo mục 4.6**

Đọc hết report, kiểm từng mục, ghi Làm theo / Làm một phần / Không làm theo cùng căn cứ; chạy lại Task 2 nếu có sửa.

- [x] **Step 3: Đồng bộ hồ sơ**

Lưu bản sao report, ghi kết quả thật và giới hạn vào spec, plan, `verification.md`.

## Kết quả

Hoàn tất cả ba task theo Native, thêm một lượt review tích hợp cho bài 1.1 và 1.3. Bản cuối đạt 329/329 test, check 0 lỗi/0 cảnh báo/3 hint nền, build 132 trang, dist 1998 liên kết; đã xem build ở 1280×800 và 1024×720. [Report và ma trận](../../reviews/2026-10-30-lesson-1-1-one-story/verification.md), [review tích hợp](../../reviews/2026-10-30-bai-1-1-1-3-tich-hop/verification.md). Không commit, push hay deploy.
