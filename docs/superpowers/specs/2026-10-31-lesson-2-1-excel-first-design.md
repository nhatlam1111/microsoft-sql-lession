# Bài 2.1 đi từ Excel sang SQL

Trạng thái: người làm khóa học đã duyệt ngày 31/10/2026.

## Ý định

Bài 2.1 trình bày theo nhịp của các bài 2.2 trở đi: mở bằng việc người học quen làm trong Excel, có hình minh họa, rồi mới chuyển sang SQL. Hiện bài chỉ có một câu nhắc Excel rồi vào ngay `SELECT TOP (5) *`, bảng 12 cột, cách chạy, Results và Messages.

## Mục tiêu

- Mỗi khái niệm SQL của bài đứng sau việc tương ứng trong Excel, với hình Excel đi trước lời giải thích SQL.
- Người học chỉ chạy một lần, ở mục "Câu lệnh cho tình huống". Cách chạy, Results và Messages chuyển về mục đó.
- Giữ nguyên kiến thức, tình huống và bốn bài tập.

## Không làm

- Không đổi bài tập, đáp án, slug, số bài, `prerequisites` hay trang Giới thiệu.
- Không thêm khái niệm mới.
- Không đổi bài khác, trừ khi test cho thấy lời trỏ sai.

Thất bại dù vẫn chạy được: câu lệnh xuất hiện trước hình Excel đầu tiên, hoặc người học tới bài tập mà chưa biết bấm chạy ở đâu.

## Cách đã cân nhắc

| Cách | Được | Mất | Kết quả |
|---|---|---|---|
| Hai cặp Excel → SQL, 4 tiểu mục | Giống 2.2 nhất, đúng mức 2–4 tiểu mục, giữ `TOP` để xem thử | `TOP` chỉ còn một đoạn để đọc, không chạy trong bài | **Người làm khóa học chọn** |
| Ba cặp Excel → SQL, 5 tiểu mục | Từng bước rất rõ | Dài hơn, khuôn lặp ba lần | Bỏ |
| Như cách đầu nhưng bỏ `TOP`, để bài 2.4 dạy | Ngắn nhất | Mất cách xem thử bảng lớn; bài 2.4 phải sửa | Bỏ |

## Phần chính mới

1. **Từ mở sheet và chép cột đến `SELECT`.** Mở bằng "Trong Excel, bạn mở sheet nhân viên, tìm ba cột cần gửi rồi chép sang workbook mới". Hình sheet `NhanVien` trích năm cột và ba hồ sơ, đánh dấu ba ô tiêu đề cần lấy. Rồi chuyển sang SQL: câu truy vấn, `SELECT`, `FROM`, danh sách cột, thứ tự cột, `*`, và một đoạn ngắn về `SELECT TOP (5) *` để xem thử, nói rõ tối đa năm dòng và chưa có `ORDER BY` thì không bảo đảm dòng nào.
2. **Từ sửa dòng tiêu đề đến `AS`.** Mở bằng việc sửa dòng tiêu đề trong workbook, dùng hình bản gửi Kế toán đang có. Rồi alias, ngoặc vuông, tên cột phải khớp nguồn, đoạn "Ở bài này chỉ cần…".
3. **Câu lệnh cho tình huống.** Câu cuối, cách chạy trên web và SSMS, kết quả, `(48 rows affected)`, đọc Results và Messages, trả lời chị Hạnh, Copy with Headers.
4. **SQL Server chạy câu này thế nào.** Giữ nguyên sơ đồ.

## Quyết định

Của người làm khóa học: chỉ chạy một lần; chọn cách hai cặp Excel → SQL.

Của người viết:

- Hình mới dùng năm cột `MaNV`, `HoTen`, `NgaySinh`, `Email`, `NgayVaoLam`, để thấy cả cột không cần gửi.
- `Key` bỏ vế "xem bảng đang lưu những gì", vì việc xem bảng không còn là một bước của lời giải.
- Câu `SELECT TOP (5) *` thành đoạn chỉ để đọc, `copy={false}`, không có kết quả đi kèm.
- `(48 rows affected)` thay cho `(5 rows affected)`; bỏ vế "không phải tổng số hồ sơ", vì câu này không lọc nên 48 đúng là tổng.
- Giữ tiêu đề bài, `minutes: 22`.
- Làm trên nhánh `feat/lesson-2-1-excel-first`, tách từ `main`. Chạy một review độc lập theo mục 4.5.

## Để người viết tự quyết

- Câu chữ và tên tiểu mục, miễn mở bằng điều tiêu đề hứa.
- Ba hồ sơ trong hình mới, lấy từ dữ liệu thật.

## Kết quả

Đã làm trên nhánh `feat/lesson-2-1-excel-first`, chưa push. Một review độc lập không có mục Cần sửa. [Hồ sơ xử lý](../../reviews/2026-10-31-bai-2-1-excel-truoc/verification.md).

Khác thiết kế:

- Hình đầu có bốn cột, bỏ `Email`, vì năm cột làm cột `NgayVaoLam` được đánh dấu bị cắt ở rộng 1024px.
- Bỏ câu về bảng nguồn thêm cột; ý Hay nhầm về `TOP` chuyển xuống cuối.
