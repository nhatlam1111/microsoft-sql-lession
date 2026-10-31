# Review độc lập bài 2.4 — 31/10/2026

## Phạm vi, phiên bản và công cụ thực tế

Review riêng bài 2.4 theo gói `E:/Projects/SQL Lession/temp/review/2026-10-31-lesson-2-4/reviewer-brief.md`. Học thử với nền Excel văn phòng cơ bản, chưa biết lập trình/SQL; đọc 1.1–1.5 và 2.1–2.3 để xét tiền đề, không review lại từng bài trước. Model: **kế thừa model của phiên**, không đổi hoặc đoán tên model. Không tạo agent khác.

Đã đọc `AGENTS.md`, quy ước, template, hồ sơ công ty và chỉ các mục **Phạm vi và căn cứ / Thiết kế / Nghiệm thu** của spec được giao. Không đọc report trước, nhận xét reviewer khác hoặc evidence tác giả ngoài manifest.

Theo brief, source là working tree trên HEAD `f344099d9e3f9fa58b33a5c0762e6cfbaa467f93`, checkout `feat/lesson-2-1-excel-first`. Không chạy Git để xác nhận lại hai thông tin này. Tự tính SHA-256 bằng `Get-FileHash` và đối chiếu cả trước lẫn cuối lượt; ba tệp đều khớp manifest:

| Tệp, tính từ `E:/Projects/SQL Lession/` | SHA-256 thực tế và manifest | Mốc UTC trong manifest |
|---|---|---|
| `src/content/lessons/2-4-sap-xep-va-top.mdx` | `4fa7363b1b4a13520c7e01a43f555febe3aee4a844e51c88370745081f16e6d2` | 2026-10-31 09:05:16 |
| `src/content/exercises/2-4-sap-xep-va-top.yaml` | `418dd1377a870c6cda8acf4494c85751542e52bd05a36c626d63aafefe029e38` | 2026-10-21 15:19:21 |
| `dist/bai/2-4-sap-xep-va-top/index.html` | `8c67494e14783553b6b431495566c4d72ee292fbf76759b15a334abcc338b0b6` | 2026-10-31 09:06:17 |

Công cụ: PowerShell đọc tệp/tìm chữ/tính hash và Python chuẩn `html.parser` đọc HTML tĩnh; đọc CSS được chính HTML liên kết. Không browser, không viewport thực tế, không SQL/database/API/runner, không chạy test hoặc build. Một lệnh tính hash ban đầu lỗi cú pháp PowerShell và một lệnh in cấu trúc HTML lỗi mã hóa stdout; đã sửa lệnh và đọc lại thành công. Đây là lỗi thao tác đọc, không phải bằng chứng lỗi sản phẩm.

Các số dòng dưới đây chỉ **MDX 2.4**, trừ khi ghi rõ YAML hoặc bài khác.

## Rà theo thứ tự bài

### Nền cần có và tình huống — Giữ được

- **Câu gốc/vị trí:** “ở mọi phòng và không giới hạn năm vào làm” (dòng 24), “lấy tối đa năm hồ sơ đầu” (dòng 26).
- **Tác động/căn cứ:** người mới biết tập nguồn, trạng thái và nghĩa của “gần nhất”; không phải tự đoán đang lấy trong năm 2026, lấy từng phòng hay lấy theo mã. Bốn cột, tiêu đề và tiêu chí phụ cùng ngày nằm ngay trong tin nhắn (dòng 21). Mục tiêu (dòng 11) khớp nội dung và ba đề.
- **Tiền đề:** 1.2 đã phân biệt bảng/dòng/cột và không hứa thứ tự dòng cố định; 1.3 đã giải thích ngày thật và Unicode; 1.4 đã giải thích khóa chính không trùng; 2.1 đã dạy `SELECT`, `FROM`, `AS`, thứ tự cột; 2.2–2.3 đã dạy lọc trạng thái, `AND`, `IN` và thứ tự logic. Không lấy bài sau để bù kiến thức.
- **Đề xuất:** giữ phạm vi và cách chốt yêu cầu hiện tại.

### Từ Excel đến câu chính và LineMap — Giữ được

