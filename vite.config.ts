import path from "node:path";
import UnoCSS from "@unocss/vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig, type PluginOption } from "vite";
import { compression } from "vite-plugin-compression2";
import progress from "vite-plugin-progress";
import VueDevTools from "vite-plugin-vue-devtools";
import VueRouter from "vue-router/vite";
import { manualChunks } from "./build/chunks";
import { loadLaunchpadEnv } from "./build/env";
import { createOptimizeDeps } from "./build/optimize-deps";
import { createUiResolvers, readLaunchpadProfile } from "./build/profile";
import { createProxy } from "./build/proxy";
import type { AutoImportEntry } from "./build/types";

const root = process.cwd();
const i18nPluginId: string = "@intlify/unplugin-vue-i18n/vite";

type I18nPluginFactory = (options: { include: string[] }) => PluginOption;

async function createI18nPlugins(enabled: boolean): Promise<PluginOption[]> {
  if (!enabled) {
    return [];
  }

  const loaded = (await import(i18nPluginId)) as { default?: I18nPluginFactory };
  const createI18nPlugin = loaded.default;

  if (!createI18nPlugin) {
    throw new Error("[Vue-Launchpad] i18n profile 已启用，但 @intlify/unplugin-vue-i18n 不可用。");
  }

  return [
    createI18nPlugin({
      include: [path.resolve(root, "./src/locales/**")],
    }),
  ];
}

export default defineConfig(async ({ mode }) => {
  const env = loadLaunchpadEnv(mode, root);
  const profile = readLaunchpadProfile(root);
  const proxy = await createProxy(root, env);
  const i18nPlugins = await createI18nPlugins(profile.i18n);
  const isDevelopment = env.VITE_USER_NODE_ENV === "development";
  const shouldAnalyze = process.env.ANALYZE === "true";
  const autoImports: AutoImportEntry[] = [
    {
      pinia: ["defineStore", "storeToRefs"],
      vue: ["computed", "onMounted", "reactive", "ref", "watch", "watchEffect"],
      "vue-router": ["RouterLink", "RouterView"],
      "vue-router/auto": ["useRoute", "useRouter"],
    },
    "@vueuse/core",
  ];

  if (profile.i18n) {
    autoImports.push({
      "vue-i18n": ["useI18n"],
    });
  }

  const atomicUiDirs =
    profile.ui === "shadcn-vue" || profile.ui === "nuxt-ui"
      ? ["src/components", "src/components/ui", "src/pages"]
      : ["src/components"];

  // 中文：Vite 8 与现代 ESM 解析链路会原生尊重 package.json#imports。
  // English: Vite 8 and modern ESM resolution natively honor package.json#imports.
  // 中文：因此项目不再配置 resolve.alias，避免 Vite、TypeScript、IDE 之间维护多套路径映射。
  // English: Avoid resolve.alias so Vite, TypeScript, and IDEs share one path-mapping source.
  return {
    plugins: [
      VueRouter({
        routesFolder: "src/pages",
        dts: "typed-router.d.ts",
      }),
      vue(),
      ...(isDevelopment ? [VueDevTools()] : []),
      progress({
        complete: "=",
        format: "  build [:bar] :percent | :current/:total | :elapsed s",
        incomplete: "-",
        width: 36,
      }),
      UnoCSS(),
      compression({
        algorithms: ["gzip"],
        skipIfLargerOrEqual: true,
        threshold: 10 * 1024,
      }),
      ...i18nPlugins,
      AutoImport({
        imports: autoImports,
        dirs: ["src/store", "src/utils"],
        dts: "auto-imports.d.ts",
        vueTemplate: true,
      }),
      Components({
        dirs: atomicUiDirs,
        dts: "components.d.ts",
        resolvers: createUiResolvers(profile.ui),
      }),
    ],
    define: {
      __VUE_LAUNCHPAD_I18N__: JSON.stringify(profile.i18n),
      __VUE_LAUNCHPAD_MOCK__: JSON.stringify(profile.mock),
    },
    optimizeDeps: {
      include: createOptimizeDeps(root, profile),
    },
    server: {
      host: true,
      proxy,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks,
        },
        plugins: shouldAnalyze
          ? [
              visualizer({
                brotliSize: true,
                filename: path.resolve(root, "stats.html"),
                gzipSize: true,
                open: false,
                template: "treemap",
                title: "Vue-Launchpad Bundle Stats",
              }),
            ]
          : [],
      },
    },
  };
});
