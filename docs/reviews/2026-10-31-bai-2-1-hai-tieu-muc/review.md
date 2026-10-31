# Review bài 2.1 sau khi rút còn hai tiểu mục (học thử từ góc nhìn người mới)

## 1. Phạm vi, phiên bản, công cụ

- Bài: `src/content/lessons/2-1-chon-cot-dat-ten-cot.mdx`; đề: `src/content/exercises/2-1-chon-cot-dat-ten-cot.yaml`.
- Source: commit `59f6870` (nhánh `feat/lesson-2-1-excel-first`, commit lúc 14:20:29 ngày 31/10/2026), working tree sạch. Build: `dist/bai/2-1-chon-cot-dat-ten-cot/index.html` (14:20), nội dung khớp source (đối chiếu tiêu đề, các đoạn văn, Result, RunFlow và phần Bài tập; không thấy khác biệt).
- Đã đọc: AGENTS.md, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, bài 1.1 đến 1.5, `src/pages/gioi-thieu.astro`, 80 dòng đầu bài 2.2 để đối chiếu mạch kể. Không đọc report cũ, `HRM_Demo.sql`, secret.
- Công cụ: chỉ đọc nguồn và HTML trong `dist` (tách chữ, soi thẻ `pre`, thẻ Excel, các island RunFlow/Result), đọc mã component `ExerciseWorkspace.tsx`, `SqlEditor.tsx`, `Exercises.astro` để xem lời bài nói về trang web có khớp không. **Không** mở browser, không chạy SQL, không kết nối database, không gọi API/runner.
- Bố cục bài đúng quyết định đã duyệt: phần chính "Từ bảng nhân viên đến danh sách gửi Kế toán" có đúng hai tiểu mục ("Từ chép cột trong Excel đến câu SELECT", "Câu lệnh cho tình huống"); trong tiểu mục sau câu trả lời chị Hạnh nằm sau Results/Messages và trước RunFlow. Không có tự kiểm tra (bài có Bài tập nên không bắt buộc).

## 2. Rà theo thứ tự bài

### 2.1 Tình huống

Giữ được. Yêu cầu của chị Hạnh rõ (ba cột, thứ tự, tiêu đề, kể cả người đã nghỉ, không CCCD/email), giả định nêu phạm vi (`NhanVien`, không lọc) và nói chưa yêu cầu thứ tự dòng. Khớp hồ sơ công ty mục 7 (48 hồ sơ, ba cột có tiêu đề tiếng Việt). Không nhắc vai trò người đọc.

### 2.2 Tiểu mục 1: "Từ chép cột trong Excel đến câu SELECT" (khoảng 460 chữ, ước lượng của người review)

Đếm ý trong tiểu mục: (1) hình Excel; (2) câu truy vấn; (3) `FROM`; (4) `SELECT` và danh sách cột; (5) dấu `;`, xuống dòng, viết hoa; (6) thứ tự cột; (7) cột không chọn, số dòng không đổi; (8) chỉ đọc; (9) tra tên cột ở đâu; (10) `*` và `TOP (5)` kèm khối Sql; (11) rủi ro `*`, `TOP` không `ORDER BY`; (12) alias `AS`; (13) alias chỉ có trong câu; (14) ngoặc vuông; (15) không thêm `N`; (16) ranh giới bài. Khoảng 15 ý trong một tiểu mục cho bài viết SQL đầu tiên là đông. Các ý (1) đến (9), (12), (14) là xương sống và đều cần. Ý (10), (11) không cần cho tình huống lẫn bốn đề (xem F1). Ý (13), (15) là các vế phòng xa, giữ được nhưng có thể gọn hơn (F4).

Chuyển ý Excel sang SQL: tự nhiên. Chuỗi "chép sheet, chọn sheet, chép cột, sửa tiêu đề" được đối ứng lần lượt với `FROM`, `SELECT`, `AS` và mỗi đối ứng có câu nói rõ ("giống việc chọn sheet", "giống việc chép cột", "ứng với bí danh cột"). Câu "Trong SQL không có sheet nào đang mở, nên bạn gửi cho SQL Server một câu truy vấn" trả lời được câu hỏi "vì sao phải viết câu lệnh" và nối đúng với 1.1.

