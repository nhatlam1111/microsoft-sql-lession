# Review tích hợp kỹ thuật bài 4.9–4.10

Ngày review: 27/10/2026. Vai trò: Senior Code Reviewer, rà thiết kế khóa SQL Server/Excel cho người chỉ biết Excel văn phòng cơ bản. Model kế thừa model của phiên; không override, không tạo agent khác.

## Phiên bản, phạm vi và công cụ thực tế

- Root: `/workspace/scratch/2f7a56f40308/microsoft-sql-lesson-4-10`.
- Diff được review: `ae14a64515c819702779e0e18481f902f85392b7..f2d7b8e453b8fc51b0d496c8c0d050cb23fc3529`. Reviewer tự đọc diff/stat/name-list và xác nhận HEAD đúng head này. Diff có 16 tệp tracked; manifest có thêm hai HTML, tổng 18 tệp.
- Reviewer tự tính SHA-256: **18/18 tệp khớp manifest-integration.json**, không có mismatch. Source 4.9 là bản đã bổ sung nhánh Load To ở dòng 77; không dùng learner report bản cũ để chứng nhận thay đổi mới.
- Reviewer tự xác nhận branch 4.9 tại `79f4efafe872f0df282056080b0bfe73dd626766` là ancestor của head; source 4.9 ở branch đó giống source 4.9 tại head. `git status --porcelain` của hai worktree 4.9 và 4.10 đều rỗng tại lúc kiểm. Đây là quan sát Git chỉ đọc, không phải quyền tích hợp hoặc xuất bản.
- Đã đọc AGENTS, quy ước/template/hồ sơ công ty, mẫu 1.1; spec/plan của lượt; trọn hai source mới, test và metadata trong diff; các tiền đề 1.2, 4.5, 4.8; phần liên quan của các mốc 2.1, 2.5, 2.8. Đọc đúng hai learner report/disposition được giao và verification/evidence tác giả, tách với kiểm độc lập bên dưới.
- Công cụ reviewer dùng: shell đọc tệp bằng `cat`, `sed`, `nl`, `rg`, `tail`; Git chỉ đọc; Python chuẩn (`pathlib`, `hashlib`, `json`, `ast`, `re`, `html.parser`, `subprocess`) để tính hash, parse literal public seed và đối chiếu cấu trúc/văn bản HTML. Script chạy trong bộ nhớ, không import helper dự án hoặc chạy SQL. Có một lượt tìm theo đường dẫn component/CSS không tồn tại; đã dùng `rg --files` xác định lại đường dẫn rồi đọc đúng tệp.
- Đã mở tài liệu Microsoft công khai bằng công cụ web đọc trang; không dùng browser/đăng nhập. Không chạy SQL/SQLite/fixtureQuery/attendanceQuery/API/runner/test/build; không mở Excel/SSMS; không đọc `.env` hoặc secret. Chỉ ghi report này.

### Evidence do reviewer tự kiểm và evidence của tác giả

| Lớp bằng chứng | Reviewer thực sự làm | Kết quả và giới hạn |
|---|---|---|
| Phiên bản/phạm vi | Đọc Git diff, kiểm hash 18 tệp, HEAD/ancestry/status | Đúng gói hiện hành; không có thay đổi runtime/API/editor/store/guard/grade/draft/seed/dependency trong diff. Hai bài cùng `full/noExercises: true`; không có YAML hoặc route bài tập cho hai slug. |
| Số liệu public seed | Chỉ parse literal 48 dòng `NhanVien`, 55 dòng `HopDong`, rồi lọc/sắp bằng Python | 48 mã nhân viên duy nhất. 4.9 khớp đủ 10 mã, tên, phòng và thứ tự. 4.10 khớp hai dòng, ngày/thứ tự, cả hai không có hợp đồng. Không thực thi câu SQL hoặc script seed. |
| Source → HTML | Tự parse HTML hiện hành, đối chiếu câu SQL, `data-copy`, bảng Excel/Result, tiêu đề/marks/details/nav | Mỗi bài có 1 SQL/1 payload copy, 5 h2, 4 h3, 5 câu ôn. SQL hiển thị = payload copy = chuỗi source đã giải mã; bảng, tổng và marks khớp. Chưa bấm nút hay quan sát render trên viewport. |
| Tài liệu Excel | Tự mở bốn trang Microsoft được giao, đọc đoạn native query/load/refresh/connector liên quan | Có căn cứ tài liệu cho hướng dẫn và fallback Load To; tài liệu không chứng minh Excel mục tiêu đã đi hết luồng. |
| Test/build/check của tác giả | Chỉ đọc verification và các log cuối được giao | Log ghi 338 tests/52 files ở Node24 và Node22; Astro 0 errors/0 warnings/3 hints; build 135 trang; check-dist 2032 link; checker HTML hai bài đạt. **Reviewer không chạy lại và không đổi các con số này thành kết quả kiểm của reviewer.** |
| SQL Server/Excel/UI thực | Không thao tác | Verification tác giả cũng ghi pending; log browser ghi thiếu Chromium executable. Không có bằng chứng live hoặc tương tác để nâng thành pass. |

