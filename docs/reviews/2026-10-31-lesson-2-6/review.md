# Review bài 2.6 "DISTINCT: bỏ dòng trùng" (học thử độc lập)

## 1. Phạm vi, phiên bản, công cụ

- Bài: `src/content/lessons/2-6-distinct-bo-dong-trung.mdx`; đề: `src/content/exercises/2-6-distinct-bo-dong-trung.yaml` (ba đề 2-6-1, 2-6-2, 2-6-3).
- Source: commit `a336ca8` trên nhánh `feat/lesson-2-5-null`, `git status` sạch. Build: `dist/bai/2-6-distinct-bo-dong-trung/index.html` (ghi lúc 19:50:42), sau lần sửa cuối của MDX (19:48:48) và trước commit (19:52:27); nội dung HTML khớp nguồn ở mọi chỗ đã đối chiếu (câu, `data-copy`, ba tab dòng, tám câu trong drawer, `Result`).
- Đã đọc: AGENTS.md, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, bài mẫu 2.1, các bài 1.3, 1.4, 2.2, 2.3, 2.4, 2.5, mục "Cách đã cân nhắc", "Bài 2.6", "Quyết định của người viết" trong spec 2026-10-31. Không đọc report cũ, nhận xét reviewer khác, `HRM_Demo.sql`, secret.
- Công cụ thực tế: chỉ đọc nguồn và HTML build, tách HTML thành chữ bằng Node (không có Python trên máy). Không mở browser, không chạy SQL, không kết nối database, không gọi API/runner. Đề được đọc phần `prompt` trước, tự xác định cách làm, rồi mới đọc `answer`.
- Không đổi: source, test, docs, index, HEAD, branch. Chỉ ghi file này.

## 2. Rà theo thứ tự bài

### 2.1 Frontmatter, Tình huống

- **Giữ được.** Mục tiêu "lấy được danh sách không trùng trên một hoặc nhiều cột và giải thích được vì sao thêm mã nhân viên làm đổi kết quả" khớp phần thân và đề. Tình huống khớp hồ sơ công ty (mục 7, dòng 2.6): toàn bộ 48 hồ sơ, 6 mã phòng.
- **Giữ được.** Câu "phòng chưa có hồ sơ nhân viên sẽ không xuất hiện dù đã có trong danh mục `PhongBan`" đặt giới hạn đúng chỗ và không hứa quá. `PhongBan` đã gặp ở bài 1.4.
- Câu trả lời cuối ("không cho biết mỗi phòng có bao nhiêu người") tách đúng việc database làm với việc cần hỏi thêm.

### 2.2 Tiểu mục "Từ Remove Duplicates đến DISTINCT"

**Giữ được:** thứ tự Excel (hình) -> `Sql` -> `LineMap` -> bốn đoạn ngắn đúng mạch quy ước. Câu "chép cột mã phòng sang vùng khác ... để giữ nguyên danh sách hồ sơ gốc" trả lời được "vì sao phải chép" và nối thẳng với câu "`DISTINCT` chỉ tạo danh sách trả về, không xóa hồ sơ ... giống việc bỏ trùng trên bản sao". Hình Excel: `B3`, `B4` đúng là hai ô `KD` (NV002, NV003) khớp hồ sơ công ty. Không còn câu về `NULL` với `DISTINCT`, không có `Sql`/`Result` phụ: đúng quyết định đã duyệt. Đoạn "Ở bài này chỉ cần…" có.

