import { afterEach, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ExerciseWorkspace from '../src/components/islands/ExerciseWorkspace';
import type { PublicExercise } from '../src/lib/exercise-types';

const exercise: PublicExercise = {
  id: '2-1-1', lesson: '2-1-chon-cot-dat-ten-cot', n: 1, title: 'Danh mục',
  summary: 'Xem danh mục', prompt: 'Lấy mọi dòng.', columns: ['MaCD', 'TenCD'],
  ordered: false, kind: 'query',
};
const render = () => renderToStaticMarkup(createElement(ExerciseWorkspace, {
  exercise, apiBase: '', tables: [], nums: ['2.1'],
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
  vi.stubGlobal('localStorage', { getItem: (key: string) => key === 'sqlserver-course:draft:2-1-1' ? saved : null });
  expect(inputOf(render())[2]).toBe(expected);
});

it('still opens a blank editor when browser storage is unavailable', () => {
  vi.stubGlobal('localStorage', { getItem() { throw new Error('Storage blocked'); } });
  expect(inputOf(render())[2]).toBe('');
});
