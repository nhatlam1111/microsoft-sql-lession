# Review tích hợp: bộ slide Làm quen (25 slide) và phần công cụ giữ liên kết cũ

Vai trò: Business Consultant khó tính, muốn chuyển BA/PM. Review tích hợp, không học thử lại từng slide.

## 0. Phạm vi, phiên bản, công cụ thực tế

- Base: commit `46e9398`. Head: working tree chưa commit, nhánh `codex/update-lam-quen-slides`. `sha256(src/content/presentations/lam-quen.mdx)` = `b27f01aa...3649c` (khớp mô tả của người giao).
- Đã đọc: `git diff 46e9398 -- DESIGN.md src tests` (8 file), `PubsFigure.astro`, `Slide.astro`, `presentation-state.ts`, `presentation.ts`, `presentation-outline.ts`, CSS, 3 file test, spec và plan của lượt, `docs/quy-uoc.md` (mục 3, 4.5-4.7), `docs/presentation-template.md`, `docs/ho-so-cong-ty.md`, 5 bài nguồn 1.1-1.5, tiêu đề các bài/phụ lục được tham chiếu, `src/assets/lessons/SOURCES.md`, `src/assets/presentations/SOURCES.md`, `scripts/check-dist.mjs`.
- HTML trong `dist/bai-giang/lam-quen/index.html` (trang chiếu) và `.../nguoi-giang/index.html` (người giảng), bundle JS `dist/_astro/PresentationShell...js`. Ảnh `1-5-pubs-diagram.png` đọc bằng Read; tôi cắt/vẽ khung tọa độ vào bản sao tạm ở thư mục scratchpad bằng Pillow để đối chiếu (không đổi file trong repo).
- Kiểm của chính tôi: `npx vitest run tests/presentation-state.test.ts tests/presentation-content.test.ts tests/presentation-outline.test.ts` -> 3 file, 21 test đạt. Script Python chỉ đọc HTML trong dist.
- Không làm: mở browser/server, build lại, kết nối database/chạy SQL/API, đọc `database/HRM_Demo.sql`/`.env`, tải trang web ngoài, đổi file nào khác ngoài report này, đọc report cũ.
- Lưu ý phiên bản: lúc tôi chạy `git status`, có thêm file chưa theo dõi `docs/verification/2026-11-04-lam-quen-slides.md` (không có trong danh sách người giao). Tôi không đọc nó.

## 1. Liên kết cũ (trọng tâm 1)

### Đã xác minh (kèm nguồn kiểm)

| Điều kiểm | Kết quả | Cách kiểm |
|---|---|---|
| 21 ID cũ đều còn tồn tại | Đạt: 10 ID là ID slide hiện hành, 11 ID là `<span id data-slide-alias aria-hidden>` trong slide đích | Nguồn MDX + HTML dist (script đếm `id="..."` của 21 ID, mỗi ID đúng 1 lần) |
| Không trùng ID | Đạt, ở cả trang chiếu lẫn trang người giảng (25 `<section data-slide>`, 11 alias, 0 ID trùng) | HTML dist, cả hai trang; test `restores every one of the 21...` kiểm trùng ở nguồn MDX |
| Alias nằm trong slide đúng chủ đề | Đạt cho 9/11 alias; 2 alias cần ghi nhận (mục 5.1, 5.2) | Đối chiếu tiêu đề/nội dung slide cũ (`git show 46e9398:...`) với slide đích |
| `ten-phong-cua-nv001`, `hop-dong-kem-ten-phong` ở slide cuối | Đạt về vị trí (`lan-duong-va-tu-tham-chieu`); về nội dung xem mục 5.3 | HTML dist + test dòng cuối |
| Query `?slide=` và hash `#id` chuẩn hóa sang ID chính | Đạt | Test `restores legacy query and hash aliases...` (3 dạng: `?slide=`, `#`, `#old%2Dquestion`) + test 21 ID (cả `?slide=` và `#`) |
| ID chính ưu tiên hơn alias | Đạt | `normalizePresentationState` tìm `s.id ===` trước rồi mới `aliases`; có test `intro` có alias `current` trong khi `current` là ID chính slide khác |
| ID lạ về slide đầu | Đạt, hành vi cũ giữ | Test `?slide=unknown#old-question` -> `intro`; code: `?? slides[0]` |
| Link chia sẻ chỉ có ID chính | Đạt | Test `presentationShareUrl(...).search === '?slide=current'`; code `presentation.ts` dùng `state.slideId` đã chuẩn hóa |
| Giao thức đồng bộ không đổi | Đạt | `isPresentationMessage` vẫn so ID chính, `PRESENTATION_PROTOCOL` = 1; không có hằng/thông điệp mới trong diff |
| Controller lấy alias từ DOM | Đạt | Bundle dist có `[data-slide-alias][id]`; trang HTML có đúng 11 span khớp selector |
| Trang chiếu không mount progress store | Đạt | Dist trang chiếu: 1 script (`PresentationShell...js`, 8,3 KB, không có `localStorage`/`progress`), 0 `astro-island`; test outline cấm import progress |

