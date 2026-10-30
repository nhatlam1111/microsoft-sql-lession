# Review tích hợp: năm bài nền 1.1–1.5, trang Giới thiệu và công cụ liên quan

Ngày 30/10/2026. Một lượt, một agent, không giao tiếp cho agent khác.

## 1. Phạm vi và phiên bản thực tế

- **Công cụ và model:** Claude Code, agent mới; model Claude Sonnet 5.5 (`claude-sonnet-5-5`). Mức effort do phiên đặt, tôi không đọc được giá trị cụ thể nên không ghi.
- **Base / head:** `44b2ae6` / `9176c0a` trên `feat/level-1-foundation-lessons` (`git rev-parse HEAD` = `9176c0af05b1…`). `git diff --stat` ra 25 file, 843 thêm / 819 bớt. `git status` có một thư mục chưa theo dõi `docs/reviews/2026-10-30-bai-nen-dot-2/`; tôi không mở nó và không mở `temp/review` hay các thư mục khác của `docs/reviews`.
- **Build:** `dist/` dựng 21:04 ngày 30/10 (`dist/index.html`, `dist/gioi-thieu/index.html` cùng giờ), đúng với head theo gói giao việc. Tôi chỉ đọc HTML/JS của `dist` bằng grep, không mở trình duyệt.
- **Đã đọc đủ:** bài 1.1–1.6; `src/pages/gioi-thieu.astro`; `docs/ho-so-cong-ty.md`, `docs/lesson-template.md`, `docs/quy-uoc.md`, `AGENTS.md`, `CLAUDE.md`; spec và plan 30/10; `verification.md` (tách riêng với phần tôi tự kiểm); `tests/content.test.ts`, `tests/docs.test.ts`, `tests/helpers/lessons.ts`, `src/lib/lesson-schema.ts`, `ExerciseWorkspace.tsx`, `DbDiagram.tsx` (phần liên quan); bài 1.2 và 1.3 cũ qua `git show`; Grep mọi chỗ trong `src/` trỏ về bài 1.1–1.5 và đọc dòng quanh đó (kèm các bài 2.1, 2.2, 2.4, 2.5, 2.7, 2.9, 3.1, 3.4, 3.6, 3.8).
- **Tôi tự kiểm (khác với lời tác giả):**
  - Đối chiếu tên cột, kiểu, `NULL`/`NOT NULL`, khóa chính và khóa ngoại trong các bài với `database/HRM_Demo.sql`.
  - Đối chiếu mã, họ tên và ngày trong ảnh 1.2 và các ví dụ với `docs/ho-so-cong-ty.md`.
  - Chạy lại bằng một script Node ngoài repo (thư mục scratchpad) phép đếm của `proseParagraphs`: 1.1 = 698, 1.2 = 551, 1.3 = 691, 1.4 = 611, 1.5 = 645 từ. Số của 1.1 trùng với số tác giả báo.
  - Grep `dist/` để xác nhận 4 `id` của trang Giới thiệu, các `href` tới trang này trong 1.1 và 1.6, và chuỗi `#tao-ban-rieng` trong bundle `ExerciseWorkspace`.
- **Tôi không làm:** không chạy `npm test`, `check`, `build`, `check:dist` (số liệu 323/323, 0 lỗi, 132 trang, 1994 liên kết là của tác giả, tôi không xác nhận); không chạy SQL hay API; không mở trình duyệt; không đọc `.env`.

## 2. Kết quả từng mục

### Mục 1. Đường thực hành

**Người chỉ dùng web.** 1.1 (L53) → trang Giới thiệu `#chon-noi-thuc-hanh` → bullet "Có mã truy cập: bấm Làm bài…" → bài 1.6 → mục Bài tập "bấm Làm bài ở bài tập 1" → `<Exercises />`. Không có lời trỏ gãy: cả ba `href` tới trang Giới thiệu có đích (xem dưới), nơi nhận mã được nêu ("người phụ trách hoặc người đã gửi bạn khóa học"), và trang nói rõ "không cần Windows hay SSMS" và "không cần làm theo mục kết nối SSMS". Vướng ở 1.6: finding F3.

**Người dùng SSMS.** Đi được nhưng không có lối vào rõ: finding F1 (bullet chọn nơi thực hành không có mục cho tài khoản SSMS của khóa học, `#ket-noi-ssms` không được link từ đâu), F2 (mất lời trỏ ở bước Connect).

**Đích link (đọc từ `dist`):**

| Link | Nơi | Đích | Kết quả |
|---|---|---|---|
| `…/gioi-thieu/#chon-noi-thuc-hanh` | 1.1:53; 1.6:207 | `<h2 id="chon-noi-thuc-hanh">` | Có; `href` có trong `dist/bai/1-1…` và `dist/bai/1-6…` |
| `#tao-ban-rieng` (nội bộ) | gioi-thieu.astro:23 | `<h3 id="tao-ban-rieng">` | Có |
| `/gioi-thieu/#tao-ban-rieng` | ExerciseWorkspace.tsx:92 | cùng đích | Có; chuỗi nằm trong bundle JS, không có trong HTML trang bài tập |
| `#ket-noi-ssms`, `#loi-ket-noi` | không đâu | `id` có tồn tại | Đích có, **không link nào trỏ tới** (F1, F2) |

`scripts/check-dist.mjs:29-30` bỏ phần sau `#`, nên `check:dist` không kiểm đích (F11). Tôi chưa xác minh cuộn thật trên trình duyệt; `base.css:2` có `scroll-padding-top` cho thanh trên cùng (đọc CSS, chưa thấy trên màn hình).

