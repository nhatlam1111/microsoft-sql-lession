# Review độc lập bài 2.7 — Hàm chuỗi và tiếng Việt có dấu

- Người review: Codex, kế thừa model của phiên; không xác định hoặc đoán tên model cụ thể.
- Vai đọc: Business Consultant khó tính, muốn hiểu SQL Server để trao đổi và phản biện khi làm BA/PM.
- Phạm vi: toàn bộ `src/content/lessons/2-7-ham-chuoi-tieng-viet.mdx`, YAML cùng slug và HTML tĩnh của bài cùng ba trang bài tập trong `dist`, bản ghi lúc 21:46 ngày 21/10/2026.
- Đã đọc quy ước, template, hồ sơ công ty, bài 1.1 đã duyệt, các phần liên quan của 2.2, 2.3, 2.5, 2.6 và bối cảnh quyết định trong spec được chỉ định. Không mở các report review cũ.
- Không đọc seed, không chạy SQL, không gọi API, không dùng browser hoặc bấm bài tập. Mọi nhận xét về tập dữ liệu dưới đây chỉ đối chiếu hồ sơ và nội dung bài, **chưa chạy**.

Bài có mạch giải thích rõ và chưa thấy lỗi kiến thức T-SQL chắc chắn qua đọc tĩnh. Điểm cần hành động chủ yếu là độ bao phủ thực hành: giữ Unicode và giới hạn của `TRIM` được giảng nhưng chưa được bài tập kiểm tra; bài tìm không dấu còn quá sát ví dụ.

## Nhận xét theo thứ tự bài

### 01. Frontmatter — Giữ được

- **Câu gốc:** “bạn cắt, ghép và trình bày chuỗi, giữ dấu tiếng Việt và chọn cách so sánh có dấu hoặc không dấu” (MDX dòng 13).
- **Tại sao/để làm gì:** Người học cần biết mình sẽ tạo được kết quả nào và phải phân biệt những cơ chế nào. Bài trả lời đủ ở phần giảng: cắt theo vị trí, ghép nhãn, giữ ký tự bằng `N`, chọn luật so sánh bằng collation.
- **Đánh giá:** Tiêu đề, summary và các bài cần biết trước khớp nội dung. `28` phút có thể chấp nhận với nhiều hàm và ba bài tập, nhưng chưa đo thời gian học thực tế. Giới hạn bao phủ bài tập ghi ở mục 17.

### 02. Tình huống và Key — Giữ được

- **Câu gốc:** “lấy toàn bộ hồ sơ có `MaPB = 'IT'` đang lưu, không thêm điều kiện trạng thái hay ngày vào làm” và “nhãn chỉ dùng trong kết quả xuất” (dòng 26).
- **Tại sao/để làm gì:** Vì sao không lọc người đang làm; đây có phải phòng tại một mốc cũ; tạo nhãn có sửa hồ sơ hay không? Giả định đã trả lời ngay trước phần chính.
- **Đánh giá:** Tin nhắn yêu cầu hai cột và mã tăng dần; Key chốt đúng mục đích đối chiếu. Không biến danh sách để in thành bằng chứng người đó đã ký. Phạm vi và số hồ sơ IT khớp hồ sơ công ty trên giấy, chưa chạy.

### 03. Excel và định nghĩa hàm chuỗi — Biên tập nhỏ

- **Câu gốc:** “Hình minh họa ba hồ sơ IT lấy từ bộ mẫu; ô `C2` được đánh dấu là nhãn vừa tạo” (dòng 34).
- **Tại sao/để làm gì:** Người học cần đối chiếu công thức với ô tạo nhãn, rồi chuyển sang hàm SQL. Phần này trả lời được: `A2`, `B2`, `C2` khớp bảng; `CONCAT` có dấu phân cách rõ; `MID` được nối sang `SUBSTRING`.
- **Đề xuất:** Đổi riêng “ba hồ sơ IT” thành “ba hồ sơ `IT`”, vì đây là mã lấy từ dữ liệu theo quy ước highlight. Không cần viết thêm câu. HTML có đúng một ô `C2` mang lớp chọn/đánh dấu; hình được gọi đúng là minh họa, không phải ảnh Excel thật.

### 04. Bảng hàm và SELECT giá trị trực tiếp — Giữ được

