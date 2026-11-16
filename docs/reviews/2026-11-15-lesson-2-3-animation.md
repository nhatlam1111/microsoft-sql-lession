# Review độc lập bài 2.3 — 15/11/2026

## Finding

- **HTML, drawer WHERE — chú thích bảng sai:** “hàng cuối đếm riêng từng điều kiện trên cả 48 dòng”, nhưng bảng HTML chỉ có bốn hàng NV002, NV003, NV030, NV043 và không có hàng tổng. Người học có thể tưởng hàng NV043 là số tổng, hoặc tìm mãi không thấy số đếm. Đề xuất bỏ mệnh đề về hàng cuối nếu không chủ ý hiển thị tổng; nếu cần số tổng, hiển thị và gắn nhãn rõ trên đúng phạm vi. Đây là nhận xét HTML; chưa kiểm tương tác hay nguyên nhân trong component.

## Giữ được

- Phần hiện giảng ý nghĩa OR/IN, AND, nhóm ngoặc, hai mốc BETWEEN và mẫu LIKE trước khi cần dùng. Phân biệt dấu AND trong BETWEEN với AND nối hai điều kiện; ví dụ NV003/NV002 giải thích vì sao giữ/loại. Trình tự cấu trúc mới → SQL → minh họa → tóm tắt → kết quả → trả lời tình huống được giữ.
- Ba ảnh tĩnh và các khung chuyển động được giao nhất quán với SQL và các dòng trong source: NV002 sai ngày, NV030 sai phòng, NV003 và NV043 đạt cả hai; bước chọn cột giữ hai dòng, bốn cột và tiêu đề tương ứng. Hình phân biệt 4/48 dòng, 5/12 cột trích và kết quả đủ hai dòng; có nhãn xử lý logic. HTML có hình theo bước, bảng và alt tương ứng. Đây là đối chiếu nội bộ, không xác nhận số liệu database live.
- Câu tự kiểm tra có đủ tiền đề trong phần hiện: một ô không đồng thời mang hai mã khác nhau; BETWEEN gồm đầu mút trên cột date; `_` và `%` khác nhau về số ký tự. Ví dụ LIKE giải thích rõ tìm chuỗi, không suy ra tách từ.

## Tiền đề từng đề

| Đề | Cách nghĩ và tiền đề đọc được trước bài tập | Đánh giá |
|---|---|---|
| 2-3-1 | Chọn đúng bốn cột; nhóm hai mã rồi kết hợp điều kiện trạng thái có dấu, không lọc ngày. SELECT/WHERE ở 2.1–2.2; OR/IN, AND và nhóm ngoặc ở 2.3; N cho chuỗi Việt ở 2.2. | Đủ trong phần hiện. |
| 2-3-2 | Chọn bốn cột theo thứ tự, lọc một trong hai mã và ngày gồm hai mốc, không lọc trạng thái. Cú pháp ngày 2.2; IN, AND, BETWEEN và hai đầu mút 2.3. | Đủ trong phần hiện. |
| 2-3-3 | Chọn hai cột và tìm chuỗi ở bất kỳ vị trí bằng mẫu có phần bất kỳ trước và sau; N cho tiếng Việt. LIKE, % và ví dụ chứa chuỗi ở 2.3. | Đủ trong phần hiện. |
| 2-3-4 | Chọn hai cột; mẫu có phần bất kỳ trước H và đúng một ký tự sau H rồi kết thúc. Ví dụ mẫu kết thúc bằng `_` và quy tắc `%`, `_` ở 2.3; so chữ không phân biệt hoa thường theo mô tả bộ mẫu. | Đủ trong phần hiện. |

## Phạm vi và giới hạn

- Đã đọc bài, drawer, 2.1–2.2, YAML, HTML và bốn ảnh được giao. Hash MDX `BDA33A719244682DA76686DA235B6A1AEC50AC0622F738A1C84463427A7AC723`, YAML `8695C1A88F35884718BC992CD2527913FB752F54A5406FA1D0EEE984C7FF8191`, HTML `3D0F5A2067D888B5E6ECF2D86A3EBA49DB80960A19ED74C6A7F57A86E5AEEA25` khớp gói giao; base HEAD và diff được giao, chưa tự xác minh Git.
- Sai sót quy trình review: lệnh đọc YAML đã in cả answer cùng đề trước khi tự lập cách làm từng đề. Bảng trên là đánh giá tiền đề sau khi đã nhìn answer, không thể nhận đã làm độc lập trước khi mở answer. Cần reviewer/kiểm độc lập khác nếu yêu cầu bằng chứng này bắt buộc.
- Không chạy SQL/API, không kiểm database, không mở browser hay tương tác, không kiểm animation đầy đủ theo thời gian, thiết bị hẹp, bàn phím, giảm chuyển động hoặc lỗi tải ảnh. Không khẳng định các số tổng, collation hay kết quả SQL đã được kiểm live. Model/effort là cấu hình được giao; công cụ trong lượt này không xác nhận model thực tế.
