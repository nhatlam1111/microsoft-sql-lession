# Thiết kế đợt 2: sơ đồ thứ tự chạy, bài tập chạy trên web, bài đầy đủ

- Ngày: 2026-10-18
- Trạng thái: đã duyệt ngày 2026-10-18
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
  - Bên trái là đề bài: yêu cầu, các cột cần ra, có cần sắp xếp không, gợi ý mở dần từng cái, đáp án.
  - Bên phải là khung soạn SQL tô màu kiểu SSMS; bên dưới là tab Results và Messages giống SSMS.
- Nút "Chạy" (phím F5 như SSMS, hoặc Ctrl+Enter): chạy và hiện kết quả, không chấm.
- Nút "Nộp bài": chấm rồi báo đúng, hoặc báo sai kèm lý do cụ thể (khác số dòng, khác số cột, dòng thứ mấy khác) mà không lộ đáp án.
- Đáp án mở được sau lần nộp đầu tiên.
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
- Mỗi bài Level 1 có 2–4 bài tập thật, từ dễ đến khó, trên `HRM_Demo`. Bài 1.1 được bổ sung bài tập. Bài nào có câu lệnh từ 2 bước trở lên thì có sơ đồ.
- Bài tập Level 1 chỉ dùng câu truy vấn, đúng phạm vi level.
- Bài 1.2 giữ nội dung đã định (SSMS, Object Explorer, chạy script `HRM_Demo`) và thêm phần giới thiệu trang làm bài tập trên web.
- Mọi câu lệnh, kết quả và đáp án được kiểm qua MCP chỉ đọc.
- Xong Level 1 thì người làm khóa học duyệt, rồi mới làm Level 2.

## 7. Những quyết định mình tự đặt (bạn xem lại khi đọc)

1. (Đã duyệt qua mockup.) Sơ đồ xếp 3 thẻ mỗi hàng theo hình chữ chi; thẻ có bảng xem trước tối đa 3 dòng × 3 cột; màu theo web chứ không theo 8 màu của ảnh.
2. Drawer của sơ đồ đè lên cột phải của trang bài, cùng kiểu với drawer trên mindmap.
3. Sơ đồ đặt dưới tiêu đề cấp 3 trong mục "Làm bằng SQL"; bài đầy đủ vẫn giữ đúng 7 mục.
4. Mỗi bài tập có một trang riêng; phím F5 để chạy như SSMS.
5. Đáp án mở được sau lần nộp đầu tiên.
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

- Đổi `MCP_ALLOW_WRITE` về `false` trong `.env`, hoặc bảo người dựng đổi.
- ~~Trả lời câu hỏi ở mục 8.~~ Đã trả lời.
- Sau bản chạy thử, theo spec B: tạo Function App, tạo tài khoản SQL cho API theo script người dựng đưa, đặt mã truy cập.
