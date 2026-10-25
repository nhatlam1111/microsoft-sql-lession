# Nghiệm thu local — màn bài tập SSMS

Ngày 25/10/2026, nhánh `codex/ssms-exercise-workspace`, base `19170bc`. Phạm vi: công cụ dùng chung của 63 trang bài tập. Không đổi bài, URL, đề, đáp án, seed, cách chấm hoặc khóa lưu nháp. Chờ người làm khóa học duyệt local trước khi merge/push.

## Phiên bản và cách mở

- Frontend production build được reviewer đối chiếu lúc **22:21:13 +07**; bản bàn giao rebuild lúc **22:39:49 +07**, 117 trang. Lượt rebuild sau khi bỏ một dòng trắng EOF và hoàn thiện hồ sơ, không đổi logic; tên/hash chunk workspace và editor giống bản đã QA. `build-handoff.log` và `dist-handoff.log` ghi lại lượt cuối. API build/typecheck hoàn tất lúc 22:21; API local đã khởi động lại sau build này.
- Frontend local: `http://127.0.0.1:4330/microsoft-sql-lession/bai/3-8-union-gop-danh-sach/bai-tap/1/`.
- API local: `http://127.0.0.1:7073/api`, chỉ bind loopback, CORS cho frontend trên. Phiên kiểm dùng mã ngẫu nhiên riêng, không đổi mã khóa học; không đưa mã vào Git, URL hoặc report. Tab bàn giao đã dùng phiên kiểm này. Mở trình duyệt khác cần mã hợp lệ của đúng API.
- UI: đề bên trái, editor/kết quả ở giữa, bảy bảng bên phải. Chạy thử mở quyền Nộp cho đúng revision; sửa hoặc undo khóa lại. Xem bảng không thay kết quả chạy hay điểm. Mọi SQL của bài tập luôn hoàn tác.
- Artifact/log gốc local: `temp/verification/2026-10-25-ssms-workspace/`. Ảnh gồm `workspace-1280.png`, `workspace-1440.png`, `workspace-1920.png`, `workspace-short.png`, `editor-fallback-failure.png`, `editor-fallback-retained.png`. Không commit mã truy cập hoặc launcher phiên riêng.

## Ma trận xử lý review

Giữ nguyên report độc lập; các bản sao trong thư mục này khớp report gốc ở `temp/review/2026-10-25-ssms-workspace/`. Reviewer Codex đều dùng ngữ cảnh mới, kế thừa model của phiên. Lượt UI bị gián đoạn được tiếp tục đúng agent; không thay model/reviewer để bỏ qua hạn mức.

| Nhận xét | Quyết định | Xử lý và bằng chứng |
|---|---|---|
| API P1: literal binary che lệnh giao dịch | **Làm theo** | Lexer nhận `0x…` trước số/identifier. Regression guard và fake run/grade chặn trước DB, zero runner calls. Không chạy payload escape trên DB thật. Re-review đóng finding. |
| API P2: URL target sai làm dev handler reject | **Làm theo** | Bắt lỗi parser, trả 400 có CORS; fake handler vẫn xử lý request kế tiếp. Re-review đóng finding. |
| UI-01: mất undo khi nâng cấp textarea đang dùng | **Làm theo** | Latch input cơ bản khi đã gõ/Tab làm đổi text/compositionstart; giữ suốt mount, có hint. Browser với chunk chậm xác nhận ô không đổi và native undo còn dùng được; test event/ref kiểm thêm composition/unmount. |
| UI-02: test component chưa chứng minh route SSR | **Làm một phần** | Giữ client-only để tránh ghi đè nháp/auth. Thêm fallback route tĩnh với input disabled, loading/reload/noscript SSMS; kiểm Astro route và HTML 63 trang. Không hứa editor tương tác trước React. CM chunk lỗi sau React có textarea dùng được. |
| UI-03: bỏ qua lỗi xóa mã đã lưu | **Làm theo** | Theo dõi kết quả remove riêng, cảnh báo reload có thể lấy lại mã cũ; memory auth/cache/permit vẫn reset, giữ nháp. Hai fake storage case cho đổi mã và bad-code đạt. |
| IME trong lúc chunk hoàn tất | **Làm theo phần có căn cứ** | Cùng latch UI-01 loại nhánh thay textarea giữa composition. Actual component closure tests kiểm compositionstart/end/import. Chưa xác minh bộ gõ IME của hệ điều hành; không dùng gõ Unicode/paste thay cho bằng chứng đó. |
| Modal, phím, viewport, live SQL chưa kiểm ở review tĩnh | **Làm theo** | Root thực hiện browser/live bên dưới. Tách rõ việc reviewer tự kiểm và bằng chứng tác giả. Không dùng kết luận review thay quyền publish. |

Report gốc: [API/security](api-security.md), [re-review API](api-security-fix.md), [UI](ui-review.md), [re-review UI](ui-review-fix.md), [tích hợp](integration-final.md). Không có finding tích hợp mới cần sửa. Reviewer tự chạy lần lượt 37 kiểm API, 79 kiểm UI sau sửa và 116 kiểm tích hợp; không cộng các số này thành số test duy nhất.

## Kiểm kỹ thuật do root thực hiện

