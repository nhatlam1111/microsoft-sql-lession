# Review độc lập bài 1.1

- Cấu hình được giao: `gpt-6.1-terra`, reasoning effort `high`, ngữ cảnh mới (`fork_turns: none`); công cụ không cung cấp bằng chứng xác nhận model thực tế.
- Đọc source tại HEAD `4066c0f3e589c7b34a02106702aa1351cc3ade23` cùng diff hiện tại; đọc HTML tĩnh build 13/11/2026 22:12:39. Không dùng browser, SQL hay API.

## Findings

1. **Thiếu giải thích — dòng 43:** “khóa–giá trị dùng khóa để tra giá trị” lặp lại tên mô hình nhưng chưa cho người chỉ biết Excel biết khóa và giá trị cụ thể là gì. Người học khó hình dung vì sao tra theo mã phù hợp với mô hình này (dòng 38, 97). Đề xuất thay bằng một ví dụ ngắn: mã nhân viên là khóa dùng để tìm thông tin tương ứng là giá trị; không cần mở rộng kỹ thuật.
2. **Biên tập HTML — dòng 51 và 64:** HTML tĩnh nối chữ sát nhau thành “NoSQLĐường” và “cột.Ví dụ” do không có khoảng trắng sau `</strong>`. Chú thích khó đọc. Đề xuất thêm khoảng trắng sau phần in đậm và kiểm lại HTML.

## Tiền đề từng câu tự kiểm

| Câu | Tiền đề trong lời giảng trước câu hỏi | Đánh giá |
|---|---|---|
| Database và DBMS khác nhau | Dòng 25–27 định nghĩa dữ liệu và phần mềm quản lý | Đủ |
| Quan hệ và NoSQL tổ chức khác nhau thế nào | Dòng 31, 35–47 nêu bảng và các mô hình khác; dòng 33 phân biệt DBMS/RDBMS | Đủ để trả lời sự khác biệt được hỏi; ví dụ khóa–giá trị còn khó hình dung như finding 1 |
| Dòng nhân viên và hợp đồng có cùng nghĩa không | Dòng 67 nêu mỗi dòng đại diện gì và một người có thể có nhiều hợp đồng | Đủ |
| Vì sao ví database với workbook có giới hạn | Dòng 25, 31, 43 và 69 nêu mô hình khác cùng giới hạn của so sánh sheet/bảng | Đủ |

## Giữ được và giới hạn

Giữ ví dụ tách hồ sơ/hợp đồng và cảnh báo số dòng không đồng nghĩa số người: giải thích được lý do tách và nguy cơ đếm sai. Điều kiện luật phải khai báo, file Excel xuất ra không tự cập nhật và NoSQL không mặc nhiên nhanh hơn giúp tránh hứa quá. Diff “giá trị chung, như mã nhân viên” dễ tiếp cận hơn thuật ngữ khóa chưa học.

Đã đối chiếu nội dung HTML tĩnh, không kiểm tương tác, bố cục hay khả năng đọc hình trên browser. Không xác minh dữ liệu mẫu, quyền ảnh hoặc nội dung nguồn ngoài; không chạy SQL. Các kết luận trên không thay cho các kiểm đó.

## Addendum — kiểm hai sửa đổi

Đã đối chiếu riêng source và HTML tĩnh build ngày 13/11/2026 lúc 22:16:30. Ví dụ mã nhân viên là khóa, hồ sơ là giá trị làm rõ cách tra; finding 1 được xử lý. Hai chú thích có dấu câu và khoảng trắng trong HTML; finding 2 được xử lý. Không còn vướng trong hai đoạn được kiểm. Không kiểm lại toàn bài, UI/browser hay SQL/API.
