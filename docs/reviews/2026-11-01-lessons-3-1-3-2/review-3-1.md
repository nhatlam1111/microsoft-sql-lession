# Review bài 3.1 — COUNT, SUM, AVG, MIN, MAX

## Phạm vi, phiên bản và cách kiểm

- Lượt ngày 01/11/2026; chỉ review `src/content/lessons/3-1-count-sum-avg.mdx`, ba đề trong `src/content/exercises/3-1-count-sum-avg.yaml` và HTML/CSS liên quan. Giữ model kế thừa của phiên; không truyền model/effort khác, không tạo agent con.
- `git rev-parse --short HEAD` trả `665e91a`. MDX, YAML, HTML bài 3.1 khớp SHA-256 trong manifest được giao; `run-flow.ts`, `RunFlow.astro`, `lesson.css` cũng khớp manifest source. Thời điểm build 21:08 theo gói giao việc, không phải một lần build do reviewer chạy.
- Hash đối chiếu: MDX `8224C65791B9DF690E0F843F6F18F5A85C12CA5714B91FCA009398CA8D60D10A`; YAML `5D7107E02BBAA65A6A12F1A2040FAA300A9C845ED3F10DDD1FCFF90D6CA9F225`; HTML `54A09EF0141704B4DBB3529BA3F8CA7B84086BC45F3600725AACE323A4951D4D`.
- Công cụ thực tế: PowerShell/rg để đọc và trích nguồn, HTML, CSS; `Get-FileHash`; Git chỉ đọc HEAD. Không chạy test/build/compiler/browser/SQL/API, không đọc seed hoặc secret. Chỉ ghi report này.
- Đã đọc hết 227 dòng bài, mọi thuộc tính và lời drawer của ba bước, ba câu tự kiểm tra; đọc đủ ba prompt. Lần đầu đọc YAML chỉ xuất `id/title/summary/prompt/columns/ordered`; đã ghi nhận cách làm và tiền đề cho cả ba đề trước khi mở `answer`. Sau đó mới đối chiếu answer, không dùng answer làm lời giảng.
- Giới hạn về ngữ cảnh độc lập: khi trích các phần quyết định được chỉ định ở spec/plan, một lần trích vượt ranh giới mục đã lộ thêm đoạn tiến trình của tác giả ở cuối spec; phần kế hoạch cũng chứa các checkbox ghi trạng thái triển khai. Không mở report cũ, `docs/reviews`, verification hoặc ma trận tác giả; không dùng các câu trạng thái ấy làm bằng chứng. Vì vậy không gọi lượt này là hoàn toàn mù với mọi kết luận tác giả. Thứ tự prompt → xác định tiền đề → answer vẫn được giữ.

## Kết luận và ưu tiên

Không thấy thiếu kiến thức cốt lõi để hiểu câu chính hoặc lập cách giải ba đề từ bài hiện tại và các bài trước. Có một góp ý **Biên tập** nhỏ về nghĩa của `int` ở lần đầu xuất hiện; không chặn việc làm ba đề. Không tìm thấy lỗi nội dung hoặc số liệu có căn cứ trong phép đối chiếu tĩnh này. Kết luận này không xác nhận SQL live, chấm bài hoặc giao diện tương tác đã chạy đúng.

## Rà theo thứ tự bài

### Tình huống và phạm vi — Giữ được

**Vị trí/câu gốc:** MDX 18–26, “một dòng là một đơn”, “Cộng toàn bộ `SoNgay` … không phân bổ ngày nghỉ theo từng tháng.”

Tình huống chốt đủ người hỏi, mốc tháng, đơn vị đếm và năm chỉ tiêu. Điều kiện trạng thái, mốc dưới gồm ngày đầu tháng và mốc trên trước tháng kế tiếp không để người mới tự suy ra quy tắc nghiệp vụ. Phân biệt đơn nghỉ với ngày thực nghỉ được nói trước câu SQL, không chờ đến đáp án. Khớp hồ sơ công ty, không cần sửa.

