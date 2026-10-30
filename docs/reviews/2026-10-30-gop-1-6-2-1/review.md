# Review bài 2.1 (bản gộp 1.6 + 2.1) và phần đổi ở trang Giới thiệu

Vai: người học chưa biết SQL, chỉ biết Excel văn phòng; học thử từ 1.1 đến 1.5 rồi 2.1. Đây là học thử bằng đọc nguồn và HTML, không phải xác nhận SQL hay giao diện đã chạy đúng.

## 1. Phạm vi, phiên bản, công cụ thực tế

| Mục | Ghi nhận |
|---|---|
| Bài | `src/content/lessons/2-1-chon-cot-dat-ten-cot.mdx`, YAML `src/content/exercises/2-1-chon-cot-dat-ten-cot.yaml` (4 đề) |
| Trang Giới thiệu | `src/pages/gioi-thieu.astro`, xem `git diff 3c3a7fa..4a4a6ef`: mục Chọn nơi thực hành, mục Kết nối bằng SSMS (hình thanh công cụ, bôi đen, Parse, Edit Top 200 Rows, `SELECT INTO`, Disconnect) |
| Source | Commit `4a4a6ef`, nhánh `feat/merge-lessons-1-6-2-1`, `git status` sạch lúc bắt đầu |
| Build | `dist/bai/2-1-chon-cot-dat-ten-cot/index.html`, bốn trang `dist/bai/2-1-chon-cot-dat-ten-cot/bai-tap/1..4/index.html` và `dist/gioi-thieu/index.html`, đều ghi 21:56 ngày 30/10/2026. Văn bản trong dist khớp MDX/Astro ở các đoạn tôi đối chiếu (không có dòng nào lệch) |
| Đã đọc | AGENTS.md, quy ước, khung bài, hồ sơ công ty, bài 1.1 đến 1.5, bài mẫu 2.2, spec gộp (các mục Nội dung bài 2.1, Trang Giới thiệu, Bài tập), toàn bộ MDX 2.1 gồm từng bước và drawer của `RunFlow`, YAML bốn đề, văn bản HTML của bài, trang Giới thiệu và bốn trang bài tập |
| Đọc thêm (chỉ để xác định hành vi giao diện, không chạy) | `ExerciseWorkspace.tsx`, `SqlEditor.tsx`, `Exercises.astro` |
| Không làm | Không mở browser, không chạy SQL, không gọi API/runner, không đọc `HRM_Demo.sql`, `.env`, report cũ, ma trận của tác giả |
| Kiểm HTML bằng script đọc file | Không lộ dấu backtick trong phần nội dung (8 dấu backtick còn lại đều nằm trong script runtime của Astro); không có nháy cong trong thân bài (nháy thẳng ở `N'Trần Thị Mai'` và `Invalid column name 'TenNV'.`); bốn khối `Sql` có nội dung sao chép trùng với văn bản hiển thị; các anchor `#chon-noi-thuc-hanh`, `#ket-noi-ssms` có trong trang Giới thiệu |
| Chưa kiểm | Nút Sao chép/dán, bàn phím, drawer mở thật, thao tác trong SSMS, phản hồi của trang bài tập khi chạy/nộp |

## 2. Rà theo thứ tự bài

Phân loại cột cuối: **Chưa dạy** (người học cần mà bài và bài trước chưa nói), **Khó tìm** (đã nói nhưng ở chỗ khó thấy), **Sai có căn cứ**, **Chưa xác minh**, **Không** (không thuộc nhóm nào, chỉ là biên tập).

### 2.1 Mạch tổng thể

Bài đọc như một mạch, không như hai bài dán nối. Câu "Muốn chọn đúng ba cột, trước hết phải biết bảng có những cột nào" biến việc xem bảng thành bước đầu của tình huống Kế toán, rồi đi tiếp: chọn cột, đặt tiêu đề, câu cuối, sơ đồ. Không còn dấu vết của hai tình huống. Gánh nặng dồn ở tiểu mục đầu: trong một tiểu mục người học gặp cùng lúc `SELECT`, `*`, `FROM`, `TOP`, dấu `;`, cách chạy, tab Results, tab Messages, `NULL`, cột số thứ tự dòng, tính không ổn định của `TOP` và việc `*` lấy dữ liệu cá nhân. Nội dung đều đáng có, nhưng người chưa từng thấy cửa sổ truy vấn dễ choáng ở đây; các finding 1 đến 4 xoay quanh tiểu mục này.

### 2.2 Tình huống và giả định

