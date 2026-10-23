# Bài 3.1–3.3: từ tổng hợp đến lọc nhóm

- Ngày: 23/10/2026.
- Trạng thái: người làm khóa học duyệt ngày 23/10/2026; đã soạn và review cả ba bài. Lượt hoàn thiện sau đó đã kiểm SQL Server live và browser; yêu cầu đưa vào main được ghi ở cuối tài liệu.
- Yêu cầu: tiếp tục bài 3.1–3.3 theo quy ước hiện hành; giữ cách tách mỗi bài một branch của lượt trước.
- Gốc: `main` tại `0f1963af2248ffe11728fffea89776ef314cdaed`, đã gồm các sửa sau review phần 2.
- Tài liệu chi phối: [quy ước](../../quy-uoc.md), [khung bài](../../lesson-template.md), [hồ sơ công ty](../../ho-so-cong-ty.md), bài 1.1 đã duyệt và spec bài đầy đủ đợt 2. Quy ước mới hơn thay các chỉ dẫn bố cục cũ.

## Mục đích và phạm vi

Chuyển đúng ba bản tóm tắt hiện có thành bài đầy đủ, giúp người học đi từ một kết quả tổng hợp cho cả phạm vi dữ liệu, tới một kết quả cho mỗi nhóm, rồi lọc các nhóm theo số liệu đã tính. Giữ tiêu đề và vị trí trong lộ trình; ví dụ dùng hồ sơ nhân viên và đơn nghỉ phép. Các lựa chọn tình huống, bài tập và thời lượng dưới đây là đề xuất của người viết.

Đây là phần tiếp nối nội dung theo mẫu đã có, không thiết kế lại sản phẩm. Mỗi bài có sáu mục cấp hai theo khung hiện hành; Excel và SQL nằm trong cùng phần chính, khoảng 2–4 tiểu mục. Giải tình huống ngay cạnh kết quả, dùng RunFlow để giải thích thứ tự logic; cuối bài có ba bài tập riêng.

## Cách thực hiện

Áp dụng trực tiếp bộ khối MDX, RunFlow và bộ chấm đang có. Đây là cách phù hợp với yêu cầu “theo quy ước”: giữ mạch đã duyệt và chỉ bổ sung nội dung cần học. Viết lại giao diện hoặc làm bộ mô phỏng SQL riêng sẽ mở phạm vi ngoài yêu cầu; giữ bản tóm tắt thì chưa đáp ứng việc viết bài đầy đủ. Không có lựa chọn nền tảng mới cần người làm khóa học quyết định.

Không thay UI, API, schema nội dung, bộ chấm, dữ liệu mẫu hoặc các bài ngoài phạm vi. Không dạy trước kết bảng, truy vấn con, hàm cửa sổ hay đếm có điều kiện bằng CASE. Không cam kết chạy nhanh hơn chỉ dựa vào vị trí WHERE/HAVING.

## Khung ba bài

| Bài | Tình huống đề xuất | Kiến thức và giới hạn |
|---|---|---|
| 3.1 — COUNT, SUM, AVG, MIN, MAX | Chị Hạnh cần số đơn đã duyệt có ngày bắt đầu trong tháng 9/2026, tổng số ngày, bình quân số ngày mỗi đơn, số ngày ít nhất và nhiều nhất. | Mỗi dòng của DonNghiPhep là một đơn; SoNgay là số ngày lưu trên đơn, không tự phân bổ ngày nghỉ theo tháng. Hàm tổng hợp cho một dòng khi không GROUP BY. Phân biệt COUNT(*) và COUNT(Email) bằng NhanVien; NULL khác số 0, chuỗi rỗng. SUM/AVG/MIN/MAX bỏ NULL; tập rỗng trả COUNT = 0, các hàm còn lại = NULL. AVG dùng cột decimal để giữ phần lẻ; chỉ nêu giới hạn của đầu vào số nguyên khi cần. |
| 3.2 — GROUP BY: PivotTable bằng SQL | Chị Hạnh cần số hồ sơ đang làm theo mã phòng đang lưu; phòng đông nhất lên đầu, cùng số lượng thì mã phòng tăng dần. | Từ PivotTable Rows/Values sang khóa nhóm và hàm tổng hợp; mỗi tổ hợp khóa tạo một dòng. Cột thường trong SELECT phải thuộc khóa nhóm. Minh họa nhóm nhiều cột bằng MaPB và TrangThai. GROUP BY không tự sắp xếp, không tạo dòng cho phòng không có hồ sơ phù hợp, không xác nhận phòng ở thời điểm quá khứ. |
| 3.3 — HAVING: lọc sau khi gộp | Từ cùng phạm vi hồ sơ đang làm, chị Hạnh chỉ cần các phòng có trên 10 hồ sơ. | WHERE lọc dòng trước GROUP BY; HAVING lọc nhóm theo COUNT sau GROUP BY. So sánh với Value Filters trong PivotTable. Ngưỡng “trên 10” là > 10. Alias tạo ở SELECT chưa dùng được trong HAVING; dùng lại biểu thức tổng hợp. Điều kiện lọc dòng đặt ở WHERE theo ý nghĩa báo cáo. |

