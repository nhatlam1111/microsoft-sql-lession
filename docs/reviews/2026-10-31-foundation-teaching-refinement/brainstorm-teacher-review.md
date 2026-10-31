# Góc nhìn người dạy SQL — chương Làm quen

31/10/2026; Codex, kế thừa model của phiên. Source: 740c5694f6f6fd337c93cee2f7e3d9f899344dcb, đã đối chiếu HEAD; working tree sạch trước report. Đây là brainstorming nguồn hiện có, chưa chốt thiết kế mới.

Đã đọc AGENTS.md, quy ước/template, hồ sơ công ty, trọn 1.1–1.5, 2.1, phần giảng 2.2, Giới thiệu và curriculum. Giả định học viên chỉ biết Excel cơ bản, chưa biết SQL/lập trình, không mặc định biết VLOOKUP/PivotTable.

## Mạch chương

Nên giữ mạch nơi lưu/công cụ → bảng/dòng/cột → kiểu/NULL → khóa → ERD. Không thấy thiếu một bài nền bắt buộc trước SELECT/WHERE. Điểm cần bàn nhất là lượng kiến thức phải nhớ ở 1.5 trước lần truy vấn đầu.

- **1.1:** giữ bốn vai trò và luồng SSMS → SQL → SQL Server → database (1-1-database-la-gi.mdx:82), nguồn chung và giới hạn “hợp lệ chưa chắc đúng”. Không cần thêm cú pháp, cài đặt hay kiến trúc máy chủ.
- **1.2:** giữ tên cột khác dòng dữ liệu, mỗi dòng đại diện cho gì, lý do tách hợp đồng và thứ tự dòng không cố định (1-2-bang-dong-cot.mdx:30–53). Chỉ cần chỉnh câu về dòng tổng bên dưới; không thêm lý thuyết chuẩn hóa/import.
- **1.3:** giữ kiểu cả cột khác Format Cells, chữ/ngày/số, NULL/NOT NULL, mã giữ số 0 và chuyển kiểu có thể đổi nghĩa (1-3-kieu-du-lieu.mdx:20–55). Đây là nền dùng ngay ở 2.2. Không cần tăng danh sách kiểu hay đào sâu precision/scale.
- **1.4:** giữ PK xác định hồ sơ, FK kiểm mã tham chiếu, mã phòng được lặp và mã hợp lệ chưa chắc đúng nghiệp vụ (1-4-khoa-chinh-khoa-ngoai.mdx:24–47). Nếu cần rút, chỉ nhận diện MaQuanLy tự tham chiếu; để cách lấy quản lý tới 3.7.
- **1.5:** giữ tìm bảng/cặp cột, đọc một-nhiều từ hai phía và xác định ý nghĩa mỗi dòng (1-5-doc-so-do-erd.mdx:30–46). Không cần thêm loại JOIN.

## Ba nhận xét có vị trí

**F1 — Cần sửa.** 1-2-bang-dong-cot.mdx:52: “Nếu điền đủ các cột bắt buộc, database vẫn nhận”. Đủ giá trị chưa đủ nếu vi phạm các luật đã giảng ở 1.1:57 hoặc PK/FK ở 1.4. Người mới có thể hiểu sai điều kiện nhận dữ liệu. Sửa tối thiểu: “Database vẫn có thể nhận một dòng tổng nếu dòng đó thỏa các luật đã khai báo”.

**F2 — Cần làm rõ.** 1-4-khoa-chinh-khoa-ngoai.mdx:30: “Nhờ vậy hồ sơ nào cũng tìm được phòng của mình”. Kết luận đúng trong bộ mẫu nhưng cần gắn “Với MaPB không nhận NULL…”, vì FK vừa được định nghĩa chỉ kiểm mã khác NULL. Bài 1.5:44 đã nói đủ hai điều kiện. Không cần thêm đoạn mới.

**F3 — Lựa chọn sư phạm.** 1-5-doc-so-do-erd.mdx:20, :35, :46, :55 gom đường hai chặng từ bảng lương, khóa nhiều cột, một-nhiều và tác động số dòng. Có thể chỉ yêu cầu thành thạo đọc đường/cặp cột và ý nghĩa mỗi dòng trong lượt đầu, quay lại phần bảng lương gần 3.6. Nếu bỏ khóa nhiều cột khỏi lõi, cần đổi ví dụ mở đầu sang NhanVien → PhongBan; không chỉ xóa lời giải của sơ đồ hiện tại. Chưa có học thử thật để kết luận quá tải.

## Tự kiểm tra và chuyển tiếp

Các câu đều có tiền đề trong phần giảng và phủ mục tiêu. 1.1 kiểm phân biệt/giải thích; 1.2 chủ yếu nhận diện lại ví dụ; 1.3 đọc nhãn là vận dụng nhưng câu chuyển kiểu vẫn kể lại; 1.4 đọc nhãn tích hợp bài trước nhưng câu KD/KT lặp Hay nhầm; 1.5 tìm đường từ HopDong là chuyển giao tốt. Không cần thêm câu hàng loạt: có thể thay một câu bằng dự đoán từ dữ kiện đã giảng, như ngày 01/02/2024 trong cấu hình mẫu.

Nền đủ cho phần giảng 2.1/2.2: hai bài tự dạy SELECT/FROM/AS, WHERE, nháy đơn, phép so sánh và mốc ngày. PK/FK/ERD chuẩn bị tốt cho JOIN, nhất là mã lặp và số dòng tăng; trước JOIN vẫn cần quay lại kết quả cụ thể.

## Giới hạn

Source-only; không có build đối chiếu, không SQL/API/browser/test hay tài liệu ngoài. Không đọc database/secret/review cũ. Chưa xác minh số liệu, chuyển kiểu/làm tròn live, nhãn/sơ đồ render, YAML bài tập, số từ proseParagraphs hoặc thời lượng thật. Không sửa sản phẩm/Git; report không phải nghiệm thu hay quyền push.
