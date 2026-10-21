# Review độc lập bài 2.3 — AND, OR, IN, BETWEEN, LIKE

- Ngày: 21/10/2026.
- Công cụ: Codex; model kế thừa model của phiên, không đổi model và không đoán tên model cụ thể.
- Vai đọc: Business Consultant khó tính, đang học để hiểu và phản biện yêu cầu dữ liệu khi làm BA/PM.
- Phạm vi: toàn bộ `src/content/lessons/2-3-and-or-in-between-like.mdx`, `src/content/exercises/2-3-and-or-in-between-like.yaml`, HTML bài học và bốn trang bài tập trong build lúc 21:46 ngày 21/10/2026.
- Đã đọc: brief của lượt; `AGENTS.md`; quy ước, template, hồ sơ công ty; bài 1.1 đã duyệt, 2.1 và 2.2; các quyết định “Không làm theo” trong spec Level 2. Không đọc file review cũ trong `docs/reviews` hoặc `temp/review`.
- Chỉ tạo report này; không sửa nội dung, component, test, API hay tài liệu khác. Không đọc seed, không tra tài liệu ngoài, không chạy SQL/API hay bấm chạy bài tập.

Bài nhìn chung đủ để người học tự giải tình huống. Chưa thấy lỗi kiến thức cốt lõi hoặc số liệu trái hồ sơ công ty. Hai điểm cần hành động là khả năng phân biệt `%` với `_` của bài tập 4 và một câu ví dụ bị lặp. Tổng cộng **15 mục: 1 Cần sửa, 1 Cần cắt, 13 Giữ được**.

## Rà theo thứ tự bài

### 01. Mục tiêu, thời lượng và yêu cầu của chị Hạnh

- **Vị trí:** MDX 1–26, gồm frontmatter, Chat, phạm vi và Key.
- **Câu gốc:** “bạn kết hợp được nhiều điều kiện, đặt ngoặc đúng nhóm, lọc khoảng có hai đầu mút và tìm theo mẫu chữ”; “Kể cả người đã nghỉ nếu có”; “Mã phòng là phòng hiện tại, không phải phòng lúc vào làm”.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Tôi đang lấy nhân viên thuộc phòng nào, tại thời điểm nào; có được tự loại người đã nghỉ không? Bài đã trả lời đủ: xét phòng hiện lưu, khoảng ngày vào làm cụ thể, giữ mọi trạng thái, chưa cần sắp xếp dòng. Yêu cầu bốn cột và tiêu đề tiếng Việt cũng có ngay trong tin nhắn.
- **Lý do/đề xuất:** Khớp hồ sơ công ty mục 7 và tiếp nối bài 2.2. `LIKE` được nêu là mục tiêu phụ, có ví dụ riêng, nên việc nó không nằm trong câu trả lời tình huống không phải thiếu sót. Khoảng 25 phút có cơ sở với năm từ khóa, sơ đồ và bốn bài tập; chưa đo thời gian học thực tế. Không cần thêm dẫn nhập hoặc mở rộng phạm vi.

### 02. Cầu nối Excel và hình đã lọc

- **Vị trí:** MDX 30–38, khối Excel; HTML phần “Từ lọc nhiều cột…”.
- **Câu gốc:** “Một dòng phải qua bộ lọc của cả hai cột mới còn hiển thị”; “Hình minh họa sheet xếp theo mã rồi lọc”.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Chọn hai mã trong một cột khác gì lọc đồng thời hai cột; tại sao số dòng nhảy từ `4` sang `44`? Bài đã trả lời qua thao tác AutoFilter, lời dẫn sheet xếp theo mã và hình còn các dòng gốc sau lọc.
- **Lý do/đề xuất:** Hai hồ sơ, tên, phòng và ngày khớp hồ sơ công ty. Với tiêu đề ở dòng `1`, `NV003` ở dòng `4` và `NV043` ở dòng `44` là nhất quán. HTML mới có đúng các số dòng `1`, `4`, `44`; bốn ô phòng/ngày có `xl-mark`, hai ô ngày có `xl-num`. Lời văn gọi rõ hình minh họa, không làm người học hiểu đây là ảnh Excel thật. Không cần thêm hình.

