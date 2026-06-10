# 字体方案档案 · Fonts Brand Spec

## 0. 前言

本文档是 `references/themes-brand.md`（多主题色板配套文档）的字体配套规范，覆盖 6 套多主题模板（`sika-yellow` / `sika-red` / `davco-amber` / `davco-restrained` / `neutral-ink` / `neutral-paper`）的字体栈、字重阶梯与字号基线。

所有字体走 **Google Fonts CDN**（商用免费、OFL/Apache 2.0 协议），再以系统字体栈兜底，确保内网/离线/封网场景下仍然有可读的回退。**禁止**在用户素材或模板里写 Sika 官方自研收费字体（仅限品牌官方授权场景使用,不在本项目分发范围内）。

---

## 1. 通用预连接 HTML

**13 家族 GFonts link** 是 6 主题字体的共享扩展段。**当前状态**：

- `assets/template.html` 第 569 行已 patch 13 家族 link（与默认 line 9 的 5 家族默认 link 共存）。
- `assets/template-swiss.html` **尚未** patch 13 家族 link——只有默认 line 9 的 3 家族 link（Inter / JetBrains Mono / Noto Sans SC）。这是文档与代码的差异：本文档先前声称"两个模板都已 patch 同一段 13 家族 link"**仅对 `template.html` 成立**。
- `examples/brand-themes-swiss.html` 第 810 行已 patch 13 家族 link（与默认 line 9 的 3 家族 link 共存），可作为 swiss 模板注入 13 家族 link 的参考目标。

**目标形态**：两个模板的 `<head>` 末尾都应 patch 同一段 13 家族 `<link>`，一次性把 13 个字体家族全量拉取,激活哪个主题就消费哪几个家族,未消费的家族在 GFonts 端会按 `display=swap` 异步加载、不阻塞首屏。

下方代码块是 13 家族 link 的**通用模板**，复制到 swiss 模板的 `<head>` 末尾（默认 link 之后）即可与 6 主题变量对齐。

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500;600&family=Space+Mono:wght@400;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600&family=Lora:wght@400;500;600;700&family=EB+Garamond:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=Noto+Sans+SC:wght@300;400;500;600;700;900&family=Noto+Serif+SC:wght@300;400;500;600;700;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

13 个家族按主题消费：

| 家族 | 协议 | 主题消费方 |
|---|---|---|
| Barlow Condensed | OFL | sika-yellow |
| Space Grotesk | OFL | sika-red |
| Space Mono | OFL | sika-red |
| DM Sans | OFL | davco-amber |
| IBM Plex Sans | OFL | davco-restrained |
| IBM Plex Mono | OFL | davco-restrained / neutral-ink / default |
| Fraunces | OFL | neutral-ink / neutral-paper |
| Lora | OFL | neutral-paper |
| EB Garamond | OFL | neutral-paper |
| Playfair Display | OFL | neutral-ink / 默认 serif-en |
| Noto Sans SC | OFL | 全部 6 主题（--sans-zh） |
| Noto Serif SC | OFL | neutral-ink / neutral-paper（--serif-zh） |
| Source Serif 4 | OFL | 默认兜底（--serif-body-en） |

---

## 2. 共享 fallback 栈

主题变量里第一个出现的是 Google Fonts 字体，后面所有都是离线/系统兜底。`<html lang="zh-CN">` 决定了中英混排时的默认族。

```css
/* 中文无衬线 — 全 6 主题共享 */
--font-zh-sans: "PingFang SC", "Hiragino Sans GB", "Source Han Sans SC",
               "Noto Sans SC", "Microsoft YaHei UI", "Microsoft YaHei",
               "微软雅黑", system-ui, sans-serif;

/* 中文衬线 — neutral-ink / neutral-paper 主题专用 */
--font-zh-serif: "Source Han Serif SC", "Noto Serif SC", "Songti SC",
                 "STSong", "SimSun", "宋体", serif;

/* 等宽 — 全 6 主题共享,用于 chrome-min / kicker / idx / 数字编号 */
--font-mono: "JetBrains Mono", "IBM Plex Mono", ui-monospace,
             SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
```

