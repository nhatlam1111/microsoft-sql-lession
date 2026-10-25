# Review tích hợp độc lập — SSMS exercise workspace

Ngày review: 25/10/2026, khoảng 22:21–22:28 +07. Reviewer: Codex, **kế thừa model của phiên**; không chỉ định model khác, không tạo agent con.

## Phạm vi, phiên bản và cách kiểm

- Repo `E:\Projects\SQL Lession`, nhánh `codex/ssms-exercise-workspace`, HEAD/base `19170bc4428d21715ba42b3fa0416c06148280a4` cộng working tree được giao. Review luồng chung của 63 route bài tập; không review lại nội dung từng bài/đề hoặc đáp án.
- Đã đọc `AGENTS.md`, `docs/quy-uoc.md` mục 4–5, `DESIGN.md`, `UX-CONTRACT.md`, spec `docs/superpowers/specs/2026-10-25-ssms-exercise-workspace-design.md`, plan tương ứng. Dùng hướng dẫn frontend-design và frontend-design-premium để rà hợp đồng UI, giữ các quyết định thiết kế đã duyệt.
- Build được giao: `dist/`, log tác giả ghi hoàn tất **22:21:13 +07**, 117 trang. Tôi kiểm HTML build của cả 63 route bài tập; không chạy lại build hoặc thay bản tác giả đang dùng để kiểm browser.
- Công cụ tự dùng: PowerShell, `rg`, đọc source/HTML/log, Node **v24.18.1**, Vitest **3.2.7**, esbuild bundle trong bộ nhớ, Python static auditor. Không browser, không kết nối DB/API thật, không mở `.env`/secret/seed/answer SQL, không đọc report reviewer khác, không sửa source/Git. File duy nhất ghi là report này.
- Rà source: workspace/controller/client/storage/layout; SqlEditor/runtime/state/completion/fallback; grid/CSS/base layout; route/public projection; parser schema và preview API/core/dev routes/runner/guard. Chỉ đọc code tạo metadata và fake tests; không mở script SQL đầu vào.

Sáu file lõi được chụp SHA-256 trong lúc review và đối chiếu lại lúc **22:26:42 +07**, không đổi:

| File | SHA-256 |
|---|---|
| `src/lib/exercise-workflow.ts` | `6626464BBB14BF0614A895269156607B54D00598BEF11381CDE030ECFB03513D` |
| `src/components/islands/ExerciseWorkspace.tsx` | `8F7311CC8A75352B5209662EA23E7DAB0F9FBD21157D7676B05D4A52DBBA096F` |
| `src/components/islands/SqlEditor.tsx` | `4B60436468A5847EAD954B07E4EFDFAE6884052A3C5FBB5DF846600A73189197` |
| `src/lib/sql-editor-runtime.ts` | `8AFCBC6BA80B1D6EBD61B31AC4735ACF4D9A08FAA836211FB772B2910B26C074` |
| `src/lib/sql-guard.ts` | `69055C1517189A13B6F21E25D4C5E67B7E09B5365C3931694C19C8CAB9DB438F` |
| `api/src/table-preview.ts` | `59DFA09F1878DE4BC0955738EF850A03F5FA5E6D6282DD11DD4A124BE312FF2A` |

## Findings theo tác động

**Không tìm thấy lỗi tích hợp có căn cứ cần sửa trong phạm vi source, HTML và fake tests đã kiểm.** Không có finding P0/P1/P2/P3. Kết luận này không thay bằng chứng tương tác browser hoặc live SQL.

## Những hợp đồng giữ được

