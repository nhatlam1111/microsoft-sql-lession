# Bài 1.3: hồ sơ xử lý review và kiểm thực tế

Lượt: sắp xếp lại mạch từ ô Excel đến kiểu cột, ngày 30/10/2026. [Report gốc](review.md) giữ nguyên byte so với `temp/review/2026-10-30-lesson-1-3-reorder/review-bai-1-3-bang-cot-kieu-du-lieu.md`.

Reviewer: agent mới, Claude Sonnet, effort high, đọc source sha256 `5b92fc53…a083` và build 15:26, chỉ đọc nguồn và HTML. Không có reviewer từng bài sau khi sửa. Bản `53099234…88cd` qua [review tích hợp](../2026-10-30-bai-1-1-1-3-tich-hop/verification.md); bản cuối sau lượt đó có sha256 `de35c113…efc`, thêm các sửa F5, F7 của lượt tích hợp.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| F1 ô được tô không rõ lý do | Làm một phần | Spec giữ nguyên props của `Excel` | Lời dẫn nêu `C2` là ngày dễ hiểu nhầm, `D3` là số tiền viết kèm chữ; `C3` được nối với thanh công thức |
| F2 `PK`, `FK` chưa giải thích | Làm theo | Hình `HopDong` có hai nhãn này; bài 1.4 mới dạy | Thêm một vế trỏ bài 1.4 |
| F3 kiểu xuất hiện trước bảng | Làm theo | Hình `HopDong` có đủ `varchar`, `nvarchar`, `date`, `decimal` theo script | Câu dẫn nói bảng dưới giải thích các kiểu trong hình |
| F4 cách IT ghi dữ liệu | Làm theo | `DATEFORMAT` chỉ áp dụng khi SQL Server đọc chuỗi trong phiên | Giả định ghi rõ IT ghi bằng câu lệnh SQL; bỏ vế "kể cả khi IT đọc thẳng ngày Excel đã hiểu" |
| F5 thiếu lý do của lời khuyên | Làm theo | Microsoft Learn: `yyyy-MM-dd` nằm trong nhóm ISO 8601 của kiểu `date`; ISO 8601 được đọc độc lập với `DATEFORMAT` | Dòng `C3` nêu lý do; dòng `D2` nối với dấu thập phân |
| F6 lặp ý và in đậm dày | Làm theo | Câu chốt đứng cạnh dẫn chứng thì rõ hơn | Chuyển "Lưu được chưa chắc đã đúng ý" xuống đoạn giới hạn |
| F7 câu trùng, chỉ dẫn lạc | Làm một phần | Quy ước 2: cơ chế tự làm phải nói gặp lại ở bài nào | Bỏ câu `NgayNghiViec`, "còn gọi là bản ghi", chỉ dẫn hàm ngày; giữ bài 2.2 bằng cụm "chuyển kiểu ngầm gặp lại" |
| F8 vế rào ở bảng kiểu | Làm một phần | Viết "tối đa n ký tự" cho mọi `varchar` là sai vì `n` tính theo byte | Dòng `varchar` đổi sang ví dụ `NV001`; dòng `nvarchar` giữ rào, câu trỏ bài 2.7 được bỏ ở lượt tích hợp |
| F9 hình tô `HoTen`, lời dẫn nói `NgayVaoLam` | Làm theo | Hình giữ nguyên theo spec | Lời dẫn chỉ cột ngoài cùng bên phải |
| F10 câu ôn lặp Hay nhầm | Làm theo | Quy ước 2: câu ôn bao phủ mục tiêu và thuật ngữ nền | Câu 3 hỏi thêm chuyển kiểu ngầm; câu 5 đổi sang lý do chọn `date` và kiểu chữ; giữ năm câu |
| F11 lời đáp còn mơ hồ | Làm theo | "Các ô này", "ô báo lỗi" chưa cụ thể | Ghi rõ `C2`, `C4`, `D2`, `D3`; đổi thành "ô bị từ chối" |
| F12 tiền tố `N` đòi nền SQL | Không làm theo | Bài 2.1 trỏ về đoạn này; reviewer cũng không đề nghị bỏ | Giữ Hay nhầm 3 |
| F13 độ tải | Ghi nhận | Chưa đo với người học thật | Giữ 15 phút; bài còn 2.165 từ theo `wc`, không ngắn hơn bản trước (2.099) |
| F14 Ứng dụng | Làm theo | Quy ước 2.3: nêu việc làm được | Ý 1 thành đề xuất kiểu cho cột mới; ý 3 đối chiếu file trước khi nhập |
| G1–G9 | Giữ | Reviewer công nhận | Không đổi |

Phát sinh ngoài report: bổ sung vế "`decimal(18,0)` không có phần lẻ" vì câu ôn 1 cần ý này (ghi chú ở mục 4 của report).

## Sai khác so với thiết kế

- Bỏ hẳn vế IT đọc trực tiếp ngày trong ô, thay vì rút thành một vế gần `C2`, vì giả định đã ghi cách IT ghi dữ liệu (F4).
- Bỏ hẳn quy ước `NULL` của `NgayNghiViec`; chú thích hình `Ssms` đã nêu quy ước bộ mẫu với `NgayKetThuc` (F7).

## Kiểm thực tế

- Sau review từng bài: `npm test` 326/326; `npm run check` 0 lỗi, 0 cảnh báo, 3 hint nền; `npm run build` 132 trang; `npm run check:dist` 132 trang, 1998 liên kết. Bản cuối sau lượt tích hợp đạt 329/329 test cùng các kiểm tra còn lại.
- Bản build ở 1024×720: ảnh tải đúng, không tràn ngang trang, không lộ backtick, câu ôn 5 mở bằng Enter, console không lỗi. Bản trước sửa cũng được xem ở 1280×800 với cùng kết quả về ảnh và tràn ngang.
- Ở 1024px, bảng kiểu rộng hơn cột chữ 11px nhưng vẫn nằm trong vùng nội dung, không đè cột phải; chưa so với bản cũ.
- Dưới 1024px, toàn site dùng khung desktop kèm thông báo màn hình hẹp, nên không nghiệm thu mobile. Đây là giới hạn chung, không riêng bài 1.3.

## Giới hạn

- Connector database không có trong phiên, nên không chạy SQL live. Mọi giá trị trong bài là giá trị đã có; metadata lấy từ `database/HRM_Demo.sql`.
- Lý do `2024-02-01` không phụ thuộc `DATEFORMAT` dựa trên [SET DATEFORMAT](https://learn.microsoft.com/en-us/sql/t-sql/statements/set-dateformat-transact-sql) và [date](https://learn.microsoft.com/en-us/sql/t-sql/data-types/date-transact-sql), chưa chạy thử thêm.
- Lý do `9.610.000` bị từ chối dựa trên kết quả từ chối đã có của bài; nguyên nhân hai dấu chấm chưa chạy riêng.
- Chưa kiểm SSMS thật. 15 phút là nhãn dự kiến.
- Giữ bản local, không commit, push hay deploy.
