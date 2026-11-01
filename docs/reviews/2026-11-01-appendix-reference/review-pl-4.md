# Review độc lập PL.4 — Tính toán và làm tròn

## Phạm vi, phiên bản và công cụ

- Ngày review: 01/11/2026. Vai học thử: Business Consultant muốn hiểu SQL Server để trao đổi công việc; chỉ mặc định Excel văn phòng cơ bản, không mặc định biết lập trình hoặc quản trị.
- Model: **kế thừa model của phiên**; không đổi model và không tạo reviewer khác. Đây là cùng lượt review được tiếp tục sau yêu cầu của người giao việc.
- Nguồn: `src/content/appendices/pl-4-tinh-toan-va-lam-tron.mdx`, 160 dòng; không có YAML hoặc `Exercises`. Phiên bản được giao: nhánh `codex/appendix-reference-pl-1-6`, base `5c2604a` cùng thay đổi hiện tại. Không thao tác Git để xác nhận thêm.
- SHA256 tự đọc bằng `Get-FileHash`: `fc738cfbbe365347dda083e3286b38035302d2b1b93a9dd4231a20ff4b735726`, khớp bản đóng băng được giao.
- HTML: `dist/phu-luc/pl-4-tinh-toan-va-lam-tron/index.html`, 116.901 byte, thời điểm ghi file `01/11/2026 02:17:49`. Gói giao việc xác nhận build này khớp nguồn; reviewer tự đối chiếu thêm toàn bộ 9 khối SQL và đọc phần nội dung HTML.
- Công cụ thực tế: đọc file bằng PowerShell, tìm đường dẫn bằng `rg`, tính hash, dùng Python chuẩn (`html.parser`, `json`, `re`, `urllib.parse`) để so văn bản nguồn/HTML và đích fragment. Không browser, không chạy SQL, API, runner hoặc nộp bài.
- Đã đọc `AGENTS.md`, `docs/quy-uoc.md` (nhất là §2.7, §4.5), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, hai mẫu 1.1/2.1, bài `3-1-count-sum-avg.mdx`, PL.1/PL.2 và ba mục quyết định/phạm vi/biến thể tra cứu trong spec được giao. Không đọc report cũ, ma trận tác giả, seed, secret hoặc tài liệu SQL bên ngoài khóa học.

Áp dụng đúng biến thể tra cứu: không yêu cầu tình huống đơn, hai tiểu mục, Memo, Exercises hoặc độ dài bài nền. Chuẩn được giao là SQL Server 2025/Azure SQL hiện hành; không lấy kiến thức phiên bản cũ để phủ định các bảng kiểu trả về trong bài.

## Rà theo thứ tự bài

### Mở đầu và Tra nhanh — Giữ được

**Câu gốc, vị trí:** “Bài này giúp tính đúng giá trị trước khi chọn cách hiển thị nó.”, dòng 10; “trang bài tập web … không nhận mọi ví dụ”, dòng 12; bảng dòng 16–25.

Mục đích rõ và phù hợp nhu cầu đọc số liệu: phân biệt tính giá trị với trình bày giá trị. Tiền đề `SELECT`/`AS` được nêu và dẫn bài 2.1; `p`/`s` có nghĩa ngay tại chỗ, PL.1 bổ sung cách đọc kiểu và giới hạn. Ví dụ dùng số cố định, không bị hiểu là con số mới về công ty. Câu chỉ nơi chạy không hứa web nhận mọi câu.

Bảng tra đi từ việc cần làm tới công cụ và phần giải thích. Câu hỏi “cần giữ phần lẻ thì đến đâu?” và “chia cho không thì tra gì?” đều có đường đi trực tiếp. Kiểm HTML cho thấy cả 8 đích trong bảng tồn tại sau khi giải mã fragment URL. Không có căn cứ yêu cầu đổi bố cục bảng.

### Phép toán — Giữ được

**Câu gốc, vị trí:** “nhân, chia, lấy dư được tính trước cộng, trừ”, dòng 29; “`5 / 2` có hai đầu vào `int`”, dòng 35.

Ví dụ bốn cột gọn, cho thấy vai trò của ngoặc, phép chia nguyên và phần dư bằng các số có thể tự nhẩm. Người mới có lời giải cho “vì sao phép chia không ra `2.5`?” và “vì sao `%` không phải phần trăm?”. Chuyển kiểu ngầm được gọi đúng tên trong liên kết PL.2 thay vì diễn giải SQL tự chọn kiểu theo ý định nghiệp vụ.

Nhắc `NULL` trả kết quả thiếu là đủ nối sang phần `NULLIF`; không dùng đáp án cuối bài để dạy quy tắc này. Không thấy mâu thuẫn nội bộ giữa phép tính, bảng và lời giải. Chưa chạy SQL để xác nhận kiểu thực tế hoặc hành vi theo thiết lập phiên.

