# Review bài 1.1 "Database là gì và SSMS dùng để làm gì" (bài nền)

## 1. Phạm vi, phiên bản, công cụ thực tế

- Bài: `src/content/lessons/1-1-database-la-gi.mdx`; không có YAML. Source: commit `7ba5bca`; sha256 của file đúng như giao (`d9c9216a...cae7`), `git status` sạch.
- Build đối chiếu: `dist/bai/1-1-database-la-gi/index.html` (mtime 17:10:46, sau source 17:10:28). Tôi đối chiếu từng đoạn văn trong HTML với MDX, khớp. Tôi không kiểm được "dựng từ đúng source" ngoài việc nội dung khớp và thời gian hợp lý.
- Đã đọc: `AGENTS.md`, `docs/quy-uoc.md` (kỹ mục 2.5), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, `src/pages/gioi-thieu.astro`, ba hình PNG (xem trực tiếp), phần "Khung bài nền" và "Nội dung từng bài / 1.1" của spec `2026-10-30-level-1-foundation-lessons-design.md`, CSS `.lesson-illustration`. Đọc thêm tiêu đề/goal của 1.6 và 5.2 chỉ để biết lời trỏ có đích đúng, không dùng để bù kiến thức.
- Không đọc report cũ, `HRM_Demo.sql`, `.env`; không kết nối database, không chạy SQL/API; không tương tác browser (chỉ đọc nguồn và HTML). Vì vậy **chưa xem bản render trong trình duyệt** (bố cục hai cột của hình, dark mode, mobile); CSS cho thấy `figcaption strong` là `display:block` nên tiêu đề hình tách dòng, nhưng đó là đọc CSS chứ không phải nhìn thấy.
- Đếm từ: helper `proseParagraphs` không chạy được ngoài vitest (import không đuôi `.ts`), nên tôi dựng lại cùng thuật toán bằng Python: **709 từ**, trong đó 18 từ là đoạn `import` (helper coi ba dòng import là một đoạn văn); phần văn thật khoảng **691**. Memo (`<Memo rows>`) không được tính. Đây là bản dựng lại của tôi, chưa phải số của test.

## 2. Rà theo thứ tự bài

Quy ước nhãn nguồn gốc vấn đề: **[chưa dạy]**, **[dạy nhưng khó tìm]**, **[sai có căn cứ]**, **[chưa xác minh]**.

### 2.1 Frontmatter và mục tiêu

Mục tiêu: "phân biệt được database, SQL Server, SQL và SSMS, biết nguồn dữ liệu chung giúp gì và vì sao vẫn cần kiểm tra dữ liệu". Ba vế, bài có phần cho cả ba. `minutes: 7` hợp lý với khoảng 690 từ và ba hình. Tiêu đề "SSMS dùng để làm gì" được trả lời bằng đúng một đoạn (xem C2, C3). Giữ được.

### 2.2 "Từ file Excel đến một nguồn dữ liệu chung" (đoạn mở)

> "Khi mỗi phòng giữ một bản sao, hồ sơ được sửa ở bản này có thể chưa kịp sửa ở bản kia. Vì vậy, dữ liệu dùng cho cả công ty thường được đưa vào một nguồn chung."

Mở bằng điều quen với Excel, điều kiện "khi mỗi phòng giữ một bản sao" nói đúng, không tuyệt đối hóa. Trả lời được "vì sao cần nguồn chung". **Giữ được.** Chỉ có một điểm: chưa nêu nguồn chung đó vì sao phải là database chứ không phải một workbook đặt chỗ chung (C1).

### 2.3 "Database lưu dữ liệu"

> "tập dữ liệu có cấu trúc, được phần mềm quản lý để nhiều người dùng theo quyền."

- Câu có hai cách đọc: "nhiều người dùng" (tức nhiều user) hay "nhiều người cùng dùng". "theo quyền" chưa nói quyền là gì (C8).
- "có cấu trúc" chỉ được hiểu nhờ hình và phép so với sheet ngay sau đó; chấp nhận được ở bài nền.

> "Điểm khác là các bên cùng đọc một nguồn thay vì mỗi bên giữ một bản riêng, nên thay đổi đã cập nhật vào nguồn thì mọi người đều thấy."

- Đây là câu chịu trách nhiệm trả lời "database khác workbook ở đâu". Nó nói điểm khác là *cùng đọc một nguồn*, nhưng một workbook đặt ở chỗ chung cũng là "một nguồn" (C1).
- "mọi người đều thấy" mâu thuẫn nhẹ với "theo quyền" ngay câu trước (C8).

Hình 1 (database): ba bảng quanh một khối trụ; alt và caption khớp hình ("một database gồm nhiều bảng dữ liệu"). Hình đúng với phép so workbook/sheet. Biểu tượng khối trụ không được giải thích là ký hiệu của database, nhưng hình 1 đủ rõ để suy ra. **Giữ được.**

### 2.4 "SQL Server quản lý, SQL dùng để hỏi dữ liệu"

> "Database không được mở như mở một file mà đi qua phần mềm quản lý."

Đây là khẳng định, chưa phải lý do. Lý do (nhiều người, quyền, luật) nằm rải ở đoạn sau, chưa được nối lại (C3).

Hình 2 (SQL Server): xem C2. Caption có nói rõ "hình khái niệm, không phải màn hình thật", điểm cộng, nhưng hình vẫn dễ gây nhầm.

> "Muốn lấy dữ liệu, bạn gửi yêu cầu bằng SQL: ngôn ngữ để hỏi và thao tác với dữ liệu."