**Phát hiện F1 (Cần sửa) - tham chiếu bài sau không có thật**
- Câu gốc: "Đếm số giá trị khác nhau học ở bài 3.1" (đoạn "Ở bài này chỉ cần…").
- Loại: nội dung sai có căn cứ (hướng dẫn tới nơi không có).
- Căn cứ: bài 3.1 (`3-1-count-sum-avg.mdx`) dạy `COUNT(*)`, `COUNT(cột)`, `SUM`, `AVG`, `MIN`, `MAX`; tìm không phân biệt hoa thường "distinct" trong toàn bộ `src/content/lessons` thì chỉ có bài 2.6 và hai chỗ nhắc ở bài 3.2 (mục Hay nhầm 2) và 3.8. Không bài nào dạy đếm số giá trị khác nhau. Thứ bài 3.2 thực sự dạy là đếm hồ sơ theo từng mã phòng.
- Tác động: người học muốn biết "có bao nhiêu mã phòng khác nhau" được hẹn sang một bài không có nội dung đó.
- Đề xuất: bỏ vế này, hoặc đổi thành "đếm hồ sơ theo từng phòng học ở bài 3.2" (khớp câu trả lời "không cho biết mỗi phòng có bao nhiêu người"). Vế "kiểm chất lượng dữ liệu ở bài 4.6" khớp: bài 4.6 có soi CCCD trùng.

**Phát hiện F2 (Cần làm rõ) - cú pháp nhiều cột chỉ có bằng lời, đề 2-6-2 cần**
- Câu gốc: "`DISTINCT` so cả dòng kết quả, trên mọi cột đứng sau `SELECT` ... Chọn thêm `MaCD` thì ..."
- Loại: đã dạy nhưng chỉ ngầm.
- Căn cứ: bài không có chỗ nào cho thấy phải viết bao nhiêu từ `DISTINCT` và đặt dấu phẩy ở đâu khi có hai cột. Người mới có thể thử một `DISTINCT` cho mỗi cột, hoặc `SELECT MaPB, DISTINCT MaCD`. Thông tin để suy ra có đủ (ý "mọi cột đứng sau `SELECT`" ở đây và quy tắc dấu phẩy ở bài 2.1), nhưng phải ghép hai chỗ.
- Đề xuất: thêm một vế trong chính câu đó, không cần thêm khối `Sql` (giữ quyết định "ý nhiều cột viết bằng lời"): ví dụ "viết `DISTINCT` một lần sau `SELECT`, các cột cách nhau bằng dấu phẩy như bài 2.1".

**Phát hiện F3 (Cần làm rõ) - `MaCD` chưa được gọi tên**
- Câu gốc: "Chọn thêm `MaCD` thì `IT`, `CV` và `IT`, `CVC` là hai dòng khác nhau".
- Loại: chưa được dạy (nhẹ).
- Căn cứ: ở các bài 1.x và 2.1-2.5, `MaCD` chỉ hiện trong danh sách cột hoặc nhãn khóa ngoại (bài 1.4), chưa bài nào nói là "mã chức danh". Bài 2.6 chỉ ngầm dùng "chức danh" ở `LineMap` và Ứng dụng. Nghĩa chỉ rõ ở tiêu đề đề 2-6-1. Mã `CV`, `CVC` không cần giải thích (là giá trị dữ liệu).
- Đề xuất: lần đầu viết "`MaCD` (mã chức danh)".

**Phát hiện F4 (Biên tập) - câu `WHERE` gắn ở cuối đoạn nói chuyện khác**
- Câu gốc: "Câu có `WHERE` thì `DISTINCT` chỉ xét các dòng đã lọc."
- Căn cứ: đây là kiến thức cần cho đề 2-6-2 và 2-6-3, và được giảng (đủ, đúng). Nhưng nó là ý thứ ba của đoạn đang nói về `MaCD`, không có ví dụ, và sơ đồ cũng không có bước `WHERE`. Người mới đọc sẽ không thấy vì sao nhắc đến `WHERE` ở đây.
- Đề xuất: tách thành câu riêng, hoặc gắn một vế ví dụ lấy từ tình huống (chỉ xét hồ sơ có `MaPB` là `IT` thì chỉ các dòng đó được so). Giữ một câu, không thêm khối.

### 2.3 Tiểu mục "SQL Server chạy câu này thế nào" (RunFlow, Result, câu trả lời)

Đối chiếu từng bước với mục 2.6 của quy ước. Nội dung `sql` của bước chỉ đọc trong nguồn.

