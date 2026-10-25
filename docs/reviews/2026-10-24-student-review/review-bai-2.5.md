# Review độc lập bài 2.5 — NULL

- Ngày: 24/10/2026.
- Người review: agent Codex độc lập, kế thừa model của phiên, không đổi model.
- Phạm vi: toàn bộ `src/content/lessons/2-5-null-o-trong.mdx`, YAML tương ứng và HTML build của bài; học theo nội dung khóa học, không bổ sung bằng tài liệu SQL ngoài khóa học.
- Kết luận: bài đủ kiến thức để làm cả ba đề, mạch giải thích và tình huống khép kín. Không phát hiện lỗi kiến thức hoặc thiếu hướng dẫn cần chặn. Có một đề xuất cắt câu biên tập ở dưới; không cần mở rộng lý thuyết.

## Rà theo thứ tự bài

### 1. Mục tiêu và tình huống — Giữ được

**Câu gốc:** “Yêu cầu này chỉ xét trường hợp `Email` là `NULL`; không kiểm địa chỉ có đúng định dạng hay còn sử dụng được không.” (MDX dòng 24).

Phạm vi đủ rõ: toàn bộ hồ sơ, mọi phòng/trạng thái, giá trị email đang lưu; không đánh đồng thiếu giá trị với địa chỉ không liên hệ được. Nhãn, bốn cột, tiêu đề tiếng Việt và thứ tự đều xuất phát từ yêu cầu chị Hạnh, nên các thành phần trong câu chính đều có mục đích.

**Tại sao chỉ lọc `NULL` mà chưa tìm mọi email không dùng được?** Bài đã trả lời ngay ở phạm vi và nhắc hậu quả tại Hay nhầm 2. Không cần thêm quy tắc kiểm email vào bài này.

### 2. Excel, ý nghĩa `NULL` và bảng đối chiếu — Giữ được

**Câu gốc:** “Hình minh họa bản xuất thu gọn bốn hồ sơ, quy ước email `NULL` được xuất thành ô trống.” (dòng 32); “Ý nghĩa sau phải dựa vào quy ước dữ liệu, không suy từ chữ `NULL`.” (dòng 67).

Lời dẫn không hứa mọi ô Excel trống đều tương ứng với `NULL`. `D3`/`D4` đúng vị trí hai email thiếu trong hình; đây là bản minh họa trước lọc nên không cần số dòng nhảy cóc. Bảng bốn giá trị tách rõ `NULL`, số `0`, chuỗi không có ký tự và một dấu cách; câu về `'NULL'` chặn nhầm văn bản với giá trị thiếu.

Đối chiếu với ngày nghỉ việc cho thấy thiếu giá trị không tự là lỗi dữ liệu, đúng bài 1.3 và hồ sơ công ty. Phần `NOT NULL` chỉ nhắc đủ để nối ý với bài trước, không giảng lại toàn bộ kiểu dữ liệu.

**Tại sao nhìn trống chưa đủ để chọn điều kiện SQL?** Đã trả lời bằng giả định xuất file và bảng các giá trị khác nhau. **Tại sao `NgayNghiViec` thiếu vẫn có ý nghĩa?** Đã trả lời bằng quy ước bộ mẫu, không gán nguyên nhân cho SQL Server.

### 3. `IS NULL`, `IS NOT NULL` và `UNKNOWN` — Giữ được

**Câu gốc:** “So sánh `Email = NULL` hoặc `Email <> NULL` cho kết quả **`UNKNOWN`**: không đủ thông tin để kết luận đúng hay sai.” (dòng 86).

Thuật ngữ mới được giải thích ngay; câu tiếp nối về `WHERE` chỉ giữ điều kiện đúng giúp hiểu vì sao đổi `=` thành `<>` vẫn không giải quyết được. Khối `Email IS NOT NULL` ghi rõ chỉ là điều kiện đọc riêng, đặt sau `WHERE`, có `copy={false}` nên không đánh lừa người học thành câu chạy độc lập. Gợi ý `OR Email IS NULL` nối được với bài 2.3 mà không cần thêm một truy vấn ngoài tình huống.

**Tại sao không dùng dấu bằng như bài 2.2?** Đã trả lời bằng `UNKNOWN` và quy tắc giữ dòng của `WHERE`. **Để làm gì cần cả `IS NULL` lẫn `IS NOT NULL`?** Đã trả lời bằng hai nhóm có/không có giá trị, rồi vận dụng vào đề 1 và đề 2.

### 4. `COALESCE`, `ISNULL`, Unicode và phép cộng — Giữ được; một chỗ Cần cắt

**Câu gốc:** “Trong `COALESCE(Email, N'(chưa có)')`, hồ sơ có email giữ email, còn email `NULL` nhận nhãn `(chưa có)`.” (dòng 90).

