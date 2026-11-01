# Làm lại bài 3.1 và 3.2 theo mạch một câu lệnh

Ngày: 01/11/2026. Trạng thái: người dùng đã duyệt thiết kế trong chat; đang triển khai theo [kế hoạch](../plans/2026-11-01-lessons-3-1-3-2.md).

Nguồn khảo sát: `main` tại `a67c37a4872daaee7711dbab8bb794fbb8a1f681`. Quy ước và template hiện hành chi phối; spec 23/10 cho 3.1–3.3 chỉ là lịch sử.

## Ý định và quyết định của người làm khóa học

Làm lại phần giảng của 3.1 và 3.2 theo cách các bài 2.1–2.9 đã chuyển: một câu SQL giải tình huống, giải thích ngay sau câu đó, rồi lần theo dữ liệu tới câu trả lời. Người đọc chỉ cần nền Excel văn phòng cơ bản và các bài trước; PivotTable được giải nghĩa tại chỗ.

Người làm khóa học đã chốt **giữ lại hai tình huống hiện có**:

- **3.1:** chị Hạnh tổng hợp đơn nghỉ đã duyệt, bắt đầu trong tháng 9/2026: số đơn, tổng ngày, bình quân làm tròn hai số lẻ, ít nhất và nhiều nhất. Cộng toàn bộ SoNgay trên đơn đạt điều kiện, không phân bổ ngày thực nghỉ theo tháng.
- **3.2:** chị Hạnh đếm hồ sơ đang làm theo MaPB hiện lưu, xếp số lượng giảm dần rồi mã tăng dần. Phạm vi và kết quả này tiếp tục làm nền cho 3.3.

Các quyết định còn lại dưới đây là đề xuất của tác giả, đã được duyệt cùng thiết kế.

## Các cách đã cân nhắc

| Cách | Được và mất | Quyết định |
|---|---|---|
| Giữ tình huống, viết lại phần giảng và drawer | Giữ mạch nghiệp vụ, các câu chính và đường sang 3.3; cần đưa kiến thức từ ví dụ phụ về lời giảng gọn mà vẫn đủ làm đề | Chọn theo yêu cầu giữ tình huống của người dùng |
| Đổi hai bài thành một báo cáo xuyên suốt trên cùng bảng | Dễ đối chiếu tổng chung với tổng theo nhóm, nhưng đổi yêu cầu nghiệp vụ và ảnh hưởng điểm nối sang 3.3 | Bỏ vì người dùng chốt giữ tình huống |

Chỉ đổi tiêu đề/bớt tiểu mục chưa đủ: các câu phụ trên bảng/phạm vi khác và drawer thiếu đầu vào/bảng soi vẫn cần xử lý.

## Mục tiêu và phạm vi

- Hai bài có đúng hai tiểu mục chính, cùng nhịp với bài 2.1: Excel → câu SQL chính → LineMap → lời giảng cần thiết; rồi RunFlow → Result → trả lời chị Hạnh.
- Mỗi bài có đúng một khối Sql trong phần giảng, là câu chính hiện có. Query lặp trong RunFlow và sql kiểm của từng bước vẫn giữ đúng vai trò, không biến thành ví dụ SQL phụ trên trang.
- Giữ đủ kiến thức làm ba đề mỗi bài; không dùng đáp án hoặc tự kiểm tra để dạy bù.
- Giữ slug, số bài, tiêu đề, câu SQL chính, phạm vi, YAML/ID/đáp án và cơ chế chấm/lưu nháp. Chỉ làm lại 3.1 và 3.2; không chuyển 3.3 hoặc các bài khác, không sửa seed/API/editor/component chung.
- Sửa test đang phụ thuộc câu phụ thành kiểm kiến thức/số liệu còn phải bảo vệ; gỡ đúng hai slug khỏi danh sách chờ chuyển khung. Không nới test hoặc thêm allowlist.

