import { afterEach, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ExerciseWorkspace from '../src/components/islands/ExerciseWorkspace';
import type { PublicExercise } from '../src/lib/exercise-types';

const exercise: PublicExercise = {
  id: '1-6-1', lesson: '1-6-cau-select-dau-tien', n: 1, title: 'Danh mục',
  summary: 'Xem danh mục', prompt: 'Lấy mọi dòng.', columns: ['MaCD', 'TenCD'],
  ordered: false, kind: 'query',
};
const render = () => renderToStaticMarkup(createElement(ExerciseWorkspace, {
  exercise, apiBase: '', tables: [], nums: ['1.6'],
}));
const inputOf = (html: string) => html.match(/<textarea\b([^>]*)>([\s\S]*?)<\/textarea>/)!;
afterEach(() => vi.unstubAllGlobals());

it('keeps the fresh-editor instruction outside executable SQL', () => {
  const input = inputOf(render());
  expect(input[2]).toBe('');
  expect(input[1]).toMatch(/placeholder="[^"]+"/);
  expect(input[1]).toContain('aria-label="Câu lệnh SQL"');
});

it.each([
  ['', ''],
  ['SELECT * FROM ChucDanh;', 'SELECT * FROM ChucDanh;'],
  ['-- Ghi chú riêng\nSELECT MaNV\nFROM NhanVien;', '-- Ghi chú riêng\nSELECT MaNV\nFROM NhanVien;'],
  ['-- Viết câu lệnh của bạn ở đây\n', '-- Viết câu lệnh của bạn ở đây\n'],
])('restores the saved draft unchanged: %j', (saved, expected) => {
  vi.stubGlobal('localStorage', { getItem: (key: string) => key === 'sqlserver-course:draft:1-6-1' ? saved : null });
  expect(inputOf(render())[2]).toBe(expected);
});

it('still opens a blank editor when browser storage is unavailable', () => {
  vi.stubGlobal('localStorage', { getItem() { throw new Error('Storage blocked'); } });
  expect(inputOf(render())[2]).toBe('');
});

it('renders a docked workspace with keyboard tabs, a splitter and an initially unavailable submit', () => {
  const html = render();
  const submit = html.match(/<button\b[^>]*disabled=""[^>]*>Nộp bài<\/button>/);
  expect(submit).not.toBeNull();
  expect(html.match(/role="tab"/g)).toHaveLength(4);
  expect(html).toContain('role="separator"');
  expect(html).toContain('aria-orientation="horizontal"');
  expect(html).toContain('Object Explorer');
  expect(html).toContain('1-6-1.sql');
});

it('renders schema and explicit preview actions without needing an access code', () => {
  const html = renderToStaticMarkup(createElement(ExerciseWorkspace, {
    exercise, apiBase: '', nums: ['1.6'], tables: [{ name: 'PhongBan', primaryKey: ['MaPB'], foreignKeys: [], columns: [{ name: 'MaPB', type: 'varchar(10)', nullable: false }] }],
  }));
  expect(html).toContain('<summary>');
  expect(html).toContain('dbo.PhongBan');
  expect(html).toContain('Xem dữ liệu');
  expect(html).toContain('Xem cấu trúc');
  expect(html).toContain('MaPB (PK, varchar(10), not null)');
});
