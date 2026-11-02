# Review độc lập bài 3.1 — drawer SELECT

## Phạm vi, phiên bản và cách kiểm

- Lượt review theo `temp/verification/2026-11-01-drawer-select/brief-review-3-1.md`; trọng tâm là drawer `SELECT` và minh họa phép tính. Đọc trọn bài để kiểm tính tự đủ; không sửa sản phẩm.
- Model: kế thừa model của phiên, không đổi model/effort; không tạo agent khác.
- Source được giao: `8de5a4f407ef4c0740ba571f108ecedfbed975b4`. Build được giao: `2026-11-01T15:20:45.6555704Z`, trang `dist/bai/3-1-count-sum-avg/index.html`.
- Dùng PowerShell để đọc nguồn, SHA-256 để đối chiếu manifest, Python `html.parser` để đọc HTML tĩnh. Bảy hash trong manifest đều khớp file hiện có. Không dùng Git, browser, SQL, database, API hoặc runner.
- Đọc các đề tại ba trang HTML `dist/bai/3-1-count-sum-avg/bai-tap/{1,2,3}/index.html` trước khi đọc answer YAML. Các ghi nhận trong bảng dưới được lập trước lần đối chiếu đó.

## Rà theo thứ tự bài

Không phát hiện mục **Cần sửa** hoặc **Cần làm rõ** trong phạm vi drawer SELECT. Các nhận xét dưới đây là **Giữ được**, có căn cứ từ nguồn và HTML tĩnh; không phải xác nhận SQL/UI đã chạy đúng.

### Tình huống và phần chính

- **Giữ được — MDX dòng 18–27:** “một dòng là một đơn”, “không phân bổ ngày nghỉ theo từng tháng”. Đơn vị đếm, trạng thái và hai mốc ngày được chốt trước câu lệnh. Người mới không phải đoán “nghỉ tháng 9” là ngày thực nghỉ hay tháng bắt đầu đơn. Đề xuất: giữ các điều kiện này.
- **Giữ được — dòng 33–79:** “hàm tổng hợp tính một giá trị từ nhiều dòng”. Excel và SQL cùng một phần; câu SQL xuất hiện trước `LineMap`, mỗi dòng giải thích có dẫn chứng. Bài giải nghĩa `COUNT(cột)`, `CAST`, mẫu số của bình quân, `NULL`/`0` và phạm vi rỗng trước phần ôn. Phần so sánh `COUNTA` với `COUNT` không đòi biết PivotTable/VLOOKUP. Các ý nền cần cho ba đề đều tìm được trong phần luôn hiện. Đề xuất: không thêm lý thuyết vào drawer để dạy lại các ý này.

### RunFlow: Đầu vào → Thực hiện → Kết quả

| Bước | Căn cứ và kiểm đã làm | Đánh giá |
|---|---|---|
| `FROM`, dòng 94–113 | “chưa lọc đơn, chưa chọn cột kết quả hoặc tính tổng hợp”. Năm đơn trích có cả đơn đúng phạm vi, từ chối và ngoài tháng. `20` là tổng đơn; bốn cột là các cột đang theo dõi, không được gọi là toàn bộ cấu trúc bảng. Thẻ nhanh chỉ có ba dòng/ba cột và có nhãn phần còn lại. | **Giữ được:** chưa lấy bảng trích hay thẻ nhanh làm tổng. |
| `WHERE`, dòng 115–143 | Đầu vào hiện mã đơn, trạng thái, ngày bắt đầu; đủ đọc cả ba điều kiện. Năm mã trong bảng soi đều có ở đầu vào. `DP001` được giữ; `DP010` sai trạng thái; `DP018`/`DP005` trước mốc; `DP008` sai trạng thái và mốc trên. Từng ô đúng/sai khớp giá trị đang hiện. HTML nói rõ hàng cuối đếm trên cả `20` dòng. Kết quả có chín đơn, vẫn bốn cột theo dõi. | **Giữ được:** không tách các điều kiện `AND` thành nhiều lượt lọc; không suy các tổng điều kiện từ năm dòng trích. Các tổng `14/15/16/9` chưa được kiểm database trong lượt này. |
| `SELECT`, dòng 146–176 | “tính trên cả `9` đơn qua `WHERE`, không chỉ năm dòng đầu vào đang trích”. Đầu vào có đúng hai cột cần dùng: mã để nhận ra đơn, số ngày để tính. Bảng minh họa tần suất có ba dòng; ghi rõ đối chiếu cả chín đơn và không tạo bảng trong database. Đếm lại chín dòng ở kết quả `WHERE` và chín dòng Excel: bốn giá trị `1.0`, ba giá trị `2.0`, hai giá trị `3.0`, khớp minh họa. | **Giữ được:** không đòi hiện đủ chín đơn lần nữa; không đánh đồng ba dòng tần suất với ba đơn. |

