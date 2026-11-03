# Review độc lập bài 3.5 — LEFT JOIN

## Phạm vi, phiên bản và cách kiểm

- Học thử với nền Excel văn phòng cơ bản; review `src/content/lessons/3-5-left-join.mdx`, từng đề trong `src/content/exercises/3-5-left-join.yaml` và HTML `dist/bai/3-5-left-join/index.html`. Đọc quy ước, template, hồ sơ công ty, bài mẫu, bài trước theo brief và chỉ phần Phạm vi/Review Focus được giao. Không đọc tự kiểm tác giả, report khác, database, tài liệu SQL bên ngoài hoặc bài sau để bù kiến thức.
- Gói ghi base `63f8f5c67782726a78fe794d617dfe0ae422e4cb`, source là working tree trước review. Đã tự đối chiếu SHA-256 các tài liệu nền, source, YAML và HTML 3.5 với manifest: khớp. Việc hash khớp chứng minh đang đọc đúng file gói giao, không tự chứng minh build được tạo từ source; mối liên hệ build/source là thông tin brief bàn giao.
- Cấu hình giao agent Codex: `gpt-6.1-terra`, `high`, `fork_turns: none`; công cụ không cung cấp xác nhận độc lập model thực tế. Dùng PowerShell/Python đọc tĩnh và kiểm hash, không browser, SQL, API, runner hay nộp bài. Trước khi xem answer YAML, đã đọc riêng prompt và tự xác định hướng giải; sau đó mới đối chiếu answer.

## Rà theo trình tự bài

### Tình huống và Excel

**Giữ được.** Câu hỏi phân biệt không có bất kỳ dòng hợp đồng với không có hợp đồng còn hiệu lực; phạm vi mọi hồ sơ và mốc tháng được nói rõ. Vì sao giữ danh sách hồ sơ? Vì cần tìm cả người không có bản ghi đối chiếu; `Key` và đoạn Excel trả lời. Vì sao `#N/A` có thể gây kết luận sai? Bài nói bản xuất phải đủ và mã dò đúng. Công thức dùng thứ tự cột đã ghi, ô D3/D4 khớp hai dòng không tìm thấy; bài 3.4 đã giảng cách dò chính xác và giới hạn VLOOKUP lấy lần khớp đầu. Trích ba hồ sơ không bị trình bày như toàn bộ dữ liệu.

### Câu SQL, LineMap và giải thích

**Mức vừa — Cần làm rõ:** đoạn “đặt điều kiện phạm vi bên phải trong `ON` rồi kiểm khóa” ngay sau LineMap cho biết vị trí nhưng không nói cách kết hợp điều kiện đó với so mã đã có. Câu chính chỉ có một điều kiện `ON`; câu tự kiểm chỉ nêu riêng điều kiện loại. Bài 2.3 đã giảng `AND` cho nhiều điều kiện ở `WHERE`, nên đây là tiền đề đã có nhưng phép chuyển sang `ON` chưa thật tường minh, không phải kiến thức hoàn toàn mới. Người mới làm đề 3.5-2 có thể biết phải đặt ở `ON` mà vẫn không biết nối thế nào. Gợi ý ngắn: thêm ngay tại đoạn này “nối thêm điều kiện phạm vi với điều kiện mã bằng `AND`”; không cần thêm truy vấn phụ hay đổi tình huống.

**Giữ được.** Vì sao kiểm `MaHD`? Bài giải thích khóa chính không `NULL` trên dòng hợp đồng thật, còn `NgayKetThuc` có thể `NULL` trên hợp đồng có thật. Vì sao `LEFT JOIN` vẫn tăng số dòng? LineMap và ví dụ NV021 giải thích mỗi hợp đồng tạo một cặp. `NULL` là phần hiển thị ở kết quả, không tạo hợp đồng mới. Vai trò `ON`/`WHERE`, điều kiện ở phía trái và giới hạn “bất kỳ” đều được trình bày trước phần ôn. LineMap đủ năm phần và có ví dụ cụ thể; tên bảng/cột trong lời văn được đánh dấu nhất quán, khối thuộc tính không lộ backtick trong HTML đã đọc.

### RunFlow và kết quả

**Giữ được.** Vì sao 48 hồ sơ thành 57 dòng? Bài phân biệt 55 cặp và 2 dòng không khớp, nêu 3 hợp đồng của một nhân viên, tránh gọi số dòng là số người. Bản trích và tổng được phân biệt; không suy số tổng chỉ từ 5 dòng hiển thị. Đọc cả nội dung các drawer trong HTML và source:

- `FROM`: nguồn `NhanVien`, 48 hồ sơ và 4 cột được trình bày; năm dòng là bản trích.
- `LEFT JOIN`: đầu vào có mã hồ sơ và các cột tiếp nối; lời đầu vào nêu bảng phải toàn bộ `HopDong`. Kết quả có 5 cột, gồm 3 cặp của NV021 và 2 dòng `NULL`, tổng 57. Không có bảng riêng hiển thị dữ liệu phía phải trước kết, vì vậy việc các bản ghi thực sự tồn tại cần nguồn dữ liệu/live để kiểm, không tự khẳng định từ hình.
- `WHERE`: đầu vào hiện `MaHD`; bảng soi trích đủ 3 dòng bị loại và 2 dòng giữ; tổng 2 đúng/2 giữ nhất quán, kết quả còn 2 dòng, 5 cột.
- `SELECT`: đầu vào thấy đủ 4 cột chọn và cột khóa dùng kiểm; kết quả giữ 2 dòng, còn 4 cột.
- `ORDER BY`: đầu vào có mã sắp, đầu ra 2 dòng 4 cột; bài nói hai dòng trích vốn đã ở thứ tự này. Bản cuối và lời trả lời ngay sau kết quả khớp nhau, có lưu ý kiểm hồ sơ giấy trước khi kết luận thực tế.

