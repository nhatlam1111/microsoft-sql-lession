# Drawer 3.1–3.2: hiểu cách SELECT tạo kết quả

Trạng thái: người dùng đã chọn cách B, yêu cầu chỉ dùng vài nhóm đại diện và duyệt bản thiết kế trong chat bằng “duyệt”. Bổ sung thiết kế này cho lượt làm lại 3.1–3.2, không sửa lịch sử review trước.

## Mục đích và phạm vi

Học viên nhìn được dữ liệu nào được dùng, biểu thức làm gì và giá trị nào đi vào mỗi ô kết quả. Sửa SELECT của 3.1, GROUP BY và SELECT của 3.2; trọng tâm là SELECT. Giữ hai tình huống, câu SQL chính, kết quả, thứ tự bước, sáu bài tập/đáp án và giao diện khóa học hiện hành.

## Các cách đã so sánh

- A: giữ bảng trích, bổ sung lời giải. Ít thay đổi công cụ nhưng khó lần theo biểu thức đến từng ô.
- B: có minh họa dữ liệu và phép tính cạnh biểu thức. Người dùng chọn B, đồng thời bỏ yêu cầu hiển thị mọi hồ sơ/mọi nhóm của prototype đầu vì không phù hợp khi dữ liệu và câu lệnh lớn hơn.

## Cách trình bày đề xuất

Drawer vẫn có đúng Đầu vào, Thực hiện, Kết quả. Bảng Đầu vào vẫn trích tối đa năm dòng. Thực hiện được có minh họa ngắn với tối đa hai ví dụ đại diện; mỗi bảng dữ liệu ví dụ tối đa năm dòng. Các ví dụ được chọn để giải thích cơ chế, không phải giao diện duyệt toàn bộ dữ liệu. Phải ghi rõ phạm vi đầy đủ hay trích; không lấy số dòng đang trích làm số đếm của toàn nhóm.

**3.1 SELECT:** giữ năm đơn trích. Một minh họa đối chiếu cả chín đơn bằng ba giá trị số ngày: bốn đơn 1.0 ngày, ba đơn 2.0 ngày, hai đơn 3.0 ngày. Năm hàng giải thích lần lượt nối COUNT(*) → đếm 4 + 3 + 2 = 9 → SoDon; SUM → 4 × 1.0 + 3 × 2.0 + 2 × 3.0 = 16.0 → TongNgay; AVG → 16 ÷ 9, CAST làm tròn thành 1.78 → BinhQuan; MIN/MAX → so các giá trị, lấy 1.0/3.0 → ItNhat/NhieuNhat. AS đặt tên cột. Không liệt kê đủ chín hồ sơ và không thêm câu SQL phụ.

**3.2 GROUP BY:** dùng hai nhóm BGD và NS do tác giả đề xuất: BGD có NV004/NV009; NS có NV010/NV012/NV022/NV030/NV047. Chỉ ra cùng MaPB thì chung nhóm, khác MaPB thì khác nhóm. Minh họa này giữ các hồ sơ bên trong nhóm; không giả thành bảng chỉ còn mã và số đếm hoặc bảng mới được lưu. Các nhóm khác được xử lý theo cùng nguyên tắc; giữ bảng đối chiếu sáu mã/kích thước nhóm đã có.

**3.2 SELECT:** hai ví dụ BGD và NS hiện đủ thành viên của chính nhóm mẫu (hai và năm hồ sơ), không mở sáu nhóm hoặc 45 hồ sơ. Với BGD, MaPB lấy mã chung BGD; COUNT(*) đếm NV004 và NV009, mỗi dòng một lần, được 2; AS [SoHoSo] đặt tên cột; ghép hai giá trị thành dòng BGD/2. NS áp dụng cùng hai biểu thức lên năm hồ sơ, tạo NS/5. Kết quả chung vẫn sáu dòng/hai cột, đánh dấu hai dòng mẫu. Nói rõ hàm tổng hợp tính trong phạm vi từng nhóm, không đếm 45 rồi lặp lại cho mọi phòng. Không mô tả đây là thuật toán vật lý hay chỉ tại SELECT mới có thể tính hàm tổng hợp; giữ đúng tiền đề cho HAVING ở 3.3.

## Phần công cụ và quy ước

Đề xuất thêm một khối minh họa tùy chọn trong Thực hiện của RunFlow, với dữ liệu và các hàng ánh xạ biểu thức → cách tính → ô kết quả. Không dùng checks của WHERE/CASE cho phép tính. Không có SQL runtime, sửa/lưu dữ liệu, editor hoặc thay đổi bảng trích mặc định của các bài khác. Chỉ ba drawer trong phạm vi dùng khối mới; chỉ thêm mã dùng chung đủ để render và kiểm dữ liệu minh họa.

Khi triển khai, bổ sung mục 2.6 của quy ước và template để quy định khối minh họa ngắn, giới hạn ví dụ/dòng và phân biệt với kết quả SQL. Quy ước đầu vào năm dòng giữ nguyên. Tác giả tự quyết tên trường, câu chữ và cách bố trí theo component/token hiện hành; không thêm thư viện hoặc đổi thiết kế toàn trang.

## Kiểm và tiêu chí hoàn thành

Chạy SELECT chỉ đọc kiểm lại số liệu tần suất/người trong nhóm, câu chính và bằng chứng các bước. Test có ý nghĩa cho giới hạn khối, ánh xạ dữ liệu và việc các flow cũ không đổi; không khóa nguyên câu văn. Thực hiện kiểm bắt buộc ở §4.4, UI đúng build ở desktop và màn hẹp, review độc lập mỗi bài và review tích hợp vì sửa renderer (§4.5–4.6). Lưu report mới, xử lý mọi nhận xét, cập nhật thiết kế/kế hoạch theo mỗi vòng. Không push/deploy trong phạm vi này.

Prototype v3 dùng dữ liệu SQL đã kiểm của lượt trước để thảo luận cách trình bày; chưa thay thế bằng chứng SQL live, build hoặc kiểm UI của sản phẩm. Thiết kế đủ nhỏ để dùng bản ngắn. Kế hoạch triển khai: [drawer SELECT](../plans/2026-11-01-drawer-3-1-3-2-select.md); tác giả triển khai trong phiên hiện tại, review bằng agent mới kế thừa model theo quy ước repo.
