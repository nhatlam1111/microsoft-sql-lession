# Nghiên cứu CodeFights Arcade cho chế độ luyện SQL Server

Ngày: **02/11/2026**. Phạm vi: nghiên cứu, REA và đặc tả; **chưa triển khai SQL Arcade**. Source khóa học được đối chiếu tại commit `8de5a4f407ef4c0740ba571f108ecedfbed975b4`. Tài liệu này phân biệt hành vi lịch sử với thiết kế mới; [Evidence Register](evidence-register.md) quản lý nguồn và confidence.

## A. Arcade cũ đã hoạt động thế nào?

Có căn cứ cho map theo chủ đề, nội dung mở dần và độ khó tăng. Ảnh năm 2017 cho thấy workspace chia vùng, editor, sample/test khóa, Run Tests và Submit riêng. Cơ chế dùng Coin xem hidden tests được **STRONGLY SUPPORTED**; giá, phạm vi quyền và ảnh hưởng thưởng chưa được xác minh đầy đủ. Không có một bộ luật chung đã kiểm cho mọi năm. [01](01-historical-research.md), [05](05-feature-inventory.md)

Databases Arcade có bản lưu cộng đồng với 16 nhóm/84 mục tại một commit cụ thể; đó không phải source nền tảng. Đề/schema/mẫu trong bản lưu giúp hiểu cấu trúc sư phạm, không khôi phục comparator hay hidden dataset. [11](11-databases-arcade-analysis.md)

## B. Điều tạo hứng thú

Map và dấu mốc giúp nhìn thấy việc tiếp theo; bài ngắn và test phản hồi giúp tạo vòng thử–sửa–nộp. Đây là **diễn giải UX từ cấu trúc quan sát**, không phải nghiên cứu đo hiệu quả học tập hoặc công thức tối ưu của CodeFights. Khuyến nghị giữ nhịp tăng dần và phản hồi rõ; không cần mang mọi currency/social feature vào bản đầu.

## C. Có thể tái hiện chính xác đến đâu?

Có thể tái dựng cấu trúc workspace, map và các trạng thái nhìn thấy với confidence cao trong phạm vi ảnh. Run/Submit đã tương tác trên sandbox hiện tại, nhưng không dùng để khẳng định luật Arcade cũ. REA đã phân tích tĩnh một chunk hiện tại, có byte hash/Evidence; graph semantic còn partial. Wayback còn HTML shell Intro 2017; REA kiểm được shell nhưng chưa phân tích logic Arcade vì bundle replay không lấy được và inline chưa phân tích. Không có REA runtime capture hoặc backend lịch sử. [03](03-technical-observation.md)

## D. Điều chưa khôi phục được

Backend, grader SQL gốc, hidden fixtures, công thức XP/Coin/score, entitlement/replay reward, lịch sử thay luật, animation và responsive đầy đủ vẫn còn khoảng trống. Wayback/video/UPV có giới hạn truy cập đã ghi cụ thể; không bịa timestamp hoặc ngày đóng dịch vụ. [Open Questions](open-questions.md)

## E. Thích nghi với khóa học hiện có

Repo có editor, nháp, API Chạy/Nộp, guard, comparator, rollback, ERD và local progress để tái dùng. Phần thiếu quan trọng là nhiều dữ liệu kiểm độc lập, ranh giới private fixture và runner cô lập. Một kết quả đúng trên HRM_Demo công khai chưa chứng minh câu SQL tổng quát đúng. [12](12-repository-gap-analysis.md)

Đề xuất mode mới bên cạnh bài học: giữ Learning Mode/API/progress v1, thêm public/private challenge version và API job riêng. Chỉ SELECT ở MVP; không seed hoặc thử hidden fixture trên database khóa học dùng chung. Kiến trúc/identity/chi phí mới là đề xuất cần duyệt. [14](14-technical-architecture.md)

## F. MVP được khuyến nghị

Khoảng 10 challenge tự soạn theo bài 2.1–2.6, chia ba world, mỗi bài hai visible và ba hidden scenario; có Run Tests/Submit, lesson prerequisite, schema/sample, nháp và tiến độ cá nhân. Hoãn wallet/reveal/leaderboard/DML; XP local chỉ để tự theo dõi, không là chứng chỉ hoặc tiền. Brief từng bài, mốc spike/contract/UI/content/pilot ở [13](13-sql-arcade-proposal.md).

Nghiệm thu triển khai cần chứng minh visible-pass/hidden-fail, all-pass, duplicate/order/NULL, timeout/isolation, leak scan, retry/idempotency và tương thích bài cũ. Đây là kịch bản cần chạy sau khi xây, không phải kết quả bộ nghiên cứu đã chạy. [17](17-acceptance-tests.md)

## G. Quyết định cần chủ khóa học duyệt

DEC-01 local hay server progress; DEC-02 host/cost/quota sandbox riêng; DEC-03 Coin/reveal; DEC-04 DML; DEC-05 brief nội dung mới. Lựa chọn/tradeoff/khuyến nghị nằm tại [13](13-sql-arcade-proposal.md); không suy bộ tài liệu hoặc kết luận review thành quyền triển khai/push/deploy.

## Đọc và bàn giao

| Nhóm | Tài liệu |
|---|---|
| Lịch sử/nguồn | [01 Historical](01-historical-research.md), [02 Source Catalog](02-source-catalog.md) |
| Kỹ thuật/trạng thái | [03 Observation](03-technical-observation.md), [04 State machines](04-state-machines.md) |
| Tính năng/luật/chấm | [05 Inventory](05-feature-inventory.md), [06 Rules](06-business-rules.md), [07 Testing/scoring](07-testing-and-scoring.md) |
| UI/UX | [08 Reconstruction](08-ui-ux-reconstruction.md), [09 Flows](09-user-flows.md), [10 Wireframes](10-wireframes.md) |
| SQL và repo | [11 Databases](11-databases-arcade-analysis.md), [12 Gap analysis](12-repository-gap-analysis.md) |
| Đề xuất/đặc tả | [13 Proposal](13-sql-arcade-proposal.md), [14 Architecture](14-technical-architecture.md), [15 Functional](15-functional-specification.md), [16 Data/API](16-data-and-api-design.md), [17 Acceptance](17-acceptance-tests.md) |
| Kiểm chứng | [Evidence](evidence-register.md), [Open questions](open-questions.md), [Traceability](traceability-matrix.md), [Validation/review](validation.md), [Plan/nhật ký](research-plan.md) |

Artifact thô ở `temp/research-codefights-2026-11-02/` ngoài Git; receipt REA và provenance cần thiết được giữ trong thư mục evidence. Không có source ứng dụng, bài học, seed, hạ tầng hoặc deployment được đổi bởi bộ nghiên cứu này. Tình trạng kiểm và review thực tế, kể cả lỗi nền, nằm ở validation; không lấy số file đủ làm bằng chứng mọi giới hạn lịch sử đã được giải quyết.
