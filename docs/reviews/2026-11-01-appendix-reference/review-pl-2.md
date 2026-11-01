# Review độc lập PL.2 — Chuyển đổi kiểu dữ liệu

## Phạm vi, phiên bản và công cụ

- Vai trò học thử: Business Consultant khó tính, chỉ biết Excel văn phòng cơ bản; chưa mặc định biết SQL, lập trình, quản trị, VLOOKUP hoặc PivotTable.
- Bài: `src/content/appendices/pl-2-chuyen-doi-kieu-du-lieu.mdx`; không YAML, không `Exercises`.
- Source theo gói giao: nhánh `codex/appendix-reference-pl-1-6`, nền `5c2604a` cùng thay đổi đang giao. SHA256 tự đọc lại khớp bản đóng băng: `b14670955944628dd7de45884ddc79d18a1b6f057baead56efa2c4feef148242`.
- Build: `dist/phu-luc/pl-2-chuyen-doi-kieu-du-lieu/index.html`, mốc file `2026-11-01 02:13:39`; SHA256 HTML đọc trong lượt này: `cd232e6565029fac3888da0873de39cf3df5b6871d98857f2deec270d75ae2c5`.
- Model: **kế thừa model của phiên**; không đổi model, không giao reviewer khác.
- Công cụ thực tế: PowerShell đọc file/hash, `rg`, Python `html.parser` và so sánh chuỗi SQL nguồn với HTML. Chỉ đọc nguồn, HTML và CSS build; không mở browser, chạy SQL, kết nối database, gọi runner/API hay nộp bài.
- Áp dụng biến thể tra cứu đã duyệt ở §2.7 của quy ước và các mục “Quyết định đã duyệt”, “Mục tiêu và phạm vi”, “Biến thể bài tra cứu” trong spec. Không yêu cầu khôi phục tình huống đơn, hai H3, Memo hay Exercises. Bảng năm kiểu là phạm vi rút gọn có chủ đích.

Đã đọc AGENTS.md, quy ước hiện hành (đặc biệt §2.7, §4.5), lesson-template, hồ sơ công ty, mẫu 1.1/2.1, bài 1.3 và toàn bộ PL.1. Không dùng bài sau, đáp án hoặc chuyên môn ngoài phần giảng để bù tiền đề cho các câu tự kiểm tra.

## Rà theo thứ tự bài

### Mở đầu và Tra nhanh — dòng 10–23

**Giữ được.** “Trang này giúp bạn chọn cách đổi…” nêu đúng việc cần làm, gồm cả kiểm ý nghĩa sau chuyển. Liên hệ Format Cells không đánh đồng đổi cách hiển thị với đổi kiểu. Phần `SELECT` trên hằng số, `AS`, không có `FROM` và nơi chạy được giải thích ngay trước ví dụ; không hứa trang bài tập web nhận mọi câu. PL.1 đã giảng precision/scale, độ dài và miền giá trị nên liên kết ở đây có mục đích rõ.

**F1 — Biên tập / đã có phần giảng nhưng đường tra chưa đầy đủ.**

- Câu gốc/vị trí: các ô “`CAST`”, “`CONVERT`”, “`TRY_CAST`, `TRY_CONVERT`”, “`PARSE`, `TRY_PARSE`”, dòng 18–21.
- Vướng thực tế: bốn hàng trả lời được chọn hàm nào nhưng tên hàm chỉ là code, chưa dẫn tới phần giải thích. Hai hàng cuối có liên kết, nên cách dùng cùng bảng chưa nhất quán. Người đang cần tra một hàm phải tự tìm tiếp hoặc dùng TOC.
- Căn cứ: §2.7 yêu cầu bảng tra nhanh dẫn từ tên/tác vụ tới phần giải thích. HTML của bài chỉ có hai liên kết fragment trong thân bài: `#huong-chuyen` và `#mat-gia-tri`; bốn tên nhóm hàm chưa có liên kết.
- Đề xuất ngắn: liên kết bốn ô tên hàm tới phần cú pháp/nhóm tương ứng; không cần thêm lời giảng hoặc bảng mới.

