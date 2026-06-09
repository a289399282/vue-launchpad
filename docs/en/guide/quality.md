# Quality Gates

Vue-Launchpad's quality system is built around three layers: automatic fixes before commit, hard failures in CI, and type safety before builds.

## Biome

Biome handles formatting, linting, and import organization:

```bash
pnpm lint
pnpm lint:fix
```

`lint:fix` applies safe automatic fixes. Non-fixable issues should be handled explicitly in business code instead of being hidden behind broad ignore comments.

## TypeScript

The project enables a strict typing baseline:

- `strict`
- `noUncheckedIndexedAccess`
- `exactOptionalPropertyTypes`
- `verbatimModuleSyntax`
- `allowImportingTsExtensions`

These options reveal nullability, optional-field, and module-boundary problems early, which is appropriate for a long-lived starter.

## Vitest

Test scripts:

```bash
pnpm test
pnpm test:run
```

Recommended test priorities:

1. Build infrastructure: env parsing, proxy generation, and profile loading.
2. Request layer: error model, duplicate cancellation, and business envelope unwrapping.
3. Business stores: cross-page shared state and async actions.

## Git Hooks

The project configures Husky and lint-staged, and uses the `prepare` script to install Git Hooks after dependencies are installed. Team members get pre-commit checks after running `pnpm install`.
