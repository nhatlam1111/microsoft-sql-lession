# Thiết kế phần C, đợt Level 1: viết đầy đủ các bài Level 1

> Cập nhật 20/10/2026: khung bài và cách trình bày hiện hành theo [quy ước](../../quy-uoc.md) và [lesson-template](../../lesson-template.md), lấy bài 1.1 đã duyệt làm mẫu. Các chỉ dẫn tách "Với Excel" / "Làm bằng SQL", ép đủ khối hoặc trả lời tình huống riêng trong phần lịch sử bên dưới đã được thay thế. Các quyết định khác áp dụng khi không mâu thuẫn với quy ước hiện hành và các quyết định được duyệt sau đó.

- Ngày: 2026-10-18
- Trạng thái: đã duyệt ngày 2026-10-18; đã làm xong và lên web ngày 2026-10-18. Ngày 2026-10-19 sửa ba vòng sau review (mục 11–13), bản cuối lên web ở commit `7c9048d`. Còn chờ người làm khóa học đọc và duyệt nội dung Level 1 trước khi làm Level 2 (mục 6); Level 2 làm theo mục 14.
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
- Sửa sơ đồ ERD (ký hiệu số lượng, dấu NULL, tách các đoạn đường trùng, phóng to): phần chữ của bài 1.5 đã nói `MaQuanLy` nhận NULL và quan hệ 0, 1 hoặc nhiều; sửa hình là việc riêng nếu cần. Phần tách đường trùng được làm ở mục 15.
- Thêm bài tập về `TOP` ở 1.6: `TOP` không có `ORDER BY` không chấm được một cách xác định; `ORDER BY` ở bài 2.4.
- Gợi ý "Đã học xong" riêng cho 1.6: gợi ý chung cho mọi bài có câu lệnh, giữ nguyên.
- Các mục "Giữ được" và các mục chỉ xin thêm nhãn "mô phỏng" cho hình SSMS, kết quả: hình trong bài đều là minh họa, không đánh nhãn từng hình.
- Khẳng định Azure SQL Database không có mục Database Diagrams trong SSMS được giữ (khóa học dùng sơ đồ trên trang); thêm ý cần cài phần hỗ trợ và quyền db_owner khi tự cài trên máy. Đổi ở mục 15.

## 13. Quy ước mới sau lượt đọc của người làm khóa học (2026-10-19)

Người làm khóa học đọc 1.3, 1.4 và đặt thêm quy ước cho mọi bài:

- **Lý thuyết tự trả lời "vì sao"**, bằng lời dẫn dắt, không chèn câu hỏi vào bài. 1.3 giải thích vì sao mỗi cột có một kiểu (so sánh, sắp xếp, tính toán đúng cho mọi dòng; `'10'` đứng trước `'9'` khi so như chữ) và gọi đúng tên cơ chế chuyển kiểu ngầm, kèm `CAST`. 1.4 giải thích vì sao cần khóa chính (tên trùng, đổi tên, bảng khác cần nhắc đúng một người, câu sửa phải nhắm đúng một dòng) và khóa ngoại (lưu mã thay cho thông tin, nên mã phải trỏ được tới dòng có thật; hồ sơ mồ côi). 1.1, 1.2, 1.5, 1.6 thêm các đoạn tương tự (vì sao tách bảng, vì sao tách dữ liệu với công cụ, vì sao cần sơ đồ và biết phía "nhiều", vì sao phải nói rõ bảng, vì sao `TOP` không hứa thứ tự).
- **Nói trước phần nào học sâu hơn ở bài sau**: cuối lý thuyết mỗi bài có đoạn "Ở bài này chỉ cần…" kể các bài 2.x–6.x đi tiếp.
- **Giải thích từng phần có giá trị ví dụ**: mỗi dòng `LineMap` của 1.3–1.6 có "Ví dụ:" (giá trị nào qua, bị từ chối hay bị đổi). Các giá trị đã kiểm trên database khóa học: `9610000.6` thành `9610001`, `'2024-02-30'` không đổi được thành ngày, `'2026-9'` vào `char(7)` được đệm khoảng trắng.
- **Câu minh họa cho xem dữ liệu, không tóm tắt**: 1.4 bỏ `COUNT(*)`, thay bằng danh sách 10 hồ sơ còn trỏ tới VH (tô hai dòng đã nghỉ). Test chặn `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY` trong câu lệnh của Level 1; tổng hợp bắt đầu từ bài 3.1.
- **Hình đánh dấu chỗ cần nhìn**: thêm `mark` cho `Ssms` (phần khóa, kiểu, null của cột), `Result` (dòng), `Excel` (ô) và `path` cho `Erd` (bảng, cột nối, đường nối). Đã dùng: 1.1 ô C4, A3, A5; 1.2 hai cột `PhongBan`; 1.3 ô C2, D3 và `LuongCoBan`, `NgayKetThuc`; 1.4 khóa của `NhanVien` và hai dòng đã nghỉ; 1.5 ô D2 và đường `BangLuong` → `NhanVien` → `PhongBan`; 1.6 dòng NV004.
- 1.1 bỏ "dữ liệu ghi từ đâu cũng bị kiểm" ở bảng so sánh, như đã sửa ở 1.4.

## 14. Cho các level sau (2026-10-19)