**Nội dung kỹ thuật 1.2 cũ so với trang Giới thiệu.** Giữ nguyên: chỉ chạy trên Windows và link cài; Azure SQL Database; đường máy chủ → database → bảng và `dbo`; bốn thông tin kết nối; SQL Server Authentication; bảng so sánh hai nơi; nhắn IT hỏi cổng `1433`; các ô hộp kết nối mới và cũ; Encrypt Strict và không bật Trust Server Certificate; Object Explorer → Columns; tránh Edit Top 200 Rows; New Query và ô chọn database; câu kiểm tra `SELECT * FROM PhongBan;` với sáu dòng; ngắt kết nối khi học xong; lời hứa hoàn tác chỉ có trên trang bài tập; chỉ chạy câu đọc trên database dùng chung; bốn bước tạo bản riêng; cảnh báo script xóa bảy bảng; `18456`, tên máy chủ, `40613`, New Firewall Rule → Cancel. Mất hoặc đổi chỗ:

- Lời trỏ ở bước **Connect** tới `40613` và New Firewall Rule (F2).
- Câu "nếu đã tạo bản riêng, thay thông tin kết nối bằng dòng tương ứng" và câu "cú pháp `SELECT` học ở bài 1.6" ở bước kiểm tra (F6).
- Ý "bảng `PhongBan` không có cột trạng thái" và lời trả lời chị Hạnh: bỏ có chủ ý, trang chỉ nêu danh mục, không còn kết luận "sáu phòng còn hoạt động".
- Lời trỏ 6.1/6.2: bỏ, không ảnh hưởng.

### Mục 2. Kiến thức nền và thuật ngữ

| Thuật ngữ | Định nghĩa lần đầu | Dùng như đã học ở | Đánh giá |
|---|---|---|---|
| chuỗi | 1.3:30 "cột lưu chữ (còn gọi là **chuỗi**)" | 1.3, 2.1:52, 3.8:46 | Ổn |
| `NULL` | 1.3:26 (định nghĩa cạnh hình Explorer) | 1.4, 1.6:60, 2.5 | Ổn; xuất hiện trước đó chỉ ở chú thích hình trang Giới thiệu, có trỏ "bài 1.3 và 1.4" |
| khóa chính, khóa ngoại | 1.4:24, 1.4:30 (1.3:26 chỉ nhắc trước kèm "học ở bài 1.4") | 1.5, 1.6 | Ổn |
| ràng buộc | 1.4:24 "luật dữ liệu đã nói ở bài 1.1" (1.1:57 có "luật dữ liệu") | 5.2 | Ổn |
| câu ghi | Bị bỏ khỏi 1.4. Grep toàn `src/`: không bài nào còn dùng "câu ghi". "Ghi" được giải bằng "thêm, sửa, xóa" ở 1.4:32 (1.4:20 dùng "khi ghi" trước đó, vẫn đọc hiểu được) | Không còn | Ổn |
| bản ghi | 1.2:31 | Không bài nào khác dùng | Ổn |
| kết bảng | 1.5:48 "gọi là kết bảng, học ở bài 3.4 và 3.6" | 3.4:41 định nghĩa lại | Ổn |
| Object Explorer | 1.3:26 (trang Giới thiệu:80 cũng giải nghĩa) | 1.4:36, 1.6:91 và :205, 2.1:54 | Ổn với SSMS; trên web không có (F3) |
| New Query | 1.6:52 (và Giới thiệu:83), không có định nghĩa riêng, hình `toolbar` làm rõ | 1.6 | Chấp nhận được |
| schema `dbo` | Giới thiệu:59; 1.4:36 "`dbo` là nhóm chứa các bảng"; 4.5:39 định nghĩa lại | — | Ổn |
| HRM_Demo | Chỉ ở trang Giới thiệu:97; 1.6:52 nhắc trong ngoặc, không giải | 4.7:22, 5.2:21, 6.5:69 dùng như đã biết | Cần một vế (F5) |
| danh mục | Không có định nghĩa; 1.1:57 "danh mục phòng", 1.2:42, 1.4:30 cho thấy nghĩa là bảng `PhongBan` | 1.6:87, 2.2:49 "bảng danh mục `PhongBan`" | Suy ra được; giữ |
| `char`, `time` | Bỏ khỏi 1.3 | Bài sau không gọi tên hai kiểu này (grep). Hộp `ChamCong`/`BangLuong` trong ERD 1.5 hiện `char(7)`, `time(0)`; 1.3:30 dặn "gặp kiểu khác thì đọc cùng cách" | Ổn |
| chuyển kiểu ngầm | 1.3:47 | 2.2:59, 2.5:92, 2.9:79, 3.8:46 | Định nghĩa hẹp hơn chỗ dùng (F4) |
| Unicode, `N'…'` | 1.3:35 và :39 | 2.1:52, 2.2:51 | Ổn |

### Mục 3. Các câu trỏ về

Tôi lần từng chỗ "bài 1.x" trong `src/` và `tests/`. Các chỗ sau tìm đúng nội dung:

