# Review độc lập bài 2.9 — CASE WHEN

- Ngày review: 25/10/2026.
- Vai trò: Business Consultant khó tính, muốn học để chuyển sang BA hoặc PM; đọc như người học chỉ có kiến thức đã dạy trong khóa.
- Công cụ: Codex, kế thừa model của phiên; đọc nguồn bằng PowerShell và đối chiếu HTML tĩnh. Không đổi model.
- Phạm vi: toàn bộ `src/content/lessons/2-9-case-when-ham-if.mdx`, toàn bộ YAML cùng slug và HTML đã có của bài. Chỉ ghi báo cáo này, không sửa sản phẩm.

## Kết luận

Không phát hiện lỗi nội dung cần sửa hoặc khoảng trống kiến thức khiến người học không làm được ba đề. Bài giải thích đủ `CASE`, thứ tự nhánh, ranh giới đủ năm và việc bỏ `ELSE`; các giới hạn của bản chốt và dữ liệu nguồn được nói đúng chỗ. Có một điểm biên tập ưu tiên thấp ở định dạng SQL trong `answer` của YAML, nêu ở mục 6.

## Rà theo thứ tự bài

### 1. Tình huống và phạm vi — Giữ được

**Câu gốc:** “Giả định dữ liệu đang mở là **bản chốt**, tức bản được lưu tại ngày `2026-10-21` để đối chiếu về sau…” (MDX dòng 24).

Yêu cầu nói rõ người cần danh sách, bốn cột, ba ranh giới và thứ tự mã. Bản chốt được giải nghĩa ngay; điều kiện trạng thái đi cùng điều kiện ngày vào làm, nên không vô tình xếp hồ sơ chưa bắt đầu làm vào nhóm dưới một năm. Câu về trạng thái hiện tại tránh hứa rằng chỉ đổi ngày là dựng được danh sách quá khứ. Không cần kéo kiến thức lịch sử ở bài 6.6 vào sâu hơn.

**Tự hỏi:** Tại sao đã có ngày chốt mà vẫn phải nói bản chốt? **Bài đã trả lời:** ngày trong phép tính không tự khôi phục trạng thái ở thời điểm cũ.

### 2. Excel, biểu thức CASE và ví dụ nhỏ — Giữ được

**Câu gốc:** “Trong SQL Server, **`CASE` là một biểu thức**: một đoạn tính toán trả về một giá trị.” (dòng 41).

Nhịp từ công thức IF sang SQL rõ, không yêu cầu biết sẵn thuật ngữ biểu thức. `WHEN`, `THEN`, `END` được đọc bằng lời trước khi xem câu đầy đủ; ví dụ mã chức danh chỉ có hai dòng nên đủ nhỏ để lần theo. Bài 1.6 đã giải thích mã chức danh và bài 2.1 đã dạy `AS`, vì vậy việc dùng `MaCD`, `AS` không tạo bước nhảy kiến thức.

Hình Excel tự nhận là minh họa, nêu `EDATE(B2,36)` là mốc sau `36` tháng và đánh dấu đúng `C2`. Kết quả SQL đánh dấu `NV005`, khớp lời nói về `TP` nhận nhãn `Trưởng phòng`. Phần giải thích `Chức danh khác` ngăn hiểu đây là tên chức danh đầy đủ hoặc dấu hiệu thiếu dữ liệu.

**Tự hỏi:** Dùng `CASE` để làm gì, và tạo nhãn có làm mất dòng hoặc sửa dữ liệu không? **Bài đã trả lời:** tạo một giá trị/cột kết quả cho từng dòng; lọc vẫn là việc của `WHERE`, nguồn không đổi.

### 3. Ranh giới, thứ tự nhánh, ELSE và NULL — Giữ được

**Câu gốc:** “Đặt nhánh đã đủ `3` năm trước nhánh đã đủ `1` năm.” (dòng 67).

Ví dụ `NV025` đặt ngày vào làm, mốc đủ ba năm và ngày chốt cạnh nhau, giúp hiểu tại sao không lấy chênh lệch năm. Phần này nối đúng với bài 2.8, không cần người học tự suy ra cách dùng `DATEADD`. Ví dụ `NV003` giải thích được hậu quả cụ thể của việc đảo nhánh. Bảng ranh giới viết nhóm thứ hai là “chưa tới mốc `3` năm nhưng đã tới mốc `1` năm”, phù hợp cơ chế chọn nhánh đúng đầu tiên.

**Câu gốc:** “Ở yêu cầu này, `NgayVaoLam` có `NOT NULL` và đã lọc ngày không sau mốc chốt, nên phần còn lại chính là nhóm `Dưới 1 năm`.” (dòng 75).

