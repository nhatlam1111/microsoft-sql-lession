# SQL Arcade MVP cấp Cơ bản: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (người làm khóa học chọn Native, một reviewer cuối) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm chế độ luyện SQL kiểu Arcade với 50 bài Cơ bản, chấm bằng unit test và hidden test trên database riêng, lưu tiến độ và coin theo mã truy cập.

**Architecture:** Bài là file YAML, đóng gói vào API như bài tập hiện có; web chỉ nhận phần công khai. API chạy thẳng: mỗi test mở transaction trên database `arcade`, tạo bảng, chèn dữ liệu, chạy câu học viên rồi `ROLLBACK`. Coin và tiến độ nằm ở schema `arcade`, do một user SQL khác ghi.

**Tech Stack:** Astro 5, React 19, Azure Functions v4, `mssql`, Azure SQL Database (free offer), Vitest 3. Không thêm dependency.

**Spec:** [2026-11-03-sql-arcade-mvp-design.md](../specs/2026-11-03-sql-arcade-mvp-design.md)

## Global Constraints

- Không đổi hành vi `ping`, `run`, `grade`, `ExerciseWorkspace`, nháp và tiến độ bài học. Test hiện có không được sửa để cho qua, trừ khi task ghi rõ.
- Không ghi vào `HRM_Demo`. Dữ liệu hidden test, `answer`, `catches` không được lọt vào `dist/`.
- Giá trị cố định: khởi đầu 20 coin; thưởng `de` 10, `vua` 20, `kho` 30; mở test 10 coin; 5 giây mỗi test; tối thiểu 2 unit test và 3 hidden test; 50 bài chia 5/6/7/5/5/4/6/6/6.
- Biến môi trường: `ARCADE_SQL_DATABASE`, `ARCADE_RUNNER_USER`, `ARCADE_RUNNER_PASSWORD`, `ARCADE_STORE_USER`, `ARCADE_STORE_PASSWORD`; server dùng lại `SQL_SERVER`.
- Lỗi hạ tầng không được tính là học viên sai, không ghi `Submission`, không đổi coin.
- Code và chú thích viết tiếng Anh theo kiểu file xung quanh; chữ hiện cho người dùng viết tiếng Việt. File API thuần không import `astro/*`, vì API đóng gói với `packages: 'external'`.
- Mọi lệnh `az` tạo hoặc đổi tài nguyên phải được duyệt trước. Người làm khóa học tự điền mật khẩu và mã. Không in, không commit secret. Chỉ push khi được đồng ý.
- Mỗi commit kết thúc bằng dòng `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

- Hai tab cùng mở một test hoặc cùng nộp đúng: chỉ trừ hoặc thưởng một lần. Test ở Task 6.
- Dữ liệu test có tiếng Việt, dấu nháy đơn, `NULL`, ngày, số lẻ: dựng đúng, không lỗi cú pháp. Test ở Task 3.
- Câu hai statement không dấu chấm phẩy (`SELECT 1 SELECT 2`): từ chối cả lần chạy, không tính là sai bài. Test ở Task 7.
- Hạ tầng lỗi giữa chừng khi nộp, ở test thứ ba: không ghi gì, không đổi coin. Test ở Task 7.
- Dữ liệu test sót lại sau một lần chạy: `check:arcade` kiểm schema `dbo` rỗng trước và sau khi chạy. Test ở Task 5.

---

### Task 1: Database Arcade và spike

**Files:**
- Create: `database/arcade-setup.sql`
- Modify: `docs/superpowers/specs/2026-11-03-sql-arcade-mvp-design.md` (thêm mục 14)

**Interfaces:**
- Produces: database `arcade`, user `arcade_runner`, `arcade_store`, bảng `arcade.Learner`, `arcade.Completion`, `arcade.OpenedTest`, `arcade.Submission`; các biến `ARCADE_*` trong `.env`.

- [ ] **Step 1: Tạo nhánh và commit spec cùng plan**

```bash
git switch -c feat/arcade-mvp
git add docs/superpowers/specs/2026-11-03-sql-arcade-mvp-design.md docs/superpowers/plans/2026-11-03-sql-arcade-mvp.md
git commit -m "docs: design and plan the SQL Arcade MVP"
```

- [ ] **Step 2: Viết `database/arcade-setup.sql`**

Theo mẫu chú thích của `database/practice-user.sql`, chạy một lần trên database `arcade` bằng tài khoản admin. Mật khẩu để placeholder `<điền mật khẩu>`.

```sql
CREATE SCHEMA arcade;
CREATE TABLE arcade.Learner (
    LearnerId char(64) NOT NULL PRIMARY KEY,
    Coins int NOT NULL CONSTRAINT CK_Learner_Coins CHECK (Coins >= 0),
    CreatedAt datetime2(0) NOT NULL DEFAULT SYSUTCDATETIME());
CREATE TABLE arcade.Completion (
    LearnerId char(64) NOT NULL REFERENCES arcade.Learner (LearnerId),
    ChallengeId varchar(100) NOT NULL,
    Reward int NOT NULL,
    Sql nvarchar(max) NOT NULL,
    CompletedAt datetime2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    PRIMARY KEY (LearnerId, ChallengeId));
CREATE TABLE arcade.OpenedTest (
    LearnerId char(64) NOT NULL REFERENCES arcade.Learner (LearnerId),
    ChallengeId varchar(100) NOT NULL,
    TestId int NOT NULL,
    Cost int NOT NULL,
    OpenedAt datetime2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    PRIMARY KEY (LearnerId, ChallengeId, TestId));
CREATE TABLE arcade.Submission (
    Id bigint IDENTITY PRIMARY KEY,
    LearnerId char(64) NOT NULL REFERENCES arcade.Learner (LearnerId),
    ChallengeId varchar(100) NOT NULL,
    Sql nvarchar(max) NOT NULL,
    Passed int NOT NULL,
    Total int NOT NULL,
    Accepted bit NOT NULL,
    FailedTests varchar(100) NOT NULL,
    SubmittedAt datetime2(0) NOT NULL DEFAULT SYSUTCDATETIME());
CREATE INDEX IX_Submission_Last ON arcade.Submission (LearnerId, ChallengeId, Id DESC);

CREATE USER arcade_runner WITH PASSWORD = N'<điền mật khẩu>';
GRANT CREATE TABLE TO arcade_runner;
GRANT ALTER, SELECT, INSERT ON SCHEMA::dbo TO arcade_runner;

CREATE USER arcade_store WITH PASSWORD = N'<điền mật khẩu khác>';
GRANT SELECT, INSERT, UPDATE ON SCHEMA::arcade TO arcade_store;
```

- [ ] **Step 3: Đưa lệnh tạo database cho người làm khóa học duyệt, rồi chạy**

```bash
az sql db create -g learn -s sql-lession -n arcade --edition GeneralPurpose --compute-model Serverless --family Gen5 --capacity 2 --min-capacity 0.5 --auto-pause-delay 60 --use-free-limit --free-limit-exhaustion-behavior AutoPause --backup-storage-redundancy Local --max-size 32GB --collation SQL_Latin1_General_CP1_CI_AS
```

Expected: JSON có `"status": "Online"`, `"useFreeLimit": true`. Azure từ chối thì dừng và hỏi; không tự chuyển sang gói có phí.

- [ ] **Step 4: Chờ người làm khóa học chạy script và điền `.env`**

Người làm khóa học chạy `database/arcade-setup.sql` trong Query editor của database `arcade`, thêm năm biến `ARCADE_*` vào `.env`, rồi báo lại.

- [ ] **Step 5: Chạy spike bằng file tạm `api/spike-arcade.mjs`**

Không commit file này. Dùng `mssql`, đọc `.env`, kiểm:

1. Với `arcade_runner`, chạy 5 vòng trong transaction: tạo `dbo.NhanVien`, chèn 10 dòng có `N'Hà'`, `SELECT` bằng `NhanVien` và `dbo.NhanVien`, `ROLLBACK`. In số ms mỗi vòng.
2. Sau đó `SELECT COUNT(*) FROM sys.tables WHERE schema_id = SCHEMA_ID('dbo')` ra `0`.
3. `arcade_runner` đọc `arcade.Learner` bị lỗi 229.
4. `arcade_store` chèn và đọc được một dòng `arcade.Learner` trong transaction rồi `ROLLBACK`.

Expected: cả bốn đúng; chữ `Hà` đọc ra nguyên vẹn. Khi database đã thức, một vòng trên 600 ms thì báo người làm khóa học trước khi đi tiếp.

- [ ] **Step 6: Ghi kết quả vào spec, xóa spike, commit**

Thêm mục `## 14. Kết quả spike` với ngày, số ms, ghi nhận về quyền. Xóa `api/spike-arcade.mjs`.