"thao tác" chưa nghĩa; Ghi nhớ và tiêu đề tiểu mục chỉ nói "hỏi" (C10).

> "SQL Server dùng T-SQL (Transact-SQL), cách viết SQL của Microsoft."

Đúng nghĩa nhưng không có mục đích trong bài: người học không cần T-SQL để làm bất kỳ việc gì trong phần còn lại, nó không vào Ghi nhớ hay tự kiểm tra (X1).

Hình 3 (SQL): tài liệu "SQL" → mũi tên → bảng đặt trước khối trụ. Caption nói đúng "bảng bên phải tượng trưng cho kết quả". Hình không có SQL Server ở giữa (chữ nói "SQL Server xử lý rồi trả kết quả") nên mũi tên đọc như "tệp SQL tạo ra một bảng". Thiếu sót nhỏ, caption đã giảm nhẹ. Ghi vào C2.

### 2.5 "SSMS là công cụ làm việc với database"

> "SSMS ... là công cụ cài trên máy Windows để kết nối tới SQL Server, xem các bảng, gửi câu lệnh và đọc kết quả. Dữ liệu nằm ở máy chủ, không nằm trong SSMS, nên đóng SSMS không làm mất dữ liệu."

- Câu "đóng SSMS không làm mất dữ liệu" trả lời đúng nỗi lo thật của người mới, có lý do ("nên"). **Giữ được.**
- "máy chủ" xuất hiện lần đầu ở đây, chưa được giải thích và chưa nói SQL Server chạy ở đó (C4).
- "kết nối" chưa nói cần gì để kết nối; chấp nhận được vì Giới thiệu/bài sau lo, nhưng Ứng dụng lại dùng "báo lỗi kết nối" (xem C9).
- Phần nói SSMS dài khoảng 60 từ, không hình, không ví dụ, trong khi tiêu đề bài hứa "SSMS dùng để làm gì". Người đọc hết bài vẫn chưa hình dung SSMS trông thế nào hay khi nào mở nó. Không đề nghị thêm hình Ssms ở đây (spec để mở và ngân sách từ chặt); chỉ ghi nhận.
- "Người không viết SQL thường xem dữ liệu qua màn hình hệ thống hoặc báo cáo." Câu có giá trị (nói ai dùng SSMS), nhưng "màn hình hệ thống" là lớp ứng dụng chưa từng được nhắc; giữ vì nó là chỗ duy nhất cho thấy không phải ai cũng cần SSMS.

> "Bạn bắt đầu viết câu lệnh từ bài 1.6, trên web hoặc trong SSMS; chọn nơi thực hành ở trang Giới thiệu."

**Đường đi:** link `/microsoft-sql-lession/gioi-thieu/#chon-noi-thuc-hanh` có thật trong `dist/gioi-thieu/index.html` (có `id="chon-noi-thuc-hanh"`). Trang đó cho hai lối (có mã → web từ bài 1.6; chưa có mã → SQL Server riêng). Đường đi của người chỉ đọc theo được. Hai điểm (B4): "trên web" chưa nói là trang bài tập của khóa học và cần mã truy cập; lời "cài trên máy Windows" không đi kèm chỗ nào nói cách cài SSMS (không thấy trong `gioi-thieu.astro`; nằm ở 1.2 cũ thì tôi không đọc theo phạm vi, ghi **[chưa xác minh]**). Trang Giới thiệu hiện vẫn nói "bài 1.2 có hướng dẫn..." và trỏ vào 1.2 cũ; spec đã ghi sẽ sửa, không tính là finding.

### 2.6 "Nguồn chung vẫn cần kiểm tra"

> "Người thiết kế database có thể khai báo luật dữ liệu, như cột ngày chỉ nhận ngày, mã nhân viên không được trùng, mã phòng phải có trong danh mục."

- Ba ví dụ thuộc ba loại khác nhau (kiểu dữ liệu, khóa chính, khóa ngoại) nhưng không có giá trị cụ thể nào (`NV005`, `KD`), trong khi spec muốn ví dụ bằng giá trị thật. "danh mục" chưa được nói là gì (C7).
- "luật dữ liệu" được in đậm làm thuật ngữ, nhưng ở đoạn "Ở bài này..." lại đổi sang "ràng buộc" mà không nối hai tên (C5).

> "Khi luật đang bật, SQL Server từ chối dữ liệu vi phạm khi thêm hoặc sửa theo cách thông thường."

Hai cụm rào ("đang bật", "theo cách thông thường") tránh hứa quá, đúng hướng, nhưng đọc không biết bật/tắt là gì và cách "không thông thường" là gì (C6). Điều cần ghi nhận: **không có chỗ nào hứa quá**: luật chỉ có khi được khai báo và chỉ chặn khi ghi.

> "Excel cũng có Data Validation để giới hạn dữ liệu nhập, nhưng phải thiết lập trong từng file."

Công nhận Excel, mô tả đúng, không tuyệt đối hóa, có giải nghĩa tại chỗ ("để giới hạn dữ liệu nhập"). **Giữ được.** (Ý "phải thiết lập trong từng file" là điểm so sánh thật, nhưng nó không được dùng để trả lời C1.)

> "Luật chỉ kiểm điều đã khai báo, nên hợp lệ chưa chắc đã đúng. `Kinh doanh` là phòng có trong danh mục, nên ghi nhầm một nhân viên vào phòng này vẫn lưu được. Database không tự biết ai thuộc phòng nào; người có quyền phải đối chiếu hồ sơ rồi cập nhật."

