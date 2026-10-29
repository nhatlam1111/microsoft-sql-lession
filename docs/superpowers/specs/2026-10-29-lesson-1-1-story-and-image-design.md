# Bài 1.1: lời dẫn liền mạch và hình minh họa

Người dùng chọn ngày 29/10/2026: viết lại kèm hình ảnh, theo đề xuất hai bản riêng → nguồn chính thức → cấu trúc/luật → lấy lại danh sách cho chị Hạnh. Đây là lựa chọn triển khai local, chưa phải quyền push/merge/deploy. Chỉ bài 1.1, giữ URL/schema, 12 phút, khung phần cuối và dữ liệu mẫu.

## Các hướng đã cân nhắc

- Chỉ viết lại lời dẫn và dùng hình Excel đang có: ít hình, nhưng người mới phải tự hình dung cách dùng chung nguồn.
- Viết lại và thêm minh họa tại điểm chuyển sang nguồn chung: người dùng đã chọn hướng này. Hình giúp nhìn cách tổ chức, lời văn vẫn tự đủ nghĩa.
- Chỉ thêm hình vào bản cũ: không xử lý việc câu chuyện bị ngắt bởi nhiều thuật ngữ; không chọn.

## Thiết kế đã chọn

Giữ chị Hạnh/chị Thảo/Quân là nhân vật giả định, cùng so danh sách hiện tại và việc chuyển phòng đã hiệu lực. Phần chính có bốn nhịp: vì sao hai bản khác nhau; nguồn chung lưu bảng/dòng/cột thế nào; luật giúp kiểm gì; SQL/SQL Server giúp đọc lại danh sách và khép tình huống. Dùng Quân để chuyển ý, không lặp lại nguyên tình huống hoặc thêm sự việc công ty mới. Chỉ giới thiệu SQL Server/SQL khi cần giải thích cách truy cập nguồn.

Theo điều chỉnh tiếp theo của người dùng, dùng ba hình ImageGen (built-in) gắn với khái niệm, không có nhân vật: database là tập dữ liệu có tổ chức, SQL Server là phần mềm quản lý database, SQL là ngôn ngữ gửi yêu cầu. Đặt mỗi hình cạnh lời định nghĩa tương ứng, nhãn/alt/caption là chữ HTML dễ đọc; SQL trong hình chỉ là ba chữ, không có câu SQL xem trước. Đây là minh họa, không phải dữ liệu/kết quả SQL thật. Không thể hiện Excel tự đồng bộ, database tự biết Quân chuyển phòng hoặc tự lưu lịch sử. Giữ hình Excel hiện có, nguyên ô/mark/số liệu.

Ảnh được lưu trong workspace và dùng URL theo BASE_URL. Figure native, kích thước nội tại, co theo chiều rộng bài, không đổi hệ thống bố cục/component/API. Tiếp tục typography/màu/chiều rộng theo DESIGN.md; chỉ ghi thêm hợp đồng hình nội dung nếu cần.

Quyết định khi triển khai: lưu ba PNG gốc trong `src/assets/lessons/`, dùng Astro Image sinh WebP360/720 và tự xử lý base path, không tham chiếu ảnh ngoài workspace. Figure hai cột gồm ảnh nhỏ và chú thích khái niệm, xếp dọc dưới560px; không biến ảnh thành một màn giao diện có thao tác. Bản nháp có nhân vật bị loại và không còn trong project. Prompt nguyên văn tại `2026-10-29-lesson-1-1-illustration-prompt.md`.

## Kiến thức phải giữ

Phân biệt database/SQL Server/SQL/T-SQL; workbook–sheet với database–bảng, dòng/bản ghi và cột/kiểu. Nguồn chung có thể cũ; luật chỉ kiểm khi đã khai báo và đang bật; ngày lưu được vẫn sai hồ sơ; khóa ngoại chỉ kiểm mã có trong danh mục; mã hợp lệ vẫn gán nhầm người. File xuất phản ánh lúc lấy; lịch sử cần thiết kế lưu, bộ mẫu không giữ lịch sử chuyển phòng. Câu trả lời cần căn cứ quyết định/ngày hiệu lực, người có quyền cập nhật, so cùng nguồn/thời điểm/điều kiện và giới hạn kết luận ở dòng của Quân. Giữ ít nhất bốn tự kiểm tra phủ mục tiêu.

Rút giải thích lặp, giữ dẫn sang 1.2/1.3/1.4/1.5/1.6/5.2/5.5/6.6 đúng chỗ. Không thêm SQL preview, đáp án, dòng dữ liệu mới hoặc cập nhật quy ước/template chung khi chưa được duyệt.

## Nghiệm thu

Kiểm kiến thức/giới hạn bằng test hiện có, thay khóa câu chữ khi cần mà không nới bảo vệ. Không thêm test chỉ chép lại văn bản. npm test/check/build/check:dist; xem build1280/1440, một chiều rộng hẹp, ảnh tải đúng BASE_URL/không méo, alt/caption, ảnh Excel, TOC, tự kiểm tra bằng bàn phím và đối chiếu1.2. Reviewer mới kế thừa model phiên theo AGENTS, đọc toàn bài/hình/bốn câu ôn, tách source/HTML/UI và không đọc review cũ. Ghi report/ma trận và giới hạn; không chạy DB vì không đổi SQL hay dẫn chứng.

## Kết quả thực hiện

Đã có ba ảnh khái niệm đúng lựa chọn sau cùng, không có nhân vật; giữ bốn nhịp kể và mục tiêu. Reviewer mới xác nhận đủ tiền đề bốn câu ôn. E1 đổi thành học cách viết ở 1.6 để khớp mẫu chạy trước ở 1.2, addendum đã xác nhận. Kết quả: 322 tests; check 0 lỗi, 0 cảnh báo, 3 hint nền; build 132 trang / dist 1997 liên kết. Desktop 1280/1440 và 1024 đã kiểm; 390px bị giới hạn khung desktop cũ (1.2 cũng vậy), không nghiệm thu mobile. [Verification](../../reviews/2026-10-29-lesson-1-1/verification.md) tách kiểm thật, audit nền và giới hạn. Giữ bản local chờ người dùng review, không sửa chuẩn chung/merge/push.