- **1.3:** 2.1:52 (`N'Trần Thị Mai'` ở 1.3:39), 2.2:59, 2.5:78 (chuỗi rỗng với `NOT NULL`, Hay nhầm 2 của 1.3), 2.5:103, 2.7:105, 3.1:81 (`decimal(p,s)` ở 1.3:37 và :39).
- **1.5:** 3.4:44 và 3.6:48. Link `…/bai/1-5-doc-so-do-erd/` có trong `dist`. 3.6:48 viết "hai quan hệ đã đọc ở bài 1.5": cặp `BangLuong.MaNV` là đường tô xanh của bài; cặp `HopDong.MaNV` có trong sơ đồ đầy đủ, ở 1.2:44 và ở đáp án tự kiểm tra thứ hai của 1.5. Đủ để tìm lại, giữ.
- **1.6:** 2.4:83.
- **Nội bộ 1.1–1.6:** 1.1→1.6, 1.2→1.4, 1.5, 1.6, 2.4, 3.1; 1.3→1.4, 2.2, 2.5, 2.7, 5.2; 1.4→1.1, 1.5, 4.6, 5.2; 1.5→1.4, 3.4, 3.6; 1.6→1.5, 2.1, 2.2, 2.4, 2.5, 4.6, 5.5, 6.1. Đều tồn tại và đúng chủ đề. `prerequisites` ngoài Level 1 (2.1 → 1.3 và 1.6; 3.4, 5.1 → 1.5) vẫn hợp lý với tiêu đề mới.
- **Không còn** chỗ nào trong `src/` hay `tests/` trỏ về slug `1-2-sql-server…` hoặc `1-3-bang-cot…` (grep; `dist` cũng không còn).

Chỗ chưa khớp hẳn: các lời trỏ "(bài 1.3)" cho chuyển kiểu ngầm ở 2.5:92, 2.9:79, 3.8:46 (F4).

### Mục 4. Nhất quán

- **Tên dữ liệu mẫu:** có bốn cách gọi cho cùng một thứ (F5).
- **Hồ sơ công ty:** grep `Quân`, `chị Thảo`, `NV049`–`NV052`, `Trương Anh` trong `docs/ho-so-cong-ty.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `AGENTS.md`, `CLAUDE.md`, `README.md`, `tests/`, `api/src`, `src/`: không còn nhân vật hay mã minh họa đã bỏ. Chỉ còn `NV048 Đỗ Minh Quân`, hồ sơ thật. Mục 7 chỉ còn từ 1.6 trở đi. Mục 5 sửa đúng; còn dòng "Người học … `mọi bài`" cần chỉnh (F8). Bảng 48 hồ sơ được `tests/docs.test.ts` đối chiếu với script nên tôi không đọc lại từng dòng.
- **Bài 1.6 giới thiệu chị Hạnh và vai người học:** đủ. Nhãn Chat "Chị Hạnh · Phòng Nhân sự", câu dẫn "chị Hạnh muốn đối chiếu mẫu hồ sơ mới với dữ liệu hệ thống" (L19), giả định mới ở L25 "bạn vừa được cấp quyền đọc database nhân sự", và câu hỏi chốt ở `Key`. Không nhắc vai trò hay xuất thân, đúng quy ước. Đáp án khép tình huống ở L91–93.

### Mục 5. Tài liệu chung

- `quy-uoc.md` mục 2.5 khớp năm bài: cờ frontmatter đúng; 500–700 từ đúng (số đo ở mục 1); số tiểu mục 3/2/3/3/2 (≤3); Hay nhầm 1/2/2/2/2 (1–2); Ứng dụng 2 ý mỗi bài (1–2); mỗi bài có "Ở bài này chỉ cần…"; mỗi bài ≥3 câu tự kiểm tra; không `Chat`, `Key`. `lesson-template.md` có mục "Bài nền" khớp, comment YAML `noScenario` đúng, ví dụ tiêu đề "Từ file Excel đến một nguồn dữ liệu chung" đúng với 1.1. `AGENTS.md`/`CLAUDE.md` dòng 4 khớp hai bài mẫu.
- Còn lệch: README đã sai sự thật, `quy-uoc.md:163` dặn reviewer dùng "mẫu 1.1" cho mọi bài (F7); vài quy tắc chưa được giới hạn phạm vi so với 2.5, checklist 4.3 và "Trình tự dùng khung" chưa có nhánh bài nền, ho-so mục 5 (F8).

### Mục 6. Test

- **`noScenario` và `lessonMainSection` đúng.** `sectionHeadings(kind, noExercises, mainTitle, noScenario)` chỉ bỏ "Tình huống" khi cờ bật; `tests/content.test.ts:34` lấy `h2[0]` làm tiêu đề phần chính cho bài nền. `lessonMainSection` (`helpers/lessons.ts:27-32`): bài mở bằng `## Tình huống` → `sections[1]`; bài nền (body mở bằng dòng `import`, bị cắt bởi `.slice(1)`) → `sections[0]`; bài tóm tắt mở bằng `Nội dung chính` → `sections[1]` (`Liên hệ Excel`, giữ hành vi cũ); bài legacy `Làm bằng SQL` vẫn tìm theo tên. Ba nhánh đều có test ở `content.test.ts:72-79`. Tiêu đề phần chính trùng tên mục cố định bị chặn ở dòng 42, nên không thể nhầm một bài nền có tiêu đề "Nội dung chính".
- **Phần nới là có lý do:** bài, mục, ý đã bỏ có chủ ý (bảng sáu ô, `DATEFORMAT`, ca xóa phòng, `NO ACTION`, khóa nhiều cột, ba mô tả "one story"…) thì test bỏ theo; test kết nối, hoàn tác, `40613` chuyển sang đọc `gioi-thieu.astro` và giữ gần đủ chuỗi (rớt `không có cột trạng thái`, `Ban Giám đốc`, `Vận hành`, đúng với việc bỏ lời trả lời Hạnh). Nội dung vẫn cần mà ít được test giữ: F11.
- **Trần 800 từ** so với 500–700 trong quy ước là quyết định đã duyệt (spec mục Khung bài nền). `proseParagraphs` bỏ qua bảng, `Memo`, chú thích hình và dòng `<summary>`, nên số 551–698 là số đo của lời văn, không phải toàn bộ chữ trên trang (tôi ước lượng 650–860 từ nếu tính hết chữ hiển thị). Chưa đo thời lượng 7 phút với người đọc thật; không kết luận.
- **Test `lesson 1.1 follows one story…` và các mô tả cũ** bị xóa; thay bằng `foundation lessons…` (`content.test.ts:151-179`). Xem F11.

