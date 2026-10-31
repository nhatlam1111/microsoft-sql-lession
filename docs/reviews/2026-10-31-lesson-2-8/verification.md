# Hồ sơ kiểm bài 2.8

Bản review: commit `513c81b`, nhánh `feat/lesson-2-5-null`. Report gốc: [review.md](review.md), giữ nguyên. Reviewer: Claude Sonnet, effort high, chỉ đọc nguồn và HTML. Không có mục Cần sửa.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ và kết quả |
|---|---|---|
| F1 "hợp đồng lịch sử" | Làm theo | Cắt cụm này |
| F2 vì sao SQL cần hàm | Làm theo | Đã chạy: trừ hai cột `date` báo `Operand data type date is invalid for subtract operator.` Thêm câu nói điều này |
| F3 `CAST` thiếu lý do | Làm theo | Đã chạy: bỏ `CAST` thì `DATEADD` trả `datetime`, có `CAST` trả `date`. Thêm một câu |
| F4 ngày chốt và `GETDATE` | Làm theo | Đã chạy: máy chủ dùng UTC. Viết lại đoạn và Hay nhầm 2, không còn nghĩa "đừng dùng ngày hiện tại" |
| F5 `DATEDIFF(day)` an toàn vì sao | Làm theo | Thêm một câu, cắt cụm "chia `365`" |
| F6 cách đếm số ngày còn lại | Làm theo | Câu trả lời ghi "ngày kết thúc trừ ngày chốt" |
| F7 `NULL` là quy ước | Làm theo | Viết "Trong bộ mẫu" |
| F8 `BETWEEN`, cột có giờ | Làm một phần | Cắt phần "trước `00:00`". Không nói về `BETWEEN` vì `>=`, `<=` không sai và bài 2.3 đã dạy |
| F9 đầu vào bước `SELECT` | Làm theo | Thêm `inputColumns`, tô cả dòng `SELECT` |
| F10 số cột `HopDong` | Làm theo | Đã chạy: `6` cột, ghi vào bước `FROM` |
| F11 đáp án tự kiểm tra dạy bù | Làm theo | Cắt câu cuối |
| F12 Ghi nhớ | Làm theo | Viết lại hàng `TODAY`, `MONTH`; thêm hàng `CAST` |
| F13 Ứng dụng 3 | Làm theo | Nêu việc cụ thể |
| F14 "ngày kỷ niệm" | Làm theo | Dùng "mốc đủ năm" trong bài này |
| F15 "số âm để lùi lại" | Làm theo | Cắt; giữ chữ đậm |
| F16 đề 2-8-1 mơ hồ chiều | Làm theo | Sửa lời đề thành "ngày sau ngày chốt một tháng"; thêm ví dụ lồng hàm vào bảng. Đáp án không đổi |
| F17 đề 2-8-3 không phân biệt `>` với `>=` | Không làm theo | Đã chạy: không hợp đồng nào kết thúc đúng `2026-10-21`. Đề đã nói rõ, không đổi dữ liệu |
| Vướng đề 2-8-3 về `EOMONTH` trên ngày chốt | Làm theo | Thêm hàng `EOMONTH(CAST(...))` ra `2026-10-31` |

## Kiểm sau khi sửa

| Kiểm | Kết quả |
|---|---|
| `SELECT` | Bảng soi `20`, `13`, `3`; `25` ô `NULL`; `HD2024-008` ra `2`, `2026-11-15`, `11`, `2026-11-30`; `EOMONTH` của ngày chốt `2026-10-31`; `MONTH(DATEADD(...))` ra `11` |
| `npm test` | 366/366 |
| `npm run check` | 0 lỗi, 0 cảnh báo, 3 hint có sẵn |
| `npm run build`, `check:dist` | 129 trang, 1951 liên kết |
| `check:exercises`, `check:data` | 4, 4, 1 dòng; không bảng nào lệch |
| Bản build cuối, rộng 1024 | Bốn drawer đúng cột, bảng không tràn, ô `UNKNOWN` hiện đúng |
| Trước khi sửa theo review | Hình Excel không cắt, nút Sao chép giữ tab |

## Giới hạn

- Các sửa theo report, gồm đổi lời đề 2-8-1, chưa có review độc lập.
- Chưa kiểm SSMS thật, chưa chạy trên trang bài tập, chưa đo con số 20 phút.
