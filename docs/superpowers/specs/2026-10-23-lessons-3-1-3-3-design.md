# Bài 3.1–3.3: từ tổng hợp đến lọc nhóm

- Ngày: 23/10/2026.
- Trạng thái: bản thiết kế ngắn, chờ người làm khóa học duyệt trước khi viết bài.
- Yêu cầu: tiếp tục bài 3.1–3.3 theo quy ước hiện hành; giữ cách tách mỗi bài một branch của lượt trước.
- Gốc: `main` tại `0f1963af2248ffe11728fffea89776ef314cdaed`, đã gồm các sửa sau review phần 2.
- Tài liệu chi phối: [quy ước](../../quy-uoc.md), [khung bài](../../lesson-template.md), [hồ sơ công ty](../../ho-so-cong-ty.md), bài 1.1 đã duyệt và spec bài đầy đủ đợt 2. Quy ước mới hơn thay các chỉ dẫn bố cục cũ.

## Mục đích và phạm vi

Chuyển đúng ba bản tóm tắt hiện có thành bài đầy đủ, giúp người học đi từ một kết quả tổng hợp cho cả phạm vi dữ liệu, tới một kết quả cho mỗi nhóm, rồi lọc các nhóm theo số liệu đã tính. Giữ tiêu đề và vị trí trong lộ trình; ví dụ dùng hồ sơ nhân viên và đơn nghỉ phép. Các lựa chọn tình huống, bài tập và thời lượng dưới đây là đề xuất của người viết.

Đây là phần tiếp nối nội dung theo mẫu đã có, không thiết kế lại sản phẩm. Mỗi bài có sáu mục cấp hai theo khung hiện hành; Excel và SQL nằm trong cùng phần chính, khoảng 2–4 tiểu mục. Giải tình huống ngay cạnh kết quả, dùng RunFlow để giải thích thứ tự logic; cuối bài có ba bài tập riêng.

## Cách thực hiện

Áp dụng trực tiếp bộ khối MDX, RunFlow và bộ chấm đang có. Đây là cách phù hợp với yêu cầu “theo quy ước”: giữ mạch đã duyệt và chỉ bổ sung nội dung cần học. Viết lại giao diện hoặc làm bộ mô phỏng SQL riêng sẽ mở phạm vi ngoài yêu cầu; giữ bản tóm tắt thì chưa đáp ứng việc viết bài đầy đủ. Không có lựa chọn nền tảng mới cần người làm khóa học quyết định.

Không thay UI, API, schema nội dung, bộ chấm, dữ liệu mẫu hoặc các bài ngoài phạm vi. Không dạy trước kết bảng, truy vấn con, hàm cửa sổ hay đếm có điều kiện bằng CASE. Không cam kết chạy nhanh hơn chỉ dựa vào vị trí WHERE/HAVING.

## Khung ba bài

| Bài | Tình huống đề xuất | Kiến thức và giới hạn |
|---|---|---|
| 3.1 — COUNT, SUM, AVG, MIN, MAX | Chị Hạnh cần số đơn đã duyệt có ngày bắt đầu trong tháng 9/2026, tổng số ngày, bình quân số ngày mỗi đơn, số ngày ít nhất và nhiều nhất. | Mỗi dòng của DonNghiPhep là một đơn; SoNgay là số ngày lưu trên đơn, không tự phân bổ ngày nghỉ theo tháng. Hàm tổng hợp cho một dòng khi không GROUP BY. Phân biệt COUNT(*) và COUNT(Email) bằng NhanVien; NULL khác số 0, chuỗi rỗng. SUM/AVG/MIN/MAX bỏ NULL; tập rỗng trả COUNT = 0, các hàm còn lại = NULL. AVG dùng cột decimal để giữ phần lẻ; chỉ nêu giới hạn của đầu vào số nguyên khi cần. |
| 3.2 — GROUP BY: PivotTable bằng SQL | Chị Hạnh cần số hồ sơ đang làm theo mã phòng đang lưu; phòng đông nhất lên đầu, cùng số lượng thì mã phòng tăng dần. | Từ PivotTable Rows/Values sang khóa nhóm và hàm tổng hợp; mỗi tổ hợp khóa tạo một dòng. Cột thường trong SELECT phải thuộc khóa nhóm. Minh họa nhóm nhiều cột bằng MaPB và TrangThai. GROUP BY không tự sắp xếp, không tạo dòng cho phòng không có hồ sơ phù hợp, không xác nhận phòng ở thời điểm quá khứ. |
| 3.3 — HAVING: lọc sau khi gộp | Từ cùng phạm vi hồ sơ đang làm, chị Hạnh chỉ cần các phòng có trên 10 hồ sơ. | WHERE lọc dòng trước GROUP BY; HAVING lọc nhóm theo COUNT sau GROUP BY. So sánh với Value Filters trong PivotTable. Ngưỡng “trên 10” là > 10. Alias tạo ở SELECT chưa dùng được trong HAVING; dùng lại biểu thức tổng hợp. Điều kiện lọc dòng đặt ở WHERE theo ý nghĩa báo cáo. |

