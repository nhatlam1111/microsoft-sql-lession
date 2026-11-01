# Kiểm và xử lý review bài 3.1–3.2

Ngày: 01/11/2026. Nhánh `codex/lessons-3-1-3-2-refresh`; base sản phẩm `a67c37a`. Thiết kế được người dùng duyệt trong chat, giữ hai tình huống. Chưa merge/push/deploy.

## SQL của tác giả

Không có công cụ MCP azure-sql trong inventory. Dùng module createRunner/localConfig của repo, biên dịch helper tạm vào api/dist bằng esbuild có sẵn. Chỉ gửi SELECT; giao dịch luôn rollback. localConfig nạp cấu hình nội bộ, không đọc/in nội dung .env, secret hoặc cấu hình kết nối. Không cài công cụ hay đổi thiết lập DB.

Log và SQL đầy đủ: `temp/verification/2026-11-01-lessons-3-1-3-2/{verify-sql.mjs,sql-live.log,sql-evidence.json}`.

19 SELECT mới đã chạy đạt:

- 3.1: nguồn 20 dòng; tập lọc 9 đơn; COUNT/SUM/AVG đã CAST/MIN/MAX = `9 / 16.0 / 1.78 / 1.0 / 3.0`. COUNT(SoNgay) = 9. Tổng đúng từng điều kiện độc lập = 14/15/16, số giữ 9. DP018 từ 31/08 đến 04/09, 3 ngày. SoNgay decimal(4,1), NOT NULL.
- Giá trị giả định 2/NULL/0: COUNT(*) 3, COUNT(cột) 2, SUM 2, AVG 1, MIN 0, MAX 2; không gọi đây là ba đơn thật. Phạm vi rỗng: hai COUNT 0, bốn hàm còn lại NULL. Có hai dòng toàn NULL: COUNT(*) 2, COUNT(cột) 0, bốn hàm NULL. Ép SoNgay sang int trước AVG trả 1; CAST kết quả sang decimal trả 1.00.
- 3.2: nguồn 48, đang làm 45; sáu nhóm KD13/IT10/VH8/KT7/NS5/BGD2. Nhóm thêm TrangThai trong phạm vi đang làm vẫn sáu nhóm; mọi trạng thái có tám cặp. Phạm vi rỗng không sinh nhóm. Minh họa nhóm NULL: hai giá trị NULL thành một nhóm hai dòng, KD một dòng; không giả MaPB nguồn có NULL.

Chưa gọi đây là bằng chứng exact SQL từng bước của MDX cuối, runner bài tập, UI hay SSMS; các phần đó kiểm riêng sau khi viết.

## Task 1 — 3.1

- Test trước sửa: 3 lỗi đúng kỳ vọng (COUNT(SoNgay)/input còn thiếu, bài cũ bốn tiểu mục). Log `task1-red.log`.
- Sau sửa: nhóm test content-3-1/content-flow-checks/content đạt 94/94, gồm hai trường hợp 3.1 thêm vào bảng kiểm dùng chung. Log `task1-green.log`.
- Bỏ query/result NhanVien, gộp lý thuyết về SoNgay, giữ kiến thức COUNT(cột), NULL/0, tập rỗng và AVG int. Ba câu ôn nằm sau Memo; câu chính giữ nguyên.
- FROM trích năm đơn để soi ba điều kiện; WHERE checks 14/15/16/9; SELECT có MaDon/SoNgay, nhắc tổng hợp đủ chín dòng dù đầu vào chỉ trích năm.

## Task 2 — 3.2

- Test trước sửa: ba lỗi đúng kỳ vọng (query phụ, thiếu input/checks và bốn tiểu mục). Log `task2-red.log`.
- Sau sửa: content-3-2/content-flow-checks/content đạt 96/96, log `task2-green.log`.
- Bỏ query/result tổng 45 và KD/trạng thái; giữ lời giải nhóm nhiều cột trên phạm vi đang làm và tiền đề đề mọi trạng thái. Câu chính và YAML giữ nguyên.
- FROM có hồ sơ đang làm/đã nghỉ trong năm dòng đầu; WHERE checks 45/45. Bước GROUP BY nhận các mã lặp, hiện sáu nhóm. Cột đếm có nhãn minh họa “Số hồ sơ trong nhóm”; SELECT mới đặt alias SoHoSo. SQL kiểm của GROUP BY dùng cùng caption để bảng không làm người đọc hiểu alias câu chính đã có trước SELECT.
- Hồ sơ công ty thay mô tả ví dụ phụ cũ bằng việc thêm TrangThai trong cùng phạm vi không sinh thêm nhóm; sự việc chính không đổi.

## Các phần còn lại