Chuyển từ `SELECT` sang `AS`: dùng được nhưng đoạn `*`/`TOP (5)` nằm chen giữa làm mạch đứt. Đọc liền: chọn cột (đoạn 44) rồi đến "xem thử bảng lạ" (46 đến 51) rồi mới "Việc sửa dòng tiêu đề ứng với bí danh cột" (53). Đoạn 53 mở bằng "Việc sửa dòng tiêu đề" mà hình Excel có dòng tiêu đề đã cách 8 đoạn; người học phải tự nhớ ra `A1:C1`. Không vấp hẳn, nhưng mất nhịp (F4, F5).

### 2.3 Tiểu mục 2: "Câu lệnh cho tình huống" (khoảng 300 chữ, chưa tính drawer)

- Ánh xạ yêu cầu sang cột: "Ba cột tương ứng với yêu cầu là `MaNV`, `HoTen`, `NgayVaoLam`" khớp tên cột bài 1.2 và 1.3. Giữ được.
- Đường chạy: web (Làm bài, Chạy (F5), mã truy cập), SSMS (kết nối, mục chạy câu lệnh), ba lối (chọn nơi thực hành). Đối chiếu nguồn: neo `#ket-noi-ssms`, `#chay-cau-lenh`, `#chon-noi-thuc-hanh` đều có trong `gioi-thieu.astro` và trong HTML build; nút "Làm bài", "Chạy (F5)", "Nộp bài", "Sơ đồ database" có trong `Exercises.astro` và `ExerciseWorkspace.tsx`; trang web hỏi mã khi Chạy lần đầu, khớp lời bài. Không bắt người dùng web tự kết nối SSMS. Nhất quán, giữ được. Chỉ lưu ý đoạn này gồm bốn câu, ba nhánh, hơi đặc nhưng mỗi nhánh đều phải có; không đề xuất cắt.
- Results/Messages: đoạn giải thích dùng đúng thuật ngữ vừa gặp; làm rõ "rows affected" không phải số dòng bị sửa là chỗ người mới hay vấp, giữ. Giải thích số thứ tự dòng không phải cột của bảng cũng tốt. Web có đủ hai tab và cột số thứ tự dòng (đọc `ExerciseWorkspace.tsx`), nên lời bài đúng cho cả hai đường.
- Câu trả lời chị Hạnh: nằm cạnh kết quả, đúng phạm vi ("dữ liệu mẫu", "không có điều kiện lọc"), tách việc database làm (đủ 48 hồ sơ, đúng ba cột) với quyết định nghiệp vụ (có cần phân biệt người đã nghỉ hay không). Giữ được. Lưu ý: người học không tự thấy ba mã `NV020`, `NV033`, `NV041` trong hình trích năm dòng; đây là sự thật của bộ mẫu, khớp hồ sơ công ty mục 3 và mục 2, nên không coi là sai, chỉ là điều người học phải tin bài.
- Đoạn "Để chép sang Excel trong SSMS" xem F3.
- RunFlow hai bước: `FROM` rồi `SELECT`; drawer mở bằng từ khóa, có số dòng thật (48), nhắc cả người đã nghỉ, đối chiếu 12 cột nguồn với ba cột kết quả. `query`, `focus`, `sql` của bước khớp nhau (đọc HTML: hai dòng của câu lệnh được dựng thành hai khối `display:block`, không có ký tự `\t` hay backtick lộ ra). Hai bước lặp nhiều ý đã nói ở trên nhưng hình 12 cột thu về 3 cột là minh họa cụ thể nên giữ được. Chỉ một câu dẫn khó hiểu (F6).

### 2.4 Hay nhầm ở đâu

Năm ý, đều có hậu quả cụ thể. Kiểm bằng kiến thức T-SQL thông thường (không chạy): (1) bỏ dấu phẩy thì `HoTen` thành bí danh của `MaNV` là đúng vì `AS` có thể bỏ; (2) `'HoTen'` trong nháy đơn là chuỗi cố định, đúng; (3) tiêu đề không được kiểm nghĩa, đúng; (4) 48 dòng, `KD` lặp 14 lần khớp hồ sơ công ty mục 2 (14 hồ sơ `KD`), đúng; (5) lặp ý với đoạn `TOP` đã nói (F1). Ý (1) là chỗ duy nhất dạy rằng `AS` có thể bỏ, hợp lý khi nằm trong lỗi.

### 2.5 Ứng dụng

Bốn ý, đều là việc làm được nhờ chủ đề (xem mẫu bảng, chọn cột theo mẫu người nhận, đặt tiêu đề, giới hạn cột trả về kèm lời rào "không thay phân quyền"). Giữ được. Ý đầu phụ thuộc vào `TOP (5)`, nếu cắt như F1 thì viết lại bằng `*` (xem F1).