Công nhận: ý tưởng đặt alias trong DOM của slide đích, thay vì thêm bảng ánh xạ ở nơi khác, đơn giản, không đổi schema/route/protocol, và hash không-JS có đích thật. Diff của `presentation-state.ts`/`presentation.ts` chỉ 6+6 dòng, không thấy đường vòng làm đổi ID chính.

### Chỉ đọc nguồn, chưa có test hay chưa chạy thật

- Việc `presentation.ts` gom alias bằng `querySelectorAll` chưa có test đơn vị (test nội dung tự dựng lại danh sách alias bằng regex trên MDX: `<span id="..." data-slide-alias`). Tôi đã bù bằng cách đối chiếu HTML dist (đủ 11 span, đúng ID); nếu sau này ai viết `<span data-slide-alias id=...>` thì test cũ vẫn bắt được vì 21 ID sẽ không phân giải hết.
- Hash trỏ tới span `aria-hidden` ở chế độ không-JS: `aria-hidden` không ảnh hưởng cuộn tới phần tử; span rỗng đứng đầu `.projection-body`, tức dưới tiêu đề `h2`. Chưa xác minh bằng trình duyệt (xem mục 5.7).
- Hash có dấu/`%2D`: `decodeURIComponent` trong `try/catch`; `%2D` có test, hash lỗi mã hóa rơi về `undefined` rồi slide đầu (đọc nguồn). ID alias và ID chính đều ASCII nên ca "dấu" không thể khớp, rơi về slide đầu như ID lạ.
- Alias trùng ID chính ở slide khác: nguồn MDX hiện không có (đã kiểm); logic xử lý có test.

Không thấy đường vòng hay ca hiếm sai trong phạm vi này. Các hành vi cũ không đổi, tôi ghi ở mục 5 (4, 5, 6).

## 2. Mạch kiến thức giữa các bài/slide (trọng tâm 2)

### Tham chiếu bài sau (đã đọc tiêu đề thật)

| Tham chiếu | Đích thật | Kết luận |
|---|---|---|
| PL.1, PL.2 | "Chi tiết các kiểu dữ liệu"; "Chuyển đổi kiểu dữ liệu" | Đúng chủ đề (nhưng đường dẫn liên kết có lỗi, F-01) |
| 2.8 | "Hàm ngày: thâm niên, sinh nhật, hết hạn hợp đồng" | Đúng |
| 3.4 / 3.6 / 3.7 | INNER JOIN; kết nhiều bảng; self join | Đúng |
| 5.2 | "Ràng buộc: Data Validation của database" (bài tóm tắt `kind: summary`, 1,5 KB) | Đề tài đúng, nhưng bài không dạy điều slide hứa (F-03) |
| 5.5 | "Import dữ liệu từ file Excel" | SAI chủ đề: transaction là bài 5.4 (F-02) |
| 6.1 / 6.3 | Dữ liệu nhạy cảm và phân quyền; Backup và restore | Đúng |

### Con số thời lượng

50 phút giảng + 10 hỏi đáp: đúng (metadata `minutes: 60`, tổng các `minutes` slide = 50). Nhóm 10/8/10/9/13: 1.1 = 5x2; 1.2 = 4x2; 1.3 = 5x2; 1.4 = 1+2+2+2+2; 1.5 = 2+2+2+2+2+3 -> 10/8/10/9/13, tổng 50. Đúng, test outline khóa từng slide. Chưa kiểm được "50 phút có đủ thật không" (không có buổi giảng thử).

### Đối chiếu slide với bài nguồn

Các khẳng định cốt lõi của slide khớp bài nguồn: DBMS/RDBMS/NoSQL; edition SQL Server 2025; `decimal(4,1)` tối đa ba chữ số nguyên, một lẻ; `n` theo byte/cặp byte; `datetime2` không múi giờ; NOT NULL chỉ chặn NULL; PK = duy nhất + không NULL; khóa ghép `BangLuong(KyLuong, MaNV)` (có `tests/db-schema.test.ts` khóa PK này); FK kiểm mã tồn tại; PUBS: `pub_info.pub_id` PK+FK, `titles.pub_id` nhận NULL, `sales` PK 3 cột (xem mục 3). Không thấy slide nói trái bài nguồn. Các điểm lệch/thiếu nằm ở F-04 đến F-11 bên dưới.

### Findings mạch kiến thức

