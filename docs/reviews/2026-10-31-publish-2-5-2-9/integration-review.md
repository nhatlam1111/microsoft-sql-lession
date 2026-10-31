# Review tích hợp độc lập trước xuất bản bài 2.5–2.9

Ngày: 31/10/2026. Reviewer: Codex, **kế thừa model của phiên**; không chỉ định hoặc đoán model khác, không phân reviewer con.

## 1. Phạm vi, phiên bản và cách kiểm

- Base: `9a0762b393cc2674f262bf0ffa88f43cb4911c18`; head thực đọc: `ee6e1b9d8b13974e216b800b3ab8f9fab4d4e467`, nhánh `feat/lesson-2-5-null`. Có 15 commit, 58 file trong range. Khi nhận việc chỉ có hai hồ sơ xuất bản chưa commit; không có source sản phẩm sửa sau head.
- Diff giao tại `temp/verification/2026-10-31-publish-2-5-2-9/release-range.patch` khớp văn bản với `git diff --binary base head` sau chuẩn hóa xuống dòng. Đã đọc toàn bộ bản cuối MDX 2.5–2.9, YAML 15 đề, component/lib RunFlow, CSS thay đổi, test liên quan; đọc 1.1, 2.1–2.4 để nối nền, và các phần 3.x/4.x chịu ảnh hưởng.
- Đã đối chiếu SHA256 bằng cách đọc file: **38/38 file source và 128/128 HTML được liệt kê trong manifest khớp**, không có mismatch. Con số 128 chỉ là tập HTML manifest; không gọi đây là tự đếm đủ 129 trang của build.
- Kiểm tĩnh bằng PowerShell, `Get-Content`, `rg`, `git status/rev-parse/log/diff/show`, `Get-FileHash` và tách HTML có sẵn. Không chạy test, build, compiler, SQL, API/runner; không đọc `database/HRM_Demo.sql`, `.env` hoặc secret; không dùng browser, không nộp bài, không sửa Git/source/test/docs.
- HTML thực đọc: các drawer của 2.5–2.9, 3.4, 3.8, 4.1, 4.3 trong `dist/bai/<slug>/index.html`. Đọc HTML xác minh được chữ, cột, hàng, nhãn, markup SQL; không chứng minh thao tác bàn phím, copy/paste, viewport hoặc SQL đã chạy.
- Áp dụng AGENTS.md và quy ước/template hiện hành. Các spec ngày 31/10 là lịch sử quyết định: giữ query tô sáng ở đầu drawer, ba phần Đầu vào/Thực hiện/Kết quả, bỏ câu SQL kiểm riêng và phần Excel; phần UNKNOWN/CASE đã được mở rộng sau spec drawer ban đầu.
- Góc đọc: người chỉ biết Excel văn phòng cơ bản, chưa biết SQL/lập trình. Đã đọc phần giảng trước YAML, xác định tiền đề từ yêu cầu từng đề rồi đối chiếu answer. Đây là review tích hợp có xem answer và evidence tác giả, **không phải học thử mù hoặc một lượt làm bài thực tế**.

## 2. Kết luận và ưu tiên

**Không tìm thấy mục Cần sửa, Cần cắt hoặc Biên tập có căn cứ để yêu cầu đổi source trong range này.** Mạch 2.4→2.9 và 15 đề không còn lỗ tiền đề nhận diện được bằng kiểm tĩnh. Các sửa cuối theo review từng bài đã hiện diện, gồm `IS NOT NULL`, cú pháp DISTINCT nhiều cột, Latin1 collation, ví dụ hàm ngày trên ngày chốt, đầu vào SELECT và ghi chú ELSE.

Có hai mục **Cần làm rõ trong hồ sơ bàn giao**, không yêu cầu đổi ID, editor hoặc grader: hệ quả nháp/hoàn thành cũ khi đề đổi (I3), và giới hạn chấm theo giá trị đối với collation (I4). Các giới hạn bài cũ, màn hẹp và phần chưa kiểm độc lập nằm riêng ở mục 6. Không có căn cứ từ range này để coi chúng là lỗi mới bắt buộc chặn merge; tác giả cần lưu quyết định xử lý theo mục 4.6.

