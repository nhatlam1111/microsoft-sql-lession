# Review bộ slide tổng hợp "Làm quen SQL Server" (25 slide, 50 phút giảng + 10 phút hỏi đáp)

## 1. Phạm vi, phiên bản, công cụ thực tế

**Vai trò:** học viên khó tính, biết Excel văn phòng cơ bản, chưa biết SQL, muốn chuyển sang BA/PM.

**Đối tượng:** `src/content/presentations/lam-quen.mdx` (sha256 `b27f01aa…649b`, đã đối chiếu khớp bằng `sha256sum`), `src/components/presentations/PubsFigure.astro`, năm bài `1-1-database-la-gi`, `1-2-bang-dong-cot`, `1-3-kieu-du-lieu`, `1-4-khoa-chinh-khoa-ngoai`, `1-5-doc-so-do-erd`.

**Bản build đối chiếu:** `dist/bai-giang/lam-quen/index.html` (54.369 byte) và `dist/bai-giang/lam-quen/nguoi-giang/index.html` (75.032 byte), cùng ghi 16:33 ngày 04/11/2026. Hai trang cùng có 25 `<section data-slide>`.

**Cách làm thực tế (chỉ đọc):**
- Đọc `docs/quy-uoc.md`, `docs/presentation-template.md`, `docs/ho-so-cong-ty.md`, mục "Content and data visualization" của `DESIGN.md`, spec `docs/superpowers/specs/2026-11-04-lam-quen-slides-refresh-design.md` (chỉ để hiểu phạm vi).
- Học thử từng slide bằng phần hiện cho lớp (trích văn bản từ `dist/.../index.html`, gồm cả alt, caption, credit, liên kết), rồi mới đọc `PresenterNotes` trong MDX và trang người giảng.
- Đối chiếu từng khẳng định với bài nguồn tương ứng.
- Đọc trực tiếp ảnh gốc `src/assets/lessons/1-5-pubs-diagram.png`, `src/assets/presentations/graph-database-property-graph.png`, và dùng Pillow cắt/phóng ảnh PUBS theo đúng toạ độ trong `PubsFigure.astro` để xem vùng crop chứa gì. Đây là đọc tệp ảnh, không phải kiểm layout thật.
- Kiểm bằng script đọc MDX/HTML: số slide, tổng phút theo nhóm, khớp `source`/`minutes` giữa `Slide` và `PresenterNotes`, đủ ba nhãn ghi chú, rò ghi chú vào trang chiếu, ký tự nháy trong `<code>`, liên kết tương đối.

**Không làm (đúng giới hạn được giao):** không mở browser hay server, không kết nối database, không chạy SQL/API, không đọc `database/HRM_Demo.sql`/`.env`, không đọc report cũ hay nhận xét reviewer khác, không sửa file nào ngoài report này, không chạy git thay đổi trạng thái.

**Hệ quả:** mọi điều về bố cục, tràn chữ, độ rõ khi chiếu, bàn phím, đồng bộ hai cửa sổ, bấm liên kết thật, nhánh không JavaScript đều **chưa xác minh**; report không kết luận về chúng. Với dữ kiện schema `HRM_Demo` và khai báo PUBS, tôi chỉ đối chiếu được với bài nguồn và hồ sơ công ty, không xác minh được trực tiếp ở nguồn gốc (xem mục 5).

**Đếm số finding:** 36 mục F01–F36 (4 Cần sửa, 18 Cần làm rõ, 2 Cần cắt, 12 Biên tập) và 9 mục Giữ được (G1–G9).

---

## 2. Rà theo thứ tự 25 slide

Quy ước nhãn: **Chưa được dạy** = nội dung lớp cần để hiểu nhưng không có trong năm bài lẫn trên slide. **Đã dạy nhưng khó tìm** = có trong bài nguồn hoặc chỉ ở ghi chú nên lớp không thấy. **Sai có căn cứ** = khẳng định hoặc hiển thị sai so với nguồn/quy ước. **Chưa xác minh** = cần chạy hoặc mở thực tế mới biết.

### Slide 1 · `database-la-gi` (1.1, 2 phút)

Phần hiện cho lớp: bảng Database/DBMS/RDBMS, hai đoạn định nghĩa, dòng "50 phút giảng và 10 phút hỏi đáp". Định nghĩa Database/DBMS đúng bài 1.1 (kiểm với "tiếp nhận yêu cầu, kiểm quyền, thực hiện thao tác"). Dòng thời lượng nằm ở slide mở đầu, đúng yêu cầu của `presentation-template.md`.

**F01 · Cần làm rõ · chưa được dạy**
- Câu gốc: "Ví dụ: HRM_Demo là database; SQL Server là RDBMS" (slide 1; `HRM_Demo` còn xuất hiện ở slide 3, 5, 6, 16, 25).
- Tác động: người mới không biết `HRM_Demo` là gì (database nhân sự mẫu của khóa học, hay một sản phẩm?). Từ slide 3 trở đi nó còn được ánh xạ thành "workbook", "bộ mẫu", nên tên riêng này gánh nhiều ý mà chưa được giải nghĩa.
- Căn cứ: `grep` trong năm bài cho thấy `HRM_Demo` chỉ xuất hiện ở bài 1.5, dưới dạng "không phải `HRM_Demo`", và không bài nào định nghĩa; slide không có câu giải nghĩa.
- Đề xuất: một vế ở slide 1, ví dụ "`HRM_Demo`: database nhân sự mẫu của khóa học".

**F02 · Cần làm rõ · đã dạy nhưng khó tìm (mạch chuyển ý)**
- Câu gốc: "RDBMS là hệ quản lý database quan hệ; hệ NoSQL cũng là DBMS." (slide 1).
- Tác động: slide 1 dùng "database quan hệ" và "NoSQL" trước khi slide 2 định nghĩa chúng, nên câu RDBMS nghe như vòng tròn. Slide 1 cũng không nói database khác một workbook Excel ở chỗ nào: "dữ liệu được tổ chức để lưu, tìm và cập nhật" mô tả được cả một file Excel. Móc Excel chỉ nằm ở ghi chú; câu trả lời "database khác Excel vì sao/để làm gì" mãi tới slide 5 mới xuất hiện, và chỉ gián tiếp.
- Căn cứ: slide 1 hiển thị, ghi chú slide 1, thứ tự slide 2 và 5.
- Đề xuất: thêm "(slide sau giải thích)" hoặc đổi câu thành "RDBMS: DBMS cho database dạng bảng"; thêm một vế nêu lý do cần database (nhiều ứng dụng cùng dùng chung, có luật kiểm), dùng ý đã có ở slide 5.

### Slide 2 · `so-sanh-cac-dang-database` (1.1, 2 phút)

Hiển thị: hình đồ thị (credit Achim Friedland · Wikimedia Commons · CC0, đúng `SOURCES.md`), bảng 2 cột Quan hệ/NoSQL, hai câu. Câu "NoSQL không có nghĩa là không có cấu trúc hoặc luôn nhanh hơn" đúng bài 1.1.

