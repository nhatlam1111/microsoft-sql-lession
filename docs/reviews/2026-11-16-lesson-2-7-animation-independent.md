# Review độc lập bài 2.7 và ảnh động — 16/11/2026

## Phạm vi và cách kiểm

Review source bài, YAML, tiền đề 2.1–2.6 liên quan, nguồn `AnimatedFlow`, manifest và `render-strings.mts`; giải mã GIF bằng Pillow và xem các khung trước, giữa, sau lọc, tạo nhãn, sắp xếp. HTML được suy từ source component và dữ liệu bước, không phải HTML build: chưa có build tương ứng. Không chạy SQL/API, không thử UI. Reviewer được giao cấu hình gpt-6.1-terra/high, ngữ cảnh mới; không có bằng chứng độc lập về model thực tế.

**Giới hạn phương pháp:** khi đọc YAML tôi đã lấy toàn bộ file và thấy phần `answer` cùng lúc với đề, trước khi tự làm riêng từng đề. Vì vậy bảng dưới là đối chiếu tiền đề và cách giải sau khi đã thấy đáp án, không thể nhận đã tự làm từng đề trước đáp án như yêu cầu. Cần lượt kiểm bổ sung có che `answer` để đáp ứng đầy đủ điều kiện review.

## Finding

1. **Ảnh động: kết quả `LEN` không có đủ thời gian đọc.** Trong `scripts/animations/render-strings.mts:63,73,79`, `LEN(HoTen) → 13` và câu giải thích hai dấu cách chỉ hiện từ frame nguồn 111 đến 113, sau đó chuyển sang ORDER BY ở frame 114. GIF giải mã có khung hoàn chỉnh này trong 420 ms (khung GIF 75), quá ngắn để đọc và liên hệ chữ với con số. Cảnh tĩnh và lời giảng có thông tin, nhưng không sửa được việc người xem ảnh động bỏ lỡ bước tính. Đề xuất giữ cảnh SELECT hoàn chỉnh thêm đủ thời gian đọc rồi xuất lại GIF và hình liên quan; kiểm lại chuyển động thực tế.

## Phần giữ được

- Mục tiêu tình huống rõ phạm vi toàn bộ hồ sơ đang mang mã IT, không tự thêm trạng thái/ngày; SQL, thuyết minh và bảng cuối nhất quán về lọc, ba cột và sắp mã. Lời giải thích tách thứ tự logic khỏi cách thực thi. Số tổng và dữ liệu chỉ đối chiếu nội bộ source, chưa xác minh live.
- `RIGHT` giữ `007`, `UPPER` giữ dấu, `CONCAT` ghép dấu phân cách, `LEN` đếm tên gốc và bỏ dấu cách cuối được giải thích trước câu SQL. Ví dụ `SUBSTRING` đếm vị trí từ 1, điều kiện so phần cắt, `NULL` trong `CONCAT` và luật so sánh dấu có lời giải thích ở phần luôn hiện.
- Bảng kết quả 10 dòng khớp dữ liệu SELECT/ORDER BY trong source; đếm thủ công tên, nhãn và thứ tự các dòng nhất quán. Tên dài 14 ký tự tạo nhãn 20 ký tự vì thêm 3 chữ số và 3 ký tự phân cách.
- GIF ghi rõ nguồn trích 3/48 và 3/12 cột, kết quả lọc mẫu 2 trên tổng 10, SELECT lần một hồ sơ, ORDER BY trích 2/10; thứ tự trước sắp là minh họa. Qua các khung giải mã: NV003 bị loại; NV007, NV011 đi qua; mã và họ tên NV007 chuyển vào RIGHT/UPPER, nhãn được ghép; hai dòng đổi vị trí từ NV011/NV007 sang NV007/NV011. Không thấy sai dữ liệu hoặc đảo nghĩa lọc trong các khung đã xem.
- Source component dự kiến dựng chú thích/alt từ manifest, các bước có đầu vào, thực hiện, kết quả và bảng HTML; không lấy việc đọc source làm bằng chứng HTML đã build, thử bàn phím, phát/dừng, lỗi tải hay giảm chuyển động.

## Bảng tiền đề từng đề

| Đề | Cách làm và tiền đề sau đối chiếu | Đánh giá |
|---|---|---|
| 2-7-1 | Lọc KT không thêm điều kiện (2.2), chọn mã và hai biểu thức (2.1, 2.7), LEFT và SUBSTRING tại “Cắt theo vị trí”, xếp mã ASC (2.4); MaNV là khóa chính theo 2.6 nên không hòa. | Đủ tiền đề trong nội dung bắt buộc; cột, phạm vi và thứ tự được đề nêu. |
| 2-7-2 | Dùng LIKE với `%` ở cuối (2.3), COLLATE Latin1_General_CI_AI theo ví dụ trong 2.7, trả HoTen gốc và LEN, xếp MaNV ASC (2.4). | Đủ tiền đề; nguồn không bị mất dấu do phép so sánh. Không kết luận những hồ sơ thực tế khớp vì không truy vấn DB. |
| 2-7-3 | Lọc VH không loại đã nghỉ (2.2), chọn cột email gốc, UPPER và CONCAT với ngoặc, giữ NULL nguồn nhưng nhãn `[]` (2.5 và “Ghép khi thiếu giá trị” 2.7), xếp mã (2.4). | Đủ tiền đề; đề nói rõ phạm vi và phân biệt email nguồn/nhãn. |

Bốn câu tự kiểm đều có lời giảng trực tiếp trước đó: hàm lồng, vị trí SUBSTRING, N/COLLATE, và CONCAT với NULL. Không dùng bài sau làm tiền đề.

## Giới hạn và định danh bản kiểm

Chưa xác minh bằng SQL live các tổng, schema/collation hay kết quả trên cơ sở dữ liệu; chưa kiểm build, HTML thực tế, tương tác UI, kích thước vùng bài 720 px hoặc màn hình hẹp. Không suy độ đọc được ở các kích thước đó từ ảnh gốc. GIF lặp, 89 khung mã hóa sau gộp, dài khoảng 21,17 giây; số frame mã nguồn khác số frame GIF.

SHA-256 source tại thời điểm review:
- Bài MDX: `27e6a09834785c3769e73f51bf502a0caecce01b0018ae846ca5c1eae3be98c9`
- YAML: `8c44d25f2e995662c60b94f103c1e955a743129ab917619d72bcc6da33d3a03a`
- Nguồn dựng: `7e8a88ddf9e882074e2b5bba0510e578c0f548a819d72635811b0fa50267297d`
- GIF: `c0e80c860a205d0796799bdbc5553e1bd9599cb6bf3efc85c71a2e3b168d7755`
