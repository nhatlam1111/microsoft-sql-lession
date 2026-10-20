# Level 1 viết đầy đủ: Implementation Plan

> Cập nhật 20/10/2026: khung bài và cách trình bày hiện hành theo [quy ước](../../quy-uoc.md) và [lesson-template](../../lesson-template.md), lấy bài 1.1 đã duyệt làm mẫu. Các chỉ dẫn tách "Với Excel" / "Làm bằng SQL", ép đủ khối hoặc trả lời tình huống riêng trong phần lịch sử bên dưới đã được thay thế. Các quyết định khác áp dụng khi không mâu thuẫn với quy ước hiện hành và các quyết định được duyệt sau đó.

**Trạng thái (2026-10-18):** đã làm xong 13 task theo cách Native, rà soát cuối bằng một reviewer độc lập (kết luận "With fixes": 2 lỗi đáng sửa, 8 lỗi nhỏ, đều đã sửa có test). Đã merge vào `main`. Các quyết định trong lúc làm: tên database thật là `free-sql-db-8797714` (giữ nguyên theo quyết định của người làm khóa học); hộp kết nối theo SSMS 21; bài tập 1.6 dùng ChucDanh, HopDong, DonNghiPhep để không lọt đáp án vào bài. Sau khi lên web, Level 1 sửa thêm ba vòng ngày 2026-10-19 (spec Level 1 mục 11–13); bài học rút ra cho plan các level sau ở mục cuối file.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Năm bài 1.2–1.6 thành bài đầy đủ theo khuôn mới; bài 1.1 và 3.5 sắp lại theo khuôn đó. Bài 1.1–1.5 không có mục "Bài tập". Bài 1.6 có 3 bài tập và sơ đồ thứ tự chạy. Web có thêm khối mô phỏng SSMS và sơ đồ quan hệ đặt thẳng trong bài, và hiện tên database `free-sql-db-8797714` ở dòng trạng thái.

**Architecture:**
- Quy tắc về mục bài nằm ở `src/lib/lesson-schema.ts` (thêm trường `noExercises`) và được kiểm trong `tests/content.test.ts`.
- Tên máy chủ và database của khóa học nằm ở một hằng số dùng chung (`src/lib/course-server.ts`).
- Khối SSMS là một component Astro tĩnh, đọc cột từ `database/HRM_Demo.sql` như popup sơ đồ.
- Sơ đồ quan hệ trong bài 1.5 dùng lại phần vẽ của popup, tách thành một component React render tĩnh.
- Nội dung bài viết bằng MDX. Mọi kết quả trong bài được kiểm trên database `free-sql-db-8797714` bằng MCP chỉ đọc.

**Tech Stack:** Astro 5 (MDX), React 19 (render tĩnh, không hydrate), Vitest 3 (Astro Container API, `react-dom/server`), API bài tập trên máy (`npm --prefix api run dev`), MCP `azure-sql`.

**Lưu ý (2026-10-18, trong lúc làm):** database trên máy chủ `sql-lession` tên là `free-sql-db-8797714`, không phải `sql-lession`. Người làm khóa học quyết định giữ tên này. Mọi chỗ ghi database dưới đây theo tên thật.

**Spec:** [docs/superpowers/specs/2026-10-18-level-1-full-lessons-design.md](../specs/2026-10-18-level-1-full-lessons-design.md). Nền:
- [spec đợt 1](../specs/2026-10-17-sql-server-course-site-design.md), mục 4.5, 4.7, 4.8;
- [spec đợt 2](../specs/2026-10-18-step-flow-exercises-full-lessons-design.md), mục 4 về sơ đồ thứ tự chạy;
- [spec B](../specs/2026-10-18-exercise-runner-design.md) về bài tập.

Bài mẫu: `src/content/lessons/3-5-left-join.mdx` (giọng văn, khối, sơ đồ).

## Global Constraints

- Thứ tự mục bài đầy đủ: Tình huống, Với Excel, Làm bằng SQL, Hay nhầm ở đâu, Ứng dụng, Ghi nhớ, Bài tập. Tên mục giữ nguyên.
- Mục "Bài tập" không có ở bài 1.1–1.5. Bản tóm tắt từ Level 2 trở đi giữ mục "Bài tập" với dòng "Phần bài tập sẽ bổ sung sau.".
- "Làm bằng SQL" có các tiểu mục cấp 3. Đầu tiên là `### Lý thuyết cơ bản`. Nếu bài có sơ đồ thì hai tiểu mục cuối là `### Câu lệnh cho tình huống` rồi `### SQL Server chạy câu này thế nào`. Không có tiểu mục nào bắt đầu bằng "Bước". Bài 6.5 giữ nguyên, không theo quy tắc này.
- "Lý thuyết cơ bản" gồm bốn phần:
  - một câu nói khái niệm là gì;
  - cú pháp chung, chỗ cần điền viết bằng chữ;
  - một ví dụ nhỏ cho thấy dữ liệu vào và ra; ví dụ thu gọn dùng bảng Markdown, không dùng khối `Result`, vì `Result` ghi dòng trạng thái của database thật;
  - bảng "từng phần nghĩa là gì" (`LineMap`).
- Giọng văn theo spec đợt 1 mục 4.7:
  - xưng "bạn"; dùng "kết bảng" cho `JOIN`;
  - không nhắc vai trò hay xuất thân người đọc;
  - không dùng cụm trong `BANNED_PHRASES`;
  - chuỗi tiếng Việt trong SQL có `N`;
  - kết quả bị cắt ghi "trích N dòng".
- Lời giải thích trong drawer của sơ đồ xoay quanh từ khóa của bước đó, như bài 3.5.
- Ở Level 1, bài không bảo học viên chạy trong SSMS câu `INSERT`, `UPDATE` hay `DELETE`. Câu sửa dữ liệu chỉ đưa ra để đọc.
- Thông tin kết nối:
  - Server name: `sql-lession.database.windows.net`.
  - Authentication: SQL Server Authentication, tài khoản do người phụ trách khóa học cấp.
  - Database: `free-sql-db-8797714` (tên Azure tự đặt khi tạo database miễn phí; người làm khóa học giữ nguyên, không đổi).
