# Review tích hợp: drawer RunFlow và bước sơ đồ bài 2.1–2.5

## 1. Phạm vi, phiên bản, công cụ thực tế

- Công cụ: Claude Code, model Sonnet 5.5 (theo tên model của phiên). Chỉ đọc nguồn và HTML build; không mở browser, không chạy SQL/API/test, không đọc database/HRM_Demo.sql hay secret.
- Source: nhánh `feat/lesson-2-5-null`, head `00d283b`, working tree sạch. Diff đã xem: `git diff 617ae0d 00d283b` (RunFlow.astro, run-flow.ts, lesson.css, 5 bài 2.1–2.5, phần bỏ dòng `excel` ở các bài từ 2.6).
- Build: `dist/bai/<slug>/index.html`, ghi lúc 19:14:56, sát commit head (19:14:57). Đối chiếu nội dung: bản build có nhãn "Từ bước 01, SELECT / Từ bước 02, SELECT" của commit cuối ở bài 3.8 và các lời mới của 2.1–2.5, nên coi là dựng từ head. Không có cách nào khác để chứng minh trong phạm vi chỉ đọc.
- Đã đọc: AGENTS.md, docs/quy-uoc.md, docs/lesson-template.md, docs/ho-so-cong-ty.md, spec drawer (các mục được giao). Không đọc report cũ.
- Cách làm: trích toàn bộ các khối `rf-panel` của 2.1–2.5 từ HTML, đọc từng bước theo thứ tự Đầu vào → Thực hiện → bảng soi → Kết quả, đối chiếu với `rows` trong MDX; đối chiếu số liệu với hồ sơ công ty (mục 2–3 của ho-so-cong-ty.md); trích thêm panel của 2.6–2.9, 3.1–3.9, 4.1 để tìm câu sai nghĩa với nhãn mới.
- Kiểm công cụ: đọc `RunFlow.astro`, `run-flow.ts`, `lesson.css` và đoạn script (bàn phím, đóng/mở).

## 2. Rà theo thứ tự bài

Kết quả chung đã xác nhận (đúng, công nhận):

- Chuỗi Đầu vào đúng là kết quả bước trước: ở cả 5 bài, bảng Đầu vào của bước n là phần trích của `rows` bước n-1 với đúng các cột `preview`; dòng "Trích X trong Y dòng, a trong b cột" khớp `total` và số cột thật (ví dụ 2.4 bước ORDER BY → TOP: "Trích 5 trong 45 dòng, 2 trong 4 cột" đúng).
- Số dòng/số cột nối được qua các bước: 2.1 48/12 → 48/3; 2.2 48 → 14/12 → 14/4; 2.3 48 → 2/12 → 2/4; 2.4 48 → 45/12 → 45/4 → 45 → 5; 2.5 48 → 8/12 → 8/3 → 8.
- Các con số trong bảng soi khớp hồ sơ công ty (tôi đối chiếu bằng mục 2–3 của hồ sơ, không chạy SQL): 2.2 KD 14; 2.3 IN = KD 14 + IT 10 = 24, BETWEEN 3 (NV003, NV030, NV043), giữ 2; 2.4 Đang làm 45; 2.5 VH 10, NgayNghiViec NULL 45, giữ 8. Các giá trị Đúng/Sai từng hồ sơ (NV002, NV030, NV033, NV045…) khớp bảng hồ sơ. Việc chạy lại bằng SELECT là phần của người viết (chưa xác minh bởi tôi).
- Thực hiện đều mở bằng từ khóa trong code; dẫn chứng/tên cột dùng code; không có cụm trong BANNED_PHRASES (đã grep 2.1–2.5), không emoji.
- Mỗi hồ sơ bị loại trong bảng soi đều có nguyên nhân nhìn thấy được (xem R12 cho ngoại lệ 2.5).

### Bài 2.1

**R1. FROM nói ba lần cùng một điều (2.1–2.5).** Cần cắt.
- Câu gốc, bước FROM 2.1: Đầu vào "Bảng `NhanVien` lưu trong database." / Thực hiện "`FROM` lấy bảng `NhanVien` làm nguồn cho các bước sau…" / Kết quả "Có `48` hồ sơ, đủ `12` cột…". Cùng một chuỗi `input` được lặp nguyên ở cả 5 bài.
- Tác động: người mới đọc ba câu cho một thao tác không làm gì cả (FROM không lọc, không đổi cột); cảm giác đọc thừa, đúng điều câu hỏi nêu. Bảng gốc chỉ xuất hiện một lần (ở Kết quả, không ở Đầu vào) nên không có "hai bảng" thừa, chỉ có chữ thừa.
- Căn cứ: HTML panel 0 của 2.1–2.5; quy ước mục 1 (không lặp ý), mục 2 (drawer: Thực hiện không lặp Kết quả).
- Đề xuất: giữ Đầu vào một câu có số liệu ("Bảng `NhanVien`: 48 hồ sơ, 12 cột"); Thực hiện chỉ nói điều FROM không làm ("chưa lọc, chưa chọn cột"); Kết quả chỉ nêu điều đặc biệt của hình trích (có `NV033` đã nghỉ).