Kết luận này không thay bằng chứng SQL/UI của tác giả, không xác nhận mọi học viên tự học được và không cấp quyền merge/push/deploy.

## 3. Rà theo mạch bài và công cụ

### 3.1 Mạch 2.4→2.9 — Giữ được

| Bài | Điểm nối và câu hỏi người mới cần được trả lời | Kết quả đọc bản cuối |
|---|---|---|
| 2.4→2.5 | Đã biết chọn cột, lọc, AND và sắp; vì sao ô trống cần cách lọc khác, nhãn nằm ở đâu? | 2.5 định nghĩa NULL khác 0/chuỗi rỗng, giải thích UNKNOWN và WHERE chỉ giữ Đúng; tách IS NULL ở WHERE với COALESCE ở SELECT. Cùng NV044 có hai NULL với hai nghĩa theo quy ước. Kết quả 8 hồ sơ VH và nhãn duy nhất NV044 khớp hồ sơ công ty và các bảng hiển thị. |
| 2.5→2.6 | Nhiều người cùng phòng có phải nhập trùng; chọn hai cột thì so trùng thế nào? | 2.6 nói rõ cả dòng kết quả, viết DISTINCT một lần, cột cách nhau bằng dấu phẩy, WHERE lọc trước. Phạm vi mọi trạng thái rõ, 6 mã khác danh mục phòng đầy đủ; 19 cặp và 48 dòng khi thêm MaNV được nêu đúng đơn vị. Không lấy DISTINCT làm công cụ sửa dữ liệu nguồn. |
| 2.6→2.7 | Cắt/ghép chữ để làm gì, hàm lồng đọc từ đâu, Unicode khác luật so sánh ở đâu? | Nhãn 007 - BÙI THANH SƠN cho mục đích in phiếu, hàm trong trước hàm ngoài. LEFT/SUBSTRING/LOWER/TRIM được giải nghĩa tại bảng; NULL qua UPPER rồi CONCAT được nối bằng quan hệ nguyên nhân. Collation có định nghĩa, CI/AS/AI được giải thích, N giữ ký tự và COLLATE chọn luật so sánh được tách rõ. Không mặc định người học biết công thức Excel trước khi đọc. |
| 2.7→2.8 | Cộng ngày, đếm ngày và đủ năm có giống nhau; tại sao dùng ngày chốt? | CAST, GETDATE, DATEADD, DATEDIFF, MONTH, EOMONTH đều có nghĩa và ví dụ. Có lời giải vì sao cần hàm thay phép trừ date, vì sao CAST, vì sao 30 ngày khoảng cách cho 31 ngày lịch khi lấy hai đầu. 21/10→20/11/2026, 3 hợp đồng và 10/23/24 ngày nối được trong toàn bài. Giới hạn hợp đồng khác người phải gia hạn được giữ. |
| 2.8→2.9 | Dùng mốc đủ năm thành nhãn thế nào; tại sao 3 năm phải trước 1 năm; ELSE làm gì? | CASE được định nghĩa là biểu thức trả một giá trị, WHEN/THEN/END/ELSE được giải thích trước phần ôn. NV025 chỉ đủ 3 năm vào 01/11/2026, NV003 thỏa hai điều kiện nhưng dừng nhánh đầu; thiếu ELSE ra NULL được dạy ở phần chính. Bản chốt, trạng thái hiện tại, ngày không sau mốc và quy tắc nghiệp vụ được phân biệt. 33+8+4 nối với 45 hồ sơ. |

Cả năm bài có đúng hai tiểu mục chính, Excel→câu lệnh→LineMap rồi RunFlow→Result→câu trả lời. Câu lệnh chính giải đúng yêu cầu được kể; không dùng bài tập hoặc tự kiểm tra để dạy bù kiến thức cốt lõi. 2.7 có bốn, 2.8 có ba câu tự kiểm tra, đều sau Ghi nhớ và trước Bài tập. Các thuật ngữ khó có lời giải tại chỗ; không thấy nhu cầu thêm bảng định nghĩa cho mọi mã dữ liệu.

