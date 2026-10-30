# Bài 1.3: hình bảng, dòng và cột — Implementation Plan

> **For agentic workers:** dùng superpowers:executing-plans; tác giả thực hiện trong phiên, reviewer mới theo quy ước repo và kế thừa model phiên.

**Goal:** người biết Excel nhận ra ngay bảng, dòng/bản ghi và cột của database bằng một hình có dấu đánh rõ.

**Architecture:** một PNG trong assets, Astro Image/figure native dùng kiểu bài hiện có; chỉ di chuyển lời định nghĩa cạnh hình. Không đổi CSS/component, dữ liệu, API hoặc sáu đề xuất biên tập chưa duyệt.

**Spec:** docs/superpowers/specs/2026-10-30-lesson-1-3-teach-brainstorm-design.md, mục Bổ sung theo yêu cầu.

## Ràng buộc và review focus

- Giữ frontmatter/URL/noExercises/15 phút, bảng sáu kiểu/sáu ô, Excel/Ssms nguyên props và năm câu ôn.
- Hình khái niệm database chứa bảng NhanVien, không coi là SQL live; tên/ngày lấy từ hồ sơ đã có. Không có giao diện/tọa độ worksheet Excel. Chỉ ba callout Bảng/Dòng/Cột theo yêu cầu giảm chữ của người dùng.
- Dòng tô vàng phải bao đủ một hồ sơ; cột đánh dấu phải bao tên cột và các giá trị của một loại thông tin.
- Đặt trước bảng tình huống để C2–D4 không trỏ nhầm hình mới; lời văn vẫn đủ nghĩa và có alt/caption.
- Không tạo learning-workspace/HTML riêng hoặc commit/push/deploy.

## Công việc

- [x] Tạo bản nháp bằng built-in ImageGen; người dùng loại cách thể hiện Excel và chọn database + bảng phóng lớn, rồi yêu cầu giảm chữ. Giữ bản gốc/prompt nháp riêng, không dùng nghiệm thu bản cuối.
- [x] Tạo/kiểm bản cuối chỉ có Database, NhanVien, ba tên cột và ba callout Bảng/Dòng/Cột; lưu asset/prompt trong workspace.
- [x] Thay figure/alt/caption sang database, đưa định nghĩa cạnh hình; giữ các phần khác. Không tự triển khai sáu đề xuất biên tập còn chờ.
- [x] npm test → check → build → check:dist tuần tự: 322/322; 0 lỗi/0 cảnh báo/3 hint nền; 132 trang/1998 liên kết. Lưu log của bản database cuối.
- [x] Xem build 1280×720 và 1024×720: ảnh tải/đúng tỉ lệ 3:2, trước bảng tình huống, không tràn ngang; năm câu ôn mở bằng Enter. Không kiểm mobile/SSMS thật.
- [x] Reviewer mới đúng gói mục 4.5, xác nhận đủ tiền đề, không có mục cần sửa trong ảnh/lời dẫn; đọc hết report, giữ đầy đủ các điểm Giữ được và giới hạn trong ma trận, lưu report nguyên byte.
- [x] Cập nhật kết quả spec/plan/hồ sơ và bàn giao local; giữ nguyên source đúng hash sau kiểm/review.

## Kết quả

Hoàn tất bản database đã giảm chữ: PNG cuối src/assets/lessons/1-3-database-table.png, figure/alt/caption đúng bảng NhanVien và ba callout. 322/322 test, check 0 lỗi/0 cảnh báo/3 hint nền; build 132 trang, dist 1998 liên kết. Browser 1280×720 và 1024×720 đúng tỉ lệ/không tràn ngang, năm câu ôn mở bằng Enter; reviewer mới không yêu cầu sửa. [Report và ma trận](../../reviews/2026-10-30-lesson-1-3-database-illustration/verification.md) ghi giới hạn đầy đủ. Không sửa source sau review, không commit/push/deploy.

Lượt review hình Excel bị ngắt khi người dùng sửa yêu cầu; bản đó đã bị loại khỏi assets/dist. Không dùng kết quả/check/ảnh UI của bản đó làm nghiệm thu bản database cuối.
