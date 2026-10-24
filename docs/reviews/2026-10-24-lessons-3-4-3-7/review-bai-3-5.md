# Review độc lập bài 3.5 — LEFT JOIN

Ngày: 24/10/2026. Công cụ: Codex, agent mới kế thừa model của phiên; không chỉ định model khác.

Vai đọc: Business Consultant muốn hiểu đủ SQL Server để chuyển sang BA/PM và phản biện yêu cầu dữ liệu. Tôi đọc như người học, dựa vào bài này và kiến thức đã xuất hiện ở các bài trước.

Nhận định: bài giải được tình huống, giữ đúng khung Excel/SQL gộp và phân biệt khá tốt “chưa có dòng hợp đồng trong hệ thống” với tình trạng thực tế. Chưa thấy lỗi logic SQL rõ ràng qua đọc. Những chỗ nên sửa chủ yếu là xác định rõ bước đang có `57` dòng, câu chữ về `ON`/`WHERE`, lời dẫn cho sơ đồ và định dạng dẫn chứng. Các số liệu khớp hồ sơ công ty ở mức tài liệu; tôi không chạy SQL để xác nhận chúng.

## Rà theo thứ tự bài

### 1. Mục tiêu, kiến thức trước và thời lượng

- **Câu gốc:** “bạn giữ dòng không khớp bằng LEFT JOIN và tìm đúng hồ sơ chưa có hợp đồng”; `minutes: 22`; kiến thức trước `2.5`, `3.4`.
- **Đánh giá: Giữ được.**
- **Lý do:** Mục tiêu vừa sức với nội dung: thêm cách giữ dòng vào kiến thức kết bảng, rồi dùng kiểm tra `NULL` đã học. `22` phút có cơ sở vì còn ví dụ `ON`/`WHERE`, năm bước sơ đồ và ba bài tập. Tôi không đo thời gian làm bài thực tế nên không khẳng định đây là thời lượng đã kiểm nghiệm.
- **Đề nghị:** Giữ mục tiêu và kiến thức trước; không thêm kiến thức về hiệu lực hợp đồng hay nhiều bảng vào mục tiêu bài này.

### 2. Tình huống và định nghĩa phạm vi

- **Câu gốc:** “Em tìm giúp chị những hồ sơ chưa có bất kỳ hợp đồng nào được lưu trong hệ thống”; “xét mọi hồ sơ trong `NhanVien`, không lọc trạng thái hoặc ngày vào làm”; “không phải chưa có hợp đồng còn hiệu lực tại một ngày”.
- **Đánh giá: Giữ được.**
- **Lý do:** Đã trả lời ba câu tôi cần hỏi trước khi viết: xét ai, thiếu cái gì, có xét thời điểm không. Câu chuyện tháng 10 không bị biến thành điều kiện chỉ lấy người vào tháng 10. Không hứa đây là danh sách người vi phạm hoặc thật sự chưa ký hợp đồng.
- **Đề nghị:** Giữ nguyên phạm vi. Không cần thêm mốc ngày khi yêu cầu chủ động không xét hiệu lực.

### 3. Lời dẫn Excel và hình `D3`, `D4`

- **Câu gốc:** “bạn dò mã nhân viên sang bản xuất hai cột `MaNV`, `MaHD`”; “Công thức dùng dò chính xác và hai danh sách đã được kiểm mã”; “`#N/A` còn có thể do công thức hoặc mã dò sai, nên không tự chứng minh hồ sơ thiếu.”
- **Đánh giá: Biên tập.**
- **Lý do:** Hai cột nguồn và thứ tự của chúng giải thích được số `2` trong công thức. `FALSE` đã đúng với lời dẫn dò chính xác; công thức ở `D3` dùng `A3` là nhất quán. Hai ô đánh dấu đúng là nơi xuất hiện `#N/A`. Tuy nhiên “hồ sơ thiếu” dễ được hiểu thành thiếu hồ sơ nhân viên, trong khi chính hình đã có hồ sơ nhân viên và đang kiểm thiếu hợp đồng.
- **Đề nghị:** Chỉ thay vế cuối bằng “nên không tự chứng minh hệ thống chưa lưu hợp đồng”. Nếu bản xuất ở đây có thể bị lọc, sửa ngay cụm đầu thành “bản xuất đầy đủ hai cột…”; không cần thêm một đoạn hướng dẫn kiểm file. Việc bản xuất có đầy đủ hay không chưa thể xác nhận từ hình chỉ hiện sheet nhân viên.

