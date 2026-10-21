# Sơ đồ thứ tự chạy và chạy thử bài tập trên web: Implementation Plan

## Bổ sung bài 2.5 theo khung đã duyệt (21/10/2026)

Nhánh local `codex/lesson-2-5-full`, snapshot bài 2.4 làm gốc; spec đợt 2 mục 16 ghi nội dung và giới hạn xác minh.

- [x] Đọc quy ước/template/hồ sơ và các bài liên quan; duyệt phạm vi hồ sơ Email NULL, nhãn chỉ ở kết quả.
- [x] Baseline và RED; giữ bản 2.4, thêm kiểm dữ liệu gốc/nhãn của RunFlow, không khóa câu văn.
- [x] Viết bài 25 phút, ba đề chấm thứ tự; cập nhật hồ sơ/README/catalog, giữ component/API và seed.
- [x] Test/check/build/check:dist và API build/typecheck đạt; ghi rõ lỗi shortTitle đã sửa và kiểm fixture không thay SQL Server.
- [x] Đọc hết review độc lập 40 mục, đối chiếu và xử lý đủ 10 nhận xét sửa/làm rõ/cắt/biên tập; ghi Đã sửa/Không làm theo.
- [ ] Kiểm bản cuối và bàn giao local cùng báo cáo; không push/deploy.
- [ ] Chạy SELECT/đáp án live và check:data: thiếu cấu hình kết nối.
- [ ] Kiểm trực quan/bàn phím: chưa có browser hoạt động; không lấy HTML làm bằng chứng thay thế.


## Bổ sung bài 2.4 theo khung đã duyệt (21/10/2026)

Nhánh local `codex/lesson-2-4-full` nối từ bài 2.3; spec đợt 2 mục 15 ghi nội dung, xử lý review và giới hạn xác minh.

- [x] Đọc quy ước/template/hồ sơ và các bài liên quan; duyệt phạm vi năm hồ sơ đang làm mới nhất, ngày DESC/mã ASC.
- [x] Baseline và RED trước viết; thêm kiểm kết quả/RunFlow theo seed và chấm thứ tự của ba bài tập.
- [x] Viết bài 20 phút, ba đề `ordered: true`; cập nhật hồ sơ/README và catalog kỳ vọng full, không đổi component/API.
- [x] Test, web check/build/check:dist, API build/typecheck và kiểm fixture đạt; ghi rõ fixture không thay chạy SQL Server.
- [x] Review độc lập 10 mục, đọc hết rồi sửa bốn nhận xét câu chữ; không đổi SQL/dữ liệu.
- [ ] Chạy ví dụ/đáp án live và check:data: hiện thiếu cấu hình kết nối.
- [ ] Kiểm trực quan/bàn phím: browser timeout, chưa thể xác minh; không lấy kiểm HTML làm bằng chứng thay thế.
- [x] Kiểm bản cuối và bàn giao local, ghi các bước còn thiếu; không push/deploy.


## Bổ sung bài 2.3 theo thiết kế đã duyệt (21/10/2026)

Thay đổi có phạm vi trong luồng bài học hiện có, đã duyệt khung ngắn trong chat. Ghi nhận tại spec đợt 2 mục 14; không mở lại phần thiết kế lịch sử bên dưới.

- [x] Đọc quy ước/template/hồ sơ và bài 1.1–2.2; chốt KD hoặc IT trong sáu tháng đầu năm 2023.
- [x] Baseline và RED trước viết; thêm kiểm kết quả/RunFlow theo seed và bốn bài tập, chuyển catalog kỳ vọng thành full.
- [x] Viết bài 25 phút, bốn bài tập, cập nhật hồ sơ/README; giữ sáu mục, khung gộp và câu trả lời cạnh kết quả.
- [x] Đối chiếu toàn bộ ô hình/kết quả/sơ đồ với script mẫu và đối chiếu kiến thức Microsoft; ghi rõ fixture không thay live SQL.
- [x] 242/242 test, check/build/check:dist web, API build/typecheck đạt; HTML có đủ link/trang/panel/ô đánh dấu.
- [ ] Chạy mọi ví dụ và check:exercises/check:data trên SQL Server thật: hiện thiếu cấu hình kết nối, chưa thể xác minh live.
- [ ] Kiểm trực quan và bàn phím trên browser: hiện không có browser hoạt động; kiểm HTML không thay bước này.
- [x] Đọc hết review độc lập, làm rõ %, đổi cách nói chuỗi ký tự và cắt lặp; giữ SQL/YAML. Cập nhật spec/plan, kiểm bản cuối và bàn giao local; hai mục live SQL/browser phía trên vẫn chưa xác minh.


## Tiếp tục bài 2.1 và 2.2 theo khung gộp (21/10/2026)

Phạm vi do người làm khóa học yêu cầu sau lượt 1.4–1.6; thực hiện theo quy ước hiện hành và spec `2026-10-18-step-flow-exercises-full-lessons-design.md`, mục 13. Giữ nguyên giao diện, component/API, frontmatter schema và bài tập. Dùng checkout đang có; không commit, push hay deploy trong lượt này.

Pre-flight: MDX giữ cùng thuộc tính component và cấu trúc truy vấn/RunFlow; test cấu trúc nhận tiêu đề phần chính tùy bài, chỉ bỏ hai slug khỏi danh sách cho phép khung cũ. Không có thay đổi giao diện giữa các thành phần.

