---
name: fa-public-decisions
description: "Brand artwork is vendored into the repo so nothing depends on a machine-local path; SMTP env keys deliberately mirror fa.lifeos; images publish only from main, with PR runs suppressed"
type: decision
last_verified: 2026-09-11
---

# Live decisions

- **Brand artwork is vendored into `src/web/src/assets/brand/`**, not referenced externally. *Why:* the app then carries no machine-specific path dependency at runtime, and the container builds from the repo alone. Do not replace it with symlinks or a remote fetch.
- **SMTP environment keys mirror `fa.lifeos`'s names exactly.** *Why:* one shape to learn and one shape to configure across the division's two mail-sending services. It is a convention, not a coupling — do not "clean up" the naming to something this repo would otherwise have chosen.
- **Images publish only from `main`**, gated on the CI workflow completing, with PR runs explicitly suppressed by a `branches-ignore: ['**']` guard. *Why:* a public brand surface should never publish an image from an unreviewed branch.
