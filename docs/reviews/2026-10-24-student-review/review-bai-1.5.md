# Review độc lập bài 1.5 — lượt sửa theo kiểm thử học viên

- Ngày review: 24/10/2026.
- Bài: `src/content/lessons/1-5-doc-so-do-erd.mdx`, đọc toàn bộ 148 dòng; `noExercises: true`, không có YAML bài tập tương ứng trong danh sách file.
- Công cụ: Codex; reviewer kế thừa model của phiên, không chỉ định model khác.
- Góc đọc: Business Consultant muốn học đủ để đặt câu hỏi và phản biện về dữ liệu; chỉ dùng bài hiện tại và kiến thức các bài trước, theo brief của lượt review.
- Kết luận: kiến thức cốt lõi đủ cho mục tiêu bài. Chưa thấy lỗi kiến thức cần chặn; có hai điểm biên tập nên xử lý: làm rõ phạm vi hình Excel và cắt phần kể lại đường liên kết sau bảng cặp cột.

## Rà theo thứ tự bài

### 1. Tình huống và giả định — Giữ được

**Câu gốc, dòng 25:** “lấy các dòng lương kỳ `2026-09`, kèm **phòng ban đang lưu hiện tại** của nhân viên”.

Yêu cầu lương kèm tên phòng đủ cụ thể để người mới biết đang tìm gì. Giả định tách được kỳ của dòng lương với thời điểm của phòng ban, khớp hồ sơ công ty và những gì bài 1.1/1.4 đã nói về việc không lưu lịch sử chuyển phòng. Tình huống riêng về gộp phòng ở bài 1.4 không bị kéo sang bài này.

**Tự hỏi:** “Lương tháng 9 có mặc nhiên cho biết phòng tại tháng 9 không?” — **Đã trả lời:** không; đang lấy phòng hiện tại, cần nguồn lịch sử nếu muốn phòng tại kỳ lương.

### 2. Hai lần dò Excel — Giữ được; cần làm rõ phạm vi hình

**Câu gốc, dòng 33:** “VLOOKUP dò chính xác tìm mã ở cột đầu của một vùng rồi trả giá trị ở cột bạn chọn trên dòng khớp đầu tiên.”

**Giữ được:** lời giải không mặc định người đọc đã biết VLOOKUP. Định nghĩa nêu được tìm ở đâu, trả gì và lấy dòng nào; ngay sau hình có nghĩa của `D2`, `PhongBan!A:B`, `2`, `FALSE`. Ví dụ `NV001` → `KT` → `Kế toán` giúp hiểu vì sao có hai lần dò. Chưa biết viết công thức dò lần đầu vẫn hiểu được mục tiêu đọc đường liên kết của bài; không cần biến đoạn này thành bài hướng dẫn Excel.

**Câu gốc, dòng 33–40:** “Ô `D2` được tô vì nó là kết quả lần dò đầu…”; hình hiển thị ba dòng `NV001`, `NV002`, `NV003`.

**Đánh giá: Cần làm rõ, mức nhẹ.** Bài chưa gọi đây là hình minh họa/trích ba dòng. Người đọc có thể hiểu lưới là toàn bộ bảng lương kỳ đang xét, trong khi hình chỉ dùng ba dòng để diễn giải hai lần dò. Đây là thiếu nhãn phạm vi, không phải kết luận ba số thực lĩnh sai.

**Đề xuất:** sửa ngay câu dẫn, chẳng hạn: “Hình dưới minh họa ba dòng lương kỳ `2026-09` sau hai lần dò; ô `D2` được tô vì là đầu vào của công thức tại `E2`.” Không cần thêm đoạn giải thích hoặc thêm tổng dòng chưa được reviewer xác minh live.

**Tự hỏi:** “VLOOKUP làm gì, vì sao phải dò hai lần và ô nào truyền sang bước sau?” — **Đã trả lời.** “Ba dòng trên là toàn bộ bảng hay phần minh họa?” — **Chưa nói rõ.**

### 3. ERD, bảng cặp cột và phía một/phía nhiều — Giữ được

