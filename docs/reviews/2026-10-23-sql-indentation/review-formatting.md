# Review độc lập — mốc thụt lề SQL

Ngày 23/10/2026. Nhánh `codex/sql-indentation`, đối chiếu base `921730e` và working tree tại thời điểm review. Reviewer là agent mới, kế thừa model của phiên Codex, không truyền model khác. Không đọc review cũ. Không sửa source, không mở browser, không kết nối database.

Đóng vai Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học Microsoft SQL Server để đủ hiểu và phản biện developer. Lượt này chỉ đánh giá định dạng và các đường hiển thị/copy SQL; không làm lại review nội dung toàn khóa.

## Kết luận

**Không phát hiện lỗi cần sửa do diff định dạng này.** Các cấp thụt lề phân biệt được mệnh đề chính, phần tiếp của SELECT/điều kiện và nhánh CASE. Đã xác minh tĩnh và trên HTML/CSS build; chưa xác minh bằng mắt ở browser hoặc thao tác clipboard thật. Vì vậy đây là kết luận cho diff/source/build, chưa thay cho bước kiểm browser mà quy ước 2.4 yêu cầu trước bàn giao.

Không có finding P1/P2/P3 cho thay đổi đang review. Hai mục audit nền và giới hạn được ghi riêng bên dưới.

## Nguồn và phạm vi đã đọc

- `AGENTS.md`, `docs/quy-uoc.md` (đặc biệt 2.4 và mục 4), `docs/lesson-template.md`, `DESIGN.md`, `docs/ho-so-cong-ty.md`, bài 1.1 đã duyệt.
- Spec `docs/superpowers/specs/2026-10-23-sql-indentation-design.md` và plan `docs/superpowers/plans/2026-10-23-sql-indentation.md`.
- Toàn bộ diff từ `921730e`: tám MDX, ba CSS, hướng dẫn và các test thay đổi.
- Các chủ sở hữu chung: `Sql.astro`, `RunFlow.astro`, `LineMap.astro`, `Memo.astro`, `SqlEditor.tsx`, `ExerciseWorkspace.tsx`, `run-flow.ts`, `editor-keys.ts`, lexer và highlighter SQL.
- Tất cả 111 thuộc tính SQL (`Sql.code`, `RunFlow.query`, `steps[].sql`) trên 17 bài; toàn bộ 14 flow/55 bước; các hàng của 20 Memo và một LineMap.
- Hướng dẫn frontend-design/frontend-design-premium và ui-ux-pro-max, áp dụng trong phạm vi review tĩnh, giữ hợp đồng giao diện hiện hành. Không mở rộng thành redesign hoặc sửa lỗi nền.

## Đọc diff theo trải nghiệm học viên

| Nơi kiểm | Đánh giá | Vì sao / bằng chứng |
| --- | --- | --- |
| Bài 2.2, 2.4: SELECT nhiều cột | Giữ được | Cột tiếp dòng lùi một cấp; FROM/WHERE/ORDER BY cùng cột. Câu chính, query và SQL từng bước thống nhất. |
| Bài 2.3: AND và ngoặc | Giữ được | AND xuống dòng lùi một cấp, ngoặc và thứ tự điều kiện giữ nguyên. Ví dụ thiếu ngoặc vẫn được ghi rõ là ví dụ sai; định dạng không được dùng để hứa thay thế ngoặc. |
| Bài 2.5, 2.7: biểu thức/hàm trong danh sách SELECT | Giữ được | Phần tiếp dòng có mốc rõ; chuỗi có dấu cách chủ ý như `NV007 ` và `N'  Kế  toán  '` không bị chỉnh bên trong literal. |
| Bài 2.8: cột tính và khoảng ngày | Giữ được | DATEDIFF là biểu thức tiếp dòng, AND thuộc điều kiện trước ORDER BY; focus nhiều dòng giải mã đúng tab của query. |
| Bài 2.9: CASE | Giữ được | CASE/END lùi một cấp, WHEN/ELSE hai cấp. CASE ngắn được tách thêm dòng nhưng giữ nguyên token và literal. HTML build còn tab thật ở cả một và hai cấp. |
| Bài 3.1: tổng hợp và điều kiện | Giữ được | SUM/CAST/MIN/MAX tiếp dòng lùi một cấp; AND lọc ngày lùi một cấp dưới WHERE. Câu trả lời, Result và trạng thái các bước không bị sửa. |
| LineMap/Memo | Giữ được | CSS dùng cùng token; Memo thêm `white-space: pre-wrap`. Toàn bộ SQL hiện có trong hai loại khối đều một dòng, không có dòng SQL nhiều dòng bị bỏ sót cần chuyển tab. |
| Màn bài tập | Giữ được ở source/CSS | Hai lớp `.ed-highlight, .ed-input` dùng chung declaration và token, giữ cùng font/line-height/padding. `SqlEditor` và logic nạp/lưu/chạy draft không thay đổi; phím Tab vẫn chèn bốn dấu cách. |

