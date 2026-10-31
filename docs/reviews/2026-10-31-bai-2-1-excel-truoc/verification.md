# Bài 2.1 đi từ Excel sang SQL: hồ sơ xử lý review

Lượt ngày 31/10/2026, theo [thiết kế](../../superpowers/specs/2026-10-31-lesson-2-1-excel-first-design.md). [Report gốc](review.md) giữ nguyên byte so với `temp/review/2026-10-31-bai-2-1-excel-truoc/review-bai-2-1-chon-cot-dat-ten-cot.md`.

Reviewer: agent mới, Claude Sonnet, effort high, đọc commit `785a1d2` và build 13:54, chỉ đọc nguồn và HTML. Bản sau khi sửa chưa có reviewer đọc lại.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| F1 hướng dẫn tự chạy | Làm theo | `Làm bài` mở trang riêng, nháp lưu theo mã đề, đọc trong `ExerciseWorkspace.tsx` | Nói mở trang bài tập, `Nộp bài` chấm theo đề, xem xong xóa câu rồi quay lại; SSMS nói rõ dán câu vào New Query |
| F2 "đúng số Messages báo" | Làm theo | Messages chỉ báo số dòng của chính kết quả | Đủ `48` vì bằng số dòng của bảng và câu không lọc |
| F3 vì sao dùng alias | Làm theo | Bài chưa trả lời | Thêm hai vế: sửa ở bản gửi đi như Excel, tiêu đề đi theo câu lệnh; tách thành hai đoạn |
| F4 mục đích `TOP` | Làm theo | `ChamCong` có 806 dòng đã chạy thật | Thêm ví dụ bảng lớn, nói chỉ cần nhận ra, bài 2.4 dùng cùng `ORDER BY` |
| F5 lời dẫn Bài tập | Làm một phần | "Bộ chấm" khớp cách gọi trong đề bài tập | Đổi "khung soạn" thành "ô nhập"; giữ "Bộ chấm" |
| F6 câu về bảng nguồn thêm cột | Làm theo | Quy ước 1: chi tiết ngoài phạm vi | Cắt |
| F7 câu nối kết quả với hình Excel | Làm theo | Câu khó đọc | Viết thẳng `2024-03-01` cùng ngày với `01/03/2024` |
| F8 điểm tựa Excel ở Ghi nhớ | Làm theo | Hai hàng không có trong thân bài | Sửa hai hàng theo việc đã nói |
| F9 "hai cột còn lại" | Thay bằng cách khác | Hình đổi còn bốn cột | Câu nói rõ `NgaySinh` không gửi |
| F9 "câu này chỉ đọc" | Làm theo | Trang Giới thiệu có `SELECT INTO` | Chỉ rõ câu `SELECT … FROM` như trên |
| F9 "câu đọc một bảng" | Làm theo | Vế nặng | Viết lại |
| F9 câu `N` trước ngoặc | Không làm theo | Người học vừa học `N'…'` ở bài 1.3, dễ thêm nhầm; test bảo vệ | Giữ |
| F9 "từ khóa", "câu lệnh" | Làm theo | Từ chưa nói rõ | Thêm vế ví dụ từ khóa, "còn gọi là câu lệnh", gửi cho SQL Server |
| Gợi ý thứ tự Hay nhầm | Làm theo | Thiếu dấu phẩy gần lỗi của câu chính hơn | Ý `TOP` chuyển xuống cuối |
| Ghi chú `TOP` ở trang Giới thiệu | Giữ | Ví dụ vẫn đọc được | Không đổi |
| G1–G9 | Giữ | Reviewer công nhận | Không đổi |

Ngoài report: xem bản build thấy hình Excel đầu bị cắt cột `NgayVaoLam` ở rộng 1024px, nên rút còn bốn cột.

## Kiểm thực tế

- Bản cuối: `npm test` 325/325; `npm run check` 0 lỗi, 0 cảnh báo, 3 hint nền; `npm run build` 129 trang; `npm run check:dist` 129 trang, 1952 liên kết.
- Đối chiếu bằng `SELECT`: `NgaySinh`, `NgayVaoLam` của `NV001` đến `NV003`; `48` hồ sơ; `806` dòng `ChamCong`. Nguyên văn `Invalid column name 'TenNV'.` đã kiểm ở lượt ngày 30/10. Lượt này không ghi dữ liệu nên không chạy `check:data`.
- Bản `785a1d2` xem ở 1280×800: tiểu mục đầu có hình Excel trước khối SQL, một khối kết quả, không tràn ngang, không lỗi console.
- Bản cuối xem ở 1024×720: hai hình Excel không có thanh cuộn ngang, đủ cột `NgayVaoLam`, không tràn trang.

## Giới hạn

- Chưa chạy thật trên trang bài tập vì cần mã truy cập; lời dặn xóa câu thử dựa trên đọc mã nguồn.
- Chưa kiểm trong SSMS thật.
- 22 phút là nhãn dự kiến, chưa đo; bài có thể ngắn hơn sau khi bỏ một lần chạy.
- Dưới 1024px toàn site chưa hỗ trợ.
