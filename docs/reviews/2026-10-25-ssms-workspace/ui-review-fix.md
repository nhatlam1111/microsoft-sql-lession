# Re-review UI-01, UI-02, UI-03

## Phạm vi và phiên bản

Re-review độc lập chỉ ba mục của `ui-review.md`, theo gói xử lý root đã chốt; giữ nguyên report gốc. Source là working tree nhánh `codex/ssms-exercise-workspace`, base được giao `19170bc`, ngày 25/10/2026. Không mở lại toàn bộ review UI hoặc các phần API/guard không liên quan.

Đã đọc source editor, controller, thông báo storage, route fallback và CSS bổ sung; đọc các test tương ứng. Không dùng Git, browser, API, runner hoặc database; không đọc `.env`, secret hay answer YAML; không sửa source/test hoặc tạo agent con. Chỉ ghi report mới này.

Build mới được đối chiếu qua HTML `dist/bai/3-8-union-gop-danh-sach/bai-tap/1/index.html`, **mtime 25/10/2026 22:21:13**. Log `temp/verification/2026-10-25-ssms-workspace/build-final.log` ghi bắt đầu 22:21:09, hoàn tất 22:21:13, 117 trang build trong 4,35 giây. Đây là log build của tác giả đã được đọc để nhận diện phiên bản; reviewer **không tự chạy lại build**. Các file sửa chính có mtime trước build: SqlEditor 22:19:22; controller/workspace 22:18:55.

## Kết quả từng mục

| Mục gốc | Đánh giá sau sửa | Căn cứ kiểm lại |
|---|---|---|
| **UI-01 — mất undo khi chuyển textarea đang dùng sang CodeMirror** | **Đã xử lý bằng source và test mô phỏng.** | `SqlEditor.tsx` có latch `keepFallback`; `onChange`, bắt đầu composition và Tab/Shift+Tab làm đổi text đều giữ textarea cho phiên. Nhánh import kiểm latch trước khi mount. Textarea đã dùng không còn bị thay bằng document có history mới chỉ vì chunk tải xong; hint nói rõ giữ input cơ bản và cách tải lại để dùng gợi ý. Input chưa dùng vẫn nâng cấp bình thường bằng value/selection/callback mới nhất. |
| **UI-02 — route không có fallback SSR thực tế** | **Đã xử lý một phần, đúng quyết định giữ client-only.** | Route vẫn `client:only="react"`; slot fallback nay có frame, `aria-busy`, textarea có nhãn nhưng disabled, lời chờ/tải lại, và `noscript` dẫn sang SSMS riêng, nêu rõ không chấm tự động. HTML build thực có một textarea fallback ngoài template inert; bản sao trong `<template data-astro-template="fallback">` không phải một ô nhập đang hoạt động thứ hai. Test component đã đổi tên đúng thành render tĩnh component; test route mới kiểm đúng trang Astro. |
| **UI-03 — bỏ qua lỗi xóa mã khỏi storage** | **Đã xử lý bằng source và fake storage test.** | `invalidateCode()` gọi reset memory rồi ghi kết quả `onCode(null)` vào `codeRemoved`; cả đổi mã và phản hồi `bad-code` dùng cùng nhánh. Workspace hiển thị lỗi xóa riêng, nói đúng rằng trang đã bỏ mã cũ nhưng reload có thể lấy lại mã còn trong storage. Lưu mã mới thành công xóa cảnh báo; lưu thất bại không che lỗi xóa cũ. |

Không có finding mới cần sửa trong phạm vi ba bản sửa này. Không dùng kết luận đó để xác nhận toàn bộ workspace hoặc các kiểm ngoài phạm vi đã đạt.

## Kiểm regression thực tế

Reviewer chạy lúc **22:22:10 ngày 25/10/2026**:

```text
npm exec vitest -- run tests/sql-editor-mount.test.ts tests/sql-editor-state.test.ts tests/sql-editor-completion.test.ts tests/exercise-workflow.test.ts tests/exercise-workspace.test.ts tests/exercise-route.test.ts tests/exercise-client.test.ts tests/exercise-layout.test.ts
```

Kết quả: **8 file, 79 test đạt**, exit code 0.

- Chín test mount mới kiểm chunk đến giữa composition; nhập trong fallback rồi mô phỏng undo; Tab trước khi chunk đến; composition kết thúc trước chunk; input chưa dùng được nâng cấp; callback/selection mới nhất; unmount; chunk lỗi và initialization lỗi. Harness dùng effect/event closures thật của component nhưng hook/runtime giả lập, không có DOM hay OS IME. Tên và chú thích test nêu rõ giới hạn này, không giả là native undo đã chạy.
- Hai test route render trang Astro thực trong container với catalog giả: có frame tải và textarea disabled có nhãn, cùng đường no-JavaScript sang SSMS riêng. Đã đối chiếu lại HTML dist 22:21:13, nên không chỉ dựa vào test render `SqlEditor` rời.
- Hai case storage mới dùng `getItem` thành công và `removeItem` ném lỗi cho cả đổi mã và `bad-code`; kiểm nháp còn nguyên, memory auth/permit/preview bị xóa, mã cũ còn trong fake storage được báo, và mã mới lưu thành công phục hồi trạng thái. Các test revision gate/preview isolation còn đạt.
- Các test state/completion/layout/client/workspace còn đạt; không thấy regression của nháp rỗng/comment, controlled rerender, undo trong CodeMirror state, hay yêu cầu chạy lại sau đổi mã.

## Giới hạn còn giữ nguyên khi bàn giao

1. **UI-01:** source đã loại nguyên nhân thay DOM của textarea đã dùng; chưa trực tiếp thử native Ctrl+Z, paste/IME hệ điều hành hay chậm chunk trong browser. Không suy từ event `historyUndo` giả lập thành native history đã được xác nhận.
2. **UI-02:** fallback SSR là khung chờ có chỉ dẫn, **không phải editor tương tác trước khi React mount**; chưa khôi phục nháp/auth trong HTML server. Đây là giới hạn có chủ đích của cách xử lý một phần được root giao, không còn mô tả như editor SSR dùng được. Chưa thử chặn JavaScript/chunk bằng browser.
3. **UI-03:** đã kiểm controller và thông báo qua source/fake storage; chưa quan sát cảnh báo và reload trên browser có storage failure thật.
4. Không kiểm SQL live, 63 đáp án, API, toàn bộ 63 trang tương tác, modal/focus/viewport hoặc quyền push/deploy trong lượt này. Các giới hạn đó vẫn cần bằng chứng riêng của người làm QA.

Kết luận: UI-01 và UI-03 đã xử lý đúng nguyên nhân trong phạm vi source/test; UI-02 khớp phương án sửa một phần được chốt và nay có bằng chứng từ route build thật. Không còn yêu cầu source sửa tiếp phát sinh từ re-review ba mục này; các kiểm browser nêu trên chưa được reviewer xác nhận.