```bash
git add database/arcade-setup.sql docs/superpowers/specs/2026-11-03-sql-arcade-mvp-design.md
git commit -m "feat: add the Arcade database setup and record the spike"
```

---

### Task 2: Luật chơi, kiểu dữ liệu, bộ chặn

**Files:**
- Create: `src/data/arcade.ts`, `src/lib/arcade-types.ts`, `src/lib/arcade-play.ts`
- Modify: `src/lib/sql-guard.ts`
- Test: `tests/arcade-play.test.ts`, `tests/sql-guard.test.ts`

**Interfaces:**
- Produces:
  - `ARCADE_RULES = { startCoins: 20, openCost: 10, reward: { de: 10, vua: 20, kho: 30 }, testTimeoutMs: 5000 }`
  - `ARCADE_CHAPTERS: { id: string; title: string; lesson: string; size: number }[]`, id `2-1` tới `2-9`, `size` theo Global Constraints
  - `Difficulty`, `TableDefs = Record<string, Record<string, string>>`, `TableRows = Record<string, Cell[][]>`
  - `ChallengeTest { id: number; visible: boolean; rows: TableRows; expected: Cell[][]; catches?: string }`
  - `Challenge { id; chapter; order; title; difficulty; lessons: string[]; prompt; columns: string[]; resultTypes: string[]; ordered: boolean; tables: TableDefs; answer: string; tests: ChallengeTest[] }`
  - `PublicTest { id: number; rows: TableRows; expected: Cell[][] }`
  - `PublicChallenge = Omit<Challenge, 'answer' | 'tests'> & { tests: PublicTest[]; hiddenTests: number[] }`
  - `TestResult = { id: number; shown: true; passed: boolean; reason: string | null; columns: string[]; rows: Cell[][]; truncated: boolean; error: string | null; ms: number } | { id: number; shown: false; passed: boolean }`
  - `MeResponse { ok: true; coins: number; completed: string[] }`
  - `ChallengeState { ok: true; unlocked: boolean; completed: boolean; coins: number; lastSql: string | null; lastFailed: number[] | null; opened: PublicTest[] }`
  - `ArcadeRunResponse { ok: true; tests: TestResult[] }`
  - `SubmitResponse { ok: true; tests: TestResult[]; accepted: boolean; reward: number; coins: number }`
  - `OpenResponse { ok: true; coins: number; test: PublicTest }`
  - `sortChallenges<T extends { chapter: string; order: number }>(list: T[]): T[]`
  - `isUnlocked(ids: string[], completed: ReadonlySet<string>, id: string): boolean`
  - `publicTest(t: ChallengeTest): PublicTest`, `publicChallenge(c: Challenge): PublicChallenge`
  - `guardArcade(text: string): GuardResult`

- [ ] **Step 1: Viết test hỏng**

```ts
it('sorts by chapter, then by order inside a chapter', () => {
  expect(sortChallenges([{ chapter: '2-2', order: 1 }, { chapter: '2-1', order: 2 }, { chapter: '2-1', order: 1 }]))
    .toEqual([{ chapter: '2-1', order: 1 }, { chapter: '2-1', order: 2 }, { chapter: '2-2', order: 1 }]);
});
it('opens the first challenge, the one after a completed challenge, and any completed one', () => {
  const ids = ['a', 'b', 'c'];
  expect(isUnlocked(ids, new Set(), 'a')).toBe(true);
  expect(isUnlocked(ids, new Set(), 'b')).toBe(false);
  expect(isUnlocked(ids, new Set(['a']), 'b')).toBe(true);
  expect(isUnlocked(ids, new Set(['c']), 'c')).toBe(true);
  expect(isUnlocked(ids, new Set(['a']), 'c')).toBe(false);
});
it('keeps only public data', () => {
  const p = publicChallenge(challenge);          // 2 visible, 3 hidden
  expect(p.tests.map(t => t.id)).toEqual([1, 2]);
  expect(p.hiddenTests).toEqual([3, 4, 5]);
  expect(JSON.stringify(p)).not.toContain('BAT-MAT');   // a cell only hidden tests have
  expect(JSON.stringify(p)).not.toContain(challenge.answer);
  expect(JSON.stringify(p)).not.toContain('catches');
});
it('the rules and chapters match the approved design', () => {
  expect(ARCADE_RULES).toEqual({ startCoins: 20, openCost: 10, reward: { de: 10, vua: 20, kho: 30 }, testTimeoutMs: 5000 });
  expect(ARCADE_CHAPTERS.map(c => c.size)).toEqual([5, 6, 7, 5, 5, 4, 6, 6, 6]);
});
```

Thêm vào `tests/sql-guard.test.ts`:

```ts
it('takes SELECT and WITH for Arcade, nothing that changes data', () => {
  expect(guardArcade('SELECT MaNV FROM NhanVien').ok).toBe(true);
  expect(guardArcade('WITH t AS (SELECT 1 AS a) SELECT a FROM t').ok).toBe(true);
  expect(guardArcade("SELECT N'update' AS a").ok).toBe(true);
  expect(guardArcade('UPDATE NhanVien SET HoTen = 1')).toEqual({ ok: false, reason: 'Bài luyện chỉ nhận câu bắt đầu bằng SELECT hoặc WITH.' });
  expect(guardArcade('WITH t AS (SELECT 1 AS a) DELETE FROM t')).toEqual({ ok: false, reason: 'Bài luyện chỉ nhận câu truy vấn.' });
});
```

- [ ] **Step 2: Chạy, thấy lỗi**

Run: `npx vitest run tests/arcade-play.test.ts tests/sql-guard.test.ts`
Expected: FAIL vì chưa có module và `guardArcade`.

- [ ] **Step 3: Viết code**

`src/data/arcade.ts` có thêm nhãn `DIFFICULTY_LABEL = { de: 'Dễ', vua: 'Vừa', kho: 'Khó' }`. Trong `sql-guard.ts`, tách thân `guardExercise` thành hàm nội bộ nhận danh sách từ mở đầu và câu báo lỗi; `guardExercise` giữ nguyên hành vi; `guardArcade` gọi hàm đó với `['select', 'with']`, rồi từ chối nếu phần đã `sanitize` có `\b(insert|update|delete)\b`.

- [ ] **Step 4: Chạy lại toàn bộ test liên quan**

Run: `npx vitest run tests/arcade-play.test.ts tests/sql-guard.test.ts tests/api-core.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/arcade.ts src/lib/arcade-types.ts src/lib/arcade-play.ts src/lib/sql-guard.ts tests/arcade-play.test.ts tests/sql-guard.test.ts
git commit -m "feat: add the Arcade rules, types and statement guard"
```

