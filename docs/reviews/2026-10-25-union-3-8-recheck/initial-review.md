# Review độc lập toàn bài 3.8 — lượt trước sửa

## Phạm vi, phiên bản và công cụ thực tế

- Vai học thử: Business Consultant khó tính, muốn hiểu SQL Server để trao đổi và phản biện yêu cầu dữ liệu; chỉ giả định biết Excel văn phòng cơ bản. Model: kế thừa model của phiên, không đổi model, không tạo agent con.
- Workspace: `E:\Projects\SQL Lession`.
- Source: `19170bc4428d21715ba42b3fa0416c06148280a4`. Lúc đối chiếu cuối, branch là `codex/review-lesson-3-8`; hai file trong phạm vi chưa có diff so với HEAD.
- Đọc toàn bộ `src/content/lessons/3-8-union-gop-danh-sach.mdx` (147 dòng) và `src/content/exercises/3-8-union-gop-danh-sach.yaml` (62 dòng).
- SHA-256 MDX: `E4EB196F322C6237159503785F89FD50247C643592C5500CCA8CF9A965D2B122`; YAML: `62581E2AC93D26B50592B51EF6DC80E729632AAD3E15CD5C113C7845C67818F6`.
- Đã đọc AGENTS.md, quy ước hiện hành gồm toàn mục 4.5–4.6, template, hồ sơ công ty và mẫu 1.1. Đối chiếu bài 2.1, 2.3, 2.4, 2.6, 3.1; phần liên quan ở 3.4–3.7. Đọc thêm đúng các đoạn cần thiết ở 1.3 và 2.2 để kiểm tiền đề kiểu giờ, kỳ lương, chuỗi và chuyển kiểu ngầm.
- Công cụ: PowerShell đọc file, `rg` tìm nguồn/thuật ngữ, Git chỉ đọc HEAD/branch/diff, `Get-FileHash`. Không đọc report cũ hoặc kết luận của tác giả; không đọc seed SQL, secret hay `.env`.
- Đây là **source audit**. Chưa được giao build khớp source; không đọc hoặc dùng `dist` cũ làm bằng chứng. Không chạy browser, API/runner, SQL, database, build, test hoặc component test. Không sửa source/test/docs/Git. Chỉ ghi report này.

## Rà theo thứ tự bài

### 1. Frontmatter và tình huống — MDX 1–26

**Giữ được.** Mục tiêu gộp cùng cấu trúc, giữ/bỏ trùng và summary khớp phần giảng và ba đề. Tiền đề khai báo 2.3, 2.4, 2.6 tương ứng với lọc, sắp và so trùng; các thuật ngữ chọn cột/kiểu dữ liệu đã có ở các bài trước. Không thấy lý do buộc thêm kiến thức bài sau.

Câu tự hỏi: “Chị cần một người một lần hay mỗi sự kiện một lần; trong tháng 9 nghĩa là ngày nào?” Bài trả lời ngay: mỗi mã một dòng; đơn xét `TuNgay` từ 01/09 đến trước 01/10/2026; chấm công xét `Ngay` trong tháng đó. Không lẫn đơn bắt đầu tháng 9 với ngày nghỉ thực tế rơi vào tháng 9. “Sau 08:00” cũng không bị đổi thành “từ 08:00”.

Câu tự hỏi: “Có được kết luận đi muộn/vi phạm từ danh sách này không?” Dòng 24 đã giới hạn theo mục đích rà soát, chưa xét ca làm/lý do. Đây là giả định cần giữ; tình huống không yêu cầu tự thêm bộ lọc trạng thái nhân viên hoặc kết sang `NhanVien`.

### 2. Chồng dòng và kết bảng — MDX 30–42

**Giữ được.** Remove Duplicates được giải thích bằng thao tác cụ thể, không mặc định người đọc đã biết công cụ. `UNION` được đối chiếu với `JOIN` theo kết quả cần tạo: chồng dòng so với lấy cột qua các dòng liên quan. “Nhánh” được định nghĩa tại lần đầu.

Câu tự hỏi: “Vì sao không cộng số dòng rồi gọi là số người; lặp ngay trong một nguồn có được bỏ không?” Dòng 34 và 42 trả lời cả hai: một mã có thể lặp qua ngày hoặc qua nguồn; `UNION ALL` giữ mọi lần, `UNION` bỏ trùng trên kết quả chung. Không cần `DISTINCT` từng nhánh chỉ để đạt mỗi mã một dòng là lời chỉ dẫn đúng phạm vi.