`--font-zh-sans` 在 Windows 上自动降级到「微软雅黑」;macOS 上是 PingFang SC;Linux 上走 Noto Sans SC（系统已装时）再降级到 `system-ui` / `sans-serif` 兜底。

---

## 3. 6 套主题字体栈

每套主题在 `:root[data-theme="<id>"]` 里只覆盖 5 个字体变量;未写的变量继承 `:root` 默认值（Playfair Display / Noto Serif SC / Noto Sans SC / IBM Plex Mono）。6 套主题的 CSS 块、性格、字重/字号阶梯如下,详细对比表见第 4 / 5 节。

### 3.1 `sika-yellow`

**性格**：工业识别 · 黄黑警戒 · 渠道培训气质。压扁的 Condensed 字体自带施工警示牌的张力,适合工地、门店、渠道、施工现场的快速识别。

```css
:root[data-theme="sika-yellow"]{
  --serif-en: "Barlow Condensed", "Archivo Narrow", "Playfair Display", Georgia, serif;
  --sans-en:  "Barlow Condensed", "Inter", "Helvetica Neue", sans-serif;
  --sans-zh:  "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  --serif-zh: "Noto Serif SC", "Source Han Serif SC", serif;
  --mono:     "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
}
```

**字重/字号**：display 700 / h1 600 / h2 500 / body 400 / meta 500。h-hero 11vw、h-xl 4.6vw、body max(15px,1.22vw)、meta 11px UPPER（详细对比见第 4、5 节）。

**选型理由**：Barlow Condensed 笔画窄而高,与 Sika Yellow 警戒条带视觉同源;JetBrains Mono 比 IBM Plex Mono 更冷硬,适合黄色底的「步骤 / 标签 / 编号」语义。

### 3.2 `sika-red`

**性格**：战略宣言 · 风险议题 · 集团决策。Space Grotesk 的几何骨架加 Space Mono 的等宽数字,构成「红底白字 + 大数字 KPI」的指挥中心调性。

```css
:root[data-theme="sika-red"]{
  --serif-en: "Space Grotesk", "Inter", Georgia, serif;
  --sans-en:  "Space Grotesk", "Inter", "Helvetica Neue", sans-serif;
  --sans-zh:  "Noto Sans SC", "PingFang SC", sans-serif;
  --serif-zh: "Noto Serif SC", "Source Han Serif SC", serif;
  --mono:     "Space Mono", "JetBrains Mono", ui-monospace, monospace;
}
```

**字重/字号**：display 700 / h1 600 / h2 500 / body 400 / meta 700（6 套里 meta 唯一顶到 700 的）。h-hero 11vw、h-xl 4.6vw、body max(15px,1.22vw)、meta 11px UPPER。

**选型理由**：Space Grotesk 的圆几何 g/a 在红底白字上识别度极高;Space Mono 是 6 套主题里唯一保留显示体感的等宽字体,与「战略风险 / KPI 数字」语义最贴。

### 3.3 `davco-amber`

**性格**：暖琥珀 · 中国区家装 · 客户案例册。DM Sans 是 Google Fonts 里最像「现代教科书」的字体,圆润但不卡通,适合家装 / 民用建材的客户汇报。

```css
:root[data-theme="davco-amber"]{
  --serif-en: "DM Sans", "Inter", Georgia, serif;
  --sans-en:  "DM Sans", "Inter", "Helvetica Neue", sans-serif;
  --sans-zh:  "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  --serif-zh: "Noto Serif SC", "Source Han Serif SC", serif;
  --mono:     "JetBrains Mono", ui-monospace, monospace;
}
```

**字重/字号**：display 700 / h1 600 / h2 500 / body 400 / meta 500。h-hero 10vw、h-xl 4.2vw、body max(15px,1.2vw)、meta 11px UPPER。

**选型理由**：DM Sans 没有「Sans 大类」的工业冷感,字面 open 一点,与 Davco Amber #F7B20B 的暖琥珀底色温度一致;中文走 Noto Sans SC + 微软雅黑兜底,Windows 上不偏色。

### 3.4 `davco-restrained`

**性格**：工程克制 · 质量体系 · 内训讲义。IBM Plex Sans 是工程师字体（IBM 内部设计语言,Plex 家族贯穿产品文档/系统界面）,自带「工业但有教养」的克制气质。