- **Câu gốc/vị trí:** “chọn cả vùng có tiêu đề” (dòng 32), “Mỗi cột có hướng riêng” (dòng 61), “chỉ khi các giá trị trước bằng nhau mới xét cột tiếp theo” (dòng 61).
- **Tác động/căn cứ:** Excel đi theo đúng việc lọc trạng thái → sắp ngày → thêm mức mã → lấy đầu danh sách. Không cần biết VLOOKUP/PivotTable. Câu SQL xuất hiện trước LineMap, cùng phần chính và giải đúng tình huống; từng dòng LineMap có ví dụ cụ thể. Lời giảng giải thích được hướng tăng/giảm, hướng mặc định cho từng cột và xét nhiều cột từ trái sang phải, đủ để chuyển sang bài tập ba tiêu chí.
- **Hình/render tĩnh:** năm hồ sơ Excel khớp năm dòng Result về mã/tên/phòng/ngày; ngày Excel và SQL chỉ khác dạng hiển thị. HTML có `xl-num` ở cả năm ô ngày, `xl-mark` ở đúng `D2`, `D6`; CSS căn phải và tô dấu các ô này. Chú thích nói rõ đây là hình minh họa và vị trí được đánh dấu, không coi năm dòng trích là toàn bộ nhóm đang làm.
- **Câu gốc/vị trí:** “đủ phân thứ tự khi dữ liệu không đổi” (dòng 63), “không phải năm dòng cho từng phòng” (dòng 65).
- **Tác động/căn cứ:** khóa chính được dùng để chốt thứ tự và quyết định ranh giới lấy dòng; bài không hứa kết quả cố định khi nguồn thay đổi. `TOP` được giảng là tối đa, trên cả tập sau lọc/sắp, kể cả khi ít hơn năm hồ sơ. Hình không có hai ngày bằng nhau nhưng quy tắc xử lý cùng ngày được nói rõ trước phần ôn; không cần gán ví dụ giả thành dữ liệu thật.
- **Câu gốc/vị trí:** “`ORDER BY` dùng được alias vì đứng sau `SELECT` trong thứ tự logic” (dòng 67).
- **Tác động/căn cứ:** đối chiếu trực tiếp giới hạn alias trong `WHERE` đã dạy ở 2.2 dòng 146. Người học không phải tự suy alias dùng được ở mọi chỗ. Bài cũng tách thứ tự dòng khỏi vị trí cột và khỏi việc đổi bảng nguồn.
- **Đề xuất:** giữ các lời giải thích này; không thấy thiếu định nghĩa cốt lõi cần thêm.

### RunFlow: đã đọc đủ năm drawer — Giữ được

**Câu gốc/vị trí:** “không phải cách SQL Server quét hay sắp dữ liệu vật lý” (dòng 73). Câu chính và `RunFlow.query` trùng nhau; các `focus` đều chỉ vào phần có trong câu. Đã đọc từng `meaning`, `detail`, SQL bước, bảng đủ cột, dòng trích, tổng và liên hệ Excel trong nguồn, rồi đối chiếu năm panel `data-panel="0"` đến `"4"` trong HTML:

| Drawer và vị trí nguồn | Điều người học thấy trong HTML tĩnh | Đối chiếu nội dung |
|---|---|---|
| `FROM`, dòng 81–95 | 48 hồ sơ; đủ 12 cột; trích NV020/NV047/NV048; SQL đọc nguồn | Chưa lọc/chọn cột; NV020 đã nghỉ hiện đúng vai trò dẫn chứng cho bước sau. |
| `WHERE`, dòng 98–114 | 45 hồ sơ; đủ 12 cột; trích ba hồ sơ đang làm; SQL chỉ thêm lọc trạng thái | NV020 bị loại; lời đã nói chưa có thứ tự bảo đảm. |
| `SELECT`, dòng 117–133 | 45 hồ sơ; bốn cột/alias; SQL bước không có `TOP` | Lời “`TOP (5)` … chưa giới hạn dòng ở bước logic này” khớp tổng 45, không gây hiểu `SELECT` đã cắt còn năm. |
| `ORDER BY`, dòng 136–161 | 45 hồ sơ; trích mười dòng đầu; SQL bước có sắp xếp, không `TOP` | “Chưa bỏ hồ sơ ở bước này” khớp tổng 45. Mười dòng trích không bị mô tả là toàn bộ kết quả. |
| `TOP`, dòng 164–184 | 5 hồ sơ; SQL đầy đủ như câu chính; năm dòng NV048/NV047/NV046/NV045/NV044 | Bước cuối trả danh sách chị Hạnh cần; cùng dữ liệu/thứ tự với Result cuối. |

