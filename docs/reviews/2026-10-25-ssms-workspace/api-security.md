# Review độc lập API và an toàn SQL — SSMS workspace

## Phạm vi, phiên bản và cách kiểm

- Lượt review mới, kế thừa model Codex của phiên, không đổi model, không tạo reviewer khác; không đọc nhận xét của các agent khác.
- Checkout `E:\Projects\SQL Lession`, nhánh `codex/ssms-exercise-workspace`, HEAD/base `19170bc4428d21715ba42b3fa0416c06148280a4`. Review các thay đổi chưa commit được giao ngày 25/10/2026, đối chiếu `git diff 19170bc` và đọc riêng file mới. Các phép kiểm dưới đây chạy khoảng 17:47–17:52 +07.
- Phạm vi đã đọc đủ: `api/build.mjs`, `api/src/core.ts`, `index.ts`, `dev-server.ts`, `dev-options.ts`, `table-preview.ts`, `sql-raw.d.ts`, `src/lib/sql-guard.ts`, `exercise-types.ts`, `tests/api-preview.test.ts`, `api-routes.test.ts` (test cấu hình dev nằm trong file này), `api-core.test.ts`, `sql-guard.test.ts`. Đọc thêm runner/shape/limiter và parser schema để kiểm các lời hứa được tái sử dụng, không coi code cũ ngoài diff là thay đổi của Task 1.
- Đọc AGENTS, quy ước 4.5/4.6/5, template, hồ sơ công ty, mẫu 1.1 và spec/plan `2026-10-25-ssms-exercise-workspace`. Không review giao diện/editor đang ghép.
- Công cụ thực tế: PowerShell, Git chỉ đọc, Node v24.18.1, Vitest v3.2.7, TypeScript, esbuild dùng `write:false` để chạy core/dev handler trong bộ nhớ với fake dependencies. Chỉ ghi file report này; không sửa source/test/docs/Git, không mở `.env`/secret, không kết nối database hoặc khởi động API/runner thật.
- Artifact API được giao: `api/dist/index.js` và `dev-server.js` mtime 17:44:39; đã xem đoạn guard/preview/route có trong bundle. Không rebuild artifact trong lượt này. Build pass là thông tin người giao cung cấp; typecheck và test dưới đây do reviewer tự chạy.
- Mốc source quan trọng tại 17:49:40 +07, SHA256: `sql-guard.ts` = `0AF4C5D8EF4982B61E6B4373EE148027A25AC9500A67EF1D4399CF3DB72E9CD5`; `dev-server.ts` = `599EA0C5A36F2D5BDB24296B715E71AFF8389E2293A15F878C2AAAD02E5FFE4D`; `core.ts` = `ABCED28DD2493DF8C36CC6D36231E1D452F14920B69C7B27A3B2696DE774B898`.

## Findings cần sửa

### [P1] Tokenize literal nhị phân trước identifier để không giấu ROLLBACK