- **Câu gốc:** “Bắt đầu ở vị trí `3`, lấy `3` ký tự: `007`; vị trí đầu là `1`” và “dấu cách cuối `NV007 ` không được tính” (dòng 49, 52).
- **Tại sao/để làm gì:** Hai số trong `SUBSTRING` có nghĩa gì; phần số còn là chuỗi hay đã thành số; vì sao hai cột `LEN` đều là `5`? Bảng và kết quả đặt cạnh nhau trả lời được các câu này.
- **Đánh giá:** `NV`, `007`, `007`, `5`, `5` nhất quán nội bộ. Gọi rõ đây là ví dụ không đọc bảng giúp người mới hiểu vì sao không có `FROM`. Chưa chạy các biểu thức trên SQL Server; không coi đối chiếu bằng mắt là xác minh thực thi.

### 05. CONCAT, chuyển kiểu và NULL — Giữ được

- **Câu gốc:** “nó không tự thêm số `0` thành `007`” và “ghép được nhãn chưa chứng minh các thành phần đều đầy đủ” (dòng 64–66).
- **Tại sao/để làm gì:** Ghép mã có giữ định dạng không; `NULL` có làm toàn bộ nhãn thành `NULL` không; vì sao vẫn cần kiểm phần thiếu? Đã có lời giải thích trực tiếp và dẫn về `COALESCE` ở 2.5.
- **Đánh giá:** Phân biệt chuỗi nhận diện với số và đầu vào thiếu là hữu ích cho người kiểm yêu cầu. Không đưa phép cộng chuỗi `+` vào rồi phải dạy thêm quy tắc khác. Giữ đoạn này.

### 06. TRIM, hoa/thường và ví dụ tổng hợp — Giữ được

- **Câu gốc:** “`TRIM(chuỗi)` bỏ dấu cách thông thường, mã `32`, ở hai đầu; không gộp dấu cách giữa các từ” và “cột độ dài sau `TRIM` cho kết quả `8`, thay vì `7`” (dòng 68–70).
- **Tại sao/để làm gì:** Dùng cùng tên hàm với Excel thì có được cùng cách làm sạch không; đổi hoa/thường có bỏ dấu không; `LOWER(NULL)` đi tiếp vào `CONCAT` thế nào? Bài trả lời được cả ba.
- **Đánh giá:** Cột `DoDaiSauTRIM` giúp nhận ra hai dấu cách bên trong ngay cả khi HTML thu gọn khoảng trắng trong ô kết quả. Ví dụ `[]` phân biệt chữ `NULL` với việc thiếu giá trị. Bảng kết quả nhất quán với mô tả; chưa chạy. Không cần bổ sung một đoạn dài về mọi loại ký tự trắng.

### 07. Unicode và tiền tố N — Giữ được, còn giới hạn xác minh

- **Câu gốc:** “khi đọc cột `HoTen`, bạn không thêm `N` trước tên cột” và “ký tự tiếng Việt không biểu diễn được có thể mất dấu hoặc thành `?`” (dòng 86–88).
- **Tại sao/để làm gì:** Nếu cột đã lưu Unicode thì vì sao còn dùng `N`; phải thêm trước giá trị hay trước cột; thêm sau khi hỏng có cứu được không? Các câu hiện có giải thích đúng ranh giới đó.
- **Đánh giá:** Không tuyệt đối hóa rằng mọi `varchar` hoặc mọi chữ thiếu `N` đều thành dấu hỏi. Collation database khớp hồ sơ công ty. Khai báo `nvarchar(100)` và hành vi mất ký tự cụ thể chưa được reviewer xác minh bằng schema/truy vấn thật; không kết luận sai chỉ vì chưa chạy.

### 08. Collation, COLLATE và tra cứu Nguyễn — Giữ được

- **Câu gốc:** “`N` giữ ký tự bạn viết; nó không quyết định so sánh có phân biệt dấu hay không” và “Kết quả vẫn giữ `Nguyễn Thu Hà` có dấu” (dòng 90, 103).
- **Tại sao/để làm gì:** Tại sao viết đúng Unicode vẫn không tìm bằng chữ không dấu; vì sao kết quả không bị đổi thành `Nguyen`; có sửa thiết lập toàn database không? Bài trả lời rõ, tách lưu ký tự với luật so sánh và giới hạn tác động của biểu thức `COLLATE`.
- **Đánh giá:** Câu lệnh có `ORDER BY`, không tự kết hợp với bộ lọc IT của tình huống. Hồ sơ công ty có đúng hồ sơ `NV003` với tên này và không có họ Nguyễn khác trong danh sách đã công bố; chưa chạy kết quả hoặc collation. Lời nhắc xác nhận bằng mã có hậu quả nghiệp vụ cụ thể, không phải cảnh báo chung.

