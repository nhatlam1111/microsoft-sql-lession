# Cập nhật bài 2.2 theo bài 2.1 và quy ước hiện hành

## Phạm vi và căn cứ

Yêu cầu người làm khóa học: cập nhật bài 2.2 theo `docs/quy-uoc.md`, `docs/lesson-template.md` và bài 2.1 hiện hành. Đây là chuyển khung một bài đã có theo thiết kế được yêu cầu, không mở thiết kế giao diện mới. Giữ tình huống 14 hồ sơ KD, bốn cột và ba bài tập; không đổi YAML, dữ liệu mẫu, API hoặc component. Source bắt đầu: `f344099d9e3f9fa58b33a5c0762e6cfbaa467f93` trên checkout `feat/lesson-2-1-excel-first`, ban đầu sạch.

## Cách thực hiện

Chọn chuyển đầy đủ mạch kể theo bài 2.1: Excel → một câu SQL → LineMap; tiểu mục sau RunFlow → Result → trả lời chị Hạnh. Chỉ gộp tiêu đề sẽ còn nhiều truy vấn và ví dụ ngoài tình huống nên không đáp ứng mục 2.1. Viết lại tình huống hoặc đổi bài tập không cần thiết để đạt yêu cầu.

Áp dụng `teach` vào tiền đề, mạch giải thích và giảm tải; không tạo learning-workspace, HTML, hồ sơ học cá nhân hoặc gọi ba teach-skills khác khi chưa được gọi rõ. Dùng Superpowers để ghi thiết kế/kế hoạch, thực hiện và kiểm bằng chứng. Tự thực hiện trong checkout sẵn có, review độc lập bằng agent mới theo quy ước repo.

## Nội dung phải giữ

- Phạm vi mọi hồ sơ hiện lưu MaPB KD, gồm người đã nghỉ; không tự thêm trạng thái/ngày hay dựng phòng lịch sử.
- Một câu SQL chính, WHERE so sánh chứ không gán; tên cột khác chuỗi; mã khác tên phòng; alias chưa dùng được trong WHERE.
- RunFlow theo logic FROM 48 → WHERE 14 → SELECT 14; giữ bảng trích, cột và tổng đúng, bước cuối là danh sách gửi chị Hạnh.
- Excel lọc ẩn dòng, số dòng nhảy cóc; SQL SELECT không sửa nguồn. Thứ tự dòng chưa được bảo đảm.
- Giữ tiền đề Unicode và lọc từ ngày cho bài tập bằng lời ngắn trước phần ôn, không thêm truy vấn khác. Nêu N như bài 1.3; >= gồm mốc; yyyymmdd, date và chuyển kiểu ngầm; không tự đặt mốc kết thúc. Bỏ bảng sáu phép so sánh và ví dụ HopDong/PhongBan không cần cho ba đề hiện có.
- Bỏ mục phụ cũ và gỡ bài 2.2 khỏi danh sách khung cũ; sửa test khóa câu chữ cũ thành bảo vệ kiến thức/phạm vi còn áp dụng.

## Nghiệm thu và giới hạn

Chạy SQL chỉ SELECT để kiểm câu chính, từng bước, bảng trích và nguyên văn lỗi; dùng kết nối local hiện có khi không có công cụ MCP azure-sql trong phiên, không in credential. Chạy API build/check:exercises, check:data, npm test/check/build/check:dist. Xem bản build, drawer, highlight, sao chép/thụt lề. Review độc lập dùng ngữ cảnh mới, model kế thừa, không truy cập DB/secret; kiểm tiền đề từng đề. Ghi riêng lỗi nền/phần chưa kiểm, xử lý từng nhận xét. Không push/deploy.

## Trạng thái

Hoàn tất hai vòng. Vòng 1 chuyển khung và kiểm SQL SELECT-only; reviewer Codex mới, ngữ cảnh mới/model kế thừa đọc nguồn/HTML, kiểm đủ tiền đề từng đề. Vòng 2 làm theo finding C1 mức thấp: bỏ vế lặp cuối dòng 56, giữ Hay nhầm 3; không thay SQL/YAML/số liệu. Cùng reviewer xác nhận C1 đã xử lý trên source/build cuối.

Kiểm cuối: 328 test đạt, Astro check không lỗi/cảnh báo (ba hint deprecated sẵn có); build/check:dist đạt 129 trang/1951 link. API build/check:exercises đạt 76 bài; check:data không bảng nào lệch. Browser kiểm hai viewport desktop, drawer/highlight/copy-paste và tab bốn cột; chưa kiểm SSMS thật hoặc chạy/nộp SQL trên web. [Hồ sơ, report gốc, ma trận và giới hạn](../../reviews/2026-10-31-lesson-2-2/verification.md). Không commit/push/deploy.

Sau bàn giao, người dùng đã yêu cầu merge main và push ngày 31/10/2026; xem [hồ sơ tích hợp/kiểm trước xuất bản](../../reviews/2026-10-31-publish-2-2-2-4/verification.md). Quyền mới này áp dụng cho thao tác Git, không thay đổi nội dung hoặc kết luận review đã lưu.
