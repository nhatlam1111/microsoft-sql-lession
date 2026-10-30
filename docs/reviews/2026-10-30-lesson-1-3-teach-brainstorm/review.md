# Review độc lập bài 1.3 — teach và đề xuất biên tập

Ngày: 30/10/2026. Vai học thử: Business Consultant khó tính, muốn hiểu Microsoft SQL Server để trao đổi và phản biện yêu cầu công việc; nền tảng Excel văn phòng cơ bản, chưa SQL, lập trình hoặc quản trị hệ thống. Reviewer là agent Codex mới, kế thừa model của phiên; không chỉ định hoặc đoán tên model khác, không phân tiếp agent.

## 1. Phạm vi, phiên bản và công cụ thực tế

- Bài: `src/content/lessons/1-3-bang-cot-kieu-du-lieu.mdx`, 160 dòng, `noExercises: true`, không YAML, năm câu tự kiểm tra. Đây là review và đề xuất; không sửa nội dung bài.
- HEAD đọc được: `f5f6f2f7899dc30976d1d797559cffbc87366cdb`. Source 1.3 SHA256: `38EA37BAEC042CF957C4F86BB0BFF2BDAE2A047DB6E31A58AFA6CCCD0D6F8F07`, khớp gói giao.
- Build đọc được: `dist/bai/1-3-bang-cot-kieu-du-lieu/index.html`; SHA256 `FC773627EC552927A9FF06F67F793295F21C65AE0040597A0E65184D3D87BD32`, khớp gói giao. Thông tin build ngày 30/10/2026 do người giao cung cấp; reviewer không tự chạy build.
- Đã đọc AGENTS.md, toàn bộ quy ước/template/hồ sơ công ty, bài 1.1 bản working tree hiện tại và bài 1.2. Không review lại thay đổi bài 1.1.
- Chỉ đọc đúng phần quyết định được giao: spec 18/10 mục 18, dòng 345–355; spec 24/10 dòng 5–13 và 25. Không đọc nhận xét/kết luận review cũ.
- Áp dụng `.agents/skills/teach/SKILL.md` để rà tiền đề, nhịp học, tải kiến thức và khả năng vận dụng. Quy ước repo thắng các bước tạo workspace/HTML/hồ sơ học viên của skill: không tạo những thứ đó, không chuyển mục tiêu sang Principal/Master, không tự mở thêm hoạt động học.
- Công cụ: PowerShell đọc file và hash/HEAD; Python `HTMLParser`/chuỗi để đọc phần article, bảng, nội dung caption và thuộc tính HTML. Không browser, không SQL/DB/API/runner, không nộp bài, không chạy test. Không đọc script dữ liệu, secret hoặc tài liệu SQL ngoài khóa học. Một lỗi mã hóa stdout Python ban đầu đã được xử lý bằng UTF-8; phần HTML sau đó đọc được đầy đủ.
- Đọc HTML là kiểm nội dung đã render, không phải xác nhận giao diện tương tác, vị trí trên màn hình hoặc SQL chạy đúng. File duy nhất được tạo bởi lượt này là report này.

## 2. Rà theo thứ tự bài và các câu “vì sao/để làm gì”

### Mục tiêu và tình huống — dòng 1–27

**Giữ được.** Mục tiêu đủ cụ thể: đọc kiểu/null và phân biệt chuyển kiểu giữ giá trị, có thể đổi khác ý, hoặc từ chối. Tin nhắn chị Hạnh đưa ra dữ liệu đủ gần công việc. Giả định “lấy đúng chữ đang hiển thị” ở dòng 25 rất cần thiết: thiếu giả định này thì không thể suy thẳng từ một ô ngày thật của Excel sang chuỗi SQL Server nhận.

