# Review độc lập bài 2.9 — CASE WHEN

- Ngày: 21/10/2026.
- Công cụ: Codex, **kế thừa model của phiên**, không chỉ định hoặc đoán tên model.
- Vai học thử: Business Consultant muốn chuyển sang BA/PM, cần hiểu đủ để hỏi lại yêu cầu và kiểm cách developer phân nhóm dữ liệu.
- Phạm vi: toàn bộ `src/content/lessons/2-9-case-when-ham-if.mdx`, YAML tương ứng, test liên quan, code dựng hình/chấm kết quả và HTML build hiện có của bài cùng ba trang bài tập.
- Kết luận: phần giảng và câu trả lời tình huống nhất quán, chưa thấy lỗi phân nhóm trên dữ liệu được mô tả. Có **2 mục cần hành động**: một điều kiện thiếu trong lời hướng dẫn xử lý ngày `NULL` (mục 8), một khoảng trống kiểm ranh giới bằng trong bài tập (mục 18). Report có **20 mục**, nhóm theo thứ tự học; không chia mỗi câu đúng thành một mục riêng.

## Nhận xét theo thứ tự bài

### 1. Mục tiêu, tóm tắt và kiến thức cần biết — Giữ được

**Nguồn:** MDX 1–14. Câu gốc: “bạn tạo được nhãn bằng CASE, chọn đúng thứ tự điều kiện và phân nhóm theo số năm làm việc đã tròn”.

**Tại sao học / để làm gì:** cần biến quy tắc ba nhóm của người yêu cầu thành một cột có thể đối chiếu, tránh coi chênh lệch năm là thâm niên tròn. Bài thực hiện đủ ba phần của mục tiêu; yêu cầu trước bài 2.8 phù hợp vì dùng lại `DATEADD` và bẫy `DATEDIFF(year)`. Không hứa dạy công thức tính một số năm tròn tổng quát. Mốc 22 phút không thể chứng nhận bằng đọc source; độ sâu hiện tại không cho thấy cần kéo dài thêm.

### 2. Tình huống, giả định và câu chốt — Giữ được

**Nguồn:** MDX 16–26. Câu gốc: “Coi dữ liệu đang mở là bản chốt ngày `2026-10-21`”, “chỉ lấy `TrangThai = N'Đang làm'` và `NgayVaoLam` không sau ngày đó”, “Mỗi hồ sơ trong phạm vi cần một nhãn”.

**Vì sao cần các điều kiện này:** người mới có thể chỉ thay ngày rồi tưởng đã lấy đúng người đang làm trong quá khứ. Bài chặn hiểu nhầm ngay ở đầu, chỉ rõ bảng giữ trạng thái hiện tại và cần bản chốt/lịch sử để dựng lại quá khứ. Ngày, trạng thái, phạm vi, bốn cột và cách xếp đều khép đủ. “Mỗi hồ sơ một nhãn” cũng phân biệt việc gắn nhãn với tổng hợp số lượng theo nhóm. Nội dung khớp hồ sơ công ty, không lẫn nhân vật chị Hạnh với `NV020`.

### 3. Excel, IF/IFS, EDATE và ô đánh dấu — Giữ được

**Nguồn:** MDX 30–39. Câu gốc: “`EDATE(B2,36)` lấy mốc sau `36` tháng”; công thức `IF` lồng nhau ở `C2`.

**Tại sao so mốc thay vì trừ năm:** hình cho ba hồ sơ thuộc ba nhóm, chuyển được trực tiếp sang cách so `DATEADD`. Các giá trị `NV003`/`2023-06-01`, `NV025`/`2023-11-01`, `NV045`/`2026-07-01` và nhãn tương ứng khớp hồ sơ, logic công thức và phần SQL. Hình nói rõ là minh họa chọn ba hồ sơ, không giả là toàn bộ bảng; số dòng liên tục hợp lý cho bảng minh họa này. `numeric` đặt đúng ba ô ngày và `mark` đúng `C2`; HTML có một ô `xl-mark`. Đủ giải nghĩa `EDATE` cho mục tiêu, không cần mở một bài riêng về các hàm Excel.

