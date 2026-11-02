# 12. Đối chiếu Arcade với repo Microsoft SQL Lesson

Ngày khảo sát: **02/11/2026**. Source đối chiếu: commit `8de5a4f407ef4c0740ba571f108ecedfbed975b4`. Nguồn và giới hạn của từng ID nằm trong [Evidence Register](evidence-register.md); phần kiến trúc đề xuất ở [báo cáo 14](14-technical-architecture.md).

`CONFIRMED` đối với evidence `R-*` chỉ xác nhận điều nhìn thấy trong source tại commit trên. Khảo sát này không xác nhận commit đang deploy, quyền SQL hiệu lực, collation database, số người dùng đồng thời hoặc kết quả SQL live.

## 1. Hiện trạng đã đối chiếu với source

- **50 bài MDX:** 31 bài `full`, 19 bài `summary`; **25 file YAML, 76 bài tập**, gồm 74 `query` và 2 `change`. Số liệu được đếm bằng parse frontmatter/YAML, không lấy số trang web hay số dòng database làm đại diện. [R-18]
- Frontend Astro 5, React 19; route bài tập sinh tĩnh từ YAML dưới `/bai/<slug>/bai-tap/<n>/`. Đề ở trái, editor/kết quả ở phải. [R-01, R-02]
- Đã có editor T-SQL, nháp riêng từng bài, Chạy/Nộp bài, Results/Messages, SQL guard, comparator, API Azure Functions, rollback và sơ đồ database. [R-03–R-13, R-16]
- Tiến độ và nháp lưu trong trình duyệt. API hiện đăng ký ba đầu gọi `ping`, `run`, `grade`; chưa thấy entity/API cho world, scenario, submission history, learner identity, wallet hoặc reward trong phạm vi source được khảo sát. [R-04, R-06, R-14, R-15, R-20]

Không coi mọi khả năng đang có là cần thay thế. Phần thiếu chủ yếu là nhiều scenario độc lập, private fixture boundary và tiến độ Arcade đủ tin cậy cho mở khóa/phần thưởng.

## 2. Ma trận Gap Analysis

**P0:** cần cho MVP chạy/chấm đúng và giữ tương thích. **P1:** mở rộng sau vòng cốt lõi. **P2:** ngoài MVP. Mọi dòng khuyến nghị là thiết kế mới, chưa phải quyết định triển khai.

