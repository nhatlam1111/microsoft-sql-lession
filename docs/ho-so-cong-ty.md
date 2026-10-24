# Hồ sơ công ty trong khóa học

Mọi bài học kể về cùng một công ty, dựng trên bộ dữ liệu mẫu HRM_Demo (`database/HRM_Demo.sql`). File này ghi lại hiện trạng công ty, các nhân vật và những gì các bài đã kể, để bài sau không nói khác đi. Viết bài mới thì đọc file này trước; bài nào thêm điều mới về công ty thì ghi vào mục 7 trong cùng commit. Script đổi dữ liệu thì sửa file này theo; `npm test` so bảng ở mục 3 với script.

## 1. Công ty và thời điểm của câu chuyện

- Công ty chưa có tên riêng: bài gọi là "công ty". Email nhân viên có đuôi `@hrmdemo.vn`. Mọi tên người, số CCCD, email, lương đều là giả.
- Câu chuyện diễn ra vào **tháng 10/2026**. Kỳ lương gần nhất đã có là **2026-09**; dữ liệu có hai kỳ lương 2026-08 và 2026-09, chấm công chỉ có tháng 9/2026, đơn nghỉ từ 08/2026 tới 10/2026. Hai người mới vào làm tháng 10/2026 (NV047, NV048) chưa có hợp đồng, chấm công hay lương.
- Tháng 9/2026, công ty nghỉ lễ Quốc khánh ngày 1/9 và 2/9; ngày công chuẩn kỳ 2026-08 là 21, kỳ 2026-09 là 20.
- Hệ thống nhân sự lưu dữ liệu trong database SQL Server; học viên đọc nó qua SSMS. Bên IT quản trị hệ thống và cấp tài khoản. Database của khóa học so chữ không phân biệt hoa thường nhưng phân biệt dấu (`SQL_Latin1_General_CP1_CI_AS`), ngôn ngữ `us_english`, DATEFORMAT `mdy`.
- Công ty không lưu lịch sử chuyển phòng hay đổi chức danh: `NhanVien` chỉ giữ phòng, chức danh hiện tại.

## 2. Tổ chức

Sáu phòng ban, đếm trên 48 hồ sơ (gồm 3 người đã nghỉ):

| Mã | Tên phòng | Hồ sơ | Đang làm | Trưởng phòng |
|---|---|---|---|---|
| BGD | Ban Giám đốc | 2 | 2 | NV004 Hoàng Minh Tuấn, Giám đốc |
| IT | IT | 10 | 10 | NV007 Bùi Thanh Sơn |
| KD | Kinh doanh | 14 | 13 | NV006 Đặng Quốc Bảo |
| KT | Kế toán | 7 | 7 | NV005 Vũ Thị Lan |
| NS | Nhân sự | 5 | 5 | NV010 Đỗ Thị Hồng |
| VH | Vận hành | 10 | 8 | NV008 Phan Văn Lợi |

Sáu chức danh: CV Chuyên viên (21 hồ sơ), NV Nhân viên (16), TP Trưởng phòng (5), CVC Chuyên viên chính (4), GD Giám đốc (1), TL Trợ lý (1).

Quản lý trực tiếp (`MaQuanLy`), theo câu `UPDATE` trong script: Giám đốc không có quản lý (NULL); trưởng phòng và người ở Ban Giám đốc do NV004 quản lý; những người còn lại do trưởng phòng của phòng mình quản lý. Ví dụ NV008 quản lý trực tiếp 9 người của VH, gồm 2 người đã nghỉ.

## 3. Danh sách hồ sơ

