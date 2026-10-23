# Review tích hợp 3.1–3.3 — 23/10/2026

Công cụ: Codex, kế thừa model của phiên. Nhánh được đọc: `codex/review-lessons-3-1-3-3`.

**Kết luận:** chưa phát hiện lỗi có tác động cụ thể cần sửa trước khi tích hợp trong phạm vi đọc tĩnh này. Không đề xuất mở thêm kiến thức hay đổi cấu trúc bài.

Đã đọc trọn MDX và YAML của ba bài, đối chiếu AGENTS.md, quy ước, template, hồ sơ công ty và bài 1.1. Không đọc spec/plan, review cũ, seed, bằng chứng tạm hoặc lịch sử tác giả.

Các câu hỏi tích hợp đã tự đặt:

- **Vì sao đếm dòng, đếm email và tính bình quân có mẫu số khác nhau?** Bài 3.1 trả lời đủ bằng `COUNT(*)`, `COUNT(Email)`, ví dụ `2 / NULL / 0`, điều kiện `SoNgay NOT NULL` và cảnh báo email khác NULL chưa chắc hợp lệ. Bài 3.2 bổ sung NULL của khóa nhóm thành một nhóm; không mâu thuẫn với việc hàm tổng hợp bỏ NULL ở cột được tính.
- **Vì sao từ một dòng thành nhiều dòng, rồi chỉ còn KD?** Bài 3.2 giải thích khóa nhóm, phạm vi đang làm và đổi độ chi tiết khi thêm trạng thái; bài 3.3 giữ nguyên phạm vi đó, lọc nhóm sau khi đếm. Ranh giới `> 10` loại IT đúng 10 được nói rõ, không đánh tráo số hồ sơ với đánh giá thiếu người.
- **Đề yêu cầu điều gì và đáp án có làm đúng điều đó?** Chín cặp đề–answer khớp về phạm vi trạng thái/tháng, toàn bộ số ngày trên đơn, khóa nhóm, biên ngưỡng, số/thứ tự cột và thứ tự dòng. Các đề đổi phạm vi hoặc chỉ tiêu so với ví dụ; không thấy đáp án nguyên văn bị chép trong ba MDX.

## Diff hiện tại

Ba sửa biên tập không làm mất điều kiện: 3.1 nói chính xác bảng FROM trích 10/20 và WHERE đủ 9; 3.2 thêm quy tắc nhóm NULL; 3.3 cắt câu lặp nhưng phần giảng và Hay nhầm vẫn giữ khác biệt WHERE/HAVING.

Helper `tests/helpers/lesson-blocks.ts` chỉ chuẩn hóa CRLF/CR thành LF trước khi trích dữ liệu và trả body. Đã đọc các nơi gọi helper trong ba file test: các kiểm số liệu, phạm vi, thứ tự logic, focus và lộ đáp án vẫn còn. Không thấy nới kiểm nội dung từ thay đổi này.

## Giới hạn

Không kết nối database, không gọi API/browser, không chạy test/build và không kiểm hiển thị trực quan. Số liệu được đối chiếu nội bộ giữa bài, kết quả minh họa và hồ sơ công ty; chưa xác minh bằng truy vấn trực tiếp. Đây không phải xác nhận rằng các kiểm máy hoặc live đều đạt.