---

### Task 3: Dựng dữ liệu test và mở rộng runner

**Files:**
- Create: `api/src/arcade-sql.ts`
- Modify: `api/src/runner.ts`, `api/src/core.ts:12` (kiểu `errorKind`)
- Test: `tests/arcade-sql.test.ts`

**Interfaces:**
- Consumes: `TableDefs`, `TableRows`
- Produces:
  - `sqlLiteral(value: Cell, columnType: string): string`
  - `buildSetup(tables: TableDefs, rows: TableRows, opts?: { reverse?: boolean }): string`
  - `runner.run(text: string, check?: string, setup?: string): Promise<RunOutcome>`
  - `RunOutcome.errorKind` nhận thêm `'rate'`

- [ ] **Step 1: Viết test hỏng**

```ts
it('writes values the way their column needs', () => {
  expect(sqlLiteral(null, 'int NULL')).toBe('NULL');
  expect(sqlLiteral("O'Brien", 'nvarchar(50) NOT NULL')).toBe("N'O''Brien'");
  expect(sqlLiteral('Hà', 'nvarchar(50)')).toBe("N'Hà'");
  expect(sqlLiteral('NV1', 'varchar(10)')).toBe("'NV1'");
  expect(sqlLiteral('2026-10-21', 'date NOT NULL')).toBe("'2026-10-21'");
  expect(sqlLiteral(12.5, 'decimal(10,2)')).toBe('12.5');
  expect(sqlLiteral(true, 'bit')).toBe('1');
  expect(sqlLiteral('', 'nvarchar(10)')).toBe("N''");
  expect(sqlLiteral('NULL', 'varchar(10)')).toBe("'NULL'");
});
it('creates every table and inserts its rows', () => {
  const tables = { NhanVien: { MaNV: 'varchar(10) NOT NULL', Email: 'varchar(50) NULL' }, PhongBan: { MaPB: 'varchar(10) NOT NULL' } };
  const sql = buildSetup(tables, { NhanVien: [['A', 'a@x'], ['B', null]] });
  expect(sql).toContain('CREATE TABLE dbo.[NhanVien] ([MaNV] varchar(10) NOT NULL, [Email] varchar(50) NULL);');
  expect(sql).toContain("INSERT INTO dbo.[NhanVien] VALUES ('A', 'a@x'), ('B', NULL);");
  expect(sql).toContain('CREATE TABLE dbo.[PhongBan]');
  expect(sql).not.toContain('INSERT INTO dbo.[PhongBan]');
});
it('reverses the rows on request', () => {
  const sql = buildSetup({ T: { a: 'int' } }, { T: [[1], [2]] }, { reverse: true });
  expect(sql).toContain('VALUES (2), (1);');
});
```

- [ ] **Step 2: Chạy, thấy lỗi**

Run: `npx vitest run tests/arcade-sql.test.ts`
Expected: FAIL vì chưa có module.

- [ ] **Step 3: Viết `arcade-sql.ts`, mở rộng `runner.ts`**

Kiểu lấy từ phần đầu chuỗi khai báo cột (`/^[a-z]+/i`); kiểu bắt đầu bằng `n` có chữ `char` thì thêm tiền tố `N`.

Trong `run`, sau batch `SET` và trước câu học viên: nếu có `setup` thì chạy trong `try` riêng. Lỗi số 1222 trả `errorKind: 'rate'`; lỗi khác `console.error` rồi trả `errorKind: 'unavailable'`. Không truyền `setup` thì hành vi như cũ.

- [ ] **Step 4: Chạy test**

Run: `npx vitest run tests/arcade-sql.test.ts tests/api-core.test.ts`, rồi `npm --prefix api run typecheck`
Expected: PASS, typecheck không lỗi.

- [ ] **Step 5: Commit**

```bash
git add api/src/arcade-sql.ts api/src/runner.ts api/src/core.ts tests/arcade-sql.test.ts
git commit -m "feat: build Arcade test data and run it before the learner's statement"
```

---

### Task 4: Khai báo bài và đóng gói

**Files:**
- Create: `src/lib/arcade-schema.ts`, `api/src/arcade-data.ts`
- Modify: `src/content.config.ts`, `api/build.mjs`, `.github/workflows/deploy-api.yml`
- Test: `tests/arcade-schema.test.ts`, `tests/arcade-content.test.ts`

**Interfaces:**
- Consumes: `Challenge`, `ARCADE_CHAPTERS`, `findUnprefixedUnicodeStrings`
- Produces:
  - `challengeSchema` (zod, dùng `astro/zod`; ô dữ liệu chỉ nhận string, number, boolean, null)
  - `checkChallenge(c: Challenge, ctx: { lessons: string[]; folder: string }): string[]`
  - `loadChallenges(): Challenge[]`, đọc `arcade.json`, đã qua `sortChallenges`
  - `readChallengeFiles(): Challenge[]` trong `tests/helpers/arcade.ts`

- [ ] **Step 1: Viết test hỏng cho `checkChallenge`**

Một bài mẫu hợp lệ cho `[]`. Mỗi lỗi sau cho đúng một thông báo chứa cụm trong ngoặc:

- 1 unit test (`ít nhất 2 unit test`); 2 hidden test (`ít nhất 3 hidden test`)
- hidden test thiếu `catches` (`thiếu catches`); unit test có `catches` (`unit test không có catches`)
- trùng `test.id` (`trùng test`)
- `rows` nhắc bảng chưa khai (`chưa khai bảng`); dòng sai số cột (`sai số cột`)
- `resultTypes` khác độ dài `columns` (`resultTypes`)
- `answer` có `GETDATE()` (`ngày hiện tại`), kiểm cả `SYSDATETIME`, `GETUTCDATE`, `CURRENT_TIMESTAMP`
- `answer` có chuỗi tiếng Việt thiếu `N` (`thiếu N`)
- `lessons` chứa bài không có (`không có trong khóa học`)
- `chapter` khác thư mục (`thư mục`)

- [ ] **Step 2: Chạy, thấy lỗi**

Run: `npx vitest run tests/arcade-schema.test.ts`
Expected: FAIL vì chưa có module.

- [ ] **Step 3: Viết code**

- `content.config.ts`: collection `arcade` với `glob({ pattern: '**/*.yaml', base: './src/content/arcade' })`.
- `api/build.mjs`: đọc `src/content/arcade/` bằng `readdirSync(dir, { recursive: true })`, thư mục chưa có thì ra mảng rỗng; ghi `dist/arcade.json`; in thêm số bài.
- `deploy-api.yml`: thêm `src/content/arcade/**`, `src/data/arcade.ts`, `src/lib/arcade-*.ts` vào `paths`.
- `tests/arcade-content.test.ts`: mọi file qua `challengeSchema` và `checkChallenge`; `id` không trùng; `order` không trùng trong chương.

Ngày trong YAML phải có dấu nháy, vì Astro đọc ngày không nháy thành `Date` và schema sẽ từ chối.

- [ ] **Step 4: Chạy test và build API**

Run: `npx vitest run tests/arcade-schema.test.ts tests/arcade-content.test.ts`, rồi `npm --prefix api run build`
Expected: PASS; build in `Built the API with 76 exercises and 0 Arcade challenges.`

- [ ] **Step 5: Commit**

```bash
git add src/lib/arcade-schema.ts api/src/arcade-data.ts src/content.config.ts api/build.mjs .github/workflows/deploy-api.yml tests/arcade-schema.test.ts tests/arcade-content.test.ts tests/helpers/arcade.ts
git commit -m "feat: declare Arcade challenges and pack them with the API"
```

