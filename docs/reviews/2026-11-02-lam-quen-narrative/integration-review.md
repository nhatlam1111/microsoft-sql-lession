# Review tích hợp bài giảng Làm quen SQL Server — 02/11/2026

## Phạm vi, phiên bản và công cụ

Review độc lập bằng Codex, **kế thừa model của phiên**, ngữ cảnh mới; không phân tiếp. Góc nhìn người học chỉ biết Excel văn phòng cơ bản, kết hợp kiểm kỹ thuật phần dùng chung theo mục 4.5–4.7 của `docs/quy-uoc.md`. Chỉ ghi report này; không sửa sản phẩm, test, Git hoặc dữ liệu.

Đã đọc AGENTS.md, quy ước, lesson/presentation template, hồ sơ công ty, bài mẫu 1.1/2.1, các bài nguồn 1.2/1.4/1.5, spec và plan ngày 02/11. Không đọc report cũ hoặc nhận xét của reviewer khác.

- Base HEAD: `a67c37a4872daaee7711dbab8bb794fbb8a1f681`; working tree chưa commit trên `codex/lam-quen-narrative`.
- Đối chiếu diff được giao với source và các file mới trong `build-manifest.json`; **11/11 SHA256 source và 2/2 SHA256 HTML khớp** lúc kiểm.
- Source MDX: SHA256 `7810930fff8a942ea8a90e43cf60dd757df58a54ac7bb5813897e54a53a469f8`.
- Build audience: `dist/bai-giang/lam-quen/index.html`, SHA256 `fa16b468b0281f2604a171e5149d326295c73e667386db0ddd46f9248153ccdf`.
- Build presenter: `dist/bai-giang/lam-quen/nguoi-giang/index.html`, SHA256 `d7fbaa1a9a14d59712c78b0619acc84776241c8fdbd3cdfd5bfd730a4586cd4d`.
- Lấy thời gian trong manifest làm chuẩn: hai HTML sửa lúc `2026-11-02T04:44:36Z`; manifest ghi nhận lúc `04:45:02Z`. Người giao đã xác nhận nhãn UTC trong mô tả ban đầu bị ghi nhầm; đây không phải lệch source/build.

Công cụ tự dùng: PowerShell, đọc source/diff và Git chỉ đọc, Vitest 3.2.7, AstroContainer, Vite SSR trong bộ nhớ, Python chuẩn để phân tích HTML/XML/hash và đọc CSS đã biên dịch. Dùng công cụ web đọc trang nguồn công khai để đối chiếu credit/giấy phép; **không dùng browser UI**. Không mở `.env`/secret hoặc trực tiếp đọc `database/HRM_Demo.sql`; không kết nối database, chạy SQL, API/runner.

## Findings theo ưu tiên

### INT-01 — P3 / Biên tập: alt ảnh gọi nhầm cả bảng là một ô

- **Vị trí:** `src/content/presentations/lam-quen.mdx:38`; ảnh nguồn `src/assets/presentations/relational-database-terms.svg:7`.
- **Câu gốc:** “các nhãn chỉ một dòng, một cột và một ô.”
- **Trigger:** đọc ảnh bằng văn bản thay thế hoặc trình đọc màn hình trên slide `cac-mo-hinh-luu-tru`, ở cả hai mode.
- **Tác động:** người không đọc trực tiếp ảnh được mô tả sai ý nghĩa nhãn thứ ba, dễ lẫn bảng với ô ngay trước phần định nghĩa bảng/dòng/cột.
- **Căn cứ:** SVG thực có ba nhãn `Tuple`, `Attribute`, `Relation`; `Relation` là cả bảng. Đã đọc nhãn trong XML và xác nhận cùng alt sai đi nguyên vào cả hai HTML build. Đây là chuỗi alt được viết trong MDX, không phải lỗi xử lý ảnh của Astro.
- **Sửa ngắn:** thay “một ô” bằng “cả bảng”; giữ ảnh và caption hiện có.

Không tìm thấy finding P0–P2 trong phạm vi tích hợp đã kiểm. INT-01 chưa được sửa trong phiên bản review này.

## Phần giữ được và căn cứ

