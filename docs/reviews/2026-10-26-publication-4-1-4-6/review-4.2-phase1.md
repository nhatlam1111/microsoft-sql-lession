# Học thử bài 4.2 — giai đoạn 1, khóa trước khi đọc YAML

Đóng vai Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học Microsoft SQL Server để đủ hiểu và phản biện developer.
Học thử từ góc nhìn người học, soi từng câu từng chữ: chỗ mơ hồ, thuật ngữ chưa giải thích, thiếu điều kiện, ví dụ gây hiểu nhầm hoặc kiến thức không chính xác.
Review chân thật: có lỗi thì chỉ rõ và giải thích; đúng thì công nhận; chưa xác minh được thì nói rõ, không đoán hay cố bới lỗi.
Phải luôn tự đặt ra các câu hỏi tại sao, để làm gì, vì sao như thế,..., và xem bài học có trả lời được hay không.

## Phạm vi, phiên bản và công cụ

- Bài: `src/content/lessons/4-2-xep-hang-row-number-rank.mdx`, toàn bộ dòng 1–466, gồm mọi SQL, Result và bốn drawer của RunFlow.
- Gói được giao: nhánh `codex/review-lessons-4-1-4-6`, source ban đầu `dd67309`; root cho biết mới thêm plan, chưa sửa bài. Đây là nhận diện phiên bản theo gói giao việc, không phải kiểm Git độc lập.
- Đã đọc AGENTS.md, quy ước hiện hành (đặc biệt 4.5/4.6), template, hồ sơ công ty, mẫu 1.1 và toàn bộ các bài nền 4.1, 3.6, 2.4, 3.1. Chỉ sử dụng `public-4.2.json` để xem đề ở giai đoạn này; chưa mở YAML/answer/check.
- Model: kế thừa model của phiên, không chọn model khác và không giao agent con.
- Công cụ thực dùng: PowerShell để đọc source có số dòng, `rg --files` tìm đúng đường dẫn; phép kiểm source giả lập chỉ đối chiếu chuỗi/cấu trúc, không thực thi SQL. Lần đầu phép kiểm PowerShell lỗi cú pháp pipe; đã sửa lệnh kiểm và chạy lại thành công.
- Chưa được giao build mới; không đọc dist cũ. Chưa kiểm HTML, giao diện, copy/paste, truy cập web hay SQL live. Không đọc seed/secret, report cũ, nhận xét người khác, tài liệu SQL ngoài khóa học; không gọi API/DB/runner, không sửa Git hoặc sản phẩm.

## Rà theo thứ tự bài

| Phạm vi | Kết quả học thử từ source |
|---|---|
| Mục tiêu/thời lượng, dòng 8–13 | Mục tiêu chọn một dòng mỗi nhóm và phân biệt đánh số/đồng hạng được triển khai đủ. 35 phút có thể dành cho ba hàm mới, ôn CTE và ba đề; chưa đo thời gian với người học thật. |
| Tình huống, dòng 18–24 | Có mốc 21/10/2026, phạm vi hợp đồng, không lọc trạng thái và khóa phân định cùng ngày. Phân biệt rõ “mới nhất theo ngày bắt đầu đã lưu” với hiệu lực/pháp lý, không mâu thuẫn bài 3.6. |
| Excel → hàm cửa sổ, dòng 30–36 | Đi từ sắp xếp và đánh số từng mã, không cần biết PivotTable/VLOOKUP. Hàm cửa sổ, ROW_NUMBER, OVER và PARTITION BY được giải thích tại chỗ; nói rõ giữ dòng chi tiết và khác GROUP BY. Lý do cần MaHD duy nhất và lọc ở câu ngoài có đủ. |
| Câu kiểm một mã, dòng 38–54 | SQL chọn ba hợp đồng của NV021 để nhìn ba số thứ tự; Result giữ đủ ba dòng, khác thao tác lọc số 1 ở câu chính. Ngày được giới hạn trong CTE trước khi đánh số. Ngày/mã của NV021 khớp những gì bài 3.6 đã kể; chưa kiểm nguồn DB. |
| Đồng hạng, dòng 58–82 | Bảng chín đơn cho đủ ba hàm: các mức SoNgay 3/2/1 có số dòng 2/3/4. Tự đối chiếu từ chính bảng: RANK là 1/3/6, DENSE_RANK là 1/2/3; lọc đến 3 lần lượt giữ 3/5/9 dòng như lời giảng. ROW_NUMBER có MaDon phân định; hai hàm đồng hạng chỉ dùng SoNgay. Phân biệt ORDER BY trong OVER với ORDER BY cuối. Mẫu biểu thức từng loại là đoạn đọc, có copy=false. |
| Phạm vi và lời giải, dòng 84–104 | Có giới hạn kiến thức và dẫn bài sau. Câu chính đúng cấu trúc đã giảng: đánh số trên hợp đồng đạt mốc, giữ số 1 mỗi MaNV rồi trả ba cột đã yêu cầu. Lời đáp nằm ngay cạnh Result, phân biệt trích 10 dòng với tổng 46; 55 hợp đồng đầu vào và hai mã không có hợp đồng khớp hồ sơ công ty, chưa xác minh live. |
| RunFlow, dòng 108–409 | Chỉ giải SELECT ngoài và gọi đúng thứ tự logic; không hứa CTE vật chất hóa. Đã đọc đủ meaning/detail/sql/columns/rows/total của cả bốn bước, ghi riêng bên dưới. |
| Hay nhầm/Ứng dụng, dòng 415–427 | Nhắc hậu quả cụ thể của MAX chưa chọn cả dòng, bỏ ORDER BY cuối, hiểu nhầm hiệu lực; ứng dụng bám chọn dòng mỗi nhóm và đồng hạng. Không thấy phần mở rộng làm vướng ba đề hoặc lời khuyên chung thay kiến thức. |
| Memo/tự kiểm tra, dòng 433–458 | Memo ngắn đúng ba hàm. Ba câu ôn nằm sau Memo, trước Bài tập; đáp án đều đã có ở dòng 32–34, 71–73, 75–82, không dùng ôn để dạy bù. |
| Bài tập, dòng 464 và public JSON | Có lời nhắc bộ chấm so kết quả/thứ tự, không bắt buộc kỹ thuật hay bí danh; người học phải tự đối chiếu hàm đang luyện. Cảnh báo không thêm mã duy nhất vào khóa đồng hạng phù hợp đề 2. |

