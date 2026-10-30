# Bài 1.3: kiểm review và đề xuất — 30/10/2026

Lượt tiếp theo: người dùng yêu cầu thêm hình, rồi chọn hình database và giảm chữ; xem [hồ sơ bản thêm hình](../2026-10-30-lesson-1-3-database-illustration/verification.md). Các hash/kết luận bên dưới thuộc lượt review trước khi thêm hình, không thay kiểm bản mới.

Lượt này chỉ review và đề xuất. Không sửa bài 1.3, test, component, seed hay bài 1.1–1.2. Các thay đổi bài 1.1 từ lượt trước vẫn được giữ trong working tree; không commit/push/deploy.

## Phạm vi và phiên bản

Source bài 1.3 từ HEAD `f5f6f2f7899dc30976d1d797559cffbc87366cdb`, SHA256 `38EA37BAEC042CF957C4F86BB0BFF2BDAE2A047DB6E31A58AFA6CCCD0D6F8F07`. HTML ở `dist/bai/1-3-bang-cot-kieu-du-lieu/index.html`, SHA256 `FC773627EC552927A9FF06F67F793295F21C65AE0040597A0E65184D3D87BD32`, thuộc lần build ngày 30/10/2026 sau khi sửa 1.1; bài 1.3 chưa thay đổi.

Đọc bài 1.1 hiện tại, 1.2, quy ước/template/hồ sơ công ty và quyết định được duyệt liên quan 1.3. Áp dụng teach cho tiền đề/tải kiến thức/vận dụng và brainstorming cho lựa chọn sửa. Người dùng chọn giữ phạm vi kiến thức, làm rõ mạch; không tạo learning-workspace/HTML/hồ sơ học viên.

## Reviewer và ma trận nhận xét

Reviewer mới `review_lesson_1_3`, Codex kế thừa model phiên, fork_turns none. Chỉ đọc nguồn/HTML/tài liệu được giao, không DB/secret/tài liệu kỹ thuật ngoài khóa học, không browser hoặc test. [Report gốc](review.md) được sao nguyên byte từ `temp/review/2026-10-30-lesson-1-3-teach-brainstorm/review.md`; SHA256 report `2CE7D1A121C8865D4C6C81255A7CEEC4C772C7E429D15E1A0F75AD9FBB6FC1A8`. Tác giả đã đọc hết report.

Không có lỗi kiến thức có đủ căn cứ yêu cầu sửa hoặc lỗ tiền đề chặn năm câu ôn. Các quyết định dưới đây là hướng đề xuất, **chưa được áp dụng vào MDX**.

| Nhận xét | Quyết định | Căn cứ / đề xuất |
|---|---|---|
| F1: “chuỗi” xuất hiện lần đầu chưa nối với chữ | Làm theo trong đề xuất | Dùng “dữ liệu dạng chữ (còn gọi là chuỗi)” ở chính câu chuyển kiểu ngầm; nhắc giả định nhận chữ thay cho thêm glossary. |
| F2: chưa nói trực tiếp NgayVaoLam không nhận NULL | Làm theo trong đề xuất | Tác giả đọc script tại dòng 66: `NgayVaoLam date NOT NULL`. Sửa lời khuyên C4 gắn đúng cột, không thêm hình hoặc quy trình sửa cấu trúc. Đây là xác minh schema trong source, chưa phải metadata live. |
| F3: cân nhắc bỏ cảnh báo N'…' | Làm một phần | Giữ kiến thức theo lựa chọn mới của người dùng. Làm rõ vế hướng dẫn chỉ áp dụng khi tự viết giá trị tiếng Việt trong câu SQL. Tài liệu Microsoft xác nhận vai trò tiền tố cho hằng chuỗi Unicode. Không kết luận cảnh báo hiện tại sai. |
| F4: us_english thiếu nhãn; “số đầu” chưa cụ thể | Làm theo trong đề xuất | Nêu ngôn ngữ và DATEFORMAT riêng; sửa thành số 0 ở đầu, đúng lời giải thích đã có. |
| Giữ được: giả định lấy chữ hiển thị, sáu ô và ba khả năng | Làm theo: giữ | Đây là đường suy luận giải yêu cầu; không thay kết quả hoặc ép kết luận C2 chắc chắn sai ý. |
| Giữ được: DATEFORMAT theo phiên, đúng/hợp lệ và giới hạn import | Làm theo: giữ | Không biến giả định một công cụ/phiên thành quy tắc mọi cách nhập. |
| Giữ được: rounding/overflow và NOT NULL ở Hay nhầm | Làm theo: giữ | Câu ôn 4/5 đã được giảng trước phần ôn; không coi vị trí này là thiếu tiền đề hoặc ép chuyển vì khuôn. |
| Giữ được: câu trả lời cạnh bảng, năm câu ôn, ứng dụng và khung gộp | Làm theo: giữ | Giữ ba tiểu mục chính, toàn bộ phạm vi và không thêm SQL preview. |
| Gợi ý tăng vận dụng bằng đổi giá trị câu 4/5 | Không làm theo trong đề xuất này | Hai câu hiện kiểm giới hạn cần giữ và đã đủ tiền đề; đổi giá trị cần thêm xác minh, không cần để đạt mục tiêu làm rõ mạch. Ưu tiên câu 1 dưới đây. |
| Reviewer chưa kiểm UI/SQL/test và thời lượng | Làm theo: ghi riêng | Kiểm tác giả được liệt kê tách bên dưới; không lấy bằng chứng của tác giả thành kiểm reviewer. |

