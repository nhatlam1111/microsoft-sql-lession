# Open Questions và quyết định chưa duyệt

Ngày chốt nghiên cứu: 02/11/2026. Các câu hỏi dưới không được “đóng” chỉ vì đã có đề xuất thay thế. `UNKNOWN` là giới hạn lịch sử; `NEEDS VALIDATION` là việc cần thử trên môi trường mới; `PENDING APPROVAL` là quyền quyết định sản phẩm/hạ tầng.

## 1. Lịch sử

| ID / feature | Câu hỏi, trạng thái | Bằng chứng hiện có và thiếu | Cách xử lý trong bộ đặc tả |
|---|---|---|---|
| U-H01 / F-02 | Ngày Databases Arcade ra mắt — UNKNOWN | H-01 chỉ có kế hoạch, D-01 là bản lưu sau | Không đặt ngày tự suy |
| U-H02 / F-03/15 | Hai sao tính thế nào, khi nào đổi luật — UNKNOWN | H-01 phát biểu launch, H-03-M chỉ ảnh | BR-02 tuần tự là đề xuất mới |
| U-H03 / F-03/14 | Coin cho bỏ qua world/bài thế nào — UNKNOWN | H-04 gián tiếp, chưa pixels | Không mặc định mọi bài chỉ tuần tự |
| U-H04 / F-07/08/09 | Run chạy sample/custom/hidden gì — UNKNOWN lịch sử | H-03-I hai nút, không recording request | B-02 không dùng để đóng; BR-03 là thiết kế |
| U-H05 / F-11/12 | Submit/partial score/điều kiện hoàn thành — UNKNOWN | H-06 ảnh score; lời kể theo thời kỳ | BR-01 yêu cầu all-tests là đề xuất |
| U-H06 / F-10 | Giá, từng test hay nhóm — UNKNOWN | H-04-F chỉ giá ví dụ gián tiếp | Không chốt giá 5.000 cho MVP |
| U-H07 / F-10/16 | Quyền xem vĩnh viễn/cross-device — UNKNOWN | H-10 là câu hỏi chưa có lời đáp | Future grant phải có scope/version rõ |
| U-H08 / F-10/17 | Reveal/hint ảnh hưởng thưởng không — UNKNOWN | Có cơ chế, không công thức | Hoãn Coin/hint; không giảm thưởng tự đặt |
| U-H09 / F-13/14/15 | XP/level/Coin/badge/rank/cap/loss formula — UNKNOWN | H-07 chỉ phát biểu loại thưởng | XP cá nhân mới không giả là sao chép công thức |
| U-H10 / F-11/14 | Replay/resubmit thưởng lại/cải thiện score — UNKNOWN | Chưa capture số dư trước/sau | BR-06 thưởng một lần là thiết kế mới |
| U-H11 / F-06/16 | Autosave/reset/đổi ngôn ngữ/saved history — UNKNOWN | H-03-I có Saved | Không hứa persistence cũ |
| U-H12 / F-05/06 | Tập ngôn ngữ, shortcut/autocomplete từng năm — UNKNOWN | Ảnh một ngôn ngữ, blog đơn nguồn | MVP T-SQL cố định, tái dùng editor |
| U-H13 / F-20 | Hover/animation/timing/responsive — UNKNOWN | Không có video tự xem/timestamp | 08/10 dùng nhãn đề xuất |
| U-H14 / F-09/11 | SQL comparator NULL/duplicate/order/precision/date/collation, isolation — UNKNOWN | D-02/03 là đề lưu, không runner | Hợp đồng mới ở 07/14 |
| U-H15 / F-01 | Ngày đóng Arcade chính thức — UNKNOWN | H-09 user report, B-08 hiện 404 | Không coi 26/11/2024 là ngày đóng |
| U-H16 / mọi feature | Backend/fixture/asset và quyền tái dùng còn gì — UNKNOWN | Không source server; MIT repo không bao mọi nội dung | Nội dung/triển khai độc lập |
| U-H17 / F-08/09 | Max tests, input custom/rate/time limits lịch sử — UNKNOWN | Có control/giới hạn ở một vài đề | Không nâng thành quota toàn hệ thống |
| U-H18 / F-16/18/19 | Profile/history/discussion/leaderboard/daily/social riêng Arcade — UNKNOWN | Nguồn nhiều mode chưa tách đủ | Ngoài MVP; không copy feature toàn nền tảng |

Để đóng câu lịch sử cần source/capture đúng phiên bản, có input/action/output/guard hoặc manual chính thức. Nếu chỉ thêm lời kể, cập nhật confidence theo claim và ghi rõ tính độc lập.

## 2. Công cụ và môi trường

| ID | Trạng thái | Việc cần có / ranh giới |
|---|---|---|
| U-T01 | UNKNOWN runtime Arcade | Không có phiên lịch sử hoạt động; web tool không mở Wayback nhưng HTTP đã lấy CDX/HTML shell Intro2017. Bundle replay 404, CDX bundle timeout; không suy archive trống |
| U-T02 | LIMITATION CDP | Chưa có endpoint được hỗ trợ; REA đã làm static artifact, không network/runtime. Không tự mở cổng debug |
| U-T03 | LIMITATION REA semantic | Bundle hiện tại graph partial với retention; HTML lịch sử không phân tích inline body và không module; không lấy absence làm kết luận |
| U-T04 | NEEDS VALIDATION sandbox MSSQL | Menu có MSSQL, nhưng chỉ chạy MySQL trong lượt này; chưa chạy correct solution/timeout/reward |
| U-T05 | NEEDS VALIDATION quyền/rollback/precision khóa học | Source/script đã kiểm, chưa SQL live hoặc Azure inventory; không hứa trạng thái production |
| U-T06 | NEEDS VALIDATION runner mới | Isolation/lease/fencing/reset/resource cap/parser/driver/collation phải qua spike và AC-19–22/27 |
| U-T07 | NEEDS VALIDATION UI mới | Wireframes chưa prototype/browser test; keyboard/viewport/accessibility chưa kiểm |

## 3. Quyết định sản phẩm và hạ tầng

DEC-01–DEC-05 có lựa chọn/tradeoff/khuyến nghị tại [13](13-sql-arcade-proposal.md). Tất cả **PENDING APPROVAL** cho triển khai, không còn mơ hồ trong phạm vi nghiên cứu: bản đặc tả đã mô tả phương án được khuyến nghị.

| ID | Việc cần chủ khóa học chốt | Mặc định đề xuất và hệ quả |
|---|---|---|
| DEC-01 | Local cá nhân hay server identity/progress | Local MVP; không ranked/coin/chứng nhận hoặc auto cross-device |
| DEC-02 | Hosting/cost/slot/quota và vận hành sandbox riêng | Hai slot đề xuất, spike trước mua/tạo tài nguyên; không dùng HRM_Demo chung |
| DEC-03 | Có Coin/reveal/hint hay không | Hoãn; nếu bật cần identity/ledger/grant/giá/holdout riêng |
| DEC-04 | Query-only hay DML | SELECT trước, không chạy câu ghi trong mode mới |
| DEC-05 | Brief 10 bài và thời gian biên soạn | Nội dung mới theo 2.1–2.6, không sao chép CodeSignal |

Không yêu cầu người dùng cung cấp lại dữ kiện có trong repo. Những mục trên là quyết định hoặc điều chưa thể kiểm, không phải thông tin tác giả quên đọc. Review và ma trận xử lý ở [validation.md](validation.md).