### Rà đủ bốn drawer RunFlow

| Bước | SQL và trạng thái mô tả | Dữ liệu source và giới hạn |
|---|---|---|
| FROM, dòng 124–198 | Câu kiểm giữ đầy đủ CTE, lấy cả SoThuTu từ nguồn đã đánh số; sắp mã/số thứ tự phục vụ đối chiếu như detail giải thích. | 4 cột, trích 10 dòng, total=55. Những dòng đầu đều có số 1 không có nghĩa mọi mã chỉ một hợp đồng; câu NV021 phía trên đã cho thấy ba dòng. |
| WHERE, dòng 201–275 | Giữ cùng phạm vi ngày trong CTE, thêm điều kiện SoThuTu=1 ở câu ngoài; vẫn hiện số thứ tự để kiểm. | 4 cột, trích 10 dòng, total=46; từng dòng trích có số 1. |
| SELECT, dòng 278–341 | Câu kiểm bỏ SoThuTu khỏi ba cột báo cáo, vẫn dùng nó để lọc. | 3 cột, trích 10 dòng, total=46; không làm mất dòng thêm. |
| ORDER BY, dòng 344–407 | Sắp MaNV tăng dần; detail phân biệt thứ tự tính với thứ tự bảng trả về. | 3 cột, trích 10 dòng, total=46; khớp Result câu chính. |

Kiểm nguồn tự động đã xác nhận câu SQL chính trùng RunFlow.query, cả bốn focus có trong query sau giải mã tab, mỗi bảng trích có 10 dòng và độ rộng mọi dòng khớp số cột; tổng lần lượt 55/46/46/46. Đây chỉ là kiểm cấu trúc/source, không xác nhận SQL đã chạy hoặc số liệu toàn DB đúng.

## Các câu “tại sao/để làm gì” tự đặt khi học

| Câu hỏi | Bài đã đáp ở đâu |
|---|---|
| Vì sao không chỉ GROUP BY hoặc MAX ngày? | Dòng 30 giữ dòng chi tiết; Hay nhầm 1, dòng 415 nói MAX chỉ cho ngày, chưa chọn các cột của cùng hợp đồng. |
| Vì sao bắt đầu lại số 1 theo nhân viên? | Dòng 30–32 giải PARTITION BY; nếu tính chung sẽ chỉ có một dãy cho cả nguồn. |
| Vì sao phải thêm mã hợp đồng khi cùng ngày? | Dòng 32–34: khóa duy nhất phân định thứ tự, không chứng nhận dữ liệu đúng. Nền nhiều khóa sắp đã có ở 2.4. |
| Vì sao lọc ngày trước, lọc số thứ tự sau? | Dòng 36 và 54: WHERE cùng cấp chưa dùng được kết quả cửa sổ; hợp đồng sau mốc không được chiếm số 1. CTE/lọc cột đã tính đã học ở 4.1. |
| Vì sao RANK nhảy hạng, DENSE_RANK không nhảy? | Dòng 58 và 71: hai dòng đứng trước làm hạng sau là 3, nhưng đó mới là mức ngày thứ hai. |
| Vì sao khóa phụ tốt cho ROW_NUMBER lại có hại cho đồng hạng? | Dòng 73: mã duy nhất phá bằng nhau theo tiêu chí SoNgay. |
| Vì sao hạng đến 3 không nhất thiết chỉ ba dòng? | Dòng 82 cho đối chiếu 3/5/9 ngay trong bảng có sẵn. |
| Vì sao cần ORDER BY cuối và vì sao thiếu NV047/NV048? | Dòng 73, drawer ORDER BY và Hay nhầm 2 giải thứ tự; dòng 104 giải hai mã chưa có dòng hợp đồng để đánh số. |
| Đây có phải hợp đồng đang hiệu lực không? | Dòng 22, 104 và Hay nhầm 3 giới hạn đúng quy tắc báo cáo, không thay bài toán ngày ở 3.6. |

