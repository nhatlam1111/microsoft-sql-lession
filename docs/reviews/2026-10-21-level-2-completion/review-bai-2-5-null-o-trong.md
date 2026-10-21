# Review độc lập bài 2.5 — NULL: ô trống không phải số 0

- Công cụ: Codex; model kế thừa model của phiên, không chỉ định hay đoán tên model.
- Vai đọc: Business Consultant khó tính, học để hiểu và phản biện yêu cầu dữ liệu khi chuyển sang BA/PM.
- Phạm vi: toàn bộ `src/content/lessons/2-5-null-o-trong.mdx`, `src/content/exercises/2-5-null-o-trong.yaml`, HTML tĩnh bản build mới của bài và ba trang bài tập.
- Đã đọc brief, `AGENTS.md`, quy ước, template, hồ sơ công ty, bài 1.1 đã duyệt; đối chiếu kiến thức đã có ở 1.3, 1.6, 2.2, 2.3 và bài đứng trước 2.4. Đọc bối cảnh quyết định trong spec, không mở bản review cũ.
- Tổng cộng **27 mục**: **1 Cần sửa, 1 Cần cắt, 1 Biên tập, 24 Giữ được**. Không tìm thấy lỗi kiến thức chắc chắn qua các nguồn được phép đọc; có một lỗ hổng thực chất ở khả năng kiểm mục tiêu của bài tập 2.

## Rà theo thứ tự bài

### 01. Mục tiêu, phần tóm tắt và thời lượng — Giữ được

**Câu gốc:** “bạn phân biệt được NULL với chuỗi rỗng, dấu cách và số 0, lọc hồ sơ có hoặc không có giá trị, và chọn cách hiển thị giá trị thiếu”; `minutes: 25`.

**Tại sao/để làm gì, bài đã trả lời chưa?** Người học cần biết mình sẽ làm được gì ngoài học thêm từ khóa. Bài trả lời bằng ba việc rõ ràng: nhận diện giá trị thiếu, lọc, trình bày. Phần tóm tắt báo trước `ISNULL`, `UNKNOWN` và phép cộng nên các ý này không xuất hiện bất ngờ.

**Lý do/đề xuất:** Khối lượng có cả giải thích, sơ đồ và ba bài tập; 25 phút là ước lượng hợp lý trên mặt nội dung. Chưa có phiên học thử được bấm giờ để xác nhận thời lượng thực tế. Giữ mục tiêu và thời lượng.

### 02. Tin nhắn của chị Hạnh — Giữ được

**Câu gốc:** “Lấy tất cả các phòng, kể cả người đã nghỉ nếu có. Chị cần mã nhân viên, họ tên, mã phòng và email; chỗ email thiếu thì hiện ‘(chưa có)’, tiêu đề tiếng Việt và xếp mã tăng dần.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Tìm người thiếu email để nhắc bổ sung; cần biết có loại người đã nghỉ hay không và gửi những cột nào. Tin nhắn trả lời đủ phạm vi, đầu ra, nhãn và thứ tự.

**Lý do/đề xuất:** Yêu cầu có ích và đủ cụ thể để kiểm câu lệnh. Nhân vật, tháng của câu chuyện và cách xưng hô khớp hồ sơ. Giữ được.

### 03. Phạm vi và câu chốt — Giữ được

**Câu gốc:** “Yêu cầu này chỉ xét trường hợp `Email` là `NULL`; không kiểm địa chỉ có đúng định dạng hay còn sử dụng được không.”; “Lọc theo giá trị đang lưu, rồi trình bày phần thiếu bằng nhãn dễ đọc.”

**Tại sao/để làm gì, bài đã trả lời chưa?** “Thiếu email” có gồm chuỗi rỗng, sai định dạng hay tài khoản ngừng dùng không? Bài đã chốt rõ chỉ xét `NULL`, tránh để câu lệnh trả lời một yêu cầu rộng hơn khả năng của nó.

