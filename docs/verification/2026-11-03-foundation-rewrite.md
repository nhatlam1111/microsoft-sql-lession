# Tự kiểm tra bản viết lại Làm quen — 03/11/2026

Đây là ghi nhận của tác giả, không phải review độc lập. Người làm khóa học yêu cầu tự review; không agent khác được gọi, không dùng kết luận Ready để thay bằng chứng. Nội dung chờ người làm khóa học review.

## Phiên bản bàn giao

- Branch local: `codex/remake-lam-quen`; thay đổi chưa commit, không push/deploy.
- Commit nền: `dd8f6ce5fdcd3a5d5a57e2d3bbc31b8399f6b802`.
- Source hiện hành được chụp hash cùng HTML build tại `temp/foundation-rewrite/source-build-manifest.json`. Build: `dist/`; preview đang chạy ở `http://127.0.0.1:4321/microsoft-sql-lession/`.
- Giữ số/slug/URL và storage tiến độ; bộ slide chỉ đổi tham chiếu bài nguồn. File `premium-audit.json` có sẵn ngoài phạm vi, không sửa.
- Phản hồi trong lúc thực hiện: thay hình COMPANY/Chen bằng sơ đồ khối bảng PUBS của Microsoft. Bài 1.5 không còn oval/hình thoi; tự tham chiếu được giải thích rõ bằng `NhanVien.MaQuanLy` đã học ở 1.4, không giả là đường trong ảnh PUBS.

## Kiểm bằng máy

| Kiểm | Kết quả thực tế |
|---|---|
| `npm test` | 67 file, 561/561 test đạt |
| `npm run check` | 280 file, 0 lỗi, 0 warning, 7 hint |
| `npm run build` | 190 trang; tối ưu ảnh thành công |
| `npm run check:dist` | 190 trang, 3.568 link hợp lệ |
| `git diff --check` | Không lỗi khoảng trắng; Git có thông báo LF→CRLF theo cấu hình máy |

7 hint hiện có: `FormEvent` deprecated trong ArcadeHome, ArcadeWorkspace, ExerciseWorkspace (mỗi file hai vị trí); `document.execCommand` deprecated trong SqlEditor (một vị trí). Không sửa các component này.

Đã chạy test hợp đồng mới trước nội dung, ghi nhận 6 lỗi dự kiến ở bài cũ. Sau viết lại đã xử lý độ dài, tham chiếu chuyển chủ đề và các assertion đòi mô phỏng/câu chữ cũ. Lượt cuối toàn bộ suite đạt; không thêm bài vào allowlist khung cũ.

## Nội dung và nguồn

| Bài | Phút | Số từ theo proseParagraphs | Câu tự kiểm tra |
|---|---:|---:|---:|
| 1.1 | 12 | 1000 | 4 |
| 1.2 | 7 | 698 | 4 |
| 1.3 | 7 | 698 | 4 |
| 1.4 | 7 | 699 | 4 |
| 1.5 | 12 | 994 | 5 |

Không đoạn nào vượt 120 từ. Bảng/dòng/cột thuộc 1.1; SQL Server/SQL/T-SQL/SSMS thuộc 1.2; chi tiết NULL thuộc 1.4. PL.1 sửa tiền đề tương ứng; sửa câu dẫn ở 2.9, 3.4, 3.6 để không trỏ tới hình/đường chưa được giảng trong bản mới.

Nguồn khái niệm/hình/quyền sử dụng và SHA256 ở `src/assets/lessons/SOURCES.md`. Ảnh PUBS được đối chiếu với Microsoft Learn; license MIT của MicrosoftDocs/data-tools được lưu nguyên văn cạnh ảnh. Không tự vẽ/AI ảnh, không sửa pixel ảnh gốc; build dùng PNG cho sơ đồ để giữ chữ. Không còn dùng ảnh COMPANY bị người dùng từ chối.

Đọc script PUBS chính thức qua GitHub, không chạy: `pub_info.pub_id` đồng thời PK/FK; `titles.pub_id` cho phép NULL; `sales` có hai FK và khóa chính ba cột `stor_id, ord_num, title_id`. Không đơn giản hóa thành khóa hai cột. FK không bắt phía được tham chiếu luôn có dòng con.

