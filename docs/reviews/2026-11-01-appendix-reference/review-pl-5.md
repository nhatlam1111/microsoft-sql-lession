# Review độc lập PL.5 — Hàm ngày giờ

## Phạm vi, phiên bản và công cụ

- Ngày review: 01/11/2026. Vai học thử: Business Consultant muốn chuyển sang BA/PM, chỉ có Excel văn phòng cơ bản, không dùng kiến thức chuyên gia để bù lời giảng.
- Bài: `src/content/appendices/pl-5-ham-ngay-gio.mdx`; không có YAML/Exercises. Không review lại các bài khác và không sửa sản phẩm.
- Source được giao: nhánh `codex/appendix-reference-pl-1-6`, base `5c2604a` cộng thay đổi hiện tại. SHA256 tự đọc và đối chiếu hai lần: `B8C7352D275FE0AFEF903DCE7B715DE8BE0ACDD410943F5BAC55EBEE133F4BBD`, đúng hash đóng băng được giao.
- HTML: `dist/phu-luc/pl-5-ham-ngay-gio/index.html`, thời gian file `01/11/2026 02:17:49`, đúng lần build được giao. Đã đọc toàn bộ nội dung article, gồm bảng, 10 khối SQL, 10 kết quả và ba details.
- Model thực tế: **kế thừa model của phiên**, không xác định tên cụ thể và không đổi model.
- Công cụ thực tế: PowerShell đọc file, `rg`, `Get-FileHash`; Python chuẩn `html.parser` để đọc văn bản HTML và kiểm dấu nháy/tab/fragment tĩnh. Không browser, không SQL/DB/API/runner, không đọc secret hay script dữ liệu; không dùng tài liệu SQL bên ngoài khóa học. Một lượt trích HTML ban đầu gặp lỗi encoding stdout, đã đọc lại thành công bằng UTF-8; đây là lỗi công cụ trích, không phải lỗi bài.
- Đã đọc AGENTS.md; quy ước, đặc biệt §2.7/§4.5; lesson-template; hồ sơ công ty; mẫu 1.1/2.1; bài 2.8 `2-8-ham-ngay-tham-nien.mdx`; PL.1/PL.2; ba mục Quyết định đã duyệt, Mục tiêu và phạm vi, Biến thể bài tra cứu của spec được giao. Không đọc report cũ hoặc ma trận tác giả, không tạo reviewer khác.

Áp dụng đúng biến thể tra cứu: không yêu cầu tình huống đơn, hai H3, Memo, Exercises hoặc giới hạn độ dài bài nền; không yêu cầu liệt kê mọi hàm ngày giờ của SQL Server.

## Rà theo thứ tự bài

### Mở đầu và bảng tra nhanh — dòng 10–28

**Giữ được.** Mục đích chọn mốc/đơn vị rõ, phân biệt ba kiểu ngày giờ đủ để định hướng; nơi chạy là SSMS và giới hạn trang bài tập đã nói ngay đầu. Bảng tra dẫn theo việc cần làm, không bắt người mới biết tên hàm trước. Các fragment nội trang trong HTML đều có đích.

**PL5-01 — Cần làm rõ, ưu tiên P2: cách đọc câu trên giá trị cố định và lớp trình bày CONVERT chưa có ngay tại chỗ.**

- Câu gốc/vị trí: dòng 10, “Bạn cần biết `SELECT`, `AS`, `WHERE` ở các bài 2.1–2.2”; dòng 12, “Một số kết quả dùng `CONVERT` để hiện ngày theo dạng cố định”; ví dụ đầu dòng 34 bắt đầu bằng `SELECT CONVERT(char(10), DATEFROMPARTS(...), 23)` và không có `FROM`.
- Tác động: từ mẫu 2.1, người học biết SELECT chọn cột từ bảng. Khi tra thẳng PL.5, họ chưa được nối vì sao câu không cần bảng, ba phần của CONVERT đọc thế nào và vì sao hàm trả `date` nhưng cột ngoài cùng đã thành chữ. Đây là trở ngại đọc ví dụ, không phải sai cú pháp SQL.
- Căn cứ/phân loại: PL.1 và PL.2 có giảng SELECT trên giá trị cố định; PL.2 có cú pháp CONVERT và nói kết quả trình bày không còn kiểu ngày. Do đó **đã dạy ở bài liên quan nhưng chưa có tại chỗ**, không phải toàn khóa chưa dạy. §2.7/template yêu cầu tiền đề tối thiểu cho phụ lục đọc độc lập và không dùng liên kết thay lời giải cốt lõi.
- Đề xuất ngắn: sửa lời mở hiện có để nói SELECT trả giá trị tính từ các hằng số nên không cần FROM; `CONVERT(kiểu_chuỗi, giá_trị, style)` chỉ tạo chữ để hiển thị. Giữ PL.2 cho quy tắc chuyển kiểu đầy đủ, không chép lại bảng style. Có thể chuyển định nghĩa UTC ở dòng 128 lên lần nhắc đầu dòng 10 để không gặp tên trước nghĩa.

