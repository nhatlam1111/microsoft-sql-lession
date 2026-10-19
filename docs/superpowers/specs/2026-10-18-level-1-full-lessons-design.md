# Thiết kế phần C, đợt Level 1: viết đầy đủ các bài Level 1

- Ngày: 2026-10-18
- Trạng thái: đã duyệt ngày 2026-10-18; đã làm xong và merge vào `main` ngày 2026-10-18 (chưa push). Còn chờ người làm khóa học đọc và duyệt nội dung Level 1 trước khi làm Level 2 (mục 6).
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
4. Học viên kết nối SSMS thẳng vào máy chủ `sql-lession` trên Azure, bằng tài khoản người làm khóa học cấp. Database trên máy chủ đó tên `free-sql-db-8797714` (tên Azure tự đặt khi tạo database miễn phí); người làm khóa học quyết định giữ tên này, không đổi (2026-10-18). Tài khoản, quyền của tài khoản và tường lửa là việc của người làm khóa học; bài học và người dựng không đặt giới hạn gì thêm cho tài khoản đó.
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
- Ghi tên database `free-sql-db-8797714` vào ô chọn database của hộp kết nối: ở SSMS 20 trở về trước là Options → tab Connection Properties → "Connect to database"; bản mới hơn có thể đặt ô này ngay trên hộp kết nối. Người dựng kiểm theo tài liệu của Microsoft cho bản SSMS mới nhất lúc viết, và bài ghi rõ bản SSMS đang tả. Bước này bắt buộc với tài khoản tạo riêng trong database; bỏ qua là không đăng nhập được. Bài nói rõ triệu chứng khi quên bước này (thông báo lỗi đăng nhập), nguyên văn lấy từ SSMS hoặc từ tài liệu của Microsoft.
- Sau khi vào: Object Explorer → Databases → `free-sql-db-8797714` → Tables có 7 bảng `dbo.*`.

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

Học viên kết nối vào database tên `free-sql-db-8797714`, nên chữ "HRM_Demo" ở những chỗ đặt cạnh SSMS đổi thành `free-sql-db-8797714`:

- dòng trạng thái dưới khối kết quả (`Result`) và khối `Messages` trong bài;
- dòng trạng thái trên trang làm bài tập.

"HRM_Demo" vẫn là tên của bộ dữ liệu mẫu: tên bài 1.2, script `HRM_Demo.sql`, popup "Sơ đồ HRM_Demo", trang Giới thiệu. Bài 1.2 giải thích: bộ dữ liệu mẫu HRM_Demo nằm trong database `free-sql-db-8797714` trên máy chủ khóa học; ai tự cài trên máy thì đặt tên database là `HRM_Demo`.

### 5.3 Hình SSMS vẽ bằng HTML

Bài 1.2 (và 1.3, 1.6 khi cần) có khối mô phỏng SSMS, cùng tinh thần với khối Excel: đủ giống để học viên nhận ra trên máy mình, không cần giống từng điểm ảnh. Tối thiểu gồm:

- hộp Connect to Server theo SSMS 21 trở lên: ô Database Name và Encryption nằm ngay trên hộp (đổi trong lúc làm, theo mục 4.1; bài ghi thêm đường Options → Connection Properties của SSMS 20);
- cây Object Explorer (Databases → `free-sql-db-8797714` → Tables → `dbo.NhanVien` → Columns, có kiểu dữ liệu và khóa);
- thanh công cụ có nút New Query, ô chọn database và nút Execute.

Không dùng ảnh chụp. Người làm khóa học gửi ảnh chụp thật thì thay vào sau.

### 5.4 Sơ đồ quan hệ trong bài 1.5

Dùng lại cách vẽ sơ đồ của popup "Sơ đồ database" (hộp bảng, cột, nhãn PK/FK, đường nối), đặt thẳng trong bài, không cần bấm mở popup.

### 5.5 Tài liệu

