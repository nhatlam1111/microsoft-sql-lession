# Quy ước của khóa học

Mọi quy ước khi viết bài, review bài và làm việc với database của khóa học nằm ở file này. Khung bài và các khối dùng được nằm ở [`lesson-template.md`](lesson-template.md); hiện trạng công ty, nhân vật và những gì các bài đã kể nằm ở [`ho-so-cong-ty.md`](ho-so-cong-ty.md). Có quy ước mới thì ghi vào đây, trong cùng commit với thay đổi đầu tiên áp dụng nó.

**Chuẩn hiện hành, duyệt ngày 20/10/2026:** lấy [`bài 1.1`](../src/content/lessons/1-1-database-la-gi.mdx) làm mẫu về mạch kể, độ sâu và cách đánh dấu chữ. Excel và SQL được giải thích trong cùng một phần chính, có tiêu đề theo chủ đề của bài. Khung này thay các yêu cầu tách "Với Excel" / "Làm bằng SQL" trong spec, plan và mockup cũ. Các bài đang có được chuyển khung khi chỉnh từng bài; không viết bài đầy đủ mới theo khung cũ.

## 1. Viết gọn

- **Không dài dòng.** Mỗi đoạn một ý, tối đa khoảng bốn câu; một ý nói được bằng một câu thì không viết hai câu. `npm test` chặn đoạn văn quá 120 chữ trong bài đầy đủ.
- **Không vòng vo.** Câu đầu đoạn nói ngay ý chính. Bỏ câu dẫn rỗng ("Cần lưu ý rằng…", "Như đã biết…", "Nói cách khác…") và các câu rào đón không thêm thông tin.
- **Không lặp ý.** Mỗi ý nói một lần, ở chỗ người học cần nó; chỗ khác thì trỏ về ("xem Hay nhầm 2", "bài 1.3"). "Hay nhầm" nêu lỗi và hậu quả; "Ứng dụng" nêu việc làm được nhờ chủ đề của bài, kèm mục đích cụ thể. Câu trả lời tình huống không giảng lại câu lệnh. Chỉ "Ghi nhớ" và câu tự kiểm tra được nhắc lại ý đã có, vì đó là phần ôn.
- **Điều kiện và "vì sao" viết bằng một vế câu**, không bằng một đoạn. Chi tiết ngoài phạm vi bài (trường hợp hiếm, tùy chọn của công cụ, lịch sử tính năng) thì bỏ, hoặc trỏ sang bài đi sâu hơn.
- **Khi sửa theo review:** ưu tiên sửa câu đang có hơn thêm câu mới. Mỗi lần thêm một ý, tìm chỗ cắt bớt; mục review chỉ đúng ở trường hợp hiếm thì ghi "Không làm theo" kèm lý do.

## 2. Nội dung bài

