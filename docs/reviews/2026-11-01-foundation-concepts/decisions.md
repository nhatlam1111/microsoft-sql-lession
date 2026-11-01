# Xử lý review — bài giảng Làm quen

Report gốc được giữ nguyên tại `content-review.md`; mọi mục đã được đọc trước khi sửa.

| Nguồn | Quyết định | Cách xử lý và bằng chứng |
|---|---|---|
| Nội dung F1 — điều kiện NULL | Làm theo | Slide 13 nói ngay việc nhận NULL do thiết kế cột và MaPB trong mẫu không nhận NULL. Slide 16 đọc cả hai phía của quan hệ trong mẫu. Bổ sung test trên phần hiển thị, không lấy notes thay lời giảng. SELECT metadata xác nhận bốn cột khóa liên quan không nhận NULL; không sửa schema. |
| Nội dung F2 — cách đọc bảng.cột | Làm theo | Slide 10 đọc “cột MaNV của bảng NhanVien (NhanVien.MaNV)” trước các cặp cột ở ERD. Giữ hai đoạn ngắn, test tiền đề ở phần hiện. |
| Nhóm giữ được và bảng tiền đề | Làm theo | Giữ mạch 18 slide, ví dụ HRM, ba hợp đồng, giả định thiếu khóa có điều kiện, kết bảng không bắt buộc FK, giới hạn đúng mã/đúng nghiệp vụ và phòng hiện lưu. Không thêm bài tập hoặc cú pháp JOIN. |
| Chưa xác minh live của reviewer | Làm theo | Tác giả kiểm riêng 7 nhóm SELECT (6 nhóm dữ liệu/khóa/truy vấn và 1 nhóm nullability); lưu query và kết quả. Không gán các kiểm này cho reviewer. |
| Chưa xác minh UI của reviewer | Làm theo | Tác giả xem đủ 18 slide ở 1280×800; kiểm hai cửa sổ, tải lại, tự xem/theo lại, no-JS fixture; lưu ảnh/geometry riêng. Kiểm bổ sung và review tích hợp được ghi trong verification. |
| Tích hợp I1 — no-JS gọi đáp án không tồn tại | Làm theo | Bỏ câu chỉ dẫn mở Lời giải khỏi thông báo chung của shell. Giữ bản đọc liên tục và hướng dẫn bật chế độ chiếu; những bộ có đáp án sau này vẫn dùng details native như cũ. Đối chiếu source/HTML sau build. |
| Tích hợp I2 — phân bổ buổi giảng | Làm theo | Thêm câu thứ ba ở slide mở đầu: 48 phút giảng và 7 phút hỏi đáp, đúng template. Không thêm slide. Test vị trí hiển thị thất bại trước sửa rồi đạt sau sửa; kiểm lại độ vừa khung. |
| Tích hợp — ghi đúng severity audit | Làm theo | Sửa verification thành finding lỗi tĩnh có sẵn: exit 1, severity error, errors 1/warnings 0. CSS resize:none đã có; không báo audit đạt hoặc sửa editor ngoài phạm vi. |
| Tích hợp — các giới hạn/cân nhắc browser | Làm một phần | Kiểm thêm fallback popup/đồng bộ/fullscreen bằng fixture local, Next vẫn dùng được; giữ caveat native fullscreen/window.open và no-JS thực chưa đủ bằng chứng trên IAB. Không đổi security. Các kiểm 200% zoom, screen reader, forced colors/reduced motion và nhiều presenter không mở rộng trong vòng chỉ đổi nội dung; controller không đổi, chưa có triệu chứng regression. |
| Tích hợp — SQL/API/nháp/độ sâu/link cũ | Làm theo | Giữ kiểm SELECT tác giả tách khỏi reviewer; không đổi SQL runner/API/YAML/nháp, không giảng UNIQUE/trigger/khóa ghép/lịch sử hoặc thêm tương thích ID cũ trái thiết kế. Các bài đọc giữ nguyên; ghi rõ các giới hạn trong verification. |

Không có finding sản phẩm bị bỏ qua. Các điều kiện ở F1/F2 được tái kiểm bằng test nội dung 14/14 và build 139 trang lúc 17:11 ngày 01/11/2026; slide 10/13/16 vẫn vừa khung 1280×800. I1/I2 và kết quả cuối được chốt trong verification; report reviewer giữ nguyên phiên bản họ đã đọc, không sửa thành kết luận tác giả.
