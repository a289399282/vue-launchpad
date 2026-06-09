import "virtual:uno.css";
import "./assets/main.css";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import type { App as VueApp } from "vue";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { handleHotUpdate, routes } from "vue-router/auto-routes";
import App from "./App.vue";
import { installLaunchpadI18n } from "./i18n/adapter";
import { setupRouterGuard } from "./router/guard";
import type { LocaleMessages } from "./utils/i18n";

declare const __VUE_LAUNCHPAD_I18N__: boolean;

function createLocaleMessages(modules: Record<string, LocaleMessages>) {
  return Object.entries(modules).reduce<Record<string, LocaleMessages>>(
    (messages, [filePath, module]) => {
      const locale = filePath.match(/([^/\\]+)\.json$/)?.[1];

      if (locale) {
        messages[locale] = module;
      }

      return messages;
    },
    {},
  );
}

async function installI18n(app: VueApp) {
  if (!__VUE_LAUNCHPAD_I18N__) {
    return;
  }

  const localeModules = import.meta.glob<LocaleMessages>("./locales/*.json", {
    eager: true,
    import: "default",
  });
  const messages = createLocaleMessages(localeModules);

  if (Object.keys(messages).length === 0) {
    return;
  }

  await installLaunchpadI18n(app, messages);
}

const app = createApp(App);
const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes,
});

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
setupRouterGuard(router);
app.use(router);
await installI18n(app);

if (import.meta.hot) {
  handleHotUpdate(router);
}

app.mount("#app");