**F03 · Cần làm rõ · đã dạy nhưng khó tìm**
- Câu gốc: ô bảng "Tài liệu, khóa–giá trị, cột rộng, đồ thị" (slide 2).
- Tác động: bốn thuật ngữ mới chỉ có tên; nghĩa chỉ có trong bài 1.1 và ghi chú. Người mới không biết "cột rộng" là gì. Tên "NoSQL" cũng không được giải nghĩa ở slide hay bài ("không dùng SQL?"). Lý do khóa học chỉ học loại quan hệ chỉ nằm ở ghi chú ("Khóa học tập trung SQL Server").
- Căn cứ: so slide với bài 1.1 (đoạn "Trong NoSQL, tài liệu… cột rộng… đồ thị") và ghi chú slide 2.
- Đề xuất: giữ bảng nhưng thêm nửa dòng nghĩa cho ba loại; thêm một vế "khóa học dùng loại quan hệ vì…" (bài 1.1 đã có câu "Khóa học dùng database quan hệ với SQL Server").

**F04 · Cần làm rõ · đã dạy nhưng khó tìm**
- Câu gốc: caption "Đồ thị: một cách tổ chức trong NoSQL"; alt "Đồ thị gốc: các điểm là đối tượng, đường có nhãn…".
- Tác động: ảnh gốc là tiếng Anh (Alice, Bob, Chess, `knows`, `is_member`, `Members`, `Since: …`); slide không nói đọc gì từ hình (ví dụ "Alice quen Bob; Alice là thành viên nhóm Chess"). Người mới chỉ thấy một đồ thị lạ. Alt không nêu nội dung thực của hình.
- Căn cứ: đọc trực tiếp ảnh `graph-database-property-graph.png`.
- Đề xuất: caption một câu cách đọc hình; alt nêu Alice/Bob/Chess và nhãn đường.

**F05 · Biên tập**
- Bảng hai hàng thiếu nhãn hàng: hàng 1 là cách tổ chức, hàng 2 là hệ quản lý tiêu biểu. Caption "Các hệ quản lý tiêu biểu…" chỉ khớp hàng 2. Thêm cột nhãn hàng hoặc tách caption.

### Slide 3 · `tu-excel-den-database-quan-he` (1.1, 2 phút)

Hiển thị: bảng workbook/sheet/dòng-cột ↔ database/bảng/bản ghi; caption "Phép so sánh để hình dung…" (đúng quy ước nói rõ là phép so sánh). Câu "các dòng dùng cùng các cột đã thiết kế, không có ô gộp như sheet" đúng bài 1.1 và tả đúng Excel. Không tuyệt đối hóa Excel.

**F06 · Biên tập**
- Câu gốc (ghi chú, Hay hiểu nhầm): "Chỉ cần đổi tên file Excel là có database hoặc file xuất ra tự đồng bộ với database."
- Tác động: lệch slide. Phần "đổi tên file Excel" gần như không ai nghĩ, phần "xuất ra tự đồng bộ" thuộc slide 5. Hiểu nhầm đúng chủ đề slide 3 là "mọi database đều là bảng" (bài 1.1 Hay nhầm 1). Người giảng khó dùng.
- Đề xuất: thay bằng hiểu nhầm đó.

### Slide 4 · `bang-dong-cot` (1.1, 2 phút)

Hiển thị: hình Relation/Tuple/Attribute (credit Booyabazooka · public domain), bảng trích `NV001`/`Trần Thị Mai` đánh dấu dòng và cột, hai câu. `NV001` Trần Thị Mai khớp hồ sơ công ty. "số dòng không luôn là số người" đúng bài.

**F07 · Cần làm rõ · đã dạy nhưng khó tìm; một phần chưa xác minh**
- Câu gốc: caption "Relation = bảng · Tuple = dòng · Attribute = cột".
- Tác động: người học vừa nghe "database quan hệ" (slide 1, 2) có thể hiểu "quan hệ" là liên hệ giữa các bảng, rồi thấy hình nói Relation = bảng, và slide 5 nói "các bảng liên quan qua mã". Điểm vênh này chỉ được gỡ bằng câu của bài 1.1 ("'Quan hệ' ở đây là tên mô hình, không chỉ có nghĩa là một đường nối") mà slide không có. Ba từ Relation/Tuple/Attribute là tiếng Anh học thuật, slide không nói "chỉ cần nhớ bảng/dòng/cột". Câu hỏi "vì sao gọi là quan hệ" chưa được trả lời trên slide.
- Chưa xác minh: tệp SVG có `<switch>` với `systemLanguage="es"` và `"hi"` (đọc từ tệp). Nếu trình duyệt máy chiếu đặt tiếng Tây Ban Nha hoặc Hindi, hình có thể hiện Relación/Tupla/Atributo hoặc chữ Hindi trong khi caption tiếng Anh/Việt. Chưa mở trình duyệt nên không kết luận.
- Đề xuất: thêm một vế "Relation là tên học thuật của bảng, nên gọi là 'quan hệ'; khóa học dùng bảng/dòng/cột".

**F08 · Biên tập**
- Bảng trích chỉ một dòng, hai cột: dòng và cột được đánh dấu giao nhau tại một ô, nên sự đối lập "dòng ngang, cột dọc" chỉ dựa vào hình trái. Câu 2 nhắc `HopDong` trước khi slide 5 hiện bảng này. Có thể thêm một dòng nữa hoặc chuyển câu `HopDong` sang slide 5.

### Slide 5 · `thong-tin-o-nhieu-bang` (1.1, 2 phút)

Hiển thị: bảng NhanVien/HopDong và cột mã; ba câu. Các câu về dùng chung/bản xuất ra Excel đúng bài và điều kiện được nêu ("không tự đồng bộ ngược", "vẫn cần luật được khai báo").

**F09 · Cần làm rõ · đã dạy nhưng khó tìm**
- Câu gốc: "Tách hồ sơ và hợp đồng giúp giảm chép lại thông tin".
- Tác động: câu trả lời cho "vì sao tách bảng" không nêu thứ bị chép lại; ví dụ (họ tên chép vào mỗi hợp đồng) chỉ nằm ở ghi chú. Bảng cho thấy hai bảng nhưng không cho thấy sự dư thừa tránh được.
- Căn cứ: ghi chú slide 5 ("lưu họ tên trong hồ sơ giúp tránh sửa lại tên ở mỗi hợp đồng"); bài 1.1 đoạn "Tách hồ sơ và hợp đồng…".
- Đề xuất: thêm vế "họ tên chỉ lưu ở hồ sơ, hợp đồng chỉ giữ `MaNV`".

**F10 · Biên tập**
- Slide mang ba ý (tách bảng, dùng chung và bản xuất ra Excel, Excel cũng có kiểm dữ liệu) nhưng bảng chỉ minh họa ý đầu, trong khi tiêu đề hứa hai chủ đề. Nếu cần rút chữ, ý Data Validation có thể dồn xuống slide 15 để cùng chủ đề ràng buộc.
- Cột `MaHD` của `HopDong` không có trong năm bài 1.1–1.5; chỉ thấy trong hồ sơ công ty (mục 7, bài 4.2). Chưa xác minh với schema.

### Slide 6 · `sql-server-la-gi` và slide 7 · `bon-ten-can-phan-biet` (1.2, 2 + 2 phút)