- [x] Đọc quy ước, template, hồ sơ công ty, bài đã duyệt và quyết định cũ; chốt mạch 2.1 chọn cột/alias, 2.2 lọc một điều kiện.
- [x] RED: bỏ hai slug khung cũ, chạy test và xác nhận lỗi cấu trúc cùng sáu đoạn nền quá dài trước khi viết.
- [x] Chạy SELECT trên database khóa học để kiểm dẫn chứng; viết lại hai bài, giữ lời giải/kết quả/RunFlow/bài tập, cập nhật assertion nội dung theo phạm vi mới.
- [x] Bản đầu: 239/239 test; check/build/check:dist đạt; API build và 14/14 bài tập đạt; check:data không lệch bảng.
- [x] Kiểm bản build 1280px/1440px: mục lục, hình, bảng, highlight và bàn phím RunFlow; evidence trong thư mục verification của lượt.
- [x] Đọc đủ hai report độc lập (52 mục/bài), xác minh/sửa mục phù hợp, ghi Đã sửa/Không làm theo vào spec mục 13.
- [x] Kiểm bản cuối sau sửa: 239/239 test, check 0 lỗi/0 warning/3 hint cũ, build 68 trang, check:dist 1.339 link. Đọc lại các câu vừa sửa trên browser, lưu ảnh cuối, phục hồi viewport và bàn giao link local cùng đường dẫn review.

> Cập nhật 20/10/2026: khung bài và cách trình bày hiện hành theo [quy ước](../../quy-uoc.md) và [lesson-template](../../lesson-template.md), lấy bài 1.1 đã duyệt làm mẫu. Các chỉ dẫn tách "Với Excel" / "Làm bằng SQL", ép đủ khối hoặc trả lời tình huống riêng trong phần lịch sử bên dưới đã được thay thế. Các quyết định khác áp dụng khi không mâu thuẫn với quy ước hiện hành và các quyết định được duyệt sau đó.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Trạng thái (2026-10-18):** đã làm xong; sơ đồ đã lên web ở bài 3.5. Bản chạy thử nằm ở nhánh `spike/exercise-runner` (giữ lại, không merge); kết quả ở [file kết quả chạy thử](../specs/2026-10-18-exercise-runner-spike-results.md).

**Goal:** Thêm sơ đồ thứ tự chạy câu lệnh (phần A) vào trang bài, làm mẫu ở bài 3.5, và chạy thử cách chạy bài tập có `ROLLBACK` trên `sql-lession` (bản chạy thử của phần B).

**Architecture:** Sơ đồ là một thành phần Astro `RunFlow` render tĩnh (thẻ, bảng xem trước, drawer ẩn cho từng bước) cộng một `<script>` nhỏ để mở drawer, giống cách `Sql.astro` làm nút "Sao chép". Logic thuần (thứ tự mệnh đề, kiểm dữ liệu, xếp hình chữ chi, bảng xem trước) nằm ở `src/lib/run-flow.ts`. Dữ liệu sơ đồ sai thì build dừng. Bản chạy thử là script Node.js trên một nhánh riêng không bao giờ merge; chỉ file kết quả về `main`.

**Tech Stack:** Astro 5, MDX, TypeScript, Vitest 3 (Astro Container API cho component); bản chạy thử: Node.js 22, `mssql`, `dotenv`.

**Spec:** [docs/superpowers/specs/2026-10-18-step-flow-exercises-full-lessons-design.md](../specs/2026-10-18-step-flow-exercises-full-lessons-design.md) (mục 4 và 5.6), cùng [spec đợt 1](../specs/2026-10-17-sql-server-course-site-design.md).

## Global Constraints

- Mọi link và tài nguyên đi qua base `/microsoft-sql-lession/` (`withBase`, `lessonUrl`).
- Giao diện tiếng Việt; từ khóa SQL giữ tiếng Anh; JOIN gọi là "kết bảng", không dùng "nối bảng".
- Bài đầy đủ giữ đúng 7 tiêu đề cấp 2: Tình huống, Với Excel, Làm bằng SQL, Hay nhầm ở đâu, Ứng dụng, Ghi nhớ, Bài tập. Sơ đồ nằm dưới tiêu đề cấp 3.
- Kết quả trong bài chép từ lần chạy thật. MCP `azure-sql` chỉ được dùng cho câu `SELECT`/`WITH`, dù `.env` đang bật chế độ ghi.
- SQL trong template literal của MDX không có dòng bắt đầu bằng khoảng trắng (MDX cắt mất); chuỗi tiếng Việt có tiền tố `N`.
- Màu và chữ theo `src/styles/tokens.css`; dành cho màn hình từ 1280px; tôn trọng `prefers-reduced-motion` (đã có trong `base.css`).
- Bản chạy thử: mọi câu sửa dữ liệu chạy trong transaction và luôn `ROLLBACK`; không `COMMIT` bất cứ gì; không commit `.env` hay mật khẩu; code chạy thử không merge vào `main`.

## Review Focus

1. Bước không còn dòng nào (ví dụ `WHERE` lọc hết): thẻ ghi "còn 0 dòng" và "Không còn dòng nào" thay cho bảng rỗng (Task 3).
2. Bước có nhiều cột (bước `FROM NhanVien` có 12 cột): bảng xem trước chỉ 3 cột kèm "+9 cột"; bảng trong drawer cuộn ngang (Task 2, Task 3).
3. Ô `NULL` trong bảng xem trước hiện giống bảng Results (`res-null`), không thành ô trống (Task 3).
4. Hai sơ đồ trên cùng một trang: mỗi sơ đồ có drawer riêng, mở cái này thì cái kia đóng (Task 3, Task 4).
5. Dùng bàn phím: Tab tới thẻ, Enter mở drawer, mũi tên chuyển bước, Esc đóng và trả focus về thẻ (Task 4).

---

### Task 1: Mockup sơ đồ bài 3.5 và chờ duyệt

**Files:**
- Create: `docs/superpowers/specs/2026-10-18-mockups/run-flow.html`

**Interfaces:**
- Produces: mockup đã duyệt; Task 3 theo đúng bố cục và màu trong mockup.

- [ ] **Step 1: Lấy kết quả thật cho 5 bước của câu lệnh cuối bài 3.5 qua MCP (chỉ `SELECT`)**

