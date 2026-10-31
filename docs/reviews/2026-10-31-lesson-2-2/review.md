# Review độc lập bài 2.2 — WHERE: lọc như AutoFilter

## Phạm vi, phiên bản và cách kiểm thực tế

- Vai học thử: Business Consultant khó tính, muốn hiểu và phản biện yêu cầu dữ liệu; chỉ giả định biết Excel văn phòng cơ bản, chưa biết SQL, lập trình hay quản trị hệ thống.
- Model: **kế thừa model của phiên**; không xác định hoặc đoán tên cụ thể, không tạo reviewer khác.
- Nguồn được review: [MDX bài 2.2](<E:/Projects/SQL Lession/src/content/lessons/2-2-where-loc-nhu-autofilter.mdx>) và [YAML ba bài tập](<E:/Projects/SQL Lession/src/content/exercises/2-2-where-loc-nhu-autofilter.yaml>).
- HEAD đọc được: `f344099d9e3f9fa58b33a5c0762e6cfbaa467f93`; branch: `feat/lesson-2-1-excel-first`. Bản review là working tree được giao trên HEAD này, không coi nội dung sửa chưa commit là nội dung của commit.
- SHA256 MDX: `F5AE57B44008AF1EC062CC6D0CDD4AF2A3C06F52DC0C09F094DCD97584C6332B`.
- SHA256 YAML: `EA6D87C86445A15FED27DDEC81609F5AE41ADC81DE92B81C62D588FB40578BE0`.
- Bản dựng: [HTML bài 2.2](<E:/Projects/SQL Lession/dist/bai/2-2-where-loc-nhu-autofilter/index.html>), SHA256 `114CF8CA907BBD627A7CDF6E829570C7E818930AF13007DFF2D637C1CA96AA77`; manifest ghi thời điểm `2026-10-31T15:24:49.1038414+07:00`. Cả ba hash tính lại đều khớp manifest được giao. Không tự chạy build để tái lập.
- Công cụ: PowerShell đọc file, `rg`, Git chỉ đọc HEAD/branch, `Get-FileHash`, Python thư viện chuẩn để đọc cấu trúc HTML, giải mã entity và đối chiếu chuỗi SQL. Có đọc CSS được HTML liên kết để xác định quy tắc xuống dòng và tab. Một lần in tiếng Việt bằng Python gặp lỗi encoding console; đã chạy lại với đầu ra UTF-8, không làm đổi file.
- Phạm vi kiểm: nguồn MDX/YAML, nội dung HTML tĩnh của mọi khối và ba drawer. Đã kiểm sự tồn tại của ba trang bài tập từ liên kết trong HTML; không mở hay tương tác chúng. Không dùng browser, không chạy SQL, API, runner, nộp bài hoặc bộ test. Không gọi các phép kiểm này là kiểm UI, sao chép/dán hay SSMS.
- Quyết định phạm vi đã đọc: mục “Phạm vi và căn cứ”, “Cách thực hiện”, “Nội dung phải giữ” của [spec](<E:/Projects/SQL Lession/docs/superpowers/specs/2026-10-31-lesson-2-2-design.md>). Quyết định chuyển khung được dùng để hiểu yêu cầu; các đánh giá dưới đây là kết quả học thử riêng.

## Rà theo thứ tự bài

### 1. Mục tiêu và tình huống — Giữ được

**Dẫn chứng:** “kể cả người đã nghỉ” ở dòng 21; “không giới hạn trạng thái hay ngày vào làm” ở dòng 24; mục tiêu ở dòng 11.

Yêu cầu nói rõ đối tượng là hồ sơ mang mã phòng hiện lưu, không dựng phòng ở thời điểm quá khứ. Người mới biết vì sao phải giữ `NV020`: bài đang đối chiếu mã phòng, không yêu cầu danh sách người đang làm. Bốn cột cần lấy và tiêu đề tiếng Việt đủ cụ thể để kiểm câu lệnh phía dưới; mốc tháng 10/2026 khớp hồ sơ công ty.

