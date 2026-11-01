# Review tích hợp độc lập PL.1–PL.6

## Phạm vi, phiên bản và cách kiểm

- Ngày: 01/11/2026. Model thực tế: **kế thừa model của phiên**, không đổi model, không phân tiếp agent. Vai học thử: chỉ biết Excel văn phòng cơ bản; không lấy kiến thức chuyên gia hoặc bài sau bù lời giảng.
- Nhánh: `codex/appendix-reference-pl-1-6`. Base `5c2604a2495ddf6fbb9a2835f5057a551834f55e` → HEAD `35b35ab7ac04cd33d8a8e568ce2b020cc02c9b47`. Tự đọc HEAD và `git status --short`: đúng commit, sạch trước khi ghi report này.
- Build được giao: `dist/`, 01/11/2026 10:27:24 Asia/Saigon. Tự đối chiếu SHA256 cả sáu MDX với `sql-source-coverage.json`: **6/6 khớp**; đối chiếu nguyên văn SQL nguồn với HTML: **53/53 khớp**. Đây là kiểm source/HTML, không phải thực thi SQL.
- Phạm vi: mạch giữa sáu phụ lục và các bài chính liên quan; schema/catalog, route/index, previous/next, sidebar, tìm kiếm, tiến độ/resume, bảng và bảo vệ build. Không lặp lại toàn bộ review từng bài; không sửa source/test/spec/plan/Git.
- Đã đọc AGENTS.md, quy ước (đặc biệt §2.7, §4.5–4.6), template, hồ sơ công ty, DESIGN.md, spec/plan được giao, toàn bộ sáu MDX, mẫu 1.1/2.1, bài 1.3/2.5/2.7 và các phần giảng liên quan của 2.8/2.9/3.1. Đã đọc sáu report gốc, ma trận quyết định, verification, hai snapshot kỹ thuật, infrastructure evidence, SQL coverage, mô tả SQL limits trong verification và UI audit được giao.
- Công cụ tự dùng: PowerShell/`rg`, Git chỉ đọc, Node/TypeScript/YAML để đối chiếu metadata tìm kiếm, Python chuẩn `html.parser`/hash/URL để kiểm HTML, Vitest targeted. Đọc hướng dẫn frontend-design/frontend-design-premium và checklist cho phần giao diện; quy ước và phạm vi review của repo được ưu tiên. Không mở browser, không đọc secret/seed, không kết nối database, không chạy SQL/API/runner hoặc nộp bài; không push/deploy.

## Finding theo tác động

### INT-01 — Biên tập / cần sửa, ưu tiên thấp: một số tên có trong phần tra cứu chưa tìm được phụ lục tương ứng

**Vị trí và câu gốc:**

- `src/content/appendices/pl-1-chi-tiet-kieu-du-lieu.mdx:6` chưa có các tên đồng nghĩa; bảng Tra nhanh dòng 24 lại chỉ rõ tên `integer`, và bảng dòng 232–239 có `integer`, `double precision`, `character varying`, `national character varying`.
- `src/content/appendices/pl-4-tinh-toan-va-lam-tron.mdx:6` chưa có `SUM`, dù dòng 127 là mục `## SUM, ROUND` và phần này giải thích khác biệt giữa cộng số đã làm tròn với làm tròn tổng.
- `src/lib/search.ts:28–31,63` chỉ lập chỉ mục title/summary/keywords, không lập chỉ mục các tên trong thân bài.

**Tác động:** người gặp đúng tên trong cấu trúc cũ hoặc cần tìm lại mục tổng/làm tròn có thể kết luận phụ lục không giải thích nó. Đây là **đã giảng nhưng khó tìm**, không phải thiếu danh mục hoặc sai SQL. Nhập `SUM` vẫn tìm được bài chính, nhưng không thấy PL.4; nhập các tên đồng nghĩa trên thì không có kết quả.

**Căn cứ tự kiểm:** chạy phần `normalizeVi`/`searchItems` lấy từ source qua TypeScript với metadata frontmatter thực tế, không chạy React/browser. Kết quả: `integer`, `double precision`, `character varying`, `national character varying` → `[]`; `SUM` → `3.1, 3.10, 4.3, 4.4`, không có PL.4. Các đối chứng `TRY_CONVERT`, `DATE_BUCKET`, `PL.1` tìm đúng PL.2/PL.5/PL.1. Đây không phải lỗi do giới hạn tám kết quả: các truy vấn thiếu có dưới tám kết quả. Quy ước §2.7 yêu cầu đưa tên kiểu/hàm quan trọng vào từ khóa; spec hứa tra theo tên kỹ thuật.