- Dòng trạng thái dưới khối `Result`, khối `Messages` và trên trang làm bài tập ghi `free-sql-db-8797714`. "HRM_Demo" vẫn là tên bộ dữ liệu mẫu (tên bài 1.2, script, popup "Sơ đồ HRM_Demo", trang Giới thiệu).
- Bài tập 1.6:
  - 3 bài truy vấn, `ordered: false`;
  - chỉ dùng `SELECT *`: không chọn cột, không `WHERE`, không `ORDER BY`, không `TOP`;
  - ba bảng khác nhau: một bảng nhỏ, một bảng có ô `NULL`, một bảng có cột ngày hoặc tiền.
- Database:
  - Mọi câu lệnh và kết quả trong bài khớp database `free-sql-db-8797714`; kiểm bằng `SELECT` qua MCP `azure-sql`. MCP chỉ dùng cho `SELECT`.
  - Câu làm đổi dữ liệu (để lấy nguyên văn lỗi) chỉ chạy qua API bài tập trên máy, có hoàn tác. Chạy xong thì `npm --prefix api run check:data` phải báo "Không bảng nào lệch.".
- Không push khi người làm khóa học chưa đồng ý.
- Không làm hỏng cái đang chạy: 171 test hiện có vẫn qua (trừ test được plan này sửa); `npm run check`, `npm run build`, `npm run check:dist` vẫn OK.

## Review Focus

1. **Bảng kết quả trong bài không khớp database thật** (số dòng, `NULL`, giá trị tiền, thứ tự): mỗi task viết bài có bước chạy lại mọi câu qua MCP. Người rà soát chạy lại ngẫu nhiên vài câu.
2. **Hướng dẫn kết nối SSMS lệch với bản SSMS học viên đang dùng** (vị trí ô "Connect to database"): Task 8 kiểm tài liệu Microsoft cho bản mới nhất và ghi tên bản trong bài.
3. **Bỏ mục "Bài tập" mà còn sót link hoặc câu nhắc tới nó** (mục lục bên phải, câu "xem phần bài tập" trong bài): `check:dist` bắt link gãy. Task 1 thêm test: bài có `noExercises` thì không có chữ `<Exercises`.
4. **Sơ đồ thứ tự chạy bài 1.6 nói sai về `TOP` khi không có `ORDER BY`** (hứa "10 người đầu tiên theo mã"): Task 12 ghi rõ thứ tự không được bảo đảm và trỏ tới bài 2.4. `checkFlow` kiểm số dòng của từng bước.
5. **Đổi nhãn database làm mất "HRM_Demo" ở chỗ phải giữ** (popup sơ đồ): Task 2 có test popup vẫn là "Sơ đồ HRM_Demo".

---

### Task 1: Bài không có mục "Bài tập" (`noExercises`)

**Files:**
- Modify: `src/lib/lesson-schema.ts`
- Modify: `src/content/lessons/1-1-database-la-gi.mdx`, `1-2-…`, `1-3-…`, `1-4-…`, `1-5-…` (thêm `noExercises: true`, xóa `## Bài tập` và `<Exercises />`)
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces:
  - `lessonSchema` có thêm `noExercises: z.boolean().optional()`;
  - `sectionHeadings(kind: 'full' | 'summary', noExercises?: boolean): string[]`: `SECTION_HEADINGS[kind]`, bỏ `'Bài tập'` khi `noExercises`.

- [ ] **Step 1: Viết test**, trong `tests/content.test.ts`:
  - test `'uses exactly the section headings of its kind, in order'` đổi sang so với `sectionHeadings(kind, data.noExercises)`;
  - thêm `it('lessons 1.1 to 1.5 have no exercises section')`: với `num` thuộc `['1.1','1.2','1.3','1.4','1.5']` thì `data.noExercises === true` và body không chứa `<Exercises`;
  - thêm `it('a lesson with an exercise file is not marked noExercises and lists its exercises')`: với mỗi file trong `src/content/exercises/`, bài có `slug === file.lesson` thì `noExercises !== true` và body chứa `<Exercises />`;
  - thêm `it('sectionHeadings drops Bài tập only when asked')`: `sectionHeadings('full', true)` bằng 6 mục đầu; `sectionHeadings('summary')` vẫn kết thúc bằng `'Bài tập'`.
- [ ] **Step 2: Chạy `npx vitest run tests/content.test.ts`**. Kỳ vọng FAIL: `sectionHeadings` chưa có, các bài 1.1–1.5 chưa có `noExercises`.
- [ ] **Step 3: Viết `sectionHeadings`, thêm trường vào schema, sửa 5 file bài**: thêm `noExercises: true` vào phần đầu file, xóa khối `## Bài tập` cuối bài.
- [ ] **Step 4: `npm test` PASS; `npm run build` rồi `npm run check:dist` OK.**
- [ ] **Step 5: Commit**: `git commit -m "drop the exercises section from lessons 1.1 to 1.5"`

### Task 2: Tên máy chủ và database của khóa học

**Files:**
- Create: `src/lib/course-server.ts`
- Modify: `src/components/lesson/Result.astro`, `src/components/lesson/Messages.astro` (giá trị mặc định của `db`); `src/components/islands/ExerciseWorkspace.tsx` (dòng trạng thái đang ghi cứng `HRM_Demo`)
- Test: `tests/components.test.ts`, `tests/islands.test.ts`

**Interfaces:**
- Produces: `export const COURSE_SERVER = { server: 'sql-lession.database.windows.net', database: 'sql-lession' } as const;`

