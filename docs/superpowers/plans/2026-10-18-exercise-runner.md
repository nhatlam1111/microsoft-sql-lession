# Bài tập chạy SQL trên web: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Học viên làm bài tập trên trang riêng: viết SQL, chạy trên `sql-lession` qua một API có `ROLLBACK`, nộp bài và biết đúng hay chưa; có popup sơ đồ database; 5 bài tập mẫu ở bài 3.5 và 6.5.

**Architecture:** Logic thuần (bộ chặn lệnh, chấm bài, định dạng giá trị, đọc sơ đồ, kiểu dữ liệu API) nằm ở `src/lib/`, không phụ thuộc Astro, để web, test và API dùng chung. API là Azure Functions (Node.js, mô hình v4) trong `api/`: phần lõi (`core.ts`) gồm các handler nhận phụ thuộc từ ngoài vào nên test được không cần Azure; `index.ts` gắn chúng vào Azure; một dev server dùng cùng lõi để thử trên máy. Web thêm trang `/bai/<slug>/bai-tap/<n>/` với một React island làm khung làm bài.

**Tech Stack:** Astro 5, React 19, TypeScript, Vitest 3; API: Node.js 22, `@azure/functions` v4, `mssql` 12, esbuild; GitHub Actions (OIDC, `azure/login`, `Azure/functions-action`); Azure CLI.

**Spec:** [docs/superpowers/specs/2026-10-18-exercise-runner-design.md](../specs/2026-10-18-exercise-runner-design.md) (spec B), nền là [spec đợt 2, mục 5](../specs/2026-10-18-step-flow-exercises-full-lessons-design.md) và [kết quả chạy thử](../specs/2026-10-18-exercise-runner-spike-results.md). Code chạy thử tham khảo: nhánh `spike/exercise-runner` (`spike/guard.mjs`, `run.mjs`, `grade.mjs`, `snapshot.mjs`).

## Global Constraints

- Không gợi ý, không xem đáp án. Câu đáp án và câu kiểm tra không được có trong trang hay file nào của `dist/`.
- API trên Azure không dùng tài khoản quản trị; dùng user `hrm_practice` chỉ có `SELECT`, `INSERT`, `UPDATE`, `DELETE` trên 7 bảng.
- Mọi lần chạy câu của học viên hay câu đáp án: một transaction, `SET XACT_ABORT ON; SET LOCK_TIMEOUT 3000;`, luôn `ROLLBACK`.
- Giới hạn: câu lệnh 10 giây; kết nối 90 giây; tối đa 200 dòng hiển thị; tối đa 5.000 dòng khi chấm; câu dài tối đa 4.000 ký tự; 30 lần gọi mỗi phút mỗi mã.
- Mã truy cập trong header `x-access-code`; cài đặt `ACCESS_CODES` là danh sách cách nhau bởi dấu phẩy.
- CORS chỉ cho `https://nhatlam1111.github.io` và `http://localhost:4321`.
- Azure: Flex Consumption, Australia East, Node.js 22 (không có thì 20), 512 MB, không bật Always Ready, Zone redundancy tắt.
- Người dựng không nhập, không đọc và không ghi vào repo mật khẩu SQL, mã truy cập hay secret; người làm khóa học tự điền. Hỏi lại người làm khóa học trước mỗi lệnh `az` tạo hoặc sửa tài nguyên.
- Giao diện tiếng Việt; câu chữ hiển thị đúng như spec B mục 3; link đi qua base `/microsoft-sql-lession/`.
- SQL trong file bài tập: chuỗi tiếng Việt có `N`.
- Không làm hỏng cái đang chạy: 119 test hiện có vẫn qua; `npm run build` và `npm run check:dist` vẫn OK.

## Review Focus

1. Database đang ngủ khi học viên bấm Chạy lần đầu: sau 3 giây hiện câu "Đang khởi động database…", rồi vẫn nhận được kết quả (trình duyệt không tự hủy trước 120 giây) (Task 5).
2. Học viên nhấn F5 trong khung soạn: chạy câu lệnh, không tải lại trang; Tab chèn 4 dấu cách chứ không nhảy ra khỏi khung (Task 7).
3. Câu đúng nhưng khác kiểu số (`9610000` với `9610000.0`, `DECIMAL(4,1)` `0.5` với `0.50`) hoặc khác tên cột vẫn được chấm đúng (Task 2).
4. Trình duyệt chặn lưu trữ (ẩn danh, bị chặn cookie): trang làm bài vẫn chạy, chỉ không nhớ câu dở và mã (Task 5).
5. Câu đáp án lọt vào `dist/` qua props của island hay JSON của build: `check:dist` phải bắt được (Task 8).

---

### Task 1: Bộ chặn lệnh dùng chung (`src/lib/sql-guard.ts`)

**Files:**
- Create: `src/lib/sql-guard.ts`, `tests/sql-guard.test.ts`

**Interfaces:**
- Produces:
  - `sanitize(text: string): string` — chép từ `mcp-azure-sql/readonly.js`: chuỗi `'…'` thành `''`, tên `[…]`/`"…"` thành `[]`, chú thích `--` và `/* */` (lồng nhau) thành dấu cách; chưa đóng thì `throw`.
  - `type GuardResult = { ok: true } | { ok: false; reason: string }`
  - `guardExercise(text: string): GuardResult`

- [ ] **Step 1: Viết test hỏng**

```ts
const blocked = (s: string) => { const g = guardExercise(s); return g.ok ? null : g.reason; };
it('accepts one statement that starts with SELECT, WITH, INSERT, UPDATE or DELETE', () => {
  for (const s of ["SELECT N'COMMIT' AS x", 'SELECT 1;', "UPDATE BangLuong SET PhuCap = 1 WHERE MaNV IN (SELECT MaNV FROM NhanVien)",
    "WITH x AS (SELECT 1 AS a) INSERT INTO PhongBan (MaPB, TenPB) SELECT 'X', N'Y' FROM x", "INSERT INTO PhongBan (MaPB, TenPB) VALUES ('X', N'Y')"])
    expect(blocked(s), s).toBeNull();
});
it('explains every refusal', () => {
  expect(blocked('')).toBe('Chưa có câu lệnh nào.');
  expect(blocked('SELECT ' + 'a'.repeat(4000))).toBe('Câu lệnh dài quá 4.000 ký tự.');
  expect(blocked("SELECT 'abc")).toBe('Có chuỗi hoặc chú thích chưa đóng.');
  expect(blocked('SELECT 1; COMMIT')).toBe('Mỗi lần chỉ chạy một câu lệnh.');
  for (const s of ['COMMIT', '/* x */ DROP TABLE NhanVien', 'EXEC sp_who', "WAITFOR DELAY '00:00:05'"])
    expect(blocked(s), s).toBe('Bài tập chỉ nhận câu bắt đầu bằng SELECT, WITH, INSERT, UPDATE hoặc DELETE.');
  expect(blocked("SELECT 1 WAITFOR DELAY '00:00:01'")).toBe('Lệnh WAITFOR không dùng được trong bài tập.');
  expect(blocked('SELECT 1 COMMIT')).toBe('Lệnh COMMIT không dùng được trong bài tập.');
  expect(blocked('UPDATE NhanVien SET HoTen = HoTen BEGIN TRAN')).toBe('Lệnh BEGIN TRAN không dùng được trong bài tập.');
  expect(blocked('SELECT * INTO X FROM NhanVien')).toBe('SELECT … INTO tạo bảng mới nên không dùng được trong bài tập.');
});
```

