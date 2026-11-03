# Review tích hợp SQL Arcade MVP (nhánh `feat/arcade-mvp`, `4fa24e9..3dbcf86`)

Reviewer: đọc mã và nội dung, chạy `npx vitest run` (67 file, 555 test đều xanh). Không kết nối database, không chạy API hay trình duyệt, không đọc `.env`. Không sửa gì trong repo ngoài file này.

## Kết luận ngắn

**Sẵn sàng sau khi sửa.** Không có lỗi Critical. Có 1 lỗi Important: lần nộp đúng bị ghi vào `Submission` trước khi trả thưởng, nên nếu bước trả thưởng hỏng thì để lại một dòng nộp "Accepted" mà không có `Completion`. Phần còn lại là Minor. Năm điểm trọng tâm: bốn điểm đạt khi đọc mã (hai tab, dữ liệu test, batch hai câu, `dbo` rỗng), một điểm đạt một phần (lỗi dịch vụ giữa chừng, xem I1).

---

## 1. Phát hiện

### I1. Important: lần nộp đúng bị ghi trước khi trả thưởng, hai bước không cùng giao dịch

- Vị trí: `api/src/arcade.ts:161-162` (gọi `store.recordSubmission` rồi mới `store.complete`); `api/src/arcade-store.ts:89-107`.
- Điều gì xảy ra với học viên: nếu `complete` hỏng (mất kết nối, database ngủ lại, deadlock) thì học viên nhận lỗi 503, coin không đổi, bài chưa xong, đúng. Nhưng `Submission` đã có một dòng `Accepted = 1`, `Passed = Total`, `FailedTests = ''`. Lần sau mở lại bài, `handleChallenge` trả `lastFailed = []` và `lastSql` của lần đó, nên cả năm test hiện "Đạt" trong khi bài chưa xong và chưa có thưởng. Giảng viên đọc bảng `Submission` cũng thấy một lần nộp đạt không có `Completion` tương ứng.
- Vì sao: yêu cầu trọng tâm là "lỗi dịch vụ giữa chừng thì không ghi gì, không đổi coin". Test `stops a submit when the service fails midway` (`tests/arcade.test.ts:164`) chỉ giả lập lỗi khi chạy test (trước khi ghi), không giả lập lỗi ở `complete`. `tests/helpers/arcade-fakes.ts` cũng không có đường cho `complete` ném lỗi.
- Cách sửa ngắn: gộp thành một thao tác trong `Store` (ví dụ `submit(learner, record, reward)`) chạy một giao dịch: chèn `Submission`, nếu đạt thì chèn `Completion` và cộng coin; khi `Completion` trùng khóa (2627) thì chỉ giữ dòng `Submission`, không rollback cả giao dịch (kiểm `IF NOT EXISTS ... INSERT` trong cùng giao dịch, hoặc bắt 2627 rồi làm lại giao dịch chỉ với `Submission`). Thêm test fake cho `complete` ném lỗi và kiểm `submissions` rỗng.

### M1. Minor: số coin trả về dựa trên ảnh chụp lúc đầu request, lệch khi hai tab chạy cùng lúc

- Vị trí: `api/src/arcade.ts:163` (`coins: state.coins + reward`) và `:183` (`outcome === 'opened' ? state.coins - openCost : state.coins`).
- Điều gì xảy ra: số dư trong database đúng (khóa chính, `UPDATE ... WHERE Coins >= @cost` và `CHECK (Coins >= 0)` chặn trừ/thưởng đôi). Nhưng tab thứ hai trả về số coin cũ: ví dụ hai tab cùng mở test 3, tab thua nhận `'already'` kèm `coins = state.coins` đọc trước khi tab thắng commit, nên hiện 20 trong khi database là 10. Tải lại trang thì đúng.
- Cách sửa: để `open` và `complete` trả luôn số dư sau khi ghi (`OUTPUT inserted.Coins` hoặc `SELECT Coins` trong cùng giao dịch), hoặc `load` lại sau khi ghi.

### M2. Minor: lỗi hạ tầng có mã lỗi SQL bị tính là lỗi câu lệnh của học viên

