# Báo cáo kiểm thử chất lượng khóa học Microsoft SQL Server – góc nhìn học viên mới

Website: https://nhatlam1111.github.io/microsoft-sql-lession/
Phạm vi: bài 1.1 đến 3.7 (22 bài: Level 1 gồm 1.1–1.6; Level 2 gồm 2.1–2.9; Level 3 gồm 3.1–3.7). Bài 3.8–3.10 và Level 4–6 nằm ngoài phạm vi yêu cầu, chưa đọc.

## Phương pháp và giới hạn (đọc trước khi đọc điểm)

- Đọc từng bài bằng trình duyệt tích hợp (lấy toàn văn chữ của bài). Với bài 1.1 và 1.5 có kiểm thêm ảnh chụp minh họa Excel và sơ đồ ERD.
- **Không chạy được câu lệnh SQL nào trên database.** Không có SSMS, không có tài khoản, và trang bài tập bắt nhập "mã truy cập" mà trang không nói lấy ở đâu (đã kiểm: Bài tập 1 của bài 1.6 hiện ô "Nhập mã truy cập để chạy bài tập"). Vì vậy mọi bảng "Results" trong bài được ghi nhận là **lời tác giả trình bày, chưa xác minh**. Đây là giới hạn của phiên kiểm thử, không phải kết luận rằng câu lệnh sai.
- Đã đối chiếu chéo số liệu giữa các bài (ví dụ: 48 hồ sơ, 45 đang làm, 14 hồ sơ KD trong đó 13 đang làm, 55 hợp đồng, 43 dòng lương kỳ 2026-09). Các số này khớp nhau giữa các bài; xem mục "Nhất quán" dưới đây.
- Đã mở trang bài tập 1 của bài 1.6 và thử gõ một câu SELECT rồi bấm Chạy (F5). Không bấm "Nộp bài". Câu gõ vào đã bị dính vào dòng ghi chú (xem lỗi 1.6-03).
- Các bài tập 2–3 của 1.6 và các bài tập của 2.x–3.x chỉ đọc đề, chưa mở.

## Thang chấm dùng trong báo cáo

- Điểm từng bài = tổng sáu tiêu chí theo thang của đề (25/20/20/15/15/5), chấm từ bằng chứng trong bài.
- Điểm nội dung không tính đến việc bài tập không chạy được.
- Quy tắc Critical trong đề: lỗi Critical ngăn mục tiêu chính của bài thì trần 59. Lỗi truy cập bài tập (S1 dưới đây) được xếp Critical cho mọi bài có mục tiêu "tự viết và chạy được". Vì vậy báo cáo có hai cột: điểm nội dung và điểm sau trần.
- Đạt: từ 75. Cần cải thiện: 60–74. Không đạt: dưới 60 (theo điểm nội dung).
- Điểm tổng toàn khóa là trung bình cộng 22 bài, mỗi bài một phiếu.

---

# Phần I – Nhật ký học tập theo từng bài

## Chương 1 – Làm quen (1.1 đến 1.6)

### Bài 1.1 – Database là gì, nhìn từ một file Excel nhân sự
URL: /bai/1-1-database-la-gi/

**Mục tiêu theo cách học viên hiểu:** hiểu vì sao hai file nhân sự lệch nhau, database khác Excel ở điểm gì.

**Tiếp thu được:**
- Database là tập dữ liệu có cấu trúc; bảng giống sheet; dòng là một bản ghi.
- Khóa chính chặn trùng mã; khóa ngoại chỉ cho mã có trong danh mục. Có ví dụ "Kế toán" và "Ke toan" bị tách nhóm.
- Ảnh Excel minh họa (C4, D4, NV005 lặp) khớp với lời mô tả đã đối chiếu.

**Chưa hiểu hoặc chưa vận dụng được:**
- "SQL là ngôn ngữ để hỏi và thao tác" và "T-SQL" được đưa ra như thuật ngữ quen thuộc, không định nghĩa.
- Nói "khi ràng buộc đang bật, SQL Server kiểm các câu ghi thông thường" nhưng không biết "câu ghi" là gì.
- Đoạn về quyền ghi ("dù tài khoản có thể vẫn ghi được") làm tôi không biết mình có được phép làm gì.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Mục "Hay nhầm ở đâu", bullet về SSMS | "Sửa dữ liệu dùng chung khi chưa nắm cách làm... Ở giai đoạn đầu, bạn chỉ đọc database khóa học... dù tài khoản có thể vẫn ghi được." | Quy tắc an toàn được nêu trước khi học viên biết SSMS và giao dịch là gì. Tôi không hiểu vì sao "tài khoản có thể vẫn ghi" mà vẫn không được ghi. | Chuyển quy tắc "chỉ chạy câu đọc" sang bài 1.2 khi giới thiệu SSMS, kèm một câu lý do. |
| Major | Phần "Nguồn chung cần cấu trúc và luật" | "...SQL Server kiểm các câu ghi thông thường và từ chối câu vi phạm" | "Câu ghi" không được định nghĩa. Tôi đoán đó là lệnh thêm/sửa, nhưng không chắc. | Thêm một câu định nghĩa: câu ghi là lệnh thêm, sửa hoặc xóa dữ liệu. |
| Minor | Đoạn "Lấy danh sách từ nguồn đã thống nhất" | "phiên bản dùng trong SQL Server gọi là T-SQL" | Thuật ngữ thừa ở bài đầu, chưa cần thiết. | Bỏ hoặc để sang bài 1.2. |
| Minor | Nhiều chỗ | Nhắc bài 1.3, 1.4, 1.6, 5.2, 5.4, 5.5, 6.6 | Khoảng 7 tham chiếu tới bài sau trong một bài ngắn. Vẫn đọc được vì có ghi rõ số bài, nhưng làm bài dài thêm. | Giảm tham chiếu, giữ những cái thật cần. |

**Câu hỏi học viên muốn hỏi tác giả:** "Tôi có được phép ghi dữ liệu trên database này không? Nếu không, vì sao lại nói tài khoản có thể ghi?"

**Bài tập và tự kiểm tra:** bốn câu tự kiểm tra, đọc được và trả lời được từ bài. Không có bài thực hành.

**Điểm:** Dễ hiểu 20/25 · Giải thích 15/20 · Trình tự 14/20 · Ví dụ 14/15 · Tự học 9/15 · Câu chữ 4/5 = **76** (không áp trần).
**Kết luận: Đạt** (sát ngưỡng dưới của Đạt).

---

### Bài 1.2 – SQL Server, SSMS và database mẫu HRM_Demo
URL: /bai/1-2-sql-server-ssms-hrm-demo/

**Mục tiêu theo cách học viên hiểu:** kết nối được vào database và xem danh mục phòng ban.

**Tiếp thu được:**
- Phân biệt được SQL Server (phần mềm quản lý), database (dữ liệu) và SSMS (công cụ để kết nối).
- Đường đi máy chủ → database → bảng được vẽ rõ bằng hình Object Explorer.
- Cảnh báo "không chạy script HRM_Demo trên database dùng chung" và "tránh Edit Top 200 Rows" là thông tin an toàn tốt.