| Bước | Đầu vào | Thực hiện | Kết quả | Số dòng/cột nối bước sau |
|---|---|---|---|---|
| 01 FROM | Bảng `NhanVien`; năm hồ sơ NV001-NV005 khớp hồ sơ công ty | Nói chưa lọc, chưa chọn cột, câu không có `WHERE` | 48 hồ sơ, 12 cột | 48 dòng, 12 cột -> bước 02 |
| 02 SELECT | Thấy `MaNV`, `MaPB` (`MaPB` là cột sắp lấy); năm dòng KT, KD, KD, BGD, KT khớp bảng hồ sơ | Chọn `MaPB`, bỏ cột còn lại; nói rõ `DISTINCT` chưa bỏ gì ở bước này | Vẫn 48 dòng, 1 cột; KD, KT còn lặp | 48 dòng, 1 cột -> bước 03 |
| 03 DISTINCT | Năm dòng của bước 02, thấy KD lặp và KT lặp | So các dòng, bỏ dòng trùng dòng đã có | 6 dòng, 1 cột; bảng nguồn vẫn 48 | 6 dòng, 1 cột -> bước 04 |
| 04 ORDER BY | Năm trong sáu dòng của bước 03 | Xếp sáu mã tăng dần, không bớt mã nào | 6 dòng, BGD đến VH | Khớp `Result` cuối 6 dòng |

- **Giữ được.** Thực hiện bắt đầu từ từ khóa, Kết quả nói số; hai phần không lặp nhau ở các bước 02-04. Bước `DISTINCT` không có bảng soi, đúng quyết định đã duyệt. Dòng trích cho thấy đúng thứ bước sau xử lý (dòng lặp). Nhắc "thứ tự dòng chưa được bảo đảm" ở bước 02, 03, đúng quy ước. Thứ tự logic FROM -> SELECT -> DISTINCT -> ORDER BY nhất quán với chú thích Hay nhầm 4. Bước 02 và 03 cùng tô cả dòng `SELECT DISTINCT MaPB` (bản build tô theo cả dòng chứ không theo từ `MaPB`/`DISTINCT`); đây là cách component tô, không phải lỗi bài, nhưng hai bước nhìn giống nhau về phần tô, chỉ khác tiêu đề và lời.
- **Chưa thể xác minh (cần chạy):** thứ tự sáu mã ở bước 03 (KT, KD, BGD, IT, VH, NS). Nó trùng thứ tự xuất hiện đầu tiên trong bảng hồ sơ công ty nên hợp lý, và bài đã ghi "chưa được bảo đảm".
- Bước 03, 04: ba mã IT, VH, NS (bước 03) và NS (bước 04) có trong Kết quả nhưng không nằm trong năm dòng Đầu vào; ghi chú "Trích 5 trong 48 dòng", "Trích 5 trong 6 dòng" đã nói rõ đây là bảng trích. Không xem là lỗi.

**Phát hiện F5 (Biên tập) - lặp ý "gồm cả đang làm và đã nghỉ"**
- Cùng ý xuất hiện ở Tình huống/Phạm vi, ví dụ `LineMap` dòng `FROM`, Kết quả bước 01 và câu trả lời cuối; Kết quả bước 03 còn nhắc lại "bảng `NhanVien` vẫn có 48 hồ sơ" (đã nói ở đoạn "không xóa hồ sơ"). Bước `FROM` theo mục 2.6 phải gọn.
- Loại: Biên tập, nhẹ. Đề xuất: bỏ vế "gồm cả đang làm và đã nghỉ" khỏi Kết quả bước 01 (còn "48 hồ sơ, 12 cột"); câu trả lời cuối và Phạm vi giữ.

Kết quả và câu trả lời tình huống: `Result` đủ 6 dòng, khớp thứ tự sắp theo bảng chữ cái; câu trả lời nằm ngay sau kết quả, đủ phạm vi, tách việc database làm với việc cần hỏi thêm. **Giữ được.**

### 2.4 Hay nhầm ở đâu

