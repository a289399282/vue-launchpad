# 可选能力

## UI 引擎

Vue-Launchpad 支持 8 类 UI 生态。选择结果会影响组件自动导入解析器和依赖预构建。

| UI | 定位 |
| --- | --- |
| Element Plus | 企业后台通用组件体系。 |
| Ant Design Vue | 复杂表单和高密度中后台。 |
| Naive UI | TypeScript 友好和主题能力强。 |
| TDesign | 企业级设计语言。 |
| Arco Design | 现代后台产品设计体系。 |
| Shadcn-Vue | Headless 和强定制设计系统。 |
| Nuxt UI | Atomic UI 组合式体验。 |
| Varlet | 移动端和跨端场景。 |

## i18n

i18n 默认不安装、不打包。选择开启后，`pnpm launch` 会：

- 安装 `vue-i18n`。
- 安装 `@intlify/unplugin-vue-i18n`。
- 写入 `src/locales/zh.json` 和 `src/locales/en.json`。
- 覆盖 `src/i18n/adapter.ts`，接入真实 i18n runtime。
