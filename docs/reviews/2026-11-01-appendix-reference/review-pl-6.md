# Review độc lập PL.6 — NULL và điều kiện

## Phạm vi, phiên bản và cách kiểm

- Người học giả định: Business Consultant muốn hiểu SQL Server để trao đổi về yêu cầu và phản biện cách làm; chỉ biết Excel văn phòng cơ bản. Không mặc định biết lập trình, quản trị, VLOOKUP hoặc PivotTable.
- Model thực tế: **kế thừa model của phiên**, không chỉ định model khác; không phân agent tiếp.
- Source: `src/content/appendices/pl-6-null-va-dieu-kien.mdx`, nhánh `codex/appendix-reference-pl-1-6`, HEAD `5c2604a2495ddf6fbb9a2835f5057a551834f55e` cộng thay đổi đang giao. SHA256 đầu và cuối lượt đọc đều là `1D903F30C37B201F43B6C828835A1F6F5CEE524A65853395166258322EC02C4C`, khớp bản đóng băng được giao.
- Build được đọc: `dist/phu-luc/pl-6-null-va-dieu-kien/index.html`, mốc sửa file `01/11/2026 02:17:49`, dung lượng `115156` byte. Nội dung, bảy khối SQL/Result và ba tự kiểm tra tương ứng source này qua đối chiếu tĩnh.
- Công cụ: PowerShell (`Get-Content`, `rg`, `Get-FileHash`, thông tin file, Git chỉ đọc) và Python `html.parser` để đọc HTML. Không browser, SQL, database, API/runner hoặc nộp bài; không đọc secret, seed, report cũ hay ma trận tác giả. Chỉ ghi report này.
- Đã đọc `AGENTS.md`, `docs/quy-uoc.md` (đặc biệt §2.7/§4.5), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1/2.1, bài 2.5/2.9 và PL.1/PL.2. Áp dụng quyết định/phạm vi/biến thể tra cứu ở `docs/superpowers/specs/2026-11-01-appendix-reference-design.md`: phụ lục độc lập, chuẩn SQL Server 2025/Azure hiện hành; không ép tình huống đơn, hai H3, Memo, Exercises hoặc độ dài bài nền. Không có YAML để review.

## Rà theo thứ tự bài

### Mở đầu và Tra nhanh — Giữ được

Vị trí: dòng 10–24. Câu mở “Bài này giúp đọc điều kiện có giá trị thiếu…” nói được mục đích. `biểu thức` có định nghĩa ngắn và ví dụ; nơi chạy là SSMS, giới hạn của trang bài tập được nói rõ. Những câu có nút sao chép đều là câu `SELECT` hoàn chỉnh, chỉ đọc dữ liệu; không có khuôn SQL chứa chỗ trống bị đặt nhầm thành câu chạy được.

Đoạn phân biệt `NULL`, `0`, `N''`, `N'NULL'` trả lời được “vì sao không coi mọi ô nhìn trống là cùng một thứ?” và tránh gán sẵn một ý nghĩa nghiệp vụ cho `NULL`. Bảy dòng tra nhanh tách việc lọc, thay giá trị và chọn nhánh. Các fragment nội bộ trong HTML đều có đích, không thấy liên kết tra nhanh bị hụt.

### NULL, UNKNOWN — Giữ được

Vị trí: dòng 28–52. “`WHERE` chỉ giữ dòng có kết quả `TRUE`” giải thích được vì sao câu `= NULL` không trả dòng; câu đúng được đặt ngay sau đó. `VALUES`, bí danh bảng/cột và `CAST(NULL AS int)` được giải nghĩa trước ví dụ đầu, nên không cần người học tự suy đây là bảng thật của công ty.

Bảng logic có năm dòng, phân biệt được “sai” và “chưa biết”. Câu ghi rõ bảng ấy không phải cú pháp `SELECT TRUE` là cần thiết cho người mới. Cách thêm `OR X IS NULL` trả lời được “muốn lấy cả phần thiếu thì làm thế nào?”. Các bảng kết quả không mâu thuẫn với phần giải thích khi đọc tĩnh; chưa chạy lại chúng.

### ISNULL, COALESCE

