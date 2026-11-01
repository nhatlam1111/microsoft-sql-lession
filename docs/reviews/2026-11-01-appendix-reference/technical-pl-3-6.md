# PL.3–PL.6 — kiểm của tác giả, 01/11/2026

## Phạm vi và phiên bản

Chỉ sửa bốn file `src/content/appendices/pl-3-ham-xu-ly-chuoi.mdx`, `pl-4-tinh-toan-va-lam-tron.mdx`, `pl-5-ham-ngay-gio.mdx`, `pl-6-null-va-dieu-kien.mdx`. Bản băm source tại thời điểm bàn giao nằm trong `pl-3-6-source-audit.json`; root giữ trách nhiệm đồng bộ spec/plan, chạy kiểm chung, build/UI và giao review độc lập.

Áp dụng biến thể tra cứu đã duyệt trong `docs/superpowers/specs/2026-11-01-appendix-reference-design.md`, theo hướng dẫn repo ưu tiên hơn teach/hidden-case-trainer. Không tạo learning-workspace, HTML bài riêng, hồ sơ người học hoặc vault. Không sửa dữ liệu, YAML bài tập, API hay danh sách ngoại lệ khung cũ; không branch/commit/push/deploy.

## SQL live

Chạy qua `sql-readonly.mjs` do root cung cấp: chỉ nhận câu mở bằng SELECT, chặn câu ghi/lệnh thực thi, kết nối từ cấu hình cục bộ không in secret. `pl-3-6-probe.json` xác nhận Azure SQL Database (`EngineEdition = 5`), `compatibility_level = 170`, product version được dịch vụ báo `12.0.2000.8`; đây không phải phép chạy trực tiếp trên một máy SQL Server 2025 cài riêng.

| Lệnh kiểm | Kết quả cuối | Evidence |
|---|---|---|
| `node temp/verification/2026-11-01-appendix-reference/pl-3-6-verify.mjs` | PASS: 37 câu SELECT lấy nguyên JSON-string từ source; toàn bộ 37 Result được so cột, thứ tự, dòng và giá trị | `pl-3-6-sql-results.json` |
| `node temp/verification/2026-11-01-appendix-reference/pl-3-6-edges.mjs` | PASS: 36 phép kiểm bổ sung có expected rows hoặc số lỗi; bao phủ SQL trong lời giảng/tự kiểm tra, ví dụ lỗi và cách sửa | `pl-3-6-edges-sql-results.json` |
| `node temp/verification/2026-11-01-appendix-reference/pl-3-6-source-audit.mjs` | PASS: 4 bài đều có 3 details; 37 Sql đều JSON-string; đoạn dài nhất lần lượt 88/75/95/81 từ | `pl-3-6-source-audit.json` |

37 ví dụ hiển thị chia theo bài: PL.3 có 11, PL.4 có 9, PL.5 có 10, PL.6 có 7. Kết quả `bigint` được driver mssql trả thành chuỗi số; Result dùng đúng giá trị chuỗi đó để root so khớp evidence tự động. Không đổi kiểu truy vấn thành int chỉ để thuận bộ kiểm.

36 phép bổ sung kiểm: TRIM chọn phía/tab; cắt độ dài âm và dấu ngăn không tồn tại; NULL của hàm tìm; biên STUFF; REPLACE vượt 8.000 byte; CONCAT_WS/chuỗi rỗng; STRING_SPLIT lọc rỗng/NULL; STRING_AGG tràn và kiểu; công thức precision/scale; ROUND tràn/giữ scale; CEILING/FLOOR kiểu mới; chia 0; tràn tích int/ABS; ngày sai/NULL; DATEADD cắt số lẻ và bigint; cộng-trừ tháng không đảo ngược; DATEDIFF int tràn; tuần ISO; DATE_BUCKET chuỗi chưa có kiểu; cận BETWEEN; ba giá trị logic; lấy cả NULL; COALESCE/CASE trộn kiểu; CASE tính tổng hợp trước; sửa phép chia bằng NULLIF; hai câu tự kiểm tra kết quả và thứ tự CASE; CHOOSE với chỉ số NULL.

Các lần thử đầu phát hiện khác biệt và đã sửa trước bàn giao: bigint là chuỗi của driver; mã lỗi cắt độ dài âm trên engine này là 536; YAML NULL/TRUE/FALSE cần nháy để giữ string; CONVERT style 127 chuẩn hóa về UTC. Các lỗi thử đầu không được gọi là PASS; hai lệnh kiểm SQL cuối ở bảng trên đã chạy hết và đạt.

