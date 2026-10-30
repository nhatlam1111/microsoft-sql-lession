# Bài 1.3: hình bảng trong database — kiểm và review

Ngày 30/10/2026. Người dùng làm rõ hình phải thể hiện bảng/dòng/cột của database; chọn khối database nhỏ sau bảng NhanVien phóng lớn, rồi yêu cầu giảm chữ chú thích. Phạm vi hiện tại là hình và lời dẫn đi kèm; sáu đề xuất biên tập trước đó chưa triển khai. Không commit/push/deploy.

## Hình và nội dung

Built-in ImageGen, không CLI/API, tạo bản database rồi chỉnh giảm chữ theo yêu cầu. Bản cuối chỉ giữ nhãn Database, tên bảng NhanVien, tên cột MaNV/HoTen/NgayVaoLam và ba callout Bảng/Dòng/Cột. Dòng NV005 vàng bao ba giá trị, cột HoTen viền dọc gồm tiêu đề và các giá trị. Dữ liệu ba hồ sơ/ngày khớp hồ sơ công ty và các dẫn chứng đã có, không phải kết quả SQL live. [Prompt nguyên văn/công cụ](../../superpowers/specs/2026-10-30-lesson-1-3-database-illustration-prompt.md).

Ảnh PNG 1536×1024 tại `src/assets/lessons/1-3-database-table.png`; giữ nguyên gốc ở thư mục generated_images của công cụ. Bản Excel bị loại không còn được import hoặc nằm trong assets; bản sao giữ trong evidence dưới tên rejected-excel.png, prompt gốc không bị sửa nội dung. Lượt review nháp Excel đã dừng khi người dùng đổi hướng, không dùng làm nghiệm thu bản mới.

MDX đưa định nghĩa bảng/dòng/cột đến cạnh ảnh ở đầu phần chính, trước bảng Excel tình huống. Intro/alt/caption gọi đúng database và các tên thật NhanVien/HoTen; câu sau nói rõ “file của tình huống”, tránh lẫn dữ liệu hình mới với các ô C2–D4. Astro Image dùng WebP và base path hiện có, figure rộng theo article; không đổi component/CSS chung.

## Kiểm do tác giả thực hiện

- MDX SHA256 `1FAB3504CF6F862FD9AD6DD2B8F16E05B7AFAADA79C1BF506F8301561706BA90`; HTML SHA256 `327B223704271F1E3EA44D84EEB8A192548C5B4FE764D9E359F367AB089C75EE`; PNG SHA256 `DDE10666F2CDC886B92C8EFA67E0655915A368B69B77493EE52C5C6C47C1C5E2`.
- `npm test -- --reporter=dot`: **322/322**, 48 file. `npm run check`: **0 errors / 0 warnings / 3 hints** nền: FormEvent ở hai vị trí trong ExerciseWorkspace, execCommand ở SqlEditor; các file đó không đổi.
- `npm run build`: **132 trang**, hoàn tất 15:04:34 theo log local; `npm run check:dist`: **1998 liên kết**; exit 0. Ba WebP cho ảnh mới khoảng 18–40kB; source không phụ thuộc URL ảnh ngoài project.
- `git diff --check`: exit 0. Source contracts so với HEAD xác nhận frontmatter, nguyên khối Excel/Ssms, cả hai bảng Markdown và cả năm details/đáp án không đổi. Hình mới đứng trước Excel tình huống. Không thêm SQL/đề/API/seed.

Các log này thuộc bản database cuối. Các kết quả/ảnh của bản worksheet trước đó chỉ là lịch sử, không dùng thay kiểm mới.

## Browser do tác giả thực hiện

In-app browser qua cua_repl, bản preview `http://127.0.0.1:4371/microsoft-sql-lession/bai/1-3-bang-cot-kieu-du-lieu/`, đúng build/hashes trên.

- **1280×720:** article 670px, ảnh khoảng 668.67×445.77px, tỉ lệ 3:2; tải đúng base `/microsoft-sql-lession/_astro/`. Document scrollWidth 1270px, không tràn ngang. Đã nhìn trực tiếp hình database/các tên/callout và caption trên trang, xác nhận hình nằm trước bảng tình huống và không còn lưới worksheet trong ảnh. Nội dung article không lộ backtick.
- **1024×720:** article 414px, ảnh khoảng 412.67×275.10px, tỉ lệ giữ nguyên, tải thành công; document scrollWidth 1014px. Các nhãn chính/caption nằm trong khung, không tràn ngang. Không suy từ đây ra kiểm mobile.
- Click mục lục Ghi nhớ rồi dùng Enter lần lượt mở đủ **5** câu ôn: focus đúng từng summary, đáp án có trong cây truy cập. Không bấm hoàn thành/đánh cờ, thay clipboard/nháp hoặc chạy SQL. Đã reset viewport tạm sau kiểm.
- Một phép đọc UI ở lượt ảnh worksheet bị ngắt vì DOM proxy không hỗ trợ compareDocumentPosition; kiểm bản database dùng vị trí bounding rect và thành công. Đây là giới hạn công cụ của lượt cũ, không phải lỗi sản phẩm hay lý do bỏ kiểm mới.

