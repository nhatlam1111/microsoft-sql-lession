# 16. Dữ liệu và hợp đồng API đề xuất

Đây là thiết kế mới cho MVP, không phải API đã thu từ CodeSignal hoặc đã có trong repo. Giữ API cũ `ping/run/grade` và `Exercise/PublicExercise/RunResponse/GradeResponse` hiện tại. Thêm mô hình riêng, không sửa YAML bài học hoặc progress v1. [R-05–R-07]

## 1. Entity tối thiểu

| Entity | Trường và ràng buộc cốt lõi | Nơi lưu |
|---|---|---|
| World | `id`, title, ordered challenge IDs, prerequisite IDs | Public catalog sinh lúc build |
| PublicChallenge | `id`, `version`, world/order/title, lesson IDs, statement, starter, schema, expected columns, `ordered`, result policy, visible scenario metadata/data | Public, không reference SQL/hidden IDs |
| PrivateChallengeVersion | Khớp ID/version/digest catalog, engine/collation/policy version, visible/hidden fixture và golden expected | Private release bundle; immutable |
| Scenario | ID nội bộ, visibility, fixture digest, expected shape, mutant evidence | Hidden chỉ private; public chỉ visible projection |
| Job | random ID, mode run/submit, challenge/version, SQL hash/snapshot, code scope hash, token hash, idempotency key/hash, state, timestamps/expiry, sanitized result | Private job store, TTL 24h |
| SlotLease | slot ID, job ID, fencing token, expiry/health | Coordinator private, một lease hợp lệ/slot |
| LocalArcadeProgress | schemaVersion, completed challenge/version set, unlocked IDs, last opened | Browser namespace riêng; JSON export/import |
| Draft | challenge ID + version, SQL, updatedAt | Browser; không đưa vào progress v1 |

Submission là Job mode `submit`; chưa cần bảng lịch sử submissions vĩnh viễn. Reward MVP là XP tính từ completion set; không có Wallet/Unlock/Achievement entity server. Khi cần quyền reveal đáng tin phải thiết kế thêm sau DEC-01/03, không giả định local progress có authority.

Public schema tối thiểu gồm tên bảng/cột, SQL type/nullability và quan hệ cần hiểu. Hidden dùng cùng schema; dữ liệu khác. `expectedColumns` là thứ tự tiêu đề hướng dẫn, không phải yêu cầu alias trong MVP. Type family và row-order policy nằm trong version; không suy từ query do người học gửi.

## 2. API tạo job và đọc kết quả

Đường dẫn dưới đây nằm sau base API hiện có, có prefix `arcade/`. CORS allowlist chỉ site khóa học và localhost phát triển đã cấu hình; không dùng CORS làm cơ chế auth. `x-access-code` kiểm quyền dùng runner; token job gửi header `x-arcade-job-token`, không URL.

| Endpoint | Request | Success | Errors chính |
|---|---|---|---|
| `GET /arcade/catalog.json` | Không SQL/token; có thể là static file trong site | Public worlds/challenges/version | Catalog build lỗi thì không phát hành |
| `POST /arcade/runs` | Body phía dưới; `x-access-code`, `Idempotency-Key` | 202 job queued hoặc replay job cũ | 400 body, 401 code, 404 challenge, 409 version/key conflict, 422 policy, 429 quota |
| `POST /arcade/submissions` | Cùng body/header, mode do route định | 202, chạy toàn suite | Như runs; không nhận client verdict/pass list |
| `GET /arcade/jobs/{jobId}` | Code và job token | 200 state + result khi terminal | 401 code; 404 cho ID không có/đã purge hoặc token sai; 410 token hợp lệ expired khi còn record; 429 poll quota |

Request:

```json
{"challengeId":"C01","challengeVersion":1,"sql":"<T-SQL của học viên>"}
```

Admission response:

```json
{"jobId":"<random-id>","jobToken":"<secret-token>","state":"queued","expiresAt":"<ISO-UTC>","challengeVersion":1,"sqlHash":"<sha256>"}
```

Token chỉ trả qua TLS; không ghi vào analytics/log, không gắn vào liên kết. Client lưu token/last job trong sessionStorage để refresh trong phiên lấy lại được. Nháp/progress localStorage riêng. Nếu storage bị chặn, giữ trong RAM và báo giới hạn phục hồi. Server chỉ giữ hash token. Nếu retry create sau response bị mất, server trả job cũ cùng **token mới**, vô hiệu token cũ, cùng expiry ban đầu; không chạy lại.

