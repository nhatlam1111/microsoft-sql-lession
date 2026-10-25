import { beforeAll, expect, it, vi } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import reactRenderer from '@astrojs/react/server.js';
import ExercisePage from '../src/pages/bai/[slug]/bai-tap/[n].astro';
import type { PublicExercise } from '../src/lib/exercise-types';
import { lessonUrl } from '../src/lib/paths';

vi.mock('../src/lib/load-catalog', async () => {
  const { fakeCatalog } = await import('./helpers/expected');
  return { loadCatalog: async () => fakeCatalog() };
});

const exercise: PublicExercise = {
  id: '1-6-1', lesson: '1-6-x', n: 1, title: 'Danh mục', summary: 'Xem danh mục',
  prompt: 'Lấy mọi dòng.', columns: ['MaCD', 'TenCD'], ordered: false, kind: 'query',
};
let html: string;
beforeAll(async () => {
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: reactRenderer });
  container.addClientRenderer({ name: '@astrojs/react', entrypoint: '@astrojs/react/client.js' });
  html = await container.renderToString(ExercisePage, {
    props: { exercise, total: 1 }, request: new Request('https://course.test/bai/1-6-x/bai-tap/1/'), partial: false,
  });
});

it('renders a disabled, labelled loading frame on the real client-only exercise route', () => {
  const workspace = html.match(/<section class="ex-work"[\s\S]*?<\/section>/)![0];
  expect(workspace).toMatch(/<astro-island\b[^>]*\bclient="only"/);
  expect(workspace).toContain('class="ws-frame"');
  expect(workspace).toContain('aria-busy="true"');
  const textarea = workspace.match(/<textarea\b([^>]*)>([\s\S]*?)<\/textarea>/)!;
  expect(textarea).not.toBeNull();
  expect(textarea[1]).toContain('aria-label=');
  expect(textarea[1]).toMatch(/\bdisabled(?:\s|=|$)/);
  expect(textarea[2]).toBe('');
  expect(workspace).toContain('1-6-1.sql');
  expect(workspace).toContain('tải lại trang');
});

it('gives a static no-JavaScript path to private SSMS practice without promising web execution', () => {
  const noscript = html.match(/<noscript>([\s\S]*?)<\/noscript>/)![1];
  expect(noscript).toContain(lessonUrl('1-2-sql-server-ssms-hrm-demo'));
  expect(noscript).toContain('SSMS');
  expect(noscript).toContain('không có chấm tự động');
});