Thời điểm câu chuyện vẫn là tháng 10/2026. Dữ liệu NhanVien được coi là ảnh chụp hiện tại; không suy ngược số người của một phòng ở tháng trước. Ví dụ đơn nghỉ tháng 9 lọc theo TuNgay, không gọi kết quả là tổng số ngày thực nghỉ trong tháng, vì có đơn bắt đầu từ tháng 8 và kéo sang tháng 9.

Mục tiêu thời lượng: 3.1 khoảng 20–25 phút, 3.2 khoảng 20 phút, 3.3 khoảng 15–20 phút, gồm bài tập; điều chỉnh theo bản viết thực tế. Phần lý thuyết luôn hiển thị, không giấu sau khối mở để giảm độ dài bề ngoài.

## Bài tập đề xuất

| Bài | Ba bài tập, độc lập với câu minh họa nguyên vẹn |
|---|---|
| 3.1 | (1) Đếm hồ sơ đang làm và số Email khác NULL. (2) Tính đủ năm hàm trên đơn đã duyệt bắt đầu trong tháng 8/2026. (3) Tổng hợp phạm vi không có đơn để nhận đúng COUNT = 0 và NULL của SQL. |
| 3.2 | (1) Đếm hồ sơ đang làm theo chức danh. (2) Đếm toàn bộ hồ sơ theo cặp phòng/trạng thái. (3) Đếm đơn và cộng SoNgay của đơn đã duyệt theo loại nghỉ. |
| 3.3 | (1) Lọc nhóm phòng theo khoảng số hồ sơ đang làm. (2) Lọc loại nghỉ theo tổng SoNgay trên phạm vi đơn đã duyệt được chỉ rõ. (3) Lọc cặp phòng/chức danh có từ ba hồ sơ đang làm. |

Đề nói rõ phạm vi, thứ tự cột, điều kiện biên và thứ tự dòng khi có nhiều nhóm. Bộ chấm vẫn so kết quả, không chấm alias hoặc bắt buộc một cú pháp; yêu cầu tự đối chiếu cú pháp nếu cần nói rõ trong bài. Chọn dữ liệu/điều kiện để những lỗi thông thường như bỏ WHERE, dùng COUNT(Email) thay COUNT(*), nhầm > với >= hay thiếu khóa nhóm cho kết quả khác.

## Branch và tài liệu đi kèm

Các branch nối tiếp để 3.2 có bài tiên quyết 3.1, và 3.3 có đủ hai bài trước:

1. `codex/lesson-3-1-full`, từ main mới nhất nêu trên.
2. `codex/lesson-3-2-full`, từ bản hoàn tất 3.1.
3. `codex/lesson-3-3-full`, từ bản hoàn tất 3.2.

Mỗi branch bổ sung đúng bài, YAML bài tập, kiểm tra có ý nghĩa và cập nhật catalog/README/hồ sơ công ty/spec/plan tương ứng. Mỗi bài có một review độc lập bằng agent mới theo đúng mục 4.5 của quy ước. Người viết đọc hết review, kiểm từng nhận xét rồi ghi “Đã sửa” và “Không làm theo” kèm lý do. Không push hoặc đăng lên main ở bước soạn bài này.

## Kiểm tra và điều kiện bàn giao

Trước khi điền kết quả, kiểm câu SQL, tập dòng và từng bước RunFlow. Chạy bộ kiểm tra web và API theo mục 4.4; kiểm đáp án không lọt vào bản web và câu minh họa không nộp nguyên vẹn được cho bài tập. Không nới các kiểm tra hiện có để bỏ qua lỗi.

Phiên hiện chưa có công cụ SQL trực tiếp hoặc cấu hình kết nối database, nên chưa thể chứng nhận số liệu bằng SQL Server. Kiểm từ script và tài liệu Microsoft chỉ là căn cứ bổ sung; ghi riêng phần chưa chạy live, không gọi là kiểm chứng trên database thật. Việc kiểm trình duyệt phụ thuộc môi trường khả dụng; phân biệt kiểm HTML với kiểm tương tác. Mật khẩu và mã truy cập không được in hoặc commit.

Sau khi người làm khóa học duyệt tài liệu này, lập kế hoạch triển khai rồi viết lần lượt ba bài. Nếu gặp giới hạn công cụ, hoàn tất phần có thể làm và bàn giao rõ phần còn thiếu; không ghi trạng thái đạt cho bước chưa thực hiện.
