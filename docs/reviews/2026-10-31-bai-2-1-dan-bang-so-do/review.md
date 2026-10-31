# Review bài 2.1 (tiểu mục "Câu lệnh cho tình huống": câu lệnh → sơ đồ → câu trả lời)

## 1. Phạm vi, phiên bản, công cụ

- Bài: `src/content/lessons/2-1-chon-cot-dat-ten-cot.mdx`; đề: `src/content/exercises/2-1-chon-cot-dat-ten-cot.yaml`.
- Source: commit `a3c16a9`, nhánh `feat/lesson-2-1-excel-first`, `git status` sạch lúc bắt đầu.
- Build: `dist/bai/2-1-chon-cot-dat-ten-cot/index.html` và `dist/gioi-thieu/index.html`, ghi 14:34:51-52 ngày 31/10/2026. Đối chiếu nội dung: các câu đặc trưng của bản mới (đoạn câu trả lời chị Hạnh, "Copy with Headers", ghi chú sơ đồ, mục `#doc-ket-qua`) có trong HTML; HTML không còn khối Result/Messages riêng trong bài. Không so từng byte.
- Công cụ thực tế: đọc nguồn MDX/YAML, đọc `src/pages/gioi-thieu.astro`, đọc HTML trong `dist` (cắt phần thân bài, đọc cả drawer của hai bước `RunFlow`), đọc quy ước, khung bài, hồ sơ công ty, bài 1.1-1.5, đầu bài 2.2 để đối chiếu mạch kể. Không dùng browser, không chạy SQL, không đọc `HRM_Demo.sql`, `.env`, report cũ.
- Một lưu ý về quy trình: file YAML (có answer) được mở cùng lượt với bài, trước khi tôi phân tích từng đề. Phần "xác định cách làm từ kiến thức đã học" ở bảng mục 3 vì vậy được suy từ nội dung bài và quy ước, nhưng không phải phép thử mù hoàn toàn; xin đọc bảng với giới hạn này.

## 2. Rà theo thứ tự bài

### 2.1 Tình huống (dòng 17-27)

Giữ được. Yêu cầu của chị Hạnh rõ (ba cột, thứ tự, tiêu đề, "kể cả người đã nghỉ"), phạm vi nói rõ (bảng `NhanVien`, không lọc, chưa yêu cầu thứ tự dòng), khớp mục 7 của hồ sơ công ty (48 hồ sơ, 3 người nghỉ). Nhắc hồ sơ NV020 bằng mã, đúng quy ước vì trùng tên chị Hạnh. Không thấy nhắc vai trò hay xuất thân người đọc.

### 2.2 Tiểu mục "Từ chép cột trong Excel đến câu SELECT" (dòng 31-59)

Giữ được phần lớn. Lời dẫn Excel → SQL có thật ("Trong SQL không có sheet nào đang mở, nên bạn gửi cho SQL Server một câu truy vấn"). `query`, `FROM`, `SELECT`, danh sách cột, alias đều có nghĩa tại chỗ. Điểm tốt đáng ghi nhận:

- Alias tách rõ hai thứ: tiêu đề đổi, dữ liệu và kiểu không đổi; alias không lưu vào bảng, so với việc sửa tiêu đề ở bản gửi đi (dòng 48-50). Trả lời được "vì sao không đổi tên cột ở nguồn".
- Cảnh báo `*` kéo theo `SoCCCD`, `Email` (dòng 54) trả lời "vì sao liệt kê cột thay vì lấy hết".
- "Câu `SELECT … FROM` như trên chỉ đọc" có giới hạn "như trên", không hứa quá.

Các điểm cần xem xét nằm ở finding F4, F5, F6, F8, F9.

### 2.3 Tiểu mục "Câu lệnh cho tình huống" (dòng 61-111), phạm vi chính của lượt này

Thứ tự thực tế: câu `Sql` đầy đủ → một câu dẫn → `RunFlow` hai bước → một câu về bước cuối → câu trả lời chị Hạnh → một đoạn về Copy with Headers. Không còn Result, Messages, hướng dẫn chạy, đúng quyết định đã duyệt.

Về câu hỏi "sơ đồ có dẫn dắt hiểu cách SQL hoạt động không, hay chỉ nhắc lại":

