# Review độc lập bài 3.7 — Self join: ai quản lý ai

Ngày review: 24/10/2026. Reviewer: Codex, kế thừa model của phiên; không đổi model. Vai đọc: Business Consultant khó tính, muốn học đủ để hiểu và phản biện yêu cầu dữ liệu khi làm BA/PM.

Phạm vi: `src/content/lessons/3-7-self-join-quan-ly.mdx` và `src/content/exercises/3-7-self-join-quan-ly.yaml`. Số dòng dưới đây theo source hiện tại. Đã đọc tĩnh HTML build và CSS mà trang build tham chiếu; không mở browser, không chạy SQL hoặc kết nối database.

**Kết luận:** phần giảng chính giúp hiểu được hai vai trò của cùng bảng, hướng dò quản lý, lý do giữ `NULL` và cách đếm cấp dưới. Chưa thấy lỗi SQL chắc chắn qua đọc tĩnh. Chỗ nên sửa trước là cách gọi cột trong đề 3-7-2: người học có thể hiểu thành lấy quản lý của quản lý. Các góp ý khác chủ yếu làm câu đếm chính xác hơn, giảm một chỗ lặp và hoàn thiện định dạng dẫn chứng. Không coi việc khớp hồ sơ công ty là đã chạy xác minh số liệu.

## Rà theo thứ tự bài

### 1. Mục tiêu, thời lượng và tình huống — Giữ được

- **Câu gốc:** “bạn lấy được quản lý trực tiếp bằng hai bí danh và giữ hồ sơ không có quản lý”; “Giả định: đọc `MaQuanLy` hiện lưu của mọi hồ sơ, gồm cả người đã nghỉ; không suy quản lý ở một thời điểm quá khứ.” (MDX 11–24).
- **Tại sao/để làm gì:** lấy quản lý để gửi phiếu đánh giá; tại sao vẫn lấy người đã nghỉ, có suy quản lý quá khứ không? Bài đã trả lời bằng phạm vi mọi hồ sơ và dữ liệu hiện lưu. Đây là yêu cầu dữ liệu do tình huống chốt; không cần tự thêm chính sách chỉ đánh giá người đang làm.
- **Lý do giữ:** yêu cầu có cột, thứ tự dòng, cách xử lý thiếu mã và giới hạn trực tiếp/gián tiếp. Nội dung đếm cấp dưới mở rộng hơn goal nhưng có ích cho bài tập 3; mức 20 phút có vẻ hợp lý để đọc và thực hành, chưa đo thời gian học thực tế.
- **Đề xuất:** giữ. Không yêu cầu tách riêng phần Excel và SQL hoặc thêm mục trả lời chị Hạnh.

### 2. Câu chốt yêu cầu — Biên tập

- **Câu gốc:** “Tên người quản lý cũng nằm trong NhanVien; cần phân biệt hai vai trò của cùng bảng.” (MDX 26).
- **Tại sao/để làm gì:** vì sao phải dùng hai vai trò nếu chỉ có một bảng? Câu chốt nêu đúng nút thắt, phần sau đã trả lời.
- **Lý do:** `NhanVien` là tên bảng nhưng đang hiện chữ thường trong HTML, chưa theo quy ước dẫn chứng.
- **Sửa ngắn:** “Tên người quản lý cũng nằm trong `NhanVien`; cần phân biệt hai vai trò của cùng bảng.”

### 3. Excel và công thức dò cùng sheet — Giữ được

