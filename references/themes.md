# Sika 电子杂志主题（Themes）

本仓库当前是 **Sika 专用网页 PPT 模板**。Style A（电子杂志 × 电子墨水）不再提供多套可选色板；默认且唯一推荐的主题是 **Sika Corporate**：Sika Red 作为标题/深色页墨色，低饱和 Sika Yellow 作为纸张底色，形成企业案例手册、施工现场指示牌和建筑化学品资料页的统一气质。

---

## 使用方法

1. 打开 `assets/template.html` 的 `<style>` 块。
2. 确认 `:root{}` 开头保持下面这组变量。
3. 所有正文、边框、WebGL 叠色和 Sika 辅助元素都通过这些变量取色，不要在页面里散落手写 hex。

```css
--ink:#D8282F;
--ink-rgb:216,40,47;
--paper:#fff8e6;
--paper-rgb:255,248,230;
--paper-tint:#f6ead1;
--ink-tint:#a92028;
--brand-secondary:#F5B325;
```

---

## 🟨 Sika Corporate (Red × Yellow)

**适合**：Sika 公司汇报、建筑化学品、施工/工业、渠道培训、项目案例、可持续建造议题。

**调性**：
- **Sika Red**：用于封面主色、深色页、关键标题、编号、结论和风险提示。
- **Sika Yellow**：用于暖底、角标、横条、徽章、章节识别和轻量品牌氛围。
- **暖砂灰阶**：用于辅助底色和分割线，避免纯白/纯黑破坏 Sika 工业温度。

---

## 内置 Sika 辅助元素

`assets/template.html` 已内置以下类，生成 deck 时可直接使用：

| 类名 | 用途 |
|---|---|
| `.sika-brand-band` | 页顶品牌横条，左黄右红，适合封面、章节页、封底。 |
| `.sika-corner` | 右上角几何角标，用 Sika Yellow + Sika Red 建立品牌识别。 |
| `.sika-badge` | 倾斜 Sika 字样徽章，适合 chrome/meta 区，不替代官方 logo。 |
| `.sika-stripe` | 小型品牌色条，适合卡片、图注、分割区。 |
| `.slide.sika-yellow` | 黄色主底页面，适合过渡页或轻量提示页。 |

---

## 硬规则

- **不要再切换到非 Sika 色板**。如果用户说“换一套颜色”，优先解释当前项目是 Sika 专用模板，只能在 Sika Red / Sika Yellow / 暖砂灰阶内做面积和层级调整。
- **不要自定义任意 hex 值**。所有红、黄、暖底、暖灰都从本页变量继承。
- **不要大面积高饱和黄正文底**。黄色用于品牌氛围和识别，正文页优先使用 `--paper` / `--paper-tint`。
- **不要仿制或拉伸官方 logo**。`.sika-badge` 是排版提示和品牌语义，不是官方商标资产。

生成完成后在项目记录中写明：`Theme: Sika Corporate · Red #D8282F · Yellow #F5B325`。