### 4. Định nghĩa `LEFT JOIN` và ý nghĩa `NULL`

- **Câu gốc:** “**`LEFT JOIN`** là phép **kết bảng** giữ phía trái: trả mọi cặp dòng khớp theo `ON`; dòng bên trái không có cặp vẫn xuất hiện với các cột bên phải là **`NULL`**”; “không phải SQL ghi thêm hợp đồng trống vào bảng”.
- **Đánh giá: Giữ được.**
- **Lý do:** Định nghĩa đủ cả hai nhánh: có cặp và không có cặp. Cách đặt `NhanVien AS nv` bên trái trả lời tại sao hồ sơ nhân viên được giữ. Giải thích `NULL` xuất hiện trong kết quả, không làm đổi bảng nguồn, là cần thiết với người vừa học `NULL` là dữ liệu chưa có giá trị. Khái niệm mới được in đậm có chọn lọc.
- **Đề nghị:** Giữ bản source hiện tại. HTML build tôi đọc còn câu định nghĩa trước khi thêm “phép kết bảng giữ phía trái”, đúng với lưu ý của lượt review; không coi chênh lệch đã được báo trước này là lỗi bài.

### 5. Tại sao chọn `MaHD`, không chọn `NgayKetThuc`

- **Câu gốc:** “`MaHD` là khóa chính, không nhận `NULL` trên hợp đồng thật; vì vậy giá trị `NULL` ở đây nhận diện dòng không khớp”; “hợp đồng không xác định thời hạn cũng có ngày kết thúc `NULL`”.
- **Đánh giá: Giữ được.**
- **Lý do:** Đây là phần giải thích quan trọng nhất cho cách tìm thiếu. Bài không bảo cứ cột bên phải nào `NULL` cũng chứng minh không có dòng. Phân biệt khóa không nhận `NULL` với cột nghiệp vụ có thể nhận `NULL` rõ và có ví dụ. Dẫn lại bài 2.5 cho `= NULL` giúp tránh giảng lại `UNKNOWN`.
- **Đề nghị:** Giữ. Tôi chưa xác nhận khai báo khóa của database; đánh giá này dựa trên cấu trúc bài cung cấp và ý nghĩa khóa chính đã học, không phải kết quả kiểm schema trực tiếp.

### 6. VLOOKUP trả một hợp đồng, SQL trả nhiều cặp và con số `57`

- **Câu gốc:** “VLOOKUP thông thường chỉ trả hợp đồng khớp đầu tiên; hình chọn `HD2021-001` trong bản xuất xếp mã hợp đồng tăng dần. SQL trả đủ các cặp: `NV021` có `3` hợp đồng nên hiện `3` lần. Toàn bộ `55` dòng hợp đồng cùng `2` hồ sơ không khớp tạo `57` dòng…”
- **Đánh giá: Cần làm rõ.**
- **Lý do:** Cách giải thích VLOOKUP và số cặp hợp lý, khớp bài 3.4 và hồ sơ công ty. Nhưng ngay trước đó tôi vừa được bảo dùng `WHERE hd.MaHD IS NULL`; chưa có câu đầy đủ ở đây nên “SQL trả đủ các cặp” có thể khiến tôi tưởng kết quả cần nộp còn chứa `NV021` và `57` dòng. Sơ đồ về sau mới làm rõ đó là bước trước lọc.
- **Đề nghị:** Thay “SQL trả đủ các cặp” bằng “Trước khi lọc `WHERE`, `LEFT JOIN` trả đủ các cặp”. Một vế này đủ xác định bước; giữ phép giải thích `55 + 2 = 57`, không thêm đoạn đếm khác.

### 7. Ví dụ đổi phạm vi sang hợp đồng thử việc

