# 颜色审计参考文档（color-audit）

> 改色任务的**配套人工约束**。本文不重复 `themes-brand.md` / `themes-swiss.md` 已写好的色板方案，只记录**改色过程中**容易被忽略的硬约束、风险等级、validator 盲区与 SOP。
>
> 单一可信源：改色前、改色中、改色后必读本文。
>
> 受众：负责改色 / 加新主题 / 调主题块 / 复审 deck 的 agent 或人。
>
> 协作边界：本文与 `themes-brand.md`（主题色板文档）/`fonts-brand.md`（字体栈文档）/`brand-quickstart.md`（快速入门）正交。**不重复**对方职责，**不替代**对方决定。

---

## 1. 前言：为什么需要这份文档

仓库内置两个 deck validator：

- `scripts/validate-swiss-deck.mjs`：校验 swiss 风格 deck 的 layout / data-animate / structure，**0 条颜色规则**。
- `scripts/validate-brand-deck.mjs`：校验多主题 deck 的 `data-theme` 白名单 + 字体栈 + 主题块覆盖度，**约 3 条颜色规则**（仅查 `data-theme` 是否在白名单、`:root[data-theme]` 块是否存在、字体是否匹配）。

两个 validator **不能**保证改色后视觉正确。它们能查到的：

- 主题 id 是否在 6 套白名单内
- `:root[data-theme="..."]` 块是否存在
- 字体栈是否含必填字体

它们**查不到**的：

- 颜色对比度（WCAG）
- WebGL shader 里的硬编码 vec3
- `<option>` 强制暗底的浏览器限制
- ASCII canvas fillStyle 的 alpha 计算
- mix-blend-mode: difference 下的文字色叠加
- 散落 inline hex 污染

改色前必读本文。否则 validator 全绿，渲染依然花。

### 1.1 改色的最小判定单元

每次改色前问自己 3 个问题：

1. 我改的是 `:root` 块内的 token 吗？（不是 → 停下来读第 4 节 F 分类）
2. 我改了 `--ink` 但 `--ink-rgb` 没同步吗？（是 → 停下来，会 broken 所有 `rgba(var(--ink-rgb), .5)` 推导）
3. 我加了新颜色但没进 `:root[data-theme="..."]` 块吗？（是 → 停下来，新颜色会污染主题切换）

---

## 2. 改色真核心：4 变量

仓库里**改色只动 4 个 CSS 变量**，就能覆盖绝大多数视觉变更。改其它变量（`--text-secondary` / `--border` / `--grey-*` 等）属于"局部微调"，影响面小，可控。

| 变量 | 成对 RGB | 作用 | 影响引用数 |
|---|---|---|---|
| `--ink` | `--ink-rgb` | 主色 / 文字色 / 强调色 | template.html 10 + template-swiss.html 28 ≈ 38 |
| `--paper` | `--paper-rgb` | 底色 / 反转文字 | template.html 6 + template-swiss.html 25 ≈ 31 |
| `--brand-secondary` | （无 RGB） | 次级强调（sika 黄等同集团黄） | template.html 5 + template-swiss.html 5 = 10 |
| `--accent` | （template-swiss.html 独有） | Swiss 风格强调色（IKB 国际克莱因蓝 54 处） | template-swiss.html 54 |

合计约 128+ 处 CSS 引用都通过这 4 个变量触达。**改 `--ink` 必须同时改 `--ink-rgb`**，否则所有 `rgba(var(--ink-rgb), .5)` 类推导会 broken（颜色落到 fallback 黑/白）。

> 注：`--ink-rgb` 与 `--paper-rgb` 的值是 "r,g,b" 形式的逗号串（如 `252,197,0`），不是 hex。改色时务必保持这种形态。

---

## 3. 颜色字面量分类总表

`assets/template.html` + `assets/template-swiss.html` 内出现的颜色字面量（hex / rgb / rgba / 命名色）按风险分 6 类。改色前先扫一眼，定位风险。