- Khi chưa bấm, người học thấy: dòng ghi chú "Bạn viết SELECT trước, nhưng theo thứ tự logic, SQL Server xét FROM trước." (mặc định của component, đọc từ HTML), hai thẻ 01 FROM và 02 SELECT với số dòng (`có 48 dòng`, `còn 48 dòng`), bảng thu nhỏ 3 dòng, `+45 dòng`/`+9 cột` ở thẻ 1, và tiêu đề cột đổi từ `MaNV, HoTen` sang `Mã nhân viên, Họ tên`. Chưa bấm đã thấy được hai ý chính: bảng 12 cột được thu còn 3 cột và số dòng không đổi; tiêu đề đổi. Đây là phần sơ đồ làm tốt hơn lời văn: lời văn chỉ nói, sơ đồ cho thấy dữ liệu.
- Mặt khác, phần lớn chữ trong hai drawer lặp lại ý đã có ở tiểu mục trước: `FROM` chỉ bảng nguồn (dòng 42 và drawer bước 1), `SELECT` chọn cột và `AS` đặt tiêu đề (dòng 42, 48 và drawer bước 2), số dòng không đổi vì không lọc (dòng 44 và drawer bước 2), liên hệ Excel (dòng 33, 42 và dòng `excel` của hai bước). Phần sơ đồ thực sự thêm là dữ liệu thật của 12 cột/48 dòng và thứ tự FROM trước SELECT. Với hai bước thì mức này chấp nhận được, miễn lời dẫn nêu đúng điều sơ đồ thêm (F1).
- "Vì sao xét FROM trước" chỉ trả lời gián tiếp, trong drawer bước 1 ("`FROM` cho biết các cột nguồn nằm ở bảng nào"). Người không mở drawer chỉ thấy khẳng định, không thấy lý do.

Về chuyển ý từ bước cuối sang câu trả lời: "Bước `SELECT` là kết quả cuối, hình trích ba dòng; câu chưa có `ORDER BY` nên thứ tự dòng có thể khác hình" rồi "Bạn có thể trả lời chị Hạnh: …" khá liền mạch. Hai chỗ chưa khớp: câu trả lời khẳng định "3 hồ sơ đã nghỉ … NV020, NV033, NV041" mà sơ đồ không có dòng nào đã nghỉ (F2), và đoạn Copy with Headers sau câu trả lời (F3).

Về đối chiếu số liệu bằng hồ sơ công ty (không phải bằng database): 48 hồ sơ, 12 cột (bài 1.2 cũng nói 12 cột), ba người nghỉ NV020/NV033/NV041, ba dòng trích NV001-NV003 (phòng, chức danh, quản lý, ngày vào làm, giới tính suy từ tên) đều khớp mục 3 của hồ sơ. Ngày sinh, số CCCD, email của ba dòng trích không có trong hồ sơ nên **chưa xác minh**.

### 2.4 Hay nhầm ở đâu (dòng 113-123)

Giữ được. Năm ý đều có câu cụ thể, hậu quả rõ và nói đúng. Đối chiếu bằng hiểu biết T-SQL (không chạy): bỏ `AS` thì `MaNV HoTen` thành alias; `'HoTen'` là chuỗi hằng; `NgaySinh AS [Ngày vào làm]` hợp lệ; `MaPB` không `DISTINCT` giữ 48 dòng, trong đó `KD` có 14 hồ sơ (khớp mục 2 của hồ sơ công ty); `TOP (5)` không `ORDER BY` không xác định năm dòng nào. Các câu này **chưa chạy** trong lượt này.

### 2.5 Ứng dụng, Ghi nhớ (dòng 125-142)

Ứng dụng có bốn ý, mỗi ý là việc làm được nhờ chủ đề. Ý "không thay thế phân quyền đọc dữ liệu" có điều kiện đúng chỗ. Hai ý (đặt tiêu đề, giới hạn cột) gần với câu ở thân bài, xem F9. Ghi nhớ thiếu `FROM` (F7).

### 2.6 Bài tập và đường đi của người học (dòng 144-152)

