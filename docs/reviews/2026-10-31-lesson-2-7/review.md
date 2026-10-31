# Review học thử bài 2.7 - Hàm chuỗi và tiếng Việt có dấu

## 1. Phạm vi, phiên bản, công cụ thực tế

| Mục | Ghi nhận |
|---|---|
| Bài | `src/content/lessons/2-7-ham-chuoi-tieng-viet.mdx` (mtime 19:50:04), 3 đề trong `src/content/exercises/2-7-ham-chuoi-tieng-viet.yaml` |
| Source | commit `a336ca8`, nhánh `feat/lesson-2-5-null`, working tree sạch lúc bắt đầu |
| Build | `dist/bai/2-7-ham-chuoi-tieng-viet/index.html` (mtime 19:50:42, sau file MDX, nên khớp source này) |
| Cách kiểm | Chỉ đọc nguồn MDX và đọc HTML build bằng script tách chữ (Python `-I`, file tạm ở scratchpad). Không mở browser, không chạy SQL/API/runner/test, không đọc database, `.env`, report cũ |
| Model | Kế thừa model của phiên (`claude-sonnet-5-5`) |
| Đã đọc | AGENTS.md, quy-uoc, lesson-template, ho-so-cong-ty, spec 2.6/2.7 (các mục chỉ định), bài 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, bài 2.7, YAML (phần đề đọc riêng trước, đáp án đọc sau khi đã tự xác định cách làm) |
| Không đọc | Trang Giới thiệu, tests, bài 2.8 trở đi |

Đã giữ đúng các điểm bắt buộc: một câu lệnh; yêu cầu nhãn ngắn kèm số ký tự họ tên; bảng nhỏ các hàm còn lại trên giá trị `NV007`; `COLLATE` viết bằng lời, không có khối `Sql` riêng; không nêu khổ ô in.

## 2. Rà theo thứ tự bài

### 2.1 Tình huống và giả định - Giữ được

- Yêu cầu rõ (nhãn, cột đếm, thứ tự), giả định rõ (phòng hiện tại, không lọc trạng thái, nhãn chỉ nằm trong kết quả). Khớp hồ sơ công ty mục 7 (10 hồ sơ IT, dài nhất 14 ở NV035/NV046).
- Tôi đếm tay `LEN` của 10 họ tên theo ký tự dựng sẵn: 13, 12, 12, 13, 12, 14, 11, 13, 14, 12, khớp bài. Tên và mã 10 hồ sơ IT khớp danh sách ở hồ sơ công ty.

### F1. Nhãn `Số ký tự họ tên` không phải độ dài nhãn - Cần làm rõ (nhỏ)

- Câu gốc: chị Hạnh "Thêm cột số ký tự của họ tên để chị biết nhãn nào dài"; kết quả "họ tên dài nhất, 14 ký tự".
- Tác động: người mới có thể hỏi "nhãn dài bao nhiêu?". Bài không nói nhãn luôn dài hơn họ tên đúng 6 ký tự (`007` + ` - `), nên thứ hạng giống nhau.
- Căn cứ: đọc nguồn, cấu trúc `RIGHT(MaNV, 3)` (3) + `N' - '` (3) + tên.
- Đề xuất: thêm một vế ở câu trả lời, kiểu "nhãn dài hơn họ tên 6 ký tự nên thứ hạng không đổi", hoặc bỏ qua nếu chấp nhận.

### 2.2 Từ công thức Excel đến hàm chuỗi

**Hình Excel và câu `Sql` - Giữ được.** Công thức `=CONCAT(RIGHT(A2,3)," - ",UPPER(B2))` khớp ô `C2` được đánh dấu; chú thích nói ô được đánh dấu là nhãn vừa tạo. Mã, họ tên, nhãn trong hình khớp kết quả SQL. Câu lệnh nhìn thấy trước phần giải thích, đúng mạch mục 2.1 quy ước. Bản build có tab thật trong khối SQL và trong dữ liệu nút Sao chép (12 ký tự tab, 0 chuỗi `\t` lộ ra, 0 backtick lộ trong nội dung bài); đây chỉ là đọc HTML, tôi chưa thử bấm Sao chép hay dán.