## Browser trên bản build trước vòng 3

Dùng browser của công cụ computer/browser use, không coi đọc HTML là tương tác UI.

- 1366×900: kiểm bảng so sánh 1.1, tải hai hình khi cuộn vào vùng nhìn; ảnh bảng/dòng/cột mở được SVG gốc. Bài 1.5 hiển thị ảnh PUBS mới, natural width 477px, hiển thị khoảng 719px trong bài; không tràn ngang trang.
- 1024×768: mở cả năm bài, bảng vừa cột bài 414px, document width 1014px, không tràn ngang; mở đủ 4/4/4/4/5 câu tự kiểm tra, xác nhận trạng thái open.
- Bài 1.5 mới: mở ảnh PUBS gốc thành công (477×474), xem được tên bảng/cột, đường một–một và một–nhiều. Không dùng ảnh COMPANY cũ làm bằng chứng cho bản mới.
- Từ bài 1.3: bấm cả bốn link PL.1 (số chính xác, số gần đúng, chuỗi, ngày giờ) và PL.2; đúng trang, anchor có thật.
- Điều hướng Bài sau đi đủ 1.1→1.2→1.3→1.4→1.5; sidebar hiển thị tiêu đề mới, URL giữ nguyên.
- Đã trả viewport override về mặc định sau kiểm, để tab bài 1.5 cho người dùng review. Screenshot và DOM quan sát nằm trong lịch sử công cụ của lượt; không có bộ screenshot file riêng.

## Giới hạn ghi nhận riêng

- 390×844: layout desktop hiện có vẫn rộng 816px và hiện “Trang được thiết kế cho máy tính.” Không báo giao diện mobile đạt; không thiết kế lại layout trong lượt nội dung này.
- Không kiểm lại SQL live; không có connector Azure SQL trong lượt. Schema HRM_Demo được đối chiếu với script/hồ sơ công ty, không phải bằng chứng database live. Không có câu SQL chạy hoặc Result trong năm bài, không có số đếm hồ sơ mới.
- Không chạy API bài tập/check:data vì không sửa API, bài tập hay dữ liệu và không thực hiện câu ghi. Không chạy script PUBS hoặc tạo database mới.
- Người dùng chưa thực hiện review nội dung bản cuối; không tự ghi đã được người dùng nghiệm thu.

## Vòng 3 — 1.1 so sánh hai nhóm

Theo yêu cầu tiếp của người dùng, đổi “Năm mô hình phổ biến” thành “Hai nhóm: database quan hệ và NoSQL”. RDBMS được giải thích là DBMS quan hệ; DBMS là tên chung, không đối lập với NoSQL. Bảng có hai cột nhóm theo năm tiêu chí; bốn dạng NoSQL chỉ là ví dụ bên trong nhóm. Mục tiêu, shortTitle, tóm tắt, đoạn chốt, Memo và câu tự kiểm tra đã đồng bộ. Phần bảng/dòng/cột và hai ảnh nguồn giữ nguyên.

Kiểm lại: 561/561 test đạt; Astro check 0 lỗi/0 warning/7 hint có sẵn; build 190 trang; check:dist 3.568 link. Bài 1.1 hiện 1.000 từ theo proseParagraphs, bốn câu tự kiểm tra. Đã đọc HTML build: đúng tiêu đề mới, bảng ba cột gồm Tiêu chí/Database quan hệ/Database NoSQL và sáu hàng tính cả tiêu đề; không còn mục Năm mô hình phổ biến.

**UI vòng 3 chưa xác minh:** công cụ browser báo “browser.user is unavailable” khi dùng viewport, tab đang có và lấy lại tab. Đã đọc hướng dẫn khắc phục và thử API tab được tài liệu cho phép; không lấy screenshot/quan sát vòng trước làm bằng chứng cho bảng hai nhóm mới. Chỉ kết luận kiểm source/HTML/máy đạt; không kết luận tương tác browser bản mới đạt. Không phát sinh thay đổi UI component, ảnh hoặc database. Logs vòng 3 nằm trong temp/foundation-rewrite/round3-*.log; manifest source/build đã cập nhật.