- **Câu gốc:** “Nếu phạm vi đổi thành đối chiếu **hợp đồng thử việc**, điều kiện loại hợp đồng đặt ở `ON` để phía nhân viên vẫn được giữ”; truy vấn có `AND hd.LoaiHD = N'Thử việc'` trong `ON`, giới hạn hai mã ở `WHERE`.
- **Đánh giá: Giữ được.**
- **Lý do:** Tách được hai loại điều kiện: hợp đồng nào được khớp và hồ sơ nào cần đưa vào báo cáo. Ví dụ hai mã ngắn, không trộn thêm kiểm hiệu lực. Chuỗi tiếng Việt có `N`. `IN` đã được giải thích ở bài 2.3, bí danh đã có ở 3.4 nên không có thuật ngữ nền tảng bị bỏ qua ở đây.
- **Đề nghị:** Giữ. Không cần đưa thêm truy vấn sai đầy đủ; đoạn sau đã nêu hậu quả cụ thể khi chuyển đúng biểu thức này xuống `WHERE`. Các mã hợp đồng ở kết quả chưa được tôi xác nhận bằng database.

### 8. Giải thích kết quả ví dụ `ON`/`WHERE`

- **Câu gốc:** “`NV047` vẫn còn với `MaHD` là `NULL`. Nếu đưa `hd.LoaiHD = N'Thử việc'` xuống `WHERE` cùng phạm vi hai mã, dòng `NV047` không thỏa điều kiện và bị loại, chỉ còn `1` dòng”; “Không phải mọi điều kiện đều phải chuyển vào `ON`…”
- **Đánh giá: Giữ được.**
- **Lý do:** Kết quả có hai dòng phù hợp câu lệnh đang cho đọc; `mark={[2]}` chỉ đúng dòng `NV047` đang được giải thích. Câu tiếp theo trả lời ngay câu hỏi “vậy cứ chuyển mọi điều kiện vào `ON`?” bằng ví dụ lọc phòng bên trái. Bài 2.5 đã cho biết phép so sánh với `NULL` không làm `WHERE` nhận dòng, nên không cần thêm một đoạn về logic ba giá trị.
- **Đề nghị:** Giữ lời giải. Nếu muốn tuân thủ sát yêu cầu chú thích dấu hình, chỉ thay “`NV047` vẫn còn” bằng “Dòng `NV047` được đánh dấu vẫn còn”; không cần thêm câu.

### 9. Câu dẫn sang bài 3.6

- **Câu gốc:** “Ở bài này chỉ cần giữ dòng không khớp và chọn khóa kiểm `NULL`; điều kiện ngày và kiểm nhiều hợp đồng ứng viên học ở bài 3.6.”
- **Đánh giá: Biên tập.**
- **Lý do:** Có câu chốt phạm vi và chỉ đúng bài học tiếp. Riêng “hợp đồng ứng viên” chưa có nghĩa được giải thích; trong ngữ cảnh nhân sự, người học có thể đọc “ứng viên” thành người tuyển dụng.
- **Đề nghị:** Thay riêng “kiểm nhiều hợp đồng ứng viên” bằng “kiểm nhiều hợp đồng cùng khớp”. Không đưa nội dung ngày hiệu lực của bài 3.6 về đây.

### 10. Câu lệnh chính và câu trả lời cho chị Hạnh

- **Câu gốc:** Truy vấn `LEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV` rồi `WHERE hd.MaHD IS NULL`, xếp `nv.MaNV ASC`; “Chị Hạnh nhận `2` hồ sơ: `NV047` và `NV048`…”; “Cần đối chiếu hồ sơ giấy hoặc thông tin nhập liệu trước khi kết luận tình trạng thực tế.”
- **Đánh giá: Giữ được.**
- **Lý do:** Câu lệnh đúng với phạm vi đã chốt: không có điều kiện loại hợp đồng, ngày hoặc trạng thái. Bốn cột đúng thứ tự chị Hạnh xin. Kết quả hiển thị hai hồ sơ và ngày vào làm khớp hồ sơ công ty. Hai dòng được đánh dấu đúng là hai hồ sơ cần trả. Lời giải nằm sát kết quả và tách được phát hiện dữ liệu với kết luận nghiệp vụ. Câu “không lọc riêng tháng 10” có tác dụng riêng vì cả hai kết quả tình cờ là người mới.
- **Đề nghị:** Giữ; không cắt lời nhắc đối chiếu giấy vì nó giải thích giới hạn sử dụng danh sách. Sự đúng đắn của kết quả chạy thực tế chưa được xác minh trong lượt này.

