# Review độc lập bài 3.9

## Phạm vi và cấu hình

- Gói giao: reviewer Codex `gpt-6.1-terra`, effort `high`, `fork_turns: none`; đây là cấu hình được giao, không có bằng chứng để xác minh model thực tế.
- Source được giao: HEAD `455456116077839099d41941984e5184f8780b97` + diff; HTML `dist/bai/3-9-subquery/index.html` được giao là bản build tương ứng. Đọc toàn bài, YAML cùng slug, phần liên quan của 2.3, 2.5, 3.5, quy trình, quy ước và template; đối chiếu HTML tĩnh trong phạm vi nội dung.
- Chỉ review source/HTML tĩnh. Không chạy SQL, API hay browser; không kiểm seed, dữ liệu thực, kết quả live, hành vi tương tác hoặc tính tương ứng build bằng cách build lại. Những con số trong bài được xem là khẳng định của source, không phải kết quả tôi xác minh.

## Finding

| Vị trí và câu | Tác động | Đề xuất |
|---|---|---|
| `src/content/lessons/3-9-subquery.mdx:163`: “Thay điều kiện bằng `EXISTS` như trên trả cùng kết quả trên dữ liệu đã kiểm.” HTML tĩnh cũng hiển thị câu này trước mục Vận dụng. | Ở thời điểm đọc, phía trên chưa có điều kiện `EXISTS`; người học tìm lại không thấy và chưa biết phải thay điều kiện nào. Câu cũng đưa biến thể mới vào ngay câu trả lời nghiệp vụ trước khi giảng nó. | Bỏ câu này tại đây; nếu cần nói hai cách cho cùng kết quả thì đặt lời đối chiếu sau đoạn `EXISTS` ở Vận dụng, dùng tham chiếu đúng vị trí. |

## Tự suy đề và tiền đề

Tôi tự xác định cách giải từng đề trước khi đối chiếu đáp án YAML/chi tiết đáp án tự kiểm. Nhận định dưới đây chỉ xét tiền đề và logic source, không xác nhận kết quả thực thi.

| Đề | Cách suy và tiền đề có sẵn | Đánh giá |
|---|---|---|
| 3-9-1 | Câu con lấy một cột `dp.MaNV` của các đơn `TrangThai = N'Chờ duyệt'`, không thêm ngày; `nv.MaNV IN (...)` giữ hồ sơ, chọn hai cột và xếp mã. Bài 3.9 dòng 43–52, 56–67, 159 giải thích khuôn một cột, vai trò câu con và không nhân dòng; 2.3 giải thích `IN` và điều kiện. | Đủ tiền đề; đáp án YAML phù hợp cách suy. |
| 3-9-2 | Ngoài lọc `nv.MaPB = 'IT'`; kết hợp `AND EXISTS` với câu con trên `HopDong`, liên hệ `hd.MaNV = nv.MaNV`, không thêm điều kiện ngày/loại. Dòng 167–181 giải thích `EXISTS`, `SELECT 1`, liên hệ và phân phạm vi; 2.3 cho `AND`, 3.5 dòng 62–64 cho phân biệt phạm vi hồ sơ và dòng liên quan. | Đủ tiền đề; đáp án phù hợp. |
| 3-9-3 | Dùng `NOT EXISTS` trên `BangLuong` có cùng mã và `KyLuong = '2026-09'`; chọn ba cột hồ sơ, không thêm trạng thái. Dòng 177–181 giải thích liên hệ, phủ định và đặt kỳ trong câu con; 3.5 dòng 62–64 giải thích chọn phạm vi đối chiếu. | Đủ tiền đề; đáp án phù hợp. |
| Tự kiểm 1, dòng 220 | `IN` đối chiếu một giá trị với cột mã của câu con: cần một cột, có thể nhiều dòng. Dòng 45–52 đã giảng. | Đáp án phù hợp; bài còn nêu trường hợp không có mã. |
| Tự kiểm 2, dòng 227 | Bỏ liên hệ thì điều kiện còn lại không phụ thuộc hồ sơ: nếu tồn tại đơn đạt điều kiện còn lại, mọi hồ sơ qua; nếu không có thì không hồ sơ nào qua. Dòng 167–177 và Hay nhầm 2 cung cấp tiền đề. | Đáp án nêu đúng trường hợp câu hỏi cần nhận ra; không khẳng định luôn có đơn phù hợp. |
| Tự kiểm 3, dòng 234 | `NOT EXISTS` phủ định sự tồn tại trong phạm vi đã lọc, không phủ định mọi đơn trong mọi thời điểm/trạng thái. Dòng 179 giải thích và có ví dụ. | Đủ tiền đề; đáp án phù hợp về nghĩa, số `39` chưa kiểm dữ liệu live. |

## Phần giữ được

- Khuôn `IN` và vai trò một cột được giải thích trước câu SQL; câu SQL đầy đủ đặt sát RunFlow, sau sơ đồ có tóm tắt nguyên nhân trước Result và trả lời nghiệp vụ. Không có LineMap.
- Phần `EXISTS`/`NOT EXISTS` nằm trong Vận dụng sau câu trả lời, hiển thị trong mạch bài và có điều kiện liên hệ, phạm vi, `SELECT 1`, cùng cảnh báo `NOT IN`/`NULL`; không đẩy kiến thức cần làm bài tập vào drawer tùy chọn.
- Tình huống nói rõ ngày bắt đầu, trạng thái đơn, thông tin phòng hiện lưu và không suy số ngày thực nghỉ. Phần giải thích `IN` không nhân dòng theo số đơn giúp phân biệt yêu cầu hồ sơ với chi tiết đơn.
- Drawer `WHERE` cho bản trích mã và trường hợp giữ/loại; phần hiện trên trang vẫn giải thích được cơ chế chính. Source thể hiện thứ tự logic, không hứa cách thực thi vật lý.

## Addendum — kiểm lại finding

Đã kiểm đúng đoạn câu trả lời nghiệp vụ và phần mở đầu Vận dụng trong source cùng câu trả lời trên HTML tĩnh build cuối. Câu “Thay điều kiện bằng `EXISTS` như trên…” đã được bỏ; câu trả lời vẫn nêu chín hồ sơ và giới hạn nghiệp vụ, sau đó source mới giới thiệu `EXISTS` ở Vận dụng. Finding tham chiếu sai vị trí đã được xử lý. Không review lại toàn bài, chạy SQL hay kiểm tương tác UI; không xác minh dữ liệu hoặc build lại.