| Mã | Họ tên | Phòng | Chức danh | Vào làm | Nghỉ việc | Ghi chú |
|---|---|---|---|---|---|---|
| NV001 | Trần Thị Mai | KT | CV | 2024-03-01 | | Ví dụ chính của nhiều bài; đơn phép DP020 chờ duyệt (10/2026) |
| NV002 | Lê Văn Hùng | KD | CVC | 2024-04-01 | | |
| NV003 | Nguyễn Thu Hà | KD | CV | 2023-06-01 | | |
| NV004 | Hoàng Minh Tuấn | BGD | GD | 2015-01-05 | | Giám đốc, không có quản lý trực tiếp |
| NV005 | Vũ Thị Lan | KT | TP | 2016-03-14 | | |
| NV006 | Đặng Quốc Bảo | KD | TP | 2016-08-01 | | |
| NV007 | Bùi Thanh Sơn | IT | TP | 2017-02-13 | | |
| NV008 | Phan Văn Lợi | VH | TP | 2015-09-01 | | |
| NV009 | Ngô Thị Thu Trang | BGD | TL | 2019-05-06 | | |
| NV010 | Đỗ Thị Hồng | NS | TP | 2016-06-01 | | |
| NV011 | Lý Minh Khoa | IT | CVC | 2018-04-02 | | |
| NV012 | Trịnh Thị Ngọc | NS | CVC | 2018-07-16 | | Ví dụ phụ cấp ở bài 6.5 |
| NV013 | Mai Đức Anh | KD | CV | 2019-03-04 | | Lương kỳ 2026-09 ghi dư 1 ngày công (bài 4.7) |
| NV014 | Hồ Thị Bích | KT | CVC | 2017-10-02 | | |
| NV015 | Dương Văn Nam | VH | NV | 2019-09-09 | | Trùng số CCCD với NV038 (bài 4.6) |
| NV016 | Lâm Thị Kim | KD | CV | 2020-02-10 | | |
| NV017 | Cao Minh Trí | IT | CV | 2020-06-01 | | |
| NV018 | Tạ Thị Yến | KT | CV | 2021-03-01 | | |
| NV019 | Châu Văn Phúc | VH | NV | 2018-01-15 | | |
| NV020 | Kiều Thị Hạnh | KD | CV | 2019-04-01 | 2025-12-31 | Đã nghỉ; không phải nhân vật chị Hạnh |
| NV021 | Tôn Thất Long | IT | CV | 2021-07-01 | | 3 hợp đồng nối tiếp |
| NV022 | Quách Thị Nga | NS | CV | 2020-09-14 | | |
| NV023 | Lưu Văn Thắng | KD | CV | 2019-11-04 | | |
| NV024 | Võ Thị Thanh | VH | NV | 2022-02-14 | | |
| NV025 | Huỳnh Văn Tài | KD | CV | 2023-11-01 | | |
| NV026 | Phùng Thị Mỹ | KT | CV | 2021-05-04 | | |
| NV027 | Đinh Công Hậu | VH | NV | 2018-08-20 | | |
| NV028 | La Thị Diệu | KD | CV | 2022-08-01 | | |
| NV029 | Mạc Văn Đông | IT | CV | 2025-03-01 | | Hợp đồng thử việc có ngày kết thúc trước ngày bắt đầu (bài 4.6) |
| NV030 | Nghiêm Thị Hoa | NS | CV | 2023-04-03 | | 3 hợp đồng |
| NV031 | Ông Văn Tú | VH | NV | 2020-10-05 | | |
| NV032 | Từ Thị Hương | KD | CV | 2021-09-06 | | Lương kỳ 2026-09 ghi dư 1 ngày công (bài 4.7) |
| NV033 | Khúc Văn Hải | VH | NV | 2019-06-03 | 2026-06-30 | Đã nghỉ |
| NV034 | Văn Thị Ly | KT | NV | 2022-11-01 | | |
| NV035 | Thái Minh Hiếu | IT | CV | 2022-03-07 | | |
| NV036 | Doãn Thị Thảo | KD | CV | 2024-11-15 | | Không phải nhân vật chị Thảo bên Kế toán |
| NV037 | Giang Văn Bình | VH | NV | 2017-05-02 | | |
| NV038 | Ninh Thị Hà | KD | NV | 2023-08-14 | | Trùng số CCCD với NV015 (bài 4.6) |
| NV039 | Âu Văn Kiên | IT | CV | 2022-06-06 | | |
| NV040 | Lục Thị Xuân | KD | NV | 2025-05-05 | | |
| NV041 | Hà Văn Quý | VH | NV | 2020-01-06 | 2026-08-15 | Đã nghỉ; chỉ có lương kỳ 2026-08 |
| NV042 | Bạch Thị Tuyết | KT | NV | 2024-07-01 | | |
| NV043 | Đàm Văn Khánh | IT | CV | 2023-02-06 | | |
| NV044 | Lã Thị Oanh | VH | NV | 2025-08-04 | | Thiếu email (bài 4.6) |
| NV045 | Ung Văn Lực | KD | NV | 2026-07-01 | | Thiếu email (bài 4.6) |
| NV046 | Hứa Thị Phương | IT | NV | 2026-09-14 | | Vào làm giữa tháng 9, chỉ có lương kỳ 2026-09 |
| NV047 | Phạm Ngọc Ánh | NS | CV | 2026-10-01 | | Mới vào, chưa có hợp đồng |
| NV048 | Đỗ Minh Quân | IT | NV | 2026-10-05 | | Mới vào, chưa có hợp đồng; không phải nhân vật Quân ở bài 1.1 |