### 11. Lời dẫn cho sơ đồ và bảng trích

- **Câu gốc:** “`FROM` và `LEFT JOIN` chỉ trích dữ liệu để xem; các bước còn `2` dòng hiện đủ.”
- **Đánh giá: Cần làm rõ.**
- **Lý do:** Chủ ngữ đang là mệnh đề SQL, nên “chỉ trích dữ liệu” có thể bị hiểu rằng chúng chỉ đọc vài dòng, trong khi các tổng là `48` và `57`. Điều muốn nói thực ra là hình chỉ hiện một phần dữ liệu. “Các bước còn `2` dòng hiện đủ” cũng hơi khó đọc lần đầu.
- **Đề nghị:** Thay đúng câu này bằng “Hình ở hai bước đầu trích tối đa `10` dòng; từ `WHERE` hiện đủ `2` dòng.” Không thêm đoạn giải thích.

### 12. Năm bước `RunFlow`

- **Câu gốc:** Các bước `FROM` → `LEFT JOIN` → `WHERE` → `SELECT` → `ORDER BY`, tổng lần lượt `48`, `57`, `2`, `2`, `2`; “Mỗi câu `SELECT` kiểm bước là câu riêng, không phải mô tả thực thi vật lý.”
- **Đánh giá: Giữ được.**
- **Lý do:** Sơ đồ có ích: cho thấy `57` là số cặp trước khi lọc, vì sao `NV021` lặp, và vì sao khóa hợp đồng có thể dùng lọc mà không phải đưa vào báo cáo. Mỗi drawer bắt đầu giải thích từ khóa của bước và có tổng cụ thể. Bảng `FROM` trích `10` dòng; bảng kết trích `10` dòng, gồm ba hợp đồng của `NV021` và hai hồ sơ không khớp; các bước còn lại hiện đủ hai dòng. Đã báo thứ tự trước `ORDER BY` không được bảo đảm. Không có căn cứ từ việc bảng trích không theo mã để kết luận nó sai.
- **Đề nghị:** Giữ cấu trúc và số bước. Không thêm `DISTINCT` để chữa số dòng nhân lên: đây là những cặp khác hợp đồng, không phải lỗi trùng cần xóa. Không yêu cầu thêm ERD, `LineMap`, `Messages` hoặc SSMS cho đủ khối; bài này không có các khối đó.

### 13. Tên bước và định dạng code trong drawer

- **Câu gốc:** Dòng 114: “`FROM` lấy NhanVien…”; dòng 187: “khớp MaNV… cột phải NULL”; dòng 188: “khóa hợp đồng NULL”; dòng 270: “Giữ khóa hợp đồng không khớp.”; dòng 272–273 và 303 dùng `MaHD`, `NULL` ở dạng chữ thường trong lời giải.
- **Đánh giá: Biên tập.**
- **Lý do:** HTML build cho thấy các tên không bọc code vẫn hiển thị như chữ giải thích, trong khi các từ khóa và số đã bọc code có nền. Không phải lỗi tính toán nhưng chưa nhất quán quy ước dẫn chứng. Tên bước `WHERE` còn gọi thứ được giữ là “khóa”; báo cáo đang giữ hồ sơ có phần bên phải không khớp.
- **Đề nghị:** Đổi tiêu đề bước thành “Giữ hồ sơ không có hợp đồng khớp.”; bọc code cho `NhanVien` ở 114, `MaNV`/`NULL` ở 187, `NULL` ở 188, `MaHD`/`NULL` ở 272–273, `MaHD` ở 303. Drawer đã hỗ trợ cách bọc code này, thể hiện qua các từ khóa được bọc sẵn. Không bọc lại dữ liệu trong bảng kết quả.