**Lý do/đề xuất:** Câu chốt gắn được hai thao tác sẽ thấy trong sơ đồ. Không cần thêm một đoạn về chất lượng dữ liệu ở đầu bài.

### 04. Excel và hai ô được đánh dấu — Giữ được

**Câu gốc:** “Hình minh họa bản xuất thu gọn bốn hồ sơ, quy ước email `NULL` được xuất thành ô trống. Hai ô `D3`, `D4` được đánh dấu là chỗ thiếu email”.

**Tại sao/để làm gì, bài đã trả lời chưa?** Vì sao nhìn một ô Excel trống chưa kết luận được đó là `NULL`? Bài đã nói rõ quy ước xuất của hình và giới hạn khi nhìn file khác.

**Lý do/đề xuất:** `D3` thuộc `NV044`, `D4` thuộc `NV045`, đúng hai hồ sơ thiếu email trong hồ sơ công ty. Đây là bản xuất thu gọn chưa lọc, nên số dòng 1–5 liền nhau không mâu thuẫn. HTML mới có đúng hai ô `xl-mark`; chưa xác nhận màu/độ rõ bằng trình duyệt. Không cần bổ sung `rowNumbers` nhảy cóc cho hình này.

### 05. Định nghĩa và ý nghĩa nghiệp vụ của NULL — Giữ được

**Câu gốc:** “**`NULL`** biểu thị chưa có giá trị xác định, có thể do chưa biết, chưa nhập hoặc không áp dụng”; “Ý nghĩa sau phải dựa vào quy ước dữ liệu, không suy từ chữ `NULL`.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Vì sao thiếu email là việc cần bổ sung nhưng thiếu ngày nghỉ việc chưa chắc là lỗi? Bài trả lời bằng hai ngữ cảnh và chỉ rõ cần quy ước để hiểu nghĩa.

**Lý do/đề xuất:** Phân biệt được trạng thái lưu trữ với lý do nghiệp vụ; không hứa SQL Server tự phân biệt nguyên nhân. Ý nghĩa `NgayNghiViec` khớp hồ sơ công ty và bài 1.3. Giữ.

### 06. Bảng NULL, 0, chuỗi rỗng, dấu cách và chữ NULL — Giữ được

**Câu gốc:** “`''` — Có chuỗi không chứa ký tự nào”; “`' '` — Có chuỗi chứa một dấu cách”; “Chuỗi chữ `'NULL'` cũng là văn bản, không phải `NULL`.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Những thứ cùng trông như ô trống có cùng nghĩa không? Bảng đã tách đúng câu hỏi về giá trị đang lưu; số `0` cũng được gọi rõ là có giá trị số.

**Lý do/đề xuất:** Dấu nháy và ô chứa một dấu cách có trong HTML tĩnh mới; phần code giữ cách viết cụ thể. Bài chưa dạy phép so sánh chuỗi rỗng với chuỗi dấu cách nên không suy thành một khẳng định về mọi quy tắc so sánh chuỗi. Không cần mở rộng chủ đề đó ở đây.

### 07. NOT NULL không chứng nhận nhập đầy đủ — Giữ được

**Câu gốc:** “Cột chữ có `NOT NULL` vẫn có thể chứa chuỗi rỗng hoặc dấu cách nếu không có luật khác, như đã gặp ở bài 1.3.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Vì sao hệ thống bắt buộc nhập mà vẫn có thể chưa có nội dung dùng được? Câu trả lời đã phân biệt luật không nhận `NULL` với luật kiểm nội dung.

**Lý do/đề xuất:** Điều kiện “cột chữ” và “nếu không có luật khác” tránh tuyệt đối hóa. Dẫn bài 1.3 đúng nội dung đã học; không cần giảng lại import.

### 08. IS NULL, IS NOT NULL và đoạn SQL đọc riêng — Giữ được