```css
:root[data-theme="davco-restrained"]{
  --serif-en: "IBM Plex Sans", "Inter", Georgia, serif;
  --sans-en:  "IBM Plex Sans", "Inter", "Helvetica Neue", sans-serif;
  --sans-zh:  "Noto Sans SC", "PingFang SC", sans-serif;
  --serif-zh: "Noto Serif SC", "Source Han Serif SC", serif;
  --mono:     "IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace;
}
```

**字重/字号**：display 600 / h1 500 / h2 500 / body 400 / meta 500（display 是 6 套里唯一 600 起顶,克制不抢戏）。h-hero 9vw、h-xl 3.8vw、body max(15px,1.15vw)、meta 11px UPPER。

**选型理由**：Plex 家族内部风格统一（Sans / Mono / Serif 同一设计语汇）,是 6 套里唯一一套英文/中文/等宽全栈同源的工程气质字体,适合工法和质量体系内训。

### 3.5 `neutral-ink`

**性格**：黑底鎏金 · 高端品牌 · 公司年报。Playfair Display 的 Didone 骨架配 Fraunces 的「现代衬线变体」，是 Google Fonts 里最接近奢侈品牌年报的组合。

```css
:root[data-theme="neutral-ink"]{
  --serif-en: "Playfair Display", "Fraunces", "Source Serif 4", Georgia, serif;
  --serif-zh: "Noto Serif SC", "Source Han Serif SC", serif;
  --sans-en:  "Fraunces", "Source Serif 4", Georgia, serif;
  --sans-zh:  "Noto Serif SC", serif;
  --mono:     "IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace;
}
```

**字重/字号**：display 900 / h1 700 / h2 600 / body 400 / meta 500（display 顶到 900,是 6 套里最重）。h-hero 12vw、h-xl 5vw、body max(15px,1.25vw)、meta 11px UPPER。

**选型理由**：Playfair Display 800-900 重量级是 6 套里最重的 display,与鎏金 #C9A961 在 #0E0E0E 黑底上的呼吸感相配;Fraunces 作为副衬线,在次级标题上做柔性过渡,避免整套都硬挺。

### 3.6 `neutral-paper`

**性格**：米白底 · 暖陶 · 设计/文化分享。Fraunces 的 opsz 9..144 可变轴允许在 display 上用 144 大字面、正文用 9 小字面,同一家族承担「杂志标题 + 长文正文」两端。

```css
:root[data-theme="neutral-paper"]{
  --serif-en: "Fraunces", "Lora", "EB Garamond", Georgia, serif;
  --serif-zh: "Noto Serif SC", "Source Han Serif SC", serif;
  --sans-en:  "Lora", "Source Serif 4", Georgia, serif;
  --sans-zh:  "Noto Serif SC", serif;
  --mono:     "JetBrains Mono", ui-monospace, monospace;
}
```

**字重/字号**：display 600 / h1 500 / h2 400 / body 400 / meta 500（display/h1/body 全部衬线,Fraunces 用 opsz 144/72/9 三档可变字面）。h-hero 11vw、h-xl 4.4vw、body max(15px,1.2vw) line-height 1.7、meta 11px UPPER。

**选型理由**：Fraunces 是 6 套主题里唯一走「衬线主导全栈」的——display / h1 / body 全部衬线,与暖陶 #B86F4A + 米白 #FAF8F3 的杂志/文化气质最贴;Lora 作为 sans 兜底,EB Garamond 备胎,三层回退保证衬线感不丢。

---

## 4. 字重阶梯总表

| 主题 | display | h1 | h2 | body | meta |
|---|---|---|---|---|---|
| sika-yellow | 700 | 600 | 500 | 400 | 500 |
| sika-red | 700 | 600 | 500 | 400 | 700 |
| davco-amber | 700 | 600 | 500 | 400 | 500 |
| davco-restrained | 600 | 500 | 500 | 400 | 500 |
| neutral-ink | 900 | 700 | 600 | 400 | 500 |
| neutral-paper | 600 | 500 | 400 | 400 | 500 |

`neutral-ink`（黑底鎏金）字重跨度最大（900→400），走「重 display / 轻 body」的杂志大反差；`neutral-paper` 跨度最小（600→400），衬线主导、平稳呼吸；`davco-restrained` 字重 600 起顶，克制不抢戏。