### 14. SQL xuống dòng và thụt lề

- **Câu gốc:** `\tAND hd.LoaiHD = N'Thử việc'` trong ví dụ phụ; `\tnv.MaPB, nv.NgayVaoLam` trong các câu kiểm bước `LEFT JOIN`, `WHERE`.
- **Đánh giá: Giữ được trong phạm vi đọc source/HTML.**
- **Lý do:** Thuộc tính MDX dùng escape `\t` đúng yêu cầu; các khối code thường trong HTML build chứa ký tự tab thật ở các dòng này. CSS build có `--sql-tab-size: 4`. Mệnh đề chính thẳng cột; các câu một dòng danh sách cột không buộc phải xuống dòng. Trong HTML, phần câu query được highlight chia thành các span/mark kiểu block; không kết luận mất dòng chỉ từ bản text đã bỏ thẻ.
- **Đề nghị:** Giữ. Chưa kiểm ảnh render, thao tác drawer, nút sao chép/dán hoặc editor vì lượt này không dùng browser. Bài không có `CASE` nên không có căn cứ kiểm thụt hai cấp ngay tại bài này. Không ghi đã qua toàn bộ checklist thụt lề của quy ước.

### 15. Hay nhầm: điều kiện nào làm mất dòng

- **Câu gốc:** “**Lọc loại hợp đồng ở WHERE khi vẫn muốn giữ hồ sơ không khớp.** Điều kiện không nhận các dòng NULL và làm mất hồ sơ cần đối chiếu.”
- **Đánh giá: Cần làm rõ.**
- **Lý do:** Đọc trong ví dụ phía trên thì tôi hiểu đây là phép bằng `hd.LoaiHD = N'Thử việc'` và lời giải đúng. Nhưng đọc riêng ở mục lỗi, “Điều kiện không nhận các dòng NULL” hơi rộng: câu chính của chính bài đang dùng `WHERE … IS NULL` để nhận các dòng ấy. Không nên để người học nhớ thành mọi điều kiện ở `WHERE` đều loại `NULL`.
- **Đề nghị:** Thay câu hậu quả bằng “`hd.LoaiHD = N'Thử việc'` ở `WHERE` loại dòng không khớp và làm mất hồ sơ cần đối chiếu.” Đây là làm cụ thể câu đang có, không thêm ngoại lệ hoặc dạy thêm các cách viết khác.

### 16. Hay nhầm: ba mục còn lại

- **Câu gốc:** Kiểm `NgayKetThuc IS NULL`; dùng `INNER JOIN` rồi tìm khóa phải `NULL`; gọi `57` dòng thành `57` nhân viên.
- **Đánh giá: Giữ được, kèm biên tập định dạng.**
- **Lý do:** Ba lỗi có hậu quả riêng: nhận cả hợp đồng tồn tại, mất hẳn hồ sơ không có cặp, và đếm sai đối tượng. Mục `INNER JOIN` bổ sung được cách tự phản biện khi chọn phép kết. Đây là nhắc dưới dạng lỗi/hậu quả, chưa dài đến mức cần bỏ cả mục chỉ vì phần chính đã giảng cơ chế.
- **Đề nghị:** Giữ nội dung; trong câu chữ thường và chữ đậm, bọc code các từ khóa `NULL`, `WHERE`, `INNER JOIN` và hai số `57` ở mục 4. Không bôi đậm thêm toàn bộ câu giải thích.

### 17. Ứng dụng