- **Câu gốc:** “Trong bản xuất, mã nhân viên và họ tên ở hai cột đầu của sheet `NhanVien`; ô mã quản lý trống thì công thức trả chuỗi rỗng để hiển thị.” (MDX 32).
- **Khối đã soi:** `=IF(C2="","",VLOOKUP(C2,NhanVien!A:B,2,FALSE))`; `cell="D2"`, `selected="D2"`, đánh dấu `C2`, `D2`; ba dòng `NV001`, `NV005`, `NV004` (MDX 34–39).
- **Tại sao/để làm gì:** đem mã nào đi dò, dò ở đâu, vì sao không dùng mã của chính nhân viên? Lời dẫn, công thức và hai ô được đánh dấu cùng chỉ `NV005` → `Vũ Thị Lan`. Vì sao `NV004` có ô tên trống? `IF` và lời dẫn đã giải thích cách hiển thị; phần SQL sau còn phân biệt chuỗi rỗng với `NULL`.
- **Lý do giữ:** công thức dùng dò chính xác; thứ tự các dòng minh họa không làm sai cách dò này. Cột mã/họ tên đã được chốt rõ để `A:B` có nghĩa. Bài trước đã dùng VLOOKUP nên không cần giảng lại từng đối số.
- **Đề xuất:** giữ. Giá trị trong hình khớp ví dụ được mô tả; chưa thực thi công thức Excel hoặc xác minh bản xuất thật.

### 4. Định nghĩa self join và hai bí danh — Giữ được

- **Câu gốc:** “**Self join** là kết một bảng với chính nó bằng các bí danh khác nhau. Không có từ khóa `SELF JOIN` riêng: vẫn dùng `INNER JOIN` hoặc `LEFT JOIN`.” (MDX 41).
- **Tại sao/để làm gì:** có phải viết từ khóa mới hoặc tạo thêm một bảng nhân viên không? Bài trả lời ngay; các bí danh `nv`, `ql` cho biết đang đọc hồ sơ ở vai trò nào.
- **Lý do giữ:** đủ nối từ bí danh ở bài 3.4 sang một bảng xuất hiện hai lần. “Không tạo hai bảng mới hoặc sao chép dữ liệu” giải tỏa đúng ngộ nhận có thể có của người học.
- **Đề xuất:** giữ chữ đậm cho **Self join** ở lần định nghĩa. Không cần thêm cơ chế lưu trữ hay thực thi vật lý.

### 5. Điều kiện dò quản lý — Giữ được

- **Câu gốc:** “Điều kiện đúng là `ql.MaNV = nv.MaQuanLy`: tìm hồ sơ có mã nhân viên bằng mã quản lý ghi trên dòng `nv`.” (MDX 43).
- **Tại sao/để làm gì:** vì sao không lấy `nv.MaNV` để dò `ql.MaNV`; vì sao `nv.HoTen` và `ql.HoTen` khác nhau? Ví dụ `NV001` → `NV005` → `Vũ Thị Lan`, cùng tên nhân viên `Trần Thị Mai`, trả lời cụ thể.
- **Lý do giữ:** điều kiện và dẫn chứng đứng cạnh nhau; người học có thể lần theo một dòng để kiểm hướng thay vì nhớ máy móc tên bí danh. Các giá trị và tên cột đã có code.
- **Đề xuất:** giữ.

### 6. LEFT JOIN, khóa và số dòng — Giữ được

- **Câu gốc:** “Trong bộ mẫu, `NV004` có `MaQuanLy` là `NULL`”; “`ql.MaNV` là khóa chính nên mỗi mã quản lý đã khai báo khớp tối đa một hồ sơ; bảng mẫu có khóa ngoại và cho phép `MaQuanLy` nhận `NULL`.” (MDX 47–49).
- **Tại sao/để làm gì:** vì sao dùng `LEFT JOIN`, vì sao không tự điền tên giám đốc, vì sao không bị nhân dòng như bài 3.5? Bài trả lời bằng hồ sơ `NV004`, phía trái `nv`, tính duy nhất của khóa và giới hạn dữ liệu mẫu.
- **Lý do giữ:** `NULL` không bị gọi là lỗi dữ liệu; bài không hứa mọi self join đều có một dòng mỗi người. Thông tin khóa ngoại tự trỏ đã có ở bài 1.4, nên không phải thuật ngữ xuất hiện vô cớ.
- **Đề xuất:** giữ nội dung. Riêng “câu LEFT JOIN” trong đoạn 49 nên thành “câu `LEFT JOIN`” theo quy ước code.
- **Số liệu:** `48`/`47` khớp hồ sơ công ty; chưa chạy để xác minh. Không đề nghị sửa con số chỉ vì reviewer chưa chạy.

