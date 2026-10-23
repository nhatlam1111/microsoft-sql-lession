# Review độc lập bài 3.1 — COUNT, SUM, AVG, MIN, MAX

Ngày: 23/10/2026. Công cụ: Codex; **kế thừa model của phiên**, không chỉ định hoặc đoán tên model.

Đã học thử toàn bộ MDX, ba đề và lời giải YAML, test riêng 3.1, các kiểm liên quan trong test nội dung/check-dist, HTML bài học và ba trang bài tập của bản build hiện có **99 trang**. Đối chiếu AGENTS.md, quy ước, template, hồ sơ công ty, bài mẫu 1.1 và các bài nền 1.3, 2.1, 2.3, 2.5. Không đọc spec/plan, review cũ hoặc seed; không dùng database, API, browser hoặc tài liệu ngoài. Không sửa sản phẩm hay test.

**Kết luận:** chưa phát hiện lỗi kiến thức hoặc mạch học cần chặn bài. Bài trả lời được yêu cầu đầu bài, phân biệt đúng đơn/người, dòng/giá trị, `NULL`/`0`, bình quân trên số giá trị đã có và kết quả trên tập rỗng. Có một câu mô tả hình nên biên tập cho chính xác hơn; các giới hạn của bài tập cần ghi nhận đúng, không phải lý do đổi grader hoặc cưỡng chế cú pháp.

## Rà theo thứ tự bài

### 1. Mục tiêu, kiến thức nền và thời lượng — Giữ được

**Câu gốc:** “bạn tổng hợp đúng phạm vi dữ liệu, phân biệt đếm dòng với đếm giá trị và xử lý kết quả NULL”; `prerequisites: 2.5`; `minutes: 25`.

**Tại sao/để làm gì:** người học cần biết bài này chuyển từ danh sách chi tiết sang báo cáo một dòng, thay vì học thuộc năm tên hàm. Bài có trả lời: mục tiêu đi xuyên qua tình huống, ví dụ email, tổng hợp đơn và tập rỗng. Bài 2.5 đã giải thích `NULL`, chuỗi rỗng, `ISNULL`/`COALESCE`; bài 1.3 có `decimal`, bài 2.1 có alias và bài 2.3 có kết hợp điều kiện/khoảng ngày. `CAST` được giải thích ngay khi dùng, nên không thấy thiếu điều kiện kiến thức bắt buộc.

**Đề xuất:** giữ. Khoảng 25 phút có cơ sở khi tính cả đọc sơ đồ và ba bài thực hành; chưa đo bằng một phiên học có bấm giờ, nên không khẳng định đây là thời lượng đã kiểm nghiệm.

### 2. Tình huống và phạm vi tháng — Giữ được

**Câu gốc, dòng 21–26:** “các đơn nghỉ đã duyệt, bắt đầu trong tháng 9”; “Cộng toàn bộ `SoNgay` của các đơn này, không phân bổ ngày nghỉ theo từng tháng.”

**Tại sao/để làm gì:** “nghỉ tháng 9” có thể được hiểu là đơn bắt đầu trong tháng hoặc phần ngày thực nghỉ nằm trong tháng. Bài đã chốt rõ cách hiểu thứ nhất, đơn vị một dòng là một đơn và cả trạng thái lẫn hai mốc ngày. `Key` cũng chốt đúng đầu ra năm chỉ tiêu/một dòng. Điều kiện `TuNgay < '20261001'` khớp lời “đến trước”, không bỏ mất ngày cuối tháng.

**Đề xuất:** giữ phạm vi hiện tại. Không đổi thành phân bổ theo ngày thực nghỉ và không thêm cách tính giao tháng ngoài mục tiêu.

### 3. Hình Excel và rủi ro SUM trên vùng bị lọc — Giữ được

**Câu gốc, dòng 32:** “Hình minh họa `9` đơn đó, đánh dấu hai đầu vùng `C2:C10` và ô tổng `C11`”; “`SUM` thông thường vẫn cộng cả dòng bị lọc”.

**Tại sao/để làm gì:** người học quen AutoFilter có thể tưởng nhìn thấy chín dòng là `SUM` chỉ tính chín dòng ấy. Bài trả lời ngay bằng cách đưa đúng dòng sang sheet riêng, đồng thời nói ngắn về `SUBTOTAL`; không tuyệt đối hóa khả năng của Excel.