### decimal — Giữ được phần chia nguyên; có một chỗ cần làm rõ trong bảng công thức

**Câu gốc, vị trí:** “Chuyển kết quả sau khi đã chia nguyên … không lấy lại phần `0.5` đã mất.”, dòng 41; “Số `0` cuối có thể được công cụ hiển thị khác nhau”, dòng 47.

Đặt hai cách chuyển kiểu cạnh nhau giúp hiểu thời điểm chuyển, không chỉ chép được cú pháp. `CAST` và kiểu đích đã có giải thích trong PL.1/PL.2 được giao làm nền. Lời giải tách giá trị khỏi số chữ số đang nhìn thấy nên `2` và `2.5` trong Result không bị tự coi là bằng chứng về scale. Cảnh báo `float` gần đúng và giới hạn `38` chữ số phục vụ trực tiếp việc chọn kiểu.

**PL4-R1 — Cần làm rõ; ưu tiên thấp; thuộc cách đọc công thức, không phải kết luận công thức SQL sai.**

- **Câu gốc và vị trí:** `max(s1,s2) + max(p1-s1,p2-s2) + 1`, dòng 53; các công thức tương tự dòng 55.
- **Tác động:** lần đầu thấy bảng này, người học phải tự phân biệt `max(a,b)` trong công thức với hàm SQL `MAX(cột)` vừa học ở bài 3.1. Bảng bọc toàn bộ công thức bằng code nhưng không nói đây là ký hiệu toán để tính tham số kiểu, không phải đoạn SQL có thể chép chạy. Tại sao có thể viết `max` với hai đối số ở đây trong khi phần học tổng hợp dùng một cột chưa được giải thích.
- **Căn cứ:** PL.1 đã dạy precision/scale; bài 3.1 đã dạy `MAX` tổng hợp nhiều dòng. Tuy nhiên, các phần đó không giải thích ký hiệu `max(a,b)` trong chính bảng này. Đây là chỗ **thiếu lời chỉ cách đọc**, không phải thiếu toàn bộ khái niệm precision/scale hoặc thiếu kiến thức để làm ba câu tự kiểm tra.
- **Đề xuất ngắn:** thêm một vế ngay trước bảng: “Đây là công thức toán; `max(a,b)` chọn số lớn hơn, không phải cú pháp hàm SQL.” Nếu cần minh họa thêm, chỉ thế một cặp `p`/`s` cụ thể vào một hàng, không cần thêm bài giảng hoặc câu SQL dài.

Đoạn sau bảng, dòng 57, đã trả lời “tại sao tăng mọi đầu vào lên `decimal(38,s)` chưa chắc tốt hơn?” bằng giới hạn kiểu kết quả và khả năng mất phần lẻ/tràn. Không yêu cầu phụ lục nhập môn chép toàn bộ nhánh giảm scale của tài liệu Microsoft. Tính chính xác của các công thức và quy tắc engine vẫn cần tác giả kiểm kỹ thuật riêng.

### ROUND — Giữ được

**Câu gốc, vị trí:** “Bỏ `function` hoặc ghi `0` thì làm tròn”, dòng 63; “`ROUND` không tự đổi scale khai báo”, dòng 69; ví dụ tràn dòng 71–75.

Mục đích và ba tham số có nghĩa; ví dụ có cả dương, âm, cắt phần lẻ và vị trí âm. “Ra xa số không” có hai giá trị đối chiếu nên không chỉ là một nhãn khó hình dung. Lời giải nêu rõ làm tròn giá trị khác thay khai báo scale; không hứa `ROUND` tự tạo kiểu hai chữ số lẻ.

Trường hợp `748.58` trả lời được “vì sao làm tròn lên lại lỗi dù đầu vào nhỏ?”: phần nguyên cần thêm chữ số. Cách sửa chuyển kiểu trước, nhất quán với phần chia nguyên và phần Overflow. Đây là ví dụ lỗi cần thiết, không phải chi tiết lạc khỏi mục tiêu. Kết quả và phát biểu kiểu trả về chưa được reviewer xác nhận bằng SQL live.

### CEILING, FLOOR — Giữ được

**Câu gốc, vị trí:** “với số âm nó đi về phía âm, khác cắt phần lẻ về phía không”, dòng 81; “Giá trị không có phần lẻ chưa có nghĩa kiểu của nó là `int`”, dòng 87.

Định nghĩa toán học, việc cần đủ đơn vị đóng gói và bảng dương/âm bổ trợ nhau. Người mới có căn cứ phân biệt “làm tròn xuống” với “bỏ phần lẻ”; phần này dạy đầy đủ tiền đề cho câu tự kiểm tra thứ hai.