### 09. Tìm ký tự đại diện thật và phạm vi bài — Giữ được

- **Câu gốc:** “`LIKE N'%[%]%'` tìm chuỗi chứa dấu phần trăm, `LIKE N'%[_]%'` tìm chuỗi chứa dấu gạch dưới” (dòng 105).
- **Tại sao/để làm gì:** Nếu dữ liệu chứa chính `%` hoặc `_` thì làm sao tránh bị hiểu là mẫu? Hai ví dụ đã giải lời hẹn của bài 2.3; giải thích hai dấu `%` bên ngoài giúp người mới đọc được mẫu.
- **Đánh giá:** Không cần lôi thêm cú pháp escape ngoài phạm vi. Đoạn “Ở bài này chỉ cần…” dẫn đúng các phần kiểu dữ liệu, giá trị thiếu và chất lượng dữ liệu; câu chốt yêu cầu tìm kiếm với bên IT hữu ích cho việc viết đặc tả.

### 10. Câu lệnh, Result và trả lời tình huống — Giữ được

- **Câu gốc:** “Danh sách ký nhận cần nguyên họ tên, nên ghép trực tiếp `MaNV`, dấu phân cách và `HoTen`” và “việc ai thực tế đã ký nhận cần được ghi nhận riêng” (dòng 111, 132).
- **Tại sao/để làm gì:** Vì sao không cắt tên gọi; lọc phạm vi nào; kết quả đã đủ gửi chị Hạnh chưa? SQL và lời giải cạnh Result trả lời đủ hai cột, toàn bộ hồ sơ IT và mã tăng dần.
- **Đánh giá:** Mười mã/tên trong Result khớp các hồ sơ IT của hồ sơ công ty, chưa chạy. Dòng đánh dấu `NV007` khớp `C2` của hình Excel. Không có lời hứa SQL đã ghi nhận việc ký hoặc cập nhật bảng nguồn. Giữ khung gộp và vị trí lời giải hiện tại.

### 11. RunFlow — Giữ được

- **Câu gốc:** “Sơ đồ mô tả **thứ tự xử lý logic**, không phải cách SQL Server đọc dữ liệu vật lý” (dòng 136); các bước ghi `48 → 10 → 10 → 10`, từ `12` cột xuống `2` cột ở `SELECT`.
- **Tại sao/để làm gì:** Hàm được áp dụng cho các dòng nào; lọc có làm mất cột không; sắp xếp có tạo thêm nhãn không? Meaning/detail mỗi bước nêu đúng tác động, có hồ sơ được giữ/bỏ và số dòng.
- **Đánh giá:** Query gốc và query `ORDER BY` khớp câu cho tình huống. Các câu trung gian bỏ lần lượt lọc/chiếu/sắp xếp đúng ý nghĩa minh họa; `WHERE` và `SELECT` nói chưa bảo đảm thứ tự. Tổng dòng khớp hồ sơ, chưa chạy. Các ngày sinh, CCCD, email trong dòng nguồn không đủ dữ kiện ở hồ sơ công ty để reviewer xác nhận; không đoán chúng đúng hoặc sai. HTML có đủ bốn thẻ và nội dung bốn drawer; chưa mở tương tác hoặc kiểm bàn phím.

### 12. Hay nhầm ở đâu — Giữ được

- **Câu gốc:** “Cắt từ cuối của họ tên để xác định tên gọi” có thể sai với “Tên ghép hoặc quy ước đặt tên khác” (dòng 427).
- **Tại sao/để làm gì:** Cắt được bằng hàm có đồng nghĩa nhận diện đúng tên gọi không? Bài giải thích được vì sao cần quy tắc nghiệp vụ hoặc trường riêng, không tự suy tên từ từ cuối.
- **Đánh giá:** Bốn lỗi đều gắn với hậu quả: mất số không đầu, chưa đổi được luật so dấu, làm sạch chưa đủ, cắt sai tên. Mục `UPPER` và `TRIM` có nhắc lại kiến thức chính để mô tả lỗi; mức lặp hiện tại còn có chức năng, không cần cắt thành lời khuyên chung chung.

### 13. Ứng dụng và Ghi nhớ — Giữ được

