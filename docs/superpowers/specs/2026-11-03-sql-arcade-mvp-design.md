# Thiết kế SQL Arcade: MVP cấp Cơ bản

- Ngày: 2026-11-03
- Trạng thái: đã duyệt ngày 2026-11-03.
- Nối tiếp: [bộ nghiên cứu CodeFights Arcade](../../research/codefights-arcade/00-executive-summary.md). Nghiên cứu mô tả Arcade gốc và một đề xuất cho nhiều người; chỗ nào spec này khác đề xuất đó thì theo spec này (mục 4).
- Cách gọi: **người làm khóa học** là chủ repo và cũng là giảng viên; **người dựng** là người viết code và nội dung theo spec này.

## 1. Mục đích

Thêm một chế độ luyện SQL kiểu CodeFights Arcade, tách khỏi bài học. Học viên làm từng bài ngắn nối tiếp nhau, thấy unit test, bị hidden test bắt lỗi, kiếm coin rồi dùng coin mở hidden test khi kẹt.

Lý do: bài tập hiện tại chấm trên đúng một bộ dữ liệu `HRM_Demo` công khai, nên câu viết đúng trên dữ liệu đó chưa chắc đúng về logic. Arcade buộc học viên viết câu đúng trên dữ liệu chưa từng thấy, và tạo nhịp thử, sửa, nộp.

Hiện chỉ có **một học viên**, nên thiết kế ưu tiên đơn giản, không chống gian lận và không lo tải.

## 2. Đã chốt với người làm khóa học

1. Hai cấp độ, mỗi cấp khoảng 50 bài: **Cơ bản** và **Nâng cao** (gộp Trung cấp, Phân tích, Nâng cao). MVP chỉ làm **Cơ bản**.
2. Học viên dùng mã truy cập (`ACCESS_CODES`) để làm bài và lưu kết quả.
3. Có câu hỏi, giải bài, unit test, hidden test, coin thưởng và dùng coin mở hidden test.
4. Không có bình luận, cộng đồng.
5. Chỉ có một học viên, không cần hàng đợi hay giới hạn tải.
6. Bài mở tuần tự. **Chấp nhận ngõ cụt:** kẹt mà hết coin thì hỏi giảng viên.
7. Chọn cách A ở mục 5: database Arcade riêng.
8. Các bài không cần chung một chủ đề; chủ đề gần nhau là được.

## 3. Mục tiêu và giới hạn

**Mục tiêu MVP**

- 50 bài Cơ bản, 9 chương theo bài 2.1–2.9.
- Tiến độ, coin và test đã mở lưu trên server theo mã, mở trên máy khác vẫn còn.
- Mỗi bài có lời giải mẫu đã qua toàn bộ test trên database thật.

**Không làm trong MVP**

- Cấp Nâng cao và câu `INSERT`, `UPDATE`, `DELETE` (thiết kế chỉ không chặn đường, xem mục 11).
- XP, level, bảng xếp hạng, nhiệm vụ ngày, tự thêm test, gợi ý, xem đáp án, bỏ qua bài.
- Giao diện quản trị. Giảng viên đọc lịch sử nộp hoặc tặng coin bằng SQL trực tiếp.
- Phiên bản đề. Sửa đề sau khi học viên đã xong thì bài vẫn tính là xong.

**Không được xảy ra**

- Đổi dữ liệu `HRM_Demo` hoặc đổi hành vi bài tập hiện có, API `ping`/`run`/`grade`, nháp và tiến độ bài học.
- Thiếu cấu hình Arcade làm hỏng API bài tập đang chạy.
- Dữ liệu hidden test hoặc đáp án lọt vào `dist/`.
- Lỗi hạ tầng bị tính thành học viên làm sai.
- Trừ coin mà test không mở được, hoặc thưởng coin hai lần cho một bài.

## 4. Khác với đề xuất trong nghiên cứu

| Nghiên cứu | Spec này | Vì sao |
|---|---|---|
| 10 bài, 3 world | 50 bài, 9 chương | Theo yêu cầu |
| Tiến độ ở trình duyệt | Lưu trên server theo mã | Coin cần chỗ lưu đáng tin và dùng được trên nhiều máy |
| Hoãn Coin | Có Coin và mở hidden test ngay | Theo yêu cầu |
| Mã truy cập không phải danh tính | Mỗi mã là một hồ sơ học viên | Một học viên; không cần thêm tài khoản |
| Job, hàng đợi, slot, token, idempotency | API chạy thẳng, trả kết quả ngay | Một học viên |
| Hidden test chỉ trả tổng số đạt | Trả đạt/chưa đạt từng test, không kèm dữ liệu | Phải biết test nào sai thì mới mở đúng test |
| Giữ lại test không bao giờ mở được | Mở được mọi hidden test | Mục tiêu là học, không phải chống gian lận |
| Hidden test nằm ngoài repo public | Nằm trong repo, chỉ đóng gói vào API | Giống đáp án bài tập hiện nay, đã chấp nhận ở README; đổi lại khi mở cho nhiều người |

