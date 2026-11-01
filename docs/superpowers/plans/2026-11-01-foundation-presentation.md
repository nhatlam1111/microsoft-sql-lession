# Triển khai slide Làm quen

Nguồn quyết định: [spec](../specs/2026-11-01-foundation-presentation-design.md), được người làm khóa học duyệt trong yêu cầu triển khai ngày 01/11/2026.

1. Tạo collection/metadata, đường dẫn, tìm kiếm và liên kết dẫn vào slide.
2. Viết 20 slide cùng ghi chú, bảng trích và sơ đồ có nhãn đủ lớn.
3. Tạo layout trình chiếu riêng, trang mục lục, trang người giảng và cửa sổ chiếu.
4. Cài state/URL/protocol và browser controller; kiểm các bước câu hỏi, mở muộn, tải lại và theo lại.
5. Kiểm nội dung, số liệu, build/browser; review độc lập và xử lý từng nhận xét.
6. Bàn giao đường dẫn local và hồ sơ kiểm. Chỉ đăng web khi có yêu cầu tiếp theo.

## Trạng thái

Đã triển khai collection, điều hướng/tìm kiếm, 20 slide, hai cửa sổ và state/URL. Bản đầu commit `081a5a3` build được 139 trang. Review nội dung độc lập đã đọc đủ source/HTML, không có finding cần sửa; báo cáo tại `docs/reviews/2026-11-01-foundation-presentation/content-review.md`.

Vòng tự kiểm giao diện: rút câu dẫn slide 19, giảm khoảng cách giữa câu hỏi và lời giải để không tràn canvas; giữ nguyên cỡ chữ. Đã xem 24 trạng thái (20 slide và 4 đáp án) ở viewport thực 1280×800, không tràn sau sửa. Kiểm hai cửa sổ đã có bằng chứng mở muộn, tải lại, tự xem/theo lại cùng revision. SQL đối chiếu 12/12 SELECT-only đạt, không thay đổi database. Đang hoàn thiện kiểm responsive/fallback và review tích hợp; chưa push.