Thẻ xem nhanh chỉ chọn một số cột/dòng để xem nhanh; không coi nó là bảng đủ cột hoặc tổng thật. Trạng thái 48 → 45 → 45 → 45 → 5 nhất quán giữa lời, source và HTML, và phù hợp số lượng ghi trong hồ sơ công ty. Không xác nhận lại các con số bằng SQL live.

Trong sáu khối `Sql` của HTML (câu chính và năm câu bước), chuỗi tiếng Việt giữ nháy thẳng, các dòng tiếp có tab thật, không lộ ký tự backtick hay hai ký tự `\t`. CSS liên kết khai báo `--sql-tab-size: 4`; `sql-code` và `rf-q` dùng token này. Phần query có highlight được chia thành các khối `span`/`mark` với CSS grid/block; không dùng việc nối text thuần của các khối để kết luận sai rằng SQL bị dính dòng. Đây chỉ là đối chiếu HTML/CSS, chưa thử sao chép hoặc mở drawer.

**Đề xuất:** giữ cách tách `SELECT`/`ORDER BY`/`TOP` và giới hạn logic hiện tại.

### Result và câu trả lời — Giữ được

- **Câu gốc/vị trí:** “không đồng nghĩa với chỉ lấy hồ sơ năm 2026” (dòng 196); “câu lệnh giữ tiêu chí lựa chọn” (dòng 198).
- **Tác động/căn cứ:** câu trả lời đứng ngay sau Result, nêu đúng năm mã theo thứ tự. NV044 năm 2025 giúp khép lại phạm vi không giới hạn năm; không lấy mã lớn làm định nghĩa “gần nhất”. HTML đánh dấu đúng dòng đầu/cuối bằng `res-mark`; CSS có nền dòng được chọn. Không thấy lệch giữa Excel, Result, drawer cuối và hồ sơ công ty về năm mã/ngày được nêu.
- **Đề xuất:** giữ đoạn trả lời và điều kiện dữ liệu có thể được cập nhật; không cần thêm đoạn giảng lại câu SQL.

### Hay nhầm, Ứng dụng, Ghi nhớ và Bài tập — Giữ được

- **Câu gốc/vị trí:** “chỉ mã giảm dần” (dòng 204), “không bảo đảm chọn năm hồ sơ” (dòng 205), “giới hạn nhầm tập nguồn” (dòng 206).
- **Tác động/căn cứ:** ba lỗi đều là biến thể đúng tình huống/cột đang học, có hậu quả cụ thể. Không thêm bảng hay câu mẫu khác để tăng tải. Đã phân biệt hướng riêng từng cột, cần sắp trước khi giới hạn và cần lọc đúng tập nguồn.
- **Câu gốc/vị trí:** “Chuẩn hóa thứ tự báo cáo” (dòng 215), “Chọn nhóm cần ưu tiên” (dòng 216).
- **Tác động/căn cứ:** các ý Ứng dụng nói việc làm được nhờ sắp xếp/lấy nhóm đầu, có mục đích công việc. Ghi nhớ ôn lại các ý đã giảng, không dùng để dạy bù. Chữ đậm dành cho khái niệm/tên ứng dụng; tên bảng/cột/giá trị dẫn chứng trong lời văn được dùng code có chọn lọc.
- **Câu gốc/vị trí:** “Ba bài đều chấm **thứ tự dòng** và vị trí cột” (dòng 231).
- **Tác động/căn cứ:** báo rõ khác 2.1–2.3, tránh người học cho rằng chỉ cần cùng tập dữ liệu. Không có tự kiểm tra bổ sung; đây là quyết định giữ ba đề của gói giao, không phải khoảng trống phải lấp bằng quiz.
- **Đề xuất:** giữ các mục hiện tại. Không thấy câu vòng vo hoặc lặp vô ích đủ tác động để yêu cầu cắt. Chỗ nhắc lại từ khóa trong LineMap/drawer có nhiệm vụ giải thích bước, còn Memo là phần ôn.

### Những câu “tại sao/để làm gì” đã tự đặt

