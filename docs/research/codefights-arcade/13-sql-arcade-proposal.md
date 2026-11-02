# 13. Đề xuất SQL Arcade

Toàn bộ chương này là **RECOMMENDATION**, chưa là phê duyệt triển khai. Cơ sở lịch sử tại [01](01-historical-research.md); khả năng tái dùng tại [12](12-repository-gap-analysis.md). Đối tượng là học viên dùng Excel cơ bản, học từ bài nguồn trước khi luyện cú pháp mới.

## 1. Hai chế độ tích hợp

**Learning Mode** tiếp tục cung cấp bài đầy đủ, các phần Excel/SQL, phụ lục, trình chiếu và bài tập hiện có. Không đổi route, quy ước bài, YAML hoặc progress v1. **SQL Arcade** thêm đường luyện theo challenge có dữ liệu phản ví dụ và điều kiện hoàn thành rõ. Hai mode liên kết bằng lesson ID; không coi hoàn thành challenge là đã học xong lesson. [BR-13, BR-17]

MVP khuyến nghị: map/list theo chủ đề, editor T-SQL hiện có, schema và hai sample dataset, Run Tests/Submit, ba hidden dataset, nháp/tiến độ cá nhân local, XP cá nhân và mở bài kế. Không leaderboard, wallet, community solution, hint trả lời sẵn, nhiều ngôn ngữ hoặc AI tutor. Những mục này không bị phủ nhận trong lịch sử; chúng được để ngoài bản đầu.

## 2. Lộ trình đề xuất

| World | Mục tiêu | Tiền đề | Challenge | Mở/hoàn thành | Phần thưởng |
|---|---|---|---|---|---|
| W1 Chọn và lọc dữ liệu | Chọn cột, thứ tự cột, lọc một điều kiện | Nền 1.1–1.5, bài 2.1/2.2 trước bài tương ứng | C01–C04 | C01 mở đầu; bài trước đạt mở bài sau; hoàn thành 4/4 | 10 XP cá nhân/challenge lần đầu, không bonus world |
| W2 Kết hợp điều kiện | Logic, khoảng ngày, mẫu chuỗi | W1 + bài 2.3 | C05–C07 | Sau C04; hoàn thành 3/3 | Như W1 |
| W3 Lấy kết quả đúng ý | TOP/sort có tie-break, NULL, DISTINCT | W2 + bài 2.4/2.5/2.6 tương ứng | C08–C10 | Sau C07; hoàn thành 3/3 | Như W1 |

Khóa là gợi ý đường học cá nhân; không bảo vệ API, không là quyền sở hữu nội dung. XP tính từ tập challenge đã hoàn thành, không từ số lần nhấn Submit. Có thể xuất/nhập Arcade progress trên thiết bị khác; chưa có tự đồng bộ. [BR-02, BR-06]

## 3. Mười challenge tự soạn

Chưa viết statement/fixture/answer thật. Các mô tả dưới là brief nội dung để triển khai sau; không phải YAML mới hoặc số liệu HRM_Demo đã chạy. Mỗi bài có 2 visible + 3 hidden scenario, cùng schema công khai, dữ liệu giả mới; hidden phải bao phủ phản ví dụ trong bảng.

| ID / tên | Việc cần làm và kết quả | Kiến thức đã dạy | Ba hidden scenario cần chứng minh | Độ khó |
|---|---|---|---|---|
| C01 Chọn hai cột | Lấy MaNV, HoTen từ NhanVien theo đúng vị trí; không chấm thứ tự dòng | 2.1; cấu trúc bảng 1.2/1.3 | Thêm cột nhiễu; đổi toàn mã/tên; bảng rỗng còn metadata | Khởi đầu |
| C02 Đổi thứ tự cột | Trả TenPB rồi MaPB từ PhongBan | C01 + 2.1 | Đảo thứ tự schema; tên phòng trùng; dữ liệu khác mẫu | Khởi đầu |
| C03 Một mã phòng | Chỉ nhân viên thuộc mã phòng được nêu trong đề | C02 + 2.2 | Phòng không có người; nhiều người cùng phòng; mã gần giống | Dễ |
| C04 Trạng thái tiếng Việt | Lọc trạng thái Unicode được nêu, trả cột đã quy định | C03 + 1.3/2.2 | Trạng thái khác; nhiều dòng đúng; không có dòng đúng | Dễ |
| C05 Hai phòng và trạng thái | Kết hợp OR trong ngoặc với AND | C04 + 2.3 | Thỏa OR nhưng sai trạng thái; có dòng đạt ở mỗi nhánh phòng; không thỏa nhánh nào | Dễ tăng dần |
| C06 Khoảng ngày có biên | Lọc NgayVaoLam giữa hai ngày kiểu date, gồm hai đầu | C05 + 2.3 | Đúng ngày đầu/cuối; ngoài mỗi biên; kết quả rỗng | Dễ tăng dần |
| C07 Tìm theo mẫu | LIKE theo mẫu được mô tả rõ, không cần hàm mới | C06 + 2.3 | Tiền tố gần giống; ký tự bổ sung để phân biệt wildcard; nhiều dòng khớp | Dễ tăng dần |
| C08 Ba hồ sơ theo ngày | TOP (3) theo NgayVaoLam DESC, MaNV ASC làm tie-break | C07 + 2.4 | Đồng ngày; ít hơn ba dòng; đảo thứ tự chèn | Trung bình nhập môn |
| C09 Email chưa có | IS NULL trên Email, không coi rỗng/chữ NULL là null thật | C08 + 2.5 | Null thật; chuỗi rỗng/chữ NULL; không có null | Dễ nhưng có bẫy |
| C10 Danh mục không trùng | DISTINCT MaPB từ NhanVien, ORDER BY MaPB theo đề | C09 + 2.6 | Nhiều nhân viên cùng phòng; nhiều mã khác; dữ liệu rỗng | Tổng hợp nhập môn |

