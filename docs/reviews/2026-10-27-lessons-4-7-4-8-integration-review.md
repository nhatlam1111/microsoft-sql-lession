# Review tích hợp kỹ thuật bài 4.7–4.8

Ngày: 27/10/2026. Reviewer mới, kế thừa model của phiên theo AGENTS, không override, không tạo agent khác.

## Phạm vi, phiên bản và công cụ thực tế

- Root: `/workspace/scratch/2f7a56f40308/microsoft-sql-lesson-4-8`.
- Base: `75278be2e779e3f86d98397e468d626100157129`; head được review: `070fd5a2797f5463e8ef60061d1e20189f626875`. Tôi đọc diff chính xác base..head, kiểm `HEAD` khớp head được giao. Merge-base với `8b2d931` là `8b2d931efde76b7fa3fade6818d77048bf8cb48e`, phù hợp mạch 4.8 kế thừa 4.7.
- Tự băm đủ **21 tệp** trong `manifest-integration.json`: không có hash lệch, gồm MDX/YAML, hồ sơ/test và hai HTML `dist/bai/<slug>/index.html`. Working tree sạch khi bắt đầu đọc. Report này đánh giá head nói trên, không tự chứng nhận bất kỳ sửa đổi sau review.
- Đã đọc AGENTS, quy ước/template/hồ sơ công ty/mẫu 1.1, spec/plan đợt này; toàn bộ MDX 4.7/4.8 và YAML 4.7, test/helper bị đổi; các tiền đề liên quan ở 2.1/2.5/2.8, 3.4/3.5/3.8, 4.1/4.5/4.6. Đối chiếu các report gốc, disposition từng bài, hồ sơ verification và các log cuối được giao. Không dùng kết luận learner thay việc đọc source.
- Công cụ tự dùng: shell đọc tệp, Git chỉ đọc (`status`, `rev-parse`, `diff`, `merge-base`), SHA-256; Python thư viện chuẩn để parse literal public seed, tính ngày/số đếm/tập hợp thuần, giải mã thuộc tính MDX và parse HTML tĩnh. Chỉ ghi report này.
- **Không chạy SQL hoặc SQLite; không import/chạy `attendanceQuery`/`fixtureQuery`, test suite, API/runner, browser, SSMS hoặc database. Không đọc secret/.env.** Việc mô phỏng các điều kiện định dạng bằng Python là kiểm chuỗi thuần, không phải chạy Vitest. Kết quả tính từ public seed là kiểm nguồn, không phải SQL Server pass.

## Những gì giữ được

**Mạch 4.7 → 4.8 và mức minh họa.** Bài 4.7 đi từ các ô `F2/F3` chứa `1/0`, tới lịch DP018, hai phần đóng góp `18/0` và `0/2`, rồi nguồn SQL, FULL/EXCEPT và hai dòng cần rà. Bài 4.8 dùng lại chính `NV043`, phiếu `B2–B4` trước tham số, các ngày cụ thể trước `COUNT`, rồi khép `18 + 2 = 20`. Đơn vị ngày chấm công, ngày phép theo lịch và ngày công bảng lương được phân biệt; không quay lại cộng nguyên `SoNgay` theo tháng bắt đầu của 4.1–4.4. Nhịp này giữ mốc 2.1 nhìn cột trước SELECT/AS, 2.5 nhìn ô trống trước NULL, 2.8 nhìn ngày/phép trừ trước hàm; không mặc định biết VBA/VLOOKUP/PivotTable.

**Nguồn và phép kết.** Lịch đủ 20 ngày được cung cấp độc lập; phép năm lọc đúng loại/trạng thái, giao với lịch bằng ngày thuộc đơn và đếm DISTINCT theo mã. Hai nhánh đóng góp được cộng về một dòng/mã trước khi FULL; bảng lương lọc kỳ trước khi kết và khóa kỳ–mã bảo đảm duy nhất trong kỳ. `COALESCE` chỉ dùng cho mã hiển thị; số nguồn thiếu/chênh giữ NULL. Bản trích cố ý khác mã được ghi rõ, không biến thành kết luận dữ liệu đầy đủ đang thiếu.

