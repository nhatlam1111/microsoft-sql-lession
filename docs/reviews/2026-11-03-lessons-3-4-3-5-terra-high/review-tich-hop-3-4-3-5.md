# Review tích hợp 3.4–3.5, vòng sau sửa

## Phiên bản và cách kiểm

Gói `integration-v2`, working tree sau sửa trên base `63f8f5c67782726a78fe794d617dfe0ae422e4cb`; đã tính SHA-256 và tất cả tệp trong manifest khớp. Reviewer là agent Codex được giao cấu hình `gpt-6.1-terra`, effort `high`, ngữ cảnh mới `fork_turns: none`; công cụ không xác nhận độc lập model backend thực tế. Đọc source, diff, quy ước, template, hồ sơ, phạm vi spec và Review Focus; kiểm HTML tĩnh tám trang trong manifest và log được giao. Không mở browser, chạy SQL/API/test/build hoặc đọc database. Các nhận định về số liệu là đối chiếu source/hồ sơ/log tác giả, không phải truy vấn độc lập.

Giới hạn quy trình: tôi đã đọc sáu prompt và answer trong cùng một lần xuất YAML, nên không thể khẳng định đã tự giải từng đề trước khi xem đáp án. Ma trận dưới đây là đối chiếu tiền đề sau khi đã thấy answer, không thay cho phép học thử độc lập theo đúng thứ tự yêu cầu.

## Findings

Không phát hiện finding tích hợp có thể chứng minh từ phạm vi đã kiểm. Kết quả này không xác nhận khả năng hoàn thành bài tập của mọi người học và không thay thế kiểm chạy SQL hoặc tương tác UI.

## Ma trận tiền đề sáu đề

| Đề | Tiền đề ở trước hoặc trong bài | Đánh giá nguồn |
|---|---|---|
| 3.4.1 | 3.4 có `INNER JOIN`, `ON`, nguồn cột và bí danh; lọc và sắp đã học ở 2.2/2.4. | Đủ mạch chọn hồ sơ KD, tên phòng từ danh mục và sắp mã; mọi trạng thái được đề chốt. |
| 3.4.2 | Như đề 1; 2.3 giải `AND`, 2.1/2.2 dùng chuỗi Unicode có `N`. | Đủ để ghép hai điều kiện trạng thái/phòng với kết danh mục. |
| 3.4.3 | 3.2 nhóm nhiều cột, 3.3 lọc nhóm; 3.4 giải thích nhóm mã và tên, `COUNT(*)` đếm dòng sau kết và mỗi hồ sơ khớp đúng một phòng trong bộ mẫu. | Đủ xác định đơn vị đếm là hồ sơ sau kết trong điều kiện đã nêu; sắp hai khóa đã có ở 2.4. |
| 3.5.1 | 3.5 giải kết toàn bộ hợp đồng, kiểm khóa phải không `NULL`, lọc phòng bên trái trong `WHERE`; 2.3 kết hợp điều kiện và 2.4 sắp ngày. | Đủ để giới hạn IT mà không thu hẹp phạm vi hợp đồng. Đề chỉ yêu cầu sắp ngày; không tự áp thêm thứ tự khi ngày bằng nhau. |
| 3.5.2 | 3.5 giải `AND` trong `ON` để chọn phạm vi phía phải trước khi kiểm không khớp; 1.4 nêu khóa ghép `BangLuong(KyLuong, MaNV)` và PK không nhận `NULL`. | Đủ suy ra `BangLuong.MaNV` dùng được làm cột kiểm không khớp trên dòng lương thật và kỳ khác không thỏa phạm vi khớp. |
| 3.5.3 | 3.5 giải mọi cặp, dòng trái không khớp nhận `NULL`; 2.4 sắp hai cột, 1.4 phân biệt SQL `NULL` với chữ. | Đủ phân biệt yêu cầu liệt kê mọi cặp với việc chỉ lọc không khớp; không cần áp `IS NULL` để giữ tất cả. |

## Mạch học và bằng chứng giữ được