Năm hàng phép tính của SELECT đều có đường đi đến ô kết quả:

- **Giữ được — dòng 159:** “Đếm mỗi đơn một lần: `4 + 3 + 2 = 9` đơn.” Người mới thấy vì sao `COUNT(*)` ra `SoDon`, thay vì đếm năm dòng trích hoặc ba mức số ngày.
- **Giữ được — dòng 160:** “`4 × 1.0 + 3 × 2.0 + 2 × 3.0 = 16.0`”. Phép cộng có tần suất và đơn vị ngày; tính tay từ dữ liệu đang trình bày khớp `TongNgay`.
- **Giữ được — dòng 161:** “Cả `9` số ngày đều khác `NULL`”. Lời giải nêu được mẫu số, phân biệt kết quả `AVG` khoảng `1.777…` với kết quả sau `CAST` là `1.78`. Không làm người học tưởng `CAST` sửa số ngày của từng đơn.
- **Giữ được — dòng 162–163:** “nhỏ nhất là `1.0`”, “lớn nhất là `3.0`”. Hai giá trị đối chiếu được ngay với cột số ngày của minh họa, đi vào đúng `ItNhat`/`NhieuNhat`.

`meaning` giải thích mỗi biểu thức tạo một ô và `AS` đặt tên cột; các hàng minh họa chỉ thẳng ô thuộc cột nào. Kết quả còn một dòng/năm cột, trùng thứ tự của câu chính và Result cuối. Một ví dụ, ba dòng dữ liệu và năm phép tính nằm trong giới hạn đã duyệt; không có câu SQL phụ hoặc cơ chế duyệt mọi đơn.

### Kết quả, giới hạn, phần ôn và bài tập

- **Giữ được — dòng 180–184:** câu trả lời ngay sau Result. “không phải số người nghỉ hoặc tổng ngày thực nghỉ trong tháng” và trường hợp `DP018` khép đúng giới hạn ban đầu. Kết quả một dòng không cần sắp xếp; bài đã nói thứ tự đơn trước tổng hợp có thể khác hình.
- **Giữ được — dòng 190–202:** Hay nhầm nêu hậu quả nghiệp vụ hoặc tính toán; Ứng dụng có việc cụ thể làm được bằng đếm/tổng hợp/giới hạn ngày. Không có lời hứa database tự kiểm thông tin đúng hay tự sửa dữ liệu.
- **Giữ được — dòng 208–242:** Ghi nhớ rồi ba câu tự kiểm tra rồi Bài tập, đúng thứ tự. Câu ôn dùng những điều đã giải thích ở dòng 71, 75, 79; không giấu tiền đề trong đáp án. Ba đề tiếp tục kiểm phạm vi, đếm dòng/giá trị và phạm vi rỗng. Hướng dẫn nói rõ chấm thứ tự cột, không chấm alias, không yêu cầu thứ tự dòng.
- **Giữ được — định dạng:** chữ đậm tập trung vào các khái niệm cần neo; dẫn chứng, bảng/cột và giá trị trong lời văn dùng code. Trong khối mới, HTML thực có các thẻ `code` cho dẫn chứng, không lộ dấu backtick hoặc `\t` như chữ thường. Không thấy đoạn mới vòng vo hoặc lý do phải cắt bớt phép tính nào trong năm hàng minh họa.

### Các câu hỏi “tại sao/để làm gì” đã tự đặt ra