**EXCEPT và ba đề.** Hai chiều minh họa lấy đúng giá trị phía trái, so cả cặp/vị trí, bỏ trùng; lời giải NULL không mâu thuẫn với `= NULL` ở 2.5. Đề 1 giữ cả dòng khớp nên khác câu chính; đề 2/3 đổi phía cung cấp số, vẫn có đủ lời giảng trước phần ôn. Không cần thêm RunFlow hoặc chép đáp án vào bài. Tự tính theo tập dữ liệu và so Result literal cho ma trận năm minh họa × ba kết quả đề: cả 15 ô đều khác nhau về bảng giá trị/vị trí/thứ tự; không minh họa 4.7 nào nộp nguyên là đúng trên bộ seed được giao.

**Procedure và đường hoàn thành.** 4.8 là `full/noExercises: true`, có đúng năm câu ôn sau Memo, không YAML/route bài tập. Hai mẫu CREATE/EXEC `copy={false}` và không ghép Result/Messages thành công với lời gọi. Hai SELECT có hằng riêng, không còn tham số; thay đủ ba tham số của thân mẫu rồi chuẩn khoảng trắng/schema cho đúng câu COUNT độc lập. Nội dung nói rõ thủ tục mẫu chưa cung cấp để gọi và web chặn CREATE/EXEC tại một chỗ trước mẫu. Schema nối 4.5; phạm vi CTE/kết bảng/tập hợp đã có tiền đề. Mẫu SSMS chỉ mở script; không bắt người chỉ học trên web tạo đối tượng hoặc tự kết nối để hoàn thành năm câu ôn.

**Scope công cụ.** Diff không đổi component/UI, seed/schema, API, SQL guard, luật chấm hoặc lưu nháp. Ba đề trong YAML 4.7 đều `query`, `ordered: true`; chỉ có một câu WITH/SELECT và độ dài dưới 4.000 (answer dài nhất 1.391 ký tự theo bản đọc). Mọi SQL có copy cũng dưới giới hạn (dài nhất 1.368 ký tự sau giải mã tab). Public exercise projection hiện có loại answer/check trước build trang; route tự lấy YAML. Tôi không thấy mở EXEC/tạo đối tượng để ép kiểm. Helper mới chỉ phục vụ ngày công, cố định schema khi override rỗng, không tính số tiền; phần chú thích thừa nhận SQLite không kiểm cú pháp/type/collation/procedure SQL Server. Regex chỉ chuyển đúng cấu trúc CTE lịch, các CAST/derived VALUES còn lại bị báo lỗi; không có căn cứ gọi helper là parser T-SQL tổng quát.

## Kiểm do reviewer tự thực hiện và evidence tác giả

