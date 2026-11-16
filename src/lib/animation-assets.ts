import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import type { FlowStep } from './run-flow';

/** Hash the teaching data and exact rendering inputs, not unrelated lesson prose. */
export function animationFingerprint(query: string, steps: FlowStep[], sources: string[]): string {
  const hash = createHash('sha256').update(JSON.stringify({ query, steps }));
  for (const path of sources) {
    const content = readFileSync(path);
    // Text checkouts may use CRLF on Windows and LF in Linux CI.
    hash.update(path).update(/\.(?:css|mts|ts|py)$/.test(path) ? content.toString('utf8').replace(/\r\n?/g, '\n') : content);
  }
  return hash.digest('hex');
}

export function readAnimation(id: string, query: string, steps: FlowStep[]) {
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error('Mã ảnh động không hợp lệ');
  const folder = `public/lesson-animations/${id}`;
  const manifest = JSON.parse(readFileSync(`${folder}/manifest.json`, 'utf8')) as {
    fingerprint: string; sources: string[]; width: number; height: number;
    caption: string; alt: string; files: Record<string, string>;
    scenes: { step: number; file: string; alt: string }[];
  };
  if (animationFingerprint(query, steps, manifest.sources) !== manifest.fingerprint)
    throw new Error(`Ảnh động ${id} đã lỗi thời. Chạy lệnh dựng lại ảnh của bài tương ứng.`);
  const referenced = ['animation.gif', 'poster.png', ...manifest.scenes.map(scene => scene.file)];
  if (referenced.some(file => !/^[a-z0-9-]+\.(?:gif|png)$/.test(file) || !manifest.files[file]))
    throw new Error(`Ảnh động ${id} thiếu hash của tài nguyên được tham chiếu`);
  if (manifest.scenes.some(scene => !Number.isInteger(scene.step) || !steps[scene.step]))
    throw new Error(`Ảnh động ${id} tham chiếu bước không tồn tại`);
  for (const [file, expected] of Object.entries(manifest.files)) {
    const actual = createHash('sha256').update(readFileSync(`${folder}/${file}`)).digest('hex');
    if (actual !== expected) throw new Error(`Tài nguyên ${id}/${file} không khớp manifest`);
  }
  if (steps.some((_, i) => !manifest.scenes.some(scene => scene.step === i)))
    throw new Error(`Ảnh động ${id} thiếu hình tĩnh của bước`);
  return manifest;
}
