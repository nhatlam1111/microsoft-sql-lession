# Review độc lập PL.1 — Chi tiết các kiểu dữ liệu

## Phạm vi, phiên bản và công cụ

- Vai học thử: người chỉ biết Excel văn phòng cơ bản, chưa biết SQL, lập trình hoặc quản trị; đọc để hiểu lựa chọn kiểu và trao đổi yêu cầu dữ liệu.
- Bài: `src/content/appendices/pl-1-chi-tiet-kieu-du-lieu.mdx`; không YAML/Exercises. Không sửa sản phẩm, test, Git hoặc file ngoài report này.
- Nhánh kiểm bằng lệnh chỉ đọc: `codex/appendix-reference-pl-1-6`. Base `5c2604a` theo gói giao review, cộng thay đổi đang có.
- Đã đọc toàn bài ở SHA256 `F19D5A4A78E2DD28987BB7752042FAAA587D357FBF1B7EA414803014008DD3E7`. Khi chốt, đã đọc lại dòng 184 và 191 sau delta được giao; hash nguồn thực tế là `01CB939CB5C3F5BF9873130F64D989CD88E7B5CF7EB9F499499B2D6CFB753034`. Delta thêm giới hạn lồng của XML và các kiểu `sql_variant` không nhận; không thay các câu tự kiểm tra.
- Model: kế thừa model của phiên; không chỉ định model khác và không tạo reviewer khác.
- Đã đọc `AGENTS.md`, `docs/quy-uoc.md` (gồm §2.7, §4.5), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, các bài 1.1, 1.3, 2.1; dùng ba mục Quyết định đã duyệt / Mục tiêu và phạm vi / Biến thể bài tra cứu của spec `2026-11-01-appendix-reference-design.md` để hiểu phạm vi.
- Công cụ thực dùng: PowerShell `Get-Content`, `Get-FileHash`, `git branch --show-current`; Python thư viện chuẩn `html.parser` để đọc HTML tĩnh. Không chạy SQL, API/runner, bài tập hoặc kiểm tra tự động; không đọc seed, secret, report cũ, ma trận tác giả hay tài liệu SQL ngoài khóa học.
- HTML đã đọc: `dist/phu-luc/pl-1-chi-tiet-kieu-du-lieu/index.html`, bản build 02:13:39 theo người giao việc, khớp hash nguồn ban đầu. Đã xem ba khối `details`, sáu thuộc tính SQL `data-copy`, cùng các liên kết phụ lục được trích. HTML này chưa có hai dòng delta cuối; không coi nó là bằng chứng render của hash cuối.

## Rà theo thứ tự bài

### Mở bài, tra nhanh và đọc dung lượng — Giữ được

Vị trí: dòng 10–36. Các câu “`SELECT` trả giá trị viết sau nó”, “không có `FROM` vì không đọc bảng” và “`DATALENGTH(x)` trả số byte biểu diễn giá trị” cung cấp đủ cách đọc ví dụ số/chuỗi mà không cần tự suy từ bài sau. Bài cũng nói rõ quyền đọc SSMS và giới hạn allowlist web, nên không hứa người chỉ chọn web chạy được mọi mẫu.

Câu hỏi học thử: tại sao phải chọn kiểu thay vì chỉ định dạng ô, và con số byte có phải dung lượng file database không? Dòng 12 trả lời phần đầu; dòng 34–36 tách giá trị với phần quản lý dòng, nén và chỉ mục, trả lời phần sau. Giữ các điều kiện này; không cần thêm tình huống công ty hay khung bài chính.

### Số chính xác và số gần đúng — Giữ được

Vị trí: dòng 40–86. Bảng số nguyên có đơn vị và miền giá trị; `bit` có điều kiện nhận `NULL`; `decimal(p,s)` có định nghĩa, miền mẫu và bảng dung lượng. Câu “Literal số trong SQL dùng dấu chấm cho phần lẻ” phân biệt được cách viết số trong bảng tiếng Việt với SQL.

Câu hỏi học thử: vì sao tiền thường chọn `decimal`, vì sao chạy thành công vẫn có thể mất phần lẻ, và precision có phải số chữ số sau dấu thập phân không? Dòng 61–71 và ví dụ `CAST` trả lời rõ. Nhóm `float`/`real` có lý do chấp nhận sai số, khoảng chữ số có nghĩa và cảnh báo phép so bằng. Không phát hiện mâu thuẫn nội bộ giữa lời giảng và các giá trị Result; kết quả thực thi và giới hạn kỹ thuật vẫn chưa xác minh.