Hiển thị slide 6: bảng phần mềm/database/nơi chạy; "SQL Server không phải tên của một máy chủ vật lý". Slide 7: bảng SQL/T-SQL, SSMS, SQL Server, Database; "đóng SSMS không xóa database". Các khẳng định đúng bài 1.2.

**F11 · Cần cắt · lặp ý**
- Câu gốc: slide 6 "SQL Server: nhận yêu cầu, kiểm quyền, xử lý" / "HRM_Demo: dữ liệu và cấu trúc nhân sự"; slide 7 "SQL Server: Phần mềm xử lý yêu cầu" / "Database: Dữ liệu và cấu trúc được quản lý".
- Tác động: cùng một quan hệ phần mềm–dữ liệu bị nói ba lần trong 6 phút (slide 1, 6, 7). Người học không có thêm hiểu biết mới ở slide 7 ngoài việc thêm SSMS và SQL. Phút dành cho slide 7 có thể gộp.
- Đề xuất: gộp hàng "nơi chạy" của slide 6 vào slide 7, hoặc chuyển trọng tâm slide 6 sang "SQL Server ≠ máy chủ ≠ database" và bỏ hàng database lặp.

**F12 · Biên tập**
- Câu gốc: "T-SQL là cách triển khai của Microsoft".
- "Cách triển khai" là từ trừu tượng; "Transact-SQL" và "truy vấn" chỉ có ở ghi chú. Ghi chú nói đọc bảng "công cụ → ngôn ngữ → hệ quản lý → dữ liệu" trong khi bảng đi theo thứ tự ngôn ngữ → công cụ → hệ quản lý → dữ liệu (không khớp). Ghi chú slide 6 nhắc "cứ có SSMS…" mà SSMS chưa xuất hiện ở slide 6.

### Slide 8 · `uu-diem-va-dieu-kien` (1.2, 2 phút)

Điểm đáng ghi nhận: mỗi khả năng đi cùng điều kiện, và câu kết "không tự biết dữ liệu đúng nghiệp vụ hay bảo đảm phục hồi mọi lỗi" không hứa quá.

**F13 · Cần làm rõ · chưa được dạy (đẩy về bài 5.5, 6.1, 6.3)**
- Câu gốc: "giao dịch nhóm thao tác để cùng hoàn tất hoặc hoàn tác khi xử lý đúng"; ô "Xử lý giao dịch đúng"; "Sao lưu/khôi phục: Bản sao lưu dùng được".
- Tác động: "giao dịch" không có ví dụ; ô điều kiện "xử lý giao dịch đúng" lặp lại chính khái niệm nên không cho điều kiện thực. "Sao lưu" và "hiệu năng" dùng mà không định nghĩa. Cột "Đọc nhiều bảng" mơ hồ (bài dùng "lấy thông tin qua nhiều bảng, như hồ sơ kèm tên phòng").
- Căn cứ: bài 1.2 đoạn "Ưu điểm đi cùng điều kiện": tương tự, nhưng bài có "khi được lập trình và xử lý đúng". Slide đã rút còn "khi xử lý đúng", mất phần điều kiện.
- Đề xuất: một ví dụ nửa dòng ("trừ ở A và cộng ở B cùng xong hoặc cùng hoàn tác"), định nghĩa sao lưu bằng một vế, đổi hàng đầu thành "lấy thông tin qua nhiều bảng".

### Slide 9 · `edition-va-azure-sql` (1.2, 2 phút)

Bảng edition khớp bài 1.2, đã gắn "SQL Server 2025" và caption "Giới hạn tùy edition" (không đưa giới hạn của Express thành giới hạn chung).

**F14 · Cần làm rõ · chưa được dạy**
- Câu gốc: "Khóa học dùng Azure SQL Database, dịch vụ Microsoft quản lý trên Azure; dùng chung nền tảng xử lý với SQL Server nhưng quản trị/giới hạn có thể khác, và học trên web không cần tự cài hệ quản lý."
- Tác động: một câu dài chứa Azure, "dịch vụ quản lý", "nền tảng xử lý", "học trên web". "Azure" (đám mây của Microsoft) chỉ được giải nghĩa ở ghi chú. Bảng edition không hiện Azure SQL Database nên hình không minh họa đoạn chữ này. Tiêu đề hứa "nơi thực hành" nhưng slide không nói học viên thực hành bằng đường nào (chỉ trang Giới thiệu, nêu ở ghi chú).
- Căn cứ: bài 1.2 mục "Giới hạn, edition và nơi thực hành".
- Đề xuất: tách thành hai câu ngắn, thêm "Azure: nền tảng đám mây của Microsoft"; thêm dòng cuối bảng "Azure SQL Database: dịch vụ dùng cho khóa học".

**F15 · Biên tập**
- "giới hạn tài nguyên/database" (Express) dễ đọc thành "tài nguyên của database"; bài ghi "giới hạn tài nguyên và kích thước database".
- Ghi chú nêu "Developer miễn phí" như hiểu nhầm, nhưng cả bài lẫn slide không nói Developer miễn phí; chưa có căn cứ trong tài liệu khóa học (chưa xác minh với Microsoft Learn vì không được đọc ngoài).

### Slide 10 · `kieu-du-lieu-cua-cot` và slide 11 · `decimal-va-float` (1.3)

Slide 10: định nghĩa kiểu dữ liệu, `int`/`bit`, đối chiếu Format Cells đúng, caption ghi "Giá trị minh họa, không phải kết quả truy vấn" đúng quy ước. Slide 11: `decimal(4,1)` = tối đa 3 chữ số nguyên + 1 chữ số lẻ, ví dụ `12.5` đúng; không thay `float` cho tiền chính xác, đúng bài.

**F16 · Biên tập**
- "cờ hai trạng thái" dùng "cờ" khi chưa giải thích ("flag"); ví dụ có/không đã đủ, có thể bỏ "cờ".
- Slide 10 nói kiểu quy định "cách tính/so sánh" nhưng không có ví dụ; bài 1.3 có "ngày theo thời gian, tiền theo số", đưa lên được.
- Slide 11 đưa `decimal(18,0)` mà không nói vì sao khác `int` (mục đích: tối đa 18 chữ số, không phần lẻ). "sai số" của `float` không có ví dụ thấy được. Slide nói "decimal" cho tiền chính xác nhưng không gắn nhãn "số chính xác" ở chữ hiển thị dù tiêu đề dùng cụm này.

### Slide 12 · `varchar-va-nvarchar` (1.3)

**F17 · Cần làm rõ · đã dạy nhưng khó tìm (mật độ thuật ngữ)**
- Câu gốc: "n là giới hạn lưu trữ theo byte hoặc cặp byte, không luôn là số ký tự; varchar cũng lưu Unicode khi dùng bảng mã UTF-8 phù hợp."
- Tác động: hai câu chứa byte, cặp byte, bảng mã, UTF-8, Unicode, `N'…'`. "byte" và "N đánh dấu chuỗi Unicode" chỉ nằm ở ghi chú; "bảng mã" và "UTF-8" không được định nghĩa ở slide, bài 1.3 hay ghi chú. Người mới không thể dùng mệnh đề UTF-8 để quyết định gì. Slide cũng không nói khi nào dùng `varchar` (mã `NV001`) và khi nào dùng `nvarchar` (tên tiếng Việt), dù bảng bài 1.3 có ("`varchar`: thường dùng cho mã").
- Căn cứ: bài 1.3 (cột "Dùng cho" và đoạn Unicode), ghi chú slide 12.
- Đề xuất: bỏ vế UTF-8 khỏi slide, giữ ở bài/phụ lục; thêm "mã → `varchar`; tên tiếng Việt → `nvarchar` với `N'…'`".