**R2. Thực hiện và Kết quả của bước SELECT lặp nguyên ý (2.1, 2.2, 2.3, 2.4).** Cần cắt.
- Câu gốc 2.1: Thực hiện "`SELECT` giữ nguyên mọi dòng, chỉ lấy ba cột… `AS` đặt tiêu đề…" / Kết quả "Vẫn `48` dòng, còn `3` cột với tiêu đề `Mã nhân viên`…". 2.3: "giữ nguyên `2` dòng, chỉ lấy bốn cột. `AS` đặt tiêu đề tiếng Việt." / "Vẫn `2` hồ sơ, còn `4` cột với tiêu đề tiếng Việt". 2.2 và 2.4 cùng kiểu.
- Tác động: người học đọc "giữ nguyên N dòng, lấy k cột" rồi "vẫn N dòng, còn k cột"; cùng một sự việc, lần sau chỉ thêm con số. Còn bảng Đầu vào ("Trích … 3 trong 12 cột") và tiêu đề cột của Result nói lần thứ ba.
- Căn cứ: HTML panel SELECT của 4 bài; quy ước mục 2 (dòng về drawer) và lời dặn "không lặp nguyên ý giữa Thực hiện và Kết quả".
- Đề xuất: Thực hiện chỉ nói việc (chọn cột, đặt tiêu đề), Kết quả chỉ nói số (dòng, cột) và đối tượng người học cần nhớ ("đây là danh sách chị Hạnh cần").

**R3. Bước SELECT của 2.1: Đầu vào đã chỉ có ba cột nên không thấy chín cột bị bỏ.** Cần làm rõ (nhẹ).
- Câu gốc: Đầu vào "MaNV | HoTen | NgayVaoLam" với ghi chú "Trích 4 trong 48 dòng, 3 trong 12 cột"; Kết quả cũng ba cột.
- Tác động: nhìn hai bảng ba cột liền nhau, người mới có thể hỏi "SELECT chọn cột mà đầu vào đã có đúng ba cột rồi?". Điều giải đáp nằm ở chữ nhỏ "3 trong 12 cột" và ở bước FROM trước, chưa đủ nổi bật cho bài đầu tiên nói về chọn cột.
- Căn cứ: `preview` của bước FROM dùng chung cho thẻ và cho Đầu vào của bước sau.
- Đề xuất: ở Thực hiện của 2.1 thêm vế "bỏ chín cột còn lại" thay vì chỉ "chỉ lấy ba cột"; hoặc để Đầu vào của bước SELECT hiện thêm một cột bị bỏ.

**R4. Thân bài 2.1 và 2.2 không giới thiệu cách đọc drawer.** Cần làm rõ (nhẹ).
- Câu gốc 2.1: "Bấm từng bước để thấy bảng 12 cột còn lại ba cột chị Hạnh cần."; 2.2 chỉ nói "Bấm từng bước…". Không câu nào nói drawer có ba phần, Đầu vào là phần trích của bước trước, hay bảng Đúng/Sai/Giữ/Loại là gì.
- Đánh giá: trong drawer, các cue tự giải thích khá đủ cho Đầu vào ("Đầu vào từ bước FROM", "Trích 4 trong 48 dòng, 3 trong 12 cột"). Với bảng soi (xem R5) thì yếu hơn. Không đề xuất thêm một đoạn riêng; một vế trong dòng "Bấm từng bước…" của 2.2 là đủ.

### Bài 2.2

**R5. Bảng soi lần đầu gặp: không nói đây là 4 hồ sơ mẫu, dòng cuối đếm trên cả bảng.** Cần làm rõ.
- Câu gốc: bảng "MaNV | MaPB = 'KD' | Kết luận" có 4 dòng, chân bảng "Cả 48 dòng | 14 đúng | 14 giữ"; câu trên bảng "`WHERE` xét từng hồ sơ, chỉ giữ dòng khi điều kiện đúng…".
- Tác động: bảng Đầu vào ngay trên có ghi "Trích 4 trong 48 dòng", còn bảng soi thì không có ghi chú tương đương. Người mới đếm 4 dòng nhưng chân bảng nói 48/14 và phải tự suy ra rằng đây là trích. Bảng có đủ để đọc được nhờ "Cả 48 dòng", nhưng "đúng" có nghĩa gì ở chân bảng (đếm điều kiện đúng trên cả 48 dòng) chưa được nói.
- Căn cứ: HTML panel WHERE 2.2; RunFlow.astro tạo `tfoot` "Cả N dòng".
- Đề xuất: một vế trong Thực hiện, ví dụ "Bảng soi 4 hồ sơ trích; dòng cuối đếm trên cả 48 dòng", hoặc `<caption>` do công cụ sinh (xem T6).