| Bước | Mệnh đề | Câu lệnh trung gian | Số dòng đã kiểm |
|---|---|---|---|
| 01 | `FROM` | `SELECT * FROM NhanVien AS nv;` | 48 (12 cột) |
| 02 | `LEFT JOIN` | `SELECT nv.MaNV, nv.HoTen, hd.MaHD FROM NhanVien AS nv LEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV;` | 57 |
| 03 | `WHERE` | câu 02 thêm `WHERE hd.MaHD IS NULL` | 2 |
| 04 | `SELECT` | `SELECT nv.MaNV, nv.HoTen, nv.MaPB, nv.NgayVaoLam` … `WHERE hd.MaHD IS NULL;` | 2 |
| 05 | `ORDER BY` | câu 04 thêm `ORDER BY nv.MaNV` | 2 |

Lấy 10 dòng đầu của mỗi bước (có `ORDER BY nv.MaNV` cho bước 01–04 để trích ổn định). Lưu tạm vào scratchpad để Task 5 dùng lại.

- [ ] **Step 2: Viết mockup HTML độc lập**

Một trang giả lập cột bài rộng 720px: tiêu đề cấp 3 "SQL Server chạy câu này thế nào", dòng nhắc "Bạn viết SELECT trước, nhưng SQL Server làm FROM trước.", 5 thẻ xếp hình chữ chi (hàng 1: 01 → 02 → 03, mũi tên xuống, hàng 2: 05 ← 04), mỗi thẻ có số bước, mệnh đề tô màu SSMS, câu ngắn, "còn N dòng", bảng xem trước 3×3 kèm "+N dòng"/"+N cột". Bên phải là drawer đang mở ở bước 02 (bảng Results trích 10/57 dòng, khối SQL có "Sao chép", "Bước trước"/"Bước sau"). Copy các biến màu từ `tokens.css`; font qua Google Fonts. Thẻ đang mở có viền đậm màu chữ chính như node đang chọn trên mindmap.

- [ ] **Step 3: Gửi mockup cho người làm khóa học (SendUserFile, display `render`) và dừng lại chờ duyệt**

Chỉ sang Task 2 khi đã được duyệt. Sửa mockup theo góp ý nếu có.

- [ ] **Step 4: Commit mockup**

```bash
git add docs/superpowers/specs/2026-10-18-mockups/run-flow.html
git commit -m "add the run-order diagram mockup"
```

### Task 2: Logic sơ đồ (`src/lib/run-flow.ts`)

**Files:**
- Create: `src/lib/run-flow.ts`, `tests/helpers/flows.ts`, `tests/run-flow.test.ts`

**Interfaces:**
- Produces:
  - `type FlowCell = string | number | null`
  - `interface FlowStep { clause: string; title: string; focus: string; meaning: string; detail: string; sql: string; columns: string[]; rows: FlowCell[][]; total?: number; excel?: string }` — `focus`: đoạn của câu lệnh đầy đủ mà bước này chạy; `meaning`: từ khóa làm gì (nghĩa chung); `detail`: chuyện xảy ra ở bước này với dữ liệu thật; trong `meaning` và `detail`, chữ đặt giữa hai dấu `` ` `` là code.
  - `clauseRank(clause: string): number | null` — `FROM` 1; mệnh đề có chữ `JOIN` 2; `WHERE` 3; `GROUP BY` 4; `HAVING` 5; `SELECT`, `SET`, `DELETE` 6; `DISTINCT` 7; `ORDER BY` 8; `TOP`, `OFFSET` 9; `Messages` 10; còn lại `null`.
  - `rowCount(step: FlowStep): number` — `total ?? rows.length`.
  - `checkFlow(steps: FlowStep[], query: string): string[]` — mỗi lỗi một câu tiếng Việt, mở đầu bằng `bước N:` (N đếm từ 1), trừ lỗi "cần ít nhất 2 bước".
  - `splitFocus(query: string, focus: string): { before: string; focus: string; after: string } | null` — tìm lần xuất hiện đầu tiên của `focus` trong `query`, mở rộng ra trọn các dòng chứa nó; không thấy thì `null`.
  - `inlineCode(text: string): { code: boolean; text: string }[]` — tách theo dấu `` ` ``, bỏ đoạn rỗng; số dấu lẻ thì trả cả câu là một đoạn chữ thường.
  - `interface SnakeCell { row: number; col: number; arrow: 'right' | 'left' | 'down' | null }`; `snakeLayout(count: number, perRow = 3): SnakeCell[]` — hàng chẵn đi trái sang phải, hàng lẻ đi phải sang trái; thẻ cuối hàng (trừ thẻ cuối cùng) có mũi tên `down`; thẻ cuối cùng `null`.
  - `interface Preview { columns: string[]; rows: FlowCell[][]; moreRows: number; moreCols: number }`; `previewOf(step: FlowStep, maxRows = 3, maxCols = 3): Preview`.
  - `tests/helpers/flows.ts`: `sampleQuery(): string` — câu lệnh cuối bài 3.5 (có dòng `WHERE hd.MaHD IS NULL   -- dò không ra hợp đồng nào`); `sampleFlow(): FlowStep[]` — 5 bước như bảng ở Task 1, `focus` là đúng dòng tương ứng trong `sampleQuery()`, bước 02 có `meaning` chứa `` `LEFT JOIN` `` và `` `ON` ``, `detail` chứa `` `NhanVien` ``; dữ liệu giả: bước 01 có 12 cột, 10 dòng, `total: 48`; bước 02 có 10 dòng, `total: 57`, ô `MaHD` của dòng đầu là `null` (để bảng xem trước có ô `NULL`); bước 03–05 có 2 dòng.

- [ ] **Step 1: Viết test hỏng trong `tests/run-flow.test.ts`**