| Hợp đồng đã duyệt | Bằng chứng độc lập và nhận xét |
|---|---|
| Một workspace cho 63 route, đề trái/editor giữa/Explorer phải | Route `[n].astro:58` dùng cùng `ExerciseWorkspace`; tự đếm build được **63 route/63 client-only islands/63 static fallbacks**. CSS có brief `clamp(280px,24vw,340px)`, Explorer 260px, lề 24px/gap 16px; không thay lesson layout. Kích thước thực tế cần browser. |
| Execute đúng revision mới mở Nộp; undo cũng hủy quyền | `exercise-workflow.ts:61,92,108,171–173`: permit gắn revision, xóa trước lần chạy mới và mỗi document change; chỉ run không SQL error của đúng revision cấp quyền. Zero-row thành công vẫn hợp lệ. Fake tests kiểm edit/undo về cùng text, pending run, double activation, grade lỗi/cũ và không ghi progress sai. |
| Phản hồi cũ, đổi mã và một DB action | Controller giữ active operation và epoch; đổi mã abort, xóa permit/cache/preview/verdict; draft giữ nguyên. Grade bị 401 không tự replay. Fake tests kiểm stale response/unmount/table switch; probe bổ sung chọn ba bảng liên tiếp chỉ gửi bảng đầu và bảng cuối, không nhận lại bảng cũ. Preview giữ nguyên run permit; đổi mã xóa permit và buộc fetch lại cache. |
| Preview read-only, trang 50, đủ PK, không giả tổng | `table-preview.ts:11–25`: exact whitelist bảy bảng, kiểm trường query/trùng tham số/page/offset, explicit columns, ORDER BY toàn bộ PK, FETCH 51. `core.ts:97–120` dùng cùng auth/rate/runner và trả tối đa 50 + hasMore; lỗi generated SQL không đẩy chi tiết ra người học. Fake tests kiểm injection, composite PK, biên/trang rỗng/auth/rate/error. Workspace có khoảng dòng và Trước/Sau/Làm mới, tách grid run và preview. |
| Guard hai phía và rollback | Controller và API cùng gọi `guardExercise`; guard bỏ literal/comment/quoted identifier trước khi chặn lệnh transaction/DDL/EXEC. Fake tests kiểm trường hợp hợp pháp và lệnh bị chặn; không thử escape trên DB thật. `runner.ts:75–77` giữ `finally` rollback và kiểm `@@TRANCOUNT`; đây là kiểm source, chưa phải chứng minh driver/DB chạy thật. |
| Metadata completion, không câu trả lời mẫu | Completion chỉ nhận `DbTable[]` từ schema; MSSQL keyword source lọc bằng cùng helper blocked keywords, hỗ trợ cột/table/alias và tránh literal/comment. `publicExercises` bỏ answer/check trước props client. Chưa kiểm toàn bộ nội dung JS build theo đáp án; đó thuộc `check:dist` của tác giả. |
| Nháp rỗng/comment và hồi phục editor | Workspace dùng `loadDraft(...) ?? ''`, không mount autosave; storage helper giữ chuỗi rỗng và báo lỗi lưu. Static fallback route bị disabled để tránh gõ trước React bị ghi đè. Sau React, textarea có nhãn/placeholder; CodeMirror chunk/init lỗi giữ input. Gõ/IME/Tab trước chunk giữ textarea cho cả phiên, tránh thay input làm mất undo/composition (`SqlEditor.tsx:34–65,99,120–122`). Fake mount/state/component tests kiểm các nhánh này. |
| Keyboard, splitter, modal và cuộn có owner chung | Source có tab roving/Home/End/arrows, splitter pointer/keyboard với min 180/160, shortcut tránh IME/modal; diagram dùng owner cũ có focus trap/Escape/trả focus. CodeMirror owns scroller, bảng có overflow nội bộ, frame min 560px; không khóa overflow document; reduced motion giữ từ CSS global. Chỉ xác nhận cấu trúc/source, không suy ra đã thao tác được trong browser. |
| Đường thực hành của người chưa có mã | Hướng dẫn hiển thị nơi nhận mã và link bài 1.2 để tạo database riêng; nói rõ bản riêng không có chấm tự động. Trang phân biệt rollback trên web với SSMS chạy thật. Static loading/noscript có hướng dẫn phục hồi; không hứa textarea trước React chạy được. |

## Kiểm tự chạy