**F-01. Cần sửa. Liên kết PL.1/PL.2 hỏng ở trang người giảng.**
- Câu gốc: `<a href="../../phu-luc/pl-1-chi-tiet-kieu-du-lieu/">PL.1 về kiểu</a>` và `.../pl-2-chuyen-doi-kieu-du-lieu/` (`lam-quen.mdx` dòng 261, slide `chuyen-kieu-du-lieu`).
- Căn cứ: đường dẫn tương đối chép từ bài đọc (đứng ở `/bai/<slug>/`, hai cấp). Trang chiếu `/microsoft-sql-lession/bai-giang/lam-quen/` phân giải đúng thành `/microsoft-sql-lession/phu-luc/...`. Trang người giảng `/microsoft-sql-lession/bai-giang/lam-quen/nguoi-giang/` sâu thêm một cấp nên `../../phu-luc/...` thành `/microsoft-sql-lession/bai-giang/phu-luc/...`; `dist/bai-giang/` chỉ có `index.html` và `lam-quen/`, không có thư mục `phu-luc`. HTML dist của trang người giảng giữ nguyên cùng chuỗi `../../phu-luc/`. Phép phân giải URL là xác định; chưa mở trình duyệt.
- `check:dist` không bắt được: `findLinkProblems` bỏ qua mọi URL không bắt đầu bằng `/`, còn `findAppendixFragmentProblems` chỉ xét link có `#`.
- Tác động: người giảng bấm PL.1/PL.2 trong bản xem trước sẽ 404 (người xem trang chiếu thì đúng). Đây là lỗi mới do diff này, bộ slide cũ không có link tương đối.
- Đề xuất: dùng đường dẫn có base (ví dụ `appendixUrl(...)` từ `src/lib/paths.ts` import vào MDX, hoặc `/microsoft-sql-lession/phu-luc/...` như bài 1.2 đã dùng cho `gioi-thieu`); nếu muốn chặn tái phát, `check-dist` nên phân giải cả link tương đối (thay đổi công cụ, ngoài phạm vi sửa nội dung; để tác giả quyết).

**F-02. Cần sửa. Ghi chú nói giao dịch học ở bài 5.5; bài 5.5 là Import Excel.**
- Câu gốc: "Đi sâu ở bài 5.5, 6.1 và 6.3." (ghi chú slide `uu-diem-va-dieu-kien`, dòng 154; slide nói về phân quyền, giao dịch, sao lưu).
- Căn cứ: `src/content/lessons/5-4-transaction.mdx` có `num: "5.4"`, tiêu đề "Transaction: được ăn cả, ngã về không"; `5-5` là "Import dữ liệu từ file Excel". Lỗi cùng nguồn với bài 1.2 dòng 64 ("giao dịch ở bài 5.5"), tức slide chép đúng chữ của bài nguồn nhưng bài nguồn sai.
- Tác động: người giảng/học viên đi tìm giao dịch ở 5.5 sẽ lạc. Chỉ nằm trong ghi chú (HTML trang người giảng), không lên màn chiếu.
- Đề xuất: sửa ghi chú slide thành 5.4. Bài nguồn 1.2 nằm ngoài phạm vi đợt này (đã cam kết không sửa); báo cho tác giả để sửa ở lượt phù hợp.

**F-03. Cần sửa. Lời hứa "cách kiểm NULL học ở bài 5.2" lên màn chiếu, sai nghĩa và bài đích không dạy.**
- Câu gốc: "thêm `NOT NULL` nếu cột bắt buộc có giá trị, còn cách kiểm `NULL` học ở bài 5.2." (slide `khoa-ghep-va-unique`, dòng 330).
- Căn cứ: bài 1.4 viết hẹp hơn: "Cách `UNIQUE` xử lý `NULL` học ở bài 5.2", còn "lọc `NULL`" ở bài 2.5. Slide viết "cách kiểm NULL", dễ hiểu là cú pháp kiểm NULL (đó là 2.5 và PL.6). Hơn nữa `5-2-rang-buoc-du-lieu.mdx` hiện là bài `kind: summary` chỉ có bốn gạch đầu dòng, không nói UNIQUE xử lý NULL ra sao (grep chỉ có 2 dòng chứa NULL, đều là danh sách `NOT NULL`).
- Tác động: lời hứa hiển thị trước lớp mà bài đích chưa đáp ứng; học viên có thể hiểu nhầm UNIQUE và kiểm NULL là một chuyện.
- Đề xuất: bỏ vế sau, hoặc đổi thành "cách UNIQUE xử lý NULL sẽ học sau" (không chỉ số bài khi bài đích chưa dạy). Nếu bài 5.2 sẽ được viết lại ở lượt khác thì ghi vào spec của lượt đó.

**F-04. Cần làm rõ. Điều kiện của ví dụ ngày chỉ nằm trong ghi chú.**
- Câu gốc: hàng bảng `01/02/2024 | Đọc tháng trước ngày: 2024-01-02` (slide `chuyen-kieu-du-lieu`, dòng 258).
- Căn cứ: quy ước 4.7 và chính spec yêu cầu điều kiện ảnh hưởng kết luận phải hiện trước lớp. Ghi chú (dòng 265) mới nói "giả định cấu hình đọc tháng trước ngày". Hồ sơ công ty xác nhận database khóa học dùng `us_english`, DATEFORMAT `mdy`, tức điều kiện có thật nhưng không hiện ở slide. Slide chỉ ghi kết quả, khiến người học dễ nhớ "SQL Server luôn đọc tháng trước".
- Tác động: kết luận "luôn" thay vì "tùy cấu hình ngôn ngữ/định dạng ngày của phiên".
- Đề xuất: thêm vế "theo cấu hình đọc tháng trước ngày" vào ô hoặc caption bảng.

**F-05. Cần làm rõ. Thuật ngữ dùng trên màn chiếu trước khi được giải nghĩa (gom một mục).**