### 7. Đổi hướng để đếm cấp dưới — Giữ được

- **Câu gốc:** “Để đếm **cấp dưới trực tiếp**, đổi hướng nhìn: vai trò `ql` là danh sách cần thống kê, vai trò `nv` là các dòng có `nv.MaQuanLy = ql.MaNV`.” (MDX 51).
- **Khối đã soi:** câu `SELECT ql.MaNV, COUNT(nv.MaNV) ...`, `FROM NhanVien AS ql`, `LEFT JOIN ... AS nv`, phạm vi ba mã, `GROUP BY` và `ORDER BY` (MDX 53–58).
- **Tại sao/để làm gì:** tại sao phía trái bây giờ là `ql`, mặc dù lúc tìm quản lý phía trái là `nv`? Bài đã nói đổi câu hỏi: giữ người được thống kê rồi dò những hồ sơ trỏ đến họ. `NV048` minh họa lý do cần giữ cả hồ sơ chưa quản lý ai.
- **Lý do giữ:** sử dụng lại `GROUP BY` của bài 3.2 và `COUNT(cột)` của bài 3.1; không cần định nghĩa lại. Phạm vi mọi trạng thái đã được ghi trước câu lệnh.
- **Đề xuất:** giữ. Không xem `NV048` là quản lý có chức danh chỉ vì bí danh của phía thống kê tên là `ql`; lời dẫn đã gọi đúng là danh sách cần thống kê.

### 8. Câu giải thích COUNT — Cần làm rõ, mức nhỏ

- **Câu gốc:** “Dùng `COUNT(nv.MaNV)` để bỏ phần bên phải NULL; `COUNT(*)` sẽ đếm cả dòng được LEFT JOIN giữ lại và cho `NV048` là `1`.” (MDX 75).
- **Tại sao/để làm gì:** hàm đếm bỏ cả phần bên phải hoặc loại một dòng, hay chỉ không đếm giá trị `NULL` của cột đang xét? Bài 3.1 trả lời rõ; riêng cách nói ở đây lỏng hơn kiến thức đã học.
- **Lý do:** câu SQL đúng, nhưng “bỏ phần bên phải” dễ gợi ý hàm đã loại dữ liệu khỏi kết quả. `COUNT(nv.MaNV)` đếm những giá trị khóa khác `NULL`, không xóa dòng mà `LEFT JOIN` giữ.
- **Sửa ngắn:** “`COUNT(nv.MaNV)` chỉ đếm mã cấp dưới khác `NULL`; `COUNT(*)` đếm cả dòng được `LEFT JOIN` giữ lại và cho `NV048` là `1`.”
- **Khối Result:** ba dòng `NV004 = 6`, `NV005 = 6`, `NV048 = 0`, `total={3}`, `mark={[3]}` phù hợp với câu lệnh và hồ sơ công ty khi đọc tĩnh. Có thể sửa câu ngay trước thành “Dòng `NV048` được đánh dấu có số `0` vì chưa có cấp dưới” để nói rõ ý của dấu tô, thay vì thêm một câu chú thích mới. Chưa xác minh số đếm bằng truy vấn.

### 9. Điều kiện trạng thái của hai vai trò — Giữ được

- **Câu gốc:** “Muốn chỉ đếm cấp dưới đang làm mà vẫn giữ số `0`, thêm `nv.TrangThai = N'Đang làm'` vào `ON`; trạng thái của người được thống kê dùng bí danh `ql` riêng.” (MDX 75).
- **Tại sao/để làm gì:** vì sao đặt điều kiện ở `ON`, và một điều kiện trạng thái có lọc được cả hai vai trò không? Bài nhắc đúng vị trí và phân biệt hai phía; cơ chế `ON`/`WHERE` đã được giải thích bằng kết quả ở bài 3.5.
- **Lý do giữ:** câu gọn nhưng đủ điều kiện cho bài tập 3. Không cần chèn thêm một truy vấn gần trùng đáp án bài tập.
- **Đề xuất:** giữ.

