# Khóa học SQL Server cho BA/PM

Mục tiêu: người chỉ biết Excel cơ bản đọc hiểu, truy vấn và phân tích dữ liệu; biết phối hợp xử lý sự cố, không đào tạo DBA.

Bắt đầu bằng [quy trình biên soạn](docs/bien-soan.md), rồi chỉ đọc các mục cần cho loại thay đổi. [Quy ước](docs/quy-uoc.md) là chuẩn quyết định; [template](docs/lesson-template.md) hướng dẫn MDX/component. Spec, plan và review cũ không thay quy ước hiện hành.

Không chuyển hàng loạt bài cũ hay thêm ngoại lệ khung cũ vào test. Database chung chỉ đọc; câu ghi chỉ qua runner luôn hoàn tác theo mục 5 của quy ước. Push/deploy cần người làm khóa học đồng ý.

## Review theo công cụ

Claude: reviewer Sonnet, effort high, ngữ cảnh mới. Nếu phiên không hỗ trợ Agent hoặc chọn effort, ghi giới hạn và giao gói sang chat độc lập; không giả lập hai vai trong cùng lịch sử. Codex dùng GPT-6.1 Terra/high, fork_turns none.

Gói giao review và điều kiện review tích hợp theo mục 4.5 của quy ước. Kiểm tiền đề từng đề, giữ report gốc, tách kiểm source/HTML/UI/SQL; không lấy Ready làm bằng chứng kỹ thuật hay quyền push.

## Skill

Dùng skill course-author cho biên soạn/review bài MDX trong repo; hai bản .agents/skills và .claude/skills phải đồng bộ. Skill chỉ dẫn về tài liệu chung, không sao chép chính sách.

teach, source-verifier, hidden-case-trainer và cognitive-pacer chỉ dùng khi người làm khóa học gọi rõ để dạy tương tác. Chúng không tự tạo learning-workspace/HTML, tìm nguồn hay bẫy kiến trúc khi biên soạn bài. Quy ước repo thắng nếu xung đột. Khi sửa skill, cập nhật cả .agents/skills và .claude/skills; không tự sửa bản dùng chung ở repo khác.