- Từ bài sang bài tập: đoạn Bài tập có hai liên kết, `#doc-ket-qua` và `#chon-noi-thuc-hanh`; cả hai id có trong `dist/gioi-thieu/index.html` và đường dẫn có đúng tiền tố `/microsoft-sql-lession/`. Trang bài tập con (`dist/.../bai-tap/1`) có đề, số cột cần, câu "Mỗi lần chạy đều được hoàn tác"; phần editor là JavaScript nên không đọc được từ HTML.
- Tính nhất quán chọn nơi thực hành: lối "có mã truy cập" (bấm Làm bài, trang hỏi mã khi Chạy hoặc Nộp lần đầu) khớp chuỗi trong `ExerciseWorkspace.tsx` ("cần mã truy cập từ người phụ trách…"). Không ép người chỉ dùng web phải kết nối SSMS. Bài không nói gì về mã truy cập, mà dồn sang Giới thiệu; chấp nhận được vì liên kết ngay dưới.
- Mục `#doc-ket-qua`: tìm được (liên kết ở đoạn Bài tập), nội dung đủ để hiểu tab Results/Messages, số thứ tự dòng, `(n rows affected)` và một lỗi `Invalid column name` điển hình. Vị trí là mục con của "Chọn nơi thực hành" nên người dùng web tới được mà không đọc phần SSMS. Hạn chế: lần đầu người học gặp chữ "Results" là ở đoạn Copy with Headers (dòng 111), trước khi có liên kết (F3). Việc cuộn tới đúng mục (offset thanh trên cùng, trên điện thoại) **chưa xác minh** vì không dùng browser.
- Thông báo "không so tên tiêu đề" (dòng 150) khớp YAML đề 4 và nhắc người học tự đối chiếu; tốt.

## 3. Bảng tiền đề từng bài tập

| Đề | Cần kiến thức gì | Đã dạy ở đâu | Còn thiếu gì |
|---|---|---|---|
| 2-1-1 Toàn bộ hợp đồng | Lấy mọi cột mọi dòng của một bảng: `SELECT * FROM <bảng>;`; tên bảng hợp đồng | `*` dòng 54 (đi chung với `TOP (5)`, ví dụ trên `NhanVien`); tên `HopDong` ở bài 1.2; cú pháp `SELECT … FROM` dòng 42 | Không thiếu để làm được. Rủi ro nhỏ: `*` chỉ xuất hiện trong khối "xem thử" kèm `TOP (5)`, và dòng 59 nói "nhận ra câu xem thử"; người học có thể chép nguyên `TOP (5)` rồi bị chấm sai số dòng. Đề nói "mọi hợp đồng" nên có gợi ý (F6) |
| 2-1-2 Rà soát email | Chọn hai cột theo thứ tự `HoTen`, `Email` từ `NhanVien` | Danh sách cột và thứ tự dòng 42, 44; `HoTen`, `Email` được gọi tên ở bài 1.2/1.3 và dòng 54; `NULL` ở bài 1.3 (kết quả có ô `NULL`) | Không thiếu |
| 2-1-3 Ngày vào làm trước mã | Đổi thứ tự cột so với bảng nguồn, không alias | Dòng 44 (cột đi theo thứ tự viết, ví dụ `TenPB` trước `MaPB`); tên cột `NgayVaoLam`, `MaNV`, `HoTen` ở 1.2/1.3 và drawer bước 1 | Không thiếu. Chưa nói tường minh "không `AS` thì tiêu đề là tên cột" (F8), nhưng đề đã nói không cần tiêu đề mới |
| 2-1-4 Danh mục chức danh | Hai cột `TenCD`, `MaCD` từ `ChucDanh`, alias có khoảng trắng bằng ngoặc vuông | `AS`, alias, `[]` dòng 48-52; ví dụ đúng dạng "cột AS [tên có dấu cách]" ở câu chính | Tên bảng `ChucDanh` và cột `TenCD`, `MaCD` không xuất hiện trong bài 2.1; phải tra. Đã dạy cách tra (dòng 46, 146: Object Explorer, nút Sơ đồ database), và ERD ở bài 1.5 có `ChucDanh` và `TenCD` (đối chiếu trong HTML bài 1.5). Nội dung sơ đồ database trên trang bài tập **chưa xác minh** vì không mở. Xếp loại: đã dạy nhưng phải tra, không phải chưa dạy |

Tổng: kiến thức cú pháp đủ để làm cả bốn đề. Không phát hiện đề nào cần kiến thức bài sau (`WHERE`, `ORDER BY`, `DISTINCT`). Câu lệnh mẫu của bài không trùng đáp án của đề nào.

## 4. Finding

