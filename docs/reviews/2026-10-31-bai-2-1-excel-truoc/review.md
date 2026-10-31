# Review độc lập bài 2.1 sau khi sắp lại theo hướng Excel trước, SQL sau

## 1. Phạm vi, phiên bản, công cụ thực tế

- Bài: `src/content/lessons/2-1-chon-cot-dat-ten-cot.mdx`; đề: `src/content/exercises/2-1-chon-cot-dat-ten-cot.yaml` (4 đề).
- Source: commit `785a1d2` trên nhánh `feat/lesson-2-1-excel-first`; `git status` sạch lúc bắt đầu.
- Build: `dist/bai/2-1-chon-cot-dat-ten-cot/index.html` và `bai-tap/1..4/index.html`, mtime 13:54 ngày 31/10/2026. Giờ commit là 13:54:58. Tôi không biết thứ tự build/commit trong phút đó, nhưng đã so nội dung HTML với MDX ở các câu đặc trưng (đoạn chạy câu lệnh, đoạn NV001, Hay nhầm, Memo) và thấy khớp.
- Đã đọc: AGENTS.md, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, spec `2026-10-31-lesson-2-1-excel-first-design.md` (chỉ các mục Ý định, Mục tiêu, Phần chính mới, Quyết định), bài mẫu 2.2 và 1.1, các bài 1.2–1.5, `src/pages/gioi-thieu.astro`, MDX/YAML bài 2.1, HTML đã render của bài và bốn trang đề.
- Không đọc: report cũ ở `temp/review` và `docs/reviews`, `HRM_Demo.sql`, `.env`. Không kết nối database, không chạy SQL, API hay runner, không mở browser.
- Công cụ thực tế: Read, Grep, Bash (python chỉ để bóc HTML thành chữ và đếm từ), Write (chỉ file report này). Model của phiên là `claude-sonnet-5-5`; mức effort tôi không tự xác định được nên không ghi.
- Ngoài HTML của bài, tôi đọc thêm bản đã build `dist/_astro/ExerciseWorkspace.*.js` và `api/src/core.ts`, `runner.ts` (đọc nguồn, không chạy) để biết trang đề hoạt động ra sao ở hai chỗ nêu ở F1 và F2. Đây là bằng chứng đọc mã, không phải kiểm thực tế.

Tổng kết số finding: **Cần sửa 0 · Cần làm rõ 5 · Cần cắt 1 · Biên tập 3** (và 9 mục Giữ được ở mục 2).

## 2. Rà theo thứ tự bài

### 2.0 Mục tiêu, tình huống, Key

Giữ được. `goal` đo được (viết và chạy câu SELECT đầu, chọn cột, đúng thứ tự, đặt tiêu đề bằng AS, đọc Results và Messages) và cả sáu vế đều có chỗ trong thân bài. Tình huống khớp hồ sơ công ty: 48 hồ sơ, ba người đã nghỉ là NV020, NV033, NV041 (đối chiếu `ho-so-cong-ty.md` mục 3 và 7). `Key` đã bỏ vế "xem bảng", đúng quyết định trong spec.

### 2.1 Từ mở sheet và chép cột đến SELECT

Mạch: Excel (mở sheet, chép ba cột) → hình → một câu về lý do chép riêng → "Trong SQL không có sheet nào đang mở…" → `FROM`, `SELECT`, danh sách cột → thứ tự cột → `*` → `TOP`.

**Giữ được (G1).** Chuyển từ Excel sang SQL ở đoạn này tự nhiên. Hình Excel đi trước lời giải thích SQL, ba ô đánh dấu `A1`, `B1`, `E1` đúng là ba cột của câu cuối (`MaNV`, `HoTen`, `NgayVaoLam`), giá trị ba hồ sơ khớp bảng ở mục 3 hồ sơ công ty và khớp RunFlow. Vế "ẩn cột rồi gửi nguyên workbook thì dữ liệu thừa vẫn ở trong file" đúng và trả lời "vì sao phải chép riêng", rồi được nối lại bằng đoạn nói `*` lấy cả `SoCCCD`, `Email`.