**LineMap - Giữ được.** Mỗi dòng có "Ví dụ:" với giá trị cụ thể; giải thích `RIGHT` giữ số 0 vì vẫn là chuỗi, `LEN` tính cả dấu cách giữa các từ. Câu "Hàm nằm trong được tính trước: CONCAT nhận 007 từ RIGHT..." trả lời được "hàm lồng chạy thế nào".

#### F2. `N' - '` được dùng làm ví dụ cho "N giữ ký tự" - Cần làm rõ

- Câu gốc: "Chuỗi tự viết có chữ **`N`** ngay trước dấu nháy, như `N' - '`, để giữ ký tự như bài 1.3."
- Tác động: ` - ` không có chữ tiếng Việt nào, người học tự hỏi "có N hay không thì khác gì?". Ví dụ có dấu duy nhất (`N'Nguyễn'`) nằm ở câu tự kiểm tra, chưa được giảng. Tại chỗ này `N` là quy ước của khóa học, không có tác dụng thật với chuỗi ASCII.
- Căn cứ: đọc nguồn; quy ước mục 2 ("chuỗi tiếng Việt có `N`").
- Đề xuất: sửa một vế, kiểu "khóa học viết `N` cho mọi chuỗi chữ tự viết, kể cả ` - ` chưa có dấu, để không phải nhớ chuỗi nào có dấu", hoặc đưa ví dụ có dấu vào đúng đoạn này.

#### F3. Câu "thêm `N` sau đó không khôi phục được" mơ hồ - Cần làm rõ

- Câu gốc: "Chuỗi tiếng Việt thiếu `N` có thể mất dấu hoặc thành `?`, và thêm `N` sau đó không khôi phục được."
- Tác động: "sau đó" có thể hiểu là "sửa câu rồi chạy lại vẫn hỏng" (sai, sửa câu là xong) hay "dữ liệu đã ghi rồi thì không cứu" (đúng, nhưng bài này chỉ đọc). Người mới hiểu ngược sẽ lo vô cớ.
- Căn cứ: đọc nguồn. Hành vi mất dấu có đối chiếu được ở bài 2.5 (`ISNULL` ra `(chua có)`), nhưng ở đó là chuyển kiểu, không phải chuỗi tự viết.
- Đề xuất: nói rõ "đã lưu vào bảng mất dấu thì không khôi phục được" hoặc cắt vế sau, vì bài này chỉ đọc dữ liệu.

**Bảng hàm còn lại - Giữ được, có một chỗ khó tìm (xem Mục 3, đề 1).** Giá trị `NV`, `007`, `bùi thanh sơn`, `Bùi Thanh Sơn` đúng với hành vi chuẩn của `LEFT`, `SUBSTRING`, `LOWER`, `TRIM` (chưa chạy trên database). `SUBSTRING` ghi rõ vị trí đầu là `1`, tương ứng `MID` của Excel.

#### F4. Chuỗi nhân quả `UPPER(NULL)` rồi `CONCAT` - Đã dạy nhưng khó tìm

- Câu gốc: "`CONCAT` coi đầu vào `NULL` là chuỗi rỗng ... `UPPER`, `LOWER` nhận `NULL` thì vẫn trả `NULL`."
- Tác động: hai sự thật nằm ở hai đầu một đoạn dày 66 chữ, cái thứ hai là câu cụt cuối đoạn. Đề 3 cần ghép chúng (`UPPER` trả `NULL`, rồi `CONCAT` thành `[]`). Ví dụ trong bài chỉ dùng `NULL` viết thẳng, không có cột nào có `NULL` thật (10 hồ sơ IT đều có email).
- Căn cứ: đọc nguồn; tình huống chính không phát sinh `NULL`.
- Đề xuất: đặt hai ý liền nhau theo thứ tự nhân quả, kiểu "`UPPER` của `NULL` vẫn là `NULL`, rồi `CONCAT` coi nó là rỗng". Không cần thêm khối.