| Câu hỏi khi học thử | Bài đã trả lời ở đâu |
|---|---|
| “Gần nhất” là ngày gì, có phải mã lớn nhất hoặc chỉ năm 2026? | Phạm vi dòng 24; Hay nhầm 2; câu trả lời dòng 196. |
| Vì sao phải chọn cả vùng khi Sort trong Excel? | Cách làm dòng 32 chỉ rõ cả vùng có tiêu đề, giữ các thông tin hồ sơ cùng dòng. |
| Vì sao phải lọc trước khi lấy năm dòng? | LineMap dòng 57, lời giảng dòng 65 và Hay nhầm 3. |
| Vì sao `DESC` ở cột sau không làm cột trước giảm? | Mỗi cột có hướng riêng/mặc định `ASC`, dòng 61; Hay nhầm 1. |
| Vì sao phải thêm mã nếu đã có ngày? | Dòng 63: cùng ngày và ranh giới lấy năm dòng; khóa chính không trùng. |
| Vì sao viết `TOP` đầu câu nhưng sơ đồ đặt cuối? | Dòng 65, 73; drawer `SELECT` giải thích chưa giới hạn; drawer `TOP` mới cắt dòng. |
| Vì sao dùng alias ở `ORDER BY` được còn `WHERE` không? | Dòng 67 đối chiếu trực tiếp bài 2.2; thứ tự logic đã học và có trong sơ đồ. |
| Việc sắp có sửa nguồn, đổi cột hoặc giữ nguyên danh sách cho lần sau không? | Dòng 67 và 198: chỉ sắp dòng kết quả; dữ liệu đổi thì kết quả có thể đổi. |

Không có câu hỏi cốt lõi nào trong nhóm trên phải lấy đáp án YAML hoặc kiến thức bài sau để tự bù.

## Tiền đề từng bài tập

Đã mở YAML bằng cách **ẩn toàn bộ trường `answer`**, đọc đủ ba prompt/columns/ordered, ghi nhận cách làm và tiền đề trước. Sau đó mới đọc answer để đối chiếu. Bảng dưới chỉ mô tả phương pháp, không chép nguyên đáp án.

| Đề / vị trí YAML | Cách làm đã xác định trước answer | Kiến thức và chỗ đã dạy | Phần còn thiếu / đối chiếu answer |
|---|---|---|---|
| 2-4-1, dòng 3–13 | Lấy bốn cột đúng vị trí; lọc một trong KT/NS; không thêm trạng thái/ngày hoặc giới hạn dòng; xếp phòng → ngày → mã đều tăng. | `SELECT` và thứ tự cột: 2.1 dòng 50, 56. `IN` cùng cột: 2.3 dòng 53, 58. Nhiều cột, trái sang phải, `ASC`: 2.4 dòng 61–63. | Không thấy kiến thức chưa được dạy hoặc đã dạy nhưng khó tìm. Mở rộng từ hai sang ba tiêu chí là áp dụng quy tắc nhiều cột đã nói. Answer khớp prompt và cách làm đã xác định. |
| 2-4-2, dòng 19–29 | Chọn ba cột; kết hợp phòng IT với trạng thái đang làm; lấy tối đa ba sau khi xếp ngày mới trước rồi mã tăng; không tự giới hạn năm. | So sánh chữ/trạng thái Unicode: 1.3 và 2.2 dòng 56, 60. `AND`: 2.3 dòng 54. `TOP`, `DESC`, khóa chốt: 2.4 dòng 55, 61–65 và năm bước logic. | Không thiếu tiền đề. Việc đổi số lượng 5 thành 3 và thêm điều kiện phòng dựa trên kiến thức đã học. Answer khớp phương pháp và đúng số/vị trí cột trong prompt. |
| 2-4-3, dòng 35–45 | Chọn ba cột; chỉ nhóm KT đang làm; lấy tối đa bốn sau khi xếp ngày cũ trước và mã tăng khi cùng ngày. | Kết hợp điều kiện: 2.2–2.3 như đề 2. `ASC` là ngày cũ đến mới, mỗi cột hướng riêng: 2.4 dòng 61. Giới hạn trên tập sau lọc/sắp: dòng 65. | Không thiếu tiền đề. “Sớm nhất” đã được nối nghĩa với `ASC` trong phần chính, trước phần ôn; không cần học từ answer. Answer khớp phương pháp và prompt. |

