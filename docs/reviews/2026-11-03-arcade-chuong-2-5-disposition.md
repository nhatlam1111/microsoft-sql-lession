# Xử lý review chương 2 tới 5 SQL Arcade

- Report gốc: [chương 2, 3](2026-11-03-arcade-chuong-2-3-review.md) và [chương 4, 5](2026-11-03-arcade-chuong-4-5-review.md), review tại commit `c1eec47`, Claude Sonnet, effort high.
- Kiểm của tác giả: đối chiếu bài 2.2 tới 2.5; sau khi sửa, chạy lại `check:arcade` toàn bộ trên database `arcade`.

| Nhận xét | Quyết định | Căn cứ và kết quả |
|---|---|---|
| F1 Số kiểu `2.000.000` trong đề | Làm một phần | Sửa ở đề, không sửa bài học: đề viết số liền. Thêm quy tắc vào `docs/quy-uoc.md` 2.8 |
| F2 Nhãn độ khó | Làm một phần | `khoa-hoc-quy-4` viết lại nên thật sự khó hơn. Nhãn các bài khác là cảm nhận chưa có người làm thử, giữ để đúng phân bố đã duyệt |
| F3 Không đề nào buộc dùng ngoặc | Làm theo | `khoa-hoc-quy-4` có `OR` trên hai cột khác nhau cùng `AND`; hidden test bắt lỗi thiếu ngoặc |
| F4 `columns` khi là tên cột, khi là tiêu đề | Không làm theo | Quy ước 2.8 cho phép cả hai; tiêu đề nghiệp vụ dành cho bài cần tự tìm cột |
| F5 `lessons` chỉ trỏ một bài | Làm theo | Mỗi chương liệt kê thêm các bài cần kết hợp |
| F6 Một số `catches` khó xảy ra với người học | Không làm theo | Reviewer đề xuất giữ nguyên; các test này công bằng và chống viết cứng theo dữ liệu mẫu |
| F7 Lặp đề tài giữa các đề | Không làm theo | Do chương chỉ có ít từ khóa; bảng cùng tên khác cột đã được duyệt |
| F8 Chi tiết câu chữ, dữ liệu | Làm theo | Cắt câu lộ bẫy ở `tai-san-tang-5`, sửa `ho-bat-dau-bang`, tiêu đề `ket-thuc-thu-viec`, tên khóa trong `khoa-hoc-quy-4`. Không đổi các tiêu đề nói thẳng kỹ thuật |
| 3.1 Nhãn `(chưa có số)` mơ hồ | Làm theo | Đặt trong dấu nháy và nói rõ gồm hai dấu ngoặc, cả ở `thay-o-trong`. Thêm quy tắc vào 2.8 |
| 3.2 `NULL` thật và chữ `NULL` khó phân biệt | Làm theo | Ô `NULL` thật trong bảng test in nghiêng, ngoài màu nền |
| 3.3 Tiêu chí xếp thứ ba không có test | Làm theo | `top-sau-khi-loc` có thêm hidden test thứ tư |
| 3.4 Nhịp chương 5 | Làm một phần | Đổi chỗ bài 3 và 4. Giữ nhãn Khó của `top-sau-khi-loc` vì đây là bài tích hợp cuối chương |
| 3.5 `catches` viết cứng, dữ liệu gượng | Không làm theo | Không ảnh hưởng người làm đúng đề |
| 3.6 `COALESCE` ba tham số chưa có ví dụ | Không làm theo | Định nghĩa "xét từ trái sang phải" đủ để suy ra, và đây là bài Khó; có thể lồng hai lần |
| 3.7 Chi tiết hiển thị | Làm một phần | Phần `lessons` đã sửa. Giữ số hiện theo kiểu cột như bài 1.3 đã dạy |