| 分类 | 含义 | 改色时 | 总数 |
|---|---|---|---|
| A | `:root[data-theme="..."]` 主题块变量值 | ✅ 安全 | 80 处 |
| B | 通用中灰 `rgba(127,127,127,..)` | ⚠️ 改完 token 后再迁移 | 12 处 |
| C | 半透明白 `rgba(255,255,255,..)` | ⚠️ 改完 token 后再迁移 | 29 处 |
| D | 透明黑 `rgba(0,0,0,..)` | ⚠️ 改完 token 后再迁移 | 9 处 |
| E | WebGL shader vec3 字面量 | 🚫 改色方案要单独处理 GLSL uniform 注入 | 11 处 |
| F | 其他（硬编码 / inline / 浏览器强制） | 🚫 绝对不能碰 | 13 处 |

### 分类解读

- **A 类** = 安全区。改色只动 A 类。
- **B / C / D** = 中性色。改 `--ink` 不会自动迁移它们；如果新主题需要"中性 50% 半透明黑"语义，要新增 `--ink-50` 这类 token，再把 B/C/D 逐处替换。
- **E 类** = WebGL 段（`assets/template.html` / `assets/template-swiss.html` 的 GLSL 片段着色器）。改色方案如果想"shader 也跟着变"，必须**单独设计 GLSL uniform 注入方案**（在 JS 里读 `getComputedStyle` 取 `--ink` 字符串，注入 shader 头部），不在这份文档的范围内。
- **F 类** = 详见第 4 节。

### 3.1 字面量 vs 变量的快速判定

- 见到 `var(--xxx)` → 走 token 路径 ✅
- 见到 `#xxx` / `#xxxxxx` / `rgb()` / `rgba()` 字面量 → 立刻看是不是在 `:root[data-theme="..."]` 块内
  - 在 `:root` 块内 → A 类，可改
  - 不在 `:root` 块内 → B / C / D / E / F，按规则处置

---

## 4. F 分类详细清单（13 处 P0/P1）

F 分类是**绝对不能改**的硬编码颜色。每条都标了文件:行号 + 颜色值 + 选择器 / 上下文 + 风险等级 + 不能改的原因。

### template.html 系列

| 编号 | 位置 | 值 | 上下文 | 风险 | 不能改的原因 |
|---|---|---|---|---|---|
| F1 | `template.html:211` | `color:#aaa` | `#hint`（右下角键盘提示） | P0 | 用了 `mix-blend-mode:difference`；`#aaa` 是为了在深/浅背景下都能读，与 token 解耦，必须保留字面量 |
| F2 | `template.html:555` | `color:#fff` | `.theme-chip` 文字 | P1 | `.theme-chip` 本身有 `background:rgba(0,0,0,.55)` 暗底玻璃质感，文字必须永远白；改字面色会破坏暗底可读性 |
| F3 | `template.html:560` | `color:#fff` | `.theme-chip select` 文字 | P1 | 同 F2 原因；select 在暗底玻璃上必须白 |
| F4 | `template.html:564` | `background:#1A1A1A;color:#fff` | `.theme-chip select option` | P1 | 浏览器原生 `<option>` 下拉项 UI 限制：跨平台一致地强制暗底（详见第 6 节第 8 条） |

### template.html 内部 JS / canvas

| 编号 | 位置 | 值 | 上下文 | 风险 | 不能改的原因 |
|---|---|---|---|---|---|
| F5 | `template-swiss.html:2474`（位于 `template-swiss.html` 末段 JS，注：原 brief 误标为 `template.html:2474`，`template.html` 全长仅 1017 行） | `ctx.fillStyle = \`rgba(255,255,255,${alpha.toFixed(3)})\`` | ASCII 点阵呼吸场 canvas 绘制 | P0 | 半透明白色叠加在暗底 shader 上形成"星尘"效果；alpha 由 frame 动态计算，颜色硬编码白才能在所有主题下保持氛围一致 |

### template-swiss.html 系列

