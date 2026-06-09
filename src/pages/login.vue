<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "#app/store/user.ts";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const redirectPath = computed(() => {
  const redirect = route.query.redirect;
  return typeof redirect === "string" && redirect.startsWith("/") ? redirect : "/";
});

// biome-ignore lint/correctness/noUnusedVariables: 中文：Vue 模板会引用该函数。English: Referenced by the Vue template.
async function enterLaunchpad() {
  userStore.useMockPilot();
  await router.replace(redirectPath.value);
}
</script>

<template>
  <main
    class="grid min-h-screen place-items-center bg-slate-100 px-6 text-slate-950 dark:bg-slate-950 dark:text-white"
  >
    <section
      class="w-full max-w-md border border-slate-200 bg-white/80 p-8 shadow-2xl shadow-slate-300/40 backdrop-blur-xl dark:border-white/10 dark:bg-white/8 dark:shadow-black/40"
    >
      <p class="text-xs font-bold uppercase text-cyan-700 dark:text-cyan-200">Vue-Launchpad</p>
      <h1 class="mt-4 text-3xl font-black">Launch Access</h1>
      <p class="mt-4 leading-7 text-slate-600 dark:text-slate-300">
        Enterprise route guard is active. Use the mock pilot to enter the protected architecture
        screen.
      </p>
      <button
        class="focus-ring mt-7 w-full bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-cyan-700 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-white"
        type="button"
        @click="enterLaunchpad"
      >
        Enter Launchpad
      </button>
    </section>
  </main>
</template>