### 10. Giới hạn độ sâu và dẫn bài — Biên tập

- **Câu gốc:** “Kết thêm danh mục theo các bí danh đã học ở bài 3.6; truy vết toàn bộ cây quản lý cần cách mở rộng khác, không suy từ một phép kết trực tiếp này.” (MDX 77).
- **Tại sao/để làm gì:** self join này có tìm hết cấp dưới gián tiếp được không? Bài trả lời rõ là chỉ một cấp. Muốn kết thêm danh mục thì đọc bài nào? Câu dẫn hơi lệch trọng tâm của bài được trỏ.
- **Lý do:** bài 3.6 dạy kết ba bảng và kiểm độ chi tiết; bài 3.4 mới là chỗ lấy tên từ danh mục. Đây là chỉnh độ chính xác của lời dẫn, không phải lỗi self join.
- **Sửa ngắn:** “Kết thêm bảng bằng bí danh theo bài 3.6; truy vết toàn bộ cây quản lý cần cách mở rộng khác, không suy từ một phép kết trực tiếp này.” Giữ câu “Ở bài này chỉ cần…” ngay trước đó.

### 11. Câu lệnh và kết quả giải tình huống — Giữ được

- **Câu gốc:** “Chị Hạnh nhận `48` dòng; hình trích `10` dòng đầu. Dòng `NV004` được đánh dấu có mã và tên quản lý là `NULL`, vẫn có mặt.” (MDX 152).
- **Khối đã soi:** câu SQL ở 83–87, bốn cột `MaNV`, `HoTen`, `MaQuanLy`, `QuanLyTrucTiep`; mười dòng từ `NV001` đến `NV010`; `total={48}`, `mark={[4]}`.
- **Tại sao/để làm gì:** đã đủ bốn cột, giữ người không có quản lý và xếp đúng yêu cầu chưa? Đọc tĩnh câu lệnh và bảng cho thấy có. Vì sao không lấy `NV004` làm quản lý trực tiếp của `NV001`? Câu ngay sau kết quả phân biệt hai quan hệ riêng.
- **Lý do giữ:** đáp lời chị Hạnh ngay cạnh kết quả, không lặp lại cách đọc toàn bộ câu SQL. Dòng đánh dấu đúng `NV004`; hai ô `NULL` có kiểu hiển thị riêng trong HTML build.
- **Đề xuất:** giữ. Các cặp hiển thị khớp hồ sơ công ty và ví dụ đầu bài; chưa xác minh kết quả SQL thực tế.

### 12. Lời dẫn RunFlow — Cần cắt một vế lặp

- **Câu gốc:** “Sơ đồ không mô tả thứ tự đọc vật lý và không tạo bản sao bảng nguồn.” (MDX 156).
- **Tại sao/để làm gì:** sơ đồ có phải các lệnh SQL Server thực sự chạy theo thứ tự không? Vế thứ nhất trả lời đúng giới hạn cần có tại đây. Có tạo bản sao bảng không? Bài đã trả lời ở định nghĩa hai bí danh, MDX 41.
- **Lý do:** không cần lặp lại chuyện sao chép bảng; cả đoạn đã có câu về thứ tự logic, câu SELECT riêng và thứ tự trước `ORDER BY`.
- **Sửa ngắn:** “Sơ đồ không mô tả thứ tự đọc vật lý.” Giữ các điều kiện còn lại.

### 13. Bốn bước RunFlow — Giữ được về nội dung; Biên tập dẫn chứng

