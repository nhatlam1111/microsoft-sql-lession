# 15. Đặc tả chức năng đề xuất

**RECOMMENDATION cho MVP chờ duyệt DEC-01/02/04/05.** Actor chính là học viên có mã truy cập khóa học. Vai trò tác giả chuẩn bị bundle qua pipeline private, không có authoring UI trong MVP. Luật BR ở [06](06-business-rules.md), data/API tại [16](16-data-and-api-design.md), acceptance tại [17](17-acceptance-tests.md).

## 1. Yêu cầu chức năng

| ID / ưu tiên | Actor, tiền đề | Main flow / output | Alternative và business rule | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| FR-01 / P0 Map và danh sách | Học viên, catalog hợp lệ | Chọn world/challenge, thấy trạng thái và bài tiền đề | Storage chưa có dùng tiến độ rỗng; khóa cá nhân BR-02 | AC-01, AC-10; map/list cùng dữ liệu |
| FR-02 / P0 Chi tiết và schema | Học viên mở challenge | Đọc yêu cầu cột/order, schema và sample trước soạn code | Version không tồn tại báo không tìm thấy, không dùng đề khác | AC-02, AC-13; không lộ hidden |
| FR-03 / P0 Editor/nháp | Có public challenge version | Soạn T-SQL, lưu nháp riêng, reset starter có bảo vệ | Storage lỗi vẫn soạn được và báo không lưu; không ghi v1 | AC-11, AC-12, AC-28 |
| FR-04 / P0 Run Tests | Có code hợp lệ và access code | Snapshot SQL/version, chạy visible suite, xem từng kết quả | Sai auth/policy/quota giữ nháp; Run không complete BR-03 | AC-03, AC-04, AC-14, AC-15 |
| FR-05 / P0 Submit | Có code, không cần Run trước | Chạy cả suite, trả verdict và hidden tổng | Visible đạt/hidden trượt chưa complete; service error riêng | AC-05–AC-08, AC-16 |
| FR-06 / P0 Phản hồi đúng snapshot | Job/version/hash có định danh | Trạng thái queued/running/terminal rõ; kết quả gắn code đã gửi | Sửa trong khi chạy đánh dấu kết quả bản cũ, không chấm code mới | AC-09, AC-18 |
| FR-07 / P0 Tiến độ và XP cá nhân | Submit đạt | Thêm completion/version, mở bài kế, tính XP lần đầu | Replay không thưởng thêm; local sửa được, không chứng nhận | AC-10, AC-17, AC-24 |
| FR-08 / P0 Khôi phục mạng | Có job/key còn hạn | Poll/retry cùng hành động; refresh tiếp tục được | Hết token/record theo 16; terminal service error chỉ chạy mới do người học chọn | AC-11, AC-14, AC-23, AC-31, AC-32 |
| FR-09 / P0 An toàn query và dữ liệu | Code vào server admission | Policy query-only + principal giới hạn + slot riêng | Chặn DML/admin/external; timeout/quarantine; BR-11/12/14 | AC-19–AC-22 |
| FR-10 / P0 Bộ chấm nhiều scenario | Private version đã kiểm | So result theo policy, giữ duplicate/order/null | Type ngoài MVP hoặc cap lỗi rõ, không chấm dữ liệu cắt | AC-04–AC-08, AC-27 |
| FR-11 / P0 Ranh giới hidden | Có Run/Submit/build/log | Chỉ public sample ra client; hidden tổng | Hidden error làm sạch, không leak qua source map/log/API | AC-16, AC-20, AC-29 |
| FR-12 / P0 Learning compatibility | Học viên dùng bài cũ | Route, draft/progress/export v1, API cũ giữ nguyên | Arcade tắt/bị lỗi không làm hỏng Learning | AC-28, AC-30 |
| FR-13 / P0 Tiếp cận/di động | Học viên dùng phím hoặc màn nhỏ | Danh sách thay map, nhãn trạng thái, vùng cuộn/tab hợp lý | Reduced motion, không yêu cầu màu/hover để làm bài | AC-02, AC-30 |
| FR-14 / P2 Coin/reveal tương lai | Chỉ khi DEC-03 và identity được duyệt | Reveal được phép, holdout vẫn kín | MVP không tạo wallet/API giả; thiếu Coin không debit, retry nguyên tử | AC-25/26 có điều kiện, chưa phải test MVP |

## 2. Non-functional requirements

| ID | Yêu cầu có thể kiểm | Giới hạn hiện tại |
|---|---|---|
| NFR-01 Hiệu năng | Budget 07/14 được enforce; queued/running phân biệt; đo p50/p95 ở pilot | Không có benchmark hoặc SLA cold start được xác nhận |
| NFR-02 An ninh | No admin user cho query; không read/write cross-job; hidden leak scan và malformed SQL tests | Parser/cap/container policy cần spike trước rollout |
| NFR-03 Tin cậy | Idempotent job; cleanup xác nhận; service error không complete/trừ thưởng | Không hứa exactly-once execution khi mất process; verdict/reward phải idempotent |
| NFR-04 Accessibility | Toàn flow bằng bàn phím; nhãn text; live status; bảng đọc được ở 390 và 1440 px | Chưa kiểm UI mới; mục tiêu WCAG 2.2 AA, không tự tuyên bố chứng nhận |
| NFR-05 Bảo trì | Challenge ID/version ổn định; public/private schema validation; test oracle có mutant evidence | Không copy pipeline bài cũ nếu nó public hóa fixture mới |
| NFR-06 Mở rộng | Distributed admission trước thêm slot/instance; không phụ thuộc limiter RAM | Mức đồng thời chưa đo, scale cần ngân sách duyệt |
| NFR-07 Tương thích | Không đổi progress/API bài cũ; lỗi Arcade cô lập bằng flag/route | Không tự migration dữ liệu học viên cũ |
| NFR-08 Quyền riêng tư | Dữ liệu giả, log tối thiểu, token không URL/log; job payload TTL 24h | Chưa tạo tài khoản/thu hồ sơ học viên |

## 3. Điều kiện phát hành nội dung

Tác giả cung cấp cho mỗi challenge: mục tiêu, lesson tiền đề cụ thể, statement tự soạn, schema/types/collation, tiêu chí columns/order/types, starter, 2 visible và 3 hidden, reference/golden result theo version, ba mutant tối thiểu tương ứng các bẫy. Reviewer học thử từ Excel cơ bản, không dùng đáp án bù kiến thức chưa dạy. Kiểm SQL riêng trên sandbox mới; không lấy pass unit test làm bằng chứng quyền/rollback live.

Không phát hành challenge khi reference không ổn định do tie, có dataset đòi kỹ thuật chưa được dạy hoặc hidden chứa bí mật/PII thật. Kết quả QA tách nguồn, build, browser, SQL live và phần chưa kiểm theo quy ước repo.
