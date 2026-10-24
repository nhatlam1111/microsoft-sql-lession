# Review độc lập bài 1.3 — Bảng, cột và kiểu dữ liệu

- Ngày: 24/10/2026. Vai trò: Business Consultant muốn học đủ để hiểu và phản biện trao đổi dữ liệu với developer.
- Công cụ/model: Codex, **kế thừa model của phiên**, không chỉ định model khác.
- Phạm vi: MDX bài 1.3 và HTML build tương ứng. Không có YAML bài tập cùng slug; phù hợp `noExercises: true`.

**Kết luận:** Chưa phát hiện lỗi chặn việc học qua đọc nguồn và HTML. Có một chỗ cần làm rõ thuật ngữ và một đề nghị biên tập nhỏ cho tự kiểm tra. Giả định lấy chữ hiển thị, điều kiện `us_english`/`mdy` và bảng sáu ô đủ để đọc lời giải, không cần thêm SQL preview. Kết quả chuyển kiểu chưa được reviewer xác minh bằng SQL live.

## Rà theo thứ tự bài

### 1. Tình huống → Excel → kiểu của cột — Giữ được

**Câu gốc:** “IT lấy đúng chữ đang hiển thị trong từng ô”; “các thông tin bắt buộc khác đã có”; “chỉ xét hai cột này.” (dòng 25)

Giả định giới hạn rõ đường nhập, cột đích và phạm vi kết luận. Chị Hạnh, tháng 10/2026 và vướng mắc ngày/lương khớp hồ sơ công ty. Hình đã ghi rõ là minh họa, nên không gây nhầm `NV049`–`NV051` là hồ sơ có sẵn trong bộ mẫu.

**Câu gốc:** “Format Cells chỉ đổi cách hiển thị”; “mỗi cột được khai báo một kiểu dữ liệu dùng cho mọi dòng”; “gọi là chuyển kiểu ngầm.” (dòng 33, 46–48)

Data Validation có công dụng giải thích tại chỗ; bài không tuyệt đối hóa Excel. Đoạn sau hình chỉ rõ `C2` là ngày thật, `C3`/`D2`/`D3` là chữ, `D4` là số. HTML có `C2: xl-mark xl-num`, `D3: xl-mark`, `C3: xl-sel`, `D4: xl-num`, khớp lời giới thiệu dấu ô và kiểu ô.

Các câu hỏi tự đặt ra:

- “Ngày thật trong Excel sao vẫn có thể bị đổi ngày khi nhập?” **Đã trả lời:** IT lấy chữ hiển thị; cuối phần chính còn đối chiếu cách đọc trực tiếp kiểu ô.
- “Đổi Format Cells có sửa chữ thành ngày/số không?” **Đã trả lời:** chỉ đổi cách hiển thị.
- “Vì sao cần kiểu ngày/số thay cho chữ?” **Đã trả lời:** so sánh/sắp xếp theo ngày, tính toán số; thứ tự chữ có thể khác thời gian.

**Đề xuất:** giữ mạch gộp hiện tại, không thêm cú pháp trước bài 1.6.

### 2. Đọc kiểu/NULL trong SSMS và bảng kiểu — Giữ được

**Câu gốc:** “Chữ trong ngoặc sau tên cột cho biết kiểu dữ liệu và cột có nhận NULL hay không.” (dòng 52)

Đường Object Explorer nối được với bài 1.2. `NULL`/`NOT NULL` được giải thích rồi đối chiếu bằng hai cột. HTML đánh dấu `ssms-mark` đúng trên `NgayKetThuc (date, null)` và `LuongCoBan (decimal(18,0), not null)`; caption khớp.

Bảng kiểu có dẫn chứng cụ thể, giới hạn byte của `varchar`, phạm vi “ký tự tiếng Việt thông thường” của `nvarchar`, và giới hạn của `char` được diễn đạt có điều kiện. `decimal(4,1)` có ví dụ `999.9`; dấu phẩy tham số khác dấu chấm phần lẻ; đơn vị đồng được tách khỏi tên kiểu.

Các câu hỏi tự đặt ra:

- “Cột lương và ngày kết thúc khác nhau ở khả năng nhận NULL thế nào?” **Đã trả lời** bằng lời và hình.
- “CCCD gồm chữ số sao lại dùng kiểu chữ?” **Đã trả lời:** giữ số đầu, không để cộng trừ.
- “Tiền dùng decimal để làm gì, 4,1 nghĩa là gì?” **Đã trả lời đủ mức bài:** lưu theo số chữ số khai báo; ba chữ số phần nguyên, một phần lẻ; hậu quả làm tròn/tràn được đưa vào Hay nhầm.

