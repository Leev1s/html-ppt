# 多主题配色档案（themes-brand）

> 多品牌场景的扩展层。Sika 集团标准 deck 请继续使用 `themes.md`（Sika 单一色板硬锁） 或 `themes-swiss.md`（Swiss Sika 单一色板硬锁）。当客户不是 Sika 集团、或同一份 deck 需要在多个子品牌 / 业务线之间切换色板与字体时，参考本文。
>
> 本文与 `themes.md` 的关系：`themes.md` 是 Sika Corporate 单色板的事实标准，**默认无 `data-theme` 时仍是 Sika Corporate**，不会因为加了多主题而改变现有 deck 的外观。多主题是**正交**的扩展，不挤占 Sika 命名空间。

---

## 1. 6 套主题总览

6 套主题按集团归属 + 设计气质分组，id 严格固定，**不可改名、不可缩写**（已被 `assets/template.html` / `examples/brand-themes-swiss.html` 引用；`assets/template-swiss.html` 本身尚未注入 6 主题块，参见 §9.1）。

| id | 名称 | 主色 (`--ink`) | 强调 (`--brand-secondary`) | 字体英文 | 字体中文 | 适合场景 |
|---|---|---|---|---|---|---|
| `sika-yellow` | Sika Corporate Yellow | `#FCC500` | `#FCC500` | Barlow Condensed（工业几何感无衬线） | Noto Sans SC | Sika 集团对外发布、产品手册 |
| `sika-red` | Sika Warning Red | `#D82828` | `#FCC500` | Space Grotesk | Noto Sans SC | 安全警示、风险/责任主题 |
| `davco-amber` | Davco Header Amber | `#F7B20B` | `#F7B20B` | DM Sans | Noto Sans SC | 德高（Davco）集团对外、header 同色系 |
| `davco-restrained` | Davco Restrained | `#E8A40A` | `#E8A40A` | IBM Plex Sans | Noto Sans SC | 德高工程内训、技术规范、收敛表达 |
| `neutral-ink` | Neutral Ink（墨黑 + 暗金） | `#1A1A1A` | `#C9A961` | Playfair Display / Fraunces | Noto Serif SC | 年报、战略报告、董事会 deck |
| `neutral-paper` | Neutral Paper（纸白 + 陶土橙） | `#2C2C2C` | `#B86F4A` | Fraunces / Lora | Noto Serif SC | 人文、设计、文化叙事 deck |

> 注：`sika-yellow` 与 `sika-red` 共享 `--brand-secondary: #FCC500`（集团黄做次级强调），区别只在主色与字体调性。`davco-amber` 与 `davco-restrained` 共享 Davco 设计语言，后者把 `--text-secondary` 改为冷灰蓝 `#3E4C59`，降饱和以适配工程语境。

---

## 2. 6 套主题完整 CSS 变量块

下方 6 个代码块**合并**了 `assets/template.html` patch 第 466-507 行（色板）与 510-547 行（字体栈）。色板 + 字体栈写在同一个 `:root[data-theme="..."]` 选择器下，复制即可用。

```css
:root[data-theme="sika-yellow"]{
  --ink:#FCC500;--ink-rgb:252,197,0;--ink-tint:#C9A300;
  --paper:#FFFFFF;--paper-rgb:255,255,255;--paper-tint:#F5F5F5;
  --brand-secondary:#FCC500;
  --text-secondary:#2A2A2A;--text-muted:#6B6B6B;
  --border:#E5E5E5;--line-strong:#1A1A1A;
  --serif-en:"Barlow Condensed","Archivo Narrow","Playfair Display",Georgia,serif;
  --sans-en:"Barlow Condensed","Inter","Helvetica Neue",sans-serif;
  --sans-zh:"Noto Sans SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
  --mono:"JetBrains Mono","IBM Plex Mono",ui-monospace,monospace;
}
```

