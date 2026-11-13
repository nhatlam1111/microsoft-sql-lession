# Quy ước của khóa học

Mọi quy ước khi viết bài, review bài và làm việc với database của khóa học nằm ở file này. Khung bài và các khối dùng được nằm ở [`lesson-template.md`](lesson-template.md); hiện trạng công ty, nhân vật và những gì các bài đã kể nằm ở [`ho-so-cong-ty.md`](ho-so-cong-ty.md). Có quy ước mới thì ghi vào đây, trong cùng commit với thay đổi đầu tiên áp dụng nó.

Điểm bắt đầu cho tác giả/reviewer: [biên soạn theo phạm vi](bien-soan.md). Định hướng phần 4–5 theo [mục tiêu khóa học](dinh-huong-khoa-hoc.md), áp dụng khi hoàn thiện từng bài.

**Chuẩn hiện hành:** bài có câu lệnh lấy [`bài 2.1`](../src/content/lessons/2-1-chon-cot-dat-ten-cot.mdx) làm mẫu về mạch kể, độ sâu và cách đánh dấu chữ; bài nền theo mục 2.5 lấy [`bài 1.1`](../src/content/lessons/1-1-database-la-gi.mdx) làm mẫu. Excel và SQL được giải thích trong cùng một phần chính, có tiêu đề theo chủ đề của bài. Bố cục hai tiểu mục và quy tắc bám tình huống ở mục 2.1 áp dụng từ 31/10/2026; các bài chưa chuyển được liệt kê trong `tests/content.test.ts`, được chỉnh dần từng bài và không dùng làm mẫu bố cục. Không viết bài đầy đủ mới theo khung cũ. Spec, plan, mockup ở `docs/superpowers` và hồ sơ ở `docs/reviews` là lịch sử từng lượt; gặp chỗ khác file này thì file này đúng.

## 1. Viết gọn

- **Không dài dòng.** Mỗi đoạn một ý, tối đa khoảng bốn câu; một ý nói được bằng một câu thì không viết hai câu. `npm test` chặn đoạn văn quá 120 chữ trong bài đầy đủ.
- **Không vòng vo.** Câu đầu đoạn nói ngay ý chính. Bỏ câu dẫn rỗng ("Cần lưu ý rằng…", "Như đã biết…", "Nói cách khác…") và các câu rào đón không thêm thông tin.
- **Không lặp ý.** Mỗi ý nói một lần, ở chỗ người học cần nó; chỗ khác thì trỏ về ("xem Hay nhầm 2", "bài 1.3"). "Hay nhầm" nêu lỗi và hậu quả; "Ứng dụng" nêu việc làm được nhờ chủ đề của bài, kèm mục đích cụ thể. Câu trả lời tình huống không giảng lại câu lệnh. Chỉ "Ghi nhớ" và câu tự kiểm tra được nhắc lại ý đã có, vì đó là phần ôn.
- **Giải thích đủ quan hệ nhân quả.** Điều kiện đơn giản viết bằng một vế; cơ chế khó có thể cần 2–4 câu để đi từ dữ liệu qua thao tác tới kết quả. Rút bằng cách bỏ lặp và nhánh ngoài mục tiêu, không cắt mất lời giải thích hoặc nới giới hạn từ để thêm chủ đề.
- **Khi sửa theo review:** ưu tiên sửa câu đang có hơn thêm câu mới. Mỗi lần thêm một ý, tìm chỗ cắt bớt; mục review chỉ đúng ở trường hợp hiếm thì ghi "Không làm theo" kèm lý do.

## 2. Nội dung bài

- Tình huống, nhân vật, con số khớp [`ho-so-cong-ty.md`](ho-so-cong-ty.md): cùng công ty, cùng thời điểm (tháng 10/2026), cùng người hỏi (chị Hạnh, Phòng Nhân sự). Nhân vật mới không trùng tên với hồ sơ trong bộ mẫu; nhắc tới hồ sơ thì gọi bằng mã. Bài kể thêm điều mới về công ty thì ghi vào mục 7 của file đó.
- Xưng "bạn", câu ngắn. Giải thích thuật ngữ ngay lần đầu xuất hiện.
- Định nghĩa lần đầu bằng việc hoặc giá trị người học thấy trong tình huống; không mặc định biết VLOOKUP/PivotTable hay thuật ngữ công cụ. Thuật ngữ đã giải thích ở bài trước chỉ nhắc đủ để nối ý, không giảng lại. Một tham chiếu bài sau không thay cho lời giải cần có để làm bài hiện tại.
- Không nhắc vai trò hay xuất thân của người đọc ("BA", "developer", "hồi làm tư vấn"); tình huống là yêu cầu công việc trung tính. Mục dùng bài vào việc thật tên là "Ứng dụng".
- Dùng "kết bảng" cho `JOIN`, không dùng "nối bảng" hay "ghép". Không dùng các cụm trong `BANNED_PHRASES` (`src/lib/lesson-schema.ts`), không dùng emoji.
- Phần giảng tự trả lời "vì sao, để làm gì, cái giá là gì" bằng lời dẫn liền mạch; câu hỏi nằm ở tình huống và phần tự kiểm tra. Cơ chế SQL Server tự làm thì gọi đúng tên (chuyển kiểu ngầm) và nói gặp lại ở bài nào.
- Mẫu tin nhắn cần gửi IT có thể trích câu hỏi trong ngoặc kép để người học dùng khi mắc lỗi; đó là hướng dẫn thao tác, không dùng nó làm câu hỏi dẫn lý thuyết.
- Mỗi dòng `LineMap` có "Ví dụ:" với giá trị cụ thể của tình huống.
- Cuối lý thuyết có đoạn "Ở bài này chỉ cần…" kể các bài đi sâu hơn ("bài 5.2").
- Drawer của `RunFlow` theo mục 2.6.
- Không hứa điều database không tự bảo đảm. Ràng buộc chỉ có khi được khai báo ("khi `MaNV` được khai báo là khóa chính…"). Tách "hợp lệ" với "đúng", "lưu được" với "đúng ý". Khóa ngoại là luật kiểm khi ghi, không phải ô chọn trên màn hình; nó xác nhận mã có thật, không xác nhận mã đúng.
- Không tuyệt đối hóa Excel (có Data Validation, có làm việc chung, `SUM` bỏ qua ô chữ); nói điều kiện của tình huống.
- `TOP (n)` là tối đa n dòng. Kết quả không có `ORDER BY` thì nói thứ tự dòng có thể khác hình. `TOP` đi cùng `ORDER BY`, trừ khi bài đang nói đúng chuyện không có `ORDER BY`. Thứ tự trong `RunFlow` là thứ tự xử lý logic, không phải cách SQL Server đọc dữ liệu.
- Lời hứa của công cụ nói rõ phạm vi: hoàn tác chỉ có trên trang bài tập, SSMS chạy thật; lỗi 40613 thường do database đang thức dậy, lỗi kéo dài thì gửi nguyên văn cho người phụ trách.
- Tình huống được khép lại ngay trong phần chính: có giả định rõ (mốc thời gian, phạm vi) và câu trả lời cho người hỏi, tách việc database làm với quyết định nghiệp vụ. Bài có truy vấn trả lời ngay sau bảng kết quả. Bài khái niệm trả lời bằng lời trong mạch giải thích. Không tách thêm mục "Trả lời chị Hạnh".
- Bài khái niệm có ít nhất ba câu tự kiểm tra, bao phủ mục tiêu đầu bài; không chỉ hỏi các trường hợp ngoại lệ. Mỗi đáp án ngắn và tự đủ nghĩa.
- SQL: chuỗi tiếng Việt có `N`; xuống dòng và thụt lề theo mục 2.4. Đoạn chỉ để đọc (câu ghi dữ liệu, đoạn trích có `...`, khuôn cú pháp) có `copy={false}`. Level 1 không bảo học viên chạy `INSERT`, `UPDATE`, `DELETE` trong SSMS.

