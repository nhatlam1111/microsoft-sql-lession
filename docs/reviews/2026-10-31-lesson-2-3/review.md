# Review độc lập bài 2.3 — 31/10/2026

## Phạm vi, phiên bản và cách kiểm thực tế

Đóng vai người mới chỉ biết Excel văn phòng cơ bản, chưa biết SQL, lập trình hoặc quản trị hệ thống. Đọc bài nền 1.1–1.5, bài 2.1–2.2 mới rồi học thử bài 2.3; không lấy bài sau, đáp án hay kiến thức ngoài khóa học bù tiền đề. Model: **kế thừa model của phiên**, không đổi hoặc đoán tên model.

Phạm vi được giao là `src/content/lessons/2-3-and-or-in-between-like.mdx`, bốn đề trong YAML cùng tên và HTML bài 2.3. Đọc AGENTS.md, quy ước, template, hồ sơ công ty, brief; chỉ đọc ba mục được cho phép trong spec: Phạm vi và căn cứ, Thiết kế được áp dụng, Nghiệm thu. Không đọc report cũ hoặc evidence tác giả khác. Không dùng các teach-skills.

Phiên bản theo brief: working tree trên HEAD `f344099d9e3f9fa58b33a5c0762e6cfbaa467f93`, checkout `feat/lesson-2-1-excel-first`; build ngày 31/10/2026 lúc 15:41:21 +07. Không gọi Git để xác minh lại HEAD/branch. Đã tự tính SHA-256 bằng `Get-FileHash` cho **cả 7 file trong manifest**, tất cả khớp:

| File | SHA-256 khớp manifest |
|---|---|
| MDX 2.1 | `e96b434f1a51a31b2dc2efe672959a73a62b7680bbe963ea018798c1abca6440` |
| MDX 2.2 | `1c4261fac141161ab0fb0b452b0f985054d4b91c4b0e502471dceb3acd73af5f` |
| MDX 2.3 | `5f76307a16604f5fdd87a340aa1c1740979d8c423260bf3cce94c8f3d24115c3` |
| YAML 2.3 | `8695c1a88f35884718bc992cd2527913fb752f54a5406fa1d0eee984c7ff8191` |
| HTML 2.1 | `ef36b6b4bd2d909c0a8d66cfa4fc2ea41d12f8e3440b14eb494a79bab2659c05` |
| HTML 2.2 | `c4cdfce6b84b6f1b402965455c1d6be9357bf1bd17ecf393abcadb4678f1850e` |
| HTML 2.3 | `e61adaa30fdf265cba6f5ccd9712acd6399f3df51af85a040bd51a29c3310211` |

Công cụ thực tế: PowerShell để đọc có số dòng, `rg` tìm đường dẫn, Python chuẩn `html.parser`/`re` để đọc HTML và CSS được HTML liên kết. Đã đọc toàn bộ lời bài 2.3, mọi bảng/khối, ba panel drawer tĩnh và ba câu tự kiểm tra. Đọc đề YAML trong lượt đầu có loại phần `answer`, tự xác định cách làm từng đề rồi mới mở bốn `answer` để đối chiếu. Chỉ ghi report này; không sửa source/docs/test/Git, không tạo reviewer khác, không chạy test, DB, SQL, API hoặc browser.

## Rà theo thứ tự bài

Không phát hiện nhận xét yêu cầu sửa nội dung có đủ căn cứ trong phạm vi học thử này. Những đoạn dưới đây **giữ được**; mỗi kết luận chỉ dựa vào nguồn và cấu trúc tĩnh đã đọc.

### 1. Mục tiêu và tình huống — Giữ được

- Vị trí: MDX dòng 11, 21–26. Câu gốc: “Giữ hồ sơ thuộc một trong hai phòng, đồng thời nằm trong khoảng ngày yêu cầu.”
- Tác động: người mới biết phải nối hai yêu cầu độc lập, không hiểu “hoặc” thành lấy bất kỳ hồ sơ nào đạt một trong toàn bộ điều kiện.
- Căn cứ: yêu cầu bốn cột, khoảng từ 01/01 đến hết 30/06/2023, mã phòng hiện tại và phạm vi kể cả người đã nghỉ đều rõ. Giả định không yêu cầu sắp xếp không mâu thuẫn với kết quả sau đó. Mục tiêu bốn khả năng có phần giảng và phần luyện tương ứng.
- Đề xuất: giữ; không cần thêm giải thích lịch sử phòng vì dòng 24 đã phân biệt phòng hiện tại với phòng lúc vào làm.

