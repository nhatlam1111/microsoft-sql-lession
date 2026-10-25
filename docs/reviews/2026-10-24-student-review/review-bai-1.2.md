# Review độc lập bài 1.2 — SQL Server, SSMS và database mẫu HRM_Demo

- Ngày: 24/10/2026.
- Vai trò: học thử theo brief, từ góc nhìn Business Consultant muốn hiểu SQL Server để trao đổi và phản biện yêu cầu.
- Công cụ/model: Codex, kế thừa model của phiên; đọc MDX, bài trước và HTML build. Không mở trình duyệt, không kiểm tương tác.
- Phạm vi: `src/content/lessons/1-2-sql-server-ssms-hrm-demo.mdx`; không có YAML bài tập tương ứng (`noExercises: true`).

Bài đã giải thích được hai lối thực hành và điều kiện hoàn thành theo từng lối. Có một lỗi thao tác cần sửa: tên instance Express hiện có hai dấu gạch chéo ngược trên cả MDX lẫn HTML build. Một điểm nhỏ cần bổ sung trong phần tự kiểm tra là quyết định chọn nơi thực hành.

## Rà theo thứ tự bài

### 1. Mục tiêu và tình huống — Giữ được

**Câu gốc (L11):** “chọn nơi thực hành; nếu dùng SSMS thì kết nối đúng database và xem được danh mục phòng ban”.

Mục tiêu có điều kiện đúng: người chỉ học trên web không bị yêu cầu tự kết nối ở bài 1.2. Tin nhắn của chị Hạnh và câu hỏi bổ sung tên database/cách đăng nhập khớp hồ sơ công ty, tạo được lý do phải phân biệt máy chủ với database. Không cần thêm giả định hay một phần trả lời riêng.

**Tự hỏi:** Tại sao tên máy chủ và tài khoản chưa đủ? **Bài đã trả lời:** còn cần biết database cần mở và cách đăng nhập.

### 2. Từ workbook tới SQL Server, Azure SQL và SSMS — Giữ được

**Câu gốc (L35–43):** “SSMS ... là công cụ cài trên máy bạn để kết nối, tìm bảng, gửi câu lệnh và xem kết quả”; “HRM_Demo là tên bộ dữ liệu ... trên máy chủ khóa học ... database `free-sql-db-8797714`”.

Đã phân biệt được dữ liệu, phần mềm quản lý và công cụ truy cập; không làm người mới tưởng phải cài SQL Server để truy cập nguồn chung. Đường máy chủ → database → bảng và ví dụ `dbo.PhongBan` đủ cụ thể. `schema` được giải thích ngay; T-SQL đã có định nghĩa ở bài 1.1 nên không thiếu kiến thức nối bài. Cách đối chiếu workbook/sheet không tuyệt đối hóa Excel và có nói workbook cũng được dùng chung.

**Tự hỏi:** Vì sao tiêu đề nói HRM_Demo mà màn hình lại hiện một tên database khác? **Bài đã trả lời:** HRM_Demo là tên bộ dữ liệu, còn tên database dùng chung là `free-sql-db-8797714`.

**Tự hỏi:** Đóng SSMS thì dữ liệu mất không? **Bài đã trả lời:** dữ liệu vẫn ở máy chủ.

### 3. Chọn nơi thực hành và cài bản riêng

#### Giữ được: hai lối và phạm vi hoàn tác

**Câu gốc (L49–53):** “từ bài 1.6 ... không cần Windows hay SSMS”; “Mã truy cập ... khác tài khoản SSMS”; “Cơ chế này chỉ có trên trang bài tập”.

Lối web có thời điểm bắt đầu, điều kiện nhận mã và nơi hỏi mã. Lối SQL Server riêng có hướng dẫn thay thế nếu chưa có mã, đồng thời nói rõ không có chấm tự động. Đoạn L51 nói đủ việc người chỉ dùng web cần làm ở bài này. Phân biệt hoàn tác của trang bài tập với việc ghi dữ liệu trong SSMS là cần thiết, không hứa Ctrl+Z cứu dữ liệu trên nguồn chung.

L55–71 đã tách SSMS khỏi bộ máy SQL Server, nói rõ Windows, thời gian cài không tính vào 20 phút, tài khoản/máy chủ/database theo từng môi trường và hậu quả chạy lại script trên bản riêng. Không đề nghị bỏ quy trình bản riêng đã được duyệt.

**Tự hỏi:** Tôi chỉ dùng web thì có cần cài và kết nối SSMS ngay không? **Bài đã trả lời:** chưa cần, thực hành web bắt đầu ở bài 1.6.

