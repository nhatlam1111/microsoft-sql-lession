# Review nội dung độc lập — Làm quen SQL Server

Ngày: 01/11/2026. Model: **kế thừa model của phiên**. Ngữ cảnh review mới, không đọc nhận xét reviewer khác hoặc kết luận kiểm của tác giả.

## Phạm vi, phiên bản và cách kiểm

- Đã đọc toàn bộ `src/content/presentations/lam-quen.mdx`: 20 slide, bốn câu hỏi, mọi lời giải và ghi chú người giảng; cùng `Slide.astro`, `PresenterNotes.astro`, `ProjectionTable.astro`, `ProjectionRelation.astro` trong `src/components/presentations/`.
- Đã đọc AGENTS.md, toàn bộ quy ước/template/hồ sơ công ty, bài 1.1–1.5 và phần quyết định đã duyệt trong `docs/superpowers/specs/2026-11-01-foundation-presentation-design.md`. Không áp khung bài đầy đủ hay giới hạn từ của bài nền vào slide.
- Mốc giao review: commit `081a5a3388064d95513b28a22364fa5d2f65c168`. Đã kiểm diff trong phạm vi: bản làm việc chỉ rút câu đề slide 19 thành “Tìm tên phòng hiện lưu cho từng hợp đồng.” tại MDX:423; các nội dung/component còn lại không đổi so với mốc này. Câu mới giữ nguyên yêu cầu và được review cùng HTML hiện tại.
- Đã đọc HTML tĩnh `dist/bai-giang/lam-quen/index.html` và `dist/bai-giang/lam-quen/nguoi-giang/index.html` sau lần dựng lại được giao. Không đọc build log hoặc hồ sơ kết luận của tác giả. ID, bài nguồn và thời lượng của cả 20 slide trong hai HTML khớp MDX hiện tại; tổng thời lượng slide là 48 phút, cộng 7 phút hỏi đáp khớp metadata 55 phút.
- Công cụ thực dùng: PowerShell `Get-Content`, `rg`, Git đọc trạng thái/diff; Python thư viện chuẩn để trích/đối chiếu HTML. Không dùng browser, không chạy test/build, SQL, API hoặc kết nối database. Không đọc seed, secret hay tài liệu SQL ngoài khóa học; không đi theo raw import của `ProjectionRelation`.

Giả định học thử: người học biết Excel văn phòng cơ bản và **đã học 1.1–1.5**; chưa biết viết SQL, lập trình, VLOOKUP/PivotTable hoặc quản trị hệ thống. Đã thử xác định cách trả lời từng câu hỏi từ các phần đã học trước khi đọc lời giải.

**Kết quả:** không phát hiện lỗi nội dung cần sửa trong phạm vi này. Cả bốn câu hỏi có đủ tiền đề cho đúng đối tượng ôn tập đã duyệt. Đây là kết luận đọc nguồn/HTML, không xác nhận SQL live hoặc giao diện tương tác đã chạy đúng.

## Rà theo thứ tự bài giảng

Vị trí `MDX:n` dưới đây là dòng trong `src/content/presentations/lam-quen.mdx` hiện tại. Đã đọc cả ba mục ghi chú của từng slide; bảng ghi ý có tác động tới cách hiểu, không chép lại toàn bộ nội dung.

