# Review độc lập bài 2.2 và ảnh động — 15/11/2026

## Kết quả

Không phát hiện finding có căn cứ trong phạm vi kiểm source và ba hình tĩnh. Đây không phải xác nhận SQL live, HTML hay UI. Chưa xác minh phiên bản model thực tế; cấu hình do lượt giao chỉ định `gpt-6.1-terra`, effort `high`, ngữ cảnh mới.

## Phần giữ được

- Bài giải thích `WHERE` trước câu hoàn chỉnh; câu SQL đặt sát minh họa, sau đó lần `NV001` bị loại và `NV020` được giữ, rồi đưa bảng trích và câu trả lời. Phân biệt thứ tự logic với cách thực thi, số dòng tổng với phần trích và cảnh báo thứ tự dòng.
- Lọc trạng thái dùng chuỗi Unicode; lọc ngày giải thích `>=` gồm ngày mốc, không tự có ngày cuối và cách viết `yyyymmdd`. Lời giảng bắt buộc có đủ trước bài tập, không phụ thuộc drawer.
- Ba cảnh tĩnh khớp dữ liệu bước về bốn dòng trích, dòng loại/giữ, bốn cột và tiêu đề. Chú thích hình nêu phạm vi trích 4/48 dòng, 4/12 cột; số 14 và 12 là số tổng, không bị trình bày thành toàn bộ bảng trong hình. `AS` thuộc `SELECT`. Manifest liệt kê các cảnh, nguồn và hash; hash năm ảnh xuất khớp giá trị trong manifest.

## Tiền đề từng đề

Đã tự xác định cột, điều kiện và thứ tự trước khi mở đáp án YAML; đối chiếu sau đó thấy đáp án phù hợp đề ở mức source.

| Đề | Cách suy ra và tiền đề | Đánh giá |
|---|---|---|
| 2-2-1 | `SELECT` đúng ba cột theo thứ tự, `FROM NhanVien`, lọc `MaPB` bằng mã KT; không lọc trạng thái. Bài 2.1 dạy chọn cột, bài 2.2 dòng 41–47 dạy so mã. | Đủ tiền đề. |
| 2-2-2 | Chọn bốn cột đề cho; lọc `TrangThai` bằng giá trị tiếng Việt có tiền tố Unicode. Bài 1.3 giải thích Unicode, bài 2.2 dòng 135–137 hướng dẫn điều kiện trạng thái. | Đủ tiền đề. |
| 2-2-3 | Chọn ba cột đề cho; so `NgayVaoLam` từ mốc gồm ngày mốc bằng `>=`, viết ngày theo năm tháng ngày. Bài 2.2 dòng 139–141 giải thích cả biên, không có mốc cuối và chuyển kiểu. | Đủ tiền đề. |

## Phạm vi và giới hạn

Đã đọc toàn bộ MDX và YAML, source dựng `scripts/animations/render-where.mts`, manifest và xem `from.png`, `where.png`, `select.png`; đối chiếu các đoạn tiền đề trực tiếp ở bài 1.3 và 2.1. Kiểm hash các ảnh bằng `Get-FileHash`. SHA-256 MDX `2baece33603aaec1ddc8ee0aedba065282725d5af4bc4d469c31fc79296b8609`, YAML `ea6d87c86445a15fed27ddec81609f5ae41adc81de92b81c62d588fb40578be0`, nguồn dựng `181df1d54428bcf11f19a0c76f393e4327394e3dcd13c11ec68995c8ea881403`.

Không chạy SQL/API, không kiểm build/HTML hoặc tương tác trình duyệt, bàn phím, giảm chuyển động, lỗi tải ảnh, kích thước trên màn hình hẹp hay thực tế tự phát/dừng; không xác nhận các số và lỗi từ database live. Chưa xem GIF chạy hoặc kiểm thời lượng từng cảnh; thử đọc metadata bằng Python nhưng môi trường Python không có Pillow. Chưa kiểm fingerprint tính lại hoặc so sánh diff với phiên bản trước; hash ghi nhận bản đã đọc, không chứng minh bằng chứng cũ tương ứng. Các phần này cần kiểm riêng theo tác động, không suy ra từ hình tĩnh hay source.