**Câu gốc:** “**`IS NULL`** kiểm tra giá trị có phải `NULL` không; **`IS NOT NULL`** kiểm tra điều ngược lại”; `Email IS NOT NULL`.

**Tại sao/để làm gì, bài đã trả lời chưa?** Dùng gì để lấy nhóm có hoặc thiếu giá trị và đặt ở đâu? Phần văn bản trả lời cả ý nghĩa lẫn vị trí sau `WHERE`.

**Lý do/đề xuất:** Đoạn trích có `copy={false}` và tiêu đề nói rõ đọc riêng, nên không dụ người mới chạy một điều kiện rời. Không cần lặp thêm một câu truy vấn đầy đủ ở đây khi tình huống đã có ngay sau phần giảng.

### 09. UNKNOWN và giữ cả email thiếu bằng OR — Giữ được

**Câu gốc:** “So sánh `Email = NULL` hoặc `Email <> NULL` cho kết quả **`UNKNOWN`** (không xác định), không phải đúng hay sai. `WHERE` chỉ giữ dòng có điều kiện đúng”; “kết hợp phép so sánh với `OR Email IS NULL` như cách dùng `OR` ở bài 2.3.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Vì sao cả cách viết bằng và khác `NULL` đều không lấy đúng nhóm? Bài giải thích bằng kết quả không xác định và điều kiện giữ dòng của `WHERE`. Muốn giữ cả phần thiếu phải nói tường minh bằng `OR`.

**Lý do/đề xuất:** Nối được với ví dụ `Email <> 'mai.tt@hrmdemo.vn'` ở bài 2.2 và quy tắc ngoặc ở 2.3; không cần mở bảng chân trị hay thêm `NOT IN` ngoài phạm vi đã duyệt. Hành vi T-SQL chưa được reviewer chạy xác nhận.

### 10. COALESCE và phân biệt lọc với hiển thị — Giữ được

**Câu gốc:** “**`COALESCE`** nhận các giá trị ứng viên và trả giá trị đầu tiên khác `NULL`, xét từ trái sang phải; nếu tất cả là `NULL` thì kết quả vẫn là `NULL`.”; “Chuỗi rỗng hoặc dấu cách không phải `NULL`, nên hàm không thay chúng.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Hàm chọn giá trị nào, và có làm mất dấu hiệu nguồn hay tự sửa mọi loại ô trống không? Bài trả lời rõ chiều xét, trường hợp còn `NULL`, trường hợp không thay và phạm vi chỉ tạo giá trị trong kết quả `SELECT`.

**Lý do/đề xuất:** Liên hệ với cột phụ `IF` đúng vai trò, không đồng nhất mọi hành vi Excel với SQL. Ví dụ hai đầu vào đủ dùng cho tình huống; không cần ép thêm ví dụ nhiều nguồn dự phòng chỉ để minh họa định nghĩa tổng quát.

### 11. ISNULL, độ dài và Unicode — Giữ được, cần xác minh kỹ thuật ở bước kiểm của người viết

**Câu gốc:** “khi đầu vào đầu tiên là một cột, `ISNULL` giữ kiểu và độ dài của cột đó”; “Cột `Email` là `varchar(100)`; `COALESCE` ở câu tình huống ưu tiên kiểu `nvarchar` của nhãn `N'…'` khi chuyển kiểu ngầm”.

**Tại sao/để làm gì, bài đã trả lời chưa?** Hai hàm cùng thay phần thiếu thì vì sao câu mẫu chọn `COALESCE`? Bài đã nêu khác biệt tác động trực tiếp đến nhãn có dấu và gọi đúng tên cơ chế chuyển kiểu ngầm.

**Lý do/đề xuất:** Bài 1.3 đã giải thích `varchar`, `nvarchar`, Unicode và chuyển kiểu nên đây không phải một cụm thuật ngữ hoàn toàn mới. Điều kiện đầu vào là cột cũng tránh khẳng định quá rộng về `ISNULL(NULL, 0)` phía dưới. Không thấy mâu thuẫn nội bộ để kết luận sai; reviewer không được xem khai báo database hay chạy metadata nên chưa xác nhận độc lập `varchar(100)`, kiểu/độ dài kết quả hay mức mất dấu/cắt thực tế. Không đề nghị thêm bảng ưu tiên kiểu vào bài.

