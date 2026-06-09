import { describe, expect, it } from "vitest";
import { validateEnv } from "../env";
import type { EnvRecord } from "../types";

function createValidEnv(override: Partial<EnvRecord> = {}) {
  return {
    VITE_APP_BASE_API: "/api",
    VITE_PROXY_API: "http://localhost:8080",
    VITE_USER_NODE_ENV: "development",
    ...override,
  } satisfies EnvRecord;
}

describe("validateEnv", () => {
  it("接受合法的开发环境变量矩阵", () => {
    const env = createValidEnv();

    expect(validateEnv(env, "development")).toBe(env);
  });

  it("拒绝非法用户态环境标识", () => {
    expect(() =>
      validateEnv(createValidEnv({ VITE_USER_NODE_ENV: "local" }), "development"),
    ).toThrow("VITE_USER_NODE_ENV");
  });

  it("拒绝缺失的用户态环境标识", () => {
    const env: Partial<EnvRecord> = { ...createValidEnv() };
    delete env.VITE_USER_NODE_ENV;

    expect(() => validateEnv(env as EnvRecord, "development")).toThrow("VITE_USER_NODE_ENV");
  });

  it("拒绝非法代理目标", () => {
    expect(() =>
      validateEnv(createValidEnv({ VITE_PROXY_API: "localhost:8080" }), "development"),
    ).toThrow("VITE_PROXY_API");
  });

  it("允许生产环境不声明本地代理", () => {
    const env = createValidEnv({
      VITE_APP_BASE_API: "https://api.launchpad.com",
      VITE_PROXY_API: "",
      VITE_USER_NODE_ENV: "production",
    });

    expect(validateEnv(env, "production")).toBe(env);
  });
});