| Câu hỏi của người học | Bài trả lời ở đâu |
|---|---|
| Tại sao không gửi danh sách từng đơn? | Tin nhắn yêu cầu một dòng báo cáo và định nghĩa hàm tổng hợp, dòng 18–27, 49. |
| Vì sao chỉ những đơn này được tính, còn đơn kéo sang tháng 9 bị bỏ? | Giả định dòng 24; điều kiện và bảng soi WHERE; câu trả lời dòng 184. |
| Tại sao thấy năm dòng đầu vào mà đếm được chín? | SELECT dòng 150–156 phân biệt bảng trích và toàn phạm vi; minh họa tần suất đủ chín đơn. |
| Vì sao tổng là `16.0`, bình quân không phải chia cho ba mức hay năm dòng? | Hai hàng SUM/AVG dòng 160–161 và lời giải mẫu số dòng 75. |
| `CAST` và `AS` dùng để làm gì? | LineMap dòng 63, giải thích kiểu/làm tròn dòng 77; đặt tiêu đề đã học ở 2.1 và được nhắc trong SELECT dòng 150. |
| Vì sao đếm email có thể ít hơn đếm hồ sơ, và vì sao không đổi mọi `NULL` thành `0`? | Dòng 71, 75, 79; nền NULL của 2.5; đề 1 không yêu cầu kiến thức chưa dạy. |

Không có câu hỏi nào trong bảng này phải lấy bài sau hoặc answer YAML bù lời giảng.

## Tiền đề từng bài tập

Ghi nhận cách làm và tiền đề dưới đây đã được lập vào report trước khi mở answer YAML; chỉ đối chiếu đáp án sau đó.

| Đề | Cách xác định cách làm từ bài học | Kiến thức cần và nơi đã dạy | Còn thiếu trước khi xem đáp án |
|---|---|---|---|
| 1. Hồ sơ đang làm và email đã có | Lọc trạng thái đang làm; trên cùng phạm vi tính hai số: số dòng và số giá trị email khác `NULL`. Không lọc email ở `WHERE`, vì sẽ làm mất hồ sơ trong số đếm thứ nhất. | `SELECT`, thứ tự cột và `AS`: 2.1; `WHERE`, chuỗi Unicode: 2.2 và 1.3; ý nghĩa `NULL`: 2.5; phân biệt `COUNT(*)`/`COUNT(cột)`, một dòng cho cả phạm vi: phần chính 3.1. Tên bảng/cột đều có trong đề. | Không thấy thiếu tiền đề. Không cần biết trước số hồ sơ/email thực tế. |
| 2. Năm chỉ tiêu của đơn bắt đầu tháng 8 | Giữ trạng thái đã duyệt và khoảng ngày bắt đầu tháng 8; dùng năm hàm cho cả phạm vi theo đúng thứ tự cột. Giữ bình quân nguyên kết quả hàm, không chuyển kiểu/làm tròn; không chia ngày của đơn kéo sang tháng sau. | `AND`: 2.3; mốc ngày và so sánh: 2.2, 2.8 và câu chính 3.1; năm hàm, kiểu thập phân của `SoNgay`: phần chính/LineMap 3.1. Phạm vi cộng toàn bộ đơn đã nêu ở giả định của 3.1 và ngay đề. | Không thấy thiếu tiền đề. Đề nói rõ khác câu mẫu ở chỗ không cần làm tròn. |
| 3. Khi tháng cần tổng hợp chưa có đơn | Chỉ lọc khoảng ngày tháng 11, không lọc trạng thái; dùng đủ năm hàm được chỉ định, không nhóm hoặc thay giá trị thiếu. Dự đoán vẫn có một dòng, số đếm bằng `0`, bốn ô còn lại là `NULL` nếu không có đơn phù hợp. | Khoảng ngày: 2.2/2.3 và câu chính 3.1; tổng hợp trên phạm vi rỗng: đoạn trước “Ở bài này chỉ cần…” của 3.1, được ôn lại ở Ghi nhớ và câu tự kiểm tra 3. `NULL` khác số `0` và chuỗi chữ: 2.5. | Không thấy thiếu tiền đề. Việc dữ liệu thực có/không có đơn tháng 11 cần kiểm kỹ thuật riêng. |

Sau khi đọc YAML, cả ba answer đều dùng đúng phạm vi, các hàm và thứ tự cột đã dự kiến; đề 2 không có bước làm tròn, đề 3 không lọc trạng thái hay thay `NULL`. Không cần lấy answer làm lời giảng. Không chép câu đáp án vào report; chưa chạy/nộp các câu này nên chưa xác nhận kết quả thực hoặc hành vi bộ chấm.

## Đường thực hành và đối chiếu HTML