- Vị trí: `api/src/runner.ts:80-86`.
- Điều gì xảy ra: chỉ `ETIMEOUT` và `ESOCKET/ECONNCLOSED` không có `number` được tách thành lỗi dịch vụ. Lỗi hạ tầng có `number` (ví dụ 40501 bị điều tiết, 10928/10929 hết giới hạn tài nguyên, 40613 database vừa ngủ lại, 1205 deadlock) rơi vào `error: err.message`, thành "câu lệnh bị lỗi" và bị ghi là một lần nộp trượt. Gặp hiếm, nhưng đúng loại "lỗi dịch vụ bị tính là sai". Cũng áp dụng cho lô `SET` đầu tiên (`runner.ts:50-53`), nơi lỗi không đến từ học viên.
- Chưa kiểm được: không có database để gây các lỗi này.
- Cách sửa: với đường Arcade (có `setup`), coi lô `SET` đầu và một danh sách mã lỗi tạm thời đã biết là `unavailable`. Đường bài tập cũ giữ nguyên.

### M3. Minor: phỏng đoán "free|limit" gán nhầm thành hết quota

- Vị trí: `api/src/arcade.ts:42-44` (mới), cùng mẫu cũ ở `runner.ts:25`, `core.ts:78`.
- Điều gì xảy ra: mọi thông báo lỗi chứa "limit" (ví dụ "The request limit for the database is 30 and has been reached", lỗi điều tiết tạm thời) hiện "Phần chạy bài tập tạm nghỉ đến đầu tháng sau", nói sai với học viên và làm họ bỏ buổi học. Đã có từ trước ở đường cũ, nên không chặn merge.
- Cách sửa: khớp mã lỗi hoặc cụm chữ cụ thể của gói miễn phí thay vì hai từ chung.

### M4. Minor: bộ chặn không chặn `DECLARE ... CURSOR`; trạng thái phiên có thể sót lại

- Vị trí: `src/lib/sql-guard.ts:8` (danh sách `BLOCKED`), `api/src/runner.ts:50-53`.
- Điều gì xảy ra: câu như `SELECT 1 DECLARE c CURSOR STATIC FOR SELECT 1 OPEN c` bắt đầu bằng `SELECT`, không có dấu `;`, không có từ bị chặn, và chỉ sinh một số đếm dòng nên qua cả bộ chặn lẫn kiểm `multi`. Con trỏ toàn cục tĩnh có thể sống qua `ROLLBACK` trên kết nối trong pool và làm lần chạy sau (`DECLARE c` cùng tên) lỗi. Các lệnh `SET`, `BEGIN TRAN`, `COMMIT`, `SELECT INTO`, `CREATE` đều đã bị chặn; kiểm `@TRANCOUNT` (`runner.ts:67-71`) giữ phần giao dịch.
- Chưa kiểm được: không chạy trên SQL Server nên chưa biết pool có `reset` kết nối hay con trỏ có thực sự sống sót. Chỉ ảnh hưởng chính học viên đó (một học viên), nên mức Minor.
- Cách sửa: thêm `declare`, `cursor`, `open` vào `BLOCKED` của `guardArcade` (đáp án 50 bài không dùng chúng), hoặc cho `run` gọi `sp_reset_connection` sau mỗi lần.

### M5. Minor: trạng thái lạ của khung làm bài

Đọc `src/components/islands/ArcadeWorkspace.tsx`:

- Dòng 72, 129-134: sau khi chạy hoặc nộp xong rồi sửa câu lệnh, bảng kết quả, nhãn "Đạt/Chưa đạt" ở thẻ test và câu "Đạt toàn bộ test. Bạn nhận 10 coin" vẫn nằm đó cho đến lần chạy kế tiếp, không có dấu hiệu đã cũ. Học viên sửa dở rồi liếc lại có thể tưởng bản hiện tại đã đạt. Gợi ý: xóa `submitted` (và đánh dấu `results` là cũ) trong `change`.
- Dòng 42-45: lỗi `locked` từ API chỉ hiện thông báo, không cập nhật `state.unlocked`, nên nút vẫn bật. Gặp khi trang cũ mở sau khi dữ liệu đổi; rất hiếm.
- Dòng 48-60: nếu lần tải trạng thái đầu thất bại (database ngủ quá lâu, hết quota), `state` giữ `null`: không có số coin, không có nút thử lại, chỉ dòng báo lỗi; học viên phải tải lại trang. Chấp nhận được cho MVP, nên nêu trong ghi chú bàn giao.
- Dòng 118-121: khi `state` còn `null` (chưa tải xong) hai nút Chạy và Nộp vẫn bật; bấm sớm chỉ nhận lỗi `locked` hoặc kết quả bình thường, không gây hại.
- `src/components/islands/ArcadeHome.tsx:101-123`: khi gọi `me` lỗi (database chưa dậy, hết quota), bản đồ vẫn vẽ như tiến độ bằng không ("Đang làm" ở bài 1, các bài sau khóa) bên cạnh dòng báo lỗi. Học viên đã có tiến độ có thể tưởng mất bài. Nên làm mờ bản đồ hoặc ghi rõ "chưa tải được tiến độ" khi `me` là `null` mà đang có `failure`.

### M6. Minor: kiểm `check:dist` chưa phủ hết đường rò dữ liệu hidden

- Vị trí: `scripts/check-dist.mjs:94-127, 213-230`.
- Chỉ trang riêng của bài được quét tìm giá trị hidden-only, chỉ quét chuỗi từ 4 ký tự trở lên (`textCells` bỏ số), và không quét `luyen-sql/index.html` lẫn gói JS trong `_astro/`. Đáp án và `catches` thì được quét cả `luyen-sql/` lẫn `_astro/`. Lớp bảo vệ chính là cấu trúc: `publicChallenge` (`src/lib/arcade-play.ts:30`) bỏ `answer` và chỉ giữ test `visible`, schema zod cắt khóa lạ, trang chủ chỉ đưa 5 trường. Tôi đọc cả ba và thấy đúng; kiểm `dist` chỉ là lớp thứ hai. Nên ghi vào mô tả của hàm rằng số không được quét, để không ai tin nhầm là phủ hết.

### M7. Minor: nội dung các bài, chỗ lệch quy ước 2.8 và lặp tình huống

Mẫu đọc: toàn bộ đề và đáp án của 50 bài (đã quét), không lặp lại review từng chương.

- `src/content/arcade/2-8/sinh-nhat-thang-sau.yaml`: đề ghi thẳng "dùng DATEDIFF với đơn vị month", trái "Không gợi ý trong đề" của quy ước 2.8. Cột "số ranh giới tháng từ ngày vào làm" cũng không liên quan gì đến chuyện chuẩn bị quà sinh nhật, trông như được thêm vào để buộc dùng `DATEDIFF`.
- Lặp ý nghiệp vụ giữa hai chương: `2-8/du-ba-nam.yaml` và `2-9/nhan-tham-nien.yaml` cùng dùng bảng `NhanSu`, mốc 21/10/2026 và điều kiện `DATEADD(year, 3, NgayVaoLam) <= '20261021'`; `2-8/het-han-trong-30-ngay.yaml` và `2-9/bao-cao-tong-hop.yaml` cùng bảng `HopDong`, cùng mốc 21/10/2026 và cửa sổ 30 ngày. Đứng riêng thì hợp lý (chương sau thêm `CASE`), nhưng người học cảm thấy làm lại bài cũ.
- Bảng `NhanSu` xuất hiện ở 14 trên 50 bài với mỗi lần một tập cột khác (quy ước cho phép "tự khai bảng riêng"), nên học viên phải đọc lại lược đồ mỗi bài; `UngVien` 5 bài, `KhoaHoc` 4 bài. Chấp nhận được, nhưng đa dạng hóa bảng ở chương 2-5 đến 2-7 sẽ đỡ đơn điệu.
- Quy ước 2.8 viết "`ordered: true` thì sắp xếp phải có tiêu chí phụ để không hòa", nhưng `2-4/xep-theo-ten-khoa.yaml` và `2-4/don-moi-nhat-truoc.yaml` không có tiêu chí phụ mà ghi trong đề rằng giá trị không trùng. Đề đúng và `check:arcade` đã đảo thứ tự chèn mà vẫn đạt, nhưng câu trong quy ước nên sửa thành "hoặc đề nói rõ giá trị không trùng".
- Nhịp độ khó nhìn chung đều: mỗi chương bắt đầu Dễ rồi lên Vừa, Khó ở cuối chương, tổng 20/20/10 đúng bảng 2.8. Chương 2-1 có 1 bài Vừa (`doi-chieu-tam-ung`) chỉ để chọn bốn cột có tên gần nhau; chấp nhận được vì bẫy nằm ở đọc đề.
- Kiểm kiểu cột: cả 50 bài chỉ dùng `varchar`, `nvarchar`, `date`, `decimal` đúng quy ước; không từ khóa chưa dạy nào ở đáp án (không `<>`, `!=`, `NOT`, `YEAR`, `REPLACE`, phép tính số).

