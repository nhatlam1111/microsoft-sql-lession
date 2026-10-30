# Review độc lập bài 1.1 sau triển khai giảm tải

Ngày review: 30/10/2026. Vai học thử: Business Consultant khó tính muốn học SQL Server để hiểu và phản biện yêu cầu công việc, chỉ có Excel văn phòng cơ bản; chưa biết SQL, lập trình hoặc quản trị hệ thống. Không dùng VLOOKUP/PivotTable, bài sau hoặc đáp án để bù phần giảng.

## 1. Phạm vi, phiên bản và công cụ thực tế

- Bài: `src/content/lessons/1-1-database-la-gi.mdx`, toàn bộ 163 dòng, gồm frontmatter, bốn nhịp chính, mọi khối, alt/caption và bốn câu tự kiểm tra. Không có YAML/bài tập, không có bài trước.
- Source working tree được giao trên HEAD `f5f6f2f7899dc30976d1d797559cffbc87366cdb`, nhánh `chore/add-teach-skills`, có thay đổi chưa commit.
- SHA256 MDX xác nhận đầu và cuối lượt đọc: `1DF79A84E2647ADE8A34592F5F36B375BDC3F4566A17AD37875A3694FB2160E5`.
- HTML đã đọc: `dist/bai/1-1-database-la-gi/index.html`. SHA256 xác nhận đầu và cuối lượt đọc: `D9C24B1F13ECC798799CA6357986C7EA14B66CC698138537852A7FF5BB74402C`.
- Log build được giao: `temp/verification/2026-10-30-lesson-1-1-reduce-load/build-final.log`; log có route bài 1.1 và dòng `[build] Complete!` lúc 14:12:33. Đây là bằng chứng đọc từ log tác giả, không phải reviewer tự chạy build.
- Model: kế thừa model của phiên; không đoán tên model cụ thể. Ngữ cảnh mới, không tạo reviewer khác.
- Công cụ: PowerShell/`rg` đọc file, Git chỉ đọc HEAD/nhánh, SHA256, Python 3.13/`HTMLParser` đọc HTML và kiểm file ảnh được tham chiếu, `view_image` xem trực tiếp ba PNG gốc. Một lần in HTML bằng Python bị lỗi encoding `cp1252`; đọc lại thành công sau khi đặt stdout UTF-8, không sửa sản phẩm.
- Đã đọc `AGENTS.md`, quy ước, template, hồ sơ công ty, kỹ năng `teach`, phần quyết định và yêu cầu trong spec/plan được giao. Áp dụng `teach` ở tiền đề, nhịp học, độ tự đủ và tải nội dung; không tạo workspace/hồ sơ cá nhân/HTML riêng. Không đọc kết quả tác giả trong spec/plan, report cũ hoặc ma trận nhận xét.
- Không dùng browser, không có viewport hay kiểm tương tác trong lượt này. Không chạy test, SQL, DB, API, runner hoặc nộp bài; không đọc script database, secret hay tài liệu SQL ngoài khóa học. Chỉ ghi report này, không sửa source/test/docs/Git.

## 2. Rà theo thứ tự bài

### Mục tiêu và tình huống — dòng 1–31

Mục tiêu có ba phần rõ: phân biệt database/SQL Server/SQL, giải thích nguồn chung giúp gì và vì sao vẫn cần kiểm dữ liệu. `prerequisites: []` phù hợp với cách định nghĩa ngay trong bài; `noExercises: true` khớp việc không có mục thực hành. Nhãn 12 phút được giữ theo quyết định duyệt; lượt học thử này không đo thời gian với học viên thật.

Tin nhắn tạo vấn đề cụ thể: một lần chuyển phòng nhưng hai bản khác nhau. Giả định dòng 29 giới hạn cả hai file là danh sách phòng hiện tại và quyết định đã có hiệu lực trước lúc lấy dữ liệu. Nhân vật được tách khỏi hồ sơ bộ mẫu; không nhầm Quân với `NV048`. Câu hỏi dữ liệu không đòi chọn một file đúng toàn bộ.

Tự hỏi **“Tại sao có thể kết luận một dòng sai, và kết luận đến đâu?”**: giả định ở dòng 29 kết hợp sự việc dòng 37 và kết luận dòng 98 trả lời được. Bài chốt đúng dòng Quân, giữ yêu cầu đối chiếu các dòng khác.

### Nhịp 1: một lần chuyển phòng, hai bản khác nhau — dòng 35–39

