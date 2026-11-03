# Mở sơ đồ HRM_Demo từ thanh điều hướng

Yêu cầu ngày 03/11/2026: thêm nút trên thanh điều hướng trong ảnh người dùng để mở sơ đồ HRM_Demo hiện có.

- Nút **Sơ đồ database** nằm cạnh **Luyện SQL**, dùng kiểu nút điều hướng hiện hành và có `aria-haspopup="dialog"`.
- `BaseLayout` chứa một `DbDiagramPopup`, mở qua `EVENTS.openDiagram` từ cả thanh điều hướng và bài tập. Sơ đồ tiếp tục dùng `DbDiagramDialog`/`DbDiagram` và schema đọc từ `database/HRM_Demo.sql` lúc build.
- Modal giữ Tab bên trong, khóa nền/cuộn trang, đóng bằng nút Đóng, Escape hoặc nền; trả focus về đúng nút đã mở.
- Nhãn điều hướng không xuống dòng. Dưới 1200px giữ biểu tượng thương hiệu có tên truy cập và số bài đã học, thu gọn chữ thương hiệu/thanh tiến độ để đủ chỗ.
- Không thay schema, seed, API, tiến độ, nội dung bài hoặc bộ slide. Người dùng tự review; không giao agent review, không push/deploy.

Đã triển khai và kiểm bản build; xem `docs/verification/2026-11-03-header-database-diagram.md`. Quyết định dùng một modal chung giúp hai điểm mở dùng cùng schema và cùng hành vi.