### M8. Minor: tài liệu và quy trình chưa khớp hoàn toàn

- `README.md:163` (bảng Deploy): hàng `deploy-api.yml` chưa liệt kê các đường dẫn mới (`src/content/arcade/**`, `src/data/arcade.ts`, `src/lib/arcade-*.ts`) mà workflow đã có.
- README mục "An toàn dữ liệu": đã có dòng về hai user của `arcade`, nhưng chưa nói Arcade chỉ nhận `SELECT`/`WITH` và giới hạn 5 giây mỗi test (khác 10 giây của bài tập). Spec 9.2 và 9.3 có.
- Spec 9.6 gọi hàm là `publicChallenges()`, mã dùng `publicChallenge` (số ít, `src/lib/arcade-play.ts`).
- `.github/workflows/deploy-api.yml`: bước kiểm sau deploy chỉ gọi `/ping`, nên nếu route Arcade không nạp được (lỗi đường dẫn trong `app.http`) thì workflow vẫn xanh. Có thể thêm một lần gọi `arcade/me` không mã và đòi 401.
- Thứ tự vận hành khi merge vào `main`: `deploy.yml` (web) và `deploy-api.yml` chạy song song. Cần đặt năm biến `ARCADE_*` trên Function App trước khi merge, nếu không trang Luyện SQL lên web nhưng mọi đầu gọi Arcade trả 503 (API vẫn khởi động bình thường, xem mục 2.4).
- Database `arcade` thật hiện còn các hồ sơ do kiểm nghiệm để lại (các mã thử trong ghi chú nghiệm thu của `progress.md`, có hồ sơ đã làm 50/50 và 920 coin, cộng hồ sơ ngẫu nhiên của `check:arcade:store`). Nên dọn hoặc đổi mã truy cập thật trước khi giao cho học viên, để không ai vô tình dùng lại mã thử.

---

## 2. Đã xác nhận bằng cách đọc

### 2.1 Năm điểm trọng tâm

