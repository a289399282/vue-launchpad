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

**A modern all-in-one Vue 3 launchpad powered by Vite 8 + TS 6.0, ready out of the box.**

[Documentation](https://a289399282.github.io/vue-launchpad/) · [简体中文](./README.zh.md)

</div>

## ✨ Features

- 🚀 **Vite 8 as the build core**: modern ESM dev server, precise HMR, and production-grade Rollup builds.
- 🧬 **TypeScript 6.0 strict baseline**: `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` enabled by default.
- 🧭 **Vue Router 5 file-based routing**: typed routes generated from `src/pages`, with route HMR wired in.
- 🎛️ **8 UI engines on demand**: Element Plus, Ant Design Vue, Naive UI, TDesign, Arco Design, Shadcn-Vue, Nuxt UI, and Varlet.
- ⚡ **Biome-powered quality gate**: formatting, linting, and import organization through one fast toolchain.
- 🏗️ **Production-minded build and network layer**: strict env validation, dynamic proxy generation, Axios infrastructure, request dedupe, manual chunks, gzip compression, and opt-in bundle analysis.

## 🚀 Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Select the UI engine and optional capabilities
pnpm launch

# 3. Start the dev server
pnpm dev

# 4. Build for production
pnpm build
```

## 🛠️ Available Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server with file routes, UnoCSS, auto imports, and proxy support. |
| `pnpm launch` | Run the interactive initializer for UI and i18n capabilities, then write the selected profile to `.uirc.json`. |
| `pnpm gen` | Generate page, component, store, and api templates with Plop. |
| `pnpm typecheck` | Run `vue-tsc --noEmit` for Vue + TypeScript validation. |
| `pnpm check` | Run Biome checks and TypeScript checks in sequence. |
| `pnpm test` | Run the Vitest test suite. |
| `pnpm test:run` | Run Vitest with coverage enabled. |
| `pnpm build` | Type-check and build for production. |
| `pnpm build:staging` | Build with the staging mode. |
| `pnpm build:analyze` | Enable bundle visualizer and emit `stats.html`. |
| `pnpm preview` | Preview the production build locally. |
| `pnpm lint:fix` | Let Biome fix formatting, lint issues, and import order. |

## 📦 Tech Stack

| Technology | Baseline | Why it is here |
| --- | --- | --- |
| Vite | 8.x | Fast dev server, modern build pipeline, and rich plugin ecosystem. |
| Vue | 3.5.x | Composition API, high-performance reactivity, and mature SFC tooling. |
| TypeScript | 6.0.x | Strict typing and modern bundler-style module resolution. |
| Vue Router | 5.1.x | Built-in file-based routing plugin, typed routes, and route HMR. |
| Pinia | 3.x | Lightweight setup stores with persisted-state support. |
| UnoCSS | 66.x | Atomic CSS generation, semantic design tokens, and zero-runtime styling. |
| Axios | 1.x | Unified request layer, auth injection, envelope unwrapping, and request dedupe. |
| Biome | 2.4.x | One fast toolchain for formatting, linting, and import organization. |
| Vitest | 4.x | Vite-native tests for build utilities and infrastructure modules. |
| Husky + lint-staged | 9.x / 17.x | Pre-commit quality gate for team workflows. |

## 🎛️ UI Engine Matrix

`pnpm launch` writes the selected profile into `.uirc.json`. The Vite config then adjusts component resolvers, dependency pre-bundling, and component scan directories from that profile.

The same flow can also inject i18n support without forcing it into the clean baseline.

| UI Engine | Best fit |
| --- | --- |
| Element Plus | Stable enterprise dashboards with broad component coverage. |
| Ant Design Vue | Complex admin products, forms, and dense data workflows. |
| Naive UI | Strong TypeScript ergonomics and flexible theming. |
| TDesign | Enterprise-grade design language for Tencent-style products. |
| Arco Design | Modern, high-density admin applications. |
| Shadcn-Vue | Headless and atomic UI for custom design systems. |
| Nuxt UI | Atomic UI composition for modern Vue interfaces. |
| Varlet | Mobile-first and cross-platform Vue applications. |

## 🧱 Project Layout

```text
src/
  pages/        Vue Router 5 file-based route pages
  store/        Pinia setup stores
  utils/        Request layer and shared utilities
  assets/       Global styles and static assets
build/
  env.ts        Environment loading and validation
  proxy.ts      Dynamic proxy generation and custom proxy merging
  profile.ts    UI profile reading and component resolver creation
scripts/
  init.ts       UI engine and optional capability injector
```

## 🔐 Requirements

- Node.js `>=20.0.0`
- pnpm `>=11.0.0`

## 📄 License

[MIT](./LICENSE)