**Giữ được (G2).** Người học hiểu `SELECT` và `FROM` trước khi gặp câu cuối. Mỗi từ khóa có một tương ứng Excel ngay lần xuất hiện (`FROM` như chọn sheet, `SELECT` như chép cột), có ví dụ nội dòng `SELECT MaNV, HoTen FROM NhanVien;` và ví dụ đổi thứ tự `SELECT TenPB, MaPB FROM PhongBan;`. Tôi kiểm khẳng định "trong bảng nguồn mã đứng trước" bằng sơ đồ ở bài 1.5: `PhongBan` có `MaPB` rồi `TenPB`, đúng. Việc `FROM` được nói trước nhưng viết sau `SELECT` chỉ được giải thích ở dòng nhắc trên sơ đồ cuối bài ("Bạn viết SELECT trước, nhưng theo thứ tự logic, SQL Server xét FROM trước"). Tôi coi là đủ, vì sơ đồ nằm ngay sau câu chính.

**F4 · Cần làm rõ · Đoạn `TOP (5)` và khối "Xem thử một bảng, chỉ để đọc".**
- Câu gốc: "TOP (5) viết ngay sau SELECT để lấy tối đa năm dòng, giúp xem mẫu mà không đưa cả bảng lớn lên màn hình".
- Mục đích có được nêu ("xem mẫu") và rào đúng quy ước: nói "tối đa", nói chưa có `ORDER BY` thì không bảo đảm chọn hồ sơ nào, và Excel "lướt vài dòng đầu" được phân biệt với `TOP` không có thứ tự. Nội dung không sai.
- Cái người mới vấp: (a) đoạn này không phục vụ tình huống lẫn bốn đề, nên người học không có lý do để ghi nhớ; (b) "bảng lớn" trừu tượng, vì bảng duy nhất họ đã thấy ở bài này chỉ có 48 dòng và bài không cho ví dụ bảng lớn; (c) khối code đầu tiên của bài là đoạn không chạy, trong khi câu `SELECT … FROM` đầu tiên chỉ có dạng nội dòng, không có kết quả, và câu đầy đủ chạy được phải đợi sau cả hai cặp Excel/SQL; (d) `TOP` được nhắc ở bốn nơi (đoạn này, Hay nhầm 1, Ứng dụng 1, Ghi nhớ hàng 1) dù người học không chạy lần nào; (e) tiêu đề tiểu mục "Từ mở sheet và chép cột đến SELECT" không hứa `*` và `TOP`, nhưng nửa sau tiểu mục là hai ý này.
- Tác động: không chặn việc học, nhưng làm tiểu mục đầu nặng hơn cần (bảy ý mới: truy vấn, `FROM`, `SELECT`, danh sách cột, thứ tự cột, `*`, `TOP`).
- Đề xuất, giữ nguyên quyết định giữ `TOP` của người làm khóa học: thêm một vế "chỉ cần nhận ra; bài 2.4 mới dùng cùng `ORDER BY`" để người học biết không phải luyện; và/hoặc một vế ví dụ bảng lớn, như `ChamCong` (hồ sơ công ty ghi 806 dòng, tác giả cần xác minh lại trước khi dùng). Không cần chạy thêm bước giữa bài.

**F6 · Cần cắt (tùy chọn) · Câu cuối của đoạn về `*`.**
- Câu gốc: "Bảng nguồn thêm cột thì `*` lấy thêm cột mới, còn danh sách đã viết vẫn giữ nguyên; nếu chính cột được chọn bị đổi tên hoặc xóa, bạn phải sửa câu lệnh."
- Câu đúng về kỹ thuật, nhưng đưa thêm lý do thứ hai (bảo trì câu lệnh) bên cạnh lý do đã đủ (dữ liệu cá nhân bị lấy theo, nên bản gửi đi phải chọn đúng cột). Không mục tiêu, tình huống hay đề nào cần nó. Quy ước mục 1 bảo bỏ chi tiết ngoài phạm vi.
- Tác động: thêm tải cho người mới ở tiểu mục đã đông ý; bỏ không làm mất điều gì để làm đề.
- Đề xuất: bỏ, hoặc rút còn một vế nếu tác giả muốn giữ.

