# Kiểm lại chuyển động ORDER BY — bài 2.7

Finding hai dòng bị che khi đổi chỗ đã được xử lý trên GIF hiện tại. Giải mã và xem toàn bộ các khung GIF từ 74 đến 91 (đánh số từ 0): khung 76 có bảng trước sắp với NV011 trên NV007; khung 77–90 dùng hai thẻ tách cạnh nhau nên mã, nhãn và số ký tự của cả hai đều nhìn thấy, kể cả khi đi ngang mức nhau tại khung 84; khung 91 trở lại bảng với NV007/`007 - BÙI THANH SƠN`/13 trước NV011/`011 - LÝ MINH KHOA`/12. Chú thích trong khi chuyển động giải thích vị trí cao hơn là dòng đứng trước.

Cảnh SELECT hoàn chỉnh ở khung 75 vẫn hiện `LEN(HoTen) → 13` và lời giải thích trong **3000 ms**, từ 15,64 đến 18,64 giây theo thời lượng giải mã. GIF kích thước 1080 × 824, gồm 92 khung mã hóa, dài 23,74 giây. Kết luận đọc được áp dụng cho ảnh gốc/khung giải mã; chưa thử kích thước hiển thị trong bài hay trên màn hình hẹp.

SHA-256 tại thời điểm kiểm:
- GIF: `9ca821bf5796cf6898e843e93033e179258e8cdb8fd81bdd22d905c57ebfe5d0`
- Renderer: `d36c0a27c2ad2233b68bdccf22b385ce62c99772d6156fd8364d66a5657bbae7`

Phạm vi chỉ gồm cảnh LEN và ORDER BY liên quan finding; không chạy renderer, SQL/API, kiểm build HTML hay tương tác UI. Không kết luận toàn bộ bài hoặc các cảnh khác đã được kiểm lại.
