# Review độc lập bài 1.4 — Khóa chính và khóa ngoại

## Phạm vi, phiên bản và công cụ

- Reviewer: Codex, **kế thừa model của phiên**, không đổi model; ngữ cảnh mới, góc nhìn Business Consultant chỉ biết Excel cơ bản, chưa biết SQL/lập trình.
- Bài được học thử: `src/content/lessons/1-4-khoa-chinh-khoa-ngoai.mdx`, toàn bộ 95 dòng, không có YAML/bài tập SQL. Source được giao: `ae7a2f3a0aa3c60e39babe0aeae356d49d8ea534`.
- Đã đọc AGENTS.md, toàn bộ quy ước hiện hành (gồm lời dặn 4.5), template, hồ sơ công ty; bài mẫu 1.1 và bài trước 1.2–1.3. Với spec `2026-10-31-foundation-teaching-refinement-design.md`, chỉ đọc các mục Mục đích và giới hạn, Các hướng đã cân nhắc, Nội dung cụ thể. Không đọc report/nhận xét cũ hoặc kết luận tác giả.
- Kiểm thực tế: đọc file bằng PowerShell; dùng Python chuẩn để đọc văn bản và thẻ HTML tĩnh tại `dist/bai/1-4-khoa-chinh-khoa-ngoai/index.html`. Thời gian sửa file HTML quan sát được: **31/10/2026 21:33:11**, khớp lần build được giao. Quan hệ commit–build lấy theo gói giao việc, không tự chạy Git/build để chứng minh lại.

## Rà theo thứ tự bài

### 1. Mở bài và khóa chính — Giữ được

`src/content/lessons/1-4-khoa-chinh-khoa-ngoai.mdx:20–26`: từ tô màu mã trùng/danh sách chọn chuyển sang luật kiểm lúc ghi là bước nối dễ hiểu. Câu “Khi … được khai báo” đặt đúng điều kiện, không hứa cột mã nào cũng tự có khóa. Hai tác dụng không trùng và không nhận `NULL` được nói ngay cạnh định nghĩa. Lý do dùng mã thay họ tên đã được trả lời; không cần thêm cú pháp khai báo.

### 2. Định nghĩa khóa ngoại — Cần làm rõ, mức nhẹ

**Vị trí:** `src/content/lessons/1-4-khoa-chinh-khoa-ngoai.mdx:28–30`.

**Trích:** “Khóa ngoại buộc mã phải có ở bảng kia”; “một giá trị khóa có thật ở bảng kia”.

**Tác động:** định nghĩa chung khiến người mới hiểu khóa ngoại luôn phải trỏ sang một bảng khác, trong khi dòng 36 đưa ngay ví dụ `MaQuanLy` trỏ về chính `NhanVien`. Ví dụ tự tham chiếu đã được giải thích đủ để nhận diện, nhưng người học phải tự điều chỉnh nghĩa của định nghĩa vừa đọc. Đây là sự chưa khớp trong cách diễn đạt, không phải thiếu một chủ đề cần giảng thêm.

**Đề xuất tối thiểu:** đổi tiêu đề thành “Khóa ngoại giữ mã tham chiếu có thật”; thay “ở bảng kia” trong định nghĩa bằng “ở bảng được trỏ tới”, cùng cách gọi đã dùng trong Ghi nhớ. Giữ nguyên ví dụ phòng ban và một câu nhận diện tự tham chiếu.

**Phần giữ được:** dòng 30 nêu rõ `MaPB` không nhận `NULL` trước khi kết luận hồ sơ nào cũng có phòng; nhiều hồ sơ dùng cùng mã phòng được phân biệt với mỗi mã một dòng ở danh mục. Dòng 32 tách luật dữ liệu khỏi ô chọn trên màn hình, có điều kiện ràng buộc đang bật và chỉ nêu việc xóa phòng trong phạm vi dữ liệu mẫu. Không cần mở rộng cơ chế xóa.

### 3. SSMS và giới hạn phạm vi — Giữ được

`src/content/lessons/1-4-khoa-chinh-khoa-ngoai.mdx:36–40`: Object Explorer đã được giải thích ở 1.3; đường mở Columns, nghĩa PK/FK và `dbo` đủ dùng tại đây. `MaQuanLy` và trường hợp `NV004` để `NULL` nối được từ kiến thức NULL trước đó.

Trong HTML, bốn nhãn `MaNV`, `MaPB`, `MaCD`, `MaQuanLy` có thẻ `ssms-mark`; nội dung PK/FK và null/not null khớp lời giảng/caption. Caption ghi rõ mô phỏng. Đã đọc cả các cột còn lại trong khối; không yêu cầu giải nghĩa lại những cột không dùng để lập luận. Đoạn “Ở bài này chỉ cần…” giới hạn đúng việc đọc nhãn, dành cách xem đích tham chiếu và khai báo ràng buộc cho bài sau.

### 4. Hay nhầm, Ứng dụng và ôn — Giữ được

