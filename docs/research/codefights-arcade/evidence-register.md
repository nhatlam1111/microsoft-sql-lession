# Evidence Register

Ngày thu thập: **02/11/2026**, Asia/Saigon. Đây là sổ kết luận theo claim, không phải bảng xếp hạng độ uy tín của website. Ngày nguồn, phiên bản quan sát và ngày thu thập không được hoán đổi.

## Quy tắc đọc

- `CONFIRMED`: trực tiếp thấy ở nguồn sơ cấp, ảnh đã xem hoặc runtime; phạm vi ghi rõ. Xác nhận thông cáo phát biểu điều gì không xác nhận server đã làm đúng điều đó.
- `STRONGLY SUPPORTED`: ít nhất hai nguồn độc lập phù hợp cùng claim. Các ảnh của cùng blog không tính thành nguồn độc lập với blog đó.
- `INFERRED`: suy luận hoặc chi tiết chỉ được tiếp cận gián tiếp. `UNKNOWN`: thiếu chứng cứ. `CONFLICTING`: nguồn khác nhau về cùng phạm vi; nếu khác phiên bản thì ghi khác phiên bản trước khi gọi mâu thuẫn.
- `RECOMMENDATION`: thiết kế SQL Arcade mới, không là confidence lịch sử. Các BR/FR/NFR/AC và DEC được quản lý ở tài liệu tương ứng.

## H — Lịch sử