Hai `Result` ở dòng 38 và 40 được gọi rõ là bảng trích trước gộp. Bảng đầu hiện 5 dòng, `total=9`, đánh dấu dòng 1 là `NV005`; bảng sau hiện 8 dòng, `total=76`, đánh dấu dòng 5 cũng là `NV005`. Dấu đánh khớp lời dẫn. Không lấy số dòng nhìn thấy làm tổng.

**Cần cắt, mức biên tập — R3:** dòng 36 nhắc lại ngay cặp tổng đã nêu ở dòng 34; có thể bỏ riêng câu lặp, giữ câu báo bảng trích và mã được đánh dấu.

### 3. Cấu trúc, vị trí cột và nhãn nguồn — MDX 44–67

**Giữ được.** Bài phân biệt ba việc mà người mới dễ gộp làm một: đủ số cột để câu hợp lệ; kiểu tương thích để SQL xử lý; cùng ý nghĩa theo vị trí để báo cáo đúng nghĩa. Câu “không dò theo tên” và ví dụ đảo mã/nguồn trả lời trực tiếp vì sao tên cột giống nhau chưa đủ. Tên kết quả lấy từ nhánh đầu được dạy trước ví dụ và trước tự kiểm tra.

Câu tự hỏi: “Tại sao vẫn `UNION` mà `NV005` còn hai dòng?” Dòng 50 và 65 trả lời bằng hai cặp cụ thể. Cùng mã khác nguồn là hai dòng khác nhau; cùng mã cùng nguồn mới bị bỏ trùng. Cái giá của thêm nguồn được nêu ngay: không còn đáp ứng yêu cầu mỗi mã chỉ một dòng.

`Sql` dòng 52–61 là câu đầy đủ, không phải đoạn trích; Unicode có `N`, nhãn thứ hai không có alias vẫn nối được với giải thích tên kết quả từ nhánh đầu. Các điều kiện ngày/giờ khớp giả định; `ORDER BY MaNV, Nguon` khớp hai cột kết quả. Qua đọc nguồn, chưa thấy mâu thuẫn ngữ nghĩa với lời giảng; đây không phải xác nhận đã chạy SQL.

`Result` dòng 63 hiện 10 dòng, `total=49`; dòng 5 và 6 cùng `NV005`, khác nhãn đúng như lời giải thích. Tổng 49 là cặp mã–nguồn, không bị gọi thành 49 người. Chưa có bằng chứng độc lập để xác nhận tổng hoặc thứ tự/giá trị thực tế.

**Biên tập — R2:** cơ chế tự chuyển kiểu được diễn tả nhưng chưa nối lại bằng tên đã học “chuyển kiểu ngầm” hoặc chỉ về bài 1.3. Không cần mở rộng bài này thành bài về luật ưu tiên kiểu hay mọi lỗi chuyển đổi.

### 4. Câu chính, kết quả và cách xử lý — MDX 69–88

**Giữ được.** Mỗi `WHERE` thuộc nguồn riêng được nêu ở dòng 71. `ORDER BY` cuối câu sắp toàn bộ kết quả chung, không hứa thứ tự khi thiếu nó. Hai nhánh lấy đúng một cột và đúng điều kiện tình huống; không thêm `DISTINCT`, ngày hoặc nhãn nguồn làm đổi đơn vị dòng.

`Result` dòng 84 hiện 10 mã đầu với `total=41`. Dòng 86 trả lời chị Hạnh ngay cạnh kết quả, gọi đúng 41 mã khác nhau và nhắc giới hạn đối chiếu. Dòng 88 giải thích thay bằng `UNION ALL` thành 85 lần xuất hiện; muốn giữ ngày sự kiện thì phải thiết kế cột tương ứng có ý nghĩa ở cả hai phía, không tùy tiện chồng mã với ngày. Câu về thời gian chạy không hứa `UNION ALL` luôn nhanh hơn.

Câu tự hỏi: “Vì sao kết quả sau gộp có thể ít hơn tổng hai nhánh?” Dòng 32, 42, 65 và ví dụ `UNION ALL` đã trả lời bằng cơ chế bỏ trùng. Câu tự hỏi: “SQL Server xử lý cả câu này theo logic thế nào; có bắt buộc chạy nhánh trên xong mới nhánh dưới không?” Các mảnh kiến thức đã có, nhưng chưa có lời giải trực tiếp phân biệt mô hình logic của câu ghép với thứ tự thực thi vật lý. Đây là **Cần làm rõ — R1**, theo đúng phần người dùng yêu cầu kiểm lại; không phải nhận xét câu SQL hiện tại sai và không phải yêu cầu thêm sơ đồ cho đủ khuôn.

