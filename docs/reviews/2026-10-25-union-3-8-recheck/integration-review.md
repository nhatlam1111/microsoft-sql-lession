# Review tích hợp RunFlow — lượt rà lại bài 3.8

Ngày review: 25/10/2026, khoảng 23:03–23:08 +07:00. Reviewer độc lập, kế thừa model phiên; không phân tiếp cho agent khác.

## Phạm vi và phiên bản

- Source: nhánh `codex/review-lesson-3-8`, HEAD/base `19170bc`, cộng working tree được giao. Chỉ đọc diff; không sửa source, test, tài liệu sản phẩm hay Git.
- Phạm vi chính: `src/lib/run-flow.ts`, `src/components/lesson/RunFlow.astro`, `src/styles/lesson.css`, helper/test liên quan; đối chiếu bài 3.8 và hồi quy RunFlow mặc định ở 3.5/3.9. Không lặp lại review từng đề bài tập.
- Quyết định dùng để hiểu phạm vi: mục “Rà lại riêng bài 3.8 theo yêu cầu tiếp theo” trong `docs/superpowers/specs/2026-10-25-lessons-3-8-3-10-design.md`, hướng dẫn UNION mới trong template và DESIGN. Quyết định này thay chủ đích cũ không dùng RunFlow tuyến tính: hai nhánh phải độc lập, cùng đưa kết quả vào UNION, rồi mới ORDER BY.
- Đã đọc AGENTS, quy ước mục 4.5–4.6 và phần liên quan, template, hồ sơ công ty, mẫu 1.1, DESIGN, source bài 3.8 và phần RunFlow của 3.5/3.9. Không đọc report của reviewer khác.
- Bản HTML: `dist/bai/3-8-union-gop-danh-sach/index.html`, cùng HTML 3.5/3.9. Tự kiểm metadata thấy cả ba được ghi lúc **23:03:03 +07:00 ngày 25/10/2026**. Bốn source sản phẩm chính được ghi lúc **22:59:47 +07:00**. Đối chiếu nội dung drawer/query/focus thực tế bên dưới, không chỉ dựa timestamp.

## Kết quả

**Không phát hiện finding cần sửa trong phạm vi tích hợp được kiểm.** Mô hình dependency trong source/HTML đã biểu đạt đúng hai đầu vào độc lập. Kết luận này dựa vào đọc source, HTML đã build và test unit/component; không xác nhận thao tác browser, hình học thực tế hay SQL live.

### Mô hình logic và public contract — Giữ được

`RunFlow.astro:21–23` chỉ nhận dạng topology mới khi đủ đúng bốn bước `SELECT`, `SELECT`, `UNION`/`UNION ALL`, `ORDER BY`. Props vẫn là `query`, `steps`, `note`; interface `FlowStep` không đổi. Không thêm frontmatter, API, storage hoặc dữ liệu bài tập.

`run-flow.ts:35` thêm cả UNION và UNION ALL vào rank sau SELECT, trước ORDER BY; rank cũ không đổi. Unit test kiểm cả hai tên, chấp nhận hai SELECT trước UNION và từ chối đặt UNION sau ORDER BY hoặc SELECT sau UNION. Việc hai SELECT có cùng rank cho phép mô tả hai kết quả đã qua xử lý nội bộ, không ép nhánh thứ hai dùng dữ liệu của nhánh thứ nhất.

Lời dẫn bài 3.8 giải thích FROM → WHERE → SELECT trong từng nhánh, nói rõ hai nhánh độc lập và phân biệt mô hình logic với thực thi vật lý. Note trên sơ đồ nhắc lại quan hệ hai đầu vào. Người mới có thể trả lời vì sao cùng mã xuất hiện ở cả hai nhánh nhưng UNION còn một dòng mà không phải hiểu query plan vật lý.

### DOM, mũi tên, số dòng và accessible name — Giữ được ở mức source/HTML