Câu tự hỏi: **“Tại sao bài khẳng định database nhận một số ô, trong khi Excel đã chứa tất cả?”** Bài trả lời bằng kiểu của ô so với kiểu chung của cột ở dòng 33–48, rồi xét từng ô ở dòng 79–84. **“Kết quả này đúng cho mọi nơi nhập hay chỉ môi trường khóa học?”** Dòng 25 giới hạn phiên và hai cột; dòng 75 nói phiên khác có thể đọc khác; dòng 88, 92 tách cách lấy dữ liệu và cách báo lỗi. Không có căn cứ yêu cầu thêm một quy trình import thực tế trong bài nhập môn này.

Hai tên `NhanVien.NgayVaoLam` và `HopDong.LuongCoBan` là đường chỉ bảng/cột trong giả định. Có nền tảng bảng/cột ở 1.1 và cách tìm bảng ở 1.2; chưa cần thêm glossary hoặc SQL preview.

### Ô Excel, hình minh họa và kiểu chung của cột — dòng 29–48

**Giữ được.** Data Validation được nói bằng công dụng giới hạn dữ liệu nhập; Format Cells được tách khỏi việc chuyển chữ thành ngày/số. Bài không tuyệt đối hóa Excel. Khái niệm bảng/dòng/cột nhắc lại ngắn từ 1.1 để dẫn tới điều mới là một kiểu cho cả cột; không phải một đoạn lặp dài cần cắt.

Đã đọc từng ô và thuộc tính của hình:

| Phần hình | Điều source và HTML thể hiện | Đánh giá học thử |
|---|---|---|
| Ba dòng `NV049`–`NV051` | Lưới có tiêu đề và ba dòng mẫu, không phải ba hồ sơ thật đang có trong database | Dòng 35 đã gọi rõ là file minh họa; không suy bộ mẫu có thêm nhân viên |
| `C2` | `01/02/2024`, `mark` và `numeric`; HTML `xl-mark xl-num` | Khớp lời “ngày thật trong Excel”, được tô để xét rủi ro hiểu ngày |
| `C3` | `2024.02.01`, `selected`; ô tên và thanh công thức cùng chỉ `C3`/giá trị này | Khớp lời “ô đang chọn”, là chữ trong giả định của hình |
| `C4` | `chưa rõ` | Không được giả làm ngày; cần xét việc chuyển kiểu |
| `D2` | `9.610.000`, không `numeric` | Khớp lời giữ dạng chữ, tránh mặc định dấu chấm là định dạng hiển thị của số thật |
| `D3` | `9,61 triệu`, `mark`; HTML `xl-mark` | Khớp dấu tô và ví dụ chữ kèm đơn vị |
| `D4` | Số `9610000`, HTML `xl-num` | Khớp lời số thật; theo giả định đầu bài, phía nhập vẫn lấy chữ hiển thị để xét chuyển kiểu |

Caption/lời dẫn nói đúng hai ô được tô `C2`, `D3`; ô chọn `C3` được giải thích ngay sau hình. Chưa kiểm màu, độ rộng hoặc khả năng đọc thật trên màn hình.

Câu tự hỏi: **“Lưu ngày bằng `date` để làm gì?”** Dòng 46 trả lời bằng so sánh/sắp xếp theo ngày và hạn chế thứ tự chữ. **“Tại sao ngày thật trong Excel vẫn phải hỏi lại?”** Dòng 44 phân biệt điều Excel đã hiểu với ý người nhập; dòng 75, 79, 88 hoàn tất hệ quả. Bài không khẳng định chắc `C2` đã sai.

Một vướng từ vựng nhỏ: “chuỗi” bắt đầu ở dòng 48 mà chưa được nối rõ với “dữ liệu dạng chữ”; xem F1.

### Đọc kiểu/null trong SSMS và bảng các kiểu — dòng 50–69

