# 03. Quan sát kỹ thuật và phạm vi REA

Khảo sát ngày 02/11/2026. Phân biệt ba loại chứng cứ: ảnh/tài liệu lịch sử `H-*`, tương tác browser hiện tại `B-*`, phân tích JavaScript bằng REA `T-*`. Sổ nguồn và hash ở [Evidence Register](evidence-register.md).

## 1. Khả năng công cụ thực tế

REA MCP đã phản hồi. Các tool liên quan có trong catalog: `list_browser_targets`, `inspect_web_page`, `capture_browser_scenario`, `analyze_web_bundle`, `analyze_javascript_application`, `inspect_analysis_view`, `export_evidence_bundle`. Browser tool cần endpoint CDP loopback và target ID. Phiên tích hợp không cung cấp endpoint được hỗ trợ; kiểm process/listener không tìm thấy endpoint đó. Không đổi cấu hình, mở cổng debug hay chuyển cookie. [T-02]

Browser automation truy cập được phiên đã đăng nhập. Lỗi kết nối giữa hai lượt đã được khắc phục bằng reset phiên công cụ, không đóng browser. REA không thực hiện các thao tác browser dưới đây; chúng được thực hiện qua browser automation. Không có REA runtime capture, network capture hay quan sát backend.

## 2. Artifact đã phân tích bằng REA

| Thuộc tính | Giá trị |
|---|---|
| Nguồn | `https://app.codesignal.com/build-chunks/69250.5d3e5abd3c2d1fd4.js` |
| Cách chọn | URL có trong asset inventory của sandbox người dùng cung cấp; tìm literal sample/hidden/run trong các script công khai đã tải |
| Thu thập | HTTP công khai, không cookie/header đăng nhập; 51/51 script thành công, tổng 19.006.082 byte; chỉ một chunk được phân tích |
| Kích thước chunk | 1.024.944 byte |
| SHA-256 chunk | `fe9746a310377ce941852ed5e393d53d04ce2f0af692143145562d88092fee51` |
| Tool | `analyze_javascript_application`, directory riêng, `source_paths` chỉ chunk trên |
| Parent Evidence | `ev_8fbf6bf644fbc86d894db6a8907e45c02a27322f4acb34038e0e6a4cf0b7bdba` |
| Summary Evidence | `ev_2a08a2fa71a9199becf2cc4b2fe98dfd2f3bf354c4bea2f0f0ad8b6eedfebf52` |
| Kết quả | 1 file parse thành công, 0 parse failure, 211 module được nhận diện, 262.559 AST node được thăm |
| Giới hạn | Graph ứng dụng partial; semantic partial/truncated, 3.000 unknown được giữ; node/file 6.000 và unknown/file 3.000 |
| Artifact raw | `temp/research-codefights-2026-11-02/rea-evidence-bundle.json`, ngoài Git |

REA đọc bundle như văn bản bất hoạt, nhận diện factory Webpack/Rspack; không chạy bootstrap. Phân trang 5 module đã kiểm trả về các node ID riêng trên cùng chunk. Con số 211 không có nghĩa 211 module đã chạy. Directory digest khác digest của file vì có phạm vi định danh khác. Receipt có thể mang theo nằm ở [rea-receipt.json](evidence/rea-receipt.json). [T-01]

Sau phân tích, hai thư mục JavaScript thô được chuyển tới `C:/Users/Lam/AppData/Local/Temp/codex-codefights-arcade-2026-11-02-01a19bfc/` để Astro không quét dependency bên thứ ba như source project. Byte không đổi; path trong Evidence vẫn là path tại thời điểm thu/phân tích. Raw JSON Evidence và ảnh vẫn ở temp của repo, ngoài Git.

Đọc literal bằng công cụ source thông thường thấy tên sample tests, runHidden và submit trong chunk. Đây là gợi ý để chọn artifact, không chứng minh đường gọi đang được dùng hoặc điều kiện backend. Không lấy bundle hiện tại để khôi phục thuật toán chấm Arcade cũ. Không phân tích toàn bộ 51 script, source map hoặc mã server.

### HTML shell lịch sử bổ sung