### 2.1 Khung bài và độ sâu

- Thứ tự bài đầy đủ: **Tình huống → phần chính có tiêu đề theo chủ đề → Hay nhầm ở đâu → Ứng dụng → Ghi nhớ → tự kiểm tra (nếu có) → Bài tập**. Tự kiểm tra luôn đặt ngay sau Ghi nhớ, trước Bài tập. Bài `noExercises: true` bỏ mục Bài tập và có ít nhất ba câu tự kiểm tra. Bản tóm tắt giữ khung riêng ở `lesson-template.md`; bài nền theo mục 2.5.
- Phần chính đi từ vấn đề trong tình huống, qua khái niệm cần biết và cách Excel/SQL xử lý, tới câu trả lời. Bài có câu lệnh dùng đúng hai tiểu mục theo mạch nêu ở dưới. Bài khái niệm dùng khoảng 2–4 tiểu mục theo ý nghĩa, bài nền theo mục 2.5, bài xử lý sự cố như 5.6 theo diễn biến. Không bắt buộc chép đúng các tiểu mục của bài mẫu. Mỗi lần chuyển từ Excel sang database/SQL phải có lời dẫn rõ.
- Mọi giải thích SQL và câu lệnh trong phần chính, Hay nhầm chỉ bám tình huống đầu bài, trên đúng bảng và cột tình huống cần; không thêm câu ví dụ trên bảng hay cột khác, để người học không rối và bài gọn. Đoạn trích của chính câu lệnh thì được. Hay nhầm dùng biến thể sai của chính câu đó. Từ khóa ngoài lời giải chỉ nhắc khi đề bài tập cần, bằng một vế gắn với tình huống. Bài tập được dùng bảng khác.
- Khái niệm và ví dụ đứng cạnh nhau. Chỉ dùng khối giúp hiểu ý đang nói, không cần một bảng so sánh dài. Không giải thích trong lời văn rồi chép nguyên ý vào bảng.
- Bài khái niệm chưa cần thực hành thì không chèn preview SQL cho đủ khuôn; dẫn sang bài thực hành tương ứng. Bài truy vấn có câu lệnh giải đúng tình huống và kết quả đã kiểm, người học thấy câu lệnh trước khi nghe giải thích. Tiểu mục đầu đi theo việc trong Excel → trong SQL cần chạy câu lệnh gì → câu lệnh của tình huống → giải thích từng phần của chính câu đó bằng `LineMap`. Tiểu mục sau là "SQL Server chạy câu này thế nào": `RunFlow` → bảng kết quả cuối → câu trả lời; bài không có `RunFlow` đặt tên tiểu mục này là "Kết quả cho tình huống". Không có hướng dẫn chạy hay giải thích cách đọc Results, Messages; phần này nằm ở trang Giới thiệu.
- Giữ kiến thức đủ để hiểu và xử lý yêu cầu của bài. Chi tiết sâu đã có bài riêng thì nêu điều kiện bằng một vế câu và dẫn bài; không biến bài nhập môn thành bài về kiểu dữ liệu, khóa, import hay giao dịch.
- Bài khái niệm đơn giản hướng tới 10–12 phút gồm tự kiểm tra, bài nền theo mục 2.5; bài phức tạp ghi thời lượng theo nội dung thực tế. Rút bằng cách cắt lặp và giảm độ sâu ngoài mục tiêu; giữ phần giảng chính luôn hiển thị, không giấu sau tab/khối bấm mở để trông ngắn hơn.

### 2.2 In đậm khái niệm, highlight dẫn chứng