Đây là đoạn tốt nhất của bài: nguyên nhân → ví dụ cụ thể → hệ quả ai làm gì, đúng quy ước "hợp lệ khác đúng", "lưu được khác đúng ý", giá trị dùng code đúng chuẩn. **Giữ được.** Ba chỗ nhỏ: ví dụ đổi từ "mã phòng" sang tên `Kinh doanh` (C7); "hợp lệ" chưa nghĩa, "hồ sơ" đa nghĩa (B3); "người có quyền" mơ hồ (C8).

> "Ở bài này chỉ cần phân biệt ..., hiểu nguồn chung giúp gì và giới hạn của luật dữ liệu. Bài sau đi tiếp: bảng, dòng, cột ở bài 1.2, kiểu dữ liệu ở bài 1.3, khóa chính và khóa ngoại ở bài 1.4, các loại ràng buộc khác ở bài 5.2."

Đủ yêu cầu "Ở bài này chỉ cần…". Câu đầu nhắc lại goal (X2); danh sách bài sau không nối với ba ví dụ luật vừa nêu (B2).

### 2.7 Hay nhầm ở đâu

1. "Nghĩ database chỉ là Excel to hơn. Chỉ tăng dung lượng file không giải quyết việc mỗi người sửa một bản." Lỗi nhận thức có thật, nhưng lời bác không khớp thân bài: thân bài không nói chuyện "dung lượng", còn "mỗi người sửa một bản" cũng được giải quyết bằng một file đặt chỗ chung. Bác bỏ chưa trúng điều khác biệt thật (C1).
2. "Sửa file xuất rồi coi như đã sửa nguồn." Có giá trị thật, đúng, ngắn, nêu hậu quả. "xuất" chưa được đề cập ở thân bài nhưng nghĩa hiển nhiên. **Giữ được.**

### 2.8 Ứng dụng

1. "Nói đúng tên khi trao đổi với IT: phân biệt database, SQL Server và SSMS khi xin quyền truy cập hoặc báo lỗi kết nối." Việc làm được nhờ chủ đề, có mục đích. **Giữ được.** Nhược nhỏ: "lỗi kết nối" chưa được nói ở thân bài.
2. "Chọn đúng nơi lấy dữ liệu: lấy số liệu từ nguồn chung thay vì so các file đang gửi qua lại." Đúng chủ đề (nguồn chung) và khớp Hay nhầm 2, nhưng chỉ lặp ý đoạn mở.
Cả hai không dùng chủ đề "luật dữ liệu / hợp lệ ≠ đúng", vốn chiếm khoảng 1/3 bài và nằm trong mục tiêu (C9).

### 2.9 Ghi nhớ

- Câu tóm bốn thuật ngữ rõ, ngắn. **Giữ được**, nhưng là bốn định nghĩa song song, không có quan hệ giữa chúng (C3).
- Memo: cột "Bên Excel / Bên SQL" nhưng hàng 1 phải là "Database có nhiều bảng" (không phải SQL) và hàng 2 nói Excel là "Mỗi bên giữ một bản" như thuộc tính cố định (S1). Cột phải render trong `<code>` dù là câu văn, vì component Memo; không phải lỗi của bài.
- Dòng bold "**Hợp lệ chưa chắc đã đúng.**" đứng riêng sau Memo, không thuộc khối nào (X2).

### 2.10 Render (HTML)

Không lộ backtick hay escape trong phần bài (dòng duy nhất chứa backtick trong HTML là JS của Astro). `<code>Kinh doanh</code>` đúng. Dấu nháy của "Đã học xong" đổi sang nháy cong, chấp nhận được ngoài SQL. Bold có chọn lọc: workbook, sheet, Database, bảng, SQL Server, SQL, T-SQL, SSMS, luật dữ liệu, hợp lệ chưa chắc đã đúng; không bôi cả đoạn. Chỉ ghi: T-SQL được in đậm dù là thuật ngữ ít giá trị nhất (X1). Alt và caption cả ba hình đều nói rõ là hình khái niệm/minh họa. Bài chỉ đọc, không có SQL nên các kiểm tra SQL/tab/copy không áp dụng.

## 3. Bảng tiền đề ba câu tự kiểm tra

Tôi thử trả lời từng câu từ bài trước khi đọc đáp án.

| Câu | Cần kiến thức gì | Đã dạy ở đâu | Còn thiếu gì |
|---|---|---|---|
| 1. "Database, SQL Server, SQL và SSMS khác nhau thế nào?" | Bốn định nghĩa; phân vai | Tiểu mục Database, "SQL Server quản lý, SQL dùng để hỏi", "SSMS là công cụ"; Ghi nhớ nhắc lại gần nguyên văn | Không thiếu kiến thức. Nhưng đáp án chép gần nguyên Ghi nhớ ngay phía trên nên kiểm trí nhớ ngắn hạn, không kiểm hiểu quan hệ (ai gửi gì cho ai). Đáp án còn dùng "hỏi và thao tác" khác Ghi nhớ "hỏi" (C10). |
| 2. "Nguồn chung giúp giảm lệch giữa các phòng như thế nào?" | Nhiều bản → sót sửa; một nguồn → sửa một nơi | Đoạn mở và đoạn "Database lưu dữ liệu" | Đủ để trả lời. Nếu người học nghĩ thêm "workbook chung thì sao" thì không tìm thấy gì trong bài (C1). Câu "giảm lệch" dùng từ "lệch" chưa xuất hiện ở thân bài, nghĩa hiển nhiên. |
| 3. "Một nhân viên bị ghi nhầm vào phòng có trong danh mục. Database có tự phát hiện không?" | Luật chỉ kiểm điều đã khai báo; hợp lệ ≠ đúng | Đoạn "Luật chỉ kiểm điều đã khai báo..." (đúng ví dụ này) | Đủ. Nhưng gần như là cùng ví dụ của thân bài nên không kiểm khả năng áp dụng sang ví dụ mới. Đáp án "Không." tuyệt đối trong khi bối cảnh duy nhất là luật "có trong danh mục" (B5). |

