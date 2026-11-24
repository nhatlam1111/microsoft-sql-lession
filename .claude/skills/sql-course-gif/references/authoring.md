# Từ câu hỏi tới cảnh dựng

## Phiếu cảnh tối thiểu

Đơn vị là câu SQL hay diễn biến đang dạy. Điền phiếu từ MDX hoặc dữ liệu có nguồn. Có thể giữ phiếu trong kịch bản dựng. Ghi dữ liệu, điều kiện và đích cụ thể để tác giả khác thực hiện được.

| Cụm SQL hoặc trạng thái | Trước | Giữa | Sau và điểm giữ |
|---|---|---|---|
| WHERE MaPB = 'KD' | NV001 · KT · Đang làm; NV020 · KD · Đã nghỉ cùng hiện | Viền chạy trên ô MaPB, các dòng đạt giữ nguyên cả trạng thái | NV020 còn, NV001 mờ. Mẫu bốn hồ sơ có ba đạt, phạm vi cả bài là 14/48. |
| SELECT … AS … | Ba dòng trích đã qua lọc | Dải sáng đổi sang chiều dọc ở bốn cột, tên cũ và bí danh cùng xuất hiện khi chuyển | Dữ liệu NV020 vẫn còn trạng thái Đã nghỉ, tiêu đề mới ổn định để đọc. |

Phiếu biên soạn ghi mã bài/unit, nguồn, khóa, tọa độ/trường, phần trích/tổng, thứ tự các nhánh và câu hỏi cuối. Ghi riêng alt/caption và bảng đầy đủ. Khi dựng chỉ đặt SQL và phần dữ liệu của phiếu lên ảnh.

## Ba cách chọn bố cục

- **Lọc hoặc chiếu:** một bảng đứng yên khi xác định FROM. Dòng được giữ di chuyển hoặc sáng ngang. Cột được chọn sáng dọc. AS đổi header; dữ liệu vẫn giữ nguyên. Nếu sắp xếp, di chuyển nguyên dòng cùng khóa. SQL mục tiêu ở trên; hạn chế dùng thêm thanh tiến độ chiếm chỗ.
- **Nhiều nguồn hoặc nhiều mức chi tiết:** JOIN giữ khóa ở hai bảng, nối từng cặp, cho một khóa tách thành nhiều dòng. LEFT JOIN đưa dòng thiếu cặp sang đích với NULL bên phải. UNION đặt hai nhánh ngang hàng rồi xếp chồng. GROUP BY thu nhóm về một ô tổng; OVER khoanh cùng nhóm, sau đó trả tổng về mỗi dòng còn nguyên. Nếu bảng rộng, cho phép phép ghép hoặc phép tính chiếm cả khung rồi chuyển sang kết quả.
- **Thời gian/trạng thái:** với LAG, ghim mã và dòng hiện tại rồi nối về đúng dòng trước trong phân vùng. Với transaction, giữ ảnh trước bên cạnh dữ liệu đang sửa; chỉ sau quyết định COMMIT hoặc ROLLBACK mới đổi trạng thái cuối. Với blocking/deadlock vẽ phiên, tài nguyên và chiều chờ. Với bài thuần khái niệm đặt tên đối tượng thay cho SQL giả.

Nếu toàn câu dài, để câu đầy đủ ở phần đọc; khi tô WHERE chỉ hiện điều kiện, khi tính OVER chỉ hiện biểu thức cửa sổ. Nếu dữ liệu trích 1/7 dòng của phòng nhưng hiện tổng cả phòng, ghi rõ phạm vi nguồn ngoài hình và cho thấy số dòng góp vào tổng cạnh ô đó; tránh để người xem suy tổng từ một dòng hiển thị.

Với yêu cầu so sánh hai khái niệm cùng bài, dùng một GIF có hai tình huống nếu người xem cần đối chiếu cùng đối tượng. Ví dụ 5.3 giữ vị trí A, B, X, Y khi đổi từ một cạnh chờ sang vòng chờ. Trên hình đủ dùng tên phiên/tài nguyên, nét liền/đứt có chú giải và trạng thái ngắn như “Rollback · 1205”. Chuyển câu giải thích “vì sao” ra phần đọc kèm. Ghi giả định về khóa xung đột và lựa chọn phiên bị hoàn tác. Các trạng thái giả định kiểm với nội dung bài; chỉ nhận đã kiểm SQL live khi thực sự có truy vấn và kết quả đối chiếu.