Thất bại dù build chạy được: bài ngắn hơn nhưng người học không phân biệt đếm dòng với đếm giá trị, không hiểu vì sao đổi khóa nhóm đổi dòng kết quả, hoặc không làm được một trong sáu đề.

## Bài 3.1 — từ các đơn đạt điều kiện đến một dòng

### Phần chính

Tiêu đề giữ chủ đề tổng hợp đơn nghỉ. Tiểu mục đầu dự kiến **Từ công thức Excel đến các hàm tổng hợp**:

1. Giữ hình Excel chín đơn đạt điều kiện và vùng SoNgay; giải thích đây là vùng đã tách đúng phạm vi. Nhắc ngắn SUM thông thường không tự bỏ các dòng bị AutoFilter ẩn, để người đọc không cộng sai vùng.
2. Dẫn sang SQL rồi đặt ngay câu chính hiện có, không để bảng lý thuyết hoặc query phụ đứng trước nó.
3. Thêm LineMap cho COUNT(*), SUM, AVG/CAST, MIN/MAX, FROM và các điều kiện WHERE; mỗi dòng có Ví dụ từ chính đơn nghỉ/tập kết quả của tình huống.
4. Giảng tiếp các điểm cần thiết dưới đây, không tách thêm tiểu mục và không thêm query trên NhanVien.

**Kiến thức phải còn:** hàm tổng hợp tính trên nhiều dòng; không GROUP BY thì tổng hợp cả phạm vi thành một dòng. COUNT(*) đếm dòng; COUNT(cột) đếm giá trị khác NULL, không xác nhận hợp lệ. Dùng chính `COUNT(SoNgay)` để giải nghĩa cú pháp: vì SoNgay của bộ mẫu là NOT NULL nên ở đây nó bằng số đơn, không giả rằng có đơn thiếu SoNgay.

SUM/AVG/MIN/MAX bỏ NULL, còn 0 vẫn tham gia. Giữ minh họa thu gọn `2`, `NULL`, `0` và cách tính mẫu số, ghi rõ đây là các giá trị giả định để hiểu SoNgay nếu được phép thiếu, **không phải ba đơn của bộ mẫu**; dùng lời/phép tính, không khối Result giả hoặc query phụ. Từ quy tắc COUNT(cột), người học chuyển sang Email ở bài tập.

Giải thích trường hợp WHERE không giữ dòng nào: câu tổng hợp không GROUP BY vẫn có một dòng, hai cách COUNT bằng 0, các hàm còn lại NULL; nếu có dòng nhưng cột đều NULL thì các hàm đó cũng NULL. Không tự thay NULL bằng 0 trước khi tính bình quân. SoNgay đang là decimal; CAST ở ngoài AVG làm tròn/định dạng kết quả chứ không sửa từng đơn. Giới hạn AVG với đầu vào int chỉ nhắc ngắn khi đối chiếu việc ép kiểu, không có query hay cột giả thêm.

Bỏ query/result phụ `COUNT(Email)` trên toàn NhanVien. Bảng đối chiếu hàm Excel/SQL cũ được gộp vào LineMap/lời cần thiết, tránh giảng hai lần. COUNTA/COUNT của Excel được phân biệt đủ để đếm mã dạng chữ. MIN/MAX với ngày chỉ nhắc ngắn trong phạm vi cột TuNgay nếu cần, không đổi sang cột ngày vào làm của NhanVien.

Tiểu mục sau **SQL Server chạy câu này thế nào**: lời dẫn ngắn → RunFlow → Result chính → trả lời chị Hạnh. Giữ lưu ý số đơn khác số người, ngày trên đơn khác thực nghỉ trong tháng, DP018 bắt đầu tháng 8 nên ngoài phạm vi. Không giải cách đọc Results/Messages hoặc kể chi tiết số dòng trên từng thẻ ở lời dẫn.

### Drawer

Giữ ba bước `FROM → WHERE → SELECT`, tổng dự kiến theo bài hiện có `20 → 9 → 1`.

