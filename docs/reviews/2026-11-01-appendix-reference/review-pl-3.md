# Review độc lập PL.3 — Hàm xử lý chuỗi

## 1. Phạm vi, phiên bản và công cụ

- Vai học thử: người biết Excel văn phòng cơ bản, chưa mặc định biết SQL, lập trình hay quản trị; muốn hiểu đủ để đặt câu hỏi và đối chiếu yêu cầu với người triển khai.
- Model thực tế: **kế thừa model của phiên**; không đổi model, không giao tiếp cho reviewer khác. Đây là report của cùng lượt review được tiếp tục, không phải một lượt thay thế.
- Phạm vi: `src/content/appendices/pl-3-ham-xu-ly-chuoi.mdx`; không YAML, không `Exercises`. Dùng biến thể tra cứu đã duyệt: không ép tình huống đơn, hai tiểu mục, Memo hoặc khung bài nền; không yêu cầu liệt kê mọi hàm chuỗi.
- Source theo gói giao: nhánh `codex/appendix-reference-pl-1-6`, base `5c2604a` cùng thay đổi hiện tại. Không dùng Git để kiểm lại nhánh/commit.
- SHA256 tự kiểm trên file: `f5d1482edbdbcec611a0b61caeeed85a074901885fe66e1d0165c567de86121f`, khớp bản frozen được giao.
- HTML: `dist/phu-luc/pl-3-ham-xu-ly-chuoi/index.html`, thời gian sửa file `01/11/2026 02:17:49`, khớp lần build trong gói giao. Đã đọc toàn văn phần article, bảng tra, 11 khối SQL, 11 bảng kết quả và cả ba đáp án details.
- Công cụ thực tế: PowerShell đọc file/đánh số dòng/kiểm hash; `rg --files` tìm đúng tên bài 2.7; Python chuẩn với `HTMLParser` đọc HTML tĩnh, đối chiếu SQL và fragment. Không browser, không SQL, không API/runner, không nộp bài, không sửa sản phẩm/test/Git.
- Đã đọc `AGENTS.md`, `docs/quy-uoc.md` (đặc biệt §2.7, §4.5), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`; mẫu 1.1/2.1; bài 2.7, PL.1, PL.2; ba mục **Quyết định đã duyệt / Mục tiêu và phạm vi / Biến thể bài tra cứu** trong spec được giao. Không đọc report cũ, ma trận tác giả, seed, secret hoặc tài liệu SQL ngoài khóa học.

## 2. Rà theo thứ tự bài

### Mở bài và bảng tra — dòng 10–29

**Giữ được.** “Chọn hàm theo việc cần làm” nói đúng mục đích tra cứu. Người học biết tra theo tác vụ thay vì phải nhớ trước tên hàm. Câu chỉ đọc trong SSMS và giới hạn của trang bài tập web được tách rõ; không hứa các ví dụ đều được runner nhận. `N` được nối với Unicode và có đường dẫn kiểu chuỗi. Với bài 2.1, PL.1 và PL.2 đã được giao, cách đọc `SELECT` trên hằng số và bí danh có điểm tựa; không cần dùng kiến thức ngoài khóa học để hiểu các ví dụ mở đầu.

Bảng tra phủ đúng các nhóm đã duyệt, không biến thành danh mục mọi hàm SQL Server. Giải thích ngoặc vuông tùy chọn ở dòng 29 hữu ích và có giới hạn “quanh tham số trong tài liệu Microsoft”, không phủ nhận cách dùng ngoặc vuông quanh bí danh đã học. Lưu ý tổng quát về `NULL` còn cần bổ sung nhánh tìm mẫu ở F3 bên dưới.

### LEN, DATALENGTH — dòng 31–41

**Giữ được.** “Bỏ dấu cách ở cuối” và “đếm byte của giá trị” trả lời được hai câu hỏi khác nhau: cần đo chiều dài nhãn hay dung lượng biểu diễn. Ví dụ cho thấy cả dấu cách đầu/cuối, rồi so với sau `TRIM`; có thể lần theo con số từ chính chuỗi được viết. Đoạn giải thích không đánh đồng byte giá trị với dung lượng vật lý của dòng, không khuyên chia hai cho mọi chuỗi, và đã nêu điều kiện Unicode bổ sung/collation. Các đơn vị byte, kiểu `max`, UTF-16 có điểm tựa ở PL.1 được giao. Không yêu cầu bài này giảng lại toàn bộ mã hóa.

Các giá trị `3`, `8`, `2` khớp với lời giải thích và quy tắc PL.1 trên giấy; đây chưa phải bằng chứng chạy SQL.

### TRIM, LTRIM, RTRIM — dòng 43–57

**Giữ được.** Ví dụ dùng hai dấu ngoặc để nhìn thấy khoảng trắng còn lại; lời giảng phân biệt hai đầu với giữa chuỗi và phân biệt dấu cách thường với tab/xuống dòng. Đối số `characters` được giải thích là tập ký tự, tránh hiểu nó như một cụm cần khớp nguyên vẹn. Điều kiện compatibility level gắn với từng cú pháp mới, có giải thích đây là thiết lập database và hướng xử lý qua IT; không bắt người học tự quản trị.

**F1 — Cần làm rõ; mức thấp; mơ hồ thuật ngữ, không phải kết luận SQL sai.**

- Câu gốc/vị trí: “dấu cách thường `char(32)`” — dòng 45.
- Tác động: PL.1 vừa dạy `char(n)` là kiểu chuỗi cố định `n` byte. Người mới có thể đọc `char(32)` ở đây thành kiểu dài 32 byte, chưa biết tác giả đang chỉ mã của một ký tự dấu cách.
- Căn cứ: cùng hình thức `char(n)` đang mang hai cách đọc trong bộ bài được giao; tại đây không giới thiệu hàm tạo ký tự theo mã.
- Đề xuất: thay bằng “dấu cách thường (mã ký tự `32`)”. Không cần mở thêm một phần dạy hàm `CHAR`.

### LEFT, RIGHT, SUBSTRING — dòng 59–71

**Giữ được.** Cú pháp gắn số lượng và vị trí với ví dụ `NV047`; kết quả giữ số `0` đầu nên trả lời được vì sao mã nên là chữ. Bài nói tối đa số ký tự, vị trí bắt đầu từ `1`, hành vi bắt đầu quá cuối, độ dài âm và cảnh báo vị trí không hợp lệ. Cú pháp bỏ `length` được đặt trong phạm vi SQL Server 2025/Azure hiện hành; không cần thêm yêu cầu tương thích ngược ngoài quyết định đã duyệt. Kiểu trả về và lựa chọn Unicode đã hiện rõ.

### CHARINDEX, PATINDEX — dòng 73–91

**Giữ được.** Ba kết quả mẫu cho thấy vị trí đầu từ `1`, không tìm thấy là `0`, và tìm một chữ số bằng mẫu. Lỗi lấy độ dài từ vị trí không tìm thấy được gắn với hậu quả `-1`, nên người học hiểu vì sao phải kiểm trước khi cắt. `COALESCE` có giải thích mục đích coi dữ liệu thiếu như chuỗi rỗng, đồng thời không đánh đồng kết quả tìm với chất lượng nguồn. Định nghĩa collation, ví dụ `COLLATE` và lời xác nhận không đổi chữ nguồn làm rõ vì sao tìm hoa/thường khác nhau; bài 2.7 đã làm nền cho điều này.

**F2 — Cần làm rõ; mức thấp; mơ hồ cách đọc.**

- Câu gốc/vị trí: “`CHARINDEX(...)` tìm chữ nguyên vẹn” — dòng 75.
- Tác động: “chữ nguyên vẹn” có thể bị hiểu là chỉ khớp cả từ, trong khi đoạn này đang đối chiếu cách tìm một cụm ký tự với cách tìm bằng mẫu. Ví dụ chỉ tìm `@` không giúp người mới tự loại cách hiểu cả từ.
- Căn cứ: tên tham số là `chuoiCanTim`, phần còn lại nói vị trí trong chuỗi; chưa có quy tắc ranh giới từ nào được dạy.
- Đề xuất: sửa ngay vế đó thành “tìm cụm ký tự được viết trực tiếp, không dùng ký tự đại diện”. Không cần thêm ví dụ dài.

**F3 — Cần làm rõ; mức trung bình; thiếu lời giảng về một nhánh đầu vào, hành vi kỹ thuật chưa xác minh.**

- Câu gốc/vị trí: “Hàm thường trả `NULL` khi chuỗi đầu vào là `NULL`; các ngoại lệ về nối, tách và gộp…” — dòng 29; “`CHARINDEX` trả `NULL` nếu một đối số chuỗi là `NULL`” — dòng 81.
- Tác động: người tra `PATINDEX` trên cột có giá trị thiếu không biết quy tắc `NULL` của mẫu và chuỗi cần tìm có giống `CHARINDEX` không. Câu “thường” không đủ để quyết định cần bảo vệ đầu vào nào; đây là tình huống dữ liệu thiếu thường gặp trong chính khóa học, không phải yêu cầu liệt kê hàm ngoài phạm vi.
- Căn cứ: phần tìm kiếm gọi đích danh `CHARINDEX` khi nêu `NULL`, còn `PATINDEX` chưa có quy tắc tương ứng. Bộ nguồn được phép đọc không đủ để tôi xác nhận nhánh `PATINDEX` nào trả `NULL` hay báo lỗi. Tôi không khẳng định kết quả engine từ trí nhớ.
- Đề xuất: tác giả xác minh riêng `PATINDEX` với mẫu `NULL` và với biểu thức chuỗi `NULL`, rồi thêm một vế nêu rõ hai nhánh cần thiết tại dòng 81; cập nhật câu tổng quát dòng 29 nếu còn che mất ngoại lệ. Nếu cần dùng `COALESCE`, giữ điều kiện nghiệp vụ đang có. Đây là yêu cầu hoàn thiện lời giảng và kiểm kỹ thuật, không phải xác nhận đã phát hiện kết quả SQL sai.

### REPLACE, STUFF — dòng 93–105

**Giữ được.** “Biết chữ cần thay” và “biết vị trí” trả lời ngay nên chọn công cụ nào. Ví dụ phân biệt thay mọi chỗ với sửa đúng phần mã. `length = 0`, collation, quy tắc `NULL`, giới hạn `8.000` byte và việc ép chính chuỗi đầu sang `max` đều là giới hạn gắn với cách tránh lỗi. Không yêu cầu giải thích thêm những trường hợp không phục vụ mục tiêu tra cứu này. Chưa xác minh bằng engine các nhánh lỗi/giới hạn đã nêu.

### UPPER, LOWER — dòng 107–117

**Giữ được.** Ví dụ có dấu, mục đích tạo nhãn và giới hạn “không làm bằng chứng hai chuỗi gốc giống nhau hay đã bỏ dấu” cùng xuất hiện tại chỗ. Bài trả lời được vì sao đổi hoa/thường không thay cho đối chiếu dữ liệu hoặc đổi luật so sánh; không cần một tình huống phụ.

### CONCAT, CONCAT_WS — dòng 119–131

**Giữ được.** Cả ba cột của ví dụ đều có công việc riêng: chuyển số khi nối, bỏ thành phần `NULL`, giữ chuỗi rỗng và dấu ngăn. Người mới có thể nhìn chênh lệch hai cột sau để hiểu vì sao nhãn có dấu ngăn thừa. Lời giảng không hứa tự đệm mã, có nhắc kiểu/độ dài và khuyến cáo đưa đầu vào về `max` trước khi nối nhãn dài. Hành vi toàn bộ giá trị thiếu không bị dùng để chứng minh dữ liệu đã đầy đủ. Những điều cần làm câu tự kiểm tra 2 đều đã có trước câu hỏi.

### STRING_SPLIT — dòng 133–145

**Giữ được.** Đây là chỗ đổi từ hàm cho một giá trị sang hàm trả bảng, và bài nói ngay “bảng nhiều dòng, dùng sau `FROM`”. Tham số hằng `1`, cột `ordinal`, cột `value`, kiểu và độ dài kết quả có lời giải thích trước ví dụ. Hai dấu phẩy cho thấy phần tử rỗng; bài phân biệt nó với bảng không có dòng khi nguồn `NULL`. Đặc biệt, thông tin vị trí được tách rõ khỏi thứ tự trả dòng, đủ để xử lý câu tự kiểm tra 3. Điều kiện nền tảng được ghi, chưa được tôi xác nhận trên database thật.

### STRING_AGG — dòng 147–161

**Giữ được.** Có mục đích ngược với tách chuỗi; thứ tự bên trong chuỗi được nêu bằng `WITHIN GROUP`. `VALUES`, bảng dẫn xuất, bí danh bảng và tên cột được giải thích trước ví dụ đầu, không mặc định người học đã biết dựng bảng tạm. Các cặp giá trị có thể đối chiếu với `ThuTu`, `Ma`; kết quả phản ánh thứ tự được yêu cầu và bỏ giá trị thiếu. Cảnh báo ép `CAST` bên ngoài quá muộn trả lời được vì sao phải đổi kiểu trước lúc gộp. Bảng ánh xạ kiểu trả về, giới hạn dấu ngăn và mức tương thích có mặt tại chỗ.

**F4 — Biên tập; mức thấp; chỉ dẫn thừa không khớp phần còn lại.**

- Câu gốc/vị trí: “Các ví dụ sau dùng cùng cách viết này.” — dòng 151.
- Tác động: làm người mới chờ thêm ví dụ `VALUES` hoặc bảng dẫn xuất để đối chiếu, nhưng ví dụ sau chỉ còn `FORMAT`, không dùng cách viết ấy.
- Căn cứ: toàn bộ phần từ dòng 163 đến hết bài không có `VALUES` hoặc bí danh bảng `v`.
- Đề xuất: bỏ câu này; giữ nguyên hai câu giải thích ví dụ đang có.

### FORMAT — dòng 163–175

**Giữ được.** Dùng cho nhãn hiển thị, mẫu `N2`, culture, dấu nhóm nghìn và hai số lẻ được nối với kết quả cụ thể. Bài phân biệt rõ chữ đã định dạng với giá trị số để tính/lọc/sắp xếp. Culture bỏ trống phụ thuộc phiên và khuyến nghị cho báo cáo nhiều dòng đều có ý nghĩa công việc. Ví dụ đủ để hiểu kết quả mà không phải biết lập trình .NET.

**F5 — Cần cắt/Biên tập; mức thấp; thuật ngữ ngoài tiền đề không tạo được hành động rõ.**

- Câu gốc/vị trí: “Hàm dựa vào .NET CLR và không thể chuyển sang thực thi trên máy chủ từ xa theo mọi cách” — dòng 173.
- Tác động: người chỉ biết SSMS không biết `.NET CLR` là gì, “chuyển sang thực thi” là thao tác nào, hay “theo mọi cách” cấm trường hợp nào. PL.2 có nhắc tên bộ xử lý và máy chủ từ xa, nhưng không tạo nền đủ để giải nghĩa mệnh đề mơ hồ này. Nó không giúp hiểu ví dụ hiện tại hoặc quyết định có nên định dạng ở phần mềm.
- Căn cứ: bài không dùng truy vấn qua máy chủ khác; khuyến nghị có thể thực hiện ngay đã nằm ở nửa sau câu. Không có lý do bắt người mới học quản trị/phân tán chỉ để đọc hàm định dạng.
- Đề xuất: giữ vế “với báo cáo nhiều dòng…”; bỏ vế máy chủ từ xa trong bản cho người mới, hoặc thu gọn thành một lưu ý rõ chỉ khi thực sự muốn hỗ trợ tác vụ đó. Nếu giữ `.NET CLR` để giải thích chi phí, gọi ngắn là bộ xử lý định dạng và nói thẳng hệ quả; không thêm đoạn giảng .NET. Độ chính xác kỹ thuật của giới hạn thực thi từ xa chưa được tôi kiểm.

### Tự kiểm tra — dòng 177–198

**Giữ được.** Có đúng ba dạng theo biến thể được duyệt: chọn công cụ, dự đoán kết quả, sửa cách dùng. Mọi dữ kiện cần trả lời đều nằm trong summary; biểu thức có nháy ở câu 2 dùng JSX `<code>` và HTML giữ nháy thẳng. Đáp án ngắn, giải thích lý do, không đưa kiến thức cốt lõi mới. Không cần thêm YAML/Exercises hay bắt ba câu này khảo sát hết mọi hàm trong bảng tra.

## 3. Bảng tiền đề của ba câu tự kiểm tra

Đường suy luận dưới đây dựa vào phần giảng trước phần ôn; đối chiếu đáp án chỉ để xem có dạy bù hay không, không dùng đáp án làm tiền đề.

| Câu | Cần kiến thức gì để tự xác định cách làm | Đã dạy ở đâu trước câu hỏi | Thiếu gì / khó tìm gì |
|---|---|---|---|
| 1 — chọn phép đo cho tên có dấu và dấu cách cuối | Phân biệt ký tự với byte; biết hai hàm xử lý dấu cách cuối khác nhau; số byte phụ thuộc kiểu/mã hóa | PL.3 dòng 33–39, bảng tra dòng 18; PL.1 phần Đọc giới hạn và dung lượng/Chuỗi | Không thiếu tiền đề. Mục Độ dài có thể đi tới trực tiếp từ bảng tra. Không cần biết công thức mã hóa để chọn phép đo. |
| 2 — dự đoán biểu thức nối có dấu ngăn, phần thiếu và chuỗi rỗng | Đọc các đối số theo thứ tự; phân biệt `NULL` với `N''`; biết khi nào dấu ngăn được thêm | PL.3 dòng 121–129, đặc biệt hai cột đối chiếu trong ví dụ; bài 2.7 làm nền về hàm lồng/đầu vào | Không thiếu tiền đề. Biểu thức câu hỏi là biến thể nhỏ của ví dụ, không cần một hàm hoặc quy tắc mới trong đáp án. |
| 3 — sửa thứ tự sau khi bật cột vị trí | Biết hàm tách trả nhiều dòng; cột vị trí chỉ là thông tin; phân biệt có vị trí với yêu cầu sắp xếp đầu ra | PL.3 dòng 135–143; bài 2.7 đã phân biệt dữ liệu trước/sau bước sắp xếp | Không thiếu tiền đề. Lời giảng và ví dụ đã cho người học cách xác định thao tác sửa trước phần ôn. |

Kết luận về học thử: có đủ kiến thức trong phần giảng đã giao để làm cả ba câu tự kiểm tra. F3 là lỗ hổng khi đem phần tra `PATINDEX` dùng với cột thiếu dữ liệu, không làm ba câu ôn hiện tại thiếu tiền đề.

## 4. Đối chiếu HTML và định dạng

- Trích riêng nội dung 11 thẻ `<pre>` trong article; đối chiếu với 11 chuỗi `Sql.code` trong MDX sau giải mã `\n`/`\t`: **11/11 bằng nhau nguyên văn**. Có tab thật ở các dòng thụt lề; stylesheet build khai báo `--sql-tab-size: 4` và dùng biến này cho `tab-size`. Đây là kiểm cấu trúc HTML/CSS, chưa chứng minh khoảng cách hiển thị hoặc nội dung clipboard khi bấm sao chép.
- Mọi fragment của liên kết trong bảng tra có đích `id` trong HTML; không thấy liên kết nội trang bị đứt. Không kiểm bấm/cuộn/TOC qua browser.
- Đã đọc các bảng Results trong HTML đối chiếu MDX: không thấy khác cột, khác giá trị hoặc sai thứ tự so với nội dung source. Các chuỗi có nhiều dấu cách, chuỗi rỗng, số `0` đầu và dấu tiếng Việt hiện diện trong HTML. Chưa xác nhận cách nhìn của ô rỗng hoặc khoảng trắng trên màn hình thật.
- Ba summary chứa đủ đề khi đáp án đóng; nháy SQL câu 2 còn là nháy thẳng. Không thấy lộ backtick hay chuỗi escape `\t`/`\n` trong phần văn bản SQL đã giải mã. Chưa thử bàn phím, mở/đóng details, copy/paste, editor, SSMS, viewport hoặc cuộn bảng.
- Bold tập trung ở các đối chiếu quan trọng; mã, kiểu, hàm, cột và giá trị dẫn chứng chủ yếu dùng code đúng nơi. Không thấy nhu cầu bôi đậm thêm hoặc mở rộng thuật ngữ chỉ vì mã mẫu mới xuất hiện.

## 5. Ưu tiên xử lý

1. **F3 — trung bình:** hoàn thiện quy tắc `NULL` của `PATINDEX` sau khi tác giả kiểm kỹ thuật; tránh lấy quy tắc tổng quát thay hành vi cụ thể của hàm tìm mẫu.
2. **F1, F2 — thấp:** sửa ngay hai cách gọi dễ bị đọc sai (`char(32)`, “chữ nguyên vẹn”). Chỉ cần sửa vế hiện có.
3. **F4, F5 — thấp:** cắt chỉ dẫn thừa và thu gọn thuật ngữ không giúp người học thực hiện công việc. Không cần tăng độ dài bài.

Không phát hiện mâu thuẫn nội bộ có căn cứ trong các kết quả ví dụ hoặc thiếu tiền đề của ba câu tự kiểm tra. Tôi không khẳng định mọi SQL/giới hạn nền tảng đúng chỉ từ việc đọc chúng.

## 6. Nguồn và giới hạn

Nguồn review là các file khóa học và HTML build liệt kê ở mục 1. Các liên kết Microsoft có sẵn gần từng nhóm hàm, nhưng **không được mở/đọc trong lượt review này** theo gói giao; không dùng chúng làm bằng chứng đã xác minh kỹ thuật.

Chưa xác minh bằng engine: hành vi `PATINDEX` với hai loại đầu vào `NULL`; các kết quả SQL thật; mapping/giới hạn kiểu trả về; cắt chuỗi, giới hạn byte, chuyển kiểu và lỗi ở giá trị biên; availability/cú pháp trên từng nền tảng SQL Server 2025/Azure; các ngưỡng compatibility level; collation, mã hóa và giới hạn thực thi từ xa. Các chỗ đọc thấy phù hợp được công nhận về mạch giảng, không chuyển thành chứng nhận live SQL.

Không chạy test/build/check của tác giả; không kiểm lỗi nền toàn repo. Không kiểm tương tác UI hoặc tiến độ/resume của chương, vì phạm vi chỉ là PL.3 và HTML tĩnh. Report này không phải xác nhận nghiệm thu SQL/UI, cũng không tạo quyền push/deploy.