**Tự hỏi:** Không có mã web thì làm tiếp bằng cách nào, và có được chấm tự động không? **Bài đã trả lời:** dùng bản riêng; không có chấm tự động.

#### [P2] Cần sửa: tên instance Express có hai dấu gạch chéo ngược

**Câu gốc (L62 và L67):** `localhost\\SQLEXPRESS`.

**Căn cứ:** HTML build ở cả bảng “Nơi thực hành” và bước cài đặt số 2 chứa `<code>localhost\\SQLEXPRESS</code>`. Đã đếm trực tiếp nội dung thẻ code: **2** ký tự gạch chéo ngược; chuỗi dài 21 ký tự. Đây là ký tự thật của nội dung hiển thị, không phải chỉ cách công cụ in chuỗi escape.

**Tác động:** người mới chép nguyên Server Name trong hướng dẫn sẽ chép sai tên instance và có thể bị kẹt trước khi tạo database. Đây là nhánh được chỉ làm thay thế khi chưa có mã web, nên lỗi ảnh hưởng trực tiếp khả năng bắt đầu học.

**Đề xuất:** hai chỗ này phải hiển thị `localhost\SQLEXPRESS`, với **một** dấu gạch chéo ngược. Đây là inline code MDX, không phải chuỗi JavaScript cần escape đôi; sửa cả hai chỗ rồi đối chiếu HTML build. Chưa thử kết nối SSMS, nên báo cáo không khẳng định đã tái hiện thông báo lỗi kết nối.

### 4. Kết nối và tìm bảng — Giữ được

**Câu gốc (L75):** “nếu đã tạo bản riêng, thay thông tin kết nối bằng dòng tương ứng trong bảng trên”; “bản riêng giữ thiết lập đăng nhập và chứng chỉ ở bước cài đặt trên”.

Hướng dẫn đã khoanh hình kết nối vào nguồn dùng chung và trỏ người dùng local về bảng thông tin tương ứng. Các bước SSMS phân biệt hộp mới/cũ, chỉ nơi nhập tên database và có cách xử lý firewall. L100 nhắc lại đúng `HRM_Demo` cho bản riêng ở ô chọn database trước khi chạy. Ngoài lỗi dấu gạch chéo ở trên, không thấy mâu thuẫn tên database cần báo riêng.

**Câu gốc (L92–94):** “Chữ trong ngoặc mô tả khóa, kiểu dữ liệu và khả năng nhận NULL”; “Columns cho biết cấu trúc, chưa phải các dòng dữ liệu”.

Các cột `MaPB`/`TenPB` và phần mô tả được đánh dấu trong HTML phù hợp với lời giải thích. Có chỉ rõ hình SSMS là mô phỏng qua nhãn truy cập của component; chưa kiểm diện mạo bằng trình duyệt. Cảnh báo Edit Top 200 Rows nằm đúng nơi người học có thể nhầm thao tác.

**Tự hỏi:** Tại sao thấy Columns rồi vẫn phải chạy câu lệnh? **Bài đã trả lời:** Columns là cấu trúc, không phải danh mục các dòng.

### 5. Câu lệnh, kết quả và câu trả lời tình huống — Giữ được

**Câu gốc (L98–104):** người dùng web chỉ đọc; người dùng SSMS chạy `SELECT * FROM PhongBan;`; cú pháp SELECT học ở bài 1.6.

Đã giữ được mục tiêu thao tác của bài này mà không bắt người mới học cú pháp trước bài 1.6. Câu đơn không phát sinh yêu cầu kiểm thụt lề nhiều cấp. Sáu mã/tên phòng trong Result khớp danh mục của hồ sơ công ty. Câu trả lời ngay cạnh kết quả phân biệt danh mục đang lưu với khẳng định phòng còn hoạt động; lời giải tình huống không hứa quá dữ liệu có sẵn. Đã nói thứ tự có thể khác khi chưa có ORDER BY và file chép sang Excel không tự cập nhật.

Đoạn ngắt kết nối đã nêu cả Object Explorer và cửa sổ truy vấn, kèm lý do hạn mức chung. Không thấy cần thêm phần giải thích kỹ thuật về phiên kết nối ở bài nhập môn.

**Tự hỏi:** Sáu dòng có đủ để trả lời chắc chắn công ty đang hoạt động với sáu phòng không? **Bài đã trả lời:** chỉ đủ nói danh mục đang lưu; cần xác nhận người quản lý danh mục nếu yêu cầu là phòng còn hoạt động.

