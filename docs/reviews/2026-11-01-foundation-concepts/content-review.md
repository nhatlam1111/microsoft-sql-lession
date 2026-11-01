# Review nội dung độc lập — Làm quen SQL Server

## Phạm vi, phiên bản và cách kiểm

- Ngày: 01/11/2026. Vai học thử: Business Consultant muốn đủ hiểu SQL Server để trao đổi và phản biện yêu cầu; chỉ biết Excel văn phòng cơ bản, đã học nhưng có thể quên phần SQL.
- Model: **kế thừa model của phiên**, không chỉ định model khác. Công cụ thực tế: PowerShell qua `exec_command`, `rg`, Git chỉ đọc, Python `html.parser` để đọc HTML, `view_image` để xem ba ảnh nguồn. Không dùng browser, SQL, API hoặc agent khác.
- Nguồn chính: `src/content/presentations/lam-quen.mdx`, toàn bộ 18 slide và 18 ghi chú; `ConceptFigure.astro`, `ProjectionTable.astro`, `ProjectionRelation.astro`, `Slide.astro`, `PresenterNotes.astro` trong `src/components/presentations/`.
- Đã đọc `AGENTS.md`, `docs/quy-uoc.md` (gồm 4.5, 4.7), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, bài 1.1–1.5, bài mẫu 2.1 và thiết kế đã duyệt `docs/superpowers/specs/2026-11-01-foundation-concepts-presentation-design.md`. Không đọc report khác hoặc kết luận kiểm của tác giả.
- Commit nền được xác nhận bằng `git rev-parse HEAD`: `120b727a45ba8c01a50b08080d128d3740507ab8`. Trong lúc review, người giao cập nhật working tree. Bản chốt nội dung đã đối chiếu có các delta: rút câu slide 2; slide 8 dùng “Ba hợp đồng cùng ghi MaNV = NV021 để nhắc tới hồ sơ”; slide 9 giải nghĩa ngay “ràng buộc”; bỏ dòng trắng cuối file. `git diff` của năm component được giao không có thay đổi so với commit nền. Report áp dụng bản working tree này, không gọi nó là nguyên trạng commit nền.
- HTML đã đọc: `dist/bai-giang/lam-quen/index.html` và `dist/bai-giang/lam-quen/nguoi-giang/index.html`, lần đối chiếu cuối có thời gian file **2026-11-01 17:04:21**. Đã đọc đủ nội dung bản build trước đó, rồi đối chiếu lại các delta 2/8/9 và các slide khóa trên build mới. Hai bản có cùng nội dung hiển thị của 18 slide, tổng `data-minutes` là 48; audience có 0 khối ghi chú, presenter có 18; cả hai không có `data-answer`. Bảy phút hỏi đáp được ghi ở notes slide 18, khớp tổng 55 phút của metadata. Đây là kiểm nội dung/markup, không phải kiểm giao diện chạy thực tế.
- Quyết định giữ: 18 slide giảng lại bằng hình và 2–3 câu cốt lõi hiển thị; ví dụ nhân sự mở dần; một `SELECT` chỉ để minh họa; không thêm bài tập, bốn câu đố hay khung bài đầy đủ.

## Kết luận nội dung

Mạch database → phần mềm/ngôn ngữ/công cụ → bảng → nhu cầu dùng mã → PK/FK → ERD đi được bằng cùng ví dụ nhân sự. Chưa thấy câu khẳng định sai nào có đủ căn cứ trong phạm vi nguồn đã đọc. Hai góp ý dưới đây là một điều kiện cốt lõi còn nằm riêng trong notes và một cách đọc ký hiệu nên nhắc tại chỗ; không phải kết luận rằng SQL hoặc dữ liệu live sai.

### F1 — Cần làm rõ: điều kiện nhận NULL của cột vẫn chỉ ở ghi chú