**Biên tập nhỏ của tiểu mục này** gom ở F9.

### 2.2 Từ sửa dòng tiêu đề đến AS

**Giữ được (G3).** Cặp Excel/SQL thứ hai khớp mô hình bài 2.2: hình bản gửi đi với `A1`, `B1`, `C1` đánh dấu, rồi định nghĩa `AS`. Giải thích "dấu ngoặc không hiện trong tiêu đề" và "tên cột nguồn vẫn là `HoTen`, giá trị và kiểu không đổi, alias không lưu vào bảng" đều đúng và gọn. Câu "Ở bài này chỉ cần…" có và trỏ đúng bài 2.2, 2.4.

**F3 · Cần làm rõ · Vì sao và để làm gì khi đặt tiêu đề bằng `AS`.**
- Câu gốc: "Alias chỉ có trong câu lệnh đó, không được lưu thành tên mới trong bảng."
- Bài trả lời "AS làm gì", nhưng không nói hai điều người học khó tính sẽ hỏi: (1) vì sao không đổi hẳn tên cột trong bảng như đổi ô tiêu đề trong Excel; (2) vì sao làm việc này trong SQL thay vì sửa tiêu đề sau khi dán vào Excel. Mục tiêu của bài nêu "không đổi dữ liệu nguồn" nhưng thân bài chưa gắn lý do. Bài 2.2 kết cặp tương ứng bằng câu "SQL ghi điều kiện ngay trong câu lệnh để người khác đọc và chạy lại"; bài này chưa có câu tương đương. Ý (1) mới có dạng ẩn ở Ứng dụng ("giữ tên kỹ thuật trong bảng nguồn").
- Tác động: người học làm đúng nhưng không biết lý do, dễ hỏi lại ở bài sau.
- Đề xuất, một vế mỗi ý: (1) hình Excel thứ hai đã là bản chép, nên cũng như Excel, tiêu đề được sửa ở bản kết quả, còn bảng nguồn dùng chung vẫn như cũ; (2) tiêu đề nằm trong câu lệnh, chạy lại lần sau vẫn đủ tiêu đề, không phải sửa tay.

### 2.3 Câu lệnh cho tình huống

Câu chính dùng toàn bộ các mảnh đã giảng (`SELECT`, danh sách cột, `AS`, ngoặc vuông, `FROM`, `;`), không có mảnh nào lạ. Tôi thử đọc ngược: mỗi mảnh của câu đều đã được định nghĩa trong hai tiểu mục trước. Kết luận: **Giữ được (G4)**.

