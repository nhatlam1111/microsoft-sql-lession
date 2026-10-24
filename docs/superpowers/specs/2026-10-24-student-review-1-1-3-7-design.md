# Cải thiện bài 1.1–3.7 từ kiểm thử học viên

Người làm khóa học duyệt kế hoạch trong chat ngày 24/10/2026. Nguồn nhận xét: `temp/bao-cao-kiem-thu-hoc-vien.md`, theo `temp/review_promt.txt`. Giữ nguyên hai file nguồn. Baseline: main `df7e810`, 277/277 test, 39 file test.

## Mục tiêu và quyết định

- Giúp người biết Excel cơ bản tự theo được mạch học; sửa nhận xét có căn cứ, không viết lại để đạt điểm của reviewer.
- Giữ 51 bài, URL, frontmatter schema, 54 bài tập và đáp án, seed, API và xác thực. Giữ khung gộp Excel/SQL, chữ đậm, inline code và SQL 4 cột.
- Có mã: thực hành trên web từ 1.6. Chưa có mã: theo hướng dẫn SQL Server riêng và script hiện có. Người chỉ dùng web học định hướng/công cụ ở 1.2; người chọn SSMS thực hiện kết nối và đọc PhongBan.
- Dùng placeholder, không đưa hướng dẫn vào SQL mới. Giữ nguyên mọi nháp đã lưu, cả nháp rỗng/comment; không migration hoặc tự xóa khi focus.
- Thay ERD lặp ở 3.4/3.6 bằng bảng cặp cột; giữ ERD đầy đủ ở 1.5, không đổi hình học/component sơ đồ.
- Tự kiểm tra đặt sau Ghi nhớ, trước Bài tập. Phần giảng chính luôn hiển thị. Không thêm glossary, tab hay trang thực hành mới.
- Bàn giao local trên `codex/student-review-1-1-3-7`; không nhập/push main trong phạm vi này.

## Xác minh trước triển khai

Đã đọc toàn bộ báo cáo và prompt, đối chiếu 22 bài với quy ước/template/hồ sơ công ty, các component liên quan, Microsoft Learn và trình duyệt công khai. Bảy SELECT trong phiên lập kế hoạch xác nhận: phiên `us_english`/`mdy`; ngày `01/02/2024` thành `2024-01-02`; số thành `21.3`/`9610001`; chuỗi ngày rỗng thành `1900-01-01`; lỗi cài sẵn `HD2025-003` của `NV029`; số dòng 48/45/55/20/43; 45 hợp đồng ứng viên thuộc 45 mã; cấp dưới của NV004/NV005/NV048 là 6/6/0. Không chạy câu ghi.

Không làm theo việc bỏ SELECT ở 1.2, thêm lại câu COUNT ở 3.7, sửa tổng 20 hoặc nhãn +17 ở 3.1, đổi varchar(n) thành luôn n ký tự, bỏ cảnh báo an toàn hoặc tách thêm bài. Những nội dung này đã đúng hoặc trái lựa chọn được duyệt. Nhận xét không chạy được không đồng nghĩa SQL hay Result sai.