`workbook` và `sheet` được giải nghĩa bằng file Excel/trang tính ngay lần đầu. Nguyên nhân lệch là mỗi người giữ bản sao và cập nhật không tới bản kia, không phải do Excel tự làm sai. Câu Excel hỗ trợ cùng sửa một workbook tránh suy diễn rằng chỉ database mới có nguồn dùng chung.

Tự hỏi **“Tại sao gửi bản riêng gây lệch, và thống nhất nguồn để làm gì?”**: dòng 37–39 cho cả cơ chế và cái giá là phải sửa đủ những bản đang dùng. Không cần người học biết công cụ quản trị hay kỹ thuật đồng bộ.

### Nhịp 2: đưa hồ sơ về một nguồn chung — dòng 41–52

Database xuất hiện như **một cách** tổ chức nguồn chung, có cấu trúc và truy cập theo quyền. Người học có điểm tựa workbook/sheet trước khi gặp bảng/dòng/cột/bản ghi; tên `NhanVien` đứng cạnh nghĩa sheet nhân viên. Phép tương tự được giới hạn bằng “trong database của khóa học”, không biến mọi database thành workbook.

Tự hỏi **“Nguồn chung có bảo đảm thông tin đúng không, ai phải làm gì?”**: dòng 52 trả lời trực tiếp bằng tình huống Quân chưa được cập nhật và căn cứ quyết định/ngày hiệu lực. Đây là giới hạn có ích tại đúng chỗ người mới dễ nghĩ cùng đọc một nơi là đủ.

Ảnh database không chứa số liệu hay hồ sơ. Alt và caption mô tả đúng biểu tượng dữ liệu cùng nhiều bảng; chữ “minh họa” đủ tách khỏi dữ liệu thật.

### Nhịp 3: giữ dữ liệu nhất quán — dòng 54–72

Ba ví dụ gắn với ba hậu quả cụ thể: ngày dạng chữ có thể làm lọc/sắp xếp sai; lặp mã có thể đếm thừa hồ sơ; tên phòng viết khác được thay bằng mã trong danh mục. Kiểu dữ liệu, `date`, khóa chính, `NULL`, khóa ngoại, ràng buộc/constraint và câu ghi đều có nghĩa tại chỗ. Không yêu cầu thực hiện câu ghi hoặc đọc cú pháp SQL.

Tự hỏi **“Mỗi luật giúp gì, có sẵn hay phải khai báo, và chặn được đến đâu?”**: dòng 66–70 nêu mục đích từng luật, điều kiện khai báo/đang bật và các giới hạn quan trọng. Một ngày hợp lệ vẫn có thể nhầm hồ sơ; hai mã khác nhau vẫn có thể là cùng người. Dòng 72 dùng ngay `KD`/`Kế toán` để chỉ ra mã có thật chưa xác nhận được phòng đúng. Câu ôn thứ ba không phải nơi bổ sung kiến thức này.

Các chi tiết sâu được dừng bằng dẫn bài 1.3/1.4/1.5; không cần mở các bài đó để hiểu lập luận hiện tại. Không thấy lý do phải khôi phục nhánh nhập file hoặc thêm SQL preview.

Đối chiếu hình Excel:

| Thành phần | Source và HTML đã đọc | Kết quả trong phạm vi kiểm |
|---|---|---|
| Phạm vi hình | Dòng 56 nói rõ file minh họa, không phải dữ liệu đang lưu trong database | Không giả làm kết quả DB hoặc khẳng định lỗi minh họa đang tồn tại trong DB |
| Ô được đánh dấu | `mark`: `C4`, `D4`, `A3`, `A5`; HTML đặt `xl-mark` đúng bốn ô | Khớp lời dẫn về ngày chữ, tên phòng khác cách viết và mã trùng |
| Ô đang chọn | `cell`/`selected`: `D4`, `formula`: `Ke toan`; HTML có tên ô `D4`, thanh công thức `Ke toan`, lớp `xl-sel xl-mark` ở đúng ô | Nội dung/thuộc tính lựa chọn khớp nhau |
| Ngày thật và chữ | `numeric`: `C2`, `C3`, `C5`; HTML có `xl-num` đúng ba ô, `C4` không có lớp này | Khớp cách phân biệt của hình minh họa; không suy ra kiểu ô chỉ từ dấu phân cách ngày |
| Các dòng | Hàng 1 là tiêu đề; hàng 3 và 5 cùng `NV005`/Vũ Thị Lan; hàng 4 có `02.10.2017`/`Ke toan` | Tọa độ và giá trị khớp từng dẫn chứng. Không có dấu backtick trong ô |

Chỉ xác nhận lớp/giá trị HTML, chưa quan sát màu vàng, viền chọn hoặc căn phải ở trình duyệt.