Các câu “Ở bài này chỉ cần…” giữ ranh giới: tổng hợp/đếm sang 3.1–3.2, kết bảng sang 3.4, chất lượng dữ liệu sang 4.6. 2.4 trỏ NULL sang 2.5 không bắt buộc 2.5 giảng thêm vị trí NULL khi sắp, vì tình huống và đề hiện tại không cần nó. Nhìn tĩnh, thời lượng 12/15/18/20 phút không có phép đo mới để chứng nhận.

### 3.2 Nối đầu vào, bảng soi và kết quả

Các số sau là **số source/HTML công bố**, được đối chiếu nối giữa các bước; không phải kết quả SQL do reviewer chạy.

| Luồng | Cột/hàng thực thấy ở đầu vào cần xét | Nối sang kết quả |
|---|---|---|
| 2.2 WHERE | MaNV/MaPB/TrangThai, gồm NV001 bị loại và NV020 đã nghỉ được giữ | So MaPB đúng một điều kiện; tổng 14/14, sau SELECT đủ bốn cột. |
| 2.3 WHERE | MaNV/MaPB/NgayVaoLam, đủ NV002/NV003/NV030/NV043 | Hai điều kiện trên từng dòng, có đúng/sai chéo nhau; tổng riêng 24/3 rồi 2 giữ, không dựng phễu lọc nhiều lượt. |
| 2.4 WHERE/SELECT/ORDER BY/TOP | Trạng thái ở bước lọc; SELECT có mã/tên/phòng/ngày; sắp có mã và ngày | 48→45→45→45→5, NV001 có từ nguồn; bước TOP viết trên dòng SELECT nhưng xét sau sắp được nói rõ. |
| 2.5 WHERE | inputColumns bổ sung MaPB, nên thấy VH/KD và NgayNghiViec của cả bốn mã trong checks | NV033 bị loại do đã có ngày; NV045 bị loại do KD; NV008/NV044 giữ. 10/45/8 là tổng riêng trên 48. SELECT thấy MaNV/HoTen/Email, NV044 còn NULL trước khi thành nhãn. 48→8→8→8. |
| 2.6 SELECT/DISTINCT | Năm mã KT/KD/KD/BGD/KT hiển thị ở đầu vào DISTINCT | Có dòng lặp thực thấy, 48→48→6→6; DISTINCT và ORDER BY được tách. Bảng trích 5/6 mã ở đầu vào sắp không bị gọi là toàn bộ kết quả. |
| 2.7 WHERE/SELECT | WHERE thấy MaPB; SELECT nhận MaNV/HoTen/MaPB, đủ nguồn của RIGHT/UPPER/LEN | NV003 loại, NV007/NV011 giữ; 48→10→10→10. Ba số cuối vẫn là chuỗi, nhãn chữ hoa có dấu và 14 ký tự dài nhất ở NV035/NV046 khớp giữa lời và các bảng. |
| 2.8 WHERE/SELECT | WHERE thấy đủ năm MaHD và NgayKetThuc; SELECT thấy cả mã NV, ngày bắt đầu và kết thúc nhờ inputColumns | HD2015-001 NULL hiện UNKNOWN/UNKNOWN/Loại; hai mã giữ trong bảng soi có ở kết quả, HD2026-004 là dòng thứ ba có thật trong bảng kết quả trích. Tổng riêng 20/13/3, không suy tổng 55 chỉ từ năm dòng minh họa. 55→3→3→3. |
| 2.9 WHERE/CASE | WHERE thấy ngày/trạng thái; CASE thấy MaNV/HoTen/NgayVaoLam của NV003/NV025/NV045 trong năm dòng đầu | WHERE 45/48/45; CASE lần lượt Đúng/Không xét, Sai/Đúng, Sai/Sai với nhãn khớp Result. Chân bảng 33/8/4 có ghi ô cuối là ELSE. 48→45→45→45. |

