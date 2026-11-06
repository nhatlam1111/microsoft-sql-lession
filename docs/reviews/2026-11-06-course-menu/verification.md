# Kiểm tra lượt sắp menu ngày 06/11/2026

## Xử lý nhận xét

1. **Làm theo.** Danh sách bài tập theo dõi cùng kho tiến độ đã chuyển phiên bản với menu. Chrome mở trực tiếp bài 3.14 với riêng bản lưu v1 hoặc v2 và thấy đúng bài tập đã hoàn thành. Mở qua URL cũ vẫn lấy được nháp theo mã bài tập cũ.
2. **Không làm theo trong lượt này.** Thiếu tiền đề cập nhật theo bảng khác ở đề 5.6.1 đã có trong bài cũ. Giữ đề và đáp án khi chuyển vị trí. Ghi lại để xử lý khi biên soạn 4.3 hoặc 5.6.
3. **Không làm theo trong lượt này.** Bài 3.18 giữ bản tóm tắt hiện có. Khi viết đầy đủ, cần nói rõ quy tắc tính ngày công trước khi đối chiếu và đưa đủ ví dụ để học viên tự làm.

## Bằng chứng của tác giả

- So với `e53eb6f`, giữ nguyên ID, đề, đáp án, câu kiểm và các trường khác của cả 82 bài tập. Trong số đó có 17 bài tập chuyển URL.
- `npm test` đạt 592/592 trên bản cuối. `npm run check` có 0 lỗi, 0 cảnh báo, 7 gợi ý về API cũ trong các component Arcade và trình soạn SQL.
- `npm run build` và `npm run check:dist` đạt. Trình kiểm tra đã đọc 243 trang và 4.069 liên kết, gồm các trang chuyển hướng.
- Chrome trên bản build tại viewport 1280 × 900 và 390 × 844 kiểm đủ 5 trạm, danh sách 19/11/8 mục ở ba phần cuối, vị trí đường nối, kết quả tìm kiếm, menu bài học, bài kế tiếp, chuyển URL bài tập và hai URL đã gỡ. Lần kiểm 390 px đầu tiên cho thấy trạm Administrator lệch tâm. Sau sửa, chênh lệch tâm so với điểm cuối đường nối dưới 2 px ở cả hai viewport.
- Sau khi người làm khóa học chốt phạm vi nhóm, kiểm lại bằng Chrome ở cả hai viewport. Tiêu đề Cấp cứu dữ liệu đứng trước đúng năm mục 5.4–5.8 trong sidebar và lộ trình, Administrator có 8 mục và bài 5.6 được đánh dấu đúng khi đang mở. SHA-256 của `dist/index.html` bản cuối là `D34EF5CA74708635745B68EB5285AC473F111BD596EB4BCC9EF77D98FC1BEA74`.
- Bản build API chứa 82 bài tập khóa học và 50 bài Arcade. `npm --prefix api run check:exercises` hoàn thành với mã 0, bao gồm hai đề ghi dữ liệu chạy qua transaction hoàn tác. `npm --prefix api run check:data` báo cả 7 bảng khớp checksum.
