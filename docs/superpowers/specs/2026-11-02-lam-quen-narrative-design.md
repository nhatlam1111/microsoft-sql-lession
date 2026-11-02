# Thiết kế mạch bài giảng Làm quen SQL Server

Trạng thái: người làm khóa học đã duyệt kịch bản và yêu cầu triển khai ngày 02/11/2026. Quy ước tại `docs/quy-uoc.md` và `docs/presentation-template.md` là chuẩn hiện hành.

## Mục tiêu và quyết định đã duyệt

Người học chỉ biết Excel văn phòng cơ bản, chưa biết SQL. Sau buổi giảng, người học phân biệt database với phần mềm quản lý, nhận ra mô hình quan hệ đang học, chỉ được bảng/dòng/cột/PK/FK và lần được đường lấy thông tin trên ERD. Chỉ sửa bộ `lam-quen`, không chuyển các bài đọc hoặc dữ liệu mẫu.

Người dùng chọn ERD của database, không mở rộng sang hệ thống ERP; so sánh hai nhóm quan hệ và NoSQL, không khảo sát sâu năm mô hình; giữ 55 phút gồm 48 phút giảng và 7 phút hỏi đáp. Mạch đã chọn: tổng quan → phóng vào bảng → quay lại đọc sơ đồ. Cách giảng từng khái niệm rồi ráp ERD ở cuối được cân nhắc nhưng không chọn vì người học thấy bức tranh chung muộn.

## Kịch bản 21 slide

| ID | Phút | Nội dung chính |
|---|---:|---|
| database-la-gi | 2 | Định nghĩa database chung; hình các bảng chỉ là ví dụ quan hệ. |
| cac-mo-hinh-luu-tru | 2 | Ảnh internet đối chiếu bảng với đồ thị; đồ thị chỉ là một dạng NoSQL. |
| so-sanh-cac-dang-database | 3 | Bảng hai nhóm, bốn tiêu chí: tổ chức, nhu cầu, phần mềm tiêu biểu, phần khóa học học. |
| tu-excel-den-database-quan-he | 3 | Workbook/sheet giúp hình dung database/bảng; Excel là phần mềm bảng tính, không đồng nhất với hệ quản lý database quan hệ. |
| sql-server-la-gi | 2 | SQL Server là phần mềm Microsoft quản lý database; tách phần mềm với máy chủ. |
| sql-la-gi | 2 | SQL là ngôn ngữ; giữ câu SELECT HoTen hiện có để minh họa, không dạy cú pháp. |
| bon-ten-can-phan-biet | 2 | SSMS gửi SQL tới SQL Server, xử lý trên database; dẫn vào database quan hệ HRM_Demo. |
| du-lieu-trong-database | 2 | Ba bảng PhongBan, NhanVien, HopDong cùng các dòng trích, không giả là toàn bộ database. |
| so-do-quan-he-erd | 2 | Bản đồ cấu trúc ba bảng, chưa hiện ký hiệu khóa/một–nhiều; không phải dữ liệu hồ sơ. |
| bang-trong-database | 2 | Phóng vào NhanVien; tên cột thuộc thiết kế, không phải dòng dữ liệu. |
| bang-dong-cot | 2 | Đánh dấu cả dòng NV001 và cột HoTen; mỗi dòng có nghĩa theo bảng. |
| thong-tin-o-nhieu-bang | 2 | Một hồ sơ NV021 có ba hợp đồng; tách bảng để giảm lặp thông tin. |
| nhan-dien-mot-ho-so | 1 | Cần mã chỉ đúng một hồ sơ; đặt tên mã chưa tự tạo luật duy nhất. |
| khoa-chinh | 3 | Khi khai báo PK: không trùng, không NULL; không tự phát hiện trùng người. |
| bang-khong-co-khoa-chinh | 2 | Giả định không PK/không luật khác chặn; bảng vẫn lưu/đọc, mã trùng có thể lọt. |
| ma-phong-trong-ho-so | 2 | NV001 → KT → Kế toán; đặt nhu cầu kiểm mã tham chiếu có thật. |
| khoa-ngoai | 3 | FK đang bật kiểm mã khác NULL khi ghi; cột quyết định NULL; mẫu MaPB không nhận NULL; gán nhầm mã có thật vẫn qua. |
| bang-khong-co-khoa-ngoai | 2 | Giả định thiếu FK/luật khác; có thể lọt mã không thật nhưng vẫn kết bảng được. |
| ky-hieu-erd | 3 | Trở lại cùng bản đồ với PK/FK, một–nhiều; đọc hai phía và giới hạn bắt buộc theo thiết kế. |
| ten-phong-cua-nv001 | 3 | Cần tên phòng → mỗi dòng một hồ sơ → NhanVien → cặp MaPB → TenPB hiện lưu. |
| hop-dong-kem-ten-phong | 3 | Mỗi dòng một hợp đồng → HopDong.MaNV/NhanVien.MaNV → cặp MaPB → tên phòng hiện lưu; đi tới phía nhiều có thể tăng dòng. |

