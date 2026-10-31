# Hồ sơ kiểm bài 2.7

Bản review: commit `a336ca8`, nhánh `feat/lesson-2-5-null`. Report gốc: [review.md](review.md), giữ nguyên. Reviewer: Claude Sonnet, effort high, chỉ đọc nguồn và HTML. Không có mục Cần sửa, một mục Chưa xác minh quan trọng.

## Phát hiện về collation

Reviewer nghi `Vietnamese_CI_AI` không bỏ hết dấu. Chạy `SELECT` cho thấy đúng:

| So sánh dưới `Vietnamese_CI_AI` | Kết quả |
|---|---|
| `ù` với `u`, `á` với `a` | Bằng nhau |
| `ă`, `â` với `a`; `ê` với `e`; `ô`, `ơ` với `o`; `ư` với `u`; `đ` với `d` | Khác nhau |
| `ồ`, `ỗ`, `ờ` với `o` | Bằng nhau, không nhất quán với `ô` |

`N'dang%'` không ra `Đặng Quốc Bảo`, `N'au%'` không ra `Âu Văn Kiên`. Với `Latin1_General_CI_AI` mọi cặp trên đều bằng nhau, tìm ra đủ `NV007`, `NV006`, `NV039`.

Quyết định của người viết, ngoài thiết kế: bài và đề 2-7-2 đổi sang `Latin1_General_CI_AI`, Hay nhầm thêm ý về `Vietnamese_CI_AI`. Đề 2-7-2 vẫn ra hai dòng `NV004`, `NV014` với cả hai collation, nên bài làm dùng collation nào cũng được chấm đúng. Lỗi này có từ bản trước trên `main`.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ và kết quả |
|---|---|---|
| F5 `Vietnamese_CI_AI` | Làm theo, mạnh hơn đề xuất | Xem trên |
| F4 hai ý `NULL` rời nhau | Làm theo | Đặt liền theo thứ tự nhân quả |
| F2 `N' - '` không có dấu | Làm theo | Nói rõ khóa học viết `N` cho mọi chuỗi chữ tự viết |
| F3 "không khôi phục được" mơ hồ | Làm theo | Cắt vế đó |
| F6 thiếu cái giá của `COLLATE` | Làm theo | Thêm: tìm rộng hơn, xác nhận lại bằng mã |
| F9 đầu vào `ORDER BY` đã đúng thứ tự | Làm theo | Thực hiện nói chỉ bước này mới bảo đảm; áp dụng cả bài 2.5 |
| F1 nhãn so với họ tên | Làm theo | Thêm: nhãn dài hơn họ tên `6` ký tự |
| F7 lặp "nguồn không đổi" | Làm theo | Bỏ ở drawer `SELECT` và đoạn Collation |
| F8 câu "Đặc tả…" | Làm theo | Cắt |
| F10 Hay nhầm 1 | Làm theo | Nói rõ ép kiểu số, trỏ `SoCCCD` bài 1.3 |
| F11 tự kiểm tra chưa phủ phần cắt | Làm theo | Thêm câu về `SUBSTRING`; Ghi nhớ có cú pháp `COLLATE` |
| Câu dẫn bảng hàm, câu dẫn sơ đồ | Làm theo | Sửa cả hai |
| F12 `CONCAT` chỉ có từ Excel 2019 | Không làm theo | Chưa xác minh; người học chỉ đọc hình, không cần gõ công thức |

## Kiểm sau khi sửa

| Kiểm | Kết quả |
|---|---|
| `SELECT` | 10 nhãn; `LEFT`, `SUBSTRING`, `LOWER`, `TRIM`, `LEN` trên `NV007`; `CONCAT` với `NULL` ra `[]`; `HoTen LIKE N'bui%'` ra `0` dòng; hai collation như bảng trên |
| `npm test` | 357/357 |
| `npm run check` | 0 lỗi, 0 cảnh báo, 3 hint có sẵn |
| `npm run build`, `check:dist` | 129 trang, 1951 liên kết |
| `check:exercises`, `check:data` | 7, 2, 10 dòng; không bảng nào lệch |
| Bản build cuối, rộng 1024 | Bảng soi, nút Bước trước, Bước sau, trang không tràn, chụp màn hình |
| Trước khi sửa theo review | Hình Excel không cắt, nút Sao chép giữ tab, bốn drawer |

## Giới hạn

- Các sửa theo report, gồm đổi collation, chưa có review độc lập.
- Chưa kiểm SSMS thật, chưa chạy trên trang bài tập, chưa đo con số 20 phút.
- Các bài từ 2.8 không dùng collation nên không ảnh hưởng.
