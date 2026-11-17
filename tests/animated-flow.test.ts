import { runInNewContext } from 'node:vm';
import { it, expect } from 'vitest';
import { experimental_AstroContainer } from 'astro/container';
import AnimatedFlow from '../src/components/lesson/AnimatedFlow.astro';
import { readAnimation } from '../src/lib/animation-assets';
import { lessonBlocks } from './helpers/lesson-blocks';
import { selectStory } from '../scripts/animations/select-story';
import { storyboard } from '../scripts/animations/storyboard.mts';
import { readLessonFiles } from './helpers/lessons';
import { mkdirSync, readFileSync, writeFileSync, unlinkSync, rmdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';

const lesson = lessonBlocks('2-1-chon-cot-dat-ten-cot');

it('all nine animations carry the preceding result into the next step and ship with fresh images', () => {
  const lessons = readLessonFiles().filter(lesson => /^2-[1-9]-/.test(lesson.slug));
  expect(lessons).toHaveLength(9);
  for (const { slug } of lessons) {
    const { body, query, steps } = lessonBlocks(slug);
    const id = body.match(/animation="(2-[1-9]-[^"\s]+)"/)![1];
    const scenes = storyboard(id, query, steps);
    const image = readAnimation(id, query, steps);
    expect([image.width, image.height]).toEqual([1080, 720]);
    expect([...new Set(image.scenes.map(scene => scene.step))]).toEqual(scenes.map(scene => scene.step));
    for (const [i, scene] of scenes.entries()) {
      if (i === 0) continue;
      if (id === '2-4-order-top' && scene.clause === 'ORDER BY') {
        expect(scene.left.rows).toHaveLength(6);
        expect(scene.scopeNote).toMatch(/3.*6/);
        expect(image.scenes.find(still => still.step === i)?.alt).toContain(scene.scopeNote);
        continue;
      }
      const previous = scenes[i - 1];
      const output = previous.right ?? previous.left;
      expect(scene.left).toEqual({ ...output, columns: previous.aliases ?? output.columns });
    }
    const where = scenes.find(scene => scene.clause === 'WHERE');
    if (where) expect(where.moves.filter(move => move.to).length).toBe(where.right!.rows.length);
    const order = scenes.find(scene => scene.clause === 'ORDER BY');
    if (order) {
      expect(order.sortKeys?.length).toBeGreaterThan(0);
      const rows = [...order.left.rows];
      for (const move of order.moves) {
        if (!('row' in move.from) || !move.to || !('row' in move.to)) throw new Error('ORDER BY cần hai vị trí dòng');
        rows.splice(move.to.row, 0, ...rows.splice(move.from.row, 1));
      }
      expect(rows).toEqual(order.right!.rows);
    }
  }
});
it('moves the five TOP rows together and leaves the sixth in the source table', () => {
  const { query, steps } = lessonBlocks('2-4-sap-xep-va-top');
  const top = storyboard('2-4-order-top', query, steps).find(scene => scene.clause === 'TOP')!;
  expect(top.moves.filter(move => move.to)).toEqual([
    expect.objectContaining({ from: { rows: [0, 1, 2, 3, 4] }, to: { rows: [0, 1, 2, 3, 4] } }),
  ]);
  expect(top.left.rows[5][0]).toBe('NV040');
});
it('the storyboard rejects unsupported semantics even when query and steps change together', () => {
  expect(selectStory(lesson.query, lesson.steps).names).toEqual(['MaNV', 'HoTen', 'NgayVaoLam']);
  const filteredQuery = lesson.query.replace('FROM NhanVien;', "FROM NhanVien WHERE MaNV = 'NV001';");
  const filtered = structuredClone(lesson.steps);
  filtered[1].sql = filteredQuery;
  expect(() => selectStory(filteredQuery, filtered)).toThrow('Kịch bản bài 2.1 cần cập nhật');
  const moved = structuredClone(lesson.steps);
  moved[0].focus = 'FROM NhanVienKhac';
  moved[0].sql = 'SELECT * FROM NhanVienKhac;';
  const movedQuery = lesson.query.replace('FROM NhanVien;', 'FROM NhanVienKhac;');
  moved[1].sql = movedQuery;
  expect(() => selectStory(movedQuery, moved)).toThrow('Kịch bản bài 2.1 cần cập nhật');
});
it('every referenced image must be hashed and exist', () => {
  const id = `animation-test-${randomUUID()}`;
  const folder = `public/lesson-animations/${id}`;
  mkdirSync(folder);
  const manifest = JSON.parse(readFileSync('public/lesson-animations/2-1-select/manifest.json', 'utf8'));
  try {
    const hash = manifest.files['animation.gif'];
    delete manifest.files['animation.gif'];
    writeFileSync(`${folder}/manifest.json`, JSON.stringify(manifest));
    expect(() => readAnimation(id, lesson.query, lesson.steps)).toThrow('thiếu hash');
    manifest.files['animation.gif'] = hash;
    writeFileSync(`${folder}/manifest.json`, JSON.stringify(manifest));
    expect(() => readAnimation(id, lesson.query, lesson.steps)).toThrow(/ENOENT/);
  } finally {
    unlinkSync(`${folder}/manifest.json`);
    rmdirSync(folder);
  }
});
it('animation assets match the exact lesson data and rendering inputs', () => {
  const asset = readAnimation('2-1-select', lesson.query, lesson.steps);
  expect(asset.scenes.map(s => s.step)).toEqual([0, 1, 1]);
  expect(asset.alt).toContain(`${lesson.steps.at(-1)!.total} hồ sơ`);
  expect(() => readAnimation('2-1-select', lesson.query + ' ', lesson.steps)).toThrow('lỗi thời');
  const changed = structuredClone(lesson.steps);
  changed[1].rows[0][1] = 'Tên khác';
  expect(() => readAnimation('2-1-select', lesson.query, changed)).toThrow('lỗi thời');
});
it('static HTML preserves two logical steps, data and text without JavaScript', async () => {
  const container = await experimental_AstroContainer.create();
  const html = await container.renderToString(AnimatedFlow, {props:{query:lesson.query,steps:lesson.steps,animation:'2-1-select'}});
  expect(html).toMatch(/<summary[^>]*>Xem từng bước<\/summary>/);
  expect(html).toContain('NV033');
  expect(html).toContain('Khúc Văn Hải');
  expect(html).toContain('Ngày vào làm');
  expect(html).not.toContain('rf-drawer');
  expect(html).toContain('width="1080" height="720"');
  expect(html.match(/class="af-step"/g)).toHaveLength(2);
  expect(html).toMatch(/class="af-play" hidden/);
});