| Hạng mục | Reviewer tự làm | Evidence tác giả đã đọc, không nhận là phép chạy của reviewer |
|---|---|---|
| Public seed / số liệu | Parse literal NhanVien/DonNghiPhep/HopDong bằng Python riêng, đối chiếu công thức sinh công/lương trong script; tính 20 ngày làm, 806 dòng công/43 mã, 43 mã lương, tổng phép 11, đối chiếu 817, bảng lương 819. NV013 = 17 + 2 = 19 so 20; NV032 = 18 + 0 = 18 so 19; NV043 = 18 + 2 = 20 so 20. | Fixture SQLite và `source-analysis.json` cho cùng các mốc; không phải engine live. |
| Phép vắt tháng / tập hợp | DP018 giao lịch tháng 9 chỉ còn 03/09, 04/09; tính hai chiều EXCEPT từ quan hệ chuẩn hóa cho `[NV013,20],[NV032,19]` và `[NV013,19],[NV032,18]`; so cả năm Result literal 4.7 và hai Result literal 4.8 với dữ liệu tự tính, đều khớp. Mô hình tập hợp riêng có duplicate/NULL cho kết quả như quy tắc được giảng. | Test override DP018 pending, đơn chồng/ngày ngoài tháng; EXCEPT duplicate/NULL; kiểm SQL trong fixture. Reviewer đọc assertion, không chạy lại. |
| Thiếu nguồn / zero / kỳ | Đọc nguồn CTE, điều kiện FULL/WHERE, phép trừ và khóa public schema: giữ mã từ union hai phía, mã thiếu và số 0 phân biệt được; lọc kỳ trước join. Không tuyên bố đã thực thi các override SQL. | Các assertion bỏ bảng lương NV013, bỏ công/phép NV043, đổi số 0 trong minh họa, thêm bảng lương kỳ khác; suite báo đạt. |
| 4.8 đầu vào / ngày | Tự đối chiếu SELECT thân mẫu sau thay đủ @MaNV/@TuNgay/@DenNgay với câu COUNT; điều kiện detail/count giống nhau. Public seed tự tính NV043 có đúng 18 ngày, mười ngày đầu khớp Result, ngày đầu là 07/09. Kiểm quan hệ thuần với các dòng tại 31/08, 01/09, 30/09, 01/10 và mã khác: đầu dưới phải lấy, đầu trên phải bỏ. | Test hiện có kiểm đổi mã NV013→17 và loại 31/08/01/10/mã khác; còn gap bảo vệ đúng ngày đầu dưới ở F2. |
| Source → HTML | Parser HTML riêng đối chiếu từng SQL hiển thị và `data-copy` với template đã giải mã; từng cột/ô Result/tổng/marks, Excel/selected/marks với source: khớp. 4.7: 5 SQL/5 copy, 5 Result, 5 Excel, 6 h2, 4 câu ôn và 3 link bài tập. 4.8: 4 SQL/2 copy, 2 Result, 1 Excel, 5 h2, 5 câu ôn, không link/route bài tập. Không lộ `\t` hoặc nháy cong trong SQL. Hint footer 4.8 đúng tự trả lời câu ôn; 4.7 đúng tự viết câu lệnh. | Checker HTML tác giả cũng ghi các số khối tương ứng; không phải browser pass. |
| Suite/build/API | Không chạy. Kiểm diff bảo đảm chỉ các tệp được liệt kê thay đổi; đọc log để phân loại bằng chứng. | Log postreview: 331 tests/50 files; Node 22 log cũng 331/50. Astro 0 errors/0 warnings/3 hints; build 135 trang; check-dist 135 trang/2028 link; API build 81 đề và typecheck. Live/data log dừng trước connection vì thiếu4 SQL env. |

Lần đầu regex đọc JSON Result trong script thuần của reviewer tham lam sang thuộc tính mark nên báo lỗi parse; đã sửa dùng JSON raw decoder, chạy lại đối chiếu đủ 5 + 2 Result và nhận các kết quả khớp ở bảng trên. Không sửa source hay dựa lỗi parser đó để kết luận nội dung sai.

## Findings

### F1 — Thấp · Cần sửa bảo vệ định dạng CASE trong khối BEGIN

- **Vị trí:** `tests/content.test.ts:120–123`, đặc biệt dòng 121 mới trong diff.
- **Câu gốc:** `if (line === 'END;' && lines.includes('BEGIN')) continue;`
- **Tác động:** ngoại lệ nhận diện có bất kỳ dòng BEGIN, rồi bỏ qua mọi END; không thụt trong cùng Sql. Vì thế CASE kết thúc sai lề bên trong một procedure cũng được bỏ qua, trái yêu cầu giữ bảo vệ CASE khi cho phép END đóng block. Whitespace literal vẫn bị chặn ở dòng 118; CASE trong khối không có BEGIN vẫn bị chặn. Source 4.8 hiện không có CASE và không bị lỗi hiển thị này.
- **Căn cứ tự kiểm:** mô phỏng đúng các predicate bằng Python thuần với chuỗi MDX `CREATE PROCEDURE… / AS / BEGIN / \tSELECT CASE / \t\tWHEN 1 = 1 THEN 1 / END; / END;` cho danh sách lỗi rỗng; bỏ BEGIN khỏi một ví dụ CASE tương ứng thì END; không thụt bị phát hiện. Không chạy SQL hoặc test suite để chứng minh điểm này.
- **Đề xuất:** chỉ miễn END đóng statement block thật, hoặc giới hạn rõ ngoại lệ cho END cuối của mẫu đang hỗ trợ, vẫn bắt END của CASE; thêm một regression nhỏ cho trường hợp CASE nằm trong BEGIN. Không cần sửa prose, nới kiểm whitespace hoặc viết parser SQL đầy đủ.