- [ ] **Step 2: `npx vitest run tests/sql-guard.test.ts`, kỳ vọng FAIL vì chưa có module**
- [ ] **Step 3: Viết `sql-guard.ts`**

Thứ tự kiểm: rỗng; dài hơn 4.000 ký tự (đếm trên câu gốc); `sanitize` lỗi; bỏ `;` ở cuối, còn `;` thì nhiều câu; từ đầu tiên; từ khóa bị chặn (danh sách và regex của `spike/guard.mjs`, tên lệnh trong lý do viết hoa, `begin tran`/`begin transaction` ghi là `BEGIN TRAN`); bỏ mọi cụm `insert into` rồi còn từ `into` thì là `SELECT … INTO`.

- [ ] **Step 4: Chạy lại test, kỳ vọng PASS; `npm test` toàn bộ PASS**
- [ ] **Step 5: Commit** — `git add src/lib/sql-guard.ts tests/sql-guard.test.ts && git commit -m "add the shared statement guard for exercises"`

### Task 2: Định dạng giá trị và chấm bài (`src/lib/grade.ts`)

**Files:**
- Create: `src/lib/grade.ts`, `tests/grade.test.ts`

**Interfaces:**
- Produces:
  - `type Cell = string | number | boolean | null`
  - `interface ResultColumn { name: string; type: string; scale?: number }` — `type` là tên kiểu SQL viết thường (`decimal`, `date`, `time`, `nvarchar`…)
  - `interface Shape { columns: ResultColumn[]; rows: Cell[][] }`
  - `formatCell(value: unknown, column: ResultColumn): Cell` — `null`/`undefined` thành `null`; `decimal`/`numeric`/`money` thành chuỗi `toFixed(scale ?? 0)`; `date` thành `YYYY-MM-DD`; `time` thành `HH:MM:SS`; `datetime`/`datetime2`/`smalldatetime` thành `YYYY-MM-DD HH:MM:SS`; `Buffer` thành `0x…` chữ hoa; còn lại giữ nguyên. Ngày giờ đọc theo UTC (thư viện `mssql` trả `Date` UTC).
  - `compareResults(mine: Shape, answer: Shape, ordered: boolean): { correct: boolean; reason: string | null }`
  - `compareChanges(mine: { affected: number; check: Shape }, answer: { affected: number; check: Shape }): { correct: boolean; reason: string | null }`
  - Lý do (đúng câu chữ spec B mục 3.2): `khác số cột (bạn ra X, đề cần Y)`, `khác số dòng (bạn ra X, đáp án Y)`, `dòng N khác`, `khác số dòng bị ảnh hưởng (bạn X, đáp án Y)`.

- [ ] **Step 1: Viết test hỏng**

```ts
const col = (type: string, scale?: number): ResultColumn => ({ name: 'c', type, scale });
it('formats values so equal data compares equal', () => {
  expect(formatCell(9610000, col('decimal', 0))).toBe('9610000');
  expect(formatCell(0.5, col('decimal', 1))).toBe('0.5');
  expect(formatCell(new Date('2026-10-01T00:00:00Z'), col('date'))).toBe('2026-10-01');
  expect(formatCell(new Date('1970-01-01T08:05:00Z'), col('time', 0))).toBe('08:05:00');
  expect(formatCell(null, col('nvarchar'))).toBeNull();
});
const shape = (rows: Cell[][], n = rows[0]?.length ?? 2): Shape => ({ columns: Array.from({ length: n }, (_, i) => ({ name: `c${i}`, type: 'nvarchar' })), rows });
it('compares by value, ignores column names, and checks order only when asked', () => {
  const answer = shape([['NV047', null], ['NV048', null]]);
  expect(compareResults({ ...shape([['NV048', null], ['NV047', null]]), columns: [{ name: 'Ma', type: 'varchar' }, { name: 'X', type: 'varchar' }] }, answer, false)).toEqual({ correct: true, reason: null });
  expect(compareResults(shape([['NV048', null], ['NV047', null]]), answer, true)).toEqual({ correct: false, reason: 'dòng 1 khác' });
  expect(compareResults(shape([['NV047', null, 'x']], 3), answer, false).reason).toBe('khác số cột (bạn ra 3, đề cần 2)');
  expect(compareResults(shape([['NV047', null]]), answer, false).reason).toBe('khác số dòng (bạn ra 1, đáp án 2)');
});
it('compares data changes by rows affected first, then by the check query', () => {
  const check = shape([['NV001', '2026-09', '500']]);
  expect(compareChanges({ affected: 17, check }, { affected: 9, check }).reason).toBe('khác số dòng bị ảnh hưởng (bạn 17, đáp án 9)');
  expect(compareChanges({ affected: 9, check }, { affected: 9, check })).toEqual({ correct: true, reason: null });
});
```

- [ ] **Step 2: Chạy, kỳ vọng FAIL vì chưa có module**
- [ ] **Step 3: Viết `grade.ts`** — so dòng bằng `JSON.stringify`; không `ordered` thì sắp cả hai bên trước khi so (như `spike/grade.mjs`).
- [ ] **Step 4: Chạy lại, kỳ vọng PASS; `npm test` PASS**
- [ ] **Step 5: Commit** — `git commit -m "add value formatting and grading rules for exercises"`

### Task 3: File bài tập, kiểu dữ liệu API, bài tập mẫu

**Files:**
- Create: `src/lib/exercise-types.ts`, `src/lib/exercises.ts`, `src/content/exercises/3-5-left-join.yaml`, `src/content/exercises/6-5-update-quen-where.yaml`, `tests/exercises.test.ts`
- Modify: `src/content.config.ts` (thêm collection `exercises`: glob `*.yaml`, base `./src/content/exercises`, schema `exerciseFileSchema`)

**Interfaces:**
- Produces (`exercise-types.ts`, không import gì của Astro):
  - `interface Exercise { id: string; title: string; summary: string; prompt: string; columns: string[]; ordered: boolean; kind: 'query' | 'change'; answer: string; check?: string }`
  - `interface ExerciseFile { lesson: string; exercises: Exercise[] }` — `lesson` là slug bài học
  - `type PublicExercise = Omit<Exercise, 'answer' | 'check'> & { lesson: string; n: number }`
  - `type FailureKind = 'bad-request' | 'bad-code' | 'rate' | 'unknown-exercise' | 'blocked' | 'multi' | 'timeout' | 'too-big' | 'quota' | 'unavailable' | 'network'`
  - `interface ApiFailure { ok: false; kind: FailureKind; reason?: string }`
  - `interface RunResponse { ok: true; columns: string[]; rows: Cell[][]; truncated: boolean; affected: number | null; error: string | null; ms: number }`
  - `interface GradeResponse extends RunResponse { correct: boolean; reason: string | null }`