HTML 3.8 có đúng **4 nút thẻ và 4 panel drawer**. Hai SELECT nằm hàng 1, cột 1/2; UNION và ORDER BY nằm hàng 3, cột 1/2. Hai SELECT không có `data-arrow`. Chỉ UNION có mũi tên sang phải tới ORDER BY (`RunFlow.astro:49`).

Hai path tại `RunFlow.astro:76–77` bắt đầu từ hai vùng input, đều hạ xuống vùng UNION bên trái; không có path đi từ input trái vào input phải. CSS đặt vùng nối vào hàng 2, chiếm cả hai cột (`lesson.css:163–166`). Kết hợp này không biến nhánh chấm công thành phần dữ liệu còn lại của nhánh đơn nghỉ.

Thẻ hiển thị lần lượt `có 9 dòng`, `có 76 dòng`, `còn 41 dòng`, `còn 41 dòng`; aria-label cũng dùng “Có” cho cả hai đầu vào. Mỗi card là button, có tên đầy đủ, `aria-expanded="false"` và `aria-controls` trỏ tới cùng drawer `rf-18`. Bảng nhỏ vẫn ẩn khỏi accessibility tree vì card đã có tên tóm tắt; bảng đầy đủ nằm trong drawer.

DOM có thêm một `li` chứa đường nối, nhưng nó được đánh dấu `role="presentation" aria-hidden="true"`; SVG có `focusable="false"` (`RunFlow.astro:74–75`). Bốn card/panel giữ thứ tự DOM tương ứng 0–3, thuận cho đọc và điều hướng chi tiết. Không thêm một bước tương tác thứ năm. Chưa thử screen reader thật, nên không khẳng định cách trình đọc cụ thể thông báo tổng số item.

### Drawer, focus và hồi quy hai bài dùng flow mặc định — Giữ được trong đối chiếu tĩnh

Tự so phần `<script>` của RunFlow hiện tại với HEAD sau chuẩn hóa xuống dòng: **giống hoàn toàn**. show/hide, Escape, phím trái/phải, bỏ qua phím có modifier và vùng bảng/pre, đóng khi bấm ngoài, focus trở về card, xử lý nút điều hướng bị disabled đều giữ code cũ. Phần drawer markup cũng không bị đổi.

| Bài | Topology trên HTML build | Card/panel | SQL từng drawer khớp source | Focus từng drawer khớp source |
|---|---|---:|---|---|
| 3.5 | Mặc định: FROM → LEFT JOIN → WHERE → SELECT → ORDER BY; snake ba cột | 5/5 | Có | Có |
| 3.8 | Hai SELECT độc lập → UNION → ORDER BY; hai cột | 4/4 | Có | Có |
| 3.9 | Mặc định: FROM → WHERE → SELECT → ORDER BY; snake ba cột | 4/4 | Có | Có |

Ở cả ba trang, drawer và panel ban đầu có `hidden`, card có `aria-expanded="false"`, câu ở bước cuối khớp `RunFlow.query`. 3.5 dùng drawer `rf-16`, 3.8 `rf-18`, 3.9 `rf-19`; ID/card control không bị trùng giữa các sơ đồ đã kiểm. Hai bài mặc định không nhận `data-layout="union"` và không sinh vùng nối UNION.

CSS mới chỉ đổi lưới khi có thuộc tính union; các quy tắc card, drawer, snake và focus hiện có được giữ. Đây là căn cứ không thấy hồi quy tĩnh; chưa phải phép thử thao tác bàn phím hoặc đo layout trong browser.

### Helper và mức bảo vệ test — Giữ được

`tests/helpers/lesson-blocks.ts:11` mở rộng regex để đọc thêm `note` literal tùy chọn sau `steps`, vẫn nhận dạng cú pháp cũ. Đã tự parse source 3.5/3.8/3.9 và kiểm nội dung trên HTML, gồm SQL sao chép trong từng drawer và vùng highlight. Không bị trường hợp helper bỏ sót flow 3.8 vì note mới.