- FROM có input chỉ rõ DonNghiPhep. Dùng bảng trích các cột MaDon/TuNgay/SoNgay/TrangThai, nói rõ bảng trích khi không phải toàn bộ cột nguồn. Chọn tối đa năm dòng đầu vào cho bước sau gồm ít nhất đơn giữ, đơn từ chối/chờ và đơn ngoài tháng; có DP018 để hiểu giới hạn xuyên tháng khi phù hợp.
- WHERE có inputColumns chứa đủ MaDon/TrangThai/TuNgay và checks cho cả ba điều kiện: trạng thái, mốc dưới, mốc trên. Totals đếm riêng trên cả nguồn rồi số giữ, không vẽ thành ba lượt lọc. Các mã trong checks đều có trong năm dòng đầu và có/không ở kết quả đúng kết luận.
- SELECT có đầu vào chứa MaDon/SoNgay, nói rõ trích tối đa năm trong chín đơn; năm dòng hiện không phải toàn bộ mẫu số. Giải thích hàm tính trên cả chín dòng rồi trả một dòng năm chỉ tiêu. Không thêm bảng nhánh CASE hoặc thay component để diễn hoạt phép tổng hợp.

Kết quả dự kiến từ bài hiện tại: `9 / 16.0 / 1.78 / 1.0 / 3.0`; phải chạy lại SELECT và kiểm đủ mọi dữ kiện của bản mới trước khi ghi nhận đã đạt.

## Bài 3.2 — từ hồ sơ đang làm đến từng nhóm phòng

### Phần chính

Tiểu mục đầu dự kiến **Từ Rows và Values của PivotTable đến GROUP BY**. Giải nghĩa PivotTable và Filters/Rows/Values/Count bằng ngay việc chị Hạnh cần; giữ hình kết quả với KD và dòng tổng cộng được đánh dấu. Đặt câu SQL chính ngay sau phần Excel, rồi thêm LineMap cho khóa MaPB, COUNT(*), WHERE, GROUP BY và ORDER BY.

Giữ nghĩa **khóa nhóm**, một tổ hợp khóa tạo một dòng; cột lấy trực tiếp trong SELECT mà không tổng hợp phải thuộc GROUP BY trong dạng câu đang học. COUNT tính riêng từng nhóm, không đếm toàn bộ rồi lặp cùng số cho mọi phòng. Phân biệt DISTINCT chỉ bỏ dòng trùng với GROUP BY kèm chỉ tiêu; không nói GROUP BY luôn khác DISTINCT trong mọi cách viết.

Nhóm nhiều cột được giải thích bằng đoạn trích `GROUP BY MaPB, TrangThai` ngay trên các cột của tình huống, không query/result phụ đổi phạm vi sang toàn KD. Nói rõ trong phạm vi đã lọc đang làm, thêm TrangThai không tách thêm nhóm vì mọi dòng cùng trạng thái; nếu đề yêu cầu mọi trạng thái thì mỗi cặp phòng/trạng thái có hồ sơ là một nhóm. Đủ cú pháp và nghĩa để làm đề 3-2-2, không chép đáp án của đề.

Giữ các giới hạn bằng lời gọn: không tự sinh phòng số 0 hoặc Grand Total; cột nhóm nếu có NULL thì các dòng NULL cùng một nhóm, không dựng dữ kiện MaPB NULL trong bộ mẫu; GROUP BY không bảo đảm sắp; alias số lượng dùng được ở ORDER BY vì sau SELECT. Số liệu theo phòng hiện lưu, không dựng phòng trong quá khứ. Bỏ hai query/result phụ đếm tổng 45 và tách KD theo trạng thái. Tổng 45 được đối chiếu bằng cộng các nhóm trong lời giải, không cần thêm câu truy vấn.

Tiểu mục sau **SQL Server chạy câu này thế nào**: lời dẫn → RunFlow → Result sáu nhóm → câu trả lời. Vẫn nối sang 3.3 để học lọc nhóm và 3.4 để lấy tên phòng.

### Drawer