- Tình huống, nhân vật, con số khớp [`ho-so-cong-ty.md`](ho-so-cong-ty.md): cùng công ty, cùng thời điểm (tháng 10/2026), cùng người hỏi (chị Hạnh, Phòng Nhân sự). Nhân vật mới không trùng tên với hồ sơ trong bộ mẫu; nhắc tới hồ sơ thì gọi bằng mã. Bài kể thêm điều mới về công ty thì ghi vào mục 7 của file đó.
- Xưng "bạn", câu ngắn. Giải thích thuật ngữ ngay lần đầu xuất hiện.
- Không nhắc vai trò hay xuất thân của người đọc ("BA", "developer", "hồi làm tư vấn"); tình huống là yêu cầu công việc trung tính. Mục dùng bài vào việc thật tên là "Ứng dụng".
- Dùng "kết bảng" cho `JOIN`, không dùng "nối bảng" hay "ghép". Không dùng các cụm trong `BANNED_PHRASES` (`src/lib/lesson-schema.ts`), không dùng emoji.
- Phần giảng tự trả lời "vì sao, để làm gì, cái giá là gì" bằng lời dẫn liền mạch; câu hỏi nằm ở tình huống và phần tự kiểm tra. Cơ chế SQL Server tự làm thì gọi đúng tên (chuyển kiểu ngầm) và nói gặp lại ở bài nào.
- Mỗi dòng `LineMap` có "Ví dụ:" với giá trị cụ thể: giá trị nào qua, bị từ chối hay bị đổi.
- Cuối lý thuyết có đoạn "Ở bài này chỉ cần…" kể các bài đi sâu hơn ("bài 5.2").
- Giải thích trong drawer của `RunFlow` bắt đầu từ từ khóa của bước: nó làm gì với các dòng, kèm số dòng thật.
- Không hứa điều database không tự bảo đảm. Ràng buộc chỉ có khi được khai báo ("khi `MaNV` được khai báo là khóa chính…"). Tách "hợp lệ" với "đúng", "lưu được" với "đúng ý". Khóa ngoại là luật kiểm khi ghi, không phải ô chọn trên màn hình; nó xác nhận mã có thật, không xác nhận mã đúng.
- Không tuyệt đối hóa Excel (có Data Validation, có làm việc chung, `SUM` bỏ qua ô chữ); nói điều kiện của tình huống.
- `TOP (n)` là tối đa n dòng. Kết quả không có `ORDER BY` thì nói thứ tự dòng có thể khác hình. `TOP` đi cùng `ORDER BY`, trừ khi bài đang nói đúng chuyện không có `ORDER BY`. Thứ tự trong `RunFlow` là thứ tự xử lý logic, không phải cách SQL Server đọc dữ liệu.
- Lời hứa của công cụ nói rõ phạm vi: hoàn tác chỉ có trên trang bài tập, SSMS chạy thật; lỗi 40613 thường do database đang thức dậy, lỗi kéo dài thì gửi nguyên văn cho người phụ trách.
- Tình huống được khép lại ngay trong phần chính: có giả định rõ (mốc thời gian, phạm vi) và câu trả lời cho người hỏi, tách việc database làm với quyết định nghiệp vụ. Bài có truy vấn trả lời ngay cạnh câu lệnh và kết quả. Bài khái niệm trả lời bằng lời trong mạch giải thích. Không tách thêm mục "Trả lời chị Hạnh".
- Bài khái niệm có ít nhất ba câu tự kiểm tra, bao phủ mục tiêu đầu bài; không chỉ hỏi các trường hợp ngoại lệ. Mỗi đáp án ngắn và tự đủ nghĩa.
- SQL: chuỗi tiếng Việt có `N`; dòng code trong `Sql` và `RunFlow` không bắt đầu bằng dấu cách (MDX xóa). Đoạn chỉ để đọc (câu ghi dữ liệu, đoạn trích có `...`, khuôn cú pháp) có `copy={false}`. Level 1 không bảo học viên chạy `INSERT`, `UPDATE`, `DELETE` trong SSMS.

### 2.1 Khung bài và độ sâu

- Thứ tự bài đầy đủ: **Tình huống → phần chính có tiêu đề theo chủ đề → Hay nhầm ở đâu → Ứng dụng → Ghi nhớ → Bài tập**. Bài `noExercises: true` bỏ mục Bài tập và có các câu tự kiểm tra ngay sau Ghi nhớ. Bản tóm tắt giữ khung riêng ở `lesson-template.md`.
- Phần chính đi từ vấn đề trong tình huống, qua khái niệm cần biết và cách Excel/SQL xử lý, tới câu trả lời. Dùng khoảng 2–4 tiểu mục theo ý nghĩa; không bắt buộc chép đúng ba tiểu mục của bài 1.1. Mỗi lần chuyển từ Excel sang database/SQL phải có lời dẫn rõ.
- Khái niệm và ví dụ đứng cạnh nhau. Dùng hình, câu lệnh, kết quả, `LineMap` hay `RunFlow` khi chúng giúp hiểu ý đang nói; không bắt buộc có đủ mọi khối hoặc một bảng so sánh dài. Không giải thích trong lời văn rồi chép nguyên ý vào bảng.
- Bài khái niệm chưa cần thực hành thì không chèn preview SQL cho đủ khuôn; dẫn sang bài thực hành tương ứng. Bài truy vấn có câu lệnh giải đúng tình huống và kết quả đã kiểm. Nếu có `RunFlow`, hai tiểu mục cuối phần chính là "Câu lệnh cho tình huống" rồi "SQL Server chạy câu này thế nào"; lời giải tình huống nằm cạnh kết quả trước sơ đồ.
- Giữ kiến thức đủ để hiểu và xử lý yêu cầu của bài. Chi tiết sâu đã có bài riêng thì nêu điều kiện bằng một vế câu và dẫn bài; không biến bài nhập môn thành bài về kiểu dữ liệu, khóa, import hay giao dịch. Ví dụ ở bài 1.1, giữ "hệ thống có lưu lịch sử" nhưng để cách lưu ở bài 6.6; bộ mẫu chỉ giữ phòng ban hiện tại.
- Bài khái niệm đơn giản hướng tới 10–12 phút gồm tự kiểm tra; bài phức tạp ghi thời lượng theo nội dung thực tế. Rút bằng cách cắt lặp và giảm độ sâu ngoài mục tiêu; giữ phần giảng chính luôn hiển thị, không giấu sau tab/khối bấm mở để trông ngắn hơn.