## Strengths

1. **Mạch 4.8 → 4.9 → 4.10 giữ đúng việc tái sử dụng và kiểm định nghĩa.** 4.8 phân biệt đầu vào/thân thủ tục với `SELECT` độc lập; 4.9 dùng một `SELECT` độc lập đọc bảng có thật rồi lưu cách lấy trong workbook; 4.10 yêu cầu chốt nguồn, dòng/cột và điều kiện trước khi đối chiếu. Không có bước ngầm bắt tạo/gọi thủ tục ở 4.8 hoặc tạo view ở 4.5 để học tiếp.
2. **Hai loại danh sách được tách bằng mục đích nghiệp vụ.** 4.9 lấy hồ sơ hiện đang làm tại IT, không lọc ngày vào. 4.10 là hồ sơ vào mới trong khoảng đã chốt, mọi trạng thái, mọi phòng, không điều kiện hợp đồng. 4.10 dòng 56/79 giải thích ngay việc không mang bộ lọc trạng thái từ 4.9 sang; ngày báo cáo không bị dùng để giả lịch sử phòng.
3. **Đường học và đích tải có điều kiện rõ.** 4.9 dòng 62 cho người chỉ có web lối đọc hình/ôn; dòng 64–78 nối server/database, SQL login, native SQL, preview, Table/New worksheet và lưu workbook. Dòng 77 xử lý Load To bị mờ ở lần đầu theo tài liệu Microsoft. Không có lựa chọn DirectQuery/Import của Power BI chen vào các bước Excel.
4. **Refresh được giải thích bằng hành vi người nhận file nhìn thấy.** 4.9 dòng 44/86–92 tách nguồn, bản tải, preview/cache và worksheet; có bước chờ/kiểm lỗi/cột/mã/số dòng. Refresh không tự đổi literal mã/ngày, sửa ô không ghi SQL và lưu kết nối không tạo lịch khi file đóng. Quyền đọc khi chia sẻ được nêu ngay trong mạch bàn giao.
5. **Mẫu yêu cầu 4.10 dùng được cho tình huống cụ thể.** Dòng 33–75 có tên/mục đích báo cáo, một dòng/MaNV, bốn ánh xạ cột, phạm vi/thứ tự, ca ngày giữ/loại, ca thiếu/nhiều hợp đồng và cách ghi thiếu lịch sử. SQL/Result/lời đáp ở 79–90 khớp gói yêu cầu ấy; không chỉ dừng ở lời khuyên “viết rõ”.
6. **Test mới nhắm vào sai sót ảnh hưởng kết quả.** Đọc source test cho thấy goldens độc lập với query, probe bỏ trạng thái/phòng 4.9, probe hai biên và thứ tự ngày rồi mã 4.10, cùng ca đã nghỉ/nhiều và thiếu hợp đồng. Không thêm prose snapshot, quota component hoặc nới helper thành parser T-SQL. Đây là đánh giá thiết kế test từ source, không xác nhận test đã chạy bởi reviewer.

## Findings

### Critical

Không có finding Critical đủ căn cứ trong phạm vi được review.

### Important

Không có finding Important đủ căn cứ trong phạm vi được review.

### Minor