### 12. Phép cộng số, SELECT không đọc bảng và quyết định thay bằng 0 — Giữ được

**Câu gốc:** “Câu `SELECT` dưới đây kiểm hai phép tính trực tiếp, không đọc bảng”; `SELECT 10 + NULL AS [Giữ phần thiếu], 10 + ISNULL(NULL, 0) AS [Thay phần thiếu bằng 0];`; “chưa biết số ngày không có nghĩa là không có ngày nào.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Vì sao không có `FROM`, và vì sao không thay mọi phần thiếu bằng `0` cho dễ tính? Bài đã nói rõ cách đọc câu lệnh và cái giá về ý nghĩa dữ liệu.

**Lý do/đề xuất:** Hai ô kết quả đặt cạnh nhau giúp nhận ra sự khác biệt mà không cần đưa thêm nghiệp vụ lương. Nội dung chỉ khẳng định phép cộng số, không suy rộng sai sang mọi hàm/tổng hợp. Kết quả `[NULL, 10]` mới được đối chiếu nội dung/HTML, chưa chạy SQL Server.

### 13. Đoạn chỉ phạm vi đang liệt kê nhiều bài sau — Cần cắt, ưu tiên thấp

**Câu gốc:** “Kiểu dữ liệu và chuyển kiểu đã gặp ở bài 1.3; hàm chuỗi và Unicode ở bài 2.7, hàm ngày ở bài 2.8, điều kiện `CASE` ở bài 2.9. Cách hàm tổng hợp xử lý `NULL` học ở bài 3.1, kiểm chất lượng dữ liệu ở bài 4.6.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Người học cần biết những giới hạn vừa gặp sẽ được giải thích ở đâu. Các dẫn 1.3, 2.7, 3.1 và 4.6 có mối nối ngay với nội dung; hàm ngày và `CASE` chưa giải quyết một vướng mắc cụ thể nào vừa xuất hiện.

**Lý do/đề xuất:** Cắt đúng hai vế “hàm ngày ở bài 2.8, điều kiện `CASE` ở bài 2.9”; giữ câu “Ở bài này chỉ cần…” và các dẫn liên quan trực tiếp. Đây là đề nghị rút gọn, không phải lỗi kiến thức và không thay phạm vi đã duyệt.

### 14. Câu lệnh cho tình huống — Giữ được

**Câu gốc:** `WHERE Email IS NULL` cùng `COALESCE(Email, N'(chưa có)') AS [Email]` và `ORDER BY MaNV ASC`.

**Tại sao/để làm gì, bài đã trả lời chưa?** Có đang lọc giá trị nguồn hay lọc nhãn vừa tạo? Lời dẫn đã nói kiểm email gốc trước; câu lệnh dùng cột nguồn trong `WHERE`, tạo nhãn ở `SELECT` và chốt thứ tự theo yêu cầu.

**Lý do/đề xuất:** Đúng bốn cột, đúng thứ tự và tiêu đề; không tự thêm trạng thái/ngày/phòng. Chuỗi tiếng Việt dùng `N`. Câu này đầy đủ để sao chép, không phải câu ghi. Không thấy mâu thuẫn với bài 2.1–2.4; kết quả chạy thật còn phải do người viết xác minh.

### 15. Kết quả và lời khép tình huống — Biên tập, ưu tiên thấp

**Câu gốc:** “Bạn có thể trả lời chị Hạnh: có `2` hồ sơ chưa có giá trị email là `NV044` ở `VH` và `NV045` ở `KD`.”; đoạn riêng “Việc nhắc bổ sung và xác minh địa chỉ cần người phụ trách thực hiện.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Kết quả đã đủ gửi chưa, và database có biết hai người thật sự không sở hữu email hay không? Bài trả lời đủ và tách rõ công việc xác minh của người phụ trách.

