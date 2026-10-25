# Review độc lập bài 2.7 — Hàm chuỗi và tiếng Việt có dấu

Hoàn tất: 25/10/2026. Công cụ: đọc file bằng PowerShell/rg, đối chiếu HTML đã build; reviewer kế thừa model của phiên. Vai học thử: Business Consultant khó tính, học SQL Server để đủ hiểu và phản biện yêu cầu dữ liệu.

## Kết luận

Bài giữ đủ tám hàm, phân biệt được giữ Unicode với luật so sánh và có kiến thức cần thiết để làm ba đề. Mạch gộp Excel/SQL, phạm vi tình huống, phần trả lời và ba câu tự kiểm tra đều đúng khung. Không thấy lỗi nội dung lớn qua việc đọc độc lập. Chỉ còn một điểm nhỏ nên làm rõ: cách nêu `UPPER` với `NULL`. Đã đối chiếu lại hai summary trên bản build mới trong lượt review; nháy SQL hiện giữ đúng.

Không chạy SQL hoặc tương tác trình duyệt; các nhận xét dưới đây không xác nhận số liệu live, thao tác sao chép, drawer, editor hay bộ chấm đã hoạt động đúng.

## Rà theo thứ tự bài

### 1. Tình huống và mục tiêu — Giữ được

**Câu gốc:** “lấy toàn bộ hồ sơ có `MaPB = 'IT'` đang lưu, không thêm điều kiện trạng thái hay ngày vào làm.”

Phạm vi rõ, khớp hồ sơ công ty và không làm người học hiểu “đang mang mã phòng” thành điều kiện đang làm việc. Cần nguyên họ tên để đối chiếu nên không cắt phần tên gọi. `Key` chốt đúng công việc. Mốc tháng 10/2026, nhân vật và nhãn chỉ dùng trong kết quả đều nhất quán.

**Tự hỏi:** Vì sao cần cả mã lẫn họ tên? Bài đã trả lời: tạo thông tin đối chiếu rõ ràng cho từng dòng ký nhận. Có phải danh sách những người đã ký? Đã trả lời ở lời giải cuối phần chính: việc ai đã ký cần được ghi nhận riêng.

### 2. Cắt, ghép và trình bày chuỗi — Giữ được; một điểm cần làm rõ nhỏ

**Các đoạn giữ được:** định nghĩa chuỗi bằng `NV007` và `Bùi Thanh Sơn`; Excel `CONCAT` chuyển sang hàm trong `SELECT`; bảng `LEFT`, `RIGHT`, `SUBSTRING`, `LEN`; giải thích `CONCAT`, `TRIM`, `UPPER`, `LOWER` và hai ví dụ trực tiếp.

Tám hàm đều còn đủ nghĩa để chọn và sử dụng: `SUBSTRING` có vị trí bắt đầu và số ký tự, nhấn mạnh đếm từ `1`; `LEN` phân biệt dấu cách cuối với Excel; `CONCAT` nêu dấu phân cách, chuyển kiểu ngầm và quy tắc `NULL`; `TRIM` nêu đúng giới hạn ở hai đầu; `UPPER`/`LOWER` không bị hiểu thành bỏ dấu. Việc giữ `007` là chuỗi nối được với kiểu dữ liệu và mã định danh ở bài 1.3.

**TRIM:** câu “Ký hiệu `␠` chỉ dùng trong chú giải, không phải ký tự của kết quả” đã giải quyết sự khác nhau giữa cách đánh dấu để đọc và giá trị thực. MDX và HTML đều giữ giá trị thật `Kế  toán`, số `8`, cùng SQL có hai dấu cách giữa từ. Không cần thay kết quả bằng ký hiệu `␠`. Chưa xác nhận cách khoảng trắng hiển thị trực quan trong trình duyệt.

**Câu cần làm rõ:** “`LOWER` nhận `NULL` thì vẫn trả `NULL`.” — [MDX dòng 70](<E:/Projects/SQL Lession/src/content/lessons/2-7-ham-chuoi-tieng-viet.mdx:70>).

Đề `2-7-3` yêu cầu đổi email thành chữ hoa, kể cả email `NULL`. Bài nói rõ trường hợp này cho `LOWER`, còn người mới phải suy sang `UPPER`; bài 2.5 cũng đã cho thấy không thể mặc định mọi hàm xử lý `NULL` giống nhau. Đây là khoảng hở nhỏ, không làm đề thiếu toàn bộ cách giải.

