# Thiết kế phần B: bài tập chạy SQL trên web

- Ngày: 2026-10-18
- Trạng thái: đã duyệt ngày 2026-10-18. Người làm khóa học chọn cách ở mục 7: người dựng cài Azure CLI, người làm khóa học tự `az login`, người dựng tạo tài nguyên và hỏi lại trước mỗi lần tạo.
- Đã làm và deploy ngày 2026-10-18; trạng thái hiện tại và các chỗ đổi sau đó ở mục 12.
- Nối tiếp: [spec đợt 2, mục 5](2026-10-18-step-flow-exercises-full-lessons-design.md) và [kết quả chạy thử](2026-10-18-exercise-runner-spike-results.md). Chỗ nào spec này ghi khác spec đợt 2 thì theo spec này.
- Web: https://nhatlam1111.github.io/microsoft-sql-lession/

## 1. Mục đích

Học viên tự học là chính; người làm khóa học chỉ thỉnh thoảng tham gia. Học xong phần đọc, học viên làm bài tập ngay trên web: viết câu lệnh, chạy trên database thật, nộp bài và biết đúng hay chưa. Bí thì tự tìm cách giải (Google) hoặc nhắn người làm khóa học; trang không gợi ý và không cho xem đáp án.

## 2. Đã chốt với người làm khóa học (2026-10-18)

1. Mỗi bài tập có một trang làm bài riêng, dùng hết chiều ngang (phương án A trong mockup).
2. Không có gợi ý, không có nút xem đáp án.
3. Trang làm bài có nút "Sơ đồ database". Bấm vào thì popup lớn hiện sơ đồ 7 bảng của `HRM_Demo` (tên bảng, tên cột, kiểu dữ liệu, khóa chính, khóa ngoại, đường nối). Đóng bằng × hoặc Esc.
4. API chạy trên Azure Functions gói **Flex Consumption**, không bật "Always Ready".
5. Mọi lần chạy đều trong transaction rồi `ROLLBACK` trên `sql-lession` (đã cho phép từ spec đợt 2).
6. Người dựng được cài công cụ cần thiết trên máy.

Đã kiểm thêm: database `sql-lession` nằm ở vùng **Australia East** (tra DNS ngày 2026-10-18). Tài khoản Azure của người làm khóa học mở được trang tạo Function App, tức là có quyền tạo.

## 3. Học viên thấy gì

### 3.1 Mục "Bài tập" trong bài học

- Bài đã có bài tập: mục "Bài tập" liệt kê từng bài tập, gồm số thứ tự, tên, một câu nói cần làm gì, trạng thái ("Chưa làm" hoặc "Đã làm đúng") và link "Làm bài".
- Bài chưa có bài tập: giữ dòng "Phần bài tập sẽ bổ sung sau."

### 3.2 Trang làm bài

- Đường dẫn: `/bai/<slug-bài>/bai-tap/<số>/`, ví dụ `/bai/3-5-left-join/bai-tap/1/`.
- Vẫn có thanh trên cùng của web, không có sidebar khóa học để dành chỗ cho khung soạn. Dưới đó là đường dẫn "Bài 3.5 LEFT JOIN › Bài tập 1/3"; bấm tên bài để quay lại bài học. Có "Bài tập trước" và "Bài tập sau" trong cùng bài học.
- **Cột trái (khoảng 1/3):** tên bài tập, yêu cầu viết bằng lời, các cột cần ra (đúng thứ tự), có cần sắp xếp hay không.
- **Cột phải:**
  - khung soạn SQL tô màu như khối SQL của web (kiểu SSMS);
  - nút "Chạy (F5)", nút "Nộp bài", nút "Sơ đồ database"; phím F5 hoặc Ctrl+Enter cũng chạy;
  - Tab chèn 4 dấu cách; chọn nhiều dòng rồi bấm Tab thì mọi dòng được chọn lùi vào 4 dấu cách như SSMS; Ctrl+Z hoàn tác được;
  - bên dưới là tab Results và Messages giống bảng kết quả trong bài học. Messages ghi số dòng bị ảnh hưởng, hoặc nguyên văn lỗi của SQL Server.