**R6. Bước SELECT: bảng Đầu vào thiếu cột `HoTen`, nhưng Kết quả có (2.2, 2.3, 2.4, 2.5).** Cần làm rõ.
- Câu gốc, 2.3 bước SELECT: Đầu vào "MaNV | MaPB | NgayVaoLam" ("Trích 3 trong 12 cột"); Kết quả "Mã nhân viên | Họ tên | Mã phòng | Ngày vào làm". 2.4: Đầu vào chỉ MaNV, NgayVaoLam, TrangThai; Kết quả thêm Họ tên, Mã phòng. 2.5: Đầu vào MaNV, Email, NgayNghiViec; Kết quả thêm Họ tên.
- Tác động: số cột "3 → 4" trông như SELECT tự sinh thêm cột; muốn thấy `HoTen` từ đâu người học phải lui về bảng 12 cột ở Kết quả bước FROM. Đây đúng là điều "số cột giữa các bước có nối được nhau không" hỏi.
- Căn cứ: `preview` của bước WHERE phục vụ hai việc cùng lúc: thẻ (tối đa 3 cột cho gọn) và Đầu vào của bước sau; mô tả trong lesson-template.md ("nên chọn dòng và cột bước sau cần nhìn") không đủ khi bước sau cần cột khác bước hiện tại.
- Đề xuất: cho phép `preview` riêng cho Đầu vào (nhiều cột hơn thẻ) hoặc thêm `HoTen` vào `preview` của WHERE ở 2.2–2.5 (thẻ có thể hiển thị 3 cột đầu). Nếu không sửa, ghi trong Thực hiện: "lấy thêm `HoTen` từ nguồn".

### Bài 2.3

**R7. Chân bảng "24 đúng | 3 đúng | 2 giữ" đọc như phễu lọc nhiều lượt.** Cần làm rõ.
- Câu gốc: "Cả 48 dòng | 24 đúng | 3 đúng | 2 giữ".
- Tác động: dãy 48 → 24 → 3 → 2 giảm dần là đúng hình ảnh của lọc lượt một rồi lượt hai; điều bảng muốn nói là mỗi điều kiện được đếm riêng trên cả 48 hồ sơ (số `3` của BETWEEN không phải 3 trong 24). Dòng `NV030` (IN Sai, BETWEEN Đúng) chứng minh điều này, nhưng người học phải tự phát hiện. Không có câu nào trong drawer hay trong thân bài 2.3 nói "mỗi điều kiện đếm riêng". Với 2.5 (10 → 45 → 8) hình phễu không còn nên ít rủi ro hơn.
- Phần trả lời câu hỏi riêng: bảng soi nhìn chung không gây hiểu lọc nhiều lượt nhờ ba cue (các điều kiện là các cột đặt cạnh nhau, chữ "Cả 48 dòng" trên chân bảng, và `AND` trong Thực hiện), nhưng riêng 2.3 cần một vế nói rõ.
- Nghi ngờ nhỏ, chưa xác minh: bảng cho thấy cả IN lẫn BETWEEN đều có giá trị Đúng/Sai trên mọi hồ sơ. Đó là cách đọc logic, không phải cách SQL Server buộc phải đánh giá từng điều kiện trên từng dòng (thứ tự đánh giá điều kiện trong `WHERE` không được bảo đảm). Bài không nói bảng là cách đọc chứ không phải nhật ký của máy; câu "Sơ đồ… thứ tự xử lý logic" ở thân bài là phần bảo vệ duy nhất. Tôi không xác minh được hành vi cụ thể của SQL Server trong phạm vi review này.
- Đề xuất: thêm vào Thực hiện 2.3: "mỗi điều kiện được đếm riêng trên cả 48 hồ sơ". Không cần nhắc tới thứ tự đánh giá của engine.

**R8. Tiêu đề điều kiện "IN", "BETWEEN" chỉ là từ khóa.** Cần làm rõ (nhẹ).
- Tác động: cột "IN" không nói IN trên cột nào; người mới phải ghép với Thực hiện ("mã phòng thuộc danh sách `IN`… ngày vào làm trong khoảng `BETWEEN`") và với hai cột trong Đầu vào. Trong khi 2.2 dùng điều kiện đầy đủ `MaPB = 'KD'`. Xem R9, R13 để thấy kiểu tiêu đề đang không thống nhất.
- Đề xuất: dùng điều kiện đầy đủ ngắn, như `MaPB IN (…)` và `NgayVaoLam BETWEEN …`, hoặc tên cột + từ khóa.

### Bài 2.4

