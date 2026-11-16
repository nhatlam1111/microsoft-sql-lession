# Review độc lập bài 2.5 và ảnh động — 16/11/2026

## Tự giải trước khi xem đáp án

- 2-5-1: Chọn ba cột yêu cầu từ NhanVien, lọc NgayNghiViec IS NOT NULL, sắp MaNV ASC.
- 2-5-2: Chọn ba cột yêu cầu, giữ MaPB bằng KD và Email IS NOT NULL bằng AND, sắp MaNV ASC.
- 2-5-3: Chọn MaNV, HoTen và COALESCE(Email, nhãn Unicode), lọc MaPB bằng KD, sắp MaNV ASC; không lọc email.

## Finding

- **Ảnh / source renderer — chuyển WHERE → SELECT:** Ảnh WHERE đặt `NV008` trên `NV044`; ảnh SELECT ngay sau đó đảo thành `NV044` trên `NV008`, dù không có cảnh giải thích đổi thứ tự. Dòng “trước ORDER BY, thứ tự dòng có thể khác khi chạy” đúng về các lần chạy nhưng không giải thích vì sao hai dòng của cùng luồng minh họa đổi chỗ ngay ở SELECT. Người mới có thể tưởng thao tác ghi nhãn đã tự đảo dòng. Đề xuất giữ cùng thứ tự qua WHERE → SELECT và chọn đầu vào ví dụ khác để minh họa sắp xếp, hoặc nói rõ đây là hai thứ tự trích minh họa độc lập trước khi trình bày bước ORDER BY; đảm bảo hình, HTML và lời kể đồng bộ.

## Giữ được

- Phần luôn hiện giải thích `IS NULL`/`IS NOT NULL`, `= NULL` cho UNKNOWN và WHERE chỉ giữ đúng; `COALESCE` lấy giá trị đầu tiên khác NULL, không sửa nguồn. Phân biệt NULL với 0, chuỗi rỗng, dấu cách và chữ NULL; ý nghĩa ngày nghỉ gắn với quy ước bộ mẫu. Có cấu trúc trước SQL, SQL sát luồng, tóm tắt, bảng và câu trả lời tình huống.
- Bốn hồ sơ minh họa hai điều kiện hợp lý: NV008, NV044 qua lọc; NV033 có ngày nghỉ, NV045 khác phòng. NV044 được gắn nhãn trong kết quả mà nguồn giữ NULL. Từng bước và bảng kết quả cuối nhất quán về các giá trị được đối chiếu; số liệu tổng và khẳng định `ISNULL` mất dấu chưa được kiểm live.
- Manifest có alt và chú thích phạm vi; sáu hash ảnh/GIF khớp file public, các file đó giống bản dist. HTML có ảnh bìa, bốn hình bước, alt, kích thước, liên kết ảnh gốc và dữ liệu các mã đại diện. Các ảnh tĩnh đã xem đầy đủ; đã xem mẫu khung chuyển dòng, đổi nhãn và xếp trong GIF. Bảng, nhãn và SQL đọc được ở ảnh gốc; chưa đánh giá thực tế ở 720 px hay màn hình hẹp.

## Tiền đề từng đề

| Đề | Cách làm đã tự xác định trước đáp án | Tiền đề ở phần bắt buộc | Đánh giá |
|---|---|---|---|
| 2-5-1 | Chọn cột, lọc ngày đã có, xếp mã tăng | SELECT/FROM 2.1, WHERE 2.2, ORDER BY ASC 2.4; IS NOT NULL ở 2.5 và vận dụng mọi phòng | Đủ để làm; khớp cách giải trong YAML. |
| 2-5-2 | Chọn cột, kết hợp mã KD và email đã có, xếp mã | Thêm AND 2.3; phép so mã 2.2; IS NOT NULL và phạm vi có email 2.5 | Đủ để làm; khớp cách giải trong YAML. |
| 2-5-3 | Chọn cột, COALESCE nhãn Unicode, chỉ lọc KD, xếp mã | COALESCE và giữ cả dòng thiếu ở phần chính/vận dụng 2.5; chuỗi Unicode N ở 1.3 và 2.5; các cấu trúc còn lại 2.1–2.4 | Đủ để làm; khớp cách giải trong YAML. |

## Phạm vi và giới hạn

Review độc lập được giao cấu hình gpt-6.1-terra/high, ngữ cảnh mới; không có bằng chứng công cụ xác nhận model thực tế. Đã đọc toàn bài và drawer trong source, đề ẩn đáp án trước khi mở YAML, tiền đề liên quan 1.3 và 2.1–2.4, source dựng, manifest, HTML dist và ảnh như trên. Đối chiếu ảnh với source/HTML là kiểm tĩnh; không chạy SQL/API, không đọc seed, không kiểm UI tương tác, bàn phím, tải lỗi hay reduced motion. Chưa chứng minh dữ liệu live, thời lượng đọc thực tế hoặc tính mới của fingerprint đầu vào bằng phép tính độc lập. Không dùng HTML làm bằng chứng tương tác hay hash ảnh làm bằng chứng SQL.
