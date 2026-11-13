# Áp dụng quy trình biên soạn và pilot hai bài

Ngày 13/11/2026. Người dùng yêu cầu áp dụng đề xuất trong phần hạn mức còn lại.
Phạm vi chốt: quy trình chung, adapter Codex/Claude, skill course-author đồng bộ, chuẩn định hướng phần 4–5 và pilot lời giảng 1.1/3.10. Không viết lại 19 bài, đổi menu/ID/URL, sửa runner/API/SQL/YAML, push/deploy.

- [x] Cập nhật quy ước, template, AGENTS/CLAUDE và quy trình đọc theo tác động.
- [x] Tạo skill course-author hai bản cùng nội dung; giữ bốn skill dạy tương tác.
- [x] Chốt định hướng phần 4–5 thành tài liệu hiện hành, để áp dụng từng bài.
- [x] Pilot 1.1: thay thuật ngữ chưa giải nghĩa bằng ví dụ mã chung.
- [x] Pilot 3.10: nối COUNT(MaHD) với số dòng; chia nhịp tính/lọc và làm rõ hai ví dụ drawer.
- [x] Kiểm source, MDX/build, test và kỹ năng; ghi 7 hint nền và giới hạn validator thiếu PyYAML.
- [x] Review độc lập từng bài; sửa hai finding 1.1, cùng reviewer xác nhận; 3.10 không có finding cần sửa.
- [x] Bàn giao bằng chứng và giới hạn; không suy mức tiết kiệm usage từ mẫu không cùng nhiệm vụ/model.

Bằng chứng schema: database/HRM_Demo.sql dòng 75 khai báo MaHD NOT NULL PRIMARY KEY. Chỉ xác minh thiết kế trong source, không xác minh database live. SQL và dữ liệu minh họa giữ nguyên.
Không có baseline cùng nhiệm vụ/model; không kết luận mức giảm usage hay tác động học tập từ pilot này.
Hồ sơ kiểm/review và ma trận xử lý: [verification](../../verification/2026-11-13-authoring-pilot.md). Bộ kiểm đầy đủ 596/596 đạt; sau sửa review, 83 kiểm bị ảnh hưởng và build/check:dist đạt. Hai agent bị ngắt do quota đã được tiếp tục đúng lượt, không tạo thay thế. Chưa push/deploy.

Bổ sung theo yêu cầu đối chiếu Claude: đã cập nhật gói giao việc, mức từng ý, điều kiện dùng lại bằng chứng và bàn giao trong cùng hồ sơ. Hai gói thử 1.1/3.10 cùng kiểm lượt bổ sung ở verification phía trên; không sửa lại bài. Phép đo hai lượt biên soạn thật tiếp theo còn chờ nhiệm vụ mới, chưa có kết luận tiết kiệm token.
