# Optional Capabilities

## UI Engines

Vue-Launchpad supports 8 UI ecosystems. The selected UI affects component resolvers and dependency pre-bundling.

| UI | Best fit |
| --- | --- |
| Element Plus | General enterprise admin systems. |
| Ant Design Vue | Complex forms and dense admin products. |
| Naive UI | TypeScript-friendly components and flexible theming. |
| TDesign | Enterprise-grade design language. |
| Arco Design | Modern admin product systems. |
| Shadcn-Vue | Headless and highly customized design systems. |
| Nuxt UI | Atomic UI composition. |
| Varlet | Mobile and cross-platform scenarios. |

## i18n

i18n is not installed or bundled by default. When selected, `pnpm launch`:

- Installs `vue-i18n`.
- Installs `@intlify/unplugin-vue-i18n`.
- Writes `src/locales/zh.json` and `src/locales/en.json`.
- Replaces `src/i18n/adapter.ts` with the real runtime adapter.

## MSW Mock

MSW is not installed or bundled by default. When selected, `pnpm launch`:

- Installs `msw`.
- Generates `src/mocks/handlers.ts`.
- Generates the browser worker.
- Generates the Node server.
- Generates the Vitest setup file.
- Writes `VITE_MOCK = true` into `.env.development.local`.

This lets the dev server and Vitest share the same API mock behavior.