Lookup key theo code scope + UUID; digest gồm **mode do route định**, challenge/version và SQL chỉ chuẩn hóa newline, theo 14. Cùng key Run rồi Submit trả 409; mỗi hành động mới có UUID mới. Từ phút 15 tới trước purge 24 giờ, expired token hoặc replay key đã nhận trả 410. Sau purge, GET ID cũ trả 404; POST UUID cũ không còn được nhận diện là replay, có thể tạo job mới sau admission/quota. Bảo đảm idempotency giới hạn 24 giờ; client không tự retry quá expiry. [BR-10, AC-23, AC-32]

Nếu kết quả chưa biết do mạng, tiếp tục poll/replay key cũ. Nếu đã biết terminal `service_error`, poll/key cũ không làm chạy lại; nút Thử lại tạo job/key mới do người học chọn. Không có auto retry terminal hoặc reopen job. [AC-31]

## 3. Kết quả job

`state`: `queued | running | passed | failed | timed_out | service_error`. Trạng thái terminal bất biến. `mode` xác định phạm vi test; `passed` trong run không hoàn thành challenge. `sqlHash` và version luôn đi cùng kết quả.

```json
{
  "jobId":"<random-id>","mode":"submit","state":"failed",
  "challengeId":"C01","challengeVersion":1,"sqlHash":"<sha256>",
  "visible":{"passed":2,"total":2,"tests":[
    {"id":"sample-1","status":"passed","ms":12},
    {"id":"sample-2","status":"passed","ms":11}
  ]},
  "hidden":{"passed":2,"total":3},
  "verdict":"wrong_answer","complete":false
}
```

Các số duration trong ví dụ là minh họa, không benchmark. Run result **không có trường hidden**. Mỗi visible test có thể thêm columns/expected/actual và `truncatedForDisplay`; không trả quá cap UI. Kết quả bị vượt cap chấm thì lỗi, không pass trên phần cắt. Hidden không có mảng tests, IDs, duration riêng, shape, message hoặc dữ liệu. Đánh giá tổng thời gian không dùng để tiết lộ test nào thất bại.

`verdict`: `accepted | wrong_answer | sql_error | unsupported_result_type | result_limit_exceeded | query_timeout | queue_timeout | service_error`. `complete:true` chỉ khi mode submit, state passed, verdict accepted. Error envelope tối thiểu: `{"ok":false,"kind":"...","requestId":"...","retryAfterSeconds":30}`; chỉ có retryAfter khi biết, không phản chiếu header/SQL secret.

SQL lỗi trong visible trả lỗi đã làm sạch ở visible test; hidden chỉ đóng góp tổng/verdict chung. Nếu fixture/reference không hợp lệ hoặc worker lỗi, `service_error`, không nhận làm wrong answer. Không trả partial completion khi chỉ vài scenario đạt.

## 4. Version và migration

- Public catalog và private bundle phải có cùng digest/ID/version; mismatch làm service unavailable, không fallback fixture khác. Client version cũ nếu server đã ngừng phục vụ trả 409 `version_changed` và ID/version hiện hành, không tự chấm theo bản mới.
- Local keys đề xuất: `sqlserver-course:arcade:progress:v1`, `sqlserver-course:arcade:draft:<challengeId>:<version>`; session key cho last job có tiền tố Arcade riêng. Không đọc/ghi đè khóa progress lesson hiện có.
- Completion giữ version đã đạt; XP đếm unique challenge ID. Unlocked set được giữ khi version đổi. Import validate schemaVersion/IDs/value sizes, preview thay đổi rồi merge; không nhận SQL script từ JSON progress để tự chạy.
- Chưa có migration database hay user data nào được chạy. Server persistence/identity sau này dùng entity mới; không nâng local completion thành bằng chứng đạt đáng tin.

## 5. Coin/reveal tương lai

Chưa phát hành endpoint hoặc schema wallet. Thiết kế bổ sung phải có principal server, wallet ledger, grant reveal có version, idempotency và atomic debit/grant. Không cho access code dùng chung làm chủ ví; không chốt giá từ bằng chứng lịch sử đơn lẻ. Holdout không thuộc quyền reveal. Đây là cổng quyết định, không là phần còn thiếu ngầm của MVP.