HTTP trực tiếp CDX trả 8 record cho truy vấn prefix Arcade đã collapse URL; truy vấn exact Database có filter trả mảng rỗng. Từ timestamp thật, tải được [Intro 24/06/2017](https://web.archive.org/web/20170624125417id_/https://codefights.com/arcade/intro): 3.552 byte, SHA-256 `1d4aa901fce9339c270165d4ca9d3cf292a666ee6cbfa472eef4bdeb3b027634`. HTML chỉ là shell, có external bundle `b204e24bbb952f7c72440e0bab935da56969234b.js?meteor_js_resource=true`. Replay bundle ở yêu cầu đó trả 404; CDX bundle timeout 15 giây. [H-11]

REA đã kiểm HTML trong directory riêng sau khi file copy hoàn tất: parent `ev_fbf46be95e4ab8fa2dd76cfc4448a155368504185e92db2ef2144920b73bd824`, summary `ev_33256a595c6cf112e8ebb28a939cd7ad88ddaac7c46d65b9815ef20fe49df96c`. Kết quả 0 JavaScript parsed, 0 module, 3 findings; một inline JavaScript body không được phân tích, graph partial và semantic unknown. Không gọi đây là phân tích logic JavaScript Arcade cũ. [Receipt lịch sử](evidence/historical-rea-receipt.json) giữ nguyên các giới hạn. [T-03]

Raw HTML ở cache ngoài project; raw Evidence tổng hợp thêm lịch sử nằm ở `temp/research-codefights-2026-11-02/rea-with-historical-evidence-bundle.json`. Lần chọn file trước khi copy xong bị REA từ chối input; đã chờ file tồn tại mới gọi lại, không có kết quả phân tích một phần nào được dùng từ lần bị từ chối.

## 3. Kịch bản browser đã thực hiện

Đối tượng: [sandbox Database hiện tại](https://app.codesignal.com/practice-question/question/database?context=otherTypes), tiêu đề “Practice SQL Question”. Không phải bài assessment thật, không phải Arcade map. Mã ban đầu là starter MySQL chưa có lời giải; không đưa đề/dataset này vào challenge mới.

| Bước | Đầu vào và thao tác | Trạng thái giữa chừng | Kết quả thấy trực tiếp | Tác động/giới hạn |
|---|---|---|---|---|
| B-01 | Mở sandbox và tab Description/Information | Trang đã đăng nhập, timer phiên | Đề/schema/mẫu trái; editor và tests phải; splitters; điểm 0/100 | Không xác minh persistence server hoặc responsive |
| B-02 | Run Tests trên starter nguyên trạng | Running, Cancel, nút đổi Env/Submit bị vô hiệu | 0/2; hai test mẫu Wrong answer; Test 3/4 khóa; Input và Return Value có expected/actual, actual rỗng | Không có bài đúng; không kết luận mọi bài có bốn test |
| B-03 | Submit starter | Submitting, nút bị vô hiệu | Results 0/4; sample 0/2, hidden 0/2, score 0/100; Resubmit | Chi tiết output bị ẩn sau Submit; không quan sát thưởng hoặc unlock |
| B-04 | Chọn test khóa | Không có dữ liệu test hiện ra | Vẫn khóa, không thấy nút mua trong trạng thái này | Không chứng minh mọi sản phẩm hiện tại không còn mua test |
| B-05 | Mở Env rồi đóng, không chọn engine khác | Modal lựa chọn | MySQL 8.0.45; Microsoft SQL MSSQL 16.0.4260.1; PostgreSQL 16.14; cảnh báo đổi môi trường làm trống editor và có thể phục hồi bằng đổi lại | Chỉ xác minh danh sách, chưa chạy MSSQL/PostgreSQL |
| B-06 | Thay starter bằng câu SELECT sai cú pháp, Run Tests | Running | Syntax error, lỗi MySQL 1064, 0/2 | Chỉ lỗi MySQL; không suy nguyên văn lỗi SQL Server |
| B-07 | Khôi phục starter sau thử lỗi | Editor nhận lại nội dung cũ | AX đọc lại đúng starter ban đầu | Clipboard ban đầu rỗng, đã trả về nội dung rỗng; kết quả thử và timer vẫn tồn tại |
| B-08 | Mở `/arcade/db` trong tab tạm ở lượt khảo sát trước | Session health OK | Trang 404 | Không xác định ngày ngừng cung cấp chính thức |

Ảnh cục bộ đã lưu: `sandbox-run-failed.jpg`, `sandbox-submit-failed.jpg`, `sandbox-syntax-error.jpg` trong thư mục temp của lượt này. Không lưu cookie, mã truy cập hoặc thông tin hồ sơ. Không dùng `setValue` cho editor ở lượt sau: thao tác đó đã chèn thêm thay vì thay toàn bộ; chọn hết rồi paste được dùng để phục hồi và đã kiểm lại nội dung.

## 4. Điều chưa quan sát

Không có thành công 100%, thưởng, giao dịch Coin, mở world hoặc lưu tiến độ Arcade live. Không có request/response body backend, timeout thực tế, benchmark, autosave qua refresh, animation động hoặc test desktop/mobile. Ảnh tĩnh lịch sử chỉ xác nhận bố cục/trạng thái nhìn thấy. Xem [Open Questions](open-questions.md) và [báo cáo chấm](07-testing-and-scoring.md).