**F1 · Cần làm rõ · Hướng dẫn tự chạy.**
- Câu gốc: "Trên web, kéo xuống mục Bài tập, bấm Làm bài ở bài 1, nhập câu trên rồi bấm Chạy (F5)… chỉ bấm Chạy, chưa bấm Nộp bài. Trong SSMS, sau khi kết nối, làm theo mục chạy câu lệnh."
- Nhất quán với trang Giới thiệu và trang đề: các neo `#ket-noi-ssms`, `#chay-cau-lenh`, `#chon-noi-thuc-hanh` đều có trong `dist/gioi-thieu`; nút "Chạy (F5)", "Nộp bài", "Sơ đồ database" có trong `ExerciseWorkspace`; trang hỏi mã truy cập khi chạy lần đầu; câu hỏi nơi nhận mã được trả lời ở "chọn một trong ba lối". Người chỉ dùng web không bị bắt kết nối SSMS. Phần này **Giữ được (G5)**.
- Ba chỗ còn vướng:
  1. **Web.** "Làm bài" dẫn sang trang riêng (`/bai/2-1-…/bai-tap/1/`, breadcrumb "Bài 2.1 … › Bài tập 1/4"). Đoạn đọc Results, Messages, trả lời chị Hạnh và RunFlow nằm sau chỗ người học đã rời trang, và bài không nói "xong quay lại đây". "Kéo xuống" cũng phải qua sơ đồ chạy và ba mục (Hay nhầm, Ứng dụng, Ghi nhớ) mới tới Bài tập.
  2. **Bản nháp còn lại.** Đọc `ExerciseWorkspace.*.js`: bản nháp lưu theo id đề (`sqlserver-course:draft:<id>`) và nạp lại khi mở. Câu thử nhập vào đề 1 sẽ còn nằm trong ô khi người học quay lại làm đề 1 thật; Nộp bài lúc đó chấm theo đề 1 và báo chưa đúng. Chưa chạy thật nên đây là chưa xác minh, nhưng căn cứ mã rõ. Câu "chưa bấm Nộp bài" cũng không nói vì sao.
  3. **SSMS.** Mục `#chay-cau-lenh` hướng dẫn gõ `SELECT * FROM PhongBan;` để kiểm kết nối. Người học phải tự suy ra là thay câu bằng câu của bài.
- Tác động: người mới vẫn làm được, nhưng đây là lần đầu họ chạy SQL, và lỗi nhỏ ở bước này dễ thành "không biết mình làm sai ở đâu".
- Đề xuất: thêm vế "mở sang trang riêng, chạy xong quay lại đây đọc kết quả"; "xóa câu thử trước khi làm đề 1, vì Nộp bài chấm theo đề 1"; ở SSMS "dán câu trên vào cửa sổ New Query rồi F5".

**F7 · Biên tập · Câu nối kết quả với hình Excel.**
- Câu gốc: "Hình trích năm trong 48 hồ sơ của dữ liệu mẫu; dòng đánh dấu NV001 là dòng đầu trong hai hình Excel, ngày vào làm 2024-03-01."
- Ý định hợp lý (nối hồ sơ `NV001` ở hai hình Excel với kết quả SQL, và giải thích ngày hiển thị `2024-03-01` khác `01/03/2024`), nhưng câu đọc khó: "dòng đánh dấu… là dòng đầu trong hai hình Excel" phải đọc lại hai lần mới hiểu là cùng hồ sơ.
- Đề xuất: viết thẳng một vế, ví dụ cùng `NV001` đó: Excel hiện `01/03/2024`, kết quả hiện `2024-03-01`, cùng một ngày.

**F2 · Cần làm rõ · Câu trả lời chị Hạnh có một điểm tự chứng minh vòng.**
- Câu gốc: "danh sách đủ 48 hồ sơ, đúng số Messages báo".
- Messages chỉ báo số dòng của chính kết quả, nên "đúng số Messages báo" không chứng minh "đủ". Tính đầy đủ đến từ việc không có điều kiện lọc và từ số dòng của bảng gốc (48, bài 1.2). Người học khó tính sẽ hỏi "đủ so với cái gì".
- Cũng cần ghi chú: "3 hồ sơ đã nghỉ là NV020, NV033, NV041" đúng theo hồ sơ công ty, nhưng người học không tự kiểm được bằng ba cột đang xem. Điều này chấp nhận được (quy ước không bắt thêm câu lệnh chỉ để chứng minh số liệu), nhưng nên nói là "theo dữ liệu mẫu".
- Phần còn lại của đoạn đúng và đủ: phân biệt việc database làm (trả đúng ba cột, 48 dòng) với quyết định nghiệp vụ (cần cột trạng thái thì chị Hạnh bổ sung yêu cầu). **Giữ được (G6)** cho phần này.
- Đề xuất: thay "đúng số Messages báo" bằng "bằng số dòng của bảng `NhanVien`" (hoặc "bằng 48 dòng của bảng, bài 1.2"), vì không lọc dòng nào.