| ID / liên quan | URL, loại, ngày nguồn / phiên bản | Quan sát tối thiểu và confidence | Chưa biết |
|---|---|---|---|
| H-01 / F-01/02/03/15 | [Thông cáo launch](https://www.prnewswire.com/news-releases/codefights-unveils-code-arcade-to-make-honing-your-skills-a-thrilling-game-300332143.html), primary hãng, 21/09/2016; launch CodeFights | CONFIRMED phát biểu map theo chủ đề, Intro Gates 8 bài, hai sao để mở địa điểm; Databases còn là kế hoạch | Công thức sao, guard cụ thể, ngày Databases ra mắt |
| H-02 / F-12/13/14 | [Thông cáo rebrand](https://www.prnewswire.com/news-releases/codefights-becomes-codesignal-launches-the-coding-score-for-developers-300678041.html), primary hãng, 10/07/2018 | CONFIRMED đổi tên, Coding Score và thay giao diện; không đồng nhất score với ví | Thay đổi riêng Arcade từng tính năng |
| H-03 / nhóm nguồn | [TriadWorks](https://blog.triadworks.com.br/praticando-algoritmos-de-forma-divertida-com-o-code-fights), blog trải nghiệm 18/05/2017; CodeFights | Mã nhóm cho H-03-T/I/M/H dưới đây; không cộng chúng thành nhiều nguồn | Ngày chụp thực tế |
| H-03-T / F-10/14 | Cùng blog H-03, văn bản first-hand | Cơ chế mua hidden STRONGLY SUPPORTED khi đối chiếu H-05; các luật khác chỉ lời kể đơn nguồn | Giá/phạm vi/thời hạn; lời kể sample đủ đi tiếp chưa thành luật chung |
| H-03-I / F-04–09/16 | [ide.png](https://silvrback.s3.amazonaws.com/uploads/0d161a5c-41a6-4e17-b8c5-0760425c0702/ide.png), ảnh đã tải/mở; ngày trang 18/05/2017 | CONFIRMED Saved, ngôn ngữ, sample 2/2, test khóa, custom test, Run Tests/Submit | Click sequence, autosave, test selection |
| H-03-M / F-01–03 | [arcade.png](https://silvrback.s3.amazonaws.com/uploads/2e9f79f0-7c7b-4bb1-8608-7c9940d7eebf/arcade.png), ảnh đã mở | CONFIRMED node xanh không hiện khóa, node/world có khóa | Màu xanh có nghĩa completed/đang chọn/khả dụng chưa xác minh; điều kiện mở khóa |
| H-03-H / F-17 | [dica.png](https://silvrback.s3.amazonaws.com/uploads/55844a5f-b414-40b0-a01e-f88971d78f62/dica.png), ảnh đã mở | CONFIRMED dialog hint có code che | Không phải dialog mua hidden; chưa biết giá hint |
| H-04 / F-03/10 | [Luận văn Gregorio](https://riunet.upv.es/bitstream/handle/10251/174673/Gregorio%20-%20Generacion%20Automatica%20de%20Ejercicios%20Auto-Corregibles%20de%20Programacion%20en%20Java.pdf?sequence=1), năm học 2020/2021; text/index gián tiếp, Arcade Intro | INFERRED cho chi tiết mua/mở và mốc khảo sát 04/03/2021 được index nêu; không xem pixels | Download/render trực tiếp bị Anubis |
| H-04-F / F-10/12 | Fig 7–14 của H-04, trang in 30–32; chỉ index | INFERRED giá 5.000 Coin trong ví dụ Fig 13; không phải giá chuẩn mọi challenge | Phạm vi test/group, bản SQL, giá động |
| H-05 / F-10/14 | [Lun Wai](https://lunwai.medium.com/codesignal-arcade-intro-56-digitsproduct-484af6937f59), blog first-hand, 21/08/2024; Arcade Intro | Lời nhớ lại việc dùng Coin xem hidden, độc lập với H-03-T; bổ trợ STRONGLY SUPPORTED cho sự tồn tại cơ chế | Ngày giao dịch, giá, entitlement |
| H-06 / F-04–12/18 | [Catálogo PDF](https://alarcos.esi.uclm.es/OtrasPublicaciones/CatologoJuegosSerios.pdf), phạm vi đến 08/2024; trang PDF 18 ghi CodeFights 2017 | CONFIRMED screenshot đã render/xem: workspace split, Solutions, score, tests và hành động | Không xác minh độc lập năm ảnh/video |
| H-06-V / F-20 | [YouTube 8RFUyuHrDMA](https://www.youtube.com/watch?v=8RFUyuHrDMA), lead từ caption H-06 | UNKNOWN nội dung động; fetch/oEmbed không thành công; **không có timestamp đã xem** | Animation, publication date, walkthrough |
| H-07 / F-13/14/15 | [CEO Q&A InfoWorld](https://www.infoworld.com/article/2262046/q-a-can-coding-games-progress-developer-careers.html), primary interview 28/08/2017 | CONFIRMED phát biểu XP/Coin/badge và mở bài khó hơn ở các mode luyện cá nhân | Định lượng/cap/replay/level/rank |
| H-08 / F-09 | [Stack Overflow](https://stackoverflow.com/questions/59736344/failing-hidden-tests-in-codesignal-what-seems-to-be-the-problem-in-my-code), user report 14/01/2020; Arcade Intro | Báo sample qua nhưng hidden trượt, bổ trợ phân biệt test | Không chứng minh backend, nút nào chạy hidden hoặc nguyên nhân code |
| H-09 / F-01 | [Reddit 1h0mnlp](https://www.reddit.com/r/learnprogramming/comments/1h0mnlp/), index ngày 26/11/2024 | CONFIRMED có báo cáo người dùng gặp 404; không xác nhận email kể lại | UNKNOWN ngày đóng chính thức |
| H-10 / F-10 | [Reddit k6vzpt](https://www.reddit.com/r/csMajors/comments/k6vzpt/), index khoảng 2020, ngày tuyệt đối chưa khóa | UNKNOWN phạm vi unlock; câu hỏi không phải bằng chứng câu trả lời | Một test/bài/toàn site, permanence |
| H-11 / provenance lịch sử | [Intro shell Wayback](https://web.archive.org/web/20170624125417id_/https://codefights.com/arcade/intro), snapshot 24/06/2017 12:54:17 UTC; HTTP thu 02/11/2026 | CONFIRMED HTML 3.552 byte, title CodeFights và đường external bundle; CDX prefix trả 8 record trong truy vấn cụ thể | Không nội dung/runtime map; bundle replay 404/CDX timeout không chứng minh không có bản khác; hash ở 03/receipt |

### Hash của artifact lịch sử đã xem

Raw ở `temp/research-codefights-2026-11-02/`, không phát hành artwork vào sản phẩm.

| File | SHA-256 |
|---|---|
| triadworks-ide.png | `948b5dbb1ab63ae1eb16e3410a556e3224d40effcee6f4cd7ef42fb72a842d85` |
| triadworks-hint.png | `de24e0fca37ae55583e207a5bc776ada6a0b5974e9d892dfc3cc59696abccd0b` |
| triadworks-arcade.png | `63a6fef2dd199ced509d570f33d4b3ebd351b11a3b37b542d4ee34f17e7cea05` |
| serious-games-catalog.pdf | `9ee6ea705ffbd17b6c6249de6608b5dc827dd04e4ebcbd426bf0b313d82fe44f` |
| serious-games-p18.png | `5afddb4196a037729e11ea2cc65104f3dc1da40f746b615aa13e65c2b7cfb348` |

File mang đuôi PDF thu từ UPV thực tế là HTML 7.124 byte; không tính là PDF hoặc bằng chứng render. Poppler render catálogo có cảnh báo font, vùng screenshot đọc được; không báo QA font toàn tài liệu đã đạt.

## D — Bản lưu Databases và Intro

| ID / liên quan | Source URL, ngày / version | Quan sát, confidence | Giới hạn |
|---|---|---|---|
| D-01 / F-02, 11 | [README pinned](https://github.com/code-signal/code-signal-arcade-databases/blob/f85efe2ede2dd2721216c89e0c9e765a7f5ca000/README.md), commit 25/03/2022 | CONFIRMED bản lưu có 16 nhóm và 84 mục | Không xác nhận toàn bộ catalog mọi năm hoặc ownership chính thức |
| D-02 / F-04, 11 | [Bài đầu pinned](https://github.com/code-signal/code-signal-arcade-databases/blob/f85efe2ede2dd2721216c89e0c9e765a7f5ca000/1_projectList/README.md), cùng commit | CONFIRMED bản lưu mô tả schema, sample, output/order, MySQL 10 giây | Không grader hoặc runtime |
| D-03 / F-09, 11 | [Null Intern pinned](https://github.com/code-signal/code-signal-arcade-databases/blob/f85efe2ede2dd2721216c89e0c9e765a7f5ca000/25_nullIntern/README.md) | CONFIRMED có chủ đề null thật và text giống null | Không suy chính sách comparator |
| D-04 / 11 | [Git tree pinned](https://api.github.com/repos/code-signal/code-signal-arcade-databases/git/trees/f85efe2ede2dd2721216c89e0c9e765a7f5ca000?recursive=1), `truncated:false` | CONFIRMED 264 entries, 84 challenge README; không có harness nhận diện trong inventory | Không là source server CodeSignal |
| D-05 / quyền dùng | [LICENSE pinned](https://github.com/code-signal/code-signal-arcade-databases/blob/f85efe2ede2dd2721216c89e0c9e765a7f5ca000/LICENSE) | CONFIRMED file MIT copyright 2018 không tên chủ thể | Không chứng minh quyền đối với đề/ảnh gốc |
| D-06 / đối chiếu Intro | [Intro pinned](https://github.com/wachino/codefights-arcade-intro/tree/041e786853a1a16575b4efbddcd2997a72608c4b), commit 02/11/2018; [LICENSE](https://github.com/wachino/codefights-arcade-intro/blob/041e786853a1a16575b4efbddcd2997a72608c4b/LICENSE) | CONFIRMED repo bài giải có nhóm Intro và file MIT cùng ranh giới quyền như D-05 | Không source nền tảng, không đọc từng lời giải như rule |

## B — Runtime browser hiện tại

Source chung B-01–B-07: [sandbox Database](https://app.codesignal.com/practice-question/question/database?context=otherTypes), ngày 02/11/2026, browser đã đăng nhập; publication date/commit frontend không được cung cấp. CONFIRMED chỉ trạng thái/đường đã thử. Chi tiết từng bước được giữ một lần tại [03](03-technical-observation.md).

| ID | Quan sát / tính năng | Giới hạn |
|---|---|---|
| B-01 | Workspace/schema/sample/editor split, F-04/06 | Không phải Arcade, không kiểm responsive |
| B-02 | Run starter: 0/2, visible details, F-07/09 | Chỉ bài sandbox này |
| B-03 | Submit: 0/4, sample/hidden tổng, score, F-11/12 | Chưa hoàn thành đúng hoặc nhận thưởng |
| B-04 | Test khóa không lộ input khi chọn, F-09/10 | Không chứng minh global purchase policy |
| B-05 | Dropdown MySQL/MSSQL/PostgreSQL, F-05 | Chưa đổi/chạy hai engine khác |
| B-06 | Run SQL sai có lỗi MySQL 1064 | Không T-SQL error |
| B-07 | Khôi phục starter và nội dung clipboard rỗng | Không rollback timer/kết quả thử |
| B-08 | [Arcade db](https://app.codesignal.com/arcade/db) 404 ở lượt khảo sát trước cùng ngày | Không ngày đóng chính thức |
| B-09 | [Hướng dẫn practice chính thức](https://support.codesignal.com/hc/en-us/articles/21025134150423-How-do-I-practice-coding-questions-on-CodeSignal), updated 19/10/2026 | CONFIRMED hãng mô tả môi trường practice assessment; không có tiến trình challenge tiếp sau Submit | Không đồng nhất mọi lời văn hướng dẫn với chi tiết UI đang thấy |

Ảnh runtime, manifest JavaScript và raw Evidence ở temp; hashes/runtime manifest được ghi tại [receipt](evidence/rea-receipt.json). Không lưu private profile, cookie hoặc access code.

## T — REA và phân tích artifact

| ID | Nguồn / version / cách thu | Confidence và giới hạn |
|---|---|---|
| T-01 | [Chunk công khai](https://app.codesignal.com/build-chunks/69250.5d3e5abd3c2d1fd4.js), thu 02/11/2026 từ URL asset inventory; REA `analyze_javascript_application`; IDs/hash/coverage trong [03](03-technical-observation.md) và [receipt](evidence/rea-receipt.json) | CONFIRMED byte identity; REA authority shipped-artifact, confidence derived; static syntax parse thành công, semantic partial; không runtime/backend/lịch sử |
| T-02 | Catalog tool REA hiện tại; thao tác kiểm listener/process local tại lượt lập kế hoạch cùng ngày; [skill REA](https://github.com/morluto/rea) là nguồn hướng dẫn, không nguồn CodeFights | CONFIRMED công cụ phản hồi và chưa có endpoint CDP được hỗ trợ; không kết luận không thể có CDP trên mọi máy |
| T-03 | HTML H-11, REA parent `ev_fbf46be95e4ab8fa2dd76cfc4448a155368504185e92db2ef2144920b73bd824`, [receipt riêng](evidence/historical-rea-receipt.json) | CONFIRMED inventory đã chạy; 0 JS parsed/0 module, inline body không phân tích, semantic unknown. Không phục hồi logic Arcade |

Không mở native binary/session; không có native target phải `close_binary`. Raw bundle đã export, không cần phân tích lại để lấy cùng Evidence. Việc đọc literal bằng shell và việc REA nhận diện module được ghi tách trong 03.

## R — Source khóa học

Nguồn cho mọi R-*: repo `nhatlam1111/microsoft-sql-lession`, commit **8de5a4f407ef4c0740ba571f108ecedfbed975b4**, committer 01/11/2026 22:19:49 +07. Quan sát trực tiếp 02/11/2026, `CONFIRMED source`; không xác nhận production, quyền live hoặc SQL live. Đường dẫn/dòng kiểm cụ thể và limitations đầy đủ tại [12](12-repository-gap-analysis.md).

Link R-* dưới trỏ vào file của checkout đã kiểm. Kiểm permalink HEAD trên GitHub trả 404 trong lượt này, nên không dùng URL commit chưa truy cập được làm nguồn đã xác minh. Commit hash và manifest local giữ định danh phiên bản; không xác nhận HEAD đã public và không push để làm link hoạt động.

| ID | Source URL đại diện | Liên quan và quan sát | Còn chưa biết |
|---|---|---|---|
| R-01 | [package](../../../package.json) | Astro/React/static collections | Performance/deployed commit |
| R-02 | [Exercise page](../../../src/pages/bai/%5Bslug%5D/bai-tap/%5Bn%5D.astro) | Split workspace | Browser build chưa kiểm trong nghiên cứu |
| R-03 | [SqlEditor](../../../src/components/islands/SqlEditor.tsx) | Textarea/highlight/phím chạy | Clipboard/keyboard thật |
| R-04 | [exercise-storage](../../../src/lib/exercise-storage.ts) | Nháp/code local | Cross-device |
| R-05 | [exercise-types](../../../src/lib/exercise-types.ts) | Một answer/check, public projection | Không multi-scenario |
| R-06 | [API index](../../../api/src/index.ts) | Code gate, ping/run/grade | Không learner identity |
| R-07 | [API core](../../../api/src/core.ts) | Run vs grade một dataset | Runtime actual |
| R-08 | [runner](../../../api/src/runner.ts) | Transaction/rollback flow | Disconnect/rollback live |
| R-09 | [runner config](../../../api/src/runner.ts) | Pool/time/row caps | Không quota toàn service |
| R-10 | [sql-guard](../../../src/lib/sql-guard.ts) | SELECT/WITH/DML và blocked words | Không parser sandbox hoàn chỉnh |
| R-11 | [practice-user](../../../database/practice-user.sql) | Script quyền trên bảy bảng | Quyền production thực tế |
| R-12 | [limiter](../../../api/src/limiter.ts) | Map RAM từng instance | Distributed admission |
| R-13 | [grade](../../../src/lib/grade.ts) | Multiset/order/value comparison | Precision/driver edge cases live |
| R-14 | [progress](../../../src/lib/progress.ts) | Lesson/exercise completion local | Server authority |
| R-15 | [progress-store](../../../src/lib/progress-store.ts) | Import/export/cross-tab | Không giao dịch đồng bộ server |
| R-16 | [db-schema](../../../src/lib/db-schema.ts) | ERD build từ script | Không inspect live |
| R-17 | [dist checker](../../../scripts/check-dist.mjs) | Chặn đáp án ra frontend; YAML public | Không giấu đáp án khỏi người đọc Git |
| R-18 | [content](../../../src/content) | Đếm source 50 lesson/76 exercise | Không dữ liệu học viên |
| R-19 | [quy-uoc](../../../docs/quy-uoc.md) | Quy ước, tiền đề Excel, khung hiện hành | Không tự tạo ngoại lệ Arcade |
| R-20 | [API directory](../../../api/src) | Không thấy wallet/scenario/identity entity trong phạm vi source | Không inventory mọi tài nguyên Azure |

## M — Nguồn kỹ thuật cho thiết kế T-SQL mới

Các URL Microsoft dưới đã đọc ngày 02/11/2026, view SQL Server 17 hiện hành; không dùng chúng làm bằng chứng luật CodeFights. Ngày sửa từng trang không đồng nhất với ngày kiểm. Nhãn CONFIRMED nội dung tài liệu; chưa chạy môi trường mới.

| ID | Primary source | Nội dung sử dụng / giới hạn |
|---|---|---|
| M-01 | [NULL and UNKNOWN](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/null-and-unknown-transact-sql?view=sql-server-ver17), trang ghi 21/09/2026 | NULL khác rỗng/zero, logic ba giá trị; comparator của hệ thống mới vẫn là thiết kế riêng |
| M-02 | [decimal/numeric](https://learn.microsoft.com/en-us/sql/t-sql/data-types/decimal-and-numeric-transact-sql?view=sql-server-ver17) | Fixed precision/scale và rủi ro chuyển kiểu; không xác nhận JS driver giữ chính xác |
| M-03 | [Collation and Unicode](https://learn.microsoft.com/en-us/sql/relational-databases/collations/collation-and-unicode-support?view=sql-server-ver17) | Sort/compare phụ thuộc collation; không đọc được collation database khóa học live |
| M-04 | [Locking and row versioning](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide?view=sql-server-ver17) | Transaction/isolation/locks; rollback không thay resource isolation |
| M-05 | [Database permissions](https://learn.microsoft.com/en-us/sql/relational-databases/security/authentication-access/getting-started-with-database-engine-permissions?view=sql-server-ver17) | Principal/quyền theo object; script quyền không chứng minh quyền hiệu lực |
| M-06 | [Microsoft SqlScriptDOM](https://github.com/microsoft/SqlScriptDOM) | Có parser T-SQL/AST làm ứng viên spike; chưa cài/chọn version hoặc kiểm mọi syntax |

Mọi unknown quan trọng được chuyển sang [Open Questions](open-questions.md). Chuỗi nguồn → requirement → thiết kế tại [Traceability Matrix](traceability-matrix.md).