### DATEFROMPARTS — dòng 30–42

**Giữ được.** Trả lời được “tạo ngày để làm gì”: tránh ghép chuỗi có thể bị hiểu khác theo thiết lập. Ba số, kiểu `date`, ngày không tồn tại và NULL đều có lời giải tại chỗ. Ngày tháng trong ví dụ và cảnh báo `2026-02-29` hợp lý về lịch; không có thông báo lỗi tự dựng để người học tưởng là đã chạy.

### YEAR/MONTH/DAY/DATEPART/DATENAME — dòng 44–56

**Giữ được.** Bảng tra và tiêu đề cột cho biết đang lấy thành phần nào; quý `4` và tên tháng `October` nối được với ngày minh họa. Bài trả lời “vì sao máy khác có thể không ra October” bằng ngôn ngữ phiên, phù hợp hồ sơ công ty `us_english`; nói rõ từ khóa đơn vị không đặt trong nháy. Cảnh báo chỉ MONTH sẽ trộn cùng tháng khác năm có mục đích thực tế. Các lưu ý về tuần chỉ là định hướng, không cần mở thêm cả bài tiêu chuẩn lịch để làm ba câu ôn hiện tại.

### DATEADD — dòng 58–70

**Giữ được.** Cú pháp, số âm, phần lẻ, kiểu trả về khi đầu vào có kiểu/chỉ là chuỗi đều được phân biệt. Ví dụ cuối tháng trả lời được “vì sao cộng rồi trừ chưa chắc về ngày ban đầu”. Tách ngày lịch với ngày làm việc, không hứa tự loại ngày lễ. Không có căn cứ nội bộ để phản bác kết quả minh họa hoặc phát biểu bigint; trạng thái hỗ trợ theo nền tảng vẫn thuộc phần cần tác giả xác minh kỹ thuật riêng.

**PL5-02 — Biên tập, ưu tiên P3.**

- Câu gốc/vị trí: dòng 60, “nên nên dùng `date`/`datetime2` tường minh”.
- Tác động/căn cứ: lặp một từ, không thêm nghĩa, làm vấp nhịp đọc.
- Đề xuất: bỏ một chữ “nên”.

### DATEDIFF/DATEDIFF_BIG — dòng 72–82

**Giữ được.** Định nghĩa ranh giới đứng trước ví dụ và tự kiểm tra, không chỉ xuất hiện trong đáp án. Một ngày qua giao thừa cho thấy rõ vì sao số ranh giới năm không phải năm tròn. Cách tạo mốc kỷ niệm bằng DATEADD đã nói ngay ở đây, nên dẫn bài 2.9 không phải lời giảng bắt buộc bị đẩy sang bài sau. Hai kiểu trả về và mục đích BIG rõ. Số mili giây hiển thị phù hợp phép tính lịch 365 ngày; chưa xác nhận bằng engine.

### EOMONTH — dòng 84–96

**Giữ được.** Tham số dịch tháng là tùy chọn được giải thích, ví dụ một và hai đối số cùng minh họa. Bài trả lời được “vì sao ngày cuối tháng chưa phải thời điểm cuối ngày” và trỏ đúng phần lọc nửa mở, tránh hướng dẫn đoán số giây cuối.

### DATETRUNC và DATE_BUCKET — dòng 98–124

**Giữ được.** DATETRUNC đưa mốc về đầu đơn vị lịch; DATE_BUCKET nhận độ rộng và gốc để chia khoảng. Cách dùng, kiểu trả về, điều kiện đầu vào có kiểu, cùng kiểu giữa gốc/mốc và gốc mặc định đều có trước câu ôn. Ví dụ `10:17` về đầu khoảng `10:15` giúp hiểu nghĩa “đầu khoảng”; đoạn sau giải thích vì sao cắt tới phút không thay việc gom 15 phút. Cảnh báo múi giờ và thống nhất gốc giải thích được cái giá của chọn sai mốc. Scale/độ chi tiết có nguồn đọc nền ở PL.1; không đòi phụ lục này chép lại bảng kiểu ngày giờ.

