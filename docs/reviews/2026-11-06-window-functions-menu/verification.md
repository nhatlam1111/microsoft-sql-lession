# Kiểm tra menu hàm cửa sổ ngày 06/11/2026

## Review tích hợp

[Review tích hợp](integration-review.md) dùng agent Codex cấu hình `gpt-6.1-terra`, effort `high`, ngữ cảnh mới. Công cụ không cung cấp xác nhận độc lập model thực tế. Agent đọc nguồn và bản build ban đầu, rà tiền đề 12 đề trong bốn bài dùng lại.

1. **Làm theo.** Bài 3.13 nói rõ câu kiểm lọc mã NV021 và còn ba hợp đồng. Câu chính ở phần sau lọc số thứ tự ở ngoài CTE. Phép kiểm và truy vấn giữ nguyên.
2. **Giữ được.** Mạch CTE, xếp hạng và khung cửa sổ có đủ giải thích tại bài hiện có cho các đề được chuyển. Hai đề cương ở giữa sẽ được viết đầy đủ ở lượt biên soạn.
3. **Giữ được.** Ba mục mới ghi rõ là đề cương và có tên hàm trong chỉ mục tìm kiếm.
4. **Giữ được.** Bài PIVOT và bài chất lượng dữ liệu chuyển đúng số. Bài gộp nêu phần tình huống có nguồn là dự kiến.

## Bằng chứng của tác giả

- `npm test` đạt 596/596 trên bản cuối. Build đạt, `check:dist` đọc 280 trang và 4.141 liên kết. `npm run check` có 0 lỗi, 0 cảnh báo và 7 gợi ý về API cũ. SHA-256 của `dist/index.html` bản cuối là `176BC9DF9728DB7360879D24D4A8363842DEF45C7D4867F38EE71939100E303A`.
- Chrome ở 1280 px và 390 px xác nhận 19 mục Trung cấp, 52 mục toàn khóa, đúng thứ tự và tên trong sidebar, ba trang đề cương và tìm kiếm theo tên hàm. Ở 1280 px đã mở hai nhánh Mindmap và thấy đủ các bài 3.13–3.19. Tên 3.19 xuống dòng và không tràn khung sidebar trên bản cuối.
- Chrome xác nhận các URL bài lũy kế, PIVOT và cả hai bài chất lượng dữ liệu đến đúng đích. Ba URL lịch sử của bài đối soát trả 404. Năm bộ tiến độ thử bao phủ v1–v4, trạng thái hoàn thành bài soi dữ liệu, cờ từ đề cương, trường hợp chỉ học đề cương và trường hợp dừng ở bài đã gỡ. Đã mở URL bài tập cũ và xác nhận editor nạp đúng bản nháp.
- So với nguồn gốc, SQL, RunFlow, Result và dữ liệu cả 12 đề của bốn bài dùng lại khớp nguyên văn. API build có 82 đề. `check:exercises` chạy qua runner hoàn tác và đạt. `check:data` báo cả 7 bảng khớp checksum.