Giữ được. Chị Hạnh yêu cầu ba cột có thứ tự và tiêu đề; giả định nói rõ phạm vi (toàn bộ `NhanVien`, không lọc), chưa yêu cầu thứ tự dòng. Khớp `ho-so-cong-ty.md` mục 7 (48 hồ sơ, ba cột, tiêu đề tiếng Việt) và mục 5 (Kế toán nhận danh sách). Câu "bạn vừa được cấp quyền đọc database nhân sự" đủ để trả lời "vì sao người học được xem dữ liệu này".

### 2.3 Tiểu mục "Xem bảng đang lưu những gì"

Câu hỏi tôi tự đặt và nơi bài trả lời:

| Câu hỏi | Bài trả lời ở đâu |
|---|---|
| Vì sao phải xem bảng trước khi lấy ba cột? | Có, câu đầu tiểu mục |
| `SELECT`, `*`, `FROM`, `TOP (5)`, `;` là gì? | Có, đoạn ngay sau câu lệnh; `TOP` là "tối đa năm" đúng quy ước |
| Vì sao xuống dòng giữa `SELECT` và `FROM`? | Có, "chỉ giúp dễ đọc" |
| Chạy bằng cách nào? | Có, nhưng xem finding 1 |
| Cột số bên trái lưới là gì? `NULL` là gì? `(5 rows affected)` là gì? | Có, đúng và đủ cho người mới; `(5 rows affected)` được tách rõ với "dòng đã bị sửa" |
| Vì sao chỉ lấy 5 dòng mà không xem hết? | **Chưa** (finding 3) |
| Vì sao `*` không dùng cho bản gửi đi? | Có, câu cuối tiểu mục |
| Vì sao thứ tự dòng không bảo đảm? | Có, một vế; ý gốc ở 1.2 Hay nhầm 2, không trỏ lại |

Đánh giá chung: **Giữ được** phần giải thích `SELECT`/`FROM`/`*`/`TOP`, đọc Results và Messages. Số liệu khớp hồ sơ công ty và bài 1.2: 12 cột, 48 hồ sơ, năm dòng `NV001` đến `NV005` có giá trị trùng với các bước `RunFlow` của 2.2 (`NV004` có `MaQuanLy` NULL, `NV005` trỏ `NV004`).

### 2.4 Tiểu mục "Chọn những cột cần gửi"

Mạch Excel → SQL rõ: chép ba cột sang workbook mới ↔ liệt kê cột sau `SELECT`. Hình Excel đánh dấu `A1`, `B1`, `C1` đúng với chú thích; ngày `01/03/2024` ở Excel và `2024-03-01` ở SSMS được giải thích bằng câu "đang hiển thị theo ngày/tháng/năm" và ở tiểu mục cuối. Câu "chọn ít cột không làm bớt dòng" và "đổi vị trí cột khác sắp dòng" đều đúng chỗ người mới hay lẫn. Vấn đề ở đoạn cuối (finding 5).

### 2.5 Tiểu mục "Đặt tiêu đề mà không đổi cột nguồn"

Giữ được: định nghĩa alias, ví dụ `HoTen AS [Họ tên]`, "alias chỉ có trong câu lệnh đó", ngoặc vuông chỉ để bao tên có khoảng trắng và không có `N`. Câu về `Invalid column name 'TenNV'.` giúp biết lỗi sai tên cột trông thế nào, nhưng bài chưa dạy đọc một thông báo lỗi (finding 13). Đoạn "Ở bài này chỉ cần…" có phần thừa (finding 6).

### 2.6 "Câu lệnh cho tình huống" và Copy with Headers

Câu SQL đúng cú pháp theo hiểu biết của tôi về T-SQL (chưa chạy). Kết quả trích 5 dòng, `total={48}`, chú thích nói rõ là trích; dòng đánh dấu `NV001` được mô tả. Câu trả lời chị Hạnh tách đúng việc database làm (ba cột, 48 hồ sơ) với quyết định nghiệp vụ (muốn phân biệt người nghỉ thì bổ sung yêu cầu) và nằm cạnh kết quả, đúng quy ước. Có hai điểm chưa chặt: số liệu ở câu trả lời (finding 4) và Copy with Headers chỉ có ở SSMS (finding 2).

### 2.7 "SQL Server chạy câu này thế nào"