### Excel và chuyển sang câu SQL — Giữ được

**Vị trí/câu gốc:** MDX 32–56, “đưa các đơn đạt điều kiện sang một sheet riêng”, “`SUM` thông thường vẫn cộng cả dòng bị lọc”.

Không mặc định biết PivotTable hoặc VLOOKUP. Lời dẫn giải thích vì sao vùng tính đã tách đúng chín đơn; cảnh báo AutoFilter tránh suy nhầm rằng SUM tự bỏ dòng ẩn. `SUBTOTAL` chỉ là một lựa chọn được gọi theo công dụng, không bắt học viên biết cú pháp để theo bài. Excel có chín giá trị, tổng 16, đánh dấu `C2`, `C10`, `C11`; khớp vùng `C2:C10` và ô tổng. SQL nằm ngay sau câu chuyển ý, trước LineMap; đúng một khối Sql chính và đúng hai tiểu mục.

### Hàm, đơn vị đếm, NULL và mẫu số — Giữ được

**Vị trí/câu gốc:** MDX 60–79, “`COUNT(cột)` chỉ đếm các dòng mà cột đó khác `NULL`”, “Đây là minh họa giả định, không phải ba đơn trong bộ mẫu”.

Mỗi dòng LineMap có ví dụ của tình huống. `COUNT(*)` được tách khỏi dấu `*` lấy mọi cột ở 2.1. `COUNT(SoNgay)` giải nghĩa cú pháp để chuyển sang cột Email trong đề 1; không cần dựng thêm câu NhanVien trong phần giảng. Điều kiện `SoNgay NOT NULL` giải thích vì sao hai cách đếm bằng nhau ở ví dụ thật, không hứa COUNT kiểm tính hợp lệ.

Ví dụ `2`, `NULL`, `0` nói rõ là giả định và chỉ ra mẫu số khác số dòng. Bài phân biệt COUNT/COUNTA của Excel với COUNT của SQL; không dùng Excel COUNT để đếm mã chữ. Quy tắc phạm vi không có dòng và cột toàn NULL được giảng ở dòng 79, trước Memo và tự kiểm tra, đủ cho đề 3. Câu “các hàm đó cũng trả NULL” được hiểu theo tiền ngữ gần nhất là bốn hàm SUM/AVG/MIN/MAX, không phải COUNT.

### B1 — Biên tập: gọi tên số nguyên ngay lần đầu dùng `int`

- **Vị trí/câu gốc:** MDX 77: “Nếu ép `SoNgay` sang `int` trước thì `AVG` trả `int`, mất phần lẻ…”.
- **Tác động tới người mới:** người chỉ có Excel cơ bản đã được giải thích `decimal`, nhưng phải đọc đến Hay nhầm 3 (dòng 177) mới thấy cách gọi “số nguyên” của cảnh báo này. Khó hiểu nhỏ ở một giới hạn, không thiếu tiền đề của câu chính hay ba đề.
- **Căn cứ:** quy ước §2 yêu cầu giải nghĩa thuật ngữ lần đầu; bảng kiểu ở bài 1.3 giải thích decimal nhưng không có int. Tìm `int`/“số nguyên” trong MDX bài 1.x–2.x không thấy một định nghĩa trước đó.
- **Đề xuất ngắn:** đổi thành “Nếu ép `SoNgay` sang số nguyên `int` trước…”. Không thêm ví dụ/query hoặc đoạn giảng kiểu dữ liệu.

### RunFlow và drawer — Giữ được trong phạm vi đọc tĩnh

**Vị trí:** MDX 85–163; ba panel tương ứng trong `dist/bai/3-1-count-sum-avg/index.html`.

