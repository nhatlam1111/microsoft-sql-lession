# Xử lý review bài 4.5

Đã đọc trọn report gốc của learner mới, model kế thừa. Bài được duyệt đọc hiểu/noExercises; không có YAML nên không cần giai đoạn mở answer.

| Nhận xét / giới hạn | Quyết định | Xử lý / căn cứ |
|---|---|---|
| Ôn chưa trực tiếp kiểm cột/nguồn của định nghĩa | Làm theo | Sửa câu3 để hỏi bốn cột/bảng nguồn cùng tác động lọc IT/thứ tự. Đáp án lấy từ lời giảng cũ, vẫn năm câu; không thêm SQL nộp hoặc kiến thức sau Memo. |
| Đủ tiền đề năm mục tiêu/câu hỏi; các phần giữ được | Không làm theo — giữ nội dung | Giữ view thường, dbo/schema, CTE, batch/quyền và hai mẫu copy=false; không mở phạm vi indexed view hoặc cấp quyền thực tế. |
| UI/hoàn thành/clipboard chưa kiểm | Làm một phần | HTML đối chiếu source:5h2,5details sauMemo,2SQL/0copy, không route Bài tập/Result. Chưa có tương tác browser hoặc viewport, không báo UI đạt. |
| CREATE bị chặn/view chưa có/quyền chưa xác minh runtime | Làm một phần | Source guard chặn CREATE; script mẫu không có CREATE VIEW. Đối chiếu CREATE VIEW với tài liệu Microsoft ngày26/10/2026 (link trong spec), không tự tạo view. Không có SQL Server connection nên hiện trạng live/quyền chưa nghiệm thu. |

Catalog test hiện có RED1fail/60pass trước khi đổi summary; GREEN61/61 sau soạn. Suite318/47, Astro0error/0warning/3hints nền; build129pages,1961links, check:dist PASS. Hai mẫu không giả kết quả thành công. Sau sửa câu ôn chạy lại content test/build/HTML/dist; số thực ghi trong handoff cuối chuỗi. Không thêm snapshot khóa câu chữ. README phân biệt bài đầy đủ và bài truy vấn để mô tả đúng biến thể khái niệm; template/README ghi noExercises gồm4.5. Không YAML, không đổi schema/UI/API/guard/seed. Chưa push/merge/deploy.

## Sau review tích hợp

F1 tích hợp xác nhận hướng dẫn hoàn thành tại trang giới thiệu và README còn giới hạn nhóm1.1–1.5, đồng thời README mặc định cóSQL thì cóbài tập. Làm theo: dùng điều kiện “bài không có mục Bài tập”, bỏ khẳng định sai cho hai mẫu4.5. Chỉ sửa copy hướng dẫn, không thay layout/component/schema/runner hoặc thêm prose snapshot. Chạy existing suite/check/build/dist và đọc HTML câu đã sửa; chuyển commit sang4.6 bằng merge feature branch, không main. Spec/plan/hồ sơ chung cuối lượt ghi quyết định và kết quả.
