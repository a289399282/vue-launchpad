# Generators

Vue-Launchpad uses Plop to provide consistent engineering templates and reduce repetitive hand-written pages, components, stores, and API modules.

## Start The Generator

```bash
pnpm gen
```

Available generators:

| Generator | Output | Use Case |
| --- | --- | --- |
| `page` | `src/pages/{{name}}.vue` | Create a file-route page. |
| `component` | `src/components/{{Name}}.vue` | Create a reusable component. |
| `store` | `src/store/{{name}}.ts` | Create a Pinia setup store. |
| `api` | `src/api/{{name}}.ts` | Create a typed request module. |

## Naming Rules

Generator names may contain letters, numbers, slashes, underscores, and dashes. They are normalized internally into:

- `kebabCase`: file names and route segments.
- `PascalCase`: component names, interface names, and store names.
- `camelCase`: variable names.

## Recommended Workflow

1. Generate the skeleton with `pnpm gen`.
2. Fill in business fields and API types.
3. Run `pnpm check` to verify formatting, linting, and types.
4. Add Vitest coverage for core logic.
