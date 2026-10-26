# Xử lý review bài 4.4

Đã đọc toàn bộ report gốc và APPEND đối chiếu. Review learner mới, model kế thừa; không dùng answer bù bài học. BƯỚC1 khóa SHA256 `a3285cd146623f92f1ec40f1bb89ea79c85381f8a73b2a5037e2dfeb1acd3b22`, chỉ sau đó cấp YAML. Bản gốc và snapshot giữ riêng, không sửa kết luận reviewer.

| Mục | Quyết định | Xử lý / căn cứ |
|---|---|---|
| 4.4-A, refresh chưa giải nghĩa | Làm theo | Đổi thành “làm mới PivotTable”, giữ lời giải tại chỗ, không mở hướng dẫn Excel dài. |
| 4.4-B, ôn chưa trực tiếp chọn ba vai trò | Làm theo | Thay câu hỏi cột mới bằng câu chọn hàng/cột/phép đếm theo trạng thái. Đáp án nhắc đoạn COUNT đã giảng, giữ bốn câu ôn. |
| Bảng tiền đề ba đề và đối chiếu YAML | Không làm theo — không có yêu cầu sửa | Giữ cấu trúc; reviewer tự tìm được cách trước answer, đối chiếu không có kỹ thuật chỉ được giấu trong YAML. |
| Giữ được về nguồn, CASE/NULL, cột cố định và giới hạn | Không làm theo — giữ nội dung | Không thêm RunFlow hoặc PIVOT động; không đổi NULL thành0. |
| SQL live/giá trị không hiện/chấm thật chưa xác minh | Làm một phần | Tác giả kiểm arithmetic source/guard, không kết luận engine. CLI thiếu bốn biến SQL trước connection; pending SQL Server live và bộ chấm thật. |
| Copy/paste, bàn phím, drawer và đường đăng nhập chưa xác minh | Làm một phần | HTML/CSS kiểm dữ liệu sao chép, tab, nháy và vị trí câu ôn; chưa thao tác browser, không báo UI đạt. |

TDD mới: ba test RED trước nội dung/helper, GREEN sau; 318test/47file toàn suite. Mô hình PIVOT test-only chuyển SUM/COUNT một CTE sang CASE, chỉ kiểm số học từ source, không là parser/compiler T-SQL hoặc bằng chứng SQL Server. Thêm MaDon vào nguồn tách20 nhóm; SUM/CASE giữ NULL, COUNT cho0 ở tổ hợp vắng. Ba đề khác minh họa về phạm vi/trục/phép tính, tên alias không được dùng làm lý do khác biệt. Không đổi seed/guard/API/UI.

Baseline:315test/46file trước soạn. Kiểm toàn suite318, Astro0error/0warning/3hints nền; build129pages,1961links, check:dist không rò answer; API75bài/typecheck. Sau hai sửa biên tập, chạy lại content tests/build/HTML/dist; kết quả được ghi trong hồ sơ bàn giao cuối chuỗi. Nguồn kỹ thuật đối chiếu Microsoft Learn PIVOT và CREATE VIEW, đọc ngày26/10/2026; liên kết nằm trong spec. Không có SQL live/UI pass và chưa push/merge/deploy.
