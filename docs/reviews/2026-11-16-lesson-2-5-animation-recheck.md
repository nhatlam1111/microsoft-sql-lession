# Kiểm lại ảnh động bài 2.5 — 16/11/2026

## Kết luận

Finding WHERE → SELECT trong report gốc đã được xử lý trong ảnh public. Không thấy lỗi mới về thứ tự hoặc chuyển dòng trong phạm vi kiểm lại.

- **Source renderer:** bảng lọc đặt `NV044` trước `NV008`; bảng SELECT giữ cùng thứ tự. Khi chuyển vào bảng lọc, `NV008` đi vào vị trí dưới trước, sau đó `NV044` đi vào vị trí trên. Hai dòng chỉ đổi vị trí ở cảnh ORDER BY.
- **Ảnh tĩnh:** `where.png` và `select.png` đều hiện `NV044` trên `NV008`; `order.png` hiện `NV008` trên `NV044`. Ô email NV044 chuyển từ NULL sang nhãn ở kết quả.
- **GIF:** đã xem các khung đại diện khi chuyển từng dòng, sau lọc, khi đổi nhãn và khi sắp xếp. Dòng NV008 vào ô dưới, NV044 vào ô trên; không thấy dòng bị hoán đổi tại ranh giới WHERE → SELECT. Ô trên còn trống tạm thời khi NV008 vào trước rồi được NV044 lấp; diễn biến phù hợp thứ tự trích minh họa trước ORDER BY.

## Giới hạn

Chỉ kiểm source và ảnh/GIF public theo yêu cầu; HTML dist chưa build lại nên không kết luận HTML đã cập nhật. Không chạy SQL/API hoặc kiểm UI tương tác. Các khung GIF được lấy mẫu, không phải kiểm từng khung; không đánh giá lại toàn bộ bài hay số liệu live.