### 03. AND, OR, ngoặc và IN

- **Vị trí:** MDX 40–54, hai khối Sql chỉ trích điều kiện.
- **Câu gốc:** “`AND` yêu cầu các điều kiện cùng đúng; `OR` chỉ cần ít nhất một điều kiện đúng”; “SQL Server xét `AND` trước `OR` về mặt logic”; “`IN` viết gọn nhiều phép so sánh bằng trên cùng một cột”.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Vì sao hai phòng phải dùng `OR`; vì sao xuống dòng rồi vẫn cần ngoặc; tại sao câu thiếu ngoặc lấy thừa `KD`; `IN` có thay mọi `OR` không? Bài trả lời cả bốn, kèm `NV002` làm phản ví dụ cụ thể.
- **Lý do/đề xuất:** So sánh cùng một ô với hai mã khác nhau làm rõ sai lầm `AND`. Cặp điều kiện có/thiếu ngoặc đủ gần để thấy đúng chỗ thay đổi. Câu “không phải lời hứa… thứ tự vật lý” tránh hiểu thành kiểm điều kiện tuần tự. Giải thích từng giá trị cần nháy riêng ngăn được lỗi `'KD, IT'`. Hai đoạn trích có `copy={false}` và HTML không có nút Sao chép trên chúng. Không cần bảng chân trị hoặc thêm ví dụ khác cột.

### 04. BETWEEN và hai mốc ngày

- **Vị trí:** MDX 56–60.
- **Câu gốc:** “`BETWEEN` kiểm khoảng gồm cả hai đầu mút”; “Chữ `AND` nằm giữa hai mốc là một phần của cú pháp `BETWEEN`”; “Với cột có cả giờ, mốc cuối là đầu ngày có thể làm thiếu dữ liệu trong ngày đó”.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Hai ngày biên có được lấy không; `AND` ở đây có phải nối thêm một điều kiện độc lập không; câu tương tự có luôn lấy hết ngày cuối không? Bài đã trả lời ngay bên phép viết tương đương và đặt giới hạn cột `date` của bộ mẫu.
- **Lý do/đề xuất:** So với `>=` và `<=` đã học ở 2.2, khái niệm mới đủ dễ kiểm. Phần ngày có giờ chỉ có một vế cảnh báo và trỏ bài 2.8, đúng độ sâu hiện tại. Không cần đưa thêm công thức thời gian vào 2.3.

### 05. Định nghĩa LIKE và bốn mẫu chữ

- **Vị trí:** MDX 62–71, bảng Markdown.
- **Câu gốc:** “`%` đại diện cho từ `0` ký tự trở lên, `_` đại diện cho đúng một ký tự”; “Mẫu so khớp chuỗi ký tự, không tự hiểu họ hay từ riêng biệt”; “`_` không chỉ đại diện chữ số”.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Vì sao vị trí `%` làm đổi cách tìm; `_` có chỉ thay một chữ số không; tìm có chuỗi `Thị` có nghĩa phải là một từ riêng không? Bài đã trả lời đủ qua ba vị trí `%`, ví dụ mã và lời giải thích ngay dưới bảng.
- **Lý do/đề xuất:** Các tên được trích khớp hồ sơ. Hàng chứa `Thị` ghi “Ví dụ”, không nhận hai tên là toàn bộ kết quả. Hàng `NV00_` cũng giới hạn các mã khớp trong bộ mẫu, không hứa chỉ nhận chữ số trên mọi dữ liệu. Dẫn lại `N` từ 2.2 là vừa đủ. Bảng giúp đối chiếu các mẫu khác nhau, không chép lại nguyên lời văn dài.

### 06. Truy vấn LIKE đầy đủ và ranh giới bài học

