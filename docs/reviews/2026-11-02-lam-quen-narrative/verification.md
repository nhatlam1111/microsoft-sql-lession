# Kiểm và bàn giao — Làm quen SQL Server, 02/11/2026

## Kết quả và phiên bản

Đã triển khai 21 slide theo thiết kế đã duyệt: database → hai nhóm quan hệ/NoSQL → cầu Excel → SQL Server/SQL/SSMS → ERD tổng quan → bảng/dòng/cột/khóa → đọc ERD. Tổng phần giảng 48 phút, hỏi đáp 7 phút. Giữ 18 ID cũ, thêm đúng ba ID mới; không sửa bài đọc, SQL mẫu, database, API hoặc controller tiến độ/trình chiếu.

Nhánh local `codex/lam-quen-narrative`, base commit `a67c37a4872daaee7711dbab8bb794fbb8a1f681`, thay đổi chưa commit/push/deploy. Bản cuối nhận dạng bằng [final-build-manifest.json](final-build-manifest.json). Manifest và diff ban đầu được giao reviewer giữ riêng, không ghi đè bằng bản sau sửa.

## Kiểm tự động thực tế

| Kiểm | Kết quả |
|---|---|
| `npm ci` | Exit 0, cài 508 package theo lockfile; không đổi dependency/lockfile. |
| RED trước triển khai | 3 lỗi đúng kỳ vọng: chưa đủ 21 slide, sai trình tự/phút, overview còn lộ PK/FK/∞/caption. 9 test khác qua. |
| Test render `ProjectionRelation` | Overview giấu ký hiệu nhưng giữ bảng/cột và validation; default detail giữ khóa/cặp FK; từ chối bảng/cột/quan hệ không khai báo. Renderer Astro thật. |
| RED→GREEN F1 | Test điều kiện bắt buộc hợp đồng ở phần chiếu thất bại trước sửa rồi qua. Không dùng notes làm bằng chứng cho nội dung màn lớp. |
| `npm test` — lượt cuối | **56 file, 416/416 test qua**, exit 0. |
| `npm run check` — lượt cuối | **162 file, 0 errors, 0 warnings, 3 hints**, exit 0. |
| `npm run build` — source cuối | **139 trang**, exit 0. |
| `npm run check:dist` — build cuối | **139 trang, 2.801 link**, exit 0. |
| `git diff --check` | Exit 0, không có lỗi whitespace. |
| Taste source lint trên MDX | 1 file, không có finding, exit 0; không gọi đó là audit toàn bộ hệ thiết kế. |

Log lệnh đầy đủ nằm trong `temp/review/2026-11-02-lam-quen-narrative/final-{test,check,build,check-dist}.log`. Lượt đầu sau triển khai có 415 test; 416 là kết quả sau bổ sung bảo vệ F1. Các lỗi RED và lỗi quy tắc thuật ngữ đã được sửa, không phải lỗi nền bị bỏ qua.

### Cảnh báo nền giữ nguyên

- Ba hint của Astro: `FormEvent` deprecated tại `ExerciseWorkspace.tsx:1` và `:73`; `document.execCommand` deprecated tại `SqlEditor.tsx:30`. Không sửa hai component này.
- Vitest có cảnh báo Node experimental SQLite, `--localstorage-file` thiếu đường dẫn và stderr collection exercises rỗng trong test placeholder của `tests/components.test.ts`; toàn bộ test vẫn qua. Không thay test để che cảnh báo.
- `npm ci` báo `tsconfck` deprecated và 11 mục audit (2 low, 3 moderate, 3 high, 3 critical). Chưa điều tra audit hoặc chạy `npm audit fix`; không nâng dependency ngoài phạm vi slide.

## Browser trên bản build local

Dùng CUA/IAB, không chỉ suy từ HTML. Lần đo cuối ghi viewport thực tế trong mỗi dòng JSON; đã xem cả 42 ảnh qua sáu contact sheet sau thay đổi cuối và xem riêng ảnh các trạng thái chính.