`inputPreview` lấy tối đa năm dòng, dùng inputColumns nếu có; `checkTable` chặn mã ngoài năm dòng đầu, độ rộng bảng, số giữ khác total và mâu thuẫn giữ/loại với hàng kết quả. Với CASE, code phân biệt null sau nhánh đúng và nhãn; `checkCellText` hiển thị null là UNKNOWN cho lọc, Không xét cho nhánh. Đã đọc các test bảo vệ này, **không thực thi chúng**.

HTML 2.5–2.9 đều có đúng ba nhãn, không có nút Sao chép/câu kiểm riêng hoặc Liên hệ Excel trong panel. Query tô sáng ở đầu drawer vẫn còn theo quyết định đã duyệt. HTML kiểm không có ký tự literal `\t`; MDX dùng escape tab và CSS giữ `tab-size: var(--sql-tab-size)`. Điều này chưa thay cho thử copy/paste và đo thụt lề bằng browser.

### 3.3 Tương thích các bài dùng chung RunFlow

- **UNION 3.8:** source có đúng SELECT/SELECT/UNION/ORDER BY. `inputSteps` cho hai nhánh đầu nguồn riêng, bước UNION nhận cả hai; HTML có hai bảng đầu vào phân biệt bước 01 và 02, mỗi bảng trích 5 dòng từ tổng 9/76, kết quả công bố 41. Không có đường dữ liệu từ nhánh 01 sang 02. Không suy đây là thứ tự thực thi vật lý.
- **JOIN 3.4/3.5:** bước JOIN vẫn nhận bảng trái trước đó; mã và dữ liệu đầu vào/kết quả của các ví dụ không bị thay đổi trong range. Chưa có bảng phải là giới hạn đã duyệt, không gọi là đã minh họa đủ hai nguồn.
- **CTE 4.1/4.3 và bước đầu không có `input`:** câu mặc định “Bước này không nhận dữ liệu từ bước nào trước đó trong sơ đồ.” không còn hứa lấy trực tiếp bảng gốc. Câu 4.1 về WITH nằm ở query đầu drawer khớp HTML thật; không còn trỏ người học tới SQL kiểm riêng đã bỏ.
- **Lời 3.x/4.x đã đổi:** đối chiếu các hunk 3.2/3.3/3.4/3.7/3.9/3.10/4.1/4.2/4.3 cho thấy chuyển lời từ “câu kiểm” sang bảng trích/khối query đúng thứ đang tồn tại. Hai câu còn “câu kiểm” ở 3.6:91 và 4.1:80 nói về phần thân bài, không hứa nút SQL trong drawer; chưa có căn cứ sửa hàng loạt.
- Frontmatter `excel` của bài vẫn giữ. Diff không mở rộng danh sách cho phép bố cục cũ; năm slug 2.5–2.9 được gỡ khỏi danh sách chờ hai tiểu mục. Một số test từng đọc Result phụ đã đổi sang bảo vệ ý nghĩa/số liệu; không thấy bỏ bảo vệ chỉ để giữ bài theo khuôn mới.

## 4. Bảng tiền đề 15 bài tập

Các đề đều dựa trên SELECT/FROM/alias ở 2.1, WHERE ở 2.2, kết hợp điều kiện ở 2.3 và ORDER BY ở 2.4 khi có yêu cầu tương ứng. Bảng ghi thêm phần quyết định của mỗi đề; không chép đáp án. Đã đối chiếu YAML sau khi nhận diện kiến thức cần dùng; không thấy answer đòi thêm kiến thức chưa dạy. “Đủ” ở đây là đủ tiền đề đọc được, không phải đã chạy/nộp đạt.