| Thuật ngữ | Vị trí (slide, dòng) | Giải nghĩa nằm ở đâu |
|---|---|---|
| `HRM_Demo` | slide 1 caption (dòng 19), slide 3 | Không nơi nào trên slide; slide 1-3 chỉ nói "là database" mà không nói "database nhân sự mẫu của khóa học" |
| "truy vấn" | slide 8 bảng (dòng 145: "Thiết kế, truy vấn phù hợp"), slide 9 ("tối ưu truy vấn"), caption slide 10 | Chỉ ghi chú slide 7 (dòng 134); slide 7 hiển thị không có từ này |
| Tài liệu, khóa-giá trị, cột rộng | slide 2 bảng (dòng 37) | Chỉ ghi chú (dòng 43); trên màn chỉ giải thích "đồ thị" |
| byte, tiền tố `N'...'` | slide 12 (dòng 217-220) | Chỉ ghi chú (dòng 225); bài 1.3 có giải nghĩa byte ngay trong bài |
| "kết bảng" | slide 19 (dòng 349) | Chỉ nhắc 3.4/3.6 trong ghi chú; câu "Giả định thiếu FK và luật kiểm khác, ..." còn thiếu chủ ngữ ("thiếu ... luật kiểm khác") |
| `PK`, `FK`, `UNIQUE`, `NULL` | slide 15 (dòng 276) | Slide 16-19 sau đó; chủ ý là slide mở đầu 1 phút (ghi chú nói rõ), chấp nhận được |
| `PhongBan`, `MaQuanLy`, `BangLuong` | lần đầu ở slide 19, 25, 18 | Không có slide liệt kê bảng của HRM_Demo; `MaQuanLy` xuất hiện lần đầu ở slide cuối, vừa giới thiệu cột vừa giới thiệu khái niệm tự tham chiếu |

- Căn cứ: quy ước 4.7 "không dùng ghi chú để dạy bù định nghĩa", "kiến thức cốt lõi và điều kiện phải hiện". Các mục có định nghĩa đầy đủ trong bài nguồn nhưng bị rút khỏi màn chiếu.
- Tác động: giảng viên phải giải thích miệng; học viên đọc lại slide sau buổi học sẽ gặp từ lạ. Không sai kiến thức.
- Đề xuất: giải nghĩa ngắn tại slide đầu tiên dùng từ (HRM_Demo, "truy vấn" ở slide 7, byte/N); riêng slide 15 giữ nguyên.

**F-06. Cần làm rõ. "Vì sao cần DBMS khi đã có Excel" chỉ ở ghi chú; phép tương ứng phần mềm không hiện.**
- Câu gốc: bảng slide 3 chỉ có Workbook -> Database, Sheet -> Bảng, dòng/cột -> bản ghi/thuộc tính (dòng 56). Bài 1.1 có thêm "Excel là phần mềm mở file -> phân biệt dữ liệu (database) với phần mềm (DBMS)" (Ghi nhớ của bài); ở slide chỉ có trong ghi chú slide 1 (dòng 25).
- Tác động: học viên chưa thấy "Excel : workbook = DBMS : database", nên "DBMS khác database ở đâu" chỉ dựa vào định nghĩa chữ. Đây là câu "để làm gì" đầu tiên của người mới.
- Đề xuất: thêm một hàng "Phần mềm Excel -> DBMS (SQL Server)" vào bảng slide 3.

**F-07. Cần làm rõ. Ranh giới `varchar` và `nvarchar`: chưa giải thích vì sao khóa học dùng `nvarchar`.**
- Câu gốc: "`varchar` cũng lưu Unicode khi dùng bảng mã UTF-8 phù hợp." (slide `varchar-va-nvarchar`, dòng 221) ngay sau câu khuyên `nvarchar` cho tiếng Việt.
- Căn cứ: đúng kỹ thuật và khớp bài 1.3, nhưng người học khó phản biện developer: "nếu varchar cũng lưu được thì tại sao chọn nvarchar?". Slide/bài chưa nói, ghi chú chỉ nói varchar phụ thuộc bảng mã.
- Tác động: mâu thuẫn bề mặt. Không sai.
- Đề xuất: một vế ("mặc định của khóa học và kiểu quen thuộc cho tiếng Việt; hệ khác có thể chọn UTF-8 `varchar`"), hoặc chấp nhận vì bài nguồn cũng vậy và ghi vào mục "bài sau".

## 3. PUBS (trọng tâm 3)

### Tọa độ crop (đã đối chiếu với ảnh)

Ảnh gốc `1-5-pubs-diagram.png` đúng 477x474 (Pillow), sha256 khớp `SOURCES.md` (`0dc91304...4a07`). Tôi vẽ khung `regions` lên bản 2x và cắt 5 vùng ra scratchpad:

| Vùng | Khung (x, y, w, h) | Kết quả |
|---|---|---|
| publishers | 18, 70, 118, 84 | Chứa trọn bảng (thanh tên + 5 cột `pub_id`...`country`); lẹm vài pixel dây chú thích "Primary key" bên trái |
| pub_info | 168, 239, 115, 56 | Chứa trọn bảng (`pub_id` có chìa khóa, `logo`, `pr_info`) |
| titles | 28, 259, 115, 140 | Chứa trọn 10 cột; `title_id` có chìa khóa, `pub_id` không có chìa khóa |
| stores | 314, 183, 114, 119 | Chứa trọn bảng; `stor_id` có chìa khóa |
| sales | 314, 307, 114, 98 | Chứa trọn bảng; ba chìa khóa ở `stor_id`, `ord_num`, `title_id` (khớp PK 3 cột) |

Kết luận: tọa độ đúng, nhãn `<code>` dưới mỗi crop đúng bảng. Hình còn xác nhận trực quan PK 3 cột của `sales` và `titles.pub_id` không phải PK. Hình học CSS (`zoom 2.1`, `--pubs-width` = 477*2.1) nhất quán; hai crop cạnh nhau (tối đa 505 px) nhỏ hơn cột trái (khoảng 528 px trên canvas 1280). Chưa kiểm hiển thị thật.

### Nhãn, alt, credit, license

- Credit hiển thị: "Microsoft Learn · ảnh gốc PUBS" + "MicrosoftDocs/data-tools · MIT" (liên kết LICENSE). Khớp `SOURCES.md` (Microsoft Corporation; MIT; thông báo ở `1-5-pubs-diagram-LICENSE.txt`, file có mặt). Credit hai ảnh Commons khớp SOURCES (Booyabazooka public domain; Friedland CC0). Bản làm việc của `relational-database-terms.svg` có sha256 khác SOURCES, nhưng sau khi chuẩn hóa xuống dòng thì khớp blob trong Git (`576314e2...`); đây là đuôi dòng CRLF khi checkout, không phải khác nội dung.
- Ảnh được nhúng nguyên, không vẽ lại, mọi liên kết trỏ về cùng một PNG: đúng spec.

### Khẳng định về khóa (đối chiếu bài 1.5 và `SOURCES.md`)

`pub_info.pub_id` vừa PK vừa FK; `titles.pub_id` nhận NULL; `sales` PK (`stor_id`, `ord_num`, `title_id`); FK `titles.pub_id -> publishers.pub_id`: slide khớp bài 1.5. Tôi không tải script `instpubs.sql` (không được phép) nên "nhận NULL/PK ba cột" dựa trên bài 1.5, `SOURCES.md` (ghi đã đối chiếu 03/11/2026) và hình (chìa khóa). `NhanVien.MaQuanLy` gắn đúng HRM_Demo, nêu rõ "không nằm trong PUBS" ở slide 25 và ghi chú; `ho-so-cong-ty.md` và `tests/db-schema.test.ts` xác nhận FK `NhanVien.MaQuanLy>NhanVien` và Giám đốc có MaQuanLy NULL.

### Findings PUBS

**F-08. Cần làm rõ. Crop không có đường/đầu đường và (với M:N) thiếu `titles`, nên hình không chứng minh điều chữ nói.**
- Câu gốc: slide `quan-he-mot-mot` hiển thị crop `publishers` + `pub_info`, nhưng chữ nói về khóa/đường; slide `quan-he-nhieu-nhieu` hiển thị `stores` + `sales`, nhưng chữ nói "qua bảng trung gian `sales`" giữa `stores` và `titles`.
- Căn cứ: trong ảnh, các đường quan hệ (publishers-pub_info, publishers-titles, stores-sales, titles-sales) và đầu chìa khóa/vô cực nằm ngoài mọi khung `regions`; `titles` không có trong crop của slide M:N. Ghi chú thừa nhận ("Cần quay lại ảnh đầy đủ để thấy đường từ sales sang titles"), nhưng thông tin này là phần cốt lõi: slide 21-22 dạy đọc đầu đường và slide 23 dạy bảng trung gian bằng hình không có đường và (slide 23) không có bảng thứ ba.
- Tác động: trên màn chiếu, học viên thấy hai hộp rời nhau; điều "hai phía là hai quan hệ một-nhiều" chỉ nằm trong lời nói. Crop vẫn có giá trị cho PK/NULL ở slide 24 (thấy chìa khóa ở `pub_info.pub_id`, không có ở `titles.pub_id`).
- Đề xuất: slide 23 thêm vùng `titles`, hoặc dùng ảnh tổng; slide 21-22 dùng ảnh tổng kèm chú thích đánh dấu hoặc crop bao đường nối. Nếu giữ crop thì sửa caption nói rõ "crop chỉ thấy bảng, không thấy đường".

**F-09. Cần làm rõ. Alt và lời mô tả ảnh tổng bỏ qua hai bảng có trong ảnh.**
- Câu gốc: `alt="Sơ đồ PUBS gốc của Microsoft: publishers, pub_info, titles, stores và sales; ..."` (`PubsFigure.astro` dòng 28); slide 20: "Ảnh PUBS của Microsoft mô tả xuất bản/bán sách".
- Căn cứ: ảnh có 7 bảng: thêm `employee` (nối `publishers`) và `discounts` (nối `stores`); cả slide và alt không nhắc, không nói "bỏ qua". Ảnh còn có nhãn tiếng Anh (Row selector, Primary key, Table title bar, Column name, One-to-many relationship, One-to-one relationship) mà slide không dịch/không nhắc.
- Tác động: alt không chính xác với ảnh; người học thấy hai bảng lạ không được giải thích. Bài 1.5 viết "mô tả một phần database mẫu PUBS"; slide bỏ cụm này.
- Đề xuất: thêm "chỉ đọc năm bảng này; `employee`, `discounts` bỏ qua" (một vế trong slide 20), sửa alt.