### 2.6 Ghi nhớ

Sáu hàng; xem F7.

### 2.7 Bài tập (phần giới thiệu)

Ba đoạn giới thiệu; xem F8. Điều "không so tên tiêu đề, tự đối chiếu" được nói rõ ở đây và khớp YAML (`ordered: false` và ghi chú ở đề 4).

## 3. Bảng tiền đề từng bài tập

Cách làm do người review tự xác định từ kiến thức đã học trước, sau đó mới mở YAML đối chiếu cột đầu ra. Không chép đáp án.

| Đề | Cần kiến thức gì | Đã dạy ở đâu | Còn thiếu / khó tìm |
|---|---|---|---|
| 1. Toàn bộ hợp đồng | Lấy mọi cột của một bảng; tên bảng hợp đồng; hiểu `NgayKetThuc` rỗng là `NULL` | Dấu `*` và mọi cột: bài 2.1 tiểu mục 1. Tên `HopDong`: bài 1.2, 1.3, 1.5. `NULL`: bài 1.3 | Không thiếu. Đề liệt kê sẵn 6 cột kết quả nên tự kiểm được. Bẫy: sao chép nhầm ví dụ có `TOP (5)` sẽ chỉ ra 5 dòng, nhưng đề nói "mọi hợp đồng" và bài nói `TOP` là tối đa n dòng, người đọc kỹ tránh được |
| 2. Rà soát email đang lưu | Chọn đúng hai cột theo thứ tự, không lọc dòng | Danh sách cột và thứ tự: tiểu mục 1; tên `NhanVien`, `HoTen`: bài 1.2; `Email`: bài 2.1 (nhắc trong đoạn về `*`) và hình RunFlow | Không thiếu. Đề tự nhắc tên hai cột. Đề không dạy gì về việc tìm hồ sơ thiếu email (bài 2.5), và cũng không bắt làm |
| 3. Ngày vào làm đứng trước mã nhân viên | Cột kết quả theo thứ tự viết trong `SELECT`, khác thứ tự trong bảng | Bài 2.1 tiểu mục 1 (ví dụ `TenPB, MaPB`) | Không thiếu |
| 4. Danh mục chức danh có tiêu đề tiếng Việt | Chọn hai cột, đảo vị trí, đặt hai alias có dấu và khoảng trắng bằng ngoặc vuông | `AS`, ngoặc vuông, không cần `N`: bài 2.1 tiểu mục 1 | **Đã dạy nhưng phải tự tìm**: tên bảng danh mục chức danh và tên hai cột tên chức danh/mã chức danh không có trong lời bài 1.x hay 2.1; chỉ nhìn được ở sơ đồ (bài 1.5 hoặc nút "Sơ đồ database", Object Explorer), điều mà phần Bài tập đã dặn. Có thể suy tên cột tương tự `TenPB`/`MaPB` nhưng không thể đoán tên bảng nếu không mở sơ đồ. Chấp nhận được vì đề cố ý luyện thao tác tra tên; không coi là thiếu kiến thức |

Kết luận phần đề: người học làm được cả bốn đề bằng đúng những gì tiểu mục 1 đã giảng, cộng với việc tra tên trên sơ đồ. Không thấy đề nào cần kiến thức của bài sau. Bẫy duy nhất là đề 4 vì bộ chấm không so tiêu đề; bài đã báo trước.

## 4. Findings ưu tiên

### F1. Cần cắt: cụm `*`/`TOP (5)` ở năm nơi, trong đó hai nơi nói cùng một ý

