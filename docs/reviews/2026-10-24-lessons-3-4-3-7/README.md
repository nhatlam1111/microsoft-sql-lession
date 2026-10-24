# Hoàn thiện bài 3.4–3.7

Ngày 24/10/2026. Nhánh `codex/complete-lessons-3-4-3-7` từ main `37093db`. Tiếp tục theo khung bài 1.1 và quy ước tab đã duyệt.

## Nội dung và review

| Bài | Kết quả | Report học thử độc lập |
|---|---|---|
| 3.4 | Từ dò tên phòng đến INNER JOIN/ON, bí danh, giữ/bỏ/nhân dòng theo quan hệ. | [Review 3.4](review-bai-3-4.md) |
| 3.5 | Gộp Excel/SQL; tìm hồ sơ chưa có bất kỳ hợp đồng nào, khóa NOT NULL và ON/WHERE. | [Review 3.5](review-bai-3-5.md) |
| 3.6 | Kết hồ sơ/hợp đồng/lương; giới hạn ngày/kỳ, kiểm trùng và kiểm đủ dòng trước khi dùng số tiền. | [Review 3.6](review-bai-3-6.md) |
| 3.7 | Một bảng hai vai trò; quản lý trực tiếp, giữ hồ sơ không có quản lý, đếm cấp dưới đúng. | [Review 3.7](review-bai-3-7.md) |

Ba bản tóm tắt chuyển full, 3.5 chuyển khỏi khung cũ. Thời lượng 20/22/25/20 phút là ước lượng, chưa đo học thực tế. Mỗi bài có ba bài tập, ba câu tự kiểm, câu lệnh giải tình huống và RunFlow. Thêm chín bài tập, giữ ba đáp án 3.5 và làm rõ đề. Khái niệm in đậm, dẫn chứng có code nền, tab SQL bốn cột; dùng component/token hiện có.

Report được giữ nguyên nhận xét tại thời điểm review, nên có chỗ mô tả source/build trước sửa. Tác giả đã đọc hết và xử lý tất cả mục đáng sửa; danh sách **Đã sửa / Không làm theo** nằm trong [spec](../../superpowers/specs/2026-10-24-lessons-3-4-3-7-design.md). Mỗi reviewer là agent mới kế thừa model Codex phiên, không override. Reviewer chỉ học thử qua bài/bài trước/HTML, không dùng seed, DB, API, web hay browser; kiểm thực thi dưới đây do tác giả thực hiện riêng.

## Bằng chứng kiểm thực tế

- **277/277 test, 39 file**; thêm tám test ý nghĩa về quan hệ, số dòng, NULL, phạm vi ngày/kỳ và hai vai trò. Kiểm đỏ trước khi viết; không nới bảo vệ của bài ngoài phạm vi. Ba assertion cũ khóa câu chữ 3.5 được thay bằng điều kiện/ý nghĩa còn cần giữ.
- **Astro check:** 0 errors, 0 warnings; ba hint nền về FormEvent (hai chỗ) và document.execCommand. Lượt đầu có lỗi type mới trong test và script tạm; đã sửa, không coi là lỗi nền.
- **Build:** 108 trang; **check:dist:** 1.740 link, không lọt đáp án. Lượt đầu lỗi details/summary cùng dòng MDX; đã tách thẻ và build lại thành công.
- **API:** build 54 bài tập, typecheck đạt; 54/54 đáp án chạy thành công qua runner luôn hoàn tác, kể cả các câu ghi cũ ở 6.5. `check:data` sau đó báo **Không bảng nào lệch**.
- **SQL minh họa:** 34 SELECT khác nhau kiểm toàn bộ chín khối Sql, bảy Result và 18 bước Flow, gồm cột/tổng/giá trị/thứ tự khi ORDER BY; thêm đếm lương 43, self join INNER 47 và kiểm ba FK của NhanVien đang bật/trusted. 39 ô Excel đối chiếu với SELECT live, gồm hợp đồng đầu theo thứ tự mã, số tiền và quản lý hiện lưu.
- **Bộ chấm:** 60 cặp câu minh họa/đề cùng bài đều không giải nguyên vẹn đề; 26 bài sai tiêu biểu bị core API từ chối, gồm sai quan hệ, mã thay tên, tự bỏ người nghỉ, thiếu/sai kỳ, khóa NULL sai, điều kiện bảng phải đặt sai ở WHERE, chuỗi NULL, chọn ứng viên thay lịch sử, quản lý cấp tiếp và COUNT(*) đếm dòng giữ lại.
- **Browser bản build:** bốn bài tại 1280px và 1440px, đọc mục lục sáu mục, hình Excel/ERD, highlight và bảng trong khung hiện có; không tràn trang. 18 drawer mở bằng Enter, đóng bằng Escape và trả focus; 12 câu tự kiểm mở/đóng bằng Enter. Copy/dán SQL self join sang editor giữ tab thật và computed tab-size 4; trả bản nháp và clipboard về trạng thái ban đầu, không chạy/nộp từ browser. Đã xem ảnh cuối sau build lại; preview hiện thông tin vừa kết thay vì giấu sau cột thứ tư.