- [ ] **Step 1: Sửa test:**
  - Trong `tests/components.test.ts`, test `Result` đổi `'HRM_Demo'` thành `'free-sql-db-8797714'` và thêm `expect(html).not.toContain('HRM_Demo')`.
  - Test `Messages` kiểm có `'free-sql-db-8797714'`.
  - Trong `tests/islands.test.ts`, thêm `it('the diagram popup keeps the data set name HRM_Demo')`: `renderToStaticMarkup(createElement(DbDiagramDialog, { tables: parseSchema(readFileSync('database/HRM_Demo.sql','utf8')), open: true, onClose: () => {} }))` chứa `'Sơ đồ HRM_Demo'`.
- [ ] **Step 2: Chạy, kỳ vọng FAIL ở test Result và Messages.**
- [ ] **Step 3: Tạo `course-server.ts`; ba file trên đọc `COURSE_SERVER.database`.**
- [ ] **Step 4: `npm test` PASS.**
- [ ] **Step 5: Commit**: `git commit -m "show the course database name sql-lession next to results"` (sau đó sửa: tên thật của database là `free-sql-db-8797714`, xem Task 8 trong ledger)

### Task 3: Cột có cho để trống, nhãn cột kiểu SSMS

**Files:**
- Modify: `src/lib/db-schema.ts`
- Test: `tests/db-schema.test.ts`

**Interfaces:**
- Produces:
  - `DbColumn` thành `{ name: string; type: string; nullable: boolean }`. `nullable` là `false` khi dòng cột có `NOT NULL`.
  - `ssmsColumnLabel(table: DbTable, column: DbColumn): string`: nhãn như Object Explorer, ví dụ `MaNV (PK, varchar(10), not null)`.

- [ ] **Step 1: Viết test:**
  - sửa kỳ vọng hiện có thành `{ name: 'MaNV', type: 'varchar(10)', nullable: false }`;
  - thêm `it('labels columns as SSMS Object Explorer does')`. Lấy `NhanVien` và `ChamCong` từ `parseSchema` của script thật, kỳ vọng:
    - `ssmsColumnLabel(nv, MaNV)` bằng `'MaNV (PK, varchar(10), not null)'`;
    - `MaPB` bằng `'MaPB (FK, varchar(10), not null)'`;
    - `Email` bằng `'Email (varchar(100), null)'`;
    - `ChamCong.MaNV` bằng `'MaNV (PK, FK, varchar(10), not null)'`.
- [ ] **Step 2: Chạy `npx vitest run tests/db-schema.test.ts`, kỳ vọng FAIL.**
- [ ] **Step 3: Viết code.** Nhãn: `PK` nếu cột thuộc `primaryKey`, `FK` nếu có trong `foreignKeys`, rồi kiểu, rồi `null` hoặc `not null`, cách nhau bởi `, `.
- [ ] **Step 4: `npm test` PASS. Sơ đồ và test sơ đồ không đổi kết quả.**
- [ ] **Step 5: Commit**: `git commit -m "read nullability and label columns the way SSMS does"`

### Task 4: Sơ đồ quan hệ đặt thẳng trong bài (`Erd`)

**Files:**
- Modify: `src/components/islands/DbDiagram.tsx` (tách phần vẽ `.er` ra component riêng, popup dùng lại)
- Create: `src/components/lesson/Erd.astro`
- Modify: `src/components/lesson/index.ts` (thêm `Erd` vào `lessonComponents`), `src/styles/lesson.css` (khung cuộn ngang của sơ đồ trong bài)
- Test: `tests/islands.test.ts`

**Interfaces:**
- Consumes: `parseSchema`, `DbTable` (Task 3).
- Produces:
  - `export function DbDiagram({ tables }: { tables: DbTable[] })`: chỉ vẽ sơ đồ, không có popup.
  - `<Erd />` trong MDX, không cần prop. Component tự đọc `database/HRM_Demo.sql?raw` và render `<DbDiagram>` không có `client:*`. Bao ngoài là `<figure class="erd">` có vùng cuộn ngang `tabindex="0"`, `role="group"`, `aria-label="Sơ đồ quan hệ của HRM_Demo, cuộn ngang để xem hết"`.

- [ ] **Step 1: Viết test** `it('draws the diagram on its own, outside the popup')`:
  - `renderToStaticMarkup(createElement(DbDiagram, { tables }))` có đúng 7 `class="er-box"`, chứa `'NhanVien'`, `'PK'`, `'FK'`;
  - không chứa `role="dialog"`.
- [ ] **Step 2: Chạy, kỳ vọng FAIL (`DbDiagram` chưa có).**
- [ ] **Step 3: Tách component, viết `Erd.astro`, thêm vào `lessonComponents`.**
- [ ] **Step 4: `npm test` PASS. Mở trang bài tập trên dev server: popup sơ đồ vẫn như cũ.**
- [ ] **Step 5: Commit**: `git commit -m "draw the HRM_Demo diagram inside a lesson"`

### Task 5: Khối mô phỏng SSMS (`Ssms`)

**Files:**
- Create: `src/components/lesson/Ssms.astro`
- Modify: `src/components/lesson/index.ts`, `src/styles/lesson.css`
- Test: `tests/components.test.ts`

**Interfaces:**
- Consumes: `COURSE_SERVER` (Task 2), `parseSchema`, `ssmsColumnLabel` (Task 3).
- Produces: `<Ssms view="connect" | "explorer" | "toolbar" table?: string caption?: string />`.
  - `connect`: hộp "Connect to Server":
    - Server type "Database Engine";
    - Server name `COURSE_SERVER.server`;
    - Authentication "SQL Server Authentication", Login "tài khoản được cấp", mật khẩu che;
    - tab "Connection Properties" có ô "Connect to database" = `COURSE_SERVER.database`.
  - `explorer`: cây Object Explorer: máy chủ → Databases → `free-sql-db-8797714` → Tables → 7 dòng `dbo.<Bảng>`. Bảng tên `table` (mặc định `NhanVien`) mở mục Columns, mỗi cột một dòng theo `ssmsColumnLabel`.
  - `toolbar`: thanh công cụ có nút "New Query", ô chọn database đang chọn `COURSE_SERVER.database`, nút "Execute".
  - Mỗi khối là `<figure class="ssms">`, `aria-label` bắt đầu bằng "Mô phỏng SSMS:". `caption` (nếu có) là `figcaption`.

  Màu và cách vẽ do người dựng tự quyết, theo tinh thần khối Excel: nhận ra được trên máy mình, không cần giống từng điểm ảnh.