- Thêm `docs/lesson-template.md`: khung bài đầy đủ chép ra là viết được. Có phần đầu file, các mục theo mục 3, đoạn mẫu cho từng khối (`Chat`, `Key`, `Excel`, `Sql`, `Result`, `Messages`, `LineMap`, `RunFlow`, `Mistakes`, `Apply`, `Memo`, `Exercises`, khối SSMS mới) và các quy tắc viết. README trỏ tới file này.
- Sửa spec đợt 1 mục 4.5 và spec đợt 2 mục 6 cho khớp spec này.

## 6. Kiểm tra

- Mọi câu lệnh và kết quả trong bài khớp database `free-sql-db-8797714`. Kiểm bằng câu `SELECT` qua MCP chỉ đọc.
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

- Bài viết "SSMS sẽ hiện HRM_Demo" trong khi học viên thấy `free-sql-db-8797714`.
- Bài tập đòi kiến thức chưa dạy tới bài đó.
- Bài tập có chấm điểm dùng `TOP` mà không có `ORDER BY`.
- Bài 1.1–1.5 còn dòng "Phần bài tập sẽ bổ sung sau."
- Bài bảo học viên chạy câu sửa dữ liệu trong SSMS.

## 9. Những quyết định mình tự đặt (bạn xem lại khi đọc)

1. "Lý thuyết cơ bản" gồm bốn phần ở mục 3.2 (khái niệm, cú pháp chung, ví dụ nhỏ, bảng từng phần nghĩa là gì).
2. Ngay dưới câu lệnh cho tình huống có bảng kết quả cuối.
3. Bài 6.5 giữ nguyên.
4. Bài học không bảo học viên chạy câu sửa dữ liệu trong SSMS ở Level 1 (mục 3.3).
5. Đổi tên database hiển thị thành `free-sql-db-8797714` ở dòng trạng thái; "HRM_Demo" vẫn là tên bộ dữ liệu mẫu.
6. Bài 1.5 vẽ thẳng sơ đồ trong bài, dùng lại cách vẽ của popup.
7. Ba bài tập của bài 1.6 khác nhau ở bảng (nhỏ, có `NULL`, có ngày hoặc tiền), không khó dần về cú pháp, vì bài chỉ dạy `SELECT *`.

## 10. Để người dựng tự quyết

- Câu chữ và tình huống của từng bài, miễn đúng khuôn và quy tắc viết.
- Ba bài tập cụ thể của bài 1.6 (bảng nào, đề thế nào), miễn đúng mục 4.3.
- Cách vẽ khối SSMS và tên component.
- Cách ghi "bài này không có mục Bài tập" (trường trong phần đầu file hay danh sách trong code) và cách đổi test tương ứng.
- Thời gian đọc (`minutes`) của từng bài.

## 11. Sửa sau review bài 1.1 (2026-10-19)

Người làm khóa học đưa một bản review bài 1.1 viết từ góc nhìn người làm nghiệp vụ khó tính (`temp/review/review-bai-1-1-database.md`, 50 mục). Đã sửa theo phần lớn các mục:

- Bỏ các khẳng định tuyệt đối mà database không tự bảo đảm: "một bản duy nhất", "đặt luật cho từng cột", "không thể có chuyện…", "Excel để bạn gõ gì cũng được", "từ chối ngay lúc nhập". Thay bằng: một nguồn dữ liệu dùng chung theo quyền; ràng buộc do người thiết kế khai báo, được kiểm khi ghi dữ liệu.
- Thêm đoạn "Hợp lệ chưa chắc đã đúng": mã có thật nhưng gán nhầm người, ngày hợp lệ nhưng sai hồ sơ vẫn lưu được.
- Khóa ngoại là luật của dữ liệu, không phải ô chọn trên màn hình (sửa cả bài 1.4).
- Tình huống có giả định về mốc thời gian; thêm tiểu mục "Trả lời chị Hạnh" để khép tình huống bằng quy trình xác minh, thống nhất nguồn, lấy lại số liệu cùng phạm vi.
- Phân biệt database, SQL Server, SQL; thêm bảng danh mục phòng ban và chú giải tên cột; ví dụ ngày dạng chữ dùng `02.10.2017`.
- Ứng dụng có bốn câu hỏi về nguồn file và các câu hỏi khi xem thiết kế dữ liệu; Ghi nhớ có ba câu tự kiểm tra.
- Gợi ý dưới nút "Đã học xong" của bài khái niệm (1.1–1.5) đổi thành "tự giải thích lại được nội dung chính" (sau đó đổi tiếp ở mục 12).

