# 02. Source Catalog và ranh giới tìm kiếm

Ngày kiểm: 02/11/2026. Catalog quản lý nguồn; kết luận chi tiết nằm ở [Evidence Register](evidence-register.md) và [nghiên cứu lịch sử](01-historical-research.md). Một URL, ảnh đính kèm và bài sao chép cùng nội dung không được tính thành ba nguồn độc lập.

## 1. Nguồn đã đọc

| ID | Nguồn canonical | Ngày / phiên bản liên quan | Loại và tính độc lập | Trạng thái tiếp cận |
|---|---|---|---|---|
| H-01 | [Thông cáo Code Arcade](https://www.prnewswire.com/news-releases/codefights-unveils-code-arcade-to-make-honing-your-skills-a-thrilling-game-300332143.html) | 21/09/2016; bản ra mắt | Primary, do CodeFights phát hành; các bản đăng lại cùng thông cáo không độc lập | Đọc toàn phần liên quan qua web |
| H-02 | [Thông cáo rebrand](https://www.prnewswire.com/news-releases/codefights-becomes-codesignal-launches-the-coding-score-for-developers-300678041.html) | 10/07/2018 | Primary, CodeSignal; cùng nhà cung cấp với H-01 nhưng sự kiện khác | Đọc phần rebrand, Coding Score và UI |
| H-03-T | [TriadWorks — Praticando algoritmos](https://blog.triadworks.com.br/praticando-algoritmos-de-forma-divertida-com-o-code-fights) | 18/05/2017; CodeFights | Tài khoản trải nghiệm của Kewerson Hugo; độc lập với thông cáo | Đọc văn bản và mở ba ảnh gốc |
| H-04 | [Luận văn Manuel Gregorio](https://riunet.upv.es/bitstream/handle/10251/174673/Gregorio%20-%20Generacion%20Automatica%20de%20Ejercicios%20Auto-Corregibles%20de%20Programacion%20en%20Java.pdf?sequence=1) | Năm học 2020/2021; tài liệu ghi truy cập 04/03/2021 | Nghiên cứu có ghi nhận riêng; nguồn hình là UI CodeSignal, không phải manual nhà cung cấp | Đọc text/diễn giải hình từ index; chưa kiểm pixels |
| H-05 | [Lun Wai — Arcade Intro #56](https://lunwai.medium.com/codesignal-arcade-intro-56-digitsproduct-484af6937f59) | 21/08/2024; CodeSignal Arcade Intro | Tài khoản trải nghiệm độc lập với H-03; có phần nhớ lại | Đọc đoạn nói về test và Coin; không tái sử dụng lời giải |
| H-06 | [Catálogo de Juegos serios en Ingeniería del Software](https://alarcos.esi.uclm.es/OtrasPublicaciones/CatologoJuegosSerios.pdf) | Phạm vi tài liệu đến 08/2024; mục CodeFights ghi 2017 | Tài liệu tổng hợp; screenshot dẫn video H-06-V nên không coi là nguồn độc lập với video | PDF 30 trang tải được; render và xem trang 18 |
| H-07 | [InfoWorld phỏng vấn CEO](https://www.infoworld.com/article/2262046/q-a-can-coding-games-progress-developer-careers.html) | 28/08/2017 | Primary interview về phát biểu CEO; không phải kiểm toán luật thưởng | Đọc phần liên quan các mode và rewards |
| H-08 | [Stack Overflow 59736344](https://stackoverflow.com/questions/59736344/failing-hidden-tests-in-codesignal-what-seems-to-be-the-problem-in-my-code) | 14/01/2020; Arcade Intro level 7 | Báo cáo trực tiếp của người hỏi; câu trả lời về code không phải luật nền tảng | Đọc link bài, ngày hỏi và mô tả trượt hidden |
| H-09 | [Replacement for Codesignal Arcade?](https://www.reddit.com/r/learnprogramming/comments/1h0mnlp/) | Index ghi 26/11/2024 | Báo cáo người dùng; email được kể lại chưa công bố độc lập | Đọc bài và phần trao đổi liên quan |
| H-10 | [Codesignal Coins Question](https://www.reddit.com/r/csMajors/comments/k6vzpt/) | Index gợi khoảng 2020; chưa khóa ngày tuyệt đối | Câu hỏi người dùng; không có lời đáp đã kiểm | Chỉ dùng để ghi khoảng trống phạm vi unlock |
| H-11 | [Wayback Intro snapshot](https://web.archive.org/web/20170624125417id_/https://codefights.com/arcade/intro) | Snapshot 24/06/2017 12:54:17 UTC | Primary artifact lưu trữ, HTML shell | HTTP trực tiếp lấy 3.552 byte; external bundle replay trả 404, chưa có runtime |

H-03 là một nhóm nguồn, không phải nhiều nguồn độc lập. H-07 cung cấp phát biểu của cùng nhà cung cấp với H-01/H-02; giá trị bổ sung là thời điểm và nội dung phỏng vấn, không phải một phép kiểm runtime riêng.

## 2. Ảnh và video

| ID | Địa chỉ | Ngày gắn nguồn | Cách kiểm thực tế | Điều chưa kiểm |
|---|---|---|---|---|
| H-03-I | [Ảnh editor/test](https://silvrback.s3.amazonaws.com/uploads/0d161a5c-41a6-4e17-b8c5-0760425c0702/ide.png) | Trang đăng 18/05/2017 | Tải PNG, mở trực tiếp; có SHA-256 trong Evidence Register | Ngày chụp và hành vi động |
| H-03-M | [Ảnh map](https://silvrback.s3.amazonaws.com/uploads/2e9f79f0-7c7b-4bb1-8608-7c9940d7eebf/arcade.png) | Như H-03 | Tải PNG, mở trực tiếp | Guard mở khóa |
| H-03-H | [Ảnh hint](https://silvrback.s3.amazonaws.com/uploads/55844a5f-b414-40b0-a01e-f88971d78f62/dica.png) | Như H-03 | Tải PNG, mở trực tiếp | Giao dịch mua, hidden-test reveal |
| H-06-V | [Video 8RFUyuHrDMA](https://www.youtube.com/watch?v=8RFUyuHrDMA) | Chưa xác minh ngày đăng | Chỉ biết URL từ caption của H-06 | Fetch/oEmbed thất bại; chưa có timestamp tự xem |
| H-04-F | Fig 7–14, trang in 30–32 của H-04 | Tài liệu 2020/2021 | Text và mô tả hình do index trả về | Không có bản render pixels đã kiểm |

Không viết timestamp ước lượng từ hình tĩnh. Một screenshot nằm trong tài liệu xuất bản sau đó có thể lưu UI cũ; ngày xuất bản tài liệu không tự trở thành ngày chụp.

## 3. Khả năng truy cập và giấy phép

Các nguồn web trên được dùng để mô tả chức năng và dẫn nguồn. Lượt kiểm này chưa xác minh một giấy phép cho phép đưa artwork, đề bài, screenshot hoặc code độc quyền của CodeFights vào sản phẩm mới. Vì vậy, tài liệu đề xuất tạo nội dung và hình minh họa độc lập; các bản thu thô chỉ phục vụ nghiên cứu cục bộ.

Nếu dùng một repo bài giải để tra cấu trúc, phải kiểm LICENSE ở commit cụ thể. Giấy phép của tác giả repo không tự xác nhận quyền đối với đề bài, dataset hoặc hình của nền tảng được chép vào repo. [Phân tích Databases](11-databases-arcade-analysis.md) ghi riêng nguồn repository và giới hạn đó.

| Nhóm nguồn | Quyền đã xác minh trong lượt này | Cách sử dụng trong hồ sơ |
|---|---|---|
| H-01/H-02/H-07 | Chưa kiểm quyền tái phát hành toàn văn | Paraphrase ngắn, dẫn URL, phân biệt phát biểu và quan sát |
| H-03/H-05 | Chưa kiểm giấy phép tái sử dụng hình/code | Không chép lời giải hoặc artwork vào MVP |
| H-04/H-06 | Chưa kiểm giấy phép hình gốc trong tài liệu | Dẫn vị trí, không suy ra tài liệu sở hữu mọi hình |
| H-08/H-09/H-10 | Không dùng nội dung người dùng làm source code hoặc rule chính thức | Chỉ ghi báo cáo trải nghiệm và điều còn mở |

## 4. Tìm kiếm đã thực hiện và kết quả âm tính

Các nhóm truy vấn đã dùng: `CodeFights Arcade hidden tests coins 2017`, `CodeSignal unlock 5000 tests`, `CodeFights Run Tests Submit sample`, `CodeFights Arcade Databases 2017`, cùng tên nguồn và URL trực tiếp. Mục tiêu là cơ chế, phiên bản và hình UI; không thu thập thêm hàng loạt bài giải trùng nhau.

| Đích kiểm | Kết quả | Giới hạn kết luận |
|---|---|---|
| [Wayback CDX cho CodeFights Arcade](https://web.archive.org/cdx/search/cdx?url=codefights.com%2Farcade*&output=json&filter=statuscode%3A200&collapse=urlkey&limit=20) | Web tool không truy cập được; HTTP trực tiếp trả 200 và 8 record đã collapse theo URL; exact `/arcade/db` có filter trả mảng rỗng | Không suy toàn bộ archive trống hoặc đã khôi phục nội dung các trang; lấy shell Intro theo timestamp thật |
| Bundle `b204e24...js` dẫn từ HTML Intro 2017 | Replay URL snapshot trả 404; CDX exact bundle timeout 15 giây | Chỉ trạng thái những yêu cầu này; không kết luận script chưa từng được lưu |
| Video H-06-V và oEmbed | Fetch/throttling | Không có walkthrough, timestamp hoặc ngày đăng được xác minh |
| UPV canonical PDF và bitstream mới | Download/screenshot trực tiếp gặp Anubis | Không vượt challenge; bản HTML trả về không phải PDF |
| Nguồn hướng dẫn legacy chính thức về wallet/grader | Chưa tìm thấy trong ranh giới truy vấn này | Không kết luận tài liệu đó chưa từng tồn tại |

Mọi truy cập này là đọc. Không đăng nhập tài khoản khác, gửi email, vượt quyền, mua test hoặc đổi cấu hình để lấy bằng chứng.

## 5. Cách dùng catalog khi triển khai nghiên cứu tiếp

Một kết luận mới phải ghi rõ nó thuộc nguồn đã đọc trực tiếp, tài liệu gián tiếp hay một phép quan sát mới. Khi có bằng chứng thay đổi kết luận, cập nhật Evidence Register và các câu hỏi mở cùng lượt, không sửa thầm nhãn confidence ở một báo cáo đơn lẻ.

Nghiên cứu JavaScript/REA và nguồn repo hiện tại được ghi tại [03](03-technical-observation.md), [11](11-databases-arcade-analysis.md) và [12](12-repository-gap-analysis.md). Chúng không được tính là xác minh runtime Arcade lịch sử chỉ vì cùng thương hiệu CodeSignal.

## 6. Nguồn repository, kỹ thuật và runtime bổ sung

| Nhóm / ID | Source và version đã khóa | Cách tiếp cận và quyền |
|---|---|---|
| D-01–D-05 | [Databases archive](https://github.com/code-signal/code-signal-arcade-databases/tree/f85efe2ede2dd2721216c89e0c9e765a7f5ca000), commit 25/03/2022 | GitHub connector đọc README/LICENSE/Git tree và hai bài mẫu; MIT repo không tự cấp quyền nội dung gốc |
| D-06 | [Intro archive](https://github.com/wachino/codefights-arcade-intro/tree/041e786853a1a16575b4efbddcd2997a72608c4b), commit 02/11/2018 | Đọc danh mục, metadata commit và LICENSE; không source nền tảng |
| B-01–B-08 | Sandbox Database, phiên browser 02/11/2026; route Arcade cũ | Người dùng đã đăng nhập và cho phép khảo sát; không thu cookie/profile; starter đã phục hồi |
| B-09 | [Practice guide](https://support.codesignal.com/hc/en-us/articles/21025134150423-How-do-I-practice-coding-questions-on-CodeSignal), updated 19/10/2026 | Tài liệu hãng, phạm vi assessment practice hiện tại |
| T-01 | Một bundle công khai theo URL/digest trong 03 | REA static parse, export Evidence, graph partial; không giấy phép đưa code đó vào sản phẩm |
| T-03 | HTML shell H-11, byte hash và receipt riêng | REA inventory 0 JS parsed/0 module; một inline body không phân tích, không logic Arcade |
| T-02 | [REA upstream](https://github.com/morluto/rea), skill local và catalog MCP thực tế | Dùng schema/tool hiện có; không cài engine hoặc đổi cấu hình |
| R-01–R-20 | Repo khóa học commit 8de5a4f407ef4c0740ba571f108ecedfbed975b4 | Source đọc tại local checkout; permalink HEAD GitHub trả404 nên register dùng link file local; không SQL/API live hoặc lấy README thay source |
| M-01–M-06 | Microsoft Learn SQL Server 17, Microsoft SqlScriptDOM, URL đầy đủ trong Evidence Register | Primary technical sources đọc 02/11/2026; dùng cho thiết kế mới, không luật CodeFights |

Các artifact thô cục bộ và metadata đã khử thông tin không cần thiết được chỉ rõ trong Evidence Register/receipt. Không phát hành bản sao bundle hoặc ảnh độc quyền vào repo; các wireframe là sơ đồ tự dựng.
