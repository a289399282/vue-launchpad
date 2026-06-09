import type { ProxyOptions } from "vite";
import { describe, expect, it } from "vitest";
import { createDynamicProxy, mergeProxyConfig } from "../proxy";
import type { ProxyConfig } from "../types";

function asProxyOptions(rule: string | ProxyOptions | undefined) {
  if (typeof rule === "string" || rule === undefined) {
    throw new Error("Expected object proxy rule.");
  }

  return rule;
}

describe("createDynamicProxy", () => {
  it("把 VITE_PROXY_* 环境变量转换为 Vite 代理规则", () => {
    const proxy = createDynamicProxy({
      VITE_APP_BASE_API: "/api",
      VITE_PROXY_API: "http://localhost:8080",
      VITE_PROXY_AUTH_SERVICE: "https://auth.launchpad.com",
      VITE_USER_NODE_ENV: "development",
    });

    const apiProxy = asProxyOptions(proxy["/api"]);
    const authProxy = asProxyOptions(proxy["/auth-service"]);

    expect(apiProxy.target).toBe("http://localhost:8080");
    expect(apiProxy.changeOrigin).toBe(true);
    expect(apiProxy.rewrite?.("/api/users")).toBe("/users");
    expect(apiProxy.rewrite?.("/api")).toBe("/");
    expect(authProxy.target).toBe("https://auth.launchpad.com");
  });

  it("生产环境不生成本地代理规则", () => {
    expect(
      createDynamicProxy({
        VITE_APP_BASE_API: "https://api.launchpad.com",
        VITE_PROXY_API: "http://localhost:8080",
        VITE_USER_NODE_ENV: "production",
      }),
    ).toEqual({});
  });
});

describe("mergeProxyConfig", () => {
  it("同前缀对象深度合并且自定义规则优先", () => {
    const baseRewrite = (requestPath: string) => requestPath.replace(/^\/api/, "") || "/";
    const autoProxy = {
      "/api": {
        changeOrigin: true,
        rewrite: baseRewrite,
        target: "http://localhost:8080",
      },
    } satisfies ProxyConfig;
    const customProxy = {
      "/api": {
        headers: {
          "X-Launchpad-Proxy": "custom",
        },
        target: "https://override.launchpad.com",
      },
    } satisfies ProxyConfig;

    const merged = asProxyOptions(mergeProxyConfig(autoProxy, customProxy)["/api"]);

    expect(merged.target).toBe("https://override.launchpad.com");
    expect(merged.changeOrigin).toBe(true);
    expect(merged.rewrite).toBe(baseRewrite);
    expect(merged.headers).toEqual({
      "X-Launchpad-Proxy": "custom",
    });
  });
});
