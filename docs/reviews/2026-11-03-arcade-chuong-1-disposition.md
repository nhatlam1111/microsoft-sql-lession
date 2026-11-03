# Xử lý review chương 1 SQL Arcade

- Report gốc: [2026-11-03-arcade-chuong-1-review.md](2026-11-03-arcade-chuong-1-review.md), review tại commit `c0aec83`, Claude Sonnet, effort high.
- Kiểm của tác giả: đối chiếu `src/content/lessons/2-1-chon-cot-dat-ten-cot.mdx` và `1-3-kieu-du-lieu.mdx`; chạy `check:arcade -- 2-1` trên database `arcade` sau khi sửa, cả 5 bài đạt. Chưa chạy lại trình duyệt cho riêng bản sửa này; nghiệm thu chung ở Task 15.

| Nhận xét | Quyết định | Căn cứ và kết quả |
|---|---|---|
| 5.1 Ngoặc vuông cho tên cột có sẵn chưa được dạy | Làm một phần | Đúng: bài 2.1 chỉ dạy cho alias. Không sửa bài học, thay bài 5 bằng `doi-chieu-tam-ung`, thêm quy tắc vào `docs/quy-uoc.md` 2.8 |
| 4.1, 6.3 Bài 4 lặp bài 1, chương lặp bài tập 2.1 | Làm một phần | Thay bài 4 bằng `bang-ke-cong-tac`: 4 trong 8 cột, thứ tự khác bảng, cột gần tên. Bài 1 tới 3 giữ làm nhịp khởi động; Arcade là phần luyện thêm trên dữ liệu mới |
| 6.1 Hidden test chỉ bắt lỗi cần từ khóa chưa dạy | Làm theo | Bài 4, 5 có hidden test bắt nhầm cột gần tên, lỗi người mới mắc được. Thêm quy tắc ưu tiên vào 2.8 |
| 6.5 Trang cho sẵn tên cột thật | Làm theo | Bài 4, 5 dùng tiêu đề nghiệp vụ trong `columns` để người học tự tìm cột |
| 4.2 "nội dung giống nhau" | Làm theo | Đề mới ghi "giống nhau ở bốn cột này" |
| 4.3 Bảng kê thiếu ngày | Làm theo | Đề mới có cột ngày đi |
| 5.2 Tên bài "tên cột dài" | Làm theo | Bài đã thay |
| 1.1 "gọi điện" | Làm theo | Đổi thành "liên hệ" |
| 3.1 Kiểu `int` chưa dạy | Làm theo | Đổi `SoBuoi` sang `decimal(3,0)`, thêm quy tắc 4 kiểu vào 2.8 |
| Thuật ngữ test, coin chưa được giải thích | Làm theo | Thêm một câu giải thích ở trang Luyện SQL |
| 1.2, 2.1, 2.2, 3.2, 5.3, 6.2 | Giữ | Reviewer xếp Giữ được |
| 6.4 `AS` không luyện được | Giữ | Bộ chấm không so tiêu đề là quyết định đã duyệt |