**Câu hỏi học thử:** Tại sao không loại người đã nghỉ? Tại sao không thêm khoảng ngày? Dòng 21–26 trả lời trực tiếp. **Đề xuất:** giữ phạm vi này; không tự thêm điều kiện nghiệp vụ.

### 2. Từ AutoFilter đến câu SQL và LineMap — Giữ được

**Dẫn chứng:** “AutoFilter ẩn dòng không đạt điều kiện, không xóa dữ liệu” ở dòng 41; “dấu = là so sánh, không gán mã mới” ở dòng 53.

Nhịp đi từ thao tác Excel quen thuộc sang một câu SQL đầy đủ, rồi mới giải nghĩa từng phần. Có lời dẫn chuyển công cụ; không bắt người mới đọc khuôn cú pháp trừu tượng trước ví dụ. Bốn cột và `AS` đã học ở bài 2.1, nên thêm `WHERE` là lượng kiến thức mới phù hợp.

Hình Excel được gọi đúng là minh họa và bảng trích. Số dòng `1, 3, 4, 21` cùng các ô đánh dấu khớp lời dẫn: ba ô mã phòng và ô trạng thái của `NV020`. Học viên không phải mặc định biết cách lọc: có đường Data > Filter và cách chỉ giữ `KD`.

`LineMap` có ví dụ cụ thể ở cả ba dòng. Giải thích `MaPB` khác chuỗi `'KD'`, mã phòng khác tên phòng, và so sánh khác gán giúp tránh câu chạy thành công mà lọc sai. Điều này được dùng ngay trong tình huống, không chuyển sang bảng ngoài phạm vi. **Đề xuất:** giữ.

**Câu hỏi học thử:** Tại sao cùng viết tên cột và giá trị chữ mà chỉ một bên có nháy? Tại sao không dùng tên phòng? Tại sao SQL không xóa hồ sơ bị loại? Dòng 53 và 56 trả lời đủ. Tại sao Excel cũ có thể khác kết quả SQL vừa chạy? Dòng 58 nêu đúng phạm vi nguồn/file và điều kiện lấy lại hoặc làm mới kết nối, không hứa mọi file tự đồng bộ.

### 3. Tiền đề trạng thái và ngày trước phần ôn — Giữ được

**Dẫn chứng:** “lọc chữ tiếng Việt dùng `N'Đã nghỉ'`” ở dòng 60; “chỉ dùng `>=` thì không đặt ngày kết thúc” ở dòng 62.

Hai đoạn ngắn đủ nối mô hình `WHERE` đang học sang hai đề khác: vẫn chọn một cột nguồn và so với một giá trị; chỉ thay cột, giá trị hoặc phép so sánh. Chuỗi tiếng Việt và chuyển kiểu ngầm có nền từ bài 1.3. `>=` được giải nghĩa tại chỗ là lớn hơn hoặc bằng và giữ ngày mốc; `'20261001'` được đổi ra ngày 1 tháng 10 rõ ràng. Bài nêu `NgayVaoLam` là `date`, lý do tránh đảo ngày/tháng và giới hạn không tự có ngày kết thúc.

Không cần lấy đáp án YAML hoặc bài sau để bù những tiền đề này. Việc chỉ dùng lời ngắn, không thêm một truy vấn ngoài lời giải KD, vẫn cho phép ghép được cách làm ba đề từ mô hình vừa học. Đoạn “Ở bài này chỉ cần…” ở dòng 64 chốt giới hạn và chỉ đúng bài đi sâu hơn.

**Câu hỏi học thử:** Tại sao phải có `N`? Tại sao viết ngày liền tám số? Ngày đúng mốc có được giữ không? Ngày sau tháng 10 có bị loại không? Dòng 60–62 trả lời các câu này. **Đề xuất:** giữ; không bổ sung bảng toán tử hoặc bài giảng kiểu dữ liệu dài hơn.

### 4. RunFlow, cả ba drawer, kết quả và câu trả lời — Giữ được

**Dẫn chứng:** “thứ tự xử lý logic, không phải cách đọc dữ liệu vật lý” ở dòng 68; “có 14 hồ sơ … gồm 13 … và 1 … là NV020” ở dòng 138.

