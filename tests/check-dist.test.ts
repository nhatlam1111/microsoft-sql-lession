import { it, expect } from 'vitest';
import { findLinkProblems, findAnswerLeaks, missingExerciseLinks, findCodeTypographyProblems, findAppendixFragmentProblems } from '../scripts/check-dist.mjs';

const BASE = '/microsoft-sql-lession';
const exists = (p: string) => p === 'bai/1-1-x/index.html' || p === 'HRM_Demo.sql';

it('checks local, relative and encoded reference fragments while leaving unrelated old pages alone', () => {
  const pages: Record<string, string> = {
    'phu-luc/pl-1/index.html': '<h2 id="kiểu-dữ-liệu">Kiểu</h2>',
    'phu-luc/pl-2/index.html': '<h2 id="convert">CONVERT</h2>',
  };
  const readHtml = (path: string) => pages[path] ?? null;
  const html = '<a href="#ki%E1%BB%83u-d%E1%BB%AF-li%E1%BB%87u">x</a><a href="../pl-2/#convert">y</a>'
    + '<a href="#missing">bad</a><a href="https://learn.microsoft.com/x#missing">external</a>';
  expect(findAppendixFragmentProblems(html, 'phu-luc/pl-1/index.html', readHtml, BASE)).toEqual(['không tồn tại fragment: #missing']);
  expect(findAppendixFragmentProblems('<a href="/microsoft-sql-lession/phu-luc/pl-2/#absent">x</a>', 'bai/2-1/index.html', readHtml, BASE))
    .toEqual(['không tồn tại fragment: /microsoft-sql-lession/phu-luc/pl-2/#absent']);
  expect(findAppendixFragmentProblems('<a href="#old">x</a>', 'bai/1-1-x/index.html', readHtml, BASE)).toEqual([]);
});

it('rejects typographic SQL quotes in self-check code, while allowing prose quotes', () => {
  expect(findCodeTypographyProblems('<summary>Tìm “Hà” bằng <code>LIKE N’%Hà%’</code>?</summary>'))
    .toEqual(['LIKE N’%Hà%’']);
  expect(findCodeTypographyProblems("<summary>Tìm “Hà” bằng <code>LIKE N&#39;%Hà%&#39;</code>?</summary>"))
    .toEqual([]);
});

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

it('lists the exercise pages a lesson page fails to link to', () => {
  const html = '<a href="/microsoft-sql-lession/bai/3-5-left-join/bai-tap/1/">Làm bài</a><a href="/microsoft-sql-lession/bai/3-5-left-join/bai-tap/3/">Làm bài</a>';
  expect(missingExerciseLinks(html, '3-5-left-join', 3, BASE)).toEqual(['/microsoft-sql-lession/bai/3-5-left-join/bai-tap/2/']);
  expect(missingExerciseLinks('', '3-5-left-join', 1, BASE)).toEqual(['/microsoft-sql-lession/bai/3-5-left-join/bai-tap/1/']);
});

it('finds an answer that reached the page escaped, as island props are', () => {
  const answer = "SELECT MaNV FROM NhanVien WHERE MaPB = 'IT' AND HoTen <> N\"x\"";
  expect(findAnswerLeaks([
    { path: 'props.html', text: 'props="SELECT MaNV FROM NhanVien WHERE MaPB = &amp;#39;IT&amp;#39; AND HoTen &amp;lt;&amp;gt; N&amp;quot;x&amp;quot;"' },
    { path: 'once.html', text: 'SELECT MaNV FROM NhanVien WHERE MaPB = &#39;IT&#39; AND HoTen &lt;&gt; N&quot;x&quot;' },
    { path: 'bundle.js', text: '"SELECT MaNV FROM NhanVien WHERE MaPB = \\u0027IT\\u0027 AND HoTen <> N\\"x\\""' },
  ], [answer])).toEqual(['props.html', 'once.html', 'bundle.js']);
});
