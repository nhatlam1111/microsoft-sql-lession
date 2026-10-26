# Bài 4.4–4.6: xoay báo cáo, dùng view và rà dữ liệu

- Ngày: 26/10/2026.
- Trạng thái: người làm khóa học đã duyệt ngày26/10/2026; đang triển khai native theo kế hoạch.
- Yêu cầu: tiếp tục 4.4–4.6 theo quy ước, mỗi bài một branch riêng.
- Gốc đề xuất: `codex/lesson-4-3-full` đã push tại `106701b7a53c3ad738987f4076418822792d7a44`. Main hiện đọc được là `0081807`; các bài 4.1–4.3 đang ở branch riêng nên lấy 4.3 làm gốc để giữ đủ tiền đề. Không merge vào main.
- Tài liệu chi phối: [quy ước](../../quy-uoc.md), [khung bài](../../lesson-template.md), [hồ sơ công ty](../../ho-so-cong-ty.md), mẫu 1.1 và các bài trước liên quan. Quy ước/template/AGENTS ở main và gốc 4.3 có cùng blob; hồ sơ công ty của 4.3 có thêm tình huống đã soạn.

## Mục tiêu và cách thực hiện đề xuất

Chuyển đúng ba bản tóm tắt thành bài đầy đủ cho người chỉ biết Excel văn phòng cơ bản, đã học các bài tiên quyết. Giữ MDX/YAML, component, schema và cơ chế chấm hiện có; người hỏi vẫn là chị Hạnh, bối cảnh tháng 10/2026. Ví dụ mới dùng đơn nghỉ, hồ sơ và ngày hợp đồng. Không sửa dữ liệu mẫu, UI, API hoặc bộ chặn SQL.

**Approaches:** trong phạm vi viết tiếp trên công cụ hiện có, đề xuất dùng bài truy vấn cho 4.4/4.6 và bài đọc hiểu có tự kiểm tra cho 4.5. Bộ chặn hiện từ chối CREATE; script chưa tạo view nào. Thêm view vào database dùng chung hoặc mở runner cho DDL đều cần công việc và quyền ngoài phạm vi ba bài này. Do đó không thiết kế bài chấm SQL yêu cầu đối tượng chưa tồn tại, hoặc giả dùng CTE thay cho việc tạo view. Người làm khóa học đã duyệt lựa chọn này ngày26/10/2026, gồm4.5 đọc hiểu/tự kiểm tra.

Sau duyệt, lập plan rồi triển khai trực tiếp trong phiên, không hỏi lại phương thức. Mỗi bài có reviewer học thử mới theo mục 4.5, cuối chuỗi có reviewer tích hợp mới. Tác giả xử lý từng nhận xét bằng ma trận, giữ report gốc. Giữ model kế thừa theo AGENTS; không dùng chỉ dẫn generic đổi model hoặc hỏi lại thiết lập máy.

## 4.4 — PIVOT: xoay bảng như Excel

- File: `src/content/lessons/4-4-pivot-xoay-bang.mdx`; thêm YAML ba đề cùng slug. Dự kiến 30–35 phút; giữ 3.10, bổ sung 4.1/2.8 làm tiền đề dùng CTE và khóa tháng.
- Tình huống: chị Hạnh cần số ngày ghi trên mọi trạng thái đơn bắt đầu tháng 8–10/2026; mỗi tháng một dòng, ba loại nghỉ thành ba cột. Cộng nguyên SoNgay theo TuNgay, không chia đơn qua tháng, không gọi là thực nghỉ/đã duyệt hoặc dữ liệu đã đủ kỳ.
- Giảng ba vai trò hàng/cột/giá trị bằng PivotTable ngay tại chỗ, không mặc định người mới biết công cụ. CTE nguồn chỉ có Thang = EOMONTH(TuNgay), LoaiNghi, SoNgay. PIVOT dùng SUM(SoNgay), FOR LoaiNghi và danh sách IN cố định; SELECT ngoài đặt tên cột và ORDER BY tháng.
- Giải thích các cột còn lại của nguồn quyết định nhóm hàng: giữ thêm MaDon sẽ tách theo đơn. Danh sách cột không tự tăng khi có loại mới. PivotTable cũng cần cập nhật/refresh nguồn phù hợp, không hứa mở Excel là tự có cột mới.
- Đối chiếu cách SUM(CASE WHEN ... THEN SoNgay END) đã học, giữ cùng phạm vi và cách xử lý thiếu; không tự thêm ELSE 0 rồi gọi hai kết quả hoàn toàn giống nhau. SUM ở tổ hợp không có giá trị cho NULL; nếu muốn hiển thị 0 phải chốt quy ước và thay ở kết quả. COUNT(MaDon) dùng khóa không NULL để đếm đơn, tổ hợp vắng cho 0; dạy khác biệt này trước phần ôn để làm đề 2.
- Không mở PIVOT động, UNPIVOT, SQL động, tuning hoặc sửa component RunFlow. Component chưa có bước PIVOT; dùng bảng nguồn/kết quả và lời giải ba vai trò, không vẽ một bước mà bộ kiểm không hiểu hoặc thêm CTE chỉ để có sơ đồ SELECT ngoài không giúp giải thích phép xoay.

