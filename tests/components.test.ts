import { it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Result from '../src/components/lesson/Result.astro';
import Messages from '../src/components/lesson/Messages.astro';
import Excel from '../src/components/lesson/Excel.astro';
import Sql from '../src/components/lesson/Sql.astro';
import Erd from '../src/components/lesson/Erd.astro';
import reactRenderer from '@astrojs/react/server.js';
import Memo from '../src/components/lesson/Memo.astro';
import Exercises from '../src/components/lesson/Exercises.astro';
import LessonHeader from '../src/components/lesson/LessonHeader.astro';
import RunFlow from '../src/components/lesson/RunFlow.astro';
import Ssms from '../src/components/lesson/Ssms.astro';
import { LEVELS } from '../src/data/curriculum';
import { fakeCatalog } from './helpers/expected';
import { sampleFlow, sampleQuery } from './helpers/flows';

let c: AstroContainer;
beforeAll(async () => { c = await AstroContainer.create(); });

it('Result shows NULL cells in the SSMS style and says how many rows were trimmed', async () => {
  const html = await c.renderToString(Result, { props: { columns: ['MaNV', 'MaHD'], rows: [['NV001', 'HD2024-018'], ['NV047', null]], total: 52 } });
  expect(html).toMatch(/class="[^"]*res-null[^"]*"[^>]*>NULL</);
  for (const s of ['52 rows', 'Trích 2 dòng (kết quả có 52 dòng)', 'free-sql-db-8797714', 'Query executed successfully.']) expect(html).toContain(s);
  expect(html).not.toContain('HRM_Demo');
});
it('Messages prints its lines', async () => {
  const html = await c.renderToString(Messages, { props: { lines: ['(96 rows affected)'] } });
  expect(html).toContain('(96 rows affected)');
  expect(html).toContain('free-sql-db-8797714');
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
  expect(html).toMatch(/<span class="t-keyword"[^>]*>SELECT<\/span>/);
  expect(html).toContain('data-copy="SELECT 1;"');
  expect(html).toContain('Sao chép');
});
it('Sql leaves out the copy button for a snippet that is only for reading', async () => {
  const html = await c.renderToString(Sql, { props: { code: 'DELETE FROM PhongBan;', copy: false } });
  expect(html).not.toContain('Sao chép');
  expect(html).not.toContain('data-copy');
  expect(html).toMatch(/<span class="t-keyword"[^>]*>DELETE<\/span>/);
});
it('Memo and Exercises use the fixed copy', async () => {
  const memo = await c.renderToString(Memo, { props: { rows: [['VLOOKUP dò theo mã', 'LEFT JOIN … ON']] } });
  expect(memo).toContain('Bên Excel'); expect(memo).toContain('Bên SQL');
  expect(await c.renderToString(Exercises)).toContain('Phần bài tập sẽ bổ sung sau.');
});
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

it('RunFlow numbers the steps, counts rows and previews 3 rows by 3 columns', async () => {
  const html = await c.renderToString(RunFlow, { props: { query: sampleQuery(), steps: sampleFlow() } });
  expect(html).toMatch(/class="rf-num"[^>]*>01</);
  expect(html).toMatch(/class="rf-num"[^>]*>05</);
  for (const s of ['còn 48 dòng', 'còn 57 dòng', '+45 dòng', '+9 cột', 'Bạn viết SELECT trước, nhưng theo thứ tự logic, SQL Server xét FROM trước.']) expect(html).toContain(s);
  expect(html).toMatch(/<span class="rf-mini"[^>]*>(?:(?!<\/button>)[\s\S])*res-null/);
  expect((html.match(/class="rf-panel"/g) ?? []).length).toBe(5);
  for (const s of ['Bước trước', 'Bước sau', 'Trích 10 dòng (kết quả có 57 dòng)', 'Câu lệnh để xem dữ liệu ở bước này', 'Sao chép', 'Ở bước này']) expect(html).toContain(s);
});
it("RunFlow highlights the step's lines in the full query and boxes SQL words in the explanation", async () => {
  const html = await c.renderToString(RunFlow, { props: { query: sampleQuery(), steps: sampleFlow() } });
  expect(html).toMatch(/<mark class="rf-q-on"[^>]*>(?:(?!<\/mark>)[\s\S])*LEFT(?:(?!<\/mark>)[\s\S])*HopDong/);
  expect(html).toMatch(/<mark class="rf-q-on"[^>]*>(?:(?!<\/mark>)[\s\S])*dò không ra hợp đồng nào/);
  expect(html).toMatch(/<code class="rf-kw"[^>]*><span class="t-keyword"[^>]*>ON<\/span><\/code>/);
  expect(html).toMatch(/<code class="rf-id"[^>]*>NhanVien<\/code>/);
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
it('RunFlow cards are valid buttons with a short spoken name', async () => {
  const html = await c.renderToString(RunFlow, { props: { query: sampleQuery(), steps: sampleFlow() } });
  expect(html).toMatch(/<button[^>]*class="rf-card"[^>]*aria-label="Bước 02, LEFT JOIN: Ghép mỗi nhân viên với hợp đồng của họ\. Còn 57 dòng\."/);
  expect(html).not.toMatch(/<button[^>]*class="rf-card"(?:(?!<\/button>)[\s\S])*<table/);
  expect(html).toMatch(/<span class="rf-mini"[^>]*aria-hidden="true"/);
});

it('Exercises keeps the placeholder in a lesson with no exercises', async () => {
  const html = await c.renderToString(Exercises, { request: new Request('http://x/microsoft-sql-lession/bai/1-1-database-la-gi/') });
  expect(html).toContain('Phần bài tập sẽ bổ sung sau.');
});

it('Ssms boxes the key, type and NULL label of the columns a lesson points at', async () => {
  const html = await c.renderToString(Ssms, { props: { view: 'explorer', table: 'HopDong', mark: ['LuongCoBan', 'NgayKetThuc'] } });
  expect(html).toMatch(/LuongCoBan <span class="ssms-mark"[^>]*>\(decimal\(18,0\), not null\)<\/span>/);
  expect(html).toMatch(/NgayKetThuc <span class="ssms-mark"[^>]*>\(date, null\)<\/span>/);
  expect(html).toContain('MaHD (PK, varchar(20), not null)');
  await expect(c.renderToString(Ssms, { props: { view: 'explorer', table: 'HopDong', mark: ['Luong'] } })).rejects.toThrow('Luong');
});
it('Result marks the rows a lesson points at and stops the build on a row it does not have', async () => {
  const html = await c.renderToString(Result, { props: { columns: ['A'], rows: [['x'], ['y']], mark: [2] } });
  expect(html).toMatch(/<tr class="res-mark"[^>]*>\s*<td class="res-rn"[^>]*>2<\/td>/);
  expect(html).not.toMatch(/<tr class="res-mark"[^>]*>\s*<td class="res-rn"[^>]*>1</);
  await expect(c.renderToString(Result, { props: { columns: ['A'], rows: [['x']], mark: [3] } })).rejects.toThrow('3');
});
it('Excel marks the cells a lesson points at', async () => {
  const html = await c.renderToString(Excel, { props: { rows: [['a', 'b'], ['c', 'd']], mark: ['B2'] } });
  expect(html).toMatch(/<td class="xl-mark"[^>]*>d<\/td>/);
  expect(html).not.toMatch(/<td class="xl-mark"[^>]*>c<\/td>/);
});
it('Erd lights up the path a lesson follows', async () => {
  // Erd draws a React component, so this container needs the React renderer.
  const withReact = await AstroContainer.create();
  withReact.addServerRenderer({ renderer: reactRenderer });
  const html = await withReact.renderToString(Erd, { props: { path: ['BangLuong', 'NhanVien', 'PhongBan'] } });
  expect(html.match(/er-box is-on/g)).toHaveLength(3);
  expect(html.match(/er-link is-on/g)).toHaveLength(2);
});
it('Ssms stops the build when the opened table does not exist', async () => {
  await expect(c.renderToString(Ssms, { props: { view: 'explorer', table: 'NhanVen' } })).rejects.toThrow('NhanVen');
});

it('Ssms draws the connect box, Object Explorer and the toolbar', async () => {
  const connect = await c.renderToString(Ssms, { props: { view: 'connect' } });
  // SSMS 21 and later: Database Name sits on the dialog itself (Microsoft Learn, SSMS quickstarts, 2026-10).
  for (const s of ['sql-lession.database.windows.net', 'SQL Server Authentication', 'Database Name', 'free-sql-db-8797714', 'Strict (Minimum SQL Server 2022 and Azure SQL)', 'Trust server certificate', 'Mô phỏng SSMS:']) expect(connect).toContain(s);
  expect(connect).not.toContain('Connection Properties');
  const explorer = await c.renderToString(Ssms, { props: { view: 'explorer' } });
  expect(explorer).toContain('free-sql-db-8797714');
  for (const t of ['PhongBan', 'ChucDanh', 'NhanVien', 'HopDong', 'ChamCong', 'DonNghiPhep', 'BangLuong']) expect(explorer).toContain(`dbo.${t}`);
  for (const s of ['MaNV (PK, varchar(10), not null)', 'Email (varchar(100), null)']) expect(explorer).toContain(s);
  expect(await c.renderToString(Ssms, { props: { view: 'explorer', table: 'ChamCong' } })).toContain('MaNV (PK, FK, varchar(10), not null)');
  const toolbar = await c.renderToString(Ssms, { props: { view: 'toolbar', caption: 'Chọn đúng database trước khi chạy' } });
  for (const s of ['New Query', 'Execute', 'free-sql-db-8797714', 'Chọn đúng database trước khi chạy']) expect(toolbar).toContain(s);
});
