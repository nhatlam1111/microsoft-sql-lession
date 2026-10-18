# Thiết kế phần C, đợt Level 1: viết đầy đủ các bài Level 1

- Ngày: 2026-10-18
- Trạng thái: chờ người làm khóa học duyệt.
- Nối tiếp: [spec đợt 2, mục 6](2026-10-18-step-flow-exercises-full-lessons-design.md) (phần C), [spec đợt 1, mục 4.5 và 4.7](2026-10-17-sql-server-course-site-design.md) (khuôn bài và giọng văn), [spec B](2026-10-18-exercise-runner-design.md) (bài tập trên web). Chỗ nào spec này ghi khác các spec đó thì theo spec này.
- Web: https://nhatlam1111.github.io/microsoft-sql-lession/

## 1. Mục đích

Học viên tự học là chính. Học xong Level 1, học viên biết dữ liệu nhân sự nằm ở đâu và tự mở ra đọc được. Cụ thể là:

- kết nối được máy chủ của khóa học bằng SSMS;
- đọc được bảng, cột, kiểu dữ liệu, khóa và sơ đồ quan hệ của `HRM_Demo`;
- tự viết, chạy được câu `SELECT` đầu tiên;
- làm được bài tập trên web.

Hiện chỉ bài 1.1 là bài đầy đủ; 1.2–1.6 còn là bản tóm tắt.

## 2. Đã chốt với người làm khóa học (2026-10-18)

1. Viết đầy đủ 1.2, 1.3, 1.4, 1.5, 1.6. Bài 1.1 đã đầy đủ, chỉ sửa theo khuôn mới ở mục 3.
2. Bài tập chạy SQL bắt đầu từ bài 1.6, khi học viên đã viết được câu `SELECT`. Bài 1.1–1.5 **bỏ hẳn mục "Bài tập"**, không có tiêu đề, không có dòng nào. Điều này thay cho spec đợt 2, vốn ghi mỗi bài Level 1 có 2–4 bài tập và bài 1.1 được thêm bài tập.
3. Mục "Làm bằng SQL" theo khuôn mới (mục 3.2), bỏ các tiểu mục "Bước 1, Bước 2…", vì phần đi từng bước đã nằm trong drawer của sơ đồ thứ tự chạy. Đã duyệt qua mockup [`lam-bang-sql-layout.html`](2026-10-18-mockups/lam-bang-sql-layout.html) (mảnh HTML, mở bằng trình duyệt sẽ thiếu khung), lấy bài 3.5 làm ví dụ.
4. Học viên kết nối SSMS thẳng vào database `sql-lession` trên Azure, bằng tài khoản người làm khóa học cấp. Tài khoản, quyền của tài khoản và tường lửa là việc của người làm khóa học; bài học và người dựng không đặt giới hạn gì thêm cho tài khoản đó.
5. Các đề xuất sau của người dựng đã được đồng ý:
   - bài 1.2 dạy kết nối vào máy chủ khóa học (mục 4);
   - đổi tên database hiển thị cho khớp SSMS (mục 5.2);
   - hình SSMS vẽ bằng HTML (mục 5.3);
   - bài 1.6 có 3 bài tập và sơ đồ thứ tự chạy;
   - sửa bài 1.1 và 3.5 theo khuôn mới;
   - thêm file khung bài `docs/lesson-template.md`.

## 3. Khuôn bài đầy đủ (thay cho spec đợt 1 mục 4.5)

### 3.1 Thứ tự các mục

Tên mục giữ nguyên:

1. Tình huống
2. Với Excel
3. Làm bằng SQL
4. Hay nhầm ở đâu
5. Ứng dụng
6. Ghi nhớ
7. Bài tập

Mục "Bài tập" chỉ có ở bài có bài tập, hoặc ở bài sẽ có bài tập. Với Level 1, chỉ bài 1.6 có mục này. Các bản tóm tắt từ Level 2 trở đi vẫn giữ mục "Bài tập" với dòng "Phần bài tập sẽ bổ sung sau." cho tới khi được viết đầy đủ.

Phần đầu bài và cuối bài không đổi: nhãn level, mã bài, thời gian đọc, "Cần biết trước", "Học xong bài này"; nút "Đã học xong", nút "Cắm cờ", thẻ bài trước và bài sau.

### 3.2 Mục "Làm bằng SQL"

