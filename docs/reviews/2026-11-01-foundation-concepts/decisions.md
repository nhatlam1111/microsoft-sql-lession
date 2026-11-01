# Xử lý review — bài giảng Làm quen

Report gốc được giữ nguyên tại `content-review.md`; mọi mục đã được đọc trước khi sửa.

| Nguồn | Quyết định | Cách xử lý và bằng chứng |
|---|---|---|
| Nội dung F1 — điều kiện NULL | Làm theo | Slide 13 nói ngay việc nhận NULL do thiết kế cột và MaPB trong mẫu không nhận NULL. Slide 16 đọc cả hai phía của quan hệ trong mẫu. Bổ sung test trên phần hiển thị, không lấy notes thay lời giảng. SELECT metadata xác nhận bốn cột khóa liên quan không nhận NULL; không sửa schema. |
| Nội dung F2 — cách đọc bảng.cột | Làm theo | Slide 10 đọc “cột MaNV của bảng NhanVien (NhanVien.MaNV)” trước các cặp cột ở ERD. Giữ hai đoạn ngắn, test tiền đề ở phần hiện. |
| Nhóm giữ được và bảng tiền đề | Làm theo | Giữ mạch 18 slide, ví dụ HRM, ba hợp đồng, giả định thiếu khóa có điều kiện, kết bảng không bắt buộc FK, giới hạn đúng mã/đúng nghiệp vụ và phòng hiện lưu. Không thêm bài tập hoặc cú pháp JOIN. |
| Chưa xác minh live của reviewer | Làm theo | Tác giả kiểm riêng 7 nhóm SELECT (6 nhóm dữ liệu/khóa/truy vấn và 1 nhóm nullability); lưu query và kết quả. Không gán các kiểm này cho reviewer. |
| Chưa xác minh UI của reviewer | Làm theo | Tác giả xem đủ 18 slide ở 1280×800; kiểm hai cửa sổ, tải lại, tự xem/theo lại, no-JS fixture; lưu ảnh/geometry riêng. Kiểm bổ sung và review tích hợp được ghi trong verification. |

Không có mục nội dung bị bác hoặc hoãn. Các điều kiện ở F1/F2 được tái kiểm bằng test nội dung 14/14 và build 139 trang lúc 17:11 ngày 01/11/2026; slide 10/13/16 vẫn vừa khung 1280×800.
