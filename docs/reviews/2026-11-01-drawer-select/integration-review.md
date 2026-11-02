# Review tích hợp drawer SELECT 3.1–3.2

Ngày review: 02/11/2026. Model: **kế thừa model của phiên**, không đổi model/effort; không tạo agent khác. Vai trò: học viên chỉ biết Excel cơ bản và reviewer mã dùng chung. Không dùng bài sau hay đáp án để bù tiền đề bài trước.

## Phiên bản và công cụ thực tế

- Phạm vi sản phẩm: `7743a7e..8de5a4f407ef4c0740ba571f108ecedfbed975b4`, gồm 13 file. Đã đọc diff và nguồn hiện có; `git diff --name-only 8de5a4f… -- DESIGN.md docs/lesson-template.md docs/quy-uoc.md src tests` không có kết quả. Không checkout, đổi index/HEAD/branch hoặc ghi Git.
- Build được giao: `dist/`, UTC `2026-11-01T15:20:45.6555704Z`, source theo manifest là `8de5a4f…`. Tôi tự tính SHA-256: **7/7 mục build-manifest và 8/8 mục exercise-manifest khớp**. Phần bổ sung gồm sáu HTML đề và hai YAML được chính lượt tích hợp này kiểm hash; không quy phần đó cho hai reviewer từng bài.
- Dùng PowerShell/`rg`/Git chỉ đọc; Node **v24.18.1** với `--experimental-strip-types --input-type=module` và các assertion chạy trong bộ nhớ; Python `html.parser` đọc HTML tĩnh. Không tạo file scratch. Không chạy SQL/API/runner, đọc seed hoặc secret, mở browser, nộp bài hay sửa sản phẩm.
- Đọc trọn brief, quyết định đã duyệt, spec/plan; AGENTS, quy ước/template/hồ sơ công ty/DESIGN; hai bài mẫu 1.1/2.1; mạch 2.9→3.1→3.2→3.3; renderer/types/tests thay đổi và phần tương thích liên quan. Dùng `frontend-design` cùng `frontend-design-premium` để rà UI theo DESIGN và chủ sở hữu hiện hành; phạm vi review chỉ đọc được giữ nguyên.

### Kiểm tôi tự thực hiện

| Kiểm | Kết quả và phạm vi chứng minh |
|---|---|
| `checkFlow` với dữ liệu giả, không seed | Ví dụ hợp lệ được nhận; **16 trường hợp minh họa sai** bị từ chối, gồm thiếu phạm vi/nội dung, bảng sai chiều, vượt 2 ví dụ/5 dòng/5 biểu thức, sai cột/giá trị và ghép `BGD/5`. **4 mark sai** (`0`, `-1`, ngoài dòng trích, số lẻ) bị từ chối. Đây là assertion trực tiếp, không phải chạy lại Vitest. |
| Flow nguồn 2.1, 2.9, 3.1, 3.2, 3.3, 3.8 | `checkFlow` không báo vấn đề; mọi input preview tối đa 5 dòng. Đối chiếu riêng với `git show 7743a7e:<path>`: query, SQL từng bước, columns/rows/total và thứ tự mệnh đề giữ nguyên ở cả sáu flow. |
| Phép tính từ dữ liệu bài 3.1 | Đếm lại chín dòng WHERE trong MDX cho tần suất `1.0×4 / 2.0×3 / 3.0×2`; tổng `16`, bình quân làm tròn `1.78`. Bảng tần suất khớp cả chín dòng, không phải năm dòng trích. Không suy đây là kiểm database live. |
| Nhóm mẫu/mark của 3.2 | Số thành viên hiện trong từng ví dụ SELECT khớp ô đếm `2/5`; mark `[3,6]` trỏ đúng `BGD/2`, `NS/5`. Trong sáu flow đã xét, chỉ ba bước được duyệt có examples. |
| Tương thích nguồn | Hai YAML 3.1/3.2 giữ nguyên so với base; toàn bộ khối `<script>` điều khiển RunFlow giữ nguyên. Diff không có API, database, islands/editor, exercise CSS hoặc exercise YAML. |
| HTML hai bài đã đối chiếu hash | Đủ ba nhãn Đầu vào/Thực hiện/Kết quả; SELECT 3.1 có 1 ví dụ, bảng tần suất 3 dòng và 5 phép tính; GROUP BY/SELECT 3.2 mỗi bước có 2 ví dụ với 2/5 thành viên, SELECT có 2 phép tính mỗi nhóm và hai dòng Results được đánh dấu. Các vùng bảng mới có tên, `role="region"`, `tabindex="0"`; không lộ backtick/escape trong examples. |
| HTML sibling hiện có trong dist | Đọc cấu trúc 2.1/2.9/3.3/3.8: không có examples phát sinh; 2.1 giữ 4 dòng đầu vào, các bảng trích khác tối đa 5; UNION vẫn nhận hai bảng đầu vào độc lập. Bốn HTML sibling này không có hash riêng trong gói, nên đây là đối chiếu cấu trúc file hiện có, không xác nhận provenance riêng của từng file. |

