import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import type { ProxyOptions } from "vite";
import type { CustomProxyModule, DeepRecord, EnvRecord, ProxyConfig } from "./types";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toProxyPrefix(envKey: string) {
  // 中文：VITE_PROXY_API -> /api；VITE_PROXY_AUTH_SERVICE -> /auth-service。
  // English: VITE_PROXY_API maps to /api, while VITE_PROXY_AUTH_SERVICE maps to /auth-service.
  // 中文：统一小写与短横线格式，可以让环境变量命名和 HTTP 路径命名都保持可读。
  // English: Normalize to lowercase kebab-case so env keys and HTTP prefixes stay readable.
  return `/${envKey
    .replace(/^VITE_PROXY_/, "")
    .toLowerCase()
    .replace(/_/g, "-")}`;
}

function isRecord(value: unknown): value is DeepRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toProxyConfig(value: unknown): ProxyConfig {
  return isRecord(value) ? (value as ProxyConfig) : {};
}

export function deepMergeRecords(base: DeepRecord, override: DeepRecord): DeepRecord {
  return Object.entries(override).reduce<DeepRecord>(
    (merged, [key, overrideValue]) => {
      const baseValue = merged[key];

      // 中文：仅普通对象进入递归合并；rewrite 函数、数组、字符串 target 等叶子节点保持原子覆盖。
      // English: Only plain objects are recursively merged; functions, arrays, and string targets are atomic leaves.
      // 中文：用户只覆盖 target 时不会丢失自动 rewrite，显式覆盖 rewrite 时又能获得最高优先级。
      // English: Overriding only target keeps generated rewrite, while explicitly overriding rewrite still wins.
      merged[key] =
        isRecord(baseValue) && isRecord(overrideValue)
          ? deepMergeRecords(baseValue, overrideValue)
          : overrideValue;

      return merged;
    },
    { ...base },
  );
}

export function mergeProxyConfig(autoProxy: ProxyConfig, customProxy: ProxyConfig): ProxyConfig {
  return Object.entries(customProxy).reduce<ProxyConfig>(
    (merged, [prefix, customRule]) => {
      const autoRule = merged[prefix];

      // 中文：自动规则提供标准降级能力，自定义规则作为最高优先级覆盖层；同前缀对象会深度合并。
      // English: Auto rules provide the default baseline; custom rules are the highest-priority override layer.
      merged[prefix] =
        isRecord(autoRule) && isRecord(customRule)
          ? (deepMergeRecords(autoRule, customRule) as ProxyOptions)
          : customRule;

      return merged;
    },
    { ...autoProxy },
  );
}

export function createDynamicProxy(env: EnvRecord): ProxyConfig {
  if (env.VITE_USER_NODE_ENV === "production") {
    // 中文：生产环境直接使用真实 API 网关，前端构建产物不生成本地开发代理。
    // English: Production uses the real API gateway directly, so no local dev proxy is generated.
    return {};
  }

  return Object.entries(env).reduce<ProxyConfig>((proxy, [key, target]) => {
    if (!key.startsWith("VITE_PROXY_") || target.length === 0) {
      return proxy;
    }

    const prefix = toProxyPrefix(key);
    const prefixMatcher = new RegExp(`^${escapeRegExp(prefix)}`);

    // 中文：每一个 VITE_PROXY_* 都自动生成一条 Vite dev server 代理规则。
    // English: Each VITE_PROXY_* key generates one Vite dev-server proxy rule.
    // 中文：changeOrigin 兼容多数网关 Host 校验；rewrite 删除本地代理前缀；target 来自当前 mode 快照。
    // English: changeOrigin handles Host checks, rewrite removes the local prefix, and target comes from the mode snapshot.
    proxy[prefix] = {
      changeOrigin: true,
      rewrite: (requestPath) => requestPath.replace(prefixMatcher, "") || "/",
      target,
    };

    return proxy;
  }, {});
}

async function importJavaScriptProxy(proxyPath: string): Promise<CustomProxyModule> {
  const proxyUrl = pathToFileURL(proxyPath);
  proxyUrl.searchParams.set("t", String(fs.statSync(proxyPath).mtimeMs));

  return (await import(proxyUrl.href)) as CustomProxyModule;
}

async function importTypeScriptProxy(proxyPath: string): Promise<CustomProxyModule> {
  const source = fs.readFileSync(proxyPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: true,
    },
    fileName: proxyPath,
  });
  const encoded = Buffer.from(transpiled.outputText, "utf8").toString("base64");

  // 中文：proxy.custom.ts 采用 fs 读取后转译为 ESM，再交给原生动态 import() 执行。
  // English: proxy.custom.ts is read from disk, transpiled to ESM, and executed through native dynamic import().
  // 中文：该链路不使用 require，也不会把自定义代理文件纳入主配置的静态依赖图，适合本地柔性覆盖。
  // English: This avoids require and keeps the custom proxy file out of the static config dependency graph.
  return (await import(`data:text/javascript;base64,${encoded}`)) as CustomProxyModule;
}

export async function loadCustomProxy(root: string): Promise<ProxyConfig> {
  const customProxyPath = path.resolve(root, "proxy.custom.ts");

  if (!fs.existsSync(customProxyPath)) {
    return {};
  }

  try {
    const loaded = customProxyPath.endsWith(".ts")
      ? await importTypeScriptProxy(customProxyPath)
      : await importJavaScriptProxy(customProxyPath);

    return toProxyConfig(loaded.default ?? loaded.proxy);
  } catch (error) {
    console.warn("[Vue-Launchpad] proxy.custom.ts 加载失败，已自动降级为环境变量动态代理。", error);
    return {};
  }
}

export async function createProxy(root: string, env: EnvRecord) {
  const autoProxy = createDynamicProxy(env);
  const customProxy = await loadCustomProxy(root);

  return mergeProxyConfig(autoProxy, customProxy);
}