| 编号 | 位置 | 值 | 上下文 | 风险 | 不能改的原因 |
|---|---|---|---|---|---|
| F6 | `template-swiss.html:1274` | `color:#fff` | `.theme-chip` 文字 | P1 | 同 F2 原因 |
| F7 | `template-swiss.html:1279` | `color:#fff` | `.theme-chip select` 文字 | P1 | 同 F3 原因 |
| F8 | `template-swiss.html:1283` | `background:#1A1A1A;color:#fff` | `.theme-chip select option` | P1 | 同 F4 原因 |
| F9 | `template-swiss.html:1364` | `color:#fff` | 封面 H1 inline style | P1 | 封面满屏品牌色，文字硬编码白以保证对比度；改字面色会破坏 hero 区可读性 |
| F10 | `template-swiss.html:1394` | `color:#fff` | MANIFESTO H2 inline style | P1 | 同 F9，宣言页强制白字 |
| F11 | `template-swiss.html:1544` | `'#002FA7'` | shader accent fallback（`cs.getPropertyValue('--accent') \|\| '#002FA7'`） | P0 | shader 启动瞬间 `--accent` 还未生效时的兜底色；与 IKB 国际克莱因蓝同色，是 Swiss 风格"安全默认"；改 fallback 会让首帧白屏 |
| F12 | `template-swiss.html:639` | `background:#f5f5f4` | `.card-fill` 中性 token | P0 | 中性灰底，**有意**与 `--paper` 解耦，确保跨主题都有"卡片底"概念；改字面色会破坏 card / ink / accent 三层 token 体系 |
| F13 | `template-swiss.html:1626` | `background:rgba(250,250,248,.96)` | ESC 索引遮罩层 | P0 | 索引浮层必须永远"暖白"以与主区域区分；alpha .96 + backdrop-filter:blur(12px) 模拟纸张悬浮感；改色会破坏"层"语义 |

> F 分类合计 13 条，其中 P0 = 5 条（动则视觉立即坏），P1 = 8 条（动则某场景视觉坏）。

---

## 5. 改色安全变量清单（按风险等级）

下表统计两个种子模板里"改这个变量会影响多少处 CSS 引用"。改色前先看哪个变量影响面最大。

### template.html 风险表

| 风险 | 变量 | 引用数 | 备注 |
|---|---|---|---|
| 🔴 高 | `--serif-zh` | 19 | **锁**。中文字体栈，改色不动 |
| 🔴 高 | `--mono` | 23 | **锁**。等宽字体，改色不动 |
| 🔴 高 | `--serif-en` | 14 | **锁**。英文衬线，改色不动 |
| 🟡 中 | `--ink-rgb` | 12 | 改 `--ink` 时必须同步 |
| 🟡 中 | `--sans-zh` | 10 | **锁**。中文无衬线字体栈 |
| 🟡 中 | `--ink` | 10 | 主色，改色重点 |
| 🟡 中 | `--paper-rgb` | 14 | 改 `--paper` 时必须同步 |
| 🟢 低 | `--paper` | 6 | 底色，改色重点 |
| 🟢 低 | `--brand-secondary` | 5 | 次级强调 |
| 💀 死变量 | `--paper-tint` | 0 | 历史遗留，无引用，可清理 |
| 💀 死变量 | `--ink-tint` | 0 | 历史遗留，无引用，可清理 |
| 💀 死变量 | `--serif-body-en` | 0 | 历史遗留，无引用，可清理 |

### template-swiss.html 风险表

| 风险 | 变量 | 引用数 | 备注 |
|---|---|---|---|
| 🔴 高 | `--sans` | 63 | **锁**。Swiss 风格核心无衬线字体 |
| 🔴 高 | `--accent` | 54 | Swiss 独有强调色，54 处引用 |
| 🔴 高 | `--sans-zh` | 43 | **锁**。中文无衬线 |
| 🔴 高 | `--ink` | 28 | 主色 |
| 🔴 高 | `--mono` | 28 | **锁**。等宽字体 |
| 🔴 高 | `--paper` | 25 | 底色 |
| 🟡 中 | `--accent-on` | 15 | accent 反转色，依赖 `--ink` / `--paper` |
| 🟡 中 | `--grey-1` | 10 | 中性灰阶 |
| 🟡 中 | `--text-primary` | 10 | 文字主色 |
| 🟢 低 | `--text-helper` | 7 | 辅助文字 |
| 🟢 低 | `--text-secondary` | 5 | 次级文字 |
| 🟢 低 | `--grey-2` | 5 | 中性灰阶 |
| 🟢 低 | `--brand-secondary` | 5 | 次级强调 |
| 🟢 低 | `--grey-3` | 4 | 中性灰阶 |
| 🟢 低 | `--border-subtle` | 4 | 边框 |

#### 死变量（29 个，无引用，可清理但不要新增）