- Câu gốc (tiểu mục 1): "Muốn xem thử một bảng lạ… dùng dấu `*`… và `TOP (5)` ngay sau `SELECT`…" cùng khối Sql `SELECT TOP (5) *`; "Chưa có `ORDER BY` thì `TOP` không bảo đảm chọn hồ sơ nào…"; Hay nhầm 5: "Tưởng `TOP (5)` chọn năm mã nhỏ nhất… Chưa có `ORDER BY` thì đó chỉ là năm dòng bất kỳ"; Ứng dụng 1; Memo hàng 1.
- Tác động tới người mới: `TOP` không cần cho tình huống chị Hạnh và không cần cho bốn đề; chỉ có dấu `*` là cần (đề 1, và `gioi-thieu` dùng `SELECT * FROM PhongBan`). `TOP` thêm một khái niệm, một khối code, một cảnh báo (`ORDER BY`) vào tiểu mục vốn đã đông, đúng đoạn làm đứt mạch `SELECT` sang `AS`. Ý "chưa có `ORDER BY` thì `TOP` không bảo đảm hồ sơ nào" xuất hiện cả ở đoạn giảng và ở Hay nhầm 5, vi phạm mục 1 của quy ước (mỗi ý nói một lần).
- Căn cứ: đọc bài, đối chiếu YAML; quy ước mục 1 và mục 2.1 ("giữ kiến thức đủ để hiểu và xử lý yêu cầu của bài").
- Đề xuất ngắn (theo hướng không tăng độ dài): giữ `*` trong một câu ("dùng `*` thay danh sách cột để lấy mọi cột; `*` lấy cả `SoCCCD`, `Email` nên bản gửi đi phải liệt kê cột"), bỏ khối Sql `TOP` và đoạn giải thích; hoặc nếu tác giả muốn giữ `TOP` để dẫn khóa học (`gioi-thieu` có nhắc `SELECT TOP (5) *`), giữ một vế "`TOP (5)` lấy tối đa năm dòng" và bỏ đoạn về `ORDER BY` ở tiểu mục 1, để Hay nhầm 5 gánh hậu quả. Ứng dụng 1 viết lại thành "Xem mẫu dữ liệu: lấy mọi cột của một bảng lạ để nhận ra các cột lưu gì…". Ước tính cắt được 60 đến 80 chữ và một khối Sql. Đây là gợi ý, không phải lỗi sai; mức tin cậy: người review không thấy `TOP` là kiến thức sai, chỉ thấy không cần ở bài này.

### F2. Cần làm rõ: `ORDER BY` dùng trước khi được giải nghĩa

- Câu gốc: "Chưa có `ORDER BY` thì `TOP`…" (tiểu mục 1) và "câu chưa có `ORDER BY` nên thứ tự dòng có thể khác hình" (tiểu mục 2). Cuối tiểu mục 1 chỉ nói "sắp xếp dòng ở bài 2.4", không gắn tên `ORDER BY` với việc sắp xếp.
- Tác động tới người mới: người học suy ra được từ tiếng Anh, nhưng "chưa có ORDER BY" là cụm cần nghĩa tại chỗ; đây là thuật ngữ mới, khác với một mã dữ liệu mới.
- Thể loại: **chưa được dạy** (có nhắc, chưa định nghĩa).
- Đề xuất: ở lần dùng đầu còn lại sau F1 (câu "câu chưa có `ORDER BY`…" ở tiểu mục 2), thêm vế "`ORDER BY` là phần sắp xếp dòng, bài 2.4"; hoặc sửa câu cuối tiểu mục 1 thành "sắp xếp dòng bằng `ORDER BY` ở bài 2.4". Thay một cụm bằng một cụm, không thêm câu.

### F3. Cần cắt: đoạn "Để chép sang Excel trong SSMS…"

- Câu gốc: "chọn vùng kết quả (Ctrl+A chọn cả lưới) → chuột phải → **Copy with Headers**… Nếu ô dán vào là ngày thật, dùng **Format Cells** để hiển thị ngày/tháng/năm. Bản chép không tự cập nhật theo database."
- Tác động tới người mới: chỉ dùng cho người chạy bằng SSMS (bài tự nói web không có lệnh này); không cần cho đề nào; thêm ba tên thao tác mới (Ctrl+A, Copy with Headers, Format Cells) vào đoạn trả lời tình huống, làm kéo dài chỗ lẽ ra đã khép (người đọc đã có câu trả lời chị Hạnh). Câu "nếu ô dán vào là ngày thật" mô tả hành vi Excel khi dán chuỗi `2024-03-01`; phụ thuộc cài đặt vùng của máy, **chưa xác minh** và bài đã tự đặt điều kiện "nếu".
- Điều đáng giữ: "bản chép không tự cập nhật theo database" (khớp ý "file xuất chỉ là bản chụp" ở bài 1.1).
- Đề xuất: nén còn một câu: "Muốn đưa kết quả vào Excel, chép lưới Results (trong SSMS dùng **Copy with Headers**); bản chép không tự cập nhật theo database." Bỏ Ctrl+A và Format Cells; cũng bỏ hàng Memo tương ứng hoặc gộp (F7). Cắt khoảng 25 chữ.