### Slide 13 · `ngay-va-gio` (1.3)

Giữ được: `date`/`time`/`datetime2` và "đổi `datetime2` thành `date` làm mất phần giờ" đúng bài 1.3. Nhỏ: "múi giờ" không giải nghĩa; "hiển thị khác nhau tùy công cụ" không có ví dụ (slide 14 có thể làm cầu nối). Không lập finding.

### Slide 14 · `chuyen-kieu-du-lieu` (1.3)

**F18 · Cần làm rõ · đã dạy nhưng khó tìm (điều kiện nằm ở ghi chú)**
- Câu gốc: hàng "01/02/2024 → Đọc tháng trước ngày: 2024-01-02"; hàng "9610000 → Đọc thành số 9610000".
- Tác động: bảng không cho biết kiểu đầu vào hay kiểu đích: `9610000` ở đây là chuỗi và đích là số; hai hàng sau có đích là ngày. Người học đọc "9610000 → số 9610000" khó thấy đã có chuyển kiểu nào. Hàng 2 chỉ đúng với cấu hình đọc tháng trước ngày và khi người nhập muốn "1 tháng 2" (bài 1.3 nêu cả hai vế); hai điều kiện này chỉ ở ghi chú. Slide không nêu "tùy cấu hình ngôn ngữ/DATEFORMAT", nên có thể bị hiểu mọi SQL Server đều đọc như vậy. Đây đúng loại điều kiện ảnh hưởng kết luận cần hiện cho lớp.
- Căn cứ: bài 1.3 mục "Chuyển kiểu có thể đổi nghĩa" ("chuỗi `9610000`", "với cấu hình đọc tháng trước ngày…, dù người nhập muốn ngày 1 tháng 2"); ghi chú slide 14.
- Đề xuất: thêm cột "Kiểu/đích" hoặc ghi "chuỗi `9610000` → số", và nêu ngay trong hàng 2 "(cấu hình đọc tháng trước ngày; người nhập hiểu 1 tháng 2)".

**F19 · Cần sửa · sai có căn cứ (đường dẫn)**
- Câu gốc: liên kết "PL.1 về kiểu", "PL.2 về chuyển kiểu".
- Tác động: `href="../../phu-luc/pl-1-chi-tiet-kieu-du-lieu/"` là đường dẫn tương đối. Từ trang chiếu `/microsoft-sql-lession/bai-giang/lam-quen/` thì "../../" ra `/microsoft-sql-lession/`: đúng. Từ trang người giảng `/microsoft-sql-lession/bai-giang/lam-quen/nguoi-giang/` thì "../../" chỉ ra `/microsoft-sql-lession/bai-giang/`, tức `/bai-giang/phu-luc/…`; thư mục này không tồn tại trong `dist/bai-giang` (chỉ có `index.html` và `lam-quen`). Cả hai liên kết trên trang người giảng, nơi người giảng thật sự bấm, sẽ dẫn sai.
- Căn cứ: đọc `dist/bai-giang/lam-quen/nguoi-giang/index.html` (hai `href="../../phu-luc/…"`), `src/lib/paths.ts` (đường dẫn người giảng có `nguoi-giang/` và dấu `/` cuối), `ls dist/bai-giang`, không có thẻ `<base>`. Suy luận từ cách hiểu đường dẫn tương đối; chưa bấm thử trong trình duyệt.
- Đề xuất: dùng `withBase`/đường tuyệt đối như các liên kết "Bài nguồn". Ghi chú: "PL" (phụ lục) cũng chưa được giải nghĩa trên slide.

### Slide 15 · `rang-buoc-du-lieu` (1.4, 1 phút)

Giữ được: ghi rõ "luật đang bật", "hợp lệ chưa đủ để kết luận đúng nghiệp vụ".

**F20 · Biên tập**
- Bảng dùng `NOT NULL`, `NULL`, PK/FK/UNIQUE trước khi slide 16–19 định nghĩa; chấp nhận được cho slide mở 1 phút, nhưng "thao tác ghi" chưa giải nghĩa ("thêm/sửa dữ liệu"). Caption "Đặt tên cột là “Mã nhân viên” chưa tạo luật không trùng" nêu một hiểu nhầm chứ không mô tả bảng bên cạnh. Móc Excel (Data Validation) có trong bài 1.4 và ghi chú nhưng không có trên slide; từ slide 15 đến 25 không slide nào còn móc Excel.

### Slide 16 · `null-va-not-null` (1.4)

**F21 · Cần sửa · sai có căn cứ (hiển thị)**
- Câu gốc (nguồn MDX): `<code>''</code>` và `<code>'NULL'</code>`; HTML build: `chuỗi rỗng <code>”</code>` và `chuỗi chữ <code>‘NULL’</code>`.
- Tác động: chuỗi rỗng `''` (hai dấu nháy đơn) hiển thị thành một ký tự `”` (U+201D); `'NULL'` thành `‘NULL’` (U+2018/U+2019). Đây chính là điểm phân biệt cốt lõi của slide ("khác chuỗi rỗng và chuỗi chữ NULL"), nhưng trên màn hình lớp học chuỗi rỗng không còn đọc ra hai dấu nháy, còn chữ NULL không còn là chuỗi SQL.
- Căn cứ: `quy-uoc.md` mục 2.2 yêu cầu chuỗi có dấu nháy dùng biểu thức JSX (như slide 12 đã làm với `{"N'Trần Thị Mai'"}`) và kiểm ký tự trên bản build; hai trang `index.html` và `nguoi-giang/index.html` cùng có lỗi (quét codepoint). Quét toàn bộ `<code>` có dấu nháy cong của 25 slide: chỉ hai chỗ này.
- Đề xuất: đổi thành `{"''"}` và `{"'NULL'"}` theo quy ước, build lại, chạy `check:dist`.

**F22 · Biên tập**
- Hàng 2 bảng: "Nhận NULL; bộ mẫu quy ước chưa nghỉ" thiếu vế "NULL nghĩa là". Bảng chỉ liệt kê quy tắc cột, học viên chưa thấy một ô `NULL` thật; chấp nhận được nếu giữ ngắn, nhưng nên viết "NULL = chưa nghỉ (quy ước của bộ mẫu)". "bộ mẫu" liên quan F01.

### Slide 17 · `khoa-chinh` (1.4)

