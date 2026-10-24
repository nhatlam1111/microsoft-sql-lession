# Review độc lập bài 3.5 — LEFT JOIN

Ngày review: 25/10/2026. Công cụ: agent Codex mới, kế thừa model của phiên; không chỉ định model khác. Vai học thử: Business Consultant khó tính muốn hiểu SQL Server đủ để phản biện yêu cầu và kết quả, chỉ dùng bài hiện tại và kiến thức các bài trước.

Đã đọc toàn bộ brief, MDX 3.5, YAML ba bài tập, dữ liệu/lời giải của cả năm drawer RunFlow và HTML production có thời điểm sửa `25/10/2026 00:20:11`. Đây là review nội dung và đối chiếu HTML tĩnh, chưa kiểm thao tác trình duyệt hoặc chạy SQL.

**Kết quả:** chưa phát hiện lỗi nội dung hoặc thiếu kiến thức cần sửa để học viên hoàn thành mục tiêu bài. Không có đề xuất thêm câu, thêm khối hay đổi SQL/Result. Giữ đối chiếu `ON`/`WHERE` hiện có.

## Rà theo thứ tự bài

### 1. Tình huống và phạm vi — Giữ được

**Câu gốc:** “Chưa có hợp đồng” nghĩa là không có dòng nào trong `HopDong` theo mã nhân viên; không phải chưa có hợp đồng còn hiệu lực tại một ngày.

**Đánh giá:** người học biết phải tìm dữ liệu vắng trong hệ thống, chưa phải xét hợp đồng hiện hành. Câu “xét mọi hồ sơ” chặn suy diễn chỉ lấy người đang làm hoặc người mới; phần trả lời cuối giữ đúng phạm vi này. Tình huống và hai hồ sơ mới khớp hồ sơ công ty.

**Đề xuất:** giữ nguyên.

### 2. Excel, LEFT JOIN và chọn cột kiểm NULL — Giữ được

**Câu gốc:** “dòng bên trái không có cặp vẫn xuất hiện với các cột bên phải là `NULL`”; “`MaHD` là khóa chính, không nhận `NULL` trên hợp đồng thật”.

**Đánh giá:** bài giải thích đủ vì sao giữ `NhanVien` bên trái, vì sao phía hợp đồng có `NULL` dù khóa chính không nhận `NULL`, và vì sao dùng `MaHD` thay cho `NgayKetThuc`. Chi tiết SQL không ghi hợp đồng trống vào nguồn giải quyết đúng chỗ dễ nhầm giữa dữ liệu nguồn và kết quả. Bí danh và dấu chấm đã được giải thích ở 3.4; `IS NULL`/`= NULL` đã có ở 2.5, nên không cần giảng lại.

Hình Excel có công thức dò chính xác, đúng hai ô `D3`, `D4` được nói đến; câu về mã/công thức sai giữ `#N/A` trong đúng giới hạn. Phần VLOOKUP chỉ lấy dòng đầu và `NV021` hiện ba lần nối được từ bài 1.5/3.4. Mốc `55 + 2 = 57` phân biệt dòng hợp đồng với số hồ sơ, nhất quán với hồ sơ công ty; số liệu live chưa được reviewer chạy lại.

**Đề xuất:** giữ nguyên phần giải thích và hình hiện có.

### 3. ON chọn cặp, WHERE lọc sau kết — Giữ được

**Câu gốc:** “`NV021` có hợp đồng thử việc `HD2021-001`; dòng `NV047` được đánh dấu vẫn còn với `MaHD` là `NULL`.”

**Đánh giá:** đã có câu SQL đầy đủ cùng Result hai dòng ngay cạnh lời giải thích. Ví dụ dùng hai mã đủ nhỏ để người mới theo dõi tác động của `ON`: một hồ sơ khớp thử việc, một hồ sơ không khớp. Câu tiếp theo nói rõ chuyển điều kiện loại xuống `WHERE` sẽ loại `NV047`, chỉ còn một dòng. Kiến thức `WHERE` chỉ giữ điều kiện đúng và so sánh với `NULL` từ bài 2.5 đủ để hiểu kết quả này.

**Câu gốc:** “Không phải mọi điều kiện đều phải chuyển vào `ON`: điều kiện giới hạn hồ sơ bên trái, như `nv.MaPB = 'IT'`, có thể đặt ở `WHERE` khi muốn bỏ các phòng khác.”