### Ngày giờ — Giữ được

Vị trí: dòng 90–117. Phân biệt ngày, giờ trong ngày, mốc có ngày/giờ và độ lệch UTC giúp chọn kiểu theo ý nghĩa. Câu “`time` … không lưu khoảng kéo dài như `27` giờ” trả lời một nhầm lẫn thực tế. Độ chi tiết `100` nano giây không bị đánh đồng với độ chính xác của đồng hồ.

Ví dụ cuối ngày nêu rõ công dụng của `CONVERT(..., 121)` tại chỗ, rồi giải thích vì sao hai kiểu đích cho ngày khác nhau. Không cần đọc PL.2 để hiểu kết luận của mẫu này. Chưa chạy mẫu hoặc kiểm định dạng hiển thị trong SSMS.

### Chuỗi

**PL1-01 — Cần làm rõ: tên cách mã hóa và đơn vị chưa có nghĩa đủ tại chỗ.**

- Câu gốc, vị trí: “Tối đa `2^30-1` đơn vị UTF-16” (dòng 132), “`nchar`/`nvarchar` dùng UTF-16 … hoặc UCS-2” (dòng 136); “ký tự bổ sung” xuất hiện ở cả hai chỗ.
- Loại vướng: thiếu giải nghĩa, không phải kết luận kiến thức sai.
- Tác động: bài 1.3 mới giải thích Unicode là cách giữ dấu tiếng Việt. Đến bảng này, người học cần so byte, cặp byte, ký tự và “đơn vị UTF-16”, nhưng chưa biết UTF-8/UTF-16/UCS-2 là các cách mã hóa ký tự, hay “ký tự bổ sung” chỉ điều gì. Câu “một ký tự có thể dùng nhiều đơn vị” nêu hậu quả đúng hướng nhưng vẫn dùng đơn vị chưa được giải thích để giải thích giới hạn.
- Căn cứ: quy ước yêu cầu thuật ngữ mới có nghĩa tại chỗ; PL.1 sở hữu đơn vị/độ dài. Tôi không dùng hiểu biết ngoài khóa học để bù quan hệ giữa các tên này.
- Đề xuất: thêm một vế định nghĩa các tên mã hóa, định nghĩa đơn vị UTF-16/cặp byte và giải nghĩa ngắn “ký tự bổ sung”; hoặc bỏ tên kỹ thuật không cần cho quyết định chọn kiểu. Giữ lời cảnh báo `n` không bảo đảm chứa `n` ký tự bất kỳ.

**Giữ được:** dòng 123–150 giải thích rõ vì sao mã `00123` nên là chuỗi, vì sao `char` có dấu cách đệm, `LEN` khác `DATALENGTH`, và vì sao giảm độ dài bằng `CAST` có thể mất chữ. Hai mẫu có đủ lời dẫn và lời giải, không dùng Result làm chỗ dạy bù. Các chuỗi tiếng Việt trong SQL đều có tiền tố `N`.

### Nhị phân, kiểu cũ và kiểu đặc biệt

**Giữ được:** dòng 158–169 giải thích nhị phân, hình thức `0x...`, mặc định độ dài, lỗi cắt byte và nghĩa deprecated. Bài không gọi deprecated là đã bị xóa khỏi SQL Server. Các cảnh báo `uniqueidentifier` không tự bảo đảm duy nhất, `rowversion` không phải ngày giờ hoặc mã ổn định, `json` không phải bản sao nguyên văn đều có mục đích cụ thể.

JSON được định nghĩa bằng đối tượng/mảng và ví dụ ngay tại chỗ; người học phân biệt được cấu trúc ngoài cùng với giá trị đơn. Các giới hạn mới/hiếm và trạng thái SQL Server/Azure được nêu rõ theo nền tảng, nhưng tôi chưa đối chiếu trực tiếp Microsoft hoặc chạy engine nên không xác nhận độ đúng/đủ của những số liệu, danh sách cấm và trạng thái này.

**PL1-02 — Cần làm rõ: cách đọc dấu ngoặc tùy chọn của kiểu vector.**

