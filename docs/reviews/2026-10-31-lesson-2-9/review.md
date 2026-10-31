# Review học thử bài 2.9 - CASE WHEN: phân nhóm theo điều kiện

## 1. Phạm vi, phiên bản, công cụ

| Mục | Ghi nhận |
|---|---|
| Bài | `src/content/lessons/2-9-case-when-ham-if.mdx`; đề: `src/content/exercises/2-9-case-when-ham-if.yaml` (3 đề) |
| Source | HEAD `513c81b` trên `feat/lesson-2-5-null`; `git status` sạch lúc bắt đầu |
| Build | `dist/bai/2-9-case-when-ham-if/index.html`, ghi lúc 20:18:02, sau lần sửa cuối của MDX (20:17:17) và trước commit (20:19:27). Nội dung chữ trong HTML khớp nguồn MDX khi đối chiếu; không so hash |
| Cách kiểm | Chỉ đọc nguồn và HTML build. Không mở browser, không kết nối database, không chạy SQL/API/runner, không nộp bài |
| Model | Sonnet 5.5 (`claude-sonnet-5-5`) theo thông tin phiên; mức effort không tự đọc được từ trong phiên |
| Đã đọc | AGENTS.md, quy-uoc.md, lesson-template.md, ho-so-cong-ty.md, spec 2.8-2.9 (các mục được chỉ), bài 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 2.8, bài 2.9, YAML |
| Không đọc | `temp/review`, `docs/reviews`, nhận xét reviewer khác, `.env`, `database/HRM_Demo.sql` |

Thứ tự làm với đề: đọc riêng phần `prompt` của 3 đề, tự xác định cách làm từ kiến thức đã học, rồi mới mở phần `answer` để đối chiếu (mục 3).

Ghi chú trung thực về một lần chạm ngoài ý muốn: khi tìm xem "NgayVaoLam có NOT NULL" có được dạy ở đâu, một lệnh `grep` quét cả thư mục `database/` nên in ra vài dòng của `HRM_Demo.sql`. Tôi không dùng dòng đó làm căn cứ. Mọi nhận định về `NOT NULL` dưới đây dựa vào hình Object Explorer trong bản build bài 1.4, đúng thứ người học nhìn thấy. Lệnh đó cũng liệt kê tên (không đọc nội dung) vài file trong `temp/verification`.

Số liệu của bài được đối chiếu "trên giấy" với bảng 48 hồ sơ trong `docs/ho-so-cong-ty.md` (không phải chạy SQL): 45 hồ sơ đang làm đã vào làm tới 21/10/2026; 33 / 8 / 4 hồ sơ ở ba nhóm; 10 dòng đầu theo mã; nhóm dưới 1 năm là NV045-NV048. Khớp với bài. Đây không thay cho việc người viết chạy `SELECT`.

## 2. Rà theo thứ tự bài

### 2.1 Tình huống và giả định

**F1. Đoạn Giả định chứa nhiều ý trong một đoạn - Biên tập**
Câu gốc: "Bảng chỉ giữ trạng thái hiện tại; đổi mốc ngày trong câu lệnh không tự dựng lại danh sách đang làm ở quá khứ, muốn vậy cần bản chốt hoặc lịch sử như bài 6.6."
- Tác động: người mới phải gánh cùng lúc "bản chốt" (vừa được định nghĩa), "trạng thái hiện tại", "lịch sử" và một bài ở rất xa. Câu này không cần để hiểu câu lệnh hay làm đề, nên dễ làm người đọc dừng lại để suy nghĩ về điều chưa cần.
- Căn cứ: câu đúng về nội dung; chỉ nặng về độ tải. "Bản chốt" lần hai được dùng với nghĩa hơi khác (muốn dựng lại quá khứ thì cần một bản đã lưu), không có chữ nối.
- Đề xuất: giữ vế "Bảng chỉ giữ trạng thái hiện tại" và bỏ "muốn vậy cần ... bài 6.6", hoặc tách thành câu ngắn riêng.
- Đã trả lời "vì sao dùng ngày chốt cố định": có (định nghĩa bản chốt). "Vì sao cần điều kiện `NgayVaoLam <= ngày chốt`": chỉ trả lời gián tiếp, xem F5.