**Đánh giá:** vế này cần thiết để tránh học thuộc quy tắc sai “LEFT JOIN thì mọi điều kiện phải ở ON”, đồng thời chuẩn bị trực tiếp cho bài tập IT. Đoạn chốt “Ở bài này chỉ cần…” giữ phần hiệu lực ngày cho 3.6; chưa cần thêm ví dụ ngày hoặc một cặp SQL/Result thứ hai.

**Đề xuất:** giữ đối chiếu, câu SQL và Result hiện có.

### 4. Câu lệnh và câu trả lời tình huống — Giữ được

**Câu gốc:** “Câu lệnh không lọc riêng tháng 10; kết quả này đến từ việc hai mã chưa có dòng hợp đồng.”

**Đánh giá:** câu SQL dùng đúng mẫu vừa giải thích, lấy bốn cột yêu cầu và xếp mã tăng dần. Result đánh dấu đúng hai dòng, câu trả lời đặt ngay cạnh kết quả. Việc cả hai đều mới vào tháng 10 được tách khỏi điều kiện tìm; phần đối chiếu hồ sơ giấy không hứa dữ liệu hệ thống chứng nhận tình trạng thực tế.

**Đề xuất:** giữ nguyên.

### 5. RunFlow và năm drawer — Giữ được

**Câu gốc:** “Mỗi câu `SELECT` kiểm bước là câu riêng, không phải mô tả thực thi vật lý.”

**Đánh giá:** chuỗi `48 → 57 → 2 → 2 → 2` thể hiện cả nhân dòng và loại dòng, không biến `LEFT JOIN` thành phép dò chỉ trả một hợp đồng. Drawer `LEFT JOIN` có đủ ba dòng `NV021` và hai dòng không khớp; drawer `WHERE` chỉ giữ hai mã; drawer `SELECT` giải thích `MaHD` dùng lọc nhưng không cần đưa ra báo cáo. Mỗi lời giải bắt đầu bằng từ khóa của bước, số dòng và cột nhất quán trong MDX/HTML.

Bài đã nói hai bước đầu trích tối đa mười dòng, từ `WHERE` đủ hai dòng và trước `ORDER BY` chưa bảo đảm thứ tự. Thẻ tóm tắt chỉ hiện vài ô; bảng đầy đủ hơn nằm trong drawer, không có lời nào gọi thẻ là toàn bộ kết quả. Đối chiếu HTML thấy tab thật ở dòng `AND` của ví dụ `ON` và dòng tiếp danh sách cột trong câu kiểm bước; CSS khai báo mốc tab bốn cột. Chưa thử sao chép/dán hoặc nhìn layout trong browser.

**Đề xuất:** giữ nguyên nội dung sơ đồ; không suy từ việc đọc HTML thành kết luận tương tác đã đạt.

### 6. Hay nhầm, Ứng dụng, Ghi nhớ và tự kiểm tra — Giữ được

**Câu gốc:** “Dùng `INNER JOIN` rồi tìm khóa bên phải `NULL`”; “Đối chiếu kỳ lương: giới hạn đúng kỳ trong `ON`…”

**Đánh giá:** Hay nhầm mô tả các thao tác sai và hậu quả, không thêm một đoạn lý thuyết mới. Hai ứng dụng đúng khả năng vừa học, có công việc cụ thể; ứng dụng theo kỳ chuẩn bị cho đề thứ hai. Memo giữ các điểm chính. Ba câu tự kiểm phủ chọn cột kiểm `NULL`, khả năng nhân dòng và phối hợp `ON`/`WHERE`; đáp án đã được dạy, nằm sau Ghi nhớ trước Bài tập.

Khái niệm mới được in đậm có chọn lọc; mã, ngày, tên bảng/cột và từ khóa trong lời văn dùng code. Không thấy dấu backtick lộ trong văn bản component đã xuất HTML. Không có đoạn lặp cần cắt mà việc cắt sẽ làm bài rõ hơn; các lần nhắc lại ở Hay nhầm tập trung vào lỗi/hậu quả, còn Memo/tự kiểm là phần ôn.

**Đề xuất:** giữ nguyên.

### 7. Ba bài tập YAML — Giữ được