**Chưa hiểu hoặc chưa vận dụng được:**
- Không có tài khoản, không có tên máy chủ thật, không có mật khẩu. Bài nói "hỏi IT" nhưng không có cách hỏi nào trong website.
- Không hiểu schema "dbo", SQL Server Authentication, cổng 1433, tường lửa, Encrypt: Strict, Trust Server Certificate. Các ô này đều xuất hiện trong hộp kết nối mà bài yêu cầu điền.
- Không hiểu "Azure SQL Database" khác SQL Server ở đâu, vì sao khóa học dùng dịch vụ này.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Critical (S1) | Bài tập sau bài 1.6, và toàn bộ trang bài tập | Trang bài tập yêu cầu "Nhập mã truy cập để chạy bài tập"; bài 1.2 nói mã do "người phụ trách cấp" | Học viên không có cách nào lấy mã nếu không có người hỗ trợ. Không thể tự kết nối, không thể làm bài tập trên trang. Đây là lỗi truy cập, không phải lỗi chữ. | Nói rõ trên trang cách xin mã (ai, qua đâu). Nếu học viên tự học, cung cấp một đường dẫn thực hành không cần mã hoặc một bộ dữ liệu chạy được trên máy có SQL Server. |
| Major | Đoạn "Chuẩn bị công cụ" | "mạng cho phép kết nối ra cổng 1433" | Cổng 1433 là khái niệm mạng, không được giải thích. Học viên Excel không biết phải hỏi gì. | Thêm một câu nói đây là việc của IT, kèm câu hỏi mẫu cần gửi IT. |
| Major | Hộp kết nối | "Encrypt: Strict (Minimum SQL Server 2022 and Azure SQL)"; "Trust Server Certificate: để trống" | Học viên không biết chọn gì nếu IT chỉ đưa tài khoản. Bài không nói khi nào phải đổi các ô này. | Ghi một giá trị mặc định kèm lý do, hoặc chuyển phần này sang phụ lục. |
| Major | Đoạn "Đường đi tới bảng phòng ban" và phần "Bản riêng trên máy" | "Tạo database HRM_Demo" và "HRM_Demo ... nằm trong database free-sql-db-8797714" | Có hai tên database, một tên là HRM_Demo, một tên là free-sql-db-8797714. Học viên không biết tên nào phải chọn ở bước nào. | Đặt một bảng riêng: tên dùng cho máy riêng và tên dùng cho máy chủ khóa học. |
| Major | Đoạn "Azure SQL Database... cùng họ với SQL Server" | "Khóa học dùng Azure SQL Database... cùng họ với SQL Server và dùng T-SQL" | Tên khóa học là SQL Server, nhưng bài nói dùng Azure SQL. Học viên không biết hai cái khác nhau thế nào, và kiến thức này có áp dụng cho SQL Server thật không. | Một câu phân biệt rõ, ví dụ: Azure SQL là SQL Server chạy trên đám mây. |
| Major | Mục "Câu lệnh cho tình huống" | "Gõ câu dưới đây... SELECT * FROM PhongBan;" kèm lời "cú pháp SELECT học ở bài 1.6" | Bài yêu cầu gõ và chạy một câu chưa được dạy. Tôi chỉ có thể sao chép. Bài khó tự kiểm tra là mình có hiểu hay không. | Bỏ câu này khỏi bài 1.2, để việc chạy câu SELECT đầu tiên nằm trong bài 1.6. |
| Major | Toàn bài | Khoảng 40 thuật ngữ mới trong một bài: schema, dbo, transaction, rollback, COMMIT, Object Explorer, Results, Messages, mã lỗi 40613, firewall | Quá nhiều khái niệm trong một bài 20 phút. Với người không biết SQL, bài này gần như không thể học độc lập. | Tách bài thành: kết nối (có thể bỏ), làm quen SSMS, và chuyển phần giao dịch sang 5.4. |
| Minor | Mục "Hay nhầm ở đâu" | "Gặp 40613 rồi nghĩ sai tài khoản" | Lỗi có mã nhưng không có cách đọc thông báo. Chưa đủ để xử lý. | Ghi cách kiểm đúng từng bước theo thứ tự. |

**Câu hỏi học viên muốn hỏi tác giả:** Tôi lấy tài khoản và tên máy chủ ở đâu? Tôi phải chọn tên database nào? Vì sao phải học "schema" ngay bây giờ?

**Bài tập:** bài này không có bài tập. Tự kiểm tra có bốn câu, nhưng không thể kiểm chứng vì chưa kết nối được.

**Kết quả thử thực hành:** không kết nối được (không có tài khoản, không có SSMS). Không khẳng định đã thực hành.

**Điểm:** Dễ hiểu 9/25 · Giải thích 10/20 · Trình tự 9/20 · Ví dụ 11/15 · Tự học 4/15 · Câu chữ 3/5 = **46** (điểm nội dung). Áp trần S1: 46 (không đổi).
**Kết luận: Không đạt.**

---

### Bài 1.3 – Bảng, cột và kiểu dữ liệu
URL: /bai/1-3-bang-cot-kieu-du-lieu/

**Mục tiêu theo cách học viên hiểu:** đọc được kiểu dữ liệu và khả năng nhận NULL của một cột; biết chuyển kiểu có thể làm gì với dữ liệu.

**Tiếp thu được:**
- Cột có kiểu riêng cho mọi dòng. Ví dụ ngày để kiểu date, tiền để kiểu số, mã định danh để kiểu chữ để giữ số 0 đầu (đoạn về SoCCCD rất hay).
- Bảng so sánh các kiểu (varchar, nvarchar, char, date, time, decimal) có ví dụ từ bộ mẫu.
- Ví dụ "01/02/2024 và chưa rõ" đi kèm tình huống chị Hạnh rất gần thực tế.

**Chưa hiểu hoặc chưa vận dụng được:**
- Kết luận "01/02/2024 được đọc thành ngày 2 tháng 1" dựa trên "us_english, DATEFORMAT là mdy" nhưng hai khái niệm này không được giải thích. Tôi không biết mình có thể kiểm tra điều đó không.
- Bảng "Ô trong file / Database làm gì" là kết quả chuyển đổi do tác giả tuyên bố. Không có câu lệnh, không có ảnh kết quả, không thể tái lập.
- "1900-01-01" xuất hiện từ chuỗi rỗng, không có giải thích nguồn.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Mục "Đối chiếu từng ô" | "Phiên mặc định của tài khoản khóa học dùng ngôn ngữ us_english, DATEFORMAT là mdy... chuỗi 01/02/2024 vì vậy được đọc thành ngày 2 tháng 1" | Đây là lời khẳng định không kiểm được. Tôi sẽ tin hoặc nghi ngờ mà không có cách nào để xác định. Cũng không hiểu DATEFORMAT là gì. | Giải thích ngắn về thiết lập vùng và cho một câu kiểm tra; nếu không kiểm được thì nói rõ đây là kết quả tác giả đo. |
| Major | Bảng "Ô trong file" | "C2: 01/02/2024 — Đổi thành 2024-01-02, không báo lỗi" | Cùng một chuỗi, bài nói lúc là 2 tháng 1, lúc là 1 tháng 2. Học viên không biết giá trị nào đúng. Bài không nói phải thống nhất với IT trước. | Nêu rõ mục tiêu là chuẩn hóa chuỗi trước khi gửi, ví dụ yyyy-mm-dd. |
| Major | Mục "Hay nhầm" | "Chuỗi rỗng đưa vào cột date còn có thể thành 1900-01-01, không báo lỗi." | Con số lạ không có nguồn. Học viên sẽ không biết phải làm gì khi gặp. | Bỏ, hoặc giải thích kèm cách tránh. |
| Major | Mục "Hay nhầm" | "21.25 vào decimal(4,1) thành 21.3... 1000.0 ... bị từ chối vì tràn số" | Làm tròn và tràn số là khái niệm mới, chưa có ví dụ chạy được để kiểm. | Thêm chú giải hoặc đưa ví dụ có kết quả kiểm chứng được. |
| Minor | Mục "Chọn kiểu" | "varchar(n): chuỗi tối đa n byte... mỗi ký tự chiếm một byte"; "đệm khoảng trắng" | "Byte" và "đệm" không được định nghĩa. | Viết lại: "n ký tự" thay vì "n byte" khi học viên chưa cần biết byte. |
| Minor | Đoạn "Hiểu NOT NULL là đã nhập đầy đủ" | "NgayNghiViec, NULL được bộ mẫu dùng..." | Nhắc tới cột NgayNghiViec trước khi bài 1.4 liệt kê nó. | Đưa sang 1.4 hoặc ghi chú đây là ví dụ từ bài sau. |

**Câu hỏi học viên muốn hỏi tác giả:** Vì sao 01/02/2024 là 2 tháng 1? Excel của tôi hiểu là 1 tháng 2. Bảng kết quả này lấy ở đâu?

**Bài tập:** không có. Tự kiểm tra có năm câu, trả lời được từ bài nhưng chủ yếu là đọc lại.

**Điểm:** Dễ hiểu 17/25 · Giải thích 11/20 · Trình tự 12/20 · Ví dụ 12/15 · Tự học 4/15 · Câu chữ 5/5 = **61**.
**Kết luận: Cần cải thiện.**

---

### Bài 1.4 – Khóa chính, khóa ngoại và chuyện "Mã NV"
URL: /bai/1-4-khoa-chinh-khoa-ngoai/

**Mục tiêu theo cách học viên hiểu:** phân biệt khóa chính và khóa ngoại; hiểu vì sao không xóa được phòng VH.

**Tiếp thu được:**
- Khóa chính = không trùng, không NULL; khóa ngoại = mã phải tồn tại ở bảng kia. Ví dụ "KT01 không có thì bị từ chối" rất rõ.
- Tình huống gộp phòng VH là bài có sức thuyết phục nhất trong chương 1. Ba câu hỏi cần chốt với chị Hạnh là dạng việc nghiệp vụ thật.
- Phân biệt khóa ngoại với Data Validation trong Excel ("khóa ngoại là luật của dữ liệu, không phải ô chọn trên màn hình") đúng và dễ nhớ.

