# Bài 1.1: hồ sơ xử lý review và kiểm thực tế

Lượt: viết lại thành một câu chuyện từ hai bản Excel, ngày 30/10/2026. [Report gốc](review.md) giữ nguyên byte so với `temp/review/2026-10-30-lesson-1-1-one-story/review-bai-1-1-database-la-gi.md`.

Reviewer: agent mới, Claude Sonnet, effort high, đọc source sha256 `52ce90e0…9b93` và build 16:08, chỉ đọc nguồn và HTML. Bản sau khi sửa có sha256 `bc4f4490…b43c`, chưa có reviewer từng bài đọc lại; [review tích hợp](../2026-10-30-bai-1-1-1-3-tich-hop/verification.md) đọc bản này. Bản cuối sau lượt đó có sha256 `369c0da2…ee31`, thêm sửa F2.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| S1 "việc đầu tiên" mâu thuẫn với ba bước | Làm theo | Đúng là tự mâu thuẫn | Đổi thành "hai bên cần thống nhất một nguồn chính thức" |
| S2 "phiên bản SQL" | Làm theo | Microsoft Learn mô tả T-SQL là lệnh các công cụ gửi tới SQL Server, không phải số phiên bản | Đổi thành "cách viết SQL của Microsoft" |
| C1 ai đọc nguồn chung, bằng gì | Làm theo | Người mới dễ nghĩ ai cũng phải viết SQL | Thêm câu người không viết SQL xem qua màn hình hệ thống hoặc báo cáo |
| C2 đối chiếu với gì | Làm theo | Bước 3 thiếu bổ ngữ | Thêm "với từng bản Excel đang giữ" |
| C3 database có sẵn hay đề xuất | Làm một phần | Spec giữ nguyên tình huống; bài 1.2 mới kể về database nhân sự | Nêu "cũng là cách khóa học đi theo", không kể thêm về công ty |
| C4 nhiều tên cho bộ mẫu | Làm một phần | Tên `HRM_Demo` thuộc bài 1.2 | Giới thiệu bộ dữ liệu nhân sự mẫu dùng chung ngay ở chỗ nói bảng; giả định thêm "của khóa học"; "Bài 1.2 hướng dẫn…" |
| C5 câu ôn 4 dạy bù | Làm theo | Quy ước: không dùng tự kiểm tra để dạy bù | Bước 3 thêm vế mốc khác nhau vẫn đúng; đổi "bản chốt", "báo cáo chốt" thành chữ thường dùng |
| C6 database hơn workbook dùng chung | Không làm theo | Reviewer xếp có thể bỏ qua; thêm ý ngược mục tiêu giảm tải | Giữ Hay nhầm 1 |
| C7 giả định mơ hồ | Làm theo | Lúc đó bài chưa nói tới việc lấy dữ liệu | Viết lại thành danh sách nhân sự theo phòng, trước khi hai file được lập |
| X1 `bản ghi` | Không làm theo | Bài 1.4 dùng lại | Giữ |
| X2 câu mở tiểu mục 3 | Làm một phần | Cần lời chuyển ý có lý do | Thay bằng câu database không được mở như mở một file |
| X3 ví dụ Quân chuyển phòng lần nữa | Làm theo | Lặp câu liền trước | Cắt; ý file xuất vẫn còn |
| B1 nhiều cách gọi vai và nguồn | Làm một phần | Test và câu trả lời cần "người có quyền" | Dùng "người có quyền" nhất quán; "nguồn chung đó" nối với nguồn chính thức |
| B2 chi tiết đoạn luật | Làm một phần | "Đang bật" là điều kiện quy ước yêu cầu; spec không dạy tên ràng buộc | Giữ "đang bật"; đổi thành "có trong danh mục"; câu trỏ bài nói các luật có tên riêng; vế về thời điểm lưu được viết lại ở lượt tích hợp |
| B3 caption hình 1, 2 | Làm theo | Caption cũ gợi hình là database thật hoặc màn hình thật | Sửa hai caption; ảnh giữ nguyên |
| B4 ý Ứng dụng | Làm một phần | Người học không tự khai báo luật | Ý 2 đổi thành hỏi IT luật nào đã khai báo; ý 4 giữ vì đã có điều kiện |
| B5 "ba dòng giống nhau" | Làm theo | Câu tự mâu thuẫn nhẹ | Đổi thành "hai bản giống nhau" |
| B6 `Memo` hiện kiểu mã | Không làm theo | Cách hiển thị chung của component, quy ước không sửa vì một bài | Giữ |

## Sai khác so với thiết kế

- Bỏ thêm yêu cầu test `không phải ô chọn trên màn hình` ở bài 1.1 vì câu đó thuộc khóa ngoại; bài 1.4 có test riêng.
- Đoạn file xuất rút còn hai câu theo X3.

## Kiểm thực tế

- Bản cuối: `npm test` 329/329; `npm run check` 0 lỗi, 0 cảnh báo, 3 hint nền; `npm run build` 132 trang; `npm run check:dist` 132 trang, 1998 liên kết.
- Bản build ở 1280×800 và 1024×720: hai hình Excel, ba ảnh tải đúng, không tràn ngang, không lộ backtick, không có tài nguyên lỗi. Câu ôn 3 mở bằng Enter trên bản trước khi sửa theo review; nội dung câu không đổi.
- Lỗi 404 trong console đến từ lần mở địa chỉ gốc `localhost:4321`, không thuộc trang bài.
- Bài còn 1.872 từ theo `wc`, trước đó 2.114.

## Giới hạn

- Không chạy SQL live; hình Excel là minh họa, `NV001`, `NV005` đối chiếu với hồ sơ công ty.
- Chưa kiểm dưới 1024px vì toàn site chưa hỗ trợ.
- 12 phút là nhãn dự kiến, chưa đo với người học thật.
- Giữ bản local, không commit, push hay deploy.