### Giờ hiện tại — dòng 126–148

**Giữ được.** Bảng phân biệt cách viết có/không ngoặc và năm kiểu trả về rõ. Ví dụ SQL_VARIANT_PROPERTY đã giải nghĩa bằng việc đọc tên kiểu nền; cách kiểm kiểu tránh gắn kết quả “hiện tại” vào một ngày cố định. Bài giải thích được vì sao báo cáo chạy lại cần ngày chốt và vì sao nhiều chữ số giây không chứng minh đồng hồ chính xác tương ứng.

**PL5-03 — Cần làm rõ, ưu tiên P2: phạm vi cấu hình múi giờ bị gom quá rộng.**

- Câu gốc/vị trí: dòng 146, “Azure SQL Database mặc định dùng UTC; cấu hình dịch vụ/database/phiên có thể ảnh hưởng các mốc giờ địa phương”.
- Tác động: ngay sau bảng GETDATE/SYSDATETIME, câu này khiến người mới không biết giờ hàm trả về phụ thuộc máy chủ/dịch vụ nào, hay có thể đổi chỉ bằng cấu hình database/phiên. Từ “mặc định” cũng để ngỏ khả năng người học đổi riêng giờ của Azure SQL Database. Đây là điểm ảnh hưởng cách chọn ngày báo cáo gần nửa đêm, không chỉ là thuật ngữ trang trí.
- Căn cứ/phân loại: bài 2.8 nói nguồn khóa học trên Azure dùng UTC; dòng 128 của chính PL.5 nói các hàm đọc đồng hồ hệ thống dịch vụ. Dòng 146 đưa thêm ba phạm vi cấu hình nhưng không chỉ ra phạm vi nào áp dụng cho nền tảng/hàm nào. **Mơ hồ có căn cứ trong câu chữ; chưa xác minh tính đúng/sai kỹ thuật của từng loại cấu hình**, vì lượt này không đọc Microsoft hoặc chạy SQL.
- Đề xuất ngắn: thu câu về Azure SQL Database của khóa học dùng UTC; hệ thống khác cần xác nhận quy ước giờ của máy chủ/dịch vụ. Nếu giữ phát biểu về database/phiên, cần nêu đúng trường hợp được Microsoft hỗ trợ sau khi tác giả xác minh; không cần dạy người học đổi cấu hình.

### AT TIME ZONE — dòng 150–162

**Giữ được.** Phân biệt “gắn cách hiểu” và “chuyển cùng thời điểm” là ý then chốt và đã giảng trước ví dụ. Hai cột dùng cùng `08:00` rồi ra giờ hiển thị khác nhau, có giải thích ngay sau kết quả; người mới không phải tự suy diễn độ lệch từ bảng. Tên `SE Asia Standard Time` là giá trị ví dụ, không tự trở thành thuật ngữ cần định nghĩa thêm. Cảnh báo gắn sai vùng nguồn và giữ thông tin truy vết hợp lý; không hứa offset tự lưu tên vùng hoặc luật đổi giờ mùa hè.

### WHERE/khoảng nửa mở — dòng 164–176

**Giữ được.** Định nghĩa lấy đầu/bỏ cuối, lý do tránh đoán phần giây, VALUES và bí danh bảng/cột đều có trước câu SQL. Hai dòng tạm nằm sát biên cho thấy một dòng được giữ, một dòng bị loại; bảng một dòng phù hợp dữ kiện đã viết. Lỗi BETWEEN kết thúc ở đầu ngày được giải thích trước ôn. Lưu ý UTC yêu cầu biên và dữ liệu cùng hệ quy chiếu, không hứa so trực tiếp ngày Việt Nam với UTC sẽ đúng. Lời nói về chỉ mục đã có giới hạn “có cơ hội”, không nhận chắc mọi truy vấn nhanh hơn.

### Tự kiểm tra — dòng 178–199

**Giữ được.** Ba dạng chọn công cụ, dự đoán kết quả, sửa bộ lọc đều có. Tất cả dữ kiện nằm trong summary và đọc được khi đóng đáp án; câu có nháy ở đề ba dùng biểu thức JSX, HTML giữ nháy thẳng. Đáp án ngắn, không đưa kiến thức cốt lõi mới.

## Bảng tiền đề ba câu tự kiểm tra

