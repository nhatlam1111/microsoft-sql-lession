# Review tích hợp độc lập — bài giảng Làm quen

Ngày: 01/11/2026. Công cụ: Codex agent, ngữ cảnh mới. Model: **kế thừa model của phiên**. Không tạo reviewer khác; chỉ ghi report này.

## Phạm vi và phiên bản

- Base: `ff4bc95675724bcc54149e291a88914dbd3ba730`; head được giao: `95be5b7e9f7775e8d99034ab87a0c662bbf71003`. Khi bắt đầu, `git status --short` trống và `git rev-parse HEAD` khớp head.
- Đã rà diff tích hợp: collection/metadata, `src/components/presentations/`, `PresentationLayout`, ba route `/bai-giang/`, `src/lib/presentation*`, controller `src/scripts/presentation.ts`, liên kết bài nguồn/sidebar/mindmap và tìm kiếm. Đối chiếu AGENTS, `docs/quy-uoc.md` mục 4.5–4.7, DESIGN, spec và plan ngày 01/11/2026. Áp dụng cặp skill frontend-design/frontend-design-premium cho logic UI theo thiết kế hiện hành; không sửa thiết kế hay sản phẩm.
- Build được giao tại `dist/`; log `temp/verification/2026-11-01-foundation-presentation/build-integration.log`: dựng lúc 15:42:31–15:42:35, **139 trang**, sau commit head lúc 15:42:29. Đã tự đọc HTML ba route mới của build này. Đây là bằng chứng HTML, không phải bằng chứng nhìn UI.
- Trong lúc review, tác giả sửa riêng phần Follow ở working tree. Đã kiểm `git diff -- src/scripts/presentation.ts`: thay một dòng `disabled` và thêm một dòng `title`. Finding bên dưới vẫn được giữ nguyên theo head được giao; phần tái kiểm sửa được ghi riêng, không coi working tree là build của head.

**Kết quả:** không phát hiện lỗi P1/P2 trong phạm vi nguồn/HTML và kiểm runtime mô phỏng. Có một lỗi P3 của bản head: nút Follow vẫn hoạt động về hình thức khi không thể đồng bộ. Sửa đang có trong working tree đã qua kiểm mô phỏng; browser/build của sửa này cần bằng chứng riêng của tác giả.

## Finding cần xử lý

| ID / ưu tiên | Vị trí và câu gốc | Đánh giá, tác động và đề xuất |
|---|---|---|
| INT-01 · P3 | `src/scripts/presentation.ts:64–67` ở head: `button.disabled = following;`; nhánh không có channel tại dòng 99–101; click Follow tại dòng 111 | **Cần sửa.** Mở audience có `run` khi thiếu BroadcastChannel hoặc constructor bị chặn: controller chuyển về Tự xem và có lời giải thích, nhưng vẫn hiện nút “Theo người giảng” đang enabled. Bấm nút không thể đổi chế độ. Đây là affordance không thực hiện được trong chính luồng fallback đã duyệt, không phải lỗi mất slide. Disable Follow khi không có channel và giải thích lý do; vẫn giữ điều hướng tự xem. Đã tái hiện trên controller của head bằng DOM/channel mock. |

Theo dõi INT-01: tác giả đang đổi thành `button.disabled = following || !channel` và thêm title giải thích. Reviewer đã tự chạy lại controller từ working tree với hai ca **không có BroadcastChannel** và **constructor ném lỗi**: Follow disabled, có title và thông báo, trạng thái vẫn Tự xem. Không sửa kết luận gốc của head; cần tác giả ghi quyết định xử lý và bằng chứng build/browser sau sửa trong ma trận.

## Các hợp đồng giữ được

