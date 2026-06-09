import type { ProxyOptions } from "vite";

export type UiKey =
  | "element-plus"
  | "ant-design-vue"
  | "naive-ui"
  | "tdesign"
  | "arco-design"
  | "shadcn-vue"
  | "nuxt-ui"
  | "varlet";

export interface LaunchpadProfile {
  i18n: boolean;
  ui: UiKey;
}

export type AutoImportEntry = Record<string, string[]> | "@vueuse/core";
export type EnvRecord = Record<string, string>;
export type ProxyConfig = Record<string, string | ProxyOptions>;
export type DeepRecord = Record<string, unknown>;

export interface CustomProxyModule {
  default?: unknown;
  proxy?: unknown;
}