**Phủ mục tiêu:** Q1 phủ vế một; Q2 phủ vế hai; Q3 phủ vế ba ở nửa "hợp lệ ≠ đúng". Không có câu kiểm "luật dữ liệu là gì / ai đặt / khi nào chặn" và "đóng SSMS có mất dữ liệu không". Với bài 7 phút ba câu là đủ, chưa cần thêm; ghi nhận để người viết quyết. Cả ba nằm sau Ghi nhớ đúng thứ tự, và đáp án đều đã được giảng trong bài (không dùng tự kiểm tra dạy bù).

## 4. Các câu "tại sao / để làm gì" tôi tự đặt

| Câu hỏi | Bài trả lời ở đâu |
|---|---|
| Vì sao cần một nguồn chung thay vì mỗi phòng một file? | Đã trả lời (đoạn mở). |
| Vì sao không đặt luôn một workbook ở chỗ chung/cùng sửa, cần gì database? | **Chưa trả lời** (C1). |
| Database khác workbook ở đâu? | Trả lời một phần: "cùng đọc một nguồn", rải rác "theo quyền" và "luật dữ liệu"; không tổng hợp. |
| Vì sao database không mở như file mà phải qua SQL Server? | Có khẳng định, **chưa có lý do** (C3). |
| SQL để làm gì? | Đã trả lời ("hỏi dữ liệu"); "thao tác" chưa nghĩa (C10). |
| T-SQL để làm gì với tôi? | **Chưa trả lời**, nên cắt (X1). |
| SSMS để làm gì, khác SQL Server chỗ nào? | Để làm gì: đã trả lời; khác SQL Server: có định nghĩa, nhưng hình 2 dễ làm nhòe (C2), thiếu chuỗi liên hệ (C3). |
| Đóng SSMS có mất dữ liệu không? | Đã trả lời, có lý do. |
| Luật dữ liệu để làm gì, ai đặt? | Đã trả lời ("người thiết kế khai báo", "từ chối dữ liệu vi phạm"); "bật" và "cách thông thường" chưa nghĩa (C6). |
| Vì sao hợp lệ chưa chắc đúng, ai sửa? | Đã trả lời, có ví dụ; "người có quyền" mơ hồ (C8). |
| Việc này đổi gì trong cách tôi làm việc với dữ liệu? | Trả lời nửa đầu (gọi đúng tên với IT, lấy từ nguồn chung); phần kiểm dữ liệu **chưa vào Ứng dụng** (C9). |
| Bao giờ và ở đâu tôi bắt đầu thực hành? | Đã trả lời (1.6; trang Giới thiệu), chi tiết nhỏ ở B4. |

## 5. Findings

Mỗi mục có câu gốc, vị trí, đánh giá, tác động tới người mới, căn cứ, đề xuất. Ngân sách: bài đã ở khoảng 691–709 từ, nên mỗi đề xuất thêm ghi kèm chỗ cắt (tổng cắt ước khoảng 45–50 từ, tổng thêm khoảng 40–45 từ).

### Cần sửa

**S1. Memo tuyệt đối hóa Excel và gắn nhãn "Bên SQL" cho database**
- Câu gốc: `['Mỗi bên giữ một bản', 'Các bên cùng đọc một nguồn']`; tiêu đề cột "Bên Excel / Bên SQL". Vị trí: Ghi nhớ, Memo.
- Đánh giá: **Cần sửa** (nhẹ). Phân loại: sai có căn cứ.
- Tác động: người học ghi nhớ "Excel = mỗi bên một bản", mâu thuẫn với chính bài (đoạn mở có điều kiện "khi mỗi phòng giữ một bản sao", rồi thừa nhận Data Validation) và với quy ước 2 ("Không tuyệt đối hóa Excel (có Data Validation, có làm việc chung...)"). Cột "Bên SQL" chứa "Database có nhiều bảng" nên tên cột lệch (cả hai hàng là về database; không có gì về SQL).
- Đề xuất: giữ điều kiện ("khi mỗi phòng giữ một bản"), ví dụ `['Mỗi phòng giữ một bản sao', 'Các phòng cùng đọc một database']`. Nếu component Memo cố định nhãn "Bên SQL", chấp nhận nhưng đừng viết câu dài vào đó; nếu Memo luôn hiện cột phải dạng code thì đó là việc chung của khung, không sửa riêng bài này.

### Cần làm rõ

**C1. Chưa trả lời "vì sao không dùng một workbook chung"** [chưa dạy]
- Câu gốc: "Điểm khác là các bên cùng đọc một nguồn thay vì mỗi bên giữ một bản riêng" (Database lưu dữ liệu) và Hay nhầm 1 "Chỉ tăng dung lượng file không giải quyết việc mỗi người sửa một bản".
- Đánh giá: **Cần làm rõ**. Căn cứ: lời của bài; quy ước 2 (không tuyệt đối hóa Excel, có làm việc chung); mục tiêu spec ("vì sao và để làm gì").
- Tác động: đây là câu phản biện đầu tiên của người học khó tính; bài tự nêu "điểm khác" là một nguồn chung, mà workbook đặt chỗ chung cũng là một nguồn. Người đọc hoặc kết luận bài lập luận yếu, hoặc nhớ sai điểm khác biệt. Hay nhầm 1 cũng bác "Excel to hơn" bằng lý do không thuộc thân bài.
- Đề xuất: thay (không thêm) vế "Điểm khác là..." bằng điều database thêm vào mà bài đã có sẵn ở các đoạn sau: phần mềm quản lý ai được xem/sửa gì và kiểm dữ liệu theo luật; rồi viết lại Hay nhầm 1 theo đúng ý đó. Người viết cần tự xác minh phạm vi câu "workbook chung không có X" trước khi đưa vào; tôi không kiểm được năng lực của tính năng chia sẻ Excel (**[chưa xác minh]**) nên không đề nghị câu cụ thể.