- **Vị trí/câu gốc:** `src/content/presentations/lam-quen.mdx:219`: “khi FK đang bật, lúc ghi dữ liệu mã khác NULL phải có trong danh mục”. Slide 16 tại dòng 271 chỉ nói “1 ở phía một và ∞ ở phía nhiều” và “ký hiệu không bắt mọi phòng phải có người”.
- **Phần chỉ có trong notes:** dòng 227: “Luật nhận NULL thuộc thiết kế cột; MaPB trong bộ mẫu không nhận NULL. Một FK khác có thể nhận NULL.” Dòng 279 mới giải thích vì sao mỗi hồ sơ trong mẫu tìm được một phòng. HTML audience không chứa hai lời giải này, đúng theo cơ chế tách notes.
- **Câu hỏi người học còn vướng:** “Nếu FK chỉ kiểm mã khác NULL, vậy cột mã phòng này có được để NULL không? Nhìn ký hiệu 1 đã đủ kết luận hồ sơ nào cũng có phòng chưa?” Màn chiếu chưa trả lời phần đầu; phía một–nhiều mới được giải thích từ phía phòng.
- **Tác động/căn cứ:** người quên bài cũ có thể coi NULL luôn được FK cho phép, hoặc đọc ký hiệu `1` thành điều bắt buộc cho mọi thiết kế. Đây là **thiếu điều kiện hiển thị**, không phải mệnh đề FK hiện có sai. Bài 1.4 tại dòng 30 và bài 1.5 tại dòng 39 nêu đúng điều kiện `MaPB` không nhận NULL; thiết kế của bộ slide cũng yêu cầu giữ điều kiện này trên màn chiếu.
- **Sửa nhỏ:** thêm câu thứ ba ở slide 13: “Việc nhận NULL do thiết kế cột quy định; MaPB ở đây không nhận NULL.” Khi giảng ký hiệu ở slide 16, có thể đổi một vế để nối rõ “ở mẫu này mỗi hồ sơ tìm được một phòng”. Không cần thêm ví dụ hoặc một slide về NULL.
- **Ưu tiên:** nên xử lý trước khi chốt nội dung giảng lại.

### F2 — Biên tập: nhắc cách đọc `bảng.cột` tại lần đầu xuất hiện

- **Vị trí/câu gốc:** `src/content/presentations/lam-quen.mdx:167`: “Khi NhanVien.MaNV được khai báo là khóa chính (PK)…” Đây là lần đầu lời giảng hiển thị dùng dạng tên có dấu chấm; dạng này trở thành chỉ dẫn chính khi đọc hai chặng ERD ở dòng 308.
- **Tác động/căn cứ:** người quên quy ước có thể nhìn `NhanVien.MaNV` như một tên riêng dài, thay vì hiểu nó xác định cột trong bảng nào. Bảng ở slide 9 giúp suy ra nên mức vướng thấp; không phải thiếu kiến thức về PK. Bài 1.3 dòng 30 đã có lời đọc này, nhưng lần giảng lại không nên phải dựa vào việc còn nhớ bài đó.
- **Sửa nhỏ:** ngay ở slide 10 viết “Khi cột MaNV của bảng NhanVien (NhanVien.MaNV) được khai báo…”; giữ nguyên hai câu và phần còn lại. Không cần giải thích cú pháp SQL.
- **Ưu tiên:** biên tập ngắn trong vòng sửa hiện tại, sau F1.

## Rà theo thứ tự 18 slide

Trong bảng dưới, vị trí dòng thuộc `src/content/presentations/lam-quen.mdx`; những câu trích là lời giảng hiển thị hoặc caption, trừ khi ghi rõ notes.