**F23 · Cần làm rõ · đã dạy nhưng khó tìm**
- Câu gốc: tiêu đề cột "Khi MaNV đã là PK" / "Luật xét riêng khóa"; hàng "Mã chưa có", "Mã đã có", "NULL"; "Trong giả định bảng không có PK, nó vẫn lưu/đọc được".
- Tác động: các hàng là mã đầu vào của một thao tác (thêm hồ sơ mới?) nhưng không ghi động từ; "Luật xét riêng khóa" là diễn đạt khó. "nó" có thể đọc là PK chứ không phải bảng. Điều kiện hình ảnh nằm ở caption "Mô tả luật, không phải thao tác ghi" (tốt) nhưng càng khó hiểu bảng thể hiện gì. "Một bảng có tối đa một PK" chỉ ở ghi chú.
- Căn cứ: slide 17 hiển thị; bài 1.4 đoạn "Khóa chính và tính duy nhất".
- Đề xuất: tiêu đề "Thêm hồ sơ có `MaNV`…" → "Kết quả"; thay "nó" bằng "bảng".

### Slide 18 · `khoa-ghep-va-unique` (1.4)

**F24 · Cần sửa · sai có căn cứ (tham chiếu bài)**
- Câu gốc: "thêm NOT NULL nếu cột bắt buộc có giá trị, còn cách kiểm NULL học ở bài 5.2".
- Tác động: bài 1.4 viết "Cách `UNIQUE` xử lý `NULL` học ở bài 5.2" và "lọc `NULL` ở bài 2.5". Slide đổi thành "cách kiểm NULL học ở bài 5.2": người học sẽ hiểu việc lọc/kiểm giá trị NULL trong truy vấn học ở 5.2 (thực tế ở bài 2.5). Cũng không nói điều gì về UNIQUE và NULL nên câu như treo.
- Căn cứ: bài 1.4 dòng "Cần thêm `NOT NULL`… học ở bài 5.2" và đoạn "Ở bài này chỉ cần…".
- Đề xuất: viết lại "UNIQUE xử lý NULL thế nào: học ở bài 5.2".

**F25 · Cần làm rõ · đã dạy nhưng khó tìm**
- Câu gốc: "Khóa ghép gồm nhiều cột: PK của BangLuong là KyLuong và MaNV".
- Tác động: tiêu đề hứa "Khóa ghép và UNIQUE" nhưng bảng chỉ minh họa khóa ghép; UNIQUE không có ví dụ. Bảng cũng không có cặp bị chặn (ví dụ `2026-09`/`NV001` lần nữa), nên "cả cặp phải duy nhất" chỉ được nói chứ chưa được thấy. Slide không nói "một PK gồm hai cột" (ghi chú có), dễ đọc thành hai PK. "ngoài PK" mơ hồ ("thêm vào PK").
- Căn cứ: bài 1.4; ghi chú slide 18; `BangLuong` khóa là cặp kỳ lương và mã NV khớp hồ sơ công ty mục 4.
- Đề xuất: thêm một dòng đánh dấu cặp lặp "bị chặn"; "một khóa chính gồm hai cột".

### Slide 19 · `khoa-ngoai` (1.4)

Điều kiện cốt lõi có mặt: "FK đang bật kiểm mã khác NULL có thật", "không xác nhận đúng phòng", "FK không bắt mọi phòng có nhân viên".

**F26 · Cần làm rõ · đã dạy nhưng khó tìm**
- Câu gốc: tiêu đề cột "Luật đang bật" với hàng 3 "Mã có thật nhưng gán nhầm"; "Giả định thiếu FK và luật kiểm khác, mã lạ có thể lọt; vẫn có thể kết bảng, lấy thông tin qua các bảng theo điều kiện so khớp."
- Tác động: hàng 3 không phải là luật nên tiêu đề cột sai. Câu thứ ba chắp hai ý ("thiếu FK thì mã lạ lọt" và "vẫn kết bảng được") bằng dấu chấm phẩy, cú pháp rối; "kết bảng" xuất hiện lần đầu mà không có nghĩa tại chỗ (ghi chú: "JOIN học ở 3.4/3.6"). Caption "không phải ô chọn trên màn hình" không có tiền đề: người học chưa thấy ô chọn nào.
- Căn cứ: slide 19 hiển thị, bài 1.4.
- Đề xuất: đổi tiêu đề "Kiểm ở `NhanVien.MaPB`" cho cả cột trái, tách hàng 3 thành dòng riêng "không thuộc luật"; cắt câu thứ ba hoặc viết "vẫn có thể kết bảng (lấy thông tin từ hai bảng qua mã chung)".

### Slide 20 · `so-do-quan-he-erd` (1.5, 2 phút)

Giữ được: định nghĩa Database diagram/ERD đúng bài 1.5; caption nêu rõ "PUBS … khác HRM_Demo; cấu trúc, không phải các dòng dữ liệu".

**F27 · Cần sửa · sai có căn cứ (alt/mô tả)**
- Câu gốc: alt "Sơ đồ PUBS gốc của Microsoft: publishers, pub_info, titles, stores và sales; các đường khóa liên kết những bảng này." (slide 20 và 25); ghi chú: "Nhận diện publishers, titles, stores, sales".
- Tác động: ảnh gốc có **bảy** bảng: ngoài năm bảng nêu còn `employee` và `discounts` (đọc trực tiếp ảnh; `employee` có cột `pub_id` nối với `publishers`, `discounts` có `stor_id` nối với `stores`). Alt liệt kê như thể ảnh chỉ có năm bảng. Người dùng đọc màn hình hoặc nghe người giảng "nhận diện bốn bảng" sẽ thiếu. Lỗi này cũng có ở caption bài 1.5.
- Đề xuất: sửa alt liệt kê đủ bảy bảng hoặc nói "đọc năm bảng quan trọng"; xem F28.

**F28 · Cần làm rõ · đã dạy nhưng khó tìm**
- Câu gốc: "chìa khóa chỉ PK, đường thể hiện FK, đầu ∞ là phía nhiều".
- Tác động: (a) slide không nói hai bảng `employee`, `discounts` là gì và có cần đọc không. (b) Trên ảnh, biểu tượng chìa khóa xuất hiện **cả cạnh tên cột PK lẫn ở đầu đường** (phía "một"); slide chỉ nói chìa khóa là PK, còn "đầu chìa khóa của đường = phía một" chỉ có ở ghi chú. Ở đường `publishers`–`pub_info` cả hai đầu đều là chìa khóa, nên không có luật đọc ở slide thì không suy ra được một–một. (c) Ảnh có chú thích tiếng Anh (Primary key, Row selector, One-to-many relationship, One-to-one relationship, Column name…) không được nhắc, trong khi chính chúng xác nhận cách đọc. (d) Ký hiệu "∞" trên ảnh gốc là hai vòng nhỏ; khi phóng 4 lần tôi nhìn ra, độ rõ khi chiếu chưa xác minh. (e) "Để làm gì": mục đích đọc sơ đồ (biết lấy thông tin qua bảng nào) chỉ xuất hiện ở slide 25.
- Căn cứ: ảnh `1-5-pubs-diagram.png` (phóng đoạn nối publishers–pub_info, publishers–titles, stores–sales); ghi chú slide 20.
- Đề xuất: thêm vào câu 2 "đầu có chìa khóa là phía một; hai đầu chìa khóa là một–một"; một câu nói "ảnh còn `employee`, `discounts`, buổi này không dùng"; thêm "đọc sơ đồ để biết bảng nào nối với bảng nào".