**R9. Tiêu đề điều kiện "Đang làm" không phải điều kiện.** Cần làm rõ.
- Câu gốc: bảng soi "MaNV | Đang làm | Kết luận" với NV020 "Sai | Loại".
- Tác động: "Đang làm: Sai" đọc như nhãn của người, không phải kết quả của phép so `TrangThai = N'Đang làm'`. Đây là biến thể mơ hồ nhất trong 4 bài; người học dễ hiểu "Sai" = "ghi sai".
- Đề xuất: tiêu đề `TrangThai = N'Đang làm'` như 2.2.

**R10. Bước TOP tô cả dòng đầu của SELECT.** Biên tập.
- Câu gốc: `focus: "TOP (5)"` hiển thị khối vàng `SELECT TOP (5) MaNV AS [Mã nhân viên], HoTen AS [Họ tên],` (đã kiểm HTML: khối `rf-q-on` của bước 5 chỉ có dòng này; bước 3 tô cả hai dòng của danh sách cột).
- Tác động: `splitFocus` mở rộng tới cả dòng, nên bước TOP tô cả hai cột `MaNV`, `HoTen`; người học có thể tưởng TOP liên quan tới hai cột đó. Lời của bước (đặc biệt câu "`TOP (5)` tuy viết trên dòng này nhưng chưa giới hạn dòng ở bước logic này" ở bước SELECT) bù được một phần.
- Đề xuất: ghi một vế trong Thực hiện của TOP ("`TOP (5)` nằm trên dòng `SELECT` nhưng chạy sau `ORDER BY`"). Đổi cách tô (theo từ khóa chứ không theo dòng) là việc công cụ, xem phần T.

**R11. Phần trích hồ sơ giữa bước 1 và 2 không trùng nhau.** Biên tập.
- Câu gốc: Đầu vào của WHERE có `NV020, NV047, NV048`; Kết quả của WHERE trích `NV001, NV047, NV048`. `NV001` xuất hiện ở Kết quả mà chưa từng có ở Đầu vào, rồi xuất hiện tiếp ở Đầu vào bước SELECT.
- Tác động: chính xác vì các bảng đều ghi "Trích", nhưng người học tìm "`NV001` từ đâu ra" mất một nhịp.
- Đề xuất: không cần sửa nếu R2 làm Kết quả ngắn đi; hoặc thêm `NV001` vào phần trích của FROM.

Giữ được ở 2.4: câu "ORDER BY… nếu cùng ngày thì xét `MaNV`", câu về `TOP` "nếu ít hơn thì trả hết" (đúng quy ước), và ghi chú ở bước SELECT rằng `TOP` chưa giới hạn dòng. Đầu vào của bước ORDER BY dùng tiêu đề alias ("Ngày vào làm") trong khi Thực hiện nói `NgayVaoLam`; thân bài 2.4 giải thích alias dùng được ở `ORDER BY`, nên chấp nhận được.

### Bài 2.5

**R12. Bước WHERE: Đầu vào không có cột `MaPB` nhưng bảng soi xét `MaPB = 'VH'`.** Cần sửa.
- Câu gốc: Đầu vào "MaNV | Email | NgayNghiViec" (NV008, NV033, NV044, NV045); bảng soi dòng NV045 "MaPB = 'VH': Sai", NV045 "Loại"; chỉ ở Kết quả mới có "`NV045` thuộc `KD`".
- Tác động: đây đúng là lỗi "phải đoán vì sao một hồ sơ bị loại" mà thiết kế muốn xóa. NV045 bị loại vì phòng KD, nhưng cột phòng không hiện ở Đầu vào, cũng không ở thẻ FROM; muốn thấy phải cuộn ngang bảng 12 cột ở Kết quả của bước FROM hoặc đọc câu chữ ở Kết quả. Cột `MaPB` bị bỏ để dành chỗ cho `Email` (bước SELECT sau cần nhìn Email).
- Căn cứ: `preview: ['MaNV','Email','NgayNghiViec']` của FROM trong 2.5. So với 2.2, 2.3, 2.4: Đầu vào của WHERE luôn có cột điều kiện; riêng 2.5 thiếu.
- Đề xuất: đổi `preview` của FROM thành `MaNV, MaPB, NgayNghiViec` (rồi giải quyết `Email` theo R6), hoặc cho phép Đầu vào hiện nhiều hơn 3 cột.

**R13. Bảng soi 2.5: "IS NULL" không nói cột nào, và Đầu vào có hai cột NULL.** Cần làm rõ.
- Câu gốc: bảng soi "MaPB = 'VH' | IS NULL"; Đầu vào dòng NV044 có `Email` NULL và `NgayNghiViec` NULL, cùng nền vàng.
- Tác động: "IS NULL: Đúng" của NV044 có thể bị đọc là Email NULL; thực ra là `NgayNghiViec`. Đúng chỗ khó của bài NULL.
- Đề xuất: tiêu đề `NgayNghiViec IS NULL`.