| Slide / vị trí | Câu hỏi tự đặt và bằng chứng trong bài | Đánh giá |
|---|---|---|
| 1 — Database, dòng 19–31 | Database là gì, để làm gì? “Tập dữ liệu có cấu trúc”, “nhiều người cùng dùng theo quyền”, ví dụ hồ sơ/phòng/hợp đồng ở nguồn chung trả lời được. Hình có caption khái niệm, không giả làm ảnh hệ thống thật. | **Giữ được.** Không hứa dữ liệu tự đúng hoặc tuyệt đối hóa Excel. Lý do giảm lệch bản sao là phần mở rộng hợp lý trong notes. |
| 2 — Dữ liệu bên trong, dòng 34–47 | Có những nhóm thông tin nào? Hình mở ba bảng, có tên Việt, ví dụ mã và giá trị; lời văn rút gọn hiện tại nói rõ chức năng mỗi bảng. | **Giữ được.** Hình chỉ hiện hai hợp đồng, không nói đó là toàn bộ; không lấy hai dòng trích làm căn cứ bác ba hợp đồng ở slide 8. |
| 3 — SQL Server, dòng 50–62 | Phần mềm khác máy chủ ở đâu, dùng để làm gì? Câu định nghĩa phần mềm Microsoft và vế giải thích máy chủ/kiểm quyền/luật đã khai báo trả lời được. | **Giữ được.** Caption nói hình chỉ minh họa quản lý; không đánh đồng SQL Server với cửa sổ hoặc phần cứng. |
| 4 — SQL, dòng 65–77 | SQL là gì, ai thực hiện yêu cầu? Định nghĩa ngôn ngữ và truy vấn có ngay trên màn chiếu; câu tiếng Việt đặt cạnh `SELECT HoTen FROM NhanVien;`, bên dưới nêu SQL Server xử lý. | **Giữ được.** Kết quả ghi “trích”, nhắc thứ tự có thể khác. Không cần dạy cú pháp trước vì không giao viết/chạy câu này. Câu chỉ đọc là minh họa hợp phạm vi. |
| 5 — Bốn vai trò, dòng 80–93 | Tôi dùng thứ gì để gửi yêu cầu, đóng cửa sổ thì sao? Sơ đồ SSMS → SQL → SQL Server → database và hai câu diễn giải phân vai rõ; chiều kết quả trả ngược được ghi ở caption. | **Giữ được.** Không buộc người học cài hay tự kết nối SSMS trong buổi này. |
| 6 — Bảng, dòng 96–111 | Bảng là gì, hàng tên cột có phải hồ sơ? Hai câu trả lời trực tiếp; bảng trích ghi rõ ba cột/hai hồ sơ. | **Giữ được.** Phần không gộp ô nằm trong notes là mở rộng, không phải định nghĩa bị giấu. |
| 7 — Dòng và cột, dòng 114–129 | Một dòng là gì, có luôn là một người không? Định nghĩa gắn `NhanVien`, rồi đối chiếu mỗi dòng `HopDong` là một hợp đồng. | **Giữ được.** Component có đánh dấu toàn dòng/toàn cột và caption nêu màu tương ứng; chưa xác minh màu thực trên màn hình. |
| 8 — Nhiều bảng, dòng 132–145 | Tại sao không giữ hết ở một bảng? Hình một hồ sơ/ba hợp đồng và câu “Thông tin hồ sơ được giữ ở một nơi, giảm việc lặp và sửa sót” trả lời được. Bản mới dùng “nhắc tới hồ sơ”, dễ đọc hơn thuật ngữ thuần túy. | **Giữ được.** Phân biệt số hồ sơ với số hợp đồng; ba mã hợp đồng được trình bày là dữ liệu trích. Chưa kiểm live các mã này. |
| 9 — Nhận diện hồ sơ, dòng 148–161 | Vì sao cần mã, đặt tên cột mã đã đủ chưa? “Họ tên có thể trùng hoặc thay đổi” và “ràng buộc, tức luật để SQL Server kiểm dữ liệu” hiện tại trả lời ngay. | **Giữ được.** Không dựng thêm hai người trùng tên hoặc nói mã chứng nhận danh tính thật. |
| 10 — PK, dòng 164–177 | Luật PK làm gì và không làm gì? Có điều kiện “khi … được khai báo”, không trùng/không NULL, giới hạn hai hồ sơ khác mã của một người. Hình chỉ nói “Qua luật duy nhất của PK”. | **Giữ được về kiến thức; F2 biên tập.** Không hứa mã mới qua mọi luật, không nói PK tự sinh mã. NULL đã có nghĩa ngắn tại đây. |
| 11 — Không PK, dòng 180–193 | Thiếu PK thì bảng có còn dùng được không, rủi ro gì? “Vẫn lưu và đọc được” và “Nếu không có luật khác chặn” trả lời đầy đủ. | **Giữ được.** Caption giả định và hình so sánh riêng không giả rằng schema thật vừa bị bỏ PK; không khẳng định thiếu PK thì chắc chắn đang trùng. |
| 12 — Mã phòng, dòng 196–213 | Mã giúp lấy tên thế nào, mã không khớp thì sao? Hai bảng có tên/cột rõ; `NV001`/`KT`/`Kế toán` được dò bằng cùng mã. | **Giữ được.** Nhu cầu kiểm tham chiếu xuất hiện trước định nghĩa FK, đúng mạch “vì sao”. |
| 13 — FK, dòng 216–229 | FK kiểm điều gì, vì sao nhiều hồ sơ được cùng phòng? Lời giảng giải thích mã có trong danh mục, cho phép nhiều hồ sơ dùng cùng mã và không phát hiện gán nhầm mã có thật. | **Cần làm rõ theo F1.** “FK đang bật” đã hiện, nhưng khả năng nhận NULL của cột và điều kiện mẫu chưa hiện. |
| 14 — Không FK, dòng 232–245 | Thiếu FK có cấm lấy dữ liệu qua hai bảng không? Có giả định “không có luật kiểm khác”; định nghĩa kết bảng bằng việc so khớp và phân biệt với luật kiểm dữ liệu. | **Giữ được.** Hình riêng, ghi giả định; không xóa nhãn khóa của schema thật để minh họa. Không đòi người học biết JOIN trước câu này. |
| 15 — ERD, dòng 248–263 | Hộp/đường biểu diễn gì, có phải bảng kết quả không? Hai câu định nghĩa cấu trúc và giới hạn sơ đồ của khóa học vẽ FK đã khai báo trả lời được. | **Giữ được.** Nhãn PK/FK đã được giảng; không hứa mọi quan hệ nghiệp vụ đều xuất hiện. |
| 16 — Ký hiệu, dòng 266–281 | `1`/`∞` có phải số người thực tế hoặc bắt phòng có người? Câu thứ hai trả lời không bắt phòng có người. | **Giữ được phần phía phòng; nối F1.** Phần đọc từ phía hồ sơ và điều kiện không NULL hiện chỉ ở notes. Không coi ký hiệu vô cực là số lượng thật. |
| 17 — Hai bảng, dòng 284–300 | Bắt đầu đâu, qua cặp cột nào, lấy gì, phòng thời điểm nào? Trace `NV001 → MaPB = KT → TenPB = Kế toán`, caption cặp cột và lời giảng tuần tự đủ theo đường đi. | **Giữ được.** “Tên phòng hiện lưu” và “không tự khôi phục … quá khứ” đã ở màn chiếu, không giấu điều kiện lịch sử trong notes. |
| 18 — Ba bảng, dòng 303–318 | Lấy tên phòng cho hợp đồng thì cần hai chặng nào, mỗi dòng nghĩa gì? Lời giảng nêu đủ `HopDong.MaNV → NhanVien.MaNV`, rồi `NhanVien.MaPB → PhongBan.MaPB`, cuối cùng đọc tên; ba hợp đồng vẫn là ba dòng. | **Giữ được.** Không biến đơn vị dòng thành người, không gọi phòng hiện lưu là phòng lúc ký. Lý do hai chặng đi tới khóa duy nhất có thể được nhắc thêm bằng lời giảng sau khi hoàn thiện F1. |

