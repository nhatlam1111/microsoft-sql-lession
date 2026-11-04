# Kiểm bộ slide Làm quen — 04/11/2026

Ghi nhận của tác giả (Claude Sonnet 5.5). Review độc lập và ma trận xử lý nằm ở `docs/reviews/2026-11-04-lam-quen-slides-sonnet-high/`. Kết luận của reviewer không thay bằng chứng kiểm của tác giả.

## Phiên bản bàn giao

- Branch `codex/update-lam-quen-slides`, commit nền `46e9398`; thay đổi gói trong một commit. Không push `main`, không deploy.
- Spec/plan: `docs/superpowers/specs/2026-11-04-lam-quen-slides-refresh-design.md`, `docs/superpowers/plans/2026-11-04-lam-quen-slides-refresh.md`.
- Giữ slug/URL/hai chế độ/giao thức đồng bộ; thêm `SlideSpec.aliases` và anchor `data-slide-alias` để 21 ID cũ vẫn đi đúng chủ đề.

## Kiểm bằng máy (sau khi xử lý review)

| Kiểm | Kết quả thực tế |
|---|---|
| `npm test` | 67 file, 572/572 test đạt |
| `npm run check` | 0 lỗi, 0 warning, 7 hint có sẵn (`FormEvent`, `document.execCommand`), không sửa |
| `npm run build` | 190 trang |
| `npm run check:dist` | 190 trang, 3.649 link hợp lệ |
| `git diff --check` | Không lỗi khoảng trắng; Git báo LF→CRLF theo cấu hình máy |

Test mới: kiểm điều kiện chuyển kiểu hiện cho lớp, nháy SQL ở slide NULL, vùng crop PUBS nằm trong ảnh 477×474 kèm credit/MIT, liên kết phụ lục không dùng đường dẫn tương đối.

## Review độc lập

Hai agent mới (Claude Code, `sonnet`, effort `high`, ngữ cảnh mới; công cụ không trả lại tên model thực tế): học thử cả bộ (36 finding) và tích hợp (14 finding). Report gốc và ma trận từng mục: `docs/reviews/2026-11-04-lam-quen-slides-sonnet-high/`. Hai reviewer chỉ đọc nguồn, ảnh và HTML; phần UI nằm ở mục dưới và do tác giả kiểm.

## Kiểm UI trên bản build (preview 127.0.0.1, viewport 1024×768)

Dùng browser pane của công cụ; số đo lấy từ DOM, canvas logic 1280×720.

| Kiểm | Kết quả thực tế |
|---|---|
| Tràn khung 25 slide | Đo lại sau khi sửa theo review: 0/25 slide ngoài khung; x 56–1224, đáy cao nhất 650 (vùng nội dung tới khoảng 658, footer từ 674); không phần tử nào bị cắt ngoài ảnh PUBS phóng có chủ đích. Lần đo đầu sau sửa có 4 slide ERD chạm 667–671 và đã rút chữ/chú thích |
| Bảng khóa ghép | Ngày `2026-09` không bị ngắt dòng; dòng bị chặn được đánh dấu |
| Ba vùng bảng ở slide 23 | Hiện đủ `stores`, `sales`, `titles` ở zoom 1,45; chữ trong vùng phóng nhỏ hơn các slide hai vùng, chưa thử trên máy chiếu |
| Liên kết phụ lục | Trang chiếu và trang người giảng cùng ra `/microsoft-sql-lession/phu-luc/pl-1…`, `pl-2…`; chưa bấm thử từng liên kết |
| Cỡ chữ | Bảng 26px, đoạn 28px, chú thích 24px (đã sửa chú thích PUBS 22→24px cho khớp DESIGN.md); dòng credit 18px dùng chung với bộ slide |
| Ảnh | Ảnh quan hệ/đồ thị/PUBS nạp đủ (naturalWidth > 0) ở các slide có ảnh |
| Liên kết cũ | `?slide=ten-phong-cua-nv001` → `lan-duong-va-tu-tham-chieu`; `#cac-mo-hinh-luu-tru` → `so-sanh-cac-dang-database`; `?slide=khong-ton-tai` → slide đầu; URL được ghi lại bằng ID chính |
| Bàn phím + đồng bộ | ArrowRight/ArrowLeft đổi slide; tab người giảng và tab chiếu cùng `run` đồng bộ (`rev` tăng, cùng slide) |
| Màn người giảng | Ghi chú hiện đủ ở khung bên phải, slide PUBS hai bảng đọc được |

## Kiểm HTML build

- Trang chiếu có 25 `data-slide`, 11 `data-slide-alias`, 0 chuỗi "Ý cần nói" (ghi chú không lọt), 0 `data-answer`; trang người giảng có 25 ghi chú.
- `git diff --check`: không lỗi khoảng trắng; Git báo LF→CRLF theo cấu hình máy.

## Giới hạn ghi nhận riêng

- Không kiểm no-JS bằng cách tắt JavaScript trong browser; chỉ xác nhận HTML có đủ 25 slide và anchor alias dạng `span id`.
- Cửa sổ chiếu bằng `window.open` và toàn màn hình không thử trong browser pane; đồng bộ hai cửa sổ được thử bằng hai tab cùng profile/origin.
- Không kiểm SQL live, không chạy API bài tập/`check:data`, không chạy script PUBS: bộ slide chỉ ôn bài nền, không thêm câu lệnh hay số đếm mới.
- Không kiểm mobile; trang chiếu thiết kế cho màn hình lớp.
