# 17. Kịch bản nghiệm thu đề xuất

Các AC-* là **test specification cho triển khai tương lai**, chưa phải test đã chạy hoặc tính năng đã có. Kết quả kiểm bộ tài liệu hiện tại xem [validation.md](validation.md). Phạm vi đề xuất ở [13](13-sql-arcade-proposal.md), hợp đồng ở [16](16-data-and-api-design.md).

## 1. Học và chấm

| ID / yêu cầu | Given / When | Then — bằng chứng cần thu |
|---|---|---|
| AC-01 / FR-01 | Tiến độ rỗng, mở Arcade | C01 khả dụng, bài kế có lý do khóa; map/list có cùng thứ tự và trạng thái |
| AC-02 / FR-02/13 | Mở một challenge bằng bàn phím trên viewport 390 và 1440 | Đọc được bài tiền đề, schema/sample, columns/order/alias policy; không cần hover/màu; không cuộn ngang toàn trang |
| AC-03 / FR-04 | Code đúng visible, Run Tests | Hai sample đạt, chi tiết chỉ visible; chưa complete và chưa tăng XP |
| AC-04 / FR-04/10 | Code thiếu một dòng trùng, hoặc sai thứ tự cột | Fail với mẫu phân biệt; so multiset không bỏ duplicate; đổi alias đơn thuần không fail |
| AC-05 / FR-05 | Visible đạt nhưng một hidden phản ví dụ fail, Submit | Chưa complete; visible 2/2, hidden 2/3; không cấp XP/mở bài kế |
| AC-06 / FR-05/10 | Code tham chiếu tương đương, Submit trực tiếp không Run trước | Cả 5 scenario chạy/đạt, complete true; không bắt Run trước |
| AC-07 / FR-10 | NULL, chuỗi rỗng, số 0, chữ NULL; empty result có metadata | Chỉ output đúng policy đạt; không tự gom các giá trị; sai shape rỗng vẫn fail |
| AC-08 / FR-10 | TOP có đồng ngày, dữ liệu chèn đảo; ordered true | Tie-break theo đề cho kết quả ổn định; query thiếu điều kiện tie-break có phản ví dụ fail |
| AC-09 / FR-06 | Submit code A, rồi sửa code B trước khi job A xong | Result ghi hash A, có nhãn bản trước; không nhận B đã đạt; nháp B còn nguyên |
| AC-10 / FR-01/07 | Hoàn thành lần đầu C04/C07/C10 | Mở world kế/hiện world complete đúng cấu hình; XP cá nhân một lần, không bonus ẩn |

## 2. Lưu, mạng và chạy lặp

| ID / yêu cầu | Given / When | Then |
|---|---|---|
| AC-11 / FR-03/08 | Có nháp và job chạy, refresh trong thời hạn token | Nháp đúng challenge/version; poll job cũ, không tạo job mới hoặc tự Submit |
| AC-12 / FR-03 | localStorage/sessionStorage throw hoặc hết dung lượng | Vẫn làm trong RAM; thông báo không lưu/phục hồi được, không xóa dữ liệu v1 |
| AC-13 / FR-02 | Client gửi version ngừng phục vụ | 409 version_changed, giữ nháp; chỉ mở bản mới sau hành động người dùng |
| AC-14 / FR-04/08 | Mạng mất ngay sau server nhận create; gửi lại đúng key/payload | Cùng job ID, không chạy suite hai lần; token phục hồi theo 16; không ghi trượt do mạng |
| AC-15 / FR-04 | Sai code/quota/policy SQL | Error đúng loại; nháp còn; quota toàn hệ thống không vượt khi qua nhiều API instance |
| AC-16 / FR-05/11 | Hidden query lỗi có message chứa tên bảng/giá trị; Submit | Không raw error/fixture/plan trong HTTP, DOM, AX, console client hoặc source map |
| AC-17 / FR-07 | Resubmit đúng/luyện lại/hai tab cùng C01 | Tập completion không trùng; XP của C01 chỉ 10; không xóa completion cũ khi lần sau fail |
| AC-18 / FR-06 | Server nhận cùng key với SQL khác | 409 idempotency_conflict; job cũ không bị sửa; hash luôn đúng snapshot |
| AC-23 / FR-08 | Poll/replay ở phút 16, giờ 23 và sau purge giờ 25 | Trong record retention: 410 và không execution mới; sau purge GET 404, POST reuse UUID có thể là admission mới; UI không auto retry sau expiry |
| AC-24 / FR-07 | Xuất tiến độ, nhập trên browser khác; sửa JSON cá nhân | Validate/preview/merge đúng; chỉ tiến độ cá nhân; không suy thành chứng nhận/coin server |
| AC-31 / FR-08 | Job đã terminal service_error; poll/replay cũ rồi bấm Thử lại | Cũ giữ lỗi; chỉ lần bấm chủ động tạo job/key mới và chạy; không vòng auto submit |
| AC-32 / FR-04/05/08 | Dùng cùng UUID cho Run rồi Submit cùng body | 409 do mode khác; client cấp key mới cho Submit bình thường, không cần sửa SQL |