### Chuyển ngầm và chuyển tường minh — dòng 25–39

**Giữ được.** Tôi đặt câu hỏi: tại sao một dấu `+` cho hai kết quả khác nhau? Ví dụ hai cột và lời giải sau bảng trả lời bằng kiểu của từng bên, chuyển ngầm và chuyển tường minh. Nháy đơn phân biệt chuỗi với số được giải thích, nên không buộc người mới đoán từ cách tô màu.

Đoạn về gán vào cột giải được câu hỏi tiếp theo: tại sao cột chữ vẫn nhận được số dù số ưu tiên hơn chữ? Bài tách rõ ngữ cảnh biểu thức với kiểu đích đã khai báo; không đưa câu ghi hoặc yêu cầu tự khai báo biến. Đoạn về ưu tiên cũng nói rõ chiều mũi tên và cảnh báo đây không phải bảng các phép chuyển được phép. Không thấy mâu thuẫn nội bộ với bài 1.3 hoặc PL.1.

### Cú pháp sáu hàm — dòng 43–68

**Giữ được.** Cách đọc `x`, `type`, phần tùy chọn và kiểu trả về được nêu trước bảng. Độ dài mặc định và `decimal(18,0)` nối được với PL.1. Ví dụ CAST/TRY_CAST giải được vì sao hai ô `NULL` nhìn giống nhau nhưng khác nguyên nhân; cảnh báo đổi lỗi thành số `0` gắn với mất ý nghĩa dữ liệu.

**F2 — Cần làm rõ, mức nhẹ / thiếu giải nghĩa ký hiệu và một phân biệt thuật ngữ.**

- Câu gốc/vị trí: “`x` là giá trị hoặc biểu thức đầu vào”, dòng 45; bảng lại dùng `PARSE(s AS type …)`/`TRY_PARSE(s AS type …)`, dòng 53–54. Vướng thứ hai cùng mạch đọc cú pháp nằm ở dòng 110: “`NULL` literal gây lỗi, còn tham số có giá trị `NULL` lúc chạy trả `NULL`”.
- Tác động: `s` chưa có nghĩa được khai báo; người mới có thể đoán là chuỗi từ phần PARSE, nhưng đang phải đoán một ký hiệu trong bảng tra. Với câu `NULL`, chưa có phần giảng phân biệt literal với tham số lúc chạy; chữ “tham số” trước đó được dùng cho `style`, nên có thể bị hiểu là bất kỳ đối số nào viết trong hàm.
- Căn cứ: phần nền được giao chưa dạy tham số SQL lúc chạy; PL.1 có literal số nhưng không giải thích phân biệt này. Đây là thiếu giải nghĩa, không phải khẳng định quy tắc NULL sai.
- Đề xuất ngắn: thêm “`s` là chuỗi đầu vào” vào câu đọc cú pháp; thay “NULL literal” bằng “viết trực tiếp `NULL` trong câu” và nói rõ đây khác `NULL` được truyền qua tham số khi chạy. Có thể dẫn chi tiết kỹ thuật ra nguồn, không cần dạy cách khai báo tham số trong phụ lục này.

**F3 — Cần làm rõ / giới hạn có số nhưng thiếu đơn vị.**

- Câu gốc/vị trí: “`varchar(max)` dài hơn `8.000` hoặc `nvarchar(max)` dài hơn `4.000`”, dòng 68.
- Tác động: người học vừa được PL.1 nhắc rằng byte, số ký tự và đơn vị UTF-16 có thể khác nhau, nên “dài hơn” chưa chỉ được phép đo cần kiểm trước TRY_CAST, nhất là với chuỗi Unicode hoặc UTF-8.
- Căn cứ: chính bài nêu đây là giới hạn xử lý; §2.7 giữ yêu cầu đơn vị/giới hạn rõ ràng. Trong lượt chỉ đọc này tôi không xác nhận đơn vị của từng ngưỡng bằng tài liệu Microsoft hoặc engine.
- Đề xuất ngắn: tác giả đối chiếu nguồn TRY_CAST rồi ghi đơn vị ngay sau từng số. Không diễn giải thành “mọi chuỗi đều có tối đa từng ấy ký tự”.

