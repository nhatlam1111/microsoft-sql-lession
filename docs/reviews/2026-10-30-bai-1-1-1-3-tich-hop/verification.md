# Review tích hợp bài 1.1 và 1.3: hồ sơ xử lý

Lượt ngày 30/10/2026, sau hai review từng bài. [Report gốc](review.md) giữ nguyên byte so với `temp/review/2026-10-30-bai-1-1-1-3-tich-hop/review-tich-hop.md`.

Reviewer: agent mới, Claude Sonnet, effort high; đọc nguồn và HTML bằng grep, không mở browser, không chạy SQL hay `npm`. Không có reviewer mới sau khi sửa theo report này.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| F1 "câu ghi" không còn định nghĩa | Làm theo | Grep xác nhận chỉ còn hai chỗ ở 1.4, không bài nào giải thích | 1.4 thêm "(thêm, sửa, xóa dữ liệu)" ở lần dùng đầu |
| F2 câu luật ở 1.1 hứa rộng | Làm một phần | Bài 1.4 và 5.2 nói nạp hàng loạt có thể khác; thiết kế 30/10 đã bỏ nhánh nhập file khỏi 1.1 | 1.1 viết "khi thêm hoặc sửa theo cách thông thường", không thêm nhánh nhập file |
| F3 cầu nối "luật dữ liệu" và "ràng buộc" | Làm theo | Bài 1.4 định nghĩa ràng buộc nhưng không nối với 1.1 | 1.4 thêm "tức luật dữ liệu đã nói ở bài 1.1" |
| F5 hình 1.3 chỉ có ba cột | Làm theo | Script có 12 cột ở `NhanVien`; quy ước mục 3 yêu cầu nói rõ khi chỉ trích | Lời dẫn và chú thích nói trích ba trong 12 cột; đổi "ngoài cùng bên phải" thành "ở cuối hình" |
| F6 hai dạng ngày | Không làm theo | 1.3 nói về dạng gửi trong file, 2.2 nói về chuỗi viết trong SQL; không mâu thuẫn, ngoài phạm vi lượt này | Giữ |
| F7 câu trỏ rộng hơn | Làm một phần | "chi tiết độ dài ở bài 2.7" trỏ sai đích; các câu ở 2.5, 2.9, 3.8 có từ trước và vẫn đúng tên thuật ngữ | Bỏ câu trỏ ở 1.3; không sửa các bài sau |
| F8 `GioVao` | Không làm theo | 1.3 đã báo trước có kiểu khác và cách đọc | Giữ |
| F9 tài liệu chung | Làm một phần | "ba tiểu mục" đã sai; mốc "duyệt 20/10" chờ người làm khóa học đọc bản mới | `quy-uoc.md` đổi thành "các tiểu mục"; giữ mốc duyệt |
| F10 hồ sơ công ty | Làm theo | Mã minh họa của 1.3 chưa được ghi; 1.1 giờ nhắc IT | Thêm `NV049`–`NV051` ở mục 7, thêm 1.1 vào dòng Bên IT |
| F11 test thiếu bảo vệ | Làm theo | Định nghĩa khóa và giới hạn của kiểu phải có test | Thêm test cho 1.4, 1.3; chặn `NULL` ở 1.1, `bản ghi` ở 1.3 |
| F12 khóa cứng tiêu đề | Làm theo | Quy ước 4.6: tránh khóa cứng câu chữ | Test kiểm số tiểu mục và thứ tự, không kiểm chuỗi tiêu đề |
| G1–G3 | Giữ | Reviewer công nhận | Không đổi |

Các mục chưa kết luận ở phần 4 của report: công ty đã có database hay chưa vẫn giữ quyết định C3 của bài 1.1, vì bài 1.2 kể tiếp điều đó; các mục còn lại là giới hạn kiểm, không cần sửa.

## Sai khác so với thiết kế

Thiết kế bài 1.1 ghi không sửa bài khác. Bài 1.4 có hai sửa nhỏ vì đó là hệ quả trực tiếp của việc rút thuật ngữ khỏi 1.1.

## Kiểm thực tế

- Bản cuối: `npm test` 329/329; `npm run check` 0 lỗi, 0 cảnh báo, 3 hint nền; `npm run build` 132 trang; `npm run check:dist` 132 trang, 1998 liên kết.
- Bản build ở 1024×720: 1.1, 1.3, 1.4 không tràn ngang, không có tài nguyên lỗi; hai câu mới của 1.4 hiển thị đúng; ảnh 1.3 tải được.
- sha256 bản cuối: 1.1 `369c0da2…ee31`, 1.3 `de35c113…efc`, 1.4 `42b254c0…f891`.

## Bàn giao

`src/assets/lessons/1-3-database-table.png` chưa được track; bài 1.3 import file này nên phải nằm trong cùng commit.
