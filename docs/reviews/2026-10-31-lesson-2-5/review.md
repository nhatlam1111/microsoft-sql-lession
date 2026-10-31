# Review bài 2.5 "NULL: ô trống không phải số 0"

## 1. Phạm vi, phiên bản, công cụ thực tế

- Bài: `src/content/lessons/2-5-null-o-trong.mdx`; YAML: `src/content/exercises/2-5-null-o-trong.yaml`.
- Source: commit `cfe55e6`, nhánh `feat/lesson-2-5-null`, `git status` sạch. Build: `dist/bai/2-5-null-o-trong/index.html` (ghi lúc 17:13:36, sau file MDX 17:13:29 và trước commit 17:14:44), nên coi là dựng từ đúng source này. Tôi không tự dựng lại build.
- Cách kiểm: chỉ đọc nguồn và HTML build (tách chữ bằng script, kiểm thẻ `strong`/`code`, dấu backtick, `\t`). Không mở browser, không chạy SQL, không kết nối database, không đọc `HRM_Demo.sql`, `.env`, report hay review cũ. Số liệu chỉ đối chiếu với `docs/ho-so-cong-ty.md`, không đối chiếu database.
- Công cụ: Claude (Sonnet), đọc file bằng công cụ của phiên.
- Đã đọc: `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, spec `docs/superpowers/specs/2026-10-31-lesson-2-5-design.md` (để hiểu phạm vi), bài 1.2, 1.3, 2.1, 2.2, 2.3, 2.4 (2.4 chỉ đọc tới hết `LineMap` và phần giải thích, dòng 1–80). Không đọc 1.1, 1.4, 1.5 (chỉ grep một số từ khóa). Bài sau (2.7, 3.1, 4.6, 4.4) chỉ grep để kiểm các câu "học ở bài X" có trỏ đúng, không dùng để bù kiến thức.
- Giới hạn trung thực về bài tập: lệnh đọc YAML trả về cùng lúc với bài, nên tôi đã thấy `answer` trước khi phân tích đề. Cột "Kiến thức cần" ở mục 3 là suy từ nội dung bài, không phải học thử mù. Không chép đáp án vào report.
- Phần chưa tự kiểm (người viết đã thử riêng): sao chép SQL, drawer của `RunFlow`, bàn phím, hiển thị thật trong browser, SSMS thật.

## 2. Rà theo thứ tự bài

### 2.1 Tình huống và phạm vi

Giữ được. Chat của chị Hạnh nêu đủ: phòng VH, "chưa có ngày nghỉ việc", ba cột, tiêu đề tiếng Việt, mã tăng dần, nhãn "(chưa có)". Phạm vi nói rõ `MaPB = VH`, `NgayNghiViec` chưa có giá trị, và quy ước "ngày nghỉ việc trống là chưa nghỉ" thuộc bộ mẫu. Đơn vị đếm là hồ sơ. Giới hạn "không kiểm địa chỉ đúng định dạng hay còn dùng được" được nói ngay từ đầu. Tên, mã, ngày khớp mục 2, 3, 7 của hồ sơ công ty (VH có 10 hồ sơ, 8 hồ sơ chưa nghỉ gồm NV008, 015, 019, 024, 027, 031, 037, 044; NV033, NV041 đã nghỉ).

Câu hỏi "vì sao chị Hạnh lọc theo ngày nghỉ việc mà không theo `TrangThai`?" bài không trả lời, nhưng quy ước bộ mẫu đã nêu một vế và đây là lựa chọn đã duyệt. Tôi không coi là lỗi.

### 2.2 Tiểu mục "Từ lọc ô trống trong Excel đến IS NULL và COALESCE"

**Đoạn Excel + hình `Excel`.** Giữ được. `(Blanks)` đúng tên mục trong bộ lọc Excel; hình nói rõ là minh họa, trích ba hồ sơ, chỉ giữ cột cần nhìn. Số dòng `9, 32, 45` khớp việc `NV008`, `NV031`, `NV044` nằm ở hàng thứ 8, 31, 44 sau tiêu đề trong sheet xếp theo mã. Công thức `=IF(B45="","(chưa có)",B45)` đúng cú pháp; `B45`, `C45` đúng là hai ô trống của dòng `NV044` trong lưới đã rút cột. Hình xuất từ database "giá trị chưa có thành ô trống" là cách giải thích hợp lý. Việc bài trả lời được "NULL trông ra sao trong Excel" là điểm tốt.

**Câu lệnh + `LineMap`.** Giữ được. Mỗi dòng có "Ví dụ:" bằng giá trị thật (`NV008` giữ email, `NV044` nhận nhãn, `NV045` mang `KD` bị loại, `NV033` có ngày `2026-06-30` bị loại). Dòng `COALESCE` nói rõ "giá trị đầu tiên khác NULL, xét từ trái sang phải". Thụt lề dùng `\t`, trong HTML dòng `COALESCE(...)` và `AND ...` có tab thật, không lộ backtick hay `\t` ở chữ hiển thị (8 dấu backtick trong HTML chỉ nằm trong mã JS runtime của Astro).

**Đoạn "NULL khác số 0 và chuỗi rỗng"** (bắt đầu `` `NULL` khác số `0` ``).

- Giữ được ý chính: ba ý ngắn (khác 0 và `''`, không tự nói lý do, nghĩa dựa vào quy ước), ví dụ cùng một hồ sơ `NV044` mang hai nghĩa của `NULL`. Đây là phần giải thích rõ nhất của bài.
- Biên tập nhẹ: "Nó cũng không tự nói lý do" nằm ngay sau "đó là những giá trị đã có", nên "Nó" lơ lửng giữa `NULL` và các giá trị vừa kể. Viết lại chủ ngữ là `NULL`.
- Tiêu đề hứa "không phải số 0" nhưng bài chỉ có đúng một cụm "khác số `0`", không nói hậu quả (vì sao người làm báo cáo cần phân biệt). Người học đọc xong biết "khác" nhưng chưa biết "khác thì sao". Quyết định "không dạy phép tính với NULL" và giữ tiêu đề đã được duyệt, nên đây chỉ là ghi nhận tác động: phần trả lời nằm ở bài 3.1 (đã grep thấy 3.1 có tiểu mục riêng về `0` và `NULL`). Nếu muốn, một vế trỏ "hậu quả khi đếm, cộng ở bài 3.1" ngay sau cụm này là đủ.

**Đoạn "Kiểm ô đã có giá trị thì viết IS NOT NULL…"** — Cần làm rõ (xem F1). Đoạn gói bốn ý: `IS NOT NULL`, Excel so với `""`, `UNKNOWN`, quy tắc `WHERE`. Ý chính đúng và đủ cho mục tiêu, nhưng hai chỗ người mới dễ vấp được ghi ở F1.

**Đoạn "Lọc và hiển thị là hai việc"** — Giữ được ý chính (lọc bằng `IS NULL`, hiển thị bằng `COALESCE`, bảng nguồn không đổi), kèm Cần làm rõ nhẹ ở F2 về câu `varchar`/`nvarchar`.

**Đoạn "Ở bài này chỉ cần…".** Có đủ. Biên tập nhẹ: "hàm tổng hợp" là cụm chưa học (chỉ 3.1 mới định nghĩa). Với một câu trỏ sang bài sau thì chấp nhận được, nhưng người học chưa biết `COUNT`/`SUM` sẽ không hiểu cụm này; có thể thay bằng "đếm và cộng".

### 2.3 Tiểu mục "SQL Server chạy câu này thế nào"

Giữ được.

- Lời dẫn nói rõ đây là thứ tự logic, không phải cách đọc dữ liệu, và tóm đúng số liệu 48 → 8, `NULL` ở `WHERE` vẫn còn, nhãn chỉ có ở `SELECT`.
- Bốn bước: số dòng (48, 8, 8, 8) và số cột (12, 12, 3, 3) khớp bảng trong drawer; bước 2 và 3 hiển thị đủ 8 dòng nên `total` trùng số dòng. Bước 1 trích 4 dòng của 48, bước đó ghi rõ "Trích 4 dòng (kết quả có 48 dòng)", không tạo hiểu nhầm.
- `query`, `focus`, `sql` của các bước khớp nhau cả khoảng trắng và tab (đối chiếu trực tiếp trong nguồn và HTML).
- Drawer mở đầu bằng từ khóa ("`FROM` xác định…", "`WHERE` chỉ giữ…", "`SELECT` chọn cột…", "`ORDER BY` sắp…"), có số dòng thật, và dùng `NV033`, `NV045` làm ví dụ loại.
- Lưu ý khi dùng thẻ xem nhanh: thẻ bước 2 và 3 chỉ hiện ba dòng đầu (NV008, NV015, NV019), nên `NULL` của `NV044` và nhãn `(chưa có)` chỉ thấy khi mở drawer, nơi có đủ 8 dòng. Lời dẫn đã bảo "bấm từng bước", nên không phải lỗi; chỉ ghi nhận rằng nếu người học không mở drawer thì không thấy được điểm chính của bài trên sơ đồ.
- Phần này chưa tự kiểm bằng browser, chỉ đọc từ HTML.

### 2.4 Bảng kết quả và câu trả lời tình huống

Giữ được. `Result` có đủ 8 dòng, đánh dấu dòng 8 (`NV044`), khớp câu trả lời "8 hồ sơ; `NV044` là hồ sơ duy nhất cần nhắc bổ sung; `NV033`, `NV041` không vào vì đã có ngày nghỉ". Phạm vi của con số được nói rõ (phòng VH, chưa có ngày nghỉ). Câu trả lời đặt ngay sau kết quả, tách việc database làm với việc người phụ trách làm.

Cần cắt: câu "Bảy email còn lại có giá trị…, nhưng kết quả chưa cho biết địa chỉ có dùng được không" lặp ý mà Phạm vi (đầu bài) và Hay nhầm 3 đã nói (xem F3).

Ghi chú nhỏ: `NV041` chỉ xuất hiện trong chữ (ở đoạn `IS NOT NULL` và ở câu trả lời), không có dòng nào trong bài chứng minh `NV041` thuộc VH và đã nghỉ. Tôi đối chiếu được với hồ sơ công ty nên không coi là sai. Theo yêu cầu của lượt này, một mã lần đầu xuất hiện không cần thêm bảng chứng minh.

### 2.5 Hay nhầm ở đâu

- **Ý 1, so sánh bằng `=`:** Giữ được. Đây là biến thể của chính câu lệnh, nêu hậu quả cụ thể (0 dòng thay vì 8) và câu "không ra dòng nào chưa có nghĩa là không có hồ sơ". Kết quả "0 dòng" là hành vi mặc định của SQL Server khi `ANSI_NULLS` bật; tôi chưa chạy (chưa xác minh).
- **Ý 2, `COALESCE` đổi thành `ISNULL`:** Cần làm rõ (F4).
- **Ý 3, coi dòng có email là liên hệ được:** Nội dung đúng và có giá trị riêng (`COALESCE` không thay chuỗi rỗng hay dấu cách). Phần "địa chỉ gõ sai" lặp với Phạm vi và câu trả lời (F3).

### 2.6 Ứng dụng, Ghi nhớ, Bài tập

- **Ứng dụng:** Giữ được. Cả ba ý đều nói việc làm được nhờ chủ đề (lập danh sách cần bổ sung bằng `IS NULL`, hỏi nghĩa của `NULL` trước khi kết luận, ghi nhãn mà không sửa nguồn); điều kiện viết ngay trong từng ý.
- **Ghi nhớ:** Giữ được cho ý chính. Hai nhận xét nhỏ ở F5.
- **Tự kiểm tra:** Bài không có. Bài có mục Bài tập, nên quy ước (mục 2.1) không bắt buộc; không phải lỗi. Hậu quả: câu "vì sao `=` không tìm ra `NULL`" chỉ được kiểm bằng việc làm đề 1 và 2, không có câu hỏi riêng.
- **Câu dẫn mục Bài tập:** Biên tập (F5).

## 3. Bảng tiền đề từng bài tập

| Đề | Cần kiến thức gì | Đã dạy ở đâu | Còn thiếu gì |
|---|---|---|---|
| 2-5-1: mọi hồ sơ có ngày nghỉ việc, ba cột, mã tăng dần | Chọn cột; `FROM`; `WHERE` một điều kiện; `IS NOT NULL` (đề viết "khác NULL"); `ORDER BY ... ASC`; không lọc phòng | Chọn cột 2.1; `WHERE` 2.2; `ORDER BY` 2.4; `IS NOT NULL` ở đoạn "Kiểm ô đã có giá trị" của 2.5, kèm cảnh báo `<>` cho `UNKNOWN` | Không thiếu. `IS NOT NULL` chỉ có trong một câu và một ô Ghi nhớ, không có ví dụ chạy riêng, nhưng đủ để nhận diện. Người đọc đề "khác NULL" phải tự dịch sang `IS NOT NULL`; bài có cảnh báo `<>` nên bẫy này được che |
| 2-5-2: phòng KD và email có giá trị | Như đề 1, thêm `AND` để kết hợp hai điều kiện; `IS NOT NULL` trên cột `Email` | `AND`: 2.3 và chính câu mẫu của 2.5 (`AND ... IS NULL`) | Không thiếu. Chưa có câu mẫu nào ghép `AND` với `IS NOT NULL`, nhưng cấu trúc đồng dạng câu mẫu |
| 2-5-3: toàn bộ KD, nhãn khi email là NULL | `WHERE` theo phòng, không lọc hồ sơ thiếu email; `COALESCE(cột, nhãn)` trong `SELECT`; chuỗi Unicode có `N`; mã tăng dần | `COALESCE`: 2.5 (cú pháp, ví dụ `LineMap`, `Result` mẫu); `N` ở 1.3, 2.2 và 2.5; `ORDER BY`: 2.4 | Không thiếu. Điểm cần lưu ý: đề viết nhãn bằng nháy cong “(chưa có)” còn SQL cần nháy thẳng và `N`; người học phải tự đổi (đề đã báo "chuỗi Unicode"). Kiến thức "vì sao `N`" ở 2.5 nằm trong câu nặng nhất của bài (F2), nhưng cách viết `N'…'` đã có ngay trong câu mẫu |

Kết luận ngắn cho ba đề ở mục 5.

## 4. Câu hỏi "tại sao / để làm gì" tự đặt và nơi bài trả lời

| Câu hỏi | Trả lời ở đâu |
|---|---|
| Vì sao Excel lọc `(Blanks)` còn SQL phải học `IS NULL`? | Có: SQL không dùng `= NULL` vì kết quả `UNKNOWN`, `WHERE` bỏ dòng. Thiếu một vế cho trường hợp vế kia cũng là `NULL` (F1) |
| `NULL` khác `0` và chuỗi rỗng thì khác ở đâu, để làm gì? | Khác: có (một câu). "Để làm gì": chưa, chỉ trỏ 3.1 và 4.6 (F6, giới hạn đã duyệt) |
| Vì sao `NULL` ở `Email` và ở `NgayNghiViec` nghĩa khác nhau? | Có: nghĩa dựa vào quy ước dữ liệu, không dựa vào chữ `NULL` |
| Dùng nhãn `(chưa có)` có sửa dữ liệu không? | Có, hai lần: "Lọc và hiển thị là hai việc", và drawer bước `WHERE`/`SELECT` |
| Vì sao `COALESCE` cần `N`? | Có nhưng nén: câu `varchar`/`nvarchar` và cảnh báo `ISNULL` ở Hay nhầm (F2, F4) |
| Vì sao `WHERE` bỏ dòng `UNKNOWN`? | Chỉ nêu quy tắc ("chỉ giữ dòng có điều kiện đúng"), nhất quán với 2.2 |
| `IS NOT NULL` dùng khi nào? | Có, một câu |
| Có phải email có giá trị là email dùng được? | Có, ba lần (F3) |
| `NULL` được sắp xếp ở đâu? | Chưa. Bài 2.4 hứa "`NULL` học ở bài 2.5", nhưng 2.5 không nói (F7) |
| `NULL` nằm trong `OR`, `NOT` hay `IN` thì sao? | Chưa; 2.3 trỏ "điều kiện có `NULL` ở bài 2.5". Đây là phạm vi đã loại có chủ đích (spec "Quyết định của người viết"), nên không đề nghị thêm |

## 5. Ưu tiên (finding)

Không có mục Cần sửa. Không phát hiện nội dung sai có căn cứ trong bài; các chỗ nghi ngờ nằm ở mục 7 (chưa xác minh).

### Đã dạy nhưng khó tìm / Cần làm rõ

**F1. Cần làm rõ. Câu `UNKNOWN` thiếu hai vế mà người mới thắc mắc.**
- Vị trí: đoạn bắt đầu "Kiểm ô đã có giá trị thì viết `IS NOT NULL`…", và Hay nhầm 1.
- Câu gốc: "Công thức Excel so được ô trống với `""`, còn SQL không dùng `= NULL`: so sánh ô `NULL` bằng `=`, `<>` hay `>=` đều cho `UNKNOWN`…".
- Tác động: (a) Người mới nhìn `NgayNghiViec = NULL` sẽ nghĩ "ô `NULL` bằng `NULL` thì phải đúng". Câu hiện chỉ nói "so sánh ô `NULL`", chưa nói vế phải cũng là `NULL` vẫn ra `UNKNOWN`, trong khi đó chính là lỗi Hay nhầm 1. (b) Trong Excel, `B45=""` đúng với cả ô trống lẫn chuỗi rỗng; đoạn ngay trên nói SQL tách `NULL` khỏi `''`. Bài không nêu rằng Excel gộp hai thứ này còn SQL tách, nên "so được ô trống với `""`" dễ bị đọc là SQL cũng so được `''` để tìm `NULL`.
- Căn cứ: đọc đoạn trong nguồn và HTML; không cần chạy.
- Đề xuất: thêm một vế "kể cả khi vế kia cũng là `NULL`" và một vế "Excel coi ô trống và `""` như nhau, SQL thì tách". Có thể bù bằng cách bỏ chữ thừa ở các câu lân cận.

**F2. Cần làm rõ (nhẹ). Câu `varchar(100)` → `nvarchar`.**
- Vị trí: đoạn "Lọc và hiển thị là hai việc", câu cuối.
- Câu gốc: "Cột `Email` là `varchar(100)`, còn nhãn có `N` là chuỗi Unicode, nên kết quả dùng `nvarchar` để giữ dấu tiếng Việt; đây là **chuyển kiểu ngầm** đã gặp ở bài 1.3."
- Tác động: (a) Kiểu `varchar(100)` của `Email` lần đầu xuất hiện ở đây, chưa bài trước nào (đã đọc 1.2, 1.3, 2.1–2.4) nêu; người học không có cách kiểm. (b) "Kết quả dùng `nvarchar`" thiếu cầu nối: một cột kết quả chỉ có một kiểu (bài 1.3 đã nói mỗi cột một kiểu), nên SQL Server đổi cả cột sang kiểu rộng hơn; chưa có chữ nào nối hai ý. (c) Câu gói ba khái niệm (kiểu cột, Unicode, chuyển kiểu ngầm) vào một câu 40 chữ, nặng nhất của bài.
- Căn cứ: đọc nguồn; kiểu `varchar(100)` của `Email` tôi chưa xác minh (không được đọc script database).
- Đề xuất: giữ ý, chia thành hai vế ngắn hoặc thêm "một cột chỉ có một kiểu". Không cần thêm ví dụ.

**F4. Cần làm rõ. Hay nhầm ý 2 trộn hai ý và không nói `ISNULL` là gì.**
- Vị trí: Hay nhầm ý 2.
- Câu gốc: "Tên gần giống `IS NULL` nhưng đây là hàm trả giá trị, không phải điều kiện lọc. `ISNULL(Email, N'(chưa có)')` giữ kiểu `varchar` của cột nên nhãn ra `(chua có)`, mất dấu."
- Tác động: Tiêu đề ý là "đổi `COALESCE` thành `ISNULL`" (lỗi: kiểu kết quả), nhưng câu đầu lại nói về việc nhầm tên với `IS NULL` (lỗi khác). Người học chưa biết `ISNULL` làm gì (thay `NULL` bằng giá trị thứ hai, như `COALESCE` hai tham số) nên khó thấy vì sao hai hàm này khác nhau. "Giữ kiểu của cột" so với `COALESCE` ở đoạn trước chỉ ngầm hiểu.
- Căn cứ: đọc nguồn. Hành vi `ISNULL` trả kiểu của tham số đầu và kết quả `(chua có)` phù hợp với mô tả đã biết về kiểu dữ liệu và bảng mã `CP1252` của database khóa học, nhưng tôi chưa chạy, nên ghi là chưa xác minh.
- Đề xuất: giữ `ISNULL` chỉ ở đây theo quyết định đã duyệt, nhưng đổi thành một ý: "`ISNULL(Email, N'(chưa có)')` cũng thay `NULL` nhưng lấy kiểu `varchar` của cột nên ra `(chua có)`", bỏ câu về tên gần giống `IS NULL` hoặc để thành câu riêng ngắn.

### Cần cắt / Biên tập

**F3. Cần cắt. "Có email không có nghĩa là dùng được" nói ba lần.**
- Vị trí: Phạm vi (đầu bài) "không kiểm địa chỉ đúng định dạng hay còn dùng được không"; câu trả lời "Bảy email còn lại có giá trị trong hệ thống, nhưng kết quả chưa cho biết địa chỉ có dùng được không"; Hay nhầm 3 "địa chỉ gõ sai vẫn được giữ".
- Tác động: người học đọc cùng một cảnh báo ba lần ở ba chỗ, trái quy ước "mỗi ý nói một lần".
- Đề xuất: giữ Phạm vi (cần để đóng tình huống). Câu trả lời giữ "Việc nhắc bổ sung và xác minh do người phụ trách thực hiện" và cắt vế "nhưng kết quả chưa cho biết…". Hay nhầm 3 giữ phần mới (chuỗi rỗng, dấu cách không bị `COALESCE` thay) và bỏ "địa chỉ gõ sai".

**F5. Biên tập. Vài chỗ nhỏ.**
- Câu dẫn Bài tập: "Dùng đúng phạm vi từng đề, giữ phân biệt giá trị nguồn với nhãn trong kết quả." Đề 1 và 2 không có nhãn; "giữ phân biệt giá trị nguồn với nhãn" mơ hồ. Chỉ đề 3 liên quan. Gợi ý: bỏ vế thứ hai hoặc ghi rõ "riêng đề 3".
- Ghi nhớ hàng 1: vế Excel "Ô trống chưa nói vì sao trống" là nhận xét, không phải thao tác Excel như các hàng khác; vế SQL đúng. Ghi nhớ không nhắc nhãn Unicode `N`, trong khi đề 3 cần. Cả hai đều nhỏ.
- "hàm tổng hợp" trong "Ở bài này chỉ cần…" (xem 2.2).
- "Nó cũng không tự nói lý do" (xem 2.2).

**F6. Biên tập (ghi nhận, không đề nghị đổi). Tiêu đề hứa "không phải số 0" nhưng bài chỉ có một cụm.**
- Đã nêu ở 2.2. Quyết định giữ tiêu đề và không dạy phép tính là đã duyệt; tác động thực tế là người học biết "khác" nhưng hậu quả chỉ được trỏ sang 3.1. Nếu giữ, một vế trỏ rõ hậu quả là đủ.

**F7. Biên tập (ngoài file bài). Con trỏ ở bài 2.4 không khớp.**
- Bài 2.4 viết "Giá trị `NULL` học ở bài 2.5". Người học ở 2.4 (có `ORDER BY`) sẽ tự hỏi `NULL` xếp ở đầu hay cuối; 2.5 không trả lời. Bài 2.2 và 2.3 trỏ về 2.5 thì đã được 2.5 đáp (cách lọc `NULL`). Không bắt buộc, vì đề 1–3 không cần; có thể sửa con trỏ ở 2.4 hoặc thêm một vế ở 2.5 nếu người viết thấy cần.

### Giữ được (công nhận)

- Mạch hai tiểu mục đúng khung: Excel → câu lệnh → `LineMap` → `RunFlow` → `Result` → trả lời chị Hạnh; Excel và SQL cùng phần chính, câu lệnh xuất hiện sớm, không có câu ví dụ trên bảng hay cột khác.
- Kết quả có cả email thật lẫn nhãn nên người học thấy `COALESCE` giữ giá trị có sẵn, điều bản trước thiếu.
- Một hồ sơ (`NV044`) mang hai nghĩa của `NULL` là ví dụ hay, trả lời được "vì sao phải biết quy ước dữ liệu".
- Hay nhầm đều là biến thể của chính câu mẫu; `ISNULL` chỉ nằm ở Hay nhầm, đúng quyết định.
- Số liệu nhất quán với hồ sơ công ty: 48, 8, 3 cột, 12 cột, 7 email giữ nguyên, `NV044` duy nhất có nhãn.
- Bold đúng chỗ khái niệm (`NULL`, `IS NULL`, `COALESCE`, `IS NOT NULL`, `UNKNOWN`, chuyển kiểu ngầm, thứ tự xử lý logic, `(Blanks)`); dẫn chứng, tên cột, mã đều dùng code. `(Blanks)` in đậm là tên mục giao diện; chấp nhận được.
- Không có đoạn vượt cỡ; câu ngắn; xưng "bạn"; không nhắc vai trò hay xuất thân người học.
- Bốn con trỏ "học ở bài X" tôi grep kiểm: 3.1 (có tiểu mục về `0` và `NULL`), 4.6 (chuỗi rỗng, dấu cách, `IS NULL` cho email), 2.7 và 4.4 (dùng lại `COALESCE` "đã học ở bài 2.5") đều trỏ khớp.

## 6. Kết luận về kiến thức làm ba đề

Đủ để làm ba đề. Đề 1 và 2 chỉ cần `IS NOT NULL`, `WHERE`, `AND`, `ORDER BY`, tất cả đã được dạy (ba điều đầu ở bài trước, `IS NOT NULL` trong 2.5). Đề 3 cần `COALESCE` và `N'…'`, có ví dụ chạy và dòng giải thích trong bài. Chỗ còn vướng với người mới: (1) người học dễ bỏ qua `NULL = NULL` và Excel `""` (F1); (2) câu `varchar`/`nvarchar` nặng (F2) và ví dụ `ISNULL` chưa được định nghĩa (F4); (3) ba lần nhắc "email có giá trị chưa chắc dùng được" (F3). Không phát hiện chỗ nào làm người học bị chặn không thể làm đề. Đây là đánh giá đọc học thử, không thay cho việc chạy SQL trên database hay kiểm UI.

## 7. Nguồn và giới hạn

- Đã đọc kỹ toàn bộ MDX (frontmatter, Chat, Key, Excel, Sql, LineMap, RunFlow bốn bước và drawer, Result, Mistakes, Apply, Memo, Exercises) và YAML ba đề.
- Đối chiếu HTML build: văn bản, thẻ `strong`/`code`, ba khối `Sql` (tab thật), nhãn `(Blanks)`, công thức Excel, bảng drawer. Không có backtick hay `\t` hiển thị ngoài mã chạy.
- Chưa xác minh (cần chạy hoặc đọc database): (1) `Email` là `varchar(100)`; (2) `NgayNghiViec = NULL` trả `0` dòng, `IS NOT NULL` chọn `NV033`, `NV041` trong VH; (3) `ISNULL(Email, N'(chưa có)')` ra `(chua có)`; (4) toàn bộ số 48, 8, 8, 8 và các hàng dữ liệu trong drawer so với database (tôi chỉ đối chiếu với `docs/ho-so-cong-ty.md`, khớp); (5) số dòng đề tập (đề 1 ba dòng, đề 2 mười ba dòng, đề 3 mười bốn dòng theo hồ sơ công ty, chưa chạy).
- Chưa tự kiểm: nút Sao chép, mở drawer, bàn phím, hiển thị bằng browser thật, SSMS thật.
- Báo cáo này không sửa source, test, docs, index, HEAD hay branch.
