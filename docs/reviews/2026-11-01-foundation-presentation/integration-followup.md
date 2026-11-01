# Tái kiểm delta sau review tích hợp

Ngày: 01/11/2026. Cùng reviewer và cùng lượt review trước, **kế thừa model của phiên**; không review lại toàn bộ. Report gốc `integration-review.md` giữ nguyên; `git diff --exit-code HEAD -- <report gốc>` trả exit 0.

## Phiên bản và phạm vi

- Delta: `95be5b7e9f7775e8d99034ab87a0c662bbf71003..1592f0fd6cd8f7c7f659e2e1c728f1731b542d6b`. Khi bắt đầu, HEAD khớp `1592f0f`, working tree sạch.
- Tái kiểm Follow fallback, gate nguồn Slide/outline và hai route, H1/CSS, test liên quan, template thêm deck, ma trận xử lý và hồ sơ kiểm. Không mở rộng sang nội dung SQL hay kiểm lại toàn bộ pipeline.
- Build được giao hoàn tất **15:51:19**, 139 trang, log `temp/verification/2026-11-01-foundation-presentation/build-final.log`; HTML audience có thời gian ghi 15:51:18. Theo gói giao, build đã chứa mọi sửa sản phẩm trước commit 15:54:13. Reviewer tự đọc lại ba HTML; không dựng lại hoặc chạy browser.
- Sau khi reviewer nêu một chỗ hồ sơ chưa nói rõ, tác giả chỉ bổ sung **một câu** ngoài `1592f0f` tại `docs/presentation-template.md:44`: `PresenterNotes.source` và `PresenterNotes.minutes` phải khớp `source` và `minutes` của Slide chứa nó. Đã tự kiểm câu này và Git diff; sản phẩm/build không đổi. Report này bao gồm doc delta đó, chưa coi nó là đã nằm trong commit `1592f0f`.

**Kết quả:** không còn finding cần sửa từ lượt tích hợp trong phạm vi đã xác minh; không phát hiện finding mới qua delta này. INT-01 được xử lý đúng. Ma trận đã quyết định đủ các nhận xét và các mục cân nhắc của report gốc; các giới hạn chưa kiểm vẫn được ghi rõ, không chuyển thành kết luận UI/AT đạt.

## Kết quả từng sửa

| Mục | Tự kiểm và kết luận |
|---|---|
| INT-01 · Follow | Head mới có đúng sửa đã được reviewer kiểm runtime mock ở lượt trước: `disabled = following || !channel`, title giải thích. Nhánh không có channel vẫn đặt Tự xem và giữ điều hướng. Delta không đổi protocol/state. **Đã xử lý** lỗi nút enabled không thực hiện được; không nhận browser fixture của tác giả thành tự kiểm browser của reviewer. |
| Nguồn tồn tại | `Slide.astro:7` ném lỗi nếu không tìm được bài nguồn, thay vì âm thầm bỏ footer. Đã thực thi frontmatter thực của component bằng TypeScript transpile/Node với catalog mock: nguồn có thật đi tiếp; nguồn không tồn tại bị từ chối với lỗi chứa ID/nguồn. Đây là kiểm logic với mock, không phải chạy Astro render hoặc truy cập database. |
| Nguồn thuộc metadata | `presentationOutline(body, sourceLessons)` chặn nguồn ngoài danh sách. Cả route audience và presenter truyền `entry.data.sourceLessons`; không có route quên gate. Test có assertion từ chối danh sách không chứa nguồn và chấp nhận nguồn hợp lệ. **Giữ được** cách dùng lại cho deck sau, không thay đổi ID/thứ tự hiện tại. |
| Nguồn/phút ghi chú | Bộ hiện tại vẫn được test đối chiếu đủ 20 cặp Slide/PresenterNotes. Generic parser cho mọi dạng ghi chú tương lai chưa được thêm, đúng quyết định **Làm một phần** trong ma trận. Câu template bổ sung đã làm khớp điều tác giả tuyên bố trong hồ sơ; không còn chỗ mô tả này bị bỏ ngỏ. |
| H1 và thứ bậc | Audience dùng H1 tên deck trong header, từng slide giữ H2; presenter giữ H1 tiêu đề slide hiện tại. Tự đọc HTML xác nhận **mỗi route có đúng một H1**. CSS khai báo margin 0 và weight 400, không dùng kiểu H1 mặc định; bỏ rule giấu tên deck dưới 1024px. Đây là kết luận cấu trúc/nguồn CSS; chưa tự xác nhận hình học hoặc trải nghiệm AT sau sửa. |
| Fallback/notes/progress trong HTML | Index: 1 H1, không script. Audience: 20 slide, 4 details, **0 notes**, 0 slide hidden. Presenter: 20 slide, 4 details, **20 notes**, 0 slide hidden. Cả ba không có ID trùng hoặc marker progress; audience/presenter tải cùng script PresentationShell mới `DpC8vPOf.js`. Không thấy delta làm mất fallback liên tục hay đưa notes/progress vào audience. |