### Mục 7. Bài tập, API, dữ liệu

Từ `git diff --stat`: không file nào thuộc `api/`, `src/content/exercises/`, `database/`; `HRM_Demo.sql`, checksum, YAML đề không đổi. Thay đổi duy nhất chạm trang bài tập là `ExerciseWorkspace.tsx`: đổi import `lessonUrl` → `withBase` và đích link ở dòng 92 (`#tao-ban-rieng`, tốt hơn `#chon-noi-thuc-hanh` mà spec đã ghi, vì người chưa có mã cần đúng mục tạo bản riêng). Tôi chỉ xác nhận từ diff, không chạy `check:exercises` hay `check:data`.

## 3. Danh sách finding (theo tác động thực tế)

Tổng: **Cần sửa 1, Cần làm rõ 5, Cần cắt 0, Biên tập 5, Giữ được 3.**

### F1. Cần làm rõ: lối vào cho người có tài khoản SSMS của khóa học

- **Vị trí:** `src/pages/gioi-thieu.astro:22-26`, `:52`; `1-1-database-la-gi.mdx:53`; `1-6-cau-select-dau-tien.mdx:52`.
- **Câu gốc:** "Có mã truy cập: bấm Làm bài…" / "Chưa có mã: dùng SQL Server riêng…" / "Nếu chỉ dùng web, bạn không cần làm theo mục kết nối SSMS bên dưới." / 1.6: "Mở **New Query**, kiểm database đang chọn là `free-sql-db-8797714`".
- **Tác động:** Hai lối ở "Chọn nơi thực hành" là web có mã và SQL Server riêng. Người có tài khoản SSMS của khóa học (trường hợp mà chính bullet đầu nhắc: "khác tài khoản SSMS") không thấy mình thuộc lối nào, và không có link nào tới `#ket-noi-ssms`. 1.6:52 bảo "Mở New Query" mà không nhắc kết nối trước; người đọc phải tự cuộn trang Giới thiệu và đoán đó là mục của mình. Người mới đọc 1.1–1.5 xong có thể tới 1.6 mà chưa kết nối.
- **Căn cứ:** grep `ket-noi-ssms` trong `src`, `tests`, `scripts`: chỉ có `id` và test pin `id`; không có `href`. 1.2 cũ có sẵn mạch kết nối ngay trong bài; spec (mục Trang Giới thiệu) coi trang này nhận toàn bộ phần đó.
- **Đề xuất:** thêm một vế vào bullet hoặc một dòng ngắn: "Có tài khoản SSMS của khóa học: làm theo mục Kết nối bằng SSMS", link `#ket-noi-ssms`; ở 1.6:52 thêm link cùng đích sau "SSMS". Không cần thêm đoạn mới.

### F2. Cần làm rõ: lời trỏ ở bước Connect (an toàn) nằm xa chỗ cần

- **Vị trí:** `gioi-thieu.astro:80` và `:114-115`.
- **Câu gốc:** `:80` "Bấm **Connect**. Sau đó, trong **Object Explorer**…"; `:115` "Xuất hiện New Firewall Rule yêu cầu đăng nhập Azure: bấm **Cancel** và nhờ người phụ trách xử lý." Bản 1.2 cũ ngay sau "Bấm Connect" có: "Database có thể đang tự tạm dừng; nếu lần đầu chưa vào được, xem lỗi `40613`… Nếu xuất hiện **New Firewall Rule** yêu cầu đăng nhập Azure, bấm **Cancel**…".
- **Tác động:** Người đang nhìn hộp "New Firewall Rule" (đòi đăng nhập Azure) hoặc lỗi `40613` phải tự biết cuộn qua mục "Database mẫu" và "Tạo bản riêng" mới tới mục "Khi không kết nối được". Lựa chọn nguy hiểm duy nhất là đăng nhập Azure bằng tài khoản cá nhân vào hộp đó, và lời dặn Cancel không còn đứng ở chỗ họ gặp.
- **Căn cứ:** so `git show 44b2ae6:…1-2-sql-server-ssms-hrm-demo.mdx` (đoạn sau "Bấm Connect") với trang mới; `id="loi-ket-noi"` không có link tới.
- **Đề xuất:** thêm một vế ở `:80`: "Gặp lỗi hoặc hộp New Firewall Rule thì xem [Khi không kết nối được](#loi-ket-noi)". Không chép lại nội dung.

### F3. Cần làm rõ: đoạn 1.6 người chỉ dùng web phải đọc có bước chỉ có ở SSMS