Source giao hai review độc lập: `665e91a`, sạch trước khi bổ sung hồ sơ kiểm, build 21:08 +07 ngày 01/11. Manifest nguồn/HTML ở `temp/review/2026-11-01-lessons-3-1-3-2/`. Reviewer chỉ đọc source/HTML, không browser/SQL; không giao evidence hoặc kết luận của tác giả cho review từng bài.

## Kiểm máy và exact SQL, bản 665e91a

| Phép kiểm | Kết quả | Log trong thư mục kiểm |
|---|---|---|
| npm test | 55 file, 416/416 test đạt | tests.log |
| npm run check | 247 file, 0 lỗi/0 warning, 3 hint nền | check.log |
| npm run build | 139 trang | build.log |
| npm run check:dist | 139 trang, 2771 link đạt | dist.log |
| API build/typecheck | 76 bài, typecheck đạt | terminal build, api-typecheck.log |
| API check:exercises | 76 đáp án chạy đạt; 3.1: 1/1/1 dòng, 3.2: 6/8/3 dòng | exercises.log |
| API check:data sau runner | Không bảng nào lệch | data.log |
| SQL đúng literal MDX | 10 lượt SELECT: hai câu chính và 8 câu kiểm của các bước đều khớp số dòng, tên cột, mọi dòng trích; bước ORDER BY còn khớp thứ tự | mdx-sql.log, mdx-sql-evidence.json |

Helper `verify-mdx-sql.mjs` đọc literal từ MDX, kiểm câu Sql trùng RunFlow.query, rồi chạy câu chính và sql mỗi bước qua runner. Ba hint nền là FormEvent ở hai chỗ ExerciseWorkspace và document.execCommand ở SqlEditor; các file này không đổi. Chưa coi bất kỳ phép kiểm nào là xác nhận SSMS thật hay mọi cách viết học viên có thể dùng.

## Tương tác UI của tác giả trên build 665e91a

IAB, preview cổng 4327; 1280×800 và 1024×768. Không chạy Chạy/Nộp, không nhập mã truy cập, không đổi thiết lập bảo mật.

- 3.1: xem hình Excel, đánh dấu C2/C10/C11 đúng giá trị 2/1/16; ngày căn như ngày. Hai tiểu mục và câu chính hiển thị đúng nhịp. Drawer FROM/WHERE/SELECT đủ ba phần; WHERE hiện năm đơn và ba điều kiện, tổng 14/15/16/9; SELECT trích năm trong chín, nói rõ tính cả chín, kết quả một dòng năm cột.
- 3.1: Next/Prev, giới hạn nút Next ở bước cuối, Escape hoạt động; drawer nằm trong viewport, không tràn trang ở 1280 và 1024. Mở được đáp án tự kiểm tra tập rỗng.
- Sao chép câu chính 3.1: bảy dòng, có tab thật, không có hai ký tự literal \\t; CSS pre/editor tab-size 4. Dán bằng Ctrl+V vào editor bài 3-1-1 khớp toàn bộ chuỗi, không chạy SQL. Đã lưu/khôi phục nội dung nháp qua textbox và clipboard qua API; chỉ báo giữ nội dung nháp, không khẳng định trạng thái tồn tại của khóa storage được giữ nguyên.
- 3.2: xem hình PivotTable, A2/B2/B8 đúng KD/13/45. WHERE có NV020/NV033 bị loại và 45 giữ trên 48. GROUP BY thấy hai cặp mã lặp ở năm dòng đầu vào; kết quả sáu nhóm có caption kích thước nhóm. ArrowRight sang SELECT rồi ORDER BY hoạt động; alias chỉ đặt ở SELECT, thứ tự sau sắp đúng KD/IT/VH/KT/NS/BGD. Kiểm GROUP BY/SELECT/ORDER BY ở 1024; WHERE và Excel ở 1280, không tràn trang trong các trạng thái đã đo.
- Sao chép câu chính 3.2 giữ đủ năm dòng và GROUP BY/ORDER BY; đã khôi phục clipboard. Mở được câu ôn thêm trạng thái nhưng vẫn lọc đang làm. Console tab lúc kiểm cuối không có error được ghi nhận.

Đã xem screenshot Excel 3.1/3.2 và drawer WHERE/GROUP BY qua công cụ, không lưu ảnh vào repo. Đã đóng hai tab tạm và reset viewport. Chưa kiểm SSMS thật, screen reader, mobile, trình duyệt khác hoặc xác thực/nộp production. Drawer rộng cố định trên mobile là giới hạn nền đã ghi ở lượt trước, không sửa component trong scope này. Không báo giao diện cả khóa học đã đạt chuẩn mới.

## Review và xử lý

Đã đọc hết hai report trước khi sửa. [Review 3.1](review-3-1.md) và [review 3.2](review-3-2.md) được sao chép nguyên văn từ temp/review của lượt này, không sửa kết luận gốc. Mỗi reviewer là agent Codex mới với fork_turns none, model kế thừa phiên, không chỉ định model/effort khác, không phân agent con. Mỗi người xác định tiền đề ba prompt trước khi xem answer; không chạy SQL/DB/API/build/test/browser.