| Bước | Đầu vào và thao tác | Kết quả, tính nối tiếp và giới hạn xác minh |
|---|---|---|
| FROM | Ghi rõ bảng DonNghiPhep; chưa lọc hay tổng hợp. | 20 đơn, trích năm dòng và bốn cột MaDon/TuNgay/SoNgay/TrangThai; không giả rằng bảng nguồn chỉ có bốn cột. Có đơn giữ, từ chối, chờ duyệt, ngoài tháng để xét bước sau. |
| WHERE | Năm dòng đầu vào có MaDon/TrangThai/TuNgay, đủ ba điều kiện. Bảng soi chứa đúng năm mã đó. | DP001 giữ; DP010 sai trạng thái; DP018/DP005 sai mốc dưới; DP008 sai trạng thái và mốc trên. Chín dòng kết quả không chứa các dòng bị loại và vẫn có bốn cột theo dõi. Hàng cuối ghi rõ đếm riêng trên cả 20 dòng, không vẽ ba lượt lọc. Totals 14/15/16/9 chưa được đối chiếu nguồn database đầy đủ bởi reviewer. |
| SELECT | Năm dòng đầu vào có MaDon/SoNgay; nhãn ghi trích 5 trong 9 dòng, 2 trong 4 cột. Lời Thực hiện nói rõ tính trên cả 9 đơn. | Một dòng, năm cột. Không lấy năm dòng trích làm mẫu số AVG. Chín số SoNgay trong WHERE cộng được 16.0, bình quân làm tròn hai số lẻ là 1.78; min 1.0, max 3.0 khớp bảng cuối. Đây là kiểm tính nhất quán nội bộ, chưa phải SQL live. |

Query chính và RunFlow.query khớp nhau; focus của từng bước đúng đoạn trong query, gồm `\n`/`\t` của phần WHERE và SELECT. `sql` của bước chỉ được đọc trong nguồn, không coi là một query phụ hiển thị hoặc lời giảng cho học viên. Thẻ nhanh chỉ hiện ba dòng/ba cột và có nhãn phần còn lại; không lấy phần trích làm tổng thật.

### Kết quả và câu trả lời — Giữ được

**Vị trí/câu gốc:** MDX 165–169, “có `9` đơn đạt điều kiện, tổng `16.0` ngày…”; “không phải số người nghỉ hoặc tổng ngày thực nghỉ trong tháng”.

Câu trả lời nằm ngay sau Result, trả đủ năm yêu cầu, có đơn vị và điều kiện làm tròn. DP018 bắt đầu tháng 8 được dùng đúng vai trò minh họa đơn kéo sang tháng 9 vẫn bị loại theo TuNgay. Các giá trị của chín dòng nhất quán với Excel và Result; ngày kết thúc DP018 và dữ liệu database thật chưa được reviewer xác minh.

### Hay nhầm, Ứng dụng và phần ôn — Giữ được

**Vị trí:** MDX 175–221.

Hay nhầm nêu lỗi và hậu quả trên đúng tình huống: đếm đơn thành người, quên phạm vi, ép kiểu sai chỗ. Cảnh báo ép int đã có ở lời giảng và được nhắc lại trong dạng lỗi ở Hay nhầm; không cần thêm đoạn giải thích nữa. Chưa thấy đoạn dài/vòng vo cần cắt bắt buộc. Bài có nhiều ý mới nên 25 phút là ước lượng có thể chấp nhận về độ tải, không phải thời gian đã đo người học.

Ba ý Ứng dụng nói được việc làm nhờ chủ đề: tổng hợp, đối chiếu mức đầy đủ, tìm đầu/cuối thời gian; không hứa kiểm email hợp lệ hay tự biết nghiệp vụ. Memo ôn các quy tắc đã dạy. Ba tự kiểm tra nằm đúng sau Ghi nhớ, trước Bài tập, kiểm đếm/mẫu số/tập rỗng; câu trả lời đều có tiền đề ở phần giảng. MIN/MAX đã có vai trò trực tiếp trong câu chính và đề 2–3, không cần tăng số câu tự kiểm tra chỉ để nhắc lại từng hàm.

Chữ đậm tập trung vào khái niệm và lỗi; tên bảng/cột, giá trị dẫn chứng và địa chỉ ô dùng code. Nhân vật/mốc kể chuyện vẫn là văn thường. Không thấy backtick/escape lộ trong nội dung văn được trích từ HTML.

