# Review bài 1.4 Khóa chính và khóa ngoại (bài nền)

## 1. Phạm vi, phiên bản, công cụ

- Bài: `src/content/lessons/1-4-khoa-chinh-khoa-ngoai.mdx`; không có YAML (bài nền, `noExercises`, `noScenario`, `minutes: 7`).
- Source: nhánh `feat/level-1-foundation-lessons`, commit 2cc3293, file MDX sửa lần cuối 17:27. Build `dist/bai/1-4-khoa-chinh-khoa-ngoai/index.html` dựng 17:28 (chỉ đối chiếu theo giờ file, sau source một phút).
- Đã đọc: AGENTS.md, quy ước (mục 2.5), khung bài, hồ sơ công ty, spec Level 1 (phần Khung bài nền, Nội dung từng bài), bài 1.1, 1.2, 1.3, toàn bộ bài 1.4, phần `<article>` của HTML build, và `Ssms.astro` để biết hình được dựng từ đâu.
- Cách kiểm: chỉ đọc nguồn và HTML. Không mở browser, không kết nối database, không chạy SQL, không đọc `HRM_Demo.sql`, không đọc report cũ.
- Độ dài: 529 từ theo logic `proseParagraphs` (tôi chạy lại đúng logic đó trên file, không chạy `npm test`). Trong khoảng 500–700, còn dư khoảng 170 từ. Số đoạn: 15, đoạn dài nhất 63 từ.
- Không có finding nào là kiến thức sai có căn cứ. Các finding bên dưới là thiếu nghĩa tại chỗ, thiếu điểm nối, và vài chỗ nên cắt hoặc biên tập.

## 2. Rà theo thứ tự bài

### 2.1 Frontmatter

Mục tiêu: "bạn phân biệt được khóa chính và khóa ngoại, đọc được nhãn PK, FK và biết hai khóa này kiểm được gì". Ba vế này là cái phải đối chiếu với nội dung và với tự kiểm tra (xem mục 3). Vế "đọc được nhãn PK, FK" không có câu tự kiểm tra nào kiểm (F4).

### 2.2 Mở bài: "Từ cột mã trong Excel đến khóa của bảng"

Tiêu đề hứa đi từ Excel sang khóa của bảng, và đoạn mở có đúng việc đó. Hai điểm tựa Excel là tô màu mã trùng và danh sách chọn lấy từ sheet khác, người biết Excel cơ bản nhận ra được.

Vấn đề: câu "Database có hai luật làm việc tương tự, kiểm ngay khi ghi dữ liệu" nói tương tự, trong khi điểm khác quan trọng nhất không được nêu: tô màu chỉ báo cho người nhìn, database thì từ chối. Xem F3.

### 2.3 "Khóa chính xác định đúng một dòng"

- Giữ được: câu đầu có điều kiện đúng quy ước ("Khi `NhanVien.MaNV` được khai báo là khóa chính"), nói được hai hệ quả (không trùng, không NULL), và nối về "luật dữ liệu đã nói ở bài 1.1". Bài 1.1 có dùng cụm "luật dữ liệu" và "khi luật đang bật", nên nối này đúng.
- "Vì sao dùng mã chứ không dùng họ tên" được trả lời ngay (họ tên có thể trùng hoặc thay đổi). Đây là câu "để làm gì" của khóa chính, và bài trả lời được.
- "Vì sao khóa chính không nhận NULL" không được nói thẳng. Người đọc suy ra được từ "xác định hồ sơ" (dòng không có mã thì không xác định được), nên không coi là lỗi, chỉ ghi nhận.
- Câu "các bảng hợp đồng, chấm công và lương dùng mã này để nhắc tới đúng người" là chỗ nối tự nhiên sang khóa ngoại nhưng không được gọi tên (F1).

### 2.4 "Khóa ngoại giữ mã tham chiếu có thật"

