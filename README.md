# SQL Server – khóa học trên web

Khóa học Microsoft SQL Server cho người cần đọc hiểu, truy vấn và phân tích dữ liệu. Mỗi bài gắn với một việc quen thuộc trong Excel. Mọi ví dụ chạy trên `HRM_Demo`, một database nhân sự giả lập.

Web: https://nhatlam1111.github.io/microsoft-sql-lession/

## Trên web có gì

- **Mindmap** 8 mảng kiến thức làm trang chủ. Bấm vào một bài thì drawer tóm tắt bài mở ra; nút "Menu khóa học" mở danh sách bài.
- **51 bài, 6 level.** Bài 1.1–1.6, 2.1, 3.5 và 6.5 viết đầy đủ, các bài còn lại là bản tóm tắt. Bài đầy đủ có tình huống, đối chiếu Excel, câu lệnh tô màu kiểu SSMS và kết quả từ `HRM_Demo`.
- **Popup "Lộ trình của bạn"** và trạng thái từng bài (chưa học, đã xem, đã học, cần xem lại). Tiến độ lưu trong trình duyệt và xuất/nhập được bằng file JSON.
- **Sơ đồ thứ tự chạy câu lệnh** (bài 3.5): từng bước SQL Server làm, mỗi bước có drawer giải thích và bảng dữ liệu sau bước đó.
- **Bài tập chạy SQL trên database thật** (bài 1.6, 2.1, 3.5 và 6.5): viết câu lệnh, chạy (F5), nộp bài và biết đúng hay chưa. Trang có popup sơ đồ database. Mọi lần chạy đều nằm trong một transaction rồi `ROLLBACK`, nên dữ liệu không đổi. Muốn chạy cần mã truy cập, xin người phụ trách khóa học. Bài tập không có gợi ý và không có nút xem đáp án. Bộ chấm không so tên cột; bài 2.1 nhắc học viên tự đối chiếu tiêu đề alias với đề.
- **Script `HRM_Demo.sql`** tải được từ trang Giới thiệu.

## Công nghệ

| Phần | Dùng gì |
|---|---|
| Web | Astro 5 (trang tĩnh, MDX), React 19 cho các phần tương tác, React Flow cho mindmap |
| Kiểm thử | Vitest 3, `astro check`, `scripts/check-dist.mjs` (kiểm bản build) |
| API bài tập | Azure Functions (Flex Consumption, Node.js 24, mô hình v4), `mssql`, đóng gói bằng esbuild |
| Database | Azure SQL Database `free-sql-db-8797714` trên máy chủ `sql-lession` (serverless, gói miễn phí) |
| Deploy | GitHub Actions: GitHub Pages cho web; OIDC + `Azure/functions-action` cho API |

## Cấu trúc thư mục

```
src/
  content/lessons/      bài học (.mdx), mỗi bài một file
  content/exercises/    bài tập (.yaml), mỗi bài học một file
  components/lesson/    khối dùng trong bài: Sql, Result, Excel, RunFlow, Memo, Exercises…
  components/islands/   phần React: mindmap, popup lộ trình, sidebar, khung làm bài, sơ đồ database
  lib/                  logic thuần: tiến độ, bộ chặn lệnh, chấm bài, tô màu T-SQL…
  pages/                trang chủ, trang bài, trang bài tập, giới thiệu, 404, file HRM_Demo.sql
api/                    API bài tập (Azure Functions), có package.json riêng
database/               HRM_Demo.sql, checksum chuẩn của 7 bảng, script tạo user cho API
scripts/check-dist.mjs  kiểm bản build: link, trang bài, trang bài tập, không lọt đáp án
tests/                  test Vitest
docs/superpowers/       spec, plan và mockup của từng đợt
```

## Chạy trên máy

Cần Node.js 22 trở lên.

```bash
npm ci
```

```bash
npm run dev
```

Web chạy ở http://localhost:4321/microsoft-sql-lession/.

| Lệnh | Làm gì |
|---|---|
| `npm run dev` | Chạy web ở chế độ phát triển |
| `npm test` | Chạy toàn bộ test |
| `npm run check` | Kiểm kiểu (`astro check`) |
| `npm run build` | Build ra `dist/` |
| `npm run check:dist` | Kiểm bản build: link không gãy, đủ trang bài và trang bài tập, không có câu đáp án nào trong `dist/` |
| `npm run preview` | Xem bản build |

### Chạy API bài tập trên máy

API trên máy đọc kết nối database từ file `.env` ở thư mục gốc (file này không được commit). Có thể dùng `SQL_SERVER`, `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD`, hoặc `url`/`user`/`password` theo kiểu JDBC mà MCP `azure-sql` đang dùng. `ACCESS_CODES` là tùy chọn; không đặt thì mã truy cập là `dev`.

```bash
npm --prefix api ci
```

```bash
npm --prefix api run build
```

```bash
npm --prefix api run dev
```