- Produces (`exercises.ts`):
  - `exerciseFileSchema` (zod từ `astro/zod`, đúng các trường trên; `columns` ít nhất 1 phần tử; `exercises` ít nhất 1)
  - `publicExercises(file: ExerciseFile): PublicExercise[]` — bỏ `answer`, `check`; `n` đếm từ 1 theo thứ tự trong file
  - `exerciseUrl(lessonSlug: string, n: number, base?: string): string` — `withBase(\`bai/${slug}/bai-tap/${n}/\`)`
  - `checkExerciseFile(file: ExerciseFile, lessons: { slug: string; num: string }[]): string[]` — lỗi: bài học không có; `id` khác `<num với '-'>-<n>` (ví dụ `3-5-1`); `kind: change` thiếu `check`; `kind: query` có `check`; chuỗi tiếng Việt thiếu `N` trong `answer`/`check`; dòng SQL bắt đầu bằng khoảng trắng không bị cấm (YAML khối `|` giữ nguyên).
- Nội dung (đề viết theo giọng văn mục 4.7 spec đợt 1, ghi rõ cột cần ra và có sắp xếp không):
  - `3-5-1` "IT chưa có hợp đồng": `MaNV, HoTen, NgayVaoLam`, nhân viên phòng `IT` chưa có hợp đồng nào, sắp theo `NgayVaoLam`.
  - `3-5-2` "Chưa có bảng lương tháng 9": `MaNV, HoTen`, nhân viên không có dòng `BangLuong` kỳ `2026-09` (điều kiện kỳ lương đặt ở `ON`), sắp theo `MaNV`.
  - `3-5-3` "Nhân viên và hợp đồng, kể cả người chưa có": `MaNV, HoTen, MaHD`, mọi nhân viên kèm từng hợp đồng (chưa có thì `MaHD` là NULL), sắp theo `MaNV, MaHD`.
  - `6-5-1` "Thêm phụ cấp cho phòng Kinh doanh, chỉ kỳ 2026-09": `UPDATE BangLuong` tăng `PhuCap` thêm 500000 cho nhân viên phòng `KD` kỳ `2026-09`; kiểm `SELECT MaNV, KyLuong, PhuCap FROM BangLuong ORDER BY KyLuong, MaNV`.
  - `6-5-2` "Xóa đơn nghỉ phép bị từ chối": `DELETE FROM DonNghiPhep WHERE TrangThai = N'Từ chối'`; kiểm `SELECT MaDon FROM DonNghiPhep ORDER BY MaDon`.
  - Số dòng thật của từng đáp án được xác nhận ở Task 4 Step 6; nếu câu nào ra 0 dòng thì sửa đề.

- [ ] **Step 1: Viết test hỏng trong `tests/exercises.test.ts`** — đọc mọi file `src/content/exercises/*.yaml` bằng `yaml` và `readCatalog()` (`tests/helpers/lessons.ts`):

```ts
it('every exercise file passes the schema and the course rules', () => {
  for (const f of readExerciseFiles()) {
    expect(exerciseFileSchema.safeParse(f).success, f.lesson).toBe(true);
    expect(checkExerciseFile(f, readCatalog()), f.lesson).toEqual([]);
  }
});
it('ships 3 exercises for 3.5 and 2 data-change exercises for 6.5', () => {
  const byLesson = Object.fromEntries(readExerciseFiles().map(f => [f.lesson, f.exercises]));
  expect(byLesson['3-5-left-join'].map(e => [e.id, e.kind])).toEqual([['3-5-1', 'query'], ['3-5-2', 'query'], ['3-5-3', 'query']]);
  expect(byLesson['6-5-update-quen-where'].map(e => [e.id, e.kind])).toEqual([['6-5-1', 'change'], ['6-5-2', 'change']]);
});
it('public exercises carry no answer or check query', () => {
  const pub = publicExercises(readExerciseFiles()[0]);
  expect(pub.every(e => !('answer' in e) && !('check' in e))).toBe(true);
  expect(pub.map(e => e.n)).toEqual([1, 2, 3]);
});
it('reports broken exercise files', () => {
  const lessons = [{ slug: '3-5-left-join', num: '3.5' }];
  const ex = { id: '3-5-1', title: 't', summary: 's', prompt: 'p', columns: ['MaNV'], ordered: false, kind: 'query' as const, answer: 'SELECT 1' };
  expect(checkExerciseFile({ lesson: 'x', exercises: [ex] }, lessons)[0]).toMatch(/bài học/);
  expect(checkExerciseFile({ lesson: '3-5-left-join', exercises: [{ ...ex, id: '3-5-2' }] }, lessons)[0]).toMatch(/3-5-1/);
  expect(checkExerciseFile({ lesson: '3-5-left-join', exercises: [{ ...ex, kind: 'change' }] }, lessons)[0]).toMatch(/check/);
  expect(checkExerciseFile({ lesson: '3-5-left-join', exercises: [{ ...ex, answer: "SELECT 'Từ chối'" }] }, lessons)[0]).toMatch(/N/);
});
it('builds the exercise page URL under the base path', () => expect(exerciseUrl('3-5-left-join', 2)).toBe('/microsoft-sql-lession/bai/3-5-left-join/bai-tap/2/'));
```

- [ ] **Step 2: Chạy, kỳ vọng FAIL**
- [ ] **Step 3: Viết hai file thư viện, collection, hai file YAML**
- [ ] **Step 4: `npm test` PASS; `npm run build` OK (collection mới không phá trang nào)**
- [ ] **Step 5: Commit** — `git commit -m "add exercise files, their schema and the first five exercises"`

### Task 4: Lõi API, chạy câu lệnh, lệnh kiểm trên máy

**Files:**
- Create: `api/package.json`, `api/host.json`, `api/tsconfig.json`, `api/build.mjs`, `api/src/core.ts`, `api/src/limiter.ts`, `api/src/runner.ts`, `api/src/index.ts`, `api/src/dev-server.ts`, `api/src/check-exercises.ts`, `api/src/check-data.ts`, `api/.funcignore`, `tests/api-core.test.ts`, `database/practice-user.sql`, `database/HRM_Demo.checksums.json`
- Modify: `.gitignore` (thêm `api/dist/`, `api/node_modules/`), `tsconfig.json` (loại `api/` khỏi kiểm của web nếu cần), `vitest.config.ts` (include `tests/**/*.test.ts` đã đủ)