```css
:root[data-theme="sika-red"]{
  --ink:#D82828;--ink-rgb:216,40,40;--ink-tint:#A81E1E;
  --paper:#FFFFFF;--paper-rgb:255,255,255;--paper-tint:#F5F5F5;
  --brand-secondary:#FCC500;
  --text-secondary:#2A2A2A;--text-muted:#6B6B6B;
  --border:#E5E5E5;--line-strong:#1A1A1A;
  --serif-en:"Space Grotesk","Inter",Georgia,serif;
  --sans-en:"Space Grotesk","Inter","Helvetica Neue",sans-serif;
  --sans-zh:"Noto Sans SC","PingFang SC",sans-serif;
  --mono:"Space Mono","JetBrains Mono",ui-monospace,monospace;
}
```

```css
:root[data-theme="davco-amber"]{
  --ink:#F7B20B;--ink-rgb:247,178,11;--ink-tint:#C48A00;
  --paper:#FAFAFA;--paper-rgb:250,250,250;--paper-tint:#F7F7F7;
  --brand-secondary:#F7B20B;
  --text-secondary:#222222;--text-muted:#666666;
  --border:#E6E6E6;--line-strong:#1A1A1A;
  --serif-en:"DM Sans","Inter",Georgia,serif;
  --sans-en:"DM Sans","Inter","Helvetica Neue",sans-serif;
  --sans-zh:"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;
  --mono:"JetBrains Mono",ui-monospace,monospace;
}
```

```css
:root[data-theme="davco-restrained"]{
  --ink:#E8A40A;--ink-rgb:232,164,10;--ink-tint:#B58208;
  --paper:#FAFAFA;--paper-rgb:250,250,250;--paper-tint:#F0F2F4;
  --brand-secondary:#E8A40A;
  --text-secondary:#3E4C59;--text-muted:#6B7785;
  --border:#DCE2E7;--line-strong:#2C3842;
  --serif-en:"IBM Plex Sans","Inter",Georgia,serif;
  --sans-en:"IBM Plex Sans","Inter","Helvetica Neue",sans-serif;
  --sans-zh:"Noto Sans SC","PingFang SC",sans-serif;
  --mono:"IBM Plex Mono","JetBrains Mono",ui-monospace,monospace;
}
```

```css
:root[data-theme="neutral-ink"]{
  --ink:#1A1A1A;--ink-rgb:26,26,26;--ink-tint:#3A3A3A;
  --paper:#FFFFFF;--paper-rgb:255,255,255;--paper-tint:#F4F2EC;
  --brand-secondary:#C9A961;
  --text-secondary:#3A3A3A;--text-muted:#6B6B6B;
  --border:#E2DFD6;--line-strong:#000000;
  --serif-en:"Playfair Display","Fraunces","Source Serif 4",Georgia,serif;
  --serif-zh:"Noto Serif SC","Source Han Serif SC",serif;
  --sans-en:"Fraunces","Source Serif 4",Georgia,serif;
  --sans-zh:"Noto Serif SC",serif;
  --mono:"IBM Plex Mono","JetBrains Mono",ui-monospace,monospace;
}
```

```css
:root[data-theme="neutral-paper"]{
  --ink:#2C2C2C;--ink-rgb:44,44,44;--ink-tint:#5A4A3A;
  --paper:#FAF8F3;--paper-rgb:250,248,243;--paper-tint:#F0EBE0;
  --brand-secondary:#B86F4A;
  --text-secondary:#4A4A4A;--text-muted:#7A7A7A;
  --border:#E2DCCB;--line-strong:#2C2C2C;
  --serif-en:"Fraunces","Lora","EB Garamond",Georgia,serif;
  --serif-zh:"Noto Serif SC","Source Han Serif SC",serif;
  --sans-en:"Lora","Source Serif 4",Georgia,serif;
  --sans-zh:"Noto Serif SC",serif;
  --mono:"JetBrains Mono",ui-monospace,monospace;
}
```

字体加载：6 套主题共用的 Google Fonts 链接已写在 `assets/template.html` patch 末尾（第 567-569 行附近），无需为每套主题单独加载。Subagent C 产出的 `references/fonts-brand.md` 会给出更完整的字体方案与离线降级策略。

---

## 3. 品牌溯源

