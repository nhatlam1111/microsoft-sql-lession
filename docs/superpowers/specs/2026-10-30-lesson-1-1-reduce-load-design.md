# Bài 1.1: giảm tải, giữ mạch kể

Người dùng duyệt kế hoạch và yêu cầu triển khai ngày 30/10/2026. Lượt này tiếp nối thiết kế ngày 29/10; các điều chỉnh dưới đây thay yêu cầu cũ về phần Ghi nhớ và dẫn sang nhập file ở bài 1.1. Chỉ bàn giao local.

## Hướng đã chọn

- Giảm tải, giữ mạch: được chọn; rút nhánh phụ và căn phần ôn theo mục tiêu.
- Biên tập tối thiểu: giữ toàn bộ độ sâu nhưng chưa xử lý trọng tâm Ghi nhớ.
- Thiết kế lại cách dẫn: thay đổi rộng hơn nhu cầu hiện tại; không chọn.

## Nội dung được duyệt

- Giữ bốn nhịp kể, nhân vật/giả định, ba ảnh khái niệm, toàn bộ dữ liệu/thuộc tính hình Excel, các ví dụ ngày/khóa và giới hạn của database. Giữ URL, frontmatter, 12 phút, noExercises và component.
- Bỏ câu cuối đoạn giới thiệu nguồn chung nhắc lại việc không phải sửa từng file; bỏ vế nhập file ở đoạn ràng buộc và vế dán/kéo điền trong Hay nhầm. Giữ Excel có Data Validation và cần thiết lập.
- Giữ T-SQL để bài 1.2 dùng tiếp; không cắt điều kiện ràng buộc được khai báo/đang bật, khả năng mã hợp lệ vẫn gán nhầm người, file xuất theo thời điểm hoặc giới hạn lịch sử.
- Đặt “Ở bài này chỉ cần…” ở cuối phần chính, sau câu trả lời tình huống; chốt đủ ba phần mục tiêu trước các dẫn sang bài đi sâu.
- Ghi nhớ mở bằng một câu về database/SQL Server/SQL; Memo còn hai đối chiếu workbook–database và file riêng–nguồn chung; kết bằng “Hợp lệ chưa chắc đã đúng hồ sơ.” Không đổi Memo chung.
- Giữ bốn câu tự kiểm tra; câu thứ ba dùng người thuộc Kế toán bị gán KD trong danh mục, đúng ví dụ đã giảng. Đáp án phân biệt kiểm mã với xác nhận đúng hồ sơ.

## Kiểm và review

Chạy npm test, npm run check, npm run build, npm run check:dist theo thứ tự để tránh tranh chấp cache Astro. Xem bản build qua browser: ba ảnh/caption, hình Excel, Ghi nhớ, vị trí đoạn chốt, bốn câu ôn và thao tác mở bằng bàn phím. Ghi kích thước viewport thật và giới hạn; không lấy kiểm HTML thay kiểm tương tác.

Reviewer mới theo mục 4.5 quy ước: fork_turns none, kế thừa model phiên, không đọc review cũ/nhận xét tác giả, không DB/secret/runner, chỉ ghi report được giao. Đọc toàn bài/ảnh và kiểm tiền đề từng câu ôn. Xử lý mọi nhận xét theo mục 4.6, giữ bản gốc report và tách bằng chứng tác giả/reviewer.

Không có SQL, số liệu thật, API hay bộ đề thay đổi nên không chạy DB hoặc check:exercises. Không thêm test chỉ chép câu chữ; khi bỏ một hàng Memo, assertion phải kiểm cùng ý khóa chính ở phần giảng còn giữ. Không thay quy ước/template, không push/deploy. 12 phút là nhãn dự kiến, chưa đo với người học thật.

## Kết quả

Đã thực hiện đủ nội dung duyệt; frontmatter, hình Excel và ba figure được đối chiếu nguyên khối với HEAD. Assertion cũ về khóa chính chuyển từ hàng Memo đã bỏ sang định nghĩa trong phần giảng; 322/322 test, check 0 lỗi/0 cảnh báo/3 hint nền, build 132 trang và dist 1997 liên kết đều đạt.

Browser 1363×871 và 1024×871: phần ôn không tràn ngang, ba ảnh tải đúng base, hình Excel giữ dấu đánh và bốn câu ôn mở bằng Enter. Reviewer mới kế thừa model phiên đọc toàn bài/HTML/PNG, xác nhận đủ tiền đề và không có mục cần sửa. [Report và ma trận](../../reviews/2026-10-30-lesson-1-1-reduce-load/verification.md) tách kiểm tác giả/reviewer và các phần chưa xác minh. Không đổi source sau review; giữ local, không commit/push/deploy.