#### F5. Hiệu lực của `Vietnamese_CI_AI` với chữ riêng của tiếng Việt - Chưa xác minh (ưu tiên cao nhất của lượt này)

- Câu gốc: "`HoTen COLLATE Vietnamese_CI_AI LIKE N'bui%'` tìm ra `NV007`, vì `AI` là không phân biệt dấu."; câu tự kiểm tra: "luật so sánh không phân biệt hoa thường và dấu"; đề 2-7-2 yêu cầu `ho` "không phân biệt dấu".
- Nghi ngờ: ví dụ `bui` an toàn vì `ù` chỉ là dấu thanh. Nhưng tiếng Việt có các chữ cái riêng `ă â ê ô ơ ư đ`, người Việt vẫn gọi chúng là "dấu" (mũ, móc, râu, gạch). Tôi nghi collation tiếng Việt có thể coi chúng là chữ khác chữ gốc ngay cả khi bỏ dấu thanh, khi đó `ho` có thể không khớp `Hồ` (nếu `Hồ Thị Bích` có trong dữ liệu, theo hồ sơ công ty thì NV014). Đây là suy luận từ cách xếp bảng chữ cái, chưa phải bằng chứng về `Vietnamese_CI_AI` của SQL Server.
- Tác động nếu đúng: học viên đọc "AI là không phân biệt dấu", làm đề 2-7-2, thấy thiếu `Hồ` và kết luận bài sai hoặc mình làm sai. Nếu sai thì bài đúng.
- Cách xác minh (người viết): chạy `SELECT` so `Hồ`/`Ho`, `Sơn`/`Son`, `Đặng`/`Dang` với `COLLATE Vietnamese_CI_AI` và đối chiếu kết quả đề 2-7-2. Nếu có chữ không khớp thì thu hẹp câu ("bỏ dấu thanh như huyền, sắc") hoặc thêm một vế giới hạn.
- Giữ nguyên nếu kết quả cho thấy bỏ qua tất cả.

#### F6. Đoạn Collation dày thuật ngữ, thiếu một vế "cái giá" - Cần làm rõ (nhỏ)

- Câu gốc: "Database khóa học không phân biệt hoa thường (`CI`) nhưng phân biệt dấu (`AS`) ... `Vietnamese_CI_AI`".
- Tác động: 92 chữ, sáu thuật ngữ mới trong một đoạn (Collation, CI, AS, AI, COLLATE, tiền tố `Vietnamese_`). Học viên chép theo mẫu để làm đề được, nhưng không biết `Vietnamese_` là gì, `CI`/`AS`/`AI` viết tắt từ đâu, và không được nói cái giá (tìm rộng hơn thì có thể ra thêm người ngoài ý; chỉ Ứng dụng nhắc "xác nhận hồ sơ bằng mã"). Quy ước mục 2 muốn lý thuyết trả lời "cái giá là gì".
- Đề xuất: một vế cho cái giá, ví dụ "bỏ dấu thì tìm rộng hơn, nên xác nhận bằng mã"; `Vietnamese_` có thể bỏ qua nếu coi là tên cố định, miễn không hỏi thêm.

#### F7. Tính lặp "nguồn không đổi" - Cần cắt

- Câu gốc xuất hiện: "Các hàm này chỉ đổi giá trị trả về, `HoTen` trong bảng vẫn là `Bùi Thanh Sơn`" (đoạn sau LineMap); "`HoTen` trong bảng nguồn không đổi" (drawer bước SELECT); "không đổi collation của database hay sửa họ tên" (đoạn Collation); "không sửa nguồn" (Ứng dụng).
- Tác động: người đọc gặp cùng ý 4 lần; quy ước mục 1 yêu cầu mỗi ý một lần.
- Đề xuất: giữ ở đoạn sau LineMap, bỏ ở drawer SELECT và ở đoạn Collation (đã nói "chỉ áp dụng cho phép so sánh đó"). Ứng dụng giữ được vì là việc làm.

