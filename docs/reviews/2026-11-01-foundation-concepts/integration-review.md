# Review tích hợp — bài giảng Làm quen theo khái niệm

Ngày 01/11/2026. Công cụ: Codex; model **kế thừa model của phiên**. Ngữ cảnh review mới, không tham gia viết sản phẩm và không phân tiếp cho agent khác.

## Phạm vi, phiên bản và phương pháp

- Review tích hợp vòng 20 → 18 slide: `src/content/presentations/lam-quen.mdx`, `src/components/presentations/ConceptFigure.astro`, `src/styles/presentation.css`, các test trình chiếu và các owner liên kết/progress có liên quan. Base `b2e4c3cd0d9c2d1a22a05b6820affc5c07295e75`; tự chạy `git rev-parse HEAD` xác nhận source `9c3411511c13453bcc70566ef427b3210f4aa592`. Working tree sạch lúc đối chiếu source. Tác giả có thể cập nhật hồ sơ kiểm trong khi lượt review này diễn ra; các cập nhật đó không được coi là thay source sản phẩm đã review.
- Đã đọc `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, `DESIGN.md`, `docs/presentation-template.md`, bài 1.1–1.5 và mẫu 2.1; đọc thiết kế/plan ngày 01/11/2026, diff base/head và đủ 18 slide, gồm toàn bộ notes. Áp dụng frontend-design cùng frontend-design-premium cho phần CSS/nhất quán giao diện, ưu tiên hợp đồng repo và phạm vi chỉ review.
- Build đã đọc: `dist/bai-giang/lam-quen/index.html` và `dist/bai-giang/lam-quen/nguoi-giang/index.html`, lần build tác giả ghi 17:11:22; timestamp filesystem khi đọc là 17:11:21. Tự đối chiếu toàn bộ 36 đoạn lời giảng hiển thị: không có đoạn khác source. Văn bản 18 slide audience/presenter giống nhau khi bỏ notes. Không dùng build cũ để kết luận về các sửa NULL/cách đọc `bảng.cột`.
- Tự thực hiện: đọc source/HTML, phân tích HTML bằng Python, chạy test Vitest liên quan và `check:dist`, xem sáu ảnh evidence của tác giả bằng `view_image`. Không mở browser, không thao tác clipboard/storage, không chạy SQL/API/runner, không đọc secret, seed hay `database/HRM_Demo.sql`, không mở helper kết nối database. Script Python đọc HTML lần đầu vấp encoding stdout Windows; chạy lại với stdout UTF-8 thành công. Đây là lỗi công cụ kiểm, không phải lỗi sản phẩm.
- Được giao đọc `verification.md`, `decisions.md`, `content-review.md` và evidence trong `temp/verification/2026-11-01-foundation-concepts/`. Các kiểm SQL/browser do tác giả thực hiện được ghi riêng bên dưới, không tính là tôi tự chạy.

## Kết luận và nhận xét cần xử lý

Mạch database → phần mềm/ngôn ngữ/công cụ → bảng/dòng/cột → nhu cầu dùng mã → PK/FK → ERD nhất quán với các bài nguồn. Bản hiện tại đã đưa điều kiện NULL và cách đọc `bảng.cột` ra lời giảng; không cần người học nhớ bài 1.3 để hiểu đường ERD. Chưa thấy sai kiến thức mới nào có đủ căn cứ trong phạm vi được đọc. Có hai chỗ biên tập tích hợp nhỏ dưới đây; không phải kết luận SQL, đồng bộ hoặc layout đã sai.

### I1 — Cần sửa: hướng dẫn no-JS vẫn yêu cầu mở đáp án không tồn tại

- **Vị trí/câu gốc:** `src/components/presentations/PresentationShell.astro:38`: “Mở ‘Lời giải’ để xem đáp án.” Câu này có nguyên văn trong `noscript` của cả hai HTML build.
- **Căn cứ:** bộ mới chủ đích không có câu đố; source và hai HTML đều có **0 `data-answer`**. Người đọc bản liên tục không có mục “Lời giải” nào để mở. Đây là câu của shell cũ chưa còn phù hợp sau đổi nội dung, dù file shell không đổi trong diff.
- **Tác động:** người dùng bản không JavaScript có thể tìm một thao tác không có và nghĩ nội dung chưa tải đủ. Họ vẫn đọc được 18 slide, nên mức ảnh hưởng thấp.
- **Đề xuất:** bỏ câu hướng dẫn mở lời giải khỏi thông báo chung, hoặc chỉ hiện khi bộ thực sự có đáp án. Giữ thông báo bản liên tục và cách bật chế độ chiếu. Đối chiếu lại HTML/no-script fixture; không cần sửa protocol đồng bộ.

### I2 — Biên tập: phân bổ 48 + 7 phút chưa có ở phần mở đầu

- **Vị trí/câu gốc:** `docs/presentation-template.md:44` yêu cầu “ghi rõ cách phân bổ trong slide mở đầu”. `lam-quen.mdx:19–31` mở thẳng bằng định nghĩa database và chưa có phân bổ thời gian; `lam-quen.mdx:312` chỉ nhắc “Sau đó dành bảy phút hỏi đáp” trong notes slide cuối. Shell cho biết tổng 55 phút nhưng không có 48 + 7.
- **Căn cứ/tác động:** tổng metadata 55 và tổng slide 48 đã đúng; đây là phần thông tin tổ chức buổi giảng còn thiếu tại vị trí template quy định, không phải thiếu tiền đề SQL. Người xem đầu buổi chưa biết bảy phút cuối dành hỏi đáp.
- **Đề xuất:** thêm một câu ngắn ở slide 1, hoặc một dòng phân bổ trong phần mở đầu mà người giảng đọc được: “Buổi học gồm 48 phút giảng và 7 phút hỏi đáp.” Không cần trang bìa hay slide mới; nếu thêm vào màn chiếu thì vẫn kiểm giới hạn 2–3 câu và khung hiện tại.

## Rà mạch theo thứ tự 18 slide

Vị trí dưới đây thuộc `src/content/presentations/lam-quen.mdx`. “Giữ được” là đánh giá học thử từ source/HTML, không thay kiểm live hoặc xác nhận khả năng tự học của mọi học viên.

| Slide / dòng | Câu hỏi tự đặt và câu trả lời đang có | Đánh giá tích hợp |
|---|---|---|
| 1 / 19–31 | Database là gì, dùng chung để làm gì? Định nghĩa tập dữ liệu có cấu trúc và ví dụ hồ sơ/phòng/hợp đồng ở nguồn chung cho điểm bắt đầu cụ thể; quyền được cấp hiện cùng định nghĩa. | **Giữ được.** Không hứa dữ liệu tự đúng. Phân bổ buổi học: I2. |
| 2 / 34–47 | Các tên bảng có nghĩa gì, hình có phải toàn hệ thống? Ba nhóm có nhãn tiếng Việt, mã và dữ liệu cụ thể; notes nói rõ chỉ ba bảng/vài dòng trích. | **Giữ được.** Hai hợp đồng đang trích không bị gọi là toàn bộ, nên không mâu thuẫn ba hợp đồng ở slide 8. |
| 3 / 50–62 | SQL Server khác database/máy chủ ở đâu? Phần mềm Microsoft quản lý lưu/đọc/cập nhật; máy chủ được giải thích tại chỗ; kiểm luật có điều kiện đã khai báo. | **Giữ được.** Nối đúng vai trò thay vì đổi nghĩa database thành phần cứng. |
| 4 / 65–77 | SQL để làm gì, ai xử lý? Câu yêu cầu tiếng Việt, SELECT và kết quả trích đặt cạnh nhau; “truy vấn” được gọi tên và SQL Server trả dữ liệu. | **Giữ được.** Chỉ đọc minh họa, không giao chạy/nhớ cú pháp; nhắc thứ tự có thể khác. |
| 5 / 80–93 | Dùng công cụ gì gửi yêu cầu, đóng nó có mất dữ liệu? SSMS được định nghĩa ngay; đường gửi yêu cầu và chiều trả kết quả có nhãn; dữ liệu vẫn ở máy chủ. | **Giữ được.** Không phát sinh yêu cầu cài SSMS hay đổi nơi thực hành của web. |
| 6 / 96–111 | Bảng là gì, hàng tên cột có phải hồ sơ? Bảng trích NhanVien nối từ hình tổng quan; lời giảng phân biệt thiết kế tên cột và dòng dữ liệu. | **Giữ được.** Cột không hiện trong trích vẫn tồn tại, không gọi hình là toàn bộ bảng. |
| 7 / 114–129 | Dòng/cột là gì, một dòng có luôn là người? Định nghĩa trên NhanVien rồi đối chiếu HopDong. | **Giữ được.** Đơn vị dòng đã có trước khi đếm hợp đồng/đọc kết quả nhiều bảng. |
| 8 / 132–145 | Vì sao tách bảng, lặp MaNV có phải ba hồ sơ? Một hồ sơ cạnh ba hợp đồng, cùng mã để nhắc hồ sơ; giảm lặp/sửa sót là lý do trực tiếp. | **Giữ được.** Hình cụ thể nối nhu cầu tham chiếu với phần khóa. |
| 9 / 148–161 | Vì sao cần mã, đặt tên cột mã đã đủ chưa? Họ tên có thể trùng/đổi; ràng buộc được giải nghĩa là luật để SQL Server kiểm. | **Giữ được.** Không khẳng định dữ liệu mẫu có người trùng tên hoặc mã chứng nhận danh tính thật. |
| 10 / 164–177 | PK kiểm gì, đọc NhanVien.MaNV thế nào? Cột/bảng được đọc bằng lời trước dạng dấu chấm; có điều kiện khai báo, không trùng/NULL và giới hạn hai hồ sơ khác mã của một người. | **Giữ được.** Không cần lấy kiến thức bài 1.3 bù cách đọc dấu chấm; hình chỉ kết luận qua luật duy nhất. |
| 11 / 180–193 | Không PK thì bảng còn dùng được không, vì sao rủi ro? Lưu/đọc vẫn được; mã trùng có thể lọt nếu không có luật khác. | **Giữ được.** Giả định được ghi ngay hình/lời giảng, không bỏ constraint thật để giả lập. |
| 12 / 196–213 | Mã phòng giúp tìm tên thế nào, mã không có thì sao? NV001/KT dò tới KT/Kế toán trên hai bảng có nhãn. | **Giữ được.** Nhu cầu kiểm mã xuất hiện trước định nghĩa FK; không đòi biết VLOOKUP. |
| 13 / 216–229 | FK kiểm gì, NULL có được nhận không, có biết mã gán đúng người? Luật mã có thật khi đang bật, nullability do thiết kế cột, MaPB mẫu không NULL và giới hạn mã đúng/nghiệp vụ sai đều hiện. | **Giữ được.** Điều kiện từng ở notes đã ra màn chiếu, nối được tới slide 16. |
| 14 / 232–245 | Không FK thì có lấy thông tin nhiều bảng được không? Giả định không luật khác và định nghĩa kết bảng bằng việc so khớp trả lời trực tiếp. | **Giữ được.** FK kiểm khi ghi và cách lấy dữ liệu khi đọc không bị nhập làm một. |
| 15 / 248–263 | ERD là gì, đường/hộp nói gì, có phải kết quả hồ sơ? Hai câu giải thích cấu trúc và phạm vi FK đã khai báo. | **Giữ được.** Không hứa sơ đồ khóa học vẽ hết quan hệ nghiệp vụ. |
| 16 / 266–281 | 1/∞ có phải số người thực hoặc bắt mọi phòng có người? Nhãn hai phía cùng ví dụ mẫu mỗi hồ sơ một phòng/một phòng có thể chưa có người trả lời được. | **Giữ được.** Điều kiện không NULL đã có trước; notes nói thêm ký hiệu không tự quyết định tính bắt buộc. |
| 17 / 284–300 | Tra tên phòng bắt đầu đâu, qua cặp cột nào, phòng tại thời điểm nào? Trace NV001 → KT → Kế toán nối dữ liệu với cặp cột; kết luận chỉ tên phòng hiện lưu. | **Giữ được.** Không suy ra phòng ngày vào làm hoặc lịch sử công ty không lưu. |
| 18 / 303–318 | Qua ba bảng thế nào, vì sao ba hợp đồng vẫn ba dòng? Hai cặp cột được gọi đầy đủ; mỗi dòng bắt đầu từ hợp đồng và chỉ thêm tên phòng hiện lưu. | **Giữ được.** PK/FK và đơn vị dòng đủ làm tiền đề đọc đường; chưa cần dạy cú pháp JOIN. |

## Tiền đề hoạt động và tương thích giữa các bài

Bộ này không có bài tập/YAML, đề kiểm tra riêng, SQL chạy được, API hoặc điều kiện nộp bài. Vì vậy không có bảng đáp án cần đối chiếu và không yêu cầu `check:exercises`. Không dùng việc không có quiz làm lý do yêu cầu thêm quiz.

| Hoạt động thực sự | Tiền đề cần | Nguồn đã có / còn thiếu |
|---|---|---|
| Hiểu yêu cầu SELECT minh họa | Phân biệt SQL với phần mềm xử lý; nhận ra tên bảng/họ tên | Slide 2–4; câu tiếng Việt và dữ liệu trích đứng cạnh. Không cần tự viết SELECT. |
| Nhận diện bảng/dòng/cột rồi đọc ba hợp đồng | Mỗi bảng lưu gì, mỗi dòng đại diện gì, mã dùng nhắc hồ sơ | Slide 2, 6–8. Từ “tham chiếu” trên caption được hình và lời “nhắc tới hồ sơ” giải nghĩa bằng việc cụ thể. |
| So sánh có/không PK/FK | Ràng buộc, mã, NULL, việc kiểm dữ liệu khi ghi | Slide 9–14. Điều kiện không luật khác và tính giả định đều hiện; không phải kiến thức chỉ ở đáp án/notes. |
| Đọc ERD hai/ba bảng | Cách đọc bảng.cột; PK/FK; hai phía một–nhiều; phòng hiện lưu | Slide 10, 12–18. Không còn vướng tiền đề NULL/cách đọc dạng dấu chấm của vòng nội dung trước. |
| Đọc lại bài đầy đủ sau buổi học | Biết nguồn nào giải thích sâu hơn | Footer từng slide về đúng bài 1.1/1.2/1.4/1.5; bài 1.3 vẫn nằm trong lộ trình chính, không bị xóa khi bỏ khỏi metadata deck. |

## Kiểm tích hợp source, build, metadata và CSS do reviewer tự làm

- **Source/build:** Python đối chiếu 36 đoạn lời giảng hiển thị, không có mismatch; phần chữ 18 slide audience/presenter giống nhau khi bỏ notes. Mỗi build có 18 slide, tổng `data-minutes` 48, nguồn đúng tập 1.1/1.2/1.4/1.5; audience **0 notes**, presenter **18 notes**, cả hai **0 đáp án**. Hai HTML không có `astro-island`. Metadata tổng 55 khớp 48 + 7, vị trí báo phân bổ cần biên tập theo I2.
- **Liên kết bài nguồn:** đọc HTML năm bài 1.1–1.5. Header liên quan ở 1.1/1.2/1.4/1.5 trỏ `/microsoft-sql-lession/bai-giang/lam-quen/`; 1.3 không có header liên quan, đúng quyết định metadata. Sidebar nhóm Làm quen vẫn có link deck ở cả năm trang, phù hợp vị trí theo level. Không coi việc sidebar 1.3 còn link là metadata sai.
- **Tìm kiếm/lộ trình:** `createSearchItems` tạo loại presentation riêng, num rỗng, link từ path helper và keyword của deck; không nhập vào numbered catalog. Sidebar tính tiến độ chỉ trên catalog; `PresentationLayout`/shell không mount progress island. Test metadata/catalog, đường dẫn, sidebar và tìm kiếm thực tế deck đều đạt. Đây là kiểm source/SSR/unit, không tự chứng minh storage browser không đổi.
- **CSS/cross-screen:** diff chỉ thêm nhóm `.concept-*` và khoảng cách `figure + p`/`projection-grid + p` trong `.projection-body`. `presentation.css` chỉ được import bởi `PresentationLayout`; `LessonLayout`/bài đọc 1.1 không dùng stylesheet này. Canvas/tokens/controller không đổi. Các selector rộng hơn có thể tác động những slide ERD 15–18, nhưng chính các slide này là phần được xem/đo trong evidence; chưa thấy căn cứ regression. ConceptFigure dùng hình riêng cho giả định, không sửa nhãn PK/FK của schema thật. Không thấy thêm listener, storage, yêu cầu mạng, câu ghi hoặc tương tác mới trong nội dung/component.
- **Tự chạy lúc 17:14:** `npx vitest run tests/presentation-content.test.ts tests/presentation-outline.test.ts tests/presentations.test.ts tests/presentation-state.test.ts` — **4 file, 25/25 test đạt**. `npm run check:dist` — **139 trang, 2771 link đạt**. Không sửa test hoặc nới assertion. Các test mới giữ điều kiện khóa/NULL/giả định/đơn vị dòng thay vì chỉ đổi số 20 thành 18; kiểm cú pháp reveal/controller cũ vẫn được giữ ở bộ state.
- **Tự xem ảnh của tác giả:** `du-lieu-trong-database-1280.jpg`, `thong-tin-o-nhieu-bang-1280.jpg`, `khoa-chinh-1280.jpg`, `khoa-ngoai-1280.jpg`, `ky-hieu-erd-1280.jpg`, `hop-dong-kem-ten-phong-1280.jpg`. Sáu ảnh hiện đủ câu đang review, gồm sửa slide 10/13/16, bảng/cặp cột đọc được và footer không chồng chữ. Đây là tôi xem ảnh có sẵn, không phải tôi đã chạy browser ở viewport đó.

## Chứng cứ tác giả được đọc và giới hạn

- `verification.md`, `decisions.md`, `content-review.md` cho biết vòng nội dung trước đã xử lý F1/F2. Tôi kiểm lại kết quả ở source/build, không lấy kết luận reviewer trước làm kết luận của mình.
- `sql-results.json`/`sql-nullability.json` là kết quả SELECT tác giả lưu: ba mã hợp đồng của NV021 khớp hình, tên/phòng khớp hồ sơ công ty, MaNV/MaPB liên quan không nhận NULL. `verification.md` ghi 7 nhóm kiểm dữ liệu/khóa/truy vấn/nullability. **Tôi không kết nối hoặc chạy lại SQL**, không xác nhận trạng thái live hiện tại. Hai hình thiếu khóa vẫn là giả định, không được dùng kết quả SQL làm bằng chứng đã thử bỏ khóa.
- `geometry-1280.json` tác giả ghi 18 slide overflow 0 và gap footer dương; sáu ảnh tôi xem không cho thấy nội dung cốt lõi bị cắt. Không tự đo lại DOM hay suy ảnh chứng minh được bàn phím, cỡ chữ ngoài phòng học, hoặc mọi viewport.
- Tác giả báo bổ sung trong lúc giao review: slide dày 13 ở 1440×900; mở qua header/sidebar 1.1; tìm “slide lam quen” ra một kết quả nhãn Slide; về Lộ trình trước/sau vẫn 0/50, Làm quen 0/5 và resume 1.1; copy link chỉ chứa `?slide=khoa-ngoai` rồi phục hồi clipboard; reload hai cửa sổ build cuối vẫn 18/18; no-script fixture đủ 18 slide/0 notes và điều kiện NULL. Các nội dung này là **chứng cứ tác giả**, không phải thao tác tôi tự thực hiện. Hồ sơ lúc tôi đọc vẫn đang được tác giả cập nhật, nên không biến dòng “còn kiểm bổ sung” ở bản giao ban đầu thành lỗi sản phẩm.
- Tác giả báo toàn bộ 55 file/410 test, check 245 file không lỗi/warning và 3 hint, build 139 trang/check:dist 2771 link. Tôi chỉ tự chạy lại 25 test liên quan và check:dist nêu trên. `ui-audit.json` là exit 1, **severity error, errors 1/warnings 0** ở `SqlEditor.tsx:53`; tác giả giải thích CSS `resize: none` có sẵn mà static audit không lần ra. Đây là lỗi kiểm tĩnh nền ngoài diff; không được gọi toàn bộ strict audit đạt hoặc đổi tên severity thành warning. Đã nhắc tác giả diễn đạt hồ sơ đúng log.
- Native fullscreen **chưa đủ bằng chứng**: tác giả cho biết UI toggle/ảnh có thay đổi nhưng `document.fullscreenElement` vẫn null. Popup thật **chưa đủ bằng chứng**: UI báo đã mở nhưng inventory IAB không có tab mới; protocol/fallback link được kiểm riêng bằng tab tạo từ công cụ. Không đồng nhất các kết quả đó với xác nhận native `requestFullscreen`/`window.open` hoạt động. Hai giới hạn không do tôi tái hiện.
- Tác giả báo thêm fixture local 4335 dùng test doubles, không đổi bảo mật browser: bỏ BroadcastChannel có lời giải thích và vẫn tự xem; `window.open` trả null có báo bị chặn/link/thử lại và Next vẫn 2/18; fullscreen promise bị từ chối có báo tiếp tục trong cửa sổ và Next vẫn 2/18. Ảnh `fallback-popup.jpg`/`fallback-fullscreen.jpg` được tác giả lưu. Đây là evidence nhánh lỗi có chủ đích của tác giả, không xác nhận native success và không phải tôi tự thử.

## Những cân nhắc chưa kết luận hoặc để ngoài phạm vi

| Hạng mục | Cách xử lý / lý do |
|---|---|
| Sync/reload/tự xem/theo lại/copy link/browser progress | Dựa evidence tác giả; không sử dụng CUA chung của root để tránh can thiệp phiên kiểm. Không nhận là tự chạy và không nâng thành bug khi chưa có hành vi sai. |
| Fullscreen thật, popup thật khi trình duyệt chặn, nhánh clipboard bị từ chối, nhiều presenter, reduced motion/forced colors | Không có phép kiểm độc lập trong lượt này; controller/protocol không đổi. Tác giả có fixture kiểm nhánh lỗi BroadcastChannel/popup/fullscreen nêu trên, còn native success vẫn giới hạn. Tác giả quyết định mức bàn giao bằng đúng evidence, không sửa security để ép đạt. |
| No-JS thực sự tắt ở cài đặt browser | Tác giả dùng fixture bỏ script; tự đọc HTML khẳng định cấu trúc 18/0, không khẳng định đã tắt JavaScript trên browser. Câu hướng dẫn không đúng trong noscript là I1, có đủ căn cứ từ HTML. |
| SQL live/constraint metadata/schema parser | Không chạy lại và không đọc seed theo gói giao việc. Chỉ đối chiếu hồ sơ bài học và JSON tác giả; chưa thấy căn cứ báo sai dữ liệu hoặc đường FK. |
| API, YAML, exercise runner, tương thích nháp SQL | Không đổi các owner này và bộ không có bài tập/chạy SQL; không yêu cầu pipeline bài tập hoặc thêm bài thử ghi. |
| Độ dài chiếu từ xa, 200% zoom, screen reader, viewport dưới 1024 | Không tự kiểm; phạm vi thiết kế giữ canvas scale và hành vi hẹp hiện hành. Không lấy sáu screenshot thay các kiểm này; chưa có triệu chứng cụ thể để lập finding. |
| Kiểu dữ liệu, khóa ghép, UNIQUE/trigger, FK trỏ unique key, lịch sử chuyển phòng | Chủ đích ngoài bài giảng theo thiết kế duyệt. Những điều kiện cần cho kết luận hiện tại đã có; không bổ sung chiều sâu chuyên gia cho đủ số mục. |
| Link ID slide cũ bị thay chủ đề | Spec chấp nhận không có cơ chế tương thích phức tạp; controller fallback cũ giữ nguyên. Không yêu cầu giữ 20 slide hoặc ID không còn cùng nghĩa. |
| Tên gọi “SQL Server Learning Workspace”, các màn bài đọc/bài tập khác, audit textarea nền | Không sửa UI/tiến độ/editor ngoài scope. CSS trình chiếu không rò vào bài đọc theo đường import đã kiểm; lỗi tĩnh nền phải ghi đúng nhưng không sửa từ lượt review này. |

Ưu tiên xử lý I1 rồi I2 và cập nhật ma trận/spec/plan theo mục 4.6. Không có đề thực hành nào thiếu kiến thức cần bổ sung; không có finding sai kiến thức mới đủ căn cứ. Kết luận này không thay kiểm SQL/browser, không phải quyền merge/push/deploy. Chỉ file report này được tạo trong lượt review.
