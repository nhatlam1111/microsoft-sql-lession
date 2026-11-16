# Review độc lập bài 2.6 và ảnh động — 16/11/2026

## Cách tự làm trước khi xem đáp án

- 2-6-1: Chọn nguồn NhanVien, chỉ đưa MaCD vào danh sách chọn với DISTINCT; không lọc; sắp chính MaCD tăng dần.
- 2-6-2: Lọc MaPB thuộc hai mã IT và NS bằng IN; chọn đúng hai cột theo thứ tự đề, dùng DISTINCT trên cả cặp; sắp MaPB rồi MaCD, đều tăng dần.
- 2-6-3: Lọc NgayNghiViec có giá trị bằng IS NOT NULL; chỉ chọn MaPB với DISTINCT; sắp MaPB giảm dần, không thêm điều kiện khác.

Các cách làm trên được ghi trước khi xem YAML đáp án. Không dựa vào kết quả cụ thể chưa chạy SQL.

## Kết luận và finding

Không thấy finding có căn cứ trong phạm vi đã kiểm. Không xem YAML đáp án: ba đề đủ rõ để xác định cách làm độc lập và không cần đáp án để đánh giá tiền đề. Đây không phải xác nhận chấm bài, SQL live hay giao diện đã hoạt động.

## Những điểm giữ được

- Phần chính trả lời được vì sao có thể còn hai dòng cùng mã phòng: `DISTINCT` so toàn bộ cột được chọn; `KD, CV` trùng cả cặp, còn `KD, CVC` khác chức danh. Thêm `MaNV` làm đổi khóa so sánh, không sửa dữ liệu nguồn. Bài phân biệt danh sách cặp với hồ sơ nhập trùng.
- Cấu trúc mới xuất hiện trước SQL đầy đủ, SQL sát AnimatedFlow, sau đó có giải thích nguyên nhân, Result và câu trả lời cho chị Hạnh. Lọc trước khi bỏ trùng và thay đổi số cột chọn được giải thích ngoài drawer.
- Source các bước là FROM → SELECT → DISTINCT → ORDER BY; bảng năm dòng nguồn suy ra năm cặp SELECT, trong đó hai `KD, CV` thành một, còn `KD, CVC` riêng. Drawer DISTINCT có thêm `IT, CV` từ phần không trích ở đầu vào; các bảng đều ghi là trích. Tám dòng Result khớp tám dòng ORDER BY của source. Không thể suy tổng 19 hay 6 từ những dòng trích này.
- GIF được giải mã bằng Pillow: 1080 × 824, 110 frame mã hóa, tổng 23,67 giây. Xem frame 0, 8, 13, 18, 25, 32, 40, 47, 54, 61, 68, 75, 82, 89, 96, 104, 109: cột chuyển trước/sau SELECT, từng cặp chuyển ở DISTINCT, cặp thứ năm nhập vào `KD, CV`, rồi bốn cặp được sắp. Bốn cặp sau ORDER BY được ghi rõ không phải bốn dòng đầu của toàn kết quả. Nhãn 48 → 19 chỉ tổng toàn bộ, còn bảng DISTINCT trích 4/19; không thấy nhầm tổng với phần trích. Kiểm này không chứng minh các giá trị hay tổng đúng với database.

## Tiền đề từng đề

| Đề | Tiền đề và nơi học | Đánh giá |
|---|---|---|
| 2-6-1 | 2.1 chọn cột và FROM; 2.4 ORDER BY/ASC; 2.6 cấu trúc DISTINCT và rút một cột | Đủ để chọn MaCD một lần, không lọc, sắp tăng. |
| 2-6-2 | 2.3 IN và nháy đơn cho từng mã; 2.4 sắp nhiều cột; 2.6 so cả cặp và WHERE trước DISTINCT | Đủ để lọc hai phòng rồi chọn đúng cặp và thứ tự. |
| 2-6-3 | 2.5 IS NOT NULL; 2.2 cột lọc không cần trả về; 2.4 DESC; 2.6 rút một cột và lọc trước so trùng | Đủ để lọc ngày có giá trị, trả mã phòng duy nhất và xếp giảm. |

Bài 2.6 không có câu tự kiểm riêng để kiểm tiền đề.

## Giới hạn và bằng chứng

- Source được giao là HEAD cộng diff, chưa có build tương ứng. SHA-256 MDX `DFDEC7C16310E904165CDA3F00312F88D556A7466C099CF53B30594CA2125BF9`, nguồn dựng `32115FAEF84A1D1043618EBE0E24C2FD5F1A3807C2A39130B9720837EDAC28AA`, GIF `73D1A3943E659AC4C67F726FB7C3C407239EFE32CFDDF624E98B1247165534E0`. Hash chỉ định danh file đã đọc, không chứng minh dữ liệu đã được kiểm SQL.
- Không chạy SQL/API, không kiểm HTML build, không thử UI, nút phát/dừng, bàn phím, giảm chuyển động, ảnh lỗi hoặc màn hình hẹp. Chưa xác minh 48 hồ sơ, 19 cặp, 6 mã phòng, thứ tự tám dòng đầu và giá trị trong database; cần bằng chứng SQL ở đúng phiên bản dữ liệu. Không suy hiệu lực manifest/fingerprint từ việc đọc manifest.
- Reviewer được giao cấu hình `gpt-6.1-terra`, effort `high`, `fork_turns: none`; không có bằng chứng công cụ xác nhận model thực tế. Không đọc report cũ hoặc hồ sơ tác giả.