Ba đề dự kiến, đều có cột/thứ tự/phạm vi rõ và chấm kết quả:

1. Tổng ngày theo tháng và ba loại như cách vừa học, nhưng chỉ trên đơn đã duyệt trong tháng 8–10; chỉ các tháng có dữ liệu, giữ NULL ở ô SUM thiếu.
2. Mỗi LoaiNghi một dòng; ba trạng thái thành cột, COUNT(MaDon) trên mọi đơn; ô không có đơn nhận 0.
3. Mỗi LoaiNghi một dòng; cột [8]/[9] lấy từ MONTH(TuNgay) cho riêng năm 2026, cộng ngày các đơn bắt đầu tháng 8/9 ở mọi trạng thái; giữ NULL ở tổ hợp thiếu. Không trộn các năm khi dùng số tháng.

## 4.5 — View: báo cáo lưu sẵn

- File: `src/content/lessons/4-5-view-bao-cao-luu-san.mdx`. Dự kiến 20–25 phút; giữ tiền đề 4.1. Đề xuất `kind: full`, `noExercises: true`; mục tiêu đổi rõ thành đọc định nghĩa view, giải thích nó lưu gì và điều kiện để dùng lại báo cáo qua view. Không hứa người học tạo được view trong runner hiện tại.
- Tình huống: chị Hạnh muốn các báo cáo dùng chung định nghĩa hồ sơ đang làm. Đề xuất định nghĩa view thông thường `dbo.vw_HoSoDangLam`, chọn rõ MaNV/HoTen/MaPB/MaCD từ NhanVien theo trạng thái đang làm; sau đó minh họa SELECT từ view để lọc phòng và sắp kết quả. Giải nghĩa view, phần dbo/schema và tên đối tượng ngay tại chỗ.
- Cú pháp CREATE VIEW và câu đọc view đều chỉ để đọc, `copy={false}`, ghi rõ view minh họa chưa được tạo trong database khóa học. Không dựng Result/Messages khiến người đọc tưởng đã tạo/đọc view thành công. Phần trả lời chị Hạnh là thống nhất định nghĩa và giao người có quyền triển khai; người đọc dùng được khi view đã tồn tại và có quyền phù hợp.
- View thông thường lưu định nghĩa truy vấn, không giữ snapshot hay tự làm dữ liệu nguồn đầy đủ/đúng. Đọc dữ liệu mà câu lệnh thấy được khi chạy; không nói luôn có số mới nhất ở mọi thời điểm. Khác CTE có phạm vi một câu, định nghĩa view được lưu trong database để dùng lại.
- WHERE ngoài lọc thêm trên phạm vi view; ORDER BY ở câu đọc mới chốt thứ tự trả về. CREATE VIEW phải ở đầu một batch khi triển khai; không dạy thêm GO/USE thành câu đem nộp trên web. Quyền tạo và quyền đọc khác nhau; tạo view không tự thu hồi quyền bảng gốc hoặc bảo đảm che dữ liệu.
- Giới hạn: view thông thường, không indexed view/materialized view, WITH CHECK OPTION, sửa dữ liệu qua view hoặc cấp quyền thực tế. Dẫn phần quyền sang 6.1, hiệu năng sang 5.6/5.7 nếu cần, không giảng thêm để thay phần lõi.
- Bài này bỏ mục Bài tập, thay bằng ít nhất năm câu tự kiểm tra sau Memo: lưu định nghĩa hay dữ liệu; khác CTE; lọc/sắp ở câu đọc; quyền/tính tồn tại; đường thực hành phù hợp với web hiện tại. Mọi đáp án đã được dạy. Cập nhật chú thích danh sách bài noExercises trong template nếu cần cho đúng hiện trạng; không đổi schema/quy tắc để lách kiểm.

