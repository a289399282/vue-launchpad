# Quick Start

## Requirements

- Node.js `>=20.0.0`
- pnpm `>=11.0.0`

## Install

```bash
pnpm install
```

## Initialize Capabilities

```bash
pnpm launch
```

The initializer lets you choose:

- UI engine: Element Plus, Ant Design Vue, Naive UI, TDesign, Arco Design, Shadcn-Vue, Nuxt UI, or Varlet.
- i18n: installs `vue-i18n` and `@intlify/unplugin-vue-i18n` only when selected.
- MSW Mock: installs `msw` and generates shared browser, Node, and Vitest mock handlers.

## Start Development

```bash
pnpm dev
```

## Production Build

```bash
pnpm build
```

## Bundle Analysis

```bash
pnpm build:analyze
```

This sets `ANALYZE=true` and emits `stats.html` after the production build.