### 2. Excel → câu SQL → LineMap — Giữ được

- Vị trí: MDX dòng 32–62. Câu gốc: “Một dòng phải qua bộ lọc của cả hai cột mới còn hiển thị.”
- Tác động: có điểm tựa từ AutoFilter của 2.2 để hiểu `AND`; câu SQL xuất hiện trước phần phân tích nên nhìn được việc phải làm trước khi học thuật ngữ.
- Căn cứ: chỉ một câu chính trên `NhanVien`, bốn cột đúng yêu cầu; `LineMap` có ví dụ từng dòng, giải thích `IN`, `AND`, hai đầu `BETWEEN`. Nhóm `(MaPB = 'KD' OR MaPB = 'IT')` và lý do `AND` trước `OR` đã có ở dòng 58–60, không đợi đến phần ôn mới dạy ngoặc. Bài 2.1 đã dạy cột/thứ tự/alias, 2.2 đã dạy `WHERE`, chuỗi trong nháy và ngày `yyyymmdd`.
- Hình Excel: số dòng `1, 4, 44` giữ dấu hiệu lọc trên sheet xếp theo mã. Bốn ô `C4`, `D4`, `C44`, `D44` đúng cột phòng/ngày mà lời dẫn nói tới; HTML có bốn ô `xl-mark`, hai ô ngày đồng thời có `xl-num`.
- Đề xuất: giữ. Đoạn `date` không có giờ và dẫn sang bài 2.8 đủ đặt giới hạn của khoảng ngày, không cần mở rộng bài này thành bài về thời gian.

### 3. Tiền đề LIKE — Giữ được

- Vị trí: MDX dòng 64–68. Câu gốc: “`%` thay từ `0` ký tự trở lên, `_` thay đúng một ký tự.”
- Tác động: đủ để suy ra cả tìm chuỗi ở mọi vị trí và yêu cầu chỉ còn một ký tự cuối, không cần biết hàm xử lý chuỗi hoặc tách từ.
- Căn cứ: có ví dụ bám `HoTen`/`Nguyễn Thu Hà` của tình huống; giải thích từng ký tự đại diện, hai dấu `%` cho mọi vị trí, khác biệt với `=`, giữ `N` cho tiếng Việt và quy tắc hoa thường/dấu của bộ mẫu. “Collation” được giải nghĩa ngay trong ngoặc. Mẫu chỉ so ký tự, không xác nhận họ/tên gọi, phù hợp đề 3–4. Phần này nằm trước Ghi nhớ và tự kiểm tra.
- Đề xuất: giữ hai đoạn gọn hiện có. Không cần thêm truy vấn hoặc kết quả ngoài tình huống để dạy bù.

### 4. RunFlow và toàn bộ drawer tĩnh — Giữ được

- Vị trí: MDX dòng 72–133. Câu gốc: “Các điều kiện nằm chung trong bước `WHERE`”.
- Tác động: tránh hiểu `IN`, `AND`, `BETWEEN` thành các lượt máy quét bảng riêng hoặc nhầm sơ đồ logic với cách đọc vật lý.
- Căn cứ đã đọc từng panel:

| Bước | Đã đối chiếu ở nguồn và HTML |
|---|---|
| `FROM` | 48 hồ sơ, 12 cột; trích NV003/NV030/NV043. Thẻ nhanh chỉ ba cột, có dấu thêm 45 dòng và 9 cột; bảng drawer có đủ 12 cột và chú thích trích 3/48 dòng. Câu xem bước chưa lọc. |
| `WHERE` | Giữ NV003/NV043, loại NV030 vì NS; vẫn 12 cột, tổng 2. Câu xem bước dùng đúng nhóm phòng và khoảng ngày của câu chính. |
| `SELECT` | Vẫn 2 hồ sơ, còn 4 cột/tiêu đề đúng thứ tự; drawer nói đây là danh sách chị Hạnh cần. Thẻ nhanh chỉ ba cột và có dấu thêm một cột, không phải kết quả thiếu cột. |