API chạy ở http://127.0.0.1:7071/api. Khi chạy `npm run dev`, web tự gọi địa chỉ này (đặt trong `.env.development`).

| Lệnh trong `api/` | Làm gì |
|---|---|
| `npm run typecheck` | Kiểm kiểu bằng `tsc` |
| `npm run build` | Đóng gói API và đề bài kèm đáp án vào `dist/` |
| `npm run check:exercises` | Chạy mọi câu đáp án và câu kiểm tra trên database thật (có `ROLLBACK`), báo câu lỗi hoặc ra 0 dòng |
| `npm run check:data` | So checksum 7 bảng với `database/HRM_Demo.checksums.json`, báo bảng nào lệch |

## Database mẫu `HRM_Demo`

- 7 bảng: `PhongBan`, `ChucDanh`, `NhanVien`, `HopDong`, `ChamCong`, `DonNghiPhep`, `BangLuong`. Dữ liệu hoàn toàn giả: 48 nhân viên, 6 phòng ban, chấm công tháng 9/2026, lương kỳ 2026-08 và 2026-09.
- Chạy được trên SQL Server 2019 trở lên và Azure SQL Database. Script không có `USE` hay `CREATE DATABASE`. Trên máy riêng, tạo database tên `HRM_Demo`, mở script trong SSMS rồi chạy.
- Chạy lại nhiều lần được: script chỉ xóa và tạo lại đúng 7 bảng của nó.
- File lưu UTF-8 có BOM để SSMS và `sqlcmd` đọc đúng chữ tiếng Việt.
- Câu lệnh và kết quả trong bài phải khớp với script này. Sửa script thì sơ đồ database trên trang bài tập tự đổi theo, vì sơ đồ được sinh lúc build.

## Viết bài học

Khung bài chép ra là viết được: [`docs/lesson-template.md`](docs/lesson-template.md).

Mỗi bài là một file `src/content/lessons/<số>-<slug>.mdx`, ví dụ `3-5-left-join.mdx`. Frontmatter gồm:

| Trường | Ý nghĩa |
|---|---|
| `num` | Số bài, ví dụ `"3.5"` |
| `title`, `shortTitle` | Tên bài và tên ngắn (tối đa 28 ký tự) cho sidebar và mindmap |
| `level`, `area` | Level 1–6 và mảng kiến thức `A1`–`A8` |
| `kind`, `minutes` | `full` hoặc `summary`; số phút đọc |
| `prerequisites` | Các bài cần biết trước |
| `goal`, `excel`, `summary` | Học xong làm được gì, liên hệ Excel, đoạn tóm tắt hiện trong drawer |
| `noExercises` | `true` khi bài không có mục "Bài tập" (bài 1.1–1.5) |

- Bài đầy đủ có các mục theo thứ tự: Tình huống, Với Excel, Làm bằng SQL, Hay nhầm ở đâu, Ứng dụng, Ghi nhớ, Bài tập. Bản tóm tắt có: Nội dung chính, Liên hệ Excel, Tình huống ví dụ, Bài tập. Bài có `noExercises: true` thì không có mục Bài tập.
- "Làm bằng SQL" mở đầu bằng `### Lý thuyết cơ bản`; bài có sơ đồ thứ tự chạy thì kết thúc bằng `### Câu lệnh cho tình huống` rồi `### SQL Server chạy câu này thế nào`. Không viết tiểu mục "Bước 1, Bước 2…".
- Trong MDX dùng thẳng các khối `Sql`, `Result`, `Messages`, `Excel`, `Chat`, `Key`, `LineMap`, `Mistakes`, `Apply`, `Memo`, `Exercises`, `RunFlow`, `Ssms` (mô phỏng SSMS), `Erd` (sơ đồ quan hệ), không cần import.
- Quy tắc viết: xưng "bạn"; dùng "kết bảng" cho `JOIN`; chuỗi tiếng Việt trong SQL có `N`; không nhắc vai trò hay xuất thân của người đọc. `npm test` kiểm phần lớn các quy tắc này.

## Viết bài tập

Mỗi bài học có bài tập thì có một file `src/content/exercises/<slug-bài-học>.yaml`:

```yaml
lesson: 3-5-left-join
exercises:
  - id: 3-5-1                 # <số bài>-<thứ tự>
    title: IT chưa có hợp đồng
    summary: Một câu nói cần làm gì
    prompt: Đề bài đầy đủ
    columns: [MaNV, HoTen, NgayVaoLam]
    ordered: true             # có chấm thứ tự dòng hay không
    kind: query               # query (truy vấn) hoặc change (sửa dữ liệu)
    answer: SELECT …          # câu đáp án, chỉ đóng gói vào API
    # check: SELECT … ORDER BY …   bắt buộc với kind: change
```