### 4. CASE là biểu thức; phân biệt IF và WHERE — Giữ được

**Nguồn:** MDX 41–43. Câu gốc: “**`CASE` là một biểu thức**: một đoạn tính toán trả về một giá trị”; “không phải lệnh `IF` điều khiển việc chạy cả câu lệnh T-SQL”; “không thay `WHERE`”.

**Vì sao phải nói điều này:** người học quen Excel dễ hiểu `CASE` là cách chạy một câu truy vấn khác hoặc lọc người không đạt mốc. Bài giải thích đúng vị trí trong `SELECT`, vai trò `WHEN`/`THEN`/`END`/`AS`, một giá trị cho từng dòng và tác động chỉ ở kết quả. Không có khẳng định `CASE` điều khiển luồng chạy câu lệnh. Phần này trả lời được “đặt ở đâu, trả gì, có loại dòng hay sửa nguồn không”.

### 5. Ví dụ mã chức danh và kết quả nhỏ — Giữ được

**Nguồn:** MDX 45–59. Câu gốc: “`ELSE` gộp các mã còn lại thành `Chức danh khác` trong ví dụ”.

**Tại sao cần ví dụ nhỏ trước thâm niên:** có thể đọc trọn một `CASE` chỉ với một điều kiện, không đồng thời phải hiểu mốc ngày. Query lấy đúng hai mã; hồ sơ công ty xác nhận `NV001` có `CV`, `NV005` có `TP`. Kết quả hai nhãn, thứ tự `MaNV ASC` và dòng đánh dấu 2 phù hợp. Phần giải thích nói rõ nhãn còn lại không phải tên đầy đủ của từng chức danh hoặc dấu hiệu thiếu mã; không hứa biến tất cả mã thành tên thật. Đây là câu `SELECT` hoàn chỉnh, để nút sao chép là đúng.

### 6. Ngày kỷ niệm, thứ tự WHEN và bảng ba nhóm — Giữ được

**Nguồn:** MDX 61–71. Câu gốc: “Với `NV025`… phải tới `2026-11-01` mới đủ `3` năm”; “`NV003` thỏa cả hai điều kiện”.

**Vì sao 3 năm đứng trước 1 năm:** nhánh đạt ít nhất một năm bao trùm cả nhóm ít nhất ba năm. Bài đưa đúng hồ sơ làm chứng và nói đúng nhánh đúng đầu tiên cho các điều kiện so ngày của từng dòng. Bảng diễn đạt nhánh thứ hai theo phần còn lại, nên không cần thêm điều kiện `< 3` lặp trong query. Ranh giới “nhỏ hơn hoặc bằng” thể hiện đúng ngày kỷ niệm đã đủ năm. Không cần đưa thêm ngoại lệ biểu thức tổng hợp hoặc lịch sử tính năng vào bài này.

### 7. ELSE chỉ là phần còn lại trong phạm vi đã chốt — Giữ được

**Nguồn:** MDX 73. Câu gốc: “`NgayVaoLam` có `NOT NULL` và đã lọc ngày không sau mốc chốt, nên phần còn lại chính là nhóm `Dưới 1 năm`”.

**Vì sao dám gán nhãn dưới một năm:** không chỉ vì hai `WHEN` không đúng, mà còn vì nguồn không nhận ngày thiếu và phạm vi đã loại ngày tương lai. Bài đã nêu đủ điều kiện để kết luận nghiệp vụ này, đồng thời tránh gọi `ELSE` là nhóm chưa biết. Đây là một lý do cần giữ, không nên rút thành “còn lại là dưới một năm” đứng riêng. Khai báo `NOT NULL` chưa được reviewer đối chiếu seed/DB theo giới hạn ở cuối report; không suy từ test source thành chứng nhận schema live.

### 8. Hướng dẫn thêm nhánh cho ngày NULL thiếu điều kiện giữ dòng — Cần làm rõ, P2

**Nguồn:** MDX 75. Câu gốc: “trên nguồn cho phép thiếu ngày, cần nhánh `WHEN NgayVaoLam IS NULL` trả nhãn như `Chưa rõ ngày vào làm` trước các nhánh ngày”.