Không có finding Minor cần sửa đủ căn cứ trong phạm vi được review. Các giới hạn cần tác giả kết luận riêng được liệt kê đầy đủ ở mục Declined-to-judge; không biến phần chưa kiểm thành lỗi sản phẩm hoặc ép thêm nội dung để có finding.

## Đối chiếu năm Review Focus

| Focus | Vị trí/câu gốc ngắn | Kiểm độc lập, tác động người học và kết luận |
|---|---|---|
| **1. Lối web; thông tin kết nối; đích worksheet; không lẫn Power BI** | 4.9:62 “mã chạy bài tập web không dùng làm mật khẩu SQL”; 73–78 connect → SQL statement → preview → Table/New worksheet → lưu; 77 có fallback Load To. | **Giữ được ở source/HTML.** 1.2 đã phân biệt web và SQL login; 4.9 nhắc đúng ngay lúc cần. Người chưa có Excel/login vẫn đọc hình và trả lời ôn, không phải nộp bài không tồn tại. Tự đối chiếu Microsoft Native Database Query cho server/database/Advanced options/SQL statement và Editor; Microsoft Create/load cho nhánh Load To bị mờ. Microsoft connector ghi DirectQuery chỉ dành Power BI; bài không yêu cầu lựa chọn đó. Menu/đăng nhập/tải thực tế nằm ở D1–D3. |
| **2. Preview/cache/bản tải/Refresh/literal/ghi ngược/lịch chạy** | 4.9:44 “Sửa một ô … không ghi ngược”; 86 “Chờ tác vụ hoàn tất”; 88 “Điều kiện … vẫn giữ nguyên”; 90 “chưa làm mới bảng trên worksheet”; 92 “không tạo một lịch chạy khi file đang đóng”. | **Giữ được về nghĩa và tài liệu.** Không đồng nhất Preview với sheet hoặc bấm Refresh với thành công. Nguồn không đổi vẫn có thể trả 10 dòng. Microsoft Refresh external connection phân biệt refresh Editor/cache với worksheet, đồng thời có đường Query/Refresh. Tác giả và reviewer đều chưa có thao tác Excel; các giới hạn D3–D4 được giữ. |
| **3. 4.9: hai bộ lọc/thứ tự/10 mã/view/quyền chia sẻ** | 4.9:25, 50–58, 82, 92; “View mẫu … chưa được tạo”. | **Khớp source/HTML và tính thuần seed.** Query có `TrangThai = N'Đang làm' AND MaPB = 'IT'`, `ORDER BY MaNV ASC`. Tự lọc literal seed được đúng `NV007/NV011/NV017/NV021/NV029/NV035/NV039/NV043/NV046/NV048`, khớp trọn tên/phòng trong Result. Excel chỉ trích ba dòng và có nhãn minh họa; Result chứa đủ 10. Không lẫn view thường lưu định nghĩa ở 4.5 với dữ liệu tải trong workbook. Chia sẻ không được mô tả như tự cấp quyền nguồn. Trạng thái nguồn/quyền live: D1/D5. |
| **4. 4.10: grain/ngày/phòng/biên/ngày chốt/trạng thái/hợp đồng/lịch sử** | 4.10:43 “một mã MaNV”; 53–58 hiện lưu và khoảng ngày; 64–75 ca chấp nhận; 81–90 SQL/Result. | **Khớp source/HTML và tính thuần seed.** Query đọc riêng `NhanVien`, không JOIN hoặc lọc trạng thái; giữ `>= '20261001'`, `< '20261022'`, sắp ngày rồi mã tăng. Tính thuần được `NV047/Phạm Ngọc Ánh/NS/2026-10-01`, `NV048/Đỗ Minh Quân/IT/2026-10-05`; 0 hợp đồng cho cả hai. Bốn ca giả định ngày được gọi đúng là giả định; ngày 01/10 và 21/10 giữ, 30/09 và 22/10 loại. Quy tắc nhiều/thiếu hợp đồng và đã nghỉ được giảng trước ôn, không dùng sample hai dòng để thay kiểm toàn phạm vi. `MaPB` hiện lưu không bị giả thành phòng ở ngày chốt/đầu vào làm. SQL Server/type/live và áp dụng nghiệp vụ khác: D1/D10. |
| **5. Năm mục tiêu trước ôn; ví dụ cạnh lời giảng; mẫu dùng được; độ tải/evidence** | 4.9:31–94 trước Memo 118; ôn 128/135/142/149/156. 4.10:31–92 trước Memo 116; ôn 126/133/140/147/154. | **Đủ tiền đề đọc hiểu cho cả năm câu mỗi bài.** 4.9 lần lượt dạy Power Query/bản tải (33–44), kết nối/mã web (62–78), SELECT/view/load (48–82), Refresh/Preview (86–90), sửa ô/quyền chia sẻ (44/92). 4.10 dạy dòng/nguồn (43/73), bốn cột/phòng hiện lưu (47–58), biên/trạng thái (56/64–71), thiếu/nhiều hợp đồng (73), thiếu lịch sử (75). Ví dụ đều ở cạnh ý; phần chính hiện trong HTML, chỉ đáp án ôn nằm trong details. Không thấy lặp/cảnh báo gây vấp cần cắt: Hay nhầm nêu hậu quả ngắn, Memo/ôn phục vụ ôn tập. Thời lượng và năng lực thao tác thực: D6–D7. |

