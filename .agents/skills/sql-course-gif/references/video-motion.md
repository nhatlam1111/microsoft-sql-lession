# Mẫu chuyển động quan sát từ SQL Concepts

Nguồn tham chiếu là video 1080 × 1920, 516 frame ở 30 fps. Tra một keyword và ảnh các mốc tương ứng. Các con số, kích thước poster, badge và caption bên dưới mô tả nguyên bản. Khi dựng cho học viên, dùng bố cục ít chữ và nhịp trong SKILL.md.

## 1. Khung chung, lớp hình, chất liệu

- **Canvas và camera.** 1080 × 1920 px, dọc 9:16. Nền ngoài đen. Poster xanh đêm chiếm khoảng x=47–1025, y=74–1811 (tọa độ tính từ góc trên trái). Giữ rìa đen, tiêu đề, đường chân tiêu đề và lưới đứng yên suốt 17,2 giây. Khi chuyển keyword, đổi viền sáng tại vị trí thẻ mới. Các thẻ khác vẫn nhìn thấy ở trạng thái kết quả, giảm độ sáng. Không phóng camera vào thẻ.
- **Phân cấp chữ.** Trên cùng, hàng chữ trắng rất đậm “10 SQL CONCEPTS”; riêng “CONCEPTS” nằm trên viên chữ nhật tím điện bo góc. Dòng phụ trắng “Every Developer Should Know”, canh giữa; dưới có nét tím mảnh, ngắn. Tiêu đề thẻ dùng sans đậm, số thứ tự màu tím nhạt. SQL, tên cột, số và giá trị dùng monospace. Không xác định được tên font từ video; khi dựng chọn mặt chữ có số 1, chữ I, chữ l phân biệt được.
- **Lưới.** Hai cột × năm hàng. Đọc từ trái sang phải rồi xuống hàng. Hai mép trái thẻ x≈82 và 553; năm mép trên y≈372, 649, 926, 1203, 1480. Mỗi thẻ khoảng 435 × 264 px. Sắp SELECT | WHERE, ORDER BY | GROUP BY, HAVING | INNER JOIN, LEFT JOIN | INSERT, UPDATE | DELETE. Dùng cùng kích thước và đường cơ sở của chữ trên cả mười thẻ.
- **Bên trong thẻ.** Lấy hệ tọa độ cục bộ của thẻ. Góc trên trái đặt số và keyword. Góc trên phải đặt pill trạng thái. Vùng thao tác nằm giữa, bắt đầu khoảng y=63 và kết thúc trước y=192. Bên dưới là dải SQL gần đen, mép trái có vạch hồng, SQL một hoặc hai dòng, pill tên thao tác nằm sát mép trên bên phải của dải. Dưới dải SQL chỉ còn caption một dòng. Bảng dùng hàng thấp xếp sát, đầu cột tím than và viền mảnh; để vùng đích trống từ đầu nhưng đã có header. JOIN cần 3 cụm ngang; DML dành nửa phải cho số dòng bị tác động.
- **Màu và ánh sáng.** Nền ngoài đen; điểm nền poster khoảng `#06091D`; nền thẻ khoảng `#0B0B30`; lõi viền thẻ đang sáng khoảng `#D3C0FF`; phần tô cột quan sát được quanh `#0E4867`. Đây là các màu xấp xỉ trên ảnh H.264 đã giải mã. Dùng trắng lạnh cho chữ chính, tím/lavender cho khung, hồng cho cụm SQL, cyan cho dữ liệu đang tham gia, mint cho kết quả/thêm, tím cho sửa, đỏ san hô cho xóa. Nền bên trong có ô lưới rất mờ. Glow tập trung sát viền và mũi tên, không phủ lên chữ nhỏ.
- **Thứ tự lớp khi ghép.** Poster và 9 thẻ phụ → viền thẻ hiện hành → khung bảng/đầu cột → hàng tĩnh → ô/hàng sáng và đường nối → bản sao hàng đang di chuyển → nhãn trạng thái và dải SQL. Khi một hàng đang bay, giữ mã và giá trị trên cùng một miếng để người xem nhận ra nó ở đích.
- **Ba nhịp nhìn thấy.** QUERY: pill hồng, cụm SQL mục tiêu được phủ/tô hồng nổi bật. EXECUTION: pill xanh lam, phần tô trên SQL rút về viền mảnh; chuyển động xuất hiện đúng trên dữ liệu. RESULT: pill xanh ngọc, hoàn tất chuyển động còn dở rồi giữ kết quả trong những frame cuối. Các đường ngang chuyển bảng có mũi tên cyan và các hình vuông rỗng bo góc nhỏ chạy dọc đường. Dùng chi tiết này ở những cảnh thực sự chuyển giữa hai bảng.

## 2. Timing gốc đã đo trên từng frame