`meaning` của mỗi bước bắt đầu bằng đúng từ khóa; lời và dữ liệu bước khớp nhau. Không có `Messages`, `Ssms` hoặc `Erd` độc lập trong bài 2.3 cần đọc thêm; các bảng Results/Messages nằm trong mô phỏng của drawer đã được đọc.

Đề xuất: giữ. Các số và giá trị có trong hồ sơ công ty nhất quán với bài; tính chính xác trên database thật vẫn chưa được tôi xác minh.

### 5. Kết quả và câu trả lời — Giữ được

- Vị trí: MDX dòng 135–142. Câu gốc: “Hai dòng được đánh dấu là toàn bộ kết quả của bộ mẫu.”
- Tác động: người mới phân biệt được bảng trích ở bước nguồn với kết quả đủ hai dòng, biết câu lọc không tự thêm điều kiện đang làm.
- Căn cứ: `Result` có đúng bốn cột, hai dòng NV003/NV043; HTML đánh dấu đúng hai dòng bằng `res-mark`. Câu trả lời nằm ngay sau bảng, nêu đủ phạm vi và trạng thái thực tế; drawer trước đó có `TrangThai` để đối chiếu. Cảnh báo thứ tự dòng ở dòng 142 thống nhất với việc không có `ORDER BY`.
- Đề xuất: giữ; không cần thêm mục trả lời riêng.

### 6. Hay nhầm, Ứng dụng, Ghi nhớ và tự kiểm tra — Giữ được

- Vị trí: MDX dòng 148–195. Câu gốc: “xuống dòng và thụt lề không thay được ngoặc” (dòng 60, được minh họa bằng lỗi ở dòng 148).
- Tác động: các lỗi có hậu quả cụ thể, đều là biến thể của câu chính; không kéo người mới sang bảng/tình huống mới.
- Căn cứ: bốn lỗi lần lượt củng cố ngoặc, thứ tự mốc, danh sách `IN` và mỗi vế `OR` phải có phép so sánh. Con số 15 ở lỗi thiếu ngoặc nhất quán nội bộ với hồ sơ công ty: 14 hồ sơ KD cộng NV043 thuộc IT trong khoảng; chưa xác minh bằng SQL. Ba ứng dụng nói được công việc làm nhờ lọc nhóm/mã/mẫu chữ. Bốn dòng Memo ôn đúng nội dung đã giảng. Ba câu tự kiểm tra đứng sau Ghi nhớ, trước Bài tập và phủ nhóm điều kiện, hai đầu khoảng, hai ký tự đại diện; đáp án không bổ sung kiến thức chưa dạy.
- Đề xuất: giữ. Không thấy đoạn vòng vo/lặp ý cần cắt ngoài phần nhắc lại có chủ đích để ôn; không đề nghị thêm khối cho đủ số lượng.

### 7. Bài tập, đường thực hành và điều kiện hoàn thành — Giữ được trong phạm vi tĩnh

- Vị trí: MDX 2.3 dòng 199–201; MDX 2.1 dòng 148–152; HTML Giới thiệu mục Chọn nơi thực hành/Cách dùng trang. Câu gốc 2.3: “Cột kết quả phải đúng vị trí đề yêu cầu; thứ tự dòng không quan trọng.”
- Tác động: hướng người học kiểm đúng tiêu chí, không thêm sắp xếp hoặc điều kiện ngoài đề. Không thấy câu nào bắt người chọn web phải kết nối SSMS.
- Căn cứ: 2.1 đã dẫn chỗ chọn một trong ba lối thực hành; HTML Giới thiệu giải thích mã web do người phụ trách/người gửi khóa học cung cấp, khác tài khoản SSMS; người chỉ dùng web bỏ qua kết nối SSMS. Nguồn riêng có đường tạo dữ liệu và tự đối chiếu, không hứa chấm tự động. Bốn đề tách rõ phạm vi và thứ tự cột. Cuối HTML bài 2.3 nhắc bấm hoàn thành khi tự viết lại được câu lệnh mà không nhìn bài; không nhầm việc đọc lời ôn với SQL đã chạy đúng.
- Đề xuất: giữ. Chưa thử liên kết, đăng nhập, trang soạn bài hoặc bộ chấm.