**Chưa hiểu hoặc chưa vận dụng được:**
- "NO ACTION" là gì và vì sao được chọn. Bài chỉ nói "cách xử lý mặc định" nhưng không giải thích.
- Phải đoán bảng 10 hồ sơ VH lấy từ câu nào; không có câu SELECT tương ứng.
- Câu DELETE nhận về lỗi "conflicted with the REFERENCE constraint" chưa được học, không hiểu hết từng chữ.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Đoạn "Khóa ngoại là luật kiểm khi ghi" | "Trong bộ mẫu, khóa ngoại dùng cách xử lý mặc định NO ACTION" | Thuật ngữ không định nghĩa. Tôi biết điều gì xảy ra nhưng không biết vì sao gọi là NO ACTION. | Định nghĩa ngắn kèm một câu: nghĩa là từ chối xóa khi còn dòng tham chiếu. |
| Major | Mục "Đọc lỗi xóa phòng" | "DELETE FROM PhongBan WHERE MaPB = 'VH';" | Câu DELETE và WHERE chưa dạy. Bài nói "chỉ để đọc" nhưng học viên không biết câu này nguy hiểm đến đâu nếu chạy. | Ghi rõ: đây là câu xóa, không chạy; chuyển sang 5.3 nếu cần. |
| Major | Bảng 10 hồ sơ VH | Bảng kết quả hiển thị không đi kèm câu lệnh | Dữ liệu từ một câu SELECT không được cho thấy. Tôi không thể biết bảng này đến từ đâu, và không thể kiểm tra. | Ghi câu lệnh đã dùng để lấy bảng này. |
| Minor | Mục "Excel" | "cột mã phòng dùng Data Validation dạng List" | Học viên chỉ biết công thức đơn giản. Data Validation cần giới thiệu. | Thêm một câu mô tả Data Validation là gì. |
| Minor | Đoạn về ChamCong, BangLuong | "ChamCong dùng cặp (MaNV, Ngay)" | Khóa gồm hai cột được nhắc trước khi bảng này xuất hiện trong bài. | Ghi chú "sẽ gặp ở bài 1.5". |
| Minor | Cuối bài | "bài 4.6 hướng dẫn soát dữ liệu" | Tham chiếu tới bài 4.6, bài này chỉ có ý nghĩa khi học viên đã đi đến đó. | Giảm tham chiếu. |

**Câu hỏi học viên muốn hỏi tác giả:** NO ACTION nghĩa là gì? Nếu tôi xóa VH bằng câu lệnh khác thì có sao không? Bảng 10 hồ sơ lấy từ đâu?

**Bài tập:** không có. Tự kiểm tra có năm câu, trả lời được từ bài.

**Điểm:** Dễ hiểu 20/25 · Giải thích 15/20 · Trình tự 14/20 · Ví dụ 15/15 · Tự học 6/15 · Câu chữ 4/5 = **74**.
**Kết luận: Cần cải thiện** (sát Đạt).

---

### Bài 1.5 – Đọc sơ đồ quan hệ (ERD) của HRM_Demo
URL: /bai/1-5-doc-so-do-erd/

**Mục tiêu theo cách học viên hiểu:** tìm đường từ bảng lương tới tên phòng.

**Tiếp thu được:**
- Đường BangLuong → NhanVien → PhongBan được diễn bằng hai lần dò trong Excel, rất trực quan.
- Phân biệt một-nhiều bằng ví dụ phòng và hồ sơ.
- Đoạn "một hồ sơ chỉ có một ô MaPB" cho thấy giới hạn thiết kế, một ý hay.

**Chưa hiểu hoặc chưa vận dụng được:**
- Ký hiệu trên sơ đồ (1, ∞, chấm tròn, đường vòng) được đọc bằng lời nhưng sơ đồ rất nhỏ. Trên khung đọc phải cuộn ngang và chữ khó đọc (đã kiểm bằng ảnh chụp).
- Phần Hay nhầm nói về Database Diagrams, sysdiagrams, quyền db_owner; đây là kiến thức quản trị mà khóa học tự nói là không dạy.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Ví dụ Excel | "=VLOOKUP(D2,PhongBan!A:B,2,FALSE)" | VLOOKUP chưa được giới thiệu. Trang Giới thiệu hứa "đặt cạnh việc quen làm trên Excel", nhưng học viên chỉ biết công thức đơn giản. | Thêm một đoạn một câu giải thích VLOOKUP, hoặc đổi sang công thức học viên đã biết. |
| Major | Hay nhầm (bullet 3) | "Mở Database Diagrams... cần quyền db_owner" | Quản trị và quyền truy cập không thuộc phạm vi. Gây hoang mang, học viên không biết mình có đang vượt quyền. | Bỏ khỏi bài hoặc chuyển sang bài quyền truy cập 6.1. |
| Major | Sơ đồ ERD | Ký hiệu 1, ∞, PK, FK, chấm tròn, đường vòng | Chữ rất nhỏ, phải cuộn ngang. Chú giải chỉ có một câu. | Phóng to hoặc chia sơ đồ thành các khung nhỏ có chú giải. |
| Minor | Trong bài | "NV021 có ba hợp đồng" và "NV004 không có quản lý trực tiếp" | Số liệu không có ở bài này để đối chiếu. Học viên phải tin. | Thêm bảng nhỏ hoặc ghi nguồn. |
| Minor | Tham chiếu | "Cú pháp kết bảng học ở bài 3.4" | Bài 3.4 rất xa, học viên đọc sơ đồ được nhưng không biết đang đi tới đâu. | Ghi tóm tắt một dòng cho từng tham chiếu. |

**Câu hỏi học viên muốn hỏi tác giả:** Đường nối có chấm tròn nghĩa là gì? Nếu một người có hai hợp đồng thì sơ đồ thể hiện ở đâu?

**Bài tập:** không có. Tự kiểm tra có năm câu, đều trả lời được từ bài.

**Điểm:** Dễ hiểu 16/25 · Giải thích 13/20 · Trình tự 14/20 · Ví dụ 13/15 · Tự học 5/15 · Câu chữ 4/5 = **65**.
**Kết luận: Cần cải thiện.**

---

### Bài 1.6 – Câu SELECT đầu tiên
URL: /bai/1-6-cau-select-dau-tien/

**Mục tiêu theo cách học viên hiểu:** viết và chạy được SELECT để xem một bảng.

**Tiếp thu được:**
- SELECT * FROM NhanVien; và SELECT TOP (10) *: cấu trúc và tác dụng được giải thích rõ.
- Mô hình từng bước FROM → SELECT → TOP có giá trị giải thích, học viên hình dung được.
- Lời cảnh báo "Edit Top 200 Rows là lưới ghi dữ liệu dùng chung" đúng và cần thiết.

**Chưa hiểu hoặc chưa vận dụng được:**
- Không chạy được câu nào. Không thể kiểm xem bảng 48 hồ sơ hay kết quả 10 dòng có đúng không.
- Nhắc ORDER BY, SELECT INTO, WHERE, lỗi "Must specify table to select from" trước khi dạy.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Critical (S1) | Trang bài tập 1–3 | "Nhập mã truy cập để chạy bài tập" | Đã kiểm trên trang. Không có mã, không chạy được. Mục tiêu "tự viết và chạy được" không đạt được cho người tự học. | Như lỗi 1.2 (S1). |
| Major | Mục "Hay nhầm" | "Bôi đen thiếu phần rồi bấm F5... có thể gặp lỗi Must specify table to select from" | Thông báo lỗi là lời tác giả nêu, không kiểm được. Cũng là điều học viên không cần biết lúc này. | Ghi "có thể gặp lỗi" và chỉ giữ một lỗi có ý nghĩa. |
| Major | Ô soạn thảo bài tập | Trong ô có sẵn dòng "-- Viết câu lệnh của bạn ở đây" | Đã kiểm: khi tôi bấm vào giữa dòng ghi chú rồi gõ "SELECT * FROM ChucDanh;", ô hiện "-- Viết câu lệnSELECT * FROM ChucDanh;h của bạn ở đây". Câu bị nằm trong dòng ghi chú, nên sẽ không chạy. Bài chỉ nói dòng đó là ghi chú nhưng không cảnh báo cách làm. | Xóa dòng ghi chú khi bấm vào ô, hoặc đặt ghi chú trên dòng riêng và con trỏ ở dòng dưới. |
| Major | Đoạn "Sơ đồ thể hiện thứ tự logic" | "Bạn viết SELECT trước, nhưng theo thứ tự logic, SQL Server xét FROM trước." | Khái niệm "thứ tự logic" không được giải thích. Học viên cần câu một dòng để hiểu. | Thêm một câu nói đây không phải thứ tự đọc dữ liệu thật. |
| Major | Đoạn "Tình huống" | "NhanVien ... 48 hồ sơ" và "Hình minh họa chỉ trích năm cột" | Số 48 không kiểm được. Hình chỉ năm cột trong khi bảng dưới 12 cột, dễ gây nhầm lẫn cho người mới. | Ghi rõ nguồn số liệu và nói hình chỉ trích. |
| Minor | Nhiều chỗ | ORDER BY, SELECT INTO, WHERE được nhắc | Nhắc từ khóa chưa dạy. Học viên sẽ ghi nhớ mà không hiểu. | Chỉ nhắc khi cần, kèm bài sẽ học. |

**Bài tập 1 đã thử:** mở trang. Yêu cầu "Lấy mọi chức danh, đủ mọi cột của danh mục" (kết quả cần: MaCD, TenCD). Đã gõ SELECT * FROM ChucDanh; rồi bấm Chạy (F5). Trang hiện yêu cầu mã truy cập, không chạy. Không bấm Nộp bài. Bài 2 và 3 chỉ đọc đề: "Toàn bộ hợp đồng" và "Toàn bộ đơn nghỉ phép".

