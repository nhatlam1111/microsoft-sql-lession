# Bằng chứng kiểm bộ slide Làm quen

Ngày 01/11/2026. Tác giả kiểm bằng PowerShell/Node/Vitest/Astro và browser CUA trong trình duyệt in-app. Đây là bằng chứng kiểm của tác giả, tách khỏi hai report độc lập.

## Nguồn và build

- Base `ff4bc95675724bcc54149e291a88914dbd3ba730`; nhánh `codex/foundation-presentation`.
- Mốc sản phẩm cuối `1592f0fd6cd8f7c7f659e2e1c728f1731b542d6b`; source/test tree và SHA-256 ba HTML tại [source-build.json](source-build.json). Các commit bàn giao sau mốc này chỉ đổi hồ sơ/tài liệu.
- Bản đầu `081a5a3`, vòng trình bày `95be5b7`; các sửa sau review gồm Follow fallback, kiểm bài nguồn, H1 header và tài liệu thêm deck. Nội dung giữ nguyên bản đã review, ngoài câu dẫn slide 19 đã được reviewer đọc lại.
- Build cuối lúc 15:51:19 tại `dist/`, sau tất cả sửa sản phẩm. Sau khi lưu commit cuối chỉ thay hồ sơ bàn giao nếu có; không coi tài liệu là lý do dựng lại sản phẩm không đổi.
- Log máy tại `temp/verification/2026-11-01-foundation-presentation/` gồm `tests-final.log`, `check-final.log`, `build-final.log`, `dist-final.log`, ảnh 24 trạng thái và số đo. Bộ kiểm cuối: **55 file / 411 test đạt**; Astro check **241 file, 0 error, 0 warning, 3 hint nền**; build **139 trang**; check:dist **2.780 link đạt**.
- Ba hint có trước: `FormEvent` deprecated tại ExerciseWorkspace (2 vị trí) và `execCommand` tại SqlEditor. Không có hint mới trong phần slide. Không đổi API/YAML/runner/grade nên không chạy luồng bài tập ghi/hoàn tác.

## Nội dung và SQL

- Đủ 20 slide, nguồn 1.1–1.5, phút từng slide cộng 48, metadata 55 gồm 7 phút hỏi đáp. Bốn câu hỏi ở 4/11/14/19. Có đủ 20 ghi chú với ý nói/hiểu nhầm/giải thích/phút/nguồn.
- [Review nội dung](content-review.md) học thử từ nguồn/HTML, không có finding cần sửa. [Review tích hợp](integration-review.md) tự chạy 56 test và controller mock, có một P3 đã sửa. [Ma trận](decisions.md) xử lý cả nhận xét nhỏ và giới hạn.
- [SQL verification](sql-verification.md): **12/12 SELECT-only đạt**, có từng câu và kết quả tại [sql-results.json](sql-results.json). Không DML/DDL/SET, không thay dữ liệu hoặc cấu hình phiên. CAST chỉ kiểm giá trị/lỗi biểu thức, không giả là đã thử ghi chuyển kiểu ngầm.

## Browser thực

Preview sản phẩm `http://127.0.0.1:4334/microsoft-sql-lession/`. Không chạy SQL trong browser. Không thay thiết lập bảo mật, không bật quyền đặc biệt. Clipboard được lưu trong bộ nhớ trước kiểm sao chép và khôi phục nguyên các item sau đó.

