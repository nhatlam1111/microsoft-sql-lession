# Hồ sơ kiểm bài 2.5

Bản review: commit `cfe55e6`, nhánh `feat/lesson-2-5-null`. Report gốc: [review.md](review.md), giữ nguyên. Reviewer: Claude Sonnet, effort high, chỉ đọc nguồn và HTML. Không có mục Cần sửa.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ và kết quả |
|---|---|---|
| F1 `UNKNOWN`, Excel `""` | Làm theo | Thêm "kể cả viết `= NULL`" và câu Excel `B45=""` đúng cả với ô trống, SQL tách `NULL` khỏi `''` |
| F2 câu `varchar` sang `nvarchar` | Làm theo | `Email` là `varchar(100)` đã kiểm bằng `INFORMATION_SCHEMA`; tách hai câu, thêm "một cột kết quả chỉ có một kiểu" |
| F3 ý email dùng được nói ba lần | Làm theo | Giữ ở Phạm vi; bỏ khỏi câu trả lời; Hay nhầm 3 đổi sang dòng không có nhãn |
| F4 Hay nhầm `ISNULL` | Làm theo | Nói `ISNULL` làm gì, đưa ý nhầm với `IS NULL` xuống một câu ngắn |
| F5 câu dẫn Bài tập, "hàm tổng hợp", chữ "Nó" | Làm theo | Sửa cả ba |
| F5 Ghi nhớ hàng 1 và nhãn `N` | Không làm theo | Hàng 1 là điểm tựa Excel cần nhớ; hàng 4 đã có `N'(chưa có)'` |
| F6 tiêu đề hứa "không phải số 0" | Làm một phần | Giữ tiêu đề theo quyết định đã duyệt; thêm lời trỏ cách đếm và cộng ở bài 3.1 |
| F7 lời trỏ `NULL` ở bài 2.4 | Không làm theo | Câu trỏ vẫn đúng; vị trí `NULL` khi sắp ngoài tình huống và không đề nào cần |
| Ghi chú thẻ xem nhanh | Làm theo | Bước `WHERE`, `SELECT` trích `NV008`, `NV037`, `NV044` để thẻ thấy `NULL` và nhãn; bước `ORDER BY` và `Result` đủ 8 dòng |

## Kiểm sau khi sửa

| Kiểm | Kết quả |
|---|---|
| `npm test` | 333/333 |
| `npm run check` | 0 lỗi, 0 cảnh báo, 3 hint có sẵn |
| `npm run build`, `check:dist` | 129 trang, 1951 liên kết |
| `check:exercises` | 2-5-1 ra 3 dòng, 2-5-2 ra 13 dòng, 2-5-3 ra 14 dòng |
| `check:data` | Không bảng nào lệch |
| `SELECT` | 48, 8 dòng; `= NULL` và `<> NULL` ra 0; `ISNULL` ra `(chua có)`; `IS NOT NULL` ở VH ra `NV033`, `NV041`; hàng dữ liệu trong sơ đồ |
| Bản build rộng 1024 | Hình Excel thấy ô `(chưa có)`, trang không tràn, bốn drawer đúng số dòng, nút Sao chép giữ tab và xuống dòng |

## Giới hạn

- Drawer, nút Sao chép và rộng 1024 thử trên bản trước các sửa theo review; bản cuối chỉ đọc lại chữ trên bốn thẻ sơ đồ.
- Reviewer thấy đáp án trước khi phân tích đề, nên bảng tiền đề không phải học thử mù.
- Không có review độc lập cho các sửa theo report.
- Chưa chạy thật trên trang bài tập, chưa kiểm SSMS thật, chưa đo con số 15 phút.
