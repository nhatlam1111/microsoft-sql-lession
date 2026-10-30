# Review độc lập: bài 1.3 Kiểu dữ liệu (bài nền)

## 1. Phạm vi, phiên bản, công cụ

- Bài: `src/content/lessons/1-3-kieu-du-lieu.mdx` (không có YAML). Nhánh `feat/level-1-foundation-lessons`, commit `2cc3293`, working tree sạch lúc bắt đầu.
- Build đối chiếu: `dist/bai/1-3-kieu-du-lieu/index.html`, sửa lúc 17:28; source sửa lúc 17:27 nên build mới hơn source. Tôi đọc nội dung phần thân HTML và thấy khớp từng đoạn với MDX (đối chiếu bằng mắt, không diff máy).
- Đã đọc: `AGENTS.md`, `docs/quy-uoc.md` (mục 2.5), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, bài 1.1, bài 1.2, spec `2026-10-30-level-1-foundation-lessons-design.md` (Khung bài nền, Nội dung từng bài). Để biết hình `Ssms` và `Memo` hiển thị gì, tôi đọc mã nguồn hai component `Ssms.astro`, `Memo.astro` (`Ssms.astro` import `HRM_Demo.sql` nhưng tôi không mở file đó).
- Công cụ: Claude Code, model `claude-sonnet-5-5`, chỉ đọc nguồn và HTML. Không mở browser, không chạy SQL/API, không kết nối database, không đọc report cũ.
- Đếm từ: dùng lại đúng logic `proseParagraphs` (sao chép vào file tạm ngoài repo) cho 657 từ, nằm trong khoảng 500–700 và còn dư khoảng 43 từ.

## 2. Rà theo thứ tự bài

Cách đọc: tôi là người chỉ biết Excel, chưa biết SQL. Chỉ dùng 1.1, 1.2 và chính bài này.

### 2.1 Frontmatter

Mục tiêu: "bạn đọc được kiểu dữ liệu và khả năng nhận NULL của cột, biết vì sao database khai báo kiểu cho cả cột và chuyển kiểu có thể đổi giá trị".

Câu này đọc như "biết vì sao ... chuyển kiểu có thể đổi giá trị". Bài chỉ nói chuyển kiểu có thể đổi giá trị và nêu ba kết quả, không giải thích vì sao đổi (xem F2, F8). Đoạn "Ở bài này chỉ cần..." dùng đúng chữ "biết chuyển kiểu có thể đổi giá trị", lệch nhẹ với frontmatter.

### 2.2 "Từ kiểu của ô đến kiểu của cột" (hai đoạn mở)

- "Trong sheet chưa đặt Data Validation, mỗi ô tự mang kiểu riêng, nên cùng một cột có thể lẫn ngày, số và chữ." Đúng và có điều kiện ("chưa đặt"), không tuyệt đối hóa Excel. Data Validation đã học ở 1.1. Đoạn trả lời được "vì sao" Excel dễ lẫn. Điều chưa nói là kiểu ô Excel do giá trị bên trong quyết định; người dùng Excel thường nghĩ kiểu do Format Cells quyết định, nhưng câu kế tiếp ("Format Cells chỉ đổi cách hiển thị") sửa đúng ý này. Tôi coi là đủ.
- "Database làm khác: mỗi cột được khai báo một kiểu dữ liệu dùng cho mọi dòng." Lời dẫn từ Excel sang database rõ. "Khai báo" đã có ở 1.2. "Kiểu dữ liệu" được in đậm nhưng không có câu định nghĩa riêng; người mới suy ra được "loại giá trị cột nhận: ngày, số, chữ" từ câu liền trước, nên tôi không coi là thiếu.
- "Nhờ vậy SQL Server so sánh và sắp xếp `NgayVaoLam` theo ngày, tính toán `LuongCoBan` theo số. Nếu lưu ngày thành chữ, thứ tự chữ không bảo đảm là thứ tự thời gian." Trả lời "để làm gì" đúng và không hứa quá ("không bảo đảm"). Chỗ còn trống là "vì sao thứ tự chữ không bảo đảm": không có ví dụ nào (xem F9, mức nhẹ). Chữ "không bảo đảm" đúng về kỹ thuật vì chuỗi dạng năm-tháng-ngày vẫn xếp đúng, chuỗi ngày/tháng/năm thì không.

