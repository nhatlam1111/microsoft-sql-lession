# Review độc lập bài 1.3 — hình bảng trong database

Ngày review: 30/10/2026. Reviewer Codex, kế thừa model của phiên; không chỉ định model khác, không phân tiếp agent. Đọc như người chỉ biết Excel văn phòng cơ bản, đã học bài 1.1 và 1.2, chưa biết SQL/lập trình/quản trị.

## 1. Phạm vi, phiên bản và công cụ

Phạm vi sửa được giao là ảnh bảng–dòng–cột và lời dẫn liên quan. Tôi đọc toàn bài, mọi khối, năm câu ôn và nội dung article trong HTML để tìm ảnh hưởng tới mạch học. Không triển khai hay yêu cầu triển khai sáu đề xuất biên tập còn chờ; không review lại các thay đổi bài 1.1 đã kết thúc.

- HEAD kiểm trực tiếp: `f5f6f2f7899dc30976d1d797559cffbc87366cdb`; nhánh `chore/add-teach-skills`.
- Source: `src/content/lessons/1-3-bang-cot-kieu-du-lieu.mdx`, SHA256 `1FAB3504CF6F862FD9AD6DD2B8F16E05B7AFAADA79C1BF506F8301561706BA90`.
- Ảnh gốc: `src/assets/lessons/1-3-database-table.png`, kiểm kích thước trực tiếp `1536 × 1024`, SHA256 `DDE10666F2CDC886B92C8EFA67E0655915A368B69B77493EE52C5C6C47C1C5E2`.
- HTML: `dist/bai/1-3-bang-cot-kieu-du-lieu/index.html`, SHA256 `327B223704271F1E3EA44D84EEB8A192548C5B4FE764D9E359F367AB089C75EE`.
- Cả ba hash trùng gói giao. Thời điểm hoàn tất build `15:04:34` là thông tin của gói giao; metadata file HTML tôi kiểm là `15:04:33`. Tôi không tự chạy build hay đọc log kiểm của tác giả.
- Công cụ thực tế: `exec_command`/PowerShell để đọc file, `git diff` chỉ bài 1.3, lấy hash; Python chuẩn để trích toàn bộ nội dung article và kiểm thuộc tính HTML/đường dẫn asset; `view_image` để xem ảnh PNG gốc và WebP bản build rộng 720 px.

Diff bài 1.3 so với HEAD chỉ thêm import/figure, chuyển định nghĩa bảng–dòng–cột lên cạnh ảnh, đổi “Trong file này” thành “Trong file của tình huống” và bỏ phần định nghĩa đã chuyển khỏi đoạn phía dưới. Frontmatter, `noExercises`, 15 phút, Excel/Ssms, bảng sáu kiểu/sáu ô và năm câu ôn được giữ. Bài không có YAML bài tập.

## 2. Rà theo thứ tự người học gặp

Vị trí dưới đây đều là dòng của MDX đã kiểm hash.