- **Câu gốc tiêu biểu:** “`FROM` có `48` hồ sơ. `NV001` lưu mã quản lý `NV005`; `NV004` lưu NULL.”; “`SELECT` giữ `48` dòng và `4` cột. Mã quản lý lấy từ nv.MaQuanLy, không tự thay giá trị NULL.” (MDX 168, 306).
- **Tại sao/để làm gì:** từng bước đổi gì ở các dòng? `FROM` chọn vai trò; `LEFT JOIN` tìm quản lý hoặc giữ phần không khớp; `SELECT` phân biệt tên và mã thuộc vai trò nào; `ORDER BY` xếp theo nhân viên. Các `meaning`/`detail` bắt đầu bằng đúng từ khóa, có số dòng và ví dụ để hiểu; bài đã trả lời.
- **Khối đã soi:** `query` trùng câu tình huống; bốn `focus` nằm đúng trong câu, kể cả `SELECT` xuống dòng có `\n\t`; SQL riêng của mỗi bước không chứa câu ghi. Các bảng trích mười dòng nhất quán với tổng `48`; bước `SELECT` và `ORDER BY` cùng dữ liệu là hợp lý, vì câu này không lọc hoặc tổng hợp. Không yêu cầu dựng kết quả khác chỉ để mỗi bước trông khác nhau.
- **Lý do biên tập:** các tên bảng/cột/bí danh và `NULL` ngoài backtick đang hiện chữ thường trong drawer build, trong khi các mã đã đánh dấu đúng. Component hỗ trợ code nội dòng: HTML đã có `<code>` cho các phần đặt backtick.
- **Sửa ngắn:** trong chính các chuỗi `meaning`/`detail`, đặt code cho `NhanVien`, `nv`, `ql`, `MaNV`, `MaQuanLy`, `nv.HoTen`, `ql.HoTen`, `nv.MaQuanLy`, `NULL` ở những chỗ đang dẫn chứng. Ví dụ câu thứ hai thành “`SELECT` giữ `48` dòng và `4` cột. Mã quản lý lấy từ `nv.MaQuanLy`, không tự thay giá trị `NULL`.” Không đổi component chung.

### 14. Thụt lề SQL bốn cột — Giữ được trong những phần kiểm tĩnh

- **Câu gốc:** dòng tiếp `\tql.HoTen AS [QuanLyTrucTiep]` ở `Sql`, `RunFlow.query` và SQL các bước; YAML bài tập 2 có dòng tiếp `ql.MaPB`, bài tập 3 có `AND nv.TrangThai` (MDX 84, 159, 233, 308, 383; YAML 34, 56).
- **Tại sao/để làm gì:** cùng một câu có giữ cùng thụt lề khi hiện và sao chép không? Source dùng escape tab đúng chỗ; HTML build có tab thật trong `<pre>` và `data-copy`, không thấy hai ký tự gạch chéo + t bị đưa ra cho người đọc. CSS build đặt `--sql-tab-size: 4` và áp dụng cho SQL, RunFlow, editor.
- **Lý do giữ:** các mệnh đề chính thẳng cột; dòng cột tiếp theo lùi một cấp. YAML dùng khoảng trắng trong block scalar, phần SQL thực tế lùi bốn dấu cách. `focus` và query nhất quán khi đọc chuỗi nguồn.
- **Đề xuất:** giữ. Chưa kiểm trực quan vị trí highlight khi mở drawer, chưa bấm Sao chép/dán vào editor; không báo các thao tác ấy đã đạt. Bài không có `CASE`, nên kiểm hai cấp `CASE` không áp dụng cho riêng bài này.

### 15. Hay nhầm — Giữ được về nội dung; Biên tập code