Bảng kiểu trả về được gắn chuẩn hiện hành, không gộp “số nguyên về giá trị” với `int`. Reviewer chưa mở tài liệu Microsoft hoặc chạy engine nên **chưa xác minh** riêng phát biểu `decimal(p,s)` trả `decimal(p,0)`; không ghi thành lỗi chỉ vì có thể khác kiến thức của phiên bản cũ.

### ABS, POWER, % — Giữ được

**Câu gốc, vị trí:** “kiểu của **cơ số `x`** ảnh hưởng kiểu kết quả”, dòng 93; “Phần dư âm như `-1` là kết quả hợp lệ”, dòng 99.

Các hàm có ý nghĩa và ví dụ liền cạnh. Hai cách viết cơ số của `POWER` cho thấy vì sao giá trị có phần lẻ còn phụ thuộc kiểu đầu vào. Phần dư được phân biệt với tỷ lệ phần trăm từ trước và có nhắc kiểm dữ liệu âm trước khi dùng vào chu kỳ. Không có lý do thêm thuật ngữ cho các số hoặc tên alias chỉ đóng vai trò giá trị minh họa.

Chưa xác minh bằng engine bảng kiểu trả về, giới hạn đầu vào `%` hoặc việc `POWER(2,-1)` thực sự trả kiểu/giá trị như mô tả. Không tìm thấy mâu thuẫn giữa lời giải và Result trong phạm vi văn bản đã đọc.

### NULLIF — Giữ được

**Câu gốc, vị trí:** “trả `NULL` khi hai giá trị bằng nhau, còn lại trả `a`, giữ kiểu của `a`”, dòng 105; “Không tự thay kết quả `NULL` bằng `0`”, dòng 111.

Cú pháp, ý nghĩa đầu vào và kiểu trả về có ngay tại chỗ; hai cột ví dụ đủ đối chiếu mẫu số không/có thể tính. Bài trả lời được “để làm gì?” và “cái giá là gì?”: tránh trường hợp chia không bằng cách giữ trạng thái thiếu, không biến nó thành tỷ lệ thật bằng không. Cảnh báo cách này không sửa chia nguyên hoặc tràn giúp tránh hiểu `NULLIF` là lớp xử lý mọi lỗi.

Liên kết PL.6 phục vụ cách đặt nhãn tiếp theo; không phải chỗ người học phải đọc để hiểu ví dụ hiện tại. Phát biểu về thiết lập database khóa học chưa được reviewer kiểm thực tế.

### Overflow — Giữ được

**Câu gốc, vị trí:** “đổi kiểu sau phép nhân là quá muộn”, dòng 117; “kiểm từng bước trung gian”, dòng 123.

Thuật ngữ được định nghĩa bằng việc không vừa kiểu. Miền `int` đã có ở PL.1, nên có thể thấy bằng phép tính thông thường vì sao tích lớn cần kiểu rộng hơn. Ví dụ sửa có đầu vào được chuyển trước; không mâu thuẫn với phần chia nguyên. Trường hợp trị tuyệt đối của số âm nhỏ nhất cho thấy kiểu cần đủ cho kết quả, không chỉ đủ cho nguồn.

Từ phần giảng đã tìm được cách xử lý đề thứ ba trước khi dùng đáp án để đối chiếu. Không dùng việc Result hiển thị số lớn làm bằng chứng đã đo kiểu thực tế của truy vấn.

### SUM, ROUND — Giữ được

**Câu gốc, vị trí:** “Thời điểm làm tròn là một phần của quy tắc nghiệp vụ”, dòng 129; “Chọn theo quy định của báo cáo hoặc chứng từ”, dòng 135.

Đây là phần hữu ích nhất khi cần đối chiếu báo cáo: cùng hai khoản nhưng thứ tự tổng hợp/làm tròn tạo số cuối khác nhau. Số dòng của `VALUES`, tên bảng/cột và việc không tạo bảng lưu được giải thích trước ví dụ; `SUM` có lời nhắc cộng nhiều dòng, nền đầy đủ hơn đã có ở bài 3.1.

Có thể tự nhẩm hai chuỗi tính từ quy tắc `ROUND` đã giảng; không cần mở bài sau để hiểu nguyên nhân lệch. Câu chốt giao quyền chọn quy tắc cho yêu cầu nghiệp vụ, không cho database tự quyết. `FORMAT` chỉ được nhắc để phân biệt hiển thị, không bị dùng làm lời giải chưa giảng.

### Tự kiểm tra và định dạng — Giữ được trong phạm vi đọc tĩnh

Ba câu có đủ biểu thức/dữ kiện trong `summary`; không phải mở đáp án mới thấy đề. Chúng lần lượt kiểm chọn thời điểm chuyển kiểu, dự đoán khác nhau giữa hai phép xử lý số âm và sửa tràn. Các đáp án không bổ sung khái niệm cốt lõi chưa có ở phần giảng.

