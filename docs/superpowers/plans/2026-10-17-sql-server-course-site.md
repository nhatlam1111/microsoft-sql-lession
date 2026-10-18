# Kế hoạch triển khai: website khóa học "SQL Server"

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Trạng thái (2026-10-18):** đã làm xong và đã lên web. Các thay đổi sau đó ghi ở spec đợt 1 mục 11.

**Goal:** Dựng website tĩnh "SQL Server" (51 trang bài: 3 bài đầy đủ, 48 bản tóm tắt; popup lộ trình; mindmap theo mảng kiến thức; tiến độ lưu trong trình duyệt) cùng script database mẫu `HRM_Demo`, đăng được lên GitHub Pages.

**Architecture:** Astro dựng mọi trang ở dạng tĩnh. Thông tin từng bài nằm ở frontmatter MDX, kiểm bằng một zod schema dùng chung cho build và test. Phần tương tác là các React island dùng chung một module kho tiến độ (bộ nhớ + `localStorage`, `useSyncExternalStore`). Mọi logic đáng kể (tiến độ, quy tắc popup, tìm kiếm, bố trí mindmap, tô màu T-SQL, kiểm danh mục bài) nằm trong module TypeScript thuần ở `src/lib/` và có test Vitest. Component Astro được test qua Container API. Một script sau build kiểm đầu ra dưới base `/microsoft-sql-lession/`.

**Tech Stack:** Astro 5, @astrojs/mdx 4, @astrojs/react 4, React 19, @xyflow/react 12, @fontsource (be-vietnam-pro, literata, jetbrains-mono), Vitest 3, yaml 2, GitHub Actions + GitHub Pages; T-SQL cho SQL Server 2019+ và Azure SQL Database.

**Spec:** `docs/superpowers/specs/2026-10-17-sql-server-course-site-design.md` (mockup: `docs/superpowers/specs/2026-10-17-mockups/`)

## Global Constraints

- `site: 'https://nhatlam1111.github.io'`, `base: '/microsoft-sql-lession'`. Mọi link nội bộ đi qua `withBase()` hoặc `lessonUrl()`; không có link bắt đầu bằng `/` mà thiếu base.
- Làm trên nhánh `course-website`. Mỗi commit kết thúc bằng dòng `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Không push khi người dùng chưa cho phép.
- Chỉ máy tính: thiết kế cho màn hình từ 1280px; dưới 1024px hiện dải thông báo đúng chữ `Trang được thiết kế cho máy tính.`, vẫn cho xem. Chỉ giao diện sáng.
- Giao diện và nội dung tiếng Việt; từ khóa SQL, tên hàm, tên tính năng Excel giữ tiếng Anh. Tên trang: `SQL Server`. Tiêu đề tab: trang chủ `SQL Server`, trang bài `<num> <title> · SQL Server`, trang khác `<tên trang> · SQL Server`.
- Font tự host bằng @fontsource: Be Vietnam Pro (giao diện, tiêu đề), Literata (đoạn văn trong bài), JetBrains Mono (code).
- Màu: nền `#F4F2EC`, khối `#FFFFFF`, chữ `#1F2328` / `#5B6169` / `#8A9099`, kẻ `#E5E2DA`, nhấn `#1F4FD1` (nhạt `#E8EEFF`), đã học `#1A7F4B` (nhạt `#E3F4EA`), đã xem `#B26B00`, cần xem lại `#C0364F` (nhạt `#FBE3E8`). Level L1–L6: `#0F8B8D`, `#2F6FD6`, `#5B4BC4`, `#9B3FAE`, `#C4581F`, `#8A2D16`; nền nhạt `#DCF2F2`, `#E3ECFC`, `#EBE8FA`, `#F4E6F7`, `#FBEADF`, `#F6E2DB`. Được chỉnh nhẹ cho đủ tương phản, giữ quy ước màu trạng thái.
- Trạng thái bài: Chưa học / Đã xem (tự đánh dấu khi mở bài) / Đã học (chỉ khi bấm "Đã học xong"), cộng cờ "Cần xem lại" độc lập. Khi có cờ, biểu tượng cờ được ưu tiên. Số "đã học" chỉ đếm Đã học.
- Quy tắc viết: xưng "bạn"; dùng "kết bảng" cho JOIN; không nhắc vai trò hay xuất thân người đọc; không emoji; không dùng các cụm trong `BANNED_PHRASES` (Task 3). Tên mục trong bài cố định theo `SECTION_HEADINGS` (Task 3).
- SQL trong bài chạy được trên SQL Server 2019+ và Azure SQL Database với `HRM_Demo`. Kết quả chép từ lần chạy thật; có `ORDER BY` khi thứ tự có nghĩa; kết quả bị cắt bớt ghi rõ số dòng trích; chuỗi tiếng Việt luôn có tiền tố `N`. Bản tóm tắt không chứa khối `<Sql>`, `<Result>`, `<Messages>`.
- Không ghi gì vào Azure SQL `sql-lession`; MCP `azure-sql` chỉ dùng để đọc.
- Vitest và TypeScript không quét thư mục `mcp-azure-sql/` (thư mục này có file test riêng).
- Trước Task 7 (phần giao diện đầu tiên), nạp skill `frontend-design` để tinh chỉnh thị giác trong khuôn khổ màu và bố cục ở trên; mockup trong thư mục spec là mốc.

## Review Focus

1. Trình duyệt chặn `localStorage`, hoặc dữ liệu đã lưu bị hỏng: không được âm thầm mất tiến độ; phải giữ lại bản cũ và hiện thông báo. Test ở Task 4.
2. Nhập file tiến độ sai định dạng, khác phiên bản, hoặc có bài không còn trong khóa: báo lỗi rõ hoặc bỏ qua bài lạ kèm số lượng, không vỡ trang. Test ở Task 4.
3. Link gốc `/…` thiếu base vẫn chạy trên máy nhưng gãy trên GitHub Pages. Test ở Task 1 (bộ kiểm `check-dist`), chạy lại ở Task 20.
4. Tiếng Việt: gõ không dấu, chữ "đ", văn bản dạng NFD (dán từ macOS) vẫn phải tìm ra; chuỗi tiếng Việt thiếu `N` trong câu SQL sẽ thành dấu `?` khi người học chạy thử. Test ở Task 12 và Task 2, Task 7.
5. Mở hai tab cùng lúc: tab cũ ghi đè tiến độ mới của tab kia. Test ở Task 5.

---

### Task 1: Khung dự án Astro, base path, bộ kiểm bản build, workflow đăng trang

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `src/lib/paths.ts`, `src/pages/index.astro` (tạm), `scripts/check-dist.mjs`, `.github/workflows/deploy.yml`
- Modify: `.gitignore` (thêm `dist/` và `.astro/`; giữ nguyên các dòng đang có)
- Test: `tests/paths.test.ts`, `tests/check-dist.test.ts`

**Interfaces:**
- Produces:
  - `withBase(path: string, base: string = import.meta.env.BASE_URL): string`: trả về base + path với đúng một dấu `/` ở giữa; chấp nhận base có hoặc không có `/` cuối.
  - `lessonUrl(slug: string, base?: string): string` = `withBase(`bai/${slug}/`, base)`.
  - `scripts/check-dist.mjs` export `findLinkProblems(html: string, fileExists: (distPath: string) => boolean, base: string): string[]`. Chạy trực tiếp thì quét mọi `dist/**/*.html`, lấy thuộc tính `href` và `src`, bỏ link ngoài (`http…`, `mailto:`) và link `#…`; với link nội bộ: bỏ `#…`/`?…`, bỏ base, đường dẫn kết thúc `/` hoặc rỗng thì thêm `index.html`, không có đuôi file thì thử `<path>/index.html`. Ngoài ra kiểm số trang `dist/bai/*/index.html` bằng số file `src/content/lessons/*.mdx`. In `check-dist: OK (<n> trang, <m> link)` và thoát 0, hoặc in từng lỗi và thoát 1.
  - npm scripts: `dev`, `build`, `preview`, `test` (= `vitest run`), `check:dist` (= `node scripts/check-dist.mjs`).

- [ ] **Step 1: Cài đặt**

Kiểm `node -v` ≥ 20.3. Tạo `package.json` (`"name": "microsoft-sql-lession"`, `"type": "module"`, `"private": true`), rồi:
```bash
npm install astro@^5 @astrojs/mdx@^4 @astrojs/react@^4 react@^19 react-dom@^19 @xyflow/react@^12 @fontsource/be-vietnam-pro @fontsource/literata @fontsource/jetbrains-mono
npm install -D vitest@^3 yaml@^2 typescript @types/react @types/react-dom
```

- [ ] **Step 2: Cấu hình**

`astro.config.mjs`: `site`, `base` như Global Constraints, `integrations: [mdx(), react()]`. `tsconfig.json`: extends `astro/tsconfigs/strict`, `"jsx": "react-jsx"`, `"jsxImportSource": "react"`, `"exclude": ["dist", "mcp-azure-sql"]`. `vitest.config.ts`: `export default getViteConfig({ test: { include: ['tests/**/*.test.ts'], env: { TZ: 'Asia/Ho_Chi_Minh' } } })` (`getViteConfig` từ `astro/config`).

- [ ] **Step 3: Viết test (đang fail)**

```ts
// tests/paths.test.ts
import { describe, it, expect } from 'vitest';
import { withBase, lessonUrl } from '../src/lib/paths';

describe('withBase', () => {
  for (const base of ['/microsoft-sql-lession', '/microsoft-sql-lession/']) {
    it(`joins with exactly one slash (base ${base})`, () => {
      expect(withBase('/', base)).toBe('/microsoft-sql-lession/');
      expect(withBase('bai/3-5-left-join/', base)).toBe('/microsoft-sql-lession/bai/3-5-left-join/');
      expect(withBase('/gioi-thieu/', base)).toBe('/microsoft-sql-lession/gioi-thieu/');
    });
  }
  it('uses the Astro base by default', () => {
    expect(lessonUrl('3-5-left-join')).toBe('/microsoft-sql-lession/bai/3-5-left-join/');
  });
});
```
```ts
// tests/check-dist.test.ts
import { it, expect } from 'vitest';
import { findLinkProblems } from '../scripts/check-dist.mjs';

const BASE = '/microsoft-sql-lession';
const exists = (p: string) => p === 'bai/1-1-x/index.html' || p === 'HRM_Demo.sql';

it('flags root links without the base', () => {
  expect(findLinkProblems('<a href="/bai/1-1-x/">x</a>', exists, BASE)).toEqual(['thiếu base: /bai/1-1-x/']);
});
it('flags base links that point to nothing', () => {
  expect(findLinkProblems('<a href="/microsoft-sql-lession/bai/9-9-y/">y</a>', exists, BASE))
    .toEqual(['không tồn tại: /microsoft-sql-lession/bai/9-9-y/']);
});
it('accepts good links, files, anchors and external urls', () => {
  const html = '<a href="/microsoft-sql-lession/bai/1-1-x/">a</a><a href="/microsoft-sql-lession/HRM_Demo.sql">b</a>'
    + '<a href="#tinh-huong">c</a><a href="https://example.com/">d</a><link href="/microsoft-sql-lession/bai/1-1-x/#top">';
  expect(findLinkProblems(html, exists, BASE)).toEqual([]);
});
```

- [ ] **Step 4: Chạy test, phải fail**

Run: `npx vitest run tests/paths.test.ts tests/check-dist.test.ts`
Expected: FAIL (không tìm thấy module `src/lib/paths` và `scripts/check-dist.mjs`)

- [ ] **Step 5: Viết `src/lib/paths.ts` và `scripts/check-dist.mjs` theo Interfaces**

- [ ] **Step 6: Chạy test, phải pass**

Run: `npx vitest run tests/paths.test.ts tests/check-dist.test.ts`
Expected: PASS (6 test)

- [ ] **Step 7: Trang chủ tạm và kiểm bản build**

`src/pages/index.astro`: `<html lang="vi">`, `<title>SQL Server</title>`, một tiêu đề. Rồi:
Run: `npm run build && npm run check:dist`
Expected: `check-dist: OK (1 trang, …)`

- [ ] **Step 8: Workflow đăng trang**