`--accent-rgb` / `--accent-bright` / `--brand-secondary-rgb` / `--text-placeholder` / `--text-on-color` / `--border-strong` + 6 个 `--sp-*` + 4 个 `--ease-*` + 6 个 `--dur-*`。

> 💀 死变量不在改色范围。改色不要"激活"它们，否则会污染变量语义。

### 5.1 颜色 token 的标准形态

新增颜色到 `:root[data-theme="..."]` 块时，遵守以下 4 条形态约束：

- **主色对**：`--ink` + `--ink-rgb` + `--ink-tint`（三件套，缺一不可）
- **底色对**：`--paper` + `--paper-rgb` + `--paper-tint`（三件套，缺一不可）
- **次级强调**：`--brand-secondary`（不带 RGB，因为次级强调极少用 `rgba` 推导透明度）
- **Swiss 强调**：`--accent` + `--accent-on`（`--accent-on` 是 `--accent` 反转色，依赖 `--ink` / `--paper` 翻转）

在 slide 内引用时，**始终**用 `var(--ink)` / `var(--paper)` / `var(--brand-secondary)` / `var(--accent)`，**不要**直接用 `var(--ink-rgb)`（那是推导辅助）。`var(--ink-rgb)` 只在 `rgba(var(--ink-rgb), .5)` 这种组合场景出现。

### 5.2 主题块在种子模板中的位置

两个种子模板的 `:root[data-theme="..."]` 块集中放置，便于一次性 review：

- `assets/template.html`：6 套主题块写在文件前段（`patch` 之后），每块约 8-12 行 CSS。
- `assets/template-swiss.html`：6 套主题块写在文件前段（`<style>` 段尾部），每块约 10-15 行 CSS。

新增加主题时，**只**在这两处插入新 `:root[data-theme="..."]` 块，**不**在 slide 中定义局部 `:root`。`:root` 全局生效，局部定义反而被全局覆盖。

---

## 6. 改色硬规则（8 条）

每条都是踩过的坑，违反会导致 validator 全绿但视觉坏。

1. **不挤占 Sika 命名空间**：`sika-theme/*` 12 衍生预设保留不动。Sika 是集团客户，色板已锁。改色只在 `data-theme="sika-yellow"` / `sika-red` 等 6 套白名单内做微调，不另开 `sika-*` 新 id。

2. **不写散落 hex**：所有颜色从 `:root[data-theme="..."]` 进入。slide 内 0 inline hex，0 `<style>` 内 hex 散落。如需新色，先在主题块加 token，再用 `var(--xxx)` 引用。

3. **不仿制官方 logo**：颜色复刻仅用于色板氛围。Sika / Davco 官方 logo 是注册商标，不要在 deck 里"画"一个相似 logo；颜色 token 是色卡不是 logo。

4. **不破坏 ink/paper 语义对**：`--ink` 必须深（>= #2A2A2A 量级），`--paper` 必须浅（>= #F5F5F5 量级）。如果新主题需要"暗色 deck"，靠 `.light-bg` body class 翻转，不要把 `--ink` 改成浅色。

5. **不破坏字体变量**：`--serif-*` / `--sans-*` / `--mono` 是**锁**。改色不动字体栈，字体职责归 `fonts-brand.md`。

6. **不动 WebGL shader 硬编码 vec3**：E 类 11 处是 GLSL 着色器字面量。改色方案要单独设计 GLSL uniform 注入（在 JS 读 `--ink` 注入 shader），不在本 SOP 范围。

7. **不动 currentColor 继承的 icon / border**：很多 icon 用 `fill: currentColor` 或 `stroke: currentColor`，颜色随父级 `--ink` 翻转。改色靠 `.light-bg` / `.dark-bg` 切换，**不**改 icon 内部。

8. **不改 `<option>` 强制暗底**（F4 / F8）：浏览器原生 `<option>` UI 限制。Safari / Chrome / Firefox 都强制使用系统级 select 渲染，无法靠 CSS 切换亮 / 暗。`.theme-chip select option` 永远暗底白字是跨平台折中。

### 6.1 改色 vs 改字体：边界

改色**不**包括：

- 改 `--serif-zh` / `--sans-zh` / `--sans-en` / `--serif-en` / `--mono` 等字体栈变量
- 改 Google Fonts `<link>` 的字体清单
- 改 6 主题对应的 `THEME_FONTS` 字体家族

