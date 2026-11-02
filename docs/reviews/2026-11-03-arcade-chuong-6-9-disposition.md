# Xử lý review chương 6 tới 9 SQL Arcade

- Report gốc: [chương 6, 7](2026-11-03-arcade-chuong-6-7-review.md) và [chương 8, 9](2026-11-03-arcade-chuong-8-9-review.md), review tại commit `606e7d8`, Claude Sonnet, effort high. Hai reviewer bị dừng giữa chừng vì hết hạn mức và được tiếp tục đúng lượt.
- Kiểm của tác giả: đối chiếu bài 2.6 tới 2.9; sau khi sửa, chạy lại `check:arcade` cho bốn chương trên database `arcade`.

| Nhận xét | Quyết định | Căn cứ và kết quả |
|---|---|---|
| X1 Dấu cách đầu cuối bị bảng nuốt mất | Làm theo | `ArcadeTable` hiện dấu cách ở hai đầu bằng dấu `·` màu đỏ và hiện `(chuỗi rỗng)` cho chuỗi rỗng, có test |
| F7.1 `viet-hoa-ho-ten` đòi giữ dấu cách đầu | Làm theo | Thay test bằng tên dài hơn 20 ký tự, lỗi nhìn thấy được |
| F7.2 `ba-so-cuoi-cua-ma` ngoài khuôn dạng đề | Làm theo | Đề nói rõ có mã hai số năm; thay test `2024-1001` bằng lỗi mất số 0 đầu, lỗi bài 2.7 có nêu |
| F7.4 `ghep-nhan-phieu` chưa nói cột mã phòng | Làm theo | Đề ghi ô mã phòng giữ nguyên `NULL`; nhãn đặt trong dấu nháy |
| F6.1 Chỗ đứng của dòng `NULL` | Làm theo | Đề `o-trong-mot-dong` nói `NULL` gộp một dòng và đứng đầu |
| F1 Không ép `ORDER BY`, tiêu chí phụ | Làm theo | Đã có thêm hidden test chèn lệch thứ tự ở `sinh-nhat-thang-sau`, `nhan-tham-nien`, `bao-cao-tong-hop`, và test tiêu chí phụ ở `het-han-trong-30-ngay` |
| F2 Ngày nghỉ ở tương lai | Làm theo | Đề thêm "bất kể đó là ngày nào" |
| F3 "Đến hết 30 ngày sau mốc" | Làm theo | Đề ghi "ngày cách mốc đúng 30 ngày"; `bao-cao-tong-hop` ghi ngày cụ thể |
| F8 "Trước mốc" cần `<` chưa dạy | Làm theo | `bao-cao-tong-hop` đổi sang "từ 20/10/2026 trở về trước", chỉ cần `<=` |
| F4, F6.3 Nhãn và giá trị chưa trong dấu nháy | Làm theo | Đặt trong “…” ở mọi chương |
| F5, X2 "Bài cần biết" chung theo chương | Làm theo | Chương 6 tới 9 ghi theo từng đề; `o-trong-mot-dong`, `ghep-nhan-phieu` có thêm bài 2.5 |
| F9 Tên, id, nghĩa nghiệp vụ | Làm một phần | Sửa `mot-thang-sau` thành `hai-thang-thu-viec`, `thu-tu-nhanh` thành `hang-nha-cung-cap`, đề kỳ lương đầu tiên, đơn vị doanh số, phạm vi `bao-cao-tong-hop`. Giữ các id còn lại vì học viên không thấy id |
| F7, X3 `catches` gượng | Làm một phần | Thay ở `sinh-nhat-thang-sau` test 3 và thêm ngày 31/12 ở bài thử việc. Còn lại giữ vì công bằng với đề và chống viết cứng |
| F6, X4 Nhãn độ khó, bài lặp | Không làm theo | Phân bố 20/20/10 đã duyệt; chưa có người làm thử để chỉnh theo cảm nhận |
| F6.4, F7.5 | Không làm theo | Reviewer chỉ ghi nhận; vị trí 5, 6 cần cho đề rõ |
| F6.2, F7.3 và F8 về bài học | Để người làm khóa học quyết | Là thay đổi bài học, ngoài phạm vi Arcade: nêu `DISTINCT` gộp `NULL`, `LEN` tính dấu cách đầu, cách viết số và `<`, `>` trong câu lệnh |
