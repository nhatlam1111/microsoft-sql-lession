# Xử lý review — Làm quen SQL Server, 02/11/2026

Report gốc `content-review.md` và `integration-review.md` được giữ nguyên. Chúng review đúng bản nhận dạng trong `build-manifest.json` và `tracked-changes.diff`, không phải bản sau sửa. Bản cuối được nhận dạng riêng bằng `final-build-manifest.json`.

## Ma trận từng nhận xét

| Mục | Quyết định | Căn cứ và thay đổi | Kiểm lại |
|---|---|---|---|
| F1 — điều kiện hợp đồng bắt buộc có hồ sơ | **Làm theo** | Cột `HopDong.MaNV` được khai báo NOT NULL và có FK trong schema nguồn đã đối chiếu; các ký hiệu ERD không tự cho biết tính bắt buộc. Đưa “không nhận NULL, có FK đang bật” vào chính câu kết luận của slide 19; giữ chiều hồ sơ có thể có 0/nhiều hợp đồng. Không coi đây là bằng chứng trạng thái FK live. | Test `shows the mandatory contract reference condition to the audience, not only in notes` thất bại ở bản trước sửa rồi qua sau sửa; toàn bộ suite sau sửa 416/416 qua. Kiểm bản build và bố cục theo verification.md. |
| F2 — nghĩa các dạng NoSQL chỉ có trong notes | **Làm theo** | Phần đầu chỉ cần định vị hai nhóm, không cần khảo sát sâu. Slide ảnh giới thiệu quan hệ/NoSQL và giải nghĩa điểm/đường đồ thị; tên tài liệu, khóa–giá trị xuất hiện lần đầu cùng chú giải ngắn ở hàng Cách tổ chức của slide so sánh. Rút nhãn phần mềm và lời đã lặp để giữ đủ bốn tiêu chí, không tăng slide. | Đọc phần chiếu sau sửa, không dựa notes; kiểm HTML, bảng và màn 1280/1920. |
| F3 — ERD xuất hiện trước định nghĩa | **Làm theo** | Đổi câu dẫn ở slide 8 thành “Sơ đồ ở slide sau…”. Định nghĩa ERD vẫn ở slide 9, không chèn thêm thuật ngữ sớm. | Đối chiếu thứ tự và text HTML cuối. |
| F4 và INT-01 — alt gọi cả bảng là một ô | **Làm theo** | SVG gốc đánh dấu Tuple/Attribute/Relation; Relation bao cả bảng. Sửa alt thành “một dòng, một cột và toàn bộ bảng”, giữ ảnh gốc. | Đối chiếu XML SVG và alt của cả hai HTML cuối; không tuyên bố đã thử screen reader. |

Không còn finding được hoãn hoặc không làm theo. F4 và INT-01 là cùng một lỗi, xử lý một lần và vẫn giữ cả hai nguồn nhận xét.

## Các mục reviewer đã cân nhắc nhưng chưa kết luận/để ngoài

- Học sâu NoSQL, thay hệ thiết kế hoặc thêm cú pháp/quiz: giữ ngoài phạm vi theo thiết kế đã duyệt; các chú giải F2 chỉ đủ nhận diện.
- `showLinks=false` vẫn kiểm FK: giữ hành vi hiện có. Tham số giấu đường không biến sơ đồ schema thành hình tự do; reviewer đã thử trực tiếp.
- Khoảng hở footer: tiếp tục tự kiểm bằng browser, thêm đo `scrollHeight/clientHeight` để bắt cả cuộn nội bộ nhẹ. Rút khoảng cách cuối khối và dùng cùng biến thể gọn cho ERD tổng quan; không giảm font bảng.
- Độ phủ regression: có RED→GREEN trực tiếp cho overview và điều kiện F1; không gọi đó là kiểm mọi đột biến. Các thí nghiệm bổ sung của reviewer giữ đúng nhãn kiểm hiện trạng.
- SQL live/FK đang bật ở database triển khai: chưa kiểm lại live vì phiên không có connector SQL Server; giữ riêng với kiểm schema/dữ liệu nguồn. Không dùng các connector PostgreSQL khác.
- UI, clipboard và assistive technology: root kiểm browser theo verification.md; không thao tác clipboard của người dùng, không thử screen reader/SSMS thật hoặc kéo sang máy chiếu vật lý.

## Quyết định của người triển khai

- Dùng checkout hiện có trên nhánh riêng `codex/lam-quen-narrative`, không tạo worktree mới theo hướng dẫn môi trường.
- Giữ nguyên 21 slide, ID, 48+7 phút, cơ chế điều khiển, tiến độ và dữ liệu; các sửa sau review nằm trong mạch đã duyệt.
- Mốc UTC của report lấy từ manifest. Mốc 11:44 trong log/gói giao là giờ Asia/Saigon; nhãn UTC trong gói giao ban đầu đã được đính chính với cả hai reviewer trước khi chốt report.