- **Vị trí:** [src/lib/sql-guard.ts:22](<E:/Projects/SQL Lession/src/lib/sql-guard.ts:22>), regex `TOKENS` mới; tác động cả `handleRun` và `handleGrade`.
- **Đánh giá:** Cần sửa; ảnh hưởng trực tiếp hàng rào chặn điều khiển giao dịch, trái quyết định phải chặn `ROLLBACK` trước runner.
- **Bằng chứng tự kiểm:** `guardExercise('SELECT 0x1ROLLBACK')` trả `{ok:true}`. Với chuỗi `SELECT 0x1ROLLBACK UPDATE BangLuong SET PhuCap = PhuCap + 1`, guard cũng trả `{ok:true}`; gọi core bằng `Deps.run` giả ghi lại input cho thấy cả run và grade đều chuyển nguyên chuỗi này đến runner. Fake trả outcome một statement thì run/grade trả HTTP 200; grade còn gọi thêm answer giả. Không có SQL thật nào được thực thi.
- **Nguyên nhân:** Nhánh số mới chỉ nhận số thập phân/khoa học. Nó tách `0x1ROLLBACK` thành `0` và identifier `x1ROLLBACK`; vì vậy không tạo token `rollback`. Ở ranh giới literal nhị phân T-SQL `0x1`, chữ `R` không thuộc các chữ số hex và bắt đầu lệnh kế tiếp. `SELECT 0x123SAVE TRAN marker` cũng qua guard, cho thấy không chỉ một từ bị ảnh hưởng.
- **Hậu quả:** Nếu batch chứa `ROLLBACK` rồi một câu ghi, giao dịch do runner mở có thể đã kết thúc trước câu ghi đó. Kiểm `@@TRANCOUNT`, số statement và `finally rollback` đều diễn ra sau khi main batch đã chạy, nên không thay thế được việc từ chối input trước runner. Đây là đường có nguy cơ phá lời hứa luôn hoàn tác; chưa xác minh thực thi SQL thật theo giới hạn của gói review.
- **Xác nhận regression:** Dùng `git show 19170bc:src/lib/sql-guard.ts`, transform trong bộ nhớ rồi gọi đúng chuỗi trên: bản base trả `{ok:false, reason:'Lệnh ROLLBACK không dùng được trong bài tập.'}`. Bản source được giao lại cho qua.
- **Đề xuất:** Nhận diện literal nhị phân `0x…` trước identifier, giữ ranh giới từ khóa thật; thêm RED→GREEN test guard và fake core cho `0x1ROLLBACK`, biến thể hoa thường, `0x…SAVE` và batch có câu ghi phía sau. Giữ các test identifier hợp lệ như `Ma1ROLLBACK`, literal/comment/quoted identifier, số thập phân và khoa học. Không kiểm transaction escape trên DB dùng chung.

### [P2] Bắt lỗi request target sai định dạng trong dev server

- **Vị trí:** [api/src/dev-server.ts:32](<E:/Projects/SQL Lession/api/src/dev-server.ts:32>), `new URL(req.url ?? '/', 'http://127.0.0.1')` chạy ngoài `try/catch` và trước xác thực.
- **Đánh giá:** Cần sửa; request HTTP thô không có mã vẫn có thể làm request listener reject.
- **Bằng chứng tự kiểm:** Bundle chính `dev-server.ts` trong bộ nhớ, thay `node:http` bằng fake ghi lại handler, thay runner/local-config/exercises bằng stub, không listen socket và không đọc cấu hình thật. Gọi handler với `{method:'GET', url:'//[', headers:{}}` hoặc `url:'//%'` đều reject `TypeError: Invalid URL`; fake response không nhận `writeHead` nào. `/unknown` trả 404 bình thường. Pure `new URL` với các target trên cũng ném cùng lỗi.
- **Nguyên nhân/hậu quả:** Request target `//[` là đường dẫn HTTP thô có thể đi vào `req.url`, nhưng `new URL` hiểu tiền tố `//` như authority và cố parse host. `createServer(async ...)` không có catch để đổi lỗi này thành response; trong Node chạy mặc định, rejected promise không được xử lý có nguy cơ kết thúc process dev. Đã chứng minh handler reject/no-response bằng fake; chưa khởi động process API thật để quan sát crash.
- **Đề xuất:** Parse request target trong nhánh được bảo vệ, trả 400 có CORS khi URL không hợp lệ, và bảo đảm request listener không để lỗi parse thoát thành unhandled rejection. Thêm test raw target lỗi vào harness dev route, xác nhận không gọi runner và handler vẫn xử lý request kế tiếp. Giữ bind `127.0.0.1` và auth hiện tại.

## Phần giữ được và bằng chứng đạt

