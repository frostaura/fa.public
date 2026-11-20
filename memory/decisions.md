---
name: technologies-fa-public-decisions
description: "Brand artwork vendored so nothing depends on a machine path; EMAIL_* SMTP keys kept though their fa.lifeos sibling is gone; no local skills; images publish from main by intent, but workflow_dispatch is unfenced"
type: decision
last_verified: 2026-11-20
---

# Live decisions

- **Brand artwork is vendored into `src/web/src/assets/brand/`**, not referenced externally. *Why:* the app carries no machine-specific path dependency at runtime and the container builds from the repo alone.
- **SMTP environment keys keep their `EMAIL_*` names.** *Original why:* one shape across the division's mail-sending services, copied from `fa.lifeos`. That sibling was killed on 2026-11-20, and `technologies.crusaders.squash-control-system` uses `SMTP_*` (its `.env.example` key names, read 2026-11-20), so the original reason is gone. *Why it still holds (inferred):* whatever deploys `frostaura.net` sets these keys outside this repo (see state), so a rename would silently drop both emails on the live host (see gotchas). Revisit once the deploying stack is found.
- **No local `.claude/skills/`, and no vendored Gaia tree.** Removed, committed and pushed on 2026-08-21 (`7c16d46`); `.github/` now tracks only its two workflows. *Why:* a generic procedure forked into one repo stops receiving fixes, and the vendored generations had already drifted; the division holds the evidence ([`../../../memory/vendored-skills-verdict.md`](../../../memory/vendored-skills-verdict.md)). The residue that survived the removal is on the watch list. The stack deviations predate the vendored set and are a stack decision, not a tooling gap.
- **Images are meant to publish only from `main`**, gated on CI completing, with PR runs suppressed by a `branches-ignore: ['**']` guard. *Why:* a public brand surface should never publish from an unreviewed branch.

  **The guarantee is narrower than the decision.** Re-verified 2026-11-20: `docker-build-push.yml` carries three triggers — `workflow_run` on CI success on `main`, the `pull_request` guard, and `workflow_dispatch` — all four build jobs admit it explicitly and check out `github.sha`, and the two manifest-merge jobs carry no `if:` at all. Either add a branch check to the dispatch path or stop calling `main` a guarantee.
