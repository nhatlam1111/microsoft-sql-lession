# Appendix PL.1–PL.6 Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to track this approved plan; repository conventions and the user's approval take precedence over generic workflow pauses.

**Goal:** Sáu bài tra cứu SQL Server đủ giải thích, có tự kiểm tra và tìm được trong chương Phụ lục.

**Architecture:** Collection/catalog/layout/routes riêng; dùng lại thiết kế và bộ khối MDX hiện có, adapter tìm kiếm chung, không đổi main progress.

**Tech Stack:** Astro, MDX, React islands, TypeScript, Vitest, Microsoft SQL Server/Azure SQL.

**Spec:** [Thiết kế đã duyệt](../specs/2026-11-01-appendix-reference-design.md).

## Global Constraints

- Đọc AGENTS.md, quy ước/template/hồ sơ công ty và bài mẫu trước viết/review; quy ước repo cao hơn skill.
- SQL chỉ SELECT; không in secret, ghi database, bật preview hay đổi compatibility.
- Không tương thích ngược; ghi đúng nền tảng/phát hành của tính năng mới.
- Không sửa YAML/API, không dùng allowlist khung cũ; không push/deploy.
- Mỗi bài ba tự kiểm tra, giải thích hiện rõ, tên hàm/kiểu tìm được.

## Review Focus

Tra nhanh rồi dùng được; units/storage/type result chính xác; người chỉ biết Excel đọc được cú pháp; ví dụ và đáp án có đủ tiền đề; không ép đọc bài sau; giữ 50 bài/progress; review source/HTML/UI/SQL tách bằng chứng.

## Tasks

- [x] Chốt quyết định người dùng và ghi thiết kế/phạm vi.
- [x] Builder check thiết kế, xử lý câu hỏi có ảnh hưởng.
- [x] Thêm biến thể tra cứu vào quy ước và template.
- [x] Collection/schema/routes/layout/sidebar/search, kiểm tra hồi quy.
- [x] Soạn PL.1–PL.2 theo nguồn Microsoft và kiểm SELECT.
- [x] Soạn PL.3–PL.6 theo nguồn Microsoft và kiểm SELECT.
- [x] Kiểm source, test/type/build/dist, browser và audit thiết kế.
- [x] Sáu review bài độc lập; đọc report, xác minh/sửa và ghi ma trận.
- [ ] Review tích hợp mới, xử lý findings, chạy lại kiểm liên quan.
- [ ] Lưu evidence, cập nhật spec/plan, commit local và bàn giao.

## Execution log

01/11/2026: nhánh `codex/appendix-reference-pl-1-6` từ main `5c2604a`. Người dùng duyệt triển khai, không yêu cầu tương thích ngược. Đã khảo sát kiến trúc; main catalog phải tách khỏi PL để giữ tiến độ hiện có. Chưa có source/build Phụ lục ở thời điểm viết kế hoạch.

Builder check agent mới: nothing important left. Đã ghi biến thể tra cứu vào quy ước/template. Ruling: thực hiện song song các phần độc lập theo chế độ multi-agent của phiên; quy trình kiểm/review của repo thắng mặc định inline/một reviewer của skill executing-plans. Tất cả reviewer kế thừa model phiên, xử lý cả nhận xét nhỏ theo §4.6. Nội dung và infrastructure giao phạm vi file riêng, root tích hợp và nghiệm thu.

Đã có sáu bài và hạ tầng riêng; vòng đầu npm test đạt383/383 (51files), check0errors/0warnings/3hints nền, build136pages, check:dist2495links. Audit source SQL xác nhận53SELECT nguyên câu và47Result khớp live. Bằng chứng của hai tác giả gồm76 và73SELECT executions, cộng4SELECT môi trường; không có câu ghi. Đây là kết quả trước sửa review, sẽ kiểm lại source cuối.

Browser build đầu: 1280×900 và1024×768, tra nhanh/anchor, cuộn bảng bằng ArrowRight, tìm TRY_CONVERT/pl.1, no-results/xóa/refocus/Tab/Enter, lộ trình vẫn dừng1.1 và0/50 sau mởPL. Không mount trạng thái hoàn thành ởPL. Dưới1024 có thông báo desktop hiện hành. Chưa kiểm copy clipboard/details sau sửa, không coi đã hoàn tất UI.

Sau review PL.1/PL.2: sửa đơn vị/ký hiệu vector, vị trí dữ kiện đề, code trong summary và anchor bảng chuyển kiểu; làm rõ ký hiệu `s` và NULL có kiểu. Ma trận ở docs/reviews/2026-11-01-appendix-reference/decisions.md; ngưỡng TRY_CAST đang xác minh bổ sung. PL.3/PL.4 tiếp tục đúng agent sau ngắt hạn mức, không thay reviewer. Người dùng đã yêu cầu tiếp tục.

Sau lượt tiếp tục: PL.3/PL.4/PL.5 đã có report đầy đủ và root đọc hết. Đã xử lý mọi finding: làm rõ PATINDEX NULL theo nguồn/live riêng, cắt câu thừa/jargon, giải nghĩa max toán, SELECT/CONVERT độc lập và phạm vi giờ UTC; sửa lỗi chữ. Chín SELECT bổ sung đạt ở biên TRY_CAST (ASCII/UTF-8/UTF-16 bổ sung) và PARSE NULL có kiểu; đã chốt đơn vị trong PL.2. PL.6 đang review. Mọi thay đổi và phần giữ/chưa xác minh có ma trận; chưa chốt nghiệm thu cả chương.

PL.6 hoàn tất review; root đọc đủ report, xử lý3finding: SELECT hằng số, bỏ câu metadata ngoài tiền đề, giải nghĩa MAX/tổng hợp ngay cảnh báo CASE. Cả6report nguyên gốc được giữ, ma trận có quyết định cho mọifinding. Chuẩn bị kiểm cuối và review tích hợp trên source/build khớp sau sửa.

Source sau review: test384/384(51files), check0errors/0warnings/3hints nền, build136pages10:27:24, dist2502links, DESIGNlint0errors. UIaudit còn1finding literaltextarea nền cóCSSresize:none, ghi riêng không báođạt. Browser đã mở6trang1280, kiểm1024/1440, sao chépnewline/tab+khôi phụcclipboard, Enter/Space details, Escape/search, lộtrình1.1 và0/50. Đã resetviewport. Hồ sơverification.md và technical snapshots/source SQL coverage đã lưu trongdocs/reviews. Chờreviewtíchhợp trêncommit đóngbăng.