## Tiền đề câu hỏi, bài tập và thuật ngữ dùng trước định nghĩa

**Bộ này không có bài tập, YAML, câu hỏi kiểm tra riêng hoặc yêu cầu thực thi.** Vì vậy không có đề/đáp án để đối chiếu hay điều kiện nộp bài cần kiểm. Không lấy câu hỏi miệng tùy chọn trong notes làm lời giảng còn thiếu.

| Hoạt động thực sự có trong bộ | Tiền đề cần | Đã có ở đâu / còn thiếu |
|---|---|---|
| Đọc yêu cầu và câu SELECT minh họa ở slide 4 | SQL là ngôn ngữ; yêu cầu lấy dữ liệu là truy vấn; nhận ra họ tên là kết quả cần | Định nghĩa và câu tiếng Việt ngay slide 4; tên bảng đã xuất hiện slide 2. Không cần biết SELECT/FROM để làm bài vì không có bài phải viết/chạy. |
| Chỉ bảng/dòng/cột ở slide 6–7 | Nhận ra khung dữ liệu, đọc nhãn và giá trị như bảng Excel | Slide 6–7 định nghĩa hiển thị. Từ “bảng” đã được dùng ở slide 1–2; “cột” xuất hiện ở slide 4 trước phần định nghĩa. Đây là giới thiệu tổng quan rồi phóng to, không tạo tiền đề làm bài bị thiếu. |
| Hiểu cùng NV021 xuất hiện ở ba hợp đồng | Biết mỗi bảng lưu loại thông tin gì và mỗi dòng là gì | Slide 2, 6–8, có một hồ sơ và ba mã hợp đồng cạnh nhau. Bản hiện tại giải thích bằng “nhắc tới”, không buộc biết từ “tham chiếu” trước. |
| So sánh có/không PK và FK | Luật dữ liệu; mã; NULL; vai trò PK/FK | Luật ở slide 3/9, mã ở 8–9, PK/NULL ở 10, FK ở 13; giả định không có luật khác ở 11/14. Phần NULL phụ thuộc thiết kế cột còn thiếu ở audience: F1. |
| Đọc nhãn và cặp cột trên ERD ở 15–18 | Bảng/dòng/cột, PK/FK, cách đọc `bảng.cột`, một–nhiều | Các khái niệm chính đã có trước. `bảng.cột` bắt đầu slide 10 nhưng không có lời đọc tại chỗ: F2; bài 1.3 đã dạy, song bộ giảng lại đang dựa vào ký ức đó. |
| Theo đường hai/ba bảng và giữ đúng đơn vị dòng | Mã dùng để tìm dòng; cặp cột; mỗi dòng thuộc bảng xuất phát; phòng hiện lưu | Slide 8/12 đặt ví dụ cụ thể, 16 nêu phía nhiều, 17/18 nêu cặp cột và kết luận. Điều kiện mẫu có phòng bắt buộc nên đưa ra theo F1; không thiếu cú pháp JOIN vì chưa yêu cầu viết. |