### sika-yellow
源自 sika.com 抓取的集团首页。集团黄 `#FCC500` 是 Sika 集团 70 多年来的视觉锚点（混凝土外加剂桶身同色），配以工业几何感强的无衬线字体（原文使用一款自研收费字体，本方案用 Barlow Condensed 作为公开替代）传递"工程 × 化工"的硬朗感。默认 deck 保持这个色板，可作为 Sika Corporate 主题的多主题版本（与无 `data-theme` 时的 Sika Corporate 视觉一致）。

### sika-red
同样源自 sika.com 抓取，集团红 `#D82828` 在品牌系统中用于警示、风险、强调场景（如安全手册、责任声明、产品警告）。与 `sika-yellow` 共享 `--brand-secondary: #FCC500`，保证集团黄作为次级强调始终在线，红色只承担"需要被看见"的语义。字体换成 Space Grotesk（带轻微未来感），与红主色一起暗示"警戒 / 数据"。

### davco-amber
源自 davco.cn 抓取，集团 header 顶部导航条使用琥珀黄 `#F7B20B`，与 sika-yellow 同色相但更暖、更橙，向"家装 / 民用建材"领域倾斜。字体用 DM Sans（圆润但保持几何骨架），与德高面向 C 端业主 + B 端工程商的双向调性匹配。**不要**把它和 sika-yellow 互换：两者主色虽接近，语义完全不同。

### davco-restrained
davco 的工程内训 / 技术规范版本。把 `davco-amber` 的琥珀黄降到 `#E8A40A`（去掉荧光感、保留可读性），把正文色换成冷灰蓝 `#3E4C59`（替代 sika 体系里偏暖的 `#2A2A2A`），边框用 `#DCE2E7` 灰白。字体用 IBM Plex Sans（工程 / 文档场景的工业标准）。整体气质"收敛、克制、专业"，适合施工规范、产品参数表、技术答辩。

### neutral-ink
自创。墨黑 `#1A1A1A` + 暗金 `#C9A961` 是经典年报配色（参考多家上市公司 IR deck），主色纯度低、强对比，给"严肃 / 战略 / 长期主义"内容打底。字体完全走衬线（Playfair Display 做英文标题、Fraunces 做正文、Noto Serif SC 做中文），与四套 Sika / Davco 主题的几何无衬线形成对仗。适合：年报、董事会汇报、五年战略、白皮书封面。

### neutral-paper
自创。纸白 `#FAF8F3` + 陶土橙 `#B86F4A` 是人文 / 设计 / 文化叙事 deck 的常见组合，避开所有"科技蓝 / 工业黄"，传递手作、温度、慢节奏。字体也是衬线（Fraunces + Lora），但相比 `neutral-ink` 更柔和、字号更松。适合：品牌故事、博物馆 / 美术馆展览导览、文化遗产项目、非遗工艺 deck。

### 色板对比矩阵

下表把 6 套主题的 5 个核心色变量并排对比，方便一眼看出差异。注意 `sika-yellow` / `sika-red` 共享 `--paper` 与 `--text-secondary`，但主色与字体栈不同；`davco-amber` / `davco-restrained` 主色相近但 `--text-secondary` 一个暖黑、一个冷灰蓝，混用会出错。

| id | `--ink` | `--ink-tint` | `--paper` | `--text-secondary` | `--border` |
|---|---|---|---|---|---|
| `sika-yellow` | `#FCC500` | `#C9A300` | `#FFFFFF` | `#2A2A2A` | `#E5E5E5` |
| `sika-red` | `#D82828` | `#A81E1E` | `#FFFFFF` | `#2A2A2A` | `#E5E5E5` |
| `davco-amber` | `#F7B20B` | `#C48A00` | `#FAFAFA` | `#222222` | `#E6E6E6` |
| `davco-restrained` | `#E8A40A` | `#B58208` | `#FAFAFA` | `#3E4C59` | `#DCE2E7` |
| `neutral-ink` | `#1A1A1A` | `#3A3A3A` | `#FFFFFF` | `#3A3A3A` | `#E2DFD6` |
| `neutral-paper` | `#2C2C2C` | `#5A4A3A` | `#FAF8F3` | `#4A4A4A` | `#E2DCCB` |