### F2 — Thấp · Cần bổ sung bảo vệ lấy đúng ngày đầu dưới trong test 4.8

- **Vị trí:** `tests/content-4-8.test.ts:28–31`; liên quan điều kiện đúng hiện tại ở MDX 4.8 `Ngay >= @TuNgay` và hai SELECT cụ thể.
- **Câu gốc:** `const extra=[{...row,Ngay:'2026-08-31'},{...row,Ngay:'2026-10-01'},…]` và kỳ vọng vẫn 18.
- **Tác động:** các dòng biên đang thêm bảo vệ loại ngày trước đầu dưới và loại đầu trên; chưa bảo vệ việc **giữ ngày đúng @TuNgay**. Seed không có công ngày 01/09 (ngày lễ), nên đổi `>= @TuNgay` thành `> @TuNgay` vẫn chọn cùng 18 dòng. Đổi dấu tương tự ở hai SELECT cũng không bị goldens hiện tại phân biệt. Đây là gap test của ý “hai biên ngày không trượt”, không phải lỗi SQL hoặc lời giảng đang giao.
- **Căn cứ tự kiểm:** public seed/cách sinh cho NV043 bắt đầu 07/09; test chỉ thêm 31/08 và 01/10 ngoài khoảng. So quan hệ thuần cho thấy dòng giả định đúng 01/09 phải được giữ bởi >= và bị mất bởi >. Reviewer không chạy test hay mutation suite; kết luận về độ phân biệt đầu vào dựa trên source assertion và tập ngày tự tính.
- **Đề xuất:** trong override thêm một dòng NV043 đúng 01/09, kỳ vọng COUNT tăng thành 19; áp điều kiện biên cho SELECT thân mẫu và các SELECT độc lập cần bảo vệ. Giữ 31/08, 01/10/mã khác, không thay dữ liệu seed hoặc cố chạy ngày lễ thật.

Không có finding cần sửa nội dung học, số liệu, YAML, API hoặc component đủ căn cứ ở head này. Hai finding thấp nằm ở mức bảo vệ regression; không dùng chúng để suy ra các Result hiện tại sai.

## Đối chiếu năm Review Focus

| Focus | Kết luận ở head được giao | Căn cứ và phần còn lại |
|---|---|---|
| 1. Vắt tháng/ngày nghỉ/đơn chồng; NV043 không lệch nhầm | **Giữ được ở source và tính thuần.** Chỉ phép năm đã duyệt giao lịch 20 ngày, DISTINCT ngày theo mã; DP018 góp 2, NV043 20 khớp. | Reviewer tự tính lịch/seed và đối chiếu literal. Các override pending/chồng/ngoài tháng do tác giả chạy fixture, reviewer chỉ đọc test. Chưa SQL Server live. |
| 2. Thiếu khác 0; đúng mức/mã/kỳ trước kết | **Giữ được ở source.** UNION ALL+SUM tổng hợp trước, lương lọc kỳ, FULL và kiểm mã NULL giữ phía vắng. | Static schema/SQL và Result trích thống nhất; tác giả có override đúng ý. Không suy ra source đầy đủ thiếu mã từ hai bản trích. Chưa thực thi FULL trên SQL Server. |
| 3. EXCEPT chiều/cặp/DISTINCT/NULL, minh họa không nộp nguyên | **Giữ được ở source và quan hệ thuần.** Phía lương trả 20/19, phía đối chiếu trả 19/18; ma trận minh họa×đề đều khác. | SQL/Result/đề nhất quán; pure set duplicate/NULL đúng hợp đồng. Tác giả có fixture checks. Chưa engine/grader live hoặc metadata decimal/collation. |
| 4. Procedure mẫu; ba tham số/ngày/COUNT; đường học | **Nội dung/source/HTML giữ được; bảo vệ ngày đầu dưới còn F2.** CREATE/EXEC chỉ đọc/không Result; SELECT độc lập khớp thân sau thay đủ 3 tham số; COUNT chỉ đọc ChamCong. | Reviewer kiểm template, dates, HTML và phép tính 18 + 2. Không mở EXEC/tạo đối tượng. Tương tác web/SSMS và live vẫn chưa kết luận. |
| 5. Ô/ngày/con số trước định nghĩa; giới hạn đúng chỗ | **Giữ được ở source/HTML.** 4.7 có bảng công/lịch/đóng góp; 4.8 có phiếu/dòng/đếm. Lời giới hạn runner được gói trước mẫu, tên thủ tục không chứng minh chỉ đọc được chốt ở phần chính rồi ôn lại. | Đối chiếu mốc 2.1/2.5/2.8 và learner reports. Không đòi quota component hoặc prose snapshots. Tải đọc/thời lượng thật, hình học và thao tác chưa kiểm. F1 là test format riêng, không phủ định nhịp dạy. |