it('WHERE animation and the displayed SQL stay in sync', () => {
  const where = lessonBlocks('2-2-where-loc-nhu-autofilter');
  const sql = where.body.match(/<Sql code=\{`([\s\S]*?)`\}\s*\/>\s*[\s\S]*?<AnimatedFlow query=/);
  expect(sql).not.toBeNull();
  expect(runInNewContext('`' + sql![1] + '`')).toBe(where.query);
  const asset = readAnimation('2-2-where', where.query, where.steps);
  expect(asset.scenes.map(s => s.step)).toEqual([0, 1, 2]);
});

it('combined-condition animation matches the displayed query and three lesson steps', () => {
  const lesson = lessonBlocks('2-3-and-or-in-between-like');
  const sql = lesson.body.match(/<Sql code=\{`([\s\S]*?)`\}\s*\/>\s*[\s\S]*?<AnimatedFlow query=/);
  expect(sql).not.toBeNull();
  expect(runInNewContext('`' + sql![1] + '`')).toBe(lesson.query);
  const asset = readAnimation('2-3-conditions', lesson.query, lesson.steps);
  expect(asset.scenes.map(s => s.step)).toEqual([0, 1, 2]);
  expect(asset.alt).toContain('NV003');
  expect(() => readAnimation('2-3-conditions', lesson.query + ' ', lesson.steps)).toThrow('lỗi thời');
});

it('shows the condition totals described by the table caption', async () => {
  const lesson = lessonBlocks('2-3-and-or-in-between-like');
  const container = await experimental_AstroContainer.create();
  const html = await container.renderToString(AnimatedFlow, { props: { query: lesson.query, steps: lesson.steps, animation: '2-3-conditions' } });
  expect(html).toMatch(/<tfoot[^>]*>\s*<tr[^>]*>\s*<th scope="row"[^>]*>Cả 48 dòng<\/th>\s*<td[^>]*>24 đúng<\/td>\s*<td[^>]*>3 đúng<\/td>\s*<td[^>]*>2 giữ<\/td>/);
  expect(html).toContain('NV002');
  expect(html).toContain('Loại');
  expect(html).toContain('Giữ');
});