**Đề xuất ngắn:** thêm các tên đã giảng cần tra vào `keywords`, ít nhất các tên đồng nghĩa đã đưa vào Tra nhanh PL.1 và `SUM` của PL.4; thêm kiểm truy vấn trên frontmatter thật để tránh danh mục nội dung và metadata lệch nhau. Không cần đổi thuật toán tìm kiếm hoặc lập chỉ mục toàn văn.

Một trường hợp nhỏ cùng cơ chế để root quyết định: `SQL_VARIANT_PROPERTY` được giải nghĩa và dùng trong PL.5 dòng 140–142 nhưng tìm đúng tên trả `[]`; có thể thêm keyword nếu muốn tìm lại ví dụ kiểm kiểu, hoặc ghi rõ đây là hàm phụ trợ ngoài danh mục tra chính. Không cần mở thêm bài metadata.

Không phát hiện finding khác có đủ căn cứ để kết luận lỗi tích hợp, sai kiến thức SQL hoặc mất tiến độ trong phạm vi kiểm này.

## Mạch nội dung và tích hợp giữ được

| Điểm giao | Kết quả đọc/đối chiếu trực tiếp |
|---|---|
| PL.1 → PL.2 | PL.1 sở hữu miền, đơn vị, precision/scale và payload/chi phí lưu; PL.2 sở hữu hướng chuyển, ưu tiên/gán, style/culture và mất ý nghĩa. Bảng năm kiểu nói rõ phạm vi, không tự nhận ma trận đầy đủ. Không thấy hai bài hứa chuyển thành công là giữ nguyên dữ liệu. |
| PL.1/PL.2 ↔ PL.3 | Byte, đơn vị UTF-16 và ký tự không bị đánh đồng; LEN bỏ dấu cách cuối, DATALENGTH đo byte giá trị. Quy tắc NULL của tìm/nối/tách/gộp nêu riêng. Khác biệt PATINDEX giữa tài liệu và Azure được ghi là khác biệt, không biến một phép thử thành bảo đảm đa nền tảng. |
| PL.2 ↔ PL.4 | Chuyển đầu vào trước phép tính nhất quán ở chia nguyên, tràn và ROUND; giá trị đã làm tròn khác khai báo scale. Công thức toán có lời giải nghĩa max; không bị trình bày như hàm MAX nhận hai đối số SQL. SUM/ROUND giải thích thời điểm làm tròn trước khi ôn. |
| PL.1/PL.2 ↔ PL.5 | date/time/datetime2/datetimeoffset, giờ UTC và chuỗi trình bày được phân biệt. DATEADD/DATEDIFF không bị hiểu thành ngày làm việc/năm tròn; khoảng nửa mở không đoán giây cuối. Gắn vùng nguồn khác chuyển cùng thời điểm đã được minh họa. |
| PL.4 ↔ PL.6 | NULLIF bảo vệ ngay mẫu số và giữ trạng thái chưa tính được, không tự đổi thành 0. CASE là biểu thức, chọn nhánh đúng đầu tiên; kiểu chung của mọi nhánh và khả năng tính đầu vào sớm được phân biệt. MAX/tổng hợp đã được giải nghĩa trước cảnh báo. |
| Các bài chính | Các điểm nền 1.3, 2.5, 2.7, 2.8, 2.9, 3.1 nối được với phần đào sâu; không thấy phụ lục kể thêm dữ kiện công ty hoặc đổi ý nghĩa NULL, Unicode, ranh giới ngày, nhánh CASE. Diff không đổi MDX bài chính, YAML, curriculum, progress owners, API hoặc database. Không dùng phụ lục làm lý do cắt lời giảng bài chính. |
| Tự kiểm tra | Đọc nguồn và cấu trúc HTML xác nhận mỗi bài ba details, không mặc định mở; các đề cần SQL ở PL.1/PL.2 đã đặt ngoài đáp án. Các đề còn lại có biểu thức/dữ kiện trong summary. Không thấy câu ôn dùng để dạy bù kiến thức cốt lõi; không có YAML/bài tập chấm mới. |

