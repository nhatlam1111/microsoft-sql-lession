# Review độc lập bài 2.8 — Hàm ngày

- Ngày review: 25/10/2026.
- Vai trò: Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học thử chỉ từ bài này và các bài trước liên quan.
- Công cụ/model: Codex; kế thừa model của phiên, không đổi hoặc chỉ định model khác.
- Phạm vi sản phẩm: `src/content/lessons/2-8-ham-ngay-tham-nien.mdx` và `src/content/exercises/2-8-ham-ngay-tham-nien.yaml`.
- Cách kiểm: đọc đầy đủ nguồn MDX/YAML và đối chiếu HTML build của đúng bài. Không sửa file sản phẩm.

Qua đọc tĩnh, chưa thấy lỗi nội dung hoặc lệch đề/đáp án ở mức cần chặn bài. Có hai điểm nhỏ nên biên tập để người mới đọc liền mạch hơn. Các kết quả phụ thuộc database chưa được kiểm độc lập bằng thực thi.

## Rà theo thứ tự bài

### 1. Tình huống và phạm vi — Giữ được

**Câu gốc:** “Đây là khoảng cách `30` ngày giữa hai mốc, có `31` ngày lịch khi tính cả hai đầu.” (MDX:24)

Phạm vi toàn bộ `HopDong`, mỗi dòng là một hợp đồng, mốc cố định và việc lấy cả hai đầu đều được chốt trước khi vào hàm. Nội dung khớp mục 7 của hồ sơ công ty. Yêu cầu sắp ngày tăng dần rồi mã hợp đồng tăng dần cũng được phản ánh ở câu lệnh.

**Tự hỏi:** “Sau 30 ngày có phải lấy đúng 30 ngày lịch, và có loại hợp đồng lịch sử không?” — **Đã trả lời:** có 31 ngày lịch khi lấy cả hai đầu; hợp đồng lịch sử vẫn được xét theo ngày kết thúc đã lưu. Không cần thêm một đoạn rào đón.

### 2. Công thức trong hình Excel — Cần làm rõ, P3

**Câu gốc:** “công thức ở `C2` dùng ngày chốt của tình huống”; công thức hiển thị `=B2-DATE(2026,10,21)`. (MDX:32–34)

`DATE` xuất hiện lần đầu trong các bài liên quan đã đọc nhưng chưa được giải nghĩa. Người chưa biết hàm Excel vẫn hiểu việc lấy hai ngày trừ nhau, song phải tự suy ra ba số trong `DATE(...)` là gì và tại sao đây là ngày thật chứ không phải một chuỗi chữ. Đây là điểm nhỏ trong hình Excel, không làm thiếu kiến thức viết ba bài SQL.

**Tự hỏi:** “`DATE(2026,10,21)` làm gì, thứ tự ba số là gì?” — **Chưa trả lời trực tiếp.**

**Đề xuất ngắn:** thay vế cuối bằng “`DATE(2026,10,21)` tạo ngày chốt 21/10/2026 từ năm, tháng, ngày”. Không cần thêm ví dụ hoặc bảng hàm Excel.

### 3. CAST, GETDATE, DATEADD và hai đầu bộ lọc — Giữ được

**Câu gốc:** “`GETDATE()` lấy ngày giờ máy chủ, không lấy đồng hồ máy bạn”; “Trong bảng này `NgayKetThuc` có kiểu `date`, nên không có phần giờ cần xét thêm.” (MDX:43, 53)

Chuyển từ Excel sang SQL rõ. `CAST` được giải thích tại lần đầu dùng; chuỗi tám chữ số nối được với bài 2.2. `DATEADD` có thứ tự đầu vào, đơn vị không đặt trong nháy, số âm và ví dụ cụ thể. Phần cột có giờ trả lời đúng lời hẹn của bài 2.2/2.3, chỉ dài một đoạn và không kéo bài sang thiết kế kiểu ngày giờ.

**Tự hỏi:** “Vì sao không lấy luôn ngày hiện tại?” — **Đã trả lời:** báo cáo cần mốc cố định để chạy lại không đổi khoảng; đồng hồ máy chủ có thể khác ngày Việt Nam.

**Tự hỏi:** “Vì sao không cộng một tháng, và vì sao dùng `<=` ở đây nhưng `<` cho cột có giờ?” — **Đã trả lời:** tháng dài ngắn khác nhau; cột `date` không có giờ, còn mốc đầu ngày kế tiếp bao được mọi giờ của ngày cuối.

### 4. DATEDIFF, thâm niên, MONTH và EOMONTH — Giữ được

**Câu gốc:** “Từ `2026-09-30` tới `2026-10-01` chỉ cách một ngày nhưng `DATEDIFF(month, ...)` là `1`”; “`MocHaiNam` là `2026-11-15`, sau ngày chốt `2026-10-21`, nên `NV036` chưa đủ hai năm.” (MDX:59, 84)

