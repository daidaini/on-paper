# 纸上生活 · life on paper

「纸上生活」是一份静态博客，
参照 Stripe Press × The Paris Review 的「出版物」气质 ——
奶油纸底 + 三字体（Fraunces / Source Serif 4 / Inter）+ 单一赤陶橙点缀。

## 技术栈

- **Astro 5**（静态站点 + 零默认 JS）
- **MDX**（文章正文支持自定义组件，如 `<Pullquote/>`）
- **Astro Content Collections**（schema 校验、glob loader）

## 目录结构

```
src/
├── content.config.ts      # 集合 schema
├── content/
│   ├── posts/             # 12 篇文章，文件名即 slug
│   └── about/colophon.mdx # 关于页正文
├── pages/
│   ├── index.astro        # /          首页·文章流
│   ├── about.astro        # /about/    关于
│   ├── archive.astro      # /archive/  归档（含分类过滤）
│   └── posts/[slug].astro # /posts/*/  文章详情
├── layouts/               # Base / Masthead / Inner
├── components/            # Masthead/Topbar/Footer/ArticleRow/ArchiveRow/CatFilter/YearHead/Pullquote
├── styles/                # tokens/global/masthead/article/archive
└── lib/posts.ts           # 排序、分组、罗马数字、日期格式化
```

## 命令

```bash
npm install        # 装依赖
npm run dev        # http://localhost:4321  实时刷新
npm run build      # 输出 dist/
npm run preview    # 本地预览 dist
```

## 写新文章

在 `src/content/posts/` 新增 `NNN-slug.mdx`：

```mdx
---
title: 标题（如需换行用 \n）
date: 2026-06-12
category: 阅读        # 阅读 | 城市 | 时间 | 写作
readingTime: 约 12 分钟
excerpt: 一句话摘要，会显示在首页与归档。
deck: 详情页副标（斜体，可选）
endNote: 文末签名（可选）
---

import Pullquote from '../../components/Pullquote.astro';

## 小标题（自动带橙色短线）

正文段落……

<Pullquote>
引文内容
</Pullquote>

更多段落……
```

- `>` 引文块在详情页会被替换为 `<Pullquote/>`；
- 罗马编号、按年份分组、分类筛选、上下篇导航全部按 frontmatter 自动生成。

## 部署

`dist/` 全部为静态文件，直接发布到任意静态主机（Vercel / Netlify / GitHub Pages）。
GitHub Pages 部署时记得在 `astro.config.mjs` 设 `site` 与 `base`。

## 设计 token

颜色全部以 CSS 变量定义在 `src/styles/tokens.css`，
改色只改一处即可全站生效：

| 变量 | 用途 |
|---|---|
| `--paper #FBF8F1` | 奶油纸底 |
| `--ink #1A1A1A`   | 主文字 |
| `--accent #CC785C` | 赤陶橙 · 编号 / 标题 / dropcap / pullquote 边线 |