- Mục 1 (thêm `MaNV` ra 48 dòng "vì `MaNV` được khai báo là khóa chính"): đúng, có điều kiện, nối bài 1.4. Giữ được.
- Mục 2 (mã phòng lặp không phải nhập trùng): đúng, nối bài 1.4 (khóa ngoại, nhiều dòng cùng một mã). Giữ được.
- Mục 4 (`ORDER BY NgayVaoLam` báo lỗi): lý do giải thích bằng một ý ("một mã phòng đại diện nhiều hồ sơ có ngày khác nhau") là đúng logic. Nguyên văn thông báo khớp với lỗi ORDER BY của `SELECT DISTINCT` mà tôi biết; **chưa xác minh bằng cách chạy** (theo spec người viết đã chạy).

**Phát hiện F6 (Cần làm rõ) - mục 3 mơ hồ về "hồ sơ trùng" và cách xác minh**
- Câu gốc: "Chỉ chọn họ tên thì hai hồ sơ trùng tên có thể hiện thành một dòng ... Cần xác minh mã hồ sơ trước khi kết luận đã xử lý trùng."
- Loại: cần làm rõ (không phải sai).
- Căn cứ: "hồ sơ trùng" có thể hiểu là trùng tên, trùng người hay trùng cả dòng; người mới không biết hai dòng cùng tên là một người hay hai người, và "xác minh mã hồ sơ" bằng cách nào. Bài cũng không dẫn bài 4.6 ngay tại đây (chỉ dẫn ở đoạn "Ở bài này chỉ cần…"). `summary` ở frontmatter còn hứa "hồ sơ trùng cần kiểm tra" mà thân bài chỉ chạm tới ở mục này.
- Đề xuất: sửa một câu, nói rõ "trùng tên chưa chắc cùng người; `DISTINCT` chỉ gom theo cột đã chọn nên không phân biệt được" và thêm "(bài 4.6)"; hoặc bỏ cụm "hồ sơ trùng cần kiểm tra" khỏi `summary`.

### 2.5 Ứng dụng, Ghi nhớ

- Ứng dụng 1, 2 nói việc làm được nhờ chủ đề, không hứa quá. Giữ được.
- **F7 (Biên tập):** Ứng dụng 3 ("để người nhận chọn đúng nhóm cần xem") chưa nói người nhận chọn ở đâu (danh sách chọn? bộ lọc?). Nên thay bằng một việc cụ thể nhờ danh sách không trùng.
- **F7 (Biên tập), Ghi nhớ:** dòng 3, vế Excel "Thêm mã riêng làm mỗi dòng khác nhau" là ý Excel chưa được giảng ở thân bài (thân bài chỉ nói Excel chọn cột làm căn cứ trong hộp Remove Duplicates). Ghi nhớ chỉ nên nhắc lại ý đã có. Có thể đổi thành "Chọn thêm cột mã riêng trong hộp Remove Duplicates".
- **F8 (Biên tập):** lần đầu nhắc Remove Duplicates không nêu đường vào menu (bài 2.2 có "Data > Filter"); người chỉ biết Excel cơ bản có thể chưa biết chức năng này nằm ở đâu. Thêm "Data > Remove Duplicates" là đủ.
- Bold: `Remove Duplicates`, `DISTINCT`, "cả dòng kết quả" chọn lọc và đúng chỗ. "thứ tự xử lý logic" bôi đậm lại dù bài 2.1 đã định nghĩa; chấp nhận được vì là câu nhắc của khóa học.
- Code: tên bảng/cột, ô `B3`, `B4`, mã `KD`, `IT`, `CV`, `CVC`, số `48`, `6`, `19` đều dùng code. Bản build không lộ backtick (8 dấu backtick trong HTML đều nằm trong script của framework, không phải nội dung bài), không có `\t` rò ra (câu bài này không dùng tab nên không có thụt lề để lỗi). Nút Sao chép có `data-copy` đúng ba dòng.

### 2.6 Bài tập (phần giới thiệu)