**Đọc Results và Messages. Giữ được (G7).** Giải thích cột số thứ tự bên trái, `(48 rows affected)` là số dòng trả về chứ không phải số dòng bị sửa, và lỗi `Invalid column name 'TenNV'.` là đúng và đủ cho người mới. Trang đề có hai tab Results/Messages và Messages mặc định ghi `(N rows affected)` (đọc từ JS), nên mô tả không lệch với web. Chưa xác minh bằng chạy: nội dung thực của Messages ở web với một câu SELECT có đúng 48 hay không (UI lấy `rowsAffected[0]` từ driver), và dòng lỗi hiển thị ở web có đúng như bài ghi hay không.

**Copy with Headers.** Giữ được ở mức nội dung (SSMS có lệnh này và lưới Results của trang đề không có; bài nói đúng như vậy). Chưa xác minh bằng chạy: dán vào Excel có tự chuyển `2024-03-01` thành ngày hay không, và hiển thị ra sao tùy cấu hình vùng của máy. Câu cuối "Bản chép phản ánh dữ liệu lúc lấy" lặp một ý đã có ở bài 1.1 nhưng chỉ một vế, nên không cần cắt.

### 2.4 SQL Server chạy câu này thế nào

**Giữ được (G8).** Hai bước `FROM` rồi `SELECT`; query, focus và `sql` của từng bước khớp nhau (kiểm trên HTML đã render: không lộ `\t`, không lộ backtick, ngoặc vuông giữ nguyên; câu đơn giản nên không cần thụt lề). Số liệu bước 1 (12 cột, 48 dòng, danh sách cột) khớp sơ đồ ở bài 1.5; ba dòng mẫu khớp bài 2.2. Lời drawer bắt đầu từ từ khóa ("`FROM` cho biết…", "`SELECT` liệt kê…"), có số dòng thật (48 → 48). Đoạn giới thiệu nói rõ là thứ tự logic. Đúng quy ước.

### 2.5 Hay nhầm, Ứng dụng, Ghi nhớ

**Hay nhầm. Giữ được (G9).** Năm ý đều đúng theo hiểu biết T-SQL của tôi (chưa chạy): thiếu dấu phẩy thành `MaNV AS HoTen`; `'HoTen'` trong nháy là giá trị cố định; tiêu đề không được kiểm nghĩa; chọn một cột không bỏ trùng (KD lặp 14 lần khớp hồ sơ công ty). Mỗi ý tự giải thích một vế, kể cả hai chuyện chưa dạy ở thân bài (có thể bỏ `AS`, chữ trong nháy đơn) nên không bắt người học dùng kiến thức chưa dạy. Mục này không phải kiến thức cốt lõi để làm bốn đề nên được phép nằm ở đây. Gợi ý nhỏ: thứ tự hiện đặt `TOP` ở ý 1 trong khi ý 2 (thiếu dấu phẩy) gần với lỗi người mới sẽ gặp khi gõ câu chính hơn.

**Ứng dụng.** Bốn ý, đúng chủ đề, có mục đích cụ thể, ý 4 có điều kiện đúng ("không thay thế phân quyền đọc dữ liệu"). Không phát hiện vấn đề.

**F8 · Biên tập · Ghi nhớ có hai điểm tựa Excel chưa xuất hiện trong thân bài.**
- Câu gốc: "Nhìn ô dữ liệu và hộp báo lỗi" ↔ "Results: dữ liệu; Messages: thông tin hoặc lỗi"; "Đặt cột theo mẫu" ↔ "Thứ tự cột theo SELECT…".
- Thân bài không dùng "hộp báo lỗi" hay "đặt cột theo mẫu" làm điểm tựa Excel. Memo vốn chỉ nên nhắc lại ý đã có (template: "Điểm tựa Excel đã dùng trong bài"). Ngoài ra "hộp báo lỗi" thu hẹp Messages, trong khi bài nói Messages cũng báo thông tin thường.
- Đề xuất: chỉnh hai hàng về điểm tựa đã dùng ("chép cột", "sửa dòng tiêu đề"), hoặc bỏ hàng Results/Messages khỏi cột Excel.

