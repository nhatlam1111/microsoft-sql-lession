# Kế hoạch áp dụng mốc tab SQL

Theo [spec](../specs/2026-10-23-sql-indentation-design.md), ngày 23/10/2026; nhánh `codex/sql-indentation` từ main `921730e`.

- [x] Rà chủ sở hữu: Sql/RunFlow/LineMap/Memo, editor, CSS và quy ước MDX cũ. Thu thập 111 khối SQL/17 bài trước sửa để đối chiếu.
- [x] Thụt lề các đoạn cần thiết bằng escape tab; đồng bộ focus nhiều dòng và token CSS 4 cột. Giữ bản nháp/editor và quy tắc copy.
- [x] Cập nhật quy ước 2.4, ví dụ template và DESIGN.md; sửa test đọc literal để giải mã tab, giữ kiểm điều kiện/số liệu. Bổ sung kiểm render/copy/focus và kiểm cách ghi thụt lề.
- [x] Đối chiếu 111 khối/17 bài, 42 chuỗi đổi whitespace và không đổi token/literal/comment. Browser đối chiếu 97 Sql/55 query highlight với nguồn; 45/45 đáp án qua runner luôn hoàn tác, check:data không bảng nào lệch.
- [x] Review độc lập diff định dạng/UI bằng agent mới kế thừa model phiên. Đã đọc hết [report](../../reviews/2026-10-23-sql-indentation/review-formatting.md); không có finding cần sửa.
- [x] 269/269 test, check 0 lỗi/0 warning/3 hint nền; build 99 trang, check:dist 1.651 link; API build 45/typecheck đạt. Xem SELECT/CASE ở 1280px/1440px, drawer CASE; copy thực và Ctrl+V giữ đúng tab, Tab chèn 4 dấu cách/Ctrl+Z đạt, khôi phục draft ban đầu.
- [x] Push nhánh review `d6fd028`, fetch main vẫn `921730e`, merge main `8f3de64` không xung đột; 269 test đạt trên cây nhập và remote SHA trùng. [CI web](https://github.com/nhatlam1111/microsoft-sql-lession/actions/runs/39988144178) success cho đúng SHA, browser công khai xác nhận tab thật/4 cột ở Sql và query highlight; đã lưu ảnh bàn giao.

## Kết quả và giới hạn

Log/screenshot local ở `temp/verification/2026-10-23-sql-indentation/`; [báo cáo bàn giao](../../reviews/2026-10-23-sql-indentation/README.md). Audit strict exit 1 với hai finding nền: thiếu noValidate trên form mã truy cập; scanner không nhận ra resize:none ở CSS (browser xác nhận none). Không mở rộng đợt định dạng thành sửa form. Không chạy SQL qua browser/SSMS; chỉ chạy đáp án API bằng runner đã bảo vệ. Không kiểm mobile/200% hoặc mọi trạng thái mạng vì không thay các luồng đó.

Commit hồ sơ tiếp theo chỉ ghi kết quả đã xảy ra; không đổi source sản phẩm đã kiểm. Giữ nhánh `codex/sql-indentation` để tra lại.