这些归 `fonts-brand.md` 管。本文档只在第 5 节表格里**列出**字体变量风险等级，**不**指导改字体的方法。

---

## 7. 改色 SOP（6 步）

### Step 1 · 改色前必跑（baseline）

```bash
node scripts/validate-swiss-deck.mjs <file>
node scripts/validate-brand-deck.mjs <file>
```

记录 baseline 输出。改色后再跑，对比 errors / warnings 增量。

### Step 2 · 改色中

- 从 `--ink` / `--paper` / `--ink-rgb` / `--paper-rgb` 起步
- 保持 ink/paper 语义对（详见硬规则 4）
- 所有新颜色进 `:root[data-theme="..."]` 块，slide 内 0 inline hex

### Step 3 · 改色后必跑（验证）

- 全主题 × 全页 Chrome headless 截图组合（覆盖所有 `data-theme` × 所有 slide）
- 多视口截图（1920×1080 / 1440×900 / 1280×720 / 375×667）各 1 张
- 截图肉眼 review，特别检查：
  - 暗底浅字是否还清晰
  - accent 色在 `--ink` 翻转后是否还能识别
  - 移动视口（375）下文字是否过小或对比度崩塌

### Step 4 · WCAG 对比度自检

- 工具：Chrome DevTools > Lighthouse > Accessibility
- 阈值：≥ 4.5:1（正文）/ ≥ 3:1（标题）
- 重点检查：`--text-helper` / `--text-secondary` / `--grey-1/2/3` 与 `--paper` 的组合

### Step 5 · 品牌色硬规则验证

```bash
# 改完跑一遍,确保品牌色未污染到 :root 块外
grep -E "#[0-9a-fA-F]{6}" assets/template*.html | grep -v ":root"
# 应当几乎无输出
```

如出现非 `:root` 行的 hex，立即按 F 分类（详见第 4 节）排查并修复或记录豁免。

### Step 6 · 发版前

```bash
node scripts/validate-brand-deck.mjs <file> --strict
```

`--strict` 模式把 warnings 当 errors。任何 warning 都必须修。

### Step 6.5 · 复审 `var(--)` 引用完整性

```bash
# 找出所有 var(--xxx) 引用,人工确认每个变量都在 6 主题块内都定义过
grep -oE "var\(--[a-z0-9-]+\)" assets/template*.html | sort -u
```

输出应该**全部**在第 5 节"安全变量清单"内。出现清单外的 var(--xxx) 引用 → 漏配 token，会 fallback 到 `:root` 默认值（黑/白），视觉立即坏。

---

## 8. 颜色盲区清单（validator 完全不查的）

下列 8 条是 validator 永远不查、改色后容易"翻车"的位置。每条标注：位置 / 表现 / 排查方法。

### B1 · ASCII canvas fillStyle 透明度
- **位置**：`template-swiss.html:2474`（同 F5）
- **表现**：新主题把 `--ink` 改成深色，ASCII 呼吸场仍然按 `rgba(255,255,255, alpha)` 绘制，深底深色看不到"星尘"
- **排查**：截图肉眼 review；如主题是暗底，要单独设计 GLSL uniform 注入

### B2 · mix-blend-mode: difference 文字色
- **位置**：`template.html:211`（同 F1）
- **表现**：`#hint` 用 `mix-blend-mode: difference` + `color:#aaa`，深底亮字、浅底反色。改 `--ink` 不影响
- **排查**：在 6 主题下分别看右下角提示

### B3 · `<option>` 跨平台一致暗底
- **位置**：`template.html:564` / `template-swiss.html:1283`（同 F4 / F8）
- **表现**：用户点开主题切换器，所有平台都是暗底白字。改 `--ink` 不会影响
- **排查**：用 Safari + Chrome + Firefox 各点一次 `<select>`

### B4 · shader accent fallback
- **位置**：`template-swiss.html:1544`（同 F11）
- **表现**：首帧（`--accent` 未生效时）闪一下 `#002FA7`，是预期行为。改 fallback 颜色会改变"瑞士蓝"语义
- **排查**：hard refresh 看首帧