Đây là điều kiện cần để `ELSE` có ý nghĩa nghiệp vụ; bài không biến `ELSE` thành nhóm chứa mọi dữ liệu bất thường. Đoạn bỏ `ELSE` trả `NULL` đủ để làm đề 3. Đoạn ngày thiếu phân biệt được `IS NULL` với so sánh ngày, nối với bài 2.5; không hứa bộ mẫu đang có ngày vào làm thiếu. Cảnh báo trộn chữ với số ngắn, không làm lệch trọng tâm. Đoạn “Ở bài này chỉ cần…” có và dẫn đúng phần tổng hợp, kiểm dữ liệu ở bài sau.

**Tự hỏi:** Vì sao phải xét nhánh ba năm trước? **Đã trả lời:** người đủ ba năm cũng đủ một năm, nhánh một năm đứng trước sẽ nhận họ.

**Tự hỏi:** Vì sao phần còn lại được gọi dưới một năm? **Đã trả lời:** ngày vào làm không thiếu, không ở tương lai trong phạm vi đã lọc.

**Tự hỏi:** Bỏ `ELSE` thì hồ sơ không khớp có bị loại không? **Đã trả lời khi đọc nối dòng 43 và 77:** hồ sơ vẫn có, giá trị của biểu thức là `NULL`.

### 4. Câu cho tình huống, kết quả và RunFlow — Giữ được

**Câu gốc:** “Kết quả trích `10` dòng đầu trong `45` hồ sơ đang làm đã chốt.” (dòng 164).

Câu chính dùng hai mốc `DATEADD`, nhánh đúng thứ tự, lấy đủ bốn cột, lọc đủ hai điều kiện và xếp `MaNV ASC`. Chuỗi ngày tám chữ số đã được bài 2.2 giải thích, nên không cần dạy lại ở đây. Hai dòng đánh dấu trong kết quả là `NV001`, `NV003`, đúng với phần chữ. Bài nói rõ hình trích và chỉ ra nhóm dưới một năm nằm ở phần sau, không khiến người học tưởng kết quả chỉ có hai nhóm.

Lời giải khép yêu cầu ngay cạnh kết quả: danh sách bốn cột, mã tăng dần và nhãn theo quy tắc chị Hạnh đã chọn. Không gán cho SQL quyền quyết định chính sách nhân sự.

RunFlow đủ bốn bước `FROM` → `WHERE` → `SELECT` → `ORDER BY`. Số dòng/cột và các phần trích nhất quán trong nguồn: `48` → `45`, `12` → `4`; ba hồ sơ đã nghỉ ở phần trích nguồn bị loại, bảy dòng trích qua `WHERE` được giữ qua `SELECT`. Bước sắp xếp nói rõ đổi phần trích sang mười dòng đầu, nên việc `NV025` không xuất hiện trên hình cuối không bị hiểu là bị loại. Lời dẫn phân biệt thứ tự logic với đọc vật lý; drawer có phần nghĩa bắt đầu bằng từ khóa tương ứng.

**Tự hỏi:** Tại sao vẫn 45 hồ sơ mà hình bước cuối đổi người? **Bài đã trả lời:** hình đổi sang trích mười dòng đầu sau sắp xếp; sắp xếp không bỏ dòng.

**Đối chiếu số liệu nội bộ:** các ngày/nhãn đang dùng và phạm vi `45` hồ sơ phù hợp hồ sơ công ty; `NV045`–`NV048` đều có ngày vào làm trong năm 2026. Đây là đối chiếu giữa tài liệu, không phải xác minh bằng thực thi database. Không phát hiện mâu thuẫn để kết luận số liệu sai.

**Đối chiếu bản build:** hai khối SQL chính và SQL kiểm bước giữ ký tự tab thật trong HTML, gồm hai cấp ở `WHEN`/`ELSE`; không thấy chuỗi hai ký tự `\\t` trong các khối `<pre>`. Nội dung về bản chốt, ba đề và các phần giải thích được đối chiếu với MDX hiện tại. Không suy ra đã kiểm chiều rộng bốn cột hoặc nút Sao chép từ kiểm tra HTML này.

### 5. Hay nhầm, Ứng dụng, Ghi nhớ và độ tải — Giữ được

Ba lỗi thường gặp nêu cách sai và hậu quả đúng trọng tâm. Việc nhắc lại `DATEDIFF(year)` có ví dụ sai cụ thể của `NV025`, đủ vai trò ôn lỗi, không cần mở thêm phần giảng.

Hai ý Ứng dụng đều dùng được từ kiến thức đã dạy: phân nhóm theo mốc và tạo cột đánh dấu phần thiếu. Cách dùng `WHEN Email IS NULL` đã có nền từ ví dụ `CASE` của bài này và `IS NULL` ở bài 2.5; không hứa sửa email nguồn.