Các lượt script review đầu chưa hoàn tất do đoán sai slug 3.8 và encoding stdout Python trên Windows; đã sửa đúng đường dẫn/encoding trong câu kiểm và chạy lại toàn bộ, hai lượt hoàn chỉnh cuối đều exit 0. Không sửa mã sản phẩm để làm các kiểm này đạt.

### Bằng chứng tác giả/reviewer khác đã đọc

- Log tác giả ghi **441/441 test, 56 file**; Astro check **0 errors, 0 warnings, 3 hints** deprecated tại ExerciseWorkspace/SqlEditor; build **139 trang**; check:dist **2771 link**. Đã đọc log tương ứng, không chạy lại full suite/build. Các test nội dung đối chiếu seed chỉ được đọc mã kiểm, không chạy trong lượt này.
- `sql-evidence.json`/`sql-live.log` ghi **12 trường hợp PASS**, gồm câu chính/từng bước, tần suất ba mức và đủ bảy thành viên BGD/NS; mọi `errorKind` là null. Tôi đối chiếu các giá trị đã ghi với nguồn; không tự kết nối để xác nhận database hiện tại. API typecheck/build, 76 đáp án và check:data “Không bảng nào lệch” là kết quả trong log tác giả, không phải lệnh tôi chạy.
- `verification.md` ghi tương tác IAB trên đúng dist: ba drawer ở desktop/1024px, bước trước/sau, Escape/focus, Tab vào bảng, mũi tên trong bảng, tab SQL 4 cột và đối chiếu 2.1/2.9. Tôi không quan sát lại các tương tác này; HTML/CSS không thay bằng chứng browser.
- Hai report từng bài không có finding bắt buộc sửa và đã ghi tiền đề từng đề trước đối chiếu YAML. Lượt tích hợp không lặp toàn bộ học thử sáu đề hoặc nhận là đã tự làm lại quy trình đó. Tôi kiểm việc thay renderer/ba drawer không đổi đề, đáp án hay đưa thêm kiến thức thành điều kiện thực hành.

## Mạch nội dung và thực hành

**Giữ được — từ một giá trị cho mỗi hồ sơ tới tổng hợp theo phạm vi/nhóm.** 2.9 định nghĩa CASE là biểu thức trả một giá trị cho mỗi dòng và không loại hồ sơ. 3.1 định nghĩa hàm tổng hợp bằng việc tính một giá trị từ nhiều dòng, chốt một đơn là một dòng và tính sau WHERE. 3.2 định nghĩa PivotTable, Filters/Rows/Values và khóa nhóm ngay trong phần chính; không đòi người chỉ biết Excel cơ bản phải biết sẵn PivotTable. Chuyển từ một dòng chung ở 3.1 sang một dòng mỗi mã phòng có lý do từ yêu cầu chị Hạnh.

**Giữ được — SELECT 3.1, `src/content/lessons/3-1-count-sum-avg.mdx:150`.** Lời dẫn nói tính cả chín đơn, không chỉ năm dòng đang trích. Cột “Số đơn có giá trị này” làm rõ ba dòng tần suất không phải ba đơn. Năm hàng lần lượt giải được COUNT/SUM/AVG–CAST/MIN/MAX tới đúng năm ô; AVG nói rõ cả chín giá trị khác NULL nên mẫu số là chín. AS đặt tên cột, không đổi giá trị nguồn. Phạm vi theo TuNgay, trạng thái và giới hạn “không phải ngày thực nghỉ trong tháng” được giữ.

**Giữ được — GROUP BY/SELECT 3.2, `src/content/lessons/3-2-group-by-pivottable.mdx:142` và `:170`.** GROUP BY cho thấy thành viên cùng mã đi vào cùng nhóm; SELECT áp dụng cùng hai biểu thức lên từng nhóm, lấy mã chung và đếm mỗi thành viên một lần rồi ghép thành dòng. Hai nhóm đủ thành viên của riêng mẫu, không giả là toàn bộ 45 hồ sơ. NS ngoài năm dòng input trích vẫn có phạm vi rõ trong minh họa. Bảng sáu mã/kích thước là đối chiếu, có lời phân biệt nhãn minh họa với alias tại `:156`.