Hai bước `FROM` → `SELECT`, đúng mức tối thiểu của sơ đồ. `query` trùng câu tình huống; `focus` thuộc câu đó; `sql` của bước 1 là `SELECT * FROM NhanVien;` trả 48 dòng 12 cột, bước 2 trả 48 dòng 3 cột, khớp lời. Drawer bắt đầu từ từ khóa, có số dòng thật. Hai ghi chú `excel` ngắn, đúng. Hình thẻ ghi "+45 dòng", "+9 cột", đúng với hình trích 3 dòng và tổng 48/12. Câu "Bạn viết SELECT trước, nhưng theo thứ tự logic, SQL Server xét FROM trước" trả lời được "vì sao FROM trước" bằng ý "phải biết cột nằm ở bảng nào đã". Sơ đồ chưa cho người học thêm gì ngoài đoạn giải thích trước đó (hai bước, một ý), nhưng không sai và không dài: **Giữ được**, ở mức "không có hại".

### 2.8 Hay nhầm, Ứng dụng, Ghi nhớ, phần Bài tập

- Hay nhầm 2 (thiếu dấu phẩy thành alias) và 4 (`NgaySinh AS [Ngày vào làm]`) là hai ý đáng giá nhất: lỗi chạy được nhưng sai, hậu quả nói rõ. Hay nhầm 5 có số "`KD` lặp `14` lần" khớp hồ sơ công ty (14 hồ sơ mã `KD`).
- Hay nhầm 1, 3 cần chỉnh nhẹ (finding 8, 9).
- Ứng dụng: bốn ý đều là việc làm được nhờ chủ đề (xem mẫu bảng, lập danh sách theo mẫu, đặt tiêu đề, hạn chế thông tin gửi đi), có mục đích, không hứa quá; ý 4 khớp lời cảnh báo "không thay phân quyền". **Giữ được.**
- Ghi nhớ: sáu hàng bao đủ mục tiêu. Hàng "Nhìn dữ liệu và trạng thái thao tác" không có điểm tựa Excel thật (vế trái chỉ mô tả lại), nhỏ.
- Phần Bài tập: xem finding 7.

### 2.9 Findings của bài

**Finding 1 — Cần làm rõ. Lối vào chạy thử trên web**
- Câu gốc: "trên web bấm **Làm bài** ở bài tập 1, nhập câu trên rồi bấm **Chạy (F5)**" (tiểu mục "Xem bảng đang lưu những gì").
- Tác động: người chỉ dùng web đang đọc giữa bài, mục Bài tập nằm ở cuối trang mà họ chưa tới. Đề 1 là `HopDong` nên khung soạn ở đó lại nhận câu `NhanVien`; bản nháp được lưu theo từng đề (`saveDraft(exercise.id, …)`), nên khi quay lại làm đề 1 thật, câu `SELECT TOP (5) * FROM NhanVien;` còn nằm sẵn trong ô. Bài không nói đừng bấm **Nộp bài** với câu thử, và không nói lần **Chạy** đầu tiên trang sẽ hỏi mã truy cập (`ASK_CODE`), mà nơi nhập mã trang Giới thiệu cũng không nêu.
- Phân loại: Khó tìm / chưa dạy thao tác.
- Đề xuất: một vế tại đây: kéo xuống mục Bài tập, mở bất kỳ đề nào để chạy thử, lần Chạy đầu trang sẽ hỏi mã, đừng bấm Nộp bài với câu thử, và xóa câu thử trước khi làm đề.
- Chưa xác minh: tôi chưa thấy trang chạy câu `NhanVien` trong khung của đề 1 (chỉ đọc nguồn, `run` nhận `exercise.id` và câu SQL).

**Finding 2 — Cần làm rõ. Copy with Headers chỉ dùng được trong SSMS**
- Câu gốc: "chọn vùng kết quả → chuột phải → **Copy with Headers**, rồi dán vào workbook gửi đi" (cuối "Câu lệnh cho tình huống"); Memo: "Chép kèm tiêu đề sang Excel — Copy with Headers trên lưới Results".
- Tác động: lưới Results của trang bài tập là bảng HTML đơn giản (`res-grid`), không có menu này; người chỉ chọn web (lối 1 ở trang Giới thiệu, được phép không dùng SSMS) đọc hướng dẫn mà không làm được, không biết thay bằng gì. Người dùng SSMS cũng chưa biết "chọn vùng" là Ctrl+A hay bôi một phần.
- Đề xuất: ghi "Trong SSMS" trước thao tác, nêu cách chọn cả lưới (Ctrl+A), và một vế cho người dùng web (hoặc nói rõ thao tác này là của SSMS). Không bắt người web cài SSMS.