### 2.3 "Đọc kiểu của cột"

- Đoạn Object Explorer: định nghĩa tại chỗ ("khung cây bên trái liệt kê bảng và cột"), chỉ đường "mở bảng, mở Columns", nói rõ chữ trong ngoặc là kiểu và khả năng nhận NULL, trỏ PK/FK sang bài 1.4. Người mới đọc được hình mà không cần hiểu khóa. Đoạn dài 70 từ nhưng gánh năm việc; vẫn dưới giới hạn đoạn. NULL và NOT NULL được định nghĩa ngay trong đoạn này.
- Hình `Ssms` (mô phỏng, sinh từ cấu trúc bảng mẫu theo mã `Ssms.astro`): hai cột `LuongCoBan` và `NgayKetThuc` có viền xanh đúng như caption; HTML xác nhận phần "(decimal(18,0), not null)" và "(date, null)" có lớp đánh dấu, các cột khác không. Caption nói rõ phần được đánh dấu và nêu "bộ mẫu để NgayKetThuc là NULL" đúng quy ước mục 3 (đây là quy ước bộ mẫu, khớp hồ sơ công ty: 25 hợp đồng không xác định thời hạn có `NgayKetThuc` NULL). Không lộ backtick hay escape trong figure.
- Câu dẫn bảng và bảng bốn kiểu: xem F1 (`n`), F7 (ví dụ không nằm trong hình).
- Đoạn `decimal(4,1)`/`decimal(18,0)`: số học đúng (4 chữ số, 1 sau dấu thập phân, nên tối đa ba chữ số phần nguyên, như `999.9`). Trả lời được câu hỏi "p, s nghĩa là gì" bằng ví dụ. Câu `N'Trần Thị Mai'`: giải thích N, nói "có thể mất dấu" đúng mức. Dấu nháy đơn quanh chuỗi chưa được giải thích nhưng không cản việc hiểu "N đứng trước". "Unicode" không có định nghĩa riêng, được diễn giải bằng "giữ được dấu tiếng Việt" ngay ở bảng; đủ cho bài này.
- Đoạn `SoCCCD`: nêu lý do rõ (cần giữ số 0 đầu, không cộng trừ), đúng với giới hạn "chọn kiểu theo ý nghĩa". Nó nằm dưới tiêu đề "Đọc kiểu của cột" nhưng nói về chọn kiểu (xem F6).

### 2.4 "Khi giá trị không đúng kiểu của cột"

- "Khi nhận chữ để ghi vào cột ngày hoặc số, SQL Server có thể tự đổi sang kiểu của cột, gọi là chuyển kiểu ngầm." Định nghĩa đủ cho nhu cầu của bài; thuật ngữ in đậm tại chỗ định nghĩa. Giới hạn của định nghĩa này: chỉ nói về lúc ghi. Bài không nói chuyển kiểu ngầm cũng xảy ra lúc so sánh (xem mục 5, chưa xác minh phía bài sau).
- Ba kết quả: bullet 1 đúng và đủ ngắn, nhưng `9610000` (chữ) và `9610000` (số) hiển thị giống hệt nhau nên người đọc không thấy khác biệt, chỉ nhờ chữ "chữ"/"số" đứng trước. Bullet 2 là ví dụ có giá trị nhất của bài nhưng thiếu "vì sao" (xem F2). Bullet 3 đúng.
- "Kiểu dữ liệu chỉ kiểm được một phần ... Lưu được chưa chắc đã đúng ý." Đúng và đúng quy ước mục 2 ("lưu được" khác "đúng ý"). Khớp hồ sơ công ty: script không khai báo `CHECK`, nên "cột tiền vẫn nhận số âm nếu không có luật chặn" đúng điều kiện. Ý này tiếp nối "hợp lệ chưa chắc đúng" của 1.1 bằng ví dụ riêng của kiểu, không phải lặp.
- "Ở bài này chỉ cần..." có đủ trỏ bài: chuyển kiểu ngầm 2.2, NULL 2.5, Unicode 2.7, luật khác 5.2. Tên các bài tương ứng (WHERE, NULL, hàm chuỗi và tiếng Việt, ràng buộc) khớp từng lời trỏ theo tiêu đề trong frontmatter của các bài đó (chỉ đọc dòng `title`).

### 2.5 Hay nhầm ở đâu