**R14. Đầu vào của bước ORDER BY đã xếp sẵn.** Biên tập.
- Câu gốc: Đầu vào `NV008, NV037, NV044` (tăng dần), Kết quả `NV008, NV015, … NV044`.
- Tác động: người học không thấy bước ORDER BY đổi thứ tự dòng nào (khác 2.4, nơi Đầu vào `NV001, NV047, NV048` đổi thành `NV048, NV047, …`). Thực hiện vẫn nói đúng việc. Mức nhẹ.

Giữ được ở 2.5: "email trong bảng nguồn vẫn là `NULL`" (không hứa quá), "Bảy email giữ nguyên, `NV044` hiện `(chưa có)`" (khớp hồ sơ: VH đang làm 8 người, chỉ NV044 thiếu email), và việc để `NV033` có `MaPB = 'VH'` Đúng nhưng `IS NULL` Sai là ví dụ rõ nhất của AND trong 4 bài.

## 3. Công cụ (đọc mã)

**T1. Câu mặc định của Đầu vào bước đầu sai với nhánh UNION và với nguồn không phải bảng.** Cần sửa.
- Câu gốc: "Chưa qua bước nào; dữ liệu lấy trực tiếp từ bảng nguồn." (RunFlow.astro).
- Hiện sai ở: bài 3.8, panel nhánh DonNghiPhep: Đầu vào "Chưa qua bước nào" nhưng ngay dưới, Thực hiện "`SELECT` trả cột `MaNV` sau khi `FROM` chọn nguồn và `WHERE` lọc đơn của nhánh này." Mâu thuẫn trong cùng một panel. Nhánh ChamCong tương tự. Bài 4.1 (và cùng kiểu 4.2, 4.3 theo lời bước): bước FROM đọc CTE `TongTheoLoai`, không phải "bảng nguồn". Hai chỗ này chưa có lời `input` để ghi đè.
- Căn cứ: HTML 3.8 panel 0 và 1; 4.1 panel 0; lesson-template.md dòng về hai nhánh UNION không dặn tác giả phải điền `input` cho hai nhánh.
- Đề xuất: đổi câu mặc định thành điều đúng với mọi trường hợp ("Đây là bước đầu của sơ đồ, chưa có bước trước.") và/hoặc kiểm test: bước đầu của sơ đồ nhánh UNION/CTE bắt buộc có `input`.

**T2. Bước JOIN: `input` nêu bảng bên phải không được ép, và chưa bài nào dùng.** Nêu để theo dõi (xem mục 6).
- `inputSteps` chỉ lấy bước trước (bảng trái). Không có kiểm tra `input` bắt buộc cho `JOIN`; trong repo không có bài nào dùng `input` ngoài FROM của 2.1–2.5 (grep `input:` chỉ ra 5 chuỗi `Bảng NhanVien lưu trong database.`). Với 3.4–3.7 người học xem bước JOIN chỉ thấy bảng trái (ví dụ 3.4 "`INNER JOIN` tạo các cặp thỏa điều kiện mã phòng bằng nhau" mà không hiện bảng phòng ban). Đúng ý "khi bài đó được chuyển" nên không phải lỗi của đợt này.

**T3. Bước ngay sau một bước rỗng.** Cần làm rõ (chưa xảy ra trong nội dung).
- `previewOf` với `rows.length === 0` trả `moreRows = 0` và `moreCols = 0`; `excerptNote` ra chuỗi rỗng; Đầu vào sẽ là bảng chỉ có hàng tiêu đề, không dòng, không lời. Thẻ có "Không còn dòng nào" (đã có test), Đầu vào thì không. Không bài nào hiện có bước rỗng nên chưa lộ.
- Đề xuất: khi Đầu vào không có dòng, in "Bước trước không còn dòng nào."

**T4. Kiểm tra bảng soi chưa bắt vài lỗi dễ mắc.** Biên tập.
- `checkTable` kiểm: số cột, số giữ bằng số dòng của bước, mã có trong đầu vào, mã giữ có trong Kết quả, mã loại không có trong Kết quả. Chưa kiểm: (a) mã trong bảng soi nằm trong 5 dòng đầu mà Đầu vào hiển thị — nếu bước trước có tới 10 dòng trích, bảng soi có thể liệt kê nhiều hơn Đầu vào; (b) mỗi tổng điều kiện không nhỏ hơn số giữ và không nhỏ hơn số "Đúng" đang hiện; (c) tiêu đề cột đầu của bảng soi lấy `columns[0]` của bước trước, có thể không phải cột đầu của `preview` đang hiện. (d) `checks` ở bước đầu hoặc nhánh UNION: tiêu đề rỗng, "Cả 0 dòng"; chỉ bị chặn gián tiếp vì mã không nằm trong đầu vào.
- Giá trị Đúng/Sai từng điều kiện không thể kiểm bằng máy; bảo vệ là chạy SELECT như spec.