**Interfaces:**
- Consumes: `guardExercise` (Task 1); `Shape`, `ResultColumn`, `formatCell`, `compareResults`, `compareChanges` (Task 2); `Exercise`, `RunResponse`, `GradeResponse`, `ApiFailure` (Task 3).
- Produces:
  - `api/src/limiter.ts`: `createLimiter(limit = 30, windowMs = 60_000, now = Date.now): (code: string) => boolean`
  - `api/src/core.ts`:
    - `interface RunOutcome { shape: Shape | null; affected: number[]; check: Shape | null; error: string | null; errorKind: 'timeout' | 'quota' | 'unavailable' | null; ms: number }` — `affected` chỉ gồm số đếm của câu được chạy, không tính câu kiểm tra
    - `interface Deps { codes: string[]; exercises: Record<string, Exercise>; allow: (code: string) => boolean; run(sql: string, check?: string): Promise<RunOutcome> }`
    - `handleRun(body: unknown, code: string | null, deps: Deps): Promise<{ status: number; body: RunResponse | ApiFailure }>`
    - `handleGrade(body: unknown, code: string | null, deps: Deps): Promise<{ status: number; body: GradeResponse | ApiFailure }>`
    - Body là `{ exercise: string; sql: string }`.
    - Mã trạng thái: `bad-request` 400, `bad-code` 401, `unknown-exercise` 404, `rate` 429, `blocked`/`multi`/`too-big` 422 (`blocked` kèm `reason`), `timeout` 408, `quota`/`unavailable` 503.
    - Thứ tự: body hợp lệ → mã đúng → `allow(code)` → bài tập có → `guardExercise` → `run`. Kết quả có `errorKind` thì trả lỗi tương ứng; `affected.length > 1` thì `multi`.
    - `handleRun`: `rows` tối đa 200 (`truncated`), `affected` là `affected[0] ?? null`, `error` là lỗi SQL Server nguyên văn.
    - `handleGrade`: chạy câu học viên (bài `change` kèm `check`), chạy đáp án như vậy; câu học viên lỗi SQL thì `correct: false`, `reason: 'câu lệnh bị lỗi, xem tab Messages'`; quá 5.000 dòng thì `too-big`; còn lại dùng `compareResults` (theo `ordered`) hoặc `compareChanges`.
  - `api/src/runner.ts`: `createRunner(config: sql.config): { run(sql: string, check?: string): Promise<RunOutcome>; ping(): Promise<number> }`
    - Theo `spike/run.mjs`: `sql.Transaction`; một batch gồm `SET XACT_ABORT ON; SET LOCK_TIMEOUT 3000;` và câu lệnh; câu kiểm tra là request riêng; `arrayRowMode`; cột lấy từ `recordset.columns` (`type.declaration` viết thường, `scale`) rồi `formatCell`; `finally` luôn `rollback` (bỏ qua lỗi "đã hủy").
    - Lỗi `ETIMEOUT` của request là `timeout`. Lỗi kết nối có thông báo chứa `free` hoặc `limit` là `quota`, lỗi kết nối khác là `unavailable`. Lỗi SQL thì đặt `error` bằng nguyên văn thông báo.
    - Config: `connectionTimeout: 90000`, `requestTimeout: 10000`, `encrypt: true`.
  - `api/src/index.ts`: `app.http('ping' | 'run' | 'grade')`, `authLevel: 'anonymous'`, route `ping` (GET), `run`, `grade` (POST). Đọc header `x-access-code`. `Deps` dựng một lần từ env `SQL_SERVER`, `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD`, `ACCESS_CODES` và `dist/exercises.json`.
  - `api/build.mjs`: esbuild bundle `src/index.ts`, `src/dev-server.ts`, `src/check-exercises.ts`, `src/check-data.ts` vào `dist/` (`platform: node`, `format: esm`, `packages: external`); đọc mọi `../src/content/exercises/*.yaml` (gói `yaml`) và ghi `dist/exercises.json` dạng `{ [id]: Exercise }`.
  - `api/package.json`: `"main": "dist/index.js"`, `"type": "module"`; scripts `build`, `dev` (`node dist/dev-server.js`), `check:exercises`, `check:data`; deps `@azure/functions` ^4, `mssql` ^12; devDeps `esbuild`, `yaml`, `dotenv`.
  - `dev-server.ts`: HTTP ở cổng 7071, đường `/api/ping|run|grade`, CORS cho `http://localhost:4321`. Lấy kết nối từ `SQL_*` nếu có, không thì từ `url`/`user`/`password` của `../.env` (cách đọc như `mcp-azure-sql/index.js`). `ACCESS_CODES` mặc định `dev`.
  - `check-exercises.ts`: với mọi bài tập, `guardExercise(answer)` phải `ok`; chạy `answer` (kèm `check`) bằng runner; in mã bài tập, số dòng hoặc số dòng bị ảnh hưởng; lỗi, ra 0 dòng (`query`) hoặc 0 dòng bị ảnh hưởng (`change`) thì thoát mã 1.
  - `check-data.ts`: checksum 7 bảng như `spike/snapshot.mjs`; `--write` ghi `database/HRM_Demo.checksums.json`; không có `--write` thì so với file, in bảng lệch, thoát mã 1 nếu lệch. Chỉ đọc.
  - `database/practice-user.sql`: `CREATE USER hrm_practice WITH PASSWORD = N'<điền mật khẩu>';` rồi `GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.<bảng> TO hrm_practice;` cho 7 bảng; chú thích đầu file ghi chạy trong Query editor của `sql-lession` bằng tài khoản quản trị, mật khẩu do người làm khóa học tự chọn.

- [ ] **Step 1: Viết test hỏng `tests/api-core.test.ts`** với `Deps` giả (`run` trả `RunOutcome` dựng sẵn, `codes: ['abc']`, `exercises` có một bài `query` và một bài `change`):

```ts
it('refuses a missing body, a wrong code, an unknown exercise and a blocked statement', async () => {
  expect((await handleRun(null, 'abc', deps)).status).toBe(400);
  expect((await handleRun({ exercise: 'q1', sql: 'SELECT 1' }, 'nope', deps)).body).toEqual({ ok: false, kind: 'bad-code' });
  expect((await handleRun({ exercise: 'zz', sql: 'SELECT 1' }, 'abc', deps)).status).toBe(404);
  expect((await handleRun({ exercise: 'q1', sql: 'DROP TABLE NhanVien' }, 'abc', deps)).body)
    .toEqual({ ok: false, kind: 'blocked', reason: 'Bài tập chỉ nhận câu bắt đầu bằng SELECT, WITH, INSERT, UPDATE hoặc DELETE.' });
});
it('caps shown rows at 200 and reports several statements as one error', async () => {
  const big = await handleRun({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', depsReturning({ rows: 250 }));
  expect([big.status, (big.body as RunResponse).rows.length, (big.body as RunResponse).truncated]).toEqual([200, 200, true]);
  expect((await handleRun({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', depsReturning({ affected: [2, 3] }))).body).toEqual({ ok: false, kind: 'multi' });
});
it('maps a timeout and a paused database to their own errors', async () => {
  expect((await handleRun({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', depsReturning({ errorKind: 'timeout' }))).status).toBe(408);
  expect((await handleRun({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', depsReturning({ errorKind: 'quota' }))).body).toEqual({ ok: false, kind: 'quota' });
});
it('grades with the answer, and says a SQL error is not correct', async () => {
  expect((await handleGrade({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', deps)).body).toMatchObject({ ok: true, correct: true, reason: null });
  expect((await handleGrade({ exercise: 'q1', sql: 'SELECT 1' }, 'abc', depsReturning({ error: "Invalid column name 'X'." }))).body)
    .toMatchObject({ correct: false, reason: 'câu lệnh bị lỗi, xem tab Messages', error: "Invalid column name 'X'." });
});
it('lets 30 calls a minute through per code', () => {
  let t = 0; const allow = createLimiter(30, 60_000, () => t);
  expect(Array.from({ length: 31 }, () => allow('a')).filter(Boolean).length).toBe(30);
  expect(allow('b')).toBe(true);
  t = 60_001; expect(allow('a')).toBe(true);
});
```

