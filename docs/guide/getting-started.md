# 快速开始

## 环境要求

- Node.js `>=20.0.0`
- pnpm `>=11.0.0`

## 安装依赖

```bash
pnpm install
```

## 初始化能力

```bash
pnpm launch
```

初始化脚本会引导你选择：

- UI 引擎：Element Plus、Ant Design Vue、Naive UI、TDesign、Arco Design、Shadcn-Vue、Nuxt UI、Varlet。
- i18n：按需安装 `vue-i18n` 和 `@intlify/unplugin-vue-i18n`。
- MSW Mock：按需安装 `msw`，生成浏览器端、Node 端和 Vitest 共享的 mock handlers。

## 启动开发服务器

```bash
pnpm dev
```

## 生产构建

```bash
pnpm build
```

## 构建分析

```bash
pnpm build:analyze
```

该命令会设置 `ANALYZE=true`，在构建后生成 `stats.html`，用于分析 bundle 分布。