### Source → HTML, định dạng và đường hoàn thành

- SQL 4.9 có một tab thật trước `AND`; 4.10 có hai tab thật ở dòng tiếp cột và `AND`. Chữ SQL hiển thị trong `pre.sql-code` và `data-copy` trùng nguyên chuỗi source sau giải mã; giữ nháy đơn thẳng, tiếng Việt và xuống dòng. CSS nguồn và CSS thực sự được HTML tham chiếu có token `--sql-tab-size: 4` và `.sql-code` dùng token đó. Không lộ backtick hoặc chữ escape `\\t`/`\\n` trong article. Đây chưa phải kiểm clipboard/dán hoặc độ rộng tab trên màn hình.
- 4.9: Excel 12 ô dữ liệu/tiêu đề, bốn ô mark là ba tiêu đề và `C2`; Result 30 ô dữ liệu, dòng mark `NV048`. 4.10: Excel 12 ô, marks `A2/A3/D2/D3` và hai ngày có lớp numeric; Result 8 ô, cả hai dòng mark. Source/HTML/tính thuần seed khớp; ngày d/m/y ở Excel cùng nghĩa với ngày ISO trong Result.
- Hai article có đúng 5 h2, 4 h3, 5 details đầy đủ câu hỏi/đáp án; không có mục Bài tập/link nộp bài hoặc YAML/route bài tập cho hai slug. Footer gợi ý hoàn thành bằng tự trả lời câu ôn đúng biến thể noExercises. HTML 4.9 nối trước 4.8/sau 4.10; HTML 4.10 nối trước 4.9/sau 5.1. Chưa bấm link hoặc thử lưu tiến độ.
- Diff không đụng công cụ/API/guard/chấm/draft/storage, nên không có thay đổi interface hay migration nháp mới cần truy vết trong lượt này. `full` và noExercises dùng cơ chế hiện có. Không suy từ việc runtime không đổi thành xác nhận runtime hiện hành không có lỗi.
- Nhãn “Query executed successfully”/số rows trong component Result là nội dung bài dựng sẵn; không phải output SQL Server hoặc Excel của reviewer. Tương tự, checker HTML và các probe SQLite trong log tác giả không phải bằng chứng SQL Server/Excel/UI live.

## Declined-to-judge

Những hành vi dưới đây đã được cân nhắc nhưng reviewer không chốt đạt/lỗi. Tác giả cần xử lý hoặc giữ trạng thái pending có lý do trong disposition/handoff; không cần mở rộng sản phẩm chỉ để xóa giới hạn.