Đã đọc từng thẻ và drawer, gồm nghĩa, chi tiết, câu SQL xem bước, bảng dữ liệu, tổng và liên hệ Excel:

| Bước | Nội dung quan sát trong nguồn và HTML | Đánh giá cho người học |
|---|---|---|
| FROM | Tổng 48 hồ sơ; drawer có 12 cột nguồn, trích ba dòng. Thẻ nhanh hiện ba cột, ghi thêm 9 cột và 45 dòng. Câu xem bước lấy mọi cột. | Không nhầm hình thu gọn thành bảng chỉ có ba cột hoặc ba hồ sơ. Dấu `*` đã giải thích ở bài 2.1. |
| WHERE | Tổng 14 hồ sơ; vẫn 12 cột nguồn, trích ba dòng. `NV001` bị loại vì `KT`; `NV020` được giữ vì `KD` dù đã nghỉ. Thẻ ghi thêm 9 cột và 11 dòng. | Phân biệt được lọc dòng với chọn cột, và hiểu vì sao trạng thái không tự thành điều kiện. |
| SELECT | Tổng vẫn 14 hồ sơ; bốn cột và alias theo yêu cầu. Drawer trích ba dòng; thẻ nhanh hiện ba cột và ghi thêm một cột. Câu xem bước trùng câu chính. | Bước cuối trả đúng danh sách cần gửi chị Hạnh. Không kết luận thiếu cột chỉ vì thẻ nhanh chưa hiện cột thứ tư. |

Các phần nghĩa bắt đầu từ từ khóa của bước; số hồ sơ có ở phần chi tiết. `RunFlow.query` trùng câu chính và SQL của bước cuối; cả ba `focus` đều là đoạn con khớp khoảng trắng của câu đó sau giải mã escape.

`Result` trích sáu dòng, tổng 14, đánh dấu dòng 6 là `NV020`. Câu trả lời nằm ngay sau bảng, nhận diện rõ sáu dòng là trích và không hứa thứ tự dòng cố định. Tổng 14 KD, trong đó 13 đang làm và một đã nghỉ, khớp hồ sơ công ty; đây là đối chiếu nội bộ tài liệu, chưa phải kiểm SQL live.

**Câu hỏi học thử:** Tại sao viết `SELECT` đầu nhưng xem `FROM` trước? Bài 2.1 đã giải thích nguồn trước cột; ở đây sơ đồ thêm bước lọc giữa hai bước. Tại sao chọn bốn cột không làm giảm 14 dòng? Nghĩa và chi tiết bước SELECT trả lời. Tại sao hình chỉ có sáu dòng nhưng trả lời 14? Dòng 138 và nhãn bảng trích trong HTML trả lời. **Đề xuất:** giữ.

### 5. Hay nhầm, Ứng dụng, Ghi nhớ — một chỗ Cần cắt nhỏ

**C1 — Cần cắt; ưu tiên thấp, không chặn làm bài.**

- **Vị trí và câu gốc:** cuối dòng 56, “có cột `TrangThai` trong danh sách cột chưa có nghĩa là đã lọc trạng thái”; dòng 148, “Chỉ thêm `TrangThai` vào `SELECT` vẫn trả cả hồ sơ đã nghỉ”.
- **Tác động:** cùng một phân biệt được nói gần như nguyên ý hai lần; làm phần giảng dài thêm mà không bổ sung điều kiện hay ví dụ mới. Kiến thức vẫn rõ và không sai.
- **Căn cứ:** mục 1 của quy ước yêu cầu mỗi ý nói một lần ngoài phần ôn; Hay nhầm dùng lỗi và hậu quả. Tên mục nhầm và hậu quả ở dòng 148 đã làm việc này rõ hơn vế cuối dòng 56; `LineMap` và sơ đồ cũng đã phân biệt chọn dòng/chọn cột.
- **Đề xuất ngắn:** cắt riêng vế sau dấu chấm phẩy ở cuối dòng 56; giữ phần `WHERE` không sửa/xóa nguồn và giữ Hay nhầm 3. Không thêm đoạn thay thế.