## Ma trận và evidence

Đã đọc `decisions.md`, `verification.md`, phần cập nhật spec/plan và `docs/presentation-template.md`. Ma trận không bỏ các mục đã giao:

- INT-01: Làm theo và ghi sửa cùng bằng chứng fallback.
- Reload sau Tự xem: giữ chủ đích tham gia lại run, dùng share link sạch khi muốn tự xem độc lập; spec đã ghi rõ.
- Gate nguồn deck sau: làm một phần, ghi rõ phần generic PresenterNotes parser chưa làm; test và quy ước authoring bảo vệ phạm vi hiện tại.
- H1: sửa cấu trúc, vẫn ghi AT chưa kiểm.
- Một người giảng/run và không đồng bộ nhiều máy: giữ giới hạn đã duyệt.
- Visual/print/zoom/forced colors: phân biệt bằng chứng tác giả và phần chưa kiểm. Lỗi audit nền SqlEditor được ghi riêng, không nhận là lỗi mới của slide.

`verification.md` nói rõ viewport nào đã kiểm đủ 24 trạng thái, viewport nào chỉ kiểm mẫu, fixture không script khác setting tắt JavaScript thật, fallback dùng test double và progress chỉ quan sát trạng thái công khai chứ không đo byte storage. Những giới hạn đó nhất quán với report gốc. Reviewer không quan sát browser, không mở ảnh để suy ra đã tương tác và không chạy lại SQL/fixture. Các số 411 test, Astro check, link check, lint/audit và kết quả browser trong hồ sơ là **kiểm của tác giả**, không phải của lượt tái kiểm này.

## Lệnh và giới hạn tự kiểm

- `npx vitest run tests/presentation-outline.test.ts tests/presentation-state.test.ts tests/presentations.test.ts tests/presentation-content.test.ts`: **4 file, 26/26 test đạt**, exit 0, lúc 15:54:53. Không chạy suite đọc seed.
- Python thư viện chuẩn `pathlib`/`html.parser` đọc ba HTML và đếm H1/slide/details/notes/hidden/ID/script như bảng trên. Lần in đầu gặp lỗi encoding stdout Windows `cp1252`; chạy lại với stdout UTF-8 đạt, không coi lỗi công cụ này là lỗi sản phẩm.
- Node `typescript.transpileModule` thực thi frontmatter Slide với catalog mock và kiểm hai route truyền metadata: assertion hợp lệ/không tồn tại đều đạt. Không ghi harness vào repo.
- Git read-only xác nhận commit, delta và doc delta; không đổi source, HEAD/branch hoặc report gốc. Chỉ ghi file follow-up này.

Không tự chạy lại build/check/audit/toàn bộ test hoặc browser trong lượt này. Chưa tự kiểm màn hình/máy chiếu vật lý, trình đọc màn hình, IME hệ điều hành, trình duyệt khác, zoom 200%, forced colors hay print. Không đọc seed/secret, không dùng database/SQL/API; không tạo subagent. Kết quả delta này không thay quyền merge/push/deploy.
