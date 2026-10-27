import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { lessonSchema, SECTION_HEADINGS, BANNED_PHRASES, sectionHeadings } from '../src/lib/lesson-schema';
import { validateCatalog } from '../src/lib/catalog';
import { findUnprefixedUnicodeStrings } from '../src/lib/tsql-lexer';
import { EXPECTED } from './helpers/expected';
import { lessonBlocks } from './helpers/lesson-blocks';
import { readLessonFiles, readCatalog, lessonMainSection, sqlSubheadings, proseParagraphs } from './helpers/lessons';

// MDX SQL stores indentation as escaped tabs, not literal leading whitespace.
function sqlIndentationIssues(code: string): string[] {
  const lines = code.split(/\r?\n/);
  return lines.filter((line, i) => {
    if (/^\s+\S/.test(line)) return true;
    // Only the final closure of a procedure body may align with BEGIN.
    const procedureEnd = line === 'END;' && i === lines.length - 1
      && /^CREATE PROCEDURE\b/.test(lines[0]) && lines.includes('BEGIN');
    if (procedureEnd) return false;
    const continuation = i > 0 && (lines[i - 1].trimEnd().endsWith(',') || /^(?:\\t)*(?:AND|OR|WHEN|ELSE|END)\b/.test(line));
    return continuation && !line.startsWith('\\t');
  });
}