- **Vị trí:** `1-6-cau-select-dau-tien.mdx:52`, `:91`, `:207`.
- **Câu gốc:** L91 "kèm kiểu và khả năng nhận `NULL` tra ở **Object Explorer → Columns**"; L207 "bấm **Làm bài** ở bài tập 1, nhập câu mẫu rồi bấm **Chạy (F5)** để thử".
- **Tác động:** Phần "Chạy trong SSMS và đọc hai tab kết quả" nằm trong phần chính mà mọi người đều đọc; đoạn đầu (New Query, chọn database, bôi đen) chỉ đúng với SSMS, nhưng hai tab Results/Messages có cả trên web (`ExerciseWorkspace.tsx:114-115`) nên người web nên đọc phần sau. Nhãn không tách hai trường hợp. Ở L91, Object Explorer không có trên trang bài tập (grep `components/islands`: không có); nút **Sơ đồ database** có (L106) nhưng `DbDiagram.tsx` chỉ hiện `c.type`, không hiện `null`/`not null`, nên người web trả lời Hạnh về "khả năng nhận NULL" bằng đường nào thì bài chưa nói. L207 "câu mẫu" không chỉ rõ là câu `SELECT TOP (10) * FROM NhanVien;` ở L69–70 hay câu nào khác.
- **Căn cứ:** đọc code; các đoạn này không thuộc diff của lượt này (chỉ L207 đổi một câu cuối) nên đây là tồn đọng nhưng nằm đúng tiêu chí chấp nhận của spec ("đi từ 1.1 tới bài tập 1.6 không gặp lời trỏ gãy"). Chưa xác minh trang bài tập có hiển thị khả năng nhận NULL ở chỗ khác (như hộp "Kết quả cần") hay không.
- **Đề xuất:** đầu mục SSMS thêm một vế "Dùng web thì chỉ cần đọc phần Results và Messages"; L91 thêm "(trên web: nút Sơ đồ database cho tên cột và kiểu)" và bỏ vế NULL hoặc nói rõ chỉ SSMS; L207 viết rõ "nhập câu ở mục Câu lệnh cho tình huống".

### F4. Cần làm rõ: định nghĩa "chuyển kiểu ngầm" hẹp hơn các chỗ trỏ về

- **Vị trí:** `1-3-kieu-du-lieu.mdx:47` và đáp án tự kiểm tra thứ ba của 1.3; `2-5-null-o-trong.mdx:92`; `2-9-case-when-ham-if.mdx:79`; `3-8-union-gop-danh-sach.mdx:46`.
- **Câu gốc:** 1.3:47 "Khi nhận chữ để ghi vào cột ngày hoặc số, hay để so sánh với cột đó, SQL Server có thể tự đổi sang kiểu của cột"; 3.8:46 "có thể **chuyển kiểu ngầm** về kiểu chung (bài 1.3)"; 2.5:92 "nhãn Unicode khiến kết quả dùng `nvarchar`… Đây là **chuyển kiểu ngầm** như bài 1.3".
- **Tác động:** Người theo "(bài 1.3)" ở 3.8 và 2.5 tìm "kiểu chung" hoặc cột `varchar` được nâng lên `nvarchar` thì không thấy trong 1.3; 1.3 chỉ nói chữ đổi sang kiểu của cột. Hai chiều đổi khác nhau, người mới không tự nối được. 2.2:59 thì khớp (chữ so với cột ngày).
- **Căn cứ:** `git show 44b2ae6:…1-3-bang-cot-kieu-du-lieu.mdx` có cùng định nghĩa hẹp ("tự đổi chuỗi sang kiểu của cột"), nên đây không phải hồi quy; spec (mục 1.3) liệt kê 2.2, 2.5, 2.7, 2.9, 3.8 là bài trỏ về. 1.3 hiện 691/700 từ nên không còn chỗ thêm.
- **Đề xuất:** sửa một vế ở 1.3:47, ví dụ "…tự đổi giá trị sang kiểu khác khi ghi, so sánh hoặc ghép" (đổi chữ chứ không thêm câu), hoặc đổi các lời trỏ ở 2.5:92 và 3.8:46 sang đúng chỗ. Quyết định cuối thuộc tác giả.

### F5. Biên tập: một thứ nhiều tên; HRM_Demo chưa được giải trong bài

- **Vị trí:** `1-2:23`; `1-3:28`, `:50`; `1-4:32`, `:47`; `1-5:37`; `1-6:56`, `:89`, `:154`, `:52`; `gioi-thieu.astro:97-98`.
- **Câu gốc:** "bộ mẫu" (1.3 chú thích, 1.6 L89 và L154), "dữ liệu mẫu" (1.4), "database khóa học" (1.3, 1.5), "database dùng chung" (1.5, 1.6), "bộ dữ liệu nhân sự giả lập tên `HRM_Demo`" (Giới thiệu). 1.2:23 mở đầu: "Hình dưới trích ba cột và ba dòng của bảng `NhanVien`; bảng này có 12 cột và 48 dòng".
- **Tác động:** Người đọc 1.2 gặp `NhanVien`, `NV005`, "48 dòng" mà không biết đó là bảng của bộ dữ liệu nào; đến 1.3 gặp "database khóa học", 1.4 gặp "dữ liệu mẫu", 1.6 gặp "database dùng chung". Họ vẫn suy ra là một thứ, nhưng thuật ngữ nên có một câu chốt. `HRM_Demo` (1.6:52) chưa được giải trong bài; 4.7, 5.2, 6.5 dùng như đã biết, người không đọc trang Giới thiệu sẽ không biết.
- **Căn cứ:** grep các cụm trên trong `src/content/lessons/1-*.mdx`. Spec chốt "Các bài không giới thiệu HRM_Demo" nên tôi không đề nghị lập mục riêng.
- **Đề xuất:** chọn một tên (gợi ý "dữ liệu mẫu của khóa học"), nói một lần ở 1.2:23 và dùng thống nhất; ở 1.6:52 thêm một vế "(`HRM_Demo` là tên bộ dữ liệu mẫu)".