Giải thích đủ cả nhánh giữ nguyên và nhánh thay thế, cả trường hợp chuỗi rỗng/dấu cách. Đây là kiến thức người học cần để làm đề 3, vì câu chính chỉ hiển thị hai dòng `NULL`. Quy tắc xét từ trái sang phải và tất cả đầu vào đều `NULL` cũng được phát biểu gọn.

**Câu gốc:** “nếu đầu vào đầu tiên là một cột, hàm giữ kiểu và độ dài của cột đó, nên nhãn thay có thể bị cắt hoặc mất dấu” (dòng 92).

Phần này giải thích được lý do bài chọn `COALESCE` cho cột `Email` dạng `varchar(100)` và nhãn Unicode; không dạy hai hàm thay thế nhau vô điều kiện. `N` và `nvarchar` đã có nền ở bài 1.3/2.2, nên đây không phải thuật ngữ xuất hiện không có điểm tựa. Chưa có căn cứ cần thêm bảng ưu tiên kiểu, độ dài hay ví dụ lỗi riêng vào bài.

**Cần cắt — ưu tiên thấp:** ở cuối dòng 92, bỏ vế “không suy ra mọi cách dùng hai hàm đều giống nhau”. Câu trước đã chỉ rõ khác biệt kiểu/độ dài và lý do giữ Unicode; vế cảnh báo chung không thêm một điều kiện người học có thể vận dụng. Giữ câu nối “Đây là **chuyển kiểu ngầm** như bài 1.3” và giữ giải thích cụ thể về `varchar`/`nvarchar`.

Khối phép cộng giải thích trước rằng `SELECT` không đọc bảng, rồi cho một dòng kết quả dễ đối chiếu. Lời giải “chưa biết số ngày không có nghĩa là không có ngày nào” khiến việc thay `NULL` bằng `0` là quyết định có ý nghĩa, không thành mẹo làm cho phép tính có số.

**Tại sao lọc không tự làm hiện nhãn?** Đã trả lời bằng việc tách `WHERE` và `SELECT`. **Tại sao dùng `COALESCE` với nhãn có dấu?** Đã trả lời bằng Unicode và kiểu cột. **Tại sao không thay mọi `NULL` bằng `0`?** Đã trả lời bằng ví dụ số ngày chưa biết.

### 5. Câu chính, kết quả và RunFlow — Giữ được

**Câu gốc:** “Kiểm email gốc bằng `IS NULL`, rồi tạo nhãn trong phần `SELECT`” (dòng 107); “Chú ý bước `WHERE` còn giữ email `NULL`, tới `SELECT` mới tạo nhãn hiển thị” (dòng 139).

Câu chính làm đủ yêu cầu đầu bài, không thêm điều kiện trạng thái hay giới hạn dòng. Kết quả có đúng bốn cột, `NV044` trước `NV045`, nhãn đúng chữ; hai dòng đánh dấu khớp lời đối chiếu với Excel. Câu trả lời ở cạnh kết quả phân biệt giá trị trong hệ thống với khả năng có email ở ngoài hệ thống, và giao việc xác minh cho người phụ trách.

RunFlow bổ sung đúng cơ chế quan trọng của bài: `48` hồ sơ nguồn → `2` sau lọc → vẫn `2` nhưng bốn cột có nhãn → sắp thứ tự. Thẻ rút gọn có `+45 dòng`, `+9 cột` ở nguồn; drawer có dòng ghi trích ba trong `48`, nên không làm người học tưởng đang xem toàn bảng. Các `meaning` đều bắt đầu từ từ khóa, phần `detail` nói rõ số dòng/cột và email nguồn/kết quả. Chưa bảo đảm thứ tự trước `ORDER BY` được nói tại các bước cần thiết. Sơ đồ không nhận là quá trình đọc vật lý.

**Tại sao `WHERE` không viết theo nhãn `(chưa có)`?** Đã trả lời bằng thứ tự logic và nguồn email vẫn `NULL`. **Để làm gì cần `ORDER BY` với hai dòng?** Đã có yêu cầu xếp mã và giải thích đối chiếu ở bước cuối; không cần giảng lại toàn bộ bài 2.4.

HTML build giữ newline và tab thật ở câu chính, câu phép cộng và các câu xem dữ liệu ở bước `SELECT`/`ORDER BY`; không thấy hai ký tự `\\t` lộ trong các khối này. Đây chỉ là đối chiếu HTML/text, chưa xác nhận hiển thị đúng bốn cột tab, highlight khi mở drawer hay thao tác Sao chép/dán bằng trình duyệt.

### 6. Hay nhầm, Ứng dụng, Ghi nhớ và độ tải — Giữ được

