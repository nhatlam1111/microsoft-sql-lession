# Kế hoạch triển khai mạch bài giảng Làm quen SQL Server

**Mục tiêu:** 21 slide, 48 phút giảng + 7 phút hỏi đáp, theo thiết kế đã duyệt ở `../specs/2026-11-02-lam-quen-narrative-design.md`.

**Kiến trúc:** MDX là nguồn duy nhất của mục lục và trang chiếu/người giảng. Dùng component bảng/hình hiện có; thêm biến thể tổng quan vào ProjectionRelation, giữ mặc định chi tiết. Astro 5, TypeScript, Vitest, CSS hiện có; không thêm dependency sản phẩm.

**Thực hiện:** trực tiếp trong phiên bằng executing-plans; review nội dung và tích hợp bằng agent mới, kế thừa model phiên theo quy ước repo. Không push/deploy.

## Công việc

- [x] **1. Chuẩn bị và kiểm RED.** Cài `npm ci`; cập nhật assertion bộ 21 slide và trình tự/phút; thêm test render Astro cho overview không lộ ký hiệu, default detail giữ khóa/cặp cột, overview vẫn từ chối schema sai. Chạy test để thấy thất bại do chưa triển khai.
- [x] **2. Component và nội dung.** Mở rộng `src/components/presentations/ProjectionRelation.astro` với `variant?: 'overview' | 'detail'`, mặc định detail. Viết lại `src/content/presentations/lam-quen.mdx` đúng storyboard, source/phút/ghi chú. Tải hai ảnh đã chốt vào `src/assets/presentations/`, lưu nguồn và giấy phép. Chỉ thêm CSS trình chiếu cần cho ảnh/bảng/đường đọc; cập nhật DESIGN.md nếu có quyết định hình thức bền vững.
- [x] **3. Kiểm tự động và browser.** Test mục tiêu xanh; chạy toàn bộ `npm test`, `npm run check`, `npm run build`, `npm run check:dist`. Mở build ở 1280×720, 1920×1080 và người giảng 1024×768, rà mọi slide/ảnh/credit, ID cũ+mới, bàn phím và đồng bộ, core content khi không có JS. Ghi lỗi nền/giới hạn chính xác.
- [x] **4. Review và bàn giao.** Agent mới học thử cả bộ theo mục 4.5; agent mới review tích hợp component. Lưu report, ma trận từng nhận xét và evidence vào `docs/reviews/2026-11-02-lam-quen-narrative/`. Xử lý mọi mục có căn cứ, chạy lại các kiểm bị ảnh hưởng, cập nhật spec/plan. Bàn giao thay đổi và kết quả kiểm; không lấy Ready thay quyền push.

## Trọng tâm review

- Phần phân loại không khiến người mới hiểu mọi database đều là bảng hoặc mọi NoSQL đều là đồ thị.
- Phép so sánh Excel không đồng nhất phần mềm với dữ liệu và không phủ nhận tính năng chia sẻ/kiểm nhập của Excel.
- ERD lần đầu không lộ ký hiệu chưa dạy; hình dữ liệu và hình cấu trúc có nhãn riêng.
- Đọc cả hai chiều quan hệ; đi tới phía nhiều có thể tăng dòng; phòng hiện lưu không phải lịch sử.
- Nội dung, ảnh và credit vừa canvas; default detail, showLinks và xác thực schema không đổi.

## Tiến độ và quyết định

- Bắt đầu từ checkout sạch trên main; nhánh làm việc `codex/lam-quen-narrative`.
- Quyết định: dùng checkout hiện có, tạo nhánh riêng; không tạo worktree mới theo hướng dẫn môi trường ưu tiên tái sử dụng checkout.
- Kiểm thử trước lượt triển khai từng thất bại vì chưa cài vitest; không gọi đó là lỗi nội dung hoặc kết quả đạt. Có package-lock.json, dùng npm ci.
- Pre-flight: nội dung tiêu thụ `variant="overview"` của ProjectionRelation; default detail và schema parser giữ nguyên, không đổi route/controller/collection API.

- Vòng 1: RED đúng ở 21 slide/trình tự/overview; sau triển khai 415 test qua, check 0 lỗi và 3 hints ngoài phạm vi, build 139 trang, check:dist 2801 link đạt. Browser phát hiện bốn slide sát/chạm chân trang; rút câu lặp và sửa khoảng cách, đang kiểm lại.

- Vòng 2 sau review: làm theo F1–F4 và INT-01. Điều kiện HopDong.MaNV không NULL/FK bật lên phần chiếu; dạng NoSQL được giải nghĩa ngay trong hàng so sánh, slide hình chỉ giới thiệu đồ thị; chưa gọi ERD trước định nghĩa; alt gọi đúng toàn bảng. Giữ nguyên 21 ID/phút. Chỉnh khoảng cách cuối khối ERD và bảng so sánh để không sinh cuộn nội bộ. Report/manifest của bản được review giữ nguyên; bản cuối có manifest riêng.

- Hoàn tất local 02/11/2026: 416/416 test; Astro check 0 lỗi, 3 hints ngoài phạm vi; build 139 trang; check:dist 2801 link. Cả 21 slide ở 1280x720 và 1920x1080 không tràn/cuộn nội bộ, footer cách ít nhất 13/23px; người giảng 1024x768, bàn phím, fullscreen và scripts-blocked đã kiểm. Hai review và mọi quyết định tại docs/reviews/2026-11-02-lam-quen-narrative/. SQL live chưa kiểm lại; không push/deploy.
