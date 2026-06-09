import type { ProxyConfig } from "./build/types";

// 中文：自定义代理覆盖层：key 必须是本地代理前缀，value 遵循 Vite ProxyOptions。
// English: Custom proxy override layer: keys are local proxy prefixes and values follow Vite ProxyOptions.
// 中文：与 VITE_PROXY_* 自动生成的规则同前缀时会深度合并；这里声明的字段拥有最高优先级。
// English: Same-prefix custom rules are deeply merged with generated VITE_PROXY_* rules and take priority.
export default {
  "/api": {
    headers: {
      "X-Launchpad-Proxy": "custom",
    },
  },
} satisfies ProxyConfig;