Đề xuất thêm của tác giả: đổi câu ôn 1 từ nhớ nơi xem sang đọc nhãn LuongCoBan đang có trong hình, giữ năm câu và giữ đường đi Columns trong đáp án. Đây là cải thiện việc kiểm mục tiêu, không phải thiếu kiến thức của bài hiện tại.

## Đối chiếu kỹ thuật do tác giả thực hiện

- Đọc đúng khai báo `NgayVaoLam date NOT NULL` trong script; không chạy script, đọc secret hoặc kết nối DB.
- [DATEFORMAT của Microsoft](https://learn.microsoft.com/en-us/sql/t-sql/statements/set-dateformat-transact-sql?view=sql-server-ver17) xác nhận thiết lập chi phối cách hiểu chuỗi ngày, mặc định us_english là mdy, không phải định dạng lưu/hiển thị. Không đề xuất mở thêm ngoại lệ định dạng trong bài này.
- [decimal/numeric](https://learn.microsoft.com/en-us/sql/t-sql/data-types/decimal-and-numeric-transact-sql?view=sql-server-ver17) xác nhận precision/scale, làm tròn khi giảm giới hạn và khả năng tràn số. Đối chiếu quy tắc không thay cho việc chạy lại các giá trị trên tài khoản khóa học.
- [char/varchar](https://learn.microsoft.com/en-us/sql/t-sql/data-types/char-and-varchar-transact-sql?view=sql-server-ver17) và [nchar/nvarchar](https://learn.microsoft.com/en-us/sql/t-sql/data-types/nchar-and-nvarchar-transact-sql?view=sql-server-ver17) hỗ trợ giới hạn byte, Unicode và vai trò tiền tố N cho chuỗi viết trong SQL; không thêm chi tiết bảng mã vào bài nhập môn.
- [NULL của Microsoft](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/null-and-unknown-transact-sql?view=sql-server-ver17) phân biệt NULL với rỗng/0; [định dạng số Excel](https://support.microsoft.com/en-us/excel/format-numbers) phân biệt cách hiển thị với giá trị dùng tính toán. Không thấy căn cứ sửa các kết quả minh họa từ các tài liệu này.

## Kiểm browser do tác giả thực hiện

In-app browser qua cua_repl, preview `http://127.0.0.1:4371/microsoft-sql-lession/bai/1-3-bang-cot-kieu-du-lieu/`, đúng HTML được giao. Viewport thực tế **1280×720**, article 670px; document scrollWidth 1270px. Bảng kiểu/sáu ô đều 670px, không tràn ngang; nội dung article không lộ backtick.

Đã xem vùng SSMS: hai nhãn NgayKetThuc (date, null) và LuongCoBan (decimal(18,0), not null) có viền xanh, đúng caption; đọc bảng kiểu trên trang. DOM giữ đúng hai ô Excel đánh dấu C2/D3, ô chọn C3 và các lớp số/ngày C2/D4 như report. Dùng Enter lần lượt mở đủ năm summary, focus đúng từng câu; cả năm đáp án có trong cây truy cập, code trong summary giữ đúng giá trị. Không bấm hoàn thành/đánh cờ, không đụng clipboard/nháp hoặc chạy SQL.

Evidence ignored: `temp/verification/2026-10-30-lesson-1-3-teach-brainstorm/` gồm version.json, browser-checks.json, ssms-metadata.png, type-reference.png.

## Kiểm máy và giới hạn

Không chạy lại suite/build cho lượt review vì không thay source/bộ đề/component và đã có build khớp. Kiểm toàn bộ thực hiện trước đó trong cùng chat sau sửa 1.1: 322/322, check 0 lỗi/0 cảnh báo/3 hint nền, build 132 trang, dist 1997 liên kết. Đây là baseline source hiện hành, **không phải lượt kiểm mới của 1.3** hoặc bằng chứng SQL live.

Không có connector azure-sql được cung cấp trong lượt này, không xác minh lại metadata/thiết lập phiên/các phép chuyển bằng SQL live. Không kiểm SSMS/Excel thật, copy/paste, screen reader, mobile hoặc 15 phút với học viên thật. Khi sửa bài sau khi duyệt, cần kiểm/review lại đúng phiên bản mới theo quy ước.

Thiết kế đề xuất chi tiết: [spec ngày 30/10](../../superpowers/specs/2026-10-30-lesson-1-3-teach-brainstorm-design.md). Chưa có kế hoạch triển khai hoặc thay đổi MDX trong lượt này.