Fixture mới ghi rõ là dữ liệu giả để kiểm topology; không được coi là kết quả HRM_Demo. Component test kiểm không có mũi tên input→input, bố trí đầu vào hai cột, bốn panel và số dòng “có/còn”; test rank bảo vệ vị trí UNION/UNION ALL. Test mặc định về snake, preview, focus và phím mũi tên tiếp tục qua.

## Kiểm do reviewer tự thực hiện

| Lệnh/kiểm | Kết quả |
|---|---|
| `npm test -- tests/run-flow.test.ts` | **12/12** qua; chạy lúc 23:05:29 +07:00, exit 0 |
| `npm test -- tests/components.test.ts -t RunFlow` | **8/8** test RunFlow qua; **18 test khác bỏ qua theo bộ lọc**; chạy lúc 23:05:29 +07:00, exit 0 |
| Script Node chỉ đọc MDX/HTML 3.5, 3.8, 3.9 | Số card/panel, layout, SQL, focus, trạng thái hidden/expanded đối chiếu như bảng trên |
| So source client script RunFlow với `git show HEAD:…` | Giống hoàn toàn sau chuẩn hóa CRLF/LF |
| Đọc diff source/test/docs và metadata build | Không thấy thay Props/FlowStep, backend, seed, YAML đáp án hoặc source bài khác |

Không chạy `tests/content-3-tail.test.ts`, vì file đó đọc seed và YAML đáp án; chỉ đọc phần code test liên quan. Không chạy toàn bộ suite hoặc build lại trong phạm vi reviewer. Không có lỗi nền phát sinh trong hai lần test đã tự chạy.

## Bằng chứng do tác giả cung cấp, chưa tự chạy lại

Gói giao review ghi: build **117 trang** lúc 23:03:03; toàn bộ test **306/306**; Astro check **0 error, 0 warning, 3 hints**; check:dist **1.837 link**; **9 SELECT text, 4 Result, 4 trạng thái** đã đối chiếu dữ liệu live. Các tổng này là evidence của tác giả được chuyển trong gói giao, không phải kết quả reviewer chạy. Reviewer chỉ xác nhận metadata và các phần HTML/source cụ thể ở trên.

## Phần đã cân nhắc và giới hạn còn lại

- Bốn số bước vẫn xác định thứ tự xem card/drawer. Note và lời dẫn đã nói rõ hai SELECT độc lập, không buộc thực thi vật lý theo số bước; chưa có căn cứ cần bỏ cách đánh số đang dùng chung.
- Kiểu nhận dạng mới chỉ hỗ trợ đúng shape bốn bước đã ghi trong template/DESIGN. Flow UNION không có ORDER BY, nhiều hơn hai nhánh hoặc mô tả chi tiết FROM/WHERE từng nhánh nằm ngoài shape này; bài 3.8 hiện tại không dùng các shape đó. Không yêu cầu xây parser SQL hoặc API topology tổng quát cho lượt sửa này.
- Chưa tương tác browser theo phân công, vì tab đang do tác giả giữ. Chưa đo tại 1280/1440, overflow, đường nối khi font tải xong, focus thực, Escape, chuyển drawer, copy/paste, screen reader, zoom hay reduced motion. Tác giả cần dùng kiểm browser thực tế cho phần nghiệm thu đó; source/HTML không thay được bằng chứng này.
- Không kết nối database, chạy SQL/API/runner, đọc `.env`/secret, seed hoặc đáp án YAML. Các số 9/76/41 được đối chiếu về tính nhất quán giữa bài/card/drawer/HTML; độ đúng với database dựa trên evidence live của tác giả.
- Không thực hiện audit diện rộng của skill frontend-design hoặc sửa source ngoài phạm vi chỉ đọc được giao. Review này không tuyên bố WCAG đầy đủ hay nghiệm thu toàn bộ UI.

Không có kiến nghị sửa bắt buộc mới trong phạm vi tích hợp. Không dùng kết quả review này thay bằng chứng kiểm browser/SQL hoặc quyền merge, push, deploy.