调色直觉：

- `sika-yellow` / `davco-amber` 都在黄色相，但 `sika-yellow` 更纯、`davco-amber` 更橙。
- `sika-red` 是集团警示色，不要拿来做 Davco 主题（色相冲突）。
- `davco-restrained` 是 `davco-amber` 的"工程化去饱和"版本，**不要**单独使用 `davco-restrained` 主题做 Davco 对外品牌——外部会感知成"褪色的德高"。
- `neutral-ink` / `neutral-paper` 都是自创的"非品牌"色板，可放心用于跨集团 / 通用场景，不会被误读为 Sika 或 Davco。

---

## 4. 硬规则

- **不挤占 Sika 命名空间**：`sika-theme/*` 共 12 个衍生预设（见 `references/theme-derivatives.md`）保留不动；多主题的 6 个 id 是**平行**的第二层。
- **6 套主题在同 HTML 里通过 `[data-theme]` 切换**：选择器写 `:root[data-theme="<id>"]`，不要写 `:root.theme-xxx`、不要写 class。
- **不写散落 hex**：slide 模板、HTML 模板、内联 style 一律走 `var(--ink)` / `var(--paper)` / `var(--brand-secondary)` 等。色板只在 `:root[data-theme]` 块里出现一次。
- **切主题不会影响 Sika 品牌色板**：默认仍是 Sika Corporate（无 `data-theme` 时），多主题是正交扩展。
- **一份 deck 可在不同章节切不同主题**：例如封面 `sika-red`（警示感）、正文 `neutral-ink`（严肃）、附录 `davco-amber`（子品牌介绍）。每张 slide 单独设置 `data-theme` 即可，不影响其他 slide。
- **id 字符串字面量固定**：6 个 id 已在 `assets/template.html` / `assets/template-swiss.html` patch 里硬编码，重命名会破坏 demo。

> 注：6 套主题的**唯一权威来源**是各模板与 demo 内的 `:root[data-theme]` 块（杂志风在 `assets/template.html`，swiss 风在 `examples/brand-themes-swiss.html` 第 686–731 行）。Demo 文件在演示中可能对个别主题色做**视觉微调**（如降饱和、亮度偏移等）以服务单页观感，这些微调**不回写**到种子模板，也**不视为**主题色板的事实标准；以种子模板内的色值为准。

---

## 5. 使用方式

**URL 参数**（最简单）：
```
index.html?theme=davco-amber
```
patch 里的内联脚本会读取 `location.search`，把 `theme=<id>` 写到 `<html data-theme="<id>">`，刷新即生效。

**左下角 chip**（运行时切换）：
`examples/brand-themes-swiss.html` 已示范：页面左下角一个 7 选 1 下拉（含 "Default / Sika Corporate" + 6 套主题），切换不刷新页面、不丢滚动位置。

**程序化切换**（章节级 / 编程控制）：
```js
document.documentElement.setAttribute('data-theme', 'davco-amber');
```
配合 IntersectionObserver 或 slide 切换钩子，可实现"翻到第 5 页自动换主题"。

---

## 6. 相关文件

- `assets/template.html` —— 风格 A（电子杂志 × 电子墨水）模板，已 patch 6 套主题色板 + 字体栈
- `assets/template-swiss.html` —— 风格 B（瑞士国际主义）模板（**未 patch 6 主题块**，色板与字体栈当前仅在 demo 文件内联；目标位置参见 §9.1 状态说明）
- `assets/template-swiss.html` —— 风格 B（瑞士国际主义）模板（**目前尚未 patch 6 主题块**，参见 §9.1 状态说明；§9.2/9.3 的色板与字体栈以 `examples/brand-themes-swiss.html` 第 686–731 行为权威）
- `examples/brand-themes-swiss.html` —— 18 页多主题 demo，左下角 7 选 1 chip 切换器
- `references/fonts-brand.md` —— 字体方案（Subagent C 产出，含离线降级、回退栈、字号阶梯）
- `references/themes.md` —— Sika 单一色板硬锁（默认无 `data-theme` 时的事实标准）
- `references/themes-swiss.md` —— Swiss Sika 单一色板硬锁
- `references/theme-derivatives.md` —— `sika-theme/*` 12 个衍生预设（与本文正交）

