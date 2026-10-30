# Review bài 1.3: Bảng, cột và kiểu dữ liệu

## 1. Phạm vi, phiên bản, công cụ thực tế

- Bài: `src/content/lessons/1-3-bang-cot-kieu-du-lieu.mdx` (không có YAML, `noExercises: true`). Đã đối chiếu sha256 của file với giá trị được giao (`5b92fc53...a083`): khớp. Source là working tree chưa commit.
- Build đối chiếu: `dist/bai/1-3-bang-cot-kieu-du-lieu/index.html` (dựng 30/10/2026 15:26). Chỉ đọc HTML dưới dạng văn bản/mã nguồn, không mở browser, không tương tác.
- Đã đọc: `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1, bài trước 1.2, quyết định `docs/superpowers/specs/2026-10-30-lesson-1-3-reorder-design.md` (toàn bộ), hình `src/assets/lessons/1-3-database-table.png`. Bài chỉ có một hình ảnh rời này; "hai hình" tôi hiểu là hình bảng `NhanVien` này cùng hình Excel/`Ssms` trong bài, và đã xem cả ba khối (Excel, hình PNG, `Ssms`).
- Không đọc report cũ ở `temp/review`, `docs/reviews`, nhận xét reviewer khác, `HRM_Demo.sql`, `.env`; không kết nối database, không chạy SQL/API. Chỉ liệt kê tên thư mục `temp/review` để biết thư mục report; không mở file nào.
- Không dùng bài sau để bù kiến thức. Các điểm cần chạy mới biết đặt ở mục "Chưa thể xác minh".
- Công cụ: Read, Grep, Bash (python đọc HTML, đếm chữ). Không có agent khác.

## 2. Rà theo thứ tự bài

### Tình huống (dòng 20-30)

Tin nhắn chị Hạnh rõ, đủ sáu giá trị để bài đối chiếu. Giả định (IT lấy đúng chữ đang hiển thị, hai cột, thông tin bắt buộc khác đã có) và `Key` ("vì sao có giá trị bị từ chối, còn giá trị khác lưu được nhưng có thể khác ý người nhập?") khớp nhau, và phần chính trả lời được đúng câu này. Số, tên, mốc khớp hồ sơ công ty (mục 7, dòng 1.3). Mã `NV049`-`NV051` là mã mới ngoài 48 hồ sơ, tên không trùng hồ sơ nào; không gây vấn đề.

### Tiểu mục 1 "Cùng một cột nhưng các ô đang khác kiểu" (dòng 34-49)

Mở đúng từ vấn đề của chị Hạnh; có hình Excel và nói rõ hình là file minh họa, chưa phải dữ liệu database. Phân loại từng ô (C2 ngày thật, C3/C4 chữ, D2/D3 chữ, D4 số) khớp với render (`xl-num` cho C2 và D4; `xl-sel` cho C3). Bài tả Excel không tuyệt đối hóa (nêu rõ "chưa đặt Data Validation"; Format Cells chỉ đổi cách hiển thị). Điểm vướng: các ô được nhấn mạnh (xem F1).

### Tiểu mục 2 "Trong database, mỗi cột có một kiểu" (dòng 51-79)

Câu mở "Chuyển sang database, kiểu không còn nằm ở từng ô" là lời dẫn tự nhiên từ tiểu mục 1. Thứ tự: khai báo kiểu cho cả cột, lý do `date`/số, cách đọc kiểu và `NULL` trong SSMS, bảng kiểu, `decimal(p,s)`, `SoCCCD`. `NgayVaoLam date NOT NULL` đã được nói trước bảng sáu ô nên dòng `C4` ("không nhận `NULL`") có chỗ dựa; đây là điểm sửa đúng so với mục tiêu của spec. Tiểu mục này là phần nặng nhất của bài (xem F13). Kết ở đoạn `SoCCCD` rồi sang tiểu mục 3 chỉ bằng tiêu đề.

### Tiểu mục 3 "Đối chiếu từng ô để trả lời chị Hạnh" (dòng 81-100)

Đoạn đầu dạy "chuyển kiểu ngầm" và ba khả năng trước khi dùng; đoạn `DATEFORMAT` ngay sau đó; bảng sáu ô; câu giới hạn của kiểu (`2099-03-01`, số âm); lời đáp chị Hạnh ngay cạnh bảng; đoạn "Ở bài này chỉ cần...". Đúng khung quy ước (lời giải nằm cạnh kết quả, tình huống khép trong phần chính). Điểm vướng: F4, F5, F6, F11.

### Hay nhầm ở đâu, Ứng dụng, Ghi nhớ

Ba lỗi đều nêu hậu quả cụ thể. Lỗi 1 và 2 là nền cho câu ôn 4 và 5 (xem mục 4). Ứng dụng có ba ý đúng chủ đề (xem F14). Ghi nhớ bốn dòng; chưa nhắc cách đọc nhãn kiểu và `NULL` trong Object Explorer (mục tiêu đầu bài) và `decimal(p,s)`.

### Bản render

Không lộ backtick hay escape trong phần nội dung (8 ký tự backtick trong file chỉ nằm trong mã JS hydrate). Bold/code/ô đánh dấu hiện đúng trong HTML: `xl-mark` ở `C2` và `D3`, `xl-num` ở `C2` và `D4`, `xl-sel` ở `C3`, hai `ssms-mark` ở `NgayKetThuc` và `LuongCoBan`. `Memo` cột phải hiển thị bằng code theo component chung (giống bài 1.1), không phải lỗi riêng của bài.

## 3. Finding

Tôi đánh giá bằng đọc nguồn và HTML. Không có mục nào **Cần sửa** (không thấy nội dung sai có căn cứ trong những gì tôi kiểm được).

### Cần làm rõ

**F1. Ba ô được nhấn mạnh trong hình Excel, không giải thích lý do.** (Cần làm rõ; chưa được dạy)
- Câu gốc: "Ô `C2` và `D3` được tô màu để so hai trường hợp cần chú ý" (dòng 36); "Ô đang chọn `C3`" (dòng 45). Vị trí: Excel dòng 38.
- Tác động: người mới thấy ba ô khác nhau (`C2`, `D3` tô màu; `C3` đang chọn) nhưng không biết "hai trường hợp" là hai trường hợp nào, vì sao `D3` mà không phải `C4` hay `D2` (hai ô cũng bị từ chối ở bảng sau), và vì sao `C3` đang chọn. Đoạn văn ngay dưới lại đi qua cả sáu ô, nên dấu đánh trong hình không khớp phần chữ nói (quy ước 2.2 và mục 3: hình đánh dấu đúng chỗ phần chữ nói).
- Đề xuất: hoặc nêu bằng một vế ("`C2` là ngày dễ hiểu nhầm, `D3` là số kèm chữ") hoặc đánh dấu theo đúng nhóm ô được bàn (ví dụ `C2` riêng, các ô bị từ chối riêng), hoặc bỏ `mark` và để đoạn dưới dẫn từng ô.

**F2. Nhãn trong ngoặc của `Ssms` có "PK", "FK" nhưng bài nói ngoặc chỉ cho biết kiểu và `NULL`.** (Cần làm rõ; chưa được dạy phần viết tắt)
- Câu gốc: "Chữ trong ngoặc sau tên cột cho biết kiểu dữ liệu và cột có nhận `NULL` hay không." (dòng 62). Hình có `MaHD (PK, varchar(20), not null)` và `MaNV (FK, varchar(10), not null)`.
- Tác động: bài 1.1 chỉ dạy "khóa chính", "khóa ngoại" bằng chữ đầy đủ, chưa có "PK/FK"; bài 1.2 hoãn "bài 1.3 và 1.4 giải thích kỹ hơn". Người học đọc bài 1.3 sẽ gặp hai nhãn lạ ngay trong hình họ được dạy đọc.
- Đề xuất: một vế ("`PK` là khóa chính, `FK` là khóa ngoại, bài 1.4").

**F4. Cách IT ghi dữ liệu chưa rõ, nhưng bảng sáu ô khẳng định kết quả.** (Cần làm rõ; thiếu điều kiện; có phần chưa xác minh)
- Câu gốc: "Hỏi người nhập muốn ngày nào, kể cả khi IT đọc thẳng ngày Excel đã hiểu" (dòng 89); "Đổi thành `2024-01-02`, không báo lỗi".
- Tác động: giả định đầu bài là IT lấy chữ hiển thị. Vế "kể cả khi IT đọc thẳng ngày Excel đã hiểu" mở thêm một đường (nhập giá trị ngày thật của ô) mà bài không giải thích, nên người mới không biết trường hợp đó khác gì. Ngoài ra `DATEFORMAT` theo phiên SQL chỉ đúng khi ghi bằng câu lệnh SQL; bài không nói IT ghi bằng gì. Nếu dùng công cụ import, cách đọc ngày có thể dựa trên thiết lập máy/công cụ (tôi không xác minh được; bài 5.5 mới dạy import).
- Đề xuất: thêm "(khi IT ghi bằng câu lệnh SQL)" vào đoạn `DATEFORMAT`; bỏ hoặc viết lại vế "kể cả khi...".

**F5. Lời khuyên "gửi ngày theo `2024-02-01`, lương theo số đồng" thiếu một vế "vì sao".** (Cần làm rõ; thiếu lý do, một phần chưa xác minh)
- Câu gốc: "Thống nhất cách gửi dạng chữ là `2024-02-01` cho cột `date`" (C3, dòng 90); "Từ chối vì chuỗi có dấu ngăn nghìn không đổi được" (D2, dòng 92); đoạn trả lời (dòng 98).
- Tác động: người đọc sẽ hỏi "vì sao `2024-02-01` an toàn còn `01/02/2024` thì không, trong khi `2024.02.01` cũng đổi được?". Bài chỉ nói `DATEFORMAT` quyết định thứ tự ngày-tháng-năm; không nói vì sao dạng năm đứng đầu không gây nhầm, và cũng không nói `C3` có phụ thuộc `DATEFORMAT` hay không. Tương tự, dòng `D2`/`D3` không nối với đoạn ở dòng 77 ("số lẻ trong SQL viết bằng dấu chấm"): người đọc không thấy vì sao hai dấu chấm hoặc dấu phẩy làm hỏng phép đổi.
- Đề xuất: mỗi chỗ một vế, ví dụ "SQL đọc dấu chấm là dấu thập phân nên `9.610.000` không đọc được". Với `2024-02-01`, tác giả cần xác minh hành vi trước khi viết lý do (tôi không khẳng định được; xem mục 5).

**F10. Câu tự kiểm tra: lặp Hay nhầm, thiếu khái niệm nền.** (Cần làm rõ; xem bảng mục 4)
- Câu 4 dùng đúng hai số của Hay nhầm 1 (`21.25`, `1000.0`) và câu 5 lặp Hay nhầm 2 (vốn đã lặp ở Ghi nhớ dòng 4). Không câu nào kiểm "mỗi cột một kiểu", lý do dùng `date` thay chữ, chọn `SoCCCD` kiểu chữ hay thuật ngữ "chuyển kiểu ngầm".
- Tác động: quy ước/template yêu cầu câu ôn kiểm mục tiêu và thuật ngữ nền tảng. Học viên có thể trả lời đúng cả năm câu bằng cách nhớ ví dụ mà vẫn chưa giải thích được vì sao cột có kiểu.
- Đề xuất: đổi câu 4 hoặc 5 thành một câu về lý do cột ngày dùng `date`/`SoCCCD` dùng kiểu chữ; không thêm câu.

### Cần cắt

**F7. Một số câu trùng hoặc trỏ tới thứ bài chưa nói.** (Cần cắt)
- Câu gốc: "Với `NgayNghiViec`, bộ mẫu dùng `NULL` cho người chưa nghỉ việc; đó là quy ước của bộ mẫu..." (dòng 66). Chú thích hình `Ssms` đã cho một ví dụ cùng ý (`NgayKetThuc` là `NULL` cho hợp đồng không xác định thời hạn). Ví dụ thứ hai trên một cột chưa xuất hiện trong hình không thêm hiểu biết, chỉ thêm một tên cột.
- Câu gốc: "mỗi dòng, còn gọi là **bản ghi**" (dòng 53). "Bản ghi" lặp đúng câu của bài 1.1 và không dùng lại trong bài.
- Câu gốc: "Chuyển kiểu khi lọc học ở bài 2.2, ... hàm ngày ở bài 2.8" (dòng 100). Bài này không nói gì về lọc hay hàm ngày, nên hai chỉ dẫn này trỏ tới chủ đề chưa được nêu. Các chỉ dẫn khác (`NULL`, Unicode, ràng buộc, import) có điểm bám trong bài.
- Đề xuất: bỏ câu `NgayNghiViec` (hoặc bỏ ví dụ thứ hai ở chú thích hình); bỏ "còn gọi là bản ghi"; rút các chỉ dẫn bài sau còn những mục có điểm bám. Spec ghi "giữ cho bài sau" chuyển kiểu ngầm; nếu bài sau thật sự trỏ về 1.3 thì giữ chỉ dẫn nhưng nói rõ "chuyển kiểu ngầm" thay cho "khi lọc/hàm ngày".

### Biên tập

**F3. Kiểu trong hình `Ssms` xuất hiện trước khi được giải thích.** (Biên tập; đã dạy nhưng đặt sau chỗ dùng)
- `varchar(20)`, `nvarchar(50)`, `decimal(18,0)` hiện ở hình và chú thích (dòng 64) khoảng mười dòng trước bảng kiểu và `decimal(p,s)` (dòng 70-77). Đây là thứ tự tác giả chọn (spec), người mới chỉ cần đọc "tên kiểu, ngoặc là giới hạn". Chỉ cần một vế "bảng ngay dưới giải thích" thay vì đổi thứ tự.

**F6. Lặp ý và bold quá dày ở đoạn mở tiểu mục 3.** (Biên tập)
- Câu gốc: "**chuyển kiểu ngầm**... **giữ đúng giá trị mong muốn**, **đổi khác ý người nhập** hoặc **bị từ chối**. **Lưu được chưa chắc đã đúng ý**." (dòng 83). Năm cụm in đậm trong một đoạn; câu cuối được nhắc lại nguyên ý ở dòng 96, 98 (in đậm), Ghi nhớ dòng 3, câu ôn 3 và 4.
- Đề xuất: giữ đậm cho "chuyển kiểu ngầm" và ba khả năng, bỏ câu "Lưu được chưa chắc đã đúng ý" ở dòng 83 vì dòng 98 đã nói đúng chỗ có dẫn chứng.

**F8. Các vế rào ở bảng kiểu gợi câu hỏi bài không trả lời.** (Biên tập)
- Câu gốc: "mã chỉ có chữ không dấu và số thì `varchar(10)` chứa tối đa `10` ký tự"; "`nvarchar(100)` chứa tối đa `100` ký tự tiếng Việt thông thường" (dòng 72-73).
- Tác động: sau khi bỏ khái niệm byte, hai điều kiện này không còn lý do nhìn thấy được; người học hỏi "nếu mã có dấu thì sao", "tiếng Việt không thông thường là gì" mà bài không đáp. Tôi không xác minh được tác động thực tế trên collation của database (xem mục 5).
- Đề xuất: viết đơn giản "tối đa 10 ký tự", "tối đa 100 ký tự" nếu tác giả xác nhận đủ chính xác cho mục tiêu; ngược lại giữ rào nhưng nói lý do bằng một vế.

**F9. Hình bảng `NhanVien` tô cột `HoTen`, còn lập luận ngay dưới nói về `NgayVaoLam`.** (Biên tập)
- Hình (đã xem): bảng `NhanVien` ba cột; nhãn Bảng, Dòng (hồ sơ `NV005` tô vàng), Cột (`HoTen` khung xanh). Dữ liệu `NV001`, `NV005`, `NV014` và ngày khớp hồ sơ công ty; alt và chú thích khớp với hình. Đây là hình đúng và chính xác.
- Nhưng đoạn văn bên cạnh nói "Cột `NgayVaoLam` trong hình chỉ chứa ngày, không lẫn chữ": mắt người đọc bị dẫn tới cột `HoTen`. Hình chủ yếu nhắc lại bảng/dòng/cột đã dạy ở bài 1.1, không cho thấy "một kiểu cho cả cột". Spec cho phép đổi chú thích để nối với `NgayVaoLam`; chú thích hiện chưa làm.
- Đề xuất: một vế trong chú thích hoặc câu dẫn để nối hình với cột `NgayVaoLam`, hoặc nói thẳng hình dùng để nhắc bảng/dòng/cột.

**F11. Lời đáp chị Hạnh còn hai chỗ mơ hồ.** (Biên tập)
- Câu gốc: "sửa hết ô báo lỗi chưa bảo đảm dữ liệu đã đúng... chị xác nhận lại các ô này với người nhập" (dòng 98). "Các ô này" có thể hiểu là chỉ `C2`, hoặc cả `C2`, `C4`, `D2`, `D3`; "ô báo lỗi" là cách nói của bài, không có thông báo lỗi nào được cho xem.
- Đề xuất: ghi rõ "`C2`, `C4`, `D2`, `D3`".

**F12. Hay nhầm 3 (tiền tố `N`) đòi nền SQL người học chưa có.** (Biên tập; đã dạy nhưng khó áp dụng)
- Câu gốc: "Khi tự viết một giá trị tiếng Việt trong câu SQL... dùng `N'Trần Thị Mai'`... Bỏ `N` có thể làm mất dấu ngay ở chuỗi đầu vào" (dòng 108).
- Tác động: học viên chưa viết câu SQL nào (bài 1.6 mới bắt đầu), chưa thấy dấu nháy đơn của chuỗi hay từ "Unicode" được định nghĩa ngoài vế "giữ được dấu tiếng Việt". Nội dung lệch mục tiêu bài (đọc kiểu, `NULL`, chuyển kiểu). Spec ghi `N'…'` giữ cho bài 2.1, nên tôi không đề nghị bỏ; chỉ ghi nhận mục này là phần nặng nhất ngoài trọng tâm.

**F13. Độ tải: nhiều thuật ngữ mới trong một bài.** (Biên tập; chưa thể xác minh với người học thật)
- Đếm sơ bộ thuật ngữ/khái niệm mới (ngoài nhắc lại từ 1.1, 1.2): kiểu dữ liệu, chuỗi, `NULL`/`NOT NULL`, `varchar`, `nvarchar`, `date`, `decimal(p,s)`, chuyển kiểu ngầm, `DATEFORMAT`, phiên SQL, Data Validation, chuỗi rỗng, tiền tố `N`, cùng cách đọc nhãn Object Explorer. Bài dài 2.124 chữ (bài 1.1 là 2.081 chữ, ghi 12 phút), ghi 15 phút; quy ước nhắm 10-12 phút cho bài khái niệm đơn giản.
- Không thấy đoạn nào vượt 120 chữ. Không đo với người học thật, nên tôi không kết luận 15 phút đúng hay sai. Nếu cần giảm tải, ứng viên theo mức độ ít ảnh hưởng mạch: F7, F8, F12, rồi hai chỉ dẫn bài sau; không đụng bảng sáu ô và lời đáp.

**F14. Ứng dụng: ý 1 lặp đoạn `SoCCCD`, ý 3 hứa hơi quá bài.** (Biên tập)
- "Chọn kiểu phù hợp... giữ số `0` ở đầu và ý nghĩa của dữ liệu" nhắc lại đoạn dòng 79, và cụm "ý nghĩa của dữ liệu" mơ hồ. "Phát hiện... giá trị bị làm tròn" cần đối chiếu với nguồn; bài chưa dạy cách phát hiện sau khi dữ liệu đã vào bảng, chỉ nói trước khi nhập.
- Đề xuất: ý 1 viết thành việc (đề xuất kiểu cột khi yêu cầu IT dựng cột mới), ý 3 ghi "đối chiếu file trước khi nhập".

### Chưa thể xác minh

Xem mục 5.

### Giữ được (tôi đã soi và thấy đúng/hợp lý)

- **G1.** Mạch chính theo tiêu đề "Từ ô Excel đến kiểu dữ liệu của cột": Excel (ô tự mang kiểu) → database (mỗi cột một kiểu, đọc kiểu/`NULL`) → chuyển kiểu và đáp. Hai lời dẫn chuyển ý (đầu tiểu mục 2 và tên tiểu mục 3) đủ để theo.
- **G2.** `NgayVaoLam` không nhận `NULL` được nói trước bảng sáu ô, nên câu "chưa rõ không thể thay bằng `NULL`" ở `C4` có căn cứ trong bài. Câu hỏi tự nhiên "chưa rõ thì để NULL được không?" có lời đáp ("cần xác minh ngày, không điền đại").
- **G3.** Lời đáp chị Hạnh nằm ngay cạnh bảng, tách việc database làm (từ chối/đổi/giữ) với việc cần xác nhận nghiệp vụ; câu "Kiểu dữ liệu chỉ kiểm được một phần" (ngày 2099, số âm "nếu không có luật chặn") không hứa quá.
- **G4.** Phân biệt hợp lệ và đúng ý; không tuyệt đối hóa Excel (Data Validation, Format Cells mô tả đúng giới hạn).
- **G5.** `DATEFORMAT`/phiên SQL được định nghĩa tại chỗ dùng; có hedge "phiên khác có thể đọc khác".
- **G6.** `decimal(4,1)` có ví dụ `999.9`, giải thích dấu phẩy trong tên kiểu và dấu chấm thập phân; câu "đơn vị đồng là quy ước nghiệp vụ" giúp phân biệt `9,61 triệu`.
- **G7.** Bold dùng ở khái niệm (kiểu dữ liệu, cột, bảng, chuyển kiểu ngầm); code đúng cho mã, tên bảng/cột, địa chỉ ô, giá trị; không lộ backtick ở bản render; không nhắc vai trò người đọc; không dùng cụm trong `BANNED_PHRASES`.
- **G8.** Bài không yêu cầu kết nối SSMS: `Ssms` là hình, không có bài tập; người chỉ chọn web đọc hình là đủ như 1.2 đã dặn. Câu "trong Object Explorer mở..." viết như hướng dẫn nhưng không bắt buộc thao tác.
- **G9.** Hình PNG và alt khớp nhau; hình Excel trong HTML hiển thị đúng căn phải của số/ngày thật và ô chữ căn trái.

## 4. Tiền đề từng câu tự kiểm tra

Đọc từng câu, thử trả lời từ kiến thức đã học trước khi mở đáp án. Cả năm câu đặt sau Ghi nhớ.

| Câu | Cần biết | Đã dạy ở đâu | Còn thiếu / ghi chú |
|---|---|---|---|
| 1. Từ nhãn `LuongCoBan (decimal(18,0), not null)` đọc được gì? | Nhãn trong ngoặc là kiểu và `NULL`; `decimal(p,s)` là tối đa p chữ số, s số lẻ; `not null` là không nhận `NULL` | Dòng 62 (đọc nhãn); dòng 75 và 77 (`decimal(p,s)`); dòng 62 (`NOT NULL`) | Trả lời được. "Không lưu chữ số phần lẻ" suy từ `s = 0` mà bài chưa nói thẳng; đáp án nhắc lại đường Object Explorer ngoài điều được hỏi. |
| 2. Đổi Format Cells sang Date có biến `chưa rõ` thành ngày không? | Format Cells chỉ đổi hiển thị; chữ không đổi được thành ngày | Dòng 49 và dòng 91 (hàng `C4`) | Trả lời được, không thiếu. |
| 3. `C2`, `C4`, `D4` thuộc ba khả năng nào? | Ba khả năng; `DATEFORMAT` `mdy`; kết quả từng ô | Dòng 83, 85, bảng 89-94 | Trả lời được. Bảng không ghi rõ hàng nào thuộc khả năng nào; người học phải tự xếp (`C2` là "có thể khác ý"). |
| 4. `21.25` và `1000.0` vào `decimal(4,1)` khác nhau thế nào? | `decimal(4,1)` có ba chữ số nguyên, một chữ số lẻ; số thừa chữ số lẻ bị làm tròn; vượt chữ số nguyên thì bị từ chối | Dòng 77 (ba chữ số nguyên, một lẻ); quy tắc làm tròn và tràn số chỉ ở Hay nhầm 1 (dòng 106) | Phần chính chưa dạy "làm tròn không báo lỗi"; chỉ Hay nhầm 1 dạy, với chính hai số này. Câu hỏi gần như nhớ lại ví dụ (F10). |
| 5. `HoTen` có `NOT NULL` thì đã đủ họ tên? | `NOT NULL`; chuỗi rỗng khác `NULL` | Dòng 62 (`NOT NULL`); chuỗi rỗng chỉ ở Hay nhầm 2 (dòng 107) và Ghi nhớ dòng 4 | Trả lời được nếu nhớ Hay nhầm 2. Bài không cho xem `HoTen` có `NOT NULL` thật hay không (câu hỏi dùng "có... thì"). Lặp Ghi nhớ. |

Tóm tắt: năm câu đều trả lời được từ nội dung đã dạy trước Ghi nhớ, không câu nào cần kiến thức bài sau. Phủ mục tiêu: đọc kiểu/`NULL` (câu 1), ba khả năng (câu 3), `Format Cells` (câu 2). Thiếu: lý do mỗi cột có một kiểu và thuật ngữ "chuyển kiểu ngầm", `varchar` với `nvarchar`, chọn kiểu theo ý nghĩa (`SoCCCD`).

## 5. Câu hỏi "tại sao / để làm gì" và nơi bài đã trả lời

| Câu hỏi tự đặt | Trả lời |
|---|---|
| Vì sao database không nhận hết như Excel? | Có: mỗi cột một kiểu (dòng 53, 60). |
| Vì sao `date` thay vì chữ? | Có, nhưng gọn: so sánh và sắp xếp (dòng 60). Không có ví dụ cho thấy thứ tự chữ sai thời gian; một vế ví dụ giúp người mới (xem đề xuất F10, có thể bổ vào câu ôn thay vì thêm câu). |
| Vì sao `01/02/2024` thành 2 tháng 1? | Có: `DATEFORMAT` `mdy` (dòng 85). |
| Vì sao "chưa rõ" không thành `NULL`? | Có (dòng 91). |
| Vì sao `9.610.000` và `9,61 triệu` bị từ chối? | Một phần: kết quả có, nguyên nhân chưa nối với dòng 77 (F5). |
| Vì sao khuyên gửi `2024-02-01`? | Chưa (F5). |
| Vì sao `SoCCCD` là kiểu chữ? | Có (dòng 79). |
| Vì sao lương nằm ở `HopDong` mà không ở `NhanVien`? | Chưa; thuộc bài kết bảng, bài này chỉ nêu giả định, chấp nhận được. |
| Vì sao khuyên xác nhận lại với người nhập? | Có: lưu được chưa chắc đúng (dòng 96, 98). |
| Để làm gì phải biết kiểu của cột? | Có ở Ứng dụng (quy định cách gửi dữ liệu); trùng ở F14. |
| Ai khai báo kiểu của cột? | Chưa nói trực tiếp; 1.1 nói ràng buộc do người thiết kế khai báo, đủ cho bài này. |
| Vì sao hợp lệ không bằng đúng? | Có (dòng 96). |

## 6. Ưu tiên

1. **F1, F2, F4, F5**: sửa vì người học mới sẽ vấp mà bài không đáp ngay trong chỗ họ đang đọc (ô được đánh dấu, `PK`/`FK`, đường ghi dữ liệu, lý do của lời khuyên).
2. **F10**: sửa câu ôn 4 hoặc 5 để phủ khái niệm nền; đây là lỗi phủ mục tiêu.
3. **F7, F6**: cắt vài câu trùng và bold thừa, giảm tải mà không mất ý.
4. **F3, F8, F9, F11, F12, F13, F14**: biên tập nhẹ; F12, F13 chỉ là ghi nhận về độ tải.
5. Mục 7 là việc xác minh kỹ thuật của người viết.

## 7. Chưa thể xác minh (cần chạy hoặc đọc dữ liệu mà tôi không được phép)

Tôi không kết luận đúng hoặc sai các mục sau; chúng khớp nhau về logic trong bài và không có mâu thuẫn nội bộ tôi nhìn thấy.
- `C2` `01/02/2024` thành `2024-01-02` dưới `us_english`/`mdy`; `C3` `2024.02.01` đổi được thành `2024-02-01` (bài khẳng định là tác giả đã kiểm; tôi không biết định dạng `yyyy.mm.dd` có phụ thuộc `DATEFORMAT` hay không).
- `9610000.6` vào `decimal(18,0)` thành `9610001`; `21.25` vào `decimal(4,1)` thành `21.3`; `1000.0` bị từ chối; `9.610.000` và `9,61 triệu` bị từ chối.
- Metadata: `NhanVien.NgayVaoLam date NOT NULL`, `NhanVien.HoTen nvarchar(100)`, `NhanVien.MaNV varchar(10)`, `SoCCCD varchar(12)`, `DonNghiPhep.SoNgay decimal(4,1)`, nội dung `Ssms` của `HopDong`. Spec ghi rõ chưa đối chiếu metadata live; hình `Ssms` chưa nói là mô phỏng hay chụp thật (bài 1.2 dùng cùng cách).
- Câu "Các kiểu dưới đây đều có trong bảy bảng của HRM_Demo".
- Tác động của `N'...'` và việc mất dấu ở `varchar` trên collation của database.
- Hành vi nếu IT dùng công cụ import thay vì câu SQL (F4).
- Khoảng 15 phút đọc, và mức tải với người học thật.
- Chưa kiểm bàn phím, drawer/`details` bấm mở, copy, responsive, SSMS thật; HTML chỉ đọc bằng văn bản.

## 8. Kết luận

Với người chỉ biết Excel cơ bản, bài đủ kiến thức để theo từ file của chị Hạnh tới câu trả lời: mạch Excel → cột có kiểu → chuyển kiểu → đáp án liền, khái niệm chính được dạy trước chỗ dùng, và không phần nào buộc phải dùng bài sau. Việc sắp xếp lại đã xử lý đúng các điểm tác giả nêu (`NgayVaoLam` không nhận `NULL` có trước bảng sáu ô; lời đáp là ý cuối của mạch giải thích). Còn vướng chủ yếu ở các chỗ nhỏ: ô được đánh dấu không rõ lý do (F1), `PK`/`FK` chưa được giải thích (F2), cách IT ghi dữ liệu và lý do hai lời khuyên (F4, F5), và câu ôn lặp Hay nhầm hơn là phủ khái niệm nền (F10). Đây là đánh giá học thử từ nguồn và HTML; không phải xác nhận SQL, kết quả chuyển kiểu hay giao diện SSMS đã được chạy đúng.

## 9. Tóm tắt số finding theo mức

- Cần sửa: 0
- Cần làm rõ: 5 (F1, F2, F4, F5, F10)
- Cần cắt: 1 (F7)
- Biên tập: 8 (F3, F6, F8, F9, F11, F12, F13, F14)
- Giữ được: 9 (G1-G9)
- Chưa thể xác minh: 1 nhóm (mục 7)
