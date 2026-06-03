# Sika theme derivative presets

These presets are **Sika Corporate derivatives**, not new palettes. They keep Sika Red, Sika Yellow, and warm-sand neutrals as the only color system, while changing color area, page rhythm, image treatment, and component emphasis.

Use them when a user asks for “more themes”, “theme variants”, “衍生主题”, “换一种调性”, or a platform/package needs a named visual preset.

## Naming rules

- Preset names use `sika-theme/<preset>`.
- A deck may use **one primary preset** and, at most, **one secondary accent preset** for section breaks.
- Presets must not introduce arbitrary hex colors. They only adjust the hierarchy of existing template variables.
- Generated visuals must inherit the preset mood but still avoid slide chrome, footers, titles, and Sika badge replicas inside the image.

## Approved presets

| Preset | Best for | Style A direction | Style B direction | Notes |
|---|---|---|---|---|
| `sika-theme/corporate-core` | General company decks, executive summaries | Balanced warm paper, red headlines, restrained yellow bands | Standard Sika Red cover, warm paper body, KPI red focus | Default if no theme preference is given |
| `sika-theme/red-command` | Strategy, risk, crisis response, decisive recommendations | More dark/red hero pages, large serif statements, sparse images | More `.accent` / red statement pages, strong KPI bars | Keep body pages readable; do not make every page red |
| `sika-theme/yellow-signal` | Training, onboarding, channel enablement, site signage | More yellow transition pages, label-heavy callouts, visible strips | Yellow corner/badge emphasis, clear numbered process grids | Yellow supports wayfinding, not long body copy |
| `sika-theme/sand-technical` | Technical manuals, product specs, construction details | Paper-first pages, diagrams, detail captions, subtle red | Warm neutral body pages, hairline tables, compact evidence blocks | Best for dense content and handout-like decks |
| `sika-theme/blueprint-grid` | Engineering systems, QA, process design, architecture | Low-motion backgrounds, grids, system diagrams | Strong Swiss grid, map/process components, minimal photography | Uses structure as the “theme”; no blue palette is added |
| `sika-theme/material-lab` | Materials, adhesives, waterproofing, lab/process stories | Texture-like warm backgrounds, macro-photo slots, specimen labels | Evidence grids, product proof blocks, data + image pairing | Pair generated visuals with material close-ups |
| `sika-theme/sustainability-field` | ESG, circularity, low-carbon construction, long-term trust | Lighter paper rhythm, fewer dark pages, documentary images | Warm neutral pages, red only for conclusions/metrics | Sustainability mood is created by imagery and pacing, not green colors |
| `sika-theme/supply-chain-map` | Factory, warehouse, logistics, region coverage, route planning | Map/photo story spreads, route callouts, milestone cards | Prefer S08 map component, timeline, KPI tower, duo compare | Keep map labels in HTML when possible |
| `sika-theme/product-proof` | Product launch, benchmark, demo, before/after proof | Hero product story + proof cards + screenshot redesign | S22 image hero, S15/S16 evidence grids, KPI proof blocks | Images should be evidence, not decoration |
| `sika-theme/event-keynote` | Large-room talks, town halls, all-hands, openings | Bigger type, more hero/non-hero alternation, fewer dense cards | Large statement pages, strong open/close red loop | Prioritize projection readability |
| `sika-theme/report-editorial` | Annual/quarterly reports, case books, long-form narrative | Magazine pacing, chapter openers, pull quotes, image essays | Swiss structure for summary pages, Style A for story sections | Use when the output needs to feel like a designed publication |
| `sika-theme/partner-workshop` | Customer workshops, co-creation, sales enablement | More prompts, worksheets, comparison cards, agenda pages | Numbered exercises, duo compare, loop diagrams | Keep pages actionable and facilitator-friendly |

## Selection guide

1. If the user says **“更商务 / 更正式”**, choose `corporate-core` or `red-command`.
2. If the user says **“培训 / 门店 / 渠道 / 施工现场”**, choose `yellow-signal` or `partner-workshop`.
3. If the user says **“技术 / 产品参数 / 工法 / 质量体系”**, choose `sand-technical`, `blueprint-grid`, or `product-proof`.
4. If the user says **“可持续 / ESG / 长期信任”**, choose `sustainability-field`.
5. If the user says **“地图 / 城市 / 供应链 / 区域覆盖”**, choose `supply-chain-map`.
6. If the user says **“大会 / 发布会 / keynote”**, choose `event-keynote`.

## Implementation checklist

- Record the chosen preset in the planning note: `Theme preset: sika-theme/<preset>`.
- Keep template CSS variables unchanged unless the change is a documented Sika variable adjustment.
- In Style A, vary the rhythm with `hero dark`, `hero light`, `light`, `dark`, and `sika-yellow` page choices.
- In Style B, vary the rhythm with registered S01-S22 layouts, `.accent`, warm paper body pages, KPI emphasis, and Sika helper elements.
- Run a trace scan if the preset is published as a derivative package:

```bash
rg -n "Lee[v]1s|html[-]ppt" README.md README.en.md SKILL.md references assets scripts .github CONTRIBUTING.md
```