**Giữ được — nối sang HAVING.** 3.2 không nói hàm tổng hợp chỉ có thể được tính ở SELECT hoặc mô tả việc đọc vật lý; lời dẫn sơ đồ vẫn chốt thứ tự logic. 3.3:39 dùng số liệu của nhóm để HAVING kiểm trước SELECT; `:52` nói alias chưa dùng được ở HAVING, và `:163`–`:164` phân biệt chọn cột/đặt alias sau khi lọc nhóm. Các câu mới của 3.2 tương thích với mạch này: mẫu BGD/NS giải ô đầu ra, không đặt luật ngăn HAVING dùng COUNT. Cùng phạm vi đang làm và MaPB hiện lưu; “trên 10” vẫn giữ KD13, loại IT10.

**Giữ được — đường thực hành/phạm vi.** Các tiền đề COUNT(cột)/NULL/AVG và nhóm nhiều cột đã nằm trong phần giảng trước ôn; các minh họa mới làm rõ cơ chế có sẵn, không cần lấy đáp án hoặc bài 3.3 bù vào bài 3.1/3.2. Không đổi sáu đề/ID/answer/ordered hay cơ chế chấm, không phát sinh yêu cầu người chọn web phải kết nối SSMS. Không thay editor/storage nên không có đường di trú nháp mới để kiểm trong diff này; khả năng đăng nhập/nộp bài runtime chưa được tôi thử.

## Renderer, validation và năm Review Focus

| Trọng tâm | Kết luận có căn cứ |
|---|---|
| 1. Không dùng bảng trích làm mẫu số | **Giữ được.** Nguồn/HTML nói rõ 9; tính độc lập từ chín dòng nguồn khớp tần suất. `tests/content-3-1.test.ts:12` bảo vệ tần suất toàn phạm vi và input vẫn 5 dòng; phần seed/live là bằng chứng tác giả đã nêu riêng. |
| 2. Hai ô phải thuộc cùng dòng/nhóm | **Giữ được.** `src/lib/run-flow.ts:170` dùng `rows.some(row => calculations.every(...))`, nên phải tồn tại một dòng chứa tất cả giá trị cùng lúc. Assertion ghép BGD/5 bị từ chối dù cả BGD và 5 đều xuất hiện trong các dòng khác. |
| 3. Không thành trình duyệt dữ liệu | **Giữ được.** `run-flow.ts:152`–`:166` chặn số ví dụ/dòng/biểu thức và yêu cầu title/note/nội dung. Sản phẩm chỉ có 1/2/2 ví dụ; FlowExamples tĩnh, không nút tải thêm/trạng thái duyệt/query runtime. Không mở rộng input mặc định. |
| 4. Flow cũ và bàn phím | **Giữ được ở nguồn/HTML và pure logic.** Nhánh render tại `RunFlow.astro:146` chỉ xuất hiện khi có examples; `mark` không có thì Result dùng mảng rỗng như cũ. Kiểm nguồn 2.9 vẫn xác nhận bảng WHERE/CASE; fake UNION và flow 3.8 giữ hai nguồn độc lập. Khối JS không đổi; handler tại `:219` đã loại `.rf-tb-scroll` khỏi đổi bước bằng mũi tên, phù hợp vùng cuộn mới. Tab/scroll/Escape thực tế dựa vào kiểm IAB tác giả, chưa do tôi tự thử. |
| 5. Nhãn nhóm/alias/thực thi vật lý và HAVING | **Giữ được.** Nhãn GROUP BY 3.2 được phân biệt ngay tại kết quả; hai bảng thành viên giữ hồ sơ trong nhóm, không diễn là bảng đã lưu. Mạch 3.3 vẫn dùng COUNT trước alias SELECT như phân tích trên; không có thay đổi câu SQL để né thứ tự logic. Test thành viên theo seed đã đọc nhưng không chạy; live evidence tác giả và hồ sơ công ty cùng khớp hai nhóm mẫu. |

`FlowExamples.astro:9`–`:34` dùng bảng HTML, th/td và code riêng cho biểu thức/giá trị; không dùng `set:html`. Nhãn minh họa đứng cạnh dữ liệu, tách khỏi Result hiện hành. Component không thêm script hoặc điều khiển mới. CSS tại `:39`–`:51` dùng token/chủ sở hữu bảng hiện hành, cho ô và code xuống dòng; vùng bảng có tên và focus-visible. Không thấy lặp bộ điều khiển drawer hoặc API riêng theo bài.

## Findings theo ưu tiên

- **Critical: không có.**
- **Important: không có.**
- **Minor: không có finding đủ căn cứ cần sửa trong diff được giao.**

Các kết luận **Giữ được** ở trên là kết quả review nguồn, kiểm pure và HTML được mô tả, không phải chứng nhận mọi tương tác hoặc dữ liệu live hôm nay.