---

## 7. 章节级切主题（多主题混排）

一份 deck 内允许不同章节使用不同主题。两种实现方式：

**方式 A：每张 slide 各自声明**

每个 `.slide` 元素（或 Swiss 风格的 `section.swiss-slide`）可以单独设置 `data-theme`，patch 的 CSS 选择器 `:root[data-theme]` 会级联到当前 slide 的所有子元素。

```html
<section class="slide" data-theme="sika-red"> ... </section>
<section class="slide" data-theme="neutral-ink"> ... </section>
<section class="slide" data-theme="davco-amber"> ... </section>
```

**方式 B：JS 钩子动态切**

翻页监听里切换 `<html>` 上的 `data-theme`：

```js
const themes = ['sika-red','neutral-ink','davco-amber'];
slides.forEach((el, i) => el.addEventListener('slide:enter', () => {
  document.documentElement.setAttribute('data-theme', themes[i] || '');
}));
```

混排时建议遵循"集团边界原则"：

- 同一集团（Sika 或 Davco）子品牌间可以混排（如封面 `sika-red` + 内文 `sika-yellow`），不会出现违和感。
- 跨集团混排（Sika + Davco）需要明确叙事意图（"对比 / 收购 / 合作"），否则视觉上会让观众困惑。
- `neutral-*` 主题可在任何集团主题之间做"中性过渡章节"（如分隔页、致谢页、目录页）。

---

## 8. 版本与变更

| 版本 | 日期 | 变更 |
|---|---|---|
| v1.0 | 2025 | 6 套主题首版 patch，色板 + 字体栈合并写入 `assets/template.html` / `assets/template-swiss.html` |
| v1.1 | 2025 | 补 `examples/brand-themes-swiss.html` 18 页 demo，加入左下角 7 选 1 chip 切换器 |
| v1.2 | 待 Subagent C 产出 | `references/fonts-brand.md` 同步字体方案、回退栈、字号阶梯 |

> 6 个主题 id 已在 `assets/template.html` / `assets/template-swiss.html` 硬编码，**不得**重命名、不得新增第七套主题（需要新增时另起一组 `:root[data-theme="..."]` 块并扩展本档案）。

---

## 9. Swiss 模板色板（独立体系）

> 重要：`assets/template-swiss.html` 的变量体系与上方 1–2 节描述的"杂志风"**不同**。本文第 1–2 节的速查表里 `sika-yellow` 标注为 `--ink = #FCC500`，但该值在 swiss 模板里并不存在。swiss 模板走的是另一套 6 变量体系：语义、变量名、hex 值全部独立。

### 9.1 背景：为什么是独立体系

> **当前状态**：`assets/template-swiss.html` **尚未**注入 6 套 `:root[data-theme="<id>"]` 块（grep `:root\[data-theme` 在 swiss 模板里命中 0 次）。6 套主题色板 + 字体栈目前**仅存在于** `examples/brand-themes-swiss.html` 第 686–731 行（demo 文件内联）。下方 §9.2 速查表与 §9.3 完整 CSS 块是设计上**应当注入** swiss 模板的内容，但 swiss 模板本身仍待 patch——以 `examples/brand-themes-swiss.html` 第 686–731 行为准。

`examples/brand-themes-swiss.html` 的 patch（行 686–731）给 6 套主题各自硬编码了一组 `:root[data-theme="<id>"]` 块，**覆盖**了 swiss 模板自身的 `:root` 默认变量。Swiss 模板在 swiss slide layout 里直接 `var(--ink)` / `var(--paper)` / `var(--accent)` 渲染，**不会**去读杂志风专属的 `--brand-secondary` / `--text-secondary` / `--border` / `--line-strong` / `--serif-en` / `--sans-zh` 等。

