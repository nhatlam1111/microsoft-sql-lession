# Kiểm chứng bản bài giảng khái niệm

Ngày 01/11/2026. Nhánh `codex/foundation-concepts-presentation`, base `b2e4c3cd0d9c2d1a22a05b6820affc5c07295e75`. Đây là vòng thay nội dung 20 → 18 slide. Routes, controller đồng bộ, progress, bài đầy đủ, API, YAML, schema và seed không đổi. Shell chỉ sửa một câu hướng dẫn no-JS sau review. Source/build cuối có hash trong `build-manifest.json`.

## Nội dung và nguồn

- 18 slide, 48 phút giảng + 7 phút hỏi đáp, nguồn 1.1/1.2/1.4/1.5. Mỗi slide có hình, diễn giải luôn hiện, ghi chú nguồn/phút riêng. Không câu đố bắt buộc và không thực hành ghi dữ liệu.
- Hình database/SQL Server/SQL dùng ba ảnh khái niệm của bài 1.1; hình dữ liệu và giả định là HTML có chú thích. ERD thật dùng owner schema cũ. Giả định thiếu khóa không giả là schema thật vừa bị sửa.
- Review nội dung độc lập ở `content-review.md`, tích hợp ở `integration-review.md`, xử lý đầy đủ ở `decisions.md`. Cả hai dùng agent mới/model kế thừa. Không dùng kết luận review thay bằng chứng chạy hoặc quyền push.

## SQL chỉ đọc

Tác giả chạy 7 nhóm kiểm, tất cả đạt: hồ sơ/phòng mẫu; ba hợp đồng của NV021; KT/KD có và KT01 không có; PK; FK đang bật/trusted; câu SELECT HoTen trả 48 dòng và có ba tên trích; nullability bốn cột khóa liên quan đều false. Query và kết quả chọn lọc tại `sql-select-results.json`, giữ đủ câu/rows, bỏ metadata cột lặp; bản raw tại temp cùng lượt. Helper không in credentials. Không chạy DDL, DML, SET hoặc bỏ/tắt khóa để thử minh họa. Hình giả định chỉ đối chiếu luật với tài liệu Microsoft đã dẫn trong spec.

## Kiểm tự động

- RED: 3 test yêu cầu mới thất bại trên bộ 20 slide cũ; GREEN: 14/14 test liên quan đạt. Sau sửa F1/F2 vẫn đạt. Assertion vị trí phân bổ đầu buổi thất bại trước sửa I2 rồi đạt sau sửa.
- Toàn bộ `npm test` trên bản cuối sau I1/I2: 55 file, **410 test đạt**, lúc 17:20.
- `npm run check` bản cuối: **245 file, 0 lỗi/0 warning, 3 hint có sẵn** (hai FormEvent/một execCommand).
- Build cuối **17:20:35, 139 trang**; `check:dist` bản cuối: **139 trang/2771 liên kết đạt**. Ảnh slide đầu và fixture không script được kiểm lại trên build này; các slide khác không đổi từ bản đã xem trước.
- DESIGN lint: 0 lỗi/0 warning. Strict UI audit: **exit 1, severity error, errors 1/warnings 0** ở SqlEditor textarea có sẵn; CSS hiện có `resize: none` tại `exercise.css:27`, công cụ không truy vết class này. Đây là finding kiểm tĩnh nền ngoài diff. Không đổi editor, che finding hoặc báo strict audit đạt. JSON gốc ở `ui-audit.json`.
- Không chạy pipeline bài tập/API: không thay YAML, API, runner hoặc câu ghi dữ liệu.

## Browser do tác giả thực hiện

IAB/Chromium qua CUA, preview local 4334. DOM chỉ đọc để đo vị trí/chữ; thao tác điều hướng bằng UI. Không đọc/ghi localStorage hoặc thay cài đặt bảo mật.