**Đề xuất:** đổi ngay câu đang có thành “`UPPER` và `LOWER` nhận `NULL` thì vẫn trả `NULL`.” Không cần thêm ví dụ hoặc đưa nguyên đáp án đề vào bài.

**Tự hỏi:** Vì sao không đổi `007` thành số? Đã trả lời: mất số `0` đầu và đây là mã nhận diện. Ghép được nhãn có chứng minh dữ liệu đầy đủ? Đã trả lời bằng quy tắc `CONCAT` và kết quả `[]`. TRIM có làm sạch toàn bộ dữ liệu? Đã trả lời bằng giới hạn khoảng trắng và ví dụ hai dấu cách bên trong.

### 3. Unicode, `N` và `COLLATE` — Giữ được

**Câu gốc:** “`N` giữ ký tự bạn viết; nó không quyết định so sánh có phân biệt dấu hay không.”

Phần này giải thích Unicode ngay khi dùng, nối được với `nvarchar` ở bài 1.3, phân biệt chuỗi tự viết với tên cột và chỉ ra mất ký tự có thể xảy ra trước khi dùng. `CI`, `AS`, `AI` đều được giải nghĩa cạnh tình huống. Câu tra cứu `Vietnamese_CI_AI` đi từ `LIKE` đã học ở bài 2.3, đồng thời nói rõ không đổi dữ liệu, không đổi collation cả database và cần xác nhận hồ sơ bằng mã. Không thấy yêu cầu người mới phải tự bổ sung lý thuyết ngoài bài mới làm được đề 2.

**Tự hỏi:** Có cột `nvarchar` rồi vì sao còn cần `N`? Đã trả lời: chuỗi đầu vào có thể hỏng trước khi đến cột. Vì sao `UPPER` không thay cho tìm không dấu? Đã trả lời: đổi hoa thường vẫn giữ dấu, còn `COLLATE` quyết định luật so sánh. Vì sao không dùng tìm rộng để xác nhận đúng người ngay? Đã trả lời: có thể nhận nhiều cách viết.

### 4. Câu lệnh cho tình huống và RunFlow — Giữ được

Câu SQL lấy hai cột đúng yêu cầu, không tự thêm lọc trạng thái/ngày, có mã tăng dần và ghép toàn bộ họ tên. Kết quả cùng lời trả lời `10` hồ sơ khớp hồ sơ công ty; đây chỉ là đối chiếu tài liệu, chưa xác minh trên database.

RunFlow giữ đúng mạch logic `FROM → WHERE → SELECT → ORDER BY`; mỗi `meaning` bắt đầu từ từ khóa, chi tiết nêu số dòng/cột và chuyển đổi cụ thể. Các bảng trích được nói rõ là trích, thứ tự ở bước chưa sắp xếp được lưu ý. Dòng `NV007` được đánh dấu ở kết quả đúng lời đối chiếu với Excel. Không có các khối Messages/Ssms/Erd/LineMap cần rà trong bài này.

Trong HTML, các câu SQL chính có tab thật ở đầu dòng tiếp theo; không thấy hai ký tự `\\t` lộ ra ở các câu đã trích kiểm. Điều này chưa chứng minh tab hiển thị rộng bốn cột hoặc nút Sao chép hoạt động đúng.

**Tự hỏi:** Vì sao lọc trước rồi mới tạo nhãn trong sơ đồ? Đã trả lời bằng thứ tự xử lý logic và số dòng còn lại. Có sửa họ tên nguồn không? Đã trả lời rõ: chỉ đổi giá trị trả về.

### 5. Hay nhầm, Ứng dụng, Ghi nhớ — Giữ được

Hay nhầm nêu lỗi và hậu quả cụ thể: mất số đầu của mã, dùng đổi hoa để tìm không dấu, coi TRIM là làm sạch toàn bộ, cắt từ cuối để xác định tên gọi. Ứng dụng đúng chủ đề, có mục đích và điều kiện, không thành danh sách lời khuyên chung. Memo giữ các khác biệt quan trọng với Excel. Khái niệm được bôi đậm chọn lọc; dẫn chứng và tên cột trong lời văn dùng code phù hợp.