| ID | Hành vi/phạm vi chưa chốt | Vì sao chưa chốt | Điều tác giả cần xử lý |
|---|---|---|---|
| **D1** | Hai SELECT trên SQL Server/Azure SQL hiện hành; đúng server/database, đăng nhập, quyền đọc, tên/collation/schema resolution và metadata kiểu ngày | Reviewer chỉ đọc source/public seed và tính thuần. Không kết nối hoặc chạy engine. Tác giả ghi thiếu cấu hình/công cụ SQL; con số fixture không chứng minh dữ liệu nguồn hiện hành. | Giữ SQL live pending. Nếu sau này kiểm, ghi đúng nguồn/thời điểm/query/kết quả; không dùng seed/SQLite/Result success thay bằng chứng. Không cần đọc/in secret cho review này. |
| **D2** | Excel365 desktop Windows: đi menu, Database authentication, hộp native SQL confirmation, preview/Editor và cả nhánh Close & Load To/fallback bị mờ, Table/New worksheet | Microsoft docs hỗ trợ đường hướng dẫn; chưa có thao tác Excel mục tiêu để quan sát trạng thái thật. HTML chỉ là nội dung bài, không là ảnh ứng dụng thực. | Giữ Excel connect/load pending; khi có môi trường phù hợp kiểm cả đích worksheet và nhánh đầu tiên nếu gặp, ghi phiên bản cùng thao tác thực. Chưa có căn cứ buộc sửa hướng dẫn hiện tại. |
| **D3** | Refresh worksheet so với Refresh Preview: chờ xong, lỗi, cache, cột/mã/số dòng, literal không đổi, vùng sửa tay bị thay; lưu/mở lại workbook | Đã đối chiếu nghĩa với tài liệu và source, nhưng chưa quan sát Excel chạy truy vấn/ghi bảng/cache/lưu file. | Giữ thao tác refresh/lưu/mở lại pending; không báo đã thực hành chỉ nhờ tài liệu hoặc nhãn success. Không cần thay dữ liệu chung để tạo minh chứng. |
| **D4** | Chạy tự động khi mở/định kỳ/khi file đóng, gateway hoặc host khác; Excel web/Mac/phiên bản khác | Bài chốt Excel desktop Windows và thao tác thủ công; các cơ chế tự động/host khác không được triển khai hoặc hứa trong bài. | Giữ ngoài phạm vi; không thêm gateway/M code/lịch chạy hoặc hỗ trợ mọi host vào lượt này. Nếu mở rộng, cần yêu cầu và kiểm riêng. |
| **D5** | Người nhận workbook thật: xem được cached data, có/không có quyền đọc, credentials của từng người, kết nối/network/chứng chỉ và Refresh thành công | Quy tắc bàn giao đã đúng ở source; reviewer không tạo/chia sẻ workbook hoặc kiểm hai tài khoản/quyền thực tế. Không có artifact workbook được giao. | Giữ kiểm chia sẻ/quyền pending, không coi gửi file là cấp quyền. Nếu cần xác minh, dùng môi trường/tài khoản được cấp và ghi riêng quan sát; không tự đổi bảo mật/quyền để ép đạt. |
| **D6** | Website tương tác: login/mã web, điều hướng bấm thật, “Đã học xong”, tiến độ/local storage, refresh trang, đồng bộ nút rail/footer và giữ nháp SQL bài trước | Chỉ đọc HTML/layout/route source và diff không sửa runtime. Không chạy browser/API; log tác giả thiếu Chromium. Không đọc/sửa dữ liệu nháp người dùng. | Giữ UI/auth/completion/draft runtime pending; ghi không có thay đổi sản phẩm liên quan, không gọi source compatibility là UI pass. Chưa có căn cứ yêu cầu sửa editor/store/API. |
| **D7** | Clipboard/paste, mở/đóng details bằng bàn phím, viewport/overflow, màu/độ tương phản, tab bốn cột thực tế và khả năng hoàn tất trong 30/25 phút | HTML/payload/CSS đã kiểm nhưng không có tương tác hoặc quan sát người học. Năm đáp án đủ tiền đề không chứng minh người học đã làm được thao tác. | Giữ kiểm tương tác/accessibility/thời lượng thực pending hoặc ước lượng rõ; không cần thêm prose/test snapshot để thay kiểm đó. |
| **D8** | Thực thi lại 338 tests/52 files, hai runtime Node, Astro/build/check-dist/API packaging | Reviewer bị giới hạn không chạy test/build/API. Chỉ đọc source tests và log tác giả; chưa tái lập execution/environment. Không có YAML/API thay đổi. | Ghi chính xác đây là kiểm tác giả; nếu có thay đổi sau head này, tác giả kiểm lại phần bị ảnh hưởng. Không lấy bộ đề đóng gói cũ làm API/SQL live pass mới. |
| **D9** | Helper fixture trên toàn T-SQL, mọi dạng query, guard/grade/security hardening chung và tính đúng của runtime cũ | Helper/guard/grade không đổi trong diff; các ví dụ hẹp là SELECT đơn bảng. Không được chạy helper hoặc mở rộng thành parser trong gói review. | Giữ ngoài phạm vi, không yêu cầu parser/general hardening vì giả định trường hợp không thuộc bài. Nếu có regression cụ thể ở thay đổi sau, review riêng với bằng chứng. |
| **D10** | Nghiệm thu mọi báo cáo biến động nhân sự, định nghĩa nghiệp vụ ngoài danh sách vào mới đã chốt, tính đầy đủ của dữ liệu sản xuất/lịch sử chuyển phòng | Bài chỉ chốt danh sách 01/10–21/10; public seed không là dữ liệu sản xuất và không có lịch sử phòng. Mẫu/ca chấp nhận không thay xác nhận nghiệp vụ cho phạm vi khác. | Giữ đúng tên/phạm vi hiện tại. Khi yêu cầu thêm nghỉ việc/chuyển phòng hoặc thuộc tính quá khứ, cần nguồn/định nghĩa mới; không suy từ `MaPB` hiện lưu. |
| **D11** | HTML/source sau thay đổi mới, trạng thái remote/main, push/merge/deploy và môi trường website đã công bố | Kiểm hash/Git chỉ áp dụng head/gói hiện hành; không kiểm remote hoặc xuất bản. Learner4.9 có hash trước sửa Load To và được bảo toàn đúng vai trò bằng chứng cũ. | Lưu report gốc, disposition cả các mục chưa chốt; cập nhật bằng chứng cho sửa sau head nếu có. Không dùng kết luận review làm quyền push/merge/deploy. |