Các câu hỏi “vì sao/để làm gì” ở mức tích hợp đã có lời giải: chọn kiểu theo ý nghĩa thay hình dạng ô (PL.1), kiểm nghĩa sau chuyển thành công (PL.2), phân biệt làm ra nhãn với nguồn đầy đủ (PL.3/PL.6), giữ thời điểm chuyển/làm tròn (PL.4), chốt hệ quy chiếu giờ và biên báo cáo (PL.5). Không cần ép một tình huống chung hoặc đọc tuần tự cả chương mới thấy các kết luận này.

**Catalog và tiến độ:** collection/schema/catalog riêng, thứ tự PL.1–PL.6 cố định, relatedLessons được xác thực với catalog chính. AppendixLayout không mount LessonStatus hoặc gọi markSeen; các owner progress chỉ nhận 50 mã bài chính. Previous/next của PL.1 và PL.6 dừng ở biên chương; bài 6.7 không được nối sang phụ lục. Main mindmap chỉ nhận thêm dữ liệu sidebar, không thêm node/level. Tests targeted xác nhận 50 bài/sáu level và các hồi quy progress/roadmap/mindmap; đây chưa phải kiểm lưu trữ trình duyệt.

**Route, TOC và bảng:** index cùng sáu trang dùng path helper theo base hiện hành. Tự kiểm từ bảy trang có **119 link fragment nội bộ có đích**, gồm TOC, Tra nhanh, link chéo và mục liên quan. Sáu HTML có lần lượt 11/7/1/2/2/3 wrapper bảng tra, dùng vùng cuộn có tên và tabindex; CSS giao phần cuộn ngang cho bảng, không đặt chiều cao khóa trang. Kết quả này xác nhận cấu trúc HTML/CSS, không xác nhận cảm giác cuộn hoặc layout trên viewport.

**Search owner:** adapter chỉ gộp catalog ở nơi tìm kiếm, có nhãn Phụ lục, dùng href thật; mã PL và tiếng Việt không dấu có normalize. Source có clear/refocus, no-results, nhánh Escape, Arrow/Enter từ input, vòng Tab và inert/focus restoration; guard composition có trong cả shortcut và Enter. Không thấy thêm request bất đồng bộ hoặc đường ghi dữ liệu trong luồng tra cứu. INT-01 là lệch metadata, không phủ nhận các hành vi được giữ trong owner.

**Build protection:** diff `check-dist.mjs` bổ sung kiểm trang/fragment PL và giữ vòng lấy answer/check từ YAML cùng `findAnswerLeaks` trên HTML/JS/JSON đã ship. Test của các hàm kiểm build đạt; tôi không chạy CLI check:dist vì lệnh đầy đủ đọc seed, trái phạm vi reviewer. Kết quả toàn bộ check:dist thuộc evidence root nêu dưới đây.

## Kiểm tôi thực hiện và evidence được giao

| Nguồn | Kiểm và kết quả |
|---|---|
| Reviewer tự chạy | `npm test -- tests/appendices.test.ts tests/appendix-content.test.ts tests/catalog.test.ts tests/search.test.ts tests/paths.test.ts tests/check-dist.test.ts tests/roadmap.test.ts tests/progress.test.ts tests/progress-store.test.ts tests/mindmap-layout.test.ts tests/mindmap-view.test.ts` → exit 0, **11 files / 79 tests đạt**, 10:37:01. Không chọn islands.test.ts vì file đó có kiểm đọc seed. |
| Reviewer tự đối chiếu | 6/6 hash MDX khớp coverage; 53/53 SQL khớp văn bản pre của HTML; 18 details không có open; 119 fragment nội bộ từ bảy trang có đích. Không mở trình duyệt hoặc thực thi SQL. |
| Reviewer tự đọc diff | Không có đổi bài chính/YAML/API/database/progress owners; các bảo vệ answer leak vẫn có trong check-dist. Chỉ kiểm source của bảo vệ và unit tests, không xác nhận lại mọi artifact đã ship không lộ đáp án. |
| Root/tác giả — đã đọc evidence, không chạy lại | `verification.md` ghi 384/384 tests, check 0 errors/0 warnings/3 hints nền, build 136 trang, check:dist 2.502 link, DESIGN lint 0 errors. UI audit vẫn exit 1 với một finding SqlEditor resize-none nền, không bị đổi thành đạt. |
| Root/tác giả — SQL riêng | Coverage ghi 53 SELECT có live evidence, 47 Result được so cột/dòng/giá trị; verification mô tả các probe TRY_CAST/PARSE sau review trong limits. Tôi chỉ kiểm source hash/query tương ứng, không xác nhận engine bằng chạy lại. Hai technical snapshots là trạng thái lúc tác giả bàn giao, không thay verification hiện hành. |
| Root — browser riêng | verification ghi mở index/sáu bài, viewport 1280/1024/1440, hẹp 1000, bảng cuộn, search/clear/Escape/Tab/Enter, details và clipboard; tiến độ vẫn 0/50, resume 1.1. Đây là phép kiểm của root, không phải thao tác do reviewer thực hiện. |