- "Chạy" chỉ chạy và hiện kết quả. "Nộp bài" chấm rồi hiện một dải kết quả:
  - đúng: "Đúng rồi." (xanh lá);
  - sai: "Chưa đúng: " kèm một lý do ngắn chỉ chỗ lệch, không nói cách sửa và không bao giờ đưa ra giá trị của đáp án:
    - bài truy vấn: "khác số cột (bạn ra 4, đề cần 3)", "khác số dòng (bạn ra 2, đáp án 1)", "dòng 2 khác ở cột HoTen" (đề có yêu cầu sắp xếp), "dòng 2 không có trong đáp án" (đề không yêu cầu sắp xếp). Số dòng là dòng học viên thấy trong tab Results;
    - bài sửa dữ liệu (học viên không thấy kết quả câu kiểm tra, nên dòng được gọi bằng giá trị của chính nó): "khác số dòng bị ảnh hưởng (bạn 17, đáp án 9)", "sau khi sửa, bảng còn 40 dòng, đáp án còn 41 dòng", "sau khi sửa, dòng MaNV = NV002, KyLuong = 2026-09 khác đáp án ở cột PhuCap", "sau khi sửa vẫn còn dòng MaDon = DP003 mà đáp án không có".
- Câu đang viết dở được giữ trong trình duyệt khi rời trang hoặc tải lại, mỗi bài tập một bản.
- Khi học viên mới vào, khung soạn chỉ có một dòng chú thích `-- Viết câu lệnh của bạn ở đây`.

### 3.3 Sơ đồ database

- Nội dung theo mockup đã chọn ([`erd-popup.html`](2026-10-18-mockups/erd-popup.html), phương án A; trang làm bài: [`exercise-workspace.html`](2026-10-18-mockups/exercise-workspace.html), phương án A; hai file là mảnh HTML, mở bằng trình duyệt sẽ thiếu khung): 7 hộp bảng, mỗi dòng một cột với tên, kiểu, nhãn PK/FK; đường nối từ khóa ngoại tới bảng nó trỏ tới, kể cả `NhanVien.MaQuanLy` trỏ về chính `NhanVien`.
- Dữ liệu sơ đồ sinh lúc build từ `database/HRM_Demo.sql`, nên đổi script thì sơ đồ đổi theo. Vị trí các hộp do người dựng đặt cố định.
- Popup đóng bằng ×, Esc hoặc bấm ra ngoài; khi mở thì focus nằm trong popup, Tab chỉ đi vòng giữa nút × và vùng sơ đồ (vùng sơ đồ cuộn được bằng phím mũi tên), đóng thì focus về nút "Sơ đồ database".

### 3.4 Mã truy cập

- Lần đầu bấm "Chạy" hoặc "Nộp bài", trang hỏi mã truy cập trong một ô nhỏ ngay trên khung soạn. Nhập một lần, trình duyệt nhớ.
- Mã sai: "Mã truy cập không đúng. Hỏi người phụ trách khóa học để lấy mã."
- Không có mã vẫn đọc đề và xem sơ đồ được, chỉ không chạy được.

### 3.5 Chờ và lỗi

| Tình huống | Trang báo |
|---|---|
| Quá 3 giây chưa có trả lời | "Đang khởi động database, lần đầu có thể mất tới 1 phút…" (giữ nút ở trạng thái đang chạy) |
| Bị bộ chặn từ chối | Lý do của bộ chặn, ví dụ "Lệnh DROP không dùng được trong bài tập." |
| Chạy quá 10 giây | "Câu lệnh chạy quá 10 giây nên đã dừng. Kiểm tra lại điều kiện lọc hoặc kết bảng." |
| Database tạm dừng vì hết hạn mức miễn phí trong tháng | "Phần chạy bài tập tạm nghỉ đến đầu tháng sau. Bài học vẫn đọc được bình thường." |
| Không gọi được API | "Không kết nối được máy chủ bài tập. Thử lại sau ít phút; nếu vẫn lỗi, nhắn người phụ trách khóa học." |
| API trả về câu trả lời không đúng dạng (ví dụ trang lỗi của Azure) | Như dòng trên |

Khi trang làm bài mở ra, trang gửi trước một yêu cầu "đánh thức" để database kịp thức trước khi học viên bấm Chạy.

### 3.6 Lưu tiến độ

- Bài tập làm đúng được lưu cùng tiến độ học, có trong file xuất/nhập tiến độ; file tiến độ cũ vẫn nhập được.
- Nút "Đã học xong" của bài học vẫn do học viên tự bấm, không phụ thuộc bài tập.