**Câu hỏi học viên muốn hỏi tác giả:** Mã truy cập lấy ở đâu? Nếu có mã, dữ liệu trên trang và trong SSMS có giống nhau không?

**Điểm:** Dễ hiểu 17/25 · Giải thích 14/20 · Trình tự 13/20 · Ví dụ 12/15 · Tự học 4/15 · Câu chữ 4/5 = **64** (điểm nội dung). Áp trần S1: **59**.
**Kết luận: Cần cải thiện** (điểm nội dung); S1 cần xử lý trước khi phát hành.

---

## Chương 2 – Cơ bản (2.1 đến 2.9)

### Bài 2.1 – Chọn cột và đặt tên cột
URL: /bai/2-1-chon-cot-dat-ten-cot/

**Mục tiêu theo cách học viên hiểu:** chọn đúng cột, đúng thứ tự, đặt tiêu đề bằng AS.

**Tiếp thu được:** liệt kê cột sau SELECT; AS để đổi tiêu đề mà không đổi dữ liệu; giải thích "thiếu dấu phẩy thì HoTen thành alias" rất đáng giá. Tình huống danh sách gửi Kế toán rõ ràng.

**Chưa hiểu hoặc chưa vận dụng được:** quy ước dùng ngoặc vuông cho mọi alias được nêu nhưng không giải thích lý do; ví dụ "KD lặp 14 lần" không kiểm được.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Tình huống | "3 hồ sơ đã nghỉ NV020, NV033, NV041" | NV020 chưa xuất hiện ở các bài trước. Học viên không có cách tự xác nhận. | Ghi nguồn hoặc đưa ra bảng hồ sơ đã nghỉ một lần. |
| Minor | Hay nhầm | "Invalid column name 'TenNV'"; "KD lặp 14 lần" | Thông báo và con số không được tái hiện. | Ghi là ví dụ minh họa. |
| Minor | Cuối bài | "bài 6.1" | Tham chiếu xa. | Giảm. |

**Câu hỏi:** Vì sao phải có [] nếu tiêu đề không có khoảng trắng? Có cần viết N trước tiêu đề không?

**Bài tập:** ba bài đề, không mở được (thiếu mã). Chưa thể đánh giá.

**Điểm:** Dễ hiểu 20/25 · Giải thích 15/20 · Trình tự 15/20 · Ví dụ 13/15 · Tự học 6/15 · Câu chữ 4/5 = **73**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

### Bài 2.2 – WHERE: lọc như AutoFilter
URL: /bai/2-2-where-loc-nhu-autofilter/

**Tiếp thu được:** WHERE chỉ giữ dòng; so sánh AutoFilter với WHERE rất rõ; bảng sáu phép so sánh với mốc 20240301 đúng với ba hồ sơ mẫu (NV003, NV001, NV002); giải thích yyyymmdd tránh nhầm ngày.

**Chưa hiểu:** UNKNOWN và TRUE xuất hiện trước bài NULL; "phân biệt dấu" (collation) nhắc trước bài 2.7.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Hay nhầm (bullet 2) | "Cả hai trả 0 dòng... Không có dòng phù hợp khác với lỗi chạy câu lệnh." | Câu bị cắt nghĩa, đọc hai lần vẫn không rõ. | Viết lại: "Câu chạy được nhưng trả 0 dòng, không báo lỗi." |
| Major | Hay nhầm (bullet 5) | "Trong câu sửa/xóa, WHERE còn quyết định dòng bị tác động" | UPDATE và DELETE chưa học. | Bỏ hoặc chuyển sang bài sau. |
| Minor | Đoạn "Viết điều kiện theo giá trị đang lưu" | "Email <> 'mai.tt@hrmdemo.vn' không lấy NV044, NV045" | Ví dụ này dựa trên NULL và chưa dạy NULL. | Chuyển sang bài 2.5. |

**Câu hỏi:** Vì sao 'Đã nghỉ' không có N thì trả 0 dòng? Có phải lỗi máy không?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 17/25 · Giải thích 15/20 · Trình tự 14/20 · Ví dụ 15/15 · Tự học 6/15 · Câu chữ 3/5 = **70**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

### Bài 2.3 – AND, OR, IN, BETWEEN, LIKE
URL: /bai/2-3-and-or-in-between-like/

**Tiếp thu được:** ví dụ thiếu ngoặc (KD OR IT AND khoảng ngày) là đoạn dễ hiểu nhất chương; IN và BETWEEN; LIKE với % và _.

**Chưa hiểu:** năm từ khóa trong một bài, cộng ký tự đại diện và mẫu tiếng Việt; câu "không phải lời hứa SQL Server sẽ kiểm từng vế theo thứ tự vật lý" trừu tượng.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Toàn bài | Năm từ khóa mới, ký tự đại diện, mẫu N'...', ví dụ thiếu ngoặc trong một bài | Khoảng 25 phút là ước lượng lạc quan. Tách thành hai bài: AND/OR/IN và BETWEEN/LIKE. | Tách bài. |
| Minor | Đoạn về thứ tự logic | "Đây là cách hiểu điều kiện, không phải lời hứa SQL Server sẽ kiểm từng vế theo thứ tự vật lý đó." | Học viên không biết câu này nói gì để làm gì. | Bỏ, hoặc nói rõ: điều quan trọng là kết quả, không phải thứ tự. |
| Minor | Bảng LIKE | "Ninh Thị Hà" | Dữ liệu không có ở các bài trước để đối chiếu. | Ghi nguồn. |

**Câu hỏi:** IN ('KD, IT') có khác IN ('KD', 'IT') không? Khi nào nên dùng % và khi nào dùng _?

**Bài tập:** bốn bài, chưa mở được.

**Điểm:** Dễ hiểu 15/25 · Giải thích 15/20 · Trình tự 14/20 · Ví dụ 14/15 · Tự học 6/15 · Câu chữ 4/5 = **68**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

### Bài 2.4 – Sắp xếp và lấy TOP
URL: /bai/2-4-sap-xep-va-top/

**Tiếp thu được:** ORDER BY nhiều cột và hướng ASC/DESC từng cột; ví dụ IT/NS cho thấy thứ tự cột quan trọng; WHERE → ORDER BY → TOP được diễn theo thứ tự.

**Chưa hiểu:** "tập kết quả" không định nghĩa; đoạn về alias trong ORDER BY ngắn nhưng nhiều chi tiết.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Phần "Đoạn sắp xếp nhiều cột, chỉ để đọc" | Đặt một đoạn lệnh "chỉ để đọc" trước khi học cách viết | Học viên không biết có nên chạy không. | Ghi rõ đây là đoạn minh họa. |
| Minor | Phần "Từ Sort đến ORDER BY" | "tập kết quả" | Chưa định nghĩa. | Định nghĩa một câu. |

**Câu hỏi:** TOP (5) có luôn lấy đúng năm người "gần nhất" không nếu hai người cùng ngày?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 17/25 · Giải thích 15/20 · Trình tự 15/20 · Ví dụ 14/15 · Tự học 6/15 · Câu chữ 4/5 = **71**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

### Bài 2.5 – NULL: ô trống không phải số 0
URL: /bai/2-5-null-o-trong/

**Tiếp thu được:** bảng phân biệt NULL, số 0, chuỗi rỗng, dấu cách là phần đáng học nhất của chương. "10 + NULL" và cảnh báo thay NULL bằng 0 có ý nghĩa nghiệp vụ.

**Chưa hiểu:** UNKNOWN không định nghĩa; ISNULL và COALESCE khác nhau ở kiểu dữ liệu trả về, đoạn này quá sâu.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Đoạn so sánh ISNULL và COALESCE | "COALESCE ... ưu tiên kiểu nvarchar khi chuyển kiểu ngầm, nên giữ được nhãn Unicode" | Học viên không biết chuyển kiểu ngầm là gì (đã nhắc ở 1.3 nhưng chưa rõ). Không hiểu sao phải chọn hàm này. | Bỏ phần so sánh sâu; để COALESCE là mặc định, ghi một câu lý do. |
| Major | Đoạn "So sánh Email = NULL" | "cho kết quả UNKNOWN (không xác định), không phải đúng hay sai" | UNKNOWN chưa định nghĩa; học viên phải đoán. | Thêm một câu: UNKNOWN nghĩa là không đủ thông tin để nói đúng hay sai. |
| Minor | Tình huống | "NgayNghiViec là NULL" | Nhắc lại cột chưa dạy kỹ. | Ghi chú. |

**Câu hỏi:** Trong thực tế, khi nào tôi thay NULL bằng 0 và khi nào không?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 16/25 · Giải thích 15/20 · Trình tự 14/20 · Ví dụ 14/15 · Tự học 6/15 · Câu chữ 3/5 = **68**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

### Bài 2.6 – DISTINCT: bỏ dòng trùng
URL: /bai/2-6-distinct-bo-dong-trung/

**Tiếp thu được:** DISTINCT trên một cột và trên nhiều cột; ví dụ MaPB, MaCD có 19 cặp; thêm MaNV thành 48 dòng. Hình minh họa rõ, là ví dụ tốt nhất chương.