**Người học sẽ hỏi:** tại sao đã thêm nhánh này mà vẫn không thấy hồ sơ thiếu ngày? Bài đã dạy `WHERE` đi trước `SELECT`; chính câu tình huống dùng `NgayVaoLam <= '20261021'`, nên một dòng có ngày `NULL` bị loại trước khi `CASE` có cơ hội gắn nhãn. Câu hướng dẫn hiện nói điều kiện nguồn cho nhận `NULL`, nhưng chưa nói điều kiện phạm vi giữ các dòng đó.

**Đề xuất tối thiểu:** sửa ngay câu đang có thành “trên nguồn cho phép thiếu ngày, **nếu phạm vi giữ cả các dòng thiếu ngày**, thêm nhánh…”. Có thể rút câu cuối cùng để bù độ dài; không cần thêm query hay một đoạn về `OR`. Không yêu cầu đổi câu lệnh của tình huống vì bộ mẫu và phạm vi của câu đó đang được chốt đúng. Đây là thiếu điều kiện của lời hướng dẫn mở rộng, không phải kết quả phân nhóm mẫu đang sai.

### 9. Kiểu giá trị trả về và đoạn giới hạn độ sâu — Giữ được

**Nguồn:** MDX 77. Câu gốc: “Các nhánh trong bài cùng trả chuỗi Unicode `N'…'`”; “Trộn nhãn chữ với số có thể dẫn tới chuyển kiểu ngầm hoặc lỗi”.

**Vì sao không trả số ở một nhánh và chữ ở nhánh khác tùy tiện:** toàn bộ biểu thức phải tạo một cột có kiểu dữ liệu thống nhất. Bài cảnh báo đúng mức, không hứa tất cả tổ hợp chữ/số đều lỗi. Khái niệm chuyển kiểu đã có ở bài 1.3; nhãn Unicode cũng có nền ở bài 2.7. “Ở bài này chỉ cần…” chốt rõ phạm vi, dẫn tổng hợp sang 3.1–3.2 và kiểm bất thường sang 4.6. Không cần thêm bảng độ ưu tiên kiểu vào đây.

### 10. Câu lệnh tình huống, Result và lời trả lời — Giữ được

**Nguồn:** MDX 79–164. Câu gốc: “Kết quả trích `10` dòng đầu trong `45` hồ sơ đang làm đã chốt”; “Bạn có thể gửi chị Hạnh danh sách đủ bốn cột theo mã tăng dần”.

**Câu lệnh có trả lời đúng yêu cầu không:** có đủ hai điều kiện phạm vi, hai nhánh theo thứ tự đúng, `ELSE`, bốn cột đúng thứ tự và `ORDER BY MaNV ASC`; không bị `TOP` giới hạn danh sách. Mười dòng trích từ `NV001` tới `NV010` khớp hồ sơ và quy tắc mốc ngày. `mark={[1, 3]}` khớp lời chỉ `NV001`, `NV003`; giải thích riêng `NV045`–`NV048` giúp thấy nhóm thứ ba dù không nằm trong mười dòng đầu. Không lẫn số dòng trích với tổng danh sách. Lời giải sát query/result và tách quy tắc do chị Hạnh chọn với công việc SQL thực hiện, đúng khung gộp.

### 11. Toàn bộ RunFlow, các lời dẫn và các drawer — Giữ được

**Nguồn:** MDX 166–645. Câu gốc: “thứ tự xử lý logic, không phải cách đọc dữ liệu vật lý”; `FROM` 48 → `WHERE` 45 → `SELECT` 45 → `ORDER BY` 45.