```ts
it('ranks clauses in SQL Server run order', () => {
  expect(['FROM', 'LEFT JOIN', 'INNER JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'SET', 'DELETE', 'DISTINCT', 'ORDER BY', 'TOP', 'OFFSET', 'Messages', 'FOO'].map(clauseRank))
    .toEqual([1, 2, 2, 3, 4, 5, 6, 6, 6, 7, 8, 9, 9, 10, null]);
});
it('accepts the sample flow', () => expect(checkFlow(sampleFlow(), sampleQuery())).toEqual([]));
it('reports every broken rule with its step number', () => {
  const f = sampleFlow(); const q = sampleQuery();
  expect(checkFlow(f.slice(0, 1), q)).toEqual(['sơ đồ cần ít nhất 2 bước']);
  expect(checkFlow([f[0], { ...f[1], clause: 'FOO' }], q)[0]).toMatch(/^bước 2: .*FOO/);
  expect(checkFlow([f[0], f[2], f[1]], q)[0]).toMatch(/^bước 3: .*LEFT JOIN.*WHERE/);
  expect(checkFlow([f[0], { ...f[1], rows: [['NV001']] }], q)[0]).toMatch(/^bước 2: dòng 1/);
  expect(checkFlow([f[0], { ...f[1], total: 3 }], q)[0]).toMatch(/^bước 2: .*total/);
  expect(checkFlow([f[0], { ...f[1], rows: Array(11).fill(f[1].rows[0]), total: 57 }], q)[0]).toMatch(/^bước 2: .*10 dòng/);
  expect(checkFlow([f[0], { ...f[1], detail: '' }], q)[0]).toMatch(/^bước 2: thiếu detail/);
  expect(checkFlow([f[0], { ...f[1], meaning: '' }], q)[0]).toMatch(/^bước 2: thiếu meaning/);
  expect(checkFlow([f[0], { ...f[1], focus: 'GROUP BY nv.MaPB' }], q)[0]).toMatch(/^bước 2: không tìm thấy/);
});
it('lays cards out in a snake, three per row', () => {
  expect(snakeLayout(5)).toEqual([
    { row: 0, col: 0, arrow: 'right' }, { row: 0, col: 1, arrow: 'right' }, { row: 0, col: 2, arrow: 'down' },
    { row: 1, col: 2, arrow: 'left' }, { row: 1, col: 1, arrow: null },
  ]);
  expect(snakeLayout(7).slice(5)).toEqual([{ row: 1, col: 0, arrow: 'down' }, { row: 2, col: 0, arrow: null }]);
});
it('previews at most 3 rows and 3 columns and counts the rest', () => {
  const p = previewOf(sampleFlow()[0]);
  expect([p.columns.length, p.rows.length, p.moreRows, p.moreCols]).toEqual([3, 3, 45, 9]);
  expect(previewOf({ ...sampleFlow()[2], rows: [], total: 0 })).toMatchObject({ rows: [], moreRows: 0 });
});
it('widens the highlighted part of the query to whole lines', () => {
  const q = 'SELECT a\nFROM T\nWHERE x IS NULL   -- note\nORDER BY a;';
  expect(splitFocus(q, 'WHERE x IS NULL')).toEqual({ before: 'SELECT a\nFROM T\n', focus: 'WHERE x IS NULL   -- note', after: '\nORDER BY a;' });
  expect(splitFocus(q, 'GROUP BY a')).toBeNull();
});
it('splits backtick code out of the explanation text', () => {
  expect(inlineCode('`LEFT JOIN` giữ dòng, để `NULL`.')).toEqual([
    { code: true, text: 'LEFT JOIN' }, { code: false, text: ' giữ dòng, để ' }, { code: true, text: 'NULL' }, { code: false, text: '.' },
  ]);
  expect(inlineCode('lẻ ` một dấu')).toEqual([{ code: false, text: 'lẻ ` một dấu' }]);
});
```

- [ ] **Step 2: Chạy `npx vitest run tests/run-flow.test.ts`, kỳ vọng FAIL vì chưa có `src/lib/run-flow.ts`**

- [ ] **Step 3: Viết `src/lib/run-flow.ts` theo khối Interfaces**

`checkFlow` kiểm theo thứ tự: số bước ≥ 2; từng bước: `title`, `focus`, `meaning`, `detail`, `sql` không rỗng ("thiếu title|focus|meaning|detail|sql"); `splitFocus(query, focus)` khác `null` ("không tìm thấy … trong câu lệnh"); `clauseRank` không `null`; hạng không nhỏ hơn bước trước (cho phép bằng, ví dụ hai `JOIN`), câu lỗi nêu cả hai mệnh đề; mỗi dòng đủ số ô bằng số cột ("dòng M có K ô, cần C"); `total` không nhỏ hơn số dòng đã ghi; ghi tối đa 10 dòng (phần còn lại dùng `total`).

- [ ] **Step 4: Chạy lại test, kỳ vọng PASS; chạy `npm test`, kỳ vọng tất cả PASS**

- [ ] **Step 5: Commit**

```bash
git add src/lib/run-flow.ts tests/run-flow.test.ts tests/helpers/flows.ts
git commit -m "add run-order rules, layout, previews and focus lines for the flow diagram"
```

### Task 3: Thành phần `RunFlow` (render tĩnh)

**Files:**
- Create: `src/components/lesson/RunFlow.astro`
- Modify: `src/components/lesson/index.ts` (thêm `RunFlow` vào `lessonComponents`), `src/styles/lesson.css` (các lớp `.rf*`)
- Test: `tests/components.test.ts`