| Hạng mục | Kết quả đối chiếu |
|---|---|
| Mạch và định danh | Source và cả hai HTML có 21 slide cùng thứ tự; tổng phút slide 48, metadata 55 và mở đầu ghi 7 phút hỏi đáp. So với MDX ở HEAD, giữ đủ 18 ID cũ, chỉ thêm `cac-mo-hinh-luu-tru`, `so-sanh-cac-dang-database`, `tu-excel-den-database-quan-he`. Các URL chia sẻ theo ID cũ còn đích hợp lệ. |
| Tổng quan trước, khóa sau | Định nghĩa database chung → hai nhóm → Excel → SQL Server/SQL/SSMS → dữ liệu trích → ERD overview → bảng/dòng/cột/khóa → ERD detail. Overview có đúng ba nhãn bảng và hai nét trung tính; không có PK/FK, `∞` hoặc caption cặp khóa trong HTML. |
| Default detail | `ProjectionRelation.astro:10` mặc định `detail`. Render không truyền variant giống hệt render truyền `detail`; giữ PK/FK, `1 ← ∞` và các cặp `NhanVien.MaPB → PhongBan.MaPB`, `HopDong.MaNV → NhanVien.MaNV`. Đảo thứ tự bảng vẫn ra hai `∞ → 1` và đúng cặp FK. Các cặp này được kiểm qua component/parser hiện có, không đoán từ tên cột và không chạy database. |
| Validation và showLinks | Kiểm bảng/cột/FK nằm trước nhánh render (`ProjectionRelation.astro:12–31`). Ba ca sai trong overview bị từ chối bằng AstroContainer thật. Thí nghiệm riêng xác nhận `showLinks={false}` giấu đường/caption nhưng detail còn khóa, overview còn giấu khóa; quan hệ sai vẫn bị từ chối dù giấu đường. |
| ConceptFigure | Diff chỉ đổi caption database thành “trích dữ liệu từ ba bảng” và đổi thứ tự thành PhongBan — NhanVien — HopDong. Không thay dữ liệu, nhánh hình PK/FK hoặc các biến thể giả định khác. |
| CSS và giới hạn ảnh hưởng | CSS component vẫn scoped bằng `data-astro-cid-5prwokrg` trong build. Selector mới cho padding trong `.concept-erd-lesson` có specificity cao hơn selector scoped nên có hiệu lực; nhãn cột vẫn 26px, đoạn giải thích của biến thể 28px. Class mới không xuất hiện trong HTML bài đọc; CSS trình chiếu được import qua PresentationLayout. Không đổi CSS nền, controller hoặc route. |
| Controller và tiến độ | Không có diff ở shell/controller/state/route/progress. Các kiểm state, URL có base, protocol và tách tiến độ đều qua. Deck không thêm quiz, `Exercises`, câu ghi dữ liệu hoặc yêu cầu thực hành; không có bảng tiền đề bài tập cần chấm trong scope này. |
| Notes và bản không JavaScript | HTML audience không có khối `data-presenter-notes`; HTML presenter có đúng 21 khối. Điều kiện cốt lõi của PK/FK và các giả định không có luật khác ở màn lớp, không bị chuyển riêng vào notes. Toàn bộ 21 section cùng nội dung cốt lõi nằm trong HTML tĩnh; không cần JavaScript để tạo nội dung. |
| Assets và an toàn render | Năm ảnh trong build đều dùng URL asset nội bộ có base `/microsoft-sql-lession/`; SVG được dùng qua `img`, PNG được Astro xuất WebP. SVG không có script, foreignObject, event handler hoặc href ngoài; các href của nó là fragment nội bộ. Không thêm script ngoài hoặc `set:html`/HTML động nguy hiểm. |
| Tiếp cận và liên kết | Section slide có `aria-labelledby`; bảng ERD có nhãn “Bảng …”; bảng so sánh có header cột và header dòng với scope. Các ảnh có alt; chỉ INT-01 cần chỉnh ý nghĩa. Credit tác giả/giấy phép hiện trên HTML audience và presenter, đầy đủ hơn trong notes. `check:dist` xác nhận đích nội bộ của bản build. |

Các câu hỏi “vì sao/để làm gì” ở các chặng tích hợp được trả lời: tách bảng để giảm chép lại/sửa sót; mã để nhắc đúng dòng; PK giữ nhận diện, FK kiểm tham chiếu; ERD giúp xác định nguồn và cặp cột; đi sang phía nhiều có thể tăng dòng. Ví dụ NV001/KT/Kế toán và ba hợp đồng của NV021 khớp hồ sơ công ty và các bài nguồn đã đọc. Giới hạn phòng hiện lưu không phải lịch sử được giữ trên màn lớp.

## Kiểm do reviewer tự thực hiện