Chữ đậm ít, có chọn lọc; tên hàm/kiểu/giá trị dẫn chứng dùng code. Không có chuỗi giá trị tiếng Việt trong 9 câu SQL nên không phát hiện trường hợp thiếu tiền tố `N`. Câu SQL trong khối đều là câu đọc hoàn chỉnh, không có khuôn chứa `...` bị cho sao chép. Biểu thức `CAST(... AS bigint)` trong đề là ký hiệu ngắn ở lời hỏi, không phải khối SQL chạy được.

Kiểm tĩnh 9 khối: giải escape trong thuộc tính nguồn cho văn bản đúng bằng nội dung `<pre>` HTML và payload `data-copy`. Có tab thật ở các dòng thụt lề; không còn escape dạng dấu gạch chéo ngược cộng chữ `t` trong văn bản SQL. Không thấy lộ backtick hoặc nháy cong trong các câu SQL. Chưa kiểm bằng mắt mốc rộng 4 cột, bố cục bảng trên viewport, thao tác sao chép/dán, bàn phím hoặc mở/đóng `details`.

## Bảng tiền đề ba câu tự kiểm tra

Đánh giá dưới đây dựa vào phần giảng đứng trước đề; đáp án chỉ được dùng để đối chiếu, không được coi là lời giảng bổ sung. Không chép nguyên đáp án.

| Đề | Cần kiến thức gì để tự làm | Đã dạy ở đâu | Còn thiếu gì |
|---|---|---|---|
| Câu 1, dòng 142: đổi kiểu trước/sau phép chia | Phân biệt chia hai số nguyên với chia có đầu vào thập phân; hiểu thời điểm `CAST` | Phép toán, dòng 35; decimal, dòng 41–47; cú pháp `CAST` có ở PL.1/PL.2 được giao | Không thiếu tiền đề cốt lõi cho đề. Không cần dùng công thức precision/scale để chọn hướng xử lý. |
| Câu 2, dòng 149: so sánh `FLOOR` và cắt phần lẻ với số âm | Hướng của `FLOOR`; đối số thứ ba của `ROUND`; “về phía không” khác “về phía âm” | ROUND, dòng 63–67; CEILING/FLOOR, dòng 81–85 | Không thiếu. Giá trị và cả hai cách dùng đã xuất hiện trong ví dụ giảng. |
| Câu 3, dòng 156: bọc cả tích để sửa tràn | Kiểu được dùng khi nhân; phép tính xảy ra trước chuyển kết quả; chuyển đầu vào để dùng kiểu rộng hơn | Overflow, dòng 117–123; miền `int`/`bigint` trong PL.1 | Không thiếu. Đề đã cho biết tích bị tràn nên không đòi tự đo lỗi hoặc biết cấu hình engine. |

## Ưu tiên và kết luận học thử

- **Một mục cần làm rõ, ưu tiên thấp:** PL4-R1, phân biệt ký hiệu toán `max(a,b)` với hàm SQL và chỉ cách đọc bảng kiểu kết quả. Đây không phải lỗi cản ba câu tự kiểm tra.
- **Không có lỗi kỹ thuật/số liệu được xác nhận trong lượt này.** Các phép nhẩm và lời giải không mâu thuẫn nội bộ; điều đó không thay cho kiểm engine hoặc nguồn Microsoft.
- Phần giảng cung cấp tiền đề cho cả ba đề; không thấy việc dùng ôn tập để dạy bù. Cách chia mục và số ví dụ phù hợp phụ lục tra cứu, không có đoạn cần cắt chỉ để đạt giới hạn bài nền. Không đề nghị thêm khối, thêm bài tập hoặc mở rộng phạm vi.

## Nguồn và giới hạn

Nguồn review là các file khóa học và HTML đã liệt kê ở đầu report. Bài có liên kết Microsoft gần từng nhóm kiến thức; reviewer chỉ đọc nhãn/URL trong bài, **không mở tài liệu bên ngoài**, đúng gói giao việc. Do vậy, bảng công thức decimal, bảng kiểu trả về từng hàm, lỗi overflow và thiết lập chia không cần được tác giả xác minh kỹ thuật riêng.

Không chạy bộ test/build mới, không xác nhận SQL live, SSMS, clipboard, tương tác UI hoặc tính truy cập. Lệnh phân tích HTML đầu tiên vấp lỗi mã hóa đầu ra Windows khi in chữ Việt; đã chạy lại với UTF-8, đồng thời giải mã fragment URL rồi mới đối chiếu. Lỗi đó không được tính thành finding của bài. Các thao tác đọc file không làm đổi sản phẩm.

Report này chỉ ghi nhận học thử nguồn và HTML tĩnh của bản được giao; không phải xác nhận nghiệm thu SQL/UI hoặc quyền push/deploy.
