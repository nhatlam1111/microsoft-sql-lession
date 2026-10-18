# Kết quả chạy thử: chạy bài tập trong transaction rồi ROLLBACK

- Ngày chạy: 2026-10-18, trên `sql-lession` (gói miễn phí, serverless 2 vCore), từ máy của người làm khóa học.
- Theo: [spec đợt 2, mục 5.6](2026-10-18-step-flow-exercises-full-lessons-design.md).
- Code chạy thử: nhánh `spike/exercise-runner`, commit `59f60df` (không merge vào `main`). Thư mục `spike/`: `db.mjs` (kết nối từ `.env`), `guard.mjs` (bộ chặn lệnh), `run.mjs` (chạy trong transaction, luôn `ROLLBACK`), `grade.mjs` (chấm), `snapshot.mjs` (checksum 7 bảng), `main.mjs` (các trường hợp), `results.json` (kết quả thô).

## Kết luận

Cách làm ở spec đợt 2 chạy được trên database thật. Cả 15 trường hợp ra đúng kỳ vọng. Checksum của 7 bảng trước và sau lần chạy giống hệt nhau; kiểm lại qua MCP chỉ đọc cũng thấy dữ liệu còn nguyên (20 đơn nghỉ phép, 2 đơn "Từ chối", 86 dòng lương, không có bảng `X`).

Chưa được chứng minh trong lần chạy này:
- Danh sách từ khóa bị chặn (`commit`, `waitfor`, `exec`…) chưa lần nào tự chặn được: cả 6 câu bị chặn đều dừng sớm hơn, ở luật "chỉ nhận câu bắt đầu bằng …", luật dấu `;` hoặc luật `INTO`. Cần thêm trường hợp như `SELECT 1 WAITFOR DELAY '00:00:01'`.
- Luật chấm "`NULL` bằng `NULL`" và báo "Khác số cột" chưa có trường hợp nào đi qua.

Hai việc cần tính trong spec B: database ngủ thì lần chạy đầu mất gần một phút, và mỗi lượt gọi từ máy này tới database mất khoảng 0,34 giây.

## Các trường hợp

| Trường hợp | Kỳ vọng | Kết quả |
|---|---|---|
| Q1a: đáp án là câu cuối bài 3.5 (`MaNV`, `HoTen`); học viên dùng `NOT EXISTS`, đặt tên cột khác | đúng | đúng |
| Q1b: như trên, học viên sắp xếp `ORDER BY HoTen DESC` (đề không yêu cầu sắp xếp) | đúng | đúng |
| Q1c: học viên quên `WHERE` | sai, khác số dòng | "Khác số dòng: bạn ra 57, đáp án 2" |
| Q2: đề yêu cầu sắp xếp theo `MaNV`; học viên sắp `DESC` | sai | "Dòng 1 khác" |
| C1a: tăng `PhuCap` 10% cho phòng IT kỳ `2026-09`; đáp án dùng `JOIN`, học viên dùng `IN (SELECT …)` | đúng, 9 dòng | đúng, 9 dòng |
| C1b: học viên quên điều kiện `KyLuong` | sai | "Khác số dòng bị ảnh hưởng: bạn 17 dòng, đáp án 9 dòng" |
| C2: `DELETE` đơn "Từ chối"; học viên viết `'Từ chối'` thiếu `N` | sai, 0 so với 2 dòng | "Khác số dòng bị ảnh hưởng: bạn 0 dòng, đáp án 2 dòng" |
| E1: `UPDATE … SET PhuCap = PhuCap / 0` | trả nguyên văn lỗi | "Divide by zero error encountered." |
| Bộ chặn: `COMMIT`; `SELECT 1; COMMIT`; `/* x */ DROP TABLE NhanVien`; `EXEC sp_who`; `SELECT * INTO X FROM NhanVien`; `WAITFOR DELAY '00:00:05'` | bị chặn, có lý do | cả 6 bị chặn, lý do bằng tiếng Việt |
| Bộ chặn: `SELECT N'COMMIT' AS x` | được chạy | chạy, trả `COMMIT` |

Trường hợp C2 là tư liệu tốt cho bài học: database này cắt mất dấu tiếng Việt trong chuỗi không có `N`, nên câu `DELETE` "trông đúng" mà không xóa dòng nào.

## Thời gian