**Lý do/đề xuất:** Hai mã/phòng và số hồ sơ khớp hồ sơ công ty; hai dòng `Result` có `res-mark` trong HTML. Lời giải nằm đúng cạnh câu lệnh và kết quả. Gộp câu cuối về người phụ trách vào đoạn trả lời, thay vì để một đoạn một câu bị tách nhịp; không cần thêm hay bỏ ý nghiệp vụ.

### 16. Lời dẫn RunFlow — Giữ được

**Câu gốc:** “Sơ đồ là **thứ tự xử lý logic**, không phải cách SQL Server đọc dữ liệu vật lý. Chú ý bước `WHERE` còn giữ email `NULL`, tới `SELECT` mới tạo nhãn hiển thị”.

**Tại sao/để làm gì, bài đã trả lời chưa?** Sơ đồ thêm điều gì khi đã thấy câu SQL? Nó chỉ rõ chỗ dữ liệu còn thiếu và chỗ nhãn được tạo, giải quyết đúng sự khác nhau giữa lọc với hiển thị.

**Lý do/đề xuất:** Có mục đích học rõ, không chỉ thêm đủ khuôn. Query của sơ đồ trùng câu giải tình huống; bốn thẻ/bốn phần giải thích có trong HTML mới. Chưa thử mở, đóng hay di chuyển bằng bàn phím.

### 17. RunFlow — FROM — Giữ được trong giới hạn nguồn đối chiếu

**Câu gốc:** “`FROM` xác định bảng chứa email cần kiểm và các cột để đối chiếu hồ sơ.”; “Có `48` hồ sơ, đủ `12` cột. Hình trích `NV043`, `NV044`, `NV045`”.

**Tại sao/để làm gì, bài đã trả lời chưa?** Bắt đầu từ đâu, vì sao hình chỉ có ba dòng mà nói 48? Bước nguồn, nhãn tổng/trích và lời giải thích trả lời được.

**Lý do/đề xuất:** 48 hồ sơ và 12 cột khớp hồ sơ công ty/bài 1.6. Preview chọn `MaNV`, `Email`, `TrangThai`, cho thấy ngay hai `NULL` thay vì giấu cột cần nhìn. Tên, phòng, ngày vào làm của các mã trích khớp nguồn nội bộ được phép đọc; chưa có đủ nguồn để xác nhận độc lập toàn bộ ngày sinh, CCCD, email và giá trị ẩn khác. Không gọi phần chưa đối chiếu là sai.

### 18. RunFlow — WHERE — Giữ được

**Câu gốc:** “Còn `2` hồ sơ: `NV044`, `NV045`, vẫn đủ `12` cột và email vẫn là `NULL`. Bộ lọc chưa thay giá trị nào; thứ tự dòng chưa được bảo đảm.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Lọc có xóa cột hay đổi dữ liệu không? Bước này chỉ bỏ dòng ngoài điều kiện, giữ cấu trúc và giá trị nguồn; bài đã trả lời rõ cả việc chưa chốt thứ tự.

**Lý do/đề xuất:** `sql` đúng điều kiện của bước, preview cho thấy hai `NULL`, tổng 2 nhất quán với toàn bài/hồ sơ. Câu liên hệ Excel nhắc quy ước của hình nên không biến Blanks thành phép tương đương vô điều kiện với `IS NULL`.

### 19. RunFlow — SELECT — Giữ được

**Câu gốc:** “Vẫn `2` hồ sơ, còn `4` cột. Email trong kết quả là `(chưa có)`; email ở bảng nguồn vẫn là `NULL`. Chưa chốt thứ tự dòng.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Nhãn thay đổi ở đâu và có làm biến mất thông tin gốc không? Cả kết quả, lời giải và câu `sql` của bước đều trả lời nhất quán.