### ⚠️ 字重阶梯是建议基线，非自动实现

6 套主题通过 `:root[data-theme="X"]` 块**只切换色板和字体家族**，不切换字重和字号基线。
- `template.html`：`.display`/`.h-hero`/`.h-xl` 是跨主题固定 class，字重 700/900/700 不随主题变化
- `template-swiss.html`：`.h-hero`/`.h-xl` 字重 200、`.kpi-cell .nb`/`.bar-tower .nb` 字重 250 也不随主题变化

如需"按主题变字重"，在主题块里加 `--display-weight: 700` 变量并让 `.display { font-weight: var(--display-weight, 700); }`。当前未实现，字重阶梯表是设计建议值。

---

## 5. 字号基线总表

| 主题 | h-hero | h-xl | body | meta |
|---|---|---|---|---|
| sika-yellow | 11vw / 700 | 4.6vw / 600 | max(15px, 1.22vw) / 400 | 11px / 500 |
| sika-red | 11vw / 700 | 4.6vw / 600 | max(15px, 1.22vw) / 400 | 11px / 700 |
| davco-amber | 10vw / 700 | 4.2vw / 600 | max(15px, 1.2vw) / 400 | 11px / 500 |
| davco-restrained | 9vw / 600 | 3.8vw / 500 | max(15px, 1.15vw) / 400 | 11px / 500 |
| neutral-ink | 12vw / 900 | 5vw / 700 | max(15px, 1.25vw) / 400 | 11px / 500 |
| neutral-paper | 11vw / 600 | 4.4vw / 500 | max(15px, 1.2vw) / 400 | 11px / 500 |

`neutral-ink` 的 h-hero 顶到 12vw，是 6 套里最霸气的；`davco-restrained` 收到 9vw，信息密度更高、适合内训。双约束 `min(Xvw, Yvh)` 见 `references/layouts.md` P0 法则第 3 条。

---

## 6. 场景-字体决策表

| 场景 | 推荐主题 | 理由 |
|---|---|---|
| 集团汇报（英文为主） | `sika-red` | Space Grotesk 几何骨架在英文环境识别度最高；红底白字 + 700/600 阶梯与外籍管理层阅读习惯一致 |
| 集团战略 / 风险议题 | `sika-red` 或 `neutral-ink` | 严肃议题走 `sika-red`（红 + Space Mono 数字 + 700 meta）；高端品牌叙事走 `neutral-ink`（900 display + 鎏金） |
| 中国区家装汇报 | `davco-amber` | DM Sans 圆润不工业冷,与中国区家装客户审美一致;琥珀 #F7B20B 与暖纸底拉近距离 |
| 工程部内训 | `davco-restrained` | IBM Plex 全栈同源（Sans/Mono/Serif），工程文档气质；600 起顶字重 + 9vw hero 避免大屏投影溢出 |
| 公司年报 | `neutral-ink` 或 `neutral-paper` | 年报走杂志感：`neutral-ink` 黑底鎏金偏奢侈品年报；`neutral-paper` 米白底偏 ESG/可持续年报 |
| 设计 / 文化分享 | `neutral-paper` | Fraunces 可变 opsz + 衬线全栈，杂志/展览画册气质；暖陶 #B86F4A 与设计圈暖色调审美同频 |

---

## 7. 实施说明