- **Khái niệm trọng tâm in đậm có chọn lọc** ở chỗ định nghĩa và đối chiếu: `**database**`, `**workbook**`, `**sheet**`, `**bảng**`, `**dòng**`, `**cột**`, `**kiểu dữ liệu**`, `**khóa chính**`… Không bôi đậm mọi lần xuất hiện hoặc cả đoạn.
- **Dẫn chứng dữ liệu dùng code có nền** trong lời giải thích: mã, tên, ngày, số cụ thể được lấy từ dữ liệu; ví dụ viết `` `NV005` ``, `` `KT` ``, `` `KD` ``, `` `Kế toán` ``, `` `Ke toan` ``. Tên bảng/cột, kiểu SQL, từ khóa, `NULL` và địa chỉ ô cũng dùng code: `` `NhanVien` ``, `` `MaPB` ``, `` `date` ``, `` `C4` ``. Trong `<summary>`, có thể dùng `<code>MaNV</code>`; chuỗi có dấu nháy phải dùng biểu thức JSX như `<code>{"MaPB = 'IT'"}</code>` để MDX không đổi thành nháy cong. Kiểm ký tự trên bản build bằng `check:dist`.
- Giữ nguyên giá trị, dấu tiếng Việt và cách viết của dẫn chứng; phần chữ giải thích giá trị nào thì highlight đúng giá trị đó. Nhân vật giả định, vai phòng ban trong câu chuyện, số bài và mốc tháng của tình huống vẫn là lời văn thường, không tự biến thành giá trị truy xuất.
- Khối Excel/SSMS/Results giữ cách hiển thị của công cụ. Dùng `mark`, `numeric`, `rowNumbers`, `path` đúng dữ liệu đang chỉ; không chèn dấu backtick vào chuỗi ô hay sửa component chung chỉ để định dạng một dẫn chứng. Hình giả lập phải nói rõ là minh họa nếu không phải kết quả thật của database.
- Markdown nội dòng áp dụng ở lời văn MDX. Chuỗi thuộc tính của component chỉ dùng định dạng mà component hỗ trợ; kiểm bản render để không để lộ dấu backtick như ký tự thường.

### 2.3 Mục Ứng dụng

- Viết 2–4 ý theo dạng **Tên ứng dụng:** việc làm được nhờ kiến thức của bài, kèm mục đích hoặc ví dụ công việc. Chủ đề quyết định ứng dụng, không dùng cùng một danh sách lời khuyên chung cho mọi bài.
- Bài database nói về nguồn lưu trữ thống nhất, kiểm dữ liệu bằng luật đã khai báo, tra cứu/lập báo cáo và lịch sử khi có thiết kế lưu lịch sử. Bài `WHERE` nói về lọc danh sách theo điều kiện; bài kết bảng nói về lấy thông tin qua các bảng liên quan.
- Chỉ nêu khả năng trong phạm vi bài đã giải thích. Không hứa database tự biết dữ liệu đúng, tự đồng bộ mọi file Excel hoặc tự lưu lịch sử. Điều kiện viết ngay trong ý ứng dụng, không thêm một đoạn rào đón riêng.
- Lời khuyên kiểm nguồn file, đọc đặc tả hoặc chuẩn bị import chỉ dùng khi đó là chủ đề cần áp dụng; không thay cho ứng dụng cụ thể của kiến thức SQL/database đang học.

### 2.4 Thụt lề SQL (duyệt 23/10/2026)