**Interfaces:**
- Consumes: `FlowStep`, `checkFlow`, `snakeLayout`, `previewOf`, `rowCount`, `splitFocus`, `inlineCode` (Task 2); `Result.astro`, `Sql.astro`; `highlightTsql` (`src/lib/tsql-highlight.ts`).
- Produces (Task 4 dựa vào đúng các lớp và thuộc tính này):
  - Props: `{ query: string; steps: FlowStep[]; note?: string }`; `note` mặc định `Bạn viết SELECT trước, nhưng SQL Server làm FROM trước.`
  - `checkFlow(steps, query)` có lỗi thì `throw new Error('Sơ đồ thứ tự chạy có lỗi:\n' + problems.join('\n'))`.
  - Gốc `<figure class="rf">`; `<p class="rf-note">`; `<ol class="rf-grid">`, mỗi bước một `<li class="rf-cell" data-arrow="right|left|down">` đặt bằng `grid-row`/`grid-column` theo `snakeLayout`.
  - Thẻ: `<button type="button" class="rf-card" data-step="{i}" aria-expanded="false" aria-controls="{drawerId}">` gồm `.rf-num` ("01"), `.rf-clause` (mệnh đề tô màu), `.rf-title`, `.rf-count` ("còn N dòng"), bảng `.rf-mini` (ô `null` có lớp `res-null`, chữ `NULL`), `.rf-more` ("+N dòng", "+N cột"); bước 0 dòng thì `<p class="rf-empty">Không còn dòng nào</p>`.
  - Drawer: `<aside class="rf-drawer" id="{drawerId}" hidden tabindex="-1" aria-label="Chi tiết bước">` có nút `.rf-close` (`aria-label="Đóng"`), mỗi bước một `<section class="rf-panel" data-panel="{i}" hidden>` gồm `Bước 0N` và mệnh đề; `.rf-d-title` (là `title`); `<pre class="rf-q">` chứa câu lệnh đầy đủ: `before` và `after` của `splitFocus` trong `<span class="rf-q-dim">`, `focus` trong `<mark class="rf-q-on">`, cả ba tô màu bằng `highlightTsql`, không có xuống dòng thừa giữa các khối; `<p class="rf-d-sub">` "`{clause}` làm gì" rồi `<p class="rf-d-text">` từ `meaning`; `<p class="rf-d-sub">Ở bước này</p>` rồi `<p class="rf-d-text">` từ `detail`; đoạn code trong hai đoạn này (theo `inlineCode`) thành `<code class="rf-kw">` (tô màu bằng `highlightTsql`) nếu có từ khóa, chữ xám hoặc hàm, còn lại thành `<code class="rf-id">` không tô; tiếp theo là `<Result columns rows total={rowCount(step)}>`, `<Sql code={step.sql} title="Câu lệnh của bước này">`, dòng "Liên hệ Excel: …" khi có `excel`; cuối drawer là `.rf-prev` ("Bước trước") và `.rf-next` ("Bước sau").
  - `drawerId` là `rf-{n}`, `n` tăng dần theo mỗi lần render trong module.

- [ ] **Step 1: Viết test hỏng trong `tests/components.test.ts`** (dùng `sampleFlow()`)

```ts
it('RunFlow numbers the steps, counts rows and previews 3 rows by 3 columns', async () => {
  const html = await c.renderToString(RunFlow, { props: { query: sampleQuery(), steps: sampleFlow() } });
  expect(html).toMatch(/class="rf-num"[^>]*>01</);
  expect(html).toMatch(/class="rf-num"[^>]*>05</);
  for (const s of ['còn 48 dòng', 'còn 57 dòng', '+45 dòng', '+9 cột', 'Bạn viết SELECT trước, nhưng SQL Server làm FROM trước.']) expect(html).toContain(s);
  expect(html).toMatch(/<table class="rf-mini"[^>]*>(?:(?!<\/table>)[\s\S])*res-null/);
  expect((html.match(/class="rf-panel"/g) ?? []).length).toBe(5);
  for (const s of ['Bước trước', 'Bước sau', 'Trích 10 dòng (kết quả có 57 dòng)', 'Câu lệnh của bước này', 'Sao chép', 'Ở bước này']) expect(html).toContain(s);
});
it("RunFlow highlights the step's lines in the full query and boxes SQL words in the explanation", async () => {
  const html = await c.renderToString(RunFlow, { props: { query: sampleQuery(), steps: sampleFlow() } });
  expect(html).toMatch(/<mark class="rf-q-on">(?:(?!<\/mark>)[\s\S])*LEFT(?:(?!<\/mark>)[\s\S])*HopDong/);
  expect(html).toMatch(/<mark class="rf-q-on">(?:(?!<\/mark>)[\s\S])*dò không ra hợp đồng nào/);
  expect(html).toMatch(/<code class="rf-kw">(?:(?!<\/code>)[\s\S])*ON(?:(?!<\/code>)[\s\S])*<\/code>/);
  expect(html).toContain('<code class="rf-id">NhanVien</code>');
});
it('RunFlow shows an empty step as "Không còn dòng nào"', async () => {
  const f = sampleFlow(); f[2] = { ...f[2], rows: [], total: 0 };
  expect(await c.renderToString(RunFlow, { props: { query: sampleQuery(), steps: f } })).toContain('Không còn dòng nào');
});
it('RunFlow stops the build when the flow breaks a rule', async () => {
  await expect(c.renderToString(RunFlow, { props: { query: sampleQuery(), steps: sampleFlow().slice(0, 1) } })).rejects.toThrow('Sơ đồ thứ tự chạy có lỗi');
});
it('two RunFlows on one page get their own drawers', async () => {
  const id = (h: string) => h.match(/class="rf-drawer" id="([^"]+)"/)![1];
  const [a, b] = [await c.renderToString(RunFlow, { props: { query: sampleQuery(), steps: sampleFlow() } }), await c.renderToString(RunFlow, { props: { query: sampleQuery(), steps: sampleFlow() } })];
  expect(id(a)).not.toBe(id(b));
});
```

- [ ] **Step 2: Chạy `npx vitest run tests/components.test.ts`, kỳ vọng FAIL vì chưa có `RunFlow.astro`**

- [ ] **Step 3: Viết `RunFlow.astro` theo khối Interfaces, đăng ký trong `lessonComponents`, thêm CSS theo mockup đã duyệt**

Drawer: `position: fixed`, `top: var(--topbar)`, `right: 0`, `bottom: 0`, rộng khoảng 440px, nằm đè cột phải, `z-index` 40 (dưới popup lộ trình 50 và hộp tìm kiếm 60); bảng trong drawer cuộn ngang. Thẻ đang mở (`aria-expanded="true"`) có viền đậm màu `--ink`.