## Tài liệu và điểm cần ghi riêng

Chỉ dùng nguồn Microsoft Learn, xem bằng web ngày 01/11/2026, `view=sql-server-ver17`. Mỗi nhóm có link tại chỗ trong MDX; danh sách URL chính xác của từng bài nằm trong `pl-3-6-source-audit.json`. Đã đối chiếu các trang hàm chuỗi, hàm toán, precision/scale, kiểu và ưu tiên kiểu, hàm ngày giờ, BETWEEN, hướng dẫn chỉ mục, NULL/UNKNOWN, ISNULL/COALESCE/NULLIF/CASE/IIF/CHOOSE. Không dựa tutorial bên thứ ba.

- [CEILING](https://learn.microsoft.com/en-us/sql/t-sql/functions/ceiling-transact-sql?view=sql-server-ver17) và [FLOOR](https://learn.microsoft.com/en-us/sql/t-sql/functions/floor-transact-sql?view=sql-server-ver17): tài liệu hiện hành trả `decimal(p,0)` cho đầu vào decimal. Probe `decimal(5,2)` và `decimal(8,3)` trên Azure xác nhận đúng p, scale 0; bài dùng chuẩn hiện hành, không chép kiểu trả về cũ.
- [SUBSTRING](https://learn.microsoft.com/en-us/sql/t-sql/functions/substring-transact-sql?view=sql-server-ver17): length có thể bỏ trên SQL Server 2025/Azure; ví dụ đã chạy trên Azure. [DATEADD](https://learn.microsoft.com/en-us/sql/t-sql/functions/dateadd-transact-sql?view=sql-server-ver17): nguồn ver17 và probe số giây vượt int xác nhận bigint trên môi trường hiện tại. Không bật preview hoặc đổi compatibility để thử.
- [TRIM](https://learn.microsoft.com/en-us/sql/t-sql/functions/trim-transact-sql?view=sql-server-ver17), LTRIM/RTRIM: bài ghi ngay điều kiện compatibility 160 cho cú pháp mở rộng; probe hiện tại chạy ở 170, không chứng minh bằng thay đổi cấu hình.
- [PATINDEX](https://learn.microsoft.com/en-us/sql/t-sql/functions/patindex-transact-sql?view=sql-server-ver17): trang nguồn nói expression NULL gây lỗi, nhưng hai SELECT trực tiếp với `CAST(NULL AS nvarchar(...))` trên Azure hiện tại trả NULL. Evidence `pl-3-6-edge-probe.json` và case `pl3-search-null` ghi nguyên kết quả. Bài không khẳng định trường hợp ấy báo lỗi hay hứa mọi engine đều xử lý giống nhau; hướng dẫn chủ động COALESCE đầu vào nếu quy tắc cần coi thiếu như rỗng. Chưa kiểm trường hợp này trên SQL Server 2025 cài riêng.
- CONVERT `datetimeoffset` style 127 trên engine hiện tại trả UTC có `Z`; style 126 giữ giờ địa phương và `+07:00`. Source PL.5 đã đổi sang 126 và kiểm lại toàn bộ; không giữ kết quả minh họa đoán trước. Probe ghi cả style 126/121/0 trong `pl-3-6-edge-probe.json`.
- Các hàm giờ hiện tại được kiểm qua metadata BaseType thay vì gắn kết quả cố định. Cấu hình ngôn ngữ và múi giờ, ngày đầu tuần được giải thích tại chỗ; không chạy SET, không đổi cấu hình hay khẳng định “giờ của người dùng” là giờ database.

## Giới hạn còn lại khi bàn giao root

Chưa tự chạy npm test/check/build/check:dist hoặc tương tác UI; root đang làm kiểm tích hợp trên source chung. Chưa tự kiểm copy/paste, TOC, bảng cuộn, bàn phím, tìm kiếm, chi tiết đáp án ở bản build. Chưa có report review độc lập từng bài. Không dùng kết quả SQL này làm bằng chứng UI hoặc quyền push. Không có phép kiểm concurrency, đổi isolation, remote execution, mọi collation, mọi vùng DST hoặc mọi giá trị biên vì ngoài phạm vi ví dụ thực hành này; các giới hạn hiếm chỉ dựa tài liệu đã trỏ.