#### F8. Câu cuối "Ở bài này chỉ cần..." - Cần cắt

- Câu gốc: "Đặc tả cách tìm kiếm cho cả hệ thống cần thống nhất với bên IT."
- Tác động: "đặc tả" là thuật ngữ chưa giải thích và câu này là lời khuyên, không phải con trỏ sang bài sau như hai câu liền trước. Nằm lẫn trong đoạn chốt phạm vi.
- Đề xuất: cắt, hoặc chuyển thành một ý ngắn trong Ứng dụng dòng thứ ba nếu muốn giữ.

### 2.3 SQL Server chạy câu này thế nào (RunFlow)

Đã đọc cả bốn bước và drawer. Đối chiếu nguồn: `query` trùng câu chính; `focus` mỗi bước là đoạn đúng của câu (kể cả `\n\t` ở bước SELECT); `sql` của bước 3 và 4 hợp lý (bước 3 không có `ORDER BY`).

| Bước | Đầu vào | Thực hiện / Kết quả | Nhận xét |
|---|---|---|---|
| FROM | Bảng `NhanVien`, 3 hồ sơ trích (`NV003` KD, `NV007`, `NV011` IT) | Chưa lọc, chưa chọn cột; 48 dòng, 12 cột | Giữ được; chọn `NV003` đúng để bước sau thấy dòng bị loại |
| WHERE | 3 dòng, 3/12 cột, có `MaPB`; bảng soi `MaPB = 'IT'` gồm Sai-Loại và Đúng-Giữ, hàng cuối "Cả 48 dòng / 10 đúng / 10 giữ" | Còn 10 dòng, đủ 12 cột | Giữ được. Mã trong bảng soi nằm đúng trong 3 dòng Đầu vào; số 48 và 10 nối được sang bước FROM và SELECT |
| SELECT | 3 dòng `MaNV`, `HoTen`, `MaPB` (từ bước WHERE) | `RIGHT` và `UPPER` chạy trước, `CONCAT` ghép, `LEN` đếm; 10 dòng, 3 cột | Giữ được: đủ `MaNV`, `HoTen` để nối từ `NV007` + `Bùi Thanh Sơn` sang `007 - BÙI THANH SƠN`. `MaPB` thừa nhưng không gây hại |
| ORDER BY | 5 dòng trong 10, đã theo thứ tự `MaNV` | Xếp tăng dần; 10 dòng, 3 cột | Xem F9 |

Hình trích và thẻ xem nhanh được nói rõ là trích ("Trích 3 trong 48 dòng"); tổng 48, 10, 10, 10 nhất quán giữa các bước.

#### F9. Bước ORDER BY: đầu vào đã đúng thứ tự - Cần làm rõ (nhỏ)

- Câu gốc: ở bước SELECT "Thứ tự dòng chưa được bảo đảm"; ở bước ORDER BY, Đầu vào trích `NV007`...`NV029` đã tăng dần, Thực hiện: "xếp mười dòng theo `MaNV` tăng dần".
- Tác động: học viên thấy trước và sau giống nhau, hỏi "ORDER BY làm gì?". Bài vừa nói thứ tự "chưa được bảo đảm" nhưng hình lại đã xếp.
- Căn cứ: đọc nguồn, bảng `rows` của bước 3 và 4 trùng thứ tự; quy ước mục 2.6 muốn Đầu vào cho thấy điều cần đổi.
- Đề xuất: không cần đổi dữ liệu trích (đó là thứ tự thật đã ghi); thêm một vế vào Thực hiện, kiểu "hình trích có thể đã đúng thứ tự, `ORDER BY` là lệnh bảo đảm thứ tự đó". Nếu muốn thấy thứ tự đổi, dùng dòng khác chỉ khi ghi rõ là minh họa.