### CONVERT/TRY_CONVERT và PARSE/TRY_PARSE — dòng 70–112

**Giữ được.** Tôi hỏi tại sao phải có hai CONVERT lồng nhau và kết quả còn là ngày không. Đoạn dòng 72–78 trả lời: bước trong đọc nguồn theo quy ước, bước ngoài tạo chuỗi trình bày; kiểu kết quả cuối là `char(10)`. Mã style và dạng ngày được đặt cạnh nhau, có ví dụ ngày hợp lệ/ngày sai thay vì chỉ danh sách mã.

Culture có nghĩa ngay lần đầu, ví dụ chỉ rõ dấu nhóm nghìn và phần lẻ của quy ước Việt Nam. Bài trả lời được vì sao không chọn culture theo máy người mở file, vì sao TRY_PARSE vẫn có thể lỗi và khi nào nên ưu tiên CONVERT. Giới hạn nhóm đích hiển thị rõ, không giấu trong đáp án. Phân biệt `NULL` ở dòng 110 cần sửa cách giải nghĩa như F2; chưa có căn cứ trong lượt này để gọi quy tắc kỹ thuật đó sai.

Không đề nghị thêm ví dụ cho mọi style hay mọi culture. Các khẳng định về CLR, gọi từ xa và hành vi chính xác của PARSE cần được tác giả xác minh kỹ thuật riêng; report này không xác nhận đã chạy.

### Bảng hướng chuyển — dòng 116–141

**Giữ được.** Bài nói rõ nguồn theo dòng, đích theo cột, nghĩa của `N/T`, `—`, `=` và phạm vi đúng năm kiểu. Câu cảnh báo sau bảng giải được hai câu hỏi dễ nhầm: có phép chuyển thì giá trị nào cũng đổi được không, và có chuyển ngầm thì SQL tự chọn bất kỳ chiều nào cũng được không. Ví dụ số `20261031` khiến giới hạn int→date có mục đích sử dụng cụ thể.

Bảng bổ sung ghi điều kiện của kiểu đặc biệt và dẫn nguồn đầy đủ. Không coi danh mục ưu tiên ở trên là ma trận chuyển đổi; không đòi bổ sung mọi cặp hiếm hoặc truy vấn riêng cho mỗi kiểu. Quy tắc của JSON, vector, không gian và hierarchyid chưa được xác minh bên ngoài/SQL trong lượt này; không có căn cứ nội bộ đủ để kết luận chúng sai. PL.1 đã có giải thích nhóm kiểu và trạng thái nền tảng; phần mở đầu bài này có đường tới PL.1.

### Mất giá trị và Khi TRY vẫn lỗi — dòng 145–184

**Giữ được.** Ví dụ đặt cạnh nhau ba hiện tượng khác nhau: cắt mã, làm tròn phần lẻ và tràn phần nguyên. PL.1 đã dạy `p-s`, nên người học hiểu vì sao `decimal(5,2)` chỉ còn ba chữ số nguyên; bài này nhắc lại đúng tại chỗ cần. Cảnh báo TRY không phát hiện mọi mất giá trị có bằng chứng ngay trong phần giảng, không chỉ là một câu rào đón.

Ví dụ chia nguyên giải được tại sao đổi kiểu sau phép tính không lấy lại phần lẻ đã mất; không bắt đọc PL.4 mới hiểu kết luận cơ bản này. Bảng mất giá trị cũng tách mã định danh, Unicode, thời gian và GUID thay vì hứa chuyển thành công là đúng hồ sơ.