Không đề xuất viết lại lời giảng: diff không có vấn đề nội dung mới cần giải quyết để đọc được mốc tab.

## Đối chiếu có hệ thống

Đã dùng script Node thuần cục bộ để đọc bản base qua `git show`, giải mã template literal bằng VM, rồi đối chiếu với working tree. Lexer `lexTsql` chỉ bỏ token `space` khi so; literal, bracket identifier, comment, ký hiệu, toán tử và thứ tự token vẫn được so nguyên vẹn.

- 111 khối SQL trên 17 bài có cùng số lượng và thứ tự trước/sau.
- 42 chuỗi SQL đổi khoảng trắng; **0 chuỗi đổi token**. Việc xuống dòng CASE ngắn cũng chỉ đổi whitespace.
- Không thay bài tập YAML, API/grader, dữ liệu Result/Messages, lời giải hay các điều kiện SQL trong diff.
- 97 khối Sql trong HTML build có text sau bỏ markup/giải mã entity đúng bằng chuỗi source đã giải mã (sau xử lý dòng trắng đầu/cuối vốn có của Sql).
- 92 thuộc tính `data-copy` bằng đúng SQL render tương ứng; không chứa hai ký tự `\\t`. Năm khối không có copy vẫn giữ trạng thái đó.
- 14 `RunFlow.query` trùng nguyên chuỗi với Sql chính ngay trước sơ đồ.
- 55/55 `focus` tìm thấy đúng trong query. Đã đối chiếu phần mark trên HTML với `splitFocus(query, focus).focus` và dựng lại toàn câu từ các dải trước/focus/sau: đều khớp, không rơi mất tab đầu dòng. `splitFocus` chủ ý highlight cả dòng chứa focus nên không so mark trực tiếp với một đoạn focus ngắn.
- CSS build chứa `--sql-tab-size: 4` và năm nhóm consumer: Sql, LineMap, Memo, RunFlow query và hai lớp editor dùng chung rule. `DESIGN.md` mô tả đúng owner runtime ở `tokens.css`.

## Test có bị nới không?

**Không thấy nới kiểm số liệu hoặc điều kiện.**

- `tests/content-2-3.test.ts` chuyển phần SQL capture thành JavaScript literal đã giải mã trước khi kiểm điều kiện; assertion nghiệp vụ giữ nguyên.
- `tests/content-2-8.test.ts` và `tests/helpers/lesson-blocks.ts` giải mã query giống steps vốn đã giải mã; `checkFlow` không bị bỏ hoặc hạ điều kiện. Các kiểm rows/total/ngày/phạm vi còn nguyên.
- Test nội dung vẫn chặn khoảng trắng/tab literal đầu dòng trong MDX; bổ sung kiểm escape cho dòng tiếp SELECT và AND/OR/WHEN/ELSE/END. Danh sách bài được phép dùng khung cũ không tăng.
- Hai component test mới kiểm text/copy Sql có tab thật và focus SELECT nhiều dòng. Chúng là bằng chứng bổ sung cho chuỗi component; audit dist độc lập ở trên kiểm thêm việc MDX compile giữ tab.

## Các câu “tại sao / để làm gì” của người học

| Câu hỏi tự đặt | Đã trả lời chưa? |
| --- | --- |
| Tại sao phải có mốc tab? | Có: giúp nhận diện cột/biểu thức đang tiếp SELECT, điều kiện đang tiếp WHERE và nhánh của CASE. Mẫu 3.1 và 2.9 thể hiện rõ. |
| Thụt lề AND có thay nhóm điều kiện không? | Có câu trả lời trong 2.3: ngoặc quyết định nhóm, xuống dòng/thụt lề không thay ngoặc. Diff giữ đúng ý này. |
| Tại sao CASE/END cùng cột còn WHEN/ELSE sâu hơn? | Cấu trúc nhìn thấy trên code và ví dụ quy ước thể hiện CASE là biểu thức chứa các nhánh. Không cần thêm đoạn giảng trong bài để giải thích thay đổi trình bày. |
| Tại sao phải ghi escape trong file MDX? | Có trong quy ước/template: compiler có thể xóa whitespace đầu dòng. HTML build xác nhận escape thành tab thật. Đây là quy tắc cho người viết bài, không thêm gánh nặng vào luồng học viên. |
| Sao chép rồi dán sang chỗ chạy có giữ như hình không? | Đã xác minh chuỗi build/data-copy và đường code `navigator.clipboard.writeText`; chưa thao tác clipboard thật trong lượt này. Cần người làm bài kiểm browser theo quy ước. |
| Trang có tự sửa câu đang gõ của tôi không? | Source cho thấy không có formatter mới; draft được nạp/lưu nguyên văn, editor đổi nội dung khi người dùng gõ hoặc bấm Tab. Chưa kiểm runtime lưu/khôi phục draft. |