**Đề xuất:** giữ. Bảng nhiều kiểu nhưng độ sâu dừng ở đọc cột. Thời lượng 15 phút có vẻ phù hợp khi gồm tự kiểm tra; chưa đo bằng phiên học có bấm giờ.

### 3. DATEFORMAT — Cần làm rõ, P2

**Câu gốc:** “thiết lập phiên mặc định của tài khoản khóa học…”; “DATEFORMAT là thiết lập của phiên SQL…”; “Phiên khác có thể đọc khác…” (dòng 25, 75)

**Vướng mắc:** “phiên” là thuật ngữ mới chưa giải nghĩa trong bài này hoặc bài 1.1–1.2. Người học biết máy chủ, database, tài khoản và công cụ nhưng chưa biết “phiên” thuộc phạm vi nào. Đây lại là điều kiện quyết định có được áp kết quả `01/02/2024` cho nơi mình đang dùng hay không.

**Tự hỏi:** “Vì sao cùng chữ ngày có thể ra ngày khác, và ‘phiên khác’ là khác cái gì?” Bài **đã trả lời cơ chế đọc thứ tự ngày/tháng/năm**, nhưng **chưa nói rõ phạm vi từ ‘phiên’**.

**Đề xuất ngắn:** giải nghĩa một lần “phiên SQL (lần kết nối đang làm việc)” và viết rõ “ngôn ngữ `us_english`, `DATEFORMAT` là `mdy`”. Sửa câu hiện có; không cần thêm truy vấn kiểm tra hoặc phần cấu hình SSMS.

### 4. Sáu ô và câu trả lời tình huống — Giữ được

**Câu gốc:** “Khi chuyển kiểu, có ba khả năng…”; “sửa hết ô báo lỗi chưa bảo đảm dữ liệu đã đúng.” (dòng 73, 86)

| Ô | Đánh giá như học viên |
|---|---|
| `C2` | Giả định lấy chữ hiển thị và `mdy` giải thích kết quả `2024-01-02`. Bài yêu cầu xác nhận ý người nhập, không khẳng định đây chắc chắn là ngày sai. |
| `C3` | Nêu được kết quả được nhận và cách thống nhất dạng chữ cho cột `date`; không dạy rằng cứ có dấu chấm là lỗi. |
| `C4` | Lý do từ chối là không đổi được thành ngày; hướng xử lý là xác minh, không điền đại cho qua cột bắt buộc. |
| `D2` | Bài đã nói đây là chữ nên từ chối không mâu thuẫn với vẻ ngoài giống số. Chuẩn hóa có điều kiện xác nhận số tiền. |
| `D3` | Phân biệt được chữ kèm đơn vị với giá trị số; chỉ đề nghị `9610000` sau khi xác nhận là `9,61 triệu` đồng. |
| `D4` | Ví dụ giữ nguyên giá trị khi chuyển chữ IT lấy sang số; vẫn cần đối chiếu đơn vị và số tiền. |

Các câu hỏi tự đặt ra:

- “Ô nào bị từ chối, ô nào lưu được mà vẫn phải hỏi lại?” **Đã trả lời:** từng ô có kết quả và việc cần làm dưới cùng giả định.
- “Một ô lỗi thì cả đợt nhập có dừng không?” **Đã trả lời đúng giới hạn:** phụ thuộc công cụ nhập, phải thống nhất cách báo dòng lỗi với IT.
- “Ngày hợp lệ/số lưu được đã bảo đảm đúng hồ sơ chưa?” **Đã trả lời:** ví dụ ngày `2099-03-01`, số âm và quy ước `NgayNghiViec`/`NULL` tách đúng giới hạn của kiểu dữ liệu.

Tình huống được khép ngay trong phần chính. Đoạn IT đọc trực tiếp kiểu ô cần thiết để giới hạn giả định, không phải lặp thừa.

**Đề xuất:** giữ bảng và phạm vi hiện tại. Reviewer chỉ đánh giá được sự đầy đủ/nhất quán của lời giải; chưa xác minh live các kết quả chuyển kiểu.

### 5. Hay nhầm → Ứng dụng → Ghi nhớ — Giữ được