Ví dụ int→xml ghi rõ chỉ để đọc, `copy={false}`; lời giải nói vì sao TRY vẫn lỗi. Số lỗi `529` và thông báo là khẳng định của bài/tác giả, chưa được reviewer chạy lại. Không có căn cứ để gọi thông báo sai chỉ từ HTML. Đoạn cuối hướng người học giữ nguồn, kiểm biên và kiểm nghĩa nghiệp vụ, phù hợp mục tiêu bài.

### Tự kiểm tra — dòng 186–215

**F4 — Cần sửa / dữ kiện đề bị giấu cùng đáp án, không phải thiếu kiến thức giảng.**

- Câu gốc/vị trí: “Hai cột dưới trả gì…” ở dòng 196, câu SQL của đề ở dòng 198; “Câu nối mã dưới đây lỗi…” ở dòng 205, câu SQL lỗi ở dòng 207.
- Tác động: khi chưa mở đáp án, người học không thấy hai cột là gì hoặc câu nối mã đang viết thế nào. Mở để tìm đề thì đồng thời lộ lời giải. Hai câu không thể dùng đúng ý nghĩa tự kiểm tra dù phần giảng đã đủ kiến thức.
- Căn cứ: cả hai `Sql` thuộc phần con của `details`, nằm sau `summary`; HTML có đúng cấu trúc đó và cả ba `details` đều không có thuộc tính `open`. Đây là bằng chứng từ DOM tĩnh, không phải kết quả thử thao tác browser.
- Đề xuất ngắn: đưa SQL của đề ra trước `details` tương ứng, hoặc đặt toàn bộ dữ kiện ngắn trong `summary`; chỉ giữ lời giải và SQL sửa đúng ở phần mở đáp án. Không thêm lý thuyết để giải quyết vấn đề trình bày này.

Các đáp án không dùng để dạy bù. Câu 1 chọn công cụ, câu 2 dự đoán kết quả, câu 3 sửa cách dùng, đúng phạm vi đã duyệt.

## Tiền đề từng câu tự kiểm tra

Đã xác định cách làm từ phần giảng trước rồi mới đối chiếu lời giải. Không chép nguyên đáp án vào bảng này.

| Đề | Cần kiến thức gì để tự làm | Đã được dạy trước ở đâu | Còn thiếu/vướng gì |
|---|---|---|---|
| 1. Rà file ngày/tháng/năm có ngày sai | Phân biệt hướng chuỗi→ngày với xuất ngày→chuỗi; chọn cơ chế xử lý giá trị sai; đọc mã style và phân biệt nguồn NULL | Tra nhanh, dòng 18–21; cú pháp dòng 45–54; NULL dòng 60–66; ví dụ style dòng 72–91; giữ nguồn dòng 184 | Không thấy thiếu tiền đề để chọn cách làm. Đề đã có đủ dữ kiện trong summary. |
| 2. Dự đoán hai cột và việc giữ phần lẻ | Đọc SELECT/AS trên hằng số; đọc precision/scale; phân biệt làm tròn thành công với chuyển giá trị sai | Mở đầu dòng 12; PL.1 “Đọc giới hạn và dung lượng”/“Số chính xác”; ví dụ CAST/TRY_CAST dòng 60–66; mất giá trị dòng 147–153 | Đủ kiến thức. F4: chưa thấy câu SQL của đề khi details đóng, nên không tự bắt đầu dự đoán được. |
| 3. Sửa câu nối mã lỗi | Phân biệt chuỗi/số; độ ưu tiên; vai trò kép của `+`; chuyển tường minh sang chuỗi đủ dài; AS chỉ đặt tiêu đề; Unicode | Bài 1.3 và PL.1 về Unicode/chuỗi; dòng 12 về AS; dòng 27–39 về ưu tiên và nối chữ; dòng 45–56 về kiểu đích/độ dài | Đủ kiến thức, không cần lấy bài 2.7 hoặc SQL sửa trong đáp án làm tiền đề. F4: câu SQL cần sửa đang bị giấu cùng đáp án. |