- [ ] **Step 2: Chạy, kỳ vọng FAIL**
- [ ] **Step 3: Viết `limiter.ts`, `core.ts` theo khối Interfaces; chạy test, kỳ vọng PASS**
- [ ] **Step 4: Viết `runner.ts`, `index.ts`, `dev-server.ts`, `check-*.ts`, `build.mjs`, `package.json`, `host.json` (bản `2.0`, `extensionBundle` `Microsoft.Azure.Functions.ExtensionBundle` `[4.*, 5.0.0)`), `.funcignore` (`src`, `tsconfig.json`, `build.mjs`); `cd api && npm install && npm run build`, kỳ vọng `dist/index.js` và `dist/exercises.json` có 5 bài**
- [ ] **Step 5: `npm --prefix api run check:data -- --write`, rồi chạy lại không `--write`, kỳ vọng "không bảng nào lệch"; commit file checksum**
- [ ] **Step 6: `npm --prefix api run check:exercises`, kỳ vọng cả 5 bài chạy được, số dòng khác 0; ghi số dòng từng bài vào ledger; rồi `check:data` không lệch**
- [ ] **Step 7: `npm --prefix api run dev` ở nền; gọi thử bằng `curl -X POST localhost:7071/api/grade -H "x-access-code: dev" -d '{"exercise":"3-5-1","sql":"…đáp án…"}'`, kỳ vọng `correct: true`; với câu thiếu `WHERE`, kỳ vọng lý do khác số dòng**
- [ ] **Step 8: `npm test` PASS; commit** — `git commit -m "add the exercise API core, runner, dev server and data checks"`

### Task 5: Phía web: gọi API, câu báo, lưu câu dở, tiến độ bài tập

**Files:**
- Create: `src/lib/exercise-client.ts`, `src/lib/exercise-messages.ts`, `src/lib/exercise-storage.ts`, `tests/exercise-client.test.ts`
- Modify: `src/lib/progress.ts`, `src/lib/progress-store.ts`, `tests/progress.test.ts`, `tests/progress-store.test.ts`

**Interfaces:**
- Consumes: `RunResponse`, `GradeResponse`, `ApiFailure`, `FailureKind` (Task 3).
- Produces:
  - `createExerciseClient(base: string, fetchImpl: typeof fetch = fetch, opts = { slowMs: 3000, timeoutMs: 120_000 }): { ping(): Promise<boolean>; run(id: string, sql: string, code: string, onSlow?: () => void): Promise<RunResponse | ApiFailure>; grade(id: string, sql: string, code: string, onSlow?: () => void): Promise<GradeResponse | ApiFailure> }` — `POST ${base}/run|grade` với header `x-access-code`; quá `slowMs` chưa xong thì gọi `onSlow` một lần; lỗi mạng hoặc quá `timeoutMs` thì `{ ok: false, kind: 'network' }`; `base` rỗng thì mọi lệnh trả `network`.
  - `exercise-messages.ts`: `MESSAGES: Record<Exclude<FailureKind, 'blocked'>, string>`, `WAITING = 'Đang khởi động database, lần đầu có thể mất tới 1 phút…'`, `ASK_CODE = 'Nhập mã truy cập để chạy bài tập'`, `verdictText(correct: boolean, reason: string | null): string` (`'Đúng rồi.'` hoặc `` `Chưa đúng: ${reason}` ``).
    - `bad-code`: 'Mã truy cập không đúng. Hỏi người phụ trách khóa học để lấy mã.'
    - `timeout`: 'Câu lệnh chạy quá 10 giây nên đã dừng. Kiểm tra lại điều kiện lọc hoặc kết bảng.'
    - `quota`: 'Phần chạy bài tập tạm nghỉ đến đầu tháng sau. Bài học vẫn đọc được bình thường.'
    - `unavailable`, `network`: 'Không kết nối được máy chủ bài tập. Thử lại sau ít phút; nếu vẫn lỗi, nhắn người phụ trách khóa học.'
    - `multi`: 'Mỗi lần chỉ chạy một câu lệnh.'
    - `too-big`: 'Kết quả quá lớn để chấm, hãy lọc bớt.'
    - `rate`: 'Bạn chạy hơi nhanh, chờ vài giây rồi thử lại.'
    - `unknown-exercise`, `bad-request`: 'Bài tập này chưa có trên máy chủ bài tập. Nhắn người phụ trách khóa học.'
  - `exercise-storage.ts`: `loadDraft(id, storage?)`, `saveDraft(id, text, storage?)`, `loadAccessCode(storage?)`, `saveAccessCode(code, storage?)` — khóa `sqlserver-course:draft:<id>` và `sqlserver-course:access-code`; mọi lỗi của storage bị nuốt (đọc trả `null`).
  - `progress.ts`: `ProgressState` thêm `exercises?: Record<string, { doneAt: number }>` (giữ `version: 1`); `markExerciseDone(s, id, now): ProgressState`; `isExerciseDone(s, id): boolean`; `parseProgress` nhận thêm `exercises` (object các `{ doneAt: number }`; sai dạng thì `badShape`); file không có `exercises` vẫn nhập được.
  - `progress-store.ts`: `actions.markExerciseDone(id: string)`.

- [ ] **Step 1: Viết test hỏng** (`tests/exercise-client.test.ts`, thêm vào `progress.test.ts`, `progress-store.test.ts`):

