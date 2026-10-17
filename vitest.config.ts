/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';
import astroConfig from './astro.config.mjs';

export default getViteConfig({
  // getViteConfig leaves Vite's base at '/', so pass Astro's base on for import.meta.env.BASE_URL.
  base: astroConfig.base,
  test: {
    include: ['tests/**/*.test.ts'],
    env: { TZ: 'Asia/Ho_Chi_Minh' },
  },
});