**Giữ được.** Đường Object Explorer → Tables → bảng → Columns nối được từ thao tác bài 1.2. `NULL` và `NOT NULL` được giải nghĩa trước hình. Hình mô phỏng `HopDong` và HTML thống nhất: `LuongCoBan (decimal(18,0), not null)` và `NgayKetThuc (date, null)` có `ssms-mark`; caption nêu đúng hai cột và quy ước hợp đồng không xác định thời hạn. Các cột khác trong hình cũng đọc được; PK/FK không phải thông tin bài 1.3 bắt giải hoặc dùng làm tiền đề câu ôn. Bài 1.2 đã báo chữ trong ngoặc gồm khóa/kiểu/null và chỉ sang 1.3–1.4.

Đã đọc đủ sáu dòng bảng kiểu. Mỗi dòng có cột và giá trị minh họa, giúp đọc `varchar`/`nvarchar`/`char`, `date`, `time(0)`, `decimal` gắn với dữ liệu nhân sự. Byte có lời giải nghĩa ngắn; Unicode được mô tả bằng khả năng giữ dấu tiếng Việt; bài không cần dạy mã hóa ở đây. `varchar` không bị đánh đồng luôn luôn một ký tự/một byte; lời giới hạn riêng cho mã không dấu và số. Độ dài `nvarchar` được giới hạn bằng “tiếng Việt thông thường” và dẫn bài 2.7, không có lý do kéo thêm trường hợp mã hóa hiếm vào bài này.

Câu tự hỏi: **“`decimal(4,1)` phải đọc hai số thế nào, tại sao chỉ ba chữ số phần nguyên?”** Dòng 65–67 cung cấp tổng chữ số và chữ số sau dấu thập phân, rồi làm rõ phần nguyên bằng ví dụ. **“Tại sao số CCCD lại là chữ, tiền lại là số?”** Dòng 67, 69 trả lời bằng đơn vị nghiệp vụ, giữ số 0 đầu và nhu cầu cộng trừ. **“Có `char(7)` là đủ đúng kỳ lương chưa?”** Dòng 62 đã nói không tự kiểm đúng dạng kỳ lương. Các ý này gắn với chọn kiểu, không chỉ liệt kê tên.

Bảng khá dày nhưng còn có mục đích nhận diện kiểu theo dữ liệu. Không đề nghị thêm bài tập gõ kiểu hoặc mở rộng sang thiết kế bảng.

### Đối chiếu sáu ô và khép tình huống — dòng 71–94

**Giữ được.** Ba khả năng được nêu trước bảng; `DATEFORMAT` được giải nghĩa tại chỗ, `mdy` có thứ tự tháng/ngày/năm. Mỗi ô xuất hiện đúng một dòng, đủ kết quả và bước xử lý. Bảng không thay mọi lỗi thành “dữ liệu sai”: ngày có thể lưu thành công nhưng cần xác nhận ý muốn, tiền cần thống nhất đơn vị, và lỗi chuyển ngày không được xử lý bằng điền đại.

Đối chiếu đủ sáu dòng với hình:

- `C2`, `C3`: chữ ngày và kết quả khác nhau được giữ nguyên trong HTML. Với `C2`, câu cần làm là xác nhận ngày mong muốn, không kết luận mặc định người gửi muốn ngày 1 tháng 2.
- `C4`: giá trị `chưa rõ` bị từ chối theo phần giảng; lời xử lý viện dẫn `NOT NULL`. Cần nói rõ hơn đây là thuộc tính của `NgayVaoLam`, vì hình Columns đang minh họa bảng khác; xem F2. Đây không phải thiếu định nghĩa `NOT NULL`.
- `D2`, `D3`: giữ khác biệt giữa chuỗi dấu ngăn nghìn và chuỗi có chữ/đơn vị; đều được yêu cầu xác nhận trước khi chuẩn hóa.
- `D4`: giữ số tiền với điều kiện đúng đơn vị. Không tự suy từ “lưu được” ra “đúng hồ sơ”.

