# Cập nhật slide tổng hợp Làm quen

Được người làm khóa học duyệt trong chat ngày 04/11/2026. Quy ước hiện hành thắng hồ sơ lịch sử.

## Mục tiêu và cách tiếp cận

Đồng bộ bộ slide trên website với năm bài 1.1–1.5 mới, cho người biết Excel cơ bản. Người dùng chọn một giờ và tổ chức theo thứ tự năm bài. Hai cách đã cân nhắc: giữ mạch tổng quan → bảng → khóa → ERD, ít xáo trộn nhưng phân tán kiến thức; hoặc theo năm bài mới, dễ đối chiếu bài đọc. Người dùng chọn cách sau.

Thiết kế đã duyệt: 25 slide, 50 phút giảng và 10 phút hỏi đáp. Giữ phong cách, slug, URL và hai chế độ chiếu/người giảng. Không có trang bìa riêng, bài tập hay hướng dẫn chạy SQL. Không sửa năm bài nguồn, seed, API hoặc dữ liệu chung; không push/deploy.

## Kịch bản

| Bài | Các slide liên tiếp | Phút |
|---|---|---|
| 1.1 | Database/DBMS/RDBMS; quan hệ/NoSQL; workbook/sheet; bảng/dòng/cột; dữ liệu chung/tách bảng | 2–2–2–2–2 |
| 1.2 | SQL Server; SQL/T-SQL/SSMS; ưu điểm/điều kiện; edition/Azure SQL Database | 2–2–2–2 |
| 1.3 | Kiểu cột/int/bit; decimal/float; varchar/nvarchar; ngày/giờ; chuyển kiểu/phụ lục | 2–2–2–2–2 |
| 1.4 | Ràng buộc; NULL/NOT NULL; PK; khóa ghép/UNIQUE; FK | 1–2–2–2–2 |
| 1.5 | Sơ đồ/ký hiệu; 1:1; 1:N/N:1; M:N; bắt buộc/tùy chọn; lần đường/tự tham chiếu | 2–2–2–2–2–3 |

Mỗi slide có hình/bảng có nghĩa và 2–3 câu giải thích cốt lõi luôn hiện. Điều kiện ảnh hưởng kết luận phải hiện trước lớp. Ghi chú có Ý cần nói, Hay hiểu nhầm, Giải thích, thời lượng và nguồn bài khớp slide.

## Hình và tính chính xác

Dùng hình gốc đang có của các bài mới, giữ credit/license. PUBS xuyên suốt phần ERD; phóng vùng bằng CSS, giữ pixel gốc và liên kết mở toàn ảnh. Ví dụ tự tham chiếu NhanVien.MaQuanLy thuộc HRM_Demo, không nằm trong PUBS. Không tạo ảnh AI, không vẽ lại sơ đồ.

Giữ điều kiện luật khai báo/đang bật, NOT NULL chỉ chặn NULL, FK kiểm mã tồn tại chứ không xác minh nghiệp vụ; lưu được sau chuyển kiểu chưa chắc đúng ý. PUBS: pub_info.pub_id vừa PK/FK, titles.pub_id nhận NULL; sales có PK (stor_id, ord_num, title_id). Phân biệt tối đa một/đúng một; không suy bắt buộc từ đầu một/nhiều.

## Liên kết và kiểm

Giữ ID còn đúng chủ đề. ID bị gộp thành anchor alias bên trong slide đích. SlideSpec có aliases tùy chọn; URL query/hash được chuẩn hóa sang ID chính, fallback ID lạ giữ như cũ. Hai ví dụ tra phòng/hợp đồng cũ tới slide cuối. Không thay protocol đồng bộ hay tiến độ học.

Kiểm 25 slide/5 nguồn/50+10 phút, 21 ID cũ, nội dung và notes; test/check/build/check:dist; UI canvas 1280×720, hai chế độ, bàn phím, sync, no-JS. Review cả bộ và review tích hợp bằng gpt-6.1-terra/high, fork_turns none. Ghi bằng chứng riêng và xử lý mọi nhận xét theo mục 4.6.

## Nhật ký

- Khởi tạo: checkout sạch trên main; tạo nhánh codex/update-lam-quen-slides tại checkout được chỉ định. Không tạo worktree khác vì chỉ có một thay đổi nội dung giới hạn và người dùng yêu cầu tiếp tục ở repo này. Không commit/push/deploy khi chưa bàn giao.
- Bàn giao 04/11/2026: người làm khóa học yêu cầu hoàn thiện, commit và tạo PR; push chỉ nhánh `codex/update-lam-quen-slides`, không push `main`, không deploy. Review xử lý theo mục 4.6, ma trận ở `docs/reviews/2026-11-04-lam-quen-slides-sonnet-high/`.
- Quyết định triển khai: anchor alias nằm trong MDX; controller lấy danh sách alias từ DOM, chỉ mở rộng SlideSpec nội bộ, không đổi schema metadata/route/protocol. Crop PUBS là khung nhìn CSS, không tạo asset mới.