Giữ cả 18 ID cũ và thêm đúng ba ID ở đầu mạch. Metadata tổng 55 phút, tổng slide 48 phút. Không thêm quiz hoặc thực hành cú pháp. Mọi slide có hình mang ý nghĩa, 2–3 câu cốt lõi luôn hiện, ghi chú Ý cần nói/Hay hiểu nhầm/Giải thích với source và phút khớp slide. Bài nguồn vẫn là 1.1, 1.2, 1.4, 1.5; phần phân loại mới có nguồn ngoài bổ sung.

## Hình, bảng và component

- Giữ font, màu, khung 1280×720 của DESIGN.md; không thu nhỏ chữ để nhét nội dung. Bảng so sánh có slide riêng; bảng dùng HTML ngữ nghĩa.
- Ảnh bảng: https://commons.wikimedia.org/wiki/File:Relational_database_terms.svg — Booyabazooka, public domain. Ảnh đồ thị: https://commons.wikimedia.org/wiki/File:GraphDatabase_PropertyGraph.png — Achim Friedland (Ahzf), CC0. Giữ ảnh gốc, thêm alt/chú thích tiếng Việt bằng HTML, ghi nguồn/tác giả/giấy phép ngay cạnh hình và đầy đủ trong ghi chú. Tải vào asset nội bộ khi triển khai.
- Bảng dữ liệu, PK/FK và ERD lấy từ schema/dữ liệu HRM_Demo; ảnh internet chỉ minh họa phân loại, không thay schema nhân sự. Đồ thị NoSQL và ERD là hai cách biểu diễn khác mục đích.
- `ProjectionRelation.variant?: 'overview' | 'detail'`, mặc định `detail`. `overview` ẩn nhãn PK/FK, ký hiệu một–nhiều và caption cặp khóa; đường liên hệ trung tính. Cả hai vẫn kiểm bảng, cột, FK theo schema. `detail` giữ hành vi cũ.
- Bố trí tương đối cố định PhongBan — NhanVien — HopDong. Cách đọc đi theo câu hỏi và cặp cột, không theo trái–phải hoặc chiều thực thi.

## Kiểm và nguồn

Chạy npm test/check/build/check:dist và kiểm bản build bằng browser; review độc lập toàn bộ nội dung, review tích hợp vì đổi component dùng chung. Ghi source/build chính xác, báo giới hạn SQL/UI riêng và xử lý mọi nhận xét theo mục 4.6. Database chung chỉ đọc; push/deploy cần đồng ý riêng.

Nguồn phân loại: https://learn.microsoft.com/en-us/azure/architecture/data-guide/technology-choices/understand-data-store-models. Không khẳng định NoSQL không có schema, không có quan hệ, không dùng SQL hay luôn nhanh hơn. Excel cũng có làm việc chung và kiểm nhập khi được cấu hình.

## Nhật ký thực hiện

- 02/11/2026: thiết kế được duyệt; builder check bằng agent mới kế thừa model phiên kết luận không còn câu hỏi quan trọng. Chưa coi đó là review sản phẩm.

- Vòng 1: đã triển khai kịch bản, ảnh và biến thể ERD; tự rà ở 1280x720 dẫn tới rút phần lặp trên slide dữ liệu, giữ đủ điều kiện FK và rút ví dụ tìm phòng theo đúng đường đọc đã duyệt. Không đổi mục tiêu, ID hoặc phút.

- Vòng 2 sau review: làm theo F1–F4 và INT-01. Điều kiện HopDong.MaNV không NULL/FK bật lên phần chiếu; dạng NoSQL được giải nghĩa ngay trong hàng so sánh, slide hình chỉ giới thiệu đồ thị; chưa gọi ERD trước định nghĩa; alt gọi đúng toàn bảng. Giữ nguyên 21 ID/phút. Chỉnh khoảng cách cuối khối ERD và bảng so sánh để không sinh cuộn nội bộ. Report/manifest của bản được review giữ nguyên; bản cuối có manifest riêng.

- Hoàn tất local 02/11/2026: 416/416 test; Astro check 0 lỗi, 3 hints ngoài phạm vi; build 139 trang; check:dist 2801 link. Cả 21 slide ở 1280x720 và 1920x1080 không tràn/cuộn nội bộ, footer cách ít nhất 13/23px; người giảng 1024x768, bàn phím, fullscreen và scripts-blocked đã kiểm. Hai review và mọi quyết định tại docs/reviews/2026-11-02-lam-quen-narrative/. SQL live chưa kiểm lại; không push/deploy.
