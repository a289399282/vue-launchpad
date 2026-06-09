<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { computed, inject } from "vue";
import { type LaunchpadLocale, launchpadI18nKey } from "#app/utils/i18n.ts";

type LocaleKey = LaunchpadLocale;

interface MessageTree {
  [key: string]: MessageTree | string;
}

interface StackCard {
  accent: string;
  code: string;
  key: "vite" | "typescript" | "vue" | "routes" | "unocss" | "biome";
  metric: string;
}

const fallbackMessages = {
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
} satisfies Record<LocaleKey, MessageTree>;

const i18nBridge = inject(launchpadI18nKey, null);
const activeLocale = computed<LocaleKey>(() => (i18nBridge?.locale.value === "en" ? "en" : "zh"));
// biome-ignore lint/correctness/noUnusedVariables: 中文：Vue 模板会引用该变量。English: Referenced by the Vue template.
const i18nEnabled = computed(() => i18nBridge !== null);
const isDark = useDark();
// biome-ignore lint/correctness/noUnusedVariables: 中文：Vue 模板会引用该变量。English: Referenced by the Vue template.
const toggleDark = useToggle(isDark);

// biome-ignore lint/correctness/noUnusedVariables: 中文：Vue 模板会引用该变量。English: Referenced by the Vue template.
const stackCards = computed<StackCard[]>(() => [
  { accent: "from-cyan-300 to-sky-500", code: "HMR", key: "vite", metric: "8" },
  { accent: "from-blue-300 to-indigo-500", code: "TYPES", key: "typescript", metric: "6.0" },
  { accent: "from-emerald-300 to-teal-500", code: "REACTIVITY", key: "vue", metric: "3.5" },
  { accent: "from-fuchsia-300 to-purple-500", code: "AUTO", key: "routes", metric: "R" },
  { accent: "from-amber-300 to-orange-500", code: "ATOMIC", key: "unocss", metric: "CSS" },
  { accent: "from-rose-300 to-red-500", code: "QUALITY", key: "biome", metric: "OK" },
]);

function resolveFallback(path: string) {
  const value = path.split(".").reduce<unknown>((node, segment) => {
    if (typeof node === "object" && node !== null && segment in node) {
      return (node as Record<string, unknown>)[segment];
    }

    return undefined;
  }, fallbackMessages[activeLocale.value]);

  return typeof value === "string" ? value : path;
}

// biome-ignore lint/correctness/noUnusedVariables: 中文：Vue 模板会引用该函数。English: Referenced by the Vue template.
function text(path: string) {
  return i18nBridge?.t(path) ?? resolveFallback(path);
}

// biome-ignore lint/correctness/noUnusedVariables: 中文：Vue 模板会引用该函数。English: Referenced by the Vue template.
function toggleLocale() {
  if (!i18nBridge) {
    return;
  }

  i18nBridge.setLocale(activeLocale.value === "zh" ? "en" : "zh");
}
</script>