## Lệnh kiểm tự chạy

| Lệnh / phép kiểm | Kết quả thực tế |
| --- | --- |
| `npm test -- --reporter=dot` | Đạt: 38 test files, 269 tests. |
| `npm run check` | Đạt: 138 files; 0 errors, 0 warnings, 3 hints deprecation nền. |
| `npm run build` | Đạt: 99 trang, static production build. |
| `npm run check:dist` sau build | Đạt: 99 trang, 1651 link. |
| `git diff --check` | Đạt, không có lỗi khoảng trắng Git. |
| Audit token/render/copy/query/focus bằng Node | Các đối chiếu nêu trên đạt. Không kết nối mạng/DB. |
| `audit_project.py 'E:/Projects/SQL Lession' --mode strict` | Exit 1, hai mục nền dưới đây. Không dùng kết quả này để báo toàn bộ UI đã đạt. |

Ba hint của Astro nằm ở `ExerciseWorkspace.tsx:1,73` (`FormEvent` deprecated) và `SqlEditor.tsx:30` (`document.execCommand` deprecated); các file này không đổi so với base.

Audit UI strict trả JSON với `summary.errors: 2`, `violations: 2`, `warnings: 0`, `unresolved: 0`:

Lệnh audit có tạo `premium-audit.json` ở root vì không dùng `--no-write`. Reviewer đã báo người thực hiện; giữ file theo yêu cầu để chuyển vào thư mục evidence, không coi đây là thay đổi source của tính năng.

1. `src/components/islands/ExerciseWorkspace.tsx:91`, `form.novalidate-missing`: form chưa khai báo validation owner. Source không đổi trong diff; lỗi nền ngoài phạm vi định dạng.
2. `src/components/islands/SqlEditor.tsx:53`, `form.textarea-resize-missing`: scanner không thấy resize trong JSX. Kiểm CSS thấy `.ed-input { resize: none; ... }` tại `src/styles/exercise.css:27`, editor cao 280px. Đây là nhận diện thiếu bằng chứng của scanner, không phải lỗi resize do diff.

## Chưa kiểm và điều kiện hoàn tất

- Không mở browser theo phạm vi được giao. Chưa đo computed style/pixel, scrollbar và editor overlay ở 1280/1440px; chưa bấm drawer, Sao chép/dán, Tab/Ctrl+Z, chạy câu hay khôi phục draft trong browser. Không suy các kết quả tĩnh thành đã kiểm tương tác.
- Không kết nối DB, không chạy SQL khóa học và không xác minh lại số liệu/kết quả/thông báo lỗi trên DB. Giữ nguyên token so với base là bằng chứng không đổi câu lệnh, không phải chứng nhận số liệu nền đúng.
- Không chạy API `check:exercises`/`check:data` vì chúng dùng kết nối DB; phần này thuộc lượt kiểm của người thực hiện.
- Không review lại toàn bộ nội dung/mạch giảng của các bài đã duyệt, không đọc review trước để giữ độc lập.

Ưu tiên còn lại trước bàn giao: hoàn tất kiểm browser bắt buộc của quy ước 2.4 (một SELECT nhiều cột/điều kiện, CASE hai cấp, drawer highlight và copy/dán vào editor), rồi ghi đúng kết quả API/DB vào spec/plan. Không có yêu cầu sửa source phát sinh từ lượt review này.

### Bổ sung phối hợp sau khi viết kết luận

Người thực hiện báo đã kiểm browser trên 17 bài: 97 SQL render/copy và 55 khung focus khớp nguồn, tab bốn cột; copy thật và Ctrl+V vào editor, Tab bốn dấu cách/Ctrl+Z, khôi phục draft đạt. Người thực hiện cũng báo API 45/45 và `check:data` sạch. Đây là thông tin phối hợp từ agent chính, không phải thao tác browser/DB do reviewer tự thực hiện; cần lưu evidence của lượt đó và cập nhật spec/plan tương ứng. Với thông tin này, các bước còn lại nêu trên đã có kết quả từ người thực hiện, không có thêm yêu cầu sửa code của reviewer.