| Phần | Kết quả học thử và câu hỏi tự đặt |
|---|---|
| Tình huống, giả định — dòng 22–30 | Biết chị Hạnh cần hiểu việc nhập ngày và tiền. “IT lấy dữ liệu gì từ ô?” đã được chốt là chữ đang hiển thị; hai cột đích và phạm vi xét đều có. Không phải suy ra đây là toàn bộ quy trình import. |
| Định nghĩa và ảnh — dòng 34–39 | “Bảng, dòng, cột cụ thể là phần nào?” có câu trả lời bằng cùng một đối tượng `NhanVien`: toàn khung bảng, một hồ sơ màu vàng và một cột có khung dọc. Ảnh đứng ngay sau định nghĩa, trước Excel. Khối Database phía sau và đường dẫn tới bảng thể hiện quan hệ chứa; không phải cửa sổ SSMS hay kết quả chạy SQL. |
| Từ Excel sang kiểu cột — dòng 41–58 | “Ảnh mới có phải file chị Hạnh gửi?” được phân biệt bằng “Trong file của tình huống” và “Hình dưới là file minh họa… chưa phải dữ liệu trong database”. “Vì sao cần kiểu cột?” được trả lời bằng so sánh/sắp xếp ngày và tính tiền ở dòng 56. Phần định nghĩa đã chuyển không bị giảng lại. |
| Excel minh họa — dòng 45–54 | Lưới có NV049/NV050/NV051, khác ba hồ sơ trong ảnh database. `C2`, `C3`, `D2`–`D4` có tọa độ ngay trong lưới Excel; lời dẫn và vị trí gần nhau khiến các tham chiếu sau đó không trỏ sang ảnh database. HTML giữ `C2` là `xl-mark xl-num`, `C3` là `xl-sel`, `D3` là `xl-mark`, `D4` là `xl-num`. |
| Đọc cấu trúc và sáu kiểu — dòng 60–79 | “Xem cấu trúc ở đâu, vì sao tên cột chưa đủ?” có đường Object Explorer → Tables → bảng → Columns, giải thích kiểu/NULL và hình `HopDong`. Bài 1.2 đã giải thích Object Explorer và việc Columns không phải dữ liệu. Sáu hàng kiểu có ví dụ; mã định danh giữ số 0 đầu giải thích được việc chọn kiểu theo ý nghĩa. |
| Đối chiếu sáu ô — dòng 81–104 | “Vì sao lưu được vẫn cần hỏi người gửi?” có thiết lập phiên, ngày mơ hồ, giới hạn nghiệp vụ và việc đọc kiểu ô Excel khác lấy chữ hiển thị. Câu trả lời cho chị Hạnh nằm trong mạch này. Không có lời hứa hình database tự đồng bộ với file Excel hoặc hai công cụ giữ kiểu giống nhau. |
| Hay nhầm — dòng 106–114 | Làm tròn/tràn số, chuỗi rỗng/NULL và Unicode đều có tình huống cụ thể cùng giới hạn. Đọc được nghĩa của hai câu ôn cuối từ phần này, không phải chờ mở đáp án mới biết. Không coi ví dụ Unicode là yêu cầu người học chạy câu ghi. |
| Ứng dụng, Ghi nhớ, tự kiểm tra — dòng 116–170 | Ba ứng dụng gắn với kiểu dữ liệu và chuẩn hóa đầu vào. Ghi nhớ nối cách hiểu Excel/SQL. Năm câu ôn nằm sau Ghi nhớ, không có bài tập hoặc yêu cầu nộp/chạy SQL. Ảnh mới không tạo thêm thao tác cần hoàn thành. |

Độ tải của phần bổ sung vừa phải: một câu định nghĩa, một ảnh, một caption. Ba callout ngắn giữ mắt người học ở cấu trúc; không thêm kiểu dữ liệu, khóa hoặc SQL vào hình trước phần giảng tương ứng. Phần chính vẫn có ba tiểu mục. Tôi không thấy đoạn mới nào cần cắt vì lặp với lời giảng phía dưới; caption lặp tên phần được đánh dấu để ảnh tự đủ nghĩa là có ích.

### Kiểm trực tiếp ảnh và dữ liệu

- Callout **Bảng** kết thúc ở khung ngoài của bảng `NhanVien`, không chỉ vào một ô dữ liệu.
- Toàn hàng `NV005` gồm mã, họ tên và ngày đều vàng; hàng tiêu đề không bị gọi là một hồ sơ.
- Khung **Cột** bao tiêu đề `HoTen` cùng cả ba tên, chỉ đúng một loại thông tin qua nhiều dòng. Ô giao nhau của hàng vàng và cột viền xanh vẫn đọc được cả hai dấu đánh.
- Chỉ có ba callout Bảng/Dòng/Cột. Nhãn Database, tên bảng và ba tên cột giữ vai trò nhận diện. Không có tọa độ A/B/C, số dòng, thanh công thức, kiểu dữ liệu, khóa hay câu SQL.
- Ba hồ sơ/ngày trong ảnh khớp `docs/ho-so-cong-ty.md` mục 3 và dữ kiện đã gặp ở bài 1.1: NV001/Trần Thị Mai/2024-03-01; NV005/Vũ Thị Lan/2016-03-14; NV014/Hồ Thị Bích/2017-10-02. Đây là đối chiếu nội bộ, không phải kiểm database live.
- Alt nói rõ cả bảng, toàn hồ sơ tô vàng và cột viền xanh. Caption gọi là “Hình minh họa”, giữ tên bảng/mã/cột trong `code`. HTML giữ đúng alt/caption; URL ảnh và hai URL `srcset` có base path `/microsoft-sql-lession/`, các file đích đều tồn tại trong `dist/_astro`.
- Bản WebP 720 px tôi mở vẫn đủ ba callout, tên bảng/cột và ba hồ sơ, không bị cắt nội dung. Việc mở file ảnh này không thay cho kiểm bố cục trang ở viewport 720 px hay mobile.