**C2. Hình SQL Server trông như một cửa sổ ứng dụng, dễ nhòe với SSMS**
- Câu gốc: hình `1-1-sql-server.png`, alt "một khung ứng dụng quản lý các database, có biểu tượng thiết lập và bảng dữ liệu"; caption "Khung phần mềm và biểu tượng thiết lập minh họa việc quản lý các database". Vị trí: hình thứ hai.
- Đánh giá: **Cần làm rõ**. Phân loại: dạy nhưng dễ hiểu sai. Căn cứ: ngay đoạn dưới, bài nói SSMS là công cụ "xem các bảng, gửi câu lệnh"; hình SQL Server lại có thanh bên, hai database và một bảng, tức đúng thứ người học sẽ gán cho "công cụ xem bảng". Hình 3 thì không có SQL Server giữa SQL và kết quả.
- Tác động: bài tồn tại để phân biệt SQL Server với SSMS; một hình đẩy hai khái niệm lại gần nhau là hình phản tác dụng ở đúng điểm này. Caption đã nói "không phải màn hình thật", nhưng chưa nói SQL Server không phải thứ người dùng nhìn thấy.
- Đề xuất: ưu tiên sửa caption một vế (ví dụ "SQL Server chạy ngầm trên máy chủ; ô cửa sổ chỉ là cách vẽ minh họa"). Tôi chưa xác minh SQL Server có hay không có giao diện riêng ngoài SSMS; câu trên chỉ dùng nếu người viết xác nhận. Thay hình chỉ khi người viết thấy cần; hình 1 và hình 3 giữ được.

**C3. Bốn thuật ngữ được đặt song song, chưa có chuỗi quan hệ**
- Câu gốc: Ghi nhớ "Database lưu dữ liệu; SQL Server quản lý database; SQL là ngôn ngữ để hỏi dữ liệu; SSMS là công cụ để kết nối và gửi câu lệnh." và "Database không được mở như mở một file mà đi qua phần mềm quản lý."
- Đánh giá: **Cần làm rõ**. Căn cứ: các mảnh có trong bài (SSMS "gửi câu lệnh", SQL Server "xử lý yêu cầu đó rồi trả kết quả"), nhưng không câu nào nối thành chuỗi; ba hình rời nhau.
- Tác động: người học thuộc bốn định nghĩa nhưng không trả lời được "khi tôi gõ một câu SQL thì cái gì xảy ra". Đó là điều họ cần để nói chuyện với developer. Q1 đáp án cũng chỉ liệt kê.
- Đề xuất, không tăng từ: viết lại câu đầu Ghi nhớ thành một chuỗi (SSMS gửi SQL → SQL Server xử lý → đọc database → trả kết quả) và rút đáp án Q1 theo đó. Có thể gộp thêm một vế "vì phải qua phần mềm quản lý nên có quyền theo người và luật dữ liệu" để thành lý do cho câu "Database không được mở như mở một file".

**C4. "máy chủ" xuất hiện không giải thích**
- Câu gốc: "Dữ liệu nằm ở máy chủ, không nằm trong SSMS". Vị trí: tiểu mục SSMS.
- Đánh giá: **Cần làm rõ**. Phân loại: chưa dạy. Căn cứ: bài chưa từng nói SQL Server chạy ở đâu.
- Tác động: người mới không biết SQL Server là chương trình chạy trên một máy khác; "máy chủ" nghe như thiết bị lạ. Câu "đóng SSMS không mất dữ liệu" vẫn hiểu được, nhưng lý do ("nằm ở máy chủ") treo.
- Đề xuất: thêm một vế khi nói SQL Server ở tiểu mục trước, ví dụ SQL Server chạy trên một máy chủ (máy tính dùng chung, do IT quản lý), hoặc đặt vế đó vào chỗ "máy chủ" xuất hiện. Tổng khoảng 8–10 từ; cắt bù ở X1.

**C5. "luật dữ liệu" và "ràng buộc" chưa được nối**
- Câu gốc: "**luật dữ liệu**" (Nguồn chung vẫn cần kiểm tra) so với "các loại ràng buộc khác ở bài 5.2" (đoạn "Ở bài này chỉ cần...").
- Đánh giá: **Cần làm rõ**. Phân loại: dạy nhưng không gắn. Căn cứ: spec nói 1.4 sẽ gọi "ràng buộc, tức luật dữ liệu đã nói ở 1.1"; 1.1 hiện chưa nói điều đó, và tiêu đề 5.2 dùng "Ràng buộc".
- Tác động: người học thấy thuật ngữ mới ở câu cuối mà không biết là cái đã học; về sau trong các bài khác sẽ gặp "ràng buộc" như một khái niệm mới.
- Đề xuất: ở chỗ in đậm "luật dữ liệu" thêm "(còn gọi là ràng buộc)"; chỉ khoảng 5 từ.