- [ ] **Step 1: Viết test** `it('Ssms draws the connect box, Object Explorer and the toolbar')`:
  - `connect` chứa `'sql-lession.database.windows.net'`, `'SQL Server Authentication'`, `'Connect to database'`, `'free-sql-db-8797714'`;
  - `explorer` chứa đủ 7 `dbo.` tên bảng, `'MaNV (PK, varchar(10), not null)'`, `'Email (varchar(100), null)'`;
  - `explorer` với `table="ChamCong"` chứa `'MaNV (PK, FK, varchar(10), not null)'`;
  - `toolbar` chứa `'New Query'`, `'Execute'`, `'free-sql-db-8797714'`.
- [ ] **Step 2: Chạy `npx vitest run tests/components.test.ts`, kỳ vọng FAIL.**
- [ ] **Step 3: Viết component và CSS.** Thêm vào `lessonComponents`.
- [ ] **Step 4: `npm test` PASS. Xem thử trên dev server bằng một trang nháp hoặc ở Task 8.**
- [ ] **Step 5: Commit**: `git commit -m "add an SSMS look-alike block for lessons"`

### Task 6: Sắp lại bài 1.1 và 3.5 theo khuôn mới

**Files:**
- Modify: `src/content/lessons/1-1-database-la-gi.mdx`, `src/content/lessons/3-5-left-join.mdx`
- Modify: `tests/helpers/lessons.ts` (thêm hàm lấy tiêu đề cấp 3 của mục "Làm bằng SQL")
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces: `sqlSubheadings(body: string): string[]` trong `tests/helpers/lessons.ts`. Hàm trả các dòng `### …` nằm giữa `## Làm bằng SQL` và mục `## ` kế tiếp.

- [ ] **Step 1: Viết test** `it('Làm bằng SQL starts with the theory and ends with the query and its run order')`. Với mọi bài `kind: full` trừ `num === '6.5'`:
  - tiêu đề cấp 3 đầu tiên là `'Lý thuyết cơ bản'`;
  - không tiêu đề nào bắt đầu bằng `'Bước'`;
  - nếu body có `<RunFlow` thì hai tiêu đề cuối là `['Câu lệnh cho tình huống', 'SQL Server chạy câu này thế nào']`.
- [ ] **Step 2: Chạy, kỳ vọng FAIL ở 1.1 và 3.5.**
- [ ] **Step 3: Sửa bài 3.5.**
  - `### Lý thuyết cơ bản`:
    - LEFT JOIN là gì;
    - cú pháp chung `SELECT các cột FROM bảng bên trái LEFT JOIN bảng bên phải ON điều kiện ghép`;
    - ví dụ nhỏ 3 nhân viên, 2 hợp đồng, ra 3 dòng có một `NULL`, viết bằng bảng Markdown và ghi rõ là ví dụ thu gọn. `lesson.css` chưa có kiểu cho bảng Markdown thì thêm một kiểu gọn, ô `NULL` vẫn nền vàng nhạt nếu làm được;
    - `LineMap` hiện có chuyển lên đây.
  - `### Câu lệnh cho tình huống`: câu đầy đủ đang có, ngay dưới là `Result` 2 dòng.
  - `### SQL Server chạy câu này thế nào`: giữ nguyên sơ đồ.
  - Xóa `### Bước 1`, `### Bước 2`. Câu "Cả bảng có 48 nhân viên nhưng kết quả ra 57 dòng" ở mục Hay nhầm vẫn đúng.
- [ ] **Step 4: Sửa bài 1.1.**
  - `### Lý thuyết cơ bản` gom phần "Excel và database đặt cạnh nhau": workbook ↔ database, sheet ↔ bảng, dòng ↔ bản ghi, cột ↔ cột có kiểu.
  - Câu `SELECT TOP (5) …` minh họa giữ lại dưới một tiểu mục khác (không có sơ đồ).
- [ ] **Step 5: Kiểm kết quả.** Mọi câu SQL và bảng kết quả còn trong hai bài khớp database `free-sql-db-8797714`: chạy lại từng câu bằng MCP `run_query`, so từng ô.
- [ ] **Step 6: `npm test` PASS; `npm run build`; `npm run check:dist` OK; xem bài 3.5 trên dev server.**
- [ ] **Step 7: Commit**: `git commit -m "lead Làm bằng SQL with the theory in lessons 1.1 and 3.5"`

### Task 7: Tài liệu khuôn bài

**Files:**
- Create: `docs/lesson-template.md`
- Modify: `README.md` (mục "Viết bài học" trỏ tới file mới, cập nhật khuôn "Làm bằng SQL" và `noExercises`)
- Modify: `docs/superpowers/specs/2026-10-17-sql-server-course-site-design.md` (mục 4.5, các ý 3 và 7)
- Modify: `docs/superpowers/specs/2026-10-18-step-flow-exercises-full-lessons-design.md` (mục 6: bài tập từ 1.6, bài 1.1 không thêm bài tập)

