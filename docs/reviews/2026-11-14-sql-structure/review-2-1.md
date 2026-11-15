# Review độc lập bài 2.1

- Phạm vi: source MDX, YAML bài tập, tiền đề 1.2–1.3 và HTML tĩnh được giao; base `455456116077839099d41941984e5184f8780b97` cùng diff working tree theo gói giao. Build được giao là khớp source; lượt này không tự build hay xác minh hash.
- Cấu hình được giao: `gpt-6.1-terra`, `reasoning_effort: high`, `fork_turns: none`. Không có bằng chứng trong lượt này để xác minh model thực tế.

## Nhận xét

Không thấy finding có đủ căn cứ trong phạm vi đã kiểm. Phần cấu trúc giải thích chọn bảng/cột, dấu phẩy, thứ tự, `*` và bí danh trước câu đầy đủ; sơ đồ sát SQL, tóm tắt giải thích vì sao còn 48 dòng và ba cột trước bảng kết quả. Lời trả lời phân biệt danh sách có người đã nghỉ với việc ba cột không cho biết ai đã nghỉ. Có phân biệt thứ tự logic với thực thi vật lý, kết quả trích với tổng và lưu ý thứ tự dòng. Kiến thức bắt buộc không chỉ nằm trong drawer; không thấy LineMap trong source. HTML tĩnh hiển thị các đoạn chính theo cùng thứ tự, gồm cảnh báo bộ chấm không so tiêu đề.

## Tiền đề từng đề

| Đề | Cách suy ra và tiền đề trong bài |
|---|---|
| 2.1.1 | Lấy toàn bộ cột từ bảng hợp đồng: khuôn `SELECT`/`FROM`, dấu `*`; đề cho biết ý nghĩa `NULL` trong trường hợp này, không cần lọc. Tên bảng tìm theo hướng dẫn Object Explorer/Sơ đồ database. |
| 2.1.2 | Chọn `HoTen`, `Email` theo thứ tự đề; danh sách cột, dấu phẩy, `FROM` và không lọc đã được giảng. |
| 2.1.3 | Chọn ba cột theo thứ tự đề; bài nói thứ tự viết là thứ tự kết quả và không đặt bí danh thì dùng tên cột. |
| 2.1.4 | Chọn tên rồi mã, dùng `AS` và ngoặc vuông cho hai tiêu đề; tìm tên bảng/cột theo hướng dẫn trước bài tập, tự kiểm tiêu đề vì bộ chấm không so. |

Bài không có câu tự kiểm riêng. Bài 1.2 đã giới thiệu SQL, SQL Server và SSMS; 1.3 giải thích kiểu dữ liệu, chuỗi Unicode và cách hiển thị ngày. Các tiền đề này hỗ trợ phần giải thích ở bài 2.1.

## Giới hạn

Lượt đọc YAML đã hiển thị cả `answer` cùng đề trước khi kịp tự giải riêng từng đề; bảng trên là đối chiếu sau khi đã thấy đáp án, nên không chứng minh được yêu cầu tự giải trước khi xem đáp án. Chưa kiểm tương tác browser, nút sơ đồ, bộ chấm, SQL/API hay dữ liệu thực; HTML tĩnh không chứng minh các hành vi đó hoặc tổng/số liệu thực tế. Không kiểm source/HTML ngoài phạm vi được giao.
