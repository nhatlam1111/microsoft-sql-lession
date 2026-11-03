# Review tích hợp 3.5 → 3.6 → 3.7 — snapshot sau sửa

## Phạm vi và cách kiểm

- Đọc source đóng băng trong `integration-v2/snapshot`, đối chiếu tĩnh HTML của hai bài và sáu trang bài tập, cùng brief, manifest, quy ước, khung, hồ sơ, spec/plan. Manifest ghi snapshot 2026-11-03 14:51:49 UTC; hash MDX 3.6 `7923c133…`, 3.7 `613b9074…`; HTML bài lần lượt `97182e35…`, `bea0f202…`. Đây là mã do manifest ghi, tôi không tự tính hash hay build.
- Gói được giao với cấu hình `gpt-6.1-terra`, high, ngữ cảnh mới; cấu hình truyền vào không chứng minh backend thực tế. Dùng PowerShell đọc file và Python HTMLParser để trích chữ HTML tĩnh. Không chạy SQL, database, API, runner, test, build hay browser; không đọc review riêng. YAML gồm cả đáp án đã được đọc để đối chiếu tĩnh phạm vi; tôi không tự giải sáu đề trước khi xem đáp án.
- Nhìn từ người học biết Excel cơ bản, đã học đến 3.5; không mặc định biết VLOOKUP hay lập trình. Các tổng và giá trị mẫu được đối chiếu nội bộ, không xác minh lại bằng dữ liệu thật. Tôi không kiểm vận hành tương tác hoặc bố cục responsive.

## Nhận xét cần xử lý

Không phát hiện lỗi chắc chắn trong phạm vi kiểm tích hợp tĩnh. Không suy ra vì vậy rằng kết quả SQL, các tổng hay UI đã được kiểm độc lập bằng chạy thực tế.

## Điểm cân nhắc, chưa kết luận

1. **3.6, RunFlow JOIN hợp đồng, `examples`**: bảng bên phải trích `MaNV`, `MaHD`, `NgayBatDau`, `NgayKetThuc`, trong khi bảng kết có thêm `LoaiHD`. Bốn cột đủ lần điều kiện ON và thấy tại sao `NV021` còn `HD2024-005`; LineMap cũng nói loại lấy từ `hd`. Tuy nhiên người mới không thể lần giá trị cụ thể của `LoaiHD` từ bảng trích phía phải, nên giá trị xuất hiện trong bảng kết có thể gây một bước nhảy nhận thức. Cân nhắc theo mục tiêu của ví dụ và không gian hiển thị; chưa kết luận cần thêm cột vì bảng được ghi rõ là bản trích và không cần `LoaiHD` để xét ON.
2. **3.6, trước Bài tập**: “mở Sơ đồ database trên thanh đầu trang để tra cặp khóa và tên cột”. HTML tĩnh có nhãn đó trên thanh và lời chỉ dẫn trong bài; đề 3.6.1–2 cần `PhongBan`/`ChucDanh` ngoài tình huống. Cách này giữ tình huống gọn nhưng phụ thuộc người học tìm và đọc được sơ đồ, và tôi chưa mở được sơ đồ hay kiểm nó thể hiện đúng cặp khóa/cột hoặc thuận tiện ở màn hình nhỏ trong phạm vi không browser. Đề nghị tác giả dựa vào bằng chứng UI đã có để kết luận; không xem sự hiện diện nhãn trong HTML là chứng minh luồng tra hoạt động.
3. **3.7, phần đếm cấp dưới**: chỉ dẫn “đổi phía được giữ”, nhóm hai cột và phân biệt `COUNT(nv.MaNV)` với `COUNT(*)`, thêm trạng thái `nv` ở ON và `ql` ở WHERE đã xuất hiện trước tự kiểm tra/bài tập. Đây là cầu nối bằng văn bản khá cô đọng cho đề 3.7.3, đòi hỏi kết hợp kiến thức 3.1–3.2 và 3.5. Không kết luận thiếu tiền đề hoặc cần thêm SQL, vì các thao tác cần thiết đều được nêu; tác giả cân nhắc tải nhận thức theo quan sát học thử riêng.

## Đối chiếu các trọng tâm