| Feature | Original Behavior | Existing Implementation | Missing Capability | Classification | Recommendation | Priority |
|---|---|---|---|---|---|---|
| Học bài hiện tại | Arcade là chế độ luyện; không có căn cứ để thay bài học hiện có bằng map. [H-01] | 50 bài, catalog, menu, mindmap và prerequisite metadata. [R-01, R-18, R-19] | Điểm vào Arcade và liên kết về bài tiền đề | REUSE | Giữ Learning Mode, route và nội dung; thêm lối sang luyện theo chủ đề | P0 |
| World/challenge map | Bản launch 2016 có các địa điểm theo chủ đề và mở dần map. Luật launch không tự áp cho Databases về sau. [H-01] | Mindmap kiến thức hiện tại không phải graph mở khóa challenge. [R-20] | World, challenge node, available/locked/completed | NEW | Tạo graph luyện riêng; tái dùng token và thành phần điều hướng thích hợp | P0 |
| Workspace chia vùng | Ảnh 2017 cho thấy vùng đề, editor và tests; không chứng minh mọi năm có cùng bố cục. [H-03] | Trang hai cột, đề trái/workspace phải. [R-02] | Test list và trạng thái từng scenario | EXTEND | Dùng shared shell phù hợp; giữ trang bài tập cũ hoạt động | P0 |
| Editor SQL | Workspace lập trình cũ có editor; bộ phím/autocomplete của SQL cũ chưa xác minh đầy đủ. [H-03] | Textarea phủ lớp highlight T-SQL, F5/Ctrl+Enter, Tab. [R-03] | Không bắt buộc có editor engine mới | REUSE | Giữ editor cho MVP; không thêm nhiều ngôn ngữ chỉ vì Arcade tổng quát có | P0 |
| Nháp và starter/reset | Cơ chế autosave/reset Arcade SQL cũ chưa đủ bằng chứng | Nháp localStorage theo ID; mở nháp hoặc editor rỗng. [R-04] | Starter/reset theo challenge và cảnh báo mất nháp | EXTEND | Namespace Arcade riêng, reset có xác nhận và giữ tương thích nháp cũ | P1 |
| Schema/dữ liệu mẫu | Cách SQL cũ trình bày bảng và grader phải đối chiếu riêng; không suy từ sandbox hiện tại | ERD sinh từ CREATE TABLE của HRM tại build. [R-16] | Schema/sample data gắn challenge và visible scenario | EXTEND | Tách metadata công khai khỏi dữ liệu test ẩn; không đưa hidden fixture vào ERD frontend | P0 |
| Chạy thử | Ảnh cũ có Run Tests. Tập test nào chạy cho SQL cũ vẫn `UNKNOWN`. [H-03] | Run chạy một câu SQL trên một dataset, trả result/error. [R-07] | Run Tests nhiều visible scenario và verdict theo scenario | EXTEND | Thêm hợp đồng Arcade riêng; giữ nghĩa `run` hiện hành | P0 |
| Nộp bài | Ảnh cũ có Submit; thuật toán SQL backend lịch sử `UNKNOWN`. [H-03] | Grade chạy learner và answer trên dataset hiện có rồi so kết quả. [R-07] | Full suite, tổng hợp pass/fail và service-error | EXTEND | Chấm visible + hidden suite; phân biệt sai bài với lỗi hạ tầng | P0 |
| Nhiều test scenario | Hidden tests có dấu vết lịch sử; cấu trúc fixture SQL backend không được phục hồi. [H-04] | Exercise chỉ có một `answer`, optional `check`; runner không nhận scenario. [R-05, R-08] | Scenario definition, fixture lifecycle, comparator policy | NEW | Server chọn scenario có version; không nhận fixture/expected từ client | P0 |
| Bảo vệ hidden tests | Không biết backend lịch sử bảo vệ bằng cách nào | Frontend projection bỏ answer/check; repo public vẫn chứa YAML đáp án và seed. [R-17] | Private fixture/reference boundary trước người đọc repo và SQL người học | NEW | Giữ quyết định cũ cho Learning Mode; fixture Arcade mới nằm ngoài public source/build | P0 |
| So kết quả | Chi tiết NULL, duplicate, order, precision của SQL Arcade cũ `UNKNOWN` | Comparator giá trị có ordered/unordered và DML check. [R-13] | Hợp đồng kiểu biên và test nhiều dataset | EXTEND | Dùng hành vi phù hợp đã có; khóa rõ semantics ở đặc tả mới | P0 |
| SQL guard/quyền | Không biết triển khai lịch sử | Guard chung nhận SELECT/WITH/INSERT/UPDATE/DELETE; script grant trên bảy bảng. [R-10, R-11] | Query-only policy và quyền theo phạm vi scenario | EXTEND | MVP query-only cần kiểm server và credential phù hợp; guard không thay least privilege | P0 |
| Timeout/rollback | Không có bằng chứng để tái tạo backend Arcade cũ | Transaction/run và rollback; request/lock/row limits. [R-08, R-09] | Budget toàn suite, cancellation và cleanup có thể kiểm chứng | EXTEND | Giữ rollback; thêm giới hạn và kết quả lỗi cho cả submission | P0 |
| Đồng thời/cô lập | Isolation và scheduling lịch sử `UNKNOWN` | Pool max 4 mỗi instance; chưa có admission/queue scenario. [R-09] | Cô lập fixture/job và chặn quá tải toàn dịch vụ | NEW | Thẩm định runner cô lập, budget và admission trước rollout | P0 |
| Access/identity | Cách account xác thực SQL grader cũ chưa phục hồi | Allowlist x-access-code; không có learner principal trong request model. [R-06, R-20] | Identity/ownership đủ cho server progress/reward | NEEDS INVESTIGATION | Chọn identity rõ trước khi gắn access code với Coin hoặc thành tích đáng tin | P0 |
| Tiến độ địa phương | Map có tiến trình mở khóa; chưa biết đầy đủ luật lưu mọi phiên bản. [H-01] | Progress v1, import/export JSON, localStorage, đồng bộ snapshot giữa tab. [R-14, R-15] | Mapping Arcade và tránh xung đột namespace | REUSE | Giữ tiến độ bài học; không coi import JSON cũ là bằng chứng đã vượt hidden suite | P0 |
| Server progress/submission | Backend account/progress lịch sử không phục hồi | Không có endpoint/entity tương ứng trong source đã khảo sát. [R-20] | Submission record, completion authority, cross-session recovery | NEW | Server quyết định completion nếu MVP dùng mở khóa/thưởng đáng tin | P0 |
| XP/điểm hoàn thành | Có cơ chế thưởng theo tư liệu lịch sử; công thức chưa đủ để chép nguyên. [H-01, H-04] | Chưa có reward model. [R-20] | Quy tắc thưởng một lần và phân biệt replay | NEW | Điểm hiển thị và ledger nếu cần phải được đặc tả riêng; không tự coi Coding Score là XP | P1 |
| Coin/reveal có phí | Tư liệu gián tiếp nhắc mở hidden test bằng Coin; chưa suy ra luật SQL hoặc mọi thời kỳ. [H-04] | Không wallet/reveal. [R-20] | Ví, debit/reveal atomic, idempotency | NOT REQUIRED | Để ngoài lõi MVP cho tới khi chủ khóa học duyệt; nếu thêm phải thiết kế server ledger | P2 |
| Leaderboard/community | Có thể tồn tại ở sản phẩm/thời kỳ khác; phạm vi Arcade cần nguồn riêng | Chưa thấy trong source đã khảo sát. [R-20] | Social/moderation/ranking | NOT REQUIRED | Không thêm vào MVP chỉ vì là dấu vết của CodeFights tổng thể | P2 |
| Chống hardcode mẫu | Không biết thuật toán lịch sử | Một dataset công khai; đúng trên nó không chứng minh đúng quy tắc tổng quát. [R-07, R-17] | Dataset phản ví dụ và private test suite | NEW | Chấm nhiều scenario khác hình mẫu; không hứa hữu hạn test chứng minh đúng mọi đầu vào | P0 |