**Vì sao cần sơ đồ:** nó cho thấy ba người đã nghỉ bị bỏ trước khi gắn nhóm, và việc sắp xếp không làm mất dòng. Bài nói rõ lúc đầu chọn một phần trích có chủ đích, cuối đổi sang mười dòng đầu; không đánh tráo việc đổi phần trích với việc xóa người. `FROM`/`WHERE` còn 12 cột, `SELECT` còn 4; lần lượt hiển thị 10/7/7/10 dòng, đều trong giới hạn. Các `meaning` bắt đầu bằng đúng từ khóa; detail nêu số dòng/cột thật theo source, kèm ví dụ cụ thể. `focus` nằm trong query; query toàn cảnh trùng câu tình huống; SQL của từng bước tương ứng trạng thái đang giải thích. `WHERE` ghi chưa bảo đảm thứ tự, đủ để không coi thứ tự trước `ORDER BY` là lời hứa. Dữ liệu họ tên, phòng, ngày vào/nghỉ và trạng thái ở các dòng có thể đối chiếu đều khớp hồ sơ công ty. Các cột ngày sinh/CCCD/email/quản lý không có đủ nguồn độc lập trong hồ sơ để reviewer chứng nhận.

HTML tĩnh có bốn thẻ và bốn panel, backtick trong `meaning`/`detail` được chuyển thành code, không lộ ký tự định dạng. Không có `LineMap`; không cần thêm chỉ để đủ khối. Chưa kiểm bấm mở/đóng, kích thước hoặc bàn phím.

### 12. Ba lỗi ở Hay nhầm — Giữ được

**Nguồn:** MDX 647–655. Câu gốc: “`NV025` có kết quả `3` dù chưa tới kỷ niệm ba năm”; “nhãn sau không được chọn cho họ”; “che dữ liệu cần kiểm”.

**Vì sao sai và cái giá là gì:** lần lượt gán nhóm quá sớm, gán nhóm thấp hơn do thứ tự nhánh và giấu ngày cần xác minh. Ba mục đều gắn lỗi với hậu quả, không đưa thêm ngoại lệ khó hoặc giảng lại cú pháp toàn bộ. Việc nhắc `DATEDIFF` nối đúng bài 2.8. Mục 3 cần được đọc cùng sửa điều kiện ở mục 8; bản thân lời cảnh báo không sai. Không có câu dẫn rỗng cần cắt; không đề nghị xóa ví dụ hậu quả chỉ vì nó dùng lại mã đã giải thích.

### 13. Ứng dụng — Giữ được

**Nguồn:** MDX 657–664. Câu gốc: “tạo danh sách thâm niên để người phụ trách chọn nhóm cho chương trình đào tạo”; “dùng `WHEN Email IS NULL` tạo cột nhắc kiểm hồ sơ mà vẫn giữ email gốc”.

**Để làm gì ngoài chép query:** một ý phân nhóm theo quy tắc đã thống nhất, một ý đánh dấu dòng cần bổ sung mà không loại dòng hay ghi đè cột nguồn. Cả hai là khả năng cụ thể của `CASE`, có mục đích công việc. Ví dụ `IS NULL` đã có nền ở 2.5 và được mở trong phần lý thuyết. Không hứa SQL tự quyết định ai phải đào tạo hoặc tự biết email đúng; không biến phần này thành checklist giao tiếp chung.

### 14. Ghi nhớ và lời dẫn bài tập — Giữ được

**Nguồn:** MDX 666–679. Câu gốc: “Với điều kiện từng dòng, WHEN đúng đầu tiên quyết định nhãn”; “bộ chấm so **thứ tự dòng**, không so tên cột”.

**Người học cần nhớ gì để tự viết lại:** bốn dòng `Memo` bao phủ biểu thức, thứ tự nhánh, mốc năm và `ELSE`/`NULL`, không thêm kiến thức mới. Giới hạn chấm vị trí cột/thứ tự dòng đúng với `ordered: true`, `compareResults` và `handleGrade`. Trả tên cột khác sẽ không bị chấm sai nếu giá trị đúng vị trí; sai chữ nhãn hoặc sai vị trí vẫn khác kết quả. Việc không kiểm tên cột được nói rõ, không có lời hứa chấm alias. Lời dẫn “Ba bài dùng ngày chốt…” cần đồng bộ nếu áp dụng đề xuất đổi một mốc ở mục 18.

### 15. Bài tập 2-9-1 — Giữ được, có giới hạn độ phân biệt