**C6. "Khi luật đang bật... theo cách thông thường" chưa có nghĩa**
- Câu gốc: "Khi luật đang bật, SQL Server từ chối dữ liệu vi phạm khi thêm hoặc sửa theo cách thông thường."
- Đánh giá: **Cần làm rõ**. Phân loại: chưa dạy. Căn cứ: hai cụm rào đúng hướng (tránh hứa quá) nhưng người mới không biết luật có thể "tắt", cũng không biết "cách không thông thường" là gì.
- Tác động: câu đọc như rào đón chung chung; người học có thể hiểu sai là có cách lách mà họ phải học. Người viết không bị "hứa quá", nhưng người học không rút được thêm gì.
- Đề xuất: giữ điều kiện bằng một vế rõ hơn ("khi luật còn hiệu lực") và bỏ "theo cách thông thường"; hoặc nói đúng một ngoại lệ cụ thể nếu người viết thấy cần. Người viết kiểm lại với tài liệu Microsoft về việc vô hiệu hóa ràng buộc (**[chưa xác minh]**; tôi không đọc nguồn ngoài khóa).

**C7. Ví dụ luật không có giá trị cụ thể và đổi từ mã sang tên phòng**
- Câu gốc: "như cột ngày chỉ nhận ngày, mã nhân viên không được trùng, mã phòng phải có trong danh mục" và "`Kinh doanh` là phòng có trong danh mục".
- Đánh giá: **Cần làm rõ**. Phân loại: chưa dạy (danh mục) + khó theo.
- Tác động: luật nói về "mã phòng", ví dụ nói về tên phòng `Kinh doanh`, người đọc phải tự nối "mã" với "tên"; "danh mục" chưa nói là một danh sách phòng nằm trong database. Ba luật không có giá trị minh họa dù spec yêu cầu ví dụ bằng giá trị thật (`NV005`...).
- Đề xuất: viết ví dụ một giá trị (ví dụ mã phòng `KD` thuộc danh sách phòng, kèm "danh sách phòng") hoặc đổi luật thành "tên phòng phải có trong danh sách phòng". Giữ nguyên tên `Kinh doanh` nếu muốn, chỉ cần bài nói "`Kinh doanh` (mã `KD`)". Cần xác nhận mã `KD` ứng với `Kinh doanh` đúng như hồ sơ công ty đã ghi (mục 2 của hồ sơ có `KD | Kinh doanh`); tôi không đối chiếu dữ liệu trong database.

**C8. "quyền" đa nghĩa và "mọi người đều thấy"**
- Câu gốc: "để nhiều người dùng theo quyền"; "thì mọi người đều thấy"; "người có quyền phải đối chiếu hồ sơ rồi cập nhật"; Ứng dụng "xin quyền truy cập".
- Đánh giá: **Cần làm rõ**. Phân loại: chưa dạy.
- Tác động: "quyền" được dùng ba nghĩa (được xem, được sửa, được cấp tài khoản) chưa lần nào được giải thích; "nhiều người dùng" đọc được hai cách; "mọi người đều thấy" trái với "theo quyền" câu trước (ai không có quyền thì không thấy). Với người mới đây là điểm nhầm về khái niệm: ai chịu trách nhiệm sửa dữ liệu sai?
- Đề xuất: viết lại thành "để nhiều người cùng dùng, mỗi người theo quyền được cấp (xem hay sửa)" và đổi "mọi người đều thấy" thành "mọi người có quyền đọc đều thấy"; ở câu cuối, "người có quyền sửa dữ liệu" hoặc "bên phụ trách dữ liệu". Tổng thêm khoảng 10 từ, cắt bù ở X2.

**C9. Ứng dụng không dùng chủ đề luật dữ liệu / hợp lệ ≠ đúng**
- Câu gốc: Ứng dụng 1 và 2 (xem 2.8).
- Đánh giá: **Cần làm rõ**. Căn cứ: quy ước 2.3 ("Bài database nói về ... kiểm dữ liệu bằng luật đã khai báo"), mục tiêu bài có "vì sao vẫn cần kiểm tra dữ liệu".
- Tác động: người học không nhận được việc cụ thể cho nửa bài ý nghĩa nhất với công việc đọc dữ liệu: khi gặp số liệu thì đối chiếu hồ sơ gốc trước khi kết luận. Ứng dụng 2 chỉ lặp đoạn mở.
- Đề xuất: thay Ứng dụng 2 hoặc gộp hai ý thành: lấy số liệu từ nguồn chung thay vì so các file gửi qua lại, và đối chiếu hồ sơ gốc khi số liệu có vẻ bất thường vì dữ liệu hợp lệ vẫn có thể sai. Không thêm từ; chỉ thay.

**C10. "hỏi và thao tác" so với "hỏi"**
- Câu gốc: "ngôn ngữ để hỏi và thao tác với dữ liệu" (định nghĩa, đáp án Q1) so với "SQL dùng để hỏi dữ liệu" (tiêu đề tiểu mục) và "ngôn ngữ để hỏi dữ liệu" (Ghi nhớ).
- Đánh giá: **Cần làm rõ**. Phân loại: chưa dạy ("thao tác").
- Tác động: người mới không biết "thao tác" là thêm/sửa/xóa. Bài không giải thích; người cẩn thận sẽ hỏi "vậy câu SQL của tôi có làm hỏng dữ liệu không", một câu trả lời liên quan đến quyền (C8) mà bài chưa chạm vào.
- Đề xuất: chọn một cách nói thống nhất. Nếu giữ "thao tác" thì thêm một vế "(thêm, sửa, xóa)"; nếu thấy ngoài mục tiêu 1.1 thì chỉ viết "hỏi dữ liệu" ở cả ba chỗ. Quyết định của người viết vì khóa học sau này dạy chủ yếu đọc.

