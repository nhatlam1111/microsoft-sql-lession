import { expect, it } from 'vitest';
import { lessonRedirectRoutes } from '../src/data/lesson-redirects.mjs';
import { findLessonRedirectProblems } from '../scripts/check-dist.mjs';

it('keeps four legacy COUNT URLs and includes the GitHub Pages base in every destination',()=>{
  expect(lessonRedirectRoutes('/microsoft-sql-lession')).toEqual(Object.fromEntries(['','/bai-tap/1','/bai-tap/2','/bai-tap/3'].map(tail=>[
    `/bai/3-10-dem-co-dieu-kien${tail}/`,`/microsoft-sql-lession/bai/3-12-dem-co-dieu-kien${tail}/`,
  ])));
});
it('requires refresh, canonical and a fallback link to the same redirect destination',()=>{
  const target='/base/bai/3-12/';
  const html=`<meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="https://example.test${target}"><a href="${target}">open</a>`;
  expect(findLessonRedirectProblems(html,target)).toEqual([]);
  expect(findLessonRedirectProblems(html.replace('url=/base/','url=/'),target)).not.toEqual([]);
  expect(findLessonRedirectProblems(html.replace('rel="canonical"','rel="other"'),target)).not.toEqual([]);
  expect(findLessonRedirectProblems(html.replace('<a href=', '<span data-href='),target)).not.toEqual([]);
});
