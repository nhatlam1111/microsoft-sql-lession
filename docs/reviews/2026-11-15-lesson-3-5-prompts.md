# Review độc lập 3.5 — tiền đề từng đề và phạm vi ví dụ

Phạm vi: source bài và các đề đã parse chỉ lấy `id`, `title`, `prompt`, `columns`, `ordered`; đọc 2.1, 2.6, 4.5 của quy ước và các đoạn tiền đề trực tiếp. HEAD được giao `455456116077839099d41941984e5184f8780b97` có thay đổi chưa xác định bằng diff; đây là nhận xét trên source đang có. Reviewer được giao cấu hình `gpt-6.1-terra`, effort `high`, ngữ cảnh mới; không có bằng chứng độc lập về model thực tế.

## Cách giải và tiền đề (chốt trước khi xem answer)

| Đề | Cách tự xác định | Vị trí tiền đề và đánh giá |
|---|---|---|
| 3-5-1 | Giữ `NhanVien`, ghép `HopDong` theo `MaNV`; lọc mã hợp đồng thiếu và mã phòng IT; chọn ba cột theo đề, sắp ngày tăng. Không thêm lọc trạng thái/ngày. | Bài 3.5 dòng 44–51 giải thích ghép và chọn `MaHD` không NULL trên dòng thật; dòng 197 giảng lọc phòng trong WHERE; bài 2.3 dòng 46 giải thích AND; bài 2.4 dòng 43–49 giảng sắp. Đề chỉ yêu cầu sắp ngày; trường hợp hòa không được quy định, nhưng tác giả cung cấp bằng chứng kết quả mẫu chỉ một dòng ngày 03/11, nên không kết luận lỗi bộ chấm từ giả thuyết hòa. |
| 3-5-2 | Giữ mọi hồ sơ; chỉ coi dòng lương cùng mã nhân viên **và** kỳ 2026-09 là cặp khớp, rồi lọc mã nhân viên phía lương NULL. Chọn hai cột và sắp mã tăng; không loại người có lương kỳ khác. | Bài 3.5 dòng 191–195 lần `NV001` có hợp đồng loại khác, minh họa vì sao phạm vi được dò đặt ở ON; dòng 219, 264 nối sang kỳ lương, nêu dạng mã kỳ và cột kiểm luôn có giá trị. Bài 1.4 dòng 36 giải thích khóa ghép và một nhân viên có thể có nhiều kỳ; bài 2.3 dòng 46 giải thích AND; 2.5 dòng 43–45 giải thích IS NULL/UNKNOWN. Đủ cơ sở chuyển ví dụ loại hợp đồng sang kỳ lương. |
| 3-5-3 | Giữ mọi hồ sơ, ghép tất cả hợp đồng theo mã, không lọc; lấy mã và tên phía hồ sơ cùng mã hợp đồng phía phải; sắp mã nhân viên rồi mã hợp đồng tăng. Hồ sơ không khớp vẫn một dòng, mã hợp đồng là SQL NULL; nhiều hợp đồng tạo nhiều dòng. | Bài 3.5 dòng 44–49 và 199 trực tiếp giảng giữ dòng và nhiều cặp, chọn cột và bỏ bộ lọc; bài 2.4 dòng 43–49 giảng thứ tự nhiều tiêu chí; 3.4 dòng 47 giải thích bí danh. Đề đã làm rõ trạng thái, ngày, loại và SQL NULL. |

Tự kiểm: bốn câu tại dòng 235–258 lần lượt dựa vào dòng 44–51, 91–117 và 191–195. `NV001` chỉ có loại khác: phạm vi thử việc ở ON khiến không có cặp thuộc phạm vi và dòng được giữ qua kiểm khóa; đưa điều kiện loại xuống WHERE thì dòng loại khác bị loại, và hồ sơ thiếu hẳn cặp cũng bị loại do UNKNOWN. Điều này giải thích được tại sao đề kỳ lương cần xét phạm vi kỳ trong ON. Không xác minh dữ kiện `NV001` hay tổng số dòng bằng dữ liệu live.

## Finding

**0 finding** trong phạm vi tiền đề từng đề và ví dụ phạm vi được giao. Câu hỏi “vì sao không kiểm cột có thể NULL trên dòng thật?” đã được trả lời ở dòng 51; “vì sao điều kiện kỳ không để WHERE?” có trường hợp tương tự ở dòng 191–195; “vì sao người có nhiều hợp đồng xuất hiện nhiều lần?” được giải thích ở dòng 49 và minh họa trong drawer dòng 99–117. Chưa thấy thiếu điều kiện khiến ba đề không thể tự giải từ các tiền đề được giao.

## Giới hạn

Đây là kiểm source về lời giảng, tiền đề và cách suy luận; không kiểm HTML/UI, SQL live, dữ liệu, API, kết quả hoặc bộ chấm. Không đọc report cũ, seed hay secret; không sửa sản phẩm, test hoặc Git. Chưa đối chiếu answer tại thời điểm ghi bảng trên.