- [ ] **Step 4: Chạy `npm test`, kỳ vọng tất cả PASS**

- [ ] **Step 5: Commit**

```bash
git add src/components/lesson/RunFlow.astro src/components/lesson/index.ts src/styles/lesson.css tests/components.test.ts
git commit -m "add the RunFlow lesson component"
```

### Task 4: Mở drawer, chuyển bước, đóng

**Files:**
- Modify: `src/components/lesson/RunFlow.astro` (thêm `<script>`)

**Interfaces:**
- Consumes: các lớp và thuộc tính trong khối Produces của Task 3.

- [ ] **Step 1: Viết `<script>` trong `RunFlow.astro`**

Một trình nghe `click` và `keydown` trên `document` (như `Sql.astro`), mọi thao tác giới hạn trong `.rf` chứa phần tử được bấm:
- Bấm `.rf-card` bước i: đóng drawer của sơ đồ khác nếu đang mở; hiện drawer, chỉ hiện `.rf-panel[data-panel=i]`; thẻ i có `aria-expanded="true"`, thẻ khác `false`; focus drawer (`preventScroll`).
- `.rf-prev` / `.rf-next` và phím ←/→ khi drawer đang mở: chuyển bước; nút bị `disabled` ở bước đầu và bước cuối.
- `.rf-close` hoặc Esc: ẩn drawer, mọi thẻ `aria-expanded="false"`, focus về thẻ của bước đang xem.
- `mousedown` ra ngoài drawer và không trúng `.rf-card`: ẩn drawer, không chuyển focus.

- [ ] **Step 2: Thêm tạm hai `<RunFlow steps={…} />` vào bài 3.5 bằng dữ liệu ở Task 1, chạy dev server (`site-dev` trong `.claude/launch.json`), kiểm trên trình duyệt**

Kỳ vọng:
- Bấm thẻ 02: drawer mở ở bước 02, thẻ 02 có viền đậm.
- "Bước sau" sang 03; phím ← về 02; ở bước 01 thì "Bước trước" bị mờ.
- Esc đóng drawer, focus nằm trên thẻ 02.
- Bấm ra ngoài thì drawer đóng.
- Dùng Tab tới thẻ 04 rồi Enter: drawer mở ở bước 04.
- Nút "Sao chép" trong drawer chép đúng câu lệnh của bước.
- Popup lộ trình và Ctrl K vẫn nổi lên trên drawer.
- Đang mở drawer của sơ đồ thứ nhất, bấm một thẻ của sơ đồ thứ hai: drawer thứ nhất đóng, drawer thứ hai mở.

- [ ] **Step 3: Chạy `npm test` và `npm run build`, kỳ vọng PASS và build không lỗi**

- [ ] **Step 4: Bỏ phần thêm tạm khỏi bài 3.5 (`git checkout -- src/content/lessons/3-5-left-join.mdx`), rồi commit `RunFlow.astro`**

```bash
git add src/components/lesson/RunFlow.astro
git commit -m "open, step through and close the flow drawer"
```

### Task 5: Sơ đồ trong bài 3.5 và kiểm nội dung

**Files:**
- Modify: `src/content/lessons/3-5-left-join.mdx` (mục "Làm bằng SQL", sau bảng kết quả của Bước 2), `tests/content.test.ts`

**Interfaces:**
- Consumes: `<RunFlow>` (Task 3); kết quả thật đã lấy ở Task 1.

- [ ] **Step 1: Viết test hỏng trong `tests/content.test.ts`**

```ts
it('SQL inside run-flow steps keeps the N prefix and has no leading spaces', () => {
  for (const f of files) for (const m of f.body.matchAll(/(?:\bsql:\s*|\bquery=\{)`([\s\S]*?)`/g)) {
    expect(findUnprefixedUnicodeStrings(m[1]), f.slug).toEqual([]);
    expect(m[1].split(/\r?\n/).filter(l => /^\s+\S/.test(l)), f.slug).toEqual([]);
  }
});
```

Trong `describe('fixes from the final review')` thêm:

```ts
it('3.5 shows the run order of its final query', () => {
  expect(body('3-5-left-join')).toContain('### SQL Server chạy câu này thế nào');
  expect(body('3-5-left-join')).toContain('<RunFlow');
});
```

Đổi test "summary lessons have no SQL, result or message blocks" thành regex `/<(Sql|Result|Messages|RunFlow)\b/`.

- [ ] **Step 2: Chạy `npx vitest run tests/content.test.ts`, kỳ vọng FAIL ở test bài 3.5**

- [ ] **Step 3: Viết sơ đồ vào bài 3.5**

Tiêu đề cấp 3 "SQL Server chạy câu này thế nào", một câu dẫn ngắn, rồi `<RunFlow query={`…`} steps={[…]} />`: `query` là đúng câu lệnh ở "Bước 2" của bài (giữ chú thích); 5 bước ở Task 1. Mỗi bước: `title` một câu; `focus` là đoạn của `query` ứng với bước; `meaning` 1–2 câu nói từ khóa làm gì, từ khóa đặt trong dấu `` ` ``; `detail` 2–3 câu nói chuyện xảy ra với dữ liệu ở bước này, có số liệu, theo giọng văn mục 4.7 spec đợt 1; `excel` khi có việc tương ứng (bước 02: VLOOKUP ra `#N/A`; bước 03: lọc `#N/A` bằng AutoFilter; bước 05: Sort A→Z); `rows` tối đa 10 dòng chép từ lần chạy thật, `total` là số dòng đã kiểm (48, 57, 2, 2, 2). SQL trong `sql:` viết sát lề trái.

- [ ] **Step 4: Chạy `npm test`, `npm run build`, `npm run check:dist`, kỳ vọng tất cả PASS, check-dist báo OK**

