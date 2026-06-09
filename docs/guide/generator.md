# 代码生成

Vue-Launchpad 使用 Plop 提供一致的工程模板，减少页面、组件、状态和 API 模块的重复手写成本。

## 启动生成器

```bash
pnpm gen
```

可用生成器：

| 生成器 | 输出位置 | 适用场景 |
| --- | --- | --- |
| `page` | `src/pages/{{name}}.vue` | 创建文件路由页面。 |
| `component` | `src/components/{{Name}}.vue` | 创建可复用组件。 |
| `store` | `src/store/{{name}}.ts` | 创建 Pinia setup store。 |
| `api` | `src/api/{{name}}.ts` | 创建强类型请求模块。 |

## 命名规则

生成器接受字母、数字、斜杠、下划线和短横线。内部会统一归一化为：

- `kebabCase`：用于文件名和路由片段。
- `PascalCase`：用于组件名、接口名和 store 名。
- `camelCase`：用于变量名。

## 推荐工作流

1. 先用 `pnpm gen` 生成骨架。
2. 在生成文件内补充业务字段和 API 类型。
3. 使用 `pnpm check` 确认格式、Lint 和类型全部通过。
4. 对核心逻辑补充 Vitest 测试。
