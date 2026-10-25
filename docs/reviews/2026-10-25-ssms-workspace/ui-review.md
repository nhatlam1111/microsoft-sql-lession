# Review độc lập UI, code quality và tuân thủ thiết kế SSMS workspace

## Phạm vi, phiên bản và bằng chứng thực tế

- Reviewer giữ model kế thừa của phiên Codex; không tạo agent khác. Góc nhìn: người học chỉ có Excel văn phòng cơ bản, cần hiểu việc công cụ đang làm và giới hạn của kết quả.
- Source: nhánh `codex/ssms-exercise-workspace`, HEAD/base `19170bc4428d21715ba42b3fa0416c06148280a4`, thay đổi chưa commit ngày 25/10/2026. Đã đọc source workspace/editor/helper/client/storage/layout/route/styles và các test tương ứng trong khoảng 17:49–17:57. Đây là review snapshot đang làm việc, không phải review commit đã đóng băng.
- HTML đã đọc tĩnh: `dist/bai/3-8-union-gop-danh-sach/bai-tap/1/index.html`, timestamp file 25/10/2026 17:48:55 (gói build được giao là 17:48:56). Không dùng HTML này để kết luận API/guard đang sửa sau build đã đạt.
- Đã đọc `AGENTS.md`, `docs/quy-uoc.md` (đặc biệt 4.5/4.6), template, hồ sơ công ty, mẫu 1.1; đọc phần đường thực hành của 1.2/1.6; đối chiếu `DESIGN.md`, `UX-CONTRACT.md`, spec và plan SSMS ngày 25/10/2026. Áp dụng hướng dẫn frontend-design/frontend-design-premium và quy tắc accessibility của ui-ux-pro-max trong giới hạn review được giao.
- Chỉ ghi file report này. Không đọc report khác, ma trận xử lý, answer YAML, seed SQL, `.env` hoặc secret. Không sửa source/test/docs/Git; không gọi API/runner/database, không chạy SQL và không mở browser.

Lệnh đã chạy lúc 17:53:39:

```text
npm exec vitest -- run tests/exercise-workflow.test.ts tests/exercise-layout.test.ts tests/exercise-workspace.test.ts tests/sql-editor-state.test.ts tests/sql-editor-completion.test.ts tests/exercise-client.test.ts
```

Kết quả: **6 file, 66 test đạt**, exit code 0. Đây là test state/render tĩnh và client giả lập; không phải bằng chứng browser, SQL live hay 63 trang tương tác đã đạt. Không chạy toàn bộ test/build/check:dist hay strict design audit trong lượt reviewer này; không đọc kết quả tác giả để thay cho kiểm của reviewer.

## Các nhận xét cần xử lý

### UI-01 — P2, Cần sửa: nâng cấp textarea sang CodeMirror làm mất undo của phần đã nhập trong lúc chờ

- **Vị trí:** `src/components/islands/SqlEditor.tsx:34–50`, `src/lib/sql-editor-runtime.ts:40–50`.
- **Câu/code gốc:** `value: latest.current.value`, chỉ chuyển `selection`, rồi `setReady(true)`; runtime tạo `EditorState.create({ doc: options.value, ... history() })` mới.
- **Điều kiện:** chunk editor tải chậm; người học nhập/sửa trong textarea dự phòng, sau đó chunk tải xong và bấm Ctrl+Z trong CodeMirror.
- **Căn cứ:** quá trình chuyển chỉ mang text và selection; `history()` mới không nhận các thao tác đã thực hiện trên textarea. Text hiện tại không bị xóa khi mount, nhưng undo từ trước thời điểm nâng cấp không có trong document history mới. Test hiện tại kiểm undo trong một CodeMirror state và controlled rerender, chưa kiểm chuyển từ input dự phòng đang được dùng.
- **Tác động:** người học đã bắt đầu viết trong ô có thể dùng được nhưng khả năng hoàn tác thay đổi giữa phiên, trái mục tiêu giữ nhập liệu/undo ổn định. Khác với undo qua rerender, nhánh chuyển editor là khoảng trống thật trong luồng hiện tại.
- **Đề xuất:** tránh thay input đã có thao tác của người học trong lúc đang chỉnh sửa; có thể giữ textarea cho phiên đó hoặc chỉ nâng cấp ở điểm chuyển an toàn có chủ đích. Nếu chọn chuyển ngay, cần cơ chế chuyển history tương ứng. Bổ sung kiểm chậm chunk → sửa trong fallback → nâng cấp → undo; không dùng test `EditorState` đơn lẻ làm bằng chứng cho ca này.
- **Mức xác minh:** xác nhận bằng source về việc tạo history mới và không chuyển history; **chưa tái hiện phím Ctrl+Z trong browser**.