**Finding 3 — Cần làm rõ. Vì sao chỉ lấy 5 dòng**
- Câu gốc: "**`TOP (5)`** lấy tối đa năm dòng."
- Tác động: bảng chỉ có 48 dòng nên người học tự hỏi vì sao không xem hết ngay. Bài trả lời "TOP là gì" nhưng không trả lời "để làm gì": bảng thật có thể rất dài, xem vài dòng đủ biết cấu trúc và chạy nhanh.
- Đề xuất: thêm một vế ngay sau định nghĩa `TOP`, ví dụ "bảng thật có thể có hàng nghìn dòng, năm dòng đủ để thấy các cột".

**Finding 4 — Cần làm rõ. Câu trả lời chị Hạnh nêu số liệu bài không dạy cách tự kiểm**
- Câu gốc: "danh sách đủ `48` hồ sơ, gồm `3` hồ sơ đã nghỉ `NV020`, `NV033`, `NV041`".
- Tác động: con số `48` đọc được từ Messages/thanh trạng thái (bài có dạy `(n rows affected)`), nhưng bài không bảo người học nhìn chỗ đó cho kết quả cuối. Ba mã người nghỉ và con số 3 không xuất hiện trong bất kỳ kết quả nào của bài (ba cột này không có trạng thái), nên người học phải tin; cách tự kiểm cần `WHERE` (bài 2.2). Câu liền sau còn nói "ba cột này không cho biết ai đã nghỉ", dễ hiểu như mâu thuẫn. Chưa nói thẳng vì sao danh sách gồm người nghỉ: vì câu không có điều kiện lọc.
- Số liệu đúng so với hồ sơ công ty (48 hồ sơ; NV020, NV033, NV041).
- Đề xuất: giữ `48` và chỉ rõ đọc ở Messages (`(48 rows affected)`) hoặc thanh trạng thái; bỏ ba mã hoặc ghi "theo dữ liệu mẫu, cách tự đếm ở bài 2.2"; thêm vế "vì câu không lọc nên có cả người đã nghỉ".

**Finding 5 — Cần cắt. Đoạn "Liệt kê cột giúp…" vừa lặp vừa dẫn người học tới thứ chưa dạy**
- Câu gốc: "Liệt kê cột giúp bản gửi đi chỉ có thông tin cần dùng và giảm dữ liệu trả về. Bảng nguồn thêm cột thì câu lệnh vẫn lấy đúng danh sách đã viết; nếu chính cột được chọn bị đổi tên hoặc xóa, bạn phải sửa câu lệnh. Có thể lưu câu trong file `.sql` để lần sau lấy cùng cấu trúc trên dữ liệu lúc chạy."
- Tác động: câu 1 lặp ý "`*` lấy cả dữ liệu cá nhân" đã nói cuối tiểu mục đầu và ở Ứng dụng 4. Câu 2 chỉ có nghĩa khi đối chiếu với `*` (với `*` thì thêm cột sẽ thêm vào kết quả) mà bài không nói; người mới đọc như một lời dặn của lập trình viên. Câu 3 dùng "file `.sql`" chưa từng giải thích, ngoài mục tiêu bài.
- Đề xuất: bỏ câu 1 và câu 3; nếu giữ câu 2 thì thêm vế "còn `*` sẽ tự mang theo cột mới".

**Finding 6 — Cần cắt. "Ở bài này chỉ cần…" kéo thêm khái niệm chưa gặp**
- Câu gốc: "…lấy các giá trị không trùng ở bài 2.6; tên ngắn cho bảng học ở bài 3.4. Chọn cột để gửi cũng không thay thế phân quyền đọc dữ liệu (bài 6.1)."
- Tác động: "tên ngắn cho bảng" giới thiệu một ý (đặt tên cho bảng) mà người học chưa từng nghĩ tới; phần 2.6 lặp Hay nhầm 5; câu phân quyền trừu tượng với người chưa biết "quyền" ở database là gì (bài 1.1 chỉ nhắc "mỗi người theo quyền được cấp").
- Đề xuất: giữ 2.2 (lọc dòng) và 2.4 (sắp xếp dòng), bỏ "tên ngắn cho bảng" và 2.6 (đã có ở Hay nhầm 5). Câu phân quyền: giữ nếu cần cho Ứng dụng 4, nhưng đưa vào đó.