**Chưa hiểu:** quy tắc ORDER BY với DISTINCT phải dùng cột có trong SELECT nằm ở giữa bài, dễ bị bỏ qua.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Đoạn giữa bài | "Với SELECT DISTINCT, cột dùng trong ORDER BY phải có trong danh sách cột được chọn" | Quy tắc quan trọng, không được nhấn. Học viên sẽ gặp lỗi và không hiểu. | Đưa vào Hay nhầm hoặc Ghi nhớ. |
| Minor | Hay nhầm | "Nếu bỏ mã và các cột còn lại giống nhau..." | Câu rối. | Viết lại. |
| Minor | Ghi nhớ | "Bỏ trùng ở vùng sao chép rồi sắp A đến Z" | Ví dụ Excel không khớp với cách làm. | Sửa. |

**Câu hỏi:** Vì sao DISTINCT không bỏ được dòng khi tôi thêm MaNV? Khi nào thì nên làm vậy?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 18/25 · Giải thích 15/20 · Trình tự 14/20 · Ví dụ 15/15 · Tự học 6/15 · Câu chữ 4/5 = **72**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

### Bài 2.7 – Hàm chuỗi và tiếng Việt có dấu
URL: /bai/2-7-ham-chuoi-tieng-viet/

**Tiếp thu được:** LEFT, RIGHT, SUBSTRING, LEN, CONCAT, TRIM, UPPER/LOWER đều có ví dụ có kết quả. Ví dụ LEN('NV007 ') bằng 5 và TRIM hai dấu cách là điểm học hay.

**Chưa hiểu:** bảng mã, collation, CI/AS/AI, COLLATE, ký tự thoát [%]: đây là bốn chủ đề khác nhau trong một bài.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major (quá tải) | Toàn bài | Chín hàm chuỗi, Unicode, bảng mã, collation, COLLATE, escape ký tự | Khối lượng vượt quá một bài 28 phút. Học viên đọc đến giữa bài đã quên đoạn đầu. | Tách thành ba bài: hàm chuỗi; Unicode và N''; so sánh có dấu/không dấu (collation). |
| Major | Đoạn bảng mã | "Database khóa học dùng SQL_Latin1_General_CP1_CI_AS, không phải bảng mã UTF-8 cho varchar, nên ký tự tiếng Việt không biểu diễn được có thể mất dấu hoặc thành ?" | Bảng mã không được dạy. Học viên không biết làm gì với thông tin này. | Thay bằng một câu: luôn viết N trước chuỗi có dấu. Chuyển chi tiết sang phụ lục. |
| Major | Ví dụ TRIM | Kết quả hiển thị "Kế toán" trong khi LEN bằng 8 | Hai dấu cách không thấy rõ trên trang. Học viên không tin được. | Hiển thị dấu cách rõ hơn, hoặc ghi chú. |
| Minor | Cấu trúc | "Tự kiểm tra trước khi viết truy vấn" nằm dưới tiêu đề "Bài tập" | Thứ tự trình bày lộn xộn. | Đưa lên trước hoặc đặt đúng mục. |

**Câu hỏi:** Tôi phải nhớ collation nào? Khi nào tôi cần COLLATE?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 10/25 · Giải thích 11/20 · Trình tự 9/20 · Ví dụ 12/15 · Tự học 5/15 · Câu chữ 3/5 = **50**. Áp trần S1: **50** (không đổi).
**Kết luận: Không đạt.** Bài này cần tách; phạm vi hiện tại vượt quá khả năng tiếp thu của người mới.

---

### Bài 2.8 – Hàm ngày: thâm niên, sinh nhật, hết hạn hợp đồng
URL: /bai/2-8-ham-ngay-tham-nien/

**Tiếp thu được:** chọn mốc ngày cố định 21/10/2026 thay vì GETDATE là quyết định đúng; DATEADD để tạo mốc; DATEDIFF đếm ranh giới khác với năm tròn. Số ngày còn lại 10, 23, 24 đã kiểm bằng phép trừ (31/10 − 21/10 = 10; 13/11 − 21/10 = 23; 14/11 − 21/10 = 24).

**Chưa hiểu:** GETDATE, CAST, DATEADD, DATEDIFF, EOMONTH, MONTH cùng lúc; UTC và múi giờ.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Đoạn "Bộ mẫu còn có hợp đồng lịch sử..." | "Bộ mẫu còn có hợp đồng lịch sử với ngày kết thúc trước ngày bắt đầu." | Dữ liệu sai hoặc có chủ ý không được giải thích. Học viên không biết nên tin dữ liệu nào và vì sao bài không xử lý. | Nêu ví dụ cụ thể (mã HD), nói rõ đây là dữ liệu bất thường và vì sao không sửa. |
| Major | Đoạn UTC | "Database học trên Azure SQL Database dùng UTC... chậm hơn giờ Việt Nam 7 giờ" | Học viên không biết múi giờ ảnh hưởng đến báo cáo như thế nào khi lọc ngày. | Đưa một ví dụ cụ thể hoặc chuyển sang bài về máy chủ. |
| Major | Toàn bài | DATEDIFF, DATEDIF, DATEADD, EOMONTH, MONTH trong một bài 28 phút | Quá nhiều hàm, nhiều bẫy (ví dụ 30/09 đến 01/10 là 1 tháng). | Tách thành hai bài: mốc và khoảng; thâm niên và sinh nhật. |
| Minor | Đoạn NV036 | "NV036 sinh 1993-10-28" | Dữ liệu không có ở bài trước. | Ghi nguồn. |

**Câu hỏi:** Vì sao DATEDIFF(year) cho 2 mà NV036 chưa đủ hai năm? Tôi tính thâm niên theo cách nào trong báo cáo?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 11/25 · Giải thích 12/20 · Trình tự 12/20 · Ví dụ 13/15 · Tự học 5/15 · Câu chữ 3/5 = **56**. Áp trần S1: **56**.
**Kết luận: Không đạt.**

---

### Bài 2.9 – CASE WHEN: phân nhóm theo điều kiện
URL: /bai/2-9-case-when-ham-if/

**Tiếp thu được:** CASE là biểu thức chọn giá trị; thứ tự WHEN quyết định nhãn; ví dụ "đảo nhánh gán nhầm nhóm" dễ hiểu. Đối chiếu nhóm thâm niên với bảng Excel minh họa khớp (NV003 3 năm trở lên, NV025 1 đến dưới 3 năm).

**Chưa hiểu:** học viên có thể nhầm IF của T-SQL với IF của Excel; bài nói "không phải lệnh IF điều khiển việc chạy" nhưng không giải thích.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Đoạn tình huống | "bản chốt ... như bài 6.6" | Tham chiếu xa, và khái niệm "bản chốt" chưa được định nghĩa. | Ghi một câu giải thích, hoặc bỏ. |
| Minor | Hay nhầm | "Thử điều kiện rộng trước điều kiện hẹp" | Ý đúng, nhưng viết chung chung. | Đưa ví dụ NV003 trong bài thay vì nói chung. |
| Minor | Tiêu đề | "Cần biết trước: 2.8 Hàm ngày tháng" | Tên bài không khớp với tên bài 2.8. | Sửa. |

**Câu hỏi:** Nếu hai nhánh cùng đúng thì luôn lấy nhánh đầu tiên à?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 17/25 · Giải thích 15/20 · Trình tự 14/20 · Ví dụ 14/15 · Tự học 6/15 · Câu chữ 4/5 = **70**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

## Chương 3 – Trung cấp (3.1 đến 3.7)

### Bài 3.1 – COUNT, SUM, AVG, MIN, MAX
URL: /bai/3-1-count-sum-avg/

**Tiếp thu được:** COUNT(*) và COUNT(cột) khác nhau; SUM, AVG, MIN, MAX bỏ NULL; ví dụ (2 + NULL + 0)/2 = 1 rất rõ; kết quả 9 đơn, 16.0 ngày, 1.78 bình quân, 1 và 3 ngày đã kiểm lại bằng bảng Excel minh họa (tổng 16, bình quân 16/9 = 1.78).

**Chưa hiểu:** AVG trên số nguyên mất phần lẻ được giải thích ở Hay nhầm nhưng chưa có ví dụ trong bài; "tổng số chữ số tối đa" của decimal(10,2) chỉ nhắc ngắn.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Minor | Phần "SQL Server chạy câu này thế nào" | "FROM trích 10 trong 20 đơn" trong khi sơ đồ ghi "+17 dòng" | Hai con số mâu thuẫn trong cùng bài. | Sửa cho khớp. |
| Minor | Tự kiểm tra | Đặt sau tiêu đề "Bài tập" | Cấu trúc trình bày không rõ. | Sửa như bài 2.7. |

**Câu hỏi:** Vì sao DP018 không tính?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 17/25 · Giải thích 15/20 · Trình tự 14/20 · Ví dụ 13/15 · Tự học 6/15 · Câu chữ 5/5 = **70**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

### Bài 3.2 – GROUP BY: PivotTable bằng SQL
URL: /bai/3-2-group-by-pivottable/