1. **6 套主题已在 `assets/template.html` 和 `examples/brand-themes-swiss.html` 的 `:root[data-theme="X"]` 块中实现**（`assets/template-swiss.html` 本身尚未注入 6 主题块，参见 §9 状态说明）。`template.html` 用 5 变量口径（`--serif-en / --sans-en / --sans-zh / --serif-zh / --mono`，Sika 编辑杂志风）；`examples/brand-themes-swiss.html` 与 swiss 模板的目标形态一致，用单变量口径（`--sans`，Sika Swiss 网格风）。两套变量映射到同一 13 家族 GFonts link（`template.html` line 569 + `examples/brand-themes-swiss.html` line 810；swiss 模板 line 9 的 3 家族 link 是 Sika Corporate 默认，13 家族扩展 link 尚未注入），激活同一组 13 家族。
2. **默认未指定 `data-theme` 时仍走 Sika Corporate 默认字体**（Playfair Display + Noto Serif SC + Noto Sans SC + IBM Plex Mono），不破坏既有 deck。`template.html` 的 `:root{}` 默认块已在 line 25-29 写好。
3. **不要在用户素材里写 Sika 官方自研收费字体**。本档案全程用 Playfair Display / Barlow Condensed / Space Grotesk / DM Sans / IBM Plex Sans / Fraunces / Lora / EB Garamond 8 款免费家族替代。
4. **一次性预加载 13 个字体家族体积约 30-40KB（gzip）**，按 `display=swap` 异步加载、不阻塞首屏；6 主题共用同一 link,新增主题零成本。如对 LCP 敏感可拆成 `?family=...` 按主题子集加载,但实操收益小、维护成本高,不建议。
5. **如内网/封网部署,建议把字体本地化**：把 13 个家族的 `.woff2` 打进 `assets/fonts/`,CSS 改 `url(./fonts/Barlow-Condensed-700.woff2)`;权重阶梯按需保留,不要全量打包,单主题实际只消费 3-5 个家族 × 2-3 个权重 ≈ 200-400KB。
6. **中英混排策略**：英文 always 走 `--serif-en` 或 `--sans-en`,中文 always 走 `--sans-zh` / `--serif-zh`;同一行内中英混排时,英文在 `font-family: var(--serif-en), var(--sans-zh);` 顺序下浏览器会按字符自动 fallback,无需 JS 切换。

---

## 8. 相关文件

- `references/themes-brand.md` — 多主题色板配套文档（6 套调色板变量）
- `references/themes.md` — Sika Corporate 单一色板详细规范（默认主题,本档案不替代）
- `references/themes-swiss.md` — Swiss 模板专用色板规范
- `assets/template.html` — Sika 编辑杂志风模板,line 510-547 注入 6 套 `:root[data-theme]` 字体块
- `assets/template-swiss.html` — Sika Swiss 网格风模板（**当前未注入 6 套 `:root[data-theme]` 字体块**；目标内容见 `examples/brand-themes-swiss.html` 第 686–731 行）

---

## 9. Swiss 模板独立字体加载

> **当前状态**：`assets/template-swiss.html` **只存在一个** Google Fonts 链接（`grep -c "fonts.googleapis" assets/template-swiss.html` = 2，其中 line 7 是 `<link rel="preconnect">`，line 9 是 `<link href="...css2...">`；唯一的 css2 stylesheet 链接在第 9 行）。文档先前声称的「第 1289 行存在第二个 GFonts link」**与代码不符**——P0-1 subagent 计划注入第二个 GFonts link 以服务 6 主题字体扩展，但截至本档案本次修订，**该 link 尚未出现在 swiss 模板里**。

`assets/template-swiss.html` 当前**唯一**的 Google Fonts 链接位于**第 9 行**(Sika Corporate Swiss 默认):仅加载 `Inter` / `JetBrains Mono` / `Noto Sans SC` 3 家族。这是 swiss 默认主题(无 `?theme=` 时)实际渲染的字体。

`examples/brand-themes-swiss.html` 第 9 行持有**与 swiss 模板 line 9 等价**的 Sika Corporate 默认字体 link；demo 自身的 6 主题字体通过**内联 fallback 栈**（每个 `:root[data-theme="..."]` 块的 `--sans` / `--sans-zh` 字段引用 Barlow Condensed / Space Grotesk / DM Sans / IBM Plex Sans / Fraunces / Lora / EB Garamond / Noto Sans SC / Noto Serif SC / Playfair Display 等家族）消费——**依赖 swiss 模板或最终用户页面在 head 注入完整 13 家族 GFonts link**（参见 §1 的 13 家族 link 模板）来真正显示衬线 / 几何无衬线等家族；若该 link 未注入，未在 3 家族内的主题字体将回退到模板默认字体（`--sans: "Inter", system-ui, ...`）。

`Inter` 和 `JetBrains Mono` 在 Sika Swiss 默认主题里是 **sans / mono 主体**(不在 fallback 栈里),所以无论是否切主题,swiss 模板都会**主动加载**这两个家族。