- **Vị trí:** MDX 73–85, Sql/Result tìm `Nguyễn%`, đoạn “Ở bài này chỉ cần…”.
- **Câu gốc:** “Ví dụ này tìm trong toàn bộ hồ sơ, không giới hạn phòng hay ngày”; “Đổi `LIKE` thành `=` sẽ so đúng giá trị chuỗi `Nguyễn%`”; “`LIKE` vẫn chịu quy tắc so chữ của database như bài 2.2”.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Ví dụ có còn ngầm lọc hai phòng và sáu tháng đầu năm không; dấu `%` có tác dụng với dấu bằng không; hoa thường và dấu tiếng Việt được so thế nào? Bài chặn hai hiểu nhầm đầu ngay tại ví dụ, nhắc quy tắc đã học và trỏ bài 2.7 cho phần đi sâu.
- **Lý do/đề xuất:** Kết quả một dòng `NV003` nhất quán với danh sách hồ sơ. Ví dụ có đủ `SELECT`/`FROM`/`WHERE` để người mới ráp mẫu vào câu hoàn chỉnh. Cụm `HoTen LIKE ...` chỉ là đoạn trong lời văn, không phải khối câu lệnh có nút sao chép. Không cần bổ sung cú pháp escape hoặc cách tách họ tên vào bài này.

### 07. Câu lệnh cho tình huống và lời trả lời ngay cạnh kết quả

- **Vị trí:** MDX 87–104, Sql, Result và hai đoạn trả lời.
- **Câu gốc:** “Dùng `IN` để gom hai phòng và `BETWEEN` để ghi khoảng ngày”; “có `2` hồ sơ… `NV003`, `NV043`”; “Điều kiện không loại người đã nghỉ nếu họ đạt yêu cầu”.
- **Đánh giá: Giữ được, trừ câu lặp ở mục 08.**
- **Tại sao/để làm gì:** Hai tiêu chí được nối thế nào; tại sao không thêm trạng thái; có trả đủ các cột chị Hạnh cần không? Câu lệnh và lời trả lời đã khép các điểm đó. Bài cũng nói rõ hai hồ sơ tìm được tình cờ đều đang làm, nên không đánh đồng kết quả hiện tại với việc đã lọc trạng thái.
- **Lý do/đề xuất:** Query dùng đúng `MaPB` và `NgayVaoLam`, bốn cột/alias đúng yêu cầu. Hai dòng và hai ngày khớp hồ sơ công ty; `mark={[1, 2]}` có lời giải thích rằng đó là toàn bộ kết quả. Ngày ISO của Result khác định dạng ngày Excel nhưng phù hợp nội dung đã học ở 2.1. Có nhắc chưa `ORDER BY`, không hứa thứ tự ảnh là thứ tự được bảo đảm. Không cần phần trả lời riêng.

### 08. Cắt một phản ví dụ đã giải ở phần ngoặc

- **Vị trí:** MDX 104, đối chiếu MDX 52.
- **Câu gốc:** “`NV002` thuộc `KD` nhưng vào làm `2024-04-01`, cũng không được lấy.” Trước đó: “`NV002` thuộc `KD` nhưng vào làm `2024-04-01` vẫn lọt vào… Với ngoặc đúng, hồ sơ này bị loại.”
- **Đánh giá: Cần cắt — ưu tiên thấp.**
- **Tại sao/để làm gì:** Tại sao `NV002` không nằm trong kết quả đúng? Bài đã trả lời đầy đủ ở phần ngoặc, gồm cả việc loại trong câu đúng. Lần nhắc lại không thêm điều kiện hay hậu quả mới.
- **Lý do/đề xuất:** Bỏ riêng câu về `NV002` ở dòng 104. Giữ phản ví dụ `NV030` vì nó bổ sung trường hợp đạt ngày nhưng sai phòng, và giữ câu về `ORDER BY` vì đó là giới hạn cần biết của hình. Không cần thêm câu thay thế.

### 09. RunFlow: ba bước, hai kiểu giảm dữ liệu