**F-10. Cần làm rõ. "Phía tham chiếu" mơ hồ ở slide một-một.**
- Câu gốc: "Chỉ khai báo FK chưa đủ tạo một-một; phía tham chiếu còn cần tính duy nhất bằng PK hoặc `UNIQUE`." (slide `quan-he-mot-mot`, dòng 382).
- Căn cứ: ý đúng là cột FK ở bảng con (`pub_info.pub_id`) phải duy nhất. Nhưng trong cùng bộ slide, "khóa được tham chiếu" (ghi chú slide 1:N, dòng 405; slide FK, dòng 353) chỉ bảng cha. "Phía tham chiếu" có thể đọc thành bảng cha (`publishers`), vốn đã duy nhất, khiến câu vô nghĩa. Bài 1.5 viết gọn hơn ("Thiết kế khác có thể dùng `UNIQUE`") và không dùng cụm này.
- Tác động: câu đúng nhưng dễ đọc ngược: người phản biện developer cần biết duy nhất nằm ở cột FK.
- Đề xuất: "cột FK (`pub_info.pub_id`) còn cần duy nhất, bằng PK hoặc UNIQUE".

## 4. Phạm vi, ngoại ý, DESIGN, test (trọng tâm 4)

### Đã xác minh

- Không đổi bài nguồn, seed, API, database: `git diff 46e9398 -- database src/pages src/content/lessons src/content/exercises` rỗng; trạng thái làm việc chỉ có các file đã nêu cộng 3 file untracked.
- Ghi chú không lọt trang chiếu: `dist/bai-giang/lam-quen/index.html` có 0 lần "Ý cần nói", 0 `data-presenter-notes`; trang người giảng có 25/25.
- Trang chiếu không import/mount progress store: xem mục 1. `docs/presentation-template.md` yêu cầu này được test outline bảo vệ.
- DESIGN.md: 2 đoạn đổi khớp với thực tế đã kiểm (25 slide, 50+10, thư viện ảnh, `PubsFigure`, alias, chuẩn hóa ID).

### Findings

**F-11. Biên tập. Slide cuối quá tải và ghi chú còn sót ví dụ cũ.**
- Câu gốc: slide `lan-duong-va-tu-tham-chieu` (dòng 444): ba đoạn gồm lần đường `stores -> sales -> titles`, "chốt mỗi dòng... trước khi đếm" và khái niệm tự tham chiếu `NhanVien.MaQuanLy`; ghi chú dòng 452: "Phòng nhân viên ở HRM_Demo là hiện lưu, không phải lịch sử chuyển phòng."
- Căn cứ: slide chứa hai chủ đề độc lập trong 3 phút trên một ảnh tổng; ví dụ tra phòng bị bỏ khỏi slide nhưng ghi chú vẫn nhắc "phòng nhân viên". Test cũ kiểm "hiện lưu" đã bị xóa cùng ví dụ nên không ai bắt.
- Tác động: người giảng đọc ghi chú không khớp slide; học viên nhận một khái niệm mới (tự tham chiếu) ở slide cuối cùng.
- Đề xuất: bỏ câu "Phòng nhân viên..." khỏi ghi chú hoặc đưa lại ví dụ; cân nhắc tách tự tham chiếu thành slide riêng nếu thời lượng cho phép (đổi tổng phút là quyết định của tác giả).

**F-12. Biên tập. Hai điểm hiển thị nhỏ.**
- (a) Bảng `ProjectionTable` ở slide 10-14 dùng tiêu đề mô tả ("Kiểu", "Giá trị", "Ý nghĩa", "Cách đọc", "Giữ điều gì") nhưng component bọc mỗi tiêu đề trong `<code>` (đã thấy trong HTML dist), nên chữ thường hiện kiểu mã, khác bảng tay ở các slide khác. Chưa xác minh hiển thị thật; có thể bỏ qua nếu chủ ý.
- (b) Slide 8, hàng "Giao dịch | Xử lý giao dịch đúng": điều kiện lặp lại chính khả năng (đối chiếu bài 1.2: "khi được lập trình và xử lý đúng"); hàng này không cho học viên điều kiện cụ thể nào.