**Giữ được — dòng 58–73:** mục đích, thứ tự tham số, kiểu kết quả và rủi ro cắt chuỗi đứng cạnh ví dụ. Nhãn `Chư` phù hợp với lời giải “ba ký tự” trong ví dụ cụ thể; không có căn cứ để coi đây là lỗi đánh máy. Việc `COALESCE` giữ chuỗi rỗng và không sửa nguồn được giảng trước tự kiểm tra. Ví dụ trộn chữ/số nêu cả nguyên nhân và hướng sửa, có đường dẫn PL.2 để tra quy tắc chung.

**PL6-01 — Cần làm rõ: tiền đề SELECT trên hằng số chưa có tại chỗ.**

- Câu gốc/vị trí: mở bài chỉ yêu cầu “`SELECT`, `AS`, `WHERE` ở các bài 2.1–2.2” (dòng 10), rồi ví dụ dòng 65 bắt đầu `SELECT ISNULL(...)` và không có `FROM`.
- Tác động: người vào thẳng PL.6 theo đúng tiền đề được công bố có thể thắc mắc câu lấy dữ liệu từ bảng nào và vì sao chỉ có một dòng. Bài 2.1 đã đọc giải thích `SELECT` qua cột và `FROM` qua bảng; chính PL.6 chưa nối sang cách dùng mới này.
- Căn cứ/phân loại: **đã giảng ở PL.1/PL.2 nhưng chưa đưa vào đường vào của PL.6**. Đây không phải kiến thức vắng khỏi khóa; tuy nhiên các phụ lục được duyệt là không cần đọc theo thứ tự, và template yêu cầu giải thích `SELECT` trên hằng số trước ví dụ cần nó.
- Đề xuất ngắn: thêm trước ví dụ đầu không có `FROM` một câu: “`SELECT` cũng trả được giá trị tính từ các hằng số; câu này không cần `FROM` vì không đọc bảng.” Không cần thêm khối SQL mới.

**PL6-02 — Cần cắt: câu metadata không giúp người học thực hiện tác vụ đang tra.**

- Câu gốc/vị trí: “Khác biệt metadata về khả năng chứa `NULL` cũng quan trọng khi thiết kế cột tính toán hoặc ràng buộc…” (dòng 75, câu thứ hai).
- Tác động: `metadata` và `cột tính toán` xuất hiện khi chưa được giải nghĩa. Người chỉ cần chọn cách hiện nhãn bị kéo sang thiết kế database nhưng không biết khác biệt cụ thể là gì hoặc phải làm gì với nó. Vế cuối lại xác nhận tác vụ `SELECT` hiện tại chưa cần kiến thức ấy.
- Căn cứ/phân loại: **thiếu giảng cho một chi tiết ngoài tiền đề tối thiểu**, gây tải đọc; không phải kết luận nội dung kỹ thuật sai. Các tài liệu được phép dùng trong lượt này không cung cấp phần giải thích đủ để người mới hiểu chính câu đó.
- Đề xuất ngắn: bỏ câu thứ hai; giữ cảnh báo đầu vào có thể được tính nhiều lần ở câu trước, vì đây là giới hạn đánh giá thuộc phạm vi bài. Không cần mở thêm phần dạy thiết kế cột/ràng buộc trong PL.6.

### NULLIF — Giữ được

Vị trí: dòng 81–87. Câu định nghĩa nêu rõ hai đối số và kiểu trả về. Ba cột ví dụ cho thấy chuẩn hóa chuỗi, xử lý mẫu số và giữ số bình thường. `TRIM` được giải nghĩa ngay sau ví dụ, kèm giới hạn dấu cách; không bắt người học mở PL.3 mới biết ví dụ đang làm gì.

“Không tự đổi `0` thành thiếu ở mọi cột” trả lời được cái giá nghiệp vụ của cách tránh lỗi chia cho không. Tỷ lệ trả `NULL` được gọi là chưa xác định, không trình bày thành một tỷ lệ bằng không. Cảnh báo đánh giá đầu vào là giới hạn, không được dùng để hứa câu luôn chỉ tính một lần. Các kết quả/giới hạn này chưa được reviewer kiểm bằng engine.

### CASE