- **Câu gốc:** “**Kết MaNV với chính MaNV.** Mỗi người lại khớp chính mình, nên tên quản lý thành tên nhân viên.”; “**Đếm COUNT(*) từ phía quản lý sau LEFT JOIN.** Người không có cấp dưới vẫn có một dòng kết quả với phần bên phải NULL, nên bị đếm thành một người.” (MDX 458–461).
- **Tại sao/để làm gì:** các cách viết tưởng tương đương sẽ làm báo cáo sai thế nào? Bốn mục đều nêu hậu quả cụ thể: khớp chính mình, đảo hướng, mất người không có quản lý, đếm thừa cấp dưới. Bài đã trả lời; phần này không thành một lượt giảng lại truy vấn dài.
- **Lý do biên tập:** tên cột/từ khóa trong tiêu đề đậm và phần giải thích chưa có code; HTML hiện đúng như chữ thường ấy.
- **Sửa ngắn:** giữ nội dung, sửa thành “**Kết `MaNV` với chính `MaNV`.**”; “**Dùng `INNER JOIN` khi cần giữ mọi hồ sơ.**”; “**Đếm `COUNT(*)` từ phía quản lý sau `LEFT JOIN`.**”; phần giải thích dùng `NULL`. Không cần in đậm thêm cả hậu quả.

### 16. Ứng dụng — Giữ được; Biên tập một tên cột

- **Câu gốc:** “**Lập danh sách gửi phiếu đánh giá:** lấy mã và tên quản lý trực tiếp theo MaQuanLy hiện lưu, giữ cả hồ sơ chưa được gán quản lý để kiểm tra.” (MDX 469).
- **Tại sao/để làm gì:** học self join dùng được vào việc gì ngoài chép lại ví dụ? Ba ý cho ba việc cụ thể: danh sách gửi phiếu, số hồ sơ phụ trách và đối chiếu quan hệ nhân sự. Điều kiện hiện lưu, trạng thái riêng và trực tiếp được nêu; bài không hứa tự tìm người quản lý đúng nghiệp vụ chỉ nhờ mã hợp lệ.
- **Lý do giữ:** đủ ba ứng dụng trong phạm vi đã giải thích, có mục đích rõ, không phải lời khuyên chung về chuẩn bị file hoặc nhập dữ liệu.
- **Sửa ngắn:** đổi riêng “theo MaQuanLy hiện lưu” thành “theo `MaQuanLy` hiện lưu”. Giữ hai ý sau.

### 17. Ghi nhớ, lời dẫn bài tập và tự kiểm tra — Giữ được về nội dung; Biên tập code

- **Câu gốc:** “Gọi tên hai vai trò trước khi viết điều kiện. Bộ chấm so giá trị, vị trí cột và thứ tự dòng; không bắt buộc bí danh `nv`, `ql` hoặc một cú pháp duy nhất.” (MDX 486).
- **Tại sao/để làm gì:** cần nhớ tên `nv`/`ql` hay hiểu vai trò; đáp án khác cú pháp có được chấp nhận không? Lời dẫn trả lời rõ. Ba câu tự kiểm tra lần lượt kiểm hướng dò, lý do `LEFT JOIN` và đếm cấp dưới bằng khóa; bao phủ nội dung đã dạy.
- **Khối Memo:** bốn hàng đúng với Excel và SQL; HTML đã tự bọc cột SQL bằng `<code>`. Không đề nghị chèn backtick vào chuỗi Memo vì có thể lộ ký tự không mong muốn.
- **Câu gốc cần biên tập:** “Lấy MaQuanLy của NV001 là NV005 để dò vào MaNV của vai trò quản lý. Không dò lại mã NV001.” (MDX 495); các summary và đáp án ở 493–509 cũng đang có mã/từ khóa chữ thường.
- **Sửa ngắn:** “Lấy `MaQuanLy` của `NV001` là `NV005` để dò vào `MaNV` của vai trò quản lý. Không dò lại mã `NV001`.” Tương tự đánh dấu `LEFT JOIN`, `INNER JOIN`, `COUNT(*)`, `COUNT(nv.MaNV)`, `NULL`, các mã và số `0` trong đáp án; trong `<summary>` dùng `<code>...</code>`. Không thêm câu hỏi chỉ để tăng số lượng.

## Rà ba bài tập

### 18. Bài 3-7-1 — Giữ được