- **Câu gốc:** Hai ý “Tìm hồ sơ chưa có dữ liệu liên quan”, “Đối chiếu kỳ lương”; ý thứ ba: “**Báo cáo cả trường hợp chưa có giao dịch:** dùng LEFT JOIN để hồ sơ gốc vẫn xuất hiện, đồng thời giải thích NULL là phần không khớp của kết quả.”
- **Đánh giá: Cần cắt ý thứ ba; giữ hai ý đầu.**
- **Lý do:** Hai ý đầu có đối tượng và mục đích công việc rõ, và phạm vi kỳ trong `ON` là áp dụng trực tiếp từ ví dụ loại hợp đồng. Ý thứ ba chủ yếu nói lại định nghĩa, chưa nêu báo cáo nào hoặc người nhận dùng để làm gì; “giao dịch” cũng rộng hơn hợp đồng/lương đang học. Cắt nó vẫn còn hai ứng dụng, đúng khung 2–4 ý.
- **Đề nghị:** Bỏ nguyên gạch đầu dòng thứ ba, không thay bằng ví dụ mới. Hai ý đầu không hứa hệ thống tự bổ sung hợp đồng hoặc tự xác nhận thiếu lương; giữ được.

### 18. Ghi nhớ

- **Câu gốc:** Bốn dòng `Memo`, gồm giữ danh sách gốc, cột phải `NULL`, kiểm khóa không nhận `NULL`, phân biệt `ON`/`WHERE`.
- **Đánh giá: Giữ được.**
- **Lý do:** Phủ đúng các điểm chính và đối chiếu Excel bằng hành động dễ nhớ. Lặp ý ở đây phục vụ ôn tập, được quy ước cho phép. Câu điều kiện ở dòng cuối không nói mọi điều kiện đều phải đặt vào `ON`.
- **Đề nghị:** Giữ. Không tự chèn backtick vào chuỗi `Memo`: chưa xác nhận component này hỗ trợ Markdown nội dòng; bản hiện tại không lộ backtick cho người học.

### 19. Ba bài tập

- **Câu gốc:** `3-5-1` xét mọi hồ sơ mang `IT`, không có bất kỳ hợp đồng nào; `3-5-2` không có dòng `BangLuong` kỳ `2026-09`, dù có kỳ khác; `3-5-3` lấy mỗi hợp đồng đang lưu và vẫn giữ người không có hợp đồng.
- **Đánh giá: Giữ được, kèm một biên tập nhỏ ở tiêu đề bài 2.**
- **Lý do:** Ba đề không buộc một kiểu cú pháp và kiểm ba việc khác nhau: kết hợp lọc bảng trái với thiếu ở phải, thiếu trong một phạm vi kỳ, và giữ đầy đủ các cặp. Đề 2 ghi rõ mọi trạng thái/ngày nên việc lấy cả người không còn làm hoặc chưa vào làm trong kỳ không phải lỗi đề. Đáp án đọc được phù hợp từng đề. `bl.MaNV IS NULL` không trái nguyên tắc chọn khóa: `MaNV` là thành phần không nhận `NULL` của khóa chính `(KyLuong, MaNV)` đã học ở 1.4/1.5; không phải cứ phải kiểm `MaHD` ở mọi bảng. Đề 3 phân biệt SQL `NULL` với chữ `NULL` rõ ràng.
- **Đề nghị:** Có thể đổi tiêu đề “Chưa có bảng lương tháng 9” thành “Chưa có dòng lương tháng 9” để đúng đối tượng thiếu, giữ prompt. Không đổi đáp án hay đề 1 chỉ vì nó xếp ngày mà có thể trùng: theo hồ sơ công ty, trong phạm vi này chỉ `NV048` chưa có hợp đồng, nên chưa có vấn đề thứ tự hòa cần chữa. Tôi chưa chạy đáp án, bộ chấm hoặc kiểm việc giấu đáp án trong dist.

### 20. Tự kiểm tra

