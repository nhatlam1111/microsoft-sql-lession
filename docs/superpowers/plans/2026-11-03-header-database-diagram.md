# Kế hoạch — nút sơ đồ trên thanh điều hướng

- [x] Đọc TopBar, BaseLayout, modal sơ đồ, schema parser và DESIGN.md; đối chiếu nút trong bài tập.
- [x] Thêm nút cạnh Luyện SQL, đưa modal về BaseLayout và dùng sự kiện chung cho hai điểm mở.
- [x] Giữ nhãn một dòng, kiểm chỗ trống ở 1024/1200/1280/1440px; giữ tên truy cập khi chỉ hiển thị biểu tượng thương hiệu.
- [x] Kiểm Enter, Tab/Shift+Tab, Escape, Đóng, nền, khóa nền/cuộn và trả focus. Sau vòng kiểm đầu, chuyển đóng nền từ mousedown sang click để focus không bị hành vi mặc định của chuột lấy lại.
- [x] Chạy test/check/build/check:dist, lint DESIGN.md và audit UI; ghi riêng false positive của audit.
- [x] Lưu bằng chứng, bàn giao local để người dùng tự review; không agent review/commit/push/deploy.

Kết quả: 561 test đạt; Astro check 0 lỗi, 0 warning, 7 hint nền; build 190 trang; 3.568 link hợp lệ. Chi tiết và giới hạn trong hồ sơ verification cùng ngày.