- [ ] **Step 5: Mở `/microsoft-sql-lession/bai/3-5-left-join/` trên dev server, chụp màn hình sơ đồ và drawer bước 02, so với mockup đã duyệt**

- [ ] **Step 6: Commit**

```bash
git add src/content/lessons/3-5-left-join.mdx tests/content.test.ts
git commit -m "show the run order of the LEFT JOIN query in lesson 3.5"
```

### Task 6: Chạy thử bài tập có ROLLBACK (nhánh riêng, không merge)

**Files (trên nhánh `spike/exercise-runner`, tạo từ `main`):**
- Create: `spike/package.json` (`"type": "module"`, phụ thuộc `mssql` `^12.7.9`, `dotenv` `^18.0.8` như `mcp-azure-sql/package.json`), `spike/db.mjs`, `spike/guard.mjs`, `spike/run.mjs`, `spike/grade.mjs`, `spike/snapshot.mjs`, `spike/main.mjs`

**Files (trên `main`):**
- Create: `docs/superpowers/specs/2026-10-18-exercise-runner-spike-results.md`

**Interfaces (chỉ trong bản chạy thử):**
- `db.mjs`: `getPool(): Promise<sql.ConnectionPool>` — đọc `../.env` và tách `url` giống `parseConnection` trong `mcp-azure-sql/index.js`; `requestTimeout` 10000.
- `guard.mjs`: `guardExercise(text: string): { ok: true } | { ok: false; reason: string }` — dùng `sanitize` chép từ `mcp-azure-sql/readonly.js`; một câu lệnh duy nhất; từ đầu tiên là `SELECT`, `WITH`, `INSERT`, `UPDATE` hoặc `DELETE`; chặn `commit`, `rollback`, `save`, `begin tran`, `exec`, `execute`, `use`, `go`, `create`, `alter`, `drop`, `truncate`, `merge`, `grant`, `revoke`, `deny`, `backup`, `restore`, `dbcc`, `waitfor`, `openrowset`, `openquery`, `opendatasource`, `bulk`, `kill`, `shutdown`, `reconfigure`; câu bắt đầu bằng `SELECT`/`WITH` thì chặn thêm `into`.
- `run.mjs`: `runInRollback(pool, text: string, checkSql?: string): Promise<{ recordsets: object[][]; rowsAffected: number[]; error?: string; ms: number }>` — `new sql.Transaction(pool)`, `begin`, chạy `SET XACT_ABORT ON; SET LOCK_TIMEOUT 3000;` rồi câu lệnh, rồi `checkSql`; khối `finally` luôn `rollback` (bỏ qua lỗi nếu transaction đã bị hủy).
- `grade.mjs`: `sameResult(a: object[], b: object[], ordered: boolean): { ok: boolean; reason?: string }` — so theo giá trị, bỏ qua tên cột; `Date` thành chuỗi ISO; không `ordered` thì sắp xếp dòng trước khi so; lý do: "Khác số cột: bạn ra X, đáp án Y", "Khác số dòng: bạn ra X, đáp án Y", "Dòng N khác". `gradeQuery(pool, learner, answer, ordered)` và `gradeChange(pool, learner, answer, checkSql)` (so kết quả `checkSql` và `rowsAffected`).
- `snapshot.mjs`: `snapshot(pool): Promise<Record<string, { n: number; c: number }>>` — với 7 bảng `PhongBan`, `ChucDanh`, `NhanVien`, `HopDong`, `ChamCong`, `DonNghiPhep`, `BangLuong`: `SELECT COUNT(*) AS n, CHECKSUM_AGG(BINARY_CHECKSUM(*)) AS c FROM dbo.<bảng>`.

- [ ] **Step 1: `git switch -c spike/exercise-runner`, viết các file, `cd spike && npm install`**

- [ ] **Step 2: Viết `main.mjs` với các trường hợp và kết quả kỳ vọng dưới đây; thoát mã 1 nếu có trường hợp nào lệch kỳ vọng**

| Trường hợp | Kỳ vọng |
|---|---|
| Truy vấn: đáp án là câu cuối bài 3.5 (chỉ `MaNV`, `HoTen`), không cần sắp xếp; học viên dùng `NOT EXISTS` và tên cột khác | đúng |
| Như trên, học viên sắp xếp `ORDER BY HoTen DESC` | đúng |
| Như trên, học viên quên `WHERE` | sai, "Khác số dòng: bạn ra 57, đáp án 2" |
| Truy vấn có yêu cầu sắp xếp: nhân viên phòng `IT` theo `MaNV`; học viên `ORDER BY MaNV DESC` | sai, "Dòng 1 khác" |
| Sửa dữ liệu: tăng `PhuCap` 10% cho nhân viên `IT` kỳ `2026-09` (đáp án dùng `JOIN`, học viên dùng `IN (SELECT …)`); kiểm `SELECT MaNV, KyLuong, PhuCap FROM BangLuong ORDER BY KyLuong, MaNV` | đúng, 9 dòng bị ảnh hưởng |
| Như trên, học viên quên điều kiện `KyLuong` | sai |
| Xóa: `DELETE FROM DonNghiPhep WHERE TrangThai = N'Từ chối'`; học viên viết thiếu `N` | sai, 0 dòng so với 2 dòng |
| Lỗi giữa chừng: `UPDATE BangLuong SET PhuCap = PhuCap / 0 WHERE KyLuong = '2026-09'` | trả nguyên văn lỗi chia cho 0 của SQL Server |
| Bộ chặn: `COMMIT`; `SELECT 1; COMMIT`; `/* x */ DROP TABLE NhanVien`; `EXEC sp_who`; `SELECT * INTO X FROM NhanVien`; `WAITFOR DELAY '00:00:05'` | bị chặn, có lý do |
| Bộ chặn: `SELECT N'COMMIT' AS x` | được chạy |