| Slide / vị trí | Câu gốc ngắn / đánh giá | Câu hỏi của người học và căn cứ giữ |
|---|---|---|
| 1 · MDX:17 | “Nhận đúng nguồn dữ liệu, đọc đúng cấu trúc” — **Giữ được** | Học để làm gì? Mục tiêu hướng tới đọc và giải thích dữ liệu, không hứa sau một buổi biết viết SQL. Ghi chú nói rõ đã học 1.1–1.5; nhịp 48 + 7 phút nhất quán. |
| 2 · MDX:42 | “Nguồn chung giảm lệch bản sao” — **Giữ được** | Vì sao đổi nguồn? Ví dụ bản Excel riêng giải thích lệch phiên bản; câu tiếp “Dữ liệu vẫn cần đối chiếu” và chú thích Excel có thể làm việc chung tránh hai kết luận quá mức. Ghi chú giải thích quyền và luật đã khai báo. |
| 3 · MDX:63 | “SQL là ngôn ngữ gửi yêu cầu” — **Giữ được** | Bốn tên khác nhau để làm gì? Hình và ghi chú phân biệt công cụ, ngôn ngữ, phần mềm quản lý, dữ liệu; ghi chú nối tới báo lỗi/xin quyền đúng nơi. Chiều kết quả trả về SSMS được nói rõ. |
| 4 · MDX:87 | “đóng SSMS rồi sửa tên trong file” — **Giữ được** | Dữ liệu ở đâu, thao tác vừa sửa vào đâu? Đề đủ để áp bài 1.1; lời giải không thêm luật mới. Ghi chú giới hạn đúng file xuất thông thường, không yêu cầu thử ghi dữ liệu. |
| 5 · MDX:111 | “Trích bảng NhanVien” — **Giữ được** | Bảng, dòng, cột là phần nào? Ba dòng/cột cụ thể và dấu đánh chọn đúng dòng `NV005`, cột `HoTen`. Câu “Dòng là một hồ sơ” nằm trong ví dụ `NhanVien`; slide 7 phân biệt ngay đơn vị của `HopDong`, nên không biến mọi dòng thành một người. |
| 6 · MDX:132 | “Tên cột thuộc thiết kế” — **Giữ được** | Vì sao không dùng “dòng thứ 5”? Câu mã hồ sơ và điều kiện sắp xếp trả lời trực tiếp. Ghi chú nêu cái giá: thêm cột phải đổi thiết kế và cần quyền; không cần biết cú pháp bài 2.4 để hiểu ý này. |
| 7 · MDX:154 | “Một dòng ở HopDong là một hợp đồng” — **Giữ được** | Vì sao mã lặp ba lần? Hai bảng trích cùng `NV021` cho thấy đơn vị khác nhau; ghi chú giải thích tách bảng để tránh sửa lặp thông tin hồ sơ. Chỉ trích `MaNV` ở hợp đồng đã được ghi rõ, không giả làm ba dòng hoàn toàn giống nhau ở bảng nguồn. |
| 8 · MDX:180 | “Format Cells đổi cách hiển thị” — **Giữ được** | Vì sao nhìn giống ngày chưa đủ? Đối chiếu giá trị/hiển thị và kiểu cả cột trả lời được; điều kiện sheet chưa có Data Validation hiện ngay trên màn chiếu. Ghi chú nói tới hậu quả khi sắp ngày lưu thành chữ. |
| 9 · MDX:200 | “Mô phỏng Object Explorer” — **Giữ được** | Đọc phần trong ngoặc để làm gì? Hai nhãn kiểu/NULL đủ nhỏ để đọc lần lượt; `decimal(18,0)` được giải thích tại chỗ. Ghi chú phân biệt NULL với số 0, NOT NULL với dữ liệu đã nhập đầy đủ và giải thích ngày kết thúc để NULL trong bộ mẫu. |
| 10 · MDX:222 | “Lưu được chưa chắc đúng ý người nhập” — **Giữ được** | Vì sao ngày hợp lệ vẫn sai? Ba dòng tách giữ nghĩa/đổi nghĩa/không chuyển được; `us_english`, `DATEFORMAT mdy` và cách đọc tháng trước ngày sau đều hiện cùng ví dụ. Ghi chú gọi đúng chuyển kiểu ngầm và đề xuất thống nhất cách gửi dữ liệu. |
| 11 · MDX:244 | “Vì sao dùng kiểu chuỗi thay vì kiểu số?” — **Giữ được** | Hình dạng chữ số có quyết định kiểu không? Câu hỏi ôn đúng phần chọn kiểu của bài 1.3. Riêng slide 8–10 chưa dạy lý do giữ số 0 đầu; không lấy lời giải slide 11 làm tiền đề. Việc dựa vào bài 1.3 phù hợp đối tượng đã duyệt. |
| 12 · MDX:266 | “Khi NhanVien.MaNV được khai báo” — **Giữ được** | Cột tên mã có tự cấm trùng không? Điều kiện khai báo hiện rõ, bảng mô tả luật chứ không giả kết quả chạy thêm dữ liệu. Chú thích và ghi chú phân biệt duy nhất mã dòng với duy nhất người. |
| 13 · MDX:288 | “Ở thiết kế này, MaPB không nhận NULL” — **Giữ được** | FK kiểm gì, có cấm lặp không? Sơ đồ gắn FK/PK đúng cặp cột, ví dụ mã có/không có và câu nhiều hồ sơ cùng mã phòng giải thích giới hạn. Ghi chú nói đây là luật khi ghi, không phải ô chọn; không suy mọi FK đều bắt buộc vì có ví dụ `MaQuanLy` nhận NULL. |
| 14 · MDX:309 | “Cả hai mã đều có trong danh mục” — **Giữ được** | Vì sao database không phát hiện sai phòng? Đề đặt giả định rõ, đủ áp hai luật đã ôn. Lời giải yêu cầu đối chiếu nguồn nghiệp vụ thay vì hứa PK/FK biết phòng thực tế; không biến giả định thành dữ liệu vừa bị thay đổi. |
| 15 · MDX:331 | “đường thể hiện khóa ngoại đã khai báo” — **Giữ được** | Một–nhiều có bắt phòng nào cũng có người? Chú thích trả lời ngay; ghi chú tách phía một–nhiều khỏi khả năng NULL và chỉ rõ chiều tham chiếu. Không có đường trực tiếp chưa đủ kết luận không liên quan được giữ trong lời giảng. |
| 16 · MDX:352 | “Tên phòng theo MaPB hiện lưu” — **Giữ được** | Dò bằng gì, có phải phòng quá khứ không? Hai bảng đánh dấu đúng cặp `MaPB`, đường giá trị `NV001` → `KT` → `Kế toán` tự theo được. Ghi chú giải thích khóa duy nhất và không NULL để kết luận một phòng trong thiết kế này. |
| 17 · MDX:377 | “Một hồ sơ × ba hợp đồng” — **Giữ được** | Thấy ba dòng có phải ba người hoặc ba hồ sơ nguồn? Nhãn “Minh họa”, “chỉ trích mã và họ tên” và câu mỗi dòng theo một hợp đồng đặt đủ phạm vi trên màn chiếu. Ghi chú phân biệt nguồn với kết quả, không cần biết JOIN để trả lời vì sao lặp. |
| 18 · MDX:399 | “là cả cặp (KyLuong, MaNV)” — **Giữ được** | Nhãn PK ở hai cột có nghĩa từng cột đều duy nhất không? Câu cả cặp và “tối đa” chặn hiểu sai; ghi chú giải thích từng cột có thể lặp. Đường ba bảng có đủ cặp cột, và điều kiện phòng hiện lưu hiện ngay cùng hình. |
| 19 · MDX:421 | “Tìm tên phòng hiện lưu cho từng hợp đồng.” — **Giữ được** | Đi qua đâu, mỗi dòng đại diện cho gì? Câu rút vẫn xác định bảng bắt đầu và phòng hiện lưu; lời nhắc yêu cầu đường đi, hai cặp cột và ý nghĩa dòng. Ẩn đường liên kết để lớp tự đọc cột không lấy mất kiến thức đã dạy ở slide 13–18/bài 1.5. |
| 20 · MDX:448 | “Nguồn… Dòng… Kiểu… Khóa… Đường liên kết” — **Giữ được** | Sau buổi cần tự hỏi điều gì? Năm điểm phủ đúng mục tiêu và mạch 1.1–1.5; có dẫn sang 2.1, không yêu cầu học thuộc mọi kiểu/câu lệnh. Nhắc lại ở đây phục vụ ôn tập, không phải phần lặp cần cắt. |