- Mục 1: "21.25 vào decimal(4,1) thành 21.3 ... Còn 1000.0 vượt ba chữ số phần nguyên thì bị từ chối." Có giá trị thật: cho thấy cái giá của việc khai báo `s` và `p`, và là điểm tựa cho 3.1. Theo tài liệu SQL Server mà tôi biết, chuyển số có phần lẻ thừa xuống `decimal` nhỏ hơn thì làm tròn không báo lỗi, tràn phần nguyên thì lỗi tràn số; tôi chưa chạy nên ghi là chưa xác minh bằng chạy thực.
- Mục 2: chuỗi rỗng và chuỗi toàn dấu cách vẫn vào cột chữ `NOT NULL` "nếu không có luật khác". Có giá trị thật, có điều kiện, "chuỗi rỗng" được giải nghĩa ngay ("không có ký tự nào"). Đúng yêu cầu spec là điểm tựa cho 2.5.

Cả hai mục đều có hậu quả cụ thể, không lặp phần chính, không cho đủ khuôn.

### 2.6 Ứng dụng

- "Đề xuất kiểu cho cột mới": dùng được, nhưng ví dụ "mã cần giữ số 0 ở đầu" lặp đoạn `SoCCCD` ngay phía trên (xem F10). Chưa tận dụng kiến thức vừa học về NULL và `decimal(p,s)`.
- "Thống nhất file trước khi nhập": hướng đúng nhưng chưa nói được "quy định cách gửi" cụ thể là gì (xem F5).

### 2.7 Ghi nhớ

Hàng 1 và 2 khớp phần chính. Hàng 3 nêu ý bài chưa dạy (xem F3). Phía "Bên SQL" của `Memo` luôn hiển thị trong thẻ code có tô màu cú pháp (mã `Memo.astro`), nên chữ tiếng Việt trong cột này hiện kiểu monospace; đây là hành vi của component chung, không riêng bài này, tôi chưa xem ảnh bản render nên không nhận xét về màu.

### 2.8 Các câu hỏi "tại sao, để làm gì" tôi tự đặt

| Câu hỏi | Bài đã trả lời chưa |
|---|---|
| Vì sao database bắt khai báo một kiểu cho cả cột? | Có, đoạn mở thứ hai (so sánh, sắp xếp, tính toán theo kiểu). Chưa có ví dụ cụ thể (F9). |
| Excel không có kiểu cột, vậy khác gì trong thực tế? | Có, "cùng một cột có thể lẫn ngày, số và chữ"; không nói hậu quả trong Excel, nhưng người dùng Excel tự nối được. |
| Đọc kiểu và NULL để làm gì? | Một phần, ở Ứng dụng; phần chính chỉ nêu cách đọc. Hợp lý cho bài nền. |
| NULL là gì, khác ô trống, số 0, chuỗi rỗng ra sao? | Chỉ định nghĩa NULL ("chưa có hoặc chưa biết") và chuỗi rỗng ở Hay nhầm; phần so sánh để bài 2.5. Có chỉ rõ bài 2.5. |
| `n` trong `varchar(n)` là gì? | Chưa (F1). |
| Vì sao có cả `varchar` và `nvarchar`, sao không dùng một loại? | Chưa. Bài chỉ nói `varchar` có thể mất dấu. Không bắt buộc cho mục tiêu đọc kiểu; tôi không đề xuất thêm vì cái giá (dung lượng) bị spec loại. |
| Vì sao `01/02/2024` thành ngày 2 tháng 1? | Chưa (F2). |
| Vì sao `decimal` làm tròn mà không báo lỗi? | Chỉ nêu hiện tượng, chấp nhận được với bài nền. |
| Vì sao `SoCCCD` là chữ? | Có, đoạn `SoCCCD`. |
| Cái giá của việc khai báo chặt? | Có: giá trị bị từ chối hoặc bị đổi, nêu ở mục "Khi giá trị không đúng kiểu" và Hay nhầm 1. |

## 3. Bảng tiền đề từng câu tự kiểm tra

Cách làm: tôi thử trả lời mỗi câu chỉ bằng phần thân bài, rồi mới mở đáp án.