- **Câu gốc:** “Vì sao chọn MaHD để kiểm NULL thay vì NgayKetThuc?”; “LEFT JOIN có bảo đảm một dòng cho mỗi nhân viên không?”; “Muốn giữ nhân viên không có hợp đồng thử việc, đặt điều kiện loại ở đâu?”
- **Đánh giá: Cần làm rõ câu 3; Biên tập code ở cả phần này.**
- **Lý do:** Hai câu đầu và đáp án kiểm đúng cơ sở chọn khóa và nguy cơ nhân dòng. Câu 3 có thể được đọc là “liệt kê cả người không có” hoặc “chỉ lấy người không có”. Đáp án hiện tại lại dùng “nếu chỉ cần…” nên không chốt người học đang phải trả lời mục tiêu nào. Chưa có lỗi SQL trong đáp án, nhưng câu tự kiểm chưa dứt khoát. Tên cột và từ khóa ở câu hỏi/đáp án đang để dạng chữ thường, khác chuẩn highlight của phần giảng.
- **Đề nghị:** Đổi câu 3 thành “Muốn chỉ lấy hồ sơ chưa có hợp đồng thử việc, đặt hai điều kiện nào ở đâu?”; đáp án một câu: “Đặt `hd.LoaiHD = N'Thử việc'` trong `ON`, rồi dùng `WHERE hd.MaHD IS NULL` để chỉ giữ hồ sơ không có cặp phù hợp.” Ở câu 1 dùng `<code>MaHD</code>`, `<code>NULL</code>`, `<code>NgayKetThuc</code>` trong `summary`; đáp án bọc code các tên tương ứng. Bọc code `LEFT JOIN` trong câu 2 và `NULL` trong đáp án. Không cần thêm câu tự kiểm thứ tư: bộ hiện có đã kiểm các mục tiêu chính.

## Các câu hỏi “tại sao, để làm gì” khi học

| Câu hỏi tôi tự đặt | Bài đã trả lời chưa? |
|---|---|
| Tại sao tháng 10 mà không lọc riêng người mới? | Có. Yêu cầu xét mọi hồ sơ; kết quả tình cờ là hai người mới được nói ngay cạnh kết quả. |
| “Chưa có” nghĩa là chưa từng có dòng hay không còn hiệu lực? | Có. Giả định đầu bài phân biệt rõ; trước truy vấn chính còn nhắc không lọc loại/ngày. |
| Tại sao lấy `NhanVien` bên trái? | Có. Để giữ hồ sơ làm danh sách gốc khi không tìm được hợp đồng. |
| `NULL` xuất hiện ở đây có làm bẩn bảng hợp đồng không? | Có. Bài giải thích đó là phần không khớp của kết quả, không ghi thêm dòng nguồn. |
| Tại sao kiểm `MaHD` đáng tin hơn `NgayKetThuc`? | Có. Khóa không nhận `NULL`, còn ngày kết thúc có thể `NULL` trên hợp đồng thật. |
| Tại sao không viết `= NULL`? | Có, bằng dẫn chiếu hợp lý sang 2.5; bài trước đã giải thích `UNKNOWN` và `WHERE` chỉ giữ điều kiện đúng. |
| Tại sao VLOOKUP thấy một mà SQL có ba hợp đồng của cùng mã? | Có. Khớp đầu tiên so với mỗi cặp khớp; còn giải thích thứ tự bản xuất trong hình. |
| Tại sao `48` hồ sơ thành `57` dòng? Có phải `57` nhân viên không? | Có. Có `55` dòng hợp đồng và hai hồ sơ không khớp; cần thêm vế “trước `WHERE`” ngay lần nêu đầu để khỏi hiểu nhầm bước. |
| Tại sao loại hợp đồng ở `ON` lại giữ được người không có hợp đồng thử việc? | Có. `ON` giới hạn cặp được phép khớp; dòng trái không có cặp vẫn được giữ. |
| Tại sao chuyển điều kiện ấy xuống `WHERE` làm mất `NV047`? | Có. Bài nêu đúng dòng mất và còn một dòng; cơ chế so sánh `NULL` có ở 2.5. Mục Hay nhầm nên gọi tên biểu thức cụ thể. |
| Có phải mọi điều kiện phải đưa vào `ON`? | Có. Ví dụ lọc phòng bên trái trả lời điều này ngay sau ví dụ phụ. |
| Các hình bước đầu có chỉ đọc `10` dòng không? | Chưa rõ ở câu dẫn. Bảng/tổng nói `48` và `57`, nhưng câu “`FROM` và `LEFT JOIN` chỉ trích” đặt sai chủ ngữ; cần sửa như mục 11. |
| Tại sao không đưa `MaHD` ra báo cáo khi dùng nó để lọc? | Có. Bước `SELECT` giải thích chỉ cần gửi bốn cột nhân viên; `MaHD` chỉ phục vụ lọc. |
| Tại sao phải `ORDER BY` nếu hình đang theo mã? | Có. Đã nhắc thứ tự trước bước ấy có thể khác hình. |
| Tìm ra hai dòng rồi có kết luận người lao động thật sự chưa ký không? | Có. Phải đối chiếu giấy hoặc nhập liệu, bài không giao quyết định nghiệp vụ cho SQL. |
| Nếu kiểm lương một kỳ, làm sao tránh hiểu “không có kỳ này” thành “chưa từng có lương”? | Có. Ứng dụng nói giới hạn kỳ trong `ON`; bài tập 2 nói rõ dù có thể có kỳ khác. |
| Câu tự kiểm 3 muốn giữ cả người không có thử việc hay chỉ lấy họ? | Chưa chốt ngay ở câu hỏi; đáp án phân nhánh. Nên chọn một mục tiêu như đề nghị ở mục 20. |

