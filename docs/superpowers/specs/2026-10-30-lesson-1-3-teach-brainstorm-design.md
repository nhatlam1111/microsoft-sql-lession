# Bài 1.3: đề xuất làm rõ mạch, giữ phạm vi kiến thức

Trạng thái: bản đề xuất biên tập sau review ngày 30/10/2026; các mục 1–6 đã được triển khai ở [lượt sắp xếp lại](2026-10-30-lesson-1-3-reorder-design.md), lượt đó cũng thay quyết định giữ phạm vi kiến thức và vị trí hình dưới đây. Người dùng chọn “Làm rõ mạch giải thích, giữ phạm vi kiến thức hiện tại”. Người dùng tiếp tục yêu cầu một hình bảng–dòng–cột dễ liên tưởng Excel; phạm vi bổ sung hình được ghi riêng bên dưới.

## Các hướng đã cân nhắc

- Làm rõ mạch, giữ kiến thức: ưu tiên người dùng đã chọn. Biên tập ngay câu đang có, giữ ba nhịp chính và các giới hạn.
- Giảm độ sâu/chuyển chi tiết sang bài sau: có thể giảm tải nhưng thay phạm vi kiến thức hiện tại; không chọn.
- Chỉ sửa chỗ sai/mơ hồ, giữ thứ tự: ít tác động nhưng bỏ qua cơ hội làm câu ôn đầu kiểm trực tiếp năng lực đọc nhãn cột.

## Đề xuất cụ thể

1. **Nối thuật ngữ với cách lấy file.** Ở đoạn chuyển kiểu ngầm (dòng 48 hiện tại), dùng “dữ liệu dạng chữ (còn gọi là chuỗi)” ngay lần đầu. Nhắc ngắn “theo cách lấy file đã giả định” để nối ô ngày/số trong Excel với chữ mà SQL Server nhận; giữ tên chuyển kiểu ngầm và giới hạn lưu được chưa chắc đúng ý. Không thêm đoạn định nghĩa riêng.
2. **Nói rõ cột ngày đang không nhận NULL.** Ô lời khuyên cho C4 đổi thành: “`NgayVaoLam` không nhận `NULL`: cần xác minh ngày, không điền đại.” Script `database/HRM_Demo.sql:66` khai báo `date NOT NULL`; chưa đối chiếu metadata live trong lượt review này. Giữ kết quả sáu ô và giả định chỉ xét hai cột.
3. **Đặt nhãn cho thiết lập phiên.** Trong đoạn DATEFORMAT, dùng “ngôn ngữ `us_english`, `DATEFORMAT` là `mdy` (tháng/ngày/năm)”. Giữ phạm vi phiên tài khoản khóa học và điều kiện xác nhận ý người nhập; không mở thêm bài về thiết lập hệ thống.
4. **Giữ cảnh báo Unicode, làm rõ luồng viết SQL.** Giữ Hay nhầm 3 và ví dụ N'Trần Thị Mai', nhưng mở vế hướng dẫn bằng “Khi tự viết một giá trị tiếng Việt trong câu SQL, …”. Không chuyển quy tắc tiền tố này thành cách sửa nội dung ô Excel; không dùng thuật ngữ literal chưa cần thiết. Giữ dẫn bài 2.7.
5. **Cụ thể hóa ứng dụng.** Đổi “giữ số đầu” thành “giữ số `0` ở đầu”, khớp lý do chọn kiểu chữ cho mã định danh.
6. **Câu ôn 1 kiểm việc đọc nhãn.** Thay câu chỉ hỏi nơi xem bằng “Từ nhãn `LuongCoBan (decimal(18,0), not null)`, bạn đọc được gì?”. Đáp án nói kiểu số có tối đa 18 chữ số, không có chữ số phần lẻ khi lưu, không nhận NULL; vẫn nhắc vị trí Object Explorer → bảng → Columns. Cách làm tròn đã có ở Hay nhầm 1. Giữ tổng năm câu, các câu 2–5 và dữ kiện cũ; dùng code đúng trong summary MDX.

## Phần giữ và nghiệm thu nếu triển khai

Giữ nguyên title/URL/schema, noExercises, 15 phút dự kiến, ba tiểu mục chính, khung gộp, bảng sáu kiểu/sáu ô, toàn bộ dữ liệu/mark/numeric/selected Excel và Ssms. Giữ byte/độ dài cố định/Unicode, DATEFORMAT, decimal/làm tròn/tràn số, NULL/NOT NULL, giả định nhập file và các giới hạn nghiệp vụ; không thêm SQL preview hoặc bài tập mới. Chưa đo thời lượng với người học thật.

