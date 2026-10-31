# Hồ sơ kiểm bài 2.9

Bản review: commit `513c81b`, nhánh `feat/lesson-2-5-null`. Report gốc: [review.md](review.md), giữ nguyên. Reviewer: Claude Sonnet, effort high, chỉ đọc nguồn và HTML. Không có mục Cần sửa.

Reviewer tự ghi nhận một lệnh `grep` quét trúng `database/HRM_Demo.sql`, in ra vài dòng; report không dùng dòng đó làm căn cứ. File này không chứa secret.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ và kết quả |
|---|---|---|
| F1 đoạn Giả định nặng | Làm theo | Cắt vế bản chốt, bài 6.6 |
| F2 mốc kỷ niệm | Làm theo | Định nghĩa thẳng; nói đúng ngày mốc cũng tính là đủ |
| F3 lời rào "điều kiện từng dòng" | Làm theo | Bỏ ở phần chính và Ghi nhớ; `CASE` xét tuần tự là mô tả của Microsoft, ngoại lệ về hàm tổng hợp ngoài phạm vi bài |
| F4 `ELSE` với `NOT NULL` | Làm theo | Trỏ hình bài 1.4, nói ô `NULL` cho `UNKNOWN` nên rơi vào `ELSE` |
| F5 trộn chữ với số | Làm theo | Cắt vế này |
| F6 điều kiện ngày không loại ai | Làm theo | Bước `WHERE` nói rõ và nói mục đích |
| F7 bước `SELECT` | Làm theo | Lời có `ELSE`; ghi chú dưới bảng nói ô cuối là số dòng vào `ELSE`; tô cả khối `SELECT` |
| F8 đầu vào `ORDER BY` đã đúng thứ tự | Không làm theo | Trích đúng thứ tự thật; Thực hiện đã nói chỉ bước này mới bảo đảm |
| F9 Hay nhầm 2 lặp phần chính | Làm theo | Hậu quả chuyển hẳn sang Hay nhầm, bỏ "rộng, hẹp" |
| F10 Hay nhầm 3 | Làm theo | Viết lại thành lỗi cụ thể của chính câu lệnh |
| F11 Hay nhầm 1 | Làm theo | Nói rõ nhóm bị xếp sớm |
| F12 Ghi nhớ | Làm theo | Sửa hàng 2, hàng 3, có `EDATE` |
| F13 ngày viết trần | Làm theo | Thêm vế "như bài 2.2" trong `LineMap` |
| F14 đề 2-9-2 không nói ngày chốt | Làm theo | Sửa lời đề thành "ngày chốt 2026-08-14". Đáp án không đổi |
| In đậm lại `NULL` | Làm theo | Bỏ đậm |

## Kiểm sau khi sửa

| Kiểm | Kết quả |
|---|---|
| `SELECT` | `45`, `48`, `45`; nhánh `33`, `8`, `4`; `NV025` có `DATEDIFF(year)` là `3`; đảo nhánh thì `NV003` ra `Từ 1 đến dưới 3 năm`, nhãn `Từ 3 năm trở lên` còn `0` dòng |
| `npm test` | 366/366 |
| `npm run check` | 0 lỗi, 0 cảnh báo, 3 hint có sẵn |
| `npm run build`, `check:dist` | 129 trang, 1951 liên kết |
| `check:exercises`, `check:data` | 10, 14, 5 dòng; không bảng nào lệch |
| Bản build cuối, rộng 1024 | Bấm chuột thật mở drawer bước `SELECT`, tô đủ khối `CASE`; bảng nhánh không tràn; nút Bước trước, Bước sau chạy |

Ảnh chụp lúc mở drawer bằng script có lúc thấy drawer mờ. Bấm chuột thật thì đục hoàn toàn, `opacity` là `1`, không còn hiệu ứng chạy; đây là khung hình lúc chuyển cảnh, không phải lỗi.

## Giới hạn

- Các sửa theo report, gồm đổi lời đề 2-9-2, chưa có review độc lập.
- Chưa kiểm SSMS thật, chưa chạy trên trang bài tập, chưa đo con số 18 phút.
