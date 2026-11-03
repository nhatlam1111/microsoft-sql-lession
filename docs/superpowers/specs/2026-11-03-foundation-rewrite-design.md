# Làm lại phần 1 — Làm quen

Được người làm khóa học duyệt và yêu cầu triển khai ngày 03/11/2026. Quy ước hiện hành thắng hồ sơ lịch sử; các ngoại lệ dưới đây được cập nhật vào quy ước cùng thay đổi.

## Mục tiêu và quyết định đã duyệt

Viết mới bài 1.1–1.5 cho người chỉ biết Excel cơ bản. Không tình huống, không thực hành SQL. Giữ số bài, slug, URL và tiến độ; không sửa database, seed hoặc API. Bộ slide chỉ sửa tham chiếu nguồn bài. Người làm khóa học tự review; không giao agent review hoặc builder check, không push/deploy.

- 1.1 (sửa theo yêu cầu tiếp): database/DBMS/RDBMS; so sánh hai nhóm database quan hệ và NoSQL. Tài liệu, khóa–giá trị, cột rộng, đồ thị chỉ là ví dụ trong NoSQL. Không gọi DBMS là nhóm đối lập NoSQL. Giữ bảng/dòng/cột ở phần đi sâu vào quan hệ.
- 1.2: Microsoft SQL Server, SQL/T-SQL/SSMS, ưu điểm và giới hạn, edition và Azure SQL Database của khóa học.
- 1.3: int, bit, decimal, varchar, nvarchar, date, time, datetime2; nhận diện float và chuyển kiểu ngầm. Dẫn PL.1 theo nhóm kiểu và PL.2 về chuyển kiểu. NULL chỉ được nhắc để dẫn sang 1.4.
- 1.4: ràng buộc khai báo, NULL/NOT NULL, PK/FK, tính duy nhất và khóa ghép; giữ điều kiện và giới hạn nghiệp vụ, dẫn bài 5.2.
- 1.5 (sửa theo yêu cầu mới): sơ đồ dạng khối bảng có tên/cột/khóa giống hệ thống khóa học. Dùng ảnh PUBS chính thức của Microsoft: publishers–pub_info 1:1, publishers–titles 1:N/N:1, stores–sales–titles M:N; bắt buộc/tùy chọn đối chiếu script. Tự tham chiếu lấy NhanVien.MaQuanLy đã học, nói rõ không thuộc ảnh PUBS. Một ảnh chính xuyên suốt, không tự vẽ hoặc giả đường còn thiếu.

Hai cách độ sâu đã cân nhắc: giữ mọi bài 7 phút hoặc nới hai bài rộng hơn. Người dùng chọn 1.1/1.5 khoảng 12 phút, hướng tới 800–1.000 từ; 1.2–1.4 khoảng 7 phút, 500–700 từ (đếm proseParagraphs). Trần máy tương ứng 1.100 và 800. Hai cách ví dụ ERD: nhiều ví dụ nhỏ hoặc một sơ đồ chung; người dùng chọn một sơ đồ xuyên suốt.

## Nguồn và hình

Khái niệm được diễn giải bằng tiếng Việt từ Microsoft Learn/Azure Architecture Center và Database Design – 2nd Edition (BCcampus). Hình quan hệ và đồ thị có sẵn trong assets/presentations có hồ sơ public domain/CC0.

Theo phản hồi trực tiếp của người dùng, bỏ ERD Chen/oval/hình thoi COMPANY; dùng ảnh dạng bảng từ https://learn.microsoft.com/en-us/ssms/visual-db-tools/design-database-diagrams-visual-database-tools. Giữ nguyên ảnh PUBS từ MicrosoftDocs/data-tools; kho có LICENSE MIT, lưu bản license cạnh asset. Đối chiếu PK/FK/NULL và khóa ba cột của sales bằng script instpubs.sql chính thức trong microsoft/sql-server-samples; không chạy script.

Không vẽ lại hoặc dùng ảnh AI. Chú thích/alt và credit cạnh hình; ví dụ PUBS không phải HRM_Demo. Không suy ra NULL từ ký hiệu một/nhiều, không giả ảnh PUBS có tự tham chiếu.

## Kiểm và giới hạn

Tự rà từng bài theo quy ước; chạy npm test, npm run check, npm run build, npm run check:dist; kiểm năm bài trên build ở màn hình rộng/hẹp và mở câu tự kiểm tra/hình gốc. Ghi riêng nguồn, SQL live, HTML, browser và lỗi nền. Không đổi allowlist khung cũ. Mốc nền lập kế hoạch: 561 test đạt; Astro check 0 lỗi/0 warning/7 hint.

## Nhật ký thực hiện

- Khởi tạo: triển khai trực tiếp trong checkout hiện tại, branch codex/remake-lam-quen; giữ file premium-audit.json ngoài phạm vi. Không tạo worktree mới vì đang dùng checkout người dùng chỉ định. Hồ sơ này và plan là ledger của lượt.

- Vòng 2 theo phản hồi người dùng: thay COMPANY/Chen bằng sơ đồ khối bảng PUBS của Microsoft; sửa lời giảng, tự kiểm tra, test, nguồn/quyền sử dụng. Tự tham chiếu vẫn được dạy bằng cột HRM_Demo đã học ở 1.4, phân biệt với hình PUBS. Ảnh COMPANY không còn dùng được bỏ khỏi lượt thay đổi.

- Hoàn tất local: 561/561 test; Astro check 0 lỗi/0 warning/7 hint có sẵn; build 190 trang, check:dist 3.568 link. Số từ 1.1–1.5: 999/698/698/699/994. Đã kiểm browser rộng/hẹp desktop, 21 câu tự kiểm tra và liên kết phụ lục/ảnh. Giới hạn 390px và SQL live được ghi riêng tại docs/verification/2026-11-03-foundation-rewrite.md; không coi đó là review độc lập hoặc nghiệm thu của người dùng. Không commit/push/deploy.

- Vòng 3 theo phản hồi người dùng: đổi phần “Năm mô hình phổ biến” của 1.1 thành “Hai nhóm: database quan hệ và NoSQL”; cập nhật mục tiêu, tóm tắt, Ghi nhớ và tự kiểm tra cùng nội dung. Làm rõ RDBMS là DBMS quan hệ, DBMS là tên chung gồm cả hệ NoSQL. Giữ các dạng NoSQL ở mức ví dụ ngắn; không thay bài khác hoặc ảnh.

- Kết quả vòng 3: 1.1 có 1.000 từ, bảng so sánh hai nhóm và bốn câu ôn; 561 test/check/build/check:dist đạt như vòng trước (190 trang/3.568 link, 7 hint cũ). Kiểm HTML build đạt; browser không khả dụng nên UI bản hai nhóm chưa được kiểm lại. Ghi riêng giới hạn trong hồ sơ verification, cập nhật manifest, không agent review/push/deploy.
