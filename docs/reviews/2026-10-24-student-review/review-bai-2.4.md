# Review độc lập bài 2.4 — Sắp xếp và lấy TOP

- Ngày: 24/10/2026.
- Công cụ/model: Codex, agent reviewer độc lập kế thừa model của phiên; không đổi model.
- Phạm vi: toàn bộ `src/content/lessons/2-4-sap-xep-va-top.mdx`, YAML tương ứng và HTML đã build của bài. Đọc đủ các bước/drawer `RunFlow`, không chỉ các thẻ tóm tắt.
- Vai người học: Business Consultant muốn chuyển sang BA hoặc PM; chỉ dùng kiến thức của bài và các bài trước đã đọc, không tự bổ sung kiến thức SQL ngoài khóa học.

## Kết luận

Không phát hiện finding cần sửa trong phạm vi đọc độc lập này. Bài đã giải nghĩa **tập kết quả**, phân biệt rõ đoạn `ORDER BY` chỉ để đọc với câu chạy đầy đủ, giải thích được thứ tự ưu tiên nhiều cột và cung cấp đủ kiến thức để làm cả ba đề. Kết luận này là đánh giá nội dung và đối chiếu nguồn/HTML, không phải xác nhận đã chạy SQL hoặc kiểm tương tác trình duyệt.

## Rà theo thứ tự bài

### 1. Tình huống và phạm vi — Giữ được

**Câu gốc:** “Phạm vi: bảng `NhanVien` hiện tại, chỉ lấy `TrangThai` bằng `Đang làm`, ở mọi phòng và không giới hạn năm vào làm.” (MDX dòng 24)

Người học biết rõ đối tượng cần lấy, thông tin phải trả và tiêu chí phá hòa. Câu kế tiếp giải thích “gần nhất” dựa vào `NgayVaoLam`, tránh tự suy từ mã hay ngày nhập. `Key` chuyển yêu cầu “năm hồ sơ” sang “tối đa năm” phù hợp giới hạn của `TOP` đã học ở 1.6. Nội dung khớp mục 7 của hồ sơ công ty.

**Tự hỏi:** Vì sao người vào làm năm 2025 vẫn có thể xuất hiện trong danh sách gần nhất? **Bài đã trả lời:** không giới hạn năm; phần trả lời tình huống còn chỉ trực tiếp `NV044` để khép lại điểm này.

**Đề xuất:** Giữ.

### 2. Từ Sort đến ORDER BY nhiều cột — Giữ được

**Câu gốc:** “Khi có nhiều cột, SQL Server xét từ trái sang phải: chỉ khi cột trước bằng nhau mới xét cột tiếp theo.” (dòng 36)

Đoạn Excel dẫn sang SQL rõ ràng; `ORDER BY`, `ASC`, `DESC` được định nghĩa và in đậm ở lần giới thiệu. Bài nêu vị trí mệnh đề khi có hoặc không có `WHERE`, hướng của từng cột và hướng mặc định. Người học không phải tự suy rằng một `DESC` áp dụng cho cả danh sách.

Đoạn `ORDER BY MaPB ASC, NgayVaoLam DESC, MaNV ASC` có lời báo trước “chưa phải câu lệnh đầy đủ để chạy”, tiêu đề “chỉ để đọc” và `copy={false}`. HTML tương ứng không có nút sao chép cho đoạn này. Không còn điểm dễ khiến học viên chạy riêng mệnh đề rồi gặp lỗi.

**Câu gốc:** “`NV029` thuộc `IT` vẫn đứng trước `NV047` thuộc `NS`, dù ngày vào làm cũ hơn.” (dòng 40)

Bốn dòng minh họa đúng ý ưu tiên phòng trước ngày: ba dòng `IT` xếp ngày giảm dần, sau đó mới tới `NS`. Các ô `C4`, `D4`, `C5`, `D5` trỏ đúng hai dòng được giải thích; `numeric` bao phủ cả bốn ô ngày. Bài gọi rõ đây là hình Excel thu gọn, không khiến người học tưởng đó là toàn bộ kết quả truy vấn.

**Tự hỏi:** Vì sao ngày mới hơn lại đứng sau ngày cũ hơn? **Bài đã trả lời:** ngày chỉ được xét trong cùng phòng, vì `MaPB` được viết trước.

**Đề xuất:** Giữ cả giải thích và hình; không cần thêm một bảng đối chiếu cùng ý.

