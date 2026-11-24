---
name: sql-course-gif
description: Dựng, sửa hoặc kiểm storyboard và GIF minh họa SQL Server cho khóa BA/PM. Dùng khi được giao mã bài, câu SQL, hàm hoặc diễn biến khái niệm cần thể hiện bằng dữ liệu chuyển động.
---

# GIF cho khóa SQL Server

Người học quen Excel phải chỉ được vì sao một hồ sơ đi tiếp, một ô nhận giá trị đó hoặc một trạng thái thay đổi. Mỗi câu được giải thích độc lập có một GIF đi được hết câu. Một khung có thể gom các bước ngắn. Thao tác khó có thể chiếm nhiều khung. Đặt SQL đang xét và bảng/sơ đồ trong ảnh; đặt câu hỏi, phần diễn giải, phạm vi trích và bằng chứng ở phần đọc kèm. Bài khái niệm dùng nhãn thiết yếu như tên phiên hoặc mốc thời gian.

### Bắt đầu bằng mã bài

1. Đọc [quy trình](../../../docs/bien-soan.md) mục ảnh động và [quy ước](../../../docs/quy-uoc.md) mục 2.6a. Tìm đúng mã trong [bản đồ 52 bài và 6 phụ lục](references/course-map.md). Mở MDX qua liên kết của dòng đó, xem SQL ngay trước flow, `query`, `steps`, ví dụ/drawer và câu tự kiểm liên quan. Khi sửa bài MDX, dùng thêm `course-author`. Quy ước hiện hành quyết định việc đưa tài nguyên vào site.
2. Xác định phạm vi từ lời giao. “Storyboard” → giao khung tĩnh trước/giữa/sau. “Tạo GIF” → dựng và kiểm **file GIF thật**. “Đưa vào bài” → thêm bước tích hợp bằng hợp đồng repo. Nếu chỉ cho mã bài, kiểm từng câu được giảng độc lập; bài có nhiều câu thì đặt ID riêng. Khi bài còn đề cương, ghi rõ giả định và phân biệt dữ liệu minh họa với dữ liệu thực của khóa.
3. Ghi một câu hỏi có thể trả lời bằng cách chỉ vào hình. Chọn khóa theo dõi, một trường hợp điển hình và một trường hợp cho kết quả khác. Tự lần chúng qua từng mệnh đề; ghi lại các dòng trùng, khóa ghép, NULL, giá trị trung gian và tổng trên toàn tập. Với SQL lấy dữ liệu đã kiểm của bài. Khi thiếu số liệu, dùng quy trình đối chiếu theo mục 3/5 của quy ước hoặc nêu cụ thể phần chưa xác minh.
4. Tra **một dòng** trong bản đồ khóa. Với động tác từ video, mở đúng keyword ở [10 mẫu chuyển động](references/video-motion.md); với họ mới, dùng cột “Khung hình đề xuất” làm điểm xuất phát. Đặt các nhánh độc lập cạnh nhau; giữ mã hồ sơ ở khung kế tiếp. Luôn chọn hướng chuyển động theo ý nghĩa dữ liệu.
5. Vẽ storyboard theo [phiếu cảnh và hướng dẫn GifGen](references/authoring.md). Sau đó theo [cách dựng và kiểm GIF](references/render.md). Sol hoặc Terra có thể thực hiện trọn quy trình này trong một phiên. Chỉ mở các tài liệu và ví dụ cần cho thao tác đang làm.

### Tiêu chí bàn giao

- Hình có điểm nhìn rõ tại tốc độ thường. Ở khung giữa, người xem thấy được điều gì đang xảy ra giữa dữ liệu nguồn và kết quả. Với nhiều kết quả, lần được từng cột.
- Kiểm lại **file đã mã hóa** cùng tổng thời gian, loop, vị trí giữa chuyển động và khoảng giữ kết quả. Kiểm chữ tiếng Việt, dấu nháy SQL, chữ số cuối hàng ở 720 px; ở 390 px kiểm lối đọc bảng tĩnh hoặc ảnh gốc theo chế độ giao. Nêu đúng mức kiểm nguồn, SQL, ảnh, HTML và tương tác thực tế.
- Trả đường dẫn tới GIF hoặc storyboard đúng yêu cầu, nguồn dựng tái lập, phạm vi dữ liệu và giới hạn còn lại. Với tích hợp, bàn giao cả poster, ảnh tĩnh, bảng HTML và manifest theo [hướng dẫn dựng của repo](../../../scripts/animations/README.md).

**Ví dụ giao việc:** `Dùng $sql-course-gif dựng GIF bài 3.15. Cho thấy tổng phòng xuất hiện cạnh từng dòng lương. Giao bản xem thử và khung giữa phép tính.`