**Nguồn:** YAML 3–24. Câu gốc: “MaPB bằng IT, TrangThai bằng ‘Đang làm’ và NgayVaoLam không sau ngày chốt”; “Đã đủ 1 năm” / “Chưa đủ 1 năm”.

**Bài tập buộc thực hành gì:** từ ví dụ ba nhóm chuyển thành một mốc, một cột nhãn mới và phạm vi IT. Đề/answer khớp số cột, thứ tự cột, nhãn Unicode, phạm vi và thứ tự dòng. Tĩnh theo hồ sơ có 10 dòng, trong đó `NV046`, `NV048` chưa đủ một năm; có thể phân biệt bỏ `ELSE` hoặc gắn cùng một nhãn cho mọi người. Câu ví dụ trong bài không cho đúng kết quả để nộp nguyên xi.

**Giới hạn:** cả 10 hồ sơ IT đều đang làm và đều vào trước mốc chốt; bỏ riêng hai điều kiện đó chưa làm thay kết quả trên bộ mẫu hiện tại. `DATEDIFF(year) >= 1` cũng tình cờ cho cùng hai nhóm tại mốc này. Không kết luận bài tập sai vì nó không tự bắt mọi lỗi; bài 2 còn kiểm bẫy số năm rõ hơn. Không yêu cầu thêm hồ sơ vào database.

### 16. Bài tập 2-9-2 — Giữ được

**Nguồn:** YAML 25–49. Câu gốc: “kể cả hồ sơ đã nghỉ; không lọc trạng thái hay ngày nghỉ việc”; “Phân nhóm thời gian từ NgayVaoLam đến ngày chốt, không dừng ở NgayNghiViec”.

**Tại sao đổi phạm vi:** ngăn người học sao chép nguyên bộ lọc “Đang làm” từ bài và nhầm yêu cầu hiện tại với thâm niên dừng khi nghỉ. Đề nói rõ đây là khoảng từ ngày vào đến mốc, không suy là thời gian thực tế còn làm sau khi nghỉ. Answer giữ đủ 14 hồ sơ KD; `NV020` làm lộ việc lọc nhầm trạng thái. `NV025` làm lộ `DATEDIFF(year) >= 3`, còn các hồ sơ trên ba năm làm lộ việc đảo hai nhánh. Đề/answer bốn cột và ba nhãn khớp nhau. Dừng tính ở ngày nghỉ của riêng `NV020` vẫn chưa đổi nhóm vì người này đã quá ba năm từ trước khi nghỉ; đây là giới hạn dữ liệu, không phải sai kiến thức trong đề.

### 17. Bài tập 2-9-3 — Giữ được, cần phân biệt mục tiêu với cách chấm

**Nguồn:** YAML 50–72. Câu gốc: “Hồ sơ chưa đủ 3 năm vẫn phải có trong kết quả, với MocBaNam là NULL của SQL, không phải chuỗi chữ ‘NULL’”; “Dùng CASE có một nhánh WHEN và bỏ ELSE”.

**Vì sao không lọc người chưa đạt mốc:** bài thực hành chính là giá trị trả về khi không nhánh nào đúng. Tĩnh theo hồ sơ có 5 dòng NS, `NV047` chưa đủ ba năm và phải giữ lại với giá trị `NULL`; bốn người còn lại đủ mốc. Vì vậy lọc riêng người đạt mốc hoặc trả chuỗi `'NULL'` làm khác số dòng/giá trị và có thể phân biệt bằng cách chấm hiện tại. `compareResults` phân biệt `null` với chuỗi `'NULL'`.

Bộ chấm so kết quả không kiểm có đúng một `WHEN`, có viết `ELSE NULL` hay dùng đúng `CASE` hay không. Không gọi việc chấp nhận cách viết tương đương là lỗi; đây là giới hạn của cách chấm đã có, không đề nghị mở rộng sang grader cú pháp. Câu query bài học không trả đúng phạm vi/cột/nhãn của bài tập này để nộp nguyên xi.