**Giữ được phần còn lại:** lỗi alias ở dòng 146 có cơ sở ngay trong thứ tự logic vừa học, không chỉ yêu cầu nhớ máy móc. Hai ví dụ sai ở dòng 147 dùng đúng bảng/cột của tình huống và phân biệt “không có dòng” với “báo lỗi”. Nguyên văn lỗi alias chưa được reviewer chạy để xác minh.

Ba ý Ứng dụng đều là việc làm nhờ lọc một điều kiện, có mục đích cụ thể; không biến thành lời khuyên chung hoặc hứa xác nhận nghiệp vụ. Ghi nhớ ôn đúng phần đã giảng, không dạy bù. Bài có bài tập nên không bắt buộc thêm câu tự kiểm tra; không cần thêm cho đủ khối.

### 6. Định dạng HTML tĩnh và đường thực hành — Giữ được trong phạm vi đã kiểm

**Dẫn chứng:** “Mỗi bài chỉ cần một điều kiện; … cột trả về phải đúng vị trí” ở dòng 173.

- Đủ đúng hai tiểu mục phần chính, theo thứ tự Excel → Sql → LineMap rồi RunFlow → Result → câu trả lời. Chữ đậm chọn lọc ở khái niệm/phép so sánh; tên cột, literal và giá trị dẫn chứng trong lời văn có code. Nội dung LineMap và ô Excel giữ cách hiển thị của component.
- HTML của câu chính và ba câu xem bước giải mã ra đúng chuỗi SQL tương ứng trong nguồn. Thuộc tính `data-copy` trùng nội dung khối `sql-code`; điều này chỉ xác nhận dữ liệu đầu vào cho nút sao chép, không chứng minh nút hoạt động.
- Dòng tiếp của danh sách cột có tab thật; không có hai ký tự `\t` hoặc `\n` lộ trong các khối SQL đã trích. CSS của `sql-code`, `rf-q` dùng `tab-size: var(--sql-tab-size)` và token bằng 4. Đây là kiểm cấu trúc/CSS tĩnh, không phải đo hiển thị thực tế.
- Các literal SQL sau giải mã dùng nháy thẳng. Không phát hiện nháy cong trong các đoạn SQL đã đối chiếu. Các đoạn query được tách để highlight trong drawer dùng phần tử khối theo CSS; không coi việc nối text DOM thiếu dấu xuống dòng giữa các phần tử là lỗi hiển thị.
- Các giá trị code trong drawer được HTML chuyển thành phần tử code; không thấy backtick/escape lộ trong các khối nội dung đã kiểm. Backtick trong script JavaScript của trang không phải nội dung bài.
- Ba liên kết bài tập trong HTML trỏ tới ba file trang đã có trong `dist`. Bài 2.1 đã chỉ trang Giới thiệu để chọn web có mã hoặc nơi thực hành riêng; bài 2.2 không thêm một yêu cầu kết nối SSMS cho người đang học trên web. Không xác minh luồng xin/nhập mã, đăng nhập, editor hoặc tải trang qua browser.

**Đề xuất:** giữ cấu trúc hiện tại; các thao tác UI vẫn cần bằng chứng riêng từ người kiểm tương tác.

## Tiền đề từng bài tập

Đã đọc prompt và xác định cách làm từ bài trước/bài 2.2 trước khi đọc phần `answer` YAML. Đối chiếu sau đó cho thấy đáp án dùng đúng các phép chọn cột/lọc dự kiến; không dùng đáp án làm lời giảng và không chép nguyên câu đáp án vào report.