Evidence ignored: `temp/verification/2026-10-30-lesson-1-3-database-illustration/`: test/check/build/dist logs, source-contracts.json, browser-matrix.json, database-figure-1280.png, database-figure-1024.png, rejected-excel.png.

## Review độc lập và ma trận

Reviewer mới `review_1_3_database_image`, fork_turns none, Codex kế thừa model phiên; đã tự xác nhận source/HTML/PNG hash đúng phiên bản, đọc toàn bài/HTML, xem PNG và WebP 720px, kiểm tiền đề từng câu ôn. Tác giả đã đọc hết [report gốc](review.md), sao nguyên byte từ temp/review/2026-10-30-lesson-1-3-database-illustration/review.md; không sửa kết luận.

Reviewer không có mục Cần sửa/Cần làm rõ/Cần cắt/Biên tập trong hình và lời dẫn; xác nhận đủ tiền đề năm câu ôn. Không có vòng sửa source sau report. Reviewer không kiểm browser/SQL/test, không đọc report cũ hoặc ma trận; những kiểm tác giả làm vẫn ghi riêng ở trên. Reviewer báo một lần dò tiêu đề vô tình hiện vài dòng đề xuất biên tập trước mục spec được giao, không dùng các dòng đó để lập finding hay mở phạm vi; giới hạn này giữ nguyên trong report.

| Quyết định người dùng | Xử lý | Kết quả |
|---|---|---|
| Hình phải là bảng trong database, không worksheet | Làm theo | Database phía sau, bảng NhanVien phía trước, tên cột thật; bỏ A/B/C/số dòng/thanh Excel khỏi ảnh. |
| Giảm chữ chú thích | Làm theo | Chỉ ba callout Bảng/Dòng/Cột, bỏ tiêu đề lớn/đoạn giải thích/nhãn lặp trong ảnh; lời giải thích ngắn ở nội dung/alt/caption. |
| Giữ phạm vi kiến thức hiện tại | Làm theo | Các bảng, câu ôn và phần giảng khác giữ nguyên; không lồng sáu đề xuất biên tập chưa yêu cầu thực hiện. |
| Reviewer F1 — bảng/dòng/cột cùng một đối tượng, chỉ đúng phạm vi | Làm theo: giữ | Toàn dòng NV005 vàng, toàn cột HoTen viền dọc gồm header/giá trị; không thêm chữ vào hình đã rút gọn. |
| Reviewer F2 — phân biệt ảnh database với bảng Excel tình huống | Làm theo: giữ | Giữ thứ tự hình trước tiểu mục đầu và lời dẫn “file của tình huống”; C2–D4 không trỏ sang ảnh mới. |
| Reviewer F3 — nhận diện hình khái niệm và đọc được bằng chữ | Làm theo: giữ | Giữ alt/caption, tên dữ liệu có code và lời gọi “Hình minh họa”; không thêm bảng chú thích hoặc SQL. |
| Reviewer chưa xác minh UI/SQL/test/thời lượng | Làm theo: ghi giới hạn | Không lấy review ảnh/HTML làm kiểm tương tác/live. Dùng các kiểm tác giả đã thực hiện ở trên; không báo mobile/SSMS/15 phút đã được kiểm. |

Không có nhận xét cần sửa hoặc để ngỏ trong lượt hình này. Những đề xuất biên tập cũ vẫn là đề xuất riêng, không dùng kết luận review hình làm quyền triển khai chúng hoặc quyền push/deploy.

## Giới hạn

Không chạy SQL live, SSMS/Excel thật, API hoặc check:exercises vì không đổi câu lệnh, bộ đề hay số liệu nguồn. Không kiểm screen reader, mobile hoặc thời lượng 15 phút với người học thật. Xác nhận đúng dữ liệu hình bằng hồ sơ/fixture đã có, không gọi là một lần query database mới.