Thời điểm câu chuyện vẫn là tháng 10/2026. Dữ liệu NhanVien được coi là ảnh chụp hiện tại; không suy ngược số người của một phòng ở tháng trước. Ví dụ đơn nghỉ tháng 9 lọc theo TuNgay, không gọi kết quả là tổng số ngày thực nghỉ trong tháng, vì có đơn bắt đầu từ tháng 8 và kéo sang tháng 9.

Mục tiêu thời lượng: 3.1 khoảng 20–25 phút, 3.2 khoảng 20 phút, 3.3 khoảng 15–20 phút, gồm bài tập; điều chỉnh theo bản viết thực tế. Phần lý thuyết luôn hiển thị, không giấu sau khối mở để giảm độ dài bề ngoài.

## Bài tập đề xuất

| Bài | Ba bài tập, độc lập với câu minh họa nguyên vẹn |
|---|---|
| 3.1 | (1) Đếm hồ sơ đang làm và số Email khác NULL. (2) Tính đủ năm hàm trên đơn đã duyệt bắt đầu trong tháng 8/2026. (3) Tổng hợp phạm vi không có đơn để nhận đúng COUNT = 0 và NULL của SQL. |
| 3.2 | (1) Đếm hồ sơ đang làm theo chức danh. (2) Đếm toàn bộ hồ sơ theo cặp phòng/trạng thái. (3) Đếm đơn và cộng SoNgay của đơn đã duyệt theo loại nghỉ. |
| 3.3 | (1) Lọc nhóm phòng theo khoảng số hồ sơ đang làm. (2) Lọc loại nghỉ theo tổng SoNgay trên phạm vi đơn đã duyệt được chỉ rõ. (3) Lọc cặp phòng/chức danh có từ ba hồ sơ đang làm. |

Đề nói rõ phạm vi, thứ tự cột, điều kiện biên và thứ tự dòng khi có nhiều nhóm. Bộ chấm vẫn so kết quả, không chấm alias hoặc bắt buộc một cú pháp; yêu cầu tự đối chiếu cú pháp nếu cần nói rõ trong bài. Chọn dữ liệu/điều kiện để những lỗi thông thường như bỏ WHERE, dùng COUNT(Email) thay COUNT(*), nhầm > với >= hay thiếu khóa nhóm cho kết quả khác.

## Branch và tài liệu đi kèm

Các branch nối tiếp để 3.2 có bài tiên quyết 3.1, và 3.3 có đủ hai bài trước:

1. `codex/lesson-3-1-full`, từ main mới nhất nêu trên.
2. `codex/lesson-3-2-full`, từ bản hoàn tất 3.1.
3. `codex/lesson-3-3-full`, từ bản hoàn tất 3.2.

Mỗi branch bổ sung đúng bài, YAML bài tập, kiểm tra có ý nghĩa và cập nhật catalog/README/hồ sơ công ty/spec/plan tương ứng. Mỗi bài có một review độc lập bằng agent mới theo đúng mục 4.5 của quy ước. Người viết đọc hết review, kiểm từng nhận xét rồi ghi “Đã sửa” và “Không làm theo” kèm lý do. Không push hoặc đăng lên main ở bước soạn bài này.

## Kiểm tra và điều kiện bàn giao

Trước khi điền kết quả, kiểm câu SQL, tập dòng và từng bước RunFlow. Chạy bộ kiểm tra web và API theo mục 4.4; kiểm đáp án không lọt vào bản web và câu minh họa không nộp nguyên vẹn được cho bài tập. Không nới các kiểm tra hiện có để bỏ qua lỗi.

