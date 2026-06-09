# Environment

Vue-Launchpad uses standard Vite `.env` files for runtime differences and adds `VITE_USER_NODE_ENV` as a business-readable environment enum.

## Env Files

| File | Purpose |
| --- | --- |
| `.env.example` | Shared configuration sample committed for the team. |
| `.env.development` | Default local development configuration. |
| `.env.staging` | Staging/test build configuration. |
| `.env.production` | Production build configuration. |
| `.env.development.local` | Local private overrides, usually not committed. |

## Core Variables

| Variable | Description |
| --- | --- |
| `VITE_USER_NODE_ENV` | Business environment label, such as `development`, `staging`, or `production`. |
| `VITE_APP_BASE_API` | API base path consumed by the Axios request layer. |
| `VITE_PROXY_API` | Development proxy target mapped to `/api`. |
| `VITE_MOCK` | MSW mock switch, usually written by `pnpm launch` into a local env file. |

## Dynamic Proxy Rules

Every `VITE_PROXY_XXX` variable is converted into a proxy prefix:

| Env Variable | Proxy Prefix |
| --- | --- |
| `VITE_PROXY_API` | `/api` |
| `VITE_PROXY_AUTH_SERVICE` | `/auth-service` |
| `VITE_PROXY_ORDER_CENTER` | `/order-center` |

Production does not generate local proxy rules. The frontend calls the real gateway defined by `VITE_APP_BASE_API`.

## Custom Overrides

To override proxy details, copy `proxy.custom.example.ts` to `proxy.custom.ts`. Same-prefix options are deeply merged with generated rules, and custom fields take priority.

```ts
import type { LaunchpadProxyOverrides } from "./build/proxy";

export default {
  "/api": {
    target: "http://localhost:9000",
  },
} satisfies LaunchpadProxyOverrides;
```
