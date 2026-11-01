# PL.1–PL.2 — nguồn và kiểm tại máy

Ngày: 01/11/2026. Phạm vi: chỉ hai MDX được giao và các file `pl-1-2-*` trong thư mục này. Không commit/push/deploy; không thay seed, API, grader, câu ghi hay cấu hình preview. Dùng shared helper `sql-readonly.mjs` theo quyền SELECT-only của người giao việc; không in secret.

## Phiên bản nguồn

- `src/content/appendices/pl-1-chi-tiet-kieu-du-lieu.mdx`.
- `src/content/appendices/pl-2-chuyen-doi-kieu-du-lieu.mdx`.
- SHA-256 của nguồn giao nằm trong `pl-1-2-static-results.json` (lần chạy static cuối).
- Chưa có bằng chứng build/HTML/UI của hai trang trong lượt tác giả này. Root thực hiện kiểm tích hợp và review độc lập; không gọi kiểm MDX là kiểm giao diện.

## Kết quả thực tế

1. `node temp/verification/2026-11-01-appendix-reference/pl-1-2-sql.mjs`: **21 SELECT-only cases pass**. Có 16 câu hiện trong hai bài (PL.1: 6, PL.2: 10), cùng kiểm bổ sung TRY_CONVERT int→XML, culture sai và metadata môi trường. Kết quả/cột/lỗi nguyên văn: `pl-1-2-sql-results.json`.
2. `node temp/verification/2026-11-01-appendix-reference/pl-1-2-directions.mjs`: **50 SELECT-only cases pass**. Kiểm đủ 25 cặp nguồn→đích của ma trận 5 kiểu, cả explicit CAST và implicit dạng gán qua ISNULL (kiểu đối số đầu cố định kiểu đích), gồm các lỗi 529/206 khi bị cấm. Bằng chứng: `pl-1-2-direction-results.json`. Đây là kiểm hỗ trợ hướng chuyển, không phải chứng minh mọi giá trị đều giữ nguyên.
3. `node temp/verification/2026-11-01-appendix-reference/pl-1-2-feature-probes.mjs`: **5 probes ghi nhận đúng**, không sửa cấu hình. JSON object hoạt động; khóa trùng giữ giá trị đầu; vector(3) có DATALENGTH 20 byte; vector(3,float16) có 14 byte; PARSE(NULL AS int) báo 8116. Bằng chứng gộp: `pl-1-2-feature-results.json`, chi tiết từng probe trong `pl-1-2-probe-*.json`.
4. `node temp/verification/2026-11-01-appendix-reference/pl-1-2-static.mjs`: **pass**: biên dịch MDX, hình dạng frontmatter, shortTitle, 3 details/bài, mục Tra nhanh, đoạn văn ≤120 từ, mọi khối Sql dùng JSON-string code và khớp nguyên câu đã chạy live. Bằng chứng: `pl-1-2-static-results.json`.

Môi trường đã đọc qua SELECT: Azure SQL Database (EngineEdition 5), ProductVersion 12.0.2000.8, compatibility 170; sys.types có json/vector; PREVIEW_FEATURES=false. Số phiên bản Azure không dùng để gọi đây là SQL Server 2014. float16 vẫn chạy được với preview=false trên Azure, phù hợp trạng thái GA riêng của Azure trong tài liệu hiện hành.

Không có ví dụ thực thi nào trong hai bài bị môi trường này chặn. Những giới hạn lớn, trạng thái SQL Server 2025/MI, khả năng remoting, dung lượng vật lý toàn bộ dòng/tệp, toàn bộ ma trận mọi kiểu và hành vi driver khác chỉ được đối chiếu tài liệu; không tuyên bố đã chạy thử. Không bật preview hoặc tạo dữ liệu để thử các biên dung lượng rất lớn.

## Bản đồ nguồn

Nguồn Microsoft Learn đã mở/đọc bằng web; các đường dẫn chi tiết đặt cạnh nhóm tương ứng trong MDX. Các mốc mới đáng giữ:

