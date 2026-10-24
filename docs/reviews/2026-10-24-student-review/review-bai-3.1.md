# Review độc lập bài 3.1 — COUNT, SUM, AVG, MIN, MAX

- Ngày review: 25/10/2026.
- Công cụ: Codex; kế thừa model của phiên, không chỉ định model khác.
- Vai học thử: Business Consultant khó tính, muốn hiểu SQL Server để đủ hỏi và phản biện về yêu cầu dữ liệu; chỉ dùng bài này và các bài trước liên quan để học.
- Phạm vi: toàn bộ `src/content/lessons/3-1-count-sum-avg.mdx`, YAML tương ứng và HTML đã build của chính bài này. Bản HTML có thời điểm sửa 25/10/2026 00:20:11.

**Kết quả:** không phát hiện lỗi nội dung cần sửa hoặc khoảng trống kiến thức khiến người mới không làm được ba bài tập. Có một ghi nhận biên tập nhẹ về thụt lề SQL trong YAML; không ảnh hưởng ý nghĩa đáp án và không phải lý do chặn bài. Các số liệu chỉ được đối chiếu nội bộ giữa lời, hình, sơ đồ và hồ sơ công ty, chưa được xác minh bằng database.

## Rà theo thứ tự bài

### 1. Tình huống và giả định — Giữ được

**Câu gốc:** “Cộng toàn bộ `SoNgay` của các đơn này, không phân bổ ngày nghỉ theo từng tháng.” (MDX dòng 24).

Yêu cầu đã chốt một dòng là một đơn, trạng thái được tính và khoảng ngày bắt đầu có đầu trên loại trừ. Vì vậy người học biết đang tổng hợp đơn, không phải tự suy ra cách tính ngày thực nghỉ trong tháng. Năm yêu cầu trong tin nhắn khớp năm cột của câu chính và kết quả.

- **Tại sao lọc theo `TuNgay`, thay vì lấy mọi đơn có ngày nghỉ chạm tháng 9? — Đã trả lời.** Giả định lấy đơn bắt đầu trong tháng; đoạn kết quả dùng `DP018` bắt đầu tháng 8 để đối chiếu đúng sự khác nhau.
- **Tổng số ngày này dùng để trả lời việc gì? — Đã trả lời.** Đó là tổng toàn bộ số ngày đã lưu trên nhóm đơn được yêu cầu, không phải phép phân bổ ngày theo tháng.

Không cần thêm điều kiện hoặc câu rào đón vào mở bài.

### 2. Từ Excel đến hàm tổng hợp — Giữ được

**Câu gốc:** “Trong SQL, **hàm tổng hợp** tính một giá trị từ nhiều dòng.” (dòng 48).

Chuyển ý Excel → SQL rõ và khái niệm xuất hiện ngay cạnh ví dụ. Bảng đối chiếu đủ năm việc cần làm, không mặc định `COUNT` của Excel đếm được mã chữ. `COUNTA(A2:A10)` có lời giải “đếm các mã đã điền”; hình dùng đúng chín mã không thiếu. Câu nhắc `SUM` vẫn cộng dòng bị lọc ngăn người học áp dụng nhầm hình trên sheet gốc; `SUBTOTAL` chỉ được nêu tên cùng công dụng, không trở thành điều kiện để học tiếp SQL.

Đánh dấu `C2`, `C10`, `C11` khớp chú thích hai đầu vùng và ô tổng. Chín số trong hình cộng được `16`, ít nhất `1`, nhiều nhất `3`; đây là kiểm tính nhất quán của dữ liệu được in trong bài, không phải xác nhận dữ liệu nguồn.

- **Vì sao kết quả từ nhiều đơn chỉ còn một dòng? — Đã trả lời.** Bài giới hạn truy vấn không chia nhóm và nói một dòng cho cả phạm vi.
- **Dấu `*` ở `COUNT(*)` có làm lấy mọi cột không? — Đã trả lời.** Dòng 58 đối chiếu trực tiếp với `SELECT *` đã học ở 1.6.
- **Mỗi hàm dùng để làm gì? — Đã trả lời.** Bảng gắn từng hàm với đếm, cộng, bình quân, ít nhất và nhiều nhất.

