# 环境与代理

Vue-Launchpad 使用 Vite 标准 `.env` 文件承载运行环境差异，并额外约定 `VITE_USER_NODE_ENV` 作为业务侧可读的环境枚举。

## 环境文件

| 文件 | 使用场景 |
| --- | --- |
| `.env.example` | 提交给团队的配置样例。 |
| `.env.development` | 本地开发默认配置。 |
| `.env.staging` | 预发/测试构建配置。 |
| `.env.production` | 生产构建配置。 |
| `.env.development.local` | 本地私有配置，不建议提交。 |

## 核心变量

| 变量 | 说明 |
| --- | --- |
| `VITE_USER_NODE_ENV` | 业务侧环境标识，如 `development`、`staging`、`production`。 |
| `VITE_APP_BASE_API` | Axios 请求层读取的 API 根路径。 |
| `VITE_PROXY_API` | 开发代理目标，会映射为 `/api`。 |

## 动态代理规则

任何 `VITE_PROXY_XXX` 都会被自动转换成代理前缀：

| 环境变量 | 代理前缀 |
| --- | --- |
| `VITE_PROXY_API` | `/api` |
| `VITE_PROXY_AUTH_SERVICE` | `/auth-service` |
| `VITE_PROXY_ORDER_CENTER` | `/order-center` |

生产环境不会生成本地代理，前端会直接请求 `VITE_APP_BASE_API` 指向的真实网关。

## 自定义覆盖

如需覆盖代理细节，可以复制 `proxy.custom.example.ts` 为 `proxy.custom.ts`。同前缀配置会与自动规则深度合并，自定义字段优先级更高。

```ts
import type { LaunchpadProxyOverrides } from "./build/proxy";

export default {
  "/api": {
    target: "http://localhost:9000",
  },
} satisfies LaunchpadProxyOverrides;
```
