# Kiểm lại finding cảnh SELECT — bài 2.4

**Kết luận: finding trong report gốc đã được xử lý ở phạm vi kiểm lại.** Ảnh `select.png` hiện bảng đầu vào “Sau WHERE”, trích ba trong 45 dòng và bốn trong 12 cột: `MaNV`, `HoTen`, `MaPB`, `NgayVaoLam`. Bảng sau SELECT có cùng ba dòng và đủ bốn giá trị dưới tiêu đề tiếng Việt; có thể lần `Trần Thị Mai` và `KT` từ đầu vào sang đầu ra. Tổng 45 và phạm vi trích được ghi rõ.

Đã xem các khung GIF 4–14 của cảnh SELECT, kể cả các khung giữa: bốn cột lần lượt chuyển từ bảng sau WHERE sang vị trí tương ứng, với giá trị của ba dòng đi cùng cột; cột đã đến xuất hiện dưới tiêu đề tương ứng. Nhãn cho biết TOP chưa giới hạn ở bước này. Không thấy tái diễn vấn đề đầu vào thiếu hai cột trong các khung đã xem.

Bằng chứng phiên bản: SHA-256 `select.png` là `431659646da844377bc31178890197934a5ca78c4b7627812243cf40dd401e93`; `animation.gif` là `c61f0c3c4a53805e24b124e162d9ceaaf8d076f8734960bd5d15567a330e01bb`; cả hai khớp mục `files` trong manifest. SHA-256 nguồn dựng `7d523ef19dd7f729cd70acf08e7ccf8c8249b868dba150ee8350a47036eb7829`; manifest `db2dadea6f664f0de4849bffd6c0061b7de9e8fa1296740edca12a5afe677417`; MDX `2de230d6ab778f6bc5acf2fe4da6c2a51e84b21382693c3dc689321999d14eda`.

Giới hạn: chỉ kiểm lại finding cảnh SELECT, không review lại toàn bài hoặc toàn GIF; không chạy SQL/API, không kiểm HTML build khớp, UI, khả năng đọc trên màn hình hẹp hay tương tác. Hash hai ảnh không chứng minh tính khớp của mọi phụ thuộc manifest. Report gốc được giữ nguyên.