Phiên hiện chưa có công cụ SQL trực tiếp hoặc cấu hình kết nối database, nên chưa thể chứng nhận số liệu bằng SQL Server. Kiểm từ script và tài liệu Microsoft chỉ là căn cứ bổ sung; ghi riêng phần chưa chạy live, không gọi là kiểm chứng trên database thật. Việc kiểm trình duyệt phụ thuộc môi trường khả dụng; phân biệt kiểm HTML với kiểm tương tác. Mật khẩu và mã truy cập không được in hoặc commit.

Sau khi người làm khóa học duyệt tài liệu này, lập kế hoạch triển khai rồi viết lần lượt ba bài. Nếu gặp giới hạn công cụ, hoàn tất phần có thể làm và bàn giao rõ phần còn thiếu; không ghi trạng thái đạt cho bước chưa thực hiện.

## Nhật ký triển khai 3.1

Bản nháp dùng COUNT/SUM/AVG/MIN/MAX, CAST kết quả bình quân sang decimal(10,2) để hiện 1.78, và flow 20 → 9 → 1. Ba bài tập lần lượt kiểm 45/43 hồ sơ/email, 5 đơn tháng 8 tổng 14 ngày, phạm vi tháng 11 không có đơn nhưng phép tổng hợp vẫn trả một dòng. Đây là đối chiếu nguồn script, chưa phải thực thi SQL Server. Các literal decimal giữ số lẻ như SSMS; không thay dữ liệu mẫu.