### Các câu “tại sao/để làm gì” khi học thử

| Tự hỏi | Bài đã trả lời ở đâu |
|---|---|
| Vì sao phải qua cả hai bộ lọc? | Dòng 32 và LineMap `AND` dòng 54. |
| Vì sao hai mã phòng dùng `OR`/`IN`, không `AND`? | Dòng 58: một ô không đồng thời bằng hai mã khác nhau. |
| Vì sao cần ngoặc khi thêm ngày vào nhóm `OR`? | Dòng 60; hậu quả cụ thể ở Hay nhầm 1. |
| Vì sao ngày đúng mốc cuối vẫn được giữ? | LineMap dòng 55 và điều kiện cột `date` dòng 62. |
| Vì sao mẫu cần `N`, dấu `%` hoặc `_`, không chỉ `=`? | Dòng 64–66, nối với Unicode ở 1.3/2.2. |
| Chữ H viết hoa có bỏ sót h trong dữ liệu không? | Dòng 66 nêu bộ mẫu không phân biệt hoa thường; không cần đọc đáp án để biết. |
| Danh sách có phải phòng tại năm 2023 hoặc chỉ người còn làm? | Phạm vi dòng 24 và câu trả lời dòng 140 đã giới hạn rõ. |
| Sơ đồ có nói máy quét bảng theo thứ tự này không? | Dòng 72 nói đây là thứ tự logic. |

Không có câu hỏi thiết yếu nào trong bảng trên phải dựa vào bài sau hoặc answer mới giải được.

## Bảng tiền đề từng bài tập

Các cách làm dưới đây đã được xác định **trước khi đọc answer YAML**. Không chép nguyên đáp án vào report. Sau đó đọc answer chỉ để đối chiếu xem có đòi thêm kiến thức nào không.

| Đề và vị trí YAML | Kiến thức cần; cách làm tự xác định | Đã dạy ở đâu | Còn thiếu / đối chiếu answer |
|---|---|---|---|
| 2-3-1, dòng 4–13 | Chọn đúng bốn cột; nhóm hai mã phòng rồi đồng thời lọc trạng thái tiếng Việt; không thêm ngày. Có thể dùng danh sách mã hoặc nhóm `OR` có ngoặc. | 2.1 dòng 49–60: chọn/thứ tự cột, nháy và câu đọc; 2.2 dòng 53, 56, 60: `WHERE`, `=`, chuỗi và `N`; 2.3 dòng 53–60: `IN`, `AND`, `OR`, ngoặc. | Không thấy tiền đề thiếu. Answer dùng nhóm `OR` và `AND`, đúng đường đã học; không đòi cú pháp mới. |
| 2-3-2, dòng 19–29 | Hai mã trên cùng cột; khoảng ngày lấy cả hai mốc; đổi vị trí cột ngày lên trước mã phòng; không lọc trạng thái. | 2.1 dòng 50: thứ tự cột; 2.2 dòng 62: ngày `yyyymmdd`; 2.3 dòng 53–62: danh sách mã, `AND`, `BETWEEN`, mốc nhỏ trước và cột `date`. | Không thấy tiền đề thiếu. Answer kết hợp hai điều kiện bằng cú pháp trong câu chính, không thêm kiến thức. |
| 2-3-3, dòng 35–44 | Hai cột mã/tên; mẫu chữ tiếng Việt, hai đầu có ký tự đại diện để tìm chuỗi ở mọi vị trí; không tách từ và không thêm bộ lọc khác. | 2.1: hai cột và bảng nguồn; 1.3/2.2: Unicode; 2.3 dòng 64–66: `LIKE`, `%`, hai đầu mẫu, chuỗi khác từ riêng. | Không thấy tiền đề thiếu. Answer đúng ý tìm chuỗi ở mọi vị trí, dùng kiến thức vừa giảng. |
| 2-3-4, dòng 48–57 | Hai cột mã/tên; phần trước H dài tùy ý, sau H đúng một ký tự rồi kết thúc; hiểu quy tắc hoa thường của bộ mẫu. | 2.3 dòng 64: `%` từ 0 ký tự và `_` đúng một ký tự, có ví dụ phân tích từng phần; dòng 66: mẫu so chuỗi và collation không phân biệt hoa thường. | Không thấy tiền đề thiếu. Có thể ghép mẫu từ nghĩa hai ký tự đại diện mà không cần học hàm độ dài/tách chuỗi; answer không đòi thêm cú pháp. |