### 5. Hay nhầm — MDX 90–99

**Giữ được.** Bốn lỗi đều có hậu quả cụ thể: khác cấu trúc/đảo cột, nhãn làm thay đơn vị bỏ trùng, giữ lặp khi cần gửi một lần, nhầm kết quả sạch với nguồn đã sửa. Nhận xét `UNION` không sửa bảng nguồn kế thừa đúng bài 2.6. Không có một giới hạn cốt lõi chỉ xuất hiện lần đầu ở tự kiểm tra.

### 6. Ứng dụng — MDX 101–109

**Giữ được.** Ba ý nói đúng việc có thể làm bằng kiến thức đã giảng: danh sách gửi một lần, giữ dòng từ các kỳ, truy nguồn bằng nhãn. Ý truy nguồn đi kèm cái giá nhiều dòng cho một mã; không hứa tự đồng bộ hay tự xác nhận đúng nghiệp vụ.

### 7. Ghi nhớ và ba câu tự kiểm tra — MDX 111–141

**Giữ được.** Memo ôn đúng bốn trục: cấu trúc theo vị trí, toàn bộ cột làm căn cứ so trùng, giữ lặp trong/giữa nhánh, một sắp xếp chung. Không thấy ô Memo cố dùng Markdown không được component hỗ trợ.

- Câu 1: lặp 3 lần và 2 lần trên một cột; câu trả lời 1/5 dòng đã có tiền đề ở dòng 42. Không lẫn số dòng với số mã.
- Câu 2: cùng mã khác nhãn; đáp án đã được giảng và minh họa ở dòng 50–65.
- Câu 3: cùng số cột, vị trí, kiểu và sắp bằng tên từ nhánh đầu; các ý đã có ở dòng 46–48, 71 và hai ví dụ. Không dùng câu tự kiểm tra để dạy bù.

Tự kiểm tra nằm đúng sau Ghi nhớ, trước Bài tập. Các tên cột trong `<summary>` dùng `<code>`; không có literal SQL chứa nháy cần xử lý JSX đặc biệt trong các summary này.

### 8. Bài tập và định dạng xuyên suốt — MDX 143–147

**Giữ được.** Dòng 145 yêu cầu chốt đơn vị dòng và nói rõ chấm theo kết quả, nên một cách viết tương đương không tự thành lỗi. Chỉ dẫn không buộc người đọc dùng kiến thức ở bài sau hoặc chạy câu ghi dữ liệu.

Bold tập trung vào thuật ngữ mới/đối chiếu quan trọng. Dẫn chứng mã, tổng, nguồn, cột và từ khóa trong lời văn dùng code; không có lỗi highlight cụ thể xác minh được qua source. Hai `Sql` dùng escape `\t` cho các điều kiện tiếp dòng, mệnh đề chính thẳng cột; không có `RunFlow`, `LineMap`, `Messages`, `Excel`, `Ssms` hoặc `Erd` trong bài để bỏ sót drawer/hình. Chưa kiểm render thụt lề, nút Sao chép, nháy thực tế hay bàn phím.

## Tiền đề từng đề bài tập

Lượt đầu đọc YAML đã ẩn toàn bộ `answer`; tôi xác định đơn vị dòng và cách làm từ đề cùng bài giảng trước khi mở lại answer. Bảng dưới mô tả cách xác định, không chép nguyên đáp án.

