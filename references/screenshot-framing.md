# 截图美化语义规则

用于把用户提供的产品截图、网页截图、代码截图、设计稿截图处理成符合模板比例的图片资产。目标是类似 CleanShot X 的“截图居中 + 背景填充 + 统一比例”,而不是默认让 GPT-M 2.0 重画截图。

## 优先级

1. **程序化适配优先**:截图内容、文字、UI 细节需要保真时,不要重画;创建目标比例画布,把原截图等比缩放后放入画布。
2. **GPT-M 2.0 只做重构**:只有原图过长、过窄、信息太乱、需要 UI 情景化或概念化表达时,才使用“截图再设计 / UI 情景图”。
3. **模板槽位先行**:先确定 slide 版式和图片槽位比例,再决定截图适配参数。

## 开始前询问

在主流程 Step 1 中,只要用户可能提供截图,就先问清楚:

- 截图在哪个文件夹?是否包含网页、App、代码、dashboard、设计稿或旧 PPT?
- 这批截图要**保真展示**、**统一美化**、**重新设计成 UI 情景图**,还是混合处理?
- 最终要放进哪些槽位:21:9 顶图、16:10 主图、4:3 侧图、1:1 方图、还是多图网格?
- 是否必须保留所有文字和数据?是否需要隐藏账号、头像、项目名等敏感信息?
- 构图希望居中、左上、右下,还是根据页面内容自动判断?

如果在 Claude Code 中,用 Ask Question / `ask_question` 做这些澄清;如果在 Codex 中,用普通对话询问,不要调用 Ask Question。

## 处理链路

1. **先匹配版式**:根据内容选择模板 layout,确定截图槽位尺寸和比例。
2. **再选处理方式**:
   - 要保真:程序化适配,不重画截图。
   - 要统一视觉但不改内容:程序化适配 + 主题背景。
   - 原图不可用或需要解释概念:再走 GPT-M 2.0 截图再设计。
3. **再选择背景**:优先使用内置背景资产,不应该每张截图临时生成一种风格。
4. **最后合成截图**:创建目标比例画布,背景 cover 铺满,截图等比缩放后按 `padding` 和 `alignment` 放入。

默认不要裁掉截图内容。只有截图已经按目标槽位重新生成,或者用户明确允许裁切时,才使用 cover 裁切。

## 语义参数

每次处理截图前,先确定这 7 个参数:

| 参数 | 可选值 | 判断方式 |
|---|---|---|
| `ratio` | `21:9` / `16:10` / `16:9` / `4:3` / `1:1` | 跟随模板图片槽位,不要跟随原截图比例 |
| `background` | `plain` / `gradient` / `wallpaper` / `blurred` / `grid` / `paper` | 跟随当前 PPT 风格和主题 |
| `padding` | `compact` / `standard` / `spacious` | 普通截图 standard;文字密集或高截图 spacious;小图组 compact |
| `inset` | `none` / `subtle` / `balanced` | 截图需要从背景中浮出来时用 balanced;瑞士风多用 none/subtle |
| `shadow` | `none` / `soft` / `editorial` | Style A 可 soft/editorial;Style B 默认 none |
| `corners` | `square` / `small` / `medium` | Style B square;Style A small/medium |
| `alignment` | `center` / `top-left` / `top-right` / `bottom-left` / `bottom-right` | 跟随页面构图,不是永远居中 |

## 风格映射

### Sika 截图背景口径

本仓库当前按 Sika Corporate 统一截图背景。旧的 WebP 背景资产可以继续作为纹理底图使用,但最终合成必须叠加 Sika Red / Sika Yellow / 暖砂灰的统一视觉,不要让旧主题色成为页面主视觉。

| 用途 | 推荐资产 | Sika 处理方式 |
|---|---|---|
| Style A 电子杂志截图 | `assets/screenshot-backgrounds/style-a/kraft-paper.webp` 或 `dune.webp` | 叠加 `#fff8e6` 暖黄纸底,用 `#D8282F` 做 1px 顶线或角标。 |
| Style B 瑞士截图 | `assets/screenshot-backgrounds/style-b/lemon-grid.webp` 或 `safety-orange-halftone.webp` | 降低原图饱和度,叠加暖砂灰,只保留 Sika Red 小面积线条/编号。 |
| 需要更强品牌识别 | 任意安静四角背景 | 额外加 `.sika-brand-band` 同语义的顶部黄条 + 右侧红段。 |

内置背景都是 1920×1080 级别的 16:9 WebP。程序化合成时,先把背景 cover 到目标画布,再裁成 `21:9` / `16:10` / `4:3` / `1:1` 等截图槽位。背景必须四角安静,因为截图可能居中、左上、右下或被裁成不同尺寸。

## 截图类型决策

| 原始素材 | 推荐处理 |
|---|---|
| 普通网页 / App / 桌面截图 | 程序化适配到目标比例 |
| 产品 UI 细节很重要 | 程序化适配,使用 `fit-contain`,不重画 |
| 长网页截图 | 截关键区域或拆成 2-3 张同尺寸面板 |
| 极窄 / 极高截图 | 先尝试 `spacious + side alignment`;仍太小时再重构 |
| 代码截图 | Style A 用纸感背景;Style B 用浅网格背景;文字必须可读 |
| 概念解释用的 UI 情景图 | 可以 GPT-M 2.0 重新设计 |

## 生成背景图提示词

只有需要新增背景资产时才使用本节。常规截图美化不要实时生成背景,直接使用上方内置资产。

### Style A 背景

```text
16:9 crop-safe screenshot background for a Sika editorial magazine PPT system. Warm Sika yellow paper texture (#fff8e6), subtle Sika Red hairline accents (#D8282F), fine film grain, low contrast, quiet center and quiet corners, no text, no logo, no objects, no border, no focal subject. Suitable for cropping to 21:9, 16:10, 4:3, or 1:1.
```

### Style B 背景

```text
16:9 crop-safe screenshot background for a Sika Swiss International Style PPT system. Warm off-white base (#fff8e6), ultra-subtle 16-column grid and sparse dot matrix, Sika Red (#D8282F) only as very low-opacity thin lines or tiny dots, Sika Yellow (#F5B325) only as a small brand band cue, no large bright color blocks. Quiet center and quiet corners, no text, no logo, no objects, no border, no focal subject. Suitable for cropping to 21:9, 16:10, 4:3, or 1:1.
```
