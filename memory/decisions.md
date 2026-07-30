---
name: fa-public-decisions
description: "Brand artwork is vendored into the repo; SMTP env keys mirror fa.lifeos; Images publish only from main"
type: decision
last_verified: 2026-07-24
---

# Live decisions

- **Brand artwork is vendored into the repo**, not referenced externally — so the app has no machine-specific path dependency at runtime.
- **SMTP env keys mirror `fa.lifeos`** intentionally, for cross-project consistency.
- **Images publish only from `main`**, gated on the CI workflow completing, with PR runs explicitly suppressed.