- Câu gốc, vị trí: “`vector(d[, base])`” (dòng 189); dòng 212 giải nghĩa `d`, `base` và mặc định nhưng chưa giải nghĩa ký hiệu `[, base]`.
- Loại vướng: chưa được dạy cách đọc một ký hiệu cú pháp; không phải yêu cầu thêm truy vấn cho kiểu hiếm.
- Tác động: các mẫu SQL trước dùng ngoặc vuông thật trong `AS [Tên]`. Người mới chưa có căn cứ biết ngoặc vuông trong bảng vector chỉ phần tùy chọn, có phải gõ vào khai báo hay không.
- Căn cứ: phần tra cứu phải giải thích cách đọc cú pháp/tham số tại chỗ; biết có giá trị mặc định chưa tự giải thích quy ước ký hiệu.
- Đề xuất: thêm một vế “phần `[, base]` là tùy chọn, dấu ngoặc vuông không gõ vào khai báo”, hoặc viết rõ hai dạng khai báo bên cạnh nhau.

### Tên đồng nghĩa và kiểu không dùng làm cột — Giữ được

Vị trí: dòng 222–248. Bảng nêu được mục đích nhận diện tên cũ/khác tên; không biến tên đồng nghĩa thành khả năng mới. `timestamp` được tách khỏi ý nghĩa ngày giờ. `sysname`, alias do người dùng tạo, `cursor` và `table` có phạm vi riêng; lời “không phải … một bảng trong một ô” giúp người quen Excel tránh đọc sai danh mục.

Không yêu cầu truy vấn riêng cho các kiểu hiếm. Tôi đã rà các nhóm/tên có trong bài, nhưng chưa đối chiếu danh mục Microsoft hiện hành để chứng nhận toàn bộ built-in và tên đồng nghĩa đã đầy đủ.

### Tự kiểm tra

**PL1-03 — Cần sửa: câu SQL của đề dự đoán bị giấu cùng đáp án.**

- Câu gốc, vị trí: “Câu sau giữ nguyên 12.345 hay đổi giá trị, và vì sao?” (dòng 260); khối `Sql` ở dòng 262 nằm sau `summary`, bên trong cùng `details` với lời giải dòng 264.
- Loại vướng: đề khó tiếp cận trước đáp án; không thiếu kiến thức làm bài.
- Tác động: khi chưa mở đáp án, người học chỉ biết số `12.345`, không thấy kiểu đích hoặc phép chuyển. Muốn biết “câu sau” là gì thì phải mở cả lời giải, nên câu này chưa thực hiện được việc tự dự đoán trước khi đối chiếu.
- Căn cứ: HTML tĩnh có `<details>` không có thuộc tính `open`; cả `<figure class="sql">` và đoạn “Kết quả là …” cùng ở phần sau `<summary>`. Đây là kết luận từ cấu trúc nguồn/HTML, chưa phải kiểm tương tác browser.
- Đề xuất: đưa câu SQL ra trước khối mở đáp án hoặc đưa toàn bộ thông tin phép chuyển vào `summary`; chỉ giữ kết quả và lý do trong phần mở.

**PL1-04 — Biên tập: đánh dấu code cho số liệu ở các summary.**

- Câu gốc, vị trí: `12.345` trong lời “giữ nguyên 12.345” (dòng 260), `00123` và `123` trong “Mã 00123 bị đổi thành 123” (dòng 269) hiện là chữ thường trong source và HTML.
- Tác động: mức nhỏ; cách phân biệt giá trị dữ liệu với lời văn chưa nhất quán với thân bài, đặc biệt mã cần nhìn thấy số `0` đầu.
- Căn cứ: quy ước §2.2 và template yêu cầu code cho dẫn chứng; trong `summary` dùng `<code>`.
- Đề xuất: bọc các giá trị này bằng `<code>`, đồng thời sửa vị trí đề ở PL1-03. Không cần đổi nội dung câu hỏi.

## Bảng tiền đề ba câu tự kiểm tra

Tôi tách yêu cầu của từng đề khỏi lời giải để xác định kiến thức cần dùng; bảng không chép nguyên đáp án.