**Finding 7 — Cần cắt. Lời dặn ở mục Bài tập nhắm vào thứ người học lần đầu chưa gặp**
- Câu gốc: "bôi đen không chọn riêng đoạn như SSMS. Chữ nhắc trong ô mới là placeholder… Nếu bản nháp cũ có dòng bắt đầu bằng `--`, đó là ghi chú; viết câu lệnh ở dòng dưới hoặc xóa ghi chú trước khi gõ."
- Tác động: với người học lần đầu, "như SSMS" chưa có nghĩa nếu họ chỉ dùng web; "placeholder" là từ chuyên môn; "bản nháp cũ có dòng bắt đầu bằng `--`" không có nguồn: `SqlEditor.tsx` chỉ có `placeholder="Viết câu lệnh SQL của bạn ở đây"`, không điền sẵn dòng `--`, còn ghi chú `--` chưa được dạy. Đoạn này có vẻ để xử lý bản nháp của giao diện cũ.
- Đề xuất: giữ "mỗi lần chỉ nhận một câu", bỏ hai câu còn lại, hoặc đổi thành lời thường: "chữ mờ trong ô là gợi ý, tự mất khi gõ".
- Chưa xác minh: tôi không biết người học nào còn nháp cũ.

**Finding 8 — Biên tập. Hay nhầm 3 dùng `N'HoTen'` và giới thiệu chuỗi cố định lần đầu**
- Câu gốc: "`SELECT N'HoTen' AS [Họ tên] FROM NhanVien;` trả chữ `HoTen` ở mọi dòng. Bỏ nháy mới lấy giá trị của cột; tiêu đề có khoảng trắng viết trong ngoặc vuông theo quy ước bài, như `[Họ tên]`."
- Tác động: `HoTen` không có dấu nên không cần `N`; đặt `N` ở đây mâu thuẫn một chút với lời trước ("Không thêm `N` trước ngoặc… chuỗi tiếng Việt mới viết như `N'Trần Thị Mai'`"). Ý "chữ trong nháy đơn là một giá trị cố định, SELECT trả nó ở mọi dòng" là khả năng mới, chỉ xuất hiện trong mục lỗi. Vế cuối nhắc lại quy ước ngoặc đã nói ở tiểu mục alias.
- Đề xuất: dùng `'HoTen'` (hoặc thêm "chữ trong nháy đơn là giá trị cố định"), bỏ vế cuối.

**Finding 9 — Biên tập. Hay nhầm 1: câu mơ hồ và lặp**
- Câu gốc: "năm dòng hiện ra có thể toàn là dòng cũ."
- Tác động: "dòng cũ" không rõ nghĩa (cũ theo mã? theo ngày vào làm?). Ý "TOP không bảo đảm chọn hồ sơ nào" đã nói ở tiểu mục đầu và ở chú thích kết quả; mục này chỉ cần nêu lỗi hiểu nhầm cụ thể.
- Đề xuất: "…không bảo đảm đó là năm mã nhỏ nhất hay năm hồ sơ vào làm gần nhất; thứ tự dòng chưa được chỉ định." Bỏ "toàn là dòng cũ".

**Finding 10 — Biên tập. In đậm và định dạng số chưa nhất quán**
- Câu gốc: "chép ba **cột** cần dùng sang một **workbook** mới…" và "chọn ít cột không làm bớt **dòng**"; "bảng có 12 cột" so với "`48` hồ sơ".
- Tác động: `cột`, `workbook`, `dòng` đã định nghĩa ở 1.1, 1.2; in đậm lại không phải chỗ định nghĩa mà là lặp, loãng điểm nhấn của `danh sách cột`, `câu truy vấn`, `Bí danh cột`. Số có khi dùng code (`48`, `14`, `3`), có khi không (12 cột, 5 dòng, ba cột).
- Đề xuất: giữ đậm cho khái niệm mới và nhãn giao diện; bỏ đậm ba từ trên; chọn một cách cho số.

**Finding 11 — Biên tập. Tiêu đề "đặt tên cột" trái với nội dung**
- Câu gốc: tiêu đề "Câu SELECT đầu tiên: chọn cột và đặt tên cột"; mục tiêu "đặt tiêu đề bằng AS mà không đổi dữ liệu nguồn"; tiểu mục "Tên cột nguồn vẫn là `HoTen`".
- Tác động: "đặt tên cột" dễ hiểu là đổi tên cột trong bảng, đúng điều bài nói là không làm. Bài lại dùng ba từ "tên", "tiêu đề", "bí danh" cho một việc.
- Đề xuất: nếu tiêu đề bị khóa bởi bảng 50 bài thì thôi; còn lại ưu tiên "tiêu đề" xuyên suốt, hoặc thêm vế "đặt tên cho cột trong kết quả" vào chỗ định nghĩa. (Mục tiêu và tiểu mục dùng "tiêu đề" là đủ rõ.)

