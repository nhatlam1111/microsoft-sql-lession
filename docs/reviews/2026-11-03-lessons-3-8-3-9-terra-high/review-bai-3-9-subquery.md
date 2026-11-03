# Review độc lập bài 3.9 — Subquery

## Phạm vi, phiên bản và cách kiểm

Gói giao cấu hình agent `gpt-6.1-terra` / `high`, ngữ cảnh mới; công cụ trong phiên review không xác nhận model runtime, nên không khẳng định đã xác minh cấu hình thực tế. Đọc nguồn bài 3.9, YAML, HTML snapshot, quy ước, template, hồ sơ công ty và các bài trước được giao; dùng quyết định triển khai để hiểu phạm vi. Không đọc seed, report cũ, nhận xét người khác; không chạy SQL, API/runner hay browser.

Manifest tại `temp/verification/2026-11-03-lessons-3-8-3-9/source-build-manifest.json` ghi HEAD `63f8f5c` cộng MDX chưa commit; SHA-256 thực tế khớp cả MDX (`db135e2b…efcd2596`), YAML (`c11de199…f007609d`) và snapshot (`53e6a818…3c4bbb0d`). Snapshot được gói ghi sao từ build kết thúc 21:38:46. Không tự dựng lại để xác minh build.

Giới hạn quy trình bài tập: khi trích prompt YAML bằng lệnh có ngữ cảnh, phần `answer` cũng xuất hiện ngay bên dưới từng đề. Vì vậy không thể xác nhận đã khóa đánh giá từng đề trước khi nhìn đáp án như gói yêu cầu. Bảng dưới chỉ đối chiếu tiền đề với lời giảng, không coi đáp án là lời giảng; cần một lượt đọc mù riêng nếu bắt buộc bằng chứng độc lập theo đúng thứ tự.

## Rà theo thứ tự bài

- **Tình huống — Giữ được:** “ít nhất một đơn đã duyệt bắt đầu trong tháng 9” cùng phạm vi ngay sau chat phân biệt đơn với trạng thái nhân viên, phòng hiện lưu với phòng lịch sử, và một hồ sơ với một đơn. Mục tiêu và câu hỏi ăn khớp.
- **Excel → IN — Giữ được:** hình ghi rõ chỉ trích ba hồ sơ, kiểm thủ công với toàn bộ danh sách. `C2`/`C3` đánh dấu đúng hai trường hợp. Bài giải thích câu con sau `IN` một cột, nhiều hoặc không dòng; LineMap gắn các phần với ví dụ và không làm lẫn `TrangThai` của đơn với hồ sơ.
- **EXISTS / NOT EXISTS — Giữ được:** đoạn thay thế có `copy={false}` và chỉ rõ giữ câu ngoài; điều kiện liên hệ, `SELECT 1`, phạm vi khi thêm `NOT`, đặt điều kiện ngoài/trong và bẫy `NOT IN` được giải thích trước phần ôn. Cách nói không hứa nhanh hơn JOIN. Chưa tự xác minh các con số bằng SQL.
- **RunFlow, bước ORDER BY — Biên tập:** “Bảng trích các bước trước cũng xếp mã để dễ đọc” (bước 04). Năm dòng đầu vào đã đúng thứ tự như kết quả, nên người mới thấy lời giải nhưng không thấy thao tác sắp làm thay đổi vị trí nào. Mục 2.6 yêu cầu chọn dòng trích để thấy thứ tự cần đổi. Đề xuất đổi thứ tự bản trích trước bước sắp trong phạm vi không cam kết thứ tự; giữ kết quả cuối tăng dần. Đây là vấn đề minh họa, không phải kết luận kết quả sai.
- **RunFlow còn lại — Giữ được:** FROM nêu rõ ba cột là bản trích; WHERE đầu vào có `MaNV`, bảng soi đúng năm mã và phân loại khớp danh sách chín mã, tổng 9 giữ; SELECT có đủ ba cột, các bước nối tổng 48 → 9 → 9 → 9 và 3 cột minh họa. Từng `focus` tương ứng phần `query`; `sql` bước được đối chiếu trong nguồn. WHERE trình bày năm mã đầu và bốn mã còn lại nên có thể tự đối chiếu cả hai mã bị loại. Đây là kiểm tĩnh, không chứng minh dữ liệu thật.
- **Kết quả → Hay nhầm → Ứng dụng → ôn — Giữ được:** câu trả lời ngay sau bảng, nói đúng đơn vị và giới hạn. Các lỗi chỉ ra hậu quả; ba ứng dụng dùng đúng chủ đề. Tự kiểm tra sau Ghi nhớ, trước bài tập, phủ số cột IN, liên hệ EXISTS và phạm vi NOT EXISTS; các đáp án đã có trong phần chính. Bold chọn lọc, mã và ô trong lời văn có định dạng; không thấy lặp cần cắt có tác động đáng kể.

