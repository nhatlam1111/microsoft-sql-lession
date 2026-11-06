import { expect, it } from 'vitest';
import { lessonRedirectRoutes } from '../src/data/lesson-redirects.mjs';
import { findLessonRedirectProblems } from '../scripts/check-dist.mjs';

it.each(['3-10-dem-co-dieu-kien', '3-12-dem-co-dieu-kien'])('redirects %s and its exercises directly into 3.1', from => {
  const target = '/microsoft-sql-lession/bai/3-1-count-sum-avg';
  expect(lessonRedirectRoutes('/microsoft-sql-lession')).toMatchObject({
    [`/bai/${from}/`]: `${target}/`,
    [`/bai/${from}/bai-tap/1/`]: `${target}/bai-tap/4/`,
    [`/bai/${from}/bai-tap/2/`]: `${target}/bai-tap/5/`,
    [`/bai/${from}/bai-tap/3/`]: `${target}/bai-tap/6/`,
  });
});
it('redirects moved exercises to the same exercise and leaves removed lessons out', () => {
  const redirects = lessonRedirectRoutes('/microsoft-sql-lession');
  expect(redirects).toMatchObject({
    '/bai/4-2-xep-hang-row-number-rank/bai-tap/3/': '/microsoft-sql-lession/bai/3-13-xep-hang-row-number-rank/bai-tap/3/',
    '/bai/3-14-xep-hang-row-number-rank/bai-tap/3/': '/microsoft-sql-lession/bai/3-13-xep-hang-row-number-rank/bai-tap/3/',
    '/bai/6-5-update-quen-where/bai-tap/2/': '/microsoft-sql-lession/bai/5-6-update-quen-where/bai-tap/2/',
  });
  expect(redirects).not.toHaveProperty('/bai/4-9-power-query-excel/');
  expect(redirects).not.toHaveProperty('/bai/4-10-viet-yeu-cau-bao-cao/');
});
it('resolves past window and quality lesson URLs directly to the new menu', () => {
  const base = '/microsoft-sql-lession';
  const redirects = lessonRedirectRoutes(base);
  for (const [from, to] of [
    ['4-3-luy-ke-so-thang-truoc', '3-16-luy-ke-so-thang-truoc'],
    ['3-15-luy-ke-so-thang-truoc', '3-16-luy-ke-so-thang-truoc'],
    ['3-14-luy-ke-so-thang-truoc', '3-16-luy-ke-so-thang-truoc'],
    ['3-15-pivot-xoay-bang', '3-18-pivot-xoay-bang'],
    ['4-6-soi-chat-luong-du-lieu', '3-19-soi-chat-luong-du-lieu'],
    ['3-16-soi-chat-luong-du-lieu', '3-19-soi-chat-luong-du-lieu'],
  ]) {
    expect(redirects[`/bai/${from}/`]).toBe(`${base}/bai/${to}/`);
    expect(redirects[`/bai/${from}/bai-tap/2/`]).toBe(`${base}/bai/${to}/bai-tap/2/`);
  }
  for (const from of ['3-18-nhan-biet-du-lieu-co-van-de', '3-19-nhan-biet-du-lieu-co-van-de']) {
    expect(redirects[`/bai/${from}/`]).toBe(`${base}/bai/3-19-soi-chat-luong-du-lieu/`);
  }
  for (const prefix of ['4-7', '3-18', '3-17']) {
    expect(redirects).not.toHaveProperty(`/bai/${prefix}-doi-soat-cham-cong-luong/`);
  }
});
it('requires refresh, canonical and a fallback link to the same redirect destination',()=>{
  const target='/base/bai/3-12/';
  const html=`<meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="https://example.test${target}"><a href="${target}">open</a>`;
  expect(findLessonRedirectProblems(html,target)).toEqual([]);
  expect(findLessonRedirectProblems(html.replace('url=/base/','url=/'),target)).not.toEqual([]);
  expect(findLessonRedirectProblems(html.replace('rel="canonical"','rel="other"'),target)).not.toEqual([]);
  expect(findLessonRedirectProblems(html.replace('<a href=', '<span data-href='),target)).not.toEqual([]);
});