| Đề | Cách làm/kiến thức tự xác định từ đề | Đã được dạy ở đâu | Thiếu gì; đối chiếu answer sau đó |
|---|---|---|---|
| 3-8-1, YAML 3–20 | Mỗi mã có lương ở ít nhất một trong hai kỳ chỉ còn một dòng. Lấy cùng cột mã từ hai phạm vi kỳ, bỏ trùng chung, sắp mã tăng dần. Một cách chọn một nguồn rồi lọc hai kỳ và bỏ trùng cũng có thể đúng mục tiêu kết quả. | Chọn cột ở 2.1; kiểu/giá trị `KyLuong` ở 1.3; phạm vi dòng lương theo kỳ ở 3.6; lọc ở 2.2–2.3; bỏ trùng ở 2.6 và 3.8 dòng 32–42; sắp ở 2.4 và 3.8 dòng 71. | Không thấy thiếu kiến thức bắt buộc. `KyLuong` không được nhắc trong thân bài 3.8 nhưng đã được dạy, không phải tự suy tên cột từ answer. Answer khớp phạm vi/đơn vị/sắp xếp qua đọc nguồn; chưa chạy. |
| 3-8-2, YAML 21–39 | Giữ một lần mã cho mỗi dòng lương thuộc hai kỳ; dùng cách chồng giữ lặp, không bỏ trùng và không thêm kỳ vào kết quả. Mã có cả hai kỳ có hai dòng; thứ tự giữa hai dòng hoàn toàn giống nhau không mang ý nghĩa. | `BangLuong` một dòng mỗi cặp kỳ–mã ở 3.6, kiểu kỳ ở 1.3; `UNION ALL` giữ cả lặp trong/giữa nhánh ở 3.8 dòng 42 và 88; thứ tự cột ở 2.1 và sắp ở 2.4. | Không thiếu. Yêu cầu “chỉ MaNV” và không cần phân thứ tự trong nhóm cùng mã đã rõ; không có mâu thuẫn với `ordered: true`. Answer khớp qua đọc nguồn; chưa kiểm bộ chấm có giữ đúng số lần lặp. |
| 3-8-3, YAML 40–62 | Đơn nghỉ chỉ lọc đã duyệt trên mọi ngày; nguồn chấm công mới có giới hạn tháng và giờ. Tạo nhãn Unicode cố định ở cột thứ hai, đặt tên kết quả từ nhánh đầu, bỏ trùng cả cặp rồi sắp hai cột. | Chuỗi giá trị/alias ở 2.1; phép so sánh và Unicode ở 2.2; kết hợp điều kiện ở 2.3; phạm vi tháng ở 3.1; nhãn cố định, vị trí, alias và so cả cặp ở 3.8 dòng 46–65; sắp chung ở dòng 71. Kiểu `GioVao` đã có ở 1.3. | Không thiếu. Đề nói rõ “không giới hạn ngày” cho đơn nên không được sao nguyên điều kiện tháng của ví dụ. Answer thực sự bỏ điều kiện đó ở nhánh đơn và giữ nó ở nhánh chấm công; cột/nhãn/phạm vi/sắp khớp qua đọc nguồn. Chưa chạy SQL. |

Không thấy đáp án nguyên văn của ba đề được công bố trong MDX: hai đề đầu dùng bảng lương khác ví dụ; đề thứ ba khác phạm vi ngày ở nhánh đơn. Nhận xét này là đối chiếu source của hai file, không thay cho `check:dist` toàn website.

## Findings theo ưu tiên và mức xác minh

### R1 — P2 — Cần làm rõ đường xử lý logic của toàn câu UNION

- Vị trí: MDX 69–88; liên quan các định nghĩa ở dòng 32, 42.
- Câu gốc: “Mỗi nhánh tự lọc bảng của mình. Một `ORDER BY` ở cuối sắp xếp toàn bộ kết quả sau khi gộp”.
- Điều đã có: biết các nguồn tự lọc, `UNION` so trùng toàn bộ kết quả chọn và sắp ở cuối. Đủ để lựa chọn cách gộp cho các đề. Không có bằng chứng rằng câu SQL hoặc định nghĩa hiện tại sai.
- Điều còn thiếu với phần người dùng muốn kiểm: một lời giải trực tiếp về mô hình xử lý cả câu ghép. Người mới vẫn phải tự ráp `FROM` → `WHERE` → chọn cột của từng nhánh, tới gộp/bỏ trùng chung, tới sắp xếp; cũng chưa được nhắc ở bài này rằng đây không xác định nhánh nào chạy trước hoặc SQL Server phải vật chất hóa từng bảng trung gian.
- Tác động: dễ đọc “chồng rồi bỏ” như mô tả những lượt thực thi bắt buộc; khó giải thích lại SQL Server xử lý câu chính thế nào dù có thể sửa ví dụ để làm đề.
- Đề xuất ngắn: gom các vế hiện có thành một đoạn ngay sau lời giải câu chính: về logic, từng nhánh xác định nguồn → lọc → chọn cột; `UNION` hợp các kết quả và bỏ dòng trùng rồi `ORDER BY` sắp chung, còn `UNION ALL` giữ mọi lần xuất hiện. Kèm một vế rằng đây là mô hình logic, không phải thứ tự thực thi vật lý. Có thể dùng lời văn; không bắt buộc thêm `RunFlow`, bảng mới hoặc số liệu mới.
- Mức xác minh: khoảng trống lời giảng xác minh được từ toàn source và đối chiếu cách bài trước phân biệt logic/vật lý. Không phải phát hiện kế hoạch thực thi của SQL Server; chưa chạy hay tra tài liệu ngoài khóa học.