## Declined-to-judge / chưa kết luận

Các mục dưới là những hành vi đã cân nhắc nhưng chưa thể chốt trong quyền/công cụ được giao; cần tác giả disposition rõ, không được đổi thành “đã đạt” chỉ vì có HTML hoặc log fixture.

| Mục | Lý do / ranh giới nhận định | Việc tác giả cần xử lý hoặc ghi nhận |
|---|---|---|
| Cú pháp/thực thi T-SQL, kiểu decimal/date, metadata, collation; kết quả cả ba answer trên database khóa học | Reviewer bị giới hạn không SQL; helper dùng SQLite/nguồn tính số ngày, không bảo đảm SQL Server. Log live tác giả dừng do thiếu 4 env, chưa có engine pass. Source xem có cấu trúc hợp lý không thay được phép chạy. | Khi có môi trường được phép, kiểm SELECT/answer bằng luồng được duyệt và ghi dữ liệu/checksum thực; nếu chưa có, giữ live pending trong bàn giao. Không tạo procedure hoặc mở guard để kiểm. |
| API live, xác thực/mã truy cập, run/submit/grade, schema/giá trị thật, rate/timeout/rollback | API build/typecheck và guard source không phải gọi endpoint; reviewer không API/runner và không thay cấu hình. | Giữ chưa kiểm live; nếu tác giả có điều kiện sau đó thì ghi thao tác/kết quả thật, không lấy81 đề đóng gói làm81 đề đã chạy. |
| Runtime helper ở Node 22/24 và toàn bộ test suite sau các sửa tương lai | Reviewer đọc log 331/50 và source, không chạy suite; F1/F2 chưa được sửa ở head này. SQLite không có bộ chặn tổng quát cho mọi khác biệt dialect, dù có thông báo và guard hẹp cho CAST/VALUES. | Xử lý F1/F2 rồi chạy kiểm phù hợp trên source cuối; tiếp tục gọi utility là fixture subset. Không hứa “mọi T-SQL sai đều bị từ chối”; ngoài subset cần kiểm engine hoặc ghi giới hạn. |
| Clipboard/copy-paste thật, tab rộng 4 cột, viewport/cuộn ngang/layout, keyboard/details/focus và tương tác khác | Đã kiểm chính xác text SQL/payload/ô/marks trên HTML; chưa browser và chưa nhìn hình học. `tab-size:4` trong source không chứng minh clipboard hay render thật. Hai bài không thêm RunFlow, nên không có drawer mới cần giả báo đạt. | Khi có phép kiểm UI thì thử các thao tác/viewport cụ thể; nếu chưa, giữ từng mức tương tác pending. Không dùng nhãn Query executed successfully của component làm evidence chạy. |
| Hành trình web cho SELECT độc lập ở bài 4.8, đăng nhập/đi tới ô thực hành, nút hoàn thành và lưu/nhập/xuất tiến độ | Source hiện có cho phép chạy SELECT tùy ý trên trang bài tập; 4.8 không có YAML/route riêng, hai nút copy tồn tại và footer noExercises đúng. Chưa thực sự đi từ bài 4.8 tới một workspace, dùng mã, chạy, đánh dấu hoặc khôi phục trạng thái. Không đổi editor/store nên chưa có căn cứ báo regression nháp. | Ghi source path đã đọc và interaction chưa kiểm. Nếu kiểm UI sau, xác nhận người chỉ chọn web theo được đường kiểm và hoàn thành theo năm câu ôn; không ép tự kết nối SSMS. |
| Menu SSMS, quyền xem định nghĩa, quyền chạy thực tế hoặc hành vi của thủ tục lạ | Câu đã sửa có chọn đối tượng/nhấp phải và tên cửa sổ đầy đủ. Reviewer chỉ thấy source và evidence tác giả đã đối chiếu Microsoft; không SSMS/browser, không mở link nguồn ngoài để tự xác minh phiên bản/menu. | Giữ thao tác SSMS chưa kiểm thực; không tuyên bố user hiện có quyền xem/chạy hay thủ tục cùng tên đã tồn tại. Không cần đưa thêm triển khai/quản trị vào bài đọc hiểu. |
| Tính đúng nghiệp vụ nhân sự ngoài mô hình, chấm đủ giờ/nửa ngày, phép trùng công hoặc phép nhiều loại chồng nhau, tính tiền | Bộ mẫu chốt một dòng công tính một ngày, seed hiện không có phép chồng nhau; DISTINCT giải riêng việc lặp ngày phép. Helper không mô phỏng mọi quy tắc hoặc seed bất hợp lệ (seed còn có PK ngày nghỉ trung gian). Không có yêu cầu biến bài thành công cụ tính lương. | Giữ giả định bộ mẫu; không mở rộng kết luận sang hệ thống thật hoặc tính tiền. Nếu dữ liệu/luật thay thì cần thiết kế kiểm riêng, không tự sửa seed trong đợt này. |
| Thời lượng 45/25 phút, khả năng mọi người mới tự học, mức tải đọc thật | Learner review và so mốc phần 2 hỗ trợ mạch kể; chưa có quan sát học viên/timing hoặc browser. Không có căn cứ đủ để yêu cầu cắt SQL/đổi quota hình chỉ từ độ dài. | Có thể giữ ước lượng như disposition từng bài; không quảng bá là thời lượng đã đo hoặc bảo đảm tự học. Điều chỉnh sau quan sát thực tế nếu cần. |
| Source/build sau sửa, remote đã đăng/chưa đăng và quyền push/merge/deploy | Report cố định tại head 070fd5a và 21 hash; chỉ đọc Git local. Không kiểm remote hosting, không suy approval từ learner/integration. | Lưu disposition mọi finding/giới hạn, đối chiếu bản cuối nếu sửa; chỉ push/merge/deploy theo quyền người dùng, không lấy kết luận report làm quyền thao tác. |

## Kết luận

Tại head `070fd5a2797f5463e8ef60061d1e20189f626875`, mạch 4.7–4.8, tiền đề, đơn vị, ngày công/phép, hai chiều EXCEPT, scope bài tập/API và noExercises nhất quán. Kiểm thuần từ public seed và đối chiếu source→HTML không thấy sai số liệu hoặc khối minh họa. Có **hai finding thấp F1/F2 về độ bảo vệ test** cần tác giả xử lý/disposition trước khi chốt hồ sơ cuối; không cần đổi seed, component, guard, API hay triển khai procedure.

Đây là kết luận source/HTML/tính thuần. SQL Server live, API/grader thật, UI tương tác, SSMS và thời gian học vẫn chưa được reviewer xác minh; evidence tác giả được giữ riêng như trên. Kết luận không thay quyền push, merge hoặc deploy.