### 2.2 In đậm khái niệm, highlight dẫn chứng

- **Khái niệm trọng tâm in đậm có chọn lọc** ở chỗ định nghĩa và đối chiếu: `**database**`, `**workbook**`, `**sheet**`, `**bảng**`, `**dòng**`, `**cột**`, `**kiểu dữ liệu**`, `**khóa chính**`… Không bôi đậm mọi lần xuất hiện hoặc cả đoạn.
- **Dẫn chứng dữ liệu dùng code có nền** trong lời giải thích: mã, tên, ngày, số cụ thể được lấy từ dữ liệu; ví dụ viết `` `NV005` ``, `` `KT` ``, `` `KD` ``, `` `Kế toán` ``, `` `Ke toan` ``. Tên bảng/cột, kiểu SQL, từ khóa, `NULL` và địa chỉ ô cũng dùng code: `` `NhanVien` ``, `` `MaPB` ``, `` `date` ``, `` `C4` ``. Trong `<summary>`, có thể dùng `<code>MaNV</code>`.
- Giữ nguyên giá trị, dấu tiếng Việt và cách viết của dẫn chứng; phần chữ giải thích giá trị nào thì highlight đúng giá trị đó. Nhân vật giả định, vai phòng ban trong câu chuyện, số bài và mốc tháng của tình huống vẫn là lời văn thường, không tự biến thành giá trị truy xuất.
- Khối Excel/SSMS/Results giữ cách hiển thị của công cụ. Dùng `mark`, `numeric`, `rowNumbers`, `path` đúng dữ liệu đang chỉ; không chèn dấu backtick vào chuỗi ô hay sửa component chung chỉ để định dạng một dẫn chứng. Hình giả lập phải nói rõ là minh họa nếu không phải kết quả thật của database.
- Markdown nội dòng áp dụng ở lời văn MDX. Chuỗi thuộc tính của component chỉ dùng định dạng mà component hỗ trợ; kiểm bản render để không để lộ dấu backtick như ký tự thường.

### 2.3 Mục Ứng dụng

- Viết 2–4 ý theo dạng **Tên ứng dụng:** việc làm được nhờ kiến thức của bài, kèm mục đích hoặc ví dụ công việc. Chủ đề quyết định ứng dụng, không dùng cùng một danh sách lời khuyên chung cho mọi bài.
- Bài database nói về nguồn lưu trữ thống nhất, kiểm dữ liệu bằng luật đã khai báo, tra cứu/lập báo cáo và lịch sử khi có thiết kế lưu lịch sử. Bài `WHERE` nói về lọc danh sách theo điều kiện; bài kết bảng nói về lấy thông tin qua các bảng liên quan.
- Chỉ nêu khả năng trong phạm vi bài đã giải thích. Không hứa database tự biết dữ liệu đúng, tự đồng bộ mọi file Excel hoặc tự lưu lịch sử. Điều kiện viết ngay trong ý ứng dụng, không thêm một đoạn rào đón riêng.
- Lời khuyên kiểm nguồn file, đọc đặc tả hoặc chuẩn bị import chỉ dùng khi đó là chủ đề cần áp dụng; không thay cho ứng dụng cụ thể của kiến thức SQL/database đang học.

## 3. Số liệu và hình