## Các hành vi đã cân nhắc, chưa kết luận hoặc để ngoài phạm vi

| Mục | Xử lý đề nghị cho tác giả và lý do |
|---|---|
| `SoHoSo` hiện sớm trong bảng minh họa GROUP BY/HAVING của 3.3 | **Không coi là hồi quy do diff; giữ phạm vi lượt này.** Đây là cách dựng sẵn của 3.3; lời `:52` và `:164` nói rõ alias câu gốc được tạo ở SELECT, nên không có căn cứ kết luận bài cho phép dùng alias ở HAVING. Có thể thống nhất nhãn minh họa với 3.2 khi đến lượt sửa 3.3; không tự đổi cả bài/khung cũ trong lượt này. |
| Cùng BGD/NS xuất hiện lại ở cả GROUP BY và SELECT | **Giữ.** Hai drawer trả lời hai việc khác nhau (vào nhóm nào / tạo ô nào); mở riêng từng drawer vẫn hiểu được. Cắt bảng lặp sẽ bắt học viên quay lại. Không mở thêm nhóm để đổi ví dụ chỉ cho bớt lặp. |
| Validator chỉ yêu cầu note không rỗng; không tự chứng minh phép tính/lời giải hoặc tính đầy đủ nhóm | **Giới hạn có chủ đích, không finding.** Đây là dữ liệu tác giả viết trong MDX; checkFlow bảo vệ hình dạng/ánh xạ cùng dòng, không phải máy hiểu ngữ nghĩa. Các trường hợp thực cần test dữ liệu và SQL tác giả; evidence hiện có bao phủ tần suất/thành viên mẫu. Không đề nghị thêm bộ tính SQL hoặc framework validation runtime. |
| Cần mở đủ sáu nhóm/45 hồ sơ để kiểm COUNT | **Không làm.** Hai nhóm nhỏ đủ thể hiện cơ chế, note nói rõ phạm vi. Mở hết đi ngược quyết định đã duyệt và mục tiêu khối ngắn. |
| Static audit `form.textarea-resize-missing` | **Không làm theo finding này.** Tự đối chiếu `SqlEditor.tsx:54` dùng `ed-input`; `exercise.css:27` có `resize: none`, khung `:19` cao 280px và input `:20` có overflow; `BaseLayout.astro:15` nạp CSS. Các file không đổi trong diff. Thiếu bằng chứng nội dòng trong JSX không có nghĩa thiếu quy tắc resize. Không chạy lại/nới auditor, không báo strict audit hoàn toàn PASS. |
| Bàn phím DOM, cuộn ngang và clipping/độ đọc | **Chưa tự xác minh tương tác.** Source có vùng focus và guard mũi tên; tác giả đã ghi IAB desktop/1024px. Không biến các assertion pure/HTML thành kết quả browser. Nếu cần mức bảo đảm rộng hơn, bổ sung riêng screen reader/zoom 200%/reduced motion trên UI; chưa có căn cứ gọi những trạng thái chưa thử là lỗi. |
| Copy/paste, mã truy cập, nộp bài, nháp người học, SQL Server/Excel thật | **Ngoài kiểm tích hợp trực tiếp này.** Diff không đổi các chủ sở hữu đó; tác giả cũng ghi rõ chưa thử lại copy/paste/UI nộp bài. Không xóa giới hạn này hoặc yêu cầu sửa editor/API chỉ vì chưa được thử. |
| Chuyển 3.3 sang khung hai tiểu mục/đủ bảng soi mới | **Ngoài scope.** Bài được đọc để kiểm mạch HAVING, không nằm trong danh sách bài cần chuyển của lượt này. Không dùng sự khác khung sẵn có làm lý do mở rộng sản phẩm hoặc nới allowlist test. |

## Giới hạn còn lại và kết luận

Tôi không chạy lại full Vitest, check/build/check:dist/API, SQL live, seed comparison hoặc static audit. Không có viewport/browser session riêng, không đo contrast/computed style/overflow hoặc thử bàn phím DOM. Bốn HTML sibling không có checksum riêng trong gói. Trạng thái database/dịch vụ hiện tại và hành vi bộ chấm runtime vẫn nằm ngoài kết quả tự kiểm của reviewer.

Trong phạm vi nguồn/build được giao, minh họa SELECT làm rõ từng ô, giữ giới hạn dữ liệu và tương thích renderer cũ; không phát hiện lỗi tích hợp cần sửa. Tác giả cần ghi quyết định xử lý từng mục cân nhắc theo §4.6 và giữ riêng các bằng chứng/giới hạn đã nêu. Kết luận này không thay bằng chứng SQL/UI và không cấp quyền push/deploy.
