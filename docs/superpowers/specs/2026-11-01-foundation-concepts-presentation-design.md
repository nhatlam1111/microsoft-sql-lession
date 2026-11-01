# Thiết kế lại bài giảng Làm quen theo khái niệm

Trạng thái: người làm khóa học đã chọn cách tiếp cận ví dụ nhân sự được mở dần; thiết kế chi tiết dưới đây chờ duyệt trước khi sửa sản phẩm. Base `b2e4c3cd0d9c2d1a22a05b6820affc5c07295e75`.

## Mục đích và kết quả cần đạt

Giới thiệu lại sáu chủ đề: database, SQL Server, SQL, bảng/dòng/cột, lý do và tác dụng của PK/FK (gồm trường hợp không khai báo), cách đọc ERD. Người học đã học phần Làm quen; lần giảng này vẫn giải thích lại khái niệm tại chỗ, không đòi nhớ bài cũ để hiểu một slide.

Mỗi slide có hình mang nội dung cần giảng và 2–3 câu diễn giải ngắn. Học viên nhìn màn chiếu phải biết khái niệm là gì, dùng để làm gì và hình đang chứng minh điều gì. Ghi chú giúp người giảng mở rộng lý do/hiểu nhầm, không giữ riêng lời giải thích cốt lõi.

Đề xuất 18 slide, gồm slide mở đầu đi thẳng vào database và slide cuối đọc sơ đồ ba bảng để tổng kết. Giữ khung buổi đã chốt: 48 phút giảng/trao đổi, 7 phút hỏi đáp, tổng 55 phút. Không có trang bìa rỗng hay slide kiểm tra riêng trong bản mới. Hỏi miệng khi giảng vẫn được nhưng không phải tiền đề để biết định nghĩa.

## Các cách tiếp cận đã cân nhắc

1. Từng khái niệm độc lập: mỗi phần có định nghĩa/hình/ví dụ riêng. Dễ tra lại nhưng cần thêm lời dẫn để liên hệ các phần.
2. **Ví dụ nhân sự được mở dần — người dùng đã chọn:** từ database chứa các bảng, tới nhu cầu nhận diện dòng và giữ mã tham chiếu, cuối cùng nhìn lại bằng ERD. Hình và dữ liệu nhất quán giúp người học thấy lý do xuất hiện của từng khái niệm; cần chuẩn bị hình cho từng mức phóng to.

Các quyết định phân bổ 18 slide, câu SQL minh họa và thời lượng từng slide là đề xuất của người thiết kế theo hướng đã chọn, chưa gọi là người dùng đã duyệt chi tiết.

## Kịch bản 18 slide