- [ ] **Step 1: Viết `docs/lesson-template.md`.** Gồm:
  - phần đầu file đủ các trường (kèm `noExercises`), mỗi trường một dòng chú thích;
  - các mục theo đúng thứ tự, với ba tiểu mục của "Làm bằng SQL";
  - đoạn mẫu ngắn cho mỗi khối: `Chat`, `Key`, `Excel`, `Sql`, `Result`, `Messages`, `LineMap`, `RunFlow`, `Mistakes`, `Apply`, `Memo`, `Exercises`, `Ssms`, `Erd`;
  - quy tắc viết và cách kiểm kết quả bằng MCP.

  Thuộc tính của từng khối lấy đúng từ file component.
- [ ] **Step 2: Sửa README và hai spec như trên.** Mục 4.5 của spec đợt 1 trỏ sang spec Level 1 mục 3.
- [ ] **Step 3: Kiểm.** `npm run check:dist` OK. Mọi link tương đối trong file mới mở được: `node -e` đọc file, lấy các `](...)`, kiểm `fs.existsSync`.
- [ ] **Step 4: Commit**: `git commit -m "add the lesson template and update the course specs"`

### Task 8: Viết đầy đủ bài 1.2

**Files:**
- Modify: `src/content/lessons/1-2-sql-server-ssms-hrm-demo.mdx` (`kind: full`, `minutes`, `goal` mới: kết nối được máy chủ khóa học bằng SSMS và mở được bảng `NhanVien`)
- Modify: `tests/helpers/expected.ts` (`'1.2 A1'` thành `'1.2 A1 full'`)

**Interfaces:**
- Consumes: `<Ssms>` (Task 5), `COURSE_SERVER` (Task 2), `noExercises` (Task 1).

- [ ] **Step 1: Kiểm hộp kết nối của bản SSMS mới nhất** trên tài liệu Microsoft (learn.microsoft.com, trang "Connect to a SQL Server or Azure SQL Database" của SSMS): ô chọn database nằm ở đâu, tên tab là gì. Ghi tên bản SSMS sẽ tả trong bài. Bản mới khác khối `Ssms view="connect"` thì sửa khối cho khớp, kèm test của Task 5.
- [ ] **Step 2: Viết bài.**
  - Tình huống: được cấp tài khoản, cần mở bảng nhân viên trước buổi họp.
  - Với Excel: mở file khác kết nối máy chủ.
  - Làm bằng SQL:
    - `### Lý thuyết cơ bản`: server, database, bảng; SSMS là cửa sổ nhìn vào máy chủ;
    - kết nối theo spec Level 1 mục 4.1, dùng `<Ssms view="connect">`; ghi triệu chứng khi quên ghi database, nguyên văn lỗi đăng nhập lấy từ tài liệu Microsoft;
    - Object Explorer với `<Ssms view="explorer">`;
    - New Query, ô chọn database và F5 với `<Ssms view="toolbar">`, kèm câu `SELECT TOP (5) * FROM NhanVien;` và kết quả thật;
    - tên database: bộ dữ liệu mẫu HRM_Demo nằm trong database `free-sql-db-8797714` (spec mục 5.2);
    - trang làm bài tập trên web (spec mục 4.2);
    - phần thêm: tự có bản riêng bằng `HRM_Demo.sql` trên SQL Server cài ở máy, đặt tên database `HRM_Demo`.
  - Hay nhầm ở đâu: quên ghi database; chạy câu khi đang chọn `master`; nhầm Server name.
  - Ứng dụng, Ghi nhớ: viết bình thường.
- [ ] **Step 3: Kiểm kết quả trong bài qua MCP.** Danh sách 7 bảng dùng `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES ORDER BY TABLE_NAME`; `TOP (5)` của `NhanVien` chạy lại đúng câu trong bài.
- [ ] **Step 4: `npm test` PASS; build; `check:dist` OK; xem bài trên dev server.**
- [ ] **Step 5: Commit**: `git commit -m "write lesson 1.2 in full: connect SSMS to the course server"`

### Task 9: Viết đầy đủ bài 1.3

**Files:** `src/content/lessons/1-3-bang-cot-kieu-du-lieu.mdx`; `tests/helpers/expected.ts` (`'1.3 A1 full'`)

- [ ] **Step 1: Lấy kiểu thật của các cột qua MCP:** `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE, IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS ORDER BY TABLE_NAME, ORDINAL_POSITION`. Ví dụ trong bài chỉ dùng kiểu có thật trong `HRM_Demo`.
- [ ] **Step 2: Viết bài.**
  - Lý thuyết cơ bản: `INT`, `DECIMAL(p,s)`, `NVARCHAR` và `VARCHAR`, `DATE`, `BIT` (nếu `HRM_Demo` không có `BIT` thì nói là kiểu hay gặp ở hệ thống khác).
  - Xem kiểu ở Object Explorer bằng `<Ssms view="explorer">`.
  - Vì sao ngày và tiền không còn lệch kiểu như Excel.
  - Chữ `N` trước chuỗi tiếng Việt.
  - Câu minh họa ngắn có kết quả thật; không có sơ đồ.
- [ ] **Step 3: Kiểm mọi câu và bảng kết quả qua MCP.**
- [ ] **Step 4: `npm test` PASS; build; `check:dist` OK.**
- [ ] **Step 5: Commit**: `git commit -m "write lesson 1.3 in full: tables, columns and data types"`

### Task 10: Viết đầy đủ bài 1.4

**Files:** `src/content/lessons/1-4-khoa-chinh-khoa-ngoai.mdx`; `tests/helpers/expected.ts` (`'1.4 A1 full'`)

- [ ] **Step 1: Lấy nguyên văn lỗi khóa ngoại.**
  - API bài tập trên máy phải đang chạy (`npm --prefix api run dev`, mã `dev`). Gửi `POST http://127.0.0.1:7071/api/run`, body `{"exercise":"3-5-1","sql":"DELETE FROM PhongBan WHERE MaPB = 'VH';"}`.
  - Kỳ vọng `error` là thông báo lỗi 547 của SQL Server, có tên ràng buộc `FK_NhanVien_PhongBan`.
  - Chạy `npm --prefix api run check:data`, kỳ vọng "Không bảng nào lệch.".