**Đối chiếu:** chín số trong hình cộng được `16`; mã và số ngày khớp chín dòng ở bước `WHERE`. DOM build có `xl-mark` ở `C2`, `C10`; `C11` có cả `xl-sel` và `xl-mark`; các ô ngày có `xl-num`. Địa chỉ công thức `=SUM(C2:C10)` không cộng cả ô tổng. Các dấu này khớp lời dẫn.

**Đề xuất:** giữ. Kiểm DOM chưa thay cho kiểm màu, độ tương phản hoặc tràn ngang trên màn hình thật; phần đó cần người phụ trách kiểm live.

### 4. Định nghĩa hàm và bảng Excel/SQL — Giữ được

**Câu gốc, dòng 48–58:** “**hàm tổng hợp** tính một giá trị từ nhiều dòng”; “Với truy vấn tổng hợp không chia nhóm bằng `GROUP BY` như bài này, kết quả là một dòng cho cả phạm vi”; “dấu `*` của `COUNT(*)` mang nghĩa đếm dòng”.

**Tại sao/để làm gì:** cần hiểu tại sao chín đơn trở thành một dòng và vì sao không dùng Excel `COUNT` cho mã dạng chữ. Bài trả lời đủ: `WHERE` chọn dòng, hàm tính trên phạm vi ấy, bảng ánh xạ từng nhu cầu sang hàm; `COUNTA(A2:A10)` phù hợp vì các mã trong hình đều đã điền. Phân biệt `COUNT(*)` với `SELECT *` giải tỏa đúng một nhầm lẫn do ký hiệu quen thuộc.

**Đề xuất:** giữ bảng gọn hiện tại. Nêu thêm `MIN`/`MAX` dùng với ngày đủ làm nền cho ứng dụng cuối bài; không cần mở thêm ví dụ chuỗi, JOIN, truy vấn con hoặc hàm cửa sổ.

### 5. COUNT dòng, COUNT giá trị và email hợp lệ — Giữ được

**Câu gốc, dòng 62–71:** “`COUNT(cột)` chỉ đếm các dòng mà cột đó khác `NULL`”; “`COUNT(Email)` vẫn đếm chuỗi rỗng hoặc chuỗi khoảng trắng nếu có”.

**Tại sao/để làm gì:** vì sao cùng bảng lại có `48` hồ sơ nhưng chỉ `46` giá trị email, và con số `46` có chứng minh liên hệ được không? Bài trả lời cả hai. Ví dụ không lọc mất email `NULL` trước khi đếm, không gọi đó là số email khác nhau và không nhận nhầm “khác `NULL`” thành “hợp lệ”.

**Đối chiếu:** hai mã `NV044`, `NV045`, phạm vi mọi trạng thái và số `48`/`46` thống nhất với hồ sơ công ty và bài 2.5. Chưa chạy truy vấn live trong lượt review này.

**Đề xuất:** giữ; không cần dạy `COUNT(DISTINCT ...)` để giải quyết một yêu cầu bài này không đặt ra.

### 6. NULL, số 0 và mẫu số của AVG — Giữ được

**Câu gốc, dòng 73:** “Với ba giá trị minh họa `2`, `NULL`, `0`, bình quân là `(2 + 0) / 2 = 1`: mẫu số là số giá trị khác `NULL`, không phải số dòng.”

**Tại sao/để làm gì:** bỏ `NULL` cụ thể là bỏ ở đâu, còn `0` có bị bỏ không, và tại sao bình quân đơn ở tình huống lại chia cho chín? Bài đã trả lời bằng phép tính có mẫu số, rồi nối ngay sang `SoNgay decimal(4,1) NOT NULL`. Đây là điều kiện quan trọng: với cột nhận `NULL`, không được mặc nhiên lấy tổng chia số dòng.

**Đề xuất:** giữ ví dụ minh họa ngắn này và câu nối với schema. Không cần thêm dữ liệu giả vào bảng mẫu hoặc dạy trước thay `NULL` bằng `CASE`. Câu tự kiểm tra cuối bài còn nhắc rõ đây không phải ba đơn có thật trong `DonNghiPhep`.

### 7. Tập rỗng và cột toàn NULL — Giữ được

**Câu gốc, dòng 75–77:** “truy vấn tổng hợp không `GROUP BY` vẫn trả một dòng”; “Nếu có dòng nhưng cột được tổng hợp đều là `NULL`, bốn hàm đó cũng trả `NULL`”; “Không tự thay giá trị thiếu bằng `0` trước khi tính trung bình”.