### B5 · .card-fill 中性 token
- **位置**：`template-swiss.html:639`（同 F12）
- **表现**：卡片底色永远是 `#f5f5f4`，不跟主题走。改 token 不会自动迁移
- **排查**：所有主题下检查 `.card-fill` 卡片

### B6 · ESC 索引遮罩层
- **位置**：`template-swiss.html:1626`（同 F13）
- **表现**：按 ESC 弹出索引页，永远是"暖白纸"。改 `--paper` 不会影响
- **排查**：按 ESC 看遮罩层颜色

### B7 · 散落 inline hex（slide 内）
- **位置**：`template-swiss.html:1364` / `1394`（同 F9 / F10） 等 inline style
- **表现**：hero / manifesto 区域硬编码白字。改 `--ink` 不影响
- **排查**：`grep -nE "color:|background:" assets/template*.html` 找 inline 颜色

### B8 · Grep 命令字面量匹配
- **位置**：第 7 节 Step 5 的 `grep` 命令
- **表现**：短 hex（如 `#fff` / `#000`）不会被 6 位 hex 模式匹配。如出现 `#fff` 散落，grep 不会报警
- **排查**：另跑 `grep -nE "#[0-9a-fA-F]{3,6}\b" assets/template*.html` 兜底

---

## 9. 改色禁忌（绝对不能做）

5 条红线，违反后无法回滚视觉正确性。

1. **不要改 `:root` 块外的硬编码 hex**：散落到 slide / `<style>` / JS 字面量里的颜色都算 F 类（详见第 4 节）。改前先确认在 `:root[data-theme="..."]` 块内。

2. **不要把 `--ink` 改成浅色**：破坏 dark/light 翻转。`.light-bg` body class 依赖 `--ink` 是深色才工作。改浅后所有 light-bg slide 会"看不见文字"。

3. **不要让 1 份 deck 用 ≥ 2 个 accent 色**：Swiss 风格强调色唯一。1 份 deck 1 个 `--accent`（多主题场景下，每个 `data-theme` 各自的 `--accent`）。混用 2 个 accent 会让"焦点"分散，破坏 Swiss 信息层级。

4. **不要省略 `--ink-rgb`**：所有 `rgba(var(--ink-rgb), .5)` 推导会 fallback 到黑色 0,0,0。改色时**必须**成对改 `--ink` + `--ink-rgb`（同 `--paper` + `--paper-rgb`）。

5. **不要把品牌色 hex 散落到 slide 内 inline style**：破坏主题切换语义。新增的 inline 颜色应该走 token，从 `var(--xxx)` 引用。

### 9.5 · Demo 与种子模板的不一致（已知差异 · 单一来源决策）

swiss demo 在视觉 polish 阶段做了 3 处 demo 局部覆写，**不**上升到种子模板的源真理。这是"demo 演示用视觉增强"与"种子模板源真理"之间的有意分层，**不是**配置漂移。

| 文件 | sika-red 实际值 | 来源 | 决策 |
|---|---|---|---|
| `assets/template.html:474` | `#D82828` | 种子模板（电子杂志） | 源真理，**不**改 |
| `assets/template-swiss.html` | `#D82828` | 种子模板（瑞士风） | 源真理，**不**改 |
| `examples/brand-themes-swiss.html:780` | `#C8252C` | demo polish | 保留，**不**回写到种子 |
| `examples/brand-themes.html:392` | `#D82828` | 杂志 demo | 与种子一致 |
| `previews/preview-*-swiss.html` | `#D82828` | 预览 HTML | 与种子一致 |
| `references/themes-brand.md:46` | `#D82828` | 主题档案 | 源真理，**不**改 |

**3 处 demo polish**（全部集中在 `examples/brand-themes-swiss.html`）：

1. **sika-red 降饱和**（P1·2）：`--accent` `#D82828` → `#C8252C`（拉离"广告红"，更克制）
2. **davco-restrained 拉冷**（P1·1）：`--paper` `#FAFAFA` → `#EEF1F4`（冷一档蓝灰，与 amber 拉开）
3. **sika-yellow 装饰三角换红**（P2）：`.sika-corner` `#FCC500` 黄底对比度低 → 改用 `#C8252C`（与 sika-red 同步，保证色系连贯）

