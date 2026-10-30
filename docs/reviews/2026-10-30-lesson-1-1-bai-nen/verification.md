# Bài 1.1 dạng bài nền: hồ sơ xử lý review

Đợt 1 của [thiết kế năm bài nền](../../superpowers/specs/2026-10-30-level-1-foundation-lessons-design.md), ngày 30/10/2026. [Report gốc](review.md) giữ nguyên byte so với `temp/review/2026-10-30-lesson-1-1-bai-nen/review-bai-1-1-database-la-gi.md`.

Reviewer: agent mới, Claude Sonnet, effort high, đọc commit `7ba5bca` (sha256 `d9c9216a…cae7`) và build 17:10, chỉ đọc nguồn và HTML. Bản sau khi sửa có sha256 `dcc8098b…d816`, chưa có reviewer đọc lại.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| S1 Memo tuyệt đối hóa Excel | Làm theo | Quy ước 2: nói điều kiện của tình huống | Đổi thành "Mỗi phòng giữ một bản sao" và "Các phòng cùng đọc một database"; nhãn cột là của component |
| C1 vì sao không dùng workbook chung | Làm theo | Excel có cách làm việc chung; bài đang lấy đúng ý đó làm điểm khác | Thừa nhận workbook dùng chung làm được phần đọc chung; nêu database còn cấp quyền tới từng bảng và kiểm theo luật |
| C2 hình SQL Server dễ nhòe với SSMS | Làm theo | Tài liệu Microsoft mô tả SSMS là công cụ truy cập SQL Server | Caption nói SQL Server chạy nền trên máy chủ, không phải cửa sổ bạn mở; ảnh giữ nguyên |
| C3 bốn tên đặt song song | Làm theo | Câu cuối của người mới là "gõ SQL thì chuyện gì xảy ra" | Ghi nhớ thành chuỗi SSMS → SQL → SQL Server → database; có lý do phải đi qua phần mềm quản lý |
| C4 "máy chủ" chưa giải thích | Làm theo | Dùng lại định nghĩa của bài 1.2 cũ | Thêm một câu ở đoạn SQL Server |
| C5 "ràng buộc" chưa nối | Làm một phần | Thiết kế không dạy tên ràng buộc ở 1.1; bài 1.4 đã nối | Đổi thành "các loại luật khác ở bài 5.2" |
| C6 "đang bật", "thông thường" | Không làm theo | Quy ước 2 yêu cầu điều kiện; bài 1.4 và 5.2 nói nạp hàng loạt có thể khác; hai vế không hứa quá | Giữ |
| C7 mã và tên phòng | Làm theo | Ví dụ đang đổi từ mã sang tên | Luật nói "phòng ban phải có trong danh mục phòng"; thêm giá trị `NV005` |
| C8 "quyền" nhiều nghĩa | Làm theo | "Mọi người đều thấy" trái với "theo quyền" | Viết rõ quyền được cấp, ai có quyền đọc, người được giao cập nhật |
| C9 Ứng dụng bỏ qua luật dữ liệu | Làm theo | Quy ước 2.3 | Ý 2 thêm đối chiếu giấy tờ gốc khi số liệu bất thường |
| C10 "hỏi và thao tác" | Làm theo | Từ "thao tác" chưa có nghĩa | Thống nhất "đọc và thay đổi dữ liệu"; đổi tiêu đề tiểu mục |
| X1 câu T-SQL | Làm theo | Grep: ngoài bài 1.2 cũ, không bài nào dùng T-SQL | Cắt khỏi 1.1 |
| X2 lặp mục tiêu, dòng bold rời | Làm theo | Quy ước 1 | Rút câu đầu đoạn chốt; đưa "hợp lệ chưa chắc đã đúng" vào câu Ghi nhớ |
| B1 bốn tiểu mục | Làm theo | Quy ước 2.5 ghi 0–3 | Định nghĩa database nằm ngay dưới tiêu đề phần chính, còn ba tiểu mục |
| B2 nối ví dụ với bài sau | Không làm theo | Làm câu trỏ dài ra, ngược mục tiêu độ dài | Giữ danh sách bài ngắn |
| B3 "hồ sơ", "hợp lệ" | Làm theo | "Hồ sơ" đang chỉ cả bản ghi lẫn giấy tờ | Đổi thành "giấy tờ gốc"; thêm vế giải nghĩa hợp lệ |
| B4 "trên web" | Làm theo | Đúng với trang Giới thiệu | Đổi thành "trang bài tập của khóa học" |
| B5 đáp án "Không" tuyệt đối | Làm theo | Đáp án đúng cho luật đang nói | Thêm điều kiện "nếu luật chỉ kiểm phòng có trong danh mục" |

## Thay đổi ngoài report

- Hay nhầm "Nghĩ database chỉ là Excel to hơn" bị bỏ vì sau khi sửa C1 nó lặp ý ngay trong phần chính; bài còn một ý Hay nhầm.
- `proseParagraphs` bỏ qua dòng `import`, vì đây không phải chữ của bài. Có test kèm.

## Kiểm thực tế

- Bản cuối: `npm test` 331/331; `npm run check` 0 lỗi, 0 cảnh báo, 3 hint nền; `npm run build` 132 trang; `npm run check:dist` 132 trang, 1998 liên kết.
- Bài dài 698 từ theo `proseParagraphs`.
- Trước khi sửa theo review đã xem build ở 1280×800 và 1024×720: ba ảnh tải đúng, không tràn ngang, không có tài nguyên lỗi, link tới `#chon-noi-thuc-hanh` đúng đích, câu ôn mở bằng Enter. Bản cuối mở lại ở 1280×800, xem mục cuối hồ sơ này nếu có sai khác.

## Giới hạn

- Không có câu lệnh hay số liệu mới, nên không chạy SQL. Câu "database còn cấp quyền tới từng bảng" dựa trên hiểu biết về `GRANT`, chưa đối chiếu lại tài liệu trong lượt này.
- Chưa đo thời lượng 7 phút với người học thật.
- Dưới 1024px toàn site chưa hỗ trợ.
- Giữ trên nhánh `feat/level-1-foundation-lessons`, không push.
