# Review độc lập tiền đề bài tập 2.3 — 15/11/2026

Phạm vi: đọc source bài 2.3, bài 2.1–2.2 và các trường đề YAML đã bỏ `answer`; người học chỉ biết Excel cơ bản. Phần cách làm dưới đây được ghi trước khi xem đáp án. Không chạy SQL/API/browser, không xem dữ liệu seed hay report cũ; vì vậy không xác minh số dòng, bộ chấm, HTML hoặc tương tác UI.

## Tự làm và kiểm tiền đề từng đề

### 2-3-1 — Hai phòng, chỉ hồ sơ đang làm

- Cách làm độc lập: lấy bốn cột theo thứ tự đề từ `NhanVien`; lọc mã thuộc danh sách KD, VH và đồng thời trạng thái bằng chuỗi Unicode Đang làm. Nếu dùng hai phép so sánh nối OR thì nhóm hai phép trong ngoặc trước khi nối AND với trạng thái. Không thêm điều kiện ngày.
- Tiền đề: bài 2.1 giảng `SELECT`, `FROM`, thứ tự cột; 2.2 giảng `WHERE`, so sánh chữ và tiền tố `N`; 2.3 giảng `IN`, nhóm `OR`, `AND`, và ví dụ thay điều kiện ngày bằng trạng thái áp dụng cho cả hai phòng. Đề nói rõ trạng thái áp dụng cả hai, không lọc ngày. Đủ để suy ra cách làm.

### 2-3-2 — Hai phòng trong một khoảng ngày

- Cách làm độc lập: lấy bốn cột theo thứ tự đề; chọn mã thuộc KT hoặc NS, đồng thời ngày vào làm nằm từ 1/3/2021 đến 1/7/2024 gồm hai mốc, dùng hai chuỗi ngày dạng năm-tháng-ngày liền nhau với `BETWEEN`. Không lọc trạng thái. Cũng có thể nhóm hai so sánh phòng bằng ngoặc và dùng hai so sánh ngày thích hợp.
- Tiền đề: 2.3 giải thích `IN`/`OR`, `AND`, `BETWEEN` gồm hai đầu mút và mốc sớm trước; 2.2 giải thích dạng ngày và kiểu `date`; 2.1 giải thích thứ tự cột. Đề nêu mã hiện lưu, cả người nghỉ, không thêm trạng thái; đủ để làm. Chưa thể xác minh kết quả mẫu hoặc số dòng.

### 2-3-3 — Phần tên còn nhớ

- Cách làm độc lập: lấy mã và họ tên theo thứ tự đề từ toàn bảng; lọc `HoTen` theo mẫu Unicode chứa chuỗi Thị, đặt ký tự đại diện nhiều ký tự ở cả trước và sau chuỗi; không thêm điều kiện khác.
- Tiền đề: 2.3 mục Vận dụng giải thích `LIKE`, tiền tố `N`, `%` có thể khớp không ký tự và ví dụ chứa chuỗi tại bất kỳ vị trí kể cả trong từ. Đề nói rõ tìm chuỗi thay vì tách từ. Bài nói bộ mẫu không phân biệt hoa thường và phân biệt dấu; vì vậy kết quả là theo quy tắc so chữ này, không khẳng định chỉ đúng cách viết hoa trong đề. Đủ để làm; chưa kiểm dữ liệu thật.

### 2-3-4 — Họ tên còn đúng một ký tự sau H

- Cách làm độc lập: lấy mã và họ tên theo thứ tự đề, lọc bằng mẫu Unicode có ký tự đại diện nhiều ký tự trước H và một ký tự đại diện đúng một ký tự sau H, rồi kết thúc mẫu. Không thêm các điều kiện khác.
- Tiền đề: 2.3 giải thích `%`, `_` và ví dụ mẫu kết thúc bằng `_` buộc còn đúng một ký tự sau đoạn cố định. Đề giải nghĩa áp chót ngay sau dấu hai chấm, nên không cần tự đoán thuật ngữ. Lưu ý bộ mẫu không phân biệt hoa thường như bài đã nói: chữ `h` thường cũng có thể khớp H. Đủ để làm theo quy tắc đã nêu; chưa kiểm dữ liệu thật.

## Nhận xét chung từ source

- Giữ được: bài lần lượt giải thích mục đích, cách viết `OR`/`IN`, `BETWEEN`, `AND`, độ ưu tiên và ví dụ `LIKE`, sau đó đề nói rõ cả giới hạn lọc lẫn thứ tự cột. Ví dụ `NV003` đạt cả hai điều kiện và `NV002` bị loại giúp lần một dòng cụ thể. Ba câu tự kiểm bám nội dung đã giảng và có lời giải ngắn.
- Chưa phát hiện thiếu tiền đề ngăn giải bốn đề trong phạm vi source được đọc. Không suy từ đây rằng dữ liệu, đáp án hoặc bộ chấm đã được kiểm thực tế.

## Đối chiếu sau khi mở `answer`

- **2-3-1:** Đáp án dùng nhóm hai phép so sánh `OR` rồi nối điều kiện trạng thái bằng `AND`; khớp cách tự làm và thứ tự bốn cột. Cách `IN` tôi chọn về mặt điều kiện diễn đạt cùng nhóm mã; chưa kiểm bộ chấm chấp nhận bằng chạy thực tế.
- **2-3-2:** Đáp án dùng `IN` và `BETWEEN` với đúng hai mốc theo thứ tự, không thêm trạng thái; khớp cách tự làm và thứ tự cột.
- **2-3-3:** Đáp án đặt `%` hai bên chuỗi tiếng Việt với `N`; khớp cách tự làm và hai cột.
- **2-3-4:** Đáp án đặt `%` trước H và `_` cuối mẫu; khớp cách tự làm và hai cột. Quy tắc không phân biệt hoa thường của bộ mẫu là điều kiện hiểu phạm vi chữ H, không phải bằng chứng đã kiểm collation thực tế.

Không thấy mâu thuẫn giữa đề, cách làm độc lập và đáp án trong source. Đây là đối chiếu tĩnh, không chứng minh tập dòng trả về, tính đúng của số liệu minh họa, tình trạng database hoặc hành vi bộ chấm.

## Phiên bản và giới hạn

SHA-256 tại thời điểm đọc/đối chiếu:

- Bài 2.3: `BDA33A719244682DA76686DA235B6A1AEC50AC0622F738A1C84463427A7AC723`
- Bài 2.2: `2BAECE33603AAEC1DDC8EE0AEDBA065282725D5AF4BC4D469C31FC79296B8609`
- Bài 2.1: `32478D9819D36932FEE90F2D77C11349F216CE08FB0EE1CB4EF8238AE0277A45`
- YAML 2.3: `8695C1A88F35884718BC992CD2527913FB752F54A5406FA1D0EEE984C7FF8191`

Reviewer được giao phiên độc lập với cấu hình model/effort do người giao chọn; không có bằng chứng công cụ xác minh model thực tế. Chỉ kiểm source; chưa kiểm SQL live, HTML, UI hay dữ liệu và không xem report cũ.