## 3. An toàn, cô lập và giới hạn

| ID / yêu cầu | Given / When | Then |
|---|---|---|
| AC-19 / FR-09 | Gửi DML/DDL/EXEC, SELECT INTO, multi-statement, cross-database và chuỗi/comment né guard | Server policy từ chối; DB principal độc lập cũng không ghi/đọc ngoài phạm vi; không dựa frontend |
| AC-20 / FR-09/11 | Hai job/worker cạnh tranh slot; query cố đọc fixture/job khác | Một lease hợp lệ, fencing bảo vệ; không đọc được dữ liệu khác; test dùng credential thực ở sandbox |
| AC-21 / FR-09 | Query vượt 5 giây, mất kết nối hoặc worker chết giữa scenario | Hủy/cleanup xác nhận hoặc quarantine; job kế không thấy dữ liệu cũ; kiểm cả lock/resource còn giữ |
| AC-22 / FR-09 | Seed/reset/digest fixture lỗi | service_error, slot cách ly; không wrong_answer; DB khóa học không bị gọi |
| AC-27 / FR-10 | Output >1.000 dòng/64 KiB, unsupported decimal/float/offset type | Lỗi giới hạn/kiểu rõ; không cắt/round rồi chấm pass; UI display cap tách cap chấm |
| AC-28 / FR-03/12 | Người học có progress/draft v1 và dùng API bài tập cũ | Không đổi dữ liệu/contract/route; bật/tắt Arcade không ảnh hưởng |
| AC-29 / FR-11 | Build public artifact, source map và cấu hình client | Scan không có reference SQL, private fixture/expected/token; đọc repo public không lấy được suite mới |
| AC-30 / FR-12/13 | Arcade lỗi/tắt; phím F5 ngoài workspace; reduced motion | Bài học vẫn dùng được, không chặn phím toàn site; không phụ thuộc animation để hiểu kết quả |

## 4. Coin có điều kiện, ngoài MVP

| ID | Tiền đề và thao tác | Then |
|---|---|---|
| AC-25 / FR-14 | DEC-01/03 chưa duyệt hoặc flag tắt | Không UI/API mua giả; không có wallet/charge |
| AC-26 / FR-14 | Sau khi module tương lai được duyệt: thiếu Coin; hai tab mua cùng reveal; retry sau mất mạng | Thiếu Coin không debit; debit/grant nguyên tử một lần; quyền đã có không mua lại; holdout không lộ |

AC-26 cần bổ sung giá/phạm vi/identity đã duyệt trước khi biến thành executable test. Trong MVP chỉ AC-25 có thể nghiệm thu theo nhánh tính năng tắt. Không ghi “đạt Coin transaction” vì chưa xây.

## 5. Hồ sơ nghiệm thu cần có sau triển khai

Mỗi test ghi commit, challenge/fixture version, môi trường, actor/credential role không secret, input chủ đích, kết quả thực tế và artifact. Unit tests không thay SQL live về quyền/reset/timeout; đọc HTML không thay kiểm bàn phím; ảnh không chứng minh request. Reviewer đọc từ nền Excel cơ bản và ghi bảng tiền đề từng challenge. Push/deploy vẫn cần chủ khóa học đồng ý theo quy ước repo.