### F4. Biên tập: lặp ý "alias không đổi dữ liệu" và vài câu thừa trong tiểu mục 1

- Câu gốc: "giá trị và kiểu dữ liệu không đổi" (đoạn 53); "cũng như trong Excel, bạn sửa tiêu đề ở bản gửi đi, còn nguồn dùng chung vẫn như cũ. Nhờ nằm trong câu lệnh, tiêu đề vẫn đủ mỗi lần chạy lại." (đoạn 55); "`AS` chỉ đổi tiêu đề, cột vẫn có kiểu `date`" (bullet Results); RunFlow bước 2 "Giá trị và cột nguồn giữ nguyên"; Memo "giữ giá trị, kiểu và tên cột nguồn".
- Tác động: cùng một ý (alias chỉ là nhãn của kết quả) được nói năm lần; đoạn 44 có bốn ý khác nhau (thứ tự cột, cột bỏ qua và số dòng, chỉ đọc, tra tên cột) trong một đoạn, trái "mỗi đoạn một ý".
- Đề xuất: giữ đoạn 53 và nửa đầu đoạn 55 (đối chiếu với Excel, rất tốt); bỏ câu "Nhờ nằm trong câu lệnh, tiêu đề vẫn đủ mỗi lần chạy lại"; ở bullet Results thay "`AS` chỉ đổi tiêu đề, cột vẫn có kiểu `date`" bằng "cùng ngày, chỉ khác cách hiển thị (bài 1.3)", vì mục đích của câu là giải thích vì sao `2024-03-01` và `01/03/2024` khác dạng. Tách câu "Tên cột xem ở Object Explorer…" ra làm câu đầu của đoạn `*` hoặc đặt cuối đoạn 42 để đoạn 44 chỉ còn thứ tự cột và số dòng. Tổng thể bớt chữ, không thêm.

### F5. Biên tập: neo cho đoạn chuyển sang `AS`

- Câu gốc: "Việc sửa dòng tiêu đề ứng với **bí danh cột (alias)**…"
- Tác động: sau đoạn `*`/`TOP`, "dòng tiêu đề" không còn mốc để người học nhìn lại hình Excel. Đáng chú ý hơn nếu F1 không được làm.
- Đề xuất (thay chữ, không thêm): "Dòng tiêu đề `A1:C1` trong hình ứng với **bí danh cột (alias)**…". Nếu làm F1, đoạn này đứng ngay sau đoạn thứ tự cột và việc chuyển ý sẽ tự nhiên hơn.

### F6. Cần làm rõ (thấp): "thứ tự xử lý logic… không phải cách SQL Server đọc dữ liệu vật lý"

- Câu gốc: "Sơ đồ thể hiện **thứ tự xử lý logic**, không phải cách SQL Server đọc dữ liệu vật lý."
- Tác động tới người mới: "vật lý" chưa được dạy; người học chưa biết vì sao phải phân biệt. Bên dưới sơ đồ còn mặc định "Bạn viết SELECT trước, nhưng theo thứ tự logic, SQL Server xét FROM trước.", đủ để hiểu ý chính.
- Thể loại: thuật ngữ **chưa được dạy**, nhưng quy ước mục 2 yêu cầu giữ lời tuyên bố này (không hứa cách SQL Server đọc dữ liệu).
- Đề xuất: viết lại thành một vế, ví dụ "Sơ đồ cho thấy thứ tự để hiểu câu lệnh (`FROM` trước, `SELECT` sau); SQL Server có thể thực hiện theo cách khác miễn kết quả giống." Hoặc để sơ đồ tự trả lời và rút còn "Bấm từng bước để đối chiếu nguồn 12 cột với kết quả ba cột". Người viết quyết định.

### F7. Biên tập: Ghi nhớ

- Câu gốc: sáu hàng; hàng 3 "Chép các cột cần gửi" và hàng 4 "Chép cột theo đúng thứ tự" chồng nhau; hàng 2 "Nhìn kết quả vừa làm" không có điểm tựa Excel thật; không có hàng cho `*` (đề 1 cần); hàng "Copy with Headers" thuộc F3.
- Đề xuất: gộp hàng 3 và 4 thành một ("Liệt kê cột sau `SELECT`, theo thứ tự cần; không lọc dòng"), đổi hàng 1 thành `*` (kèm `TOP` nếu giữ ở F1), bỏ hàng Copy with Headers. Số hàng giảm, mọi ý cần cho đề vẫn có.