## Độ dài, ưu tiên sửa và giới hạn

- **Ưu tiên làm rõ:** (1) nêu `57` dòng là trước `WHERE` ở mục 6; (2) sửa chủ ngữ câu nói hình trích ở mục 11; (3) gọi đúng điều kiện làm mất dòng trong Hay nhầm ở mục 15; (4) chốt nghĩa câu tự kiểm 3 ở mục 20. Đây là các chỗ người học có thể hiểu sai; không phải phát hiện truy vấn đã cho đang sai.
- **Biên tập sau đó:** “hồ sơ thiếu”, “hợp đồng ứng viên”, tên bước `WHERE`, code trong drawer/Hay nhầm/tự kiểm, tiêu đề bài tập 2. Các đề nghị thay ngay câu/cụm đang có, không tăng khối lượng lý thuyết.
- **Cắt cụ thể:** bỏ gạch đầu dòng thứ ba của Ứng dụng như mục 17. Tôi không đề nghị cắt số `57` khỏi phần chính hoặc bỏ sơ đồ: chúng có ích để thấy phép kết có thể tăng số dòng. Không đề nghị quay lại hai phần Excel/SQL hoặc thêm mục trả lời chị Hạnh riêng.
- **Độ dài chung:** bốn tiểu mục trong phần chính là hợp lý. Các đoạn giảng ngắn, không thấy một đoạn văn kéo dài quá mức hoặc một phần ngoài phạm vi chiếm ưu thế. Phần dài trên source chủ yếu là các mảng dữ liệu của sơ đồ, không thể lấy số dòng MDX làm thời gian đọc.

Nguồn đã đối chiếu:

- `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`.
- Toàn bộ `src/content/lessons/3-5-left-join.mdx` và `src/content/exercises/3-5-left-join.yaml`.
- `src/content/lessons/1-1-database-la-gi.mdx` làm chuẩn trình bày; toàn bài `3-4-inner-join-vlookup.mdx`; phần liên quan của `2-5-null-o-trong.mdx`, `1-4-khoa-chinh-khoa-ngoai.mdx`, `1-5-doc-so-do-erd.mdx`, `2-2-where-loc-nhu-autofilter.mdx`, `2-3-and-or-in-between-like.mdx` để kiểm kiến thức đã có.
- HTML build `dist/bai/3-5-left-join/index.html`, gồm text và dữ liệu có sẵn của Excel, hai Result và năm drawer RunFlow; CSS đi kèm cho tab size và cách hiển thị span/mark trong query highlight. Không có ERD, `LineMap`, `Messages` hoặc SSMS trong bài 3.5 để review.

Giới hạn: không đọc seed, thư mục verification, spec/plan tác giả hay report trước; không tra web, kết nối DB/API, dùng browser hoặc chạy SQL. Không chạy test/build lại vì đây là lượt học thử chỉ ghi report. Chưa xác nhận số liệu chạy thực tế, khai báo schema thực tế, thao tác sao chép/dán, hành vi tương tác, kết quả bộ chấm và bố cục nhìn bằng mắt trên trình duyệt. Không báo đạt những kiểm tra đó. Chỉ tạo report này; không sửa source, test hoặc tài liệu tác giả.