Nguồn tác giả đối chiếu: [Microsoft FROM/JOIN và bí danh](https://learn.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql?view=sql-server-ver17), [Microsoft COUNT](https://learn.microsoft.com/en-us/sql/t-sql/functions/count-transact-sql?view=sql-server-ver17), [logical/physical joins](https://learn.microsoft.com/en-us/sql/relational-databases/performance/joins?view=sql-server-2017), cùng script mẫu và SELECT thực tế. Giới hạn nghiệp vụ/ngày được viết ngay trong bài; các trang này xác nhận cơ chế SQL, không chứng nhận quy tắc hợp đồng hay tính lương thật.

Evidence local, không commit secret/cấu hình kết nối: `temp/verification/2026-10-24-lessons-3-4-3-7/` gồm log, probe, verified-live/excel, browser.json và ảnh từng bài/hai chiều rộng. [Plan thực hiện](../../superpowers/plans/2026-10-24-lessons-3-4-3-7.md).

## Giới hạn

Không đổi component/CSS/API/grader/schema/seed hoặc quy ước bài. Chỉ cập nhật câu tham chiếu 3.5 ở đầu template để bỏ mô tả bố cục cũ đã hết đúng. Không kiểm lại CASE hai cấp, mọi trạng thái mạng/đăng nhập, mobile/200% hoặc mọi cách viết SQL tương đương. Audit UI strict toàn hệ thống của vòng trước không chạy lại và không được tính là đạt ở vòng này. Bộ chấm kết quả không phát hiện mọi cách gõ cứng đáp án; đề 3-7-2 hiện không phân biệt được LEFT/INNER vì các hồ sơ NS đều có quản lý.

## Git và bàn giao

Nhánh review được commit/push ở `4c0b37e`; main trước nhập vẫn `37093db`. Merge `d387743fd877e180847ee4b0260e6110ed3dd662` không xung đột, cây nội dung trùng nhánh đã kiểm, 277 test đạt trên cây đã nhập. Push main và xác nhận SHA remote trùng.

[Workflow web đúng SHA](https://github.com/nhatlam1111/microsoft-sql-lession/actions/runs/40059560850) và [workflow API đúng SHA](https://github.com/nhatlam1111/microsoft-sql-lession/actions/runs/40059560861) đều **success**, gồm bước ping API không có mã trả 401. Browser xác nhận bốn bài công khai đều có sáu mục, ba bài tập, ba câu tự kiểm và đủ 4/5/5/4 bước Flow; không tràn trang tại 1440px. [Bắt đầu review bài 3.4](https://nhatlam1111.github.io/microsoft-sql-lession/bai/3-4-inner-join-vlookup/).

Commit ghi hồ sơ xuất bản sau đó chỉ sửa tài liệu, không đổi sản phẩm đã kiểm. Không tạo PR, không xóa nhánh review hoặc worktree khác; workspace chính giữ trên main.
