# Review bài 2.2 — bằng chứng tự giải trước khi xem answer

Đã đọc prompt, columns, ordered của ba đề qua lệnh bỏ khối answer trước khi mở đáp án. Cách làm tự xác định: đề 1 lấy MaNV, HoTen, MaPB và lọc MaPB bằng mã KT; đề 2 lấy MaNV, HoTen, NgayNghiViec, TrangThai và lọc TrangThai bằng chuỗi Unicode Đã nghỉ; đề 3 lấy MaNV, HoTen, NgayVaoLam và lọc NgayVaoLam từ 2026-10-01 trở đi, gồm ngày mốc, không có giới hạn cuối. Cả ba không yêu cầu thứ tự dòng. Dòng này được lưu trước bước đối chiếu answer.

## Nhận xét

- **Biên tập/hình — bài dòng 32–39:** “Hình trích ba hồ sơ” mô tả phạm vi, nhưng không nói hình Excel là minh họa. Người học có thể hiểu đây là ảnh chụp thao tác Excel thật; theo quy ước 2.2–3, hình mô phỏng cần được nhận diện. Đề xuất đổi thành “Hình Excel minh họa, trích ba hồ sơ…”; giữ số dòng và đánh dấu hiện có.
- **Đã dạy nhưng có thể khó tìm — dòng 135–141:** cách đổi điều kiện theo trạng thái và ngày nằm ở mục Vận dụng sau kết quả, trong khi khuôn đầu chỉ có điều kiện mã phòng. Mục này là phần hiện trên trang, giải thích đủ để giải đề; không phải thiếu tiền đề. Có thể thêm một câu dẫn ngắn trước khuôn rằng phần Vận dụng bên dưới áp dụng cùng cấu trúc cho trạng thái/ngày, nếu muốn người học tìm lại nhanh hơn.

Không thấy sai lệch có căn cứ khác trong phạm vi đọc; không suy từ HTML rằng truy vấn đã chạy đúng.

## Giữ được

Bài dẫn từ thao tác Excel sang vị trí và cách đọc WHERE, phân biệt tên cột nguồn với chuỗi, sau đó đặt SQL sát sơ đồ. Tóm tắt giải thích vì sao NV001 bị loại và NV020 được giữ; Result trích sáu dòng, có tổng và lưu ý thứ tự không được bảo đảm, rồi trả lời tình huống. Sơ đồ phân biệt thứ tự logic và cách thực thi, drawer minh họa cả dòng giữ và loại và cung cấp các cột cần xét. Vận dụng giải thích chọn cột theo yêu cầu, N cho chuỗi có dấu, >= gồm mốc, yyyymmdd và không có mốc cuối. Hay nhầm phân biệt tên nguồn/giá trị và SELECT/điều kiện; Memo ôn đúng trọng tâm. Số 14/13/1 và hồ sơ NV020 phù hợp hồ sơ công ty; đây là đối chiếu tài liệu, không phải xác minh database.

## Tiền đề từng đề

| Đề | Tự xác định trước khi xem answer | Tiền đề trên trang | Đối chiếu sau khi xem answer |
|---|---|---|---|
| 2.2.1 | Ba cột theo đề; giữ mã phòng KT, không lọc thêm. | Bài 2.1 Cấu trúc mới: SELECT/FROM, thứ tự cột; 2.2 dòng 41–47 và 135: WHERE, cột nguồn, chuỗi và chọn cột. | Phù hợp cách làm và thứ tự cột; không yêu cầu thứ tự dòng. |
| 2.2.2 | Bốn cột theo đề; giữ trạng thái Đã nghỉ bằng chuỗi Unicode, không lọc ngày. | 2.1 Cấu trúc mới; 1.3 Nhận diện số, chuỗi và ngày giờ; 2.2 dòng 135–137. | Phù hợp cách làm và thứ tự cột; không yêu cầu thứ tự dòng. |
| 2.2.3 | Ba cột theo đề; giữ từ ngày 01/10/2026 gồm mốc, không đặt giới hạn cuối. | 2.1 Cấu trúc mới; 1.3 Chuyển kiểu có thể đổi nghĩa; 2.2 dòng 135, 139–141 giải thích >=, mốc yyyymmdd và chuyển kiểu ngầm. | Phù hợp cách làm và thứ tự cột; không yêu cầu thứ tự dòng. |

## Phạm vi và giới hạn

Đọc source toàn bài, khối/drawer, YAML theo thứ tự ghi ở đầu report, tiền đề được giao, quy ước/template và hồ sơ công ty liên quan. HTML build được kiểm dưới dạng văn bản, bao gồm các phần chính và Vận dụng; không kiểm tương tác, bố cục hoặc sao chép trên browser. Không chạy SQL/API, không đọc seed/secret; kết quả, thông báo lỗi, schema và dấu mốc chuyển kiểu chưa được xác minh độc lập trên database. HEAD 455456116077839099d41941984e5184f8780b97; MDX có diff working tree. SHA-256 MDX ADF7089E2EE7058A46362E3CAE6F187EEBF9E947D539D613E16762BAAF676D83; YAML EA6D87C86445A15FED27DDEC81609F5AE41ADC81DE92B81C62D588FB40578BE0; HTML 1C1B1A350CC29549C3CCEF49E970091DED06FAF2275F78387E8D9D7DFDFAB1C8. Cấu hình reviewer do tác giả giao; công cụ trong lượt review không cung cấp bằng chứng xác minh model thực tế.