Master 30 fps, f0000–f0515, tổng 516 khung, mỗi khung dài 1/30 giây. Các khoảng trong bảng **bao gồm cả hai đầu**. Chia pha theo chữ hiện thật trong pill. Một hàng có thể đang di chuyển khi pill đã báo RESULT. Các mốc động tác trong phần 3 là tư thế nhìn thấy tại frame đó; xem ảnh các mốc ở cuối từng mục để chọn tư thế chuyển tiếp. Viền sáng có vài frame chuyển giao giữa hai thẻ. f0000 bắt đầu lượt SELECT khi viền DELETE của cuối vòng còn sáng.

| Vị trí | Keyword | QUERY | EXECUTION | RESULT | Bắt đầu (s) |
|---|---|---|---|---|---:|
| H1 trái | SELECT | 0–16 | 17–33 | 34–51 | 0,000 |
| H1 phải | WHERE | 52–68 | 69–85 | 86–102 | 1,733 |
| H2 trái | ORDER BY | 103–119 | 120–137 | 138–154 | 3,433 |
| H2 phải | GROUP BY | 155–171 | 172–188 | 189–205 | 5,167 |
| H3 trái | HAVING | 206–223 | 224–240 | 241–257 | 6,867 |
| H3 phải | INNER JOIN | 258–274 | 275–291 | 292–309 | 8,600 |
| H4 trái | LEFT JOIN | 310–326 | 327–343 | 344–360 | 10,333 |
| H4 phải | INSERT | 361–377 | 378–395 | 396–412 | 12,033 |
| H5 trái | UPDATE | 413–429 | 430–446 | 447–463 | 13,767 |
| H5 phải | DELETE | 464–481 | 482–498 | 499–515 | 15,467 |

**Dữ liệu dùng lại.** Bảng `users(id,name,city)` có thứ tự trên hình là `3 Cara London`, `1 Ava London`, `4 Dev Rome`, `2 Ben Paris`. Bảng `orders(order_id,user_id)` gồm `101 1`, `102 1`, `103 2`. Mỗi thẻ minh họa riêng từ dữ liệu gốc: Eli chỉ xuất hiện ở INSERT, Paris đổi thành Rome chỉ ở UPDATE, Dev mất đi chỉ ở DELETE. Thứ tự hàng trên hình là lựa chọn minh họa; chỉ ORDER BY yêu cầu thứ tự bằng SQL.

## 3. Đạo diễn từng keyword

### 01 · SELECT — Retrieve selected columns

- **Style.** Hồng trên `SELECT name`; một hình chữ nhật cyan cao, hẹp bao trọn header `name` và bốn giá trị. Giảm sáng hai cột `id`, `city`.
- **Bố cục.** Bảng ba cột nằm trái. Bảng một cột `name` bên phải, cùng độ cao header. Dành hành lang giữa hai bảng cho đường chuyển. SQL: `SELECT name FROM users;`
- **Animation.** f0008 bảng đích mới có header. f0019 cột giữa sáng dọc. f0024 mũi tên mọc ngang. f0029 các thanh tên tách khỏi nguồn và trượt lệch nhịp; Cara đi trước, Ben đi cuối. f0034 Cara gần/đến đích, các tên còn lại vẫn trên đường. f0040 Ben còn lệch, f0048 đủ Cara, Ava, Dev, Ben tại đích.
- **Điểm học hỏi.** Hình dạng vùng sáng tự cho biết đây là thao tác trên cột. Giữ vị trí tương đối của bốn tên giúp người xem thấy số dòng được bảo toàn. [9 mốc nhìn](details/01-select.jpg)

### 02 · WHERE — Filter matching rows

- **Style.** Dùng cùng cyan như SELECT nhưng khung quét thấp và rộng bằng **cả dòng**. Hai dòng trượt đi có đủ id, name, city.
- **Bố cục.** Hai bảng ba cột đối diện, header tương ứng. Hồng trên `WHERE city = 'London'` ở dải SQL. SQL: `SELECT * FROM users WHERE city = 'London';`
- **Animation.** f0066 dữ liệu đủ bốn dòng. f0071 khung quét ở dòng đầu; f0076 ở vùng giữa; f0081 tới dòng Ben cuối bảng. Đây là nhịp kiểm, dòng đang quét chưa phải dòng đạt. f0086 hai dòng London cùng sáng, Rome và Paris mờ. f0092 hai thanh `3 Cara London`, `1 Ava London` băng ngang. f0100 cả hai nằm ở đích.
- **Điểm học hỏi.** Tách “đang xét” khỏi “được giữ” bằng hai động tác khác nhau. Việc mang nguyên hàng sang bên phải phân biệt WHERE với SELECT ngay cả khi bỏ caption. [9 mốc nhìn](details/02-where.jpg)

### 03 · ORDER BY — Sort query results