**Finding 12 — Biên tập. Những câu hỏi nhỏ người mới sẽ nghĩ tới và bài không đụng**
- Viết hoa/thường: bài viết `SELECT`, `FROM` hoa mà không nói đó là thói quen dễ đọc, không bắt buộc. Một vế là đủ.
- Chú thích "dòng đánh dấu là `NV001`…" không nói vì sao đánh dấu dòng này; nếu để nối với dòng `NV001` trong hình Excel thì nói, nếu không thì bỏ `mark`.
- Hàng Memo "Nhìn dữ liệu và trạng thái thao tác" ở vế Excel không có điểm tựa.

**Finding 13 — Cần làm rõ. Mục tiêu có "đọc Messages", nhưng Messages chỉ được đọc ở ca thành công**
- Câu gốc: "**Messages** hiện thông tin lần chạy hoặc lỗi." và "dùng tên đó sẽ báo `Invalid column name 'TenNV'.`"
- Tác động: lần đầu gõ sai, người học thấy chữ đỏ dài. Bài không cho thấy một thông báo lỗi đầy đủ trông thế nào ở tab Messages, cũng không chỉ phần cần đọc (tên đối tượng trong nháy). Trang bài tập tự chuyển sang tab Messages khi lỗi (`setTab('messages')` trong `ExerciseWorkspace.tsx`), nên người chưa biết dễ tưởng "không có kết quả" vì không thấy lưới.
- Chưa xác minh: nguyên văn đầy đủ của thông báo (kèm `Msg`, `Level`, `Line`) và hành vi tab ở SSMS.
- Đề xuất: một khối `Messages` với nguyên văn đã kiểm, hoặc một vế "gặp lỗi, SSMS và trang bài tập chuyển sang tab Messages; phần trong nháy là tên bị sai".

**Giữ được (ghi để không bị sửa nhầm):**
- Tình huống, giả định, khớp hồ sơ công ty; mạch Excel → SQL của ba tiểu mục; sơ đồ hai bước đúng thứ tự logic; Hay nhầm 2, 4, 5; Ứng dụng.
- `(5 rows affected)` được giải thích đúng (số dòng trả về, không phải số dòng bị sửa, không phải tổng hồ sơ).
- Câu đổi thứ tự cột dùng `PhongBan` thay vì `NhanVien`, không trùng đáp án đề nào (đề 3 dùng `NhanVien`).
- Không câu nào trong bài hứa quá mức: `TOP` là tối đa, kết quả không `ORDER BY` thì thứ tự có thể khác, "chọn cột không thay thế phân quyền".

## 3. Rà phần đổi ở trang Giới thiệu

| Vị trí | Nhận xét | Đánh giá |
|---|---|---|
| "Bạn bắt đầu viết SQL từ bài 2.1, theo một trong ba lối" | Khớp bài 2.1 ("chưa có nơi thực hành thì chọn một trong ba lối"); ba lối nhất quán với bài tập: lối web cần mã, lối SSMS dùng tài khoản được cấp, lối bản riêng không có chấm. Không bắt người chỉ dùng web kết nối SSMS | Giữ được |
| Lối 1 "Có mã truy cập: bấm Làm bài…" | Không nói nơi nhập mã. Trang bài tập chỉ hỏi mã khi bấm Chạy/Nộp lần đầu (`ASK_CODE`: "Nhập mã truy cập để chạy bài tập"). Người mới đọc "có mã" rồi tìm ô nhập trước | **Cần làm rõ**, nhẹ. Thêm vế "trang sẽ hỏi mã khi bạn bấm Chạy lần đầu" |
| "Trên database dùng chung, ở các bài đầu chỉ chạy các câu đọc có trong bài" | Đổi "Level 1" thành "các bài đầu" hợp lý vì bài viết SQL đầu tiên giờ là 2.1 | Giữ được |
| Hình thanh công cụ + chú thích "Ô có viền xanh… Nút ✓ (Parse) chỉ kiểm cú pháp" | Có ích: người mới nhìn thấy đâu là ô database, đâu là Execute. Nút Parse chỉ nhắc để tránh nhầm, bài 2.1 không dùng đến | Giữ được |
| "SSMS chỉ chạy đoạn đang bôi đen; không bôi đen thì chạy cả cửa sổ" | Đúng và là điều người mới cần ngay khi có nhiều câu trong cửa sổ. Nhưng đoạn này nằm cuối mục kết nối dài; bài 2.1 chỉ trỏ tới `#ket-noi-ssms` (đầu mục), người đã kết nối rồi phải cuộn tìm | **Biên tập**. Thêm anchor nhỏ (ví dụ "Chạy câu lệnh") rồi trỏ tới đó, hoặc một câu trong bài 2.1 |
| "Edit Top 200 Rows: đó là lưới sửa dữ liệu dùng chung, không phải chế độ xem an toàn" | "dùng chung" đọc mơ hồ (lưới dùng chung? dữ liệu dùng chung?). Ý đúng: lưới cho sửa trực tiếp dữ liệu của database dùng chung | **Biên tập** |
| "`SELECT INTO` còn tạo bảng mới" | Là cảnh báo đúng, nhưng giới thiệu `SELECT INTO` cho người chưa viết câu nào; không hại, chỉ nên nói thẳng "câu bắt đầu bằng SELECT vẫn có thể ghi dữ liệu" thay vì để người học đi tra tên | Giữ được; **Biên tập** nhỏ |
| "Nếu chọn nhầm database vẫn không tìm thấy bảng cần xem" | Không có nguyên văn lỗi người học sẽ thấy | **Chưa xác minh**. Nên ghi thông báo thật sau khi người viết chạy |
| Lỗi `Must specify table to select from.` khi bôi đen `SELECT TOP (5) *` | Tôi không thể xác nhận nguyên văn và điều kiện xảy ra bằng đọc nguồn | **Chưa xác minh** |