**Result sau sơ đồ và câu trả lời - Giữ được.** `mark={[6, 9]}` đúng `NV035`, `NV046`; câu trả lời nêu 10 nhãn, dài nhất 14, ngắn nhất `NV039` 11, và tách việc "dữ liệu để in" với "ai thực tế ký nhận". Câu lệnh và giải thích không dạy lại nhau.

Câu dẫn ngay trước sơ đồ có một chỗ ngắt nghĩa: "rồi tới `SELECT` các hàm mới tạo nhãn" - nên viết "rồi `SELECT` dùng các hàm để tạo nhãn" (Biên tập).

### 2.4 Hay nhầm ở đâu

- **Ý 2 và 3 - Giữ được.** Ý 2 (`UPPER` không thay luật so sánh dấu) và ý 3 (`TRIM` không đồng nghĩa dữ liệu sạch) đúng và có hậu quả cụ thể.
- **Ý 1 - Biên tập (F10).** "Đổi `007` thành số `7` làm mất số `0` đầu". Bài không dạy cách đổi chuỗi thành số, nên học viên không thấy lỗi này phát sinh từ thao tác nào. Đề xuất: nêu rõ nguồn gốc (ví dụ "ép phần số của mã thành kiểu số") hoặc trỏ về lý do `SoCCCD` ở bài 1.3, hoặc cắt nếu muốn gọn.

### 2.5 Ứng dụng - Giữ được

Ba ý đều là việc làm được nhờ chủ đề (tạo nhãn, cắt phần mã khi định dạng đã được quy định, tra cứu không dấu rồi xác nhận bằng mã). Ý hai có điều kiện "khi định dạng mã đã được quy định", đúng chỗ cần cẩn thận. Không hứa quá.

### 2.6 Ghi nhớ và tự kiểm tra

#### F11. Ghi nhớ và tự kiểm tra không phủ hết mục tiêu - Biên tập

- Câu gốc (mục tiêu): "bạn cắt, ghép và trình bày chuỗi, giữ dấu tiếng Việt và chọn cách so sánh có dấu hoặc không dấu".
- Phủ: Q1 hàm lồng; Q2 `N` và `COLLATE`; Q3 `CONCAT` với `NULL`. Chưa có câu nào về phần "cắt" (vị trí đầu là `1`, `SUBSTRING(MaNV, 3, 3)`), dù đề 1 cần. Memo cũng không có cú pháp `COLLATE ... LIKE`, dù đề 2 cần; ô trái của dòng cuối ("Cách tìm chữ cần theo yêu cầu") không phải điểm tựa Excel.
- Đáp án ba câu ngắn và đã được giảng trước đó (không dạy bù). Có đủ ba câu và nằm sau Ghi nhớ, trước Bài tập.
- Đề xuất: đổi hoặc gộp một câu để có phần cắt; thêm ví dụ cú pháp vào Memo. Không cần thêm nhiều.

#### F12. Thêm: `Excel CONCAT` - Chưa xác minh

- Câu gốc: công thức Excel dùng `CONCAT`.
- Tác động: `CONCAT` chỉ có trong Excel từ bản 2019/365; bản cũ hơn báo `#NAME?`. Học viên "chỉ biết Excel văn phòng cơ bản" có thể gặp.
- Căn cứ: kiến thức chung về Excel, bài không nói phiên bản.
- Đề xuất: biết thì để, hoặc nói "Excel bản mới". Không cần sửa nội dung bài nếu người học chỉ đọc hình.

### Tính tải, chuyển ý, nhịp