// Frozen migration list: existing lessons may keep their old layout until edited; new full lessons use the narrative format.
const LEGACY_LAYOUT_SLUGS = new Set([
  '6-5-update-quen-where',
]);

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
      const { kind, noExercises } = f.data as { kind: 'full' | 'summary'; noExercises?: boolean };
      const h2 = [...f.body.matchAll(/^## (.+?)\s*$/gm)].map(m => m[1]);
      if (kind === 'summary') {
        expect(h2, f.slug).toEqual(sectionHeadings(kind, noExercises));
      } else if (h2[1] === 'Với Excel') {
        expect(LEGACY_LAYOUT_SLUGS.has(f.slug), `${f.slug}: new full lessons must use the narrative format`).toBe(true);
        expect(h2, f.slug).toEqual(sectionHeadings(kind, noExercises));
      } else {
        expect(h2[1] ?? '', `${f.slug}: needs a descriptive main-section title`).not.toBe('');
        expect([...SECTION_HEADINGS.full, ...SECTION_HEADINGS.summary], f.slug).not.toContain(h2[1]);
        expect(h2, f.slug).toEqual(sectionHeadings(kind, noExercises, h2[1]));
      }
    }
  });
  it('keeps the query and its run order together in the main section, and preserves the legacy theory heading', () => {
    for (const f of files) {
      const { kind, num } = f.data as { kind: string; num: string };
      if (kind !== 'full' || num === '6.5') continue;
      const h3 = sqlSubheadings(f.body);
      const legacy = lessonMainSection(f.body).split(/\r?\n/, 1)[0] === 'Làm bằng SQL';
      if (legacy) expect(h3[0], f.slug).toBe('Lý thuyết cơ bản');
      else expect(h3, f.slug).not.toContain('Trả lời chị Hạnh');
      expect(h3.filter(h => h.startsWith('Bước')), f.slug).toEqual([]);
      if (f.body.includes('<RunFlow')) expect(h3.slice(-2), f.slug).toEqual(['Câu lệnh cho tình huống', 'SQL Server chạy câu này thế nào']);
    }
  });
  it('sectionHeadings drops Bài tập only when asked', () => {
    expect(sectionHeadings('full', true)).toEqual(SECTION_HEADINGS.full.slice(0, 6));
    expect(sectionHeadings('summary').at(-1)).toBe('Bài tập');
    expect(sectionHeadings('full', false)).toEqual([...SECTION_HEADINGS.full]);
  });
  it('supports a merged main section for any full lesson, with or without exercises', () => {
    expect(sectionHeadings('full', true, 'Hiểu nguồn dữ liệu chung')).toEqual([
      'Tình huống', 'Hiểu nguồn dữ liệu chung', 'Hay nhầm ở đâu', 'Ứng dụng', 'Ghi nhớ',
    ]);
    expect(sectionHeadings('full', false, 'Lọc danh sách nhân viên')).toEqual([
      'Tình huống', 'Lọc danh sách nhân viên', 'Hay nhầm ở đâu', 'Ứng dụng', 'Ghi nhớ', 'Bài tập',
    ]);
  });
  it.each(['\n', '\r\n'])('reads subheadings from a merged section with %j line endings', newline => {
    const body = ['## Tình huống', 'Yêu cầu.', '## Lọc danh sách nhân viên', '### Từ bộ lọc Excel đến WHERE',
      'Giải thích.', '### Câu lệnh cho tình huống', 'Kết quả.', '### SQL Server chạy câu này thế nào',
      'Sơ đồ.', '## Hay nhầm ở đâu', '### Không thuộc phần chính'].join(newline);
    expect(sqlSubheadings(body)).toEqual(['Từ bộ lọc Excel đến WHERE', 'Câu lệnh cho tình huống', 'SQL Server chạy câu này thế nào']);
  });
  it('lessons 1.1 to 1.5 have no exercises section', () => {
    for (const f of files) {
      const data = f.data as { num: string; noExercises?: boolean };
      if (!['1.1', '1.2', '1.3', '1.4', '1.5'].includes(data.num)) continue;
      expect(data.noExercises, f.slug).toBe(true);
      expect(f.body.includes('<Exercises'), f.slug).toBe(false);
    }
  });
  it('a lesson with an exercise file is not marked noExercises and lists its exercises', () => {
    const lessons = readdirSync(join('src', 'content', 'exercises')).filter(n => n.endsWith('.yaml'))
      .map(n => (parseYaml(readFileSync(join('src', 'content', 'exercises', n), 'utf8')) as { lesson: string }).lesson);
    expect(lessons.length).toBeGreaterThan(0);
    for (const lesson of lessons) {
      const f = files.find(x => x.slug === lesson)!;
      expect((f.data as { noExercises?: boolean }).noExercises, lesson).not.toBe(true);
      expect(f.body.includes('<Exercises />'), lesson).toBe(true);
    }
  });
  it('contains no banned phrase and no emoji', () => {
    for (const f of files) {
      const text = (JSON.stringify(f.data) + f.body).toLowerCase();
      for (const p of BANNED_PHRASES) expect(text.includes(p), `${f.slug}: ${p}`).toBe(false);
      expect(/\p{Extended_Pictographic}/u.test(text), f.slug).toBe(false);
    }
  });
  it('every Vietnamese string in lesson SQL has the N prefix', () => {
    for (const f of files) for (const m of f.body.matchAll(/<Sql[^>]*code=\{`([\s\S]*?)`\}/g)) {
      expect(findUnprefixedUnicodeStrings(m[1]), f.slug).toEqual([]);
    }
  });
  it('the intro page includes practice access alongside its existing sections', () => {
    const page = readFileSync('src/pages/gioi-thieu.astro', 'utf8');
    const text = page.toLowerCase();
    for (const p of BANNED_PHRASES) expect(text.includes(p), p).toBe(false);
    expect(/\p{Extended_Pictographic}/u.test(page)).toBe(false);
    const h2 = [...page.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].map(m => m[1].trim());
    expect(h2).toEqual(['Khóa học này dạy gì', 'Chọn nơi thực hành', 'Cách dùng trang', '6 level', 'Database mẫu HRM_Demo', 'Tiến độ của bạn được lưu ở đâu']);
  });
  it('lesson SQL uses escaped tabs instead of literal leading whitespace that MDX strips', () => {
    for (const f of files) for (const m of f.body.matchAll(/<Sql[^>]*code=\{`([\s\S]*?)`\}/g)) {
      expect(sqlIndentationIssues(m[1]), f.slug).toEqual([]);
    }
  });
  it('requires CASE indentation inside BEGIN while allowing the final procedure END', () => {
    const lines = ['CREATE PROCEDURE dbo.usp_Check', 'AS', 'BEGIN', '\\tSELECT CASE', '\\t\\tWHEN 1 = 1 THEN 1', 'END;', 'END;'];
    expect(sqlIndentationIssues(lines.join('\n'))).toEqual(['END;']);
    lines[5] = '\\tEND;';
    expect(sqlIndentationIssues(lines.join('\n'))).toEqual([]);
  });
  it('SQL inside run-flow steps keeps the N prefix and MDX-safe indentation', () => {
    for (const f of files) for (const m of f.body.matchAll(/(?:\bsql:\s*|\bquery=\{)`([\s\S]*?)`/g)) {
      expect(findUnprefixedUnicodeStrings(m[1]), f.slug).toEqual([]);
      expect(m[1].split(/\r?\n/).filter(l => /^\s+\S/.test(l)), f.slug).toEqual([]);
    }
  });
  it('no lesson still has TODO-CONTENT', () => {
    for (const f of files) expect(f.body.includes('TODO-CONTENT'), f.slug).toBe(false);
  });
  it('summary lessons have no SQL, result or message blocks', () => {
    for (const f of files) {
      if ((f.data as { kind: string }).kind === 'summary') expect(/<(Sql|Result|Messages|RunFlow)\b/.test(f.body), f.slug).toBe(false);
    }
  });
});