Câu tự hỏi: **“Tại sao chỉ sửa các ô báo lỗi vẫn chưa đủ?”** Bảng và dòng 86 trả lời ngay; dòng 90 nêu ranh giới ngày hợp lệ/ngày đúng, số tiền/luật chặn số âm. **“`NULL` ở ngày nghỉ việc tự có nghĩa đang làm à?”** Dòng 90 nói rõ đó là quy ước bộ mẫu, tiếp nối ý hợp lệ chưa chắc đúng ở 1.1. **“Nếu một dòng lỗi thì cả file có dừng không?”** Dòng 92 không hứa một hành vi chung mà yêu cầu thống nhất với IT. Đó là giới hạn hữu ích, không cần dạy chi tiết kỹ thuật import.

Lời đáp chị Hạnh nằm ngay sau bảng, không tách mục trả lời riêng; phần chính có ba nhịp theo đúng khung gộp. Câu “Ở bài này chỉ cần…” ở dòng 94 chốt phạm vi và chỉ đúng nơi đi sâu hơn. Riêng `us_english` có thể thêm nhãn “ngôn ngữ” cho dễ đọc; xem F4.

### Hay nhầm — dòng 96–104

**Giữ được hai ý đầu.** Làm tròn/tràn số giải thích cái giá của kiểu số có giới hạn; chuỗi rỗng/dấu cách tách giới hạn `NOT NULL` khỏi yêu cầu nội dung đầy đủ. Cả hai đều được giảng trước phần ôn. Quyết định được giao đã cho giữ các giới hạn này; không yêu cầu chuyển chúng vào phần chính chỉ để tuân một quy tắc vị trí cứng nhắc.

Câu tự hỏi: **“Có `decimal` là giữ hết mọi chữ số được gửi vào không?”** Dòng 100 có hai trường hợp làm tròn và một trường hợp tràn số, nối được với giải nghĩa `p,s` ở dòng 65–67. **“Có `NOT NULL` là bắt buộc điền đúng tên không?”** Dòng 101 phân biệt không có giá trị với có chuỗi nhưng không có nội dung hữu ích. Không cần lấy đáp án ôn làm lời giảng bù.

Ý Unicode thứ ba đúng mạch phòng lỗi viết SQL về sau theo lời bài, nhưng thêm một ký hiệu cú pháp mới trong lúc người học chưa viết SQL. Không cần nó để giải tình huống hay năm câu ôn. Đây là ứng viên rút tải, không phải kết luận kiến thức sai; xem F3.

### Ứng dụng, Ghi nhớ và ôn — dòng 106–160

**Giữ được.** Ba ứng dụng là chọn kiểu, thống nhất đầu vào và phát hiện dữ liệu cần chuẩn hóa, có đối tượng/công việc cụ thể. Chưa có lời hứa database tự xác minh đúng hồ sơ. Từ “số đầu” ở ý một nên sửa cụ thể thành số 0 ở đầu; xem F4.

Memo có bốn dòng đối chiếu Excel/SQL, ôn đúng những ý đã học. Năm khối `details` đứng sau Ghi nhớ; HTML có đủ năm `summary` và đáp án. Không có mục Bài tập giả khi bài `noExercises: true`. Câu ôn thứ ba giữ sự không chắc chắn của ý người nhập; không ép `C2` chắc chắn thuộc trường hợp dữ liệu sai.

## 3. Bảng tiền đề năm câu tự kiểm tra

Đường suy luận dưới đây được lập từ phần giảng, không dùng đáp án làm nguồn dạy thêm. Sau đó đối chiếu với đáp án: không phát hiện kiến thức mới chỉ có trong đáp án. Không chép nguyên đáp án vào bảng này.

