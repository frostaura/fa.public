---
name: fa-public-decisions
description: "Brand artwork vendored so nothing depends on a machine path; SMTP keys mirror fa.lifeos; no local skills after the 2026-08-21 de-vendoring; images publish from main by intent, but workflow_dispatch is unfenced"
type: decision
last_verified: 2026-10-14
---

# Live decisions

- **Brand artwork is vendored into `src/web/src/assets/brand/`**, not referenced externally. *Why:* the app carries no machine-specific path dependency at runtime and the container builds from the repo alone. Do not replace it with symlinks or a remote fetch.
- **SMTP environment keys mirror `fa.lifeos`'s names exactly.** *Why:* one shape to learn and configure across the division's mail-sending services. A convention, not a coupling — do not rename.
- **No local `.claude/skills/`, and no vendored Gaia tree.** Removed, committed and pushed on 2026-08-21 (`7c16d46`); `.github/` now tracks only its two workflows and nothing ever wired the old set (no `.mcp.json`, no CI reference). *Why:* a generic procedure forked into one repo stops receiving fixes, and the vendored generations had already drifted; the division holds the evidence ([`../../../memory/vendored-skills-verdict.md`](../../../memory/vendored-skills-verdict.md)). The stack deviations predate the vendored set and are a stack decision, not a tooling gap.
- **Images are meant to publish only from `main`**, gated on CI completing, with PR runs suppressed by a `branches-ignore: ['**']` guard. *Why:* a public brand surface should never publish from an unreviewed branch.

  **The guarantee is narrower than the decision.** Re-verified 2026-10-14: `docker-build-push.yml` also declares `workflow_dispatch`, all four build jobs admit it explicitly and check out `github.sha`, and the two manifest-merge jobs carry no `if:` at all. A manual run from any branch publishes and re-points `:latest`. Either add a branch check to the dispatch path or stop calling `main` a guarantee; until then, treat a dispatch as a release.