Trạng thái chỉ có hai giá trị: `Đang làm` (45 hồ sơ) và `Đã nghỉ` (3 hồ sơ: NV020, NV033, NV041, đều có `NgayNghiViec`). Người chưa nghỉ có `NgayNghiViec` là NULL; đó là quy ước của bộ mẫu.

## 4. Hợp đồng, chấm công, nghỉ phép, lương

- **Hợp đồng:** 55 hợp đồng của 46 người; 25 không xác định thời hạn (`NgayKetThuc` NULL), 23 xác định thời hạn, 7 thử việc. Lương cơ bản từ 7.650.000 tới 60.000.000. NV021 và NV030 có 3 hợp đồng; NV047, NV048 chưa có.
- **Chấm công:** chỉ tháng 9/2026, từ 03/09 tới 30/09, 806 dòng; mỗi người tối đa một dòng mỗi ngày. Ví dụ NV001 có 19 ngày có dòng (vắng 28/09). Người đã nghỉ và người vào tháng 10 không có dòng.
- **Đơn nghỉ:** 20 đơn (DP001–DP020) của 20 người, mỗi người tối đa một đơn; loại `Phép năm`, `Nghỉ ốm`, `Việc riêng`; trạng thái `Đã duyệt` (14), `Chờ duyệt` (4, đều nghỉ trong tháng 10/2026), `Từ chối` (2).
- **Bảng lương:** 43 dòng mỗi kỳ 2026-08 và 2026-09; khóa là cặp kỳ lương và mã NV. `LuongCoBan` được chép từ hợp đồng còn hiệu lực trong kỳ. Công thức đã đơn giản hóa, không dùng để tính lương thật: bảo hiểm người lao động 10,5% lương cơ bản (thử việc không đóng); thuế TNCN giảm trừ cố định 11.000.000 đ/tháng, không tính người phụ thuộc; ngày công thực tế bằng ngày có chấm công cộng ngày phép năm đã duyệt.

## 5. Nhân vật trong tình huống

Các nhân vật là giả định, không phải hồ sơ trong bộ mẫu (bài 1.1 nói rõ điều này).

| Nhân vật | Là ai | Xuất hiện |
|---|---|---|
| Chị Hạnh · Phòng Nhân sự | Người đưa yêu cầu trong mọi bài đầy đủ; xưng "chị", gọi người học là "em" | 1.1–1.6, 2.1–2.9, 3.1–3.7 |
| Người học ("em", "bạn") | Người đọc và lấy dữ liệu từ hệ thống nhân sự cho chị Hạnh; có tài khoản vào database qua SSMS | mọi bài |
| Chị Thảo · Kế toán | Giữ một bản file nhân sự riêng | 1.1 |
| Quân | Nhân viên chuyển sang IT, nhưng file của Kế toán còn ghi phòng cũ | 1.1 |
| Bên IT | Quản trị hệ thống, cấp tên máy chủ và tài khoản, nhập file vào hệ thống, xóa dữ liệu theo yêu cầu | 1.2, 1.3, 1.4 |
| Kế toán | Người nhận các danh sách và bảng lương | 1.5, 2.1 |

Ba nhân vật trùng tên với hồ sơ trong bộ mẫu: chị Hạnh với NV020 Kiều Thị Hạnh (KD, đã nghỉ), chị Thảo với NV036 Doãn Thị Thảo (KD), Quân với NV048 Đỗ Minh Quân (vào IT tháng 10/2026, không phải chuyển phòng). Khi bài nhắc tới các hồ sơ này thì luôn gọi bằng mã. Nhân vật mới không được trùng tên với 48 hồ sơ ở mục 3.

