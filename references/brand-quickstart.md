# Brand 主题快速使用指南

5 分钟上手 6 套多主题切换（`sika-yellow` / `sika-red` / `davco-amber` / `davco-restrained` / `neutral-ink` / `neutral-paper`）。详细色板、字体栈、校验逻辑看文末"相关文件索引"。

**它解决什么**：同一份 deck HTML，通过 `data-theme` 属性切换到不同客户/场景的视觉系统，无需复制六份文件。

**不适用**：需要像素级品牌规范、或者 Sika 集团 CI 强约束的对外发布会 — 那种情况直接用 `sika-theme/*` 12 个衍生预设。

## 1. 5 分钟快速开始

```bash
# 第 1 步：复制模板（Swiss 风格）
cp assets/template-swiss.html my-deck.html
# 或杂志风格
cp assets/template.html my-deck.html
```

**第 2 步**：在"主题速查表"里挑一个主题 id。

**第 3 步**：用任一方式切换。
- A) URL 参数（本地预览最方便）：
  ```
  open my-deck.html?theme=davco-amber
  ```
- B) 左下角 chip：浏览器中点击主题徽章，7 选 1 下拉里挑。
- C) JS（嵌入产品 / 编程化）：
  ```js
  document.documentElement.setAttribute('data-theme', 'davco-amber');
  ```

**第 4 步**：填内容、跑校验。
```bash
node scripts/validate-brand-deck.mjs my-deck.html
```

## 2. 主题速查表

| 客户 / 场景 | 推荐主题 id | 一句话理由 |
|---|---:|---|
| Sika 集团 | `sika-yellow` 或 `sika-red` | 集团全色复刻 |
| Davco 中国区 | `davco-amber` | 琥珀黄 + 地图红 |
| Davco 工程内训 | `davco-restrained` | 降饱和 + 灰蓝，长时间阅读 |
| 公司年报 / 战略 | `neutral-ink` | 墨黑 + 暗金，庄重不抢戏 |
| 设计 / 文化 / 出版 | `neutral-paper` | 纸白 + 陶土橙 |
| 跨品牌 / 不确定 | `neutral-ink` | 兜底 |

**选择原则**：

- 客户有强 VI → 选对应主题（Sika / Davco）
- 客户没有强 VI、但场景严肃 → `neutral-ink`
- 客户没有强 VI、场景偏文化/设计 → `neutral-paper`
- 不确定时 → `neutral-ink`（最不会翻车）

**两套 Davco 怎么选**：市场活动、对外提案用 `davco-amber`（吸睛）；内部培训、技术分享用 `davco-restrained`（护眼）。

**两套 Sika 怎么选**：`sika-yellow` 是集团主色，适用范围最广；`sika-red` 用于强调、对比场景（例如汇报结尾的"行动召唤"页）。

## 3. 三种切换方式详解

**URL 参数**（推荐本地预览、分享给同事）：
`?theme=<id>` 写在地址栏，刷新即生效。脚本读 `location.search` 把 `<id>` 写进 `<html data-theme="...">`。默认 id 走 `sika-yellow`。

**主题 chip**（推荐演示现场切换）：
左下角圆形徽章，点击展开 7 选 1 下拉（6 套主题 + 默认）。改动只改 `<html>` 的属性，CSS 变量重新级联，无刷新。

**JS 切换**（推荐嵌入产品 / 自动化）：
直接写 `documentElement.setAttribute('data-theme', '<id>')`。可放进 `slideenter` 事件里做章节级切换。

## 4. 进阶：章节级切主题

每页不同主题，配合 deck 的翻页事件即可：

```js
slide.addEventListener('slideenter', () => {
  document.documentElement.setAttribute('data-theme', 'davco-amber');
});
```

返回封面时记得切回默认 `sika-yellow`，避免后页残留。

## 5. 常见问题 FAQ

- **Q: 默认是什么主题？** A: Sika Corporate（不写 `?theme=` 时）。
- **Q: 能和 `sika-theme/*` 12 个衍生预设混用吗？** A: 能，两套机制独立，互不覆盖。
- **Q: 切主题会影响 Sika 品牌色板吗？** A: 不会，6 套主题是覆盖层，底层色板原样保留。
- **Q: Google Fonts 加载慢怎么办？** A: 本地化打包到 `assets/fonts/`，再改 `<link>` 指向本地路径。
- **Q: 校验器怎么用？** A: `node scripts/validate-brand-deck.mjs my-deck.html`，会扫色板、字体栈、`data-theme` 一致性。
- **Q: 想自定义一套新主题？** A: 在 `assets/template.html` 的 `<style>` 末尾追加 `:root[data-theme="my-theme"] { ... }`，配色参考 `references/themes-brand.md` 的格式。

## 6. 相关文件索引

按使用顺序：

1. 模板：`assets/template.html`（杂志风） / `assets/template-swiss.html`（Swiss 风）
2. 配色：`references/themes-brand.md` — 6 套主题的色板、字体栈完整定义
3. 字体：`references/fonts-brand.md` — Google Fonts 加载策略、字重映射、本地化打包
4. Demo：`examples/brand-themes.html` / `examples/brand-themes-swiss.html` — 6 套主题并排预览
5. 校验：`scripts/validate-brand-deck.mjs` — 校验 `data-theme` 用法、色板完整性、字体栈一致性

**使用顺序建议**：先看 Demo 挑主题 → 翻 `themes-brand.md` 确认色板细节 → 复制模板填内容 → 跑校验器。