Hay nhầm nêu ba hậu quả riêng: dùng nhầm hàm với điều kiện, gửi thông báo khi chưa kiểm chất lượng email, điền ngày nghỉ giả. Chúng có liên hệ phần chính nhưng không chép lại định nghĩa dài. Ba ứng dụng đúng chủ đề và có việc làm cụ thể, không lặp lời khuyên chung về nguồn file/import.

Khái niệm được in đậm có chọn lọc; mã hồ sơ, tên cột, kiểu và dữ liệu dẫn chứng dùng code trong lời văn. Ghi nhớ ôn đúng bốn nhịp của bài. Không có tự kiểm tra; theo template, bài truy vấn này không bắt buộc thêm bộ câu hỏi. Ba bài tập ngay sau Ghi nhớ giữ đúng vị trí.

Thời lượng `25` phút là hợp lý nếu tính đọc ví dụ, mở sơ đồ và làm ba đề. Không dùng số dòng MDX để kết luận bài quá dài: phần lớn nguồn là dữ liệu drawer. Không thấy đoạn lý thuyết nào cần cắt cả ý; đề xuất cắt vế cảnh báo ở mục 4 đủ cho vòng này. Việc nhắc nguồn/kết quả trong đoạn giảng và tại đúng bước RunFlow có vai trò riêng, nên không đề nghị bỏ sơ đồ để tránh lặp.

### 7. Ba đề YAML — Giữ được, đủ kiến thức để tự làm

| Đề | Kiến thức người học đã có | Đánh giá |
|---|---|---|
| 2-5-1: có ngày nghỉ việc | `IS NOT NULL` được định nghĩa và minh họa dạng điều kiện ở bài này; chọn cột ở 2.1, xếp mã ở 2.4 | Đủ; đề không ép suy ngày nghỉ chỉ từ trạng thái, cũng không yêu cầu thêm khoảng ngày |
| 2-5-2: KD có giá trị email | Điều kiện mã ở 2.2, kết hợp `AND` ở 2.3, `IS NOT NULL` ở 2.5 | Đủ; câu “không kiểm định dạng hoặc khả năng liên hệ” ngăn đánh đồng khác `NULL` với hợp lệ |
| 2-5-3: toàn bộ VH, nhãn khi email `NULL` | `COALESCE` giữ giá trị khác `NULL`/thay phần thiếu được dạy tại dòng 88–90; nhãn Unicode có lý do tại dòng 92 | Đủ; đề nói rõ không loại dòng thiếu email nên có thể tách đúng điều kiện phòng với biểu thức hiển thị |

YAML thống nhất `ordered: true`, đúng vị trí ba cột và yêu cầu xếp mã. Lời dẫn bài tập nói tên cột không được chấm, phù hợp đề 3. Đáp án YAML tương ứng yêu cầu từng đề; câu tình huống trong bài dùng phạm vi toàn bộ hồ sơ thiếu email và bốn cột, không trùng nguyên văn ba đáp án.

**Tại sao đề 3 không dùng `WHERE Email IS NULL` như câu chính?** Đề nói lấy toàn bộ hồ sơ VH; phần giảng tách lọc dòng với nhãn hiển thị và giải thích giữ email có sẵn. Bài đã cung cấp đủ căn cứ để nhận ra khác biệt, không cần chèn đáp án vào lời giảng.

## Ưu tiên và giới hạn

1. Không có lỗi kiến thức hoặc thiếu hướng dẫn bắt buộc sửa được xác định trong phạm vi review này.
2. Biên tập ưu tiên thấp: cắt vế cảnh báo chung cuối đoạn `ISNULL` (dòng 92); giữ nguyên giải thích Unicode và kiểu kết quả.
3. Trước khi kết luận kiểm giao diện hoàn tất, tác giả cần kiểm trên trình duyệt phần tab bốn cột, highlight drawer và Sao chép/dán. Review này không thực hiện các thao tác đó.

Đã đối chiếu `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1, bài 1.3/2.2/2.3, cùng phần nền chọn cột/alias ở 2.1 và sắp xếp ở 2.4. Đọc toàn bộ MDX/YAML được giao và text/khối SQL trong `dist/bai/2-5-null-o-trong/index.html`.

Không đọc seed, `.env`/secret, review cũ, báo cáo học viên gốc, nhận xét reviewer khác hay tài liệu SQL ngoài khóa học; không kết nối database hoặc chạy SQL; không chạy bộ test/build/check trong vòng chỉ review này. Các số `48`, `2`, mã/phòng/trạng thái đã khớp hồ sơ công ty và các hình của bài, nhưng kết quả SQL thực tế, kiểu runtime và các dữ liệu chi tiết trong drawer chưa được reviewer xác minh bằng database. Không sửa sản phẩm, đề/đáp án, test, docs hoặc cấu hình; chỉ tạo report này.
