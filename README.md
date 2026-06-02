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

- **Sika Narrative · 叙事模板**。以 Sika Red 为标题墨色、低饱和 Sika Yellow 为纸张底色,适合项目故事、案例复盘、观点表达。
- **Sika Precision · 精准网格**。保留网格、直角、发丝线和大字号对比,固定使用 Sika Corporate 红黄暖砂配色,适合事实、产品、数据、施工流程和方法论表达。

> 由 [Leev1s](https://github.com/Leev1s) 维护并发布到 [Leev1s/html-ppt](https://github.com/Leev1s/html-ppt)，当前版本面向 Sika Corporate 视觉体系做专项适配。

**Sika Narrative · 叙事模板**:红色标题墨色、暖黄纸底、适合案例故事。

**Sika Precision · 精准网格模板**:红色结论焦点、黄色品牌背景/条带,适合数据流程。

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
帮我基于这篇文章做一份 Sika Precision PPT,控制在 7 页左右,需要 2-3 张配图。
```

也可以试这些请求:

```text
帮我把这份 Markdown 做成 Sika Narrative 演讲 PPT。
基于这份 PPT 的核心观点,生成一张公众号 21:9 头图。
把这张产品截图重新设计成适合 PPT 的 16:10 配图。
```

## 效果

- 🖋 **双视觉系统**:Sika Narrative 负责叙事,Sika Precision 负责事实表达
- 📐 **横向左右翻页**:键盘 ← → / 滚轮 / 触屏滑动 / 底部圆点 / ESC 索引
- 🧩 **Sika Narrative 10 种布局**:封面、章节、数据大字报、图文、图片网格、Pipeline、对比等
- 🧱 **Sika Precision 22 种锁定版式**:Cover、Statement、KPI Tower、Loop Diagram、Duo Compare、Image Hero、Closing Manifesto 等
- 🎨 **Sika 固定配色**:两套模板均固定为 Sika Red + Sika Yellow + 暖砂灰阶,不再推荐非 Sika 色板
- 🖼 **Codex 可选配图流程**:可用 GPT-Image 2.0 / GPT-M 2.0 生成纪实照片、信息图、流程图、系统关系图、UI 情景图,并按模板比例插入
- 📰 **多平台封面**:可用同一套视觉规则生成公众号 21:9、公众号分享卡 1:1、小红书 3:4、视频号横版等封面
- 📴 **低性能静态模式**:按 `B` 可关闭 WebGL / canvas 动画,让动态内容退回静态背景
- 📄 **单文件 HTML**:不需要构建、不需要服务器,浏览器直接打开

## 适合 / 不适合

**✅ 合适**:线下分享 / 行业内部讲话 / 私享会 / Sika 项目发布 / 渠道培训 / 带强烈个人风格的演讲

**❌ 不合适**:大段表格数据 / 培训课件(信息密度不够)/ 需要多人协作编辑(静态 HTML)

## 常见使用场景

| 任务 | 推荐方式 |
|------|---------|
| 长文章变演讲 PPT | 先抽核心观点,再按 6-10 页节奏生成 deck |
| 方法论 / 产品分析 | 用 Sika Precision,优先使用锁定版式和 21:9 主图 |
| 项目故事 / 观点表达 | 用 Sika Narrative,保留更强叙事感 |
| PPT 配图 | 在 Codex 中用 GPT-Image 2.0 / GPT-M 2.0 生成照片、信息图、流程图、UI 情景图 |
| 多平台封面 | 从同一份内容生成公众号 21:9、1:1 分享卡、小红书 3:4、视频号横版封面 |
| 截图统一风格 | 把原始截图重新生成到模板需要的比例,再插入 PPT |

## 为什么是 HTML PPT

- **更适合 Agent 生成和修改**:HTML / CSS 是文本,Agent 能直接读、改、验证。
- **表现力比 Markdown 更高**:可以做精细排版、空间定位、动画、交互和响应式封面。
- **交付更轻**:单文件 HTML 可以直接打开、演示、发送、截图。
- **更容易做质量控制**:Sika Precision 可以用脚本校验版式、图片槽位、标题对齐和危险 SVG。
- **更适合 Sika 视觉内容链路**:同一套 Sika Corporate 配色能覆盖 PPT、配图、封面和截图再设计。

## 平台支持

| 平台 | 状态 | 说明 |
|------|------|------|
| Claude Code | 支持 | 原生 Skill 工作流,适合生成和迭代 HTML deck |
| Codex | 支持 | 适合生成 PPT、调用图片生成能力、做浏览器视觉检查 |
| Cursor / 其他本地 Agent | 可用 | 需要能读写文件并执行 shell 命令 |
| WorkBuddy | 适配中 | 单独整理上架版本,去掉平台不需要的渠道差异 |
| 普通 Chatbot | 不推荐 | 没有文件系统和浏览器预览时,很难稳定生成完整 deck |

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
> 4. 告诉我安装好了,之后我说"做一份 Sika 风格 PPT"或"做一份 Sika Precision PPT"之类的话就会触发这个 skill

把这段话复制粘贴给 Claude Code / Cursor / 任何有 shell 权限的 AI Agent,它会自动完成安装。

### 方式三:手动命令行

```bash
git clone https://github.com/Leev1s/html-ppt.git ~/.claude/skills/sika-ppt-skill
```

### 触发方式

装好后,Claude Code 会在对话里自动发现并调用这个 skill。触发关键词:

- "帮我做一份 Sika 风格 PPT"
- "帮我做一份 Sika Precision PPT"
- "生成一个 Sika horizontal swipe deck"
- "Sika editorial magazine style presentation"
- "Sika Corporate 配色演讲 slides"
- "基于这篇文章做一张公众号 21:9 封面"
- "基于这份 PPT 生成一张 1:1 分享卡"

## 使用流程

Skill 本身是结构化工作流,Agent 会逐步引导:

1. **选择风格** — Sika Narrative,或 Sika Precision 网格
2. **需求澄清** — 7 问清单:风格、受众、时长、素材、图片/截图需求、主题色、硬约束
3. **拷贝模板** — Sika Narrative 用 `assets/template.html`,Sika Precision 用 `assets/template-swiss.html`
4. **填充内容** — 先做主题节奏表,再从对应 layout 骨架里挑、粘、改文案
5. **可选配图** — 在 Codex 中询问是否用 GPT-Image 2.0 / GPT-M 2.0 生成配图,再按页面比例插入
6. **自检** — 对照 `references/checklist.md`,P0 级问题必须全过；Sika Precision还要运行版式校验器
7. **预览** — 浏览器直接打开
8. **迭代** — inline style 改字号/高度/间距

详细说明见 [`SKILL.md`](./SKILL.md)。

## Sika Precision

Sika Precision是这次新增的结构化主题。它不是"换一套 CSS",而是一套更严格的版式系统。

- **22 个具名版式**:正文页只能从 `S01` 到 `S22` 中选择,不能临时发明页面结构
- **Sika 固定主题色**:Sika Red、Sika Yellow、暖砂灰阶贯穿所有页面
- **网格锁定**:16 列 grid、直角色块、1px 发丝线、无阴影、无渐变、无圆角
- **中文字号收敛**:全中文大标题需要降一档,避免占掉正文和图片空间
- **图文底对齐**:左文右图 / 左图右文场景优先让正文块与图片底部对齐,同时避开页脚翻页组件
- **图片槽位绑定**:图片必须进入模板预留的 `data-image-slot`,常见主图按 21:9 或 16:10 生成
- **强校验**:用脚本拦住居中标题、实验版式、SVG 内写字、图片脱离槽位等问题

Sika Precision校验命令:

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
- 图片比例必须先匹配落位:Sika Precision主图常用 21:9,通用主图常用 16:9 / 16:10,截图再设计常用 16:10,多图网格统一高度
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
帮我基于这篇文章生成一份 8 页左右的Sika Precision PPT,需要 3 张配图,图片比例跟模板槽位匹配。
```

```text
帮我把这个产品分析文档做成Sika Narrative PPT,重点突出观点和叙事节奏。
```

```text
基于这份 PPT 的主题,做两张封面:公众号 21:9 头图和 1:1 分享卡,视觉保持一致。
```

```text
把这些产品截图重新设计成统一的 16:10 PPT 配图,保留关键信息,不要画页脚和标题。
```

## 目录结构

```
html-ppt/
├── SKILL.md              ← Skill 主文件:工作流、原则、常见错误
├── README.md             ← 本文件
├── assets/
│   ├── template.html         ← Sika Narrative模板
│   ├── template-swiss.html   ← Sika Precision 网格模板
│   └── screenshot-backgrounds/ ← 截图美化内置背景(WebP):按 Sika 红黄暖砂统一适配
├── scripts/
│   └── validate-swiss-deck.mjs ← Sika Precision版式校验器
└── references/
    ├── components.md     ← 组件手册(字体、色、网格、图标、callout、stat、pipeline)
    ├── layouts.md        ← 10 种页面布局骨架(可直接粘贴)
    ├── layouts-swiss.md  ← 22 种Sika Precision锁定版式
    ├── swiss-layout-lock.md ← Sika Precision还原度和版式硬约束
    ├── themes.md         ← Sika Narrative固定配色
    ├── themes-swiss.md   ← Sika Precision固定配色
    ├── sika-yellow-templates.md ← 黄底红黄反转页面模板
    ├── sika-derived-templates.md ← Sika 衍生页面模板
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

两个模板都内置 Sika 辅助元素: `.sika-brand-band`、`.sika-corner`、`.sika-badge`、`.sika-stripe`、`.slide.sika-yellow`。这些元素用于形成红黄工业识别,但不仿制或拉伸官方 logo。需要黄做背景时参考 `references/sika-yellow-templates.md`;需要更多衍生版时参考 `references/sika-derived-templates.md`。

**硬规则**:

- 不要把 deck 切换到非 Sika 色板；如果需要变化,只调整红/黄/暖砂灰的面积和层级。
- 不要在页面里手写新的 hex 值；颜色统一从 `references/themes.md` 和 `references/themes-swiss.md` 的 Sika 变量继承。
- 不要大面积使用高饱和黄承载正文；黄色用于品牌条、角标、徽章和章节识别。
- 不要仿制官方 logo；模板内的 Sika badge 是排版化识别元素。

## 核心设计原则

1. **克制优于炫技** — WebGL 背景只在 hero 页透出
2. **结构优于装饰** — 信息靠字号 + 字体对比 + 网格留白,不用阴影和浮动卡片
3. **图片是第一公民** — 图片要对齐正文内容区,比例稳定,只裁底部,顶部和左右完整
4. **配图只做素材** — 生成图只保留核心照片 / 图表 / UI,不要把 PPT 页脚、标题和角标画进图片里
5. **节奏靠 hero 页** — hero / non-hero 交替,才不累眼睛
6. **低性能可退场** — 按 `B` 能切换到静态模式,动态效果不能成为阅读负担
7. **术语统一** — Skills 就是 Skills,不中英混译
8. **Sika Precision必须守版式** — Sika Precision 优先还原登记的 22P 版式,不要为了"多样"发明不存在的页面

## Sika 视觉参考

- Sika Corporate 红黄识别：红色负责结论、风险、KPI 和章节强焦点；黄色负责品牌条、角标、徽章和现场标识。
- 建筑化学品 / 施工现场语义：暖砂灰、直角网格、编号、流程、材料质感优先服务 Sika 的工业可信度。
- Sika “Building Trust” 叙事：内容表达强调质量、可靠、工程、项目交付、可持续建造和长期信任。
- Sika Precision 网格只作为结构骨架；最终色彩必须回到 Sika Corporate。

## Roadmap

- 补充更多真实案例和可打开的 HTML deck 示例
- 扩展封面规格,覆盖更多内容平台
- 增加更多Sika Precision版式校验规则
- 优化截图再设计和信息图生成工作流
- 整理 WorkBuddy 等平台上架版本
- 增加更多主题包,但继续限制自定义颜色

## FAQ

**可以导出 PPTX 吗?**
当前核心交付是 HTML。你可以用浏览器演示、截图或录屏。如果需要 PPTX,建议把 HTML 页面作为视觉稿再转换,但这不是当前主流程。

**为什么不允许自定义颜色?**
这个 Skill 的重点是稳定产出。自由选色很容易破坏整体风格,所以只允许从预设主题里选。

**我能加自己的版式吗?**
可以。Sika Narrative 可以在 `references/layouts.md` 里扩展；Sika Precision 更严格,需要同步更新 `template-swiss.html`、`layouts-swiss.md`、`swiss-layout-lock.md` 和校验器。

**Codex 配图是必须的吗?**
不是。没有配图也能生成 PPT。配图流程只在需要照片、信息图、UI 情景图或封面时使用。

**怎么更新到最新版?**
重新运行安装命令,或在本地 skill 目录执行 `git pull`。

## 贡献

Bug、排版问题、新布局需求——欢迎开 Issue 或 PR。改动请优先:

- 在 `template.html` 里补类,不要让 layouts.md 使用未定义的类
- 在 `template-swiss.html` 里补类时,同步更新 `layouts-swiss.md` 和 `swiss-layout-lock.md`
- Sika Precision新增规则后,同步更新 `scripts/validate-swiss-deck.mjs`
- 把踩过的坑写到 `checklist.md` 对应的 P0 / P1 / P2 / P3 级别
- Sika 配色调整必须先更新 `themes.md` / `themes-swiss.md` 的固定变量和使用边界

## License

AGPL-3.0 © 2026 [Leev1s](https://github.com/Leev1s)