- [Danh mục kiểu](https://learn.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql?view=sql-server-ver17): đủ nhóm, gồm cursor/table và json/vector.
- [Maximum capacity](https://learn.microsoft.com/en-us/sql/sql-server/maximum-capacity-specifications-for-sql-server?view=sql-server-ver17): giới hạn byte/đơn vị Unicode. Dùng nguồn này cho nvarchar(max), không sao chép lỗi đơn vị từ trang nchar/nvarchar.
- [float/real](https://learn.microsoft.com/en-us/sql/t-sql/data-types/float-and-real-transact-sql?view=sql-server-ver17): n là mantissa bits, nhóm 1–24/25–53.
- [Tên đồng nghĩa](https://learn.microsoft.com/en-us/sql/t-sql/data-types/data-type-synonyms-transact-sql?view=sql-server-ver17): tên ISO; không sao chép hai hàng float(n) 1–7/8–15 mâu thuẫn trang float chuyên biệt.
- [JSON](https://learn.microsoft.com/en-us/sql/t-sql/data-types/json-data-type?view=sql-server-ver17), cập nhật 15/10/2026: GA theo nền tảng/policy, object/array ngoài cùng, dạng nhị phân/UTF-8, các giới hạn kích thước, chiều chuyển, số quá trình chuẩn hóa.
- [Vector](https://learn.microsoft.com/en-us/sql/t-sql/data-types/vector-data-type?view=sql-server-ver17), [float16](https://learn.microsoft.com/en-us/sql/t-sql/data-types/vector-data-type-half-precision-float?view=sql-server-ver17): 1.998/3.996 chiều; float16 GA Azure, preview SQL Server 2025; không CAST trực tiếp khác base type/dimensions.
- [Data type conversion](https://learn.microsoft.com/en-us/sql/t-sql/data-types/data-type-conversion-database-engine?view=sql-server-ver17), [precedence](https://learn.microsoft.com/en-us/sql/t-sql/data-types/data-type-precedence-transact-sql?view=sql-server-ver17): kiểu đích khi gán khác ưu tiên của biểu thức; không coi precedence là ma trận cho phép.
- [CAST/CONVERT](https://learn.microsoft.com/en-us/sql/t-sql/functions/cast-and-convert-transact-sql?view=sql-server-ver17), [TRY_CAST](https://learn.microsoft.com/en-us/sql/t-sql/functions/try-cast-transact-sql?view=sql-server-ver17), [TRY_CONVERT](https://learn.microsoft.com/en-us/sql/t-sql/functions/try-convert-transact-sql?view=sql-server-ver17), [PARSE](https://learn.microsoft.com/en-us/sql/t-sql/functions/parse-transact-sql?view=sql-server-ver17), [TRY_PARSE](https://learn.microsoft.com/en-us/sql/t-sql/functions/try-parse-transact-sql?view=sql-server-ver17): cú pháp sáu hàm, kiểu đích, style/culture, dữ liệu sai và lỗi cấm chuyển; PARSE NULL/culture, CLR/remoting; giới hạn độ dài TRY_CAST.

## Chỗ tài liệu dễ gây sai và cách xử lý

- Trang nchar/nvarchar hiện ghi nvarchar(max) “2^31-1 characters (2 GB)”, trong khi trang capacity ghi 2^30-1. MDX dùng capacity và gọi đơn vị UTF-16, không gọi mọi Unicode character đều 2 byte.
- Trang synonyms có hàng float(n) 1–7/8–15. MDX dùng định nghĩa mantissa-bit của trang float và chỉ nhận diện double precision→float(53).
- CAST/CONVERT nói có biểu đồ mọi cặp, nhưng bộ đọc web không trả hình trong lượt nghiên cứu. MDX liên kết nguồn đó và công khai bảng cục bộ chỉ có năm kiểu, bổ sung hướng JSON/vector/spatial riêng. Không báo đã đọc/kiểm từng ô của biểu đồ tổng.
- Không gắn dung lượng 2 GB cho geometry/geography khi chưa có căn cứ rõ từ trang kiểu đã đọc; ghi độ dài biến đổi. Không gọi payload vector 4*d/2*d là chi phí vật lý toàn bộ cột.
- Không lấy việc có JSON functions làm bằng chứng engine hỗ trợ kiểu json; đã SELECT thử kiểu bản địa riêng, kết quả lưu trong probes.