**Giữ được — dòng 93–103:** gọi đúng `CASE` là biểu thức; phân biệt hai dạng, vai trò `ELSE` và việc trả `NULL` khi bỏ `ELSE`. Ví dụ có một dòng ở mỗi nhánh, có điểm thiếu và có `ORDER BY`. Cách đổi hai ngưỡng là minh họa trực tiếp cho điều kiện chồng nhau, không chỉ nhắc quy tắc suông. Chú ý kiểu của mọi nhánh trả lời được “vì sao điều kiện chắc đúng vẫn có thể lỗi chuyển kiểu?”. Không thấy mâu thuẫn với bài 2.9 hay quy tắc chuyển kiểu đã đọc ở PL.2.

**PL6-03 — Cần làm rõ: giới hạn đánh giá dùng hàm tổng hợp chưa được giải nghĩa.**

- Câu gốc/vị trí: “Đặc biệt, hàm tổng hợp trong `WHEN` có thể được tính trước… ví dụ `MAX(1 / X)`…” (dòng 105).
- Tác động: đây là lời giải cốt lõi cho việc thứ tự `WHEN` không bảo đảm tránh mọi lỗi, nhưng người mới chưa biết `MAX` làm gì với các dòng. Họ có thể nhớ cảnh báo mà chưa hiểu vì sao một phép chia ở nhánh sau vẫn gây lỗi, hoặc nhầm `MAX` đang xét một số đơn lẻ.
- Căn cứ/phân loại: **thiếu giải nghĩa thuật ngữ trong phạm vi đang dạy**. Mở bài chỉ đòi nền 2.1–2.2; các bài liên quan được giao không giảng hàm tổng hợp. Bài 2.9 còn chỉ sang 3.1–3.2 cho việc tổng hợp. Thẻ liên quan tới 3.1 ở cuối HTML không thay lời giải tại đây; không lấy kiến thức bài ấy bù vào lượt học thử.
- Đề xuất ngắn: chèn một vế ngay cạnh ví dụ, chẳng hạn “`MAX` lấy giá trị lớn nhất của các phép tính trên nhiều dòng”; nói rõ có dòng `X = 0` thì chính `1 / X` có thể lỗi khi được tính trước. Giữ cách đặt `NULLIF` vào mẫu số, không cần thêm bài tổng hợp đầy đủ.
- Giới hạn kết luận: đang nhận xét tiền đề để hiểu cảnh báo; chưa kiểm tính toán trước trên engine và không kết luận cảnh báo SQL sai.

### IIF — Giữ được

Vị trí: dòng 111–119. Thứ tự ba tham số, nhánh cho `UNKNOWN` và kiểu trả về đều có lời giải. Hai cột ví dụ đủ để thấy tại sao dùng cùng nhãn cho sai/chưa biết có thể làm mất phân biệt nghiệp vụ. Bài đưa sẵn hướng chọn `CASE` khi phải tách điểm thiếu và điểm thấp. Việc nhắc giới hạn của `CASE` không biến `IIF` thành bảo đảm tránh tính sớm.

### CHOOSE — Giữ được

Vị trí: dòng 125–133. Điểm bắt đầu `1`, chuyển chỉ số sang `int`, chỉ số ngoài phạm vi/`NULL` và kiểu chung của danh sách đều hiện rõ. Hai cột ví dụ phân biệt chọn hợp lệ với ngoài phạm vi. Đoạn mã `10`, `20`, `30` trả lời được “vì sao không dùng CHOOSE như một bảng tra mã bất kỳ?”. Các mã/vị trí/nhãn ví dụ không phải thuật ngữ cần mở thêm định nghĩa. Không cần một ví dụ nhân sự khác để hiểu lựa chọn này.

## Tiền đề ba câu tự kiểm tra

Tôi xác định đường giải từ phần giảng trước, rồi đối chiếu nội dung đáp án. Bảng dưới ghi kiến thức và cách suy luận, không chép đáp án.