### 3. Chốt thứ tự và giữ nguyên bảng nguồn — Giữ được

**Câu gốc:** “`MaNV` là khóa chính không trùng của bộ mẫu, nên đủ để chốt thứ tự khi dữ liệu không đổi.” (dòng 75)

Bài giải thích được lý do cần cột thứ hai, liên hệ đúng kiến thức khóa chính đã học và đặt điều kiện “khi dữ liệu không đổi”. Không hứa rằng lần chạy sau vẫn ra cùng danh sách khi dữ liệu thay đổi. Đoạn kế tiếp phân biệt thứ tự dòng kết quả, vị trí cột sau `SELECT` và dữ liệu nguồn, nối đúng điểm đã học ở 2.1.

**Tự hỏi:** Tại sao phải giữ `MaNV ASC` khi đã có ngày? **Bài đã trả lời:** các dòng cùng ngày chưa có thứ tự giữa chúng; mã không trùng phân định thứ tự và cả người được lấy ở ranh giới `TOP`.

**Tự hỏi:** Sắp xếp một lần có lưu thứ tự đó vào bảng không? **Bài đã trả lời:** không; mỗi câu cần thứ tự phải giữ `ORDER BY`.

**Đề xuất:** Giữ.

### 4. Kết hợp WHERE và TOP — Giữ được

**Câu gốc:** “`TOP (5)` viết ngay sau `SELECT`, lấy tối đa năm dòng từ tập kết quả, tức các dòng câu truy vấn trả về; nếu chỉ có ba dòng đạt điều kiện thì chỉ trả ba.” (dòng 81)

“Tập kết quả” được giải nghĩa ngay tại chỗ, không yêu cầu người mới biết sẵn thuật ngữ. Bài phân biệt cú pháp viết `TOP` sau `SELECT` với ý nghĩa lọc rồi sắp rồi giới hạn. Câu “không phải năm dòng cho từng phòng” chặn cách hiểu sai phổ biến mà không đưa thêm kỹ thuật ngoài phạm vi.

Ví dụ giả định `A02`/`A03` làm rõ ảnh hưởng của cột phá hòa tới việc chọn dòng, đồng thời ghi rõ không phải hồ sơ của bộ mẫu. Đoạn này bổ sung hệ quả lựa chọn cho ý thứ tự ở trên, không chỉ nhắc lại một định nghĩa. Nhắc `TOP` chưa sắp ở 1.6 là cầu nối đúng chỗ.

Alias đã được định nghĩa ở 2.1; hạn chế dùng alias trong `WHERE` đã được giải thích ở 2.2. Đoạn `ORDER BY` dùng alias nêu cả điều kiện áp dụng “trong câu phía dưới” và lý do theo thứ tự logic; không cần người học tự đoán.

**Tự hỏi:** Vì sao `TOP (5)` có thể chỉ trả ba dòng? **Bài đã trả lời:** chỉ có ba dòng đạt điều kiện thì không có đủ năm để lấy.

**Tự hỏi:** Vì sao có `TOP` vẫn phải sắp xếp? **Bài đã trả lời:** không có `ORDER BY` thì không bảo đảm chọn hồ sơ nào; mã lớn cũng không thay cho ngày mới.

**Tự hỏi:** Tại sao `ORDER BY` dùng được alias còn `WHERE` không dùng được? **Bài đã trả lời:** vị trí trước/sau `SELECT` trong thứ tự logic, có đối chiếu trực tiếp bài 2.2.

**Đề xuất:** Giữ. Đoạn “Ở bài này chỉ cần…” đã giới hạn hợp lý các ý về `NULL`, sắp chữ và hiệu năng.

### 5. Câu lệnh, kết quả và lời đáp tình huống — Giữ được

**Câu gốc:** “Bạn có thể trả lời chị Hạnh: năm hồ sơ phù hợp theo thứ tự là `NV048`, `NV047`, `NV046`, `NV045`, `NV044`.” (dòng 137)

Câu lệnh chọn đúng bốn cột, alias và vị trí cột đầu bài yêu cầu; có điều kiện trạng thái, ngày giảm dần, mã tăng dần và giới hạn tối đa năm. Năm dòng kết quả và lời đáp thống nhất với nhau, đồng thời khớp danh sách/ngày trong hồ sơ công ty. Hai dòng đánh dấu `[1, 5]` đúng đầu/cuối danh sách mà lời văn chỉ ra. Không cần tìm một mục trả lời riêng để biết kết quả dùng vào việc gì.