| Câu | Cần gì để trả lời | Dạy ở đâu | Thiếu gì |
|---|---|---|---|
| 1. Từ nhãn `LuongCoBan (decimal(18,0), not null)`, bạn đọc được gì? | Biết nhãn gồm tên cột, kiểu và NULL; hiểu `decimal(p,s)` là p chữ số tối đa, s chữ chữ số lẻ; hiểu `not null`. | Đoạn Object Explorer (nhãn và NULL), caption hình (chính cột này), dòng `decimal(p,s)` trong bảng và đoạn `decimal(4,1)`/`decimal(18,0)`. | Không thiếu. Nhãn trong hình viết thường `not null`, phần chữ viết `NOT NULL`; không gây hiểu nhầm vì caption diễn giải. Trả lời được. |
| 2. Chuyển kiểu ngầm là gì, và có thể dẫn tới những kết quả nào? | Định nghĩa chuyển kiểu ngầm; ba kết quả. | Đoạn mở mục "Khi giá trị không đúng kiểu" và ba bullet. | Không thiếu. Trả lời được từ bài, đáp án đúng bằng đúng ba bullet. |
| 3. Vì sao `SoCCCD` dùng kiểu chữ dù chỉ gồm chữ số? | Biết kiểu chữ là gì, số 0 đầu mất khi lưu dạng số, mã định danh không cộng trừ. | Đoạn `SoCCCD` ngay sau bảng. | Không thiếu, nhưng là nhắc lại gần nguyên văn ví dụ. Người đọc không cần suy luận; đáp án lặp lại câu trong bài. |

Độ phủ so với mục tiêu: (a) đọc kiểu và NULL: câu 1; (c) chuyển kiểu có thể đổi giá trị: câu 2; (b) vì sao database khai báo kiểu cho cả cột: không câu nào (xem F4). Không có câu nào dạy bù kiến thức chưa có trong bài. Đáp án ngắn và tự đủ nghĩa, nằm đúng sau `Memo`.

## 4. Các finding

Quy ước: **Cần làm rõ** là người mới có thể vấp hoặc hiểu mơ hồ; **Biên tập** là chỉnh câu chữ, không đổi kiến thức; **Cần cắt** là lặp hoặc thừa; **Giữ được** là phần đã đúng và nên giữ.

### F1. Chữ `n` trong `varchar(n)` và `nvarchar(n)` không được giải thích — Cần làm rõ

- Câu gốc: "tên kiểu đứng trước, giới hạn nếu có nằm trong ngoặc" và hàng `varchar(n)`, `nvarchar(n)` trong bảng (đoạn trước bảng; bảng).
- Tác động: người mới đọc `HoTen (nvarchar(100), not null)` hay `MaHD (PK, varchar(20), ...)` trong hình và không biết 20, 100 là gì. `decimal(p,s)` có giải thích p, s; riêng `n` chỉ được gọi là "giới hạn", không nói giới hạn cái gì. Câu tự kiểm tra 1 chỉ kiểm nhãn `decimal`, nên chỗ này không có chỗ nào kiểm.
- Căn cứ: đọc nguồn; hình có `varchar(20)`, `varchar(10)`, `nvarchar(50)`, bài dùng `varchar(12)` cho `SoCCCD`.
- Đề xuất: thêm vế "`n` là số ký tự tối đa" vào cột "Ý nghĩa cần nhớ" của hàng đầu hoặc đoạn trước bảng (khoảng 7 từ). Không cần nói điều gì xảy ra khi vượt `n`; điều đó chưa xác minh ở đây và có thể để bài sau.

### F2. "Vì sao `01/02/2024` thành ngày 2 tháng 1" chưa được trả lời — Cần làm rõ

- Câu gốc: "trên database khóa học, chữ `01/02/2024` thành `2024-01-02`, tức ngày 2 tháng 1, dù người nhập có thể muốn ngày 1 tháng 2." (bullet 2 mục "Khi giá trị không đúng kiểu").
- Tác động: đây là kết quả gây bất ngờ nhất của bài. Người mới đọc "trên database khóa học" và không biết đó là thiết lập (đọc tháng trước ngày) hay ngẫu nhiên, nên cũng không biết hệ thống khác có thể cho kết quả khác. Hệ quả: Ứng dụng 2 ("quy định cách gửi ngày") không có căn cứ để chọn.
- Căn cứ: hồ sơ công ty mục 1 ghi database khóa học dùng `us_english`, DATEFORMAT `mdy` nên kết quả `2024-01-02` hợp lý; đó là cài đặt đọc ngày (`mdy` = tháng, ngày, năm). Spec đã bỏ thuật ngữ `DATEFORMAT` nên không nên đưa lại; chỉ cần nói bằng lời thường. Tôi nghi hồ sơ gọi đây là thuộc tính "của database" hơi rộng, vì trong SQL Server cách đọc ngày thường gắn với ngôn ngữ của kết nối/đăng nhập; chưa xác minh, và không cần đưa phân biệt này vào bài.
- Đề xuất: sửa câu thành kiểu "...vì thiết lập ở đây đọc tháng trước, ngày sau" (khoảng 10 từ), và bỏ cụm "trên database khóa học" hoặc giữ nếu muốn nhấn phạm vi.

