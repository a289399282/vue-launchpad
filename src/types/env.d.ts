type LaunchpadUserNodeEnv = "development" | "production" | "staging";
type LaunchpadDefaultProxyTarget = "http://localhost:8080" | "https://staging-api.launchpad.com";
type LaunchpadProxyTarget = `http://${string}` | `https://${string}`;

interface ImportMetaEnv {
  /**
   * 中文：用户态环境标识。
   * English: User-facing environment identifier.
   *
   * 中文：与 Vite 内置 MODE 不同，该字段面向业务代码使用，可直接区分开发、预发、生产。
   * English: Unlike Vite MODE, this value is consumed by product code to distinguish dev, staging, and production.
   */
  readonly VITE_USER_NODE_ENV: LaunchpadUserNodeEnv;

  /**
   * 中文：业务 API 根路径。
   * English: Business API base path.
   *
   * 中文：开发和预发通常配置为 /api，交给 Vite 动态代理；生产环境配置为真实网关地址。
   * English: Dev and staging usually use /api for Vite proxying; production points to the real gateway.
   */
  readonly VITE_APP_BASE_API: "/api" | "https://api.launchpad.com";

  /**
   * 中文：默认 API 动态代理目标。
   * English: Default dynamic API proxy target.
   *
   * 中文：vite.config.ts 会把 VITE_PROXY_API 自动转换为 /api 代理规则，并将前缀重写为空。
   * English: vite.config.ts converts VITE_PROXY_API into a /api proxy rule and strips the local prefix.
   * 中文：生产环境不声明该字段，避免构建产物误以为仍存在本地开发代理。
   * English: Production omits this field so builds do not assume a local dev proxy exists.
   */
  readonly VITE_PROXY_API?: LaunchpadDefaultProxyTarget;

  /**
   * 中文：动态微服务代理矩阵。
   * English: Dynamic microservice proxy matrix.
   *
   * 中文：任意 VITE_PROXY_XXX 都会被自动映射为 /xxx 代理前缀。
   * English: Any VITE_PROXY_XXX key is automatically mapped to a /xxx proxy prefix.
   * 中文：例如 VITE_PROXY_AUTH_SERVICE=https://auth.example.com 会映射为 /auth-service。
   * English: For example, VITE_PROXY_AUTH_SERVICE=https://auth.example.com maps to /auth-service.
   */
  readonly [key: `VITE_PROXY_${string}`]: LaunchpadProxyTarget | undefined;
}

interface ImportMeta {
  /** 中文：Vite 注入的强类型环境变量集合。English: Strongly typed env variables injected by Vite. */
  readonly env: ImportMetaEnv;
}