### 18. Cả ba bài chưa phân biệt được lỗi dùng < thay <= ở mốc kỷ niệm — Cần sửa, P2

**Nguồn:** ba prompt đều nói “Đúng ngày kỷ niệm đã được tính là đủ”; answer dùng `<=` tại các nhánh `DATEADD`.

**Tại sao đây là lỗi quan trọng cần kiểm:** ranh giới đúng ngày kỷ niệm là một phần rõ của quy tắc nghiệp vụ và của lời giải thích. Tuy nhiên không hồ sơ nào trong các phạm vi bài tập có mốc một hoặc ba năm trùng `2026-10-21`. Đổi riêng các phép `<=` trong nhánh `WHEN` thành `<`, giữ đúng bộ lọc và các phần khác, sẽ cho cùng nhãn trên toàn bộ 10/14/5 dòng theo hồ sơ công ty. Một người dùng sai quy tắc ở chính ngày kỷ niệm vẫn không bị phân biệt bằng kết quả hiện tại.

**Bằng chứng tĩnh:** đã so các mốc từ ngày vào làm của từng hồ sơ với ngày chốt; số dòng khác nhãn khi đổi sang `<` là 0/0/0. Đây là đối chiếu dữ liệu bằng JavaScript, chưa phải chạy T-SQL/API. Test `content-2-9` kiểm answer có `<=`, không tạo một dòng bài nộp ở đúng ngày kỷ niệm nên không chứng minh bộ chấm phân biệt được lỗi này.

**Đề xuất không tăng số bài hoặc sửa seed:** cho một bài tập dùng ngày chốt trùng kỷ niệm của hồ sơ hiện có. Ví dụ bài 2 dùng `2026-08-14`: `NV038` vào `2023-08-14`, đúng ba năm; `NV025` vẫn chưa đủ ba năm nên tiếp tục bắt bẫy `DATEDIFF(year)`. Giữ phạm vi hiện mang mã KD, không dựng lại trạng thái quá khứ; đồng bộ prompt/answer và lời dẫn cuối MDX. Root cần kiểm live nếu chọn cách này. Không đề nghị thêm bài thứ tư hoặc yêu cầu grader phải nhận diện cú pháp.

### 19. Test liên quan và mức bằng chứng — Giữ được trong phạm vi tĩnh

**Nguồn đã đọc:** `tests/content-2-9.test.ts`, các kiểm chung về nội dung/bài tập có liên quan, `tests/exercise-level-2-discrimination.test.ts`, `src/lib/grade.ts`, đoạn `handleGrade` và các component `Excel`, `Result`, `RunFlow`.

**Các test trả lời được gì:** ba test riêng 2.9 kiểm dữ liệu minh họa, thứ tự flow, bộ lọc và thứ tự nhánh của answer, phạm vi/cột/thứ tự ba bài tập, ví dụ `TP`; chúng có giá trị bảo vệ bài khỏi bị đổi sai. Đã chạy `npx vitest run tests/content-2-9.test.ts`: **1 file, 3/3 test đạt**. Không suy thành tất cả test của repo đạt; không chạy lại pipeline do root phụ trách.

File kiểm độ phân biệt chung hiện chỉ có ca riêng 2.3/2.5, không có ca phân biệt ranh giới của 2.9. Nó tham chiếu seed nhưng reviewer không mở seed và không chạy file đó. Các expected hardcode ở test bài học không phải thực thi SQL Server, càng không phải xác minh dữ liệu live.

### 20. HTML build hiện có — Giữ được về nội dung tĩnh; tương tác chưa xác minh

**Nguồn:** `dist/bai/2-9-case-when-ham-if/index.html` và ba file `bai-tap/1..3/index.html`. File bài build lúc 21:46:36, sau source MDX/YAML lúc 21:43:21 trong workspace của lượt này.