- Câu đáp án và câu kiểm tra chỉ được đóng gói vào API. `check:dist` báo lỗi nếu tìm thấy chúng trong `dist/`. Repo đang public, nên ai đọc repo vẫn thấy đáp án; điều này đã được chấp nhận.
- Bài truy vấn chấm theo giá trị: không so tên cột, so thứ tự dòng chỉ khi `ordered: true`, số `9610000` và `9610000.0` coi là bằng nhau. Bài sửa dữ liệu so số dòng bị ảnh hưởng trước, rồi so kết quả câu kiểm tra (câu này lấy mọi dòng của bảng bị sửa, có `ORDER BY`). Khi sai, lý do chỉ ra dòng và cột lệch, không bao giờ đưa giá trị của đáp án.
- Trước khi push, chạy `npm --prefix api run check:exercises` để chắc mọi đáp án chạy được trên database thật.

## Deploy

| Workflow | Khi nào chạy | Làm gì |
|---|---|---|
| `deploy.yml` | Mọi lần push vào `main`, hoặc bấm tay | `npm ci`, `npm run check`, `npm test`, build (đọc `PUBLIC_EXERCISE_API`), `check:dist`, đẩy lên GitHub Pages |
| `deploy-api.yml` | Push vào `main` có đổi `api/`, bài tập, `src/lib/sql-guard.ts`, `grade.ts`, `exercise-types.ts`; hoặc bấm "Run workflow" | Test, `typecheck`, build API, đăng nhập Azure bằng OIDC, deploy lên Function App, rồi gọi thử `/api/ping` không kèm mã (phải ra 401) |

Cấu hình cần có (giá trị do người phụ trách tự điền, không nằm trong repo):

- GitHub → Settings → Secrets and variables → Actions: secret `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`; variable `AZURE_FUNCTIONAPP_NAME`, `PUBLIC_EXERCISE_API`.
- Function App → Environment variables: `SQL_SERVER`, `SQL_DATABASE`, `SQL_USER` (`hrm_practice`), `SQL_PASSWORD`, `ACCESS_CODES` (các mã cách nhau bởi dấu phẩy).
- Federated credential của identity phải khớp đúng chuỗi subject GitHub gửi. Repo này gửi dạng có ID: `repo:nhatlam1111@25176629/microsoft-sql-lession@1423314136:ref:refs/heads/main`.

## An toàn dữ liệu

- API dùng user `hrm_practice`, chỉ có `SELECT`, `INSERT`, `UPDATE`, `DELETE` trên 7 bảng (`database/practice-user.sql`).
- Bộ chặn lệnh chạy trước khi câu lệnh tới database. Câu phải bắt đầu bằng `SELECT`, `WITH`, `INSERT`, `UPDATE` hoặc `DELETE`. Các lệnh như `DROP`, `COMMIT`, `EXEC`, `SET` hay `SELECT … INTO` bị chặn, và mỗi lần chỉ chạy một câu.
- Mỗi lần chạy là một transaction có `XACT_ABORT`, `LOCK_TIMEOUT 3000` và `ROWCOUNT 5001`, và luôn `ROLLBACK`. Câu lệnh chạy quá 10 giây thì bị dừng. Mỗi mã truy cập gọi tối đa 30 lần mỗi phút.
- Mọi đầu gọi của API đều cần mã truy cập, thiếu hoặc sai mã thì trả 401. Trình duyệt chỉ gọi được API từ web này và từ `localhost:4321` (CORS).
- Nếu `npm --prefix api run check:data` báo lệch, chạy lại `database/HRM_Demo.sql`.
- Không commit mật khẩu, mã truy cập hay secret. `.env` và `api/local.settings.json` đã nằm trong `.gitignore`.

## Tài liệu thiết kế

| Đợt | Spec | Plan |
|---|---|---|
| 1. Website và 51 bài | [site design](docs/superpowers/specs/2026-10-17-sql-server-course-site-design.md) | [plan](docs/superpowers/plans/2026-10-17-sql-server-course-site.md) |
| 2. Sơ đồ thứ tự chạy, bài tập, bài đầy đủ | [phase 2 design](docs/superpowers/specs/2026-10-18-step-flow-exercises-full-lessons-design.md) | [plan phần A và chạy thử](docs/superpowers/plans/2026-10-18-run-flow-and-runner-spike.md) |
| 2B. Bài tập chạy SQL trên web | [spec B](docs/superpowers/specs/2026-10-18-exercise-runner-design.md) (mục 12: hiện trạng) | [plan](docs/superpowers/plans/2026-10-18-exercise-runner.md) |

Phần C đã có đầy đủ Level 1 và bài 2.1; tiếp tục viết bài theo từng level. Bài có câu lệnh có bài tập, còn bài khái niệm 1.1–1.5 có câu tự kiểm tra.

Review độc lập bài 2.1: [bản review](docs/reviews/2026-10-20-bai-2-1.md). Các mục đã sửa, quyết định giữ nguyên và giới hạn kiểm live database được ghi trong spec đợt 2, mục 11.
