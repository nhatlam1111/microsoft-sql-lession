# Gộp bài 1.6 và 2.1: hồ sơ xử lý review

Lượt ngày 30/10/2026, theo [thiết kế gộp](../../superpowers/specs/2026-10-30-merge-lessons-1-6-2-1-design.md). [Report gốc](review.md) giữ nguyên byte so với `temp/review/2026-10-30-gop-1-6-2-1/review-bai-2-1-chon-cot-dat-ten-cot.md`.

Reviewer: agent mới, Claude Sonnet, effort high, đọc commit `4a4a6ef` và build 21:56, chỉ đọc nguồn và HTML. Bản sau khi sửa chưa có reviewer đọc lại. Lượt này chỉ có một bài và phần trang Giới thiệu, không sửa công cụ, nên không có review tích hợp riêng.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| F1 lối vào chạy thử trên web | Làm theo | `guardExercise` không ràng buộc bảng nên chạy câu `NhanVien` trong đề 1 được; mã hỏi khi chạy (`askCode`) | Chỉ rõ kéo xuống mục Bài tập, lần đầu hỏi mã, chưa bấm Nộp bài |
| F2 Copy with Headers chỉ có ở SSMS | Làm theo | Lưới web là bảng HTML `res-grid` | Ghi "trong SSMS", thêm Ctrl+A, nói trang bài tập không có lệnh này; sửa Memo |
| F3 vì sao lấy 5 dòng | Làm theo | Đúng là chưa trả lời | Thêm một câu, bỏ đề xuất ghi số dòng cụ thể |
| F4 số liệu ở câu trả lời | Làm một phần | Quy ước mục 3: không thêm câu lệnh chỉ để chứng minh mọi con số | Chỉ rõ `(48 rows affected)`, nói vì câu không lọc nên có người đã nghỉ; giữ ba mã, ghi "trong dữ liệu mẫu" |
| F5 đoạn "Liệt kê cột giúp…" | Làm theo | Lặp ý, `.sql` chưa dạy | Bỏ câu 1, 3; câu 2 thêm vế `*` lấy thêm cột mới |
| F6 "Ở bài này chỉ cần…" | Làm theo | Hay nhầm 5 đã trỏ bài 2.6 | Bỏ 2.6, 3.4; câu phân quyền chuyển sang Ứng dụng 4 |
| F7 lời dặn ở mục Bài tập | Làm theo | `SqlEditor` chỉ có placeholder, không điền dòng `--` | Còn "mỗi lần chỉ nhận một câu" và một câu về chữ mờ |
| F8 Hay nhầm 3 dùng `N'HoTen'` | Làm theo | `SELECT 'HoTen'` đã chạy, trả chữ `HoTen` mỗi dòng | Bỏ `N`, thêm vế giá trị cố định, bỏ vế lặp ngoặc vuông |
| F9 Hay nhầm 1 "dòng cũ" | Làm theo | Từ mơ hồ, ý đã nói ở tiểu mục đầu | Viết lại, nêu hậu quả khi gửi đi |
| F10 in đậm, định dạng số | Làm một phần | Quy ước 2.2 | Bỏ đậm `cột`, `workbook`, `dòng`; `12` có code; giữ "ba cột", "năm dòng" vì là lời văn |
| F11 "đặt tên cột" | Làm theo | Spec để người viết chốt tiêu đề | Tiêu đề thành "chọn cột và đặt tiêu đề"; giữ slug |
| F12 câu hỏi nhỏ | Làm theo | Một vế là đủ | Thêm viết hoa từ khóa; nói vì sao đánh dấu `NV001`; sửa hàng Memo |
| F13 đọc lỗi ở Messages | Làm theo | Trang bài tập và lỗi đã chạy thật khớp nguyên văn | Thêm một vế ở câu `TenNV`, không thêm khối hình |
| GT nơi nhập mã | Làm theo | `ASK_CODE` hiện khi chưa có mã | Thêm một câu ở lối 1 |
| GT đoạn bôi đen khó tìm | Làm theo | Đoạn nằm cuối mục dài | Thêm mục `#chay-cau-lenh`, bài 2.1 trỏ tới |
| GT "dùng chung" mơ hồ | Làm theo | Đúng là đọc được hai nghĩa | Viết lại câu Edit Top 200 Rows |
| GT `SELECT INTO` | Không làm theo | Câu đã nói thẳng chữ `SELECT` chưa đủ để kết luận chỉ đọc | Giữ |
| GT lỗi khi nhầm database | Làm theo | `Invalid object name` đã chạy thật | Thêm dạng lỗi |
| GT `Must specify table to select from.` | Giữ | Đã chạy `SELECT TOP (5) *;`, đúng nguyên văn | Không đổi |

Nhận xét về tiểu mục đầu nặng không ghi thành finding: giữ, vì mọi ý trong đó cần cho lần chạy đầu; phần SSMS đã chuyển đi.

## Kiểm thực tế

- Bản cuối: `npm test` 324/324; `npm run check` 0 lỗi, 0 cảnh báo, 3 hint nền; `npm run build` 129 trang; `npm run check:dist` 129 trang, 1952 liên kết.
- `check:exercises` chạy trên YAML cuối: `2-1-1` ra 55 dòng, `2-1-2` và `2-1-3` ra 48, `2-1-4` ra 6; `check:data` báo không bảng nào lệch.
- Đối chiếu bằng `SELECT`: năm dòng `TOP (5)`; 48 hồ sơ, 12 cột, 14 hồ sơ `KD`, ba hồ sơ đã nghỉ `NV020`, `NV033`, `NV041`; 55 hợp đồng và tên cột `HopDong`; ba nguyên văn lỗi `Must specify table to select from.`, `Invalid column name 'TenNV'.`, `Invalid object name`.
- Bản `4a4a6ef` xem ở 1280×800 và 1024×720: không tràn ngang, không ảnh lỗi, không lỗi console, bốn thẻ bài tập, trang 1.6 cũ trả 404, bài 1.5 nối sang 2.1, Level 1 hiện 5 bài.
- Bản cuối xem ở rộng 1024: không tràn ngang, không lộ backtick, ba link sang trang Giới thiệu có đích.

## Giới hạn

- Chưa chạy thật trên trang bài tập vì cần mã truy cập; luồng chạy câu thử trong đề 1 và hỏi mã mới kiểm bằng đọc mã nguồn.
- Chưa kiểm trong SSMS thật: Ctrl+A, Copy with Headers, bôi đen, nút Sao chép.
- 22 phút là nhãn dự kiến, chưa đo với người học thật.
- Dưới 1024px toàn site chưa hỗ trợ.
- Link cũ của bài 1.6 trả 404. Bài tập lưu theo mã nên dấu hoàn thành cũ của 2.1 lệch một bài.