Ba phần, theo thứ tự, mỗi phần là một tiểu mục cấp 3:

1. **Lý thuyết cơ bản** của khái niệm trong bài:
   - một câu nói khái niệm là gì;
   - cú pháp chung, chỗ cần điền viết bằng chữ (ví dụ "bảng bên trái", "điều kiện ghép");
   - một ví dụ nhỏ vài dòng, cho thấy dữ liệu vào và dữ liệu ra;
   - bảng "từng phần nghĩa là gì" (khối `LineMap`), nói nghĩa của từng từ khóa và liên hệ với Excel khi có.
2. **Câu lệnh cho tình huống:** câu SQL đầy đủ giải đúng yêu cầu ở mục Tình huống, ngay dưới là bảng kết quả cuối (hoặc tab Messages), để học viên thấy đáp án của tình huống trước khi xem từng bước.
3. **SQL Server chạy câu này thế nào:** sơ đồ thứ tự chạy (`RunFlow`), mỗi thẻ có drawer giải thích bước đó. Chỉ có khi câu lệnh có từ 2 bước xử lý trở lên.

Bài chỉ có khái niệm, chưa có câu truy vấn nhiều bước (1.2–1.5), thì "Làm bằng SQL" chủ yếu là phần lý thuyết. Có thể kèm một câu lệnh minh họa ngắn, không có sơ đồ.

Bài 6.5 (UPDATE quên WHERE) nói về các bước xử lý sự cố chứ không phải một câu truy vấn, nên giữ nguyên cách viết hiện tại.

### 3.3 Quy tắc viết

Giữ đúng spec đợt 1 mục 4.7. Thêm hai điều:

- Ở Level 1, bài học không bảo học viên chạy trong SSMS câu nào làm đổi dữ liệu (`INSERT`, `UPDATE`, `DELETE`). Ví dụ có câu sửa dữ liệu, như lỗi khi xóa phòng ban ở bài 1.4, thì chỉ đưa ra để đọc: "nếu chạy câu này, SQL Server báo…". Lý do: mọi học viên dùng chung một database.
- Lời giải thích trong drawer của sơ đồ xoay quanh từ khóa của bước đó, như bài 3.5.

## 4. Nội dung từng bài

| Bài | Nội dung chính | Sơ đồ | Bài tập |
|---|---|---|---|
| 1.1 Database là gì | Giữ nội dung. Sắp lại "Làm bằng SQL" theo mục 3.2 (lý thuyết: workbook ↔ database, sheet ↔ bảng, dòng ↔ bản ghi; câu `SELECT TOP (5)` minh họa). Bỏ mục "Bài tập". | Không | Không |
| 1.2 SQL Server, SSMS và HRM_Demo | Server, database, bảng. Kết nối bằng SSMS vào máy chủ khóa học (mục 4.1). Object Explorer; New Query; ô chọn database trên thanh công cụ; F5. Giới thiệu trang làm bài tập trên web (mục 4.2). Phần thêm: tự có bản riêng bằng script `HRM_Demo.sql` trên SQL Server cài ở máy. | Không | Không |
| 1.3 Bảng, cột và kiểu dữ liệu | `INT`, `DECIMAL`, `NVARCHAR`, `VARCHAR`, `DATE`, `BIT`, lấy từ cột thật của `HRM_Demo`; xem kiểu ở Object Explorer, mục Columns; vì sao ngày và tiền không còn lệch kiểu như Excel; `NVARCHAR` và chữ `N` trước chuỗi tiếng Việt. | Không | Không |
| 1.4 Khóa chính, khóa ngoại | Khóa chính (`NhanVien.MaNV`, khóa hai cột `ChamCong(MaNV, Ngay)`), khóa ngoại (`NhanVien.MaPB` → `PhongBan`); lỗi khi xóa phòng ban còn nhân viên, đưa nguyên văn thông báo lỗi của SQL Server ở dạng đọc. | Không | Không |
| 1.5 Đọc sơ đồ quan hệ (ERD) | Quan hệ một-nhiều trong `HRM_Demo`; `NhanVien` nằm giữa; `MaQuanLy` trỏ về chính `NhanVien`; muốn lấy dữ liệu nào thì đi qua những bảng nào. Dùng lại sơ đồ đang có ở trang bài tập. | Không | Không |
| 1.6 Câu SELECT đầu tiên | `SELECT *`, `TOP (n)` để xem nhanh; chạy bằng F5; bôi đen một đoạn thì chỉ chạy đoạn đó; tab Results và Messages. Câu cho tình huống: `SELECT TOP (10) * FROM NhanVien` hoặc tương tự. | Có: FROM → SELECT → TOP | 3 |