| Đề, vị trí prompt trong YAML | Cần biết theo yêu cầu | Đã được dạy ở đâu | Còn thiếu |
|---|---|---|---|
| 2-5-1, `2-5-null-o-trong.yaml:6` | Chọn ô đã có ngày; không tự thêm trạng thái; mã tăng | 2.5:63 giải thích IS NOT NULL trực tiếp trên NgayNghiViec; 2.4 giải ASC | Không thấy. |
| 2-5-2, cùng file:22 | KD đồng thời email khác NULL; có giá trị không đồng nghĩa liên hệ được | 2.3 AND; 2.5:63 và Phạm vi đầu bài | Không thấy. |
| 2-5-3, cùng file:39 | Giữ mọi KD, chỉ thay email NULL bằng nhãn Unicode, email thật giữ nguyên | 2.5 LineMap COALESCE và :65 phân biệt lọc/hiển thị, chuyển kiểu giữ dấu | Không thấy; đổi phòng không đổi kỹ năng cần dùng. |
| 2-6-1, `2-6-distinct-bo-dong-trung.yaml:6` | Mỗi MaCD một lần, không lọc, tăng | 2.6 câu chính/LineMap và :58 gọi MaCD là mã chức danh | Không thấy. |
| 2-6-2, cùng file:20 | Lọc hai phòng, mỗi cặp MaPB/MaCD một lần, sắp hai cấp | 2.3 IN/OR; 2.6:58 cú pháp/cả dòng, :60 sau WHERE; 2.4 nhiều cột | Không thấy. |
| 2-6-3, cùng file:36 | Có ngày nghỉ rồi lấy mã phòng không trùng, giảm | 2.5:63; 2.6:60; 2.4 DESC | Không thấy. |
| 2-7-1, `2-7-ham-chuoi-tieng-viet.yaml:6` | LEFT, lấy từ vị trí 3, giữ số 0 trong chuỗi; lọc KT | 2.7 bảng hàm :70–71, giải RIGHT và Hay nhầm 1 | Không thấy. |
| 2-7-2, cùng file:23 | LIKE đầu chuỗi không dấu/hoa thường, giữ tên gốc và LEN | 2.3 LIKE/%; 2.7 LineMap LEN, :75 giới hạn LEN, :79 collation và vị trí COLLATE | Không thấy; giới hạn chấm cú pháp ở I4. |
| 2-7-3, cùng file:40 | Giữ email nguồn NULL, UPPER rồi CONCAT với ngoặc, không thay bằng nhãn thiếu | 2.7 câu chính/hàm lồng và :75 giải UPPER(NULL), CONCAT(NULL) cùng ví dụ [] | Không thấy. |
| 2-8-1, `2-8-ham-ngay-tham-nien.yaml:6` | Ngày chốt, cộng một tháng rồi lấy MONTH, so với tháng sinh bất kể năm | 2.8 LineMap CAST, :66 DATEADD month, bảng :76–79 có MONTH và ví dụ lồng trên ngày chốt; 2.7 hàm trong trước | Không thấy; “sau” xác định được chiều cộng. |
| 2-8-2, cùng file:24 | Đang làm, ngày vào không sau chốt, mốc một năm sau chốt; trả mốc, sắp ngày rồi mã | 2.8:66/70 giải mốc DATEADD khác ranh giới DATEDIFF; đề chỉ rõ bỏ đúng ngày mốc; 2.3/2.4 | Không thấy; không cần công thức tính năm tròn mới. |
| 2-8-3, cùng file:46 | Bỏ ngày chốt, giữ cuối tháng, EOMONTH trên ngày chốt, DATEDIFF day | 2.8 câu chính/LineMap, :68 hai đầu khoảng, bảng :78 EOMONTH trên ngày chốt, :81 NULL | Không thấy; độ phân biệt `>`/`>=` trên dữ liệu hiện có ghi ở mục 6. |
| 2-9-1, `2-9-case-when-ham-if.yaml:6` | Một WHEN và ELSE cho đủ/chưa đủ năm, lọc đúng IT/đang làm/ngày | 2.8 mốc đủ năm; 2.9:41/LineMap/71 CASE, WHEN, THEN, ELSE, END | Không thấy. |
| 2-9-2, cùng file:28 | Ba nhánh tại ngày chốt khác, cả KD đã nghỉ; không tính dừng ở nghỉ việc | 2.9:67–71 mốc kỷ niệm/thứ tự nhánh; 2.2/2.3 điều kiện phạm vi; đề nêu rõ cách xử lý hồ sơ nghỉ | Không thấy; không cần dựng trạng thái quá khứ. |
| 2-9-3, cùng file:53 | Một WHEN, bỏ ELSE để trả SQL NULL, giữ hồ sơ chưa đủ | 2.9:71 bỏ ELSE nhận NULL và :73 CASE không thay WHERE; 2.5 NULL khác chuỗi | Không thấy. |