**F-13. Biên tập. Test mới chặn đúng nhưng còn chỗ khóa cứng chữ hoặc thiếu bảo vệ.**
- Chặn đúng: 25 slide, 5 nguồn, 50/60 phút, 2-3 đoạn mỗi slide, ghi chú đủ ba mục và khớp nguồn/phút, 21 ID cũ, PUBS ở 6 slide cuối, điều kiện NULL/khóa, test state (alias, trùng ID chính, ID lạ, reload/share).
- Khóa cứng chữ vô ích hoặc lỏng: `toContain('vẫn có thể kết bảng')`, `toContain('luật kiểm khác')`, `/chưa chắc.*đúng ý/`, `['decimal(4,1)', 'float', 'ba', 'một']` (hai từ cuối gần như luôn khớp). Quy ước 4.6 nói tránh khóa chữ khi chỉ đổi cách diễn đạt.
- Thiếu bảo vệ: không test nào kiểm `PubsFigure` (tọa độ nằm trong 477x474, kích thước zoom, credit/license/alt có mặt); test 21 ID chỉ chứng minh mỗi ID phân giải ra một slide, không chứng minh đúng chủ đề (việc đó chỉ nằm ở bảng ánh xạ của tác giả); test cũ về `HopDong.MaNV`/ví dụ tra phòng bị xóa nhưng nội dung thay bằng PUBS đã có test tương ứng (chấp nhận).
- Đề xuất: giữ nguyên các test đúng; thay các khóa chữ bằng kiểm ý nghĩa; thêm một test nhỏ cho `regions` hoặc cho credit PUBS nếu muốn.

**F-14. Cần cắt. CSS thừa và tài liệu lệch nhẹ.**
- CSS thừa: `.foundation-layout + p`, `.projection-body .foundation-table + p`, `.projection-body .foundation-editions + p, .foundation-editions ~ p` (`presentation.css` dòng 191, 199, 201). Dist: không có `<p>` đứng ngay sau `.foundation-layout` hoặc `.foundation-table` (mọi `<p>` nằm trong `.foundation-copy`). Rule `.foundation-editions + p` không tác dụng nên chữ 28px ở slide edition đến từ `.foundation-copy p`.
- DESIGN.md: đoạn typography cũ vẫn ghi "body at 32px... captions 24px"; bố cục `foundation` dùng chữ 28px cho đoạn, 24px cho bảng edition, 18px cho credit. Chưa kiểm hiển thị, nên chỉ ghi nhận sai lệch tài liệu.
- DESIGN.md nói component cũ "remain available to other consumers"; hiện `ConceptFigure.astro` không còn nơi nào dùng (chỉ test chặn `import`), `ProjectionRelation.astro` còn có test riêng.
- `src/assets/presentations/SOURCES.md` dòng 3 vẫn nói credit "nằm trong HTML của slide `cac-mo-hinh-luu-tru`": slide đó giờ là alias, và credit của `relational-database-terms.svg` ở slide `bang-dong-cot`. Hai ảnh vẫn đúng giấy phép; chỉ lời dẫn lệch.

## 5. Mục để tác giả kết luận (đã cân nhắc, chưa kết luận hoặc ngoài phạm vi)

1. `du-lieu-trong-database` ("Mở database nhân sự ra xem": ba nhóm thông tin lưu riêng trong một database) hiện là alias của `bang-dong-cot`. `thong-tin-o-nhieu-bang` ("Dữ liệu chung và thông tin tách bảng") sát nội dung hơn. Cả hai bào chữa được; tôi không kết luận sai. Lý do: slide cũ không còn để đối chiếu hình, chỉ có đoạn chữ.
2. `ky-hieu-erd` (cũ: "Quay lại ERD: đọc từ cả hai phía", nói PK/FK, 1/∞ và `HopDong.MaNV` bắt buộc) hiện là alias của `so-do-quan-he-erd` (ký hiệu). Phần "từ cả hai phía" nay ở `quan-he-mot-nhieu`. Giữ nguyên hợp với tên ID (ký hiệu); nếu ưu tiên ý "hai phía" thì đổi đích. Chưa kết luận.
3. `ten-phong-cua-nv001` và `hop-dong-kem-ten-phong` (cũ: tra tên phòng NV001; hợp đồng kèm phòng qua ba bảng) giờ đến slide PUBS cuối. Quyết định đã duyệt và kỹ năng (lần đường qua cặp mã) giữ lại; nhưng nội dung đích không còn nhắc `NhanVien.MaPB -> PhongBan.MaPB` hay `HopDong`. Rủi ro: người mở link cũ thấy ví dụ khác lĩnh vực. Chưa coi là lỗi.
4. Bấm vào ảnh (liên kết `<a href=png>` không `target`) rời trang chiếu; chưa xác minh trạng thái quay lại (`?slide=...` còn trong lịch sử). Mẫu này có sẵn từ bộ cũ cho ảnh khác. Ngoài phạm vi diff; cần trình duyệt.
5. `?slide=` luôn ưu tiên hơn `#hash`, kể cả khi `?slide=` không khớp: `?slide=unknown#old-alias` -> slide đầu (test khóa hành vi này). Hành vi có từ trước; không đổi. Có nên rơi về hash không là quyết định tác giả.
6. Không có xử lý `hashchange` sau khi trang đã nạp (người dùng sửa hash trên trang đang mở). Có từ trước với ID chính; alias thừa hưởng. Không đưa vào phạm vi.
7. Alias không-JS: span nằm dưới tiêu đề `h2`, nên cuộn tới alias hạ cánh dưới tiêu đề (ID chính cuộn tới đầu slide). Chưa xác minh trong trình duyệt; tác động nhỏ.
8. Bài nguồn 1.2 dòng 64 ghi "giao dịch ở bài 5.5" và 1.4 hứa "UNIQUE xử lý NULL ở bài 5.2" trong khi 5.2 chưa dạy: ngoài phạm vi vì đã cam kết không sửa bài nguồn; báo tác giả.
9. Ảnh tổng ở slide 20 và 25 cao 350 px trên canvas 1280 (tỉ lệ 0,74 so với ảnh gốc 474 px). Chữ tên cột trong ảnh gốc nhỏ; tôi chưa xác minh đọc được khi chiếu (chữ cao xấp xỉ 8 px logic). Cần mở trình duyệt/máy chiếu.
10. Bảng edition SQL Server 2025 (Express/Standard/Enterprise/Developer/Evaluation) và các thuộc tính cột HRM_Demo (`MaPB NOT NULL`, `HoTen nvarchar(100) NOT NULL`, `SoCCCD` kiểu chuỗi, `MaQuanLy` nhận NULL, `HopDong.MaHD`): tôi không tự xác minh. Edition cần Microsoft Learn (không tải), HRM_Demo cần `database/HRM_Demo.sql` (không được đọc). `tests/db-schema.test.ts` chỉ bảo vệ PK/FK, không bảo vệ nullable; hồ sơ công ty nói Giám đốc có `MaQuanLy` NULL. Đề nghị tác giả giữ bằng chứng đối chiếu ở hồ sơ kiểm của lượt.
11. 25 slide cho 50 phút, mỗi slide 2-3 đoạn: tải nhận thức/thời lượng thực tế chưa kiểm (không có buổi giảng thử).

