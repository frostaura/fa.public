---
name: fa-public-decisions
description: "Brand artwork vendored so nothing depends on a machine path; SMTP keys mirror fa.lifeos; no local skills after the 2026-08-21 de-vendoring; images publish from main by intent, but workflow_dispatch is unfenced"
type: decision
last_verified: 2026-11-20
---

# Live decisions

- **Brand artwork is vendored into `src/web/src/assets/brand/`**, not referenced externally. *Why:* the app carries no machine-specific path dependency at runtime and the container builds from the repo alone.
- **SMTP environment keys mirror `fa.lifeos`'s names.** *Why:* one shape to learn and configure across the division's mail-sending services. A convention, not a coupling.
- **No local `.claude/skills/`, and no vendored Gaia tree.** Removed, committed and pushed on 2026-08-21 (`7c16d46`); `.github/` now tracks only its two workflows. *Why:* a generic procedure forked into one repo stops receiving fixes, and the vendored generations had already drifted; the division holds the evidence ([`../../../memory/vendored-skills-verdict.md`](../../../memory/vendored-skills-verdict.md)). The residue that survived the removal is on the watch list. The stack deviations predate the vendored set and are a stack decision, not a tooling gap.
- **Images are meant to publish only from `main`**, gated on CI completing, with PR runs suppressed by a `branches-ignore: ['**']` guard. *Why:* a public brand surface should never publish from an unreviewed branch.

  **The guarantee is narrower than the decision.** Re-verified 2026-11-20: `docker-build-push.yml` carries three triggers — `workflow_run` on CI success on `main`, the `pull_request` guard, and `workflow_dispatch` — all four build jobs admit it explicitly and check out `github.sha`, and the two manifest-merge jobs carry no `if:` at all. Either add a branch check to the dispatch path or stop calling `main` a guarantee.
