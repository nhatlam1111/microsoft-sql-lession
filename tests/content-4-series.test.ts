import {it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {parse} from 'yaml';
import {fixtureQuery,lessonExamples} from './helpers/window-fixture';
const slugs=['4-1-cte-tung-buoc','4-2-xep-hang-row-number-rank','4-3-luy-ke-so-thang-truoc'];
it('illustrations and runnable flow checks do not solve any of the nine new exercises unchanged',()=>{
  for(const slug of slugs)expect(existsSync(`src/content/exercises/${slug}.yaml`),slug).toBe(true);
  const examples=slugs.flatMap(slug=>{
    const l=lessonExamples(slug);
    return [...new Set([...l.pairs.map(p=>p.sql),...l.steps.map(s=>s.sql)])].map(sql=>({slug,sql,...fixtureQuery(sql)}));
  });
  let comparisons=0;
  for(const slug of slugs)for(const e of parse(readFileSync(`src/content/exercises/${slug}.yaml`,'utf8')).exercises){
    const answer=fixtureQuery(e.answer);
    for(const example of examples){
      comparisons++;
      if(example.columns.length!==answer.columns.length||example.rows.length!==answer.rows.length)continue;
      const got=example.rows.map(r=>JSON.stringify(r));const want=answer.rows.map(r=>JSON.stringify(r));
      expect(e.ordered?got:got.sort(),`${e.id} matches ${example.slug}: ${example.sql}`).not.toEqual(e.ordered?want:want.sort());
    }
  }
  expect(comparisons).toBeGreaterThanOrEqual(90);
});