- Câu "Xác định mỗi dòng cần đại diện cho giá trị nào trước khi chọn cột" hơi khó hiểu với người mới. Gợi ý sửa thành một ý cụ thể, như "mỗi dòng của kết quả là một mã hay một cặp mã". (Biên tập, nhẹ, gộp vào F7.)
- Bài không có phần tự kiểm tra. Bài có bài tập nên không bắt buộc theo quy ước.
- Mục tiêu "giải thích được vì sao thêm mã nhân viên làm đổi kết quả" không có đề nào chấm, chỉ có ở Hay nhầm 1 và Ghi nhớ. Không phải lỗi; ghi nhận để người viết biết mục tiêu này chưa có điểm kiểm.

## 3. Bảng tiền đề từng bài tập

Cột "Cách làm tôi xác định" chỉ nêu các mệnh đề, không chép đáp án.

| Đề | Cách làm tôi xác định từ prompt (trước khi xem YAML) | Kiến thức cần | Dạy ở đâu | Còn thiếu/khó tìm |
|---|---|---|---|---|
| 2-6-1 Mã chức danh trong hồ sơ | Bỏ trùng một cột `MaCD` trên toàn bảng, sắp tăng dần. | `DISTINCT` sau `SELECT`; `ORDER BY ... ASC`; tên cột `MaCD` | `DISTINCT`: bài 2.6 câu chính và `LineMap`. `ORDER BY`: bài 2.4. Tên cột: danh sách cột ở các sơ đồ 2.1-2.6 và Object Explorer/ERD | Chỉ nghĩa của `MaCD` là "mã chức danh" chưa được nói trong thân bài (F3), nhưng prompt và tiêu đề đề đã cho nên không chặn |
| 2-6-2 Cặp phòng, chức danh của IT, NS | Lọc hai phòng, lấy hai cột, mỗi cặp một lần, sắp theo hai cột. | `DISTINCT` hai cột; `WHERE` hai giá trị (`IN` hoặc `OR`); `ORDER BY` hai cột, mỗi cột một hướng; thứ tự mệnh đề | `DISTINCT` nhiều cột: chỉ bằng lời ở 2.6 (F2). `WHERE`+`DISTINCT`: một câu cuối đoạn (F4). `IN`, `OR`: bài 2.3. `ORDER BY` nhiều cột: bài 2.4 | Cú pháp hai cột không được cho thấy (F2); ý `WHERE` đi trước `DISTINCT` chỉ có một câu. Đủ để suy ra nhưng phải ghép |
| 2-6-3 Mã phòng trong hồ sơ có ngày nghỉ việc | Lọc `NgayNghiViec` khác `NULL`, bỏ trùng `MaPB`, sắp giảm dần. | `IS NOT NULL`; `DISTINCT` kèm `WHERE`; `ORDER BY ... DESC` | `IS NOT NULL`: bài 2.5 (đoạn "Kiểm ô đã có giá trị" và Ghi nhớ); `=`, `<>` với `NULL` cho `UNKNOWN`: bài 2.5. `DESC`: bài 2.4 | Không thiếu kiến thức; dễ vấp nếu viết `<> NULL`, nhưng bài 2.5 đã dạy |

Kết luận về kiến thức: cả ba đề đều có đủ nguyên liệu trong bài 2.6 và các bài trước. Hai điểm chỉ cần ghép/suy ra là cú pháp hai cột (F2) và `WHERE` kết hợp `DISTINCT` (F4). Không đề nào cần kiến thức của bài sau. Đối chiếu với `answer`: cách làm tôi xác định khớp.

## 4. Câu hỏi "tại sao, để làm gì" tự đặt và nơi bài trả lời