“Ranh giới” được gắn ngay với hai ngày nhìn thấy được, rồi đối chiếu với ngày kỷ niệm thật. Người học không phải tự suy ra vì sao `2` chưa có nghĩa đủ hai năm. Đoạn sau giới hạn đúng trường hợp hai giá trị `date` khi dùng `DATEDIFF(day, ...)`, đồng thời giải thích kết quả bằng 0 và số âm.

Bảng `MONTH`/`EOMONTH` cho cú pháp, giá trị đối chiếu và mục đích đủ để vận dụng với `WHERE` đã học. Không cần chép nguyên một câu giải bài tập. `NULL` nối được với bài 2.5; hợp đồng ngày sai được gọi đúng là lỗi cài sẵn, không được coi là một khoảng hợp lệ hoặc tự sửa nguồn.

**Tự hỏi:** “Tại sao đếm ranh giới năm không đủ để xét thâm niên?” — **Đã trả lời** bằng `NV036` và mốc `2026-11-15`.

**Tự hỏi:** “Tìm cùng tháng sinh có nghĩa sinh nhật đã tới chưa?” — **Đã trả lời:** chỉ so tháng, không xét năm sinh hoặc sinh nhật đã qua.

**Tự hỏi:** “Hợp đồng không có ngày kết thúc sẽ đi đâu?” — **Đã trả lời:** `NULL` không qua phép so sánh khoảng ngày; ý nghĩa không xác định thời hạn là quy ước bộ mẫu.

### 5. Alias ở các câu ví dụ và câu chính — Biên tập, P3

**Câu gốc:** `AS MocSau30Ngay`, `AS SoRanhGioiNam`, `AS MocHaiNam`, `AS SoNgayConLai`. (MDX:47, 64–65, 102; lặp lại trong `RunFlow`)

Bài 2.1 đã nói “Khóa học dùng ngoặc cho mọi alias để thống nhất”, nhưng các alias trong bài này không có ngoặc vuông. Đây không phải kết luận SQL sai; đó là lệch quy ước đã dạy, có thể khiến người mới không rõ lời dặn trước còn áp dụng hay không.

**Tự hỏi:** “Đã được dặn mọi alias dùng `[]`, vì sao ví dụ mới lại bỏ?” — **Chưa được giải thích.**

**Đề xuất ngắn:** thống nhất alias trong MDX và các bản câu lệnh tương ứng của sơ đồ với quy ước bài 2.1. Không cần thêm lý thuyết alias hoặc thay đề/đáp án YAML vì điểm này.

### 6. Câu lệnh, kết quả và lời trả lời — Giữ được

**Câu gốc:** “Đây là danh sách hợp đồng để rà, không phải số nhân viên cần gia hạn.” (MDX:144)

Câu chính giữ đúng hai mốc, đúng năm cột và tiêu chí sắp xếp. Ba dòng kết quả, thứ tự mã và số ngày còn lại khớp giữa hình Excel, `Result`, lời trả lời và hồ sơ công ty. Việc đánh dấu cả ba dòng được giải thích ngay cạnh hình. Tình huống được khép lại trong phần chính; giới hạn nghiệp vụ ngắn và cần thiết vì yêu cầu là rà hợp đồng.

**Tự hỏi:** “Có ba dòng thì đã kết luận ba người phải gia hạn được chưa?” — **Đã trả lời:** chưa chọn hợp đồng cuối của mỗi người và chưa có quyết định nghiệp vụ.

### 7. RunFlow — Giữ được

**Câu gốc:** “Hai bước đầu chỉ trích các cột mã/ngày phục vụ đối chiếu; bước `SELECT` thêm cột tính số ngày.” (MDX:148)

Sơ đồ nói rõ thứ tự logic và phạm vi cột trích. Mỗi `detail` bắt đầu từ từ khóa, phân biệt nguồn 55 dòng, sau lọc 3 dòng, thêm cột rồi sắp xếp. `query`, `focus` và các câu kiểm bước khớp nhau qua đọc nguồn; ba dòng được giữ và thứ tự sau sắp xếp nhất quán. Những bước chưa `ORDER BY` có lời nhắc thứ tự chưa được bảo đảm.

**Tự hỏi:** “Bốn cột ở bước nguồn có nghĩa bảng chỉ có bốn cột không, và sơ đồ có mô tả cách quét thật không?” — **Đã trả lời:** đây là cột trích để đối chiếu; sơ đồ là thứ tự logic.

Trong HTML build, các khối SQL có tab thật, không còn ký tự literal `\\t`; stylesheet đi kèm có `--sql-tab-size: 4`. Các đoạn query được bọc highlight có phần tử dạng `display:block`, nên không lấy văn bản đã loại tag làm căn cứ kết luận mất xuống dòng. Chưa kiểm hiển thị hoặc copy/dán bằng trình duyệt.

### 8. Hay nhầm, Ứng dụng, Ghi nhớ và tự kiểm tra — Giữ được