**Giới hạn:** chưa chạy SELECT, chưa xác minh trạng thái database, nguyên văn thông báo script, thiết lập mã hóa hay hành vi SSMS thực tế. Không kết luận các nội dung đó đã được kiểm bằng live SQL.

### 6. Hay nhầm, Ứng dụng, Ghi nhớ — Giữ được

Các lỗi nhầm nhắm đúng điểm cản kết nối: tên database, tên máy chủ, lỗi 40613. Điều kiện “thường”, dịch vụ tạm không sẵn sàng và hết hạn mức đã tránh đồng nhất mọi lỗi 40613 với sai tài khoản hoặc chỉ cần chờ. Có một ít nhắc lại thao tác kiểm nguồn nhưng mục Hay nhầm thêm triệu chứng và cách xử lý nên chưa thấy đoạn cần cắt bắt buộc.

Ba ứng dụng gắn với truy cập, đọc cấu trúc và lấy kết quả phục vụ buổi họp; Memo ngắn, đúng chủ đề. Không thấy thiếu in đậm khái niệm trọng tâm hay code cho dữ liệu/tên bảng cột ở lời giải chính.

### 7. Tự kiểm tra — Giữ được phần lớn; cần phủ thêm quyết định nơi thực hành

**Câu gốc (L154):** “Nếu dùng SSMS, hãy kết nối ... Nếu chỉ dùng web, trả lời các câu dưới và chọn được nơi thực hành là đủ”.

Điều kiện hoàn thành phù hợp với mục tiêu đầu bài; có năm câu sau Ghi nhớ, đủ nền tảng về công cụ, thông tin kết nối, Columns/dữ liệu, phạm vi danh mục và hoàn tác. Đáp án tự đủ nghĩa, không dạy thêm lý thuyết chưa có trong bài.

#### [P3] Cần làm rõ: chưa có câu tự kiểm tra quyết định chọn nơi thực hành

**Căn cứ:** mục tiêu có “chọn nơi thực hành”, nhưng năm summary hiện tại chỉ hỏi vai trò công cụ, thông tin kết nối database khóa học, cách xem dòng, ý nghĩa sáu dòng và hoàn tác. L154 yêu cầu người học tự chọn, nhưng chưa có câu để kiểm họ hiểu điều kiện của lối web và bản riêng hay chưa.

**Tác động:** người học có thể trả lời đủ năm câu mà vẫn chưa biết mã web khác tài khoản SSMS, hoặc chưa chọn được cách thực hành khi không có mã. Đây chính là quyết định cần hoàn thành trước bài 1.6.

**Đề xuất:** mở rộng câu thứ hai thành “Hai lối thực hành cần chuẩn bị gì?”; đáp án nhắc gọn web cần mã truy cập từ bài 1.6, SSMS cần Windows và thông tin kết nối đúng môi trường, bản riêng không có chấm tự động. Giữ tổng năm câu, không cần thêm một khối giải thích vào lý thuyết.

**Tự hỏi:** Tôi đã hiểu để chọn nơi thực hành chưa? **Phần giảng đã trả lời; bộ câu tự kiểm tra chưa kiểm trực tiếp.**

## Ưu tiên

1. Sửa hai tên instance Express ở L62/L67 và xác nhận HTML còn đúng một dấu gạch chéo ngược.
2. Phủ mục tiêu “chọn nơi thực hành” bằng cách chỉnh một câu tự kiểm tra đang có.
3. Giữ cấu trúc gộp Excel/SQL, mục tiêu có điều kiện và các giới hạn thực hành/an toàn hiện tại. Không thấy cần tăng độ sâu hay tách thêm bài.

## Nguồn đối chiếu và giới hạn

Đã đọc `AGENTS.md`, `temp/review/2026-10-24-student-update/brief.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, toàn bộ bài 1.1 mẫu đã duyệt, toàn bộ bài 1.2; đối chiếu `dist/bai/1-2-sql-server-ssms-hrm-demo/index.html` và component `src/components/lesson/Ssms.astro` để hiểu phần hiển thị/đánh dấu. Các quyết định phạm vi lấy từ brief của lượt review.

Không đọc seed, `.env`, báo cáo học viên gốc, ma trận tác giả, review cũ hoặc review của agent khác; không kết nối hay chạy database; không tra tài liệu SQL ngoài khóa học. Chưa mở trình duyệt, chưa kiểm nút Sao chép, dropdown, SSMS thật hoặc quy trình cài đặt. Không chạy lại bộ test/build chung trong vai reviewer; dùng bản build được giao để đọc HTML. Chỉ ghi file report này, không sửa sản phẩm/test/docs/spec/plan và không commit.