| Câu và vị trí | Cần biết để tự làm | Đã được dạy trước phần ôn | Còn thiếu/phân loại | Kết quả đối chiếu đáp án |
|---|---|---|---|---|
| 1, dòng 128: nơi đọc kiểu/null | Phân biệt cấu trúc Columns với dòng dữ liệu; đọc kiểu và nhãn null | 1.2 dòng 90–94; 1.3 dòng 52–54 và hình HopDong | Không thiếu; đường đi và ví dụ có sẵn. Người chỉ dùng web có thể đọc hình theo định hướng 1.2, không phải tự kết nối để trả lời | Cùng kiến thức đã giảng, không thêm thao tác mới |
| 2, dòng 135: Format Cells và chữ `chưa rõ` | Hiển thị khác chuyển dữ liệu; cột ngày không nhận chữ không chuyển được | 1.3 dòng 33, 44, 46–48 và dòng bảng 81 | Không thiếu; đủ dữ kiện lý giải bằng công dụng, không phải nhớ một mẹo định dạng | Đáp án không dạy thêm điều kiện mới |
| 3, dòng 142: ba ô và khả năng chuyển kiểu | Giả định lấy chữ hiển thị; kiểu đích; mdy; phân biệt lưu thành công và đúng ý | Dòng 25, 44, 73–84, 86–88 | Không thiếu. Riêng `C2` là rủi ro cần xác nhận, không có dữ kiện kết luận chắc ý người nhập; cách hỏi/đáp hiện giữ được điều đó | Đáp án vẫn giữ điều kiện ý muốn/đơn vị |
| 4, dòng 149: hai số vào decimal(4,1) | Tổng chữ số, số lẻ, giới hạn phần nguyên; làm tròn khác tràn số | Dòng 65–67 và Hay nhầm 1, dòng 100 | Không thiếu; Hay nhầm là phần giảng trước ôn. Học viên có thể cần quay lại dòng 100, nhưng không phải kiến thức chỉ xuất hiện trong đáp án | Khớp ví dụ và giới hạn đã nêu; chưa xác minh SQL live |
| 5, dòng 156: HoTen NOT NULL và đầy đủ | NULL không đồng nghĩa mọi dạng trống; chuỗi rỗng/dấu cách là nội dung khác; có thể có luật khác | Dòng 52, Hay nhầm 2 dòng 101 và Memo dòng 122 | Không thiếu cho câu hỏi giả định “có NOT NULL”. Không cần biết thêm schema HoTen thật để trả lời giới hạn của luật này | Đáp án nhắc lại kiến thức đã giảng, có điều kiện luật khác |

Bộ ôn phủ mục tiêu đọc kiểu/null, hiển thị so với chuyển kiểu, ba khả năng và giới hạn; không chỉ kiểm trường hợp ngoại lệ. Các câu 4–5 dùng lại đúng ví dụ nên chủ yếu kiểm nhớ/giải thích. Có thể tăng vận dụng bằng đổi một giá trị khi sửa đợt sau, nhưng không có bằng chứng buộc phải thay để bài hiện tại làm được; không đề nghị thêm câu thứ sáu.

## 4. Findings và phương án đề xuất

Không phát hiện lỗi kiến thức có đủ căn cứ để kết luận **Cần sửa**, hoặc lỗ tiền đề chặn việc làm năm câu ôn. Các mục dưới là làm rõ và rút tải; không phải xác nhận SQL/UI đã chạy đúng.

### F1 — Cần làm rõ: nối “chuỗi” với dữ liệu dạng chữ ngay lần đầu

- **Vị trí/câu gốc:** dòng 48, “Cách đọc chuỗi và giới hạn của kiểu cột quyết định giá trị được lưu”; sau đó từ này xuất hiện nhiều ở dòng 60–62, 75, 82, 101.
- **Tác động:** người biết Excel cơ bản vừa được chia ô thành ngày/số/chữ, nhưng phải tự suy “chuỗi” là tên của dạng chữ đang bàn. Vướng nhỏ về từ vựng, không phải thiếu cơ chế chuyển kiểu.
- **Căn cứ:** bài 1.1–1.2 chưa giải nghĩa thuật ngữ này; quy ước yêu cầu thuật ngữ lần đầu có nghĩa tại chỗ. Câu 5 còn dùng “chuỗi rỗng”, nên nối từ sớm sẽ làm phần đó nhẹ hơn.
- **Đề xuất:** sửa ngay câu đầu dòng 48 thành “Khi nhận dữ liệu dạng chữ (còn gọi là chuỗi) để ghi vào cột ngày hoặc số, …”. Không thêm glossary hoặc đoạn định nghĩa riêng; không cần dạy ký tự/mã hóa ở đây.