Dùng nét, hình dạng hoặc vị trí cùng màu để phân biệt. Một nét gạch/mờ biểu thị loại, một khung viền đánh dấu khóa, NULL là chữ trong ô. Giữ bảng ổn định suốt nhịp; nếu hai trạng thái không có chung hàng thì nối bằng khóa hoặc giá trị đã đóng góp. Xem một lượt với câu hỏi “ô đó từ đâu tới?” Nếu chỉ giải được bằng việc đọc đoạn văn trên hình, đổi động tác hoặc tách cảnh.

## Tách phần sinh hình khỏi dữ liệu

**Đồ họa dữ liệu chính xác:** dựng chữ tiếng Việt, cú pháp SQL, số, header, khóa, quan hệ và vị trí bằng mã. Từng frame lấy cùng nguồn dữ liệu. Dùng hình học cho những thao tác đã đủ rõ như tô cột, di chuyển dòng, nối khóa, dịch cửa sổ. Nếu dùng theme khóa, lấy token/font từ bộ dựng hiện hành. Viền cyan cho dữ liệu tham gia, hồng cho SQL, tương phản đủ cho nền tối.

**Khi có chuyển động minh họa sinh bằng AI:** gọi GifGen `gifgen-local:make-gif` cho sprite sheet mới; nếu đã có hình gốc cần tạo chuyển động, dùng nhánh animate-image của GifGen. Nếu chỉ cắt/đổi nhịp một GIF hiện có, tra edit-gif. Sheet nên là một lớp độc lập như biểu tượng khóa đóng/mở bên cạnh dòng tài nguyên. Dùng lại sheet đã kiểm khi phù hợp. Không giao SQL, số, mũi tên khóa hoặc tên người cho mô hình ảnh.

Ví dụ prompt cho lớp biểu tượng khóa của một cảnh:

> A SQUARE image containing a 4×4 grid of 16 equal edge-to-edge panels, row-major order. Fixed camera, same scale and center in every panel. A simple lavender padlock on a uniform midnight background. Across the first four panels the shackle starts rising, through the middle panels it lifts clear of the latch and rotates outward, in the final four panels it settles in the open position. Maintain identical lock body and baseline. No letters, digits, captions, tables, margins or gutters.

1. Yêu cầu sheet có lưới đều, đo kích thước ảnh trả về, xem các ô liên tiếp khác nhau đúng động tác. Nếu nhận một tranh đơn, yêu cầu tạo lại sheet.
2. Trong thư mục skill GifGen đã cài, dùng `python scripts/sheet_to_gif.py sheet.png --fps 10 --frames lock-frames.zip --out lock.gif`. Script của plugin tự dò lưới; chỉ sửa grid sau khi thấy đường cắt sai. Kiểm seam, thứ tự trái→phải/trên→dưới, tỷ lệ ô và số frame. Đây là lệnh của **plugin**, phân biệt với bản cùng tên ở repo. 
3. Khi ghép vào bài, giải nén PNG, chọn ảnh theo tiến độ của cảnh, giữ nền và điểm neo cố định, rồi chồng lớp dữ liệu vẽ bằng mã. Nếu không có plugin hoặc công cụ tạo ảnh, vẫn có thể dựng bằng hình học đối với thao tác bảng. Nếu người dùng yêu cầu đích danh lớp AI, báo đúng phần không thực hiện được.
4. Học nhịp **đọc SQL → tác động lên dữ liệu → đọc đích** từ video 30 fps. Lưới 10 ô, caption tiếng Anh và thời lượng 1,7 giây mỗi thẻ thuộc video tham khảo. Chọn thời gian đọc và khung hình theo bài; dựa vào mục 2.6a của quy ước khóa học. Với yêu cầu riêng tái tạo 30 fps, dùng master PNG 30 fps và delay phân bổ theo centisecond khi xuất, tránh ép thông số này vào CLI repo chỉ hỗ trợ 10/25.