## 4. Nội dung bài tập

- Mỗi bài học có bài tập thì có một file riêng trong `src/content/exercises/`, đặt theo slug bài học. Mỗi bài tập gồm:
  - mã (ví dụ `3-5-1`), tên, yêu cầu, các cột cần ra, có cần sắp xếp không;
  - loại: truy vấn hoặc sửa dữ liệu;
  - câu đáp án; với bài sửa dữ liệu thêm câu kiểm tra (`SELECT` mọi dòng của bảng bị sửa, có các cột khóa và cột bị sửa, có `ORDER BY`).
- Web chỉ đọc phần đề. Câu đáp án và câu kiểm tra chỉ được đóng gói vào API, không có trong trang hay file nào của web; bước kiểm bản build (`check:dist`) báo lỗi nếu tìm thấy câu đáp án nào trong `dist`. Repo đang để public, nên ai đọc repo vẫn thấy đáp án; chấp nhận điều này.
- Kiểm tra tự động khi chạy test: file đúng cấu trúc; mã không trùng; SQL có chuỗi tiếng Việt thì có `N`; bài sửa dữ liệu phải có câu kiểm tra.
- Kiểm tra trên database thật bằng một lệnh chạy trên máy (không chạy trong CI, vì CI không có thông tin kết nối): chạy mọi câu đáp án (và câu kiểm tra) theo đúng cách API chạy, có `ROLLBACK`, báo câu nào lỗi hoặc ra 0 dòng.
- Bài tập đầu tiên, để chứng minh cả hai loại chạy được:
  - bài 3.5: 3 bài truy vấn;
  - bài 6.5: 2 bài sửa dữ liệu (ví dụ sửa đúng các dòng cần sửa, và viết `DELETE` có `WHERE`).
  Bài tập của Level 1 viết ở phần C.

## 5. API

### 5.1 Nơi chạy

- Azure Functions, gói Flex Consumption, Node.js 24 (người làm khóa học chọn ngày 2026-10-18 thay cho 22, vì 22 chỉ được hỗ trợ đến 04/2027), cỡ máy 512 MB, không bật Always Ready, Zone redundancy tắt, chưa bật Application Insights.
- Vùng: Australia East, cùng vùng với database. Lúc cài đặt kiểm bằng `az functionapp list-flexconsumption-locations`; nếu Australia East chưa có Flex thì chọn vùng gần nhất có Flex và ghi lại độ trễ đo được.
- Code nằm trong thư mục `api/` của repo, có `package.json` riêng. Logic thuần (bộ chặn, so kết quả, định dạng giá trị) viết sao cho dùng chung được với test của web.

### 5.2 Các đầu gọi

| Đầu gọi | Làm gì | Trả về |
|---|---|---|
| `GET /api/ping` | Chạy `SELECT 1` để đánh thức database | thời gian chờ database |
| `POST /api/run` | Nhận mã bài tập và câu SQL, chạy có `ROLLBACK` | cột, tối đa 200 dòng (có cờ "đã cắt"), số dòng bị ảnh hưởng, thông báo hoặc lỗi của SQL Server, thời gian chạy |
| `POST /api/grade` | Như `run`, rồi chấm theo đáp án của bài tập | như `run`, thêm đúng/sai và lý do |

- Mọi đầu gọi, kể cả `ping`, yêu cầu header mã truy cập (đổi sau rà soát cuối: không có mã thì người lạ cũng đánh thức được database và làm tốn hạn mức). Trang chỉ gửi `ping` khi đã có mã. Danh sách mã nằm trong cài đặt `ACCESS_CODES` (cách nhau bởi dấu phẩy), để sau này phát mỗi học viên một mã. Sai mã trả 401. Câu lệnh chạy quá 10 giây trả 504 (không dùng 408, vì trình duyệt có thể tự gửi lại yêu cầu sau 408).
- Chỉ nhận yêu cầu từ `https://nhatlam1111.github.io` và `http://localhost:4321` (CORS).
- Giới hạn tốc độ: mỗi mã tối đa 30 lần gọi mỗi phút, đếm trong từng máy chạy API (không cần chính xác tuyệt đối).

### 5.3 Cách chạy một câu lệnh