| Trường hợp | Bằng chứng và kết quả |
|---|---|
| Toàn bộ 21 slide, **1280×720** | [geometry-1280.json](geometry-1280.json): không tràn ngang, không cuộn nội bộ (`scrollHeight == clientHeight`), ảnh tải đủ; khoảng hở tới footer nhỏ nhất 13px. |
| Toàn bộ 21 slide, **1920×1080** | [geometry-1920.json](geometry-1920.json): cùng các kiểm trên, khoảng hở footer nhỏ nhất 23px. |
| Người giảng **1024×768** | [presenter-geometry-1024.json](presenter-geometry-1024.json), [ảnh](presenter-1024.jpg): notes hiện, không tràn ngang; nội dung dài đọc bằng cuộn trang. |
| Bàn phím | [keyboard.json](keyboard.json): Home → đầu; Space/Right → slide kế; Left/PageUp → trước; End → cuối; Right ở cuối giữ nguyên. PageDown đã thử ở lượt trước, chuyển đúng slide so sánh; controller không thay đổi giữa các lượt. |
| Hai cửa sổ | [presenter-sync.json](presenter-sync.json): Next bên người giảng truyền sang màn chiếu; tự bấm màn chiếu tách sang Tự xem; Theo người giảng bắt lại trạng thái hiện tại; reload tiếp tục theo. Kiểm trước đợt sửa chữ cuối; controller/state/ID không đổi. |
| Mở cửa sổ và fallback | Nút trả thông báo đã mở; popup không xuất hiện trong inventory tab của công cụ. Đã lấy đúng URL từ liên kết dự phòng cùng phiên để mở tab và kiểm đồng bộ. Không khẳng định đã kéo popup qua máy chiếu vật lý. |
| Fullscreen | [fullscreen.json](fullscreen.json), [ảnh](fullscreen.jpg): nút chuyển thành Thoát toàn màn hình sau bấm, bấm thoát trả về Toàn màn hình. Dùng nhãn UI/screenshot xác nhận, không dùng thuộc tính fullscreenElement của phạm vi đọc DOM làm bằng chứng duy nhất. |
| Không có script | Server QA chỉ đọc cùng `dist`, thêm CSP `script-src 'none'`: [scripts-blocked.json](scripts-blocked.json), [ảnh](scripts-blocked.jpg). Không có `is-enhanced`, cả 21 slide có kích thước/hiển thị tự nhiên, không tràn ngang và không lộ notes. Đây là kiểm khi mọi script bị chặn; chưa đổi thiết lập JavaScript native của browser để thử riêng thông báo noscript. |
| ID và ảnh | Điều hướng trực tiếp đủ 21 ID cũ/mới qua URL; các ảnh trỏ về asset nội bộ, tải thành công. Không phụ thuộc Wikimedia lúc chiếu; nguồn/giấy phép là các liên kết dẫn chứng riêng. |

Ảnh chính: [so sánh](comparison-1280.jpg), [mô hình](models-1280.jpg), [ERD tổng quan](overview-1280.jpg), [ERD chi tiết](erd-1280.jpg). 42 ảnh đầy đủ và contact sheet ở `temp/review/2026-11-02-lam-quen-narrative/shots/`.

Các lượt đầu phát hiện tràn chân trang và cuộn nội bộ nhẹ. Đã rút câu lặp, dùng cùng biến thể gọn cho ERD tổng quan/chi tiết, giữ font nhãn cột 26px và lời giải 28px. Kiểm cuối bổ sung cả scrollHeight/clientHeight thay vì chỉ đo khoảng hở footer.

## Review, nguồn và giới hạn

- [Review nội dung](content-review.md) và [review tích hợp](integration-review.md): hai agent mới, kế thừa model phiên, không đổi model. Review source/HTML đúng hash, không tự chạy SQL hoặc tương tác browser. Reviewer tích hợp tự chạy 30 test và năm ca render bổ sung.
- Đã đọc đủ report, đối chiếu căn cứ và làm theo F1–F4/INT-01; không hoãn mục nhỏ. [Ma trận xử lý](decisions.md) phân biệt report gốc với kiểm lại sau sửa. Không gán kết luận review cũ cho bản mới; bản sau sửa được kiểm bằng test/HTML/browser của tác giả.
- Tác giả đã đối chiếu schema nguồn: PK/FK và `HopDong.MaNV`/`NhanVien.MaPB` NOT NULL; đã đọc các dòng seed chứa NV001/Trần Thị Mai, NV005/Vũ Thị Lan, NV021/Tôn Thất Long và ba hợp đồng HD2021-001/HD2021-002/HD2024-005. Không thực thi seed.
- Không có connector SQL Server trong phiên, nên **không chạy lại SELECT hoặc kiểm FK live**. Câu SELECT giữ nguyên; giá trị trích và quan hệ chỉ được đối chiếu với source/hồ sơ. Không dùng các connector PostgreSQL khác và không ghi database chung.
- Hai ảnh internet giữ nguyên nội dung gốc; nguồn/tác giả/giấy phép có trong slide, notes và `src/assets/presentations/SOURCES.md`. Đã đối chiếu trang Wikimedia, Microsoft Learn; ảnh khái niệm SQL Server/SQL sẵn có giữ lại.
- Chưa thử screen reader/assistive technology, clipboard/copy-paste, SSMS thật, máy chiếu vật lý hoặc đo 55 phút giảng thật. Không sửa progress store, authentication hoặc thiết lập bảo mật để ép phép kiểm đạt.

Kết quả này bàn giao thay đổi local cùng bằng chứng kiểm; không cấp quyền push/deploy.