### UI-02 — P2, Cần làm rõ/sửa: fallback SSR chỉ được test ở component, chưa tồn tại trên route build thật

- **Vị trí:** `src/pages/bai/[slug]/bai-tap/[n].astro:58`; `tests/sql-editor-state.test.ts:101–109`.
- **Câu/code gốc:** `<ExerciseWorkspace client:only="react" ... />`; test có tên `SSR always exposes a usable labelled textarea` nhưng gọi `renderToStaticMarkup(SqlEditor)` trực tiếp.
- **Căn cứ:** route bỏ SSR của toàn workspace. HTML build được giao có **0 `<textarea>` và 0 `class="ws-frame"`**, chỉ có island `ExerciseWorkspace` chờ client mount. Do vậy test component đạt không chứng minh trang có textarea SSR. Nếu chunk CodeMirror riêng lỗi sau khi React đã mount, fallback có thật; nếu island chưa mount/chunk workspace lỗi, khu vực làm bài trống và không có fallback SSR.
- **Tác động:** yêu cầu được giao có “SSR/failure textarea” chưa được thực hiện ở nơi người học mở trang; hiện trạng chỉ bao phủ lỗi chunk editor sau mount. Cũng chưa có thông báo tĩnh giúp người học hiểu vì sao không thấy công cụ.
- **Đề xuất:** làm rõ phạm vi chấp nhận của SSR và bổ sung fallback trên route thực tế nếu giữ yêu cầu đã giao; kiểm HTML route, không chỉ render component. Nếu chuyển sang SSR/hydration, cần chủ động xử lý nháp localStorage sau mount để tránh hydration ghi đè nháp.
- **Phân loại:** `client:only` đã có ở base, **không gọi đây là regression mới**; đây là khoảng trống so với yêu cầu SSR của lượt này. Không suy diễn rằng việc lỗi riêng chunk CodeMirror cũng làm mất textarea — nhánh đó đã có fallback.
- **Mức xác minh:** source và HTML xác nhận; chưa thử browser khi chặn island chunk.

### UI-03 — P3, Cần sửa: bỏ qua lỗi xóa mã truy cập khỏi storage

- **Vị trí:** `src/lib/exercise-workflow.ts:67–69`, `180`; đối chiếu `src/lib/exercise-storage.ts:write` và thông báo `codeSaved` trong workspace.
- **Câu/code gốc:** `resetIdentity(null); options.onCode(null)`; kết quả boolean của `onCode(null)` bị bỏ qua. Chỉ `submitCode` gán `codeSaved: options.onCode(code.trim())`.
- **Điều kiện:** có mã đã lưu từ trước; storage đọc được nhưng `removeItem` thất bại khi đổi mã hoặc khi server báo sai mã.
- **Căn cứ:** helper đã trả `false` khi xóa thất bại nhưng controller giữ `codeSaved: true`. Trong trang hiện tại quyền nộp/cache/code đã bị xóa đúng; mã cũ trong storage thì có thể còn và được tải lại ở trang/reload tiếp theo, không có cảnh báo cho người học.
- **Tác động:** luồng phục hồi mã gây lặp lại mã cũ dù người học vừa chọn đổi; phần cảnh báo lỗi lưu mới không bao phủ thao tác xóa. Không khẳng định đây là lỗi bảo vệ database hay bỏ qua auth server.
- **Đề xuất:** xử lý kết quả xóa tương tự kết quả lưu và hiển thị thông báo đúng hành động, chẳng hạn chưa xóa được mã đã lưu. Thêm fake storage case có `getItem` thành công và `removeItem` ném lỗi, cho cả đổi mã lẫn phản hồi `bad-code`.
- **Mức xác minh:** source xác nhận boolean bị bỏ qua; 66 test hiện có chưa kiểm riêng nhánh xóa thất bại.

