import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { sectionHeadings } from '../src/lib/lesson-schema';

const script = readFileSync('database/HRM_Demo.sql', 'utf8');
const profile = readFileSync('docs/ho-so-cong-ty.md', 'utf8');

/** Rows of INSERT INTO dbo.NhanVien: code, name, department, title, start date, end date, status. */
function scriptStaff() {
  const row = /\('(NV\d{3})', N'([^']+)', N'[^']+', '[^']+', '[^']+', (?:NULL|'[^']+'), '([\d-]+)', (NULL|'[\d-]+'), '(\w+)', '(\w+)', N'([^']+)'\)/g;
  return [...script.matchAll(row)].map(m => ({
    ma: m[1], ten: m[2], vao: m[3], nghi: m[4] === 'NULL' ? '' : m[4].slice(1, -1), pb: m[5], cd: m[6], trangThai: m[7],
  }));
}

/** Rows of the staff table in section 3 of the company profile. */
function profileStaff() {
  return profile.split('\n').filter(l => /^\| NV\d{3} \|/.test(l)).map(l => {
    const [ma, ten, pb, cd, vao, nghi] = l.split('|').slice(1).map(c => c.trim());
    return { ma, ten, pb, cd, vao, nghi };
  });
}

it('the company profile lists every staff record exactly as the sample script has it', () => {
  const fromScript = scriptStaff();
  expect(fromScript).toHaveLength(48);
  expect(profileStaff()).toEqual(fromScript.map(({ ma, ten, pb, cd, vao, nghi }) => ({ ma, ten, pb, cd, vao, nghi })));
});

it('the company profile counts each department as the sample script does', () => {
  const staff = scriptStaff();
  for (const pb of ['BGD', 'IT', 'KD', 'KT', 'NS', 'VH']) {
    const all = staff.filter(s => s.pb === pb).length;
    const working = staff.filter(s => s.pb === pb && s.trangThai === 'Đang làm').length;
    expect(profile, pb).toMatch(new RegExp(`^\\| ${pb} \\| [^|]+ \\| ${all} \\| ${working} \\|`, 'm'));
  }
});

it('the conventions file is the one place for the rules, and the lesson template points to it', () => {
  const rules = readFileSync('docs/quy-uoc.md', 'utf8');
  for (const s of ['Không dài dòng', 'Không vòng vo', 'Không lặp ý', 'Sonnet', 'effort **high**', 'ho-so-cong-ty.md']) expect(rules, s).toContain(s);
  const template = readFileSync('docs/lesson-template.md', 'utf8');
  expect(template).toContain('quy-uoc.md');
  expect(template).not.toContain('## Quy tắc viết');
  expect(template).not.toContain('## Quy trình làm một bài');
});

it('the copyable full-lesson template follows the approved narrative structure', () => {
  const template = readFileSync('docs/lesson-template.md', 'utf8');
  const intro = template.split('## Phần đầu file')[0];
  expect(intro).toContain('1-1-database-la-gi.mdx');
  expect(intro).toContain('2-2-where-loc-nhu-autofilter.mdx');
  const body = template.match(/````mdx\r?\n([\s\S]*?)\r?\n````/)?.[1] ?? '';
  const headings = [...body.matchAll(/^## (.+?)\s*$/gm)].map(m => m[1]);
  expect(headings.length).toBe(6);
  expect(headings[1]).not.toBe('Với Excel');
  expect(headings).toEqual(sectionHeadings('full', false, headings[1]));
  expect(body).not.toMatch(/^### (Lý thuyết cơ bản|Trả lời chị Hạnh)$/m);
});

it('the template gives lessons with a query two subsections', () => {
  const template = readFileSync('docs/lesson-template.md', 'utf8');
  expect(template).toContain('dùng đúng hai tiểu mục');
  expect(template).not.toContain('### SQL Server chạy câu này thế nào');
  expect(template.indexOf('<RunFlow query={sqlDaKiemChung}')).toBeLessThan(template.indexOf('<Result columns={cacCot}'));
  expect(template.indexOf('<Result columns={cacCot}')).toBeLessThan(template.indexOf('Câu trả lời nghiệp vụ từ kết quả này'));
  const rules = readFileSync('docs/quy-uoc.md', 'utf8');
  expect(rules).toContain('Bài có câu lệnh dùng đúng hai tiểu mục');
  expect(rules).toContain('chỉ bám tình huống đầu bài');
  expect(template).toContain('chỉ bám tình huống đầu bài');
});
