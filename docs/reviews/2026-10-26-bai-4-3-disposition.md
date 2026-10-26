# Xử lý review 4.3 — 26/10/2026

Đã đọc toàn bộ [report nội dung/HTML](2026-10-26-bai-4-3.md), [tiền đề trước answer](2026-10-26-bai-4-3-premises-before-answer.md) và phần append của [report bổ sung](2026-10-26-bai-4-3-prerequisites.md) trước khi chốt. Giữ nguyên cả report gốc lẫn snapshot tiền đề; không gộp chúng thành một lượt học thử không có sự cố.

| Mục | Quyết định | Căn cứ, xử lý và trạng thái |
|---|---|---|
| B1 — “cộng số tháng” | Làm theo | Sửa thành khung ROWS lấy các dòng tháng từ tháng8 đến dòng hiện tại để cộng TongNgay. Giữ rõ đơn vị ngày; không đổi SQL/dữ liệu. Đã sửa. |
| B2 — code trong summary | Làm theo | Bọc LAG/PARTITION BY và giá trị dẫn chứng trong code. Rà cùng dạng ở 4.2, sửa trên branch4.2 rồi đưa tiếp sang4.3; không đổi lời giải. Đã sửa. |
| Lộ answer ở lượt nội dung | Làm theo | Không dùng bảng của lượt đó làm bằng chứng giải trước answer. Giao ngữ cảnh mới, whitelist JSON chỉ trường công khai; agent ghi và dừng trước answer. Khóa snapshot SHA256 821379a591e6b37e047c898929365138a00c159b71f15a745f23cb5b78a390f6; sau đó mới cho đọc YAML và append, tác giả xác nhận prefix nguyên vẹn. Đã bổ sung phần kiểm độc lập bị thiếu, không lặp review HTML. |
| Hai dòng tiến độ lọt khi tìm heading | Làm một phần | Giữ nguyên disclosure của reviewer; không dùng thông tin đó làm chứng cứ học thử. Lượt bổ sung không đọc báo cáo/ma trận/kết luận cũ và đã khóa tiền đề riêng. Không xóa lịch sử lỗi để làm report trông độc lập hơn. |
| Tình huống/phạm vi/khóa tháng | Làm theo | Giữ mọi trạng thái, nguyên SoNgay theo TuNgay, mốc tương lai và giới hạn dữ liệu đủ kỳ. Không suy thành thực nghỉ. |
| SUM OVER/ROWS và LAG/NULL | Làm theo | Giữ lý thuyết trước ôn, cột tổng tháng trước cửa sổ, CTE trước phép trừ; ngoài B1 không thêm lặp. |
| Partition/tháng thiếu/lọc hiển thị | Làm theo | Giữ đoạn chỉ dẫn theo loại, LAG lấy dòng sẵn có và WHERE ngoài. Fixture bỏ tháng9 trả October cumulative25/previous14/delta-3; đề cuối giữ45/20/-9. Không phải SQL live. |
| Kết quả/RunFlow/HTML | Làm theo | Giữ flow3/3/3 SELECT ngoài và SQL kiểm đủWITH; HTMLkhớp payload/tab thật, không coi là đo tab bốn cột hay thử nút. |
| Hay nhầm/Ứng dụng/Memo/tự kiểm | Làm theo | Giữ nội dung và sáu h2/bốn h3, bốn câu ôn sau Memo; không bổ sung kiến thức từ answer. |
| Tiền đề độc lập đề1/2/3 | Làm theo | Lượt bổ sung xác định đủ đường làm trước answer; đề2 vận dụng lời chỉ dẫn đã giảng không cần chép thêm câu đáp án. Giữ phạm vi theo từng đề. |
| JSON so YAML, answer so tiền đề | Làm theo | Agent bước2 xác nhận ba bộ trường công khai khớp và answer không phát sinh tiền đề mới. Tác giả giữ snapshot821379a, report sau append bắt đầu nguyên vẹn bằng snapshot ấy. |
| Giới hạn chưa phán định | Làm theo | SQL live/bộ chấm thực thi/SSMS/UI/viewport/clipboard/nháp/drawer chưa xác minh, không biến thành lỗi quan sát hay ghi đã đạt. Thời gian35 phút là ước lượng. |

Bản được review dùng MDX hash714ea8da/YAML44edad55. Sau khóa tiền đề chỉ đổi B1/B2 trong MDX; YAML vẫn44edad55. Report bổ sung đối chiếu đúng YAML cũ, không cần đọc lại tài liệu hoặc lặp review. Các sửa prose/HTML không tạo snapshot test. Kiểm máy/fixture/HTML sau sửa được ghi trong plan và log temp; SQL live/UI tiếp tục mở do môi trường.