Không đề nào đòi JOIN, biến SQL, COUNT/GROUP BY hoặc kỹ thuật bài sau để làm được. Những nhãn/cột tên gợi ý nằm trong đề, không cần suy từ answer.

## 5. Findings và đề nghị xử lý

### I1 — Giữ được: kiến thức chuyển tiếp và giới hạn có tác dụng

- Vị trí/câu gốc: `2-5-null-o-trong.mdx:63`, “Kiểm ô đã có giá trị thì viết IS NOT NULL”; `2-6-distinct-bo-dong-trung.mdx:58`, “DISTINCT so cả dòng kết quả”; `2-8-ham-ngay-tham-nien.mdx:70`, “Muốn kiểm đã đủ số năm, hãy so mốc tạo bằng DATEADD”; `2-9-case-when-ham-if.mdx:71`, “Bỏ ELSE thì dòng không khớp nhánh nào nhận NULL”.
- Tác động: người mới có lời giải trước khi gặp đề, không cần đoán hàm đối xứng từ IS NULL, tự sáng tác DISTINCT nhiều cột hoặc dùng DATEDIFF(year) thay năm tròn.
- Căn cứ: bản cuối, bảng tiền đề mục 4 và ý nghĩa trong drawer/Result khớp nhau. Đề nghị: giữ, không thêm bài giảng phụ chỉ để tăng độ dài.

### I2 — Giữ được: UNKNOWN và nhánh CASE phân biệt đúng trong phạm vi hiện dùng

- Vị trí/câu gốc: `src/lib/run-flow.ts:90`, `cell === null` cho UNKNOWN hoặc Không xét; `RunFlow.astro:125` chọn “Bảng soi từng nhánh” khi có labels; 2.9 CASE có `['NV003', true, null]`.
- Tác động: không biến so sánh NULL thành Sai, không tạo cảm giác CASE vẫn xét nhánh sau khi đã dừng. Ghi chú chân bảng nói rõ 4 là số vào ELSE, tránh nhầm là tổng giữ.
- Căn cứ: đọc logic, test liên quan và HTML 2.8/2.9 thực có đúng các nhãn/cột/hàng. Đề nghị: giữ; tổng và tính đúng của SQL vẫn cần bằng chứng tác giả.

### I3 — Cần làm rõ trong bàn giao: giữ nháp và hoàn thành theo ID khác với tự cập nhật bài làm cũ

- Vị trí/câu gốc: `src/lib/exercise-storage.ts:3`, `sqlserver-course:draft:${id}`; `ExerciseWorkspace.tsx:28`, `loadDraft(exercise.id)`; `src/lib/progress.ts:63`, giữ hoàn thành theo ID; YAML 2.5:39 đổi phạm vi thành KD.
- Tác động: người có nháp cũ 2-5-3 chứa VH sẽ mở đúng nguyên nháp, nhưng nó không còn đáp ứng phạm vi KD mới. Dấu hoàn thành từ trước vẫn tồn tại; không thể dùng dấu đó để chứng minh đã làm phiên bản đề mới.
- Căn cứ: ID không đổi trong diff, load/save không có revision đề; API/editor/storage/progress không đổi. Đây là hệ quả tương thích, không phải mất nháp hoặc lỗi cần đổi ID trong lượt merge.
- Đề nghị: ghi quyết định chấp nhận trong hồ sơ publish và lời bàn giao rằng khi làm lại 2-5-3 cần đọc phạm vi mới. Không tự xóa/migrate nháp hoặc lịch sử. Chưa thử trình duyệt với dữ liệu nháp người dùng.

### I4 — Cần làm rõ trong bàn giao: chấm đúng giá trị không xác nhận tuân thủ tên collation