| Đo | Kết quả |
|---|---|
| Kết nối và truy vấn đầu tiên (database đang ngủ) | 57,4 giây |
| `SELECT 1` khi database đã thức (5 lần) | 355 / 335 / 346 / 313 / 343 ms |
| Một lần chạy có lỗi (E1, gồm mở transaction, `SET`, câu lệnh; chưa tính `ROLLBACK` chạy sau cùng) | 692 ms |

Thời gian khi đã thức gần như toàn là đường truyền từ máy này tới Azure. Bản chạy thử gửi 4–5 lượt cho mỗi lần chạy (mở transaction, `SET`, câu lệnh, câu kiểm tra, `ROLLBACK`), và chấm một bài là hai lần chạy, nên ước tính từ máy này mất khoảng 2–3 giây mỗi lần nộp (chưa đo trực tiếp một lần nộp trọn vẹn).

## Những gì chạy khác dự kiến hoặc còn thiếu

1. **Database ngủ:** lần đầu mất 57 giây. Thời gian chờ kết nối của API phải trên 60 giây (bản chạy thử để 90 giây), và trang phải báo "Đang khởi động database…".
2. **Lỗi giữa chừng:** với `SET XACT_ABORT ON`, SQL Server tự hủy transaction; lệnh `rollback` của thư viện báo lỗi "đã hủy" và được bỏ qua. Dữ liệu không đổi.
3. **Nhiều câu lệnh không có dấu chấm phẩy:** T-SQL cho viết hai câu liền nhau không cần `;`. Bộ chặn hiện chỉ đếm dấu `;`, nên `UPDATE … DELETE …` vẫn lọt qua. Vẫn an toàn vì đã `ROLLBACK`, nhưng chấm bài sẽ lấy nhầm kết quả. Spec B cần đếm số câu lệnh ở cấp ngoài cùng.
4. **`WITH` dùng cho câu sửa dữ liệu:** `WITH … INSERT INTO …` đang bị chặn vì luật "câu bắt đầu bằng `WITH` thì không được có `INTO`". Cần sửa nếu có bài tập CTE kết hợp sửa dữ liệu.
5. **Tên trùng từ bị chặn:** bộ chặn tìm theo từ, nên một bí danh tên `use` hay `go` cũng bị chặn. Chấp nhận được, nhưng thông báo nên nói rõ.
6. **Số thập phân:** thư viện `mssql` trả `DECIMAL` thành số thực JavaScript. C1a ra đúng vì hai cách tính giống nhau, nhưng hai cách tính khác nhau (ví dụ `* 1.1` và `+ * 0.1`) có thể lệch ở chữ số rất nhỏ. Spec B nên so `DECIMAL` dưới dạng chuỗi hoặc làm tròn trước khi so.
7. **Cột trùng tên:** phải đọc kết quả theo mảng (`arrayRowMode`), nếu không hai cột cùng tên sẽ đè nhau.
8. **Tài khoản:** bản chạy thử dùng tài khoản quản trị trong `.env` (`db_owner`). Spec B phải có tài khoản riêng chỉ đọc và sửa dữ liệu trên các bảng `HRM_Demo`. Quyền của tài khoản mới là rào chắn chính; `ROLLBACK` và bộ chặn là lớp thứ hai và thứ ba.

## Đề xuất cho spec B

- Đặt API ở cùng vùng Azure với database (Azure Functions, Node.js, `mssql`), để mỗi lượt gọi tới database chỉ còn vài mili giây thay vì 0,34 giây.
- Gộp `SET`, câu lệnh, câu kiểm tra và `ROLLBACK` vào một lượt gửi khi được, để bớt số lượt.
- Thời gian chờ: kết nối 90 giây (database đang ngủ), mỗi câu lệnh 10 giây, chờ khóa 3 giây.
- Khi trang làm bài mở ra thì gửi trước một yêu cầu "đánh thức", để lúc học viên bấm Chạy thì database đã thức.
- Bộ chặn: đếm câu lệnh cấp ngoài cùng, cho phép `WITH … INSERT/UPDATE/DELETE`, giữ danh sách lệnh bị chặn hiện tại, và có test cho đúng danh sách đó (ví dụ `SELECT 1 WAITFOR DELAY '00:00:01'`, `SELECT 1 COMMIT`).
- Chấm bài: thêm trường hợp có ô `NULL` và trường hợp khác số cột.
- Chấm bài: đọc kết quả theo mảng, so `DECIMAL` không qua số thực.
- Khôi phục: vì `ROLLBACK` đã được chứng minh, chỉ cần một bước kiểm checksum định kỳ để báo khi lệch, và chạy lại `database/HRM_Demo.sql` bằng tay khi cần.
