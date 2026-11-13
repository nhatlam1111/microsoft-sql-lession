# Review tiền đề bài 3.12 — 13/11/2026

## Phạm vi và kết luận

Đọc source MDX bài 3.12 và các đoạn tiền đề được giao, tự tìm cách làm từ ba đề công khai trước khi xem bất kỳ đáp án nào. SHA-256 `src/content/lessons/3-12-cte-tung-buoc.mdx`: `5DF5B3135BAE1FBF76398AFB48D8DDE1BBA70F78304955C5E7C8EA06BA0648F4`. Base được giao `4066c0f`; không tự kiểm Git. Kết luận trong phạm vi này: **suy ra được cách làm cả ba đề và bước kiểm trung gian; chưa thấy thiếu tiền đề trực tiếp cần sửa**. Không suy ra rằng SQL đã chạy đúng hay bộ chấm chấp nhận.

## Tự làm và đối chiếu tiền đề

| Đề | Cách tự làm bằng lời và kết quả trung gian | Tiền đề và đánh giá |
|---|---|---|
| 4-1-1 | Tạo một CTE đọc đơn, chọn trạng thái đã duyệt và ngày bắt đầu từ đầu tháng 8 đến trước đầu tháng 9; ngay trong CTE gom theo loại, cộng số ngày và đặt tên cột tổng. Câu cuối đọc hai cột đó, giữ tổng từ 2 trở lên và xếp theo tổng giảm, tên loại tăng khi bằng nhau. Trung gian là một dòng mỗi loại sau lọc, chưa lọc ngưỡng. | Bài 3.12 dòng 44–57 có cùng lọc trạng thái/khoảng tháng, cộng và sắp xếp; dòng 70 cho một CTE và dòng 72 giải thích cột tổng có thể được lọc ở tầng ngoài. Bài 3.11 dòng 67–69 phân biệt lọc dòng nguồn trước nhóm và lọc tổng sau nhóm. Gộp lọc đơn và tổng hợp vào một CTE là cách chuyển từ hai bước ví dụ, không cần tiền đề mới. Đề đã nêu cộng toàn bộ ngày nên không phải tự chia số ngày sang tháng khác. Chưa biết tổng cụ thể tháng 8 vì không kiểm dữ liệu. |
| 4-1-2 | CTE đầu chỉ xuất mã phòng của mỗi hồ sơ đang làm, giữ một dòng cho mỗi hồ sơ; không khử trùng. CTE thứ hai đọc những dòng ấy, gom cùng mã phòng và đếm dòng, đặt tên số hồ sơ. Câu cuối giữ số từ 8, xuất mã và số đếm, xếp mã tăng. Trung gian đầu vẫn lặp mã phòng; trung gian hai có một dòng mỗi mã được nhóm. | Bài 3.12 dòng 70, 74 dạy thứ tự hai CTE và đếm nhóm; bài 3.2 dòng 47–68 minh họa chính hồ sơ đang làm, nhóm mã phòng và `COUNT(*)`. Bài 3.1 dòng 66, 78–80 phân biệt đếm dòng và đếm giá trị có dữ liệu. Việc chỉ mang `MaPB` không làm mất số dòng và ví dụ bài 3.12 xuất các cột bước sau dùng; suy ra được, không cần mã nhân viên để đếm dòng. Nhóm không có hồ sơ không xuất hiện (3.2 dòng 74), phù hợp ngưỡng ít nhất 8. Chưa kiểm giá trị kết quả hiện tại. |
| 4-1-3 | CTE đầu đọc toàn bộ hợp đồng, nhóm theo mã nhân viên, đếm các dòng và đặt tên số đếm. Để kiểm, tạm kết thúc câu với phần chọn đọc CTE đầu, lọc cột mã bằng danh sách hai mã cần xem; chưa đưa ngưỡng hoặc CTE thứ hai vào. Sau khi kiểm, thêm CTE thứ hai đọc hai cột của CTE đầu và giữ số đếm từ 2. Phần cuối đọc CTE thứ hai, xuất hai cột và xếp mã tăng. Trung gian đầu có cả nhóm dưới ngưỡng; theo ví dụ bài 3.11, hai nhóm cần đối chiếu lần lượt NV004 / 1 và NV021 / 3, nhưng chưa xác minh dữ liệu thực tế. | Bài 3.11 dòng 34–58, 65–69 minh họa cùng việc đếm mọi hợp đồng theo mã rồi lọc số đếm; bài 3.1 dòng 66, 78–80 cho `COUNT(*)` đếm dòng; bài 3.12 dòng 70, 74, 76–82 cho CTE nối tiếp, thay câu cuối để xem bước đầu và lọc một vài dòng; bài 2.3 dòng 40–58 giải thích `IN` với danh sách trên một cột. Chuyển điều kiện ngưỡng từ câu ngoài ví dụ sang CTE thứ hai là dùng cùng nguyên tắc đọc cột đã xuất. Không cần lọc loại hay ngày vì đề nói rõ mọi dòng. |

## Câu tự kiểm và phần giữ được

- Bốn câu tự kiểm tại bài 3.12 dòng 237–265 đều có tiền đề ngay trước đó: thứ tự và dấu phẩy (dòng 70), phạm vi một câu lệnh (dòng 84), kiểm CTE đầu (dòng 76–80), và lọc tổng sau khi cộng (dòng 72). Ví dụ ba đơn 1 + 2 + 2 giúp thấy vì sao ngưỡng đặt sau tổng hợp; không thấy thiếu tiền đề trực tiếp.
- Bài giải thích được lý do đặt nguồn trước bước dùng, khác biệt lọc đơn/lọc tổng, cách quan sát bước trung gian và giới hạn không đảm bảo lưu sẵn hay tăng tốc (dòng 70–84). Đây là những điểm hữu ích cho người đọc báo cáo và trao đổi với developer.
- Điểm cần tự suy ra nhưng đã có cơ sở: đề 4-1-2 chuyển phép nhóm từ bảng gốc sang kết quả chỉ chứa mã phòng; đề 4-1-3 chuyển ngưỡng vào CTE sau và kết hợp ví dụ kiểm CTE với `IN`. Không coi việc thiếu một ví dụ giống hệt từng đề là thiếu tiền đề.

## Giới hạn

Chỉ review source và các đoạn tiền đề được phép; không đọc YAML/đáp án/test/seed/secret/report cũ/history, không chạy SQL/API, browser hay Git và không kiểm HTML/UI. Không xác minh các con số minh họa với database, cú pháp thực thi, dữ liệu hiện tại, thứ tự chấm hay khả năng chấp nhận của runner. Đây là review tiền đề ba đề và câu tự kiểm, không phải review toàn diện nội dung hay nghiệm thu kỹ thuật.
