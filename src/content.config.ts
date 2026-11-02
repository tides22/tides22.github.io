import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const link = z.object({ label: z.string(), href: z.string() });

// 首页：名字、身份、亮点数字、各板块标题、成长轨迹节点
const home = defineCollection({
  loader: glob({ pattern: 'home.md', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      greeting: z.string(),
      name: z.string(),
      tagline: z.string().optional(),
      navTagline: z.string().default(''),
      identity: z.array(z.string()),
      // 示意版首屏：名字下面的几行小字，以及背景照片
      heroLines: z.array(z.string()).default([]),
      heroDesktop: image().optional(),
      heroMobile: image().optional(),
      heroAlt: z.string().default(''),
      email: z.string(),
      resume: z.string(),
      // 页尾技能清单：label 是左边的分类名，items 是右边的技能（原样显示）
      skills: z.array(z.object({ label: z.string(), items: z.string() })).default([]),
      stats: z.array(
        z.object({
          value: z.string(),
          unit: z.string().optional(),
          label: z.string(),
          note: z.string(),
          href: z.string(),
        }),
      ),
      sections: z.record(z.object({ kicker: z.string(), title: z.string(), intro: z.string().optional() })),
    }),
});

// 项目：kind 为 deep 的是深度案例，card 是项目卡片
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      kind: z.enum(['deep', 'card']),
      order: z.number(),
      period: z.string(),
      role: z.string().optional(),
      tags: z.array(z.string()),
      summary: z.string(),
      highlights: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string(),
      links: z.array(link).default([]),
    }),
});

// 实习经历
const experience = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    mode: z.string().optional(),
    order: z.number(),
    bullets: z.array(z.string()),
    links: z.array(link).default([]),
  }),
});

// 友思：负责的项目、参与的项目、设计作品、合照
const youth = defineCollection({
  loader: glob({ pattern: 'youth.md', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      org: z.string(),
      period: z.string(),
      badge: z.string().optional(),
      lead: z.object({
        title: z.string(),
        role: z.string(),
        theme: z.string(),
        result: z.object({ value: z.string(), label: z.string() }),
        story: z.string(),
        photo: image(),
        photoAlt: z.string(),
      }),
      joined: z.array(link),
      designs: z.array(
        z.object({ title: z.string(), type: z.string(), href: z.string(), cover: image(), coverAlt: z.string() }),
      ),
      photos: z.array(z.object({ src: image(), alt: z.string() })),
    }),
});

// 示意版首页的五个类别
const chapters = defineCollection({
  loader: glob({ pattern: 'chapters.md', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      items: z.array(
        z.object({
          id: z.enum(['me', 'cidi', 'venture', 'analysis', 'intern']),
          label: z.string(),
          text: z.string().optional(),
          // 卡片宽高比（宽 ÷ 高）；高度五张一致，宽度按这个比例微调，默认 0.8（4:5）
          ratio: z.number().default(0.8),
          // 首页卡片上的图片（还没有时显示占位）
          card: image().optional(),
          figure: z.string().optional(),
          note: z.string().optional(),
          // 卡片右侧的照片；还没有图时写 coverFile，网站上显示占位框
          cover: image().optional(),
          coverFile: z.string().optional(),
          parts: z.array(
            z.object({
              ref: z.enum(['me', 'cidi', 'sams', 'exhibition', 'game-reviews', 'olist', 'watsons', 'jiuqian', 'zhipu', 'grant-thornton']),
              name: z.string(),
              figure: z.string(),
              note: z.string(),
            }),
          ),
        }),
      ),
    }),
});

// 卡片点开后的页面（每张卡片一个文件，文件名就是卡片 id）
const details = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/details' }),
  schema: ({ image }) =>
    z.object({
      video: z.string().default(''),
      videoRatio: z.number().optional(),
      poster: image().optional(),
      posterAlt: z.string().default(''),
      demo: z.object({ label: z.string(), href: z.string(), note: z.string().optional() }).optional(),
      intro: z.object({ title: z.string(), body: z.string() }).optional(),
      highlights: z
        .array(
          z.object({
            title: z.string(),
            file: z.string().optional(),
            images: z.array(image()).default([]),
            image: image().optional(),
            video: z.string().optional(),
            desc: z.string(),
            path: z.string(),
            future: z.string().optional(),
          }),
        )
        .default([]),
      // 默认显示第几个小卡片（从 0 开始）
      defaultTab: z.number().default(0),
      // 左侧小卡片切换的多个项目（「洞察与分析项目」「运营与策划」用）
      tabs: z
        .array(
          z.object({
            short: z.string(),
            cover: image().optional(),
            coverFit: z.enum(['cover', 'contain']).default('cover'),
            // 左侧小卡片底部的关键词（不填就用 tags）
            keywords: z.string().optional(),
            // 标题右边的小 logo
            logo: image().optional(),
            // 标题下面的一张通栏大图
            hero: image().optional(),
            heroAlt: z.string().default(''),
            // true：小节只放文字，照片集中放到最下面横排
            photosBelow: z.boolean().default(false),
            twoCol: z.boolean().default(false),
            title: z.string(),
            subtitle: z.string().optional(),
            period: z.string().optional(),
            tags: z.string().optional(),
            lede: z.string().optional(),
            // 经历条目（每条一行，原样显示）
            bullets: z.array(z.string()).default([]),
            // 醒目的数字条；after: true 时放在小节之后
            stats: z.object({ title: z.string().optional(), items: z.array(z.string()), sep: z.string().default(''), after: z.boolean().default(false), stack: z.boolean().default(false) }).optional(),
            // 文字小节：可带一张照片（左右交错），poem: true 时按诗歌排版
            sections: z
              .array(
                z.object({
                  title: z.string(),
                  body: z.string(),
                  poem: z.boolean().default(false),
                  photo: image().optional(),
                  photoAlt: z.string().default(''),
                  photoFile: z.string().optional(),
                  caption: z.string().optional(),
                }),
              )
              .default([]),
            // 照片墙：瀑布流，点击放大
            gallery: z
              .object({ title: z.string(), items: z.array(z.object({ image: image().optional(), alt: z.string().default(''), file: z.string().optional() })) })
              .optional(),
            findings: z.array(z.object({ figure: z.string(), claim: z.string(), detail: z.string(), image: image().optional() })).default([]),
            advice: z.string().optional(),
            adviceGroups: z.array(z.object({ name: z.string(), items: z.array(z.object({ text: z.string(), basis: z.string().optional() })) })).optional(),
            adviceNote: z.string().optional(),
            adviceList: z.array(z.string()).default([]),
            adviceAfter: z.string().optional(),
            shots: z.array(z.object({ image: image(), caption: z.string() })).default([]),
            ai: z.string().optional(),
            links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
          }),
        )
        .default([]),
    }),
});

// 三份分析报告全文：每个 md 生成一个 /reports/文件名 页面
const reports = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/reports' }),
});

export const collections = { home, projects, experience, youth, chapters, details, reports };