| Điểm | Kết quả | Căn cứ |
|---|---|---|
| Hai tab cùng mở một test hoặc cùng nộp đúng chỉ trừ/thưởng một lần | Đạt (số dư), lệch số hiển thị (M1) | `open`: `INSERT OpenedTest` trước, `UPDATE ... Coins >= @cost` sau, khóa chính hai tab chờ nhau, tab thua nhận 2627 thành `'already'` (`arcade-store.ts:19-20, 45-57, 109-118`); `complete`: khóa chính `(LearnerId, ChallengeId)` (`arcade-store.ts:98-107`); `CHECK (Coins >= 0)` làm lưới đỡ. Không có khóa chéo bất lợi (mọi giao dịch chèn bảng con rồi mới cập nhật `Learner`, cùng thứ tự). `api/src/check-arcade-store.ts` kiểm cả hai tình huống trên database thật; tôi không chạy. |
| Dữ liệu test có tiếng Việt, nháy đơn, NULL, ngày, số thập phân | Đạt khi đọc | `sqlLiteral` (`arcade-sql.ts:10-15`): `NULL`, số, boolean, chuỗi nhân đôi `'`, tiền tố `N` theo kiểu cột (`nchar/nvarchar`); dựng `CREATE TABLE` và `INSERT` cùng một lô (hợp lệ nhờ phân giải tên trễ) và tách mỗi 1000 dòng. Tôi quét 50 YAML: không có chữ ngoài ASCII trong cột `varchar`, mọi giá trị cột `date` đều dạng `yyyy-mm-dd`, không có `NULL` trong cột `NOT NULL`, số thập phân đều là số hữu hạn. Chưa chạy trên SQL Server. |
| Batch hai câu không có dấu chấm phẩy bị từ chối cả lượt | Đạt | `runTests` trả `fail('multi')` khi `affected.length > 1` ở bất kỳ test nào (`arcade.ts:91`), trước `recordSubmission`; có test (`tests/arcade.test.ts:172`). Giới hạn đã biết: chỉ bắt được khi cả hai câu đều sinh số đếm dòng; nếu câu thứ hai lỗi lúc chạy thì lô đó là "câu lệnh bị lỗi", và câu thứ hai chỉ là `DECLARE`/không sinh số đếm thì qua. Cả hai không gây hại. |
| Lỗi dịch vụ giữa chừng không ghi, không đổi coin | Đạt một phần | Đạt cho lỗi trong lúc chạy test (`arcade.ts:90`: mọi `errorKind` trừ `timeout` dừng cả lượt, `shown` không ảnh hưởng); trượt ở lỗi sau khi đã chạy xong (I1). |
| `dbo` rỗng trước và sau | Đạt khi đọc | Dữ liệu dựng trong cùng giao dịch với câu học viên, `finally` luôn `rollback` (`runner.ts:87-90`), `XACT_ABORT ON`; lỗi dựng dữ liệu (không phải 1222) báo `unavailable` và ghi `ALERT`. `check:arcade` kiểm số bảng trong `dbo` trước và sau (`check-arcade.ts:31-37, 55-66`). Tôi không chạy. |

### 2.2 Học viên có chạm được thứ không được chạm không

- `arcade_runner` chỉ có `CREATE TABLE`, `ALTER/SELECT/INSERT` trên `dbo`; không có quyền gì trên schema `arcade`, và là người dùng của database `arcade` nên không với được `HRM_Demo` (`database/arcade-setup.sql:43-45`; spike ghi lỗi 229 khi đọc `arcade.Learner`). `arcade_store` chỉ `SELECT/INSERT/UPDATE` trên `arcade`, không `CREATE`, không `DELETE`. Hai kết nối, hai pool riêng (`arcade-config.ts:16-20`).
- Bộ chặn `guardArcade` (`sql-guard.ts:101-105`): chỉ `SELECT`/`WITH`, chặn `INSERT/UPDATE/DELETE`, `SET` riêng, `SELECT INTO`, `;`, `COMMIT/ROLLBACK/BEGIN TRAN/SAVE/EXEC/USE/GO/CREATE/ALTER/DROP/...`, chuỗi/tên/chú thích được gỡ trước khi so từ, và DB nhận đúng văn bản đã chuẩn hóa (`normalizeSql`). Dù bộ chặn sót, quyền `dbo`-only và rollback giữ phần còn lại.
- Pool: mỗi lần chạy mở bằng lô `SET XACT_ABORT ON; LOCK_TIMEOUT 3000; ROWCOUNT 5001; NOCOUNT OFF; NOEXEC OFF; PARSEONLY OFF; FMTONLY OFF; IMPLICIT_TRANSACTIONS OFF` và sau câu học viên kiểm `@@TRANCOUNT = 1`, nên giao dịch mở dở hay `SET` còn sót không sang lần sau; ngoại lệ có thể là con trỏ (M4).

### 2.3 Dữ liệu hidden, `answer`, `catches` có tới trình duyệt không