| Câu hỏi | Trả lời trong bài? |
|---|---|
| Vì sao Excel phải chép cột trước khi Remove Duplicates? | Có, câu đầu tiểu mục 1 |
| `DISTINCT` có xóa hồ sơ không? | Có, đoạn thứ nhất sau `LineMap` |
| Vì sao đứng ngay sau `SELECT`, so theo cột nào? | Có, `LineMap` dòng 1 và 2, đoạn "so cả dòng kết quả" |
| Vì sao thêm cột thì số dòng đổi? | Có, ví dụ `IT, CV` / `IT, CVC` và 19 so với 6 (số khớp hồ sơ công ty) |
| Vì sao thêm `MaNV` ra 48? | Có, Hay nhầm 1, nối khóa chính ở bài 1.4 |
| Vì sao vẫn cần `ORDER BY`? | Một phần: `LineMap` nói "DISTINCT không bảo đảm thứ tự" nhưng không nói vì sao; chấp nhận được ở mức bài nhập môn |
| Vì sao `ORDER BY NgayVaoLam` báo lỗi? | Có, Hay nhầm 4 |
| Để làm gì: lấy mã đang dùng chứ không lấy từ danh mục phòng? | Có, Phạm vi và Ứng dụng 1 |
| Muốn biết mỗi phòng bao nhiêu người thì sao? | Chỉ "kết quả không cho biết"; đoạn "Ở bài này chỉ cần…" trỏ nhầm sang 3.1 (F1) |
| Hồ sơ trùng thật thì xử lý thế nào? | Chỉ dẫn 4.6; Hay nhầm 3 còn mơ hồ (F6) |

## 5. Ưu tiên

1. **F1 (Cần sửa):** bỏ hoặc đổi tham chiếu "đếm số giá trị khác nhau học ở bài 3.1".
2. **F2 (Cần làm rõ):** nói cú pháp nhiều cột trong chính câu đã có (đề 2-6-2).
3. **F6 (Cần làm rõ):** Hay nhầm 3 và `summary` về "hồ sơ trùng".
4. **F3 (Cần làm rõ):** gọi tên `MaCD` là mã chức danh khi dùng lần đầu.
5. F4, F5, F7, F8 (Biên tập): tách câu `WHERE`; bớt lặp "gồm cả đang làm và đã nghỉ"; sửa Ứng dụng 3, dòng 3 của Ghi nhớ và câu giới thiệu Bài tập; thêm đường vào menu Remove Duplicates.

Số mục theo loại: Cần sửa 1; Cần làm rõ 3 (F2, F3, F6); Biên tập 4 (F4, F5, F7 gộp ba chỗ, F8); Cần cắt 0.

Phần Giữ được: một câu lệnh duy nhất, ý nhiều cột bằng lời, không câu về `NULL` với `DISTINCT`, bước `DISTINCT` không có bảng soi, số dòng/cột nối giữa bốn bước, `Result`, câu trả lời đúng phạm vi, nháy SQL trong build, `data-copy`, không lộ backtick.

## 6. Nguồn và giới hạn

- Số liệu đối chiếu bằng `docs/ho-so-cong-ty.md` (bảng 48 hồ sơ, đếm bằng script Node): 48 hồ sơ, 6 mã phòng, 19 cặp (`MaPB`, `MaCD`), năm hồ sơ đầu KT, KD, KD, BGD, KT, ba hồ sơ đã nghỉ NV020 (KD), NV033, NV041 (VH). Đây là kiểm chéo với tài liệu, không phải kết quả chạy trên database; `database/HRM_Demo.sql` và database không được mở.
- **Chưa xác minh:** kết quả thật của câu chính và ba đề trên database; nguyên văn thông báo lỗi ở Hay nhầm 4; thứ tự sáu mã ở bước `DISTINCT`; sao chép/dán, bàn phím, mở/đóng drawer, nút Bước trước/Bước sau, hiển thị hẹp/mobile, SSMS thật. Đọc HTML không chứng minh các điều này.
- Đường đi thực hành (web có mã hay SSMS riêng): bài 2.6 không có đoạn hướng dẫn riêng; trang đề chỉ ghi "mỗi lần chạy đều được hoàn tác ngay", không mâu thuẫn với quy ước. Phần chọn nơi thực hành nằm ở trang Giới thiệu và bài 2.1, không kiểm lại ở đây.
- Điều không áp dụng: không kiểm tương tác browser theo yêu cầu của lượt này.