| Đề | Cần kiến thức gì/cách làm | Đã được dạy ở đâu trước đề | Còn thiếu gì |
|---|---|---|---|
| Chọn hồ sơ thiếu email rồi hiện nhãn | Tách điều kiện chọn dòng khỏi biểu thức tạo giá trị hiển thị; xác định phần nào có thể đổi nguồn | NULL/UNKNOWN: dòng 28–40; ISNULL/COALESCE: dòng 58; bài 2.5 cũng tách rõ hai việc | Không thiếu tiền đề. Đề hỏi phân biệt công cụ, không đòi tự đoán tên bảng/cột hay viết truy vấn hoàn chỉnh. |
| Dự đoán hai biểu thức ngắn | Xét chuỗi rỗng có phải `NULL` không; áp dụng quy tắc so sánh với `NULL`, rồi chọn tham số tương ứng của `IIF` | Dòng 12, 28, 58, 65–71 và 111–119 | Không thiếu. Không phải mở đáp án mới biết cách `IIF` xử lý `UNKNOWN`. |
| Sửa thứ tự hai ngưỡng trong ví dụ điểm | Kiểm xem điểm thỏa những điều kiện nào; dùng quy tắc nhánh đúng đầu tiên để xét thứ tự ưu tiên, giữ cách xử lý thiếu điểm | Ví dụ CASE dòng 93–101; bài 2.9 có cùng nguyên tắc chồng nhánh | Không thiếu. Dữ kiện ngưỡng, điểm và nhãn sai nằm ngay trong đề; ví dụ đầy đủ vẫn hiện phía trên. |

Cả ba đề đọc đủ khi `details` đóng. HTML có đúng ba `details`, không có thuộc tính `open`; chuỗi SQL trong `summary` giữ nháy thẳng, dấu `>=` đọc đúng. Đáp án không dạy bù khái niệm mới cần thiết. Hai vướng về SELECT trên hằng số và giới hạn đánh giá ở trên không chặn đường giải ba câu này.

## Ưu tiên xử lý

1. **PL6-03:** bổ sung vế giải nghĩa `MAX`/hàm tổng hợp để cảnh báo giới hạn của CASE thực sự hiểu được từ nền khai báo.
2. **PL6-01:** nối ngắn sang SELECT trên hằng số, bảo đảm người vào trực tiếp phụ lục không phải tự tìm lời giải ở PL.1/PL.2.
3. **PL6-02:** cắt câu metadata để giảm tải, giữ phần giới hạn đánh giá thuộc mục tiêu bài.

Phần giảng hiện có đủ kiến thức làm ba tự kiểm tra. Không phát hiện lỗi kiến thức/số liệu có căn cứ chắc chắn trong phạm vi đọc; còn ba chỉnh sửa về tiền đề và độ tải nêu trên. Nhận xét này không xác nhận toàn bộ SQL hoặc UI đã chạy đúng.

## Nguồn và giới hạn xác minh

- Căn cứ nội dung là các nguồn khóa học đã liệt kê đầu report và chính source/build PL.6. Có liên kết Microsoft cạnh các nhóm kiến thức; không mở tài liệu SQL ngoài khóa học theo gói giao việc, nên không tuyên bố đã đối chiếu tính hiện hành của từng trang Microsoft.
- Đã đọc hết bảng, bảy `Sql`, bảy `Result` và ba `details`. Đối chiếu tĩnh không thấy thiếu đoạn, lộ backtick hay ký tự escape trong SQL. Bảy khối SQL giữ xuống dòng; biểu thức tiếp dòng có một tab, `WHEN`/`ELSE` của CASE có hai tab như source. Không có nháy cong trong SQL, không có hai ký tự `\\t` thay tab thật trong text đã build.
- HTML chứng minh cấu trúc và ký tự, **không chứng minh độ rộng tab hiển thị bốn cột, layout, cuộn bảng, focus/bàn phím, thao tác mở đáp án, copy/paste, clipboard hoặc SSMS thật**. Không tương tác browser nên các phần ấy chưa kiểm. Liên kết chéo ngoài trang chưa được thử điều hướng.
- Chưa chạy SQL để xác minh bảy kết quả, lỗi chuyển kiểu, kiểu/độ dài kết quả thực tế, giới hạn đánh giá, hoặc hành vi trên SQL Server 2025/Azure hiện hành. Dòng “Query executed successfully” trong HTML là nội dung component được build, không phải bằng chứng reviewer đã thực thi.
- Không chạy test/build/check của tác giả trong lượt review chỉ đọc này; không dùng thông tin bàn giao build làm chứng cứ SQL/UI riêng. Không có kết luận Ready hay quyền push/deploy từ report này.