### F3. Hàng thứ ba của Ghi nhớ đưa ý bài chưa dạy — Cần làm rõ

- Câu gốc: `['Ô để trống trong file', 'NULL hay chuỗi rỗng; NOT NULL chưa đủ']` (Ghi nhớ).
- Tác động: phần chính không nói ô trống trong file khi đưa vào database thành NULL hay chuỗi rỗng, cũng không nói trường hợp nào là gì. Hàng này nói "NULL hay chuỗi rỗng" như một lựa chọn mơ hồ. Ghi nhớ chỉ nên nhắc ý đã có (quy ước mục 1).
- Căn cứ: đọc nguồn; phần chính và Hay nhầm chỉ nói "NOT NULL không bảo đảm đã nhập đầy đủ" và chuỗi rỗng khác NULL.
- Đề xuất: viết lại bên Excel thành điều đã nêu, ví dụ `['Ô trống, ô chỉ có dấu cách nhìn giống nhau', 'NULL khác chuỗi rỗng; NOT NULL chưa bảo đảm đã nhập']`. `Memo` không tính vào số từ nên không ảnh hưởng ngân sách.

### F4. Tự kiểm tra không phủ vế "vì sao khai báo kiểu cho cả cột" — Cần làm rõ

- Câu gốc: mục tiêu frontmatter "biết vì sao database khai báo kiểu cho cả cột" (frontmatter) và ba câu tự kiểm tra.
- Tác động: quy ước yêu cầu bộ câu phủ mục tiêu đầu bài. Câu 3 chỉ nhắc lại ví dụ `SoCCCD`, không kiểm ý lớn nhất của bài (kiểu khai báo theo cột để so sánh, sắp xếp, tính đúng). Người học qua được bộ câu mà chưa biết vì sao Excel và database khác nhau.
- Căn cứ: phần 3.
- Đề xuất: thêm câu thứ tư, ví dụ "Vì sao database khai báo kiểu cho cả cột, trong khi mỗi ô Excel tự mang kiểu?" với đáp án hai vế (so sánh, sắp xếp, tính toán theo đúng kiểu; một cột không lẫn ngày với chữ). Khoảng 30 từ. Có thể bù bằng cách bỏ câu "Kiểu được chọn theo ý nghĩa của dữ liệu." trong đáp án câu 3 (8 từ).

### F5. Ứng dụng 2 bảo "quy định cách gửi" nhưng bài chưa nói cách nào an toàn — Cần làm rõ

- Câu gốc: "đọc kiểu cột để quy định cách gửi ngày, số tiền và giá trị chưa có, tránh ô bị từ chối hoặc bị đổi nghĩa." (Ứng dụng).
- Tác động: người học biết điều phải tránh (`01/02/2024`, `chưa rõ`) nhưng không biết nên gửi ngày dạng nào, tiền ghi sao, ô chưa có để thế nào. "Giá trị chưa có" nối với NULL nhưng bài không nói ô trống trong file khi nhập vào cột ngày hoặc số thành gì.
- Căn cứ: đọc nguồn. Có thêm một nghi ngờ: theo hiểu biết của tôi về SQL Server, chuỗi rỗng đổi sang kiểu ngày cho `1900-01-01` thay vì NULL; đây là kiến thức chung, tôi chưa chạy nên ghi là chưa xác minh trên database khóa học. Nếu đúng thì đó là một ví dụ "đổi khác ý người nhập" rất sát công việc, nhưng thêm vào bài là vượt ngân sách và vượt mức bài nền.
- Đề xuất: giữ bài nền gọn, chỉ sửa ý cho đúng với điều đã dạy, ví dụ "...chốt trước ngày dùng dạng `2024-03-01`, số tiền chỉ gồm chữ số, ô chưa có gửi thế nào" nếu người viết xác minh được dạng ngày an toàn trên database khóa học; nếu chưa xác minh thì đổi sang việc làm được từ điều đã dạy: hỏi IT cột nhận `NULL` không, số có phần lẻ bao nhiêu chữ số.

