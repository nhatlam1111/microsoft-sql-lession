import { it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import LessonDrawer from '../src/components/islands/LessonDrawer';
import SidebarNav from '../src/components/islands/SidebarNav';
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
