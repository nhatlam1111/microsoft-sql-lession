# Review độc lập bài 3.12

- Cấu hình được giao: `gpt-6.1-terra`, `reasoning_effort: high`, `fork_turns: none`; không có bằng chứng để tự xác minh model thực tế.
- Phạm vi: source bài 3.12, YAML cùng slug, các phần tiền đề 3.11 và 3.2, template và quy ước được giao; đối chiếu HTML tĩnh tại `dist/bai/3-12-cte-tung-buoc/index.html`. Phiên bản được giao: HEAD `455456116077839099d41941984e5184f8780b97` cùng diff; build được giao là khớp source. Không tự xác minh Git hay quá trình build.

## Finding

Không có finding có đủ căn cứ trong phạm vi review.

## Tiền đề từng đề và câu tự kiểm

Tôi xác định cách làm từng đề từ nội dung bài trước khi đọc `answer` YAML; không dùng đáp án để bù tiền đề.

| Đề | Cách suy ra và tiền đề | Đánh giá |
|---|---|---|
| 4-1-1 | Lọc đơn tháng 8, nhóm loại và cộng ngày trong một CTE; câu ngoài lọc tổng và sắp xếp. Cú pháp một CTE, cột xuất và lọc ở câu ngoài: phần Cấu trúc mới và câu chính 3.12; nhóm và SUM: 3.2; lọc khoảng ngày và sắp xếp là kiến thức trước đó. | Đủ tiền đề; answer đọc sau phù hợp cách làm và yêu cầu tĩnh. |
| 4-1-2 | CTE đầu giữ mã phòng của hồ sơ đang làm; CTE sau nhóm và đếm, câu ngoài lọc số đếm rồi xếp mã. Hai CTE theo thứ tự nguồn trước bước dùng: Cấu trúc mới 3.12; COUNT theo nhóm: 3.2 và Vận dụng 3.12. | Đủ tiền đề; answer đọc sau phù hợp cách làm và yêu cầu tĩnh. |
| 4-1-3 | Nhóm toàn bộ hợp đồng theo mã và đếm trong CTE đầu; giữ định nghĩa này, cho SELECT cuối đọc và lọc hai mã bằng IN để tự kiểm; sau đó CTE hai lọc số đếm và câu cuối xếp mã. COUNT/GROUP BY: 3.2 và Vận dụng 3.12; kiểm CTE, lọc vài dòng bằng WHERE/IN: Vận dụng 3.12; nối hai CTE: Cấu trúc mới 3.12. | Đủ tiền đề cho cả bước tự kiểm và bảng nộp; answer đọc sau phù hợp yêu cầu bảng cuối. Bước tự kiểm là thao tác người học tự làm, không suy ra đã được bộ chấm kiểm. |
| Tự kiểm: thứ tự CTE và dấu ngăn | CTE thứ hai đọc CTE đầu nên nguồn được khai báo trước; một WITH và dấu phẩy giữa định nghĩa, ngay ở Cấu trúc mới. | Đủ. |
| Tự kiểm: dùng lại ở câu tiếp | Phạm vi một câu và khai báo lại cùng nguồn phụ thuộc được giảng ở Cấu trúc mới. | Đủ. |
| Tự kiểm: xem chín đơn | Giữ định nghĩa đầu, bỏ định nghĩa sau và dùng SELECT cuối đọc các cột xuất; Vận dụng có hướng dẫn cụ thể. | Đủ. |
| Tự kiểm: ngưỡng năm ngày | Câu ngoài lọc cột tổng sau nhóm; đoạn tóm tắt lần ba đơn và phân biệt lọc đơn với lọc tổng. | Đủ. |

## Phần giữ được

- Cấu trúc mới giải thích mục đích, cách khai báo một hoặc hai CTE, cột xuất, phụ thuộc và phạm vi tên trước câu SQL đầy đủ. Nói rõ CTE không bảo đảm lưu sẵn hay tăng tốc.
- SQL đầy đủ đặt sát RunFlow; sơ đồ được giới hạn là luồng logic. Tóm tắt trước Result lần ba đơn nghỉ ốm tới tổng 5, sau đó có câu trả lời nghiệp vụ. Phần kiểm kết quả nằm ở Vận dụng sau câu trả lời và là nội dung hiện trên trang, không chỉ nằm trong drawer.
- HTML tĩnh có các tiêu đề, đoạn kiểm và câu tự kiểm theo thứ tự tương ứng; không thấy chuỗi `LineMap`. Các số hiển thị trong source nhất quán về phép cộng đại diện: 1 + 2 + 2 = 5; ba tổng 9, 5, 2 cho hai loại đạt ngưỡng 5.

## Giới hạn

Chỉ đọc source và HTML tĩnh; không chạy SQL, API, browser hay kiểm tương tác drawer/copy/bàn phím. Không xác nhận số liệu và kết quả với database live, tính đúng của build với mọi phụ thuộc, hoặc việc bộ chấm thực sự bắt buộc số CTE/bước tự kiểm. Không đối chiếu SQL, dữ liệu và ID với bản trước bằng Git; giữ nguyên là điều kiện được giao, không phải kết quả tự xác minh. Không tra web, seed, secret hoặc report cũ.