### F6. Tiêu đề "Đọc kiểu của cột" chứa cả `N'...'` và chọn kiểu theo ý nghĩa — Biên tập

- Câu gốc: tiểu mục "Đọc kiểu của cột" chứa đoạn `N'Trần Thị Mai'` và đoạn "Kiểu được chọn theo ý nghĩa của dữ liệu...".
- Tác động: hai đoạn cuối nói về viết giá trị và chọn kiểu, không phải đọc kiểu. Người học tìm lại ý "vì sao `SoCCCD` là chữ" theo mục lục sẽ không nghĩ đến mục này; ba trong năm ý bài sau trỏ về (N, chọn kiểu, decimal) nằm chung một tiểu mục.
- Căn cứ: đọc nguồn; spec cho 0–3 tiểu mục, hiện mới có hai.
- Đề xuất: tách đoạn `SoCCCD` (và nếu muốn cả đoạn `N'...'`) sang tiểu mục thứ ba, đặt tên như "Chọn kiểu theo ý nghĩa". Thêm tiêu đề không tính vào từ.

### F7. Bảng nói "các kiểu trong hình" nhưng ví dụ không nằm trong hình — Biên tập

- Câu gốc: "Bảng dưới giải thích các kiểu trong hình" (đoạn trước bảng) và các ví dụ `NhanVien.MaNV`, `NhanVien.HoTen`, `NhanVien.NgayVaoLam`, `DonNghiPhep.SoNgay` (bảng).
- Tác động: hình mở bảng `HopDong`; bảng ví dụ lấy từ `NhanVien` và `DonNghiPhep`. Người học không đối chiếu được ví dụ với hình, và `HoTen`, `SoNgay` xuất hiện lần đầu ở đây. Caption hình cũng không nói đây là hình mô phỏng (chỉ có trong `aria-label`), trong khi quy ước mục 2.2 yêu cầu nói rõ hình giả lập; ở đây cấu trúc cột là lấy từ bảng mẫu nên tôi coi là rủi ro thấp.
- Căn cứ: HTML và mã `Ssms.astro`. Chưa xác minh: kiểu thật của `NhanVien.HoTen`, `NgayVaoLam`, `DonNghiPhep.SoNgay` trên database (tôi không đọc script). Repo có một chỗ khác ghi `SoNgay` là `decimal(4,1) NOT NULL` (bài 3.1), khớp bài này nhưng không phải bằng chứng từ database.
- Đề xuất: đổi câu dẫn thành "Bảng dưới giải thích các kiểu thường gặp, kèm ví dụ từ các bảng khác" (cộng khoảng 6 từ); hoặc đưa `HopDong` vào ví dụ để khớp hình. Thêm "hình mô phỏng" vào caption nếu muốn tuân quy ước.

### F8. Mục tiêu thiếu chữ "biết" trước "chuyển kiểu" — Biên tập

- Câu gốc: "biết vì sao database khai báo kiểu cho cả cột và chuyển kiểu có thể đổi giá trị" (`goal`).
- Tác động: đọc như "vì sao ... chuyển kiểu có thể đổi giá trị", nhưng bài chỉ trả lời "có thể đổi" chứ không nói vì sao đổi.
- Căn cứ: đối chiếu `goal` với đoạn "Ở bài này chỉ cần...".
- Đề xuất: "..., biết vì sao database khai báo kiểu cho cả cột và biết chuyển kiểu có thể đổi giá trị".

### F9. "Thứ tự chữ không bảo đảm là thứ tự thời gian" chưa có ví dụ — Biên tập (tùy chọn)

- Câu gốc: "Nếu lưu ngày thành chữ, thứ tự chữ không bảo đảm là thứ tự thời gian." (đoạn mở thứ hai)
- Tác động: đây là câu trả lời duy nhất cho "vì sao phải khai báo kiểu", nhưng hơi trừu tượng. Người dùng Excel quen với lỗi "số lưu dạng chữ" nên sẽ nối được, tuy bài không dùng chữ này.
- Căn cứ: đúng về kỹ thuật (xếp chữ `01/02/2024` trước `15/01/2024` dù là ngày muộn hơn).
- Đề xuất: chỉ làm nếu còn ngân sách sau F1, F2, F4: thêm ví dụ ngắn khoảng 12 từ. Nếu không đủ chỗ thì bỏ, bài vẫn đứng được.

