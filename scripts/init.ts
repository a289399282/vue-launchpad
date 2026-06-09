import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import fs from "fs-extra";
import inquirer from "inquirer";
import pc from "picocolors";

type UiKey =
  | "element-plus"
  | "ant-design-vue"
  | "naive-ui"
  | "tdesign"
  | "arco-design"
  | "shadcn-vue"
  | "nuxt-ui"
  | "varlet";

interface UiChoice {
  name: string;
  value: UiKey;
}

interface InitAnswers {
  i18n: boolean;
  ui: UiKey;
}

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
}

const root = process.cwd();
const packagePath = path.join(root, "package.json");
const uiConfigPath = path.join(root, ".uirc.json");
const i18nDir = path.join(root, "src", "i18n");
const localesDir = path.join(root, "src", "locales");

const choices = [
  { name: "Element Plus", value: "element-plus" },
  { name: "Ant Design Vue", value: "ant-design-vue" },
  { name: "Naive UI", value: "naive-ui" },
  { name: "TDesign", value: "tdesign" },
  { name: "Arco Design", value: "arco-design" },
  { name: "Shadcn-Vue (Headless)", value: "shadcn-vue" },
  { name: "Nuxt UI (Atomic)", value: "nuxt-ui" },
  { name: "Varlet", value: "varlet" },
] satisfies UiChoice[];

const dependenciesByUi = {
  "element-plus": {
    "element-plus": "^2.14.1",
  },
  "ant-design-vue": {
    "@ant-design/icons-vue": "^7.0.1",
    "ant-design-vue": "^4.2.6",
  },
  "naive-ui": {
    "naive-ui": "^2.44.1",
  },
  tdesign: {
    "tdesign-vue-next": "^1.20.1",
  },
  "arco-design": {
    "@arco-design/web-vue": "^2.58.0",
  },
  "shadcn-vue": {
    "class-variance-authority": "^0.7.1",
    clsx: "^2.1.1",
    "lucide-vue-next": "^1.0.0",
    "radix-vue": "^1.9.17",
    "shadcn-vue": "^2.7.4",
    "tailwind-merge": "^3.6.0",
  },
  "nuxt-ui": {
    "@nuxt/ui": "^4.8.2",
    "class-variance-authority": "^0.7.1",
    clsx: "^2.1.1",
    "lucide-vue-next": "^1.0.0",
    "reka-ui": "^2.9.9",
    "tailwind-merge": "^3.6.0",
  },
  varlet: {
    "@varlet/ui": "^3.17.1",
  },
} satisfies Record<UiKey, Record<string, string>>;

const i18nDependencies = {
  "vue-i18n": "^11.4.5",
} satisfies Record<string, string>;

const i18nDevDependencies = {
  "@intlify/unplugin-vue-i18n": "^11.2.3",
} satisfies Record<string, string>;

const localeMessages = {
  zh: {
    hero: {
      eyebrow: "Vue-Launchpad 架构展示大屏",
      title: "面向极速交付的现代 Vue 发射台",
      subtitle:
        "将 Vite 8、TypeScript 6.0、Vue 3.5、强类型文件路由、UnoCSS 与 Biome 组合成一套可扩展的开源脚手架。",
      switchTo: "EN",
    },
    stack: {
      label: "核心技术栈",
      vite: {
        title: "Vite 8",
        description: "极速冷启动、精确 HMR 与生产级 Rollup 构建链路。",
      },
      typescript: {
        title: "TS 6.0",
        description: "严格类型、Bundler 解析与现代语法推导。",
      },
      vue: {
        title: "Vue 3.5",
        description: "组合式 API、响应式系统与高性能模板编译。",
      },
      routes: {
        title: "文件路由",
        description: "基于 src/pages 自动生成强类型路由声明。",
      },
      unocss: {
        title: "UnoCSS",
        description: "原子化样式引擎，按需生成暗黑极客界面。",
      },
      biome: {
        title: "Biome",
        description: "格式化、Lint 与导入整理的一体化质量门禁。",
      },
    },
  },
  en: {
    hero: {
      eyebrow: "Vue-Launchpad Architecture Screen",
      title: "A modern Vue launchpad for ruthless delivery",
      subtitle:
        "Vite 8, TypeScript 6.0, Vue 3.5, typed file routes, UnoCSS, and Biome assembled into an extensible open-source starter.",
      switchTo: "中文",
    },
    stack: {
      label: "Core Architecture",
      vite: {
        title: "Vite 8",
        description: "Instant cold starts, precise HMR, and production-grade Rollup builds.",
      },
      typescript: {
        title: "TS 6.0",
        description: "Strict typing, Bundler resolution, and modern inference.",
      },
      vue: {
        title: "Vue 3.5",
        description: "Composition API, reactive primitives, and high-performance templates.",
      },
      routes: {
        title: "File Routes",
        description: "Typed route declarations generated from src/pages.",
      },
      unocss: {
        title: "UnoCSS",
        description: "Atomic CSS generation for sharp dark-mode interfaces.",
      },
      biome: {
        title: "Biome",
        description: "A single quality gate for formatting, linting, and import ordering.",
      },
    },
  },
};