| Phần rà | Bằng chứng của reviewer và kết luận trong phạm vi |
|---|---|
| State và đáp án | State thuần tách khỏi tiến độ; Next mở lời giải trước khi sang slide, Previous đảo từng bước, mục lục về bước 0. URL phục hồi slide/step/revision và run, chuẩn hóa ID/step/revision sai. Các test state và outline đạt. |
| Đồng bộ bất đồng bộ | Channel tách theo deck/run; validator kiểm version/deck/run/type/sender và state hợp lệ. Controller dùng full snapshot; audience yêu cầu lại khi mở, focus/pageshow/visible và theo lại. Harness chạy controller **ghim bằng `git show` head** đã xác nhận mở audience muộn nhận snapshot lời giải, tự xem rồi theo lại nhận snapshot cùng revision, bỏ revision cũ và run khác không tác động. Không có heartbeat/unload dùng để đoán người giảng còn mở. |
| Revision khi tự xem | Audience tự điều hướng tăng revision cục bộ nhưng so snapshot theo `lastPresenterRevision`, nên có thể quay lại snapshot của người giảng cùng revision cũ đã nhận. Harness xác nhận đúng tình huống này; không so nhầm revision cục bộ với revision người giảng. |
| Bàn phím và ngữ nghĩa | Nút/link/details là phần tử native; focus-visible kế thừa base CSS. Controller chặn defaultPrevented, composition/Process, modifiers và input/textarea/select/contenteditable/textbox. Space giữ quyền native trên summary/button/link/role=button. Đã tự kiểm các nhánh guard bằng harness, ngoài đọc mã. Đây không phải kiểm focus thực, trình đọc màn hình hay IME hệ điều hành. |
| Popup/fullscreen/link chia sẻ | Đọc nguồn: popup chỉ mở từ click, có link trực tiếp và lời giải thích khi bị chặn; fullscreen chạy trực tiếp trong audience, catch lỗi và giữ cửa sổ thường. Share helper xóa query/hash cũ, chỉ giữ `slide`; test helper đạt. Không có tự chạy slide hoặc đổi thiết lập bảo mật. Chưa tự kiểm popup/fullscreen/clipboard trong browser. |
| Không JavaScript và ghi chú | Tự phân tích ba HTML bằng Python `html.parser`: audience có **20 slide, 4 details, 0 notes, 0 slide hidden**; presenter có **20 slide, 4 details, 20 notes, 0 slide hidden**. Không có ID trùng trong cả hai. CSS chỉ ẩn slide khi controller đã render và thêm `is-enhanced`; đáp án fallback dùng native details. Ghi chú thật sự vắng khỏi HTML audience, không chỉ bị CSS che. Chưa tự tắt JS trong browser để xác nhận hình học/đọc toàn trang. |
| Tiến độ và số bài | Layout mới không mount BaseLayout/progress islands; controller không dùng browser storage/progress store. HTML ba route mới không có progress owner và audience/presenter chỉ tải script PresentationShell. Test metadata xác nhận catalog vẫn **50 bài/6 level**, sidebar phần 1 vẫn `0/5`, slide không có status. Test progress-store nền chạy riêng đạt; việc trang bài nguồn/sidebar cũ khởi tạo tiến độ vẫn theo luồng cũ. Chưa tự đo storage trong browser; không suy kiểm HTML thành đo ghi storage thực. |
| Navigation/search/metadata | Entry riêng có sourceLessons và validation nguồn tồn tại/không lặp, slug an toàn/không lặp; route dùng helper base path. Link bài nguồn và link slide được suy từ metadata; sidebar không đưa slide vào catalog tiến độ. Search dùng `section:slug`, nhãn Slide, không gán level hay số bài và giữ thứ hạng số bài chính. Các test mới và test search/path/catalog cũ đạt. |

## Kiểm tự thực hiện

1. `npx vitest run tests/presentation-state.test.ts tests/presentation-outline.test.ts tests/presentations.test.ts tests/presentation-content.test.ts`: **4 file, 26/26 test đạt**, exit 0, lúc 15:44:14. Đã đọc các import/helper để tránh suite đọc seed; các test này chỉ đọc nội dung/metadata và logic liên quan.
2. `npx vitest run tests/search.test.ts tests/paths.test.ts tests/catalog.test.ts tests/progress-store.test.ts`: **4 file, 30/30 test đạt**, exit 0, lúc 15:48:12. Dùng store in-memory trong test, không truy cập database.
3. `@'…'@ | python -` với Python thư viện chuẩn `pathlib`/`html.parser`: đọc ba HTML, đếm slide/notes/details/ID/script/hidden và marker progress như bảng trên. Không có browser hoặc hình chụp trong lượt này.
4. `@'…'@ | node --input-type=module -`: dùng TypeScript `transpileModule` và Node `vm`, DOM/channel mock nhỏ; controller và state được lấy bằng `git show 95be5b7…:<path>` để ghim đúng bản giao. Các assertion mở muộn/equal revision/revision cũ/run khác/IME/modifiers đạt; tái hiện INT-01 của head. Không viết harness vào repo.
5. Lệnh Node cùng cách tiếp cận, controller đọc riêng từ working tree: ca channel thiếu/constructor lỗi và các guard input/Space đạt sau sửa INT-01. Một lần harness trước đó đọc working tree khi tác giả vừa sửa nên fail assertion đang kỳ vọng Follow còn enabled; đã xác định lệch mốc bằng Git diff và chạy lại bản ghim head cùng bản sửa riêng. Không ghi lần fail này thành lỗi sản phẩm mới.