### 4.1 Kết nối SSMS vào máy chủ khóa học (bài 1.2)

- Server name: `sql-lession.database.windows.net`.
- Authentication: SQL Server Authentication; tên đăng nhập và mật khẩu do người phụ trách khóa học cấp.
- Ghi tên database `sql-lession` vào ô chọn database của hộp kết nối: ở SSMS 20 trở về trước là Options → tab Connection Properties → "Connect to database"; bản mới hơn có thể đặt ô này ngay trên hộp kết nối. Người dựng kiểm theo tài liệu của Microsoft cho bản SSMS mới nhất lúc viết, và bài ghi rõ bản SSMS đang tả. Bước này bắt buộc với tài khoản tạo riêng trong database; bỏ qua là không đăng nhập được. Bài nói rõ triệu chứng khi quên bước này (thông báo lỗi đăng nhập), nguyên văn lấy từ SSMS hoặc từ tài liệu của Microsoft.
- Sau khi vào: Object Explorer → Databases → `sql-lession` → Tables có 7 bảng `dbo.*`.

### 4.2 Trang làm bài tập trên web (bài 1.2)

Giới thiệu ngắn, để tới bài 1.6 học viên biết dùng:

- mã truy cập xin ở người phụ trách khóa học, nhập một lần;
- "Chạy (F5)" chỉ chạy và xem kết quả, "Nộp bài" thì chấm;
- nút "Sơ đồ database";
- mọi lần chạy đều được hoàn tác, dữ liệu mẫu không đổi.

### 4.3 Bài tập bài 1.6

- 3 bài truy vấn, đúng phạm vi bài: `SELECT *` (chưa có chọn cột, `WHERE` hay `ORDER BY`). Vì phạm vi hẹp, ba bài không khó dần về cú pháp mà mỗi bài một bảng khác, để học viên quen tên bảng và đọc kết quả: một bảng nhỏ, một bảng có ô `NULL`, một bảng có cột ngày hoặc tiền.
- Bài tập có chấm điểm không dùng `TOP` khi không có `ORDER BY`. Không có `ORDER BY` thì không chắc ra đúng những dòng đó, và bài 2.4 mới dạy rằng `TOP` luôn đi cùng `ORDER BY`.
- Chấm theo spec B. Đề không yêu cầu sắp xếp (`ordered: false`).

## 5. Thay đổi trên web

### 5.1 Mục "Bài tập"

- Bài 1.1–1.5 không có mục "Bài tập".
- Test về tiêu đề mục đổi theo: bài đầy đủ có đúng 6 mục đầu theo thứ tự, mục "Bài tập" đứng cuối khi bài có mục này.
- Mục lục bên phải của trang bài và các link tới mục "Bài tập" (nếu có) không được trỏ vào mục không tồn tại; `check:dist` vẫn phải sạch.

### 5.2 Tên database hiển thị

Học viên kết nối vào database tên `sql-lession`, nên chữ "HRM_Demo" ở những chỗ đặt cạnh SSMS đổi thành `sql-lession`:

- dòng trạng thái dưới khối kết quả (`Result`) và khối `Messages` trong bài;
- dòng trạng thái trên trang làm bài tập.

"HRM_Demo" vẫn là tên của bộ dữ liệu mẫu: tên bài 1.2, script `HRM_Demo.sql`, popup "Sơ đồ HRM_Demo", trang Giới thiệu. Bài 1.2 giải thích: bộ dữ liệu mẫu HRM_Demo nằm trong database `sql-lession` trên máy chủ khóa học; ai tự cài trên máy thì đặt tên database là `HRM_Demo`.

### 5.3 Hình SSMS vẽ bằng HTML

Bài 1.2 (và 1.3, 1.6 khi cần) có khối mô phỏng SSMS, cùng tinh thần với khối Excel: đủ giống để học viên nhận ra trên máy mình, không cần giống từng điểm ảnh. Tối thiểu gồm:

- hộp Connect to Server, có tab Connection Properties;
- cây Object Explorer (Databases → `sql-lession` → Tables → `dbo.NhanVien` → Columns, có kiểu dữ liệu và khóa);
- thanh công cụ có nút New Query, ô chọn database và nút Execute.

Không dùng ảnh chụp. Người làm khóa học gửi ảnh chụp thật thì thay vào sau.

### 5.4 Sơ đồ quan hệ trong bài 1.5

Dùng lại cách vẽ sơ đồ của popup "Sơ đồ database" (hộp bảng, cột, nhãn PK/FK, đường nối), đặt thẳng trong bài, không cần bấm mở popup.

### 5.5 Tài liệu

- Thêm `docs/lesson-template.md`: khung bài đầy đủ chép ra là viết được. Có phần đầu file, các mục theo mục 3, đoạn mẫu cho từng khối (`Chat`, `Key`, `Excel`, `Sql`, `Result`, `Messages`, `LineMap`, `RunFlow`, `Mistakes`, `Apply`, `Memo`, `Exercises`, khối SSMS mới) và các quy tắc viết. README trỏ tới file này.
- Sửa spec đợt 1 mục 4.5 và spec đợt 2 mục 6 cho khớp spec này.

## 6. Kiểm tra

- Mọi câu lệnh và kết quả trong bài khớp `sql-lession`. Kiểm bằng câu `SELECT` qua MCP chỉ đọc.
- Thông báo lỗi có trong bài (ví dụ lỗi khóa ngoại ở bài 1.4) lấy nguyên văn bằng cách chạy câu đó qua API bài tập trên máy, trong transaction có hoàn tác. Chạy xong thì `check:data` phải sạch.
- Bài tập 1.6: `npm --prefix api run check:exercises` chạy được mọi đáp án.
- `npm test`, `npm run check`, `npm run build`, `npm run check:dist` đều qua.
- Viết xong Level 1 thì người làm khóa học đọc và duyệt, rồi mới bắt đầu Level 2.

## 7. Ngoài phạm vi

- Viết đầy đủ Level 2–6.
- Tạo tài khoản cho học viên, phân quyền, tường lửa (việc của người làm khóa học).
- Ảnh chụp SSMS thật (trừ khi người làm khóa học gửi).
- Sửa bài 6.5.
- Đổi tên database trên Azure.

## 8. Những điều không được xảy ra

Như spec đợt 1 mục 2 và spec đợt 2 mục 2, cộng thêm:

- Bài viết "SSMS sẽ hiện HRM_Demo" trong khi học viên thấy `sql-lession`.
- Bài tập đòi kiến thức chưa dạy tới bài đó.
- Bài tập có chấm điểm dùng `TOP` mà không có `ORDER BY`.
- Bài 1.1–1.5 còn dòng "Phần bài tập sẽ bổ sung sau."
- Bài bảo học viên chạy câu sửa dữ liệu trong SSMS.

## 9. Những quyết định mình tự đặt (bạn xem lại khi đọc)

1. "Lý thuyết cơ bản" gồm bốn phần ở mục 3.2 (khái niệm, cú pháp chung, ví dụ nhỏ, bảng từng phần nghĩa là gì).
2. Ngay dưới câu lệnh cho tình huống có bảng kết quả cuối.
3. Bài 6.5 giữ nguyên.
4. Bài học không bảo học viên chạy câu sửa dữ liệu trong SSMS ở Level 1 (mục 3.3).
5. Đổi tên database hiển thị thành `sql-lession` ở dòng trạng thái; "HRM_Demo" vẫn là tên bộ dữ liệu mẫu.
6. Bài 1.5 vẽ thẳng sơ đồ trong bài, dùng lại cách vẽ của popup.
7. Ba bài tập của bài 1.6 khác nhau ở bảng (nhỏ, có `NULL`, có ngày hoặc tiền), không khó dần về cú pháp, vì bài chỉ dạy `SELECT *`.

## 10. Để người dựng tự quyết

- Câu chữ và tình huống của từng bài, miễn đúng khuôn và quy tắc viết.
- Ba bài tập cụ thể của bài 1.6 (bảng nào, đề thế nào), miễn đúng mục 4.3.
- Cách vẽ khối SSMS và tên component.
- Cách ghi "bài này không có mục Bài tập" (trường trong phần đầu file hay danh sách trong code) và cách đổi test tương ứng.
- Thời gian đọc (`minutes`) của từng bài.