| Câu | Cần biết để làm | Đã được dạy trước câu hỏi | Còn thiếu / vướng |
|---|---|---|---|
| 1 — Chọn kiểu cho mã, tên, ngày sinh, tiền | Chọn theo ý nghĩa; mã cần giữ số đầu; chuỗi Unicode; ngày không kèm giờ; precision/scale và miền phần nguyên | Bài 1.3 “Chọn kiểu theo ý nghĩa”; PL.1 dòng 30–32, 42–71, 92–105, 123–136 | Không thấy thiếu kiến thức cốt lõi. Câu hỏi không cho mức tiền lớn nhất nên chỉ có thể chọn họ kiểu và điều kiện về độ dài/precision, đúng với độ mở của đề. Thuật ngữ mã hóa trong phần tra sâu còn vướng PL1-01 nhưng không chặn lựa chọn cơ bản này. |
| 2 — Dự đoán giá trị sau chuyển kiểu | Đọc `SELECT`, `CAST`, `decimal(p,s)`; dấu chấm phần lẻ SQL; quy tắc làm tròn khi giảm scale | PL.1 dòng 10, 32, 55, 61–69; mẫu làm tròn và cắt phần lẻ đã được giải thích trước | Kiến thức đủ để giải khi có câu SQL. Đề chưa cho thấy phép chuyển trước khi mở đáp án: PL1-03. |
| 3 — Sửa cách chọn kiểu cho mã mất số đầu | Mã định danh khác số dùng tính; chuỗi giữ cách viết; đổi sang kiểu số không giữ số đầu | Bài 1.3 ví dụ `SoCCCD`; PL.1 dòng 12 và 123 | Đủ để nêu cách chọn kiểu. Phần giảng chưa có phép chuyển mã sang số riêng, nhưng hệ quả đã nêu ở mở bài và nguyên tắc giữ mã đã dạy; không cần lấy truy vấn trong đáp án làm kiến thức bắt buộc. |

Bộ ba bao phủ chọn kiểu, dự đoán và sửa lỗi theo biến thể tra cứu. Không có bài tập YAML để kiểm. Về nội dung, có đủ tiền đề giải ba câu ở mức cơ bản; cách đặt đề thứ hai cần sửa để người học thực sự làm được trước khi nhìn lời giải.

## Thứ tự ưu tiên

1. **PL1-03:** sửa vị trí câu SQL của đề thứ hai; đây là vướng mắc trực tiếp của tự kiểm tra.
2. **PL1-01:** làm rõ các đơn vị/tên mã hóa phục vụ tra độ dài chuỗi.
3. **PL1-02:** giải nghĩa ký hiệu phần tùy chọn của vector bằng một vế ngắn.
4. **PL1-04:** chỉnh code trong summary khi chạm vào phần câu hỏi.

Không có kết luận “sai kỹ thuật đã được chứng minh” trong lượt này. Không đề nghị cắt nhóm kiểu hiếm hoặc đổi về khung bài chính.

## Nguồn bằng chứng và giới hạn

- Bằng chứng học thử là source PL.1, các bài trước/mẫu và quy ước/template đã nêu. Các đường dẫn Microsoft trong bài chỉ được nhận diện là nguồn tra được cung cấp; tôi không mở tài liệu ngoài khóa học để bù lời giảng hoặc xác nhận số liệu.
- Đã đọc cả sáu khối `Sql`, bốn `Result`, mọi bảng và ba đáp án. Đối chiếu nội bộ không thấy xung đột giữa kết quả minh họa với lời giải, nhưng không thay thế SQL live.
- HTML tĩnh xác nhận ba `details` không mặc định mở; dữ liệu `data-copy` của sáu mẫu chứa xuống dòng/tab thật, không chứa hai ký tự escape `\\n`/`\\t`. Chưa kiểm CSS tab bốn cột trên màn hình, hiển thị thực tế, bấm sao chép/dán, bàn phím, cuộn bảng, TOC hay SSMS. Không dùng HTML cũ để chứng nhận hai dòng delta ở hash cuối.
- Chưa xác minh thực thi SQL, số liệu/storage/range theo engine, trạng thái GA/preview, allowlist web, độ đầy đủ danh mục Microsoft hoặc các giới hạn của JSON/vector/XML. Các dòng này cần chứng cứ kỹ thuật riêng của người viết theo §4.6; tôi không đoán chúng sai.
- Không chạy `npm test`, `check`, `build`, `check:dist` hoặc audit UI. Không có cơ sở kết luận các kiểm đó đạt hoặc có lỗi nền. Lần trích HTML bằng Python đầu tiên gặp encoding console; đã chạy lại bằng UTF-8 thành công, không phải lỗi của bài.

Kết luận học thử: lời giảng đủ để chọn các kiểu thường dùng và giải ba câu ôn cơ bản, với vướng mắc đề thứ hai và các chỗ giải nghĩa ngắn đã nêu. Đây là review source/HTML tĩnh trong phạm vi trên, không phải xác nhận SQL/UI đã chạy đúng hoặc quyền push/deploy.
