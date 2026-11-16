# Review độc lập tiền đề bài 2.7 — 16/11/2026

## Phạm vi và cách kiểm

Đọc đề đã che đáp án, toàn bộ source bài 2.7 (kể cả dữ liệu các bước và câu tự kiểm) và những đoạn tiền đề 2.1–2.6 cần thiết. Tự lần cách làm từng đề dưới đây trước khi xem YAML có answer; không chép câu đáp án. Không đọc report cũ hoặc hồ sơ tác giả. Review source và khả năng suy luận của người học, không chạy SQL/API, không kiểm HTML, UI, GIF hay database. Chưa đối chiếu YAML answer; không suy ra việc chấm hoặc dữ liệu live đúng từ source. Cấu hình reviewer được giao gpt-6.1-terra/high, ngữ cảnh mới; công cụ không cung cấp bằng chứng xác minh model thực tế.

SHA-256 source bài 2.7: `27E6A09834785C3769E73F51BF502A0CAECCE01B0018AE846CA5C1EAE3BE98C9`. SHA-256 JSON đề: `A74D86CCEC6A2C2A5AB273FC03D753FA18B10701D052A8886CDB3FE9C139E9A4`. Hash ghi tại lượt review, không chứng minh phiên bản của các lần kiểm khác.

## Findings

Không thấy lỗi có căn cứ hoặc thiếu tiền đề khiến ba đề trong JSON và bốn câu tự kiểm không giải được từ lời giảng đã đọc. Không đánh đồng kết luận này với xác nhận dữ liệu, SQL live hay bài tập được chấm đúng. Không có nhận xét biên tập bắt buộc.

## Tự làm và tiền đề từng đề

| Đề | Cách làm độc lập và kiểm phạm vi | Tiền đề trong phần giảng | Đánh giá |
|---|---|---|---|
| 2-7-1 | Lấy nguồn nhân viên; giữ mã phòng KT; chọn mã gốc, hai ký tự từ trái và ba ký tự từ vị trí 3, giữ kết quả cắt là chuỗi; sắp mã tăng. Với NV001, lần từng vị trí được NV và 001. Không thêm điều kiện ngày/trạng thái. | 2.2:45–54 lọc mã; 2.1:49 đặt tiêu đề; 2.4:43–45 sắp; 2.7:179 giải thích LEFT, vị trí bắt đầu và độ dài SUBSTRING; 2.7:199 giải thích mất số 0 khi ép số. | Đủ; đề định rõ thứ tự cột/dòng và ví dụ loại bỏ nhầm số 0. Không cần giả định toàn bộ mã có đúng năm ký tự để hiểu yêu cầu. |
| 2-7-2 | Chọn mã, họ tên gốc, độ dài họ tên; điều kiện áp dụng luật đã chỉ định trên cột họ tên rồi đối chiếu mẫu bắt đầu bằng `do` với `%` cuối; sắp mã tăng, không lọc thêm. Họ tên được chọn vẫn là giá trị gốc, không thay chữ trong dữ liệu. | 2.3:140–146 dạy LIKE và `%`; 2.7:49 dạy LEN bỏ dấu cách cuối; 2.7:187–191 dạy collation, thứ tự COLLATE/LIKE, CI/AI, giữ cột gốc; 2.4:43–45 dạy sắp. | Đủ để dựng điều kiện và cột kết quả; không tự đoán danh sách tên khớp hay số ký tự từ dữ liệu live. |
| 2-7-3 | Giữ tất cả hồ sơ mã phòng VH, chọn mã và email gốc; tạo nhãn theo thứ tự ngoặc mở, email in hoa, ngoặc đóng bằng CONCAT, rồi sắp mã tăng. Email NULL qua UPPER vẫn NULL; ghép coi phần đó là rỗng nên chỉ còn hai ngoặc; cột gốc vẫn NULL. Không thêm điều kiện trạng thái. | 2.2:45–54 lọc mã; 2.5:43 và 55–60 phân biệt NULL/lọc; 2.7:43–47 và 185 dạy hàm lồng, UPPER, CONCAT, dấu ngoặc và NULL; 2.4:43–45 sắp. | Đủ; ví dụ cùng dạng tại 2.7:185 dùng họ tên, có thể chuyển đầu vào sang email. Chưa kiểm trong VH có dòng NULL hay đã nghỉ thực tế. |

## Tự kiểm

| Câu | Tự suy luận và tiền đề | Đánh giá |
|---|---|---|
| 2.7:230, hai hàm trước CONCAT | Từ mã NV007 lấy ba ký tự cuối; đổi họ tên Bùi Thanh Sơn sang hoa, giữ dấu; hai kết quả được ghép cùng dấu phân cách. Giảng tại 2.7:45–47. | Đủ và lời giải khớp lời giảng. |
| 2.7:237, SUBSTRING | Đếm từ 1: ký tự thứ 3 của NV007 là 0; lấy tiếp tổng cộng 3 ký tự. Giảng tại 2.7:179. | Đủ và lời giải khớp. |
| 2.7:244, N và COLLATE | N tạo chuỗi tự viết có Unicode để giữ ký tự; COLLATE chọn luật so sánh, cụ thể CI/AI cho yêu cầu này. Giảng tại 2.7:45, 187–189. | Hai việc chính đủ tiền đề. Câu giải thêm rằng COLLATE không khôi phục ký tự đã mất phù hợp với phân biệt chức năng, nhưng lượt này không kiểm trường hợp chuyển kiểu cụ thể. |
| 2.7:251, ghép với NULL | UPPER của NULL cho NULL, CONCAT coi đầu vào này là rỗng, còn hai ngoặc. Giảng tại 2.7:185. | Đủ và lời giải khớp. |

## Phần giữ được

Ví dụ lần từ mã và họ tên qua hàm trong tới nhãn, phân biệt đếm tên với đếm cả nhãn; phân biệt giữ Unicode với luật so sánh; giữ cột gốc để nhận ra NULL. Câu SQL nằm sát minh họa logic; đoạn sau minh họa nêu lọc, tạo cột và sắp trước bảng kết quả. Các tiền đề cần cho ba đề và bốn câu tự kiểm đều có ở phần văn bản chính, không phải mở drawer.

## Giới hạn còn lại

JSON được giao chứa ba đề; không xác minh đây có phải toàn bộ đề được xuất bản. Các khẳng định về collation, số dòng, kiểu cột, giá trị mẫu và kết quả trong bài chỉ được đối chiếu nội bộ source, chưa xác minh thực thi. Chưa xem đáp án YAML, HTML hay tương tác và chưa kiểm asset ảnh động. Không suy ra khả năng đạt bộ chấm từ cách làm trên.