- **Vị trí:** MDX 106–171, toàn bộ query, ba step, preview, meaning, detail, SQL và bảng dữ liệu; ba drawer trong HTML.
- **Câu gốc:** “Các điều kiện nằm chung trong bước `WHERE`”; “Còn `2` hồ sơ, vẫn đủ `12` cột”; “Vẫn `2` hồ sơ, còn `4` cột”.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Có phải `IN`, `AND`, `BETWEEN` là các lượt quét riêng; bước nào bỏ dòng, bước nào chọn cột? Bài trả lời rõ: thứ tự logic `FROM` → `WHERE` → `SELECT`, mọi điều kiện ở cùng một `WHERE`, rồi chỉ chọn bốn cột.
- **Lý do/đề xuất:** Các `meaning` đều bắt đầu từ từ khóa, có số dòng và trường hợp giữ/bỏ cụ thể trong `detail`. Query chính và query cuối step trùng nhau. Preview dùng đúng ba cột nguồn có thể nhìn được cả mã phòng và ngày; `NV030` có mặt ở nguồn và biến mất ở bước lọc. HTML mới có ba thẻ/ba drawer, nội dung từ khóa và giá trị trong các chuỗi được render thành code, không lộ backtick. Các dữ liệu họ tên/phòng/ngày được đối chiếu hồ sơ; ngày sinh, CCCD, email và mã quản lý trong bảng rộng chưa có đủ nguồn học viên để xác nhận từng ô. Không suy từ sơ đồ thành kế hoạch thực thi thật.

### 10. Ba lỗi thường gặp

- **Vị trí:** MDX 173–181, Mistakes.
- **Câu gốc:** “`WHERE MaPB = 'KD' OR 'IT'` không tạo được điều kiện hợp lệ”; “SQL Server không tự đổi chỗ mốc lớn và nhỏ”; “`NV041` là `Hà Văn Quý` cũng khớp vì có chuỗi `Hà` ở phần họ”.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Có được viết tắt vế sau `OR` không; đảo mốc có được tự sửa không; vì sao tìm được tên nhưng vẫn sai người? Cả ba đã có lỗi, hậu quả và cách hiểu đúng, không buộc tôi đoán.
- **Lý do/đề xuất:** Nội dung này bổ sung các kiểu sai cụ thể. Trường hợp `NV041` có căn cứ trong hồ sơ và làm rõ hậu quả thực tế của tìm chuỗi, không phải chỉ nhắc lại định nghĩa `LIKE`. Không có thông báo lỗi SQL bị tự sáng tác trong khối Messages. Chưa chạy các câu sai nên không xác nhận thông báo lỗi hoặc kết quả trên database thật.

### 11. Ứng dụng và Ghi nhớ

- **Vị trí:** MDX 183–200, Apply và Memo.
- **Câu gốc:** “Khoanh nhóm đối chiếu…”, “Chọn nhiều mã…”, “Tra cứu khi thiếu thông tin…”; “`BETWEEN` lấy cả hai mốc; mốc nhỏ viết trước”.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Những từ khóa này giúp được công việc nào, và tìm theo tên đã đủ để xác nhận một người chưa? Ba ứng dụng nêu đúng khả năng chủ đề, mục đích và bước đối chiếu mã sau tìm tên. Memo trả lại các điểm tựa Excel đã dùng trong phần chính.
- **Lý do/đề xuất:** Không biến Ứng dụng thành checklist kiểm nguồn hay cảnh báo chung. Memo không thêm kiến thức mới, không hứa database tự hiểu nghiệp vụ. Các đoạn này ngắn; không cần thêm tự kiểm tra khái niệm vì đây là bài có bài tập thực hành. Những chuỗi thuộc tính không cần nhét backtick để bắt chước Markdown nếu renderer đã xử lý cú pháp SQL như HTML hiện có.

### 12. Giới thiệu bài tập và bài 1 về nhóm OR

