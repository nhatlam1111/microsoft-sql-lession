# Kiểm lại riêng C1 — bài 2.2

Model: **kế thừa model của phiên**, tiếp tục cùng reviewer và lượt review. Chỉ kiểm việc xử lý C1 của [report gốc](<E:/Projects/SQL Lession/temp/review/2026-10-31-lesson-2-2/review-bai-2-2.md>); không review lại bài hoặc sửa report gốc.

## Phiên bản và cách kiểm

- [MDX](<E:/Projects/SQL Lession/src/content/lessons/2-2-where-loc-nhu-autofilter.mdx>): SHA256 tính lại `1C4261FAC141161AB0FB0B452B0F985054D4B91C4B0E502471DCEB3ACD73AF5F`.
- [HTML](<E:/Projects/SQL Lession/dist/bai/2-2-where-loc-nhu-autofilter/index.html>): SHA256 tính lại `AF0541FF124BAFB886AC911BEE0F8C0B7D285C5E9FDFB90B51BD0E59A4D9479E`.
- Cả hai khớp `temp/verification/2026-10-31-lesson-2-2/source-build-final-manifest.json`; manifest ghi HTML được dựng lúc `2026-10-31T15:32:24.5029131+07:00`.
- Dùng PowerShell đọc đoạn nguồn liên quan, tính hash; Python thư viện chuẩn đọc và giải mã nội dung HTML. Không browser, SQL hoặc evidence khác; không chạy lại build/test.

## Kết quả C1

**C1 đã được xử lý đúng đề xuất.**

- Dòng 56 hiện kết thúc bằng: “`WHERE` chỉ lọc dòng trả về, không sửa hay xóa hồ sơ nguồn.” Vế lặp “có cột `TrangThai` trong danh sách cột chưa có nghĩa là đã lọc trạng thái” đã được cắt; lời giải thích không sửa/xóa nguồn vẫn còn.
- Hay nhầm 3 ở dòng 148 vẫn giữ nguyên lỗi và hậu quả: “Chỉ thêm `TrangThai` vào `SELECT` vẫn trả cả hồ sơ đã nghỉ.”
- HTML mới có cùng đoạn đã rút và vẫn có Hay nhầm 3; không còn vế đã yêu cầu cắt.

Không còn yêu cầu sửa đối với C1. Xác nhận này chỉ áp dụng cho thay đổi câu chữ đã kiểm trên nguồn và HTML tĩnh, không mở rộng thành xác nhận SQL live hoặc tương tác UI. Các giới hạn của report gốc vẫn giữ nguyên.