- Bài 2.1 dẫn tới mục chọn nơi thực hành ở Giới thiệu. Đã đọc phần tương ứng trong `dist/gioi-thieu/index.html`: web cần mã do người phụ trách/người gửi khóa học cung cấp; SSMS dùng tài khoản riêng; SQL Server riêng tự đối chiếu, không có chấm tự động. Có câu “Nếu chỉ dùng web, bạn không cần làm theo mục kết nối SSMS bên dưới.” Không thấy yêu cầu người học web phải tự kết nối SSMS.
- HTML bài 3.1 có đủ ba liên kết Làm bài tới ba trang đề đã đọc; cuối bài có điều kiện tự viết lại câu lệnh không nhìn bài trước khi bấm hoàn thành. Các trang đề ghi hoàn tác trong phạm vi trang bài tập, phù hợp lời giới thiệu.
- Đã đọc toàn bộ nội dung drawer trong HTML và đối chiếu với MDX: ba nhãn Đầu vào/Thực hiện/Kết quả, các bảng trích, bảng soi WHERE, minh họa tần suất và năm ánh xạ ô kết quả đều có. `sql` bằng chứng không hiện thành câu SQL phụ. Query chính có xuống dòng và tab thật; dấu nháy SQL là nháy thẳng. Các vùng focus thuộc đúng câu đang giải. CSS nguồn khai báo tab bốn cột; drawer dùng các khối riêng cho phần mờ/highlight, nên chuỗi textContent ghép sát ở ranh giới khối không được coi riêng là lỗi xuống dòng của giao diện.
- Không mở browser: không có viewport thực tế, không thử bấm drawer/đổi bước, cuộn bảng, bàn phím, focus, sao chép/dán, editor hoặc SSMS. Các nhận xét trên chỉ xác nhận cấu trúc/nội dung HTML và khai báo CSS, không xác nhận hiển thị/tương tác thực.

## Ưu tiên và kết luận

Không có finding bắt buộc sửa trong phạm vi được giao. Minh họa mới làm rõ cách SELECT tạo năm ô từ toàn bộ chín đơn và đủ ngắn để lần theo. Theo phần học thử bằng nguồn/HTML, ba đề có đủ tiền đề từ bài hiện tại và các bài nền đã chỉ định; không thấy điểm phải đoán từ đáp án.

Trước nghiệm thu kỹ thuật vẫn cần bằng chứng SQL live, kiểm bắt buộc của tác giả và kiểm UI đúng build. Đây là phần **chưa xác minh**, không phải finding nội dung và không phải quyền push/deploy.

## Nguồn đã đọc và giới hạn

- `AGENTS.md`; `docs/quy-uoc.md` (gồm §2.6, §4.5–4.6); `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`.
- Bài nền được giao: 1.3, 2.1, 2.2, 2.3, 2.5, 2.8; bài 2.1 đồng thời là bài mẫu. Không dùng bài sau làm lời giải bù.
- `temp/verification/2026-11-01-drawer-select/approved-decisions.md`, brief và build manifest được giao; MDX 3.1, HTML bài 3.1, ba HTML đề và YAML 3.1 theo đúng thứ tự đã nêu. Các HTML đề không nằm trong danh sách hash của manifest; đã đối chiếu nội dung đề với YAML nhưng không khẳng định có hash phiên bản riêng cho chúng.
- Đọc các đoạn liên quan trong `RunFlow.astro`, `src/styles/lesson.css`, `src/styles/tokens.css`, `src/styles/exercise.css` để hiểu chia khối query/tab; không review tích hợp renderer thay agent khác.
- Không đọc report cũ, report tác giả/reviewer khác, verification của tác giả, script dữ liệu, secret hoặc tài liệu SQL bên ngoài. Không chạy SQL/API/database, build, test hoặc browser. Các phép tính đối chiếu là tính từ dữ liệu đã in trong bài; không chứng minh dữ liệu database hiện tại đúng các con số đó. Không xác minh độc lập commit bằng Git; chỉ đối chiếu hash với manifest được giao.
- Giới hạn kỹ thuật chưa xác minh riêng: tổng điều kiện WHERE trên toàn database, kết quả các câu bằng chứng/câu chính/đáp án, trạng thái dữ liệu mẫu thực, quy trình mã truy cập và chấm bài trong runtime, hiển thị trên desktop/màn hẹp và thao tác sao chép. Không báo các mục này đạt.
