# Xử lý review 4.1 — 26/10/2026

Đã đọc toàn bộ [report gốc](2026-10-26-bai-4-1.md) trước khi sửa. Report giữ nguyên phiên bản đã review; MDX sau sửa đổi hai câu biên tập, YAML không đổi. Người xử lý: tác giả native.

| Mục | Quyết định | Căn cứ, việc làm và trạng thái |
|---|---|---|
| R1 — “câu sau” trong summary | Làm theo | Đổi thành “phần truy vấn phía sau… cùng một câu lệnh”, khớp phạm vi đã giảng. Đã sửa. |
| R2 — CTE cuối không được dùng ở câu kiểm đầu (quyết định lượt đầu) | Làm một phần | Đã xác minh cấu trúc với tài liệu CTE Microsoft và chạy fixture nhận đúng 9 đơn; chưa có SQL Server live để chốt việc compiler chấp nhận nguyên khối. Microsoft nêu phạm vi một câu, câu sau tham chiếu cột CTE và cho nhiều định nghĩa; không nêu mọi tên phải được câu cuối đọc. Giữ nguyên mẫu kiểm đúng thiết kế đã duyệt, không biến nghi vấn thành lỗi đã xác nhận. Mục kiểm SQL Server còn mở; không tuyên bố fixture là chứng minh T-SQL. Nếu suy luận sai, mẫu kiểm có thể bị chặn. |
| R3 — câu chốt phạm vi/bài sâu hơn | Làm theo | Gộp vào đoạn giới hạn, chỉ tới 4.5 về lưu định nghĩa truy vấn; không nói CTE được lưu. Đã sửa. |
| Mục tiêu/thời lượng | Làm theo | Giữ mục tiêu kiểm từng phần và 30 phút ước lượng; chưa có đo học thật. |
| Tình huống/giả định | Làm theo | Giữ tháng bắt đầu, nguyên SoNgay, trạng thái và ngưỡng bao gồm 5; không thêm nghiệp vụ ngoài đề. |
| Định nghĩa/bí danh/phạm vi | Làm theo | Giữ giải thích nguồn CTE, một WITH, hai phạm vi SELECT; không thêm lý thuyết từ answer. |
| Kiểm bước và thực thi | Làm theo | Giữ hướng dẫn chạy trọn WITH, không lưu bảng/tăng tốc; giới hạn R2 như trên. |
| Web/SSMS và đường thực hành | Làm theo | Giữ một statement bắt đầu WITH; không buộc dùng SSMS. HTML ba route tồn tại; tương tác chưa kiểm. |
| Kết quả/RunFlow | Làm theo | Giữ 9→3→2, tổng 9/5/2, flow SELECT ngoài 3/2/2/2; fixture và HTML đã đối chiếu. |
| HTML/tab/copy | Làm theo | Giữ SQL khớp payload, nháy thẳng; chưa kết luận clipboard/tab bốn cột từ HTML. |
| Hay nhầm/Ứng dụng/Memo/tự kiểm | Làm theo | Giữ ba mục và vị trí ôn; không kéo dài phần đã đủ. |
| Ba đề/bảng tiền đề/bộ chấm | Làm theo | Giữ đề và phân biệt chấm kết quả với kỹ thuật. Đã đối chiếu fixture ba answer, không thay review thành SQL live. |

Nguồn tác giả: [CTE Microsoft](https://learn.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql?view=sql-server-ver17), [danh mục lỗi SQL Server, gồm 422](https://learn.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-events-and-errors-0-to-999?view=sql-server-ver17). Mã lỗi 422 tồn tại không tự chứng minh khối này gây lỗi. Không dựa vào câu trả lời diễn đàn làm kết luận kỹ thuật.

Kiểm: 308 test/43 files; check 0 errors/0 warnings/3 hints nền; build120 trang và check:dist1868 link; API66 bài/typecheck. SQL live: check:exercises và check:data bị chặn trước kết nối do thiếu cấu hình. UI: thiếu binary Chromium; tải shell trả file không hợp lệ, chưa thử tương tác. HTML kiểm riêng sáu payload/nháy/tab escape/đúng thứ tự mục. R1/R3 chỉ prose, không thêm snapshot test.

Cập nhật sau review tích hợp: **Làm theo về việc rút các định nghĩa chưa cần dùng**. Câu kiểm đầu hiện chỉ khai báo DonDaDuyetThang9 rồi đọc nó; sửa đồng thời đoạn hướng dẫn kiểm đơn/kiểm tổng và tự kiểm tra. Câu chính, các flow, kết quả và ba đề không đổi. Quyết định này thay việc giữ nguyên mẫu ở lượt đầu, không khẳng định bản cũ chắc chắn lỗi. Bỏ cấu trúc không cần thiết cũng loại riêng nghi vấn compiler DJ1 khỏi payload hiện tại; SQL live chung vẫn chưa được xác minh. Không tạo test buộc khớp câu chữ hoặc giả vờ SQLite tái hiện lỗi SQL Server; kiểm lại giá trị/guard/HTML/build theo test sẵn có.