### F1. Lời dẫn sơ đồ dùng thuật ngữ chưa giải thích và chưa nói điều sơ đồ thêm

- **Vị trí và câu gốc:** dòng 68, "Sơ đồ đi theo **thứ tự xử lý logic**, không phải cách SQL Server thực sự đọc dữ liệu. Bấm từng bước để xem câu lệnh biến bảng 12 cột thành danh sách chị Hạnh cần".
- **Đánh giá:** Cần làm rõ.
- **Tác động tới người mới:** "thứ tự xử lý logic" được in đậm như thuật ngữ nhưng không có nghĩa tại chỗ; câu phủ định ("không phải cách … thực sự đọc") làm người học hỏi "vậy cách thật là gì" mà không có câu trả lời. "Vì sao FROM trước SELECT dù mình viết SELECT trước" là câu hỏi tự nhiên nhất của bài, và chỉ được trả lời gián tiếp trong drawer bước 1. "Biến bảng … thành danh sách" dễ gợi ý bảng bị đổi, trong khi bài vừa nói câu chỉ đọc.
- **Căn cứ:** dòng 68; ghi chú mặc định của `RunFlow` trong HTML; drawer bước 1 ("cho biết các cột nguồn nằm ở bảng nào").
- **Đề xuất:** viết lại câu bằng một vế lý do, không thêm câu: ví dụ "Sơ đồ đi theo thứ tự SQL Server xét câu lệnh: biết bảng nguồn (`FROM`) rồi mới chọn được cột (`SELECT`), dù bạn viết `SELECT` trước; đây là thứ tự để hiểu, không phải cách máy đọc dữ liệu. Bấm từng bước để thấy bảng 12 cột còn lại ba cột chị Hạnh cần." Bỏ chữ "biến".

### F2. Câu trả lời nêu 3 người đã nghỉ mà sơ đồ không cho thấy dòng nào đã nghỉ

- **Vị trí và câu gốc:** dòng 109, "nên có cả `3` hồ sơ đã nghỉ trong dữ liệu mẫu là `NV020`, `NV033`, `NV041`"; dữ liệu `rows` ở dòng 80-84 và 97-101.
- **Đánh giá:** Cần làm rõ (mức thấp).
- **Tác động tới người mới:** đây là điểm duy nhất người học phải tin lời bài thay vì thấy trên sơ đồ. Cả ba dòng trích đều `Đang làm`, `NgayNghiViec` là `NULL`. Người học hỏi lại "làm sao biết có người đã nghỉ trong 48 dòng này" thì bài chưa chỉ chỗ nhìn. Cột `TrangThai` và `NgayNghiViec` có trong bảng bước 1 nhưng không có giá trị `Đã nghỉ` nào.
- **Căn cứ:** đối chiếu hồ sơ công ty: 3 hồ sơ nghỉ đúng NV020, NV033, NV041, nên câu khẳng định đúng; chỉ là không có bằng chứng ngay trên hình. `rows` của bước được phép trích bất kỳ dòng nào (tối đa 10) theo mục 3 khung bài.
- **Đề xuất:** thêm NV020 (đã nghỉ, `NgayNghiViec` 2025-12-31) làm dòng thứ tư trong `rows` của bước 1 và bước 2, sửa "hình trích ba dòng" thành "bốn dòng". Không thêm chữ. Nếu muốn giữ ba dòng đầu bảng thì bỏ qua mục này; quy ước không đòi bảng chứng minh cho mọi giá trị. Số liệu NV020 cần người viết kiểm lại với database trước khi đưa vào (tôi chưa xác minh).

### F3. Đoạn Copy with Headers: dùng "Results" trước khi giải thích, chỉ phục vụ SSMS, trùng Ứng dụng