Phần còn lại giữ được: Chat khớp hồ sơ công ty (mục 7, bài 2.9), `Key` chốt đúng một câu, câu hỏi dữ liệu rõ, ba nhóm có biên mở/đóng rõ trong lời chị Hạnh.

### 2.2 Tiểu mục 1: "Từ IF trong Excel đến biểu thức CASE"

**Giữ được - Excel và cầu nối sang CASE.** Hình Excel dùng đúng ba hồ sơ (NV003, NV025, NV045) sẽ lặp lại ở LineMap, bảng nhánh và câu trả lời, nên người học theo được một mạch. `EDATE(B2,36)` được giải nghĩa ngay tại chỗ. "CASE là một biểu thức: một đoạn tính toán trả về một giá trị cho mỗi dòng" định nghĩa đủ cho người chưa biết "biểu thức". Một câu `Sql`, khớp `RunFlow.query` (xem mục 5). Không có ví dụ `MaCD`, không có bảng ba nhánh ở phần chính: đúng quyết định đã duyệt.

**LineMap - Giữ được.** Mỗi dòng có "Ví dụ:" với giá trị cụ thể; tôi tính lại ba ví dụ NV003 / NV025 / NV045 trên mốc ngày, đều đúng. Dòng "Chỉ xét khi nhánh trên sai" nói ngay quy tắc dừng ở nhánh đúng đầu tiên bằng lời thường.

**F2. Mốc kỷ niệm: chưa nói thẳng nghĩa, "đúng ngày kỷ niệm" chỉ có trong đề - Cần làm rõ**
Câu gốc: "Thâm niên ở đây tính theo **mốc kỷ niệm**, không chỉ lấy năm báo cáo trừ năm vào làm: `DATEADD(year, 3, NgayVaoLam)` nhỏ hơn hoặc bằng ngày chốt nghĩa là đã đủ `3` năm, như bài 2.8." (đoạn đầu sau LineMap)
- Tác động: "mốc kỷ niệm" được in đậm như thuật ngữ nhưng chỉ được định nghĩa gián tiếp qua công thức. Câu cũng không nhắc `DATEADD` làm gì (cộng 3 năm vào ngày vào làm); người nào quên bài 2.8 phải quay lại. Quan trọng hơn, quy ước "đúng ngày kỷ niệm tính là đã đủ" (vì sao là `<=` chứ không `<`) chỉ xuất hiện trong lời đề (cả ba đề đều nhắc), còn bài thì chỉ có chữ "hoặc bằng" mà không nói hệ quả. Dữ liệu mẫu không có hồ sơ nào tròn ngày kỷ niệm đúng ngày chốt, nên hình cũng không cho thấy.
- Loại: đã dạy nhưng khó tìm (DATEADD, bài 2.8) + chưa được dạy rõ (biên bằng).
- Đề xuất: một vế ngắn, ví dụ "mốc kỷ niệm là ngày vào làm cộng đủ số năm; đúng ngày mốc cũng tính là đã đủ".

**F3. Lời rào "Với các điều kiện so ngày của từng dòng như trong bài" - Cần làm rõ**
Câu gốc: "Với các điều kiện so ngày của từng dòng như trong bài, SQL Server xét `WHEN` theo thứ tự và chọn nhánh đúng đầu tiên..." (và ở Ghi nhớ: "Với điều kiện từng dòng, WHEN đúng đầu tiên quyết định nhãn").
- Tác động: người học khó tính sẽ hỏi ngay: "vậy có điều kiện nào KHÔNG xét theo thứ tự? Nếu có thì bài này có đúng với chúng không?". Bài không trả lời. Chỉ đoạn cuối ("tổng hợp theo nhóm học ở bài 3.1-3.2") có thể là manh mối nhưng không nối với lời rào. Đọc xong, người học có một điều kiện "ngầm" mà không biết nó là gì.
- Căn cứ: lời rào có vẻ cố ý chừa cho trường hợp đặc biệt của SQL Server (tài liệu Microsoft có lưu ý về thứ tự đánh giá khi có biểu thức tổng hợp). Tôi chưa đối chiếu tài liệu Microsoft nên không khẳng định chi tiết kỹ thuật; chỉ nói rằng lời rào hiện tại tạo câu hỏi mà bài không đáp.
- Đề xuất: hoặc bỏ lời rào (quy tắc đủ đúng cho mọi điều kiện của bài), hoặc nói rõ bằng một vế ("điều kiện có hàm tổng hợp, bài 3.1, có lưu ý riêng").