**Các câu gốc, dòng 44–68:** “mỗi hộp là một bảng”; “đường nối thể hiện khóa ngoại đã khai báo”; “một phòng có thể có 0, 1 hoặc nhiều hồ sơ”; “`BangLuong.MaNV` chỉ là một phần của khóa chính `(KyLuong, MaNV)`”.

ERD được giải nghĩa bằng đối tượng đã biết, rồi mới giới thiệu ký hiệu. Bảng hai cặp cột ngay sau sơ đồ giúp người mới xác định chính xác hai đầu liên kết, thay vì chỉ nhìn tên ba bảng. `PK`/`FK` nối được với bài 1.4; phần khóa ghép là việc áp dụng kiến thức đó vào các nhãn đang thấy trên hình, có lý do để giữ.

Đọc quan hệ từ hai phía đã tránh được hai hiểu nhầm thường gặp: phòng phải có ít nhất một người, và phía nhiều nghĩa là mỗi nhân viên có nhiều phòng. Điều kiện `MaPB` không nhận `NULL` được nói rõ, đồng thời bài cũng chỉ nơi xem khả năng nhận `NULL` vì sơ đồ không hiển thị thông tin này. Ví dụ tự trỏ `MaQuanLy` khớp bài 1.4 và hồ sơ công ty.

**Đối chiếu bản build ở mức HTML:** có đủ bảy hộp bảng; các đường/cột được đánh dấu `is-on` tương ứng đường `BangLuong.MaNV` → `NhanVien.MaNV` và `NhanVien.MaPB` → `PhongBan.MaPB`. Ký hiệu `1`/`∞` và chú thích có trong HTML; ô tô của Excel chứa `KT`. Đây là đối chiếu cấu trúc và nội dung HTML, chưa phải kiểm hình bằng trình duyệt.

**Tự hỏi:** “ERD giúp làm gì trước khi viết SQL?” — **Đã trả lời:** tìm bảng và cặp cột cần dùng. “Vì sao `1 — ∞` không bắt phòng phải có người?” — **Đã trả lời.** “Vì sao nhãn `PK FK` không có nghĩa là một-một?” — **Đã trả lời bằng khóa ghép.** “Muốn biết quan hệ có thể thiếu giá trị thì xem đâu?” — **Đã trả lời bằng Object Explorer → Columns, nối được với bài 1.3.**

### 4. Đi từ dòng lương tới tên phòng — Cần cắt phần lặp

**Câu gốc, dòng 74–76:** “Bắt đầu ở `BangLuong`…”; “Đi qua cặp `BangLuong.MaNV` → `NhanVien.MaNV`…”; “Đi tiếp qua cặp `NhanVien.MaPB` → `PhongBan.MaPB`…”.

**Đánh giá: Cần cắt.** Hai cặp cột và thông tin tìm được vừa có nguyên vẹn ở bảng dòng 52–55; ví dụ `NV001` → `KT` → `Kế toán` cũng đã giải thích ở dòng 33. Danh sách ba bước khiến người học đọc lại cùng đường một lượt nữa trước khi tới thông tin mới. Phần mới và cần giữ nằm ở dòng 78–80: vì sao mỗi dòng lương vẫn chỉ khớp một hồ sơ/một phòng, phải chọn kỳ lương riêng, và cách xử lý yêu cầu phòng theo kỳ.

**Đề xuất:** giữ bảng cặp cột cạnh ERD; bỏ hoặc gộp danh sách dòng 72–76 thành câu dẫn ngắn vào câu trả lời dòng 78. Giữ lý do đi về khóa chính và điều kiện kỳ lương. Có thể rút câu đầu dòng 78 vì tên đường đã nằm trong bảng/chú thích, nhưng không cắt phần giải thích vì sao không tăng dòng.

**Tự hỏi:** “Tìm được đường rồi thì đã tự chọn đúng kỳ và đúng thời điểm phòng ban chưa?” — **Đã trả lời:** chưa, còn phải chọn `2026-09` và xác nhận nguồn lịch sử nếu yêu cầu đổi. “Vì sao đường này không làm một dòng lương thành nhiều dòng?” — **Đã trả lời:** cả hai bước đi tới khóa chính, các mã bắt buộc có khóa ngoại trong bộ mẫu.

### 5. Hay nhầm — Giữ được