### F8. Biên tập: phần giới thiệu Bài tập

- Câu gốc: "Chữ mờ trong ô mới là gợi ý, tự mất khi bạn gõ."
- Căn cứ: `SqlEditor.tsx` đặt placeholder "Viết câu lệnh SQL của bạn ở đây". Chữ mờ không phải gợi ý cách làm; "gợi ý" có thể bị hiểu là mách đáp án. Đề xuất: bỏ câu này (không đề nào cần), hoặc đổi thành "chữ mờ chỉ là lời nhắc". Hai đoạn còn lại (một câu lệnh mỗi lần; bộ chấm không so tiêu đề) cần giữ.

### Giữ được (kèm lý do, để tác giả không phải cân lại)

- G1. Mạch Excel sang SQL: mỗi từ khóa được nối với một thao tác Excel quen thuộc, có định nghĩa tại chỗ.
- G2. Alias và nguồn dùng chung: đúng, và trả lời được "vì sao không đổi tên cột trong bảng".
- G3. Ngoặc vuông và `N`: nói rõ vì sao không dùng `N` cho tên (phòng nhầm với chuỗi giá trị vừa học ở bài 1.3). Có thể gọn thêm nhưng không sai.
- G4. Đường thực hành web / SSMS / bản riêng nhất quán với `gioi-thieu` và với mã nguồn trang bài tập; không đòi người chọn web tự kết nối SSMS.
- G5. Câu trả lời chị Hạnh: đúng phạm vi, tách việc database làm và quyết định nghiệp vụ.
- G6. Results/Messages và cảnh báo "rows affected không phải số dòng bị sửa".
- G7. Hay nhầm: năm ý đều là lỗi thật hoặc hiểu nhầm thật, mỗi ý có hậu quả, phần lớn đã kiểm bằng kiến thức T-SQL.
- G8. Bản render: không lộ backtick, không lộ `\t`, nháy đơn ở `'HoTen'` trong Hay nhầm hiển thị là nháy thẳng (nháy cong duy nhất là “mới nhất” trong lời văn Hay nhầm 5, không phải code), dấu nháy trong `Invalid column name 'TenNV'.` giữ nháy thẳng.

## 5. Các câu "tại sao / để làm gì" tự đặt ra

| Câu hỏi | Bài đã trả lời chưa |
|---|---|
| Sao không mở bảng như mở sheet mà phải viết câu lệnh? | Có: "Trong SQL không có sheet nào đang mở, nên bạn gửi… câu truy vấn" (và bài 1.1) |
| Vì sao `FROM` nằm sau `SELECT` mà xử lý trước? | Có một phần: note của RunFlow và meaning của bước `FROM` ("cho biết các cột nguồn nằm ở bảng nào"). Khó hơn là câu "vật lý" (F6) |
| Vì sao thứ tự cột theo `SELECT` mà không theo bảng? | Có: ví dụ `TenPB, MaPB`, đề 3 luyện lại |
| Vì sao phải liệt kê cột thay vì `*`? | Có: `*` lấy cả `SoCCCD`, `Email` |
| Vì sao đặt alias bằng `AS` mà không sửa tên cột trong bảng? | Có: alias chỉ có trong câu lệnh, nguồn dùng chung vẫn như cũ |
| Vì sao có ngoặc vuông? | Có, một vế ("tên có khoảng trắng"); không giải thích vì sao tên có dấu cách thì phải bao, nhưng không cần cho bài này |
| `TOP` để làm gì, tại sao cần `ORDER BY`? | Có một phần; `ORDER BY` chưa giải nghĩa (F2); `TOP` ngoài nhu cầu bài (F1) |
| Dấu `;` bắt buộc không? | Chưa trả lời ("kết thúc câu lệnh"); người mới chưa bị chặn vì đề và ví dụ đều có `;`. Không đề xuất thêm |
| Vì sao bài viết `NhanVien` còn Object Explorer hiện `dbo.NhanVien` (bài 1.4)? | Chưa trả lời. Không chặn bước nào vì cả hai cách chạy được; chưa xác minh bằng chạy. Không đề xuất thêm ở bài này |
| Vì sao `2024-03-01` mà Excel hiện `01/03/2024`? | Có: "cùng ngày", cột kiểu `date`, hiển thị do công cụ quyết định (bài 1.3) |
| `(48 rows affected)` có nghĩa là sửa 48 dòng? | Có, trả lời thẳng |
| Vì sao Nộp bài không dùng để thử câu mẫu? | Có: "Nộp bài chấm theo đề của trang đó" |
| Vì sao danh sách có cả người đã nghỉ? | Có: không có điều kiện lọc; kể cả `3` hồ sơ nghỉ |

