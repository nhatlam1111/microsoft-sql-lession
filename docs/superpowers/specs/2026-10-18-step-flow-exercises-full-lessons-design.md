# Thiết kế đợt 2: sơ đồ thứ tự chạy, bài tập chạy trên web, bài đầy đủ

> Cập nhật 20/10/2026: khung bài và cách trình bày hiện hành theo [quy ước](../../quy-uoc.md) và [lesson-template](../../lesson-template.md), lấy bài 1.1 đã duyệt làm mẫu. Các chỉ dẫn tách "Với Excel" / "Làm bằng SQL", ép đủ khối hoặc trả lời tình huống riêng trong phần lịch sử bên dưới đã được thay thế. Các quyết định khác áp dụng khi không mâu thuẫn với quy ước hiện hành và các quyết định được duyệt sau đó.

- Ngày: 2026-10-18
- Trạng thái: đã duyệt ngày 2026-10-18. Phần A (sơ đồ thứ tự chạy, mẫu ở bài 3.5) và phần B (bài tập chạy trên web, xem [spec B](2026-10-18-exercise-runner-design.md)) đã làm và đã lên web; phần C (viết đầy đủ bài theo level) chưa làm.
- Nối tiếp: [spec đợt 1](2026-10-17-sql-server-course-site-design.md) (mọi quy định ở đó vẫn giữ, trừ chỗ spec này ghi khác)
- Web: https://nhatlam1111.github.io/microsoft-sql-lession/

## 1. Mục đích và lý do

Học viên tự học là chính. Người làm khóa học chỉ thỉnh thoảng tham gia, không theo lịch cố định. Vì vậy mỗi bài phải tự đứng được: đọc xong hiểu, tự thử được, và tự biết mình làm đúng hay sai mà không cần ai bên cạnh.

Một buổi học, theo lời người làm khóa học:

1. Mở web, thấy mindmap.
2. Chọn bài, đọc tóm tắt trên drawer, bấm "Vào bài học".
3. Tự đọc bài và tự liên hệ với những việc đã làm. Bài không cần thêm câu hỏi gợi ý cho phần này, vì đã có phần đối chiếu Excel.
4. Xem câu lệnh được SQL Server chạy qua từng bước trên một sơ đồ; bấm vào từng bước để xem chi tiết.
5. Làm bài tập ngay trên web, biết ngay đúng hay sai.
6. Tự bấm "Đã học xong".

Đợt 2 gồm ba việc, làm theo thứ tự đã thống nhất:

- **A. Sơ đồ thứ tự chạy** trong bài (mục 4).
- **B. Bài tập chạy SQL trên web** (mục 5). Bắt đầu bằng một bản chạy thử; thiết kế chi tiết của B viết thành spec riêng sau khi chạy thử xong.
- **C. Viết đầy đủ bài theo từng level**, bắt đầu từ Level 1 (mục 6).

## 2. Mục tiêu, ngoài phạm vi, những điều không được xảy ra

### Mục tiêu

- Người học thấy SQL Server xử lý câu lệnh theo thứ tự nào, và sau mỗi bước dữ liệu còn bao nhiêu dòng, trông ra sao.
- Người học làm bài tập trên web gần giống trên SSMS: viết câu lệnh, chạy, xem tab Results và Messages, nộp bài và biết đúng hay sai, sai thì biết sai ở đâu.
- Bài tập sửa dữ liệu (`INSERT`, `UPDATE`, `DELETE`) chạy được trên database dùng chung mà không làm thay đổi dữ liệu.
- Level 1 có đủ 6 bài đầy đủ, bài nào cũng có bài tập thật.

### Ngoài phạm vi (đợt này)

