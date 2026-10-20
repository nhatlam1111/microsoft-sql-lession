# Hướng dẫn làm việc với khóa học SQL Server

Trước khi viết, sửa hoặc review bài, đọc:

1. [Quy ước hiện hành](docs/quy-uoc.md): nội dung, độ sâu, định dạng, kiểm tra, review và an toàn dữ liệu.
2. [Khung bài hiện hành](docs/lesson-template.md): cấu trúc MDX, biến thể khái niệm/truy vấn và cách dùng các khối.
3. [Hồ sơ công ty](docs/ho-so-cong-ty.md) cùng các bài trước có liên quan.
4. [Bài 1.1 đã duyệt](src/content/lessons/1-1-database-la-gi.mdx): mẫu trình bày từ 20/10/2026.

Quy ước và template hiện hành thay các chỉ dẫn bố cục cũ trong spec/plan/mockup. Khi làm tiếp, dùng khung gộp Excel/SQL; chỉ chuyển các bài cũ thuộc phạm vi người dùng yêu cầu, không tự chuyển hàng loạt. Không thêm bài vào danh sách cho phép khung cũ trong test.

Thực hiện quy trình kiểm tra và review độc lập ở mục 4 của quy ước; ghi đúng kết quả, lỗi nền và giới hạn công cụ. Cập nhật spec/plan sau mỗi vòng sửa. Database dùng chung chỉ được đọc, câu ghi chỉ qua luồng luôn hoàn tác theo mục 5; push/deploy cần người làm khóa học đồng ý.

Khi review bằng Codex, giữ model đang dùng của phiên và để agent reviewer kế thừa model đó, không chỉ định model khác. Quy định Sonnet dành cho review bằng Claude; chi tiết ở mục 4.5 của quy ước.