Khi thực hiện, đối chiếu metadata `NgayVaoLam` bằng SELECT nếu có connector theo mục 5 quy ước; không ghi dữ liệu chung. Bất kỳ ví dụ/giá trị mới nào cần kiểm lại trước khi đưa vào bài. Chạy test/check/build/check:dist tuần tự, giữ bảo vệ kiến thức khi cập nhật assertion; xem build và giao reviewer mới. Cập nhật hồ sơ/spec/plan theo kết quả thật, không lấy report lần này làm review hậu sửa.

## Căn cứ

[Report độc lập](../../reviews/2026-10-30-lesson-1-3-teach-brainstorm/review.md) và [ma trận xử lý/kiểm tác giả](../../reviews/2026-10-30-lesson-1-3-teach-brainstorm/verification.md). Reviewer xác nhận đủ tiền đề năm câu ôn; không kết luận lỗi kiến thức cần sửa. Câu ôn 1 là đề xuất thêm của tác giả để bám mục tiêu đọc kiểu/null, không phải lỗi chặn học.

## Bổ sung theo yêu cầu: hình bảng–dòng–cột

Người dùng yêu cầu một hình để người học nhìn bảng/dòng/cột và liên tưởng ngay tới Excel. Sau bản nháp đầu, người dùng làm rõ hình phải là **bảng trong database**, không phải worksheet Excel, và chọn khối database nhỏ phía sau với bảng NhanVien phóng lớn phía trước. Sau khi xem bản này, người dùng yêu cầu làm đơn giản hơn, giảm chữ chú thích. Các quyết định này thay thiết kế lưới Excel ban đầu.

Dùng built-in ImageGen chỉnh hình thành bảng database: có nhãn Database, tên bảng NhanVien và ba tên cột thật MaNV/HoTen/NgayVaoLam. Dòng NV005 vàng, cột HoTen viền xanh; chỉ giữ ba callout ngắn “Bảng”, “Dòng”, “Cột”, bỏ tiêu đề lớn và các câu chú thích phụ. Không chữ A/B/C, số dòng, thanh công thức hay khung Excel. Hình không có kiểu dữ liệu/cú pháp SQL/biểu tượng khóa để giữ trọng tâm cấu trúc.

Dữ liệu minh họa dùng ba hồ sơ NV001/NV005/NV014 với họ tên/ngày vào làm đã có trong hồ sơ công ty và bài 1.1. Đây là hình khái niệm, không phải kết quả SQL live. Giữ ảnh gốc của công cụ, dùng bản cuối src/assets/lessons/1-3-database-table.png. Bản nháp Excel đã bị loại khỏi source/assets, giữ bản gốc và bản sao trong evidence; prompt/công cụ bản cuối tại 2026-10-30-lesson-1-3-database-illustration-prompt.md.

Đặt ảnh ở đầu phần chính, trước tiểu mục đầu và bảng Excel của tình huống. Đưa lời định nghĩa bảng/dòng/cột đang có lên cạnh ảnh, gọi đúng bảng database NhanVien và cột HoTen; không giảng lặp phía dưới. Các tham chiếu C2–D4 vẫn chỉ về bảng Excel tình huống gần nhất. Figure rộng theo article, dùng Astro Image/WebP và base path hiện có, alt/caption tự đủ; không đổi component/CSS chung. Chỉ bổ sung ảnh và lời dẫn cần thiết, không tự áp dụng sáu đề xuất biên tập phía trên.

Kiểm test/check/build/dist, bản build desktop và một chiều rộng hẹp; reviewer mới đọc đúng source/build/ảnh, không report cũ. Ghi riêng giới hạn đọc source, UI và SQL live; giữ URL/frontmatter/15 phút/noExercises, dữ liệu và thuộc tính Excel/Ssms, năm câu ôn. Tiến độ tại [plan hình minh họa](../plans/2026-10-30-lesson-1-3-table-illustration.md).

Kết quả bổ sung hình: đã thay bằng bản database chỉ ba callout ngắn, loại bản worksheet khỏi assets/dist, giữ toàn bộ hình/data/câu ôn gốc của tình huống. Bốn kiểm bắt buộc đạt (322 test, check 0 lỗi/0 cảnh báo/3 hint nền, 132 trang/1998 liên kết), browser 1280/1024px và năm câu ôn bằng Enter đã kiểm. Reviewer mới xác nhận đủ tiền đề, không yêu cầu sửa hình/lời dẫn. [Hồ sơ bản cuối](../../reviews/2026-10-30-lesson-1-3-database-illustration/verification.md) tách đúng kiểm tác giả/reviewer và giới hạn. Sáu đề xuất biên tập đầu tài liệu vẫn chưa triển khai; giữ bản local, không commit/push/deploy.
