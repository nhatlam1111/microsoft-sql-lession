# Quy ước của khóa học

Mọi quy ước khi viết bài, review bài và làm việc với database của khóa học nằm ở file này. Khung bài và các khối dùng được nằm ở [`lesson-template.md`](lesson-template.md); hiện trạng công ty, nhân vật và những gì các bài đã kể nằm ở [`ho-so-cong-ty.md`](ho-so-cong-ty.md). Có quy ước mới thì ghi vào đây, trong cùng commit với thay đổi đầu tiên áp dụng nó.

## 1. Viết gọn

- **Không dài dòng.** Mỗi đoạn một ý, tối đa khoảng bốn câu; một ý nói được bằng một câu thì không viết hai câu. `npm test` chặn đoạn văn quá 120 chữ trong bài đầy đủ.
- **Không vòng vo.** Câu đầu đoạn nói ngay ý chính. Bỏ câu dẫn rỗng ("Cần lưu ý rằng…", "Như đã biết…", "Nói cách khác…") và các câu rào đón không thêm thông tin.
- **Không lặp ý.** Mỗi ý nói một lần, ở chỗ người học cần nó; chỗ khác thì trỏ về ("xem Hay nhầm 2", "bài 1.3"). "Hay nhầm" nêu lỗi và hậu quả, không giảng lại lý thuyết; "Ứng dụng" nêu việc làm, không nhắc lại "Hay nhầm"; câu trả lời cho tình huống không kể lại câu lệnh. Chỉ "Ghi nhớ" và câu tự kiểm tra được nhắc lại ý đã có, vì đó là phần ôn.
- **Điều kiện và "vì sao" viết bằng một vế câu**, không bằng một đoạn. Chi tiết ngoài phạm vi bài (trường hợp hiếm, tùy chọn của công cụ, lịch sử tính năng) thì bỏ, hoặc trỏ sang bài đi sâu hơn.
- **Khi sửa theo review:** ưu tiên sửa câu đang có hơn thêm câu mới. Mỗi lần thêm một ý, tìm chỗ cắt bớt; mục review chỉ đúng ở trường hợp hiếm thì ghi "Không làm theo" kèm lý do.

## 2. Nội dung bài

- Tình huống, nhân vật, con số khớp [`ho-so-cong-ty.md`](ho-so-cong-ty.md): cùng công ty, cùng thời điểm (tháng 10/2026), cùng người hỏi (chị Hạnh, Phòng Nhân sự). Nhân vật mới không trùng tên với hồ sơ trong bộ mẫu; nhắc tới hồ sơ thì gọi bằng mã. Bài kể thêm điều mới về công ty thì ghi vào mục 7 của file đó.
- Xưng "bạn", câu ngắn. Giải thích thuật ngữ ngay lần đầu xuất hiện.
- Không nhắc vai trò hay xuất thân của người đọc ("BA", "developer", "hồi làm tư vấn"); tình huống là yêu cầu công việc trung tính. Mục dùng bài vào việc thật tên là "Ứng dụng".
- Dùng "kết bảng" cho `JOIN`, không dùng "nối bảng" hay "ghép". Không dùng các cụm trong `BANNED_PHRASES` (`src/lib/lesson-schema.ts`), không dùng emoji.
- Lý thuyết tự trả lời "vì sao, để làm gì, cái giá là gì" bằng lời dẫn dắt, không đặt câu hỏi vào bài. Cơ chế SQL Server tự làm thì gọi đúng tên (chuyển kiểu ngầm) và nói gặp lại ở bài nào.
- Mỗi dòng `LineMap` có "Ví dụ:" với giá trị cụ thể: giá trị nào qua, bị từ chối hay bị đổi.
- Cuối lý thuyết có đoạn "Ở bài này chỉ cần…" kể các bài đi sâu hơn ("bài 5.2").
- Giải thích trong drawer của `RunFlow` bắt đầu từ từ khóa của bước: nó làm gì với các dòng, kèm số dòng thật.
- Không hứa điều database không tự bảo đảm. Ràng buộc chỉ có khi được khai báo ("khi `MaNV` được khai báo là khóa chính…"). Tách "hợp lệ" với "đúng", "lưu được" với "đúng ý". Khóa ngoại là luật kiểm khi ghi, không phải ô chọn trên màn hình; nó xác nhận mã có thật, không xác nhận mã đúng.
- Không tuyệt đối hóa Excel (có Data Validation, có làm việc chung, `SUM` bỏ qua ô chữ); nói điều kiện của tình huống.
- `TOP (n)` là tối đa n dòng. Kết quả không có `ORDER BY` thì nói thứ tự dòng có thể khác hình. `TOP` đi cùng `ORDER BY`, trừ khi bài đang nói đúng chuyện không có `ORDER BY`. Thứ tự trong `RunFlow` là thứ tự xử lý logic, không phải cách SQL Server đọc dữ liệu.
- Lời hứa của công cụ nói rõ phạm vi: hoàn tác chỉ có trên trang bài tập, SSMS chạy thật; lỗi 40613 thường do database đang thức dậy, lỗi kéo dài thì gửi nguyên văn cho người phụ trách.
- Tình huống được khép lại trong bài: có giả định rõ (mốc thời gian, phạm vi) và có câu trả lời cho người hỏi, tách việc database làm với quyết định nghiệp vụ. Bài không có `RunFlow` kết "Làm bằng SQL" bằng `### Trả lời chị Hạnh`; bài có `RunFlow` đặt câu trả lời trong "Câu lệnh cho tình huống".
- Bài khái niệm có ba câu tự kiểm tra trở lên.
- SQL: chuỗi tiếng Việt có `N`; dòng code trong `Sql` và `RunFlow` không bắt đầu bằng dấu cách (MDX xóa). Đoạn chỉ để đọc (câu ghi dữ liệu, đoạn trích có `...`, khuôn cú pháp) có `copy={false}`. Level 1 không bảo học viên chạy `INSERT`, `UPDATE`, `DELETE` trong SSMS.

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
- Chạy mọi câu lệnh và con số sẽ đưa vào bài (mục 5).