Không làm theo, vì trái quyết định đã có:

- Đổi tên mục "Làm bằng SQL": tên mục cố định theo khuôn bài (mục 3.1).
- Gọi HRM_Demo là tên database: HRM_Demo là tên bộ dữ liệu mẫu, database trên máy chủ khóa học là `free-sql-db-8797714` (mục 2.4, 5.2).
- Đổi nhãn "Bên Excel / Bên SQL" của khối Ghi nhớ: nhãn chung cho mọi bài.
- Viết "BA cần…", "trao đổi với developer": bài không nhắc vai trò người đọc; các câu hỏi được giữ ở dạng trung tính.

## 12. Sửa sau review bài 1.2–1.6 (2026-10-19)

Người làm khóa học đưa thêm năm bản review cùng góc nhìn (`temp/review/review-bai-1-2…1-6-*.md`, mỗi bản 48–50 mục). Các con số được kiểm lại trên database khóa học bằng `SELECT` trước khi sửa: VH có 10 hồ sơ (8 đang làm, 2 đã nghỉ); `NhanVien` kết `HopDong` ra 55 dòng với `JOIN`, 57 dòng với `LEFT JOIN` (NV047, NV048 chưa có hợp đồng); NV008 quản lý trực tiếp 9 người (7 đang làm); IT có 10 hồ sơ, gồm NV048 vào làm 2026-10-05; database dùng `SQL_Latin1_General_CP1_CI_AS`, `us_english`, DATEFORMAT `mdy`.

Đã sửa:

- **1.2**: SQL Server là hệ quản trị cơ sở dữ liệu; máy chủ khóa học là Azure SQL Database; SSMS là công cụ cài riêng, không chứa dữ liệu. Excel không bị coi là "một file gửi đi" (có cùng sửa trên OneDrive/SharePoint). Thêm điều kiện trước khi kết nối (link cài SSMS, tài khoản, mạng), hộp kết nối kiểu cũ của SSMS 21, ô Trust server certificate để nguyên. Lỗi 40613 "thường" do database đang thức dậy, có thể do bảo trì; lỗi kéo dài hoặc nhắc tới IP thì gửi nguyên văn lỗi cho người phụ trách. Lời hứa hoàn tác ghi đúng cơ chế (giao dịch luôn rollback, chặn câu thoát giao dịch) và chỉ có trên trang bài tập. Mã truy cập khác tài khoản SSMS, trình duyệt nhớ mã. Kết quả không `ORDER BY` có thể khác thứ tự; khép tình huống bằng câu trả lời cho chị Hạnh. Developer/Express ghi rõ phạm vi dùng; chạy lại script đưa 7 bảng về dữ liệu gốc. Bỏ "người cấp quyền thường chỉ gửi ba".
- **1.3**: mục tiêu và lý thuyết tách ba khả năng khi ghi một giá trị (đổi được, đổi được nhưng khác đi, không đổi được) và câu "Lưu được chưa chắc đã đúng ý". Định nghĩa lại `varchar` (byte, bảng mã), `nvarchar`, `char` (đệm khoảng trắng), `decimal(p, s)` (phần nguyên p − s). NOT NULL không chặn chuỗi rỗng; NULL ở `NgayNghiViec` là quy ước của bộ mẫu. Ngày mơ hồ phụ thuộc DATEFORMAT của phiên (`DBCC USEROPTIONS`); kết quả `Tr?n Th? Mai` gắn với bảng mã của database khóa học. Thêm "Trả lời chị Hạnh"; Excel không bị coi là "nhận bất cứ thứ gì" (`SUM` bỏ qua ô chữ, `+` báo `#VALUE!`). Ứng dụng không còn "đổi định dạng".
- **1.4**: khóa chính "không trùng, không nhận NULL"; khóa nhiều cột xét cả bộ; khóa ngoại có thể trỏ về chính bảng đó, chỉ kiểm giá trị khác NULL, xác nhận mã tồn tại chứ không xác nhận mã đúng. Chặn xóa là cách xử lý mặc định của HRM_Demo; khóa ngoại có thể bị tắt hay bị bỏ qua khi nạp hàng loạt (dẫn bài 5.2). Bỏ "phải chuyển 10 người sang Kinh doanh" và "danh mục không bao giờ thiếu"; thêm "Trả lời chị Hạnh" với bốn câu hỏi nghiệp vụ (ngày hiệu lực, người đã nghỉ, báo cáo kỳ cũ, xóa hay ngừng dùng). Ứng dụng: mã duy nhất nghiệp vụ không nhất thiết là khóa chính (UNIQUE), mã 547 dùng cho nhiều loại ràng buộc. Thêm lỗi hay nhầm "mã khác nhau là người khác nhau".
- **1.5**: mục tiêu cụ thể; quan hệ một-nhiều là "0, 1 hoặc nhiều"; "phía nhiều" chỉ đúng khi cột FK không duy nhất; `BangLuong` "tối đa một dòng lương mỗi kỳ"; các con số ghi rõ đếm trên toàn bộ dữ liệu mẫu. 57 dòng là `LEFT JOIN`, `JOIN` ra 55 dòng. Đảo hai vế `ON` không sai; điều sai là đảo nghĩa một-nhiều. "Trả lời chị Hạnh": tên phòng là phòng ban đang lưu, không phải phòng tại kỳ lương. Bỏ "câu lệnh gần như tự viết ra", "khỏi hỏi lại", "Sheet nào cũng tra theo mã NV".
- **1.6**: `TOP (n)` là tối đa n dòng; câu SELECT trong bài chỉ đọc nhưng `SELECT INTO` thì ghi; `(10 rows affected)` là số dòng trả về; NULL khác chuỗi rỗng và số 0; mười dòng chỉ là mẫu, chưa phải nghiệm thu import. `RunFlow` gọi là thứ tự logic. Đề bài tập 2 và 3 ghi "mã nhân viên" thay cho "người ký", "người nghỉ".
- **Chung**: `Sql` có `copy={false}` cho đoạn chỉ để đọc (câu ghi dữ liệu ở 1.4, đoạn trích có `...` ở 1.3, khuôn cú pháp ở 1.6). Câu nhắc mặc định của `RunFlow` thành "Bạn viết SELECT trước, nhưng theo thứ tự logic, SQL Server xét FROM trước."; tiêu đề câu lệnh trong drawer thành "Câu lệnh để xem dữ liệu ở bước này". Bài 1.2–1.5 có ba câu tự kiểm tra như 1.1, và gợi ý dưới nút "Đã học xong" của bài khái niệm thành "Bấm khi bạn trả lời được các câu tự kiểm tra cuối bài mà không nhìn bài." Thời gian đọc 1.2–1.5 tăng lên 20 phút.

Không làm theo:

- Đổi tên mục "Làm bằng SQL" hay tiêu đề "SQL Server chạy câu này thế nào": tên cố định theo khuôn bài (mục 3.1); thay vào đó, đoạn mở đầu và câu nhắc nói rõ đây là thứ tự logic.
- Thêm `dbo.` vào mọi câu lệnh: cả khóa viết tên bảng không kèm schema; bài 1.2 và 1.6 giải thích `dbo.PhongBan`, `dbo.NhanVien`.
- Sửa sơ đồ ERD (ký hiệu số lượng, dấu NULL, tách các đoạn đường trùng, phóng to): phần chữ của bài 1.5 đã nói `MaQuanLy` nhận NULL và quan hệ 0, 1 hoặc nhiều; sửa hình là việc riêng nếu cần.
- Thêm bài tập về `TOP` ở 1.6: `TOP` không có `ORDER BY` không chấm được một cách xác định; `ORDER BY` ở bài 2.4.
- Gợi ý "Đã học xong" riêng cho 1.6: gợi ý chung cho mọi bài có câu lệnh, giữ nguyên.
- Các mục "Giữ được" và các mục chỉ xin thêm nhãn "mô phỏng" cho hình SSMS, kết quả: hình trong bài đều là minh họa, không đánh nhãn từng hình.
- Khẳng định Azure SQL Database không có mục Database Diagrams trong SSMS được giữ (khóa học dùng sơ đồ trên trang); thêm ý cần cài phần hỗ trợ và quyền db_owner khi tự cài trên máy.

## 13. Quy ước mới sau lượt đọc của người làm khóa học (2026-10-19)

Người làm khóa học đọc 1.3, 1.4 và đặt thêm quy ước cho mọi bài:

- **Lý thuyết tự trả lời "vì sao"**, bằng lời dẫn dắt, không chèn câu hỏi vào bài. 1.3 giải thích vì sao mỗi cột có một kiểu (so sánh, sắp xếp, tính toán đúng cho mọi dòng; `'10'` đứng trước `'9'` khi so như chữ) và gọi đúng tên cơ chế chuyển kiểu ngầm, kèm `CAST`. 1.4 giải thích vì sao cần khóa chính (tên trùng, đổi tên, bảng khác cần nhắc đúng một người, câu sửa phải nhắm đúng một dòng) và khóa ngoại (lưu mã thay cho thông tin, nên mã phải trỏ được tới dòng có thật; hồ sơ mồ côi). 1.1, 1.2, 1.5, 1.6 thêm các đoạn tương tự (vì sao tách bảng, vì sao tách dữ liệu với công cụ, vì sao cần sơ đồ và biết phía "nhiều", vì sao phải nói rõ bảng, vì sao `TOP` không hứa thứ tự).
- **Nói trước phần nào học sâu hơn ở bài sau**: cuối lý thuyết mỗi bài có đoạn "Ở bài này chỉ cần…" kể các bài 2.x–6.x đi tiếp.
- **Giải thích từng phần có giá trị ví dụ**: mỗi dòng `LineMap` của 1.3–1.6 có "Ví dụ:" (giá trị nào qua, bị từ chối hay bị đổi). Các giá trị đã kiểm trên database khóa học: `9610000.6` thành `9610001`, `'2024-02-30'` không đổi được thành ngày, `'2026-9'` vào `char(7)` được đệm khoảng trắng.
- **Câu minh họa cho xem dữ liệu, không tóm tắt**: 1.4 bỏ `COUNT(*)`, thay bằng danh sách 10 hồ sơ còn trỏ tới VH (tô hai dòng đã nghỉ). Test chặn `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY` trong câu lệnh của Level 1; tổng hợp bắt đầu từ bài 3.1.
- **Hình đánh dấu chỗ cần nhìn**: thêm `mark` cho `Ssms` (phần khóa, kiểu, null của cột), `Result` (dòng), `Excel` (ô) và `path` cho `Erd` (bảng, cột nối, đường nối). Đã dùng: 1.1 ô C4, A3, A5; 1.2 hai cột `PhongBan`; 1.3 ô C2, D3 và `LuongCoBan`, `NgayKetThuc`; 1.4 khóa của `NhanVien` và hai dòng đã nghỉ; 1.5 ô D2 và đường `BangLuong` → `NhanVien` → `PhongBan`; 1.6 dòng NV004.
- 1.1 bỏ "dữ liệu ghi từ đâu cũng bị kiểm" ở bảng so sánh, như đã sửa ở 1.4.