- **Vị trí và câu gốc:** dòng 111, "Trong SSMS, **Copy with Headers** trên lưới Results chép kết quả kèm tiêu đề sang Excel; trang bài tập không có lệnh này."
- **Đánh giá:** Cần cắt.
- **Tác động tới người mới:** "lưới Results" là lần đầu xuất hiện trong chữ của bài; bài 1.1-1.5 và 2.1 không giải thích, giải thích nằm ở Giới thiệu và chỉ được liên kết ở đoạn Bài tập phía dưới. Đoạn này cũng để người chọn lối web trước một câu "không có lệnh này" mà không nói họ đưa danh sách sang Excel bằng cách nào; khả năng bôi chọn và chép lưới trên web **chưa xác minh**. Còn lại, mục đích "dán kết quả vào mẫu Excel" đã nằm ở Ứng dụng ý 2.
- **Căn cứ:** `grep` "Results" trong bài 1.1-1.5 và 2.1 chỉ ra dòng 111 và 150; dòng 150 đứng sau liên kết `#doc-ket-qua` nên ổn.
- **Đề xuất:** cắt đoạn; thêm vế ngắn vào Ứng dụng ý 2: "…dán kết quả vào mẫu Excel của người nhận (trong SSMS dùng Copy with Headers để chép kèm tiêu đề)". Câu "Bản chép không tự cập nhật theo database" là ý hay, nên giữ trong vế đó nếu còn chỗ, hoặc bỏ vì bài 1.1 đã có ý tương tự ở Hay nhầm.

### F4. Cùng một câu nhắc tra tên bảng, tên cột xuất hiện hai lần

- **Vị trí và câu gốc:** dòng 46 "Tên cột xem ở Object Explorer → **Columns** hoặc nút **Sơ đồ database** trên trang bài tập." và dòng 146 "Không nhớ tên bảng hay tên cột thì xem Object Explorer hoặc nút **Sơ đồ database**."
- **Đánh giá:** Cần cắt.
- **Tác động:** lặp ý trong cùng bài (quy ước mục 1: mỗi ý nói một lần). Không hại người học nhưng tốn câu.
- **Căn cứ:** hai dòng nêu nguyên cùng chỉ dẫn.
- **Đề xuất:** giữ dòng 146 (tại chỗ người học cần, và đề 4 đòi tra tên bảng), rút dòng 46 còn "Tên cột lấy từ danh sách cột của bảng (xem Bài tập)", hoặc giữ dòng 46 và bỏ câu đầu của dòng 146. Chọn một.

### F5. "Lướt vài dòng đầu" mâu thuẫn với Hay nhầm 5

- **Vị trí và câu gốc:** dòng 54 "như lướt vài dòng đầu trong Excel, dùng … **`TOP (5)`** … tối đa năm dòng"; dòng 141 Memo "Lướt vài dòng đầu"; dòng 121 "Chưa có `ORDER BY` thì đó chỉ là năm dòng bất kỳ".
- **Đánh giá:** Cần làm rõ.
- **Tác động:** phép so sánh với Excel (dòng đầu của sheet) tạo ra đúng hiểu lầm mà Hay nhầm 5 sau đó phải sửa, vì bảng không có dòng "đầu" theo nghĩa của sheet (bài 1.2 Hay nhầm 2). Người học đọc dòng 54 trước rồi mới tới dòng 121.
- **Căn cứ:** bài 1.2 nói bảng không có dòng 1, dòng 2 như sheet; quy ước mục 2 nói `TOP (n)` là tối đa n dòng và cần nói thứ tự dòng khi không có `ORDER BY`.
- **Đề xuất:** đổi "lướt vài dòng đầu" thành "xem nhanh vài dòng" ở dòng 54 và Memo; thêm vế "(dòng nào cũng được, không phải năm dòng đầu bảng)" ngay sau "tối đa năm dòng" rồi rút bớt câu ở dòng 121 còn hậu quả (gửi như danh sách "mới nhất" là sai).

### F6. "Chỉ cần … nhận ra câu xem thử" thấp hơn yêu cầu của đề 1; mục tiêu bài nói quá mức một chỗ

- **Vị trí và câu gốc:** dòng 59 "Ở bài này chỉ cần chọn cột, đặt tiêu đề và nhận ra câu xem thử."; dòng 12 "lần theo được từng bước SQL Server xử lý".
- **Đánh giá:** Biên tập.
- **Tác động:** đề 1 đòi tự viết `SELECT *` đúng, không phải chỉ nhận ra. Mục tiêu "từng bước SQL Server xử lý" trong khi lời dẫn sơ đồ nói chỉ là thứ tự logic, và sơ đồ chỉ có hai bước.
- **Căn cứ:** YAML đề 2-1-1; dòng 68.
- **Đề xuất:** "…chọn cột, đặt tiêu đề và dùng `*` để xem thử bảng" ; mục tiêu đổi thành "lần theo được thứ tự xét `FROM` rồi `SELECT`".