---

### Task 5: Cổng chất lượng `check:arcade`

**Files:**
- Create: `api/src/arcade-check.ts`, `api/src/check-arcade.ts`, `api/src/arcade-config.ts`, `src/content/arcade/2-1/chon-hai-cot.yaml`
- Modify: `api/package.json`, `api/build.mjs`
- Test: `tests/arcade-check.test.ts`

**Interfaces:**
- Consumes: `buildSetup`, `guardArcade`, `compareResults`, `RunOutcome`
- Produces:
  - `type ArcadeRun = (text: string, check?: string, setup?: string) => Promise<RunOutcome>`
  - `checkOne(c: Challenge, run: ArcadeRun): Promise<string[]>`
  - `fillExpected(c: Challenge, run: ArcadeRun): Promise<{ resultTypes: string[]; expected: Record<number, Cell[][]> }>`
  - `expectedShape(c: Challenge, t: ChallengeTest): Shape`
  - `arcadeServices(env: Env): () => { run: ArcadeRun; store: Store; pool(): Promise<sql.ConnectionPool>; close(): Promise<void> }`. Chỉ dựng kết nối ở lần gọi đầu, thiếu biến thì ném lỗi lúc gọi. `store` thêm ở Task 6. `requestTimeout` của runner là `ARCADE_RULES.testTimeoutMs`.

- [ ] **Step 1: Viết test hỏng bằng `run` giả theo `setup`**

Bài mẫu có 2 unit test, 3 hidden test. `run` giả trả kết quả theo cặp câu lệnh và `setup`. `checkOne` cho `[]` với bài đúng. Mỗi lỗi sau cho một thông báo:

- `answer` ra khác `expected` ở test 2: chứa `test 2`, `khác expected`
- `answer` lỗi SQL ở test 1: chứa `test 1`, nguyên văn lỗi
- `catches` của test 3 trượt unit test 1: chứa `catches của test 3`, `trượt unit test 1`
- `catches` của test 3 vẫn qua test 3: chứa `không bắt được test 3`
- Mọi unit test ra 0 dòng: chứa `không unit test nào ra dữ liệu`
- `ordered: true`, chèn đảo ra kết quả khác: chứa `phụ thuộc thứ tự chèn`
- `guardArcade` từ chối `answer`: chứa `bộ chặn`

Thêm: `fillExpected` trả đúng `resultTypes` và `expected` theo từng test.

- [ ] **Step 2: Chạy, thấy lỗi**

Run: `npx vitest run tests/arcade-check.test.ts`
Expected: FAIL.

- [ ] **Step 3: Viết `arcade-check.ts`, `arcade-config.ts`, `check-arcade.ts`**

CLI đọc YAML trực tiếp bằng `yaml`. `--write` dùng `parseDocument`, `doc.setIn` để giữ chú thích, rồi ghi `resultTypes` và `expected`.

CLI đếm bảng trong schema `dbo` trước và sau khi chạy; khác 0 thì báo `dữ liệu test còn sót trong dbo` và thoát mã 1. Thêm `src/check-arcade.ts` vào `entryPoints` của `api/build.mjs` và script `"check:arcade": "node dist/check-arcade.js"` vào `api/package.json`.

- [ ] **Step 4: Viết bài mẫu `chon-hai-cot.yaml`, điền `expected`**

Bối cảnh tuyển dụng, theo quy tắc mục 8.2 của spec, 2 unit test và 3 hidden test.

Run: `npm --prefix api run build`, `npm --prefix api run check:arcade -- --write`, `npm --prefix api run check:arcade`
Expected: lần cuối in `chon-hai-cot: đạt`, thoát mã 0.

- [ ] **Step 5: Chạy test**

Run: `npx vitest run tests/arcade-check.test.ts tests/arcade-content.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add api/src/arcade-check.ts api/src/check-arcade.ts api/src/arcade-config.ts api/package.json api/build.mjs src/content/arcade tests/arcade-check.test.ts
git commit -m "feat: check every Arcade challenge against the real database"
```

---

### Task 6: Lưu tiến độ và coin

**Files:**
- Create: `api/src/arcade-store.ts`, `api/src/check-arcade-store.ts`
- Modify: `api/src/arcade-config.ts`, `api/package.json`

**Interfaces:**
- Consumes: bảng ở Task 1, `ARCADE_RULES.startCoins`
- Produces:

```ts
export interface LearnerState { coins: number; completed: string[]; opened: { challenge: string; test: number }[] }
export interface Store {
  load(learner: string): Promise<LearnerState>;              // creates the learner on first call
  lastSubmission(learner: string, challenge: string): Promise<{ sql: string; failed: number[] } | null>;
  recordSubmission(learner: string, s: { challenge: string; sql: string; passed: number; total: number; accepted: boolean; failed: number[] }): Promise<void>;
  complete(learner: string, challenge: string, reward: number, sql: string): Promise<number>;   // coins actually paid, 0 when done before
  open(learner: string, challenge: string, test: number, cost: number): Promise<'opened' | 'already' | 'not-enough-coins'>;
}
export function createStore(config: sql.config): Store;
```

- [ ] **Step 1: Viết `check-arcade-store.ts`, kiểm trên database thật**

Thêm file này vào `entryPoints` của `api/build.mjs`. Dùng một `LearnerId` ngẫu nhiên, dòng để lại không gắn với mã thật. Thứ tự và kỳ vọng:

```ts
assert((await s.load(id)).coins === 20);
assert((await s.load(id)).coins === 20);                                    // no second grant
const raced = await Promise.all([s.open(id, 'x', 3, 10), s.open(id, 'x', 3, 10)]);
assert(raced.filter(r => r === 'opened').length === 1 && (await s.load(id)).coins === 10);
assert(await s.open(id, 'x', 4, 10) === 'opened');
assert(await s.open(id, 'x', 5, 10) === 'not-enough-coins' && (await s.load(id)).coins === 0);
const paid = await Promise.all([s.complete(id, 'x', 20, 'SELECT 1'), s.complete(id, 'x', 20, 'SELECT 1')]);
assert(paid.reduce((a, b) => a + b) === 20 && (await s.load(id)).coins === 20);
await s.recordSubmission(id, { challenge: 'x', sql: 'SELECT 2', passed: 3, total: 5, accepted: false, failed: [3, 5] });
assert((await s.lastSubmission(id, 'x'))?.failed.join() === '3,5');
assert((await s.load(id)).completed.includes('x') && (await s.load(id)).opened.length === 2);
```

- [ ] **Step 2: Chạy, thấy lỗi**

Run: `npm --prefix api run build`
Expected: FAIL vì chưa có `createStore`.

- [ ] **Step 3: Viết `arcade-store.ts`**

Mọi giá trị đi qua `.input()`. Trong `open`: mở transaction, đã có `OpenedTest` thì `already`; `UPDATE … SET Coins = Coins - @cost WHERE LearnerId = @id AND Coins >= @cost`, 0 dòng thì `not-enough-coins`; chèn `OpenedTest`; lỗi 2627 thì rollback và trả `already`.

Trong `complete`: chèn `Completion`, lỗi 2627 thì rollback và trả 0; sau đó cộng coin trong cùng transaction. `load` bỏ qua lỗi 2627 khi hai lần gọi đầu đua nhau.

Nối `store` vào `arcadeServices` với `ARCADE_STORE_USER`, `ARCADE_STORE_PASSWORD`. Thêm script `"check:arcade:store"`.

- [ ] **Step 4: Chạy trên database thật**