**F5 · Cần làm rõ · Lời dẫn mục Bài tập.**
- Câu gốc: "Trang bài tập chạy cả khung soạn, mỗi lần chỉ nhận một câu."
- "Khung soạn" là cách gọi chưa ai dạy (người học chưa biết "trình soạn thảo"); "chạy cả" đối lập ngầm với SSMS chạy đoạn bôi đen (ở trang Giới thiệu) nhưng bài không nói; "một câu" tương ứng với thông báo "Mỗi lần chỉ chạy một câu lệnh." trong mã trang đề. "Bộ chấm" ở câu sau cũng chưa được gọi tên.
- Phần còn lại của mục này (chữ mờ là gợi ý, chấm không so tiêu đề, tự đối chiếu tiêu đề) rõ và đúng với trang đề.
- Đề xuất: viết "Ô nhập chạy toàn bộ nội dung bạn gõ, và mỗi lần chỉ chạy một câu lệnh" (hoặc gọn hơn), và dùng "hệ thống chấm" thay "bộ chấm".

**F9 · Biên tập · Gộp các chỗ nhỏ trong tiểu mục chọn cột và AS.**
- "Hai cột còn lại không gửi" (đoạn giới thiệu hình Excel đầu): trong hình, nhưng bảng có 12 cột, người đọc có thể hiểu "hai cột còn lại của cả sheet". Thêm "trong hình".
- "Câu này chỉ đọc, không sửa bảng" đứng sau "Cột không chọn không có trong kết quả…": "câu này" mơ hồ, và dễ bị đọc thành "mọi SELECT chỉ đọc", trong khi trang Giới thiệu nói `SELECT INTO` còn tạo bảng. Chỉ rõ "câu `SELECT … FROM` như trên".
- "với câu đọc một bảng ở bài này, chọn ít cột không làm bớt dòng": đúng, nhưng "câu đọc một bảng ở bài này" nặng; có thể viết "bài này chưa có điều kiện lọc nên chọn ít cột không làm bớt dòng".
- "Không thêm `N` trước ngoặc: đây là một tên, không phải chuỗi giá trị": nối được với bài 1.3 và chặn nhầm lẫn có thể xảy ra, nhưng đưa thêm khái niệm "chuỗi giá trị" và chữ trong nháy trước khi Hay nhầm 3 dạy "nháy đơn". Có thể giữ bằng cách chuyển sang Hay nhầm, hoặc cắt.
- "từ khóa" trong "viết hoa từ khóa chỉ giúp dễ đọc" chưa được định nghĩa; "câu truy vấn", "câu lệnh", "câu" dùng xen kẽ. Một vế "(`SELECT`, `FROM` là từ khóa)" và "câu truy vấn, còn gọi là câu lệnh" là đủ. "Gửi câu truy vấn" cũng chưa nói gửi tới SQL Server, dù bài 1.1 đã dạy.

## 3. Bảng tiền đề từng bài tập

Tôi đọc đề và tự xác định cách làm từ kiến thức bài 1.x và bài này, rồi mới đối chiếu YAML. Bảng không chép đáp án.