Trước trường hợp đầu tiên và sau mỗi trường hợp sửa dữ liệu: chụp `snapshot` và so với lần đầu. Lệch thì dừng ngay, in bảng bị lệch và báo người làm khóa học (cách khôi phục: chạy lại `database/HRM_Demo.sql`).

Đo thời gian: lần kết nối và truy vấn đầu tiên (ghi rõ lúc đó database có vẻ đang ngủ hay không: mất trên 10 giây coi là đang ngủ), và trung bình 5 lần `SELECT` khi đã thức.

- [ ] **Step 3: Chạy `node spike/main.mjs`, kỳ vọng mọi trường hợp đúng kỳ vọng và checksum trước/sau giống hệt; commit trên nhánh spike**

```bash
git add spike
git commit -m "spike: run exercises in a rolled-back transaction"
```

- [ ] **Step 4: `git switch main`, viết `docs/superpowers/specs/2026-10-18-exercise-runner-spike-results.md`**

Gồm: bảng các trường hợp và kết quả; checksum trước/sau; thời gian lần đầu và khi đã thức; những gì chạy khác dự kiến; đề xuất cho spec B (nơi chạy API, giới hạn thời gian, cách báo database đang khởi động, những gì bộ chặn còn thiếu). Ghi tên nhánh `spike/exercise-runner` và commit chứa code chạy thử.

- [ ] **Step 5: Commit file kết quả trên `main`**

```bash
git add docs/superpowers/specs/2026-10-18-exercise-runner-spike-results.md
git commit -m "record the exercise runner spike results"
```

### Task 7: Kiểm tra cuối

- [ ] **Step 1: Chạy `npm test`, `npm run build`, `npm run check:dist` trên `main`, kỳ vọng tất cả PASS**
- [ ] **Step 2: `git status` sạch (trừ các file chưa theo dõi đã biết: `.claude/`, `.mcp.json`, `CLAUDE.md`, `mcp-azure-sql/`); `git branch` còn `spike/exercise-runner` chưa merge**
- [ ] **Step 3: Báo người làm khóa học kết quả và hỏi có push `main` không; không tự push**


## Lượt bài 2.6–2.9 — ngày 21/10/2026

Khung chung đã được duyệt trong hội thoại. Bốn nhánh riêng nối tiếp từ bài 2.5; tác giả làm các file bài độc lập, sau đó tích hợp theo thứ tự và review mỗi bài bằng agent mới kế thừa model phiên.

- [x] Đọc quy ước, kiểm bản nền 245/245 test và tách bốn nhánh.
- [x] Chốt mốc ngày cố định 21/10/2026; đối chiếu seed độc lập.
- [x] Hoàn thiện, kiểm tra và xử lý review bài 2.6: 247/247 test, check không lỗi, build 81 trang, 1.469 liên kết; API build/typecheck đạt. SQL live và browser chưa xác minh.
- [x] Hoàn thiện, kiểm tra và xử lý review bài 2.7: 250/250 test, check không lỗi, build 84 trang, 1.501 liên kết; API build/typecheck đạt. SQL live và browser chưa xác minh.
- [x] Hoàn thiện, kiểm tra và xử lý review bài 2.8: 252/252 test, check không lỗi, build 87 trang, 1.531 liên kết; API build/typecheck đạt. SQL live và browser chưa xác minh.
- [x] Hoàn thiện, kiểm tra và xử lý review bài 2.9: 255/255 test, check không lỗi, build 90 trang, 1.561 liên kết; API build/typecheck đạt. HTML tĩnh đủ bốn bài và 12 trang bài tập mới; SQL live và browser chưa xác minh.

SQL Server live còn thiếu cấu hình kết nối; không coi fixture là thực thi T-SQL. Browser chưa khả dụng; HTML build không xác nhận giao diện hay bàn phím.

## Review và nhập main bài 2.3–2.9 (21/10/2026)

Người làm khóa học yêu cầu rõ: “review và hoàn thiện các bài từ 2.3 - 2.9 trên nhánh riêng, sau đó đưa vào main”. Yêu cầu này cho phép đưa kết quả đã kiểm lên `main` và phát hành theo workflow hiện có, thay bước hỏi push của lượt local trước. Không đổi quy ước chung.

- [x] Fetch và xác nhận bảy nhánh nối tiếp; tạo `codex/review-lessons-2-3-2-9` từ main mới nhất, merge nhánh 2.9 giữ lịch sử cả bảy bài.
- [x] Review độc lập từng bài bằng agent Codex mới kế thừa model, đọc hết và xác minh nhận xét trước sửa; thêm review tích hợp cuối độc lập, không có mục bắt buộc còn mở.
- [x] Sửa độ phân biệt các bài tập `_`, `NULL`, hoa/thường, dấu và ngày kỷ niệm; làm rõ cột có giờ/NULL; rút câu lặp và giữ khung gộp đã duyệt.
- [x] SQL Server live: câu ví dụ/Result/RunFlow, bảy hình Excel, đáp án và các bài làm sai tiêu biểu khớp kỳ vọng; API 36/36 đáp án, kiểm dữ liệu sau hoàn tác không lệch bảng.
- [x] Web 258/258 test, check 0 lỗi/0 warning, build 90 trang, check:dist 1.561 liên kết; API build/typecheck đạt. Sửa test fixture CRLF, không nới điều kiện kiểm.
- [x] Browser 1280/1440px, mục lục/hình/bảng/highlight, bàn phím ở sơ đồ và tự kiểm tra; ghi đúng giới hạn xác minh.
- [x] Ghi [báo cáo tổng và tám report](../../reviews/2026-10-21-level-2-completion/README.md), Đã sửa/Không làm theo ở spec.
- [x] Commit/push nhánh review `b4500fd`; nhập local main bằng merge `05a4a48`, cây tệp khớp nhánh đã kiểm, 258/258 test sau merge. Phát hành main theo yêu cầu; theo dõi hai workflow bằng commit main tại [GitHub Actions](https://github.com/nhatlam1111/microsoft-sql-lession/actions).