**F4. ELSE, NOT NULL và "ngày thiếu" - Cần làm rõ**
Câu gốc: "Ở đây `NgayVaoLam` có `NOT NULL` và đã lọc ngày không sau mốc chốt, nên phần còn lại chính là nhóm `Dưới 1 năm`."
- Tác động: lập luận đúng và có "vì sao": ELSE chỉ an toàn vì hai điều kiện đảm bảo. Nhưng (a) bài không chỉ chỗ người học nhìn thấy `NOT NULL` của `NgayVaoLam` (đã dạy ở hình Object Explorer của bài 1.4, "NgayVaoLam (date, not null)", nhưng bài 2.9 không trỏ về); (b) bài không nói vì sao ngày trống sẽ rơi vào ELSE (so sánh với `NULL` cho `UNKNOWN`, bài 2.5, nên không nhánh `WHEN` nào đúng). Nên người học chỉ biết kết luận, không thấy cơ chế.
- Loại: đã dạy nhưng khó tìm.
- Đề xuất: thêm "(hình ở bài 1.4)" và một vế "ngày trống sẽ cho UNKNOWN nên cũng rơi vào ELSE"; không cần đoạn mới.

**F5. Câu về trộn chữ với số - Cần cắt (tùy chọn)**
Câu gốc: "Các nhánh cùng trả chuỗi Unicode `N'…'` để kết quả là một cột chữ; trộn chữ với số có thể gây chuyển kiểu ngầm hoặc lỗi như bài 1.3."
- Tác động: không đề nào, không câu lệnh nào trong bài trộn chữ với số; người mới được dặn một cảnh báo không được minh họa. "Như bài 1.3" hơi lỏng vì 1.3 nói về giá trị ghi vào cột, không nói về `CASE`.
- Căn cứ: nội dung đúng chung (một biểu thức CASE có một kiểu kết quả), nhưng ngoài mục tiêu bài. Quy ước mục 1 (chi tiết ngoài phạm vi bài thì bỏ hoặc trỏ sang bài khác).
- Đề xuất: giữ vế đầu (vì sao cùng `N'…'`), cắt vế "trộn chữ với số ...".

**Giữ được - "CASE ... không thay WHERE".** Một câu, đúng và là điểm hay nhầm thật của người quen lọc bằng IF trong Excel.

**Giữ được - "Ở bài này chỉ cần...".** Có, và các bài trỏ tới (3.1-3.2, 4.6) tồn tại đúng chủ đề.

### 2.3 Tiểu mục 2: "SQL Server chạy câu này thế nào"

Bốn thẻ: FROM 48 -> WHERE 45 -> SELECT 45 -> ORDER BY 45. Số dòng/cột nối được giữa các bước (12 cột -> 12 cột -> 4 cột -> 4 cột); thẻ và drawer cùng số. `Đầu vào` mỗi bước lấy đúng từ bước trước.

**Bước FROM - Giữ được.** Đầu vào nêu bảng, Thực hiện nói chưa lọc/chưa chọn cột, Kết quả nêu 48 hồ sơ, 12 cột, 3 hồ sơ đã nghỉ. Mười dòng trích gồm đủ ba hồ sơ đã nghỉ (NV020, NV033, NV041), khớp "3".

**F6. Bước WHERE: điều kiện ngày không loại hồ sơ nào và bài không nói - Cần làm rõ**
Câu gốc/hình: bảng soi `NgayVaoLam <= ngày chốt` có "Đúng" ở cả bốn hàng; hàng cuối "Cả 48 dòng: 45 đúng | 48 đúng | 45 giữ".
- Tác động: đúng với dữ liệu (người vào làm muộn nhất là NV048 ngày 05/10/2026, bài 2.4 đã cho thấy). Nhưng người học nhìn bảng sẽ thấy một điều kiện luôn đúng và chẳng loại ai; "48 đúng" thậm chí dễ bị ngờ là gõ nhầm. Bài không nói "trong bản chốt này điều kiện chưa loại ai; nó cần khi dữ liệu có ngày sau mốc" - mục đích thật của điều kiện (giữ ELSE sạch, F4) nằm ở đoạn ELSE ở xa, không ở bước này. Ở LineMap ví dụ duy nhất của dòng WHERE chỉ nói NV020 bị loại.
- Điều làm tốt: bảng soi khớp Đầu vào (NV001, NV003, NV020, NV025 đều nằm trong 5 dòng đang hiện), khớp Kết quả (45), tiêu đề điều kiện có tên cột, có hàng loại (NV020 Sai/Đúng/Loại).
- Đề xuất: thêm một vế vào `detail` hoặc `meaning` của bước WHERE: "điều kiện ngày chưa loại hồ sơ nào trong dữ liệu hiện có" (một vế, không thêm hàng).

