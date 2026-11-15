# Review độc lập bài 2.6 — phần giảng và đề

## Kết luận và finding

Không phát hiện lỗi có căn cứ hoặc tiền đề còn thiếu trong phạm vi source đã đọc. Không đề xuất sửa chỉ để thêm chữ. Đây không phải kết luận về thực thi SQL, bản render hay giao diện.

## Phần giữ được

- Tình huống và câu trả lời (dòng 19–26, 115–126) giới hạn vào mã xuất hiện trong toàn bộ hồ sơ, kể cả đã nghỉ; bài nói rõ danh mục phòng có thể chứa mã không xuất hiện trong hồ sơ. Điều này trả lời được danh sách dùng để đối chiếu gì và không khẳng định danh sách phòng đầy đủ.
- Dòng 32–44 nối thao tác Excel sang `DISTINCT`, nêu vị trí sau `SELECT`, đối tượng so là cả dòng kết quả và nguồn không bị sửa. Dòng 130 dùng hai cặp cùng phòng để giải thích vì sao một cặp gộp, cặp kia giữ riêng; đó là cầu nối đủ cụ thể cho đề hai cột.
- Dòng 46–115 đặt SQL cạnh sơ đồ, gọi rõ thứ tự logic, rồi giải thích vì sao còn sáu mã trước bảng kết quả. Drawer ghi rõ bảng trích và số tổng, giữ chi tiết lần dữ liệu. Phần hiện đã có cơ chế cần hiểu, không cần mở drawer để biết cách bỏ trùng.
- Dòng 132–136 đặt lọc trước so trùng, cho phép lọc bằng cột không trả về, nhắc hướng sắp từng cột và nêu cách `NULL` gộp và đứng đầu khi tăng dần. Hay nhầm dòng 144–146 giải thích tác động của khóa chính và điều kiện cột sắp xếp; bài 1.4 đã giải thích tính duy nhất của khóa chính.

## Tự giải và tiền đề từng đề

Đã đọc đúng phần đề, cột và yêu cầu thứ tự bằng lệnh trích được giao; tự xác định cách làm cả ba đề trước khi xem đáp án. Không mở đáp án; dưới đây chỉ ghi hướng làm và tiền đề, không chép câu trả lời.

| Đề | Cách làm độc lập và tiền đề | Đánh giá |
|---|---|---|
| 2-6-1 | Chọn duy nhất mã chức danh từ toàn bảng, bỏ dòng trùng rồi xếp chính cột đó tăng. Bài 2.1 dạy chọn cột; 2.4 dạy sắp tăng; 2.6 dòng 42–44, 134 dạy bỏ trùng và sắp cột chọn. | Đủ; đề đã nói không lọc và không thêm cột. |
| 2-6-2 | Lọc hồ sơ thuộc một trong hai mã phòng, chọn cặp phòng/chức danh đúng thứ tự, bỏ cặp lặp, xếp phòng trước và chức danh trong cùng phòng. Bài 2.2 dạy `WHERE`; 2.3 dạy `IN` và dấu nháy; 2.4 dạy thứ tự tiêu chí; 2.6 dòng 130–134 nối các phần. | Đủ; không cần điều kiện trạng thái. |
| 2-6-3 | Giữ hồ sơ có ngày nghỉ đã ghi, chỉ chọn mã phòng, bỏ mã lặp và xếp giảm. Bài 2.5 giải thích `IS NOT NULL`; 2.2 và 2.4 dạy vị trí lọc và hướng sắp; 2.6 dòng 132–134 nói lọc trước và cột lọc không phải trả về. | Đủ; không suy thêm trạng thái hay khoảng ngày. |

## Giới hạn

Review source toàn bài, khối và drawer, các đoạn tiền đề được giao cùng quy ước và template liên quan; không đọc HTML, không thử browser, SQL, API hay đáp án. Số 48 → 48 → 6 → 6, khóa chính, các biến thể và ba đề là bằng chứng tác giả cung cấp, không phải kiểm live độc lập của reviewer; số 19 cặp cũng chưa tự xác minh bằng SQL. Không đánh đồng cách đọc source với kiểm render hoặc hành vi chấm bài. Cấu hình reviewer do công cụ điều phối cung cấp; không có bằng chứng độc lập xác nhận model thực tế.