- **Style.** Mũi tên hướng lên cyan lớn, chữ `ASC` hồng phía dưới. Cuối cảnh, viền dọc khóa `name` sáng lên.
- **Bố cục.** Một bảng làm việc bên trái, biểu tượng chiều xếp đứng riêng bên phải. SQL: `SELECT name FROM users ORDER BY name ASC;` Hình giữ cả id và city để theo dấu từng dòng; bảng này minh họa việc xếp trên dữ liệu nguồn.
- **Animation.** f0117 thứ tự Cara, Ava, Dev, Ben. f0122 mũi tên ASC hiện. f0127 các hàng đang vượt qua nhau theo trục dọc, có lúc che nhau. f0132 Ava và Ben đã lên trên. f0137 bốn hàng ở thứ tự Ava, Ben, Cara, Dev. f0143–0151 khóa name được khoanh, id và city vẫn đi cùng tên.
- **Điểm học hỏi.** Giữ một bảng đứng yên và trượt cả dòng theo chiều dọc. Nếu chỉ tráo chữ ở cột name, hình sẽ dạy sai quan hệ giữa các ô. [9 mốc nhìn](details/03-order-by.jpg)

### 04 · GROUP BY — Group rows for aggregation

- **Style.** Mỗi dòng thành phố là một thanh nhỏ; glow cyan phủ lên các thanh sau khi chúng được sắp gần nhau. Số đếm nằm ở một cột riêng bên phải.
- **Bố cục.** Nguồn một cột `city` gồm London, London, Rome, Paris. Đích có `city | COUNT(*)`, đủ chỗ cho ba hàng. SQL: `SELECT city, COUNT(*) FROM users GROUP BY city;`
- **Animation.** f0169 thấy đủ bốn mục. f0174–0179 Rome và Paris đổi vị trí trong bố cục minh họa. f0184 thấy London, London, Paris, Rome được tô; f0189 mũi tên nối hai bảng. f0195 các hàng tổng hợp lần lượt tới đích. f0203 hiện London 2, Paris 1, Rome 1.
- **Điểm học hỏi.** Đặt hai London cùng tầm nhìn với London 2 để thấy **hai dòng góp một nhóm**. Thứ tự Paris/Rome trên hình chỉ phục vụ trình bày. [9 mốc nhìn](details/04-group-by.jpg)

### 05 · HAVING — Filter grouped results

- **Style.** Dùng cặp thành phố–số đếm làm một đơn vị. Hai nhóm bị loại mờ dần; dòng ghi chú nhỏ màu hồng cho biết Paris, Rome có count = 1. London sáng cyan.
- **Bố cục.** Hai bảng cùng header `city | COUNT(*)`. Bảng trái bắt đầu với London 2, Paris 1, Rome 1. SQL: `SELECT city, COUNT(*) FROM users GROUP BY city HAVING COUNT(*) > 1;` Tô vào điều kiện HAVING.
- **Animation.** f0225 còn ba nhóm. f0230 xuất hiện ghi chú loại. f0235 Paris và Rome đang chìm vào nền. f0240 chỉ còn London 2 sáng ở trái. f0246 bản sao London 2 đang qua đường nối. f0254 nhóm này đã nằm bên phải.
- **Điểm học hỏi.** WHERE và HAVING dùng chung động tác lọc. Đổi đầu vào từ hồ sơ thành bảng **đã có số đếm** giúp người xem nhận ra HAVING xét cả nhóm. [9 mốc nhìn](details/05-having.jpg)

### 06 · INNER JOIN — Return matching combinations

- **Style.** Nét cyan mảnh nối các hàng có khóa bằng nhau. Chỉ nguồn khớp sáng, các hàng thiếu cặp mờ; đường nối tồn tại đủ lâu để đếm.
- **Bố cục.** Ba cụm cố định: `users(id,name)` trái, `orders(order_id,user_id)` giữa, `result (3 rows)` phải với `name | order_id`. SQL: `SELECT name, order_id FROM users INNER JOIN orders ON users.id = orders.user_id;`
- **Animation.** f0272 ba bảng, đích trống. f0277 các nét bắt đầu hiện giữa users và orders. f0282 thấy Ava/id 1 tách hai nhánh tới 101, 102; Ben/id 2 nối 103. f0287 Cara và Dev mờ. f0292 chuyển RESULT; f0298 các thanh kết quả còn đang vào vị trí. f0306 đủ Ava 101, Ava 102, Ben 103.
- **Điểm học hỏi.** Phải nhìn ra Ava xuất hiện hai lần từ **hai đường nối**. Phần hình cần giữ khóa ở bảng giữa dù bảng kết quả chỉ lấy tên và mã đơn. [9 mốc nhìn](details/06-inner-join.jpg)

### 07 · LEFT JOIN — Keep all left-table rows