## 4.6 — Soi chất lượng dữ liệu: trùng, thiếu, sai

- File: `src/content/lessons/4-6-soi-chat-luong-du-lieu.mdx`; thêm YAML ba đề. Dự kiến 35–40 phút; giữ 3.3/3.5, bổ sung 4.1/3.8/3.10 theo kỹ thuật CTE, UNION ALL và đếm có điều kiện cần cho bài tập.
- Tình huống: trước khi dùng hồ sơ để báo cáo, chị Hạnh cần danh sách dấu hiệu cần xác minh theo ba luật đã chốt: CCCD lặp giữa hồ sơ, email thiếu cho danh sách liên hệ, hợp đồng có ngày kết thúc trước ngày bắt đầu. Lấy mọi trạng thái, không tự loại người đã nghỉ hoặc người mới.
- Ba kiểm chính: GROUP BY SoCCCD/HAVING COUNT(*) > 1 cho nhóm trùng; SELECT mã/phòng/email với IS NULL hoặc TRIM(Email) = '' cho thiếu NULL/rỗng/toàn dấu cách thông thường; SELECT MaHD/MaNV/NgàyBắtĐầu/NgàyKếtThúc với NgayKetThuc < NgayBatDau cho lỗi ngày. Ngày kết thúc NULL hoặc bằng ngày bắt đầu không bị luật nhỏ hơn này đánh dấu.
- Excel dùng tô trùng/lọc ô trống để nối ý, giải thích thao tác vừa đủ; không coi Data Validation là bằng chứng dữ liệu cũ đều hợp lệ. SQL chỉ gắn cờ theo luật; một CCCD lặp không chứng minh hai hồ sơ chắc chắn cùng người, email không trống không chứng minh dùng liên hệ được. Trình bày rõ một nhóm trùng khác số hồ sơ bị ảnh hưởng; chỉ dẫn CTE chứa nhóm rồi kết lại hồ sơ trước phần ôn.
- Giảng đủ cách đếm cờ thiếu theo từng phòng, kể cả 0, và ghép số đếm các luật bằng UNION ALL từ kiến thức đã có; không để lần đầu xuất hiện trong answer. Không tự xóa/sửa dữ liệu cài sẵn; SELECT không ngăn lần ghi sai sau. Dẫn ràng buộc sang 5.2, đối soát nguồn sang 4.7.
- Ưu tiên ba khối kiểm rõ ràng, không ép ghép thành một hệ thống audit tổng quát. RunFlow chỉ dùng nếu giúp hiểu một SELECT có sẵn; không sáng tác flow cho ba kiểm độc lập hoặc thay giao diện.

Ba đề dự kiến:

1. Trả MaNV/MaPB của các hồ sơ thuộc nhóm CCCD lặp, dùng CTE và kết bảng để quay từ nhóm sang hồ sơ; không trả nguyên bảng nhóm trong ví dụ.
2. Mọi phòng có hồ sơ đang lưu một dòng: MaPB, SoHoSoThieuEmail; dùng SUM(CASE ...) theo cùng luật thiếu, giữ cả số 0. Đây không phải số người thiếu email tại một kỳ quá khứ.
3. Ba dòng tổng số hồ sơ/dòng hợp đồng cần rà theo các luật, có mã kiểm tra cố định và SoDongCanRaSoat; ghép UNION ALL. Nhánh CCCD đếm hồ sơ trong nhóm lặp, không đếm số nhóm. Thứ tự theo mã kiểm tra, không coi tổng ba luật luôn là số người khác nhau.

## Căn cứ dữ liệu đã đối chiếu khi lập khung

**Chỉ đọc script và tính toán thuần, chưa thực thi SQL Server.** Có20 đơn: tổng ngày theo loại ở tháng8 là Phép năm12/Nghỉ ốm2/Việc riêng thiếu; tháng9 là12/5/3; tháng10 là10/thiếu/1. Số đơn theo trạng thái Đã duyệt/Chờ duyệt/Từ chối: Nghỉ ốm4/0/0, Phép năm8/3/1, Việc riêng2/1/1. Nguồn xoay theo tháng dự kiến20 dòng thành3 dòng; phải kiểm lại mọi SQL và bảng khi viết.

