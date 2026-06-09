export function manualChunks(id: string) {
  if (!id.includes("node_modules")) {
    return;
  }

  // 中文：Vue 生态集中在 vendor-vue，便于浏览器稳定缓存框架层。
  // English: Keep the Vue ecosystem in vendor-vue so browsers can cache the framework layer reliably.
  if (
    /[\\/]node_modules[\\/](vue|@vue|vue-router|pinia|pinia-plugin-persistedstate|vue-i18n|@intlify)[\\/]/.test(
      id,
    )
  ) {
    return "vendor-vue";
  }

  // 中文：工具库独立分区，避免业务页面 chunk 因 Axios/VueUse/NProgress 变化而失效。
  // English: Split utility libraries away from page chunks to reduce cache invalidation from shared tooling changes.
  if (/[\\/]node_modules[\\/](axios|@vueuse|nprogress)[\\/]/.test(id)) {
    return "vendor-utils";
  }

  return "vendor";
}