Chỉ C08/C10 chấm thứ tự dòng trong brief này. C01/C02 có thể đặt alias minh họa nhưng không dùng alias làm điều kiện đạt. C07 cần tác giả chốt mẫu cụ thể và công khai quy tắc hoa/dấu theo collation sandbox; không yêu cầu escaping nâng cao chưa được dạy. Dữ liệu C10 dùng MaPB không null để không đưa bài DISTINCT+NULL ngoài mục tiêu.

## 4. Mở rộng sau MVP

World sau có thể đi theo bài full hiện có: tổng hợp/GROUP BY/HAVING, kết bảng, truy vấn con/CTE, window functions. Chỉ đưa bài vào luyện sau khi bài nguồn đủ kiến thức và dữ liệu phản ví dụ đã kiểm. DML/transaction/advanced T-SQL cần review riêng vì quyền và tính cô lập khác query-only. Không lấy tên của bài `summary` làm bằng chứng đã đủ tiền đề thực hành.

## 5. Mốc bàn giao triển khai tương lai

| Mốc | Đầu ra phải xem được | Gate |
|---|---|---|
| A — spike runner | Một challenge tự soạn, hai visible/ba hidden, đo reset/timeout/cross-job | Duyệt hosting/cost, quyền tài nguyên trước khi tạo gì |
| B — contract | Public/private split, API job, type/result comparator, lỗi và idempotency | Test leakage và isolation đạt trước UI hoàn thành |
| C — trải nghiệm | Map/list, workspace và nháp, nối bài nguồn | Kiểm bàn phím/màn nhỏ và tương thích v1 |
| D — nội dung | 10 challenge/50 scenario có reference + mutant evidence | Review tiền đề từng bài, SQL kiểm trên sandbox riêng |
| E — pilot | Lớp thử có giới hạn, telemetry tổng hợp và cách tắt Arcade | Chủ khóa học duyệt triển khai, không suy từ Ready |

## 6. Quyết định cần chủ khóa học duyệt

| ID | Lựa chọn / tradeoff | Khuyến nghị | Rủi ro và gate |
|---|---|---|---|
| DEC-01 | Local progress đơn giản / tài khoản server đồng bộ | Local cá nhân cho MVP; server identity khi cần chứng nhận/coin | Local sửa được, có thể mất khi xóa browser; không quảng cáo chống gian lận |
| DEC-02 | Sandbox runner riêng / dùng tài nguyên cloud mới cụ thể | Pool riêng, tuyệt đối không seed DB khóa học; lựa chọn host sau spike | Cần ngân sách và vận hành; chưa tạo tài nguyên, chưa có báo giá |
| DEC-03 | Không wallet / có Coin-reveal | Hoãn wallet; nếu thêm thì reveal phản ví dụ, giữ holdout | Cần identity, ledger và chính sách giá/quyền riêng |
| DEC-04 | Chỉ SELECT MVP / thêm DML | SELECT trước | DML cần ràng buộc/check/rollback/reset và concurrency mới |
| DEC-05 | 10 bài mới / tái dùng nguyên đề cũ | Tự soạn challenge trên kiến thức bài 2.1–2.6 | Có chi phí biên soạn và kiểm, tránh lộ đáp án cũ và vướng bản quyền |

Các lựa chọn chưa duyệt không ngăn hoàn tất nghiên cứu; chúng ngăn tự triển khai những thay đổi tương ứng. Đặc tả kỹ thuật dưới đây chọn rõ phương án khuyến nghị cho MVP để có bản thiết kế review được.