**T5. Khu cuộn `rf-tb-scroll` chưa vào ngoại lệ phím mũi tên.** Cần làm rõ (chưa kiểm browser).
- Script: `onDrawerOrCard = … && !target.closest('.res-scroll, pre')`. `.rf-tb-scroll` (Đầu vào, bảng soi) không có trong danh sách và không có `tabindex`. Với bảng đủ rộng để cuộn (bảng soi nhiều điều kiện), trên trình duyệt cho phép focus vào vùng cuộn, ← → sẽ đổi bước thay vì cuộn bảng. `.res-scroll` cũng không có `tabindex`, nên tình trạng đó có từ trước; chỗ mới là `.rf-tb-scroll` bị thiếu trong ngoại lệ. Với 2.1–2.5 các bảng này hẹp, nên chưa gây lỗi quan sát được.
- Đề xuất: thêm `.rf-tb-scroll` vào ngoại lệ, và `tabindex="0"` + `aria-label` cho các vùng cuộn.

**T6. Trình đọc màn hình: bảng và phần.** Biên tập (chưa kiểm với trình đọc màn hình).
- Điểm tốt: bảng có `<thead>`, `th scope="col"`, `th scope="row"` ở khóa hàng và chân bảng; Đúng/Sai/Giữ/Loại là chữ, không chỉ màu; màu chữ xanh `#16794C` và đỏ `#B42318` trên nền trắng/`#FDF0EF` đạt tương phản; ghi chú xám `#5E6D83` ở cỡ 12px đạt khoảng 5:1.
- Thiếu: hai bảng không có `<caption>`/`aria-label`, người nghe không biết bảng nào là "Đầu vào từ bước FROM" hay "bảng soi"; "Đầu vào/Thực hiện/Kết quả" là `<p>` chứ không phải đề mục; panel đổi nội dung khi bấm Bước sau/trước mà không có thông báo, và nhãn `aside` luôn là "Chi tiết bước", không nêu bước mấy. Tiêu đề bước nằm trong `<p>`.
- Đề xuất: `<caption class="sr-only">`; đổi ba nhãn thành `<h3>`/`<h4>` theo cấp trang (cần xem cấp hiện có); hoặc `aria-labelledby` cho `aside` trỏ tới tiêu đề panel hiện tại.

**T7. `isUnionFlow` khóa cứng bốn bước.** Biên tập.
- Chỉ nhận SELECT, SELECT, UNION/UNION ALL, ORDER BY. Câu UNION không có `ORDER BY` (ba bước), hoặc `INTERSECT`/`EXCEPT`, sẽ bị vẽ như chuỗi: Đầu vào của nhánh sau là nhánh trước, sai nghĩa. Hiện chỉ 3.8 dùng nên chưa xảy ra. Template đã mô tả "bốn bước này"; nên thêm một dòng cấm hoặc cho test chặn.
- Phần UNION của đợt này đúng: hai nhánh không có bước trước (`inputSteps` trả `[]` cho i=0 và i=1), bước UNION hiện hai bảng có nhãn "Từ bước 01, SELECT" / "Từ bước 02, SELECT" và chú "Trích 5 trong 9 dòng" / "Trích 5 trong 76 dòng"; `NV005` xuất hiện ở cả hai bảng, đúng ví dụ của bài.

**T8. Độ dài và độ rộng của drawer.** Cần làm rõ.
- Ước lượng từ mã, chưa đo trên trình duyệt: panel WHERE của 2.3 gồm đầu panel, tiêu đề, câu SQL 5 dòng (~140px), Đầu vào (nhãn, bảng 4–5 dòng, ghi chú), Thực hiện 3 dòng, bảng soi 6 hàng, Kết quả 2–3 dòng, Result có tab/status/chú thích — khoảng 1000px, dài hơn vùng cuộn của màn 768–900px nên Kết quả (câu trả lời của bước) nằm dưới màn hình đầu. Chấp nhận được với mục đích của bước lọc, nhưng đáng đo ở 1024 và 1440 như spec.
- Điều đáng chú ý hơn là chiều rộng: ở FROM và WHERE của 2.1–2.5, khối Result có 12 cột trong vùng nội dung ~396px (drawer 440px, đệm 22px); cột `MaPB`, `TrangThai` cho thấy ý bước lọc đều nằm sau cuộn ngang. Spec quyết định không đổi `Result` nên đây là cân nhắc chưa kết luận (mục 6). Đầu vào đã chọn 3 cột; Kết quả ở ngay dưới lại 12 cột — hai bảng cạnh nhau không cùng cột.
- Thanh trạng thái "✓ Query executed successfully. … 14 rows" vẫn hiện trên mỗi panel dù câu lệnh xem dữ liệu đã bị bỏ khỏi drawer. Người học thấy "query executed" mà không thấy câu nào. Dữ liệu là thật (nếu người viết đã chạy), nên không sai, nhưng dễ gây hỏi "câu nào cho ra bảng này?". Spec đã chấp nhận ẩn `sql`; ghi lại như cân nhắc.