Không có trường hợp “chưa được dạy” hoặc “đã dạy nhưng khó tìm” làm vướng bốn đề trong lần đọc này. Kết luận này nói về đủ kiến thức để lập câu lệnh; không xác nhận kết quả thực tế, cách chấm hoặc mọi người học đều tự hoàn thành được.

## Ưu tiên

**Không có finding Cần sửa / Cần làm rõ / Cần cắt / Biên tập có căn cứ cần chuyển thành thay đổi nội dung.** Các đoạn được ghi Giữ được ở trên không tạo yêu cầu tăng thêm nội dung. Cả bốn đề có đủ tiền đề từ chuỗi bài đã đọc.

Trước nghiệm thu kỹ thuật, vẫn cần người viết giữ bằng chứng kiểm SQL/bộ chấm và UI theo quy ước; report này không thay các phép kiểm đó và không cấp quyền push/deploy.

## Nguồn, đối chiếu HTML/CSS và giới hạn

- Nguồn đã đọc: brief của lượt này; AGENTS.md; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; ba mục spec được chỉ định; toàn bộ MDX 1.1–1.5, 2.1–2.3; đề rồi answer YAML 2.3; manifest; HTML 2.3; HTML Giới thiệu để đối chiếu đường thực hành; CSS liên kết `dist/_astro/_slug_.Cl6dmZ7l.css`. HTML Giới thiệu/CSS được đọc như ngữ cảnh hiện hành, không nằm trong bảy hash manifest.
- HTML 2.3 giữ nháy thẳng trong SQL và ba summary; không thấy backtick hoặc ký tự escape tab/xuống dòng lộ ra như chữ thường trong nội dung đã giải mã. Câu chính, câu xem bước WHERE và SELECT có tab thật trong HTML và `data-copy`. CSS khai báo `--sql-tab-size: 4`, áp dụng cho `.sql-code` và `.rf-q`; đây là đối chiếu cấu trúc, chưa quan sát hình hoặc thao tác dán.
- Các đoạn query trong `.rf-q` không có newline văn bản ở một số ranh giới tô sáng. Đã đọc CSS liên kết: `.rf-q` dùng grid, `.rf-q-dim` và `.rf-q-on` đều `display:block`, nên ranh giới đó được chia khối. Không có căn cứ từ cấu trúc này để báo lỗi dính dòng. Phạm vi focus và tab bên trong mỗi khối khớp phần câu đang giải thích; chưa mở drawer thật.
- Không chạy hoặc xác minh SQL, số liệu, nguyên văn lỗi trên database; không đọc seed/script, secret hoặc tài liệu SQL ngoài khóa học. Sự nhất quán với hồ sơ công ty không thay kiểm live, nhất là các cột chi tiết chỉ xuất hiện trong drawer.
- Không dùng browser, không có viewport thực tế; chưa kiểm mở/đóng drawer, bàn phím, sao chép/dán, nháp/clipboard, SSMS, truy cập web có mã, nút Chạy/Nộp bài, bộ chấm hoặc lưu tiến độ. Đọc HTML không chứng minh các tương tác đó hoạt động.
- Không chạy test nên không có kết quả pass/fail hoặc lỗi nền để kết luận trong lượt này. Thời lượng 20 phút chưa được đo trên người học thật.