### F6. Biên tập: các câu nối bị rơi khi chuyển sang trang Giới thiệu

- **Vị trí:** `gioi-thieu.astro:69`, `:83-85`.
- **Câu gốc:** `:69` "Các ô dưới minh họa nguồn dùng chung." (bản cũ thêm: "nếu đã tạo bản riêng, thay thông tin kết nối bằng dòng tương ứng trong bảng trên"); `:85` `SELECT * FROM PhongBan;` (bản cũ thêm: "cú pháp `SELECT` học ở bài 1.6").
- **Tác động:** Người dùng bản riêng đọc mục kết nối thấy toàn tên nguồn dùng chung. Người chưa học tới 1.6 bị cho gõ một câu lệnh không có lời nào cho biết đây là câu đọc, học kỹ ở 1.6; còn L94 nhắc `ORDER BY` khi người đọc chưa học. Nhẹ, vì bảng nơi thực hành ngay phía trên và câu chỉ đọc.
- **Căn cứ:** so `git show 44b2ae6:…1-2-…mdx`.
- **Đề xuất:** thêm hai vế ngắn ở hai chỗ; không viết thêm đoạn.

### F7. Cần sửa: tài liệu mô tả khung cũ, chỉ sai chỗ README và lời dặn reviewer

- **Vị trí:** `README.md:10`, `:113`, `:115`; `docs/quy-uoc.md:163` và `:168`.
- **Câu gốc:** README:10 "Bài đầy đủ có tình huống và đối chiếu Excel" (bài 1.1–1.6 liệt kê là bài đầy đủ); README:115 "lấy bài 1.1 làm mẫu: Tình huống → phần chính…"; README:113 bảng frontmatter không có `noScenario`; quy-uoc:163 "…ho-so-cong-ty.md, **mẫu 1.1** và các bài trước liên quan".
- **Tác động:** README tả khung có "Tình huống" và chỉ 1.1 làm mẫu: 1.1 là bài không có "Tình huống", và frontmatter của bài nền cần cờ README không nhắc. Người viết bài mới theo README viết sai khung hoặc bị test chặn ở `noScenario`. Lời dặn reviewer ở :163 bảo đối chiếu mọi bài với 1.1; reviewer bài có tình huống sẽ so với bài không có tình huống. Dòng :168 ("câu trả lời tình huống nằm cạnh lời giải/kết quả") chưa nói bài nền không có tình huống.
- **Căn cứ:** `README.md` không nằm trong diff; `quy-uoc.md:5` và mục 2.5 đã đổi nhưng :163 giữ nguyên.
- **Đề xuất:** README: đổi mẫu thành "bài 2.2 (có tình huống), bài 1.1 (bài nền)", thêm hàng `noScenario`, sửa "Bài đầy đủ có tình huống" thành "trừ bài nền 1.1–1.5". `quy-uoc.md:163`: "bài mẫu tương ứng (2.2 hoặc 1.1)"; thêm vào :168 vế "bài nền (mục 2.5) không có tình huống".

### F8. Cần làm rõ: vài quy tắc chung chưa được giới hạn so với mục 2.5

- **Vị trí:** `quy-uoc.md:38`, `:42`, `:105-116`; `lesson-template.md:174`; `AGENTS.md:6`; `CLAUDE.md:9`; `ho-so-cong-ty.md:99`.
- **Câu gốc:** quy-uoc:38 "Dùng khoảng 2–4 tiểu mục" và :42 "Bài khái niệm đơn giản hướng tới 10–12 phút" so với 2.5 ":70, :73" "`minutes: 7`", "0–3 tiểu mục"; checklist 4.3 ("Tình huống được khép lại", "Excel và SQL cùng một phần chính"); template:174 "Chọn biến thể khái niệm hoặc truy vấn"; AGENTS:6 và CLAUDE:9 "biến thể khái niệm/truy vấn"; ho-so:99 "Người học … có tài khoản vào database qua SSMS | mọi bài".
- **Tác động:** Người viết hoặc reviewer lần theo quy tắc chung thấy hai con số khác nhau (2–4 và 0–3 tiểu mục; 10–12 và 7 phút) mà không biết cái nào thắng cho bài nền; checklist 4.3 không có mục nào đúng với bài không có tình huống và không có SQL. Hồ sơ nói người học có tài khoản SSMS ở "mọi bài" trái với đường web và với năm bài nền không có người học nào. Ảnh hưởng người viết, không ảnh hưởng người học.
- **Căn cứ:** so các dòng trên với mục 2.5 và với `lesson-template.md:118-120`.
- **Đề xuất:** mỗi quy tắc thêm "trừ bài nền (mục 2.5)" chỗ có số; thêm một dòng "bài nền" vào template:174 và hai dòng đọc tài liệu; sửa ho-so:99 thành "6.1 trở đi" hoặc "có thể dùng tài khoản SSMS hoặc mã web".

### F9. Biên tập: "Database không tự chặn" quá rộng với bảng `NhanVien`