## Nguồn Microsoft đã tự đọc

- [Import data from a database using Native Database Query](https://support.microsoft.com/en-us/excel/import-data-from-a-database-using-native-database-query-power-query): đường nhập server/database, Advanced options/SQL statement, xác thực và Editor; căn cứ tài liệu cho bước 1–4, không phải bằng chứng kết nối thực.
- [Create, load, or edit a query in Excel](https://support.microsoft.com/en-us/excel/create-load-or-edit-a-query-in-excel-power-query): mục Load a query/Set query load options; xác nhận đường Queries & Connections/Queries/Load To khi lệnh bị mờ ở lần tạo đầu và lựa chọn tải qua Import Data. Reviewer đã tự đọc phần sửa mới ở dòng 77, không chỉ dựa disposition tác giả.
- [Refresh an external data connection in Excel](https://support.microsoft.com/en-us/excel/refresh-an-external-data-connection-in-excel): mục Refresh data in Power Query; refresh Editor/cache khác worksheet, đường Query/Refresh; dùng để đối chiếu mô tả, không nhận đã thao tác.
- [SQL Server connector](https://learn.microsoft.com/en-us/power-query/connectors/sql-server): sản phẩm hỗ trợ, xác thực/native SQL, và nhãn DirectQuery dành Power BI. Trang có dòng thông báo authorization trong chrome nhưng nội dung mục connector liên quan đọc được; không đăng nhập. Không áp dụng các tùy chọn ngoài Excel vào hướng dẫn của bài.

## Kết luận và giới hạn

Không có finding cần sửa đủ căn cứ trong diff/gói hiện hành. Năm Review Focus được đáp ứng ở mức source, HTML, đọc tài liệu và tính thuần public seed; mạch 4.8 → 4.9 → 4.10 không tạo tiền đề triển khai view/procedure hoặc tự chuyển người chỉ học web sang luồng SQL login. Hai bộ năm câu ôn có lời giảng trước Memo; mẫu yêu cầu và số liệu hiển thị nhất quán.

Đây không phải xác nhận SQL Server, Excel hoặc UI đã chạy đạt. Tests/build/check là evidence của tác giả đã đọc, không phải reviewer chạy lại. Các mục D1–D11 cần tác giả kết luận hoặc giữ pending/out-of-scope có lý do trước bàn giao. Report không tạo quyền merge/push/deploy và không thay nghiệm thu thực tế.