- Bài khoảng 20 phút, đoạn dài nhất 92 chữ, không đoạn nào vượt 120. Mạch tốt: tình huống, Excel, câu lệnh, LineMap, hàm khác, Unicode, collation, sơ đồ, kết quả. Chuyển Excel sang SQL có lời dẫn rõ ("Trong SQL, hàm chuỗi...").
- Tải nặng ở cuối tiểu mục đầu: Unicode, Collation và `COLLATE` dồn trong hai đoạn liên tiếp. Người mới vẫn đi theo được vì mỗi đoạn có ví dụ cụ thể, nhưng đây là chỗ dễ trôi nhất (xem F2, F3, F6).
- Quy ước chung: các cụm bị cấm (`BANNED_PHRASES`) không xuất hiện; không nhắc vai trò hay xuất thân người học; xưng "bạn".
- In đậm (từ HTML): "Chuỗi", "hàm chuỗi", "Unicode", "N", "Collation", "COLLATE", "thứ tự xử lý logic" cùng các nhãn Hay nhầm/Ứng dụng; chọn lọc, đúng chỗ định nghĩa. Dẫn chứng (`NV007`, `007`, `MaPB`, `IT`) dùng code; không lộ backtick hay `\t`. `summary` của câu tự kiểm tra dùng `<code>` đúng cách và nháy thẳng.
- "Tại sao / để làm gì" đã tự hỏi:
  - Vì sao hàm trong tính trước? Trả lời bằng ví dụ (có sơ đồ), chưa nói lý do, chấp nhận được.
  - Vì sao `RIGHT` giữ số 0? Có (vì vẫn là chuỗi).
  - Vì sao `LEN` không tính dấu cách cuối? Chỉ nêu "khác Excel", chưa có lý do; không ảnh hưởng đề.
  - Vì sao `N` cần ở ` - `? Chưa trả lời tốt, xem F2.
  - Vì sao dùng `COLLATE` thay vì đổi database? Có ("chỉ áp dụng cho phép so sánh đó").
  - Cái giá của `COLLATE`? Chỉ có ở Ứng dụng, xem F6.
  - Vì sao ORDER BY cần dù hình đã xếp? Chưa, xem F9.

## 3. Bảng tiền đề từng bài tập

Tôi đọc phần đề, tự xác định cách làm, rồi mới đối chiếu `answer`. Không chép đáp án.

| Đề | Cần kiến thức | Dạy ở đâu | Còn thiếu / vướng | Đánh giá |
|---|---|---|---|---|
| 2-7-1 Hai phần mã của hồ sơ Kế toán | Lọc `MaPB` (KT); lấy hai ký tự đầu và ba ký tự từ vị trí 3 của mã, đặt tên cột; sắp xếp | `WHERE` bài 2.2; alias bài 2.1; `ORDER BY` bài 2.4; `LEFT` và `SUBSTRING` ở bảng "hàm còn lại" bài 2.7, kèm cả ví dụ vị trí 3, độ dài 3 | Không thiếu. Khó tìm: hai hàm này chỉ nằm trong bảng mở bằng câu "phiếu này chưa cần", học viên có thể lướt qua. `RIGHT(MaNV, 3)` cũng cho cùng kết quả nhưng đề nói "vị trí thứ ba" nên hướng sang `SUBSTRING` | Làm được nếu đọc bảng. Đã dạy nhưng khó tìm; gợi ý sửa câu dẫn bảng, ví dụ "dùng ở Bài tập 1" thay vì "chưa cần" |
| 2-7-2 Tìm đầu họ tên bằng chữ không dấu | Mẫu `LIKE` với `%` ở cuối; `COLLATE` đặt trước `LIKE`; `LEN`; sắp xếp | `LIKE` và `%` bài 2.3; `COLLATE`, `LEN` bài 2.7 (chính ví dụ `bui%` cho vị trí cú pháp) | Cú pháp đủ. Vướng: tập kết quả mong đợi (`Hồ`, `Hoàng`...) phụ thuộc hành vi `Vietnamese_CI_AI` với chữ riêng tiếng Việt, xem F5 | Cú pháp làm được; kết quả chưa xác minh |
| 2-7-3 Nhãn email của hồ sơ Vận hành | Lọc `VH` không loại `NULL`; `CONCAT` với `[` và `]`; `UPPER(Email)`; hiểu `NULL` thành `[]`; giữ cột `Email` gốc | `WHERE`, alias bài 2.1; `CONCAT` coi `NULL` là rỗng và `UPPER(NULL)` là `NULL` ở bài 2.7; quy ước `N` bài 1.3 | Đủ kiến thức, nhưng hai ý `NULL` nằm rời nhau (F4). Lời dặn đầu phần Bài tập ("phân biệt email `NULL` ở nguồn với nhãn do hàm tạo") và lời đề "không thêm nhãn thay thế" giúp tránh bẫy dùng `COALESCE` vừa nhắc ở bài | Làm được; nên liền ý ở F4 |

