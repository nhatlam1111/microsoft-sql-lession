# Bài 1.1: một câu chuyện từ hai bản Excel tới câu trả lời

Trạng thái: người làm khóa học đã duyệt và đã triển khai ngày 30/10/2026; kết quả ở cuối tài liệu. Tài liệu này thay các quyết định giữ nguyên hình Excel, giữ ví dụ ngày/khóa và thứ tự bốn nhịp ở [thiết kế 29/10](2026-10-29-lesson-1-1-story-and-image-design.md) và [thiết kế giảm tải 30/10](2026-10-30-lesson-1-1-reduce-load-design.md); các quyết định khác ở đó vẫn giữ.

## Vì sao làm

Người làm khóa học muốn học viên mới hiểu được bài mở đầu. Tác giả rà ra ba vấn đề: tiểu mục 3 rẽ khỏi chuyện của Quân sang một file có ba lỗi khác, dồn bảy thuật ngữ mới; bài nói hệ thống từ chối "câu ghi" trước khi học viên biết SQL Server và SQL; tiểu mục "Lấy lại danh sách cho chị Hạnh" lại mở bằng định nghĩa SQL Server.

## Mục tiêu và giới hạn

- **Mục tiêu:** cả bài bám một câu chuyện; ba khái niệm database, SQL Server, SQL đứng liền nhau; luật dữ liệu chỉ nêu ý chính, không dạy tên các khóa.
- **Không làm:** không đổi tình huống, giả định, ba ảnh khái niệm, URL, 12 phút, `noExercises`, component hay CSS; không thêm SQL hay bảng Markdown (test chặn).
- **Coi là hỏng nếu:** bài gọn hơn nhưng hứa quá khả năng của database, hoặc bài sau mất điểm tựa.
- **Giữ cho bài sau:** bảng `NhanVien` (1.3 trỏ về), định nghĩa database và SQL Server (1.2 nhắc lại), T-SQL (1.2 dùng), lời dặn chỉ đọc dữ liệu dùng chung.
- **Giữ về độ chính xác:** luật chỉ kiểm khi đã khai báo và đang bật; hợp lệ chưa chắc đã đúng; file xuất phản ánh lúc lấy; lịch sử cần thiết kế lưu; câu trả lời giới hạn ở dòng của Quân.

## Các hướng đã cân nhắc

- **Thay bằng hình hai bản lệch nhau của Quân:** được chọn. Bỏ hẳn đoạn rẽ, tiêu đề "Từ hai bản Excel…" có đúng thứ để nhìn. Cái giá là thêm dữ liệu minh họa cho Quân và mất ví dụ trực quan về lỗi nhập liệu; bài 1.3 và 1.4 đã có ví dụ riêng.
- **Giữ hình ba lỗi, rút lời giảng:** không chọn. Ít sửa nhất nhưng bài vẫn mở một file không liên quan tới câu hỏi của chị Hạnh.
- **Giữ tên các khóa, chỉ xếp lại thứ tự:** người làm khóa học không chọn; tên khóa để 1.3 và 1.4 dạy.

## Cấu trúc được chốt

Giữ tiêu đề phần chính "Từ hai bản Excel đến một nguồn dữ liệu chung".

**1. Một lần chuyển phòng, hai bản khác nhau.** Mạch hiện tại, thêm hai hình Excel ngay sau đoạn kể việc sửa bản của chị Hạnh. Giữ đoạn về nguồn chính thức.

**2. Đưa hồ sơ về một nguồn chung.** Định nghĩa database, ảnh database, ánh xạ workbook–sheet với database–bảng, dòng và cột, bảng `NhanVien`. Câu "thống nhất chưa chắc đã đúng" chuyển sang tiểu mục 4.

**3. Đọc nguồn chung bằng SQL Server và SQL.** Định nghĩa SQL Server, ảnh; định nghĩa SQL và T-SQL, ảnh; đoạn file xuất.

**4. Căn cứ để xác định bản đúng.** Thống nhất chưa chắc đã đúng → một đoạn về luật dữ liệu → hợp lệ chưa chắc đã đúng, dùng ví dụ Quân → ba bước → kết luận ở dòng của Quân → đoạn "Ở bài này chỉ cần…".