## 6. Ưu tiên

| Mức | Mã | Việc |
|---|---|---|
| Cần sửa (3) | F-01 | Link PL.1/PL.2 tương đối hỏng ở trang người giảng; `check:dist` không bắt |
| | F-02 | Ghi chú "5.5" cho giao dịch (đúng là 5.4) |
| | F-03 | "cách kiểm NULL học ở bài 5.2" hiện trên màn, sai nghĩa và bài đích không dạy |
| Cần làm rõ (7) | F-04 | Điều kiện đọc ngày chỉ trong ghi chú |
| | F-05 | Thuật ngữ dùng trước khi định nghĩa (HRM_Demo, truy vấn, byte, N, kết bảng...) |
| | F-06 | Phép Excel(phần mềm) : DBMS chỉ trong ghi chú |
| | F-07 | Vì sao dùng `nvarchar` khi `varchar` UTF-8 cũng được |
| | F-08 | Crop không có đường; M:N thiếu `titles` |
| | F-09 | Alt/nội dung ảnh tổng bỏ `employee`, `discounts`, nhãn tiếng Anh |
| | F-10 | "Phía tham chiếu" mơ hồ ở slide một-một |
| Biên tập (3) | F-11 | Slide cuối quá tải; ghi chú sót ví dụ cũ |
| | F-12 | Tiêu đề ProjectionTable hiện dạng code; hàng "Giao dịch" lặp ý |
| | F-13 | Test: khóa chữ lỏng/cứng, thiếu test cho PubsFigure |
| Cần cắt (1) | F-14 | CSS thừa; DESIGN/SOURCES lệch nhẹ |
| Giữ được | Mục 1, 3 | 21 ID cũ, chuẩn hóa/ưu tiên/fallback/chia sẻ, protocol, tọa độ crop, credit/license, khóa PUBS, phạm vi, ghi chú không lọt HTML, thời lượng 50/10 và 10/8/10/9/13 |

Không có finding nào cho phần chuẩn hóa URL/protocol/progress: đó là kết quả hợp lệ.

## 7. Nguồn và giới hạn

- Nguồn đã đọc (tuyệt đối): `D:\lam.nguyen\Projects\microsoft-sql-lession\...` các file kể ở mục 0; ảnh `src/assets/lessons/1-5-pubs-diagram.png`; HTML dist và bundle JS; tiêu đề lesson/appendix bằng `grep`.
- Kiểm của riêng tôi: vitest 3 file (21 test đạt), script Python đọc HTML dist, script Pillow tạo bản cắt/khung tạm trong scratchpad (ngoài repo).
- Chưa xác minh (cần browser, trình chiếu hay nguồn ngoài): bố cục/tràn chữ/độ đọc được của ảnh tổng và crop (mờ khi phóng 2,1x), bàn phím, hai cửa sổ đồng bộ, hành vi cuộn tới alias không-JS, bấm vào ảnh rời trang, nội dung edition/PUBS trên trang Microsoft, schema HRM_Demo ngoài PK/FK, kết quả build/`check`/`check:dist`, tải thật của buổi 50 phút.
- Căn cứ phân loại: "có căn cứ" gồm F-01, F-02, F-03, F-08 (phần tọa độ/đường nối), F-09, F-10 (đọc nguồn + so bài + HTML/ảnh); F-04..F-07, F-11..F-14 là đánh giá về độ rõ/biên tập, không phải kiến thức sai.
