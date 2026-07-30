import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
// 部署目标：GitHub Pages 项目站 https://<user>.github.io/on-paper/
// 如果改成根域名部署（自定义域 / 用户主站），把 base 改为 '/'
export default defineConfig({
  output: 'static',
  // CI 通过 ASTRO_SITE 注入真实 Pages origin，本地开发保留占位值即可
  site: process.env.ASTRO_SITE || 'https://example.github.io',
  base: '/on-paper/',
  integrations: [mdx()],
});