- **Vị trí:** MDX 202–206; YAML 3–17; HTML bài tập 1.
- **Câu gốc:** “Bộ chấm nhận các cách viết tương đương nếu trả đúng dữ liệu”; “Điều kiện trạng thái áp dụng cho cả hai phòng”.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Tôi có bắt buộc chép cách dùng `OR` của đáp án không; trạng thái có chỉ áp dụng cho `VH` không; có được tự lọc ngày không? Bài cho phép câu tương đương; đề 1 nói rõ nhóm phòng, trạng thái dùng cho cả nhóm và không giới hạn ngày.
- **Lý do/đề xuất:** Đáp án trong YAML đặt ngoặc đúng, có `N` cho `Đang làm`, trả đúng thứ tự bốn cột, `ordered: false` khớp đề. Theo hồ sơ, `KD` có người đã nghỉ nên trường hợp thiếu ngoặc có khác biệt dữ liệu để phát hiện; đây không chỉ là luyện dấu ngoặc hình thức. Không đề nghị bộ chấm ép dùng `OR` thay vì `IN` hoặc kiểm alias, phù hợp quyết định đã chốt.

### 13. Bài 2 về IN và khoảng gồm hai mốc

- **Vị trí:** YAML 18–33; HTML bài tập 2.
- **Câu gốc:** “từ ngày 01/03/2021 đến hết ngày 01/07/2024, gồm cả hai ngày mốc”; “không thêm điều kiện trạng thái”.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Phòng được hiểu theo lúc vào làm hay hiện lưu; có lấy hai ngày biên và người đã nghỉ không? Đề đã nói rõ cả ba. Thứ tự `NgayVaoLam`, `MaPB` khác ví dụ chính buộc tôi đọc yêu cầu cột.
- **Lý do/đề xuất:** Đáp án SQL và metadata nhất quán. Hồ sơ có `NV018` vào đúng `2021-03-01`, `NV042` vào đúng `2024-07-01`; vì vậy dữ liệu dự kiến phân biệt được `>`/`<` sai với phép so gồm ngày biên. Đây là đối chiếu hồ sơ, chưa chạy để xác nhận kết quả. Không cần bắt buộc từ khóa `BETWEEN` nếu cách viết khác giữ đúng khoảng.

### 14. Bài 3 luyện dựng câu từ mẫu đã học

- **Vị trí:** YAML 34–46; đối chiếu MDX 68 và 75–77; HTML bài tập 3.
- **Câu gốc:** “lấy các dòng có `HoTen` chứa chuỗi này ở bất kỳ vị trí nào”; đáp án `SELECT MaNV, HoTen FROM NhanVien WHERE HoTen LIKE N'%Thị%';`.
- **Đánh giá: Giữ được.**
- **Tại sao/để làm gì:** Tìm `Thị` ở đầu, giữa hay cuối; có được chỉ tìm trong nhóm phòng của tình huống không; có cần tách từ không? Đề nói đủ phạm vi toàn bộ hồ sơ, bất kỳ vị trí, không tách từ và không thêm điều kiện.
- **Lý do/đề xuất:** Bảng lý thuyết đã cho vế `HoTen LIKE N'%Thị%'`, nên mức tự giải ở bài này là cơ bản: người học vẫn phải tự dựng câu đầy đủ, chọn hai cột và giữ đúng phạm vi. Không thấy nguyên câu đáp án đầy đủ xuất hiện trong phần giảng; không kết luận lộ đáp án chỉ vì được tham khảo predicate đã học. `N`, `columns`, `ordered` và đáp án khớp đề. Không bắt buộc đổi mẫu chỉ để khác ví dụ.

### 15. Bài 4 chưa thử được điểm khác nhau giữa một ký tự và nhiều ký tự