`.github/workflows/deploy.yml`: chạy khi push vào `main` và khi chạy tay (`workflow_dispatch`); `permissions: contents: read, pages: write, id-token: write`; `concurrency: group: pages`. Job `build` (ubuntu-latest): `actions/checkout@v4`, `actions/setup-node@v4` (node 22, `cache: npm`), `npm ci`, `npm test`, `npm run build`, `npm run check:dist`, `actions/upload-pages-artifact@v3` (`path: dist`). Job `deploy` (`needs: build`, `environment: github-pages`): `actions/deploy-pages@v4`. Action nào báo lỗi thời thì nâng lên major mới nhất.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts .gitignore src scripts tests .github
git commit -m "set up astro site with base path checks and pages workflow"
```

---

### Task 2: Bộ đọc T-SQL, kiểm chuỗi tiếng Việt, script `HRM_Demo`

**Files:**
- Create: `src/lib/tsql-lexer.ts`, `database/HRM_Demo.sql`
- Test: `tests/tsql-lexer.test.ts`

**Interfaces:**
- Produces:
  - `type RawTokenType = 'space' | 'comment' | 'string' | 'variable' | 'word' | 'number' | 'symbol'`; `interface RawToken { text: string; type: RawTokenType }`.
  - `lexTsql(code: string): RawToken[]`, không mất ký tự (nối `text` lại bằng đúng `code`). Quy tắc: `space` = `\s+`; `comment` = `--` tới hết dòng (không gồm ký tự xuống dòng) hoặc `/* … */`; `string` = tùy chọn `N`/`n` đứng sát `'…'`, `''` là dấu nháy thoát; `variable` = `@@?[\p{L}\p{N}_]+`; `word` = `[\p{L}_][\p{L}\p{N}_$#]*` hoặc cả cụm `[ … ]`; `number` = `\d+(\.\d+)?`; `symbol` = một ký tự còn lại, riêng `<>`, `<=`, `>=`, `!=` là một token.
  - `findUnprefixedUnicodeStrings(code: string): string[]`: các token `string` có ký tự ngoài ASCII mà không bắt đầu bằng `N`/`n`.
  - Các bảng `dbo.PhongBan`, `dbo.ChucDanh`, `dbo.NhanVien`, `dbo.HopDong`, `dbo.ChamCong`, `dbo.DonNghiPhep`, `dbo.BangLuong` (cột theo mục 4.8 của spec) và các điểm neo dữ liệu ở Step 6, dùng ở Task 14–16.

- [ ] **Step 1: Viết test (đang fail)**

```ts
// tests/tsql-lexer.test.ts
import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { lexTsql, findUnprefixedUnicodeStrings } from '../src/lib/tsql-lexer';

const types = (code: string) => lexTsql(code).filter(t => t.type !== 'space').map(t => `${t.text}|${t.type}`);

it('is lossless, including CRLF line ends', () => {
  const code = "SELECT nv.MaNV\r\nFROM NhanVien AS nv -- chú thích\r\nWHERE HoTen = N'Đỗ Minh Quân';";
  expect(lexTsql(code).map(t => t.text).join('')).toBe(code);
});
it('splits identifiers, strings, comments, variables and operators', () => {
  expect(types("SELECT nv.MaNV, N'Kế toán', 'it''s', @@ROWCOUNT FROM [Bảng 1] WHERE a <> 2.5 /* x */"))
    .toEqual(['SELECT|word', 'nv|word', '.|symbol', 'MaNV|word', ',|symbol', "N'Kế toán'|string", ',|symbol',
      "'it''s'|string", ',|symbol', '@@ROWCOUNT|variable', 'FROM|word', '[Bảng 1]|word', 'WHERE|word',
      'a|word', '<>|symbol', '2.5|number', '/* x */|comment']);
});
it('finds Vietnamese strings without the N prefix, ignoring comments', () => {
  expect(findUnprefixedUnicodeStrings(
    "-- 'Nguyễn' trong chú thích\nSELECT * FROM NhanVien WHERE HoTen = 'Nguyễn Văn A' AND MaPB = N'Kế toán' AND MaNV = 'NV001'",
  )).toEqual(["'Nguyễn Văn A'"]);
});
it('HRM_Demo.sql has no Vietnamese string without N and no GO, USE or CREATE DATABASE', () => {
  const sql = readFileSync('database/HRM_Demo.sql', 'utf8');
  expect(findUnprefixedUnicodeStrings(sql)).toEqual([]);
  const words = lexTsql(sql).filter(t => t.type === 'word').map(t => t.text.toUpperCase());
  expect(words).not.toContain('GO');
  expect(words).not.toContain('USE');
  const code = lexTsql(sql).filter(t => t.type !== 'comment').map(t => t.text).join('');
  expect(/CREATE\s+DATABASE/i.test(code)).toBe(false);
});
```

- [ ] **Step 2: Chạy test, phải fail**

Run: `npx vitest run tests/tsql-lexer.test.ts`
Expected: FAIL (không tìm thấy module `src/lib/tsql-lexer`)

- [ ] **Step 3: Viết `src/lib/tsql-lexer.ts` theo Interfaces**

- [ ] **Step 4: Chạy lại: 3 test đầu pass, test `HRM_Demo.sql` vẫn fail vì chưa có file**

Run: `npx vitest run tests/tsql-lexer.test.ts`
Expected: 3 PASS, 1 FAIL (ENOENT `database/HRM_Demo.sql`)

- [ ] **Step 5: Kiểm `sql-lession` có bảng trùng tên không (chỉ đọc)**

Kết nối MCP `azure-sql`: nạp `mcp__ccd_connectors__session_connectors_status`; nếu `azure-sql` đang mất kết nối thì gọi `mcp__ccd_connectors__reconnect_session_connector`. Vẫn không được thì nhờ người dùng kết nối lại, làm tiếp Step 6–8 và quay lại bước này sau. Chạy:
```sql
SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME IN ('PhongBan','ChucDanh','NhanVien','HopDong','ChamCong','DonNghiPhep','BangLuong');
```
Expected: 0 dòng. Có dòng nào thì dừng và báo người dùng tên bảng trùng.

- [ ] **Step 6: Viết `database/HRM_Demo.sql`**

- Đầu file là chú thích tiếng Việt: database giả lập, dữ liệu giả, công thức lương đơn giản hóa và không dùng để tính lương thật; cách chạy (máy riêng: tạo database `HRM_Demo` rồi chạy; Azure SQL: chạy trong database đang mở); chạy lại được nhiều lần; ngày nghỉ lễ Quốc khánh đã chọn cho tháng 9/2026.
- Một batch duy nhất: không `GO`, không `USE`, không `CREATE DATABASE` (chạy được cả trong Query editor của Azure Portal).
- `DROP TABLE IF EXISTS` theo thứ tự `BangLuong, DonNghiPhep, ChamCong, HopDong, NhanVien, ChucDanh, PhongBan`, rồi `CREATE TABLE` có khóa chính, khóa ngoại, `NVARCHAR` cho chữ tiếng Việt. Không đặt `UNIQUE` cho `SoCCCD`, không đặt `CHECK` ngày cho `HopDong` (để bài 4.6 có lỗi mà soi).
- Điểm neo dữ liệu:
  - `PhongBan` đúng 6 dòng: `('BGD', N'Ban Giám đốc')`, `('NS', N'Nhân sự')`, `('KT', N'Kế toán')`, `('KD', N'Kinh doanh')`, `('IT', N'IT')`, `('VH', N'Vận hành')`.
  - `NhanVien` đúng 48 dòng `NV001`–`NV048`: `NV001` Trần Thị Mai (KT), `NV002` Lê Văn Hùng (KD), `NV003` Nguyễn Thu Hà (KD), `NV047` Phạm Ngọc Ánh (NS, `NgayVaoLam` 2026-10-01), `NV048` Đỗ Minh Quân (IT, `NgayVaoLam` 2026-10-05). Mỗi phòng có một trưởng phòng, trưởng phòng có `MaQuanLy` là giám đốc (thuộc BGD), người còn lại có `MaQuanLy` là trưởng phòng mình; gán `MaQuanLy` bằng `UPDATE` sau khi chèn đủ 48 dòng. Ít nhất 3 người `TrangThai = N'Đã nghỉ'` có `NgayNghiViec`. Số CCCD giả, bắt đầu bằng `000`.
  - `HopDong`: mọi nhân viên trừ `NV047`, `NV048` có ít nhất một hợp đồng; `NV001`, `NV002`, `NV003` có mã `HD2024-018`, `HD2024-021`, `HD2023-104`; ít nhất 3 người có cả `N'Thử việc'` lẫn một hợp đồng chính thức; ít nhất 5 hợp đồng `N'Không xác định thời hạn'` có `NgayKetThuc` NULL; ít nhất 2 hợp đồng kết thúc trong khoảng 2026-10-18 đến 2026-11-16.
  - Lỗi cố ý cho bài 4.6: đúng một cặp nhân viên trùng `SoCCCD`; ít nhất một nhân viên `Email` NULL; đúng một hợp đồng có `NgayKetThuc < NgayBatDau`.
  - `ChamCong`: ngày thứ Hai–thứ Sáu của tháng 9/2026, trừ ngày lễ đã chọn, cho người đang làm trong tháng; vài lần đi muộn, vài ngày thiếu `GioRa`. Xác định thứ bằng `DATEDIFF(day, '19000101', Ngay) % 7` (0 là thứ Hai), không phụ thuộc `@@DATEFIRST`.
  - `DonNghiPhep`: khoảng 20 đơn; `LoaiNghi` thuộc `N'Phép năm'`, `N'Nghỉ ốm'`, `N'Việc riêng'`; `TrangThai` thuộc `N'Đã duyệt'`, `N'Chờ duyệt'`, `N'Từ chối'`.
  - `BangLuong`: kỳ `'2026-08'` và `'2026-09'` cho người có hợp đồng hiệu lực trong kỳ; `KhauTruBaoHiem` = 10,5% `LuongCoBan`; `ThucLinh` = lương theo ngày công + `PhuCap` + `TienTangCa` − `KhauTruBaoHiem` − `ThueTNCN`, làm tròn tới nghìn đồng.
- Dữ liệu ít dòng viết bằng `INSERT … VALUES`; dữ liệu nhiều dòng (`ChamCong`, `BangLuong`) sinh bằng `INSERT … SELECT` theo quy tắc cố định. Không dùng `RAND()` hay `NEWID()`, để mọi lần chạy ra cùng một kết quả.

- [ ] **Step 7: Chạy test, phải pass**

Run: `npx vitest run tests/tsql-lexer.test.ts`
Expected: PASS (4 test)

- [ ] **Step 8: Commit, rồi nhờ người dùng chạy script**

```bash
git add src/lib/tsql-lexer.ts tests/tsql-lexer.test.ts database/HRM_Demo.sql
git commit -m "add T-SQL lexer and the HRM_Demo sample database script"
```
Nhắn người dùng: script ở `database/HRM_Demo.sql`, nhờ chạy một lần trên `sql-lession` (SSMS hoặc Query editor trên Azure Portal). Trong lúc chờ, làm tiếp Task 3; Step 9 làm khi người dùng báo đã chạy.

- [ ] **Step 9: Kiểm điểm neo qua MCP (chỉ đọc)**

| Câu lệnh | Kết quả đúng |
|---|---|
| `SELECT COUNT(*) AS SoNV FROM NhanVien;` | `48` |
| `SELECT nv.MaNV FROM NhanVien AS nv LEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV WHERE hd.MaHD IS NULL ORDER BY nv.MaNV;` | `NV047`, `NV048` |
| `SELECT MaPB, TenPB FROM PhongBan ORDER BY MaPB;` | đúng 6 dòng ở Step 6 |
| `SELECT COUNT(*) AS SoNguoi FROM (SELECT MaNV FROM HopDong GROUP BY MaNV HAVING COUNT(*) >= 2) AS x;` | `≥ 3` |
| `SELECT SoCCCD FROM NhanVien GROUP BY SoCCCD HAVING COUNT(*) > 1;` | đúng 1 dòng |
| `SELECT COUNT(*) AS SoHD FROM HopDong WHERE NgayKetThuc < NgayBatDau;` | `1` |
| `SELECT KyLuong, COUNT(*) AS SoDong FROM BangLuong GROUP BY KyLuong ORDER BY KyLuong;` | 2 dòng `2026-08`, `2026-09` |

Sai chỗ nào thì sửa script, commit, nhờ người dùng chạy lại rồi kiểm lại.

---

### Task 3: Mô hình dữ liệu khóa học và 51 file bài

**Files:**
- Create: `src/data/curriculum.ts`, `src/lib/lesson-schema.ts`, `src/lib/catalog.ts`, `src/content.config.ts`, `src/lib/load-catalog.ts`, `src/content/lessons/*.mdx` (51 file), `tests/helpers/expected.ts`, `tests/helpers/lessons.ts`
- Test: `tests/catalog.test.ts`, `tests/content.test.ts`

**Interfaces:**
- Produces:
  - `src/data/curriculum.ts`: `type LevelNo = 1 | 2 | 3 | 4 | 5 | 6`; `type AreaId = 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8'`; `interface LevelDef { no: LevelNo; name: string; outcome: string; color: string; soft: string }`; `interface AreaDef { id: AreaId; name: string; side: 'right' | 'left'; order: number }`; `LEVELS: LevelDef[]` (6 dòng, tên và câu "học xong" đúng mục 5 của spec, màu theo Global Constraints); `AREAS: AreaDef[]` (8 dòng, tên đúng mục 6 của spec; A1–A4 `side: 'right'`, A5–A8 `side: 'left'`; `order` 0–3 trong mỗi bên, từ trên xuống).
  - `src/lib/lesson-schema.ts` (dùng `z` từ `astro/zod`): `lessonSchema` gồm `num` (regex `/^[1-6]\.(10|[1-9])$/`), `title`, `shortTitle` (tối đa 28 ký tự), `level` (số nguyên 1–6), `area` (A1–A8), `kind` (`'full' | 'summary'`), `minutes` (số nguyên > 0), `prerequisites` (mảng `num`, mặc định `[]`), `goal` (không bắt đầu bằng "Học xong"), `excel`, `summary`; `type LessonFrontmatter = z.infer<typeof lessonSchema>`;
    `SECTION_HEADINGS = { full: ['Tình huống', 'Với Excel', 'Làm bằng SQL', 'Hay nhầm ở đâu', 'Ứng dụng', 'Ghi nhớ', 'Bài tập'], summary: ['Nội dung chính', 'Liên hệ Excel', 'Tình huống ví dụ', 'Bài tập'] }`;
    `BANNED_PHRASES = ['hãy cùng', 'khám phá', 'trong thế giới', 'hành trình', 'chinh phục', 'bí kíp', 'tuyệt vời', 'tóm lại', 'consultant', 'ba/pm', 'bên khách hàng', 'bàn với dev', 'nối bảng', 'nối nhiều bảng']` (so khớp chữ thường).
  - `src/lib/catalog.ts`: `interface CatalogEntry extends LessonFrontmatter { slug: string }`; `compareNum(a: string, b: string): number` (so theo số, `3.9` < `3.10`); `sortCatalog(entries: CatalogEntry[]): CatalogEntry[]`; `validateCatalog(entries: CatalogEntry[]): string[]` trả về đúng các chuỗi lỗi `duplicate num <num>`, `duplicate slug <slug>`, `<num>: level <level> does not match`, `<num>: unknown prerequisite <p>`, `<num>: prerequisite <p> is not earlier`, `<num>: slug <slug> must start with <major>-<minor>-`; `neighbors(entries: CatalogEntry[], num: string): { prev?: CatalogEntry; next?: CatalogEntry }` theo thứ tự lộ trình.
  - `src/content.config.ts`: collection `lessons`, `loader: glob({ pattern: '*.mdx', base: './src/content/lessons' })`, `schema: lessonSchema`.
  - `src/lib/load-catalog.ts`: `loadCatalog(): Promise<CatalogEntry[]>`: `getCollection('lessons')`, `slug = entry.id`, sắp xếp, nếu `validateCatalog` có lỗi thì ném `Error` liệt kê tất cả.
  - `tests/helpers/expected.ts`: `EXPECTED: string[]` (51 chuỗi, xem Step 1), `ALL_NUMS: string[]`, `fakeCatalog(): CatalogEntry[]` (dựng từ `EXPECTED`: `title = shortTitle = num`, `slug = num.replace('.', '-') + '-x'`, `level` theo số đầu, các trường còn lại giá trị hợp lệ bất kỳ).
  - `tests/helpers/lessons.ts`: `readLessonFiles(): { slug: string; data: unknown; body: string }[]` (đọc `src/content/lessons/*.mdx`, tách frontmatter bằng regex chấp nhận cả `\r\n`, parse bằng `yaml`); `readCatalog(): CatalogEntry[]` (parse qua `lessonSchema`, sắp xếp).
  - Tên file bài: `<major>-<minor>-<kebab-không-dấu>.mdx`, ví dụ `3-5-left-join.mdx`. Thân bài lúc này: đúng các tiêu đề `##` của `SECTION_HEADINGS[kind]` theo thứ tự, dưới mỗi tiêu đề một dòng `{/* TODO-CONTENT */}`.

- [ ] **Step 1: Viết test (đang fail)**

```ts
// tests/helpers/expected.ts (phần dữ liệu cố định)
export const EXPECTED = [
  '1.1 A1 full', '1.2 A1', '1.3 A1', '1.4 A1', '1.5 A1', '1.6 A2',
  '2.1 A2', '2.2 A2', '2.3 A2', '2.4 A2', '2.5 A2', '2.6 A2', '2.7 A3', '2.8 A3', '2.9 A3',
  '3.1 A5', '3.2 A5', '3.3 A5', '3.4 A4', '3.5 A4 full', '3.6 A4', '3.7 A4', '3.8 A4', '3.9 A4', '3.10 A5',
  '4.1 A5', '4.2 A5', '4.3 A5', '4.4 A5', '4.5 A5', '4.6 A6', '4.7 A6', '4.8 A6', '4.9 A6', '4.10 A6',
  '5.1 A1', '5.2 A1', '5.3 A7', '5.4 A7', '5.5 A6', '5.6 A7', '5.7 A7', '5.8 A7', '5.9 A7',
  '6.1 A8', '6.2 A8', '6.3 A8', '6.4 A8', '6.5 A8 full', '6.6 A8', '6.7 A8',
];
```
```ts
// tests/catalog.test.ts
import { it, expect } from 'vitest';
import { compareNum, validateCatalog, neighbors } from '../src/lib/catalog';
import { fakeCatalog } from './helpers/expected';

it('sorts lesson numbers numerically', () => {
  expect(['3.10', '3.9', '1.2', '3.1'].sort(compareNum)).toEqual(['1.2', '3.1', '3.9', '3.10']);
});
it('reports every rule violation', () => {
  const base = { title: 't', shortTitle: 't', area: 'A1', kind: 'summary', minutes: 5, goal: 'g', excel: 'e', summary: 's' } as const;
  const errors = validateCatalog([
    { ...base, slug: '1-1-a', num: '1.1', level: 1, prerequisites: [] },
    { ...base, slug: '1-1-b', num: '1.1', level: 1, prerequisites: [] },
    { ...base, slug: '2-1-c', num: '2.1', level: 3, prerequisites: ['9.9'] },
    { ...base, slug: '2-2-d', num: '2.2', level: 2, prerequisites: ['2.3'] },
    { ...base, slug: 'x-2-3', num: '2.3', level: 2, prerequisites: [] },
  ]);
  expect(errors).toEqual(expect.arrayContaining([
    'duplicate num 1.1',
    '2.1: level 3 does not match',
    '2.1: unknown prerequisite 9.9',
    '2.2: prerequisite 2.3 is not earlier',
    '2.3: slug x-2-3 must start with 2-3-',
  ]));
});
it('accepts the expected catalog shape', () => expect(validateCatalog(fakeCatalog())).toEqual([]));
it('finds neighbours across levels', () => {
  const n = neighbors(fakeCatalog(), '1.6');
  expect([n.prev?.num, n.next?.num]).toEqual(['1.5', '2.1']);
  expect(neighbors(fakeCatalog(), '1.1').prev).toBeUndefined();
});
```
```ts
// tests/content.test.ts
import { describe, it, expect } from 'vitest';
import { lessonSchema, SECTION_HEADINGS, BANNED_PHRASES } from '../src/lib/lesson-schema';
import { validateCatalog } from '../src/lib/catalog';
import { EXPECTED } from './helpers/expected';
import { readLessonFiles, readCatalog } from './helpers/lessons';

describe('lesson files', () => {
  const files = readLessonFiles();
  it('every frontmatter passes the schema', () => {
    for (const f of files) expect(lessonSchema.safeParse(f.data).success, f.slug).toBe(true);
  });
  it('matches the 51 lessons of the design (num, area, kind)', () => {
    expect(readCatalog().map(e => `${e.num} ${e.area}${e.kind === 'full' ? ' full' : ''}`)).toEqual(EXPECTED);
  });
  it('passes the catalog rules', () => expect(validateCatalog(readCatalog())).toEqual([]));
  it('has 7, 7, 3, 6, 9, 6, 6, 7 lessons in areas A1..A8', () => {
    const count = (a: string) => readCatalog().filter(e => e.area === a).length;
    expect(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'].map(count)).toEqual([7, 7, 3, 6, 9, 6, 6, 7]);
  });
  it('uses exactly the section headings of its kind, in order', () => {
    for (const f of files) {
      const kind = (f.data as { kind: 'full' | 'summary' }).kind;
      const h2 = [...f.body.matchAll(/^## (.+?)\s*$/gm)].map(m => m[1]);
      expect(h2, f.slug).toEqual(SECTION_HEADINGS[kind]);
    }
  });
  it('contains no banned phrase and no emoji', () => {
    for (const f of files) {
      const text = (JSON.stringify(f.data) + f.body).toLowerCase();
      for (const p of BANNED_PHRASES) expect(text.includes(p), `${f.slug}: ${p}`).toBe(false);
      expect(/\p{Extended_Pictographic}/u.test(text), f.slug).toBe(false);
    }
  });
  it('summary lessons have no SQL, result or message blocks', () => {
    for (const f of files) {
      if ((f.data as { kind: string }).kind === 'summary') expect(/<(Sql|Result|Messages)\b/.test(f.body), f.slug).toBe(false);
    }
  });
});
```

- [ ] **Step 2: Chạy test, phải fail**

Run: `npx vitest run tests/catalog.test.ts tests/content.test.ts`
Expected: FAIL (thiếu module `src/lib/catalog`, `src/lib/lesson-schema`)

- [ ] **Step 3: Viết `curriculum.ts`, `lesson-schema.ts`, `catalog.ts`, hai file helper theo Interfaces**

- [ ] **Step 4: Chạy test catalog, phải pass**

Run: `npx vitest run tests/catalog.test.ts`
Expected: PASS (4 test)

- [ ] **Step 5: Viết `content.config.ts`, `load-catalog.ts` và 51 file bài**

Frontmatter lấy từ bảng mục 6 của spec: `title` giữ ý tên bài (3.6 là "Kết nhiều bảng: NV → HĐ → Lương", 4.10 là "Viết yêu cầu báo cáo rõ ràng", 5.5 là "Import dữ liệu từ file Excel"); `shortTitle` ngắn cho sidebar và mindmap (ví dụ `LEFT JOIN`); `goal` một câu, không có chữ "Học xong" ở đầu; `excel` = cột "Liên hệ Excel"; `summary` = cột "Nội dung chính" rút gọn còn một câu; `minutes` 8–20; `prerequisites` hợp lý (ví dụ 3.5 là `['2.5', '3.4']`); `kind: full` chỉ cho 1.1, 3.5, 6.5.

- [ ] **Step 6: Chạy toàn bộ test và build**

Run: `npx vitest run && npm run build`
Expected: test PASS; build không lỗi schema

- [ ] **Step 7: Commit**

```bash
git add src/data src/lib/lesson-schema.ts src/lib/catalog.ts src/lib/load-catalog.ts src/content.config.ts src/content tests
git commit -m "add the 51-lesson catalog with schema and content checks"
```

---

### Task 4: Lõi tiến độ và lưu trữ

**Files:**
- Create: `src/lib/progress.ts`, `src/lib/progress-storage.ts`
- Test: `tests/progress.test.ts`, `tests/progress-storage.test.ts`

**Interfaces:**
- Consumes: `ALL_NUMS` (test helper, Task 3).
- Produces (`src/lib/progress.ts`, mọi hàm thuần, không sửa đối số):
  - `type MainStatus = 'todo' | 'seen' | 'done'`; `type Icon = MainStatus | 'flag'`; `interface LessonProgress { status: 'seen' | 'done'; flagged: boolean; seenAt: number; doneAt?: number }`; `interface ProgressState { version: 1; lessons: Record<string, LessonProgress>; lastLessonNum: string | null; lastActiveAt: number | null }`.
  - `STORAGE_KEY = 'sqlserver-course:progress:v1'`; `IMPORT_ERRORS = { notJson: 'File không phải JSON hợp lệ.', badShape: 'File không đúng định dạng tiến độ của khóa học.' }`.
  - `emptyState()`, `statusOf(s, num): MainStatus`, `isFlagged(s, num): boolean`, `iconOf(s, num): Icon`, `markSeen(s, num, now)` (chưa có thì thành `seen`; không hạ `done`; đặt `lastLessonNum = num`), `toggleDone(s, num, now)` (`seen` ↔ `done`; chưa có thì thành `done`), `toggleFlag(s, num, now)` (chưa có thì tạo `seen` có cờ), `touch(s, now)` (đặt `lastActiveAt`), `countDone(s, nums: string[]): number`, `serializeProgress(s): string` (JSON thụt lề 2).
  - `type ImportResult = { ok: true; state: ProgressState; ignored: number } | { ok: false; error: string }`; `parseProgress(text: string, knownNums: string[]): ImportResult` (bỏ bài lạ và đếm vào `ignored`; `lastLessonNum` lạ thành `null`).
  - `demoState(now: number): ProgressState`: Đã học 1.1–1.6, 2.1–2.7, 2.9, 3.1–3.4 (18 bài); 2.8 Đã xem có cờ; 3.5 và 3.7 Đã xem; `lastLessonNum: '3.5'`; `lastActiveAt: now - 14 * 86_400_000`.
  - `exportFileName(now: number): string` → `tien-do-sql-server-YYYY-MM-DD.json` (ngày theo giờ máy).
- Produces (`src/lib/progress-storage.ts`): `interface StorageLike { getItem(k: string): string | null; setItem(k: string, v: string): void }`; `type LoadProblem = null | 'unavailable' | 'corrupt'`; `interface LoadResult { state: ProgressState; problem: LoadProblem }`; `BACKUP_KEY = 'sqlserver-course:progress:corrupt-backup'`; `loadProgress(storage: StorageLike | null, knownNums: string[]): LoadResult` (storage `null` hoặc ném lỗi → trạng thái trống + `unavailable`; giá trị hỏng → chép nguyên văn sang `BACKUP_KEY`, trả trạng thái trống + `corrupt`; chưa có giá trị → trống, `null`); `saveProgress(storage, s): boolean` (`false` khi không ghi được).

- [ ] **Step 1: Viết test (đang fail)**

```ts
// tests/progress.test.ts
import { it, expect } from 'vitest';
import * as P from '../src/lib/progress';
import { ALL_NUMS } from './helpers/expected';

const NOW = new Date(2026, 9, 17, 9, 0).getTime();

it('markSeen turns a todo lesson into seen and remembers it as the last lesson', () => {
  const s = P.markSeen(P.emptyState(), '3.5', NOW);
  expect([P.statusOf(P.emptyState(), '3.5'), P.statusOf(s, '3.5'), s.lastLessonNum]).toEqual(['todo', 'seen', '3.5']);
});
it('markSeen never downgrades a done lesson', () => {
  const s = P.markSeen(P.toggleDone(P.markSeen(P.emptyState(), '1.1', NOW), '1.1', NOW), '1.1', NOW + 1);
  expect(P.statusOf(s, '1.1')).toBe('done');
});
it('toggleDone switches seen and done, and only done is counted', () => {
  let s = P.markSeen(P.markSeen(P.emptyState(), '3.5', NOW), '3.6', NOW);
  s = P.toggleDone(s, '3.5', NOW);
  expect(P.countDone(s, ALL_NUMS)).toBe(1);
  expect(P.statusOf(P.toggleDone(s, '3.5', NOW), '3.5')).toBe('seen');
});
it('the flag is independent of the status and wins the icon', () => {
  const s = P.toggleFlag(P.toggleDone(P.markSeen(P.emptyState(), '2.8', NOW), '2.8', NOW), '2.8', NOW);
  expect([P.statusOf(s, '2.8'), P.isFlagged(s, '2.8'), P.iconOf(s, '2.8'), P.countDone(s, ALL_NUMS)]).toEqual(['done', true, 'flag', 1]);
  expect(P.statusOf(P.toggleFlag(P.emptyState(), '4.1', NOW), '4.1')).toBe('seen');
});
it('does not mutate its input', () => {
  const s = P.emptyState();
  P.markSeen(s, '1.1', NOW);
  expect(s).toEqual(P.emptyState());
});
it('serialize then parse gives the same state', () => {
  const s = P.demoState(NOW);
  expect(P.parseProgress(P.serializeProgress(s), ALL_NUMS)).toEqual({ ok: true, state: s, ignored: 0 });
});
it('rejects text that is not JSON', () => {
  expect(P.parseProgress('abc', ALL_NUMS)).toEqual({ ok: false, error: 'File không phải JSON hợp lệ.' });
});
it('rejects JSON of the wrong shape', () => {
  for (const t of ['{}', '[]', '{"version":2,"lessons":{}}', '{"version":1,"lessons":{"1.1":{"status":"great","flagged":false,"seenAt":1}}}']) {
    expect(P.parseProgress(t, ALL_NUMS)).toEqual({ ok: false, error: 'File không đúng định dạng tiến độ của khóa học.' });
  }
});
it('ignores lessons that are no longer in the course and counts them', () => {
  const text = JSON.stringify({ version: 1, lastLessonNum: '9.9', lastActiveAt: 5,
    lessons: { '1.1': { status: 'done', flagged: false, seenAt: 1 }, '9.9': { status: 'seen', flagged: false, seenAt: 2 } } });
  const r = P.parseProgress(text, ALL_NUMS);
  expect(r.ok && [Object.keys(r.state.lessons), r.state.lastLessonNum, r.ignored]).toEqual([['1.1'], null, 1]);
});
it('the demo state matches the mockup', () => {
  const s = P.demoState(NOW);
  expect(P.countDone(s, ALL_NUMS)).toBe(18);
  expect([P.iconOf(s, '2.8'), P.statusOf(s, '3.5'), P.statusOf(s, '3.7'), s.lastLessonNum]).toEqual(['flag', 'seen', 'seen', '3.5']);
  expect(s.lastActiveAt).toBe(NOW - 14 * 86_400_000);
});
it('names the export file by local date', () => {
  expect(P.exportFileName(NOW)).toBe('tien-do-sql-server-2026-10-17.json');
});
```
```ts
// tests/progress-storage.test.ts
import { it, expect } from 'vitest';
import { loadProgress, saveProgress, BACKUP_KEY } from '../src/lib/progress-storage';
import { STORAGE_KEY, emptyState, serializeProgress, demoState } from '../src/lib/progress';
import { ALL_NUMS } from './helpers/expected';

const mem = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }; };

it('starts empty without a problem when nothing is stored', () => {
  expect(loadProgress(mem(), ALL_NUMS)).toEqual({ state: emptyState(), problem: null });
});
it('loads what was saved', () => {
  const st = mem(); const s = demoState(1_000_000_000);
  expect(saveProgress(st, s)).toBe(true);
  expect(loadProgress(st, ALL_NUMS)).toEqual({ state: s, problem: null });
});
it('keeps a copy of corrupt data instead of silently losing it', () => {
  const st = mem(); st.setItem(STORAGE_KEY, '{not json');
  expect(loadProgress(st, ALL_NUMS)).toEqual({ state: emptyState(), problem: 'corrupt' });
  expect(st.getItem(BACKUP_KEY)).toBe('{not json');
});
it('reports blocked or missing storage', () => {
  const blocked = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); } };
  expect(loadProgress(blocked, ALL_NUMS).problem).toBe('unavailable');
  expect(loadProgress(null, ALL_NUMS).problem).toBe('unavailable');
  expect(saveProgress(blocked, emptyState())).toBe(false);
  expect(saveProgress(null, emptyState())).toBe(false);
});
it('round-trips through serializeProgress', () => {
  const st = mem(); st.setItem(STORAGE_KEY, serializeProgress(demoState(5)));
  expect(loadProgress(st, ALL_NUMS).state).toEqual(demoState(5));
});
```

- [ ] **Step 2: Chạy test, phải fail**

Run: `npx vitest run tests/progress.test.ts tests/progress-storage.test.ts`
Expected: FAIL (thiếu module)

- [ ] **Step 3: Viết `progress.ts` và `progress-storage.ts` theo Interfaces**

`loadProgress` dùng lại `parseProgress` để kiểm giá trị đã lưu.

- [ ] **Step 4: Chạy test, phải pass**

Run: `npx vitest run tests/progress.test.ts tests/progress-storage.test.ts`
Expected: PASS (16 test)

- [ ] **Step 5: Commit**

```bash
git add src/lib/progress.ts src/lib/progress-storage.ts tests/progress.test.ts tests/progress-storage.test.ts
git commit -m "add progress state, import/export and safe storage"
```

---

### Task 5: Kho tiến độ dùng chung giữa các island

**Files:**
- Create: `src/lib/progress-store.ts`, `src/components/islands/use-progress.ts`
- Test: `tests/progress-store.test.ts`

**Interfaces:**
- Consumes: mọi export của Task 4.
- Produces (`src/lib/progress-store.ts`, một bản duy nhất cho mỗi trang):
  - `interface StoreSnapshot { state: ProgressState; previousActiveAt: number | null; problem: LoadProblem }`.
  - `initProgressStore(knownNums: string[], storage: StorageLike | null = safeLocalStorage(), now: number = Date.now()): void`: chỉ chạy lần đầu; đọc kho, giữ `previousActiveAt = state.lastActiveAt` cũ, rồi `touch(now)` và lưu; khi có `window` thì nghe sự kiện `storage` của `STORAGE_KEY` và gọi `handleExternalChange`.
  - `getSnapshot(): StoreSnapshot` (trả cùng một object cho tới khi có thay đổi); `getServerSnapshot(): StoreSnapshot` (hằng số trạng thái trống, `previousActiveAt: null`, `problem: null`); `subscribe(listener: () => void): () => void`.
  - `actions: { markSeen(num: string): void; toggleDone(num: string): void; toggleFlag(num: string): void; importText(text: string): ImportResult; exportText(): string; reset(): void; loadDemo(): void }`: dùng `Date.now()`, lưu ngay, báo listener. `loadDemo` đặt state = `demoState(now)` và `previousActiveAt = state.lastActiveAt`. `importText` lỗi thì không đổi state.
  - `handleExternalChange(newValue: string | null): void`: thay state trong bộ nhớ bằng giá trị tab khác vừa ghi (không ghi đè ngược lại).
  - `__resetStoreForTests(): void`.
- Produces (`use-progress.ts`): `useProgress(knownNums: string[]): StoreSnapshot` = `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`, gọi `initProgressStore(knownNums)` trong `useEffect`.

- [ ] **Step 1: Viết test (đang fail)**

```ts
// tests/progress-store.test.ts
import { it, expect, beforeEach, vi } from 'vitest';
import * as S from '../src/lib/progress-store';
import { STORAGE_KEY, emptyState, serializeProgress, markSeen, statusOf } from '../src/lib/progress';
import { ALL_NUMS } from './helpers/expected';

const mem = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }; };
let st: ReturnType<typeof mem>;
beforeEach(() => { S.__resetStoreForTests(); st = mem(); vi.useFakeTimers(); vi.setSystemTime(10_000); });

it('captures the previous visit time before touching it', () => {
  st.setItem(STORAGE_KEY, serializeProgress({ ...emptyState(), lastActiveAt: 1000 }));
  S.initProgressStore(ALL_NUMS, st, 5000);
  expect([S.getSnapshot().previousActiveAt, S.getSnapshot().state.lastActiveAt]).toEqual([1000, 5000]);
  expect(JSON.parse(st.getItem(STORAGE_KEY)!).lastActiveAt).toBe(5000);
});
it('initialises only once per page', () => {
  S.initProgressStore(ALL_NUMS, st, 5000); S.initProgressStore(ALL_NUMS, st, 9000);
  expect(S.getSnapshot().state.lastActiveAt).toBe(5000);
});
it('persists actions and notifies subscribers with a new snapshot', () => {
  S.initProgressStore(ALL_NUMS, st, 5000);
  const before = S.getSnapshot(); const listener = vi.fn(); S.subscribe(listener);
  S.actions.markSeen('1.1');
  expect(listener).toHaveBeenCalled();
  expect(S.getSnapshot()).not.toBe(before);
  expect(JSON.parse(st.getItem(STORAGE_KEY)!).lessons['1.1'].status).toBe('seen');
});
it('takes the state another tab wrote instead of overwriting it', () => {
  S.initProgressStore(ALL_NUMS, st, 5000);
  S.actions.markSeen('1.1');
  S.handleExternalChange(serializeProgress(markSeen(emptyState(), '2.2', 7000)));
  expect([statusOf(S.getSnapshot().state, '2.2'), statusOf(S.getSnapshot().state, '1.1')]).toEqual(['seen', 'todo']);
});
it('loadDemo shows the demo as a return after 14 days', () => {
  S.initProgressStore(ALL_NUMS, st, 5000);
  S.actions.loadDemo();
  expect(S.getSnapshot().previousActiveAt).toBe(10_000 - 14 * 86_400_000);
});
it('a failed import leaves the state alone', () => {
  S.initProgressStore(ALL_NUMS, st, 5000); S.actions.markSeen('1.1');
  expect(S.actions.importText('abc').ok).toBe(false);
  expect(statusOf(S.getSnapshot().state, '1.1')).toBe('seen');
});
it('reset empties progress; the server snapshot is empty and stable', () => {
  S.initProgressStore(ALL_NUMS, st, 5000); S.actions.markSeen('1.1'); S.actions.reset();
  expect(S.getSnapshot().state.lessons).toEqual({});
  expect(S.getServerSnapshot()).toBe(S.getServerSnapshot());
  expect(S.getServerSnapshot().state).toEqual(emptyState());
});
```

- [ ] **Step 2: Chạy test, phải fail**

Run: `npx vitest run tests/progress-store.test.ts`
Expected: FAIL (thiếu module)

- [ ] **Step 3: Viết `progress-store.ts` và `use-progress.ts` theo Interfaces**

- [ ] **Step 4: Chạy test, phải pass**

Run: `npx vitest run tests/progress-store.test.ts`
Expected: PASS (7 test)

- [ ] **Step 5: Commit**

```bash
git add src/lib/progress-store.ts src/components/islands/use-progress.ts tests/progress-store.test.ts
git commit -m "add the shared progress store for islands"
```

---

### Task 6: Logic lộ trình và nội dung popup

**Files:**
- Create: `src/lib/roadmap.ts`, `src/lib/popup-model.ts`
- Test: `tests/roadmap.test.ts`, `tests/popup-model.test.ts`

**Interfaces:**
- Consumes: `ProgressState`, `statusOf`, `isFlagged`, `countDone`, `demoState` (Task 4); `CatalogEntry`, `compareNum` (Task 3); `LEVELS`, `LevelNo` (Task 3).
- Produces (`roadmap.ts`):
  - `DAY_MS = 86_400_000`; `shouldAutoOpen(previousActiveAt: number | null, now: number): boolean` (đúng khi `null` hoặc đã qua ≥ `DAY_MS`).
  - `resumeTarget(s: ProgressState, catalog: CatalogEntry[]): CatalogEntry | null`: không có `lastLessonNum` → bài đầu tiên chưa Đã học; bài cuối cùng mở chưa Đã học → chính bài đó; đã học rồi → bài chưa Đã học đầu tiên sau nó theo lộ trình, nếu không còn thì bài chưa Đã học đầu tiên từ đầu khóa; học xong hết → `null`.
  - `interface LevelSummary { level: LevelNo; done: number; total: number; flags: number; state: 'done' | 'current' | 'partial' | 'todo' }`; `levelSummaries(s, catalog, currentLevel: LevelNo | null): LevelSummary[]` (`current` nếu là `currentLevel`; còn lại `done` khi đủ, `partial` khi có ít nhất một bài, `todo` khi chưa có).
  - `firstFlagged(s, catalog): CatalogEntry | null` (bài có cờ sớm nhất theo lộ trình).
  - `formatLastVisit(prev: number, now: number): string`: so theo ngày lịch giờ máy; 0 ngày → `Hôm nay`; 1 ngày → `Hôm qua (<thứ>, <ngày>/<tháng>)`; n ngày → `Cách đây <n> ngày (<thứ>, <ngày>/<tháng>)`. Thứ: `Chủ nhật`, `thứ Hai`, `thứ Ba`, `thứ Tư`, `thứ Năm`, `thứ Sáu`, `thứ Bảy`.
- Produces (`popup-model.ts`):
  - `interface PopupModel { title: string; sub: string; cta: { label: string; sublabel: string; slug: string } | null; flag: { label: string; slug: string } | null; introLink: boolean; levels: LevelSummary[]; expandedLevel: LevelNo }`.
  - `popupModel(s: ProgressState, previousActiveAt: number | null, catalog: CatalogEntry[], now: number): PopupModel`. Ba dạng, chữ cố định:
    - Lần đầu (`lastLessonNum === null` và chưa có bài nào Đã học): title `Chào bạn`; sub `Khóa học có <số level> level, <số bài> bài. Cứ học lần lượt từ bài <num bài đầu>.`; cta `Bắt đầu bài <num> →` (sublabel = title bài); `introLink: true`; `expandedLevel: 1`.
    - Quay lại: title `Lần trước bạn dừng ở bài <lastLessonNum>`; sub `<formatLastVisit>. Đã học <done>/<tổng> bài.` (không có `previousActiveAt` thì chỉ `Đã học <done>/<tổng> bài.`); cta `Học tiếp bài <num của resumeTarget> →`; flag `Xem lại bài <num> bạn đã cắm cờ` (chỉ khi có và khác bài của cta); `expandedLevel` = level của bài cta.
    - Học xong hết: title `Bạn đã học xong cả <tổng> bài`; sub `Muốn ôn lại bài nào thì bấm vào trạm của level đó.`; cta `null`; `expandedLevel: 6`.
    - `levels = levelSummaries(s, catalog, <level của cta, hoặc null khi học xong hết>)`.

- [ ] **Step 1: Viết test (đang fail)**

```ts
// tests/roadmap.test.ts
import { it, expect } from 'vitest';
import * as R from '../src/lib/roadmap';
import { emptyState, demoState, markSeen, toggleDone } from '../src/lib/progress';
import { fakeCatalog, ALL_NUMS } from './helpers/expected';

const NOW = new Date(2026, 9, 17, 9, 0).getTime();
const CAT = fakeCatalog();
const doneAll = (nums: string[]) => nums.reduce((s, n) => toggleDone(markSeen(s, n, NOW), n, NOW), emptyState());

it('auto-opens on the first visit and after 24 hours, not before', () => {
  expect([R.shouldAutoOpen(null, NOW), R.shouldAutoOpen(NOW - R.DAY_MS, NOW), R.shouldAutoOpen(NOW - R.DAY_MS + 1, NOW)]).toEqual([true, true, false]);
});
it('picks the lesson to resume', () => {
  expect(R.resumeTarget(emptyState(), CAT)?.num).toBe('1.1');
  expect(R.resumeTarget(demoState(NOW), CAT)?.num).toBe('3.5');
  expect(R.resumeTarget(doneAll(['3.4']), CAT)?.num).toBe('3.5');
  expect(R.resumeTarget(doneAll(['6.7']), CAT)?.num).toBe('1.1');
  expect(R.resumeTarget(doneAll(ALL_NUMS), CAT)).toBeNull();
});
it('summarises levels like the mockup', () => {
  expect(R.levelSummaries(demoState(NOW), CAT, 3)).toEqual([
    { level: 1, done: 6, total: 6, flags: 0, state: 'done' },
    { level: 2, done: 8, total: 9, flags: 1, state: 'partial' },
    { level: 3, done: 4, total: 10, flags: 0, state: 'current' },
    { level: 4, done: 0, total: 10, flags: 0, state: 'todo' },
    { level: 5, done: 0, total: 9, flags: 0, state: 'todo' },
    { level: 6, done: 0, total: 7, flags: 0, state: 'todo' },
  ]);
});
it('finds the earliest flagged lesson', () => expect(R.firstFlagged(demoState(NOW), CAT)?.num).toBe('2.8'));
it('formats the last visit in Vietnamese', () => {
  expect(R.formatLastVisit(new Date(2026, 9, 3, 20, 0).getTime(), NOW)).toBe('Cách đây 14 ngày (thứ Bảy, 3/10)');
  expect(R.formatLastVisit(new Date(2026, 9, 16, 23, 30).getTime(), NOW)).toBe('Hôm qua (thứ Sáu, 16/10)');
  expect(R.formatLastVisit(new Date(2026, 9, 17, 7, 0).getTime(), NOW)).toBe('Hôm nay');
});
```
```ts
// tests/popup-model.test.ts
import { it, expect } from 'vitest';
import { popupModel } from '../src/lib/popup-model';
import { emptyState, demoState, markSeen, toggleDone } from '../src/lib/progress';
import { fakeCatalog, ALL_NUMS } from './helpers/expected';

const NOW = new Date(2026, 9, 17, 9, 0).getTime();
const CAT = fakeCatalog();

it('greets a first-time visitor', () => {
  const m = popupModel(emptyState(), null, CAT, NOW);
  expect([m.title, m.sub, m.cta?.label, m.cta?.sublabel, m.introLink, m.expandedLevel, m.flag])
    .toEqual(['Chào bạn', 'Khóa học có 6 level, 51 bài. Cứ học lần lượt từ bài 1.1.', 'Bắt đầu bài 1.1 →', '1.1', true, 1, null]);
});
it('welcomes back with the mockup texts', () => {
  const s = demoState(NOW);
  const m = popupModel(s, s.lastActiveAt, CAT, NOW);
  expect([m.title, m.sub, m.cta?.label, m.flag?.label, m.introLink, m.expandedLevel]).toEqual([
    'Lần trước bạn dừng ở bài 3.5', 'Cách đây 14 ngày (thứ Bảy, 3/10). Đã học 18/51 bài.',
    'Học tiếp bài 3.5 →', 'Xem lại bài 2.8 bạn đã cắm cờ', false, 3,
  ]);
  expect(m.levels[2].state).toBe('current');
});
it('omits the date when the previous visit is unknown', () => {
  expect(popupModel(demoState(NOW), null, CAT, NOW).sub).toBe('Đã học 18/51 bài.');
});
it('congratulates when everything is done', () => {
  const s = ALL_NUMS.reduce((acc, n) => toggleDone(markSeen(acc, n, NOW), n, NOW), emptyState());
  const m = popupModel(s, NOW - 3 * 86_400_000, CAT, NOW);
  expect([m.title, m.sub, m.cta, m.expandedLevel]).toEqual(['Bạn đã học xong cả 51 bài', 'Muốn ôn lại bài nào thì bấm vào trạm của level đó.', null, 6]);
});
```

- [ ] **Step 2: Chạy test, phải fail**

Run: `npx vitest run tests/roadmap.test.ts tests/popup-model.test.ts`
Expected: FAIL (thiếu module)

- [ ] **Step 3: Viết `roadmap.ts` và `popup-model.ts` theo Interfaces**

- [ ] **Step 4: Chạy test, phải pass**

Run: `npx vitest run tests/roadmap.test.ts tests/popup-model.test.ts`
Expected: PASS (9 test)

- [ ] **Step 5: Commit**

```bash
git add src/lib/roadmap.ts src/lib/popup-model.ts tests/roadmap.test.ts tests/popup-model.test.ts
git commit -m "add roadmap rules and the popup model"
```

---

### Task 7: Tô màu T-SQL và các thành phần bài học

Trước khi làm task này: nạp skill `frontend-design` (Global Constraints), đọc mockup `lesson-page.html`.

**Files:**
- Create: `src/lib/tsql-highlight.ts`, `src/components/lesson/Excel.astro`, `Sql.astro`, `Result.astro`, `Messages.astro`, `Chat.astro`, `Key.astro`, `LineMap.astro`, `Mistakes.astro`, `Apply.astro`, `Memo.astro`, `Exercises.astro`, `src/components/lesson/index.ts`, `src/styles/tokens.css`, `src/styles/lesson.css`
- Modify: `tests/content.test.ts` (thêm kiểm tiền tố `N` cho câu SQL trong bài)
- Test: `tests/tsql-highlight.test.ts`, `tests/components.test.ts`

**Interfaces:**
- Consumes: `lexTsql`, `findUnprefixedUnicodeStrings` (Task 2); `readLessonFiles` (Task 3).
- Produces:
  - `type TokenKind = 'keyword' | 'gray' | 'function' | 'string' | 'comment' | 'plain'`; `highlightTsql(code: string): { text: string; kind: TokenKind }[]` dựng trên `lexTsql`. So khớp không phân biệt hoa thường:
    - `keyword` (xanh dương `#0000FF`): `SELECT FROM WHERE AS ON GROUP BY ORDER HAVING TOP DISTINCT INSERT INTO VALUES UPDATE SET DELETE CREATE ALTER DROP TABLE VIEW PROCEDURE PROC FUNCTION TRIGGER INDEX PRIMARY KEY FOREIGN REFERENCES CONSTRAINT DEFAULT CHECK UNIQUE CLUSTERED NONCLUSTERED BEGIN END TRAN TRANSACTION COMMIT ROLLBACK SAVE DECLARE EXEC EXECUTE RETURN IF ELSE WHILE CASE WHEN THEN WITH UNION EXCEPT INTERSECT OVER PARTITION ASC DESC OUTPUT USE PIVOT UNPIVOT FOR SYSTEM_TIME OF OFFSET FETCH NEXT ROWS ROW ONLY INT BIGINT SMALLINT TINYINT DECIMAL NUMERIC MONEY FLOAT NVARCHAR VARCHAR NCHAR CHAR DATE DATETIME DATETIME2 TIME BIT IDENTITY`.
    - `gray` (`#808080`): `AND OR NOT IS NULL IN LIKE BETWEEN EXISTS ALL ANY SOME JOIN INNER LEFT RIGHT FULL OUTER CROSS APPLY` và mọi token `symbol` trừ dấu `.`.
    - `function` (`#FF00FF`): `GETDATE SYSDATETIME DATEDIFF DATEADD EOMONTH DATEPART DATENAME YEAR MONTH DAY FORMAT ISNULL COALESCE NULLIF CAST CONVERT COUNT SUM AVG MIN MAX LEN SUBSTRING CONCAT TRIM LTRIM RTRIM UPPER LOWER REPLACE ROUND ROW_NUMBER RANK DENSE_RANK LAG LEAD STRING_AGG IIF @@ROWCOUNT @@TRANCOUNT @@ERROR`; riêng `LEFT`/`RIGHT` là `function` khi token không phải khoảng trắng kế tiếp là `(`.
    - `string` (`#FF0000`), `comment` (`#008000`), còn lại `plain`.
  - Props (TypeScript `Props` trong frontmatter mỗi component):
    - `Excel`: `{ rows: (string | number)[][]; cell?: string; formula?: string; sheets?: string; selected?: string }`. Dòng đầu in đậm; tên cột A, B, C…; số dòng từ 1; ô có giá trị khớp `/^#(N\/A|VALUE!|REF!|DIV\/0!|NAME\?|NUM!|NULL!)$/` có class `xl-err` (nền `#FFC7CE`, chữ `#9C0006`); ô `selected` (ví dụ `D5`) có class `xl-sel`; dải đầu `#107C41` ghi `Excel` và `sheets`; thanh công thức hiện `cell`, `fx`, `formula`.
    - `Sql`: `{ code: string; title?: string }` (mặc định `SQL Server`): bỏ dòng trống đầu và cuối của `code`, mỗi token một `<span class="t-<kind>">`; nút `<button type="button" class="sql-copy" data-copy="<code>">Sao chép</button>`, script đi kèm chép vào clipboard và đổi chữ thành `Đã chép` trong 1,5 giây.
    - `Result`: `{ columns: string[]; rows: (string | number | null)[][]; db?: string; total?: number }` (`db` mặc định `HRM_Demo`). Tab `Results` (đang chọn) và `Messages`; cột số thứ tự; ô `null` hiện `NULL` với class `res-null` (nền `#FFFFE1`); dòng trạng thái `✓ Query executed successfully.` · `<db>` · `<total ?? rows.length> rows`; khi `total > rows.length` thêm dòng `Trích <rows.length> dòng (kết quả có <total> dòng)`.
    - `Messages`: `{ lines: string[]; db?: string }`: tab `Messages` đang chọn, in từng dòng (ví dụ `(96 rows affected)`).
    - `Chat`: `{ who: string; time?: string; initial?: string }` + slot (bong bóng tin nhắn).
    - `Key`: slot (khung "nói gọn lại").
    - `LineMap`: `{ rows: [string, string][] }` (dòng lệnh, ý nghĩa).
    - `Mistakes`, `Apply`: slot (khung "Hay nhầm" màu hổ phách nhạt, khung "Ứng dụng" màu xanh nhạt).
    - `Memo`: `{ rows: [string, string][] }`, hai cột tiêu đề `Bên Excel` và `Bên SQL`, cột hai in dạng code.
    - `Exercises`: không props, in `Phần bài tập sẽ bổ sung sau.`
  - `index.ts`: `export const lessonComponents = { Excel, Sql, Result, Messages, Chat, Key, LineMap, Mistakes, Apply, Memo, Exercises }`.
  - `tokens.css`: biến CSS cho mọi màu ở Global Constraints. `lesson.css`: kiểu cho các component trên và phần chữ trong bài (Literata 16,5px, dòng 1,7), theo mockup.

- [ ] **Step 1: Viết test (đang fail)**

```ts
// tests/tsql-highlight.test.ts
import { it, expect } from 'vitest';
import { highlightTsql } from '../src/lib/tsql-highlight';

const kinds = (code: string) => highlightTsql(code).filter(t => t.text.trim()).map(t => `${t.text}|${t.kind}`);

it('colours a LEFT JOIN query like SSMS', () => {
  expect(kinds('SELECT nv.MaNV FROM NhanVien AS nv LEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV WHERE hd.MaHD IS NULL; -- dò không ra')).toEqual([
    'SELECT|keyword', 'nv|plain', '.|plain', 'MaNV|plain', 'FROM|keyword', 'NhanVien|plain', 'AS|keyword', 'nv|plain',
    'LEFT|gray', 'JOIN|gray', 'HopDong|plain', 'AS|keyword', 'hd|plain', 'ON|keyword', 'hd|plain', '.|plain', 'MaNV|plain',
    '=|gray', 'nv|plain', '.|plain', 'MaNV|plain', 'WHERE|keyword', 'hd|plain', '.|plain', 'MaHD|plain', 'IS|gray', 'NULL|gray',
    ';|gray', '-- dò không ra|comment',
  ]);
});
it('treats LEFT( as a function', () => {
  expect(kinds('LEFT(HoTen, 3)')).toEqual(['LEFT|function', '(|gray', 'HoTen|plain', ',|gray', '3|plain', ')|gray']);
});
it('colours strings, aggregates, system variables and block comments', () => {
  expect(kinds("SELECT N'Kế toán', 'it''s'")).toEqual(['SELECT|keyword', "N'Kế toán'|string", ',|gray', "'it''s'|string"]);
  expect(kinds('SELECT COUNT(*) FROM BangLuong')).toEqual(['SELECT|keyword', 'COUNT|function', '(|gray', '*|gray', ')|gray', 'FROM|keyword', 'BangLuong|plain']);
  expect(kinds('SELECT @@ROWCOUNT /* số dòng */')).toEqual(['SELECT|keyword', '@@ROWCOUNT|function', '/* số dòng */|comment']);
});
it('keeps every character', () => {
  const code = 'SELECT TOP (5) *\r\nFROM NhanVien\r\nORDER BY MaNV;';
  expect(highlightTsql(code).map(t => t.text).join('')).toBe(code);
});
```
```ts
// tests/components.test.ts
import { it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Result from '../src/components/lesson/Result.astro';
import Messages from '../src/components/lesson/Messages.astro';
import Excel from '../src/components/lesson/Excel.astro';
import Sql from '../src/components/lesson/Sql.astro';
import Memo from '../src/components/lesson/Memo.astro';
import Exercises from '../src/components/lesson/Exercises.astro';

let c: AstroContainer;
beforeAll(async () => { c = await AstroContainer.create(); });

it('Result shows NULL cells in the SSMS style and says how many rows were trimmed', async () => {
  const html = await c.renderToString(Result, { props: { columns: ['MaNV', 'MaHD'], rows: [['NV001', 'HD2024-018'], ['NV047', null]], total: 52 } });
  expect(html).toMatch(/class="[^"]*res-null[^"]*"[^>]*>NULL</);
  for (const s of ['52 rows', 'Trích 2 dòng (kết quả có 52 dòng)', 'HRM_Demo', 'Query executed successfully.']) expect(html).toContain(s);
});
it('Messages prints its lines', async () => {
  expect(await c.renderToString(Messages, { props: { lines: ['(96 rows affected)'] } })).toContain('(96 rows affected)');
});
it('Excel labels columns, marks error values and the selected cell', async () => {
  const html = await c.renderToString(Excel, { props: { cell: 'D3', formula: '=VLOOKUP(A3,HopDong!A:B,2,FALSE)', selected: 'D3',
    rows: [['Mã NV', 'Họ tên', 'Phòng ban', 'Mã HĐ (dò)'], ['NV001', 'Trần Thị Mai', 'Kế toán', 'HD2024-018'], ['NV047', 'Phạm Ngọc Ánh', 'Nhân sự', '#N/A']] } });
  expect(html).toMatch(/>A</); expect(html).toMatch(/>D</);
  expect(html).toMatch(/class="[^"]*xl-err[^"]*"[^>]*>#N\/A</);
  expect((html.match(/xl-sel/g) ?? []).length).toBe(1);
  expect(html).toContain('=VLOOKUP(A3,HopDong!A:B,2,FALSE)');
});
it('Sql highlights keywords and keeps the raw code for copying', async () => {
  const html = await c.renderToString(Sql, { props: { code: '\nSELECT 1;\n' } });
  expect(html).toContain('<span class="t-keyword">SELECT</span>');
  expect(html).toContain('data-copy="SELECT 1;"');
  expect(html).toContain('Sao chép');
});
it('Memo and Exercises use the fixed copy', async () => {
  const memo = await c.renderToString(Memo, { props: { rows: [['VLOOKUP dò theo mã', 'LEFT JOIN … ON']] } });
  expect(memo).toContain('Bên Excel'); expect(memo).toContain('Bên SQL');
  expect(await c.renderToString(Exercises)).toContain('Phần bài tập sẽ bổ sung sau.');
});
```
Thêm vào `describe('lesson files')` trong `tests/content.test.ts`:
```ts
it('every Vietnamese string in lesson SQL has the N prefix', () => {
  for (const f of files) for (const m of f.body.matchAll(/<Sql[^>]*code=\{`([\s\S]*?)`\}/g)) {
    expect(findUnprefixedUnicodeStrings(m[1]), f.slug).toEqual([]);
  }
});
```
(import `findUnprefixedUnicodeStrings` từ `../src/lib/tsql-lexer`)

- [ ] **Step 2: Chạy test, phải fail**

Run: `npx vitest run tests/tsql-highlight.test.ts tests/components.test.ts`
Expected: FAIL (thiếu module, thiếu component)

- [ ] **Step 3: Viết `tsql-highlight.ts`, 11 component, `index.ts`, `tokens.css`, `lesson.css` theo Interfaces**

- [ ] **Step 4: Chạy toàn bộ test, phải pass**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/tsql-highlight.ts src/components/lesson src/styles tests
git commit -m "add SSMS-style SQL highlighting and lesson components"
```

---

### Task 8: Trang bài học (khung 3 cột, sidebar, trạng thái bài)

**Files:**
- Create: `src/lib/events.ts`, `src/layouts/BaseLayout.astro`, `src/layouts/LessonLayout.astro`, `src/components/layout/TopBar.astro`, `src/components/layout/NarrowNotice.astro`, `src/components/lesson/LessonHeader.astro`, `src/components/islands/StatusIcon.tsx`, `SidebarNav.tsx`, `TopProgress.tsx`, `LessonStatus.tsx`, `src/pages/bai/[slug].astro`, `src/styles/base.css`
- Modify: `src/pages/index.astro` (dùng `BaseLayout`), `tests/components.test.ts`
- Tạo, không commit: `.claude/launch.json`

**Interfaces:**
- Consumes: `loadCatalog`, `neighbors`, `LEVELS` (Task 3); `useProgress`, `actions` (Task 5); `iconOf`, `statusOf`, `countDone` (Task 4); `lessonComponents` (Task 7); `withBase`, `lessonUrl` (Task 1).
- Produces:
  - `src/lib/events.ts`: `EVENTS = { openRoadmap: 'roadmap:open', openSearch: 'search:open' } as const`; `emit(name: (typeof EVENTS)[keyof typeof EVENTS]): void` (phát `CustomEvent` trên `window`).
  - `BaseLayout.astro` props `{ title: string; wide?: boolean }`: tự gọi `loadCatalog()`; `<html lang="vi">`; nạp font (@fontsource: Be Vietnam Pro 400/500/600/700, Literata 400/600/400-italic, JetBrains Mono 400/500), `tokens.css`, `base.css`, `lesson.css`; `TopBar`; `NarrowNotice`; `<slot />`. Task 9–12 gắn thêm island vào layout này.
  - `TopBar.astro` props `{ catalog: CatalogEntry[] }`: tên trang `SQL Server` (link `withBase('/')`); nút tìm kiếm ghi `Tìm bài, từ khóa…` kèm `Ctrl K` (`data-action="search"`, Task 12 nối sự kiện); nút `Lộ trình` (script nhỏ gọi `emit(EVENTS.openRoadmap)`); link `Mindmap` (`withBase('/')`); link `Giới thiệu` (`withBase('/gioi-thieu/')`); island `TopProgress` (`client:load`, props `{ nums }`) hiện `<done>/<total>` và thanh tiến độ.
  - `NarrowNotice.astro`: dải hiện khi màn hình hẹp hơn 1024px, chữ `Trang được thiết kế cho máy tính.`
  - `LessonHeader.astro` props `{ entry: CatalogEntry; level: LevelDef; prerequisites: CatalogEntry[] }`: nhãn `Level <no> · <name>`, `Bài <num>`, chip `Bản tóm tắt` khi `kind === 'summary'`, tiêu đề, `Khoảng <minutes> phút` chỉ khi `kind === 'full'`, `Cần biết trước:` + link `<num> <shortTitle>` (ẩn khi rỗng), khung `Học xong bài này: <goal>`.
  - `StatusIcon.tsx` props `{ icon: Icon }`: `<span class="st st-<icon>" aria-label="<Chưa học|Đã xem|Đã học|Cần xem lại>">`.
  - `SidebarNav.tsx` (`client:load`) props `{ catalog: CatalogEntry[]; levels: LevelDef[]; currentNum: string }`: 6 level, mỗi level có `<done>/<total>` (thêm ` · <n> cờ` khi có cờ); level chứa bài đang xem mở sẵn, level khác bấm để mở; mỗi bài có `StatusIcon`, `num`, `shortTitle`, link `lessonUrl(slug)`; bài đang xem tô nền nhạt.
  - `LessonStatus.tsx` (`client:load`) props `{ num: string; nums: string[]; variant: 'rail' | 'footer' }`:
    - `rail` gọi `actions.markSeen(num)` khi mount; hiện `Trạng thái bài`, `StatusIcon` + nhãn (`Chưa học` / `Đã xem` / `Đã học`), dòng `Tự đánh dấu khi bạn mở bài.` khi đang Đã xem, hai nút như `footer`.
    - `footer`: nút `Đã học xong bài này` (khi đã học: nhãn `Đã học xong` và nút nhỏ `Bỏ đánh dấu`); nút `Cắm cờ xem lại` (khi có cờ: `Bỏ cờ`); dòng gợi ý `Bấm khi bạn tự viết lại được câu lệnh mà không nhìn bài.`
  - `[slug].astro`: `getStaticPaths` từ `getCollection('lessons')`; `render(entry)` → `Content`, `headings`; `<Content components={lessonComponents} />`; cột trái `SidebarNav`; cột phải `Trong bài này` (các heading cấp 2, link `#<slug>`) + `LessonStatus variant="rail"`; cuối bài `LessonStatus variant="footer"` và hai thẻ `← Bài trước` / `Bài sau →` từ `neighbors`. Tiêu đề tab `<num> <title> · SQL Server`.
  - `.claude/launch.json`: cấu hình `site-dev` (`runtimeExecutable: "npm"`, `runtimeArgs: ["run", "dev"]`, `port: 4321`) và `site-preview` (`["run", "preview"]`, `port: 4321`).

- [ ] **Step 1: Viết test (đang fail)**

Thêm vào `tests/components.test.ts`:
```ts
import LessonHeader from '../src/components/lesson/LessonHeader.astro';
import { LEVELS } from '../src/data/curriculum';
import { fakeCatalog } from './helpers/expected';

it('LessonHeader of a summary lesson shows level, number, goal and the chip, but no minutes', async () => {
  const [first, second] = fakeCatalog();
  const entry = { ...second, title: 'SQL Server, SSMS và database mẫu HRM_Demo', kind: 'summary' as const, minutes: 10, goal: 'mở được database mẫu', prerequisites: ['1.1'] };
  const html = await c.renderToString(LessonHeader, { props: { entry, level: LEVELS[0], prerequisites: [first] } });
  for (const s of ['Level 1 · Làm quen', 'Bài 1.2', 'Bản tóm tắt', 'Học xong bài này:', 'mở được database mẫu', 'Cần biết trước']) expect(html).toContain(s);
  expect(html).not.toContain('Khoảng 10 phút');
});
it('LessonHeader of a full lesson shows minutes and no chip', async () => {
  const entry = { ...fakeCatalog()[0], kind: 'full' as const, minutes: 12, prerequisites: [] };
  const html = await c.renderToString(LessonHeader, { props: { entry, level: LEVELS[0], prerequisites: [] } });
  expect(html).toContain('Khoảng 12 phút');
  expect(html).not.toContain('Bản tóm tắt');
  expect(html).not.toContain('Cần biết trước');
});
```

- [ ] **Step 2: Chạy test, phải fail**

Run: `npx vitest run tests/components.test.ts`
Expected: FAIL (thiếu `LessonHeader.astro`)

- [ ] **Step 3: Viết các file của task theo Interfaces, bố cục theo mockup `lesson-page.html`**

- [ ] **Step 4: Chạy test, build và kiểm đầu ra**

Run: `npx vitest run && npm run build && npm run check:dist`
Expected: test PASS; `check-dist: OK (52 trang, …)` (trang chủ + 51 trang bài)

- [ ] **Step 5: Xem trên trình duyệt**

Tạo `.claude/launch.json`, mở bằng `preview_start` tên `site-dev`, vào `http://localhost:4321/microsoft-sql-lession/bai/3-5-left-join/`.
Expected: sidebar mở sẵn Level 3, bài 3.5 tô nền; ô "Trạng thái bài" thành `Đã xem` sau khi tải; bấm `Đã học xong bài này` thì sidebar hiện tick xanh lá cho 3.5 và thanh trên cùng thành `1/51`; tải lại trang vẫn giữ nguyên.

- [ ] **Step 6: Commit**

```bash
git add src tests
git commit -m "add the lesson page with sidebar, rail and status buttons"
```

---

### Task 9: Popup "Lộ trình của bạn"

**Files:**
- Create: `src/components/islands/RoadmapPopup.tsx`, `src/styles/islands.css`
- Modify: `src/layouts/BaseLayout.astro` (gắn `<RoadmapPopup client:only="react" catalog={catalog} levels={LEVELS} />`, nạp `islands.css`)

**Interfaces:**
- Consumes: `popupModel` (Task 6), `shouldAutoOpen` (Task 6), `initProgressStore`, `getSnapshot`, `useProgress` (Task 5), `EVENTS.openRoadmap` (Task 8), `StatusIcon` (Task 8), `lessonUrl`, `withBase` (Task 1).
- Produces: `RoadmapPopup` props `{ catalog: CatalogEntry[]; levels: LevelDef[] }`.
  - Khi mount: gọi `initProgressStore(nums)` đồng bộ, rồi nếu `shouldAutoOpen(getSnapshot().previousActiveAt, Date.now())` thì mở (một lần mỗi lần tải trang). Mở thêm khi nhận sự kiện `roadmap:open`.
  - Bố cục theo mockup `roadmap-popup.html` phương án B: kicker `Lộ trình của bạn`; `title`, `sub` từ `popupModel`; nút lớn `cta.label` + `cta.sublabel` (link `lessonUrl(cta.slug)`); dòng `flag.label` (link tới bài có cờ); khi `introLink` thì có link `Đọc giới thiệu khóa học` (`withBase('/gioi-thieu/')`); 6 trạm theo `levels` (trạm `done` tô xanh lá có tick, `current` viền xanh dương, còn lại xám; dưới trạm là tên level và `<done>/<total>`, thêm ` · <n> cờ`); khung mở rộng của level đang chọn (mặc định `expandedLevel`): `Level <no> · <name>`, `Học xong level này: <outcome>`, danh sách bài chia 2 cột theo cột dọc, mỗi bài có `StatusIcon`, `num`, `title`, bài của `cta` tô nền nhạt; dòng gợi ý `Bấm vào một trạm để xem các bài trong level đó`; chân popup: chú thích 4 trạng thái, nút `Mở mindmap` (`withBase('/')`), nút `Đóng`.
  - Bấm trạm thì đổi level mở rộng. Đóng bằng `Đóng`, phím Esc, hoặc bấm nền tối. `role="dialog"`, `aria-modal="true"`, `aria-labelledby` trỏ vào title; khi mở thì đưa focus vào popup, khi đóng thì trả focus về chỗ cũ.

- [ ] **Step 1: Viết `RoadmapPopup.tsx` và phần CSS của popup trong `islands.css` theo Interfaces**

- [ ] **Step 2: Build và chạy toàn bộ test**

Run: `npx vitest run && npm run build && npm run check:dist`
Expected: PASS, `check-dist: OK`

- [ ] **Step 3: Xem trên trình duyệt (dev server `site-dev`)**

Xóa `localStorage` của trang (qua công cụ JavaScript của trình duyệt), tải lại `http://localhost:4321/microsoft-sql-lession/`.
Expected: popup tự hiện với `Chào bạn`, `Khóa học có 6 level, 51 bài. Cứ học lần lượt từ bài 1.1.`, nút `Bắt đầu bài 1.1 →`, Level 1 mở rộng; Esc đóng popup; tải lại ngay thì popup không tự hiện; bấm `Lộ trình` trên thanh trên cùng thì popup mở lại; bấm trạm 4 thì danh sách đổi sang bài Level 4.

- [ ] **Step 4: Commit**

```bash
git add src
git commit -m "add the roadmap popup"
```

---

### Task 10: Menu tiến độ và thông báo lưu trữ

**Files:**
- Create: `src/components/islands/ProgressMenu.tsx`
- Modify: `src/components/layout/TopBar.astro` (gắn `<ProgressMenu client:load nums={nums} />` cạnh thanh tiến độ), `src/styles/islands.css`

**Interfaces:**
- Consumes: `actions`, `useProgress` (Task 5); `exportFileName` (Task 4); `emit`, `EVENTS` (Task 8).
- Produces: `ProgressMenu` props `{ nums: string[] }`. Nút `Tiến độ` mở danh sách:
  - `Xuất tiến độ ra file`: tải file JSON từ `actions.exportText()`, tên `exportFileName(Date.now())`.
  - `Nhập tiến độ từ file`: chọn file, hỏi `Tiến độ hiện tại sẽ bị thay bằng nội dung trong file. Tiếp tục?`; gọi `actions.importText`; thành công thì báo `Đã nhập tiến độ.` (thêm ` Bỏ qua <n> bài không còn trong khóa học.` khi `ignored > 0`); lỗi thì báo đúng `error`.
  - `Xem thử với tiến độ mẫu`: hỏi `Tiến độ mẫu sẽ thay tiến độ hiện tại. Nếu đang học thật, hãy xuất tiến độ ra file trước. Tiếp tục?`; gọi `actions.loadDemo()` rồi `emit(EVENTS.openRoadmap)`.
  - `Xóa toàn bộ tiến độ`: hỏi `Xóa toàn bộ tiến độ? Thao tác này không hoàn tác được.`; gọi `actions.reset()`.
  - Dải thông báo dưới thanh trên cùng theo `problem`: `unavailable` → `Trình duyệt đang chặn lưu dữ liệu nên tiến độ sẽ mất khi đóng trang. Hãy xuất tiến độ ra file trước khi đóng.`; `corrupt` → `Không đọc được tiến độ đã lưu. Bản cũ vẫn được giữ lại trong trình duyệt; nếu có file đã xuất, hãy nhập lại.`

- [ ] **Step 1: Viết `ProgressMenu.tsx` và CSS theo Interfaces**

- [ ] **Step 2: Build và chạy toàn bộ test**

Run: `npx vitest run && npm run build && npm run check:dist`
Expected: PASS, `check-dist: OK`

- [ ] **Step 3: Xem trên trình duyệt (dev server `site-dev`)**

Expected:
- `Xem thử với tiến độ mẫu` → popup hiện `Lần trước bạn dừng ở bài 3.5`, `Cách đây 14 ngày (<thứ>, <ngày>/<tháng>). Đã học 18/51 bài.`, trạm 1 có tick, trạm 2 ghi `8/9 · 1 cờ`, Level 3 mở rộng với 3.5 tô nền, dòng `Xem lại bài 2.8 bạn đã cắm cờ`; thanh trên cùng `18/51`.
- `Xóa toàn bộ tiến độ` → `0/51`.
- Nhập một file chữ không phải JSON → báo `File không phải JSON hợp lệ.`
- Nút xuất: nếu môi trường kiểm hỏi quyền tải file thì hỏi người dùng hoặc bỏ qua cú bấm này (đã có test cho xuất/nhập).
- Đặt giá trị `localStorage` của `sqlserver-course:progress:v1` thành `{hỏng` rồi tải lại → hiện dải thông báo `Không đọc được tiến độ đã lưu…`, khóa `sqlserver-course:progress:corrupt-backup` giữ `{hỏng`.

- [ ] **Step 4: Commit**

```bash
git add src
git commit -m "add progress export, import, demo mode and storage notices"
```

---

### Task 11: Mindmap và trang chủ

**Files:**
- Create: `src/lib/mindmap-layout.ts`, `src/components/islands/MindMap.tsx`
- Modify: `src/pages/index.astro`, `src/styles/islands.css`
- Test: `tests/mindmap-layout.test.ts`

**Interfaces:**
- Consumes: `AREAS`, `AreaDef`, `AreaId`, `LEVELS`, `compareNum`, `CatalogEntry` (Task 3); `useProgress`, `iconOf`, `countDone` (Task 4–5); `resumeTarget` (Task 6); `StatusIcon` (Task 8); `lessonUrl` (Task 1).
- Produces:
  - `SIZES = { rootW: 190, rootH: 58, areaW: 214, areaH: 52, leafW: 236, leafH: 30, leafGap: 6, groupGap: 18, gapRootArea: 90, gapAreaLeaf: 44 }`.
  - `interface MapNode { id: string; kind: 'root' | 'area' | 'lesson'; x: number; y: number; width: number; height: number; side?: 'left' | 'right'; areaId?: AreaId; num?: string }` (x, y là góc trên trái, như React Flow); `interface MapEdge { id: string; source: string; target: string }`.
  - `layoutMindmap(areas: AreaDef[], catalog: CatalogEntry[], expanded: ReadonlySet<AreaId>): { nodes: MapNode[]; edges: MapEdge[] }`. Id: `root`, `area:<id>`, `lesson:<num>`; edge `e:root-<areaId>`, `e:<areaId>-<num>`. Gốc có tâm ở (0, 0). Nhánh bên phải: `x = rootW / 2 + gapRootArea`, lá: `x = areaX + areaW + gapAreaLeaf`. Nhánh bên trái đối xứng: `x + areaW = -(rootW / 2 + gapRootArea)`, lá: `x + leafW = areaX - gapAreaLeaf`. Mỗi bên xếp từ trên xuống theo `order`: nhánh đóng chiếm `areaH`; nhánh mở chiếm chiều cao các lá của nó (`leafH`, cách nhau `leafGap`), nhánh nằm giữa lá đầu và lá cuối; các nhóm cách nhau `groupGap`; cả khối mỗi bên căn giữa theo trục y = 0. Lá trong nhánh xếp theo `compareNum`.
  - `MindMap.tsx` (`client:only="react"`) props `{ catalog: CatalogEntry[]; areas: AreaDef[]; levels: LevelDef[] }`: React Flow (`@xyflow/react`, nạp `@xyflow/react/dist/style.css`) với 3 kiểu node tự viết: gốc ghi `SQL Server`; nhánh ghi tên mảng, thanh tiến độ, `<done>/<total>`, ` · <n> cờ`, nút `+`/`−` ở phía ngoài; lá ghi `StatusIcon`, `num`, `shortTitle`, nhãn `L<level>` theo màu level, bài của `resumeTarget` tô nền nhạt. Handle đặt theo `side` (bên phải: vào bên trái, ra bên phải; bên trái ngược lại). Ban đầu mở nhánh chứa `resumeTarget` (không có thì A1). Không kéo node được, kéo nền và zoom được. Thanh công cụ: `Mở hết`, `Thu gọn`, `Về giữa` (`fitView`), chú thích 4 trạng thái và nhãn L1–L6. Bấm nhánh thì mở/đóng; bấm lá thì đi tới `lessonUrl(slug)`.
  - `index.astro`: `BaseLayout` với `title="SQL Server"`, `wide`; vùng mindmap chiếm hết chiều cao dưới thanh trên cùng.

- [ ] **Step 1: Viết test (đang fail)**

```ts
// tests/mindmap-layout.test.ts
import { it, expect } from 'vitest';
import { layoutMindmap, SIZES } from '../src/lib/mindmap-layout';
import { AREAS, type AreaId } from '../src/data/curriculum';
import { fakeCatalog } from './helpers/expected';

const CAT = fakeCatalog();
const areasOf = (nodes: ReturnType<typeof layoutMindmap>['nodes'], side: 'left' | 'right') =>
  nodes.filter(n => n.kind === 'area' && n.side === side).sort((a, b) => a.y - b.y);

it('puts the root at the centre and four areas on each side without overlap', () => {
  const { nodes, edges } = layoutMindmap(AREAS, CAT, new Set<AreaId>());
  const root = nodes.find(n => n.id === 'root')!;
  expect([root.x + root.width / 2, root.y + root.height / 2]).toEqual([0, 0]);
  expect([nodes.length, edges.length]).toEqual([9, 8]);
  const right = areasOf(nodes, 'right'), left = areasOf(nodes, 'left');
  expect(right.map(n => n.areaId)).toEqual(['A1', 'A2', 'A3', 'A4']);
  expect(left.map(n => n.areaId)).toEqual(['A5', 'A6', 'A7', 'A8']);
  for (const n of right) expect(n.x).toBe(SIZES.rootW / 2 + SIZES.gapRootArea);
  for (const n of left) expect(n.x + n.width).toBe(-(SIZES.rootW / 2 + SIZES.gapRootArea));
  for (const side of [right, left]) for (let i = 1; i < side.length; i++) {
    expect(side[i].y).toBeGreaterThanOrEqual(side[i - 1].y + side[i - 1].height + SIZES.groupGap);
  }
});
it('opens A4 with its six lessons beside it, centred on the area', () => {
  const { nodes, edges } = layoutMindmap(AREAS, CAT, new Set<AreaId>(['A4']));
  const leaves = nodes.filter(n => n.kind === 'lesson');
  const area = nodes.find(n => n.id === 'area:A4')!;
  expect(leaves.map(n => n.num)).toEqual(['3.4', '3.5', '3.6', '3.7', '3.8', '3.9']);
  for (const l of leaves) expect(l.x).toBe(area.x + SIZES.areaW + SIZES.gapAreaLeaf);
  expect(area.y + area.height / 2).toBeCloseTo((leaves[0].y + leaves.at(-1)!.y + SIZES.leafH) / 2, 5);
  expect(edges.filter(e => e.source === 'area:A4')).toHaveLength(6);
});
it('opens a left area to the left, in roadmap order', () => {
  const { nodes } = layoutMindmap(AREAS, CAT, new Set<AreaId>(['A5']));
  const leaves = nodes.filter(n => n.kind === 'lesson');
  const area = nodes.find(n => n.id === 'area:A5')!;
  expect(leaves.map(n => n.num)).toEqual(['3.1', '3.2', '3.3', '3.10', '4.1', '4.2', '4.3', '4.4', '4.5']);
  for (const l of leaves) expect(l.x + SIZES.leafW).toBe(area.x - SIZES.gapAreaLeaf);
});
it('keeps each side vertically centred on the root', () => {
  const { nodes } = layoutMindmap(AREAS, CAT, new Set<AreaId>(['A1', 'A5']));
  for (const side of ['left', 'right'] as const) {
    const ns = nodes.filter(n => n.side === side);
    expect(Math.min(...ns.map(n => n.y)) + Math.max(...ns.map(n => n.y + n.height))).toBeCloseTo(0, 5);
  }
});
```
Ghi chú: node gốc không có `side`; node lá mang `side` của nhánh cha.

- [ ] **Step 2: Chạy test, phải fail**

Run: `npx vitest run tests/mindmap-layout.test.ts`
Expected: FAIL (thiếu module)

- [ ] **Step 3: Viết `mindmap-layout.ts` theo Interfaces**

- [ ] **Step 4: Chạy test, phải pass**

Run: `npx vitest run tests/mindmap-layout.test.ts`
Expected: PASS (4 test)

- [ ] **Step 5: Viết `MindMap.tsx`, sửa `index.astro`, CSS theo mockup `mindmap.html` phương án B**

- [ ] **Step 6: Build, test, xem trên trình duyệt**

Run: `npx vitest run && npm run build && npm run check:dist`
Expected: PASS, `check-dist: OK`
Trên trình duyệt, với tiến độ mẫu: nhánh `Kết bảng / lệnh JOIN` mở sẵn, 3.5 tô nền; `Mở hết` mở cả 8 nhánh; `Thu gọn` còn gốc và 8 nhánh; bấm lá 3.5 thì mở trang bài 3.5; popup vẫn tự hiện trên mindmap khi đủ điều kiện.

- [ ] **Step 7: Commit**

```bash
git add src tests
git commit -m "add the knowledge-area mindmap as the home page"
```

---

### Task 12: Tìm kiếm (Ctrl K)

**Files:**
- Create: `src/lib/search.ts`, `src/components/islands/SearchDialog.tsx`
- Modify: `src/layouts/BaseLayout.astro` (gắn `<SearchDialog client:only="react" catalog={catalog} areas={AREAS} levels={LEVELS} />`), `src/components/layout/TopBar.astro` (nút tìm kiếm gọi `emit(EVENTS.openSearch)`), `src/styles/islands.css`
- Test: `tests/search.test.ts`

**Interfaces:**
- Consumes: `CatalogEntry`, `AREAS`, `AreaDef` (Task 3); `EVENTS` (Task 8); `lessonUrl` (Task 1); `readCatalog` (test helper, Task 3).
- Produces:
  - `normalizeVi(s: string): string`: NFC → NFD, bỏ dấu kết hợp, `đ`/`Đ` → `d`, chữ thường, gộp khoảng trắng, cắt hai đầu.
  - `searchLessons(catalog: CatalogEntry[], query: string, areas: AreaDef[], limit = 8): CatalogEntry[]`: câu hỏi rỗng → `[]`. Hạng 1: `num` trùng đúng câu hỏi. Hạng 2: mọi từ của câu hỏi có trong `title` hoặc `shortTitle`. Hạng 3: mọi từ có trong chuỗi gộp `num title shortTitle summary excel <tên mảng>`. Cùng hạng thì theo thứ tự lộ trình. So sánh sau `normalizeVi`.
  - `SearchDialog` props `{ catalog: CatalogEntry[]; areas: AreaDef[]; levels: LevelDef[] }`: mở bằng Ctrl+K (Cmd+K trên Mac) hoặc sự kiện `search:open`; ô nhập tự focus, gợi ý `Gõ tên bài, mã bài hoặc tính năng Excel…`; khi trống hiện `Gõ không dấu cũng được, ví dụ: ket bang, vlookup, 3.5`; không có kết quả thì `Không tìm thấy bài nào khớp.`; mỗi dòng kết quả: `num`, `title`, nhãn `L<level>`, tên mảng; ↑/↓ chọn, Enter đi tới `lessonUrl(slug)`, Esc đóng.

- [ ] **Step 1: Viết test (đang fail)**

```ts
// tests/search.test.ts
import { it, expect } from 'vitest';
import { normalizeVi, searchLessons } from '../src/lib/search';
import { AREAS } from '../src/data/curriculum';
import { readCatalog } from './helpers/lessons';

const CAT = readCatalog();
const nums = (q: string, limit?: number) => searchLessons(CAT, q, AREAS, limit).map(e => e.num);

it('normalises Vietnamese text, including đ and NFD input', () => {
  expect(normalizeVi('  Kết bảng ĐỒNG   Đỗ ')).toBe('ket bang dong do');
  expect(normalizeVi('Kết bảng'.normalize('NFD'))).toBe('ket bang');
});
it('puts an exact lesson number first', () => expect(nums('3.5')[0]).toBe('3.5'));
it('finds lessons without diacritics', () => {
  expect(nums('hop dong')).toContain('3.5');
  expect(nums('ket bang')).toContain('3.6');
});
it('finds Excel feature names and ranks title matches first', () => {
  const r = nums('vlookup');
  expect(r[0]).toBe('3.4');
  expect(r).toContain('3.5');
});
it('gives the same results for NFD and NFC queries', () => {
  expect(nums('Kết bảng'.normalize('NFD'))).toEqual(nums('Kết bảng'));
});
it('returns nothing for a blank query and respects the limit', () => {
  expect(nums('   ')).toEqual([]);
  expect(nums('a', 3).length).toBeLessThanOrEqual(3);
});
```

- [ ] **Step 2: Chạy test, phải fail**

Run: `npx vitest run tests/search.test.ts`
Expected: FAIL (thiếu module)

- [ ] **Step 3: Viết `search.ts` theo Interfaces**

- [ ] **Step 4: Chạy test, phải pass**

Run: `npx vitest run tests/search.test.ts`
Expected: PASS (6 test)

- [ ] **Step 5: Viết `SearchDialog.tsx`, nối nút trên thanh trên cùng, CSS**

- [ ] **Step 6: Build, test, xem trên trình duyệt**

Run: `npx vitest run && npm run build && npm run check:dist`
Expected: PASS, `check-dist: OK`
Trên trình duyệt: Ctrl+K mở hộp tìm; gõ `ket bang` có 3.6; Enter mở bài; Esc đóng.

- [ ] **Step 7: Commit**

```bash
git add src tests
git commit -m "add diacritic-insensitive lesson search"
```

---

### Task 13: Trang giới thiệu, tải script, trang 404

**Files:**
- Create: `src/pages/gioi-thieu.astro`, `src/pages/HRM_Demo.sql.ts`, `src/pages/404.astro`
- Modify: `scripts/check-dist.mjs` (bắt buộc có `dist/404.html`, `dist/gioi-thieu/index.html`, và `dist/HRM_Demo.sql` giống hệt `database/HRM_Demo.sql`), `tests/content.test.ts`

**Interfaces:**
- Consumes: `BaseLayout`, `StatusIcon` (Task 8); `LEVELS` (Task 3); `withBase` (Task 1).
- Produces:
  - `gioi-thieu.astro` (`title="Giới thiệu"`), đúng 5 tiêu đề cấp 2 theo thứ tự: `Khóa học này dạy gì`, `Cách dùng trang`, `6 level`, `Database mẫu HRM_Demo`, `Tiến độ của bạn được lưu ở đâu`. Mục `Cách dùng trang` nói về popup lộ trình, mindmap, 4 trạng thái (kèm `StatusIcon`). Mục `6 level` là bảng từ `LEVELS` (tên, "học xong level này"). Mục database có link `Tải script HRM_Demo.sql` (`withBase('/HRM_Demo.sql')`) và cách chạy (máy riêng: tạo database `HRM_Demo` rồi chạy; Azure SQL: chạy trong database đang mở). Mục tiến độ nói lưu trong trình duyệt và cách xuất/nhập. Viết theo quy tắc viết ở Global Constraints.
  - `HRM_Demo.sql.ts`: `GET(): Response` trả nội dung `database/HRM_Demo.sql` (đọc bằng `readFileSync(join(process.cwd(), 'database/HRM_Demo.sql'), 'utf8')`), `Content-Type: text/plain; charset=utf-8`.
  - `404.astro`: `Không tìm thấy trang này.` và link về trang chủ.

- [ ] **Step 1: Viết test (đang fail)**

Thêm vào `tests/content.test.ts`:
```ts
it('the intro page follows the writing rules and has its five sections', () => {
  const page = readFileSync('src/pages/gioi-thieu.astro', 'utf8');
  const text = page.toLowerCase();
  for (const p of BANNED_PHRASES) expect(text.includes(p), p).toBe(false);
  expect(/\p{Extended_Pictographic}/u.test(page)).toBe(false);
  const h2 = [...page.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].map(m => m[1].trim());
  expect(h2).toEqual(['Khóa học này dạy gì', 'Cách dùng trang', '6 level', 'Database mẫu HRM_Demo', 'Tiến độ của bạn được lưu ở đâu']);
});
```
(import `readFileSync` từ `node:fs`)

- [ ] **Step 2: Chạy test, phải fail**

Run: `npx vitest run tests/content.test.ts`
Expected: FAIL (ENOENT `src/pages/gioi-thieu.astro`)

- [ ] **Step 3: Viết 3 trang và sửa `check-dist.mjs` theo Interfaces**

- [ ] **Step 4: Chạy test, build và kiểm đầu ra**

Run: `npx vitest run && npm run build && npm run check:dist`
Expected: PASS; `check-dist: OK (54 trang, …)`

- [ ] **Step 5: Commit**

```bash
git add src scripts tests
git commit -m "add the intro page, script download and 404 page"
```

---

### Task 14: Bài đầy đủ 1.1 "Database là gì, nhìn từ một file Excel nhân sự"

**Files:**
- Modify: `src/content/lessons/1-1-*.mdx`

**Interfaces:**
- Consumes: `lessonComponents` (Task 7); điểm neo `HRM_Demo` (Task 2, Step 9 phải xong); MCP `azure-sql` (chỉ đọc).

- [ ] **Step 1: Viết thân bài theo đúng 7 mục của `SECTION_HEADINGS.full`**

Nội dung theo mục 7 của spec:
- `Tình huống`: file Excel nhân sự nhiều sheet gửi qua email: trùng mã NV, gõ sai tên phòng ban, mỗi người giữ một bản khác nhau. Có `Chat` và `Key`.
- `Với Excel`: một `Excel` cho thấy sheet nhân viên có tên phòng ban gõ lệch (ví dụ `Kế toán` và `Ke toan`) và mã NV trùng.
- `Làm bằng SQL`: đối chiếu bằng `LineMap` hoặc bảng: workbook ↔ database, sheet ↔ bảng, tiêu đề cột ↔ cột có kiểu dữ liệu, dòng ↔ dòng, cột mã không trùng ↔ khóa chính, dropdown lấy từ sheet khác ↔ khóa ngoại; nhìn thử một câu `SELECT` đầu tiên, chưa đi sâu cú pháp:
  `SELECT TOP (5) MaNV, HoTen, MaPB FROM NhanVien ORDER BY MaNV;` kèm `Result` chép từ lần chạy thật.
- `Hay nhầm ở đâu` (`Mistakes`): 2–3 ý, ví dụ nghĩ database chỉ là "Excel to hơn"; tưởng sửa thẳng trong bảng như sửa ô Excel là an toàn.
- `Ứng dụng` (`Apply`): khi gặp một màn hình của hệ thống nhân sự, tập hỏi "dữ liệu này nằm ở bảng nào, cột nào".
- `Ghi nhớ` (`Memo`): các cặp Excel ↔ SQL ở trên.
- `Bài tập`: `<Exercises />`.
Xóa mọi dòng `{/* TODO-CONTENT */}` trong file.

- [ ] **Step 2: Chạy câu `SELECT` qua MCP và chép kết quả vào `Result`**

Run (MCP `azure-sql`, chỉ đọc): `SELECT TOP (5) MaNV, HoTen, MaPB FROM NhanVien ORDER BY MaNV;`
Expected: 5 dòng, `NV001` Trần Thị Mai `KT` đứng đầu. Chép nguyên kết quả vào `rows`.

- [ ] **Step 3: Kiểm**

Run: `npx vitest run tests/content.test.ts && npm run build`
Expected: PASS; build không lỗi
Run: `rg -c "TODO-CONTENT" src/content/lessons/1-1-*.mdx`
Expected: không in gì
Xem trang `/microsoft-sql-lession/bai/1-1-…/` trên trình duyệt: đủ 7 mục, khối Excel và kết quả hiển thị đúng.

- [ ] **Step 4: Commit**

```bash
git add src/content/lessons
git commit -m "write full lesson 1.1"
```

---

### Task 15: Bài đầy đủ 3.5 "LEFT JOIN: tìm người chưa có hợp đồng"

**Files:**
- Modify: `src/content/lessons/3-5-left-join.mdx`

**Interfaces:**
- Consumes: `lessonComponents` (Task 7); điểm neo `HRM_Demo` (Task 2); MCP `azure-sql` (chỉ đọc).

- [ ] **Step 1: Viết thân bài theo mockup `lesson-page.html`, sửa theo spec**

- `Tình huống`: câu dẫn `Một yêu cầu hay gặp từ phòng nhân sự:`; `Chat` với `who="Chị Hạnh · Phòng Nhân sự"`, `time="16:05"`, `initial="H"`, lời nhắn như mockup; `Key`: `Nhân viên nào có trong bảng NhanVien, nhưng không có dòng nào trong bảng HopDong?`
- `Với Excel`: câu dẫn `Với Excel, cách quen thuộc là…`; `Excel` như mockup (các dòng `NV001`, `NV002`, `NV003`, `NV047`, `NV048`, hai ô `#N/A`, `selected` là ô `#N/A` đầu tiên, công thức VLOOKUP tương ứng); câu "tuần sau hỏi lại thì phải làm lại từ đầu".
- `Làm bằng SQL`:
  - `### Bước 1: kết hai bảng, chưa lọc gì`: `SELECT nv.MaNV, nv.HoTen, hd.MaHD FROM NhanVien AS nv LEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV ORDER BY nv.MaNV;` kèm `Result` trích vài dòng đầu và các dòng `NV047`, `NV048` (ô `NULL`), `total` = tổng số dòng thật; câu "Ô `NULL` nền vàng chính là ô `#N/A` bên Excel".
  - `### Bước 2: chỉ giữ những dòng NULL`: câu lệnh của mockup nhưng lấy `nv.MaNV, nv.HoTen, nv.MaPB, nv.NgayVaoLam` (bảng `NhanVien` không có cột tên phòng ban) và thêm `ORDER BY nv.MaNV`; `LineMap` 4 dòng như mockup; `Result` thật.
- `Hay nhầm ở đâu`: ba ý như mockup (`= NULL` thay vì `IS NULL`; đặt điều kiện của `HopDong` ở `WHERE` thay vì `ON`; một người hiện hai dòng khi có hai hợp đồng).
- `Ứng dụng`: hai ý như mockup, câu chữ trung tính: `Kiểm tra dữ liệu sau khi import: …`; ý viết yêu cầu báo cáo kết thúc bằng `Người làm báo cáo đọc là làm được, khỏi hỏi lại.`
- `Ghi nhớ`: ba cặp như mockup. `Bài tập`: `<Exercises />`.
Xóa mọi `{/* TODO-CONTENT */}`.

- [ ] **Step 2: Chạy từng câu lệnh qua MCP, chép kết quả**

| Câu lệnh | Dùng cho |
|---|---|
| Câu Bước 1 | `rows` (trích) |
| `SELECT COUNT(*) FROM NhanVien AS nv LEFT JOIN HopDong AS hd ON hd.MaNV = nv.MaNV;` | `total` của Bước 1 |
| Câu Bước 2 | `rows` Bước 2; Expected đúng 2 dòng `NV047` Phạm Ngọc Ánh `NS` 2026-10-01, `NV048` Đỗ Minh Quân `IT` 2026-10-05 |

- [ ] **Step 3: Kiểm**

Run: `npx vitest run tests/content.test.ts && npm run build`
Expected: PASS
Run: `rg -c "TODO-CONTENT" src/content/lessons/3-5-left-join.mdx`
Expected: không in gì
Xem trang trên trình duyệt: màu SSMS đúng, nút `Sao chép` chép đúng câu lệnh, ô NULL nền vàng.

- [ ] **Step 4: Commit**

```bash
git add src/content/lessons/3-5-left-join.mdx
git commit -m "write full lesson 3.5"
```

---

### Task 16: Bài đầy đủ 6.5 "Lỡ UPDATE quên WHERE: 5 phút đầu"

**Files:**
- Modify: `src/content/lessons/6-5-*.mdx`

**Interfaces:**
- Consumes: `lessonComponents` gồm `Messages` (Task 7); điểm neo `HRM_Demo` (Task 2); MCP `azure-sql` (chỉ đọc).

- [ ] **Step 1: Viết thân bài theo mục 7 của spec**

- `Tình huống`: định sửa phụ cấp một người trong kỳ `2026-09` nhưng chạy thiếu `WHERE`: câu định chạy `UPDATE BangLuong SET PhuCap = 500000 WHERE KyLuong = '2026-09' AND MaNV = 'NV012';`, câu đã chạy `UPDATE BangLuong SET PhuCap = 500000;`; `Messages` hiện `(<N> rows affected)` với N thật.
- `Với Excel`: Ctrl+Z cứu được trong Excel, nhưng câu lệnh đã tự commit thì không có Ctrl+Z.
- `Làm bằng SQL` (các câu sửa dữ liệu chỉ để đọc, không chạy):
  - `### Việc làm ngay`: dừng mọi lệnh sửa; chạy `SELECT @@TRANCOUNT;` nếu ra lớn hơn 0 thì transaction còn mở và `ROLLBACK` cứu được; ghi lại thời điểm chính xác, câu lệnh, số dòng ở tab Messages; báo ngay người quản trị database.
  - `### Những đường cứu`: SSMS mặc định tự commit từng câu; point-in-time restore ra một database khác rồi chép lại phần bị hỏng (cần recovery model và log backup phù hợp; Azure SQL Database tự backup); temporal table; bảng nhật ký. Mức khái niệm, link sang 6.3, 6.4, 6.6.
  - `### Thói quen phòng tránh`: `SELECT` cùng điều kiện trước; `BEGIN TRAN` rồi xem `@@ROWCOUNT` trước khi `COMMIT`; sao lưu các dòng sắp sửa (`SELECT … INTO`); dùng tài khoản chỉ đọc khi chỉ cần xem. Mỗi câu lệnh minh họa dùng `Sql`.
- `Hay nhầm ở đâu`: ví dụ tự gõ lại giá trị cũ bằng trí nhớ; chạy tiếp câu sửa khác "cho chắc"; chờ hết ngày mới báo.
- `Ứng dụng`: những gì cần sẵn sàng trước khi được phép sửa dữ liệu thật (môi trường, quyền, bản sao).
- `Ghi nhớ`, `Bài tập`: như các bài khác.
Xóa mọi `{/* TODO-CONTENT */}`.

- [ ] **Step 2: Kiểm số dòng bằng `SELECT` tương đương qua MCP**

| Câu lệnh | Kết quả dùng trong bài |
|---|---|
| `SELECT COUNT(*) FROM BangLuong;` | N trong `(<N> rows affected)` của câu thiếu `WHERE` |
| `SELECT COUNT(*) FROM BangLuong WHERE KyLuong = '2026-09' AND MaNV = 'NV012';` | Expected `1` (số dòng của câu đúng) |

- [ ] **Step 3: Kiểm**

Run: `npx vitest run tests/content.test.ts && npm run build`
Expected: PASS
Run: `rg -c "TODO-CONTENT" src/content/lessons/6-5-*.mdx`
Expected: không in gì

- [ ] **Step 4: Commit**

```bash
git add src/content/lessons
git commit -m "write full lesson 6.5"
```

---

### Task 17–19: Bản tóm tắt cho 48 bài

Ba task giống nhau, khác danh sách bài:
- **Task 17:** Level 1–2 trừ 1.1: 1.2–1.6, 2.1–2.9 (14 bài).
- **Task 18:** Level 3–4 trừ 3.5: 3.1–3.4, 3.6–3.10, 4.1–4.10 (19 bài).
- **Task 19:** Level 5–6 trừ 6.5: 5.1–5.9, 6.1–6.4, 6.6, 6.7 (15 bài).

**Files:**
- Modify: các file `src/content/lessons/*.mdx` của nhóm bài trong task.

**Interfaces:**
- Consumes: `Exercises` (Task 7); frontmatter của từng bài (Task 3).

- [ ] **Step 1: Viết thân bài cho từng bài trong nhóm, theo `SECTION_HEADINGS.summary`**

- `Nội dung chính`: 3–5 gạch đầu dòng, mỗi ý gắn với dữ liệu nhân sự của `HRM_Demo`, lấy từ cột "Nội dung chính" của spec mục 6.
- `Liên hệ Excel`: 1–2 câu, nói rõ tính năng Excel tương ứng (cột "Liên hệ Excel").
- `Tình huống ví dụ`: 1 câu, là một yêu cầu công việc trung tính.
- `Bài tập`: `<Exercises />`.
- Chỉ dùng code nội dòng (ví dụ `` `WHERE` ``); không dùng `Sql`, `Result`, `Messages`.
- Kiến thức phải đúng với SQL Server 2019+, Azure SQL Database và Excel 365. Ví dụ: 4.9 ghi đường dẫn Data → Get Data → From Database → From SQL Server Database; 5.4 ghi SSMS mặc định tự commit từng câu; 6.4 ghi Azure SQL Database mặc định giữ bản khôi phục theo thời điểm 7 ngày (chỉnh được); 6.1 chỉ nhắc "quy định bảo vệ dữ liệu cá nhân hiện hành", không ghi số hiệu văn bản nếu chưa kiểm chứng.
Xóa mọi `{/* TODO-CONTENT */}` trong các file của nhóm.

- [ ] **Step 2: Kiểm**

Run: `npx vitest run tests/content.test.ts && npm run build`
Expected: PASS
Run (ví dụ Task 17): `rg -l "TODO-CONTENT" src/content/lessons/1-* src/content/lessons/2-*`
Expected: không in gì (Task 18 kiểm `3-*` và `4-*`, Task 19 kiểm `5-*` và `6-*`)

- [ ] **Step 3: Commit**

```bash
git add src/content/lessons
git commit -m "write lesson summaries for levels 1-2"
```
(Task 18: `… for levels 3-4`; Task 19: `… for levels 5-6`)

---

### Task 20: Kiểm tra cuối

**Files:**
- Modify: `tests/content.test.ts`

- [ ] **Step 1: Thêm test không còn nội dung dang dở**

```ts
it('no lesson still has TODO-CONTENT', () => {
  for (const f of files) expect(f.body.includes('TODO-CONTENT'), f.slug).toBe(false);
});
```

- [ ] **Step 2: Chạy toàn bộ**

Run: `npx vitest run && npm run build && npm run check:dist`
Expected: mọi test PASS; `check-dist: OK (54 trang, …)`

- [ ] **Step 3: Duyệt trên trình duyệt với bản build (`site-preview`, `http://localhost:4321/microsoft-sql-lession/`)**

| Thao tác | Kết quả đúng |
|---|---|
| Xóa `localStorage`, mở trang chủ | popup `Chào bạn`, nút `Bắt đầu bài 1.1 →` |
| Bấm nút đó | trang 1.1, sidebar mở Level 1, trạng thái `Đã xem` |
| Bấm `Đã học xong bài này` | tick xanh lá ở sidebar, thanh trên cùng `1/51` |
| `Tiến độ` → `Xem thử với tiến độ mẫu` | popup như mockup B: dừng ở 3.5, cách đây 14 ngày, `18/51`, trạm 2 `8/9 · 1 cờ` |
| Đóng popup, xem mindmap | nhánh `Kết bảng / lệnh JOIN` mở sẵn, 3.5 tô nền |
| Ctrl+K, gõ `ket bang`, Enter | mở một bài thuộc mảng kết bảng |
| Thu khung xem dưới 1024px | dải `Trang được thiết kế cho máy tính.` |
| Trang 3.5 | màu SSMS đúng, `Sao chép` chép đúng câu lệnh, ô NULL nền vàng |
| Trang giới thiệu | link `Tải script HRM_Demo.sql` mở đúng file |

Sai chỗ nào thì sửa, chạy lại Step 2 và dòng tương ứng.

- [ ] **Step 4: Commit**

```bash
git add tests src
git commit -m "final checks for the course prototype"
```

- [ ] **Step 5: Báo người dùng**

Tóm tắt kết quả, nhắc việc của người dùng (bật GitHub Pages với Source: GitHub Actions), hỏi trước khi push nhánh `course-website` và trước khi gộp vào `main`.
