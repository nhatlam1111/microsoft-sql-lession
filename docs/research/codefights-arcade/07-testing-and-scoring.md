# 07. Run Tests, Submit và chấm T-SQL

## 1. Bằng chứng và giới hạn lịch sử

Ảnh lịch sử xác nhận hai nút và sample/test khóa; chưa đủ biết request selection hoặc thuật toán chấm SQL. Các điểm mua test và version xem [H-03, H-04, H-05] trong [Evidence Register](evidence-register.md). Không có hidden dataset hoặc implementation backend gốc.

Sandbox hiện tại đã thử: Run trên starter trả 0/2 mẫu; Submit trả 0/4, chia sample/hidden và 0/100, giấu chi tiết output; Run SQL sai trả lỗi cú pháp MySQL. Đây là [B-02, B-03, B-06], không phải xác nhận luật Arcade cũ.

## 2. Hợp đồng SQL Arcade đề xuất

| Hành động | Dữ liệu chạy | Chi tiết trả về | Hoàn thành/thưởng |
|---|---|---|---|
| Run Tests | Tất cả visible scenario của version | Status từng test; schema/input công khai; expected/actual của sample, truncation rõ | Không |
| Submit | Visible + hidden scenario của version, chạy lại từ đầu | Visible chi tiết; hidden chỉ tổng; không raw hidden error | Chỉ khi tất cả đạt; completion cá nhân một lần |
| Retry do mất mạng | Job cũ qua key/ID trong thời hạn hợp đồng | Trạng thái job cũ; hết token thì dừng auto retry | Không cấp lần hai trong cửa sổ idempotency |
| Lỗi grader/fixture | Dừng, quarantine nếu cần | `service_error`, request ID an toàn | Không gán sai cho học viên |

MVP mỗi challenge có **2 visible + 3 hidden scenario**, cùng schema, dữ liệu khác. Đây là đề xuất mới để định lượng workload, không là test count lịch sử. Mỗi scenario phải có một lời giải tham chiếu và các mutant sai có chủ đích; golden expected sinh ở private authoring pipeline, kiểm độc lập rồi đóng version.

Chấm không so text SQL với đáp án. Các query tương đương có thể qua. Dữ liệu phản ví dụ thay mã, đổi tên/ngày, thêm dòng và xáo thứ tự chèn để giảm hardcode; không hứa phát hiện mọi lời giải hardcode hoặc suy ra thuật toán từ một lần chạy.

## 3. Chính sách so sánh kết quả — RECOMMENDATION

| Trường hợp | Chính sách mới | Test bắt buộc |
|---|---|---|
| Shape | Đúng số cột và vị trí; một resultset | Đổi cột, thiếu/thừa cột, empty result còn metadata |
| Alias | Bỏ qua tên cột, đề nói rõ không chấm alias | Alias khác vẫn đạt nếu giá trị/position đúng |
| NULL | Null token chỉ bằng null token của expected; khác `''`, `0`, chữ `NULL` | Cả bốn giá trị; không dùng luật SQL `NULL = NULL` làm comparator |
| Duplicate | Unordered dùng multiset, giữ số lần xuất hiện | Thiếu một dòng trùng phải trượt |
| Order | `ordered:false` so multiset; true so từng vị trí | TOP có tie-break xác định và fixture thứ tự chèn khác |
| Integer | So giá trị nguyên chính xác; MVP fixture/result trong miền int32 | Không qua Number để tuyên bố hỗ trợ toàn BIGINT |
| Decimal | Không đưa precision nhạy vào 10 bài đầu; giai đoạn mở rộng dùng representation chuỗi chính xác từ SQL trước bước JS Number | 38 chữ số, trailing zeros, âm/âm 0; conversion proof trước phát hành bài decimal |
| Float | Ngoài MVP; không tự thêm epsilon chung | Phải có tolerance theo bài nếu được duyệt |
| Date | MVP chỉ kiểu `date`, dạng ISO không timezone | Ngày ở hai biên, leap day trong fixture được thiết kế |
| datetime/time/offset | Ngoài 10 bài; chưa dùng formatter tới giây cho yêu cầu fractional/offset | datetime2(7), datetimeoffset trước khi mở rộng |
| String | So chính xác chuỗi trả về, không trim/casefold/normalize tự động | Unicode, khoảng trắng, hoa/thường theo đề |
| Collation | Khóa collation sandbox trong version; tác động tới WHERE/LIKE/ORDER BY được phản ánh bởi reference | Không đồng nhất string comparator JS với SQL collation |
| Empty result | Phải đúng shape và không có row | Query sai lọc ra rỗng không được mặc nhiên đạt |
| Giới hạn output | Đạt cap thì `result_limit_exceeded`, không chấm trên phần bị cắt | Không coi 200 dòng hiển thị là toàn kết quả |

Chính sách NULL, decimal và collation dựa tài liệu Microsoft [M-01, M-02, M-03]; cách chấm là thiết kế mới. Đọc [12](12-repository-gap-analysis.md) để thấy comparator hiện tại đã làm gì; không sửa comparator bài cũ trong nghiên cứu này.

## 4. Ngân sách chạy đề xuất

- SQL tối đa 4.000 ký tự. Một job chỉ có một bản SQL bất biến; một query/scenario, tối đa 1.000 dòng và 64 KiB kết quả/scenario; quá giới hạn không truncate để chấm.
- 5 giây thực thi mỗi scenario, 30 giây chạy tổng mỗi job, 30 giây đợi slot; báo riêng timeout hàng đợi và timeout query. UI bắt đầu báo đang chờ sau 2 giây, không hứa cold start luôn nhanh.
- Khởi đầu 2 slot worker toàn hệ thống; mỗi access code tối đa 1 job đang hoạt động, 6 job/phút; giới hạn phân tán, không lấy Map RAM mỗi Function làm quota toàn dịch vụ.
- Các số này là mục tiêu spike/đo tải, chưa benchmark. Không dùng timeout làm bảo đảm CPU/I/O; worker còn cần resource cap và hủy query/cleanup thực tế. [M-04, M-05]

## 5. DML và reveal

DML ngoài MVP. Trước khi thêm phải tách query/change policy; compare affected rows và trạng thái dữ liệu đầy đủ theo invariant, không chỉ một SELECT dễ bỏ sót side effect. Luôn rollback trên sandbox riêng; kiểm timeout/mất kết nối và reset; không cho script người học điều khiển transaction, quyền hoặc object khác.

Nếu reveal được duyệt, vẫn giữ holdout chưa lộ. Không coi suite đã bán toàn bộ dữ liệu là test ẩn chống hardcode. Score đề xuất chỉ đúng/chưa đúng; XP, Coin và điểm chứng nhận là các khái niệm riêng. Lỗi service không trừ điểm hay XP. [BR-05–BR-09]
