import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
// 部署目标：GitHub Pages 项目站 https://<user>.github.io/on-paper/
// 如果改成根域名部署（自定义域 / 用户主站），把 base 改为 '/'
export default defineConfig({
  output: 'static',
  site: 'https://example.github.io',  // 部署后由 Actions 通过 env 注入正确的用户名
  base: '/on-paper/',
  integrations: [mdx()],
});