| Lệnh/phép kiểm | Kết quả thực tế |
|---|---|
| `npm test` | **392/392**, 50 file, exit 0. |
| `npm run check` | **0 errors, 0 warnings**, 1 hint `document.execCommand` deprecated trong fallback indent. Giữ vì hỗ trợ native undo; đường không hỗ trợ vẫn cập nhật text. |
| `npm run build` | **117 trang**, exit 0. Build với API local 7073 cho review; URL production chưa được xuất bản. |
| `npm run check:dist` | **OK**, 117 trang, 2215 link; giữ kiểm không lộ answer/check vào props client. |
| `npm --prefix api run build` và `typecheck` | Cả hai exit 0. |
| `npm --prefix api run check:exercises` | **63/63 đáp án** qua runner luôn hoàn tác; gồm hai bài đổi dữ liệu. Không thay seed hoặc chạy câu ghi ngoài runner. |
| `npm --prefix api run check:data` | **Không bảng nào lệch** sau kiểm đáp án. |
| Preview live vs SELECT độc lập | Khớp toàn bộ dòng theo đầy đủ PK của cả bảy bảng; kiểm trang cuối/rỗng, metadata, `pageSize`, `hasMore`. Không ghi dữ liệu. |
| Auth và input preview live | Không mã: 401; table giả và page âm: 400. Các biến thể transaction/injection/rate/timeout/race kiểm với fake deps, không thử escape thật. |
| Premium UI strict audit | **0 errors/warnings/violations/unresolved**. Repo không có `premium-ui.json` hoặc formatter riêng. `git diff --check` đạt, chỉ có thông báo line ending của Git. |

Số dòng đối chiếu preview: `PhongBan` 6, `ChucDanh` 6, `NhanVien` 48, `HopDong` 55, `ChamCong` 806, `DonNghiPhep` 20, `BangLuong` 86. Ghép các trang khớp SELECT độc lập, gồm PK ghép và 17 trang chấm công; không suy đoán tổng trong UI.

## Browser và giới hạn

Root dùng in-app browser trên production preview, không gọi code nội bộ để ép state:

- Kiểm 1280×720, 1440×900, 1920×1080: không tràn ngang trang, Explorer 260px; cột đề lần lượt khoảng 307/340/340px. Khung tối thiểu 560px. Màn 1280×600 cuộn được; modal sơ đồ nằm trong viewport.
- Chạy bằng Ctrl+Enter và F5; sửa/undo khóa Nộp, nhãn kết quả cũ xuất hiện. Chấm sai có lý do và không hoàn thành; một bài SELECT nhập theo đề được chấm **Đúng rồi**. Câu thành công không có dòng vẫn mở Nộp; lỗi tên cột có thông báo SQL và khóa Nộp. Reload/đổi mã giữ nháp và yêu cầu chạy lại.
- Explorer mở cột; xem cấu trúc có NULL/PK/FK. Xem bảng rộng và trang lương `51–86` giữ kết quả chạy/verdict riêng. Tab mũi tên, splitter bàn phím và kéo chuột, Escape rồi Tab rời CM đều hoạt động.
- Ctrl+Space đưa cột theo alias; mũi tên/Enter chọn gợi ý. Tab bốn dấu cách, Shift+Tab giảm lề. Copy/cut/paste, undo, text tiếng Việt và nháp nhiều dòng/comment/rỗng qua reload đã kiểm. Không coi đây là OS IME.
- Sơ đồ có focus trong modal; Escape đóng và trả về trigger. Client hiển thị lý do chặn COMMIT trước gửi; bằng chứng zero DB calls đến từ fake test, không suy từ screenshot thành network trace.
- Hai HTTP server QA tạm dùng cùng build, cố ý trả lỗi hoặc trì hoãn CM chunk; browser xác nhận fallback nhập được và giữ native undo sau chunk đến. Server/tab QA đã đóng, không thay artifact product. Toàn bộ island/JavaScript lỗi chỉ có fallback tĩnh hướng dẫn; chưa kiểm no-JS bằng browser.
- Race phản hồi trễ, storage không ghi/xóa được, API rate/timeout/mất mạng được kiểm bằng deferred/fake tests; chưa gây các lỗi hạ tầng thật trên môi trường chung. Chưa kiểm screen reader, OS IME, toàn bộ 63 trang bằng tay hoặc SSMS thật. Không nâng phạm vi sang mobile.

So sánh dependency audit với lockfile base cho cùng **10 finding có sẵn** (2 low, 2 moderate, 3 high, 3 critical); không có finding mới từ CM. Không chạy audit fix hoặc nâng framework ngoài phạm vi. Astro dev từng lỗi runtime `jsxDEV` khi build song song; kiểm cuối dùng production build/preview, không suy lỗi đó là lỗi nền đã được chứng minh của base.

## Cách review local

1. Mở URL trên, viết hoặc sửa SQL. Thử Ctrl+Space, Tab/Shift+Tab và Escape rồi Tab.
2. Chạy thử, xem kết quả rồi Nộp; sửa một ký tự hoặc undo để thấy nút khóa lại.
3. Mở một bảng trong Explorer, xem cấu trúc/dữ liệu, chuyển trang hoặc Làm mới rồi quay lại Kết quả.
4. Mở sơ đồ, thử bàn phím và kéo thanh chia. Nhận xét giao diện trên nhánh này trước khi đồng ý merge/push.
