# Bàn giao bài 4.9–4.10

Hai bài đã soạn theo quy ước hiện hành và mạch minh họa phần 2: nhìn dữ liệu cụ thể, giải thích thao tác/SQL cạnh ví dụ, đọc kết quả rồi chốt ý.

| Bài | Branch | Commit nội dung | Kết quả |
|---|---|---|---|
| [4.9 — Power Query](../../src/content/lessons/4-9-power-query-excel.mdx) | codex/lesson-4-9-full | 677939d, bổ sung đường tải ở 79f4efa | Excel mẫu, SELECT 10 hồ sơ IT đang làm, kết nối/tải/Refresh/chia sẻ và 5 câu ôn. |
| [4.10 — Yêu cầu báo cáo](../../src/content/lessons/4-10-viet-yeu-cau-bao-cao.mdx) | codex/lesson-4-10-full | 398ab99 | Mẫu yêu cầu, ca chấp nhận ngày/hợp đồng/lịch sử, SELECT 2 hồ sơ vào mới và 5 câu ôn. |

Hai bài đầy đủ, không có YAML chấm SQL; hoàn thành đọc hiểu qua năm câu tự kiểm tra. 4.9 hướng dẫn Excel Microsoft 365 desktop Windows khi có kết nối SQL được cấp. 4.10 chốt khoảng vào mới 01/10 đến hết 21/10/2026; mã phòng là giá trị hiện lưu lúc lấy, không dựng lịch sử theo ngày chốt.

Mỗi bài có learner reviewer mới; đã đọc trọn và xử lý mọi giới hạn, không có finding cần sửa ở hai bản được giao. Sau learner 4.9, tác giả đối chiếu thêm Microsoft và bổ sung nhánh LoadTo bị mờ khi tạo query đầu. Sửa trên branch 4.9 rồi đưa sang 4.10; SQL, kết quả và dữ liệu mẫu giữ nguyên. Các report gốc được giữ nguyên theo phiên bản đã review.

Reviewer tích hợp mới đã tự đối chiếu đủ 18 tệp, dữ liệu public seed, SQL/copy/HTML và tài liệu Microsoft; không có finding cần sửa. Đã đọc trọn report và ghi quyết định cho đủ D1–D11, giữ riêng phần kiểm tác giả và reviewer. Sau review chỉ cập nhật hồ sơ, nội dung và dữ liệu không đổi.

[Hồ sơ kiểm](2026-10-27-lessons-4-9-4-10-verification.md): 338 tests / 52 files đạt trên Node 24 và Node 22; Astro 0 lỗi / 0 cảnh báo / 3 hints nền; build 135 trang, 2032 link. Source/HTML đối chiếu SQL/copy, bảng và dấu ô khớp.

SQL Server live chưa kiểm vì thiếu cấu hình SQL; Excel thực và tương tác browser/clipboard/keyboard/viewport/login/hoàn thành cũng chưa kiểm. Không thay seed/schema, API/guard, bộ đề hoặc component/UI/store/editor.

Các nhánh giữ riêng và local, 4.10 kế thừa 4.9; chưa push, merge main hoặc deploy theo phạm vi được duyệt.

Hồ sơ review:

- [4.9 — report](2026-10-27-bai-4-9-review.md), [xử lý](2026-10-27-bai-4-9-disposition.md).
- [4.10 — report](2026-10-27-bai-4-10-review.md), [xử lý](2026-10-27-bai-4-10-disposition.md).
- [Tích hợp — report](2026-10-27-lessons-4-9-4-10-integration-review.md), [xử lý](2026-10-27-lessons-4-9-4-10-disposition.md).