### 3. Mẫu số, giá trị thiếu và phạm vi rỗng — Giữ được

**Câu gốc:** “`COUNT(cột)` chỉ đếm các dòng mà cột đó khác `NULL`.” (dòng 62); “mẫu số là số giá trị khác `NULL`, không phải số dòng” (dòng 73).

Ví dụ email nối được từ bài 2.5: hai hồ sơ thiếu email, chuỗi rỗng hoặc dấu cách khác `NULL`, có giá trị chưa đồng nghĩa email hợp lệ. Kết quả `48`/`46` phù hợp hồ sơ công ty và hai hồ sơ đã nêu ở bài trước. Không cần dạy lại `IS NULL`.

Ví dụ `2`, `NULL`, `0` đủ làm rõ mẫu số: hai giá trị tham gia bình quân, tổng là `2`, bình quân là `1`. Bài còn phân biệt dữ liệu minh họa này với `SoNgay NOT NULL` của bảng mẫu. Mệnh đề `NOT NULL` và `decimal(4,1)` đã có nền ở bài 1.3.

Quy tắc phạm vi không có dòng được giới hạn rõ ở truy vấn không `GROUP BY`; bài phân biệt `COUNT = 0` với bốn hàm còn lại trả `NULL`, đồng thời nêu trường hợp có dòng nhưng toàn giá trị `NULL`. Không thấy cách diễn đạt nào hứa tự biết giá trị thiếu có nghĩa là số không.

- **Tại sao `COUNT(*)` khác `COUNT(Email)`? — Đã trả lời.** Một hàm đếm dòng, hàm kia bỏ dòng có email `NULL`.
- **Tại sao không thay `NULL` bằng `0` rồi tính bình quân cho tiện? — Đã trả lời.** Thay đổi mẫu số và ý nghĩa báo cáo; đây cũng nối được lời giải ở bài 2.5.
- **Không có đơn thì tại sao vẫn thấy một dòng? — Đã trả lời ở mức cần cho bài.** Đây là kết quả tổng hợp cho cả phạm vi, với các giá trị riêng của từng hàm; chưa cần học cơ chế chia nhóm.

### 4. Câu chính, kết quả và RunFlow — Giữ được

**Câu gốc:** “`CAST(... AS decimal(10,2))` chuyển kết quả bình quân sang số có hai chữ số thập phân, làm tròn ở kết quả” (dòng 81).

Người học đọc được kiểu số từ 1.3 và đã có một ví dụ chuyển kiểu bằng `CAST` ở 2.8. Ngay tại đây bài vẫn giải thích đủ mục đích và hai tham số, nên không buộc người chỉ theo prerequisite 2.5 phải tự bổ sung kiến thức của 2.8. Câu chính dùng `SoNgay` thập phân; làm tròn kết quả bình quân không bị lẫn với đổi dữ liệu từng đơn.

Kết quả năm cột khớp yêu cầu và được trả lời ngay cạnh câu lệnh. Chín dòng của bước `WHERE` khớp chín đơn trong Excel. `16 / 9` làm tròn hai số lẻ là `1.78`, phù hợp kết quả được in. Phần kết quả nhắc giới hạn số đơn/số người/ngày thực nghỉ đúng chỗ dùng, có ví dụ cụ thể, không cần thêm một mục trả lời riêng.

RunFlow có ba bước đúng mạch học: nguồn `20` → lọc còn `9` → tổng hợp thành `1`. Phần giải thích phân biệt số dòng trên thẻ, bảng trích trong drawer và tổng thật; `+17 dòng` không bị hiểu là tổng dữ liệu chỉ có `3` hoặc `10` đơn. Các đoạn `detail` bắt đầu bằng đúng từ khóa và nêu số dòng. `query`, `focus` và câu SQL từng bước phù hợp nhau khi đọc nguồn. Lời nhắc thứ tự logic và thứ tự dòng chưa sắp xếp có phạm vi rõ.

