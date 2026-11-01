# Slide tổng hợp phần 1. Làm quen

## Quyết định đã duyệt

- 20 slide cho người đã học 1.1–1.5, 48 phút giảng/trao đổi và 7 phút hỏi đáp.
- Nội dung gọn để chiếu, có lời giải thích trong ghi chú người giảng và liên kết bài nguồn. Không thay bài đầy đủ, không có thực hành SQL hay chấm điểm.
- Bốn câu hỏi ở slide 4, 11, 14, 19. Các tiền đề có trước câu hỏi, đáp án mở theo bước hoặc bằng `details` khi không có JavaScript.
- Thứ tự: mục tiêu; nguồn chung; bốn tên; câu hỏi SSMS/file xuất; bảng/dòng/cột; cấu trúc; ba hợp đồng; định dạng/kiểu; kiểu/NULL; chuyển kiểu; câu hỏi CCCD; PK; FK; câu hỏi mã có thật; ký hiệu ERD; NV001/phòng; dòng kết quả; lương/phòng; câu hỏi đường hợp đồng/phòng; năm điểm tự kiểm.
- Dữ liệu và giới hạn theo bài 1.1–1.5 hiện hành. Ngày mơ hồ phải ghi điều kiện `us_english`/`mdy`. PK/FK chỉ bảo đảm luật đã khai báo. Phòng ở `NhanVien` là phòng hiện lưu.

## Hợp đồng web

- Collection `presentations` độc lập; metadata có title, summary, sourceLessons, keywords, minutes. Mỗi MDX gồm các Slide có ID ổn định và PresenterNotes.
- `/bai-giang/`, `/bai-giang/lam-quen/`, `/bai-giang/lam-quen/nguoi-giang/`. Layout riêng dùng font/token hiện có, không mount store tiến độ, không đổi mẫu số 50 bài.
- Liên kết tại nhóm Làm quen và đầu bài nguồn. Tìm kiếm phân loại Slide, key theo section/slug.
- Khung chiếu 16:9, hệ tọa độ 1280×720, tiêu đề 44px, thân 30–32px. Bảng/sơ đồ có nhãn lớn, chỉ vùng liên quan. Nền trắng, nhận diện khóa học, không thêm thư viện.
- Người giảng có preview, ghi chú, tên slide kế tiếp, mục lục, mở cửa sổ chiếu. Ghi chú công khai như website nhưng không được render vào HTML trang chiếu.
- Một người giảng cho mỗi run, hai cửa sổ cùng origin/trình duyệt/profile. BroadcastChannel mang protocol/deck/run/slide/step/revision, kiểm message trước khi dùng. Run khác không tác động nhau. Không đồng bộ nhiều máy.
- URL người giảng giữ run/slide/step/rev qua tải lại. Snapshot đủ trạng thái khi mở muộn, focus/pageshow hoặc theo lại. Bỏ revision cũ hơn, chấp nhận snapshot cùng revision khi đồng bộ lại.
- Tự điều hướng màn chiếu chuyển Tự xem. Theo người giảng yêu cầu snapshot. Người giảng đóng thì giữ nội dung, vẫn tự xem được. Không dựa vào unload/heartbeat để kết luận trạng thái.
- Next hiện đáp án trước, Previous đi ngược bước, mục lục mở bước đầu. Shortcut an toàn với input/IME/modifiers. Không tự chạy. Share link chỉ giữ slide, không run/step/rev.
- Popup chỉ mở từ click; bị chặn có link/nút thử lại. Fullscreen trực tiếp trong cửa sổ chiếu, lỗi có phản hồi và tiếp tục cửa sổ thường. Không đổi bảo mật trình duyệt.
- Không JS: tất cả slide đọc liên tục, câu trả lời dùng native details. Không ẩn trước khi controller sẵn sàng.

## Kiểm và bàn giao

Unit test state/protocol/URL/schema/search và nội dung. Browser 1280/1440/1920, cả 20 slide và đáp án, bàn phím, hai cửa sổ/reload/theo lại/phiên khác, fullscreen và fallback. Kiểm tiến độ không bị ghi từ các route mới. Chạy test/check/build/check:dist, kiểm thiết kế, review nội dung độc lập và review tích hợp. Evidence/ma trận trong `docs/reviews/2026-11-01-foundation-presentation/`.

Nhánh `codex/foundation-presentation`. Chưa merge/push/deploy; chờ yêu cầu riêng sau bàn giao local.
