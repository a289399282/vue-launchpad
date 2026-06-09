# 架构设计

Vue-Launchpad 的目标不是把所有生态强塞进模板，而是把“基础可运行”和“按需增强”拆成两层。默认项目保持轻量，交互式初始化再把 UI、i18n 等能力写入 profile，让构建链按声明进行装配。

## 能力 profile

`.uirc.json` 是 Vue-Launchpad 的能力契约。`pnpm launch` 会写入类似结构：

```json
{
  "i18n": false,
  "ui": "element-plus"
}
```

Vite 配置会读取该文件，并据此决定：

- 是否加载 i18n 插件。
- 使用哪个 UI 组件解析器。
- 哪些依赖进入 Vite `optimizeDeps.include`。

这套设计避免了两个常见问题：一是模板默认依赖过重，二是用户删除某个生态后构建配置仍静态引用缺失包。

## 路由

项目使用 Vue Router 5 自带的 `vue-router/vite` 文件路由插件。页面文件位于 `src/pages`，路由声明生成到 `typed-router.d.ts`，并通过 `vue-router/auto-routes` 注入到应用。

推荐约定：

- 页面只放在 `src/pages`，通用组件放在 `src/components`。
- 页面级数据装配留在 page 内，跨页面状态沉到 Pinia store。
- 登录、鉴权、重定向等横切逻辑放到 `src/router/guard.ts`。

## 请求层

`src/utils/request.ts` 封装 Axios，并提供：

- `VITE_APP_BASE_API` 环境驱动的 API 根路径。
- Bearer token 注入。
- 重复请求自动取消。
- 业务 envelope 自动解包。
- 统一 `RequestError`。

请求层是业务 API 的唯一出口。页面和 store 不直接创建 Axios 实例，避免拦截器、token、错误模型在多人协作时出现多套实现。

## 构建层

构建逻辑拆分在 `build/*`：

- `env.ts`：环境变量加载与校验。
- `proxy.ts`：动态代理生成与自定义代理合并。
- `profile.ts`：读取 UI/i18n profile。
- `optimize-deps.ts`：根据 profile 柔性预构建依赖。
- `chunks.ts`：生产构建手动分包策略。

构建模块保持纯函数化，方便 Vitest 覆盖环境解析、代理生成、分包策略等基础设施逻辑。

## 目录边界

| 目录 | 职责 |
| --- | --- |
| `build/` | Vite 配置的可测试基础设施。 |
| `scripts/` | 脚手架初始化、能力注入和依赖写入。 |
| `src/pages/` | 文件路由页面入口。 |
| `src/components/` | 可复用业务组件和 UI 组合。 |
| `src/store/` | Pinia 状态模型。 |
| `src/utils/` | 请求、i18n bridge 等基础工具。 |
| `docs/` | VitePress 双语文档站。 |