- 1.4 đưa PK/FK, `NULL`, khóa ghép và giới hạn dữ liệu hợp lệ; 1.5 bổ sung cách đọc liên hệ. 3.4 giải thích bí danh bảng khác alias cột, điều kiện `ON` do người viết đặt, một dòng là cặp khớp, và điều kiện cụ thể để 48 hồ sơ giữ thành 48 dòng. Cách giải VLOOKUP đủ cơ bản, đồng thời phân biệt lấy lần đầu với mọi cặp.
- 3.5 chuyển từ cặp khớp sang giữ bên trái, `NULL` trong kết quả và chọn khóa không nhận `NULL`; tách điều kiện khớp `ON` khỏi lọc sau kết `WHERE`, kể cả dùng `AND` chọn kỳ ở phía phải. Bài không đồng nhất thiếu dòng trong hệ thống với thực tế đã xác minh. Ví dụ ba hợp đồng nối tự nhiên với cảnh báo nhân dòng và kiểm ứng viên tại 3.6; không yêu cầu chuyển khung bài 3.6.
- RunFlow source 3.4 hiển thị nguồn danh mục ba trong sáu dòng, khớp các mã trong bản trích năm hồ sơ; tổng 48 được phân biệt với trích. 3.5 có 48 hồ sơ → 57 dòng (55 cặp và hai không khớp) → hai dòng; bản trích cho thấy ba cặp của NV021 và hai dòng không khớp, kiểm `MaHD`, rồi chọn bốn cột. Câu chính, focus, các bước và bảng kết quả đối chiếu nhất quán về ý nghĩa trong source; HTML tĩnh chứa các phần chính và bảng ví dụ, không đủ chứng minh tương tác drawer.
- Trang Giới thiệu nêu web có mã, SSMS dùng tài khoản và SQL Server riêng; phạm vi hoàn tác chỉ trên trang bài tập. Diff gỡ đúng 3.4/3.5 khỏi danh sách chờ hai tiểu mục, giữ 3.6; kiểm mới tập trung cột đầu vào/bảng soi và dữ liệu tra cứu. Các chỉ dẫn AGENTS, CLAUDE và quy ước thống nhất cấu hình Codex Terra/high và Claude Sonnet/high.
- Log tác giả ghi 67 file/565 test đạt; check 0 lỗi, 0 warnings, 7 hints (bao gồm API deprecated); build 190 trang, check:dist 190 trang/3568 link; log live ghi các số tổng 48/55/57/2 và catalog sáu phòng. Đây là bằng chứng do tác giả chạy, không phải test hoặc SQL tôi chạy lại.

## Chưa xác minh và điều cân nhắc ngoài phạm vi

- Không tự kiểm SQL live, toàn bộ các giá trị và ràng buộc database, chấm sáu đáp án, dữ liệu riêng, API, build lại hoặc hiệu lực các log tại thời điểm khác. Hash xác nhận nội dung gói hiện có, không chứng minh test hay live log được chạy trên chính trạng thái đó một cách độc lập.
- HTML được đọc tĩnh; chưa thao tác drawer, highlight, sao chép/dán, bàn phím, điều hướng, kích thước màn hình hoặc xác nhận ảnh hiển thị. Chưa kiểm các trạng thái lỗi và luồng đăng nhập thực tế.
- Bài 3.5.2 đòi hỏi chuyển suy luận PK ghép từ 1.4 sang khóa kiểm; đã cân nhắc đây là bước suy luận có căn cứ trước đề, không đòi thêm truy vấn phụ hoặc dạy bằng đáp án. Bài 3.5.1 chỉ chỉ định thứ tự ngày, nên thứ tự giữa các hồ sơ cùng ngày không được đảm bảo; không yêu cầu đổi đề ngoài phạm vi giữ nguyên.
- Không đánh giá lại toàn bộ bài 3.6, schema/API, các bài cũ ngoài mạch hoặc yêu cầu mở rộng component. Không kết luận Ready hay quyền push/deploy.