## Những phần giữ được

- **Chạy thử → Nộp bài:** controller có revision độc lập React render, xóa permit ngay khi sửa và khi bắt đầu run mới, kể cả undo về text cũ; run thành công không có dòng vẫn mở quyền nộp. SQL error, lỗi request, đổi mã, kết quả run cũ và grade cũ không được ghi hoàn thành cho bản đang viết. Các test deferred/fake client đã kiểm các nhánh này và đạt.
- **Preview riêng biệt:** document, result, verdict và preview dùng state riêng; preview không sửa SQL/điểm. Cache theo bảng/trang trong phiên, xóa khi đổi mã; switching preview dùng abort và request identity, không mô tả abort là bảo đảm dừng SQL server. Metadata và sơ đồ không cần mã và không tự fetch dữ liệu khi mount.
- **Bàn phím theo source:** bốn tab có `role`, selected, controls, panel và roving tabindex; mũi tên/Home/End đổi tab/focus cùng nhau. Splitter có role/giới hạn/keyboard bên cạnh kéo chuột. Flow chặn thao tác DB thứ hai, còn cấu trúc/sơ đồ vẫn mở được. Khung phím editor gọi toàn document, không lấy selection.
- **Editor:** không format SQL khi nhập/chạy; echo value không tạo transaction mới; callback user edit tách khỏi external sync; history và selection không bị khởi tạo lại vì React rerender thường. Tab/Shift+Tab được kiểm bằng state commands. Completion dùng MSSQL/schema công khai và alias cơ bản; test không gợi ý trong literal/comment và lọc các keyword bị cấm đã đạt. Không xem completion là validator hay lớp bảo vệ dữ liệu.
- **Khả năng phục hồi:** textarea có tên/placeholder/describedBy và còn nhập/chạy được khi import editor riêng lỗi; saved empty/comment drafts giữ nguyên; storage keys giữ cũ; lỗi lưu nháp giữ text trong state và báo cần sao chép. Mã được mask mặc định, reveal có nhãn, không ghép mã vào URL trong client.
- **Bố cục theo source:** hai lưới ghép thành đề trái 280–340px, phần giữa co giãn, Explorer 260px; lề 24px và gap 16px đúng quyết định. Khung min 560px, split min 180/160px và document không bị khóa overflow; brief/Explorer cuộn riêng. CSS dùng token sáng và code font hiện hành. Chưa xác nhận hình học thực tế ở 1280/1440/1920 hoặc màn thấp.
- **Đọc bảng:** dùng bảng HTML thực, `NULL` giữ cách hiển thị riêng; số thứ tự là cột kết quả riêng; khoảng dòng preview được tính từ trang và số dòng đang có, không bịa tổng số dòng. Không thêm sort/edit/export giả.

## Đường học và các câu “tại sao/để làm gì”