describe('lesson 1.1 is the approved narrative reference', () => {
  const lesson = readLessonFiles().find(f => f.slug === '1-1-database-la-gi')!;
  it('answers the opening request inside the main section without a SQL preview or a separate answer section', () => {
    const main = lessonMainSection(lesson.body);
    expect(main).not.toBe('');
    for (const s of ['quyết định chuyển phòng', 'ngày hiệu lực', 'người có quyền', 'cùng nguồn, cùng thời điểm, cùng điều kiện lọc', 'bản của chị Hạnh đúng']) {
      expect(main, s).toContain(s);
    }
    expect(lesson.body).not.toMatch(/^## (Với Excel|Làm bằng SQL)$|^### Trả lời chị Hạnh$|<(Sql|Result|RunFlow)\b|^\|/m);
    expect((lesson.data as { minutes: number }).minutes).toBe(12);
  });
  it('explains result row numbers in 1.6 without pointing to the removed preview', () => {
    const next = readLessonFiles().find(f => f.slug === '1-6-cau-select-dau-tien')!.body;
    expect(next).not.toContain('bên trái (bài 1.1)');
    expect(next).toContain('số thứ tự dòng của kết quả');
  });
});

describe('fixes from the review of lessons 1.2 to 1.6 (2026-10-19)', () => {
  const check = (slug: string, present: string[], absent: string[]) => {
    const f = readLessonFiles().find(x => x.slug === slug)!;
    const text = JSON.stringify(f.data) + f.body;
    for (const s of absent) expect(text, `${slug} still says: ${s}`).not.toContain(s);
    for (const s of present) expect(text, `${slug} lacks: ${s}`).toContain(s);
  };
  it('1.2 scopes the undo promise and the 40613 advice, and says what to send when stuck', () => check('1-2-sql-server-ssms-hrm-demo',
    ['Azure SQL Database', 'chỉ có trên trang bài tập', 'gửi nguyên văn lỗi', 'thứ tự dòng'],
    ['không bao giờ bị đổi', 'thường chỉ gửi ba', 'Lỗi này nghĩa là database đang thức dậy', 'Câu lệnh luôn chạy', 'Database thì không có file nào']));
  it('1.3 separates a rejected value from a converted one that changed meaning', () => check('1-3-bang-cot-kieu-du-lieu',
    ['DATEFORMAT', 'byte (đơn vị lưu trữ)', 'dấu cách ở cuối', 'Lưu được chưa chắc đã đúng ý'],
    ['dữ liệu sai loại sẽ bị từ chối', 'Chữ không dấu, tối đa n ký tự', 'nhận bất cứ thứ gì', 'như ô bắt buộc nhập', 'nghĩa là người đó đang làm', 'không còn bị lệch kiểu', 'cần đổi định dạng gì']));
  it('1.4 does not turn a way past the foreign key into the business answer', () => check('1-4-khoa-chinh-khoa-ngoai',
    ['2 người đã nghỉ', 'không nhận NULL', 'chính bảng đó', 'UNIQUE', 'không phải ô chọn trên màn hình'],
    ['trước hết phải chuyển 10 người', 'không bao giờ thiếu', 'Đó chính là khóa chính và khóa ngoại', 'không trùng, không trống', 'dữ liệu ghi từ đâu cũng bị kiểm']));
  it('1.5 explains fan-out and scopes the department to the value stored now', () => check('1-5-doc-so-do-erd',
    ['phòng ban đang lưu', '0, 1 hoặc nhiều', 'tối đa một dòng lương', '`NV021` có ba hợp đồng', 'bài 3.5'],
    ['Sheet nào cũng tra theo mã NV', 'Bảng chứa cột này là phía "nhiều"', 'Một người có một dòng lương mỗi kỳ', 'gần như tự viết ra', 'khỏi hỏi lại', 'NV001 có 19 ngày công']));
  it('1.6 calls the run order logical and does not say a SELECT never writes', () => check('1-6-cau-select-dau-tien',
    ['SELECT INTO', 'tối đa 10 dòng', 'thứ tự logic', 'không phải 10 dòng đã bị sửa'],
    ['không bao giờ làm đổi dữ liệu', 'Đây luôn là việc làm đầu tiên', 'vì dữ liệu đang nằm theo thứ tự mã', 'Đó là những thông tin chị Hạnh cần', 'Chỉ nhìn 10 dòng đầu']));
  it('the 1.6 exercises name the employee code, not a person', () => {
    const text = readFileSync(join('src', 'content', 'exercises', '1-6-cau-select-dau-tien.yaml'), 'utf8');
    // The column list sits in the "Kết quả cần" box of the exercise page, so the prompt no longer spells it out.
    for (const s of ['người ký', 'người nghỉ']) expect(text).not.toContain(s);
  });
  it('every concept lesson ends with at least three self-check questions', () => {
    for (const f of readLessonFiles()) {
      if (!(f.data as { noExercises?: boolean }).noExercises) continue;
      expect(f.body, f.slug).toContain('**Tự kiểm tra trước khi bấm "Đã học xong":**');
      expect((f.body.match(/<details>/g) ?? []).length, f.slug).toBeGreaterThanOrEqual(3);
    }
  });
  it('level 1 snippets that write data or are not whole statements have no copy button', () => {
    for (const f of readLessonFiles()) {
      if ((f.data as { level: number }).level !== 1) continue;
      for (const m of f.body.matchAll(/<Sql\b([^>]*?)code=\{`([\s\S]*?)`\}([^>]*?)\/>/g)) {
        if (!/\b(INSERT|UPDATE|DELETE)\b|\.\.\.|tên bảng/.test(m[2])) continue;
        expect(m[1] + m[3], `${f.slug}: ${m[2].slice(0, 40)}`).toContain('copy={false}');
      }
    }
  });
});

describe('lessons explain why, show data before totals and mark what they point at (2026-10-19)', () => {
  const level1 = () => readLessonFiles().filter(f => (f.data as { level: number }).level === 1);
  const body = (slug: string) => readLessonFiles().find(f => f.slug === slug)!.body;
  const theory = (b: string) => {
    const main = lessonMainSection(b);
    return main.split(/\r?\n/, 1)[0] === 'Làm bằng SQL'
      ? main.split('### Lý thuyết cơ bản')[1]?.split(/\n### /)[0] ?? ''
      : main;
  };
  const lineMapRows = (b: string) => [...b.matchAll(/<LineMap rows=\{\[([\s\S]*?)\]\} \/>/g)].flatMap(m => m[1].split(/\n\s*\[/).slice(1));
  it('level 1 queries show rows, not totals: aggregates wait for lesson 3.1', () => {
    for (const f of level1()) for (const m of f.body.matchAll(/(?:\bcode=\{|\bquery=\{|\bsql:\s*)`([\s\S]*?)`/g)) {
      expect(m[1], f.slug).not.toMatch(/\b(COUNT|SUM|AVG|MIN|MAX)\s*\(|\bGROUP\s+BY\b/i);
    }
  });
  it('level 1 theory explains instead of asking, and says which later lesson goes deeper', () => {
    for (const f of level1()) {
      const main = lessonMainSection(f.body);
      const legacy = main.split(/\r?\n/, 1)[0] === 'Làm bằng SQL';
      const t = (legacy ? theory(f.body) : main).replace(/`[^`]*`/g, '').replace(/gửi IT: “[^”]+”/g, 'mẫu tin nhắn IT');
      expect(t, f.slug).not.toContain('?');
      expect(t, f.slug).toMatch(/bài [2-6]\.\d+/);
    }
  });
  it('each LineMap row gives a concrete example; narrative lessons choose whether they need this block', () => {
    for (const f of readLessonFiles()) {
      if ((f.data as { kind: string }).kind !== 'full') continue;
      const legacy = lessonMainSection(f.body).split(/\r?\n/, 1)[0] === 'Làm bằng SQL';
      const checkedLegacy = ['1.2', '1.3', '1.4', '1.5', '1.6'].includes((f.data as { num: string }).num);
      if (legacy && !checkedLegacy) continue;
      const rows = lineMapRows(f.body);
      if (legacy) expect(rows.length, f.slug).toBeGreaterThan(0);
      for (const r of rows) expect(r, `${f.slug}: ${r.slice(0, 30)}`).toContain('Ví dụ');
    }
  });
  it('1.3 says where the conversion comes from', () => {
    expect(theory(body('1-3-bang-cot-kieu-du-lieu'))).toContain('chuyển kiểu ngầm');
  });
  it('1.4 lists the records that still point to VH instead of only counting them', () => {
    const b = body('1-4-khoa-chinh-khoa-ngoai');
    for (const s of ['NV033', 'NV041', "WHERE MaPB = 'VH'", '2 người đã nghỉ']) expect(b).toContain(s);
  });
  it('the SSMS pictures, the results, the sheets and the diagram mark what the text points at', () => {
    expect(body('1-2-sql-server-ssms-hrm-demo')).toMatch(/<Ssms[^>]*table="PhongBan"[^>]*mark=/);
    expect(body('1-3-bang-cot-kieu-du-lieu')).toMatch(/<Ssms[^>]*table="HopDong"[^>]*mark=/);
    expect(body('1-4-khoa-chinh-khoa-ngoai')).toMatch(/<Ssms[^>]*table="NhanVien"[^>]*mark=/);
    expect(body('1-4-khoa-chinh-khoa-ngoai')).toMatch(/<Result[^>]*mark=/);
    expect(body('1-5-doc-so-do-erd')).toMatch(/<Erd[^>]*path=/);
    expect(body('1-1-database-la-gi')).toMatch(/<Excel[^>]*mark=/);
    expect(body('1-3-bang-cot-kieu-du-lieu')).toMatch(/<Excel[^>]*mark=/);
  });
});

describe('fixes from the independent reviews of 2026-10-19', () => {
  const check = (slug: string, present: string[], absent: string[]) => {
    const f = readLessonFiles().find(x => x.slug === slug)!;
    const text = JSON.stringify(f.data) + f.body;
    for (const s of absent) expect(text, `${slug} still says: ${s}`).not.toContain(s);
    for (const s of present) expect(text, `${slug} lacks: ${s}`).toContain(s);
  };
  it('1.1 scopes constraints and shared-data safety without teaching SSMS early', () => check('1-1-database-la-gi',
    ['Khi ràng buộc đang bật', 'chỉ đọc dữ liệu', 'thêm, sửa hoặc xóa dữ liệu', 'mỗi mã tối đa một dòng', 'một ngày hợp lệ vẫn có thể sai hồ sơ', 'T-SQL', 'constraint', 'thống nhất chưa chắc đã đúng'],
    ['Mỗi khi có thao tác ghi dữ liệu', 'mỗi người một mã', '(ba dòng, lấy từ bộ dữ liệu mẫu)', 'kiểm quan hệ dữ liệu mỗi khi ghi', 'file xuất tĩnh', 'cột chưa chuẩn hóa']));
  it('1.2 preserves the connection workflow and safe practice on the shared and local databases', () => check('1-2-sql-server-ssms-hrm-demo',
    ['chỉ chạy trên Windows', '1433', 'Disconnect', '**User Name**', '**Encrypt**', 'Connection Properties', 'Connect to database',
      'Edit Top 200 Rows', 'localhost', 'HRM_Demo đã sẵn sàng', 'Windows Authentication', 'mỗi lần một câu lệnh', 'xóa và tạo lại',
      'không có cột trạng thái', '`Ban Giám đốc`', '`Vận hành`'],
    ['như địa chỉ một căn phòng', 'giá trị trống (NULL)', 'Từ bài 1.6, cuối mỗi bài có mục', '- **Server type**', 'Developer đủ tính năng']));
  it('1.3 keeps the import assumption, the cell outcomes and the limits of type validation', () => check('1-3-bang-cot-kieu-du-lieu',
    ['Giả định của tình huống', 'Chuỗi rỗng', 'Database làm gì', 'numeric={', 'không dùng để cộng trừ',
      '`C2`', '`C3`', '`C4`', '`D2`', '`D3`', '`D4`', '`2024-01-02`', '`2024-02-01`', '`9610000`', '`9610001`', '`21.3`',
      '`NOT NULL`', '`nvarchar', 'Format Cells'],
    ['có người gõ 2024-02-01', 'giá trị trống, chưa có', 'mọi phép so sánh thành so sánh chữ', 'Bên IT nói đúng một nửa', 'một việc riêng của người quản trị', 'không lẻ giây', 'hàm ngày và `CAST` ở bài 2.8']));
  it('1.4 preserves key semantics, the delete error and the business decisions it cannot make', () => check('1-4-khoa-chinh-khoa-ngoai',
    ['Giả định của tình huống', '`NhanVien.MaCD` trỏ sang `ChucDanh.MaCD`', 'REFERENCE constraint', '**Keys**',
      '`NO ACTION`', 'ràng buộc đang bật', 'nạp hàng loạt', 'không nhận `NULL`', 'không tự đổi `MaQuanLy` hoặc `MaCD`',
      'chỉ lưu phòng hiện tại', 'ngừng cho chọn', 'không có ràng buộc `UNIQUE`'],
    ['Đây chính là lỗi bên IT gặp', 'thay cho kiểm ở từng màn hình', 'nghỉ từ 2026-06-30', 'các hồ sơ con']));
  it('1.5 preserves the relation direction, composite-key cardinality and diagram limits without a JOIN preview', () => check('1-5-doc-so-do-erd',
    ['chỉ lấy dòng đầu tiên', 'Data Model', 'thực thể', 'chấm tròn', 'một-một', 'cả cặp', 'Từ bảng `PhongBan`', 'Từ bảng `NhanVien`', 'thuộc đúng một phòng ban', 'không ghi cột nào nhận `NULL`',
      '`BangLuong.MaNV` → `NhanVien.MaNV`', '`NhanVien.MaPB` → `PhongBan.MaPB`', '`KyLuong` là `2026-09`',
      'không tự cài/lưu sơ đồ', 'bài 5.1', 'không có đường nối', 'bài 6.6'],
    ['vì câu bắt đầu từ bảng lương', 'Azure SQL Database không có', 'cũng là cả khóa chính', 'nên phải xem thêm', '21 người là Chuyên viên', 'Đây là sơ đồ, cũng là sơ đồ',
      'mỗi thông tin chỉ nằm ở một chỗ', 'được khai báo đủ', 'cặp NV001 và ngày 2026-09-01', 'bài 3.4 và 3.5 sẽ học']));
  it('1.6 counts records not people, keeps the run advice safe, answers the small whys and closes the scenario without personal data', () => check('1-6-cau-select-dau-tien',
    ['48 dòng, mỗi dòng một hồ sơ', 'Bôi đen lại trọn câu', 'mỗi lần chỉ nhận một câu', 'là ghi chú', 'bài 6.1', 'SoCCCD',
      'đánh lại mỗi lần chạy', 'Copy with Headers', 'Select Top 1000 Rows',
      'mã phòng ban, mã chức danh', 'có thể toàn là dòng cũ', 'bài 2.2', 'bài 4.6', 'Ô có viền xanh', 'Parse',
      // Learner review of 2026-10-20: one place per idea, the Count row fixed, the scenario closed.
      'câu truy vấn (query)', 'Giả định của tình huống', 'chưa cho thấy một người đã nghỉ', 'Chạy (F5)', 'Sơ đồ database'],
    ['48 người, mỗi người một dòng', 'Bấm vào chỗ trống trong cửa sổ để bỏ bôi đen rồi chạy lại', 'sẽ học ở các bài sau', 'luật của từng cột xem ở Object Explorer',
      'Nhìn thanh trạng thái đếm số dòng', 'của 10 người là đủ', 'đó là 10 người nào', 'đếm ô có dữ liệu', 'Bài 2.1 sẽ dạy liệt kê', 'câu bắt đầu bằng WITH',
      'PhongBanCu', 'dừng đọc ngay khi đã đủ 10 dòng']));
  it('1.6 exercises ask for the whole table without hinting at a filter', () => {
    const y = readFileSync('src/content/exercises/1-6-cau-select-dau-tien.yaml', 'utf8');
    for (const s of ['hợp đồng lao động', 'kể cả những ô đang là NULL (để trống)']) expect(y, s).not.toContain(s);
    for (const s of ['kể cả hợp đồng thử việc', 'mọi loại nghỉ, mọi trạng thái']) expect(y, s).toContain(s);
  });
  it('pictures of Excel put real dates on the right', () => {
    for (const slug of ['1-1-database-la-gi', '1-3-bang-cot-kieu-du-lieu', '1-6-cau-select-dau-tien']) {
      expect(readLessonFiles().find(f => f.slug === slug)!.body, slug).toMatch(/<Excel[^>]*numeric=\{/);
    }
  });
});

describe('lessons 1.2 and 1.3 follow the approved narrative format (2026-10-20)', () => {
  const lesson = (num: string) => readLessonFiles().find(f => (f.data as { num: string }).num === num)!;
  it.each(['1.2', '1.3'])('%s explains and closes the scenario in its main section', num => {
    const f = lesson(num);
    expect(LEGACY_LAYOUT_SLUGS.has(f.slug)).toBe(false);
    expect(f.body).not.toMatch(/^## (Với Excel|Làm bằng SQL)$/m);
    expect(f.body).not.toContain('### Trả lời chị Hạnh');
    expect((f.body.match(/<details>/g) ?? []).length).toBeGreaterThanOrEqual(4);
    expect(lessonMainSection(f.body)).toContain('chị Hạnh');
  });
  it('1.2 keeps the working query and its result; 1.3 teaches types without SQL previews', () => {
    expect(lesson('1.2').body).toContain('SELECT * FROM PhongBan;');
    expect(lessonMainSection(lesson('1.2').body)).toContain('<Result');
    expect(lesson('1.3').body).not.toMatch(/<(Sql|Result|Messages|LineMap)\b/);
  });
});

describe('fixes from the final review', () => {
  const body = (slug: string) => readLessonFiles().find(f => f.slug === slug)!.body;
  it('1.1 makes no promise the database cannot keep, and separates valid from correct (review of 2026-10-19)', () => {
    const b = body('1-1-database-la-gi');
    for (const s of ['một bản duy nhất', 'không thể có chuyện', 'Excel để bạn gõ gì cũng được', 'từ chối ngay lúc nhập', 'luật cho từng cột']) expect(b, s).not.toContain(s);
    for (const s of ['Hợp lệ chưa chắc đã đúng', 'Data Validation', 'không phải ô chọn trên màn hình']) expect(b, s).toContain(s);
  });
  it('1.4 says a foreign key is a rule checked on write, not a dropdown', () => {
    expect(body('1-4-khoa-chinh-khoa-ngoai')).toContain('không phải ô chọn trên màn hình');
  });
  it('1.2 says what to do when the sleeping course database refuses the first connection', () => {
    expect(body('1-2-sql-server-ssms-hrm-demo')).toContain('40613');
  });
  it('1.6 warns that the Edit Top 200 Rows grid writes to the shared table', () => {
    expect(body('1-6-cau-select-dau-tien')).toContain('Edit Top 200 Rows');
  });
  it('the intro page never tells learners to run the script on the shared course database', () => {
    const page = readFileSync('src/pages/gioi-thieu.astro', 'utf8');
    expect(page).not.toContain('mở database bạn được cấp rồi chạy cả file script');
    expect(page).toContain('đừng chạy script');
  });
  it('3.6 checks both contract date bounds and permits an open-ended end date', () => {
    const query=lessonBlocks('3-6-ket-nhieu-bang').query;
    expect(query).toMatch(/hd\.NgayBatDau <= '20260930'/);
    expect(query).toMatch(/hd\.NgayKetThuc IS NULL OR hd\.NgayKetThuc >= '20260930'/);
    expect(query).not.toContain('GETDATE');
  });
  it('6.5 says to check @@TRANCOUNT in the same query window and not to commit on close', () => {
    expect(body('6-5-update-quen-where')).toContain('cùng cửa sổ');
    expect(body('6-5-update-quen-where')).toContain('chọn No');
  });
  it('6.5 links the related lessons', () => {
    for (const slug of ['6-3-backup-restore', '6-4-point-in-time-restore', '6-6-temporal-table']) {
      expect(body('6-5-update-quen-where')).toContain(`/microsoft-sql-lession/bai/${slug}/`);
    }
  });
  it('2.5 replaces a varchar NULL with COALESCE so Vietnamese text keeps its accents', () => {
    expect(body('2-5-null-o-trong')).not.toContain('ISNULL(Email');
    expect(body('2-5-null-o-trong')).toContain("COALESCE(Email, N'(chưa có)')");
  });
  it('3.5 run-order text gets the row arithmetic and the general rules right', () => {
    const b = body('3-5-left-join');
    const join=lessonBlocks('3-5-left-join').steps[1];
    expect(join.total).toBe(57);
    expect(join.rows.filter(r=>r[0]==='NV021')).toHaveLength(3);
    expect(join.rows.filter(r=>r[2]===null).map(r=>r[0])).toEqual(['NV047','NV048']);
    expect(b).not.toContain('Tôn Thất Long có ba hợp đồng nên có ba dòng, vì vậy');
    expect(b).not.toContain('là bước cuối cùng');
    expect(b).not.toContain('ở dòng thứ hai');
  });
  it('3.5 run-order text says "kết bảng" for JOIN, like the rest of the course', () => {
    expect(body('3-5-left-join')).not.toMatch(/ghép/i);
    expect(lessonBlocks('3-5-left-join').steps[1].clause).toBe('LEFT JOIN');
    expect(body('3-5-left-join')).toMatch(/\*\*kết bảng\*\*/i);
  });
  it('3.5 shows the run order of its final query', () => {
    expect(body('3-5-left-join')).toContain('### SQL Server chạy câu này thế nào');
    expect(body('3-5-left-join')).toContain('<RunFlow');
  });
  it('summaries state the corrected facts', () => {
    expect(body('1-5-doc-so-do-erd')).toContain('`NhanVien.MaPB` → `PhongBan.MaPB`');
    expect(body('1-5-doc-so-do-erd')).toMatch(/không tự cài\/lưu sơ đồ vào database (?:chung|khóa học)/);
    expect(body('1-5-doc-so-do-erd')).not.toMatch(/<(Sql|Result|RunFlow)\b/);
    expect(body('5-2-rang-buoc-du-lieu')).toContain('BULK INSERT');
    expect(body('6-6-temporal-table')).toContain('UTC');
  });
});

describe('lessons stay short (docs/quy-uoc.md, section 1)', () => {
  it('no paragraph or list item of a full lesson runs past 120 words', () => {
    const long = readLessonFiles()
      .filter(f => (f.data as { kind: string }).kind === 'full')
      .flatMap(f => proseParagraphs(f.body).filter(p => p.words > 120).map(p => `${f.slug} (${p.words}): ${p.text.slice(0, 60)}`));
    expect(long).toEqual([]);
  });
  it('counts paragraphs outside components only', () => {
    const body = ['Một hai ba.', '', '<LineMap rows={[', "  ['a', 'b c d'],", ']} />', '', '1. **Lỗi.** Bốn năm.', '2. Sáu.', '', '| a | b |'].join('\n');
    expect(proseParagraphs(body).map(p => p.words)).toEqual([3, 3, 1]);
  });
});
