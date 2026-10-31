# Hồ sơ kiểm bài 2.6

Bản review: commit `a336ca8`, nhánh `feat/lesson-2-5-null`. Report gốc: [review.md](review.md), giữ nguyên. Reviewer: Claude Sonnet, effort high, chỉ đọc nguồn và HTML. Có 1 mục Cần sửa.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ và kết quả |
|---|---|---|
| F1 lời trỏ "đếm số giá trị khác nhau ở bài 3.1" | Làm theo | Đã tìm trong các bài: không bài nào dạy việc này. Đổi thành đếm hồ sơ của từng phòng ở bài 3.2 |
| F2 cú pháp nhiều cột chỉ có bằng lời | Làm theo | Thêm câu viết `DISTINCT` một lần, cột ngăn bằng dấu phẩy như bài 2.1 |
| F3 `MaCD` chưa gọi tên | Làm theo | Viết `MaCD` (mã chức danh) lần đầu |
| F4 câu `WHERE` ở cuối đoạn | Làm theo | Tách đoạn riêng, có ví dụ phòng `IT` |
| F5 lặp "gồm cả đang làm và đã nghỉ" | Làm theo | Bỏ ở Kết quả bước `FROM`; bỏ câu lặp ở bước `DISTINCT` |
| F6 Hay nhầm 3 mơ hồ | Làm theo | Viết lại, trỏ bài 4.6; bỏ cụm "hồ sơ trùng cần kiểm tra" khỏi `summary` |
| F7 Ứng dụng 3, Ghi nhớ dòng 3, câu dẫn Bài tập | Làm theo | Sửa cả ba |
| F8 đường vào menu | Làm theo | Viết `Data > Remove Duplicates` như bài 2.2 |
| Mục tiêu "thêm mã nhân viên" không có đề chấm | Không làm theo | Reviewer chỉ ghi nhận; ba đề giữ nguyên |

## Kiểm sau khi sửa

| Kiểm | Kết quả |
|---|---|
| `SELECT` | `6` mã, `19` cặp, `48` dòng khi thêm `MaNV`; năm hồ sơ đầu; nguyên văn lỗi `ORDER BY items must appear in the select list if SELECT DISTINCT is specified.` |
| `npm test` | 357/357 |
| `npm run check` | 0 lỗi, 0 cảnh báo, 3 hint có sẵn |
| `npm run build`, `check:dist` | 129 trang, 1951 liên kết |
| `check:exercises`, `check:data` | 6, 7, 2 dòng; không bảng nào lệch |
| Bản build rộng 1024, trước khi sửa theo review | Đủ ba phần, đầu vào bước `DISTINCT` thấy `KD`, `KT` lặp, bảng không tràn |

## Giới hạn

- Các sửa theo report chưa có review độc lập; bản cuối của 2.6 không mở lại trên trình duyệt, lời sửa nằm ở phần chính và không đổi cấu trúc sơ đồ.
- Thứ tự sáu mã ở bước `DISTINCT` chỉ là một thứ tự có thể có; bài đã ghi chưa được bảo đảm.
- Chưa kiểm SSMS thật, chưa chạy trên trang bài tập, chưa đo con số 12 phút.