| Phép kiểm | Quan sát |
|---|---|
| 1280×800 | Đã nhìn từng ảnh của 20 slide và 4 trạng thái lời giải. Đã đo 24 trạng thái: không tràn canvas; phần lời giải 19 vẫn có khoảng trống trước chân slide sau sửa. Các file ảnh mang `-1280.jpg`, số đo `geometry-1280.json`. |
| 1440×900 và 1920×1080 | Xác nhận viewport qua `innerWidth/innerHeight`, không suy từ yêu cầu resize của công cụ. Xem/đo slide 19 mở đáp án tại 1440, slide 18 ba bảng tại 1920: không tràn canvas/document. Lưu `slide19-1440.jpg`, `slide18-1920.jpg`. Không tuyên bố đã xem lại cả 20 ở mỗi kích thước này. |
| 960×800 | Trang người giảng không cuộn ngang; ghi chú xuống dưới preview. Sau kiểm đã reset override viewport. |
| Điều hướng | Đã bấm Next qua đủ 24 trạng thái, Previous từ 20 trở về lời giải 19; chọn mục lục 19 về step 0. Space trên nút hiện lời giải, ArrowLeft giấu đáp án; End tới 20; Home về 1; Ctrl+ArrowRight không đổi state. Một lần công cụ không nhận role native summary và một lần không nhận tên phím `Space`; dùng selector summary/phím khoảng trắng hợp lệ rồi xác nhận UI, không coi timeout công cụ là lỗi sản phẩm. |
| Hai cửa sổ | Người giảng đổi slide và đáp án, audience theo đúng slide/step/revision. Audience tự đi chuyển Tự xem, không điều khiển ngược. Theo lại nhận snapshot cùng revision, kể cả revision cục bộ đã tăng. |
| Mở muộn/tải lại | Mở audience từ URL cũ step 0/rev 0 khi người giảng đang câu 4 step 1/rev 4, nhận đúng snapshot hiện tại. Tải lại người giảng giữ run/revision, tải lại audience tiếp tục theo. |
| Tách run/đóng | Mở người giảng thứ hai tạo run khác, đổi slide không làm audience run trước đổi. Đóng cửa sổ người giảng cũ, audience vẫn ở câu 4 và tự sang slide 5 được. Không suy ra đã có phát hiện đóng cửa sổ theo thời gian. |
| Fullscreen | Bấm trực tiếp trên audience, nút đổi Thoát toàn màn hình, ảnh chiếu mở lớn; bấm lại về Toàn màn hình. Không tự bật từ người giảng. |
| Chia sẻ | Sao chép từ câu 4 đã mở đáp án trả URL chỉ có `?slide=dong-ssms-va-sua-file-xuat`, không run/step/rev. Khôi phục clipboard sau kiểm. |
| Navigation/search/progress | Header bài 1.1 và sidebar có Slide tổng hợp, search `slide lam quen` có nhãn Slide và Enter mở đúng deck. Sau vào slide, đổi bước, mở presenter và Back rồi mở trang chủ mới, lộ trình vẫn tiếp tục 1.1, tổng vẫn 0/50 và phần 1 là 0/5. Không bấm hoàn thành/reset/import/demo. Đây là quan sát trạng thái công khai, không đo byte storage; test nguồn và HTML bổ sung bằng chứng layout mới không mount progress. |

## Nhánh dự phòng có kiểm soát

Server fixture chỉ đọc build ở port 4335, script `temp/verification/2026-11-01-foundation-presentation/fixture-server.mjs`, không nằm trong sản phẩm và được dừng sau kiểm.

- `fixture=no-js` bỏ các script khỏi HTML build, giữ CSS/assets: đủ 20 slide có chiều cao, không `is-enhanced`, không có ghi chú của người giảng. Mở lời giải 19 bằng native summary được. Đây là mô phỏng script không tải, không phải tuyên bố đã đổi setting JavaScript của trình duyệt; banner `noscript` không được thử bằng setting thực.
- `fixture=failures` dùng test double tại trang local cho BroadcastChannel, popup, fullscreen và clipboard. Channel không có: trạng thái Tự xem, Follow disabled có lý do, Next vẫn sang slide 2. Popup trả null: thông báo bị chặn và link có run/slide đúng vẫn hiện. Fullscreen reject: thông báo tiếp tục trong cửa sổ. Clipboard không có: hiển thị liên kết sạch để chép thủ công. Không thay quyền/bảo mật của browser để thử các nhánh này.
- Input/IME/Process/modifier guard và Space native được reviewer kiểm bằng DOM runtime mock; root chỉ kiểm phím thực nêu ở bảng trên, chưa dùng bộ gõ IME hệ điều hành hay trình đọc màn hình.

## Thiết kế, giới hạn và bàn giao

`designmd lint DESIGN.md`: 0 lỗi, 0 cảnh báo. Audit premium strict giữ đúng **exit 1 / một lỗi nền** ở SqlEditor, là false positive về resize như ma trận. JSON `ui-audit-final.json` được giữ nguyên. Không có formatter/linter hay premium-ui.json riêng trong repo.

Chưa kiểm máy chiếu/màn hình thứ hai vật lý, screen reader, Firefox/Safari, zoom 200%, forced colors và bản in. Đồng bộ chỉ trong cùng origin/profile trình duyệt, một người giảng mỗi run. Những giới hạn này không thay kết quả browser đã quan sát.

Không merge, push hoặc deploy. Bản xem local và tài liệu `docs/presentation-template.md` dùng để bàn giao; các chương khác chỉ cần thêm MDX/metadata theo cùng khung.

Tái kiểm độc lập delta sau sửa tại [integration-followup.md](integration-followup.md): 26/26 test liên quan đạt, xác nhận Follow/gate nguồn/H1 và xử lý đủ ma trận, không còn finding cần sửa trong phạm vi đã kiểm. Câu template khớp nguồn/phút được bổ sung sau mốc sản phẩm; không thay build. Server fixture 4335 đã dừng, các tab kiểm tạm đã đóng; giữ preview 4334 và hai trang bàn giao đang đồng bộ ở slide 1.
