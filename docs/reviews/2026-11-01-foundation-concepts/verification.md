# Kiểm chứng bản bài giảng khái niệm

Ngày 01/11/2026. Nhánh `codex/foundation-concepts-presentation`, base `b2e4c3cd0d9c2d1a22a05b6820affc5c07295e75`. Đây là vòng thay nội dung 20 → 18 slide. Routes, controller đồng bộ, progress, bài đầy đủ, API, YAML, schema và seed không đổi.

## Nội dung và nguồn

- 18 slide, 48 phút giảng + 7 phút hỏi đáp, nguồn 1.1/1.2/1.4/1.5. Mỗi slide có hình, diễn giải luôn hiện, ghi chú nguồn/phút riêng. Không câu đố bắt buộc và không thực hành ghi dữ liệu.
- Hình database/SQL Server/SQL dùng ba ảnh khái niệm của bài 1.1; hình dữ liệu và giả định là HTML có chú thích. ERD thật dùng owner schema cũ. Giả định thiếu khóa không giả là schema thật vừa bị sửa.
- Review nội dung độc lập ở `content-review.md`, xử lý đầy đủ ở `decisions.md`. Không dùng kết luận review thay bằng chứng chạy hoặc quyền push.

## SQL chỉ đọc

Tác giả chạy 7 nhóm kiểm, tất cả đạt: hồ sơ/phòng mẫu; ba hợp đồng của NV021; KT/KD có và KT01 không có; PK; FK đang bật/trusted; câu SELECT HoTen trả 48 dòng và có ba tên trích; nullability bốn cột khóa liên quan đều false. Query và kết quả tại `temp/verification/2026-11-01-foundation-concepts/sql-results.json` và `sql-nullability.json`; helper không in credentials. Không chạy DDL, DML, SET hoặc bỏ/tắt khóa để thử minh họa. Hình giả định chỉ đối chiếu luật với tài liệu Microsoft đã dẫn trong spec.

## Kiểm tự động

- RED: 3 test yêu cầu mới thất bại trên bộ 20 slide cũ; GREEN: 14/14 test liên quan đạt. Sau sửa review F1/F2, 14/14 vẫn đạt.
- Toàn bộ `npm test`: 55 file, 410 test đạt trước vòng rút chữ cuối. Sẽ chốt lại sau review tích hợp.
- `npm run check`: 243 file, 0 lỗi/0 warning, 3 hint có sẵn (FormEvent/execCommand).
- Build mới nhất 17:11:22, 139 trang; source khớp các sửa F1/F2. `check:dist` trước vòng này: 139 trang/2771 liên kết đạt; sẽ chốt lại với bản cuối.
- DESIGN lint: 0 lỗi/0 warning. Strict UI audit: exit 1 do một cảnh báo có sẵn ở SqlEditor textarea; CSS hiện có `resize: none` tại `exercise.css:27`, công cụ không truy vết class này. Không đổi editor hoặc che finding. JSON ở temp cùng lượt.
- Không chạy pipeline bài tập/API: không thay YAML, API, runner hoặc câu ghi dữ liệu.

## Browser do tác giả thực hiện

IAB/Chromium qua CUA, preview local 4334. DOM chỉ đọc để đo vị trí/chữ; thao tác điều hướng bằng UI. Không đọc/ghi localStorage hoặc thay cài đặt bảo mật.

- Đã nhìn trực quan đủ 18 slide ở viewport thực 1280×800, đối chiếu khoảng trống trước footer và không tràn khung. Sau rút chữ, thay ảnh slide 8/9; sau F1/F2 thay ảnh 10/13/16. Không giảm cỡ chữ để vừa.
- Đã kiểm slide 18 ở 1920×1080; presenter ở 1440×900 có notes riêng. Audience không có notes trong DOM.
- Presenter đến slide 18 → mở audience muộn ở đúng 18; audience Previous sang 17 thì Tự xem; Theo người giảng quay đúng 18 dù revision bằng nhau; tải lại cả hai vẫn ở 18. Home rồi Space của presenter tới slide 2 và audience theo đúng. Không có bước đáp án ở bộ này.
- Fixture 4335 bỏ script khỏi HTML mới: đủ 18 slide liên tục, 0 ghi chú/0 đáp án, không `is-enhanced`. Đây là fixture không script, không phải thay cài đặt JavaScript của browser.
- Còn kiểm bổ sung trên bản cuối: slide dày ở 1440, luồng liên kết/tìm kiếm/tiến độ và copy link. Kết quả sẽ cập nhật ở đây; không gọi các mục này là đã đạt trong bản giao review.

Ảnh, geometry và log chi tiết đang tại `temp/verification/2026-11-01-foundation-concepts/`; bản bền vững chọn lọc sẽ sao vào thư mục report sau chốt. Chưa merge/push/deploy nội dung mới.
