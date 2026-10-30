# Review tích hợp năm bài nền: hồ sơ xử lý

Lượt ngày 30/10/2026, sau [review từng bài của đợt 2](../2026-10-30-bai-nen-dot-2/verification.md). [Report gốc](review.md) giữ nguyên byte so với `temp/review/2026-10-30-bai-nen-tich-hop/review-tich-hop.md`.

Reviewer: agent mới, Claude Sonnet, effort high, đọc diff `44b2ae6..9176c0a`, nguồn và HTML; không mở browser, không chạy SQL hay `npm`. Không có reviewer đọc lại sau khi sửa.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| F1 lối vào cho người dùng SSMS | Làm theo | Grep: không có link tới `#ket-noi-ssms` | Thêm lối thứ ba ở trang Giới thiệu; bài 1.6 link tới mục kết nối |
| F2 lời dặn ở bước Connect | Làm theo | Bản 1.2 cũ đặt ngay sau "Bấm Connect" | Trang nêu bấm Cancel ngay tại bước này và link tới mục lỗi |
| F3 đoạn 1.6 cho người dùng web | Làm theo | Trang bài tập không có Object Explorer | Nói rõ phần nào chỉ cho SSMS; trên web dùng nút Sơ đồ database; chỉ rõ câu cần nhập |
| F4 định nghĩa chuyển kiểu ngầm hẹp | Làm theo | Bài 2.5, 2.9, 3.8 dùng rộng hơn | Định nghĩa thành hai giá trị khác kiểu gặp nhau; ba khả năng nói riêng về chữ ghi vào cột |
| F5 nhiều tên cho dữ liệu mẫu | Làm một phần | Spec không giới thiệu HRM_Demo trong bài | Bài 1.2 giới thiệu "dữ liệu mẫu của khóa học"; bỏ "bộ mẫu" ở 1.3, 1.6; giữ "database khóa học" khi nói về database |
| F6 câu nối bị rơi | Làm theo | So với bài 1.2 cũ | Thêm hai vế ở trang Giới thiệu; bỏ nhắc `ORDER BY` chưa học |
| F7 README và lời dặn reviewer (Cần sửa) | Làm theo | README còn mô tả khung cũ | Sửa README, thêm `noScenario`; lời dặn reviewer dùng bài mẫu tương ứng |
| F8 quy tắc chung chưa giới hạn | Làm theo | Hai con số khác nhau cho bài nền | Thêm nhánh bài nền ở `quy-uoc.md`, `lesson-template.md`, `AGENTS.md`, `CLAUDE.md`; sửa dòng người học ở hồ sơ công ty |
| F9 "không tự chặn" quá rộng | Làm theo | `NhanVien` có nhiều cột `NOT NULL` | Nói rõ database nhận nếu điền đủ cột bắt buộc |
| F10 câu dễ đọc ngược | Làm theo | Câu cũ đọc thành xóa hồ sơ | Viết lại rõ xóa phòng |
| F11 khoảng trống test | Làm theo | Bốn ý đề xuất đều rẻ | Thêm test đích link, chặn nhân vật ở bài nền, chặn tên khóa ở 1.1, giữ câu giả định của 1.6 |
| G1–G3 | Giữ | Reviewer công nhận | Không đổi |

Mục chưa kết luận ở phần 4 của report:

- `prerequisites` của 1.6 giữ `1.1`, `1.4` như spec, vì người học đi tuần tự.
- Câu "cấp quyền tới từng bảng" đã đối chiếu với [GRANT Object Permissions](https://learn.microsoft.com/en-us/sql/t-sql/statements/grant-object-permissions-transact-sql): áp dụng cho Azure SQL Database, cấp được trên bảng.
- Spec, plan được cập nhật ở lượt này.
- Trang Giới thiệu dài, chưa có mục lục: để nguyên, người làm khóa học quyết sau khi đọc.

## Kiểm thực tế

- Bản cuối: `npm test` 323/323; `npm run check` 0 lỗi, 0 cảnh báo, 3 hint nền; `npm run build` 132 trang; `npm run check:dist` 132 trang, 1997 liên kết.
- Độ dài theo `proseParagraphs`: 1.1 là 698, 1.2 là 561, 1.3 là 697, 1.4 là 617, 1.5 là 645.
- Bản build ở 1280×800: trang Giới thiệu có ba hình SSMS, ba link nội bộ có đích, không tràn ngang, không tài nguyên lỗi; 1.1–1.6 đều trả 200, không lộ backtick.
- Bản build ở 1024×720: bài 1.3 và 1.5 không tràn ngang; câu ôn đầu của 1.3 mở bằng Enter; sơ đồ 1.5 hiện `1`, `∞`, đường tô xanh, cuộn ngang được.
- Đối chiếu database bằng `SELECT` ở [hồ sơ đợt 2](../2026-10-30-bai-nen-dot-2/verification.md). Lượt này không ghi dữ liệu.

## Giới hạn

- Chưa kiểm thao tác trong SSMS thật và nút Sao chép ở trang Giới thiệu.
- Dưới 1024px toàn site chưa hỗ trợ.
- 7 phút là nhãn dự kiến, chưa đo với người học thật.
- Link cũ của bài 1.2, 1.3 trả 404; tiến độ học lưu theo số bài nên gắn với nội dung mới.