### F10. Ứng dụng 1 lặp ví dụ số 0 ở đầu và bỏ lỡ kiến thức vừa học — Cần cắt

- Câu gốc: "...để chọn kiểu phù hợp, như mã cần giữ số `0` ở đầu." (Ứng dụng 1)
- Tác động: ví dụ này vừa nằm trong đoạn `SoCCCD`, vừa là đáp án câu 3. Ba lần trong 600 từ. Ứng dụng vẫn đúng, nhưng thêm giá trị nếu nhắc điều chỉ bài này dạy: cột có được để trống không, số có phần lẻ không.
- Căn cứ: quy ước mục 1 (không lặp ngoài Ghi nhớ và tự kiểm tra).
- Đề xuất: bỏ vế "như mã cần giữ số `0` ở đầu" (khoảng 8 từ) hoặc thay bằng "và cột có được để trống không". Phần cắt này bù cho các thêm ở F1, F2, F4.

### F11. Dùng lẫn "chữ" và "chuỗi"; `NULL` vừa đậm vừa code — Biên tập

- Câu gốc: "cột lưu chữ (còn gọi là **chuỗi**)", "kiểu chữ" (câu 3), "Chuỗi thường dùng cho mã" (bảng), `**`NULL`**` (đoạn Object Explorer).
- Tác động: người mới có thể tự hỏi "chữ" và "chuỗi" có khác nhau không; bài đã định nghĩa đồng nghĩa một lần nên chỉ nhẹ. `NULL` in đậm lẫn code ở lần đầu, nhưng định nghĩa nằm ở câu sau; không sai, chỉ hơi nhiều dấu hiệu cho một từ.
- Căn cứ: quy ước mục 2.2.
- Đề xuất: sau khi định nghĩa, dùng "chuỗi" cho kiểu (câu 3 viết "kiểu chuỗi"), giữ "chữ" cho giá trị lời văn. `NULL` giữ code, bỏ đậm hoặc đặt đậm ở câu định nghĩa. Mức thấp, làm nếu tiện.

### Phần đã đúng, nên giữ (Giữ được)

- **G1.** Mở bằng Excel rồi chuyển sang database bằng câu "Database làm khác", rõ và có điều kiện ("chưa đặt Data Validation").
- **G2.** "Format Cells chỉ đổi cách hiển thị, không biến một ô chữ thành ngày hay số": đúng và đúng ý đề ra "Kiểu của ô và Format Cells".
- **G3.** Hình `Ssms` và caption: đánh dấu đúng hai cột, nói rõ phần đánh dấu, không lộ backtick/escape trong HTML.
- **G4.** Giải thích `decimal(4,1)` và `decimal(18,0)`; số học đúng.
- **G5.** Đoạn `SoCCCD`: lý do rõ, đúng ý "chọn kiểu theo ý nghĩa", ngắn đúng như spec yêu cầu.
- **G6.** Mục "Khi giá trị không đúng kiểu của cột": ba kết quả chia rõ, và "Lưu được chưa chắc đã đúng ý" đúng quy ước, tách "hợp lệ" với "đúng".
- **G7.** Hai mục Hay nhầm: có giá trị thật, có điều kiện ("nếu không có luật khác"), không hứa quá.
- **G8.** Đoạn "Ở bài này chỉ cần...": đủ lời trỏ, khớp tên bài đích.
- **G9.** Định dạng: giá trị dẫn chứng (`NV001`, `2024-03-01`, `01/02/2024`, `chưa rõ`...), tên bảng/cột, kiểu SQL, `NULL`/`NOT NULL` đều dùng code; chữ đậm chỉ ở khái niệm (`cột`, `kiểu dữ liệu`, `chuyển kiểu ngầm`, `chuỗi`), tên giao diện (`Format Cells`, `Object Explorer`, `Columns`) và nhãn đầu bullet. `N&#39;` ở bản render là nháy thẳng.

## 5. Ưu tiên