### Cần cắt

**X1. Câu T-SQL**
- Câu gốc: "SQL Server dùng **T-SQL (Transact-SQL)**, cách viết SQL của Microsoft."
- Đánh giá: **Cần cắt** (hoặc gắn mục đích). Căn cứ: không câu nào trong bài, Ghi nhớ hay tự kiểm tra dùng lại; bài hỏi "để làm gì" mà không trả lời được.
- Tác động: thêm một thuật ngữ in đậm, người mới ghi nhớ như thứ phải nhớ. Tiết kiệm khoảng 13 từ.
- Đề xuất: bỏ; nếu người viết thấy người học sẽ gặp từ này, thêm một vế mục đích ("nên ví dụ viết cho phần mềm khác có thể khác"). Tôi không kiểm các bài sau có dùng T-SQL hay không.

**X2. Nhắc lại mục tiêu và dòng bold đứng riêng**
- Câu gốc: "Ở bài này chỉ cần phân biệt database, SQL Server, SQL và SSMS, hiểu nguồn chung giúp gì và giới hạn của luật dữ liệu." và "**Hợp lệ chưa chắc đã đúng.**" (dòng riêng sau Memo).
- Đánh giá: **Cần cắt**. Căn cứ: quy ước 1 (không lặp ý, chỉ Ghi nhớ và tự kiểm tra nhắc lại).
- Tác động: câu đầu lặp mục tiêu đầu bài và Ghi nhớ; dòng bold đứng riêng sau Memo trông như sót, bôi đậm cả câu.
- Đề xuất: rút câu đầu đoạn "Ở bài này chỉ cần..." xuống một vế hoặc bỏ ý đã nằm ở goal, giữ danh sách bài sau (xem B2); đưa "Hợp lệ chưa chắc đã đúng" vào Memo (một hàng) hoặc vào câu Ghi nhớ đầu. Tiết kiệm khoảng 25–30 từ.

### Biên tập

**B1. Bốn tiểu mục (quy ước 2.5 ghi 0–3) và tiêu đề phần chính chỉ mô tả nửa đầu**
- Vị trí: `## Từ file Excel...` với bốn `###`. Đánh giá: **Biên tập**. Căn cứ: quy ước 2.5 "dùng 0–3 tiểu mục"; spec "0–3".
- Tác động nhỏ với người học; lệch quy ước. Tiêu đề h2 hứa "từ file Excel đến một nguồn dữ liệu chung" nhưng phần chính còn gồm SQL Server, SSMS và luật.
- Đề xuất: bỏ tiểu mục đầu "Database lưu dữ liệu", để đoạn định nghĩa nằm ngay dưới h2 sau ba câu mở (còn ba tiểu mục, không đổi từ). Có test nào ràng buộc số `###` hay không tôi không kiểm.

**B2. Danh sách bài sau chưa nối với ba ví dụ luật**
- Câu gốc: "kiểu dữ liệu ở bài 1.3, khóa chính và khóa ngoại ở bài 1.4, các loại ràng buộc khác ở bài 5.2."
- Đánh giá: **Biên tập**. Tác động: người học không thấy "cột ngày chỉ nhận ngày" là của 1.3, "mã không trùng / mã phòng có trong danh mục" là của 1.4. Mã khóa chính và khóa ngoại lần đầu xuất hiện chỉ như nhãn bài. Đề xuất: viết "ba ví dụ trên lần lượt ở bài 1.3 (kiểu ngày) và 1.4 (mã không trùng, mã có trong danh mục)", không đổi số từ. Tôi chưa xác nhận nội dung 1.3, 1.4 theo bản viết lại vì chúng chưa viết lại theo spec.

**B3. "hồ sơ" và "hợp lệ" dùng đa nghĩa/chưa định nghĩa**
- Câu gốc: "hồ sơ được sửa ở bản này" (bản ghi nhân viên) so với "đối chiếu hồ sơ rồi cập nhật" (giấy tờ gốc); "hợp lệ chưa chắc đã đúng" (hợp lệ chưa nghĩa).
- Đánh giá: **Biên tập**. Đề xuất: "đối chiếu với giấy tờ gốc", và thêm một vế sau "hợp lệ" ("hợp lệ: qua được luật đã khai báo"). Cắt bù một từ khác.

**B4. "trên web" và cài SSMS (đường đi)**
- Câu gốc: "trên web hoặc trong SSMS" và "công cụ cài trên máy Windows".
- Đánh giá: **Biên tập**. Phân loại: "web" chưa dạy; cài đặt **[chưa xác minh]**.
- Tác động: "web" có thể bị hiểu là web nào; Giới thiệu nói rõ là bấm Làm bài với mã truy cập, nhưng 1.1 không nhắc mã. Người học Mac/Linux đọc "máy Windows" sẽ biết SSMS không dành cho họ, nhưng bài không nói họ vẫn học được trên web.
- Đề xuất: "trên trang bài tập của khóa học" thay cho "trên web". Không đề nghị thêm hướng dẫn cài vào 1.1 (thuộc trang Giới thiệu).