Theo bản chạy thử, có sửa các chỗ thiếu đã ghi trong file kết quả:

- Bộ chặn chạy trước khi gửi xuống database:
  - bỏ qua chuỗi, tên trong `[...]`/`"..."` và chú thích (dùng `sanitize` của bản chạy thử);
  - câu phải bắt đầu bằng `SELECT`, `WITH`, `INSERT`, `UPDATE` hoặc `DELETE`;
  - chặn các từ khóa trong danh sách của bản chạy thử;
  - chặn `SELECT … INTO`, nhưng cho `INSERT INTO` và `WITH … INSERT/UPDATE/DELETE`;
  - câu dài quá 4.000 ký tự thì từ chối.
- Chạy: một kết nối, một transaction; `SET XACT_ABORT ON; SET LOCK_TIMEOUT 3000;`; câu của học viên; câu kiểm tra nếu là bài sửa dữ liệu; luôn `ROLLBACK`. Gộp thành ít lượt gửi nhất có thể.
- Sau khi chạy, nếu câu của học viên sinh ra nhiều hơn một kết quả hoặc nhiều hơn một số đếm dòng (tức là có nhiều câu lệnh, kể cả khi không có `;`), thì không chấm và báo "Mỗi lần chỉ chạy một câu lệnh."
- Đọc kết quả theo mảng để giữ đúng thứ tự cột và cột trùng tên. `DECIMAL` định dạng theo số chữ số thập phân của cột trước khi so (không rõ số chữ số thì giữ nguyên số); `money` và `smallmoney` luôn có 4 chữ số thập phân như SSMS, vì driver không báo số chữ số cho hai kiểu này; `date` thành `YYYY-MM-DD`; `time` thành `HH:MM:SS`. Kết quả `FOR JSON`/`FOR XML` (driver gộp thành một dòng dạng object) hiện thành một cột chuỗi.
- Thời gian chờ: kết nối 90 giây (database đang ngủ), mỗi câu lệnh 10 giây.
- Chấm: như spec đợt 2 mục 5.4. So tối đa 5.000 dòng; vượt thì báo "Kết quả quá lớn để chấm, hãy lọc bớt."

### 5.4 Tài khoản SQL riêng

- Một user chứa trong database (contained user) tên `hrm_practice`, có mật khẩu, chỉ được `SELECT`, `INSERT`, `UPDATE`, `DELETE` trên 7 bảng của `HRM_Demo`. Không có quyền gì khác.
- Script tạo user nằm trong repo (`database/practice-user.sql`), mật khẩu để trống cho người làm khóa học tự điền. Người làm khóa học tự chạy script; người dựng không chạy lệnh tạo user và không cầm mật khẩu.
- Tường lửa của SQL server bật "Allow Azure services and resources to access this server", để Function App kết nối được.

### 5.5 Kiểm dữ liệu

- Một file checksum chuẩn của 7 bảng nằm trong repo, lấy ngay sau khi chạy `HRM_Demo.sql`.
- Một lệnh chạy trên máy (dùng kết nối chỉ đọc) so checksum hiện tại với file chuẩn và báo bảng nào lệch.
- Lệch thì người làm khóa học chạy lại `database/HRM_Demo.sql`. Không có việc tự khôi phục.

## 6. Deploy