- [ ] **Step 2: Viết bài.**
  - Lý thuyết cơ bản:
    - khóa chính (`NhanVien.MaNV`; khóa hai cột `ChamCong(MaNV, Ngay)`, `BangLuong(KyLuong, MaNV)`);
    - khóa ngoại (`NhanVien.MaPB` → `PhongBan.MaPB`; `MaQuanLy` → `NhanVien`);
    - thấy PK/FK ở Object Explorer bằng `<Ssms view="explorer">`.
  - Lỗi khi xóa phòng ban còn nhân viên: câu `DELETE` chỉ đưa ra để đọc, có ghi "nếu chạy câu này, SQL Server báo", kèm `<Messages>` với nguyên văn lỗi ở Step 1.
  - Câu minh họa đếm nhân viên phòng `VH` có kết quả thật.
- [ ] **Step 3: Kiểm mọi câu `SELECT` và kết quả qua MCP.**
- [ ] **Step 4: `npm test` PASS; build; `check:dist` OK.**
- [ ] **Step 5: Commit**: `git commit -m "write lesson 1.4 in full: primary and foreign keys"`

### Task 11: Viết đầy đủ bài 1.5

**Files:** `src/content/lessons/1-5-doc-so-do-erd.mdx`; `tests/helpers/expected.ts` (`'1.5 A1 full'`)

**Interfaces:**
- Consumes: `<Erd />` (Task 4).

- [ ] **Step 1: Viết bài.**
  - Lý thuyết cơ bản:
    - ERD là gì; đường nối là một cặp khóa chính, khóa ngoại;
    - quan hệ một-nhiều;
    - `<Erd />` đặt thẳng trong bài;
    - `NhanVien` nằm giữa, `MaQuanLy` trỏ về chính nó.
  - Đọc sơ đồ để biết muốn lấy dữ liệu nào thì đi qua bảng nào. Ví dụ: lương tháng 9 kèm tên phòng ban đi qua `BangLuong` → `NhanVien` → `PhongBan`.
  - Ghi chú: SSMS có mục Database Diagrams với SQL Server cài trên máy, Azure SQL Database thì không.
  - Các con số một-nhiều (ví dụ "phòng IT có N người") lấy thật qua MCP.
- [ ] **Step 2: Kiểm các con số qua MCP.**
- [ ] **Step 3: `npm test` PASS; build; `check:dist` OK.** Trong `dist/bai/1-5-doc-so-do-erd/index.html` có đúng 7 `er-box`. Xem bài trên dev server, cả ở bề ngang hẹp.
- [ ] **Step 4: Commit**: `git commit -m "write lesson 1.5 in full: reading the HRM_Demo diagram"`

### Task 12: Viết đầy đủ bài 1.6, sơ đồ thứ tự chạy và 3 bài tập

**Files:**
- Modify: `src/content/lessons/1-6-cau-select-dau-tien.mdx`; `tests/helpers/expected.ts` (`'1.6 A2 full'`)
- Create: `src/content/exercises/1-6-cau-select-dau-tien.yaml`
- Test: `tests/exercises.test.ts`

- [ ] **Step 1: Viết test.** Trong `tests/exercises.test.ts`, test đếm bài tập thêm:
  - `expect(byLesson['1-6-cau-select-dau-tien'].map(e => [e.id, e.kind])).toEqual([['1-6-1','query'],['1-6-2','query'],['1-6-3','query']])`;
  - mỗi bài trong file đó có `ordered === false`;
  - `answer` không chứa `TOP`, `WHERE`, `ORDER BY`.
- [ ] **Step 2: Chạy, kỳ vọng FAIL (file chưa có).**
- [ ] **Step 3: Viết file bài tập.** Ba bài, mỗi bài một bảng, theo Global Constraints. Gợi ý: `PhongBan` (nhỏ), `NhanVien` (có `NULL` ở `Email`, `NgayNghiViec`, `MaQuanLy`), `HopDong` (ngày và tiền). Đề nói rõ lấy toàn bộ cột và toàn bộ dòng; `columns` liệt kê đúng các cột của bảng theo thứ tự.
- [ ] **Step 4: Viết bài.**
  - Lý thuyết cơ bản:
    - `SELECT *`, `FROM`; `TOP (n)` để xem nhanh;
    - F5, Execute; bôi đen một đoạn thì chỉ chạy đoạn đó;
    - tab Results và Messages (`<Ssms view="toolbar">`, `<Result>`, `<Messages>`).
  - `### Câu lệnh cho tình huống`: `SELECT TOP (10) * FROM NhanVien;` và kết quả thật, 10 dòng, 12 cột (có thể trích cột, ghi rõ).
  - `### SQL Server chạy câu này thế nào`:
    - `RunFlow` 3 bước: `FROM` (48 dòng), `SELECT` (`*` lấy cả 12 cột), `TOP` (10 dòng);
    - drawer của bước `TOP` nói rõ: không có `ORDER BY` thì SQL Server không hứa 10 dòng nào; bài 2.4 dạy cách chọn.
  - Bài tập: `<Exercises />`.
  - Số dòng, số cột trong `RunFlow` phải qua `checkFlow`.
- [ ] **Step 5: Kiểm.**
  - Mọi kết quả trong bài qua MCP.
  - `npm --prefix api run build` rồi `npm --prefix api run check:exercises`, kỳ vọng `1-6-1`, `1-6-2`, `1-6-3` đều có số dòng khác 0.
  - Chạy thử một câu đúng và một câu sai của 1-6-1 qua `POST /api/grade` trên máy: câu đúng ra `correct: true`, câu sai có lý do theo spec B.
- [ ] **Step 6: `npm test` PASS; build; `check:dist` OK.** `check:dist` thấy đủ 3 trang `bai/1-6-cau-select-dau-tien/bai-tap/<n>/` và link tới chúng.
- [ ] **Step 7: Commit**: `git commit -m "write lesson 1.6 in full with its run order and three exercises"`