| # / phút | Tiêu đề | Nội dung nhìn thấy và hình chính | Bài nguồn |
|---|---|---|---|
| 1 / 2 | Database là gì | Database là tập dữ liệu có cấu trúc được phần mềm quản lý. Hình một database nhân sự chứa các bảng, đi cùng diễn giải dùng chung theo quyền; không đồng nhất database với một file Excel. | 1.1 |
| 2 / 2 | Dữ liệu bên trong database nhân sự | Hình mở database ra ba bảng `NhanVien`, `PhongBan`, `HopDong`, có nhãn tiếng Việt tương ứng. Mỗi bảng giữ một nhóm thông tin có liên quan; đặt người/phòng/hợp đồng cạnh nhau để chuẩn bị cho phần tách bảng. | 1.1 |
| 3 / 2 | SQL Server là gì | SQL Server là phần mềm Microsoft quản lý database, nhận yêu cầu rồi đọc/cập nhật theo quyền và luật đã khai báo. Hình phần mềm trên máy chủ quản lý database; giữ riêng nhãn máy chủ và phần mềm để không hiểu chúng là một. | 1.1 |
| 4 / 3 | SQL là gì | SQL là ngôn ngữ diễn đạt yêu cầu đọc và thay đổi dữ liệu; yêu cầu lấy dữ liệu gọi là truy vấn. Hình yêu cầu “Lấy họ tên nhân viên” → `SELECT HoTen FROM NhanVien;` → một cột họ tên trích kết quả; chỉ đọc minh họa, không dạy cú pháp hay cho chạy. | 1.1 |
| 5 / 3 | Database, SQL Server và SQL | Một sơ đồ đường đi: người dùng qua công cụ SSMS gửi yêu cầu SQL tới SQL Server, SQL Server xử lý trên database và trả kết quả về. Có lời diễn giải vai trò của từng tên; SSMS chỉ là công cụ trong hình, không thành một phần giảng riêng. | 1.1 |
| 6 / 2 | Bảng trong database | Phóng to `NhanVien` từ hình database. Bảng tổ chức dữ liệu cùng loại thành dòng và cột; một khung dữ liệu trích được đánh dấu rõ là bảng. | 1.2 |
| 7 / 3 | Dòng và cột | Trên cùng bảng, đánh dấu toàn dòng `NV001` và cột `HoTen`. Dòng là một hồ sơ trong bảng này; cột là một thuộc tính như họ tên, mã phòng. Đổi sang `HopDong` thì mỗi dòng là một hợp đồng. | 1.2 |
| 8 / 3 | Thông tin ở nhiều bảng | Một hồ sơ `NV021` đặt cạnh ba hợp đồng và danh mục phòng. Tách thông tin hồ sơ, hợp đồng và phòng giúp giảm lặp và sửa sót; mã dùng để tham chiếu thông tin giữa các bảng. | 1.2 |
| 9 / 2 | Nhận diện một hồ sơ | Cùng hai dòng nhân viên thật, phóng to `MaNV`. Họ tên có thể trùng hoặc thay đổi; cần một cách nhận diện dòng rõ ràng. Chỉ đặt tên cột là “mã” chưa tự tạo luật cấm trùng. | 1.4 |
| 10 / 3 | Khóa chính | Trên `NhanVien.MaNV`, hiện nhãn PK và giải thích khi khai báo: các giá trị không trùng, không nhận NULL (chưa có giá trị). Đối chiếu dòng được nhận với mã trùng bị từ chối bằng hình mô tả luật, không giả Results chạy ghi. | 1.4 |
| 11 / 3 | Bảng không khai báo khóa chính | Hai hình giả định có/không có luật PK, giữ cùng cấu trúc cột. Bảng thông thường vẫn lưu/đọc được khi không khai báo PK; nếu không có luật khác chặn thì mã trùng có thể lọt vào và việc nhắc đúng một dòng khó hơn. | 1.4 |
| 12 / 2 | Mã phòng trong hồ sơ | Hai bảng có giá trị: `NV001` mang `MaPB = KT`, danh mục có `KT / Kế toán`. Hình dò cùng mã; đặt vấn đề mã phòng không có trong danh mục sẽ không xác định được tên phòng tương ứng. | 1.4 |
| 13 / 3 | Khóa ngoại | Nối `NhanVien.MaPB` tới `PhongBan.MaPB`, hiện nhãn FK/PK trên cặp cột và giải thích luật giữ mã tham chiếu có thật khi có mã khác NULL. `KT` hợp lệ, `KT01` bị chặn khi FK đang bật. Nhiều hồ sơ dùng chung một mã phòng được; quy tắc nhận NULL phụ thuộc thiết kế cột. | 1.4 |
| 14 / 3 | Bảng không khai báo khóa ngoại | Hình giả định khi không có FK và không có luật kiểm khác: một mã không có trong danh mục có thể lọt vào. Vẫn có thể so khớp dữ liệu giữa bảng theo điều kiện truy vấn; FK là luật kiểm dữ liệu, không phải điều kiện bắt buộc để kết bảng. | 1.4 |
| 15 / 2 | Sơ đồ quan hệ ERD | Từ hai bảng dữ liệu chuyển thành hai hộp tên bảng/cột và đường tham chiếu. ERD giúp nhìn cấu trúc và quan hệ, không phải một bảng kết quả chứa các hồ sơ. | 1.5 |
| 16 / 3 | Ký hiệu trên sơ đồ | Trên chính hai hộp, giải thích PK, FK, đường liên kết và hai phía `1`/`∞`. Với `MaPB` không NULL và FK hợp lệ trong thiết kế này, mỗi hồ sơ tìm được một phòng; một phòng có thể được nhiều hồ sơ tham chiếu, không bắt mọi phòng phải có người. | 1.5 |
| 17 / 3 | Đọc đường nhân viên và phòng ban | Sơ đồ có cặp cột và bảng trích cạnh nhau: đọc `NV001` → `MaPB = KT` → `Kế toán`. Diễn giải tuần tự: cần thông tin gì, bắt đầu bảng nào, qua cặp cột nào, lấy cột nào; tên phòng là phòng hiện lưu. | 1.5 |
| 18 / 4 | Đường đi qua ba bảng | Mở rộng sang `HopDong → NhanVien → PhongBan`, highlight lần lượt hai cặp cột. Kết luận mỗi dòng bắt đầu từ một hợp đồng, thêm được tên phòng hiện lưu của hồ sơ; chốt lại database/bảng/khóa/ERD trên ví dụ vừa học và dành 7 phút hỏi đáp. | 1.5 |