**Tiếp thu được:** so sánh Rows của PivotTable với khóa nhóm; Count với COUNT(*); ví dụ KD có 13 đang làm và 1 đã nghỉ. Các con số đối chiếu với các bài trước: 45 đang làm, KD 14 gồm 13 đang làm.

**Chưa hiểu:** không có.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Minor | Đoạn "GROUP BY MaPB chỉ trả các mã..." | "Muốn kiểm tổng chung, dùng câu tổng hợp của bài 3.1 trên cùng phạm vi" | Bài 3.1 không có câu tổng hợp theo phạm vi này. | Ghi đúng câu. |
| Minor | Hay nhầm | "Dùng DISTINCT MaPB thay cho tổng hợp" | Nội dung đúng, nhưng liên quan tới bài 2.6 đã học. | Giữ. |

**Câu hỏi:** Nếu tôi muốn cả phòng không có người nào đang làm thì hiện ra với số 0 bằng cách nào?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 16/25 · Giải thích 15/20 · Trình tự 14/20 · Ví dụ 14/15 · Tự học 6/15 · Câu chữ 4/5 = **69**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

### Bài 3.3 – HAVING: lọc sau khi gộp
URL: /bai/3-3-having-loc-sau-khi-gop/

**Tiếp thu được:** WHERE lọc dòng, HAVING lọc nhóm; ví dụ "bỏ WHERE thì KD thành 14" cho thấy vì sao cả hai cần. Đối chiếu IT = 10 không qua "trên 10" khớp với bài 3.2.

**Chưa hiểu:** không có điểm lớn.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Minor | Đoạn "Chọn nhầm chỗ lọc" | "Chọn nhầm chỗ lọc có thể đổi cả tổng và những nhóm xuất hiện." | Câu hơi chung. | Đưa ví dụ cụ thể. |
| Minor | Tự kiểm tra | Câu hỏi về >= 10 | Câu trả lời có trong bài nhưng cần tìm. | Chấp nhận. |

**Câu hỏi:** Khi có HAVING, có cần WHERE không? Nếu đếm cả đã nghỉ thì HAVING xử lý thế nào?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 15/25 · Giải thích 15/20 · Trình tự 14/20 · Ví dụ 14/15 · Tự học 6/15 · Câu chữ 4/5 = **68**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

### Bài 3.4 – INNER JOIN: VLOOKUP bằng SQL
URL: /bai/3-4-inner-join-vlookup/

**Tiếp thu được:** INNER JOIN = VLOOKUP đã biết ở Excel; ON chọn cặp dòng; bí danh bảng nv và pb giải thích rõ; so sánh kết quả với VLOOKUP (một dòng đầu tiên, khác với SQL trả mọi cặp).

**Chưa hiểu:** học viên có thể không hiểu vì sao chỉ có một dòng danh mục mỗi mã, nhắc tới khóa duy nhất mà không định nghĩa lại.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Phần ERD | Toàn bộ sơ đồ ERD lặp lại từ bài 1.5 | Sơ đồ dài, học viên đã thấy. Trong khi trang này bài viết dài hơn cần. | Thay bằng đoạn tóm tắt và tham chiếu về 1.5. |
| Minor | Hay nhầm | "Kết sai quan hệ. MaPB và MaCD đều là mã nhưng chỉ phòng ban mới dò sang PhongBan; sai quan hệ có thể ra rỗng hoặc dữ liệu không đúng nghĩa." | Câu không rõ "rỗng" là gì. | Viết lại. |

**Câu hỏi:** Nếu hai phòng cùng tên thì sao?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 15/25 · Giải thích 15/20 · Trình tự 14/20 · Ví dụ 14/15 · Tự học 6/15 · Câu chữ 4/5 = **68**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

### Bài 3.5 – LEFT JOIN: tìm người chưa có hợp đồng
URL: /bai/3-5-left-join/

**Tiếp thu được:** LEFT JOIN giữ dòng trái; WHERE hd.MaHD IS NULL tìm dòng không khớp; khác nhau giữa điều kiện đặt ở ON và ở WHERE được minh họa bằng NV047 bị loại khi đưa điều kiện sang WHERE.

**Chưa hiểu:** học viên có thể không rõ vì sao chọn MaHD chứ không phải NgayKetThuc, dù bài có giải thích.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Đoạn VLOOKUP trong Excel | "D3 và D4 được đánh dấu vì VLOOKUP không tìm thấy mã... không tự chứng minh hệ thống chưa lưu hợp đồng" | Bài nói đúng nhưng dài và có nhiều điều kiện. Học viên không chắc kết luận nào được rút ra. | Rút gọn. |
| Major | Trình tự | Điều kiện trên ON và WHERE được giải thích trong cùng một phần | Hai khái niệm ON và WHERE trong LEFT JOIN học chung khó với người mới. | Tách thành phần riêng, có ví dụ ngắn. |
| Minor | Đoạn "57 dòng" | "Gọi 57 dòng sau kết là 57 nhân viên" | Con số 57 đúng theo 55 hợp đồng và 2 hồ sơ không khớp (khớp với 2.8: 55 dòng). Ý nghĩa rõ, nhưng nên ghi nguồn. | Ghi nguồn. |

**Câu hỏi:** Vì sao NV047 mất khi tôi đưa điều kiện sang WHERE? Có cách viết nào tránh nhầm không?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 13/25 · Giải thích 14/20 · Trình tự 13/20 · Ví dụ 13/15 · Tự học 5/15 · Câu chữ 4/5 = **62**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

### Bài 3.6 – Kết nhiều bảng: NV → HĐ → Lương
URL: /bai/3-6-ket-nhieu-bang/

**Tiếp thu được:** khái niệm "độ chi tiết của dòng" và khóa của BangLuong (KyLuong, MaNV) rất quan trọng; ví dụ 16457000 nhân ba (49371000) minh họa vì sao cộng sẽ sai; quy tắc ngày chốt 30/09/2026 rõ.

**Chưa hiểu:** học viên cần lượng khái niệm rất lớn; ba bước kiểm (trùng hợp đồng, đếm dòng, đối chiếu) không có sơ đồ.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major (quá tải) | Toàn bài | Độ chi tiết, ngày chốt, quy tắc hợp đồng ứng viên, hai câu kiểm, kiểm trùng, DISTINCT, bốn bảng câu lệnh | Khối lượng quá lớn cho một bài. Học viên khó nhớ mình đang kiểm gì. | Tách thành hai bài: kết ba bảng; kiểm dòng lặp. |
| Major | Đoạn "Với bộ mẫu hiện tại, có 45 mã có ứng viên..." | "có 45 mã có ứng viên, mỗi mã đúng một hợp đồng; trong đó 43 mã có dòng lương" | Con số không có câu lệnh riêng để đếm 45 trước khi xuất hiện. Học viên không tái lập được. | Đưa câu đếm tương ứng. |
| Minor | Đoạn "Trong Excel" | "Sheet HopDongMoc ... đã kiểm mỗi mã chỉ còn một ứng viên" | Bước Excel dựa vào sheet chưa có trong bài. | Ghi cách tạo sheet. |

**Câu hỏi:** Nếu hai hợp đồng cùng đạt điều kiện ngày thì tôi chọn cái nào? Tại sao bài nói không tự chọn?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 10/25 · Giải thích 13/20 · Trình tự 12/20 · Ví dụ 13/15 · Tự học 5/15 · Câu chữ 5/5 = **58**. Áp trần S1: **58**.
**Kết luận: Không đạt.**

---

### Bài 3.7 – Self join: ai quản lý ai
URL: /bai/3-7-self-join-quan-ly/

**Tiếp thu được:** self join là một bảng hai bí danh; ql.MaNV = nv.MaQuanLy; giữ người không có quản lý bằng LEFT JOIN; NV048 có 0 cấp dưới, COUNT(nv.MaNV) và COUNT(*) khác nhau có ví dụ.

**Chưa hiểu:** học viên có thể nhầm "NV004 và NV005 mỗi người có 6 hồ sơ trực tiếp" vì bảng chỉ thấy 10 dòng đầu; con số 6 không được kiểm tra.

**Lỗi:**

| Mức | Vị trí | Trích dẫn | Vấn đề và phản ứng học viên | Đề xuất |
|---|---|---|---|---|
| Major | Đoạn đếm cấp dưới | "NV004 và NV005 mỗi người có 6 hồ sơ trực tiếp" | Số 6 không kiểm được từ kết quả hiển thị. Học viên không biết có đúng không. | Đưa câu đếm đầy đủ và giải thích. |
| Minor | Đoạn "Điều kiện đúng là ql.MaNV = nv.MaQuanLy" | "nhầm tiền tố sẽ trả tên của chính nhân viên hoặc dò sang cấp dưới" | Câu quá dài, nên tách. | Tách. |
| Minor | Cuối bài | "truy vết toàn bộ cây quản lý cần cách mở rộng khác" | Tham chiếu không có bài cụ thể. | Ghi bài hoặc bỏ. |

**Câu hỏi:** Nếu muốn cấp trên gián tiếp (quản lý của quản lý) thì viết thế nào?