- Ví dụ `KT` được nhận, `KT01` bị từ chối là rõ và đúng quy ước "mã có thật".
- Câu "Một mã phòng được nhiều nhân viên dùng là bình thường: `PhongBan` giữ một dòng cho mỗi mã, `NhanVien` có nhiều dòng cùng mã phòng" trả lời đúng thắc mắc "sao mã lặp mà không bị chặn", và là chỗ giữ được chắc nhất của bài. Nhưng nguyên nhân (cột `MaPB` của `PhongBan` là khóa chính nên mỗi mã một dòng) không được nói ra (F1).
- Đoạn sau có hai ý lệch trọng tâm: "không phải ô chọn trên màn hình" (F3) và vế "nạp hàng loạt... (bài 5.5)" (F7).
- Câu "phòng còn hồ sơ trỏ tới thì không xóa được khỏi danh mục" là chiều ngược của khóa ngoại. Bài nêu kết quả mà không nêu lý do (xóa thì các hồ sơ đang giữ mã sẽ trỏ vào chỗ không còn). Đây là một phần của F1.

### 2.5 "Đọc khóa trong SSMS" và hình

- Hướng dẫn đường đi Tables → `dbo.NhanVien` → Columns, nhãn `PK`/`FK`. Đúng với hình.
- Hình là mô phỏng Object Explorer do `Ssms.astro` dựng từ script (`parseSchema(schemaSql)`), không phải ảnh chụp. Đối chiếu hình với caption: `MaNV (PK, varchar(10), not null)`, `MaPB (FK, ..., not null)`, `MaCD (FK, ..., not null)`, `MaQuanLy (FK, varchar(10), null)`. Khớp caption. Phần viền xanh bao đúng chữ trong ngoặc của bốn cột này.
- Caption nói "MaQuanLy trỏ về NhanVien và nhận NULL" mà không giải thích gì (F2).
- Hình không nói bảng nào được trỏ tới, nhãn `FK` cũng không cho biết. Người học sẽ hỏi "làm sao biết `MaCD` trỏ đi đâu", và bài không nêu bài 1.5 là chỗ trả lời (F7).
- "Ở bài này chỉ cần…" có, nhưng chỉ trỏ 5.2 và 5.3–5.4 (F7).

### 2.6 Hay nhầm ở đâu

- Mục 1 ("Thấy mã có thật thì nghĩ đã đúng hồ sơ"): có giá trị thật. Đây là điểm các bài khác không thay được, vì nó cụ thể hóa "hợp lệ chưa chắc đúng" (bài 1.1) cho đúng khóa ngoại. Giữ.
- Mục 2 ("Nghĩ khóa chính chặn mọi hồ sơ trùng người"): gồm hai ý. "Một người có hai mã vẫn thành hai dòng" tốt. Vế `SoCCCD` không có `UNIQUE` dùng một thuật ngữ chưa được dạy (F5).

### 2.7 Ứng dụng

Xem F9. Ý 2 có việc làm thật; ý 1 lặp đoạn chính.

### 2.8 Ghi nhớ

Hai dòng, gọn. Cột Excel của dòng 1 ("Cột mã NV không được trùng") nói Excel buộc không trùng, trong khi đoạn mở chỉ nói Excel tô màu (F3). Cột phải render bằng kiểu code (đây là hành vi chung của component `Memo`, không phải lỗi bài).

### 2.9 Tự kiểm tra

Xem mục 3 và F4.

## 3. Bảng tiền đề từng câu tự kiểm tra

Tôi thử trả lời từng câu chỉ bằng bài 1.1–1.4 trước khi mở đáp án.