- **Câu gốc:** “Lấy mọi hồ sơ có MaQuanLy bằng NV007, không lọc trạng thái. Kết về NhanVien để lấy tên quản lý trực tiếp. Trả MaNV, HoTen của người được quản lý, rồi HoTenQuanLy.” (YAML 6–8).
- **Tại sao/để làm gì:** đang tìm người quản lý của `NV007` hay những người `NV007` quản lý? Điều kiện `MaQuanLy` và tên “Nhóm do NV007 quản lý trực tiếp” trả lời rõ. “Không lấy những người chỉ thuộc cấp gián tiếp” loại cách diễn giải cả cây.
- **Lý do giữ:** đáp án lọc trên vai trò nhân viên, lấy tên quản lý từ vai trò còn lại, trả đúng ba vị trí cột và xếp mã nhân viên tăng dần. `LEFT JOIN` hợp lý; với quan hệ hợp lệ hiện có, cách `INNER JOIN` tương đương cũng không tự thành lỗi, đúng lời dẫn chấm theo kết quả.
- **Đề xuất:** giữ. Chưa chạy đáp án hoặc bộ chấm; không khẳng định số dòng thực tế.

### 19. Bài 3-7-2 — Cần làm rõ, ưu tiên cao nhất của lượt này

- **Câu gốc:** “Trả MaNV, HoTen của nhân viên, rồi MaQuanLy và MaPhongQuanLy lấy từ vai trò quản lý.” (YAML 25).
- **Tại sao/để làm gì:** `MaQuanLy` ở đây là tên cột nguồn `ql.MaQuanLy`, hay tên cột kết quả chứa mã của chính quản lý? Bài giảng cho thấy hai giá trị có thể chỉ hai cấp khác nhau, nhưng câu đề hiện chưa nói rõ.
- **Lý do:** cụm “MaQuanLy ... lấy từ vai trò quản lý” có thể khiến người học viết `ql.MaQuanLy`, tức mã của người quản lý cấp tiếp theo. Đáp án thực tế là `ql.MaNV AS [MaQuanLy]`. Đây là mơ hồ trong yêu cầu, không phải lỗi của câu đáp án.
- **Sửa ngắn:** “Trả MaNV, HoTen của nhân viên; mã nhân viên của chính người quản lý đặt tên MaQuanLy; mã phòng MaPB của người đó đặt tên MaPhongQuanLy.” Giữ các câu về mọi trạng thái, SQL `NULL` và xếp mã.
- **Phần giữ được:** phạm vi `nv.MaPB = 'NS'` khác cột lấy ra `ql.MaPB`, giúp kiểm đúng hai vai trò; đáp án `ql.MaNV`, `ql.MaPB` nhất quán với ý định đó. Không đổi thành `ql.MaQuanLy` để chiều câu đề mơ hồ.
- **Giới hạn bài kiểm:** theo hồ sơ công ty, các hồ sơ NS đều có quản lý. Vì vậy riêng dữ liệu hiện có chưa làm yêu cầu “giữ cả khi MaQuanLy là NULL” tạo khác biệt kết quả với `INNER JOIN`; không dùng việc qua bộ chấm để kết luận người học đã chứng minh được phần giữ `NULL`. Điều này không làm hỏng mục tiêu chính là phân biệt cột hai vai trò; chưa cần đổi phạm vi bài chỉ để tạo thêm ca ngoại lệ.

### 20. Bài 3-7-3 — Giữ được