- Mọi câu lệnh và con số đưa vào bài, kể cả giá trị ví dụ và nguyên văn lỗi, được chạy trên database khóa học trước khi viết (mục 5).
- Con số nói rõ đếm gì và trên phạm vi nào ("10 hồ sơ còn trỏ tới VH, gồm 2 người đã nghỉ"): hồ sơ khác người, toàn bộ dữ liệu mẫu khác một kỳ. Phân biệt "tối đa một" với "đúng một", quy ước của bộ mẫu (NULL ở `NgayNghiViec` là chưa nghỉ) với điều SQL Server bảo đảm.
- Trước bài 3.1, câu minh họa cho xem dữ liệu (liệt kê 10 hồ sơ), không tóm tắt bằng `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`; test chặn điều này ở Level 1.
- Hình đánh dấu đúng chỗ phần chữ nói: `mark` của `Ssms`, `Result`, `Excel`, `path` của `Erd`; chú thích hình nói phần nào được đánh dấu. Hình mô phỏng giữ những chi tiết mang nghĩa (ví dụ số dòng nhảy cóc sau khi lọc, dùng `rowNumbers` của `Excel`).
- Đáp án bài tập không được xuất hiện nguyên văn ở bất kỳ trang nào (`check:dist` kiểm); câu ví dụ trong bài cũng không được nộp đúng cho bài tập.

## 4. Quy trình làm một bài

### 4.1 Trước khi viết

- Đọc `ho-so-cong-ty.md` và các bài đứng trước có liên quan, để không giải thích lại hoặc nói khác đi.
- Chốt giả định của tình huống: mốc thời gian, phạm vi dữ liệu, ai hỏi và cần câu trả lời gì.
- Chốt mục tiêu chính, phần đã học và phần để bài sau; chọn 2–4 nhịp giải thích đủ đi tới câu trả lời. Mở bài 1.1 để đối chiếu cách kể, không chép nguyên ví dụ nhân sự của nó vào mọi bài.
- Chạy mọi câu lệnh và con số sẽ đưa vào bài (mục 5).

### 4.2 Viết theo khung ở `lesson-template.md` và các mục 1–3

1. Viết tình huống và giả định ngắn; chốt một câu hỏi dữ liệu bằng `Key`.
2. Đặt tiêu đề phần chính theo vấn đề cụ thể. Lồng cách Excel và SQL xử lý vào từng ý, giải nghĩa thuật ngữ ngay chỗ dùng.
3. Đặt ví dụ/hình cạnh ý cần minh họa. Bài truy vấn thêm câu lệnh, kết quả và `RunFlow` nếu cần; bài khái niệm dùng lời giải thích, không ép có câu lệnh.
4. Trả lời người hỏi ngay trong phần chính, đúng phạm vi giả định. Dẫn các chi tiết sâu sang bài tương ứng.
5. Viết Hay nhầm bằng lỗi/hậu quả; Ứng dụng bằng khả năng áp dụng của chủ đề; Ghi nhớ và tự kiểm tra theo mục tiêu.
6. Rà lần lượt chữ đậm của khái niệm, code của giá trị dẫn chứng, dấu ô trong hình và các chỗ lặp trước khi chạy kiểm tra.

### 4.3 Tự rà trước khi đưa review

- [ ] Không đoạn nào dài dòng, vòng vo; không ý nào nói hai lần ngoài "Ghi nhớ" và câu tự kiểm tra.
- [ ] Lý thuyết trả lời "vì sao, để làm gì, cái giá là gì"; không có câu hỏi trong lý thuyết.
- [ ] Excel và SQL cùng một phần chính, chuyển ý rõ; ví dụ ở cạnh phần giải thích, không có bảng/khối chỉ để đủ khuôn.
- [ ] Độ sâu và thời lượng phù hợp mục tiêu; điều kiện sâu có chỉ sang bài sau, phần chính luôn nhìn thấy.
- [ ] Khái niệm được in đậm có chọn lọc; mọi giá trị dẫn chứng trong lời văn, tên bảng/cột và địa chỉ ô có kiểu code phù hợp.
- [ ] Ứng dụng đúng khả năng của chủ đề, có việc làm/mục đích cụ thể và điều kiện cần thiết.
- [ ] Mỗi dòng `LineMap` có "Ví dụ:"; có đoạn "Ở bài này chỉ cần…".
- [ ] Không câu nào hứa quá; con số nói rõ đếm gì và đã chạy lại.
- [ ] Hình đánh dấu đúng chỗ, chú thích nói phần được đánh dấu.
- [ ] Tình huống được khép lại, khớp hồ sơ công ty; Excel được tả đúng.
- [ ] `copy={false}` cho đoạn chỉ để đọc; bài khái niệm có ít nhất ba câu tự kiểm tra bao phủ mục tiêu, gồm thuật ngữ nền tảng.