## 5. Các cách đã cân nhắc

**A. Database Arcade riêng (đã chọn).** Tạo database miễn phí thứ hai. Mỗi test mở transaction, tạo bảng, chèn dữ liệu, chạy câu của học viên rồi `ROLLBACK`. Coin và tiến độ lưu ngay trong database này. Đổi lại phải thêm một database, hai user SQL và biến môi trường; database này cũng ngủ khi rảnh.

**B. Không tạo database.** API bọc câu học viên bằng `WITH NhanVien AS (… VALUES …)` để che bảng thật, coin lưu Azure Table Storage. Bị loại vì `dbo.NhanVien` sẽ đọc nhầm bảng thật, số dòng trong lỗi bị lệch, phải ghép với `WITH` của học viên, và không chạy được `UPDATE` ở cấp Nâng cao.

**C. Thêm schema vào database hiện tại.** Bị loại vì dùng chung quota miễn phí với bài học và dễ đụng dữ liệu không được đổi.

## 6. Luật chơi

Các con số trong mục này là đề xuất của người dựng; người làm khóa học không phản đối khi được trình bày. Chúng nằm trong một file cấu hình để dễ chỉnh.

| Luật | Giá trị |
|---|---|
| Mỗi bài có | ít nhất 2 unit test và 3 hidden test |
| Coin khởi đầu | 20, cấp khi hồ sơ được tạo |
| Thưởng lần đầu xong bài | Dễ 10, Vừa 20, Khó 30 |
| Mở một hidden test | 10 coin, mở vĩnh viễn |
| Thứ tự mở bài | Tuần tự 1 → 50; xong bài trước mới mở bài sau |

- **Chạy thử (F5):** chạy unit test và các hidden test đã mở. Không giới hạn số lần, không ảnh hưởng tiến độ.
- **Nộp bài:** chạy mọi test, không cần chạy thử trước. Test công khai hiện chi tiết; hidden test chưa mở chỉ hiện đạt hoặc chưa đạt.
- **Xong bài:** đạt toàn bộ test. Không có điểm một phần.
- **Nộp lại bài đã xong:** không thưởng thêm; nộp sai cũng không mất trạng thái đã xong.
- **Mở hidden test:** làm được bất cứ lúc nào trong bài đã mở khóa, có hộp xác nhận ghi giá và số dư. Mở rồi thấy dữ liệu vào và kết quả mong đợi. Không giảm thưởng.
- **Thiếu coin:** không mở được, không trừ gì. Nhờ giảng viên.
- Với 20 bài Dễ, 20 Vừa, 10 Khó, cả cấp kiếm 900 coin, đủ mở khoảng 90 trong 150 hidden test.

## 7. Học viên thấy gì

Lấy wireframe P1, P2, P3, P5 trong [nghiên cứu](../../research/codefights-arcade/10-wireframes.md) làm khung, thay XP bằng coin và thêm hàng mở test của P4. Giữ phong cách khóa học; không sao chép bản đồ, tên hay hình của CodeSignal. **Người dựng làm mockup hai màn để người làm khóa học duyệt trước khi code giao diện.**

- **Trang Luyện SQL** (`/luyen-sql/`), có link trên thanh đầu trang: nhập mã nếu chưa có; số coin, số bài đã xong; bản đồ 9 chương với các bài theo thứ tự, mỗi bài có trạng thái bằng chữ (Đã xong, Đang làm, Khóa). Có danh sách thay cho bản đồ trên màn nhỏ.
- **Trang làm bài** (`/luyen-sql/<id>/`):
  - Bên trái: tên bài, độ khó, số coin thưởng, yêu cầu, các cột cần ra, có chấm thứ tự dòng hay không, bài cần biết (link về bài học), cấu trúc bảng.
  - Bên phải: khung soạn `SqlEditor`, nút Chạy thử và Nộp bài, danh sách test.
  - Bấm một test công khai hoặc đã mở: xem dữ liệu vào, kết quả mong đợi, kết quả của học viên và lý do sai.
  - Hidden test chưa mở: hiện ổ khóa, trạng thái lần nộp gần nhất và nút mở.