Không thấy đoạn cần cắt vì dài dòng hoặc thuật ngữ mới buộc phải học thêm trước khi hiểu bài. Những chỗ đi sâu hơn như cú pháp kết bảng, khai báo luật, hàm chuyển đổi được giữ ở liên kết/ghi chú; chúng không phải điều kiện làm bốn câu hỏi.

## Tiền đề của bốn câu hỏi

| Câu hỏi | Kiến thức cần để tự trả lời | Đã được dạy trước khi mở lời giải | Còn thiếu / kết luận |
|---|---|---|---|
| Slide 4 · SSMS và file xuất | Phân biệt công cụ với nơi lưu dữ liệu; file xuất là bản sao tại thời điểm lấy, không tự cập nhật nguồn. | Bài 1.1, phần “SSMS là công cụ…” và “Hay nhầm” về sửa file xuất; slide 2–3 nhắc nguồn chung và vai trò SSMS/SQL Server. | Không thiếu cho người đã học 1.1. Phần bản sao dựa vào bài nguồn, không suy từ riêng hình slide 3 và không lấy lời giải làm lời giảng trước đề. |
| Slide 11 · CCCD | Chuỗi có thể chứa toàn chữ số; phân biệt mã định danh với đại lượng tính toán; cần giữ số 0 đầu; nhận ra `varchar` là kiểu chuỗi. | Bài 1.3, bảng kiểu thường gặp và phần “Chọn kiểu theo ý nghĩa của dữ liệu”; slide 8–10 nhắc nguyên tắc kiểu/ý nghĩa nhưng không dạy lại đủ chi tiết này. | Không thiếu với đối tượng ôn tập. Nếu dùng như buổi nhập môn chưa học bài 1.3 thì câu này thiếu tiền đề; đó là phạm vi khác với bộ được duyệt. |
| Slide 14 · mã phòng có thật nhưng sai | PK kiểm mã dòng duy nhất; FK kiểm mã tham chiếu có thật; hợp lệ không đồng nghĩa đúng nghiệp vụ. | Bài 1.1 phần nguồn chung vẫn cần kiểm; bài 1.4 phần hai loại khóa/Hay nhầm; slide 2, 12–13. Đề tự cho biết cả hai mã tồn tại và chỉ giả sử ghi nhầm phòng. | Không thiếu. Không cần biết câu lệnh sửa, luật khác hay thực hành ghi dữ liệu. |
| Slide 19 · hợp đồng kèm tên phòng | Đọc PK/FK; dò theo cặp mã; đi qua hai chặng; phân biệt hợp đồng với hồ sơ; phòng hiện lưu khác phòng lịch sử. | Bài 1.2 về `HopDong`/`MaNV`; bài 1.4 về khóa; phần chính bài 1.5 về đường liên kết, một–nhiều và lương qua ba bảng; slide 7, 13, 15–18. Không dùng câu tự kiểm tra cuối bài 1.5 làm phần dạy bù. | Không thiếu. Có thể chuyển cách dò đường ba bảng đã học sang hợp đồng; không đòi biết cú pháp JOIN. Các cột cần chọn vẫn hiện khi lời giải đóng. |