- Workflow GitHub Actions riêng cho API (`.github/workflows/deploy-api.yml`), chạy khi push vào `main` có thay đổi trong `api/`, `src/content/exercises/` hoặc phần logic dùng chung.
- Đăng nhập Azure bằng OIDC (`azure/login`), không dùng publish profile, theo khuyến nghị của Microsoft cho Flex Consumption. GitHub cần ba secret `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`; identity chỉ có quyền deploy vào đúng Function App này.
- Web cần biết địa chỉ API: đặt trong biến của repo `PUBLIC_EXERCISE_API`, workflow build web đọc biến này.
- Các bước của workflow API: `npm ci`, `npm test` (của web), rồi trong `api/`: `npm ci`, `npm run typecheck` (`tsc`), `npm run build`, `npm prune --omit=dev`; đăng nhập Azure; `Azure/functions-action@v1` với `package: api`, `sku: flexconsumption`, `respect-funcignore: true` (bỏ mã TypeScript và `local.settings.json` khỏi gói tải lên). Action đọc `api/.funcignore` theo luật của `.gitignore`, nên mọi dòng phải bắt đầu bằng `/`: một dòng `src` trần cũng xóa thư mục `src` của các package trong `node_modules` (`debug`, `js-md4`…), API không nạp được và mọi đầu gọi trả 404. Test kiểm điều này.
- Federated credential phải khớp đúng chuỗi subject GitHub gửi. Repo này gửi dạng có ID: `repo:nhatlam1111@25176629/microsoft-sql-lession@1423314136:ref:refs/heads/main`; dạng `repo:nhatlam1111/microsoft-sql-lession:ref:refs/heads/main` bị Azure từ chối (lỗi AADSTS700213).
- Sau khi deploy, workflow gọi `PUBLIC_EXERCISE_API/ping` không kèm mã, thử lại tối đa 12 lần cách nhau 10 giây; phải nhận 401, nếu không thì workflow báo lỗi (404 nghĩa là các function không nạp được).
- Push chỉ đổi file ngoài bộ lọc đường dẫn thì workflow API không chạy; cần deploy lại thì bấm "Run workflow" trên GitHub.

## 7. Cài đặt lần đầu: ai làm gì

1. **Người dựng:** cài Azure CLI (và Azure Functions Core Tools nếu cần thử API trên máy) bằng `winget`.
2. **Người làm khóa học:** chạy `az login` và tự đăng nhập trong trình duyệt.
3. **Người dựng** (hỏi lại trước khi tạo bất kỳ tài nguyên nào): kiểm Flex có ở Australia East; tìm resource group của `sql-lession`; tạo storage account, Function App (Flex, Node 24, 512 MB), identity cho GitHub Actions kèm federated credential cho nhánh `main` của repo và quyền deploy vào Function App; đặt CORS và các cài đặt không bí mật (`SQL_SERVER`, `SQL_DATABASE`, `SQL_USER`).
4. **Người làm khóa học:**
   - chạy `database/practice-user.sql` trong Query editor của `sql-lession` với mật khẩu tự chọn;
   - bật tường lửa "Allow Azure services…";
   - trong Function App → Environment variables: điền `SQL_PASSWORD` và `ACCESS_CODES`;
   - trong GitHub → Settings → Secrets and variables → Actions: thêm ba secret và biến `PUBLIC_EXERCISE_API` theo giá trị người dựng đưa.
5. **Người dựng:** push, chờ deploy, chạy lệnh kiểm tra đáp án trên database thật qua API đã deploy, rồi mở trang làm bài trên web thật để thử.

Người dựng không nhập mật khẩu, mã truy cập hay khóa bí mật vào bất cứ đâu; những giá trị đó do người làm khóa học tự điền.

## 8. Ngoài phạm vi

- Gợi ý, xem đáp án, chấm điểm, xếp hạng, đếm giờ.
- Đăng nhập tài khoản, database riêng cho từng học viên.
- Bài tập dùng `BEGIN TRAN`, `COMMIT`, `ROLLBACK`, `CREATE`, `ALTER`, `DROP`, `TRUNCATE`.
- Tự khôi phục dữ liệu.
- Bài tập cho Level 1–6 (trừ bài tập mẫu ở mục 4); viết dần ở phần C.

## 9. Những điều không được xảy ra

Như spec đợt 2 mục 2, cộng thêm:

- Câu đáp án hoặc câu kiểm tra xuất hiện trong trang web hay file tĩnh của web.
- API dùng tài khoản quản trị của database.
- Mật khẩu, mã truy cập hay secret nằm trong repo.
- Học viên bấm Nộp bài với câu đúng mà bị báo sai vì khác kiểu số (ví dụ `9610000` và `9610000.0`).

## 10. Những quyết định mình tự đặt (bạn xem lại khi đọc)