- Đăng nhập, tài khoản, database riêng cho từng học viên. Làm sau, khi có thêm học viên; bước đệm là mỗi người một mã truy cập riêng.
- Chạy SQL ngay trong trình duyệt bằng SQLite hay engine khác: không phải T-SQL, học viên sẽ học nhầm cú pháp.
- Bài tập dùng lệnh điều khiển transaction (`BEGIN TRAN`, `COMMIT`, `ROLLBACK`) hoặc lệnh tạo và sửa cấu trúc (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`). Các chủ đề này chỉ có ở dạng đọc hiểu hoặc mô phỏng.
- Đồng bộ kết quả bài tập giữa nhiều máy. Kết quả vẫn lưu trong trình duyệt và đi theo file xuất tiến độ.
- Chấm điểm, xếp hạng, đếm giờ làm bài.
- Viết đầy đủ Level 2–6. Làm tiếp theo cùng khuôn sau khi Level 1 xong và được duyệt.

### Những điều không được xảy ra

- Mật khẩu database nằm trong mã chạy ở trình duyệt, trong repo hay trong bản build.
- Bài làm của học viên để lại thay đổi trong database.
- Người lạ dùng API để chạy SQL tùy ý, hoặc làm cạn hạn mức miễn phí của database.
- Báo "sai" cho một câu đúng chỉ vì đặt tên cột khác, hoặc vì thứ tự dòng khác khi đề không yêu cầu sắp xếp.
- Kết quả trong sơ đồ hay trong đề bài không khớp với database thật.
- Báo lỗi chung chung kiểu "Có lỗi xảy ra". Lỗi nào cũng phải nói rõ chuyện gì đã xảy ra và nên làm gì tiếp.

## 3. Ràng buộc

- Web vẫn là trang tĩnh trên GitHub Pages. Phần duy nhất chạy phía server là API chạy SQL của phần B.
- Database bài tập là Azure SQL `sql-lession` (gói miễn phí, serverless, tự ngủ khi không dùng), đã có `HRM_Demo`. Hạn mức miễn phí của mỗi database: 100.000 vCore-giây và 32 GB dữ liệu mỗi tháng.
- Nơi chạy API dự kiến là Azure Functions (Node.js) trong cùng subscription; chốt trong spec B sau bản chạy thử.
- Đã kiểm ngày 2026-10-18: database đang dùng gói miễn phí, loại serverless 2 vCore.
- Nội dung bài vẫn được kiểm qua MCP `azure-sql` ở chế độ chỉ đọc như spec đợt 1. Hiện MCP đăng nhập bằng tài khoản quản trị (`db_owner`) và `.env` đang để `MCP_ALLOW_WRITE=true`; đổi về `false`. API của phần B không được dùng tài khoản quản trị này.
- Bản chạy thử và API được chạy câu sửa dữ liệu trong transaction rồi `ROLLBACK` trên `sql-lession` (người làm khóa học đã cho phép ngày 2026-10-18, mục 8). Ngoài cách đó, người dựng vẫn không ghi gì vào `sql-lession`.
- Máy có Node.js; không có `gh` CLI, không có SQL Server cài sẵn.

## 4. A. Sơ đồ thứ tự chạy

### 4.1 Để làm gì

Câu lệnh được viết theo thứ tự `SELECT … FROM … WHERE … ORDER BY`, nhưng SQL Server xử lý theo thứ tự logic:

- Câu truy vấn: `FROM` (gồm `JOIN … ON`) → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `DISTINCT` → `ORDER BY` → `TOP` / `OFFSET`.
- Câu sửa dữ liệu (`UPDATE`, `DELETE`): `FROM` → `WHERE` (tìm dòng) → `SET` hoặc xóa → số dòng bị ảnh hưởng ở tab Messages.

Sơ đồ cho người học thấy thứ tự đó trên dữ liệu thật. Đây là chỗ người mới hay vấp, ví dụ thắc mắc vì sao không dùng được tên cột đặt bằng `AS` trong `WHERE`.

### 4.2 Trông thế nào

Theo ảnh tham khảo người làm khóa học gửi ("Simple 8-Step Workflow"), chỉnh cho hợp với web:

- Các bước là các thẻ đánh số 01, 02, 03…, xếp hình chữ chi: hàng 1 đi từ trái sang phải, hàng 2 đi từ phải sang trái, mũi tên nối giữa các thẻ, mũi tên đi xuống ở cuối mỗi hàng.
- 3 thẻ mỗi hàng trong cột bài rộng 720px. Người dựng chỉnh nếu thấy chật.
- Mỗi thẻ có: số bước; mệnh đề (ví dụ `WHERE`, tô màu như khối SQL kiểu SSMS); một câu nói bước này làm gì; số dòng sau bước ("còn 12 dòng"); bảng nhỏ xem trước tối đa 3 dòng × 3 cột, dư thì ghi "+N dòng".
- Màu theo bảng màu của web (mục 4.9 spec đợt 1), không dùng 8 màu như ảnh tham khảo. Người dựng chọn cách phân biệt các thẻ.
- Đầu sơ đồ có một dòng nhắc chỗ khác nhau giữa thứ tự viết và thứ tự chạy, ví dụ: "Bạn viết SELECT trước, nhưng SQL Server làm FROM trước."
- Làm mockup để người làm khóa học duyệt trước khi làm thật.

### 4.3 Bấm vào một bước

- Drawer mở ở bên phải, cùng kiểu với drawer trên mindmap, nằm đè lên cột phải của trang bài. Drawer có, theo thứ tự (đã duyệt qua mockup ngày 2026-10-18, sau góp ý "nhấn mạnh keyword của bước"):
  - số bước, mệnh đề, câu tóm tắt của bước;
  - câu lệnh đầy đủ, các dòng thuộc bước này được tô nổi (nền vàng nhạt, vạch bên trái), các dòng khác mờ đi;
  - đoạn "`<mệnh đề>` làm gì": nghĩa chung của từ khóa, dùng lại được ở câu lệnh khác;
  - đoạn "Ở bước này": chuyện xảy ra với dữ liệu thật ở bước này, có số liệu;
  - trong hai đoạn trên, từ khóa SQL được đóng khung và tô màu kiểu SSMS; tên bảng, tên cột chỉ dùng chữ code thường;
  - bảng kết quả của bước đó, kiểu bảng Results SSMS; nhiều dòng thì trích và ghi rõ "trích N dòng";
  - câu lệnh cho ra đúng kết quả trung gian đó, có nút "Sao chép", để người học tự chạy lại;
  - một câu liên hệ Excel nếu bước đó có việc tương ứng trong Excel.
- Trong drawer có "Bước trước" và "Bước sau"; phím mũi tên trái/phải cũng chuyển bước. Đóng bằng ×, Esc hoặc bấm ra ngoài.
- Thẻ đang mở được đánh dấu trên sơ đồ.

### 4.4 Đặt ở đâu, viết thế nào

- Đặt trong mục "Làm bằng SQL" của bài đầy đủ, ngay sau câu lệnh hoàn chỉnh, dưới một tiêu đề cấp 3 (ví dụ "SQL Server chạy câu này thế nào"). Không thêm tiêu đề cấp 2, để giữ khung 7 mục của bài đầy đủ.
- Chỉ dùng cho câu lệnh có từ 2 bước trở lên. Bài tóm tắt không có sơ đồ.
- Viết bằng một thành phần MDX mới. Dữ liệu nằm ngay trong file bài: câu lệnh đầy đủ (một lần cho cả sơ đồ); với từng bước: mệnh đề, câu tóm tắt, đoạn lệnh của bước, nghĩa của từ khóa, chuyện xảy ra ở bước này, câu lệnh trung gian, các cột, các dòng, tổng số dòng.
- Kết quả từng bước chép từ lần chạy thật câu lệnh trung gian qua MCP chỉ đọc. Với câu sửa dữ liệu, kết quả lấy bằng câu `SELECT` tương ứng, như cách bài 6.5 đã làm.
- Kiểm tra tự động:
  - các bước đi đúng thứ tự logic ở mục 4.1;
  - số dòng ghi trên thẻ khớp với dữ liệu khai báo;
  - câu lệnh trung gian có chuỗi tiếng Việt thì có tiền tố `N`, và không có dòng bắt đầu bằng khoảng trắng (MDX sẽ cắt mất).
- Bài mẫu đầu tiên: thêm sơ đồ vào bài 3.5 (đã viết đầy đủ).

## 5. B. Bài tập chạy SQL trên web

### 5.1 Học viên thấy gì

- Mục "Bài tập" cuối bài liệt kê các bài tập: tên, một câu đề, trạng thái (chưa làm hoặc đã làm đúng), nút "Làm bài".
- Mỗi bài tập có một trang làm bài riêng, dùng hết chiều ngang:
  - Bên trái là đề bài: yêu cầu, các cột cần ra, có cần sắp xếp không. ~~Gợi ý mở dần, đáp án.~~ Bỏ theo [spec B](2026-10-18-exercise-runner-design.md): không gợi ý, không đáp án.
  - Bên phải là khung soạn SQL tô màu kiểu SSMS; bên dưới là tab Results và Messages giống SSMS.
- Nút "Chạy" (phím F5 như SSMS, hoặc Ctrl+Enter): chạy và hiện kết quả, không chấm.
- Nút "Nộp bài": chấm rồi báo đúng, hoặc báo sai kèm lý do cụ thể (khác số dòng, khác số cột, dòng thứ mấy khác) mà không lộ đáp án.
- ~~Đáp án mở được sau lần nộp đầu tiên.~~ Bỏ theo spec B.
- Có nút "Sơ đồ database" mở popup sơ đồ 7 bảng (spec B).
- Bài làm dở được giữ lại trong trình duyệt khi rời trang.
- Trạng thái bài tập lưu cùng tiến độ, có trong file xuất/nhập tiến độ; file tiến độ cũ vẫn nhập được. Nút "Đã học xong" của bài vẫn do người học tự bấm, không phụ thuộc bài tập.

### 5.2 Vì sao cần API, và API làm gì

- Không nối thẳng từ trình duyệt vào database được: web để public nên mật khẩu sẽ lộ, và trình duyệt không nói chuyện trực tiếp được với SQL Server.
- API giữ thông tin kết nối ở phía server. API nhận mã bài tập, câu SQL và mã truy cập; trả về cột, dòng, số dòng bị ảnh hưởng, thông báo lỗi của SQL Server (nguyên văn, để người học quen đọc lỗi), và kết quả chấm khi nộp bài.

### 5.3 Không để bài làm thay đổi database

- Mỗi lần chạy: mở transaction, chạy câu của học viên (và câu kiểm tra nếu có), cuối cùng luôn `ROLLBACK`.
- Chặn trước khi gửi xuống database, dùng bộ đọc T-SQL đã có trong repo (bỏ qua chuỗi và chú thích):
  - chỉ cho các câu bắt đầu bằng `SELECT`, `WITH`, `INSERT`, `UPDATE`, `DELETE`;
  - chặn lệnh transaction, `EXEC`, `USE`, `GO`, lệnh cấu trúc, lệnh phân quyền, `BACKUP`, `RESTORE`, `DBCC`, `WAITFOR`, `OPENROWSET`, `OPENQUERY`, `BULK`, `KILL`, `SHUTDOWN`;
  - bị chặn thì báo rõ lệnh nào không dùng được trong bài tập và vì sao.
- Tài khoản SQL riêng cho API, chỉ được đọc và sửa dữ liệu trên các bảng của `HRM_Demo`, không có quyền sửa cấu trúc hay quyền quản trị.
- Giới hạn thời gian chạy, thời gian chờ khóa, số dòng trả về (dư thì ghi "đã cắt") và độ dài câu lệnh.
- Chốt cuối: có cách đưa `HRM_Demo` về đúng dữ liệu chuẩn khi phát hiện lệch. Chi tiết ở spec B.

### 5.4 Chấm bài

- Bài truy vấn: so kết quả câu của học viên với kết quả câu đáp án. Cùng số cột theo thứ tự đề yêu cầu, cùng giá trị từng ô. Không so tên cột. Chỉ so thứ tự dòng khi đề yêu cầu sắp xếp. `NULL` bằng `NULL`.
- Bài sửa dữ liệu: trong cùng một transaction, chạy câu của học viên rồi một câu kiểm tra (`SELECT` trên bảng bị sửa); làm tương tự với câu đáp án; so hai kết quả kiểm tra và số dòng bị ảnh hưởng. Cả hai lần đều `ROLLBACK`.
- Đề bài ghi rõ cột cần ra và có cần sắp xếp hay không, để học viên biết mình được chấm theo gì.

### 5.5 Chống lạm dụng và chi phí

- Mã truy cập do người làm khóa học phát cho học viên. Nhập một lần, trình duyệt nhớ. Không có mã thì vẫn đọc bài bình thường, chỉ không chạy được bài tập.
- API chỉ nhận yêu cầu từ địa chỉ web của khóa học (và từ localhost khi phát triển).
- Database tự ngủ khi không dùng, nên lần chạy đầu sau một lúc nghỉ có thể mất cỡ một phút. Trang báo "Đang khởi động database…" thay vì báo lỗi.
- Nếu database tạm dừng vì hết hạn mức miễn phí trong tháng, trang báo rõ là đầu tháng sau mới chạy lại được; bài đọc vẫn dùng bình thường.

### 5.6 Chạy thử trước

- Mục tiêu: chứng minh trên `sql-lession` thật rằng:
  1. chạy được câu `SELECT` và trả kết quả;
  2. chạy `UPDATE` và `DELETE` trong transaction rồi `ROLLBACK`, dữ liệu trước và sau giống hệt (so checksum từng bảng);
  3. chấm được một bài truy vấn và một bài sửa dữ liệu theo mục 5.4;
  4. bộ chặn lệnh ở mục 5.3 hoạt động;
  5. đo được thời gian chạy khi database đang ngủ và khi đang thức.
- Chạy trên máy bằng Node.js, đọc thông tin kết nối từ `.env`. Không deploy, không làm giao diện. Code chạy thử là đồ bỏ, không đưa vào `main`.
- Ghi lại kết quả chạy thử, rồi viết spec B chi tiết: nơi chạy API, cách deploy, tài khoản SQL, cách khôi phục `HRM_Demo`, định dạng file bài tập, giao diện trang làm bài (có mockup).

## 6. C. Viết đầy đủ bài theo level

- Bắt đầu Level 1: viết đầy đủ 1.2, 1.3, 1.4, 1.5, 1.6 (bài 1.1 đã đầy đủ). Theo khuôn bài đầy đủ ở mục 4.5 và giọng văn ở mục 4.7 của spec đợt 1.
- ~~Mỗi bài Level 1 có 2–4 bài tập thật, từ dễ đến khó, trên `HRM_Demo`. Bài 1.1 được bổ sung bài tập.~~ Đổi 2026-10-18: bài tập bắt đầu từ bài 1.6, bài 1.1–1.5 không có mục "Bài tập" (xem [spec Level 1](2026-10-18-level-1-full-lessons-design.md)). Bài nào có câu lệnh từ 2 bước trở lên thì có sơ đồ.
- Bài tập Level 1 chỉ dùng câu truy vấn, đúng phạm vi level.
- Bài 1.2 giữ nội dung đã định (SSMS, Object Explorer, chạy script `HRM_Demo`) và thêm phần giới thiệu trang làm bài tập trên web.
- Mọi câu lệnh, kết quả và đáp án được kiểm qua MCP chỉ đọc.
- Xong Level 1 thì người làm khóa học duyệt, rồi mới làm Level 2.

## 7. Những quyết định mình tự đặt (bạn xem lại khi đọc)

1. (Đã duyệt qua mockup.) Sơ đồ xếp 3 thẻ mỗi hàng theo hình chữ chi; thẻ có bảng xem trước tối đa 3 dòng × 3 cột; màu theo web chứ không theo 8 màu của ảnh.
2. Drawer của sơ đồ đè lên cột phải của trang bài, cùng kiểu với drawer trên mindmap.
3. Sơ đồ đặt dưới tiêu đề cấp 3 trong mục "Làm bằng SQL"; bài đầy đủ vẫn giữ đúng 7 mục.
4. Mỗi bài tập có một trang riêng; phím F5 để chạy như SSMS.
5. ~~Đáp án mở được sau lần nộp đầu tiên.~~ Người làm khóa học quyết định bỏ (spec B).
6. Chấm bài không so tên cột; chỉ so thứ tự dòng khi đề yêu cầu sắp xếp.
7. Dùng chung một database, mỗi lần chạy đều `ROLLBACK`; chưa làm đăng nhập hay database riêng.
8. Có mã truy cập để chặn người lạ.
9. Nơi chạy API dự kiến là Azure Functions; chốt sau bản chạy thử.
10. Bài tập Level 1 chỉ dùng câu truy vấn; bài 1.1 được thêm bài tập.

## 8. Câu hỏi cần bạn trả lời

1. Bạn có cho phép bản chạy thử (và sau này là API) chạy câu sửa dữ liệu trong transaction rồi `ROLLBACK` trên `sql-lession` không? **Trả lời (2026-10-18): cho phép.**

## 9. Để người dựng tự quyết

- Tên và cấu trúc thành phần MDX của sơ đồ, cách xếp hình chữ chi, hiệu ứng khi mở drawer.
- Thư viện khung soạn SQL, miễn tô màu kiểu SSMS và dùng được phím F5.
- Định dạng file bài tập (trong file bài hay file riêng), miễn chỉ có một nguồn dùng chung cho cả web và API.
- Số dòng tối đa trong drawer và trong kết quả bài tập; các con số giới hạn ở mục 5.3.
- Cách kiểm thử.

## 10. Việc bạn cần tự làm

- Đổi `MCP_ALLOW_WRITE` về `false` trong `.env`, hoặc bảo người dựng đổi. (Ngày 2026-10-18 vẫn đang là `true`.)
- ~~Trả lời câu hỏi ở mục 8.~~ Đã trả lời.
- ~~Sau bản chạy thử, theo spec B: tạo Function App, tạo tài khoản SQL cho API theo script người dựng đưa, đặt mã truy cập.~~ Đã làm.

## 11. Bài 2.1 đầy đủ và review độc lập (2026-10-20)

Bài `2-1-chon-cot-dat-ten-cot` chuyển từ bản tóm tắt thành bài đầy đủ, 18 phút, theo `docs/lesson-template.md`. Phạm vi: chọn cột, thứ tự cột, alias bằng `AS`, tên có khoảng trắng trong ngoặc vuông; có đối chiếu Excel, Result và hai bước RunFlow `FROM` → `SELECT`. Tình huống lấy toàn bộ 48 hồ sơ của bộ mẫu, kể cả người đã nghỉ, với ba cột và tiêu đề đã chốt. Bài tập có ba câu chọn cột, đổi vị trí và đặt tiêu đề; không yêu cầu thứ tự dòng.

Review do một agent mới thực hiện theo vai người học khó tính, không mang ngữ cảnh lúc viết và không kết nối database: [bản review 38 mục](../../reviews/2026-10-20-bai-2-1.md). Bản review không phát hiện lỗi SQL hay sai dữ liệu qua đối chiếu tĩnh; không coi đó là bằng chứng đã chạy trên Azure SQL.

### Đã sửa

- Làm rõ thao tác Excel: chép ba cột sang **workbook mới để gửi đi**, tránh hiểu thành sheet báo cáo vẫn đi kèm sheet nguồn.
- Trong ví dụ cụ thể thiếu dấu phẩy, đổi “SQL Server có thể hiểu” thành “SQL Server hiểu” alias; đây là cách phân tích cú pháp xác định, không phải lựa chọn ngẫu nhiên.
- Cập nhật danh mục kiểm thử để bài 2.1 là `full`, README để chỉ đúng các bài đầy đủ và các bài có bài tập.

### Không làm theo

Không có đề xuất review nào bị bác. Giữ các quyết định chung: bộ chấm không so tên cột, học viên tự đối chiếu alias; chưa dạy `WHERE`, `ORDER BY`, `DISTINCT` ở bài này; tên các mục và nhãn khối dùng theo khuôn. Không thêm kiểm thử chỉ để so từng câu văn; dùng các kiểm tra cấu trúc, dữ liệu, bản build và review để xác minh thay đổi nội dung.

### Kiểm tra và giới hạn

- `npm test`: 213 test qua. Danh mục bài 2.1 đã được kiểm ở trạng thái thất bại trước khi chuyển bài sang `full`, sau đó qua cùng bộ kiểm cấu trúc hiện có.
- `npm run check`: 0 lỗi, 0 warning và 3 hint có sẵn ở `FormEvent`/`document.execCommand` của các thành phần không đổi.
- `npm run build`, `npm run check:dist`: 65 trang, 1.313 link; đủ ba trang bài tập mới và không có câu đáp án trong tài nguyên gửi ra web.
- API: kiểm kiểu và build qua, gói đủ 11 bài tập.
- Đối chiếu cục bộ bằng SQLite trong bộ nhớ, nạp DDL/INSERT từ script chuẩn và chuyển cách gán quản lý sang câu tương đương: các cột, tổng dòng và mọi ô được trích trong Result/RunFlow/Excel khớp script; ba đáp án ra lần lượt 48, 48 và 6 dòng, đúng thứ tự cột. Đây là kiểm tính nhất quán với dữ liệu nguồn, **không phải** kiểm chạy T-SQL trên SQL Server.
- Kiểm trong Chromium ở 1440px và 1280px: nội dung, ô đánh dấu, hai drawer RunFlow, điều hướng bài tập và nhắc tự đối chiếu alias hiển thị đúng; không có lỗi JavaScript hay tràn ngang toàn trang ở hai kích thước desktop này. Dưới 1024px vẫn là giao diện desktop và có thông báo máy tính theo thiết kế đã chốt; không làm responsive trong thay đổi này.
- **Chưa xác minh live Azure SQL/API:** `npm --prefix api run check:exercises` dừng trước khi kết nối vì thiếu `SQL_SERVER`, `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD`. Không có câu nào được gửi xuống database khóa học. Khi có cấu hình kết nối hợp lệ, cần chạy lại lệnh này và kiểm các câu minh họa bằng `SELECT` trước khi coi lượt kiểm database đã hoàn tất.

### Review độc lập lượt hai (2026-10-20)

Một agent mới, không đọc bản review ở trên, review lại theo `docs/lesson-template.md`, "Quy trình làm một bài": `temp/review/2026-10-20-doc-lap/review-bai-2-1-chon-cot-dat-ten-cot.md` trong repo chính, 58 mục (2 Cần sửa, 19 Cần làm rõ, 17 Biên tập, 20 Giữ được). Các điều bản review ghi "chưa xác minh" được chạy bằng `SELECT` trên database khóa học: `AS Phòng ban` không ngoặc báo `Incorrect syntax near 'ban'.`; `TenNV` báo `Invalid column name 'TenNV'.`; alias trong `WHERE` báo `Invalid column name 'Họ tên'.`; `AS 'Họ tên'` và `AS Mã` chạy, tiêu đề giữ dấu; hai cột cùng tiêu đề vẫn chạy; cột tính ra không có tên; `NhanVien` có KD 14 hồ sơ, 48 ngày vào làm khác nhau, 3 người đã nghỉ (NV020, NV033, NV041); đáp án mới của bài tập 3 ra 6 dòng.

Đã sửa:

- Bài tập 3 đổi sang `ChucDanh` (tiêu đề "Chức danh", "Mã chức danh"), để câu `SELECT TenPB, MaPB FROM PhongBan;` in trong Ghi nhớ không nộp được; đáp án không trùng `SELECT * FROM ChucDanh;` của bài 1.6 (khác thứ tự cột). Đề và đoạn giới thiệu bài tập nói "bộ chấm không so tên tiêu đề" thay cho "hiện chưa". Bài tập 1 đổi bối cảnh thành rà soát email, cho hợp với "mọi hồ sơ, kể cả người đã nghỉ".
- Ứng dụng gạch 2 viết lại cho đúng nghĩa; gạch 3 thêm ý SQL Server không kiểm nghĩa của tiêu đề.
- Thứ tự logic và alias: drawer bước `SELECT` và đoạn sau sơ đồ nói alias không dùng được trong `WHERE` (kèm lỗi thật), dùng được trong `ORDER BY`.
- Vì sao `[Họ tên]` không cần `N` (tên là `sysname`, Unicode); khi nào bắt buộc ngoặc vuông, `[Mã]` là quy ước của khóa học; `AS 'Họ tên'`, `AS "Họ tên"` trong câu lệnh của người khác.
- Copy with Headers và ô Include column headers; dạng ngày cho người nhận (định dạng trong Excel, đổi thành chuỗi trong SQL thì thành chữ).
- "Trả lời chị Hạnh" tách phần gửi người nhận (3 người đã nghỉ không phân biệt được trong ba cột, hỏi lại có cần cột trạng thái) với ghi chú cho người học. Đặt thành đoạn in đậm, vì tiểu mục cuối của "Làm bằng SQL" phải là sơ đồ.
- Hay nhầm: thêm quên ngoặc vuông; ví dụ "chọn một cột" đổi sang `SELECT MaPB FROM NhanVien;` (KD lặp 14 lần) vì dữ liệu mẫu không có ai trùng ngày vào làm; `SELECT *` rồi xóa tay có hậu quả cụ thể và trỏ bài 6.1.
- Lý thuyết: lặp lại được là chỗ SQL hơn chép tay (Excel có Power Query, bài 4.9); vì sao tên cột là tên kỹ thuật; ví dụ "đọc cột theo vị trí"; alias đặt tên cho cột tính ra, `(No column name)`; `AS` sau tên bảng (bài 3.4); alias không lưu vào bảng, view ở bài 4.5; tìm tên cột ở đâu và lỗi khi gõ sai.
- Biên tập: mục tiêu, thêm bài 1.3 vào cần biết trước, "Nói gọn lại" và `Key` dạng câu hỏi, cầu nối với cách ví của bài 1.6, "trường" thành "cột", khuôn cú pháp ghi chỗ cần thay như bài 1.6, `N'Trần Thị Mai'` ở bài 1.3, dòng đầu `LineMap`, dấu `;:`, Ghi nhớ thêm Copy with Headers và sửa dòng 5, câu tự đối chiếu rõ hơn và thêm câu đoán kết quả khi thiếu dấu phẩy. Thời gian đọc 22 phút.
- Nhãn "có N dòng" ở thẻ đầu của `RunFlow` đã sửa trên main (commit `c80534b`), sẽ có ở bài này khi nhánh được gộp.

Không làm theo:

- Cho riêng bài tập 3 so tên cột: đi ngược quyết định "Không so tên cột" ở mục 5.4 và 7.6; để người làm khóa học quyết. Đã đổi bảng để câu trong bài không nộp được.
- Thêm dòng nhắc kiểm tiêu đề vào dải "Đúng rồi." của bài tập: cần thêm một trường cho bài tập và đổi trang làm bài; đề bài và đoạn giới thiệu đã nhắc.
- Viết câu lệnh mỗi cột một dòng: cả khóa viết danh sách cột ngắn trên một dòng; Hay nhầm 1 thêm lời khuyên viết mỗi cột một dòng khi danh sách dài.
- Thêm phần đổi dạng hiển thị ngày vào bài 2.8: bài 2.8 dạy hàm tính ngày; bài 2.1 nói định dạng ở Excel.

Kiểm tra: `npm test` 215 test qua (thêm `tests/content-level-2.test.ts`, đã thấy đỏ trước khi sửa); `npm run check` 0 lỗi; `npm run build` và `npm run check:dist` qua, 65 trang, 1.314 link. `npm --prefix api run check:exercises` vẫn chưa chạy được vì cần thông tin kết nối SQL; ba đáp án đã được chạy bằng `SELECT` qua công cụ chỉ đọc.

## 12. Bài 2.2 đầy đủ và review độc lập (2026-10-20)

Bài `2-2-where-loc-nhu-autofilter` chuyển thành bài đầy đủ, 20 phút, nối tiếp bài 2.1. Phạm vi là một điều kiện trên một cột: sáu phép so sánh, mã phòng, trạng thái tiếng Việt và ngày. Tình huống lấy toàn bộ hồ sơ hiện lưu `MaPB = 'KD'`, kể cả người đã nghỉ, với bốn cột để đối chiếu. RunFlow có ba bước `FROM` → `WHERE` → `SELECT`, số dòng theo seed là 48 → 14 → 14. Ba bài tập lần lượt lọc KT, trạng thái Đã nghỉ và ngày vào làm từ 01/10/2026 gồm ngày mốc; không yêu cầu thứ tự dòng.

Review do một agent mới thực hiện theo vai người học khó tính, không mang ngữ cảnh lúc viết và không truy cập database: [bản review 36 mục](../../reviews/2026-10-20-bai-2-2.md). Reviewer đối chiếu DDL, INSERT và UPDATE bằng parser văn bản riêng, xác nhận các dòng và giá trị khớp seed; không coi kết quả đó là kiểm chạy T-SQL live.

### Đã sửa

- Bọc `MaPB = 'KD'` trong tiêu đề bảng bằng code span, giữ dấu nháy đơn thẳng ở HTML thay vì để trình biên dịch đổi sang nháy cong.
- Trong Memo, chuyển lời chú thích ngày 01/01/2026 sang nhãn bên Excel; phần bên SQL chỉ còn điều kiện hợp lệ `WHERE NgayVaoLam >= '20260101'`.
- Thay từ “drawer” bằng hướng dẫn bấm từng thẻ để mở phần giải thích, giúp người học biết cách đọc dữ liệu của từng bước.
- Rút câu kết quả phụ thuộc quyền truy cập trong mục Ứng dụng, giữ ý dữ liệu có thể thay đổi theo lúc chạy; không mở thêm chủ đề phân quyền trong bài WHERE.
- Cập nhật danh mục kiểm thử để bài 2.2 là `full`, README để chỉ đúng các bài đầy đủ, bài có bài tập và bản review.

### Không làm theo

- Chưa đổi cột trên thẻ xem trước của RunFlow: component hiện lấy ba cột đầu và chưa hỗ trợ cấu hình cột xem trước theo từng bước. Đề xuất review chỉ áp dụng nếu khả năng đó đã có; không mở rộng component trong thay đổi bài học này. Mã phòng và trạng thái vẫn có trong bảng đầy đủ của phần giải thích; hướng dẫn mở thẻ đã được làm rõ.
- Giữ phạm vi một điều kiện; không thêm bài dạy AND/OR/IN/BETWEEN/LIKE, ORDER BY/TOP hay xử lý NULL sâu. Các chủ đề đó được chỉ đến bài kế tiếp. Không thêm kiểm thử chỉ để so từng câu văn; dùng kiểm cấu trúc hiện có, đối chiếu dữ liệu và kiểm bản build.

### Kiểm tra và giới hạn

- `npm test`: 213 test qua. Danh mục bài 2.2 đã được kiểm ở trạng thái thất bại trước khi chuyển sang `full`, rồi qua cùng bộ kiểm cấu trúc hiện có.
- `npm run check`: 0 lỗi, 0 warning và 3 hint có sẵn ở các thành phần không đổi.
- `npm run build`, `npm run check:dist`: 68 trang, 1.344 link; đủ ba trang bài tập mới, không có câu đáp án trong tài nguyên gửi ra web.
- API kiểm kiểu và build qua, gói đủ 14 bài tập.
- Kiểm cục bộ bằng SQLite nạp dữ liệu từ seed: mọi ô trích trong Excel/Result/RunFlow, các tổng dòng 48/14/4, sáu ví dụ so sánh và các bẫy NULL/0 dòng khớp. Ba đáp án ra 7, 3 và 2 dòng, đúng thứ tự cột. Bài tập ngày giữ NV047 đúng mốc và NV048 sau mốc. Kiểm SQLite chuẩn hóa chuỗi `yyyymmdd` sang dạng ISO khi so với cột ngày, không mô phỏng việc chuyển kiểu ngầm của SQL Server; ngữ nghĩa T-SQL được đối chiếu tài liệu Microsoft trong review.
- Kiểm Chromium ở 1440px và 1280px: nội dung, bốn ô Excel được đánh dấu, dòng NV020 đã nghỉ, ba bước và điều hướng phần giải thích, ba link bài tập và đề có ngày mốc đều đúng; không có lỗi JavaScript hay tràn ngang toàn trang ở desktop. Giữ thông báo dành cho máy tính dưới 1024px theo thiết kế hiện có.
- **Chưa xác minh live Azure SQL/API:** `npm --prefix api run check:exercises` dừng trước khi kết nối vì thiếu `SQL_SERVER`, `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD`. Không có câu nào được gửi xuống database khóa học. Cần cấu hình hợp lệ và chạy lại kiểm đáp án cùng các câu minh họa bằng `SELECT` để hoàn tất bước kiểm database thật. PR giữ trạng thái draft và dựa trên nhánh bài 2.1 trong khi PR bài 2.1 chưa merge.

### Review độc lập lượt hai (2026-10-20)

Một agent mới, không đọc bản review ở trên, review lại theo `docs/lesson-template.md`, "Quy trình làm một bài": `temp/review/2026-10-20-doc-lap/review-bai-2-2-where-loc-nhu-autofilter.md` trong repo chính, 61 mục (3 Cần sửa, 20 Cần làm rõ, 10 Biên tập, 28 Giữ được). Các điều bản review ghi "chưa xác minh" được chạy bằng `SELECT` trên database khóa học. Kết quả:

- `TrangThai = 'Đã nghỉ'` và `'Đang làm'` thiếu `N` đều ra 0 dòng, còn `N'Đã nghỉ'` ra 3.
- `MaPB = "KD"` báo `Invalid column name 'KD'.`; `NgayVaoLam >= 20260101` báo `Operand type clash: date is incompatible with int`; `WHERE [Mã phòng] = 'KD'` báo `Invalid column name 'Mã phòng'.`
- Ngày dạng ngày/tháng/năm: `>= '01/10/2026'` ra 4 hồ sơ, `>= '20261001'` ra 2; `= '01/03/2024'` ra 0; `>= '01/03/2024'` và `>= '20240301'` cùng ra 11.
- So chữ: `'kd'` ra 14; `N'đang LÀM'` ra 45; `N'Dang lam'` ra 0.
- Giá trị của `TrangThai`: chỉ có `Đang làm` (45) và `Đã nghỉ` (3), và script không khai báo CHECK nào. KD có 1 hồ sơ đã nghỉ.
- Các con số khác: `!=` chạy như `<>`; 10 hợp đồng có `LuongCoBan >= 20000000`; `MaPB = N'Kế toán'` ra 0; ba đáp án ra 7, 3 và 2 dòng.

Đã sửa:

- Tin nhắn của chị Hạnh có yêu cầu đặt tiêu đề tiếng Việt, nên alias trong câu lệnh và thẻ SELECT có lý do.
- Component: `Excel` có thuộc tính `rowNumbers`, hình sau khi lọc hiện số dòng 1, 3, 4, 21 và tên ô theo số đó. `RunFlow` cho mỗi bước chọn cột xem trước (`preview`), và `checkFlow` báo khi cột không có trong `columns`. Bước `FROM` và `WHERE` xem trước `MaNV`, `MaPB`, `TrangThai`. Việc này thay cho mục "Không làm theo" đầu tiên ở trên.
- Hay nhầm có thêm các lỗi đã chạy ra kết quả thật: quên `N`, nháy kép, ngày dạng ngày/tháng/năm, bỏ nháy quanh ngày, alias `[Mã phòng]` trong `WHERE`. Ví dụ tên phòng đổi thành `'Kinh doanh'` (không dấu, không cần `N`) và tả kết quả 0 dòng trong SSMS.
- Lý thuyết và ví dụ:
  - Vì sao so với NULL ra `UNKNOWN`; cái giá của `WHERE` (điều kiện lệch ý vẫn ra danh sách trông hợp lý; index ở bài 5.6); nối với `WHERE MaPB = 'VH'` của bài 1.4; `WHERE` trong câu sửa dữ liệu (bài 5.3, 6.5).
  - Vì sao chuỗi được đổi thành ngày (kiểu `date` được ưu tiên hơn chuỗi); cột có giờ và mốc 00:00; vì sao từ bài này dùng `'20260101'` thay cho `'2026-01-01'`.
  - `!=`; Number Filters, Date Filters; số không có nháy; hoa thường và dấu trên database khóa học; `TrangThai` chỉ có hai giá trị nhưng không có luật giới hạn.
  - Hai khác biệt có điều kiện giữa `WHERE` và AutoFilter.
  - Đoạn "Ở bài này chỉ cần…" nhắc `IN`, `BETWEEN`, mục (Blanks) và collation.
- Câu trả lời cho chị Hạnh nói rõ 13 hồ sơ đang làm, 1 hồ sơ đã nghỉ, và viết lại câu "SQL không tự suy ra…".
- Biên tập: tóm tắt bài, tên sheet chỉ còn `NhanVien`, "Nói gọn lại", LineMap nói thứ tự SQL Server xét và vì sao `'KD'` có nháy mà không cần `N`, Ghi nhớ bỏ dấu `;` trong lời và ghi Date Filters, danh sách kiểm khi ra 0 dòng. Thời gian đọc 25 phút.

Không làm theo:

- Đổi hồ sơ đã nghỉ minh họa để khỏi trùng tên với chị Hạnh: trong KD chỉ có NV020 đã nghỉ; bài luôn gọi bằng mã.
- Ví dụ `'01/10/2026'` ra 4 dòng thay vì 2: đúng là bẫy của bài tập 3, nên nêu ra thì lộ số dòng của đáp án. Hay nhầm dùng `'01/03/2024'` để cho thấy cùng lỗi.
- Thêm bài tập dùng `<`: giữ ba bài tập; phép `<` có trong bảng sáu phép so sánh.
- Nhắc dấu `=` là gán sau `SET` của `UPDATE`: để bài 5.3.

Kiểm tra: `npm test` 218 test qua (test mới cho `rowNumbers`, `preview` và nội dung 2.2 đã thấy đỏ trước khi sửa); `npm run check` 0 lỗi; `npm run build` và `npm run check:dist` qua, 68 trang, 1.345 link. `npm --prefix api run check:exercises` vẫn chưa chạy được vì cần thông tin kết nối SQL.

## 13. Chuyển bài 2.1 và 2.2 sang mạch đã duyệt (21/10/2026)

Người làm khóa học yêu cầu tiếp tục hai bài sau lượt 1.4–1.6. Áp dụng khung gộp Excel/SQL, độ sâu và highlight đã duyệt ở bài 1.1, theo quy ước hiện hành; không đổi thiết kế, component, API, schema frontmatter hay sáu bài tập hiện có. Phạm vi tình huống và hồ sơ công ty giữ nguyên.

- **2.1 — 15 phút:** từ bản Excel gửi Kế toán tới danh sách cột và alias; giữ thứ tự cột, dấu phẩy, ngoặc vuông, alias không đổi nguồn, Copy with Headers và tự đối chiếu tiêu đề bài tập. Giữ câu trả đủ 48 hồ sơ và RunFlow 48 → 48. Rút khuôn cú pháp, LineMap, ví dụ phòng ban có kết quả riêng, các cách viết alias khác và phần sâu về Unicode/sysname/view; tên ngắn của bảng và xử lý biểu thức để bài sau. Lọc alias trong WHERE được giải thích tại bài 2.2.
- **2.2 — 20 phút:** từ AutoFilter tới WHERE, giá trị mã/chữ/ngày và sáu phép so sánh. Giữ hình số dòng 1/3/4/21, dấu ô mã phòng và trạng thái đã nghỉ, ví dụ Unicode/ngày, giới hạn NULL/collation/cột ngày có giờ, lời giải 14 hồ sơ (13 đang làm, 1 đã nghỉ) và RunFlow 48 → 14 → 14. Rút khuôn cú pháp, LineMap và ví dụ lọc KD lặp lại; rút phần sâu về DATEFORMAT, ưu tiên kiểu và nhiều lỗi riêng. Kết hợp điều kiện, sắp xếp và NULL vẫn dẫn sang bài tương ứng.

### Đối chiếu dữ liệu và kiểm thử

Evidence cục bộ: `temp/verification/2026-10-21-2-1-2-2-narrative/`. Các truy vấn minh họa và số liệu được chạy bằng SELECT qua kết nối của API trên máy; không có tool azure-sql trong phiên. Script kiểm mọi ô Excel/Result/RunFlow, tổng dòng, các phép so sánh ngày, bẫy alias/chuỗi, Unicode và NULL. Không dùng SQLite để khẳng định hành vi T-SQL.

Hai slug đã bỏ khỏi danh sách khung cũ; bước RED có lỗi cấu trúc và sáu đoạn nền trên 120 chữ đúng dự kiến. Assertion nội dung cũ được đổi sang bảo vệ kiến thức/giới hạn còn cần, giữ kiểm ngắn đoạn và tính đúng dữ liệu; không thêm ngoại lệ. Bản đầu sau viết đạt 239/239 test, check 0 lỗi/0 warning/3 hint deprecation cũ, build 68 trang và check:dist 1.339 link. API build và 14/14 đáp án đạt; check:data xác nhận không bảng nào lệch sau các câu ghi luôn hoàn tác của bộ kiểm bài tập.

Đã xem bản build ở 1280px và 1440px: mục lục sáu mục, hình Excel và dấu ô, bảng sáu phép so sánh, Result đánh dấu, ba link bài tập mỗi bài; không tràn ngang toàn trang. RunFlow mở bằng Enter, chuyển bước bằng mũi tên và đóng bằng Escape, trả focus đúng thẻ. Bảng rộng/cuộn trong khối giữ hành vi sẵn có.

### Review độc lập và xử lý nhận xét

Hai agent mới, không mang ngữ cảnh lúc viết, đã review riêng từng bài theo vai người học ở mục 4.5 quy ước. Công cụ Codex, model kế thừa phiên, không truyền model/effort khác. Mỗi report có 52 mục:

- `temp/review/2026-10-21-2-1-2-2-narrative/review-bai-2-1-chon-cot-dat-ten-cot.md`.
- `temp/review/2026-10-21-2-1-2-2-narrative/review-bai-2-2-where-loc-nhu-autofilter.md`.

Đã đọc hết hai report trước khi sửa. Reviewer chỉ học và đọc trang, không chạy SQL; các dữ kiện cần thực thi được người viết kiểm bằng evidence SELECT nêu trên, không coi nhận xét giữ được là bằng chứng database.

**Đã sửa:**

- 2.1: thêm điều kiện ô dán là ngày thật trước Format Cells (khớp bài 1.3 và Microsoft); mô tả bộ chấm rõ giữ thứ tự cột, ba bài không yêu cầu thứ tự dòng và không chấm tiêu đề (đối chiếu YAML và `compareResults`). Đổi câu ngoặc vuông sang cách viết theo quy ước, không tuyên bố đó là cách duy nhất. Cắt câu cảnh báo tiêu đề bị lặp và vế chọn cột không lọc dòng ở drawer; số liệu dẫn chứng dùng inline code.
- 2.2: chú thích rõ AutoFilter ẩn dòng không đạt điều kiện, còn hình chỉ trích ba dòng đạt điều kiện, tránh gán mọi khoảng nhảy số cho bộ lọc. Bỏ đối chiếu `(Blanks)` với `IS NULL`, giữ hướng dẫn học NULL tại 2.5; giải nghĩa `yyyymmdd` là năm–tháng–ngày. Cắt vế lịch sử đã nói ở phạm vi, lời không sửa nguồn lặp trong drawer, rút Hay nhầm 5 thành hậu quả. Bớt từ “nhé” lặp, chuẩn hóa WHERE vừa đậm vừa code, số liệu dùng code, đổi ứng dụng thành “lọc hồ sơ”.
- Assertion kiến thức bỏ phụ thuộc kiểu nhấn đậm/code; bổ sung bảo vệ điều kiện Format Cells, thứ tự cột/dòng, định dạng ngày và chú thích hình không hứa quá. Đã thấy RED ở hai test trước sửa rồi GREEN; không đổi giới hạn 120 chữ.

**Không làm theo / giữ nguyên:** không có nhận xét chính còn bị bỏ. Giữ vế danh sách đúng bốn cột/tiêu đề ở lời giải 2.2 (gợi ý cắt tùy chọn mục 34) vì nó khép yêu cầu của chị Hạnh, không giảng lại cú pháp. Không thay YAML, bộ chấm, component hoặc thêm cú pháp ngoài phạm vi; các mục Giữ được giữ theo nội dung phù hợp.

**Kiểm bản cuối:** 239/239 test đạt, không còn lỗi nền đoạn dài ở 2.1/2.2; check 0 lỗi/0 warning/3 hint deprecation cũ; build 68 trang; check:dist đạt 68 trang/1.339 link. Mọi câu Sql, ô Excel/Result/RunFlow và tổng dòng còn khớp SELECT live sau biên tập. Đã đọc lại câu Format Cells/cách chấm 2.1, chú thích Excel/định dạng ngày/NULL 2.2 trên bản render mới, lưu ảnh `2-1-result-final-1280.png` và `2-2-narrative-final-1440.png`; phục hồi viewport trước bàn giao. Log cuối có tiền tố `final-` trong thư mục verification; kiểm API 14/14 và check:data ở trên vẫn áp dụng vì câu lệnh/bài tập không đổi. Không chạy SSMS hoặc Excel thật để chứng nhận thao tác copy/dán; điều kiện Format Cells được đối chiếu tài liệu, không đoán kết quả của một thiết lập máy cụ thể.

Nguồn Microsoft đối chiếu: [SELECT và alias](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-clause-transact-sql?view=sql-server-ver17), [WHERE](https://learn.microsoft.com/en-us/sql/t-sql/queries/where-transact-sql?view=sql-server-ver17), [chuỗi Unicode](https://learn.microsoft.com/en-us/sql/t-sql/data-types/constants-transact-sql?view=sql-server-ver17), [đổi ngày dạng chữ thành ngày trong Excel](https://support.microsoft.com/en-us/excel/convert-dates-stored-as-text-to-dates).


## 14. Bài 2.3 đầy đủ: kết hợp điều kiện (21/10/2026)

Người làm khóa học duyệt thiết kế trong chat: lấy hồ sơ hiện mang mã phòng KD hoặc IT, vào làm sáu tháng đầu năm 2023, kể cả người đã nghỉ nếu có. Chuyển bản tóm tắt thành bài đầy đủ theo chuẩn bài 1.1; thời lượng 25 phút. Lượt này chuẩn bị bản local trên nhánh `codex/lesson-2-3-full`, xuất phát từ `da5ead569e450da743c4dca50622a9ae006aec66`.

### Nội dung và phạm vi

- Phần chính gộp AutoFilter/SQL theo bốn tiểu mục: AND/OR/ngoặc/IN; BETWEEN và LIKE; câu lệnh giải tình huống; RunFlow. Giải nghĩa `%` và `_`, giữ dấu Unicode, phân biệt mẫu chữ với tên người, ngày kiểu date với cột có giờ. Không giảng sâu NULL/collation/NOT hoặc cú pháp bài sau.
- Câu chính dùng IN kết hợp BETWEEN, bốn alias tiếng Việt. Theo script mẫu, kết quả là NV003 và NV043; RunFlow có tổng 48 → 2 → 2. Câu thiếu ngoặc giữ cả NV002 ngoài khoảng ngày. Kết quả không được cam kết thứ tự khi chưa có ORDER BY.
- Thêm bốn bài tập chỉ đọc: nhóm KD/VH đang làm; KT/NS trong khoảng có hai đầu mút; họ tên chứa Thị; mã NV04 rồi đúng một ký tự. Không lộ đáp án trên web; bộ chấm vẫn chấp nhận cách viết tương đương.
- Cập nhật hồ sơ công ty, README và catalog kỳ vọng. Test drawer chọn một bài summary theo loại thay vì cố định 2.3 vì bài này đã chuyển full. Không đổi component, CSS, API/bộ chấm hoặc dữ liệu.

### Kiểm chứng và giới hạn thực tế

- Baseline 239/239 test. RED xác nhận bài chưa full, chưa có Result/RunFlow và chưa có bốn bài tập. Sau viết, 242/242 test đạt; kiểm kiểu web 0 lỗi/0 warning/3 hint deprecation có sẵn. API build đóng gói 18 bài tập, API typecheck đạt. Web build 72 trang; check:dist đạt 1.379 link, không lộ đáp án.
- `temp/verification/2026-10-21-2-3-full/source-evidence.json`: đọc INSERT và luật gán quản lý trong script mẫu, đối chiếu mọi ô Excel/Result/RunFlow, tổng 48/2/2 và các ví dụ. Bộ lọc thiếu ngoặc giữ 15 hồ sơ; bốn bài tập dự kiến 21/6/22/9 dòng. Bài tập khoảng ngày có hồ sơ ở cả hai đầu mút. Đây là kiểm fixture bằng JavaScript, không phải thực thi T-SQL hoặc chứng nhận dữ liệu live.
- `check:exercises` đã thử nhưng dừng trước khi kết nối vì thiếu SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD. Không có MCP azure-sql, file cấu hình hay các biến kết nối trong phiên. Chưa chạy live các ví dụ/đáp án hoặc check:data, không có câu ghi nào được gửi tới database. Cần hoàn tất bước live trước khi coi bài đủ quy trình để đăng.
- HTML build có đúng sáu mục, bốn link/trang bài tập, ba thẻ và ba panel RunFlow, bốn ô Excel đánh dấu (`html-evidence.json`). Chưa xác minh hình ảnh 1280/1440px, tràn ngang hoặc bàn phím: Playwright thiếu browser và tải Chrome nhận zip không hợp lệ; browser cloud sau đó timeout và bị gỡ khỏi phiên. Không dùng kiểm HTML để tuyên bố đã kiểm trực quan.
- Đối chiếu tài liệu Microsoft về [ưu tiên AND/OR](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/operator-precedence-transact-sql?view=sql-server-ver17), [IN](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/in-transact-sql?view=sql-server-ver17), [BETWEEN](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/between-transact-sql?view=sql-server-ver17), [LIKE](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/like-transact-sql?view=sql-server-ver17) và [AutoFilter](https://support.microsoft.com/en-us/excel/get-started/filter-data-in-a-range-or-table-in-excel). Không thử Excel hay SSMS thật.

### Review độc lập

Reviewer Codex độc lập, không kế thừa lịch sử viết, dùng model kế thừa phiên; chỉ đọc bài/các bài trước, quy ước/hồ sơ và HTML build, không đọc script hay chạy SQL. Report của lượt ở `temp/review/2026-10-21-2-3-full/`. Đã đọc hết report trước khi sửa. Bản report được giữ tại [docs/reviews/2026-10-21-bai-2-3.md](../../reviews/2026-10-21-bai-2-3.md).


**Đã sửa sau review:**

- Định nghĩa `%` thành “từ 0 ký tự trở lên” ở phần giảng và Ghi nhớ, bao gồm rõ trường hợp đúng một ký tự.
- Đổi “mẫu chỉ xét chữ” thành “mẫu so khớp chuỗi ký tự”; bỏ vế diễn lại mẫu Nguyễn%.
- Cắt câu nhắc lại phạm vi kiểu date và mục Hay nhầm về xuống dòng/ngoặc đã có đủ ở phần chính. Giữ ba lỗi riêng còn lại; không thêm nội dung bù.
- Làm rõ hình Excel dùng sheet xếp theo mã trước khi lọc để số dòng 4/44 có căn cứ. Không đổi SQL, ô dữ liệu hay bốn đề bài tập.

**Không làm theo:** không có nhận xét cần loại bỏ. Những mục Giữ được được giữ nguyên. Các yêu cầu SQL live và kiểm trực quan/bàn phím vẫn là phần xác minh còn thiếu do giới hạn môi trường, không coi reviewer hoặc test fixture là bằng chứng thay thế.


**Kiểm bản cuối sau review:** 242/242 test, check 0 lỗi/0 warning/3 hint deprecation có sẵn, build 72 trang, check:dist đạt 1.379 link. Log `final-*.log` trong thư mục verification của lượt. Bộ test component có cảnh báo placeholder collection như baseline, không phải test thất bại. Source-fixture kiểm lại toàn bộ ô vẫn khớp; không đổi SQL/YAML nên API build/typecheck trước đó còn áp dụng. Chưa có xác minh SQL live hoặc browser; không push/deploy.


## 15. Bài 2.4 đầy đủ: sắp xếp và TOP (21/10/2026)

Người làm khóa học duyệt khung ngắn trong chat. Bản local ở `codex/lesson-2-4-full`, xuất phát từ commit bài 2.3 `b98cacd1e1793465902fb2b0c5ea84d8508e3fad`; chỉ bổ sung bài 2.4 và tài liệu/test liên quan, không sửa lại bài 2.3 hoặc đổi UI/API.

### Nội dung

- Bài 20 phút theo khung gộp, bốn tiểu mục chính: Sort/ORDER BY nhiều cột; WHERE/TOP/alias; câu lệnh và lời giải; RunFlow. Tình huống lấy tối đa năm hồ sơ hiện Đang làm, mọi phòng/mọi năm, NgayVaoLam DESC rồi MaNV ASC. Không đồng nhất ngày vào làm với ngày nhập hồ sơ hoặc ngày chuyển phòng.
- Giải nghĩa ASC/DESC theo từng cột, thứ tự xét nhiều cột và mã khóa chính để chốt trường hợp trùng ngày; TOP tối đa N, thiếu ORDER BY không chốt nhóm, lọc trước lấy TOP. ORDER BY không đổi giá trị hay lưu thứ tự vào bảng nguồn. Giữ điều kiện dữ liệu không đổi khi nói thứ tự xác định; không thêm WITH TIES/phân trang.
- Excel minh họa thu gọn bốn hồ sơ thật, tô C4/D4/C5/D5 cho NV029 IT đứng trước NV047 NS dù ngày cũ hơn. Câu chính có bốn alias; kết quả theo script là NV048/NV047/NV046/NV045/NV044, tô dòng đầu/cuối. RunFlow 48 → 45 → 45 → 45 → 5, ORDER BY trích 10 dòng đầu và không làm bớt dòng.
- Ba bài tập đều `ordered: true`: KT/NS theo phòng/ngày/mã, tối đa ba hồ sơ IT đang làm mới nhất, tối đa bốn hồ sơ KT đang làm sớm nhất. Đề nói rõ vị trí cột và thứ tự dòng. Giữ API/bộ chấm hiện có; cập nhật catalog full, README và hồ sơ công ty.

### Review độc lập và xử lý

Agent Codex mới, không mang ngữ cảnh lúc viết, kế thừa model của phiên và không override; chỉ đọc bài/các bài trước, quy ước/hồ sơ và HTML build, không đọc script hoặc chạy SQL. [Bản report 10 mục](../../reviews/2026-10-21-bai-2-4.md) được đọc hết trước khi sửa.

**Đã sửa:** thêm “WHERE nếu có” để không khiến người học nghĩ sắp xếp luôn cần bộ lọc; đổi tiêu đề bài tập 2 để không hiểu NgayVaoLam là ngày vào/chuyển phòng IT; sửa câu dẫn bài tập thành không thêm giới hạn/điều kiện ngoài đề; cắt câu logic/vật lý lặp trước RunFlow. Không đổi câu SQL hoặc dữ liệu sau review. **Không làm theo:** không có nhận xét cần loại; các mục Giữ được giữ nguyên.

### Kiểm chứng và giới hạn

- Baseline 242/242 test; RED thấy bài chưa full, chưa có Result/RunFlow và ba bài tập. Bản trước review 244/244 test; web check 0 lỗi/0 warning/3 hint deprecation có sẵn, build 75 trang, check:dist 1.409 link. API build 21 bài tập và API typecheck đạt.
- Fixture đọc từ INSERT và luật quản lý của script HRM_Demo: 48 hồ sơ/45 đang làm, năm mã mới nhất nêu trên; ba bài tập dự kiến 12/3/4 dòng. Kiểm thứ tự bài tập gọi bộ so kết quả thật với `ordered: true` và xác nhận đảo thứ tự bị chấm sai. Đây không phải thực thi SQL Server hoặc chứng nhận collation.
- `check:exercises` đã thử và dừng trước kết nối vì thiếu SQL_SERVER/SQL_DATABASE/SQL_USER/SQL_PASSWORD. Phiên không có file/biến kết nối hoặc MCP azure-sql. Chưa chạy SELECT/đáp án live, không chạy check:data vì không có kết nối và không có câu ghi nào được gửi tới database.
- Browser cloud tiếp tục timeout ngay khi mở tab dù gọi có giới hạn 10 giây; chưa kiểm trực quan 1280/1440px, tràn ngang hoặc bàn phím. HTML build và test cấu trúc không thay thế xác minh tương tác. Không lặp lại các thử mở browser sau lỗi này.
- Đối chiếu Microsoft: [ORDER BY](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql?view=sql-server-ver17), [TOP](https://learn.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql?view=sql-server-ver17), [thứ tự logic SELECT](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql?view=sql-server-ver17), [Sort trong Excel](https://support.microsoft.com/en-us/excel/sort-data-in-a-range-or-table-in-excel). Không thử SSMS hay Excel thật. Evidence và log nằm ở `temp/verification/2026-10-21-2-4-full/`.

**Kiểm bản cuối sau review:** 244/244 test (29 file); web check 0 lỗi/0 warning/3 hint deprecation có sẵn, build 75 trang và check:dist 1.409 link. `source-evidence.json` đối chiếu đủ 180 ô Excel/Result/RunFlow với INSERT và luật quản lý, kiểm tổng 48 → 45 → 45 → 45 → 5 cùng ba tập bài tập 12/3/4 dòng. `html-evidence.json` xác nhận sáu mục, năm thẻ/năm panel, bốn ô Excel và hai dòng Result đánh dấu, đủ ba link/trang đề; tiêu đề bài tập 2 sau sửa đã có trong HTML. File `pending-live-selects.sql` gom SELECT để kiểm live sau. Các kiểm fixture/HTML không thay thế SQL Server và browser. API không đổi sau lần build/typecheck đạt.

Bản soạn local để review, cần kiểm live SQL và browser trước khi coi đủ toàn bộ quy trình đăng bài; không push/deploy trong lượt này.


## 16. Bài 2.5 đầy đủ: NULL, lọc và hiển thị giá trị thiếu (21/10/2026)

Người làm khóa học duyệt khung ngắn trong chat. Thực hiện trong clone riêng, nhánh local `codex/lesson-2-5-full`; gốc là snapshot bài 2.4 `e606869` (chỉ commit local để giữ bản đã bàn giao), nối từ bài 2.3 `b98cacd`. Checkout bài 2.4 được giữ nguyên. Không push/deploy.

### Phạm vi đã duyệt và bản soạn

- Bài 25 phút, sáu mục theo khung gộp; bốn tiểu mục trong phần chính. Tháng 10/2026, chị Hạnh cần toàn bộ hồ sơ Email NULL ở mọi phòng/trạng thái, bốn cột có tiêu đề tiếng Việt, mã tăng dần; nhãn `(chưa có)` chỉ trong kết quả. Bộ mẫu có NV044/VH và NV045/KD. Không kết luận hai người không có địa chỉ ngoài hệ thống.
- Phân biệt NULL/0/chuỗi rỗng/dấu cách và chữ 'NULL'; ý nghĩa tùy quy ước như NgayNghiViec NULL. Excel thu gọn bốn hồ sơ và giả định rõ cách xuất NULL thành ô trống, tô D3/D4; không đồng nhất mọi ô trống với NULL.
- IS NULL/IS NOT NULL, so sánh = hoặc <> NULL là UNKNOWN và WHERE chỉ giữ TRUE; không dạy bảng chân trị đầy đủ/NOT IN. COALESCE lấy ứng viên đầu khác NULL, không thay chuỗi rỗng; ISNULL nhận hai đầu vào và giữ kiểu/độ dài khi đầu vào đầu là cột. Dùng COALESCE với chuỗi N để giữ nhãn Unicode cho Email varchar(100), giữ test bảo vệ cũ.
- Phép cộng số 10 + NULL so với thay bằng 0, không dùng ví dụ tiền; không coi chưa biết là bằng 0. RunFlow 48 → 2 → 2 → 2: FROM/WHERE giữ dữ liệu gốc, SELECT tạo nhãn, ORDER BY chốt thứ tự.
- Ba đề `ordered: true`: NgayNghiViec khác NULL (3 dòng theo script), KT có Email khác NULL (7 dòng), toàn bộ VH có nhãn cho Email NULL (10 dòng, chỉ NV044 nhận nhãn). Không đổi component/CSS/API/bộ chấm/database, không lộ câu đáp án trên trang. Cập nhật hồ sơ công ty/README/catalog.

### Kiểm ban đầu

- Baseline 244/244 test. RED có hai lỗi đúng dự kiến: catalog chưa full và chưa có RunFlow. Sau viết, schema bắt shortTitle NULL không có nháy bị YAML đọc thành null; đã xác minh parse và sửa thành chuỗi có nháy, không nới schema/test. Bản đầu sau sửa 245/245 test, web check 0 lỗi/0 warning/3 hint deprecation có sẵn; build 78 trang, check:dist 1.439 link. API build 24 bài tập, API typecheck đạt.
- Evidence ở `temp/verification/2026-10-21-2-5-full/`: đối chiếu ô hình/kết quả/sơ đồ với INSERT và luật quản lý, kiểm tập bài tập 3/7/10. `pending-live-selects.sql` gom các SELECT cần chạy sau; kiểm fixture không phải thực thi T-SQL. Câu scalar và kiểu Unicode mới chỉ đối chiếu tài liệu, chưa chứng nhận live.
- `check:exercises` dừng trước kết nối vì thiếu SQL_SERVER/SQL_DATABASE/SQL_USER/SQL_PASSWORD. Không có file/biến kết nối hoặc MCP azure-sql; chưa chạy SELECT/đáp án/check:data live. Không gửi câu ghi nào tới database.
- Máy không có Chrome/Chromium hoặc cache Playwright; không thử lại browser cloud đã treo ở các lượt trước. Chưa kiểm trực quan 1280/1440px, tràn ngang hay bàn phím. Kiểm HTML không thay kiểm giao diện.
- Nguồn Microsoft đã đối chiếu: [NULL và UNKNOWN](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/null-and-unknown-transact-sql?view=sql-server-ver17), [IS NULL](https://learn.microsoft.com/en-us/sql/t-sql/queries/is-null-transact-sql?view=sql-server-ver17), [ISNULL](https://learn.microsoft.com/en-us/sql/t-sql/functions/isnull-transact-sql?view=sql-server-ver17), [COALESCE](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/coalesce-transact-sql?view=sql-server-ver17), [xử lý NULL](https://learn.microsoft.com/sql/connect/ado-net/sql/handle-null-values?view=sql-server-ver17), [lọc ô trống Excel](https://support.microsoft.com/en-us/excel/get-started/filter-data-in-a-range-or-table-in-excel), [IF kiểm ô trống](https://support.microsoft.com/vi-vn/excel/using-if-to-check-if-a-cell-is-blank). Không thử SSMS/Excel thật.

### Review và kiểm bản cuối

Reviewer độc lập mới, không mang lịch sử viết, kế thừa model của phiên Codex và không override; chỉ đọc bài/các bài trước, tài liệu nội bộ và HTML, không đọc seed, review cũ hay chạy database. Đã đọc hết [report 40 mục](../../reviews/2026-10-21-bai-2-5.md) trước khi sửa; giữ bản gốc tại `temp/review/2026-10-21-2-5-full/`.

**Đã sửa:**

- Mục 21/30: dẫn chuyển kiểu về bài 1.3, giữ 2.8 là hàm ngày; đổi lỗi “dùng ISNULL trong WHERE” thành nhầm hàm trả giá trị với phép kiểm IS NULL, không dạy thành lệnh cấm vị trí.
- Mục 18: thêm một vế vì cặp varchar/nvarchar ở COALESCE này ưu tiên kiểu nvarchar của nhãn khi chuyển kiểu ngầm. Đối chiếu Microsoft COALESCE phần Return types/Compare COALESCE and ISNULL và khai báo Email varchar(100) trong seed; chưa xác minh metadata live. Giữ giới hạn ISNULL khi đầu vào đầu là cột; không mở rộng bảng ưu tiên kiểu.
- Mục 11/12/24/32: cắt câu xuất/import lặp, cảnh báo chất lượng lặp, đoạn nhãn/nguồn lặp trong lời giải và vế giảng lại quy ước ngày nghỉ ở Hay nhầm. Giữ hành động người phụ trách và hậu quả điền ngày giả.
- Mục 01/04/40: mục tiêu gọi rõ chuỗi rỗng/dấu cách, đổi “Email bằng NULL” thành “Email là NULL”, đặt nhãn nguyên văn trong dấu nháy ở đề 3. Không chèn Markdown vào prompt văn bản thuần, không sửa renderer.

**Không làm theo:** không có nhận xét cần loại. Giới hạn prompt chưa có định dạng code riêng được giữ theo phạm vi không đổi UI; không coi văn bản thuần là đã được định dạng như MDX. Những mục Giữ được giữ nguyên. Không đổi SQL hoặc ô dữ liệu sau review; chỉ đổi một nhãn yêu cầu trong prompt. Live SQL và browser vẫn là phần chưa xác minh.


## Bổ sung bài 2.6–2.9 — khung duyệt ngày 21/10/2026

Người làm khóa học duyệt chung khung bốn bài trong hội thoại. Giữ bố cục gộp đã duyệt, mỗi bài ba bài tập, review độc lập và branch riêng nối tiếp từ bài 2.5. Không sửa UI/API hay dữ liệu mẫu.

- **2.6:** danh sách mã phòng xuất hiện trong hồ sơ; DISTINCT một/nhiều cột, độ chi tiết của dòng và giới hạn bỏ trùng. Phần đếm dành cho bài 3.1.
- **2.7:** danh sách ký nhận có nhãn mã–họ tên; hàm cắt/ghép/độ dài/TRIM/hoa thường, Unicode và tìm không dấu bằng collation. Không suy tên riêng từ từ cuối.
- **2.8:** hợp đồng hết hạn từ 21/10/2026 đến mốc sau 30 ngày, ngày sinh, EOMONTH và ranh giới DATEDIFF; phân biệt với số năm thâm niên tròn.
- **2.9:** người đang làm chia nhóm dưới một năm, từ một đến dưới ba năm, từ ba năm trở lên tại 21/10/2026; CASE trả giá trị, thứ tự WHEN, ELSE và NULL.

### Bài 2.6 — phạm vi triển khai

Branch `codex/lesson-2-6-full` nối tiếp `codex/lesson-2-5-full`. Bài/exercises/test riêng; README, hồ sơ công ty và catalog cập nhật khi chuyển bài thành full. Đối chiếu nguồn độc lập có 48 hồ sơ, 6 mã phòng và 19 cặp phòng/chức danh. Đây là đọc script, không phải thực thi SQL Server. Chưa có cấu hình SQL live hoặc browser hoạt động trong phiên; kiểm tra tĩnh không thay kiểm tương tác. Kết quả kiểm tra và xử lý review được ghi sau khi hoàn tất.


### Bài 2.6 — xử lý review và kiểm bản cuối

Review độc lập Codex, kế thừa model phiên, không mang lịch sử viết; bản gốc giữ ở temp/review/2026-10-21-2-6-2-9-doc-lap và bản bàn giao ở [docs/reviews/2026-10-21-bai-2-6.md](../../reviews/2026-10-21-bai-2-6.md).

**Đã sửa:** mục 2 thêm điều kiện phòng chưa có hồ sơ; mục 3 gọi đúng bỏ dòng trùng trong vùng Excel; mục 15 giải thích vì sao ngày của nhiều hồ sơ không còn là một giá trị sắp cho mỗi mã phòng; mục 23 nêu điều kiện DISTINCT che hồ sơ nhập lặp khi không chọn mã; mục 25 làm rõ mục đích đối chiếu chức danh; mục 28 đặt khóa chính ở bảng nguồn. Không đổi SQL, ô dữ liệu hoặc đề bài.

**Không làm theo:** không có; các mục Giữ được giữ nguyên. Không mở rộng COUNT hay UI/API. Kết quả local cuối ghi sau lệnh kiểm; SQL Server thực tế và browser vẫn chưa xác minh.

**Kiểm bản cuối 2.6:** 247/247 test; Astro check 0 lỗi, 0 warning, 3 hint deprecation có sẵn; web build 81 trang; check:dist 1.469 link. API build 27 bài tập, typecheck đạt. Đối chiếu nguồn 80 ô, flow 48→48→6→6, bài tập 6/7/2 dòng. check:exercises đã thử và dừng trước kết nối vì thiếu SQL_SERVER/SQL_DATABASE/SQL_USER/SQL_PASSWORD. HTML tĩnh đã review; chưa kiểm SQL live, giao diện hay bàn phím. Không push/deploy.