- Vị trí/câu gốc: `src/content/exercises/2-7-ham-chuoi-tieng-viet.yaml:23`, “bằng collation Latin1_General_CI_AI”; hồ sơ `docs/reviews/2026-10-31-lesson-2-7/verification.md`, hai collation đều cho hai dòng trên đề này.
- Tác động: bài làm/nháp cũ dùng Vietnamese_CI_AI có thể vẫn nhận đúng vì kết quả trùng; dấu đúng không chứng minh người học dùng quy tắc tìm không dấu đã giảng. Người học vẫn có đủ lời giải đúng trong bài.
- Căn cứ: giới hạn bộ chấm theo giá trị đã được bài 2.1 nói rõ; evidence hai collation là kết quả tác giả, reviewer không chạy lại. Diff sửa prompt/answer nhất quán và không sửa grader.
- Đề nghị: giữ phạm vi grader hiện tại, ghi giới hạn này; không mô tả runner hay dấu đúng là kiểm cú pháp collation. Không yêu cầu thay dữ liệu mẫu chỉ để tạo khác biệt trong đợt merge này.

## 6. Hành vi đã cân nhắc, ngoài phạm vi hoặc chưa kết luận

| Điểm | Đánh giá và lý do | Việc còn để tác giả quyết định/xác minh |
|---|---|---|
| Drawer cố định 440px ở màn 390px | `src/styles/lesson.css:207` giữ nguyên đúng dòng từ base. Evidence UI mới của tác giả ghi drawer cắt bên trái, topbar/trang tràn; reviewer không mở browser. Đây là lỗi responsive nền, không phải đã đạt mobile. | Ghi ngoài phạm vi hoặc mở việc sửa riêng. Chưa thấy căn cứ quy lỗi phát sinh do range hoặc chặn merge riêng đợt này. |
| JOIN chỉ có bảng đầu vào trái | Có trong thiết kế đã duyệt; chưa thêm input nêu bảng phải ở các bài cũ. Kết quả vẫn thấy thông tin được kết, phần thân bài còn giải quan hệ. | Không gọi UI này là minh họa đủ hai nguồn; bổ sung khi chuyển bài JOIN, không chuyển cả level trong lần này. |
| Cột đầu vào bài 3.x/4.x chưa đủ cho mọi phép tính | Ví dụ HTML 4.3 SELECT đầu vào mặc định chỉ Thang/TongNgay/LuyKe, chưa thấy KyTruoc để tự tính chênh lệch. 3.4 SELECT cũng chưa thêm HoTen vào inputColumns. Quyết định hiện tại hoãn viết lại các bước sau 2.9. | Chấp nhận giới hạn có ghi nhận, kiểm đủ cột khi bài đó đến lượt; không tuyên bố tất cả drawer khóa học đã đạt chuẩn nội dung mới. |
| Mẫu UNION chỉ nhận đúng bốn bước | isUnionFlow khóa SELECT/SELECT/UNION/ORDER BY; đúng cấu trúc hiện tại 3.8 và template. | Chỉ cần mở rộng nếu có bài dùng hình thức khác; không có trường hợp hỏng cụ thể trong source được giao. |
| Bảng soi lọc dùng AND; null của CASE nghĩa là bỏ qua | Chưa mô hình OR hoặc UNKNOWN của một WHEN đã được xét. CASE hiện dùng ngày NOT NULL, đủ false trước/skip sau; không có dữ liệu cần biểu diễn UNKNOWN ở nhánh. | Không dùng kiểu hiện tại cho CASE khác có UNKNOWN mà không mở rộng biểu diễn; chưa yêu cầu mở rộng trước khi có bài cần. |
| Validator không phải máy tính SQL | checkTable kiểm hình dạng/liên kết/số tổng, không tính đúng/sai từ literal SQL. Ví dụ labels chỉ đối chiếu với hàng kết quả khi hàng đó có trong trích; code không tự chứng minh count SQL. | Các hàng CASE hiện tại đều có trong input/result, không thấy mismatch thực tế. Giữ SQL live của tác giả là nguồn kiểm riêng; không quảng bá build thành chứng minh số liệu đúng. |
| Đề 2-8-3 không phân biệt `>` với `>=` bằng kết quả | Evidence tác giả cũ nói không có hợp đồng kết thúc đúng ngày chốt. Đề đã nói rõ bỏ ngày chốt; phần giảng dạy hai đầu. | Giữ phạm vi/seed như đã quyết định; không dùng một lần chấm đạt làm bằng chứng đã hiểu mọi điểm biên. |
| Kiến thức/giới hạn ngoài phạm vi | Sắp NULL, mọi loại khoảng trắng, CASE với hàm tổng hợp/biểu thức lỗi, kiểm dữ liệu nguồn, hiệu lực pháp lý hợp đồng không cần để giải 15 đề này. | Không thêm đoạn rào hoặc mở rộng bài vì ngoại lệ không hiện diện. |
| UI/SSMS/SQL và thời lượng | Không kiểm độc lập các thao tác này; chưa thử screen reader, clipboard, nháp thật, submit/xác thực production hoặc đo thời gian học. | Dùng evidence tác giả đúng phiên bản cho phần đã thử; giữ các giới hạn chưa thử. |

