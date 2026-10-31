# Hồ sơ kiểm drawer sơ đồ

Bản review: commit `00d283b`, nhánh `feat/lesson-2-5-null`, base `617ae0d`. Report gốc: [review.md](review.md), giữ nguyên. Reviewer: Claude Sonnet, effort high, chỉ đọc nguồn và HTML. Có 3 mục Cần sửa.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ và kết quả |
|---|---|---|
| R12 Đầu vào 2.5 thiếu `MaPB` | Làm theo | Thêm trường `inputColumns`; bước `WHERE` hiện `MaNV`, `MaPB`, `NgayNghiViec` |
| T1 câu mặc định sai ở nhánh `UNION`, CTE | Làm theo | Đổi thành "Bước này không nhận dữ liệu từ bước nào trước đó trong sơ đồ.", đúng với mọi bước đầu |
| L1 lời còn nhắc câu kiểm trong drawer | Làm một phần | Sửa 14 câu ở 3.2, 3.3, 3.4, 3.7, 3.9, 3.10, 4.1, 4.2, 4.3. Giữ 3.6 dòng 91 và 4.1 dòng 80 vì nói về câu lệnh có thật trong thân bài: reviewer đọc nhầm 4.1, danh sách 9 đơn có ở khối `Result` phía trên. Thêm test chặn cụm cũ |
| R1 bước `FROM` nói ba lần | Làm theo | Đầu vào nêu bảng, Thực hiện nói chưa lọc, chưa chọn cột, Kết quả nêu số |
| R2 `SELECT` lặp giữa Thực hiện và Kết quả | Làm theo | Thực hiện nói việc, Kết quả nói số và danh sách cần |
| R3 đầu vào 2.1 đã chỉ có ba cột | Làm theo | Đầu vào thêm `GioiTinh`, Thực hiện nói bỏ chín cột |
| R4 thân bài không giới thiệu drawer | Không làm theo | Ghi chú sinh tự động dưới bảng soi đủ để đọc; thêm câu vào 2.2 là lặp |
| R5, R7 bảng soi không nói là trích, chân bảng đọc như phễu | Làm theo | Ghi chú tự động: "Trích 4 trong 48 dòng; hàng cuối đếm riêng từng điều kiện trên cả 48 dòng." |
| R6 đầu vào `SELECT` thiếu `HoTen` | Làm theo | `inputColumns` ở 2.2–2.5, có test |
| R8, R9, R13 tiêu đề điều kiện không thống nhất | Làm theo | Mọi tiêu đề có tên cột, có test: `MaPB IN (…)`, `TrangThai = N'Đang làm'`, `NgayNghiViec IS NULL` |
| R10 bước `TOP` tô cả dòng | Làm theo | Thực hiện nói rõ viết trên dòng `SELECT` nhưng xét sau `ORDER BY`. Không đổi cách tô |
| R11 `NV001` xuất hiện từ đâu ở 2.4 | Làm theo | Thêm `NV001` vào bước `FROM` và bảng soi |
| R14 đầu vào `ORDER BY` 2.5 đã xếp sẵn | Không làm theo | Trích đúng thứ tự thật; đảo dòng để minh họa là dựng dữ liệu |
| R7 nghi về thứ tự đánh giá điều kiện | Không làm theo | Bảng nêu giá trị đúng sai của mỗi điều kiện trên dòng dữ liệu, đúng dù máy đánh giá theo thứ tự nào; phần dẫn đã nói đây là thứ tự logic |
| T2, L2, L3 bước `JOIN`, bước lọc sau 2.5 | Không làm theo | Chủ đích của thiết kế: chỉnh khi từng bài chuyển bố cục |
| T3 bước sau bước rỗng | Làm theo | In "Bước trước không còn dòng nào.", có test |
| T4 kiểm bảng soi còn lỗ | Làm theo | Chặn mã ngoài 5 dòng đang hiện, số đúng nhỏ hơn số giữ, bảng soi ở bước đầu |
| T5 phím mũi tên trong vùng cuộn | Làm một phần | Thêm `.rf-tb-scroll` vào ngoại lệ, không thêm `tabindex` để giống `.res-scroll` |
| T6 trình đọc màn hình | Làm một phần | Thêm `aria-label` cho hai bảng; nhãn ba phần giữ `p` như trước |
| T7 `isUnionFlow` khóa bốn bước | Không làm theo | Khung bài đã giới hạn, chỉ bài 3.8 dùng |
| T8 độ dài drawer, `Result` 12 cột | Không làm theo | Đo được 1153px ở bước `WHERE` 2.5, chấp nhận; thiết kế không đổi `Result` |
| T9 `aria-label` thẻ đầu ghi "Còn" | Làm theo | Sửa, có test. Phần màn hẹp ngoài phạm vi |

## Kiểm sau khi sửa

| Kiểm | Kết quả |
|---|---|
| `npm test` | 353/353 |
| `npm run check` | 0 lỗi, 0 cảnh báo, 3 hint có sẵn |
| `npm run build`, `check:dist` | 129 trang, 1951 liên kết |
| `SELECT` | 2.2 `14`; 2.3 `24`, `3`, `2`; 2.4 `45`; 2.5 `10`, `45`, `8`; các hồ sơ trong bảng soi |
| Bản build rộng 1024, sau sửa | 2.3, 2.4, 2.5, 3.8: đủ ba phần, đúng cột đầu vào, bảng không tràn, bước `UNION` phân biệt hai nhánh, không lỗi console |
| Trước khi sửa theo review | 2.3 chụp màn hình; 3.5 có `JOIN`; ← và Esc; rộng 1440 |
| `check:exercises`, `check:data` | Không chạy lại ở lượt drawer vì YAML không đổi; đã đạt ở bản 2.5 |

## Giới hạn

- Các sửa theo report chưa có review độc lập.
- Sau khi sửa, ảnh chụp màn hình lỗi do cửa sổ không vẽ kịp nên kiểm bản cuối bằng dữ liệu trang; phím và rộng 1440 chỉ thử trước khi sửa.
- Chưa kiểm trình đọc màn hình, màn hẹp, học viên thật.
- Từ 2.6 trở đi: lời cũ đặt vào nhãn mới, bước `JOIN` chỉ hiện bảng trái, bước lọc chưa có bảng soi; bảng đầu vào có thể lệch số với lời cũ như 2.9.