## 6. Nguồn và giới hạn

Đã kiểm bằng đọc nguồn và HTML:
- Cấu trúc hai tiểu mục, thứ tự câu trả lời trước sơ đồ, nhắc lại các đường link nội bộ tới `gioi-thieu`.
- Số liệu so với hồ sơ công ty: 48 hồ sơ; 3 người nghỉ (NV020, NV033, NV041); 14 hồ sơ KD; NV001, NV002, NV003 vào làm 2024-03-01, 2024-04-01, 2023-06-01; NV004 2015-01-05; NV005 2016-03-14; 12 cột `NhanVien` (đếm danh sách cột trong RunFlow, khớp bài 1.2 "12 cột và 48 dòng").
- Lời bài về trang bài tập (Làm bài, Chạy (F5), Nộp bài, hai tab, số thứ tự dòng, hỏi mã khi chạy lần đầu, Sơ đồ database) khớp mã component.
- Không có backtick hay `\t` lộ trong HTML; nháy trong `Invalid column name 'TenNV'.` là nháy thẳng.

**Chưa xác minh (cần người viết chạy theo mục 4.6 và 5):**
- Nguyên văn `Invalid column name 'TenNV'.` trên SSMS và trên trang web (SSMS thêm dòng `Msg 207, Level 16…` phía trước; bài chỉ trích câu chính).
- Việc trang web hiển thị đúng `(48 rows affected)` cho câu `SELECT` (mã dùng `rowsAffected` của driver; chưa chạy).
- Các giá trị trong drawer bước `FROM` ngoài mã, họ tên, ngày vào làm, phòng, chức danh, quản lý (giới tính, ngày sinh, CCCD, email của NV001 đến NV003): hồ sơ công ty không ghi các cột này, người review không đọc `HRM_Demo.sql`.
- Thứ tự dòng thật khi chạy; kết quả trích NV001 đến NV005 có đúng là năm dòng đầu hay chỉ là hình minh họa (bài đã nói thứ tự có thể khác).
- Hành vi dán vào Excel (dạng ngày, cài đặt vùng) trong F3.
- Copy/paste từ nút Sao chép, bàn phím, drawer, nhập `[Họ tên]` vào editor, SSMS thật: không kiểm vì lượt này không tương tác browser.
- Mã truy cập web: không có thông tin để kiểm người học nhận ở đâu ngoài câu "người phụ trách hoặc người đã gửi bạn khóa học" ở trang giới thiệu và trang bài tập.

## 7. Kết luận

- Không thấy nội dung sai có căn cứ; không có finding mức "Cần sửa". Đủ kiến thức làm bốn đề: danh sách cột, thứ tự cột, `*`, alias bằng ngoặc vuông đều đã được dạy trong tiểu mục 1; chỉ có đề 4 đòi tra tên bảng và cột trên sơ đồ, việc đã được dặn.
- Chuyển ý Excel sang `SELECT`/`FROM` và sang `AS` dùng được; mạch đứt nhẹ ở chỗ chen đoạn `TOP (5)`. Việc cắt phần cũ không làm người mới vấp ở những chỗ người review thấy; điểm còn nặng của tiểu mục 1 là phần `TOP` và `ORDER BY` không phục vụ tình huống hay đề nào.
- Gợi ý theo hướng bài gọn hơn mà không thêm chữ: làm F1, F3, F4 (cắt), đổi chữ ở F2, F5 (thay thế, không thêm), cân nhắc F6. Tổng cắt ước lượng khoảng 120 đến 150 chữ cùng một khối Sql.
- Đây là kết quả học thử bằng đọc nguồn và HTML, không xác nhận SQL, giao diện hay đường thực hành đã chạy đúng.

## 8. Tổng hợp số finding

| Mức | Số lượng | Mã |
|---|---|---|
| Cần sửa | 0 | |
| Cần làm rõ | 2 | F2, F6 |
| Cần cắt | 2 | F1, F3 |
| Biên tập | 4 | F4, F5, F7, F8 |
| Giữ được | 8 | G1 đến G8 |