<template>
  <main
    class="relative isolate min-h-screen overflow-hidden bg-slate-100 text-slate-950 selection:bg-cyan-300 selection:text-slate-950 dark:bg-slate-950 dark:text-slate-50"
  >
    <div
      class="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_12%,rgba(6,182,212,.18),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(249,115,22,.14),transparent_28%),linear-gradient(145deg,#f8fafc_0%,#e2e8f0_48%,#f1f5f9_100%)] dark:hidden"
    />
    <div
      class="absolute inset-0 -z-20 hidden bg-[radial-gradient(circle_at_12%_12%,rgba(34,211,238,.28),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(244,63,94,.24),transparent_28%),radial-gradient(circle_at_52%_82%,rgba(16,185,129,.2),transparent_30%),linear-gradient(145deg,#020617_0%,#111827_46%,#030712_100%)] dark:block"
    />
    <div class="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
    <div class="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 bg-cyan-300/12 blur-3xl" />

    <section class="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
      <header class="flex items-center justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase text-cyan-700 dark:text-cyan-200">
            {{ text("hero.eyebrow") }}
          </p>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-500">
            Vite / Vue / TypeScript / UnoCSS / Biome
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            v-if="i18nEnabled"
            class="focus-ring border border-slate-300 bg-white/70 px-4 py-2 text-sm font-bold text-slate-800 shadow-lg shadow-slate-200/60 transition hover:border-orange-400 hover:text-orange-600 dark:border-cyan-200/25 dark:bg-white/8 dark:text-cyan-100 dark:shadow-black/30 dark:hover:border-orange-300 dark:hover:text-orange-200"
            type="button"
            @click="toggleLocale"
          >
            {{ text("hero.switchTo") }}
          </button>

          <button
            class="focus-ring grid h-10 w-10 place-items-center border border-slate-300 bg-white/80 text-lg text-slate-800 shadow-lg shadow-slate-200/60 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-white/15 dark:bg-white/8 dark:text-cyan-100 dark:shadow-black/30 dark:hover:border-orange-300 dark:hover:text-orange-200"
            type="button"
            :aria-label="isDark ? '切换到日间模式' : '切换到暗黑模式'"
            @click="toggleDark()"
          >
            <span aria-hidden="true">{{ isDark ? "☾" : "☀" }}</span>
          </button>
        </div>
      </header>

      <div class="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[.9fr_1.1fr]">
        <section>
          <div class="inline-flex border border-white/10 bg-white/6 px-3 py-1 text-sm text-slate-300">
            {{ text("stack.label") }}
          </div>

          <h1
            class="mt-5 max-w-12ch text-5xl font-black leading-tight text-slate-950 sm:text-7xl dark:text-white"
          >
            {{ text("hero.title") }}
          </h1>

          <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {{ text("hero.subtitle") }}
          </p>

          <div class="mt-8 grid max-w-xl grid-cols-3 gap-3">
            <div class="border border-white/10 bg-white/7 p-4">
              <p class="text-2xl font-black text-cyan-200">8</p>
              <p class="mt-1 text-xs uppercase text-slate-400">Vite</p>
            </div>
            <div class="border border-white/10 bg-white/7 p-4">
              <p class="text-2xl font-black text-emerald-200">3.5</p>
              <p class="mt-1 text-xs uppercase text-slate-400">Vue</p>
            </div>
            <div class="border border-white/10 bg-white/7 p-4">
              <p class="text-2xl font-black text-orange-200">6.0</p>
              <p class="mt-1 text-xs uppercase text-slate-400">TypeScript</p>
            </div>
          </div>
        </section>

        <section class="grid gap-4 sm:grid-cols-2">
          <article
            v-for="card in stackCards"
            :key="card.key"
            class="group relative min-h-50 overflow-hidden border border-slate-200 bg-white/70 p-5 shadow-2xl shadow-slate-300/40 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-white/90 dark:border-white/10 dark:bg-slate-950/62 dark:shadow-black/30 dark:hover:border-cyan-200/45 dark:hover:bg-slate-900/82"
          >
            <div
              class="absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-80 transition group-hover:opacity-100"
              :class="card.accent"
            />
            <div
              class="absolute -right-10 -top-10 h-30 w-30 bg-gradient-to-br opacity-18 blur-2xl transition group-hover:opacity-30"
              :class="card.accent"
            />

            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-500">
                  {{ card.code }}
                </p>
                <h2 class="mt-3 text-2xl font-black text-slate-950 dark:text-white">
                  {{ text(`stack.${card.key}.title`) }}
                </h2>
              </div>
              <p
                class="grid h-12 w-12 place-items-center border border-slate-200 bg-slate-950 text-sm font-black text-cyan-100 dark:border-white/12 dark:bg-white/8"
              >
                {{ card.metric }}
              </p>
            </div>

            <p class="mt-5 leading-7 text-slate-600 dark:text-slate-300">
              {{ text(`stack.${card.key}.description`) }}
            </p>
          </article>
        </section>
      </div>
    </section>
  </main>
</template>