1. F4 (phủ mục tiêu) và F3 (Ghi nhớ nêu ý chưa dạy): cùng sửa trong phần ôn, ít tốn từ.
2. F2 (vì sao `01/02/2024`) và F1 (`n`): hai chỗ người mới sẽ hỏi ngay.
3. F5, F7, F6, F8: chỉnh câu chữ nhỏ, chủ yếu không tốn từ.
4. F10, F11, F9: cắt lặp và làm đẹp, làm nếu còn thời gian.

Ngân sách từ: bài đang 657/700. Tổng thêm ước lượng cho F1 (+7), F2 (+10), F4 (+30), F7 (+6) ≈ +53; cắt F10 (-8), "Kiểu được chọn theo ý nghĩa của dữ liệu." ở đáp án câu 3 (-8), và nếu cần rút câu "Các bảng khác còn có vài kiểu khác;" (-7) ≈ -23. Kết quả ước tính khoảng 687; con số này là ước lượng, cần đếm lại bằng `proseParagraphs` sau khi sửa.

## 6. Kết luận về kiến thức

Bài đủ để người mới đọc được nhãn kiểu và NULL trong Object Explorer, hiểu vì sao database khai báo kiểu cho cả cột, biết chuyển kiểu ngầm có thể giữ, đổi hoặc từ chối giá trị, và biết các bài sau (2.2, 2.5, 2.7, 5.2) sẽ đi sâu. Tôi không tìm thấy câu nào sai về kỹ thuật hay hứa quá; không có finding mức **Cần sửa**. Những chỗ còn vướng là `n` của `varchar(n)`, lý do `01/02/2024` thành ngày 2 tháng 1, và hàng thứ ba của Ghi nhớ nêu ý chưa dạy. Câu tự kiểm tra làm được hoàn toàn bằng nội dung bài, nhưng thiếu câu phủ ý "vì sao khai báo kiểu cho cả cột". Mật độ khái niệm cao (khoảng 14 thuật ngữ mới trong 657 từ), ngắn nhưng không phải danh sách định nghĩa vì mỗi khái niệm lớn đều có "vì sao" hoặc ví dụ đi kèm; đọc 7 phút là khít nếu người học chỉ đọc lướt bảng.

Số finding: Cần sửa 0; Cần làm rõ 5 (F1–F5); Cần cắt 1 (F10); Biên tập 5 (F6–F9, F11); Giữ được 9 (G1–G9).

## 7. Nguồn và giới hạn

- Nguồn đã đọc: MDX bài 1.3, phần thân HTML bản build, các tài liệu liệt kê ở mục 1, mã `Ssms.astro` và `Memo.astro`, dòng `title` của các bài 2.2, 2.5, 2.7, 5.2 (để kiểm lời trỏ).
- Một lần tìm chuỗi `SoCCCD` và `decimal(4,1)` trong repo trả về cả các dòng của bài khác, spec cũ và một dòng ghi chú "bằng chứng đã kiểm" trong spec `2026-10-18-level-1-full-lessons-design.md` của tác giả. Tôi không dùng dòng đó để kết luận; các nhận xét về hành vi SQL Server đều ghi là chưa xác minh bằng chạy.
- Chưa xác minh (cần chạy hoặc xem database): kiểu thật của `NhanVien.MaNV`, `HoTen`, `NgayVaoLam`, `SoCCCD` (`varchar(12)`) và `DonNghiPhep.SoNgay`; kết quả `01/02/2024` thành `2024-01-02`; làm tròn `21.25` thành `21.3`; lỗi khi nhập `1000.0` và `chưa rõ`; hành vi chuỗi rỗng khi đổi sang kiểu ngày; việc `N'...'` không dấu có làm mất dấu hay không.
- Chưa kiểm: hiển thị thật trên trình duyệt (bố cục hình `Ssms`, màu tô cú pháp trong `Memo`, thanh bên), thao tác bấm `Đã học xong`, độ rộng 1280px/1024px.
- Không đọc bài sau hay đáp án để bù kiến thức; chỉ đọc tiêu đề bài đích để kiểm lời trỏ. Việc bài 2.2 và các bài sau dùng "chuyển kiểu ngầm" có mở rộng sang lúc so sánh (không chỉ lúc ghi) hay không, tôi chưa kiểm tra; ghi để người viết đối chiếu khi chốt định nghĩa ở 1.3.