## 3. Hợp đồng hiện tại cần giữ hoặc mở rộng có chủ đích

Các kết luận dưới đây là từ [comparator](../../../src/lib/grade.ts), [shape adapter](../../../api/src/shape.ts) và [API core](../../../api/src/core.ts), chưa phải kết quả kiểm SQL live. [R-07, R-13]

| Trường hợp | Source hiện tại xử lý | Hệ quả cho Arcade |
|---|---|---|
| NULL | `null`/`undefined` chuyển thành `null`; khác chuỗi `"NULL"` | Test NULL riêng, không thay bằng chuỗi khi vận chuyển |
| Dòng trùng | Unordered dùng Map đếm số lần xuất hiện, mỗi match trừ một | Giữ multiplicity; không biến kết quả thành set |
| Rỗng | So số cột trước số dòng | Kết quả 0 dòng chưa đủ nếu shape sai |
| Thứ tự dòng | `ordered:false` dùng multiset; `true` so theo vị trí | Đề phải chốt thứ tự và tie-break, không tự đoán từ việc câu có ORDER BY |
| Thứ tự/tên cột | Giữ thứ tự cột, không so alias | Không báo alias đúng chỉ vì `correct:true`; thêm alias policy chỉ khi challenge cần |
| Kiểu số | Chuẩn hóa khi một phía numeric; bỏ số 0 cuối và chuẩn hóa âm 0 | Đây là so giá trị, không phải bắt đúng SQL type |
| DECIMAL/MONEY | Number qua `toFixed(scale)` | Không bảo đảm mọi decimal precision; Number đã mất chữ số thì định dạng không phục hồi |
| BIGINT/FLOAT | Cell có thể là string hoặc number; chưa có tolerance riêng | Kiểm driver với số lớn; tránh float trong MVP hoặc chốt tolerance rõ |
| Date/time | Dùng UTC getters; Date object được format đến giây | Không tuyên bố giữ toàn bộ datetime2/datetimeoffset; cần hợp đồng riêng trước khi mở rộng |
| Chuỗi | So JSON chính xác, không normalize dấu/case/Unicode | Không đồng nhất comparator với SQL collation; collation DB live chưa xác minh |
| DML | So affected row count rồi kết quả `check` theo multiset | Độ phủ phụ thuộc check, không phải diff mọi object database |
| Result size | Hiện tối đa 200 dòng; learner grade tối đa 5000 dòng | Thể hiện truncation; không gọi bảng trích là toàn kết quả |

Đây là các giới hạn cần thiết kế/test thêm, không phải báo cáo lỗi production đã tái hiện. Phạm vi nghiên cứu không sửa comparator hoặc hợp đồng bài tập hiện hành.