- Một cấp thụt lề tương đương **4 dấu cách**. Các mệnh đề chính `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `UPDATE`, `SET` và `JOIN` bắt đầu cùng cột. Câu ngắn có thể giữ một dòng.
- Khi danh sách cột hoặc biểu thức của `SELECT` xuống dòng, dòng tiếp theo lùi một cấp. `AND`/`OR` nối điều kiện ở dòng mới cũng lùi một cấp dưới `WHERE`/`HAVING`/`ON`; không thay ngoặc hoặc thứ tự điều kiện để căn lề.
- `CASE` là một biểu thức trong danh sách cột: đặt cùng cấp với các biểu thức tiếp dòng, `WHEN`/`ELSE` lùi thêm một cấp, `END` thẳng với `CASE`. Khối lồng nhau tăng từng cấp; không căn bằng nhiều dấu cách tùy ý.
- **Trong thuộc tính MDX**, viết ký tự escape `\t` ở đầu dòng trong template literal của `Sql.code`, `RunFlow.query` và `steps[].sql`. Một `\t` là một cấp, `\t\t` là hai cấp; không dùng khoảng trắng hoặc tab literal đầu dòng vì MDX có thể xóa. Chuỗi `focus` chứa xuống dòng phải có đúng `\n`/`\t` như phần tương ứng của `query`. Xem ví dụ chép được ở `lesson-template.md`.
- Dùng cùng quy tắc ở câu chính, câu trong sơ đồ, `LineMap`, `Memo` và màn bài tập. CSS dùng token `--sql-tab-size: 4`; editor và lớp tô màu phải cùng mốc tab. Nút **Sao chép** giữ đúng xuống dòng/thụt lề đang hiển thị, không chép ra hai ký tự `\` và `t`. Không tự định dạng lại bản nháp người học khi gõ, mở trang hay chạy SQL.
- Kiểm trên **bản build**: ít nhất một câu có nhiều cột/điều kiện, một `CASE` có hai cấp thụt lề, câu có highlight trong drawer và thao tác sao chép/dán vào editor. Khi chỉ sửa định dạng, đối chiếu token SQL, giữ nguyên literal/comment/điều kiện, kết quả và thông báo lỗi; không bỏ kiểm số liệu vì test cũ đang đọc chuỗi escape chưa giải mã.

### 2.5 Bài nền (cập nhật 03/11/2026)

- Các bài mở đầu level 1 là **bài nền**, không có tình huống hay nhân vật: frontmatter có `noScenario: true`, `noExercises: true`. Hiện gồm các bài 1.1–1.5; bài 1.1 và 1.5 có `minutes: 12`, bài 1.2–1.4 có `minutes: 7`.
- Thứ tự: phần chính theo chủ đề → Hay nhầm ở đâu (1–2 ý) → Ứng dụng (1–2 ý) → Ghi nhớ → ít nhất ba câu tự kiểm tra. Không dùng `Chat`, `Key`.
- Bài 1.2–1.4 dài 500–700 từ, `npm test` chặn ở 800; bài 1.1 và 1.5 hướng tới 800–1.000 từ, chặn ở 1.100. Đếm bằng `proseParagraphs`. Rút bằng cách bỏ chi tiết chưa cần cho bài, không viết tắt lời giải thích.
- Phần chính mở bằng điều quen trong Excel, dùng 0–3 tiểu mục, vẫn nói vì sao và để làm gì, vẫn có đoạn "Ở bài này chỉ cần…". Ví dụ dùng bảng và giá trị có thật trong dữ liệu mẫu, không kể chuyện.
- Các quy tắc còn lại của mục 1–3 vẫn áp dụng, như giới hạn đoạn, không hứa quá, in đậm có chọn lọc.
- Năm bài dùng khái niệm từ tài liệu chính thống và hình internet nguyên gốc, không tự vẽ hoặc tạo ảnh AI. Ví dụ ngoài HRM_Demo được dùng để giải thích các mô hình/quan hệ chưa có trong bộ mẫu, phải ghi rõ nguồn và không kể thành dữ kiện của công ty. Hình có alt/chú thích tiếng Việt và nguồn/tác giả/quyền sử dụng đúng thực tế; lưu hồ sơ nguồn trong `src/assets/lessons/SOURCES.md`. Không tự gán giấy phép CC khi nguồn không công bố.
- Mạch hiện hành: 1.1 database, hai nhóm quan hệ/NoSQL và bảng/dòng/cột; 1.2 SQL Server, SQL/T-SQL/SSMS; 1.3 kiểu dữ liệu và dẫn phụ lục; 1.4 ràng buộc, NULL/NOT NULL, PK/FK; 1.5 database diagram/ERD và một sơ đồ dạng bảng PUBS của Microsoft xuyên suốt.
- Riêng lượt làm lại 1.1–1.5 ngày 03/11/2026, người làm khóa học yêu cầu tự review: tác giả vẫn tự rà và kiểm bằng máy/UI, không giao agent review theo mục 4.5. Ngoại lệ này không đổi quy trình review các lượt khác.

### 2.6 Drawer của sơ đồ (duyệt 31/10/2026)

- Bấm vào một bước, học viên chỉ đọc ba phần: **Đầu vào**, **Thực hiện**, **Kết quả**. Drawer không có liên hệ Excel hay câu lệnh xem dữ liệu; `sql` của bước là bằng chứng để chạy lại, không hiện trên trang.
- **Đầu vào** tự lấy từ bước trước, tối đa 5 dòng. Bước đầu có `input` nêu bảng gốc. Đầu vào phải đủ để hiểu bước đang xét: bước lọc thấy cột của điều kiện, bước `SELECT` thấy cột sắp lấy, bước sắp xếp thấy cột đang sắp; dùng `inputColumns` khi cần. Chọn dòng trích sao cho thấy được điều bước sau làm: hồ sơ bị loại, dòng trùng, thứ tự cần đổi.
- **Thực hiện** bắt đầu từ từ khóa, nói việc bước đó làm với các dòng của tình huống. **Kết quả** nói số dòng, số cột và danh sách cần. Hai phần không lặp nhau, không chép lại điều bảng đã cho thấy. Bước `FROM` gọn: Đầu vào nêu bảng, Thực hiện nói chưa lọc, chưa chọn cột, Kết quả nêu số.
- Khi lời giải chưa đủ để lần ra kết quả, **Thực hiện** có thể thêm `examples`: tối đa hai ví dụ đại diện, mỗi bảng dữ liệu tối đa năm dòng, mỗi ví dụ tối đa năm biểu thức. Nối biểu thức → dữ liệu/phép tính → ô kết quả; chỉ giải các nhóm hoặc trường hợp đủ thấy cơ chế, không liệt kê hết dữ liệu. Ghi rõ phạm vi minh họa là trích hay đủ nhóm mẫu; tổng hợp vẫn dùng toàn phạm vi của bước, không chỉ các dòng trích. Hình nhóm/phép tính là minh họa, không giả là kết quả SQL hoặc bảng mới được lưu. `mark` đánh dấu dòng kết quả được giải. Bảng Đầu vào vẫn tối đa năm dòng; không dùng `checks` của WHERE/CASE để diễn phép tổng hợp.
- Bước `WHERE` có `checks` soi từng hồ sơ qua từng điều kiện, vì `WHERE` xét mọi điều kiện trên mỗi dòng, không lọc nhiều lượt. Tiêu đề điều kiện có tên cột, như `NgayNghiViec IS NULL`. Bảng có cả hồ sơ giữ và hồ sơ loại, mã hồ sơ nằm trong các dòng đang hiện ở Đầu vào. Ô so với `NULL` ghi `UNKNOWN`, không ghi Sai.
- Bước `SELECT` có `CASE` dùng bảng nhánh: mỗi `WHEN` một cột, cột cuối là nhãn, ô sau nhánh đúng ghi `Không xét`, vì `CASE` dừng ở nhánh đúng đầu tiên. Bảng có đủ một hồ sơ dừng ở mỗi nhánh và một hồ sơ vào `ELSE`.
- Lời các bước đi theo yêu cầu của tình huống, bước cuối là kết quả chị Hạnh cần. Các bài chưa chuyển bố cục được viết lại lời khi đến lượt.

### 2.7 Bài phụ lục tra cứu (duyệt 01/11/2026)

- Phụ lục là chương tra cứu riêng, số `PL.1`, `PL.2`…, nằm ngoài các phần chính, không tính vào số mục học hoặc tiến độ/resume. Hai bài đầu luôn là chi tiết kiểu dữ liệu và chuyển đổi kiểu. Bài chính vẫn phải tự đủ kiến thức làm bài tập; phụ lục bổ trợ khi cần hiểu sâu.
- Mở bài nói cách dùng và tiền đề tối thiểu; bảng tra nhanh dẫn từ tên kỹ thuật hoặc tác vụ tới phần giải thích. Mỗi nhóm có mục đích, cú pháp/tham số, đầu vào/kiểu trả về, ví dụ và kết quả kèm lý do, giới hạn cùng cách tránh lỗi thường gặp. Danh mục kiểu dữ liệu phải đủ kiểu dựng sẵn, có dung lượng/miền giá trị/đơn vị; kiểu hiếm chỉ cần mục đích và giới hạn, không ép ví dụ riêng cho từng kiểu.
- Đây là **biến thể tra cứu**, không áp khung tình huống đơn/hai tiểu mục, giới hạn bài nền hay bắt buộc Chat/LineMap/RunFlow/Ứng dụng/Memo/Exercises. Không thêm vào allowlist bài cũ. Vẫn giữ quy tắc viết gọn từng đoạn, giải thích thuật ngữ, highlight, thụt lề, kiểm số liệu và review độc lập.
- Được dùng `SELECT` trên hằng số hoặc bảng dẫn xuất `VALUES` để cô lập cơ chế; giải thích cách đọc chúng trước khi yêu cầu tự làm. Ví dụ chỉ đọc, ghi rõ kết quả là tính từ giá trị minh họa, không suy thành dữ kiện mới của công ty. Khuôn cú pháp/đoạn chỉ để đọc dùng `copy={false}`. Nêu nơi chạy phù hợp, không hứa allowlist bài tập web hỗ trợ mọi ví dụ phụ lục.
- Có ít nhất ba câu tự kiểm tra sau phần giải thích: chọn cách dùng, dự đoán kết quả, sửa lỗi. Đề và mọi dữ kiện cần trả lời phải nhìn thấy khi đáp án đang đóng; câu SQL dài đặt trước `details`, biểu thức ngắn có thể đặt trong `summary`. Đáp án đặt trong `details`, ngắn và giải thích được vì sao; phần cốt lõi không ẩn trong disclosure. Không thêm YAML/chấm tự động nếu chưa nằm trong phạm vi được duyệt.
- Chuẩn nội dung là SQL Server 2025 và Azure SQL hiện hành; không cần tương thích ngược. Tính năng khác trạng thái phát hành/preview giữa nền tảng phải ghi rõ, không tự đổi thiết lập database để kiểm. Nguồn kỹ thuật là tài liệu Microsoft hiện hành; phân biệt giới hạn theo tài liệu, SQL đã chạy và phần môi trường chưa hỗ trợ. Một bảng chuyển kiểu rút gọn phải nói rõ phạm vi và dẫn nguồn đầy đủ, không tự nhận bao phủ mọi cặp.
- Bảng tra dùng vùng cuộn riêng và liên kết phần rõ nghĩa. Tên kiểu/hàm quan trọng được đưa vào từ khóa tìm kiếm. Liên kết giữa phụ lục giúp tránh lặp danh mục, nhưng không thay lời giải cần có tại chỗ. Mỗi bài có review độc lập theo §4.5; sau cả chương có review tích hợp và ma trận xử lý theo §4.6.

### 2.8 Bài luyện Arcade (duyệt 03/11/2026)

- Mỗi bài là một file `src/content/arcade/<chương>/<id>.yaml`. Bài luyện tách khỏi bài học, không tính vào tiến độ bài học và không kể tiếp câu chuyện ở `docs/ho-so-cong-ty.md`.
- Bối cảnh là nhân sự và các mảng gần như tuyển dụng, đào tạo, tài sản, công tác phí, phúc lợi. Mỗi bài tự khai bảng riêng, chỉ gồm vài cột cần thiết. Dữ liệu đều giả; đề tự soạn, không chép đề hoặc dữ liệu của nền tảng khác.
- Chỉ dùng từ khóa đã dạy tới hết chương đó, xem bảng dưới. Một bài được trộn kiến thức các chương trước. Bài có phép tính số, `<>`, `>`, `<`, `NOT IN`, `NOT LIKE`, `PERCENT`, `WITH TIES`, `YEAR()`, `REPLACE`, `CHARINDEX`, `FORMAT` chỉ được dùng khi đọc lại bài học thấy đã dạy.
- Đề nói rõ cột, thứ tự cột, thứ tự dòng và phạm vi dòng. Bộ chấm không so tiêu đề cột, nên không ra bài mà mục tiêu duy nhất là đặt tiêu đề. `ordered: true` thì sắp xếp phải có tiêu chí phụ để không hòa, hoặc đề nói rõ giá trị dùng để xếp không trùng. Đề không phụ thuộc ngày hiện tại: dùng mốc cố định, không dùng `GETDATE()` trong đáp án. Không gợi ý trong đề.
- Số trong đề viết liền như sẽ gõ trong câu lệnh, không có dấu chấm ngăn cách hàng nghìn. Nhãn học viên phải ghi đúng từng chữ thì đặt trong dấu nháy “…”.
- Chuỗi tiếng Việt trong SQL có `N`. Ngày trong YAML phải có dấu nháy. Kiểu cột ở cấp Cơ bản chỉ dùng `varchar`, `nvarchar`, `date`, `decimal`, là bốn kiểu bài 1.3 đã dạy.
- `columns` có thể là tiêu đề nghiệp vụ tiếng Việt để người học tự tìm cột trong bảng. Tên cột trong bảng không chứa khoảng trắng: bài 2.1 chỉ dạy ngoặc vuông cho tiêu đề sau `AS`.
- Mỗi bài có ít nhất 2 unit test và 3 hidden test. Mỗi hidden test bắt một lỗi cụ thể, ghi thành `catches`: một câu sai qua hết unit test nhưng trượt test đó. Ưu tiên lỗi người học chương đó có thể mắc, như nhầm hai cột gần tên: unit test để hai cột trùng giá trị, hidden test mới khác nhau. Hidden test không đòi kiến thức ngoài đề; đề đã nói phạm vi thì dữ liệu ẩn chỉ kiểm phạm vi đó.
- Phân bố: 20 bài Dễ, 20 bài Vừa, 10 bài Khó.
- Sau mỗi chương, chạy `npm --prefix api run check:arcade -- <chương>`, đọc lại `expected` bằng mắt, rồi review theo §4.5 như một bài: làm từng đề như người mới chỉ học tới chương đó, trước khi xem `answer`.

| Chương | Bài (Dễ/Vừa/Khó) | Từ khóa thêm ở chương | Bẫy chính của hidden test |
|---|---|---|---|
| 2-1 | 5 (4/1/0) | `SELECT`, `*`, `AS`, `FROM` | Nhầm cột gần tên, thêm dòng, ô `NULL` trong cột được chọn, dòng trùng phải giữ |
| 2-2 | 6 (3/3/0) | `WHERE`, `=`, `>=`, `N'…'`, ngày dạng `yyyymmdd` | Giá trị ở biên, mã gần giống, không có dòng nào đạt |
| 2-3 | 7 (3/3/1) | `AND`, `OR`, ngoặc, `IN`, `BETWEEN`, `LIKE`, `%`, `_` | Thiếu ngoặc, hai đầu `BETWEEN`, nhầm `_` với `%`, tiền tố gần giống |
| 2-4 | 5 (2/2/1) | `ORDER BY`, `ASC`, `DESC`, `TOP` | Thiếu tiêu chí phụ, ít hơn n dòng, đảo thứ tự chèn |
| 2-5 | 5 (2/2/1) | `IS NULL`, `IS NOT NULL`, `COALESCE`, `ISNULL` | Chuỗi rỗng, chữ `NULL`, `<>` bỏ mất dòng `NULL` |
| 2-6 | 4 (2/1/1) | `DISTINCT` | Trùng trên nhiều cột, nhiều `NULL` gộp một dòng, sai phạm vi cột |
| 2-7 | 6 (2/2/2) | `UPPER`, `LOWER`, `LEN`, `LEFT`, `RIGHT`, `SUBSTRING`, `TRIM`, `CONCAT`, `COLLATE` | Khoảng trắng đầu cuối, chuỗi ngắn hơn độ dài cắt, ô `NULL`, có dấu và không dấu |
| 2-8 | 6 (1/3/2) | `CAST`, `DATEADD`, `DATEDIFF`, `EOMONTH`, `MONTH`, `<=` | Biên tháng, năm nhuận, `DATEDIFF` đếm ranh giới |
| 2-9 | 6 (1/3/2) | `CASE`, `WHEN`, `ELSE` | Thứ tự nhánh, thiếu `ELSE` ra `NULL`, ô `NULL`, giá trị ở biên |

## 3. Số liệu và hình

- Mọi câu lệnh và con số đưa vào bài, kể cả giá trị ví dụ và nguyên văn lỗi, được chạy trên database khóa học trước khi viết (mục 5).
- Con số nói rõ đếm gì và trên phạm vi nào ("10 hồ sơ còn trỏ tới VH, gồm 2 người đã nghỉ"): hồ sơ khác người, toàn bộ dữ liệu mẫu khác một kỳ. Phân biệt "tối đa một" với "đúng một", quy ước của bộ mẫu (NULL ở `NgayNghiViec` là chưa nghỉ) với điều SQL Server bảo đảm.
- Nói rõ đang nhìn thẻ tóm tắt, bảng trích trong drawer hay toàn bộ kết quả. Dữ liệu thật đã kiểm không gọi là giả lập vì chỉ hiện một phần; bảng/hình tự dựng phải nói rõ là minh họa. Không đưa thêm câu lệnh trước kiến thức cần thiết chỉ để chứng minh mọi con số cho người mới.
- Trước bài 3.1, câu minh họa cho xem dữ liệu (liệt kê 10 hồ sơ), không tóm tắt bằng `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`; test chặn điều này ở Level 1.
- Hình đánh dấu đúng chỗ phần chữ nói: `mark` của `Ssms`, `Result`, `Excel`, `path` của `Erd`; chú thích hình nói phần nào được đánh dấu. Hình mô phỏng giữ những chi tiết mang nghĩa (ví dụ số dòng nhảy cóc sau khi lọc, dùng `rowNumbers` của `Excel`).
- Đáp án bài tập không được xuất hiện nguyên văn ở bất kỳ trang nào (`check:dist` kiểm); câu ví dụ trong bài cũng không được nộp đúng cho bài tập.

## 4. Quy trình làm một bài (cập nhật 13/11/2026)

Điểm vào và phạm vi đọc ở [bien-soan.md](bien-soan.md). Quy trình này áp dụng cho Codex và Claude; đọc theo tác động, giữ nguyên chuẩn nội dung và an toàn dữ liệu.

### 4.1 Trước khi viết

- Chốt mục tiêu quan sát được, tiền đề, tình huống/phạm vi dữ liệu, phần giữ và phần ngoài bài trong gói giao việc ở hồ sơ hiện có; dùng mẫu trong bien-soan.md, không tạo brief/plan trùng nội dung. Bài nền không ép có tình huống. Phân ý thành phải hiểu để làm bài / cần nhận biết / tùy chọn; mọi tiền đề của đề bắt buộc phải nằm trong phần giảng bắt buộc.
- Đọc bài/YAML đang sửa, các mục quy ước và bài trước cần cho thay đổi. Đọc hồ sơ công ty khi dùng tình huống/số liệu; mở template/bài mẫu khi viết mới hoặc đổi cấu trúc, không đọc lại toàn bộ sau mỗi chỉnh chữ.
- Trước khi dựng đủ khối, tự lần một dòng/nhóm đại diện: đầu vào nào, thao tác nào, vì sao tạo từng ô kết quả. Khi cách giảng chưa rõ, chốt đoạn ngắn trước; cập nhật theo mẫu đã chốt không cần mở lại một vòng thiết kế.
- SQL/số liệu mới hoặc đổi phải kiểm theo mục 5. Chỉ đổi câu chữ thì đối chiếu nghĩa và bằng chứng hiện có; không nhận đã chạy lại khi chưa chạy. Khẳng định mới về schema phải kiểm schema/source và nêu rõ giới hạn đối chiếu live.

### 4.2 Viết theo mục tiêu

Theo biến thể trong template; giữ cấu trúc, định dạng và các mục 1–3. Lời văn giải thích mục đích/cơ chế, LineMap gắn phần câu với tác dụng, RunFlow minh họa chuyển đổi bằng dữ liệu, Memo dùng để ôn. Không chép cùng lời giải ở mọi khối.

Phần giải thích cốt lõi phải đọc được trước khi mở drawer. Excel làm cầu nối khi phù hợp; không mặc định người học biết VBA, VLOOKUP, PivotTable hoặc Evaluate Formula. Dùng ví dụ đại diện, không giảng hết mọi dòng. Không tự tạo hình, mockup hay sửa component nếu các khối sẵn có đã diễn đạt đủ; khi cần sửa công cụ, ghi thành phạm vi riêng.

### 4.3 Tự rà trước review

- Mục tiêu → lời giảng → từng đề nối được; thuật ngữ giải nghĩa tại chỗ hoặc có tiền đề cụ thể.
- Người mới lần được dữ liệu → thao tác → kết quả → câu trả lời; đủ điều kiện, đúng đơn vị/phạm vi, không hứa quá.
- Cắt đoạn lặp/vòng vo; phần Hay nhầm nêu lỗi và hậu quả, không bổ sung kiến thức bắt buộc chưa dạy.
- Kiểm các khối thật sự dùng theo mục 2: hình/đánh dấu, SQL/LineMap/RunFlow/Result, code/bold, tự kiểm và bài tập; không bỏ bảo vệ số liệu/đáp án vì đổi cách diễn đạt.

### 4.4 Kiểm bằng máy theo tác động

| Thay đổi | Kiểm bắt buộc trong vòng sửa |
|---|---|
| Chỉ chính tả/câu chữ, SQL/dữ liệu/YAML/cấu trúc giữ nguyên | Test nội dung liên quan; đối chiếu diff; build/HTML phần sửa. Không tự chạy lại mọi đáp án |
| Định nghĩa, điều kiện hoặc cách giải thích | Như trên, thêm đối chiếu nguồn/bằng chứng cho khẳng định mới và tiền đề từng đề; review độc lập |
| SQL, số liệu, YAML/bài tập | Kiểm query/kết quả liên quan theo mục 5; npm --prefix api run build rồi npm --prefix api run check:exercises; npm --prefix api run check:data sau luồng ghi hoàn tác |
| Component/runner/API/đường thực hành chung | Test hồi quy phần bị ảnh hưởng, build/HTML và tương tác/API thực tế tương ứng; review tích hợp |
| Nghiệm thu bản phát hành | npm test, npm run check, npm run build, npm run check:dist; bài tập/runner đổi thì kiểm API như trên; UI thay đổi thì kiểm tương tác liên quan |

check:exercises hiện kiểm toàn bộ, chưa hỗ trợ lọc ID; không tự bịa tham số lọc hoặc sao chép lệnh kiểm của repo khác. Không sửa runner chỉ để tối ưu một lượt biên tập. Bằng chứng đã có chỉ tái dùng khi source và các phụ thuộc liên quan không đổi: ghi nội dung đã kiểm, nguồn/lệnh và kết quả, phiên bản hoặc hash, giới hạn và điều kiện cần kiểm lại. Commit đơn lẻ không đủ khi còn diff; hash ghi sau không chứng minh bản đã kiểm trước. Thiếu căn cứ thì ghi chưa đủ điều kiện tái dùng. SQL, dữ liệu hoặc component liên quan đổi thì kiểm lại phần bị tác động; không lặp cả bộ vì sửa report.

Khi đổi cấu trúc, sửa assertion giữ ý nghĩa/kiến thức cần bảo vệ, không khóa cứng câu chữ. Không thêm bài vào danh sách cho phép khung cũ. Lỗi nền ghi đúng test, phạm vi và kết quả, không nới test để báo đạt. Đọc HTML không chứng minh đã thử drawer/copy/bàn phím; ghi riêng kiểm thực tế và giới hạn.

### 4.5 Review độc lập

Bài mới hoặc sửa nội dung đáng kể cần một reviewer ngữ cảnh mới sau khi tác giả đã kiểm. Chỉnh chính tả thuần túy không bắt buộc mở reviewer mới. Mỗi bài trong một gói có review riêng; không bỏ review vì muốn tiết kiệm usage.

- Codex: model gpt-6.1-terra, reasoning_effort high, fork_turns none; Claude: Sonnet, effort **high**. Ghi đúng cấu hình, không nhận đã xác minh model thực tế nếu công cụ không xác nhận.
- Không truyền lịch sử viết, report cũ hoặc kết luận tác giả. Giao đường dẫn bài/YAML, mục tiêu, tiền đề cần đọc, quyết định đã duyệt, commit/diff, build khớp hoặc chưa có, công cụ được dùng và đường dẫn report mới.
- Reviewer chỉ ghi report; không sửa sản phẩm/test/Git, đọc seed/secret, chạy SQL/API hoặc tạo agent khác. Đúng thì công nhận, không có finding là hợp lệ.
- Reviewer đọc toàn bộ bài, các khối/drawer và từng đề, tự xác định cách làm trước khi xem answer; không lấy bài sau/đáp án/kiến thức chuyên gia bù phần chưa dạy. Không chép đáp án vào report.
- Chỉ dùng browser khi được giao, giữ nháp/clipboard. Phân biệt bảng trích/tổng thật, sơ đồ logic/thực thi vật lý, đọc HTML/tương tác thật; thiếu bằng chứng thì ghi chưa xác minh.
- Tách sai có căn cứ, thiếu tiền đề, đã dạy nhưng khó tìm và biên tập. Report có vị trí/câu gốc ngắn, tác động, đề xuất, phần giữ được, bảng tiền đề từng đề và giới hạn; không có hạn ngạch finding/điểm số. Câu chữ gây hiểu sai là lỗi cần xử lý, không hạ mức chỉ vì đoạn sửa ngắn.
- Hết hạn mức thì tiếp tục đúng agent/lượt; không tạo reviewer thay thế, đổi model hoặc review lại từ đầu. Giữ report đã hoàn tất, lượt mới có đường dẫn mới.

Giữ bốn dòng vai trò trong prompt:

~~~text
Đóng vai Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học Microsoft SQL Server để đủ hiểu và phản biện developer.
Học thử từ góc nhìn người học, soi từng câu từng chữ: chỗ mơ hồ, thuật ngữ chưa giải thích, thiếu điều kiện, ví dụ gây hiểu nhầm hoặc kiến thức không chính xác.
Review chân thật: có lỗi thì chỉ rõ và giải thích; đúng thì công nhận; chưa xác minh được thì nói rõ, không đoán hay cố bới lỗi.
Phải luôn tự đặt ra các câu hỏi tại sao, để làm gì, vì sao như thế,..., và xem bài học có trả lời được hay không.
~~~

Giả định chỉ biết Excel văn phòng cơ bản, chưa biết SQL/lập trình/DBA. Gói giao chỉ dẫn đúng mục quy ước/template/hồ sơ và bài tiền đề cần đọc; người review được mở rộng khi có phụ thuộc chưa rõ, không mặc định đọc toàn bộ repo.

**Review tích hợp:** thêm agent mới khi thay đổi quan hệ/tiền đề giữa nhiều bài, số bài/tiến độ, component/API/runner hoặc đường thực hành chung. Hai bài độc lập chỉ sửa lời giảng không tự tạo vòng tích hợp. Agent tích hợp được đọc evidence giao kèm base/head hoặc diff, phải phân biệt bằng chứng của tác giả với kiểm tự thực hiện; không lặp review toàn bộ từng bài.

### 4.6 Sửa theo review và bàn giao

1. Đọc hết report, xác minh nhận xét bằng nguồn/script/SQL được phép khi cần. Giao sửa theo finding: vị trí, vấn đề, tác động, tiêu chí hết lỗi. Gom sửa theo đoạn; không thêm cảnh báo hiếm chỉ để làm reviewer hài lòng.
2. Ghi Làm theo/Làm một phần/Không làm theo với căn cứ, kể cả mục nhỏ; giữ nguyên report gốc. Không đổi seed/API/đáp án ngoài phạm vi.
3. Kiểm lại đoạn sửa cùng lời giải thích, kết quả và bài tập phụ thuộc. Tiếp tục cùng reviewer để làm rõ hoặc xác nhận sửa khi cần; chỉ mở review đáng kể khi còn lỗi trọng yếu, thiếu tiền đề hoặc có sửa lớn. Không chốt bài còn lỗi để giữ số vòng; nếu lặp mà chưa xử lý được, xác định nguyên nhân và báo điểm mắc.
4. Một hồ sơ của lượt giữ mục tiêu, quyết định, phần sửa, report và bằng chứng/giới hạn. Cập nhật spec/plan bằng trạng thái và liên kết, không chép toàn bộ nội dung vào nhiều file. Có thêm dữ kiện công ty thì cập nhật hồ sơ công ty.
5. Bàn giao bài đang làm, việc đã xong, finding còn mở, bước tiếp theo và đường dẫn bằng chứng trong cùng hồ sơ; tiếp tục từ đây, không đọc lại toàn bộ lịch sử. Theo dõi chi phí từng vai/giai đoạn theo bien-soan.md, thiếu log ghi thiếu. Không dùng Ready làm quyền push/deploy; an toàn và quyền thực hiện theo mục 5.

### 4.7 Bài giảng trình chiếu (duyệt 01/11/2026)

- Biến thể giảng lại khái niệm: mỗi slide có hình mang ý nghĩa và 2–3 câu diễn giải cốt lõi luôn hiện, không dùng câu hỏi/ghi chú để dạy bù định nghĩa. Hình so sánh có/không ràng buộc phải ghi rõ giả định và điều kiện không có luật khác; sơ đồ schema thật không được giả là đã bỏ khóa. Số slide/câu hỏi theo thiết kế từng bộ, không giữ cố định 20 slide hoặc 4 câu của bản ôn cũ.

Mẫu MDX và cách thêm bộ mới tại [presentation-template.md](presentation-template.md).

- Slide tổng hợp là biến thể riêng trong collection `presentations`, không thay bài đầy đủ và không ghi tiến độ. Mỗi bộ có metadata `sourceLessons`, mục tiêu/thời lượng, ID slide ổn định và ghi chú người giảng.
- Màn chiếu giữ ít chữ, ưu tiên bảng trích/sơ đồ có nhãn đọc được. Điều kiện ảnh hưởng kết luận phải hiện cùng ví dụ, không chỉ nằm trong ghi chú. Hình mô phỏng công cụ phải ghi rõ mô phỏng.
- Mỗi slide có ghi chú ý cần nói, hiểu nhầm thường gặp, giải thích, thời lượng và liên kết bài nguồn. Ghi chú không render vào trang chiếu cho lớp; trang người giảng vẫn là nội dung công khai của khóa học.
- Câu hỏi cả lớp có đủ tiền đề trước khi hiện lời giải. Chế độ trình chiếu mở lời giải theo bước; bản không JavaScript dùng `details`. Không thêm câu ghi dữ liệu hoặc thực hành khi bộ slide chỉ ôn bài nền.
- Nội dung giữ quy tắc chính xác, Excel, giá trị dẫn chứng và nguồn của bài gốc. Không ép slide theo cấu trúc bài đầy đủ hoặc giới hạn từ của bài nền. Review độc lập cả bộ như một bài giảng, thêm review tích hợp khi đổi khung chiếu.

## 5. Database của khóa học và thao tác ra ngoài

- Database của khóa học dùng chung cho mọi học viên, dữ liệu không được đổi. Đọc bằng MCP `azure-sql` chỉ với `SELECT`, dù cấu hình báo cho phép ghi. Câu làm đổi dữ liệu chỉ chạy qua API bài tập hoặc `check:exercises`, trong giao dịch luôn hoàn tác; xong thì chạy `check:data`. Không chạy backup hay restore. Việc nào cần ghi thật thì dừng lại và hỏi.
- Database `arcade` tách khỏi database khóa học. Schema `dbo` luôn rỗng và chỉ được ghi trong transaction hoàn tác; schema `arcade` giữ coin và tiến độ thật của học viên, chỉ đổi qua API hoặc khi người làm khóa học yêu cầu.
- Không gõ, in hay commit mật khẩu SQL, mã truy cập hay secret nào; người làm khóa học tự điền.
- Push lên GitHub chỉ khi người làm khóa học đồng ý: push lên `main` là đăng bài lên web. Lệnh `az` tạo hay sửa tài nguyên thì đưa lệnh ra và chờ đồng ý trước; lệnh chỉ đọc thì không cần.
- Sau mỗi vòng sửa: sửa cả các mục nhỏ; cập nhật spec, plan và ghi chú cho khớp với những gì đã làm.