## Những điểm cân nhắc nhưng chưa kết luận hoặc ngoài phạm vi

1. **Minor, cần root quyết định:** PL.3/PL.4 dòng 10–12 nói ví dụ dùng giá trị cố định và dẫn SELECT/AS tới 2.1, nhưng chưa nói thẳng SELECT không cần FROM như PL.1/PL.2/PL.5/PL.6. PL.4 dùng CAST ngay phần decimal, với ý nghĩa có thể lần theo lời “chuyển đầu vào”; cú pháp đầy đủ đã có ở PL.1/PL.2. Tôi không kết luận ba câu ôn thiếu tiền đề vì chúng có giải thích thao tác trong chính bài. Có thể đồng bộ một vế mở đầu và nghĩa CAST nếu root muốn lời hứa “chỉ cần SELECT/AS” chặt hơn; không cần ép đọc cả PL.1/PL.2.
2. **Undetermined — SSR/hydration với tiến độ đã lưu ở level khác:** source dùng cùng getServerSnapshot/useProgress và catalog 50 bài nên không thấy đường ghi PL vào resume. Bằng chứng browser root được giao ghi resume 1.1; tôi chưa thử mở thẳng PL với lastLessonNum ở level khác hoặc khôi phục tab từ bfcache. Đặc biệt open state của nhóm sidebar được khởi tạo một lần; không suy từ kiểm SSR tĩnh rằng nhóm mở sẽ tự chạy theo snapshot mới sau hydrate. Đây là giới hạn kiểm trạng thái nhóm mở, chưa phải bằng chứng mất resume hoặc lỗi hydration.
3. **Undetermined — IME và truy cập:** guard composition/focus/inert đọc thấy trong source; không thử IME thật, screen reader hoặc mọi trình duyệt. Không kết luận guard đã hoạt động trên mọi bộ gõ chỉ vì có mã. Root cũng ghi rõ chưa kiểm IME, zoom 200% và reduced motion bằng thiết bị; các giới hạn này được giữ, không chuyển thành finding chưa có tái hiện.
4. **Giới hạn kỹ thuật có chủ đích:** không xác nhận SQL Server 2025 cài riêng/Managed Instance, mọi collation/culture/DST, remoting hoặc dung lượng cực đại từ một lần kiểm Azure. verification và bài đã phân biệt phạm vi nền tảng/preview, payload và lưu vật lý; không có căn cứ trong lượt đọc này để gọi các giới hạn hiếm là sai hoặc yêu cầu chạy thêm ngoài phạm vi. PATINDEX NULL vẫn là khác biệt nguồn/live đã ghi, không chốt lại bằng trí nhớ.
5. **Ngoài phạm vi:** API build/check:exercises/check:data, editor/draft, xác thực web và câu ghi không đổi; reviewer không chạy các luồng đó. Không thêm luồng chạy SQL vào PL, không đổi seed hoặc yêu cầu mở rộng PL.7 hay toàn bộ danh mục hàm. Finding audit SqlEditor nền không phải thay đổi của phụ lục; tôi đọc JSON được giao, không tự nhận đã chạy strict audit.

## Kết luận trong phạm vi review

Có một finding nhỏ có căn cứ về khả năng tìm theo tên (INT-01), cùng các điểm minor/undetermined cần root ghi quyết định theo §4.6. Không phát hiện lỗi tích hợp khác có căn cứ từ source/HTML và các targeted tests đã chạy; không thấy cơ chế thêm PL vào 50 bài hoặc ghi PL làm resume. Phần nội dung nối được với bài chính và giữ lời giảng cốt lõi trước tự kiểm tra. Kết luận này không thay cho bằng chứng SQL/UI riêng, không xác nhận những hành vi chưa thử và không tạo quyền push/deploy.