## 4. Khoảng trống dữ liệu, bảo mật và đồng thời

`createRunner` dùng một SQL config và pool dùng lại. Learner và answer chạy qua hai transaction tuần tự, không có tham số fixture/scenario hoặc snapshot chung qua cả hai lần. Quy ước database dùng chung bất biến giúp giữ nguồn học, nhưng không tự cung cấp test isolation. [R-07–R-09]

`ROLLBACK` xử lý thay đổi lâu dài khi luồng chạy đúng; nó không tự loại blocking, CPU/I/O hoặc quyền đọc fixture khác. Script cấp quyền bảy bảng không xác nhận quyền đang có trên production. Cơ chế hidden test mới cần bảo vệ cả file fixture lẫn khả năng SQL người học truy cập bảng ngoài scenario. [R-08, R-11, R-17]

Guard chung hiện cho phép DML cả khi exercise là `query`; `kind` chưa tạo allowlist riêng. Vì vậy, query-only MVP phải có policy phía server, không chỉ đổi nhãn/nút giao diện. Các từ khóa bị chặn và transaction không thay thế được quyền SQL tối thiểu. [R-10]

Limiter 30 calls/60 giây/code chỉ nằm trong RAM từng instance; ping không gọi limiter đó. Pool max 4 cũng là giới hạn từng instance, không phải số người dùng đồng thời tối đa hoặc global admission. Chưa có bằng chứng về throughput, chi phí hay khả năng cleanup khi mất kết nối. [R-09, R-12]

Tiến độ local hiện tại phù hợp tự học và import/export. Nó chưa đủ làm authority cho Coin, leaderboard hoặc unlock bảo vệ phía server: người dùng có thể chỉnh JSON, còn snapshot giữa tab không phải giao dịch cộng thưởng. Access code chỉ là access gate trong source, chưa có lifecycle/ownership của learner account. [R-06, R-14, R-15, R-20]

## 5. Chương trình hiện có và giới hạn tái dùng

Chuỗi 2.1–2.6 đã có bài đầy đủ cho SELECT, WHERE, nhiều điều kiện, ORDER BY/TOP, NULL và DISTINCT. Đây là nền hợp lý cho khoảng 10 challenge nhập môn; bài full 3.1–4.4 làm nền cho aggregation, kết bảng, CTE và window sau đó. Không giả định bài `summary` đã dạy đủ thực hành chỉ vì metadata có tên chủ đề. [R-18, R-19]

MVP cần mỗi challenge chỉ ra bài tiền đề và phạm vi kiến thức. C01/C02 thuộc SELECT không được yêu cầu kỹ năng lọc/sort chưa học; challenge TOP cần tie-break; challenge NULL phải phân biệt NULL với chuỗi rỗng. Nội dung mới phải tự soạn theo tình huống HRM và quy ước repo, không chuyển nguyên đề/dataset CodeSignal. [R-19; RECOMMENDATION]

Spec runner cũ ghi editor mới có dòng chú thích; source hiện dùng chuỗi rỗng và placeholder, được test `exercise-workspace.test.ts` bảo vệ. Do đó lấy source và quy ước hiện hành làm căn cứ, không sao lại mô tả cũ. Quyết định Learning Mode không có gợi ý/nút đáp án vẫn giữ; reveal của Arcade là đề xuất cần duyệt riêng. [R-03, R-19]

## 6. Nguồn repo và cách kiểm