### 4.4 Kiểm bằng máy

1. Câu làm đổi dữ liệu (để lấy nguyên văn lỗi) chỉ chạy qua API bài tập trên máy, có hoàn tác; xong thì `npm --prefix api run check:data`.
2. Bài có bài tập: `npm --prefix api run build` rồi `npm --prefix api run check:exercises`.
3. `npm test`, `npm run check`, `npm run build`, `npm run check:dist`.
4. Mở bản build trên máy, xem các hình có đánh dấu và các khối mới.

Khi chuyển một bài cũ sang khung mới, cập nhật các test đang kiểm tiêu đề cũ thành kiểm ý nghĩa còn phải giữ; không xóa bảo vệ về số liệu, giới hạn của database hay câu trả lời tình huống. Danh sách cho phép khung cũ trong `tests/content.test.ts` chỉ dành cho các bài đã tồn tại, không thêm bài mới vào đó. Nếu có lỗi nền ngoài phạm vi, ghi rõ tên test, bài bị ảnh hưởng và kết quả thực tế; không báo toàn bộ đạt hay nới test để bỏ qua.

### 4.5 Review độc lập (bắt buộc, mỗi bài một lần)

Làm xong một bài thì giao cho một agent mới, không mang ngữ cảnh lúc viết, học thử và review bài đó.

- **Claude:** review bằng model **Sonnet**, effort **high**.
- **Codex:** giữ model đang dùng của phiên; agent review độc lập kế thừa model đó, không truyền tham số đổi model và không yêu cầu Sonnet. Đây là cách review đúng quy ước của Codex, không phải phương án thay thế do thiếu Sonnet.
- Review chạy nền; review nhiều bài thì chạy vài agent một lượt theo số slot công cụ cho phép. Agent dừng giữa chừng do hết hạn mức thì nhắn cho nó chạy tiếp, không tạo agent mới. Ghi đúng công cụ và model thực tế đã dùng; nếu không xác định được tên model cụ thể thì ghi "kế thừa model của phiên", không đoán tên.
- Mỗi lượt review ghi vào thư mục riêng theo ngày, như `temp/review/2026-10-19-doc-lap/`; lượt thứ hai trong cùng ngày thêm hậu tố, như `2026-10-20-luot-2/`. Không ghi đè bản review cũ.
- Lời dặn cho agent gồm đúng đoạn vai trò dưới đây, rồi phần bối cảnh:

```text
Đóng vai Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học Microsoft SQL Server để đủ hiểu và phản biện developer.
Học thử từ góc nhìn người học, soi từng câu từng chữ: chỗ mơ hồ, thuật ngữ chưa giải thích, thiếu điều kiện, ví dụ gây hiểu nhầm hoặc kiến thức không chính xác.
Review chân thật: có lỗi thì chỉ rõ và giải thích; đúng thì công nhận; chưa xác minh được thì nói rõ, không đoán hay cố bới lỗi.
Phải luôn tự đặt ra các câu hỏi tại sao, để làm gì, vì sao như thế,..., và xem bài học có trả lời được hay không.

Bối cảnh:
- Bài cần review: src/content/lessons/<slug>.mdx (và src/content/exercises/<slug>.yaml nếu có). Đọc cả các khối Excel, Sql, Result, Messages, LineMap, RunFlow, Ssms, Erd như người học thấy trên trang; bản build ở dist/bai/<slug>/index.html nếu đã build.
- Học như một học viên, không phải chuyên gia: chỉ dựa vào bài này và các bài trước, không tra database/HRM_Demo.sql hay tài liệu ngoài. Chỗ nào nghi số liệu hay kiến thức sai thì ghi là nghi ngờ của người học.
- Không kết nối database và không chạy câu lệnh nào trên database của khóa học. Điều gì chỉ xác minh được bằng cách chạy thì ghi "chưa xác minh".
- Quy ước: docs/quy-uoc.md; khung bài: docs/lesson-template.md; hồ sơ công ty: docs/ho-so-cong-ty.md (soi chỗ bài nói khác hồ sơ). Các quyết định đã chốt nằm ở mục "Không làm theo" của spec level đang làm; nếu vẫn thấy nên đổi thì ghi rõ là đi ngược quyết định đã chốt.
- Chuẩn từ 20/10/2026: bài 1.1 là mẫu đã duyệt; Excel/SQL cùng một phần chính, trả lời tình huống ngay trong phần đó. Đánh giá mạch dẫn và độ sâu theo mục tiêu; không yêu cầu khôi phục hai mục cũ, phần trả lời riêng hay preview SQL cho bài khái niệm.
- Rà khái niệm in đậm, giá trị dữ liệu/tên bảng cột/địa chỉ ô có kiểu code; mục Ứng dụng có đúng khả năng của chủ đề, phần tự kiểm tra có phủ mục tiêu không. Chưa chạy thử thì không khẳng định số liệu/kiến thức đã được kiểm chứng.
- Soi cả độ dài: chỗ dài dòng, vòng vo, lặp ý (cùng một ý nói ở hai chỗ, trừ Ghi nhớ và câu tự kiểm tra). Chỉ rõ câu nào bỏ, câu nào gộp. Đề xuất thêm ý thì viết bằng một vế câu, và chỉ đề xuất khi người học thật sự vấp nếu thiếu.
- Không đọc các bản review cũ trong temp/review (để giữ độc lập).
- Với mỗi câu "tại sao, để làm gì" tự đặt ra, ghi bài đã trả lời hay chưa.
- Kết quả viết vào temp/review/<thư mục của lượt>/review-bai-<slug>.md: rà theo thứ tự bài, mỗi mục có câu gốc, đánh giá (Cần sửa / Cần làm rõ / Cần cắt / Biên tập / Giữ được), lý do và đề xuất; cuối file là thứ tự ưu tiên sửa và nguồn đối chiếu.
- Không sửa file nào của dự án.
```

### 4.6 Sau khi có bản review

1. Đọc hết bản review rồi mới sửa. Người review chỉ học như học viên, nên người viết kiểm từng mục với script, với database (chỉ `SELECT`) và với tài liệu Microsoft; mục đúng thì sửa, mục sai, quá hiếm hoặc đi ngược quyết định đã chốt thì không làm theo và ghi lý do.
2. Cập nhật test khi sửa cấu trúc hoặc một yêu cầu kiến thức cần bảo vệ; ưu tiên kiểm ý nghĩa và điều kiện quan trọng, tránh khóa cứng câu chữ chỉ vì đổi cách diễn đạt. Chạy lại mục 4.4.
3. Ghi "Đã sửa" và "Không làm theo" vào spec của level; bài kể thêm điều mới về công ty thì cập nhật `ho-so-cong-ty.md`.
4. Gửi người làm khóa học: bài đã sửa, đường dẫn bản review, tóm tắt những gì đã sửa và chưa sửa.

## 5. Database của khóa học và thao tác ra ngoài

- Database của khóa học dùng chung cho mọi học viên, dữ liệu không được đổi. Đọc bằng MCP `azure-sql` chỉ với `SELECT`, dù cấu hình báo cho phép ghi. Câu làm đổi dữ liệu chỉ chạy qua API bài tập hoặc `check:exercises`, trong giao dịch luôn hoàn tác; xong thì chạy `check:data`. Không chạy backup hay restore. Việc nào cần ghi thật thì dừng lại và hỏi.
- Không gõ, in hay commit mật khẩu SQL, mã truy cập hay secret nào; người làm khóa học tự điền.
- Push lên GitHub chỉ khi người làm khóa học đồng ý: push lên `main` là đăng bài lên web. Lệnh `az` tạo hay sửa tài nguyên thì đưa lệnh ra và chờ đồng ý trước; lệnh chỉ đọc thì không cần.
- Sau mỗi vòng sửa: sửa cả các mục nhỏ; cập nhật spec, plan và ghi chú cho khớp với những gì đã làm.