| Đề | Cần kiến thức gì | Dạy ở đâu | Còn thiếu gì | Đánh giá |
|---|---|---|---|---|
| 1. Toàn bộ hợp đồng | Lấy mọi cột của một bảng; tên bảng hợp đồng; nơi chạy; biết `NULL` ở `NgayKetThuc` | Dấu `*` ở 2.1 mục chọn cột; `HopDong` ở 1.2, 1.3 (hình Ssms), 1.5 (sơ đồ); `NULL` ở 1.3; cách chạy ở mục Câu lệnh | Không thấy thiếu. Trang đề liệt kê 6 cột cần có, giúp tự đối chiếu | Đủ kiến thức |
| 2. Rà soát email | Chọn hai cột theo thứ tự đề nêu, không lọc dòng | Danh sách cột, thứ tự cột ở 2.1; tên cột có ngay trong đề | Đề nói "để tìm hồ sơ còn thiếu email", có thể làm người học muốn lọc (chưa dạy, bài 2.5); đề đã nói rõ "mọi hồ sơ" nên không chặn | Đủ kiến thức; rủi ro hiểu nhầm nhẹ |
| 3. Ngày vào làm đứng trước mã | Đổi thứ tự cột theo thứ tự viết sau `SELECT`; không cần tiêu đề | Ví dụ đổi vị trí cột ở 2.1 | Không thấy thiếu; tên ba cột có trong đề | Đủ kiến thức |
| 4. Danh mục chức danh có tiêu đề tiếng Việt | Tìm tên bảng danh mục chức danh và hai cột tên/mã; đặt tiêu đề có khoảng trắng bằng alias và ngoặc vuông; đúng thứ tự cột | Alias và ngoặc vuông ở 2.1; thứ tự cột ở 2.1; cách tìm: Object Explorer hoặc "Sơ đồ database" (lời dẫn Bài tập) và sơ đồ ở 1.5 | Đề không nêu tên bảng và tên cột; phải tự tra. Quy ước đặt tên cặp mã/tên đã thấy ở `PhongBan` (`MaPB`/`TenPB`) nên đoán và đối chiếu được. Đây là kỹ năng tra cứu được bài chỉ rõ, không phải thiếu kiến thức | Đủ kiến thức; chặng tra tên là đã dạy nhưng phải tự tìm |

Bài không có mục tự kiểm tra; quy ước chỉ yêu cầu khi có (bài có Bài tập thì phần ôn là Ghi nhớ và bốn đề). Không có vấn đề.

## 4. Câu "tại sao, để làm gì" tôi tự đặt ra

| Câu hỏi | Bài đã trả lời chưa |
|---|---|
| Vì sao chép riêng ba cột mà không ẩn cột? | Có, đoạn "Chỉ ẩn cột rồi gửi nguyên workbook…" |
| Vì sao SQL cần `FROM`? | Có: "không có sheet nào đang mở", `FROM` thay việc chọn sheet |
| Vì sao thứ tự cột theo `SELECT`, cần để làm gì? | Có ví dụ `TenPB`, `MaPB`; mục đích (mẫu cần điền) thể hiện ở đề 3 chứ chưa nói ở thân bài, chấp nhận được |
| Vì sao không dùng `*` cho bản gửi? | Có: lấy cả `SoCCCD`, `Email` |
| `TOP` để làm gì? | Chỉ một phần (F4) |
| Vì sao dùng alias thay vì đổi tên cột? | Chưa, hoặc chỉ ẩn ở Ứng dụng (F3) |
| Vì sao ngoặc vuông? | Có: tên có khoảng trắng |
| Vì sao thứ tự dòng khác hình? | Có: chưa có `ORDER BY`, kèm bài 1.2 về dòng không cố định |
| Vì sao `(48 rows affected)` khi chỉ đọc? | Có |
| Vì sao thấy 48 là "đủ"? | Chưa đủ chặt (F2) |
| Vì sao chưa bấm Nộp bài? | Chưa (F1) |
| Vì sao viết `SELECT` trước nhưng `FROM` xử lý trước? | Có, ở dòng nhắc trên RunFlow |

## 5. Ưu tiên

1. F1 (hướng dẫn tự chạy) và F2 (câu trả lời chị Hạnh): ảnh hưởng đúng vào chặng quan trọng nhất của bài, thêm vài vế là đủ.
2. F3 (vì sao dùng alias) và F4 (mục đích `TOP`): hai câu "để làm gì" còn hở.
3. F5 (lời dẫn Bài tập), F6 (cắt câu cuối đoạn `*`).
4. F7, F8, F9: biên tập, làm khi có tay sửa các mục trên.