## 6. Lỗi dữ liệu cài sẵn

Các lỗi này có chủ ý, dành cho bài 4.6 và 4.7; bài khác không được coi chúng là dữ liệu đúng hay sửa chúng đi:

- NV015 và NV038 trùng số CCCD, nên 48 hồ sơ chỉ có 47 số CCCD khác nhau.
- NV044 và NV045 không có email.
- Một hợp đồng thử việc của NV029 có ngày kết thúc trước ngày bắt đầu.
- Bảng lương kỳ 2026-09 của NV013 và NV032 ghi dư 1 ngày công so với chấm công.
- Script không khai báo ràng buộc `CHECK` hay `UNIQUE` nào ngoài khóa chính, khóa ngoại.

## 7. Những gì các bài đã kể về công ty

Đây là các sự việc của từng tình huống. Bài sau không được kể ngược lại; tình huống nào chỉ là giả định của một bài thì ghi rõ.

| Bài | Sự việc |
|---|---|
| 1.1 | Công ty dùng một workbook nhân sự nhiều sheet, mỗi tháng gửi bản sao qua email, mỗi người sửa bản riêng. Quân đã chuyển sang IT nhưng bản của chị Thảo còn phòng cũ. |
| 1.2 | Bên IT gửi tên máy chủ và tài khoản để vào database nhân sự; chị Hạnh cần biết công ty có những phòng nào cho buổi họp chiều. |
| 1.3 | Chị Hạnh gửi bên IT một file danh sách nhân viên để nhập vào hệ thống; file có ngày gõ nhiều kiểu, có ô "chưa rõ", lương ghi "9,61 triệu". |
| 1.4 | Công ty quyết định gộp phòng Vận hành vào Kinh doanh; bên IT thử xóa VH khỏi danh mục và bị khóa ngoại chặn. **Chỉ là giả định của bài:** dữ liệu vẫn còn VH, các bài khác coi VH là phòng đang hoạt động. |
| 1.5 | Kế toán xin bảng lương kỳ 2026-09 kèm tên phòng; tên phòng lấy theo phòng đang lưu, không phải phòng tại kỳ lương. |
| 1.6 | Chị Hạnh làm mẫu hồ sơ nhân viên mới, cần biết bảng nhân viên lưu những gì. |
| 2.1 | Kế toán cần danh sách toàn bộ 48 hồ sơ, ba cột có tiêu đề tiếng Việt. |
| 2.2 | Chị Hạnh đối chiếu 14 hồ sơ mang mã phòng KD, kể cả người đã nghỉ. |
| 2.3 | Chị Hạnh lấy hồ sơ hiện mang mã phòng KD hoặc IT, vào làm từ 01/01/2023 đến hết 30/06/2023, không loại người đã nghỉ nếu có. Theo script mẫu, NV003 và NV043 đạt điều kiện; đây không phải phòng tại thời điểm vào làm. |
| 2.4 | Chị Hạnh cần tối đa năm hồ sơ đang làm có ngày vào làm gần nhất, ở mọi phòng và không giới hạn năm. Xếp ngày giảm dần, cùng ngày thì mã tăng dần. Theo script mẫu: NV048, NV047, NV046, NV045, NV044. |
| 2.5 | Chị Hạnh cần toàn bộ hồ sơ có Email là NULL, mọi phòng và trạng thái, xếp mã tăng dần. Theo script là NV044 (VH), NV045 (KD); nhãn Unicode (chưa có) chỉ hiển thị trong kết quả, không thay email nguồn. |
| 2.6 | Chị Hạnh cần danh sách mã phòng xuất hiện trong toàn bộ hồ sơ NhanVien, mọi trạng thái. Theo script có 48 hồ sơ và 6 mã phòng; DISTINCT chỉ bỏ dòng trùng trong kết quả, không xóa hồ sơ nguồn hoặc chứng nhận đây là danh mục phòng đầy đủ. |
| 2.7 | Chị Hạnh cần danh sách ký nhận của toàn bộ hồ sơ hiện mang MaPB = IT, không lọc trạng thái hay ngày. Theo script có 10 hồ sơ; nhãn mã–họ tên chỉ tạo trong kết quả. Ví dụ TRIM, Unicode và collation không sửa dữ liệu nguồn. |
| 2.8 | Tại mốc cố định 21/10/2026, chị Hạnh cần các dòng hợp đồng có ngày kết thúc từ ngày đó đến hết 20/11/2026 (gồm hai đầu). Theo script có HD2025-014/NV025 (31/10), HD2026-004/NV046 (13/11), HD2024-008/NV036 (14/11). Đây là danh sách hợp đồng theo ngày lưu, không kết luận phải gia hạn. |
| 2.9 | Tại mốc cố định 21/10/2026, chị Hạnh chia các hồ sơ đang làm, đã vào làm tới ngày đó, theo ngày kỷ niệm đủ năm. Theo script có 45 hồ sơ: 4 dưới một năm, 8 từ một đến dưới ba năm, 33 từ ba năm trở lên. CASE chỉ tạo nhãn kết quả, không sửa trạng thái hoặc dữ liệu nguồn. |
| 3.1 | Chị Hạnh cần tổng hợp đơn đã duyệt có TuNgay từ 01/09 đến trước 01/10/2026, cộng toàn bộ SoNgay của đơn. Theo script: 9 đơn, tổng 16.0 ngày, bình quân làm tròn hai số lẻ 1.78, ít nhất 1.0 và nhiều nhất 3.0 ngày. Đây không phải số ngày thực nghỉ trong tháng; DP018 bắt đầu tháng 8 bị loại dù kéo sang tháng 9. |
| 3.2 | Chị Hạnh đếm hồ sơ đang làm theo MaPB hiện lưu, xếp số lượng giảm dần rồi mã tăng dần. Theo script có 45 hồ sơ thành 6 nhóm: KD 13, IT 10, VH 8, KT 7, NS 5, BGD 2; không phải phòng tại thời điểm quá khứ. Ví dụ phụ tách toàn bộ KD theo trạng thái thành 13 đang làm và 1 đã nghỉ. |
| 3.3 | Từ cùng phạm vi đang làm của 3.2, chị Hạnh chỉ giữ nhóm phòng có trên 10 hồ sơ. Theo script, HAVING COUNT(*) > 10 giữ KD 13; IT đúng 10 bị loại. WHERE lọc hồ sơ trước, HAVING lọc nhóm sau; kết quả không tự kết luận phòng thiếu người. |
| 3.4 | Chị Hạnh lấy mọi hồ sơ kèm tên phòng theo mã hiện lưu, xếp mã nhân viên tăng dần. Danh mục có khóa duy nhất và mã hồ sơ hợp lệ nên 48 hồ sơ vẫn cho 48 dòng; không dựng phòng lịch sử. |
| 3.5 | Chị Hạnh đối chiếu mọi hồ sơ chưa có bất kỳ dòng hợp đồng nào, không lọc riêng người mới hoặc trạng thái. NV047, NV048 chưa có hợp đồng; 55 hợp đồng và hai hồ sơ không khớp tạo 57 dòng khi LEFT JOIN trước lọc. Ví dụ phụ đối chiếu hợp đồng thử việc của NV021/NV047, không kiểm hiệu lực hiện tại. |
| 3.6 | Chị Hạnh lấy lương kỳ 2026-09 kèm hợp đồng ứng viên tại 30/09 theo ngày bắt đầu/kết thúc đã lưu. Có 45 ứng viên, mỗi mã hiện chỉ một; 43 mã có dòng lương kỳ đó. NV021 có thực lĩnh 16.457.000, kết cả ba hợp đồng cũ sẽ lặp khoản tiền ba lần. Quy tắc ngày chỉ phục vụ đối chiếu, không chứng nhận pháp lý hoặc tính lại lương cả tháng. |
| 3.7 | Chị Hạnh lấy mọi hồ sơ kèm quản lý trực tiếp hiện lưu: LEFT JOIN giữ đủ 48 dòng, NV004 có quản lý NULL; INNER JOIN chỉ còn 47. NV001 trỏ NV005, NV005 trỏ NV004; không coi NV004 là quản lý trực tiếp của NV001. NV004/NV005 mỗi người có sáu hồ sơ trực tiếp ở mọi trạng thái; NV048 chưa có cấp dưới. |
| 6.5 | Một chiều thứ Sáu, câu `UPDATE` phụ cấp của NV012 kỳ 2026-09 bị bôi đen thiếu, chạy cho cả bảng lương. |