Run: `npm --prefix api run build`, `npm --prefix api run check:arcade:store`
Expected: in `store: đạt`, thoát mã 0.

- [ ] **Step 5: Commit**

```bash
git add api/src/arcade-store.ts api/src/check-arcade-store.ts api/src/arcade-config.ts api/package.json api/build.mjs
git commit -m "feat: store Arcade progress and coins per access code"
```

---

### Task 7: Xử lý request của Arcade

**Files:**
- Create: `api/src/arcade.ts`, `tests/helpers/arcade-fakes.ts`
- Modify: `api/src/core.ts` (export `fail`, `Reply`, thêm status), `src/lib/exercise-types.ts`, `src/lib/exercise-messages.ts`
- Test: `tests/arcade.test.ts`

**Interfaces:**
- Consumes: `Store`, `ArcadeRun`, `expectedShape`, `buildSetup`, `guardArcade`, `compareResults`, `isUnlocked`, `publicTest`
- Produces:

```ts
export interface ArcadeDeps {
  codes: string[];
  allow: (code: string) => boolean;
  challenges: Challenge[];
  services(): { store: Store; run: ArcadeRun };   // throws when Arcade is not configured
}
export const learnerId = (code: string): string;  // SHA-256 hex
export function handleMe(code: string | null, deps: ArcadeDeps): Promise<Reply<MeResponse>>;
export function handleChallenge(id: string, code: string | null, deps: ArcadeDeps): Promise<Reply<ChallengeState>>;
export function handleArcadeRun(body: unknown, code: string | null, deps: ArcadeDeps): Promise<Reply<ArcadeRunResponse>>;
export function handleSubmit(body: unknown, code: string | null, deps: ArcadeDeps): Promise<Reply<SubmitResponse>>;
export function handleOpen(body: unknown, code: string | null, deps: ArcadeDeps): Promise<Reply<OpenResponse>>;
```

`FailureKind` thêm `locked` (403, `Bài này chưa mở. Làm xong bài trước đã.`) và `not-enough-coins` (409, `Chưa đủ coin để mở test này.`).

- [ ] **Step 1: Viết test hỏng**

`tests/helpers/arcade-fakes.ts` có `fakeStore(state)` giữ trong bộ nhớ và ghi lại các lần gọi, `fakeRun(script)` trả `RunOutcome` theo thứ tự hoặc theo `setup`, và bài mẫu 2 unit test, 3 hidden test có ô `BAT-MAT` chỉ ở hidden.

```ts
it('gives a new learner 20 coins', ...);                     // handleMe → { coins: 20, completed: [] }
it('refuses a wrong code and a blocked statement', ...);     // 401 bad-code; 422 blocked
it('refuses a locked challenge everywhere', ...);            // run, submit, open → 403 locked; run fake not called
it('tells a locked challenge apart when read', ...);         // handleChallenge → unlocked false, lastSql null, opened []
it('runs visible and opened tests only', ...);               // opened [4] → ids [1, 2, 4], all shown
it('shows nothing of an unopened hidden test', ...);         // Object.keys sorted = ['id','passed','shown']; JSON has no 'BAT-MAT'
it('keeps a SQL error of a hidden test out of the reply', ...); // error text with 'BAT-MAT' → passed false, not in JSON
it('pays once for a first pass', ...);                       // reward 10, coins 30; again reward 0, coins 30
it('keeps a challenge done after a wrong resubmission', ...);// completed still holds it
it('records every submission with the failed tests', ...);   // Passed 3, Total 5, failed [3, 5], accepted false
it('charges 10 once to open a test', ...);                   // coins 20 → 10; again 10; rows returned both times
it('refuses to open without enough coins', ...);             // coins 5 → 409 not-enough-coins; coins 5
it('refuses to open a visible test', ...);                   // 400 bad-request
it('stops a submit when the service fails midway', ...);     // third test 'unavailable' → 503; no Submission; coins unchanged
it('refuses two statements in one batch', ...);              // affected [1, 1] → 422 multi; no Submission
it('fails only the slow test on a timeout', ...);            // test 2 timeout → passed false, reason 'chạy quá 5 giây'; others run
it('answers unavailable when Arcade is not configured', ...);// services throws → 503 unavailable
it('stores a hash, never the code', ...);                    // every learner argument equals learnerId('abc'), never 'abc'
```

- [ ] **Step 2: Chạy, thấy lỗi**

Run: `npx vitest run tests/arcade.test.ts`
Expected: FAIL.

- [ ] **Step 3: Viết `arcade.ts`**

Theo kiểu `core.ts`: thứ tự kiểm giống `prepare`. Mỗi handler bọc `try/catch`, lỗi không lường trước trả `unavailable`.

`runTests` chạy lần lượt từng test với `buildSetup`, dừng và trả `fail(kind)` khi gặp `quota`, `unavailable`, `rate`, hoặc `affected.length > 1` (`multi`), hoặc quá 5.000 dòng (`too-big`). `timeout` chỉ làm trượt test đó. Lỗi SQL: `passed: false`, `reason: 'câu lệnh bị lỗi'`, `error` nguyên văn. Hiện tối đa 200 dòng.

Chỉ sau khi chạy xong mọi test mới gọi `recordSubmission`, rồi `complete` nếu đạt.

- [ ] **Step 4: Chạy test**

Run: `npx vitest run tests/arcade.test.ts tests/api-core.test.ts tests/exercise-client.test.ts`, rồi `npm --prefix api run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add api/src/arcade.ts api/src/core.ts src/lib/exercise-types.ts src/lib/exercise-messages.ts tests/arcade.test.ts tests/helpers/arcade-fakes.ts
git commit -m "feat: handle Arcade runs, submissions and opened tests"
```

---

### Task 8: Mở đầu gọi API

**Files:**
- Modify: `api/src/index.ts`, `api/src/dev-server.ts`
- Test: `tests/arcade-config.test.ts`

**Interfaces:**
- Consumes: các handler ở Task 7, `arcadeServices`, `loadChallenges`
- Produces: `GET arcade/me`, `GET arcade/challenges/{id}`, `POST arcade/run`, `POST arcade/submit`, `POST arcade/open`, cùng header `x-access-code`.

- [ ] **Step 1: Viết test hỏng**

```ts
it('needs no Arcade settings until an Arcade call arrives', () => {
  const services = arcadeServices({});          // must not throw
  expect(() => services()).toThrow(/ARCADE_/);
});
```

- [ ] **Step 2: Chạy, thấy kết quả**

Run: `npx vitest run tests/arcade-config.test.ts`
Expected: PASS nếu Task 5 đã làm đúng; FAIL thì sửa `arcade-config.ts` trước.

- [ ] **Step 3: Đăng ký route**

`index.ts` tạo `const arcade: ArcadeDeps` từ `deps.codes`, `deps.allow`, `loadChallenges()`, `arcadeServices(process.env)`. Tên function: `arcadeMe`, `arcadeChallenge`, `arcadeRun`, `arcadeSubmit`, `arcadeOpen`.

`dev-server.ts` thêm cùng các đường dẫn, dùng `localEnv()`.

- [ ] **Step 4: Kiểm bằng API trên máy**

Chạy `npm --prefix api run build`, `npm --prefix api run dev` nền, rồi gọi:

```bash
curl -s -H "x-access-code: dev" http://127.0.0.1:7071/api/arcade/me
```

Expected: `{"ok":true,"coins":20,"completed":[]}`, hoặc số liệu của lần chạy trước.

Dừng server, chạy lại với `ARCADE_RUNNER_PASSWORD` rỗng. Expected: `/api/ping` trả `ok`, `/api/arcade/me` trả 503 `unavailable`.

