<div align="center">

```text
__     __ _   _ _____        _        _    _   _ _   _  ____ _   _ ____   _    ____
\ \   / /| | | | ____|      | |      / \  | | | | \ | |/ ___| | | |  _ \ / \  |  _ \
 \ \ / / | | | |  _| _____  | |     / _ \ | | | |  \| | |   | |_| | |_) / _ \ | | | |
  \ V /  | |_| | |__|_____| | |___ / ___ \| |_| | |\  | |___|  _  |  __/ ___ \| |_| |
   \_/    \___/|_____|      |_____/_/   \_\\___/|_| \_|\____|_| |_|_| /_/   \_\____/
```

# Vue-Launchpad

[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vue](https://img.shields.io/badge/Vue-3.5-42B883?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Biome](https://img.shields.io/badge/Biome-2.4-60A5FA?style=for-the-badge&logo=biome&logoColor=white)](https://biomejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-00ADD8?style=for-the-badge)](./LICENSE)

**基于 Vite 8 + TS 6.0 的现代全能 Vue3 动态发射台，开箱即用。**

[在线文档](https://a289399282.github.io/vue-launchpad/) · [English](./README.md)

</div>

## ✨ 核心特性

- 🚀 **Vite 8 极速构建内核**：现代 ESM 开发体验、精准 HMR、生产级 Rollup 构建链路一体化。
- 🧬 **TypeScript 6.0 严格类型基线**：`strict`、`noUncheckedIndexedAccess`、`exactOptionalPropertyTypes` 全开，默认站在大型工程安全线之上。
- 🧭 **Vue Router 5 文件动态路由**：基于 `src/pages` 自动生成强类型路由，并接入路由 HMR。
- 🎛️ **8 大 UI 生态按需注入**：Element Plus、Ant Design Vue、Naive UI、TDesign、Arco Design、Shadcn-Vue、Nuxt UI、Varlet 一键选择。
- ⚡ **Biome 闪电质量门禁**：格式化、Lint、导入整理统一收敛，配合 Husky + lint-staged 形成提交前防线。
- 🧪 **可选 MSW 网络层 Mock**：通过 `pnpm launch` 注入浏览器端与 Vitest 共享的 API mock handlers。
- 🏗️ **大厂级构建与网络优化**：动态环境校验、自动代理生成、Axios 请求封装、重复请求取消、手动分包、gzip 压缩、按需 bundle 分析。

## 🚀 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 选择 UI 引擎与可选能力
pnpm launch

# 3. 启动开发服务器
pnpm dev

# 4. 生产构建
pnpm build
```

## 🛠️ 常用指令

| 指令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动 Vite 开发服务器，支持文件路由、UnoCSS、自动导入和代理配置。 |
| `pnpm launch` | 进入交互式初始化流程，选择 UI 引擎、i18n 与 MSW mock 能力，并写入 `.uirc.json`。 |
| `pnpm gen` | 使用 Plop 生成 page、component、store、api 等标准模板。 |
| `pnpm typecheck` | 使用 `vue-tsc --noEmit` 执行 Vue + TypeScript 类型检查。 |
| `pnpm check` | 串行执行 Biome 检查与 TypeScript 类型检查。 |
| `pnpm test` | 运行 Vitest 单元测试。 |
| `pnpm test:run` | 运行带 coverage 的 Vitest 测试。 |
| `pnpm build` | 类型检查通过后执行生产构建。 |
| `pnpm build:staging` | 使用 staging 模式执行预发构建。 |
| `pnpm build:analyze` | 打开 bundle visualizer，生成 `stats.html` 构建分析报告。 |
| `pnpm preview` | 本地预览生产构建产物。 |
| `pnpm lint:fix` | 使用 Biome 自动修复格式、Lint 和导入顺序。 |

## 📦 技术栈全景

| 技术 | 版本基线 | 项目收益 |
| --- | --- | --- |
| Vite | 8.x | 极速开发服务器、现代构建管线、插件生态成熟。 |
| Vue | 3.5.x | Composition API、响应式性能、SFC 工程化能力完整。 |
| TypeScript | 6.0.x | 严格类型推导和现代 Bundler 解析策略。 |
| Vue Router | 5.1.x | 内置文件路由插件、强类型路由、路由 HMR。 |
| Pinia | 3.x | 轻量状态管理，组合式 store 与持久化插件协同。 |
| UnoCSS | 66.x | 原子化 CSS、语义化设计 token、按需生成样式。 |
| Axios | 1.x | 统一请求层、鉴权注入、业务 envelope 解包、请求去重。 |
| Biome | 2.4.x | 格式化、Lint、导入整理的单一高速工具链。 |
| Vitest | 4.x | 与 Vite 同构的测试体验，适合工具层和构建层回归测试。 |
| Husky + lint-staged | 9.x / 17.x | 提交前质量门禁，降低坏提交进入主干的概率。 |

## 🎛️ UI 引擎矩阵

`pnpm launch` 会将选择结果写入 `.uirc.json`，Vite 配置会根据 profile 自动调整组件解析器、依赖预构建和组件扫描目录。

同一流程也可以按需注入 i18n 与 MSW mock。选择 MSW 后会生成 `src/mocks/*`，并在 `.env.development.local` 写入 `VITE_MOCK = true`，让本地开发与 Vitest 测试共享同一套 API handlers。

| UI 引擎 | 定位 |
| --- | --- |
| Element Plus | 稳定、企业后台友好、组件覆盖全面。 |
| Ant Design Vue | 中后台体系成熟，适合复杂业务表单与数据面板。 |
| Naive UI | TypeScript 体验优秀，主题能力灵活。 |
| TDesign | 企业级设计语言，适合腾讯系风格产品。 |
| Arco Design | 现代设计体系，适合高密度后台应用。 |
| Shadcn-Vue | Headless + 原子化，适合强定制设计系统。 |
| Nuxt UI | Atomic UI 方向，适合现代组件组合体验。 |
| Varlet | 移动端与跨端体验友好。 |

## 🧱 项目结构

```text
src/
  pages/        Vue Router 5 文件路由页面
  store/        Pinia setup stores
  utils/        请求层与共享工具
  assets/       全局样式与静态资源
build/
  env.ts        环境变量加载与校验
  proxy.ts      动态代理生成与自定义代理合并
  profile.ts    UI profile 读取与解析器创建
scripts/
  init.ts       UI 引擎与可选能力注入脚本
```

## 🔐 环境要求

- Node.js `>=20.0.0`
- pnpm `>=11.0.0`

## 📄 License

[MIT](./LICENSE)