- `publicChallenge` (`arcade-play.ts:30-37`) tách `answer`, bỏ `tests` ẩn khỏi mảng, chỉ để lại `hiddenTests: number[]`; zod `z.object` cắt khóa thừa nên trường lạ trong YAML không lọt qua `...rest`. Trang chủ chỉ nhận `{id, chapter, order, title, difficulty}`.
- `resultOf` (`arcade.ts:74-83`): test chưa mở chỉ trả `{id, shown: false, passed}`; không có `reason`, `error`, `ms`, số dòng; `verdictOf` chỉ tính `reason` và nó bị bỏ khi `shown = false`. Text lỗi SQL không bao giờ ra ngoài với test chưa mở. `reason` của `compareResults` chỉ nêu vị trí dòng và tên cột lệch, không nêu giá trị đáp án.
- `handleOpen` (`arcade.ts:167-185`): kiểm kiểu, mã, bài, test phải ẩn (`!t.visible`), bài đã mở khóa, rồi mới trừ coin; thiếu coin thì không trả dữ liệu. `handleChallenge` chỉ trả test đã mở. `guarded` trả `unavailable` không kèm thông báo lỗi gốc.
- `lastFailed` lộ đạt/trượt từng test ẩn theo id. Đó là thiết kế đã duyệt (xem mục 4).

### 2.4 Đường bài tập cũ

- `core.ts`: chỉ thêm kiểu (`'rate'`, `locked`, `not-enough-coins`) và `export` cho `Reply`, `SHOWN_ROWS`, `GRADED_ROWS`, `fail`; không đổi nhánh nào.
- `runner.ts`: tham số `setup` tùy chọn; khi không truyền thì đường chạy y như trước (cùng thứ tự, cùng xử lý lỗi).
- `sql-guard.ts`: `guardExercise` được tách thành `inspect` dùng chung; cùng thứ tự kiểm, cùng thông báo, kết quả cũ không đổi (test cũ vẫn xanh).
- `exercise-client.ts`: `createExerciseClient` bọc `createApiCaller`; hành vi của `ping`/`run`/`grade` giữ nguyên. `exercise-storage.ts` chỉ thêm khóa nháp Arcade. `ExerciseWorkspace.tsx` không đổi.

### 2.5 Khởi động trên Azure và đóng gói

- `api/src/index.ts`: `arcadeServices(process.env)` là lazy (`arcade-config.ts:29`), thiếu biến `ARCADE_*` thì chỉ năm đầu gọi Arcade trả 503 (`guarded` bắt lỗi), `ping/run/grade` không bị ảnh hưởng; có test (`tests/arcade-config.test.ts`, `tests/arcade.test.ts:193`).
- `loadChallenges()` đọc `dist/arcade.json` lúc nạp module. `build.mjs` luôn ghi file này (mảng rỗng nếu không có thư mục), nên không thể thiếu sau khi build. Nếu file thiếu thì cả API (cả bài tập cũ) sẽ không nạp; rủi ro chỉ khi ai đó đóng gói không qua `build.mjs`.
- `api/.funcignore` chỉ loại `/src`, `/tsconfig.json`, `/build.mjs`, `/local.settings.json`, nên `dist/arcade.json` được gửi lên. Mã Arcade được esbuild gộp (`../../src/data/arcade`, `../../src/lib/arcade-*` nằm trong bundle), nên không phụ thuộc thư mục `src` ở Azure. `mssql` vẫn là gói ngoài như cũ.
- `deploy-api.yml`: `paths` đã thêm `src/content/arcade/**`, `src/data/arcade.ts`, `src/lib/arcade-*.ts`; `sql-guard.ts`, `grade.ts`, `exercise-types.ts` đã có sẵn. `src/lib/arcade-*.ts` rộng hơn mức API cần (cả `arcade-view`, `arcade-schema`, `arcade-client`) nhưng chỉ gây deploy thừa.

### 2.6 Nhất quán giữa mã, tài liệu và nội dung