- `prepareTablePreview` chỉ nhận đúng một `table` và một `page`, từ chối field khác/duplicate; whitelist đúng bảy tên canonical, dùng Map nên các tên như `__proto__`/`constructor` không mở đường truy cập khác.
- SQL preview là một SELECT do server dựng, explicit columns từ `parseSchema`, tên identifier được quote, `ORDER BY` toàn bộ PK, offset đã chuyển thành số nguyên an toàn và bị chặn trên `2147483647`, fetch 51 rồi trả 50. Không có input SQL/cột/order từ request đi vào câu lệnh.
- Fake tests đã kiểm cả PK ghép `BangLuong` và `ChamCong`, offset lớn nhất hợp lệ, page cuối/đúng 50/ít hơn 50/rỗng, `hasMore`, mọi tên bảng hợp lệ và các tên chèn SQL không hợp lệ.
- Preview dùng cùng danh sách access code và cùng instance limiter 30/phút với run. Mã sai bị từ chối trước limiter/runner; production vẫn dùng `ACCESS_CODES ?? ''`, không nhận mã mặc định dev. Auth của run/grade không được nới trong diff.
- SQL error/null shape/multiple affected sets được đổi thành unavailable; timeout/quota/unavailable giữ kind hiện có; exception từ fake runner bị catch, không lộ diagnostic riêng. Cell conversion, request timeout và `finally rollback` được reuse qua runner hiện có; xác nhận bằng đọc source, chưa xác minh driver thật.
- Guard giữ 4000 ký tự, từ chối semicolon phân tách statement và nhận diện transaction commands thông thường, số thập phân/khoa học dính từ khóa, bare CR, nested comments. Literal/comment/quoted names, identifier có chữ số hoặc Unicode trong các case được thử không bị block nhầm. Finding P1 là khoảng trống riêng chưa được các test này phủ.
- `TablePreviewResponse` export khớp spec (kể cả `pageSize:50`); `isBlockedCompletionKeyword` export dùng cùng Set unconditional commands với guard, không ẩn SELECT/CASE/SET/INTO theo test.
- Dev options kiểm port 1–65535, HTTP(S) origin chỉ localhost/127.0.0.1 không credentials/path/query/hash; cấu hình được kiểm trước khi tạo runner. Bind là `127.0.0.1`, startup không in access code. Test route đã đối chiếu default và custom port/origin; production route không import dev options/local config.
- Schema SQL được import ở module preview phía API bằng text loader rồi chỉ đưa vào `parseSchema`; không có nhánh execute seed trong module mới. Import graph mới không đưa module API này vào client. Chưa xác minh bundle browser cuối cùng đang được tích hợp; script download đã tồn tại trong khóa học là đường riêng ngoài diff Task 1.

## Kết quả kiểm do reviewer thực hiện

| Phép kiểm | Kết quả |
|---|---|
| `npm test -- --run tests/sql-guard.test.ts tests/api-core.test.ts tests/api-preview.test.ts tests/api-routes.test.ts` | 4 file, 32/32 test pass, không dùng SQL live |
| `npm --prefix api run typecheck` | Pass, `tsc -p tsconfig.json`, không emit |
| Probe guard + fake run/grade, bundle trong bộ nhớ | Tái hiện P1; source base chặn cùng input |
| Probe dev handler với fake HTTP/runner/config | Tái hiện P2, malformed targets reject và chưa gửi response |

Các test hiện có đạt không bác bỏ hai probe bổ sung nêu trên. Không dùng nhãn Ready để thay bằng chứng.

## Giới hạn và kết luận

Còn hai lỗi có thể hành động trong source được giao, ưu tiên sửa P1 trước khi dùng lại API với database. Reviewer không đọc trực tiếp seed/secret, không chạy API thật, runner thật, SQL live, 63 đáp án hoặc `check:data`; vì vậy không xác nhận driver conversion, giao dịch thật, dữ liệu không đổi, paging trên dữ liệu thật hay quyền SQL production. Không review tương tác UI, CORS trong browser thật, build frontend cuối cùng hoặc thao tác bàn phím/editor. Không tự sửa sản phẩm và không có thao tác Git ghi/push/deploy. Tác giả cần xử lý từng finding và cập nhật spec/plan theo mục 4.6; report này giữ kết quả độc lập của phiên bản đã ghi ở trên.
