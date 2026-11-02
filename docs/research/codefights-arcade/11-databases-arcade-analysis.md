# 11. Databases Arcade và chuyển sang T-SQL

## 1. Nguồn đã kiểm

Repo [code-signal/code-signal-arcade-databases](https://github.com/code-signal/code-signal-arcade-databases/tree/f85efe2ede2dd2721216c89e0c9e765a7f5ca000) được khóa tại commit `f85efe2ede2dd2721216c89e0c9e765a7f5ca000`, commit date 25/03/2022. Tên tổ chức không chứng minh đây là repo chính thức của CodeSignal. Đây là bộ lưu nội dung/lời giải cộng đồng, không có bằng chứng là source nền tảng. [D-01]

Git tree trả `truncated:false`, 264 entries và 84 README challenge. Inventory không có runner/harness/hidden fixture theo tên và cấu trúc đã xem. Không suy từ đó rằng server gốc không có hidden tests. File LICENSE ghi MIT, copyright 2018 không có tên chủ thể; giấy phép repo không tự cấp quyền cho đề/ảnh/dataset của bên thứ ba. Không chép chúng vào sản phẩm. [D-04, D-05]

README bài đầu đã đọc mô tả bảng/cột, ví dụ input/output, yêu cầu sort và MySQL 10 giây; một bài NULL phân biệt null thật với dữ liệu text. Chúng xác nhận cách trình bày trong bản lưu, không xác nhận SQL grader nội bộ. [D-02, D-03]

## 2. Danh mục nhóm trong bản lưu

Tên nhóm dùng làm nhãn tra cứu lịch sử; mô tả chủ đề dưới đây là suy luận từ tên và bài lưu, không là mapping đầy đủ từng bài sang kỹ năng.

| Nhóm | Số thứ tự trong README | Chủ đề gợi ý |
|---|---|---|
| Welcome to the Table | 1–5 | Chọn cột và truy vấn đầu |
| Always Leave Table in ORDER | 6–10 | Sắp xếp |
| Would you LIKE the Second Meal? | 11–16 | Điều kiện chuỗi |
| GROUP Dishes BY Type | 17–23 | Gom nhóm |
| Time for Tricks | 24–27 | Trường hợp biên, NULL |
| Specialties | 28–31 | Hàm/kiểu biểu diễn |
| WHEN was it the CASE? | 32–35 | Điều kiện biểu thức |
| Regular Paradise | 36–37 | Pattern/regex |
| Time River Revisited | 38–42 | Ngày giờ |
| JOIN Us at the Table! | 43–48 | Kết bảng |
| Table Metamorphoses | 49–54 | Biến đổi bảng |
| Selecting What to SELECT | 55–68 | Truy vấn lồng và tổng hợp |
| Express your CREATivity | 69–71 | Tạo/biến đổi dữ liệu |
| Exotic Dishes | 72–73 | Metadata/thực thi động |
| Between JOIN and SELECT | 74–79 | Bài kết hợp |
| A Table of Desserts | 80–84 | Bài cuối chặng |

Đây là 16 nhóm/84 mục trong bản lưu cụ thể, không chứng minh toàn bộ Databases Arcade mọi thời kỳ. Bản launch 2016 còn nói Databases là hướng mở rộng; ngày khai trương thực tế vẫn chưa biết. [D-01, H-01]

## 3. Cơ chế SQL: điều xác minh được và điều chưa biết

| Câu hỏi | Kết luận lịch sử | Đối chiếu hiện tại / thiết kế mới |
|---|---|---|
| Schema và sample ở đâu? | README lưu mô tả cột và bảng mẫu [D-02] | Sandbox trái có đề/schema/mẫu; không suy engine gốc [B-01] |
| Người học viết gì? | Lời giải SQL trong repo cộng đồng; chưa phải editor runtime | Sandbox hiện tại dùng procedure starter MySQL; dropdown có MSSQL/PostgreSQL [B-05] |
| Run/Submit SQL | Không có protocol gốc hoặc recording thao tác đủ | B-02/B-03 xác nhận khác biệt chỉ ở sandbox hiện tại |
| NULL | Nội dung bài lưu có NULL và text giống NULL [D-03] | Không biết comparator gốc; hợp đồng T-SQL mới ở 07 |
| Duplicate, order, aggregation | Đề bài có yêu cầu output/sort; không chứng minh multiset comparator | Đề mới phải nói rõ multiplicity/order và dùng nhiều fixture |
| Error/timeout | Bản lưu ghi giới hạn MySQL; chưa thấy timeout runtime lịch sử | Lỗi MySQL live đã thấy; không dùng làm lỗi T-SQL |
| Data modification | Danh mục có chủ đề biến đổi; chưa xác minh sandbox/reset/rollback gốc | Để DML ngoài MVP, chỉ thiết kế an toàn tương lai |
| Isolation/concurrency | UNKNOWN | Không có backend để phục hồi; kiến trúc mới phải giải quyết riêng |

## 4. Thích nghi với SQL Server

Giữ cách chia kỹ năng và phản hồi nhanh, tự viết challenge/dataset theo tình huống khóa học. Không chuyển từng lời giải MySQL máy móc: `LIMIT`, quote identifier, concat, date functions, regex, stored procedure và metadata có khác dialect. Mỗi tính năng T-SQL cần căn cứ Microsoft khi thực sự viết bài.

MVP chọn SELECT/WHERE/AND-OR/LIKE/ORDER BY/TOP/NULL/DISTINCT theo bài 2.1–2.6 đang đầy đủ. Không đưa dynamic SQL, DDL hoặc regex vào 10 bài đầu chỉ vì bản lưu có nhóm tương ứng. Learning Mode tiếp tục theo quy ước hiện hành; Arcade không tạo ngoại lệ cho kiến thức chưa được dạy. [R-18, R-19]

Nhiều dataset dùng cùng schema và collation cố định; private fixture mới phải độc lập với seed công khai HRM_Demo. Test hữu hạn không chứng minh đúng tổng quát. Giải thích chi tiết ở [07](07-testing-and-scoring.md) và [14](14-technical-architecture.md).