swiss 模板的 6 个核心变量：

- `--ink` —— **文字/深色块色**，是"深色"不是"主色"。
- `--ink-rgb` —— `--ink` 的 RGB 元组，方便 `rgba(var(--ink-rgb), .5)` 调用。
- `--paper` —— 底色（slide 背景）。
- `--paper-rgb` / `--paper-tint` —— 底色 RGB 与浅一档底色。
- `--accent` —— **集团主色 / 强调色**。在 swiss 语境下，集团黄 `#FCC500`、集团红 `#D82828`、Davco 琥珀 `#F7B20B` 等"主色"**全部落在 `--accent`**，不是 `--ink`。
- `--accent-rgb` —— `--accent` 的 RGB 元组。
- `--grey-1` / `--grey-2` —— 两档浅灰，分隔线、辅助底色块。
- `--sans` —— 主字体栈（多数主题省略 `--sans-zh`，由模板默认字体接管）。

### 9.2 swiss 6 套主题速查表

| id | 名称 | `--ink`（文字/深色） | `--paper`（底） | `--accent`（主色） | `--grey-1` |
|---|---|---|---|---|---|
| `sika-yellow` | Sika Corporate Yellow | `#1f1713` | `#fff8e6` | `#FCC500` | `#f5f5f5` |
| `sika-red` | Sika Warning Red | `#1f1713` | `#fff8e6` | `#D82828` | `#f5f5f5` |
| `davco-amber` | Davco Header Amber | `#1A1A1A` | `#FAFAFA` | `#F7B20B` | `#f0f0f0` |
| `davco-restrained` | Davco Restrained | `#1F2933` | `#FAFAFA` | `#E8A40A` | `#eef1f4` |
| `neutral-ink` | Neutral Ink（墨黑 + 暗金） | `#0E0E0E` | `#FFFFFF` | `#C9A961` | `#f5f5f5` |
| `neutral-paper` | Neutral Paper（纸白 + 陶土橙） | `#2C2C2C` | `#FAF8F3` | `#B86F4A` | `#f0ebe0` |

注意与第 1 节速查表的两点关键差异：

1. **`sika-yellow` / `sika-red` 在 swiss 里共享同一组 `--ink`（`#1f1713` 深褐）与 `--paper`（`#fff8e6` 暖白）**，主色靠 `--accent` 区分（`#FCC500` 黄 / `#D82828` 红）。这与杂志风"主色写在 `--ink`"的语义正相反。
2. **`davco-amber` / `davco-restrained` 的 `--ink` 是真正可读的黑（`#1A1A1A` / `#1F2933`）**，与 `sika-*` 的暖深褐 `#1f1713` 形成对比——swiss 模板下"Sika 系偏暖、Davco 系偏冷"。

### 9.3 完整 CSS 变量块（从 swiss 模板精确复制）

下方 6 个代码块**精确复制**自 `examples/brand-themes-swiss.html` 第 686–731 行的 `:root[data-theme="<id>"]` 块（即 swiss 模板注入 6 主题块的目标内容，复制即可用）。

```css
:root[data-theme="sika-yellow"]{
  --ink:#1f1713;--ink-rgb:31,23,19;
  --paper:#fff8e6;--paper-rgb:255,248,230;--paper-tint:#f6ead1;
  --accent:#FCC500;--accent-rgb:252,197,0;
  --grey-1:#f5f5f5;--grey-2:#e5e5e5;
  --sans:"Barlow Condensed","Inter","Helvetica Neue","Helvetica",sans-serif;
}
```

```css
:root[data-theme="sika-red"]{
  --ink:#1f1713;--ink-rgb:31,23,19;
  --paper:#fff8e6;--paper-rgb:255,248,230;--paper-tint:#f6ead1;
  --accent:#D82828;--accent-rgb:216,40,40;
  --grey-1:#f5f5f5;--grey-2:#e5e5e5;
  --sans:"Space Grotesk","Inter","Helvetica Neue",sans-serif;
}
```