- **Tại sao cần `CAST` ở kết quả này? — Đã trả lời.** Tin nhắn cần hai chữ số thập phân; `AVG` trên dữ liệu thập phân vẫn có phần lẻ, rồi mới làm tròn để trả báo cáo.
- **Vì sao số trên thẻ khác số dòng đang nhìn trong bảng chi tiết? — Đã trả lời.** Bài nói rõ thẻ trích ba dòng, drawer trích mười dòng và tổng vẫn là hai mươi.

HTML tĩnh có đủ nội dung các bảng và ba drawer. Trong năm khối `<pre class="sql-code">`, câu nhiều dòng giữ tab thật ở đầu dòng tiếp theo; câu chính không hiện hai ký tự `\` và `t` trong nội dung code đã trích từ HTML. Các phần câu truy vấn trong drawer cũng có tab thật. Điều này chỉ xác nhận ký tự sau build, chưa xác nhận độ rộng hiển thị bốn cột hoặc thao tác sao chép/dán trong trình duyệt.

### 5. Hay nhầm, Ứng dụng và ôn tập — Giữ được

**Câu gốc:** “Một người có thể có nhiều đơn” (dòng 183); “chuyển kết quả đã mất phần lẻ thì không lấy lại được” (dòng 185).

Ba lỗi nêu được hậu quả khác nhau: nhầm đơn với người, tính sai phạm vi, mất phần lẻ do đầu vào số nguyên. Ví dụ `AVG(CAST(cột_số_nguyên AS decimal(10,2)))` được trình bày là khuôn trong lời văn, không có nút sao chép một câu chưa đầy đủ. Nó phân biệt vị trí chuyển kiểu với `CAST(AVG(SoNgay) ...)` của tình huống; không thấy mâu thuẫn giữa hai đoạn.

Ba ý Ứng dụng đều đúng chủ đề và có mục đích: một dòng báo cáo, kiểm phần thiếu theo `NULL`, tìm mốc ngày. Không hứa kiểm xong `NULL` là dữ liệu hợp lệ. Ghi nhớ ngắn, các câu tự kiểm tra đặt đúng sau Ghi nhớ và trước Bài tập. Hai câu tự kiểm tra đánh vào mẫu số và phạm vi rỗng; mục tiêu chọn phạm vi còn được kiểm bằng bài tập 2. Không có yêu cầu phải thêm câu thứ ba cho bài truy vấn này trong quy ước hiện hành.

- **Tại sao chuyển sang thập phân sau `AVG(int)` vẫn không cứu được phần lẻ? — Đã trả lời.** Đoạn Hay nhầm nói kết quả đã mất phần lẻ trước bước chuyển; đề xuất chuyển đầu vào trước khi tính.
- **Dùng bài này vào công việc khác được gì? — Đã trả lời.** Các ý ứng dụng vẫn nằm trong khả năng của những hàm đã giải thích.

Chữ đậm chọn lọc ở khái niệm và lỗi; tên bảng/cột, kiểu, giá trị ví dụ và địa chỉ ô trong lời văn dùng code. Không phát hiện đoạn lặp có thể cắt mà vẫn làm rõ hơn cho người mới; phần nhắc lại ở Ghi nhớ/tự kiểm tra có mục đích ôn.

### 6. Ba bài tập và YAML — Giữ được; một ghi nhận biên tập nhỏ

Lời dẫn đã công bố bộ chấm so giá trị và vị trí cột, không kiểm alias hoặc bắt buộc cách viết. Vì vậy người học biết kết quả “đúng” không tự chứng minh đã dùng đúng hàm theo mục tiêu.

- **3-1-1:** chuyển từ toàn bộ hồ sơ sang trạng thái `Đang làm`, yêu cầu đồng thời hai phép đếm và cấm lọc mất email thiếu trước khi đếm. Đủ kiến thức từ ví dụ trong bài và `WHERE` ở 2.2; đáp án đọc được phù hợp đề.
- **3-1-2:** đổi sang tháng 8, vẫn giữ quy tắc cộng trọn đơn bắt đầu trong tháng. Năm cột được mô tả đủ; không làm tròn bình quân giúp đề tập trung vào tổng hợp. Điều kiện nhiều vế và khoảng ngày đã có ở 2.3. Đáp án có đúng năm hàm và phạm vi đề nêu khi đọc mã.
- **3-1-3:** áp dụng đúng phần phạm vi rỗng, yêu cầu giữ `NULL`, cấm chuỗi chữ `"NULL"` và không chia nhóm. Không có cú pháp mới phải đoán để làm đề.

Không câu ví dụ nào của riêng bài 3.1 trùng nguyên câu đáp án của một trong ba đề. Tôi chưa chạy các đáp án hoặc bộ chấm, nên không xác nhận kết quả thực thi hay khả năng chấp nhận các cách viết tương đương.

**Biên tập, ưu tiên thấp — Thụt lề SQL trong YAML chưa theo mục 2.4.** Ở đáp án `3-1-2`, dòng 34 tiếp danh sách `SELECT` và dòng 37 bắt đầu `AND` đang thẳng với mệnh đề chính; dòng 53 của `3-1-3` cũng tiếp danh sách `SELECT` mà chưa lùi một cấp. Quy ước yêu cầu dòng tiếp lùi bốn dấu cách, kể cả màn bài tập. Đây là lệch định dạng, không phải lỗi SQL hoặc nội dung đề. Do brief chốt không đổi bộ bài tập/đáp án trong lượt này, chỉ ghi nhận để tác giả quyết định ở lượt biên tập được phép; không đề nghị thay logic, kết quả hay mở rộng phạm vi sửa hiện tại.

## Ưu tiên và giới hạn

1. Không có finding nội dung buộc sửa trước khi dùng bài dựa trên các nguồn đã đọc.
2. Ghi nhận nhẹ: thụt lề các dòng tiếp trong hai đáp án YAML, để xử lý khi phạm vi cho phép; không chặn nội dung bài.
3. Cần tác giả giữ riêng bằng chứng chạy dữ liệu/bộ chấm và kiểm trình duyệt theo quy trình chung. Reviewer này không xác nhận thay các bước đó.

Tôi chỉ đọc file bằng PowerShell và đối chiếu HTML tĩnh. Không kết nối/chạy database, không đọc seed, `.env`, secret hoặc tài liệu SQL bên ngoài; không đọc báo cáo học viên gốc, ma trận, review cũ hay nhận xét reviewer khác. Không chạy test/build hoặc kiểm API để tránh tạo trạng thái hay vượt vai trò review được giao. Không có kết quả test hay “lỗi nền” nào được suy đoán. Chưa kiểm giao diện bằng trình duyệt, mở/đóng drawer, clipboard, dán vào editor hoặc SQL live. Không sửa file sản phẩm/test/docs và không commit; chỉ tạo báo cáo này.

## Nguồn đối chiếu

- `temp/review/2026-10-24-student-update/brief.md`: vai trò, phạm vi và các giới hạn của lượt độc lập.
- `AGENTS.md`; `docs/quy-uoc.md` (nhất là 2.1–2.4, 3, 4.5); `docs/lesson-template.md`.
- `docs/ho-so-cong-ty.md`: các mục dữ liệu nhân viên/đơn nghỉ, ghi nhận tình huống 3.1; đây là nguồn đối chiếu nội bộ, không phải bằng chứng reviewer đã chạy script.
- `src/content/lessons/1-1-database-la-gi.mdx`: mẫu chuẩn trình bày.
- Các bài trước đã đọc đầy đủ để xác định kiến thức nền: `1-3-bang-cot-kieu-du-lieu.mdx`, `1-6-cau-select-dau-tien.mdx`, `2-1-chon-cot-dat-ten-cot.mdx`, `2-2-where-loc-nhu-autofilter.mdx`, `2-3-and-or-in-between-like.mdx`, `2-5-null-o-trong.mdx`, `2-8-ham-ngay-tham-nien.mdx` trong `src/content/lessons/`.
- `src/content/lessons/3-1-count-sum-avg.mdx`; `src/content/exercises/3-1-count-sum-avg.yaml`.
- `dist/bai/3-1-count-sum-avg/index.html`: nội dung HTML, bảng/thẻ/drawer và ký tự thụt lề của bản build 25/10/2026 00:20:11; không được coi là kiểm tương tác trình duyệt.