**T9. Ngoài phạm vi, đã thấy.** Ghi nhận, không tính vào số mục.
- `.rf-drawer { width: 440px }` không có quy tắc hẹp màn; không kiểm trên điện thoại (spec chỉ nghiệm thu 1024 và 1440).
- `aria-label` của thẻ bước đầu ghi "Còn 48 dòng" trong khi chữ trên thẻ là "có 48 dòng" (RunFlow.astro, `label`). Không nằm trong diff.

## 4. Các bài từ 2.6: lời cũ đặt vào nhãn mới

Chỉ nêu chỗ sai nghĩa hẳn; các chỗ chưa mượt thì để lúc chuyển khung.

**L1. Lời nhắc tới "câu kiểm" / "một câu `SELECT` riêng" trong drawer, nay không còn.** Cần sửa.
- Thân bài: 3.2 dòng 103 "Bấm từng bước để xem dữ liệu ở mốc đó bằng một câu `SELECT` riêng"; 3.3 dòng 75 "…xem dữ liệu bằng một câu `SELECT` riêng; alias trong các câu kiểm…"; 3.9 dòng 110 "drawer chứa bảng trích tối đa mười dòng và câu kiểm tương ứng"; 3.10 dòng 98 "drawer có bảng trích tối đa mười dòng và câu kiểm"; 4.1 dòng 80 "danh sách đơn nằm ngay trong câu kiểm ở trên" và dòng 84 "Các định nghĩa CTE nằm đầy đủ trong từng câu kiểm".
- Lời bước: 3.2 bước 3 và 3.3 bước 3 "Câu kiểm dùng/hiển thị `SELECT`… kích thước nhóm"; 3.9 bước 4 "Câu kiểm của các bước trước cũng xếp mã…"; 3.10 hai bước ("`SoHoSo` trong câu kiểm…", "Các câu kiểm trước cũng xếp mã"); 4.1 bước 1 "Câu kiểm thêm sắp theo tổng…"; 4.2 một bước "Câu kiểm vẫn hiện số thứ tự…".
- Tác động: người học tìm thứ không còn. Nặng nhất ở 4.1: khẳng định thông tin (9 đơn → 3 loại, định nghĩa CTE) nằm trong "câu kiểm" nay đã ẩn, nên không còn nơi nào trong trang cho thấy; các dòng này sai nghĩa hẳn chứ không chỉ chưa mượt.
- Căn cứ: grep trong `src/content/lessons`; RunFlow.astro không còn khối `Sql` ("Câu lệnh để xem dữ liệu ở bước này"). Spec dặn giữ lời cũ của các bước từ 2.6, nhưng thân bài mô tả drawer thì không thuộc diện đó.
- Đề xuất: sửa tối thiểu các câu mô tả drawer ở thân bài (bỏ "câu kiểm/SELECT riêng", nói "bảng trích tối đa mười dòng"), và bỏ hoặc đổi các vế "câu kiểm" trong lời bước; riêng 4.1 cần chỗ khác cho danh sách 9 đơn.

**L2. Lời cũ nói về phần trích dài hơn Đầu vào (giới hạn 5 dòng).** Biên tập.
- Ví dụ 2.9: bước 2 Kết quả "Trong phần trích, ba hồ sơ đã nghỉ bị bỏ; còn `7` dòng"; Đầu vào của bước đó chỉ có 5 trong 10 dòng, trong đó 2 hồ sơ đã nghỉ. Bước 3 "Bảy dòng trích…" trong khi Đầu vào 5 dòng. Không sai, nhưng lời và bảng cạnh nhau lệch số.

**L3. Bước JOIN và bước WHERE chưa có phần giải thích bên phải hoặc bảng soi.** Chủ đích của spec; xem mục 6.

Các chỗ khác tôi đọc ở 2.6–2.8, 3.1–3.9, 4.1 không thấy câu sai nghĩa hẳn với nhãn mới (đọc nhanh, không soi từng câu như 2.1–2.5).

## 5. Ưu tiên

Cần sửa (3):
1. R12: Đầu vào bước WHERE của 2.5 thiếu cột `MaPB`.
2. T1 (cùng 3.8, 4.1): câu "Chưa qua bước nào; dữ liệu lấy trực tiếp từ bảng nguồn." sai với nhánh UNION và nguồn CTE.
3. L1: các câu mô tả drawer và lời bước còn nói tới "câu kiểm/câu SELECT riêng" ở 3.2, 3.3, 3.9, 3.10, 4.1, 4.2.

