# Review độc lập bài 3.6 — nháp trước khi xem đáp án

## Tự giải đề từ prompt, trước khi mở YAML

| Đề | Cách làm dự kiến | Tiền đề và vị trí | Thiếu / khó tìm |
|---|---|---|---|
| 3-6-1 | Giữ lương kỳ 2026-08, kết theo MaNV sang hồ sơ và theo MaPB sang danh mục phòng; lọc MaPB IT trên hồ sơ, chọn bốn cột, xếp MaNV tăng dần. Mỗi dòng là một khoản lương của kỳ được chọn. | Khóa kỳ–mã ở 1.4; lọc 2.2, sắp 2.4; quan hệ phòng và bí danh 3.4; hai JOIN và giới hạn kỳ ở 3.6. | Cần xác định cột và quan hệ BangLuong–NhanVien từ câu chính 3.6, PhongBan từ 3.4. Không thấy thiếu tiền đề. |
| 3-6-2 | Giữ lương kỳ 2026-09, kết cùng mã nhân viên, kết danh mục chức danh theo MaCD, lọc MaCD TP trên hồ sơ; chọn bốn cột và xếp mã. Mỗi dòng là một khoản lương của kỳ đó. | 1.4, 2.2, 2.4, 3.4 và 3.6 như trên; đổi danh mục phòng sang chức danh theo đề. | Cần tìm đường MaCD và tên cột danh mục; kiểm lại bài trước để xác định có dạy rõ không. |
| 3-6-3 | Giữ một kỳ lương, kết theo MaNV với hồ sơ và toàn bộ hợp đồng, không áp điều kiện ngày; nhóm theo mã và họ tên, đếm MaHD, giữ nhóm đếm > 1, chọn ba cột và xếp mã. Khóa lương bảo đảm mỗi người tối đa một dòng trong kỳ, nên số dòng sau kết cho mỗi người bằng số hợp đồng đang lưu. | 1.4 khóa ghép; 3.1 đếm cột; 3.2 nhóm nhiều cột; 3.3 HAVING; 3.5 mọi hợp đồng theo mã; cầu nối đếm lịch sử và nhóm mã/tên ở 3.6. | Không thấy thiếu tiền đề; cần kiểm cách trình bày GROUP BY nhiều cột ở 3.2. |

## Đối chiếu sau khi mở YAML

Ba đáp án dùng đúng hướng dự kiến: hai đề đầu kết lương–hồ sơ–danh mục, lọc kỳ và mã hiện lưu; đề ba kết lịch sử, nhóm mã/tên và lọc số đếm. Chưa chạy SQL hay bộ chấm, nên đây là đối chiếu đọc, không chứng minh đáp án chạy hoặc tập kết quả. Bài 3.2 ghi rõ cách nhóm nhiều cột tại phần giảng chính; cầu nối đề 3 đã có trước phần ôn.

**Khó tìm, mức nhẹ — đường dữ liệu đề 3-6-2:** đề nêu `MaCD`, `ChucDanh`, `TenCD`, nhưng trong các bài nguồn được giao, ví dụ kết cụ thể ở 3.4 dùng `MaPB`/`PhongBan`; 3.6 chỉ nói danh mục chức danh ở Ứng dụng. Bài 2.1 có `MaCD` trong bảng trích nhưng chưa chỉ rõ `NhanVien.MaCD = ChucDanh.MaCD`. Người mới có thể suy theo mẫu phòng và tìm ở sơ đồ database, nhưng tôi chưa xác minh được đường đó được giải thích trong phần đã học hay sơ đồ hiển thị ra sao. Nên đối chiếu nguồn sơ đồ trước khi quyết định có cần thêm một vế ngắn; không coi đáp án YAML là lời dạy.

## Học thử và nhận xét

Không thấy lỗi chắc chắn trong mạch kết hay đề bằng cách đọc. Tình huống chốt mốc bao gồm hai đầu, kỳ, số tiền đã lưu và giới hạn pháp lý. Hai `INNER JOIN` kết về hồ sơ, từng phép có `ON`; LineMap nêu ví dụ cho từng phần. Số 43 là tổng, năm dòng chỉ là trích; câu trả lời theo ngay sau Result. Giải thích ứng viên chồng ngày và kiểm không mất dòng bổ sung cho nhau, không lấy số dòng khớp làm bằng chứng duy nhất trước khi kiểm nhân dòng.

