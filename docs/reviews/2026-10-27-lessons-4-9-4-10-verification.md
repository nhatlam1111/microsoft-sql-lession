# Hồ sơ kiểm bài 4.9–4.10

Ngày27/10/2026. Base ae14a64515c819702779e0e18481f902f85392b7 (4.8 đã công bố), nguồn4.9 tại79f4efa, nguồn4.10 tại398ab99. Mỗi bài có branch riêng, 4.10 kế thừa4.9.

## Kết quả tác giả đã thực hiện

| Mức kiểm | Kết quả | Phạm vi và giới hạn |
|---|---|---|
| Baseline | 332 tests / 50 files | Trước soạn hai bài; không dùng thay kiểm sau sửa. |
| TDD4.9 | RED4 (3data+catalog),61pass → GREEN65targeted | 3data tests đọc SQL thật từ MDX, goldens10 hồ sơ/cột/tên/thứ tự; đổi trạng thái hoặc phòng trả9. |
| TDD4.10 | RED4 (3data+catalog),61pass → GREEN65targeted | Goldens2 hồ sơ; đầu dưới/cuối khoảng, thứ tự ngày rồi mã; trạng thái và nhiều/thiếuHĐ không mất/nhân hồ sơ. |
| Suite cuối Node24.22.1 | 338 / 338 tests,52 files | Sau bổ sung đường LoadTo đầu tiên và chuyển sang4.10; exit0. |
| Runtime Node22.23.4 | 338 / 338 tests,52 files | Chạy Vitest bằng binary Node22 qua npx cache riêng; project dependency/lock không đổi. |
| Astro check | 0 errors,0 warnings,3 hints nền | Không hint mới; source cuối cảhai bài. |
| Build / links | 135 trang,2032 link; exit0 | Build hiện hành sau sửa4.9, không dùng HTML cũ để chứng nhận source mới. |
| HTML4.9 | 1SQL/1payload copy,1Result30ô+marks,1Excel12ô+marks | SQL hiển thị/copy/tab/nháy, cột/ô/marks khớp nguồn;5h2/5câu ôn, không route/YAML bài tập. |
| HTML4.10 | 1SQL/1payload copy,1Result8ô+marks,1Excel12ô+marks | Cùng đối chiếu; ngày trongExcel được hiển thị d/m/y, Result giữ ISO, cùng ý nghĩa. |
| API / bộ đề | Không thay YAML hoặc code API/guard | Không tăng số đề, không chấm thao tác Excel hoặc yêu cầu báo cáo. Không dùng kiểm đóng gói cũ làm API live pass. |
| SQL Server live | Chưa kiểm | Bốn SQLenv thiếu, không tool SQL trực tiếp; không kết nối DB/API, không sửa dữ liệu chung. |
| UI / Excel thực | Chưa kiểm | Playwright launch thiếu Chromium binary; không cài/tải browser hoặc đổi cấu hình để ép kiểm. Không mở Excel, connect/load/Refresh/lưu/chia sẻ, clipboard, keyboard, viewport, details, login/completion thật. |

## Số liệu và điều kiện được bảo vệ

Public seed literal được tính Python riêng, không SQL engine: IT đang làm có10 mã NV007/011/017/021/029/035/039/043/046/048; danh sách vào mới01/10 tới trước22/10 trả NV047/Phạm Ngọc Ánh/NS/2026-10-01 và NV048/Đỗ Minh Quân/IT/2026-10-05.

Tests dùng fixtureQuery hiện có, chạy SELECT subset trên SQLite RAM; không sửa helper, không tạo parser SQL. Kết quả/goldens và guard kiểm từ SQL được giải mã trực tiếp trong MDX. Không chứng minh syntax/type/date metadata/collation hoặc trạng thái dữ liệu SQL Server hiện hành.

Probe4.9 bắt việc bỏ lọc trạng thái hoặc phòng. Probe4.10 có ngày30/09,01/10,21/10,22/10, input đảo và mã không cùng thứ tự ngày; lấy T800/01-10 rồi T050,T100/21-10, nên phân biệt được sai biên/sai thứ tự chính/tie. Probe đổi NV047 đã nghỉ, cho nhiều hợp đồng trong khi NV048 chưa có, vẫn giữ2 dòng/mã. Các probe là dữ liệu test giả định, không phải hồ sơ được thêm vào seed.

## Đối chiếu thêm sau learner review4.9

Tác giả mở tài liệu Microsoft Create/load query ngày27/10: LoadTo có thể bị mờ ở lần đầu tạo query. Đã thêm một nhánh ngắn ở bước5: Close&Load → Excel Data/Queries&Connections/Queries → nhấp phải query/LoadTo → Table/Newworksheet. Sửa tại branch4.9 rồi rebase một commit local4.10 lên đó để giữ ancestry; original210fe7d có backup ref local.

SQL/Result/Exceldata không đổi. Existing content/data65tests, build135/dist2030 và HTML4.9 đạt sau sửa; final338/52 ởNode24/22 cùng build135/dist2032/HTMLcảhai đạt sau chuyển tiếp. Không thêm test khóa câu chữ hoặc gọi learner học lại. Report learner4.9 giữ hash bản trước sửa; reviewer tích hợp đọc bản sau.

## Nguồn, log và phân loại evidence

Log/ledger/source-data/checker HTML ở temp/verification/2026-10-27-4-9-4-10/ (ignored). Logs cuối: final-suite.log, final-node22-after-load-fix.log, final-check.log, final-build.log, final-dist.log, final-html.log. Giữ RED và lỗi môi trường Node22 ban đầu (cache path từ lượt trước đã mất); lấy lại utility bằng npx node@22.23.4 rồi chạy thành công, không đổi project lock.

Tài liệu Microsoft đã mở, chỉ là căn cứ hướng dẫn, không bằng chứng tác giả thao tác Excel:

- [Native database query](https://support.microsoft.com/en-us/excel/import-data-from-a-database-using-native-database-query-power-query).
- [About Power Query](https://support.microsoft.com/en-us/excel/about-power-query-in-excel).
- [Refresh external connection](https://support.microsoft.com/en-us/excel/refresh-an-external-data-connection-in-excel).
- [Create, load or edit a query](https://support.microsoft.com/en-us/excel/create-load-or-edit-a-query-in-excel-power-query).
- [SQL Server connector](https://learn.microsoft.com/en-us/power-query/connectors/sql-server).

Hai learner report gốc/disposition được lưu riêng; không có findings cần sửa ở hai bản được giao. Kiểm ở bảng trên do tác giả thực hiện, không gán cho reviewer. Review tích hợp sẽ có report/disposition riêng; chưa dùng các giới hạn pending làm pass hoặc quyền push/main/deploy.