- **Câu gốc:** “cắt tiền tố hoặc phần số khi định dạng mã đã được quy định, để trình bày trên biểu mẫu” và “`TRIM(chuỗi)` chỉ bỏ dấu cách mã 32 ở hai đầu” (dòng 436, 447).
- **Tại sao/để làm gì:** Dùng hàm vào việc nào và khi nào an toàn để suy phần mã; cần nhớ khác biệt nào so với Excel? Ba ứng dụng đều là khả năng của chủ đề có mục đích; điều kiện mã có cấu trúc được nói ngay trong ý.
- **Đánh giá:** Memo giữ đúng đối chiếu `MID`/`SUBSTRING`, `LEN`, `TRIM`, `NULL`, Unicode và collation; không giới thiệu hàm mới trong phần ôn. Không thấy đoạn vòng vo lớn cần cắt hay nhu cầu tăng độ dài phần giảng.

### 14. Lời dẫn bài tập và bài 2-7-1 — Giữ được

- **Câu gốc:** “Ba bài đều chấm vị trí cột và **thứ tự dòng**, không so tên cột” (MDX dòng 454); “Giữ PhanSo là chuỗi, gồm cả số 0 ở đầu” (YAML dòng 10).
- **Tại sao/để làm gì:** Học viên có biết bị chấm theo gì và vì sao `001` không được biến thành số `1` không? Đã nêu đủ phạm vi, ba vị trí cột, số không đầu và thứ tự mã.
- **Đánh giá:** Answer dùng kiến thức đã giảng, không phải nguyên câu ví dụ hiện có trong bài. Theo hồ sơ công ty, phạm vi KT có bảy hồ sơ, chưa chạy. Bài này có cơ hội phát hiện chuyển phần số thành số và cắt sai vị trí; chưa xác nhận hành vi bộ chấm với các bài làm sai đó. `RIGHT(MaNV, 3)` tương đương trên mã năm ký tự không phải lỗi cần bắt bằng kiểm cú pháp.

### 15. Bài 2-7-2 — Cần làm rõ mục tiêu thực hành độc lập

- **Câu gốc:** “tìm tất cả hồ sơ có HoTen bắt đầu bằng nguyen … bằng collation Vietnamese_CI_AI” (YAML dòng 24–25).
- **Tại sao/để làm gì:** Sau khi đã xem nguyên câu `WHERE HoTen COLLATE Vietnamese_CI_AI LIKE N'nguyen%'` và kết quả `NV003`, bài tập kiểm khả năng chuyển yêu cầu mới thành truy vấn hay chỉ thêm một cột? Hiện chỉ khác ví dụ ở `LEN(HoTen)`.
- **Lý do/đề xuất:** Đổi mẫu tìm sang một yêu cầu khác vẫn cần so không dấu để người học tự chọn và áp dụng lại điều kiện. Không cần tăng số bài, thay bộ chấm hoặc bắt cú pháp. Đây là khoảng trống chuyển giao kỹ năng, **không phải lộ nguyên câu đáp án**: câu ví dụ hai cột hiện không thể nộp đúng cho yêu cầu ba cột.
- **Giới hạn:** Theo hồ sơ, kết quả hiện chỉ có một hồ sơ; thứ tự dòng của riêng bài này không phân biệt được việc có/không có sắp xếp, nhưng hai bài khác có nhiều dòng. Dùng mẫu có dấu dưới collation mặc định có thể cho cùng tập kết quả, nên điểm đúng về kết quả không chứng minh riêng người học đã hiểu AI; không coi một cách viết tương đương kết quả là lỗi SQL.

### 16. Bài 2-7-3 — Giữ được, cần root xác minh khả năng kiểm LOWER