**Tại sao/để làm gì:** không có dữ liệu thì báo cáo biến mất, bằng không hay chưa có giá trị; vì sao không lấp `0` cho đẹp? Bài trả lời đúng phạm vi tổng hợp không nhóm, nêu cả hai loại đầu vào rỗng/toàn thiếu và hậu quả đổi mẫu số, không biến `NULL` thành một quy tắc nghiệp vụ tự có. Dẫn sang 3.2/3.3 đặt ranh giới đủ rõ.

**Đề xuất:** giữ. Với cột toàn `NULL`, `COUNT(cột)` bằng `0` đã suy được trực tiếp từ định nghĩa ngay trước; không cần thêm một đoạn giảng lại. Chưa chạy xác minh SQL Server trong lượt review này.

### 8. CAST, lời giải tình huống và số liệu — Giữ được

**Câu gốc, dòng 81–95:** “`SoNgay` đã là số thập phân nên `AVG(SoNgay)` giữ phần lẻ”; “làm tròn ở kết quả; không sửa số ngày trên từng đơn”; “`DP018` bắt đầu `2026-08-31`, kết thúc `2026-09-04`, nên không thuộc phạm vi này.”

**Tại sao/để làm gì:** vì sao cần `CAST`, nó đổi đầu vào hay kết quả, và tại sao một đơn chạm tháng 9 lại không được tính? Bài đã trả lời đủ và giải nghĩa hai tham số `decimal(10,2)` ngay chỗ xuất hiện. Câu SQL trả đủ năm chỉ tiêu, lọc đúng yêu cầu; lời trả lời nằm ngay cạnh kết quả và khép lại câu hỏi của chị Hạnh.

**Đối chiếu:** cộng tay chín số ngày trong hình/bước lọc được `16`; `16 / 9` làm tròn hai chữ số là `1.78`; nhỏ nhất `1`, lớn nhất `3`. Kết quả thống nhất với hồ sơ công ty. Dữ liệu nguồn và hành vi live của `CAST` chưa được chạy kiểm độc lập ở đây.

**Đề xuất:** giữ. Không yêu cầu thêm `ORDER BY` cho một dòng tổng hợp và không đổi cách lấy tháng đã chốt.

### 9. RunFlow và câu mô tả phần trích — Biên tập nhẹ, ưu tiên P3

**Câu gốc, dòng 99:** “Các bảng trước bước cuối là phần trích”. Các bước có `total` lần lượt `20`, `9`, `1`; bảng trong drawer `FROM` có mười dòng, drawer `WHERE` có đủ chín dòng.

**Tại sao/để làm gì:** số dòng đang thấy là toàn bộ hay chỉ một phần, và sơ đồ có nói SQL Server quét vật lý đúng thứ tự này không? Bài trả lời tốt câu thứ hai và các drawer đều bắt đầu bằng từ khóa, nêu số dòng giữ/bỏ/đổi cụ thể. Tuy nhiên, câu “các bảng trước bước cuối” chưa phân biệt **bảng xem nhanh trên thẻ** với **bảng trong drawer**: thẻ `WHERE` trích ba dòng, nhưng drawer `WHERE` hiện đủ chín đơn. Đây là độ chính xác của lời chú thích, không phải lỗi tổng hợp.

**Đề xuất:** thay ngay câu hiện có bằng một câu xác định phạm vi, ví dụ: “Các thẻ chỉ xem nhanh một phần dữ liệu; trong bảng chi tiết, bước `FROM` trích `10` trong `20` đơn, bước `WHERE` hiện đủ `9` đơn.” Nếu muốn giữ ngắn hơn, chỉ viết “Các thẻ xem nhanh chỉ hiện một phần dữ liệu.” Không thêm đoạn giải thích mới.

Phần còn lại giữ: một sơ đồ `FROM → WHERE → SELECT`, không đồng nhất thứ tự logic với cách đọc vật lý; câu phụ ở từng bước cũng chưa vượt kiến thức bài. DOM không có dấu backtick lộ thành chữ trong nội dung. Việc bấm mở/đóng, focus và highlight từ khóa cần kiểm live riêng.

### 10. Hay nhầm, ứng dụng, ghi nhớ và độ lặp — Giữ được

