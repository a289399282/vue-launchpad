import { loadEnv } from "vite";
import type { EnvRecord } from "./types";

const userNodeEnvValues = new Set(["development", "staging", "production"]);

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isBaseApi(value: string) {
  return value.startsWith("/") || isHttpUrl(value);
}

export function validateEnv(env: EnvRecord, mode: string): EnvRecord {
  const userNodeEnv = env.VITE_USER_NODE_ENV;
  const baseApi = env.VITE_APP_BASE_API;

  if (!userNodeEnv || !userNodeEnvValues.has(userNodeEnv)) {
    throw new Error(
      `[Vue-Launchpad] ${mode} 环境缺少合法的 VITE_USER_NODE_ENV，必须是 development/staging/production。`,
    );
  }

  if (!baseApi || !isBaseApi(baseApi)) {
    throw new Error(
      `[Vue-Launchpad] ${mode} 环境缺少合法的 VITE_APP_BASE_API，必须是 /api 或 http(s) URL。`,
    );
  }

  for (const [key, value] of Object.entries(env)) {
    if (key.startsWith("VITE_PROXY_") && value.length > 0 && !isHttpUrl(value)) {
      throw new Error(`[Vue-Launchpad] ${key} 必须配置为 http(s) 代理目标。`);
    }
  }

  return env;
}

export function loadLaunchpadEnv(mode: string, root: string) {
  // 中文：严格使用 Vite 的 loadEnv(mode, root, "") 获取当前模式环境快照。
  // English: Use Vite loadEnv(mode, root, "") as the single source of the current mode snapshot.
  // 中文：这里不读取、不合并、不写入 process.env，避免全局环境被配置层隐式污染。
  // English: Do not read, merge, or mutate process.env, keeping config state isolated.
  return validateEnv(loadEnv(mode, root, ""), mode);
}