function printBanner() {
  const banner = String.raw`
 __     __ _   _ _____        _        _    _   _ _   _  ____ _   _ ____   _    ____
 \ \   / /| | | | ____|      | |      / \  | | | | \ | |/ ___| | | |  _ \ / \  |  _ \
  \ \ / / | | | |  _| _____  | |     / _ \ | | | |  \| | |   | |_| | |_) / _ \ | | | |
   \ V /  | |_| | |__|_____| | |___ / ___ \| |_| | |\  | |___|  _  |  __/ ___ \| |_| |
    \_/    \___/|_____|      |_____/_/   \_\\___/|_| \_|\____|_| |_|_| /_/   \_\____/
`;

  console.log(pc.blue(banner));
}

async function writeLocaleMessages() {
  await fs.ensureDir(i18nDir);
  await fs.ensureDir(localesDir);
  await fs.writeJson(path.join(localesDir, "zh.json"), localeMessages.zh, { spaces: 2 });
  await fs.writeJson(path.join(localesDir, "en.json"), localeMessages.en, { spaces: 2 });
  await fs.outputFile(
    path.join(i18nDir, "adapter.ts"),
    `import type { App as VueApp, Ref } from "vue";
import { ref } from "vue";
import { createI18n } from "vue-i18n";
import {
  launchpadI18nKey,
  type LaunchpadLocale,
  type LocaleMessages,
} from "#app/utils/i18n.ts";

interface I18nGlobal {
  locale: Ref<LaunchpadLocale | string> | string;
  t: (key: string) => string;
}

function normalizeLocale(locale: string): LaunchpadLocale {
  return locale === "en" ? "en" : "zh";
}

function readLocale(locale: I18nGlobal["locale"]): LaunchpadLocale {
  return normalizeLocale(typeof locale === "string" ? locale : locale.value);
}

function writeLocale(locale: I18nGlobal["locale"], nextLocale: LaunchpadLocale) {
  if (typeof locale === "string") {
    return nextLocale;
  }

  locale.value = nextLocale;
  return nextLocale;
}

export async function installLaunchpadI18n(
  app: VueApp,
  messages: Record<string, LocaleMessages>,
) {
  const i18n = createI18n({
    fallbackLocale: "en",
    legacy: false,
    locale: "zh",
    messages,
  });

  app.use(i18n);
  const global = i18n.global as I18nGlobal;
  const locale = ref<LaunchpadLocale>(readLocale(global.locale));

  app.provide(launchpadI18nKey, {
    locale,
    setLocale: (nextLocale) => {
      locale.value = writeLocale(global.locale, nextLocale);
    },
    t: global.t,
  });
}
`,
  );
}

async function installSelectedDependencies() {
  printBanner();

  const answers = await inquirer.prompt<InitAnswers>([
    {
      name: "ui",
      type: "select",
      message: "Select the UI engine for Vue-Launchpad:",
      choices,
      default: "element-plus",
    },
    {
      name: "i18n",
      type: "confirm",
      message: "是否需要开启国际化(i18n)多语言支持？(Is i18n support required?)",
      default: false,
    },
  ]);

  const packageJson = JSON.parse(await readFile(packagePath, "utf8")) as PackageJson;
  packageJson.dependencies = {
    ...(packageJson.dependencies ?? {}),
    ...dependenciesByUi[answers.ui],
    ...(answers.i18n ? i18nDependencies : {}),
  };
  packageJson.devDependencies = {
    ...(packageJson.devDependencies ?? {}),
    ...(answers.i18n ? i18nDevDependencies : {}),
  };

  if (answers.i18n) {
    await writeLocaleMessages();
  }

  await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
  await fs.writeJson(uiConfigPath, { i18n: answers.i18n, ui: answers.ui }, { spaces: 2 });

  console.log(pc.cyan(`\nUI profile written: ${answers.ui}`));
  console.log(pc.cyan(`i18n support: ${answers.i18n ? "enabled" : "disabled"}`));
  console.log(pc.dim("Installing selected dependencies with pnpm install...\n"));

  const child = spawn("pnpm", ["install"], {
    cwd: root,
    shell: true,
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

void installSelectedDependencies();
