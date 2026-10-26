# Bàn giao bài 4.1–4.3 — 26/10/2026

Đã soạn và commit local ba bài đầy đủ, mỗi bài ba bài tập, theo thiết kế được duyệt. Các branch nối tiếp; sửa cuối của 4.1 đã được chuyển sang 4.2 và 4.3 bằng merge giữa các branch bài học, không viết lại lịch sử. Gốc của lượt này là bản main 0081807; chưa push, merge main hoặc deploy.

| Bài | Branch | Nội dung |
|---|---|---|
| [4.1](../../src/content/lessons/4-1-cte-tung-buoc.mdx) | codex/lesson-4-1-full | CTE, phạm vi một câu, kiểm kết quả trung gian; ba đề |
| [4.2](../../src/content/lessons/4-2-xep-hang-row-number-rank.mdx) | codex/lesson-4-2-full | ROW_NUMBER, RANK, DENSE_RANK, đồng hạng và điểm cắt; ba đề |
| [4.3](../../src/content/lessons/4-3-luy-ke-so-thang-truoc.mdx) | codex/lesson-4-3-full | Tổng tháng, SUM OVER/ROWS, LAG, tháng thiếu và lọc sau cửa sổ; ba đề |

## Kiểm thực tế

| Lớp kiểm | Kết quả và giới hạn |
|---|---|
| Suite web | Bản cuối315/315 test,46 files, trên Node24.22.1 và Node22.23.4 (major CI22). Branch4.1 riêng308 test; branch4.2 riêng311 test. |
| Astro | 0 errors,0 warnings,3 hints nền: FormEvent hai chỗ và execCommand một chỗ. |
| Build/dist |126 trang; check:dist đạt1.929 link và scan không lộ answer trong HTML/JS/JSON. Đây là lệnh tác giả chạy, không phải reviewer đã quét toàn dist. |
| API | Build72 bài và typecheck đạt. YAML/API không đổi sau lần kiểm này; sửa cuối nằm ở MDX và hồ sơ. |
| Fixture nguồn |339 ô Result/flow,11 câu minh họa/câu kiểm khác nhau,99 cặp so với9 đề; không có ví dụ nộp nguyên vẹn giải trọn một đề. Node SQLite có adapter giới hạn N-prefix/ngày/EOMONTH; không chứng minh SQL Server. Reviewer tích hợp tự tính thuần Python trên seed, khớp số học độc lập. |
| HTML |18 payload sao chép khớp source,11 focus ngoài duy nhất, vị trí ôn đúng; không suy thành đã thử clipboard/drawer/layout. |
| SQL live | check:exercises/check:data đã thử nhưng dừng trước kết nối do thiếu cả4 biến cấu hình SQL. Chưa nghiệm thu cú pháp/type/collation/driver/chấm bài/dữ liệu live. Không thay dữ liệu dùng chung. |
| UI | Thiếu Chromium; tải shell trả file không hợp lệ. Chưa thử viewport, tab bốn cột thực tế, copy/paste, bàn phím, drawer, nháp/editor hoặc SSMS. |

Suite có notice Exercises collection như baseline. Node22 có cảnh báo EnvHttpProxyAgent của môi trường và SQLite experimental; không che thành output không cảnh báo. Logs/manifest nằm trong temp/verification/2026-10-26-4-1-4-3 của từng worktree; bản cuối ở worktree4.3.

## Hồ sơ review

| Phạm vi | Report giữ nguyên | Xử lý |
|---|---|---|
|4.1 |[Report](2026-10-26-bai-4-1.md) |[Ma trận](2026-10-26-bai-4-1-disposition.md) |
|4.2 |[Report](2026-10-26-bai-4-2.md) |[Ma trận](2026-10-26-bai-4-2-disposition.md) |
|4.3 nội dung/HTML |[Report](2026-10-26-bai-4-3.md) |[Ma trận](2026-10-26-bai-4-3-disposition.md) |
|4.3 tiền đề độc lập bổ sung |[Bản trước answer](2026-10-26-bai-4-3-premises-before-answer.md), [report sau append](2026-10-26-bai-4-3-prerequisites.md) |Snapshot821379a giữ nguyên; chỉ cho đọc answer sau khi khóa bảng suy luận |
|Tích hợp |[Report](2026-10-26-integration-4-1-4-3.md) |[Ma trận đủ7 DJ](2026-10-26-integration-4-1-4-3-disposition.md) |