## 4. Bảng tiền đề từng bài tập

Cách làm: đọc đề, xác định cách giải từ kiến thức bài 2.1 và bài trước, rồi mới đối chiếu YAML. Không chép đáp án.

| Đề | Cần kiến thức gì | Đã dạy ở đâu | Còn thiếu / vướng |
|---|---|---|---|
| 2-1-1 Toàn bộ hợp đồng | Lấy mọi cột bằng dấu `*`; tên bảng hợp đồng; không giới hạn dòng (không `TOP`) | `*` và `FROM` ở tiểu mục đầu; tên `HopDong` ở bài 1.2, 1.3, 1.5 và trong mục Bài tập ("xem Object Explorer hoặc Sơ đồ database"); `TOP` là tối đa n dòng | Không thiếu kiến thức. Vướng thao tác: nếu đã chạy thử câu `TOP (5)` trong khung của đề này thì nháp còn nguyên (finding 1) |
| 2-1-2 Rà soát email | Chọn hai cột theo thứ tự `HoTen`, `Email`; tên bảng `NhanVien` | Liệt kê cột ngăn bằng dấu phẩy, thứ tự cột theo `SELECT` ("Chọn những cột cần gửi") | Không thiếu. Đề nêu sẵn tên hai cột. Chỉ lưu ý "tìm hồ sơ còn thiếu email" là mục đích, không cần `WHERE` ở đề này; người học muốn lọc thì chưa có công cụ (bài 2.2, 2.5), nhưng đề đã nói rõ chỉ lấy hai cột |
| 2-1-3 Ngày vào làm trước mã nhân viên | Đổi vị trí cột; ba cột theo thứ tự `NgayVaoLam`, `MaNV`, `HoTen`; không alias | Ví dụ `SELECT TenPB, MaPB FROM PhongBan;` ("đổi vị trí cột") | Không thiếu. Chưa có ví dụ có kết quả hiển thị nên người học chưa thấy cột nguồn khác thứ tự (xem finding 12, không bắt buộc) |
| 2-1-4 Danh mục chức danh có tiêu đề tiếng Việt | Tìm bảng chức danh và hai cột tên/mã; hai alias có khoảng trắng và dấu bằng ngoặc vuông; cột tên trước cột mã | `AS`, ngoặc vuông, không `N` ("Đặt tiêu đề mà không đổi cột nguồn"); tìm tên bảng/cột qua Object Explorer hoặc Sơ đồ database (nêu ở bài và đầu Bài tập) | Không thiếu kiến thức, nhưng tên bảng/cột phải tự tìm: đề không nêu tên cột nguồn, bài không có ví dụ nào về `ChucDanh` hay tên cột chức danh. Trường hợp thấy `PhongBan(MaPB, TenPB)` ở trang Giới thiệu sẽ đoán được quy ước `Ten…`/`Ma…`, nhưng vẫn cần xem sơ đồ. Bộ chấm không so tiêu đề, đề tự nhắc đối chiếu nên có chỗ dựa |