Giữ năm bước `FROM → WHERE → GROUP BY → SELECT → ORDER BY`, tổng dự kiến `48 → 45 → 6 → 6 → 6`.

- FROM/WHERE hiển thị MaNV/MaPB/TrangThai; trích tối đa năm dòng đầu có cả đang làm và đã nghỉ. WHERE có checks và tổng 45 giữ/48 nguồn; người học thấy cụ thể vì sao một hồ sơ bị loại.
- GROUP BY nhận MaNV/MaPB/TrangThai, có mã phòng lặp để nhìn thấy việc gom; kết quả trích đủ sáu mã cùng kích thước nhóm. Lời nói đây là bảng đối chiếu kích thước nhóm, không khẳng định alias SoHoSo đã khả dụng trước SELECT; sql kiểm dùng một SELECT hợp lệ để đối chiếu trạng thái minh họa.
- SELECT chọn mã phòng, số lượng và đặt alias; đầu vào đủ hai giá trị đang chọn. ORDER BY thấy MaPB/SoHoSo, bảng trước sắp chọn thứ tự khác sau sắp để thấy tác dụng. Không mô tả các bảng trước ORDER BY là thứ tự SQL bảo đảm.

Kết quả dự kiến từ bài hiện tại: KD 13, IT 10, VH 8, KT 7, NS 5, BGD 2. Chạy lại câu chính và từng câu kiểm trước khi điền/ghi đã xác minh.

## Sáu bài tập và phần cuối

| Đề giữ nguyên | Kiến thức phải được giảng trước phần ôn |
|---|---|
| 3-1-1, hồ sơ đang làm/email | COUNT(*) và COUNT(cột), cùng phạm vi, không lọc mất NULL trước khi đếm |
| 3-1-2, đơn đã duyệt bắt đầu tháng 8 | Năm hàm, lọc theo TuNgay, số thập phân và đơn xuyên tháng |
| 3-1-3, tháng không có đơn | Một dòng không GROUP BY, COUNT 0, các hàm còn lại NULL |
| 3-2-1, theo chức danh | Đổi khóa nhóm sang MaCD, đã có nghĩa mã chức danh ở 2.6; sắp hai tiêu chí |
| 3-2-2, phòng/trạng thái | Cú pháp nhiều khóa, mỗi tổ hợp, phạm vi mọi trạng thái, không sinh tổ hợp thiếu |
| 3-2-3, theo loại nghỉ | COUNT/SUM từ 3.1 tính riêng từng nhóm, không tự thêm giới hạn tháng |

Hay nhầm dùng lỗi/hậu quả của chính câu chính; bỏ ví dụ cột hoặc bảng khác. Ứng dụng giữ việc làm được nhờ chủ đề, không chèn query. Memo ôn phần đã giảng; mỗi bài dự kiến ba câu tự kiểm tra: 3.1 đếm/bình quân/tập rỗng, 3.2 chọn khóa/phạm vi không có dòng/thứ tự. Thay câu hỏi KD đang làm/đã nghỉ cũ bằng câu đã đủ tiền đề trong phần giảng mới. Đáp án ngắn, không giấu định nghĩa cốt lõi trong details.

Không đổi metadata/đường dẫn ngoài yêu cầu. Tác giả được chỉnh goal/summary để đúng lời giảng và ước lượng minutes theo độ dài thực, không tuyên bố đã đo thời gian học.

## Cách kiểm và bàn giao