### F7. Ghi nhớ không có `FROM` và thứ tự xét

- **Vị trí:** dòng 138-142 (`Memo`).
- **Đánh giá:** Biên tập.
- **Tác động:** hai việc bài dạy riêng cho phần sơ đồ (nguồn bảng và FROM trước SELECT) không có trong phần ôn.
- **Đề xuất:** gộp vào hàng 1 bằng một vế, không thêm hàng: ['Chọn sheet nguồn, chép các cột cần gửi theo đúng thứ tự', 'FROM chọn bảng nguồn (xét trước); SELECT liệt kê cột ngăn bằng dấu phẩy, không lọc dòng'].

### F8. Chưa nói tiêu đề mặc định khi không có `AS`

- **Vị trí:** dòng 48.
- **Đánh giá:** Biên tập.
- **Tác động:** đề 2 và 3 không đặt tiêu đề; người mới có thể tự hỏi tiêu đề là gì. Suy ra được từ bảng ở drawer bước 1 nhưng không được nói.
- **Đề xuất:** thêm vế "Không có `AS`, tiêu đề là tên cột" vào câu đầu của dòng 48.

### F9. Độ tải tiểu mục đầu, và hai ý Ứng dụng lặp thân bài

- **Vị trí:** dòng 42 (một đoạn nêu query, `FROM`, `SELECT`, danh sách cột, ví dụ, `;`, từ khóa); dòng 52; Ứng dụng ý 3 và 4 (dòng 131-132).
- **Đánh giá:** Biên tập.
- **Tác động:** tiểu mục đầu của bài SQL đầu tiên đưa khoảng mười hai thứ mới (query, `FROM`, `SELECT`, danh sách cột, `;`, từ khóa, alias, `AS`, `[]`, `*`, `TOP`, cách tra tên cột). Đoạn dòng 42 có năm câu, gần giới hạn. Dòng 52 thêm cả chuyện `N` (cách viết chuỗi tiếng Việt), một cú pháp chưa dùng trong bài này.
- **Căn cứ:** Ứng dụng ý 3 ("dùng `AS` … giữ tên kỹ thuật trong bảng nguồn") lặp dòng 50; ý 4 lặp dòng 54.
- **Đề xuất (vừa cắt vừa không thêm):** (a) rút dòng 52 còn "Ngoặc vuông bao tên có khoảng trắng và không hiện trong tiêu đề; khóa học dùng ngoặc cho mọi alias. Đây là tên, không phải chuỗi nên không có `N`." (b) tách câu `;` khỏi đoạn dòng 42 hoặc bỏ "xuống dòng và viết hoa … chỉ giúp dễ đọc" nếu muốn đoạn gọn; (c) gộp Ứng dụng ý 3 vào ý 2.

## 5. Các câu hỏi "tại sao, để làm gì" đã tự đặt ra

| Câu hỏi | Bài trả lời ở đâu |
|---|---|
| Vì sao liệt kê cột thay vì lấy hết bằng `*`? | Có, dòng 54 (dữ liệu cá nhân) và Ứng dụng ý 4 |
| Vì sao đặt tiêu đề bằng `AS` thay vì đổi tên cột trong bảng? | Có, dòng 50 (alias không lưu vào bảng) |
| Vì sao SQL xét `FROM` trước `SELECT`? | Chỉ gián tiếp, trong drawer bước 1; chưa có trước khi bấm (F1) |
| Làm sao biết có người đã nghỉ trong 48 dòng? | Chưa trên hình (F2) |
| Bỏ `AS` thì tiêu đề là gì? | Chưa nói tường minh (F8) |
| Vì sao cần ngoặc vuông? | Có (tên có khoảng trắng). Không nói điều gì xảy ra nếu bỏ; chấp nhận được |
| Dấu `;` để làm gì? | "Kết thúc câu lệnh". Không nói là không bắt buộc với một câu; không sai, không ảnh hưởng đề |
| Vì sao 48 dòng giữ nguyên? | Có, dòng 44 và drawer bước 2 |
| Vì sao thứ tự dòng có thể khác hình? | Có, dòng 107 và bài 1.2 Hay nhầm 2 |
| Chạy câu này ở đâu, đọc kết quả thế nào? | Theo quyết định đã duyệt dồn sang Giới thiệu; liên kết ở đoạn Bài tập. Người học không bị chặn, chỉ bị đẩy sang trang khác (xem F3 về chữ "Results" xuất hiện sớm) |