**B5. Câu 3 và đáp án "Không." tuyệt đối**
- Câu gốc: "Database có tự phát hiện không?" → "Không. Giá trị đó hợp lệ nên luật không chặn."
- Đánh giá: **Biên tập**. Tác động: đáp án đúng cho ví dụ này, nhưng trả lời vô điều kiện. Một database có thể có luật khác bắt được một số trường hợp sai; bài không nói, nhưng chữ "Không" tuyệt đối dễ bị học thành "database không bao giờ phát hiện dữ liệu sai". Đề xuất: "Không, với luật chỉ kiểm mã có trong danh mục" (ngắn).

### Giữ được (công nhận)

- Mở bằng điều quen (workbook/sheet, bản sao), điều kiện nêu đúng, không tuyệt đối hóa Excel ở thân bài.
- Phép so workbook/sheet với database/bảng, dùng cho nhớ nhanh, hợp hình 1.
- "đóng SSMS không làm mất dữ liệu" kèm lý do.
- Đoạn "hợp lệ chưa chắc đúng", ví dụ `Kinh doanh` đúng chuẩn code, nêu ai làm gì; không có chỗ nào hứa quá khả năng của database (luật chỉ có khi khai báo, chỉ chặn khi ghi, không tự biết đúng/sai nghiệp vụ).
- Hay nhầm 2 và Ứng dụng 1 có giá trị thật. Hay nhầm 1 đúng hướng (xem C1 về lời bác).
- Caption cả ba hình nói rõ hình khái niệm/minh họa và phần nào tượng trưng cho gì; alt khớp hình.
- Bold chọn lọc, code đúng, HTML không lộ backtick/escape, link Giới thiệu có đích thật.
- Độ dài: không câu nào nên bỏ vì vòng vo ngoài X1, X2; không đoạn nào quá 120 từ; chuyển ý giữa bốn tiểu mục suôn.

## 6. Ưu tiên

1. **Làm trước (ảnh hưởng độ tin của bài):** C1 (vì sao không workbook chung, kèm Hay nhầm 1), S1 (Memo), C2 + C3 (SQL Server/SSMS và chuỗi quan hệ, đúng điểm bài tồn tại để phân biệt).
2. **Làm kế tiếp (người mới vấp):** C4 (máy chủ), C5 (luật = ràng buộc), C7 (ví dụ mã/tên phòng), C8 (quyền), C9 (Ứng dụng phủ luật), C6.
3. **Biên tập/cắt (đủ ngân sách từ):** X1, X2, B1, B2, B3, B4, C10, B5.
4. Net từ: cắt khoảng 45–50 (X1, X2, vế "Điểm khác" thay), thêm khoảng 40–45 (C4, C5, C7, C8, B3, C10) là cân bằng; để lại mục tiêu ≤ 700 theo helper (hiện 709 kể cả 18 từ import).

## 7. Nguồn và giới hạn

- Nguồn đã dùng: file MDX, HTML trong `dist`, ba PNG, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, `AGENTS.md`, `src/pages/gioi-thieu.astro` và `dist/gioi-thieu/index.html` (kiểm id đích), spec (phần Khung bài nền, Nội dung 1.1), `src/lib/lesson-schema.ts` (BANNED_PHRASES: bài không dùng cụm nào), `tests/helpers/lessons.ts` và `tests/content.test.ts` (hiểu cách đếm và quy tắc kiểm), `src/styles/lesson.css`, tiêu đề/goal bài 1.2, 1.6 và 5.2 (chỉ để biết lời trỏ).
- **Đã kiểm:** văn bản trong HTML khớp MDX; link và anchor tồn tại; không lộ backtick/escape; bố cục figcaption theo CSS.
- **Chưa kiểm:** hiển thị thực trên trình duyệt (không tương tác browser), dark mode, mobile, hành vi nút "Đã học xong"; test của repo (không chạy); số từ theo helper thật (dùng bản dựng lại); nội dung bài 1.2 cũ, 1.6 và 5.2 ngoài tiêu đề.
- **Chưa xác minh (không đoán):** SSMS chỉ chạy trên Windows (đúng theo hiểu biết của tôi, chưa kiểm nguồn Microsoft); SQL Server có/không có giao diện riêng; việc ràng buộc có thể bị vô hiệu hóa (C6); năng lực chia sẻ workbook của Excel (C1); `KD` là mã của `Kinh doanh` trong database thật (chỉ thấy trong hồ sơ công ty).
- Review này là học thử từ góc người học, không xác nhận SQL/UI/Azure đã chạy đúng.

## 8. Kết luận

Với người chỉ biết Excel cơ bản, bài đủ để nói lại bốn tên (database, SQL Server, SQL, SSMS), hiểu nguồn chung giảm sót sửa và biết dữ liệu hợp lệ vẫn có thể sai; không thấy câu nào hứa quá khả năng của database, và ba câu tự kiểm tra trả lời được từ nội dung đã giảng. Còn vướng ở bốn chỗ: (1) bài chưa trả lời câu "vì sao không đặt một workbook chung", mà lại dùng đúng ý đó làm điểm khác biệt (C1, S1); (2) hình SQL Server và Ghi nhớ không giúp thấy mối liên hệ SSMS → SQL Server → database (C2, C3); (3) vài thuật ngữ treo ("máy chủ", "quyền", "ràng buộc", "bật") (C4–C8); (4) Ứng dụng bỏ qua nửa chủ đề về luật dữ liệu (C9). Tất cả sửa được trong ngân sách từ hiện có nếu cắt X1 và X2.

## 9. Đếm finding theo mức

| Mức | Số |
|---|---|
| Cần sửa | 1 (S1) |
| Cần làm rõ | 10 (C1–C10) |
| Cần cắt | 2 (X1, X2) |
| Biên tập | 5 (B1–B5) |
| Giữ được | 7 nhóm công nhận ở mục 5 |
