# Re-review hai bản sửa API/security

## Phạm vi và phiên bản

Review tiếp cùng reviewer, kế thừa model Codex của phiên, không đổi model/tạo agent khác. Chỉ kiểm bản sửa P1/P2 của [report gốc](<E:/Projects/SQL Lession/temp/review/2026-10-25-ssms-workspace/api-security.md>) và các test liên quan; giữ nguyên report gốc, không lặp review toàn Task 1 hoặc UI/editor.

Checkout `E:\Projects\SQL Lession`, nhánh `codex/ssms-exercise-workspace`, HEAD/base vẫn là `19170bc4428d21715ba42b3fa0416c06148280a4`; source chưa commit. Root giao bản sửa khoảng 17:54 +07 ngày 25/10/2026. Reviewer tự đọc/check từ 22:06 +07 cùng ngày, targeted tests chạy lúc 22:07.

Đã đọc phần thay đổi `src/lib/sql-guard.ts`, `api/src/dev-server.ts`, các bổ sung trong `tests/sql-guard.test.ts`, `tests/api-core.test.ts`, `tests/api-routes.test.ts`. Đối chiếu đúng thay đổi kể từ finding gốc: nhánh binary literal trong `TOKENS` và try/catch quanh URL parser. SHA256 source được kiểm:

- `src/lib/sql-guard.ts`: `69055C1517189A13B6F21E25D4C5E67B7E09B5365C3931694C19C8CAB9DB438F`.
- `api/src/dev-server.ts`: `BE2F380FBEAF9AD61927156019656E0D53698187049BAEE820C5E50AB3D511BC`.

Artifact `api/dist/index.js` và `api/dist/dev-server.js` có mtime 17:54:08; reviewer tìm thấy regex binary mới trong cả hai bundle và catch/send 400 mới trong bundle dev. Không rebuild hoặc khởi động artifact. API build và toàn bộ 379 test pass là bằng chứng root cung cấp; không tính thành kiểm do reviewer chạy. Reviewer không quan sát vòng RED lúc tác giả sửa.

## Kết quả từng finding

| Finding gốc | Kết luận trong phạm vi được giao | Bằng chứng do reviewer thực hiện |
|---|---|---|
| **P1 — literal nhị phân giấu ROLLBACK** | **Đóng.** `0x[0-9a-f]*` được nhận trước decimal/identifier, nên không nuốt `ROLLBACK` vào token `x1ROLLBACK`. | Bundle core trong bộ nhớ, dùng fake `Deps.run` đếm số lần gọi. Với đúng payload gốc `SELECT 0x1ROLLBACK UPDATE BangLuong SET PhuCap = PhuCap + 1`, cả `handleRun` và `handleGrade` trả 422 blocked, nêu ROLLBACK và hệ thống quản lý giao dịch; số lần gọi runner đều bằng 0. Các biến thể `0x123SAVE` và `0XAb12rOlLbAcK` cũng bị block. |
| **P2 — URL parser làm dev handler reject** | **Đóng ở request handler.** Lỗi URL được đổi thành 400 và return trước DB action. | Bundle chính dev source trong bộ nhớ, thay HTTP/config/runner/exercises bằng fake, không mở socket hoặc đọc cấu hình thật. Target `//[`, `//%`, `http://[` với headers rỗng đều resolve thành 400 `{ok:false,kind:'bad-request'}`, có CORS `http://localhost:4321`, runnerCalls=0. Request preview hợp lệ tiếp theo trả 200, runnerCalls tổng cộng=1. |

## Regression và test

Không tìm thấy regression bảo mật có thể hành động do hai bản sửa trong phạm vi này. Nhánh binary được đặt trước nhánh số/identifier nhưng không tách giữa identifier bắt đầu hợp lệ: probe `Binary0x1ROLLBACK`, `é0x1COMMIT`, `@hex0x1SAVE` vẫn qua guard. Literal binary hoàn chỉnh/empty `0x`, số khoa học/thập phân, nội dung literal/comment/quoted identifier chứa chuỗi giống payload vẫn qua guard. Catch URL dùng `send` hiện có nên giữ CORS/JSON, không đổi auth, bind hoặc cấu hình production.

| Phép kiểm reviewer tự chạy | Kết quả |
|---|---|
| `npm test -- --run tests/sql-guard.test.ts tests/api-core.test.ts tests/api-routes.test.ts tests/api-preview.test.ts` | **37/37 pass**, 4 file; gồm cả fake run và grade zero DB calls, lỗi raw target và request kế tiếp, các kiểm auth/limiter/preview trước đó. |
| `npm --prefix api run typecheck` | **Pass**, `tsc -p tsconfig.json`, không emit. |
| Probe riêng bằng Node v24.18.1/esbuild `write:false` | Đúng kết quả P1/P2 trong bảng; literal/identifier hợp lệ không bị block nhầm ở các case đã nêu. |

## Giới hạn

Chỉ ghi report mới này; không sửa source/test/docs/Git và không đọc nhận xét của reviewer khác. Không mở `.env`/secret, không chạy API/runner thật, không SQL live hoặc transaction escape trên database dùng chung. Bởi vậy việc đóng P1 dựa trên chặn input trước runner với fake, không phải thử persistence thật; đóng P2 dựa trên request handler fake, không phải gây lỗi trên process API thật. Không kiểm lại 63 đáp án, `check:data`, browser/UI hay toàn bộ repository. Hai finding gốc đã được xử lý ở phiên bản ghi trên; kết luận này không thay thế kiểm tích hợp và không cấp quyền push/deploy.