## Định dạng và đối chiếu build

- Đã đọc toàn bộ bảng, 10 khối `Sql`, 6 khối `Result`, 1 `Messages` và ba `details`. Không có Excel/LineMap/RunFlow/drawer trong bài này để kiểm.
- Mười chuỗi SQL sau khi giải mã thuộc tính MDX trùng từng chuỗi với nội dung 10 `pre.sql-code` trong HTML, gồm nháy thẳng và xuống dòng. Các dòng tiếp của SQL nhiều dòng đều bắt đầu bằng tab thật; CSS build có `--sql-tab-size: 4` và khối SQL dùng token đó.
- Không có backtick hiển thị trong text của article; không thấy lộ `\\n`/`\\t` trong các khối SQL đã đối chiếu. Các chuỗi tiếng Việt trong SQL dùng tiền tố `N`. Chữ đậm chọn đúng khái niệm chính, không bôi đậm toàn đoạn; dẫn chứng và tên kiểu/cột dùng code.
- Hai fragment tra bảng/mất giá trị có đích trong HTML. F1 là thiếu đường đi cho tên hàm, không phải hai liên kết đang có bị hỏng.
- Các kết quả minh họa và lời giải có mạch khớp nhau khi đọc; đây không phải bằng chứng kết quả SQL live. Không phát hiện câu cần cắt chỉ để giảm độ dài: các nhóm đang phục vụ những quyết định khác nhau của bài tra cứu, không cần ép thành bài nền ngắn.

## Ưu tiên xử lý

1. **F4 — ưu tiên trước:** sửa vị trí dữ kiện của hai đề để người học có thể tự làm trước khi mở lời giải.
2. **F3 và F2 — làm rõ ngắn:** ghi đơn vị giới hạn sau khi tác giả xác minh; bổ sung nghĩa của `s` và phân biệt NULL viết trực tiếp với tham số lúc chạy. Không cần thêm một phần quản trị/lập trình.
3. **F1 — biên tập đường tra:** thêm liên kết ở các tên nhóm hàm.

Về tiền đề, phần giảng cùng các bài trước được giao đủ để suy luận cả ba đề; vướng rõ nhất hiện tại là hai đề không lộ dữ kiện trước đáp án. Không phát hiện sai kiến thức chắc chắn từ đối chiếu nội bộ, và không dùng kết luận này để xác nhận SQL hoặc UI đã chạy đúng.

## Nguồn và giới hạn

Nguồn đã trực tiếp đọc: `AGENTS.md`; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; `docs/superpowers/specs/2026-11-01-appendix-reference-design.md`; các bài 1.1, 1.3, 2.1; PL.1; MDX PL.2; HTML PL.2 và CSS build được HTML tham chiếu. Không đọc report cũ hoặc ma trận của tác giả.

Các liên kết Microsoft trong bài hiện diện trong nguồn/HTML; tôi **không mở hoặc xác minh nội dung hiện hành của những trang đó** theo giới hạn gói review. Đặc biệt chưa kiểm độc lập các hướng chuyển kiểu đặc biệt, đơn vị giới hạn TRY_CAST, kiểu trả về/định dạng thực tế, hành vi PARSE với NULL/culture, hoặc lỗi 529. Các kết quả này cần hồ sơ xác minh kỹ thuật của tác giả, không được suy ra từ nhãn “Query executed successfully” của component.

Không đọc `.env`, secret hoặc `database/HRM_Demo.sql`; không đổi dữ liệu, source sản phẩm, test, Git hoặc tài liệu khác. Không chạy lại test/build vì gói chỉ giao đọc build cố định. Không có bằng chứng tương tác về sao chép/dán, bàn phím, mở details, cuộn bảng, SSMS hay kích thước viewport; DOM và CSS tĩnh chỉ chứng minh cấu trúc/nội dung nêu trên.