**Lý do/đề xuất:** Tách được số dòng với số cột và giá trị trả về với dữ liệu lưu; preview mã–nhãn cho thấy sự chuyển đổi. Việc nhắc lại nguồn chưa đổi có giá trị đối chiếu trực tiếp với bước `WHERE`, không cần cắt khỏi sơ đồ chỉ vì phần giảng đã nói nguyên tắc.

### 20. RunFlow — ORDER BY — Giữ được

**Câu gốc:** “Vẫn `2` hồ sơ và `4` cột: `NV044` trước `NV045`. Sắp xếp không làm bớt hồ sơ.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Vì sao thêm một bước khi hai mã trên hình trước cũng đang tăng dần? Bước trước đã nói thứ tự chưa chốt; bước này đặt quy tắc bảo đảm thứ tự đầu ra.

**Lý do/đề xuất:** Không lẫn sắp xếp với giới hạn số dòng hay thay đổi bảng. Câu cuối của flow khớp câu lệnh chính, tổng 48 → 2 → 2 → 2 và số cột 12 → 12 → 4 → 4 nhất quán. Các `meaning` bắt đầu từ từ khóa tương ứng.

### 21. Ba lỗi thường gặp — Giữ được

**Câu gốc:** “Nhầm `ISNULL` với `IS NULL`”; “`IS NOT NULL` vẫn nhận chuỗi rỗng, dấu cách hoặc địa chỉ gõ sai”; “Tự điền ngày giả vào `NgayNghiViec` sẽ làm sai cách đọc hồ sơ người chưa nghỉ.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Học viên có thể nhầm cú pháp, tưởng kiểm có giá trị là kiểm được liên hệ, hoặc làm sạch sai một `NULL` có nghĩa. Mỗi lỗi đều có hậu quả cụ thể trong bài.

**Lý do/đề xuất:** Mục 1 không viết thành lệnh cấm dùng hàm ở mọi vị trí trong `WHERE`; mục 2 có tình huống công việc; mục 3 cảnh báo đúng theo quy ước bộ mẫu. Không thấy câu chỉ để nhắc lại định nghĩa mà không có lỗi/hậu quả.

### 22. Ba ứng dụng — Giữ được

**Câu gốc:** “Lập danh sách cần bổ sung”; “Đọc dữ liệu theo quy ước”; “Trình bày phần còn thiếu”.

**Tại sao/để làm gì, bài đã trả lời chưa?** Biết `NULL` giúp làm việc gì ngoài thay một ô trống cho đẹp? Các ý gắn lần lượt với chuyển đúng hồ sơ cho người xác minh, đọc đúng trường không áp dụng và làm phần thiếu dễ thấy trong báo cáo.

**Lý do/đề xuất:** Đúng khả năng đã giải thích, có mục đích, không hứa SQL tự tìm nguyên nhân hoặc sửa dữ liệu. Điều kiện quy ước đã nằm trong chính tên ứng dụng thứ hai. Giữ ba ý; không thay bằng checklist kiểm file chung.

### 23. Memo và định dạng dẫn chứng — Giữ được

**Câu gốc:** “NULL khác 0, chuỗi rỗng và dấu cách”; “COALESCE lấy giá trị đầu tiên khác NULL; ISNULL có hai đầu vào”; “10 + NULL là NULL; chỉ thay bằng 0 khi đúng ý nghĩa”.

**Tại sao/để làm gì, bài đã trả lời chưa?** Sau khi đọc, cần giữ những điểm nào để tránh quyết định sai? Bốn hàng ôn lại vừa đủ nhận diện, lọc, hiển thị và phép cộng.

**Lý do/đề xuất:** Các khái niệm chính có in đậm chọn lọc ở phần giảng. Tên bảng/cột, dẫn chứng và địa chỉ ô trong lời văn MDX dùng code; HTML mới giữ các thẻ code/strong tương ứng. Chuỗi trong `Memo` hiển thị bằng định dạng mà khối hỗ trợ, không nhét Markdown để lộ dấu backtick. Lặp trong phần ghi nhớ là lặp phục vụ ôn, không cần cắt.

