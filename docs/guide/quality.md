# 质量门禁

Vue-Launchpad 的质量体系围绕“提交前自动修复、CI 中强制失败、构建前类型兜底”三层设计。

## Biome

Biome 负责格式化、Lint 和导入整理：

```bash
pnpm lint
pnpm lint:fix
```

`lint:fix` 会自动修复可安全修复的问题。不可自动修复的问题应在业务代码中显式处理，而不是通过大范围 ignore 绕过。

## TypeScript

项目启用严格类型基线：

- `strict`
- `noUncheckedIndexedAccess`
- `exactOptionalPropertyTypes`
- `verbatimModuleSyntax`
- `allowImportingTsExtensions`

这些选项会让模板在早期暴露空值、可选字段和模块边界问题，适合做长期维护的脚手架。

## Vitest

测试脚本：

```bash
pnpm test
pnpm test:run
```

推荐测试优先级：

1. 构建基础设施：环境解析、代理生成、profile 读取。
2. 请求层：错误模型、重复请求取消、业务 envelope 解包。
3. 业务 store：跨页面共享状态和异步 action。

## Git Hooks

项目配置了 Husky 和 lint-staged，并通过 `prepare` 脚本在依赖安装后挂载 Git Hooks。团队成员执行 `pnpm install` 后即可获得提交前检查能力。
