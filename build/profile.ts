import fs from "node:fs";
import path from "node:path";
import type { ComponentResolver } from "unplugin-vue-components";
import {
  AntDesignVueResolver,
  ArcoResolver,
  ElementPlusResolver,
  NaiveUiResolver,
  TDesignResolver,
  VarletUIResolver,
} from "unplugin-vue-components/resolvers";
import type { LaunchpadProfile, UiKey } from "./types";

const defaultProfile = {
  i18n: false,
  mock: false,
  ui: "element-plus",
} satisfies LaunchpadProfile;

const uiKeys = new Set<UiKey>([
  "element-plus",
  "ant-design-vue",
  "naive-ui",
  "tdesign",
  "arco-design",
  "shadcn-vue",
  "nuxt-ui",
  "varlet",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isUiKey(value: unknown): value is UiKey {
  return typeof value === "string" && uiKeys.has(value as UiKey);
}

export function readLaunchpadProfile(root: string): LaunchpadProfile {
  const uiConfigPath = path.resolve(root, ".uirc.json");

  if (!fs.existsSync(uiConfigPath)) {
    return defaultProfile;
  }

  try {
    // 中文：.uirc.json 是 pnpm launch 写入的能力契约，只读取明确声明字段，避免脏配置扩散到构建链。
    // English: .uirc.json is the capability contract written by pnpm launch; only declared fields are accepted.
    const parsed = JSON.parse(fs.readFileSync(uiConfigPath, "utf8")) as unknown;

    if (!isRecord(parsed)) {
      return defaultProfile;
    }

    return {
      i18n: parsed.i18n === true,
      mock: parsed.mock === true,
      ui: isUiKey(parsed.ui) ? parsed.ui : defaultProfile.ui,
    };
  } catch {
    // 中文：配置损坏时采用 Element Plus 作为最小可运行降级，保证 dev server 不因非核心文件阻塞启动。
    // English: If the profile is broken, fall back to Element Plus so the dev server can still boot.
    return defaultProfile;
  }
}

export function createUiResolvers(ui: UiKey): ComponentResolver[] {
  switch (ui) {
    case "element-plus":
      return ElementPlusResolver({ importStyle: "css" });
    case "ant-design-vue":
      return [AntDesignVueResolver({ importStyle: "css", resolveIcons: true })];
    case "naive-ui":
      return [NaiveUiResolver()];
    case "tdesign":
      return [TDesignResolver({ library: "vue-next", esm: true, resolveIcons: true })];
    case "arco-design":
      return [ArcoResolver({ importStyle: "css", resolveIcons: true })];
    case "varlet":
      return VarletUIResolver({ importStyle: "css", autoImport: true });
    case "shadcn-vue":
    case "nuxt-ui":
      return [];
  }
}