**原因**：swiss demo 是"成品样张"——目的是让看 demo 的人立刻感受到 Swiss 克制调（避免刺眼饱和红、避免黄底弱对比），所以做了 3 处降饱和 / 拉冷 / 换色。但这 3 处**只对 demo 视觉有意义**，对种子模板来说反而会损失"品牌源真色"的复现能力（用 template 生成新 deck 的人可能需要原始的 #D82828 / #FAFAFA / #FCC500 来做品牌对位）。

**回写路径（不推荐）**：如果将来要"统一降饱和到 #C8252C"，正确做法是在 `assets/template.html` + `assets/template-swiss.html` 同步改，**不**是回写 demo。回写 demo 会让 demo 失去 polish 价值。

**当前验证**：

```bash
grep -n "#C8252C" examples/brand-themes-swiss.html   # 仅 2 处：line 780 + 787
grep -n "#C8252C" assets/template*.html              # 已被 P0-1 subagent 同步锁定（参考 git log）
```

---

## 10. 改色案例（3 个示例）

### 示例 1：把 Sika Red 从 `#D82828` 改成 `#C8252C`（降饱和）

- 改 1 个值：`assets/template.html` + `assets/template-swiss.html` 各 1 处的 `:root[data-theme="sika-red"] { --ink:#D82828; --ink-rgb:216,40,40; }`
- 影响：template.html 10 处 + template-swiss.html 27 处 + 6 主题块 = 约 43 处 CSS 引用
- 验证：跑 6 主题截图 + 2 validator

### 示例 2：把 Davco Amber 改成更亮的 `#FFB300`

- 改 1 个值：`assets/template.html` + `assets/template-swiss.html` 各 1 处的 `:root[data-theme="davco-amber"]` 主色
- 影响：template.html 主题块 1 处 + template-swiss.html 主题块 1 处 + demo 中使用 = 3 处
- 验证：跑 `?theme=davco-amber` 截图 + Lighthouse 对比度

### 示例 3：新增 `davco-coral` 第 7 主题

- 改 `assets/template.html` 加色板 + 字体栈（在 `:root[data-theme="davco-amber"]` 旁加 `:root[data-theme="davco-coral"]` 块）
- 改 `assets/template-swiss.html` 加色板 + 字体栈
- 改 `references/themes-brand.md` 文档（加一行主题总览 + 一个 CSS 块）
- 改 `references/fonts-brand.md` 字体栈
- 改 brand validator `ALLOWED_THEMES` 白名单 + `THEME_FONTS` map
- 改 demo 加新章节（在 `examples/brand-themes.html` / `examples/brand-themes-swiss.html` 加 `<section class="slide accent" data-theme="davco-coral">` 演示页）

> 主题扩展的详细规范见 `references/themes-brand.md` 与 `references/theme-derivatives.md`。

### 示例 4：排查 `var(--xxx)` 引用孤儿

如果担心改色后出现"未定义 token"的引用孤儿：

```bash
# 列出所有 var(--xxx) 引用
grep -hoE "var\(--[a-z0-9-]+\)" assets/template*.html | sort -u > /tmp/used.txt
# 列出所有 --xxx 定义
grep -hoE "^\s*--[a-z0-9-]+:" assets/template*.html | sort -u > /tmp/defined.txt
# diff 找出"用了没定义"或"定义了没用"
comm -23 /tmp/used.txt <(sed 's/^[[:space:]]*//; s/:.*//' /tmp/defined.txt)
```

孤儿 = 视觉立即坏。改色前必跑。

---

## 11. 改色决策记录：WCAG AA 4.5 优先

> 日期：2026-06-10
> 决策者：Jasen
> 触发：subagent P1-3 跑出 40+ 个 WCAG contrast 错误（6 主题系统真实可读性 fail）

### 11.1 决策

**Jasen 决策**：接受为了可用性牺牲一些 brand 强度。具体取舍：
- ✅ 保留：6 主题 id、--brand-secondary（Sika 黄）、--accent（swiss 红/橙/金）、字体栈、WebGL shader
- ❌ 牺牲：--ink 不再是"品牌主色"（如黄/红），改为"深色墨水"（#1A1A1A 系）；--text-muted 加深一档
- ➕ 新增：--accent-on（accent 块上的前景文字色），让反色文字达 WCAG 3:1

### 11.2 改色前后对照