| Câu | Cần kiến thức gì | Dạy ở đâu | Thiếu gì | Đánh giá |
|---|---|---|---|---|
| 1. Khóa chính và khóa ngoại khác nhau thế nào? | Định nghĩa khóa chính (không trùng, không NULL); khóa ngoại (mã phải có ở bảng khác); nhiều dòng cùng trỏ tới một mã | Hai tiểu mục đầu của phần chính; vế "nhiều dòng" ở đoạn khóa ngoại | Không thiếu để trả lời. Đáp án không nói khóa ngoại trỏ tới đâu (khóa chính của bảng kia), vì bài cũng không nói (F1) | Trả lời được. Giữ |
| 2. Vì sao một mã phòng xuất hiện ở nhiều dòng `NhanVien` mà không bị chặn? | Mã chỉ bị cấm lặp ở cột khóa chính của bảng đó; `MaPB` ở `NhanVien` là khóa ngoại | Đoạn khóa ngoại ("bình thường: ... nhiều dòng cùng mã phòng") và định nghĩa khóa chính | Bài chưa nói nguyên nhân tường minh: chỉ khóa chính mới cấm lặp. Đáp án "vì là khóa ngoại, không phải khóa chính" đọc được là lý do, người đọc kỹ suy ra được | Trả lời được, hơi dựa vào suy luận. Giữ |
| 3. Một người thuộc `KT` bị gán `KD`, khóa ngoại có chặn không? | Khóa ngoại chỉ kiểm mã có thật | Đoạn khóa ngoại, Hay nhầm 1 (gần như cùng ví dụ) | Không thiếu | Trả lời được nhưng gần như nhớ lại ví dụ Hay nhầm 1, không phải suy luận mới (chấp nhận được vì đây là phần ôn) |
| (không có) Đọc nhãn `(FK, varchar(10), null)` | Nhãn `PK`/`FK`, kiểu, `null` | Bài này (PK/FK), bài 1.3 (kiểu, NULL) | Không có câu nào kiểm mục tiêu "đọc được nhãn PK, FK" | Thiếu (F4) |

Cả ba câu trả lời được từ bài, không dùng tự kiểm tra để dạy bù. Vấn đề là độ phủ mục tiêu, không phải tiền đề.

### Các câu "tại sao / để làm gì" tôi tự đặt và nơi bài trả lời

| Câu hỏi | Trả lời ở đâu |
|---|---|
| Vì sao dùng mã chứ không dùng họ tên để xác định hồ sơ? | Đã trả lời, đoạn 2 của tiểu mục khóa chính |
| Vì sao khóa chính không nhận NULL? | Chưa nói thẳng, suy ra được từ "xác định hồ sơ" |
| Khóa ngoại để làm gì, nếu không có thì hỏng gì? | Chưa trả lời. Bài chỉ nêu "kiểm" (F1) |
| Vì sao một mã phòng được lặp ở `NhanVien`? | Đã trả lời một phần (ví dụ) và Q2 |
| Khóa ngoại có bảo đảm dữ liệu đúng không? | Đã trả lời, Hay nhầm 1 |
| Vì sao không xóa được phòng còn hồ sơ trỏ tới? | Chỉ nêu kết quả, chưa nêu lý do (F1) |
| Vì sao `MaQuanLy` nhận NULL và trỏ về chính `NhanVien`? | Chưa trả lời (F2) |
| Khóa ngoại trỏ tới bảng nào, xem ở đâu? | Chưa trả lời; nhãn `FK` không cho biết, bài 1.5 không được trỏ (F7) |
| Excel và database khác nhau chỗ nào ở hai luật này? | Chỉ ngầm (F3) |

## 4. Findings

### F1. Cần làm rõ: bài không nói khóa ngoại để làm gì và không nối khóa ngoại với khóa chính của bảng kia

- Câu gốc: "buộc mã khác `NULL` phải trỏ tới một giá trị khóa có thật" và "`PhongBan` giữ một dòng cho mỗi mã" (tiểu mục "Khóa ngoại giữ mã tham chiếu có thật", đoạn 1); "Trong bộ mẫu, phòng còn hồ sơ trỏ tới thì không xóa được khỏi danh mục" (đoạn 2).
- Tác động: người học biết khóa ngoại làm gì (kiểm) nhưng không biết để làm gì. Cụ thể có ba chỗ hở:
  1. "giá trị khóa có thật" không nói đó là giá trị của khóa chính ở bảng kia; bài không bao giờ nói `PhongBan.MaPB` là khóa chính. Vì thế "một dòng cho mỗi mã" đọc như hệ quả của khóa ngoại, trong khi nó là hệ quả của khóa chính ở `PhongBan`.
  2. Không nêu việc khóa ngoại ngăn: một hồ sơ giữ mã phòng không còn trong danh mục, nên tìm tên phòng hoặc gom theo phòng sẽ hỏng. Đó là "vì sao".
  3. Chiều ngược (không xóa phòng còn hồ sơ) xuất hiện như một sự thật, không có lý do.
