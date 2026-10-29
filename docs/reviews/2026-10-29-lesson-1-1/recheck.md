# Addendum kiểm sửa E1 — 29/10/2026

## Phạm vi và phiên bản

Chỉ kiểm sửa E1 của [report gốc](<E:/Projects/SQL Lession/temp/review/2026-10-29-lesson-1-1/review.md>), không review lại toàn bài hoặc sửa report gốc/sản phẩm.

Model kế thừa model của phiên; không đổi model, không tạo agent con. Công cụ thực tế: exec_command/PowerShell đọc đoạn source liên quan, đoạn HTML tương ứng, mtime và SHA256. Không browser, database, SQL/API/runner hoặc kiểm tương tác.

- Source: [bài 1.1, dòng 85](<E:/Projects/SQL Lession/src/content/lessons/1-1-database-la-gi.mdx:85>), mtime 2026-10-29 18:14:19 +07:00; SHA256 48A4597A512DBD44587ABBDBD13BDF6A1702C59DCE729EACC89867D0C4649A58.
- Build được người giao xác nhận hoàn tất 18:14:36 +07:00. Reviewer tự đọc [HTML mới](<E:/Projects/SQL Lession/dist/bai/1-1-database-la-gi/index.html>), mtime 2026-10-29 18:14:36 +07:00; SHA256 792A921A118DC0271C6E8C767151F04AD8FE5EE239B06A51774453733176E706.
- Thời điểm kiểm: 2026-10-29 18:15 +07:00.

## Kết quả kiểm riêng E1

**E1 — đã xử lý bằng biên tập câu dẫn.**

Source dòng 85 hiện có câu:

> Bạn sẽ học cách viết câu lệnh đọc dữ liệu ở bài 1.6.

HTML mới có nguyên câu này trong đúng đoạn phân biệt SQL/SQL Server/T-SQL. Vế cũ “câu lệnh đọc đầu tiên học ở bài 1.6” không còn trong HTML.

Cách nói mới chỉ định rõ nơi học cách viết, nên khớp với bài 1.2: người học có thể đọc hoặc chạy mẫu SELECT để xem danh mục trước khi học cú pháp tại 1.6. Phần định nghĩa SQL, vai SQL Server xử lý yêu cầu và tên T-SQL vẫn được giữ trong đoạn đã kiểm. Không cần thêm preview hoặc kiến thức mới để xử lý E1.

Không còn nhận xét mở đối với E1 trong phạm vi source + HTML này. Addendum không xác nhận UI hoặc SQL đã chạy đúng, không mở rộng kết luận của report gốc và không cấp quyền push/merge/deploy.
