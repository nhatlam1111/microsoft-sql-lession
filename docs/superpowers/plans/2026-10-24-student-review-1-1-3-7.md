# Cải thiện bài 1.1–3.7 — Implementation Plan

> **For agentic workers:** dùng superpowers:executing-plans để triển khai; review từng bài theo AGENTS.md và quy ước, kế thừa model Codex.

**Goal:** sửa các vướng mắc học viên có căn cứ, giữ lộ trình và dữ liệu đã duyệt.

**Architecture:** sửa nội dung MDX tại chỗ; editor chung dùng placeholder và giữ mọi nháp. Không đổi API/schema/seed/bài tập. Theo [spec](../specs/2026-10-24-student-review-1-1-3-7-design.md).

**Tech Stack:** Astro/MDX, React/TypeScript, Vitest, SQL Server/Azure SQL.

## Global Constraints

51 bài, 54 bài tập, URL/schema/seed/API/xác thực hiện có; dữ liệu chung SELECT-only, kiểm đáp án qua runner luôn rollback rồi check:data; SQL tab 4 cột. Nhánh `codex/student-review-1-1-3-7`, baseline `df7e810`; bàn giao local.

## Review Focus

- Người chỉ dùng web không bị bắt buộc hoàn thành kết nối SSMS ở 1.2.
- Hướng dẫn placeholder không trở thành SQL; mọi nháp rỗng/comment/nhiều dòng được giữ.
- Rút bài không làm mất giả định/giới hạn hoặc kiến thức cần cho 54 bài tập.
- Dữ liệu minh họa, Result, số tổng, thẻ và drawer không bị coi là cùng một phạm vi hiển thị.
- Định nghĩa lần đầu đủ nghĩa; Hay nhầm không thành chỗ dạy kiến thức mới.

## Task 1: Đường thực hành, editor và chương 1

- [x] Đọc report/prompt, kiểm nguồn, ghi spec và baseline 277/277.
- [x] Viết/run test editor RED: ô mới rỗng, placeholder ở ngoài SQL; giữ nháp và storage bị chặn.
- [x] Sửa editor/intro/1.1–1.6; cập nhật quy ước, template và các assertion thay bằng ý nghĩa.
- [x] Chạy kiểm liên quan, build và review độc lập sáu bài, xác minh/sửa findings.

## Task 2: Chương 2

- [x] Sửa 2.2–2.9 theo spec, giữ 2.1; bổ sung tự kiểm 2.3/2.7/2.8 và vị trí tự kiểm.
- [x] Cập nhật bảo vệ kiến thức/số liệu và chạy kiểm liên quan.
- [x] Review độc lập từng bài đã sửa, đọc đủ và xử lý findings.

## Task 3: Chương 3

- [x] Sửa 3.1–3.7 theo spec, bảo toàn SQL/Result trừ câu COUNT mới 3.2; di chuyển tự kiểm.
- [x] Kiểm SELECT mới/đang giữ, bảng quan hệ và thống nhất SQL/RunFlow.
- [x] Review độc lập từng bài và xử lý findings.

## Task 4: Xác minh và bàn giao

- [x] Hoàn thiện ma trận từng nhận xét với quyết định, dẫn chứng, Đã sửa/Không làm theo.
- [x] npm test, check, build, check:dist; API build, typecheck, check:exercises, check:data.
- [ ] Browser 1280/1440, highlight/whitespace/drawer/selfcheck và editor (fresh/saved/storageblocked/Tab/undo/paste/F5/auth).
- [ ] Review tích hợp, xử lý nhận xét, chạy lại kiểm bị ảnh hưởng.
- [ ] Ghi đúng kết quả/giới hạn; commit local và bàn giao link review, ảnh, đường dẫn bản local; không push.

## Evidence và tiến độ

- Baseline 24/10/2026: 39 file test, 277/277 PASS; npm chỉ nhắc có phiên bản mới, không cập nhật.
- Các lệnh/evidence mới và quyết định được cập nhật dưới đây sau từng vòng, không ghi trước thành đã đạt.
- Vòng tác giả: editor RED 2 fail/4 pass → GREEN 6/6; kiểm vị trí tự kiểm RED 7 fail/4 pass → GREEN 11/11. Suite sau nội dung 294/294, 41 file.
- Xác minh live: 78 SELECT duy nhất, 38 khối Sql, 36 Result, 68 bước RunFlow và các điều kiện chuyển kiểu/ngày. Năm đoạn ghi/trích không chạy trực tiếp. Verifier từng lỗi parser ở Result có mark; sửa verifier và chạy lại đạt, không phải lỗi SQL.
- API build/typecheck PASS; 54/54 đáp án chạy qua runner luôn hoàn tác; check:data không bảng nào lệch.
- Review chương 1 đủ sáu bài, đã đọc và xử lý toàn bộ findings có căn cứ. Chương 2 đã nhận/đọc 2.2–2.6; 2.4/2.6 không có finding cần sửa. Bài 2.7 từng dừng vì quota, đã tiếp tục chính agent đó sau khi khả dụng; không thay reviewer/model.
- Review 2.3 xác nhận lỗi nháy cong trên HTML; mở rộng check:dist bắt lỗi này (RED trên 5 code span ở 2.3/2.7), chuyển chuỗi JSX rồi build/check:dist GREEN. Thêm test helper RED → GREEN; suite 295/295. Build 108 trang, check:dist 1.742 link.
- Astro check: 0 errors/0 warnings, 4 hints; 3 hint deprecated đã có ở FormEvent/execCommand, 1 hint tham số không dùng của script evidence. Ghi riêng khi bàn giao; không coi hint là lỗi nội dung.
- 25/10: đủ 21 review từng bài, đã đọc và xác minh/sửa. Giữ answer YAML ở 2.9/3.1 theo phạm vi người dùng; ghi rõ hai ghi nhận định dạng nguồn, không đổi nội dung đáp án. Hồ sơ và bảng xử lý ở README review.
- Vòng cuối tác giả: 295/295 test; build108/check:dist1742 PASS; Astro check161 file, 0 errors/0 warnings/3 hints deprecated đã có. 79 SELECT xác nhận SQL/Result/RunFlow, gồm UPPER(NULL)/LOWER(NULL); check:data sau UI vẫn không bảng nào lệch.
- UI đã đo 22 bài ở đúng1280×900 và1440×900; kiểm hình/quan hệ/tự kiểm/drawer, editor fresh/saved/empty/comment/Tab/undo/copy-paste/F5/mã sai và mã local. Storage bị từ chối thật trong iframe sandbox vẫn gõ được, reload không lưu đúng giới hạn. Đang chốt spot-check bản cuối và review tích hợp.
- Premium audit strict còn1 finding resize do scanner không đọc CSS class; browser xác nhận resize:none/tab-size:4. Không báo audit PASS. Bản build QA tạm được giữ ngoài workspace sau khi lệnh xóa bị policy từ chối; chưa push/merge.