## 3. Tiền đề của từng câu ôn

Tôi xác định kiến thức cần dùng từ câu hỏi trước, rồi đối chiếu phần giảng và đáp án; bảng này không chép nguyên đáp án.

| Câu ôn / vị trí | Kiến thức cần có | Đã được dạy trước phần ôn | Thiếu tiền đề hay cần thao tác thêm? |
|---|---|---|---|
| 1 — dòng 138: nơi đọc kiểu và NULL | Object Explorer, đường tới Columns, đọc thông tin sau tên cột | Bài 1.2 phần tìm bảng; bài 1.3 dòng 62–64 và hình Ssms | Không thiếu để trả lời bằng nội dung bài. Không cần tự kết nối mới hiểu câu hỏi. |
| 2 — dòng 145: Format Cells và ô chữ | Phân biệt hiển thị với kiểu/giá trị; chữ không phải ngày | Dòng 43, 54, 91 và 98 | Không thiếu. |
| 3 — dòng 152: ba khả năng ở C2/C4/D4 | Giả định lấy chữ hiển thị, vị trí ô Excel, thiết lập phiên và ba khả năng chuyển kiểu | Dòng 28, lưới 47–52, dòng 54, 83–94 | Không thiếu. C2 được diễn đạt có điều kiện theo ý người nhập; không ép kết luận ngày chắc chắn sai. |
| 4 — dòng 159: hai giá trị vào decimal(4,1) | Ý nghĩa p/s, giới hạn phần nguyên, làm tròn và tràn số | Dòng 75–77 và Hay nhầm 1 dòng 110 | Không thiếu; hành vi cụ thể có trong phần đã đọc trước Ghi nhớ. |
| 5 — dòng 166: NOT NULL và họ tên đầy đủ | NULL/NOT NULL, chuỗi rỗng và chuỗi toàn dấu cách, giới hạn luật dữ liệu | Dòng 62 và Hay nhầm 2 dòng 111; nền “hợp lệ chưa chắc đúng” ở bài 1.1 | Không thiếu; không dùng đáp án để dạy bù. |

Năm câu có đủ tiền đề trong các bài được phép dùng. Câu hỏi hiện hành không kiểm riêng việc phân biệt bảng/dòng/cột; ảnh đang củng cố nền đã dạy ở bài 1.1, còn bộ câu ôn và mục tiêu bài 1.3 được yêu cầu giữ. Tôi không coi đây là thiếu sót cần thêm câu trong phạm vi lần này.

## 4. Findings và ưu tiên

Không phát hiện nhận xét **Cần sửa / Cần làm rõ / Cần cắt / Biên tập** có căn cứ trong phần hình và lời dẫn được giao. Không có hạng mục sửa ưu tiên phát sinh từ lượt này. Các mục dưới ghi nhận những quyết định giữ được bằng bằng chứng cụ thể.

### F1 — Giữ được: ba khái niệm có cùng đối tượng để đối chiếu

- **Vị trí/câu gốc:** dòng 34, “mỗi dòng, còn gọi là bản ghi, chứa một hồ sơ; mỗi cột chứa một loại thông tin”; ảnh và dòng 38, “dòng `NV005` được tô vàng, cột `HoTen`… có khung dọc màu xanh”.
- **Tác động:** người mới thấy được một hồ sơ gồm nhiều ô, còn một cột đi qua nhiều hồ sơ; không nhầm header thành hồ sơ hoặc chỉ ô họ tên vàng là cả dòng.
- **Căn cứ:** xem trực tiếp PNG gốc/WebP, đối chiếu vị trí mũi chỉ, nền vàng và khung dọc với định nghĩa; khớp quyết định ba callout ngắn trong spec.
- **Đề xuất:** giữ hình và định nghĩa hiện tại; không cần thêm chữ vào ảnh.

### F2 — Giữ được: tách rõ bảng database với lưới Excel của tình huống