- [ ] **Step 5: Commit**

```bash
git add api/src/index.ts api/src/dev-server.ts tests/arcade-config.test.ts
git commit -m "feat: expose the Arcade API next to the exercise API"
```

---

### Task 9: Client và nháp

**Files:**
- Create: `src/lib/arcade-client.ts`
- Modify: `src/lib/exercise-client.ts`, `src/lib/exercise-storage.ts`
- Test: `tests/arcade-client.test.ts`, `tests/exercise-client.test.ts` (chỉ thêm)

**Interfaces:**
- Consumes: kiểu phản hồi ở Task 2
- Produces:
  - `createApiCaller(base, fetchImpl?, opts?)`, tách từ `createExerciseClient`, trả hàm `call`
  - `createArcadeClient(base, fetchImpl?, opts?)` với `me(code, onSlow?)`, `challenge(id, code, onSlow?)`, `run(id, sql, code, onSlow?)`, `submit(id, sql, code, onSlow?)`, `open(id, test, code)`
  - `loadArcadeDraft(id, storage?)`, `saveArcadeDraft(id, text, storage?)`, khóa `sqlserver-course:arcade:draft:<id>`

- [ ] **Step 1: Viết test hỏng**

```ts
it('sends each Arcade call to its own path with the code', async () => { /* fetch fake: arcade/me GET; arcade/run POST body { challenge, sql }; arcade/open POST body { challenge, test } */ });
it('escapes the challenge id in the path', ...);          // 'a/b' → arcade/challenges/a%2Fb
it('turns a network failure into a failure reply', ...);  // { ok: false, kind: 'network' }
it('keeps Arcade drafts apart from exercise drafts', () => {
  saveArcadeDraft('x', 'A', storage); saveDraft('x', 'B', storage);
  expect([loadArcadeDraft('x', storage), loadDraft('x', storage)]).toEqual(['A', 'B']);
});
```

- [ ] **Step 2: Chạy, thấy lỗi**

Run: `npx vitest run tests/arcade-client.test.ts`
Expected: FAIL.

- [ ] **Step 3: Viết code**

Phần thân `call` chuyển nguyên sang `createApiCaller`.

- [ ] **Step 4: Chạy test**

Run: `npx vitest run tests/arcade-client.test.ts tests/exercise-client.test.ts`
Expected: PASS, không phải sửa test cũ.

- [ ] **Step 5: Commit**

```bash
git add src/lib/arcade-client.ts src/lib/exercise-client.ts src/lib/exercise-storage.ts tests/arcade-client.test.ts
git commit -m "feat: add the Arcade client and draft storage"
```

---

### Task 10: Mockup hai màn

**Files:**
- Create: `.superpowers/arcade-mockup/index.html` (không commit)

- [ ] **Step 1: Dựng mockup tĩnh**

Đọc `DESIGN.md` và dùng skill `frontend-design`. Hai màn: trang Luyện SQL có bản đồ 9 chương; trang làm bài có test đã đạt, test chưa đạt, hidden test khóa, hidden test đã mở. Dữ liệu giả, không sao chép hình của CodeSignal.

- [ ] **Step 2: Mở trong Browser pane và gửi ảnh chụp cho người làm khóa học**

Expected: có ảnh ở rộng 1440 và 390 px.

- [ ] **Step 3: Chờ duyệt**

Không bắt đầu Task 11 khi chưa được duyệt. Quyết định thay đổi bố cục thì ghi vào mục 7 của spec và commit.

---

### Task 11: Trang Luyện SQL và kiểm bản build

**Files:**
- Create: `src/pages/luyen-sql/index.astro`, `src/pages/luyen-sql/[id].astro`, `src/components/islands/ArcadeHome.tsx`, `src/components/islands/ArcadeTable.tsx`, `src/lib/arcade-view.ts`, `src/styles/arcade.css`
- Modify: `src/components/layout/TopBar.astro`, `src/layouts/BaseLayout.astro`, `scripts/check-dist.mjs`
- Test: `tests/arcade-view.test.ts`, `tests/check-dist.test.ts`

**Interfaces:**
- Consumes: `publicChallenge`, `sortChallenges`, `isUnlocked`, `createArcadeClient`, `loadAccessCode`, `saveAccessCode`, `MESSAGES`, `WAITING`
- Produces:
  - `arcadeUrl(id?: string): string`
  - `chapterView(chapters, challenges, completed: ReadonlySet<string>): { id; title; done: number; total: number; items: { id; title; difficulty; reward; status: 'done' | 'current' | 'locked' }[] }[]`
  - `ArcadeTable`, props `{ columns: string[]; rows: Cell[][] }`, dùng lớp `.res-grid`
  - `hiddenOnlyValues(c: Challenge): string[]`, `findHiddenLeaks(html: string, values: string[]): string[]` trong `check-dist.mjs`

- [ ] **Step 1: Viết test hỏng**

```ts
it('marks done, current and locked in play order', () => {
  const v = chapterView(chapters, challenges, new Set(['a']));
  expect(v.flatMap(c => c.items.map(i => i.status))).toEqual(['done', 'current', 'locked']);
  expect(v[0]).toMatchObject({ done: 1, total: 2 });
});
```

Thêm vào `tests/check-dist.test.ts`:

```ts
it('lists string values only hidden tests hold', () => {
  expect(hiddenOnlyValues(challenge)).toEqual(['BAT-MAT']);     // shorter than 4 characters and visible values left out
});
it('finds a hidden value in a built page, however it was escaped', () => {
  expect(findHiddenLeaks('<astro-island props="[&quot;BAT-MAT&quot;]">', ['BAT-MAT'])).toEqual(['BAT-MAT']);
  expect(findHiddenLeaks('<p>không có</p>', ['BAT-MAT'])).toEqual([]);
});
```

- [ ] **Step 2: Chạy, thấy lỗi**

Run: `npx vitest run tests/arcade-view.test.ts tests/check-dist.test.ts`
Expected: FAIL.

- [ ] **Step 3: Viết trang và island**

Làm theo mockup đã duyệt.

- `TopBar.astro`: thêm link `Luyện SQL` trước `Phụ lục`.
- `index.astro`: truyền chương và thông tin bài công khai cho `ArcadeHome`.
- `ArcadeHome`: chưa có mã thì hiện form nhập mã; có mã thì gọi `me`, hiện coin, số bài xong, bản đồ. Bài khóa không bấm được và có chữ `Khóa`. Dưới 1100 px hiện danh sách.
- `[id].astro`: dựng cột đề như `.ex-brief`, gồm độ khó, coin thưởng, yêu cầu, cột, thứ tự dòng, link bài cần biết, cấu trúc bảng; chỉ nhận `PublicChallenge`.
- `arcade.css`: import trong `BaseLayout.astro`, dùng token sẵn có.

- [ ] **Step 4: Mở rộng `check-dist.mjs`**

Đọc YAML trong `src/content/arcade/`. Kiểm:

- Có `dist/luyen-sql/index.html` và một trang cho mỗi bài.
- Không có `answer`, `catches` trong `luyen-sql/**` và `_astro/**`. Không quét trang bài học, vì `answer` có thể trùng câu ví dụ ở đó.
- `findHiddenLeaks` trên trang của chính bài đó.

- [ ] **Step 5: Chạy kiểm**