- **Vị trí:** `1-2-bang-dong-cot.mdx:52`.
- **Câu gốc:** "Muốn thêm dòng tổng cộng vào bảng. Database không tự chặn việc này, nhưng danh sách sẽ có thêm một 'hồ sơ' không phải người nào."
- **Tác động:** Trong `NhanVien`, `HoTen`, `NgaySinh`, `MaPB`, `MaCD`… là `NOT NULL` và `MaPB`/`MaCD` có khóa ngoại (`HRM_Demo.sql:59-72`), nên một dòng "Tổng cộng" bỏ trống các cột đó sẽ bị từ chối; chỉ khi điền đủ giá trị hợp lệ mới lưu được. Người đọc sang 1.3 (`NOT NULL`) và 1.4 có thể tự hỏi vì sao dòng tổng "không bị chặn".
- **Căn cứ:** DDL của `NhanVien`; quy-uoc dòng 27 ("không hứa điều database không tự bảo đảm"), áp dụng cả chiều ngược.
- **Đề xuất:** "Nếu điền đủ các cột bắt buộc thì database vẫn nhận, vì nó không biết dòng đó không phải người…" (một vế).

### F10. Biên tập: câu "vì xóa đi các hồ sơ đó sẽ mất phòng" dễ đọc ngược

- **Vị trí:** `1-4-khoa-chinh-khoa-ngoai.mdx:32`.
- **Câu gốc:** "phòng còn hồ sơ trỏ tới thì không xóa được khỏi danh mục, vì xóa đi các hồ sơ đó sẽ mất phòng."
- **Tác động:** "xóa đi các hồ sơ đó" đọc thành "xóa các hồ sơ", trong khi ý đúng là xóa phòng thì các hồ sơ còn lại sẽ trỏ tới phòng không còn. Người mới có thể hiểu ngược chiều khóa.
- **Căn cứ:** đọc câu; hành vi mặc định của khóa ngoại với `NO ACTION` (khóa học dùng mặc định; script không khai báo `ON DELETE`).
- **Đề xuất:** "vì xóa phòng đi thì các hồ sơ đó sẽ trỏ tới một phòng không còn".

### F11. Biên tập: khoảng trống của test sau khi nới

- **Vị trí:** `tests/content.test.ts:151-179`, `:281-283`, `:284-291`; `scripts/check-dist.mjs:29-30`.
- **Điểm yếu (mỗi ý đều nhỏ):**
  1. Không có kiểm đích link: `check-dist` bỏ phần `#`; `content.test.ts:164-173` kiểm 1.1 chứa link và trang chứa `id`, nhưng link ở 1.6:207 và `ExerciseWorkspace.tsx:92` không có test; `id="loi-ket-noi"` không có trong test pin ở :287 (chỉ `ket-noi-ssms`, `tao-ban-rieng`). Đổi tên một `id` làm gãy ba link mà test vẫn đạt. (Tôi đã tự kiểm các đích trong `dist`, chỉ đúng cho bản build này.)
  2. Câu giả định mới ở 1.6:25 ("bạn vừa được cấp quyền đọc database nhân sự", spec mục Sửa theo) không có test; test 1.6 chỉ giữ "Giả định của tình huống".
  3. Test 1.1 tên "scopes the data rules **without teaching the names of the keys**" (:281) nhưng đã bỏ regex chặn `khóa chính|khóa ngoại|ràng buộc|NULL` trước "Ở bài này chỉ cần" của test cũ; hiện chỉ kiểm vài chuỗi có/không có. Nội dung 1.1 hiện đúng (tên khóa chỉ ở đoạn "Ở bài này chỉ cần"), nhưng tên test hứa nhiều hơn điều nó kiểm.
  4. Nhóm test bài nền chỉ chặn trên 800 từ; quy ước nói 500–700. Chấp nhận theo spec, ghi lại để biết 1.1 (698) và 1.3 (691) sát trần.
  5. Test không chặn tên nhân vật (`chị Hạnh`, `Quân`) trong bài nền, dù 2.5 nói "không có tình huống hay nhân vật"; hiện không bài nào vi phạm (grep).
- **Đề xuất:** (1) thêm một test nhỏ gom mọi `href=".../gioi-thieu/#…"` trong `src/content/lessons`, `ExerciseWorkspace.tsx` và `id` trong trang; (2) thêm `'được cấp quyền đọc'` vào danh sách "có" của 1.6; (3) đổi tên test 1.1 hoặc thêm lại regex; (5) thêm `not.toMatch(/chị Hạnh|Quân|Thảo/)` cho nhóm bài nền. Các việc này không bắt buộc.

### G1. Giữ được: trang Giới thiệu mang đủ nội dung kỹ thuật và đích link

Mọi ý an toàn của 1.2 cũ (liệt kê ở mục 2, Mục 1) còn trong `gioi-thieu.astro`; số liệu trích (`sql-lession.database.windows.net`, `free-sql-db-8797714`, sáu phòng, bảy bảng) khớp `docs/ho-so-cong-ty.md` và script. Bốn `id` có đủ trong `dist`; bài 1.1 và 1.6 có `href` đúng. Trang thêm "Khi không kết nối được" gom ba mục Hay nhầm của 1.2 cũ và giữ nguyên nội dung.

### G2. Giữ được: logic `noScenario` và `lessonMainSection`

Đúng cho bài nền, bài có tình huống, bài tóm tắt và bài legacy (mục 6). Không thấy `src/` nào khác đọc tiêu đề "Tình huống" (grep: chỉ `lesson-schema.ts` và `helpers/lessons.ts`), nên cờ mới không ảnh hưởng giao diện.

### G3. Giữ được: dữ liệu ví dụ và lời văn khớp database

