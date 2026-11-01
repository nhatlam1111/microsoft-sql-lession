# Foundation Concepts Presentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thay bộ ôn bằng 18 slide giải thích khái niệm qua cùng ví dụ HRM.

**Architecture:** Giữ collection/routes/controller/layout hiện hành. Nội dung MDX và hình khái niệm có lời giải thích luôn hiện; hình giả định không có khóa tách khỏi sơ đồ schema thật.

**Tech Stack:** Astro/MDX, HTML/CSS, Vitest, asset hiện có; không dependency mới.

**Spec:** `docs/superpowers/specs/2026-11-01-foundation-concepts-presentation-design.md` (đã duyệt).

## Global Constraints

-18 slide,48 phút giảng+7 hỏi đáp, nguồn1.1/1.2/1.4/1.5; không bốn câu đố bắt buộc.
- Mỗi slide có hình,2–3 câu diễn giải luôn hiện và ghi chú nguồn/phút khớp.
- Giữ font/token/16:9/hai cửa sổ; không ghi tiến độ, không đổi50bài.
- Dữ liệu thật SELECT-only; hình thiếu PK/FK là giả định có điều kiện, không DDL/DML dùng chung.
- Không sửa bài đầy đủ/API; bàn giao local, chưa merge/push vòng mới.

## Review Focus

- Người quên bài cũ vẫn hiểu thuật ngữ trước ERD: kiểm thứ tự định nghĩa và lời diễn giải hiện.
- Hình thiếu khóa có thể bị nhận nhầm là DB thật: test caption giả định và điều kiện không luật khác.
- Không FK vẫn kết bảng, không PK chưa chắc trùng: test các giới hạn trên chính nội dung hiện.
- Bộ18slide không details: state test khung và browser Next/Previous/URL/snapshot.
- Hình nhiều nhãn/chữ xuống dòng: xem đủ18ở1280, mẫu dày1440/1920, đo tràn/footer.

### Task 1: Nội dung và hình khái niệm

**Files:** sửa `src/content/presentations/lam-quen.mdx`, `src/styles/presentation.css`; tạo `src/components/presentations/ConceptFigure.astro`; cập nhật `tests/presentation-content.test.ts`, `tests/presentation-outline.test.ts`, DESIGN và quy ước4.7.

**Interfaces:** dùng `Slide(id,title,source,minutes)`, `PresenterNotes(source,minutes)`, `ProjectionTable(caption,columns,rows,markRow?,markColumn?)`, `ProjectionRelation(tables,showLinks?)`. `ConceptFigure(kind)` tạo hình dữ liệu/luồng/giả định, không controller mới.

- [ ] Viết test18slide/48+7,0details,18notes, nguồn1.1/1.2/1.4/1.5, lý do/giới hạn khóa và bước đọc ERD.
- [ ] Chạy `npx vitest run tests/presentation-content.test.ts tests/presentation-outline.test.ts`; Expected: fail trên20slide cũ.
- [ ] Thay nội dung theo18hàng spec, dùng3asset khái niệm và HTML dữ liệu; CSS cùng token/chữ lớn.
- [ ] Chạy test trên cùng `tests/presentations.test.ts`; Expected: pass,catalog50bài,nguồn hợp lệ.
- [ ] Commit và ghi ledger.

### Task 2: Kiểm chứng, review, bàn giao

**Files:** `docs/reviews/2026-11-01-foundation-concepts/`, plan/spec; script/ảnh ở temp cùng lượt.

**Interfaces:** kiểm build `dist/bai-giang/lam-quen/{index.html,nguoi-giang/index.html}` khớp Task1. Không đổi protocol/controller.

- [ ] SELECT thật/metadata khóa/3hợp đồng/lookup phòng; ghi riêng giả định và giới hạn.
- [ ] npm test/check/build/check:dist,lint DESIGN,audit; Expected: đạt kiểm chính, ghi đúng hint/lỗi nền.
- [ ] Browser18slide,viewport,notes,sync/reload/noJS/progress/link/search; Expected: đủ nghĩa,không tràn,không đổi số bài.
- [ ] Review nội dung mới và tích hợp độc lập theo4.5; giữ model kế thừa,report gốc và ma trận.
- [ ] Tái kiểm sửa,cập nhật evidence/spec/plan,commit và bàn giao local.Không push.

## Ledger

Ruling: người dùng đã duyệt để triển khai; thực hiện native trong phiên, không hỏi lại quyền hoặc lựa chọn công cụ thường lệ. Dùng checkout/nhánh riêng hiện có theo chỉ dẫn desktop. Quy ước repo về model reviewer và xử lý mọi nhận xét có căn cứ thắng lựa chọn model/Minor chung của skill.

Pre-flight: Task2 đọc đúng MDX/ConceptFigure/CSS Task1; route/controller là owner cũ. Không đổi interface liên subsystem.

Task1: RED đã quan sát3test fail trên20slide cũ (tests-red.log); bộ18slide/hình/notes đã viết. Ruling: test hình phải nhận cả native figure có chú thích, không giới hạn component riêng — tiêu chí là hình có nội dung, không phải tên tag. Sau sửa test,14/14 test của3file liên quan đạt. Đang kiểm browser/build trước chốt nội dung.

Vòng review nội dung: đọc trọn report gốc trước khi sửa. Làm theo F1 (NULL do thiết kế cột, mẫu không NULL trên slide 13; đọc hai phía ở slide 16) và F2 (đọc bảng.cột tại slide 10). Test bảo vệ các tiền đề hiển thị, không tính notes thay lời giảng. Kiểm SELECT bổ sung xác nhận bốn cột khóa liên quan đều không nhận NULL; tổng bảy nhóm kiểm chỉ đọc đạt. Giữ layout và cỡ chữ; tái kiểm slide 8/9/10/13/16 sau rút lời.
