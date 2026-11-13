# Review độc lập bài 3.12: luồng CTE

## Kết luận và finding

Không tìm thấy lỗi nội dung hoặc thiếu tiền đề có căn cứ trong phạm vi được giao. Không có đề xuất sửa bắt buộc. Đây là review source và HTML tĩnh, không phải xác nhận SQL hay UI chạy đúng.

## Những phần giữ được

- Bài nêu rõ phạm vi: đơn đã duyệt bắt đầu trong tháng 9, tính toàn bộ số ngày vào tháng bắt đầu. Mẫu `Nghỉ ốm` giải thích vì sao ba đơn 1 + 2 + 2 thành tổng 5, rồi ngưỡng ở câu ngoài giữ nhóm này. Chín dòng trong source tự cộng thành Phép năm 9, Nghỉ ốm 5 và Việc riêng 2; lọc từ 5 giữ hai loại, phù hợp hồ sơ công ty.
- Hai thẻ CTE cho biết lần lượt nguồn, mệnh đề theo thứ tự logic và kết quả 9 đơn/3 cột, 3 tổng/2 cột. Thẻ `FROM` câu ngoài nhận đủ ba tổng; `WHERE` soi cả hai dòng giữ và dòng loại. Ví dụ nhóm đủ ba đơn, phân biệt với bảng đầu vào trích. Các bảng có thứ tự để đối chiếu được chú thích; chỉ `ORDER BY` câu ngoài quyết định thứ tự báo cáo.
- Lời dẫn, `note` và đoạn phạm vi CTE cho biết mũi tên diễn tả phụ thuộc dữ liệu, SQL Server tự chọn thực thi, không cam kết lưu sẵn hay nhanh hơn. HTML tĩnh có note và tên hai thẻ CTE, `FROM` ngoài, `WHERE` ngoài. Chưa kiểm mũi tên hoặc drawer khi tương tác.
- Bốn câu tự kiểm đều trả lời được từ nội dung trước đó: thứ tự phụ thuộc và dấu phẩy; khai báo lại cả hai CTE khi dùng tiếp; giữ định nghĩa đầu và đổi câu cuối để xem chín đơn; lọc tổng ở câu ngoài. Tôi tự trả lời bốn câu trước khi đọc đáp án; đáp án phù hợp.

## Tiền đề từng đề

Đã đọc riêng đoạn `ex-prompt` trong HTML của từng đề và tự xác định cách làm bằng lời trước khi đọc YAML; không dùng đáp án làm tiền đề.

| Đề | Cách tự xác định và tiền đề |
|---|---|
| 1 | Lọc trạng thái và tháng 8, nhóm loại, cộng số ngày trong một CTE; câu ngoài lọc tổng rồi sắp xếp. Bài 3.12 cho mẫu lọc tháng, SUM, CTE và lọc tổng; 3.2 giảng nhóm. Đủ tiền đề. |
| 2 | Lọc hồ sơ đang làm lấy mã phòng, CTE thứ hai nhóm mã và đếm dòng; câu ngoài lọc số đếm và sắp mã. Bài 3.12 dạy hai CTE, gọi cột đã xuất và nhắc đếm; 3.1 dạy COUNT(*), 3.2 nhóm. Đủ tiền đề. |
| 3 | Đếm dòng hợp đồng theo mã trong CTE đầu; trước tiên cho câu cuối đọc CTE và lọc hai mã, rồi tạo CTE thứ hai lọc số đếm và chọn bảng cuối. Bài 3.12 dạy kiểm CTE bằng câu cuối và nêu WHERE/IN; 2.3 giảng IN, 3.1–3.2 đếm và nhóm; 3.11 có cùng bối cảnh đếm hợp đồng. Đủ tiền đề; số đếm thực tế chưa kiểm độc lập. |

## Giới hạn và phiên bản

Review được giao cấu hình `gpt-6.1-terra`, reasoning effort `high`, ngữ cảnh mới; không có bằng chứng độc lập về model thực tế. Nguồn được giao base `4066c0f` cùng thay đổi local; không dùng Git để kiểm diff. Tự tính SHA-256: MDX `bae70e3b61ae62d40a36ed5a3e05ede6f92950088df66de2a2836aa11113762d`; HTML bài `1fa6604942f7a585fc4c20b0d2f3a3acbcf5f6aeac53871206e7b96c93ea4aec`, khớp gói giao. HTML bài tập được đọc riêng phần yêu cầu, không kiểm hash.

Không chạy SQL/API, không mở browser hoặc kiểm tương tác/copy, không xác minh dữ liệu live, kết quả bộ chấm, sự khớp toàn bộ HTML với source hay build. Số liệu được kiểm bằng phép cộng trên các dòng source và đối chiếu hồ sơ, không phải bằng chứng chạy database.