- **Câu gốc:** “Dùng CONCAT để email NULL tạo nhãn [] nhưng cột Email gốc vẫn là NULL; không thêm nhãn thay thế” (YAML dòng 44–45).
- **Tại sao/để làm gì:** Giá trị thiếu đi qua `LOWER` rồi `CONCAT` thế nào; vì sao giữ cột nguồn cạnh nhãn? Bài giảng và đề cùng trả lời được, yêu cầu có ý nghĩa đối chiếu dữ liệu.
- **Đánh giá:** Answer hợp với yêu cầu. Theo hồ sơ công ty, VH có mười hồ sơ, gồm hai đã nghỉ và `NV044` thiếu email, nên phạm vi có khả năng phân biệt việc tự lọc trạng thái hoặc lọc bỏ `NULL`; chưa chạy. Nhãn này không trùng nguyên bài minh họa.
- **Cần xác minh:** Hồ sơ không công bố email của đủ nhóm VH, nên reviewer không biết có địa chỉ chứa chữ hoa hay không. Nếu mọi email đều đã thường, bỏ `LOWER` sẽ không thay kết quả, và bài chỉ thực hành ghép/`NULL`, chưa chứng minh khả năng đổi hoa thường. Đề nghị root kiểm điều kiện này khi kiểm DB; chưa có căn cứ để khẳng định dữ liệu đang gây lỗi chấm. Không đề nghị sửa dữ liệu mẫu chỉ để tạo ca kiểm.

### 17. Toàn bộ ba bài tập so với mục tiêu — Cần sửa độ bao phủ

- **Câu gốc liên quan:** mục tiêu có “giữ dấu tiếng Việt”; phần giảng phân biệt `TRIM` của SQL với Excel, còn cả ba answer chỉ dùng các literal `KT`, `nguyen%`, `[`, `]`, `VH` (YAML dòng 15–54).
- **Tại sao/để làm gì:** Học xong và làm đúng cả ba bài thì người học đã chứng minh phân biệt được thiếu `N` và việc `TRIM` không gộp dấu cách bên trong chưa? **Chưa.** Các literal trong answer đều là ASCII; họ tên có dấu được đọc sẵn từ cột. Bỏ mọi tiền tố `N` đang có không tạo phép thử cho việc giữ chữ tiếng Việt. Không bài nào sử dụng hay hỏi về `TRIM`.
- **Đề xuất:** Tận dụng một phần yêu cầu hiện có với chuỗi tự viết có tiếng Việt và khoảng trắng để thiếu `N`/hiểu sai `TRIM` làm khác kết quả, hoặc thêm câu tự kiểm tra ngắn cho hai phân biệt này. Không cần thêm bảng, thay seed hay kiểm cú pháp hàm. Nếu chủ ý chỉ cho ba bài tập đại diện, cần giữ kết luận rằng hoàn thành chúng chưa xác nhận toàn bộ mục tiêu; phần giảng hiện tại không sai vì khoảng trống này.

## Ưu tiên xử lý

1. **P2 — Mục 17:** bổ sung cách kiểm hai khác biệt Unicode và `TRIM`, ưu tiên thay một phần yêu cầu hiện có để không làm bài dài hơn.
2. **P3 — Mục 15:** đổi dữ liệu/mẫu tìm của đề 2 để tránh lặp gần nguyên ví dụ đã xem.
3. **Cần root xác minh — Mục 16:** kiểm xem dữ liệu VH có giúp phân biệt bỏ `LOWER` hay không; reviewer chưa chạy, chưa chốt thành lỗi.
4. **P3 — Mục 03:** định dạng code cho mã `IT` trong lời dẫn hình.

## Kiểm HTML và giới hạn

- HTML tĩnh có đúng sáu mục chính, bốn tiểu mục phần chính, bốn thẻ RunFlow và ba link/trang bài tập. Các prompt khớp YAML; chỉ đọc HTML, không chạy trang hoặc bài tập.
- Có đúng một ô Excel mang lớp `xl-sel xl-mark`, ứng với `C2`, và một dòng Result mang `res-mark`, ứng với `NV007`. Bảng `TRIM` có giá trị độ dài `8`, mẫu tìm `%`/`_` thật có trong bản build. Không kết luận về độ tương phản, tràn ngang, bố cục thực tế, focus hoặc thao tác drawer vì không dùng browser.
- Không tự chạy test/build hoặc SQL/API trong lượt review này. Không xác nhận số liệu live, khả năng chấm lỗi thực tế, kiểu trả về/metadata, mã hóa hoặc hành vi collation trên máy chủ. Các trường nguồn không có trong hồ sơ công ty vẫn chưa xác minh.
- Lần trích HTML đầu bị lỗi mã hóa stdout `cp1252`; đã chạy lại bằng UTF-8 và đọc được. Đây là lỗi công cụ trích văn bản, không phải lỗi bài học.
- Tổng cộng **17 mục review**, gồm ba mục cần biên tập/đổi độ bao phủ (03, 15, 17) và một điều kiện cần root kiểm thêm trong mục 16. Chỉ tạo report này, không sửa file khác.