Ba vòng sửa ở mục 11–13 đều sửa cùng những loại lỗi: hứa quá điều database tự bảo đảm, thiếu điều kiện cho con số, lý thuyết chưa nói "vì sao", thiếu giá trị ví dụ, hình chưa chỉ chỗ cần nhìn, tóm tắt bằng `COUNT` quá sớm. Để Level 2 trở đi không phải sửa lại theo cùng kiểu:

- Quy tắc viết đã gom vào `docs/quy-uoc.md` (từ 2026-10-20; trước đó ở `docs/lesson-template.md`), và các test trong `tests/content.test.ts` giữ những quy tắc kiểm được bằng máy (không câu hỏi trong lý thuyết, có chỉ tới bài sau, "Ví dụ:" trong `LineMap`, không hàm tổng hợp ở Level 1). Khi viết Level 2, mở rộng các test này cho Level 2 (hàm tổng hợp được dùng từ bài 3.1).
- Mỗi bài đi theo mục 4 "Quy trình làm một bài" của `docs/quy-uoc.md`: chạy số liệu trước khi viết, tự rà theo danh sách, kiểm bằng máy, rồi **review độc lập**: một agent mới (Claude dùng Sonnet, effort high; Codex kế thừa model đang dùng của phiên), đóng vai người học khó tính theo đúng lời dặn ghi trong file, chỉ đọc file (không chạy gì trên database), ghi kết quả ra `temp/review/<ngày>-doc-lap/review-bai-<slug>.md`. Người viết kiểm từng mục, sửa mục đúng, ghi "Đã sửa" và "Không làm theo" vào spec của level.
- Plan của mỗi level có một bước review độc lập trong task của từng bài (xem mục "Cho plan các level sau" ở plan Level 1), và người làm khóa học chỉ đọc bài sau khi đã qua bước đó.

## 15. Sửa sau lượt review độc lập bài 1.1–1.6 (2026-10-19, 2026-10-20)

Lượt review đầu tiên theo quy trình ở mục 14: sáu agent mới, mỗi agent một bài, chỉ đọc file, không đọc bản review cũ (`temp/review/2026-10-19-doc-lap/review-bai-<slug>.md`). Số mục: 1.1 có 57 (4 Cần sửa), 1.2 có 58 (4), 1.3 có 61 (3), 1.4 có 67 (3), 1.5 có 41 (3), 1.6 có 49 (4). Mọi con số đưa vào bài được chạy lại trên database khóa học bằng `SELECT` trước khi sửa, ví dụ: 43 dòng lương kỳ 2026-09, thiếu NV020, NV033, NV041 (đã nghỉ trước tháng 9) và NV047, NV048 (vào làm tháng 10); NV046 có 1 kỳ lương; chấm công chỉ có từ 2026-09-03 tới 2026-09-30; 21 hồ sơ mang mã CV, gồm NV020 đã nghỉ; `TOP (10)` của `NhanVien` ra NV001–NV010, `TOP (2)` của `PhongBan` ra BGD, IT; schema mặc định là `dbo`; 48 hồ sơ nhưng chỉ 47 số CCCD khác nhau.

Đã sửa:

- **1.1**: giả định nhân vật là hư cấu; ô C4, D4, A3, A5 được tô, ngày thật căn phải; ràng buộc chỉ được kiểm "khi đang bật"; nói T-SQL; "thống nhất chưa chắc đã đúng"; khóa chính, kiểu ngày không bắt được gì; SSMS ghi hẳn ngay; "Trả lời chị Hạnh" tách việc nghiệp vụ với việc hệ thống; câu tự kiểm tra thứ tư.
- **1.2**: tả hộp kết nối kiểu mới (Server Name, Authentication, User Name, Password, Database Name, Encrypt, Trust Server Certificate) thay cho hộp kiểu cũ; điều kiện máy và mạng (Windows, cổng 1433); Disconnect; cài máy chủ trên máy riêng (localhost, Windows Authentication); chỉ chạy những câu chỉ đọc có trong bài; thời gian đọc 25 phút.
- **1.3**: giả định cách file được đưa vào; mỗi ô trong file xếp vào ba khả năng ở bảng "Ô trong file | Database làm gì | Cần làm gì"; `CAST` cắt chuỗi mà không báo, còn `INSERT` từ chối; chuỗi rỗng vào cột ngày thành 1900-01-01; DATEFORMAT và ví dụ 31/12; viết ngày dạng `'20240201'`; lỗi tràn số (Arithmetic overflow); câu tự kiểm tra thứ tư.
- **1.4**: liệt kê đủ bảy khóa ngoại, kể cả `MaCD` và `MaQuanLy`; giả định của tình huống; khóa chính không nhận NULL và vì sao; vẫn kiểm khi nạp hàng loạt; `nv001` trùng `NV001`; mỗi bảng tối đa một khóa chính; khóa ngoại trỏ tới khóa chính hoặc cột có ràng buộc duy nhất; chỉ cần `REFERENCES`; NO ACTION và ON DELETE CASCADE; đổi mã VH cũng bị chặn; cách đọc bốn phần của thông báo lỗi 547 (Msg là số hiệu lỗi, FOREIGN KEY và REFERENCE constraint); báo cáo chạy lại khác báo cáo đã xuất; `SoCCCD` không có ràng buộc UNIQUE (bài 4.6); câu tự kiểm tra về `FK_NhanVien_ChucDanh`.
- **1.5**:
  - Sơ đồ: đường được tô vẽ sau cùng để nét xám không đè lên; các đường đi tới khóa khác nhau có trục dọc riêng (`diagramLinks`, cách nhau 12px), nên không còn đoạn thẳng giả nối `PhongBan.MaPB` với `NhanVien.MaNV`.
  - Lý do 43 dòng: bỏ "vì câu bắt đầu từ bảng lương" (với `JOIN`, thứ tự bảng không đổi kết quả); nêu năm người không có lương kỳ này và vì sao không dòng lương nào bị rơi.
  - Đọc sơ đồ: "có thể có nhiều" ở `ChamCong`, `BangLuong`, có số cho người có 1 kỳ hoặc chưa có kỳ nào; bước 1 nói rõ PK kèm FK (khóa hai cột, `MaNV` một mình vẫn lặp lại); bước 2 nói vì sao bên được trỏ tới là phía "một", nên đi về phía đó không làm tăng số dòng.
  - Lý thuyết: VLOOKUP chỉ lấy dòng khớp đầu tiên (thêm vào Ghi nhớ); Excel cũng có Data Model; "mỗi thông tin chỉ phải lưu và sửa ở một chỗ", với `LuongCoBan` cố ý chép sang `BangLuong` (bài 5.1); chữ "thực thể"; chấm tròn ở đầu khóa ngoại; database không khai báo khóa ngoại thì sơ đồ không có đường nối; ký hiệu chìa khóa và ∞ của SSMS; một-một và nhiều-nhiều; sơ đồ không ghi NULL.
  - Ví dụ và dẫn bài: ví dụ khóa chính đổi sang ngày 2026-09-03 (1/9 là ngày nghỉ lễ); "21 hồ sơ mang mã CV"; thời điểm dữ liệu ở bài 6.6.
  - Database Diagrams: tạo `sysdiagrams` và thủ tục trong database, cần `db_owner`, trình vẽ sửa được bảng.
  - Câu tự kiểm tra thứ tư; thời gian đọc 25 phút.