### 24. Lời dẫn bài tập và công bố cách chấm — Giữ được

**Câu gốc:** “Ba bài chấm vị trí cột và **thứ tự dòng**; bộ chấm không so tên cột. Dùng đúng phạm vi từng đề, giữ phân biệt giá trị nguồn với nhãn trong kết quả.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Viết tiêu đề khác hay đảo cột có ảnh hưởng điểm không? Lời dẫn nói rõ tiêu chí; cả ba đề đều nhắc thứ tự cần trả.

**Lý do/đề xuất:** Ba YAML đều `kind: query`, `ordered: true`, ba cột khai báo đúng với đề và câu đáp án. HTML mới có đủ ba link/trang và không hiển thị câu đáp án trong phần văn bản đã đọc. Chưa kiểm bộ chấm thực tế, tài nguyên JavaScript hay API nên không coi đây là chứng nhận toàn bộ đường gửi đáp án.

### 25. YAML bài 1 — Hồ sơ có ngày nghỉ việc — Giữ được

**Câu gốc:** “lấy tất cả hồ sơ có NgayNghiViec khác NULL, ở mọi phòng. Không thêm điều kiện trạng thái hay khoảng ngày.”; đáp án dùng `WHERE NgayNghiViec IS NOT NULL`.

**Tại sao/để làm gì, bài đã trả lời chưa?** Cần lọc giá trị thực sự đang lưu hay suy từ trạng thái? Đề chỉ rõ giá trị ngày, không cho thay bằng điều kiện trạng thái hoặc thêm mốc thời gian.

**Lý do/đề xuất:** Tập dữ liệu có cả ngày `NULL` và ngày có giá trị theo hồ sơ công ty, nên bỏ điều kiện sẽ đổi tập kết quả. Câu đáp án đúng ba cột/đúng hướng sắp trên mặt văn bản; không xuất hiện nguyên câu trong bài. Ba hồ sơ có ngày nghỉ khớp thông tin hồ sơ, chưa chạy kiểm kết quả live. Cách diễn đạt “khác NULL” trong đề là ngôn ngữ tự nhiên; bài đã dạy phép kiểm tương ứng, không vì vậy kết luận đề yêu cầu dùng `<> NULL`.

### 26. YAML bài 2 — KT khiến điều kiện email không được kiểm thực chất — Cần sửa, P2

**Câu gốc:** “lấy toàn bộ hồ sơ hiện có MaPB bằng KT và Email khác NULL”; đáp án `WHERE MaPB = 'KT' AND Email IS NOT NULL`.

**Tại sao/để làm gì, bài đã trả lời chưa?** Bài tập này phải cho người học thấy việc bỏ điều kiện `IS NOT NULL` làm sai kết quả. Với phạm vi hiện tại, điều đó chưa xảy ra theo chính hồ sơ công ty: hai hồ sơ thiếu email là `NV044`/`VH` và `NV045`/`KD`, không có hồ sơ thiếu email ở `KT`.

**Lý do/đề xuất:** Nếu dữ liệu đúng hồ sơ công ty, câu chỉ lọc `MaPB = 'KT'` vẫn trả cùng ba cột và cùng tập dòng như đáp án. Bộ chấm kết quả được mô tả trong bài vì vậy không phân biệt được người bỏ hẳn điều kiện NULL. Đây là vấn đề chọn tập cho bài luyện, không phải lỗi cú pháp của đáp án. **Đổi phạm vi bài 2 sang `KD`**, đồng bộ tên/summary/prompt/answer, để có email `NULL` phải loại; giữ bộ chấm kết quả, không thêm kiểm cú pháp và không sửa dữ liệu. Người viết cần chạy lại cả câu đúng và biến thể bỏ `IS NOT NULL` để xác nhận hai tập khác nhau trên database khóa học. Reviewer chưa chạy hoặc nộp biến thể sai; kết luận trên dựa vào dữ kiện hồ sơ, không giả làm kết quả kiểm live.

