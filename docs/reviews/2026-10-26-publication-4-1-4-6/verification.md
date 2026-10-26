# Kiểm chứng và xử lý review xuất bản 4.1–4.6

Ngày 26/10/2026. Người dùng yêu cầu kiểm tra, hoàn thiện rồi đưa sáu bài lên main. Nhánh `codex/review-lessons-4-1-4-6` tổng hợp từ `dd67309`; main gốc `0081807`. Nhánh workspace SSMS không thuộc lần ghép này. Báo cáo này bổ sung bằng chứng mới, không sửa kết luận của các report cũ.

## Nội dung và review

Giữ sáu bài đầy đủ đã viết trên các nhánh 4.1–4.6: CTE → đánh số/đồng hạng → lũy kế/kỳ trước → PIVOT → view → chất lượng dữ liệu. Mạch Excel/SQL gộp, tình huống có lời giải cạnh kết quả. Có 15 đề mới, tổng 78 đề, giữ 51 URL. Bài 4.5 đọc hiểu, không có YAML; view chỉ là đề xuất chưa tạo, hai mẫu `copy={false}`, không dựng Result giả. Không thay seed, API hay thiết kế chung.

Sáu reviewer mới dùng ngữ cảnh mới, kế thừa model Codex của phiên, không truyền model khác. Các bài có YAML khóa phase1 từ đề công khai trước khi xem đáp án. Report và phase1 được lưu trong thư mục này, không sửa nội dung/kết luận; riêng bản sao report cuối 4.4 bỏ một dòng trống dư cuối file để đạt kiểm whitespace Git, bản gốc còn nguyên ở temp. Reviewer chỉ đọc source/HTML, không tự chạy SQL/UI; không gán bằng chứng tác giả cho reviewer.

| Nguồn nhận xét | Quyết định | Căn cứ và xử lý |
|---|---|---|
| 4.1: CTE tự đủ, phạm vi một câu, 3 đề đủ tiền đề; không có finding sửa | Làm theo: giữ | Đọc toàn bài/report; câu kiểm không bỏ WITH, không hứa lưu hay tăng tốc. SQL/flow kiểm live riêng bên dưới. |
| 4.2: khóa phân định, đồng hạng, phạm vi ngày, 3 đề đủ tiền đề; không có finding sửa | Làm theo: giữ | Giữ 55 → 46 và phân biệt chọn gần nhất với còn hiệu lực. Đối chiếu SELECT riêng. |
| 4.3: tháng thiếu, khung ROWS, vị trí lọc, 3 đề đủ tiền đề; không có finding sửa | Làm theo: giữ | Giữ 14/20/11, kỳ trước NULL/14/20 và tháng thiếu không tự bằng 0. |
| 4.4: code cho SUM/PIVOT/COUNT ở dòng 70/87/149 | Làm theo | Chỉ sửa ba dòng lời văn. Build mới 19:18:07; reviewer xác nhận trong `recheck-4.4.md`. Không đổi SQL/Result/YAML, không thêm test khóa câu chữ cho sửa định dạng. |
| 4.4: không ép RunFlow; 3 đề đủ tiền đề | Làm theo: giữ | Ba vai trò, nguồn thừa cột, COUNT/SUM và năm đã giảng trước phần ôn; không tạo flow giả cho PIVOT. |
| 4.5: noExercises, 5 câu ôn đủ tiền đề, không có finding sửa | Làm theo: giữ | Không tạo view, không yêu cầu học viên web đổi sang SSMS. Hướng dẫn hoàn thành nhất quán README/giới thiệu. |
| 4.6: 3 luật độc lập, 3 đề đủ tiền đề; không có finding sửa | Làm theo: giữ | Giữ phân biệt nhóm/hồ sơ/hợp đồng/người; không cộng ba chỉ tiêu thành người và không tự sửa nguồn. |
| Sáu report: chưa tự kiểm SQL/runner/UI | Làm theo: bổ sung bằng chứng tác giả | Không gọi source/HTML là tương tác UI; kết quả thực thi tách riêng dưới đây. Các giới hạn còn lại ghi cuối báo cáo. |