- Đã nhìn trực quan đủ 18 slide ở viewport thực 1280×800, đối chiếu khoảng trống trước footer và không tràn khung. Sau rút chữ, thay ảnh slide 8/9; sau F1/F2 thay ảnh 10/13/16; sau I2 thay ảnh slide 1 (gap footer 78px). Không giảm cỡ chữ để vừa. `geometry-1280.json` và `geometry-opening-final.json` ghi hai thời điểm này.
- Đã kiểm slide dày 13 ở 1440×900, slide 18 ở 1920×1080; presenter ở 1440×900 có notes riêng. Audience không có notes trong DOM. Viewport thực được đọc qua DOM sau khi áp dụng, không suy kích thước từ tên ảnh; các ảnh lưu trước khi bắt đúng tab chỉ được thay bằng ảnh đã xác nhận thực.
- Presenter đến slide 18 → mở audience muộn ở đúng 18; audience Previous sang 17 thì Tự xem; Theo người giảng quay đúng 18 dù revision bằng nhau; tải lại cả hai vẫn ở 18. Home rồi Space của presenter tới slide 2 và audience theo đúng. Không có bước đáp án ở bộ này.
- Tải lại presenter/audience trên build sau F1/F2 vẫn ở 18/18, nguồn/notes đúng. Hai thay đổi cuối I1/I2 không đổi protocol; đã tải lại hai tab bàn giao sau build cuối.
- Mở từ sidebar/header bài 1.1 đến deck, sang presenter, điều hướng rồi về Lộ trình: trước/sau đều 0/50, Làm quen 0/5, bài đang học 1.1. Không bấm hoàn thành/reset/import. Source/HTML và reviewer xác nhận header chỉ có ở nguồn 1.1/1.2/1.4/1.5, sidebar theo level vẫn có ở 1.3.
- Tìm `slide lam quen` có một kết quả nhãn Slide, Enter mở đúng slide đầu. Chép liên kết slide 13 trả URL chỉ có `?slide=khoa-ngoai`, không run/step/rev; clipboard được giữ và khôi phục, không in nội dung cũ.
- Fixture 4335 bỏ script khỏi HTML mới: đủ 18 slide liên tục, 0 ghi chú/0 đáp án, không `is-enhanced`. Kiểm lại sau I1/I2: noscript không còn chỉ dẫn mở đáp án không có, slide đầu có phân bổ thời gian. Đây là fixture không script, không phải thay cài đặt JavaScript của browser; nội dung noscript kiểm qua HTML/DOM.
- Fixture lỗi local thay API bằng test double: không BroadcastChannel vẫn điều hướng; window.open trả null hiện hướng dẫn bị chặn/link/thử lại; requestFullscreen bị từ chối hiện tiếp tục trong cửa sổ. Cả hai vẫn Next sang 2/18. Không thay security thật. Ảnh `fallback-popup.jpg` và `fallback-fullscreen.jpg`.

## Giới hạn và bàn giao

- Fullscreen native chưa đủ bằng chứng trong IAB: UI đổi nút/ảnh nhưng DOM read-only báo fullscreenElement null. Popup thật chỉ có UI “đã mở”, inventory IAB không thêm tab. Không coi đó là xác nhận native API thành công; protocol hai cửa sổ kiểm bằng các tab cùng origin, nhánh lỗi kiểm bằng fixture.
- Không kiểm máy chiếu/phòng học thật, screen reader, 200% zoom, forced colors/reduced motion, nhiều presenter hoặc viewport hẹp trong vòng này. Khung/controller cũ không đổi, không có triệu chứng mới; không suy các ảnh đã thay các kiểm đó. Nhánh clipboard bị từ chối không thử lại ở vòng chỉ đổi nội dung.
- Không có thay đổi API/bài tập/nháp/seed, không mở thêm kiểm ghi dữ liệu; bài kiểu dữ liệu/khóa ghép/UNIQUE/trigger/lịch sử ở ngoài bài giảng được duyệt. Link chủ đề cũ không thêm lớp tương thích theo spec.
- Giữ preview 4334 và hai tab xem/người giảng; dọn tab/fixture kiểm tạm. Nhánh chưa merge/push/deploy nội dung mới.

Ảnh chọn lọc, query/rows, geometry, audit và log cuối được lưu cùng thư mục report này. Toàn bộ 18 ảnh và log vòng giữa tại `temp/verification/2026-11-01-foundation-concepts/`. Report reviewer giữ nguyên bản source/build họ đã nhận; hash source/build cuối trong manifest giúp phân biệt với hai sửa I1/I2 sau review.
