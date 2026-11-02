# 08. Tái dựng UI/UX và thiết kế thay thế

## 1. Phạm vi khôi phục chính xác

Ảnh H-03-I/M/H và H-06 đã được xem; chúng đủ xác nhận bố cục và control nhìn thấy, không đủ tái tạo animation hoặc mọi kích thước. H-04 chỉ có text/index gián tiếp; không gọi đó là ảnh đã xem. [Nguồn và hash](evidence-register.md)

| Màn/trạng thái | Căn cứ lịch sử | Phần chưa khôi phục | Đề xuất độc lập cho T-SQL |
|---|---|---|---|
| Arcade Home | H-01 map; H-03-M world/node | Home toàn bộ, hover/nav | Điểm vào Luyện SQL trong nav, giữ menu bài học |
| World selection | Nhóm địa điểm theo chủ đề | Điều kiện từng phiên bản | Ba world nhập môn, bài nguồn/prerequisite hiện rõ |
| Challenge map/list | Node xanh và khóa trong ảnh | Màu/state đầy đủ, layout responsive | Map đơn giản kèm danh sách có đủ cùng nội dung |
| Challenge details | H-03-I/H-06 đề trái | Tất cả tab/constraints SQL | Mục tiêu, schema, sample, yêu cầu cột/thứ tự và bài tiền đề |
| Editor/tests | Hai nút và sample/test khóa | Phím tắt SQL/autocomplete/reset | Dùng editor có sẵn; test list và panel kết quả mới |
| Hidden locked | Icon khóa trong ảnh | Dialog mua/phạm vi quyền | Chỉ hiện tổng hidden, không có nút mua trong MVP |
| Hidden revealed | H-03-T/H-05 nói có mở | Pixels, giá/phạm vi chính xác | Wireframe tương lai có nhãn đề xuất; chưa bật |
| Failed | Mẫu thành công trong ảnh; báo cáo hidden fail | Error UI đầy đủ lịch sử | Phân biệt sai kết quả, lỗi SQL, timeout, lỗi service |
| Challenge completed | Score đầy H-06 | Animation, thưởng lặp | Thông báo đạt suite, XP cá nhân lần đầu và bài kế |
| World completed | Chưa có ảnh trực tiếp đủ | Reward/timing | Tổng số challenge đạt và liên kết world kế |
| Profile/progress | Saved/map là dấu hiệu | Cross-device/history/rank | Tiến độ cá nhân local, xuất/nhập Arcade riêng |

## 2. Workspace SQL mới — RECOMMENDATION

Desktop dùng đề/schema bên trái, editor trên và tests/kết quả bên phải. Phần sample phải phân biệt input, expected và actual; không đưa dữ liệu hidden vào DOM, accessibility tree, HTML hoặc payload public rồi dùng CSS giấu.

Giữ phong cách khóa học hiện có, dùng chữ tiếng Việt và nhãn Chạy thử/Nộp bài; ghi dialect Microsoft SQL Server. Không sao chép bản đồ, mascot, màu thương hiệu, tên world hay challenge CodeSignal. ERD mô tả schema công khai của challenge, không phải HRM_Demo live. [R-02, R-03, R-16]

Học viên thấy “Bài cần biết” trước editor. Hướng dẫn kết quả nói rõ số cột, thứ tự cột/dòng và tiêu chí alias. Nút về bài học không đổi trạng thái hoàn thành lesson. Mở lại challenge dùng nháp theo version; reset starter có xác nhận nếu khác nội dung, có cách hủy.

## 3. Khả năng tiếp cận và màn hình nhỏ — thiết kế mới

- Ở chiều rộng từ 1.100 px: hai cột. Dưới ngưỡng đó: xếp dọc Đề/schema → Editor → Tests; không ép màn nhỏ vào IDE quá hẹp. Chọn ngưỡng này để kiểm thiết kế mới, không là breakpoint lịch sử.
- Map có danh sách thay thế cùng thứ tự. Node là link/button có tên trạng thái bằng chữ; không chỉ xanh/đỏ hoặc icon khóa. Tab order theo mạch làm bài.
- Kết quả có vùng `aria-live="polite"`; loading không kéo focus khỏi editor; lỗi auth/SQL có thông báo text và đường phục hồi. Bảng cuộn trong vùng riêng, cột tiêu đề đọc được.
- Tôn trọng reduced motion; không có animation bắt buộc. Success feedback ngắn, không lấy hiệu ứng làm dấu hiệu duy nhất để biết đã đạt.

## 4. Phản hồi và lỗi

| Trigger | Phản hồi cần có | Bảo vệ nháp/tiến độ |
|---|---|---|
| Đang queued/running | Tên hành động, đang chờ/đang chạy; ngăn tạo job lặp | Tiếp tục soạn được; kết quả gắn bản đã gửi |
| Wrong answer visible | Test sai, vị trí khác; expected/actual chỉ của mẫu | Không tự sửa code |
| Hidden fail | Tổng đạt/tổng; gợi đọc lại yêu cầu chung | Không lộ nguyên nhân gắn dataset cụ thể |
| Syntax error sample | Vị trí/lỗi đã làm sạch metadata hệ thống | Giữ code và editor focus hợp lý |
| Mất mạng | Chưa biết kết quả; thử lấy lại job | Không ghi trượt hoặc xóa pass cũ |
| Hết quota/bận | Thời điểm thử lại nếu server biết | Không tạo vòng retry ngầm |
| Thành công | Phiên bản/snapshot được chấm, bài tiếp theo | XP một lần, nói rõ tiến độ lưu trên thiết bị |

Wireframe ở [10](10-wireframes.md); flow ở [09](09-user-flows.md). Chưa xây prototype và chưa kiểm UI mới trên browser; đây là đặc tả để triển khai sau phê duyệt.