### Slide 21–24 · quan hệ một–một, một–nhiều, nhiều–nhiều, bắt buộc/tùy chọn (1.5, 2 phút mỗi slide)

Giữ được (đối chiếu ảnh): `pub_info.pub_id` có chìa khóa PK và nối `publishers` (một–một); `titles.pub_id` không có chìa khóa PK; `sales` có **ba** chìa khóa ở `stor_id`, `ord_num`, `title_id` (khớp "PK của sales gồm ba cột"); `ord_num` giải nghĩa "số đơn". Phân biệt "tối đa một" và "đúng một", "FK không bắt mỗi nhà xuất bản phải có dòng `pub_info`/`titles`", "ảnh không in luật NULL" đều đúng bài 1.5 và có mặt trên slide. Nhận định "titles.pub_id nhận NULL" khớp bài 1.5 và `SOURCES.md` (không đọc lại `instpubs.sql`, xem mục 5).

**F29 · Cần làm rõ · đã dạy nhưng khó tìm**
- Câu gốc: các caption "Phóng vùng bảng từ cùng ảnh PUBS; bấm để xem toàn sơ đồ".
- Tác động: slide 21–24 chỉ hiện các vùng crop của khung bảng. Theo toạ độ trong `PubsFigure.astro`, các đường nối và đầu chìa khóa/∞ nằm ngoài vùng crop (tôi cắt đúng toạ độ để xem). Hình "Quan hệ một–một", "một–nhiều" thực chất chỉ có hai khung bảng đặt cạnh nhau, không có đường; đúng thứ lớp cần quan sát (đầu chìa khóa/∞) không có trên slide. Ở slide 23, câu chữ nói tới `titles` nhưng khung `titles` không nằm trong hình (chỉ `stores` và `sales`); ghi chú tự nhận "crop chỉ làm rõ stores và sales". Ở slide 24, `publishers` (bên cha) cũng không có trong hình. Caption không nói "đường quan hệ không nằm trong vùng phóng", và "bấm" không dùng được trên màn chiếu.
- Chưa xác minh: bố cục CSS thật (zoom 2,1, `--pubs-left/top`), có cắt hay tràn khung hay không.
- Đề xuất: mỗi slide thêm một crop có cả đường (ví dụ vùng bao `publishers`–`pub_info`), hoặc dùng ảnh toàn sơ đồ kèm đánh dấu CSS; caption nêu rõ đường bị lược. Nếu giữ crop, thêm vế "xem đường ở slide 20" vào caption.

**F30 · Biên tập**
- Slide 21 nói "phía tham chiếu còn cần tính duy nhất bằng PK hoặc UNIQUE": đúng nghĩa là cột FK ở `pub_info`, nhưng "phía tham chiếu" dễ đọc thành phía được tham chiếu (vốn đã duy nhất). Viết "cột FK `pub_info.pub_id`". Câu hỏi "vì sao có bảng một–một riêng" không được trả lời ở slide hay bài; `pub_info` ("thông tin bổ sung": `logo`, `pr_info` trong ảnh) không được nêu tên.

**F31 · Cần làm rõ · chưa được dạy**
- Câu gốc: "một đầu sách được bán ở nhiều cửa hàng qua bảng trung gian `sales`".
- Tác động: slide không nói vì sao phải có bảng trung gian (một ô không giữ được nhiều giá trị nên cần một dòng cho mỗi cặp), chỉ nói rằng có. "Vì sao như thế" không được trả lời ở slide hay bài 1.5.
- Đề xuất: thêm một vế "mỗi dòng `sales` là một lần bán nên một cửa hàng có nhiều dòng, một sách cũng nhiều dòng".

**F32 · Cần làm rõ · đã dạy nhưng khó tìm**
- Câu gốc: "Theo script PUBS, `titles.pub_id` nhận `NULL`…"; "'tối đa một' khác 'đúng một'" (slide 24).
- Tác động: "script PUBS" (tệp câu lệnh tạo database mẫu) chưa được giải nghĩa; người học không tự kiểm được vì ảnh không in NULL. Câu cuối ghép "FK không bắt nhà xuất bản có dòng `pub_info` hay `titles`" với "tối đa một khác đúng một", không nói chiều nào là "tối đa một" (`publishers` → `pub_info`) và chiều nào là "đúng một" (`pub_info` → `publishers`, vì PK/FK không NULL).
- Đề xuất: chú thích "script PUBS: tệp lệnh Microsoft dùng để tạo database mẫu" và tách hai chiều bằng hai vế.

### Slide 25 · `lan-duong-va-tu-tham-chieu` (1.5, 3 phút)

Giữ được: "`NhanVien.MaQuanLy` → `NhanVien.MaNV`", "`MaQuanLy` nhận `NULL`", "không nằm trong PUBS" khớp bài 1.5 và hồ sơ công ty (NV004 quản lý NULL; NV001 trỏ NV005, NV005 trỏ NV004; công ty không lưu lịch sử chuyển phòng, đúng ghi chú).

**F33 · Cần cắt · quá tải**
- Câu gốc: ba đoạn: lần đường `stores → sales → titles`; "Chốt mỗi dòng là dòng bán hay đầu sách trước khi đếm: đi sang phía nhiều có thể lặp thông tin sách"; "Tự tham chiếu trỏ về cùng bảng…" (khoảng 85 âm tiết, dài nhất bộ).
- Tác động: ba chủ đề trong 3 phút. Hình là toàn bộ PUBS và không minh họa tự tham chiếu (ví dụ ở bảng khác, ở `HRM_Demo`, không hiện hình/bảng nào); lớp phải tưởng tượng. Câu "đi sang phía nhiều có thể lặp thông tin sách" thiếu chính xác: chỉ rõ thông tin sách lặp ở **mỗi dòng bán**; người mới không biết lặp ở đâu. Quy trình năm bước trong ghi chú ("Đọc yêu cầu → chốt ý nghĩa dòng → …") không có trên slide.
- Đề xuất: tách tự tham chiếu thành một bảng trích nhỏ có thật trong hồ sơ công ty (`NV001`→`NV005`→`NV004`, `NV004` có `MaQuanLy` rỗng/`NULL`); giữ lần đường và nói rõ "lặp ở mỗi dòng bán". Nếu không tách slide thì bỏ câu thứ hai hoặc ghép vào slide 23.
- Ghi nhận: hai alias cũ `ten-phong-cua-nv001`, `hop-dong-kem-ten-phong` giờ rơi vào slide 25 không nói về phòng/hợp đồng; đây là quyết định đã duyệt trong spec, không coi là lỗi.

### Liên slide

**F34 · Cần làm rõ · chưa xác minh (credit/license)**
- Câu gốc: credit "Microsoft Learn · ảnh gốc PUBS" và "MicrosoftDocs/data-tools · MIT" (slide 20–25).
- Tác động: slide chỉ nêu tên license và liên kết, không có dòng bản quyền "© Microsoft Corporation"; bản thông báo MIT chỉ ở `src/assets/lessons/1-5-pubs-diagram-LICENSE.txt` và không có trong `dist/_astro` (chỉ có `.png`). Điều MIT đòi khi phân phối ảnh trên trang công khai, và việc license của kho `MicrosoftDocs/data-tools` có phủ cả ảnh `table-relationships.png` hay không, tôi **không thể xác minh** (không được truy cập web). Credit Commons (Achim Friedland CC0; Booyabazooka public domain) khớp `src/assets/presentations/SOURCES.md`, nêu tác giả, nơi lưu, giấy phép và liên kết trang nguồn.
- Đề xuất: người làm khóa học tự xác nhận yêu cầu thông báo MIT; nếu cần, thêm dòng bản quyền vào credit hoặc trang giấy phép chung.