### 4.2 Viết theo khung ở `lesson-template.md` và các mục 1–3

### 4.3 Tự rà trước khi đưa review

- [ ] Không đoạn nào dài dòng, vòng vo; không ý nào nói hai lần ngoài "Ghi nhớ" và câu tự kiểm tra.
- [ ] Lý thuyết trả lời "vì sao, để làm gì, cái giá là gì"; không có câu hỏi trong lý thuyết.
- [ ] Mỗi dòng `LineMap` có "Ví dụ:"; có đoạn "Ở bài này chỉ cần…".
- [ ] Không câu nào hứa quá; con số nói rõ đếm gì và đã chạy lại.
- [ ] Hình đánh dấu đúng chỗ, chú thích nói phần được đánh dấu.
- [ ] Tình huống được khép lại, khớp hồ sơ công ty; Excel được tả đúng.
- [ ] `copy={false}` cho đoạn chỉ để đọc; bài khái niệm có ba câu tự kiểm tra.

### 4.4 Kiểm bằng máy

1. Câu làm đổi dữ liệu (để lấy nguyên văn lỗi) chỉ chạy qua API bài tập trên máy, có hoàn tác; xong thì `npm --prefix api run check:data`.
2. Bài có bài tập: `npm --prefix api run build` rồi `npm --prefix api run check:exercises`.
3. `npm test`, `npm run check`, `npm run build`, `npm run check:dist`.
4. Mở bản build trên máy, xem các hình có đánh dấu và các khối mới.

### 4.5 Review độc lập (bắt buộc, mỗi bài một lần)

Làm xong một bài thì giao cho một agent mới, không mang ngữ cảnh lúc viết, học thử và review bài đó.

- Model **Sonnet**, effort **high**, chạy nền. Review nhiều bài thì chạy vài agent một lượt (ba hoặc bốn); agent dừng giữa chừng do hết hạn mức thì nhắn cho nó chạy tiếp, không tạo agent mới.
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
- Soi cả độ dài: chỗ dài dòng, vòng vo, lặp ý (cùng một ý nói ở hai chỗ, trừ Ghi nhớ và câu tự kiểm tra). Chỉ rõ câu nào bỏ, câu nào gộp. Đề xuất thêm ý thì viết bằng một vế câu, và chỉ đề xuất khi người học thật sự vấp nếu thiếu.
- Không đọc các bản review cũ trong temp/review (để giữ độc lập).
- Với mỗi câu "tại sao, để làm gì" tự đặt ra, ghi bài đã trả lời hay chưa.
- Kết quả viết vào temp/review/<thư mục của lượt>/review-bai-<slug>.md: rà theo thứ tự bài, mỗi mục có câu gốc, đánh giá (Cần sửa / Cần làm rõ / Cần cắt / Biên tập / Giữ được), lý do và đề xuất; cuối file là thứ tự ưu tiên sửa và nguồn đối chiếu.
- Không sửa file nào của dự án.
```

### 4.6 Sau khi có bản review

1. Đọc hết bản review rồi mới sửa. Người review chỉ học như học viên, nên người viết kiểm từng mục với script, với database (chỉ `SELECT`) và với tài liệu Microsoft; mục đúng thì sửa, mục sai, quá hiếm hoặc đi ngược quyết định đã chốt thì không làm theo và ghi lý do.
2. Viết test cho các câu đã sửa (cụm cũ không còn, ý mới có mặt), chạy lại mục 4.4.
3. Ghi "Đã sửa" và "Không làm theo" vào spec của level; bài kể thêm điều mới về công ty thì cập nhật `ho-so-cong-ty.md`.
4. Gửi người làm khóa học: bài đã sửa, đường dẫn bản review, tóm tắt những gì đã sửa và chưa sửa.

## 5. Database của khóa học và thao tác ra ngoài

- Database của khóa học dùng chung cho mọi học viên, dữ liệu không được đổi. Đọc bằng MCP `azure-sql` chỉ với `SELECT`, dù cấu hình báo cho phép ghi. Câu làm đổi dữ liệu chỉ chạy qua API bài tập hoặc `check:exercises`, trong giao dịch luôn hoàn tác; xong thì chạy `check:data`. Không chạy backup hay restore. Việc nào cần ghi thật thì dừng lại và hỏi.
- Không gõ, in hay commit mật khẩu SQL, mã truy cập hay secret nào; người làm khóa học tự điền.
- Push lên GitHub chỉ khi người làm khóa học đồng ý: push lên `main` là đăng bài lên web. Lệnh `az` tạo hay sửa tài nguyên thì đưa lệnh ra và chờ đồng ý trước; lệnh chỉ đọc thì không cần.
- Sau mỗi vòng sửa: sửa cả các mục nhỏ; cập nhật spec, plan và ghi chú cho khớp với những gì đã làm.