## 6. Phân loại theo bản chất

- **Chưa được dạy:** không có nội dung nào làm đề cần mà bài (hoặc bài 1.x) chưa dạy. Chỉ có tên bảng/cột của đề 4 phải tra.
- **Đã dạy nhưng khó tìm:** cách đọc Results, Messages (Giới thiệu, `#doc-ket-qua`, tìm được qua liên kết ở Bài tập); tên bảng `ChucDanh`, cột `TenCD`, `MaCD` (ERD bài 1.5 hoặc nút Sơ đồ database).
- **Nội dung sai có căn cứ:** không phát hiện. Các khẳng định về T-SQL trong bài khớp hiểu biết của tôi (alias, bỏ `AS`, `TOP` không `ORDER BY`, `SELECT` chỉ đọc). Số liệu khớp hồ sơ công ty.
- **Chưa thể xác minh:** (a) các câu SQL và kết quả thật trên database (không chạy); (b) ngày sinh, CCCD, email của ba dòng trích bước 1 (không có trong hồ sơ công ty); (c) nút sao chép, bàn phím, mở/đóng drawer, "Bước trước/Bước sau", hiển thị trên điện thoại, cuộn tới `#doc-ket-qua`, nội dung nút Sơ đồ database; (d) việc chép lưới kết quả trên web sang Excel; (e) thông báo thật của trang bài tập khi nộp và khi lỗi; (f) `Copy with Headers` trong phiên bản SSMS người học dùng.

## 7. Ưu tiên

1. F1 (lời dẫn sơ đồ: nghĩa của "thứ tự logic" và lý do `FROM` trước): ảnh hưởng đúng điều lượt này muốn sơ đồ dạy.
2. F3 và F4 (cắt): giảm chữ, bỏ chữ "Results" dùng sớm.
3. F5 (TOP so với "dòng đầu"): mâu thuẫn nội bộ, dễ gây hiểu sai.
4. F2 (bằng chứng cho 3 người nghỉ): nối bước cuối với câu trả lời.
5. F6-F9 (biên tập): làm khi chỉnh bài.

Không có mục "Cần sửa" (sai nội dung hoặc chặn người học).

## 8. Điều đã đúng, nên giữ

- Thứ tự câu lệnh → sơ đồ → câu trả lời và việc bỏ Result/Messages: bước cuối của sơ đồ đã là kết quả, và đoạn "Bước `SELECT` là kết quả cuối, hình trích ba dòng; … thứ tự dòng có thể khác hình" nối thẳng sang câu trả lời.
- Câu trả lời tách việc database làm (48 hồ sơ, có người đã nghỉ, đúng ba cột) với quyết định nghiệp vụ (ba cột không cho biết ai đã nghỉ; muốn phân biệt thì chị Hạnh bổ sung yêu cầu). Không tự quyết thay người hỏi.
- Giữ `TOP (5)` được nói đúng là "tối đa", gắn với cảnh báo thứ tự ở Hay nhầm.
- Hai mini-bảng trên thẻ cho thấy tiêu đề đổi và số cột giảm ngay khi chưa bấm.
- Nội dung Giới thiệu `#doc-ket-qua` đúng, ngắn, khớp với những gì lượt này bỏ khỏi bài.
- Định dạng đã đối chiếu trên HTML: không lộ backtick hay `\t`; SQL trong khối, trong drawer và trong nút Sao chép trùng nhau; ký tự cong duy nhất là “mới nhất” trong lời văn (không nằm trong SQL).

## 9. Kết luận

Với kiến thức đã dạy trong 1.1-1.5 và bài này, người học chỉ biết Excel cơ bản đủ để làm bốn đề; chỗ phải tra duy nhất là tên bảng/cột của đề 4. Tiểu mục "Câu lệnh cho tình huống" đúng quyết định đã duyệt và đọc liền mạch, sơ đồ thêm được dữ liệu cụ thể và thứ tự `FROM` → `SELECT` nhưng phần chữ lặp nhiều, và lý do `FROM` đứng trước chưa được nêu ở chỗ người học nhìn thấy trước khi bấm. Đây là đánh giá khi học thử từ nguồn và HTML, không xác nhận SQL, kết quả hay giao diện đã chạy đúng.