### Nhịp 4: lấy lại danh sách — dòng 74–100

Chuyển ý “để đọc được nguồn chung” đưa tới SQL Server rồi SQL một cách rõ ràng. SQL Server được giới thiệu là phần mềm Microsoft; SQL là ngôn ngữ yêu cầu dữ liệu; T-SQL được gọi tên ngay trong quan hệ với SQL Server, không đòi học cú pháp ở bài này. Các ảnh và caption giữ riêng vai trò phần mềm với vai trò ngôn ngữ.

Tự hỏi **“Cần SQL/SQL Server để làm gì trong chuyện này?”**: dòng 76 và 83 trả lời bằng việc đọc nguồn, xử lý yêu cầu và trả danh sách. Không cần một câu SQL mẫu để hoàn thành mục tiêu phân biệt ba vai trò.

Tự hỏi **“Xuất Excel xong còn lợi ích nguồn chung không, cái giá là gì?”**: dòng 90 nói file phản ánh lúc lấy và nêu điều kiện phải lấy lại hoặc có quy trình cập nhật. Bài không hứa các file tự đồng bộ.

Ba bước dòng 94–96 tách xác minh nghiệp vụ, trách nhiệm sửa nguồn và lấy lại dữ liệu. Người có quyền sửa dựa trên quyết định đã kiểm; người học không bị yêu cầu tự sửa bộ mẫu. Giới hạn lịch sử ở dòng 94 đủ cho mục tiêu: bộ mẫu giữ hiện tại, muốn xem quá khứ phải có bản chốt hoặc thiết kế lịch sử.

Tự hỏi **“Tại sao phải so cùng thời điểm/điều kiện, hai file khác nhau có chắc sai không?”**: dòng 90, 94 và 96 đã cho tiền đề để suy ra hai bản phục vụ hai mốc/phạm vi khác nhau không nhất thiết mâu thuẫn. Đáp án câu cuối dùng các tiền đề này, không dạy bù một cơ chế chưa có trong phần giảng.

Câu trả lời Quân ở dòng 98 nằm trong phần chính và đúng phạm vi giả định. Đoạn “Ở bài này chỉ cần…” ở dòng 100 đứng sau lời giải, chốt đủ ba phần mục tiêu rồi mới dẫn phần sâu hơn. Không làm đứt mạch trả lời tình huống.

### Hay nhầm — dòng 102–111

Bốn ý có lỗi/hậu quả cụ thể, không mở thêm nhánh hướng dẫn thao tác. Data Validation được giải nghĩa chức năng ngay bằng “để giới hạn dữ liệu nhập”, giữ điều kiện cần thiết lập; không mặc định người học biết dùng tính năng này. Ý đọc bộ mẫu dùng chung nêu được vì sao thao tác sửa ảnh hưởng học viên khác. Việc người phụ trách sửa nguồn trong câu chuyện và học viên chỉ đọc nguồn mẫu có chủ thể/phạm vi khác nhau, không thấy mâu thuẫn cần sửa.

### Ứng dụng — dòng 113–122

Bốn ứng dụng bám những khả năng vừa giải thích: nguồn chung, luật dữ liệu đã khai báo, lấy danh sách phục vụ đối chiếu/phân tích và xem lịch sử khi có thiết kế. Điều kiện lịch sử nằm ngay trong ý ứng dụng. Không hứa database biết sự thật, luôn tự lưu quá khứ hoặc tự cập nhật mọi bản Excel.

### Ghi nhớ và tự kiểm tra — dòng 124–163

Câu mở Ghi nhớ phân biệt ba vai trò; Memo còn hai đối chiếu phục vụ nguồn chung và cấu trúc; câu kết giữ giới hạn tính đúng hồ sơ. Không dùng Memo để dạy thêm luật. Ba thành phần này phủ mục tiêu, không cần thêm hàng khóa chính chỉ để nhắc lại ví dụ.

Bốn câu tự kiểm tra đứng sau Ghi nhớ, trước trạng thái hoàn thành bài. HTML giữ đủ bốn `details`/`summary`. Câu thứ ba giữ `<code>Kế toán</code>` và `<code>KD</code>`; cả hai giá trị đã có ở dòng 72. Dòng hướng dẫn hoàn thành bài trên HTML cũng yêu cầu tự trả lời được câu ôn.

## 3. Bảng tiền đề của bốn câu tự kiểm tra

Đã xác định kiến thức cần dùng từ phần giảng trước khi đối chiếu đáp án. Bảng ghi năng lực và vị trí tiền đề, không chép nguyên đáp án.

