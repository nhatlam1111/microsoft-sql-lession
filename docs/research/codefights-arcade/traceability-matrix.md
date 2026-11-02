# Traceability Matrix

Mỗi yêu cầu quan trọng truy về bằng chứng hoặc một thiết kế mới có nhãn. Nguồn không chứng minh thiết kế tương lai là nguyên bản CodeFights. Tất cả AC ở [17](17-acceptance-tests.md) là test cần chạy sau triển khai, không phải kết quả hiện tại.

| Source | Observed behavior / giới hạn | Business rule | Requirement | Proposed design / acceptance |
|---|---|---|---|---|
| H-01, H-03-M | Map và khóa theo phiên bản, guard chung chưa biết | HBR-01/02; BR-02 mới | FR-01 | Map/list, khóa hướng dẫn local, W1–W3; AC-01/10 |
| H-03-I, H-06; R-02/03 | Split workspace có thể tái dùng hình thức | BR-13/17 mới | FR-02/03/12/13 | Shared editor, schema/sample, lesson link; AC-02/12/28/30 |
| H-03-I; B-02 | Lịch sử chỉ UI; sandbox mới có visible suite | HBR-03; BR-03 mới | FR-04 | Run chỉ visible, không hoàn thành; AC-03/04 |
| U-H05; B-03 | Exact Submit cũ chưa biết; sandbox mới chia sample/hidden | BR-01/03 mới | FR-05 | Submit mọi scenario, complete chỉ all pass; AC-05/06 |
| H-03-T, H-05; U-H06/07/08 | Mua hidden có căn cứ, giá/quyền chưa biết | HBR-04; BR-07/08 mới | FR-11, FR-14 | Hoãn wallet, giữ holdout nếu reveal; AC-16/25/26/29 |
| H-07, H-06; U-H09/10 | Các loại điểm khác nhau, công thức chưa biết | HBR-05; BR-05/06 mới | FR-07 | XP cá nhân đếm unique challenge; AC-17/24 |
| R-04/14/15 | Draft/progress hiện local, chưa identity | BR-13/18 mới | FR-03/07/08/12 | Namespace riêng, completion version, export/import; AC-11/12/24/28 |
| R-04; B-03 chỉ đối chiếu UI | Kết quả phải gắn bản code đã nộp, thiết kế mới cần bảo vệ late response | BR-04/10 mới | FR-06 | SQL hash/version bất biến, nhãn bản cũ; AC-09/18 |
| R-05/07/17; D-04 | Một dataset và public answer không là hidden suite | BR-04/08/15 mới | FR-10/11 | Private bundle + digest; 2 visible/3 hidden; AC-05/13/29 |
| R-13; M-01/02/03 | Comparator hiện có giữ duplicate nhưng có giới hạn kiểu | BR-16 mới | FR-10 | Hợp đồng null/multiset/order/type riêng Arcade; AC-04/07/08/27 |
| R-08/10/11; M-04/05 | Rollback/guard/quyền script không đủ multi-user sandbox | BR-11/12/14 mới | FR-09 | Slot riêng, principal query-only, lease/fencing/reset; AC-19–22 |
| R-12 | Limiter RAM mỗi instance | BR-10 mới | FR-08/09; NFR-01/02/03/06 | Distributed quota, idempotency 24h gồm mode; terminal retry mới; AC-14/15/18/23/31/32 |
| R-19; D-01 | Curriculum và cấu trúc chủ đề, không copy đề | BR-17 mới | FR-02; NFR-05 | C01–C10 kèm bài tiền đề/mutant; AC-02 và content review |
| U-H13; B-01 | Responsive/timing lịch sử chưa xác minh | Thiết kế mới, không rule lịch sử | FR-13; NFR-04 | Danh sách thay map, keyboard/reduced motion/390–1440; AC-02/30 |
| T-01/T-02; U-T01–U-T03 | REA static partial, không backend cũ | Quy tắc confidence trong Evidence Register | Toàn bộ hồ sơ | Giữ provenance/unknown, không claim source equivalence |

Không có FR nào được gọi là đã triển khai. Các NFR còn lại: NFR-07 đi cùng FR-12/AC-28/30; NFR-08 đi cùng FR-11/AC-16/20/29. Mọi lựa chọn mới chịu DEC tương ứng tại [13](13-sql-arcade-proposal.md).