**Câu gốc, dòng 183–205:** “Một người có thể có nhiều đơn”; “`AVG` nhận đầu vào `int` trả về `int`”; “chuyển kết quả đã mất phần lẻ thì không lấy lại được”; “đối chiếu số hồ sơ với số giá trị khác `NULL`”.

**Tại sao/để làm gì:** có kết quả SQL rồi thì còn phải phản biện điều gì, và tại sao chuyển kiểu trước/sau `AVG` lại khác? Bài trả lời bằng đơn vị đo, phạm vi lọc và kiểu đầu vào. Cảnh báo một người nhiều đơn không mâu thuẫn việc bộ mẫu hiện có một đơn/người: đây là giới hạn của cách suy từ số dòng sang số người, không khẳng định dữ liệu mẫu đang có đơn trùng người.

**Đề xuất:** giữ. Ví dụ `AVG(CAST(cột_số_nguyên ...))` là đoạn đọc trong lời văn, không phải câu cho học viên sao chép chạy nguyên trạng. Không cần mở rộng bài thành kiến thức kiểu trả về của mọi hàm. Ba ứng dụng đều có việc làm/mục đích cụ thể và nằm trong phần đã giải thích. Lặp ở `Memo` và tự kiểm tra phục vụ ôn; nhắc phạm vi ngay lời trả lời phục vụ đọc báo cáo, chưa thấy chỗ lặp dài cần cắt. Bốn tiểu mục phần chính phù hợp khung gộp Excel/SQL.

### 11. Bài tập 1 và 2: khác phạm vi, có khả năng bắt lỗi mục tiêu — Giữ được

**Câu gốc YAML, dòng 7–10:** “chỉ tính các hồ sơ có `TrangThai` … ‘Đang làm’”; “Không loại hồ sơ thiếu email trước khi tính hai con số.”

**Tại sao/để làm gì:** có phân biệt được `COUNT(*)` với `COUNT(Email)` trong cùng tập dòng, thay vì chép ví dụ `48`/`46` không? Đề đã đổi sang phạm vi đang làm; lời giải YAML lọc trạng thái một lần rồi tính hai hàm. Test riêng nêu kỳ vọng `45`/`43`. Do đó cách lọc bỏ email thiếu trước khi đếm sẽ làm sai cột hồ sơ. Con số kỳ vọng này mới được đọc từ test, chưa xác nhận bằng một lần nộp live.

**Câu gốc YAML, dòng 22–28:** “`TuNgay` từ `2026-08-01` đến trước `2026-09-01`”; “kể cả đơn kết thúc sang tháng sau”; “không cần đổi hoặc làm tròn giá trị trung bình.”

**Tại sao/để làm gì:** có áp dụng được năm hàm trên một phạm vi mới, giữ đúng ý nghĩa tháng và phần lẻ không? Bài 2 có trả lời: đổi tháng, giữ trạng thái, giữ toàn bộ `SoNgay` và yêu cầu đủ năm cột. Test riêng nêu năm đơn/tổng `14`, nên bình quân suy ra `2.8`: có phần lẻ để phân biệt với cắt về số nguyên. Lời giải không có `CAST` thừa hoặc `GROUP BY`. Không cần yêu cầu tên alias vì thứ tự cột đã được nêu rõ.

**Đề xuất:** giữ cả hai bài; không tăng số lượng bài hoặc đổi schema/dữ liệu/grader. Bài 2 kiểm lại phép tổng hợp trên tập có dữ liệu, bù đúng hạn chế của bài tập rỗng ở mục sau.

### 12. Bài tập 3 và giới hạn của chấm theo kết quả — Giữ được, ghi nhận giới hạn

**Câu gốc YAML, dòng 42–47:** “tính trên mọi trạng thái”; “Giữ nguyên kết quả của các hàm, không thay `NULL` bằng số `0` hoặc chuỗi chữ ‘NULL’, không dùng `GROUP BY`.”

**Câu gốc MDX, dòng 210:** “Bộ chấm so giá trị và thứ tự cột, không kiểm tên alias hay bắt buộc cách viết. Tự đối chiếu hàm đã dùng với mục tiêu từng đề”.

**Tại sao/để làm gì:** không có đơn thì có giữ được một dòng và SQL `NULL` thật không? Đề và lời giải đã làm rõ mục tiêu ấy; tháng 11 nằm ngoài khoảng tháng 8–10 theo hồ sơ công ty, test riêng cũng có assertion không có dòng. Đề không yêu cầu dùng kiến thức chưa học.

