# Foundation Concepts Presentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thay bộ ôn bằng 18 slide giải thích khái niệm qua cùng ví dụ HRM.

**Architecture:** Giữ collection/routes/controller/layout hiện hành. Nội dung MDX và hình khái niệm có lời giải thích luôn hiện; hình giả định không có khóa tách khỏi sơ đồ schema thật.

**Tech Stack:** Astro/MDX, HTML/CSS, Vitest, asset hiện có; không dependency mới.

**Spec:** `docs/superpowers/specs/2026-11-01-foundation-concepts-presentation-design.md` (đã duyệt).

## Global Constraints

- 18 slide, 48 phút giảng + 7 hỏi đáp, nguồn 1.1/1.2/1.4/1.5; không bốn câu đố bắt buộc.
- Mỗi slide có hình, 2–3 câu diễn giải luôn hiện và ghi chú nguồn/phút khớp.
- Giữ font/token/16:9/hai cửa sổ; không ghi tiến độ, không đổi 50 bài.
- Dữ liệu thật SELECT-only; hình thiếu PK/FK là giả định có điều kiện, không DDL/DML dùng chung.
- Không sửa bài đầy đủ/API; bàn giao local, chưa merge/push vòng mới.

## Review Focus

- Người quên bài cũ vẫn hiểu thuật ngữ trước ERD: kiểm thứ tự định nghĩa và lời diễn giải hiện.
- Hình thiếu khóa có thể bị nhận nhầm là DB thật: test caption giả định và điều kiện không luật khác.
- Không FK vẫn kết bảng, không PK chưa chắc trùng: test các giới hạn trên chính nội dung hiện.
- Bộ 18 slide không details: state test khung và browser Next/Previous/URL/snapshot.
- Hình nhiều nhãn/chữ xuống dòng: xem đủ 18 ở 1280, mẫu dày 1440/1920, đo tràn/footer.

### Task 1: Nội dung và hình khái niệm

**Files:** sửa `src/content/presentations/lam-quen.mdx`, `src/styles/presentation.css`; tạo `src/components/presentations/ConceptFigure.astro`; cập nhật `tests/presentation-content.test.ts`, `tests/presentation-outline.test.ts`, DESIGN và quy ước4.7.

**Interfaces:** dùng `Slide(id,title,source,minutes)`, `PresenterNotes(source,minutes)`, `ProjectionTable(caption,columns,rows,markRow?,markColumn?)`, `ProjectionRelation(tables,showLinks?)`. `ConceptFigure(kind)` tạo hình dữ liệu/luồng/giả định, không controller mới.

- [x] Viết test 18 slide/48+7, 0 details, 18 notes, nguồn 1.1/1.2/1.4/1.5, lý do/giới hạn khóa và bước đọc ERD.
- [x] Chạy `npx vitest run tests/presentation-content.test.ts tests/presentation-outline.test.ts`; quan sát fail trên 20 slide cũ.
- [x] Thay nội dung theo 18 hàng spec, dùng 3 asset khái niệm và HTML dữ liệu; CSS cùng token/chữ lớn.
- [x] Chạy test trên cùng `tests/presentations.test.ts`; đạt, catalog 50 bài, nguồn hợp lệ.
- [x] Commit và ghi ledger.

### Task 2: Kiểm chứng, review, bàn giao

**Files:** `docs/reviews/2026-11-01-foundation-concepts/`, plan/spec; script/ảnh ở temp cùng lượt.

**Interfaces:** kiểm build `dist/bai-giang/lam-quen/{index.html,nguoi-giang/index.html}` khớp Task1. Không đổi protocol/controller.

- [x] SELECT thật/metadata khóa/3 hợp đồng/lookup phòng; ghi riêng giả định và giới hạn.
- [x] npm test/check/build/check:dist, lint DESIGN, audit; đạt kiểm chính, ghi đúng hint/lỗi tĩnh nền.
- [x] Browser 18 slide, viewport, notes, sync/reload/no-JS/progress/link/search; đủ nghĩa, không tràn, không đổi số bài. Giới hạn native fullscreen/popup ghi rõ trong verification.
- [x] Review nội dung mới và tích hợp độc lập theo 4.5; giữ model kế thừa, report gốc và ma trận.
- [x] Tái kiểm sửa, cập nhật evidence/spec/plan, commit và bàn giao local. Không push.

## Ledger

Ruling: người dùng đã duyệt để triển khai; thực hiện native trong phiên, không hỏi lại quyền hoặc lựa chọn công cụ thường lệ. Dùng checkout/nhánh riêng hiện có theo chỉ dẫn desktop. Quy ước repo về model reviewer và xử lý mọi nhận xét có căn cứ thắng lựa chọn model/Minor chung của skill.

Pre-flight: Task2 đọc đúng MDX/ConceptFigure/CSS Task1; route/controller là owner cũ. Không đổi interface liên subsystem.

Task 1: RED đã quan sát 3 test fail trên 20 slide cũ (tests-red.log); bộ 18 slide/hình/notes đã viết. Ruling: test hình phải nhận cả native figure có chú thích, không giới hạn component riêng — tiêu chí là hình có nội dung, không phải tên tag. Sau sửa test, 14/14 test của 3 file liên quan đạt. Commit triển khai đầu `120b727`, sửa review nội dung `9c34115`.

Vòng review nội dung: đọc trọn report gốc trước khi sửa. Làm theo F1 (NULL do thiết kế cột, mẫu không NULL trên slide 13; đọc hai phía ở slide 16) và F2 (đọc bảng.cột tại slide 10). Test bảo vệ các tiền đề hiển thị, không tính notes thay lời giảng. Kiểm SELECT bổ sung xác nhận bốn cột khóa liên quan đều không nhận NULL; tổng bảy nhóm kiểm chỉ đọc đạt. Giữ layout và cỡ chữ; tái kiểm slide 8/9/10/13/16 sau rút lời.

Vòng tích hợp: đọc hết report rồi xử lý I1 (bỏ chỉ dẫn no-JS về đáp án không có), I2 (phân bổ 48 + 7 ngay slide mở đầu). Assertion mới về phân bổ hiện ở đầu thất bại trước sửa rồi đạt. Ghi đúng audit error nền và mọi cân nhắc/giới hạn vào ma trận. Không thêm cú pháp, bài tập hoặc cơ chế tương thích cũ.

Chốt Task 2: 410/410 test, check 245 file 0 lỗi/0 warning/3 hint có sẵn, build 139 trang lúc 17:20:35, check:dist 2771 liên kết đạt. Browser kiểm đủ 18 slide ở 1280×800; mẫu dày 1440/1920; khung cuối slide 1 còn khoảng trống trước footer. Progress trước/sau vẫn 0/50 và resume 1.1; tìm kiếm/nguồn/copy link đúng. Fallback dùng fixture local, không đổi security. Report/evidence/manifest ở `docs/reviews/2026-11-01-foundation-concepts/`; bàn giao hai URL local. Nhánh chưa merge/push.