Độ tải: thân bài khoảng 1.150 chữ ở các đoạn văn và 400 chữ ở danh sách; không đoạn nào quá 120 chữ. Tiểu mục đầu gánh bảy ý mới là chỗ nặng nhất; F4 và F6 giảm nhẹ chỗ này. Không có đoạn dài dòng đáng cắt ngoài F6.

## 6. Nguồn và giới hạn

**Đã kiểm bằng đọc nguồn và HTML.** Văn bản MDX/YAML; bản render trong `dist` (không lộ backtick hay `\t`; `N`, `AS`, `TOP (5)`, `'HoTen'`, `(48 rows affected)` và các giá trị dẫn chứng đều ở dạng code; chữ đậm chỉ ở định nghĩa và từ khóa); các neo liên kết; đối chiếu số liệu ba hồ sơ đầu, NV004, NV005 và ba người đã nghỉ với `ho-so-cong-ty.md`; đối chiếu 12 cột `NhanVien`, cột `PhongBan`, `ChucDanh`, `HopDong` với sơ đồ ở bài 1.5; trang đề và đoạn JS liên quan.

**Chưa được dạy.** Không phát hiện kiến thức cần cho câu chính hay bốn đề mà bài và các bài trước chưa dạy.

**Đã dạy nhưng khó tìm.** Tên bảng/cột của đề 4 (phải tra bằng Sơ đồ database hoặc sơ đồ bài 1.5); mục chạy câu lệnh trong Giới thiệu dùng câu khác (F1).

**Nội dung sai có căn cứ.** Không phát hiện.

**Chưa thể xác minh (không chạy được theo phạm vi giao).**
- Câu chính thực sự trả 48 dòng, ba cột, tiêu đề đúng; ngày hiển thị `2024-03-01`; năm dòng trích đúng thứ tự khi chạy.
- Thông báo `Invalid column name 'TenNV'.` đúng nguyên văn, và cách web hiển thị lỗi.
- Giá trị `(N rows affected)` ở web cho một câu SELECT; `Must specify table to select from.` ở trang Giới thiệu.
- Dán Copy with Headers vào Excel, kể cả chuyển ngày.
- Bản nháp đề 1 còn lại như phân tích ở F1 (đọc mã, chưa mở trang).
- Ngày sinh và email của ba hồ sơ đầu trong hình Excel: `ho-so-cong-ty.md` không ghi; chỉ khớp với các giá trị cùng được dùng ở bài 2.2, chưa đối chiếu độc lập với database.
- Sao chép, bàn phím, drawer, giao diện SSMS: không tương tác, không đánh giá.
- Phần tôi không thử tạo lỗi thật: các Hay nhầm 2–5 chỉ dựa trên hiểu biết T-SQL, người viết cần xác minh theo mục 4.6.

**Ngoài phạm vi, ghi để tích hợp.** `gioi-thieu.astro` còn nhắc "bôi đen thiếu phần, như chỉ chọn `SELECT TOP (5) *`" như ví dụ lỗi; bài 2.1 mới không còn bước chạy `TOP`, nhưng ví dụ vẫn đọc được, không sai.

## 7. Kết luận

Với kiến thức của bài 1.x và bài 2.1, người học đủ để viết câu chính và làm bốn đề; chỉ đề 4 đòi tự tra tên bảng và cột, và bài đã chỉ nơi tra. Mạch Excel → SQL của hai cặp giống bài 2.2 và các chỗ chuyển ý tự nhiên. Còn vướng: cách tự chạy chưa khép kín (F1), điểm "đủ 48" trong câu trả lời tình huống chưa chặt (F2), hai câu "để làm gì" của `AS` và `TOP` còn hở (F3, F4). Đây là đánh giá học thử từ nguồn và HTML, không xác nhận SQL, giao diện web hay SSMS đã chạy đúng.
