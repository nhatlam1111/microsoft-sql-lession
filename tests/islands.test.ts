import { it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import LessonDrawer from '../src/components/islands/LessonDrawer';
import { DbDiagram, DbDiagramDialog } from '../src/components/islands/DbDiagram';
import { parseSchema } from '../src/lib/db-schema';
import SidebarNav from '../src/components/islands/SidebarNav';
import LessonStatus, { CONCEPT_DONE_HINT } from '../src/components/islands/LessonStatus';
import { LEVELS } from '../src/data/curriculum';
import { emptyState, markSeen } from '../src/lib/progress';
import { fakeCatalog } from './helpers/expected';

const CAT = fakeCatalog();
const entry = (num: string) => CAT.find(e => e.num === num)!;
const drawer = (num: string, prerequisites = [] as string[]) => {
  const e = { ...entry(num), title: 'AND, OR, IN, BETWEEN, LIKE', goal: 'bạn kết hợp được nhiều điều kiện lọc', excel: 'Text Filters, Number Filters', summary: 'Kết hợp điều kiện và đặt dấu ngoặc đúng chỗ.' };
  return renderToStaticMarkup(createElement(LessonDrawer, {
    entry: e, level: LEVELS[e.level - 1], prerequisites: prerequisites.map(entry),
    state: markSeen(emptyState(), '2.2', 1000), onClose: () => {}, onSelect: () => {},
  }));
};

it('the lesson drawer shows what the lesson is about and links to it', () => {
  const html = drawer('2.3', ['2.2']);
  for (const s of ['Level 2 · Cơ bản', 'Bài 2.3', 'AND, OR, IN, BETWEEN, LIKE', 'Kết hợp điều kiện và đặt dấu ngoặc đúng chỗ.',
    'Học xong bài này:', 'bạn kết hợp được nhiều điều kiện lọc', 'Text Filters, Number Filters', 'Cần biết trước', 'Vào bài học']) {
    expect(html).toContain(s);
  }
  expect(html).toContain(`href="/microsoft-sql-lession/bai/${entry('2.3').slug}/"`);
  expect(html).toMatch(/aria-label="Đã xem"[^>]*><\/span><span[^>]*>2\.2</);
});
it('the drawer marks summary lessons and gives minutes only for full ones', () => {
  expect(drawer('2.3')).toContain('Bản tóm tắt');
  expect(drawer('2.3')).not.toContain('phút');
  expect(drawer('3.5')).not.toContain('Bản tóm tắt');
  expect(drawer('3.5')).toContain('Khoảng 10 phút');
  expect(drawer('2.3')).not.toContain('Cần biết trước');
});
it('the course menu works without a current lesson', () => {
  const html = renderToStaticMarkup(createElement(SidebarNav, { catalog: CAT, levels: LEVELS }));
  expect(html).toContain('Khóa học');
  expect(html).not.toContain('aria-current');
  expect(html).toContain(`href="/microsoft-sql-lession/bai/${entry('1.1').slug}/"`);
});

it('the diagram popup keeps the data set name HRM_Demo', () => {
  const tables = parseSchema(readFileSync('database/HRM_Demo.sql', 'utf8'));
  expect(renderToStaticMarkup(createElement(DbDiagramDialog, { tables, open: true, onClose: () => {} }))).toContain('Sơ đồ HRM_Demo');
});

it('draws the diagram on its own, outside the popup', () => {
  const tables = parseSchema(readFileSync('database/HRM_Demo.sql', 'utf8'));
  const html = renderToStaticMarkup(createElement(DbDiagram, { tables }));
  expect(html.match(/class="er-box"/g)).toHaveLength(7);
  for (const s of ['NhanVien', 'PK', 'FK']) expect(html).toContain(s);
  expect(html).not.toContain('role="dialog"');
});

it('the diagram lights up a path: its tables, the joining columns and the links between them', () => {
  const tables = parseSchema(readFileSync('database/HRM_Demo.sql', 'utf8'));
  const html = renderToStaticMarkup(createElement(DbDiagram, { tables, path: ['BangLuong', 'NhanVien', 'PhongBan'] }));
  expect(html.match(/class="er-box is-on"/g)).toHaveLength(3);
  expect(html.match(/class="er-row is-on"/g)).toHaveLength(4);
  expect(html.match(/class="er-link is-on"/g)).toHaveLength(2);
  expect(renderToStaticMarkup(createElement(DbDiagram, { tables }))).not.toContain('is-on');
});

it('the done hint can ask to explain the lesson instead of rewriting a query', () => {
  const nums = ['1.1', '1.2'];
  const footer = (hint?: string) => renderToStaticMarkup(createElement(LessonStatus, { num: '1.1', nums, variant: 'footer', hint }));
  expect(footer()).toContain('Bấm khi bạn tự viết lại được câu lệnh mà không nhìn bài.');
  expect(footer(CONCEPT_DONE_HINT)).toContain(CONCEPT_DONE_HINT);
  expect(footer(CONCEPT_DONE_HINT)).not.toContain('câu lệnh');
  expect(CONCEPT_DONE_HINT).toBe('Bấm khi bạn trả lời được các câu tự kiểm tra cuối bài mà không nhìn bài.');
});