Kiểu và khả năng nhận `NULL` trong 1.3 và 1.4 (`MaNV varchar(10)`, `HoTen nvarchar(100)`, `NgayVaoLam date`, `LuongCoBan decimal(18,0)`, `NgayKetThuc date NULL`, `SoNgay decimal(4,1)`, `SoCCCD varchar(12)`, `MaQuanLy varchar(10) NULL` và khóa ngoại về chính `NhanVien`), khóa chính ghép `(KyLuong, MaNV)` của `BangLuong`, `MaPB` `NOT NULL`, 12 cột và 48 dòng của `NhanVien`, bốn cột/giá trị trong ảnh 1.2 (NV001, NV005, NV014) đều khớp `HRM_Demo.sql` và hồ sơ công ty. Điều tôi không xác nhận lại bằng SQL: giá trị `DonNghiPhep.SoNgay = 2.0` cho một đơn cụ thể, "NV021 có ba hợp đồng" (lấy theo hồ sơ công ty), các giá trị chuyển kiểu `21.25 → 21.3`, `1000.0` bị từ chối, `01/02/2024 → 2024-01-02` (tác giả báo đã chạy; theo hiểu biết SQL Server thì hợp lý nhưng tôi không chạy).

## 4. Hành vi đã cân nhắc, chưa kết luận hoặc để ngoài phạm vi

- **`prerequisites` của 1.6 là `"1.1"`, `"1.4"`.** Thân bài 1.6 dùng nội dung 1.3 (kiểu, `NULL`, Object Explorer) và gọi 1.5 ở L87. Spec (L41) đã duyệt đúng cặp này; ngăn "Cần biết trước" chỉ hiện 1.1 và 1.4. Tôi không coi đó là lỗi, để tác giả cân nhắc có thêm 1.5 vì mọi người đi tuần tự.
- **Tiến độ cũ gắn theo số bài.** Người đã bấm "Đã học" ở 1.2 (bài kết nối SSMS cũ) và 1.3 giữ trạng thái đó cho nội dung mới; spec đã ghi, không redirect cho link cũ. Không kết luận.
- **Trang Giới thiệu dài và không có mục lục;** có một đoạn SSMS dài trước mục "Database mẫu". Tôi chưa xem giao diện nên không kết luận về khả năng tìm mục.
- **Lời hai-lối ở "Chọn nơi thực hành":** F1 chỉ đề xuất bổ sung; việc giữ "hai lối" là quyết định có từ trước lượt này.
- **`Encrypt: Strict` và "Trust Server Certificate bị vô hiệu hóa với Strict" trên Azure SQL Database** chuyển nguyên từ 1.2 cũ; tôi không đối chiếu lại tài liệu Microsoft nên không nói đúng hay sai; không thuộc thay đổi của lượt.
- **"Database còn cấp quyền tới từng bảng" (1.1:26)** `verification.md` ghi chưa đối chiếu tài liệu. Theo hiểu biết về `GRANT` trên bảng thì hợp lý; tôi không xác minh lại, nên chưa coi là đã kiểm.
- **Spec và plan chưa cập nhật cho đợt 2:** plan mục Đợt 2 (Task 4–6) còn `[ ]`, mục Kết quả của spec chỉ có đợt 1, và spec L57/L122 còn ghi ảnh `1-3-database-table.png` trong khi file đã đổi thành `1-2-database-table.png`; thêm các spec/plan cũ (`2026-10-30-lesson-1-3-*`) vẫn nhắc đường dẫn cũ. Đây là bước 4.6 sau review này, tôi chỉ ghi nhận; không đánh giá hồ sơ review từng bài vì không được đọc.
- **Số liệu "323/323", "0 lỗi", "1994 liên kết"** là của tác giả, chưa xác nhận.
- **Giao diện (chưa kiểm):** hiển thị ảnh 1.2, các hình `Ssms`/`Erd`, dấu chấm tròn và `∞` ở 1.5 (tôi chỉ đọc mã nguồn `DbDiagram`), thao tác Sao chép của `Sql` trang Giới thiệu, cuộn tới `#chon-noi-thuc-hanh` trên trình duyệt thật, bố cục dưới 1024px.
- **Thời lượng 7 phút** chưa đo với người học; 551–698 từ lời văn (khoảng 650–860 từ hiển thị) là số đo của file, không phải thời gian đọc.

## 5. Nguồn và giới hạn

- **Nguồn:** `git diff 44b2ae6 9176c0a` (stat, và diff chi tiết các file nguồn, test, docs được giao); `git show 44b2ae6:` hai bài cũ 1.2 và 1.3; file đang ở head cho các file còn lại; `database/HRM_Demo.sql` (chỉ phần `CREATE TABLE`); `dist/` ở head (grep id, href, backtick, nhãn cột); `docs/reviews/2026-10-30-lesson-1-1-bai-nen/verification.md`; spec và plan 30/10.
- **Phân biệt:** nhận định của tác giả (mọi kiểm bằng SQL live, test 323/323, `check:dist`, đọc build 1280/1024px của đợt 1) tôi không lặp lại, và chỉ viết "đã kiểm" cho những gì có trong mục 1 ở phần "Tôi tự kiểm".
- **Giới hạn:** không chạy database, API, `npm test`/`build`/`check:dist`; không mở trình duyệt; không đọc `.env`; không đọc các report khác. Mọi nhận xét về UI đều là suy ra từ mã nguồn hoặc HTML. Báo cáo này không thay cho kiểm giao diện hay kiểm số liệu của tác giả.
- **Tôi không sửa** source, test, docs, index, HEAD hay nhánh. Tệp duy nhất tôi tạo trong repo là thư mục `temp/review/2026-10-30-bai-nen-tich-hop/` và file này; script đếm từ nằm ngoài repo (scratchpad).
