# Kiểm chứng SQL — bộ slide Làm quen SQL Server

Đây là **kiểm chứng của tác giả**, không phải review độc lập. Kết quả: **12/12 ca SELECT-only đạt** trên database dùng chung; không chạy câu ghi, DDL, thay đổi thiết lập phiên hay API sửa dữ liệu.

- Thời gian thực chạy: **01/11/2026, 15:38:45–15:39:46 (UTC+7)**; bản ghi máy: `2026-11-01T08:38:45.177Z`–`2026-11-01T08:39:46.916Z`.
- Source được đối chiếu: `src/content/presentations/lam-quen.mdx`.
- SHA-256 source tại lúc bắt đầu: `259317c81d6130ad3998ff0438125143817bba925448c2405d21cabbc3df92ca`.
- Script chạy: [`verify-sql.mjs`](../../../temp/verification/2026-11-01-foundation-presentation/verify-sql.mjs); dùng helper đọc có sẵn, không in cấu hình kết nối.
- Lệnh: `node temp/verification/2026-11-01-foundation-presentation/verify-sql.mjs`.
- Bằng chứng đầy đủ gồm từng câu SELECT và kết quả: [`sql-results.json`](sql-results.json). JSON chỉ lưu dữ liệu mẫu, metadata schema, ngôn ngữ/định dạng ngày của phiên; không lưu máy chủ, tài khoản, mật khẩu hay metadata kết nối.

## Các ca đã xác minh

| Ca | Nội dung và điều kiện đạt | Kết quả thực |
|---|---|---|
| `sample-employees-and-current-departments` | Tra ba hồ sơ qua `NhanVien.MaPB = PhongBan.MaPB`; mã, họ tên và phòng khớp slide | `NV001 / Trần Thị Mai / KT / Kế toán`; `NV005 / Vũ Thị Lan / KT / Kế toán`; `NV021 / Tôn Thất Long / IT / IT` |
| `nv021-three-contracts` | Đúng ba dòng hợp đồng, ba `MaHD` khác nhau, đều của `NV021` | `HD2021-001`, `HD2021-002`, `HD2024-005`; hợp đồng cuối có `NgayKetThuc = NULL` |
| `kt-kd-exist-kt01-absent` | Danh mục có `KT`, `KD`, không có `KT01` | Hai dòng: `KD / Kinh doanh`, `KT / Kế toán` |
| `relevant-column-types-and-nullability` | Đọc kiểu, precision/scale và khả năng NULL từ `sys.columns` | `HopDong.LuongCoBan`: `decimal(18,0) NOT NULL`; `HopDong.NgayKetThuc`: `date NULL`; `NhanVien.SoCCCD`: `varchar(12) NOT NULL`; `MaPB`: không nhận NULL; `MaQuanLy`: nhận NULL; `NgayVaoLam`: `date` |
| `declared-primary-keys-and-column-order` | PK của các bảng được dùng và thứ tự cột khóa ghép khớp giải thích | `NhanVien(MaNV)`, `PhongBan(MaPB)`, `HopDong(MaHD)`, `BangLuong(KyLuong, MaNV)`, `ChamCong(MaNV, Ngay)` |
| `declared-foreign-keys-and-enabled-state` | Đường FK cần cho sơ đồ có thật, đang bật và được trusted | `NhanVien.MaPB → PhongBan.MaPB`; `NhanVien.MaQuanLy → NhanVien.MaNV`; `HopDong.MaNV → NhanVien.MaNV`; `BangLuong.MaNV → NhanVien.MaNV`; cả bốn có `IsDisabled = false`, `IsNotTrusted = false` |
| `nv021-three-projected-result-rows` | Kết bảng hồ sơ với hợp đồng, chỉ lấy mã và họ tên | Ba dòng giống phần minh họa: `NV021 / Tôn Thất Long` |
| `many-to-one-lookup-preserves-source-row-counts` | So số dòng nguồn với kết quả tra tên phòng qua khóa duy nhất | Nhân viên `48 → 48`; hợp đồng `55 → 55`; lương `86 → 86` |
| `text-to-int-value` | `SELECT CAST('9610000' AS int)` cho giá trị số giữ nguyên | `9610000` |
| `current-session-language-and-date-format` | Chỉ đọc dòng của phiên hiện tại từ `sys.dm_exec_sessions` | `us_english`, `mdy` |
| `ambiguous-slash-date-under-current-session` | `SELECT CAST('01/02/2024' AS date)` theo cấu hình vừa kiểm | Ngày **02/01/2024**, hiển thị ISO `2024-01-02` |
| `invalid-text-to-date-is-rejected` | `SELECT CAST(N'chưa rõ' AS date)` phải lỗi chuyển kiểu | Lỗi **241** đúng dự kiến; chỉ là biểu thức SELECT, không ghi vào bảng |

## Giới hạn và cách đọc bằng chứng

- Phiên này dùng `us_english` và `mdy`; không suy kết quả của chuỗi `01/02/2024` cho mọi tài khoản, SSMS hay phiên khác. Slide đã ghi rõ điều kiện này. Script không chạy `SET LANGUAGE` hoặc `SET DATEFORMAT`.
- Hai ví dụ đổi kiểu được kiểm bằng `CAST` tường minh trong SELECT để thấy giá trị hoặc lỗi mà không ghi dữ liệu. Không chạy thử chuyển kiểu ngầm qua `INSERT`/`UPDATE`; phần giải thích chuyển kiểu ngầm không được báo thành một phép ghi đã kiểm.
- PK/FK được kiểm qua metadata và các kết quả đọc. Không thử thêm mã trùng, NULL, `KT01` hay ghi nhầm `KD` vào database dùng chung; các dòng nhận/từ chối trên slide là mô tả luật đã khai báo.
- Ba dòng lặp của `NV021` là kết quả chiếu hai cột sau kết bảng, không phải ba hồ sơ nguồn. Câu kiểm có `ORDER BY`; các bảng minh họa không hứa thứ tự cố định khi truy vấn bỏ sắp xếp.
- Số dòng được giữ nguyên là kết quả trên dữ liệu và thiết kế hiện tại; đường tra đi tới khóa duy nhất, và các cột FK liên quan không nhận NULL. Không suy thành mọi phép kết bảng đều giữ số dòng.
- Việc công ty không lưu lịch sử chuyển phòng lấy từ `docs/ho-so-cong-ty.md`; lượt này không kiểm mọi thiết kế hay quy trình lưu lịch sử ngoài phạm vi khóa học.
- Lượt này chỉ kiểm dữ liệu/metadata/các biểu thức của source có hash trên; không kiểm bản build, giao diện chiếu, khả năng đọc từ xa, thao tác bàn phím hay trình bày của giảng viên. Các việc đó cần bằng chứng khác và review độc lập.

Không có lỗi kết nối hoặc ca SQL ngoài dự kiến trong lượt chạy này. Lỗi 241 là kết quả mong đợi của ca cuối, không phải lỗi nền.