```ts
it('calls onSlow after 3 s and still returns the late answer', async () => {
  vi.useFakeTimers();
  const fetchImpl = vi.fn(() => new Promise<Response>(r => setTimeout(() => r(new Response(JSON.stringify({ ok: true, columns: [], rows: [], truncated: false, affected: 0, error: null, ms: 5 }))), 60_000)));
  const onSlow = vi.fn();
  const p = createExerciseClient('https://x/api', fetchImpl as typeof fetch).run('3-5-1', 'SELECT 1', 'abc', onSlow);
  await vi.advanceTimersByTimeAsync(3000); expect(onSlow).toHaveBeenCalledTimes(1);
  await vi.advanceTimersByTimeAsync(57_000); expect(await p).toMatchObject({ ok: true });
});
it('turns a failed fetch, a timeout and a missing API address into a network failure', async () => {
  const net = { ok: false, kind: 'network' };
  expect(await createExerciseClient('https://x/api', (() => Promise.reject(new TypeError('x'))) as typeof fetch).run('3-5-1', 'SELECT 1', 'abc')).toEqual(net);
  vi.useFakeTimers();
  const p = createExerciseClient('https://x/api', (() => new Promise<Response>(() => {})) as typeof fetch).run('3-5-1', 'SELECT 1', 'abc');
  await vi.advanceTimersByTimeAsync(120_000); expect(await p).toEqual(net);
  expect(await createExerciseClient('').run('3-5-1', 'SELECT 1', 'abc')).toEqual(net);
});
it('sends the access code header and the exercise body', async () => {
  const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ ok: false, kind: 'bad-code' }), { status: 401 }));
  expect(await createExerciseClient('https://x/api', fetchImpl as typeof fetch).grade('3-5-1', 'SELECT 1', 'abc')).toEqual({ ok: false, kind: 'bad-code' });
  const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
  expect(url).toBe('https://x/api/grade');
  expect(new Headers(init.headers).get('x-access-code')).toBe('abc');
  expect(JSON.parse(init.body as string)).toEqual({ exercise: '3-5-1', sql: 'SELECT 1' });
});
it('storage helpers survive a storage that throws', () => {
  const broken = { getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); } } as unknown as Storage;
  expect(() => saveDraft('3-5-1', 'SELECT 1', broken)).not.toThrow();
  expect(loadDraft('3-5-1', broken)).toBeNull();
});
it('verdict text matches the spec', () => expect([verdictText(true, null), verdictText(false, 'dòng 2 khác')]).toEqual(['Đúng rồi.', 'Chưa đúng: dòng 2 khác']));
// progress.test.ts
it('remembers solved exercises and still imports files without them', () => {
  const s = markExerciseDone(emptyState(), '3-5-1', 1000);
  expect(isExerciseDone(s, '3-5-1')).toBe(true);
  const back = parseProgress(serializeProgress(s), ALL_NUMS);
  expect(back.ok && isExerciseDone(back.state, '3-5-1')).toBe(true);
  expect(parseProgress(serializeProgress(emptyState()), ALL_NUMS).ok).toBe(true);
  expect(parseProgress(JSON.stringify({ ...emptyState(), exercises: 5 }), ALL_NUMS)).toEqual({ ok: false, error: IMPORT_ERRORS.badShape });
});
```

- [ ] **Step 2: Chạy, kỳ vọng FAIL**
- [ ] **Step 3: Viết code theo khối Interfaces**
- [ ] **Step 4: `npm test` PASS (gồm 119 test cũ)**
- [ ] **Step 5: Commit** — `git commit -m "add the exercise API client, messages, drafts and solved-exercise progress"`

### Task 6: Sơ đồ database

**Files:**
- Create: `src/lib/db-schema.ts`, `src/lib/db-diagram.ts`, `src/components/islands/DbDiagram.tsx`, `tests/db-schema.test.ts`
- Modify: `src/styles/islands.css` (lớp `.er*`, `.dbd*` theo mockup `docs/superpowers/specs/2026-10-18-mockups/erd-popup.html`, phương án A)

**Interfaces:**
- Produces:
  - `interface DbColumn { name: string; type: string }`; `interface DbTable { name: string; columns: DbColumn[]; primaryKey: string[]; foreignKeys: { column: string; refTable: string; refColumn: string }[] }`
  - `parseSchema(sql: string): DbTable[]` — đọc các khối `CREATE TABLE dbo.<tên> (…);` của `database/HRM_Demo.sql`: khóa chính viết trên cột (`CONSTRAINT PK_… PRIMARY KEY`) hoặc ở cuối bảng (`CONSTRAINT PK_… PRIMARY KEY (a, b)`); khóa ngoại `REFERENCES dbo.<bảng> (<cột>)`; bỏ qua `DECLARE @… TABLE`.
  - `db-diagram.ts`: `BOX = { width: 210, head: 26, row: 18 }`, `DIAGRAM_SIZE = { width: 820, height: 490 }`, `DIAGRAM_POSITIONS: Record<string, { x: number; y: number }>` (PhongBan 20,20; ChucDanh 20,120; DonNghiPhep 20,225; NhanVien 300,20; HopDong 590,20; ChamCong 590,175; BangLuong 590,300), `diagramLinks(tables: DbTable[]): { d: string; dot: { x: number; y: number } | null }[]` — đường gấp khúc như trong mockup (`scratchpad/make_erd_screen.py` đã chép logic: từ mép hộp có khóa ngoại tới mép hộp đích, gấp ở giữa; tự trỏ thì vòng ra bên phải).
  - `DbDiagramDialog({ tables, open, onClose }: { tables: DbTable[]; open: boolean; onClose: () => void })`: popup có tiêu đề "Sơ đồ HRM_Demo", câu "PK là khóa chính, FK là khóa ngoại; đường nối đi từ khóa ngoại tới bảng nó trỏ tới.", nút × (`aria-label="Đóng"`); `role="dialog"` `aria-modal="true"`; Esc, × hoặc bấm nền thì gọi `onClose`; mở thì focus vào hộp thoại.

- [ ] **Step 1: Viết test hỏng**

```ts
const tables = parseSchema(readFileSync('database/HRM_Demo.sql', 'utf8'));
it('reads the 7 tables of HRM_Demo with their keys', () => {
  expect(tables.map(t => t.name)).toEqual(['PhongBan', 'ChucDanh', 'NhanVien', 'HopDong', 'ChamCong', 'DonNghiPhep', 'BangLuong']);
  expect(tables.find(t => t.name === 'NhanVien')!.columns).toHaveLength(12);
  expect(tables.find(t => t.name === 'ChamCong')!.primaryKey).toEqual(['MaNV', 'Ngay']);
  expect(tables.find(t => t.name === 'BangLuong')!.primaryKey).toEqual(['KyLuong', 'MaNV']);
  expect(tables.flatMap(t => t.foreignKeys.map(f => `${t.name}.${f.column}>${f.refTable}`)).sort()).toEqual([
    'BangLuong.MaNV>NhanVien', 'ChamCong.MaNV>NhanVien', 'DonNghiPhep.MaNV>NhanVien', 'HopDong.MaNV>NhanVien',
    'NhanVien.MaCD>ChucDanh', 'NhanVien.MaPB>PhongBan', 'NhanVien.MaQuanLy>NhanVien']);
});
it('places every table and draws one link per foreign key', () => {
  for (const t of tables) expect(DIAGRAM_POSITIONS[t.name], t.name).toBeDefined();
  expect(diagramLinks(tables)).toHaveLength(7);
});
```

- [ ] **Step 2: Chạy, kỳ vọng FAIL**
- [ ] **Step 3: Viết `db-schema.ts`, `db-diagram.ts`, `DbDiagram.tsx`, CSS**
- [ ] **Step 4: `npm test` PASS**
- [ ] **Step 5: Commit** — `git commit -m "add the HRM_Demo diagram popup"`

### Task 7: Trang làm bài và khung soạn

**Files:**
- Create: `src/pages/bai/[slug]/bai-tap/[n].astro`, `src/components/islands/ExerciseWorkspace.tsx`, `src/components/islands/SqlEditor.tsx`, `src/lib/editor-keys.ts`, `src/styles/exercise.css`, `tests/editor-keys.test.ts`, `.env.development` (chỉ `PUBLIC_EXERCISE_API=http://localhost:7071/api`)
- Modify: `src/layouts/BaseLayout.astro` (import `exercise.css`)