| Câu ôn | Kiến thức cần có | Đã được giảng trước phần ôn | Khoảng trống hoặc kết luận học thử |
|---|---|---|---|
| 1. Phân biệt database, SQL Server và SQL — dòng 138 | Tách nơi tổ chức dữ liệu, phần mềm quản lý và ngôn ngữ yêu cầu | Dòng 43/50, 76, 83; được ôn lại ở 126 | Đủ tiền đề; không cần kiến thức cài đặt, kết nối hoặc viết câu lệnh |
| 2. Nguồn chung giảm lệch giữa Nhân sự/Kế toán — dòng 145 | Hiểu lỗi sót cập nhật trên bản riêng và cách đổi sang một nguồn có trách nhiệm cập nhật | Dòng 37–43, 52, 95–96 | Đủ tiền đề; giới hạn đúng hồ sơ đã có trước đáp án |
| 3. Người thuộc Kế toán bị gán `KD` có trong danh mục — dòng 152 | Hiểu mã phòng/danh mục, phạm vi luật khóa ngoại và khác biệt giữa hợp lệ với đúng người | Dòng 68–72, đặc biệt ví dụ cùng Kế toán/KD ở 72 | Đủ tiền đề trực tiếp; không dựa vào kiến thức SQL bên ngoài hoặc tự biết `KD` là phòng nào |
| 4. Hai file khác nhau có chắc một file sai — dòng 159 | Phân biệt ảnh chụp dữ liệu theo thời điểm, dữ liệu hiện tại và điều kiện dùng để đối chiếu | Giả định dòng 29; file xuất ở 90; bản chốt/lịch sử ở 94; điều kiện so ở 96 | Đủ để lập luận trước khi mở đáp án. Đây là câu khái quát ngoài giả định riêng của dòng Quân; không phủ định kết luận 98 |

Bốn câu phủ ba phần mục tiêu; câu cuối kiểm việc áp dụng giới hạn thời điểm/phạm vi. Không có câu nào cần đọc bài sau hoặc biết cú pháp SQL. Kết luận này là đánh giá tiền đề trong tài liệu, không phải phép đo mọi học viên sẽ trả lời đúng.

## 4. Findings theo ưu tiên

Không phát hiện mục **Cần sửa**, **Cần làm rõ**, **Cần cắt** hoặc **Biên tập** có căn cứ đủ để yêu cầu thay đổi trong phạm vi phiên bản được giao. Không có lỗi kiến thức được xác lập bằng nguồn đã đọc; cũng không nâng việc đọc nguồn thành xác minh kỹ thuật live.

Các điểm giữ được có tác động thực tế:

| Đánh giá | Câu gốc ngắn và vị trí MDX | Tác động tới người mới | Căn cứ | Đề xuất |
|---|---|---|---|---|
| Giữ được | “Một cách tổ chức nguồn chung…” — dòng 43; “Excel cũng hỗ trợ cùng sửa…” — 39 | Hiểu giải pháp về nguồn/trách nhiệm mà không nhận định sai rằng Excel không làm việc chung được | Quy ước mục 2; nguyên nhân bản riêng ở 37 | Giữ hai điều kiện này |
| Giữ được | “Khi cột `MaNV` … được khai báo…” — dòng 67; “Khi ràng buộc đang bật…” — 70 | Không coi luật kiểm là khả năng luôn tự có của mọi database | Quy ước mục 2 và quyết định duyệt giữ điều kiện ràng buộc | Giữ điều kiện; không cần đưa lại nhánh nhập file |
| Giữ được | “`KD` là mã `Kinh doanh` có thật…” — dòng 72 | Có ví dụ cụ thể để phân biệt hợp lệ với đúng và tự làm câu ôn Kế toán/KD | Cùng ví dụ ở 152; mục tiêu dòng 10 | Giữ ví dụ và phạm vi xác nhận hồ sơ |
| Giữ được | “File xuất chỉ phản ánh dữ liệu lúc lấy…” — dòng 90 | Biết vì sao phải lấy lại danh sách và không coi file xuất là nguồn luôn sống | Các bước 94–96 và câu ôn 159 | Giữ giới hạn thời điểm/quy trình cập nhật |
| Giữ được | “ở dòng của Quân…; các dòng khác vẫn phải đối chiếu” — dòng 98 | Không mở rộng một bằng chứng thành xác nhận cả file đúng | Giả định 29, yêu cầu 31, quy ước khép tình huống trong phần chính | Giữ phạm vi câu trả lời |
| Giữ được | “Ở bài này chỉ cần phân biệt…” — dòng 100; “Hợp lệ chưa chắc đã đúng hồ sơ.” — 133 | Chốt được phạm vi hiện tại và một giới hạn chính trước khi tự kiểm tra | Spec phần Nội dung được duyệt; ba phần mục tiêu dòng 10 | Giữ vị trí đoạn chốt và phần ôn đã rút |