**F35 · Biên tập · ghi chú người giảng**
- Nhiều phần "Giải thích" là ràng buộc cho người viết chứ không phải điều người giảng cần hiểu: "không mặc định người học biết hàm dò tìm" (slide 3), "không biến buổi nhập môn thành bài về bảng mã" (12), "Không chạy câu ghi để chứng minh luật" (15), "Điều kiện thiếu FK là giả định, không sửa schema" (19), "Nguồn Microsoft Learn đã được ghi trong bài nguồn và SOURCES.md" (9), "không yêu cầu học viên tự cài PUBS" (24). Người giảng đọc sẽ không biết ai ra lệnh và cần làm gì.
- Lệch ghi chú–slide: slide 6 nhắc SSMS (xuất hiện ở slide 7); slide 7 sai thứ tự; slide 20 nêu bốn bảng nhưng bỏ `pub_info`; slide 3 Hay hiểu nhầm (F06).
- Đủ ba nhãn Ý cần nói/Hay hiểu nhầm/Giải thích ở cả 25 ghi chú; `source` và `minutes` của mọi `PresenterNotes` khớp `Slide` chứa nó (kiểm bằng script).
- Đề xuất: viết lại "Giải thích" thành điều người giảng nên nói/cảnh giác; chuyển ràng buộc tác giả vào spec.

**F36 · Biên tập · nhịp và lặp**
- Lời "database không tự biết dữ liệu đúng nghiệp vụ / hợp lệ chưa đủ đúng" lặp ở slide 5, 8, 14, 15, 17, 19, 24. Mỗi chỗ có lý do, nhưng bảy lần trong một buổi nghe như điệp khúc; giữ đậm ở 14, 19, 24.
- Không có câu hỏi cả lớp hay slide tóm tắt: 25 slide kết thúc bằng slide nội dung, 10 phút hỏi đáp không có màn hình. Đây là quyết định của spec ("không có trang bìa riêng, bài tập") và `data-answer` = 0 ở cả hai trang là đúng thiết kế; tôi chỉ ghi nhận rằng giữa chừng không có điểm kiểm hiểu.
- Nhịp 10/8/10/9/13 đúng spec và khớp 50 phút, nhưng mỗi slide đều 2 phút dù độ khó khác nhau: bốn slide kiểu dữ liệu (nhận diện) ngang một slide NULL, PK, FK hay một–nhiều. Nếu cần rút thời gian, bớt 1 phút ở slide 10 hoặc 13 cho slide 16–19 và 25.

---

## 3. Câu hỏi "tại sao / để làm gì" tôi tự đặt và slide nào trả lời

| # | Câu hỏi | Trả lời trên slide | Nhận xét |
|---|---|---|---|
| 1 | Database khác một file Excel ở đâu; vì sao cần? | Gián tiếp slide 5 (dùng chung, bản xuất không tự đồng bộ); slide 3 cho phép so sánh | Không có câu trực tiếp ở slide 1 (F02) |
| 2 | `HRM_Demo` là gì? | Chưa | F01 |
| 3 | Vì sao gọi là "quan hệ"? | Chưa (hình nói Relation = bảng, mâu thuẫn dễ gây hiểu) | F07 |
| 4 | NoSQL nghĩa là gì, vì sao khóa học không học? | Một phần slide 2 (khác cách tổ chức); lý do học SQL Server chỉ ở ghi chú | F03 |
| 5 | Vì sao tách hồ sơ và hợp đồng? | Slide 5 nêu "giảm chép lại", chưa nêu cái gì | F09 |
| 6 | SQL Server, SQL, T-SQL, SSMS khác nhau thế nào? | Slide 6, 7 (đúng, dùng được) | Trùng ý với 1 (F11) |
| 7 | Có SQL Server là tự có phân quyền, giao dịch, sao lưu? | Slide 8 (có điều kiện) | Thuật ngữ chưa định nghĩa (F13) |
| 8 | Vì sao phân biệt edition? Học ở đâu? | Slide 9 nêu mục đích edition; nơi học chưa nói rõ | F14 |
| 9 | Vì sao phải có kiểu dữ liệu? | Slide 10 (một câu và Format Cells) | Thiếu ví dụ (F16) |
| 10 | Vì sao tiền dùng `decimal` không dùng `float`? | Slide 11 (nói "chấp nhận sai số") | Không có ví dụ thấy được (F16) |
| 11 | Vì sao mã/số CCCD dùng chuỗi? | Slide 12 (giữ số 0 đầu) | Có |
| 12 | Lưu được có đồng nghĩa đúng ý? | Slide 14 (đậm), nhưng điều kiện nằm ở ghi chú | F18 |
| 13 | Ràng buộc để làm gì, ai đặt luật? | Slide 15 (luật khai báo, đang bật) | Không nói ai khai báo; chấp nhận |
| 14 | `NULL` khác `0`, chuỗi rỗng ra sao? | Slide 16 | Hiển thị lỗi nháy (F21) |
| 15 | PK để làm gì khi bảng không có PK vẫn lưu được? | Slide 17 | Bảng khó đọc (F23); mục đích thực tế (đếm đúng, tham chiếu) chưa nêu rõ |
| 16 | Vì sao khóa ghép? UNIQUE khác PK ra sao? | Khóa ghép slide 18 (thấy qua bảng); UNIQUE chỉ một câu | F25 |
| 17 | FK để làm gì, thiếu thì sao? | Slide 19 | Đúng; câu 3 rối (F26) |
| 18 | Đọc ERD để làm gì? | Slide 25 (lần đường) | Muộn: slide 20 chưa nói (F28) |
| 19 | Vì sao có bảng một–một riêng? | Chưa | F30 |
| 20 | Vì sao nhiều–nhiều cần bảng trung gian? | Chưa (chỉ nói có) | F31 |
| 21 | Từ ảnh có biết bắt buộc hay tùy chọn không? | Slide 24: không; phải xem khai báo | Đúng; "script PUBS" cần giải nghĩa (F32) |
| 22 | Vì sao đi sang phía nhiều thì lặp? | Slide 25, mơ hồ | F33 |

---

## 4. Ưu tiên

**Cần sửa trước khi chiếu (4):**
- F21: nháy cong ở slide 16 làm mất điểm cốt lõi "chuỗi rỗng khác NULL".
- F19: liên kết PL.1/PL.2 trên trang người giảng dẫn tới thư mục không tồn tại (suy ra từ đường dẫn; chưa bấm thử).
- F24: "cách kiểm NULL học ở bài 5.2" lệch nguồn ("UNIQUE xử lý NULL").
- F27: alt của ảnh PUBS bỏ `employee` và `discounts`.