### F2 — Cần làm rõ: gắn NOT NULL với đúng cột ngày đang xử lý

- **Vị trí/câu gốc:** dòng 81, “Xác minh ngày; không điền đại để qua cột `NOT NULL`”.
- **Tác động:** người học vừa thấy `NgayKetThuc` nhận NULL trong bảng HopDong có thể tự hỏi tại sao không gửi NULL cho ô “chưa rõ”. Bài đã dạy ý nghĩa NOT NULL; chỗ khó là không nêu trực tiếp `NhanVien.NgayVaoLam` chính là cột không nhận NULL. Hình đang mở HopDong không xác nhận thuộc tính của NgayVaoLam.
- **Căn cứ:** nguồn có kiểu `date` của NgayVaoLam ở dòng 46, nhưng không nêu rõ khả năng nhận NULL trước câu này. Đây là làm rõ thuộc tính đang được bài viện dẫn, không kết luận schema thật sai hoặc cần thêm hình Columns.
- **Đề xuất:** sau khi tác giả xác minh thuộc tính cột, thay chính ô lời khuyên bằng “`NgayVaoLam` không nhận `NULL`: cần xác minh ngày, không điền đại.” Giữ ngắn và không mở quy trình tự sửa cấu trúc hay tự nhập dữ liệu.

### F3 — Cần cắt, ưu tiên thấp: cân nhắc để cú pháp N'…' ở bài viết SQL

- **Vị trí/câu gốc:** dòng 102, “Khi viết SQL trên database khóa học, dùng `N'Trần Thị Mai'`…”.
- **Tác động:** thêm một quy tắc viết literal và một đường mất dấu cho người đang học nhận diện kiểu và đọc file Excel. Người học phải đổi từ luồng IT lấy chữ trong file sang tự viết SQL, rồi quay lại phần ôn không dùng kiến thức mới ấy. Câu có nói rõ “Khi viết SQL”, nên chưa đủ căn cứ gọi đây là gây hiểu nhầm chắc chắn.
- **Căn cứ:** bảng dòng 61 đã đủ giới thiệu nvarchar/giữ dấu để đọc kiểu; năm câu ôn không dùng tiền tố N; dòng 94 đã hẹn Unicode ở 2.7. Quyết định không thêm SQL preview vẫn được giữ, nhưng có thể rút một cảnh báo viết SQL chưa cần cho tình huống.
- **Đề xuất ưu tiên:** bỏ riêng mục Hay nhầm 3, giữ dòng kiểu nvarchar và dẫn bài 2.7 ở dòng 94. Không bỏ Unicode khỏi bảng, không thay bằng một đoạn giải thích dài khác. Nếu tác giả có mục tiêu chuẩn bị đọc literal ngay từ 1.3 thì có thể giữ nguyên: đây là lựa chọn biên tập cần cân, không lỗi chặn học hoặc yêu cầu phải chuyển mọi giới hạn ra khỏi Hay nhầm.

### F4 — Biên tập: thêm nhãn ngắn và gọi đúng số 0

- **Vị trí/câu gốc:** dòng 75, “dùng `us_english` và `mdy`”; dòng 110, “mã định danh bằng kiểu chữ để giữ số đầu”.
- **Tác động:** tên us_english có thể bị đọc như một dạng ngày thay vì ngôn ngữ của phiên; “giữ số đầu” rộng hơn lý do cụ thể đã dạy ở dòng 69.
- **Căn cứ:** dòng 75 chỉ giải nghĩa mdy; dòng 69 đã nói rõ số 0 đầu. Không cần giải thích lại ngôn ngữ/locale hoặc kiểu mã định danh.
- **Đề xuất:** thêm “ngôn ngữ `us_english`, `DATEFORMAT` là `mdy`” vào câu đang có; thay “giữ số đầu” bằng “giữ số `0` ở đầu”.