## Bảng tiền đề và cách làm từng đề — lập trước đáp án

| Đề công khai | Kiến thức cần và nơi đã giảng | Cách làm tự xác định, không chép câu SQL | Thiếu tiền đề / khó tìm |
|---|---|---|---|
| 4-2-1: đánh số đơn chờ duyệt theo loại | WHERE/chuỗi Unicode đã dùng trong 3.1 và xuyên bài 4.1; ROW_NUMBER/PARTITION BY tại 4.2:30–34, phân nhóm LoaiNghi tại 75–80; nhiều khóa sắp/alias tại 2.4. | Chỉ giữ trạng thái đề yêu cầu; chia đánh số theo loại, ưu tiên số ngày rồi mã đơn theo hai hướng đề nêu; giữ mọi dòng và trả đúng bốn cột; sắp loại rồi số thứ tự. Không cần lọc số thứ tự ở ngoài. | Không thấy thiếu. Tên trạng thái Chờ duyệt đã xuất hiện trong bảng của 3.1; không cần biết trước số dòng thực. |
| 4-2-2: hai cách đồng hạng cho Phép năm | RANK/DENSE_RANK, không PARTITION BY và hai ORDER BY tại 4.2:58–73; lọc theo loại là chuyển điều kiện đã biết từ WHERE. | Lọc duy nhất loại nghỉ đề cho; tính hai hạng chung trên tập đó bằng cùng chỉ tiêu số ngày; không đưa mã đơn vào OVER; dùng mã đơn chỉ để ổn định thứ tự cuối. Giữ mọi trạng thái/ngày và mọi dòng. | Không thấy thiếu. Không dùng phần tự kiểm tra hay đáp án để suy ra cách tính. |
| 4-2-3: tối đa ba đơn mỗi loại | CTE/phạm vi tên tại 4.1; ROW_NUMBER trong CTE rồi WHERE ngoài tại 4.2:36–54; giới hạn mỗi loại và điều kiện <=n tại 75–82. | Đầu vào toàn bộ đơn, đánh số riêng theo loại với số ngày giảm/mã tăng; ở câu ngoài giữ số thứ tự không quá ngưỡng; lấy bốn cột và sắp ba khóa theo đề. | Không thấy thiếu. Mẫu trong bài là tối đa hai; đổi ngưỡng thành ba là áp dụng trực tiếp, không cần kỹ thuật mới. |

## Đánh giá và khóa giai đoạn

- **Giữ được:** phạm vi nghiệp vụ rõ; Excel/SQL trong một mạch; đủ ba hàm, khóa phân định, điều kiện trước/sau cửa sổ; ba tự kiểm tra và ba đề có tiền đề trong phần đã học.
- **Cần sửa / Cần làm rõ / Cần cắt / Biên tập:** chưa xác định được finding cần tác giả sửa từ bằng chứng source. Không tạo finding chỉ để đủ số.
- Bold ở định nghĩa trọng tâm có chọn lọc, dẫn chứng/tên cột dùng code; không có Excel/LineMap/SSMS/Erd/Messages trong bài cần kiểm thêm. Result không đánh dấu dòng riêng nên không có dấu đánh sai để quy lỗi. Chưa có render để xác nhận dấu nháy, tab và component chuỗi.
- Các tổng 55/46 và dữ liệu hợp đồng chỉ khớp nội bộ tài liệu; 3/5/9 được tự kiểm trực tiếp từ đủ chín dòng source. Không đánh đồng hai mức bằng chứng này.

**Giai đoạn 1 đã khóa sau khi ghi file này và trước khi mở YAML. Không chỉnh sửa file sau khi biết answer/check.** Kết luận học thử hiện tại: từ bài 4.2 và các bài nền đã chỉ ra, tôi xác định được cách làm cả ba đề mà chưa dùng đáp án; điều này không phải chứng nhận SQL live/UI hay bảo đảm mọi người học đều tự làm được.