Đã đọc toàn bộ văn bản HTML sau bỏ script/style, gồm cả nội dung ẩn của bốn drawer và ba prompt. Bản bài có sáu mục theo khung, bốn thẻ/bốn panel, các bảng và nhãn đúng như source. Có ba dòng `res-mark` tổng cộng (một ở ví dụ chức danh, hai ở kết quả chính), một ô Excel đánh dấu. Ba trang bài tập giữ đúng đề/cột và không thấy câu answer trong phần văn bản hiển thị đã đọc. Không thấy backtick bị lộ trong drawer. Không dùng văn bản HTML làm bằng chứng bố cục không tràn, khả năng đọc công thức dài hay điều khiển bằng bàn phím; những phần đó cần UI thật của root.

## Ưu tiên xử lý

1. **Mục 8 — P2:** thêm một vế điều kiện vào hướng dẫn xử lý ngày `NULL`, để người học không hiểu thêm `WHEN IS NULL` là đủ khi `WHERE` vẫn loại dòng đó.
2. **Mục 18 — P2:** làm cho ít nhất một bài tập có dòng đúng ngày kỷ niệm, để kiểm được quy tắc “đã đủ” dùng `<=`. Không cần đổi bài tình huống hoặc seed.

Không phát hiện lỗi P0/P1 từ bằng chứng hiện có. Không đề nghị khôi phục hai phần Excel/SQL, tạo mục trả lời riêng hoặc mở rộng bài thành tổng hợp/kiểu dữ liệu chuyên sâu. Những đoạn chưa chỉ ra vấn đề cụ thể được giữ, không thêm phần giảng chỉ để làm bài dài hơn.

## Xác minh và giới hạn

- Đã đọc brief, `AGENTS.md`, quy ước, template, hồ sơ công ty, bài 1.1, toàn bộ bài trước 2.8 và các phần nền có liên quan ở 1.3/2.5. Không mở report nào trong `docs/reviews` hoặc `temp/review`.
- **Giới hạn độc lập cần ghi trung thực:** khi tra các quyết định “Không làm theo” trong spec theo brief bằng `rg` kèm ngữ cảnh, kết quả đã hiển thị cả một số dòng nhật ký xử lý review cũ nằm trong chính spec. Không dùng những dòng này làm bằng chứng hoặc căn cứ kết luận; mọi nhận xét trên dựa vào MDX/YAML, hồ sơ công ty, code và HTML hiện tại. Reviewer không đạt giới hạn tuyệt đối “chưa từng thấy lịch sử viết”; cần cân nhắc giới hạn này khi nghiệm thu tính độc lập.
- Brief yêu cầu không đọc `database/HRM_Demo.sql`; reviewer giữ giới hạn đó, không dùng kết quả tra seed của người khác để chứng nhận dữ liệu. Không có seed riêng của bài 2.9 được dùng làm bằng chứng. Vì vậy yêu cầu đối chiếu SQL seed/live của lượt tổng vẫn thuộc root.
- Đối chiếu độc lập tĩnh từ 48 dòng bảng hồ sơ công ty cho kết quả 45 đang làm và chia 4/8/33. Đối chiếu 153 ô trường có thể kiểm trong các bước flow, cùng nhãn/mã/ngày của các ví dụ và tổng/phạm vi 10/14/5 bài tập; không chứng nhận các ô CCCD/ngày sinh/email/quản lý chưa có nguồn độc lập trong hồ sơ.
- Kiểm ranh giới được làm bằng phép so mốc năm trên dữ liệu ngày đã đọc; không giả lập đầy đủ SQL Server, collation hoặc bộ tối ưu. Một lần gõ thiếu `=>` trong script kiểm tạm đã dừng với `SyntaxError`; sửa và chạy lại cho kết quả nêu ở mục 18, không phải lỗi repo.
- Không truy cập database, không gọi API, không bấm Chạy bài tập, không khởi tạo browser/server, không đọc hoặc gửi cấu hình kết nối. Không dùng tài liệu ngoài theo brief. Các khẳng định cần thực thi T-SQL, kiểm schema live, query mutation qua API và trải nghiệm UI do root kiểm riêng; reviewer chưa xác minh chúng.
- Không sửa lesson, YAML, test, component hoặc tài liệu dự án; chỉ tạo report này. Không chạy build/full test/check:dist để thay kết quả kiểm tổng của root. Không push/deploy.