1. Khi sai vẫn hiện một lý do ngắn chỉ chỗ lệch (số dòng, số cột, dòng thứ mấy), không chỉ cách sửa.
2. Giữ câu đang viết dở cho từng bài tập; khung soạn mới chỉ có một dòng chú thích.
3. Đường dẫn trang làm bài `/bai/<slug>/bai-tap/<số>/`.
4. Mã truy cập hỏi ngay trên trang lúc chạy lần đầu; `ACCESS_CODES` cho phép nhiều mã.
5. Bài tập mẫu: 3 bài truy vấn ở 3.5 và 2 bài sửa dữ liệu ở 6.5.
6. Đáp án không lên web nhưng vẫn nằm trong repo public.
7. Giới hạn: câu lệnh 10 giây, 200 dòng hiển thị, 5.000 dòng khi chấm, 4.000 ký tự, 30 lần gọi mỗi phút mỗi mã.
8. Deploy API bằng GitHub Actions với OIDC; người dựng tạo tài nguyên Azure bằng Azure CLI sau khi người làm khóa học đăng nhập.
9. Kiểm dữ liệu bằng lệnh chạy trên máy, không có tác vụ chạy định kỳ.
10. Trang làm bài không có sidebar khóa học; bản build bị kiểm để không lọt câu đáp án.

## 11. Để người dựng tự quyết

- Thư viện khung soạn SQL (ví dụ CodeMirror 6), miễn tô màu như khối SQL của web và dùng được F5.
- Định dạng file bài tập (YAML hay JSON) và cách tách phần đề khỏi phần đáp án khi build.
- Cách đặt vị trí các hộp trong sơ đồ database.
- Cấu trúc thư mục `api/`, cách đóng gói, tên Function App (gợi ý `sql-lession-api`, thêm hậu tố nếu tên đã có người dùng).
- Cách kiểm thử: logic thuần bằng Vitest; API bằng lệnh chạy trên máy với database thật.

Tham khảo khi viết spec: [Deploy Azure Functions bằng GitHub Actions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-how-to-github-actions), [Azure/functions-action](https://github.com/Azure/functions-action), [Flex Consumption](https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan), [bảng giá Functions](https://azure.microsoft.com/en-us/pricing/details/functions/).

## 12. Đã làm và trạng thái (cập nhật 2026-10-18)

- Tài nguyên Azure: Function App `sql-lession-api` (Flex Consumption, Australia East, Node 24, 512 MB) trong resource group `learn`; identity `sql-lession-api-deploy` với federated credential `github-main`. Địa chỉ API: `https://sql-lession-api.azurewebsites.net/api`.
- Bảo mật (2026-10-18): Function App đã bật HTTPS only (gọi `http://` thì bị chuyển sang `https://`). Tường lửa của SQL server còn rule `public` mở cho mọi IP; người làm khóa học cố ý để vậy và sẽ tự điều chỉnh sau.
- Workflow "Deploy the exercise API" chạy thành công. Đã thử API thật: `ping` và `run` không có mã trả 401; gọi từ origin lạ không có header CORS; từ `https://nhatlam1111.github.io` thì có.
- Người làm khóa học đã thử bài 3-5-1 trên web thật với mã của mình (một câu đúng, một câu sai); sau đó `npm --prefix api run check:data` báo không bảng nào lệch (2026-10-18).
- Sửa sau rà soát cuối (2026-10-18), đã ghi vào các mục trên:
  - câu quá 10 giây trả 504 thay cho 408 (mục 5.2);
  - `money`/`smallmoney` có 4 chữ số thập phân; `FOR JSON`/`FOR XML` không còn làm hỏng trang (mục 5.3);
  - câu trả lời không đúng dạng từ API được báo như không gọi được API (mục 3.5);
  - Tab với nhiều dòng được chọn, Ctrl+Z hoàn tác được (mục 3.2);
  - popup sơ đồ giữ Tab bên trong và không giật focus khi trang vẽ lại (mục 3.3);
  - CI kiểm kiểu cho `api/`; `sku` và `respect-funcignore` trong workflow; `api/local.settings.json` nằm trong `.gitignore` (mục 6). Lần deploy đầu với `respect-funcignore` làm API trả 404 vì `.funcignore` có dòng `src` trần; đã sửa bằng cách thêm `/` ở đầu mỗi dòng, và workflow giờ tự gọi thử `ping` sau khi deploy.
  - Người làm khóa học thử bài 6-5-1 trên web thật: câu sai được chấm sai đúng, `check:data` không lệch; nhưng lý do "dòng 45 khác" trỏ vào dòng của câu kiểm tra mà học viên không thấy. Đã đổi lý do của bài sửa dữ liệu sang gọi dòng bằng giá trị và tên cột lệch, bài truy vấn thêm tên cột lệch (mục 3.2).