Về tải nội dung: nhịp ba vẫn là nơi nhiều thuật ngữ nhất, nhưng mỗi thuật ngữ đi với lỗi Excel cụ thể và hậu quả ngay tại chỗ. Không thấy một khoảng trống cần thêm đoạn giải thích. Những lần nhắc lại ở Hay nhầm là lỗi/hậu quả; Ứng dụng là việc làm được; Ghi nhớ/câu ôn thực hiện nhiệm vụ ôn. Không có căn cứ đề nghị cắt thêm làm mất tiền đề, khôi phục nhánh phụ hoặc bổ sung khối chỉ để đủ hình thức.

## 5. Nguồn, đối chiếu HTML/ảnh và giới hạn

Nguồn đã dùng:

- `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, `.agents/skills/teach/SKILL.md`.
- `docs/superpowers/specs/2026-10-30-lesson-1-1-reduce-load-design.md`, chỉ phần Hướng đã chọn/Nội dung được duyệt/Kiểm và review; `docs/superpowers/plans/2026-10-30-lesson-1-1-reduce-load.md`, chỉ yêu cầu/nhiệm vụ trước Kết quả.
- MDX, HTML, log build và ba PNG gốc được liệt kê trong gói giao; không dùng tài liệu bài sau để bổ sung kiến thức cho người học. Hồ sơ công ty chỉ dùng đối chiếu bối cảnh/nhân vật/giới hạn của bài 1.1.

| Ảnh PNG đã xem trực tiếp | Quan sát | Đối chiếu alt/caption |
|---|---|---|
| `src/assets/lessons/1-1-database.png` | Khối dữ liệu dạng trụ và ba bảng không có số liệu | Khớp ý tổ chức dữ liệu, ghi rõ minh họa |
| `src/assets/lessons/1-1-sql-server.png` | Khung ứng dụng, biểu tượng thiết lập, hai khối database và một bảng | Khớp vai trò phần mềm quản lý; caption nói hình khái niệm, không giả ảnh SSMS thật |
| `src/assets/lessons/1-1-sql-language.png` | Tờ yêu cầu ghi SQL, mũi tên, database và bảng kết quả tượng trưng | Khớp ý gửi yêu cầu lấy kết quả; không chứa câu SQL hay kết quả DB cần chạy |

Trong HTML của bài: đủ ba ảnh cùng ba `figcaption`; hình Excel có lời dẫn riêng trong phần văn. Các `src`/`srcset` dẫn tới đủ sáu WEBP cục bộ đang tồn tại. Đã đối chiếu toàn nội dung article, code/giá trị dẫn chứng, hai hàng Memo và bốn câu ôn. Đếm ký tự backtick literal trong article: 0. Các ô Excel giữ chữ thuần, câu ôn thứ ba giữ đúng dấu tiếng Việt và mã. Nháy cong ở lời văn “Đã học xong” không phải chuỗi SQL. Bài không có khối SQL, nên không có phép kiểm cú pháp, thụt lề hoặc sao chép SQL trong phạm vi này.

Chưa xác minh:

- UI browser, kích thước thực tế, màu/viền/căn lề của Excel, ảnh WEBP khi hiển thị, mở câu ôn bằng chuột/bàn phím và trạng thái hoàn thành. Đọc HTML, nhìn PNG gốc và kiểm đường dẫn ảnh không thay thế các phép kiểm này.
- Tính đúng của cơ chế SQL Server qua thực thi hoặc tài liệu Microsoft: không được chạy SQL/đọc nguồn ngoài gói. Không có nghi vấn cụ thể có căn cứ từ bài/hồ sơ để ghi thành lỗi kỹ thuật; đây vẫn là giới hạn xác minh.
- Kết quả `npm test`, `npm run check`, `npm run check:dist` hoặc kiểm DB/API: reviewer không chạy và không nhận kết quả các lệnh đó làm chứng cứ riêng. Dòng Complete trong log build chỉ được báo đúng là bằng chứng tác giả cung cấp.
- Mốc 12 phút và khả năng tự học của học viên thật chưa được đo.

Kết luận: phần giảng có đủ tiền đề cho bốn câu ôn, lời giải tình huống giữ đúng giả định và phần giảm tải không tạo khoảng trống học tập thấy được. Không có yêu cầu sửa nội dung trong lượt review này. Kết luận không xác nhận UI/SQL đã chạy đúng và không thay cho các kiểm của tác giả hoặc quyền push/deploy.