Không bỏ qua finding nhỏ hoặc đổi kết luận gốc thành xác nhận của tác giả. [Review tích hợp mới](integration.md) đã hoàn tất; không có finding nội dung mới. Root đọc toàn bộ report và xử lý đủ bốn mục cần phán định:

| Mục tích hợp | Quyết định của tác giả | Căn cứ / kết quả |
|---|---|---|
| DJ1: vô tình thấy ma trận tác giả khi đọc evidence | Làm theo: ghi giới hạn, giữ lượt tích hợp có giới hạn | Không gọi là blind audit. Reviewer mới không mang lịch sử viết; mục 4.5 cho phép evidence tác giả ở tích hợp. Sáu lượt tiền đề độc lập và phase1 không bị ảnh hưởng. Không dùng ma trận hoặc kết luận review thay bằng chứng source/SQL/UI, không cần lặp sáu lượt. |
| DJ2: phiên bản cuối/main/publish | Làm theo | Kiểm lại tests/check/build/dist trên main sau merge, ghi commit và kết quả ở mục xuất bản dưới; chỉ push theo quyền người dùng đã cho. |
| DJ3: công cụ reviewer không tự kiểm | Làm theo | Giữ tách kiểm source/HTML của reviewer với UI/SQL/runner của tác giả, giữ giới hạn SSMS/DDL/accessibility/người học thật và API production. |
| DJ4: OBJECT_ID NULL / quyền metadata | Làm theo | Không dùng NULL làm chứng cứ độc lập rằng view vắng; không chạy DDL để kiểm. Bài ghi mẫu đề xuất chưa triển khai theo phạm vi đã duyệt, không dựng Result giả. |

## SQL và database

Chạy script tạm chỉ cho phép SELECT/WITH; so cột, tổng và từng dòng trích với MDX, so query/focus của flow. Có 19 câu đọc duy nhất, gồm SELECT nền của view và metadata; 13 Result cùng 11 trạng thái RunFlow khớp. Không thực thi CREATE VIEW, SELECT đòi view đề xuất, biểu thức ROW_NUMBER rời hoặc mảnh PIVOT: bốn mẫu không phải câu độc lập an toàn/phù hợp môi trường. OBJECT_ID trả NULL không tự chứng minh đối tượng vắng mặt vì còn phụ thuộc quyền xem metadata.

| Bài | Result / trạng thái flow | Đối chiếu chính |
|---|---|---|
| 4.1 | 2 / 4 | Chín đơn, ba loại tổng 9/5/2, hai loại đạt ngưỡng. |
| 4.2 | 3 / 4 | 55 hợp đồng đạt mốc, 46 mã có dòng gần nhất; điểm cắt ba hạng cho 3/5/9 dòng. |
| 4.3 | 2 / 3 | Tổng 14/20/11; lũy kế 14/34/45; kỳ trước NULL/14/20; chênh lệch NULL/6/−9. |
| 4.4 | 3 / 0 | 20 dòng nguồn, CASE/PIVOT cùng ba tháng và ô NULL, tháng 9 tổng 20. |
| 4.5 | 0 / 0 | Chỉ đọc câu SELECT định nghĩa trên NhanVien, không tạo đối tượng hoặc giả kết quả của view. |
| 4.6 | 3 / 0 | Một nhóm CCCD/hai hồ sơ; hai email NULL; HD2025-003 có ngày kết thúc trước ngày bắt đầu. |

78/78 đáp án qua runner hiện có luôn hoàn tác (gồm DML); exit 0. `check:data` sau đó báo “Không bảng nào lệch.” Không gọi câu ghi trực tiếp trên database chung.

