# Review độc lập bài 2.9 và ảnh động

## Cách làm tự xác định trước khi xem answer YAML

- 2-9-1: Lọc phòng IT, trạng thái đang làm và ngày vào không sau ngày chốt bằng `AND`; chọn hai cột gốc và CASE: mốc một năm không sau ngày chốt thì nhãn đủ, còn lại nhãn chưa đủ; xếp mã tăng.
- 2-9-2: Lọc KD và ngày vào không sau ngày chốt, không lọc trạng thái/ngày nghỉ; CASE xét mốc ba năm trước, rồi một năm, ELSE cho dưới một năm; chọn đúng bốn cột và xếp mã tăng.
- 2-9-3: Lọc NS, đang làm, ngày vào không sau ngày chốt; CASE một WHEN mốc ba năm không sau ngày chốt, không ELSE, giữ mọi dòng qua lọc; chọn ba cột và xếp mã tăng.
- Tự kiểm 1: NV003 qua cả hai mốc, nhánh một năm đứng trước nên nhận nhãn một đến dưới ba năm, sai phân nhóm.
- Tự kiểm 2: mốc ba năm bằng ngày chốt, `<=` đúng, nhận từ ba năm trở lên.
- Tự kiểm 3: NV025 qua WHERE, mốc ba năm chưa đạt, CASE không ELSE trả NULL nhưng không loại dòng.

## Finding

Chưa thấy finding có căn cứ trong phạm vi kiểm độc lập. Không có kết luận này cho SQL live, HTML build hay tương tác UI.

## Phần giữ được

- Cấu trúc CASE được giải thích trước câu SQL đầy đủ; nhánh ba năm đứng trước một năm, ELSE xử lý phần còn lại trong phạm vi ngày đã lọc. Ví dụ NV003 giải thích vì sao thứ tự quan trọng; NV025 cho thấy DATEDIFF đếm ranh giới không đồng nghĩa năm tròn. Mốc bằng ngày chốt được tính đủ qua `<=`.
- Câu SQL sát AnimatedFlow, tiếp theo là tóm tắt, bảng trích và câu trả lời. `WHERE` giữ dòng, CASE tạo giá trị cột; tình huống nêu giới hạn của bản chốt và trạng thái hiện tại. Ví dụ bỏ ELSE giải thích NULL mà không làm mất dòng; phần thiếu ngày nói rõ giả định khác câu chính.
- Dữ liệu khai báo 48 → 45 → 45 → 45, ba nhóm 33 + 8 + 4 = 45. Các bảng trích cho biết phạm vi; mười dòng kết quả có mã tăng dần, các nhãn khớp ngày vào làm và mốc chốt theo phép tính thủ công. Không thể tự suy ra tổng 45 hay phân bố ba nhóm từ riêng các dòng trích.
- GIF giải mã 91 khung (một số khung trùng được gộp); đã xem các khung đầu, giữa và cuối chuyển dòng tại WHERE, từng nhánh CASE và ORDER BY. NV020 bị loại, NV003/NV025/NV045 nhận đúng ba nhãn, ba dòng được xếp tăng. Dòng trích và thứ tự minh họa được ghi rõ; cảnh cuối nói không phải ba dòng đầu. Chuyển động phù hợp source, không thấy sai giá trị hoặc nhảy nhánh trong các khung đã xem.
- Sau khi ghi cách làm độc lập, đã đối chiếu ba answer YAML: cùng cách lọc, nhánh, thứ tự cột và sắp xếp như cách giải trên. Không chạy answer.

## Tiền đề từng đề và câu tự kiểm

| Đề | Tiền đề đã tìm được trong phần giảng bắt buộc | Nhận xét |
|---|---|---|
| 2-9-1 | 2.1 chọn cột, 2.2 WHERE và chuỗi Unicode, 2.3 AND, 2.4 ORDER BY; 2.8 DATEADD và <=; 2.9 WHEN/THEN/ELSE và mốc năm | Đủ để lọc ba điều kiện và gán hai nhãn, tính cả ngày đúng mốc. |
| 2-9-2 | Các tiền đề chọn/lọc/xếp như trên; 2.9 ví dụ ba nhóm, giải thích nhánh đầu đúng, mốc ngày và lọc phạm vi | Đủ; đề tự nói rõ giữ cả hồ sơ nghỉ và tính đến ngày chốt, không dừng ở ngày nghỉ. |
| 2-9-3 | Các tiền đề chọn/lọc/xếp và mốc năm; 2.9 “Chỉ ghi nhãn cho hồ sơ đạt mốc” giải thích bỏ ELSE trả NULL mà vẫn giữ dòng | Đủ; đề chỉ rõ một WHEN và phân biệt NULL với chữ “NULL”. |
| Tự kiểm 1 | 2.9 thứ tự nhánh, mốc của NV003 và mục Hay nhầm 2 | Đủ để suy nhãn sai khi đưa nhánh một năm lên trước. |
| Tự kiểm 2 | 2.8 DATEADD/<= và 2.9 giải thích tính đúng ngày kỷ niệm | Đủ để xác định nhãn ba năm. |
| Tự kiểm 3 | 2.9 ví dụ NV025 và mục bỏ ELSE, phân biệt lọc với giá trị cột | Đủ để xác định còn dòng và ô NULL. |

## Phạm vi, phiên bản và giới hạn

- Review source HEAD `16a5188b6cdc5fa17fea979c70faee6ae3535f43` cộng diff đang có; đọc bài, drawer/steps, ba đề và các đoạn tiền đề liên quan, sau đó đối chiếu answer. Không đọc report cũ hay hồ sơ tác giả, không chạy SQL/API, không sửa sản phẩm/test/Git.
- SHA-256 lúc review: bài `7f3a7a2f2a027bdc661cdcd4ebb82ce48235fec776d6ab5641f429e7f6828f8c`; YAML `b934450085cba22acfbd8c997f45cd2f05e5680393bc26f4a5cb2e44a2560be5`; nguồn dựng `01d2300f714f5c6222c3d9cf796a0e0f14dbbf5b36257f9d841fb0c011aea1d2`; GIF `257f4b402b7b2362cb0d7a68af196b9ee23f893e264e7f8d4c000a9be5aa5e5f`.
- Source và ảnh đã xuất được kiểm riêng; chưa kiểm HTML build, tương tác UI, bàn phím, chế độ giảm chuyển động, màn hình hẹp hay SQL live. Build được giao là vừa tạo nhưng chưa xác minh sự khớp của build hoặc dữ liệu live; các tổng và nội dung nguồn chỉ được đối chiếu nội bộ, không xác nhận database. Cấu hình reviewer được giao Terra/high/ngữ cảnh mới; công cụ trong lượt không xác minh model thực tế.

