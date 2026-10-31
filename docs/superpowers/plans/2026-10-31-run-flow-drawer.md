# Drawer sơ đồ ba phần Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Drawer của `RunFlow` có Đầu vào, Thực hiện, Kết quả, bảng soi cho bước lọc, lời mới cho bài 2.1–2.5.

**Architecture:** Logic nằm ở `src/lib/run-flow.ts`, `RunFlow.astro` chỉ dựng. Đầu vào suy từ bước trước; `input` và `checks` là trường tùy chọn, nên các bài chưa viết lại vẫn build được.

**Tech Stack:** Astro, Vitest, SQL Server chỉ `SELECT`.

**Spec:** `docs/superpowers/specs/2026-10-31-run-flow-drawer-design.md`

## Global Constraints

- Trường `excel` của frontmatter là của bài, phải giữ; chỉ bỏ `excel` trong `steps` của `RunFlow`.
- Không đổi thẻ sơ đồ, số dòng, `Result`, YAML bài tập, seed, API.
- Database chỉ `SELECT`. Commit trên `feat/lesson-2-5-null`, không push.

## Review Focus

- Bước đầu và hai nhánh `UNION` không có bảng đầu vào, không báo lỗi.
- Bước `UNION` hiện đủ hai nhánh.
- Bảng soi sai số liệu phải dừng build: tổng giữ khác số dòng, mã không có ở đầu vào, mã Giữ không có trong kết quả.
- Script bỏ `excel` không đổi trường nào khác của bước.
- Bước `ORDER BY` thấy được cột đang sắp ở Đầu vào.

## Task 1: Drawer và bảng soi

**Files:** `src/lib/run-flow.ts`, `src/components/lesson/RunFlow.astro`, `src/styles/lesson.css`, `tests/run-flow.test.ts`, `tests/components.test.ts`.

**Interfaces:**
- `FlowChecks { conditions: string[]; rows: [string, ...boolean[]][]; totals: number[] }`
- `FlowStep` thêm `input?: string`, `checks?: FlowChecks`, bỏ `excel`.
- `isUnionFlow(steps: FlowStep[]): boolean`, `inputSteps(steps: FlowStep[]): FlowStep[][]`, `excerptNote(p: Preview): string`, `checkKept(row: [string, ...boolean[]]): boolean`.

- [ ] Viết test: `inputSteps` trả `[[], [f0], …]`, luồng `UNION` trả `[[], [], [b0, b1], [u]]`; `excerptNote` cho "Trích 4 trong 48 dòng, 3 trong 12 cột" và chuỗi rỗng khi không trích; `checkFlow` báo bốn lỗi bảng soi; drawer có ba nhãn, không còn "Câu lệnh để xem dữ liệu ở bước này", "Ở bước này", "Liên hệ Excel".
- [ ] Chạy `npx vitest run tests/run-flow.test.ts tests/components.test.ts`, mong đợi FAIL.
- [ ] Làm `run-flow.ts`, `RunFlow.astro`, CSS.
- [ ] Chạy lại, mong đợi PASS.

## Task 2: Bỏ `excel` khỏi các bước

**Files:** 22 bài có `RunFlow`.

- [ ] Script chỉ xóa dòng `excel` trong khối `RunFlow`, đối chiếu mọi trường còn lại trước và sau bằng `node:vm`.
- [ ] Chạy `npx vitest run`, mong đợi PASS.
- [ ] Commit Task 1 và 2.

## Task 3: Lời mới và bảng soi 2.1–2.5

**Files:** `src/content/lessons/2-1` đến `2-5`, test nội dung các bài này.

- [ ] Chạy `SELECT` cho mọi số của bảng soi.
- [ ] Thêm test số liệu `checks` của 2.3 (`24`, `3`, `2`) và 2.5 (`10`, `45`, `8`).
- [ ] Viết `input`, `meaning`, `detail`, `checks` cho 17 bước; thêm `NV020` vào bước `FROM` của 2.2, `NV002` vào của 2.3; thêm `preview` cho bước `SELECT` của 2.4.
- [ ] Chạy `npx vitest run`, mong đợi PASS, rồi commit.

## Task 4: Quy ước, kiểm, review

**Files:** `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/reviews/2026-10-31-run-flow-drawer/`, spec, plan, memory.

- [ ] Sửa quy ước và khung bài trong cùng commit với phần áp dụng.
- [ ] `npm test`, `npm run check`, `npm run build`, `npm run check:dist`.
- [ ] Xem bản build ở rộng 1024 và 1440: 2.3, 2.5, một bài có `JOIN`, bài 3.8, bàn phím.
- [ ] Review tích hợp theo mục 4.5, xử lý theo mục 4.6, lưu hồ sơ, commit.