| Lệnh/thí nghiệm | Kết quả thực tế |
|---|---|
| `npm test -- tests/projection-relation.test.ts tests/presentation-content.test.ts tests/presentation-outline.test.ts tests/presentations.test.ts tests/presentation-state.test.ts` | Exit 0; **5 file, 30 test qua**. 5 test component thực sự render Astro rồi kiểm output/throw; không chỉ tìm chuỗi trong source. |
| 5 ca AstroContainer bổ sung qua Vite SSR trong bộ nhớ | Exit 0: default bằng explicit detail; `showLinks=false` ở detail; ở overview; đảo thứ tự bảng/FK; quan hệ sai vẫn throw khi overview giấu links. Không tạo file test hoặc sửa component. |
| Phân tích hai HTML bằng HTMLParser | Mỗi mode 21 slide; notes 0/21; mỗi mode 1 overview và 3 detail; overview không lộ khóa/cardinality/caption, detail giữ nhãn/cặp liên kết. |
| So ID MDX hiện tại với `git show HEAD:src/content/presentations/lam-quen.mdx` | Giữ đủ 18 ID cũ, thêm đúng 3 ID được duyệt. |
| Phân tích XML SVG và CSS biên dịch | Nhận diện được nguyên nhân INT-01; không có các cấu trúc thực thi/liên kết ngoài nêu trên; scoped selector và override của biến thể khớp mục đích. |
| `npm run check:dist` | Exit 0: **139 trang, 2.801 link**. |

Đã đối chiếu trực tiếp [trang nguồn ảnh quan hệ](https://commons.wikimedia.org/wiki/File:Relational_database_terms.svg) với Booyabazooka/public domain và [trang nguồn ảnh đồ thị](https://commons.wikimedia.org/wiki/File:GraphDatabase_PropertyGraph.png) với Ahzf/Achim Friedland, CC0 1.0. Credit trong asset registry và MDX khớp. [Microsoft Learn về mô hình dữ liệu](https://learn.microsoft.com/en-us/azure/architecture/data-guide/technology-choices/understand-data-store-models) hỗ trợ cách giới thiệu quan hệ và các mô hình phi quan hệ; không thấy slide tuyên bố NoSQL luôn nhanh hơn, không có schema hoặc không có quan hệ.

## Evidence tác giả cung cấp, không phải thao tác UI của reviewer

Được phép đọc hai file `geometry-1280.json` và `geometry-1920.json` trong cùng thư mục. Mỗi file có 21 slide; không ghi nhận tràn ngang hoặc ảnh lỗi; khoảng cách chân nội dung tới footer nhỏ nhất lần lượt 8 và 13px. Đây là số đo do tác giả thu bằng browser. Reviewer chỉ đọc JSON, không tự đo viewport, nhìn mọi slide bằng browser hoặc tái hiện các thao tác tương tác.

## Đã cân nhắc nhưng để ngoài hoặc chưa kết luận

- **Học sâu NoSQL, thay hệ thiết kế hoặc đổi cơ chế điều khiển:** ngoài thiết kế đã duyệt; hai nhóm chỉ để định vị khóa học. Không yêu cầu thêm mô hình, câu SQL, quiz hoặc UI mới.
- **showLinks=false vẫn xác thực FK:** giữ hành vi cũ có chủ đích. Tham số chỉ giấu đường, không biến sơ đồ schema thành hình tự do; không coi đây là lỗi.
- **Khoảng hở footer nhỏ ở slide dài:** JSON tác giả còn khoảng dương, chưa có bằng chứng che nội dung; không chuyển thành finding tràn chữ khi không tự xem UI. Cần giữ phần browser QA của tác giả trong hồ sơ nghiệm thu.
- **Độ phủ regression:** các assertion hiện có chạm output thật và nhánh từ chối schema. Không chạy mutation/red-green riêng nên không gọi report này là bằng chứng mọi đột biến đều bị bắt; các ca showLinks/đảo hướng bổ sung ở đây là kiểm trực tiếp hiện trạng.
- **Độ chính xác SQL live và FK có đang bật trên database triển khai:** chưa xác minh. Render chứng minh parser đọc được quan hệ khai báo trong bộ nguồn, không chứng minh trạng thái SQL Server live. Không dùng số dòng trích trong hình thay cho tổng thật; dữ kiện học viên cần đã đối chiếu hồ sơ/bài nguồn.
- **Bàn phím, clipboard, fullscreen, hai cửa sổ, đồng bộ lại, refresh và trình đọc màn hình:** chưa tương tác trong lượt này. Test state/source/HTML không thay bằng chứng browser hoặc assistive technology. Không kiểm presenter tại 1024×768 bằng UI.
- **Toàn bộ npm test/check/build:** không chạy lại trong lượt reviewer; chỉ các lệnh scope và `check:dist` nêu trên. Build được giao khớp hash đã kiểm; kết quả build/check toàn repo vẫn thuộc hồ sơ tác giả.

Kết quả tích hợp của đúng phiên bản trên: có một mục biên tập nhỏ INT-01, không tìm thấy lỗi làm hỏng overview/detail, schema validation, ID chia sẻ hoặc việc tách notes/progress trong các kiểm đã thực hiện. Kết quả này không cấp quyền push/deploy và không thay những phép kiểm UI/SQL còn giới hạn.
