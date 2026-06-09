import { defineConfig } from "vitepress";

// 中文：VitePress 文档站采用根路径中文、/en/ 英文的双语结构。
// English: The VitePress site uses Chinese at the root path and English under /en/.
export default defineConfig({
  base: "/vue-launchpad/",
  title: "Vue-Launchpad",
  description: "A typed Vue 3 launchpad with dynamic capability injection.",
  cleanUrls: true,
  head: [["meta", { content: "#0891b2", name: "theme-color" }]],
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      themeConfig: {
        nav: [
          { link: "/guide/getting-started", text: "快速开始" },
          { link: "/guide/architecture", text: "架构" },
          { link: "/guide/optional-capabilities", text: "可选能力" },
          { link: "/en/", text: "English" },
        ],
        sidebar: [
          {
            items: [
              { link: "/guide/getting-started", text: "快速开始" },
              { link: "/guide/architecture", text: "架构设计" },
              { link: "/guide/optional-capabilities", text: "可选能力" },
              { link: "/guide/environment", text: "环境与代理" },
              { link: "/guide/generator", text: "代码生成" },
              { link: "/guide/quality", text: "质量门禁" },
              { link: "/guide/commands", text: "命令手册" },
            ],
            text: "指南",
          },
        ],
      },
    },
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      themeConfig: {
        nav: [
          { link: "/en/guide/getting-started", text: "Quick Start" },
          { link: "/en/guide/architecture", text: "Architecture" },
          { link: "/en/guide/optional-capabilities", text: "Capabilities" },
          { link: "/", text: "中文" },
        ],
        sidebar: [
          {
            items: [
              { link: "/en/guide/getting-started", text: "Quick Start" },
              { link: "/en/guide/architecture", text: "Architecture" },
              { link: "/en/guide/optional-capabilities", text: "Optional Capabilities" },
              { link: "/en/guide/environment", text: "Environment" },
              { link: "/en/guide/generator", text: "Generators" },
              { link: "/en/guide/quality", text: "Quality Gates" },
              { link: "/en/guide/commands", text: "Commands" },
            ],
            text: "Guide",
          },
        ],
      },
    },
  },
  themeConfig: {
    logo: "/logo.svg",
    search: {
      provider: "local",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/a289399282/vue-launchpad" }],
  },
});
