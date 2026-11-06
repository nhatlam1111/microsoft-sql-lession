# Triển khai gộp đếm có điều kiện

Theo [thiết kế đã chốt](../specs/2026-11-06-merge-conditional-count-design.md).

- [x] Kiểm truy vấn minh họa qua runner dùng chung. Kết quả là 9 đơn trong phạm vi, hai cách đếm đều cho 5 đơn và tổng có điều kiện là 12.0 ngày.
- [x] Bổ sung 3.1, viết ba đề một dòng và thêm câu chuyển ở 3.2.
- [x] Đổi số, cập nhật tham chiếu và giữ danh tính các bài tập chuyển URL.
- [x] Kiểm luồng chuyển tiến độ và chuyển hướng bằng test và Chrome trên bản build.
- [x] Chạy kiểm kiểu, test, build, kiểm liên kết, kiểm bài tập SQL và checksum. Bàn giao [bằng chứng kiểm tra](../../reviews/2026-11-06-merge-conditional-count/verification.md) để người làm khóa học review nội dung.

## Vòng sửa tình huống 16 và 12 ngày

- [x] Kiểm câu bảy cột qua runner đọc. Dòng chính có `9, 16.0, 1.78, 1.0, 3.0, 5, 12.0`. Kiểm thêm phạm vi có đơn nhưng không đạt ngưỡng và phạm vi rỗng.
- [x] Viết lại câu của chị Hạnh. Đồng bộ Excel, câu SQL, LineMap, bước SELECT, bảng kết quả và lời giải. Rà hai minh họa trong bước SELECT theo quy ước.
- [x] Cập nhật test từ năm lên bảy ô, giữ kiểm phạm vi và bài tập. Kiểm build, drawer và kết quả trên Chrome. Ghi bằng chứng để người làm khóa học review.