- Căn cứ: bài 1.2 hứa "Các bảng liên quan với nhau qua mã... Cách liên kết này học ở bài 1.4 và 1.5". Bài 1.4 chỉ dùng chữ "liên kết" lần đầu ở Hay nhầm 1 ("Luật giữ liên kết hợp lệ"), tức dùng trước khi nói. Câu "các bảng hợp đồng, chấm công và lương dùng mã này để nhắc tới đúng người" ở tiểu mục khóa chính đúng là chỗ nối nhưng không được gọi tên.
- Đề xuất: thêm một vế vào đoạn khóa ngoại, kiểu "bảng này lưu mã của bảng kia, và mã đó là khóa chính ở `PhongBan`, nên hồ sơ nào cũng tìm được phòng của nó; mã không có trong danh mục sẽ làm liên kết đứt". Thêm ngay sau câu "Trong bộ mẫu, phòng còn hồ sơ trỏ tới..." một vế lý do ("vì xóa thì các hồ sơ đó mất phòng"). Ngân sách khoảng +30 từ, bù bằng F7.

### F2. Cần làm rõ: caption đưa ra `MaQuanLy trỏ về NhanVien` và `nhận NULL` mà thân bài chưa dạy

- Câu gốc: caption của `Ssms` "MaQuanLy trỏ về NhanVien và nhận NULL."
- Tác động: đây là ca khó nhất của bài (khóa ngoại trỏ về chính bảng của nó, và là cột khóa ngoại duy nhất nhận NULL) nhưng chỉ nằm trong chú thích hình. Người mới sẽ hỏi: trỏ về cột nào của `NhanVien`? vì sao một bảng trỏ vào chính nó? vì sao cột này nhận NULL còn `MaPB`, `MaCD` thì không? Đồng thời `MaCD` và `MaQuanLy` không được nói nghĩa là gì và trỏ đi đâu (chỉ `MaPB` có giải thích trong thân bài). Người đọc thấy "(FK, varchar(10), null)" và "(FK, varchar(10), not null)" nhưng bài không nối điều bài 1.3 dạy về `null` với định nghĩa "mã khác `NULL`".
- Căn cứ: caption và thân bài; ý nghĩa nghiệp vụ (giám đốc không có quản lý trực tiếp) có trong hồ sơ công ty nhưng không có trong bài. Quy ước mục 2.2: hình đánh dấu đúng chỗ phần chữ nói, chú thích nói phần nào được đánh dấu. Caption đang vừa chú thích vừa dạy.
- Đề xuất: một câu trong thân bài (chẳng hạn trước hình): `MaQuanLy` lưu mã của người quản lý, nên trỏ về chính `NhanVien.MaNV`; hồ sơ không có quản lý thì để `NULL`, khóa ngoại chỉ kiểm khi có mã. Caption rút lại chỉ còn nói phần viền xanh.

### F3. Cần làm rõ: điểm tựa Excel nói "tương tự" nhưng bỏ điểm khác chính, và "không phải ô chọn" gây rối

