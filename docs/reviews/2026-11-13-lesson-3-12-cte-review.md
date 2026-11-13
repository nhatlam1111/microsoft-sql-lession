# Review độc lập bài 3.12 — CTE

## Nhận xét cần xử lý

1. **HTML tĩnh, gợi ý cạnh nút hoàn thành:** “Bấm khi bạn tự viết lại được câu lệnh mà không nhìn bài.” Trong bài, bốn câu tự kiểm được giới thiệu là điều kiện trước khi bấm; template quy định gợi ý “Bấm khi bạn trả lời được các câu tự kiểm tra cuối bài mà không nhìn bài.” Hai chỉ dẫn đặt tiêu chí khác nhau, dễ khiến học viên nghĩ phải nhớ nguyên câu SQL. Đề nghị đối chiếu và sửa gợi ý chung cho khớp template; kiểm ảnh hưởng các bài khác vì đây có thể là thành phần dùng chung. Đây là nhận xét từ HTML tĩnh, chưa thử tương tác.

Không thấy lỗi nội dung SQL hay thiếu tiền đề rõ ràng trong phạm vi đã đọc. Nhận định này không xác nhận số liệu hoặc cú pháp bằng chạy thực tế.

## Ma trận tiền đề từng đề

| Đề | Cách làm suy ra và tiền đề | Đánh giá |
|---|---|---|
| 4-1-1 | Lọc đơn đã duyệt theo tháng 8 trong CTE, nhóm `LoaiNghi` và cộng `SoNgay`, câu ngoài lọc tổng từ 2 và xếp theo đề. Mẫu tháng 9 giảng rõ khoảng tháng, `SUM`, lọc nguồn và lọc nhóm; 3.2 giảng `GROUP BY`; 3.11 giảng lọc tổng ở tầng ngoài. | Đủ tiền đề; một CTE là thay đổi từ mẫu hai CTE và cú pháp một CTE được nói rõ. |
| 4-1-2 | Đầu tiên lọc hồ sơ đang làm và xuất `MaPB`; bước hai nhóm theo mã phòng và `COUNT(*)`; câu ngoài lọc từ 8, xếp mã. Bài 3.2 đã làm chính phép lọc/đếm theo phòng; 3.1 giải thích `COUNT(*)`, bài này nêu đổi từ cộng sang đếm, đặt tên và thứ tự CTE. | Đủ tiền đề; đếm dòng, không suy thành số người duy nhất. |
| 4-1-3 | Nhóm mọi dòng `HopDong` theo `MaNV`, đếm; SELECT cuối đọc CTE và lọc hai mã bằng `IN` để đối chiếu; sau đó thêm CTE lọc số đếm từ 2 và trả hai cột theo mã. 3.11 có nhóm mẫu NV004/1 và NV021/3; 2.3 giảng `IN`; bài này giảng thay SELECT cuối, giữ phần WITH cần thiết và đặt điều kiện trên cột CTE. | Đủ tiền đề nhưng phải nối các chỉ dẫn ở bài này với 2.3. Bước kiểm hai mã không nằm trong bảng cuối; chỉ đọc source/HTML không xác minh được hệ thống có kiểm thao tác trung gian. |

**Giới hạn quy trình:** Lệnh đọc YAML đầu tiên của tôi đã vô tình hiển thị cả phần thân `answer` vì chỉ loại dòng nhãn, không loại các dòng thụt dưới nhãn. Vì vậy không thể khẳng định đã tự giải độc lập cả ba đề trước khi xem answer. Ma trận trên là đối chiếu tiền đề sau khi lộ đáp án; cần một lượt làm đề độc lập khác nếu đây là điều kiện nghiệm thu bắt buộc.

## Bốn câu tự kiểm

| Câu | Tiền đề đã có | Đánh giá |
|---|---|---|
| Thứ tự và dấu ngăn hai CTE | Đoạn sau LineMap nói một `WITH`, dấu phẩy, nguồn trước bước đọc. | Đủ; lời đáp nêu lý do phụ thuộc. |
| Dùng lại trong câu lệnh tiếp theo | Đoạn phạm vi một câu lệnh và quan hệ hai CTE trong mẫu. | Đủ; phải khai báo lại cả nguồn phụ thuộc. |
| Xem chín đơn trước khi cộng | Đoạn hướng dẫn giữ định nghĩa đầu, bỏ dấu phẩy/CTE thứ hai, thay SELECT cuối. | Đủ; câu trả lời chỉ rõ cột và nguồn. |
| Ngưỡng năm ngày giữ Nghỉ ốm | Lần ba đơn 1 + 2 + 2 và phân biệt WHERE đầu với WHERE ngoài. | Đủ; có lý do và ví dụ biên bằng 5. |

## Phần giữ được

- Tình huống nêu rõ tháng bắt đầu và cộng toàn bộ số ngày kể cả đơn kéo sang tháng sau; không suy tổng này thành số ngày nghỉ thực tế trong tháng.
- Mẫu ba đơn đi từ từng dòng đến một dòng tổng; mô tả lọc đơn và lọc tổng giải thích vì sao giữ loại Nghỉ ốm. CTE thứ hai xuất đúng cột được câu ngoài đọc, và ví dụ kiểm trung gian chỉ rõ bỏ dấu phẩy cùng định nghĩa không cần.
- Đã phân biệt thứ tự logic của câu ngoài với cách SQL Server chọn thực thi; không hứa lưu sẵn kết quả hay nhanh hơn. Chuyển đào sâu thực thi và lưu định nghĩa sang bài sau phù hợp phạm vi.
- HTML tĩnh thể hiện tình huống, hai tiểu mục, sơ đồ logic, bốn câu tự kiểm và ba tiêu đề bài tập. Bảng kết quả và ba tổng tương ứng dữ kiện mục 7 hồ sơ công ty; chưa thể coi đó là kiểm database.

## Phạm vi và bằng chứng

- Bản được giao: base `4066c0f` và diff local; chưa tự kiểm Git/diff theo giới hạn công cụ. SHA-256 đã đối chiếu: MDX `9D3634FD04780A4EEFADC9677BF92C5A8EA479D7C4DEE99B97896A55BFAB82DE`; YAML `159438F1BF770E709FB89DF9E11B5C1C9AC6DCF5F5A9B3A59E7EE892830670EF`; HTML `C115C15C895C14800834543896EBF27DCD2B5CE4EA9FA5A51F582AC96673A0C4`.
- Đọc toàn bộ MDX, khối/drawer trong source và YAML; đối chiếu HTML tĩnh và các tiền đề được giao. Chưa chạy SQL/API, kiểm dữ liệu live, build, hoặc thử UI, drawer, copy, bàn phím hay chấm bài. Hash khớp không chứng minh SQL đã chạy hoặc HTML hoạt động tương tác.
- Cấu hình reviewer theo gói giao; không có bằng chứng công cụ trong lượt này để xác minh model thực tế/effort. Không đọc report cũ hoặc seed/secret.
