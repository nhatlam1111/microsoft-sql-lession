# Gộp đếm có điều kiện vào 3.1

Giữ báo cáo năm chỉ tiêu trên đơn nghỉ và bổ sung một ví dụ ngắn về cách mỗi dòng đóng góp vào một chỉ tiêu có điều kiện. Áp dụng lại `CASE` của 2.9, rồi nối sang tổng hợp theo nhóm ở 3.2.

Ba đề cũ của 3.1 giữ nguyên. Ba đề thay cho bài 3.12 luyện đếm và cộng trên một dòng, dùng mã 3-1-4 đến 3-1-6. Trung cấp đánh số liên tục đến 3.18. Hai slug cũ của bài đếm có điều kiện chuyển thẳng về 3.1. Đề thay thế có mã riêng, còn đề chỉ chuyển số giữ mã hiện tại.

Tiến độ v4 giữ trạng thái 3.1 và nhận cờ từ bài đã gộp. Người chỉ từng học bài đếm có điều kiện thấy 3.1 ở trạng thái đã xem. CTE nhận tiến độ theo danh tính bài, kể cả bản lưu v1/v2/v3.

URL cũ của từng đề mở đề thay thế cùng thứ tự ở vị trí 4–6. Các mã đề cũ trong dữ liệu tiến độ vẫn lưu riêng. API hiện hành lấy các đề thay thế từ danh mục với ID mới. Phát hành API trước web khi được duyệt để các đề mới có thể chấm ngay.

Người làm khóa học tự review nội dung. Tác giả kiểm SQL, HTML, menu, đường dẫn cũ và dữ liệu tiến độ trước khi bàn giao.

## Vòng sửa tình huống bài 3.1

Tình huống đã chọn là chị Hạnh đối chiếu hai báo cáo đơn nghỉ. Báo cáo tổng hợp ghi 16 ngày và báo cáo bàn giao ghi 12 ngày. Chị cần tính lại cả hai phạm vi trong cùng một dòng để kiểm tra chênh lệch.

- Giữ năm chỉ tiêu chung trên các đơn đã duyệt bắt đầu trong tháng 9/2026. Thêm số đơn từ hai ngày bằng `COUNT(CASE WHEN SoNgay >= 2 THEN 1 END)` và tổng ngày của các đơn này bằng `SUM(CASE WHEN SoNgay >= 2 THEN SoNgay ELSE 0 END)`.
- Dùng cùng một `WHERE` và một câu chính. Bảng Excel đối chiếu tổng chung với hai chỉ tiêu bàn giao. Sơ đồ có một ví dụ cho năm chỉ tiêu chung và một ví dụ cho hai chỉ tiêu có điều kiện. Bảng kết quả trả một dòng với bảy cột.
- Dùng kết quả để giải thích bốn ngày chênh lệch là từ bốn đơn một ngày trong phạm vi mẫu. Nêu cách cộng cờ `1/0` như một biến thể đếm ngắn, cùng bẫy `COUNT` đếm cả số `0` và sự khác nhau giữa không có đơn đạt ngưỡng với không có dòng qua `WHERE`.
- Giữ sáu đề hiện có và để người làm khóa học tự review nội dung.
