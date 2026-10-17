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
  expect(html).toMatch(/<span class="t-keyword"[^>]*>SELECT<\/span>/);
  expect(html).toContain('data-copy="SELECT 1;"');
  expect(html).toContain('Sao chép');
});
it('Memo and Exercises use the fixed copy', async () => {
  const memo = await c.renderToString(Memo, { props: { rows: [['VLOOKUP dò theo mã', 'LEFT JOIN … ON']] } });
  expect(memo).toContain('Bên Excel'); expect(memo).toContain('Bên SQL');
  expect(await c.renderToString(Exercises)).toContain('Phần bài tập sẽ bổ sung sau.');
});
