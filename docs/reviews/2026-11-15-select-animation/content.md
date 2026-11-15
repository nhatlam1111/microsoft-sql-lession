# Review nội dung bài 2.1

Phạm vi: đọc độc lập bài MDX, bốn đề YAML và đáp án sau khi tự xác định cách làm, tiền đề 1.2–1.3, component, manifest, ba hình tĩnh và HTML build hiện có. Vai trò: người học chỉ biết Excel cơ bản. Cấu hình được giao: `gpt-6.1-terra`, effort `high`, ngữ cảnh mới; công cụ không cung cấp bằng chứng để xác minh model thực tế.

## Finding

Không thấy lỗi nội dung hoặc thiếu tiền đề có đủ căn cứ trong phạm vi đã kiểm. Không suy đoán số liệu hoặc kết luận chất lượng vận hành từ source.

## Phần giữ được

- Tình huống xác định toàn bộ hồ sơ, bao gồm người đã nghỉ; thứ tự cột được yêu cầu, thứ tự dòng thì không. Lời kết phân biệt danh sách có người đã nghỉ với khả năng nhận diện họ từ ba cột.
- Giải thích mục đích, dấu phẩy, thứ tự cột, `*`, bí danh, ngoặc vuông và sự không thay đổi dữ liệu nguồn trước câu SQL đầy đủ. Ví dụ nhầm dấu phẩy, giá trị cố định và tiêu đề sai nghĩa trả lời được vì sao một câu có thể chạy mà sai yêu cầu.
- SQL đầy đủ sát minh họa; lời giảng và cảnh tĩnh thể hiện hai bước logic FROM/SELECT, việc đặt tiêu đề là một cảnh thuộc SELECT. Bốn dòng, bốn cột nguồn trong hình được ghi là trích; hình SELECT và AS giữ cùng giá trị theo từng nhân viên.
- Đoạn tóm tắt giải thích vì sao không lọc thì vẫn giữ số dòng, phân biệt thứ tự logic với thực thi vật lý và nêu thứ tự dòng chưa được bảo đảm. Điều kiện bộ chấm không so tiêu đề được nói trước bài tập.

## Tiền đề từng đề

| Đề | Cách xác định trước khi xem đáp án; tiền đề trong bài | Đánh giá |
|---|---|---|
| 2.1.1 | Chọn toàn bộ cột bằng `*`, dùng bảng hợp đồng làm nguồn; tìm tên bảng theo hướng dẫn Object Explorer hoặc Sơ đồ database. Đề giải thích ý nghĩa `NULL` của ngày kết thúc trong phạm vi dữ liệu mẫu. | Đủ để viết câu cần yêu cầu; kết luận này không kiểm dữ liệu live. |
| 2.1.2 | Lấy `HoTen`, `Email` theo thứ tự đề; không lọc nên gồm mọi hồ sơ. | Đủ: cách chọn cột, dấu phẩy, nguồn và không lọc đã được giảng. |
| 2.1.3 | Liệt kê ba cột theo thứ tự mẫu, không đặt tiêu đề mới. | Đủ: bài nói thứ tự viết là thứ tự kết quả và không có bí danh thì dùng tên cột. |
| 2.1.4 | Tìm bảng/cột chức danh theo chỉ dẫn tra cấu trúc; chọn tên trước mã, thêm bí danh tiếng Việt và tự so tiêu đề. | Đủ cách viết và cách tự đối chiếu; khả năng tra tên thực tế qua UI chưa kiểm. |

## Giới hạn

Chỉ kiểm source/HTML và ba ảnh tĩnh tại chỗ. HTML có nội dung lời dẫn, nút và phần Xem từng bước, nhưng chưa kiểm tương tác trình duyệt, bàn phím, giảm chuyển động, thời lượng/từng khung GIF hay tải lỗi; không suy ra hoạt động thực tế từ mã. Không chạy SQL/API, không đọc seed hay bằng chứng cũ, nên các số 48 hồ sơ, 12 cột, 3 hồ sơ nghỉ và các giá trị cụ thể chưa được xác minh độc lập. Không xác nhận build khớp phiên bản source và mọi phụ thuộc. Không đánh giá tác vụ tích hợp hoặc phát hành.