### Task 13: Kiểm toàn bộ Level 1

- [ ] **Step 1: Chạy cả bộ kiểm.**
  - `npm test`, `npm run check`, `npm --prefix api run typecheck`, `npm run build`, `npm run check:dist`;
  - `npm --prefix api run check:exercises`;
  - `npm --prefix api run check:data`, kỳ vọng "Không bảng nào lệch.".
- [ ] **Step 2: Xem trên dev server.**
  - Bài 1.1–1.6, 3.5: mục lục bên phải không có "Bài tập" ở 1.1–1.5; sơ đồ 1.6 mở drawer được; khối SSMS và sơ đồ quan hệ đọc được ở bề ngang 375 px.
  - Trang bài tập 1-6-1: dòng trạng thái ghi `free-sql-db-8797714`.
  - Mindmap: drawer của 1.2–1.6 hiện số phút thay cho "Bản tóm tắt".
- [ ] **Step 3: Rà giọng văn.**
  - `grep` trong 6 bài các chữ "Bước 1", "nối bảng", "Phần bài tập sẽ bổ sung sau" không còn (trừ bản tóm tắt Level 2 trở đi).
  - Không bài nào bảo chạy `UPDATE`, `DELETE`, `INSERT` trong SSMS.
- [ ] **Step 4: Rà soát cuối theo executing-plans.** Gửi người làm khóa học đọc và duyệt Level 1 trước khi làm Level 2.

## Thứ tự và phụ thuộc

- Task 1, 2, 3 độc lập.
- Task 4 và 5 cần Task 3; Task 5 cần thêm Task 2.
- Task 6 cần Task 1.
- Task 7 làm sau Task 1–6, để ghi đúng tên khối.
- Task 8 cần Task 1, 2, 5.
- Task 9 và 10 cần Task 5.
- Task 11 cần Task 4.
- Task 12 cần Task 1, 2, 5.
- Task 13 làm cuối.

## Cho plan các level sau (2026-10-19)

Sau plan này, Level 1 phải sửa thêm ba vòng (spec Level 1 mục 11–13). Plan của level sau viết task cho từng bài theo khuôn dưới đây, để các bước đó nằm sẵn trong plan thay vì thành vòng sửa sau khi lên web:

- [ ] **Chạy số liệu**: mọi câu lệnh, con số và giá trị ví dụ của bài chạy bằng MCP `azure-sql` (chỉ `SELECT`) trước khi viết.
- [ ] **Test trước**: thêm test cho các ý bắt buộc của bài (cụm phải có, cụm không được có), xem fail.
- [ ] **Viết bài** theo `docs/lesson-template.md` và `docs/quy-uoc.md`, khớp `docs/ho-so-cong-ty.md`, rồi tự rà theo danh sách ở mục 4.3 của `docs/quy-uoc.md`.
- [ ] **Kiểm bằng máy**: `npm test`, `npm run check`, `npm run build`, `npm run check:dist`; bài có bài tập thì thêm `check:exercises`; xem bản build trên máy.
- [ ] **Review độc lập**: giao một agent mới; Claude dùng Sonnet, effort high; Codex giữ model đang dùng của phiên và để reviewer kế thừa, không đổi model. Lời dặn theo mục 4.5 của `docs/quy-uoc.md`; kết quả ở `temp/review/<ngày>-doc-lap/review-bai-<slug>.md`.
- [ ] **Xử lý review**: kiểm từng mục, sửa mục đúng có test, ghi "Đã sửa / Không làm theo" vào spec của level; chạy lại bước kiểm bằng máy.
- [ ] **Commit**; push chỉ khi người làm khóa học đồng ý.

Review độc lập theo từng bài không thay cho lượt rà soát cuối cả nhánh của executing-plans; cả hai đều làm.

## Thử khung kể liền ở bài 1.1 (2026-10-20)

Theo kế hoạch thử nghiệm đã được người làm khóa học duyệt; chi tiết và giới hạn kiểm chứng ở spec Level 1 mục 16.

- [x] Gộp Excel và database theo ba nhịp, giữ hình minh họa cạnh giải thích và khép tình huống trong phần chính.
- [x] Bỏ bảng so sánh dài, mục trả lời riêng và preview SQL; rút chi tiết sâu, đặt thời lượng 12 phút.
- [x] Giữ các phần cuối và bốn câu tự kiểm tra; in đậm từ trọng tâm theo phản hồi của người làm khóa học.
- [x] Sửa câu dẫn ở Results bài 1.6; cập nhật kiểm cấu trúc chỉ riêng bài 1.1, giữ chuẩn cho bài khác.
- [x] Chạy test, check, build và check:dist; kiểm trình duyệt 1280/1440px, mục lục, Excel, bàn phím, đối chiếu bài 1.2. Ghi riêng test độ dài và audit toàn dự án còn lỗi có sẵn, không sửa lan phạm vi.
- [x] Review bằng agent Codex độc lập kế thừa model của phiên; xử lý các mục đúng. Đây là đúng quy ước của Codex, không yêu cầu Sonnet.
- [x] Sửa mục Ứng dụng theo phản hồi: tập trung vào ứng dụng database, gồm nguồn thống nhất, giảm sai lệch, tra cứu/báo cáo và lịch sử có điều kiện; giữ nhãn in đậm.
- [x] Đánh dấu dẫn chứng dữ liệu, tên bảng/cột và địa chỉ ô trong lời giải thích bằng kiểu code có nền; giữ dữ liệu trong các khối minh họa.
- [x] Người làm khóa học duyệt bài 1.1 và yêu cầu cập nhật quy ước/template chung.

## Đưa khung đã duyệt thành chuẩn (2026-10-20)