Đánh giá: bốn đề làm được bằng kiến thức đã dạy trong bài và bài trước; đề 1, 2, 3 nêu tên đối tượng, đề 4 buộc người học dùng công cụ xem cấu trúc, đúng mục đích bài. Không đề nào cần `WHERE`, `ORDER BY`, `DISTINCT` hay hàm. Kiểm đáp án chưa nằm nguyên văn trong bài: lời giải mẫu của bài dùng `NhanVien` và `PhongBan`, không trùng đáp án đề nào.

Chưa xác minh: khẳng định "bộ chấm so số cột, số dòng, giá trị, giữ thứ tự cột và không so tên tiêu đề" (tôi không đọc mã chấm, không nộp bài); cách trang xử lý một câu lệnh hợp lệ khác bảng với đề.

## 5. Ưu tiên

1. Sửa lối vào web ở tiểu mục đầu (finding 1) và nói rõ Copy with Headers là của SSMS (finding 2): hai chỗ người mới có thể dừng ngay tại bước làm, chưa phải do kiến thức.
2. Thêm một vế "vì sao TOP" (finding 3), chỉnh câu trả lời chị Hạnh (finding 4), thêm cách đọc lỗi (finding 13).
3. Cắt (findings 5, 6, 7): đây là phần thừa rõ nhất, giúp giảm tải ở bài dài nhất cấp độ 2.
4. Biên tập (findings 8 đến 12) và hai điều chỉnh nhỏ ở trang Giới thiệu.

Không tìm thấy lỗi kiến thức sai có căn cứ nào trong bài hay trong phần Giới thiệu đã đọc. Số liệu khớp hồ sơ công ty; mọi mục "Cần sửa" là 0.

## 6. Nguồn và giới hạn

- Nguồn: các file nêu ở mục 1; kiểm bằng đọc nguồn và đọc văn bản HTML trong `dist`, đối chiếu một phần bằng script đọc file.
- Số liệu so với `docs/ho-so-cong-ty.md` (48 hồ sơ, ba hồ sơ nghỉ NV020/NV033/NV041, 14 hồ sơ `KD`, giá trị `NV001` đến `NV005`) và với các bước `RunFlow` bài 2.2.
- Chưa xác minh (cần người viết chạy hoặc kiểm UI): (a) mọi câu SQL và số trong bài chạy ra như mô tả; (b) nguyên văn lỗi `Invalid column name 'TenNV'.` và `Must specify table to select from.`; (c) Excel khi dán chuỗi `yyyy-mm-dd` từ SSMS có thành ngày thật hay không, tùy cài đặt vùng; (d) hành vi nút Sao chép, F5, drawer, bôi đen trong SSMS và trên trang bài tập; (e) bộ chấm bốn đề; (f) chạy câu `NhanVien` trong khung đề 1 trên web; (g) phản hồi của Messages ở SSMS cho câu lỗi.
- Không tương tác browser, không chạy SQL/API, không đọc `HRM_Demo.sql`, `.env`, report cũ hay ma trận tác giả. File duy nhất tôi tạo ngoài report là các script đọc HTML trong thư mục tạm của phiên (không thuộc repo).

## 7. Kết luận

Với kiến thức Excel cơ bản và bài 1.1 đến 1.5, bài 2.1 đủ để làm bốn đề: `SELECT`, `FROM`, `*`, `TOP`, danh sách cột, thứ tự cột và `AS` đều được giảng trước phần ôn, và đề 4 dùng đúng công cụ tìm tên mà bài chỉ. Điểm còn vướng không nằm ở kiến thức mà ở thao tác: đường chạy thử trên web (finding 1), Copy with Headers chỉ có ở SSMS (finding 2), và vài chỗ "vì sao" chưa trả lời (finding 3, 4, 13). Bài cũng có khoảng 3 đoạn nên cắt để đúng mạch (findings 5, 6, 7). Bài không còn đọc như hai bài dán nối. Đánh giá này không chứng nhận SQL hay giao diện đã chạy đúng.

## 8. Tổng số finding

| Mức | Số |
|---|---|
| Cần sửa | 0 |
| Cần làm rõ | 5 trong bài (1, 2, 3, 4, 13) + 1 ở trang Giới thiệu (nơi nhập mã) |
| Cần cắt | 3 (5, 6, 7) |
| Biên tập | 5 trong bài (8, 9, 10, 11, 12) + 3 ở trang Giới thiệu (anchor chạy câu lệnh, "dùng chung", `SELECT INTO`) |
| Giữ được | 1 nhóm (liệt kê ở cuối mục 2.9) + 5 dòng ở trang Giới thiệu |
| Chưa xác minh | 7 mục, liệt kê ở mục 6 |