### R2 — P3 — Biên tập: gọi lại tên cơ chế chuyển kiểu đã học

- Vị trí: MDX 46 và 67.
- Câu gốc: “SQL Server đọc hoặc chuyển được chúng về kiểu chung”; “SQL tự chuyển kiểu”.
- Tác động: ý diễn tả được nhưng tách khỏi tên “chuyển kiểu ngầm” đã học ở 1.3/2.2; người đọc khó nối lại lời cảnh báo khi cần tra cứu. Đây là kiến thức đã dạy, không phải thiếu tiền đề làm bài tập.
- Căn cứ: quy ước mục 2 yêu cầu gọi đúng tên cơ chế SQL Server tự làm; 1.3 định nghĩa “chuyển kiểu ngầm”, 2.2 gọi lại tên khi so chuỗi ngày với cột ngày.
- Đề xuất: đổi ngay một vế đang có thành “có thể chuyển kiểu ngầm về kiểu chung (xem bài 1.3)” và giữ cảnh báo kiểm cấu trúc. Không cần giảng luật chọn kiểu chung trong bài này.
- Mức xác minh: biên tập nguồn; chưa xác minh live kiểu của hai cột `MaNV` trong các bảng nguồn.

### R3 — P3 — Cần cắt câu nhắc lại tổng ngay sau đoạn trước

- Vị trí: MDX 34 và 36.
- Câu gốc lặp: “Bảng đơn nghỉ có `9` dòng, bảng chấm công có `76` dòng”.
- Tác động: hai tổng được đọc hai lần liền nhau trước khi tới hình, nhưng không thêm phạm vi hay đơn vị mới.
- Căn cứ: đoạn ngay trước đã nói nhánh đơn nghỉ 9 dòng mã, nhánh chấm công 76 dòng và đơn vị lần xuất hiện; `Result.total` cũng giữ tổng cạnh hình.
- Đề xuất: bỏ riêng câu nhắc lại ở dòng 36, giữ lời báo “trích vài mã đầu”, “chưa gộp” và mã `NV005` được đánh dấu. Không bỏ các tổng trên `Result`.
- Mức xác minh: lặp câu xác minh trực tiếp từ source; không liên quan độ đúng của số liệu.

## Điều giữ được, số liệu và giới hạn

- Giữ cách phân biệt `UNION`/`UNION ALL`, lặp trong cùng nhánh, so trùng toàn bộ dòng, vị trí/số lượng/ý nghĩa cột, tên từ nhánh đầu và một `ORDER BY` chung. Các ví dụ cùng nhãn nguồn chỉ đúng đơn vị và cái giá của việc thêm cột. Không tìm thấy lỗi nội dung SQL chắc chắn qua đọc nguồn trong phạm vi này.
- Không đề nghị thêm khối để đủ khuôn; không bắt mở rộng sang kiểu ưu tiên, collation, tối ưu hóa, lịch sử, hay cách giữ ngày sự kiện ở hai nguồn như một mục mới. Bài đã chặn kết luận nghiệp vụ quá mức và không hứa sửa sạch dữ liệu nguồn.
- Số học `9 + 76 = 85` nhất quán. Các tổng 9/76/85/41/49 cũng không tạo mâu thuẫn hiển nhiên với đơn vị được ghi và hồ sơ công ty; sự nhất quán giữa hai tài liệu không phải bằng chứng SQL đã chạy đúng. Từng dòng dữ liệu, tổng thật, kiểu `MaNV` và thứ tự thực tế đều **chưa xác minh độc lập**.
- Chưa kiểm build/HTML, font/tab bốn cột, nháy, clipboard, nút Sao chép, điều khiển bàn phím, render `Result.total`/mark, hoặc màn bài tập; không có lỗi nền UI được kiểm ở lượt này. Không chạy các kiểm mục 4.4 vì gói review chỉ cho source audit; việc đó còn thuộc xác minh của tác giả.
- Đánh giá tiền đề: đủ kiến thức đã giảng để xác định cách làm cho cả ba đề mà không dùng answer làm lời giảng. Còn cần làm rõ cách kể mô hình logic toàn câu theo R1 và xử lý hai mục biên tập R2–R3. Kết luận này không xác nhận SQL live, bộ chấm hay UI đã đạt và không thay quyền push/deploy.