Đã xác định cách giải từ phần giảng trước khi đối chiếu đáp án. Bảng này mô tả đường làm, không chép đáp án.

| Đề | Cần kiến thức gì / cách tự làm | Đã dạy ở đâu trước câu ôn | Thiếu gì |
|---|---|---|---|
| Chọn hàm cho khoảng 15 phút có gốc | Phân biệt đưa về đầu một đơn vị lịch với chia khoảng có độ rộng và gốc; đối chiếu tham số của hai hàm với yêu cầu | DATETRUNC dòng 100; DATE_BUCKET dòng 114 và 122; ví dụ dòng 116–120 | Không thiếu tiền đề cốt lõi. Không cần biết GROUP BY/Pivot để chọn công cụ |
| Dự đoán ranh giới năm giữa hai ngày qua giao thừa và đánh giá đủ năm | Xác định có đi qua đầu năm không; tách số ranh giới khỏi kỳ kỷ niệm đủ năm | DATEDIFF dòng 74–80, ví dụ cùng hai ngày; bài 2.8 cũng đã giải thích đếm ranh giới và mốc kỷ niệm | Không thiếu; không cần đọc bài 2.9 hoặc lấy đáp án bù lời giảng |
| Sửa cận bộ lọc cả tháng trên cột có giờ | Biết BETWEEN lấy cả hai đầu và ngày cận cuối chỉ tới đầu ngày; đổi sang cách lấy đầu kỳ/bỏ đầu kỳ kế tiếp | WHERE dòng 166–174; EOMONTH dòng 94; dạng chuỗi tám chữ số có ở bài 2.8/PL.2 | Không thiếu tiền đề để sửa cận. Chưa đòi tự viết cả câu có VALUES |

## Ưu tiên và kết luận học thử

1. **P2 — PL5-01:** nối ngay cách đọc SELECT không FROM và CONVERT trình bày; phần này đã có ở PL.1/PL.2 nhưng phụ lục không bắt buộc đọc tuần tự.
2. **P2 — PL5-03:** làm rõ phạm vi đồng hồ/cấu hình ở Azure SQL Database và hệ thống khác; tách vấn đề diễn đạt đã thấy với kỹ thuật còn phải xác minh.
3. **P3 — PL5-02:** bỏ từ lặp.

Cả ba câu tự kiểm tra có đủ tiền đề trong phần giảng và đủ đề khi đáp án đóng. Không tìm thấy mâu thuẫn số học/lịch nội bộ có căn cứ để kết luận SQL sai. Hai điểm P2 làm yếu khả năng đọc độc lập và xác định nguồn giờ; nên sửa gọn ngay các câu đang có. Không cần tăng thêm tình huống, khối học tập hay danh mục hàm cho đủ khuôn.

## Nguồn, kiểm HTML và giới hạn

- Nguồn dùng để review chỉ gồm các file được giao ở đầu report và HTML tương ứng. Các liên kết Microsoft trong bài là nguồn tác giả cung cấp; **chưa mở và chưa xác minh nội dung hiện hành** trong lượt review này.
- HTML tĩnh: đủ 10 khối SQL/10 bảng kết quả; chín khối SQL nhiều dòng còn ký tự tab thật; không thấy literal `\\n`/`\\t` hoặc nháy cong trong các khối SQL; không có fragment nội trang thiếu đích. Bold/code dùng có chọn lọc; chuỗi SQL không chứa literal tiếng Việt cần thêm N. Không có khuôn SQL placeholder trong khối có nút sao chép.
- Đây không phải bằng chứng tab hiển thị rộng bốn cột ở mọi viewport, thao tác copy/paste, bàn phím/details, cuộn bảng hay SSMS hoạt động đúng. Không thao tác browser và không chứng minh UI bằng HTML.
- Không chạy SQL, nên kiểu trả về, NULL/lỗi đầu vào, bigint DATEADD, CONVERT datetimeoffset, DATE_BUCKET/DATETRUNC, tên múi giờ, đồng hồ Azure và các kết quả được viết **chưa được reviewer kiểm bằng engine**. Phần nhận xét Giữ được xác nhận mạch giảng và sự nhất quán khi đọc, không thay hồ sơ SQL live của tác giả.
- Không chạy test/build/check:dist hoặc kiểm tích hợp. Chỉ đọc bản build được giao; chưa kiểm log tạo build. Kết quả review này không phải Ready xác nhận SQL/UI, không cấp quyền push/deploy.