Tổng unit test tự chạy: **56/56 đạt**. Không tự chạy toàn bộ `npm test`, `check`, build, `check:dist`, audit strict hay lint DESIGN trong lượt review này; không gọi các kết quả tác giả thông báo là kiểm của reviewer.

## Những điểm đã cân nhắc, chưa kết luận lỗi hoặc ngoài phạm vi

- **Một người giảng mỗi run:** không có cơ chế bầu leader/khóa presenter. Đây là giới hạn đã duyệt; không đề nghị thêm đồng bộ nhiều người hay nhiều máy. Cửa sổ chiếu vẫn giữ state khi người giảng đóng theo mô hình không heartbeat.
- **Reload sau Tự xem:** URL giữ run/slide/step/rev, nhưng không lưu cờ Tự xem; tải lại audience có run sẽ xin theo lại người giảng. Spec không yêu cầu lưu chế độ tự xem qua reload; ghi rõ để tác giả xác nhận chủ đích trong ma trận, không coi là lỗi đã chứng minh.
- **Khả năng mở rộng metadata:** frontmatter và outline hiện tại hợp lệ; parser yêu cầu thuộc tính Slide literal, đúng chú thích và cách viết deck. Generic build gate chưa đối chiếu từng `Slide.source`/`PresenterNotes.source` với `sourceLessons` của mọi deck tương lai; test hiện hành bảo vệ riêng `lam-quen`. Đây là thiếu bảo vệ tác giả khi thêm deck, chưa phải lỗi nội dung/route hiện tại. Có thể làm khi thêm deck kế tiếp thay vì tăng phạm vi lượt này.
- **Heading audience:** HTML audience không có H1; từng slide dùng H2 có `aria-labelledby`, deck có document title và nhãn trên header. Không tự kết luận vi phạm accessibility chỉ từ việc không có H1. Chưa có thử nghiệm trình đọc màn hình/focus thực để đánh giá mức định hướng khi slide đổi.
- **Phóng/chiếu/print:** không tự xác minh độ dễ đọc từ xa, 1280/1440/1920, overflow, zoom 200%, reduced motion, forced colors hoặc print preview. CSS đọc được không thay bằng chứng này. Print không phải đầu ra được duyệt riêng; không mở thêm yêu cầu handout trong lượt review.

## Evidence được giao và giới hạn

- Đã đọc report nội dung độc lập `content-review.md` và report SQL của tác giả `sql-verification.md` để nối phạm vi: report nội dung kiểm tiền đề bốn câu hỏi cho người đã học 1.1–1.5; report SQL mô tả 12/12 ca SELECT-only và giới hạn CAST/metadata. Không chạy lại SQL hoặc dùng các report này làm bằng chứng tự kiểm SQL/UI.
- Theo thông tin tác giả giao, browser đã kiểm 24 trạng thái tại 1280×800, mở muộn/reload/Tự xem/theo lại; các viewport/fallback khác đang được tác giả thực hiện. Reviewer không quan sát những thao tác đó và không nhận chúng thành bằng chứng độc lập. Chưa đọc `geometry-1280.json` và không suy kiểm visual từ số đo.
- Không đọc seed, secret hoặc cấu hình kết nối; không dùng database/SQL/API/runner. Không sửa product source, Git hay nội dung khác. Không thực hiện push/deploy.
- Phần bàn giao còn cần ma trận của tác giả xử lý INT-01 cùng các mục cân nhắc trên, build/browser của sửa và bằng chứng UI/progress thực tương ứng. Kết luận này không thay quyền merge/push/deploy và không dùng nhãn Ready hay điểm số thay bằng chứng.