- **1.6**:
  - Đếm hồ sơ, không đếm người ("48 dòng, mỗi dòng một hồ sơ"; "10 hồ sơ").
  - Cách chạy: bôi đen lại trọn câu thay cho "bỏ bôi đen rồi chạy lại"; F5 không bôi đen chạy mọi câu, nên nhìn lại cả cửa sổ trước khi chạy.
  - Soát sau import: `TOP (10)` chỉ có ích trên bảng chứa riêng đợt nhập, vì trên bảng có sẵn dòng cũ, 10 dòng có thể toàn là dòng cũ; trỏ bài 5.5, 2.2, 3.1, 2.5, 4.6.
  - Khép tình huống: gửi danh sách cột kèm ý nghĩa, che `SoCCCD`, `Email`, `NgaySinh`; quyền với dữ liệu cá nhân ở bài 6.1. Bảng lưu mã chứ không lưu tên.
  - Các câu "vì sao": cái giá của `*`; số thứ tự bên trái lưới; vì sao `TOP` trông ổn định trên bảng nhỏ (bài 5.6); `TOP 10` không ngoặc; bỏ được `dbo.` vì schema mặc định; hoa thường; dấu `;` và `WITH`; thứ tự logic dùng để làm gì; `TOP` có `ORDER BY` thường phải xét hết.
  - SSMS: ví dụ `SELECT INTO` chỉ để đọc; chú thích thanh công cụ nói ô viền xanh và nút Parse.
  - Trang bài tập: F5 gửi cả khung soạn, chỉ nhận một câu; dòng `--` là ghi chú.
  - Lưới kết quả: NULL thật khác chữ "NULL"; Copy with Headers; Completion time; Select Top 1000 Rows an toàn.
  - Bài học trước và bài tập: thêm bài 1.4 vào phần cần biết trước; Ghi nhớ so Count của Excel với thanh trạng thái SSMS; đề bài tập 2 ghi "kể cả hợp đồng thử việc", đề bài tập 3 ghi "mọi loại nghỉ, mọi trạng thái"; thời gian đọc 20 phút.
- **Chung**: thẻ đầu tiên của `RunFlow` ghi "có N dòng", các thẻ sau ghi "còn N dòng" (bước đầu chưa bỏ dòng nào).

Đổi so với mục 12:

- Tách đường trùng trên sơ đồ ERD: mục 12 để lại, vì khi đó hình chưa tô đường đi. Từ khi có `path` (mục 13), chỗ trùng che đúng phần được tô và tạo một đường thẳng giả giữa hai cột đang tô, nên đã sửa. Ký hiệu số lượng và dấu NULL vẫn không thêm vào hình; phần chữ nói thay.
- Câu "Azure SQL Database không có mục Database Diagrams trong SSMS": tài liệu Microsoft ghi các trang Database Diagrams áp dụng cho cả Azure SQL Database, nên bỏ khẳng định chung. Bài chỉ nói vì sao không dùng mục này trên máy chủ khóa học: nó ghi thêm đối tượng vào database dùng chung và cần `db_owner`.

Không làm theo:

- 1.5, đổi màu nhãn FK cho khác màu tô: chú thích và câu dẫn đã nói phần tô gồm hộp viền đậm, dòng nền xanh, đường nét dày; đổi màu nhãn là đổi giao diện chung của sơ đồ.
- 1.5, đường vòng `MaQuanLy` nhập vào đoạn cuối của đường `BangLuong`: cả hai cùng đi tới `NhanVien.MaNV`, nên chỗ nhập không nói sai cột nào.
- 1.6, tô riêng `TOP (10)` và `*` trên cùng một dòng của `RunFlow`: component tô theo dòng; phần chữ của từng bước đã nói đúng. Viết câu lệnh thành ba dòng chỉ để tô thì lệch cách viết của cả khóa.
- 1.6, nhắc cột ẩn của temporal table khi dùng `*`: để bài 6.6.
- Các mục "Giữ được" và các gợi ý ghi "không bắt buộc" mà bài đã trả lời ở chỗ khác. Không mục nào của 1.1–1.4 đi ngược quyết định đã chốt.