Nguồn kỹ thuật: [DATEFORMAT](https://learn.microsoft.com/en-us/sql/t-sql/statements/set-dateformat-transact-sql?view=sql-server-ver17), [varchar](https://learn.microsoft.com/en-us/sql/t-sql/data-types/char-and-varchar-transact-sql?view=sql-server-ver17), [decimal](https://learn.microsoft.com/en-us/sql/t-sql/data-types/decimal-and-numeric-transact-sql?view=sql-server-ver17), [SSMS](https://learn.microsoft.com/en-us/ssms/quickstarts/ssms-connect), [Azure SQL](https://learn.microsoft.com/en-us/azure/azure-sql/glossary-terms?view=azuresql).

## Phân bổ thay đổi

- 1.1–1.6: giải nghĩa câu ghi; hai đường thực hành; điều kiện chuyển kiểu; đọc lỗi xóa an toàn; VLOOKUP và bảng đường liên kết; cách đọc thẻ/drawer và editor mới. 1.3 không thêm preview SQL, bỏ ví dụ 1900 khỏi bài đầu nhưng giữ giới hạn NOT NULL và các phép chuyển đúng.
- 2.1 giữ nội dung. 2.2–2.6 rút ngoài mục tiêu, giải nghĩa UNKNOWN/tập kết quả, làm rõ 0 dòng và DISTINCT/ORDER BY. 2.3 thêm ba tự kiểm tra.
- 2.7 giữ tám hàm và COLLATE phục vụ bài tập, cắt sâu về bảng mã và tìm ký tự đặc biệt; dùng ký hiệu khoảng trắng trong chú giải, không sửa Result; ba tự kiểm tra.
- 2.8 lấy mốc cố định/DATEADD/DATEDIFF làm trục, bảng MONTH/EOMONTH ngắn, giải thích lỗi cài sẵn và UTC bằng ví dụ; ba tự kiểm tra. 2.9 định nghĩa bản chốt và rút IF điều khiển lệnh.
- 3.1 phân biệt preview/drawer. 3.2 thêm COUNT cùng phạm vi đang làm. 3.3 giữ giảng chính. 3.4 bảng cặp ON, 3.5 rút giả định Excel, 3.6 đi từ độ chi tiết tới lặp/kiểm/kết/đối chiếu, bỏ số 45 khỏi lời dẫn trước flow; 3.7 giữ SQL/kết quả. Di chuyển tự kiểm tra 2.7/3.1–3.7.

## Kiểm và review

Giữ kiểm ý nghĩa/số liệu/an toàn khi bỏ assertion khóa câu chữ. Kiểm editor thật, localStorage không khả dụng, nháp rỗng/nhiều dòng/comment, placeholder và hướng dẫn hai lối. Chạy npm test/check/build/check:dist; API build/typecheck/check:exercises rồi check:data; SELECT đối chiếu các minh họa. Browser 1280/1440, drawer/selfcheck/bàn phím, khoảng trắng, copy/paste, Tab/undo/F5, mã truy cập. Không suy kiểm HTML thành đã chạy SSMS.

Mỗi bài có sửa: agent mới fork không ngữ cảnh tác giả, kế thừa model Codex, theo vai trò ở mục 4.5 quy ước. Đọc hết review, xác minh rồi xử lý cả nhận xét nhỏ có căn cứ; ghi Đã sửa/Không làm theo. Cuối cùng review tích hợp mạch học. Hồ sơ tại `docs/reviews/2026-10-24-student-review/`; evidence local tại `temp/verification/2026-10-24-student-review/`.

## Nhật ký

- Khởi tạo: thực hiện trong checkout sạch trên nhánh riêng đã được người dùng chọn; không cần tạo thêm worktree hoặc cài lại dependency. Công cụ bash không có trên PATH; theo dõi task bằng plan/progress và lệnh PowerShell tương đương.
- Review áp dụng quy ước/user: mỗi bài một reviewer mới, giữ model; yêu cầu này thay mặc định một reviewer cuối của skill executing-plans.
- Audit UI baseline: strict exit 1, thiếu noValidate tại form mã truy cập; scanner không nhận resize:none đã có trong CSS editor. Sửa noValidate trong phạm vi; ghi đúng cảnh báo CSS và xác minh bằng trình duyệt.
- Đã sửa nội dung/editor/quy ước theo ba lượt và đủ 21 review độc lập. Những chỉnh thêm có căn cứ: workbook/sheet, phiên SQL, VLOOKUP minh họa, nháy SQL trong summary, UPPER(NULL), DATE Excel, alias cột, Count của PivotTable, vị trí JOIN và câu về số ứng viên. Bảng Đã sửa/Không làm theo chi tiết tại README hồ sơ; giữ định dạng answer YAML ngoài phạm vi theo quyết định người dùng.
- Xác minh cuối tác giả25/10: 295/295 test; build108 trang/check:dist1742 link; check không errors/warnings,3 hints deprecated đã có. API build/typecheck,54 đáp án luôn hoàn tác, check:data trước và sau UI đạt. SQL79 SELECT/36Result/68bước đã đối chiếu; chưa kiểm SSMS native hoặc thời gian học thật. Browser22trang ở1280/1440, editor và storageblocked có evidence riêng. Chờ review tích hợp trước khi đóng lượt.
- Ruling: bàn giao giữ nhánh local như người dùng đã chọn, thay menu hỏi lại của finishing-a-development-branch; không merge/push. Chi phí: người dùng cần quyết định đưa lên main ở lượt tiếp theo.