Tài liệu Microsoft đã đọc ngày 23/10/2026: [Aggregate functions](https://learn.microsoft.com/en-us/sql/t-sql/functions/aggregate-functions-transact-sql?view=sql-server-ver16), [COUNT](https://learn.microsoft.com/en-us/sql/t-sql/functions/count-transact-sql?view=sql-server-ver16), [AVG](https://learn.microsoft.com/en-us/sql/t-sql/functions/avg-transact-sql?view=sql-server-ver16), [CAST/CONVERT](https://learn.microsoft.com/en-us/sql/t-sql/functions/cast-and-convert-transact-sql?view=sql-server-ver16), [GROUP BY](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql?view=sql-server-ver16), [HAVING](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-having-transact-sql?view=sql-server-ver16), [thứ tự SELECT logic](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql?view=sql-server-ver16). Tài liệu là căn cứ ngữ nghĩa, không phải chứng cứ đã chạy câu trong bài trên database khóa học.

### Review 3.1 và bản bàn giao local

Review độc lập: [bản đầy đủ](../../reviews/2026-10-23-bai-3-1.md), Codex kế thừa model phiên, agent mới không có ngữ cảnh tác giả. Lượt bị ngắt do capacity được tiếp tục bằng chính agent đó; không đổi model hoặc tạo reviewer thay thế. Tác giả đọc toàn bộ report trước khi sửa.

**Đã sửa:** mục 3–5 làm rõ vùng Excel đã tách, caption đánh dấu và lần đầu nhắc GROUP BY; mục 8 cắt câu nhắc lại đơn/người; mục 14 dùng ngoặc vuông cho mọi định nghĩa alias theo bài 2.1; mục 15 highlight số dẫn chứng trong drawer; mục 16 thống nhất COUNTA đếm mã, các hàm còn lại tính cột số ngày; mục 17 đổi “sẽ” thành “có thể” vì dữ liệu mẫu hiện mỗi người một đơn; mục 22 thay một câu tự kiểm tra bằng ví dụ minh họa 2/NULL/0 để phủ cả COUNT và AVG. Các mục Giữ được được đối chiếu với seed và nguồn Microsoft. Đọc thêm [COUNTA](https://support.microsoft.com/en-us/excel/functions/counta-function) và [SUBTOTAL](https://support.microsoft.com/en-us/excel/functions/subtotal-function) để xác nhận liên hệ Excel.

**Không làm theo:** không có đề xuất sửa nội dung nào trong report bị loại; các đề nghị giữ phạm vi/không dạy sâu hơn được giữ nguyên. Không biến phép cộng nội bộ của reviewer thành xác nhận đã chạy SQL Server.

**Kiểm cuối 3.1:** 261/261 test, 36 file; Astro check 0 lỗi/0 warning, 3 hint nền; build 93 trang; check-dist OK 93 trang/1.591 link; API build 39 bài tập, typecheck đạt. Kiểm nguồn độc lập 88 ô và ba answer qua SQLite có chuyển N-prefix, literal ngày, CAST kết quả AVG sang ROUND; chỉ là kiểm fixture, không phải T-SQL live. HTML tĩnh khớp sáu mục, ba card/panel, năm bảng Result và ba trang bài tập.

**Còn thiếu:** check:exercises thoát trước khi kết nối với lỗi `SQL_SERVER, SQL_DATABASE, SQL_USER and SQL_PASSWORD must be set.` Không có browser binary để kiểm hình thức, click và bàn phím. Không thay đổi dữ liệu hoặc push/deploy. Trong lúc chờ review đã chuẩn bị test 3.2 (đã thấy RED) và bản nháp trong temp; không đưa chúng vào commit/branch 3.1.

## Nhật ký triển khai 3.2

Branch `codex/lesson-3-2-full` nối từ commit 3.1 `6b8cce1`. Tình huống có 45 hồ sơ đang làm, nhóm theo MaPB thành sáu dòng, xếp số lượng giảm dần/mã tăng dần. Ví dụ hai khóa chỉ lấy KD ở mọi trạng thái, tránh trở thành đáp án nguyên vẹn cho bài tập nhóm toàn bộ phòng/trạng thái. Ba bài tập lần lượt đổi sang MaCD đang làm, tám cặp phòng/trạng thái của toàn bộ hồ sơ, và ba loại nghỉ trên mọi đơn đã duyệt.

Review độc lập: [report 3.2](../../reviews/2026-10-23-bai-3-2.md), agent mới Codex kế thừa model phiên, không đọc seed/fixture/review cũ. Đã đọc toàn bộ trước khi sửa.

**Đã sửa:** mục 2 nói rõ lọc TrangThai ở Filters của PivotTable; mục 3 chú thích cả A2/B2/B8; mục 7 cắt giới hạn quá khứ lặp lại, vẫn giữ giả định đầu bài; mục 8 thay “drawer” bằng thao tác bấm bước để xem; mục 10 thống nhất đơn vị hồ sơ thay vì người; mục 11 highlight số liệu trong lời giải từng bước. Làm rõ goal thành tổng hợp theo một/nhiều cột nhóm. Giữ ví dụ GROUP BY trước SELECT: câu kiểm dùng SELECT riêng để nhìn nhóm, không khẳng định alias của câu gốc có sớm hơn.

**Không làm theo:** không có đề xuất sửa nội dung trong report bị loại; không mở rộng sang tổng cộng nhiều cấp hoặc sửa component để phân biệt hai bảng trung gian giống nhau. Đối chiếu [Field List](https://support.microsoft.com/en-us/excel/get-started/use-the-field-list-to-arrange-fields-in-a-pivottable), [lọc PivotTable](https://support.microsoft.com/en-us/excel/get-started/filter-data-in-a-pivottable) và GROUP BY/SELECT của Microsoft khi xử lý review.

**Kiểm cuối 3.2:** 264/264 test, 37 file; Astro check 0 lỗi/0 warning, 3 hint nền; build 96 trang; check-dist OK 96 trang/1.621 link; API build 42 bài tập và typecheck đạt. Kiểm fixture độc lập qua SQLite cho cả 3.1–3.2: 202 ô Result/RunFlow, sáu answer và kiểm không có query minh họa giải đúng nguyên vẹn bài tập mới. HTML tĩnh khớp sáu mục, năm card/panel, bảy bảng Result và ba trang bài tập của 3.2.

**Còn thiếu:** check:exercises vẫn bị chặn trước kết nối do thiếu SQL_SERVER/DATABASE/USER/PASSWORD; không có xác nhận SQL Server hay kiểm trình duyệt. Không ghi database, không push/deploy. Test 3.3 đã thấy 2 FAIL trên bài/YAML còn thiếu, 1 PASS trên fixture ngưỡng; giữ test và nháp 3.3 trong temp khi chốt branch 3.2.

## Nhật ký triển khai 3.3 và kết quả toàn lượt

Branch `codex/lesson-3-3-full` nối từ commit 3.2 `eaad473`. Bài giữ WHERE và khóa nhóm của 3.2, thêm HAVING COUNT(*) > 10; flow 48 → 45 → 6 → 1 → 1 → 1. Alias SELECT không dùng ở HAVING cùng câu; các câu kiểm trong từng bước là truy vấn SELECT riêng, không mô tả thứ tự vật lý. Ba đề lần lượt kiểm khoảng >5 và <=10, tổng ngày đã duyệt bắt đầu tháng 9 >=5, cặp phòng/chức danh đang làm >=3.

Review học thử độc lập: [report 3.3](../../reviews/2026-10-23-bai-3-3.md), Codex/model kế thừa phiên, không mang ngữ cảnh tác giả, không đọc seed/test/review cũ. Đã đọc toàn bộ report trước khi sửa.

**Đã sửa:** mục 2 chỉ rõ trường Count of MaNV khi lọc Value Filters; mục 4 thêm điều kiện “Nếu không lọc trước theo SoNgay” để ví dụ HAVING không khiến người học tưởng lấy lại các đơn đã bị WHERE loại; mục 10 nói chắc KD vẫn qua ngưỡng với 14 hồ sơ khi bỏ WHERE; mục 13 rút tiêu đề đề hai thành “Loại nghỉ có tổng từ 5 ngày”. Không đổi query, kết quả hay dữ liệu nguồn sau review. README bỏ giới hạn sơ đồ chỉ ở bài 3.5, khớp các sơ đồ mới.

**Không làm theo:** không có đề xuất sửa trong review học thử bị loại; không thêm trường hợp HAVING không GROUP BY hoặc nội dung SQL sâu hơn để làm nặng bài.

### Review kỹ thuật toàn nhánh

[Report tích hợp](../../reviews/2026-10-23-integration-3-1-3-3.md) do một agent mới thực hiện, Codex kế thừa model phiên, độc lập với ba reviewer học thử. Phạm vi từ main 0f1963a qua các commit 3.1/3.2 và toàn bộ working tree 3.3, kể cả YAML/test mới. Không có finding Critical/Important/Minor. Reviewer kiểm thêm 19 câu minh họa của cả ba bài với cả 9 đáp án, 171 cặp trên fixture SQLite có adapter, không có câu minh họa nộp nguyên vẹn nào cho kết quả đúng. Kết luận này không phải kiểm SQL Server live hoặc lệnh cho phép merge/push.

Các mục reviewer chưa phán đoán được tác giả xử lý như sau:

- **SQL live:** giữ trạng thái chưa xác minh driver/metadata/collation và thực thi API; cần môi trường kết nối để chạy trước khi coi đây là kiểm chứng SQL Server. Cái giá nếu fixture lệch engine/database thật là số liệu hoặc chấm bài chưa được phát hiện bằng kiểm nguồn.
- **Browser:** giữ trạng thái chưa kiểm hình thức/click/copy/focus/bàn phím/F5/nộp bài; HTML chỉ xác nhận cấu trúc. Cái giá là lỗi tương tác hoặc bố cục có thể chưa được quan sát, dù không sửa component.
- **Helper fixture:** giữ phạm vi literal INSERT cố định và block MDX đang dùng, không xây parser hay engine tổng quát. Nếu định dạng seed/MDX đổi, helper/test có thể cần cập nhật; không ảnh hưởng logic sản phẩm đang chạy.
- **Bộ chấm:** giữ contract so kết quả, chấp nhận câu tương đương, không thêm kiểm cú pháp hoặc chống mọi đáp án viết cứng. Vì vậy chấm đúng không chứng minh người học đã dùng HAVING; phần Bài tập đã yêu cầu tự đối chiếu.
- **Biên tập/quy trình:** lượt kỹ thuật không thay review học thử. Ba report học thử, phần sửa theo review, tài liệu và commit riêng đều được hoàn tất bởi tác giả trước khi bàn giao; không dùng lời kết luận kỹ thuật để đánh dấu giả các bước còn thiếu môi trường.

### Kiểm bản cuối

- Vitest: **267/267 test, 38 file**. Astro check: **0 lỗi, 0 warning, 3 hint nền**.
- Web: **99 trang**; `check-dist: OK` với **1.651 link**, đủ 9 trang bài tập mới, không có câu answer/check trong HTML/JS/JSON public.
- API: build **45 bài tập** (thêm 9), typecheck đạt. `check:exercises` thoát 1 trước khi kết nối vì thiếu SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD; không có câu nào đã chạy trên database trong phiên.
- Kiểm nguồn độc lập: **282 ô Result/RunFlow**, chín answer, qua SQLite scratch với adapter Unicode N-prefix, literal ngày và làm tròn output AVG. Đây không phải T-SQL live.
- HTML tĩnh: mỗi bài **6 mục**; card/panel lần lượt **3/5/6**; bảng Result **5/7/7**; khớp ô và tiêu đề literal, đủ ba trang bài tập mỗi bài. Không chứng nhận visual/click/bàn phím.
- Không sửa UI/API/bộ chấm/schema/dữ liệu mẫu hoặc bài ngoài 3.1–3.3. Không push, merge main hay deploy. Giữ cả ba workspace/branch để người làm khóa học xem và quyết định bước ngoài repo sau.

## Review hoàn thiện và đưa vào main — 23/10/2026

Yêu cầu tiếp theo của người làm khóa học: “review và hoàn thiện các bài từ 3.1 - 3.3 trên nhánh riêng, sau đó đưa vào main nhé”. Yêu cầu này cho phép nhập và push main sau kiểm tra, thay giới hạn chỉ bàn giao local của giai đoạn soạn bài ở trên. Nhánh `codex/review-lessons-3-1-3-3` được tạo từ `origin/main` tại `0f1963a`, gom ba nhánh tác giả nối tiếp `8018d7d` → `7e43b58` → `335540d` bằng merge riêng. Không đổi quy ước, template, component, API, bộ chấm hoặc dữ liệu mẫu.

Ba agent Codex mới review học thử từng bài và một agent mới kiểm tích hợp, đều kế thừa model phiên, không chỉ định model khác. Người thực hiện đọc hết report trước khi sửa và kiểm lại các nhận xét bằng SQL Server thật, nguồn mẫu và Microsoft Learn. [Báo cáo đầy đủ cùng quyết định và bằng chứng](../../reviews/2026-10-23-level-3-completion/README.md).

**Đã sửa:** 3.1 nói rõ FROM trích 10/20 đơn còn WHERE hiện đủ chín đơn; 3.2 bổ sung quy tắc một cột khóa có NULL được gom thành một nhóm, đồng thời rút vế lặp; 3.3 cắt một vế nhắc lại sau đối chiếu WHERE/HAVING. Sửa helper test chuẩn hóa CRLF thành LF như literal MDX/JavaScript trên Windows, giữ toàn bộ assertion và SQL. Lỗi baseline 266/267 là khác xuống dòng; sau sửa ba file liên quan đạt 9/9 và toàn suite đạt 267/267.

**Không làm theo:** không tăng số bài tập hay đổi seed để phân biệt mọi câu cho cùng kết quả. Tập rỗng không phân biệt được đảo SUM/AVG/MIN/MAX khi đều NULL; các nhóm không hòa chỉ tiêu không kiểm được mọi lỗi sắp xếp phụ. Giữ ba bài tập đại diện, bộ chấm theo kết quả và các giới hạn đã nêu trong bài. Không biến audit tĩnh UI thành việc sửa component ngoài phạm vi.

**Kiểm xác nhận bổ sung:** web 267/267 test, check 0 lỗi/0 warning và ba hint nền, build 99 trang, check:dist 1.651 link; API build 45 bài tập và typecheck đạt. Đã chạy đủ 45 đáp án qua SQL Server và runner luôn hoàn tác, sau đó check:data báo không bảng nào lệch. Bộ kiểm riêng đối chiếu 23 SELECT khác nhau, năm khối SQL, năm Result, đủ 14 bước RunFlow và 46 ô của ba hình Excel; 18 bài làm sai tiêu biểu đều bị core API bác. Các truy vấn kiểm riêng chỉ đọc. Kết quả này bổ sung cho lịch sử kiểm SQLite/thiếu cấu hình ở trên, không sửa lại lịch sử đó thành đã kiểm live.

**Browser:** bản build được xem ở 1280px và 1440px; hình, bảng, mục lục và highlight đọc được, không tràn trang. Đủ 14 drawer mở bằng Enter, đóng bằng Escape và trả focus; sáu câu tự kiểm dùng Enter/Space được. Trang bài tập kiểm link, Tab thụt dòng và sơ đồ database bằng bàn phím; không nộp bài qua browser. Audit strict Frontend Design Premium trả exit 1 với hai finding trên component có sẵn ngoài diff: thiếu noValidate trên form mã truy cập và cảnh báo textarea không nhận ra CSS resize:none. Browser xác nhận resize:none; giữ riêng hai finding này trong báo cáo, không ghi audit đạt. Chưa thực hiện audit toàn bộ trạng thái mạng/đăng nhập/mobile/zoom của sản phẩm.

Nhật ký evidence local: `temp/verification/2026-10-23-level-3-review/`. Git và kết quả CI/publish được cập nhật trong plan và báo cáo bàn giao sau khi thực hiện, không suy từ kiểm local thành đã triển khai.