- Câu gốc: "Database có hai luật làm việc tương tự, kiểm ngay khi ghi dữ liệu" (đoạn mở); "**không phải ô chọn trên màn hình**" (đoạn 2 khóa ngoại); Memo: "Cột mã NV không được trùng".
- Tác động: tô màu mã trùng chỉ để người nhìn thấy sau khi đã nhập, không chặn. Bài nói "tương tự" rồi cột Excel trong Memo viết "không được trùng", như thể Excel đã buộc. Người biết Excel cơ bản sẽ hiểu Excel cũng từ chối được. Sau đó bài lấy chính "danh sách chọn" làm điểm tựa ở đầu bài, rồi nói khóa ngoại "không phải ô chọn trên màn hình" mà không giải thích khác chỗ nào. Người học không biết vì sao điểm tựa vừa dùng lại bị phủ định.
- Căn cứ: quy ước mục 2 ("Không tuyệt đối hóa Excel", "khóa ngoại là luật kiểm khi ghi, không phải ô chọn trên màn hình"). Đoạn "Khi ... được khai báo là khóa chính, SQL Server từ chối..." có nêu "từ chối" nhưng không đối chiếu lại với Excel.
- Đề xuất: sửa câu mở thành đối chiếu: Excel tô màu hoặc đưa ra danh sách chọn để người nhập tự chú ý, database thì từ chối ngay khi ghi. Sửa "không phải ô chọn trên màn hình" thành vế nói rõ: nhập mã sai vẫn bị từ chối dù màn hình có ô chọn hay không. Memo cột Excel đổi thành "Tô màu mã trùng" / "Danh sách chọn từ sheet khác". Không thêm đoạn mới.

### F4. Cần làm rõ: tự kiểm tra không kiểm mục tiêu "đọc được nhãn PK, FK"

- Câu gốc: mục tiêu "đọc được nhãn PK, FK"; ba câu tự kiểm tra hiện chỉ hỏi định nghĩa, lý do mã lặp và ca KT/KD.
- Tác động: người học bấm "Đã học xong" mà không phải đọc một nhãn nào, trong khi tiểu mục "Đọc khóa trong SSMS" và hình chiếm nguyên một nhịp bài. Bài 1.3 có câu kiểm đọc nhãn `LuongCoBan (decimal(18,0), not null)`; bài 1.4 bỏ vế này.
- Căn cứ: quy ước 2.5/2.1: ít nhất ba câu, bao phủ mục tiêu đầu bài, gồm thuật ngữ nền tảng; khung bài nói bộ câu hỏi phải kiểm được các mục tiêu. Ba câu hiện có phủ hai trong ba vế mục tiêu.
- Đề xuất: thêm câu thứ tư, ví dụ "Từ nhãn `MaQuanLy (FK, varchar(10), null)`, bạn đọc được gì?" với đáp án: khóa ngoại, chuỗi tối đa 10 ký tự, được để `NULL`. Cần bài 1.3 và 1.4 (đủ). Khoảng +35 từ.

### F5. Cần làm rõ: "bộ mẫu" và `UNIQUE` dùng khi chưa có nghĩa

- Câu gốc: "Trong bộ mẫu, phòng còn hồ sơ trỏ tới thì không xóa được khỏi danh mục." và "Trong bộ mẫu, `SoCCCD` không có ràng buộc `UNIQUE`" (hai chỗ).
- Tác động:
  - "Bộ mẫu" không được định nghĩa ở 1.1–1.4 (spec cũng quyết không giới thiệu HRM_Demo trong các bài này). Bài 1.3 gọi cùng thứ là "database khóa học" (đoạn chuyển kiểu) và "bộ mẫu" (caption), nên hai bài đã dùng hai tên. Người học không biết "bộ mẫu" là dữ liệu thực hành hay quy định của công ty, nên cũng không biết các câu "trong bộ mẫu" là quy tắc chung hay chuyện của riêng dữ liệu này.
  - `UNIQUE` là tên ràng buộc chưa ai nói, dù người đọc có thể đoán gần đúng là "không trùng" nhờ định nghĩa khóa chính. Họ sẽ hỏi: khác khóa chính ở đâu? Bài 5.2 được trỏ ở cuối bài nhưng không có vế nối ngay tại câu.
- Căn cứ: quy ước 2: thuật ngữ mới cần có nghĩa tại chỗ; "Một tham chiếu bài sau không thay cho lời giải cần có".
- Đề xuất: chọn một tên (nên "database khóa học" như 1.3, hoặc đặt nghĩa "bộ dữ liệu mẫu của khóa học" một lần); `UNIQUE` thêm vế "ràng buộc bắt một cột không được trùng, như khóa chính nhưng cột vẫn nhận NULL" hoặc đổi thành "chưa có ràng buộc nào cấm trùng". Cách sau gọn hơn, không thêm thuật ngữ.