Các câu vì sao/để làm gì: (1) Vì sao không kết trực tiếp lương theo mã hợp đồng? Phần trước SQL nói `BangLuong` không lưu `MaHD`; (2) vì sao xét cả hai ngày? Quy tắc đầu bài và Hay nhầm 2 giải thích hợp đồng chưa bắt đầu có thể lọt; (3) vì sao không cộng ngay? ví dụ `NV021` cho ba cặp, lặp một khoản; (4) vì sao kiểm ứng viên vẫn phải đối chiếu lương gốc? đoạn kiểm hai việc và tự kiểm tra giải thích `INNER JOIN` có thể bỏ dòng; (5) vì sao `NV041` bị loại? drawer lương cho thấy chỉ có kỳ tháng 8. Mục Ứng dụng nêu việc làm và mục đích cụ thể; bốn câu tự kiểm tra sau Ghi nhớ ôn những điều đã giảng.

Rà từng drawer và chú thích từ nguồn và HTML tĩnh: FROM trích 4/48 hồ sơ, hai cột đủ mã/tên cho bước sau. JOIN hợp đồng nhận 4 mã đầu vào, bảng phải ghi rõ trích 5/55, gồm đủ ba hợp đồng `NV021`; ngày và mã giải thích ba dòng còn lại, đồng thời chú thích nêu riêng kiểm toàn bảng cho `NV047`. JOIN lương có bốn cột từ bước trước, bảng phải gồm mã/kỳ/tiền và chú thích phạm vi đủ cho ba người trích; giữ `NV021`, `NV001`, loại `NV041`, kết quả 43 dòng/sáu cột. SELECT chuyển 6 sang 5 cột, số dòng giữ nguyên; ORDER BY có hai cột khóa xếp, giữ 43 dòng/năm cột, trích năm dòng đầu. Số dòng, dữ liệu minh họa, kết luận và các cột cần quyết định giữa các bước ăn khớp khi đọc; các tổng trên toàn bộ dữ liệu chưa tự xác minh. SQL của các bước trong nguồn và focus tương ứng câu chính; HTML tĩnh hiển thị nháy thẳng, không thấy backtick hoặc chuỗi escape nguyên văn trong phần chữ trích xuất, và có tab trong câu. Không thể kết luận bố cục, tương tác hay copy từ việc đọc HTML.

Về tải và cắt/gộp: các lời nhắc ở Ghi nhớ/tự kiểm tra có chức năng ôn; đoạn kiểm nhân và mất dòng là hai điều kiện khác nhau nên giữ. Có thể rút câu cuối trả lời tình huống về `NV041` vì drawer ngay trước đã giải thích người này không có lương kỳ, nhưng vế không suy ra tình trạng làm việc vẫn bổ ích; đây là đề xuất biên tập, không phải lỗi. Không đề nghị thêm ví dụ riêng ngoài phạm vi.

## Phạm vi và giới hạn

Review với cấu hình được giao GPT-6.1 Terra/high, ngữ cảnh mới; chỉ dùng snapshot 03/11/2026 14:42:10 UTC, bài 3.6 hash SHA-256 `43b5ef208c4830647643a5b85afb0521165c352ec3fb5b12a12aa9df9087ad6e`, YAML `88af21f05825d321f40b6e6a88d22eccddce9f8025b081ffdde922bfe3baf8d6`, HTML `9f237c233712da83cc80ce238be2f5307caf7f68db3266a55e60c48574508ec8` theo manifest; build được gói mô tả là 21:40:42, 190 trang. Các hash được ghi theo manifest, không tự tính lại. Đã tự ghi cách làm ba prompt trước khi mở YAML. Đọc source, nội dung HTML tĩnh và đối chiếu mô tả spec; không mở browser, chạy SQL/DB/API, runner hay test. Không tự xác minh số liệu live, thao tác drawer, bàn phím, viewport, sao chép/dán, backend hoặc SSMS. Công cụ Python thiếu `bs4`; đã dùng HTMLParser chuẩn để trích chữ, không coi đó là kiểm UI.