- **Câu gốc:** “Mỗi hồ sơ TrangThai bằng chuỗi Unicode Đang làm là một dòng báo cáo, dù chưa quản lý ai. Đếm hồ sơ cấp dưới trực tiếp cũng đang làm theo MaQuanLy.”; “Trạng thái phải xét riêng cho hai vai trò; không đếm dòng NULL do LEFT JOIN giữ lại.” (YAML 44–47).
- **Tại sao/để làm gì:** báo cáo chỉ có người mang chức danh quản lý hay mọi hồ sơ đang làm? Câu đầu đã chốt mọi hồ sơ. Vì sao cần xét trạng thái hai lần, vì sao người chưa quản lý ai nhận `0`? Đề và phần đếm trong bài trả lời đủ.
- **Lý do giữ:** đáp án đặt trạng thái cấp dưới trong `ON`, trạng thái phía được thống kê trong `WHERE`; `COUNT(nv.MaNV)` không đếm khóa `NULL`; `GROUP BY` cả mã và họ tên phù hợp bài 3.2. Chuỗi tiếng Việt có `N`, SQL xuống dòng đúng quy ước.
- **Đề xuất:** giữ. Đề có hướng dẫn trực tiếp nhưng không chép nguyên câu đáp án vào phần giảng. Chưa chạy để xác minh kết quả hoặc khả năng chấm mọi cách viết tương đương.

## Thứ tự ưu tiên

1. **Cần làm rõ:** sửa câu yêu cầu cột của bài 3-7-2 để không bị hiểu thành `ql.MaQuanLy`.
2. **Cần làm rõ, mức nhỏ:** đổi “bỏ phần bên phải NULL” thành “chỉ đếm mã cấp dưới khác NULL”. Đây là độ chính xác của lời giải, không phải lỗi SQL.
3. **Biên tập:** code cho tên bảng/cột/từ khóa còn sót ở Key, RunFlow, Hay nhầm, Ứng dụng và tự kiểm tra; nói rõ dòng đánh dấu của Result đếm cấp dưới; chỉnh lời dẫn tới bài 3.6.
4. **Cần cắt:** bỏ vế “và không tạo bản sao bảng nguồn” lặp lại trong lời dẫn RunFlow. Giữ toàn bộ lời giới hạn thứ tự logic/vật lý.

Không có đề nghị đổi số liệu dựa trên phỏng đoán; không có lỗi chắc chắn cần thay câu SQL chính. Cần người viết chạy xác minh theo quy trình của khóa học sau khi sửa, nhưng reviewer này không thực hiện bước đó theo phạm vi được giao.

## Nguồn đối chiếu và giới hạn thật

Đã đọc `AGENTS.md`, `docs/quy-uoc.md` (gồm mục 4.5), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, bài mẫu `1-1-database-la-gi.mdx`. Các bài trước dùng để đối chiếu kiến thức: `1-4-khoa-chinh-khoa-ngoai.mdx`, `2-5-null-o-trong.mdx`, `3-1-count-sum-avg.mdx`, `3-2-group-by-pivottable.mdx`, `3-4-inner-join-vlookup.mdx`, `3-5-left-join.mdx`, `3-6-ket-nhieu-bang.mdx`.

Đã đọc source toàn bài 3.7 và toàn YAML; soi cả `Excel`, hai `Sql`, hai `Result`, bốn bước `RunFlow`, `Memo`, bài tập và tự kiểm tra. Bài không có `Messages`, `LineMap`, `Ssms`, `Erd` nên không có khối thuộc các loại này để kiểm. Đọc tĩnh `dist/bai/3-7-self-join-quan-ly/index.html` và CSS được trang này tham chiếu để kiểm markup code, dấu ô/dòng, tab thật và token thụt lề. Bản build ghi thời điểm sau source được đọc; source vẫn là chuẩn của review.

Không đọc `database/HRM_Demo.sql`, spec/plan tác giả, `temp/verification` hoặc review cũ. Không kết nối DB/API, không tra web, không mở browser, không chạy câu SQL, không chạy test/build. Vì vậy các số `48`, `47`, `6`, `6`, `0`, các cặp nhân viên–quản lý và kết quả chấm chỉ được kiểm tính nhất quán với source/hồ sơ công ty; **chưa xác minh bằng thực thi**. Không kiểm được layout trực quan, tương tác drawer, clipboard, editor hoặc lỗi nền của công cụ bằng cách đọc HTML. Không báo test nào đạt hoặc thất bại. Chỉ tạo báo cáo review này; không sửa bài, bài tập hay tài liệu khác.