| Câu tự đặt ra | Căn cứ đã có | Kết luận trong phạm vi này |
|---|---|---|
| Vì sao Chạy thử xong còn phải Nộp? | Workspace có hai hành động riêng, lý do khóa Nộp luôn hiện cạnh thao tác; UX contract nêu chỉ grade đúng ghi tiến độ. | Đủ để phân biệt thử câu hiện tại và gửi chấm; không cần thêm đoạn lý thuyết dài. |
| Vì sao sửa một chữ/undo lại phải chạy? | Nhãn kết quả bản trước và câu hướng dẫn chạy thành công câu hiện tại; controller dùng revision. | Đúng quyết định, tránh nộp một bản chưa được chạy. |
| Xem cấu trúc và xem dữ liệu khác nhau để làm gì? | Hai action riêng; bảng cấu trúc có tên/kiểu/NULL/khóa; 1.2 đã phân biệt Columns với dòng dữ liệu. | Có điểm tựa phù hợp Excel cơ bản; không cần dạy lại kiểu/khóa trong toolbar. |
| Dữ liệu bảng có phải phần sửa tạm sau lần chạy không? | UX contract nói preview là nguồn sau hoàn tác; đề ghi mỗi lần chạy web hoàn tác và phân biệt SSMS thật. | Source tách preview/run rõ. Chưa xác minh live dữ liệu nguồn. |
| Không có mã thì có bắt buộc kết nối SSMS chung không? | Hướng dẫn link 1.2 tới tạo database riêng, nói rõ bản riêng không chấm tự động. | Đường lựa chọn nhất quán; không ép học viên chỉ dùng web tự kết nối nguồn chung. |
| Bôi đen một đoạn rồi F5 có giống SSMS không? | 1.6 nói trang bài tập chạy cả khung, mỗi lần một câu; workspace gửi toàn `state.sql`. | Đã giải thích khác biệt quan trọng, không đề nghị đổi về hành vi SSMS selection. |

Không đọc answer YAML và không học thử từng đề trong 63 đề vì gói này là review công cụ. Do đó **không kết luận đủ tiền đề kiến thức để giải từng bài**. Bảng trên chỉ xác minh tiền đề thao tác dùng workspace; review nội dung/từng đề cần bằng chứng riêng.

## Các điểm chưa kết luận và kiểm tiếp cần có

1. **IME đúng lúc nâng cấp editor:** `composing.current` chỉ chặn phím trong textarea, không chặn nhánh import hoàn tất rồi thay textarea bằng CodeMirror ở `SqlEditor.tsx:34–50`. Cần browser làm chậm chunk, bắt đầu ghép chữ trước khi chunk xong rồi xác nhận không mất/nhân chữ và không chạy SQL. Source cho thấy nhánh chuyển có thể diễn ra giữa composition, nhưng lượt này **chưa tái hiện mất chữ**, không ghi thành finding kỹ thuật đã được chứng minh.
2. **Modal/focus/completion:** source có trap, Escape, restore trigger và chặn run khi diagram mở; CodeMirror có cơ chế Escape→Tab và completion keymap riêng. Chưa thử phím thật, popup cạnh mép viewport, screen reader, copy/paste hay giữ focus qua chuyển editor; không lấy render HTML/test state để báo đạt.
3. **Màn thấp và 3 viewport:** cần kích thước thực với bảng rộng, auth form, lỗi/storage warning, split tới hai đầu, và cuộn tới mọi action. CSS có chuỗi min-height/overflow hợp lý nhưng chưa chứng minh không tràn hoặc cắt trong browser.
4. **API/guard/live SQL:** ngoài phạm vi reviewer UI. Không đánh giá lại snapshot API đang sửa riêng, không chạy SQL cấm, không xác nhận paging theo PK hoặc always-rollback từ source UI. Kết quả 66 test không bao phủ 63 đáp án hay check:data.
5. **SSR gap UI-02:** cần tác giả chốt xử lý theo yêu cầu đã giao; không tự đổi contract để hợp thức hóa test component. Nếu giữ client-only là quyết định ngoài scope, phải ghi rõ giới hạn khi bàn giao.

## Kết luận

Luồng chính và các ranh giới state được viết rõ, 66 kiểm giả lập đạt; không có căn cứ để buộc sửa cơ chế Chạy/Nộp, preview hay đổi dependency CodeMirror đã duyệt. Cần xử lý chuyển input đang dùng làm mất undo, khoảng trống fallback SSR trên route và lỗi xóa mã khỏi storage; cần browser để kết luận IME, focus/modal và layout thật. Báo cáo này không xác nhận SQL live, tương tác 63 trang, quyền push/deploy hoặc trạng thái “Ready”.