**Câu gốc, dòng 88:** “`NV021` có ba hợp đồng; lấy dữ liệu qua `HopDong` có thể làm hồ sơ này hiện ba dòng.”

Ví dụ cho thấy cái giá của đi sang phía nhiều, đối chiếu được với VLOOKUP chỉ trả dòng khớp đầu tiên. Câu “mỗi dòng kết quả là một người hay một hợp đồng” trả lời được vì sao cần quan tâm đến số dòng trước khi học cú pháp kết bảng. `NV021` có ba hợp đồng khớp hồ sơ công ty; reviewer chưa xác minh bằng database live.

Hai lỗi còn lại có hậu quả cụ thể và đúng phạm vi: không coi sơ đồ là toàn bộ nghiệp vụ; tránh tự lưu/cài Database Diagrams lên nguồn chung. “Data Model” được giới thiệu qua chức năng khai báo quan hệ, đủ cho đoạn so sánh ngắn này.

**Tự hỏi:** “Vì sao mã nhân viên lặp trong báo cáo chưa chắc là lỗi?” — **Đã trả lời:** một người có nhiều hợp đồng. “Không thấy đường nối thì chắc không liên quan?” — **Đã trả lời:** chưa chắc; hình chỉ thể hiện quan hệ đã khai báo. “Dùng sơ đồ nào để học an toàn?” — **Đã trả lời:** sơ đồ trong bài hoặc ở trang bài tập.

### 6. Ứng dụng, Ghi nhớ và tự kiểm tra — Giữ được

Ba ứng dụng gắn đúng việc làm nhờ ERD: tìm nguồn báo cáo, dự đoán dòng và đọc giới hạn thiết kế. Ghi nhớ ôn đúng bốn ý chính, được phép nhắc lại theo quy ước.

Năm câu tự kiểm tra nằm ngay sau Ghi nhớ, bao phủ hộp/đường nối, cặp cột, phía một/phía nhiều, khóa ghép và nguyên nhân tăng dòng. Đáp án đều có kiến thức tương ứng trong bài hoặc bài trước; không dạy thêm kiến thức mới chỉ ở đáp án. Các tên cột trong `summary` dùng `<code>`, dữ liệu và tên bảng/cột trong lời văn được đánh dấu nhất quán. Thời lượng 15 phút có thể chấp nhận với sơ đồ rộng và năm câu tự kiểm tra; reviewer chưa đo bằng phiên học thử có bấm giờ.

**Tự hỏi:** “Học xong tôi tự chỉ được đường và giải thích dòng lặp không?” — **Đã có đủ lời giảng và câu tự kiểm tra cho cả hai mục tiêu.**

## Ưu tiên xử lý

1. Rút danh sách đọc đường ở dòng 72–76, giữ bảng cặp cột cạnh ERD và lý do về số dòng ở dòng 78.
2. Gọi rõ hình Excel là phần minh họa ba dòng kỳ `2026-09` ngay trong câu dẫn.

Cả hai là điểm biên tập; review này không tìm thấy căn cứ để kết luận sai kiến thức SQL hay thiếu kiến thức nền khiến người mới không làm được các câu tự kiểm tra.

## Nguồn đối chiếu và giới hạn

Đã đọc: `AGENTS.md`; `temp/review/2026-10-24-student-update/brief.md`; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; toàn bài 1.1, 1.3, 1.4, 1.5; phần nội dung và SVG trong `dist/bai/1-5-doc-so-do-erd/index.html`.

Không đọc seed, `.env`, secret, các review cũ, báo cáo kiểm thử học viên gốc hoặc ma trận tác giả. Không kết nối/chạy database; ba số thực lĩnh trong hình và trạng thái dữ liệu live **chưa xác minh**. Không mở trình duyệt, nên chưa xác minh bố cục, màu nhìn thực tế, cuộn ngang, bấm tự kiểm tra hoặc tương tác ở trang bài tập. Không chạy lại test/build; bản build được cung cấp chỉ dùng để đối chiếu HTML. Không sửa sản phẩm/test/docs hoặc commit; chỉ tạo report này.

SHA-256 của MDX đã đọc: `74648C9831173D84DA58AA632E589317E4D563F37982FD223A3AE468B478307F`.