- **Style.** Giữ nét cyan cho cặp khớp; thêm màu hồng trên hàng Cara và Dev cùng chữ `NULL` ở kết quả. Màu hồng nối ý nghĩa giữa hai vị trí dù không có đường khớp.
- **Bố cục.** Dùng nguyên layout ba bảng của INNER JOIN để học viên chỉ việc nhìn phần thay đổi. Dành sẵn năm vị trí ở `result (5 rows)`. SQL: `SELECT name, order_id FROM users LEFT JOIN orders ON users.id = orders.user_id;`
- **Animation.** f0324 ba bảng ở đầu lượt. f0329 nét nối khóa khớp xuất hiện. f0334–0339 Cara và Dev sáng hồng ở bảng trái. f0344 nhãn RESULT đã đổi, vùng đích còn trống. f0350 nhiều thanh đang vào đích lệch nhịp. f0358 thấy Cara NULL, Ava 101, Ava 102, Dev NULL, Ben 103.
- **Điểm học hỏi.** Đặt cạnh INNER JOIN dùng cùng dữ liệu, cùng góc nhìn. Hai dòng hồng tăng số dòng đích từ ba lên năm; không vẽ đường nối giả từ Cara hoặc Dev tới một đơn hàng. [9 mốc nhìn](details/07-left-join.jpg)

### 08 · INSERT — Add new database records

- **Style.** Hàng mới dùng xanh mint, pill kết quả `1 ROW INSERTED` cùng màu. Bốn hàng cũ giữ màu nền ban đầu.
- **Bố cục.** Một bảng `id | name | city` trái, dành chỗ cho hàng thứ năm phía dưới. Nửa phải cho pill. SQL: `INSERT INTO users (id, name, city) VALUES (5, 'Eli', 'Berlin');` Cụm được nhấn là INSERT INTO.
- **Animation.** f0375 có bốn hàng. f0380 bắt đầu chuyển động. f0385 hàng `5 Eli Berlin` đi xuống qua vùng hàng giữa, tạm che hàng cũ. f0390 gần đáy. f0395 hàng mới đã ở dưới Ben. f0401–0409 hàng này và pill mint cùng sáng.
- **Điểm học hỏi.** Kết thúc bằng hai tín hiệu trùng nhau: bảng tăng từ bốn lên năm dòng và pill ghi đúng một dòng thêm. Đây là vị trí minh họa trên hình. [9 mốc nhìn](details/08-insert.jpg)

### 09 · UPDATE — Modify existing records

- **Style.** Khung tím tập trung vào duy nhất ô city của Ben. Dùng tím nhạt cho ghi chú `Paris → Rome` và pill `1 ROW UPDATED`.
- **Bố cục.** Bảng trái với cùng bốn id; phần phải có chỗ cho ghi chú và pill. SQL: `UPDATE users SET city = 'Rome' WHERE id = 2;` Cụm hồng ở dải SQL là `SET city = 'Rome'`.
- **Animation.** f0427 vẫn thấy Paris. f0432 ô Paris có viền tím. f0437 chữ cũ/mới chồng mờ trong cùng ô và mũi tên Paris → Rome hiện bên phải. f0442 giá trị mới Rome đã đọc được ở hàng id 2. f0447 pill báo cập nhật. f0461 vẫn bốn dòng, ô sửa còn viền tím.
- **Điểm học hỏi.** Giữ id và tên đứng yên trong lúc thay chữ ngay trong ô. Chỉ một giá trị chéo mờ giúp mắt phân biệt cập nhật với xóa rồi thêm hàng. [9 mốc nhìn](details/09-update.jpg)

### 10 · DELETE — Remove matching records

- **Style.** Viền và nền đỏ san hô phủ cả hàng Dev. Màu đỏ theo sang pill `1 ROW DELETED`.
- **Bố cục.** Bảng trái bốn hàng; chip kết quả bên phải. SQL: `DELETE FROM users WHERE id = 4;` Cụm DELETE FROM sáng trong dải SQL.
- **Animation.** f0481 là cuối QUERY. f0483, f0488 hàng `4 Dev Rome` sáng đỏ. f0493 chữ yếu đi; f0498 còn khối đỏ nhạt ở vị trí cũ. f0504 hàng Dev biến mất, hàng Ben còn ở dưới khe hở. f0512 Ben đã dồn lên sát Ava, pill hiện đủ. f0514 và f0515 là hai hình RGB giống nhau ở hai thời điểm liên tiếp.
- **Điểm học hỏi.** Cho thấy ba trạng thái theo đúng trật tự: chọn đúng hàng, làm hàng ấy biến mất, rồi khép khoảng trống. Nếu dồn hàng quá sớm, người xem dễ tưởng đã sửa dữ liệu của Ben. [9 mốc nhìn](details/10-delete.jpg)
