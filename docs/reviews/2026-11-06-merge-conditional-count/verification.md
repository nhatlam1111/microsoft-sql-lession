# Kiểm tra lượt gộp bài 3.1 và 3.12

- Chạy truy vấn đọc qua runner trước khi viết minh họa. Kết quả trên chín đơn đã duyệt bắt đầu trong tháng 9/2026 là hai phép đếm đều cho 5, tổng có điều kiện là 12.0 ngày.
- So với nguồn trước khi gộp, ba khối SQL, RunFlow và Result của 3.1 giống hệt. Ba đề đầu và cả 15 đề của các bài chuyển số giữ nguyên dữ liệu, gồm ID và câu đáp án.
- Ba đáp án mới đều trả đúng một dòng. Theo thứ tự cột trong từng đề, 3.1.4 cho `45, 3, 48`, 3.1.5 cho `86, 792348000`, 3.1.6 cho `27, 2, 29`. Bản build API có 82 đề. `check:exercises` đạt và `check:data` xác nhận checksum cả 7 bảng khớp sau khi chạy qua runner luôn hoàn tác.
- `npm test` đạt 590/590. `npm run check` có 0 lỗi, 0 cảnh báo và 7 gợi ý API cũ đã có. Build đạt, `check:dist` đã đọc 268 trang và 4.066 liên kết.
- Chrome ở 1280 × 900 hiển thị bảng minh họa trong bề rộng bài và đủ sáu đề. Chrome ở cả 1280 × 900 và 390 × 844 xác nhận Trung cấp có 18 mục liền số, hai slug đếm có điều kiện cùng các URL bài tập dẫn đến đúng nơi, và các URL CTE cũ giữ cùng đề. Ở 390 px, khung đọc 3.1 và 3.2 có cùng giới hạn bố cục sẵn có và đều hiện thông báo dùng màn hình lớn.
- Dùng ba bộ dữ liệu thử trong Chrome để kiểm v1, v2 và v3. Bài đếm có điều kiện cũ chuyển về 3.1 với cờ xem lại. Hoàn thành 3.1 có sẵn được giữ và CTE nhận đúng số 3.12. Bản nháp CTE hiện lại còn đề viết lại mở với ô nhập trống.
- Người làm khóa học tự review nội dung theo yêu cầu.

## Vòng sửa tình huống 16 và 12 ngày

- Người làm khóa học chọn tình huống đối chiếu hai báo cáo và chốt một dòng bảy chỉ tiêu. Truy vấn đọc trả đúng `9, 16.0, 1.78, 1.0, 3.0, 5, 12.0`. Nâng ngưỡng lên 10 ngày cho hai chỉ tiêu bàn giao `0, 0.0`. Đổi sang tháng 11 cho `0, NULL`. Cộng cờ đếm được 5, `COUNT` với `ELSE 0` đếm 9, và tổng không có `ELSE` trả `NULL` khi không đơn nào đạt ngưỡng.
- `npm test` đạt 590/590. `npm run check` có 0 lỗi, 0 cảnh báo và 7 gợi ý API cũ đã có. Build đạt và `check:dist` kiểm 268 trang cùng 4.066 liên kết. Runner kiểm 82 đề, cả sáu đề của 3.1 trả một dòng. Checksum của cả 7 bảng khớp.
- Chrome ở 1280 × 900 và 1440 × 900 hiển thị đủ bảy cột trong khung kết quả. Đã mở bước SELECT, kiểm hai ví dụ và giá trị `NULL` ở nhánh đếm của các đơn một ngày. Bấm Sao chép với clipboard giả lập trong browser kiểm chuỗi SQL đúng cả dấu nháy và tab. Giữ quyền review nội dung cho người làm khóa học.