Cả ba đề dùng đúng phạm vi từng đề (không phụ thuộc bài sau), tên cột chấm bằng vị trí nên alias `DauMa`, `PhanSo`, `DoDai`, `NhanEmail` chỉ là gợi ý. Đáp án YAML phù hợp cách làm tôi tự suy ra từ bài trước.

## 4. Ưu tiên

| Ưu tiên | Mục | Phân loại | Việc |
|---|---|---|---|
| 1 | F5 | Chưa xác minh (có căn cứ nghi ngờ) | Người viết chạy `SELECT` kiểm `Vietnamese_CI_AI` với `ă â ê ô ơ ư đ`; thu hẹp câu nếu cần |
| 2 | F4 | Đã dạy nhưng khó tìm | Liền hai ý `NULL` theo thứ tự nhân quả; đề 3 dựa vào đây |
| 3 | F2, F3 | Cần làm rõ | Sửa một vế mỗi chỗ ở đoạn Unicode |
| 4 | F6, F9, F1 | Cần làm rõ (nhỏ) | Một vế cái giá của `COLLATE`; một vế cho `ORDER BY`; một vế nhãn dài hơn tên 6 ký tự |
| 5 | F7, F8 | Cần cắt | Bớt lặp "nguồn không đổi"; cắt câu "Đặc tả..." |
| 6 | F10, F11, F12 và nhận xét câu dẫn RunFlow | Biên tập | Hay nhầm 1; phủ phần "cắt" ở tự kiểm tra, Memo; Excel `CONCAT`; sửa câu dẫn sơ đồ |

Số mục **Cần sửa: 0** (không tìm thấy nội dung sai có căn cứ). Một mục **Chưa xác minh** quan trọng (F5).

## 5. Nguồn và giới hạn

- Nguồn: toàn bộ các file ở Mục 1; kết luận về số liệu dựa vào nguồn bài, hồ sơ công ty và đếm tay ký tự.
- Chưa xác minh (cần chạy): kết quả thật của `LEN`, `LEFT`, `SUBSTRING`, `LOWER`, `TRIM`, `CONCAT` trên database; `nvarchar(100)` của `HoTen` (chỉ gặp ở bài này và `varchar(100)` của `Email` ở bài 2.5); các cột `NgaySinh`, `SoCCCD`, `Email`, `MaQuanLy` của `NV007`, `NV011`, `NV017` trong hình trích (không có ở bài trước để đối chiếu); hành vi `COLLATE Vietnamese_CI_AI` với `ho`, `Hồ` (F5); việc đáp án YAML chạy ra tập kết quả nào.
- Chưa kiểm: nút Sao chép và dán vào editor, bàn phím, mở drawer thật, SSMS, trang Giới thiệu và đường chọn nơi thực hành, `npm test`, `check:dist`, giao diện ở các viewport. Bài 2.7 không có hướng dẫn chạy nên mục "đường đi người học" không áp dụng cho bài này.
- Kết luận: học viên có đủ kiến thức trong bài và các bài trước để viết cả ba đề. Vướng mắc còn lại: (1) đề 2 phụ thuộc điều chưa xác minh ở F5; (2) đề 1 cần tìm đúng hai hàm trong bảng "hàm còn lại"; (3) đề 3 cần nối hai ý `NULL` rời nhau (F4). Đánh giá này là học thử qua đọc nguồn và HTML, không xác nhận SQL hay giao diện đã chạy đúng.