**Cần làm rõ, ảnh hưởng nhiều nhất tới người mới (xếp theo tác động):**
1. F29, F28, F27: hình PUBS ở slide 20–24 không cho thấy đường và đầu ký hiệu mà lời giảng dạy cách đọc.
2. F18: bảng chuyển kiểu thiếu kiểu đích và điều kiện cấu hình.
3. F01, F02, F07: `HRM_Demo` chưa giải nghĩa; "quan hệ"/NoSQL dùng trước khi định nghĩa; quan hệ vs Relation.
4. F13, F14, F17: giao dịch, sao lưu, Azure, byte/UTF-8 là thuật ngữ nặng, thiếu nghĩa tại chỗ.
5. F03, F04, F09, F23, F25, F26, F31, F32, F34: các mục còn lại.

**Cần cắt/gộp (2):** F11 (slide 6–7 lặp), F33 (slide 25 quá tải).

**Biên tập (12):** F05, F06, F08, F10, F12, F15, F16, F20, F22, F30, F35, F36.

### Mục Giữ được (khẳng định đúng, đã đối chiếu)

- **G1:** 25 slide, 5 nguồn, tổng phút 10/8/10/9/13 = 50; `Slide` và `PresenterNotes` khớp `source`/`minutes` ở cả 25 slide; cả 25 ghi chú có đủ ba nhãn (kiểm bằng script).
- **G2:** Ghi chú không lộ vào trang chiếu: `dist/bai-giang/lam-quen/index.html` không có "Ý cần nói", "Hay hiểu nhầm", "Giải thích", "instpubs", "SOURCES.md"; trang người giảng có 25 lần mỗi nhãn.
- **G3:** Các điều kiện ảnh hưởng kết luận **có mặt ở phần hiện cho lớp**: luật khai báo/đang bật (15, 17, 19); `NOT NULL` chỉ chặn `NULL` (16); FK chỉ kiểm mã tồn tại, không xác nhận đúng phòng (19); lưu được chưa chắc đúng ý (14); "tối đa một khác đúng một" (24); PK `sales` ba cột (23); `titles.pub_id` nhận `NULL` (24); `pub_info.pub_id` vừa PK vừa FK (21, 24); `NhanVien.MaQuanLy` thuộc `HRM_Demo`, không thuộc PUBS (25).
- **G4:** Excel được tả đúng và không tuyệt đối hóa (Format Cells, ô gộp, "Excel cũng có chia sẻ và kiểm dữ liệu nhập").
- **G5:** Khẳng định về SQL Server, SSMS, edition, `decimal(4,1)`, `n` theo byte, `datetime2` không múi giờ, FK/PK khớp bài nguồn; lời không hứa quá (điều kiện đi kèm khả năng).
- **G6:** Ảnh PUBS và crop khớp lời: `pub_info.pub_id` có chìa khóa, `titles.pub_id` không, `sales` ba chìa khóa; đường publishers–pub_info có chìa khóa ở hai đầu; publishers–titles chìa khóa ở publishers và ∞ ở titles (phóng ảnh gốc; không kiểm hiển thị thật).
- **G7:** Credit/alt ảnh Commons đúng `SOURCES.md` (tác giả, giấy phép, liên kết); caption ghi rõ phép so sánh, minh họa, "không phải kết quả truy vấn" ở slide 10, 11, 13, 14, 18.
- **G8:** Dữ kiện `HRM_Demo` dùng trong slide khớp hồ sơ công ty (`NV001` Trần Thị Mai; `NV004` quản lý NULL; `NV001`→`NV005`→`NV004`; không lưu lịch sử chuyển phòng; khóa `BangLuong` là kỳ lương và mã NV).
- **G9:** In đậm có chọn lọc cho khái niệm, code cho tên bảng/cột/giá trị và `N'Trần Thị Mai'` đúng mục 2.2, ngoại trừ F21. "kết bảng" được dùng thay "JOIN" ở lời hiển thị (JOIN chỉ ở ghi chú).

---

## 5. Nguồn và giới hạn

**Nguồn dùng:** `docs/quy-uoc.md` (mục 1, 2.2, 3, 4.7), `docs/presentation-template.md`, `docs/ho-so-cong-ty.md`, `DESIGN.md` (mục Content and data visualization), spec `2026-11-04-lam-quen-slides-refresh-design.md`, năm bài 1.1–1.5, `lam-quen.mdx`, `PubsFigure.astro`, `src/assets/lessons/SOURCES.md`, `src/assets/presentations/SOURCES.md`, `1-5-pubs-diagram-LICENSE.txt`, `src/lib/paths.ts`, `astro.config`, hai ảnh gốc và tệp SVG, hai trang `index.html` trong `dist/`.

**Chưa xác minh (cần chạy hoặc mở thực tế, hoặc ngoài phạm vi được phép):**
- Bố cục và tràn chữ ở canvas 1280×720; độ rõ của ký hiệu "∞" và chìa khóa khi chiếu; crop PUBS bằng CSS có đúng như tôi cắt bằng Pillow hay không.
- Bàn phím, đồng bộ hai cửa sổ, chế độ không JavaScript, hành vi alias, trang chiếu có import store tiến độ hay không (chỉ thấy không có chuỗi "progress" trong HTML).
- Liên kết thật khi bấm (F19 suy ra từ đường dẫn).
- SVG đa ngôn ngữ phụ thuộc ngôn ngữ trình duyệt (F07).
- Dữ kiện schema `HRM_Demo` (cột `MaHD`, `HoTen NOT NULL`, `MaPB NOT NULL` kèm FK, `NgayNghiViec` nhận NULL, PK `BangLuong`): chỉ đối chiếu với bài 1.4 và hồ sơ công ty; không đọc `HRM_Demo.sql`.
- Khai báo PUBS (`pub_info.pub_id` PK/FK, `titles.pub_id` NULL, PK `sales` ba cột): ảnh gốc phù hợp ở phần nhìn thấy được (chìa khóa, đường), nhưng NULL/NOT NULL không có trên ảnh và tôi không đọc lại `instpubs.sql`; dựa vào bài 1.5 và `SOURCES.md`.
- Tài liệu Microsoft Learn (edition 2025, kiểu dữ liệu, SSMS) và hiệu lực giấy phép MIT cho ảnh: không truy cập ngoài; dựa vào bài nguồn.

**Không làm và lý do:** không sửa MDX/test/docs, không dựng lại build, không so với report/nhận xét khác, không kết luận về UI.

---

## Tóm tắt trả về người giao việc

Report: `D:\lam.nguyen\Projects\microsoft-sql-lession\temp\review\2026-11-04-lam-quen-slides\review-bo-slide-lam-quen.md`. 36 finding: 4 Cần sửa (F19 liên kết PL trên trang người giảng, F21 nháy cong slide 16, F24 "cách kiểm NULL" lệch nguồn, F27 alt PUBS bỏ hai bảng), 18 Cần làm rõ, 2 Cần cắt, 12 Biên tập; thêm 9 mục Giữ được. Điểm đáng chú ý nhất là hình PUBS ở slide 21–24 chỉ crop khung bảng nên không thấy đường và ký hiệu mà lời giảng đang dạy cách đọc. Phần bố cục, tương tác và nhánh không JavaScript chưa xác minh.
