# Sika PPT Skill · 网页 PPT / 配图 / 封面

![GitHub stars](https://img.shields.io/github/stars/Leev1s/html-ppt?style=flat-square)
![License](https://img.shields.io/github/license/Leev1s/html-ppt?style=flat-square)
![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)
![HTML Deck](https://img.shields.io/badge/HTML-Deck-0A7CFF?style=flat-square)
![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-6B5B95?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)
![Sika Theme](https://img.shields.io/badge/Sika-Corporate%20Theme-D8282F?style=flat-square)

> 🌏 **English version: [README.en.md](./README.en.md)**

一个面向 **Sika 公司** 的网页 PPT 技能,适配 Claude Code / Codex 等 Agent 环境,用于生成具有 Sika Red + Sika Yellow 品牌识别的**单文件 HTML 横向翻页 PPT**、PPT 配图和多平台封面。

内置两套都已完成 Sika 配色适配的视觉系统:

- **Style A: Sika 电子杂志**。以 Sika Red 为标题墨色、低饱和 Sika Yellow 为纸张底色,适合项目故事、案例复盘、观点表达。
- **Style B: Sika 瑞士国际主义**。保留网格、直角、发丝线和大字号对比,但固定使用 Sika Corporate 红黄暖砂配色,适合事实、产品、数据、施工流程和方法论表达。

> 仓库由 Leev1s 维护并发布到 [Leev1s/html-ppt](https://github.com/Leev1s/html-ppt)，当前版本支持 Sika / Davco / Neutral 三族多主题切换。

## 30 秒开始

```bash
npx skills add https://github.com/Leev1s/html-ppt --skill sika-ppt-skill
```

也可以直接把这段话发给有 shell 权限的 AI Agent:

```text
帮我安装 sika-ppt-skill。请把 https://github.com/Leev1s/html-ppt 克隆到 ~/.claude/skills/sika-ppt-skill,安装完成后检查 SKILL.md、assets/、references/ 是否存在。
```

已经安装过的话,用这段话更新:

```text
帮我更新 sika-ppt-skill。请进入 ~/.claude/skills/sika-ppt-skill 执行 git pull,然后告诉我当前最新 commit。
```

安装后直接对 Agent 说:

```text
帮我基于这篇文章做一份 Sika 风格瑞士风 PPT,控制在 7 页左右,需要 2-3 张配图。
```

也可以试这些请求:

```text
帮我把这份 Markdown 做成 Sika 电子杂志风演讲 PPT。
基于这份 PPT 的核心观点,生成一张公众号 21:9 头图。
把这张产品截图重新设计成适合 PPT 的 16:10 配图。
```

## 效果

- 🖋 **双视觉系统**:Sika 电子杂志风负责叙事,Sika 瑞士风负责事实表达
- 📐 **横向左右翻页**:键盘 ← → / 滚轮 / 触屏滑动 / 底部圆点 / ESC 索引
- 🧩 **Style A 10 种布局**:封面、章节、数据大字报、图文、图片网格、Pipeline、对比等
- 🧱 **Style B 22 种锁定版式**:Cover、Statement、KPI Tower、Loop Diagram、Duo Compare、Image Hero、Closing Manifesto 等
- 🎨 **Sika 固定配色**:两套模板均固定为 Sika Red + Sika Yellow + 暖砂灰阶,不再推荐非 Sika 色板
- 🖼 **Codex 可选配图流程**:可用 GPT-Image 2.0 / GPT-M 2.0 生成纪实照片、信息图、流程图、系统关系图、UI 情景图,并按模板比例插入
- 📰 **多平台封面**:可用同一套视觉规则生成公众号 21:9、公众号分享卡 1:1、小红书 3:4、视频号横版等封面
- 📴 **低性能静态模式**:按 `B` 可关闭 WebGL / canvas 动画,让动态内容退回静态背景
- 📄 **单文件 HTML**:不需要构建、不需要服务器,浏览器直接打开

## 适合 / 不适合

**✅ 合适**:线下分享 / 行业内部讲话 / 私享会 / AI 产品发布 / demo day / 带强烈个人风格的演讲

**❌ 不合适**:大段表格数据 / 培训课件(信息密度不够)/ 需要多人协作编辑(静态 HTML)

## 常见使用场景

| 任务 | 推荐方式 |
|------|---------|
| 长文章变演讲 PPT | 先抽核心观点,再按 6-10 页节奏生成 deck |
| 方法论 / 产品分析 | 用 Sika Style B 瑞士风,优先使用锁定版式和 21:9 主图 |
| 项目故事 / 观点表达 | 用 Sika Style A 电子杂志风,保留更强叙事感 |
| PPT 配图 | 在 Codex 中用 GPT-Image 2.0 / GPT-M 2.0 生成照片、信息图、流程图、UI 情景图 |
| 多平台封面 | 从同一份内容生成公众号 21:9、1:1 分享卡、小红书 3:4、视频号横版封面 |
| 截图统一风格 | 把原始截图重新生成到模板需要的比例,再插入 PPT |

## 为什么是 HTML PPT

- **更适合 Agent 生成和修改**:HTML / CSS 是文本,Agent 能直接读、改、验证。
- **表现力比 Markdown 更高**:可以做精细排版、空间定位、动画、交互和响应式封面。
- **交付更轻**:单文件 HTML 可以直接打开、演示、发送、截图。
- **更容易做质量控制**:瑞士风可以用脚本校验版式、图片槽位、标题对齐和危险 SVG。
- **更适合 Sika 视觉内容链路**:同一套 Sika Corporate 配色能覆盖 PPT、配图、封面和截图再设计。

## 平台支持

| 平台 | 状态 | 说明 |
|------|------|------|
| Claude Code | 支持 | 原生 Skill 工作流,适合生成和迭代 HTML deck |
| Codex | 支持 | 适合生成 PPT、调用图片生成能力、做浏览器视觉检查 |
| Cursor / 其他本地 Agent | 可用 | 需要能读写文件并执行 shell 命令 |
| WorkBuddy | 适配中 | 单独整理上架版本,去掉平台不需要的渠道差异 |
| 普通 Chatbot | 不推荐 | 没有文件系统和浏览器预览时,很难稳定生成完整 deck |


## 衍生版

所有平台衍生版统一使用 **Sika PPT Skill** 作为展示名、`sika-ppt-skill` 作为 Skill 名称,并共享同一套 Sika Corporate 模板、参考文档和校验规则。差异只体现在平台包装、触发话术和安装说明。完整规则见 [`references/derivative-variants.md`](./references/derivative-variants.md)。

| 衍生版 | 面向场景 | 差异重点 |
|--------|----------|----------|
| `sika-ppt-skill/core` | 任何有文件系统权限的本地 Agent | 完整模板、参考文档、校验脚本和配图流程 |
| `sika-ppt-skill/codex` | Codex 环境 | 强化浏览器 QA、截图检查和可选 GPT 配图提示 |
| `sika-ppt-skill/claude` | Claude Code 用户 | 保留 Skill 安装与触发示例,但不影响通用文档命名 |
| `sika-ppt-skill/workbuddy` | WorkBuddy / 市场上架包 | 精简安装说明,移除本地 clone 假设和平台无关话术 |
| `sika-ppt-skill/docs-lite` | 只需要治理规则的团队 | 只发布版式锁、配色、检查清单和提示词规范 |


## Theme 衍生版

Theme 衍生版不是新增任意色板,而是在 **Sika Red / Sika Yellow / 暖砂灰** 内改变面积、节奏、图像语义和组件侧重点。完整规则见 [`references/theme-derivatives.md`](./references/theme-derivatives.md)。

| Theme preset | 适合场景 | 视觉侧重点 |
|--------------|----------|------------|
| `sika-theme/corporate-core` | 通用公司汇报、管理层摘要 | 默认红黄暖砂平衡 |
| `sika-theme/red-command` | 战略、风险、危机响应、强决策 | 红色 statement、KPI、结论页更强 |
| `sika-theme/yellow-signal` | 培训、渠道、施工现场、指引 | 黄色路标、编号、转场和流程感 |
| `sika-theme/sand-technical` | 技术手册、产品参数、工法说明 | 暖砂底、发丝线、细节注释和表格 |
| `sika-theme/blueprint-grid` | 工程系统、质量流程、架构关系 | 网格、流程图、地图和系统结构 |
| `sika-theme/material-lab` | 材料、实验、产品性能证明 | 材料近景、specimen label、证据卡 |
| `sika-theme/sustainability-field` | ESG、可持续建造、长期信任 | 轻暖纸节奏 + 纪实图片,不引入绿色 |
| `sika-theme/supply-chain-map` | 工厂、仓储、物流、区域覆盖 | 地图组件、路线、节点和里程碑 |
| `sika-theme/product-proof` | 产品发布、benchmark、demo | 图片证据、截图再设计、KPI proof block |
| `sika-theme/event-keynote` | 发布会、大会、全员会 | 大字号、高对比、少正文、强开合 |
| `sika-theme/report-editorial` | 年报、季报、案例册、长文 | 杂志章节、拉引语、图文叙事 |
| `sika-theme/partner-workshop` | 客户工作坊、共创、销售赋能 | 练习页、对比页、行动清单 |

## 安装

### 方式一:一行命令安装(推荐)

```bash
npx skills add https://github.com/Leev1s/html-ppt --skill sika-ppt-skill
```

### 方式二:把下面这段话直接发给 AI

> 帮我安装 `sika-ppt-skill` 这个 Claude Code skill。请按下面步骤做:
>
> 1. 确保 `~/.claude/skills/` 目录存在(不存在就创建)
> 2. 执行 `git clone https://github.com/Leev1s/html-ppt.git ~/.claude/skills/sika-ppt-skill`
> 3. 验证:`ls ~/.claude/skills/sika-ppt-skill/` 应该看到 `SKILL.md`、`assets/`、`references/` 三项
> 4. 告诉我安装好了,之后我说"做一份 Sika 风格 PPT"或"做一份 Sika 瑞士风 PPT"之类的话就会触发这个 skill

把这段话复制粘贴给 Claude Code / Cursor / 任何有 shell 权限的 AI Agent,它会自动完成安装。

### 方式三:手动命令行

```bash
git clone https://github.com/Leev1s/html-ppt.git ~/.claude/skills/sika-ppt-skill
```

### 触发方式

装好后,Claude Code 会在对话里自动发现并调用这个 skill。触发关键词:

- "帮我做一份 Sika 风格 PPT"
- "帮我做一份 Sika 瑞士风 PPT"
- "生成一个 Sika horizontal swipe deck"
- "Sika editorial magazine style presentation"
- "Sika Corporate 配色演讲 slides"
- "基于这篇文章做一张公众号 21:9 封面"
- "基于这份 PPT 生成一张 1:1 分享卡"

## 使用流程

Skill 本身是结构化工作流,Agent 会逐步引导:

1. **选择风格** — Style A 电子杂志风,或 Style B 瑞士国际主义
2. **需求澄清** — 7 问清单:风格、受众、时长、素材、图片/截图需求、主题色、硬约束
3. **拷贝模板** — Style A 用 `assets/template.html`,Style B 用 `assets/template-swiss.html`
4. **填充内容** — 先做主题节奏表,再从对应 layout 骨架里挑、粘、改文案
5. **可选配图** — 在 Codex 中询问是否用 GPT-Image 2.0 / GPT-M 2.0 生成配图,再按页面比例插入
6. **自检** — 对照 `references/checklist.md`,P0 级问题必须全过；瑞士风还要运行版式校验器
7. **预览** — 浏览器直接打开
8. **迭代** — inline style 改字号/高度/间距

详细说明见 [`SKILL.md`](./SKILL.md)。

## Style B 瑞士风

瑞士风是这次新增的结构化主题。它不是"换一套 CSS",而是一套更严格的版式系统。

- **22 个具名版式**:正文页只能从 `S01` 到 `S22` 中选择,不能临时发明页面结构
- **Sika 固定主题色**:Sika Red、Sika Yellow、暖砂灰阶贯穿所有页面
- **网格锁定**:16 列 grid、直角色块、1px 发丝线、无阴影、无渐变、无圆角
- **中文字号收敛**:全中文大标题需要降一档,避免占掉正文和图片空间
- **图文底对齐**:左文右图 / 左图右文场景优先让正文块与图片底部对齐,同时避开页脚翻页组件
- **图片槽位绑定**:图片必须进入模板预留的 `data-image-slot`,常见主图按 21:9 或 16:10 生成
- **强校验**:用脚本拦住居中标题、实验版式、SVG 内写字、图片脱离槽位等问题

瑞士风校验命令:

```bash
node scripts/validate-swiss-deck.mjs path/to/index.html
```

## Codex 配图能力

在 Codex 环境中,完成 deck 初稿后可以主动询问用户是否需要生成配图。用户确认后,再询问图片类型或风格,常用类型包括:

- 人文纪实照片:富士 / 徕卡感的真实场景,增加人文表现力
- 信息图 / 流程图 / 对比图 / 系统关系图:用于解释无法用实拍照片说明的概念
- 截图美化 / 截图再设计:原始截图优先用内置背景资产做 CleanShot X 式背景画布适配;需要重构时再生成 UI 情景图
- 数据大字报 / 数据图表:把关键数字做成可直接插入 PPT 的视觉素材
- 多图拼贴:用于极宽图片槽位,避免把三张 16:9 图片硬塞进三列

生成图片时要遵守四个关键规则:

- 图片是 PPT 中的嵌入素材,不要自带页脚、页底、标题、角标、页码或装饰边框
- 图片语言跟随 deck 语言:中文 deck 的信息图用中文标签,英文 deck 用英文标签
- 图片比例必须先匹配落位:瑞士风主图常用 21:9,通用主图常用 16:9 / 16:10,截图再设计常用 16:10,多图网格统一高度
- 用户截图需要保真时,先读 `references/screenshot-framing.md`,用 `assets/screenshot-backgrounds/` 内置背景 + 程序化缩放/留边/对齐处理,不要默认重画截图内容

配图提示词见 [`references/image-prompts.md`](./references/image-prompts.md),截图适配见 [`references/screenshot-framing.md`](./references/screenshot-framing.md)。

## 封面生成

这个 Skill 也可以基于文章或 PPT 核心观点生成平台封面。典型规格:

- **公众号头图**:21:9,主标题优先,右侧或边缘保留视觉锚点
- **公众号分享卡**:1:1,与头图共用主题色、关键词和视觉元素
- **小红书封面 / 轮播**:3:4,大标题优先,多张时统一字号和视觉节奏
- **视频号 / 横版封面**:16:9,适合标题 + 副标题 + 单一视觉焦点

封面原则和 PPT 一样:只用少量关键词,视觉重心落在大标题上,不要把正文堆满。

## 示例请求

复制下面任意一条给 Agent,再附上你的文章、Markdown 或素材文件:

```text
帮我基于这篇文章生成一份 8 页左右的瑞士风 PPT,需要 3 张配图,图片比例跟模板槽位匹配。
```

```text
帮我把这个产品分析文档做成电子杂志风 PPT,重点突出观点和叙事节奏。
```

```text
基于这份 PPT 的主题,做两张封面:公众号 21:9 头图和 1:1 分享卡,视觉保持一致。
```

```text
把这些产品截图重新设计成统一的 16:10 PPT 配图,保留关键信息,不要画页脚和标题。
```

## 多主题 Demo

- [`examples/brand-themes-swiss.html`](examples/brand-themes-swiss.html) — Swiss 风格，6 主题 × 3 页
- [`examples/brand-themes.html`](examples/brand-themes.html) — 杂志风格，6 主题 × 3 页

## 目录结构

```
sika-ppt-skill/
├── SKILL.md              ← Skill 主文件:工作流、原则、常见错误
├── README.md             ← 本文件
├── assets/
│   ├── template.html         ← Style A 电子杂志风模板
│   ├── template-swiss.html   ← Style B 瑞士国际主义模板
│   └── screenshot-backgrounds/ ← 截图美化内置背景(WebP):按 Sika 红黄暖砂统一适配
├── scripts/
│   └── validate-swiss-deck.mjs ← 瑞士风版式校验器
└── references/
    ├── components.md     ← 组件手册(字体、色、网格、图标、callout、stat、pipeline)
    ├── layouts.md        ← 10 种页面布局骨架(可直接粘贴)
    ├── layouts-swiss.md  ← 22 种瑞士风锁定版式
    ├── swiss-layout-lock.md ← 瑞士风还原度和版式硬约束
    ├── themes.md         ← Sika 电子杂志固定配色
    ├── themes-swiss.md   ← Sika 瑞士风固定配色
    ├── derivative-variants.md ← 平台衍生版命名、包装和发布规则
    ├── theme-derivatives.md ← Theme 衍生版预设和选择规则
    ├── image-prompts.md  ← GPT-Image 2.0 / GPT-M 2.0 配图类型、比例和基础提示词
    ├── screenshot-framing.md ← CleanShot X 式截图适配语义
    └── checklist.md      ← 质量检查清单(P0 / P1 / P2 / P3 分级)
```

## Sika 配色系统

本仓库当前按 **Sika Corporate** 做全面适配,不再把任何非 Sika 通用主题作为推荐入口。两套模板都固定使用同一套品牌色,只是表达方式不同:

| 模板 | 固定配色 | 使用方式 |
|------|----------|----------|
| `assets/template.html` | Sika Red `#D8282F` + 暖黄纸底 `#fff8e6` + Sika Yellow `#F5B325` | 适合案例故事、项目复盘、观点型演讲,红色像标题墨色,黄色像企业手册纸张和现场标识。 |
| `assets/template-swiss.html` | Sika Red `#D8282F` + Sika Yellow `#F5B325` + 暖砂灰阶 | 适合数据、流程、产品、施工体系、质量/供应链内容,红色承担结论和 KPI,黄色承担品牌识别。 |

两个模板都内置 Sika 辅助元素: `.sika-brand-band`、`.sika-corner`、`.sika-badge`、`.sika-stripe`、`.slide.sika-yellow`。这些元素用于形成红黄工业识别,但不仿制或拉伸官方 logo。

**硬规则**:

- 不要把 deck 切换到非 Sika 色板；如果需要变化,只调整红/黄/暖砂灰的面积和层级。
- 不要在页面里手写新的 hex 值；颜色统一从 `references/themes.md` 和 `references/themes-swiss.md` 的 Sika 变量继承。
- 不要大面积使用高饱和黄承载正文；黄色用于品牌条、角标、徽章和章节识别。
- 不要仿制官方 logo；模板内的 Sika badge 是排版化识别元素。

### 支持的品牌 / 主题

本仓库默认以 Sika 品牌色板（Sika Red × Sika Yellow）作为视觉基线。当客户不是 Sika、或需要中性场景时，可切换到以下 6 套多主题：

| id | 名称 | 主色 | 适合场景 |
|---|---|---|---|
| `sika-yellow` | Sika Yellow | `#FCC500` | Sika 集团培训、产品发布 |
| `sika-red` | Sika Red | `#D82828` | Sika 战略汇报、风险议题 |
| `davco-amber` | Davco 琥珀黄 | `#F7B20B` | Davco 中国区家装汇报 |
| `davco-restrained` | Davco 收敛版 | `#E8A40A` | Davco 工程部内训 |
| `neutral-ink` | 中性墨黑 | `#1A1A1A` | 年度报告、跨品牌通用 |
| `neutral-paper` | 中性纸白 | `#2C2C2C` | 设计/文化/人文议题 |

切换：`?theme=davco-amber` URL 参数或左下角主题 chip。详见 `references/themes-brand.md`。

## 核心设计原则

1. **克制优于炫技** — WebGL 背景只在 hero 页透出
2. **结构优于装饰** — 信息靠字号 + 字体对比 + 网格留白,不用阴影和浮动卡片
3. **图片是第一公民** — 图片要对齐正文内容区,比例稳定,只裁底部,顶部和左右完整
4. **配图只做素材** — 生成图只保留核心照片 / 图表 / UI,不要把 PPT 页脚、标题和角标画进图片里
5. **节奏靠 hero 页** — hero / non-hero 交替,才不累眼睛
6. **低性能可退场** — 按 `B` 能切换到静态模式,动态效果不能成为阅读负担
7. **术语统一** — Skills 就是 Skills,不中英混译
8. **瑞士风必须守版式** — Style B 优先还原原始 22P 版式,不要为了"多样"发明不存在的页面

## Sika 视觉参考

- Sika Corporate 红黄识别：红色负责结论、风险、KPI 和章节强焦点；黄色负责品牌条、角标、徽章和现场标识。
- 建筑化学品 / 施工现场语义：暖砂灰、直角网格、编号、流程、材料质感优先服务 Sika 的工业可信度。
- Sika “Building Trust” 叙事：内容表达强调质量、可靠、工程、项目交付、可持续建造和长期信任。
- 瑞士网格只作为结构骨架；最终色彩必须回到 Sika Corporate。

## Roadmap

- 补充更多真实案例和可打开的 HTML deck 示例
- 扩展封面规格,覆盖更多内容平台
- 增加更多瑞士风版式校验规则
- 优化截图再设计和信息图生成工作流
- 整理 WorkBuddy 等平台上架版本
- 扩展更多 `sika-theme/*` 主题衍生预设,但继续限制任意自定义颜色

## FAQ

**可以导出 PPTX 吗?**
当前核心交付是 HTML。你可以用浏览器演示、截图或录屏。如果需要 PPTX,建议把 HTML 页面作为视觉稿再转换,但这不是当前主流程。

**为什么不允许自定义颜色?**
这个 Skill 的重点是稳定产出。自由选色很容易破坏整体风格,所以只允许从 `sika-theme/*` 预设里选；这些预设只改变红黄暖砂的面积、节奏、图片语义和组件侧重点,不新增任意 hex 色板。

**我能加自己的版式吗?**
可以。Style A 可以在 `references/layouts.md` 里扩展；Style B 更严格,需要同步更新 `template-swiss.html`、`layouts-swiss.md`、`swiss-layout-lock.md` 和校验器。

**Codex 配图是必须的吗?**
不是。没有配图也能生成 PPT。配图流程只在需要照片、信息图、UI 情景图或封面时使用。

**怎么更新到最新版?**
重新运行安装命令,或在本地 skill 目录执行 `git pull`。

## 贡献

Bug、排版问题、新布局需求——欢迎开 Issue 或 PR。改动请优先:

- 在 `template.html` 里补类,不要让 layouts.md 使用未定义的类
- 在 `template-swiss.html` 里补类时,同步更新 `layouts-swiss.md` 和 `swiss-layout-lock.md`
- 瑞士风新增规则后,同步更新 `scripts/validate-swiss-deck.mjs`
- 把踩过的坑写到 `checklist.md` 对应的 P0 / P1 / P2 / P3 级别
- Sika 配色调整必须先更新 `themes.md` / `themes-swiss.md` 的固定变量和使用边界

## License

AGPL-3.0 © 2026 Sika PPT Skill contributors