**Giới hạn:** trên tập rỗng, `SUM`, `AVG`, `MIN`, `MAX` đều trả `NULL`, nên đổi nhầm vị trí bốn hàm hoặc thêm một bộ lọc trạng thái không cần thiết vẫn có thể cho cùng kết quả. Đây là giới hạn phân biệt lỗi của chính ca rỗng, không đủ căn cứ gọi là lỗi grader. Bài 2 có tập không rỗng để kiểm các phép tính; câu tự kiểm tra bổ sung giải thích. Chấm đúng một lần không chứng minh người học đã viết đúng mọi hàm/điều kiện như ý định.

**Đề xuất:** giữ ba bài đại diện và lời hướng dẫn tự đối chiếu. Không thêm cưỡng chế cú pháp. Khi kiểm live, cần xác nhận một dòng `0, NULL, NULL, NULL, NULL` được nhận, thay bằng chuỗi chữ `N'NULL'` bị loại và câu nhóm thông thường trả không dòng bị loại; tôi chưa thực hiện các lần nộp này.

### 13. Tự kiểm tra, test và HTML build — Giữ được trong phạm vi đã kiểm

**Câu gốc, dòng 217–226:** “đếm dòng, đếm giá trị và tính bình quân khác nhau thế nào?”; “Không có đơn phù hợp thì tổng số ngày bằng `0` hay `NULL`?”

**Tại sao/để làm gì:** sau thực hành, người học có diễn giải được kết quả, thay vì chỉ làm cho hệ thống báo đúng không? Hai câu hỏi nhắm vào hai chỗ suy luận cốt lõi, đáp án tự đủ nghĩa và không dạy thêm nội dung mới. Đây là bài truy vấn có ba bài tập, không có lý do áp yêu cầu tối thiểu ba câu hỏi dành riêng cho bài khái niệm.

**Test đã đọc:** test 3.1 bảo vệ đơn được chọn, loại đơn giao tháng theo `TuNgay`, dòng/số cột ở sơ đồ, kết quả bình quân đã làm tròn, ví dụ email, ba phạm vi bài tập và việc không chép đáp án vào thân bài. Test chung giữ khung hiện hành, dòng code/Unicode và giới hạn bài cũ; 3.1 không nằm trong danh sách cho phép khung cũ. Các assertion về câu SQL minh họa không đồng nghĩa ép cú pháp câu học viên nộp.

**HTML đã kiểm tĩnh:** heading đi đúng thứ tự; đủ ba liên kết bài tập và ba trang đề khớp YAML. Dùng các hàm kiểm thuần của `scripts/check-dist.mjs`, không chạy luồng có đọc seed: bốn trang 3.1 không có lỗi link nội bộ; không thiếu link bài tập; không thấy nguyên văn ba đáp án 3.1 trong các file HTML/JS/JSON được xuất ra. Parse DOM xác nhận không có backtick lộ trong text ngoài script/style.

**Đề xuất:** giữ. Test đọc seed và các assertion trong test không thay cho chạy SQL Server; kiểm HTML không thay cho kiểm tương tác thật. Không ghi “toàn bộ test/build đạt” từ kết quả của lượt review này.

## Ưu tiên và giới hạn

1. **P3, biên tập:** làm rõ câu “Các bảng trước bước cuối là phần trích” ở mục 9, để phân biệt thẻ xem nhanh với bảng trong drawer. Không cần mở thêm nội dung.
2. **Kiểm live thuộc người phụ trách:** màu/vị trí đánh dấu Excel, drawer và highlight của RunFlow; ba ca bài tập rỗng được nêu ở mục 12. Đã báo sớm cho agent phụ trách. Đây là phần chưa xác minh, không phải lỗi đã tìm thấy.
3. **Giữ quyết định nội dung:** khung gộp Excel/SQL; phạm vi theo `TuNgay`, không phân bổ ngày thực nghỉ; ba bài tập; chấm theo kết quả. Không đề nghị JOIN/truy vấn con/window/COUNT có CASE hoặc ép một cách viết.

Không có P1/P2 được xác lập trong lượt đọc này. Không chạy bộ test dùng seed, API, database, build mới hoặc browser; không chứng nhận số liệu live hay hành vi chấm. Đã đối chiếu số học trực tiếp trên chín dòng mà người học nhìn thấy và các số/điều kiện trong những tài liệu được phép đọc. Không dùng nhật ký tác giả hoặc nhận xét của lượt review trước để ra kết luận.