**Câu gốc:** “Phần lẻ bị làm tròn mà không báo lỗi”; “Chuỗi rỗng… hoặc chuỗi toàn dấu cách…”; “Bỏ N có thể làm mất dấu…” (dòng 100–102)

Ba lỗi có hậu quả khác nhau và có điều kiện cần thiết. `N'Trần Thị Mai'` là dẫn chứng ngắn để đọc, không biến thành bài thực hành ghi dữ liệu.

- “Lưu số thành công có giữ mọi chữ số không?” **Đã trả lời:** làm tròn khác với tràn số.
- “NOT NULL chặn tên trống không?” **Đã trả lời:** khác `NULL` vẫn có thể lưu, cách import cần thống nhất.
- “Có nvarchar còn phải chú ý gì khi viết tên tiếng Việt?” **Đã trả lời đủ mức nhận biết:** tiền tố `N`, dẫn sâu sang bài 2.7.
- “Học xong dùng vào việc gì?” **Đã trả lời:** chọn kiểu, quy định đầu vào, tìm ô cần đối chiếu trước báo cáo.

Ba ứng dụng đúng chủ đề, có mục đích cụ thể. Ghi nhớ nhắc lại có chủ đích. Khái niệm chính được in đậm có chọn lọc, tên/giá trị dẫn chứng trong lời giải có code, chuỗi component không lộ backtick trong HTML đã đọc. Chưa thấy chỗ lặp cần cắt bắt buộc ngoài phần ôn được phép.

**Đề xuất:** giữ. Các số làm tròn là kết quả bài cung cấp, chưa được reviewer chạy lại.

### 6. Tự kiểm tra — Biên tập, P3

**Câu gốc:** “Cả 01/02/2024 và chưa rõ đều bị từ chối khi ghi vào cột ngày?” (dòng 142–144)

Vị trí đúng sau Ghi nhớ; có năm câu, đáp án ngắn, không dạy thêm. Các câu chạm đọc kiểu/NULL, Format Cells, hiểu nhầm ngày, làm tròn/tràn và nội dung trống.

**Điểm có thể cải thiện:** mục tiêu nêu ba khả năng chuyển kiểu nhưng câu này chỉ đối chiếu đổi ngày/bị từ chối. Nhánh giữ nguyên giá trị đã giảng bằng `D4`, chưa được hỏi trực tiếp.

**Tự hỏi:** “Không nhìn bài, tôi phân loại đủ ba khả năng được chưa?” **Bài đã cho đủ kiến thức**, nhưng bộ câu hỏi chưa kiểm trực tiếp nhánh giữ nguyên.

**Đề xuất ngắn:** thay câu thứ ba bằng yêu cầu phân loại `C2`, `C4`, `D4` theo ba khả năng, giữ giả định của bài trong câu/đáp án. Gộp vào câu hiện có, không tăng số câu. Đây là cải thiện độ phủ, không phải thiếu lý thuyết.

## Ưu tiên

1. **P2:** làm rõ “phiên SQL” bằng một vế câu tại phần DATEFORMAT.
2. **P3:** cân nhắc biên tập câu tự kiểm tra thứ ba để chạm đủ ba khả năng chuyển kiểu.

Không có đề nghị thêm SQL preview, thêm bài, đổi URL, tách khung hoặc đổi dữ liệu.

## Nguồn và giới hạn thực tế

Đã đọc `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`; toàn bộ MDX bài 1.1, 1.2 và 1.3; HTML `dist/bai/1-3-bang-cot-kieu-du-lieu/index.html`. Không có YAML bài tập cùng slug qua kiểm tra đường dẫn.

Không đọc seed, `.env`, báo cáo kiểm thử học viên gốc, ma trận tác giả, review cũ hay nhận xét reviewer khác. Không kết nối/chạy database hoặc tra tài liệu SQL ngoài khóa học. Giá trị, kiểu và kết quả chuyển kiểu chưa được xác minh độc lập bằng SQL live.

Chỉ đọc HTML và metadata đánh dấu; **chưa kiểm trình duyệt**, bố cục trực quan, mở đáp án, sao chép/dán, SSMS thật hoặc import. Bài không có khối Sql/Result/Messages/RunFlow/Erd để kiểm. Không chạy test/build lại; dùng bản build được giao, không khẳng định bộ kiểm tra dự án đạt hoặc không có lỗi nền. Chỉ viết report này, không sửa sản phẩm/test/docs hoặc commit.