## Component và HTML tĩnh

- **Giữ được — `Slide.astro`:** tiêu đề, ID và liên kết bài nguồn gắn theo từng slide; HTML hiện tại có đủ 20 mục với thứ tự/metadata khớp MDX. Liên kết nguồn giúp quay lại phần giảng đầy đủ, phù hợp buổi ôn.
- **Giữ được — `PresenterNotes.astro`:** chỉ render ghi chú trong mode người giảng. HTML trang lớp có 0 khối ghi chú và 0 nhãn “Ý cần nói”; trang người giảng có đủ 20 khối/20 nhãn. Đây là đối chiếu HTML thực đọc, không khẳng định về đồng bộ cửa sổ.
- **Giữ được — `ProjectionTable.astro`:** có kiểm số ô theo số cột, caption phân biệt trích/minh họa và NULL hiện bằng nhãn riêng. Ở slide 5, chỉ số `markRow={1}` chọn đúng dòng `NV005`, `markColumn={1}` chọn `HoTen`; chưa xác minh màu thực tế khi trình chiếu.
- **Giữ được — `ProjectionRelation.astro`:** cặp cột và nhãn PK/FK trong HTML khớp các đường đang giảng ở bài 1.5; hướng `NhanVien` → `PhongBan` nhất quán khi đổi thứ tự hai hộp. Slide 19 không render các đường/lời chú thích liên kết trước lời giải. Chỉ đọc component và đầu ra HTML, không kiểm lại schema từ seed.
- Hai HTML đều có đúng bốn `details data-answer`, không có thuộc tính `open`. Đã đối chiếu nội dung đề/lời giải và các điều kiện ngày/phòng/đơn vị dòng với nguồn. Không lộ backtick hoặc escape trong phần chữ đã trích đọc. Sự hiện diện của `details` không chứng minh controller mở lời giải theo bước hoặc bản không JavaScript hiển thị đúng toàn bộ trang.

## Ưu tiên và giới hạn

Không có mục **Cần sửa / Cần làm rõ / Cần cắt** được xác lập qua lượt học thử này. Không đề nghị thêm nội dung chỉ để biến slide thành bài tự học đầy đủ. Cần giữ đối tượng “đã học 1.1–1.5”, vì câu 4 và nhất là câu 11 sử dụng kiến thức của bài nguồn thay vì giảng lại hết trước đề.

Chưa xác minh: dữ liệu/luật trên database đang chạy, hành vi chuyển kiểu thực tế, truy vấn/số dòng live; khả năng đọc khi chiếu thật, tràn chữ, màu, viewport, bàn phím, focus, fullscreen, đồng bộ hai cửa sổ, tải lại, mở đáp án theo bước và chế độ không JavaScript. Không có kết quả test/build do reviewer thực hiện. Các phần này cần bằng chứng kiểm kỹ thuật/giao diện riêng; kết luận nội dung trên không thay thế chúng và không phải quyền push/deploy.