Run: `npx vitest run tests/arcade-view.test.ts tests/check-dist.test.ts`, `npm run build`, `npm run check:dist`
Expected: PASS; `check-dist: OK`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/luyen-sql src/components/islands/ArcadeHome.tsx src/components/islands/ArcadeTable.tsx src/lib/arcade-view.ts src/styles/arcade.css src/components/layout/TopBar.astro src/layouts/BaseLayout.astro scripts/check-dist.mjs tests/arcade-view.test.ts tests/check-dist.test.ts
git commit -m "feat: add the Arcade home and challenge pages"
```

---

### Task 12: Khung làm bài

**Files:**
- Create: `src/components/islands/ArcadeWorkspace.tsx`, `src/components/islands/ArcadeTests.tsx`
- Modify: `src/lib/arcade-view.ts`, `src/pages/luyen-sql/[id].astro`, `src/styles/arcade.css`
- Test: `tests/arcade-view.test.ts`

**Interfaces:**
- Consumes: `createArcadeClient`, `loadArcadeDraft`, `saveArcadeDraft`, `SqlEditor`, `editorKeyAction`, `ArcadeTable`, `ARCADE_RULES`
- Produces: `testRows(challenge: PublicChallenge, opened: PublicTest[], lastFailed: number[] | null, results: TestResult[] | null): TestRow[]`, với `TestRow { id: number; kind: 'unit' | 'opened' | 'hidden'; status: 'passed' | 'failed' | 'idle'; test: PublicTest | null; result: TestResult | null }`

- [ ] **Step 1: Viết test hỏng**

```ts
it('lists unit, opened and locked tests in id order', ...);       // kinds ['unit','unit','opened','hidden','hidden']
it('takes status from the latest results, then the last submission', () => {
  expect(testRows(c, [], [3], null).find(r => r.id === 3)?.status).toBe('failed');
  expect(testRows(c, [], [3], null).find(r => r.id === 4)?.status).toBe('passed');
  expect(testRows(c, [], null, null).find(r => r.id === 3)?.status).toBe('idle');
});
it('gives a locked test no data', ...);                           // test null for kind 'hidden'
```

- [ ] **Step 2: Chạy, thấy lỗi**

Run: `npx vitest run tests/arcade-view.test.ts`
Expected: FAIL.

- [ ] **Step 3: Viết `testRows` và hai island**

`ArcadeWorkspace`:

- Lúc mở: `loadArcadeDraft(id)`, gọi `challenge()`; không có nháp thì điền `lastSql`.
- `unlocked: false`: tắt hai nút, hiện dòng cần xong bài trước.
- Nút `Chạy thử (F5)`, `Nộp bài`; F5, Ctrl+Enter như `ExerciseWorkspace`.
- Thiếu mã hoặc sai mã xử lý như `ExerciseWorkspace`.
- `onSlow` hiện `WAITING`. Lỗi hiện `MESSAGES[kind]`, riêng `blocked` hiện `reason`. Trạng thái có `role="status"`.

`ArcadeTests`:

- Danh sách test có nhãn bằng chữ (`Đạt`, `Chưa đạt`, `Chưa chạy`), không chỉ dùng màu.
- Mở một test hiện dữ liệu vào, kết quả mong đợi, kết quả của bạn, lý do, nguyên văn lỗi.
- Hidden test khóa có nút `Mở (10 coin)`. Hộp xác nhận ghi giá và số dư, thiếu coin thì tắt nút xác nhận và ghi `Chưa đủ coin`.
- Xong bài hiện số coin nhận được và link sang bài kế.

- [ ] **Step 4: Chạy test**

Run: `npx vitest run tests/arcade-view.test.ts`, `npm run check`
Expected: PASS, `astro check` không lỗi.

- [ ] **Step 5: Thử thật trên trình duyệt**

Chạy API trên máy, `preview_start` tên `site-dev`, vào `/luyen-sql/chon-hai-cot/` bằng mã `dev`. Kiểm: chạy thử, nộp sai, mở test, nộp đúng; không có lỗi console.

- [ ] **Step 6: Commit**

```bash
git add src/components/islands/ArcadeWorkspace.tsx src/components/islands/ArcadeTests.tsx src/lib/arcade-view.ts src/pages/luyen-sql src/styles/arcade.css tests/arcade-view.test.ts
git commit -m "feat: add the Arcade workspace with tests and coins"
```

---

### Task 13: Quy tắc nội dung và chương 1 thí điểm

**Files:**
- Create: `src/content/arcade/2-1/*.yaml`, `docs/reviews/<ngày làm>-arcade-chuong-1-review.md`
- Modify: `docs/quy-uoc.md` (mục mới 2.8), `src/data/arcade.ts` (tên chương)

- [ ] **Step 1: Thêm mục "2.8 Bài luyện Arcade" vào `docs/quy-uoc.md`**

Chép quy tắc mục 8.2, 8.4 của spec vào quy ước, kèm bảng Từ khóa ở dưới. Chạy `npx vitest run tests/docs.test.ts`. Expected: PASS.

- [ ] **Step 2: Viết đủ 5 bài chương 1, điền `expected`**

Theo [Quy trình một chương](#quy-trình-một-chương).

- [ ] **Step 3: Học thử trên trình duyệt**

Làm cả 5 bài bằng một mã thử mới. Ghi lại chỗ đề khó hiểu, test quá dễ, coin thưởng không hợp lý.

- [ ] **Step 4: Sửa khung nếu cần, review, commit**

Sai lệch về quy trình hoặc định dạng thì sửa ngay và cập nhật plan, trước khi viết 45 bài còn lại.

```bash
git add src/content/arcade/2-1 src/data/arcade.ts docs/quy-uoc.md docs/reviews
git commit -m "feat: add Arcade chapter 1"
```

---

### Task 14: Chương 2 tới chương 9

**Files:**
- Create: `src/content/arcade/2-2/*.yaml` tới `src/content/arcade/2-9/*.yaml`, một report review mỗi chương trong `docs/reviews/`
- Modify: `src/data/arcade.ts` (tên chương), `tests/arcade-content.test.ts`

- [ ] **Step 1: Làm từng chương theo Quy trình một chương, mỗi chương một commit**

```bash
git add src/content/arcade/2-2 src/data/arcade.ts docs/reviews
git commit -m "feat: add Arcade chapter 2"
```

Đổi số chương cho từng lượt, lần lượt từ 2 tới 9.

- [ ] **Step 2: Khóa số lượng bài**

Thêm vào `tests/arcade-content.test.ts`:

```ts
it('has the approved number of challenges in every chapter', () => {
  const files = readChallengeFiles();
  for (const c of ARCADE_CHAPTERS) expect(files.filter(f => f.chapter === c.id).length, c.id).toBe(c.size);
  expect(files.filter(f => f.difficulty === 'de').length).toBe(20);
  expect(files.filter(f => f.difficulty === 'vua').length).toBe(20);
  expect(files.filter(f => f.difficulty === 'kho').length).toBe(10);
  expect(files.length).toBe(50);
});
```

Run: `npx vitest run tests/arcade-content.test.ts`
Expected: PASS.

- [ ] **Step 3: Review tích hợp nội dung**

Reviewer Sonnet, effort high, đọc từ chương 1 tới 9 theo mục 4.5 của quy ước, kiểm nhịp độ khó và lặp đề. Xử lý từng nhận xét theo mục 4.6.

- [ ] **Step 4: Commit**

```bash
git add tests/arcade-content.test.ts docs/reviews src/content/arcade
git commit -m "test: lock the 50 Arcade challenges of the basic level"
```

### Quy trình một chương

1. Đọc lại bài học của chương. Chỉ dùng từ khóa đã dạy tới hết chương đó, xem bảng dưới.
2. Viết file YAML theo mục 8.3 của spec. Bối cảnh đổi qua lại giữa nhân sự, tuyển dụng, đào tạo, tài sản, công tác phí, phúc lợi. Mỗi bài có ít nhất 2 unit test, 3 hidden test.
3. Mỗi hidden test bắt một lỗi cụ thể, ghi thành `catches`. Không dùng cùng một kiểu `catches` cho mọi bài trong chương.
4. Chạy `npm --prefix api run build`, `npm --prefix api run check:arcade -- --write`, đọc lại `expected` bằng mắt, rồi chạy `npm --prefix api run check:arcade`. Expected: mọi bài `đạt`.
5. Chạy `npx vitest run tests/arcade-content.test.ts`. Expected: PASS.
6. Review một lượt bằng reviewer Sonnet, effort high theo mục 4.5: làm từng đề như người mới chỉ học tới chương đó, trước khi xem `answer`. Xử lý từng nhận xét theo mục 4.6.

| Chương | Số bài (Dễ/Vừa/Khó) | Từ khóa được dùng | Bẫy chính của hidden test |
|---|---|---|---|
| 2-1 | 5 (4/1/0) | `SELECT`, `*`, `AS`, `FROM` | Thêm dòng, bảng rỗng, ô `NULL` trong cột được chọn, thứ tự cột |
| 2-2 | 6 (3/3/0) | thêm `WHERE`, `=`, `<>`, `>`, `>=`, `<`, `<=`, `N'…'` | Giá trị ở biên, mã gần giống, không có dòng nào đạt |
| 2-3 | 7 (3/3/1) | thêm `AND`, `OR`, ngoặc, `IN`, `BETWEEN`, `LIKE`, `%`, `_` | Thiếu ngoặc, hai đầu `BETWEEN`, nhầm `_` với `%`, tiền tố gần giống |
| 2-4 | 5 (2/2/1) | thêm `ORDER BY`, `ASC`, `DESC`, `TOP` | Thiếu tiêu chí phụ, ít hơn n dòng, đảo thứ tự chèn |
| 2-5 | 5 (2/2/1) | thêm `IS NULL`, `IS NOT NULL`, `COALESCE`, `ISNULL` | Chuỗi rỗng, chữ `NULL`, `<>` bỏ mất dòng `NULL` |
| 2-6 | 4 (2/1/1) | thêm `DISTINCT` | Trùng trên nhiều cột, nhiều `NULL` gộp một dòng, sai phạm vi cột |
| 2-7 | 6 (2/2/2) | thêm `UPPER`, `LOWER`, `LEN`, `LEFT`, `RIGHT`, `SUBSTRING`, `TRIM`, `CONCAT`, `COLLATE` | Khoảng trắng đầu cuối, chuỗi ngắn hơn độ dài cắt, ô `NULL`, có dấu và không dấu |
| 2-8 | 6 (1/3/2) | thêm `CAST`, `DATEADD`, `DATEDIFF`, `EOMONTH` | Biên tháng, năm nhuận, `DATEDIFF` đếm ranh giới; dùng mốc cố định |
| 2-9 | 6 (1/3/2) | thêm `CASE`, `WHEN`, `ELSE` | Thứ tự nhánh, thiếu `ELSE` ra `NULL`, ô `NULL`, giá trị ở biên |

Bài có phép tính số, `NOT IN`, `NOT LIKE`, `PERCENT`, `WITH TIES`, `YEAR()`, `REPLACE`, `CHARINDEX`, `FORMAT` chưa nằm trong bảng trên. Chỉ dùng nếu đọc lại bài học thấy đã dạy; nếu không thì tránh.

---

### Task 15: Nghiệm thu, tài liệu, phát hành

**Files:**
- Modify: `README.md`, `docs/quy-uoc.md` (mục 5), `docs/superpowers/specs/2026-11-03-sql-arcade-mvp-design.md` (mục 15 Hiện trạng), plan này (mục Sai khác so với plan)

- [ ] **Step 1: Chạy toàn bộ kiểm tự động**

Run: `npm test`, `npm run check`, `npm run build`, `npm run check:dist`, `npm --prefix api run typecheck`, `npm --prefix api run build`
Expected: tất cả đạt.

- [ ] **Step 2: Chạy kiểm trên database thật**

Run: `npm --prefix api run check:arcade`, `npm --prefix api run check:arcade:store`, `npm --prefix api run check:exercises`, `npm --prefix api run check:data`
Expected: 50 bài `đạt`, `store: đạt`, bài tập cũ không lỗi, `Không bảng nào lệch.`

- [ ] **Step 3: Nghiệm thu trên trình duyệt**

Chạy đủ 9 kịch bản ở mục 10 của spec với một mã thử chưa dùng. Ghi kết quả và ảnh chụp vào phần Sai khác của plan. Reset kích thước viewport sau khi xong.

- [ ] **Step 4: Cập nhật tài liệu**

- README: phần Arcade, lệnh `check:arcade`, `check:arcade:store`, biến môi trường, cấu trúc thư mục, câu về dữ liệu hidden test trong repo public.
- `docs/quy-uoc.md` mục 5: database Arcade, schema `dbo` chỉ ghi trong transaction hoàn tác, schema `arcade` là dữ liệu học viên thật.
- Spec: mục Hiện trạng. Plan: mục Sai khác so với plan.
- Memory: `project-course-status`, `reference-course-endpoints`, `feedback-database-safety`.

```bash
git add README.md docs
git commit -m "docs: record the Arcade MVP as built"
```

- [ ] **Step 5: Review cuối toàn nhánh**

Một reviewer độc lập đọc cả nhánh, gồm công cụ, API, nội dung. Sửa cả lỗi nhỏ, chạy lại Step 1, ghi quyết định theo mục 4.6.

- [ ] **Step 6: Xin phép phát hành**

Liệt kê cho người làm khóa học: năm biến `ARCADE_*` cần điền trên Function App, nhánh cần merge, việc push sẽ deploy web và API. Chờ đồng ý rồi mới push.

- [ ] **Step 7: Kiểm sau khi deploy**

Gọi `/api/arcade/me` không kèm mã, expected 401. Làm một bài trên web thật với mã của học viên hoặc mã thử do người làm khóa học cấp. Chạy lại `check:data`. Expected: không bảng nào lệch.

## Sai khác so với plan

Plan được làm hết 15 task. Những chỗ làm khác:

- Task 1: `arcade-setup.sql` dùng `EXEC` cho `CREATE SCHEMA` thay `GO`, và do người dựng áp dụng theo đề nghị của người làm khóa học. Spike 1,09 giây một vòng vượt ngưỡng 600 ms; đo riêng thấy gần như toàn bộ là độ trễ mạng từ máy phát triển nên vẫn làm tiếp, số thật đo sau deploy.
- Task 8: chạy API ở máy qua cấu hình `.claude/launch.json` thay vì `curl` sau `npm run dev`.
- Task 10: chụp mockup bằng Playwright qua server cục bộ.
- Task 12: số coin nằm ở thanh công cụ của khung làm bài, không ở breadcrumb; bước xác nhận mở test nằm ngay trong khung khóa, không phải hộp thoại.
- Task 13: thay bài 4 và 5 của chương 1 thay vì thêm câu vào bài 2.1.
- Task 14: mỗi reviewer đọc hai chương liền nhau thay vì một chương; review tích hợp nội dung gộp vào review cuối. Bảng từ khóa hẹp lại theo đúng những gì bài học dạy. Thêm `check:arcade -- <chương>` và `--write` để điền `expected`.
- Task 15: thêm `retryWhileWaking` khi `check:arcade` gặp database đang ngủ; `check:dist` chỉ quét `<main>` và khớp nguyên giá trị. Review cuối dẫn tới `Store.submit`, xem [hồ sơ xử lý](../../reviews/2026-11-03-arcade-tich-hop-disposition.md).