```css
:root[data-theme="davco-amber"]{
  --ink:#1A1A1A;--ink-rgb:26,26,26;
  --paper:#FAFAFA;--paper-rgb:250,250,250;--paper-tint:#F7F7F7;
  --accent:#F7B20B;--accent-rgb:247,178,11;
  --grey-1:#f0f0f0;--grey-2:#e0e0e0;
  --sans:"DM Sans","Inter","Helvetica Neue",sans-serif;
  --sans-zh:"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;
}
```

```css
:root[data-theme="davco-restrained"]{
  --ink:#1F2933;--ink-rgb:31,41,51;
  --paper:#FAFAFA;--paper-rgb:250,250,250;--paper-tint:#F0F2F4;
  --accent:#E8A40A;--accent-rgb:232,164,10;
  --grey-1:#eef1f4;--grey-2:#dce2e7;
  --sans:"IBM Plex Sans","Inter","Helvetica Neue",sans-serif;
  --sans-zh:"Noto Sans SC","PingFang SC",sans-serif;
}
```

```css
:root[data-theme="neutral-ink"]{
  --ink:#0E0E0E;--ink-rgb:14,14,14;
  --paper:#FFFFFF;--paper-rgb:255,255,255;--paper-tint:#F4F2EC;
  --accent:#C9A961;--accent-rgb:201,169,97;
  --grey-1:#f5f5f5;--grey-2:#e2dfd6;
  --sans:"Playfair Display","Fraunces",Georgia,serif;
  --sans-zh:"Noto Serif SC",serif;
}
```

```css
:root[data-theme="neutral-paper"]{
  --ink:#2C2C2C;--ink-rgb:44,44,44;
  --paper:#FAF8F3;--paper-rgb:250,248,243;--paper-tint:#F0EBE0;
  --accent:#B86F4A;--accent-rgb:184,111,74;
  --grey-1:#f0ebe0;--grey-2:#e2dccb;
  --sans:"Fraunces","Lora","EB Garamond",Georgia,serif;
  --sans-zh:"Noto Serif SC",serif;
}
```

### 9.4 速查表纠正

上文"6 套主题总览表"（第 1 节）与"色板对比矩阵"（第 3 节）里的 `--ink` 列对 **swiss 模板不直接生效**。两节都是按杂志风（`assets/template.html`）变量体系写的，`--ink` 在那里是"主色"；但在 swiss 模板里：

- **"主色 / 集团色"** 对应 `--accent`（如 `#FCC500` 集团黄、`#D82828` 集团红）。
- **"文字色"** 对应 `--ink`（如 `#1f1713` 暖深褐、`#0E0E0E` 墨黑）。
- swiss 模板**不存在** `--brand-secondary` / `--text-secondary` / `--border` / `--line-strong` 等杂志风变量。

使用 swiss 模板时以本节（§9）为准，不要去套第 1–3 节的速查表。

---

## 10. 相关文件（补充）

- `assets/template.html` —— 风格 A（电子杂志 × 电子墨水）模板，patch 6 套主题色板 + 字体栈
- `assets/template-swiss.html` —— 风格 B（瑞士国际主义）模板（**目前缺 6 主题块注入**；目标位置尚未落定，参见 §9.1 顶部状态说明）
- `examples/brand-themes-swiss.html`（demo 文件，第 686–731 行含 6 套 [data-theme] 主题块）—— 本节 §9 的色板与变量块均精确复制自此位置
- `examples/brand-themes.html` —— 杂志风多主题 demo，左下角 7 选 1 chip 切换器
- `examples/brand-themes-swiss.html` —— swiss 风多主题 demo，18 页，左下角 7 选 1 chip 切换器
- `references/fonts-brand.md` —— 字体方案（Subagent C 产出，含离线降级、回退栈、字号阶梯）
- `references/themes.md` —— Sika 单一色板硬锁（默认无 `data-theme` 时的事实标准）
- `references/themes-swiss.md` —— Swiss Sika 单一色板硬锁
- `references/theme-derivatives.md` —— `sika-theme/*` 12 个衍生预设（与本文正交）
