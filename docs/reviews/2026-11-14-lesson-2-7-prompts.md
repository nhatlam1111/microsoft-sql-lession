# Review độc lập: tiền đề từng đề bài 2.7

Phạm vi: lời đề được giao và source bài 2.7; đọc §4.5 quy ước và phần cấu trúc mới 2.1–2.5, riêng 2.3 thêm phần LIKE ở Vận dụng. Source được giao là HEAD `4554561` cùng diff local; không tự kiểm Git. Cấu hình được giao `gpt-6.1-terra`, effort `high`, `fork_turns: none`; công cụ trong lượt không xác nhận model thực tế. Không đọc YAML/đáp án/report trước, không chạy SQL, không kiểm dữ liệu, HTML hay UI.

## Kết quả

Không thấy thiếu tiền đề về thao tác SQL trong chín lời đề đã được giao. Những phần của 2.7 cần cho đề đều nằm trong nội dung hiện trên trang, kể cả mục Vận dụng. Không kết luận đề chạy được hay chấm đúng chỉ từ lời đề. Sáu đề sau mô tả tên bảng và ý nghĩa cột bằng lời, không nêu tên cột cụ thể; cần thông tin schema trong giao diện đề để tự viết truy vấn. Lượt này không được kiểm giao diện hoặc YAML nên chưa xác minh thông tin ấy có được cung cấp hay không; đây là giới hạn, chưa kết luận là lỗi.

| Đề | Cách làm bằng lời | Vị trí tiền đề | Thiếu / giới hạn |
|---|---|---|---|
| 2-7-1 | Lọc đúng phòng; chọn mã, cắt hai ký tự đầu và ba ký tự từ vị trí thứ ba; giữ giá trị cắt dạng chuỗi; sắp mã tăng. Ví dụ NV001 cho NV và 001. | 2.1 Cấu trúc mới: chọn và thứ tự cột; 2.2 Cấu trúc mới: lọc; 2.4 Cấu trúc mới: sắp; 2.7 Vận dụng: LEFT, SUBSTRING; Hay nhầm: giữ số 0. | Không thấy thiếu; chưa kiểm schema, dữ liệu hay chấm. |
| 2-7-2 | Dùng quy tắc so sánh được đề chỉ định và mẫu đầu chuỗi để lọc; chọn mã, tên gốc, độ dài SQL; sắp mã. Tên gốc không bị đổi vì quy tắc nằm ở điều kiện. | 2.3 Vận dụng: LIKE và `%`; 2.7 Cấu trúc mới: LEN; Vận dụng: COLLATE, CI/AI và tên gốc; 2.4 Cấu trúc mới: sắp. | Không thấy thiếu; chưa kiểm tập kết quả. |
| 2-7-3 | Lọc mã phòng, chọn mã và email gốc, tạo nhãn bằng cách đổi hoa email rồi ghép hai ngoặc; không lọc email thiếu; sắp mã. Email thiếu cho nhãn rỗng giữa ngoặc, cột gốc vẫn thiếu. | 2.2 Cấu trúc mới: lọc; 2.5 Cấu trúc mới: NULL; 2.7 Cấu trúc mới: UPPER, CONCAT; Vận dụng: ghép NULL và chọn cột gốc; 2.4 Cấu trúc mới: sắp. | Không thấy thiếu; chưa kiểm dữ liệu và chấm. |
| ba-so-cuoi-cua-ma | Chọn mã hợp đồng và cắt ba ký tự từ cuối; vì cắt chuỗi nên giữ số 0, bất kể phần năm dài hai hay bốn ký tự. | 2.1 Cấu trúc mới: chọn cột; 2.7 Cấu trúc mới: RIGHT, ví dụ 007; Hay nhầm: không ép sang số. | Tên cột cụ thể không có trong lời đề được giao; chưa kiểm giao diện/schema. |
| bo-khoang-trang-thua | Chọn mã, bỏ dấu cách thông thường hai đầu tên, rồi đếm kết quả đã bỏ bằng hàm lồng. | 2.1 Cấu trúc mới: chọn cột; 2.7 Vận dụng: TRIM và LEN lồng nhau, phân biệt dấu cách giữa từ. | Tên cột cụ thể không có trong lời đề được giao; chưa kiểm giao diện/schema. |
| ghep-nhan-phieu | Chọn mã phòng gốc cùng nhãn ghép mã nhân viên, chuỗi phân cách và họ tên; không thêm điều kiện lọc nên dòng thiếu mã phòng vẫn được chọn và cột gốc vẫn NULL. | 2.1 Cấu trúc mới: SELECT/FROM; 2.5 Cấu trúc mới: NULL; 2.7 Cấu trúc mới: CONCAT và chuỗi phân cách; Vận dụng: chọn cột gốc. | Tên cột cụ thể không có trong lời đề được giao; chưa kiểm giao diện/schema hay dữ liệu các thành phần nhãn. |
| ma-giua-trong-chuoi | Cắt hai ký tự từ vị trí 5 để lấy mã phòng; dùng cùng phép cắt trong điều kiện so với KD; chọn mã hồ sơ, phần cắt và độ dài tiêu đề. | 2.7 Vận dụng: SUBSTRING, vị trí bắt đầu, số ký tự và dùng trong WHERE; Cấu trúc mới: LEN; 2.1 Cấu trúc mới: chọn cột. | Tên cột cụ thể không có trong lời đề được giao; chưa kiểm giao diện/schema. |
| tim-khong-dau | Dùng collation không phân biệt hoa thường, dấu cùng mẫu `ngo` ở đầu; chọn mã và tên gốc; sắp mã. Ví dụ Ngô và Ngọc đều bắt đầu bằng phần khớp theo luật được dạy. | 2.3 Vận dụng: LIKE và `%`; 2.7 Vận dụng: Latin1_General_CI_AI và áp dụng trong điều kiện; 2.4 Cấu trúc mới: sắp. | Tên cột cụ thể không có trong lời đề được giao; chưa kiểm giao diện/schema hoặc tập kết quả. |
| viet-hoa-ho-ten | Chọn mã nhân viên và đổi họ tên thành chữ hoa cho mọi dòng, không đặt điều kiện lọc. | 2.1 Cấu trúc mới: SELECT/FROM; 2.7 Cấu trúc mới: UPPER giữ dấu. | Tên cột cụ thể không có trong lời đề được giao; chưa kiểm giao diện/schema. |

## Phần giữ được

Bài nêu rõ vị trí và độ dài của SUBSTRING, vì sao `007` phải giữ dạng chuỗi, sự khác biệt giữa tên gốc và quy tắc so sánh, và cách CONCAT xử lý NULL. Các điểm này trả lời trực tiếp những câu hỏi cần thiết để làm các đề được giao. Việc xác nhận thứ tự thực tế, schema, tính hợp lệ trên SQL Server và cơ chế chấm nằm ngoài bằng chứng của lượt review này.
