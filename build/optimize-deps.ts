import fs from "node:fs";
import path from "node:path";
import type { LaunchpadProfile, UiKey } from "./types";

const baseOptimizeDeps = [
  "vue",
  "vue-router",
  "pinia",
  "axios",
  "vue-i18n",
  "@vueuse/core",
] as const;

const uiOptimizeDeps = {
  "element-plus": ["element-plus/es"],
  "ant-design-vue": ["ant-design-vue/es"],
  "naive-ui": ["naive-ui"],
  tdesign: ["tdesign-vue-next/es"],
  "arco-design": ["@arco-design/web-vue/es"],
  "shadcn-vue": ["radix-vue", "class-variance-authority", "tailwind-merge"],
  "nuxt-ui": ["@nuxt/ui", "reka-ui"],
  varlet: ["@varlet/ui/es"],
} satisfies Record<UiKey, string[]>;

function getPackageName(importId: string) {
  const parts = importId.split("/");

  return importId.startsWith("@") ? parts.slice(0, 2).join("/") : (parts[0] ?? importId);
}

function isDependencyAvailable(root: string, importId: string) {
  const packageName = getPackageName(importId);

  // 中文：可选 UI 包只有在用户执行 pnpm launch 注入后才一定存在；预编译阶段必须柔性跳过缺失包。
  // English: Optional UI packages only exist after pnpm launch injects them, so pre-bundling must skip missing packages.
  return fs.existsSync(path.join(root, "node_modules", ...packageName.split("/")));
}

export function createOptimizeDeps(root: string, profile: LaunchpadProfile) {
  // 中文：将 Vue 核心、路由、状态、请求、国际化、VueUse 与当前 UI 框架核心入口锁进 Vite 预构建。
  // English: Pin Vue, router, state, request, i18n, VueUse, and the selected UI entry into Vite pre-bundling.
  // 中文：这样浏览器在开发阶段不会因为依赖扫描结果抖动而频繁触发全量 Reload。
  // English: This reduces full reloads caused by dependency scan drift during development.
  return [...new Set([...baseOptimizeDeps, ...uiOptimizeDeps[profile.ui]])].filter((importId) =>
    isDependencyAvailable(root, importId),
  );
}
