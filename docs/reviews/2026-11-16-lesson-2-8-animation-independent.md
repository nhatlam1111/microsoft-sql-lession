# Review độc lập bài 2.8 và ảnh động — 16/11/2026

## Cách tự làm trước khi xem đáp án YAML

- 2-8-1: từ ngày chốt cộng một tháng, lấy số tháng; so với tháng của NgaySinh; chọn ba cột và sắp MaNV tăng.
- 2-8-2: lọc TrangThai Đang làm và NgayVaoLam không sau ngày chốt; cộng một năm vào ngày vào làm, chỉ giữ mốc lớn hơn ngày chốt; chọn mã, ngày vào, mốc có bí danh; sắp ngày vào rồi mã tăng.
- 2-8-3: giữ NgayKetThuc lớn hơn ngày chốt và không vượt ngày cuối tháng chứa ngày chốt; tính DATEDIFF theo ngày từ ngày chốt đến ngày kết thúc, chọn bốn cột và sắp ngày kết thúc rồi mã tăng. So sánh loại NULL.
- Tự kiểm 1: 30 ngày khoảng cách nhưng tính cả hai đầu là 31 ngày lịch. Tự kiểm 2: cộng hai năm vào ngày bắt đầu, đối chiếu 15/11/2026 với 14/11/2026. Tự kiểm 3: cộng tháng rồi lấy tháng 11; cuối tháng chốt là 31/10. Tự kiểm 4: điều kiện trên là trước đầu ngày 21/11 để bao gồm 20/11 lúc 15:00.

## Kết quả review

Không thấy finding có đủ căn cứ trong phạm vi đã kiểm. Đây không phải xác nhận dữ liệu live, build hay UI. Cách làm ghi trước khi mở YAML phù hợp logic đáp án; không chép đáp án vào report.

### Phần giữ được

- Cấu trúc mới xuất hiện trước SQL đầy đủ, tiếp đến minh họa thứ tự logic, tóm tắt nguyên nhân, kết quả và câu trả lời. Hai biên `date` được lấy; khoảng cách 30 ngày nhưng bao gồm 31 ngày lịch. DATEDIFF đếm ranh giới; bài phân biệt điều đó với mốc đủ năm. Điều kiện trên cột có giờ giải thích được vì sao dùng đầu ngày kế tiếp.
- Từ dữ liệu bước, các phép tính 21/10 → 31/10 = 10, 21/10 → 13/11 = 23, 21/10 → 14/11 = 24; thứ tự cuối là 31/10, 13/11, 14/11. Các dòng minh họa qua lọc đúng hai biên; NULL không qua; các trường hợp trước/sau khoảng được loại. Không suy tổng 55, 20, 13, 3 từ bảng trích.
- GIF giải mã được 101 frame 1080×824. Đã xem các frame 0, 20, 32, 45, 55, 65, 75, 85, 100 và đối chiếu source chuyển động: trước/trong/sau lọc, tính và đổi thứ tự. Hai dòng trích được chuyển, 24 và 10 đến đúng dòng, hai dòng đổi chỗ; dòng thứ ba không hiện được chú thích. Nguồn ghi 5/55 dòng, 2/6 cột; kết quả ghi 2/3 dòng, 3/5 cột và thứ tự trước ORDER BY là minh họa. Chuyển động tạm đi qua vùng nguồn, song các ô đến đích đúng và không thấy lỗi giá trị trong các khung đã xem.

### Tiền đề từng đề

| Đề | Tiền đề và nơi đã dạy | Nhận xét |
|---|---|---|
| 2-8-1 | Bài 2.1 chọn cột; 2.2 WHERE và `=`; 2.4 ORDER BY; 2.8 mục Tìm tháng kế tiếp giải thích DATEADD lồng MONTH và so số tháng. | Đủ để viết; đề chốt phạm vi chỉ theo tháng. |
| 2-8-2 | 2.4 ví dụ `TrangThai = N'Đang làm'`, sắp hai tiêu chí; 2.3 AND; 2.8 mục Kiểm đã đủ năm dạy mốc `>` và chặn ngày bắt đầu sau chốt, SELECT/AS ở cấu trúc mới. | Đủ; đề tự định nghĩa mốc một năm. |
| 2-8-3 | 2.8 cấu trúc mới dạy DATEDIFF, NULL và hai biên; mục Đổi mốc trên thành cuối tháng dạy EOMONTH và `>`; 2.4 sắp hai tiêu chí. | Đủ; đề nói rõ bỏ ngày chốt và lấy ngày cuối. |
| Tự kiểm 1 | Cấu trúc mới: khoảng cách 30 ngày, lấy hai đầu là 31 ngày lịch. | Đủ. |
| Tự kiểm 2 | Mục Đếm ranh giới tháng, năm cung cấp ngày bắt đầu và kết thúc; mục Kiểm đã đủ năm tính mốc và so với ngày kết thúc. | Đủ, cần nhìn lại ví dụ ngay phía trên. |
| Tự kiểm 3 | Mục Tìm tháng kế tiếp và Đổi mốc trên thành cuối tháng cho cả hai phép tính. | Đủ. |
| Tự kiểm 4 | Mục Lọc hết ngày cuối trên cột có giờ giải thích mốc và lý do. | Đủ. |

### Phạm vi và giới hạn

- HEAD `16a5188b6cdc5fa17fea979c70faee6ae3535f43` cộng diff: bài MDX đã sửa; nguồn render và thư mục ảnh chưa theo dõi. SHA-256 MDX `E9BE18FEF649D4937EBB271F243EA04DF7C5F01A72FE9DF0C28AD1024A7C0854`; YAML `5E6248F11D6BDD3001D50DC1712BB81D6FC1706AC15B837C7C2BB260D004FE3B`; render `51C65AC551CEF92B976529F30088DC165436125F7C2EE7552CA817349E2C283C`; GIF `02B23B16A0EA3F00147BA7CA929BBD07082374680349F9421FB608F157709F3C`. Hash GIF khớp manifest; chưa tính lại fingerprint toàn phụ thuộc hoặc xác minh các hash ảnh tĩnh.
- Kiểm source và khung GIF, không kiểm HTML build tương ứng vì chưa có; không thử UI, đọc màn hình, bàn phím, giảm chuyển động hoặc bố cục màn hình hẹp. Không chạy SQL/API, không xác minh tổng, schema hay dữ liệu live; không xem toàn bộ frame hoặc kiểm tốc độ đọc thực tế. Không đọc report cũ. Không nhận các giới hạn đó là lỗi sản phẩm hay bằng chứng đạt kiểm phát hành.
- Reviewer được giao cấu hình `gpt-6.1-terra`, effort `high`, ngữ cảnh mới; không có bằng chứng độc lập về model thực tế trong công cụ review.