### F6. Biên tập: `dbo.`, ký hiệu `Bảng.Cột` và câu lệnh "mở" khi người học chưa kết nối

- Câu gốc: "mở **Tables → `dbo.NhanVien` → Columns**"; "Với `NhanVien.MaPB` trỏ sang `PhongBan.MaPB`".
- Tác động nhỏ nhưng thật: (a) tiền tố `dbo.` chỉ xuất hiện trong hình và câu lệnh này, bài nào ở 1.1–1.4 cũng chưa giải thích; (b) ký hiệu `Bảng.Cột` đã dùng từ bảng bài 1.3 và dùng dày ở bài này nhưng chưa ai nói nghĩa. Đặc biệt `MaPB` ở hai bảng là hai cột khác nhau (một là khóa ngoại, một là khóa chính), người học dễ nghĩ chúng là một. (c) Câu "mở" nghe như việc làm ngay, trong khi 1.1 nói chọn nơi thực hành ở trang Giới thiệu; người chưa kết nối chỉ đọc được hình.
- Căn cứ: HTML: `dbo.NhanVien` trong hình, spec chuyển giải thích schema sang trang Giới thiệu.
- Đề xuất: một vế "tên bảng đứng trước dấu chấm, tên cột đứng sau" lần đầu; "`dbo.` là nhóm chứa bảng, chưa cần quan tâm"; sửa "mở" thành "trên SSMS, mở..., hoặc đọc theo hình dưới nếu chưa kết nối". Có thể gộp một câu, không thêm tiểu mục.

### F7. Cần cắt: vế "nạp hàng loạt" và con trỏ 5.3–5.4; thiếu con trỏ 1.5

- Câu gốc: "việc nạp hàng loạt có kiểm hay không còn tùy cách nạp (bài 5.5)" (đoạn 2 khóa ngoại); "sửa dữ liệu an toàn ở bài 5.3–5.4" (đoạn "Ở bài này chỉ cần…").
- Tác động: "nạp hàng loạt" là khái niệm người mới chưa gặp (import xuất hiện đến 5.5). Vế này chống lời hứa quá (đúng về mặt kỹ thuật theo hiểu biết chung, tôi không kiểm bằng nguồn trong khóa) nhưng người học không dùng được và dễ nghĩ "vậy luật có đáng tin không". Bài 1.1 đã dùng vế "theo cách thông thường" ngắn hơn và đủ. Con trỏ "5.3–5.4" không gắn với câu nào trong bài, nên người đọc không biết vì sao trỏ tới đó. Trong khi câu hỏi tự nhiên nhất sau bài ("khóa ngoại trỏ tới bảng nào? xem ở đâu?") được trả lời ở bài ngay sau, 1.5, mà bài không nhắc.
- Căn cứ: quy ước mục 1 ("Chi tiết ngoài phạm vi bài thì bỏ, hoặc trỏ sang bài đi sâu hơn"), 4 con trỏ bài sau (4.6, 5.2, 5.3–5.4, 5.5) trong 529 từ.
- Đề xuất: rút câu thành "Khi ràng buộc đang bật, thêm, sửa hay xóa dữ liệu theo cách thông thường đều bị kiểm." (bỏ vế 5.5, tiết kiệm khoảng 15 từ); đổi con trỏ cuối thành "xem khóa ngoại trỏ tới bảng nào ở bài 1.5, cách khai báo ở bài 5.2". Bỏ "5.3–5.4".

### F8. Biên tập: "tham chiếu" chưa có nghĩa, "người" và "hồ sơ" lẫn

- Câu gốc: tiêu đề "Khóa ngoại giữ mã tham chiếu có thật"; Memo "phải có ở bảng được tham chiếu"; "dùng mã này để nhắc tới đúng người".
- Tác động nhỏ: thân bài dùng động từ "trỏ tới" (người học hiểu bằng ví dụ), còn tiêu đề và Memo dùng "tham chiếu", từ chưa ai giải thích. "Giữ mã tham chiếu" cũng mơ hồ (cột giữ mã hay luật giữ mã?). Tương tự, đoạn khóa chính nói "hồ sơ" rồi "đúng người", trong khi Hay nhầm 2 nhấn mạnh một người có thể có hai hồ sơ.
- Đề xuất: đồng bộ: tiêu đề "Khóa ngoại: mã phải có ở bảng kia", Memo "bảng được trỏ tới"; "đúng hồ sơ" thay "đúng người". Không thêm chữ.