**Câu gốc:** “Xét mọi hồ sơ hiện mang MaPB bằng IT…”; “không có dòng BangLuong trong kỳ 2026-09, dù có thể có lương ở kỳ khác”; “cột MaHD là SQL NULL, không phải chữ NULL”.

**Đánh giá:** từng đề nói rõ phạm vi, cột và thứ tự. Bài 3-5-1 kết hợp điều kiện giữ hồ sơ bên trái đã giải thích; 3-5-2 chuyển phạm vi được dò từ loại hợp đồng sang kỳ lương; 3-5-3 kiểm giữ mọi hồ sơ và trả từng cặp. Nền `BangLuong.MaNV`/`NhanVien.MaNV`, `KyLuong` và khóa ghép `(KyLuong, MaNV)` đã có ở bài 1.5, nên không cần dạy thêm trong 3.5. Sắp nhiều cột đã có ở 2.4. Đáp án trong YAML phù hợp ý nghĩa từng đề khi đọc; chưa xác minh thực thi hoặc bộ chấm.

**Đề xuất:** giữ nguyên ba đề, đáp án và số lượng bài tập.

## Các câu “tại sao, để làm gì” tự đặt ra

| Câu hỏi khi học thử | Bài đã trả lời? |
|---|---|
| Tại sao cần LEFT JOIN thay vì INNER JOIN đã học? | Có: giữ hồ sơ không có cặp để còn tìm thấy nó. |
| Tại sao cột khóa chính lại hiện NULL? Có tạo hợp đồng trống không? | Có: NULL thuộc phần không khớp của kết quả, không ghi thêm nguồn. |
| Tại sao kiểm MaHD thay vì NgayKetThuc? | Có: ngày kết thúc có thể thiếu trên hợp đồng thật. |
| Tại sao 48 hồ sơ thành 57 dòng? | Có: trả từng cặp, NV021 có ba hợp đồng, cộng hai hồ sơ không khớp. |
| Tại sao đặt loại hợp đồng ở ON thay vì WHERE? | Có: ví dụ đầy đủ giữ NV047; chuyển điều kiện xuống WHERE sẽ loại dòng đó. |
| Có phải mọi điều kiện đều chuyển vào ON? | Có: điều kiện phạm vi hồ sơ bên trái vẫn có thể ở WHERE. |
| Hai người mới có phải kết quả do lọc tháng 10 không? | Có: bài nói rõ câu không lọc tháng, cũng không lọc trạng thái. |
| Tìm người chưa có lương một kỳ có cần loại mọi người đã từng có lương không? | Có: ứng dụng theo kỳ cùng nguyên tắc ON; bài 1.5 đã chỉ ra MaNV lặp qua kỳ. |
| Có thể kết luận người trong kết quả chưa ký hợp đồng thực tế không? | Có: phải đối chiếu hồ sơ giấy hoặc việc nhập liệu. |

## Ưu tiên và nguồn đối chiếu

Không có mục Cần sửa / Cần làm rõ / Cần cắt được xác lập trong phạm vi review này. Không đề nghị thêm nội dung, đổi bố cục hoặc thay đối chiếu `ON`/`WHERE`.

Nguồn đã đối chiếu:

- `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md` và brief của lượt review.
- Toàn bộ bài `1-1-database-la-gi.mdx`, `1-5-doc-so-do-erd.mdx`, `2-5-null-o-trong.mdx`, `3-4-inner-join-vlookup.mdx`; các đoạn liên quan điều kiện lọc, sắp nhiều cột và khóa ở 2.2/2.4/1.4.
- Toàn bộ `src/content/lessons/3-5-left-join.mdx`, `src/content/exercises/3-5-left-join.yaml`, `dist/bai/3-5-left-join/index.html`.
- Mục “Không làm theo / giới hạn giữ có chủ đích” trong spec 3.4–3.7; phần component/CSS RunFlow cần để hiểu HTML tĩnh.

Giới hạn: không đọc seed/database script, `.env`, báo cáo kiểm thử gốc, ma trận hay review của người khác; không tra SQL bên ngoài, không kết nối database. Không chạy test/build, không mở browser hoặc thử API bài tập. Các con số, câu SQL và đáp án mới được đối chiếu trong nội dung khóa học, chưa xác minh live; đọc HTML không xác nhận layout, bàn phím, drawer mở/đóng hay clipboard. Chỉ tạo report này, không sửa sản phẩm hoặc commit.