- **Vị trí:** YAML 47–58; HTML bài tập 4; đối chiếu hồ sơ công ty mục 3.
- **Câu gốc:** “MaNV bắt đầu bằng NV04 và sau đó còn đúng một ký tự. Không lấy mã dài hơn hay ngắn hơn mẫu đó”; đáp án `WHERE MaNV LIKE 'NV04_'`.
- **Đánh giá: Cần sửa — ưu tiên vừa, thuộc chất lượng đánh giá.**
- **Tại sao/để làm gì:** Vì sao phải dùng `_` thay `%`; tôi dùng `%` sai ý nghĩa thì bài có giúp tôi nhận ra không? Lý thuyết đã trả lời ý nghĩa, nhưng dữ liệu của bài tập dự kiến không thử được khác biệt này.
- **Lý do:** Theo danh sách hồ sơ công ty, mọi `MaNV` đều có dạng năm ký tự `NV001`–`NV048`. Vì vậy `MaNV LIKE 'NV04%'` và `MaNV LIKE 'NV04_'` dự kiến cùng lấy `NV040`–`NV048`. Với bộ chấm nhận câu tương đương theo kết quả như bài đã nói, người nhầm `%` là đúng một ký tự vẫn có thể đạt. Đây không phải sai đáp án YAML, và không phải phát hiện đã kiểm live/API; là khoảng trống đánh giá suy ra từ danh sách hồ sơ được phép đọc.
- **Đề xuất:** Đổi bài 4 sang mẫu trên `HoTen` có độ dài khác nhau để `_` và `%` cho tập kết quả khác nhau, vẫn chỉ chọn `MaNV`, `HoTen`. Ví dụ yêu cầu họ tên kết thúc bằng `H` rồi đúng một ký tự cuối, mẫu `N'%H_'`; không cần diễn giải phần đó là tên riêng. Người viết cần chạy xác minh mẫu và trường hợp thay `_` bằng `%` trước khi chốt. Cách này giữ bốn bài tập, không sửa database và không đòi bộ chấm ép cú pháp; không đi ngược quyết định đã chốt về chấm câu tương đương.

## Ưu tiên sửa

1. **Mục 15:** làm cho bài tập 4 có dữ liệu phân biệt được `_` với `%`; xác minh trên SQL Server/API ở luồng kiểm chung của người phụ trách.
2. **Mục 08:** bỏ câu lặp về `NV002` sau kết quả, giữ `NV030` và giới hạn thứ tự dòng.

Các mục Giữ được không cần được kéo dài chỉ để có thêm giải thích. Không yêu cầu tách lại hai phần Excel/SQL, thêm phần trả lời riêng, thay bộ chấm hay đổi dữ liệu dùng chung.

## Giới hạn xác minh và nguồn đối chiếu

- Đã rà toàn bộ MDX/YAML và nội dung HTML mới của bài học cùng bốn trang bài tập. HTML có đúng bốn đề, thứ tự cột và phạm vi; bài học có đủ các mục, ba thẻ/ba drawer, các code span và dấu hàng/ô Excel nói ở trên. Đây là kiểm HTML tĩnh, không chứng nhận bố cục, tràn ngang, thao tác bàn phím, mở drawer, sao chép hoặc chạy bài trong trình duyệt.
- Bản HTML cũ lúc 01:40 được nhận diện là cũ và không dùng để kết luận; sau thông báo của root đã đọc bản 21:46:36. Không tự build, mở server hay browser.
- Kết quả hai hồ sơ chính, các tên mẫu, ngày mốc và lập luận về bài tập được đối chiếu `docs/ho-so-cong-ty.md`, không seed. Những ô rộng trong RunFlow không có trong hồ sơ công ty, đặc biệt CCCD/email/ngày sinh, chưa xác minh độc lập.
- Không kết nối database, chạy truy vấn, API hoặc bộ kiểm dự án. Không xác nhận dữ liệu live, hành vi collation thật, bộ chấm thực tế hay thông báo lỗi bằng thực thi. Các giới hạn đó là phần root kiểm riêng; không báo toàn quy trình đạt.
- Nguồn học viên: bài 1.1; 2.1 cho alias, cột và định dạng ngày; 2.2 cho WHERE, `N`, `yyyymmdd`, chuyển kiểu ngầm, collation và TRUE/UNKNOWN; tài liệu quy ước/template/hồ sơ hiện hành. Chỉ dùng các quyết định đã chốt trong spec làm bối cảnh, không dùng kết quả review cũ để xác nhận nhận xét.