Câu về dữ liệu cập nhật làm kết quả thay đổi là giới hạn thực tế, phù hợp mục tiêu phân biệt tiêu chí truy vấn với bản chốt báo cáo. Giá trị dẫn chứng, tên cột và từ khóa trong lời giải có kiểu code.

Trong HTML, câu chính và các câu nhiều cột ở drawer giữ tab thật trước `MaPB`; không hiện hai ký tự `\` và `t`. Thuộc tính `data-copy` của nút câu chính cũng chứa tab thật. Đây chỉ là kiểm dữ liệu HTML, chưa phải thử sao chép/dán trong trình duyệt hoặc xác nhận độ rộng bốn cột bằng mắt.

**Tự hỏi:** Danh sách này có tự cố định cho lần gửi sau không? **Bài đã trả lời:** không; câu giữ tiêu chí, kết quả tùy dữ liệu lúc chạy.

**Đề xuất:** Giữ. Số liệu live chưa được xác minh trong review này.

### 6. RunFlow — Giữ được

**Câu gốc:** “Sơ đồ là thứ tự xử lý logic, không phải cách SQL Server quét hay sắp dữ liệu vật lý.” (dòng 143)

Đã đọc đủ năm bước `FROM → WHERE → SELECT → ORDER BY → TOP`, gồm câu lệnh, `meaning`, `detail`, cột, dòng, tổng và phần liên hệ Excel. Mỗi lời giải `meaning` bắt đầu từ từ khóa của bước. Các tổng `48 → 45 → 45 → 45 → 5` khớp phạm vi hồ sơ công ty và diễn giải của bài. `SELECT` nêu riêng rằng `TOP` dù viết trên cùng dòng vẫn chưa giới hạn tại bước này; tránh hiểu thứ tự viết thành thứ tự xử lý.

Bước `FROM` dùng `NV020` làm đối chứng đã nghỉ, `WHERE` nêu đã loại hồ sơ đó. Các bảng ít dòng được gọi là hình trích; riêng `ORDER BY` có mười dòng xếp ngày giảm dần và `TOP` giữ năm dòng đầu đúng với bảng kết quả chính. `query`, `focus` và các câu SQL nhiều cột thống nhất về cấu trúc và thụt lề ở nguồn/HTML đã đọc.

**Tự hỏi:** Sắp xếp có làm giảm số dòng không, và vì sao `TOP` chưa chạy ở thẻ `SELECT`? **Bài đã trả lời:** sắp giữ `45` hồ sơ, giới hạn thuộc bước logic cuối; drawer `SELECT` giải thích trực tiếp.

**Đề xuất:** Giữ; không diễn giải sơ đồ thành cách SQL Server đọc vật lý.

### 7. Hay nhầm, Ứng dụng và Ghi nhớ — Giữ được

Ba lỗi có ví dụ/hậu quả cụ thể: hướng riêng của từng cột, sắp toàn chuỗi họ tên và giới hạn nhầm tập trước khi lọc. Ý về họ tên nối được với bài 2.3, nơi đã phân biệt mẫu chữ với ý nghĩa họ/tên; không đòi kỹ thuật tách tên mới để làm bài.

Ba ứng dụng đều dùng được kiến thức của bài cho mục đích cụ thể: hồ sơ gần nhất, thứ tự đối chiếu báo cáo, hồ sơ lâu năm. Không hứa về thay đổi dữ liệu hoặc kết luận nghiệp vụ tự động. `Memo` ôn đúng nhiều cột, hướng, thứ tự logic và phá hòa; sự lặp ở đây thuộc phạm vi ôn tập được phép.

Bài 2.4 không có khối tự kiểm tra, nhưng không thuộc nhóm bài khái niệm `noExercises` hoặc các bài 2.3/2.7/2.8 được template yêu cầu ít nhất ba câu. Không coi đây là thiếu sót bắt buộc; ba bài thực hành bên dưới phủ mục tiêu truy vấn.

**Tự hỏi:** Kiến thức này phục vụ việc gì ngoài ví dụ năm hồ sơ? **Bài đã trả lời:** có ba công việc cụ thể ở Ứng dụng, gồm cả thứ tự ngày tăng dần.

**Đề xuất:** Giữ; không cần thêm rào đón hoặc câu tự kiểm tra chỉ để đủ số lượng.

### 8. Cả ba bài tập YAML — Giữ được, đủ tiền đề đã dạy

**Câu gốc:** “Ba bài đều chấm thứ tự dòng và vị trí cột; trả đủ dữ liệu nhưng xếp sai vẫn bị chấm sai.” (dòng 512)

Mỗi đề xác định phạm vi, cột theo vị trí, hướng từng tiêu chí và cách xử lý trùng ngày. Cả ba cấu hình đều có `ordered: true`, nhất quán với lời dẫn. Không thấy đề phải tự suy thêm trạng thái, giới hạn năm hoặc thứ tự cột.

| Đề | Kiến thức dùng từ bài hiện tại/bài trước | Đối chiếu YAML |
|---|---|---|
| `2-4-1`: toàn bộ hồ sơ `KT` hoặc `NS`, xếp phòng/ngày/mã tăng dần | `IN` ở 2.3; chọn bốn cột ở 2.1; ưu tiên trái sang phải và `ASC` ở 2.4 | Đáp án giữ đủ phạm vi, không có `TOP`, không thêm trạng thái/ngày; thứ tự cột và ba tiêu chí khớp đề. |
| `2-4-2`: tối đa ba hồ sơ `IT` đang làm có ngày gần nhất | `AND`, nháy chuỗi và Unicode ở 2.2–2.3; `TOP`, ngày `DESC`, mã `ASC` ở 2.4 | Đáp án có đúng hai điều kiện, giới hạn ba, ba cột và tiêu chí phá hòa; không thêm giới hạn năm. |
| `2-4-3`: tối đa bốn hồ sơ `KT` đang làm có ngày sớm nhất | Cùng các tiền đề trên; `ASC` được định nghĩa là ngày cũ tới mới và có ứng dụng hồ sơ lâu năm | Đáp án có đúng hai điều kiện, giới hạn bốn, ba cột và ngày/mã tăng dần; không thêm giới hạn năm. |

Không cần kiến thức ngoài khóa học để đi từ lời đề tới từng câu lệnh. Ba đáp án khác câu ví dụ chính về phạm vi, cột hoặc số dòng; không thấy bài giảng đưa sẵn nguyên đáp án nào của ba đề.

**Tự hỏi:** Có đủ kiến thức để làm cả đề ngày sớm nhất, dù câu chính dùng ngày gần nhất không? **Bài đã trả lời:** `ASC` là cũ tới mới; ứng dụng và ghi nhớ cũng nêu chiều tăng/giảm. Người học chỉ đổi hướng theo yêu cầu, không cần kỹ thuật mới.

**Đề xuất:** Giữ. Đây là đối chiếu tĩnh đề/đáp án; chưa xác minh việc chấm live.

## Ưu tiên và nguồn đối chiếu

Không có mục sửa bắt buộc hoặc mục cần làm rõ được xác định từ bằng chứng đã đọc; không đề nghị sửa để tạo finding. Các việc cần người viết xác minh bằng công cụ vẫn nằm ngoài review độc lập: kết quả SQL live, bộ chấm và hành vi trình duyệt.

Đã đọc/đối chiếu:

- `AGENTS.md`.
- `docs/quy-uoc.md`, đặc biệt nội dung/định dạng ở mục 1–3 và review độc lập ở mục 4.5.
- `docs/lesson-template.md`.
- `docs/ho-so-cong-ty.md`, gồm phạm vi hồ sơ, ngày vào làm và sự việc bài 2.4.
- Mẫu đã duyệt `src/content/lessons/1-1-database-la-gi.mdx`.
- Đầy đủ bài 1.6, 2.1, 2.2, 2.3 trong `src/content/lessons/`.
- Đầy đủ MDX/YAML bài 2.4 và `dist/bai/2-4-sap-xep-va-top/index.html`.

Giới hạn thực tế: chỉ đọc nguồn và HTML; không mở/kiểm tương tác trình duyệt, không thao tác nút Sao chép, không chạy SQL/database hoặc bộ chấm. Không đọc `database/HRM_Demo.sql`, `.env`, secret, review cũ, báo cáo kiểm thử học viên gốc, ma trận tác giả hay nhận xét reviewer khác; không tra tài liệu SQL ngoài. Chỉ tạo report này, không sửa sản phẩm/test/docs/seed và không commit.