## 16. Thử khung kể liền ở riêng bài 1.1 (2026-10-20)

Người làm khóa học duyệt thử nghiệm: giữ tình huống; gộp Excel và database trong một mạch giải thích; rút chi tiết sâu; để câu lệnh đọc dữ liệu tới bài 1.6. Sau khi xem nội dung, người làm khóa học nhận xét nội dung đã ổn và yêu cầu in đậm từ trọng tâm. Chưa nhân rộng khung này sang bài khác, chưa sửa `quy-uoc.md`, `lesson-template.md` hay `DESIGN.md`.

Đã sửa:

- Bài 1.1 có phần chính "Từ hai bản Excel đến một nguồn dữ liệu chung": mỗi người cập nhật một bản → nguồn chung cần cấu trúc và luật → lấy danh sách từ nguồn đã thống nhất. Phần cuối khép yêu cầu của chị Hạnh, vẫn tách căn cứ nghiệp vụ với người có quyền cập nhật.
- Bỏ bảng đối chiếu dài, mục trả lời riêng và preview SQL. Giữ hình Excel cùng dấu ô/ngày thật, ba lỗi nhập liệu và các giới hạn về nguồn cũ, luật được khai báo, hợp lệ khác đúng. Kiểu dữ liệu, khóa, nhập file và lịch sử có chỉ dẫn sang bài sâu hơn.
- Rút Hay nhầm, Ứng dụng, Ghi nhớ; giữ bốn câu tự kiểm tra, trong đó có phân biệt database, SQL Server và SQL. Thời lượng là 12 phút. In đậm có chọn lọc workbook, sheet, database, bảng, dòng, cột, bản ghi, kiểu dữ liệu và các khái niệm chính tại chỗ giải thích.
- Bài 1.6 tự giải thích số thứ tự dòng trong Results, không dẫn về preview đã bỏ. Không đổi câu lệnh hay bài tập của bài 1.6.
- Test ngoại lệ chỉ theo đúng slug bài 1.1; khung các bài khác và frontmatter dùng chung giữ nguyên. Cách đọc phần chính trong test nhận cả LF và CRLF.

Review độc lập: `temp/review/2026-10-20-1-1-narrative/review-bai-1-1-database-la-gi.md`. Reviewer là agent Codex độc lập kế thừa model của phiên, đúng quy ước đã được người làm khóa học làm rõ: Sonnet áp dụng cho Claude, Codex giữ model đang dùng. Ghi chú thiếu Sonnet trong báo cáo ban đầu là cách diễn giải trước khi có làm rõ này, không phải một bước còn thiếu. Reviewer không thấy lỗi chặn. Đã làm rõ câu hỏi bên IT về ràng buộc khi nhập file và cách hủy thay đổi trước khi ghi hẳn, cắt một câu kết lặp, thay câu tự kiểm tra về dropdown bằng ba khái niệm nền tảng.

Không làm theo / giữ ngoài phạm vi:

- Không khôi phục khuôn cũ hoặc các chi tiết đã rút: đây là thay đổi người làm khóa học đã duyệt cho bản thử.
- Không sửa các bài khác để làm xanh kiểm độ dài, không sửa giao diện bài tập theo audit chung. Các lỗi này không thuộc thử nghiệm bài 1.1.

Kiểm chứng:

- `npm run check`: 0 lỗi, 0 warning, 3 hint deprecation ở component bài tập có sẵn. `npm run build` đạt; `npm run check:dist` đạt, 68 trang và 1.345 link.
- `npm test`: 231/232 test đạt. Test duy nhất lỗi là giới hạn đoạn 120 chữ: 13 đoạn có sẵn ở bài 1.4, 1.5, 2.1, 2.2; đã thấy trước khi sửa bài 1.1. Không nới hoặc bỏ test này. Log ở `temp/verification/2026-10-20-1-1-narrative/vitest.log`.
- Xem bản build trên trình duyệt ở 1280×900 và 1440×900: mục lục đúng năm mục, liên kết cuộn đúng, hình Excel giữ bốn ô đánh dấu và ba ô ngày căn phải, không tràn ngang. Enter/Tab/Space mở và di chuyển giữa các câu tự kiểm tra, có focus bàn phím. Đối chiếu bài 1.2: giữ cùng giao diện và khung cũ của bài đó. 980px giữ thông báo dành cho máy tính và không tràn ngang; đã khôi phục viewport sau kiểm tra.
- Audit strict của Frontend Design Premium ghi hai lỗi có sẵn ngoài phạm vi: form chưa khai báo `noValidate` ở `ExerciseWorkspace.tsx`, và thiếu bằng chứng quy tắc resize ở `SqlEditor.tsx`. JSON ở `temp/verification/2026-10-20-1-1-narrative/premium-audit.json`; không tuyên bố audit toàn dự án đã đạt.
- Không thêm SQL hay giá trị mẫu mới, không kết nối hay đổi database. Đối chiếu kiến thức còn giữ với [ràng buộc khóa của SQL Server](https://learn.microsoft.com/en-us/sql/relational-databases/tables/primary-and-foreign-key-constraints?view=sql-server-ver16) và [giới hạn kiểm tra dữ liệu khi dán/kéo điền trong Excel](https://support.microsoft.com/en-gb/excel/display-or-hide-circles-around-invalid-data).

Chỉnh mục Ứng dụng theo phản hồi tiếp theo của người làm khóa học:

- Thay ba lời khuyên nhận file, đọc thiết kế và chuẩn bị import bằng bốn ứng dụng của database: lưu trữ dữ liệu thống nhất, hạn chế sai lệch bằng luật đã khai báo, tra cứu/lập báo cáo và tra cứu lịch sử khi có thiết kế lưu lịch sử. In đậm tên ứng dụng để dễ quét ý.
- Lịch sử là khả năng của hệ thống được thiết kế để lưu nó, không phải lời hứa về bảng `NhanVien` hiện tại. Đối chiếu [Microsoft: temporal tables](https://learn.microsoft.com/en-us/sql/relational-databases/tables/temporal/overview?view=sql-server-ver17); giữ nguyên giới hạn bộ mẫu trong phần chính và hồ sơ công ty.

Đánh dấu dẫn chứng theo phản hồi tiếp theo: các giá trị được nhắc lại trong lời giải thích (`NV005`, `KT`, `KD`, `Kế toán`, `Ke toan`, `Kinh doanh`), tên bảng/cột và địa chỉ ô dùng kiểu code có nền sẵn có để phân biệt với lời văn. Khái niệm trọng tâm vẫn in đậm. Giữ nguyên dữ liệu và dấu ô trong hình Excel, không đổi component hay quy ước chung.

## 17. Duyệt bài 1.1 và đưa khung mới thành chuẩn (2026-10-20)

Người làm khóa học xác nhận bài 1.1 đã tốt và yêu cầu cập nhật quy ước/hướng dẫn để các bài sau tránh lặp lỗi. Từ đây, các ghi chú "chưa đổi quy ước" ở mục 16 chỉ phản ánh giai đoạn thử nghiệm trước khi được duyệt.

- `docs/quy-uoc.md` là chuẩn viết: một phần chính lồng Excel/SQL, ví dụ cạnh lời giải thích, trả lời tình huống ngay tại đó, độ sâu theo mục tiêu, khái niệm in đậm và dẫn chứng có nền code. Mục Ứng dụng nêu ứng dụng thật của chủ đề; lịch sử cần thiết kế lưu lịch sử; tự kiểm tra phủ mục tiêu và thuật ngữ nền tảng.
- `docs/lesson-template.md` có khung MDX chung và hướng dẫn riêng cho bài khái niệm/truy vấn, thuộc tính các khối, cách điền kết quả đã kiểm và thứ tự dùng khung. Bài 1.1 là mẫu trình bày; bài 3.5 chỉ tham khảo kỹ thuật RunFlow.
- AGENTS, README, CLAUDE và DESIGN trỏ về chuẩn hiện hành. Các spec/plan có bố cục cũ được đánh dấu lịch sử ngay đầu, giữ nguyên diễn biến thiết kế và chỉ áp dụng quyết định không mâu thuẫn với chuẩn mới. README sửa lời dặn chạy lại script khi checksum lệch thành báo người phụ trách và chờ đồng ý trước khi ghi thật, đúng quy ước database dùng chung.
- Test nhận phần chính có tiêu đề theo chủ đề cho mọi bài đầy đủ; không còn ngoại lệ chỉ riêng bài 1.1. Danh sách bài cũ được dùng khung tách hai phần là danh sách đóng trong `tests/content.test.ts`; bài mới không được thêm vào. Khi chỉnh một bài cũ, chuyển khung và cập nhật assertion về bố cục, giữ kiểm về kiến thức và số liệu.
- Không chuyển nội dung hàng loạt, không đổi frontmatter, route, component, dữ liệu hay chức năng. Các bài còn dùng khung cũ được chuyển khi chỉnh từng bài. Bài 6.5 giữ cách kể xử lý sự cố khi chuyển khung.

Kiểm chứng và rà độc lập:

- Test bổ sung cho tiêu đề phần chính tùy bài, có/không bài tập, đọc LF/CRLF và cấu trúc template. `npm test`: 235/236 đạt; lỗi duy nhất vẫn là 13 đoạn quá 120 chữ có sẵn ở bài 1.4, 1.5, 2.1, 2.2. Không nới test này. Log: `temp/verification/2026-10-20-1-1-narrative/guidelines-vitest.log`.
- `npm run check`: 0 lỗi, 0 warning, 3 hint cũ. Build đạt; `check:dist` đạt, 68 trang và 1.345 link. Các link local trong tài liệu hiện hành đã đối chiếu đường dẫn tồn tại; `git diff --check` không lỗi.
- Agent độc lập rà quy ước/template, README/CLAUDE/DESIGN, banner lịch sử, schema/helper/test: không thấy vấn đề cần sửa. Ba khối MDX của template compile cú pháp được; allowlist khung cũ khớp đúng chín bài đầy đủ hiện có. Không chạy database, không sửa nội dung bài hay component trong lượt chuẩn hóa hướng dẫn này.

Làm rõ lựa chọn model review theo phản hồi của người làm khóa học: Claude dùng Sonnet với effort high; Codex giữ model đang dùng, reviewer kế thừa cấu hình model của phiên. Đã đồng bộ quy ước, AGENTS, CLAUDE và hướng dẫn review trong plan; không đổi model hay cấu hình công cụ thực tế.

## 18. Chuyển bài 1.2 và 1.3 theo khung đã duyệt (20–21/10/2026)

Người làm khóa học duyệt kế hoạch trong chat: dùng mạch kể của 1.1, giữ thao tác cốt lõi và rút chi tiết sâu. Chọn giữ hướng dẫn cài SQL Server riêng dưới dạng ngắn, không tạo tài liệu mới. Hoàn tất ngày 21/10/2026; phạm vi gồm hai bài, test liên quan và phần ghi nhận này cùng plan. Giữ mọi thay đổi từ lượt trước.

Đã sửa:

- **1.2:** phần chính "Từ SSMS đến danh mục phòng ban" gộp liên hệ workbook/sheet với máy chủ/database/bảng, giải nghĩa SSMS, bốn thông tin kết nối và hai tên HRM_Demo/database thật. Giữ ba hình SSMS, câu `SELECT * FROM PhongBan;`, kết quả sáu phòng và lời trả lời ngay cạnh kết quả. Không đồng nhất có tên trong danh mục với còn hoạt động. Bỏ hình Excel trùng kết quả, LineMap, phần trả lời riêng và chi tiết phiên bản/instance/schema không cần cho thao tác.
- **1.2:** giữ hướng dẫn máy riêng tùy chọn bốn bước, phạm vi Developer và cảnh báo script tạo lại bảy bảng. Phân biệt web luôn rollback với SSMS chạy thật, chỉ đọc trên database khóa học dùng chung; kết thúc bằng Disconnect và đóng các kết nối. Rút lỗi kết nối còn thông tin cần để kiểm hoặc báo người phụ trách. Thời lượng 20 phút không tính cài đặt.
- **1.3:** phần chính "Từ ô Excel đến kiểu dữ liệu của cột" đặt hình Excel cạnh Format Cells, bảng kiểu thực của bộ mẫu cạnh hình Columns của HopDong, bảng xử lý đủ sáu ô cạnh lời trả lời chị Hạnh. Giữ DATEFORMAT theo phiên, ngày hợp lệ chưa chắc đúng, rounding/overflow, NULL theo quy ước, NOT NULL không chặn chuỗi rỗng và giả định công cụ import. Bỏ CREATE TABLE, SELECT TOP 5, CAST gây lỗi, Messages và LineMap lặp. Thời lượng 15 phút.
- **Chung:** giữ năm mục cấp 2 và mỗi bài năm câu tự kiểm tra, chữ đậm chọn lọc và code có nền cho dẫn chứng. Ứng dụng bám đúng chủ đề. Hai slug được bỏ khỏi legacy allowlist; sửa assertion khóa chi tiết đã cắt thành bảo vệ kiến thức, số liệu và giới hạn còn cần giữ. Không đổi giao diện/component, API, schema frontmatter hoặc nội dung bài khác.

Review độc lập và xử lý:

- Hai agent Codex mới, `fork_turns: none`, kế thừa model của phiên; không truyền model/effort override. Report ở `temp/review/2026-10-20-1-2-1-3-narrative/review-bai-1-2-sql-server-ssms-hrm-demo.md` (34 mục) và `review-bai-1-3-bang-cot-kieu-du-lieu.md` (25 mục). Agent 1.3 dừng vì hạn mức sau khi đã ghi report, sau đó được tiếp tục đúng agent và xác nhận report hoàn tất; không tạo review mới thay thế.
- **1.2 đã sửa:** thêm mốc tháng 10/2026, định nghĩa máy chủ bằng một vế; chỉ vị trí Object Explorer, giải nghĩa lựa chọn Default instance tại chỗ. Làm trơn câu mã truy cập, phân biệt 10 giây thực thi với thời gian chờ kết nối (đối chiếu runner: requestTimeout 10.000 ms, connectionTimeout 90.000 ms). Giới hạn lời dặn chỉ đọc/đáp án vào database chung, chốt "Ở bài này chỉ cần…", cắt hai vế lặp.
- **1.3 đã sửa:** giả định lấy đúng chữ hiển thị được nói ngay đầu; phân biệt chuyển kiểu với việc giữ/đổi giá trị mong muốn. Sửa hàng Format Cells trong Memo: bên SQL mô tả khả năng đổi chữ sang kiểu cột. Giải nghĩa chuỗi rỗng, dùng đúng decimal(18,0), highlight dẫn chứng còn thiếu, chốt phạm vi và cắt checklist/vế lặp sau bảng. Các kết quả chuyển đổi được người viết kiểm lại bằng SELECT trước khi giữ.
- **Không làm theo:** không có đề xuất còn lại cần loại vì đi ngược quyết định. Nhận xét ban đầu về hai backslash ở localhost đã được chính reviewer rút sau khi đếm ký tự thật: source và DOM đều có đúng một ký tự mã 92; không sửa chỗ đó. Những mục "Giữ được" được giữ nguyên theo nội dung phù hợp.

Kiểm chứng cuối:

- SELECT trên database thật xác nhận sáu phòng, metadata kiểu/NULL, các ví dụ trong bảng kiểu và thiết lập us_english/mdy. Chuyển chuỗi ngày cho kết quả 2024-01-02/2024-02-01; "chưa rõ" và hai chuỗi tiền không đổi được; 9610000 giữ giá trị; 9610000.6 làm tròn 9610001; 21.25 làm tròn 21.3; 1000.0 vượt decimal(4,1); chuỗi rỗng thành ngày 1900-01-01. Không ghi dữ liệu, không chạy script tạo bảng. Bằng chứng: `temp/verification/2026-10-20-1-2-1-3-narrative/data-evidence.json`.
- Đối chiếu Microsoft Learn về hộp kết nối SSMS, decimal và nvarchar. Kiểm script mẫu bằng đọc source; không thử cài hoặc thao tác SSMS thật. Reviewer đọc như học viên, không được coi review là bằng chứng đã chạy SQL.
- `npm test`: **238/239 đạt**. Lỗi duy nhất vẫn là `no paragraph or list item of a full lesson runs past 120 words`, gồm 13 đoạn nền ở 1.4, 1.5, 2.1, 2.2; 1.2 và 1.3 không có đoạn vượt. Không nới test hay sửa lan các bài đó. `npm run check`: 0 lỗi, 0 warning, 3 hint deprecation cũ. `npm run build`: 68 trang; `npm run check:dist`: đạt 68 trang/1.344 link. Log cuối có tiền tố `final-` trong thư mục verification trên.
- Bản cuối 1280×900 và 1440×900: đúng năm mục lục, không tràn ngang trang/bảng; hình Excel giữ ô C2/D3 tô vàng, C3 đang chọn và ngày/số căn phải; hình SSMS đánh dấu đúng cột. Đối chiếu giao diện 1.1, giữ typography và chiều rộng đọc hiện có. Enter mở câu đầu, Tab chuyển câu kế, Space mở câu đó ở cả hai bài. Memo đã kiểm lại trên bản render sau sửa. Ảnh lưu trong cùng thư mục verification; viewport được khôi phục sau kiểm tra.

Bàn giao local để người làm khóa học review; không push/deploy.

## 19. Tiếp tục bài 1.4, 1.5, 1.6 theo khung đã duyệt (21/10/2026)

Người làm khóa học yêu cầu tiếp tục ba bài, dùng Superpowers và cùng chuẩn đã áp dụng ở 1.1–1.3. Dùng checkout/nhánh đang có, giữ các thay đổi trước. Không thay thiết kế chung, component, API, frontmatter schema hoặc YAML bài tập; không chỉnh bài ngoài phạm vi.

Đã sửa:

- **1.4 — 15 phút:** phần chính "Từ mã nhân viên đến quan hệ giữa các bảng": khóa chính xác định dòng → khóa ngoại giữ mã tham chiếu → đọc lỗi xóa phòng cùng các hồ sơ liên quan → chốt quyết định nghiệp vụ. Giữ hình Excel/SSMS có đánh dấu, một câu DELETE chỉ để đọc không có nút copy, nguyên văn phần lỗi API trả và đủ10hồsơ với hai dòng đã nghỉ được tô. Bỏ hai INSERT, DDL, LineMap, giảng mức độ/số hiệu lỗi và phần trả lời riêng. Giữ khóa nhiều cột, FK tự tham chiếu/NULL, điều kiện kiểm và NO ACTION, hợp lệ khác đúng, phòng hiện tại khác lịch sử; năm câu tự kiểm tra phủ mục tiêu.
- **1.5 — 15 phút:** phần chính "Tìm đường lấy dữ liệu trên sơ đồ HRM_Demo": hai lần dò Excel → ERD và hai phía một/nhiều → đường BangLuong → NhanVien → PhongBan. Giữ hình Excel, đường xanh cùng hai cặp cột, giới hạn PK ghép, NULL, quan hệ khai báo, số dòng có thể tăng và phòng ban hiện tại. Bỏ preview JOIN/Result, bảng thống kê bảy quan hệ, LineMap và phần trả lời riêng. Cú pháp kết bảng, cách giữ dòng và xử lý nhiều bảng dẫn tới3.4–3.7; năm câu tự kiểm tra không đòi viết SQL.
- **1.6 — 20 phút:** phần chính "Từ mở sheet đến câu SELECT đầu tiên": bảng/cột/số dòng → chạy SSMS và đọc hai tab → câu lệnh/lời giải → sơ đồ logic. Giữ nguyên query TOP10khôngORDERBY để dạy giới hạn thứ tự, Result12cột/10dòng, Messages, ba bước RunFlow và ba bài tập. Rút khuôn cú pháp, ví dụ TOP2/LineMap và các lời giảng lặp; giữ đánh dấu NV004, số thứ tự kết quả, giới hạn mẫu, SELECT INTO, bôi đen/F5, phân biệt trang bài tập và SSMS, điều kiện gửi dữ liệu cá nhân. Các giá trị trong lời văn và drawer có code, khái niệm in đậm chọn lọc.
- Bỏ ba slug khỏi legacy allowlist, còn bốn bài đầy đủ dùng khung cũ. Assertion về chi tiết xem trước/thống kê/Msg đã bỏ được đổi thành kiểm quan hệ, điều kiện và lời giải còn cần giữ; không hạ yêu cầu về độ dài hoặc dữ liệu. Không thêm test chỉ để khóa câu biên tập; kiểm chuyển khung đã có bước RED trước sửa.

Review độc lập:

- Ba agent Codex mới, mỗi bài một agent, `fork_turns: none`, kế thừa model phiên và không truyền model/effort override. Report ở `temp/review/2026-10-21-1-4-1-6-narrative/`: `review-bai-1-4-khoa-chinh-khoa-ngoai.md` (32 mục), `review-bai-1-5-doc-so-do-erd.md` (31 mục), `review-bai-1-6-cau-select-dau-tien.md` (24 mục). Reviewer chỉ học từ bài/các bài trước và tài liệu quy ước/bối cảnh; không chạy database, đọc script hay report cũ. Reviewer1.5 còn đối chiếu ba ảnh ERD của người viết; các phần chưa kiểm trực quan đều được ghi rõ.
- **1.4 đã sửa:** thêm điều kiện "nếu quyết định xóa phòng" ở mục tiêu, dùng code cho VH trong Key và giữ NO ACTION ngay tại ý Ứng dụng về chặn xóa. Điều kiện NO ACTION đã kiểm qua metadata và tài liệu Microsoft.
- **1.5 đã sửa:** sửa câu vấp nghĩa về đường liên kết không tự chọn kỳ lương; rút chú thích ERD bị lặp, câu lặp trường hợp0nhânviên, cảnh báo lịch sử lặp và phần thừa ở đáp án5. Giới hạn phát biểu VLOOKUP theo dò chính xác như công thức FALSE đang minh họa, không giảng thêm chế độ dò.
- **1.6 đã sửa:** nói rõ nhập câu mẫu trước F5; Copy with Headers rồi dán vào Excel, gọi kết quả là bản chép; bỏ chữ "nghiệm thu", cảnh báo TOP lặp ở đầu, lời kể lại cả sơ đồ trước RunFlow và câu import/"mẫu đại diện" ở Hay nhầm. Rút nhánh bài sâu không cần thiết, giữ giới hạn mẫu ngay trong Ứng dụng. Không đổi câu truy vấn, dữ liệu, sơ đồ hay bài tập sau review.
- **Không làm theo:** không có đề xuất còn cần loại; các mục Giữ được giữ nguyên. Không lấy việc reviewer chưa chạy SQL làm lý do bịa kết quả hoặc thêm chi tiết sâu trở lại. Giữ đúng các quyết định trước về tên bảng ngắn, nhãn Memo, cách tô RunFlow và thiết kế sơ đồ chung.

Kiểm chứng:

- `temp/verification/2026-10-21-1-4-1-6-narrative/data-evidence.json` lưu SELECT thực tế:10hồsơ VH gồm2đãnghỉ;7FKđangbật/NO_ACTION;48hồsơ, mẫu10dòng; giá trị lương/dò của ba dòng Excel1.5;3hợpđồng NV021; mã quản lý NV001/NV004/NV005. Script `check-fixtures.mjs` đối chiếu từng ô Result1.4/1.6, toàn bộ dòng trích của ba bước RunFlow và tổng48/48/10, ba dòng Excel1.5, tên/giá trị mã và điều kiện metadata; tất cả khớp.
- DELETE và câu thiếu FROM chỉ chạy qua `handleRun` của API bài tập, dùng guard và runner luôn rollback; không gửi câu ghi trực tiếp qua kết nối đọc. Messages1.4 khớp đúng chuỗi lỗi API, không tự dựng Msg/Level/State. `check:exercises` đạt cả14bài hiện có (riêng1.6 trả6/55/20dòng); `check:data` sau cùng báo "Không bảng nào lệch." Không đổi dữ liệu dùng chung.
- Đối chiếu [ràng buộc khóa](https://learn.microsoft.com/en-us/sql/relational-databases/tables/primary-and-foreign-key-constraints?view=sql-server-ver17), [thứ tự logic SELECT](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql?view=azuresqldb-mi-current), [TOP](https://learn.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql?view=sql-server-ver17) và [VLOOKUP](https://support.microsoft.com/en-us/excel/functions/vlookup-function). Không thử SSMS hoặc Excel thật, không khẳng định đã kiểm giao diện công cụ ngoài các hình mô phỏng.
- Bốn lệnh cuối: `npm test` **238/239 đạt**, còn đúng sáu đoạn nền quá120chữ ở2.1/2.2; toàn bộ1.4/1.5/1.6 không có đoạn vượt. Tên test lỗi: `no paragraph or list item of a full lesson runs past 120 words`; không nới test hoặc sửa lan hai bài đó. `npm run check`:0lỗi/0warning/3hint deprecation cũ. `npm run build`:68trang; `npm run check:dist`:đạt68trang/1.341link. Log `final-*.log`, `exercises.log` và `check-data.log` trong thư mục verification trên.
- Bản cuối1280×900/1440×900: mục lục5/5/6mục, đúng hình và dấu, không tràn ngang trang; bảng12cột và ERD có vùng cuộn riêng. Excel1.4 tô C4, Excel1.5 tô D2/chọn E2, ngày thật ở1.6 căn phải; SSMS1.4 đánh dấu4cột, Results1.4 tô2dòng nghỉ và1.6 tôNV004. Enter/Tab/Space mở và chuyển câu tự kiểm tra của1.4/1.5; RunFlow mở bằng Enter, đổi FROM/SELECT/TOP bằng phím mũi tên, Escape đóng và trả focus về thẻ. Bài1.6 còn đủ3link bài tập, các trang đề đã được reviewer đọc. `ui-checks.json` và ảnh trong thư mục verification ghi lại trạng thái; viewport được khôi phục trước bàn giao.

Bàn giao bản local để review; không commit/push/deploy trong lượt này.