### F9. Biên tập: Ứng dụng 1 lặp đoạn chính; Ứng dụng 2 chỉ phủ nửa bài

- Câu gốc: "**Nhắc đúng hồ sơ:** dùng mã thay vì họ tên... vì họ tên có thể trùng hoặc đổi" và "**Hiểu vì sao thao tác bị chặn:** ... kiểm xem mã có trong danh mục không, hoặc còn dòng nào đang trỏ tới mã đó".
- Tác động: ý 1 là việc làm thật nhưng nhắc lại gần nguyên câu "họ tên có thể trùng hoặc thay đổi" ở tiểu mục khóa chính (vi phạm "không lặp ý", trừ Ghi nhớ và tự kiểm tra). Ý 2 có giá trị thật, cho người đọc cách đoán nguyên nhân khi gặp thông báo, nhưng chỉ kể hai nguyên nhân của khóa ngoại; nửa còn lại của bài (mã bị trùng) không có chỗ ứng dụng, dù "không ghi được" cũng thường do mã đã tồn tại.
- Căn cứ: quy ước 2.3: ứng dụng nêu việc làm được nhờ chủ đề, kèm mục đích cụ thể; mục 1: không lặp ý.
- Đề xuất: ý 1 bỏ vế "vì họ tên có thể trùng hoặc đổi", thay bằng việc/mục đích cụ thể ("ghi `NV001` trong yêu cầu gửi IT để tìm đúng hồ sơ"). Ý 2 thêm một vế "mã đã có trong bảng chưa" cho khóa chính. Số ý giữ 2.

### F10. Biên tập: hình là mô phỏng nhưng chú thích hiển thị không nói

- Câu gốc: `Ssms` caption "Phần có viền xanh: ...".
- Tác động nhỏ: `aria-label` của hình ghi "Mô phỏng SSMS", chữ hiển thị thì không. Hình được dựng từ script bằng component, không phải ảnh chụp. Người học có thể tưởng đây là ảnh màn hình thật và so với máy mình (ví dụ thêm thư mục Keys, Constraints, Indexes chưa mở trong hình, thư mục `Keys` còn dễ làm người đọc nghĩ đó là nơi xem khóa). Cùng cách dùng ở bài 1.3 đã được duyệt, nên tôi coi là quyết định của dự án, chỉ ghi lại.
- Căn cứ: quy ước 2.2 và mục 3: hình giả lập phải nói rõ là minh họa nếu không phải kết quả thật. Hình ở đây không phải kết quả truy vấn, chỉ mô phỏng giao diện với tên cột lấy từ script.
- Đề xuất (nếu muốn sửa): caption bắt đầu bằng "Hình minh họa Object Explorer." Không cần thêm đoạn.

### G1. Giữ được: điều kiện và phạm vi lời hứa của khóa chính

- "Khi `NhanVien.MaNV` được khai báo là khóa chính..." đúng yêu cầu "ràng buộc chỉ có khi được khai báo". Không có câu nào hứa database tự bảo đảm dữ liệu đúng.

### G2. Giữ được: tách "có thật" khỏi "đúng" (Hay nhầm 1, Q3)

- Ví dụ `KD` gán cho người thuộc `KT` đúng và cụ thể, nối về "hợp lệ chưa chắc đúng" ở bài 1.1. Đây là phần có giá trị nhất của bài; không cắt.

### G3. Giữ được: mã lặp ở khóa ngoại

- "`PhongBan` giữ một dòng cho mỗi mã, `NhanVien` có nhiều dòng cùng mã phòng" trả lời đúng thắc mắc tự nhiên và đã có Q2. Chỉ cần F1 để nối nguyên nhân.

### G4. Giữ được: độ dài, in đậm, code, render

