# Sika PPT Skill · Web Decks / Images / Covers

![GitHub stars](https://img.shields.io/github/stars/Leev1s/html-ppt?style=flat-square)
![License](https://img.shields.io/github/license/Leev1s/html-ppt?style=flat-square)
![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)
![HTML Deck](https://img.shields.io/badge/HTML-Deck-0A7CFF?style=flat-square)
![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-6B5B95?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)
![Sika Theme](https://img.shields.io/badge/Sika-Corporate%20Theme-D8282F?style=flat-square)

An agent skill for **multi-theme** decks in Claude Code, Codex, and similar coding-agent environments. It generates **single-file HTML horizontal-swipe decks**, deck visuals, and social cover pages with 6 swappable themes (sika-yellow / sika-red / davco-amber / davco-restrained / neutral-ink / neutral-paper).

It ships with two Sika-adapted visual systems:

- **Style A: Sika editorial magazine**. Sika Red works as the headline ink, while a low-saturation Sika Yellow paper base supports project stories, case reviews, and point-of-view talks.
- **Style B: Sika Swiss International**. Grid-first, sharp rectangles, hairline rules, and extreme type contrast, locked to Sika Corporate red/yellow/warm-sand colors for facts, products, construction workflows, and frameworks.

> This version supports multi-theme switching for Sika / Davco / Neutral brand families.

## 30-second start

```bash
npx skills add https://github.com/Leev1s/html-ppt --skill sika-ppt-skill
```

Or paste this to an AI agent with shell access:

```text
Install sika-ppt-skill for me. Clone https://github.com/Leev1s/html-ppt into ~/.claude/skills/sika-ppt-skill, then verify that SKILL.md, assets/, and references/ exist.
```

If you already installed it, update with:

```text
Update sika-ppt-skill for me. Go to ~/.claude/skills/sika-ppt-skill, run git pull, then tell me the latest commit.
```

Then ask your agent:

```text
Create a Sika Swiss-style deck from this article, around 7 slides, with 2-3 generated visuals.
```

Other useful prompts:

```text
Turn this Markdown file into a Sika editorial magazine-style presentation.
Create a 21:9 social cover from the core idea of this deck.
Redesign this product screenshot as a 16:10 slide visual.
```

## What you get

- 🖋 **Two Sika visual systems**: Sika editorial storytelling for Style A, factual Sika Swiss structure for Style B
- 📐 **Horizontal swipe navigation**: ← → arrows / scroll wheel / touch swipe / bottom dots / ESC for index
- 🧩 **Style A 10 layouts**: cover, divider, big numbers, image/text, image grid, pipeline, comparison, and more
- 🧱 **Style B 22 locked layouts**: Cover, Statement, KPI Tower, Loop Diagram, Duo Compare, Image Hero, Closing Manifesto, and more
- 🎨 **Fixed Sika palette**: both templates use Sika Red + Sika Yellow + warm-sand neutrals; non-Sika palettes are no longer recommended
- 🖼 **Optional Codex image flow**: generate documentary photos, infographics, flow diagrams, system maps, and UI scenes with GPT-Image 2.0 / GPT-M 2.0, then insert them at template-safe ratios
- 📰 **Social covers**: generate 21:9 WeChat cover images, 1:1 share cards, 3:4 Xiaohongshu covers, video thumbnails, and related variants
- 📴 **Low-power static mode**: press `B` to turn WebGL / canvas animation into static visuals
- 📄 **Single HTML file** — no build, no server, open directly in the browser

## Fits / Doesn't fit

**✅ Fits**: offline talks, industry keynotes, private salons, AI product launches, demo day, presentations with strong personal voice

**❌ Doesn't fit**: data-heavy tables, training decks (density too low), multi-user collaborative editing (static HTML)

## Common use cases

| Task | Recommended flow |
|------|------------------|
| Long article to talk deck | Extract the core argument, then build a 6-10 slide rhythm |
| Framework / product analysis | Use Sika Style B Swiss with locked layouts and 21:9 hero visuals |
| Project story / opinion piece | Use Sika Style A editorial magazine for stronger narrative rhythm |
| Deck visuals | In Codex, generate photos, infographics, flow diagrams, system maps, or UI scenes |
| Social covers | Generate 21:9 main covers, 1:1 share cards, 3:4 vertical covers, and video thumbnails from the same idea |
| Screenshot normalization | Redesign raw screenshots into template-safe ratios before inserting them into slides |

## Why HTML decks

- **Agent-native editing**: HTML / CSS is plain text, so agents can read, edit, and validate it directly.
- **Higher visual density than Markdown**: precise layout, positioning, motion, interactivity, and cover formats.
- **Lightweight delivery**: one HTML file can be opened, presented, sent, screenshotted, or recorded.
- **Better quality gates**: the Swiss validator can catch layout drift, unsafe image placement, centered body titles, and SVG text traps.
- **One Sika visual system across outputs**: decks, generated visuals, covers, and screenshot redesigns share the same Sika Corporate palette.

## Platform support

| Platform | Status | Notes |
|----------|--------|-------|
| Claude Code | Supported | Native Skill workflow for creating and iterating HTML decks |
| Codex | Supported | Good for deck generation, image generation, and browser-based visual QA |
| Cursor / other local agents | Works | Requires filesystem access and shell execution |
| WorkBuddy | In adaptation | Marketplace-ready version is being prepared separately |
| Plain chatbot | Not recommended | Without filesystem and browser preview, full deck generation is hard to stabilize |


## Derivative variants

All platform derivatives use **Sika PPT Skill** as the display name and `sika-ppt-skill` as the skill name. They share the same Sika Corporate templates, references, and validation rules; only packaging, trigger wording, and install notes differ. See [`references/derivative-variants.md`](./references/derivative-variants.md) for the complete rules.

| Variant | Audience | What changes |
|---------|----------|--------------|
| `sika-ppt-skill/core` | Any local agent with filesystem access | Full templates, references, validator, and image workflow |
| `sika-ppt-skill/codex` | Codex environments | Stronger browser QA, screenshot checks, and optional GPT image prompts |
| `sika-ppt-skill/claude` | Claude Code users | Keeps skill-install and trigger examples without changing the canonical name |
| `sika-ppt-skill/workbuddy` | WorkBuddy / marketplace packaging | Shorter onboarding, no local-clone assumptions, fewer channel-specific notes |
| `sika-ppt-skill/docs-lite` | Teams that only need governance rules | Publishes layout locks, palette rules, checklists, and prompt guidance only |


## Theme derivatives

Theme derivatives are not arbitrary new palettes. They stay inside **Sika Red / Sika Yellow / warm-sand neutrals** while changing color area, rhythm, image semantics, and component emphasis. See [`references/theme-derivatives.md`](./references/theme-derivatives.md) for the full rules.

| Theme preset | Best for | Visual emphasis |
|--------------|----------|-----------------|
| `sika-theme/corporate-core` | General company decks, executive summaries | Default red/yellow/warm-sand balance |
| `sika-theme/red-command` | Strategy, risk, crisis response, decisive recommendations | Stronger red statements, KPIs, and conclusion pages |
| `sika-theme/yellow-signal` | Training, channels, jobsites, wayfinding | Yellow signage, numbering, transitions, and process cues |
| `sika-theme/sand-technical` | Technical manuals, product specs, methods | Warm-sand body pages, hairlines, detail notes, tables |
| `sika-theme/blueprint-grid` | Engineering systems, QA, architecture | Grids, process diagrams, maps, system relationships |
| `sika-theme/material-lab` | Materials, testing, performance proof | Material close-ups, specimen labels, evidence cards |
| `sika-theme/sustainability-field` | ESG, sustainable construction, long-term trust | Light warm-paper rhythm + documentary images; no green palette |
| `sika-theme/supply-chain-map` | Factories, warehouses, logistics, regional coverage | Map components, routes, nodes, milestones |
| `sika-theme/product-proof` | Launches, benchmarks, demos | Evidence visuals, screenshot redesigns, KPI proof blocks |
| `sika-theme/event-keynote` | Keynotes, town halls, large-room talks | Big type, high contrast, less body copy, strong open/close loop |
| `sika-theme/report-editorial` | Annual reports, quarterly reports, case books | Magazine chapters, pull quotes, image-led narrative |
| `sika-theme/partner-workshop` | Customer workshops, co-creation, sales enablement | Exercises, comparisons, action checklists |

## Install

### Option 1: One-line install (recommended)

```bash
npx skills add https://github.com/Leev1s/html-ppt --skill sika-ppt-skill
```

### Option 2: Paste this to an AI

> Install the `sika-ppt-skill` Claude Code skill for me. Steps:
>
> 1. Make sure `~/.claude/skills/` exists (create if not)
> 2. Run `git clone https://github.com/Leev1s/html-ppt.git ~/.claude/skills/sika-ppt-skill`
> 3. Verify: `ls ~/.claude/skills/sika-ppt-skill/` should show `SKILL.md`, `assets/`, `references/`
> 4. Tell me when done. Later, saying things like "make me a Sika-style deck" or "make me a Sika Swiss deck" will trigger this skill.

Paste the block above into Claude Code / Cursor / any AI agent with shell access and it handles the install.

### Option 3: Manual CLI

```bash
git clone https://github.com/Leev1s/html-ppt.git ~/.claude/skills/sika-ppt-skill
```

### How to trigger it

Once installed, Claude Code auto-detects the skill. Trigger phrases:

- "Make me a Sika-style deck"
- "Make me a Sika Swiss-style deck"
- "Generate a Sika horizontal swipe deck"
- "Sika editorial magazine style presentation"
- "Sika Corporate slides for my talk"
- "Create a 21:9 WeChat cover from this article"
- "Create a 1:1 share card from this deck"

## Workflow

The skill is a structured workflow; the agent walks you through each step:

1. **Choose style** — Style A editorial magazine, or Style B Swiss International
2. **Clarify intent** — 7-question checklist: style, audience, duration, source material, images/screenshots, theme, hard constraints
3. **Copy template** — Style A uses `assets/template.html`; Style B uses `assets/template-swiss.html`
4. **Fill content** — create a rhythm plan, then choose and adapt the matching layout skeletons
5. **Optional image generation** — in Codex, ask whether to use GPT-Image 2.0 / GPT-M 2.0 images, then insert them at page-appropriate ratios
6. **Self-check** — match against `references/checklist.md`; P0 issues must all pass; Swiss decks must also pass the layout validator
7. **Preview** — open the HTML in a browser
8. **Iterate** — use inline styles to tune font size, height, spacing

Full spec in [`SKILL.md`](./SKILL.md).

## Style B Swiss

The Swiss theme is a strict layout system, not just a CSS skin.

- **22 named layouts**: body slides must use `S01` to `S22`; do not invent new structures
- **Fixed Sika theme**: Sika Red, Sika Yellow, and warm-sand neutrals across all pages
- **Grid lock**: 16-column grid, sharp rectangles, 1px hairlines, no shadows, no gradients, no rounded cards
- **Chinese title scaling**: all-Chinese headlines should be one step smaller to preserve space for content and images
- **Image/text bottom alignment**: text and image blocks should align at the bottom in left/right image layouts, while staying clear of pagination controls
- **Image slots**: images must sit in template-defined `data-image-slot` regions, often generated at 21:9 or 16:10
- **Hard validation**: the validator catches centered body titles, experimental layouts, visible SVG text, and images placed outside slots

Swiss validation:

```bash
node scripts/validate-swiss-deck.mjs path/to/index.html
```

## Codex Image Flow

In Codex, after the first deck draft is ready, the agent can ask whether the user wants generated visuals. Once confirmed, choose an image type or style. Common types include:

- Documentary photos: Fuji / Leica-like real-world scenes that add human texture
- Infographics / flow diagrams / comparison charts / system maps: for concepts that cannot be explained well with photos
- Screenshot framing / screenshot redesigns: preserve raw screenshots with bundled background assets and a CleanShot X-style canvas first; use UI scene generation only when the screenshot needs reconstruction
- Data posters / charts: turn key numbers into insert-ready visual assets
- Multi-image compositions: useful for ultra-wide slots where three unrelated 16:9 images would break the grid

Generated images must follow four core rules:

- Treat the image as an embedded asset, not a standalone slide: no footer, page bottom, title, page number, corner mark, signature, or decorative border
- Match the deck language: Chinese decks use Chinese labels inside infographics, English decks use English labels
- Match the slot ratio before generation: 21:9 for many Swiss hero slots, 16:9 / 16:10 for common main visuals, 16:10 for UI scenes, fixed equal heights for image grids
- When a raw screenshot must stay faithful, read `references/screenshot-framing.md` first and use bundled `assets/screenshot-backgrounds/` backgrounds plus programmatic scaling, padding, and alignment instead of redrawing the screenshot by default

Image prompts live in [`references/image-prompts.md`](./references/image-prompts.md). Screenshot framing lives in [`references/screenshot-framing.md`](./references/screenshot-framing.md).

## Cover Generation

The skill can also turn an article or deck idea into platform covers:

- **WeChat main cover**: 21:9, headline-first, with one visual anchor
- **WeChat share card**: 1:1, visually paired with the 21:9 cover
- **Xiaohongshu cover / carousel**: 3:4, large title, consistent type scale across a batch
- **Video thumbnail**: 16:9, title + subtitle + one focal visual

The same rule applies: use a few strong keywords, keep the title as the visual center, and do not fill the canvas with body copy.

## Example prompts

Copy any of these prompts into your agent, then attach your article, Markdown file, or image assets:

```text
Create an 8-slide Swiss-style deck from this article, with 3 generated visuals matched to the template image slots.
```

```text
Turn this product analysis document into an editorial magazine-style deck with a strong narrative rhythm.
```

```text
From this deck's core idea, create two covers: a 21:9 main cover and a visually paired 1:1 share card.
```

```text
Redesign these product screenshots into consistent 16:10 slide visuals. Preserve key UI information; do not add slide titles or footers inside the images.
```

## Directory

```
sika-ppt-skill/
├── SKILL.md              ← main skill file: workflow, principles, common mistakes
├── README.md             ← Chinese README
├── README.en.md          ← this file
├── assets/
│   ├── template.html         ← Style A editorial magazine template
│   ├── template-swiss.html   ← Style B Swiss template
│   └── screenshot-backgrounds/ ← bundled WebP screenshot backgrounds: 5 style-a / 4 style-b
├── scripts/
│   └── validate-swiss-deck.mjs ← Swiss layout validator
└── references/
    ├── components.md     ← component catalog (type, color, grid, icons, callout, stat, pipeline)
    ├── layouts.md        ← 10 layout skeletons (paste-ready)
    ├── layouts-swiss.md  ← 22 locked Swiss layouts
    ├── swiss-layout-lock.md ← Swiss fidelity and layout hard rules
    ├── themes.md         ← fixed Sika editorial palette
    ├── themes-swiss.md   ← fixed Sika Swiss palette
    ├── derivative-variants.md ← platform derivative naming, packaging, and release rules
    ├── theme-derivatives.md ← theme derivative presets and selection rules
    ├── image-prompts.md  ← GPT-Image 2.0 / GPT-M 2.0 image types, ratios, and base prompts
    ├── screenshot-framing.md ← CleanShot X-style screenshot framing semantics
    └── checklist.md      ← quality checklist (P0 / P1 / P2 / P3 tiers)
```

## Sika color system

This repository is now fully adapted for **Sika Corporate** decks. Non-Sika generic palettes are no longer the recommended entry point. Both templates use the same brand palette with different layout language:

| Template | Fixed palette | Usage |
|----------|---------------|-------|
| `assets/template.html` | Sika Red `#D8282F` + warm yellow paper `#fff8e6` + Sika Yellow `#F5B325` | For case storytelling, project reviews, and narrative talks. Red behaves like headline ink; yellow behaves like corporate paper and site signage. |
| `assets/template-swiss.html` | Sika Red `#D8282F` + Sika Yellow `#F5B325` + warm-sand neutrals | For data, processes, products, construction systems, quality, and supply-chain content. Red carries conclusions/KPIs; yellow carries brand recognition. |

Both templates include Sika helper elements: `.sika-brand-band`, `.sika-corner`, `.sika-badge`, `.sika-stripe`, and `.slide.sika-yellow`. They create a red/yellow industrial identity without copying or stretching the official logo.

**Hard rules**:

- Do not switch a deck to a non-Sika palette. If variety is needed, adjust the area and hierarchy of red/yellow/warm neutrals.
- Do not hand-code new hex values inside slides; inherit colors from `references/themes.md` and `references/themes-swiss.md`.
- Do not use high-saturation yellow as a long-body text background; reserve it for bands, corners, badges, and section identity.
- Do not redraw or distort the official logo; the Sika badge in the templates is a typographic identifier, not a trademark asset.

## Core design principles

1. **Restraint over flash** — WebGL backgrounds only bleed through on hero pages
2. **Structure over decoration** — information hierarchy via type size + typeface + grid whitespace, not shadows or floating cards
3. **Images are first-class citizens** — align them with the body content area, keep ratios stable, crop only from the bottom, and preserve top/sides
4. **Generated visuals are assets** — keep only the core photo / chart / UI; do not render slide titles, footers, or corner marks inside the image
5. **Rhythm lives on hero pages** — hero / non-hero alternation keeps the eye from fatiguing
6. **Dynamic effects must be optional** — `B` toggles static mode so animation never becomes a reading burden
7. **Terms stay consistent** — Skills is Skills; no mix-and-match translations
8. **Swiss layouts stay locked** — Style B should restore and reuse the original 22-page layout system instead of inventing unrelated pages

## Sika visual references

- Sika Corporate red/yellow identity: red carries conclusions, risk, KPIs, and section focus; yellow carries bands, corners, badges, and site-signage cues.
- Construction chemistry / jobsite semantics: warm-sand neutrals, sharp grids, numbering, process diagrams, and material texture should support Sika's industrial credibility.
- Sika “Building Trust” narrative: language should emphasize quality, reliability, engineering, delivery, sustainable construction, and long-term trust.
- Swiss grids are the structural backbone; final color must return to Sika Corporate.

## Roadmap

- Add more real-world examples and openable HTML deck demos
- Expand cover formats for more publishing platforms
- Add more Swiss layout validation rules
- Improve screenshot redesign and infographic generation workflows
- Prepare marketplace-specific variants such as WorkBuddy
- Expand more `sika-theme/*` theme derivative presets while keeping arbitrary custom colors restricted

## FAQ

**Can it export to PPTX?**
The main output is HTML. You can present it in a browser, screenshot it, or record it. PPTX conversion can be done as a separate workflow, but it is not the core path today.

**Why are custom colors not allowed?**
The skill is designed for stable Sika visual output. Arbitrary colors often break the system, so decks must choose from approved `sika-theme/*` presets. These presets change the area, rhythm, image semantics, and component emphasis of red/yellow/warm neutrals without adding arbitrary hex palettes.

**Can I add my own layout?**
Yes. Style A layouts can be extended in `references/layouts.md`. Style B is stricter: update `template-swiss.html`, `layouts-swiss.md`, `swiss-layout-lock.md`, and the validator together.

**Is Codex image generation required?**
No. Decks work without generated images. The image flow is only used when you need photos, infographics, UI scenes, or covers.

**How do I update the skill?**
Run the install command again, or run `git pull` inside your local skill directory.

## Contributing

Bugs, layout issues, new layout requests — Issues and PRs welcome. Prioritize:

- Add new classes to `template.html` first; don't let `layouts.md` reference undefined classes
- When changing `template-swiss.html`, update `layouts-swiss.md` and `swiss-layout-lock.md` together
- When adding Swiss rules, update `scripts/validate-swiss-deck.mjs`
- Log pitfalls into `checklist.md` at the matching P0 / P1 / P2 / P3 tier
- New theme colors go into `themes.md` with a recommended use case

## License

AGPL-3.0 © 2026
