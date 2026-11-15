import { it, expect } from 'vitest';
import { experimental_AstroContainer } from 'astro/container';
import AnimatedFlow from '../src/components/lesson/AnimatedFlow.astro';
import { readAnimation } from '../src/lib/animation-assets';
import { lessonBlocks } from './helpers/lesson-blocks';
import { selectStory } from '../scripts/animations/select-story';
import { mkdirSync, readFileSync, writeFileSync, unlinkSync, rmdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';

const lesson = lessonBlocks('2-1-chon-cot-dat-ten-cot');
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
  expect(html).toContain('width="1080" height="824"');
  expect(html.match(/class="af-step"/g)).toHaveLength(2);
  expect(html).toMatch(/class="af-play" hidden/);
});