- 529 từ, đoạn ngắn, không câu dẫn rỗng. Bold chọn lọc: ba khái niệm lần đầu (khóa chính, ràng buộc, khóa ngoại) và nhãn `PK`/`FK`; bold cụm "không phải ô chọn trên màn hình" là đối chiếu, chấp nhận được. Tên bảng, cột, mã (`NV001`, `KT`, `KT01`, `KD`) đều dùng code. HTML build: không lộ backtick (0 ký tự), không escape thừa, `<summary>` dùng `<code>` đúng.
- Số lượng khung: Hay nhầm 2 ý, Ứng dụng 2 ý, tự kiểm tra 3 câu: đúng khung bài nền.

## 5. Điều chưa xác minh

- Cột `MaPB` của `PhongBan` có tồn tại và là khóa chính hay không. Bài viết như vậy; nhãn trong hình chỉ cho cột của `NhanVien`. Tôi không đọc script.
- "Phòng còn hồ sơ trỏ tới thì không xóa được" trên database khóa học (phụ thuộc cách khai báo khóa ngoại). Spec nói đây là ca đã kiểm ở bản cũ nhưng tôi không đọc kết quả đó; cũng không chạy lại.
- `KT01` không có trong danh mục, và `MaCD` trỏ tới `ChucDanh`. Không xác minh.
- Nhãn `(PK/FK, kiểu, null)` trong hình khớp script: component đọc script để dựng, nhưng tôi không so từng cột với script.
- Đúng/sai kỹ thuật của câu "việc nạp hàng loạt có kiểm hay không còn tùy cách nạp": theo hiểu biết chung là có cơ sở, chưa kiểm bằng tài liệu Microsoft.
- Bản build ở 1280/1024 px, hiển thị hình, `Memo` ở máy thật, bấm mở các `<details>`: không kiểm vì không tương tác browser. Chỉ đọc HTML.
- Build đối chiếu source chỉ bằng giờ file (17:27 và 17:28), không so nội dung từng chữ ngoài những chỗ trích ở trên.

## 6. Ưu tiên

1. F1 (để làm gì và nối khóa ngoại với khóa chính): đây là chỗ bài ngắn nhưng còn thiếu "vì sao".
2. F4 (tự kiểm tra thiếu đọc nhãn) và F2 (caption đưa kiến thức chưa dạy): sửa cùng nhau vì cùng liên quan đến phần SSMS và nhãn `null`.
3. F3 (điểm tựa Excel) và F5 (bộ mẫu, UNIQUE).
4. F7 (cắt vế nạp hàng loạt, thêm con trỏ 1.5), F6, F8, F9, F10 là biên tập.

Ngân sách từ: +F1 ~30, +F2 ~20, +F4 ~35, +F5 ~10, +F6 ~15, +F3 ~15; -F7 ~20, -F9 ~10. Ước tính ròng khoảng +95, còn khoảng 620–630 từ, dưới 700.

## 7. Kết luận

Bài 1.4 đủ để người mới phân biệt khóa chính với khóa ngoại và biết chúng kiểm được gì (và không kiểm được gì): ba câu tự kiểm tra trả lời được từ bài, không phải dạy bù, và không có câu nào hứa quá hay sai kiến thức mà tôi nhận ra. Chỗ còn vướng là các "vì sao" ở nửa sau: khóa ngoại để làm gì, nó trỏ tới khóa chính của bảng nào, vì sao `MaQuanLy` nhận NULL, và vì sao không xóa được phòng; thêm vào đó mục tiêu "đọc nhãn PK, FK" không có câu tự kiểm tra nào kiểm. Tôi chưa xác minh được những điều ở mục 5 (cần chạy hoặc đọc script) và chưa nhìn bản render bằng browser.

## 8. Tổng số finding

| Mức | Số lượng | Mã |
|---|---|---|
| Cần sửa | 0 | |
| Cần làm rõ | 5 | F1, F2, F3, F4, F5 |
| Cần cắt | 1 | F7 |
| Biên tập | 4 | F6, F8, F9, F10 |
| Giữ được | 4 | G1, G2, G3, G4 |