**Interfaces:**
- Consumes: `publicExercises`, `exerciseUrl` (Task 3); `createExerciseClient`, `MESSAGES`, `WAITING`, `ASK_CODE`, `verdictText`, storage helpers, `actions.markExerciseDone` (Task 5); `parseSchema`, `DbDiagramDialog` (Task 6); `highlightTsql` (`src/lib/tsql-highlight.ts`); `loadCatalog`.
- Produces:
  - `editorKeyAction(e: { key: string; ctrlKey: boolean; metaKey: boolean; shiftKey: boolean; altKey: boolean }): 'run' | 'indent' | null` — F5 (không phím kèm) hoặc Ctrl/Cmd+Enter là `run`; Tab không kèm Shift là `indent`; còn lại `null`.
  - `SqlEditor({ value, onChange, onRun })`: `<textarea>` trong suốt đè lên `<pre>` tô màu bằng `highlightTsql` (cùng lớp `t-*` với khối SQL của bài); cuộn của hai lớp khớp nhau; `run` thì `preventDefault` rồi `onRun`; `indent` chèn 4 dấu cách; `spellcheck=false`, `aria-label="Câu lệnh SQL"`.
  - `ExerciseWorkspace({ exercise, apiBase, tables, nums })`:
    - mở trang thì `ping()` một lần;
    - khung soạn lấy câu dở (`loadDraft`), không có thì `-- Viết câu lệnh của bạn ở đây`; mỗi lần sửa thì `saveDraft`;
    - chưa có mã thì hiện ô mã với nhãn `ASK_CODE` ngay trên khung soạn, lúc bấm Chạy hoặc Nộp bài; mã sai thì xóa mã đã lưu và hiện `MESSAGES['bad-code']`;
    - "Chạy (F5)", "Nộp bài", "Sơ đồ database"; đang chạy thì khóa hai nút đầu; `onSlow` thì hiện `WAITING`;
    - tab Results (bảng kiểu `.res`, NULL nền vàng, ghi "Đã cắt, chỉ hiện 200 dòng đầu" khi `truncated`) và Messages (`(N rows affected)` hoặc lỗi màu đỏ, chuyển sang tab này khi có lỗi);
    - nộp bài: dải `verdictText`; đúng thì `actions.markExerciseDone(exercise.id)`.
  - Trang `[n].astro`: `getStaticPaths` từ collection `exercises` và catalog; `BaseLayout` (`wide`) tiêu đề `Bài tập ${n} · ${num} ${title}`; không sidebar; đường dẫn `Bài ${num} ${shortTitle} › Bài tập ${n}/${tổng}` (link về bài); link "Bài tập trước"/"Bài tập sau" khi có; cột trái: tên, đề, `Kết quả cần: ${columns.length} cột (${columns.join(', ')})`, `Có sắp xếp: ${ordered ? 'có, theo yêu cầu trong đề' : 'không cần'}`; cột phải: `<ExerciseWorkspace client:only="react" exercise={pub} apiBase={import.meta.env.PUBLIC_EXERCISE_API ?? ''} tables={parseSchema(sqlRaw)} nums={…} />` với `sqlRaw` import `?raw` từ `database/HRM_Demo.sql`. Chỉ truyền `PublicExercise` vào island.

- [ ] **Step 1: Viết test hỏng `tests/editor-keys.test.ts`**

```ts
const k = (key: string, m: Partial<Record<'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey', boolean>> = {}) => ({ key, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false, ...m });
it('runs on F5 or Ctrl+Enter, indents on Tab, and leaves the rest alone', () => {
  expect([editorKeyAction(k('F5')), editorKeyAction(k('Enter', { ctrlKey: true })), editorKeyAction(k('Enter', { metaKey: true }))]).toEqual(['run', 'run', 'run']);
  expect(editorKeyAction(k('Tab'))).toBe('indent');
  expect([editorKeyAction(k('Tab', { shiftKey: true })), editorKeyAction(k('F5', { ctrlKey: true })), editorKeyAction(k('Enter'))]).toEqual([null, null, null]);
});
```

- [ ] **Step 2: Chạy, kỳ vọng FAIL**
- [ ] **Step 3: Viết `editor-keys.ts`, hai island, trang, CSS theo mockup `exercise-workspace.html` phương án A (cột trái khoảng 1/3)**
- [ ] **Step 4: `npm test` PASS; `npm run build` OK, có `dist/bai/3-5-left-join/bai-tap/1/index.html` đến `…/6-5-update-quen-where/bai-tap/2/`**
- [ ] **Step 5: Thử trên trình duyệt** với `npm --prefix api run dev` (ACCESS_CODES `dev`) và `npm run dev`, mở `/microsoft-sql-lession/bai/3-5-left-join/bai-tap/1/`. Kỳ vọng:
  - nhập mã `dev` một lần, tải lại trang không phải nhập lại;
  - F5 trong khung soạn chạy câu lệnh, trang không tải lại; Tab chèn 4 dấu cách;
  - câu đáp án của 3-5-1 nộp ra "Đúng rồi."; bỏ điều kiện `IT` ra "Chưa đúng: khác số dòng (…)";
  - câu sai cú pháp thì tab Messages hiện nguyên văn lỗi màu đỏ;
  - `DROP TABLE NhanVien` thì hiện lý do của bộ chặn;
  - nút "Sơ đồ database" mở popup đủ 7 bảng; Esc đóng và focus về nút;
  - câu dở vẫn còn sau khi tải lại trang;
  - bài 6-5-1 nộp đáp án ra "Đúng rồi.", rồi `npm --prefix api run check:data` không lệch.
- [ ] **Step 6: Commit** — `git commit -m "add the exercise page with the SQL editor and results"`

### Task 8: Mục "Bài tập" trong bài học và kiểm bản build

**Files:**
- Modify: `src/components/lesson/Exercises.astro`, `scripts/check-dist.mjs`, `tests/check-dist.test.ts`, `tests/components.test.ts`
- Create: `src/components/islands/ExerciseList.tsx`

**Interfaces:**
- Consumes: collection `exercises`, `publicExercises`, `exerciseUrl` (Task 3); `isExerciseDone` (Task 5).
- Produces:
  - `Exercises.astro`: lấy slug bài từ `Astro.url.pathname` (đoạn sau `/bai/`); có file bài tập thì render `<ExerciseList client:load items={…} nums={…} />` với `items: { id: string; n: number; title: string; summary: string; href: string }[]`; không có thì giữ nguyên `<p class="exercises">Phần bài tập sẽ bổ sung sau.</p>`.
  - `ExerciseList`: mỗi dòng có số, tên, câu tóm tắt, trạng thái ("Chưa làm" hoặc "Đã làm đúng" theo `isExerciseDone`) và link "Làm bài".
  - `check-dist.mjs`: thêm `findAnswerLeaks(files: { path: string; text: string }[], answers: string[]): string[]` (so sau khi gộp mọi khoảng trắng thành một dấu cách); `main()` đọc câu `answer`/`check` của mọi YAML và quét mọi `.html`, `.js`, `.json` trong `dist/`; mỗi bài tập phải có `dist/bai/<lesson>/bai-tap/<n>/index.html`; đếm trang bài vẫn đúng 51.