- **Vị trí/câu gốc:** dòng 43, “Trong file của tình huống…”; dòng 45, “Hình dưới là file minh họa của tình huống, chưa phải dữ liệu trong database”.
- **Tác động:** khi đọc C2–D4, người học quay về đúng lưới có tọa độ Excel, không tìm các ô này trong bảng database vừa thêm. Không hiểu ba hồ sơ trong ảnh là kết quả nhập của ba dòng NV049–NV051.
- **Căn cứ:** thứ tự source và HTML đều là định nghĩa/ảnh database → tiểu mục Excel → lời dẫn/lưới Excel → giải thích ô. Hai hình dùng các mã hồ sơ khác nhau và có chú thích riêng.
- **Đề xuất:** giữ lời dẫn vừa sửa và vị trí ảnh trước tiểu mục đầu.

### F3 — Giữ được: hình khái niệm được nhận diện đúng và có phương án đọc bằng chữ

- **Vị trí/câu gốc:** dòng 37, alt bắt đầu “Minh họa database chứa bảng NhanVien…”; dòng 38, “Hình minh họa bảng `NhanVien` trong database…”.
- **Tác động:** ảnh không bị trình bày như màn hình SSMS hoặc kết quả SQL đã chạy. Người không nhìn được màu vẫn có lời giải thích tên hàng/cột và dấu đánh trong alt/caption.
- **Căn cứ:** ảnh không có cửa sổ công cụ/SQL, caption và alt tồn tại nguyên nghĩa trong HTML; kiểu code của các dẫn chứng không lộ backtick. Ba hồ sơ đối chiếu được với hồ sơ công ty.
- **Đề xuất:** giữ alt/caption; không cần thêm bảng chú thích hay SQL chỉ để chứng minh hình.

## 5. Nguồn và giới hạn

Nguồn trực tiếp đã dùng: `AGENTS.md`; `docs/quy-uoc.md` gồm mục 4.5; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; toàn bài 1.1 hiện tại để lấy nền/mẫu, bài 1.2 và bài 1.3; ảnh PNG, WebP 720 px và HTML đúng hash; mục “Phần giữ và nghiệm thu nếu triển khai” và “Bổ sung theo yêu cầu: hình bảng–dòng–cột” của spec; phần yêu cầu/ràng buộc đầu plan hình minh họa. Không dùng kết quả/review cũ hoặc kết luận của tác giả làm bằng chứng học thử.

Giới hạn thực tế:

- Chỉ đọc source/HTML và xem file ảnh. Không được giao browser, nên chưa xác minh viewport desktop/mobile, cuộn ngang, kích thước chữ thực tế trên trang, bố cục caption, bàn phím hay bấm mở năm `details`. Không khẳng định UI/tương tác đã đạt.
- Không đọc script database, secret hay tài liệu SQL ngoài khóa; không kết nối database, chạy SQL, API/runner, nộp bài hoặc thao tác SSMS. Kết quả chuyển kiểu/làm tròn, metadata kiểu/NULL và thiết lập phiên là nội dung bài/tài liệu nội bộ; tôi chỉ kiểm tính nhất quán và tiền đề giải thích, chưa xác minh kỹ thuật live. Không gặp mâu thuẫn nội bộ có căn cứ cần báo sai.
- Không chạy test/check/build/check:dist. Các hash và kiểm HTML ở đây không thay kết quả kiểm máy của tác giả. Lần trích HTML đầu gặp lỗi encoding stdout CP1252; đã chạy lại với stdout UTF-8 và đọc được toàn bộ article, không sửa file sản phẩm.
- Chưa đo 15 phút với người học thật. Nhận xét độ tải chỉ giới hạn ở học thử nội dung và phần bổ sung hình.
- Lệnh dò tiêu đề đầu lượt vô tình hiện cả một số dòng đề xuất biên tập nằm trước mục spec được giao. Tôi không dùng các dòng đó để lập finding hay đòi mở rộng phạm vi; không đọc report cũ hoặc ma trận xử lý.

Trong phạm vi đã kiểm, hình và lời dẫn đáp ứng yêu cầu bảng trong database, chỉ đúng bảng/một hồ sơ/một cột, đồng thời giữ rõ các tham chiếu Excel phía sau. Nội dung đã dạy đủ để trả lời cả năm câu ôn; phần chưa xác minh vẫn là kỹ thuật live và giao diện/tương tác thực tế nêu trên.
