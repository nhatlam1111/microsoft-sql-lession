# 06. Luật nghiệp vụ và phần còn chưa biết

## 1. Luật lịch sử có căn cứ

| ID | Phát biểu có phạm vi | Căn cứ / confidence | Không suy ra |
|---|---|---|---|
| HBR-01 | Bản launch 2016 tổ chức map theo chủ đề, mở dần địa điểm | H-01 / CONFIRMED | Một graph prerequisite cố định cho mọi năm |
| HBR-02 | Thông cáo launch nêu điều kiện hai sao ở địa điểm đã mở | H-01 / CONFIRMED phát biểu | Cách tính sao hoặc luật Databases về sau |
| HBR-03 | Có sample và test khóa trong ảnh 2017 | H-03-I / CONFIRMED | Run Tests có chạy hidden hay không |
| HBR-04 | Có cơ chế dùng Coin xem hidden theo các nguồn trải nghiệm độc lập | H-03-T, H-05 / STRONGLY SUPPORTED | Giá cố định, mở toàn site, vĩnh viễn, ảnh hưởng thưởng |
| HBR-05 | Score, XP, Coin và badge có nhãn/ngữ cảnh khác nhau | H-06, H-07 / CONFIRMED | Dùng XP như tiền hoặc Coding Score như ví |
| HBR-06 | Giao diện/branding thay đổi quanh rebrand 2018 | H-02 / CONFIRMED thông cáo | Ngày thay mỗi cơ chế Arcade |

Nguồn blog 2017 mô tả đi tiếp sau sample và hidden mang thêm lợi ích; chưa có kiểm độc lập đủ để dùng như luật chung. Thông tin mở bằng Coin ở bản sau cũng chưa đủ dựng chính sách toàn nền tảng. Giữ khác biệt tại [01](01-historical-research.md) và U-H02/U-H05 trong [Open Questions](open-questions.md).

## 2. Luật SQL Arcade đề xuất — RECOMMENDATION

Các luật BR-* là cấu hình MVP được khuyến nghị để chủ khóa học duyệt, không phải hành vi đã khôi phục của CodeFights.

| ID | Luật | Lý do và phạm vi |
|---|---|---|
| BR-01 | Chỉ Submit đạt toàn bộ visible và hidden mới hoàn thành challenge | Phân biệt thử mẫu với đánh giá, tránh lấy một dataset làm chứng minh tổng quát |
| BR-02 | Challenge đầu khả dụng; hoàn thành bài trước mở bài kế; bài đã mở được luyện lại | Nhịp tăng dần phù hợp 10 bài đầu; khóa hướng dẫn trên client |
| BR-03 | Run Tests chỉ chạy visible suite; Submit chạy cả suite, không tùy thuộc lần Run trước | Người học được thử nhanh; server không tin pass do client khai |
| BR-04 | Một bản challenge có statement/schema/policy/fixture version bất biến | Không chấm một đề bằng dữ liệu của đề khác |
| BR-05 | Không có tính điểm theo tốc độ, số lần thử hoặc thời gian học trong MVP | Khuyến khích thử/sửa; không suy thời gian ngắn nghĩa hiểu tốt |
| BR-06 | Hiện 10 XP cá nhân cho lần hoàn thành đầu mỗi challenge; replay không cộng thêm | Chỉ số tự theo dõi, có thể bị sửa qua localStorage; không chứng nhận/xếp hạng |
| BR-07 | Không wallet, phí reveal, leaderboard hoặc xem đáp án trong MVP | Tránh kéo identity và giao dịch vào cốt lõi khi chưa duyệt |
| BR-08 | Hidden suite chỉ trả tổng passed/total và verdict; không trả tên scenario, input, expected, actual, raw SQL error hay query plan | Giảm lộ fixture qua API, lỗi và log phía client |
| BR-09 | Lỗi hạ tầng/fixture không ghi trượt hoàn thành, không làm mất tiến độ đã có | Tách lỗi học viên khỏi lỗi dịch vụ |
| BR-10 | Trong cửa sổ 24 giờ, cùng key và digest hành động nhận cùng job; digest gồm mode/challenge/version/SQL, khác thì 409 | Ngăn retry vô tình; Run và Submit dùng key riêng; sau purge không bảo đảm nhận ra key cũ |
| BR-11 | Một job giữ một sandbox slot độc quyền; reset không thành công thì slot bị cách ly | Không lẫn dữ liệu scenario/người dùng |
| BR-12 | Query-only cho MVP: một SELECT hoặc CTE kết thúc bằng SELECT trên object được cấp quyền; không DML/DDL/multi-statement | Policy riêng phía server, không chỉ ẩn nút trên UI |
| BR-13 | Progress/draft Arcade có namespace mới; bài cũ và export/import v1 giữ nguyên | Tương thích với Learning Mode |
| BR-14 | Không seed/reset fixture trên HRM_Demo dùng chung; database chạy bài mới phải là sandbox riêng | Tuân thủ quy ước dữ liệu khóa học |
| BR-15 | Mỗi hidden scenario là phản ví dụ cho một cách làm sai; hữu hạn test chỉ tăng độ tin cậy | Không quảng cáo chứng minh đúng cho mọi input |
| BR-16 | Aliases không chấm trong MVP; thứ tự cột có chấm; thứ tự dòng theo đề | Giữ rõ tiêu chí, không lặp hiểu nhầm của comparator hiện có |
| BR-17 | Điều kiện prerequisite là bài đã được dạy; liên kết bài nguồn có trước editor | Không dùng hidden test để đòi kiến thức ngoài mục tiêu |
| BR-18 | Completion của version cũ giữ lại; không tự đánh dấu phiên bản mới đã qua | Khi đề đổi phải hiện cần luyện lại nếu muốn kết quả mới |

Retry do **chưa biết kết quả** dùng job/key cũ trong cửa sổ hợp đồng. Sau khi đã nhận terminal `service_error`, chỉ hành động Thử lại chủ động mới tạo job/key mới; kết quả terminal cũ không đổi. Hết token sau 15 phút thì dừng retry tự động; tombstone còn tới 24 giờ trả 410 cho replay key đã nhận. Sau purge, GET job trả 404 và reuse key có thể được coi như yêu cầu mới. [AC-23, AC-31, AC-32]

## 3. Nếu duyệt Coin/reveal ở giai đoạn sau

Chưa đặt giá mới từ con số 5.000 gián tiếp của lịch sử. Trước khi triển khai phải duyệt: nguồn kiếm Coin, giá và phạm vi reveal, quyền tồn tại theo challenge/test version nào, có xem dữ liệu thật hay chỉ phản ví dụ biên tập, chính sách hoàn tiền và ảnh hưởng thưởng. Khuyến nghị chỉ mở **phản ví dụ dùng cho học**, giữ một suite holdout không bao giờ bán quyền xem.

Wallet tương lai bắt buộc identity server; ledger append-only, unique reward/challenge/learner và unique reveal/testVersion/learner; trừ Coin và cấp quyền trong cùng transaction. Số dư không âm; retry hoặc hai tab không được trừ hai lần; lỗi cấp quyền rollback debit. Đây là yêu cầu thiết kế tương lai, chưa có API hay migration được áp dụng. [FR-14, AC-25, AC-26]
