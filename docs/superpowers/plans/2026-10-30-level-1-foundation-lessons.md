# Level 1: năm bài nền ngắn — Implementation Plan

> **For agentic workers:** dùng superpowers:executing-plans; tác giả thực hiện trong phiên (Native), reviewer mới theo mục 4.5 của quy ước. Steps dùng checkbox (`- [ ]`).

**Goal:** biến 1.1–1.5 thành năm bài nền ngắn, không tình huống, và chuyển hướng dẫn thực hành sang trang Giới thiệu.

**Architecture:** thêm cờ `noScenario` vào frontmatter, giữ `kind: full`; bài 1.1 mới làm mẫu ở đợt 1, bốn bài còn lại theo mẫu ở đợt 2. Nội dung chỉ dùng lại giá trị đã kiểm.

**Tech Stack:** Astro MDX, Vitest.

**Spec:** [2026-10-30-level-1-foundation-lessons-design.md](../specs/2026-10-30-level-1-foundation-lessons-design.md)

## Global Constraints

- Vẫn 51 bài; `kind: full`, `noExercises: true`, `noScenario: true`, `minutes: 7` cho 1.1–1.5.
- Bài nền: phần chính → Hay nhầm ở đâu (1–2 ý) → Ứng dụng (1–2 ý) → Ghi nhớ → tự kiểm tra (ít nhất ba câu); không `Tình huống`, `Chat`, `Key`.
- Độ dài 500–700 từ theo `proseParagraphs`, test chặn ở 800.
- Không có câu lệnh, số liệu hay bài tập mới; không đổi seed, API, component bài học.
- Không push, merge hay deploy.

## Review Focus

- Người chỉ dùng web đọc 1.1: phải biết nơi chọn thực hành và bài bắt đầu viết SQL.
- Bài tóm tắt và bài có tình huống: `lessonMainSection` vẫn trả đúng phần chính sau khi đổi helper.
- Bài 1.4 cũ trỏ "luật dữ liệu đã nói ở bài 1.1": bài mới phải còn cụm này.
- Link trỏ `#chon-noi-thuc-hanh` phải có đích ngay từ đợt 1.
- Đoạn luật dữ liệu rút ngắn vẫn không hứa database tự biết dữ liệu đúng.

---

## Đợt 1

### Task 1: Commit mốc và tạo nhánh

**Files:** toàn bộ thay đổi đang có.

- [ ] **Step 1: Commit bản hiện tại**

`git add -A`, xác nhận có `src/assets/lessons/1-3-database-table.png` và không có `.superpowers/`, commit trên `chore/add-teach-skills`.

- [ ] **Step 2: Tạo nhánh**

Run: `git switch -c feat/level-1-foundation-lessons`
Expected: đang ở nhánh mới, working tree sạch.

### Task 2: Đổi khung và viết bài 1.1 mới

**Files:**
- Modify: `src/lib/lesson-schema.ts`, `tests/helpers/lessons.ts`, `tests/content.test.ts`, `tests/docs.test.ts`
- Modify: `src/content/lessons/1-1-database-la-gi.mdx`, `src/pages/gioi-thieu.astro`
- Modify: `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, `AGENTS.md`, `CLAUDE.md`

**Interfaces:**
- Produces: `noScenario?: boolean` trong `lessonSchema`; `sectionHeadings(kind, noExercises = false, mainSectionTitle?, noScenario = false): string[]`; `lessonMainSection(body)` trả `sections[0]` khi bài không mở bằng `Tình huống` hoặc `Nội dung chính`.

- [ ] **Step 1: Viết test trước**

Trong `tests/content.test.ts`, thêm `describe('foundation lessons have no scenario and stay short (2026-10-30)')` chạy trên mọi bài có `noScenario`: không có `## Tình huống`, `<Chat`, `<Key`; tổng `proseParagraphs` không quá 800; ít nhất ba `<details>`; `minutes` là 7. Thêm test bài 1.1 có `noScenario` và nhắc đủ `database`, `SQL Server`, `SQL`, `SSMS`, `luật dữ liệu`, `hợp lệ chưa chắc đã đúng`, link `gioi-thieu/#chon-noi-thuc-hanh`. Thêm test `lessonMainSection` cho bài không tình huống và bài tóm tắt. Test `uses exactly the section headings` đọc `noScenario` để lấy đúng tiêu đề phần chính.

