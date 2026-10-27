# Bàn giao bài 4.7–4.8

Soạn theo quy ước hiện hành và nhịp minh họa của 2.1/2.5/2.8: nhìn dữ liệu cụ thể, giải nghĩa SQL cạnh ví dụ, đọc kết quả rồi chốt ý.

| Bài | Branch | Commit nội dung | Đã có |
|---|---|---|---|
| [4.7 — Đối soát chấm công và bảng lương](../../src/content/lessons/4-7-doi-soat-cham-cong-luong.mdx) | `codex/lesson-4-7-full` | `8b2d931` | Bảng đối chiếu, lịch DP018, nguồn tổng hợp, FULL/EXCEPT và 3 đề query. |
| [4.8 — Đọc hiểu stored procedure](../../src/content/lessons/4-8-doc-hieu-stored-procedure.mdx) | `codex/lesson-4-8-full` | `070fd5a` | Phiếu ba đầu vào, đọc thân mẫu, xem 18 dòng rồi COUNT, 5 câu tự kiểm tra; không YAML. |

4.8 kế thừa commit hoàn tất 4.7 để dùng lại tình huống 18 ngày chấm công + 2 ngày phép. Hai nhánh giữ riêng; chưa push, merge vào main hoặc deploy.

Mỗi bài đã có learner reviewer mới. 4.7 khóa phần suy cách làm từ đề trước khi cấp YAML để đối chiếu, không có finding cần sửa. 4.8 nhận một góp ý thấp về bước chọn thủ tục/nhấp phải trong SSMS; đã sửa cả phần giảng và câu ôn tương ứng. Các report gốc được giữ nguyên.

Review tích hợp mới đã tự tính lại dữ liệu và so source/HTML. Hai góp ý thấp về bảo vệ test đã sửa: CASE trong BEGIN và ngày đúng đầu dưới. Ba mutation dấu ngày bị test bắt; đủ chín mục chưa kết luận đã có quyết định trong ma trận. Không có thay đổi nội dung/seed/API sau vòng learner.

[Hồ sơ kiểm](2026-10-27-lessons-4-7-4-8-verification.md): 332 tests đạt trên Node 24 và Node 22; Astro 0 lỗi/0 cảnh báo, 3 hints nền; build 135 trang, 2028 link; API build 81 đề và typecheck đạt. Source/HTML kiểm câu SQL, payload copy, bảng dữ liệu và ô đánh dấu khớp.

SQL Server live/grader chưa xác minh vì thiếu bốn biến cấu hình SQL. Chưa thao tác UI/SSMS thật; HTML không chứng minh clipboard, bàn phím, drawer, viewport, nộp bài hoặc hoàn thành bài. Không có thay đổi seed/schema, API/guard hoặc component/UI.

Hồ sơ review:

- [4.7 — report](2026-10-27-bai-4-7-review.md), [snapshot trước đáp án](2026-10-27-bai-4-7-review-phase1.md), [xử lý](2026-10-27-bai-4-7-disposition.md).
- [4.8 — report](2026-10-27-bai-4-8-review.md), [xử lý](2026-10-27-bai-4-8-disposition.md).
- [Tích hợp — report](2026-10-27-lessons-4-7-4-8-integration-review.md), [xử lý](2026-10-27-lessons-4-7-4-8-disposition.md).
