# Kiểm trước khi đăng Phụ lục

Ngày 01/11/2026, sau khi bàn giao local, người làm khóa học yêu cầu: “đẩy lên main nhé bạn”. Đây là quyền merge và push lên main theo mục5 của quy ước; không dùng kết luận reviewer thay quyền này.

- Đã fetch origin; main tại máy và origin/main cùng ở `5c2604a`, workspace sạch.
- Nhánh đã kiểm: `codex/appendix-reference-pl-1-6`, cuối `636b108682653d7366b330eee18319e37b6f32fb`.
- Đã merge không xung đột vào main: `8a90bf507200751549e62f8c686819b17ab15d55`. Tree merge và tree nhánh đã kiểm cùng là `ee2671e9ce33bcc57e6df5f557f719e5e32d7d29`; không có thay đổi sản phẩm sau kiểm385tests/build136trang/check:dist2.502link.
- Một agent đọc độc lập xác nhận workflow Pages sẽ chạy trên push main, gồm check/test/build/check:dist và deploy. Workflow API không thuộc lần đăng này: không có đường dẫn thay đổi khớp bộ lọc API/guard/grader/YAML.
- Không chạy SQL/API hoặc đổi dữ liệu/cấu hình để đăng. Giữ các hint/audit nền và giới hạn kiểm trong `verification.md`.

File này là snapshot **trước push**, không xác nhận CI/deploy đã thành công. Sau push phải kiểm đúng SHA của lượt Pages và kiểm index cùng6trang public khớp build đã kiểm. Run GitHub Actions và kết quả URL thực tế được ghi trong phiên bàn giao/lưu log ở `temp/verification/2026-11-01-appendix-reference/`; không tạo thêm một lần deploy chỉ để đổi snapshot này thành kết luận sau sự kiện.