### Các phần nên giữ, không mở rộng

- Giữ giả định lấy chữ hiển thị, sáu ô và ba khả năng; chúng là xương sống giúp trả lời “vì sao” bằng ví dụ cụ thể.
- Giữ `DATEFORMAT` theo phiên, điều kiện xác nhận ý người nhập và ranh giới ngày hợp lệ/đúng hồ sơ. Không yêu cầu khôi phục ví dụ 1900 đã bỏ theo quyết định.
- Giữ làm tròn/tràn số và giới hạn NOT NULL ở Hay nhầm: đủ tiền đề, có ích thực tế, không cần thêm chương mục chỉ để di chuyển vị trí.
- Giữ lời đáp cạnh bảng, khung gộp và ba ứng dụng; không thêm CREATE TABLE/CAST/SELECT hoặc phần luyện SQL vào bài khái niệm này.
- Không cắt các điều kiện “chỉ xét hai cột”, “tùy công cụ nhập” hoặc “nếu không có luật khác” để bài trông gọn hơn; thiếu chúng sẽ đổi lời hứa của bài.

Thứ tự xử lý đề xuất nếu người làm khóa học chọn sửa: F1 và F2 để giảm chỗ phải đoán, F4 vì sửa ngắn và cụ thể; sau đó cân F3 để giảm tải. Không có căn cứ cần viết lại bài hoặc thêm nội dung mới để đủ finding. Mốc 15 phút có vẻ hợp với bài có hai bảng và năm câu ôn, nhưng chưa đo trên người học thật; không khẳng định thời lượng đã được kiểm nghiệm.

## 5. Nguồn và giới hạn của kết luận

Nguồn học thử là bài 1.3, bài 1.1–1.2 và các tài liệu repo đã nêu ở mục 1. Quyết định cũ chỉ dùng giới hạn phạm vi; không dùng kết quả review cũ làm bằng chứng. HTML hiện tại xác nhận nội dung văn bản, bảng, năm câu ôn và lớp đánh dấu khớp source. Không thấy backtick hoặc chuỗi escape `\t` lộ trong article; code Unicode render dưới dạng `N&#39;Trần Thị Mai&#39;`, tức nháy đơn thẳng sau giải mã HTML.

**Chưa xác minh kỹ thuật độc lập:** các phép chuyển ngày/số, rounding/overflow; cấu trúc và dữ liệu thực trong database; cách import lấy chữ/giá trị ngày; các kết quả tùy thiết lập phiên. Reviewer chỉ kiểm tính nhất quán và đường hiểu trong nội dung được giao; dòng “Tác giả đã kiểm” của bài không trở thành một lần chạy do reviewer thực hiện. Đặc biệt F2 cần tác giả đối chiếu schema trước khi chốt chữ.

**Chưa kiểm UI/tương tác:** màu và hình học thật của Excel/SSMS, layout các viewport, bàn phím, details mở/đóng, nút hoàn thành, copy/paste, màn thực hành web hoặc SSMS thật. Không có SQL nhiều dòng/RunFlow/copy ở bài này để kiểm thụt lề. Không chạy test/build nên không báo bộ kiểm đạt hoặc suy có lỗi nền.

Kết luận học thử: phần giảng hiện có đủ dữ kiện để suy luận năm câu tự kiểm tra, không cần dùng bài sau hoặc đáp án để bù kiến thức. Những điểm đề nghị làm rõ chủ yếu là nối thuật ngữ và nói rõ cột ngày không nhận NULL; đề nghị rút N'…' là lựa chọn về tải kiến thức. Kết luận này không thay kiểm SQL, UI, quyền sửa nguồn hoặc quyền push/deploy.
