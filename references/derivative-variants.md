# Sika PPT Skill derivative variants

This document defines the approved platform/package derivative variants for `sika-ppt-skill`. All variants share the same core templates, references, and Sika Corporate palette; only packaging, trigger wording, and platform-specific notes may differ. Theme derivative presets are documented separately in `references/theme-derivatives.md`.

## Naming rules

- Canonical skill name: `sika-ppt-skill`.
- Canonical repository: `op7418/guizang-ppt-skill`.
- Display name in docs: `Sika PPT Skill`.
- Platform variant names use the pattern `sika-ppt-skill/<variant>` for documentation and release notes.
- Theme preset names use the pattern `sika-theme/<preset>` and must come from `references/theme-derivatives.md`.
- Do not use legacy repository names in user-facing docs, generated decks, cover images, or provenance comments.

## Platform variants

| Variant | Audience | Package focus | Keeps | Removes / changes |
|---|---|---|---|---|
| `sika-ppt-skill/core` | Any local AI agent with filesystem access | Full `SKILL.md`, `assets/`, `references/`, validator script | Both Style A and Style B, image workflow, cover workflow | Nothing; this is the canonical source package |
| `sika-ppt-skill/codex` | Codex environments | Adds stronger browser QA and optional GPT image-generation prompts | Full templates, validator, screenshot checklist | Avoids assuming Claude-specific skill discovery |
| `sika-ppt-skill/claude` | Claude Code users | Keeps direct skill-install instructions and trigger examples | Full templates, references, and install prompt | Keeps platform wording minimal so other variants stay neutral |
| `sika-ppt-skill/workbuddy` | Marketplace / WorkBuddy packaging | Shorter onboarding, marketplace-safe wording, no shell-heavy install block | Core templates and locked Sika rules | Removes local clone assumptions and platform-specific channel notes |
| `sika-ppt-skill/docs-lite` | Teams that only need governance docs | Checklist, layout lock, palette rules, prompt examples | `references/` governance docs | Omits templates and runtime assets from the published bundle |

## Release checklist for a platform derivative variant

1. Keep `SKILL.md` frontmatter name as `sika-ppt-skill` unless the target marketplace requires a generated slug.
2. Keep Style A and Style B palette rules fixed to Sika Corporate.
3. If the package exposes theme choices, only expose approved `sika-theme/*` presets from `references/theme-derivatives.md`.
4. Keep `assets/template.html` and `assets/template-swiss.html` as the visual source of truth.
5. Remove platform instructions that do not apply to the target variant.
6. Run a trace scan before release:

```bash
rg -n "Lee[v]1s|html[-]ppt" README.md README.en.md SKILL.md references assets scripts .github CONTRIBUTING.md
```

The command should return no legacy ownership or repository references.
