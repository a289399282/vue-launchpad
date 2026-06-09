import { presetWind3 } from "@unocss/preset-wind3";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import { defineConfig } from "@unocss/vite";

export default defineConfig({
  presets: [presetWind3()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      // 中文：主品牌色，所有关键按钮、焦点态和高亮边框统一读取该变量，便于运行时换肤。
      // English: Primary brand color shared by key buttons, focus states, and highlight borders for runtime theming.
      primary: "var(--launchpad-primary)",
      // 中文：成功色，用于成功提示、正向状态和健康度展示。
      // English: Success color for positive feedback, healthy states, and successful operations.
      success: "var(--launchpad-success)",
      // 中文：警告色，用于风险提示、待处理状态和强调型辅助信息。
      // English: Warning color for risk hints, pending states, and emphasized secondary information.
      warning: "var(--launchpad-warning)",
      // 中文：错误色，用于错误提示、危险操作和异常链路反馈。
      // English: Error color for failures, destructive actions, and exceptional flows.
      error: "var(--launchpad-error)",
      // 中文：品牌背景色，承接页面级背景，明暗模式切换时保持统一入口。
      // English: Brand background color used as the page-level background token across themes.
      brandBg: "var(--launchpad-bg)",
      launch: {
        // 中文：扩展语义色，页面文字、面板、轨道光和辅助强调色统一挂载在 launch 命名空间下。
        // English: Extended semantic colors for text, panels, glow rails, and secondary accents.
        // 中文：业务层只消费语义，不直接消费十六进制色值，保证后续品牌换肤不会扩散改动面。
        // English: Product code consumes semantic tokens instead of raw hex values to keep rebranding contained.
        ink: "var(--launchpad-ink)",
        panel: "var(--launchpad-panel)",
        plasma: "var(--launchpad-primary)",
        flare: "var(--launchpad-warning)",
        orbit: "var(--launchpad-orbit)",
        mint: "var(--launchpad-success)",
      },
    },
  },
  shortcuts: {
    // 中文：页面底座，所有主页面优先使用该类，保证背景、文字和选区颜色跟随主题变量。
    // English: Page surface shortcut for theme-aware background, text, and selection colors.
    "app-surface":
      "min-h-screen bg-brandBg text-launch-ink dark:text-slate-50 selection:bg-primary selection:text-slate-950",
    // 中文：玻璃拟态卡片，适合控制台、统计面板、登录容器等需要轻层级的业务块。
    // English: Glass panel shortcut for dashboards, metric panels, and lightweight containers.
    "glass-panel":
      "border border-white/14 bg-white/74 shadow-2xl shadow-slate-300/35 backdrop-blur-xl dark:border-white/10 dark:bg-white/8 dark:shadow-black/35",
    // 中文：流光悬浮卡片，适合首页架构卡、功能卡和可点击导航卡。
    // English: Flow card shortcut for architecture cards, feature cards, and clickable navigation tiles.
    "flow-card":
      "relative overflow-hidden border border-slate-200 bg-white/72 shadow-xl shadow-slate-300/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary dark:border-white/10 dark:bg-slate-950/62 dark:shadow-black/30",
    // 中文：流光描边，与 flow-card 叠加使用，给高优入口提供轻量动效，不侵入组件业务结构。
    // English: Flow border shortcut layered with flow-card for subtle motion on high-priority entries.
    "flow-border":
      "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent,rgba(var(--launchpad-primary-rgb),0.24),transparent)] before:opacity-0 before:transition before:duration-300 hover:before:opacity-100",
    // 中文：聚焦环，统一键盘可访问性交互反馈，避免每个按钮重复声明。
    // English: Focus ring shortcut for consistent keyboard accessibility feedback.
    "focus-ring": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
  },
});
