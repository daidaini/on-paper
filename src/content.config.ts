import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(["阅读", "城市", "时间", "写作", "生活", "社会", "文化"]),
    readingTime: z.string(),
    excerpt: z.string(),
    kicker: z.string().optional(),
    deck: z.string().optional(),
    endNote: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/about" }),
  schema: z.object({
    title: z.string(),
    kicker: z.string(),
    epigraph: z.string(),
    metaLeft: z.string(),
    metaRight: z.string(),
    signoffLeft: z.string().optional(),
    signoffRightA: z.string().optional(),
    signoffRightB: z.string().optional(),
    endNote: z.string().optional(),
  }),
});

export const collections = { posts, about };