**Câu gốc:** “Dùng ngày giờ hiện tại cho báo cáo cần lặp lại”; “Kiểm mốc thâm niên: tạo ngày kỷ niệm bằng `DATEADD` rồi so với ngày báo cáo”. (MDX:Hay nhầm 2; 369)

Bốn lỗi có hậu quả cụ thể. Ba ứng dụng đúng chủ đề hàm ngày và không hứa tự quyết định gia hạn. Khái niệm mới được in đậm có chọn lọc; các tên bảng/cột và dẫn chứng chính dùng code. `Memo` ôn đúng các nhịp học. Ba câu tự kiểm tra nằm sau Ghi nhớ, trước Bài tập và bao phủ khoảng ngày, ranh giới/thâm niên, tháng sinh/cuối tháng; đáp án không dạy thêm phần còn thiếu.

**Tự hỏi:** “Học xong áp dụng vào việc gì và tự kiểm được những mục tiêu nào?” — **Đã trả lời** bằng ba ứng dụng và ba câu ôn.

Với phạm vi nhiều hàm và ba bài vận dụng, thời lượng 28 phút hợp lý hơn việc ép về thời lượng bài khái niệm ngắn. Chưa thấy đoạn lặp cần cắt rõ ràng; không đề nghị tách bài hoặc thêm mục riêng.

### 9. Ba bài tập và YAML — Giữ được qua đối chiếu tĩnh

- **2-8-1:** đề chốt mọi hồ sơ, chỉ so tháng, không tự thêm năm/trạng thái; đáp án kết hợp `DATEADD(month, 1, ...)` với `MONTH`, đúng ba cột và `MaNV ASC`. Kiến thức hàm hiện tại cộng với phép so sánh/`WHERE` bài 2.2 đủ để làm.
- **2-8-2:** đề phân biệt chưa vào làm, chưa đủ một năm và đạt đúng mốc. Đáp án có đủ ba điều kiện tương ứng; mốc kỷ niệm đã được giải thích trong phần chính, `AND` và thứ tự nhiều cột đã có ở bài 2.3/2.4.
- **2-8-3:** đề nói rõ bỏ ngày chốt, lấy cuối tháng, không thêm điều kiện loại hợp đồng/nhân viên. Đáp án dùng `>` và `<= EOMONTH(...)`, tính `DATEDIFF(day, ...)`, đúng vị trí bốn cột và hai tiêu chí sắp xếp.

Cả ba đặt `ordered: true`, thống nhất lời dẫn bài tập về việc chấm thứ tự dòng. Không thấy câu ví dụ trong MDX trùng nguyên đáp án của một bài. Không đề nghị đổi 54 bài tập/đáp án đã chốt.

**Tự hỏi:** “Có kiến thức mới nào bị giấu đến phần đề/đáp án khiến chưa thể làm bài không?” — **Chưa thấy:** ba đề đều vận dụng khái niệm đã có; độ khó đến từ kết hợp, không cần kiến thức bài sau. Số dòng và giá trị thực tế do các đáp án trả về vẫn **chưa xác minh bằng chạy SQL**.

## Ưu tiên xử lý

1. **P3 — Giải nghĩa `DATE(...)` bằng một vế ngay cạnh hình Excel**, thay vế chung đang có.
2. **P3 — Thống nhất cách viết alias với quy ước bài 2.1** trong nội dung MDX/sơ đồ. Không phải lỗi cú pháp hay sai dữ liệu.

Không có finding P1/P2 từ phạm vi đọc tĩnh của lượt này.

## Nguồn đối chiếu

- `temp/review/2026-10-24-student-update/brief.md` và `AGENTS.md`.
- `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`.
- Mẫu `src/content/lessons/1-1-database-la-gi.mdx`.
- Các bài trước liên quan đã đọc: 1.3, 1.5, 1.6, 2.1, 2.2, 2.3, 2.4, 2.5, 2.7.
- Toàn bộ MDX/YAML bài 2.8; `dist/bai/2-8-ham-ngay-tham-nien/index.html` và stylesheet được HTML đó tham chiếu, chỉ để đối chiếu định dạng tĩnh. HTML có thời điểm ghi 24/10/2026 20:43:18, sau MDX 20:31:52.

## Giới hạn thực tế

- Không đọc script database, `.env`, secret, báo cáo học viên gốc, ma trận tác giả, review cũ hoặc review của người khác.
- Không kết nối database, không chạy SQL, không chạy kiểm bài tập/API hoặc bộ test có thể truy cập database. Các con số 55/3, từng dòng kết quả, ngày sinh `NV036` và phát biểu runtime nguồn Azure dùng UTC chưa được reviewer xác minh độc lập; chỉ ghi nhận sự nhất quán giữa nguồn bài và tài liệu được phép đọc.
- Chỉ kiểm HTML/CSS tĩnh, chưa mở bản build trong trình duyệt, chưa bấm drawer hay kiểm nút Sao chép/dán vào editor; không kết luận tương tác hoặc SQL live đã đạt.
- Chỉ tạo báo cáo này; không sửa sản phẩm, test, docs, spec/plan hoặc commit.