**F7. Bước SELECT (bảng nhánh CASE): ELSE không được gọi tên, ô đếm cuối không nhãn, vùng tô quá hẹp - Cần làm rõ**
Câu gốc/hình: Thực hiện: "mỗi hồ sơ đi qua các nhánh `WHEN` từ trên xuống và dừng ở nhánh đúng đầu tiên." Bảng: NV045 "Sai | Sai | Dưới 1 năm"; hàng cuối "Cả 45 dòng | 33 dòng | 8 dòng | 4 dòng". Vùng tô trên câu lệnh chỉ là chữ `CASE`.
- Điều làm tốt (công nhận): "Không xét" trong hàng NV003 cho thấy đúng ý "dừng ở nhánh đúng đầu tiên", không gây cảm giác mọi nhánh luôn được xét. Bảng có đủ một hồ sơ dừng ở mỗi nhánh và một hồ sơ vào nhánh còn lại; NV003 / NV025 / NV045 đều nằm trong 5 dòng Đầu vào; tổng 33 + 8 + 4 = 45 và khớp hồ sơ công ty.
- Chỗ vấp 1: NV045 "Sai | Sai" rồi nhận "Dưới 1 năm", nhưng drawer không nói chữ nào về `ELSE`. Người học phải tự nối sang LineMap.
- Chỗ vấp 2: số "4 dòng" nằm dưới cột "Nhãn" nên không rõ là ELSE; chú thích tự động chỉ nói "đếm số dòng dừng ở từng nhánh". Người đọc có thể hiểu "33 và 8" là số hồ sơ đúng điều kiện mỗi cột, rồi "4" là số nhãn (?).
- Chỗ vấp 3: vùng tô chỉ là từ `CASE` (một dòng) trong khi Thực hiện nói về "chọn ba cột rồi dùng CASE" và bảng nói về cả ba nhánh. Người học không thấy các dòng `WHEN` / `ELSE` được tô.
- Đề xuất: thêm vào `meaning` "không nhánh nào đúng thì lấy `ELSE`"; ghi chú hoặc nhãn hàng cuối để "4 dòng" hiểu là ELSE; cân nhắc `focus` lấy trọn khối `CASE ... END AS [Nhóm thâm niên]` (theo quy tắc `focus` khớp từng dòng của `query` đã dùng ở các bài trước).

**F8. Bước ORDER BY: Đầu vào đã đúng thứ tự nên không thấy việc sắp - Biên tập (thấp)**
- Năm dòng Đầu vào (NV001, NV003, NV025, NV044, NV045) đã tăng dần; Thực hiện tự nhận "Đầu vào có thể đã đúng thứ tự, nhưng chỉ bước này mới bảo đảm điều đó" và 10 dòng Kết quả (có NV002 chen giữa) cho thấy phần nào. Chấp nhận được và nhất quán với bài 2.5; nếu muốn rõ hơn thì chọn năm dòng Đầu vào có thứ tự đảo.

**Bảng kết quả cuối và câu trả lời - Giữ được.** Câu trả lời đứng ngay sau `Result`; 10 dòng trích, tổng 45 ghi rõ; hai dòng được tô (NV001, NV003) khớp lời; số 33 / 8 / 4 cộng đúng 45 và khớp hồ sơ công ty. Câu "Ba nhóm là quy tắc chị đã chọn; SQL chỉ áp dụng chúng..." tách đúng việc của database với quyết định nghiệp vụ.

### 2.4 Hay nhầm ở đâu