Các câu hỏi khi học thử: Vì sao cần câu con? Phần Excel → IN giải thích tránh chép mã và lấy danh sách từ nguồn. Vì sao không dùng JOIN ngay? Phần EXISTS giải thích JOIN có thể nhân hồ sơ, dẫn 3.6. Vì sao phải liên hệ mã? Phần EXISTS và Hay nhầm 2 giải thích đơn phải thuộc đúng người đang xét. `NOT EXISTS` có nghĩa chưa từng có đơn? Phần NOT EXISTS dùng NV001 để bác cách hiểu đó. Vì sao điều kiện kỳ ở trong? Đoạn trước giới hạn bài cho biết đặt điều kiện dòng liên quan ở câu con; mục đích là kiểm đúng phạm vi dòng liên quan. Vì sao không `NOT IN`? Đoạn NULL nêu `UNKNOWN` và hậu quả bị WHERE loại. Các câu hỏi này đã được trả lời; không cần thêm đoạn giảng dài.

## Tiền đề từng bài tập

| Đề | Cần biết | Đã dạy ở đâu | Thiếu/vướng |
|---|---|---|---|
| 3-9-1 | Chọn và xếp cột, lọc trạng thái Unicode trong câu con, IN một cột, bỏ giới hạn ngày và trạng thái nhân viên. | 2.1, 2.3, 2.4; phần IN và phạm vi đơn của 3.9. | Không thấy thiếu tiền đề về cách viết; độ đúng kết quả chưa chạy. |
| 3-9-2 | Lọc `MaPB` ở ngoài, dùng EXISTS liên hệ `MaNV`, không thêm điều kiện ngày/loại. | 2.3, 3.4–3.5; phần EXISTS và đoạn đặt phạm vi của 3.9. | Không thấy thiếu tiền đề; phải chuyển ví dụ từ đơn sang hợp đồng, 3.5 đã dùng hai bảng này. |
| 3-9-3 | NOT EXISTS liên hệ mã, lọc `KyLuong` trong câu con, giữ mọi trạng thái, chọn và xếp cột. | 3.6 giới thiệu bảng lương và kỳ `2026-09`; phần NOT EXISTS và đặt điều kiện kỳ bên trong ở 3.9; 2.1/2.4 chọn và xếp. | Không thấy thiếu tiền đề; chưa kiểm kiểu cột hoặc kết quả live. |

Đối chiếu answer YAML sau khi nó đã vô tình hiện trong lần trích: ba answer dùng cùng loại điều kiện và phạm vi như đề; không chép đáp án, không xem đó là bằng chứng chạy đúng. Bộ chấm được bài mô tả so kết quả, không bắt buộc cú pháp duy nhất.

## Ưu tiên và giới hạn

Ưu tiên thấp: cân nhắc chỉnh thứ tự bản trích cho bước ORDER BY để người học thấy hiệu ứng. Chưa phát hiện thiếu kiến thức được giảng cho ba đề qua kiểm tĩnh, nhưng kiểm tiền đề mù cần làm lại do giới hạn quy trình nêu trên. Không kết luận chắc học viên tự làm được hay SQL đã chạy đúng.

HTML snapshot có văn bản SQL với nháy thẳng và tab thật, không thấy backtick hoặc chuỗi escape `\\t` lộ trong phần văn bản; bảng, query và các phần drawer hiện trong HTML phù hợp nguồn. Kiểm tĩnh không xác nhận tab hiển thị đúng bốn cột theo CSS, thao tác copy/paste, focus runtime, bàn phím, mở drawer, viewport, SSMS, đường thực hành web hay SQL live. Không có thao tác browser hoặc viewport để báo. Số liệu và nội dung Messages là những gì nguồn/snapshot trình bày, không phải kết quả chạy độc lập của reviewer.