1. Lệnh:

   ```text
   npm test -- tests/exercise-workflow.test.ts tests/exercise-client.test.ts tests/exercise-route.test.ts tests/exercise-workspace.test.ts tests/exercise-layout.test.ts tests/sql-editor-mount.test.ts tests/sql-editor-completion.test.ts tests/sql-editor-state.test.ts tests/sql-guard.test.ts tests/api-core.test.ts tests/api-preview.test.ts tests/api-routes.test.ts
   ```

   **12/12 file, 116/116 tests đạt**, bắt đầu 22:24:20 +07; exit 0. Đây là tests với fake deps/state/markup, không gọi DB/API thật.

2. Probe Node + esbuild `write:false`, bundle riêng `exercise-workflow.ts` trong bộ nhớ: run thành công → preview NhanVien pending → chọn PhongBan → chọn ChucDanh → resolve phản hồi đầu. Calls thực tế: `run`, `preview NhanVien`, `preview ChucDanh`; selected/preview cuối đúng ChucDanh, permit run còn nguyên. Đổi mã giả → preview/permit xóa → xem lại ChucDanh tạo request mới. **PASS**, exit 0; không ghi file probe.

3. Tự đếm HTML `dist/bai/*/bai-tap/*/index.html`: **63**, có static fallback **63**, client-only **63**.

4. `python .../frontend-design-premium/scripts/audit_project.py 'E:/Projects/SQL Lession' --mode strict --no-write`: output **0 errors, 0 warnings, 0 violations, 0 unresolved**. Repo không có `premium-ui.json`; không dùng kết quả auditor như bằng chứng runtime hay bằng chứng toàn bộ UI đạt.

## Evidence tác giả được đọc riêng

Từ `temp/verification/2026-10-25-ssms-workspace/`:

- `build-final.log`: 117 trang, hoàn tất 22:21:13.
- `tests-final.log`: 50 file, **392/392** đạt; đây không phải 392 tests do reviewer tự chạy.
- `check-final.log`: **0 errors, 0 warnings, 1 hint** cho `document.execCommand` deprecated tại SqlEditor:102.
- `dist-final.log`: **117 trang, 2215 link**, OK.
- `preview-live-results.json`: tác giả ghi đối chiếu SELECT read-only và authenticated preview theo full PK cho bảy bảng, gồm paging/trang rỗng; ghi 401 không auth, 400 table/page giả.
- `data-live-final.log`: tác giả ghi **“Không bảng nào lệch.”**

Tôi không tự chạy lại các phép kiểm live trên. Không đọc answer SQL hoặc dùng dữ liệu đáp án để thay việc rà đường thực hành.

## Phần cân nhắc và giới hạn

- **Không chuyển thành finding:** không có cancel button riêng; source hủy/bỏ phản hồi khi đổi bảng, đổi identity hoặc unmount đúng scope đã chốt. Không diễn giải abort phía client là bảo đảm SQL server đã dừng.
- **Không chuyển thành finding:** giữ textarea cho cả phiên nếu đã dùng trước CM chunk là quyết định bảo toàn undo/IME có thông báo, phù hợp yêu cầu hồi phục. Không buộc nâng cấp input giữa phiên.
- **Chưa xác minh bằng browser:** 1280/1440/1920, màn thấp/bảng rộng, phím Tab/Escape/completion, native undo/redo, IME thật, focus/splitter/modal/layer/computed style, reload với draft và storage failure. Parent đang kiểm browser nên reviewer không chiếm tab. Source/fake tests không thay các kiểm này.
- **Chưa tự xác minh bằng live SQL:** bảy preview thực, timeout/quota/connection thực, 63 đáp án qua runner, tác dụng rollback thực tế và check:data. Có đọc evidence tác giả về preview/check:data như liệt kê; không tuyên bố đó là kiểm của reviewer.
- Không lặp review tiền đề từng đề hoặc kiểm số liệu từng bài; phạm vi là luồng công cụ dùng chung đã giao. Không kiểm seed/đáp án/mã truy cập, không push/deploy.

Trong phạm vi được giao, chưa có vướng mắc source tích hợp phải sửa. Việc nghiệm thu local đầy đủ cần giữ các bằng chứng browser/live của tác giả kèm giới hạn; kết luận review này **không cấp quyền merge/push/deploy**.