### 27. YAML bài 3 — Giữ toàn bộ VH và tạo nhãn — Giữ được

**Câu gốc:** “Không lọc bỏ hồ sơ thiếu email”; “riêng Email là NULL thì hiển thị chuỗi Unicode ‘(chưa có)’. Email khác NULL phải được giữ nguyên.”

**Tại sao/để làm gì, bài đã trả lời chưa?** Thay nhãn có phải lọc chỉ phần thiếu không, và có được đổi email đã có không? Đề trả lời tường minh cả hai, kiểm đúng sự khác nhau giữa `WHERE` và biểu thức trong `SELECT`.

**Lý do/đề xuất:** Phòng `VH` có cả hồ sơ thiếu email và hồ sơ có email theo hồ sơ công ty, nên khác bài 2 hiện tại. Câu đáp án giữ mọi hồ sơ phòng, không lọc trạng thái/ngày, có `N` và `ORDER BY`; không trùng nguyên câu mẫu của bài vì khác phạm vi, số cột và điều kiện. Tên cột không chấm được công bố rõ. Prompt là văn bản thuần; không đề nghị chèn backtick hay đổi UI trái phạm vi đã chốt. Chưa chạy xác minh kết quả/Unicode trên SQL Server.

## Ưu tiên sửa

1. **P2 — Mục 26:** đổi phạm vi bài tập 2 để bỏ điều kiện email sẽ trả sai tập dòng. Đây là thay đổi có tác động thật đến mục tiêu thực hành.
2. **P3 — Mục 13:** bỏ hai vế dẫn 2.8/2.9 không cần cho giới hạn vừa học.
3. **P3 — Mục 15:** gộp câu người phụ trách vào đoạn khép tình huống để mạch đọc liền hơn. Không cần viết lại phần giải hay đổi khung.

## Nguồn đối chiếu và giới hạn xác minh

- Nguồn nội bộ: `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`; bài 1.1, 1.3, 1.6, 2.2, 2.3, 2.4; mục phạm vi/quyết định của bài 2.5 trong `docs/superpowers/specs/2026-10-18-step-flow-exercises-full-lessons-design.md`.
- Đã đọc hết MDX/YAML được giao và HTML tĩnh mới ở `dist/bai/2-5-null-o-trong/index.html` cùng ba trang `bai-tap/1`, `bai-tap/2`, `bai-tap/3`. Lần đầu thấy dist là bản tóm tắt cũ; sau khi root báo build mới đã đọc lại bản full có sáu mục chính, bốn bước flow và đủ ba đề. Không dùng lỗi của dist cũ để phê bình MDX mới.
- Chỉ đọc HTML tĩnh: kiểm được nội dung, nhãn, thẻ code/strong, lớp đánh dấu và các bảng được xuất; **chưa kiểm trực quan**, tràn ngang, thao tác drawer, sao chép, bàn phím hay trình soạn SQL của bài tập. Không mở server hoặc browser.
- Không đọc `database/HRM_Demo.sql`, không tài liệu ngoài, không đọc report cũ; không kết nối database, chạy SQL/API hoặc bấm Chạy bài tập. Không sửa bài, test, tài liệu, UI hoặc dữ liệu.
- Số liệu/tập dòng được nói là khớp hồ sơ công ty hoặc nhất quán nội bộ chỉ có giá trị đối chiếu nguồn, **không phải kiểm live**. Những chi tiết không có đủ trong nguồn được phép đọc, kiểu trả về/chuyển kiểu và toàn bộ hành vi chấm còn cần người viết xác minh theo quy trình dự án. Reviewer không chạy test/build, không nhận các kết quả kiểm của root thành kết quả tự thực hiện.
