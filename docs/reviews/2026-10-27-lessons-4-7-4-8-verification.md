# Hồ sơ kiểm bài 4.7–4.8

Phạm vi so với `origin/main` tại `75278be2e779e3f86d98397e468d626100157129`: hai bài, ba đề 4.7, metadata, test và hồ sơ. Không thay seed/schema, component/UI, API, SQL guard hoặc luật chấm. Bài 4.8 không có YAML; hai mẫu CREATE/EXEC chỉ đọc. Mỗi bài nằm trên branch riêng, 4.8 kế thừa 4.7.

## Kết quả tác giả đã thực hiện

| Mức kiểm | Lệnh / cách kiểm | Kết quả và giới hạn |
|---|---|---|
| Baseline | `npm test` trước triển khai | 322 tests / 48 files đạt, không dùng thay kết quả sau sửa. |
| Bộ kiểm cuối | `npm test` trên Node 24.22.1 | 331 tests / 50 files đạt. 6 kiểm mới cho 4.7, 3 cho 4.8. |
| Runtime CI | Vitest bằng Node 22.23.4 | 331 tests / 50 files đạt, gồm `node:sqlite` và `setReturnArrays`. |
| Astro | `npm run check` | 0 errors, 0 warnings, 3 hints nền; không phát sinh hint mới. |
| Build | `npm run build` | 135 trang. Bản cuối sau góp ý SSMS là `lesson478-4-8-postreview-build.log`; suite/HTML/dist cũng chạy lại trên source này. |
| Link | `npm run check:dist` | 135 trang, 2028 link, đạt. |
| API package | `npm --prefix api run build` và `typecheck` | Build 81 đề; TypeScript đạt. Không chạy đáp án trên SQL Server. |
| Source / dữ liệu | Fixture theo script seed công khai, SQL subset trên SQLite và tính Python thuần độc lập | Kiểm giá trị/vị trí/thứ tự, các biên dưới đây; không chứng minh cú pháp, type, metadata hay collation của SQL Server. |
| HTML 4.7 | Đối chiếu nguồn từng khối với HTML đã build | 5 SQL/5 payload copy, 5 bảng Result/41 ô và marks, 5 Excel và marks; 6 h2, tự kiểm tra đúng vị trí. |
| HTML 4.8 | Đối chiếu nguồn từng khối với HTML đã build | 4 SQL/2 payload copy, 2 Result/22 ô và marks, 1 Excel và marks; 5 h2, 5 câu ôn sau Memo, không route bài tập. Không lộ escape, nháy SQL/copy khớp nguồn. |
| SQL live / dữ liệu chung | CLI `check:exercises`, `check:data` | Exit 1 trước connection vì thiếu SQL_SERVER/SQL_DATABASE/SQL_USER/SQL_PASSWORD. Chưa xác minh engine/grader/database thật. |
| UI / SSMS | Không thao tác tương tác | Chưa kiểm viewport, copy/paste, keyboard, drawer, login, nộp bài, hoàn thành hoặc SSMS thật. HTML không thay các phép kiểm này. |

## Dữ liệu và biên được bảo vệ

- Lịch tháng 9/2026 có 20 ngày làm; DP018 vắt tháng chỉ đóng góp 03/09 và 04/09, bỏ 31/08 và hai ngày nghỉ 01/09–02/09. Đơn pending, ngoài tháng và chồng ngày không bị cộng nhầm.
- 806 dòng chấm công, 43 mã ở mỗi nguồn; 11 ngày phép, tổng đối chiếu 817 và tổng ngày công bảng lương 819. NV013: 17 + 2 = 19 so 20; NV032: 18 + 0 = 18 so 19; NV043: 18 + 2 = 20 khớp.
- Trước kết đã tổng hợp một dòng mỗi mã và lọc kỳ. Bỏ một bên vẫn giữ mã, phía vắng và chênh lệch là NULL; số 0 có mặt khác nguồn vắng. Thêm kỳ khác không nhân dòng.
- EXCEPT trả đúng giá trị phía trái ở cả hai chiều, xét cả cặp, bỏ trùng và xử lý NULL theo hợp đồng mẫu. Mọi minh họa được so với cả ba đáp án theo giá trị/vị trí/thứ tự; không minh họa nào nộp nguyên là đúng.
- 4.8: câu chi tiết chọn 18 dòng NV043, bảng chỉ trích 10; COUNT trả 18. SELECT lấy từ thân mẫu, thay đủ ba tham số; đổi sang NV013 trả 17. Thêm dòng trước đầu dưới, tại đầu trên hoặc mã khác không lọt.
- Adapter test chỉ đổi literal Unicode/ngày, schema `dbo` của ba bảng và đúng CTE lịch VALUES đã cung cấp. Không nhận là trình biên dịch T-SQL; cú pháp ngoài phạm vi phải báo lỗi.

## Trace và nguồn

Log gốc, checker HTML, source-analysis và ledger ở `temp/verification/2026-10-27-4-7-4-8/` (ignored). Giữ cả RED và các lượt chưa đạt: lần đầu tab thật vi phạm quy ước; lần tiếp theo test đọc body chưa decode escape và test chung nhầm END block với CASE. Đã sửa cách đọc/nhận diện block, không bỏ kiểm whitespace hoặc nới dữ liệu kỳ vọng. Hai suite cuối ở Node 24/22 đều đạt.

Đã đối chiếu tài liệu Microsoft ngày 27/10/2026:

- [EXCEPT / INTERSECT](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-except-and-intersect-transact-sql): trái trừ phải, DISTINCT, vị trí cột, NULL.
- [CREATE PROCEDURE](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-procedure-transact-sql): tham số và thân AS/BEGIN/END.
- [View definition](https://learn.microsoft.com/en-us/sql/relational-databases/stored-procedures/view-the-definition-of-a-stored-procedure): Script Stored Procedure as → Create To → New Query Editor Window.

Tài liệu không thay phép chạy live. Review độc lập có report và ma trận riêng; số liệu ở bảng trên là kiểm của tác giả, không gán cho reviewer.