## Tại sao/để làm gì: bài trả lời ở đâu

| Câu hỏi của người học | Chỗ bài đã trả lời / phần còn thiếu |
|---|---|
| Vì sao phải tách vùng Excel trước khi SUM? | Dòng 32: SUM thông thường vẫn cộng dòng bị bộ lọc ẩn. |
| Vì sao COUNT(*) không lấy mọi cột, và vì sao đếm SoNgay có thể khác? | LineMap dòng 61 và lời giảng 71: đếm dòng đối chiếu với giá trị khác NULL. |
| Vì sao hôm nay hai cách đếm bằng nhau nhưng vẫn phải phân biệt? | Dòng 71: SoNgay của bộ mẫu NOT NULL; COUNT(cột) là quy tắc tổng quát để dùng ở cột được phép thiếu. |
| Bình quân chia cho số dòng nào; NULL và 0 có giống nhau không? | Dòng 75 và SELECT drawer 149–150: mẫu số là số giá trị khác NULL; tính trên cả chín dòng, không chỉ năm dòng trích. |
| CAST để làm gì và vì sao đặt ngoài AVG? | LineMap 63, dòng 77: đổi kết quả để làm tròn hai số lẻ; không sửa từng đơn. `int` cần gọi nghĩa ngay ở lần đầu theo B1. |
| Vì sao không có dòng phù hợp mà vẫn có một dòng kết quả? | Dòng 73, 79: câu tổng hợp cả phạm vi, không GROUP BY; COUNT bằng 0, bốn hàm kia NULL. Bài cho đủ quy tắc cần dùng, không cần chi tiết máy thực thi. |
| Vì sao DP018 có ngày trong tháng 9 vẫn bị loại? | Giả định 24, LineMap 67, câu trả lời 169: chọn theo TuNgay, không phân bổ ngày thực nghỉ. |
| Năm con số giúp trả lời việc gì, có suy ra số người hay không? | Tình huống 21, câu trả lời 169 và Hay nhầm 1: báo cáo theo đơn; không tự suy thành người riêng biệt. |
| Xem sơ đồ để hiểu thứ tự gì? | Dòng 85 và note sơ đồ: thứ tự logic, không khẳng định thứ tự đọc vật lý. |

## Tiền đề của từng đề bài tập

Bảng này được xác định trước khi đọc answer. Sau đó đối chiếu answer thấy cùng cách làm/phạm vi, không chép đáp án vào report.

| Đề và vị trí YAML | Kiến thức cần có, cách làm đã xác định trước answer | Đã dạy ở đâu | Còn thiếu / kết quả đối chiếu |
|---|---|---|---|
| 3-1-1, dòng 3–12: hồ sơ đang làm/email | Chọn hai phép đếm đúng thứ tự trên cùng tập đang làm: đếm dòng và đếm giá trị Email; không thêm điều kiện loại Email NULL ở WHERE. | 2.1 SELECT/AS/thứ tự cột; 2.2 WHERE và Unicode; 2.5 NULL; 3.1 dòng 61, 71–75 định nghĩa COUNT(cột). | Không thấy thiếu. Đổi SoNgay sang Email là áp dụng quy tắc đã dạy; đáp án không cần bổ sung một khái niệm mới. |
| 3-1-2, dòng 18–30: đơn bắt đầu tháng 8 | Dùng năm hàm; lọc đã duyệt và hai mốc tháng 8; cộng cả SoNgay của đơn xuyên tháng; dùng AVG trực tiếp vì đề không yêu cầu làm tròn. | 1.3 decimal; 2.2–2.3 yyyymmdd/AND; 3.1 dòng 24, 50–79, 169. | Không thấy thiếu. Bài đã tách AVG với CAST bên ngoài nên có cơ sở bỏ bước làm tròn. Answer cùng phạm vi và năm chỉ tiêu. |
| 3-1-3, dòng 38–49: tháng chưa có đơn | Tính mọi trạng thái nên chỉ lọc khoảng tháng 11; cùng năm hàm, không GROUP BY; giữ COUNT 0 và các giá trị NULL thay vì điền 0/chữ NULL. | 2.2 lọc đúng yêu cầu; 2.3 AND; 2.5 NULL khác 0/chuỗi; 3.1 dòng 79 giảng tập rỗng trước phần ôn. | Không thấy thiếu. Đề tự nêu rõ hàm/số cột/thứ tự, không buộc người học dựa vào answer để học quy tắc tập rỗng. |