**Bài tập:** ba bài, chưa mở được.

**Điểm:** Dễ hiểu 13/25 · Giải thích 14/20 · Trình tự 13/20 · Ví dụ 13/15 · Tự học 5/15 · Câu chữ 4/5 = **62**. Áp trần S1: **59**.
**Kết luận: Cần cải thiện.**

---

# Phần II – Đánh giá sau mỗi chương

## Chương 1 (1.1–1.6)

- **Tôi đã thực sự học được gì?** Khái niệm bảng, cột, kiểu dữ liệu, khóa chính, khóa ngoại và đọc sơ đồ. Đây là phần học viên mới có thể hiểu được chỉ bằng đọc.
- **Tôi có thể tự giải thích lại các khái niệm không?** Có, với khóa chính, khóa ngoại và kiểu dữ liệu. Không chắc với NULL và NO ACTION (chưa có định nghĩa đầy đủ).
- **Tôi có thể áp dụng vào tình huống mới không?** Chỉ ở mức đọc. Không thể kết nối và chạy SELECT vì thiếu tài khoản và mã truy cập.
- **Kiến thức chương này có đủ để tiếp tục không?** Đủ về lý thuyết để sang chương 2, nhưng thiếu kinh nghiệm chạy thật. Chương 2 đòi hỏi kết quả câu lệnh để kiểm chứng, mà chương 1 không cho.
- **Lỗ hổng:** kết nối (1.2), chạy câu SELECT (1.6), NULL và NO ACTION, DATEFORMAT.
- **Nếu không có giáo viên, tôi có tiếp tục được không?** Dừng ở 1.2 nếu không có người cấp tài khoản và mã. Nếu có tài khoản thì có thể tiếp tục nhưng sẽ mất nhiều thời gian ở 1.2.

## Chương 2 (2.1–2.9)

- **Tôi đã thực sự học được gì?** Chọn cột, lọc, sắp xếp, NULL, DISTINCT, hàm chuỗi, hàm ngày, CASE. Các bảng so sánh và ví dụ Excel giúp hiểu nhanh.
- **Tôi có thể tự giải thích lại không?** Có với WHERE, ORDER BY, DISTINCT, CASE. Không với collation, COALESCE/ISNULL, DATEDIFF.
- **Áp dụng vào tình huống mới?** Với mẫu "tình huống → Excel → SQL", có thể làm lại được về nguyên tắc. Không thể kiểm chứng vì không chạy được.
- **Đủ để sang chương 3?** Có, nhưng cần ôn lại NULL (2.5) và các hàm ngày (2.8) trước khi học JOIN và tổng hợp.
- **Lỗ hổng:** collation và bảng mã (2.7), UTC và múi giờ (2.8), dữ liệu hợp đồng bất thường (2.8), quy tắc ORDER BY với DISTINCT (2.6).
- **Không có giáo viên?** Có thể đi tiếp phần đọc, nhưng 2.7 và 2.8 sẽ khiến học viên chậm lại nhiều và có thể bỏ.

## Chương 3 (3.1–3.7)

- **Tôi đã thực sự học được gì?** Hàm tổng hợp, GROUP BY, HAVING, INNER JOIN, LEFT JOIN, JOIN nhiều bảng, self join. Ví dụ PivotTable và VLOOKUP rất trực quan.
- **Tôi có thể tự giải thích lại không?** Với GROUP BY, HAVING, INNER JOIN, LEFT JOIN thì có. Với độ chi tiết dòng và cách kiểm lặp trong 3.6 thì khó.
- **Áp dụng vào tình huống mới?** Có thể dựng lại cấu trúc LEFT JOIN + IS NULL để tìm người thiếu dữ liệu. Với 3.6 thì không chắc.
- **Lỗ hổng:** kiểm trùng do JOIN nhiều bảng, cấp trên gián tiếp, chọn hợp đồng khi chồng ngày.
- **Không có giáo viên?** Không đủ. 3.6 là chỗ dễ mắc kẹt.

---

# Phần III – Tổng kết toàn khóa

## 1. Bảng điểm toàn bộ bài học

| Bài | Tên | Điểm nội dung | Điểm sau trần S1 | Mức khó (đánh giá) | Critical | Major | Minor | Kết luận |
|---|---|---:|---:|---|---:|---:|---:|---|
| 1.1 | Database là gì | 76 | 76 | Thấp | 0 | 2 | 2 | Đạt (sát ngưỡng) |
| 1.2 | SSMS và HRM_Demo | 46 | 46 | Cao | 1 (S1) | 5 | 1 | Không đạt |
| 1.3 | Bảng, cột, kiểu dữ liệu | 61 | 61 | Trung bình | 0 | 4 | 2 | Cần cải thiện |
| 1.4 | Khóa chính, khóa ngoại | 74 | 74 | Trung bình | 0 | 3 | 3 | Cần cải thiện |
| 1.5 | Đọc ERD | 65 | 65 | Trung bình | 0 | 3 | 2 | Cần cải thiện |
| 1.6 | SELECT đầu tiên | 64 | 59 | Thấp | 1 (S1) | 3 | 1 | Cần cải thiện |
| 2.1 | Chọn cột, đặt tên | 73 | 59 | Thấp | 1 (S1) | 1 | 2 | Cần cải thiện |
| 2.2 | WHERE | 70 | 59 | Trung bình | 1 (S1) | 2 | 1 | Cần cải thiện |
| 2.3 | AND, OR, IN, BETWEEN, LIKE | 68 | 59 | Trung bình | 1 (S1) | 2 | 2 | Cần cải thiện |
| 2.4 | Sắp xếp, TOP | 71 | 59 | Trung bình | 1 (S1) | 1 | 1 | Cần cải thiện |
| 2.5 | NULL | 68 | 59 | Trung bình | 1 (S1) | 2 | 1 | Cần cải thiện |
| 2.6 | DISTINCT | 72 | 59 | Trung bình | 1 (S1) | 1 | 2 | Cần cải thiện |
| 2.7 | Hàm chuỗi, tiếng Việt | 50 | 50 | Rất cao | 0 | 4 | 1 | Không đạt |
| 2.8 | Hàm ngày | 56 | 56 | Cao | 0 | 3 | 1 | Không đạt |
| 2.9 | CASE WHEN | 70 | 59 | Trung bình | 1 (S1) | 1 | 2 | Cần cải thiện |
| 3.1 | COUNT, SUM… | 70 | 59 | Thấp | 1 (S1) | 0 | 2 | Cần cải thiện |
| 3.2 | GROUP BY | 69 | 59 | Trung bình | 1 (S1) | 0 | 2 | Cần cải thiện |
| 3.3 | HAVING | 68 | 59 | Trung bình | 1 (S1) | 0 | 2 | Cần cải thiện |
| 3.4 | INNER JOIN | 68 | 59 | Trung bình | 1 (S1) | 1 | 1 | Cần cải thiện |
| 3.5 | LEFT JOIN | 62 | 59 | Cao | 1 (S1) | 2 | 1 | Cần cải thiện |
| 3.6 | Kết nhiều bảng | 58 | 58 | Rất cao | 0 | 3 | 1 | Không đạt |
| 3.7 | Self join | 62 | 59 | Cao | 1 (S1) | 1 | 2 | Cần cải thiện |

Điểm tổng: **trung bình nội dung 65,5/100**; **sau trần S1 khoảng 59,6/100**. Tổng hợp: 22 bài, 4 bài Không đạt (1.2, 2.7, 2.8, 3.6), 17 bài Cần cải thiện, 1 bài Đạt (1.1).

Lưu ý về 2.1–2.9 và 3.1–3.7: mục S1 là lỗi truy cập bài tập áp dụng chung cho cả khóa. Nếu học viên có mã truy cập, phần trần này sẽ được gỡ và điểm là điểm nội dung.

## 2. Top 10 vấn đề nghiêm trọng nhất (theo ảnh hưởng đến trải nghiệm học)

1. **Không có đường để học viên tự chạy bài tập** (S1, Critical). Trang yêu cầu mã truy cập không nói lấy ở đâu; bài 1.2 yêu cầu SSMS và tài khoản không có trong website. Ảnh hưởng toàn khóa.
2. **Kết quả câu lệnh là lời tác giả, không tái lập được** (hệ thống). Mọi bảng "Results" trong 22 bài không gắn với câu lệnh có thể chạy lại công khai. Học viên không kiểm được gì.
3. **Bài 2.7 quá tải** (Major). Chín hàm, Unicode, bảng mã, collation, COLLATE, escape trong một bài.
4. **Bài 3.6 quá tải và có số không kiểm được** (Major). Con số 45, 43 và quy tắc kiểm trùng không có câu lệnh đi kèm.
5. **Thuật ngữ dùng trước khi dạy** (hệ thống, Major). UNKNOWN, NO ACTION, DATEFORMAT, T-SQL, schema dbo, cổng 1433, ORDER BY, SELECT INTO, collation.
6. **Bài 1.2 gom quá nhiều thứ** (Major). Kết nối, bảo mật, Azure, hai tên database, SELECT chưa học.
7. **Kết luận về ngày tháng không kiểm được** (Major, 1.3). "01/02/2024 là 2 tháng 1" dựa trên DATEFORMAT chưa giải thích; học viên có thể hiểu sai về ngày và không biết kiểm tra.
8. **Dữ liệu bất thường không được giải thích** (Major, 2.8). Hợp đồng kết thúc trước khi bắt đầu, không ví dụ, không cách xử lý.
9. **Câu lệnh DELETE xuất hiện khi chưa dạy DELETE** (Major, 1.4), kèm WHERE chưa học.
10. **Ô soạn thảo bài tập làm mất câu lệnh gõ vào** (Major, 1.6). Dòng ghi chú có sẵn bị dính vào câu học viên gõ, câu thành ghi chú và không chạy.

