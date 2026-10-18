import { it, expect } from 'vitest';
import { findLinkProblems, findAnswerLeaks } from '../scripts/check-dist.mjs';

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

it('finds an answer query hidden in a built file, whatever its spacing', () => {
  const answer = 'SELECT nv.MaNV\nFROM NhanVien AS nv;\n';
  expect(findAnswerLeaks([{ path: 'a.js', text: 'x="SELECT nv.MaNV FROM  NhanVien AS nv"' }], [answer])).toEqual(['a.js']);
  // A bundle keeps the line break as the two characters \ and n.
  expect(findAnswerLeaks([{ path: 'c.js', text: 'x="SELECT nv.MaNV\\nFROM NhanVien AS nv"' }], [answer])).toEqual(['c.js']);
  expect(findAnswerLeaks([{ path: 'b.html', text: '<p>SELECT nv.MaNV</p>' }], [answer])).toEqual([]);
});