“Ràng buộc” ở slide 9 đã được giải nghĩa ngay trong bản working tree cuối; “PK”, “FK”, “ERD”, “truy vấn”, “kết bảng” đều có nghĩa tiếng Việt trước khi dùng làm chỉ dẫn. Không cần thêm bài kiểu dữ liệu, khóa ghép, cơ chế index hoặc cú pháp khai báo luật vào phạm vi này.

## Component, dữ kiện và giới hạn bằng chứng

- **ConceptFigure:** hình `database`/`split` phân nhóm dữ liệu nhất quán; hai hình không khóa dùng caption giả định và hình so sánh riêng. Hình PK nói qua **luật duy nhất**, hình FK nói qua **luật tham chiếu**, tránh đồng nhất qua một luật với lưu được mọi trường hợp. Điều kiện “không có luật khác” có trong lời giảng cùng slide.
- **ProjectionTable:** cấu trúc `thead`/`tbody`, caption trích và đánh dấu dòng/cột phù hợp lời giảng. Hai hồ sơ ở hình không bị coi là toàn bộ `NhanVien`.
- **ProjectionRelation:** nhãn và cặp cột hiện trong HTML; thứ tự hai đầu `∞ → 1` hoặc `1 ← ∞` tương ứng thứ tự bảng đang vẽ. Caption ghi rõ cặp `bảng.cột`. Component lấy schema để tạo nhãn, nhưng tôi **không đọc script schema/seed** và không xác nhận metadata database live. Hình này không được dùng cho hai giả định đã bỏ khóa.
- **Slide / PresenterNotes:** mỗi slide có nguồn và thời lượng; ghi chú đủ ý cần nói/hiểu nhầm/giải thích. HTML audience không chứa notes, nên điều kiện chỉ có ở notes không thể được tính là đã giảng trên màn chiếu. Điều này là căn cứ F1, không phải lỗi component tách notes.
- **Đối chiếu công ty:** tên/mã của `NV001`, `NV021`, `KT`, `IT`, `Kế toán` khớp hồ sơ công ty; thông tin NV021 có ba hợp đồng và công ty không lưu lịch sử chuyển phòng khớp bài nguồn/hồ sơ. Chưa kiểm live ba mã hợp đồng trong hình hay kết quả thực tế của SELECT; không kết luận chúng sai vì chưa chạy.
- **Đã xem:** ba ảnh raster nguồn database/phần mềm/SQL bằng `view_image`; đều là ảnh khái niệm, không mang số liệu chi tiết để giả làm kết quả thật. HTML giữ caption mô tả đúng vai trò đó. Chữ đậm/tên bảng/cột/giá trị trong lời giảng dùng markup phù hợp; không thấy backtick hoặc escape lộ trong nội dung HTML đã trích.
- **Chưa xác minh:** layout 16:9, tràn khung, cỡ chữ nhìn từ xa, màu và tương phản, điều hướng/bàn phím, đồng bộ cửa sổ người giảng, no-JS, copy link, hành vi tiến độ hoặc thao tác thật trong SSMS. Đọc HTML không thay các kiểm này. Không chạy lại test/build; không dùng log kiểm của tác giả để báo đạt.
- Không truy cập database, API, runner, secret, tài liệu SQL ngoài khóa học hoặc report khác; không sửa sản phẩm, Git, spec hay plan. Chỉ ghi report này.

## Ưu tiên bàn giao

1. **F1 — Cần làm rõ:** đưa điều kiện nhận NULL của cột và điều kiện mẫu ra màn chiếu, rồi nối với cách đọc một–nhiều. Không cần thay mạch hay thêm slide.
2. **F2 — Biên tập:** thêm cách đọc `bảng.cột` bằng một vế tại slide 10.
3. **Giữ được:** các định nghĩa còn lại, lý do tách bảng, nhu cầu dùng PK/FK, tính tùy chọn có điều kiện của chúng, giới hạn hợp lệ/đúng nghiệp vụ, phòng hiện lưu và hai đường ERD. Không có đề thực hành cần kiến thức bổ sung; nhận xét này không xác nhận SQL/UI đã chạy đúng và không phải quyền push/deploy.
