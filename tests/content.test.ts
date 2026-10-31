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

// Frozen migration list: existing lessons may keep their old layout until edited; new full lessons use the narrative format.
const LEGACY_LAYOUT_SLUGS = new Set([
  '6-5-update-quen-where',
]);

// Frozen migration list: lessons with a query keep the old subsections until each one is edited; remove a lesson when it moves to two.
const PENDING_TWO_SUBSECTIONS = new Set([
  '3-1-count-sum-avg', '3-2-group-by-pivottable', '3-3-having-loc-sau-khi-gop',
  '3-4-inner-join-vlookup', '3-5-left-join', '3-6-ket-nhieu-bang',
  '3-7-self-join-quan-ly', '3-8-union-gop-danh-sach', '3-9-subquery',
  '3-10-dem-co-dieu-kien', '4-1-cte-tung-buoc', '4-2-xep-hang-row-number-rank',
  '4-3-luy-ke-so-thang-truoc', '4-4-pivot-xoay-bang', '4-6-soi-chat-luong-du-lieu',
]);

describe('lesson files', () => {
  const files = readLessonFiles();
  it('every frontmatter passes the schema', () => {
    for (const f of files) expect(lessonSchema.safeParse(f.data).success, f.slug).toBe(true);
  });
  it('matches the 50 lessons of the design (num, area, kind)', () => {
    expect(readCatalog().map(e => `${e.num} ${e.area}${e.kind === 'full' ? ' full' : ''}`)).toEqual(EXPECTED);
  });
  it('passes the catalog rules', () => expect(validateCatalog(readCatalog())).toEqual([]));
  it('has 7, 6, 3, 6, 9, 6, 6, 7 lessons in areas A1..A8', () => {
    const count = (a: string) => readCatalog().filter(e => e.area === a).length;
    expect(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'].map(count)).toEqual([7, 6, 3, 6, 9, 6, 6, 7]);
  });
  it('uses exactly the section headings of its kind, in order', () => {
    for (const f of files) {
      const { kind, noExercises, noScenario } = f.data as { kind: 'full' | 'summary'; noExercises?: boolean; noScenario?: boolean };
      const h2 = [...f.body.matchAll(/^## (.+?)\s*$/gm)].map(m => m[1]);
      const mainTitle = noScenario ? h2[0] : h2[1];
      if (kind === 'summary') {
        expect(h2, f.slug).toEqual(sectionHeadings(kind, noExercises));
      } else if (h2[1] === 'Với Excel') {
        expect(LEGACY_LAYOUT_SLUGS.has(f.slug), `${f.slug}: new full lessons must use the narrative format`).toBe(true);
        expect(h2, f.slug).toEqual(sectionHeadings(kind, noExercises));
      } else {
        expect(mainTitle ?? '', `${f.slug}: needs a descriptive main-section title`).not.toBe('');
        expect([...SECTION_HEADINGS.full, ...SECTION_HEADINGS.summary], f.slug).not.toContain(mainTitle);
        expect(h2, f.slug).toEqual(sectionHeadings(kind, noExercises, mainTitle, noScenario));
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
      if (PENDING_TWO_SUBSECTIONS.has(f.slug) && f.body.includes('<RunFlow')) expect(h3.slice(-2), f.slug).toEqual(['Câu lệnh cho tình huống', 'SQL Server chạy câu này thế nào']);
    }
  });
  it('lessons with a query go Excel, statement, its parts, then run order, result, answer', () => {
    for (const f of files) {
      const h3 = sqlSubheadings(f.body);
      if (PENDING_TWO_SUBSECTIONS.has(f.slug)) {
        expect(h3.length, `${f.slug}: moved to two subsections, take it off the pending list`).toBeGreaterThan(2);
        continue;
      }
      if (!h3.includes('SQL Server chạy câu này thế nào') && !h3.includes('Kết quả cho tình huống')) continue;
      expect(h3, f.slug).toHaveLength(2);
      // The learner sees the statement first, then its parts; the scenario is the only example.
      const main = lessonMainSection(f.body);
      const [first, second] = main.split(/^### /m).slice(1);
      expect(main.match(/<Sql\b/g), f.slug).toHaveLength(1);
      expect(first.indexOf('<Excel'), f.slug).toBeLessThan(first.indexOf('<Sql'));
      expect(first.indexOf('<Sql'), f.slug).toBeLessThan(first.indexOf('<LineMap'));
      expect(main.replace(/<RunFlow[\s\S]*?\]\} \/>/, '').replace(/<Sql\b[\s\S]*?\/>/, ''), f.slug).not.toMatch(/`SELECT [^`]*`/);
      expect(second, f.slug).not.toContain('<Messages');
      if (second.includes('<RunFlow')) expect(second.indexOf('<RunFlow'), f.slug).toBeLessThan(second.indexOf('<Result'));
      expect(second.slice(second.lastIndexOf('<Result')), f.slug).toContain('chị Hạnh');
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
  it('drops the scenario only for a foundation lesson', () => {
    expect(sectionHeadings('full', true, 'Bảng, dòng và cột', true)).toEqual(['Bảng, dòng và cột', 'Hay nhầm ở đâu', 'Ứng dụng', 'Ghi nhớ']);
  });
  it('finds the main section with or without a scenario, and in a summary', () => {
    expect(lessonMainSection(['## Bảng và cột', 'Giải thích.', '## Hay nhầm ở đâu', 'Lỗi.'].join('\n'))).toContain('Giải thích.');
    expect(lessonMainSection(['## Tình huống', 'Yêu cầu.', '## Lọc danh sách', 'Giải thích.'].join('\r\n'))).toContain('Giải thích.');
    expect(lessonMainSection(['## Nội dung chính', 'Ý.', '## Liên hệ Excel', 'Đoạn.'].join('\n'))).toContain('Đoạn.');
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
    expect(h2).toEqual(['Khóa học này dạy gì', 'Chọn nơi thực hành', 'Cách dùng trang', '6 level', 'Kết nối bằng SSMS', 'Database mẫu HRM_Demo', 'Khi không kết nối được', 'Tiến độ của bạn được lưu ở đâu']);
  });
  it('lesson SQL uses escaped tabs instead of literal leading whitespace that MDX strips', () => {
    for (const f of files) for (const m of f.body.matchAll(/<Sql[^>]*code=\{`([\s\S]*?)`\}/g)) {
      const lines = m[1].split(/\r?\n/);
      expect(lines.filter(l => /^\s+\S/.test(l)), f.slug).toEqual([]);
      for (const [i, line] of lines.entries()) {
        if (i > 0 && (lines[i - 1].trimEnd().endsWith(',') || /^(?:\\t)*(?:AND|OR|WHEN|ELSE|END)\b/.test(line))) {
          expect(line.startsWith('\\t'), `${f.slug}: ${line}`).toBe(true);
        }
      }
    }
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

describe('foundation lessons have no scenario and stay short (2026-10-30)', () => {
  const foundation = () => readLessonFiles().filter(f => (f.data as { noScenario?: boolean }).noScenario);
  it('are lessons 1.1 to 1.5', () => {
    expect(foundation().map(f => (f.data as { num: string }).num).sort()).toEqual(['1.1', '1.2', '1.3', '1.4', '1.5']);
  });
  it('have no scenario, enough self-checks and the agreed length', () => {
    for (const f of foundation()) {
      expect(f.body, f.slug).not.toMatch(/^## Tình huống|<Chat\b|<Key\b|chị Hạnh|chị Thảo|\bQuân\b/m);
      expect((f.body.match(/<details>/g) ?? []).length, f.slug).toBeGreaterThanOrEqual(3);
      expect((f.data as { minutes: number }).minutes, f.slug).toBe(7);
      expect(proseParagraphs(f.body).reduce((sum, p) => sum + p.words, 0), f.slug).toBeLessThanOrEqual(800);
    }
  });
  it('1.1 separates the four names and says where practice starts', () => {
    const main = lessonMainSection(readLessonFiles().find(f => f.slug === '1-1-database-la-gi')!.body);
    for (const s of ['**Database**', '**SQL Server**', '**SQL**', '**SSMS**', '**luật dữ liệu**', 'gioi-thieu/#chon-noi-thuc-hanh', 'bài 2.1']) {
      expect(main, s).toContain(s);
    }
    expect(main).not.toMatch(/<(Sql|Result|RunFlow)\b/);
    expect(main.slice(0, main.indexOf('Ở bài này chỉ cần'))).not.toMatch(/khóa chính|khóa ngoại|ràng buộc|constraint|câu ghi|NULL/i);
  });
  it('every link to a section of the intro page has its target', () => {
    const page = readFileSync('src/pages/gioi-thieu.astro', 'utf8');
    const sources = [...readLessonFiles().map(f => f.body), readFileSync('src/components/islands/ExerciseWorkspace.tsx', 'utf8')];
    const fromElsewhere = sources.flatMap(s => [...s.matchAll(/gioi-thieu\/#([a-z-]+)/g)].map(m => m[1]));
    expect(fromElsewhere.length).toBeGreaterThanOrEqual(4);
    const fromPage = [...page.matchAll(/href="#([a-z-]+)"/g)].map(m => m[1]);
    for (const id of [...fromElsewhere, ...fromPage]) expect(page, id).toContain(`id="${id}"`);
  });
  it('explains result row numbers on the intro page without pointing to the removed preview', () => {
    const page = readFileSync('src/pages/gioi-thieu.astro', 'utf8');
    expect(page).not.toContain('bên trái (bài 1.1)');
    expect(page).toContain('số thứ tự dòng của kết quả');
  });
});

describe('fixes from the review of lessons 1.2 to 1.6 (2026-10-19)', () => {
  const check = (slug: string, present: string[], absent: string[]) => {
    const f = readLessonFiles().find(x => x.slug === slug)!;
    const text = JSON.stringify(f.data) + f.body;
    for (const s of absent) expect(text, `${slug} still says: ${s}`).not.toContain(s);
    for (const s of present) expect(text, `${slug} lacks: ${s}`).toContain(s);
  };
  it('the intro page scopes the undo promise and the 40613 advice, and says what to send when stuck', () => {
    const page = readFileSync('src/pages/gioi-thieu.astro', 'utf8');
    for (const s of ['Azure SQL Database', 'chỉ có trên trang bài tập', 'gửi nguyên văn lỗi', 'thứ tự dòng']) expect(page, s).toContain(s);
    for (const s of ['không bao giờ bị đổi', 'thường chỉ gửi ba', 'Lỗi này nghĩa là database đang thức dậy', 'Câu lệnh luôn chạy']) expect(page, s).not.toContain(s);
  });
  it('1.3 separates a rejected value from a converted one that changed meaning', () => check('1-3-kieu-du-lieu',
    ['chuyển kiểu ngầm', 'Lưu được chưa chắc đã đúng ý'],
    ['dữ liệu sai loại sẽ bị từ chối', 'Chữ không dấu, tối đa n ký tự', 'nhận bất cứ thứ gì', 'như ô bắt buộc nhập', 'nghĩa là người đó đang làm', 'không còn bị lệch kiểu', 'cần đổi định dạng gì']));
  it('1.4 does not turn a way past the foreign key into the business answer', () => check('1-4-khoa-chinh-khoa-ngoai',
    ['không nhận NULL', 'không phải ô chọn trên màn hình'],
    ['trước hết phải chuyển 10 người', 'không bao giờ thiếu', 'Đó chính là khóa chính và khóa ngoại', 'không trùng, không trống', 'dữ liệu ghi từ đâu cũng bị kiểm']));
  it('1.5 explains fan-out and scopes the department to the value stored now', () => check('1-5-doc-so-do-erd',
    ['phòng ban đang lưu', 'không bắt phòng nào cũng phải có người', 'tối đa một dòng lương', '`NV021` có ba hợp đồng'],
    ['Sheet nào cũng tra theo mã NV', 'Bảng chứa cột này là phía "nhiều"', 'Một người có một dòng lương mỗi kỳ', 'gần như tự viết ra', 'khỏi hỏi lại', 'NV001 có 19 ngày công']));
  it('2.1 calls the run order logical and scopes TOP, and the intro page says a SELECT can still write', () => {
    check('2-1-chon-cot-dat-ten-cot',
      ['thứ tự xử lý logic', 'được cấp quyền đọc'],
      ['không bao giờ làm đổi dữ liệu', 'Đây luôn là việc làm đầu tiên', 'vì dữ liệu đang nằm theo thứ tự mã', 'Chỉ nhìn 5 dòng đầu']);
    const page = readFileSync('src/pages/gioi-thieu.astro', 'utf8');
    for (const s of ['SELECT INTO', 'không phải <code>48</code> dòng đã bị sửa']) expect(page, s).toContain(s);
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
      const checkedLegacy = ['1.2', '1.3', '1.4', '1.5'].includes((f.data as { num: string }).num);
      if (legacy && !checkedLegacy) continue;
      const rows = lineMapRows(f.body);
      if (legacy) expect(rows.length, f.slug).toBeGreaterThan(0);
      for (const r of rows) expect(r, `${f.slug}: ${r.slice(0, 30)}`).toContain('Ví dụ');
    }
  });
  it('1.3 says where the conversion comes from', () => {
    expect(theory(body('1-3-kieu-du-lieu'))).toContain('chuyển kiểu ngầm');
  });
  it('the SSMS pictures, the results, the sheets and the diagram mark what the text points at', () => {
    expect(readFileSync('src/pages/gioi-thieu.astro', 'utf8')).toMatch(/<Ssms[^>]*table="PhongBan"[^>]*mark=/);
    expect(body('1-3-kieu-du-lieu')).toMatch(/<Ssms[^>]*table="HopDong"[^>]*mark=/);
    expect(body('1-4-khoa-chinh-khoa-ngoai')).toMatch(/<Ssms[^>]*table="NhanVien"[^>]*mark=/);
    expect(body('1-5-doc-so-do-erd')).toMatch(/<Erd[^>]*path=/);
  });
});

describe('fixes from the independent reviews of 2026-10-19', () => {
  const check = (slug: string, present: string[], absent: string[]) => {
    const f = readLessonFiles().find(x => x.slug === slug)!;
    const text = JSON.stringify(f.data) + f.body;
    for (const s of absent) expect(text, `${slug} still says: ${s}`).not.toContain(s);
    for (const s of present) expect(text, `${slug} lacks: ${s}`).toContain(s);
  };
  it('1.1 scopes the data rules', () => check('1-1-database-la-gi',
    ['Khi luật đang bật', 'hợp lệ chưa chắc đã đúng', 'máy chủ'],
    ['Mỗi khi có thao tác ghi dữ liệu', 'mỗi người một mã', '(ba dòng, lấy từ bộ dữ liệu mẫu)', 'kiểm quan hệ dữ liệu mỗi khi ghi', 'file xuất tĩnh', 'cột chưa chuẩn hóa']));
  it('the intro page preserves the connection workflow and safe practice on the shared and local databases', () => {
    const page = readFileSync('src/pages/gioi-thieu.astro', 'utf8');
    for (const s of ['chỉ chạy trên Windows', '1433', 'Disconnect', '<strong>User Name</strong>', '<strong>Encrypt</strong>', 'Connection Properties', 'Connect to database',
      'Edit Top 200 Rows', 'localhost', 'HRM_Demo đã sẵn sàng', 'Windows Authentication', 'mỗi lần một câu lệnh', 'xóa và tạo lại', 'SELECT * FROM PhongBan;', 'id="ket-noi-ssms"', 'id="tao-ban-rieng"']) {
      expect(page, s).toContain(s);
    }
    for (const s of ['như địa chỉ một căn phòng', 'Developer đủ tính năng', 'bài 1.2', '1-2-sql-server']) expect(page, s).not.toContain(s);
  });
  it('1.3 keeps the three outcomes of a conversion and the limits of type validation', () => check('1-3-kieu-du-lieu',
    ['Chuỗi rỗng', 'không dùng để cộng trừ', '`2024-01-02`', '`9610000`', '`21.3`', '`decimal(p,s)`',
      '`NOT NULL`', '`nvarchar', 'Format Cells', '`2099-03-01`', 'số âm', "N'Trần Thị Mai'"],
    ['có người gõ 2024-02-01', 'giá trị trống, chưa có', 'mọi phép so sánh thành so sánh chữ', 'Bên IT nói đúng một nửa', 'một việc riêng của người quản trị', 'không lẻ giây', 'hàm ngày và `CAST` ở bài 2.8']));
  it('1.4 preserves key semantics and what a key cannot check', () => check('1-4-khoa-chinh-khoa-ngoai',
    ['ràng buộc đang bật', 'không nhận `NULL`', 'chưa có ràng buộc cấm trùng', 'trỏ về chính `NhanVien.MaNV`',
      'khóa chính (primary key)', 'Khóa ngoại (foreign key)', 'ràng buộc (constraint)', 'luật dữ liệu đã nói ở bài 1.1'],
    ['Đây chính là lỗi bên IT gặp', 'thay cho kiểm ở từng màn hình', 'nghỉ từ 2026-06-30', 'các hồ sơ con']));
  it('1.5 preserves the relation direction, composite-key cardinality and diagram limits without a JOIN preview', () => check('1-5-doc-so-do-erd',
    ['chấm tròn', 'một-một', 'cả cặp', 'Từ bảng `PhongBan`', 'Từ bảng `NhanVien`', 'thuộc đúng một phòng ban',
      '`BangLuong.MaNV` → `NhanVien.MaNV`', '`NhanVien.MaPB` → `PhongBan.MaPB`', 'không tự cài/lưu sơ đồ', 'không có đường nối'],
    ['vì câu bắt đầu từ bảng lương', 'Azure SQL Database không có', 'cũng là cả khóa chính', 'nên phải xem thêm', '21 người là Chuyên viên', 'Đây là sơ đồ, cũng là sơ đồ',
      'mỗi thông tin chỉ nằm ở một chỗ', 'được khai báo đủ', 'cặp NV001 và ngày 2026-09-01', 'bài 3.4 và 3.5 sẽ học']));
  it('2.1 counts records not people, closes the scenario and keeps the first-run advice', () => {
    check('2-1-chon-cot-dat-ten-cot',
      ['48 hồ sơ', 'mỗi lần chỉ nhận một câu', 'bài 6.1', 'SoCCCD', 'Copy with Headers',
        'bài 2.2', 'câu truy vấn (query)', 'Giả định của tình huống', 'Sơ đồ database'],
      ['48 người, mỗi người một dòng', 'sẽ học ở các bài sau', 'của 10 người là đủ', 'đó là 10 người nào', 'PhongBanCu', 'Select Top 1000 Rows']);
    const page = readFileSync('src/pages/gioi-thieu.astro', 'utf8');
    for (const s of ['bôi đen', 'Parse', 'đánh lại mỗi lần chạy', 'Chạy (F5)', 'id="doc-ket-qua"']) expect(page, s).toContain(s);
  });
  it('2.1 exercise 1 asks for the whole table without hinting at a filter', () => {
    const y = readFileSync('src/content/exercises/2-1-chon-cot-dat-ten-cot.yaml', 'utf8');
    for (const s of ['hợp đồng lao động', 'kể cả những ô đang là NULL (để trống)', 'người ký', 'người nghỉ']) expect(y, s).not.toContain(s);
    expect(y).toContain('kể cả hợp đồng thử việc');
  });
  it('pictures of Excel put real dates on the right', () => {
    for (const slug of ['2-1-chon-cot-dat-ten-cot']) {
      expect(readLessonFiles().find(f => f.slug === slug)!.body, slug).toMatch(/<Excel[^>]*numeric=\{/);
    }
  });
});

describe('fixes from the final review', () => {
  const body = (slug: string) => readLessonFiles().find(f => f.slug === slug)!.body;
  it('1.1 makes no promise the database cannot keep, and separates valid from correct (review of 2026-10-19)', () => {
    const b = body('1-1-database-la-gi');
    for (const s of ['một bản duy nhất', 'không thể có chuyện', 'Excel để bạn gõ gì cũng được', 'từ chối ngay lúc nhập', 'luật cho từng cột']) expect(b, s).not.toContain(s);
    expect(b).toMatch(/hợp lệ chưa chắc đã đúng/i);
    expect(b).toContain('Data Validation');
  });
  it('1.4 says a foreign key is a rule checked on write, not a dropdown', () => {
    expect(body('1-4-khoa-chinh-khoa-ngoai')).toContain('không phải ô chọn trên màn hình');
  });
  it('the intro page says what to do when the sleeping course database refuses the first connection', () => {
    expect(readFileSync('src/pages/gioi-thieu.astro', 'utf8')).toContain('40613');
  });
  it('the first SQL lesson is one story that web and SSMS users can both run', () => {
    const f = readLessonFiles().find(x => x.slug === '2-1-chon-cot-dat-ten-cot')!;
    expect((f.data as { minutes: number }).minutes).toBe(15);
    expect((f.data as { prerequisites: string[] }).prerequisites).toEqual(['1.2', '1.3']);
    expect(f.body.match(/<Chat\b/g)).toHaveLength(1);
    expect(f.body.match(/<RunFlow\b/g)).toHaveLength(1);
    expect(f.body).not.toContain('TOP (5)');
    expect(f.body).not.toContain('SELECT MaPB');
    expect(f.body).toContain('Dấu **`*`**');
    for (const s of ['gioi-thieu/#doc-ket-qua', 'gioi-thieu/#chon-noi-thuc-hanh']) expect(f.body, s).toContain(s);
    // Exercise 1 asks for this table, so printing the query would hand out the answer.
    expect(f.body).not.toContain('FROM HopDong');
  });
  it('2.1 leads from Excel to SQL like the lessons after it', () => {
    const b = body('2-1-chon-cot-dat-ten-cot');
    const main = lessonMainSection(b);
    const [first, query] = main.split(/^### /m).slice(1);
    expect(first).toMatch(/^Từ .+\r?\n\r?\nTrong Excel, /);
    expect(first.indexOf('<Excel')).toBeLessThan(first.indexOf('Trong SQL'));
    expect(first).not.toContain('Invalid column name');
    expect(main.indexOf('<Excel')).toBeLessThan(main.indexOf('<Sql'));
    expect(main.match(/<Result\b/g)).toHaveLength(1);
    expect(main).not.toContain('<Messages');
    expect(query.indexOf('<RunFlow')).toBeLessThan(query.indexOf('<Result'));
    expect(query.indexOf('<Result')).toBeLessThan(query.indexOf('Bạn có thể trả lời chị Hạnh'));
  });
  it('no lesson or page points to the removed lesson 1.6', () => {
    const sources = [...readLessonFiles().map(f => f.body), readFileSync('src/pages/gioi-thieu.astro', 'utf8'), readFileSync('docs/ho-so-cong-ty.md', 'utf8')];
    for (const s of sources) expect(s).not.toMatch(/bài 1\.6|1-6-cau-select/);
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
    expect(lessonMainSection(body('2-5-null-o-trong'))).not.toContain('ISNULL(Email');
    expect(lessonMainSection(body('2-5-null-o-trong'))).toContain("COALESCE(Email, N'(chưa có)')");
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
    expect(proseParagraphs("import a from 'b';\n\nMột hai.").map(p => p.words)).toEqual([2]);
  });
});