**F9. Hay nhầm 2 lặp lại hậu quả đã nói ở phần chính - Cần cắt/gộp**
Câu gốc: "Thử điều kiện rộng trước điều kiện hẹp. Nhánh đủ `1` năm đứng đầu sẽ nhận cả người đã đủ `3` năm, khiến nhãn sau không được chọn cho họ."
- Tác động: phần chính đã nói đủ ý và hậu quả ("`NV003` thỏa cả hai điều kiện; đảo thứ tự sẽ gán nhầm vào nhóm `Từ 1 đến dưới 3 năm`"). Hay nhầm 2 chép lại gần nguyên, thêm hai từ "rộng/hẹp" chưa được định nghĩa ở đâu.
- Đề xuất: giữ hậu quả ở một nơi. Quy ước mục 1 cho Hay nhầm nêu "lỗi và hậu quả"; có thể để phần chính chỉ nêu quy tắc và NV003, còn hậu quả dành cho Hay nhầm (hoặc ngược lại), rồi bỏ "rộng/hẹp".

**F10. Hay nhầm 3: tiêu đề và hậu quả lệch nhau, "ngày thiếu" mâu thuẫn với NOT NULL - Cần làm rõ**
Câu gốc: "Coi `ELSE` là nhóm "chưa biết". Gán nhãn `Dưới 1 năm` cho ngày thiếu hoặc ngày tương lai sẽ che dữ liệu cần kiểm; phải xác định phạm vi và cách xử lý riêng."
- Tác động: (a) tiêu đề đọc như "dùng ELSE làm nhóm chưa biết" nhưng vế sau nói lỗi ngược lại (ELSE vô tình nhận cả dữ liệu bất thường rồi dán nhãn thật); (b) "ngày thiếu" không xảy ra ở cột `NOT NULL` mà phần chính vừa khẳng định; (c) "cách xử lý riêng" quá chung, người học không biết làm gì.
- Đề xuất: viết lại thành lỗi cụ thể: "Dùng `ELSE` làm nhóm cho mọi dòng còn lại. Ngày sau mốc chốt cũng rơi vào đó và bị gán `Dưới 1 năm`; bài này chặn bằng `WHERE`." (một câu; bỏ "ngày thiếu" nếu giữ khẳng định `NOT NULL`).

**F11. Hay nhầm 1 - Biên tập.** Câu gốc: "...nên bị xếp nhóm sớm." Đúng (DATEDIFF(year) cho 3 vì 2026-2023), tham chiếu `DATEDIFF` đã dạy ở bài 2.8. "xếp nhóm sớm" hơi mơ hồ; nói "xếp vào `Từ 3 năm trở lên` trước kỷ niệm" rõ hơn.

### 2.5 Ứng dụng và Ghi nhớ

**Ứng dụng - Giữ được.** Hai ý đúng chủ đề (phân nhóm theo mốc nghiệp vụ cho danh sách đào tạo; cột nhắc `WHEN Email IS NULL` giữ email gốc), có mục đích cụ thể và điều kiện ("ngày chốt và ranh giới đã thống nhất"). Ý thứ hai ghép `IS NULL` (bài 2.5) vào `WHEN`, chưa được minh họa ở bài nhưng suy ra được và không hứa quá. Không có từ chỉ vai trò người đọc.

**F12. Ghi nhớ: cột "Bên Excel" không phải lúc nào cũng là Excel - Biên tập**
- Hàng 2: "Xếp IF từ điều kiện ưu tiên cao hơn" - "ưu tiên cao hơn" chưa được định nghĩa, và phần Excel của bài không hề nói thứ tự IF.
- Hàng 3: "Ngày kỷ niệm đạt mốc đã chọn" - đây là ý của SQL, không có đối chiếu Excel; trong khi hàm Excel duy nhất của bài, `EDATE`, không có mặt ở Ghi nhớ.
- Đề xuất: hàng 3 bên Excel ghi `EDATE(ngày, 36)` tạo mốc; hàng 2 bên Excel ghi "IF lồng nhau: điều kiện đầu đúng thì dừng".

### 2.6 Dấu hiệu định dạng (đối chiếu bản build)

