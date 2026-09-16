---
name: fa-public-decisions
description: "Brand artwork is vendored so nothing depends on a machine-local path; SMTP env keys deliberately mirror fa.lifeos; publishing from main is the stated intent but workflow_dispatch is not fenced off"
type: decision
last_verified: 2026-09-16
---

# Live decisions

- **Brand artwork is vendored into `src/web/src/assets/brand/`**, not referenced externally. *Why:* the app then carries no machine-specific path dependency at runtime, and the container builds from the repo alone. Do not replace it with symlinks or a remote fetch.
- **SMTP environment keys mirror `fa.lifeos`'s names exactly.** *Why:* one shape to learn and one shape to configure across the division's two mail-sending services. It is a convention, not a coupling — do not "clean up" the naming to something this repo would otherwise have chosen.
- **Images are meant to publish only from `main`**, gated on the CI workflow completing, with PR runs suppressed by a `branches-ignore: ['**']` guard. *Why:* a public brand surface should never publish an image from an unreviewed branch.

  **The guarantee is narrower than the decision.** Re-verified 2026-09-16: `docker-build-push.yml` also declares `workflow_dispatch`, every build job admits it explicitly, and on a dispatch the checkout falls back to `github.sha` while the manifest-merge jobs carry no condition at all. A manual run from any branch therefore publishes `:latest-amd64` / `:latest-arm64` and re-points `:latest`. The decision is intact as intent and unenforced as a control: either add a branch check to the dispatch path or stop describing `main` as a guarantee. Until one of those happens, treat a dispatch as a release.