Giới hạn ngữ cảnh phải giữ: cả hai reviewer cho biết lúc trích mục quyết định trong spec đã vô tình thấy thêm đoạn trạng thái triển khai của tác giả; không mở report cũ/verification/matrix và không dùng trạng thái ấy làm bằng chứng. Không gọi đây là review mù hoàn toàn với mọi kết luận tác giả, không tạo reviewer thay thế để che giới hạn. Review tích hợp sau sửa sẽ đọc evidence có chủ đích theo §4.5 và tách nguồn bằng chứng.

| Nhận xét | Quyết định | Xử lý và căn cứ |
|---|---|---|
| 3.1 B1 — int chưa có nghĩa tiếng Việt tại lần đầu | Làm theo | Sửa ngay câu hiện có thành “số nguyên int”, không thêm đoạn/query. Kiểu trả AVG đã được tác giả đối chiếu Microsoft và SQL live riêng. |
| 3.2 F1 — FROM thiếu chưa chọn cột | Làm theo | Thêm “chưa chọn cột kết quả” trong chính câu FROM, đúng §2.6. Áp dụng cả FROM của 3.1 cho nhất quán, vẫn ghi bảng trích chứ không giả nguồn chỉ có ba/bốn cột. |
| Các mục Giữ được của hai report | Làm theo | Giữ tình huống, một query, hai tiểu mục, phạm vi/NULL/mẫu số, nhóm nhiều khóa, captions/alias, sáu đề và các kết quả đã kiểm. Không thêm ví dụ phụ hoặc tăng câu ôn. |
| Tác giả tự rà — dẫn bài 3.5 quá cụ thể | Làm theo | Bài 3.5 dạy LEFT JOIN giữ dòng chưa khớp, không có chính báo cáo phòng số 0. Sửa vế dẫn sang khả năng giữ dòng chưa khớp; không hứa bài sau chứa ví dụ không có. |
| Tác giả tự rà — SELECT drawer 3.2 lặp chú thích đầu vào | Làm theo | Bỏ câu lặp năm/sáu nhóm ở Kết quả vì nhãn input tự ghi và lời Thực hiện đã đặt alias; giữ số dòng/cột kết quả. |
| Mọi phần reviewer chưa xác minh | Làm theo | Giữ riêng giới hạn SQL/UI/SSMS/runner/thời lượng; dùng evidence tác giả tương ứng, không đổi thành pass của reviewer. |

Các sửa vòng này chỉ là lời văn, không đổi SQL/YAML/flow-data/renderer. Không thêm test khóa cứng các câu biên tập; test cấu trúc/kiến thức/input/số liệu hiện hành được chạy lại cùng các kiểm bắt buộc.

## Kiểm sau sửa theo review

- `tests-final.log`: 55 file, 416/416 test đạt. `check-final.log`: 247 file, 0 lỗi/0 warning, vẫn ba hint nền. `build-final.log`: 139 trang, hoàn tất 21:21 +07; `dist-final.log`: 2771 link đạt.
- `api-build-final.log`, `exercises-final.log`, `data-final.log`: API build 76 bài; toàn bộ 76 đáp án chạy xong; kiểm dữ liệu sau runner không bảng nào lệch. Không dùng chạy/nộp browser làm phép kiểm DB.
- `compare-sql-revision.mjs` so literal câu chính, sql/rows/columns/checks/input từng bước với commit 665e91a: hai bài đều không đổi các dữ kiện đó (`sql-revision-comparison.log`). Bằng chứng 10 exact SELECT ở bản trước vẫn áp dụng đúng các literal cuối; không gọi đây là một lần chạy SQL lại sau sửa lời.
- Mở lại bản build 21:21 ở 1280×800: nghĩa “số nguyên int” hiện ngay trong đoạn đầu dùng int; FROM cả hai bài hiện “chưa chọn cột kết quả”; vế 3.5 đúng về giữ dòng chưa khớp; SELECT 3.2 chỉ còn kết quả sáu dòng/hai cột. Đã bấm mở các drawer ấy, Escape/Đóng và điều hướng 3.1→3.2 hoạt động. Đã đóng tab tạm và reset viewport.
- Hình/SQL/data/renderer không đổi, kiểm copy-paste và hai viewport ở build 665e91a được giữ với đúng nguồn phiên bản; không nói đã thử lại toàn bộ thao tác ấy ở build cuối. Chưa có bằng chứng mới cho SSMS, mobile, screen reader, xác thực/nộp production hoặc thời lượng.

Đang chuẩn bị review tích hợp mới trên source/build sau sửa; không dùng kết luận review làm quyền merge/push.