Lượt nội dung4.3 đã thấy answer do tách YAML sai nên không được dùng để chứng minh tự làm trước answer. Lượt bổ sung dùng agent mới, JSON chỉ trường công khai, khóa report trước rồi mới đối chiếu YAML bằng nhiệm vụ riêng. Không xóa lỗi hoặc đổi lịch sử report. Mọi reviewer kế thừa model phiên, không override.

Report tích hợp đánh giá head b177b38. Sau report, câu kiểm đầu4.1 chỉ giữ định nghĩa CTE chọn đơn và SELECT đọc nó; kiểm tổng mới cần cả hai định nghĩa. Hướng dẫn/tự kiểm tra sửa đồng thời; câu chính, Result, flow và chín answer không đổi. Sửa này bỏ riêng cấu trúc bị đặt nghi vấn DJ1, không kết luận bản cũ lỗi hoặc bản mới đã chạy SQL Server. Tác giả kiểm lại đầy đủ suite/build/HTML/fixture sau sửa trên ba branch; không dùng reviewer đọc lại cùng diff thay cho kiểm máy.

## Các quyết định và phần còn mở

| Quyết định | Căn cứ / cái giá nếu sai |
|---|---|
| Tiếp tục native sau thiết kế đã duyệt, không hỏi lại phương thức/plan | Thiết kế được duyệt đã ghi rõ cách làm và đi tiếp. Nếu hiểu sai phạm vi, có thể khác quy trình mong muốn; mọi việc vẫn local và review được. |
| Dùng ledger/log thay script task-start/task-done của skill cloud không có executor | Giữ lệnh, output, red/green, commit và ma trận thật; thiếu tự động hóa có thể bỏ sót bookkeeping, đã đối chiếu checklist cuối. |
| Giữ model kế thừa theo AGENTS thay hướng dẫn generic chọn model khác | Yêu cầu repo rõ; các report ghi công cụ/model thực tế, không đoán tên. |
| Chỉnh mẫu kiểm CTE cần dùng sau DJ1 | Không cần giữ định nghĩa tổng khi chỉ xem đơn. Đổi quyết định ban đầu đã giữ mẫu; không giả vờ phát hiện lỗi compiler. Cần đọc đủ định nghĩa khi kiểm bước sau, đã chỉ rõ trong bài. |
| SQL live còn mở (DJ2/DJ3) | Không có kết nối được cấp; fixture không đóng loại/type/collation/dữ liệu hiện tại. Có thể còn lỗi runtime hoặc drift chưa phát hiện, không ghi phần này đạt. |
| UI còn mở (DJ4) | HTML không chứng minh tương tác; có thể còn lỗi copy/layout chưa thấy, không ghi phần này đạt. Editor/UI không đổi. |
| Scan toàn dist là kiểm tác giả (DJ5) | Lệnh check:dist thực sự đạt; reviewer chỉ kiểm mẫu riêng, không lấy uy tín reviewer thay lệnh quét. |
| Không mở thêm đo hiệu năng (DJ6) | Ngoài mục tiêu và không có lời hứa tăng tốc; nhu cầu vận hành thật cần phép đo khác. |
| Giữ học thử và tích hợp riêng (DJ7) | Reviewer tích hợp đã đọc answer; chỉ các report tiền đề đúng trình tự mới chứng minh phần học thử. Snapshot và append lưu rõ sự khác nhau. |

Không có minor tích hợp bị trì hoãn. Các giới hạn live/UI ở trên vẫn là giới hạn; bàn giao local không phải quyền push/merge/deploy.