| Evidence | Nguồn đọc, dòng liên quan | Phần đã xác minh |
|---|---|---|
| R-01 | [package.json](../../../package.json), dòng 1; [astro.config.mjs](../../../astro.config.mjs), dòng 1; [content.config.ts](../../../src/content.config.ts), dòng 1 | Stack, base URL, collections |
| R-02 | [route bài tập](../../../src/pages/bai/[slug]/bai-tap/[n].astro), dòng 12/41; [exercise.css](../../../src/styles/exercise.css), dòng 8 | Static page và bố cục hai cột |
| R-03 | [SqlEditor.tsx](../../../src/components/islands/SqlEditor.tsx), dòng 12/53; [editor-keys.ts](../../../src/lib/editor-keys.ts), dòng 1 | Textarea/highlight và bàn phím trong source |
| R-04 | [exercise-storage.ts](../../../src/lib/exercise-storage.ts), dòng 3/30; [ExerciseWorkspace.tsx](../../../src/components/islands/ExerciseWorkspace.tsx), dòng 28/47 | Nháp và access-code local |
| R-05 | [exercise-types.ts](../../../src/lib/exercise-types.ts), dòng 4; [exercises.ts](../../../src/lib/exercises.ts), dòng 6/25 | Exercise schema và public projection |
| R-06 | [index.ts](../../../api/src/index.ts), dòng 20/28/36; [exercise-client.ts](../../../src/lib/exercise-client.ts), dòng 17/27 | API/header code, client timeout |
| R-07 | [core.ts](../../../api/src/core.ts), dòng 36/83/89/98 | Prepare/run/grade và comparator call |
| R-08 | [runner.ts](../../../api/src/runner.ts), dòng 28/40/50/55/77 | Transaction, session reset và finally rollback |
| R-09 | [runner.ts](../../../api/src/runner.ts), dòng 14/15/17; [core.ts](../../../api/src/core.ts), dòng 25 | Timeout/pool/row limits |
| R-10 | [sql-guard.ts](../../../src/lib/sql-guard.ts), dòng 6/7/8/66 | Guard policy |
| R-11 | [practice-user.sql](../../../database/practice-user.sql), dòng 6/8 | Script grant; không kiểm quyền live |
| R-12 | [limiter.ts](../../../api/src/limiter.ts), dòng 2; [index.ts](../../../api/src/index.ts), dòng 12 | Limiter per-instance |
| R-13 | [grade.ts](../../../src/lib/grade.ts), dòng 17/60/64/83/107; [shape.ts](../../../api/src/shape.ts), dòng 7 | Chuyển và so kết quả |
| R-14 | [progress.ts](../../../src/lib/progress.ts), dòng 6/15/49/63; [progress-store.ts](../../../src/lib/progress-store.ts), dòng 104 | Lesson/exercise completion local |
| R-15 | [progress-storage.ts](../../../src/lib/progress-storage.ts), dòng 15; [progress-store.ts](../../../src/lib/progress-store.ts), dòng 46/104; [progress.ts](../../../src/lib/progress.ts), dòng 103 | Backup, import/export và snapshot giữa tab |
| R-16 | [db-schema.ts](../../../src/lib/db-schema.ts), dòng 15; [route bài tập](../../../src/pages/bai/[slug]/bai-tap/[n].astro), dòng 10/28 | ERD từ script tại build |
| R-17 | [api/build.mjs](../../../api/build.mjs), dòng 1; [check-dist.mjs](../../../scripts/check-dist.mjs), dòng 81/158; [README](../../../README.md), dòng 144 | API packaging, frontend leak check, source public |
| R-18 | [lessons](../../../src/content/lessons/), [exercises](../../../src/content/exercises/) | Parse source đếm 50/31/19/25/76/74/2 như mục 1 |
| R-19 | [quy-uoc.md](../../quy-uoc.md), [lesson-template.md](../../lesson-template.md), [ho-so-cong-ty.md](../../ho-so-cong-ty.md), [bài 1.1](../../../src/content/lessons/1-1-database-la-gi.mdx), [bài 2.1](../../../src/content/lessons/2-1-chon-cot-dat-ten-cot.mdx) | Quy ước hiện hành và mẫu nội dung |
| R-20 | [api/src](../../../api/src/), [src/lib](../../../src/lib/) | Inventory/tìm literal entity mới; kết luận chỉ trong source đã khảo sát |

Đã đọc test source cho API, guard, comparator, nháp, progress và chống đáp án lọt build: [api-core](../../../tests/api-core.test.ts), [sql-guard](../../../tests/sql-guard.test.ts), [grade](../../../tests/grade.test.ts), [exercise-client](../../../tests/exercise-client.test.ts), [exercise-workspace](../../../tests/exercise-workspace.test.ts), [progress](../../../tests/progress.test.ts), [progress-storage](../../../tests/progress-storage.test.ts), [progress-store](../../../tests/progress-store.test.ts), [exercises](../../../tests/exercises.test.ts), [check-dist](../../../tests/check-dist.test.ts).

**Giới hạn:** người khảo sát source không chạy test/build/SQL/API; kết quả kiểm chung của bộ tài liệu được ghi riêng trong hồ sơ kiểm, không suy từ việc test tồn tại thành test đã đạt. Các khoảng trống precision, fixture isolation, reward trùng và cross-device cần acceptance scenario mới, không được tuyên bố đã có kiểm tích hợp hiện hành.