Cần làm rõ (11 mục, R8/R9/R13 thực chất là một việc: thống nhất tiêu đề điều kiện của bảng soi): R3, R4, R5, R6, R7, R8, R9, R13, T3, T5, T8.

Cần cắt (2): R1 (FROM), R2 (Thực hiện lặp Kết quả ở SELECT).

Biên tập: R10, R11, R14, T4, T6, T7, L2.

Giữ được: chuỗi Đầu vào tự lấy từ bước trước; "Trích …" luôn đúng số; số liệu và Đúng/Sai khớp hồ sơ công ty; Thực hiện mở bằng từ khóa; không từ cấm; ba phần dễ đọc; UNION hai đầu vào độc lập.

## 6. Trả lời các câu hỏi riêng

- Bảng soi có khiến nghĩ lọc nhiều lượt? Phần lớn không (điều kiện là các cột đặt cạnh nhau, chân bảng "Cả 48 dòng", chữ `AND`). Riêng 2.3, chân bảng 24 → 3 → 2 giảm dần dễ đọc như phễu và chưa có câu nào nói đếm riêng từng điều kiện (R7).
- Một điều kiện: cột điều kiện và cột Kết luận trùng nhau có rối không? Không rối, hơi thừa; nhất quán với 2.3, 2.5 nên giữ. Rối thật chỉ ở tiêu đề "Đang làm" của 2.4 (R9) vì không phải điều kiện.
- Bước FROM còn đọc thừa không? Còn: ba câu cho một thao tác (R1). Bảng gốc không bị lặp, chỉ có chữ thừa.
- Drawer có quá dài không? Ước tính khoảng 1000px ở bước WHERE, vượt một màn hình ở 768–900px nên Kết quả nằm dưới màn hình đầu; chưa đo. Mức độ chấp nhận được nếu R1, R2 cắt bớt chữ. Rủi ro lớn hơn là bảng 12 cột phải cuộn ngang (T8).
- 2.1, 2.2 có nói đủ về bảng Đầu vào và bảng soi lần đầu? Đầu vào: gần đủ nhờ nhãn "từ bước FROM" và ghi chú "Trích…". Bảng soi: chưa đủ ở 2.2 (R5) vì thiếu ghi chú trích và nghĩa của dòng cuối; thân bài không nhắc (R4).

## 7. Cân nhắc nhưng chưa kết luận, hoặc để ngoài phạm vi

| Hành vi | Lý do chưa kết luận |
|---|---|
| Result 12 cột ở FROM và WHERE của 2.1–2.5, thanh trạng thái "Query executed successfully" | Spec ghi "không đổi kiểu `Result`" và chấp nhận ẩn `sql`; cần đo trên trình duyệt để biết có đáng đổi |
| Bước JOIN chỉ hiện bảng trái (3.4–3.7) | Spec: bảng bên phải sẽ nêu khi bài được chuyển; chưa có bài dùng `input` cho JOIN |
| WHERE từ bài 3.9 trở đi không có bảng soi (người học không thấy vì sao hồ sơ bị loại) | Spec "Không làm": bảng soi chỉ cho 2.2–2.5; `OR`/`UNKNOWN` ngoài phạm vi |
| Ép phím mũi tên khi focus trong vùng cuộn (T5), trình đọc màn hình (T6) | Chỉ đọc mã, chưa tương tác; cần thử trên trình duyệt và trình đọc màn hình |
| Hành vi thực tế của SQL Server về thứ tự đánh giá điều kiện trong `WHERE` (R7) | Không chạy SQL, không dùng kiến thức ngoài khóa; người viết xác minh theo mục 4.6 và 5 |
| Điện thoại: drawer rộng cố định 440px (T9) | Ngoài phạm vi nghiệm thu |

## 8. Nguồn và giới hạn

- Đã đối chiếu: diff `617ae0d..00d283b`; HTML `dist/bai/2-1…2-5` (toàn bộ panel), 2-6…2-9, 3-1…3-9, 4-1 (phần Đầu vào/Thực hiện/Kết quả); MDX 2.1–2.5; `RunFlow.astro`, `run-flow.ts`, `lesson.css`.
- Chưa tự kiểm: mọi tương tác (bấm thẻ, Bước trước/sau, Esc, phím mũi tên, cuộn ngang), bố cục thật ở 1024/1440, độ dài panel (chỉ ước lượng), copy/paste, trình đọc màn hình, màn hẹp. Không chạy `npm test` hay `check:dist`. Số liệu chỉ đối chiếu với hồ sơ công ty, chưa chạy lại SELECT.
- Không sửa source/test/docs/index/HEAD/branch; chỉ ghi file này.