Các khái niệm được in đậm chọn lọc, tên bảng/cột và giá trị dẫn chứng có code. Không thấy điểm cần cắt vì dài dòng hoặc phần ngoài phạm vi phải mở rộng. Thời lượng `22` phút có thể chấp nhận với hai ví dụ SQL, mốc ngày, bốn drawer và ba bài tập; chưa đo thời gian học thực tế.

Bài 2.9 không có khối tự kiểm tra riêng. Không coi đây là lỗi bắt buộc: template yêu cầu tối thiểu ba câu cho bài khái niệm và nêu riêng các bài truy vấn 2.3/2.7/2.8; bài 2.9 có ba bài tập kiểm được việc tạo nhãn, xếp nhánh và bỏ `ELSE`. Không đề nghị thêm câu chỉ để tăng số lượng.

### 6. YAML bài tập — Giữ được nội dung; một điểm Biên tập

**Giữ được:** ba đề đủ dữ kiện để viết câu và đều dùng kiến thức đã dạy. Đề 1 luyện hai nhãn theo mốc một năm; đề 2 đổi phạm vi sang toàn bộ hồ sơ `KD`, ghi rõ không dừng thời gian tại `NgayNghiViec`; đề 3 chủ đích giữ hồ sơ chưa đủ ba năm với `NULL`, không phải chuỗi chữ. Các đề nói rõ cột, vị trí, ngày bằng mốc được nhận và thứ tự dòng. `ordered: true`, danh sách cột và câu `answer` tương ứng với lời đề khi đọc nguồn; chưa xác minh bằng bộ chấm live.

**Biên tập — ưu tiên thấp: SQL trong các trường `answer` chưa có cấp thụt lề.**

- Vị trí: YAML dòng 17–24, 41–49, 66–72.
- Câu gốc, ví dụ đề 1: `CASE`, `WHEN DATEADD(...)`, `ELSE ...`, `END AS MocMotNam` cùng bắt đầu ở một cột trong chuỗi SQL sau khi bỏ phần thụt lề YAML.
- Lý do: quy ước mục 2.4 yêu cầu `CASE`/`END` lùi một cấp, `WHEN`/`ELSE` lùi hai cấp và dùng cùng cách ở SQL bài tập. Phần MDX đã làm đúng, nhưng nguồn đáp án chưa thống nhất. Đây là lệch định dạng, không phải lỗi cú pháp, kết quả hay lỗi chặn người học; không dùng mục này để kết luận màn bài tập đang hiển thị sai.
- Đề xuất: trong từng khối YAML `answer: |`, thêm bốn dấu cách cho `CASE`/`END`, tám dấu cách cho `WHEN`/`ELSE`, tính ngoài mức thụt lề YAML. Giữ nguyên token, điều kiện, nhãn và thứ tự dòng.

## Thứ tự ưu tiên

1. Không có finding nội dung mức cần chặn hoặc cần làm rõ để học tiếp.
2. Ưu tiên thấp: thống nhất thụt lề ba câu `answer` YAML với SQL trong bài.
3. Tác giả vẫn cần dựa vào quy trình kiểm máy và trình duyệt của mình; báo cáo này không thay kết quả chạy SQL, kiểm chấm hay kiểm copy.

## Nguồn đối chiếu và giới hạn

Đã đọc `AGENTS.md`, toàn bộ brief của lượt review, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1 và các bài liên quan 1.3, 1.6, 2.1, 2.2, 2.3, 2.4, 2.5, 2.7, 2.8. Phạm vi được review là bài 2.9 cùng YAML; các bài trước chỉ làm nền đối chiếu.

Đã đọc HTML có sẵn ở `dist/bai/2-9-case-when-ham-if/index.html` (thời gian ghi file công cụ báo: 25/10/2026 00:20:11), không build lại. Đối chiếu HTML là kiểm tĩnh, không phải kiểm tương tác trình duyệt. Chưa mở/đóng drawer bằng trình duyệt, thử bàn phím, bấm Sao chép, dán vào editor hay đo layout trên màn hình.

Không đọc seed/database script, `.env`, secret, review khác, báo cáo học viên gốc hay ma trận tác giả; không dùng tài liệu SQL ngoài khóa học. Không kết nối database, không chạy SQL hay test gọi database, không chạy bộ kiểm máy. Vì thế mọi số liệu thực thi, hành vi bộ chấm và lời khẳng định tác giả đã chạy số liệu vẫn **chưa được reviewer xác minh trực tiếp**. Không sửa sản phẩm/test/docs, không commit.