| 主题 | 变量 | 改前 | 改后 | ratio 改善 |
|---|---|---|---|---|
| sika-yellow | --ink | #FCC500 | **#3A2E1A** | 1.6 → 8.5:1 |
| sika-red | --ink | #D82828 | **#1F0E0E** | 4.5 → 16.8:1 |
| davco-amber | --ink | #F7B20B | **#3A2810** | 1.7 → 9.2:1 |
| davco-restrained | --text-muted | #6B7785 | **#5E6A78** | 4.37 → 4.51:1 |
| neutral-paper | --text-muted | #7A7A7A | **#666460** | 4.04 → 4.85:1 |
| sika-yellow | --accent-on | (新增) | **#3A2E0E** | paper-on-accent 1.51 → 8.4:1 |
| davco-amber | --accent-on | (新增) | **#3A2806** | 1.78 → 9.1:1 |
| davco-restrained | --accent-on | (新增) | **#2E2208** | 1.90 → 9.5:1 |
| neutral-ink | --accent-on | (新增) | **#2A2418** | 2.25 → 7.4:1 |

### 11.3 影响范围

- **模板文件**：
  - `assets/template.html`（6 主题块的 --ink / --ink-rgb / --ink-tint / --text-muted / --accent-on）
  - `assets/template-swiss.html`（6 主题块的 --text-muted / --accent-on）
- **demo / preview**：未改（demo 继承模板值，preview 锁定主题，**下次 demo polish 时同步**）
- **文档**：本文档（color-audit.md）新增 §11
- **校验器**：3 个 validator 0 改动（WCAG 规则自动重新跑，错误数从 40+ 降到 0-5）

### 11.4 取舍

**保留的 brand 强度**：
- 6 主题 id（sika-yellow / sika-red / davco-amber / ...）保留，作为品牌身份标识
- --brand-secondary（杂志模板）保留为 Sika 黄
- --accent（swiss 模板）保留为各主题强调色
- 顶 band / chip / 装饰三角 / hero 装饰仍用品牌色
- WebGL 背景仍按主题渲染

**牺牲的 brand 强度**：
- --ink 不再是"品牌主色"——以前 sika 系 4 主题用黄/红/橙当文字色（不可读但"亮眼"），现在用深色墨水（可读但"朴素"）
- --text-muted 在 2 个主题微微加深（4.37 → 4.51），几乎看不出视觉差异
- --accent-on 4 个 fail 主题从白色改为深褐（accent 上的反色按钮颜色变化）

### 11.5 下次 polish 待办

- **demo 同步**：examples/brand-themes*.html 的 polish 覆写是否需要回写（subagent P1 决定）
- **preview 同步**：12 个 preview HTML 是否需要重生成（subagent C 决定）
- **CSS 用法**：用 var(--accent-on) 替换 var(--paper) on var(--accent) 的反色文字场景（还没改 CSS 用法，--accent-on 已声明但未引用）
- **新默认值**：未来新主题的 --ink 应默认深色，brand 走 --brand-secondary / --accent

---

## 12. 相关文件清单

| 路径 | 角色 |
|---|---|
| `assets/template.html` | 种子模板（电子杂志 × 电子墨水风） |
| `assets/template-swiss.html` | 种子模板（瑞士国际主义风） |
| `examples/brand-themes.html` | 多主题 demo（杂志风） |
| `examples/brand-themes-swiss.html` | 多主题 demo（瑞士风） |
| `references/themes-brand.md` | 多主题色板档案（id / 色值 / 字体 / 适用场景） |
| `references/themes-swiss.md` | Swiss 单色板档案 |
| `references/themes.md` | Sika Corporate 单色板档案 |
| `references/fonts-brand.md` | 字体栈档案 |
| `references/brand-quickstart.md` | 多主题快速入门 |
| `references/theme-derivatives.md` | 主题衍生预设规范 |
| `scripts/validate-swiss-deck.mjs` | Swiss deck 校验（0 颜色规则） |
| `scripts/validate-brand-deck.mjs` | 多主题 deck 校验（约 3 颜色规则） |
| `scripts/check-theme-tokens.mjs` | 主题块覆盖度校验（如已建） |

---

## 13. 变更记录

| 日期 | 版本 | 改动 |
|---|---|---|
| 2026-06-10 | v1.0 | 初版（基于 Layer 1-3 报告汇总）|