| Đề, vị trí YAML | Kiến thức và cách làm xác định trước khi xem answer | Đã được dạy ở đâu | Còn thiếu hoặc khó tìm |
|---|---|---|---|
| 2-2-1, dòng 7–9: hồ sơ mã KT, ba cột | Chọn `MaNV`, `HoTen`, `MaPB` đúng thứ tự từ `NhanVien`; so mã phòng với chuỗi `KT`; không thêm trạng thái/ngày, không sắp xếp. | Bài 2.1: SELECT/FROM, dấu phẩy, thứ tự cột; bài 2.2 dòng 43–56: mẫu một điều kiện, dấu `=`, cột khác chuỗi, mã khác tên. Dòng 173 và prompt nêu thứ tự. | Không phát hiện thiếu tiền đề. Đổi KD sang KT là chuyển giá trị của cùng mẫu lọc, không cần kiến thức bảng khác. |
| 2-2-2, dòng 19–22: trạng thái Đã nghỉ, bốn cột | Chọn bốn cột đề yêu cầu, gồm `NgayNghiViec`; điều kiện nằm trên `TrangThai`, dùng chuỗi Unicode tiếng Việt; không suy thêm điều kiện ngày nghỉ. | Bài 1.3: chuỗi/Unicode và `N`; bài 2.1: chọn cột; bài 2.2 dòng 53, 56, 60: mô hình WHERE và literal tiếng Việt. Tên cột đã có trong prompt, `NgayNghiViec` cũng có ở drawer. | Không phát hiện thiếu tiền đề. Không cần học lọc NULL để làm đề vì đề lọc trạng thái, không lọc ngày nghỉ. |
| 2-2-3, dòng 32–36: từ 01/10/2026 trở đi | Chọn ba cột theo đề; điều kiện trên `NgayVaoLam`, dùng phép lớn hơn hoặc bằng và chuỗi ngày tám số; giữ đúng ngày 1/10 và mọi ngày về sau, không chặn ở cuối tháng. | Bài 1.3: `date`, chuyển kiểu ngầm và nguy cơ đọc đảo ngày/tháng; bài 2.1: chọn cột; bài 2.2 dòng 60–62: `>=`, bao gồm mốc, cách viết `yyyymmdd`, không có ngày kết thúc. | Không phát hiện thiếu tiền đề hoặc phải tìm ở bài sau. Đoạn cần dùng hiện ngay trong phần giảng, trước RunFlow và Ghi nhớ. |

Không có mục “chưa được dạy” hay “đã dạy nhưng khó tìm” đủ căn cứ để nâng thành finding ở ba đề này. Theo học thử trên nguồn tĩnh, kiến thức được cung cấp đủ để xác định cách làm cả ba đề. Kết luận này không xác nhận truy vấn đã chạy hoặc bộ chấm đã chấp nhận bài nộp.

## Ưu tiên xử lý

1. Không phát hiện lỗi có căn cứ chặn người mới hiểu tình huống hoặc xác định cách làm bài tập; không có finding “Cần sửa” hoặc “Cần làm rõ”.
2. **C1 — Cần cắt, thấp:** bỏ một vế lặp ở dòng 56, giữ mục Hay nhầm 3. Không đòi đổi YAML, dữ liệu, API, component hoặc bố cục đã chốt.
3. Các mục “Giữ được” là đánh giá nội dung và cấu trúc trong phạm vi đọc; không thay bằng chứng SQL/UI và không mang nghĩa cho phép push/deploy.

## Nguồn đã dùng và phần chưa xác minh

Đã đọc `AGENTS.md`, toàn bộ `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`; bài mẫu 1.1 và 2.1; các bài nền 1.2–1.5; nguồn bài 2.2 và YAML; ba mục quyết định được giao trong spec; manifest phiên bản được giao; HTML bài 2.2 và các quy tắc liên quan trong CSS được nó liên kết. Không đọc report cũ, nhận xét reviewer khác hoặc ma trận tác giả.

Chưa xác minh độc lập bằng SQL live: tổng thật của từng bước, mọi trường trong các dòng trích, số 13/1 và nguyên văn lỗi `Invalid column name`. Chỉ ghi nhận chúng nhất quán giữa bài và hồ sơ công ty ở những trường có thể đối chiếu; không tuyên bố sai hoặc đoán lại số liệu. Không đọc script database, secret, tài liệu SQL ngoài khóa học hoặc bài sau.

Chưa kiểm tương tác: mở/đóng drawer, focus, bàn phím, phản hồi nút Sao chép và clipboard, dán vào editor, bố cục trên viewport thật, web có mã và SSMS. Không chạy kiểm build/test/API do gói review chỉ giao nguồn và HTML tĩnh. Chỉ tạo report này, không sửa sản phẩm hoặc trạng thái Git.