- **Mạch và khung:** 3.5 giải thích phía trái/phải, mọi cặp và phân biệt ON/WHERE; 3.6 dùng hai INNER JOIN và kiểm nhân/mất dòng; 3.7 chuyển sang cùng bảng hai vai trò và LEFT JOIN. Mỗi bài 3.6–3.7 có một câu SQL chính và hai H3 trong phần chính; LineMap, RunFlow, kết quả và câu trả lời theo trình tự. Excel 3.6 dựa trên phép dò đã giải thích ở 3.4–3.5, 3.7 giải thích thêm IF và dò chính xác.
- **ON và mẫu phía phải:** 3.6 JOIN hợp đồng có mã cùng cả điều kiện ngày trong focus và mẫu năm hợp đồng, bao gồm ba hợp đồng NV021; JOIN lương có mã/kỳ và mẫu năm dòng hai kỳ. 3.7 có `ql.MaNV = nv.MaQuanLy` và bảng `ql` gồm mã/tên, lần được NV001 → NV005 và NV004 không khớp. Các mẫu có nhãn trích và nguồn phía phải, không biểu diễn là toàn bảng.
- **Ngày, trùng, thiếu:** 3.6 ghi rõ hợp đồng chồng ngày có thể cùng là ứng viên; kiểm GROUP BY/HAVING độc lập với đếm 43 dòng lương gốc và đối chiếu báo cáo, dẫn 3.5 khi thiếu. Không suy ngày đảm bảo duy nhất; câu trả lời 43 dòng gắn điều kiện đã kiểm, không coi hai mẫu trích là toàn bộ.
- **Cột và nguồn:** 3.6, đầu vào SELECT có `MaNV`, `HoTen`, `MaHD`, `LoaiHD`, `ThucLinh`; bước lương giữ các cột của cặp trước và bổ sung tiền. 3.7 giữ `MaQuanLy`, `HoTen` nhân viên, tên phía quản lý qua JOIN và SELECT; đây là đối chiếu cấu hình/source, không phải xác nhận cách component hiển thị từng drawer. Focus bám câu chính; trích trước ORDER BY có cảnh báo thứ tự không đảm bảo, kết quả cuối có ORDER BY.
- **NULL, hai vai trò, COUNT:** 3.5 dùng khóa không NULL để nhận diện không khớp, 3.7 nêu NV004 có `MaQuanLy` NULL được giữ, phân biệt `nv`/`ql`, lọc phía được đếm trong ON, phía được thống kê trong WHERE, đếm khóa thay COUNT(*) để giữ 0. Các ý này nằm trong phần giảng trước tự kiểm tra và bài tập, không chỉ ở đáp án YAML.
- **Lịch sử và phạm vi:** 3.6 chốt kỳ và ngày, không lọc trạng thái, không hứa hiệu lực pháp lý hoặc tính lại lương; 3.7 đọc quan hệ hiện lưu, không suy quá khứ; phòng/chức danh ở các đề 3.6 và 3.7 được nói là hiện lưu. 3.5 phân biệt chưa có bất kỳ hợp đồng với không có hợp đồng theo mốc, nên không lẫn hai loại thiếu.
- **Đề bài:** đối chiếu tĩnh cho thấy ba đề 3.6 lần lượt dùng hai danh mục và đếm toàn bộ lịch sử hợp đồng; ba đề 3.7 lần lượt lọc nhân viên theo mã quản lý, lấy thuộc tính phía quản lý, và đếm cấp dưới đang làm trên tập quản lý đang làm. Các cầu nối chính đã xuất hiện trong bài hoặc bài trước, riêng việc tra sơ đồ và tải nhận thức giữ ở mục cân nhắc. HTML sáu trang có nhãn Sơ đồ database; không kiểm hành vi bấm.

## Giới hạn kết luận

Review này là kiểm nội dung và HTML tĩnh của bản snapshot ghi trong manifest; không xác nhận dữ liệu hiện thời, hash thực tính, tính đúng số liệu bằng DB, khả năng chấm bài, thao tác sơ đồ, copy, kích thước màn hình hay build live. Không dùng trạng thái Ready làm bằng chứng kiểm hoặc quyền push/deploy.
