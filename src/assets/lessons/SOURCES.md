# Hình và tài liệu nguồn — phần Làm quen

Lượt viết lại 03/11/2026. Không tạo ảnh AI hoặc tự vẽ lại. Giữ nội dung hình gốc, chỉ để Astro tối ưu kích thước/định dạng khi build; các bản gốc mở được từ hình trong bài.

## Hình được dùng

| Bài | Asset | Tác giả và quyền sử dụng | Trang nguồn / file gốc |
|---|---|---|---|
| 1.1 | `../presentations/relational-database-terms.svg` | Booyabazooka; public domain, không điều kiện theo hồ sơ Commons | https://commons.wikimedia.org/wiki/File:Relational_database_terms.svg / https://upload.wikimedia.org/wikipedia/commons/7/7c/Relational_database_terms.svg |
| 1.1 | `../presentations/graph-database-property-graph.png` | Achim Friedland (Ahzf); CC0 1.0, https://creativecommons.org/publicdomain/zero/1.0/ | https://commons.wikimedia.org/wiki/File:GraphDatabase_PropertyGraph.png / https://upload.wikimedia.org/wikipedia/commons/3/3a/GraphDatabase_PropertyGraph.png |
| 1.5 | `1-5-pubs-diagram.png` | Microsoft Corporation; MIT theo LICENSE của MicrosoftDocs/data-tools; bản thông báo quyền và license tại `1-5-pubs-diagram-LICENSE.txt` | https://learn.microsoft.com/en-us/ssms/visual-db-tools/design-database-diagrams-visual-database-tools / https://learn.microsoft.com/en-us/ssms/visual-db-tools/media/design-database-diagrams-visual-database-tools/table-relationships.png |

Hai hình Commons đã tải ngày 02/11/2026 cho slide, dùng lại không chỉnh sửa. Hình PUBS tải ngày 03/11/2026; đối chiếu license https://github.com/MicrosoftDocs/data-tools/blob/main/LICENSE (blob 9e841e7a26e4eb057b24511e7b92d42b257a80e5). Giữ nguyên pixel ảnh, dùng PNG khi build để chữ không bị nén mất chi tiết. Hình COMPANY/Chen ban đầu đã được người dùng yêu cầu thay; không còn nằm trong sản phẩm. Không đổi nội dung slide hoặc xóa ảnh cũ slide đang dùng.

SHA256:

- relational-database-terms.svg: `576314e29cc7565463281c59b3cb596a73ffc201dab2cbfad4c1c409774caf5a`.
- graph-database-property-graph.png: `a7e3445cb70756d849a845c044aea3bff030b748082386331018427cb87a31e8`.
- 1-5-pubs-diagram.png: `0dc913048ecad38787c6fbdd271f06b5870b032e94711cd221d8b63d85b74a07`.

## Khái niệm và thông tin kỹ thuật

- Database, DBMS, bảng/dòng/cột: https://opentextbc.ca/dbdesign01/chapter/chapter-2-fundamental-concepts/ và https://opentextbc.ca/dbdesign01/chapter/chapter-7-the-relational-data-model/.
- Hai nhóm quan hệ/NoSQL và các mô hình con minh họa, ưu điểm/giới hạn theo cách truy cập: https://learn.microsoft.com/en-us/azure/architecture/data-guide/technology-choices/understand-data-store-models. DBMS là tên chung của hệ quản lý, RDBMS dành cho quan hệ; NoSQL không phải nhóm đối lập với DBMS. Các dạng tài liệu/khóa–giá trị/cột rộng/đồ thị chỉ minh họa bên trong NoSQL. Không coi một sản phẩm chỉ có một mô hình.
- SQL Server, Windows/Linux và Azure SQL: https://learn.microsoft.com/en-us/sql/sql-server/what-is-sql-server.
- Edition (SQL Server 2025), Developer chỉ phát triển/kiểm thử, Express có giới hạn: https://learn.microsoft.com/en-us/sql/sql-server/editions-and-components-of-sql-server-2025. Không đưa giới hạn số GB/CPU của một edition thành giới hạn chung.
- SSMS: https://learn.microsoft.com/en-us/ssms/sql-server-management-studio-ssms.
- Các nhóm kiểu: https://learn.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql; chuỗi/đơn vị n: https://learn.microsoft.com/en-us/sql/t-sql/data-types/char-and-varchar-transact-sql và https://learn.microsoft.com/en-us/sql/t-sql/data-types/nchar-and-nvarchar-transact-sql.
- Chuyển kiểu: https://learn.microsoft.com/en-us/sql/t-sql/data-types/data-type-conversion-database-engine. Giá trị kiểu và ngày trong 1.3 là minh họa khái niệm, không phải Result/SQL đã chạy.
- PK/FK: https://learn.microsoft.com/en-us/sql/relational-databases/tables/primary-and-foreign-key-constraints; NULL: https://learn.microsoft.com/en-us/sql/t-sql/language-elements/null-and-unknown-transact-sql; UNIQUE: https://learn.microsoft.com/en-us/sql/relational-databases/tables/unique-constraints-and-check-constraints.
- PUBS: đối chiếu https://github.com/microsoft/sql-server-samples/blob/master/samples/databases/northwind-pubs/instpubs.sql (blob d887fd48cb06436a9aa2e988d00ba7b036dfd6d4). Đọc khai báo, không chạy script: pub_info.pub_id vừa PK/FK; titles.pub_id nhận NULL; sales có PK ba cột (stor_id, ord_num, title_id), hai FK tới stores/titles. Ảnh không ghi NULL, không có self-reference; ví dụ tự tham chiếu chỉ lấy từ schema HRM_Demo đã học ở 1.4. Khái niệm ERD đối chiếu thêm https://opentextbc.ca/dbdesign01/chapter/chapter-8-entity-relationship-model/.
- Database diagram/khóa ngoại trong SSMS và việc lưu diagram ghi database: https://learn.microsoft.com/en-us/ssms/visual-db-tools/design-database-diagrams-visual-database-tools.

Đã đọc/đối chiếu các nguồn ở lượt lập kế hoạch và triển khai ngày 03/11/2026. Schema các cột/khóa HRM_Demo trong 1.3/1.4 đối chiếu trực tiếp `database/HRM_Demo.sql` và hồ sơ công ty; không thêm dữ kiện nhân viên hoặc số đếm mới. Không có câu SQL chạy hoặc kết quả SQL trong năm bài; SQL live chưa kiểm lại, không lấy đối chiếu schema file làm bằng chứng live.
