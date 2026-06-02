# Sika Precision 主题

本仓库当前是 **Sika 专用网页 PPT 模板**。Sika Precision 保留 16 列网格、发丝线、直角色块和极致字号对比，但配色固定为 **Sika Corporate**，不再推荐任何通用网格主题或其他品牌色。

---

## 使用方法

1. 打开 `assets/template-swiss.html` 的 `<style>` 块。
2. 确认 `:root{}` 开头保持下面这组 Sika 变量。
3. 所有 `.accent`、KPI、条形图、ASCII 呼吸场、封面/封底色块、Sika 角标都从这些变量读取。

```css
--paper:#fff8e6;
--paper-rgb:255,248,230;
--ink:#1f1713;
--ink-rgb:31,23,19;
--grey-1:#f6ead1;
--grey-2:#dfcda8;
--grey-3:#755f42;
--accent:#D8282F;
--accent-rgb:216,40,47;
--accent-on:#ffffff;
--accent-bright:#F5B325;
--brand-secondary:#F5B325;
--brand-secondary-rgb:245,179,37;
```

---

## 🟨 Sika Corporate (Sika Red × Sika Yellow)

**适合**：Sika 公司战略汇报、建筑化学品产品页、施工项目复盘、渠道培训、可持续建造、供应链/工厂/质量体系内容。

**调性**：
- **Sika Red (`--accent`)**：行动、结论、风险、关键数字、封面/封底大色块。
- **Sika Yellow (`--brand-secondary`)**：角标、横条、徽章、章节识别，不承载大段正文。
- **Warm construction neutrals (`--paper` / `--grey-*`)**：模拟砂浆、混凝土、施工图纸的暖色基底，保证 Sika 工业感。

---

## 内置 Sika 辅助元素

| 类名 | 用途 |
|---|---|
| `.sika-brand-band` | 页顶品牌横条，适合封面、章节页和封底左侧宣言块。 |
| `.sika-corner` | 右上角红黄几何角标，默认用于 Sika Precision cover。 |
| `.sika-badge` | 倾斜 Sika 字样徽章，适合 chrome/meta 区，不替代官方 logo。 |
| `.sika-stripe` | 小型品牌色条，适合 KPI 组、图注、卡片顶部。 |
| `.slide.sika-yellow` | 黄色主底页面，适合封面反转、轻量转场、KPI 页,不建议承载长正文。 |
| `.sika-reverse-panel` | Sika Precision 黄底页上的卡片;`.red` 变体用于唯一红色 KPI/结论焦点。 |

---

## 切换原则

- **一份 deck 固定 Sika Corporate**。不要中途换成通用网格主题或其他品牌色。
- **红色负责焦点，黄色可以做背景反转**。如果用户要求黄底,使用 `references/sika-yellow-templates.md`;红色仍只保留为标题/KPI/单卡焦点。
- **暖砂灰阶必须跟随 Sika 主题**。不要改回纯白、纯黑或冷灰，否则会失去建筑化学品/施工现场语义。
- **WebGL 网格背景读取 `--accent`**，因此动态高亮也会自动保持 Sika Red。

---

## ❌ 不要做的事

- ❌ 不要把通用 Sika Precision 主题重新引回 Sika deck。
- ❌ 不要接受用户给的任意 hex 值；只能在 Sika Red / Sika Yellow / 暖砂灰阶内调整面积和层级。
- ❌ 不要用渐变、阴影、圆角卡片弱化Sika Precision结构；Sika 风也保持直角、发丝线、网格和纯色色块。
- ❌ 不要仿制、拉伸或重画官方 logo；模板只提供排版化的 Sika 识别元素。

生成完成后在项目记录中写明：`Theme: Sika Corporate Precision · Accent #D8282F · Secondary #F5B325`。