`query`, `focus` và SQL chính khớp theo nguồn; các câu SQL bằng chứng của từng bước được đối chiếu tĩnh với cột và thứ tự bước. HTML cho thấy các mệnh đề, dấu nháy ở ví dụ điều kiện và nội dung drawer; câu chính không có dòng SQL cần thụt lề tiếp dòng. Không suy ra thao tác bấm/copy hay CSS thực tế từ HTML.

### Hay nhầm, Ứng dụng, Ghi nhớ, tự kiểm và Bài tập

**Giữ được.** Bốn lỗi có hậu quả cụ thể, nhất là `NgayKetThuc` và nhầm số cặp thành số người. Ứng dụng nói được việc đối chiếu theo kỳ và tìm hồ sơ thiếu dòng liên quan. Tự kiểm ở sau Ghi nhớ, trước Bài tập; bốn câu ôn phía trái, khóa kiểm, số cặp và vị trí điều kiện đã có trong phần giảng. Câu về thử việc nêu giá trị cụ thể từ khái niệm loại đã nói, không cần đòi thêm truy vấn phụ trái phạm vi duyệt. Mạch đọc hơi lặp ý “hai mã được giữ vì không có cặp” ở câu sau lời trả lời và trước đó ở sơ đồ; có thể **biên tập/cắt** câu này nếu cần gọn, giữ câu đối chiếu hồ sơ giấy vì thêm giới hạn nghiệp vụ.

## Tiền đề và hướng giải từng đề

| Đề | Hướng tự xác định trước khi xem answer; kiến thức cần | Đã dạy ở đâu; thiếu/vướng |
|---|---|---|
| 3.5-1 | Giữ `NhanVien`, kết toàn bộ `HopDong` theo mã; lọc khóa hợp đồng không khớp và mã phòng IT; chọn ba cột, xếp ngày tăng. | Câu chính và giải thích phía trái của 3.5; lọc kết hợp ở 2.3; sắp xếp 2.4. Đủ tiền đề về ý và cú pháp. Answer sau đó đi theo hướng này. Chưa chạy xác minh dữ liệu hoặc thứ tự khi ngày trùng. |
| 3.5-2 | Giữ hồ sơ; chỉ cho dòng lương của kỳ yêu cầu khớp theo mã và kỳ ngay ở `ON`, rồi lọc một cột phía lương không `NULL` trên dòng thật; chọn và xếp mã. | 3.5 giải thích phạm vi bên phải ở `ON` và chọn cột không nhận `NULL`; 1.4 nói `KyLuong`/`MaNV` là khóa ghép; 2.3 dạy `AND`. Cách nối điều kiện bổ sung trong `ON` còn cần làm rõ như finding trên. Tên cột kỳ đã xuất hiện ở 1.4; `2026-09` là giá trị đề cho, không tự coi việc xuất hiện lần đầu là lỗi. Answer dùng `MaNV` phía lương làm cột kiểm, phù hợp hướng đó khi thành phần khóa chính không `NULL`; định dạng và dữ liệu thật chưa chạy kiểm. |
| 3.5-3 | Kết trái theo mã, chọn cột nhân viên và mã hợp đồng, giữ toàn bộ kết quả, sắp theo hai cột. | 3.5 giảng mọi cặp và dòng không khớp; 3.4 giải thích nguồn cột; 2.4 dạy sắp theo nhiều cột. Lời dẫn bài tập nhắc không lọc riêng khóa không khớp. Đủ tiền đề. Answer đi theo hướng này; chưa chạy kiểm. |

## Ưu tiên và giới hạn

Ưu tiên làm rõ một vế nối `AND` ở phần giảng để người mới chuyển sang đề theo kỳ. Còn lại, từ nội dung đã đọc, không thấy thiếu tiền đề đáng kể cho đề 1 và 3; điều này là đánh giá học thử, không bảo đảm mọi học viên tự làm được.

**Chưa xác minh:** tính đúng thực tế của SQL, dữ liệu/55 hợp đồng/48 hồ sơ/tổng các bước, kiểu và giá trị lưu thực của kỳ lương, bộ chấm và kết quả đề, dữ liệu hiển thị ở hệ thống thật. Không chạy SQL, không xác nhận SQL Server hoặc Excel thực tế. Không mở browser, nên chưa kiểm viewport, thao tác drawer, focus, bàn phím, copy/paste, lựa chọn web/SQL Server, nhận mã hay luồng hoàn thành bài; HTML tĩnh không chứng minh các tương tác đó.

**Đã cân nhắc, để ngoài finding:** không yêu cầu bảng nguồn phải in toàn bộ hợp đồng ở drawer JOIN vì quy ước cho bản trích và nêu bảng phải bằng lời; chỉ ghi giới hạn không xác thực được số liệu. Không yêu cầu thêm ví dụ truy vấn thử việc vì phạm vi duyệt bỏ truy vấn phụ; chỉ đề xuất một vế về cách nối điều kiện. Không coi việc `2026-09` xuất hiện ở đề là thiếu định nghĩa riêng chỉ vì là giá trị mới. Không nhận xét lỗi dùng web/SSMS khi chưa kiểm được luồng tương tác.
