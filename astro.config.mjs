import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://nhatlam1111.github.io',
  base: '/microsoft-sql-lession',
  integrations: [mdx(), react()],
});