- **Bài chưa mở:** trên bản đồ không bấm được. Vào thẳng bằng đường dẫn thì vẫn đọc được đề nhưng nút chạy bị tắt và có dòng báo cần xong bài trước.
- **Xong bài:** báo số coin nhận được, nút sang bài kế.
- **Khi database đang ngủ:** dùng lại thông báo chờ của trang bài tập.

Mockup được duyệt ngày 2026-11-03: bản đồ là một đường liền chạy qua lại 50 bài, mỗi hàng một chương, mỗi bài có số, tên và trạng thái; phần đã xong màu xanh lá, bài đang làm màu xanh dương. Trang làm bài có một hàng tab test, mỗi tab ghi đạt hoặc chưa đạt; chi tiết test là ba bảng kiểu SSMS: dữ liệu vào, kết quả mong đợi, kết quả của bạn.

Nháp lưu ở trình duyệt với khóa riêng `sqlserver-course:arcade:draft:<id>`. Mở trên máy khác không có nháp thì editor điền câu nộp gần nhất lấy từ server.

## 8. Nội dung

### 8.1 Chương và phân bổ

| Chương | Bài học | Số bài |
|---|---|---|
| 1 | 2.1 Chọn cột, đặt tên cột | 5 |
| 2 | 2.2 `WHERE` | 6 |
| 3 | 2.3 `AND`, `OR`, `IN`, `BETWEEN`, `LIKE` | 7 |
| 4 | 2.4 Sắp xếp và `TOP` | 5 |
| 5 | 2.5 `NULL` | 5 |
| 6 | 2.6 `DISTINCT` | 4 |
| 7 | 2.7 Hàm chuỗi | 6 |
| 8 | 2.8 Hàm ngày | 6 |
| 9 | 2.9 `CASE WHEN` | 6 |

### 8.2 Quy tắc đề

- **Bối cảnh:** nhân sự và các mảng gần như tuyển dụng, đào tạo, tài sản, công tác phí. Mỗi bài **tự khai bảng riêng**, thường chỉ gồm vài cột cần thiết. Arcade không kể tiếp câu chuyện trong `docs/ho-so-cong-ty.md`, nên không ghi vào file đó.
- **Kiến thức:** chỉ dùng bài đã dạy tới hết chương đó. Một bài được trộn kiến thức của các chương trước.
- Viết tự soạn, không chép đề hoặc dữ liệu CodeSignal, HackerRank.
- Dữ liệu đều giả. Chuỗi tiếng Việt trong SQL có `N`. Đề nói rõ cột, thứ tự cột, thứ tự dòng; `ordered: true` thì sắp xếp phải có tiêu chí phụ để không hòa.
- Đề không phụ thuộc ngày hiện tại: dùng mốc cố định như bài 2.8, không dùng `GETDATE()` trong đáp án.
- Không gợi ý trong đề, giống bài tập hiện có.

### 8.3 File bài

Mỗi bài một file `src/content/arcade/<chương>/<id>.yaml`. `id` là slug ASCII không đổi. Thông tin chương nằm ở `src/data/arcade.ts`.

```yaml
id: loc-theo-phong
order: 2
title: …
difficulty: de       # de | vua | kho
lessons: [2-2-where-loc-nhu-autofilter]
prompt: …
columns: [MaNV, HoTen]
ordered: false
tables:
  NhanVien:
    MaNV: varchar(10) NOT NULL
    HoTen: nvarchar(100) NOT NULL
    MaPB: varchar(10) NOT NULL
answer: SELECT …
tests:
  - id: 1
    visible: true
    rows: { NhanVien: [[NV1, An, KD], …] }
    expected: […]
  - id: 3
    rows: { … }
    expected: […]
    catches: SELECT …   # câu sai qua được unit test nhưng phải trượt test này
```

`expected` do công cụ điền từ `answer` rồi người viết đọc lại, nên đề, dữ liệu, kết quả nằm cùng một chỗ để review. Phải lưu đủ kiểu cột để `compareResults` so số đúng như hiện nay.

### 8.4 Cổng chất lượng: `npm --prefix api run check:arcade`

Chạy trên database Arcade thật, báo lỗi theo từng bài:

1. Bộ chặn chấp nhận `answer`, và `answer` không dùng hàm lấy ngày hiện tại.
2. `answer` ra đúng `expected` ở mọi test. Có `--write` để điền `expected`.
3. Mỗi hidden test có `catches`: câu này qua hết unit test và trượt đúng hidden test đó.
4. Có ít nhất một unit test ra dòng dữ liệu.
5. `ordered: true`: đảo thứ tự chèn dữ liệu, kết quả `answer` không đổi.

Đây là cách bảo đảm mọi bài giải được: bài không qua cổng này thì không phát hành.

Review nội dung theo mục 4.5, 4.6 của `docs/quy-uoc.md`, mỗi chương một lượt: reviewer làm từng đề như người mới chỉ học tới chương đó, trước khi xem `answer`.

## 9. Kỹ thuật

### 9.1 Hạ tầng

- Database miễn phí thứ hai tên `arcade` trên server `sql-lession`, sao cấu hình `free-sql-db-8797714`, cùng collation `SQL_Latin1_General_CP1_CI_AS`, hết quota thì tự dừng (`AutoPause`), không phát sinh phí. Theo tài liệu Microsoft, mỗi subscription có tối đa 10 database miễn phí; lệnh tạo là phép thử thực tế. Nếu Azure từ chối thì dừng lại hỏi.
- `database/arcade-setup.sql` tạo schema `arcade`, các bảng lưu trữ và hai user. Người làm khóa học tự điền mật khẩu và chạy.
  - `arcade_runner`: `CREATE TABLE`, `ALTER`, `SELECT`, `INSERT` trên schema `dbo`; không có quyền gì trên schema `arcade`. Chạy câu của học viên.
  - `arcade_store`: `SELECT`, `INSERT`, `UPDATE` trên schema `arcade`. Lưu tiến độ và coin.
- Schema `dbo` luôn rỗng khi nghỉ. Nhờ vậy cả `NhanVien` lẫn `dbo.NhanVien` đều chạy đúng.
- Biến môi trường mới trên Function App: `ARCADE_SQL_DATABASE`, `ARCADE_RUNNER_USER`, `ARCADE_RUNNER_PASSWORD`, `ARCADE_STORE_USER`, `ARCADE_STORE_PASSWORD`. Server dùng lại `SQL_SERVER`. Trên máy, API và `check:arcade` đọc các biến này từ `.env`, do người làm khóa học tự điền.

### 9.2 Chạy một test

Một transaction cho mỗi test, trên kết nối của `arcade_runner`:

1. `BEGIN TRAN`, đặt `SET` như runner hiện tại.
2. Chạy phần dựng test: `CREATE TABLE` và `INSERT` theo `tables`, `rows`.
3. Chạy nguyên câu của học viên thành một batch riêng, để lỗi SQL Server báo đúng số dòng.
4. Kiểm `@@TRANCOUNT` như hiện nay.
5. Luôn `ROLLBACK`. Bảng và dữ liệu test biến mất.

Mở rộng `createRunner` bằng tham số tùy chọn `setup`, không đổi hành vi khi không truyền. Lỗi ở bước 2 là lỗi của người dựng, trả `unavailable`, không tính là học viên sai. Giới hạn 5 giây mỗi test.

Hai request cùng lúc của một mã (hai tab) sẽ chờ nhau vì trùng tên bảng; hết `LOCK_TIMEOUT` thì báo thử lại. Chấp nhận với một học viên.

### 9.3 Bộ chặn và chấm

- `guardArcade` dùng lại `guardExercise`, thêm: chỉ nhận `SELECT` hoặc `WITH`, chặn `INSERT`, `UPDATE`, `DELETE`.
- Chấm bằng `compareResults` hiện có với `expected`. Không so tên cột, như bài tập hiện tại.
- Trên 5.000 dòng thì báo quá lớn như `grade`.
- Lỗi SQL ở test công khai hiện nguyên văn. Ở hidden test chưa mở chỉ tính là chưa đạt, vì thông báo lỗi có thể chứa dữ liệu test.

### 9.4 Lưu trữ (schema `arcade`)

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `Learner` | `LearnerId` khóa chính, `Coins`, `CreatedAt` | `LearnerId` là SHA-256 của mã; `CHECK (Coins >= 0)` |
| `Completion` | `LearnerId`, `ChallengeId`, `Reward`, `Sql`, `CompletedAt` | Khóa chính hai cột đầu, chặn thưởng trùng |
| `OpenedTest` | `LearnerId`, `ChallengeId`, `TestId`, `Cost`, `OpenedAt` | Khóa chính ba cột đầu, chặn trừ trùng |
| `Submission` | `Id`, `LearnerId`, `ChallengeId`, `Sql`, `Passed`, `Total`, `Accepted`, `FailedTests`, `SubmittedAt` | Mọi lần nộp; giảng viên đọc khi học viên hỏi; `FailedTests` giữ trạng thái hidden test sau khi tải lại trang |

