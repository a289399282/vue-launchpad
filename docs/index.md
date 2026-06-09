---
layout: home

hero:
  name: Vue-Launchpad
  text: 现代全能 Vue3 动态发射台
  tagline: 基于 Vite 8 + TS 6.0，开箱即用，按需注入 UI 与 i18n 能力。
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 架构设计
      link: /guide/architecture

features:
  - icon: 🚀
    title: Vite 8 构建内核
    details: 极速 dev server、精准 HMR、生产级 Rollup 构建链路。
  - icon: 🧬
    title: TypeScript 6 严格基线
    details: strict、noUncheckedIndexedAccess、exactOptionalPropertyTypes 全开。
  - icon: 🎛️
    title: 动态能力注入
    details: 8 大 UI 引擎与 i18n 通过 pnpm launch 按需开启。
  - icon: 🧭
    title: Vue Router 5 文件路由
    details: 内置文件路由插件、强类型声明与路由 HMR。
---

## 为什么选择 Vue-Launchpad

Vue-Launchpad 不是一个简单的 demo starter，而是一套面向产品交付的 Vue3 工程底座。它把构建、类型、路由、状态、请求、主题、质量门禁、可选能力注入统一收敛在一个清晰的架构里，让新项目从第一天就站在可维护的工程线上。

## 设计原则

- **默认轻量**：基础模板不强制安装 UI、i18n 等可选生态。
- **按需增强**：通过 `pnpm launch` 将能力写入 `.uirc.json`，再由 Vite 配置读取 profile。
- **类型先行**：所有基础设施模块都服务于 TypeScript 严格模式。
- **开源友好**：README、VitePress 文档、Husky、Biome、Vitest 与 peer 检查形成完整交付闭环。