1. Kiểm kỹ thuật tác giả: SELECT chỉ đọc trên database khóa học cho câu chính, mọi bước, checks/tổng độc lập và các minh họa/giới hạn cần dẫn chứng. Chỉ đưa số được kiểm; không đọc/in secret. Hồ sơ hiện có chưa thay bằng chứng chạy lại của lượt này.
2. Cập nhật test 3.1/3.2 và kiểm flow/content cho cấu trúc mới, tiền đề và số liệu; không giữ assert bắt buộc query phụ đã bỏ. Chạy API build/check:exercises rồi check:data sau runner hoàn tác; npm test/check/build/check:dist.
3. Mở đúng build mới: hình Excel đánh dấu, SQL/tab/copy-paste, ba phần drawer, đủ input/checks và chuyển bước. Ghi viewport và giới hạn thật; không báo SSMS/xác thực/submit nếu chưa thử.
4. Mỗi bài một reviewer mới, ngữ cảnh mới, model kế thừa theo §4.5. Giao đủ source/build/tiền đề/quyết định, không giao nhận xét cũ. Đọc hết report, xử lý cả mục nhỏ và cập nhật spec/plan, lưu report gốc + ma trận theo §4.6.
5. Sau hai bài có reviewer tích hợp mới kiểm mạch 2.9→3.1→3.2→3.3, phạm vi bài tập và giới hạn của sơ đồ. Bàn giao nguồn/HTML/UI/SQL/lỗi nền riêng biệt. Push/deploy không thuộc lượt thiết kế và soạn bài này.

## Phần giao cho người triển khai tự quyết

Chọn câu chữ/tiêu đề phần chính, dòng trích và mark cụ thể, bố trí LineMap/Memo gọn, cập nhật test theo ý nghĩa và thời lượng ước lượng. Giữ các quyết định phạm vi ở trên. Không tự đổi query chính, YAML, seed, API, renderer hay mở rộng bài khác để xử lý khó khăn; báo lại thiết kế nếu phát hiện cần đổi phạm vi.

Nguồn kỹ thuật đã đối chiếu khi thiết kế: [COUNT](https://learn.microsoft.com/en-us/sql/t-sql/functions/count-transact-sql?view=sql-server-ver17), [AVG](https://learn.microsoft.com/en-us/sql/t-sql/functions/avg-transact-sql?view=sql-server-ver17), [GROUP BY](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql?view=sql-server-ver17). Đây là kiểm tài liệu; chưa phải SQL live hay kiểm sản phẩm của lượt mới.

Triển khai: [hồ sơ kiểm](../../reviews/2026-11-01-lessons-3-1-3-2/verification.md). Đã chạy SELECT mới xác minh các số dự kiến và cơ chế NULL/nhóm; cả hai bài đã viết lại theo thiết kế, không đổi query chính hoặc YAML. Bảng GROUP BY của 3.2 dùng caption “Số hồ sơ trong nhóm” để tách nhãn minh họa khỏi alias SoHoSo chỉ được đặt ở SELECT; thuộc phần chọn nhãn của người triển khai, không đổi renderer. Các kết quả nguồn/HTML/UI/review được ghi riêng khi hoàn tất.

Sau review từng bài: gọi int là số nguyên ngay lần đầu; FROM của hai bài nói rõ chưa chọn cột kết quả. Rút câu SELECT drawer lặp chú thích trích nhóm và sửa vế dẫn 3.5 về giữ dòng chưa khớp đúng nội dung bài sau. Không đổi thiết kế, câu chính, dữ liệu hoặc đề; [ma trận xử lý](../../reviews/2026-11-01-lessons-3-1-3-2/verification.md) giữ đầy đủ nhận xét và giới hạn độc lập của reviewer.

## Tiến trình thiết kế

- [x] Đọc quy ước/template, hồ sơ công ty, 2.1–2.9 và nguồn/bài tập/test của 3.1–3.2; kiểm điểm nối 3.3.
- [x] Người dùng chốt giữ hai tình huống; viết bản thiết kế.
- [x] Builder check bằng agent mới, ngữ cảnh mới, kế thừa model phiên, không đổi model/effort. [Report gốc](../../reviews/2026-11-01-design-3-1-3-2/builder-check.md): không còn câu hỏi quan trọng cần trả lời; không có mục cần sửa thiết kế hoặc hỏi thêm người dùng.
- [x] Người dùng duyệt thiết kế trong chat: “duyệt”.
- [x] Sau khi duyệt: đọc skill writing-plans, viết và tự rà kế hoạch triển khai.