## 3. Các lỗ hổng kiến thức mang tính hệ thống

- **Thuật ngữ không có bảng tra.** Có khoảng 40 thuật ngữ được dùng trước khi được định nghĩa, và không có mục thuật ngữ. Học viên Excel không có cách tra.
- **Tham chiếu tới bài sau rất nhiều.** Trong 22 bài có hàng chục tham chiếu "học ở bài X.Y". Mỗi tham chiếu là một chỗ học viên phải đoán.
- **Excel analog không đồng đều.** Trang Giới thiệu hứa "mọi khái niệm đặt cạnh một việc quen làm trên Excel", nhưng VLOOKUP, PivotTable, Data Validation, Format Cells, DATEDIF được dùng mà không giải thích cho người chỉ biết công thức đơn giản.
- **Quy tắc an toàn xuất hiện sớm và rải rác.** Quy tắc "chỉ đọc" nằm ở 1.1, 1.2, 1.4, 1.6; giao dịch và hoàn tác ở 5.4. Học viên không biết quy tắc có ngoại lệ nào.
- **Số liệu và dữ liệu mẫu không có điểm tham chiếu.** Nhiều con số (48, 45, 55, 57, 43, 14, 13) được dùng xuyên bài, khớp với nhau, nhưng không có bảng dữ liệu hay câu đếm nào để học viên tự kiểm.
- **Độ dài bài không đều.** Có bài 20 phút với mười thuật ngữ mới (1.2), có bài 28 phút với chín hàm (2.7, 2.8). Thời lượng ghi trên trang không khớp với khối lượng thực tế.
- **Mục Hay nhầm và Ghi nhớ** là điểm mạnh nhất của khóa. Nhưng đôi khi Hay nhầm chứa kiến thức mới (ví dụ ngoặc vuông, NO ACTION), làm loãng mục đích cảnh báo.
- **Sơ đồ và hình chữ nhỏ.** Sơ đồ ERD lặp lại ở 1.5, 3.4, 3.6 và chữ nhỏ, phải cuộn ngang.
- **Điểm tích cực về nhất quán số liệu.** Đã đối chiếu chéo: 48 hồ sơ, 45 đang làm, 3 đã nghỉ (NV020, NV033, NV041), KD 14 (13 đang làm), IT 10 (NV007, NV011, NV017, NV021, NV029, NV035, NV039, NV043, NV046, NV048), 9 đơn tháng 9 tổng 16 ngày, 55 hợp đồng, 43 dòng lương kỳ 2026-09. Các con số này không mâu thuẫn với nhau trong các bài đã đọc.
- **Mâu thuẫn nhỏ:** trang Giới thiệu nói "Khóa học không dạy cài đặt" nhưng bài 1.2 có phần cài SQL Server Express/Developer. Trang Giới thiệu nói "8 mảng" nhưng thanh điều hướng có 6 level và 8 nhóm.

## 4. Đánh giá khả năng tự học

**Một người hoàn toàn mới có thể học độc lập đến bài 3.7 không?** Không, trong điều kiện hiện tại.

- **Bị mắc kẹt sớm nhất ở bài 1.2** nếu không có tài khoản và tên máy chủ. Đây là điểm dừng cứng, không phải khó hiểu.
- **Nếu qua được 1.2 nhưng không có mã truy cập,** học viên sẽ đọc hết lý thuyết nhưng không chạy được câu nào, từ 1.6 trở đi. Không có cách kiểm chứng.
- **Nếu có cả tài khoản và mã,** điểm mắc kẹt tiếp theo là **2.7** (collation và bảng mã) và **2.8** (múi giờ, DATEDIFF, dữ liệu hợp đồng bất thường).
- **Ở chương 3, điểm dễ mắc kẹt nhất là 3.6** (kiểm trùng do nhiều bảng và chồng ngày hợp đồng).

## 5. Đề xuất cải thiện có thứ tự ưu tiên

**Bắt buộc sửa trước khi phát hành:**
1. Ghi rõ đường lấy mã truy cập bài tập, hoặc cung cấp đường thực hành không cần mã. Nếu không thể, nói rõ trang chỉ dành cho học viên có người hỗ trợ.
2. Gắn mỗi bảng "Results" với một câu lệnh và một bộ dữ liệu có thể tái lập, hoặc ghi "kết quả minh họa" rõ ràng.
3. Sửa ô soạn thảo bài tập: không để dòng ghi chú chặn câu học viên gõ.
4. Sửa lệnh DELETE trong 1.4: đưa ra khỏi phần đọc hoặc ghi rõ không phải kiến thức của bài.
5. Bỏ hoặc giải thích kết luận DATEFORMAT ở 1.3 và các chỗ "1900-01-01".
6. Giải thích hoặc ghi chú dữ liệu hợp đồng kết thúc trước khi bắt đầu (2.8).

**Nên sửa trước khi mở rộng:**
7. Tách 2.7 thành ba bài; tách 2.8 thành hai bài; tách 3.6 thành hai bài.
8. Tách bài 1.2 thành kết nối và làm quen SSMS; chuyển phần Azure, schema, cổng mạng sang phụ lục.
9. Tạo bảng thuật ngữ, hoặc ít nhất định nghĩa lần đầu: NULL, UNKNOWN, NO ACTION, collation, schema, cổng, ORDER BY, T-SQL.
10. Giới thiệu VLOOKUP, PivotTable, Data Validation một cách có kiểm soát trước khi dùng làm mỏ neo.

**Có thể làm sau:**
11. Giảm tham chiếu tới bài sau; thêm một dòng tóm tắt cho mỗi tham chiếu.
12. Phóng to sơ đồ ERD; thêm chú giải một dòng.
13. Thống nhất "Hay nhầm" và "Ghi nhớ" theo quy ước: chỉ cảnh báo lỗi đã học.
14. Đồng bộ thời lượng bài với khối lượng thực tế.
15. Sửa các mâu thuẫn nhỏ ở trang Giới thiệu.

## 6. Kết luận cuối cùng

- **Nếu phải tự học SQL Server từ đầu, tôi có chọn website này không?** Chưa, trong trạng thái hiện tại. Tôi sẽ chọn nó như tài liệu đọc, nhưng sẽ tìm thêm một nơi để chạy câu lệnh thật.
- **Website phù hợp với người chưa biết gì hay chỉ với người đã có nền tảng?** Phần chương 1 (đặc biệt 1.1, 1.4) và các phần so sánh với Excel phù hợp với người chưa biết gì. Chương 2 và 3 đòi hỏi kinh nghiệm chạy thật và đọc kỹ.
- **Phần làm tốt nhất:** cách xây tình huống từ chị Hạnh và ví dụ Excel; bảng so sánh (NULL, DISTINCT, ORDER BY, LEFT JOIN); các mục Hay nhầm và Ghi nhớ; số liệu đối chiếu được giữa các bài.
- **Phần làm tệ nhất:** đường thực hành bị chặn; khối lượng và thuật ngữ trong 1.2, 2.7, 2.8, 3.6; kết quả câu lệnh không kiểm chứng được.
- **Đã đủ chất lượng để giới thiệu cho người khác tự học chưa?** Chưa. Có thể giới thiệu cho người đã có người hướng dẫn hoặc có tài khoản và mã truy cập.
- **Nếu là tác giả, tôi sẽ ưu tiên sửa 5 điều này trước:**
  1. Đường lấy mã và thực hành (S1).
  2. Gắn kết quả câu lệnh với câu lệnh và dữ liệu tái lập được.
  3. Tách 2.7 và 3.6.
  4. Bỏ hoặc giải thích DATEFORMAT, lệnh DELETE sớm và dữ liệu hợp đồng bất thường.
  5. Sửa ô soạn thảo bài tập và xóa các thuật ngữ dùng trước khi dạy.

## Ghi chú về việc đã làm trên trang trong phiên kiểm thử

- Đã mở các trang bài học, trang Giới thiệu, và trang bài tập 1.6 (bài 1). Đã gõ một câu SELECT vào ô bài tập và bấm Chạy (F5); trang yêu cầu mã truy cập, không chạy được.
- Không nhập mật khẩu, không nhập mã, không bấm Nộp bài, không tải file HRM_Demo.sql.
- Phiên này không dùng tài liệu SQL ngoài website.
