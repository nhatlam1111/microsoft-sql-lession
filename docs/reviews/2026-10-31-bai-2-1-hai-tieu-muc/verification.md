# Bài 2.1 hai tiểu mục: hồ sơ xử lý review

Lượt ngày 31/10/2026, sau khi đổi bố cục bài có câu lệnh trong `docs/quy-uoc.md` mục 2.1. [Report gốc](review.md) giữ nguyên byte so với `temp/review/2026-10-31-bai-2-1-hai-tieu-muc/review-bai-2-1-chon-cot-dat-ten-cot.md`.

Reviewer: agent mới, Claude Sonnet, effort high, đọc commit `59f6870` và build 14:20, chỉ đọc nguồn và HTML. Bản sau khi sửa chưa có reviewer đọc lại.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| F1 cụm `TOP (5)` | Làm một phần | Người làm khóa học đã chọn giữ `TOP` để xem thử bảng | Giữ đoạn và khối đọc; bỏ cảnh báo `ORDER BY` lặp với Hay nhầm 5; chuyển đoạn ra sau phần `AS` |
| F2 `ORDER BY` chưa có nghĩa | Làm theo | Thuật ngữ mới | Đoạn "Ở bài này chỉ cần…" ghi sắp xếp dòng bằng `ORDER BY` |
| F3 đoạn Copy with Headers | Làm theo | Chỉ cho SSMS, không đề nào cần | Còn hai câu; bỏ Ctrl+A, Format Cells; bỏ hàng Memo |
| F4 lặp ý alias | Làm theo | Quy ước 1 | Bỏ câu "chạy lại"; ý Results chỉ nói khác cách hiển thị; tách đoạn bốn ý |
| F5 neo về hình Excel | Làm theo | Sau khi chuyển `TOP`, đoạn đứng liền sau phần chọn cột | Mở bằng "Dòng tiêu đề `A1:C1` trong hình" |
| F6 "vật lý" | Làm theo | Thuật ngữ chưa dạy; quy ước vẫn cần lời phân biệt | Đổi thành "thực sự đọc dữ liệu" |
| F7 Ghi nhớ | Làm theo | Hàng chồng nhau | Còn bốn hàng |
| F8 "chữ mờ là gợi ý" | Làm theo | Không đề nào cần | Cắt |
| G1–G8 | Giữ | Reviewer công nhận | Không đổi |

Bỏ câu "chạy lại" (F4) thu hẹp phần trả lời "vì sao dùng `AS`" của lượt trước; ý nguồn dùng chung vẫn còn. Câu `Format Cells` và `Nếu ô dán vào là ngày thật` không còn trong bài nên hai chuỗi test tương ứng được bỏ.

## Kiểm thực tế

- Bản cuối: `npm test` 327/327; `npm run check` 0 lỗi, 0 cảnh báo, 3 hint nền; `npm run build` 129 trang; `npm run check:dist` 129 trang, 1952 liên kết.
- Độ dài phần chính tính từ đầu tới `RunFlow`: 1.235 từ thô trước khi gộp, 924 sau cùng.
- Câu lệnh và số liệu không đổi so với các lượt trước; `(48 rows affected)` và lỗi `TenNV` đã đối chiếu ngày 30/10, các giá trị drawer khớp `SELECT TOP (5) *` đã chạy. Lượt này không ghi dữ liệu.
- Bản `59f6870` xem ở rộng 1024: hai tiểu mục đúng thứ tự, hình Excel không cuộn ngang, không tràn trang, không lỗi console.
- Bản cuối xem ở 1024×720: hai tiểu mục, không tràn trang, hình Excel không cuộn ngang, `TOP` nằm sau phần `AS`, không lộ backtick.

## Giới hạn

- Chưa chạy thật trên trang bài tập vì cần mã truy cập; chưa kiểm trong SSMS thật.
- 18 phút là nhãn dự kiến, chưa đo.
- Tiểu mục đầu vẫn đông ý, reviewer đếm khoảng 15 ý; gọn hơn nữa phải bỏ hẳn `TOP`, việc này người làm khóa học đã chọn không làm.