Cả ba đề có đơn vị, phạm vi, thứ tự cột, alias không được chấm và không yêu cầu sắp xếp rõ. Lời dẫn Bài tập ở MDX 225 nhất quán với đề. Chưa chạy nộp bài hoặc kiểm bộ chấm.

## HTML/CSS và đường thực hành

- Đã đọc HTML bài và ba HTML bài tập tương ứng, chưa mở browser. Nội dung đề/metadata số cột, thứ tự và không sắp xếp khớp YAML. Các liên kết Làm bài có đích bài tập tương ứng; bài trước là 2.9, bài sau là 3.2.
- SQL chính trong HTML có bảy dòng, bốn tab thật, nháy thẳng ở chuỗi; không có hai ký tự literal `\t`/`\n`. HTML drawer có span/mark chia các vùng dim/focus; CSS build đặt chúng thành block/grid. Vì thế không kết luận mất xuống dòng chỉ từ việc nối text thô các span.
- Hai stylesheet mà HTML nạp có token `--sql-tab-size: 4` và dùng token cho SQL/drawer. Đã đối chiếu tĩnh focus, nhãn bảng, số dòng/cột trích và code trong drawer; chưa kiểm tab hiển thị thực, cuộn, thao tác sao chép/dán hoặc vùng highlight ở viewport.
- Đọc phần liên quan của Giới thiệu và ExerciseWorkspace: web cần mã từ người phụ trách/người gửi khóa học; chưa có mã có lối tạo database riêng; bản riêng không chấm tự động; người chỉ dùng web được nói rõ không phải theo kết nối SSMS. Không thấy lời bài 3.1 ép người dùng web tự kết nối SSMS. Nút hoàn thành dùng điều kiện tự viết lại câu lệnh, nhất quán với bài truy vấn.
- Đây là kiểm tính nhất quán của lời hướng dẫn và nguồn/HTML, không xác minh truy cập, React hydration, lưu nháp, cửa sổ nhận mã hoặc chấm bài hoạt động. Không có viewport thực tế; không đụng clipboard/nháp của người dùng.

## Nguồn đã dùng và phần chưa xác minh

Nguồn: AGENTS.md; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; mẫu 2.1; bài 1.3 và các phần liên quan 2.2–2.9; các quyết định phạm vi của spec/plan 01/11 được giao; MDX/YAML 3.1; manifest source/build; HTML bài và ba bài tập; CSS build liên kết từ HTML; phần liên quan của RunFlow/run-flow, Exercises, trang bài tập, ExerciseWorkspace và Giới thiệu. Không dùng bài 3.3 trở đi hoặc tài liệu SQL ngoài khóa học bù tiền đề.

Chưa xác minh: dữ liệu đang nằm trên database, câu SQL chạy được trong SQL Server/SSMS, số tổng từng điều kiện trên cả 20 nguồn, kiểu/ràng buộc thực của SoNgay, ngày kết thúc DP018, kết quả thật của ba đề, cơ chế chấm/hoàn tác/xác thực/lưu nháp, test nền, thao tác UI/bàn phím/copy-paste và bố cục ở bất kỳ viewport nào. Không có test/build do reviewer chạy nên không báo đạt các bước ấy hoặc suy ra không có lỗi nền. Tính đúng của tổng/bình quân trong report chỉ là đối chiếu số đang trình bày, tách khỏi kiểm live của tác giả.
