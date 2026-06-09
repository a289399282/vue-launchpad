# Architecture

Vue-Launchpad does not force every ecosystem package into the starter. It separates the always-runnable baseline from optional capabilities. The base project stays lean, while the interactive launcher writes UI and i18n choices into a profile that the build pipeline consumes.

## Capability Profile

`.uirc.json` is the Vue-Launchpad capability contract. `pnpm launch` writes a profile like this:

```json
{
  "i18n": false,
  "ui": "element-plus"
}
```

The Vite config reads this file to decide:

- Whether to load the i18n plugin.
- Which UI component resolver to use.
- Which dependencies should enter `optimizeDeps.include`.

This avoids two common starter-template problems: overweight default dependencies and static build imports that break after users remove an optional ecosystem package.

## Routing

The project uses the Vue Router 5 built-in `vue-router/vite` file-routing plugin. Page files live in `src/pages`, route declarations are generated into `typed-router.d.ts`, and routes are imported from `vue-router/auto-routes`.

Recommended conventions:

- Keep pages in `src/pages` and reusable components in `src/components`.
- Keep page-level data orchestration inside pages, and move cross-page state into Pinia stores.
- Keep login, auth, and redirect logic in `src/router/guard.ts`.

## Request Layer

`src/utils/request.ts` wraps Axios and provides:

- API base URL from `VITE_APP_BASE_API`.
- Bearer token injection.
- Duplicate request cancellation.
- Business envelope unwrapping.
- Unified `RequestError`.

The request layer is the single business API exit. Pages and stores should not create their own Axios instances, otherwise interceptors, tokens, and error models will drift across the codebase.

## Build Layer

Build infrastructure is split under `build/*`:

- `env.ts`: environment loading and validation.
- `proxy.ts`: dynamic proxy generation and custom proxy merging.
- `profile.ts`: UI/i18n profile loading.
- `optimize-deps.ts`: profile-aware dependency pre-bundling.
- `chunks.ts`: production manual chunk strategy.

Build modules stay mostly functional, which makes infrastructure behavior such as env parsing, proxy generation, and chunk splitting easy to cover with Vitest.

## Directory Boundaries

| Directory | Responsibility |
| --- | --- |
| `build/` | Testable infrastructure for Vite configuration. |
| `scripts/` | Initialization, capability injection, and dependency writing. |
| `src/pages/` | File-route page entries. |
| `src/components/` | Reusable business components and UI compositions. |
| `src/store/` | Pinia state models. |
| `src/utils/` | Request, i18n bridge, and other shared utilities. |
| `docs/` | Bilingual VitePress documentation site. |