`src/content/lessons/1-4-khoa-chinh-khoa-ngoai.mdx:46–65`: hai giới hạn thiết thực đã có trước phần ôn: mã phòng tồn tại không chứng nhận đúng phòng của người đó; khóa chính theo mã không tự phát hiện một người có hai mã. Ví dụ CCCD không có luật cấm trùng khớp hồ sơ công ty, không bị trình bày như dữ liệu chắc chắn đúng. Hai ứng dụng gắn với nhắc đúng hồ sơ và hiểu thao tác bị chặn; không dạy thao tác ghi dữ liệu chung.

Bố cục giữ bài nền, ba tiểu mục chính, không tình huống/nhân vật/bài tập SQL; frontmatter giữ 7 phút ước tính và bốn câu ôn sau Ghi nhớ. Các đoạn ngắn, thuật ngữ trọng tâm có định nghĩa, dẫn chứng/tên cột dùng code. Câu ôn 2 và 4 nhắc lại quy tắc mã phòng được lặp, nhưng câu 4 thêm việc phân biệt với trùng khóa chính; mức lặp này có chức năng ôn, chưa đáng thêm một finding yêu cầu cắt. Không thấy đoạn cần kéo dài để người chỉ biết Excel theo được.

## Các câu “tại sao/để làm gì” khi học thử

| Câu tự đặt ra | Bài trả lời ở đâu | Đánh giá |
|---|---|---|
| Vì sao dùng mã thay họ tên? | Dòng 26: tên có thể trùng/thay đổi, bảng khác dùng mã để nhắc đúng hồ sơ | Có lời giải và mục đích |
| Khóa ngoại khác danh sách chọn trên màn hình ở đâu? | Dòng 32: kiểm khi ghi dù có ô chọn hay không | Đã trả lời |
| Vì sao không phải hồ sơ nào cũng được để thiếu phòng? | Dòng 30: riêng `MaPB` không nhận NULL | Điều kiện hiện rõ |
| Vì sao người quản lý lại dùng khóa ngoại trong cùng bảng? | Dòng 36: quản lý cũng được nhắc bằng `NhanVien.MaNV` | Nhận diện được; cần sửa cụm “bảng kia” nêu trên |
| Lưu qua khóa thì đã đúng nghiệp vụ chưa? | Dòng 46–47: sai phòng vẫn có mã hợp lệ, một người có thể có hai mã | Đã trả lời trước ôn |

## Tiền đề từng câu tự kiểm tra

| Câu / vị trí MDX | Kiến thức cần | Đã được dạy trước câu ôn | Thiếu hoặc vướng |
|---|---|---|---|
| 1 — dòng 70: phân biệt hai khóa | PK duy nhất/không NULL; FK kiểm mã tồn tại và cho phép nhiều dòng trỏ cùng mã | 1.4 dòng 24, 30–32 | Không thiếu tiền đề |
| 2 — dòng 77: mã phòng ở nhiều dòng | Phân biệt cột khóa trong bảng nhân viên với khóa danh mục phòng | 1.4 dòng 30 | Không thiếu; có ví dụ ngay trong phần giảng |
| 3 — dòng 84: đọc nhãn `MaQuanLy` | FK; kiểu chuỗi, giới hạn độ dài; NULL được phép | 1.3 dòng 26, 30–35; 1.4 dòng 36 và khối SSMS dòng 38 | Không cần bài sau để đọc nhãn |
| 4 — dòng 91: trùng mã nhân viên so với cùng phòng | Xác định ràng buộc của từng cột; biết KT có trong danh mục | 1.4 dòng 24 và 30 | Không thiếu; suy luận được trước khi mở đáp án |

Bốn đáp án không bổ sung kiến thức chưa giảng. Bộ ôn kiểm được phân biệt hai khóa, đọc nhãn và dự đoán điều bị chặn. Phần giới hạn nghiệp vụ đã nằm trong Hay nhầm; không phải dùng đáp án để học bù. Không có đề SQL cần kiểm câu lệnh/runner.

## Ưu tiên, nguồn và giới hạn

Chỉ có một đề xuất làm rõ câu chữ về đích tham chiếu, sửa ngay trong câu hiện có. Không phát hiện thiếu tiền đề làm bốn câu ôn trong phạm vi đọc nguồn/HTML; không đề nghị thêm kiểu khóa, cú pháp hoặc trường hợp hiếm.

Nguồn nhận xét là MDX, các bài trước và tài liệu nội bộ được giao, cùng HTML tĩnh đúng đường dẫn. Không đọc script database, secret, tài liệu SQL bên ngoài; không gọi API/runner, chạy SQL/test/build hoặc tương tác browser/SSMS. Do đó chưa xác minh độc lập schema/ràng buộc đang bật, việc ghi/xóa thật, bố cục và viền xanh ở viewport thực, bàn phím hoặc hành vi mở câu ôn. HTML chỉ xác nhận nội dung và thẻ đánh dấu có mặt, không chứng minh các tương tác đó đã chạy đúng. Thời lượng 7 phút là ước tính của bài, không phải kết quả đo người học thật; không chạy bộ đếm `proseParagraphs`.