## Hình Excel mới

Hai khối `Excel` xếp dọc, lời dẫn nói rõ là file minh họa, không phải dữ liệu trong database. Ba cột `Mã NV`, `Họ tên`, `Phòng ban`, ba dòng dữ liệu giống nhau ở hai bản trừ ô phòng của Quân:

- `NV001`, `Trần Thị Mai`, `Kế toán`
- `NV005`, `Vũ Thị Lan`, `Kế toán`
- `NV052`, `Trương Anh Quân`, `IT` ở bản của chị Hạnh; `Kinh doanh` ở bản của chị Thảo

Ô `C4` được tô và chọn ở cả hai hình. `NV052` nằm ngoài 48 hồ sơ và tiếp nối mã minh họa `NV049`–`NV051` của bài 1.3; họ `Trương` không trùng hồ sơ nào. Ghi các chi tiết này vào `ho-so-cong-ty.md` mục 5 và 7.

## Đoạn luật dữ liệu

Một đoạn, không có tên khóa chính, khóa ngoại hay ràng buộc: người thiết kế có thể khai báo **luật dữ liệu**, như cột ngày chỉ nhận ngày, mã nhân viên không được trùng, mã phòng phải có trong danh mục; khi luật đang bật, SQL Server từ chối dữ liệu vi phạm. Với Quân, luật kiểm được mã phòng có thật, không biết Quân đã chuyển phòng hay chưa.

## Phần sửa kèm

- **Câu ôn 3:** đổi thành hỏi nguồn chung còn ghi Quân ở phòng cũ thì database có tự phát hiện không. Giữ bốn câu ôn.
- **Ứng dụng, Hay nhầm, Ghi nhớ:** giữ nguyên, chỉ sửa nếu còn trỏ tới phần đã bỏ.
- **Test:** cập nhật `1.1 scopes constraints…` theo ý còn giữ; bỏ 1.1 khỏi test ngày căn phải vì hình mới không có ngày; thêm test thứ tự: hai hình Excel ở tiểu mục 1, SQL Server trước đoạn luật, không dạy `khóa chính`, `khóa ngoại`, `constraint` trong phần giảng.
- **Bài khác:** không sửa. Chú thích `Ssms` ở bài 1.2 nhắc `NULL` nhưng đã trỏ sang 1.3 và 1.4.

## Tác giả tự quyết khi viết

- Câu chữ cụ thể, tuân theo `docs/quy-uoc.md`, giới hạn 120 chữ mỗi đoạn.
- Tiêu đề tiểu mục 3 và 4 có thể chỉnh nhẹ để khớp nội dung, không dùng "Trả lời chị Hạnh".
- Đoạn "Ở bài này chỉ cần…" vẫn trỏ tên khóa chính, khóa ngoại sang các bài sau.

## Kiểm và bàn giao

Chạy tuần tự `npm test`, `npm run check`, `npm run build`, `npm run check:dist`, xem bản build ở 1280px và 1024px, rồi giao reviewer mới theo mục 4.5 và xử lý theo mục 4.6. Hình mới là minh họa nên không cần chạy SQL; dữ liệu `NV001`, `NV005` đối chiếu với hồ sơ công ty. Giữ bản local, không commit, push hay deploy nếu chưa được đồng ý.

## Kết quả

Đã triển khai đủ bốn tiểu mục, hai hình Excel và đoạn luật dữ liệu. Reviewer mới (Sonnet, effort high) có 2 mục Cần sửa; tác giả xử lý toàn bộ nhận xét trước khi bàn giao. Bài còn 1.872 từ theo `wc`, trước đó 2.114. Review tích hợp dẫn tới hai sửa nhỏ ở bài 1.4, khác với mục "Bài khác: không sửa" ở trên, vì 1.1 không còn định nghĩa "câu ghi" và "ràng buộc". Bản cuối đạt 329/329 test, check 0 lỗi, build 132 trang, `check:dist` 1998 liên kết. [Ma trận xử lý và giới hạn](../../reviews/2026-10-30-lesson-1-1-one-story/verification.md).
