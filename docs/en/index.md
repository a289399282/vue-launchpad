---
layout: home

hero:
  name: Vue-Launchpad
  text: A Modern Vue 3 Dynamic Launchpad
  tagline: Powered by Vite 8 + TS 6.0, ready out of the box with optional UI, i18n, and Mock injection.
  actions:
    - theme: brand
      text: Quick Start
      link: /en/guide/getting-started
    - theme: alt
      text: Architecture
      link: /en/guide/architecture

features:
  - icon: 🚀
    title: Vite 8 Build Core
    details: Fast dev server, precise HMR, and production-grade Rollup builds.
  - icon: 🧬
    title: TypeScript 6 Strict Baseline
    details: strict, noUncheckedIndexedAccess, and exactOptionalPropertyTypes enabled.
  - icon: 🎛️
    title: Dynamic Capability Injection
    details: UI engines, i18n, and MSW mocks are injected on demand through pnpm launch.
  - icon: 🧭
    title: Vue Router 5 File Routes
    details: Built-in file routing, typed declarations, and route HMR.
---

## Why Vue-Launchpad

Vue-Launchpad is not a demo starter. It is a production-oriented Vue 3 foundation that aligns build tooling, typing, routing, state, requests, theming, quality gates, and optional capability injection behind one maintainable architecture.

## Design Principles

- **Light by default**: optional UI, i18n, and MSW ecosystems are not forced into the base template.
- **Enhanced on demand**: `pnpm launch` writes the capability profile into `.uirc.json`.
- **Types first**: infrastructure modules are designed around strict TypeScript.
- **Open-source ready**: README, VitePress docs, Husky, Biome, Vitest, and peer checks form the delivery baseline.