Coin thưởng và coin trừ đều chạy trong transaction: ghi `Completion` hoặc `OpenedTest` trước, trùng khóa thì bỏ qua và không đổi `Coins`. Hồ sơ tạo ở lần gọi đầu. Đổi mã thì `LearnerId` đổi; muốn giữ tiến độ thì sửa bằng SQL.

### 9.5 API

Thêm vào Azure Functions hiện có, cùng header `x-access-code`, cùng limiter, xử lý ở `api/src/arcade.ts` theo kiểu `core.ts` để test bằng fake.

| Đầu gọi | Vào | Ra |
|---|---|---|
| `GET /arcade/me` | | Coin, các bài đã xong; đánh thức database |
| `GET /arcade/challenges/{id}` | | Mở khóa chưa, đã xong chưa, câu nộp và các test trượt của lần nộp gần nhất, dữ liệu các test đã mở |
| `POST /arcade/run` | `challenge`, `sql` | Kết quả từng test công khai và đã mở |
| `POST /arcade/submit` | `challenge`, `sql` | Kết quả mọi test, hidden chưa mở chỉ có đạt/chưa đạt; `accepted`, `reward`, `coins` |
| `POST /arcade/open` | `challenge`, `test` | `coins` và dữ liệu test |

Server kiểm tuần tự: bài chưa mở trả `locked`. Thiếu coin trả `not-enough-coins`, không đổi gì. Gọi `open` lại với test đã mở trả dữ liệu, không trừ coin.

Client `arcade/*` khởi tạo kết nối khi cần. Thiếu biến môi trường Arcade thì chỉ các đầu gọi này trả `unavailable`; `ping`, `run`, `grade` không bị ảnh hưởng.

### 9.6 Đóng gói và web

- `api/build.mjs` gộp YAML thành `dist/arcade.json`. Thêm `src/content/arcade/**` vào `paths` của `deploy-api.yml`.
- Astro đọc YAML qua collection mới, hàm `publicChallenge()` chỉ giữ dữ liệu công khai: bỏ `answer`, `catches`, bỏ `rows`, `expected` của hidden test, giữ số lượng hidden test.
- `check:dist` thêm kiểm: không có `answer`, `catches` hay dữ liệu hidden test trong `dist/`.
- React island mới cho trang chủ Arcade và trang làm bài, dùng lại `SqlEditor`, `editor-keys`, bảng kết quả, `exercise-storage` cho mã truy cập. `ExerciseWorkspace` giữ nguyên.

## 10. Kiểm thử và nghiệm thu

**Tự động:** Vitest cho luật coin, tuần tự, sinh SQL dựng test, `guardArcade`, `publicChallenges`, kiểm file bài, bằng fake giống `api-core.test.ts`. `npm test`, `npm run check`, `npm run check:dist`, `npm --prefix api run typecheck` phải xanh.

**Trên database thật:** `check:arcade` đạt cả 50 bài; `check:exercises` và `check:data` vẫn đạt.

**Trên trình duyệt:** chạy qua API ở máy và dựng bản web:

1. Mã mới có 20 coin, chỉ bài 1 mở.
2. Câu sai qua unit test nhưng trượt hidden test: bài chưa xong, không có coin.
3. Mở hidden test: trừ 10 coin, thấy dữ liệu; tải lại trang vẫn còn, mở lại không trừ.
4. Hết coin: không mở được, số dư không đổi.
5. Câu đúng: bài xong, cộng thưởng, bài kế mở; nộp lại không cộng.
6. Gọi API bài chưa mở: bị từ chối.
7. Vào bằng máy hoặc trình duyệt khác cùng mã: thấy đúng tiến độ.
8. Trang bài tập cũ chạy và nộp như trước.
9. Dùng được bằng bàn phím, ở rộng 390 và 1440 px.

## 11. Giữ đường cho cấp Nâng cao

- Bảng tự khai cho phép bài `JOIN` có đủ bảng và dữ liệu phản ví dụ.
- Transaction luôn hoàn tác nên câu `UPDATE`, `DELETE` sau này chỉ cần mở bộ chặn và thêm cách chấm trạng thái bảng.
- Chương và cấp nằm trong `src/data/arcade.ts`, thêm cấp không đổi cấu trúc.

