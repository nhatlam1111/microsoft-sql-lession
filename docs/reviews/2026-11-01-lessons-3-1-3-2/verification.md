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

Đang kiểm source/build cuối và review theo kế hoạch. Không coi test tĩnh là chứng minh SQL hoặc thao tác UI.