## Lời văn, dữ liệu và ranh giới kiến thức

- Các giá trị thật như `NV001`, `NV021`, `KT`, tên người/phòng và ba hợp đồng lấy từ bài hiện hành, hồ sơ công ty và kiểm SELECT-only khi triển khai. Không thêm sự kiện/nhân vật, không cần Chat hay tình huống chị Hạnh.
- Những hình “không có PK/FK” là **minh họa giả định**, chú thích ngay trên slide, không mô tả database mẫu đang chạy. Không xóa hoặc tắt ràng buộc của database để chụp minh họa.
- Điều kiện “khi khai báo”, “FK đang bật”, “nếu không có luật khác chặn” phải hiện cạnh hình. Không suy thiếu PK/FK thì chắc chắn dữ liệu đã sai. Luật có thể được kiểm bằng cách khác, nhưng không giảng thêm UNIQUE/trigger/validation ứng dụng trong buổi này.
- PK xác định dòng bằng khóa, không chứng nhận danh tính/nghiệp vụ. FK kiểm mã tham chiếu có thật, không biết mã có gán đúng hồ sơ; gán nhầm một mã phòng có thật vẫn có thể hợp lệ. Giữ một vế giải thích giới hạn này trong phần khóa, không tạo câu đố riêng.
- FK không tự sinh mã và không tự lấy thêm cột; câu truy vấn chọn cách lấy dữ liệu. Với ví dụ này FK tham chiếu PK; không khẳng định mọi FK chỉ được trỏ tới PK. Không giảng cú pháp JOIN, CREATE/ALTER hay cơ chế index.
- NULL chỉ giải nghĩa ngắn tại lần cần cho PK/FK, không thành bài kiểu dữ liệu. Chuyển kiểu, Format Cells, CCCD, precision/scale, khóa ghép bảng lương được chuyển về liên kết đọc thêm, không còn là các slide riêng.
- Hình tổng quan và ERD được dùng lại có chủ đích như cùng một đối tượng được mở/phóng to theo mạch người dùng chọn. Mỗi lần lặp phải thêm một thông tin hoặc thao tác đọc mới. Caption phân biệt hình khái niệm, bảng trích, dữ liệu thật và giả định.
- Câu SQL slide 4 là đoạn đọc minh họa không có nút chạy/sao chép. Kết quả chỉ trích vài dòng có caption, không hứa thứ tự nếu câu không yêu cầu sắp xếp. Người học hiểu vai trò SQL mà chưa cần tự viết được câu lệnh.

## Hình thức và khung web

Dùng hình khái niệm hiện có cho database/phần mềm/ngôn ngữ khi phù hợp và bảng/ERD HTML chỉnh sửa được cho dữ liệu cụ thể. Bố cục chính là một hình lớn đi cùng 2–3 câu diễn giải ở cạnh/dưới hình; tránh biến toàn bộ slide thành các bảng chữ hoặc hộp định nghĩa giống nhau. Giữ nền trắng, nhấn xanh, Be Vietnam Pro, 16:9 và chữ lớn của khóa học; không thêm theme hay thư viện.

Đây là thay nội dung bộ `lam-quen`, dùng lại collection, route, mục lục, tìm kiếm và hai cửa sổ hiện có. `sourceLessons` đề xuất là 1.1, 1.2, 1.4, 1.5 — các nguồn được giảng trực tiếp. Bài 1.3 và PL.1/PL.2 là liên kết đọc thêm khi nhắc NULL/kiểu, không duy trì liên kết header bài 1.3 chỉ vì bộ cũ từng giảng kiểu dữ liệu. Đây là quyết định metadata của người thiết kế, có thể chỉnh nếu cần.