- [ ] **Step 1: Viết test hỏng**

```ts
// tests/check-dist.test.ts
it('finds an answer query hidden in a built file, whatever its spacing', () => {
  const answer = 'SELECT nv.MaNV\nFROM NhanVien AS nv';
  expect(findAnswerLeaks([{ path: 'a.js', text: 'x="SELECT nv.MaNV FROM  NhanVien AS nv"' }], [answer])).toEqual(['a.js']);
  expect(findAnswerLeaks([{ path: 'b.html', text: '<p>SELECT nv.MaNV</p>' }], [answer])).toEqual([]);
});
// tests/components.test.ts
it('Exercises keeps the placeholder in a lesson with no exercises', async () => {
  const html = await c.renderToString(Exercises, { request: new Request('http://x/microsoft-sql-lession/bai/1-1-database-la-gi/') });
  expect(html).toContain('Phần bài tập sẽ bổ sung sau.');
});
```

- [ ] **Step 2: Chạy, kỳ vọng FAIL**
- [ ] **Step 3: Viết code theo khối Interfaces**
- [ ] **Step 4: `npm test` PASS; `npm run build`; `npm run check:dist` OK; mở bài 3.5 trên dev server: mục "Bài tập" có 3 dòng, làm đúng 3-5-1 ở Task 7 thì dòng đó hiện "Đã làm đúng"**
- [ ] **Step 5: Commit** — `git commit -m "list exercises in lessons and keep answers out of the build"`

### Task 9: Workflow deploy

**Files:**
- Create: `.github/workflows/deploy-api.yml`
- Modify: `.github/workflows/deploy.yml` (bước build có `env: PUBLIC_EXERCISE_API: ${{ vars.PUBLIC_EXERCISE_API }}`)

**Interfaces:**
- `deploy-api.yml`:
  - chạy khi push vào `main` có thay đổi ở `api/**`, `src/lib/sql-guard.ts`, `src/lib/grade.ts`, `src/lib/exercise-types.ts`, `src/content/exercises/**`, chính file workflow; có `workflow_dispatch`;
  - `permissions: { id-token: write, contents: read }`;
  - các bước: checkout; setup-node 22; `npm ci`; `npm test`; `cd api && npm ci && npm run build && npm prune --omit=dev`; `azure/login@v2` (`client-id`, `tenant-id`, `subscription-id` từ secret `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`); `Azure/functions-action@v1` (`app-name: ${{ vars.AZURE_FUNCTIONAPP_NAME }}`, `package: api`).

- [ ] **Step 1: Viết hai file; kiểm cú pháp YAML bằng `node -e "require('yaml').parse(require('fs').readFileSync(f,'utf8'))"` cho từng file**
- [ ] **Step 2: `npm test`, `npm run build` vẫn PASS**
- [ ] **Step 3: Commit** — `git commit -m "deploy the exercise API from GitHub Actions with OIDC"`

### Task 10: Cài đặt Azure, deploy lần đầu, thử trên web thật

Task này phần lớn là thao tác trên tài nguyên thật. **Trước mỗi lệnh `az` tạo hoặc sửa tài nguyên, hỏi người làm khóa học và chờ đồng ý.** Không in, không đọc, không ghi vào repo mật khẩu SQL, mã truy cập hay secret.

- [ ] **Step 1: Cài Azure CLI** — `winget install -e --id Microsoft.AzureCLI`; kiểm `az version`.
- [ ] **Step 2: Nhờ người làm khóa học chạy `az login`** trong terminal của họ (họ tự đăng nhập trên trình duyệt). Kiểm `az account show` ra đúng subscription "Azure subscription 1".
- [ ] **Step 3: Tra cứu, không tạo gì:**
  - `az functionapp list-flexconsumption-locations` có `australiaeast` không;
  - `az functionapp list-flexconsumption-runtimes --location australiaeast --runtime node` có bản 22 không;
  - tìm resource group của SQL server (`az sql server list --query "[].{name:name, rg:resourceGroup, location:location}"`);
  - tên `sql-lession-api` còn trống không.

  Báo lại cho người làm khóa học các giá trị sẽ dùng.
- [ ] **Step 4: (hỏi trước) Tạo storage account và Function App** — `az storage account create` (Standard_LRS, cùng resource group và vùng); `az functionapp create --resource-group <rg> --name <app> --storage-account <st> --flexconsumption-location australiaeast --runtime node --runtime-version 22 --instance-memory 512`.
- [ ] **Step 5: (hỏi trước) Đặt CORS và cài đặt không bí mật** — `az functionapp cors add --allowed-origins https://nhatlam1111.github.io http://localhost:4321`; `az functionapp config appsettings set --settings SQL_SERVER=<server>.database.windows.net SQL_DATABASE=<db> SQL_USER=hrm_practice`.
- [ ] **Step 6: (hỏi trước) Identity cho GitHub Actions:**
  - `az identity create` (cùng resource group);
  - `az identity federated-credential create --issuer https://token.actions.githubusercontent.com --subject repo:nhatlam1111/microsoft-sql-lession:ref:refs/heads/main --audiences api://AzureADTokenExchange`;
  - `az role assignment create --role "Website Contributor" --assignee <principalId> --scope <id của Function App>`.

  Đưa cho người làm khóa học `clientId` của identity, `tenantId`, `subscriptionId`, tên Function App và địa chỉ API (`https://<defaultHostName>/api`). Các giá trị này không phải bí mật.
- [ ] **Step 7: Người làm khóa học tự làm, rồi báo xong:**
  - chạy `database/practice-user.sql` trong Query editor của database, với mật khẩu tự chọn;
  - SQL server → Networking: bật "Allow Azure services and resources to access this server";
  - Function App → Environment variables: thêm `SQL_PASSWORD` và `ACCESS_CODES`;
  - GitHub → Settings → Secrets and variables → Actions: secret `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`; variable `AZURE_FUNCTIONAPP_NAME`, `PUBLIC_EXERCISE_API`.
- [ ] **Step 8: Hỏi người làm khóa học có push `main` không; push xong chờ hai workflow** (đợi kết quả qua GitHub API như các lần trước), kỳ vọng cả hai `success`.
- [ ] **Step 9: Thử API thật không cần mã:** `curl https://<host>/api/ping` (lần đầu có thể mất tới 1 phút), kỳ vọng 200; `curl -X POST …/api/run -d '{"exercise":"3-5-1","sql":"SELECT 1"}'` không có mã, kỳ vọng 401; gọi từ origin lạ, kỳ vọng không có header CORS.
- [ ] **Step 10: Nhờ người làm khóa học mở trang bài tập 3-5-1 trên web thật, nhập mã của họ, nộp đáp án đúng và một câu sai,** rồi báo kết quả; sau đó chạy `npm --prefix api run check:data`, kỳ vọng không lệch.

## Thứ tự và phụ thuộc

Task 1 và 2 độc lập; Task 3 dùng kiểu `Cell` của Task 2; Task 4 cần 1–3; Task 5 cần 3; Task 6 độc lập; Task 7 cần 3–6; Task 8 cần 3, 5, 7; Task 9 cần 4; Task 10 cần tất cả.