- Nháy SQL: nháy thẳng, không lộ backtick hay `\t` (đếm 0 ký tự `\`, 0 nháy cong trong cả 5 khối mã).
- Tab: mỗi khối có 9 tab = 1 + 1 + 6 + 1 theo cấu trúc `SELECT`/cột tiếp dòng/`CASE`/`WHEN`/`WHEN`/`ELSE`/`END`; đúng mục 2.4 của quy ước (WHEN/ELSE lùi hai cấp, END thẳng CASE).
- `query` và `focus` khớp: bốn vùng tô đều là chuỗi con đúng của câu (`FROM NhanVien`, dòng `WHERE`, `CASE`, `ORDER BY MaNV ASC;`). `sql` của bước không hiện trên trang; trong nguồn, bước 2 và 3 bỏ phần sau (như quy ước) và bước 4 trùng `query`.
- Highlight: tên cột/mã/ngày/nhãn trong lời văn dùng code; bold dùng cho `bản chốt`, `IF lồng nhau`, `IFS`, `CASE`, `mốc kỷ niệm`, `ELSE`, `NULL`. `**NULL**` được in đậm lại dù đã là thuật ngữ từ bài 2.5; nên bỏ đậm.
- **F13. Cách viết ngày không đồng nhất với bài 2.8 - Biên tập (thấp).** Bài 2.8 dùng `CAST('20261021' AS date)`; bài này viết trần `'20261021'` ngay cạnh cột `date` mà không nói gì. Người học thấy khác mà không biết có phải cố ý. Thực chất cả hai đều chạy được qua chuyển kiểu ngầm đã dạy ở bài 2.2; một vế "như bài 2.2" ở LineMap hoặc đoạn mốc kỷ niệm là đủ. Chưa xác minh bằng chạy.

### 2.7 Đường đi người học

Bài không có "chọn nơi thực hành" riêng, chỉ có khối `Exercises` dẫn sang trang đề. Điều kiện hoàn thành ("Đã học xong") có gợi ý "tự viết lại được câu lệnh mà không nhìn bài". Không phát hiện chỗ bắt người chỉ dùng web phải kết nối SSMS, hay yêu cầu bỏ xác thực. Câu mở đầu phần Bài tập ("Mỗi đề chốt rõ mốc ngày...") có vấn đề ở đề 2 (xem F14).

## 3. Bảng tiền đề từng bài tập

Cách làm: đọc `prompt`, tự lập câu lệnh từ bài 2.1-2.5, 2.8, 2.9 trước, rồi mới mở `answer`. Cả ba câu tự lập khớp cấu trúc đáp án (không chép đáp án vào report).

| Đề | Cần kiến thức gì | Đã dạy ở đâu | Còn thiếu/khó |
|---|---|---|---|
| **2-9-1** Mốc một năm của phòng IT | `WHERE` ba điều kiện nối `AND` (phòng, trạng thái, ngày); `N'...'` cho chữ có dấu; `CASE` hai nhãn với một `WHEN` + `ELSE`; `DATEADD(year, 1, ...) <= ngày`; biên "đúng ngày kỷ niệm là đủ"; alias; `ORDER BY MaNV` | 2.2 (WHERE, `N`, ngày `yyyymmdd`), 2.3 (`AND`), 2.1 (alias), 2.4 (`ORDER BY`), 2.8 + 2.9 (`DATEADD`, `CASE`, `ELSE`) | Bài chỉ có mẫu hai `WHEN` + `ELSE`; mẫu một `WHEN` + `ELSE` suy ra được. Biên "đúng ngày" do đề nói rõ chứ bài chỉ có chữ "hoặc bằng" (F2). Đủ để làm |
| **2-9-2** Ba nhóm của toàn bộ hồ sơ Kinh doanh | Y hệt mẫu bài (ba nhóm, hai `WHEN` + `ELSE`), nhưng không lọc `TrangThai`, thêm cột `TrangThai`, mốc ngày thay đổi; tính đến ngày chốt chứ không tới `NgayNghiViec` | 2.9 trọn vẹn cho cấu trúc; 2.2 / 2.3 cho lọc phòng + ngày | **"Ngày chốt" không được gán giá trị** (F14); bài chỉ có người đang làm nên không minh họa người đã nghỉ, nhưng đề tự giải thích ("không dừng ở `NgayNghiViec`"). Đủ làm nếu hiểu `2026-08-14` là ngày chốt |
| **2-9-3** Chỉ ghi nhãn mốc ba năm của Nhân sự | `CASE` một `WHEN`, bỏ `ELSE` để ra `NULL` thật; `N'Đủ 3 năm'`; phân biệt `NULL` với chữ "NULL"; lọc phòng `NS`, đang làm, ngày | `NULL` ở bài 2.5; "bỏ `ELSE` thì nhận `NULL`" ở bài 2.9 (một câu); `NULL` hiển thị nền vàng ở `Result` các bài trước | Bài chỉ nói một câu, không có ví dụ ra `NULL` từ `CASE`, nhưng đề tự chỉ dẫn "một nhánh `WHEN` và bỏ `ELSE`". Chấp nhận được, chưa phải chỗ vấp lớn |

Kết luận phần đề: cả ba đề đều làm được bằng kiến thức đã dạy. Không có đề nào phải dựa vào bài sau. Các vướng chỉ là F14 (đề 2) và việc mẫu một `WHEN` chỉ được suy ra.

**F14. Đề 2-9-2 không nói "ngày chốt" là ngày nào - Cần làm rõ**
Câu gốc (prompt): "...NgayVaoLam không sau ngày 2026-08-14... Phân nhóm thời gian từ NgayVaoLam đến ngày chốt..."; `summary`: "theo cùng một ngày chốt"; lời dẫn Bài tập của bài: "Mỗi đề chốt rõ mốc ngày, phạm vi và cách trả nhãn."
- Tác động: đề 1 và 3 mở đầu bằng "Coi dữ liệu hiện tại là bản chốt ngày 2026-10-21", còn đề 2 không có câu tương ứng và dùng một ngày khác (`2026-08-14`). Chữ "ngày chốt" trong đề 2 có hai ứng viên: 21/10/2026 (đã quen từ bài) và 14/08/2026 (chỉ xuất hiện ở bộ lọc). Người học phải đoán. Theo đối chiếu giấy với hồ sơ công ty, cả 14 hồ sơ KD đều có ngày vào làm không sau 14/08/2026 và nhóm của từng hồ sơ không đổi giữa hai cách hiểu, nên cách hiểu sai vẫn ra cùng dữ liệu trên bộ mẫu hiện tại; nhưng đó là may mắn của dữ liệu, không phải do đề rõ. Chưa xác minh bằng chạy.
- Đề xuất: thêm vế "Coi ngày chốt là 2026-08-14" vào đề 2.

## 4. Ưu tiên

Số mục theo đánh giá (dùng cho báo cáo ngắn):

| Đánh giá | Số mục | Mục |
|---|---|---|
| Cần sửa (nội dung sai có căn cứ) | **0** | Không tìm thấy khẳng định sai trong bài hay bản build; số liệu khớp hồ sơ công ty |
| Cần làm rõ | 7 | F2, F3, F4, F6, F7, F10, F14 |
| Cần cắt/gộp | 2 | F5 (tùy chọn), F9 |
| Biên tập | 5 | F1, F8, F11, F12, F13 |
| Giữ được | nhiều | Excel + CASE, LineMap, bảng nhánh "Không xét", đối chiếu số liệu, câu trả lời tách database và nghiệp vụ, Ứng dụng |

Thứ tự đề nghị xử lý (sức ảnh hưởng tới người mới):
1. F14 (đề 2 mơ hồ ngày chốt) - ảnh hưởng trực tiếp tới việc làm bài.
2. F3 (lời rào "điều kiện từng dòng") - tạo câu hỏi không có đáp án trong lúc học kiến thức cốt lõi.
3. F2, F4 (mốc kỷ niệm; ELSE với `NOT NULL`) - bù thiếu một vế, không cần thêm đoạn.
4. F7, F6 (drawer: ELSE, ô đếm cuối, vùng tô; điều kiện ngày không loại ai).
5. F9, F10 (Hay nhầm lặp và lệch).
6. Các mục Biên tập còn lại.

Cần cắt, không phải thêm: F5, F9, F1 (phần "như bài 6.6"). Các sửa ở F2-F4, F6-F7 đều chỉ cần một vế ngắn; không cần thêm khối.

## 5. Câu "tại sao / để làm gì" tự đặt ra

| Câu hỏi | Bài đã trả lời ở đâu |
|---|---|
| Vì sao SQL dùng `CASE` thay `IF`? | Đủ: "CASE chọn giá trị giống IF trong công thức Excel", phần chính tiểu mục 1 |
| Vì sao không lấy năm báo cáo trừ năm vào làm? | Đủ: đoạn mốc kỷ niệm (NV025) + Hay nhầm 1 |
| Vì sao nhánh 3 năm phải đứng trước nhánh 1 năm? | Đủ: đoạn thứ tự `WHEN` (NV003 thỏa cả hai) + drawer bước SELECT |
| Vì sao có `ELSE` và vì sao dùng nó cho `Dưới 1 năm` được? | Có, nhưng thiếu nối với `NOT NULL` (F4) |
| Vì sao WHERE còn cần `NgayVaoLam <= ngày chốt`? | Chưa trả lời ở bước WHERE; chỉ gián tiếp ở đoạn ELSE (F6) |
| Vì sao đúng ngày kỷ niệm tính là đủ (`<=`)? | Chưa trả lời trong bài; chỉ có trong đề (F2) |
| Vì sao `CASE` không loại hồ sơ? | Đủ: đoạn "không thay `WHERE`" |
| Vì sao cần ngày chốt cố định? | Đủ: nhắc ở Giả định (bản chốt) và nối với bài 2.8 |
| Bỏ `ELSE` thì sao, để làm gì? | Một câu "nhận `NULL`"; chưa có ví dụ, chấp nhận vì đề 3 tự chỉ dẫn |
| Có điều kiện nào `CASE` không xét theo thứ tự không? | Bài tự gợi câu hỏi này bằng lời rào và không trả lời (F3) |

## 6. Nguồn và giới hạn

Đã dùng: nguồn MDX và YAML ở HEAD `513c81b`; bản build `dist/bai/2-9-case-when-ham-if/index.html` (đọc cả drawer, bảng soi, `<pre>`, `<mark>`, `<code>`); hồ sơ công ty (đối chiếu số liệu trên giấy); hình Object Explorer ở bản build bài 1.4 (cho `NOT NULL`).

Chưa xác minh (không có công cụ hoặc không được phép):
- Kết quả SQL thật: 33 / 8 / 4, 10 dòng đầu, nhãn từng hồ sơ, hành vi `CASE` một `WHEN` bỏ `ELSE`, việc so cột `date` với chuỗi `'20261021'` (chỉ suy ra từ hồ sơ công ty và từ bài 2.2).
- Giao diện: nút Sao chép có giữ tab không, dán vào editor, bàn phím và đóng/mở drawer, bố cục điện thoại, màu `NULL`. Đọc HTML không chứng minh được các điều này.
- Hình Excel: công thức có chạy đúng với `EDATE` khi cột ngày là chữ không; dấu phân cách đối số theo vùng (dấu phẩy hay chấm phẩy) của Excel tiếng Việt. Các bài trước dùng cùng cách viết nên không tính là lỗi riêng của 2.9.
- Chi tiết kỹ thuật SQL Server về thứ tự đánh giá của `CASE` với biểu thức đặc biệt (F3): chưa đối chiếu tài liệu Microsoft.
- Bộ chấm: không chạy `check:exercises`, nên chưa biết đáp án của đề 2-9-2 có chấp nhận cách hiểu ngày chốt là 21/10/2026 hay không (chỉ biết từ đối chiếu giấy rằng dữ liệu trùng).
- Test của repo (`npm test`, `check:dist`) không chạy.

## 7. Kết luận

Bài 2.9 theo đúng quyết định đã duyệt (một câu lệnh, bảng nhánh `CASE` với "Không xét", không `MaCD`, không bảng ba nhánh), không có khẳng định sai nào tìm thấy, và số liệu khớp hồ sơ công ty trên giấy. Kiến thức trong bài đủ để làm cả ba đề; các vướng còn lại là nhỏ: đề 2 chưa gán giá trị cho "ngày chốt", lời rào "điều kiện từng dòng" gợi câu hỏi không có đáp án, vài vế cần nối (mốc kỷ niệm, `NOT NULL`, `ELSE` trong drawer) và Hay nhầm 2 lặp lại phần chính. Đây là đánh giá học thử từ nguồn và HTML, không phải xác nhận SQL hay giao diện đã chạy đúng.