Theo script có1 nhóm CCCD lặp, gồm NV015/NV038; thiếu email là NV044/NV045. Số dòng thiếu theo phòng hiện lưu BGD/IT/KD/KT/NS/VH là0/0/1/0/0/1. HD2025-003 của NV029 có ngày bắt đầu2025-03-01, kết thúc2025-02-28. Không in trường thù lao không liên quan hoặc dùng dữ liệu thật ngoài repo.

## Kiểm, review và bàn giao

- Giữ khung gộp Excel/SQL, khoảng2–4 h3, tự kiểm tra ngay sau Memo và trước Bài tập nếu có. Bài4.5 dùng biến thể noExercises đã duyệt trong thiết kế này nếu được chấp nhận. SQL MDX dùng escape \\t theo mốc4 cột; code trong summary dùng thẻ code, nháy SQL đúng sau build.
- Lập bảng tiền đề từng đề và bản đề che answer bằng whitelist trường công khai trước khi giao reviewer. Reviewer ghi bảng cách làm trước, sau đó mới đối chiếu answer; tránh lặp sự cố tách YAML lộ answer của lượt4.3. Bài4.5 không YAML: reviewer kiểm đủ mục tiêu/tự kiểm tra và xác định không có đường chạy giả.
- Mỗi bài reviewer mới theo nguyên văn lời dặn4.5, chỉ ghi report được giao; không seed/secret/SQL/API/browser trừ phạm vi tương tác được giao riêng. Sau chuỗi, reviewer tích hợp mới; tác giả xử lý từng mục chưa phán định và mọi nhận xét bằng ma trận Làm theo/Làm một phần/Không làm theo, giữ report gốc và cập nhật hồ sơ/spec/plan.
- Tests bảo vệ dữ liệu/biên/guard/copy payload/chống ví dụ giải nguyên đề, không chốt câu chữ. PIVOT không được SQLite hỗ trợ: tính toán fixture hoặc câu CASE tương đương chỉ đối chiếu số học, không được coi là chạy câu PIVOT trên SQL Server. Bài4.6 thêm fixture biên NULL/rỗng/dấu cách, ngày bằng/NULL/trước và một người nhiều cờ, không sửa seed.
- Hiện không có tool SQL trực tiếp và cả bốn biến SQL_SERVER/DATABASE/USER/PASSWORD đều chưa đặt. Khi triển khai phải kiểm lại khả năng kết nối/UI; không báo source/fixture/HTML là SQL live hoặc thao tác UI. Nếu môi trường vẫn thiếu, chỉ bàn giao phần soạn/review/kiểm local và ghi rõ live/UI chưa nghiệm thu; không tạo view hay đổi database chung.
- Branch: `codex/lesson-4-4-full` từ4.3; `codex/lesson-4-5-full` từ commit hoàn tất4.4; `codex/lesson-4-6-full` từ commit hoàn tất4.5. Commit local sau xử lý review/kiểm. Không push, merge main hoặc deploy trong lượt soạn; quyền push4.1–4.3 trước đó không tự áp dụng cho các branch mới.

## Nguồn kỹ thuật

- [Microsoft: PIVOT và UNPIVOT](https://learn.microsoft.com/en-us/sql/t-sql/queries/from-using-pivot-and-unpivot?view=sql-server-ver17).
- [Microsoft: CREATE VIEW](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql?view=sql-server-ver17).
- Nguồn repo: bộ chặn SQL hiện có, scriptHRM_Demo, các bài2.5/2.7/2.8/3.2/3.3/3.8/3.10/4.1–4.3. Liên kết tài liệu hoặc phép tính từ script không chứng nhận câu lệnh đã chạy trên database thật.

## Tiến độ thực hiện

4.4 đã soạn, learner review hai giai đoạn; sửa “refresh” và thay một câu ôn bằng chọn ba vai trò. Mô hình fixture chỉ chứng minh số học nguồn, không chứng nhận PIVOT trên SQL Server. Chi tiết ở report/ma trận bài4.4; live/UI vẫn pending.

4.5 đã soạn/noExercises và fresh learner review; sửa câu3 để đọc bốn cột/bảng nguồn, giữ năm câu. Hai mẫu chỉ đọc, không có Result, nút copy hoặc đối tượng mới trong database.
