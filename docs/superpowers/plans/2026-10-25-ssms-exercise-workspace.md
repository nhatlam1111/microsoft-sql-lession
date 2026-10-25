# SSMS Exercise Workspace Implementation Plan

> Implement with Superpowers subagent-driven-development and parallel independent domains; tests first. User has approved the design; do not ask again.

**Goal:** 63 exercise pages share a full-width SSMS-style workspace, safe table browsing and SQL completion.
**Architecture:** React workspace + CodeMirror6, static shared schema, additive authenticated API preview; existing transaction runner/grader retained.
**Tech:** Astro/React19/TypeScript/Vitest, CodeMirror6 MSSQL, Azure Functions/mssql.
**Spec:** docs/superpowers/specs/2026-10-25-ssms-exercise-workspace-design.md

## Global constraints

- Branch codex/ssms-exercise-workspace; local handoff only. No seed/answer/lesson/URL edits or production deployment.
- All Codex agents inherit session model (repository/user preference overrides skill model-routing defaults). No child agents or shared Git/index operations by implementers.
- Shared database only SELECT except existing always-rollback exercise runner. Never test transaction escape against live DB or print credentials.
- Preserve draft keys, empty/comment drafts and progress; schema/diagram visible without code; live data requires code.
- Every changed behavior gets a meaningful RED→GREEN check, UI browser verification and independent review.

## Tasks and ownership

- [x] **1 API/guard:** shared metadata preview, auth/rate/paging, shared lexical guard, dev route/options and fake regression tests. Reviewed independently; binary-literal boundary and malformed URL fixes re-reviewed.
- [x] **2 Editor:** CM6 MSSQL/schema completion, stable controlled state/history, accessible basic input, keyboard and dependency updates. Used fallback remains mounted to retain undo/IME; chunk/init failures have separate feedback. Component rendering is not described as interactive route SSR.
- [x] **3 Workspace:** full-width three-column docked UI, revision gate/async isolation, separate preview/results, pagination/auth/storage feedback and route loading fallback. Storage deletion and fallback findings tested and re-reviewed.
- [x] **4 Integrate/verify/review:** root reviewed diffs, ran fresh checks, live SELECT/preview comparison, 63 answers with rollback and checksum check, browser matrix and fresh integration review. Records below; local handoff only.

## Test gates / review focus

1. Transaction keywords, identifier injection, forged page and auth failures never call DB; literals/comments remain legal.
2. Execute result for old revision or failed/latest canceled action cannot unlock Submit; preview cannot replace run result or mark progress.
3. CodeMirror initialization/undo/IME/Tab/re-render retain text and cursor; fallback/storage failure preserve drafts; plain completion never leaks answers.
4. Preview first/last/empty/pages keyed by complete PK; table switch/cancel/rate/network failure and code change remain recoverable.
5. 1280/1440/1920 and short screens retain code/results/actions/diagram; completion and dialogs accessible, no keyboard trap or horizontal page overflow.

## Evidence

Base main19170bc; branch initially clean. Logs: temp/verification/2026-10-25-ssms-workspace/; independent reports: temp/review/2026-10-25-ssms-workspace/.

## Kết quả và hồ sơ ngày 25/10/2026

- [Nghiệm thu và ma trận xử lý](../../reviews/2026-10-25-ssms-workspace/verification.md) ghi đầy đủ phiên bản, giới hạn và cách review local; các report gốc được sao chép nguyên văn cùng thư mục.
- 392/392 tests; check 0 errors/0 warnings, 1 hint execCommand; build 117 pages; check:dist 2215 links. API build/typecheck đạt. Premium strict audit không có finding.
- Đối chiếu đủ bảy bảng bằng SELECT độc lập và preview phân trang theo toàn bộ PK; 63/63 đáp án qua runner luôn hoàn tác; check:data không bảng nào lệch.
- Browser kiểm 1280/1440/1920, màn thấp, bàn phím/completion/undo/draft, auth, bảng rộng/phân trang, modal và input dự phòng khi chunk lỗi/chậm. OS IME và lỗi storage/hạ tầng thật chưa được xác minh; fake tests bảo vệ các nhánh này.
- Tất cả finding có căn cứ đã được xử lý. UI-02 làm một phần: static disabled route fallback trước React, usable textarea sau React nếu CM lỗi; giữ client-only để tránh ghi đè draft/auth. Quyết định đầy đủ trong spec/UX-CONTRACT.
- Không đổi main, không push/deploy; frontend local 4330 và API local 7073 cùng source/build để người dùng review.