Các slide 11/14 dùng hình đối chiếu giả định riêng: `ProjectionRelation` hiện lấy PK/FK từ schema thật nên không dùng nó để giả làm schema đã bỏ khóa. ERD thật ở 15–18 tiếp tục lấy đúng owner schema hiện hành. Cách dựng minh họa giả định nhỏ bằng semantic HTML và cách chọn asset/crop là phần để người triển khai tự quyết, không thêm tương tác mới chỉ để giảng thiếu khóa.

Nội dung cốt lõi luôn hiển thị. Bản mới không cần bốn `details data-answer`; controller vẫn giữ khả năng reveal cho những bộ khác, và Next/Previous đi qua 18 slide bình thường. Mỗi slide vẫn có ghi chú người giảng (ý cần nói/hiểu nhầm/giải thích, nguồn/phút khớp), nguồn bài và ID ổn định. Giữ ID cũ khi nội dung còn cùng nghĩa; các slide bị thay chủ đề không cần cơ chế tương thích link phức tạp.

Mở slide không ghi tiến độ và không đổi tổng 50 bài. Ghi chú chỉ có ở HTML người giảng; cửa sổ chiếu và liên kết chia sẻ tiếp tục theo hợp đồng đang có. Không sửa bài đầy đủ, dữ liệu mẫu, bài tập, API hoặc luồng xác thực.

## Kiểm và bàn giao khi triển khai

- Cập nhật test theo hợp đồng 18 slide/48+7 phút và diễn giải khái niệm, không chỉ bỏ assertion cũ 20 slide/bốn câu hỏi. Bảo vệ đủ sáu chủ đề, tính tùy chọn có điều kiện của PK/FK, giải thích thuật ngữ trước khi dùng, caption giả định/trích, nguồn/phút từng ghi chú và các bước đọc ERD.
- Đối chiếu SELECT minh họa và dữ kiện HRM bằng SELECT-only. Tác dụng PK/FK có thể đối chiếu metadata và tài liệu chính thức; không dùng DDL/DML trên database dùng chung.
- Kiểm source/build khớp, 18 slide luôn đọc được, không phụ thuộc mở đáp án; xem trực quan cả 18 ở kích thước nhất quán và các hình dày ở 1280/1440/1920. Tự xem/theo người giảng, tải lại, copy link, notes không có trên audience, no-JS và tiến độ vẫn phải đúng sau đổi nội dung.
- Chạy test/check/build/check:dist, kiểm thiết kế phù hợp thay đổi. Review độc lập cả bài giảng mới và review tích hợp sau thay nhiều nội dung/component, giữ model kế thừa; lưu report, ma trận, evidence và giới hạn thực theo quy ước.
- Bàn giao bản xem local. Merge/push/deploy của vòng nội dung mới chỉ làm khi có yêu cầu tiếp theo; quyền push vòng trước đã hoàn tất cho bản trước.

## Nguồn quyết định và kỹ thuật

Builder check độc lập đã đọc thiết kế, kết quả nguyên văn: “nothing important left”. Đây là kiểm mức rõ ràng để lập kế hoạch, không thay review nội dung/SQL/browser khi triển khai. Hai làm rõ thuật ngữ nhỏ sau lượt đọc: gọi tên truy vấn tại slide 4 và ghi rõ FK kiểm mã khác NULL tại slide 13. Chưa sửa sản phẩm hoặc đăng web trong vòng thiết kế này.

- Yêu cầu mới ngày 01/11/2026 và lựa chọn cách tiếp cận của người làm khóa học trong chat này.
- `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, các bài 1.1/1.2/1.4/1.5. Thiết kế vòng trước giữ làm lịch sử, không bắt bản mới giữ 20 slide, bốn câu hỏi hoặc trọng tâm ôn kiểu dữ liệu.
- [Microsoft CREATE TABLE](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17): ràng buộc tùy chọn trong bảng thông thường.
- [Microsoft PK/FK](https://learn.microsoft.com/en-us/sql/relational-databases/tables/primary-and-foreign-key-constraints?view=sql-server-ver17): phạm vi luật khóa, khóa nhiều cột và NULL.
- [Microsoft Joins](https://learn.microsoft.com/en-us/sql/relational-databases/performance/joins?view=sql-server-ver17): điều kiện kết bảng diễn đạt trong truy vấn; phân biệt với luật FK.