Đối chiếu điều kiện kỹ thuật với Microsoft: [CTE](https://learn.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql?view=sql-server-ver17), [ROW_NUMBER](https://learn.microsoft.com/en-us/sql/t-sql/functions/row-number-transact-sql?view=sql-server-ver17), [OVER](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql?view=sql-server-ver17), [LAG](https://learn.microsoft.com/en-us/sql/t-sql/functions/lag-transact-sql?view=sql-server-ver17), [PIVOT](https://learn.microsoft.com/en-us/sql/t-sql/queries/from-using-pivot-and-unpivot?view=sql-server-ver17), [CREATE VIEW](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql?view=sql-server-ver17). Các tài liệu dùng để kiểm giới hạn, không thay kết quả chạy.

## Kiểm máy và giao diện

- `npm test`: 322/322, 48 file, exit 0; đã chạy lại sau ba dòng biên tập 4.4 (`tests-final.log`, 19:25).
- `npm run check`: 0 lỗi, 0 cảnh báo; 3 hint nền ở FormEvent/execCommand của editor hiện tại; bản sau biên tập cũng cùng kết quả (`check-final.log`).
- API build/typecheck: exit 0, 78 bài; không sửa API.
- Build sau biên tập: 132 trang, exit 0; `check:dist`: 132 trang / 1994 liên kết, exit 0.
- Preview riêng cổng 4336, sáu bài ở 1280×900 và 1440×900: không tràn ngang trang, mục lục đúng bài. 24 tự kiểm tra mở bằng Enter, vị trí sau Ghi nhớ/trước Bài tập; 4.5 không có Bài tập rỗng.
- 11 drawer: Enter mở, phím phải chuyển đủ bước, từng panel có highlight đúng focus nguồn; Escape đóng và trả focus cho thẻ. Sao chép câu kiểm 4.3 có WITH đầy đủ, tab thật, không lộ escape; computed tab-size = 4. Clipboard được trả về trạng thái rỗng ban đầu.
- Bảng PIVOT đánh dấu đúng dòng tháng 8/10; NULL vẫn tách màu. Câu SQL và giá trị dẫn chứng đọc được trong chiều rộng bài. 4.5 không có nút sao chép cho mẫu chưa triển khai.

- Màn bài tập hiện tại: paste mẫu CTE công khai có comment tiếng Việt, xuống dòng và tab giữ đủ nội dung; Tab thêm bốn dấu cách, undo bỏ đúng phần thụt vừa thêm và giữ comment. Đã trả nháp và clipboard về trạng thái rỗng ban đầu; không bấm Chạy/Nộp.

Evidence thô và ảnh nằm tại `temp/verification/2026-10-26-review-4-1-4-6/` (ignored, không chứa trong gói xuất bản). Nội dung/kết luận review/phase1/tích hợp trong thư mục này giữ nguyên; ngoại lệ whitespace của bản sao 4.4 đã ghi ở trên.

## Giới hạn

Không tạo view để kiểm batch/quyền bằng DDL; không kiểm SSMS thật, công nghệ hỗ trợ đọc màn hình hoặc đo thời gian học với người thật. Không nộp SQL từ browser bằng mã truy cập; bằng chứng bộ chấm là 78 đáp án qua runner local trên database cấu hình sẵn, khác kiểm API production sau triển khai. Không dùng khung SSMS chưa merge làm bằng chứng cho màn main.

## Kiểm main trước push

Commit hoàn thiện `3e9890f` được ghép vào main bằng merge `74e1b30433aad2a083ac8f58de921523e1f305b6`. Cây sau merge bằng nhánh đã review; không xung đột. Main không đổi API/components/lib; nhánh SSMS tại `6f69452` vẫn riêng.

Kiểm main lúc 19:31 ngày 26/10: 322/322 tests, 48 file; Astro 0 lỗi/0 cảnh báo/3 hint nền; build 132 trang, check:dist 1994 liên kết, toàn bộ exit 0. Log `main-tests.log`, `main-check.log`, `main-build.log`, `main-dist.log` ở thư mục evidence. Commit tài liệu tiếp theo chỉ ghi kết quả này, không đổi source hay bộ đề; người dùng đã cho phép push/main. Trạng thái Pages/API theo dõi sau push, không suy từ kiểm local.