Không đề nghị cắt một hàm để giảm tải: tám hàm là mục tiêu của bài và được dạy theo nhóm ngắn. `minutes: 28` có cơ sở hơn một thời lượng nhập môn cố định cho lượng kiến thức này, nhưng chưa học bấm giờ để xác nhận con số. Bốn nhịp phần chính, ví dụ ngắn và ranh giới ở đoạn “Ở bài này chỉ cần…” giúp kiểm soát độ sâu.

### 6. Tự kiểm tra — Giữ được

Có đúng ba câu, nằm sau Memo và trước Bài tập. Đáp án không bổ sung lý thuyết mới. Các câu kiểm TRIM, `N` so với `COLLATE`, và ý nghĩa `NULL` khi ghép; đề 1 tiếp tục kiểm kỹ năng cắt chuỗi. Không cần thêm câu tự kiểm tra chỉ để tăng số lượng.

Hai summary có chuỗi SQL ở [dòng 453](<E:/Projects/SQL Lession/src/content/lessons/2-7-ham-chuoi-tieng-viet.mdx:453>) và [dòng 467](<E:/Projects/SQL Lession/src/content/lessons/2-7-ham-chuoi-tieng-viet.mdx:467>) dùng biểu thức chuỗi JSX. HTML hiện tại chứa `N&#39;  Kế  toán  &#39;` và `CONCAT(N&#39;[&#39;, NULL, N&#39;]&#39;)`; giải mã entity là nháy đơn SQL thẳng, không còn nháy cong. Đây là đối chiếu HTML, chưa phải kiểm tương tác mở câu hỏi hoặc sao chép bằng trình duyệt.

### 7. Ba đề YAML — Giữ được; liên quan điểm `UPPER` ở mục 2

| Đề | Kiến thức đã có để làm | Nhận xét |
|---|---|---|
| `2-7-1` | `LEFT`, `SUBSTRING`, vị trí từ `1`, giữ chuỗi mã; `WHERE`, `ORDER BY` đã học | Phạm vi KT, ba cột theo vị trí, giữ số `0` và thứ tự dòng đều rõ. |
| `2-7-2` | `LEN`, `COLLATE Vietnamese_CI_AI`, mẫu đầu chuỗi `%`, giữ nguyên cột `HoTen` | Không lẫn tìm không dấu với xóa dấu trong kết quả. |
| `2-7-3` | `UPPER`, `CONCAT` với dấu phân cách và `NULL`; giữ cột nguồn từ bài 2.5 | Rõ phạm vi VH, không bỏ email thiếu, cột gốc vẫn `NULL`; nên nói rõ thêm `UPPER(NULL)` bằng sửa câu ở mục 2. |

Các prompt không buộc người học dùng kiến thức tương lai; ba đáp án YAML phù hợp yêu cầu khi đối chiếu bằng đọc. Cả ba có `ordered: true`, `columns` đúng thứ tự prompt và lời dẫn Bài tập phản ánh đúng điều được chấm. Không chạy đáp án, không khẳng định bộ chấm hoặc dữ liệu thực tế đạt.

## Ưu tiên

1. **Làm rõ nhỏ:** sửa câu `LOWER` nhận `NULL` thành cả `UPPER` và `LOWER`, để đề 3 không cần suy thêm về hàm chưa được nêu quy tắc này.

Không có đề xuất tách bài, đổi URL, đổi seed/API/model hay khôi phục khung Excel/SQL cũ.

## Nguồn đối chiếu và giới hạn

Đã đọc brief, `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`; mẫu bài 1.1; bài trước 1.3, 2.3, 2.5; đầy đủ MDX/YAML bài 2.7 và các đoạn liên quan trong `dist/bai/2-7-ham-chuoi-tieng-viet/index.html`.

Không đọc seed `database/HRM_Demo.sql`, `.env`/secret, các review cũ hoặc review bài khác; không tra tài liệu ngoài, kết nối database, chạy SQL, sửa file sản phẩm/test/docs hay commit. Chỉ tạo report này. Không chạy test/build trong vai reviewer; chưa xác minh độc lập số liệu live, tương tác browser, drawer/highlight, bấm mở tự kiểm tra, copy/paste vào editor và kết quả bộ chấm.