## 7. Nguồn và bằng chứng tác giả

Đã đọc AGENTS.md, `docs/quy-uoc.md` (đặc biệt 2.1, 2.4, 2.6, 4.4–4.6, 5), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`; bài mẫu 1.1/2.1, các bài 2.2–2.9; bốn cặp spec/plan ngày 31/10 cho lesson-2-5, lessons-2-6-2-7, lessons-2-8-2-9, run-flow-drawer; kế hoạch merge ngày 31/10. Đọc verification từng bài 2.5–2.9/RunFlow sau khi đọc source và kiểm mạch; dùng như evidence lịch sử và ma trận xử lý, không thay kết luận kiểm tĩnh.

Bằng chứng tác giả xuất bản: `docs/reviews/2026-10-31-publish-2-5-2-9/verification.md` và log tương ứng trong `temp/verification/2026-10-31-publish-2-5-2-9/`. Đã đọc log tổng kết test/check/build/dist, API typecheck/build, cuối runner/data và hồ sơ publish:

- Tác giả báo 49 file/366 test đạt; check 194 file, 0 lỗi/0 warning, **3 hint nền**: hai FormEvent ở ExerciseWorkspace, một document.execCommand ở SqlEditor. Các file đó không đổi trong range. Log check dùng chữ warning ở chẩn đoán TS nhưng tổng kết phân loại ba hint; không gọi là không có chẩn đoán.
- Tác giả báo build 129 trang, dist 1951 link, API typecheck/build đạt, runner toàn bộ đáp án xong, check:data “Không bảng nào lệch.” Đây là kết quả lệnh của tác giả, không phải lệnh reviewer chạy.
- Evidence SQL trước đó ghi 2.5 có 8 hồ sơ/nhãn NV044, 2.6 có 6/19/48, 2.7 có 10 nhãn và kết quả collation, 2.8 có 25 NULL và 20/13/3, 2.9 có 45 và 33/8/4. Reviewer chỉ đối chiếu nhất quán giữa nội dung, checks và các bảng được giao, không xác minh database trực tiếp.
- Hồ sơ publish cập nhật UI tác giả trên preview cổng 4327: 1280×800 cho 2.8 UNKNOWN, 2.9 CASE, 3.8 UNION, 3.4 JOIN; 1024×768 cho 2.5 WHERE/SELECT; thao tác next/ArrowLeft/Escape trên 2.8. Có lỗi nền 390×844 và các giới hạn nêu ở mục 6. Reviewer không thực hiện hay chứng kiến browser qua công cụ của mình.

Chỉ file report này được reviewer tạo. Phần static integration đã hoàn tất trên head nêu đầu báo cáo; I3/I4 và các giới hạn cần được tác giả giữ nguyên nhận xét gốc, ghi quyết định riêng trước khi bàn giao.