Cả ba YAML đều có `ordered: true`; hướng dẫn dòng 231 và metadata “Có sắp xếp: có, theo yêu cầu trong đề” ở ba HTML bài tập khớp nhau. Đây là đối chiếu yêu cầu/answer tĩnh, không phải kết quả nộp bài hoặc xác nhận bộ chấm.

## Ưu tiên và kết luận

**Không phát hiện finding cần sửa, làm rõ, cắt hoặc biên tập trong phạm vi học thử nguồn/HTML/CSS này.** Các mục “Giữ được” ở trên có căn cứ và không yêu cầu tác giả thêm nội dung chỉ để tăng số khối hoặc số nhận xét.

Về tiền đề, bài đang có đủ kiến thức để hình thành cách làm cả ba đề từ những gì 1.1–2.4 đã giảng. Không thấy phải dựa vào answer để biết một cú pháp hoặc quy tắc còn thiếu. Kết luận này không khẳng định một học viên thực tế chắc chắn tự học được, không xác nhận SQL/UI/bộ chấm đã chạy đúng và không thay cho bằng chứng kiểm kỹ thuật hoặc quyền push/deploy.

## Nguồn và giới hạn

- Nguồn quy ước/ngữ cảnh: `E:/Projects/SQL Lession/AGENTS.md`; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; ba mục spec được phép của `docs/superpowers/specs/2026-10-31-lesson-2-4-design.md`. Các đường dẫn ngắn trong dòng này đều nằm dưới `E:/Projects/SQL Lession/`.
- Nguồn tiền đề: đầy đủ các MDX 1.1–1.5 và 2.1–2.3 hiện hành trong `E:/Projects/SQL Lession/src/content/lessons/`; không dùng bài sau hoặc tài liệu SQL ngoài khóa học làm lời giảng thay thế.
- Nguồn chính: MDX/YAML/HTML có hash nêu đầu report; manifest `E:/Projects/SQL Lession/temp/verification/2026-10-31-lesson-2-4/source-build-manifest.json`. CSS đọc là `E:/Projects/SQL Lession/dist/_astro/_slug_.Cl6dmZ7l.css`, do HTML liên kết. CSS không có mục hash riêng trong manifest.
- Đường thực hành được xét bằng đọc tĩnh: ba liên kết “Làm bài” của bài 2.4 có ba HTML đích tương ứng trong `E:/Projects/SQL Lession/dist/bai/2-4-sap-xep-va-top/bai-tap/{1,2,3}/index.html`; prompt/metadata khớp YAML. Đọc thêm `E:/Projects/SQL Lession/src/pages/gioi-thieu.astro`, `src/pages/bai/[slug]/bai-tap/[n].astro`, `src/components/lesson/Exercises.astro`, `src/components/islands/LessonStatus.tsx`, đoạn trợ giúp của `src/components/islands/ExerciseWorkspace.tsx` và cấu trúc `src/components/lesson/RunFlow.astro`, đều dưới cùng workspace. Đây là nguồn phụ để hiểu đường đi; ba HTML bài tập và các nguồn phụ không có hash baseline riêng trong manifest.
- Giới thiệu đã nói nơi lấy mã, phân biệt mã web/tài khoản SSMS/bản SQL Server riêng, người dùng web không phải kết nối SSMS; trợ giúp workspace nối đúng lối không có mã. Điều kiện tự đánh dấu học xong là tự viết lại câu lệnh, không bị đổi thành “đã chạy là xong”. Chỉ đọc nguồn/đích liên kết; chưa chứng minh đăng nhập/chạy/nộp/đánh dấu thực tế hoạt động.
- Chưa xác minh: SQL live, schema/khóa thật và số lượng dữ liệu live, đầu ra của mọi câu SQL và các trường hợp ít hơn N/trùng ngày trên máy chủ, bộ chấm ordered, lỗi SQL nguyên văn, sao chép/dán/tab trong editor, điều khiển drawer bằng chuột/bàn phím/focus, overflow và bố cục ở viewport thực tế, hay ước tính 20 phút với học viên thật. Không chạy test nên không có kết quả pass/fail hoặc lỗi nền của suite để báo.
- Không đọc `database/HRM_Demo.sql`, `.env`/secret; không kết nối database hoặc chạy SQL/API; không thay source/docs/test/Git. Tệp duy nhất được ghi trong lượt này là report này.
