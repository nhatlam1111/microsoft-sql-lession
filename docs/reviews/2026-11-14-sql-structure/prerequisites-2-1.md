# Kiểm tiền đề bài 2.1

Phạm vi: tự suy từ phần giảng 2.1, đề đã bỏ đáp án và tiền đề 1.2–1.3; không xem đáp án, schema thực tế hay chạy SQL. Cấu hình được giao Terra/high trong ngữ cảnh mới; không có bằng chứng độc lập về model thực tế.

- **2-1-1:** Chọn bảng hợp đồng làm nguồn, dùng `*` lấy mọi cột và không thêm điều kiện lọc. Nguồn: 2.1, “Cấu trúc mới trong bài” giải thích `FROM`, `SELECT *`; “Đọc câu SQL qua các bước” giải thích giữ mọi dòng. Đề tự nói ý nghĩa ô `NULL` trong dữ liệu mẫu; không cần biết cách xử lý NULL. Tên bảng vật lý không có trong đề hoặc ví dụ: mục “Bài tập” chỉ cách tra Object Explorer/sơ đồ database; chưa kiểm được việc tra đó có cung cấp tên đúng. Không thiếu cú pháp cần cho đề.
- **2-1-2:** Chọn `NhanVien`, liệt kê `HoTen, Email` theo thứ tự và không lọc. Nguồn: 2.1, “Cấu trúc mới trong bài” nêu danh sách cột, dấu phẩy, thứ tự; “Đọc câu SQL qua các bước” nêu nguồn và không lọc. Đủ tiền đề; không cần xử lý email thiếu để lấy danh sách.
- **2-1-3:** Chọn `NhanVien`, liệt kê ba cột đúng thứ tự đề, không đặt bí danh và không lọc. Nguồn: 2.1, “Cấu trúc mới trong bài” nói thứ tự viết quyết định thứ tự kết quả và không có bí danh thì giữ tên cột; ví dụ RunFlow cho thấy chọn cột không đổi số dòng. Đủ tiền đề.
- **2-1-4:** Tra bảng chức danh cùng cột tên và mã, chọn hai cột theo thứ tự, đặt từng bí danh bằng `AS` và ngoặc vuông đúng tiêu đề; giữ mọi dòng. Nguồn: 2.1, “Cấu trúc mới trong bài” giải thích chọn cột, `AS`, ngoặc vuông; “Bài tập” hướng dẫn tra tên và tự đối chiếu tiêu đề vì bộ chấm không so tên. Tên bảng và cột vật lý không xuất hiện trong đề hoặc ví dụ; chưa kiểm được sơ đồ/Object Explorer có đủ thông tin để ánh xạ. Không thiếu cú pháp cần cho đề.

Chưa kiểm HTML, UI, schema, dữ liệu, bộ chấm hoặc SQL thực tế; không kết luận các nguồn tra tên hoạt động hay khớp dữ liệu.