- [x] Cập nhật quy ước, checklist và lời dặn review: mạch kể, độ sâu, Ứng dụng, chữ đậm, dẫn chứng code và tự kiểm tra.
- [x] Viết lại template theo mẫu 1.1, có hướng dẫn bài khái niệm/truy vấn và cách điền các khối theo dữ liệu đã kiểm.
- [x] Đồng bộ AGENTS, README, CLAUDE, DESIGN và đánh dấu các chỉ dẫn bố cục cũ trong spec/plan là lịch sử.
- [x] Mở kiểm cấu trúc cho khung mới ở mọi bài đầy đủ, giữ danh sách đóng cho các bài cũ và chuẩn bản tóm tắt; không thêm trường frontmatter.
- [x] Chạy kiểm tra và rà độc lập tính nhất quán của tài liệu, template và test; ghi đúng lỗi độ dài có sẵn ngoài phạm vi, xem spec mục 17.
- [x] Làm rõ model review theo công cụ: Claude dùng Sonnet/effort high; Codex giữ model hiện tại, không truyền model override cho reviewer.

## Chuyển bài 1.2 và 1.3 theo khung đã duyệt (2026-10-20)

Kế hoạch được người làm khóa học duyệt trong chat; chỉ sửa hai bài, test liên quan và ghi nhận ở spec/plan. Các thay đổi quy ước cùng bài 1.1/1.6 từ lượt trước được giữ nguyên. Làm trên checkout hiện có, nhánh `codex/lessons-1-2-1-3`.

- [x] 1.2: gộp giải thích Excel/database; giữ đường máy chủ → database → bảng, kết nối SSMS, Object Explorer, câu `SELECT * FROM PhongBan;` và kết quả giải tình huống. Giữ phần máy riêng tùy chọn, rút thành bốn bước. Thời lượng 20 phút không tính cài đặt.
- [x] 1.3: giữ file ngày/lương và giả định nhập dạng chữ, hình SSMS, bảng kiểu và bảng kết quả từng ô; bỏ CREATE TABLE, TOP 5, CAST gây lỗi và LineMap lặp. Thời lượng 15 phút.
- [x] Hai bài giữ năm mục cấp 2, giá trị code có nền, khái niệm đậm, ứng dụng đúng chủ đề và năm câu tự kiểm tra. Không đổi component/API/frontmatter schema.
- [x] Bỏ hai slug khỏi legacy allowlist và điều chỉnh assertion về kiến thức còn cần bảo vệ; chạy RED trước sửa nội dung.
- [x] Đối chiếu script, Microsoft Learn và SELECT trên database thật: danh mục phòng ban, kiểu/NULL, ngày mơ hồ, chuỗi tiền, làm tròn, tràn số và ngày từ chuỗi rỗng. Không ghi dữ liệu.
- [x] Xem bản build ở 1280/1440px; mục lục, hình Excel/SSMS, bảng và Enter/Tab/Space ở tự kiểm tra. Không tràn ngang.
- [x] Review độc lập mỗi bài bằng agent mới kế thừa model của phiên, xử lý từng mục sau xác minh; ghi Đã sửa/Không làm theo ở spec mục 18.
- [x] Chạy đủ bốn lệnh kiểm tra sau chỉnh cuối; ghi lỗi nền ngoài phạm vi và bàn giao local cùng hai bản review. Không push/deploy. Hoàn tất ngày 21/10/2026: 238/239 test đạt, còn lỗi nền 13 đoạn ngoài hai bài; check/build/check:dist đạt.

## Tiếp tục bài 1.4, 1.5, 1.6 (21/10/2026)

Người làm khóa học yêu cầu tiếp tục cùng khung đã duyệt và dùng Superpowers. Không mở lại quyết định bố cục chung; dùng checkout/nhánh hiện có, giữ các sửa trước. Chi tiết nhận xét và bằng chứng ở spec mục 19.

- [x] 1.4: gộp khóa chính/ngoại với Excel và hình SSMS; giữ lỗi DELETE cùng 10 hồ sơ tham chiếu, lời giải nghiệp vụ và năm câu tự kiểm tra; bỏ INSERT/DDL/LineMap và giảng lỗi sâu. 15 phút.
- [x] 1.5: gộp hai lần dò Excel, đọc ERD/một-nhiều và đường BangLuong → NhanVien → PhongBan; bỏ JOIN/Result xem trước, thống kê dài và LineMap; giữ phòng hiện tại khác lịch sử, năm câu tự kiểm tra. 15 phút.
- [x] 1.6: gộp mở sheet với SELECT, cách chạy/đọc kết quả; giữ query/Result/Messages/RunFlow và ba bài tập, rút các lời giảng lặp. 20 phút.
- [x] Bỏ ba slug khỏi legacy allowlist; cập nhật assertion bố cục và chi tiết sâu đã rút, giữ bảo vệ tính đúng và giới hạn dữ liệu. Không đổi component/API/frontmatter schema hoặc YAML bài tập.
- [x] Đối chiếu database và Microsoft: dữ liệu bảng/Excel/ba bước RunFlow khớp SELECT; DELETE và lỗi thiếu FROM qua handleRun của API, được guard và luôn rollback. Check:data sau kiểm báo không bảng nào lệch; check:exercises đạt cả 14 bài hiện có.
- [x] Ba agent review mới, mỗi agent một bài, kế thừa model của phiên không override. Đã đọc các report và xử lý hết mục đúng; không yêu cầu khôi phục chi tiết sâu đã chủ động rút.
- [x] Bốn lệnh kiểm tra: 238/239 test đạt, còn đúng sáu đoạn quá 120 chữ ở2.1/2.2 ngoài phạm vi; check0lỗi/0warning/3hint cũ; build68trang, check:dist1341link đạt.
- [x] Hoàn tất kiểm bản cuối 1280/1440px, bàn phím/tự kiểm tra/RunFlow và bàn giao local cùng ba report; khôi phục viewport, không push/deploy.