- [ ] **Step 2: Chạy test, xác nhận hỏng**

Run: `npx vitest run tests/content.test.ts`
Expected: test mới FAIL vì chưa có bài `noScenario`.

- [ ] **Step 3: Sửa schema và helper**

Theo Interfaces ở trên.

- [ ] **Step 4: Viết bài 1.1 mới và gắn đích link**

Theo mục Khung bài nền và Nội dung từng bài trong spec. `gioi-thieu.astro` thêm `id="chon-noi-thuc-hanh"` cho mục cùng tên.

- [ ] **Step 5: Bỏ test của bản 1.1 cũ, giữ ý còn dùng**

Bỏ `lesson 1.1 follows one story…`, phần `answers the opening request…`, kiểm `<Excel` của 1.1. Sửa `1.1 scopes the data rules…` còn `Khi luật đang bật`, `hợp lệ chưa chắc đã đúng`, `T-SQL`. Giữ `1.1 makes no promise…`. Giữ test 1.6 về số thứ tự dòng.

- [ ] **Step 6: Cập nhật tài liệu**

`quy-uoc.md`, `lesson-template.md` thêm dạng bài nền, đổi hai bài mẫu; `AGENTS.md`, `CLAUDE.md` theo đó; `tests/docs.test.ts` kiểm template nhắc cả `1-1-database-la-gi.mdx` và `2-2-where-loc-nhu-autofilter.mdx`; `ho-so-cong-ty.md` bỏ dòng 1.1, Quân, chị Thảo, `NV052`, sửa "Xuất hiện".

- [ ] **Step 7: Chạy lại toàn bộ kiểm tra**

Run: `npm test`, `npm run check`, `npm run build`, `npm run check:dist`
Expected: đạt hết.

- [ ] **Step 8: Commit**

Commit trên nhánh mới.

### Task 3: Review và dừng cho người làm khóa học đọc

**Files:** report ở `docs/reviews/2026-10-30-lesson-1-1-bai-nen/`.

- [ ] **Step 1: Xem bản build** ở 1280px và 1024px.
- [ ] **Step 2: Giao reviewer mới** (Sonnet, effort high) theo mục 4.5; đọc report, xử lý theo mục 4.6, ghi `verification.md`.
- [ ] **Step 3: Commit, dừng lại** chờ người làm khóa học chốt giọng văn.

## Đợt 2

Chỉ bắt đầu sau khi bài 1.1 được duyệt. Kế hoạch chi tiết của đợt này cập nhật theo góp ý ở đợt 1.

### Task 4: Viết 1.2, 1.3, 1.4, 1.5

**Files:** tạo `1-2-bang-dong-cot.mdx`, `1-3-kieu-du-lieu.mdx`; sửa `1-4-…`, `1-5-…`; xóa `1-2-sql-server-ssms-hrm-demo.mdx`, `1-3-bang-cot-kieu-du-lieu.mdx`; `tests/content.test.ts`.

- [ ] Đổi test của từng bài theo mục Thay đổi kỹ thuật trong spec, chạy cho hỏng, viết bài, chạy lại.

### Task 5: Trang Giới thiệu và các lời trỏ

**Files:** `src/pages/gioi-thieu.astro`, `src/components/islands/ExerciseWorkspace.tsx`, `src/content/lessons/1-6-cau-select-dau-tien.mdx`, `src/content/lessons/2-2-where-loc-nhu-autofilter.mdx`, `docs/ho-so-cong-ty.md`, `tests/content.test.ts`.

- [ ] Chuyển test quy trình kết nối sang đọc `gioi-thieu.astro`, chuyển nội dung, sửa lời trỏ, chạy lại.

### Task 6: Kiểm và review tích hợp

- [ ] Chạy đủ bốn kiểm tra, xem build, review độc lập từng bài, review tích hợp, xử lý theo mục 4.6, ghi hồ sơ, commit trên nhánh; không push.