Không làm thêm gì cho cấp Nâng cao trong MVP.

## 12. An toàn và thao tác ra ngoài

- Mọi lệnh `az` tạo hoặc đổi tài nguyên phải đưa người làm khóa học duyệt trước. Người làm khóa học tự điền mật khẩu và mã truy cập.
- `arcade_runner` không chạm được `HRM_Demo` vì thuộc database khác. Mục 5 của `docs/quy-uoc.md` thêm quy định cho database Arcade: schema `dbo` chỉ ghi trong transaction hoàn tác, schema `arcade` là dữ liệu học viên thật.
- Làm trên nhánh riêng. Push lên `main` sẽ deploy nên chỉ làm khi được đồng ý.

## 13. Phần để người dựng tự quyết

- Tên chương, tên hiển thị của từng bài, cách vẽ bản đồ (sau khi mockup được duyệt).
- Cách sinh literal SQL theo kiểu cột, miễn có test.
- Cách tách bảng kết quả dùng chung, miễn `ExerciseWorkspace` không đổi hành vi.
- Số dòng dữ liệu mỗi test, số unit test và hidden test vượt mức tối thiểu.

## 14. Kết quả spike (2026-11-03)

- Database `arcade` tạo được trên server `sql-lession` bằng gói miễn phí: `useFreeLimit: true`, `AutoPause`, `GP_S_Gen5`, 2 vCore, tối thiểu 0,5, collation `SQL_Latin1_General_CP1_CI_AS`.
- `database/arcade-setup.sql` được người dựng áp dụng theo đề nghị của người làm khóa học, lấy mật khẩu từ `.env`, không in và không ghi vào file. Script dùng `EXEC` cho `CREATE SCHEMA` nên không cần `GO`.
- Một test mẫu 10 dòng chạy đúng trong transaction: cả `NhanVien` lẫn `dbo.NhanVien` đều đọc được, `Hà` giữ nguyên, sau `ROLLBACK` schema `dbo` rỗng.
- `arcade_runner` bị lỗi 229 khi đọc hoặc ghi `arcade.Learner`. `arcade_store` đọc ghi được schema `arcade`, không tạo được bảng (lỗi 262).
- Từ máy phát triển, một vòng mất khoảng 1,09 giây, vượt ngưỡng 600 ms của plan. Đo riêng thì mỗi lệnh khoảng 155 ms bất kể nặng nhẹ, `CREATE TABLE` cộng `INSERT` 10 dòng chỉ hơn một lệnh `SET` khoảng 6 ms, nên gần như toàn bộ là độ trễ mạng. Function App và database cùng ở Australia East nên con số này không đại diện cho API thật. Thời gian thật đo lại ở bước kiểm sau khi deploy.

## 15. Hiện trạng (2026-11-03)

Toàn bộ MVP đã xong trên nhánh `feat/arcade-mvp`, chưa merge, chưa deploy. Việc còn lại và kết quả kiểm ở [ghi chú bàn giao](../../reviews/2026-11-03-arcade-mvp-ban-giao.md).

Những điểm đi xa hơn hoặc khác phần trên:

- Lưu lần nộp và trả thưởng là một thao tác `Store.submit` trong một transaction, để lỗi giữa chừng không để lại lần nộp "đạt" chưa được tính.
- Số coin trả về là số đọc từ database sau khi ghi, không tính từ số đọc đầu lượt, để hai tab không thấy số dư cũ.
- Lỗi tạm thời có mã SQL (1205, 10928, 10929, 40501, 40613) trên đường Arcade được báo là dịch vụ, không tính là câu sai.
- `guardArcade` còn chặn `DECLARE` và `CURSOR`, vì con trỏ có thể sống qua `ROLLBACK` trên kết nối trong pool.
- Kết nối tới database Arcade tự thử lại khi database đang dậy, khoảng 70 giây, thay vì báo lỗi.
- Bảng từ khóa ở `docs/quy-uoc.md` 2.8 hẹp hơn plan: chương 2 chỉ dùng `=` và `>=`, `<=` từ chương 8, không dùng `<>`.
- Bảng kết quả hiện dấu cách ở hai đầu giá trị bằng dấu `·` và chuỗi rỗng bằng `(chuỗi rỗng)`, vì câu trả lời đúng hay sai ở chương 2-7 phụ thuộc vào chúng.