- `ARCADE_CHAPTERS` (5, 6, 7, 5, 5, 4, 6, 6, 6) khớp 50 file; phân bố độ khó 20/20/10 khớp quy ước 2.8; mỗi bài có 2 unit test và 3 hoặc 4 hidden test.
- Hiển thị: `ArcadeWorkspace` chặn bấm khi `busy`, `go` thoát sớm khi đang chạy, F5 và Ctrl+Enter dùng chung `go`, nút "Mở test" khóa khi đang mở và hiện giá/số dư trước khi trừ, mã sai thì xóa mã và hỏi lại, bài chưa mở thì hiện thông báo và khóa hai nút.

---

## 3. Chưa kiểm được

- Mọi hành vi trên SQL Server thật: khóa tên bảng giữa hai tab (spec dựa vào lỗi 1222), con trỏ qua `ROLLBACK`, tốc độ thật sau deploy (spec 14 ghi 1,09 giây một vòng từ máy phát triển, chủ đã biết), `check:arcade` đạt 50/50.
- Cấu hình thật trên Azure: biến môi trường, CORS của Function App cho header `x-access-code` trên đầu gọi GET, quyền OIDC.
- Giao diện trong trình duyệt (bố cục, bàn phím, độ rộng 390 px); tôi chỉ đọc mã và CSS không đọc kỹ. Ghi chú nghiệm thu trong `progress.md` nói đã làm, tôi không kiểm lại.
- Mã truy cập, `.env` và bảng `arcade.*` thật.

## 4. Đã cân nhắc và để ngoài phạm vi

1. Chỉ một học viên, không hàng đợi: đã duyệt; vì thế trùng tên bảng giữa hai người dùng cùng lúc (`CREATE TABLE dbo.X` chặn nhau) không xét.
2. Dữ liệu hidden test nằm trong repo public và `lastFailed`/kết quả nộp cho biết từng test ẩn đạt hay trượt (có thể dò dần dữ liệu bằng câu nộp): đã duyệt, README ghi rõ.
3. Một mã truy cập là một học viên; `LearnerId` là SHA-256 không muối của mã (người đọc được bảng có thể dò mã yếu): đã duyệt "một mã = một học viên", chỉ ghi chú.
4. Mở khóa tuần tự nghiêm ngặt, kể cả trang bài chưa mở vẫn hiện đề và unit test công khai ở web tĩnh: đã duyệt; chỉ API chặn chạy và mở test.
5. Tiêu đề cột không chấm; `catches` được dùng từ khóa chưa dạy (ví dụ `TOP`, `DISTINCT`, `IS NOT NULL` ở chương 2-1): đã duyệt.
6. Thanh trên cùng tràn ngang dưới 1024 px trên mọi trang: ghi trong `progress.md` (Task 12) là đã báo chủ và để nguyên.
7. Hai tài khoản SQL dùng chung một mật khẩu (Task 1): ghi trong `progress.md` là đã báo chủ; không phải lỗi mã.
8. `check:arcade` không chạy trong CI vì cần database thật: giống `check:exercises`, theo thiết kế; đã nêu ở README.
9. Tài nguyên: một truy vấn quá nặng trong 5 giây, chuỗi rất dài (`REPLICATE`) trong bộ nhớ Node: cùng mức rủi ro với đường bài tập cũ, giới hạn 5 giây và `ROWCOUNT 5001` đã có. Không xét thêm.
10. Độ trễ khoảng sáu vòng mạng mỗi test (năm test: vài giây mỗi lần nộp): chủ đã biết (Task 1), đo lại sau deploy.
11. Nội dung từng bài (đúng/sai của đề, `expected`, `catches`): đã có review theo chương trong `docs/reviews/2026-11-03-arcade-*`; tôi chỉ đọc mẫu để tìm lệch quy ước và nhịp độ.
12. `premium-audit.json` chưa theo dõi ở gốc repo: không thuộc nhánh này.

## 5. Kết luận

**Sẵn sàng sau khi sửa.** Sửa I1 (gộp ghi lần nộp và trả thưởng vào một thao tác, thêm test lỗi ở `complete`) trước khi merge. Nên làm cùng lúc M1 (trả số dư thật), phần tài liệu M8 và đặt biến `ARCADE_*` trên Function App trước khi push `main`. Các mục còn lại ghi nhận và có thể làm sau.
