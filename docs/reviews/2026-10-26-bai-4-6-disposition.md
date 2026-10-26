# Xử lý review bài 4.6

Đã đọc trọn BƯỚC1 và APPEND BƯỚC2. Fresh learner kế thừa model; bảng tiền đề khóa trước YAML với SHA256 `827317ea6ed5436b4a118da9a8f0da56f5a8c608fbfb123cc219db45e635dfd0`. Tác giả kiểm APPEND bắt đầu đúng toàn bộ byte snapshot. Giữ hai bản report gốc.

| Nhận xét / giới hạn | Quyết định | Xử lý / căn cứ |
|---|---|---|
| F1: SELECT ở Key và Hay nhầm chưa dùng code | Làm theo | Đổi riêng hai từ khóa thành inline code, không thêm lý thuyết/SQL hoặc đổi dữ liệu. |
| Đủ tiền đề ba đề; answer khớp phương án tự nghĩ | Không làm theo — không có yêu cầu sửa | Giữ bài/đề. Reviewer đã tự chọn CTE/kết hồ sơ, SUMCASE giữ0, ba COUNT/UNION ALL trước khi thấy answer. Cột đếm phụ trong CTE lời giảng là tùy chọn, không bắt buộc trả ra trong answer. |
| Mạch, đơn vị, dấu hiệu khác kết luận và các phần giữ được | Không làm theo — giữ nội dung | Không mở hệ thống kiểm toán/RunFlow, không tự sửa/xóa hoặc gọi nhóm là người. |
| Số liệu/live/typing/ràng buộc/APIgrader chưa kiểm | Làm một phần | Tác giả test source/golden/guard và pureJS, gồm biên empty/count0, không đổi thành SQL Server pass. CLI live/data thiếu4SQLenv trước kết nối. |
| HTML tab/copy/routes khác UI/đăng nhập/nộp thực tế | Làm một phần | Đối chiếu3SQL/3copy và liên kết/heading trên build; phần có tab ở4.4 kiểm chung. Không browser/viewport/bàn phím/drawer/SSMS, UI vẫn pending. |
| Thời lượng40phút chưa đo ở buổi học thật | Không làm theo — giữ ước lượng | Là thời lượng dự kiến gồm3đề và5câu ôn, không claim là kết quả nghiên cứu người học. Có thể hiệu chỉnh sau buổi học; không mở việc đo người học ngoài phạm vi soạn. |

TDD4test RED thiếuResult/YAML →GREEN; golden/overrides phân biệt nhóm/hồ sơ, đủ6phòng có0, emailNULL/rỗng/dấu cách, ngàyNULL/bằng/trước, nhiều cờ trên cùng hồ sơ và3COUNT đều0. Astro bắt lỗi type MaHD ở test, sửa annotation SeedRow và bỏ return chết; không bỏ assertion/nới config. Suite322/48 trên Node24 vàNode22.23.4; Astro0error/0warning/3hints nền; API78/typecheck; build132/dist1994. Sau sửaF1, content65/65, build/HTML/dist lạiPASS. Chi tiết đầy đủ và giới hạn ở verification chung. Không đổi guard/API/UI/schema/seed; chưa push/merge/deploy.
